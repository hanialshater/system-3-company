*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): winning-bid-overpays
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows in an auction the highest bid wins; does not know that when the prize is worth the same to everyone and each bidder only has an estimate, the winner is the one who overestimated most, so bidding your estimate loses money on average, and more bidders make it worse)
Screenshots seen: yes (artifacts/walkthroughs/winning-bid-overpays/sheet.png, recorded 2026-10-14T18:57)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "pays about $100"; tapped "Run 20 auctions", "2 bidders", "20 bidders"; opened reveal.

1. **The prediction is genuine.** "Guesses are right on average" makes "pays about $100" feel safe; the title even says so. Good bait.
2. **The chart shows selection directly.** Grey dots (all guesses) scatter around the $100 line; the red dot in each column (the winner) sits at the top, and the dashed red average runs near $116. With 2 bidders, some winners are green (below $100) and the average drops to $105.4; with 20 it rises to $118.6. "Avg guess $99.2" stays fixed in the card while "Avg winning bid" moves. The cause is on the picture.
3. **Where the idea I lack first appears: none that blocks.** "Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one" is exactly what the red dots show.
4. The reveal's "With 2 bidders the winner paid $105.4 on average: more rivals, bigger overpayment" states the comparison backwards from the order I read it (fewer rivals, smaller overpayment). It is correct but makes me re-read. The 20-bidder figure ($118.6) is not in the Seen line, though it is on the reveal stage.
5. "Step: one auction" is greyed on every frame I saw. If it is never usable on the main path, it reads as a broken control. Small.
6. "A made-up jar with random, seeded guesses." is said. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: the winner's overpayment and its growth with bidder count are seen, and the reveal names only what is on the stage.

Fixes (hypotheses for the builder, not tested):
- Reorder: "With 2 bidders the winner overpaid less, $105.4; more rivals, bigger overpayment."
- Hide "Step: one auction" when it cannot be used.

## After reading build.md (Pre-flight v1)

- "Step: one auction" is disabled at 20 auctions by design so a press cannot wipe the run, and it is not rendered at the reveal. Since the main path always reaches 20 first, the learner only ever sees it greyed (finding 5).
- Fix route: none required for launch.
