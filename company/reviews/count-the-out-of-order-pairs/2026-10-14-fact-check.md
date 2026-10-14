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

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | 5 x 4 / 2 = 10 = ALL_PAIRS; BRUTE has 3 pairs; STEPS.length = 5. Readout 'Every pair: checks 10, 3 found' after the brute milestone. rec.takes is always 5 because a record is written only when a merge finishes. |
| c6 | verified | Derivation (CLRS problem 2-4 not opened): merge sort has log n levels of O(n) merging, and each take adds the waiting-left count (O(1)), so the total is O(n log n). Wording change only. |
| c7 | verified | Hook 'Is checking every pair the only way?'; the stage counts the same 3 two ways (10 pair checks, merge in 5 takes), and c4 (pass 21) covers agreement on all orders. |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
