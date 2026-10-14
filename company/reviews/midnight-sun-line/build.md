# Build notes: midnight-sun-line

## v1 (2026-10-13, wave 2)
- Map: orthographic globe (geoOrthographic, rotate [-antisolar longitude, -60], fitted 320 x 220), 1:110m countries. The view follows the antisolar meridian, so the Sun is fixed and the Earth turns with the "Time at the town" slider.
- Night side: geoCircle of radius 90 centred on the antisolar point (antisolar lon, -23.44). Day length comes from cos H = -tan(lat) tan(23.44). Both use the same declination constant, so the picture and the readout agree. The "Toy: geometric Sun, no air" label is on the stage.
- The brief answer holds: 66.56 N (shown as 66.6). Recomputed: 65 N gives 21.12 h, 66.5 N gives 23.42 h, 66.56 N and up give 24 h.
- Key state: the town at 66.6 N with "Sun sets? No", and one place south of the line where it sets. Milestones: "edge" (lat within 66.56 to 66.71) and "south" (lat < 66.06). The chips 66.6 / 65 / 80 come first in DOM order.
- Locked: the daylight and sun-sets readouts show "?".
- Brief claim 3 (Tromso dates) is not used. The refraction caveat appears in the reveal without a number (claim c4).
- Iteration: at a 50 N viewpoint the Arctic was small on the phone, so I tilted the view to 60 N.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Question defines June 21 and latitude. The 66.6 N chip is replaced by 65, 70 and 80 so no button lands on the answer; the milestones are 'sets' (65) and 'never sets' (70). A 24-cell day strip shows the whole day's sunlight at the town, so 'never sets' is seen all round the clock. Reveal says why 23.4 N is not the answer (Tropic of Cancer). New claims c5 and c6, unverified.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
