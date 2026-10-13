# Fact-check: immunity-eats-r (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | R = R0 x susceptible share for random mixing and perfect immunity (Anderson & May); node: 4*0.4=1.6. |
| c2 | verified | 1-1/4=75%. |
| c3 | verified | node: contact ranks floor((j+0.5)*390/40) against cut 390*share: for every 5% step exactly 40*share contacts are immune (24 at 60%, 30 at 75%). |
| c4 | verified | Stage muted line: random mixing, perfect immunity, made-up disease. |
