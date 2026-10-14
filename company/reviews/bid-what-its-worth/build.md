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

## Revision v2 (2026-10-14, session 2 revise)

Findings (simulated learner review, fact-check NCM-1), each answered:
- Answer given away: title now "What should you bid for a $70 painting?", hook "What does that do to your best bid?". Predict options reordered to $50 / $90 / $70 (correct last, answer index 2); recall options reordered too (correct last).
- "Never worse" told from four rivals: added a sweep chart under the bars: profit of a $70 bid (solid) and the learner slider bid (dashed) against every rival bid $0 to $120, with a marker at the picked rival. Shown only after a rival is picked (hidden while the prediction is locked, so it does not give the answer away). Same profit() drives bars and chart.
- Price rule visible only when sliding above the rival: every bar now shows wins/loses and "pays $X", so Rival $60 shows the $70 bar paying $60 with no slider needed. Old single "You pay" line removed.
- Fact-check advisory c6: text now "...adds wins that lose money or break even"; reveal para 2 matches. c6 is back to unverified. Other claims unchanged.
- Milestones unchanged (Rival $60, Rival $75). Version 2. curriculum.references untouched. No new factual sentences added.
- Pre-existing: feed spec "subject chips filter the feed" fails on both viewports; contract spec for this slug passed on phone and desktop.

## Revision v3 (polish from the final learner review)

- Locked predict stage: "Pick a rival bid" moved above the zero line (y 60), no longer overprinting the $50/$70 labels.
- Sweep chart gated: new milestone "slid-bid" (slider moved), so the gate is three actions; explore hint says "Do all three to unlock".
- Reveal points at the lower chart, and the stage is pinned at the reveal to rival $60 with your bid $50, the state the text quotes first; the $75 case is described as one the learner tried. Reveal's last line now "This is why the second-price format invites honest bids." (matches c7).
- Claim c4 extended (sweep range: $50 bid earns less than $70 for rivals $50 to $69, node-checked) and set to unverified.
- QA (own build, port 3981, QA_ONLY): contract spec fails only on 'tap targets at least 24px' (the in-progress kit stage-scale at reveal; not fixed here, kit is out of scope); every other contract step passed. Walkthrough frames read on phone. npm run check and typecheck pass.
