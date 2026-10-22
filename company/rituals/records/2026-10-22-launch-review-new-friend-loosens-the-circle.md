# Launch Review: 2026-10-22: new-friend-loosens-the-circle

lesson: `new-friend-loosens-the-circle` · version: v1 · domain: math (strand discrete) · format: single card
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/new-friend-loosens-the-circle/transcript.md, sheet.png), then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the question restates the brief's prediction and defines clustering in place, with three distinct options. The locked stage shows Ana, B to E, B–C, C–D and D–E solid, the other three pairs dashed, and "linked pairs 3 of 6 = 0.5".
- Explore: the chips run in the brief's DOM order: Fay knows 1, 2, 3, then No Fay. I counted the lines in each screenshot. Fay knows E gives 4 of 10 = 0.4. Fay knows D and E gives 5 of 10 = 0.5. Fay knows C, D and E gives 6 of 10 = 0.6. No Fay goes back to 3 of 6. Each chip keeps its value (✓ 0.4 / 0.5 / 0.6), so the milestones survive No Fay. The stage has 6 nodes and no node taps.
- Reveal: it fits at phone size with the stage top visible, runs to about 75 words (the budget is 90), and quotes the recorded values 0.4, 0.5 and 0.6. It names the mechanism: 4 pairs added to the bottom, 1 to the top per friend Fay knows. It matches the brief's draft.
- Brief's build note on 0.3: no chip shows k = 0, but the recall question does, and claim c2 says so in its source. That satisfies the note.

## Gates
- [x] All claims verified by someone other than the builder: fact-checker verified c1, c2 and c3 on 2026-10-22 and found no unrecorded claims. The section number for c3 (E&K 3.1) stays unconfirmed, as the brief marks it.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-friend-pairs.md, `Verdict: launch`, v1.
- [ ] Accessibility review: none on file. It is advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7. | head-of-product (until M7 adds analytics-steward) | The enforced gates (claims, QA, learner review) pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. Colour separates Fay's new links (green) from old links (blue), and dashed lines from solid ones. | head-of-product; accessibility-reviewer when it runs | The readout gives the count as text in every state, and the chips record values in words, so colour is not the only carrier. An accessibility pass is still owed. |
| The learning-designer is merged into the builder (F-f), so no one reviewed design.md's pedagogy independently before build. | head-of-product | The artifact-only learner review found the misconception refuted on screen. The fact-checker found no unrecorded claims. This is a structural cost, not a defect in this lesson. |
| Claim c2 says "Fay must know at least 2 of the 4 to keep it at 0.5", which is learner-visible on the trust sheet. Knowing 3 gives 0.6, so the accurate wording is "at least 0.5". | demo-builder (v2 wording) | The fact-checker verified it, reading it as "keep it from falling below 0.5", and flagged the wording as optional. The reveal's own wording ("just to hold 0.5; knowing 3 lifted it to 0.6") is exact. |
| Learner-review notes that do not block: (a) the stage has no key for its line styles, and Ana's grey spokes could be counted as pairs; (b) "In your class, Ana has 4 friends" reads oddly; (c) "No Fay" is highlighted before any press and looks like a preselected answer. | cm-math-discrete / demo-builder for a v2, if wanted | The readout "linked pairs n of m" fixes the count in every state, and the reveal defines the pairs. None of these breaks the lesson for a first-time learner. |
| The walkthrough's trust sheet shows "NOT YET CHECKED" because it was recorded before the fact-check. `evidence.simulatedLearner` in meta.json is empty although a v1 learner review exists. | code (walkthrough timing, record linking) | meta.json carries the verified status. Both are bookkeeping, not lesson defects. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of new-friend-loosens-the-circle goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @learner-evaluator: traced every solid and dashed line in each state against the readout. That is the check that shows the picture is not decorative.
