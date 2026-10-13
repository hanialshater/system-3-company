# Build note: antibiotic-already-there (demo-builder, 2026-10-13)

- Design: a dish whose lawn is a texture; resistant cells are the expected count N/10^8 at untuned-seed positions. Add drug shows the survivors; 'Back to before the drug' then rings them, showing they were there all along; regrow fills the dish.
- Reveal gate: add the drug at 10 billion, then go back to before the drug at 10 billion.
- Smaller dishes (10 million: 0.1 expected) show the drug winning. Counts are expected values; Luria-Delbruck jackpots are ignored and said so in a claim.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- Step 2 said "every cell is resistant" beside a counter reading 100 -> regrown view now says the survivors' descendants fill the dish and the readout reads "all".
- Smaller dishes showed "?" so the 0.1 in the reveal was unearned -> after the drug is added at 10 billion the readout shows the expected count for each size (100, 10, 1, 0.1) with the multiplication in the message; new milestone "small-dish" (10 million chosen after the drug) gates the reveal (3 milestones, all reachable on the QA path in DOM order).
- "Resistance mutation" undefined -> defined in the question. Reveal cut to about 70 words and computed from BIG_RES / SMALL_EXP.
- Claims: c3 source rewritten (Drake was a loose fit), new c6 (regrown dish all resistant) and c7 (definition); all three unverified.
