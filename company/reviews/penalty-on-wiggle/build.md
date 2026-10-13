# Build note: penalty-on-wiggle

- Intent: one plot with 8 training dots (filled), 40 held-out dots (hollow) and the ridge curve; a λ slider over 0, 1e-4 … 10; training and held-out miss (RMS) readouts, hidden while locked; "New data" steps the seed.
- Key state: any λ > 0 (milestone "penalty-on"), where the training miss leaves 0.
- The brief asked the builder to reproduce the held-out dip before claiming it: in seeds 1–500 a λ in 1e-4..1 beats λ = 0 on held-out in 490; λ = 10 is worse than the best moderate λ in all 500. The reveal recomputes the 490 with the stage's own functions. Seed 1 is untuned.
- After screenshots: no layout changes needed.
