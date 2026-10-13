# Build note: magnet-still-in-coil

builder: demo-builder · 2026-10-13 · for evaluators to read after their findings

- Design intent: side view of a bar magnet on the axis of a coil wired to a centre-zero meter, plus a chart of the meter's reading over the last 3 s (the meter's own record, so a kick that has passed stays visible). The emf comes from the model, not a canned curve: emf = -N dPhi/dt with an illustrative on-axis flux Phi(z) = 0.1 mWb / (1 + (z / 2 cm)^2)^1.5 and 0.3 s smoothstep moves; peak about 123 mV, opposite signs in and out (checked by numerical differentiation in artifacts/scratch/w4phys/check.mjs).
- Departure from the brief: the brief's drag became three step buttons (Push in, Hold still 1 s, Pull out), because QA presses and cannot drag. Each move animates in 0.3 s, inside QA's 450 ms wait; buttons are disabled while moving. "Hold still 1 s" adds a second of the meter's (zero) reading to the chart and counts the held time, so it always changes the stage.
- Earned reveal: milestones 'pushed', 'held-inside' (hold pressed with the magnet inside) and 'pulled'. QA's DOM order reaches all three. The reveal quotes the learner's own two peaks and held time.
- The chart is hidden until the prediction. All coil and magnet values are labelled illustrative; the zero while still is not (claim c5).
- After screenshots: the reveal said "-123 mV" and "123 mV"; now signed (+123 mV) so "the other way" reads clearly.
