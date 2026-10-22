# Launch Review: 2026-10-22: not-every-circle-is-red

lesson: not-every-circle-is-red · version: v1 · domain: math (strand discrete) · brief: company/domains/briefs/math.discrete.md:482-499 (#2)

chair: head-of-product · executes: release-manager (code, ship stage) · attests: qa-tester, fact-checker, learner-evaluator

Read order: walkthrough (transcript.md, sheet.png) first, then meta.json, then the fact-check, learner and QA records.

## What the walkthrough shows (chair's own reading)
- Predict: three plain sentences; the misconception (A, "No circle is red") is the natural pick. Locked stage is all red, where A also matches the top row (both ✗): it does not leak the answer.
- First tap (one blue): "Not every circle is red" ✓, "No circle is red" ✗. The misconception fails in one frame. "Some circle is red" also shows "=" in this frame; the forced path to all blue separates it (✗ vs top row ✓). Milestones as briefed: four taps reach both.
- Kept columns ("1 blue, 3 red", "all blue") survive Reset, so "in every state you made" in the reveal is checkable on screen.
- Reveal (66 words) fits under the stage at phone size, names the answer, points to the frame that disproved the pick, and states both negations. Matches the brief's draft verbatim.
- Shape, not colour: R/B labels, hatched blue, ✓/✗/= all differ in shape.

## Gates (from the order's stage history and meta.json)
- [x] All claims verified by someone other than the builder: c1, c2, c3 `verified` by fact-checker 2026-10-22 (meta.json).
- [x] Computer-use QA record (phone + desktop): company/reviews/not-every-circle-is-red/2026-10-22-qa.md, pass, 0 retries.
- [x] Borrowed-mind learner review: 2026-10-22-learner-everyday-quantifiers.md, v1, Verdict: launch.
- [ ] Accessibility review: not run. Advisory in this run, not a gate (see objections).
- [x] Confidence mark matches evidence: confidence is empty; no `**` claimed, no human-learner evidence.

## Committed predictions
Not recorded here: no analytics-steward in this run (see objections).

## Open objections travelling with this launch
| Objection | Owner | Why we proceed anyway |
|---|---|---|
| No analytics-steward predictions are committed in this launch record; the role arrives with M7. | head-of-product (M7: analytics-steward) | The run has no steward to commit them; inventing predictions here would be the chair grading its own launch. Predictions are committed when M7 adds the role. |
| Accessibility review was not run; it is advisory in this run, not a gate. | accessibility-reviewer | The walkthrough shows shape-coded state (R/B, hatching, ✓/✗/=), and QA passed the 44 px target contract; a full review (screen-reader labels on the "=" column and kept-column headers) is owed before v2. |
| The learning-designer is merged into the builder (F-f): design and build were written by one role, so no independent design review happened. | head-of-product | Independent fact-check and learner review both ran on the artifact before the account; the learner review found no block. Revisit if launches show design-level misses. |
| The "=" glyph has no key and already appears on the locked predict stage (next to the learner's own pick, all red). Learner review note 1. | demo-builder (v2) | Not blocking: the bold top row and the reveal let a learner infer "same as top row". v2: a small header or visible "same as top row" label on the column. |
| Kept-column headers are icon-only (mini circles, no words). Learner review note 4. | demo-builder (v2) | Readable from the pictograms; v2 may add a short label within the word budget. |
| The walkthrough trust sheet predates the fact-check and shows all three claims "NOT YET CHECKED". | code (walk stage ordering) | meta.json is the truth (all verified); the live trust sheet reads meta.json. The recorded artifact is stale, not the lesson. |
| c1 and c3 carry support "convention" where the brief says "definition" (fact-checker minor). | demo-builder (v2) | Both are definitions of quantifier negation; the trust sheet wording ("rests on a definition or convention") is correct either way. |

## Decision
go

Signed: head-of-product, 2026-10-22. v1 of not-every-circle-is-red meets its brief and the accept criteria; every claim is verified independently, QA passed on phone and desktop, and the learner review says launch. The objections above travel with it to v2.

## Kudos (optional)
- @learner-evaluator: caught that "=" appears unexplained on the locked stage, next to the learner's own wrong pick: the most useful v2 note.
