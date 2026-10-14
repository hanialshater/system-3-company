# Build note: window-forgets-start

- Intent: one strip of 20 token cells (two rows of 10), the fact as a ★ cell, cells outside the window dimmed. Window buttons 4, 8, 12, 20 (starts at 20), ★ ◀ ▶ to move the fact, and "Drop at 20 random spots" (green dots under cells; counts in-window drops).
- Brief asked for a draggable marker; ◀ ▶ buttons used so QA (one press each) and phones both work.
- Key state: window 8 with the fact outside it (milestone "fact-fell-out"), reached on the QA path by Window 4 → Window 8 with the fact at its start position 5. Readouts hidden while locked.
- Seeds 1, 2, 3, ... in order (untuned); reveal quotes the 500-seed spread (1-15 of 20 in window, mean 8). Node check: share(8) = 0.4, first visible 13.

## Revision v2
Learner review (2026-10-14) findings:
- The drop run used whatever window was selected while the reveal quoted window-8 spreads over 500 tries the learner never saw. Reveal no longer quotes the 500-try spread; it quotes the learner's own drop (count and window at the time of the press) and the long-run share. c2 rewritten to match, so it is unverified again.
- 40% was only told. A new readout "Positions inside window: w of 20 = x%" shows 8 of 20 = 40% on the stage (c1 reworded, unverified).
- Green dots now explained in the stage tag ("dots = drops").
