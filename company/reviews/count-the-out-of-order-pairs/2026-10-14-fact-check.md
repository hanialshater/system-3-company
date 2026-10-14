# Fact-check: count-the-out-of-order-pairs (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Brute force over all 10 pairs of 2 4 1 3 5 gives (2,1), (4,1), (4,3); Demo.tsx BRUTE uses the same rule. |
| c2 | verified | 2 < 4 and 1 < 3 < 5; stage says 'Each half is already in order'. |
| c3 | verified | Re-ran Demo.tsx STEPS merge (take left on <=): 1(+2), 2, 3(+1), 4, 5(+0). A right card is taken only when strictly smaller than the left front, so it is smaller than every waiting left card. |
| c4 | verified | Independent merge-sort counter vs brute force on all 720 orders of 1..6: 0 mismatches. |
| c5 | verified | 5*4/2 = 10 (Demo.tsx ALL_PAIRS); STEPS.length = 5. |
| c6 | verified | Derivation stands alone: merge sort is O(n log n) and counting adds O(1) per card taken. CLRS problem 2-4 (Inversions, 'modify merge sort', Theta(n lg n)) cited from memory, book not opened; the learner sentence does not depend on it. |
