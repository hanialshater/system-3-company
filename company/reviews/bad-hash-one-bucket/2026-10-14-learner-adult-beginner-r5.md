*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): bad-hash-one-bucket
lesson version: v2
boundary: adult who knows a hash table picks a slot for each key and can do division with remainder; has never programmed.
Screenshots seen: yes (artifacts/walkthroughs/bad-hash-one-bucket/sheet.png, 13 frames)
Verdict: launch

## 1. From the artifact

- Predict: key and mod are defined, with a worked example (23 goes to slot 3). 1 / 5 / 10 is a fair choice. The hook ("Does each key get its own?") leans slightly towards "no" but does not say how many. A learner who does the arithmetic gets 1; one who trusts "a slot for every key" says 10. That is a real prediction.
- Explore: each tap stacks a key in slot 0, turning red. "STEPS TO FIND" climbs 1 to 10 and "SLOTS USED 1 of 10" never moves. The pile-up and the slow lookup are both seen. "Switch rule to mod 7" spreads the same keys over 7 slots, the caption explains why 7 to 9 stay empty, and steps to find 100 fall to 2.
- Reveal: every number quoted (slot 0, 9 empty, 10 steps, 7 slots, 2 steps) was on stage. The "hash" name comes after the experience.

## 2. Earlier findings (r2 review, v2)

1. Ten separate taps is long for 60 s: **not fixed** (still 10 taps; minor).
2. Trust link "1/5 claims checked": **fixed** (now 5/5).

## 3. New findings

- Minor: in the predict frame the readouts under the slots (SLOTS USED / STEPS TO FIND A KEY) are cropped at the bottom of the stage.
- Minor: in the reveal frame the stage is scrolled, so slot 0 (holding 70) is cut off at the top; "7 of 10" still shows the spread.
- Minor: mod 7 still has collisions (red pairs). The reveal says "a good hash breaks up the patterns", which is fair, but a learner may think mod 7 is that good hash. The stage shows it is better, not collision-free.
- No FATAL.
