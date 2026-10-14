# Build note: same-revenue-any-rule

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #17 (NCM)

- Intent: three bars show the seller's running average per rule, with the $33.3 theory value ghosted. Under them, the last auction for the chosen rule shows both values and who pays what. That strip is the "why": second-price charges the lower value once, first-price charges half the winner's value, and all-pay takes a little from both bidders.
- Simulation: mulberry32(97), which is the brief's seed and not one I chose. Auction i draws A, then B. Over 20,000 auctions: 33.395 / 33.303 / 33.302, matching the brief (re-run in node). Bids are v (second-price), v/2 (first-price) and v²/200 (all-pay).
- Controls in DOM order: 1 auction, +1,000, All 20,000, then the rule chips, then Reset. The chips are disabled until one auction exists, and the active chip is disabled too. Milestones: "all-run" (20,000) and "all-pay-seen".
- The reveal quotes the learner's own averages over their run.
- Format id: simulation-run (catalogue entry "Simulation run").
- Not run (per dispatch): next build, QA, walkthrough, tsc.
