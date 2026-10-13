# Fact-check: elevator-scale (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 70*9.81 = 686.7 N. |
| c2 | verified | A scale reads the normal force on the person (standard). |
| c3 | verified | node: 70*(9.81+2) = 826.7 N; 70*(9.81-2) = 546.7 N; slider 0.5-4 m/s^2 gives 406.7-966.7 N. |
| c4 | verified | N depends on acceleration not velocity; a lift decelerating while moving down accelerates upward. Matches the stage's muted line. |
| c5 | verified | Idealisation (constant acceleration, scale responds instantly); no learner-facing numbers depend on it. |
