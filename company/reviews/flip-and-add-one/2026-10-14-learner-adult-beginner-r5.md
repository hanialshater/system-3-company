*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): flip-and-add-one
lesson version: v2
boundary: adult who can read 8-bit signed numbers with the top bit worth −128 and can add in binary with carries; does not know how to get −5's pattern from 5's, or why that lets a machine subtract by adding (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/flip-and-add-one/sheet.png, 14 frames)
Verdict: launch

## 1. From the artifact

- Predict: "bit" and "flip" are defined in the question. Options 11111010 (flip only), 11111011 and 10000101 (sign bit) each match a real wrong idea. The locked stage shows 5 = 00000101 with the column weights −128…1, which is reading help, not the answer. I took the flip-only trap.
- Explore: Flip all gives 11111010 "= −128 + 122 = −6", so I can see my answer is −6, not −5. +1 gives 11111011 = −5. Add 5 to it gives a sum row of 00000000 with "Carry 1 falls off the 8th bit". Add 9 to it gives 4. Each step gives one visible number, and the cancel-to-zero moment is on stage.
- Reveal: it replays my own path (flip, +1, 5 + ... → 00000000, 9 + ... → 00000100). Every number it quotes was on stage, except the sign-bit counterexample: "10000101 reads −123 here, and adding it to 5 does not give 0" is told. A learner who chose option 3 is answered by a sentence, not a sight.
- Leftover state: the walkthrough tapped every bit afterwards, so the reveal frame shows bits 00000100 = 4 and sum 13 while the text talks about 11111011. That is confusing if you look up.
- Minor layout: a large empty band sits above the controls in every explore frame. "Flip all" is highlighted green even on the locked predict frame, which could read as a hint.

## 2. Earlier findings (r2 review, also v2)

The version has not changed since r2.
1. Binary never taught: **n/a at this boundary** (binary reading is assumed by the brief).
2. −128 place value unexplained: **fixed** (caption).
3. Leftover bit toggles contradict the reveal: **not fixed**.
4. Sign-bit counterexample told, not tested: **not fixed**.
5. "123" off the default path: **fixed**.
6. Trust link "2/5 claims checked": **fixed** (now 5/5).

## 3. New findings

- Minor: "Flip all" button highlighted at predict.
- Minor: empty band above the controls on phone.
- None blocking. At this boundary the core idea (flip + 1 makes the pattern that cancels 5) is seen on stage. No FATAL.
