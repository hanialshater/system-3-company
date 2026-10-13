# Fact-check: fifty-one-times-forty-nine (2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 51*49=2499=2500-1. |
| c2 | verified | Geometry checked: strip of 50 by d stood on the right edge gives width 50+d, height 50-d, leaving d by d; area (50+d)(50-d)+d^2=2500. |
| c3 | verified | Algebraic identity (node tested d=1..10). |
| c4 | verified | node: (50+d)(50-d)=2500-d^2 for d=1..10; 53*47=2491. |
