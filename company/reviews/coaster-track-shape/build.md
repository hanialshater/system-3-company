# Build note: coaster-track-shape

builder: demo-builder · 2026-10-12 · for evaluators to read after their findings

- Design intent: ramp length (steep to gentle) and curve sliders; every change races the new track against the last one (dashed). Motion is computed piece by piece from Newton's second law on 240 straight pieces, so 9.90 m/s emerges rather than being plugged in (cross-checked with RK4).
- Earned reveal: needs two track changes, and each track's bottom speed and time are shown as soon as it is chosen.
- After screenshots: first build hid results until the cart arrived, and QA reached the reveal with every readout still '?' while the reveal quoted 9.90 m/s. Results now show on change; the reveal quotes the learner's own last two times; speed labels moved below the floor so they do not sit on the track.
