# Fact-check: leaky-vaccine-threshold (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 0.75/0.8=0.9375; critical coverage (1-1/R0)/e is the standard result. |
| c2 | verified | node: 0.75/0.7=1.071; R=4*0.3=1.2; needed coverage exceeds 100% for e<75%. |
| c3 | verified | Initial R = R0(1 - c e) for both leaky and all-or-nothing at the start of an outbreak (standard). |
| c4 | verified | Stage muted line. |
