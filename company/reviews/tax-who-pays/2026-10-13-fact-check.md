# Fact-check: tax-who-pays (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: p=6, q=40. |
| c2 | verified | node: bakers-taxed market: buyers pay 7, bakers keep 5, q=30. |
| c3 | verified | node: buyers-taxed market: shelf price 5, buyers pay 7, bakers 5, q=30 (same as c2). |
| c4 | verified | node: buyers' share 1.333 at b=5 and 0.667 at b=20 (2*10/(10+b)). Note the stage's wording 'who backs away faster' is the elasticity result: here with a fixed supply slope. |
| c5 | verified | Standard incidence result (Mankiw ch. 6): burden falls on the less price-responsive side regardless of statutory side; edition numbering varies. |
| c6 | verified | Stage chip 'Toy market' and muted line. |
