*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: vaccinate-at-the-peak
lesson version: v2
boundary: an adult with school-level maths and science, new to the topic; no trig, no specialist vocabulary.
Screenshots seen: yes (artifacts/walkthroughs/vaccinate-at-the-peak/sheet.png, phone, walkthrough 2026-10-14 against http://localhost:3420)

## 1. From the artifact
- FATAL: "R0 = 2.9999999999999996" appears in the question and the stage caption. It is a visible float artefact on a number that is exactly 3, and it reads as a broken lesson (same class as twenty-then-ten-off's 28.000000000000004%). Confirmed in the current Demo.tsx: R0 = BETA / GAMMA is printed raw.
- Leak: the third option "Most (about 78%)" is the only specific figure, so it is guessable by elimination.
- Reveal: it says "You also tried... day 1 (70%)". I did not tap day 1 (the slider passed through it), so the reveal describes my actions oddly.
- Shown well: the red grid against the dashed "no vaccine" outline. Day 19 still has 35% never infected.
- Layout: the phone reveal is clipped (W-135) at "on day 19,...". That cuts the "peak is not the end" explanation, which is the core.
- Fix: round R0 for display, make the options comparably specific, and keep the "35% still uninfected" line above the fold.

## 2. After reading the brief
- The objective (a third of the town is still uninfected at the peak) is on the stage but clipped in the reveal.

Verdict: fatal
