# Build note: ball-at-the-top

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one vertical path (true height scale, ghost dots every 0.2 s), the ball with a velocity arrow (right, length proportional to speed, hidden when |v| < 0.2 m/s so it visibly vanishes at the top) and an acceleration arrow (left, constant 9.81 m/s² down). Both arrows and readouts hidden until the prediction, since the acceleration arrow is the answer.
- Brief's v-t dot dropped to keep one representation.
- Time scrubber 0-2.9 s in 0.1 s steps plus -0.1 / +0.1 s buttons. Starts at 1.4 s (v = +0.97 m/s) so two arrow presses cross the top (1.5 s, 1.6 s).
- Earned reveal: milestone 'crossed-top' (velocity sign changes between two scrub positions). The reveal quotes the two times the learner crossed between.
- After screenshots: at 1.6 s the velocity arrow (1 m/s) was only an arrowhead; velocity scale raised to 6 px per m/s (acceleration stays 3.6 px per m/s²; different units, so separate scales), 'top' label moved clear of the arrow, stage extended to fit the late-fall arrow.
