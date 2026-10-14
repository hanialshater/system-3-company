*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r4): dilute-until-none-left
lesson version: v4
boundary: adult with school-level science; knows kitchen dilution, not mol/L
Screenshots seen: yes (sheet.png has only 2 frames: the walkthrough caught "Dilute automatically" mid-run at step 15 and recorded "The reveal never unlocked". I re-drove it with Playwright, sampling the stage every 500 ms for 20 s, then screenshotted the reveal at scratchpad pw/dil-rev.png)
Previous review: 2026-10-14-learner-adult-beginner-r3.md (v4, launch)

## 1. From the artifact (fresh)

- Predict: 10 / 22 / 60 steps. The locked stage shows the start-tube banner (6.0 × 10²¹ molecules) with STEP and AVERAGE "?". No option is given away.
- Explore (my re-drive): "Dilute automatically" runs fast to step 18 (about 1 s), then slows. At step 20 the stage starts drawing tubes ("this tube: 54 molecules, average 60.2, 20 tubes drawn: 0 empty"). Step 21 gives "this tube: 5, average 6.02" for about 1 s. It stops at step 22: "this tube: 0, average 0.60, 20 tubes drawn: 12 empty". The reveal unlocks there.
- Reveal: 6.02, 0.60 and "12 of 20 drawn tubes were empty; another 20 would differ a little" all match the run I saw. The tube count is live. The r3 minor (55% vs an observed 75% reading as a contradiction) is answered by "would differ a little". On the phone, the reveal card's stage is scrolled so the 22 / 0.60 readouts are cut off at the top. Minor.
- No break in understanding.

## 2. Earlier findings (r3)

- Minor: 55% vs the observed empty share could read as a contradiction: FIXED ("another 20 would differ a little"; the observed count is quoted live).
- r2 items (auto-run stop at 22, quoted states reached, tubes drawn): still FIXED.

New findings:
- N1 (minor): the reveal card's readouts are cropped at the top.
- N2 (route to qa/tooling, not the lesson): the standard walkthrough ends mid-auto-run, so the lesson's own walkthrough artifact shows no reveal. Other evaluators need a re-drive.

Verdict: launch
