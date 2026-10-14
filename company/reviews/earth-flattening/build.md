# Build notes: earth-flattening

## v1 (2026-10-13, wave 2)
- Not a map: a 30 cm globe outline on the WGS84 ellipsoid (a = 6,378.137 km, f = 1/298.257223563) over a dashed perfect circle. The exaggeration slider multiplies f by 1 to 100.
- Brief answer holds: 300 mm x f = 1.006 mm; 2(a - b) = 42.77 km. Computed in Demo.tsx and quoted in the reveal from the same constants.
- Chimborazo vs Everest: computed in the page as geocentric distance on WGS84 (heights treated as ellipsoidal, an error of a few tens of metres): 6,384.4 vs 6,382.3 km, which matches the brief. Heights and latitudes are from memory and flagged in c4. I dropped the brief's second "profile" control to keep to one representation; the fact lives in the reveal.
- Key state: back at true scale (x1) after seeing x100. At true scale the two outlines are indistinguishable, about 0.3 px apart. Milestones: "squashed" (k >= 10) and "true-scale" (k = 1 after squashed). Chips run x100, x10, x1 in DOM order, so QA reaches both milestones.
- Locked: both mm readouts show "?". The stage starts at x1, which shows a circle and gives nothing away.
- Iteration: the caption overlapped the bottom of the outline, so I enlarged the viewBox. I cut stage text to under 25 words (dropped a px note).

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Chimborazo against Everest is now shown: a button reveals both distances from the Earth's centre (third milestone). 43 km, 0.34 percent and the 21 km bulge are readouts.
- WGS84 and "flattening" removed from the stage text; caption says "real shape, its squash multiplied by k".
- Claims unchanged in text (all still match the stage); version bumped for the stage change.
