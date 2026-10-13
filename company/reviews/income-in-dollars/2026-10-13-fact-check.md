# Fact-check: income-in-dollars (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx data; distances re-computed in artifacts/scratch/fc-aiecongeo/iid.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Data matches Demo.tsx (12 people incl. A, B). In all three units the nearest person is A or B; the closest unlabelled person is never first. |
| c2 | verified | dollars: B 1000.45, A 8000.00 (shown 1000 and 8000); $100s: B 31.62, A 80.01. B nearest in both. |
| c3 | verified | $1,000s: A 8.06, B 30.02; next nearest after A is an unlabelled person at 10.30 (matches source). |
| c4 | verified | Standardising before nearest-neighbour methods is standard (Hastie, Tibshirani & Friedman s13.3; scikit-learn preprocessing guide). Two distinct sources. |

Stage check: 'B is 30 years older' (60 vs 30) true; 'A one-year gap counts the same as a one-dollar gap' true for unit = $1; the recall question's scale claim (unscaled distance dominated by the largest-spread feature) follows from the same arithmetic. Labelled as invented/toy. Unrecorded claims: none.
