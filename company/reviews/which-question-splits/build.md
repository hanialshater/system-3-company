# Build note: which-question-splits

- Brief 44 (decision-tree-splits). Title "Where does a tree make its first cut?".
- Stage: eight labelled dots (x = 1..8) with a cut line; bars under each group; two lines give each group's counts and Gini; a row below records the weighted Gini of every cut tried (lowest tried in green). Caption defines Gini. Locked: dots and labels only.
- Controls in DOM order: cut slider (1|2 ... 7|8, starts at 1|2), Cut 2|3, Cut 4|5, Cut 6|7 (the three options). Readout: weighted Gini.
- Key states (milestones): each option cut visited (cut-2, cut-4, cut-6; minInteractions 3). QA path: slider 1|2 → 2|3 → 3|4, then Cut 2|3, 4|5, 6|7, so every value the question and reveal name is seen.
- Node check: 0.357, 0.208, 0.367, 0.1875, 0.300, 0.375, 0.429. The 2|3 vs 4|5 margin is small (0.21 vs 0.19); the reveal explains why the pure-left cut loses.
- Deterministic.
