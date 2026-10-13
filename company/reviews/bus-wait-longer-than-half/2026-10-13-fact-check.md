# Fact-check: bus-wait-longer-than-half (2026-10-13)

## Pass 7

Checker: fact-checker (did not write these claims; builder-rewritten claims checked as rewritten). Numbers re-derived in node from the lesson's own constants or model.ts.

| Claim | Result | Basis |
|---|---|---|
| c1-c5 | verified | Ran model.ts: 48 buses within 480 min, mean gap 9.51, longest gap 33.2; 211 riders mean wait 9.42, first rider 13.71, first 11 8.41, regular 5.23. Theory: stationary renewal mean wait E[g^2]/(2E[g])=200/20=10 for exponential gaps, 5 for regular. Feller vol 2 I.4 waiting-time paradox. |
