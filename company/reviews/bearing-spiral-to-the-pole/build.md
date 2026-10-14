# Build notes: bearing-spiral-to-the-pole

## v1 (2026-10-13, wave 4)
- Brief #34. Re-run: length R(π/2)/cos 80° = 57,631 km; 6.36 turns by 89.9°N (8.4 by 89.99°N); equator to pole 10,007.6 km. The path is drawn from λ = tan α · ψ(φ). The readouts and the reveal use the same functions (lengthKm, turnsBy).
- Option B was changed from "About 57,600 km" to "About 58,000 km", so the option is not the stage's exact readout. The reveal says "About 57,630 km".
- Changed from the brief: three heading buttons (10°, 45°, 80°) instead of a 10 to 85° slider, plus "Zoom on the pole" (×8). The start is 45°. Order: 10, 45, 80, zoom, so the QA path ends on the key state.
- Key state: `heading-80` and `zoomed` (minInteractions 2). Readouts are "?" while locked. The spiral itself is visible while locked at 45°, which does not give away the 80° answer.
- Phone iteration 1: the QA path ended zoomed at 10°, which shows only one arc. Reordered the buttons.
- Reviewers may object that "infinitely many turns" is told rather than shown. The zoom shows the turns tightening, and the turns readout is fixed at 89.9°N.

## Revision v2

Why: learner review (2026-10-14, v1, revise).
- New control "Follow it closer" steps the path to 89, 89.9, 89.99 degrees N and all the way, truncating the drawn path and updating "Distance to" and "Turns round the pole" (endless at the pole). The finite length is now seen converging (80 degrees: 56,990 km to 89N, 57,630 km to the pole). It is a third milestone, reached only at heading 80.
- cos 80 dropped from the reveal; replaced by "each km gains about 0.17 km of northing, so about 5.8 times the straight-north distance". Claims c2, c3, c5 rewritten (unverified).
- Reveal now quotes only states a learner visits (80 degrees at the pole, and 89N).
- Not checked here: the tiny predict-frame globe; see walkthrough sheet.
