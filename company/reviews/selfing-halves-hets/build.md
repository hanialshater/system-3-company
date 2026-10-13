# Build note: selfing-halves-hets (demo-builder, 2026-10-13)

- Retitled "Plants that pollinate themselves" (the slug says "halves").
- Design: a field of 32 plants. Filled = AA, half-filled = Aa (hybrid), hollow = aa. Chips: Gen 1-4 and Start. The field shows the expected split (deterministic): hybrids 32, 16, 8, 4, 2. Each generation a quarter of the hybrids become AA and a quarter aa, spread through the field, so the lineages stay consistent. The field stops at gen 4 because the expected split is not a whole number of plants at gen 5.
- "Average split, not a random run" is said on the locked stage and in c4.
- Option "12.5%" is computed from HYB[3] / 32 (the brief's "About 12%" was rounded).
- Gate: milestone "gen-3". The QA path visits gens 1-4 and Start; the reveal lists the hybrid counts for the generations the learner opened.
- Claims unverified.
