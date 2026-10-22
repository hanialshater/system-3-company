# Launch Review: 2026-10-22: regions-from-circle-points

lesson: `regions-from-circle-points` · version: v2 · domain: math (strand discrete) · format: single card
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/regions-from-circle-points/transcript.md, sheet.png, recorded 13:05, v2), then meta.json, then the fact-check (v1 and v2), learner and QA records. build.md and design.md were not read.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the question adds "unevenly so no three lines meet at one spot" to the brief's kit text. That condition is needed: without it the evenly spaced case (30, c4) would make 30 a defensible answer. The options are 30 / 31 / 32, and 32 is the strong pull. The locked stage shows one point, one piece, and "?" in every other column, so it does not leak the answer.
- Explore: chips 2 to 6 points and Reset, in the brief's DOM order. Each chip draws the chords, red crossing dots and two-tone shaded pieces, and fills one column of a points / lines / crossings / pieces table. The brief asked for a one-line readout; the table is a better picture, because it keeps every case and lets the learner check 1 + lines + crossings column by column. At 6 points the table shows 31 next to 16. Reset sends the circle back to 1 point but keeps the table, so the milestone values survive.
- Reveal: it fits at phone width under a smaller 6-point circle and the full table. It answers "why 31, not 32" with numbers the learner has already seen (1 + 15 + 15) and ends with the lesson's point. The v1 fact-check's false sentence ("the count was never doubling") is now "the rule was never doubling: it only matched doubling up to 5 points", which is true.

## Gates
- [x] All claims verified by someone other than the builder: c1 to c4 verified by fact-checker on 2026-10-22 on v2 (meta.json and 2026-10-22-fact-check-v2.md). The v1 finding (c2 and reveal wording) is fixed in both places. The walkthrough's trust sheet says NOT YET CHECKED because it was recorded before the v2 check; meta.json is the record.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v2, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-pattern-trusting-counter.md, `lesson version: v2`, `Verdict: launch`.
- [ ] Accessibility review: none on file. Advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners, so the lesson claims no `**`.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7. | head-of-product (until M7 adds analytics-steward) | The enforced gates pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. The picture's text alternative reads "1 points on a circle, 0 lines, 0 crossings, 1 pieces" (no singular), and crossings are marked by red dots on blue. | head-of-product; accessibility-reviewer when it runs | The numbers are all in the text table, so nothing depends on colour alone. The plural nit and a contrast check are owed. |
| The learning-designer is merged into the builder (F-f), so nobody reviewed the pedagogy independently before build. | head-of-product | The artifact-only learner review found the break from 32 to 31 is seen in the learner's own table. A known structural cost, not a defect here. |
| Learner note 3: a learner who picks 30 is told 31 but not why 30 is wrong; 30 is the evenly spaced answer (c4), which the stage never shows. | cm-math-discrete / demo-builder, for a v2 | The question already rules out three lines meeting at one spot. A v2 could add a "spaced evenly" chip that shows the centre meeting and 30. |
| Learner note 4: "crossings come from groups of four" is stated, not shown; only the 4-point frame (four points, one crossing) supports it. | demo-builder, for a v2 | c3 verifies it, and the table's crossings row (0, 0, 0, 1, 5, 15) is checkable. Highlighting one crossing's four points would show it. |
| Learner note 5: the panel says "count the pieces", but 31 pieces cannot practically be counted by hand on a phone; the learner trusts the readout. | demo-builder, for a v2 | The reveal's rule is checked from the table, not from a hand count. Rewording the panel ("watch the pieces column") would be more honest. |
| The predict text "Pieces: 1 point, 1. 2 points, 2. 3: 4. 4: 8. 5: 16." is hard to parse (numbers separated only by colons and full stops). | demo-builder, for a v2 | It is true and the learner review shows it was read correctly. A list ("1 point → 1 piece, 2 → 2, 3 → 4 …") would read faster. |
| Trust-sheet c1 ends "Recall: a rule that holds in the first five cases…", a context-free "Recall:" for a learner who opens the sheet before the recall card. | demo-builder, for a v2 | It is true and only in the trust sheet. Same wording fix as carried on pick-two-or-pick-four. |
| `evidence.simulatedLearner` in meta.json is empty, although a v2 learner review exists. | demo-builder / code (record linking) | Bookkeeping, not learner-facing; the trust sheet under-counts reviews until it is linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v2 of regions-from-circle-points goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: caught the v1 reveal saying "the count was never doubling" next to "doubling held up to 5 points", a contradiction a learner would have read in the lesson's key sentence.
