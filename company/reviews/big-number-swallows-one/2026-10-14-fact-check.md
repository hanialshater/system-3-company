# Fact-check: big-number-swallows-one (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | Wording is off by one. 2^53 is 53 twos multiplied together (52 multiplications). '2 multiplied by itself 53 times' reads as 53 multiplications starting from 2, i.e. 54 twos = 2^54. The same words are in the predict question in Demo.tsx ('which is 2^53 (2 multiplied by itself 53 times)'). The 53-bit part is right (IEEE 754 binary64 significand: 52 stored + 1 implicit). Fix (builder): '2^53 (53 twos multiplied together)' in the claim and in the predict text. Re-check after the fix. |
| c3 | verified | node: Number.MAX_SAFE_INTEGER === 2^53 - 1; BigInt round trip shows P..P+7 exact for even offsets only (true,false,true,false,...), i.e. spacing 2 just above 2^53. Stage rings come from the same round trip. Housekeeping (non-blocking): source mentions a pass-4 rewording '(up to 2^54)' that is not in the claim text; 'just beyond it' is true as written. |
| c4 | verified | node: 2^53 + 1 = 9007199254740992 (tie to even), (2^53+2)+1 = 9007199254740996, (2^53+4)+1 = 9007199254740996, 2^53 + 2 = 9007199254740994. Default rounding roundTiesToEven (IEEE 754-2019 4.3.1). |
| c5 | verified | node: 9007199254740992n + 1n = 9007199254740993n. BigInt is the ECMAScript arbitrary-precision integer type (ES2020+); reveal wording matches. |

**Result:** c2 disputed (blocks publishing). Builder fix as stated in the row, then a fact-checker re-check.
