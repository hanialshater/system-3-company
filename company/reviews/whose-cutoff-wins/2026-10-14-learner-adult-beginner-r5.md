*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): whose-cutoff-wins
lesson version: v2
boundary: adult beginner (knows pass/fail cutoffs on a test; has heard "AI bias" in the news; no ML).
Screenshots seen: yes (artifacts/walkthroughs/whose-cutoff-wins/sheet.png, 3 frames)
Verdict: revise

## 1. From the artifact

- Predict: the question is dense but fair, and "At 40, halfway" is a tempting compromise. The hook "So it treats everyone the same. Right?" suggests the answer is no, but it does not say which cutoff wins. The locked stage no longer colours mistakes ("A WRONG ?", "B WRONG ?"). It is a small thumbnail on phone, and the grid is hard to read at that size.
- Explore: the panel says "Move the cutoff to 40, then 50". The recorded path dragged the slider from 30 straight to 50, and "Show me why" unlocked at once. At 50 the stage clearly shows two red B dots between 30 and 50, "A WRONG 0 of 90" and "B WRONG 2 of 10". That unequal error is visible and is the strongest moment.
- **Where it loses me (main finding):** the reveal says "You saw 40: it fixes one group B person and breaks nine group A people, so the cutoff stays put." I did not see 40. The gate let me through without it. The reason 50 wins, rather than just being where errors are lowest, is the comparison with 40, and that comparison is still told, not shown. A learner who predicted 50 (as here) gets "Your prediction held" and never tests the alternative.
- "Let the model learn a step" was never pressed. So "the model learned this cutoff" is something I read in the stem, not something I watched happen. "Fewest mistakes: 2" appears as a statement at 50, but I never saw any other total to compare.
- "behind 98% right" is a compressed phrase. I had to reread it to see it meant "the overall 98% accuracy hides it".

## 2. Earlier findings (v1 review, 2026-10-13)

1. The path never stops at 40; the 40-vs-50 comparison is only told: **not fixed**. The panel now asks for it, but the gate does not require it, and the reveal claims "You saw 40" even when the learner did not.
2. "Let the model learn" not used: **not fixed**.
3. Locked stage showed costly red at 30 before the answer: **fixed** (no red shown while locked).
4. Reveal's Gender Shades paragraph clipped: **fixed**.
5. Badge reads 70 s: **not fixed** (still "70S"; product-owner item).

## 3. New findings

1. Main: require a stop at 40 (show A 9 wrong, B 1 wrong, total 10) before unlocking, or make "Let the model learn a step" the path that walks from 40 to 50 with totals. The reveal must not say "You saw 40" unless the learner did.
2. Minor: a running total ("10 mistakes" vs "2 mistakes") on the stage would make "fewest" something I can see.
3. Minor: the predict thumbnail is too small to read the grid on phone.
4. Note for the fact-checker: the trust link reads "4/5 claims checked".
- No FATAL.
