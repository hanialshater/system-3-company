# Build notes: barcelona-sun-minutes

v1 (2026-10-13, Wave 5 geography, sonnet build, EXP-003). Brief 47.

- Equirectangular map of Spain with a movable noon line. Distance (505 km), longitude gap (5.87 deg) and minutes (23.5) all come from the two city coordinates in Demo.tsx; node re-run agrees (505.1 km, 23.49 min).
- Brief's "drag the line" became two buttons (Barcelona, Madrid) and a 0-30 minute slider, since QA only presses buttons. The line is hidden and the clocks read "?" until the learner acts (nothing on the stage shows the answer beforehand).
- Gate: noon line over Barcelona and over Madrid (the Madrid state must be within 0.3 min of 23.5, so the slider can reach it too).
- Equation of time is not modelled; both cities shift together (claim c3). Equirectangular label on the stage; its east-west stretch is in claim c6.
