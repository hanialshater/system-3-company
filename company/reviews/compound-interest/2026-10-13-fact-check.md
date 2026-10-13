# Fact-check: compound-interest, second check (2026-10-13)

Checker: fact-checker (different checker from the earlier record, which verified c1, c2, c4-c8). Scope: open claims c3, c9, c10. Method: transcript + Demo.tsx; numbers re-run in artifacts/scratch/fc-aiecongeo/ci.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Simple interest 7% of $1,000 for 40 years = $2,800 interest, balance $3,800. The reveal says 'a balance of $3,800', consistent. |
| c9 | verified | Decade gains 967.15, 1,902.53, 3,742.57, 7,362.20; each ratio 1.9672 = 1.07^10 ('about twice'). |
| c10 | verified | First-decade pace $96.72 a year; straight line reaches $4,868.61 at year 40 (reveal rounds to $4,900 via hundreds()). |

Cross-checks on the already-verified claims: balance(40) = 14,974.46; interest on interest = 11,174.46 (74.6% of the balance, 'three quarters'); doubling time 10.24 years ('roughly every ten'). All consistent with the reveal. Stage labels itself 'A model: a steady 7% ...'. Unrecorded claims: none.
