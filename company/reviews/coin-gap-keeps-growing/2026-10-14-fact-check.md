# Fact-check: coin-gap-keeps-growing (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node: sqrt(2k/pi) = 2.52, 7.98, 25.2, 79.8; Demo typical() shows 2.5, 8.0, 25, 80; dashed paths use the same formula at +/-. Exact E/S_k/ (k C(k,k/2)/2^k) = 2.46, 7.96, 25.2, so 'about' holds. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.
