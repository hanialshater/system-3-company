# Fact-check: minimum-payment-trap (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; schedule() re-implemented and cross-checked with the closed-form n in artifacts/scratch/fc-aiecongeo/mpt.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 0.20 / 12 = 1.6667% a month; labelled a simplification. |
| c2 | verified | Month 1 interest 3,000 x 0.016667 = $50.00; $90 - $50 = $40. |
| c3 | verified | $90: 49.06 months by the closed form, so the 50th payment clears it; stepping gives 50 months. 3000/90 = 33.3. |
| c4 | verified | Total interest $1,415.46. |
| c5 | verified | $50 a month: balance stays at $3,000.00 after 60 months. (At $51 it falls only slowly: $2,898 after 60 months, so the 'never' is exact only at $50, which is what the claim says.) |
| c6 | verified | $150: 25 payments, interest $679.82. Slider runs $50 to $300 in $10 steps; $100 takes 42 months, $1,193 interest. |
| c7 | verified | Reveal: 'A model: a fixed 20% rate, no fees, nothing new bought. Real cards calculate interest in different ways.' |

Unrecorded claims: none. The predict option 'Never' (wrong answer) is true only at a $50 payment, which the question does not state; that is a distractor, not a lesson claim.
