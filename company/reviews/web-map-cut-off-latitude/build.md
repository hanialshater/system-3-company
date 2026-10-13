# Build notes: web-map-cut-off-latitude

## v1 (2026-10-13, wave 4)
- Brief #36. Re-run: atan(sinh π) = 85.0511°. Height/width = ψ(L)/π: 75° gives 0.65, 80° 0.78, 85.05° 1.00, 89° 1.51, 90° endless. The 85.05 constant is computed (SQUARE_LAT), not typed.
- Changed from the brief: preset cut buttons (75, 80, 85.05, 89, to the pole) instead of a draggable top edge, so QA visits every value the reveal quotes. Cuts are symmetric north and south (stated on the stage).
- Stage: a Mercator map with a fixed width, its height set by the cut, a dashed square and the parts outside the square shaded. "Never ends ↑" appears at the pole cut, where the map is clipped at the canvas.
- Key state: `square` (85.05) and `beyond` (89 or the pole). The 89° figure and the pole sentence appear in the reveal only if they were visited.
- Phone iteration 1: the shading above the square was the same colour as the sea. It now has its own tint, and a legend was added.
- The "85.05°" button shows the answer's number once the stage unlocks, after the prediction. Reviewers may prefer an unlabelled step. c1 (the tile scheme) is from memory (OSM wiki); no product is named.
