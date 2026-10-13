# Build notes: hole-through-earth

## v1 (2026-10-13, wave 2)
- Map: equirectangular (geoEquirectangular fitted to the Sphere, 320 x 160), Natural Earth 1:110m countries.
- Brief answer holds: Madrid (40.42 N, 3.70 W) goes to (176.30 E, 40.42 S), and geoContains on the 1:110m New Zealand shape is true there. Recomputed in node from the kit's JSON (scratch a.mjs).
- Land opposite land: 13.3% of land on a 1 degree grid, cos-weighted (3.9% of the surface); the brief said 13%. The reveal says "about 13%, on this map".
- New computed facts used in the reveal: 99.3% of the 1:110m USA shape has an ocean antipode; China is 72.7% ocean, 22.3% Argentina, 4.8% Chile (scratch d.mjs). Buenos Aires's antipode (121.6 E, 34.6 N) falls in the sea off China, not on land, so the brief's framing "Argentina digs to China" is only half true; the lesson says Beijing is opposite Argentina instead.
- Key state: the pin at Madrid with its antipode ring shown in New Zealand. Milestones: "madrid" (pin within 0.6 degrees of Madrid) and "another" (any other spot). The Madrid chip is first in DOM order, so QA reaches both milestones with the first two chips.
- Locked: the antipode ring and the "Other end" readout are hidden. The pin starts at New York.
- Iteration: the phone screenshot reads fine; long country names wrap the readout row onto two lines, which is acceptable.
