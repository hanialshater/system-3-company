# Build notes: triangle-three-right-angles

## v1 (2026-10-13, wave 3)
- Orthographic globe with its view centre at 55°E 30°N, so the pole and both equator corners stay visible across the slider's range of 15°-135°E (the farthest corner is 81° from the view centre).
- Corner angles come from 3-D tangent vectors at the drawn corners (cornerAngle). The area comes from geoArea on the same polygon, wound so d3 takes the small side. Re-run in node: area and (sum - 180°) in rad x R² agree at every stop. 90°E gives 270° and 63.758 M km², which is 12.5% of 4πR².
- Key state: corner at 90°E (milestone "octant"), plus "moved". The slider starts at 60°E with a 15° step, so QA's two arrow presses land on 75° and then 90°.
- Locked: the angle labels, the angle sum and the excess readout are hidden. Area stays visible because it is not the answer.
- "Excess" is defined on the stage before the reveal uses it. The question avoids "meridian" and says "0° line of longitude" instead.
- The reveal's "tiny triangles have almost no excess" is an extrapolation (claim c5). The smallest stage triangle has 15° of excess.
