# Fact-check: maze-depth-first (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | simulation; recomputed or source confirmed, see Evidence |
| c2 | verified | simulation; recomputed or source confirmed, see Evidence |
| c3 | verified | derivation; recomputed or source confirmed, see Evidence |
| c4 | verified | source; recomputed or source confirmed, see Evidence |
| c5 | verified | source; recomputed or source confirmed, see Evidence |

## Evidence
dfsSteps(TRIANGLE) returns S,A,G; shortest S,G. dfsSteps(MAZE) returns S,A,C,D,G (4 links) after backing out of B; shortest S,E,G (2).

## Wording fixes (recommendations only; builder owns Demo.tsx)
None needed. The maze is a built illustration, already stated.

## Not verified by me
None; every claim above is checked.
