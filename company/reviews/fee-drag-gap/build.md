# Build note: fee-drag-gap

builder: demo-builder · 2026-10-12

- Intent: one chart, no-fee line dashed, net line solid, the red gap is the fee's cost; the learner feels each 0.25% step.
- Reveal is gated: interact() fires only once the fee reaches 1% (slider or the '1% fee' button), so the 24.5% is seen, not told.
- Locked stage shows only the no-fee curve; cost and share readouts are '?' until the prediction.
- After screenshots: the in-chart 'you $57,435' label sat on the shaded gap, so I moved it into a 'You end with' readout.
- Model note: brief's net-6% convention (fee subtracted from return); claim c7 records that 1.07 × 0.99 would give 26%.
