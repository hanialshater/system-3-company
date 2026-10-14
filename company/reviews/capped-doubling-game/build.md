# Build note: capped-doubling-game (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "A fair price for a coin game?" Hook does not state $20.
- Controls: three price buttons ($2, $10, $20; none selected at start so each press changes something), Play 50 games, Play 500 games. QA path = 550 games. Gate: milestones priced, many-games (200 or more). Exact $20 appears only in the reveal.
- The brief expected the running average to "wobble around $5-$30". It does not typically: a payout has variance about 2.1 million, so across 400 seed sets the average after 550 games had median $11.6 and 10th to 90th percentile $8.1 to $25.7. My seed (2500, untuned) hit $8,192 early, giving $25.79 on the click path. Disclosed in claims 4 and 5; the reveal quotes the learner's own run and says another run could be lower. Flag for cm-probability: brief's "sim mean about $20.4" is one sample of a heavy-tailed mean.
- Reveal quotes the share of the biggest payout (58% on the click path), computed from the same payouts as the chart.


## Revision v2

Review: option formats leaked the answer; 2^k unreadable; $1-per-flip told. Changes: options $2, $10, $20; payouts spelled out $2, $4, $8; reveal shows the $1-per-flip working. c2 unverified. Version 2.

## Revision 2026-10-14 (wave D r5, demo-builder)

v3. Review: why $20 was told; "Profit" unowned. Changes: a 20-bar strip under the running-average chart splits the learner's own average by the flip tails came on, with a dashed $1 fair-share line (bars over $2 capped and labelled); reveal reads the strip back (seeded 550 games: flips 1-9 about $1, flip 13 $14.89 from one win, 9 flips empty); "Your profit". Reopened c2, c6; new c7, c8. c5 sentence no longer shown.
