*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): towel-spread-dries-first
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Spreading the towel exposes both large faces. This constant-rate model divides water mass by exposed area and assumed flux; a smaller evaporation doorway gives a longer model time.)
Screenshots seen: yes (artifacts/walkthroughs/towel-spread-dries-first/sheet.png, recorded 2026-10-15T21:35, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Quarter-fold"; tapped Spread flat; slid Width from 70 to 72 cm; opened reveal.

1. **The picture contrast is good.** Quarter-fold is a stack of four layers with arrows only on top; spread flat is one thin slab. I could see why the folded towel has less surface to dry from.
2. **Where understanding first broke: the reveal mentions a number I never saw.** The last line says "this is not a twelve-hour promise". Twelve hours is presumably the quarter-fold time, but the stage only showed spread flat (3 h, then 2.92 h). The quarter-fold time stayed "?". The reveal refers to the contrast without showing it.
3. **"Flux=0.102" and "smaller doorway" are opaque.** Flux has no unit and no plain meaning; "doorway" (in the title and the reveal) is a metaphor for exposed area that I only decoded after the reveal.
4. **The prediction is easy.** Most adults know a folded towel dries slower; the surprise could be how much slower (4 times in this model), which the lesson does not show.
5. **Arrows on top only, while the reveal says spreading "exposes both large faces".** The drawing shows one face.
6. **The selected button looks reversed.**

Fixes (for the builder):
- Show both model times together (quarter-fold 12 h, spread 3 h) so the reveal's twelve-hour remark has something to point to.
- Replace "flux" with plain words ("drying rate per square metre, assumed") and say what "doorway" means.
- Draw arrows on both faces of the spread towel.

Verdict reason: the reveal points to a twelve-hour figure the learner never saw, and "flux" and "doorway" are not explained, so the 4-times difference is not shown.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, picture, selected-button look, plain wording); Life Hacks category manager for whether the brief names a real beginner belief.
