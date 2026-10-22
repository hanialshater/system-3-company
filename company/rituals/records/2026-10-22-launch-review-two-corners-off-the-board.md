# Launch Review: 2026-10-22: two-corners-off-the-board

lesson: two-corners-off-the-board · version: v1 · domain: math (strand discrete) · brief: company/domains/briefs/math.discrete.md:519-536 (#4)

chair: head-of-product · executes: release-manager (code, ship stage) · attests: qa-tester, fact-checker, learner-evaluator

Read order: walkthrough (transcript.md, sheet.png) first, then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading)
- Predict: "14 squares, 7 dominoes" makes "Yes" feel like plain arithmetic, which is the misconception. The locked readout is "dark ? · light ?", so the counts are not handed over.
- I recounted the locked board. The removed corners (0,0) and (3,3) are dotted (dark) positions, which leaves 6 dotted and 8 plain squares. The step-1 best try leaves (2,3) and (3,2) outlined in red dashes, and both are plain (light). Every drawn domino spans one dotted and one plain square.
- Chips 1 and 2 fire both milestones (6/8 with 2 uncovered; 7/7 tiled). Chip 3 gives a different full tiling on the one-row board.
- The reveal (79 words, as briefed) keeps both boards side by side with their counts, so "6 dark and 8 light" vs "7 and 7" can be checked while reading. It fits at phone size.
- Shape, not colour: dark squares carry a dot; uncovered squares are dashed outlines.

## Gates (from the order's stage history and meta.json)
- [x] All claims verified by someone other than the builder: fact-checker verified c1–c3 on 2026-10-22 with an independent brute force (0 tilings and max 6 dominoes; 12 tilings; 30/32; 16/18).
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v1, pass, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-dominoes.md, v1, Verdict: launch.
- [ ] Accessibility review: not run. Advisory in this run, not a gate (see objections).
- [x] Confidence mark matches evidence: confidence is empty; no `**` is claimed.

## Committed predictions
None recorded here: there is no analytics-steward in this run (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward predictions are committed in this launch record; the role arrives with M7. | head-of-product (M7: analytics-steward) | There is no steward in this run, and predictions written by the chair would grade its own launch. They will be committed when M7 adds the role. |
| Accessibility review not run; advisory in this run, not a gate. | accessibility-reviewer | Dots mark dark squares and uncovered squares are dashed, and QA passed the 44 px target contract. A full review (screen-reader labels for the boards) is owed before v2. |
| The learning-designer is merged into the builder (F-f); no independent design review. | head-of-product | An independent fact-check and an independent learner review both read the artifact before the account. Neither found a design block. |
| On the natural path, "Another try" lands on the one-row board, which tiles anyway. A learner who thinks "you just didn't try hard enough" never sees the impossible board resist a second attempt, yet the reveal says "2 light squares were always left" (learner review note 3). | cm-math (brief order) and demo-builder (v2) | The brief fixes this DOM order. The colour count in the reveal is the proof and stands without the extra try. v2 should point the panel at "another try on the opposite-corners board", or have the brief reorder the chips, so "always" is something the learner watched. This is the strongest note on this lesson. |
| A careful learner can count the dots on the locked predict board and read off 6/8 before choosing. | demo-builder (v2) | Counting is the very move the lesson teaches, so a learner who does it has already reached the insight. It does not reward a guess. |
| The walkthrough trust sheet predates the fact-check and shows every claim as "NOT YET CHECKED". | code (walk stage ordering) | meta.json is the truth (all three verified), and the live trust sheet reads meta.json. Only the recorded artifact is stale. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of two-corners-off-the-board meets its brief and the accept criteria. Every claim was verified independently by brute force, QA passed on phone and desktop, and the learner review says launch. The objections above travel with it.

## Kudos (optional)
- @learner-evaluator: noticed that the briefed chip order shows "Another try" only on the board that tiles. That is a design gap no gate would catch.
