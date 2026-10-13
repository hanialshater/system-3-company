# Fact-check: build-a-balanced-mobile, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c7+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 The centre of mass is the mass-weighted average position: x = (sum of ... | verified | Centre of mass = sum(m x)/sum(m): definition. |
| c2 A uniform ruler's own weight acts at its middle, 50 cm. | verified | Uniform rod: midpoint by symmetry (50 cm). |
| c3 With a 0.10 kg ruler and a 0.10 kg lump at 100 cm, the balance point i... | verified | (0.10*50 + 0.10*100)/0.20 = 75. |
| c4 A beam on a pivot balances when the turning effects on each side are e... | verified | Net torque about 75 cm = 0.10 g (50-75) + 0.10 g (100-75) = 0; arms 25 cm each side. |
| c5 Off balance, the beam tips toward the side with the larger turning eff... | verified | Convention: stage draws a fixed 8 degree tip towards the net-torque side (Demo.tsx). Re-checked sign convention at pivot 62.5/87.5, lump on/off: the stage's "left/right end drops" captions agree with the torque sign every time. |
| c6 A heavier lump pulls the balance point further toward it. | verified | x = (5 + 100m)/(0.1 + m): 75 (m=0.1), 83.3 (0.2), 91.7 (0.5), 95.5 (1), toward 100 as m grows; strictly increasing. |

Disputed: none. Withdrawn: none.

Recall (2 kg plank 4 m + 2 kg box at the end -> 1 m from the box end) correct: (2*2 + 2*4)/4 = 3 m from the far end = 1 m from the box end. Reveal read in the walkthrough; "the long end" in "right of it, the long end does" means the longer side of the beam, true.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
6 verified, 0 disputed, 0 added unverified.
