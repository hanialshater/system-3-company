*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (round 2): which-answer-wins
lesson version: v1
boundary: an adult beginner who has heard chatbots are trained on "which answer people liked"; school maths, cannot evaluate e^-x in their head.
Screenshots seen: yes (sheet.png, 6 frames, phone viewport). Re-review after the kit fix for clipped reveals (W-135); written fresh from this walkthrough.

## 1. From the artifact

- Prediction: "People pick A over B in 75% ... P(A preferred) = 1 / (1 + e^-(rA − rB)). The reward gap is: 0.75 / 1.1 / 3." The formula is opaque to me; I cannot compute it, so I fall back on "75% means 0.75", which is the intended misconception. Fine.
- Leak: the locked stage already draws the S-curve and the dashed "people: A wins 75%" line, faint but visible, and they cross just past 1 on the "reward gap" axis. Since I could not use the formula, the chart was the obvious place to look, and it shows roughly 1.1 before I commit. Less blatant than a printed number, but the prediction can be read off the stage.
- Explore: the three gap buttons plus the slider are clear; MODEL: A WINS 67.9% "too low", 75.0% "yes", 95.3% "too high". The dot riding the curve to the dashed line is the moment. Good.
- Reveal: "matched 75% at a gap of 1.10" and "A gap of 3, which you tried, predicts 95.3%" are both things I did. "75% to 25% is odds of 3 to 1, gap is ln 3" is told; ln will be new to many beginners but it is a bonus line.
- Phone clipping (the reason for round 2): fixed. Full reveal including the Bradley-Terry line and trust link visible on the phone frame.
- Where understanding first broke: only the formula in the question; the stage carried me.
- Reveal earned: yes for "the gap is fitted to reproduce the win rate"; "never stores anyone's score" is told.

Fixes (owner: builder): hide or blank the curve (keep the axes and the 75% line) until the prediction is locked, then draw it as the first explore step.

## 2. After reading the brief

- Objective (gap fitted to reproduce win rate; 3-to-1 odds give ln 3 ≈ 1.1; learns only who won) is delivered by the explore. The stated misconception ("stores a score each human gave") is not what the prediction tests; the prediction tests "75% means gap 0.75", a close cousin. Acceptable.
- The locked-stage curve is the only thing keeping this from launch on my reading: it is a one-line fix (draw the curve after the commit).
- 4 claims verified by others; I cannot vouch for them. The clipping issue from round 1 is resolved on this build.

Verdict: revise
