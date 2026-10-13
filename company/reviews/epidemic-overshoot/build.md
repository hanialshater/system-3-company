# Build note: epidemic-overshoot (demo-builder, 2026-10-13)

- Design: deterministic SIR (R0/5 per day, 5 days infectious, 0.1% seed). 400 dots fill in infection order; the dashed stepped outline is the 1 - 1/R0 threshold. Peak day 19 and 94% at day 100 come from the same run the stage draws.
- Reveal gate: reach the peak (within a day) and day 80 or later, both at R0 = 3; peak and end chips come first.
- After screenshots: the stage SVG pushed the controls down and clipped a readout on the phone; SVG capped at 24dvh and the duplicate readout removed (the message carries the share).
- Reveal says 65% at the rounded peak day 19, 'just about' the 67% threshold; the exact peak (day 19.2) is where S = 1/3.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
