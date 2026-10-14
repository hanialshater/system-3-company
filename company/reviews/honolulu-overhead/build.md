# Build notes: honolulu-overhead

## v1 (2026-10-13, wave 2)
- Map: equirectangular (geoEquirectangular fitted to the Sphere, 320 x 160), 1:110m countries. I used a flat map, not the brief's orthographic globe, because Honolulu and Cairo are about 189 degrees of longitude apart and cannot both appear on one globe face.
- Declination model: the same Kepler orbit as closer-in-winter (e = 0.0167, perihelion 3 Jan, obliquity 23.44). Peak is 23.44 N on day 172 (21 Jun). The days nearest Honolulu's 21.31 N are day 147 (27 May) and day 197 (16 Jul), which matches the brief. All of these are computed in Demo.tsx and quoted in the reveal from the same arrays.
- The brief answer holds: Honolulu.
- Stage: a dashed line marks today's overhead-Sun latitude. Each city marker fills once the line has swept over it. A jump sweeps every day in between, as the slider would. The tropic lines are hidden while locked, so they do not hint at the answer.
- Key state: the June peak, where the line stops at 23.4 N with Honolulu filled and Miami/Cairo empty. One milestone, "june-peak". The "21 Jun" chip is first in DOM order.
- Locked: the "Farthest north so far" readout shows "?".
- Iteration: the phone screenshot reads clearly. Miami's marker sits about 2 px above the Tropic of Cancer line, which is correct, but a reviewer may want a zoom.

## Revision v2

Why: learner review (2026-10-13, v1, revise).
- Hook neutral. Latitude grid (equator, 20, 40 N) labelled on the map; tropic lines named; "Earth's axis tilt 23.4" readout beside "farthest north so far", so the match is on the stage.
- 27 May / 16 July dropped from the reveal (claim c3 withdrawn). c4 reworded. Hint no longer says "through June".
