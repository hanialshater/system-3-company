# Learner review: Shade your bid, or bid your value? (boundary: first-price-intuition)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Version reviewed: walkthrough recorded 2026-10-14T08:42Z (phone, option 1 = "$50"), sheet.png seen (all 7 frames), Demo.tsx read for the branches the script does not show.

Boundary used (mine, chosen before reading the brief): knows ordinary pay-what-you-bid auctions (eBay-style intuition: bid less than your value to keep a surplus); has never heard of second-price auctions or dominant strategies.

## Findings (artifact only)

1. **The answer is visible before I predict.** The card title is "Shade your bid, or bid your value?" and the question tells me "You value a painting at $70" with an option "$70". Title plus option make "bid your value" the marked-out answer; a learner who simply matches the number to the stated value is right without reasoning. Even though my scripted pick was $50, a reader who reads the title would not pick it. This turns the prediction into a vocabulary match.
2. **The hook pushes the other way.** "So how low should you bid?" presupposes shading, which fits my first-price intuition, and is then answered by the title. The two lines disagree in tone.
3. **First idea I lack: what "pays the second-highest bid" means with a single rival.** The rule chip says "Highest bid wins and pays the second-highest", but the stage has one rival bid at a time; I had to infer that the rival's bid is the second-highest when I win. It worked out only after tapping Rival $40 and seeing "+$30" on three bars with different bids (the heart of the lesson, and it is visible: equal bars).
4. **"You pay $X" is shown only for my slider bid.** Against Rival $40 with the slider at $30, it says "You pay $0" (I lose), which hides the price rule at the moment I look for it. I only see "I pay the rival's price" if I slide above the rival, which the explore hint ("Pick each rival bid, then slide your own bid") never requires; the milestones are just tapping Rival $60 and Rival $75.
5. **What I saw is enough for the reveal's examples.** Rival $60: $50 earns $0, $70 earns +$10. Rival $75: $90 wins and shows -$5 (red bar), $70 shows $0. Both quoted figures match what I tapped. Reveal quotes only states reached.
6. **"A bid of $70 is never worse than any other bid" is told, not shown.** I tested four rival bids and four of my bids (the slider plus $50, $70, $90). The reveal generalises to every rival bid and every alternative bid. Against Rival $40 and Rival $90, my pick ($50) was as good as $70 or equally zero, so a learner could keep believing $50 is fine "when the rival is low". The "never worse" quantifier is carried by the reveal text, not by the stage.
7. **Reveal para 2 is a clear argument**: "Your bid only decides whether you win. The price is the rival's bid." That sentence reorganised my first-price intuition; it is the best sentence in the lesson, but it comes after the exploration rather than being something the bars let me say myself.
8. **Last line, "It is why this format invites honest bids."** "It" is ambiguous (the model? the rule? the dominance?), and "honest bids" appears only here. I do not know what "invites" claims or for whom; in real life I would not conclude real auctions work this way.
9. **Ties rule shown twice** (chip and reveal) and is a footnote, never visible on the stage because the four rival bids are not on the same dollar values as the fixed bids except $90 vs Rival $90, where my $90 loses; the "ties go to the rival" rule shows up by accident (frame 05, $90 loses against Rival $90) and I read it as an error until I saw the chip.
10. **Layout/controls:** all controls worked; rival buttons wrap to two rows on the phone; the slider max is $120, so I can bid above the largest alternative.

Confidence: moderate. Strongest: findings 1, 4, 6.

## Verdict for the current version: **revise** (no fatal flaw found)

Top finding: title and option wording give the correct answer away before the learner has to reason (finding 1), and the universal claim "never worse than any other bid" is told rather than shown by four rival bids.

## After reading the brief

(see below)
