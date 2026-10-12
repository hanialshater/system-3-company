# Build note: minimum-payment-trap

builder: demo-builder · 2026-10-12

- Intent: balance-over-months area with a dashed no-interest line (balance ÷ payment); month-1 split shows interest eats first.
- Starts at $150 (25 months, not 20) so the learner must go to $90; interact() fires only at $90.
- Curve and readouts hidden while locked; brief numbers recomputed by stepping: 50th payment, $1,415 interest.
- After screenshots: the no-interest label was clipped at the right edge at $50; moved it to the dashed line's midpoint.
