# Learner review (final): Prices sort the buyers (boundary: one-market-only)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough at c9e4df0d (phone), sheet.png (all 5 frames). Demo.tsx reveal read: when not all three raise rounds were seen the reveal drops "You saw three raises..." and says only "Prices started at $0 and stopped at a $3, b $1, c $0 after three rounds." Boundary: understands one market with one price; has never matched people to different items.

## Findings (artifact first)

**Idea the learner lacks:** prices raised only where too many want the same houses end where each buyer can take a different house, and the resulting match has the highest total value.

1. **Answer visible before predicting?** Mild. Title "Prices sort the buyers" and hook sound benign; the correct option ("the highest total value") is first and good-sounding. A learner picks it by tone and then gets "Your prediction held", which rewards a guess.
2. **Predict question is heavy.** "Among the six possible matches, that one has" refers to a match defined three clauses earlier. "Total value" is never defined: I had to guess it means the sum of the buyers' values, not value minus price. The 3x3 grid with "12 - 0 / 12" reads once I know it is value minus price; the legend arrives only after unlocking.
3. **Where understanding first broke:** frame 02 to 03. After one Raise (a $1; y ties between a and b: 7 and 7) I press Run and land on Round 3, a $3, b $1, c $0, with the caption "Raised a and b together; 3 buyers wanted only a or b". "The smallest group too many want" in the stage rule is jargon; I understood "a and b together" only by looking at the dashed box. The recorded frame shows only the end of the run; I could not see round 2 or the animation.
4. **Compare list is cryptic.** Chips "xa yc zb 23" are never explained (x gets a, y gets c, z gets b). I decoded it from the highlighted black cells. Worth a legend line.
5. **Told vs shown:** the brief's gap (prices stop where each buyer can take a favourite; highest total) is on stage: dashed group, wants/gets marks, six totals with 23 highlighted, and "z ends on b although it values a at 7". Met. "Lowest prices that clear this market" and "for any values, such prices exist and their match has the highest total" are told, supporting context outside the gap, claimed. Shown for one table only: I leave with "it worked here" and a sentence saying it always does.
6. **Why prices produce the best match** is not shown, only that 23 is the largest of six. Nothing shows prices pushing z away from a. Acceptable per the decision; a hunch, not a mechanism.
7. **Reveal quotes reached states:** "You saw three raises: $1, $2, $3" is conditional on all three rounds having been seen; branch exists. Good.
8. "Wants" vs "gets" glyphs read in the image but are blank in the transcript text; fine visually.

## Earlier findings (r2) checked

Predict not the lesson: fixed. Run skips {a,b} step: fixed (caption). Told "lowest prices"/"for any values": unchanged, allowed. Legibility: fixed. Total value undefined: **unchanged**. Prediction-held pat on the back: unchanged. Compare notation: new.

## Verdict for the current version: **launch with notes**

Top remaining finding: "total value" is undefined at the moment of prediction and the Compare chips (xa yc zb) are never decoded; a learner can follow the picture but not the labels. Screenshots seen.
