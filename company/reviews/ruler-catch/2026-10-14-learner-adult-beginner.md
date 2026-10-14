*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: ruler-catch
lesson version: 1
boundary: adult beginner; knows reflexes take time and falling things speed up; has never turned a distance into a time.
Screenshots seen: yes (sheet.png, 5 frames, phone)

## 1. From the artifact

- Prediction: 0.02 / 0.2 / 2 s are an honest order-of-magnitude choice. Good.
- Shown well: the ruler beside a non-linear "time scale" (0.10 s at about 5 cm, 0.20 s at about 20 cm). A catch at 16.4 cm reads "= 0.18 s"; five more drops cluster 12-25 cm. The uneven spacing of the time ticks shows "distance grows with the square of time" without a formula.
- FATAL: after I tapped "Clear" (an offered control) and then "Show me why", the reveal's first line reads: "Your 0 catches closed between **Infinity** and **-Infinity** cm, which is Infinity to NaN s on the scale." That is a visible numerical defect in the one sentence that reports my result. A beginner will think the lesson is broken. "Show me why" stays enabled after Clear, so any learner can hit it.
- Where I first needed an idea I didn't have: "each extra centimetre is about 5 thousandths of a second" is told; fine.
- Layout: reveal fits on phone.

## 2. After reading the brief

- doesNotKnow: d = ½ g t² as a clock. The stage delivers it; the reveal's empty-state sentence breaks it.

## Fix suggested
- When catches = 0, either disable "Show me why" or fall back to a sentence without the range (or remember the last non-empty set). Never print Infinity/NaN.

Verdict: fatal
