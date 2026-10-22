# Launch Review: 2026-10-22: push-the-frame-over

lesson: `push-the-frame-over` · version: v3 · domain: math (strand geometry) · format: single card
chair: head-of-product · executes: release-manager (ship stage, code) · attests: qa-tester (code), fact-checker, learner-evaluator

Read order: walkthrough first (artifacts/walkthroughs/push-the-frame-over/transcript.md, sheet.png), then meta.json, then the fact-check (v3), learner and QA records.

## What the walkthrough shows (chair's own reading, before the records)

- Predict: the upright 4 by 3 frame, "area 12.0", with "It stays the same / It shrinks / It grows". The locked stage shows only the upright state, so nothing leaks; "stays the same" is the misconception's honest answer.
- Explore, in the brief's DOM order: "Lean to 60°" gives height 2.60, area 10.4; "Lean to 30°" gives 1.50, 6.0; the top readout line "sides 4 and 3 · perimeter 14" never changes. That fixed line against the falling area is the contrast the misconception needs.
- "Cut and slide" (04-step-3) leaves the left triangle as an empty outline and draws it filled at the right end, so the filled shape is a 4 × 1.50 rectangle; the chip records "✓ 4 × 1.50 = 6.0". The cause is shown, not told.
- Reveal fits on the phone frame and names the rule (base × height, not base × slanted side) plus the limiting case (pushed flat, area to nothing).
- I recomputed: 3 sin 60° = 2.598 → 2.60, 12 sin 60° = 10.39 → 10.4; 3 sin 30° = 1.50, area 6.0; perimeter 2(4 + 3) = 14. Overhang 3 cos θ ≤ 3 < 4, so the cut-and-slide works for this frame at every angle. All agree with the screen.

## Gates
- [x] All claims verified by someone other than the builder: c1–c4 verified by fact-checker on 2026-10-22 (2026-10-22-fact-check-v3.md). The v1 stage/claim mismatch (cut fill only 4 − c wide) and the v2 over-general c3 are both fixed: c3 is now scoped to this frame.
- [x] Computer-use QA record (phone + desktop): 2026-10-22-qa.md, v3, passed on both, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-knows-rectangle-area.md, `lesson version: v3`, `Verdict: launch`.
- [ ] Accessibility review: none on file. Advisory in this flow, not a gate (see objections).
- [x] Confidence mark matches evidence: `confidence` is empty; no human learners, no `**` claimed.

## Committed predictions (analytics steward, before launch)
None in this record. The analytics-steward role joins the flow in M7 (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward committed predictions in this launch record; the role joins the flow in M7, so nothing here can later be checked against a prior prediction. | head-of-product (until M7 adds analytics-steward) | The enforced gates (claims, QA, learner review) pass. This launch claims nothing about outcomes. |
| Accessibility review is advisory, not a gate, and none was run. The moved triangle is told apart from the ghost only by fill shade; the dashed "h" label is small and italic. | head-of-product; accessibility-reviewer when it runs | Every number is in the text readout and the chip trace, so the picture is not the only carrier. A pass is still owed. |
| The learning-designer is merged into the builder (F-f): design.md was written by the role that built the lesson, with no independent pedagogy review before build. | head-of-product | The artifact-only learner review found the misconception refuted by the fixed-sides readout and the cut-and-slide picture, and the fact-checker found no unrecorded claims. A structural cost, not a defect here. |
| Reveal-stage picture: after the DOM-order path ends on "Upright", the reveal opens over the upright 12.0 frame while it describes height 1.50, area 6.0 and "a rectangle 4 wide and only 1.50 tall". The numbers survive on the chip trace "✓ 4 × 1.50 = 6.0", but the rectangle the reveal names is not on screen. | demo-builder / cm-math-geometry for a v4 (pin the cut-and-slid picture at reveal, or end the QA path on the cut state) | Every quoted number is still on screen, and the learner saw the rectangle one tap earlier (learner review note 4a). |
| "Parallelogram" first appears in the reveal's rule sentence; the stage never names the leaning frame as one. | demo-builder for a v4 ("a leaning frame's (a parallelogram's) area…") | Most learners at this boundary know the word; the rule is still tied to the frame they pushed. |
| Trust-sheet claim c4 begins with the context-free word "Recall:", which reads oddly to a learner who opens "Why trust this?". | demo-builder for a v4 | Wording only; the claim is verified and true. |
| `evidence.simulatedLearner` in meta.json is empty although a v3 learner review exists. | demo-builder / code (record linking) | Bookkeeping, not learner-facing; the trust sheet under-counts reviews until linked. |

## Decision
go

Signed: head-of-product, 2026-10-22. v3 of push-the-frame-over goes to the ship gates as it is. The objections above travel with it.

## Kudos (optional)
- @fact-checker: caught in v1 that the cut-state fill was only 4 − c wide, so the stage contradicted its own reveal; without that the lesson's central picture would have shown the wrong area.
