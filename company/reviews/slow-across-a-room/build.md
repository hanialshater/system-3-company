# Build note: slow-across-a-room (demo-builder, 2026-10-12)

- Brief #11, taken because #4 failed the check. Design: a space (across) by time (down) plot of 30 seeded 1-D random walks with the parabolic typical-spread edge; the learner picks a distance and a red line marks when the spread reaches it.
- Changed from the brief: the answer is 'about 17 minutes' (1,000 s), not 'about 15'. Paths and time ticks are hidden until the prediction is locked in, because they would show the answer.
- Reveal gate: view a distance of 100 um or less, then 1 mm. Changed after screenshots: time labels overlapped the paths and 'time' was clipped, so the plot was shifted right and the duplicate readout removed.
- After screenshots (all): stage SVG capped at 27dvh and the lesson body set to not shrink, because readouts were clipped or text overlapped on the phone; long readout labels shortened so they stay on one line.
