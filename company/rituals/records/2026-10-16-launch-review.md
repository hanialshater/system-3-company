# Launch Review: 2026-10-16 (r6, catalog closeout F-46): the 11 lessons `company status` lists as ready

chair: head-of-product (Priya) · slot hop-f46-closeout-r6 · board W-1483 · executes: release-manager (a separate run publishes from this record) · attests: qa-tester, fact-checker, learner-evaluator, analytics-steward (by their records, cited below) · no deploy

Brief: `npm run company -- status` at `cdee168c` lists 11 review lessons as "Ready to publish": penalty-on-wiggle, cut-the-busiest-link, cut-the-rod-for-more, karatsuba-three-not-four, one-road-cuts-the-map, range-min-in-four-nodes, selfish-routes-cost-a-third-more, only-the-needed-trader-profits, outside-option-sets-the-split, patience-wins-the-split, pay-for-the-harm-you-do. The closeout ruling written in the same run is `company/product/2026-10-16-closeout-ruling.md`.

## Readings applied

- **The status line is not a publish list.** `company status` prints a review lesson as ready when `launchGates()` passes: claims verified, a QA record linked, a learner review linked. It does not check that the newest learner verdict is "launch" for the current version, and it ignores `company/ops/publish-holds.json`. The floor is `node tools/publish-ready.mjs` (read-only run at `cdee168c`). It names two candidates, cut-the-busiest-link and zero-loses-to-this-crowd. Nine of the 11 are "held (verdict revise)", and patience-wins-the-split is held by hold W-1333.
- **Ledger.** `decide()` from `tools/publish-ready.mjs` was run over every learner record of each slug, with meta.version, and joined with the publish holds and the claim gate. The method is the one in `company/product/2026-10-16-catalog-closeout.md`, "How to rebuild the ledger".
- **QA counts only if a qa-tester wrote it on the version that ships** (W-1237 reading, launch review r5; wave J 3).
- **Artifact before account.** No walkthrough sheet exists on this host (`artifacts/` is not in the repo and no review server is running). For the one go, I read the lesson as shipped: `src/demos/cs/cut-the-busiest-link/Demo.tsx` (predict, stage messages, reveal). I did that before the r15 learner record and the QA record. The reveal's numbers come from state: 6 × 4 = 24 cross-group pairs, 12 per link before the cut, `doubled to 24` only when the after-count is exactly twice the before-count, and split sizes 6 and 4. They match the predict answer ("24", index 1). This is weaker than reading frames, and I say so in objection 3.

## Per-lesson decisions

| Lesson | CM | Newest learner verdict vs meta | Other gates | Decision | One line of reason |
|---|---|---|---|---|---|
| cut-the-busiest-link | cm-cs (lane 2: principal-pm-verticals) | launch, v2 (`company/reviews/cut-the-busiest-link/2026-10-16-learner-adult-beginner-r15.md`); meta v2 | all claims verified by fact-checker; qa-tester record `2026-10-16-qa-wj-v3.md` (875903c9), built from bf6fde86; `git diff bf6fde86 HEAD -- src/demos/cs/cut-the-busiest-link/ src/kit/` is empty | **go** | Wave J 3 held it only for QA on v2. A qa-tester pass on the shipping code now exists, and the learner launch is for the same version. |
| patience-wins-the-split | cm-economics | launch, v5 (r9); meta v5 | hold: head-of-product r5 A1, W-1333 (open unlock cue). W-1333 is in backlog, and the exploreHint is unchanged ("Add rounds in front of the deadline…") | **no-go** | The hold is mine and its condition is not met. One fix round (XB-econ): the exploreHint names every action the reveal needs, then QA, re-walk, and back here. |
| karatsuba-three-not-four | cm-cs | **revise, v5** (`2026-10-14-learner-cs-learner-r9.md`); meta v5 | none | **no-go** | The current version has a revise verdict: the stage top is cropped at the reveal on a phone. One fix round (XB-cs), and it is the last one (revised on v2-v5). |
| penalty-on-wiggle | cm-ai | revise v6 (r8); meta **v7** | none | **no-go** | v7 has never been walked. The learner walk is XW-1. |
| cut-the-rod-for-more | cm-cs | revise v3 (r8); meta **v4** | none | **no-go** | v4 has never been walked (XW-1). |
| one-road-cuts-the-map | cm-cs | revise v4 (r8); meta **v5** | none | **no-go** | v5 has never been walked (XW-1). |
| range-min-in-four-nodes | cm-cs | revise v4 (r8); meta **v5** | none | **no-go** | v5 has never been walked (XW-1). |
| selfish-routes-cost-a-third-more | cm-cs | revise v5 (r9); meta **v6** | none | **no-go** | v6 has never been walked (XW-1). |
| only-the-needed-trader-profits | cm-economics | revise v2 (r8); meta **v3** | none | **no-go** | v3 has never been walked (XW-2). |
| outside-option-sets-the-split | cm-economics | revise v3 (r8); meta **v4** | none | **no-go** | v4 has never been walked (XW-2). |
| pay-for-the-harm-you-do | cm-economics | revise v3 (r8); meta **v4** | none | **no-go** | v4 has never been walked (XW-2). |

**Go: 1 (cut-the-busiest-link). No-go: 10.** For every no-go, the closeout ruling names the next gate, its owner and its date. A no-go here is not a retirement.

## Committed predictions (analytics steward, before launch)

None has been committed for cut-the-busiest-link. See objection 2. The r5 rows (P1-P3 in `company/rituals/records/2026-10-16-launch-review-r5.md`) are analytics-steward's, written for nine other slugs. I do not extend them to this slug on that role's behalf.

## Open objections travelling with this launch

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | `company status` calls 11 lessons "ready" when 10 of them are not. A reader of the operating picture will over-count publishable lessons by 10. | chair | **Open, routed.** The gate code is protected and is not my surface. I put it on the board for tools-lead (lane 9) as a question: should the status line join `decide()` and the holds? Until then, quote `publish-ready.mjs`, never the status line (chief-of-staff 15:34Z entry in `company/ops/progress.md` says the same). |
| 2 | No analytics-steward prediction is committed for cut-the-busiest-link before launch, which the template asks for. | chair | **Declined as a hold, routed.** The constitution's publish gates do not include it, and wave J 3 and wave J 15 launched without one. Real-learner events are not kept yet (W-706), so no prediction could be scored before a deploy. analytics-steward adds a row to this record before the next deploy that includes this slug. If the row is still missing at that deploy, the release-manager names the gap in the release record. |
| 3 | The go rests on reading source, not frames. No walkthrough sheet is on this host. | chair | **Accepted, non-blocking.** Two independent records saw the running lesson on the shipping code: the qa-tester R4 pass (two cuts, split 6 and 4, reveal overflow 0 px, no console errors) and the r15 learner walk (launch). My source read found nothing that contradicts them. If the release-manager's `npm run verify` or a fresh walkthrough shows a frame that disagrees with the reveal text, this go lapses. |
| 4 | Simulated walks are not learner evidence. | standing caveat | **Stands.** Confidence stays below "**". Nothing here claims that anyone learned. |
| 5 | The r15 non-blocking notes (no link-number caption on the locked stage; "links inside the groups changed too" is not explained) are real friction. | learner-evaluator r15, wave J 3 notes | **Declined as holds, kept as v-next work for cm-cs.** The core comparison (12 → 24) is on screen, and the reveal matches it. F-46 pauses new building, so these go into the lesson's comeback notes, not into a build now. |

## Decision

**go: cut-the-busiest-link. no-go: the other 10.** Signed: head-of-product (Priya), 2026-10-16.

## For the release-manager (the publish run)

1. Re-run `node tools/publish-ready.mjs`. cut-the-busiest-link must still be listed, and `git diff bf6fde86 HEAD -- src/demos/cs/cut-the-busiest-link/ src/kit/` must still be empty. If either is no longer true, this go lapses: do not publish, and come back to the chair.
2. `node tools/company.mjs publish cut-the-busiest-link` (the gates run inside it), then `npm run check`, plus a changelog line citing this record.
3. Do not publish zero-loses-to-this-crowd from this record: its c6 is unverified, and it has no row here.
4. No deploy. Going live needs the founder's approval of that specific deploy (F-48, `company/ops/runbook-deploy.md`).

## Kudos (optional)
- @qa-tester: the wave J v2 QA (875903c9) ran on a recorded build SHA, with an R4 pass that exercised reverse order and reload. That made this go checkable without a new run.
