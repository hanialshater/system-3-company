# Fact-check: hanoi-tower-doubles (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | node T(n) = 2T(n-1)+1 gives 7, 15, 31, 63 for n = 3..6; independent BFS over all legal states gives minima 7 (n=3) and 15 (n=4). Optimality proof: Concrete Mathematics 1.1 (not opened). |
| c4 | verified | Demo.tsx carry(): moves += cost(n-1) = 2^(n-1) - 1 and note '+X: n-1 disks take X moves at best'; addDisk() note '(cost(n)) + big disk (1) + (cost(n)) = cost(n+1)'; matches T(n) = 2T(n-1) + 1. |

**Result:** all claims in this pass verified.

## Pass 14 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including dynamic ones) before the claim sources, then re-derived each number in my own node scripts (scratchpad fc14/a.mjs, b.mjs: own BigInt powmod, own two-pointer trace, own xorshift32 quickselect/quicksort simulation, own copies of rightSum, rMin, cup()) and checked citations.

| Claim | Verdict | Basis |
|---|---|---|
| (all) | unchanged | No open claims. Demo.tsx re-read after the revision: carry() charges 2^(n-1) - 1, addDisk() note cost(n) + 1 + cost(n) = cost(n+1), reveal lists 3..n disks then 6 disks 63; all match verified c1, c2, c4. No status change. |

**Result:** nothing open.
