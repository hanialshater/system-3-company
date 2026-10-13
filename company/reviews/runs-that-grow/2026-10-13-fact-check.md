# Fact-check: runs-that-grow (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | simulation; recomputed or source confirmed, see Evidence |
| c2 | verified | simulation; recomputed or source confirmed, see Evidence |
| c3 | verified | derivation; recomputed or source confirmed, see Evidence |
| c4 | verified | source; Strictly, "others must get longer" needs the code to decode every input length; for same-length rows alone some can shrink without others growing. Standard result as stated for lossless compression; acceptable. |

## Evidence
encode("BWBWBWBW") = 1B1W1B1W1B1W1B1W (16 chars); encode(16 W) = 16W.

## Wording fixes (recommendations only; builder owns Demo.tsx)
Optional: the pigeonhole sentence needs "over all inputs" for strict accuracy; fine at this level.

## Not verified by me
None; every claim above is checked.
