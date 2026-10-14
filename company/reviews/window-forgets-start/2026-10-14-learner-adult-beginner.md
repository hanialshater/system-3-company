*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: window-forgets-start
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/window-forgets-start/sheet.png, phone, walkthrough 2026-10-14 against http://localhost:3420)

## 1. From the artifact
- Prediction: good. 100% is the trap.
- Shown well: the window highlights the last N tokens, and the fact at 5 goes "no: outside" for windows 4/8/12.
- Mismatch: the question is about window 8, but "Drop at 20 random spots" ran at whatever window was selected (20 here) and gave "20 of 20". The reveal then says the drops land "1–15 inside... on average 8", numbers I never saw. The green dots under tokens are unexplained.
- Told-not-shown: 40% (8 of 20) for window 8 is only stated.
- Layout: the reveal fits.
- Fix: fix the random-drop run to window 8 (or report it for the current window), and show "8 of 20 positions = 40%" on the stage.

## 2. After reading the brief
- The core "outside = not there" is shown. The 40% answer is told.

Verdict: revise
