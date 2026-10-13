# Build note: copy-of-a-copy

- Intent: one bar chart of ten word counts; zebra (the 2% word) in red; a word that hits 0 shows "gone". Next generation, +10 generations (capped at 40), toggle 50/500 draws per generation (restarts), New run (next seed). Readouts: words left, run number.
- Key state: at least 3 generations with a word at zero (milestone "lost-for-good"), reached on the QA path by Next then +10 (run 1, untuned, has lost 5 words by generation 3).
- Seeds: run r, generation g → mulberry32(r*1000 + g), runs in order, untuned. Reveal shows the spread: exact 36.4% vs 37.3% in 2,000 seeded runs, computed live by lossRate().
- Node check: exactLoss(50) = 0.3642, exactLoss(500) = 4.1e-5; runs 1-10 each lost 4-6 words by generation 11.
