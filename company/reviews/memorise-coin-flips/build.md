# Build note: memorise-coin-flips

- Brief 50 (memorise-random-labels). Title "Can a curve learn coin flips?".
- Labels: set n from mulberry32(n), sets 1, 2, ... in order, untuned (the brief's hand-picked 1, −1, −1, 1, 1, −1 is not used). Zero miss at degree 5 holds for every set (1,000 checked), so no seed carries the claim.
- Stage: six dots (filled = +1, hollow = −1), the fitted curve and red miss lines from each dot to the curve. Caption: degree d = d + 1 numbers to tune. Locked: dots only, readouts "–".
- Controls in DOM order: Degree 1 (active at start, disabled), Degree 3, Degree 5, Re-flip labels. Readouts: largest miss, biggest coefficient.
- Key states (milestones): "degree-5-fit" and "reflip-at-5" (new labels while at degree 5). QA path: degree 3 (miss 0.76), degree 5 (0.00, coefficient 833), re-flip (set 2: 0.00, 625).
- Node check: set 1 d1 1.505, d3 0.762, d5 0.000 / 833; set 2 d5 625; degree 3 misses some dot in 967 of 1000 sets.
- Curve is clipped to |y| ≤ 2.2 for drawing; sets 1-4 never exceed 1.56 between dots.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): caption read as 'd = d + 1', coefficient undefined, 'coin flips on new points' told. Fix: caption 'A degree-d curve has d + 1 numbers to tune'; biggest-coefficient readout dropped; a held-out 'new point' at x = 0.5 with its own coin-flip label, a live tally of how often the degree-5 curve called it right, and 'Try 20 more label sets' (gates the reveal).
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
