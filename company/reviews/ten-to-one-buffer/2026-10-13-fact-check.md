# Fact-check: ten-to-one-buffer (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | source; recomputed or source confirmed, see Evidence |
| c2 | verified | derivation; recomputed or source confirmed, see Evidence |
| c3 | verified | derivation; recomputed or source confirmed, see Evidence |
| c4 | verified | source; recomputed or source confirmed, see Evidence |
| c5 | verified | source; Po & Senozan, J. Chem. Educ. 78:1499 exists but the 0.01-1 M range could not be read in it. Independent check: exact concentration-only calc for acetic acid 10:1 differs from the equation by 0.01 pH at 1 M, 0.07 at 0.01 M, 0.32 at 0.001 M; activity effects at 1 M are not computed. Rule of thumb is fair. |

## Evidence
pH(10,100)=3.76; pH(100,100)=pH(10,10)=4.76. Independent exact calc (acetic acid, concentrations only): total 1 M differs from HH by 0.001-0.01 pH, 0.01 M by 0.07 at 10:1, 0.001 M by 0.32.

## Wording fixes (recommendations only; builder owns Demo.tsx)
Optional: say the 0.01-1 M range is a rule of thumb (c5 is already hedged in the source).

## Not verified by me
None; every claim above is checked.
