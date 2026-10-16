# Operational readiness: A2 pilot, esbuild exact pin 0.27.0 as a devDependency (R2 of the EDD-003 A2 run plan)

```
change: declare esbuild as a devDependency, exact pin 0.27.0, for tools/lesson-build/ only (the A2 pilot bundler, ADR-010); covers the pilot's rollback as a whole (pin, tools/lesson-build/, the /spike manifest read)
change-tier: 2
paths: package.json, package-lock.json, tools/lesson-build/**, src/app/spike/**, tests/spike/spike-guard.test.mjs, company/ops/changelog.md
author: platform-engineer
board: W-1245 (with W-088, W-485)
risks: none added or closed; proposes no re-score (see 7)
links: EDD company/engineering/edd/EDD-003-lesson-storage-at-scale.md (addendum 2026-10-16: A2 pilot, sections 3, 8 and 12); review company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md (Checklist "Rollback is one revert", P-3, P-4, P-7); ADR company/engineering/adr/ADR-010-lesson-bundler-esbuild.md (proposed); dependency record company/decisions/2026-10-16-dep-esbuild.md; batch company/ops/dispatch-requests/2026-10-16-r3-engineering.md#B3
```

**Status: not approved, and not shippable yet.** `approved-by:` is for principal-engineer-ops to add, never the author. Order of what this record waits for: (1) the founder's decision on W-485 (F-35); (2) principal-engineer-ops' approval of this record, in their own run, after (1); (3) `accounts` merged (G3), because it also changes `package.json` and the lockfile. Nothing in this record has been installed. `package.json` and `package-lock.json` are unchanged at the commit that adds this file (last change to either: 0d76ae1).

**Why tier 2.** `package.json` and `package-lock.json` are tier 2 in `company/engineering/readiness/paths.json` ("scripts and dependencies"). `src/app/spike/**` is a production route's code (tier 1 by the map for an edit, but the review classes the manifest-reading change as tier 2 and reviews it at R8). `tools/lesson-build/**` is tier 1 (new tool, nothing in the app imports it). The stricter tier wins for the record.

## What ships, and when

| Run | What lands | Under this record? |
|---|---|---|
| R3 | The pin in `package.json` (`"esbuild": "0.27.0"` under `devDependencies`) and the lockfile delta; `tools/lesson-build/` first cut | yes: the pin is the tier-2 part this approval is for |
| R4 | `/spike` reads the pilot manifest; the 127.0.0.1 lesson-origin server; bridge v1 | rollback only. The code is reviewed at R8 (tier 2). This record does not approve it in advance |
| R5 | `measure.mjs`, the frame QA copy in `tools/lesson-build/qa/` | rollback only |

## The check

1. **What can fail.**
   - Most likely: the lockfile delta is not the one measured (another branch, most likely `accounts`, moved the tree first). Then the pin adds entries or advisories that were not reviewed. Who sees it: only us (CI and `npm audit`).
   - Second: an app path imports `esbuild` by mistake (a `next.config.*` plugin, or a `src/` file). That would put a native binary on the build path that Vercel runs. Who sees it: the deploy build, and so possibly learners if a build fails or changes.
   - Worst: the pilot's `/spike` change (R4) makes a production build read or serve the pilot manifest, which would be new public surface that a stranger can reach. Who sees it: anyone with the URL. It is guarded today (`notFound()` unless `next dev` or `SPIKE_ENABLED=1`), and P-4 adds a test for exactly this case.
2. **How we would know.**
   - Lockfile delta: at R3 the builder runs `npm install --save-dev --save-exact esbuild@0.27.0` and must see **0 packages added, 0 removed** in the `packages` diff, and `npm audit --omit=dev` = 0, `npm audit` = the same advisory set as before (33 on 2026-10-16, all in the `vercel` tree). Any other result stops R3 (meter: the R3 build record; red if the counts differ).
   - App import: **P-7**: the lesson-build tool's test asserts that nothing under `src/` and no `next.config.*` imports `esbuild` (runs in the tool's test script; red in `npm run verify` once it is wired there at R3). R8 checks it.
   - `/spike` in production: **P-4**: `tests/spike/spike-guard.test.mjs` gains the case "with `SPIKE_ENABLED` unset, a production build neither reads nor serves the pilot manifest". Red in CI. **No meter in production itself**: R-004 (release-manager) already records that the production `/spike` S1 fix waits for a deploy. Nothing in the pilot is deployed (no `[deploy]` commit; the pilot runs on this host only).
   - **P-3** (R8 check): the lesson-origin server binds to `127.0.0.1` only, the frame CSP goes out as an HTTP header, and the negative probes are pilot evidence, not W-086 evidence. Meter: R8's code review reads the bind address and a `curl -sI` header line.
3. **How to roll back.** One revert per landed run, no data lost, no founder needed (it is not a deploy):
   - **Drop the pin:** remove the `"esbuild": "0.27.0"` line from `devDependencies` in `package.json`; the lockfile goes back by **one root line** (`packages[""].devDependencies.esbuild`) **and one `dev` flag** (on `node_modules/esbuild`, which stays installed through `vercel`). `npm ci` afterwards; `npm ls esbuild` shows it deduped under `vercel` again. Measured on a copy on 2026-10-16 (dependency record, "Lockfile change if pinned at 0.27.0").
   - **Delete `tools/lesson-build/`** (it holds the frame QA copy too; nothing outside it imports it, by P-7's test and by design).
   - **Revert the `/spike` change** (R4's commit on `src/app/spike/**` and the added `spike-guard` case).
   - If the three runs merged separately: `git revert <R5> <R4> <R3>` in that order; each is one commit by the run plan. Time: minutes, plus one `npm ci` (about 1 min here). Built pilot artifacts (dist dirs, the pilot manifest) are never committed, so nothing else needs cleaning.
4. **Capacity.**
   - Disk: 0 new bytes in `node_modules` (esbuild 0.27.0 is already installed: wrapper about 11.0 MB, `@esbuild/linux-x64` about 10.8 MB, through `vercel`).
   - CI: the pin adds no CI step. P-7's test adds well under a second (a file scan) once wired. The lesson builds and frame QA run only in pilot runs on this host, never per push.
   - Host CPU: pilot builds and QA (R3 to R9) are builder runs with their own ports and `NEXT_DIST_DIR`, under the run plan's G5 (no builder slot in 2026-10-28 to 2026-11-06). Estimated at the R3 record, not here.
   - Vercel quota: 0. Nothing deploys.
   - Usage budget: this record is part of R2 (0.13M estimate, section 8); the ledger records the actual.
5. **Security.**
   - Supply chain: no new package and no new advisory at 0.27.0 (dependency record, checked 2026-10-16). Install script `postinstall: node install.js` already runs on every `npm ci` through `vercel`.
   - No new route (Q4 answer: reuse `/spike`). No new query parameter in this change. The iframe and the lesson origin are R4's, guarded by P-3 and P-4 and reviewed at R8. No secrets, no permissions.
   - A URL alone can do nothing new in production: `/spike` stays 404 unless `SPIKE_ENABLED=1`, and the origin comes from the server-side allow-list.
6. **Data.** None. The pin writes nothing. The pilot writes build artifacts and timing files on this host only, and no learner data: pilot lessons are not served to learners (P-5: "pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)"). Progress in the pilot frame goes through the kit's existing exports on `/spike`, which no learner reaches. privacy-reviewer is not consulted for the pin. W-086 and the privacy review stay before any production serving (review Q3).
7. **Risks.** None added or closed. Two existing entries are near this change and are not re-scored by it:
   - R-021 (principal-engineer, scale-stage-1 pulled onto First Light's path): the pin lands after `accounts` (G3), so the accounts rebase and its C11 audit never see esbuild. That keeps R-021 as it is.
   - R-004 (release-manager, `/spike` S1 open on production until a deploy): the pilot deploys nothing, so it neither worsens nor closes R-004.
   - The 33 dev-only advisories in the `vercel` tree (1 critical, 24 high) are not caused or fixed by this change. I propose them to principal-engineer-ops for the register as a separate entry, because their fix moves `vercel` a major version (a deploy-path change). That proposal stands from the dependency record and the review (finding 5); this record does not add it.

## Carried checks (from the review's conditions; checked at R8, not here)

| Condition | What R8 checks | Where |
|---|---|---|
| P-3 | lesson-origin server binds `127.0.0.1` only; frame CSP is an HTTP header; negative probes recorded as pilot evidence, not W-086 | `tools/lesson-build/` server, a `curl -sI` line |
| P-4 | no new route; `tests/spike/spike-guard.test.mjs` passes and has the "`SPIKE_ENABLED` unset: no manifest read or served" case; origin from the server-side allow-list | `src/app/spike/**`, `tests/spike/` |
| P-7 | the tool's test asserts no `esbuild` import under `src/` or in `next.config.*` | `tools/lesson-build/` tests |

## Not checked by me (records only)

I did not install the pin, run esbuild, build or run QA for this record. The lockfile and audit figures are from the dependency record (copies in my scratchpad on 2026-10-16, measured in the earlier run) and principal-engineer's re-check in the review. They must be re-measured at R3 on the tip that has `accounts` merged, because the tree may have moved.

## Approval (tier 2; written by principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
