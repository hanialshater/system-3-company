# Build notes: bearing-spiral-to-the-pole

## v1 (2026-10-13, wave 4)
- Brief #34. Re-run: length R(π/2)/cos 80° = 57,631 km; 6.36 turns by 89.9°N (8.4 by 89.99°N); equator to pole 10,007.6 km. The path is drawn from λ = tan α · ψ(φ). The readouts and the reveal use the same functions (lengthKm, turnsBy).
- Option B was changed from "About 57,600 km" to "About 58,000 km", so the option is not the stage's exact readout. The reveal says "About 57,630 km".
- Changed from the brief: three heading buttons (10°, 45°, 80°) instead of a 10 to 85° slider, plus "Zoom on the pole" (×8). The start is 45°. Order: 10, 45, 80, zoom, so the QA path ends on the key state.
- Key state: `heading-80` and `zoomed` (minInteractions 2). Readouts are "?" while locked. The spiral itself is visible while locked at 45°, which does not give away the 80° answer.
- Phone iteration 1: the QA path ended zoomed at 10°, which shows only one arc. Reordered the buttons.
- Reviewers may object that "infinitely many turns" is told rather than shown. The zoom shows the turns tightening, and the turns readout is fixed at 89.9°N.
