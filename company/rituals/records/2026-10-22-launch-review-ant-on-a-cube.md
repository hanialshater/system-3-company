# Launch Review: 2026-10-22: ant-on-a-cube

lesson: ant-on-a-cube · version: v2 · domain: math (strand geometry) · brief: company/domains/briefs/math.geometry.md:65-82 (#4)

chair: head-of-product · executes: release-manager (code, ship stage) · attests: qa-tester, fact-checker, learner-evaluator

Read order: walkthrough (transcript.md, sheet.png) first, then meta.json, then the fact-check (v1 and v2), learner and QA records.

## What the walkthrough shows (chair's own reading)
- Predict: three options map to the three routes a learner can picture (edges 3.0, diagonal + edge ≈ 2.4, something cleverer ≈ 2.2). The 2.4 decoy is the misconception.
- Chips 1 to 4 in DOM order reach every milestone: edges 3.00 m, diagonal then edge 2.41 m, the 2 by 1 net with the straight line √(1² + 2²) = 2.24 m crossing the dashed shared edge at its middle, then the folded path bending at the midpoint of the front-right edge (I checked the crossing against the drawn front face: it is at half height).
- After Reset the bent path stays dashed and the chips keep their recorded lengths, so the reveal's numbers can be checked on the stage.
- Reveal (about 82 words, ≤ 90) fits under the picture at phone size. In v2 it is scoped to "a box" and names the front and right faces, which resolves the v1 fact-check disputes.
- Stage words: 14 per frame under demo-standard counting (units after numbers count 0), within the brief's 16 spaced / 14 fused and the ≤ 25 cap.

## Gates (from the order's stage history and meta.json)
- [x] All claims verified by someone other than the builder: c1–c5 `verified` by fact-checker 2026-10-22 (v2 record). The v1 disputes on c2 and c4 were fixed in v2 and re-checked.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v2, pass, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-pythagoras.md, v2, Verdict: launch.
- [ ] Accessibility review: not run. Advisory in this run, not a gate (see objections).
- [x] Confidence mark matches evidence: confidence is empty; no `**` is claimed.

## Committed predictions
Not recorded here: no analytics-steward in this run (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward predictions are committed in this launch record; the role arrives with M7. | head-of-product (M7: analytics-steward) | The run has no steward. If the chair invented predictions, it would be grading its own launch. They will be committed when M7 adds the role. |
| Accessibility review was not run; it is advisory in this run, not a gate. | accessibility-reviewer | QA passed the 44 px target contract and the routes differ in shape (solid vs dashed). A full review of the screen-reader labels is owed before v3. |
| The learning-designer is merged into the builder (F-f), so no independent design review happened. | head-of-product | An independent fact-check (twice) and a learner review both ran on the artifact before the account, and neither found a design block. |
| The reveal says "no route over other faces is shorter", but the stage never shows another pair of faces, so the learner takes it on trust (learner review note 5). | demo-builder (v3) | Claim c3 is verified and is in the trust sheet, and symmetry makes it guessable. v3 could add one "try another pair" state if the word budget allows. |
| The reveal names "front and right faces", but the stage never labels faces (learner review note 4). | demo-builder (v3) | The picture makes the pair unambiguous. Labelling the faces would cost stage words. |
| The reveal says "1 by 2 rectangle", but the screen-reader label says "2 by 1" (fact-checker minor). | demo-builder (v3) | Both describe the same net. v3 should use one wording in both places. |
| The walkthrough trust sheet predates the fact-check and shows every claim as "NOT YET CHECKED". | code (walk stage ordering) | meta.json is the source of truth (all five verified), and the live trust sheet reads it. Only the recorded artifact is stale. |
| The builder added c4 and c5 beyond the brief's three planned claims. | cm-math | Both cover sentences a learner sees (the told rule and the recall), and both are verified. The brief should list them next time. |

## Decision
go

Signed: head-of-product, 2026-10-22. v2 of ant-on-a-cube meets its brief and the accept criteria. Every claim was verified independently after the v1 disputes were fixed, QA passed on phone and desktop, and the learner review says launch. The objections above travel with it.

## Kudos (optional)
- @fact-checker: in v1, caught that the general rule ("unfold any surface") was false beyond convex boxes. That kept an overgeneral sentence away from learners.
