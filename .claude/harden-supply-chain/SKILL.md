---
name: harden-supply-chain
description: Use when asked to audit, harden, or assess a JS/TS project against npm supply-chain attacks; when reviewing CI/CD security posture for a JS/TS repo; when onboarding a new JS/TS repo to the org; or after a known package compromise. Works with pnpm, npm, yarn, and Bun.
---

# Harden Supply Chain

## Overview

Protects JS/TS projects against npm supply-chain attacks (compromised-publish-and-yank, postinstall worms, lockfile drift, mutable Docker base images). Detects the package manager, runs a checklist, applies mechanical fixes with diff preview, and asks the user about policy decisions.

Core principle: **don't trust upstream by default**.

Reference: see `package-managers.md` (this dir) for per-PM remediation
patterns; see `audit.sh` for a read-only one-shot check.

## When NOT to Use

- Pure dependency upgrade (use Renovate/Dependabot/`pnpm update` instead)
- Single-CVE triage (use `pnpm audit`/`npm audit` directly)
- Non-JS projects (Python/Go/Rust have different package-manager
  mechanisms — out of scope here)

## Workflow

1. **Detect package manager.** See "Detection" below.
2. **Run the audit.** Either invoke `audit.sh` or walk the checklist
   below by hand. Output a status table (✓ / ✗ / N/A + remediation).
3. **Apply auto-fixable items.** Show diff. Group fixes by concern,
   commit each group separately.
4. **Open items.** Ask the user via AskUserQuestion per the
   "Open-item questions" section. Persist decisions to
   `SupplyChainPolicy.md` at project root so future audits skip
   already-answered questions.

## Detection

Read in this order, stop at the first match:

1. `package.json` → `"packageManager"` field (authoritative)
2. Lockfile: `pnpm-lock.yaml` → pnpm; `bun.lockb` → bun;
   `yarn.lock` → yarn; `package-lock.json` → npm
3. CI YAML / Dockerfiles → `RUN ... pnpm@X` / `npm@X` / `yarn@X` /
   `bun@X`
4. If ambiguous (lockfile says pnpm but no `packageManager` field):
   ask the user.

**Report drift:** if `packageManager` says `pnpm@9.9.0` but CI installs
`pnpm@9.10.0`, flag it — version inconsistency is itself a hardening
gap.

## Checklist

For each item: report status, target value, and the PM-specific fix.
See `package-managers.md` for the exact syntax per PM.

| # | Check | Auto-fixable | Notes |
|---|-------|--------------|-------|
| 1 | PM version recent enough for security features | ⚠ needs human OK | pnpm ≥ 11, npm ≥ 10, yarn ≥ 4, bun ≥ 1.1 |
| 2 | Cool-down on new versions (`minimumReleaseAge`) | ✓ | pnpm/bun native; npm/yarn via Renovate |
| 3 | Postinstall allowlist | ⚠ interactive | pnpm `allowBuilds`, bun `trustedDependencies` |
| 4 | Strict-fail on unreviewed builds | ✓ | pnpm 11 default; others see notes |
| 5 | Refuse run on lockfile drift | ✓ | pnpm 11 `verifyDepsBeforeRun: error` |
| 6 | `--frozen-lockfile` (or equivalent) in CI | ✓ | scan every CI YAML + Dockerfile |
| 7 | Docker base images pinned by sha256 digest | ✓ | `docker buildx imagetools inspect` to get digest |
| 8 | Non-auth config out of `.npmrc` | ✓ | pnpm 11 enforces; others a cleanliness check |
| 9 | No duplicate workspace config | ✓ | `package.json` "workspaces" + `pnpm-workspace.yaml` |

## Auto-apply behavior

- Group fixes by commit-worthy concern (e.g., CI lockfile, Docker
  digests, workspace config) — not per file.
- Always show a unified diff before applying.
- For Docker digest pinning: fetch the digest live via
  `docker buildx imagetools inspect IMAGE:TAG | grep Digest`. Use the
  multi-arch manifest digest (top-level), not platform-specific.
- After each group, re-run the relevant verification:
  - `pnpm install --frozen-lockfile` for lockfile changes
  - `docker build --no-cache -f Dockerfile .` for digest changes
    (use redirected log + `echo $?` — do NOT pipe to `tail`; the
    pipe eats the docker exit code)

## Open-item questions

Ask the user once per project (then persist the answer). Phrasing:

1. **`{pm} audit` in CI** — Schedule (cron, non-blocking) / per-PR
   non-blocking / per-PR blocking on high+ / skip.
2. **Automated dep update PRs** — Renovate / Dependabot / none.
3. **PR-time supply-chain scanner** — Socket.dev / Snyk / none.
4. **Private registry proxy** — Verdaccio / Artifactory / GitLab
   Package Registry / none.
5. **`--ignore-scripts` for CI jobs that don't run the app** (lint,
   tsc, audit) — yes / no.
6. **CI secret scoping** — block deploy tokens from PR pipelines on
   forks / current state is fine / N/A.
7. **Lockfile-only PR review discipline** — require reviewer ack /
   no extra rule.

Write the answers to `SupplyChainPolicy.md` at the project root:

```markdown
# Supply Chain Policy

- `audit` in CI: scheduled, non-blocking (decided 2026-05-13)
- Automated dep PRs: Renovate (decided 2026-05-13)
- ...
```

Future audits should read this file and skip already-decided
questions.

## Common mistakes

- Pinning Docker by tag but not digest → still mutable.
- Setting `minimumReleaseAge` on pnpm < 10.16 → silently ignored.
- `allowBuilds` without `strictDepBuilds: true` → drift back to
  silent skips.
- Adding `--frozen-lockfile` to local dev scripts → blocks legit
  updates. Only in CI/Docker.
- Pinning a single-arch digest on a multi-arch base → ARM builds
  break. Use the manifest list digest (`docker buildx imagetools
  inspect` prints the right one).
- Using `pnpm i -g X` in Docker without `PNPM_HOME=/pnpm` +
  `PATH=$PNPM_HOME/bin:$PATH` (pnpm 11 errors otherwise).
- Eating Docker build exit codes with `... | tail`. Always
  redirect: `docker build ... > log 2>&1; echo $?`.

## Output format

After running, print a report like:

```
Package manager: pnpm 11.1.1 (recent enough ✓)

[✓] minimumReleaseAge: 4320 (3 days)
[✓] allowBuilds map present (8 allow, 4 deny)
[✓] strictDepBuilds: true (default)
[✓] verifyDepsBeforeRun: error
[✗] CI install missing --frozen-lockfile (15 files affected)
[✗] Docker base images not digest-pinned (12 Dockerfiles)
[✓] .npmrc clean
[✓] No duplicate workspace config

Open items needing decision:
[?] pnpm audit in CI
[?] Renovate / Dependabot
[?] Socket.dev / similar
[?] Private registry proxy
[?] --ignore-scripts in lint/tsc CI
[?] CI secret scoping for fork PRs
[?] Lockfile-only PR review discipline
```
