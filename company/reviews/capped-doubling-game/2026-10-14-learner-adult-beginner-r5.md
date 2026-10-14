*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): capped-doubling-game
lesson version: v2
boundary: an adult with school-level maths, knows "average" and coin flips, has never met expected value or the St Petersburg game.
Screenshots seen: yes (artifacts/walkthroughs/capped-doubling-game/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact

- Predict: the game is fully stated (cap 20 flips, $2/$4/$8..., all heads pays nothing). $2 / $10 / $20 are fair options; $2 is the natural "most games pay $2" belief. Locked stage: empty running-average chart, readouts "?". No leak.
- Explore: the three Price buttons only move a dashed price line on the chart; no games are played until "Play 50 games". At $20: 50 games give average $4.4, median $2, biggest $32, PROFIT −$780. "Play 500 games" adds 500: average $25.8, median $4, biggest $8,192, PROFIT +$3,182. The chart shows the average crawling along near $4, then one vertical spike to about $65, then a slow decay to about $26.
- What I took from the stage: "one huge win drags the average far above a typical game" (median $4 vs average $25.8). That is a real idea, and it is seen.
- What I did not get from the stage: why $20 is the fair price. On the stage, the average was $4 for 500-odd games and then jumped because of one jackpot. If the jackpot had not come, the stage would have "shown" about $4 to $5; it landed above $20 by luck, and the reveal admits "another run could show a lower average". The $20 itself comes only from the reveal's "$1 per flip × 20 flips" argument, which is told. Nothing on stage shows each flip's $1 share (e.g. a bar per flip-count: chance × payout).
- "PROFIT" does not say whose (the player's, from −$780 = 50 × (4.4 − 20)). A beginner may read it as the house's.
- Reveal: $25.8, $4, $8,192 match; "58% of everything paid out" is a nice touch but not on stage. "75% of plays pay $4 or less" is told.
- 5/6 claims checked. Fits on phone.

## 2. Earlier findings (v1 review, 2026-10-14)

1. Options not parallel ("about" missing on $20) leaked the answer: **fixed** ($2 / $10 / $20).
2. "$2^k" notation: **fixed** (payouts written out).
3. Price buttons are busywork: **not fixed** (minor).
4. Run dependence: the stage only reaches "$20" if a jackpot lands: **not fixed**. Same spike as last time; if the run is seeded, every learner sees the same lucky jackpot, which means the stage "shows" $20 by construction rather than by the game's logic; if it is not seeded, many learners will see about $5.
5. The $1-per-flip reason is told: **partly fixed**. It is now in plain words in the reveal, but still told; nothing on stage shows it.
6. Empty band at the top of the stage: still present (minor).

## 3. What would move this to launch

- Top: put the $1-per-flip reason on stage. E.g. a 20-bar strip "first tails on flip k: chance × payout = $1" that fills as games are played, or a "Show the sum" view that stacks twenty $1 blocks to the $20 line. Then the learner sees why the price is $20 regardless of whether their run hit a jackpot.
- Label PROFIT as "Your profit at this price".
- Optional: let the price buttons do something (e.g. show running profit at each price) or cut to one price.
- Trust link 5/6 claims checked (route to fact-checker).
- No FATAL. The median-vs-average lesson is seen; the fair-price lesson is told.
