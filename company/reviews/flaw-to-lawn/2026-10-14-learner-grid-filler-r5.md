*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, filed as r5 in wave D): flaw-to-lawn
lesson version: v2
boundary: from meta.json learner field: an adult who has filled a grid from its neighbours before (the blocked-cell-routes lesson), but does not know how a spell checker measures how different two words are, or that the distance between whole words is built from distances between their beginnings.
Screenshots seen: yes (artifacts/walkthroughs/flaw-to-lawn/sheet.png, all 8 frames)
Verdict: revise

## 1. From the artifact (written before reading meta.json)

- Predict: good trap. The hook ("FLAW and LAWN clash at all 4 spots") and the stem push "4", and 2 needs the insight that letters can slide. "1" is a fair outlier. The locked grid shows the top row 0–4 and the left column 0–4 with a "?" in the corner, which fits a grid-filler's habits. Oddity: "Trace back from the corner" looks enabled (green) while everything else is locked.
- Where understanding first broke: step 1, "F vs L: the cheapest neighbour is diagonal (0 + 1 = 1)". Nothing on the stage says what a move in each direction means as an edit (down = delete a letter of FLAW, right = insert a letter of LAWN, diagonal = replace, or keep for free when the letters match). Nor does it say when you add 1 and when you add 0. I can follow the arithmetic the caption does, but I cannot read the grid as edits. When L meets L the caption must be saying "+0", but in this path I only saw the end of rows, never a match being explained.
- Explore: the Row F / L / A / W buttons fill whole rows for me, so after the first cell I make no decisions; numbers appear. The highlighted diagonal of 1s (L-L, A-A, W-W) is visible and suggestive, but nothing points to it before the trace.
- Trace back: the path 0 → 1 (down) → 1 → 1 → 1 (diagonal) → 2 (right) is highlighted with "Edits: delete F, keep L A W, insert N = 2". This is the payoff, and it lands: a learner sees that a delete and an insert shift LAW into line. But the link between the path's shape and those words (down = delete, right = insert) is left to the learner to guess.
- Reveal: "delete F, keep L A W, insert N" matches the stage. "Counting spot by spot gives 4, because it never lets letters slide" answers the hook directly, which is good. "Each of the 16 cells … took the cheapest of three neighbours … built from distances between their beginnings" is the second objective and it is told; the stage never said what a cell's number means ("edits to turn the first i letters of FLAW into the first j letters of LAWN").
- Status: the badge says DRAFT and the trust link reads "0/7 claims checked" (fact-checker lane).

## 2. Earlier findings

- No earlier learner review exists for this lesson (company/reviews/flaw-to-lawn/ has only a fact-check and build notes). Nothing to mark fixed.
- After reading meta.json: the learner field assumes grid-filling from the routes lesson, which the stage relies on well. The doesNotKnow item "distance between whole words is built from distances between their beginnings" is exactly the part that is told, not shown, because no cell is ever labelled with the prefixes it compares.

## 3. New findings

- Top (blocks launch): give the three directions their edit meaning on the stage (a three-arrow legend: ↓ delete, → insert, ↘ replace / keep if same), and say "+0 when the letters match" in the caption the first time a match happens. Without this, the grid is arithmetic and the trace's words come from nowhere.
- Label what a cell means once (for example, tapping cell F,L: "F → L: 1 edit"), so "built from beginnings" is seen.
- Consider making the learner pick the cheapest neighbour for at least one cell instead of filling whole rows.
- Minor: "Trace back from the corner" looks enabled before the lock.
- No FATAL.
