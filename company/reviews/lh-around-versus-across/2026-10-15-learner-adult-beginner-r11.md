*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-around-versus-across
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Select the correct length formula for boundary versus corner-to-corner routes.)
Screenshots seen: yes (artifacts/walkthroughs/lh-around-versus-across/sheet.png, recorded 2026-10-15T21:35:36.523Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Perimeter"; tapped Test A; Test B; slid Width 4 -> 6 m; opened reveal.

1. **The prediction tests nothing.** Going all the way round a 4×3 rectangle vs cutting across it once: no beginner thinks the diagonal is longer. 14 m vs 5 m is not a surprise.
2. **Where understanding first broke: the diagonal formula.** "sqrt(((4×4)+9))" is shown as the working. I do not know square roots or why 9 appears (3×3, but it is written as a bare 9 while 4×4 is spelled out). The reveal says it "uses the square-root relationship", which explains nothing to me.
3. **The real-life point is vague.** "Name the route before calculating the required length" is the hack, but I never had a moment where I would have measured the wrong thing (for example: buying trim vs checking whether a board fits through a gap). The lesson has no situation, only a rectangle.
4. The pictures (rectangle outline vs single diagonal line) are clear and update with width.

Verdict reason: the comparison is too obvious to be a prediction, and the one non-obvious part (how long the diagonal is) is shown only as a square-root expression the learner cannot read.

## After reading the brief (meta.json)

- Objective "select the correct length formula for boundary versus corner-to-corner routes": the boundary says the learner knows basic arithmetic, not square roots, so "sqrt(((4×4)+9))" is beyond it (finding 2).
- Fix route: demo-builder (a task where choosing the wrong route is tempting; show the diagonal's working in words or as 4² + 3² = 25, √25 = 5).
