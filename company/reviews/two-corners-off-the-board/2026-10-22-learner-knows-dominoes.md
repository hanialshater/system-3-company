*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-corners-off-the-board
lesson version: v1
boundary: a learner who knows a domino covers two neighbouring squares and what a chequered board looks like; has never seen a colouring or counting argument used to prove something impossible; believes an even number of squares can always be tiled "if you try hard enough".
Screenshots seen: yes (artifacts/walkthroughs/two-corners-off-the-board/sheet.png, recorded 2026-10-22T12:09:52.344Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere blocking. I recounted the boards. Opposite corners off: the two missing squares are top-left and bottom-right, both dark-position squares; the dotted (dark) squares left are 6, the plain (light) 8, matching "dark 6 · light 8". The best try places 6 dominoes, each over one dotted and one plain square, and outlines the 2 uncovered squares in red dashes; both are plain (light). One-row board: both top-row corners gone, 7 dotted and 7 plain, 7 horizontal dominoes cover it; "Another try" gives a different full tiling (top domino plus two horizontal, then four vertical). Dots mark dark squares, so colour is not the only cue.
2. What the prediction felt like: real. "14 squares, 7 dominoes" makes "Yes" feel like plain arithmetic, which is exactly the misconception. The locked board hides the counts ("dark ? · light ?"), so the answer is not given away, though a careful learner could count the dots.
3. Note (the strongest one): the panel says "Try both boards, then ask for another try". Following it in order, "Another try" lands on the one-row board, which tiles anyway. A learner who holds the misconception ("you just didn't try hard enough") never sees the impossible board resist a second attempt on this path, yet the reveal says "2 light squares were always left". The colour count in the reveal is the actual proof and stands on its own, so this does not block understanding, but the panel could say "ask for another try on the opposite-corners board" (or the order could put it there) to make "always" something the learner watched.
4. The reveal keeps both boards side by side with their counts, so "6 dark and 8 light" vs "7 and 7" can be checked against the picture while reading. Good.
5. Whether the reveal answered the question the learner actually had: yes. My question after the first board was "is that just a bad try?" The reveal answers with the one-dark-one-light rule and the count, and says plainly that counting replaces trying every arrangement. The 8×8 extension (30 dark, 32 light) is a short, checkable step from that rule.

Verdict reason: no finding blocks a first-time learner; the note is that the natural path shows "Another try" on the tileable board, not on the impossible one the misconception is about.

## After reading build.md / meta.json

- Read only meta.json's `version` field (1) to stamp this review. build.md and design.md not read.
