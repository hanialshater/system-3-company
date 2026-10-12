# Build notes: closer-in-winter

## v1 (2026-10-12, wave 1)
- Not a map: a top-down orbit drawn to scale (Kepler ellipse, e = 0.0167, perihelion fixed on 3 Jan, obliquity 23.44). Model gives 147.10 Mkm on 3 Jan, 152.10 on 5 Jul, spread 3.3% (artifacts/scratch/w1-orbit.mjs). Brief answer (January) holds.
- Controls: date slider plus "1 Jan / 1 Jun / 1 Sep" chips mirroring the options. Reveal gated on having seen January and June or July (minInteractions 2).
- Iteration: the tilt-arrow label overflowed the SVG on the right and then collided with the arrow in January; moved it to a fixed legend under the orbit.
- The reveal says "early January / early July" rather than the model's exact days, because the real dates drift by a day or two each year.
