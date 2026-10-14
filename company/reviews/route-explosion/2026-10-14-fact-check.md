# Fact-check: route-explosion (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx first (predict, stage, readouts, reveal), then re-derived or re-ran each claim in my own scripts (scratchpad fc1); sources corroborated by web search where the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Derivation: an order of k-1 cities has k gaps, each giving a distinct order of k cities, and every k-order arises exactly once (delete city k), so count(k) = k x count(k-1). Matches the stage's 'fact(k-1) x k' readout. |
| c4 | verified | Node BigInt: 19! = 121,645,100,408,832,000; the stage's Number fact(19) is exact (odd part < 2^53) and prints the same string. 19! / 1e9 / 31,557,600 s = 3.855 years (3.857 with 365-day years): 'about 3.9'. |

**Result:** every claim verified or withdrawn.

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own brute force: inserting city k into every order of k-1 cities at each of k gaps gives exactly k! distinct orders for k = 3..8 (6, 24, 120, 720, 5,040, 40,320). 40,320 x 9 = 362,880. Stage message reads fact(k-1) x k. |
| c6 | verified | Own node: chain for 3..9 reads 6, x4 24, x5 120, x6 720, x7 5,040, x8 40,320, x9 362,880 (en-US format as fmt()). perms(4) gives 24 orders each visiting every city once; the polyline starts at home (the square) and has no return leg. |

**Result:** every claim in this pass verified.
