# Fact-check: praise-then-slump (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a16.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | X1 = S + L1, X2 = S + L2 with equal variances: cov = v, var = 2v, r = 0.5. E[X2 | X1] = mean + 0.5 (X1 - mean) for jointly normal (and, with equal means and spreads, for the linear predictor generally); any group selected on X1 therefore averages halfway back. Theory for the top 10%: test-1 mean 76.3, halfway to 63.2. |
| c2 | verified | students(1886): means 49.6 and 49.5, r = 0.479; top 10% 76.1 -> 62.4; top 1% 88.9 -> 71.9; bottom 10% 23.7 -> 37.6. Across seeds 1-500: top 10% test-1 mean 76.4 (95% 74.5-78.2), test-2 63.2 (60.4-65.8); the top group fell in 500 of 500 seeds. The stage's 62.4 is typical (slightly under the 63.2 expectation, within seed spread). |
| c3 | verified | Bottom 10% 23.7 -> 37.6, bottom 50% 37.4 -> 43.6; bottom 10% rose in 500 of 500 seeds. The reveal's live example (bottom 16%: 27 -> 39) reproduces (27.1 -> 39.1). |
| c4 | verified | Galton (1886), "Regression towards mediocrity in hereditary stature", J. Anthropological Institute 15: 246-263, uses parent and adult-child heights. Galton's own phrase was "regression towards mediocrity"; the reveal says he "named this regression toward the mean", which is a fair modern paraphrase but not his exact words (non-blocking). |

Model assumption: equal skill and luck spread, test 2 independent luck, scores clipped to 0-100; the lesson says "half skill, half luck" in the question. No unrecorded claims found.
