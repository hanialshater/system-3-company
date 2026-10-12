```yaml
id: numbers-from-the-stage
confidence: ""     # new 2026-10-12. Five lessons support it, but they are the cases that produced it (one wave, simulated reviewers, fact-checker); no case yet that it did not produce.
context: Any lesson where the question, hook, reveal or recall quotes a number the stage also shows or computes.
problem: The learner checks the question against the picture. When the two disagree (15x in the question, 10.7x on the stage) the learner learns that the lesson is unreliable, or concludes their own eyes are wrong, and the reveal's number then matches neither.
therefore:
  - Compute every number in the question, hook, reveal and recall from the same function that draws the stage (a shared constant or derived value in Demo.tsx), not from a number typed into a string.
  - Where a worst case and a case on screen differ (at most 62, this case 62.5; 500 left vs 499 shown), say which one the sentence means.
  - A stage that cannot hit the question's setting exactly (a slider that has moved) must not keep text that says it did ("Draw some rooms of 23" at 29).
would_be_wrong_if: Lessons built with computed strings still show question/stage disagreements at the same rate in review, or learners never notice the disagreements (EXP-002 think-aloud finds none).
documented_cases:
  - "mercator-greenland: question ~15x, stage readout 10.7x (clipped map); fact-check disputed c3; fixed in v2 by computing from one projection."
  - "birthday-paradox: reveal says 253 pairs while the diagram shows 406; 23-person claim vs 29-room stage; 'Draw some rooms of 23' stale after the slider moved."
  - "binary-search: 'Lower than 500' leaves 499 numbers, reveal chain says 500; 62 vs 62.5."
  - "natural-selection: '10% more young' while the stage is always 100 beetles; population size never stated."
  - "half-life: 'Your run, step by step: 48% decayed' shown on a stage reset to 200 fresh atoms, describing a run the learner did not have."
excluded_cases: [projectile-angle recall ("25 degrees lands 30 m" implies a different speed from the lesson's 20 m/s, fact-check F4: not false, so a near-miss, not a case)]
known_failure: none recorded
part_of: demo-standard
may_call: earn-the-reveal
```
