*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): resize-photo-frame-ratio
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Uniform scaling keeps the width-to-height ratio. In this frame, preserving a four-to-three photo may leave margins; forcing both dimensions to the frame would distort that ratio.)
Screenshots seen: yes (artifacts/walkthroughs/resize-photo-frame-ratio/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Stretch to frame"; after lock-in the stage showed Empty frame area 0 cm² with the photo filling the frame; tapped Keep ratio (66.67 cm²); slid frame width to 32 (106.67 cm²); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build.)

1. **Where understanding first broke: the only number makes keeping the ratio look bad.** The readout is "Empty frame area": 0 cm² for stretch, then 66.67 cm² and 106.67 cm² for "Keep ratio". So the one measure on stage favours the option the lesson calls wrong. Distortion, the actual cost of stretching, is never measured or drawn. In stretch mode the triangle is only slightly wider, and nothing points out that it is distorted.
2. **The predict question is answered by an option's name.** "Which layout preserves the photo's proportions?" with "Keep ratio" as an option. I chose "Stretch to frame" only to see the other path. A real beginner would pick "Keep ratio" without learning anything.
3. **The reveal does not answer my question.** "Not quite. The current keep ratio setting gives 106.67cm²." That reports empty area, which was not the question. The sentence about distortion is the right content, but nothing on stage shows it.
4. The keep-ratio drawing shows margins on all four sides. At 30×20 with a 4:3 photo, the margins should only be at the left and right (the height fills). Small, but the picture is my only evidence.
5. "Same outcome" is not a sensible option here.

Fixes (for the builder):
- Draw the stretched photo visibly distorted (the triangle squashed) next to the kept-ratio one with margins.
- Make the readout the shape (photo ratio shown: 1.5 vs 1.33), or show both distortion and margin.
- Reword the question so it does not contain the answer.

Verdict reason: the stage measures only empty area, which favours stretching, and never shows the distortion, so the reveal's point is not on stage.

## After reading the brief (meta.json)

- The objective's distortion half ("forcing both dimensions to the frame would distort that ratio") is not visible on stage; only the margin half is measured (finding 1).
- The trust-sheet worked example ("30 × 22.5 cm, leaving 7.5 cm of margin"; "40 × 30 overflows") does not match the stage's 30×20 frame, where a 4:3 photo is 26.7 × 20. Route: fact-checker.
- Fix route: demo-builder.
