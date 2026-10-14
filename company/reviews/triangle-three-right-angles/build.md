# Build notes: triangle-three-right-angles

## v1 (2026-10-13, wave 3)
- Orthographic globe with its view centre at 55°E 30°N, so the pole and both equator corners stay visible across the slider's range of 15°-135°E (the farthest corner is 81° from the view centre).
- Corner angles come from 3-D tangent vectors at the drawn corners (cornerAngle). The area comes from geoArea on the same polygon, wound so d3 takes the small side. Re-run in node: area and (sum - 180°) in rad x R² agree at every stop. 90°E gives 270° and 63.758 M km², which is 12.5% of 4πR².
- Key state: corner at 90°E (milestone "octant"), plus "moved". The slider starts at 60°E with a 15° step, so QA's two arrow presses land on 75° and then 90°.
- Locked: the angle labels, the angle sum and the excess readout are hidden. Area stays visible because it is not the answer.
- "Excess" is defined on the stage before the reveal uses it. The question avoids "meridian" and says "0° line of longitude" instead.
- The reveal's "tiny triangles have almost no excess" is an extrapolation (claim c5). The smallest stage triangle has 15° of excess.

## Revision v2
Learner review (2026-10-13) findings:
- Question spelled out the walk and its three turns (270 deducible). It now names only the three corners; options are 180, 210, 270, 360.
- Locked stage showed a 60E triangle and its area, which disagreed with the question. Locked, the globe shows only the three corner dots (third corner at 90E, as the question says), no triangle fill, no area.
- "EXCESS (RAD) x R^2" was unreadable: tile is now "Excess x R^2" and the stage caption defines it in two short lines. c2 reworded to match (unverified).
- Not changed: 510 M km^2 and "tiny triangles" stay as told facts in the reveal (c3, c5); reveal clipping is a kit matter.

## Revision v3 (wave D r5, 2026-10-14)

Slider starts at 30E in 30-degree steps; gate needs three sizes including 90E (QA: two arrow presses, 60 then 90). A record line keeps each size with its sum and share of Earth. Radians and R-squared removed from the stage and reveal: each degree over 180 is 1/720 of Earth. Hint no longer names the destination. Reopened c2, c3; added c6.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.
