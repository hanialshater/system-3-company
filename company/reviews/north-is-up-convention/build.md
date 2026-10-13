# Build notes: north-is-up-convention

## v1 (2026-10-13, wave 3)
- Changed from the brief: an orthographic globe centred on Jerusalem (the Hereford map's centre) instead of an Equirectangular map. Rolling an Equirectangular map with the third rotation angle gives a transverse aspect, not a turned picture. Rolling an orthographic view is a pure turn of the image. I dropped the brief's "tap which continent you recognise first".
- The question gives the Hereford layout (Asia top, Europe lower left, Africa lower right), so the stage can show the answer: the learner turns the globe until it matches. "Top of the map" is read off the projection (topDirection), and matchesHereford tests the projected label positions, so neither is typed.
- Key state (milestone "hereford"): the layout matches. That happens at a quarter-turn left. That button is first in DOM order, so QA reaches the key state on the first press. The second button turns the globe back to north-up.
- All historical claims (c1-c6) are from memory and not checked online. c2's source notes that Hereford swaps the Europe and Africa labels. No claim about why north-up won (brief rule 4).
- The phone screenshot looked fine. No iteration needed beyond checking that the compass rose stays outside the globe.
