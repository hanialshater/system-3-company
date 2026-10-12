```yaml
id: disclose-chosen-seeds
confidence: ""     # raised by the wave 1 probability builder (disclosed) and the ai/overfitting fact-check (seed 5 vs seeds 1–500)
context: A lesson shows one seeded random run as the stage's evidence.
problem: >
  Picking the seed that shows the expected result makes one run look like the rule. The overfitting
  fact-check found "6 bends is worse than a line" true for seed 5 but false in 38% of seeds.
therefore:
  - Say in the claim's source whether the seed was chosen or untuned.
  - If chosen, the reveal must not generalise from the run, or must show the spread ("in 500 runs…").
  - The fact-checker re-runs across many seeds for any claim that rests on a run.
would_be_wrong_if: Learners shown chosen-seed runs form no more over-general beliefs than those shown typical runs (EXP-002 extension).
documented_cases: [overfitting, one-in-a-million-match, twenty-harmless-tests]
known_failure: none recorded
```
