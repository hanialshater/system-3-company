# Build notes: two-bulges

## v1 (2026-10-13, wave 2)
- Not a map: the Earth seen from above the North Pole, a fixed Moon, and an ocean with no continents. The water outline is r = Earth + sea + A cos(2 theta) (equilibrium tide shape, amplitude made up and hugely exaggerated). It is labelled "Toy: no continents, bulges exaggerated" on the stage.
- The time slider covers one lunar day (24 h 50 min). The coast dot's angle from the Moon line is 360 t / 24.83 h, anticlockwise as seen from above the North Pole. The gauge readout uses the same cos(2 theta) as the outline.
- Brief answer holds: 2 (most coasts). 12 h 25 min is computed as half the lunar day.
- Key state: the coast on the far side from the Moon showing "High tide", which is the surprise, plus the near side. Milestones: "near" and "far" (dot within 15 degrees of each). The chips "Coast faces the Moon" and "Coast faces away" are first in DOM order.
- Locked: the water is drawn as a uniform ring (no bulges) and the readout shows "?". Showing two bulges before the prediction would give the answer away.
- The brief asked for a draggable coastal point. I used one fixed coast point that turns with the Earth, because the slider already moves it round.
- Iteration: the phone screenshot reads clearly (far-side dot at high water). No change.
