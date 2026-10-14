*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): gradient-fades-with-depth
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows the error signal is passed back layer by layer by the chain rule; does not know that each layer multiplies the signal by its activation's slope, that the sigmoid's slope is at most 0.25 so deep sigmoid stacks starve the first layers, or that a slope-1 activation (ReLU, active side) passes it through)
Screenshots seen: yes (artifacts/walkthroughs/gradient-fades-with-depth/sheet.png, recorded 2026-10-14T18:55)
Verdict: launch (pass)

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "About 25%"; tapped 10 sigmoid layers, 10 ReLU layers, 3 sigmoid layers, Reset; opened reveal.

1. **The prediction is fair but mostly arithmetic.** The question gives "multiplies by 0.25, 10 times", so a careful learner computes; the surprise is in how small 0.25¹⁰ is. "About 25%" (forgetting it compounds) and "2.5%" (adding instead of multiplying) are good distractors.
2. **The three stacks make a clean comparison.** 10 sigmoid: bars fall away to layer 1 at 0.0001%; 10 ReLU: every bar full at 100%; 3 sigmoid: 1.6%. The dashed ghost of the 10-sigmoid stack stays under later runs, which is helpful.
3. **Where my boundary strains: the log axis.** The y-axis jumps 100% → 1% → 0.01% → 0.0001% in equal steps, so the sigmoid bars look like a gentle staircase. A beginner reads "a steady decline", not "a collapse by a factor of a million". The labels are there, but one line ("each gridline is 100 times smaller") would make the picture match the words.
4. "Weights 1, every unit at its steepest" is a fair toy caveat, and it means 0.25 is the best case. The reveal says "at most a quarter", which tells me real networks would be worse. Good.
5. **Fit:** the reveal opens after Reset; the bars are gone and only the dashes for 10 sigmoid remain. The 100% ReLU stack the reveal describes is not on screen; its number is in the summary line. Minor.
6. Trust link "0/4 claims checked" (fact-checker's lane).

Fixes (optional): a gridline note for the log scale; keep the last stack's bars when the reveal opens.

Verdict reason: all three parts of the idea (multiply by slope, sigmoid starves early layers, ReLU passes through) are shown on stacks I ran, and the reveal quotes them.

## After reading the brief (meta.json)

- doesNotKnow is delivered in full; the "on its active side" qualifier is in the reveal ("wherever it is active").
