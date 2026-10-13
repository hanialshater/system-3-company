# Fact-check: projectile-angle, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c11+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c6 With real air drag the two complementary throws no longer land togethe... | verified | Own RK4 integration at 20 m/s, 9 pairs (5/85 ... 44/46 degrees) x 15 drag strengths (linear k = 0.01..2 /s; quadratic k = 0.0005..0.2 /m): 135 of 135 cases the flatter throw lands farther, and in all 135 the steeper throw loses more metres against its own no-drag range. So it holds generally across drag strength, not only for one setting (deterministic, no seeds). Taylor Classical Mechanics ch. 2 is the right chapter; the section pin was already removed. |
| c7 At 20 m/s, 20 and 70 degree throws both land 26.2 m away, and 40 and 5... | verified | 400 sin(40)/9.81 = 26.21 m and sin(140) the same; 400 sin(80)/9.81 = 40.16 m, sin(100) the same. |
| c8 At 20 m/s the 60 degree ball moves sideways at 10 m/s and the 30 degre... | verified | 20 cos 60 = 10 m/s; 20 cos 30 = 17.32 m/s. |
| c9 Ignoring air resistance, a ball thrown at 25 degrees and one at 65 deg... | verified | 25 + 65 = 90, so sin(50) = sin(130): 31.24 m for both. |
| c10 Ignoring air resistance, a ball thrown at 20 m/s and 25 degrees from t... | verified | 400 sin(50)/9.81 = 31.24 m ("about 31.2"). The recall option "65 degrees" is the only complementary angle. |

Disputed: none. Withdrawn: none.

Reveal numbers (35.3 m range, 60 degree peak 15.3 m, air time 3.5 s; 30 degree 2.0 s) re-derived. The reveal says the 45 degree throw "goes farthest: 40.8 m" in vacuum, correct. Recall explanation ("the steep throw stays up longer but moves sideways more slowly") consistent with c8.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
