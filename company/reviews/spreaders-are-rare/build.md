# Build note: spreaders-are-rare (demo-builder, 2026-10-13)

- Design: 100 case circles, area = people infected. The 100 cases are the distribution's expected shape (mean of each 1% slice, rounded), not a random outbreak, so 74 zeros at k = 0.1 and 14 under Poisson are exact; grid positions only use an untuned seed.
- Reveal gate: visit k = 0.1 and even spread (start is k = 1).
- Totals shown are what the stage holds (200, 199, 201), not a typed 200.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
