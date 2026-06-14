# Supply Chain Policy

Decisions for vic-website. No GitHub Actions / GitLab CI today; Vercel
handles production installs.

## Policy

- `pnpm audit` cadence: skip for now; add GitHub Action when CI exists (decided 2026-06-14)
- Automated dep PRs: none — manual updates only (decided 2026-06-14)
- PR-time supply-chain scanner: none (decided 2026-06-14)
- Private registry proxy: none — direct npmjs.org (decided 2026-06-14)
- `--ignore-scripts` in lint/tsc CI: N/A — no CI jobs (decided 2026-06-14)
- CI secret scoping for fork PRs: N/A — no CI pipelines (decided 2026-06-14)
- Lockfile-only PR review discipline: no extra rule (decided 2026-06-14)

## Deploy install (Vercel)

`vercel.json` uses `pnpm install --frozen-lockfile` with pnpm 11.1.1 via
corepack — keep in sync with `package.json` `"packageManager"`.

## Hardening applied (2026-06-14)

- `minimumReleaseAge: 4320` (3 days) in `pnpm-workspace.yaml`
- `verifyDepsBeforeRun: error` in `pnpm-workspace.yaml`
- Removed machine-local `.npmrc` (`target_platform` / `target_arch` / `target_libc`)
