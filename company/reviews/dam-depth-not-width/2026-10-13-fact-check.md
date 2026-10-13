# Fact-check: dam-depth-not-width (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 1000*9.81*10 = 98.1 kPa; 19.62 to 196.2 kPa for 2-20 m; no width term. |
| c2 | verified | Hydrostatic column argument (Stevin/Pascal hydrostatic paradox) is standard. |
| c3 | verified | Force = P*A at equal pressure. |
| c4 | verified | Muted note says gauge pressure; stage says widths not to scale (checked in Demo.tsx header and the reveal). |
