# Dependency: declare `esbuild` (exact pin 0.27.0) as a devDependency for the lesson-build tool

owner: founder (decides the new devDependency: W-485, decision 1 of [2026-10-14-lesson-bundler-and-memory.md](2026-10-14-lesson-bundler-and-memory.md)) · proposed by: platform-engineer (Noor) · acknowledgement owed by: principal-engineer (Kenji)
date: 2026-10-16
class: engineering, tier 2 (`package.json` and `package-lock.json` are tier 2 in `company/engineering/readiness/paths.json`)
route: platform-engineer → principal-engineer (tier-2 review of ADR-010 with the EDD-003 A2 pilot addendum) → founder (W-485) → principal-engineer-ops (readiness record for the `package.json` change) → install on a branch, after `accounts` has merged
recorded by: platform-engineer
status: proposed. **Not installed. No file outside this record, ADR-010 and the EDD-003 addendum was changed.** This record narrows the 2026-10-14 founder page (which recommended "esbuild, exact pin") to one version and adds the checks it asked for. It does not replace the founder's decision.
design: [ADR-010](../engineering/adr/ADR-010-lesson-bundler-esbuild.md) · [EDD-003, A2 pilot addendum](../engineering/edd/EDD-003-lesson-storage-at-scale.md#addendum-2026-10-16-a2-pilot-stage-1-first-step)

## What I checked (2026-10-16)
All lockfile work ran on copies of `package.json` and `package-lock.json` in my scratchpad (`--package-lock-only --ignore-scripts`). The repository's files were not touched.

| Fact | Value | How |
|---|---|---|
| Already in the tree | `esbuild@0.27.0`, hoisted at `node_modules/esbuild`, brought in by `vercel@63.1.2` (devDependency) through `@vercel/node`, `@vercel/backends > tsx` and `@vercel/static-build`; binary `@esbuild/linux-x64@0.27.0` | `npm ls esbuild` |
| Licence | MIT (`esbuild` and `@esbuild/linux-x64`), "Copyright (c) 2020 Evan Wallace" | `node_modules/esbuild/package.json`, `LICENSE.md` |
| Runtime dependencies | none. Only optional per-platform binary packages | `package.json` `optionalDependencies` |
| Size | wrapper 135,307 B unpacked (`npm view esbuild@0.27.0 dist.unpackedSize`); `node_modules/esbuild` about 11.0 MB and `@esbuild/linux-x64` about 10.8 MB on disk here (`du -sk`) | as stated |
| Release dates | 0.27.0 on 2025-11-09; latest 0.28.2 on 2026-08-08 | `npm view esbuild time` |
| **Lockfile change if pinned at 0.27.0** | **0 packages added, 0 removed.** The root entry gains `"esbuild": "0.27.0"` in `devDependencies` and one `"dev": true` flag changes | `npm install --save-dev --save-exact esbuild@0.27.0 --package-lock-only --ignore-scripts` on a copy, then a diff of `packages` |
| Lockfile change if pinned at 0.28.2 | 108 entries added (the 0.27.x copies for `vercel`, `@vercel/node`, `@vercel/gatsby-plugin-vercel-builder` and `tsx` move into nested folders with all their platform binaries) | same, with `@0.28.2` |
| **`npm audit --omit=dev`** | **0** vulnerabilities, before and after (both pins) | `npm audit --omit=dev --json` on each copy |
| **`npm audit` (all)** | before: 33 (1 critical, 24 high, 8 moderate), every one in the `vercel` CLI tree (`tar`, `undici`, `path-to-regexp`, `minimatch`, `@vercel/*` and others). After pinning 0.27.0: **the same 33, no new advisory, and none in esbuild**. After pinning 0.28.2: 34, the extra one `GHSA-g7r4-m6w7-qqqr` (low, "arbitrary file read when running the development server on Windows", range `>=0.27.3 <0.28.1`) on the nested `tsx` copy 0.27.7 | `npm audit --json` on each copy |
| Install scripts | `postinstall: node install.js` (it checks for the platform binary package). It is already running on every `npm ci` here, through `vercel` | `package.json` |
| Engines | node >= 18. We require node >= 20 | `package.json` |

The 33 pre-existing advisories in the `vercel` CLI tree are not caused by this record and not fixed by it. They are dev-only (`--omit=dev` is 0). I note them for principal-engineer-ops (risk register), because `npm audit fix --force` would move `vercel` a major version, which is a deploy-path change.

## Decision (proposed)
`esbuild` as a **devDependency, exact pin `0.27.0`**, used only by `tools/lesson-build/`. Rules:
- Never imported by app code, `next.config.*` or anything the app build runs. A test in the lesson-build tool asserts that no file under `src/` imports `esbuild`.
- The pin moves only by a dated line under this record (or a new record), with the audit and licence lines re-run, and it is scheduled like a kit major: every bundle hash changes, and the evaluation steward's re-QA sample applies (W-087).
- It lands on a branch **after `accounts` has merged**. `accounts` also changes `package.json` and `package-lock.json` (518 lines), and its merge carries a C11 audit line. Landing this first would put a rebase and a second audit on First Light's critical path (the stage-1 stop rule).

## Options considered
See [ADR-010](../engineering/adr/ADR-010-lesson-bundler-esbuild.md), "Alternatives rejected". The pin question was 0.27.0 against the latest 0.28.2. 0.27.0 adds no package and no advisory, and it is the version our machines already run. 0.28.2 is newer but adds 108 lockfile entries and one (irrelevant, Windows dev-server) low advisory on a nested copy. Nothing in 0.28 is needed for what ADR-010 uses (TSX, aliases, externals, `local-css`).

## Rests on
- The lockfile copies and audit outputs above (scratchpad, temporary): `/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/b3/audit-base/`, `.../audit-esb027/`, `.../audit-esb/`.
- **Not checked:** I did not run esbuild on any lesson. The batch item is records only, with no build. That `local-css` handles our 522 `:global(...)` lessons, and that its output is deterministic, are believed from esbuild's documentation and are condition 5 of ADR-010, checked in the pilot's first build run.

## Revisit if
- `npm audit` reports a high or critical advisory on `esbuild@0.27.0`.
- The pilot's first build run fails condition 5 of ADR-010.
- Next exposes a supported bundling API (founder page, "Revisit if").

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| A native binary enlarges the supply chain | principal-engineer (founder page, 2026-10-14) | evidence | Partly answered: at 0.27.0 the binary is already installed through `vercel`, so the supply chain does not grow today. It grows only if `vercel` drops esbuild, and then this pin is what keeps it audited. Still the founder's call (W-485) |
| Pinning an older version than the latest misses fixes | platform-engineer (self, raised for the reviewer) | evidence | Open: no advisory applies to 0.27.0 today (audit above). The upgrade path is the dated line in "Decision" |
| Declaring a package that is already present looks like ceremony | platform-engineer (self) | purpose | Rejected: an undeclared import of a transitive package moves whenever the Vercel CLI moves, and a bundler version is part of every lesson version's address |
