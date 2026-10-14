*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): pennies-dont-add-up
lesson version: v3
boundary: adult-beginner (meta.json learner field). Knows binary place value (switches worth 1, 2, 4, 8), decimals like 0.1, fractions like 1/2 and 1/4, and that 1/3 is 0.333... Does not know that many decimals have no finite binary form, that computers round to the nearest binary fraction, or IEEE 754.
Screenshots seen: yes (artifacts/walkthroughs/pennies-dont-add-up/sheet.png, 16 frames; 14-step-13.png opened for the number line)
Verdict: launch

## 1. From the artifact

- Predict: the hook is a clean tension. The three options (equal / a bit more / a bit less) are real beliefs. The locked stage shows "Target 0.1", twelve switches 1/2 to 1/4096, and "How does a computer store 0.1?". Nothing leaks.
- Explore: each switch adds its fraction, and the big readout plus "Over by ..." answer at once. The walked path flipped switches in order from 1/2, so it went far over. A learner following the panel ("start with 1/16") would close in. After three flips, "How does a computer store 0.1?" sets the closest 12-switch value (0.10009765625, "still over"). It also draws a number line with an under dot and an over dot either side of 0.1, the two bit patterns, and then three readouts at 53 digits: 0.1 above, 0.2 above, sum 0.30000000000000004 "over 0.3". So the cause (0.1 cannot be made exactly from halves) is something I tried to do and could not finish.
- Where I stumbled: the number line's small numbers (0.000146484375 under, 0.00009765625 over) are distances from 0.1, but nothing says so. I first read them as the values. The reveal then quotes "0.099853515625 under", a number that never appears on stage. The step from "my 12 switches" to "53 binary digits" is a readout, not something I did. That is acceptable as one stated bridge.
- Reveal: it points at the number line and the bit pattern, then at the 53-digit readouts. "The 0011 repeats forever" is told, and the pattern on stage is not marked. The ending line about cents is told context.
- Minor: 75 s chip. Stage text at step 13 is well past 25 words.

## 2. After reading the brief

- doesNotKnow (a), "no finite binary form": **shown**. The learner tries and cannot hit 0.1, and the under pattern .000110011001 carries the repeat.
- doesNotKnow (b), "round to the nearest binary fraction": **shown** at 12 switches. The under and over dots sit either side of 0.1, the over one is labelled "nearer, kept", and the line lengths show it. At 53 digits the same rule is a printed readout. I accept that as one bridge sentence, because the learner has just watched the rule work at 12.
- The objective's "these small errors make 0.1 + 0.2 a bit above 0.3": stood for by the three readouts (above, above, over), and the reveal points at them. Show-the-why passes.

## 3. Earlier findings (v2 review, r5)

1. Why the sum is *over* (not under) was only told: **fixed**. The under/over number line with "nearer, kept" makes the direction a watched rounding at 12 bits.
2. The "try 1/16 first" hint came late: **fixed** (it is in the panel from the start; the stage now says "Flip 3 switches to unlock").
3. The closest pattern did not show the 0011 repeat: **fixed** (the reveal uses the under pattern, which shows it).
4. 75 s chip: **not fixed** (product-owner item).

## 4. New findings

- Minor: the small numbers under the number line (0.000146484375, 0.00009765625) are distances from 0.1 but are not labelled. I first read them as values.
- Minor: the reveal quotes "0.099853515625 under", a value that is never on stage (only its pattern and its distance are). W-150 pattern.
- Minor: stage text after "How does a computer store 0.1?" is well over 25 words.
- No FATAL.
