# Fact-check: coaster-track-shape, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Without friction, a cart that starts from rest and drops 5 m reaches 9... | verified | sqrt(2*9.81*5) = 9.9045 m/s. Re-ran the lesson's piece-by-piece model over all 30 tracks (6 lengths x 5 curves): final speed 9.90454 on every one (spread < 1e-14), as energy conservation requires. Also checked the cart stays on the track: the normal force g cos(theta) - v^2 kappa stays positive along all 30 tracks (no lift-off on the hills), so "the track only pushes" is a consistent assumption here. |
| c2 The time to the bottom does depend on the track: from about 1.2 s for ... | verified | Times over the 30 tracks: min 1.147 s (3 m ramp, dipping 0.15), max 10.82 s (20 m, bulging 0.3). The steepest straight ramp (3 m) is 1.18 s (analytic 2 sqrt(3^2+5^2)/9.905 = 1.177); 20 m straight 4.16 s. "About 1.2 s" and "about 11 s" are fair roundings (1.15-1.18 and 10.8). Deterministic model, no seeds. |
| c3 Steep pieces of track speed the cart up hard but briefly; gentle piece... | verified | Acceleration g sin(theta) over length h/sin(theta): speed gain depends only on drop h. |
| c4 The mass of the cart does not matter. | verified | m cancels in m g h = 1/2 m v^2 and m a = m g sin(theta). |
| c5 The cart is idealised: no friction, no air drag and no energy in spinn... | verified | Idealisation, consistently applied; rolling wheels would lower the speed by a factor sqrt(1/(1+I/mr^2)) (solid disc: sqrt(2/3)). |

Disputed: none. Withdrawn: none.

Recall (frictionless slides 8 m: same speed) correct. Reveal "v = sqrt(2 g h)" correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
