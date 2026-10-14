# Build notes: closer-in-winter

## v1 (2026-10-12, wave 1)
- Not a map: a top-down orbit drawn to scale (Kepler ellipse, e = 0.0167, perihelion fixed on 3 Jan, obliquity 23.44). Model gives 147.10 Mkm on 3 Jan, 152.10 on 5 Jul, spread 3.3% (artifacts/scratch/w1-orbit.mjs). Brief answer (January) holds.
- Controls: date slider plus "1 Jan / 1 Jun / 1 Sep" chips mirroring the options. Reveal gated on having seen January and June or July (minInteractions 2).
- Iteration: the tilt-arrow label overflowed the SVG on the right and then collided with the arrow in January; moved it to a fixed legend under the orbit.
- The reveal says "early January / early July" rather than the model's exact days, because the real dates drift by a day or two each year.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Seasons now use whole months (1 Jun reads summer in the north), stated as a convention (new claim c8).
- Added 1 Jul button, so 152.1 million km is reached; a readout "vs closest day" shows +3.4 percent. Gate is now 1 Jan and 1 Jul.
- "Overhead" readout rewritten ("23.0 degrees south of the equator") and the status line adds which half leans toward the Sun, so the tilt effect is seen. Hook no longer says "drag the Earth". Claim c7 reworded; "long days, steep sunlight" removed from the reveal.
