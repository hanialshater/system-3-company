# Fact-check: lifeguard-fastest-path, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 With the lifeguard 40 m up the beach, the swimmer 20 m out and 60 m al... | verified | Crossing at 60*40/60 = 40 m; t(40) = 8.08 + 18.86 = 26.94 s ("26.9"). |
| c2 Entering at 56 m takes 23.4 s, the fastest of the stage's 8 m steps; t... | verified | Scanned x = 0..60 at 0.001 m: minimum at 56.449 m, 23.4254 s. Stage steps of 8 m: 47.88, 42.97, 38.38, 34.12, 30.26, 26.94, 24.48, 23.43, 24.38 s; 56 m is the fastest of the steps ("56.4" is the right rounding of 56.449). t(56) = 9.83 + 13.60. |
| c3 At the fastest entry point, sin(angle on sand)/7 equals sin(angle in w... | verified | At the optimum sin(a1)/7 = 0.11656 and sin(a2)/1.5 = 0.11654 (angles from the normal): equal to within the scan resolution. |
| c4 Light takes the path of least time between two points (Fermat's princi... | verified | Fermat and Snell: standard. Wording point: Fermat gives a path of stationary (usually least) time, and the ray bends toward the normal in the slower medium; the reveal's "bends toward the slow side" is a loose phrasing but not wrong. Feynman Lectures I ch. 26 is the correct locator (Optics: the principle of least time). |
| c5 Model: flat beach, straight shoreline, steady running and swimming spe... | verified | Stated scope; flat beach, constant speeds, and the stage is drawn to scale. |

Disputed: none. Withdrawn: none.

Recall (light into glass bends toward the perpendicular in the glass) correct. The 7 m/s run and 1.5 m/s swim are illustrative speeds, labelled on the stage.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
