# Build notes: three-giants-in-africa

## v1 (2026-10-13, wave 3)
- Changed from the brief: there is no dragging. Three "Move" buttons place each country by a rigid rotation on the sphere (centroid to a target, then a spin). The targets are precomputed by gen.mjs, which is committed alongside with its input africa.json and its output placements.json. Re-running `node src/demos/geography/three-giants-in-africa/gen.mjs` reproduced placements.json exactly (deterministic, about 4 minutes).
- The US arrives as two pieces: the lower 48 and Alaska, its two largest polygons. Hawaii and small islands (0.04 M km²) are not moved, and claim c1 says so. China includes Hainan.
- The fit is not an exact tiling. The best placement found has 2.6% of sample points outside Africa or on another piece, and the stage says "About 3% of the pieces overlap a coast or each other". The answer rests on area (c1), not on the drawing (c4). A greedy search alone left India 26% outside. Coordinate-descent refinement brought the total down to 2.6%.
- Numbers, from geoArea in Demo.tsx: placed total 22.0 M km², Africa (51 shapes) 30.0, share 73%, room left 8.0 M km². This matches the brief's 22.05 / 30.04 to within the dropped islands.
- Key state: all three placed (milestones us, china, india; minInteractions 3). The buttons come first in DOM order and disable once used.
- Locked: the share bar, the share and the room readouts are hidden.
- The reveal's Mercator sentence (c5) is told, not shown: there is no Mercator view, to keep one representation. Reviewers may object.

## v2 (claim fix 2026-10-13)

Pass 4 disputed-claim fix: learner-visible wording and claim rewritten per the fact-check; claim set to unverified, awaiting re-check. See claim source for old/new detail.

## v3 (revision 2026-10-13)

- Reveal no longer says Africa is bigger than "the three largest"; it says the US, China and India together fit inside it. "Without stretching ... across the globe" replaced by a rigid cut-out wording. Claim c1 text updated to match and set unverified.
