# Build note: best-of-twenty-identical (demo-builder, 2026-10-13)
- Retitled "Twenty identical coins, one winner" (the brief title is fine, the new one reads as a question setup).
- Stage: 20 bars of heads in 20 flips (seed 314, untuned), the winner in gold; a dashed "again" bar for the re-flip; after 100 more contests, two dashed lines for the winners' average (14.1) and the re-flips' average (9.6).
- Controls in DOM order, each enabling the next: "Flip all 20 coins", "Flip the winner again", "Run 100 more contests". Gate: "again" and "many".
- The question says "over many contests ... on average", and the stage shows exactly that average over the learner's 101 contests. Option 14 = round(exactMax()) = round(14.116).
- Seed 314's re-flip average 9.6 is at the low edge over seeds (c2 says so); the reveal says "close to the 10 any fair coin gives".
