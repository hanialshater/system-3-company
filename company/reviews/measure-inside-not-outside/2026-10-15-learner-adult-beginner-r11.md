*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): measure-inside-not-outside
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A container’s outer width includes both walls. The insert must fit the clear inside opening, so subtracting the walls can change an apparent fit into a collision.)
Screenshots seen: yes (artifacts/walkthroughs/measure-inside-not-outside/sheet.png, recorded 2026-10-15T21:36:40.532Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Outer width" (wrong); tapped "Clear inside width"; slid Outer width 40 to 42 cm; opened reveal.

1. **Where understanding first broke: the picture says it fits when it does not.** At 40 cm outer width, walls 2×2 cm and a 37 cm insert, the readout says "Fit margin -1cm", but the drawing shows the insert sitting inside the box with room to spare. The green line under the box is labelled "40cm opening" although 40 cm is the outer width, not the opening. The tapped layout button does not look selected: after I tapped the second layout, the stage highlighted the first one (white, bold) and greyed the one I chose, so I was not sure which layout the readout described.
2. **What the prediction felt like.** Given away. "Which measurement checks whether this insert fits: outer width or clear inside width?" The word "clear inside" answers it. The real surprise in this lesson (a 37 cm insert does not fit a 40 cm box) is a great question, and it is not the one asked.
3. **Whether the reveal answered my question.** Yes for the rule ("outer width includes both walls ... subtracting the walls can change an apparent fit into a collision"). The "-1cm" figure is the best moment, but the drawing undercuts it.

Verdict reason: the drawing shows the insert fitting at -1 cm and labels the outer width as the "opening", and the prediction is given away; ask "does a 37 cm insert fit a 40 cm box with 2 cm walls?" and draw the collision.

## After reading the brief (meta.json)

- The meta.json learner.doesNotKnow field holds the reveal paragraph rather than a knowledge gap, so the boundary is under-specified (category manager). I used the boundary "everyday objects have sizes, positions and amounts".
- The selected-state styling (tapped layout shown unselected) recurs across this layout template (lids-match-by-size, margin-before-cut, measure-diagonal-for-square, measure-inside-not-outside, mug-handle-packing, nested-box-retrieval): likely one kit or template fix; worth a QA check.
- Fix route: demo-builder (drawing must show the -1 cm collision; label the outer width correctly; ask the fit question directly).
