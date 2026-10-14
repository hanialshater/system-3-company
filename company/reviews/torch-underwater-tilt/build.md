# Build note: torch-underwater-tilt

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view, a torch under a still, flat surface aimed at one point; the tilt from straight up (dashed) is drawn as an arc. The exit ray is drawn at the Snell angle with brightness 1 - R and the reflected ray with brightness R (Fresnel, unpolarised), so the exit ray fades and flattens while the reflection brightens, then the exit ray is gone.
- The tilt slider steps through fixed stops (0, 15, 30, 40, 45, 48.6, 60, 70, 80 degrees). 48.6 is computed as asin(1/1.333), so the critical angle and the question's 60 degrees are both exact states.
- Departure from the brief: the brief hid the angle readout; the tilt angle is shown (it is the input the question names). The answer readouts (percent into the air / reflected) are hidden until the prediction.
- Earned reveal: milestones 'edge' (48.6 degrees) and 'sixty'. QA path: start 45 -> 48.6 -> 60, so the last screen is the question's state with no exit ray. The reveal quotes 45 (start, seen on unlock: 86% out, leaves at 70.5 degrees), 48.6 and 60.
- Numbers (node): theta_c 48.61 deg; exit angles 30 -> 41.8, 40 -> 59.0, 45 -> 70.5; Fresnel R 0 deg 2.0%, 45 deg 13.9%.
- After screenshots: phone reads cleanly at 60 degrees; left as built.

## Revision v2

Batch 06, 2026-10-14, from the latest learner review and fact-check. Added 'Tilt one step more' as the first control: stepping from 45 to 48.6 to 60 degrees shows the exit ray flatten and vanish with live percentages. Milestones are now 'edge' (48.6) and 'past' (60 or more). Claims unchanged.
Claims edited are unverified and need a fact-check pass. QA and walkthrough not run (machine out of memory); the chief of staff runs them after merge.
