# Build note: meaning-without-the-word

- Intent: one ranked list of the five chunks (SVG rows that reorder), a score at the right of each row, rows above the dashed red cut tinted green (sent to the model), the Paris chunk outlined. "Search by words", "Search by meaning", then Top 1 / 2 / 3 (disabled until a search has run). Readout: whether the Paris chunk is sent.
- Key state: the word search run, Paris sinking to the bottom with 0 (milestone "word-search-run"), first control on the QA path. Before searching the list is in knowledge-base order with no scores.
- Word scores computed by wordScore() (lowercase, punctuation stripped, stop words what/is/the/of/a/an/and); node: keywords capital, france; scores 0,1,1,1,1; word order 1,2,3,4,0. Meaning scores are hand-set (claim c2), not an embedding.
- Stage text: the five chunk sentences are the data being ranked; they push stage words past 25. I judged them content rather than instruction; flag if evaluators disagree.
