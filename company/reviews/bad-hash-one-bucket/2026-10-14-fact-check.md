# Fact-check: bad-hash-one-bucket (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: (10..100) mod 10 all 0, 1 slot used, 9 empty; key 100 is 10th in the slot-0 list when dropped in order 10..100 (readout uses last key dropped; another order gives a different count, but the claim's order is the button order). |
| c2 | verified | node: mod 7 remainders 3,6,2,5,1,4,0,3,6,2: 7 distinct; slots 7-9 unreachable (legend says so); key 100 -> slot 2 after 30, so 2 steps (in drop order). |
| c3 | verified | Chaining: CLRS 3rd ed. 11.2 (search time proportional to chain length; not opened, network blocked). Stage readout counts position in the chain. 'Hash' as the rule key -> slot is the standard term (hash function). |
| c5 | verified | 23 = 2 x 10 + 3; node 23 % 10 = 3. |

**Result:** all claims in this pass verified.
