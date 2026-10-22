# Launch Review: 2026-10-22: one-metre-more-rope

chair: head-of-product · executes: release-manager · attests: qa-tester, fact-checker, learner-evaluator

lesson: `one-metre-more-rope` (math, geometry) · version: v2 · order O-1 (Meta run M-33)

Read first: artifacts/walkthroughs/one-metre-more-rope/transcript.md and sheet.png (recorded 2026-10-22T07:07:18Z, v2). Records read after: meta.json, 2026-10-22-fact-check.md, 2026-10-22-fact-check-v2.md, 2026-10-22-learner-knows-pi-times-diameter.md, 2026-10-22-qa.md. build.md and design.md not needed for the decision.

## What the walkthrough shows

- Predict: the kit text asks ball vs Earth with options Far smaller / The same / Far bigger; the stage is locked at the tight ball (gap 0.0 cm).
- Explore: Ball, Wheel and Earth each read "gap 15.9 cm" against the same 20 cm ruler in the "zoomed in" window; each chip records "✓ 15.9 cm" and keeps it after Reset. The Earth frame draws the ground flat, which the fact-checker confirms is honest at this scale (sag ≈ 9e-9 m across the window).
- Reveal: about 60 words, names the wrong pick, explains 1 ÷ 2π ≈ 0.159 m per metre "whatever the size", and fits on the phone frame with its picture.
- The v1 findings are fixed in v2: the cat clause is cut (brief claim 4 dropped, so no unsupported claim) and the recall is now a round water tank, which c2 covers (2 m → about 32 cm).

## Gates (from the records; code runs the ship gates)
- [x] All claims verified by someone other than the builder: c1, c2, c3 verified by fact-checker (2026-10-22-fact-check-v2.md). The trust sheet in the walkthrough still says "NOT YET CHECKED" because it was recorded before the check; meta.json now carries the verified statuses.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v2, both passed, 0 retries.
- [x] Borrowed-mind learner review: v2, Verdict: launch (simulated learner; not evidence anyone learned).
- [ ] Accessibility review: not run. Advisory, not a gate (objection below).
- [x] Confidence mark matches evidence: confidence is empty; there are no human-learner studies, so no `**` is claimed.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role is not part of this flow until M7 (objection below).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward predictions are committed in this launch record; the template's prediction table is empty. | analytics-steward (added in M7) | The role is not in this flow until M7; no experiment is attached to this launch, and any later readout must not fit a prediction after the fact. |
| Accessibility review was not run; it is advisory here, not a gate. | accessibility-reviewer | Controls are 4 labelled buttons with readouts in text; the risk is contrast/label issues, which an advisory pass can fix in a later version without changing claims. |
| The learning-designer is merged into the builder (F-f): design.md was written by the same role that built the lesson, so no independent pedagogy review happened before build. | head-of-product | The learner-evaluator's independent review (Verdict: launch) and the fact-check cover the main risks this merge creates; the merge is a standing flow decision, carried here rather than dropped. |
| The reveal frame can show the reset picture ("gap 0.0 cm" on the tight ball) beside text that says the rope was lifted 15.9 cm (learner note 5). | demo-builder | Non-blocking: the chips keep "✓ 15.9 cm" visible in the same frame, so the evidence survives; fix in a later version by showing the last lifted state on reveal. |
| The reveal says "the rope's length is 2π times the radius" while the learner's boundary is π × diameter; the step d = 2r is left implicit (learner note 1). | demo-builder | One short step most learners at this level have; optional wording fix ("π × diameter, which is 2π times the radius") for a later version. |
| The corner icon looks identical for ball, wheel and Earth and draws the rope ring at a fixed offset, so it is not to scale (fact-checker advisory, learner note 6). | demo-builder | It is labelled by radius and states nothing about proportion; the zoom window carries the comparison. A later version must not add a label implying proportion. |
| evidence.simulatedLearner in meta.json is empty although a learner review exists (company/reviews/one-metre-more-rope/2026-10-22-learner-knows-pi-times-diameter.md). | demo-builder | Record-keeping only; the review exists and was read here. Link it in the next version. |

## Decision
go

Signed: head-of-product, v2. The walkthrough refutes the misconception on screen (Earth frame, same ruler, same 15.9 cm), every learner-visible claim is verified by the fact-checker, QA passed on phone and desktop, and the learner review says launch. No conditions are attached; the items above travel as objections with owners.

## Kudos (optional)
- @fact-checker: found that "enough for a cat to crawl under" was false against a cited cat-height measurement and that the track recall fell outside c2, which made v2 honest.
