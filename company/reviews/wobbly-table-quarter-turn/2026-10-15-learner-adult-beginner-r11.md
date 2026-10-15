*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): wobbly-table-quarter-turn
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The illustrated signed gap crosses zero during a quarter turn. For square equal-leg tables on suitably gentle continuous ground, a balanced position exists.)
Screenshots seen: yes (artifacts/walkthroughs/wobbly-table-quarter-turn/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Start angle"; tapped Find balance (jumped to 45°, gap 0 mm); slid Turn to 47° (gap −0.28 mm); opened reveal.

1. **The idea is genuinely surprising.** That turning a wobbly square table can always find a spot where all four feet touch is a real "huh" for most adults. This lesson has something worth teaching.
2. **Where understanding first broke: the answer options do not fit the question.** "Can a turn help this square equal-leg table?" is a yes/no question, but the options are "Start angle", "Find balance" and "Same outcome". I had to guess that "Find balance" means "yes, a turn helps".
3. **The button does the discovering for me.** "Find balance" jumps straight to 45° and 0 mm. I never turn the table myself and watch the gap shrink and cross zero. The reveal says "the illustrated signed gap crosses zero during a quarter turn", but I only saw two points (0 at 45°, −0.28 at 47°), and the start-angle gap stayed "?".
4. **"Signed gap" and "signed-contact schematic" are past my boundary.** I did not know what a negative gap means (the other diagonal pair lifts?). The picture, a tilted square with coloured dots over a side-view line, was hard to read; I could not tell which leg was off the ground.
5. **The safety notes are good** ("Clear hot drinks", "Four feet down is not level"), and the scope limits (steps, holes, unequal legs) are honest.
6. On the reveal frame the top of the table drawing is clipped.

Fixes (for the builder):
- Options in plain words: "No, it will always wobble" / "Yes, somewhere within a quarter turn" / "Only if the floor is flat".
- Start the slider at 0° and let the learner turn it, with the gap shown at the start; remove the jump button or use it after.
- Explain the gap as "which pair of legs is off the floor, and by how much".

Verdict reason: the options do not answer the yes/no question, and the jump button hides the gap crossing zero, which is the very thing the reveal says the learner saw.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Here the generic misconception undersells the lesson: the real belief is "a wobbly table needs a wedge; turning cannot help", which the options should name (finding 2).
- Fix route: demo-builder (options, slider-first interaction, gap explanation, picture); fact-checker already holds the "gentle continuous ground" scope.
