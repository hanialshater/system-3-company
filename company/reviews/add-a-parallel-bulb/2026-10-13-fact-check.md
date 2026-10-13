# Fact-check: add-a-parallel-bulb (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Kirchhoff voltage/current laws: parallel branches share the source voltage and branch currents sum at the junction (standard law, matches stage). |
| c2 | verified | node: 6/6=1.0 A per branch; 2.0 A and 3.0 A totals. |
| c3 | verified | node: 1/(1/6+1/6)=3 ohm; 6/3=2 A. |
| c4 | verified | node: P=36/6=6 W per bulb for any number of branches (ideal battery). |
| c5 | verified | Stage chip and muted line state the idealisation; the cold-to-hot tungsten resistance rise (about 10x) is textbook-standard and only mentioned as a limitation. |
