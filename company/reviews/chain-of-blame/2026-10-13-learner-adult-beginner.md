*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: chain-of-blame
lesson version: v1
boundary: adult beginner with school algebra; has heard "slope" but not partial derivatives or backprop.
Screenshots seen: yes (sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- First idea I didn't have: "the loss's slope with respect to w1" in the question. The stage line "Slope = loss change ÷ nudge size" rescues it, but it is greyed out while locked, so at predict time I am choosing between 4 and 24 by guess. The real decision a beginner can make is "0 vs not 0", which is a fair prediction.
- Explore shows it well: nudging w1 by 0.001 lights up h, y and loss (3.001, 6.002, 3.001, 4.0040), slope 4.0. The highlighted chain makes "w1 reaches the loss through w2" visible. Nudge w2 gives 24.0; a good contrast.
- Told-not-shown: "2(y − 1) × w2 × x" in the reveal. A beginner does not know where 2(y − 1) comes from (derivative of the square). The number 4 is earned by the nudge; the formula is told.
- Reveal answers my question (does the early weight get blamed? yes, scaled by what is downstream).
- Layout: in step 1 the "loss 4.0040" box is cramped against the right edge of the chain; values fit but barely. The stage leaves a large empty gap above the buttons in explore frames.

## 2. After reading the brief

- Brief assumes the learner knows gradient descent moves against the slope; my boundary is a bit below that and still mostly follows.
- Suggested fix (for the builder): make the slope hint legible (not greyed) during predict, and add one clause for 2(y − 1) ("how fast the squared error grows at y = 3").
