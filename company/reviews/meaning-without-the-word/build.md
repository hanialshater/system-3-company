# Build note: meaning-without-the-word

- Intent: one ranked list of the five chunks (SVG rows that reorder), a score at the right of each row, rows above the dashed red cut tinted green (sent to the model), the Paris chunk outlined. "Search by words", "Search by meaning", then Top 1 / 2 / 3 (disabled until a search has run). Readout: whether the Paris chunk is sent.
- Key state: the word search run, Paris sinking to the bottom with 0 (milestone "word-search-run"), first control on the QA path. Before searching the list is in knowledge-base order with no scores.
- Word scores computed by wordScore() (lowercase, punctuation stripped, stop words what/is/the/of/a/an/and); node: keywords capital, france; scores 0,1,1,1,1; word order 1,2,3,4,0. Meaning scores are hand-set (claim c2), not an embedding.
- Stage text: the five chunk sentences are the data being ranked; they push stage words past 25. I judged them content rather than instruction; flag if evaluators disagree.

## v2 (claim fix 2026-10-13)

Claim c5 disputed (flat 'only' read as about real systems). Reveal now says 'in this setup the model answers only from what retrieval hands it'; claim rewritten; unverified. c3 source changed to Britannica / Government of France (status untouched).

## Revision v3 (wave C, 2026-10-14)

- Review (v2): 'k = 1' unexplained, tie-break unexplained, locked list hard to read. Fix: option reads 'Only if just 1 chunk is sent'; ties-keep-list-order stated in the question, on the stage and in the reveal; meaning search is also gated. Locked-stage text size is a layout matter left to the kit.
- Edited claims were reset to unverified and match the stage text; version bumped, format added where missing. Local QA (contract spec, phone and desktop) passes; walkthrough sheet looked at.
