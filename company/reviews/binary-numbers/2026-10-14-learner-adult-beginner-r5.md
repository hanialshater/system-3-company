*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): binary-numbers
lesson version: v3
boundary: adult who uses a phone daily, has never programmed
Screenshots seen: yes (artifacts/walkthroughs/binary-numbers/sheet.png, all 11 frames)
Verdict: launch

## 1. From the artifact

- Predict: "Eight on/off switches, each worth double the one to its right: 1, 2, 4, 8 … How many different numbers can they show, counting 0?" The locked stage shows eight switches labelled 128…1 with ×2 arrows, a big "0" and "pattern 00000000 = 0". Nothing leaks. The options 8 / 16 / 128 / 256 cover the natural wrong guesses (8 = one per switch).
- Explore: turning the switches on from the left builds 128, 192, 224 … 255. A running sum ("128 + 64 + 32 …") under the big number shows the add-up rule without words. At 255 the caption says "All 8 on = 255: one less than the next switch, 256. With 0, that is 256 numbers." Then +1 rolls every switch back to 0, outlined in amber, with "255 + 1 = 256 needs a ninth switch". The rollover is the most memorable frame and it is shown, not told.
- I picked 8. The stage corrected me before the reveal did: I saw 255 as the largest and 0 as the smallest. What the stage does not show is that every number in between is reachable, and reachable only one way. "Every pattern in between names exactly one number" is told in the reveal. For this boundary that is a small leap, and most people will accept it.
- Reveal: "Your biggest was 255", "128 = 127 + 1" and the rollover all match what I saw. The panel's suggested "+1 from 127" (which would show the carry ripple 01111111 → 10000000) was not on my path, so "each switch is worth one more than all to its right" is told. The 255 rollover covers the same idea.

## 2. Earlier findings (r2 review, v3)

1. Carry from 127 off the path ("128 = 127 + 1" told): **not fixed**, still minor. The gate does not need +1 from 127.
2. 70s badge: **not fixed** (still 70S).
3. Trust link "5/8 claims checked": **fixed** (now 8/8).
4. Items fixed in r2 (pattern count visible, 512/four billion removed, bit/byte defined): still fixed.

## 3. New findings

- Minor: the stage caption at 255 already states "that is 256 numbers", so the answer is told on stage one tap before the reveal. It is earned by the previous eight taps, so it is not a leak, but the stage says it rather than letting the learner count.
- Minor: "every pattern names exactly one number" is only told. One cheap on-stage cue: a counter of distinct numbers seen so far, or the +1 from 127 required as a step.
- Minor: the duration chip reads 70S, over the 60 s format (product-owner item).
- Minor: the "+1" button is drawn green and active-looking on the locked predict stage.
- No FATAL.
