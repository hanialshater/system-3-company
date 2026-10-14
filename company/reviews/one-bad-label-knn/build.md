# Build note: one-bad-label-knn

- Intent: one scatter (6 blue, 1 mislabelled orange ringed in red inside them, 6 orange), a diamond for the new dot, lines to the voters and a dashed circle out to the k-th neighbour. k buttons 1, 3, 5, 7, 13, then "Move new dot" (cycles 3 fixed positions). No randomness.
- Brief said "tap anywhere"; replaced with a move button because QA presses only data-qa controls and an SVG tap target cannot be disabled while locked.
- Key state: k = 5 at the question's dot (milestone "k5-at-bad-label"), reached by the second button on the QA path. Votes and the new dot's colour are hidden while locked.
- Node check of vote(): k = 1 orange (0 blue / 1 orange), k = 3 2/1 blue, k = 5 4/1 blue, k = 7 6/1 blue, k = 13 6/7 orange. The question's "4 blue, 1 orange" is computed from vote().


## Revision v2

From the latest learner review and fact-check (batch 03).

- Question now states the voting rule and no longer prints the 4-blue/1-orange count (it was the answer); third option is "A tie".
- Reveal says the 7 orange at k = 13 are six real dots plus the mistake.
- New claim c4 (majority-vote rule), unverified.
