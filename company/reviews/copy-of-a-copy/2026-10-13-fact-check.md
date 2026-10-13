# Fact-check: copy-of-a-copy (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | derivation; recomputed or source confirmed, see Evidence |
| c2 | verified | simulation; recomputed or source confirmed, see Evidence |
| c3 | verified | derivation; recomputed or source confirmed, see Evidence |
| c4 | verified | convention; recomputed or source confirmed, see Evidence |
| c5 | verified | source; Shumailov et al. 2024, Nature 631:755-759 confirmed; abstract says tails of the original distribution disappear. |

## Evidence
Rebuilt with the stage's own nextGen/history/lossRate (artifacts/scratch not needed; scratchpad script a1.mjs): exactLoss(50)=0.36417, exactLoss(500)=4.10e-5, lossRate(50,2000)=0.3730, lossRate(500,2000)=0; runs 1-10 lose 4-6 of 10 words by generation 11 and run 1 loses 5 by generation 3. Shumailov et al. 2024, Nature 631:755-759 confirmed by search.

## Wording fixes (recommendations only; builder owns Demo.tsx)
None needed. Optional: "the common words take over" is a tendency of drift, not a guarantee in a finite run.

## Not verified by me
None; every claim above is checked.
