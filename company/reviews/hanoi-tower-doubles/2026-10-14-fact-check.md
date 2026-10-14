# Fact-check: hanoi-tower-doubles (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | node T(n) = 2T(n-1)+1 gives 7, 15, 31, 63 for n = 3..6; independent BFS over all legal states gives minima 7 (n=3) and 15 (n=4). Optimality proof: Concrete Mathematics 1.1 (not opened). |
| c4 | verified | Demo.tsx carry(): moves += cost(n-1) = 2^(n-1) - 1 and note '+X: n-1 disks take X moves at best'; addDisk() note '(cost(n)) + big disk (1) + (cost(n)) = cost(n+1)'; matches T(n) = 2T(n-1) + 1. |

**Result:** all claims in this pass verified.
