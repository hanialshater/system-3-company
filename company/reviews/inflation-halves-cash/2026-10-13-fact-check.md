# Fact-check: inflation-halves-cash (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; formulas re-run in artifacts/scratch/fc-aiecongeo/infl.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Real value = cash / (1+i)^t; derivation is exact. |
| c2 | verified | 100 / 1.03^24 = 49.19. |
| c3 | verified | 100 - 24 x 3 = 28 vs 49.19; the straight-line error is explained correctly. |
| c4 | verified | Year 1 loss 2.913; year 24 loss 1.476; the yearly loss shrinks in every year from 2 to 40 (checked). |
| c5 | verified | Exact halving time 23.45 years vs 72/3 = 24: an approximation, labelled 'rough'. |
| c6 | verified | 2%: 62.17; 5%: 31.01 after 24 years. |
| c7 | verified | Stage and reveal: 'A model: a constant rate, which real inflation is not. Illustrative, not a forecast.' |

Stage check: $49 'about half' (49.19), and the recall card's 4% case (17.67 years exact, 18 by rule of 72) is correct. 'Halves what cash buys in a generation' is about 24 years, a loose use of 'generation'; not a factual error. Unrecorded claims: none.
