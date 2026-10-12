# Fact-check: projectile-angle

date: 2026-10-12 · reviewer: fact-checker · inputs: meta.json claims, `artifacts/walkthroughs/projectile-angle/transcript.md`, Demo.tsx (read only to list visible sentences)
working: `artifacts/scratch/fc-projectile.mjs` (analytic formulas, numeric integration with no formula, and numeric linear and quadratic drag)

## Claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 R = v^2 sin(2 theta)/g from ground level, no drag | **verified** | Flight time x horizontal speed matches: 35.312 m at 30 and 60 degrees. Numeric time-stepping with no formula (dt = 1e-5 s) gives 35.31, 35.31 and 40.77 m for 30, 60, 45 degrees. |
| c2 complementary angles give equal range | **verified** | sin(2 theta) = sin(180 - 2 theta); checked for every integer angle 1..89: 0 mismatches. |
| c3 30/60 degrees: 35.3 m; 45 degrees: 40.8 m at 20 m/s | **verified** | 35.31 m and 40.77 m. |
| c4 60 degrees: 3.5 s, 15.3 m peak; 30 degrees: 2.0 s, 5.1 m peak | **verified** | 3.53 s, 15.29 m; 2.04 s, 5.10 m. |
| c5 45 degrees gives the longest range (no drag, ground launch) | **verified** | Scan 0..90 in 0.01 degree steps: argmax 45.00. |
| c6 with real drag complementary throws no longer match; the steep throw loses more distance | **verified** (citation note) | Numeric integration with quadratic drag (k = 0.005..0.05 per m) and linear drag (k = 0.1..0.6 per s), pairs 20/70, 30/60, 40/50: in all 21 cases the flatter throw lands farther, and the steep throw loses more metres (e.g. quadratic k = 0.01: 30 degrees 28.5 m vs 60 degrees 26.7 m; loss 6.8 vs 8.6 m). Optimal angle falls below 45 degrees (about 43 to 34 degrees). Holds for realistic drag; at zero drag it reduces to c2. Citation: Taylor ch. 2 does cover linear and quadratic drag, but I believe sections 2.2 to 2.4 are the drag sections and 2.5 is the charged-particle section, so "sec. 2.4-2.5" looks mis-pinned. I could only confirm online that 2.3 and 2.4 exist, not what 2.5 contains. The claim is verified on my computation, not on the citation. |

## Unrecorded claims found (added to meta.json as `unverified`)

- c7: "20 and 70 degrees ... 40 and 50 degrees" land together (reveal; 26.2 m and 40.2 m by my script).
- c8: the 60 degree ball drifts sideways more slowly: 10 m/s vs 17.3 m/s (reveal text "drifts sideways slowly ... races sideways").
- c9: recall: 25 and 65 degrees land at the same spot.

Seen and covered: every live readout (Lands, Peak, Air) at each 5 degree step is c1/c4 applied. I recomputed those shown in the walkthrough: 20 degrees 26.2 m / 2.4 m / 1.4 s, 35 degrees 38.3 m, 50 degrees 40.2 m / 12.0 m / 3.1 s, 65 degrees 31.2 m / 16.7 m / 3.7 s. All correct.

## Fixes routed to demo-builder (phrased as problems)

1. Citation for c6 may be mis-pinned (Taylor "sec. 2.4-2.5"); the source line should point at the drag sections, and the claim "the optimum angle drops below 45 degrees" is not stated in the cited text as far as I could confirm. Needs a human with the book to check the pin.
2. The reveal's last line "Real air steals more from the long, steep flight" reads as a general rule; it is true for ordinary drag (all my cases) but "more" is about metres lost, not percent, and the lesson does not say so. Low risk.
3. Prediction and reveal state 20 m/s, g = 9.81, ground-level launch; the "no air drag" idealisation only appears at the end of the reveal, after the learner has been shown "same spot" as a fact. The predict says "no wind", not "no air resistance". A learner who thinks of a real ball may feel the answer is wrong for real throws.
4. Recall: "thrown at 25 degrees lands 30 m away" implies a speed of about 19.6 m/s, unlike the 20 m/s in the lesson (25 degrees at 20 m/s lands 31.2 m). Not false (the speed is unstated), but a learner may notice the mismatch.

Status after this check: c1-c6 verified, none disputed; c7-c9 await an independent checker.
