# Build note: bid-what-its-worth

builder: demo-builder · 2026-10-14 · session 2 (NCM batch 1), single card, no spec

- Intent: one picture, four profit bars (the learner's slider bid, then $50, $70, $90) against one rival bid chosen from chips $40 / $60 / $75 / $90. Rule line on stage: highest bid wins and pays the second-highest, ties go to the rival, value $70.
- Earn the reveal: two milestones, both reached by pressing a rival chip: Rival $60 (bar for $50 stays at $0 while $70 shows +$10) and Rival $75 (bar for $90 shows -$5). The reveal quotes only those two states. Chips come first in DOM order so the QA path reaches both; the slider (two arrow presses) comes last and changes the "you" bar.
- Answer not visible before predicting: bars show "?" until a rival chip is pressed; the slider starts at $30, not near $70.
- Numbers re-run in node with the lesson's rule (profit = 70 - rival if bid > rival, else 0): rival $40 gives 30/30/30 for bids 50/70/90; $60 gives 0/10/10; $75 gives 0/0/-5; $90 gives 0/0/0. Dominance: rival bids 0.00 to 400.00 in cents against alternative bids $0 to $200 in whole dollars: $70 never lower than any alternative, strictly higher for some rivals. Alternatives such as $70.01 or $70.50 tie with $70 at some rivals and lose at others, so the card says "never worse", not "the only best".
- Section number unconfirmed: curriculum.references says ch. 9 §9.4 (the brief's guess from memory; the book page was blocked by the proxy, 403). Fact-checker to confirm in the free PDF. No empirical claims.
- Not covered on purpose: first-price auctions, winner's curse (later briefs).
- Rival chips wrap to two rows at 390 px (4th chip alone); left as is.
- Pre-existing, not from this lesson: the feed spec "subject chips filter the feed" failed on both viewports in this worktree; the contract spec for this slug passed on phone and desktop.
- Network-stage rules do not apply (no node-link graph).
