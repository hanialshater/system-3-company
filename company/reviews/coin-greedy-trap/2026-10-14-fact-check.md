# Fact-check: coin-greedy-trap (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | node greedy(6) = [4,1,1], 3 coins; fewest(6) = 2 (3+3). |
| c3 | verified | node: greedy(8) = [4,4] = fewest 2; greedy(10) = [4,4,1,1] vs fewest 3 (4+3+3); over targets 1..12 greedy loses only at 6 and 10. |

**Result:** all claims in this pass verified.
