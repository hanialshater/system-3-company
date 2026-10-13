*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: duplicates-in-the-test
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (knows "test score" from school; has heard AI "was tested on its training data"; has not met data leakage). Screenshots seen (sheet.png, all 4 frames).

## 1. From the artifact

- Prediction: derivable and still a real guess for most: the stem says the model memorises training answers, says "yes" on anything new, half the true answers are yes, and 20% of items are copies. 0.2 + 0.8 × 0.5 = 60%. 50% is "it can't tell anything new, so a coin flip", 80% is the "20% of the test is free, so 80%" slip. The hook ("What if it had seen those questions before?") hands over the mechanism but not the score.
- The locked stage shows a 4 x 5 grid of blank squares, four marked "copy", with scores "–". Nothing leaks.
- Where understanding first broke: it mostly did not. The one soft spot is that the fresh-item score is exactly 50% by construction (the model "says yes" to everything new), at 20% copies and again at 40%. A learner will take 50% as a finding about the model rather than as the rule the stem set, which is the point the reveal wants, but the stage does not make "this is the coin-flip you were told about" visible.
- What was SHOWN is strong: ticks and crosses on every square, copies as faded always-ticks, "Score fresh items only" dropping 60% to 50%, and the slider to 40% giving 70% full and still 50% fresh. The marks on fresh items redraw when the slider moves, so the 8 of 16 and 6 of 12 are not the same items; fine, but unexplained.
- Told not shown: "Every leaked item adds a free right answer" is visible in the ticks. The closing line "A high test score means something only if nothing in the test also sat in training" is a general statement about real model testing, drawn from one toy; true as a caution, but stated as an absolute.
- Reveal earned: 60% yes, and the full vs fresh gap yes.
- Problems: (1) 50% on fresh items looks like a finding, not the stem's rule; (2) "only if nothing ... sat in training" is absolute; (3) hook gives away the mechanism.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows a model is checked on unseen test data; the objective (copies inflate the score while fresh items stay put) is exactly what the toggle and slider show. Intent and experience match closely.
- Claims verified (4/4).

Verdict: launch
