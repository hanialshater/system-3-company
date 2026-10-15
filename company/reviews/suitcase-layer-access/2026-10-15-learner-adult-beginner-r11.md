*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): suitcase-layer-access
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Access has a cost. In this stack model, retrieving the bottom item requires lifting everything above it; placing the first-needed item on top removes those intermediate moves.)
Screenshots seen: yes (artifacts/walkthroughs/suitcase-layer-access/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Target at bottom"; tapped Target at top; slid Layers from 6 to 8; opened reveal.

1. **Where understanding first broke: the pictures are not stacks.** "Target at bottom" is drawn as six boxes in two columns with an up arrow; "Target at top" is a single row of six with a right arrow. Neither looks like layers in a suitcase, and I could not tell which box was the orange target or where "top" is.
2. **I never saw the bottom-target number.** The panel sent me to "the second layout", which gives 0 removals at 6 and at 8 layers. The bottom case (5 removals, then 7) stayed "?" and never appeared, so the slider showed nothing changing.
3. **The prediction is obvious.** Fewer removals when the item you need is on top is common sense; there is no tension.
4. **The selected button looks reversed.**
5. **The reveal's sentence is clear** ("retrieving the bottom item requires lifting everything above it"), and the note about pockets is sensible, but "gives 0" reports one side only.

Fixes (for the builder):
- Draw a vertical stack with the target coloured, and show both removal counts together.
- Let the slider move the bottom case so the cost visibly grows with layers.

Verdict reason: the pictures do not read as a stack and the bottom-target count never appears, so the reveal's "gives 0" compares with nothing the learner saw.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which fits the finding that the prediction has no real trap.
- Fix route: demo-builder (show both results side by side, fix the selected-button look, picture, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
