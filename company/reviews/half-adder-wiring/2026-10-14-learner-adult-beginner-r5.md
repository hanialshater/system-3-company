*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): half-adder-wiring
lesson version: v2
boundary: adult who uses a phone daily, has never programmed or seen binary.
Screenshots seen: yes (artifacts/walkthroughs/half-adder-wiring/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- **Predict leaks its own answer (main finding).** The locked stage, visible before "Lock it in", says "Goal: carry,sum = 00, 01, 01, 10 for 0+0, 0+1, 1+0, 1+1". The last pair is the answer to the question asked underneath ("For 1 + 1, what are the digits (carry, sum)?"). The stem also says "counting goes 0, 1, 10, 11", which gives it away a second time. A learner who reads the stage is copying, not predicting. The wrong pick in this path ("carry 1, sum 1") only shows a skimmer, not a real misconception. The hook ("Can you wire two gates so that they add 1 + 1 correctly?") is a better question than the one actually asked.
- Explore: wires light green when carrying a 1, outputs show 0/1, and the caption defines each gate in plain words ("XOR: 1 if exactly one is 1. AND: 1 only if both are 1."). Choosing XOR for sum and AND for carry jumps "ADDS RIGHT ON" to "4 of 4 inputs" and unlocks the reveal. That is a satisfying click.
- "4 of 4 inputs" is scored on input pairs I never set. Here I only ever set 1+0 and 1+1 before getting 4/4, so I trust the counter rather than seeing four rows add up. A small four-row table that fills in would show it.
- Gate buttons say "Sum gate: OR" and cycle when tapped. Nothing says that tapping changes the gate. Tapping "Sum gate: OR" and getting XOR felt like a mis-tap.
- Reveal: honest about the path ("When you had the circuit adding right"). The half adder name and "the wiring does it" follow from what I did.

## 2. Earlier findings (r2 review, 2026-10-14, and v1 via r2)

1. Vocabulary (binary, carry, gates) missing before the question: **fixed**.
2. Target arithmetic never stated: **fixed**. Fixing it introduced the leak above, because the goal row is now on the locked stage and answers the prediction.
3. Reveal after Reset spoke of "your working circuit": **fixed**.
4. OR never defined: **fixed**.
5. Chaining told only: **fixed** (removed).
6. Hook leaked "wiring": **fixed**.
7. (r2 minor) No "tap to change" hint for cycling gates: **not fixed**.
8. (r2 minor) Brute-forceable with the score: **not fixed** (still minor).
9. (r2) Trust link 1/3 checked: **fixed** (3/3).

## 3. New findings

1. Main: hide the goal row's 1+1 entry (or the whole row) until lock-in, or ask a prediction the goal row does not answer. One option is "Which gate gives the sum digit?", where OR is the natural wrong answer and the stage then shows OR failing at 1+1.
2. Minor: show the four input rows with a check per row, so "4 of 4" is visible.
3. Minor: add a "tap to change gate" cue.
4. Note: meta.json "version" is still 2, the same as the r2 review. If the lesson changed since r2, the version was not bumped (route to demo-builder).
- No FATAL.
