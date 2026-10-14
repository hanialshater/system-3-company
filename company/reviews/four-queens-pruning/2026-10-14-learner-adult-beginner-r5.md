*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): four-queens-pruning
lesson version: v2
boundary: an adult beginner who knows chess queens attack along rows, columns and diagonals; has never heard of backtracking.
Screenshots seen: yes (artifacts/walkthroughs/four-queens-pruning/sheet.png, 10 frames)
Verdict: revise

## 1. From the artifact

- Predict: title is now "Four queens: how many tries?" and the hook does not state the answer. The question is still one dense sentence (one-per-row, 256, safe squares, back up, every solution). A new weakness: 16 is also the number of squares on the 4×4 board, so a beginner can pick 16 for the wrong reason and be told "Your prediction held".
- Explore, "Run the search": it now animates (frame shows queens in rows 1-2, "Place a queen in row 3", placements 6; the transcript snapshot says 5). **Where it loses me:** at that moment "Solutions 2 of 2" and both solution thumbnails are already shown, and "Show me why" is already open. The reveal says the first solution comes after 8 placements, so seeing both solutions at 5-6 placements contradicts it. And on this path the counter never reaches 16: the headline number of the lesson is never seen on stage, only told in the reveal.
- By hand: × marks for attacked squares are clear; "Row 3 has no safe square. Back up." in red is the moment pruning is felt. Good.
- Counter: tapping row 1 columns 1, 2, 3, 4 in turn still moves one queen but counts 1, 2, 3, 4. With one queen on the board it reads 4. "16 of what?" remains fuzzy.
- Reveal: 16, "after 8" and 256 are told; 8-queens figures are told as an extension. Reveal frame scrolls the stage so row 1 is cut off (minor). 75S chip.
- Suggested: show solutions only when the search reaches them, keep the gate shut until the run finishes (or the learner has stepped to a dead end), and show "Search done: 16 placements" at the end of the animation.

## 2. Earlier findings (v1 review)

1. Title/hook stated the answer: **fixed**.
2. "Run the search" finished instantly, no pruning seen: **partly fixed** (it animates now), but the gate and the solution count run ahead of the animation, so the end count 16 is not seen.
3. Counter climbs when re-placing the row-1 queen: **not fixed**.
4. 8-queens numbers told only: unchanged, acceptable.
5. Reveal stage crops row 1; 75 s chip: **not fixed** (minor).

## 3. New findings

- 16 coincides with the board's 16 squares (prediction can be right for the wrong reason).
- Solutions 2 of 2 shown before the search finds them. No FATAL.
