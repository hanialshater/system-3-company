# Fact-check: coin-greedy-trap (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: dynamic programming gives 2 for 6 with {1,3,4} (3+3). |
| c2 | Verified: greedy gives 4+1+1 = 3 coins. |
| c3 | Verified: for targets 1..12 greedy differs from optimal only at 6 (3 vs 2) and 10 (4+4+1+1 = 4 vs 4+3+3 = 3); at 8 greedy 4+4 is optimal. |
| c4 | Verified: greedy equals the optimum for every amount 1..20,000 with {1,5,10,25}; the cited result (CLRS Problem 16-1, Kozen and Zaks 1994) is consistent with that. The source is a pointer to a known result, and my own exhaustive check stands independently. |
| c5 | Verified: greedy on {1,5,6} for 10 is 6+1+1+1+1 (5 coins); 5+5 is 2, the optimum. Recall question text matches. |

Visible reveal text (Demo.tsx) says 'Taking the 4 first leaves 2, which only 1s can fill': true for {1,3,4}. No unrecorded claims. Deterministic, no seeds.
