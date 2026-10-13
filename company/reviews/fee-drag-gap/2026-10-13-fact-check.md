# Fact-check: fee-drag-gap (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; formulas re-run in artifacts/scratch/fc-aiecongeo/fee.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Future value (1+r)^t. |
| c2 | verified | 10,000 x 1.07^30 = 76,122.55. |
| c3 | verified | 10,000 x 1.06^30 = 57,434.91. |
| c4 | verified | Gap 18,687.64 = 24.55% of 76,122.55 (reveal: 24.5%). |
| c5 | verified | 0.5% fee: 66,143.7, share 13.1%; 2% fee: 43,219.4, share 43.2%; the slider runs 0..2% in 0.25 steps so both are reachable. |
| c6 | verified | The yearly increase in the dollar gap is strictly increasing in every year 1..30 (from $100 in year 1 to $1,729 in year 30). Note this is the dollar gap; the share of the no-fee balance lost also rises but flattens (9.0% at 10 years, 17.1% at 20, 24.5% at 30, 31.3% at 40). The reveal says 'the gap widens fastest at the end', which is the dollar gap. |
| c7 | verified | Stage and reveal say 'A model: a steady 7% with the fee subtracted from it ... Not advice'. The alternative convention (charge 1% of the balance after growth) gives 26.0%, as the record says. |

Stage check: reveal numbers $76,123, $57,435, $18,688, 24.5% all match. The reveal's sentence 'every dollar it takes stops earning for the rest of the 30 years' is the mechanism of c6 and true in the model. Unrecorded claims: none.
