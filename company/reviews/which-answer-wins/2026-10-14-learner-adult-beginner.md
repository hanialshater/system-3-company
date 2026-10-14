*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: which-answer-wins
lesson version: v1
boundary: adult beginner (knows models can be trained with rewards and people can compare two answers; school maths, no logarithms or e, no odds).
Screenshots seen: yes (sheet.png, phone, 6 frames)

## 1. From the artifact

- Where I first needed an idea I didn't have: the question stem. "P(A preferred) = 1 / (1 + e^-(rA − rB))" is the whole problem, and I can't read it (e, negative exponent, P(·) notation). My choice among 0.75 / 1.1 / 3 was a pure guess, with 0.75 the "it's just the percentage" reflex.
- The predict stage already draws the S-curve and the dashed "people: A wins 75%" line, and they visibly cross just past 1 on the gap axis. Anyone who reads graphs can read 1.1 off the locked stage, so for them the prediction is given away; for me it is a blind guess. Either way it isn't a prediction about an idea.
- Explore is good once there: Gap 0.75 → 67.9% "too low", 1.1 → 75.0% "yes", 3 → 95.3% "too high". The dot riding the curve to meet the dashed line makes "fit the gap so the curve hits what people did" concrete.
- Told-not-shown: "75% to 25% is odds of 3 to 1, and the gap is ln 3" uses odds and ln, neither introduced. The real takeaway ("the model never stores anyone's score; the gap is fitted to reproduce how often people preferred one") is told, and the stage only partly supports it.
- Layout: reveal clipped on phone (W-135): "...Bradley-Terry rule used to train reward models from human comparisons" is cut. Not the explanation, so not blocking. The reveal stage shrinks to an unreadable strip.

## 2. After reading the brief (version only)

- Version 1, 4 claims shown as checked.

## Fix suggested

Replace the formula in the stem with plain words ("a bigger gap means A wins more often; gap 0 means 50/50"), hide the curve until lock-in, and gloss "odds 3 to 1" (three wins per loss) before ln 3, or drop ln.

Verdict: revise
