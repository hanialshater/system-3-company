*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): socks-use-shoe-space
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know The shoe envelope already contains a hollow. Filling that empty region with compatible soft socks can use space that would otherwise remain empty instead of adding another outside bundle.)
Screenshots seen: yes (artifacts/walkthroughs/socks-use-shoe-space/sheet.png, recorded 2026-10-15T21:33, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Beside shoe"; tapped Inside hollow; slid Sock volume from 200 to 220 cm³; opened reveal.

1. **I never saw the "beside" number.** Inside the hollow the outer envelope is 800 cm³. Beside the shoe it would be 1000 cm³, but the stage never showed it: the panel sent me to "the second layout" only. The reveal's "gives 800cm³" has nothing to compare with.
2. **Where understanding first broke: the slider did nothing.** Moving sock volume from 200 to 220 left the envelope at 800. That is the point (the socks fit in empty space), but nobody says so, and I first thought the slider was broken. Pushing it past 600 cm³ (the hollow) would show the limit; the walkthrough did not, and nothing invites me to try.
3. **The prediction is easy.** Socks inside a shoe take less room than socks beside it; most adults know this. The interesting part (it only works up to the hollow's size) is not used.
4. **The selected button looks reversed.**
5. **The reveal's reasoning is clear**, and the safety note (clean, dry, do not deform footwear) is sensible.

Fixes (for the builder):
- Show both envelopes together (beside 1000, inside 800).
- Say on stage that the envelope stays at 800 until the socks exceed the 600 cm³ hollow, and invite the learner to push past it.

Verdict reason: the stage never shows the beside-shoe volume and the slider's "no change" is unexplained, so the reveal reports a single number without the contrast it needs.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which matches finding 1: the prediction has no real trap.
- Fix route: demo-builder (show both options' results side by side, fix the selected-button look, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.
