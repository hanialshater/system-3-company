# Learner review: Prices sort the buyers (boundary: one-market-only)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:52Z (phone, option 1 = "$0", wrong pick, so "Not quite"; path Raise, Run, Compare), sheet.png seen (all 5 frames), Demo.tsx read for the branches the script does not show (the "raised three times" reveal path).

Boundary used (the lesson's own): knows that a price is raised when too many people want an item, and how supply and demand set one price in one market. Has never seen raising prices only on the over-wanted houses, one dollar at a time, or that the resulting assignment has the highest total value.

## Findings (artifact only)

1. **Where it first asks for something I lack: the predict sentence.** "Raise by $1 every house in the smallest group that more buyers want only from than it has houses." I cannot parse "want only from"; it is Hall's condition in one breath. The stage hints at it (the dashed box around column a), but the sentence is the rule I am asked to apply.
2. **The question I am asked is not the lesson.** The prediction is "Where does a's price stop?", a procedural number. The title ("Prices sort the buyers") and hook ("Can rising prices find the best match?") are about matching and total value, and no prediction ever asks that. A learner who guesses $3 is right about a number and has predicted nothing about sorting.
3. **Answer visible before predicting.** The hook and title already say the prices do find the match. The option "$0" is ruled out by the question (it says prices are raised) and "$12" is a number from the grid, so the choice is really $3 or a guess.
4. **The mechanism is skipped on the path I took.** I pressed Raise once (a to $1) then Run. Run goes to Round 3 (a $3, b $1, c $0) with no intermediate frame, so I never saw why b rose. The reveal's path sentence for that case is only "stopped at a $3, b $1, c $0 after three rounds". The one non-obvious step, raising a and b together because a and b are wanted by too many buyers, only appears in the reveal if the learner raised all three times by hand.
5. **Told vs shown.** Shown: the six totals (21, 23, 14, 17, 15, 16) with 23 highlighted, which is the strongest part. Told: "stopped at the lowest prices that clear this market", "for any values, such prices exist and their match has the highest total". "Lowest" and "any values" rest on one 3 x 3 example.
6. **Legibility.** On the phone frame the value-minus-price cells ("12 − 0") are very small grey print and the house prices above the grid are tiny. The rule line reads "Raise $1 on the smallest group  too many want" with a dashed-box icon in the gap; without the icon the sentence is broken.
7. **"Wants" versus "gets" is carried by two small marks** (a ring dot and a filled cell) with a one-line key. After Run I read the filled cells as "gets" correctly, but only because the reveal says "x-a, y-c, z-b".
8. **Reveal quotes only states reached.** The numbers (a $3, b $1, c $0, 23, "the highest of the six totals you compared") match frames 03 and 04. "z ends on b although it values a at 7": checkable from the grid (7 versus 5), a nice concrete line.
9. **Controls.** Raise, Run, Compare, Restart all worked. After the market clears, Raise and Run grey out, which is clear. Compare is unavailable before the market clears, so I could not look at the six totals first, which is right.

Confidence: moderate. Findings 2 and 4 are the ones I would stand on.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: the question I am asked to predict (a's final price) is not the thing the lesson is about (that prices find the highest-total match), and the Run path skips the one step (raising a and b together) that explains why b rose.
