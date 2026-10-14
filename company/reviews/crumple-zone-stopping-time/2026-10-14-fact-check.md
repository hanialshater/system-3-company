# Fact-check: crumple-zone-stopping-time (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Demo.tsx reveal: 'Steady-force model; real crash forces rise and fall.' Matches the claim. Real frontal crash pulses are non-rectangular (peaked) per the cited NHTSA ESV crash-pulse work (not re-opened this pass); the claim makes no number-bearing statement. |
| c7 | verified | Own node: 1000 x 9.81 = 9810 N; carWeights() toFixed(1) gives 30.6, 15.3, 10.2, 7.6, 6.1, 5.1 for 0.05-0.30 s. Predict's 'about 10 kN' is consistent with 9.8 kN. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.
