# Fact-check: collect-all-six-faces (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text taken from Demo.tsx. Script: artifacts/scratch/fc-problife/a7.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Sum of geometric waits 6/6+6/5+...+6/1 = 6 x H_6 = 14.7 exactly (14.700). Coupon-collector result re-derived, not taken on trust from the unread Feller chapter. |
| c2 | verified | With k faces missing, success chance k/6, mean wait 6/k: 1, 1.2, 1.5, 2, 3, 6. |
| c3 | verified | many(1000, 6000) re-run: mean 14.873 (14.9), waits 1, 1.226, 1.504, 2.039, 2.854, 6.25; first stage collection takes 12 rolls. Over 300 other seeds the 1,000-collection mean has a 95% range of 14.32-15.14 (median 14.75), so 14.9 is typical, not tuned. |
| c4 | verified | 6!/6^6 = 720/46,656 = 1.54%. within6 = 13 for the stage seed; across 300 seeds the count of 1,000 ranges 7-23 (median 15). |

Reveal sentence "Only 13 of the 1,000 collections finished in six rolls" is the live value of that run (c4). No unrecorded claims found.
