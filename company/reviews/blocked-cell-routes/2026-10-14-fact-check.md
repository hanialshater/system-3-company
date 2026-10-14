# Fact-check: blocked-cell-routes (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | node DP grid [[1,1,1,1],[1,0,1,2],[1,1,2,4],[1,2,4,8]] = brute force over all 20 paths (8 avoid the block; 20 open). Disjoint last move gives N(r,c) = N(r,c-1) + N(r-1,c). Note: 'edge cell' means the top row and left column (the stage fills those as one edge, message 'Edge cells have only one way in'); bottom and right border cells have two ways in. Wording suggestion (non-blocking): 'each top-row or left-column cell'. |

**Result:** all claims in this pass verified.
