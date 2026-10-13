# Fact-check: insurance-fair-price (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; HISTORY rebuilt with the kit's mulberry32 in artifacts/scratch/fc-aiecongeo/ins.mjs, plus seed sweeps and a pooling simulation.

Seed disclosure (disclose-chosen-seeds): seed 1 is CHOSEN so that year one has exactly one loss (38% of seeds have that, so it is not rare). The reveal's long-run statements ($99 average, 36 no-loss years, 28 years with 2+) are the learner's own run; across 2,000 seeds the 101-year average is $100.0 (5th-95th percentile $83-$117), no-loss years average 37.0 and 2+ years 26.7. So seed 1 is typical for the claims the reveal makes; the first-year choice does not bias them.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 0.01 x 10,000 = 100. |
| c2 | verified | 120 - 100 = 20; 'covers costs' is explicitly the model's assumption. |
| c3 | verified | Binomial(100, 0.01): P(0) 0.366, P(1) 0.370, P(>=2) 0.264. |
| c4 | verified | Seed 1: first year 1 loss; 101-year average $99.01; 36 zero years; 28 years with 2+; every average from 50 to 1,001 years is between $87.7 and $107.1 (record says $88-$107, same). Seed sweep above. |
| c5 | verified | Pooling check by simulation: the per-customer payout in one year has mean $100 and sd $1,041 for 1 house, $305 for 10, $99 for 100, $10 for 10,000, so the average converges and the risk per customer falls with pooling. Mankiw ch. 27 (finance and insurance) is the named textbook; I rely on the simulation and law of large numbers, not on the textbook. The 'risk aversion' half (people pay above the average for certainty) is a standard model assumption, not tested here. |
| c6 | verified | Chip 'Model: independent 1-in-100 risks' and reveal 'A model: independent risks, no fraud, one seeded run. Not advice'. |

Unrecorded claims: none.
