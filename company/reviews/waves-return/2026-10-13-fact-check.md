# Fact-check: waves-return (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | dI/dt=0 with I>0 requires beta*S=gamma, S*=1/R0=50% (standard SIRS). |
| c2 | verified | Re-ran the Demo.tsx simulate(100): peaks on days 34, 185, 329, 473, 617, 761 with S at peak 49.96-50.00%; day 900 S 50.00%, I 2.38%. |
| c3 | verified | dI/dt=(beta S - gamma) I changes sign at S=1/R0. |
| c4 | verified | node: L=50 gives I 4.55%, waves ~104 days apart; L=200 gives I 1.29%, S 49.77%. |
| c5 | verified | Stage muted line. |

## Pass 5

Checker: fact-checker (did not write these claims; builder-revised claims checked as rewritten). Claims set to verified: c2, c3, c4, c6.

Re-ran the Euler (dt 0.01) SIRS: L=100 peaks on days 34,185,329,473,617,761 with S 50.7, 50.2, 50.0...; day 900 S 50.0%, I 2.38%. L=50: I 4.55%; L=200: S 49.77%, I 1.29%. Endemic I = 0.5/(1+0.2L).
