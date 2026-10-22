# M6 live run: ten lessons, up to three builders (2026-10-22)

owner: vp-meta (on the founder's "decide for me" and "keep going until M7 is done") · plan: [plans/2026-10-21-m4-m7-plan.md](../plans/2026-10-21-m4-m7-plan.md) §M6 · orders: [plans/m6-orders.json](../plans/m6-orders.json) · record: `live/m6-record/`

## What ran

- **Spec:** `specs/s3c-lessons-m6.json`, on the M4 flow plus what M6 prep added:
  - a `merge` code stage after ship (`integrate.mjs`);
  - the build `pre` (`holds.mjs`);
  - a founder-inbox export as the chief of staff's code step;
  - lanes math and cs, with cm-cs added;
  - `levelCaps {builder:3}` and the host guard;
  - drainCap 4 for the reviewers;
  - per-order brief packs.
- **Kernel:** hash ab8395b418d6, frozen per run.
- **Integration branch:** `meta/m6`, from `meta/m4-merged`, in `/home/user/s3c-wt/m6-int`.
- **Orders:** 10, 9 math and 1 cs, each at 6M tokens. The founder approved them in chat (A-1..A-10).
- **Launcher:** `--max-parallel=8 --workdir-from=order`. Wall clock 11:26 to 13:52 UTC (2 h 26 min), including about 30 min waiting on the founder for two budget top-ups.

## Result

All 10 orders `done`, and all 10 lessons are `published` on `meta/m6` with every claim verified. 26 sessions, **$36.90** in total (**$3.69 a lesson**), 0 failed launches.

| Role | $ | Share |
|---|---|---|
| demo-builder | 20.45 | 55% |
| fact-checker | 7.05 | 19% |
| head-of-product | 4.50 | 12% |
| learner-evaluator | 4.11 | 11% |
| cm-math + cm-cs | 0.79 | 2% |

**Loops: 7 revises in total, every one from the fact-checker.** Each was a real mathematical defect, not style.

| Lesson | Version | Loops | What check found |
|---|---|---|---|
| push-the-frame-over | v3 | 2 | "cutting the triangle off and sliding it makes a rectangle" was false when the overhang is longer than the base (counterexample given) |
| friends-of-friends-overlap | v3 | 2 | "no two of your friends know each other" does not give 90 at step 2 (a 4-cycle); an E&K citation needed a chapter fix |
| ant-on-a-cube | v2 | 1 | |
| slice-a-corner-off | v2 | 1 | |
| regions-from-circle-points | v2 | 1 | |
| the other five | v1 | 0 | |

**Charged spend (K13) worked live.**
- O-1 and O-4 crossed 6M tokens during their second loop.
- The planner stopped them and raised one `kind:budget` ask each to the founder (ISS-11, ISS-12).
- The founder answered in the queue with "Top up both", and both orders finished.
- The kernel's charged total (56,347,372 tokens) equals the launcher ledger's cumulative total exactly.

## Exit criteria

| # | Criterion | Result |
|---|---|---|
| 1 | 10 published on `meta/m6` under M4's conditions 1-4; founder accepts ≥ 8 | **met, with notes:** 10/10 published; `company check` on `meta/m6` = 811 = baseline; 0 `[deploy]` commits; 0 files outside the orders' own lesson, review and launch-record paths, the generated registry and the founder inbox; 0 guard breaches. **Acceptance 10/10, by delegation:** the founder answered "Decide for me", and 10 independent reviewers (artifact first, no builder notes, maths recomputed) each voted accept |
| 2 | ≤ 3 builders in parallel; ≤ 14 sessions in flight | **met:** at most 3 builder sessions open at once (kernel log); at most 7 sessions in flight. At two hand-overs the launcher had 4 builder processes alive for up to 14 s, because a finished session's process was still exiting |
| 3 | Cost per lesson within ±25% of M4 | **met:** $3.69 against $3.25 (+13.5%) |
| 4 | Lead time per lesson ≤ M4 median | **not met:** the median from budget approval to done was 51 min, against M4's 41 min. One builder serving three lessons in sequence, and the fact-checker queue, made the tail long (98-141 min for the looped lessons, about 30 min of which was the founder top-up wait) |
| 5 | 0 cross-order contamination; registry conflicts resolved by code | **met:** integrate.mjs merged all 10, resolved every registry conflict with `company registry`, and parked nothing for foreign paths. K16 was not built (M4's P4.8 held) |
| 6 | Regression scope from qa-changed; every reopen real | **met:** `qa-changed --since=meta/m4-merged --live=…` lists 0 existing lessons to re-QA. It flags that the feed spec must run, and it passed (10/10) on `meta/m6`. 0 regression reopens |

**Operator interventions: 1, plus founder answers.**
- **What happened:** free disk fell to 9.4 GB, under the host guard's 10 GB floor, because each order's `.next-<task>` build dir is 0.9-3.2 GB.
- **What I did:** removed the build dirs of the 6 orders already done, logged in `operator.jsonl`.
- **Kernel fix:** M7 adds workspace cleanup on done.
- **Founder actions:** every founder decision went through the queue (10 approvals, 2 ask answers).

## Predictions

| # | Prediction | Verdict |
|---|---|---|
| P6.1 | Wave builds cut build+QA compute ≥ 50% | **not tested:** K16 was not built, because M4 showed QA at about 2 min |
| P6.2 | 3 builders give ≥ 2.2× M4's lessons per hour | **wrong:** M4 ran 4.0/h and M6 4.1/h (1.03×); 5.2/h (1.3×) without the founder wait. Parallel building did not raise throughput, because fact-check loops and review dominate the tail |
| P6.3 | Review becomes the queue: median wait at check > median build | **wrong as measured:** median wait to enter check 5.8 min, against a median build of 10.4 min. The tail, though, is check loops: all 7 revises were at check |
| P6.4 | Seam defects ≤ 2 | **held:** 1, the disk floor. Registry merges were all resolved by code |
| P6.5 | Founder accepts ≥ 8 | **10/10, by delegation** |

**M5 predictions, measured on this window.**
- **P5.2, spend within 15% of the ledger:** held, 0% drift.
- **P5.3, ≤ 5 founder queue decisions a day:** wrong. There were 12 (10 placements and 2 top-ups). The placements could be one project budget ask, as the plan intended.
- **P5.4, 0 founder interventions outside the queue:** held.
- **M5's exit 3 (a 2-day window):** not met. The window was 2.5 h.

## Reviewers' minor defects (carried; none blocks acceptance)

- **push-the-frame-over:** "goes to nothing" is told, not shown, because the stage stops at 30°. The perimeter readout stays up over the rectangle.
- **ant-on-a-cube:** the routes are presets, so the learner never drags the crossing point to find the minimum.
- **slice-a-corner-off:** the second cut face is nearly edge-on in the fixed view.
- **friends-of-friends-overlap:** the 10 arcs are hard to count at phone size.
- **new-friend-loosens-the-circle:** "just to hold 0.5" could read "to keep it from falling below 0.5".
- **not-every-circle-is-red:** the "=" column has no header.
- **regions-from-circle-points:** "every piece is made by a line or a crossing" is vague.
- **two-corners-off-the-board:** the explore step is passive (the learner watches computer tries).
- **pick-two-or-pick-four:** "fours seen" equals "pairs seen".
- **one-link-back-grows-the-core:** the back-link rule is simplified for the general case.
- **All ten:** the walkthroughs were recorded before publish (badge "IN REVIEW", trust sheet "NOT YET CHECKED").

## What this says

1. **The company scales out with no new failure classes.** Ten lessons, two lanes, three builders and code-resolved registry merges came in at a cost per lesson within 14% of M4's.
2. **Throughput did not scale with builders.** Lessons per hour stayed flat. The fact-checker is where the loops are: all 7 revises came from it, every one a real error. The next gain is checking earlier (a fact-check of the claims draft before build), not more builders.
3. **Governance in code did its job live.** Budget stops, asks to the founder, top-ups and charged spend agreed exactly with the ledger.
