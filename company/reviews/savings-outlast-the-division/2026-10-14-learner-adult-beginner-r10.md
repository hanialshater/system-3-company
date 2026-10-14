*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): savings-outlast-the-division
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows savings earn interest and that interest is charged first in the minimum-payment trap; does not know that a pot that keeps earning while you draw from it lasts longer than pot ÷ withdrawal, and forever if you take no more than its interest)
Screenshots seen: yes (artifacts/walkthroughs/savings-outlast-the-division/sheet.png, recorded 2026-10-14T18:52)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "12 years"; tapped "$40k a year", "$25k a year", "0% growth"; moved Withdraw to $50k; opened reveal.

1. **The prediction is genuine.** 500,000 ÷ 40,000 = 12.5 is the first sum anyone does, so "12 years" is the honest pick; "never" is tempting for someone who half-remembers "live off the interest".
2. **The payoff is on the chart.** The $40k curve bends down and hits zero at "20.1 yr"; the $25k line is flat ("never"); the 0% line is straight to "12.5 yr". All three stay as labelled ghosts, so the comparison is on one picture.
3. **Where the idea I lack first appears: the bend in the $40k curve.** Why does it fall slowly at first and then fast? The reveal answers it ("in year 1 the pot earned $25,000, so it shrank by only $15,000. Each year it earns a little less") but the stage never shows a year-1 earned vs withdrawn number. I take it on trust. My boundary knows 5% of 500k is 25k, so the sum is easy once said.
4. **The reveal's readout names a case it does not discuss.** At reveal the cards say "$50k a year · 10.0 years" (my last slider move) while the text is about $40k at 5% and $25k. The chart labels carry the named numbers (20.1, 12.5, never), so nothing named is missing, but the big readout competes with the text.
5. The slider starts at "$30k" on the locked stage with no explanation; it is a free control mixed into the setup picture and briefly looked to me like part of the question.
6. "A steady 5% is a made-up rate; real returns vary." is said. Good.
7. Trust link reads "0/6 claims checked" (fact-checker's lane).

Verdict reason: division vs earning-while-drawing, and the "take only the interest" case, are all seen on one chart and quoted in the reveal.

Fixes (hypotheses for the builder, not tested):
- When the reveal opens, put the $40k at 5% case back in the readout.
- A small "year 1: +$25k earned, −$40k taken" line under the $40k curve.

## After reading build.md (Pre-flight v1)

- The builder made the 0% case a required milestone so "not 12.5" quotes something seen, and kept every case as a labelled trace: that is why finding 4 is cosmetic. The year-1 $25k/$15k is told by design (claim c2). Finding 3 stands as a hypothesis.
- Fix route: none required for launch.
