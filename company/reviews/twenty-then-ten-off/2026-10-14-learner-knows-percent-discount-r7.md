*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): twenty-then-ten-off
lesson version: v2
boundary: knows-percent-discount (from meta.json learner field). Knows what a percent discount is; does not know that a second discount applies to the already-reduced price.
Screenshots seen: yes (artifacts/walkthroughs/twenty-then-ten-off/sheet.png)
Verdict: revise

## 1. From the artifact (written before reading the earlier review or meta.json)

- Predict: options 30% / 28% / 25%, all exact whole numbers. The locked stage shows a $100 bar, PRICE NOW $100 and TOTAL DISCOUNT "?". No answer before the commit: pass. One soft cue: the stem says "another 10% off the sale price", which nudges a careful reader. 30% is still the natural guess.
- Explore: 20% off cuts a red $20 slice and labels "20% of $100 = $20 off". 10% off cuts a smaller slice labelled "10% of $80 = $8 off", and the readouts go to $72 / 28%. Swap order relabels to "$10 … 20% of $90 = $18", still $72. The second slice is visibly smaller than a tenth of the original bar. Show the why: pass. The "of $80" label is the cause.
- **Reset wipes everything the reveal quotes.** The walkthrough tapped Reset before the reveal. When the reveal opens, the stage shows $100, TOTAL DISCOUNT 0%, and no line items. The reveal then quotes $20, $80, $8, $72, 28%, $10 and $18, none of which is on screen. This breaks "survives Reset" and "the quoted state is still visible on the stage". A learner who reset to play again reads numbers they can't check against the stage.
- "Percent changes multiply (0.8 × 0.9 = 0.9 × 0.8)" is told, but it matches the bar arithmetic I saw. Fine as one sentence.
- Would a first-time learner get the idea from the stage? Yes, before Reset: the smaller second slice and its "of $80" label.

## 2. Earlier findings (2026-10-13 review, v1)

1. FATAL: "28.000000000000004%" shown in an option and the reveal: **fixed** (options and reveal read 28%).
2. The multiply line is told: **not changed** (acceptable as one claimed sentence).

## 3. New findings

- **Revise (top):** after Reset the stage shows $100 / 0% and no line items, yet the reveal quotes $20, $80, $8, $72, $10, $18. Record the finished run (e.g. a "last run" row that survives Reset), or keep Reset from clearing what the reveal quotes.
- No FATAL.
