*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): odds-average-the-bettors
lesson version: v2
boundary: odds-graduate (same tag as r6). Knows odds and probability. Does not know that money-weighted betting makes the implied chance the wealth-weighted average belief.
Screenshots seen: yes (artifacts/walkthroughs/odds-average-the-bettors/sheet.png, 9 frames, build 4 at localhost:3480)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who can turn betting odds into an implied probability (and knows a pool's split is the implied chance), but has never asked whose belief the odds average.

1. **The bar is the why, and it works.** Each bettor's money is split into stacked segments on A (left of the line) and B. At Start values, "1: $240" is a long block and "2: $40" a sliver, and the solid "odds 70%" line sits right of the dashed "simple average 60%". With equal money the two lines coincide (60/60). With bettor 2 richer, the solid line slides to 50%. I see that each opinion counts by the money behind it.
2. **Top finding: the reveal's opening numbers are not on the stage when it opens.** The reveal leads with "$300 × 80% = $240 and $100 × 40% = $40 put $280 of the $400 pool on A, so the odds said 70%". After I played with the sliders (as the panel invites), the stage under the reveal shows IMPLIED CHANCE 87%, SIMPLE AVERAGE 80%, $400 / 100% / $200 / 60%. The bar and the "Seen:" trace are scrolled off the top. The trace keeps only "start 70%", never the $240 / $40 / $280 / $400 the reveal quotes. So the first sentence is a hard-coded recap of a state I left, beside readouts that contradict it. This breaks "The reveal quotes what you saw": the quoted state must still be visible as a trace, row or readout.
3. **The locked stage points away from 60%.** Before the commit there are two readouts, "IMPLIED CHANCE OF A ?" and "SIMPLE AVERAGE ?", plus a legend for a dashed average line. A test-wise learner reads "they would not show both if they were the same" and drops 60%, leaving 70% vs 80%. That is a weak pointer, not the answer, but it is the kind of pre-drawn distinction the "No answer before the commit" rule names. Consider hiding the simple-average readout until after the commit.
4. **Bar labels are tiny.** At Start values, "2: $40" and "1: $60" are squeezed into about 15 px segments at around 8 px type. These are the numbers the reveal's first sentence is built on.
5. The model chip ("no house cut; all money bet by belief") and the closing log-wealth sentence are honest context.

What the prediction felt like: I chose 60% (the average), and that is the wrong guess the lesson is built for. The equal-money vs richer contrast answered my real question ("so when is it the average?").

Verdict reasoning: the idea is on the stage, but the reveal opens on numbers the stage no longer shows, under readouts that say something else. A first-time learner who explored will read "70%" over "87%".

## Earlier findings (r6), checked after the findings above were written

1. Main: the hook "The odds don't say 60%" struck the misconception option: **fixed.** The hook is now "One bettor says 80%, another 40%. What do the odds say?"
2. Log-wealth sentence should be claimed: **fixed as far as I can see** (the trust link reads 5/5 claims checked). Not re-verified here; that is the fact-checker's lane.
3. Bettor colour key: **fixed.** A legend now reads "bettor 1's money / bettor 2's · left of the line: on A".
4. Crowded segment labels: **not fixed** (finding 4 above).
5. Reveal frame scrolls the pool bar out of view: **not fixed, and worse than r6 judged.** r6 called it minor. With the slider steps on the path, the visible readouts at the reveal (87% / 80%) contradict the reveal's opening "70%", and the quoted $ amounts are kept nowhere on the stage (finding 2 above). Under the "reveal quotes what you saw" rule as now written, this blocks.

## Verdict

Revise. Top finding: the reveal's "$240 + $40 = $280 of $400, odds 70%" is not visible when the reveal opens after slider play. The stage then shows 87% / 80%, and the trace keeps only "start 70%". Secondary: the locked "SIMPLE AVERAGE ?" readout hints that the answer is not the average.
