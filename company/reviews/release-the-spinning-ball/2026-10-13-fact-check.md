# Fact-check: release-the-spinning-ball, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c6+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Moving in a circle needs a force toward the centre (here the string's ... | verified | Centripetal force m v^2/r towards the centre for uniform circular motion; here supplied by string tension. Standard. |
| c2 Once the string is cut, no sideways force acts, so the ball keeps its ... | verified | Zero net horizontal force after the cut: constant velocity (Newton I); gravity is balanced by the table. |
| c3 Moving anticlockwise, the ball at the east point is moving north, so c... | verified | For every one of the 8 cut points (0, 45, ... 315 degrees) I computed the tangent velocity of anticlockwise motion, v(-sin a, cos a), converted it to a compass bearing and compared it with the stage's `goes()` label: all 8 agree (east -> north, north-west -> south-west, south -> east, etc.). Trail dots 0.05 s x 2 m/s = 0.10 m apart. |
| c4 Nothing flings the ball outward; there is no outward force on it. | verified | In the table frame the only horizontal force on the ball is the string's inward pull; "centrifugal force" is a rotating-frame fictitious force. Standard. |
| c5 The stage is a top view of a frictionless table with illustrative valu... | verified | Idealisation and values (0.5 m, 2 m/s, 0.05 s) match Demo.tsx constants. |

Disputed: none. Withdrawn: none.

Recall (hammer thrower releases the hammer: flies along the tangent, not outward) correct. Reveal sentence "Every other cut you made did the same" is generated from the learner's own cuts and is true for every cut point.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
5 verified, 0 disputed, 0 added unverified.
