# Build notes: drift-of-a-straight-throw

## v1 (2026-10-13, wave 3)
- Physics change from the brief: the brief's d = Ω sin φ v t² (515.6 km) is the small-deflection approximation. At 1,000 km and 100 m/s, ft = 1.03 rad, so it is not small. The toy (a flat frictionless f-plane, labelled on the stage) uses the exact inertial-circle solution: 471.5 km east after a 1,000 km path, 52 m after 10 km, 5.2 km after 100 km. The answer is still "about 500 km"; the reveal says "about 470 km on this toy". Recorded in claim c1. A fact-checker should judge whether the f-plane is an acceptable toy for the real sphere; the latitude changes about 7.5° over the run.
- Controls: three "Send it" chips (1,000 / 100 / 10 km, in that DOM order) and a latitude slider (0-90° in 15° steps, start 45°). The brief's speed slider was dropped; speed is fixed at the question's 100 m/s, shown on the stage.
- Key state: "far" and "near" runs, both at 45°N. They count only at 45°N, so the reveal's numbers are the ones the learner saw. QA presses the chips first, at 45°N.
- Each run is drawn at its own scale, with a scale bar. A 10 km run looks straight and a 1,000 km run visibly curls, which is the payoff.
- No claim about sinks: the reveal says the toy cannot show it (brief claim 3).
- Iteration after the phone screenshot: on short runs the drift label collided with "aim" and "N ↑". I moved the drift label to the right of the end point and N to the top-right corner.
- Bug fixed before QA: moving the latitude slider before any run would have started a run. It now keeps "no run".
