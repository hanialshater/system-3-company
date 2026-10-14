*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5, first learner review): tic-tac-toe-is-a-draw
lesson version: v2
boundary: learner who knows a function that calls itself (from hanoi-tower-doubles) but not how a game can be solved by working back from the end (from the meta.json learner field); otherwise an adult beginner.
Screenshots seen: yes (artifacts/walkthroughs/tic-tac-toe-is-a-draw/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: "If both players play perfectly from an empty board, who wins?" X / O / draw. The hook adds "Score an endgame to see how it's solved." The locked stage shows a three-level tree. At the top is a mid-game board (X O X / O O · / · X ·, X to move). Below it are three "O to move" boards, then six finished games labelled X wins / Draw / O wins. Nothing leaks.
- Explore: tapping each middle board scores it with "O picks the worst result for X": Draw, O wins, O wins, with a thick line to the chosen leaf. Tapping the top scores it with "X picks the best": Draw. I checked the leaves by hand and the scoring is right. The procedure (back up results, min for O, max for X) is clear and I did it myself. That part is shown well.
- Where I lost the thread: the question was about the **empty board**, and the stage never touches it. What I scored is one hand-picked endgame that happens to be a draw. On stage, nothing distinguishes "the empty board is a draw" from "the empty board is an X win". A position that is a draw this late tells me nothing about move one. A beginner may even take the wrong lesson from it: "this endgame came out a draw, so tic-tac-toe is a draw."
- Reveal: "Your top board came out a draw" matches. The answer to the question I was actually asked comes entirely from "The same two rules, run by computer over all 255,168 games from the empty board, give a draw at the top too." That is a told claim, with a count I cannot see or check. "X had two moves with a win underneath, but in each O's best reply took it away" matches the tree and is the nicest sentence in the reveal.

## 2. Earlier findings

- No earlier learner review exists for this lesson (the folder holds a fact-check, build notes and verify.mjs). Nothing to carry forward.
- Intent vs experience (read after the findings above, from the meta.json learner and misconception fields only): the doesNotKnow, "how a game can be solved by working back from the end", **is** delivered by the stage. The misconception, "the first player, playing perfectly, wins", is what the predict question tests, and the stage never refutes it; only the told 255,168-game sentence does. That gap is the reason for revise.

## 3. New findings

1. Top (revise): the predict question asks about perfect play from the empty board, but the stage only solves one late endgame. The answer the learner bet on is told ("run by computer over all 255,168 games"), not seen. Either change the question to match what the stage solves ("From this position, with X to move and both perfect, who wins?"), or give the stage a visible bridge to the empty board, e.g. a row of X's opening moves each scored by the same rules, with "X's best = draw" filled in.
2. Minor: the stage has no prompt to notice that X *can* win under two branches. The reveal's best line ("a win underneath, but O's best reply took it away") would land harder if the X-wins leaves under each branch were highlighted when O's pick crosses them out.
3. Minor: the board and label text in the tree are small at phone size, especially the leaf captions ("X wins", "Draw").
4. Process note (not a learner finding): the card shows DRAFT and "0/6 claims checked" (fact-checker item).
- No FATAL.
