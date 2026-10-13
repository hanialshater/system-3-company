# Fact-check: one-in-a-million-daily (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Script: artifacts/scratch/fc-problife/a13.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | 8,000,000 x 1e-6 = 8 per day. |
| c2 | verified | (1-1e-6)^8,000,000 = 0.00033546 (e^-8 = 0.00033546); shown on the stage as 0.03%. |
| c3 | verified | 10,000 x 1e-6 = 0.01 a day, 3.65 a year, one in about 100 days; chance of no event on a day 99.0%. |
| c4 | verified | year(8e6, 808): 2,946 events, mean 8.07 a day, 0 empty days; year(1e4, 808): 6 events on 6 days, 359 empty days. Across seeds 1-500: 8M yearly mean 7.55-8.44, at most 2 empty days; 10,000 people yearly total 0-11 (median 3). Matches the source; a year with 6 events is ordinary (expected 3.65, SD 1.9). |
| c5 | verified | The Knuth Poisson sampler reproduces the exact binomial pmf: 182,500 sampled days (500 seeds) have mean 8.005 and variance 7.985, and the frequency of 0, 2, 4, ..., 16 matches Bin(8e6, 1e-6) to the third decimal. Le Cam's bound N p^2 = 8e-6. |
| c6 | verified (convention) | Stated on the stage and in the reveal's last paragraph. |

Non-blocking: the reveal's closing line "Somewhere, a coincidence is always happening" is rhetorical and follows from c1-c2 under the stated assumption. No unrecorded claims found.
