# Fact-check: longer-loan-cost (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; payments and interest re-computed both by the closed form and by month-by-month stepping in artifacts/scratch/fc-aiecongeo/loan.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Annuity payment P r / (1 - (1+r)^-n); month-by-month stepping ends at balance ~0 (-5e-10) for both terms. |
| c2 | verified | 5 years: $386.66 a month, interest $3,199.36. |
| c3 | verified | 7 years: $292.17 a month, interest $4,542.37. |
| c4 | verified | Payment falls $94.48 (the question says 'about $95': fine as a rounding to the nearest five dollars, but the exact figure rounds to $94); extra interest $1,343.01. |
| c5 | verified | 2 years: $886.41, $1,273.89; 8 years: $262.83, $5,231.55; interest increases at every step from 2 to 8 years. The slider runs 2-8 years. |
| c6 | verified | Mechanism confirmed by the stepping simulation: interest each month is 0.5% of the balance, and a smaller payment leaves a larger balance. |
| c7 | verified | Reveal and claim label the rate as fixed, illustrative; not a market rate. |

Minor wording: the predict text says 'cuts the payment by about $95 a month' while the reveal says the payment drops from $386.66 to $292.17 (a $94.49 cut). Nothing contradicts; demo-builder may prefer 'about $94'. Unrecorded claims: none.
