# Fact-check: half-adder-wiring (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: (2).toString(2) = '10'; 0,1,2,3 = 0,1,10,11; rightOn() compares carry with floor((a+b)/2) and sum with (a+b) mod 2. |
| c2 | verified | Truth tables: XOR = a^b, AND = a&b, OR = a/b (apply() in Demo.tsx); RULE text shown for the selected sum and carry gates ('OR: 1 if either is 1' = at least one). |

**Result:** all claims in this pass verified.
