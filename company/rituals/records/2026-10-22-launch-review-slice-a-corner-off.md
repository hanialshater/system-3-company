# Launch Review: 2026-10-22: slice-a-corner-off

lesson: slice-a-corner-off · version: v2 · domain: math (strand geometry) · brief: company/domains/briefs/math.geometry.md:83-100 (#5)

chair: head-of-product · executes: release-manager (code, ship stage) · attests: qa-tester, fact-checker, learner-evaluator

Read order: I read the walkthrough (transcript.md, sheet.png) first, then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading)
- Predict: the question gives the cube's count first (8 − 12 + 6 = 2), so "Still 2" is a real choice against "more pieces, more corners".
- Chips 1 to 4 in DOM order reach both milestones. The first slice gives 10 − 15 + 7 = 2 with "+2 corners, +3 edges, +1 face" and a shaded triangle. The second gives 12 − 18 + 8 = 2 as two separate triangles. The pyramid is 5 − 8 + 5. Slicing its tip gives 8 − 12 + 6 = 2, with "+3 corners, +4 edges, +1 face" and a shaded square. Every drawing matches its readout.
- The chips keep the "+2 − 3 + 1 = 0" and "+3 − 4 + 1 = 0" traces after Reset, so the reveal's arithmetic stays checkable.
- The reveal is about 79 words (≤ 90) and fits at phone size. In v2 the rule is scoped to "a small slice that cuts only the k edges at a corner", which resolves the v1 dispute.
- Stage words: the busiest frame has 17 (key 3 + change line 3 + chips 11). That is the brief's own stated total when the readout key is added, and it is ≤ 25.

## Gates (from the order's stage history and meta.json)
- [x] All claims verified by someone other than the builder: fact-checker verified c1–c4 on 2026-10-22 (v2 record). c3 is cited to Euler E230 (1758) and the Encyclopedia of Mathematics, and the learner text has no date.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v2, pass, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-cube-parts.md, v2, Verdict: launch.
- [ ] Accessibility review: not run. It is advisory in this run, not a gate (see objections).
- [x] Confidence mark matches evidence: confidence is empty, so no `**` is claimed.

## Committed predictions
None are recorded here because this run has no analytics-steward (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| This launch record commits no analytics-steward predictions. That role arrives with M7. | head-of-product (M7: analytics-steward) | No steward exists in this run. If the chair wrote the predictions, it would be grading its own launch. They get committed when M7 adds the role. |
| Accessibility review was not run. It is advisory in this run, not a gate. | accessibility-reviewer | QA passed the 44 px target contract, and the cut faces are shaded as well as outlined. A full review (screen-reader labels on the drawings and the change line) is owed before v3. |
| The learning-designer is merged into the builder (F-f), so no independent design review happened. | head-of-product | An independent fact-check (twice) and a learner review both looked at the artifact before the account, and neither found a design block. |
| After Reset the reveal's picture shows the whole cube, while the reveal says "Slicing a corner off your cube …" (learner review note 4). | demo-builder (v3) | The recorded traces on the chips survive Reset, so the numbers can still be checked. v3 should keep the last sliced solid (or a faint trace) into the reveal, as ant-on-a-cube does. |
| "Convex solid" in the reveal is not explained for this learner's boundary, who may read it as "every solid" (learner review note 5). | demo-builder (v3) | The claim is correctly scoped and the trust sheet says "convex polyhedron". v3 should add a plain gloss ("with no dents or holes") within the 90-word reveal. |
| The "Slice another" chip records no trace after it is pressed, unlike the other two action chips. | demo-builder (v3) | The readout and change line show its result (12 − 18 + 8 = 2), and it is not a milestone. v3 can give it a trace for consistency. |
| The walkthrough's trust sheet predates the fact-check and shows every claim as "NOT YET CHECKED". | code (walk stage ordering) | meta.json is the truth (all four verified), and the live trust sheet reads meta.json. Only the recorded artifact is stale. |
| The builder added c4 (the recall) beyond the brief's three planned claims. | cm-math | It covers a sentence the learner sees and is verified. The brief should plan recall claims next time. |

## Decision
go

Signed: head-of-product, 2026-10-22. v2 of slice-a-corner-off meets its brief and the accept criteria. Every claim was verified independently after the v1 dispute was fixed, QA passed on phone and desktop, and the learner review says launch. The objections above travel with it.

## Kudos (optional)
- @fact-checker: built a counterexample (a cut through the 3 neighbours gives 7, 12, 7) that showed the unscoped rule was false and pointed the fix at the exact scope.
