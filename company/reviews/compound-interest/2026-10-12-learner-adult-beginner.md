*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: compound-interest (adult beginner)

Boundary used: remembers school arithmetic (percentages, multiplying), everyday life with bank accounts; has never studied compound interest or exponential growth formally.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots, QA phone screenshots, plus my own Playwright run (chose "$15,000", slider Home, single nudge, checked when the reveal unlocks).

**Where understanding first broke.** Not in the question, which is plain ("$1,000 earns 7% a year, and the interest stays in. After 10 years: $1,967."). It first frays at the readouts. "YEARS 1-10 ADDED $967" sits beside "INTEREST ON INTEREST $267", and the legend has three layers: "your $1,000", "7% of $1,000", "interest on interest". As I drag, the first readout's label changes: "YEARS 4-13 ADDED", "YEARS 14-23 ADDED", "YEARS 31-40 ADDED". It is a sliding ten-year window, while "INTEREST ON INTEREST" next to it is a running total from year 0. Nothing says one is a window and the other is cumulative; I would read "$1,185 added ... $500 interest on interest" at year 13 as parts of the same thing and they are not.

**Prediction.** It allowed a real guess, and a good one. I know "10 years: $1,967", and I can reason: it gained $967, so another 30 years... either about $3,800 (7% of $1,000 each year), about $4,900 (just keep adding the same $967 per decade), or $15,000. Two of the three are what a sensible non-expert would compute. The hook ("The first ten years earn $967. Guess the next thirty.") sets up the linear trap well. One wrinkle: $967 in ten years is already more than 7% x 10 = $700, and the question does not say why; I'd be unsure whether I had misread the rate.

**Exploring.** The picture does answer "which layer grows": the dark "interest on interest" wedge visibly dwarfs the other two by year 36 (screenshot: $11,424 at 36, wedge over half of the area). Dragging years, the curve bends upward and the balance label rides on top. The "+10 yrs" button (labelled "Add ten years" in the walkthrough) is a handy way to compare decades. Problems:
- The window/cumulative mix above.
- The year slider runs 0 to 40, but it starts at 10 and the window readout changes label at year 0 ("ADDED SO FAR $0"). OK, but the learner never sees the earlier-decade figures side by side with the last decade's, which is the comparison the title promises ("Why the last decade earns the most"). The reveal gives "7.6 times" but the stage shows the last decade's number only when I stop at 40.
- The grey "your $1,000" layer is thin, and the "7% of $1,000" layer is pale; at phone size I can't tell the two lower layers apart without the legend.
- The y-axis labels move between explore and reveal (the plot shrinks and shifts when the reveal text appears).

**Reveal: earned or told?** Largely earned. The number $14,974 and the "interest on interest $11,174" are on the stage when I get there, and the wedge is visible. What is TOLD, not shown: "A straight line ($967 per decade) would give about $4,900" (no straight-line overlay is drawn, so I cannot see how far the real curve departs from it), and "At 7% the balance roughly doubles every ten years" (the stage has no doubling marker; 1,967 at 10 and about 3,870 at 20 are never put next to each other). The reveal unlocks after one nudge of the slider: I got it enabled at year 11, having seen nothing past the starting view. So the key moment (year 40) is not required.

The closing caveat ("a steady 7% with no fees, taxes or inflation. Real returns wobble.") is good and prominent enough; it softens any impression that 7% is guaranteed.

**Findings (problems):**
1. The two readouts mix a sliding ten-year window and a running total with no cue, so numbers that seem to be parts of one thing are not.
2. The reveal unlocks after a one-year nudge (year 11), so the learner can see the explanation without ever reaching the 40-year balance.
3. The straight-line comparison ($4,900) and the "doubles every ten years" claim are told only; neither is drawn on the chart.
4. The two lower layers ("your $1,000", "7% of $1,000") are hard to tell apart on a phone; the legend carries the meaning.
5. Why $967 and not $700 in the first decade is never said, though the first readout ($267 interest on interest) quietly answers it.
6. The chart rescales and shifts between explore and reveal.

No FATAL flaw found. I recomputed: 1000 x 1.07^10 = 1,967; 1000 x 1.07^40 = 14,974; simple interest 3,800; last decade 7,362 = 7.6 x 967; all match. Controls respond.

## 2. After reading the brief

- Intent: dislodge "savings grow in a straight line"; objective is that each decade earns more than the last and interest-on-interest becomes most of the balance. The experience supports this, especially the wedge picture and the $11,174 / three-quarters outcome. The lesson's boundary (knows percentages and savings interest) matches mine, so the review is aligned with the brief's learner.
- The brief's wording of the misconception is "ten years earns about $1,000, forty earns about $4,000". The predict options $3,800 and $4,900 capture both straight-line variants; this is well matched.
- The brief's objective says "each decade earns more than the one before". The stage compares decades only through a sliding window and the reveal's 7.6x; the learner is not shown three or four decades lined up, so the objective's central comparison relies on the learner assembling it themselves.
- Claims c6 (doubling every 10 years) and c8 (straight-line $4,900) are told in the reveal, not drawn; all claims are `unverified`.
- The caveat about steady returns is inside the reveal, good given the claims about 7%.

Verdict: revise
