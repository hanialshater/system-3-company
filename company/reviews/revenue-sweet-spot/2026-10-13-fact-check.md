# Fact-check: revenue-sweet-spot (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; revenue table in artifacts/scratch/fc-aiecongeo/rr.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | $3: 70 loaves, $210; $5: 50, $250; $8: 20, $160. |
| c2 | verified | Integer prices 0..10 give 0, 90, 160, 210, 240, 250, 240, 210, 160, 90, 0; max over a 0.01 grid is $250 at $5. |
| c3 | verified | R(p+1) - R(p) = 90 - 20p for p = 0..9 (checked), positive up to p = 4, negative from p = 5. |
| c4 | verified | Chip 'Model: straight-line demand, revenue only' and the reveal. Unit elasticity at the midpoint: elasticity at $5 = (10 x 5)/50 = 1, the standard result for a straight demand line (Mankiw ch. 5); checked arithmetically. |

Unrecorded claims: none. The reveal's 'a higher price is not always more money' is true of the model (and of revenue generally with elastic demand).
