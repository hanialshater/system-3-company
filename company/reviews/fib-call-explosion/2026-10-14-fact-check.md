# Fact-check: fib-call-explosion (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node naive call counter with fib(0)=fib(1)=1 base: C(2..5) = 3, 5, 9, 15; stage tree has 15 nodes (8 leaves, 7 internal). |

**Result:** all claims in this pass verified.
