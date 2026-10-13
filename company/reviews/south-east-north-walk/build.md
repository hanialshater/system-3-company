# Build notes: south-east-north-walk

## v1 (2026-10-13, wave 4)
- Brief #40. Re-run on the sphere: start distances 1 + R·asin(1/(2πkR)) = 1.159155, 1.079577 and 1.053052 km for k = 1, 2, 3 (the planar 1 + 1/2πk agrees to 1e-10). The simulated walk (Demo.tsx walk(), with the gap measured by geoDistance) returns to within a micrometre at each.
- Changed from the brief: the question says the North Pole works and asks how many *other* places do. The stage is not a WorldMap: at a 1 km scale the kit's data is meaningless. It is a plan of the ice around the South Pole, to scale (105 px per km), labelled, with a scale bar.
- Controls: three start buttons (one per lap count) come first, then a 1.02 to 1.6 km slider. The start state, 1.5 km, fails (off by 2.5 km), so the learner sees a failure first. The buttons are labelled with distances, not "1 lap", so they do not name the mechanism. Reviewers may still find them leading.
- Key state: `ring-1` and `ring-2` (two different working starts). The k = 3 distance appears in the reveal only if it was visited.
- Phone iteration 1: the east-leg circle was only a few pixels wide. Added the label "east leg on a X km circle". The inner circle stays small, because it really is small next to 1 km legs.
