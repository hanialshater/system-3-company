*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): which-answer-wins
lesson version: v2
boundary: an adult beginner who has heard chatbots are trained on "which answer people liked"; school maths, cannot evaluate e^-x in their head.
Screenshots seen: yes (artifacts/walkthroughs/which-answer-wins/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact

- Predict: the locked stage now shows only the axes and the dashed "people: A wins 75%" line; no curve. The formula in the question is still opaque to me, so I fall back on "75% means 0.75", which is the intended pull. Nothing to read off.
- Explore: the curve appears once I commit. Gap 0.75 gives 67.9% "too low", Gap 1.1 gives 75.0% "yes" (dot turns green on the dashed line), Gap 3 gives 95.3% "too high", the slider at 2.90 gives 94.8%. I see for myself that the gap is not the percentage and that a bigger gap means "more sure". That is the idea, from the stage.
- Reveal: "You matched 75% at a gap of 1.10" and "A gap of 3, which you tried, predicts 95.3%" are both things I did. "Odds of 3 to 1, ln 3" is told; ln will be new to many beginners, but it is a bonus line, not the point. "Never stores anyone's score ... sees only who won" is told, and is consistent with the stage (the only input is the 75%).
- Minor: the chart shifts down about 35 px between predict and explore (the 100% tick moves), a small layout jump.
- Minor: at reveal the stage is scrolled so the "people: A wins 75%" label is cut at the top edge; the text below is fully visible.

## 2. Earlier findings (r2 review, v1)

1. Locked stage drew the S-curve, so the answer could be read off before committing: **fixed** (curve hidden until commit).
2. Phone clipping of the reveal: **fixed** (still fixed; full reveal and trust link visible).
3. ln 3 told, new to beginners: **unchanged**, acceptable as a bonus line.
4. Prediction tests "75% means 0.75" rather than "stores a score": unchanged; acceptable.

## 3. New findings

- The two minor layout items above. No FATAL.
