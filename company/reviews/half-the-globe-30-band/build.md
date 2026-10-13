# Build notes: half-the-globe-30-band

## v1 (2026-10-13, wave 4)
- Brief #37. Re-run: (sin n − sin s)/2 gives 0.5000 for ±30°, 0.0670 for 60°N to the pole, 0.1736 for ±10° and 0.8660 for ±60°. The drawn band polygon (the cap north of s with the cap north of n cut out) has a geoArea that matches each to 4 decimals. The stage's numbers come from surfaceShare, the formula, which equals the drawn polygon's area.
- Changed from the brief: four band buttons instead of two draggable parallels (a drag is not on the QA path). The start band, ±20°, is not a button, so every press changes the stage. Two readouts set side by side: share of the degrees and share of the surface. The first is the misconception (33%); the second is the answer.
- Key state: `half` (±30°) and `cap` (60°N to the pole). Both buttons come first in DOM order. The cap's 6.7% appears in the reveal only if it was seen (it always is, through the gate).
- Hook fixed before QA: it said "land" where the lesson is about surface.
- The tropics figure (39.8%) from the brief is not used.
