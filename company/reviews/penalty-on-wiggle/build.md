# Build note: penalty-on-wiggle

- Intent: one plot with 8 training dots (filled), 40 held-out dots (hollow) and the ridge curve; a λ slider over 0, 1e-4 … 10; training and held-out miss (RMS) readouts, hidden while locked; "New data" steps the seed.
- Key state: any λ > 0 (milestone "penalty-on"), where the training miss leaves 0.
- The brief asked the builder to reproduce the held-out dip before claiming it: in seeds 1–500 a λ in 1e-4..1 beats λ = 0 on held-out in 490; λ = 10 is worse than the best moderate λ in all 500. The reveal recomputes the 490 with the stage's own functions. Seed 1 is untuned.
- After screenshots: no layout changes needed.

## v2 (claim fix 2026-10-13)

Claim c5 disputed ('nearly flat', 'loses again' unqualified). Reveal now says 'much flatter and usually loses again to no penalty'. Also c4 wording: 'some moderate penalty (the best of five, 0.0001 to 1)', per the checker note that single fixed values win less often. Both unverified.

## Revision v3

Learner review 2026-10-14: the no-penalty baseline was never on screen. Now a dashed ghost curve of the no-penalty fit and an always-visible 'No-penalty held-out' readout sit beside the live ones; the question explains the penalty as 'discourages wild bends' and glosses coefficients. Claim text unchanged.

## Revision 2026-10-14 (wave D r5, demo-builder)

v4. Review: title/hook leaked "training miss goes up"; "Smaller" impossible; too-much-penalty side told. Changes: neutral title/hook; options Larger / Stays 0 / Larger on some data; new "Penalty 10" control; gate needs a moderate penalty AND a visit to 10; reveal quotes the best moderate penalty and the penalty-10 held-out miss the learner actually saw. Claims reopened: c5; new c6. Not seen in a browser (no build/QA run this wave).
