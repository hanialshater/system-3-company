# Fact-check: rule-of-72-shortcut (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; formulas in artifacts/scratch/fc-aiecongeo/r72.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | (1+r)^t = 2 -> t = ln 2 / ln(1+r). |
| c2 | verified | 9%: exact 8.04, 72/9 = 8; 1.09^8 = 1.9926. |
| c3 | verified | Simple interest at 9%: 100/9 = 11.1 years. |
| c4 | verified | Exact vs 72/r: 3% 23.45 vs 24; 6% 11.90 vs 12; 8% 9.01 vs 9; 10% 7.27 vs 7.2; 12% 6.12 vs 6; 20% 3.80 vs 3.6. Relative error is +0.9% at 6% and -1.0% at 10%, but +2.3% at 3% and -5.3% at 20%, so 'closest around 6% to 10%' holds (the smallest absolute error is near 7.85%). The slider runs 3% to 20%. |
| c5 | verified | Rule of 72 approximates ln 2 / ln(1+r) for steady yearly compounding; it forecasts nothing. Verified by derivation, not by the textbook cite. |

Stage check: the reveal's 'You saw it is closest around 6% to 10%' depends on learner interaction; the figures given (3%: 24 vs 23.4, 20%: 3.6 vs 3.8) are exact. Unrecorded claims: none.
