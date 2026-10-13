# Fact-check: which-coin-is-it (2026-10-13)

Checker: fact-checker (independent). No walkthrough transcript exists for this slug; learner text from Demo.tsx. Script: artifacts/scratch/fc-problife/a20.ts.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Bayes with prior 1/2: 2^k/(2^k+1) = 2/3, 4/5, 8/9 for k = 1, 2, 3 (67%, 80%, 89%). Reproduced by belief(). |
| c2 | verified | Posterior odds = prior odds (1:1) x 2^k; so 1, 2, 4, 8 to 1; 8 to 1 = 8/9. |
| c3 | verified | A two-headed coin cannot show tails, so one tails sends the posterior to 0. |
| c4 | verified (convention) | Stated in the predict question ("one fair coin and one two-headed coin. You pull one at random"). |
| c5 | verified | test(1000, 3, seed 2024): 578 showed three heads, 505 of those two-headed (87.4%). Expectation: P(three heads) = 0.5625 and P(two-headed | three heads) = 0.889. Across seeds 1-500 the share ranges 85.0%-92.6% (middle 95%: 86.3%-91.6%, median 88.9%), reproducing the source; the stage's 87.4% is typical. Note 578 is above the expected 562.5 pulls by chance. |
| c6 | verified | pulls(seed 9): coin 1 is two-headed (HHHHHHHH); coin 2 is fair with flips H, T, T, T, ... so tails on its second flip. The source states the seed is chosen, which is the right disclosure; the reveal does not generalise from that coin and the figures it quotes (50% -> 89%) are exact. |

No unrecorded claims found.
