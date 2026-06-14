# Per-Package-Manager Reference

Exact remediation syntax for each check, per package manager. Load
this when applying fixes; the main `SKILL.md` covers the workflow.

---

## pnpm (version ≥ 11.0 recommended)

All config goes in `pnpm-workspace.yaml`. `.npmrc` is auth/registry
only in v11.

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# 3 days, in MINUTES
minimumReleaseAge: 4320

allowBuilds:
  bcrypt: true              # native binding
  sqlite3: true             # native binding
  esbuild: true             # platform binary
  "@swc/core": true         # native binary
  core-js: false            # donation banner — deny
  aws-sdk: false            # deprecation notice — deny

verifyDepsBeforeRun: error
# strictDepBuilds + blockExoticSubdeps default true in v11
```

`package.json`:

```json
{
  "packageManager": "pnpm@11.1.1"
}
```

Remove `"workspaces"` array if `pnpm-workspace.yaml` exists.

CI install: `pnpm install --frozen-lockfile`.

**pnpm 10.x intermediate:** allowlist is
`pnpm.onlyBuiltDependencies` (array) in `package.json`, not the
`allowBuilds` map. Other settings are the same as v11.

**pnpm 9.x and older:** `minimumReleaseAge` and `allowBuilds` /
`onlyBuiltDependencies` do **not** exist. Must upgrade.

---

## npm (version ≥ 10)

No native cool-down. No native build allowlist (postinstall scripts
run by default — this is the riskier ecosystem).

Mitigations:

- CI install: `npm ci` (always frozen).
- `npm config set ignore-scripts true` globally, then use a curated
  list of trusted deps where you DO want scripts (manual process).
- Use Renovate with `minimumReleaseAge: "3 days"` to enforce
  cool-down at PR-creation time.
- `npm audit --audit-level=high` in CI.

`.npmrc`:

```ini
# auth/registry only
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Settings like `ignore-scripts=true` belong in `.npmrc` too.

---

## yarn (berry, version ≥ 4)

`.yarnrc.yml`:

```yaml
nodeLinker: node-modules    # or pnp
enableScripts: false        # default-off install scripts
npmAuditPopulateMembers: true
npmAuditExcludePackages: []
```

CI install: `yarn install --immutable`.

No native `minimumReleaseAge`; use Renovate equivalent.

Build allowlist via `enableScripts: false` globally + per-dep
opt-in is awkward in yarn 4 — easier to migrate to pnpm or bun if
that's a hard requirement.

---

## bun (version ≥ 1.1)

`bunfig.toml`:

```toml
[install]
# seconds (NOT minutes like pnpm!)
minimumReleaseAge = 259200       # 3 days
exact = true
frozenLockfile = false           # set true in CI only
```

`package.json`:

```json
{
  "packageManager": "bun@1.1.x",
  "trustedDependencies": [
    "bcrypt",
    "sqlite3",
    "esbuild"
  ]
}
```

`trustedDependencies` = bun's allowlist for postinstall scripts.
Everything not in it is denied by default.

CI install: `bun install --frozen-lockfile`.

---

## Docker (any PM)

Pin every `FROM` line:

```dockerfile
FROM node:22.13-alpine@sha256:e2b39f7b... AS base
```

Get the digest live:

```bash
docker buildx imagetools inspect node:22.13-alpine | grep Digest
```

Use the **manifest list** digest (top-level output of imagetools
inspect) so multi-arch builds keep working.

If using pnpm globals (`pnpm i -g turbo`):

```dockerfile
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME/bin:$PATH
```

(pnpm 11 is strict — without this, `pnpm i -g` errors with
"The configured global bin directory '/pnpm/bin' is not in PATH".)

If the base node image's bundled corepack is older than the pnpm
release you want, upgrade corepack first to get the signing keys:

```dockerfile
RUN npm install -g corepack@latest \
 && corepack enable \
 && corepack prepare pnpm@11.1.1 --activate
```

---

## CI YAML (any PM)

Add the frozen flag to every install. Examples:

| PM | Frozen flag |
|----|-------------|
| pnpm | `pnpm install --frozen-lockfile` |
| npm | `npm ci` |
| yarn (4+) | `yarn install --immutable` |
| bun | `bun install --frozen-lockfile` |

Bulk-fix recipe (BSD/macOS sed):

```bash
grep -rln "pnpm install" .ci .github/workflows 2>/dev/null | \
  while IFS= read -r f; do
    sed -i '' 's|pnpm install \(--filter\)|pnpm install --frozen-lockfile \1|g' "$f"
  done
```

GNU sed (Linux CI containers): drop the `''` after `-i`.

---

## Cleanup items

### Remove duplicate workspace config

If both exist, delete from `package.json`:

```diff
 {
   "name": "myproj",
-  "workspaces": ["apps/*", "packages/*"]
 }
```

`pnpm-workspace.yaml` is authoritative for pnpm projects.

### Strip non-auth from `.npmrc`

```bash
# pnpm 11 enforces this. Other PMs: still a cleanliness recommendation.
# Move auto-install-peers, hoist-pattern, etc. to pnpm-workspace.yaml.
```

If after stripping the file is empty, delete it.
