*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): measure-diagonal-for-square
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A parallelogram can retain opposite side lengths while its corners skew. Its two diagonals differ unless the included angle is ninety degrees in this example; a diagonal comparison detects the skew.)
Screenshots seen: yes (artifacts/walkthroughs/measure-diagonal-for-square/sheet.png, recorded 2026-10-15T21:36:31.032Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Sheared corner" (wrong); tapped "Square corner"; slid Side 70 to 72 cm; opened reveal.

1. **Where understanding first broke: the title says "square" and the shape is a rectangle.** "Equal sides do not prove square", but the shape is 70×60 cm with unequal sides. I think "square" means "square corners", but the title confused me. The tapped layout button does not look selected: after I tapped the second layout, the stage highlighted the first one (white, bold) and greyed the one I chose, so I was not sure which layout the readout described.
2. **What the prediction felt like.** Answered by the picture. The predict frame shows a visibly slanted shape whose diagonals are obviously different lengths, so "which has equal diagonals?" is answered by looking.
3. **The sheared case is never measured.** The walk showed only "Square corner: diagonal difference 0cm". The number that would teach me (how big the difference gets when the corner is off by a few degrees) never appears. That is the practical trick: measure both diagonals and compare.
4. **Whether the reveal answered my question.** "A parallelogram can retain opposite side lengths while its corners skew" and "the parallelogram condition matters" use words I do not have. The practical message (if the two diagonals match, the corners are square) is there, but buried.

Verdict reason: the title conflicts with the shape, the prediction is answered by the picture, and the sheared diagonal difference is never shown; ask how much the diagonals differ for a small skew and say "measure corner to corner both ways" plainly.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, so the boundary is under-specified (category manager). I used the boundary "everyday objects have sizes, positions and amounts".
- The selected-state styling (tapped layout shown unselected) recurs across this layout template (lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, mug-handle-packing, nested-box-retrieval): likely one kit or template fix; worth a QA check.
- Fix route: demo-builder (title wording; show the sheared diagonal difference; plain reveal). The reveal caveat about arbitrary quadrilaterals is correct but outside this boundary.
