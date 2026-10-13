# Build note: chain-of-blame

- Brief 48 (backprop-chain). Title "Can the first weight share the blame?".
- Options changed from the brief's "2 / 4 / 24": the distractor 2 had no basis on the stage; it is replaced by "0: w1 does not touch the loss directly", which is the brief's misconception. Answer is still 4.
- Stage: one chain of six boxes (input x, × w1, h, × w2, y, loss). A nudge rewrites the boxes it changes and highlights them. Caption defines slope. Locked: base values only (given in the question), readouts "–".
- Controls in DOM order: Nudge w1 +0.001, Nudge w2 +0.001, Undo. Readouts: loss change, slope (change ÷ nudge).
- Key states (milestones): "nudged-w1" (slope 4.0) and "nudged-w2" (slope 24.0). QA path: w1, w2, Undo.
- Node check: base h 6, y 3, loss 4; w1 + 0.001 → loss 4.004001 (slope 4.001); w2 + 0.001 → 4.024036 (24.036); chain rule 4 and 24.
- Deterministic.
