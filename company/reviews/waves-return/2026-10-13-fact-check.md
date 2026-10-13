# Fact-check: waves-return (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | dI/dt=0 with I>0 requires beta*S=gamma, S*=1/R0=50% (standard SIRS). |
| c2 | verified | Re-ran the Demo.tsx simulate(100): peaks on days 34, 185, 329, 473, 617, 761 with S at peak 49.96-50.00%; day 900 S 50.00%, I 2.38%. |
| c3 | verified | dI/dt=(beta S - gamma) I changes sign at S=1/R0. |
| c4 | verified | node: L=50 gives I 4.55%, waves ~104 days apart; L=200 gives I 1.29%, S 49.77%. |
| c5 | verified | Stage muted line. |
