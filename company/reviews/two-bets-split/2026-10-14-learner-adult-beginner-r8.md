*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r8): two-bets-split
lesson version: v6
boundary: adult-beginner. Knows expected value as the average over many tries and that two coin flips land four ways; does not know that splitting across independent bets cuts the chance of the worst outcomes without changing the average, or that this needs independence (meta.json learner field, same tag as r7).
Screenshots seen: yes (artifacts/walkthroughs/two-bets-split/sheet.png, 5 frames, recorded 2026-10-14T11:17Z, build 5 walkthrough; 02-step-1.png opened at full size)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- **No answer before the commit: pass.** Title "Split the money, keep the average" names the average, not the loss chance. Options 50% / 25% / 0% are all numbered. The locked chart shows only the "average +5%" line and the −10% / +20% axis. Nothing marks 25%.
- Explore: the slider (two presses) goes to 3 bets. Bars show −10% 12.5%, 0% "break even" 37.5%, +10% 37.5%, +20% 12.5%. CHANCE OF A LOSS 12.5%, AVERAGE +5%. The row "Chance of a loss seen: 1 bet: 50% · 2 bets: 25% · 3 bets: 12.5%" keeps the 2-bet case, which QA's path stepped over. "Bets move together" snaps to two 50% bars and adds "3 bets together: 50%". Show the why: pass (the bars bunch toward the middle; the row records each step).
- Labels in the chart ("break even", "average +5%", bar values) are readable at full size in explore.
- Reveal quotes what you saw: pass for numbers (25%, +5%, 50% are in the row and readouts).
- **The reveal fits with its picture: fail (revise).** At 390×844 the reveal frame starts at the slider label. The chart is off screen. The reveal says "as in the row under the chart" (the row is visible) and "as you split further the bars bunched around +5%". Those bars are not on screen when the reveal opens. The reveal is about 105 words with the model line (110 with the verdict line), over 90.
- The new model line "A model with made-up numbers: in it, bets either move independently or all together. Not advice." reads as honest and does not overclaim.

## 2. Earlier findings (r7, v5)

r7 gave launch with no blocking finding. It predates the fit rule (decision 2026-10-14-reveal-fits-with-its-picture). The finding above is new under that rule, not a regression in the lesson.

## 3. New findings

1. **Revise:** the reveal points at "the bars bunched around +5%", and the chart is above the screen when the reveal opens at 390×844. Reveal about 105 words (> 90). Cut to ≤ 90 words and get stage-top crop 0 with the bars visible. Candidate: the muted model line could move onto the stage chip, which already says "Model: …". The category manager decides.
- No FATAL.

## 4. After reading build.md

Pre-flight v6 records only the c6 rewording of the muted line, with build, QA and walkthrough not run. There is no item 7 (phone fit). Findings unchanged.
