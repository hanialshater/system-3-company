# Fact-check: better-in-every-group-worse-overall (2026-10-13)

Checker: fact-checker (independent). Script: artifacts/scratch/fc-problife/a5.ts. Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Counts 81/87, 192/263 (open surgery) and 234/270, 55/80 (percutaneous nephrolithotomy) are the figures cited from Charig et al. (BMJ 1986; 292: 879-882) via Julious & Mullee (BMJ 1994; 309: 1480), the standard textbook presentation of Simpson's paradox. I checked citation details and the numbers against the secondary literature from memory plus a search; the original table was not opened in full. |
| c2 | verified | 81/87 = 93.1%, 192/263 = 73.0%, 234/270 = 86.7%, 55/80 = 68.75% (shown as 69%), 273/350 = 78.0%, 289/350 = 82.6%. |
| c3 | verified | 263/350 and 80/350 follow from the counts in c1; both treatments' large-stone rate is below their small-stone rate. |
| c4 | verified | Algebraic identity: overall = weighted average of subgroup rates. |
| c5 | verified | Re-ran arms(k) for k = 0..343: A ahead for exactly k <= 220, B ahead for k >= 221 (k=220: 80.47% vs 80.37%; k=221: 80.41% vs 80.42%). Real split k=263 gives 78.0% / 82.6%. The reveal's "220 or fewer" is correct. |
| c6 | verified | A = open surgery, B = percutaneous nephrolithotomy (keyhole) in Charig/Julious & Mullee Table 1. |

Note (non-blocking): the slider's counterfactual moves patients with expected-value cures (stated in c5's source and the stage says "Real numbers" only for the real split). The lesson's text does not claim whole-person cures off the real split.
