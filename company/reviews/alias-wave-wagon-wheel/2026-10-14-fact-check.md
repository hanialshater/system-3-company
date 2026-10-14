# Fact-check: alias-wave-wagon-wheel (2026-10-14)

## Pass 12 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read each Demo.tsx as rendered text first (predict, stage messages, reveal), then re-derived every number in my own node script (scratchpad fc12/check.mjs: own greedy/DP, brute-force spanning trees and grid paths, BFS Hanoi, Dijkstra, bisect over all 999 positions, IEEE double round trips). Web egress is blocked (proxy 403), so book and spec passages were not opened; each row says so where it relies on one.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | node (fc12/check.mjs): for every slider value 0.5..2.5 no cosine below f (0.01 Hz grid) matches all 6 dots; 3, 3.5, 4 Hz match 2, 1.5, 1 Hz (< 1e-6). Phase-free argument: samples of A cos(wn+p) obey x[n+1]+x[n-1]=2cos(w)x[n], so w in [0, pi] is fixed by the dots; below half the sample rate no slower sinusoid of any phase fits. Stage message text matches. Shannon (1949), Proc. IRE 37(1): 10-21 (not opened; network blocked). |
| c4 | verified | Demo.tsx: FS = 5, dots n/5 for n = 0..5, NYQ = FS/2 shown as 2.5 Hz in the message and reveal, Slider 0.5..4 step 0.5, curves from Math.cos (idealised; no recording). |
| c5 | verified | SI Brochure (9th ed., 2019), Table 4: hertz = s^-1, used for frequency of periodic phenomena (cycles per second). Stage predict text '4 full ups and downs a second' matches. |

**Result:** all claims in this pass verified.
