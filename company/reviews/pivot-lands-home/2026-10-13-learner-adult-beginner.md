*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: pivot-lands-home
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "Partition [5, 2, 8, 1, 9, 3, 7] around pivot 5 (smaller values left, larger right). At which position (counting from 0) does 5 end up?" Partition and pivot are named but explained inline, and counting from 0 is flagged. A beginner can count the 3 smaller values and answer 3, so this is solvable by reasoning rather than a prediction. The hook ("Can a single card be in its final sorted place before anything else is sorted?") is a nice puzzle and does not reveal the number. "Counting from 0" is awkward for a beginner (position 3 is the fourth slot).
- What was SHOWN: very good. The stage shows seven cards, a row of empty slots numbered 0 to 6, and the caption "Tap each card. Pivot is 5". Each tap places a card: "2 < 5: left pile", "8 > 5: right pile". After the last card "5 drops in at position 3. It is home." That is a direct demonstration of the answer. "Partition each pile" then sorts the piles further ("2 and 7 land home").
- Where understanding first broke: after "Partition each pile": the screenshot shows a faint dashed 5 in the top row, and the bottom row 1 2 3 5 7 8 9 with the first five highlighted green and 8, 9 plain. The caption says "2 and 7 land home" but five cards are green; I could not tell what green meant (home?). So "home" is not defined consistently. Also the reveal does not explain how the second pass related to the claim.
- Reveal: "Your 5 landed at position 3" matches the stage. "Exactly 3 cards are smaller... position 3" is a clear explanation and earned. The second paragraph ("Repeating the move on each pile is quicksort ... on already sorted input ... n squared over 2 comparisons") is told, with no stage; "comparisons" and "n^2/2" are new. A learner who had the stage reset (as the reveal screenshot shows) sees a fresh unsorted board next to a statement about it.
- Reveal earned: yes for the headline; the quicksort and worst-case material is bonus, not earned.
- Problems: (1) solvable by counting, so weak prediction; (2) the colour meaning of "home" after the second step is unclear; (3) the n^2/2 sorted-input claim is told only; (4) "counting from 0".
- No FATAL.

## 2. After reading the brief

- The brief's learner knows sorted order and splitting problems in halves; my boundary does not, but the question explains partition inline and the stage places each card. The objective (5 lands at position 3 and never moves; two independent piles) is shown by the stage's 'It is home' caption. The misconception (everything must be compared before anything is final) is hit by the hook, though the prediction can be solved by counting smaller cards. Second-pass 'home' colouring is unclear.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: launch
