# Build note: heavy-but-floats
- Intent: mass is fixed at 500 g on the ball itself; only volume moves. The ball sinks, hovers at 500 cm3, then floats riding with exactly its density's share under water (spherical-cap depth solved by bisection).
- Starts at 400 cm3 (sunk) so the locked stage does not show the 800 cm3 outcome; the "Ball" state readout is blank while locked.
- After screenshots: hover state reads clearly mid-tank; changed the reveal's "about 62%" to the exact five eighths (62.5%).

## v2 (claim fix 2026-10-13)

Claim c5 disputed: floating ball was drawn with the wrong fraction under water (cap offset sign mirrored). Fixed cy to SURF + (capDepth - 1) * r; at 800 cm3 the drawn fraction below the surface is now 0.625 (checked in node). Claim text unchanged; unverified.

## v3 (revision 2026-10-13)

- Review: stage opened at 400 cm3 while the question is about 800; reveal said 'you see it float' without that. Fix: opens at 800 with the ball held above the water; unlocking drops it and it floats; two milestones (saw float at 800, moved slider) gate the reveal; reveal mentions a sink only if the learner shrank it; density labelled 'mass / volume'; water label moved off the ball.

## Revision v4
The latest learner review (v2) was written against the 400 cm3 stage; v3 had already moved the start to 800 cm3 with the ball held above the water and gated the reveal on watching it float (see v3 above). Remaining in v4: hook no longer says it 'sometimes floats'; added an 'Under water' readout (62.5% at 800 cm3) so the five-eighths figure is on the stage, and the reveal points to it. c5 reset to unverified with matching text.


## Revision v5

The reveal's sink and hover states were unvisited. Added two one-tap buttons, 'Squeeze to 500 cm³' and 'Squeeze to 400 cm³' (they name no outcome), and gated the reveal on float at 800, hover at 500 and sink below 500. Title changed to 'Does a heavy ball sink?' so it no longer says it floats. Stage shrunk and viewBox lifted so the held ball and the readouts are not clipped on a phone.

QA (QA_ONLY, phone and desktop) passes; I looked at the walkthrough sheet. Edited claims are unverified.
