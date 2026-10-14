# Fact-check: binary-numbers (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | 2^8 = 256 patterns, 0..255 (sum of 128..1 = 255); unique base-2 representation. Stage message at n = 255 reads 'All 8 on = 255: one less than the next switch, 256. With 0, that is 256 numbers.' (isAllOnesBelowTop branch, also reached via +1 from 254). |
| c4 | verified | Ninth switch = 2 x 128 = 256 = 255 + 1. Stage: '255 + 1 = 256 needs a ninth switch'; reveal 'a ninth switch, worth 256'. Housekeeping: source line argues pattern doubling, which is not the claim; the claim follows from doubling place values. |
| c5 | verified | Byte = 8 bits in current use (IEC 80000-13:2008, byte as synonym of octet; not opened, network blocked); bit = binary digit. Housekeeping (non-blocking): the source line still carries an unused '2^32 = 4,294,967,296' fragment. |

**Result:** all claims in this pass verified.
