# Build note: fair-game-still-ruins (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "Fair coin, $10 against $100" ("still ruins" gave the answer). Hook asks about an even chance of ending on top.
- Controls: Start with $10, Play 300 more games, Start with $50. 30 lines drawn; the 300 extra games only change the tally (not drawn), said in the readout "k of n". Gate: milestones ten, ten-many (300 more at $10), fifty. Readouts "?" while locked.
- Brief asked for bankrolls 5/10/50; dropped $5 to keep the QA path short. Added the 300-more button because 30 games is too noisy (0 to 6 wins from $10 across seeds).
- Seeds untuned: 4000 + 1000*stake + g. Click path: $10 -> 2/30, 24/330; $50 -> 13/30. Spread over 60 seed sets in claim 3. Reveal quotes the learner's k of n plus exact stake/110.
- X axis is sqrt-compressed (labelled) because walks last about 10 x 100 = 1,000 bets on average but some run far longer.

## Revision v2
Learner review (2026-10-14) findings:
- The chart looked mostly green: ruined lines were faint and thin. Winning and ruined lines now have the same width and opacity.
- "Play 300 more games" changed only a count. A tally bar now sits under the chart: green share of games that took it all, red share ruined, with a tick at stake / 110. It visibly redraws after the 300 games. The 30 drawn lines are unchanged and say so.
- Why stake/total was a bare formula: the reveal now gives the one-line reason (expected money stays $10; you end with $0 or $110; so 110 x chance = 10). New claim c7, unverified.
