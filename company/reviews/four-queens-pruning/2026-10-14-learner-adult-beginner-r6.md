*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): four-queens-pruning
lesson version: v3
boundary: an adult beginner who knows chess queens attack along rows, columns and diagonals, and has backed out of a maze dead end; has never heard of backtracking.
Screenshots seen: yes (artifacts/walkthroughs/four-queens-pruning/sheet.png, 2 frames, run twice with the same result; plus my own probe screenshots of a full 9 s run and the reveal)
Verdict: revise

## 1. From the artifact

- Predict: the hook "256 ways ... How many must you try?" is a fair question. The locked stage shows an empty 4×4 board, "Tries 0 (blind: 256 boards)" and "Solutions 0 of 2". Small leak-ish cue: while locked, "Run from empty" is already tinted as active and row 1 is outlined (minor).
- **Where it loses me (main finding):** the walkthrough, which follows the QA path, never reached the reveal. It pressed "Run from empty" and the search started animating. After 1.2 s the board showed three queens, row 4 crossed out ×, × and ×, and "Tries 7". Every other control was disabled while the run animated, so the walkthrough ended with "Try it first" and "The reveal never unlocked". A probe found that the run takes about 9 s to reach "Search done: 16 tries (first solution at 8)". A patient person gets there. But demo-standard says a milestone that needs an animation must be reachable within the ~450 ms QA wait or by a step button. "Step" makes one placement per press, so the QA path (each control once) cannot reach it either.
- What a patient learner sees (probe): the queens advance, × marks appear, the run backs up, and the counter ends at "Tries 16 (blind: 256 boards)" with both solution thumbnails at the end. That is the idea, on the stage: clashes cut whole branches, so 16 ≪ 256. The v2 problem (solutions shown before they were found) is gone. At 1.2 s the readout said "Solutions 0 of 2" and the gate was shut.
- Prediction: 16 is still also the number of squares on the board. A beginner can choose 16 for the wrong reason and get "Your prediction held". The reveal now says "So 16 matching the board's 16 squares is a coincidence", which is honest but told. Wording: the question asks for "placements" and the stage counts "Tries". Pick one.
- Reveal (probe): it quotes 16, "first came at try 8" and 256, all seen on stage in the full run. It points at "the × marks" for the why. The 8-queens figures (16,777,216 vs 2,056) are claimed context and acceptable. "Pruning early is what makes search possible" ends on the idea.

## 2. Earlier findings (v2 review, r5)

1. Solutions 2 of 2 and the open gate ran ahead of the animation: **fixed** (gate shut mid-run, solutions appear at the end).
2. End count 16 never seen on stage: **fixed for a learner who waits** ("Search done: 16 tries"), but not reachable on the QA path (see main finding).
3. Counter climbs when re-placing the row-1 queen (1, 2, 3, 4 with one queen on board): **not fixed**. With the label now "Tries" this is defensible, but it does not match "placements" in the question.
4. 16 = board squares coincidence: **partly addressed** (the reveal names it as a coincidence; the option set is unchanged).
5. Dense question sentence: **not fixed** (minor).
6. 75 s chip: **not fixed** (product-owner item).

## 3. New findings

1. Main: the reveal is unreachable on the walkthrough/QA path. Make "Step" do more than one placement while running, keep Step enabled during the run (so pressing it jumps to the end or advances), or speed the run so it ends within the QA wait. For the builder to choose. This needs a re-walkthrough. I gave revise because my own walkthrough artifact shows no reveal.
2. Minor: consider an option set where the right answer is not also the square count (for example 16 / 64 / 256 with a board where those differ, or an option like "about 30"). Or keep it and accept the coincidence line.
3. Minor: "placements" vs "Tries" wording.
- Told vs shown: the doesNotKnow "how much backing up early saves" is shown (× marks plus the 16 vs 256 readout) for a learner who watches the full run. No FATAL.
