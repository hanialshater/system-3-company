*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): pixel-nudges-add-up
lesson version: v1
boundary: an adult beginner who has heard "AI can be fooled" and assumes invisible changes can't matter.
Screenshots seen: yes (artifacts/walkthroughs/pixel-nudges-add-up/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the stem gives the rule (cat if the 100 pixels sum above 50), the sum (50.5) and the nudge (0.01 each). The locked stage shows the grid, a "cat / sum 50.50" badge, a 49–51 number line with a marker just right of 50, and "Total change 0.00". Nothing leaks. As in other lessons, the locked stage renders shrunk (small labels).
- Explore: "Darken all 100 by 1%" turns the badge red "not cat / sum 49.50", the marker jumps left of 50, and "Total change 1.00" appears. The grid looks unchanged to my eye, which is the point: invisible change, new label. I got the idea here, from the stage: a tiny nudge on each of many pixels adds up to more than the 0.5 margin.
- Moving "Darken each by" to 0.8% and "Pixels darkened" to 98 still shows "not cat" (49.70, 49.72). The panel asks me to "hunt for the smallest nudge that still flips it", but "Show me why" was already enabled after the first tap, so the hunt is optional.
- Reveal: "sum fell by 100 × 0.01 = 1.0, twice the 0.5 margin, to 49.50" matches what I saw. "With all 100 pixels, 0.5% each is already enough. With 50 pixels it takes 1%" is stated, not seen: I never reached either setting. The 224 × 224 / 0.000003 extension is told. That is fine as an extension, but the "more inputs, less each" trade-off is only earned if the learner does the hunt.

## 2. Earlier findings (2026-10-13 review, v1)

1. "Hunt for the smallest nudge" has no target or edge indicator: **not fixed**. There is still no "flip needs total change > 0.50" cue next to TOTAL CHANGE, and the gate does not require the hunt (see new finding 1).
2. Phone clipping cut the final caveat about real classifiers: **fixed** (the caveat is fully visible in 05-reveal.png).
3. "50 pixels takes 1%" and the 150,528 extrapolation are told: **unchanged**, acceptable for a reveal, but now folded into new finding 1.

## 3. New findings

- Moderate: the gate opens after a single tap, so the trade-off the reveal leans on ("the more inputs, the less each one has to move") is told to most learners, not found. Requiring one flip at fewer pixels (e.g. 50 at 1%) before "Show me why" would let the stage carry it.
- Minor: "0.5% each is already enough" lands the sum at exactly 50.00. That is correct only because the rule is "more than 50". A learner who tries it will see a boundary case. The reveal could say "exactly 50, which is not above 50".
- Minor: the reveal frame scrolls the stage so the top of the grid and the cat/not-cat badge are cut off (05-reveal.png).
- Minor: the locked-stage render is shrunk at predict.
- No FATAL.
