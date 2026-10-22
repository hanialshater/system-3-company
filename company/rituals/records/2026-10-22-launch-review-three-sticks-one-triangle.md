# Launch Review: 2026-10-22: three-sticks-one-triangle

lesson: `three-sticks-one-triangle` · version: v1 · domain: math (strand geometry) · format: single card
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/three-sticks-one-triangle/transcript.md, sheet.png), then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: 2, 3, 6 cm with three distinct options; the locked stage already shows the sticks at 45° with "gap 2.6 cm", so the bet is concrete.
- Explore: "Lay them flat" gives the best case, gap 1.0 cm, and it still fails. "Raise them" makes it worse (3.6 cm), which goes straight at the misconception. "Sticks 3, 4, 6" closes and fills. "Sticks 2, 4, 6" meets only flat ("height 0"). Each chip keeps its value (✓ 1.0 cm, ✓ 3.6 cm, ✓ △, ✓ height 0), so Reset loses no evidence. This matches the brief's control order and milestones.
- Reveal: it fits at phone size with the picture above it, uses the learner's own numbers (5 cm reach, 1.0 cm gap, 3.6 cm) and states the rule. It agrees with the brief's draft and adds the 60° number.
- I recomputed the readouts: 45° gives √(2.464² + 0.707²) = 2.56 cm, 60° gives √(3.5² + 0.866²) = 3.61 cm, and flat gives 6 − 5 = 1 cm. All agree with the screen.

## Gates
- [x] All claims verified by someone other than the builder: c1, c2 and c3 are verified by fact-checker on 2026-10-22, with no findings. The any-angle bound (circles of radius 2 and 3 with centres 6 apart) covers the hook's claim about "however you like".
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-triangle-has-three-sides.md, `Verdict: launch`, v1.
- [ ] Accessibility review: none on file. It is advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty and there are no human learners, so the lesson claims no `**`.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record. The role joins the flow in M7, so nothing here can later be checked against a prior prediction. | head-of-product (until M7 adds analytics-steward) | The gates the flow enforces (claims, QA, learner review) all pass. Without predictions this launch says nothing about outcomes, and it claims nothing about them. |
| Accessibility review is advisory, not a gate. None was run for this lesson (red dashed gap vs blue/white sticks; colour carries the "gap" meaning alongside the text readout). | head-of-product; accessibility-reviewer when it runs | The gap is also given as text ("gap 1.0 cm", "height 0") and the chips record values in words, so colour is not the only carrier. An accessibility pass is still owed. |
| The learning-designer is merged into the builder (F-f), so design.md was written by the role that built the lesson and nobody reviewed the pedagogy independently before build. | head-of-product | The independent learner review (artifact-only) found the misconception refuted on screen, and the fact-checker found no unrecorded claims. The merge is a known structural cost, not a defect in this lesson. |
| The learner review's non-blocking notes: (a) the stage only shows equal angles, so mixed tilts are covered only by the reveal's straight-line sentence; (b) "the detour" is not named before the reveal's last sentence; (c) "gap 0.0 cm" next to a filled triangle reads oddly. | cm-math-geometry / demo-builder for a v2, if wanted | None blocks a first-time learner. Claim c2's any-angle bound makes the lesson true for mixed tilts, so (a) is about what the stage shows, not about whether the lesson is correct. |
| `evidence.simulatedLearner` in meta.json is empty, although a learner review exists for v1. | demo-builder / code (record linking) | This is bookkeeping, not learner-facing. The trust sheet will under-count reviews until it is linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of three-sticks-one-triangle goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: proved the 1 cm bound holds at any pair of angles, not only the equal angles the stage shows. That is what makes the hook's "however you like" true.
