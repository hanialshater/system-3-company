*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): shoes-opposite-ends
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: These simplified shoes have wide toes and narrow heels. Reversing one matches a wide section with a narrow section, reducing the maximum pair width without shrinking either shoe.)
Screenshots seen: yes (artifacts/walkthroughs/shoes-opposite-ends/sheet.png, recorded 2026-10-15T21:37)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Toes together"; after lock-in the stage showed Width margin 4 cm; tapped Toe-to-heel (10 cm); slid bag width to 30 (12 cm); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **Where understanding first broke: "envelope".** "Which pair uses a narrower envelope?" I read "envelope" as a paper envelope or a shoe bag. It means the outline around both shoes, but nothing says so. That word is the whole question.
2. **The drawing makes the shoes overlap.** In toe-to-heel mode, the two shoe outlines sit partly on top of each other (the darker shoe covers the lighter one's edge). The reveal says reversing works "without shrinking either shoe", but the picture looks like the shoes were squashed together. In the predict state the shoes are drawn far apart, so I never see a fair "toes together" picture next to the reversed one.
3. **The readout runs the other way from the question.** I am asked which is narrower, but the number is "Width margin" (space left in the bag), where bigger is better: 4 vs 10 cm. I worked it out (24 vs 18 cm pair width), but a beginner might read 10 > 4 as "wider".
4. The idea itself (wide toe beside narrow heel) is a nice, real hack, and the reveal states it clearly.
5. **Selected-state styling is inverted.** "Same outcome" is an odd option.

Fixes (for the builder):
- Replace "envelope" with "total width of the pair".
- Draw both modes side by side and touching, without overlap, and show pair width (24 vs 18 cm) as the readout or next to the margin.

Verdict reason: the key word "envelope" is undefined for a beginner, and the toe-to-heel drawing shows the shoes overlapping, which contradicts "without shrinking either shoe".

## After reading the brief (meta.json)

- The objective ("reducing the maximum pair width without shrinking either shoe") is what the overlapping drawing appears to contradict (finding 2).
- The trust-sheet worked example uses toe 11 / heel 5 (22 vs 16 cm), while the stage uses toe 12 / heel 6 (24 vs 18). Route: fact-checker (consistency).
- Fix route: demo-builder (drawing, wording).
