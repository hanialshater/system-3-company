*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): transparent-box-visibility
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Under this ideal clear-front assumption, contents are visible from the shown viewpoint. Opaque boxes require another cue such as an address; transparency changes observation, not where the item is.)
Screenshots seen: yes (artifacts/walkthroughs/transparent-box-visibility/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Opaque boxes"; tapped Clear fronts; slid Count from 6 to 8 boxes; opened reveal.

1. **There is nothing to predict.** "Which layout shows the orange item without opening boxes?" with "Opaque boxes" and "Clear fronts" as options: anyone knows you can see through clear boxes. No adult holds the belief this lesson corrects.
2. **The picture contrast is clear.** Opaque boxes are blank white squares; clear fronts show each item, with the orange one picked out. That part works.
3. **The readout says little.** "Visible target 1" stays 1 at 6 and at 8 boxes; the opaque count (0) is never written. The slider changes nothing that matters.
4. **The interesting point is only told.** "Opaque boxes require another cue such as an address; transparency changes observation, not where the item is" is the useful idea (labels do the same job), but the stage never offers a labelled opaque box to compare.
5. **The selected button looks reversed.**

Fixes (for the builder):
- Add a third layout, labelled opaque boxes, and ask which of clear and labelled finds the item with fewer openings when items look alike; that has a real answer to predict.
- Or let the slider crowd the clear box so the item becomes hidden, which shows the reveal's caveat.

Verdict reason: the prediction has no tension and the reveal's useful point (a label is another way to find the item) is never shown, so the learner leaves knowing only what they knew. The premise may be for the category manager.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: Life Hacks category manager first (premise: is "clear boxes show contents" worth a lesson, or should it compare clear against labelled boxes?), then demo-builder.
