# Fact-check: flip-and-add-one (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: ~5 & 255 = 11111010 = -6 signed; +1 = 251 = 11111011 = -128 + 123 = -5. |
| c3 | verified | node: (9 + 251) & 255 = 00000100 = 4 = 9 - 5. Negate by invert-and-add-1 and subtract via adding the two's complement: Patterson and Hennessy, COD, 2.4 and 3.2 (not opened; network blocked). |
| c5 | verified | Bit = binary digit, 0 or 1 (definition); predict text 'Flip every bit (0 becomes 1, 1 becomes 0)' matches flip() = ~raw & 255. |

**Result:** all claims in this pass verified.
