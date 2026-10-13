# Fact-check: one-recipe-for-sixty, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c4+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 60 = 2 x 2 x 3 x 5, and every first split of 60 (2 x 30, 3 x 20, 4 x 1... | verified | Enumerated every possible factor tree of 60 (all ways of repeatedly splitting): the only leaf multiset is {2,2,3,5}. The five first splits on the stage are exactly the five factor pairs of 60 with both factors >= 2. |
| c2 The 6 x 10 tree splits into 2 x 3 and 2 x 5; the 4 x 15 tree splits in... | verified | 6=2x3, 10=2x5, 4=2x2, 15=3x5. |
| c3 Every whole number above 1 can be written as a product of primes in ex... | verified | Fundamental theorem of arithmetic: existence is Euclid VII.31/IX.14-style; uniqueness is Hardy & Wright Thm 2. Standard theorem. Locators (Euclid VII.30-32, IX.14; H&W ch. 2) are correct as far as I recall; books not reachable from this sandbox, pinpoints not re-read. |

Disputed: none. Withdrawn: none.



## Learner-visible statements not previously recorded (added as unverified)

- c4 84 = 2 x 2 x 3 x 7, whether you start from 4 x 21 or 6 x 14. (recall card)

## Fixes routed to demo-builder

None.

## Result
3 verified, 0 disputed, 1 added unverified.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | node: exhaustive factor trees of 84 give only {2,2,3,7}; 84=4*21=6*14. |
