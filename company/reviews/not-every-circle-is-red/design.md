# Design note: not-every-circle-is-red (math:negating-all)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/math.discrete.md`, Wave J, brief 2 (cm-math) · numbers: `node company/domains/briefs/checks/math-wave-j-check.mjs` (D2)

## The payoff
One blue circle is enough to make "Not every circle is red" true, while "No circle is red" stays false. The learner watches the two rows split on the first tap, and sees "Some circle is not red" keep the same mark as row 1 in every state.

## Knowledge boundary (meta.json `learner`)
- knows: "all", "none" and "some" in everyday speech.
- doesNotKnow: that the opposite of "every circle is red" is "at least one circle is not red", not "no circle is red".

## Misconception
"Not every circle is red" means "no circle is red".

## Objective
The learner can say that "not every circle is red" means "at least one circle is not red", because one blue circle already makes it true while "no circle is red" stays false, and that the opposite of "none are" is "at least one is".

## Prediction
Brief's kit text set in a scene with its condition stated (copy-style: concrete scene, every condition stated): "You have four circles, each painted red or blue. A friend looks at them and says: "Not every circle is red." Which sentence means exactly the same, whatever the colours?" (30 words). Options: No circle is red / Some circle is not red / Some circle is red (answer B). "whatever the colours" states that "means the same" is over every colouring, which the brief's check assumes.

## Interaction
- Four circle buttons (64 px) in a row, all red (solid, "R"); a tap toggles one to blue (hatched, "B").
- Table below: the four sentences of the brief, row 1 bold and ruled off. Column "now": ✓/✗ for the current colours (aria-labels "true"/"false"), then "=" on each row whose mark equals row 1's now (shape differs from ✓, as the brief asks).
- Two kept columns, headed by a small picture of the state (10 px dots, hatched for blue): the first state with a blue circle (milestone `one-blue`; always exactly one blue, since each tap toggles one circle) and all four blue (milestone `all-blue`). They fill when the milestone fires and never clear, so Reset cannot remove what the reveal quotes. This is an addition to the brief's stage (no words added).
- Reset: back to all red; disabled when already all red (a press would change nothing).
- QA path: circle 1 (one-blue), 2, 3, 4 (all-blue), Reset.

## Reveal (brief draft, 66 words, unchanged)
"With one circle blue, 'Not every circle is red' turned true while 'No circle is red' stayed false, so they do not mean the same. 'Some circle is not red' matched it in every state you made. One exception is enough to deny 'every'. The opposite of 'all are' is 'at least one is not', and the opposite of 'none are' is 'at least one is'."

## Told vs shown
Shown: the one-blue kept column (row 1 ✓, row 2 ✗); row 3 has the same mark as row 1 in all three columns. The last sentence (opposite of "none are") is shown by the all-blue column: "No circle is red" ✓ and "Some circle is red" ✗, opposite marks. Claims c1–c3.

## Recall
"A station board says: "Not every train today was on time." Which must be true?" → "At least one train was not on time" (claim c1).
