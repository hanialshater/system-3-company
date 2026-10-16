*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bk-checklist-series-reliability
lesson version: v4
boundary: Adult beginner; can compare percentages and do basic arithmetic, but is new to successive retention.
Screenshots seen: yes (artifacts/books100-final-ac88855f-v2/walkthroughs/bk-checklist-series-reliability/sheet.png, plus original-detail 01-predict.png, 03-step-2.png and 05-reveal.png, recorded 2026-10-16T16:28:23.974Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

These findings were first written in `company/reviews/books-100/2026-10-16-learner-checklist-v4.md` before current metadata, idea/source files, or accounts were read. They are copied here without changing that first-look judgment. Only the private artifact-only transcript and images named above were inspected; no live lesson, alternate path, implementation, book, or source identity was verified.

1. **Question and prediction:** The prompt specifies three checkpoints, 95% retention at each, and survival through all three. I can understand what is being asked before knowing the successive-retention mechanism. Choosing 95.00 is a plausible first guess if I apply the percentage only once. The locked stage contains unknown formula, rounds, and results, with disabled case controls; it does not display the computed answer before prediction.
2. **Inspectable cause:** A shows `× (1 − 10/100) + 0`, three rounds, and a decline from 100 to 72.9. B shows `× (1 − 5/100) + 0`, the same three rounds, and a decline from 100 to 85.74. The displayed percentage complement makes the relation between “Miss 5%” and the retained fraction inspectable. The steps show repeated decreases, while the retained A/B strip makes the changed miss rate and different final results available for comparison.
3. **Reveal:** “Each checkpoint multiplies what remains” answers why applying 95% once is insufficient. The two case totals and the explicit stipulation of independent misses keep the toy arithmetic separate from measured checklist effects. The explanation and its boundary text are readable in the fullsize reveal.
4. **Transferable idea and limit:** Successive retention acts on what remains rather than repeatedly on the starting amount. This is available as a portable arithmetic idea. The artifact names independence as an assumption but does not explain how to diagnose dependence in a new situation; it gives no human transfer evidence or real checklist-effect estimate.
5. **Exact residual issues:** The `+ 0` remains unexplained and adds notation without contributing to this task. Intermediate checkpoint values are not labelled, so the picture supports the pattern more readily than a step-by-step audit. Reset leaves A's large 72.9% picture above feedback answering B's 85.74%; the labelled A/B strip and prose allow reconciliation. These are minor clarity burdens rather than a specific blocker on the observed path.
6. **Earned reveal:** On the supplied sheet, “Try it first” remains disabled after A alone, and “Show me why” becomes available after B. Both results survive Reset. This earns a two-case comparison but does not establish that the learner understood it.

Verdict reason: No specific finding in the observed current path blocks this first-time learner from inspecting the stipulated successive-retention mechanism; the recorded notation and A/B comparison burdens are minor clarity notes.

## After reading meta.json

- Current metadata reports version 4; objective: Compute serial completion from independently stipulated checkpoint reliability, and identify independence as the boundary.
- The observed complement expression and three-round retained-share comparison address serial completion. The reveal names independent misses as a stipulation; the artifact does not test whether a learner can identify dependence in a new setting. This limitation does not change the first-look learner-gate judgment.
- `Verdict: launch` is the required vocabulary for this learner gate only. It is not overall launch/deployment permission, book/fact verification, source/build verification, or human-learning evidence.
- This run re-inspected checklist only. The seven distinct pilot families now have checklist v4, prior E-Myth v4 and Influence v4, and prior choosing/habit/irrational/nudge v3 learner records. This run does not independently establish unchanged content for the others. The remaining 93 lessons remain unreviewed by this learner-evaluator.
- Supplied artifact identity: `ac88855f3c7e7f363956aad1a3d1c884ca09fe87`, `.next-books100-final-v2`, BUILD_ID `7OjCcsqQ4oBdQ71MeRFHT`; not independently verified by this reviewer.
