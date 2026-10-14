*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): insurance-fair-price
lesson version: v2
boundary: adult-beginner (meta.json learner field). Reads "1 in 100" and knows what a premium is. Has never computed an average payout (chance × loss), and does not know why paying more than the average loss can still be sensible.
Screenshots seen: yes (artifacts/walkthroughs/insurance-fair-price/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: the question is concrete (1-in-100, $10,000, $120). $120 is the natural trap. The locked stage shows 100 houses and "?" readouts. No leak. "$0" is a weak third option.
- Explore: "+1 year" turns one house red and reads "Year 1: paid $10,000", average $100. "+100 years" gives an average of $99 and a tally (years with 0 losses: 36, 1: 37, 2+: 28). The outlined "your house" line says what one customer paid and got back. The readout lands close to $100, and the $120-vs-$100 gap is visible.
- Where I wobbled: in year 1 the one loss falls on *my* outlined house, and the average is exactly $100 after one year. The first thing I saw is that the payout is the answer on the nose. The "lumpy years" point only arrives as a small tally line after 100 more years. A first-timer could leave thinking each year costs exactly $100. Then "Your house: paid $12,120; cover paid it $20,000" (2 hits in 101 years) makes insurance look like a winning bet for the customer. Nothing on stage puts that one house beside the typical house.
- Reveal: it quotes $99, the tally and the outlined house, all of which were seen. "$20 above covers the insurer's costs" is told context. "The insurer can carry such losses because it pools 100 houses" is told. The grid is a pool, but nothing compares one house's lumpy record with the pool's steady average.

## 2. After reading the brief

- doesNotKnow (a), "average payout = chance × loss": **shown**. The average-payout readout settles at $99 to $100, and the reveal points at it.
- doesNotKnow (b), "why paying more than the average loss can still be sensible", which the objective also asks the learner to explain (the swap, plus a pool that can absorb the loss): **partly shown, and the stand-in misleads**. The only thing on stage for the customer's side is the outlined house. In this run it is hit in year 1 and again later, so it ends $7,880 ahead ($12,120 paid, $20,000 received). A learner reads that as "insurance pays you back more than you pay in". That is a new wrong idea, not the brief's idea, which is that the typical customer is about $20 a year behind and buys certainty. The pool's steady average beside one house's 0-or-$10,000 years is the real stand-in, but it is never put side by side. The reveal tells it ("pools 100 houses").

## 3. Earlier findings (v1 review, r5)

1. The title gave the $100 answer: **fixed** ("What does the insurer pay out?", neutral hook).
2. One red house in every frame, lumpy years told: **partly fixed**. The 0 / 1 / 2+ tally is on stage, but year 1 still shows exactly one loss and exactly $100.
3. "Why buy it" told, insurer side only: **partly fixed** (outlined house added, but see section 2).
4. After Reset the reveal sat under an empty stage: **fixed** (the reveal stage shows year 101).
5. "1 houses" alt text: **not fixed** (the year-1 alt still reads "1 house lost"; the reset alt reads "0 houses", which is correct). Minor.

## 4. New findings

1. **Revise: the outlined house is a lucky draw and teaches the opposite lesson.** It is hit in year 1 and twice in 101 years, so the customer comes out far ahead. Show the swap with a typical customer (or show the outlined house's lumpy record next to the pool's steady average), so "small sure cost versus a rare large loss the pool absorbs" is watched, not told.
2. Minor: year 1 lands exactly on $100, which hides the lumpiness the reveal then relies on.
3. Minor: "$0" is a throwaway option.
4. No FATAL.
