# Build note: higher-orbit-slower

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: top view drawn to scale (geostationary radius 88 px), so the ISS orbit hugs the Earth and geostationary is far out. The satellite laps at 2000x real time and carries a red velocity arrow proportional to its speed, so the learner sees it both shrink and slow. Readouts: speed and lap time (hidden until the prediction).
- The radius slider steps through stops: 200 km up (6,571 km), ISS (6,771 km), 20,000 km, geostationary (42,164 km). "Radius" is defined on the stage as distance from Earth's centre, the same convention the question uses.
- Earned reveal: milestone 'geo'. QA path: starts at the ISS; two presses reach 20,000 km, then geostationary, the question's state. The reveal quotes ISS 7.67 km/s / 92 min (the starting state, seen on unlock) and geostationary 3.07 km/s / 23.9 h.
- Numbers (node): v = sqrt(3.986e14 / r): 7.79, 7.67, 4.46, 3.07 km/s; laps 88 min, 92 min, 7.8 h, 23.9 h; gravity ratio (6771/42164)^2 = 2.6%.
- The misconception's root (it took energy to get there) is answered in the reveal with claim c5 (total energy rises though speed falls); that is told, not shown. A possible v2 is an energy bar, if reviewers find the told sentence does not land.
- After screenshots: moved the "To scale" chip to the bottom; at the top it overlapped the geostationary orbit.

## Revision v2

Findings from 2026-10-14-learner-adult-beginner.md (revise).

No baseline: the ISS speed and lap time (7.67 km/s, 92 min) now show while locked, so the first move outward is a comparison. The gate still needs the geostationary stop, so two radii are seen. 'Height energy' sentence unchanged (claim c5).

Kept `curriculum`; `format` set to single-card if it was missing. Version bumped to 2.
