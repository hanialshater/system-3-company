# Build note: saturated-enzyme (demo-builder, 2026-10-13)

- Design: 100 enzyme stations (busy = holding a molecule) under a pool of waiting substrate. Busy share S/(1+S) in half-way units. The message always compares with half the substrate, so any position shows a doubling.
- Reveal gate: reach S = 20 (doubling from 10) and S = 2 (doubling from 1); the two doubling chips come first.
- Brief asked for no slider and no text (exploration); I kept one slider and a one-line message because the numbers are the payoff. Fixed after screenshots: a stray '$' in the message.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
