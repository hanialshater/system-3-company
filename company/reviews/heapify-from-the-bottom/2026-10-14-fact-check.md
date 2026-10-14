# Fact-check: heapify-from-the-bottom (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node siftDown (same rule as Demo.tsx): per-sift swaps 1, 1, 2, total 4; intermediate arrays 1 2 7 4 5 6 3 and 1 5 7 4 2 6 3; final 7 5 6 4 2 1 3. Sifting positions 2 and 3 in either order gives the same result (disjoint subtrees). |
| c2 | verified | Own node over all 5,040 permutations: max bottom-up swaps 4; also the bound: heights 2 + 1 + 1 = 4. |
| c3 | verified | Own node insert-and-bubble over 1..7: climbs 0,1,1,2,2,2,2 = 10, final 7 4 6 1 3 2 5; max over all 5,040 orders is 10. |
| c4 | verified | Derivation: children of 1-based i are 2i, 2i+1 > 7 for i = 4..7; Demo.tsx SIFT_ORDER = [2, 1, 0] only. |
| c5 | verified | Own node: sum of node heights < n for every heap size n = 1..2000 (each sift from height h costs at most h swaps), so swaps < n < 2n; e.g. n = 1000 sorted input takes 992. CLRS 4e section 6.3 (BUILD-MAX-HEAP O(n), bound sum ceil(n/2^(h+1)) O(h)). Floyd 1964, CACM 7(12): 701 (recalled, not opened). |

**Result:** 5 verified, 0 disputed, 0 withdrawn.
