*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): small-items-in-mesh
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The closed bag in this simplified drawing keeps the listed items in one group. The useful question is whether the closure and mesh suit the items; merely placing them near one another adds no boundary.)
Screenshots seen: yes (artifacts/walkthroughs/small-items-in-mesh/sheet.png, recorded 2026-10-15T21:33, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Loose items"; tapped Closed mesh bag; slid Count from 8 to 10; opened reveal.

1. **The prediction has no tension.** "Which boundary keeps the pictured small items together?" with "Loose items" as an option is not a real question: loose items have no boundary. I picked it only because the walkthrough picks option 1. Any adult picks the bag.
2. **Where understanding first broke: I never saw what "Loose items" gives.** The panel says "Try the second layout", so I only saw the bag's count (8, then 10). The loose count stayed "?" on the predict screen and never appeared. The contrast the lesson needs (bag keeps 10 of 10; loose keeps how many?) is missing.
3. **The slider teaches nothing.** "Contained items" always equals Count (8 gives 8, 10 gives 10). Moving it just makes a bigger number.
4. **The selected button looks reversed.** While the bag was on screen, "Loose items" was the white, raised button and "Closed mesh bag" was grey.
5. **Does the reveal answer my question?** It says "Not quite. The current closed mesh bag setting gives 10", which only repeats the slider. The useful part ("whether the closure and mesh suit the items") is a good point, but nothing on stage shows a closure or mesh that fails (for example, items smaller than the openings).

Fixes (for the builder):
- Show both counts side by side, or after the bag show what happens loose (items scatter in a wash drum).
- Give the slider something that can fail, such as item size against mesh opening, so the "suit the items" point is shown, not just said.
- Fix the selected-button look.

Verdict reason: the learner never sees the loose result, so the reveal's "gives 10" compares with nothing, and the one real idea (mesh must suit the items) is only stated.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which matches finding 1: the prediction has no real trap.
- Fix route: demo-builder (show both options' results side by side, fix the selected-button look, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
