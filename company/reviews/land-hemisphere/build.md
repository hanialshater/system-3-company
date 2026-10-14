# Build notes: land-hemisphere

## v1 (2026-10-13, wave 2)
- Map: orthographic globe (geoOrthographic rotate [-lon, -lat], 320 x 220). The visible disc is exactly the hemisphere being measured, so the picture and the number describe the same half. Land is filled with the domain colour (all 1:110m countries highlighted).
- Number source: `mask.ts`, a 2-degree land mask built at build time with geoContains against the kit's land-110m polygon (90 x 180 cells, base64 bits). The page computes the share as a cos(lat)-weighted count of cells whose centre lies within 90 degrees of the globe's centre. The reveal's best, worst, planet and north numbers are computed in the page from the same function.
- Brief answer holds: "Just under half". A build-time search over every 2-degree centre found a best of 47.1% at 42 N, 2 E (the brief said 47% near 41 N, 3 E) and a worst of 10.9% at 42 S, 178 W. Planet 29.0% (the brief said 28.8% on its grid); north 39.5%, south 18.6%.
- The search grid itself is not in the repo (it was a scratch script). To reproduce it, loop the page's landShare over lat -88..88 and lon -180..178 in 2-degree steps.
- Key state: a half of at least 45% land (the "Western Europe" chip, first in DOM order) plus one other centre. Milestones: "landy" and "turned".
- Locked: both readouts show "?".
- Iteration: on the phone the land was too faint at the kit's default muted fill, so I highlighted all countries.
- Small mismatch to note: the drawn fill is country shapes and the mask is the land polygon. Both are 1:110m Natural Earth and differ only along a few shared coastlines.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- The Western Europe preset (which handed over the maximum) is gone. Presets: North Pole (40 percent), Mid-Pacific (21), Africa (38). Gate: any half over 38 percent and any under 25 percent.
- A "Stuck? Show the landiest half a computer found" button appears only after three tries. The reveal says a search found 47 percent, then quotes the learner's own best and lowest.
- "Whole planet 29 percent" is a readout; 11 percent and 40 percent claims (c3, c4) withdrawn. Slider labels in plain words.
