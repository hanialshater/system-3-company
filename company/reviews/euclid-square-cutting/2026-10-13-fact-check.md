# Fact-check: euclid-square-cutting (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: cuts 18, 18, 12, 6; leaves 6 by 6. |
| c2 | verified | node: gcd(48,18)=6, 8*3=24 tiles; 48/9 and 18/12 not whole. |
| c3 | verified | Standard gcd(a,b)=gcd(b,a-b) argument, consistent with the reveal. |
| c4 | verified | Euclid Elements VII.2 finds the greatest common measure by repeated subtraction (antenaresis). |
