*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): tic-tac-toe-is-a-draw
lesson version: v3
boundary: learner who knows a function that calls itself (from hanoi-tower-doubles) but not how a game can be solved by working back from the end (from the meta.json learner field); otherwise an adult beginner.
Screenshots seen: yes (artifacts/walkthroughs/tic-tac-toe-is-a-draw/sheet.png, 10 frames; 05-step-4.png cropped to read the root board)
Verdict: launch

## 1. From the artifact

- Predict: "Can the first player always win?" plus "X moves first. Does that decide the game?" is a real tension, and "X, who moves first" is my honest guess. The locked stage shows the endgame tree (root X O X / O O · / · X ·, X to move) with its leaves already labelled, and a new bottom row, "Empty board · same rules, run by computer", with corner / edge / centre all showing "?". Nothing leaks about the empty board.
- Explore: I tap each "O to move" board: Draw, O wins, O wins. A thick line goes to O's pick, and the X-wins leaves O avoided are now struck out. Tapping the root gives "Draw", with "Scored 4 of 8 · now the first moves". Then I tap corner, edge and centre, and each one fills in "Draw". Last, the empty board joins them with lines and fills "Draw". So the question I bet on now has an answer on stage, reached by the same tap-to-score motion I just did by hand, and not only from a sentence.
- Reveal: "X had two moves with a win underneath (struck out), but in each O's best reply took it away" points at the strike-throughs I saw. "Corner, edge and centre each scored a draw, so X's best first move is a draw" points at the bottom row. 255,168 and chess are told context.

## 2. Earlier findings (r5, v2)

1. The question was about the empty board, and the stage solved only one endgame: **fixed**. The bottom row scores X's three opening types and the empty board in view, using the same rules. The inner search is still the computer's, which I accept as claimed context.
2. Nothing marked the X-wins that O takes away: **fixed** (struck out).
3. Board and leaf text is small at phone size: **not fixed**, and slightly worse. With the extra row the stage is taller, so the "Scored N of 8" line is clipped at the bottom edge in every explore frame and the bottom row sits right at the fold.
4. DRAFT / claims unchecked: claims now 6/6. DRAFT remains (not a learner item).

## 3. New findings

- Minor: "corner, edge, centre" stands for all nine first moves by symmetry, and that is not said or shown. A beginner may ask "what about the other six squares?". A short "(every first move is one of these three)" would answer it.
- Minor: the stage is crowded, with 17 boards plus labels. Leaf captions such as "X wins" and "O to move" are about 8 px on the phone frame, and the progress line is clipped. That is legible on a large phone, hard on a small one.
- Minor: in the bottom row the learner taps and the computer answers "Draw". It is a black box by design. Highlighting, under the corner board for example, the O reply that holds the draw would make it less of one, but that is not required.
- No FATAL.
