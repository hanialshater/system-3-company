# Build notes: shortest-way-to-tokyo

## v1 (2026-10-12, wave 1)
- Brief's numbers reproduced on kit data (artifacts/scratch/w1-tokyo.mjs): great circle 10,875.5 km, vertex 69.85 N 145.4 W inside the 1:110m USA shape (Alaska), rhumb 12,818 km (+18%). Brief answer (Northern Alaska) holds.
- Design: four route chips on a Pacific-centred Mercator (straight line, via Hawaii, via northern Alaska = the great-circle vertex, via Mexico City); readout gives length over the globe. Reveal is gated on trying all three via-routes (interact() only on first visit, minInteractions 3).
- Iteration: the reveal draws the true shortest path dashed when the learner is on another route; added a caption for it. Lengths shown rounded to 10 km so stage, reveal and claims agree.
- Note: Honolulu does fall inside the 1:110m USA shape (the brief said Hawaii is absent); it is still drawn as a marker and no claim rests on the shape.
