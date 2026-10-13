*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: twenty-then-ten-off
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (knows what a percent discount is; assumes two discounts add).

## 1. From the artifact

- Prediction: the options read "30%", "28.000000000000004%", "25%". The second one is a computer rounding artefact printed to the learner. It is the only option that is not a round number, so it is the answer by elimination, with no sums needed: the question has been given away by a display defect. It also looks like an error to a beginner, who may think the lesson is broken or reject it as "nobody says that".
- The same string appears in the reveal heading ("Not quite: it was 28.000000000000004%") and in the sentence "The coat ended at $72: 28.000000000000004% off." That is a false precision on a number that is exactly 28%, in the one place the learner reads the result. The stage itself says 28%, so the artefact is inconsistent with the stage.
- What I saw otherwise is strong: 20% off gives $80 ("20% of $100 = $20 off"); 10% off then gives $72 ("10% of $80 = $8 off"), total 28%. Swap order: "10% of $100 = $10 off, 20% of $90 = $18 off", still $72. The line items make the idea visible, including that order does not matter.
- Where understanding first broke: the prediction screen, because of the odd number. After that nothing broke.
- The reveal states "Percent changes multiply (0.8 x 0.9 = 0.9 x 0.8)", which is told but fits the stage numbers.
- Reveal earned: yes for 28% and for order not mattering; the multiply line is told.
- Problems: (1) the printed value 28.000000000000004% (option and reveal), which both leaks the answer and reads as an error; (2) none else material.
- FATAL: the displayed answer "28.000000000000004%" in the question options and the reveal is a visible numerical defect (a float-rounding artefact shown as a figure, and not what the stage says). Fix the display to 28% before launch.

## 2. After reading the brief

- The objective is that stacked discounts multiply: $72, 28% off, order irrelevant. The artifact delivers it except for the display defect, which the brief could not have intended (it says 28%).
- Claims: 5 unverified in meta.json; I cannot vouch for any, including 28%.

Verdict: fatal
