# Build note: winning-bid-overpays

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #64

- Intent: 20 columns, one per auction: faint grey dots for the losing guesses, the winner's dot filled (red if above $100, green if below), a solid line at the jar's true $100 (drawn locked too, as the brief allows: it is the stated value), and a dashed red line at the current average winning bid. Readouts: Bidders, Avg guess, Avg winning bid. Chip: "Guess = $100 + random error up to ±$20 (seed 1)."
- Randomness: kit mulberry32(1); each preset reruns 20 auctions from the same seed, drawing guesses auction by auction, bidder by bidder. Seed 1 is the brief's seed, not chosen; seeds 7 and 42 checked (claim c1). My run matches the brief's node numbers exactly: 10 bidders 99.17 / 116.53 / 20 of 20; 2 bidders 105.42 (12 of 20); 20 bidders 118.56.
- Controls (DOM order): [Run 20 auctions] (10 bidders), [2 bidders], [20 bidders], then [Step: one auction] (adds one auction at the current bidder count from 0; disabled at 20, so a QA press cannot wipe the run).
- Milestones: "ten" (20 auctions at 10 bidders, by Run or by stepping) and "two" (20 auctions at 2 bidders). Record row: "10 bidders: guesses $99.2, winners $116.5, 20 of 20 over" and "2 bidders: winners $105.4".
- "Winner's curse" and the oil-lease history kept out of learner text; the reveal says "bigger overpayment".

## Pre-flight v1

1. **Title and hook.** "Guesses are right on average. Is the winner?" / "Ten people bid on a jar of coins, each bidding their own guess. What does the winner pay?" Questions; the title raises doubt but does not say over or under.
2. **Options.** "pays about $100" · "pays under $100" · "pays over $100". All name $100 at the same precision.
3. **Locked stage.** Chip "Guess = $100 + random error up to ±$20 (seed 1).", readouts Bidders 10, Avg guess "?", Avg winning bid "?", the $100 line and $80/$100/$120 ticks, no dots, no average line, controls disabled.
4. **Reveal values.** "guesses averaged $99.2", "winning bids averaged $116.5", "20 of 20": (b) milestone ten, record line 1 ("10 bidders: guesses $99.2, winners $116.5 (20/20 over)"); computed from the seeded run. "With 2 bidders ... $105.4": (b) milestone two, record line 2.
5. **QA path.** DOM order: Run 20 auctions (ten), 2 bidders (two), 20 bidders, Step (disabled at 20, skipped; the Step row is not rendered at the reveal). Both milestones in 2 presses; both record lines on the stage at the reveal. Probe confirmed each press changed the stage.
6. **Reset.** No Reset control; presets rerun from seed 1, records persist. Reveal text from the QA path: "With 10 bidders the guesses averaged $99.2, close to $100. The winning bids averaged $116.5, and the winner overpaid in 20 of 20 auctions. Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one. / With 2 bidders the winner paid $105.4 on average: more rivals, bigger overpayment. A made-up jar with random, seeded guesses."
