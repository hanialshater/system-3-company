# Engineering Review: 2026-10-26: lesson frames pilot, code review of C1 to C4 and C8 (W-2097, W-2104)

owner: principal-engineer (Kenji) · tier: 2 (`src/components/DemoHost.tsx` `kit`, `next.config.mjs` and `package.json` `build`, the artifact origin's headers `deploy`, in `company/engineering/readiness/paths.json`) · date: 2026-10-26
artifact: branch `origin/feat/lesson-frames-pilot` at `6b49c6550`, plus my O1 commit `3ef3619ca` (11 builder commits on merge base `03d140e22` = `origin/main` today, 0 behind) · builder: platform-engineer (W-2092 C1 to C4, W-2093 C8) · spec: [2026-10-25 production review](2026-10-25-content-hub-production-review.md), condition C10
attendees (in writing): platform-engineer (builder), principal-engineer-ops (readiness), backend-engineer (W-2102), release-manager (the security deploy), evaluation-steward (C7, already ruled), chief-of-staff (the founder ask).

## Verdict

**Code review: approve for a flag-off merge to main** at `3ef3619ca` (the builder's `6b49c6550` plus my O1 gate scoping). The approval holds with these conditions:
- M1: principal-engineer-ops approves both readiness records (W-2101). This is tier 2, and that approval is still missing.
- M2: W-2105, two small code items for platform-engineer.
- M3: the `board.json` merge is resolved in main's favour (see Merge notes).

With `NEXT_PUBLIC_LESSON_FRAMES` unset, the branch is today's app plus Next 16.4.3:
- no frame code reaches a client chunk;
- the `DemoCard` change is a verbatim move;
- no protected path is touched;
- every failure in `verify` is pre-existing.

**Not approved: flag-on anywhere.** Flag-on in production still waits on C5 (privacy), C6 (phones) and AMD-018 (C7, the steward's ruling). A flag-on preview needs only the founder's approval of that deploy and the artifact deploy before it.

**The Next upgrade should ship on its own, now, ahead of the pilot**, as production commit `80c847c5527c02e7b1926f8879891ef2d4169486` (section "The Next security fix").

How sure:
- High (about 90%) that flag off is today's app. I measured it in my own worktree, and the builder measured it separately (EXP-010, P4).
- High (about 85%) that the O1 scoping is right and complete for the deploy paths in `tools/deploy.mjs` and `vercel.json` today.
- Medium (about 70%) that 16.4.3 has no runtime difference from 16.4.0 that only production would show. It is a patch release, and the build, typecheck, suites and a QA sample pass, but no preview of it has run.

## Findings written before reading the builder's accounts

I read the diff in my own worktree (`git worktree add --detach` in my scratchpad, `npm ci` there, so the tree ran on the branch's own lockfile, Next 16.4.3). I did not read `company/ops/progress.md`, EXP-010 or the two readiness records on the branch until this section was written.

| # | Finding | Evidence |
|---|---|---|
| R1 | **No protected path is touched.** The 33 changed files were matched against every glob in `protected-paths.txt` (`tests/qa/**`, `src/kit/Lesson.tsx`, `tools/company.mjs`, `.github/workflows/ci.yml`, the constitution, the hook): no hit. The frame QA copy is a new file under `spike/qa/pilot/`. | `git diff --name-only origin/main...HEAD` |
| R2 | **The lockfile moves only Next.** `next`, `@next/env` and the eight `@next/swc-*` entries go 16.4.0 → 16.4.3; Next's optional `sharp` range goes `^0.35.4` → `^0.35.5` (no `sharp` entry changes). No other package moves, none is added. `npm audit --omit=dev` on the branch: the `next` critical advisories (GHSA-2464-fhr4-w9xw, GHSA-p3m5-59mp-jv5r, GHSA-673q-mjm6-r5xr) are gone; **one high remains, `zod` 4.1.11 (< 4.6.6, GHSA-mrhx-c7xc-m3w5)**, via `better-call`. The same `zod` high is in `npm audit` on main today, next to the `next` critical. So the branch does not introduce it; W-2102 is a separate fix and does not block this merge. | `package-lock.json` diff; `npm audit --omit=dev` on both trees |
| R3 | **Flag off is today's app in the client bundle (P4, grep half).** `npm run build` with `NEXT_PUBLIC_LESSON_FRAMES` unset: exit 0, 167 s wall. `.next/static` holds 0 matches for the `DemoFrame` marker `s3c-lesson-frame-v1`, a manifest `frameDoc` hash, the artifact origin, the projections' "do not edit" note, `readFrameMessage` and `pilot-50`. The one `lesson-frame` match is the existing `/spike` host (`SpikeHost`, `data-testid="lesson-frame"`), already on main. The two new `globals.css` selectors (`[data-frame-ready]`, `[data-frame-phase]`) ship, and match nothing while no code sets those attributes. **Not measured:** the "+1 KB gz of main" half of P4 and the `/d/*` page count against main. A main build did not fit on this host's disk (the volume ran out mid-install). | `grep -rl` over `.next/static` |
| R4 | **The `DemoCard` refactor is a verbatim move.** The lines removed from `DemoCard.tsx` and the lines of the new `src/kit/reveal-fit.ts` differ only in imports, the header comment, `"use client"` and one `export` keyword. `SVG_TEXT_FLOOR_PX` and `SVG_DECOR_FLOOR_PX` are re-exported from `DemoCard`, so their importers are unchanged. In-app reveal fit and fold behave as before by construction. | `diff` of removed vs added lines |
| R5 | **The host's own reveal fit still runs on a framed card, and is a no-op there.** `DemoFrame` sets `data-phase` on the `<iframe>` element, which sits inside `.card-body`, whose subtree `useRevealFit`'s observer watches for `data-phase`. Its handler looks for `[data-testid="lesson"]`, finds none in the host document, and returns. Harmless; worth one comment line so nobody "fixes" it. | `src/kit/reveal-fit.ts` `onChange`; `src/components/DemoFrame.tsx` |
| R6 | **Typecheck passes; the new suite passes and is fast.** `tsc --noEmit` exit 0. `npm run test:lesson-frames`: 26 pass, 1 skip (the built-artifact meta-CSP check, no local artifacts), 0.8 s (P5's ≤ 3 s holds). | runs on the branch |
| R7 | **`npm run verify`'s failures are all pre-existing.** I ran every `test:*` suite in `verify` (except `test:accounts`, which needs Postgres; the branch does not touch accounts code) and `npm run check` on main and on the branch, with the same `node_modules`. The failing test names are **identical** on both: 24 failing tests in `test:publish` (2), `test:lifehacks` (1), `test:algorithms` (5), `test:hq` (9), `test:platform` (1), `test:settings` (1), `test:dims` (4); `check` reports 810 errors and 5 warnings on both (decision records without `owner:` lines). The branch adds `test:lesson-frames`, green. | `diff` of the two `not ok` lists: empty |
| R8 | **A flag-off QA sample passes.** `tests/qa` (the gate, unchanged) on the flag-off build for 6 pilot lessons (`why-seven-wins`, `skip-the-edge-that-loops`, `pi-is-three-and-a-bit`, `quiet-decades-then-everywhere`, `pixel-nudges-add-up`, `coastline-ruler`) at both viewports, plus `feed.spec.ts` in full: all pass. (`feed.spec`'s chip test fails under `QA_ONLY`, because it builds its allowed set from the filtered list; it passes without the filter. That is a property of the contract, not of this branch.) | `npx playwright test` with `QA_PORT=3197` |
| R9 | **The bridge is as the plan asked.** Identity is the frame's `contentWindow`, origin must be `"null"`, slug must match, 2 KB cap, `progress` takes only `completedAt` (finite, not in the future) and `predictedCorrectly` (boolean), `track` is rebuilt field by field for the five lesson event types, the host never posts into the frame, and the frame URL is built only from the projection's origin and a 64-hex hash. `progressUpdate` is the same update `Lesson.tsx` line 73 makes. Nine tests, including a fake frame window and a real `updateProgress` to the account sink. | `src/lib/lesson-frame-bridge.ts`; `tests/lesson-frames/bridge.test.mjs` |
| R10 | **My C4 header would have blocked every frame.** It said `default-src 'none'` and named no `script-src`, so `script-src` falls back to `'none'`: the inline import map and every module script are refused, whatever the meta policy allows. The branch's `frameCsp` adds `script-src 'self' 'unsafe-inline'`, `style-src 'self'`, `img-src 'self' data:` and `font-src 'self'`. Both policies are enforced, so an inline script runs only if the meta policy's hash also allows it: only the import map. That holds because the meta CSP is the second element of `<head>`, before any script (`frameHtml`). | `tools/lib/lesson-frames.mjs` `frameCsp`; `spike/build.mjs` `frameHtml` |
| R11 | **My F7 count was wrong.** The export-only diff on `rnd/content-hub-prototype` (`88ebe747a`) exports **5 functions and 1 constant** (`LESSON_EXTERNALS`, `webpackConfig`, `minifyJs`, `write`, `buildKit`, `frameHtml`), not 7 and 1. The cherry-pick `a8047825b` is exactly that diff. A later commit (`6ef931b62`) is **not** export-only: it exports `buildLessons` and adds a webpack plugin that records each compilation's `fileDependencies` as `sources`. That changes no built byte; `spike/**` is unmatched in `paths.json`, so tier 1. | `git show a8047825b`, `git show 88ebe747a` |
| R12 | **`sourceHash` covers what the bundle was compiled from, plus `meta.json`.** Per lesson: the files webpack read outside `node_modules` under `src/` or `spike/kit/` (so `Demo.tsx`, the local modules and CSS it imports), plus `meta.json`. Uncompiled files in the lesson folder (`idea.json`, `story.json`, `model-check.mjs`, tests) are out of it, correctly: they never reach the served code. No pilot lesson reads a file outside its own folder. The kit has its own `sourceHash` over 10 files, **including `src/app/globals.css`**, which changed in 18 commits on main in the last 15 days. | `src/lib/lesson-frames.manifest.json` |
| R13 | **The gate runs where the flag is not known (feeds O1).** `tests/lesson-frames` runs inside `npm run verify`, which `tools/deploy.mjs` runs in the deploying shell. But the flag value a deployed build uses comes from elsewhere: a `--prebuilt` deploy builds with the pulled Vercel environment (`.vercel/.env.<target>.local`), and a `[deploy]` commit builds on Vercel with `vercel.json`'s `buildCommand: npm run build`, which runs no `verify` at all. So today the gate can fail a flag-off deploy, and can miss a flag-on one. | `tools/deploy.mjs` lines 134-150; `vercel.json` |
| R14 | **O1's numbers hold.** 42 of the 50 pilot lesson folders have commits on main since 2026-10-18, and all 42 include a code or CSS file, not only `meta.json`. With R12's kit scope, any `globals.css` commit also stales all 50 at once. With the gate as written, a flag-off production deploy would fail within days of the merge. | `git log --since=2026-10-18 -- <pilot folder>` |

## What the accounts changed (read after the findings)

After writing the findings, I read the builder's handoff (`company/ops/progress.md` on the branch, 2026-10-26), EXP-010's results and the two readiness records.
- **P4's size half, which I could not measure (R3), was measured by the builder.** First-load JS on a flag-off build: `/` is −17 B against main and `/d/why-seven-wins` is +18 B. There are 1,646 `/d/*` pages, as on main. Together with my grep, P4 holds. I have not reproduced the size numbers.
- **Flag-off `tests/qa` in full (builder):** contract 3,290 of 3,292, feed 10 of 10. The two failures are draft `history-luanda-kinshasa-1880-1960`, which fails the same way at base `83127c23f`. My 6-lesson sample (R8) agrees with that result. It is not a replacement for it.
- **The builder's suite comparison** used base `83127c23f`; mine used today's `origin/main` `03d140e22`. Both found identical `not ok` sets. The builder also ran `test:accounts` (pass), which I did not.
- **The four corrections** are accepted, each checked against the code first (R10, R11, R5 and R12). They are recorded in [the 2026-10-25 review](2026-10-25-content-hub-production-review.md#corrections-2026-10-26-from-the-builders-account-each-checked-against-the-code).
- **The readiness record's R-new-1** (no production meter for a frame that never becomes ready, or for a refused progress message) is right. It blocks production flag-on, not the merge, and it belongs to principal-engineer-ops (W-2101).
- The builder's "`globals.css` changed 4 times" counts the week to 2026-10-25. My 18 is over 15 days. Both support O1.

## The builder's corrections to the 2026-10-25 review

| # | Correction | Ruling | Why |
|---|---|---|---|
| 1 | The `/f/*` header CSP blocks every frame | **Accept** | R10. My header had no `script-src`, so it fell back to `'none'`. The fix keeps the hash pin in the meta policy, and both policies must allow each script. privacy-reviewer rules on `'unsafe-inline'` in the header in C5. |
| 2 | F7 is 5 functions and 1 constant, not 7 and 1 | **Accept** | R11. Checked on `88ebe747a` and `a8047825b`. |
| 3 | `data-frame-phase` / `data-frame-ready`, not `data-phase` on the card | **Accept** | It meets the intent (an attribute on the card hides the hook), and no lesson selector can match the card. |
| 4 | `sourceHash` is compiled sources plus `meta.json`; toolchain recorded, not gated; a stale kit also fails | **Accept** | R12. It is more precise than my "canonical tree", and the toolchain is not gated because the served artifact is the tested bytes. It widened O1, which is ruled below. |

All four are written into the 2026-10-25 record as a dated Corrections section, with markers at the four places in the text that changed.

## O1 (W-2104): ruled

[Decision record](../../decisions/2026-10-26-lesson-frames-gate-scope.md). The objection is accepted.
- The freshness rules (`stale`, `stale-kit`, `published`, `fallback`) block only builds with the flag on. They are enforced in `next.config.mjs`, because only the build knows the deployed build's flag (R13).
- In `verify` with the flag off, they are a diagnostic.
- The structural rules still fail `verify` whatever the flag.

The code is mine: one commit on the branch, `3ef3619ca` (`next.config.mjs`, `tools/lib/lesson-frames.mjs`, `tests/lesson-frames/manifest.test.mjs`). Tests: 28 pass and 1 skip. A real edit to a pilot lesson and to `globals.css` passes flag-off and is refused flag-on. A flag-off build afterwards: exit 0, 144 s, 0 frame markers. The objection against my own ruling (`globals.css` in the kit's hash will make flag-on production costly) is recorded there and filed as W-2106.

## The Next security fix: ship it alone, now

**Yes.** Today's production (`4d3301270`, release r22) runs Next 16.4.0. That version is in the range of three `next` advisories: GHSA-2464-fhr4-w9xw, GHSA-673q-mjm6-r5xr and GHSA-p3m5-59mp-jv5r, two of them RCE. The app uses no `next/image`, `"use cache"` or `"use server"`, so exposure is probably low. That is unverified, and a patch release is the cheap way to stop depending on it. 16.4.0's own local `next build` also now exits 1 on a `SecurityFatalError` (r22's `preDeployChecks`), so every local build check on main fails until the upgrade lands. The pilot has four open blockers before production flag-on. The security fix should not wait for them, and should not ride with a feature: if a deploy of both went wrong, nobody could tell which change caused it.

**The commit to deploy: `80c847c5527c02e7b1926f8879891ef2d4169486`** (on `feat/lesson-frames-pilot`, the upgrade commit itself).
- Its ancestry is live production `4d3301270`, then 10 commits already on main (records, HQ and org tooling; HQ is off in production), then `7b7a24978` (EXP-010 predictions, records only), then the upgrade.
- `git diff 4d3301270 80c847c55 -- src next.config.mjs vercel.json public` is empty. Against live, the shipped app changes only in `package.json` and `package-lock.json`: `next`, `@next/env` and the `@next/swc-*` binaries go 16.4.0 → 16.4.3 (R2).
- None of the pilot's code is in its ancestry.

Before the deploy:
1. principal-engineer-ops approves `company/engineering/readiness/2026-10-26-next-16-4-3-upgrade.md` (the upgrade half of W-2101).
2. The founder approves that specific deploy (W-2108, chief-of-staff).
3. release-manager runs it by the runbook, with its pre-deploy checks recorded on that commit (W-2107).

After the deploy, main takes the upgrade by merging `80c847c55` alone. That brings in only those two commits. The pilot branch then merges later, as reviewed.

My engineering review of the upgrade itself:
- the lockfile moves only Next (R2);
- the audit clears the `next` critical (R2);
- typecheck and build pass on 16.4.3 (R3, R6);
- the suites' failures are unchanged (R7);
- a flag-off QA sample passes (R8).

The remaining `zod` high (W-2102, backend-engineer) is on main today too. It is an auth-path dependency, and it should get its own change and its own deploy, not ride with this one.

## Merge notes (for whoever merges, after M1 and M2)

- **`board.json`.** Main now carries W-2101 to W-2104 copied byte for byte from the branch, so IDs do not fork. Main also has W-2097 and W-2104 moved to `done`, and W-2105 to W-2110. The branch moved W-2092 and W-2093 to `review`. Git will report a conflict around W-2104. Resolve it by keeping main's entries for W-2097 and W-2101 to W-2110, and the branch's for W-2092 and W-2093.
- **`company/ops/progress.md`.** The branch's top entry is the builder's handoff. Keep both entries, in date order.
- **AMD-018 (d)** plans for `tests/lesson-frames/**` to become protected, with its "first version under the amendment commit". Merging this branch first puts an unprotected first version on main. That is fine for flag-off, and production flag-on waits for AMD-018 anyway. The steward's companion diff builds on `3ef3619ca` (W-2109).
- No `[deploy]` in any merge commit. The merge itself is not a deploy.

## Work items (filed)

| Item | Owner | What |
|---|---|---|
| W-2105 | platform-engineer | Before merge: `prune` handles a stale kit (today it reports "nothing to drop" and a flag-on build still refuses), with a test. Add one comment line on the host's no-op reveal-fit observer (R5). |
| W-2106 | platform-engineer | Before production flag-on: the kit's `sourceHash` covers all of `globals.css`. Decouple the frame CSS, or judge staleness on built bytes. |
| W-2107 | release-manager | The Next security deploy of `80c847c55` alone, after W-2101's upgrade half and the founder's approval. |
| W-2108 | chief-of-staff | The founder ask for that deploy. |
| W-2109 | evaluation-steward | AMD-018 (d) companion diff on `3ef3619ca`: is the frame-QA-record rule a freshness rule or a structural one? |
| W-2110 | release-manager | The flag-on runbook line: a stale manifest refuses the build, so prune or rebuild, then commit. |
| W-2101 (existing) | principal-engineer-ops | Both readiness records. The upgrade half can be approved first and on its own. |
| W-2102 (existing) | backend-engineer | `zod` high. Separate change, separate deploy. |
| W-2103 (existing) | platform-engineer | Desktop parity inside frames. Before production flag-on. |

## Checklist

- [x] Diff read before the accounts; findings R1 to R14 written first
- [x] Protected paths: none touched (R1)
- [x] Flag off is today's app: bundle grep (R3), verbatim move (R4), QA sample (R8); size half by the builder
- [x] `verify`'s failures pre-existing (R7)
- [x] Security: `next` critical cleared; `zod` high pre-existing and routed (R2)
- [x] O1 ruled, with the objection recorded, and coded on the branch
- [ ] Readiness approved by principal-engineer-ops (W-2101)
- [ ] W-2105 done

## Kudos

platform-engineer: the four corrections were each right, and the CSP one would have cost a whole preview round. The predictions were committed before the build, and O1 was raised as an objection rather than worked around.

