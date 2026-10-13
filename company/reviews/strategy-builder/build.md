# Build note: strategy-builder (demo-builder, 2026-10-13)

- Design: 100 players (TFT circles, cheat squares) under deterministic imitation dynamics f' = f + f(1-f)(W_TFT - W_cheat)/15. 5% start dies out, 7% takes over by gen 40; the tipping point 1/17 does not depend on the speed constant.
- Reveal gate: reach gen 50+ from 5% and from 7%; the start toggle keeps the generation.
- The brief's rule-chip strategy builder was not built: strategies are fixed (TFT vs always-cheat). Slug kept to match the brief. Legend glyphs coloured after screenshots.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
