*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): four-queens-pruning
lesson version: v4
boundary: adult-beginner (same tag as r6). Knows queens attack along rows, columns and diagonals, and has backed out of a maze dead end. Has never heard of backtracking.
Screenshots seen: yes (artifacts/walkthroughs/four-queens-pruning/sheet.png, 11 frames, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who knows how a queen attacks and has never written a search or heard "backtracking".

1. **No answer before the commit.** The locked board is empty. The readouts say "Tries 0 (blind: 256 boards)" and "Solutions 0 of 2". The options are three ranges at the same precision. Telling me there are 2 solutions does not point to a try count.
2. **The pruning is on the stage.** Each placed queen paints × on the squares it attacks. In hand mode, row 1 col 4 and then row 2 col 2 left row 3 all ×, with the red caption "Row 3 has no safe square. Back up." That dead end is the cause, drawn: a clash shows up before row 4 is ever reached.
3. **"Every board that starts that way is skipped" is told, not counted.** At the dead end nothing says how many of the 256 boards I just ruled out (16 here: rows 3 and 4 have 4 choices each). The stage counts only my tries going up, never the blind boards going away. The link between one × and a whole block of skipped boards is the reveal's sentence. A beginner gets "fewer tries" from the stage, but "why so many fewer" only from text. Minor at this boundary.
4. **Units mismatch.** "Tries" are queen placements, and "blind: 256" counts whole boards (4 placements each). The reveal does the same with 2,056 placements vs 16,777,216 boards. A careful learner will ask whether this compares like with like. Nobody says so, but the gap is large enough that the conclusion survives.
5. **Hand mode tapping in row 1 just moves the queen and counts a try each time** (tries 1, 2, 3, 4 across row 1). That is a little odd, but harmless.
6. **The reveal quotes what I saw.** "16 tries, 2 solutions, the first at try 8" stays on the stage as "Your run from empty: …" through Start over and hand play, and the reveal quotes exactly that.
7. The solution thumbnails under the board are very small on a phone (about 30 px). They can be read, just barely.

What the prediction felt like: a real guess between ranges. "Under 30" felt bold, and the stage confirmed it with a number I watched.

Verdict reasoning: a first-time learner sees the × marks and a forced back-up, and gets that checking clashes as you go cuts the search. Findings 3 and 4 are the weak points, but neither blocks.

## Earlier findings (r6), checked after the findings above were written

1. Reveal unreachable on the QA path (9 s animation, Step too slow): **fixed.** "Finish the run" reaches "Search done: 16 tries (first solution at 8)" in one press, and the walkthrough reached the reveal.
2. Right answer equal to the 16 board squares: **fixed.** The options are now ranges (Under 30 / 30 to 150 / Over 150), so 16 cannot be picked for the wrong reason.
3. "placements" vs "Tries" wording: **fixed in the question** (it now says "tries"). The reveal's 8-queens sentence still says "placements" (see finding 4 above).
4. Counter climbs when re-placing the row-1 queen: **not fixed** (minor, defensible as "tries").
5. Locked "Run from empty" tinted as active: **fixed.** Nothing is highlighted in the locked frame.

## Verdict

Launch. The × marks and the forced "Back up" show the cause, and the quoted 16 / 8 / 256 survive Start over. Polish, not blockers: show how many blind boards a dead end rules out (finding 3), and say once that a try is a single placement (finding 4).
