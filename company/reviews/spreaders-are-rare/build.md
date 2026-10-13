# Build note: spreaders-are-rare (demo-builder, 2026-10-13)

- Design: 100 case circles, area = people infected. The 100 cases are the distribution's expected shape (mean of each 1% slice, rounded), not a random outbreak, so 74 zeros at k = 0.1 and 14 under Poisson are exact; grid positions only use an untuned seed.
- Reveal gate: visit k = 0.1 and even spread (start is k = 1).
- Totals shown are what the stage holds (200, 199, 201), not a typed 200.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- "Negative binomial, dispersion k = 0.1" in the question and k on the buttons -> plain words: "very uneven: a few people infect many, most infect few"; buttons read Even / Uneven / Very uneven. "Case" glossed on the locked stage ("infected people"). Hook asks how many cases infect no one (no longer "typical case").
- "No case above 7" was unseen -> the largest circle in every setting is now labelled (so 7 shows on Even); the reveal says "in this picture".
- 199 / 200 / 201 totals unexplained -> the muted line says the counts are rounded (totals 199 to 201).
- The chain-dies-out sentence was told, not shown -> removed from the reveal; reveal now says only that a few big spreaders can drive an outbreak (what the top-10 figure shows). In-between setting (33) is quoted because it is the stage's opening state. Reveal about 70 words.
- Claims c3, c4, c5 reworded to match, unverified.
