*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): halve-the-margin-cost
lesson version: v3
boundary: adult who reads poll headlines, knows polls report a plus-or-minus and that bigger samples wobble less; assumes the error halves when the sample doubles.
Screenshots seen: yes (artifacts/walkthroughs/halve-the-margin-cost/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and predict: the doubling instinct (2,000) is the natural pick. The options are ×2 / ×4 / ×8. The locked stage shows the given 1,000 state (±3.1, 95 of 100). Nothing leaks.
- Explore: on the QA path, two slider presses go 1,000 → 4,000 (the slider steps by doublings). The stage shows ±1.5 with two **labelled** dashed ghost bands, "1,000" (outer) and "2,000" (inner). The 4,000 band is visibly half the 1,000 band, and the 2,000 ghost is visibly not half. The legend reads "Dot: one poll. True support: 50%. Band: the margin of error. Dashed: the 1,000 and 2,000 bands." "Double the people" then goes to 8,000 (±1.1). "Show me why" unlocked at 4,000, the state the answer is about.
- Where it could still lose a beginner: on this path the learner never stops at 2,000, so the number "±2.2" in the reveal's first sentence was never on screen. The labelled 2,000 ghost band shows the same fact as a width, which carries the idea, but the reveal quotes a value the learner did not read. Minor. Either show the ghost bands' margins in their labels, or word it as "the dashed 2,000 band".
- Minor: the ghost-band labels "2,000" and "1,000" are tiny and sit close together at the top of the strip.
- Minor: at 8,000 the readout says "97 of 100 inside band". A careful learner may wonder why the "95%" band now holds 97. That is sampling noise, but it is unexplained.
- Reveal: it points at "the dashed 1,000 band" for "half as wide". The square-root rule is named once after the pattern was seen. The caveat about sampling luck is useful. About 70 words.
- No FATAL.

## 2. Earlier findings (r5 review, v2)

1. The gate let the learner skip 4,000: **fixed** (doubling steps; on this path the reveal opened at 4,000).
2. Ghost bands unlabelled: **fixed** ("1,000" and "2,000" labels plus a legend line).
3. Square-root rule told without the pattern seen: **fixed** (the ×1 / ×2 / ×4 bands are on screen together).
4. (v1) The 2,000 step could be skipped: the 2,000 *number* can again be skipped on this path, but its band is drawn and labelled. **Mostly fixed**. Remaining: the reveal quotes ±2.2 (minor, see above).

## 3. Brief check (show the why)

- doesNotKnow (how the margin scales with sample size): shown, as three bands side by side (1,000 / 2,000 / 4,000) with 4,000 at half the 1,000 width. The reveal points at the dashed 1,000 band. "Square root" is the name for what was seen. It meets the told-vs-shown rule.
