# Build note: copy-of-a-copy

- Intent: one bar chart of ten word counts; zebra (the 2% word) in red; a word that hits 0 shows "gone". Next generation, +10 generations (capped at 40), toggle 50/500 draws per generation (restarts), New run (next seed). Readouts: words left, run number.
- Key state: at least 3 generations with a word at zero (milestone "lost-for-good"), reached on the QA path by Next then +10 (run 1, untuned, has lost 5 words by generation 3).
- Seeds: run r, generation g → mulberry32(r*1000 + g), runs in order, untuned. Reveal shows the spread: exact 36.4% vs 37.3% in 2,000 seeded runs, computed live by lossRate().
- Node check: exactLoss(50) = 0.3642, exactLoss(500) = 4.1e-5; runs 1-10 each lost 4-6 words by generation 11.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): 500-draw run never shown, 2,000-run figure unverifiable, toy property worded as general fact. Fix: one tap runs 10 generations at 500 words (gates the reveal, reveal quotes its result); 2,000-run sentence and its claim removed; 'in this toy' wording.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
