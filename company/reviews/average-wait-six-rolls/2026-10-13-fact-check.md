# Fact-check: average-wait-six-rolls (2026-10-13)

## Pass 7

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Numbers re-derived in node from the lesson's own constants or model.ts.

| Claim | Result | Basis |
|---|---|---|
| c1-c5 | verified | Ran model.ts (alias patched) in node: seed 6 gives 338 over 6, 491 over 4, mean 5.877, 11 waits of 25 or more, max 59; (5/6)^6=0.3349; 1-(5/6)^4=0.5177; 1-(5/6)^3=0.4213; geometric mean 1/p=6, median 4. |
