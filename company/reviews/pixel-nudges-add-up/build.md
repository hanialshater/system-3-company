# Build note: pixel-nudges-add-up

- Intent: a 10×10 grey image (seed 7 sets the shades only; the sum is fixed at 50.5), a cat / not-cat chip and a sum meter with the 50 line. One preset ("Darken all 100 by 1%") plus two sliders (nudge 0–1% in 0.1% steps, pixels nudged 0–100).
- Key state: the label flips (milestone "flipped"). The preset comes first so the QA path reaches it; slider steps of 0.1% cannot reach it in two presses.
- Integer thousandths throughout, so 0.5% × 100 hits exactly 50.0 ("not above 50"), matching the brief's minimum 0.005.
- After screenshots: the "N pixels darkened" caption collided with the meter's 50 label; moved under the chip.
