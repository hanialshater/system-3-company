# Build note: hanoi-tower-doubles (demo-builder, 2026-10-12)

- Design intent: teach the recursion, not the moves. Besides single-disk moves, a shortcut moves the top n-1 disks as one block and charges what that smaller puzzle costs (+3, +7, +15, +31). 'Add a disk' after each solve lets the learner climb 3 -> 6 disks and watch 7, 15, 31, 63 on the counter.
- Reveal gate (minInteractions 2): interact() on first shortcut use, first move of the biggest disk, and each solve, so the learner has at least carried the small tower and moved the big disk under it.
- The shortcut's cost is hidden while locked so it does not hint the doubling before the prediction.
- After screenshots: the shortcut row wrapped with '→ C' alone on a second line; the label now has its own line above the three target buttons.
- Open risk: a learner may reveal after 3 or 4 disks without reaching 6; the reveal then states 31 and 63 rather than showing them.

## Revision v2 (wave C, learner review)

- Doubling control optional: 'Add a disk' is always enabled and is the third required step (minInteractions 3); on adding, the stage shows 'the 3-disk puzzle (7), the big disk (1), again (7) = 15 at best' (c4).
- '+3' was declared: the shortcut now says '2 disks take 3 moves at best'.
- Told-only 2^n, 1,023 and 18 quintillion removed with claim c3; the reveal lists only up to the disks the learner reached.
- Hook no longer says 'worse'.

All changed claims are unverified, awaiting a fact-checker.

## Revision v3

r2: when the move count reaches the best number without the tower on C, the stage says so ('7 moves, but the tower is not on C yet...'). I did not gate 'Add a disk' on solving: the QA presses each control once and cannot solve the puzzle that way.
