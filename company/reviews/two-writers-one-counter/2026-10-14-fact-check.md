# Fact-check: two-writers-one-counter (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Demo.tsx run(): reg[t] is per thread, shown as 'copy' in each lane; 'Order run:' line from orderText(seq) lists steps in run order. Own node: run(A,B,A,A,B,B) = 1, run(A,A,A,B,B,B) = 2. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.
