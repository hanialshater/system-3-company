# Fact-check: bisect-the-bad-commit (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node with BAD = 737: suspects 999, 500, 250, 125, 63, 32, 16, 8, 4, 2, 1 (10 tests). Over all 999 positions: 974 take 10 tests, 25 take 9 (matches Demo.tsx comment). 'Rules out half' is rounded: the worst branch rules out floor(m/2). Housekeeping: claim text repeats 'the stage lists the suspects after each test' twice. |
| c2 | verified | node: max tests over every first-broken position 2..1000 = 10; 2^9 = 512 < 999 <= 1024 = 2^10; reveal uses WORST = ceil(log2 999) = 10. |
| c3 | verified | node: testing v2, v3, ... in order, worst case (v1000 first broken) is v2..v999 = 998 tests, then v1000 is known broken without testing; reveal shows N - 2 = 998. Housekeeping: source line ('737 - 1 = 736 versions') is stale; replace with 'v2..v999 = 998 tests in the worst case'. |

**Result:** all claims in this pass verified.
