# Fact-check: meaning-without-the-word (2026-10-13)

Checker: fact-checker (this session did not write or build these claims). Method: each claim re-derived with the lesson's own MODEL code run in node (scripts in the session scratchpad), Demo.tsx reveal and predict text read against the claims, sources checked by search where cited.

## Verdicts

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | derivation; recomputed or source confirmed, see Evidence |
| c2 | verified | convention; recomputed or source confirmed, see Evidence |
| c3 | verified | source; Source is weak: the 1958 Constitution does not name Paris as capital; cite Encyclopaedia Britannica "Paris" or the Government of France instead. |
| c4 | verified | source; recomputed or source confirmed, see Evidence |

## Evidence
Keyword scores 0,1,1,1,1; word ranking [1,2,3,4,0], so the top 2 are Italy and wine as stated. Meaning ranking puts Paris first (hand-set).

## Wording fixes (recommendations only; builder owns Demo.tsx)
Reveal para 2 says "the model answers only from what retrieval hands it": added as c5 (unverified) because real retrieval-augmented models also have parametric knowledge. Suggest "in this setup, the model answers from what retrieval hands it". c3: replace the Constitution cite with Britannica or the Government of France.

## Not verified by me
Unverified (needs an independent checker): c5.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | 'The model answers only from what retrieval hands it' is true of the toy but the sentence follows a remark about real systems; real retrieval-augmented models also carry knowledge in their weights (Lewis et al. 2020, parametric memory, checked). Fix: 'In this setup the model answers only from what retrieval hands it'. |

## Pass 4 (2026-10-13)

Checker: fact-checker. Scope: claims still open after builder revisions (v2 rewrites, claim fixes) or never checked. I wrote none of these claims except where marked "added". Method: re-derived numbers in node from the lesson model code (scratch scripts in the session scratchpad), compared each claim with the stage and reveal text, checked sources by web search where reachable.

| Claim | Verdict | Text (short) | Basis |
|---|---|---|---|
| c5 | verified | In this setup the model answers only from what retrieval hands it: a right passage below t... | Rechecked: reveal says 'in this setup the model answers only from what retrieval hands it'. |

## Result (pass 4)
1 verified, 0 disputed, 0 left unverified, 0 added unverified.
