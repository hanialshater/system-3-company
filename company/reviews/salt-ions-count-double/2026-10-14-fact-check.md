# Fact-check: salt-ions-count-double (2026-10-14)

## Pass 10 (2026-10-14) (re-check of reworded claim)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: re-check of a reworded claim, so I read the current Demo.tsx text where the claim appears (the builder changed it after the last walkthrough) before the claim source, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Re-check: claim and stage muted line now say about 3.4 degC ('Real salt water drops a little less, about 3.4 degC, because ions tug on each other'). Independent derivation: 1 mol/kg = 5.52 wt%; osmotic coefficient near the freezing point about 0.91-0.93 gives 3.72 x (0.91-0.93) = 3.38-3.46 degC, and recalled tabulated depressions (5 wt% about 3.05, 6 wt% about 3.7) interpolate to about 3.4. 'About 3.4' holds across the range. Housekeeping (builder, non-blocking): the source line still ends at 3.46 with 0.93 (a 25 degC value); state the 3.38-3.46 range. CRC table still not opened (no access). |

**Result:** all claims in this pass verified.

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1-c6 | verified (unchanged) | Re-checked on request: Demo.tsx unchanged since pass 10 (mtime 2026-10-13 23:48). KF 1.86, 2 x 1.86 = 3.72 -> 3.7 degC, sugar 1.86 -> 1.9; 58.44 g/mol NaCl, 342.30 g/mol sucrose; 1 mol/kg NaCl = 5.52 wt%, tabulated 5-6 wt% depressions interpolate to about 3.4 degC (muted line). Predict options 1.9 / 3.7 / 0.5 degC match. No unrecorded claims found in the reveal. |

**Result:** all claims in this pass verified.
