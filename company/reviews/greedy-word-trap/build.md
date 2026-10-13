# Build note: greedy-word-trap

- Intent: one word tree ("The" → cat 60% / dog 40% → second words) with each branch's chance; walking a full path highlights it and writes its product at the leaf (products hidden until visited). Controls in order: Greedy path, cat, dog, then one "then <word>" button per second word of the chosen first word. Readouts: sentence so far, chance (product). Locked: tree with branch odds (given in the question), no products.
- Key states (milestones): "greedy-leaf" (cat → sat seen, 24%) and "other-best" (dog → barked seen, 36%). QA path: Greedy path → cat → dog → then barked → then sat.
- Words added to the brief's A/B tree for readability (cat/dog; sat/ran/ate; barked/sat), odds as in brief 40.
- Node check: 0.6 × 0.4 = 0.24; 0.4 × 0.9 = 0.36; other leaves 0.21, 0.15, 0.04.
- QA counts stage controls once, before pressing; the second-word row therefore always renders 3 slots (disabled "then …" when there is no word), so the QA path can reach "then barked".
