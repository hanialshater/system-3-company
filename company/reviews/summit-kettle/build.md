# Build note: summit-kettle
- Key state: the air-pressure line at the summit (8,850 m, about 0.31 atm from the ICAO standard atmosphere) meets the vapour-pressure curve at about 69 °C. Milestone 'summit'; QA path: 'Climb to the summit' is the first control.
- Every number (0.31 atm, 69 °C, options) is computed from air() and boil(), the functions that draw the chart. Model label on the stage ('Model: standard atmosphere') and in the reveal.
- Brief answer re-computed in node: 69.4 °C (brief 69.5 °C, same within rounding).
- After screenshots: the curve label sat on the curve; moved it up-left.

## v2 (claim fix 2026-10-13)

Checker wording notes: predict question and reveal say 'about 0.3 atm' and 'about 70 C' (model 69.4 C; published 68 to 71 C); the live readout still shows the model's own 0.31 atm and 69 C. Claims c1 and c2 reworded to match, set unverified. Source for the measured pressure points to West 1983/1999 instead of the unlocatable 2006 paper.
