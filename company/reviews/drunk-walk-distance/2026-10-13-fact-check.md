# Fact-check: drunk-walk-distance (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Script: artifacts/scratch/fc-problife/a8.ts. Model: one-dimensional walk, 1 m left or right per step, so "distance" is abs(position); the predict question and reveal say left or right.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Exact E abs(S_100) from the binomial = 7.959 (about 8 m). |
| c2 | verified | Exact E abs(S_1000) = 25.225; ratio to n=100 is 3.169, about sqrt(10). |
| c3 | verified | SD of the position is sqrt(n); exact ratio E abs(S_10000)/E abs(S_100) = 10.02, so "100 times the steps gives 10 times the distance" holds. |
| c4 | verified | walkers(0, 1921) re-run: mean distance 2.80 / 7.33 / 24.93 m at 10 / 100 / 1,000 steps (claim: 2.8, 7.3, 24.9). Across 500 other seeds of 30 walkers the middle 95% is 1.8-3.2 / 5.9-10.2 / 18.5-32.8 (medians 2.5, 7.8, 25.2); the stage's values sit well inside it, so the seed is typical. The reveal prints the exact figures beside the seeded ones. |

No unrecorded claims found.
