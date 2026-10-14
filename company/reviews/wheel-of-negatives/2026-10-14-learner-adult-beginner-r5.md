*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): wheel-of-negatives
lesson version: v2
boundary: from the brief: an adult who knows 8 switches with place values 128 down to 1 reach 255, and knows negative numbers; does not know how negatives are stored or that fixed-width counters wrap. (The v1 review used a narrower "never programmed" boundary; this one follows the brief.)
Screenshots seen: yes (artifacts/walkthroughs/wheel-of-negatives/sheet.png, 6 frames)
Verdict: launch

## 1. From the artifact

- Predict: the question is now plain ("Eight on/off switches (bits) store a whole number, negatives included ... 01111111, which is 127. Add 1."). The locked dial is grey with the pointer on 127 and the top switch's weight shown as a red "?". Nothing gives away −128. The hook "127, the biggest they can hold" does make 128 look impossible, so it pushes me off option 1; but it leaves −128 and 0 (odometer roll-over) as a real choice. A knowing learner from binary-numbers would still reach for 128 because their 8 switches went to 255.
- Explore: "+ 1" moves the pointer one notch across the seam into the red half, the dial reads −128, the bits read 10000000 and the top switch's label becomes −128. Half turn reaches 0, − 1 gives 11111111 = −1, Back to 127 returns. 127 and −128 sitting side by side at the bottom of the circle is the idea, and I see it without being told.
- Still given, not motivated: why the top switch is worth −128 rather than 128. The picture asserts it; the reveal names it. For this boundary that is acceptable: the lesson's point is the wrap, which is shown.
- Reveal: matches the taps (127 + 1 = −128, −128 + 128 = 0, 0 − 1 = −1). "−1 + 1 wraps to 0" is the reverse of what I did, a small told step. Full text and trust link visible on phone. The stage at reveal is scrolled so the top of the dial (the 0 label) is cut (minor).

## 2. Earlier findings (v1 review, 2026-10-13)

1. "8-bit signed" / "two's complement" jargon in the question: **fixed** (question in plain words; the term appears only in the reveal).
2. Hook hints at overflow: **not fixed** (minor; see above).
3. −128 weight and half-turn button unmotivated: **partly**; still given by the picture, acceptable at this boundary.
4. Reveal clipped mid-sentence: **fixed**.

## 3. New findings

- Reveal-frame dial crop (minor). No FATAL.
