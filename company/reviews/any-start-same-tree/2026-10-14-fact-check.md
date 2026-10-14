# Fact-check: any-start-same-tree (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node Prim from each of the 5 starts on the Demo.tsx CABLES: orders A: AC,BC,BD,DE; B: BC,AC,BD,DE; C: AC,BC,BD,DE; D and E: DE,BD,BC,AC; all total 11; no tie for the cheapest crossing cable at any step. |
| c2 | verified | Cut property, CLRS 3e Theorem 23.1 (4e Theorem 21.1): a light edge crossing any cut respecting A is safe. With distinct costs the light edge is unique and the MST is unique, so 'part of the cheapest network' holds as stated. Prim 1957, BSTJ 36(6): 1389-1401 (recalled, not opened). |
| c3 | verified | Own node over all 70 four-cable subsets: 40 spanning trees, costs sorted 11, 12, 13, 14, 14, ...; 11 occurs once. |
| c4 | verified | Follows from c2 and c3, confirmed by c1's simulation (same four cables from every start). |

**Result:** 4 verified, 0 disputed, 0 withdrawn.
