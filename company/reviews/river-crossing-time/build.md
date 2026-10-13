# Build note: river-crossing-time

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: top view on one true scale (1.5 px per m both ways). The boat's path is drawn from the model x = u t, y = 3 t, with dots at 10, 20, 30 s sitting on dashed across-lines shared with a no-current ghost path, so "same across-progress every 10 s" is seen, not told. Landing label and the Clock / Across / Downstream readouts are hidden until the prediction.
- Controls: current slider (0-6 m/s, starts at 2), "Start over" and "+10 s" step the boat along its path (no play button; no animation, so every press changes the stage inside QA's wait).
- Earned reveal: milestone 'faster-current' (current set above the boat's 3 m/s). QA's two slider presses reach 4 m/s, the question's setting. Reveal quotes the fastest current the learner set and its landing distance.
- Numbers re-run by integration in artifacts/scratch/w4phys/check.mjs (gitignored scratch).
- After screenshots: layout read cleanly on phone; left as built.
