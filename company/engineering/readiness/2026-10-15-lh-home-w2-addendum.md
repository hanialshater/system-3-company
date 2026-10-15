# Operational readiness: lh-home-w2-addendum

change: Home wave W2 (laundry drying): 10 lessons moved to engine 2 (b5ee4ca, merged in 9302c25); first users of homeDifference ({diff}, {ratio}), plainNumbers and homeSliderMatters; unit tests for those three added (W-1112)
change-tier: 2
paths: src/lib/lifehacks/home-lessons.ts, src/demos/lifehacks/{towel-spread-dries-first,towel-over-two-bars,garment-overlap-hides-face,half-size-two-towels,humidity-evaporation-gap,breeze-is-not-extra-surface,folded-shirt-stack-height,wet-knit-hang-stretch,drying-room-water-load,square-bow-stays-tied}/meta.json, tests/lifehacks/home-v2.test.mjs
author: demo-builder
approved-by: principal-engineer-ops
approved: 2026-10-15
approved-scope: wave W2 as merged in 9302c25 (b5ee4ca together with the a69c7e7 ratchet fix), plus tests/lifehacks/home-v2.test.mjs (fe38c6c, merged in 2e7852d). b5ee4ca on its own is NOT approved. W-1114 is not covered
board: W-1112, W-1070, W-1066
risks: none proposed (see 7)
links: addendum to company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md (its approval excludes b5ee4ca and sets condition 2); commits b5ee4ca (W2), a69c7e7 (ratchet fix), 9302c25 (merge); tests added on branch lh-tests

Tier 2 because the Home engine renders 69 lessons (paths.json: src/lib/lifehacks/** is shared-engine) and W2 is the first content that switches on three TP-2 code paths no lesson used at bd11754. **Approved with conditions (principal-engineer-ops, 2026-10-15); see the end.** The author does not approve it.

## What the parent approval asked for, and where it stands

| Parent condition / revoke trigger | State at 55a06e9 (code identical to 9302c25: `git diff --quiet 9302c25 HEAD -- src tests tools package.json`) |
|---|---|
| W2 needs its own approval "once the suite is green at its commit" | At b5ee4ca alone the suite is 62/64 (two inventory ratchets). The ratchet fix is a69c7e7, which is in 9302c25. b5ee4ca never ships without it: a deploy takes main, and main has both. The suite is green at the merge: **66/66** before my test file, **78/78** with it. I ask for approval of W2 **as merged in 9302c25**, not of b5ee4ca on its own. |
| Condition 2 (W-1070/W-1066): unit tests for `homeDifference` (sign, opposite-sign values, zero smaller), `plainNumbers` formatting and `homeSliderMatters` before any lesson that uses them is approved | Done: `tests/lifehacks/home-v2.test.mjs`, 12 tests (details in 2). |
| Revoke: a v2 lesson with a hidden slider where a cell changes | No W2 lesson hides its slider. `homeSliderMatters` is true for all 9 W2 v2-stage lessons (the 10th, square-bow-stays-tied, is on the bow stage and never calls it). The function itself is now tested at its boundary (a change only at `max` is seen). |
| Revoke: a reveal that shows a raw `{token}` | Tested at **every slider step** of all 9 W2 v2-stage lessons, not just min/initial/max: no `{token}`, `NaN`, `Infinity` or `undefined`. |
| Revoke: `test:lifehacks` failing | 78/78 (below). |

## The check

1. **What can fail.**
   (a) A `{ratio}` reveal reading "…  times faster" with an empty number, because `homeDifference` returns `ratio: ""` when the smaller result is 0. Six W2 lessons use `{ratio}`. The new W2 test asserts the ratio is non-empty at every slider step of each of them, and it holds.
   (b) `{ratio}` across results of opposite sign compares sizes (|5| over |−2| = 2.5), which would read oddly in a sentence. No W2 lesson that uses `{ratio}` has a result that crosses zero. They are areas, times, layers, humidity push and speed, and the W2 test asserts at every slider step that both results share a sign and the smaller is not zero. The behaviour is now pinned by a test, so a later wave that needs signed ratios has to change it on purpose.
   (c) `plainNumbers` prints a negative smaller than 0.005 as "−0". That is a real but unreached edge: the four plain-number W2 lessons have no negative cell. It is pinned by a test and not fixed here, because fixing it would be another engine change needing its own readiness.
   (d) Worst case: a learner sees a wrong or malformed number in a W2 reveal at a slider value nobody tried. The every-step sweep makes that unlikely for today's specs. Learners would see it; no data is touched.
2. **How we would know.**
   - `npm run test:lifehacks` at 55a06e9 plus the new file: **78 tests, 78 pass, 0 fail** (was 66/66 without it).
   - New tests: homeDifference (5): gap with unit either way round, opposite signs (full distance 7, ratio of sizes 2.5), both negative, zero smaller (ratio empty) and both zero, a float near-zero, equal results, diff in the spec format but ratio always plain, resultUnit, and the tokens in a revealLine. plainNumbers (3): two decimals, trailing zeros dropped, thousands separator, real minus, float snapping, the R5 path unchanged without the flag, and amount and result cells (literal and null cells untouched, signed verdict keeps "+"). homeSliderMatters (2): false when no cell moves, true for one column only, the last step sampled, fractional steps reach `max`, and a change hidden below three significant figures is not a change (but is under plainNumbers). W2 ratchet (2): an every-step sweep as in the table (plus: where `{ratio}` is used, both results share a sign), and no R5 trailing zero in any cell or reveal of the plain-number lessons.
   - Mutation check, to show that the tests bite. Each mutation was applied to engine-v2.ts alone and reverted afterwards: dropping `Math.abs` on diff (1 failure), ratio not forced plain (2), zero guard dropped (2), three decimals instead of two (4), last slider step skipped (1), amounts ignoring plainNumbers (3). **All 6 caught.**
   - QA contract, production build (`next build`, NEXT_DIST_DIR=.next-lht, `QA_PORT=3741`, server started by QA), harness stamp `clean: true`, contract commit 3b97991. **W2: 20/20** (10 lessons × phone and desktop). **Toggle slate and cord: 14/14** (packing-cube-walls, pillowcase-set-kit, shelf-front-labels, rolled-or-folded-volume, suitcase-rotate-block, long-cord-knots-itself, coiled-cord-bend-radius × 2 viewports).
   - `npm run check`: passed (960 lessons, 5193 claims; 2 warnings on unrelated lessons). `npx tsc --noEmit`: exit 0.
   - No production meter: the W2 lessons are at `review`, not published.
3. **How to roll back.** `git revert -m 1 9302c25` takes out the whole lh-home merge. To take out W2 only, `git revert b5ee4ca`, and expect the a69c7e7 inventory ratchet in engines-v2.test.mjs to fail: it lists the W2 lessons as engine 2, so its W2 lines must be reverted too. That is minutes, with no data loss, and no founder needed before a deploy. After a deploy, the revert needs a new founder-approved deploy, or a Vercel rollback to the previous production deployment (runbook-deploy.md). The test file needs no rollback: it only reads.
4. **Capacity.** Run time: none (pure client rendering, no requests). `homeSliderMatters` runs on each render, over at most 51 slider steps for the W2 specs; PE-ops measured it under 1 ms. Tests: the new file adds about 0.1 s. Build: unchanged. One local build dir (.next-lht) during QA, deleted afterwards.
5. **Security.** No new routes, parameters, scripts or secrets.
6. **Data.** Writes nothing. No learner data.
7. **Risks.** No register change proposed. The open edges (b) and (c) above are pinned by tests rather than entered as risks, because no shipped lesson reaches them.

## Not covered by this addendum

- **The W-1114 accessibility change (pressed mode button without aria-disabled) is not in it.** It was not built: the protected QA contract blocks it (see the lh-tests commit message and the board item routed to evaluation-steward). W2's v2-stage lessons start with no mode pressed (R2 neutral start), so the block does not affect them. square-bow-stays-tied's "Walk 25 steps" action button keeps `aria-disabled` once walked, as before.
- Claims: W2's claims were reset to unverified in b5ee4ca, and nothing here changes learner-visible text. This addendum makes no claim about their truth.

## Approval (written by principal-engineer-ops)

- Decision: **approved, with conditions, for W2 as merged in 9302c25, with home-v2.test.mjs.** This closes condition 2 of the parent approval (company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md) for homeDifference, plainNumbers and homeSliderMatters. The parent's "W2 needs its own approval once the suite is green at its commit" is answered at the merge, not at b5ee4ca. That is acceptable because b5ee4ca never ships without a69c7e7. Approval does not cover publishing: the W2 claims are unverified, and a deploy still needs the founder.
- What I checked. I ran these on a clean detached worktree of main at 120b8f9, whose src, tools and package.json are identical to 9302c25 and whose tests are identical to 2e7852d. I ran them before relying on the record's numbers:
  - `npm run test:lifehacks`: **78/78**.
  - Two mutations of my own, different from the builder's six, each applied to engine-v2.ts alone and then reverted. An inverted ratio (`lo / hi`) gave **4 failures**. A `homeSliderMatters` loop that skips the first and last steps gave **1 failure**. Both were caught, so the tests bite on bugs the builder did not choose.
  - Production build (`NEXT_DIST_DIR=.next-ops`, port 3761, server started and stopped by QA): QA contract for the 10 W2 lessons, **20/20**. This matches the builder's 20/20 independently.
  - The worktree and its build directory were removed afterwards. Nothing in /home/user/system-3-company was built or touched except this file.
- Conditions. None of them gates this ship. Each must close before the work named in it. Board ids are listed; the coordinator places any that are missing.
  1. **W-1070 (demo-builder): before the first lesson whose `{ratio}` results can cross zero or reach zero.** Decide and test the signed-ratio wording. Today the behaviour is pinned: ratio of sizes, and empty at zero. A lesson that needs something else changes the engine and needs its own readiness. It must not get there by a new spec.
  2. **W-1066 (demo-builder): before the first plain-number lesson with a negative cell.** Fix "−0" in `plainNumbers`, which is pinned today and unreached. That is an engine change, with a tier-2 record.
  3. **Fact-checker, then release-manager: before any W2 lesson publishes.** Re-verify the claims reset in b5ee4ca. This approval says nothing about their truth.
  4. **W-1114 (evaluation-steward, contract amendment): before the pressed-mode-button change is built.** It is out of this scope, and W2 does not depend on it, because R2 starts neutral.
- What would make me revoke it:
  - `test:lifehacks` failing on main.
  - Any of the 10 W2 lessons failing the QA contract on a production build.
  - A W2 reveal showing a raw `{token}`, `NaN`, an empty ratio or "−0".
  - b5ee4ca shipping without a69c7e7.
  - home-v2.test.mjs being weakened (a test removed or loosened) without a readiness note.
- Objections raised, and what happened to each:
  - (a) *My own objection: "b5ee4ca alone is 62/64."* Answered by scope. The approval names the merge, and the header excludes b5ee4ca on its own.
  - (b) *My own objection: "edges (b) and (c) are pinned, not entered as risks."* Accepted, and turned into conditions 1 and 2 so they travel with the next lesson that reaches them. They do not go in the register while no shipped lesson reaches them.
  - No other objections are on record for this addendum.
