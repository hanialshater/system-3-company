*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7): accurate-bettor-takes-the-pot
lesson version: v2
boundary: adult-beginner. Knows that betting odds are the wealth-weighted average belief and that repeated bets multiply money; does not know that repeated betting shifts wealth to the more accurate bettor, so prices drift toward the truth, though luck can lead for a long time.
Screenshots seen: yes (artifacts/walkthroughs/accurate-bettor-takes-the-pot/sheet.png)
Verdict: revise

## 1. From the artifact (written before reading the r6 review or meta.json)

- Predict: three plain options. The locked stage is an empty chart with a dashed 50% line and "?" readouts. No answer before the commit: pass. "About equal" is a natural guess after "nearly the same belief".
- Explore: "1 race" now moves the money: "Race 1: loss, money ratio ×0.8", with MONEY RATIO 0.80 and 60% BETTOR HOLDS 44.4%. "+50 races" reports "31 wins ×1.2, 19 losses ×0.8: ratio ×4.11". So I see the per-race multiply and its compounding as readouts. Show the why: mostly pass. POOL'S WIN ODDS climbs 54.4% → 57.7% → 60.0%, which stands for the price drifting to the truth. Runs 2 and 5 carry labelled circles at their lowest point ("Run 5: 50% bettor 94.2%, race 176").
- **Layout breaks the stage text.** In every explore frame the event line ("ratio ×4.11", "ratio ×1,000+", "ratio ×280") runs onto a second line that collides with the "Your single race 1" pill, so the two overlap and are hard to read. The chart is small. Its labels and the circle captions are tiny on a phone, and the MONEY RATIO / POOL'S WIN ODDS row is cut off at the bottom of the stage.
- Confusing: when I open Run 2 the line says "Races 52–500: … ratio ×280", but its MONEY RATIO reads 81. Run 1's first 51 races gave ×3.28, so I can't make the numbers agree. Each run apparently has its own races 1–51 that the line never reports.
- Reveal: "at least 98.8%" and "Five runs end at 98.8% to over 99.9%" match. **"in run 5 the 50% bettor held as much as 94.2% at race 176 (the circle)" points at a circle that is scrolled off the top of the stage in the reveal frame.** Only the axis labels and controls are visible. "Three wins and two losses … multiply it by 1.11" is a number the stage never shows. It follows from ×1.2 and ×0.8, but I have to take it on trust.
- Would a first-time learner get the idea from the stage? The outcome, yes (every run ends near 100%, with dives). The compounding, roughly, from the ratio readout.

## 2. Earlier findings (r6)

1. Per-race multiply told, not shown: **fixed**. A "1 race" step and the MONEY RATIO readout show ×0.8 / ×1.2 happen.
2. "Pool's win odds" unglossed: **not fixed** (minor at this boundary).
3. Reveal quoted 88.6% at race 200, never shown: **fixed in kind**. The circle is labelled with value and race, but it is off screen when the reveal opens.
4. Chart text very small: **not fixed**, and new text overlap.
5. Claims unchecked: now 3/6 (fact-checker).

## 3. New findings

- **Revise (top):** when the reveal opens, the stage scrolls so the chart, with the circle the reveal points at ("the circle"), is off screen. Keep the chart in view.
- Should fix: stage event text overlaps the "Your single race 1" pill in every explore frame, and the readout row is cropped.
- Should fix: per-run lines report only races 52–500, so the ratios don't add up to the MONEY RATIO shown for runs 2–5.
- Minor: the ×1.11 per five races is told only.
- No FATAL.
