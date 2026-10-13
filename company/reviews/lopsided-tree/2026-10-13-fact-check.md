# Fact-check: lopsided-tree (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | simulation; recomputed or source confirmed, see Evidence |
| c2 | verified | simulation; Depth 3 counts nodes on the path; the reveal uses "steps" the same way for both trees (3 vs 7), consistent. |
| c3 | verified | source; recomputed or source confirmed, see Evidence |
| c4 | verified | source; recomputed or source confirmed, see Evidence |
| c5 | verified | source; recomputed or source confirmed, see Evidence |

## Evidence
levels([1..7]) = 7, levels([4,2,6,1,3,5,7]) = 3 with equal keys going right.

## Wording fixes (recommendations only; builder owns Demo.tsx)
Optional: "at most 3 steps from the top" counts the root as a step; say "at most 3 comparisons" to be unambiguous.

## Not verified by me
None; every claim above is checked.
