# Fact-check: dice-that-chase-each-other (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node with independent mulberry32 and seed pair*1000+batch+1: batch 0 = 74 64 75 73, batch 1 = 69 69 72 57, batch 2 = 60 65 68 64. Binomial(100, 2/3) sd = 4.71; P(57..76) = 0.967 so 'usually within about ten' holds. Note: 57 is about 2 sd low (P(<=57) = 0.028), at the edge of the band; 'ordinary' is fair among the 12 seeded matches but borderline. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.
