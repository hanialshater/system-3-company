# Fact-check: same-average-different-ride (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Script: artifacts/scratch/fc-problife/a17.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | EV(X) = 0.5 x 10 - 0.5 x 8 = +1; EV(Y) = 0.1 x 55 - 0.9 x 5 = +1. |
| c2 | verified | X ends 18W - 800, behind iff W <= 44: exact P = 0.1356 (14%). Y ends 60W - 500, behind iff W <= 8: exact P = 0.3209 (32%). |
| c3 | verified | Linearity: 100 x $1 = $100. |
| c4 | verified | 8 wins: 480 - 500 = -$20; 9 wins: 540 - 500 = +$40. So fewer than 9 wins means behind. |
| c5 | verified | crowd(seed 77): X 154/1,000 behind (15%), mean +$94.2; Y 320/1,000 (32%), mean +$104.7. Over 300 other seeds: X behind 102-167 (median 137), Y 280-360 (median 320), Y exceeded X in 300 of 300 seeds; crowd means range roughly $85-$116 around $100 (SD of one player's ending is $90 for X and $180 for Y, so a crowd of 1,000 has SE $2.8 and $5.7). The stage's numbers are typical. |
| c6 | verified | players(seed 4242): first batch has 1 of 20 behind for X and 5 of 20 for Y, matching the claim text. The source note ("Batches 1-3 show 1, 2, 3 behind for X and 8, 6, 11 for Y") reproduces for batch indices 1, 2, 3, i.e. the second to fourth batches, so its labelling is off by one but the numbers are right (non-blocking, fix the source wording). |

Reveal: "Both crowds averaged about +$100" is the expectation (c3) with the run's +$94 and +$105 printed beside it, honest about sampling. No unrecorded claims found.
