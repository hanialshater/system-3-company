*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): dilute-until-none-left
lesson version: v2
boundary: an adult with school-level science; knows dilution in the kitchen sense; does not know what mol/L means.
Screenshots seen: yes (artifacts/walkthroughs/dilute-until-none-left/sheet.png; the walkthrough's last frame was mid-animation at step 8, so I re-drove it with a probe that waited 10 s and sampled every 250 ms)
Verdict: revise

## 1. From the artifact

- Predict: the stage while locked now shows "Start tube: 10 mL of 1.0 mol/L dye = 6.0 × 10²¹ molecules" and "?" readouts. No button names an option. The answer is not visible before predicting.
- Explore: "Dilute automatically" runs about one step per 0.45 s from 0 to 24 and stops; the reveal then unlocks. Sampling every 250 ms I saw step 21 (5 molecules, average 6.02) and then step 24 (average 0.01). **Step 22 (average 0.60), the moment the average crosses 1, is on screen for under half a second** and the run does not pause there.
- Reveal: quotes "at step 22 it was about 0.60" and "about 55% of tubes hold none and the rest hold one or more". On the automatic path the 0.60 flashed by, and the 55% is never shown: it would need "Draw another tube" pressed several times at step 22, which nothing asks for and the gate does not require. **The reveal quotes values the learner did not visit.**
- Shown well: start count on stage, the log bar shrinking to the "1 molecule" tick, dots appearing from step 19.

## 2. Earlier findings (2026-10-13-learner-adult-beginner.md)

1. Locked buttons "Repeat to step 21/22" gave the answer by elimination: **fixed** (now "Dilute automatically" / "Dilute 1:10 once").
2. Start count 6.0 × 10²¹ never on stage: **fixed** (banner at step 0).
3. "By chance a few still catch one" told, not seen: **not fixed on the default path** ("Draw another tube" exists but is optional and the 55% is never shown).
4. Tiny labels in the reveal frame: **partly fixed** (tube labels at 24 are small but legible on phone).

## 3. New findings

- **Revise:** the automatic run passes step 22 without stopping, and the reveal unlocks at 24 without the learner having dwelt on 21 vs 22 or drawn any extra tubes; the reveal's 0.60 and 55% are not earned on that path.
- No FATAL.
