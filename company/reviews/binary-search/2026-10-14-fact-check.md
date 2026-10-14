# Fact-check: binary-search (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | disputed | First half true (middle guess of m leaves at most floor(m/2); node). Second half false at odd counts: the stage flags 'weak' only when after*2 > before + 1, so a guess keeping (m+1)/2 of an odd m (e.g. 250 of 499, 500 of 999) keeps more than half and is NOT called weak (node: mismatch at 2/3, 3/5, ... for every odd m). Fix (builder): change the test to after*2 > before (still never flags a middle guess), or reword the claim. Re-check after the fix. |

**Result:** c5 disputed (blocks publishing). Builder fix as stated in the row, then a fact-checker re-check.
