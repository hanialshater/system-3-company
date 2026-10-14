*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): two-bets-split
lesson version: v3
boundary: adult beginner with savings who knows expected value as an average over many tries and that two coin flips land four ways; thinks splitting just lowers returns.
Screenshots seen: yes (artifacts/walkthroughs/two-bets-split/sheet.png, 3 frames)
Verdict: revise

## 1. From the artifact

- Predict: a good question (50% / 25% / 0%), and 50% is the natural wrong answer ("each bet loses half the time"). The locked stage shows an empty chart with "?" readouts. Its axis ticks (−10%, 0%, +5%, +20%) already include +5%, the two-bet middle result, but that's a weak hint.
- Explore: the walkthrough moved the slider from 1 straight to 3 and **"Show me why" unlocked at once.** I never saw the 2-bet state the question asks about, and never saw 1 bet with numbers either (the 1-bet stage is all "?"). At 3 bets I saw 12.5 / 37.5 / 37.5 / 12.5, CHANCE OF A LOSS 12.5%, AVERAGE +5%, WORST RESULT −10%, CHANCE OF IT 12.5%.
- Confusing on the 3-bet chart: the bar at 0% is drawn dashed and grey (37.5%), with no word saying "break-even, not a loss". The bar between +5% and +20% (it must be +10%) has no tick label.
- Reveal: "With two bets you lose only if both fall: ½ × ½ = 25%. Half the time one rises and one falls, for +5%." Both numbers come from a state I skipped, so the answer to my prediction is told. "Try 4 bets: it goes back up" is now a pointer, not a quoted number, which is better, but nothing asks me to try it. I got "the average stays +5% while the worst case shrinks" from the 3-bet stage. I did not get "25% with two" from it.

## 2. Earlier findings (r2 review, v2)

1. Require the 2-bet state before the reveal unlocks: **not fixed** (1 → 3 still unlocks; the reveal still explains 2).
2. 31.3% at 4 quoted without a visit: **fixed** (now phrased as "try 4 bets").
3. Split WORST CASE into result and chance: **fixed** (WORST RESULT / CHANCE OF IT).

## 3. New findings

- **Revise:** gate on having seen 2 bets (slider snaps through 2, or unlock only after 2 is shown), or have the reveal quote the counts actually visited.
- Minor: label the 0% bar as "break even" and add a +10% tick on the 3-bet chart.
- Minor: the panel ("Split across 2 bets. Then keep adding bets") is right; the gate just doesn't enforce it.
- No FATAL.
