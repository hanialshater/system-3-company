*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: penalty-on-wiggle
lesson version: v2
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/penalty-on-wiggle/sheet.png, phone, walkthrough 2026-10-14 against http://localhost:3420)

## 1. From the artifact
- Prediction: inside my boundary only as a guess. "Penalty on large coefficients (ridge)", "degree-7" and "λ" are unexplained, and I don't know what coefficients do to a curve.
- Shown: at λ 0.001 the training miss is 0.13/0.08 and held-out 0.41/0.47.
- Told-not-shown: the reveal's central contrast, "0.58 with no penalty", was never on screen. With no penalty the readouts were "–" while locked, and the slider was never back at 0. "490 of 500 data sets" and "push to 10... flatter" are also told.
- Layout: in the reveal frame the stage shrinks to a tiny chart.
- Fix: show the no-penalty curve and its held-out miss as a ghost or baseline readout next to the current one. Give one plain line on what the penalty does ("discourages wild bends").

## 2. After reading the brief
- The objective (trade training fit for held-out) needs the before/after comparison, and that is only in the text.

Verdict: revise
