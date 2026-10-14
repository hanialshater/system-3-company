*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): switch-half-off
lesson version: v1
boundary: an adult beginner with no machine-learning background; knows averages and coin flips.
Screenshots seen: yes (artifacts/walkthroughs/switch-half-off/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- Predict: hook "Does the output shrink?" leans slightly toward "2" but is a fair question. The locked stage shows four units at 1, an empty chart (0/4/8), passes 0, no leak. The question states the doubling rule, so the stage has to make it believable, not discover it.
- Explore: "One pass" gives one survivor at 2, three dashed 0s: total 2, and the dashed "all on: 4" line appears. +20: dots scatter at 0/2/4/6/8, the purple running average wanders up to 4.48. +200: the average line hugs the dashed 4 line, 3.96 after 221 passes. Single totals jumping 0 to 8 while the average sits on 4 is visible, which is the idea.
- Reveal: 221 passes and 3.96 match the stage. "On half the time, counts double, so its average is 1" is a one-line arithmetic I could follow from what I saw. The seed spread (3.78 to 4.23) is a fair hedge.
- Told-not-shown: "stopping units from leaning on particular partners" is the *purpose* of dropout and nothing on stage shows co-adaptation. It is a single closing sentence; a beginner will take it on trust.
- Layout: at reveal the toy label and description scroll off the top of the stage; the chart is still readable. The x-axis reads "pass 30" while only 1 or 21 passes exist (it rescales to 221 later); harmless.

## 2. Earlier findings (v1 review, 2026-10-13)

meta.json still says version 1, so I compared the same version.

1. "Units"/"training" never tied to a neural network until "Dropout" in the last line: **not fixed**. I did not trip on it this time because the toy is self-contained, but the learner still finds out the topic's name at the very end.
2. "Leaning on particular partners" told, not shown: **not fixed** (same as my finding above).
3. Seed-variation sentence ("5th to 95th percentile") is jargon: **not fixed**.
4. Reveal chart thumbnail small: unchanged; readable.

## 3. New findings

- None new beyond section 1. All carried items are minor; the core idea (random halving plus doubling leaves the average at 4) is seen on stage before it is explained. No FATAL.
