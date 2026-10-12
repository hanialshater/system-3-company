# Build note: dish-runs-out (demo-builder, 2026-10-12)

- Design: one dish; colony AREA is proportional to cell count (2^30 fills the dish), so the colony is a speck for 7 hours and then fills the dish. A food toggle switches to a made-up logistic batch (K = 100 million).
- Reveal gate: interact() fires only on reaching 10 h with food topped up, and on reaching at least 9 h with one batch (minInteractions 2). Cell count stays at 1 until the prediction is locked in.
- Changed after screenshots: the cell readout was cut off below the stage, so I merged it into the step-button row and dropped the separate doublings readout.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.
