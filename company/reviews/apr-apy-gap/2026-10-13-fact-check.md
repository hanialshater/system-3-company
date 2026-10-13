# Fact-check: apr-apy-gap (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; formulas re-run in artifacts/scratch/fc-aiecongeo/apr.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 x 1.01^12 = 112.6825. |
| c2 | verified | Effective rates 12.0000, 12.5509, 12.6825, 12.7475 % for n = 1, 4, 12, 365. |
| c3 | verified | Month k interest = 1% of 100 x 1.01^(k-1) > $1 for k >= 2; excess over simple $12 = $0.6825 (the reveal's 68 cents). |
| c4 | verified | Successive gains from more frequent compounding shrink (e.g. daily to hourly adds 0.002 points); the continuous limit is e^0.12 - 1 = 12.7497%, daily (12.7475) is within 0.0022 points. |
| c5 | verified | US Regulation DD (12 CFR 1030) defines APY as the effective annual yield on deposits; UK AER is the same idea. The sentence says 'names vary' and 'often', so it is not asserting a universal definition (APR on loans can include fees, as the record notes). |
| c6 | verified | Chip 'Quoted 12% a year, one deposit, no fees' and reveal 'One deposit, no fees, 365-day year' on stage: the model is labelled. |

Stage check: 'extra 68c over the plain 12% line' = Math.round(68.25) = 68. Recall card: 6% monthly = 6.168% ('about 6.17%'). The recall's 'not a doubling' is fine. Unrecorded claims: none.
