# Build note: hidden-carriers (demo-builder, 2026-10-13)

- Design: a 10,000-dot town (one SVG pattern plus overlays); people who show the trait are ringed red, carriers orange. Counts are Hardy-Weinberg expected values, not draws; only positions are shuffled (untuned mulberry32(7)).
- Reveal gate: visit 1 in 10,000, and one other rate. Carriers and readouts are hidden while locked.
- Model label (random mating, no selection) is on the stage before the prediction.
- Numbers recomputed in node (artifacts/scratch/w2life/check.mjs, check2.mjs, sir.mjs, pd.mjs; scratch, not committed). All claims unverified.

## v2 (revision 2026-10-13)

- "Squared" was told, never shown -> the stage shows the copy share (readout and message: "Copy share 1 in 100: 100 x 100 = 10,000") for every setting; the reveal quotes it.
- "Carriers each" opaque -> "Carriers per person showing it". "Hardy-Weinberg" dropped from the learner text; legend says "carrier (1 copy, looks normal)"; the question now defines the recessive trait in a clause.
- 1 in 51 vs 50.5 -> "about 1 in 50" everywhere (matches the claim ledger). Hook no longer says "how many".
- Start setting is 1 in 400 and the "common" milestone requires 1 in 100 exactly, so the reveal's "18 per person" is always a state the learner visited (milestones rare + common, both reached on the QA path).
- Claims: c2 reworded, new c5 (the product), both unverified.
