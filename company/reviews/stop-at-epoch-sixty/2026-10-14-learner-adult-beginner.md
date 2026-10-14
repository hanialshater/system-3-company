*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: stop-at-epoch-sixty
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/stop-at-epoch-sixty/sheet.png, phone, walkthrough 2026-10-14 against http://localhost:3420)

## 1. From the artifact
- Prediction: "degree-7 curve", "gradient descent" and "held-out" are unglossed for this learner, but the options are guessable.
- Mismatch: the correct option is "Early, before step 100", yet the lowest point I could find was at step 100 exactly (0.320). Nothing before 100 was shown, and the reveal itself says "at step 100". The answer and the evidence disagree.
- Told-not-shown: "later it bends to pass through the noise". Between steps 100, 1,000 and 20,000 the curve looks nearly the same on screen, so the overfitting is visible only in the numbers.
- Layout: the phone reveal is clipped (W-135) at the final takeaway line. The predict frame is small.
- Fix: make the option "Early, around step 100" (or show a step below 100). Draw an error-vs-steps curve so the dip is seen, and exaggerate the late-curve wiggle.

## 2. After reading the brief
- The objective (held-out minimum, then a climb) needs a visible dip. The learner only gets three numbers.

Verdict: revise
