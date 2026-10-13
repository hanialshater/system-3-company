# Build notes: indonesia-vs-the-us-width

## v1 (2026-10-13, wave 4)
- Brief #31. Numbers re-run in node on the kit's 1:110m data: Indonesia longest vertex-to-vertex great-circle span 5,322.7 km, lower-48 polygon 4,648.1 km, ratio 1.145. The stage, question and reveal all use `longestSpan` in Demo.tsx; nothing is typed in.
- Changed from the brief: "east to west" became "end to end". The farthest pair for Indonesia runs NW to SE (5.5°N 95.3°E to 9.1°S 141.0°E), so it is not an east-west extent. There is no stretchable ruler. "Measure both" draws the farthest-pair line on each shape, because a drag ruler is not reachable by QA.
- Indonesia is moved by a rigid rotation (its centroid to the lower-48 centroid, north kept up). The map then zooms (Equal Earth, rotated and fitted to both shapes). It stays one map, but the zoom is a jump; reviewers may find it disorienting.
- Key state: moved and measured (milestones `moved`, `measured`; minInteractions 2). QA presses "Move" then "Measure", and both are reached. The readouts show "?" until measured.
- The US highlight colour includes Alaska (the kit highlights the whole feature). Only the lower-48 polygon is measured, and the question says "48 joined states".
- Phone screenshot, iteration 1: Indonesia's blue was too close to the US highlight, and its west tip touched the edge. Recoloured orange, padded the fit.
- Not claimed: any published east-west extent (the brief's "about 5,100 km" is from memory and uses another definition).
