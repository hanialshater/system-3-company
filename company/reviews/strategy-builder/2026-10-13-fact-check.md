# Fact-check: strategy-builder (independent) (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/l13.mjs (explicit 10-round game engine, threshold bisection, trajectories, an agent-based check). Stage text from the walkthrough transcript; dynamics read from Demo.tsx.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Playing the rounds explicitly: TFT vs TFT 30 each; TFT vs always-cheat 9 vs 14 (0 vs 5 in round 1, then 1 each for nine rounds); cheat vs cheat 10 each. |
| c2 | verified | W_TFT(f) = 30f + 9(1-f), W_cheat(f) = 14f + 10(1-f); equal at 17f = 1, f = 1/17 = 5.88% (bisection gives 0.058824). Above f = 1/17 TFT scores more, below it less. |
| c3 | verified | Stage dynamics f' = f + f(1-f)(W_TFT - W_cheat)/15: from 5%, 1 of 100 from generation 44 on (so 1 of 100 at generation 60); from 7%, 100 of 100 from generation 37 (so at generation 40). An agent-based version (20,000 players, imitation probability = gap/15) ends at 0.7% from 5% and 100% from 7%. The speed constant is a choice; the threshold is not affected. |
| c4 | verified | Axelrod & Hamilton (1981), Science 211: 1390-1396, show that TFT can invade and resist always-defect when interactions are repeated and the invaders meet each other often enough; the lesson's tipping point is that condition for these payoffs. |
| c5 | verified (convention) | Stated on the stage and in the reveal ("two fixed strategies, chosen payoffs, 10 rounds, random pairing in a huge population ... not a claim about people"). |

Sensitivity worth knowing (not a defect): the 5% / 7% starts sit very close to the 5.88% threshold, so the stage outcome relies on the learner's reading of "about 6%" as the threshold; starts 5.8% and 5.9% give opposite outcomes in 60 generations. The lesson states the exact threshold, 1 in 17. No unrecorded claims found.
