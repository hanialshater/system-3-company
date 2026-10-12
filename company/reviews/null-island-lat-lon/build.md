# Build notes: null-island-lat-lon

## v1 (2026-10-12, wave 1)
- (0, 0) is outside every 1:110m shape; brief answer (open ocean) holds. Correction to the brief: the nearest land is Ghana near Cape Three Points, 567 km (vertex search), not "about 625 km to Tema"; the lesson computes and shows "Ghana, 570 km".
- The locked stage hides the crossing under a fog disc (an equirectangular map otherwise shows the answer at its centre). The fog lifts and the reveal unlocks only when the pin reaches within 0.5° of 0°, 0° (slider or chip).
- Iteration: the equator line did not draw (a 180° LineString segment is ambiguous on the sphere) and left stray lines at the map edges; densified it to 10° steps.
- Dropped the brief's buoy claim: I could not check it, and the lesson does not need it.
