# Fact-check: sorted-input-sinks-quicksort, 2026-10-14

## Pass 19

Checker: fact-checker. Scope: every claim with status unverified. Method: read Demo.tsx so stage and claim agree, then re-derived or re-simulated independently in node; CLRS 4th ed. cited by section.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 sorted hand 1..6 costs 15 | verified | My own node quicksort (first-card pivot, cost = group size - 1): 5+4+3+2+1 = 15; matches plan()/sumCost in Demo.tsx and the reveal. |
| c2 shuffled 3 4 1 6 2 5 costs 9 (5,1,2,1) | verified | Same script: 9; split order in plan() gives costs 5, 1, 2, 1. |
| c3 every sorted split leaves 0 on one side | verified | Derivation: first card of a sorted group is its minimum; stage shows "smaller: 0 cards" each row. |
| c4 no order of 6 costs more than 15 | verified | Enumerated all 720 orders: max 15, min 8, total 7416 (mean 10.3), 32 tie at 15 incl. reversed. Mean also equals 2(n+1)H_n - 4n = 10.3. |
| c5 sorted cost n(n-1)/2 | verified | Arithmetic series; CLRS 4th ed. section 7.2 (worst-case partitioning, Theta(n^2)). |
| c6 random pivot makes the bad case very unlikely on long hands | verified | CLRS 4th ed. 7.3-7.4: expected O(n lg n) on every input. The max-cost run needs every pivot to be a group extreme: probability 2^(n-1)/n!, 32/720 for n = 6, vanishing as n grows. |

Result: 6 verified, 0 disputed, 0 withdrawn. All claims in this lesson are now verified.
