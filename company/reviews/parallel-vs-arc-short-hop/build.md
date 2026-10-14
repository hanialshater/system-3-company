# Build notes: parallel-vs-arc-short-hop

v1 (2026-10-13), Sonnet build (EXP-003). Wave 6 geography.

- Mercator map, two lines between the same endpoints (red parallel, blue great circle). Controls: 1,000 / 5,000 km presets, a latitude cycle (40, 60, 20), a distance slider. Readouts show "?" until the prediction is locked.
- Milestones: short (40N, 1,000 km), long (40N, 5,000 km or more), high (60N, 5,000 km or more). The QA press order (1,000, 5,000, latitude) reaches all three; the reveal quotes exactly those values.
- Brief errors found by recomputing with d3-geo: shares are 1.91% (5,000 km), 5.35% (8,000 km), 7.97% (60N, 5,000 km), not 1.95/5.7/8.7. The km savings match. The brief says the saving grows with the square of distance; at fixed latitude it grows about with the cube (0.72 to 5.83 km when 1,000 doubles to 2,000 km), so the lesson says "five times the distance, over 130 times the saving". Slider max is 8,000 km (the 60N great circle peaks at 79.9N, inside the map).
- Title is "When does the shortcut pay?" (hook does not state the size).

## Revision v2

Learner review 2026-10-14. The question glosses great circle as the shortest route on the globe. The map note says Mercator stretches the north, so the blue line looks longer but is shorter. "The parallel curves away" is now "On the globe the parallel bends away". c5, c6 back to unverified. Not added: a globe view.
