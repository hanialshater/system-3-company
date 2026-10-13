# Fact-check: paths-by-adding, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Every shortest route into a corner arrives from the corner to its west... | verified | Last move is east or north (disjoint, exhaustive); edges have one route. Dynamic programme equals C(a+b,a) for all a,b < 8. |
| c2 A 3-by-3 grid of blocks has 20 shortest corner-to-corner routes; the c... | verified | Grid of sums (4x4 corners): 1 1 1 1 / 1 2 3 4 / 1 3 6 10 / 1 4 10 20, so values 2,3,4,6,10,20 and 20 at the far corner. Matches stage captions ("1 from the west + 1 from the south = 2", "2 + 1 = 3"). |
| c3 Turned so Start is on top, the route counts are Pascal's triangle, whe... | verified | Routes to (a,b) = C(a+b,a); on the tilted grid these are Pascal entries; C(6,3) = 20 is the middle of row 6 (row 0 = 1). Concrete Mathematics sec. 5.1 not re-read (book not reachable); the identity is standard and re-verified by DP. |
| c4 The 20 routes correspond to choosing which 3 of the 6 moves go east. | verified | Enumerated all 64 six-move strings: exactly 20 have 3 easts. |

Disputed: none. Withdrawn: none.

Recall (4 from west + 6 from south = 10) is the add rule, correct. Reveal read from Demo.tsx (the walkthrough never unlocked it); numbers are computed from the same binomial and match c2.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
