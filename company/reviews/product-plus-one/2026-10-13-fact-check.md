# Fact-check: product-plus-one, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 2 x 3 x 5 x 7 x 11 x 13 = 30030, and 30030 + 1 = 30031 = 59 x 509. | verified | 2*3*5*7*11*13 = 30030; 30031 = 59 x 509 (59*509 = 30031). |
| c2 For the lists 2; 2, 3; 2, 3, 5; 2, 3, 5, 7; 2 to 11, product + 1 is 3,... | verified | Products+1 for the five lists: 3, 7, 31, 211, 2311, all prime by trial division; 30031 composite. |
| c3 Product + 1 leaves remainder 1 when divided by each prime in the list,... | verified | Product is a multiple of each listed p so product+1 = 1 mod p. Checked all 63 non-empty subsets of {2,3,5,7,11,13}: no prime factor of product+1 is in the subset. |
| c4 No finite list holds every prime: the primes never run out (Euclid). | verified | Euclid IX.20 and Hardy & Wright Thm 4 are the right places for this theorem. |
| c5 Every whole number above 1 has at least one prime factor. | verified | Smallest divisor >1 is prime. Standard. |

Disputed: none. Withdrawn: none.

Reveal read from Demo.tsx (not unlocked in the walkthrough): "30031 = 59 x 509, primes not in the list" correct. Recall (211 shows list 2,3,5,7 incomplete) correct since 211 is prime and not in the list. Note: the reveal says the claim holds for "any finite list"; strictly the argument is for any finite list of primes (and also fine for an empty list).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
