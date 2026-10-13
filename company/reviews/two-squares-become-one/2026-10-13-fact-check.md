# Fact-check: two-squares-become-one, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 A right triangle with short sides 3 and 4 has a long side of 5. | verified | 3^2+4^2 = 25 = 5^2; 7^2 = 49, 3.5^2 = 12.25. |
| c2 Four copies of a right triangle with short sides a and b fit inside a ... | verified | Rebuilt both layouts from the Demo.tsx coordinates (T1 (0,0)(3,0)(0,4) shifted +(0,3); T2 fixed; T3 shifted (-4,0); T4 shifted (3,-4)) and rasterised: no overlaps in either layout; empty area exactly 25 in both; corners layout empty region is the square on vertices (3,0),(7,3),(4,7),(0,4) (side 5); pairs layout empty region is a 3x3 and a 4x4 square. |
| c3 Sliding the triangles without turning them does not change the empty a... | verified | (a+b)^2 - 4(ab/2) = 49 - 24 = 25 both ways; translations preserve area. |
| c4 The same packing works for any right triangle, so a^2 + b^2 = c^2 (the... | verified | General a,b: (a+b)^2 - 2ab = a^2 + b^2 = c^2. Euclid I.47 is the theorem; the rearrangement proof is the classical one. Nelsen p. 3 pinpoint not re-read. |

Disputed: none. Withdrawn: none.

Recall (squares 25 and 144 -> 169, long side 13) correct. Reveal "moved three triangles without turning them" matches the code (T1, T3, T4 slide; T2 stays). Reveal says "any right triangle ... packs the same way"; true for all right triangles (c4).

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
