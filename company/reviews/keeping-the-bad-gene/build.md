# Build note: keeping-the-bad-gene (demo-builder, 2026-10-13)

- Design: a ring of 100 gene copies; w copies are red squares. Deterministic recursion with survival AA 85%, Aw 100%, ww 0%. Changing the start keeps the generation so both starts can be compared at gen 60.
- Reveal gate: reach generation 50 or later from the 1% start and from the 50% start, with survival at 85%.
- Survival numbers are stated on the stage (the brief's '15% better' is ambiguous: 1 vs 0.85 is 17.6% better), so the question gives survival rates instead.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.
