# Fact-check: light-at-double-distance, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Light from a small source spreads over an area that grows with the squ... | verified | Flux through a sphere of area 4 pi d^2: E = I/d^2 for a surface facing a point source. Standard. |
| c2 100 lux at 1 m becomes 25 lux at 2 m and about 11 lux at 3 m (44.4 lux... | verified | 100/d^2: 1.5 m 44.4; 2 m 25; 2.5 m 16.0; 3 m 11.1 lux; squares 2.25, 4, 6.25, 9 (all match stage readouts). |
| c3 A beam that is 1 m wide at 1 m is 2 m wide and 2 m tall at 2 m, so it ... | verified | Similar triangles: beam width scales with distance, area with its square. |
| c4 The lux is a unit of illuminance: one lumen of light falling on each s... | verified | 1 lux = 1 lm/m^2 (SI). |
| c5 Idealisation: point source, nothing reflecting... | verified | Checked the rule of thumb on an on-axis uniform disc source of diameter D: illuminance relative to the point-source value is d^2/(R^2+d^2) with R = D/2, which is 0.94 at d = 2D, 0.97 at 3D, 0.99 at 5D, 0.998 at 10D. So "accurate beyond about five source sizes" (about 1% error) and "a large lamp falls off more slowly up close" are both right. |

Disputed: none. Withdrawn: none.

Recall (1 m -> 3 m: a ninth) correct. Reveal "At 3 m: 9 squares, about 11 lux" correct.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
