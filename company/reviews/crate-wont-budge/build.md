# Build note: crate-wont-budge

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view, push arrow and friction arrow on one scale (0.9 px per N), with a red tick on the friction line marking the 98.1 N grip limit. While the push is at or below the limit the friction arrow is exactly as long as the push; above it the crate is drawn displaced with motion lines and the label reads "slips!". Sliding friction is not modelled, so no number is shown once it slips (claim c3).
- Departure from the brief: the brief's hold-to-ramp push button became a 0-120 N slider in 10 N steps (QA presses once and waits 450 ms; a hold gesture is not on its path). The friction arrow and readout are hidden until the prediction rather than until the end, because seeing friction track the push is the key state.
- Earned reveal: milestone 'matched-twice' (the crate held still at two different nonzero pushes). QA's two presses give 30 and 40 N. The reveal lists the pushes the learner held and says whether they also made it slip.
- mu_s = 0.50 is illustrative and labelled on stage.
- After screenshots: read cleanly on phone; left as built.
