*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): trays-slide-out-reach
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Sliding the tray brings the same back item toward the front. The drawing subtracts travel from depth; it changes access distance without changing the shelf’s storage volume.)
Screenshots seen: yes (artifacts/walkthroughs/trays-slide-out-reach/sheet.png, recorded 2026-10-15T21:36, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Fixed back item"; tapped Slide tray out; slid Shelf depth from 50 to 52 cm; opened reveal.

1. **The prediction is obvious.** Sliding the tray toward you shortens your reach; "Which position reduces the shown horizontal reach?" with "Slide tray out" as an option needs no thought.
2. **Where understanding first broke: the picture.** The shelf is drawn from above as a white rectangle with a diagonal green line from the item to a point outside it. I guessed the line is my arm, but in the slide-out picture the tray sits half outside the shelf's bottom-left corner and the line points away from the shelf, which looks wrong.
3. **I never saw the fixed reach number.** Slide-out gives 20 cm (22 at 52 cm depth). The fixed reach (50 cm) stayed "?" because the panel sent me to "the second layout" only.
4. **The reveal's arithmetic is plain** ("subtracts travel from depth"), which I liked, but it compares with a number I did not see.
5. **The selected button looks reversed.**

Fixes (for the builder):
- Show both reaches together (fixed 50 cm, slide-out 20 cm) and draw a side view of a shelf, tray and hand.
- Make the prediction about the size of the change (how much closer is the item?), not which option is better.

Verdict reason: the prediction gives itself away and the fixed-reach number never appears, so the reveal's "gives 22cm" has nothing to compare with.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
