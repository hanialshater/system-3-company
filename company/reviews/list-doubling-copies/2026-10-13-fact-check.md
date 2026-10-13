# Fact-check: list-doubling-copies (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | simulation; recomputed or source confirmed, see Evidence |
| c2 | verified | derivation; Checked n = 2..64: copies = n - 1. |
| c3 | verified | derivation; recomputed or source confirmed, see Evidence |
| c4 | verified | source; recomputed or source confirmed, see Evidence |

## Evidence
grows(16) = [1,2,4,8] sum 15; independent loop: resizes at appends 2,3,5,9 copying 1,2,4,8. grows(n) sums for n=2..64: 1,3,7,15,31,63 (= n-1). Java ArrayList grow is old + old>>1.

## Wording fixes (recommendations only; builder owns Demo.tsx)
None needed.

## Not verified by me
None; every claim above is checked.
