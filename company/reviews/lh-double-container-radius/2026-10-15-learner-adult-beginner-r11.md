*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-double-container-radius
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Predict cylinder capacity scaling when radius doubles at fixed height.)
Screenshots seen: yes (artifacts/walkthroughs/lh-double-container-radius/sheet.png, recorded 2026-10-15T21:32, build f1832fa, phone viewport)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "3cm radius"; tapped Test A, Test B; slid Height 10 to 12cm; opened reveal.

1. **The prediction has a real trap, though the wording narrows it.** My belief is "twice the radius, twice the volume", so the honest pick is "Neither". That option exists, which is good. The title "Double the radius, not the volume" hints that the volume is not doubled, so it leans me toward the answer.
2. **Where understanding first wobbled: the expressions.** ((3.142×9×10)÷1,000) has a 9 and a 36 that are never named as 3×3 and 6×6. "V=πr²h" is in the caption, but a beginner reads past it. The step from "radius 6" to "36" is the whole lesson and it is left implicit on the stage.
3. **The slider moves the wrong thing for the idea.** It changes height, which scales both cylinders equally. It shows "still four times" but never lets me change the radius, the variable the lesson is about.
4. **Does the reveal answer my question?** Yes: radius is squared, so doubling radius multiplies the base area by four; equal height gives four times the volume. That is exactly what I needed.

Notes (for the builder, not blocking):
- Write 9 as 3×3 and 36 as 6×6 in the expressions.
- Consider a radius control instead of (or beside) height.

Verdict reason: the reveal answers the beginner's question (why four times, not two) from numbers the stage showed.

## After reading the brief (meta.json)

- Objective: predict capacity scaling when radius doubles at fixed height. Delivered in the reveal; the slider varies height rather than radius (finding 3), so the explore step confirms but does not explore the objective.
- Notes route: demo-builder; not blocking.
