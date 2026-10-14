# Build note: background-shortcut

- Intent: 20 photo tiles (grass or sand, cow or camel silhouettes, hump visible or not) with tick or cross marks for the model's guess. The model starts on its learned clue (background, 95% versus 80%).
- "Shuffle backgrounds" swaps in the test set; the reveal unlocks only when the learned clue is seen on shuffled photos (50%).
- The accuracy readout and marks are hidden while locked.
- After screenshots: silhouettes read as two animals; no text labels added, to stay inside the word budget. A reviewer may want a cow/camel key.

## Revision v2 (wave C, 2026-10-14)

- Review (v1): training 95% and shape-on-training never shown, hook leaked, toy rule worded as a law. Fix: four buttons (clue x photo set), each shows its score once run, all four gate the reveal; neutral hook; reveal says models 'tend to' take an easy clue.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
