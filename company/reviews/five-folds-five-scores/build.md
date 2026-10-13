# Build note: five-folds-five-scores

- Brief 43 (cross-validation). Title "Same rule, five test groups".
- Deviation from the brief: the brief used an LCG with random 20% flips and an answer ("75 to 100") that holds only for its seed. This build flips exactly 4 of 20 labels (mulberry32 seed 1, untuned) and asks "highest minus lowest: within 5 / about 10 / 25 or more". 4 flips cannot be shared equally by 5 folds, so the answer holds for every seed (1,000 seeds: spread 25 in 253, 50 in 671, 75 in 76). The mean is 80% for every seed.
- Stage: one number line, 20 dots; row = the point's label; rule boundary at 0.5 with shaded "rule says 1" side. Pressing a fold enlarges its 4 dots with ✓/✗ and writes its score on the button. Locked: dots only, no folds, readouts "–".
- Controls in DOM order: Fold 1 ... Fold 5. Readouts: highest − lowest (of scored folds), mean (after all five).
- Key state (milestones): all five folds scored (fold-1..fold-5, minInteractions 5). QA path presses each once: 100, 75, 100, 50, 75 → spread 50, mean 80.
- Reveal quotes the five scores, spread, mean and 16/20 (all on stage), plus the 1,000-seed spread (disclosure, claim c3).
