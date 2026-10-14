# Fact-check: tissot-circles (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node with d3-geo and the Demo.tsx projection: drawn-area ratio 4.158 (stage shows 4.2x); independent sphere integral of sec^2(lat) over the two 1,000 km caps gives 4.157. Stretch readout 1/cos 60 = 2.00; sec^2 60 = 4. Circle angular radius 8.99 deg, top edge 68.99 N. Snyder 1987 PP 1395 ch. 7 (h = k = sec lat) recalled, not opened. |
| c5 | verified | Derivation: conformal means h = k; equal-area means hk = 1; together h = k = 1 everywhere, an isometry, which Gauss's Theorema Egregium (1827) forbids for a sphere (K = 1/R^2 vs 0). Snyder chapter reference not opened; derivation stands alone. |

**Result:** 2 verified, 0 disputed, 0 withdrawn.
