# Build note: same-revenue-any-rule

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #17 (NCM)

- Intent: three bars show the seller's running average per rule, with the $33.3 theory value ghosted. Under them, the last auction for the chosen rule shows both values and who pays what. That strip is the "why": second-price charges the lower value once, first-price charges half the winner's value, and all-pay takes a little from both bidders.
- Simulation: mulberry32(97), which is the brief's seed and not one I chose. Auction i draws A, then B. Over 20,000 auctions: 33.395 / 33.303 / 33.302, matching the brief (re-run in node). Bids are v (second-price), v/2 (first-price) and v²/200 (all-pay).
- Controls in DOM order: 1 auction, +1,000, All 20,000, then the rule chips, then Reset. The chips are disabled until one auction exists, and the active chip is disabled too. Milestones: "all-run" (20,000) and "all-pay-seen".
- The reveal quotes the learner's own averages over their run.
- Format id: simulation-run (catalogue entry "Simulation run").
- Not run (per dispatch): next build, QA, walkthrough, tsc.

## Pre-flight v3

Changes for r6 (adult-beginner, revise): two new readouts, "Avg higher value" and "Avg lower value", put the cancelling on stage: second-price's bar is the average lower value ($33.4), and first-price's bar is half the average higher value ($66.6 ÷ 2 = $33.3). The reveal now quotes those averages and says that in one auction either rule can charge more, quoting the learner's own last auction. That fixes the old "second-price charges a high price, first-price less" line, which contradicted the stage's $18.9 vs $45.0 (top finding). The dashed theory line is drawn only after the full 20,000 run, because it hinted "the same" before the commit (minor 2). Its label moved into the chart title, so it no longer collides with the all-pay value (minor 4). The full run is recorded, and after Reset the stage shows "Your 20,000 run: $33.4 / $33.3 / $33.3; higher $66.6, lower $33.4" (minor 3). The chart is still small on a phone (minor 2, first half; not changed). Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "Which auction rule pays the seller most?" / "Make the winner pay their own bid, not the runner-up's. Surely the seller earns more?" No: the hook leans toward first-price (the misconception), not toward "the same".
2. **Options.** "First-price", "Second-price", "About the same": all verbal, no numbers.
3. **Locked stage.** Axis with three "?" labels, no bars, no theory line (removed from the locked frame), empty last-auction strip, readouts "?". Nothing marks equal heights.
4. **Reveal values.** $33.4 / $33.3 / $33.3 over 20,000: (b) milestone all-run, recorded in `full`. On the bars at 20,000, or on the "Your 20,000 run" line after Reset. Theory $33.3: told (c2), and also the dashed line after the run. "Your last: second-price $18.9, first-price $45.0": (a) the learner's current last auction, and the sentence is omitted when there is none (after Reset). Lower $33.4, higher $66.6, half $33.3: (b) the all-run record; the two readouts at 20,000, or the recorded line after Reset.
5. **QA path.** 1 auction, +1,000, All 20,000 (all-run), Second-price (disabled, already chosen), First-price, All-pay (all-pay-seen), Reset. Both milestones; no animation.
6. **Reset.** Reveal after Reset (traced from code, not run): "Over your 20,000 auctions the seller averaged $33.4 (second-price), $33.3 (first-price) and $33.3 (all-pay). Theory says $33.3 for all three. / On average they match. Second-price charges the lower value, which averaged $33.4. First-price charges half the winner's value, and the higher value averaged $66.6, so half is $33.3. All-pay charges both bidders, but each bids only a little. Each rule changes the bids, and the changes cancel. / A model: two bidders, values independent and uniform, everyone bidding optimally." It matches the recorded line. The per-auction sentence is dropped because no last auction is on stage.
