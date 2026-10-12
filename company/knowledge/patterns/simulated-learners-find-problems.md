```yaml
id: simulated-learners-find-problems
confidence: ""     # open question: how well do borrowed-mind findings predict real confusion? Still open: EXP-002 has not run, so the hit rate is unknown.
context: Using an AI evaluator with a knowledge boundary to review a lesson.
problem: The confused student is not confused. Simulated evidence can quietly replace the expensive kind while everything inside the machine agrees.
therefore:
  - Treat borrowed-mind findings as hypotheses about where learners break.
  - Never count them as evidence that a lesson teaches; confidence "**" requires human learners.
  - Compare borrowed-mind predictions with real-learner sessions (EXP-002) and record the hit rate here.
  - Vary the boundary on purpose across a wave; a single boundary is a single witness.
would_be_wrong_if: (inverse) If borrowed-mind findings predict real-learner breakpoints with high accuracy across domains, raise their weight.
documented_cases: []
known_failure:
  - "Single boundary: 16 of 17 learner reviews on file use the same adult-beginner boundary (reviews/README rule 2 allows 'a second review with a different boundary'; none was run). The findings about jargon ('R0', 'bends', 'projection') depend on that boundary and will repeat across lessons."
  - "Hit rate recorded: none. 5 fatal and 12 revise verdicts (WBR 2026-10-12) are hypotheses until EXP-002 runs."
```
