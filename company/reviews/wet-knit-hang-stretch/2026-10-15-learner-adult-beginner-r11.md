*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): wet-knit-hang-stretch
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know In an ideal equal-share model, more support points reduce the load assigned to each. A garment’s care label can require flat drying; this drawing explains support sharing without predicting fabric stretch.)
Screenshots seen: yes (artifacts/walkthroughs/wet-knit-hang-stretch/sheet.png, recorded 2026-10-15T21:37, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Two support points"; tapped Six support points; slid Wet mass from 600 to 620 g; opened reveal.

1. **The picture is good.** Two support points give a deep, sagging shape; six points give a shallow one. I could see "more support, less sag" before reading anything.
2. **The question is a definition.** "Which ideal support shares less load per point?" with "Six support points" as an option: sharing among more points means less each. No tension.
3. **Where understanding first broke: "100g-equivalent".** I do not know what a g-equivalent is. "Each point holds the weight of 100 g" would do. The two-point value (300) never appeared, because the panel sent me to "the second layout" only.
4. **The lesson's practical question is dropped.** The title says "Hanging concentrates the load", and I came in wondering whether hanging a wet jumper stretches it. The reveal says "this drawing explains support sharing without predicting fabric stretch" and "follow the garment's drying instructions". Honest, but it leaves my real question unanswered. Drying flat (support everywhere) is the end of this idea and is not shown.
5. **The selected button looks reversed.**

Fixes (for the builder):
- Show both loads per point (300 vs 100) in plain words.
- Add a "laid flat" case (support along the whole garment) as the limit.
- Reframe the prediction around the hook ("which way puts less pull on each part of the jumper?").

Verdict reason: the two-point load never appears, "g-equivalent" is past the boundary, and the reveal steps back from the practical question the title raises.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds.
- Fix route: demo-builder (show both results side by side, plain units, selected-button look); Life Hacks category manager for whether the brief names a real beginner belief.
