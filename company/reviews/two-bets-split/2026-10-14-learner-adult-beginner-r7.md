*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r7, wave F): two-bets-split
lesson version: v5
boundary: adult-beginner. Adult with savings who knows expected value as an average over many tries and that two coin flips land four ways; thinks splitting just lowers returns; does not know that splitting across independent bets cuts the worst outcomes without changing the average, or that this needs independence (meta.json learner field, same tag as r6).
Screenshots seen: yes (artifacts/walkthroughs/two-bets-split/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)

- Predict: options 50% / 25% / 0%, same form; 50% is the natural wrong answer. Locked stage: empty chart, a dashed "average +5%" line, "?" readouts. The title "keep the average" says the average holds, which is not the question (chance of a loss). No leak.
- Explore: the slider goes 1 → 2 → 3; at 3 the bars read 12.5 / 37.5 (break even) / 37.5 / 12.5, CHANCE OF A LOSS 12.5%, AVERAGE +5%. A row under the chart records "Chance of a loss seen: 1 bet: 50% · 2 bets: 25% · 3 bets: 12.5%", so the question's own case survives as a readout.
- "Bets move together" collapses the chart to −10% / +20% at 50% each, CHANCE OF A LOSS 50%, and the row adds "3 bets together: 50%". This is the stand-in for "needs independence", and it is something I made change.
- Reveal: 25% "as in the row under the chart", the bunching at further splits, and "3 bets lost 50% of the time" when together all match the stage, and the row is in view at reveal.
- Minor: "Half the time one rises and one falls, for +5%" describes the 2-bet chart, which on this path flashed by between slider presses and is not on stage at reveal (it shows 3 bets). The 25% is recorded; the +5% middle bar is not.
- Minor: in the reveal frame the chart is scrolled out, so "the bars bunched around +5%" points at something just out of view.

## 2. Earlier findings (r6, v4)

1. Independence only a chip label and a told line: **fixed** ("Bets move together" toggle, quoted in the reveal).
2. Reveal repeated "worst case gets rarer": **fixed**.
3. Pinned 2-bet chip cut off / slider jumped back to 2: **fixed differently** (no pinning; the "seen" row carries the 2-bet 25%). Leaves the +5% minor above.
4. "Try 4 bets" invitation after the stage closed: **fixed** (removed).

## 3. Verdict

launch. A learner with this boundary sees the chance of a loss fall as the money splits while the average stays +5%, and sees it snap back to 50% when the bets move together. No FATAL.
