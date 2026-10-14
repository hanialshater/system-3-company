# Build note: winning-bid-overpays

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #64

- Intent: 20 columns, one per auction: faint grey dots for the losing guesses, the winner's dot filled (red if above $100, green if below), a solid line at the jar's true $100 (drawn locked too, as the brief allows: it is the stated value), and a dashed red line at the current average winning bid. Readouts: Bidders, Avg guess, Avg winning bid. Chip: "Guess = $100 + random error up to ±$20 (seed 1)."
- Randomness: kit mulberry32(1); each preset reruns 20 auctions from the same seed, drawing guesses auction by auction, bidder by bidder. Seed 1 is the brief's seed, not chosen; seeds 7 and 42 checked (claim c1). My run matches the brief's node numbers exactly: 10 bidders 99.17 / 116.53 / 20 of 20; 2 bidders 105.42 (12 of 20); 20 bidders 118.56.
- Controls (DOM order): [Run 20 auctions] (10 bidders), [2 bidders], [20 bidders], then [Step: one auction] (adds one auction at the current bidder count from 0; disabled at 20, so a QA press cannot wipe the run).
- Milestones: "ten" (20 auctions at 10 bidders, by Run or by stepping) and "two" (20 auctions at 2 bidders). Record row: "10 bidders: guesses $99.2, winners $116.5, 20 of 20 over" and "2 bidders: winners $105.4".
- "Winner's curse" and the oil-lease history kept out of learner text; the reveal says "bigger overpayment".
