*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): common-letters-in-order
lesson version: v1
boundary: knows-edit-distance (has filled the flaw-to-lawn edit-distance grid; has not met "longest shared sequence with gaps" or its cell rule). Taken from meta.json learner field.
Screenshots seen: yes (artifacts/walkthroughs/common-letters-in-order/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- Hook and predict: "share only 2 letters side by side. Allow gaps: how many now?" is a real question with numbers I can hold. 3 / 4 / 5 are all plausible, and 3 feels safe. The locked grid shows a zero border and a "?" in the corner. Nothing leaks.
- Explore, stepping: "Next cell" gave "A ≠ B: larger of up (0) and left (0) = 0" with an arrow, and "Next row" ended on "A = A: match. Diagonal 0 + 1 = 1" with a diagonal arrow. The two arrows are the cell rule, and coming from edit distance I can see it is a different rule (no +1 on a mismatch, and a max instead of a min). This is the best part of the lesson.
- **Where it loses me (main finding):** "Fill the rest" is enabled from the start, next to "Next cell". After 6 cells it filled the other 36 at once, and the message jumped to "The corner reads 4". A learner who taps "Fill the rest" first (the obvious thing on a 42-cell grid in 60 s) would see no match or mismatch step at all. The rule would then reach them only as the reveal's told sentence, "do these two letters match? If so, extend the answer from the diagonal; if not...". The cell rule is the lesson's first doesNotKnow item, and the objective asks the learner to fill the grid with it.
- I first saw what a cell *means* ("Each cell: the best answer for the first letters of each string") only after "Start over". While stepping, "larger of up and left" is arithmetic without a meaning. (The unlocked, untouched state may show that line. The recorded path tapped before I could see it.)
- Trace: "Picked B, C, B, A: 4 letters, in order, with gaps". The trace highlights the path cells and tints B, C, B, A on both axes, so I can see the letters are not side by side in either string. That is the gaps idea, shown, and the reveal points at it ("the trace picked BCBA").
- Reveal: it quotes the corner and the trace I saw. "The longest block side by side is only 2 (AB or BD)" is told, but it is the hook's own premise, so I accept it as context. The reveal frame shows a blank grid ("Cell 0 of 42") because the path pressed Start over. On a phone, the reveal of "your corner read 4" sits under an empty grid (minor).

## 2. Earlier findings

No earlier learner review (company/reviews/common-letters-in-order/ has only a fact-check and build.md). The boundary is taken from meta.json.

## 3. New findings

1. Main (told vs shown, decision 2026-10-14-told-vs-shown): the reveal unlocks on "filled" + "traced", and "Fill the rest" alone reaches "filled". So the match/mismatch rule, a doesNotKnow item and the objective's "fill the grid", can arrive as told text only. Fix direction (for the builder to choose): keep "Fill the rest" disabled until the learner has stepped at least one mismatch and one match, which is about a row. Or make the first row a required milestone.
2. Minor: show the cell's meaning ("best for A… vs B…") next to the step message, so "larger of up and left" has a reason ("drop a letter from one string").
3. Minor: after the reveal, the empty grid under "your corner read 4" is jarring. Consider disabling Start over once traced, or leaving the traced grid visible at reveal.
- No FATAL.
