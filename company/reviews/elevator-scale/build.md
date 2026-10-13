# Build note: elevator-scale

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: one picture, the lift with the rider on a scale plus the scale's dial (0-1000 N, red "at rest" mark at 687 N). Two force arrows on the rider on one scale (0.075 px per N): gravity (always 687 N, visible from the start) and the floor's push (hidden until the prediction, since its length is the answer). An acceleration arrow beside the car shows direction and size.
- Controls: Accelerate up / Steady / Accelerate down (the active one is shown active and disabled) and an acceleration-size slider (0.5-4 m/s², starts at the question's 2). The slider is disabled while Steady, where it would change nothing.
- Earned reveal: milestones 'up' and 'down'. QA presses the three mode buttons first, so both are reached. The reveal quotes the up and down accelerations the learner actually used (QA: up at 2, down at 2 then 3 via the slider) and their readings.
- Departure from the brief: no separate free-body diagram (the two arrows sit on the rider instead), to keep one representation.
- After screenshots: the 'a = 3 m/s²' and 'floor push' labels ran over the car's wall and the caption ran off the right edge; car widened, dial moved right and shrunk, caption right-aligned.
