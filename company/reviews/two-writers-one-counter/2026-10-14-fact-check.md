# Fact-check: two-writers-one-counter (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Demo.tsx run(): reg[t] is per thread, shown as 'copy' in each lane; 'Order run:' line from orderText(seq) lists steps in run order. Own node: run(A,B,A,A,B,B) = 1, run(A,A,A,B,B,B) = 2. |

**Result:** 1 verified, 0 disputed, 0 withdrawn.

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node tw.mjs, Demo trace() copied, order ABAABB: B's copy 0 marked stale after A writes 1, B writes 1, LOST flag, counter 1. All 20 interleavings: lost write iff final 1; only AAABBB and BBBAAA give 2. |
| c5 | verified | Demo: reg[t] per thread shown as 'copy'; stale = read, not yet written back, and read value != counter (counter only rises here, so 'differs' = 'changed since read'). Finished threads are not marked, consistent with the source note. |
| c6 | verified | Convention gloss in the predict stem. Silberschatz et al. thread definition from memory, not opened; the gloss is a simplification, not a technical claim the stage tests. |

**Result:** 3 verified, 0 disputed, 0 withdrawn.
