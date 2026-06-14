#!/usr/bin/env bash
# Read-only supply-chain hardening audit for JS/TS projects.
# Detects package manager and reports status per check. Makes no changes.
#
# Run from project root:
#   bash .cursor/skills/harden-supply-chain/audit.sh
#
# Exit codes: always 0 (informational). Parse output instead.

set -u

OK="[\033[32m✓\033[0m]"
FAIL="[\033[31m✗\033[0m]"
WARN="[\033[33m?\033[0m]"
NA="[\033[90m·\033[0m]"

ok()   { printf "%b %s\n" "$OK"   "$*"; }
fail() { printf "%b %s\n" "$FAIL" "$*"; }
warn() { printf "%b %s\n" "$WARN" "$*"; }
na()   { printf "%b %s\n" "$NA"   "$*"; }

# ── detect package manager ──────────────────────────────────────────
PM=""
PM_VERSION=""

if [ -f package.json ] && grep -qE '"packageManager"\s*:\s*"' package.json; then
  PM_FIELD=$(grep -oE '"packageManager"\s*:\s*"[^"]*"' package.json | sed -E 's/.*"([^"]*)"$/\1/')
  PM="${PM_FIELD%@*}"
  PM_VERSION="${PM_FIELD#*@}"
elif [ -f pnpm-lock.yaml ]; then PM=pnpm
elif [ -f bun.lockb ];      then PM=bun
elif [ -f yarn.lock ];      then PM=yarn
elif [ -f package-lock.json ]; then PM=npm
fi

echo "════════════════════════════════════════════════════════════════"
echo "Supply-chain hardening audit"
echo "Project: $(pwd)"
echo "Package manager: ${PM:-UNKNOWN} ${PM_VERSION:+($PM_VERSION)}"
echo "════════════════════════════════════════════════════════════════"
echo

if [ -z "$PM" ]; then
  fail "Could not detect package manager — no packageManager field, no lockfile."
  exit 0
fi

# ── 1. PM version ───────────────────────────────────────────────────
echo "── 1. Package manager version ──"
case "$PM" in
  pnpm)
    if [ -z "$PM_VERSION" ]; then
      warn "No packageManager field — version not pinned in package.json"
    else
      MAJOR="${PM_VERSION%%.*}"
      if [ "$MAJOR" -ge 11 ] 2>/dev/null; then
        ok "pnpm $PM_VERSION (>= 11, all features available)"
      elif [ "$MAJOR" -ge 10 ] 2>/dev/null; then
        warn "pnpm $PM_VERSION — has minimumReleaseAge; consider v11 for allowBuilds map & defaults"
      else
        fail "pnpm $PM_VERSION — too old; upgrade to >= 11 for security features"
      fi
    fi
    ;;
  npm)   warn "npm has no native cool-down or build allowlist; rely on Renovate + CI hygiene" ;;
  yarn)  warn "yarn berry: $PM_VERSION — check enableScripts: false in .yarnrc.yml" ;;
  bun)   ok "bun $PM_VERSION — supports trustedDependencies + minimumReleaseAge" ;;
esac
echo

# ── 2. Cool-down window ─────────────────────────────────────────────
echo "── 2. Cool-down on new versions ──"
case "$PM" in
  pnpm)
    if grep -qE '^minimumReleaseAge:' pnpm-workspace.yaml 2>/dev/null; then
      ok "minimumReleaseAge set in pnpm-workspace.yaml: $(grep -E '^minimumReleaseAge:' pnpm-workspace.yaml)"
    else
      fail "minimumReleaseAge not set — recommend 4320 (3 days)"
    fi
    ;;
  bun)
    if grep -qE 'minimumReleaseAge' bunfig.toml 2>/dev/null; then
      ok "minimumReleaseAge set in bunfig.toml"
    else
      fail "minimumReleaseAge not set in bunfig.toml — recommend 259200 (3 days, seconds)"
    fi
    ;;
  *) na "no native support; enforce via Renovate/Dependabot minimumReleaseAge" ;;
esac
echo

# ── 3. Build script allowlist ───────────────────────────────────────
echo "── 3. Postinstall allowlist ──"
case "$PM" in
  pnpm)
    if grep -qE '^allowBuilds:' pnpm-workspace.yaml 2>/dev/null; then
      ok "allowBuilds map present in pnpm-workspace.yaml"
    elif grep -qE '"onlyBuiltDependencies"' package.json 2>/dev/null; then
      warn "onlyBuiltDependencies in package.json (pnpm 10 style); migrate to allowBuilds map for v11"
    else
      fail "No build allowlist — every postinstall runs (or fails with strictDepBuilds)"
    fi
    ;;
  bun)
    if grep -qE '"trustedDependencies"' package.json 2>/dev/null; then
      ok "trustedDependencies set in package.json"
    else
      fail "trustedDependencies not set — bun denies all install scripts by default"
    fi
    ;;
  *) na "no native allowlist; use CI --ignore-scripts" ;;
esac
echo

# ── 4. strictDepBuilds (pnpm) ───────────────────────────────────────
if [ "$PM" = pnpm ]; then
  echo "── 4. strictDepBuilds ──"
  if grep -qE '^strictDepBuilds:\s*false' pnpm-workspace.yaml 2>/dev/null; then
    fail "strictDepBuilds explicitly disabled — re-enable (default in v11)"
  else
    ok "strictDepBuilds at default (true in v11)"
  fi
  echo
fi

# ── 5. verifyDepsBeforeRun ──────────────────────────────────────────
if [ "$PM" = pnpm ]; then
  echo "── 5. verifyDepsBeforeRun ──"
  if grep -qE '^verifyDepsBeforeRun:\s*error' pnpm-workspace.yaml 2>/dev/null; then
    ok "verifyDepsBeforeRun: error"
  elif grep -qE '^verifyDepsBeforeRun:' pnpm-workspace.yaml 2>/dev/null; then
    warn "$(grep -E '^verifyDepsBeforeRun:' pnpm-workspace.yaml) — consider 'error' for strictest signal"
  else
    fail "verifyDepsBeforeRun not set — defaults to 'install' (auto-fix on drift)"
  fi
  echo
fi

# ── 6. Frozen lockfile in CI ────────────────────────────────────────
echo "── 6. Frozen lockfile in CI ──"
case "$PM" in
  pnpm) INSTALL_RE="pnpm install"; FROZEN_RE="frozen-lockfile" ;;
  yarn) INSTALL_RE="yarn install"; FROZEN_RE="--immutable" ;;
  bun)  INSTALL_RE="bun install";  FROZEN_RE="frozen-lockfile" ;;
  npm)  INSTALL_RE="npm (install|i)\b"; FROZEN_RE="npm ci" ;;
esac

CI_DIRS=$(ls -d .ci .github/workflows .gitlab .gitlab-ci.yml bitbucket-pipelines.yml 2>/dev/null)
if [ -z "$CI_DIRS" ]; then
  na "no CI config detected"
else
  MISSING=$(grep -rEln --include='*.yml' --include='*.yaml' --include='Dockerfile*' "$INSTALL_RE" $CI_DIRS 2>/dev/null | while IFS= read -r f; do
    grep -E "$INSTALL_RE" "$f" | grep -vE "$FROZEN_RE" >/dev/null && echo "$f"
  done)
  if [ -z "$MISSING" ]; then
    ok "all CI install calls use frozen lockfile"
  else
    fail "files with install calls missing frozen flag:"
    echo "$MISSING" | sed 's/^/      /'
  fi
fi
echo

# ── 7. Docker base image digest pinning ─────────────────────────────
echo "── 7. Docker base images pinned by sha256 digest ──"
DOCKERFILES=$(find . -name "Dockerfile*" -not -path '*/node_modules/*' 2>/dev/null)
if [ -z "$DOCKERFILES" ]; then
  na "no Dockerfiles found"
else
  UNPINNED=$(echo "$DOCKERFILES" | while IFS= read -r f; do
    grep -nE "^FROM " "$f" \
      | grep -vE "@sha256:" \
      | grep -vE "FROM (base|builder|installer|deps|runner) " \
      | while IFS= read -r line; do echo "      $f:$line"; done
  done)
  if [ -z "$UNPINNED" ]; then
    ok "all FROM lines are pinned by digest (or alias an earlier stage)"
  else
    fail "unpinned FROM lines:"
    echo "$UNPINNED"
  fi
fi
echo

# ── 8. .npmrc cleanliness ───────────────────────────────────────────
if [ "$PM" = pnpm ]; then
  echo "── 8. .npmrc auth/registry only (pnpm 11 enforced) ──"
  if [ ! -f .npmrc ]; then
    ok ".npmrc absent (cleanest)"
  else
    BAD=$(grep -vE '^\s*(#|//|;|\s*$|@.*:registry|.*:_authToken|.*:_password|.*:_authPassword|.*:username|.*:always-auth|registry\s*=)' .npmrc)
    if [ -z "$BAD" ]; then
      ok ".npmrc contains only auth/registry settings"
    else
      fail ".npmrc has non-auth settings — move to pnpm-workspace.yaml:"
      echo "$BAD" | sed 's/^/      /'
    fi
  fi
  echo
fi

# ── 9. Duplicate workspace config ───────────────────────────────────
if [ "$PM" = pnpm ] && [ -f pnpm-workspace.yaml ]; then
  echo "── 9. No duplicate workspace config ──"
  if grep -qE '"workspaces"\s*:' package.json 2>/dev/null; then
    fail "Both pnpm-workspace.yaml and package.json 'workspaces' array present — remove the array"
  else
    ok "single source of truth (pnpm-workspace.yaml)"
  fi
  echo
fi

echo "════════════════════════════════════════════════════════════════"
echo "Done. See SKILL.md 'Open-item questions' for items needing"
echo "a human policy decision (audit in CI, Renovate, Socket.dev, ...)."
echo "════════════════════════════════════════════════════════════════"
