# Economics & Money: lesson briefs (ranked)

owner: cm-economics · written 2026-10-12 · curriculum: `content/curriculum/economics.json` (30 concepts)

Ranking: demand first (portfolio rule: demand-3 concepts before a third lesson on any concept), then how visible the idea is in 60 seconds, then misconception strength. Every lesson labels its economic content as a model with stated assumptions; none gives investment advice ("what you should buy"). All numbers are derivations a fact-checker can redo with a calculator. [exploration] = demand-1 concept or unusual format.

Already built (do not repeat): `compound-interest`, `supply-demand`.

Not briefed yet (concepts on the map with no lesson planned this cycle, kept so the map is honest): break-even, unit-pricing, percentage-points, public-goods-free-rider, prisoners-dilemma, production-possibilities. Each is buildable; none is ranked above these 22.

### 1. fee-drag-gap · concept: fee-drag · intro · demand 3
- Learner knows: that savings can grow by compounding (compound-interest lesson) / does not know: that a small yearly percentage fee is taken from a growing balance, so its dollar cost grows too.
- Misconception: "A 1% fee is just 1% of what I end up with."
- Prediction: "$10,000 grows at 7% a year for 30 years. A fund charges 1% a year (so you net 6%). What share of the final balance do the fees cost?" options: A about 1% / B about 10% / C about 25% (answer: C). Check: 10,000 × 1.07^30 = 76,123; 10,000 × 1.06^30 = 57,435; gap 18,688; 18,688 / 76,123 = 24.5%.
- Interaction: one slider for the fee (0% to 2%); a single line chart of the balance over 30 years with the no-fee line ghosted, gap shaded. Learner feels each 0.25% step.
- Payoff: A fee is a rate, so it compounds against you for as long as you hold: a 1% rate difference becomes a quarter of the outcome.
- Claims to check: (1) balance = deposit × (1+r)^t, redo by calculator; (2) 76,123 and 57,435 and the 24.5% gap, arithmetic; (3) model assumptions stated: constant 7% gross return, fee charged as a share of balance once a year, no deposits or taxes, real returns vary.

### 2. minimum-payment-trap · concept: minimum-payment-trap · intro · demand 3
- Learner knows: what interest on a debt is / does not know: that interest is charged on what is still owed each month, so a small payment may barely dent it.
- Misconception: "$3,000 at $90 a month takes about 33 months."
- Prediction: "A $3,000 card balance charges 20% a year (1.667% a month). You pay $90 every month and buy nothing new. How long until it is paid off?" options: A about 33 months / B about 50 months / C never (answer: B). Check: months = -ln(1 - 50/90) / ln(1.016667) = 0.8109 / 0.016529 = 49.1, so the 50th payment; 3,000/90 = 33.3 is the no-interest answer; interest in month 1 is 3,000 × 0.016667 = $50.
- Interaction: slider for the monthly payment ($50 to $300); a draining-balance bar (single representation) and a month counter. At $50 the balance does not move.
- Payoff: Interest eats first, so the payment that counts is the part above the interest.
- Claims to check: (1) monthly rate = 20%/12 = 1.667% (simplified, real cards vary by method); (2) the payoff time formula, redo by stepping the balance month by month; (3) total interest about $1,400 (49.1 × 90 − 3,000); (4) model labelled: fixed APR, no fees, no new purchases.

### 3. start-early-race · concept: start-early · intro · demand 3
- Learner knows: compounding grows later decades more / does not know: that time can be worth more than the amount contributed.
- Misconception: "Whoever puts in more money ends up with more."
- Prediction: "Ana saves $2,400 a year for 10 years, then stops. Ben waits 10 years, then saves $2,400 a year for 30 years. Both earn 7% a year and look at age 65 (40 years after Ana starts). Who has more?" options: A Ana / B Ben / C about equal (answer: A). Check: Ana: 2,400 × (1.07^10 − 1)/0.07 = 33,160 at year 10, × 1.07^30 (7.612) = about 252,400. Ben: 2,400 × (1.07^30 − 1)/0.07 = about 226,700. Ana put in $24,000, Ben $72,000.
- Interaction: one slider: how many years Ben waits (0 to 20 years later). Two lines racing, one plotted per person. Learner finds the start delay at which Ben falls behind.
- Payoff: In a compounding model, early money has the most time to grow, so when you start can outweigh how much you add.
- Claims to check: (1) end-of-year deposits future value formula; (2) the two totals, redo by spreadsheet; (3) contributions $24,000 vs $72,000; (4) model labelled: fixed 7%, no taxes or fees, no inflation; not a prediction of returns.

### 4. inflation-halves-cash · concept: inflation · intro · demand 2
- Learner knows: prices usually go up / does not know: that purchasing power erodes by compounding, not in a straight line.
- Misconception: "3% a year for 24 years takes away 72% of the value."
- Prediction: "Prices rise 3% every year. About how much will $100 of cash buy, in today's money, after 24 years?" options: A about $28 / B about $49 / C about $72 (answer: B). Check: 100 / 1.03^24 = 100 / 2.033 = $49.19; the straight-line guess 100 − 24 × 3 = $28 is wrong because each year's 3% applies to a shrinking value; $72 would be 1% a year.
- Interaction: slider for years (0 to 40) at a fixed 3%; a stack of coins/basket icon shrinking in a single bar showing what the same cash buys. Second tap changes the rate between 2%, 3%, 5%.
- Payoff: Inflation compounds like interest, so a modest rate halves what cash buys in a generation.
- Claims to check: (1) purchasing power = cash / (1+i)^t; (2) 1.03^24 = 2.033; (3) halving time ~ 72/3 = 24 years (rule of 72, approximate); (4) assumption stated: constant 3% rate, which is illustrative, not a forecast.

### 5. up-then-down-trap · concept: volatility-drag · intro · demand 2 [exploration]
- Learner knows: percentages / does not know: that a gain and an equal-size loss do not cancel because they apply to different bases.
- Misconception: "Up 50% then down 50% gets me back to even."
- Prediction: "$100 rises 50%, then falls 50%. What is it worth?" options: A $100 / B $75 / C $125 (answer: B). Check: 100 × 1.5 = 150; 150 × 0.5 = 75. Getting back needs a fall of 33.3% (150 × 2/3 = 100).
- Interaction: no slider, no text on the stage: the learner taps a sequence of up/down tiles (each +50% or -50%) to build a path, the bar height following each tap. Task: find a sequence that ends exactly at 100, discovering that +50% needs -33%.
- Payoff: Percent changes multiply on the current value, so losses need bigger percentages to undo.
- Claims to check: (1) 100×1.5×0.5 = 75; (2) recovery needs -33.3% (1/1.5 = 0.667); (3) model: arbitrary example numbers, not a market claim.

### 6. real-rate-illusion · concept: real-interest-rate · core · demand 2
- Learner knows: inflation erodes cash (from the inflation lesson) / does not know: how to net interest against inflation.
- Misconception: "If my account pays 3% I am gaining 3%."
- Prediction: "Your savings pay 3% a year; prices rise 5%. After a year, what can your money buy compared with now?" options: A more / B the same / C less (answer: C). Check: 1.03 / 1.05 = 0.981, so about 1.9% less; $100 becomes $103 that buys what $98.10 buys today.
- Interaction: one slider: the inflation rate (0% to 8%) with interest fixed at 3%; a balance marker and a basket marker move; colour flips where the lines cross (inflation 3%).
- Payoff: What matters is interest relative to price rises, the real rate, roughly the difference.
- Claims to check: (1) real rate = (1+i)/(1+π) − 1; (2) 0.981 arithmetic; (3) "roughly interest minus inflation" is an approximation that works for small rates; (4) rates are illustrative.

### 7. longer-loan-cost · concept: loan-term-cost · core · demand 2
- Learner knows: loans charge interest / does not know: that a lower monthly payment can cost much more in total.
- Misconception: "A lower payment means a cheaper loan."
- Prediction: "A $20,000 loan at 6% a year. Stretching it from 5 years to 7 cuts the payment by about $95 a month. How much more interest do you pay overall?" options: A about $200 / B about $1,300 / C about $5,000 (answer: B). Check: monthly rate 0.5%; 60 payments of $386.66 = $23,200 (interest $3,200); 84 payments of $292.16 = $24,541 (interest $4,541); difference about $1,340.
- Interaction: slider for term (2 to 8 years); one stacked bar splitting total paid into principal and interest, and the monthly payment printed.
- Payoff: Time is what you pay interest for; a smaller payment mostly buys more months of interest.
- Claims to check: (1) payment = P·r / (1 − (1+r)^−n); (2) the four figures above by calculator; (3) model: fixed rate, level payments, no fees; rate illustrative, not a current market rate.

### 8. sunk-cost-exit · concept: sunk-cost · intro · demand 2 [exploration]
- Learner knows: money already spent / does not know: that only future costs and benefits can change a choice.
- Misconception: "I have spent so much already, I must finish."
- Prediction: "You have spent $80,000 on a project. Finishing costs $30,000 more and will bring in $20,000. Should you finish?" options: A yes, or the $80,000 is wasted / B no / C it depends on how much was spent (answer: B). Check: finishing nets 20,000 − 30,000 = −$10,000; the $80,000 is gone either way, so it appears in both choices and cancels.
- Interaction: no text on stage: two bars, "stop" and "finish", and a draggable block for the amount already spent. Dragging the block changes both bars by the same amount, so the gap never moves; the learner then changes the future benefit tile to see the decision flip.
- Payoff: A sunk cost sits in every option, so it cannot make one better than another.
- Claims to check: (1) the stop vs finish totals differ by exactly −10,000 regardless of the sunk amount, derivation; (2) the lesson says "in this simple model, ignoring reputation and learning"; (3) no advice about real projects.

### 9. rule-of-72-shortcut · concept: rule-of-72 · intro · demand 2
- Learner knows: compounding grows balances / does not know: a mental shortcut for doubling time.
- Misconception: "At 9% it takes 100 / 9 = 11 years to double."
- Prediction: "Money grows 9% a year. About how long to double?" options: A about 8 years / B about 11 years / C about 16 years (answer: A). Check: 72 / 9 = 8; exact: 1.09^8 = 1.993, ln 2 / ln 1.09 = 8.04 years; 100/9 = 11.1 would be doubling with simple interest.
- Interaction: slider for the rate (1% to 20%); a doubling-time readout from the exact formula next to a ruler marking 72/rate. Learner sees where the shortcut is accurate and where it drifts.
- Payoff: 72 divided by the rate gives a quick, close estimate of doubling time.
- Claims to check: (1) exact doubling time ln2/ln(1+r); (2) 72/r accuracy table at 2%, 6%, 9%, 12%, 20% by calculator; (3) the rule is an approximation, best near 6% to 10%.

### 10. shared-pasture · concept: tragedy-of-commons · core · demand 2 [exploration]
- Learner knows: sharing / does not know: how every sensible choice can ruin the shared resource.
- Misconception: "If everyone is rational, the shared resource will be fine."
- Prediction: "10 herders share a pasture, one cow each. Each cow earns 20 minus the total number of cows, so each herder earns 10. You alone add a second cow. What do you earn?" options: A 9 / B 18 / C 10 (answer: B). Check: 11 cows → each earns 9; you have 2 cows → 18.
- Interaction: no slider: the learner is a herder and taps "add a cow" or "keep" each round, while nine others (seeded rule: add if it pays) respond. The bar shows total income of all herders per round. Unusual format: the learner plays, then sees total fall to 0 at 20 cows.
- Payoff: Adding a cow pays you now while its cost is shared by everyone, so each herder adds and the group's income falls from 100 to 0.
- Claims to check: (1) payoff arithmetic for each round; (2) group income n(20−n) peaks at n = 10 (100); (3) model: made-up numbers, no ownership, no rules; real communities often manage commons (Ostrom), say this in the reveal with source.

### 11. true-cost-of-free-hours · concept: opportunity-cost · intro · demand 2
- Learner knows: price tags / does not know: that the cost of a choice includes the best alternative given up.
- Misconception: "A $50 course costs $50."
- Prediction: "A course costs $50 and takes 3 hours. In those 3 hours you could have earned $20 an hour. What does the course really cost you?" options: A $50 / B $60 / C $110 (answer: C). Check: 50 + 3 × 20 = 110.
- Interaction: slider for hours (1 to 8); a stack with two blocks, fee and given-up earnings, growing together. Learner then switches the alternative from "work" to "nothing" (a second tap) and the block disappears.
- Payoff: The cost of a choice is what you give up, which is not always on the price tag.
- Claims to check: (1) 50 + 60 = 110; (2) model note that the 'earnings' only count if the work was actually available; (3) numbers are illustrative.

### 12. widget-marginal-cost · concept: marginal-cost · core · demand 2
- Learner knows: total cost vs per-item cost / does not know: that the next unit's added cost differs from the average.
- Misconception: "The 51st widget costs about what the average widget costs."
- Prediction: "A workshop pays $100 in fixed costs plus $2 per widget. The average cost of 50 widgets is $4. How much extra does the 51st add?" options: A about $4 / B $2 / C $102 (answer: B). Check: total at 50 = 100 + 100 = 200 (average 4.00); at 51 = 202; added 2; new average 3.96.
- Interaction: slider for widgets made (1 to 100); one chart with two lines, average (falling) and the added cost of the next (flat at $2), a marker on each.
- Payoff: Decisions about the next unit depend on the added cost, not the average.
- Claims to check: (1) average = 100/n + 2, redo at n = 10, 50, 100; (2) marginal cost constant at $2 in this model; (3) model: real costs often rise at high output.

### 13. kitchen-crowding · concept: diminishing-returns · core · demand 2
- Learner knows: more workers means more output / does not know: that each extra worker often adds less.
- Misconception: "Four workers make four times as much as one."
- Prediction: "One worker in a small kitchen makes 10 pizzas an hour. Each added worker adds 2 fewer than the last (8, then 6, then 4...). How many pizzas an hour with 4 workers?" options: A 40 / B 28 / C 20 (answer: B). Check: 10 + 8 + 6 + 4 = 28.
- Interaction: tap "add a worker" up to 8 (also a step back); a single stack of coloured blocks shows each worker's added pizzas shrinking, and the total beside it.
- Payoff: When something else is fixed (the oven), each extra worker adds less than the one before.
- Claims to check: (1) sum of the series; (2) the increments are made-up, labelled as a model; (3) the total peaks at 5 workers at 30 then adds nothing (check 10+8+6+4+2 = 30).

### 14. revenue-sweet-spot · concept: revenue-elasticity · core · demand 2
- Learner knows: higher price means fewer sales (from supply-demand) / does not know: that revenue rises then falls as price rises.
- Misconception: "A higher price always means more money."
- Prediction: "A bakery sells 100 − 10 × price loaves a day. Which price earns the most revenue: $3, $5 or $8?" options: A $3 / B $5 / C $8 (answer: B). Check: $3 × 70 = 210; $5 × 50 = 250; $8 × 20 = 160; revenue p(100 − 10p) peaks where 100 − 20p = 0, p = 5.
- Interaction: slider for the price ($0 to $10); the loaves sold and a revenue rectangle (price × quantity) as the single picture; the rectangle's area grows then shrinks.
- Payoff: Raising the price gains on each sale but loses sales; the best price balances the two.
- Claims to check: (1) three revenue values by multiplication; (2) peak at $5 by derivation; (3) model labelled: straight-line demand, revenue only (not profit).

### 15. flour-shock · concept: supply-shift · core · demand 2
- Learner knows: the bread market model and the cap (supply-demand lesson) / does not know: that a cost rise shifts the whole supply line, not just the price.
- Misconception: "If flour costs more, bread should cost exactly that much more."
- Prediction: "In the bread model buyers want 100 − 10p; bakers bake 10p − 20. Flour gets dearer and bakers now bake 10p − 40. The price was $6. What is the new price?" options: A $6 / B $7 / C $8 (answer: B). Check: 100 − 10p = 10p − 40 gives p = 7, quantity 30 (was 40 at $6).
- Interaction: slider for how much dearer flour is (0 to 4 loaves fewer per price step); the crossing point slides on one graph; readouts of price and loaves.
- Payoff: A cost shock moves the whole curve; buyers cut back and share the cost, so price rises by less than the full cost.
- Claims to check: (1) algebra above; (2) crossing at (7, 30); (3) model labelled: straight lines, one market; real pass-through varies.

### 16. apr-apy-gap · concept: apr-vs-apy · intro · demand 2
- Learner knows: compounding / does not know: that how often interest is added changes the yearly result.
- Misconception: "12% a year compounded monthly means exactly 12% after a year."
- Prediction: "An account quotes 12% a year (APR), adding 1% each month. After one year, how much has $100 grown?" options: A exactly $12 / B about $12.68 / C about $14 (answer: B). Check: 1.01^12 = 1.126825.
- Interaction: tap steps of compounding frequency (yearly, quarterly, monthly, daily) and watch a year-bar fill in steps; readout of the effective rate. Learner sees the gain flatten.
- Payoff: More frequent compounding helps a little, then stops mattering: 12% compounded daily is only about 12.75%.
- Claims to check: (1) (1 + r/n)^n − 1 at n = 1, 4, 12, 365 gives 12.00%, 12.55%, 12.68%, 12.75%, redo by calculator; (2) APR/APY naming conventions vary by product; say "quoted rate vs effective rate".

### 17. insurance-fair-price · concept: insurance-expected-cost · core · demand 2
- Learner knows: probability as chances / does not know: why paying more than the average loss can still be sensible.
- Misconception: "If insurance costs more than the average loss, it is a rip-off."
- Prediction: "A 1-in-100 chance of losing $10,000. An insurer charges $120 a year to cover it. On average, how much does the insurer pay out per customer?" options: A $120 / B $100 / C $0 (answer: B). Check: 0.01 × 10,000 = $100; the $20 left covers the insurer's costs in this model.
- Interaction: tap to simulate 100 customers in a grid (seeded); exactly one loses $10,000; slider for premium; the picture is the pool of money vs the one loss.
- Payoff: Insurance swaps a small certain cost for protection from a rare big loss; the average cost is just the starting point.
- Claims to check: (1) expected loss = 0.01 × 10,000 = 100; (2) pooling: a fixed pool is exposed to one 10,000 loss out of 100 in the example; (3) model: independent risks, no fraud, premium covers costs; no advice about buying cover.

### 18. two-bets-split · concept: diversification · core · demand 2
- Learner knows: expected value / does not know: that splitting across independent bets cuts the chance of losing without changing the average.
- Misconception: "Splitting your money must lower what you expect to make."
- Prediction: "Each of two independent bets pays +20% or -10% with equal chance. You put half your money in each. What is the chance you lose money?" options: A 50% / B 25% / C 0% (answer: B). Check: only both falling loses: 0.5 × 0.5 = 25% (result -10%); outcomes: +20% (25%), +5% (50%), -10% (25%); average 5% either way.
- Interaction: slider for number of independent bets (1 to 6) the money is split across; a histogram with a single bar series; the loss share shrinks while the average marker stays fixed.
- Payoff: Independent bets partly cancel each other, so spreading cuts the chance of a bad outcome without cutting the average.
- Claims to check: (1) the probabilities and the average, enumeration; (2) the key assumption (independence) stated in the lesson; (3) model labelled, not investment advice, and real assets move together at times.

### 19. wait-or-take-now · concept: present-value · core · demand 2
- Learner knows: compounding / does not know: that future money is worth less today, by an amount that depends on what you could earn.
- Misconception: "$1,200 later is obviously more than $1,000 now."
- Prediction: "Offer: $1,000 today or $1,200 in 3 years. If you could earn 5% a year elsewhere, which is worth more today?" options: A $1,000 today / B $1,200 in 3 years / C they are equal (answer: B). Check: 1,200 / 1.05^3 = 1,200 / 1.1576 = $1,036.6 > $1,000. At 7% it is $979.5, so the answer flips; the break-even rate is 1.2^(1/3) − 1 = 6.27%.
- Interaction: slider for the earning rate (0% to 12%); a balance scale or two bars (today's $1,000 vs the $1,200 shrunk to today's value); flip point visible.
- Payoff: A future amount is worth what it would take today to grow into it, so the answer depends on the rate.
- Claims to check: (1) PV = FV / (1+r)^n; (2) 1,036.6, 979.5 and 6.27%; (3) model labelled: sure payment, constant rate, no tax; not advice.

### 20. cheese-for-bread · concept: comparative-advantage · stretch · demand 1 [exploration]
- Learner knows: opportunity cost (once taught) / does not know: that even someone better at everything gains from trade.
- Misconception: "If Ana is better at both, she gains nothing by trading with Ben."
- Prediction: "Ana makes 4 loaves or 2 cheeses an hour; Ben makes 1 loaf or 1 cheese. Each works 8 hours. Together they make 20 loaves and 12 cheeses (each splits time evenly). Can they make the same 12 cheeses and more loaves?" options: A no, Ana is better at both / B yes, 24 loaves, if Ben makes cheese / C yes, but only Ben gains (answer: B). Check: Ben 8 h cheese = 8; Ana 2 h cheese = 4; total 12 cheeses; Ana 6 h bread = 24 loaves (vs 20).
- Interaction: no slider, no text on stage: the learner builds the plan by dragging hour tokens (16 tokens) onto a bread tray or a cheese tray for each person; a single scoreboard of loaves and cheeses.
- Payoff: Trade pays when each does the job where they give up least, even if one is better at everything.
- Claims to check: (1) the production numbers; (2) opportunity costs: Ana 1 cheese = 2 loaves, Ben 1 cheese = 1 loaf; (3) model labelled: fixed rates, no transport or sharing costs.

### 21. tax-who-pays · concept: tax-incidence · stretch · demand 1 [exploration]
- Learner knows: the bread market model / does not know: that who is legally taxed does not decide who bears the tax.
- Misconception: "If bakers pay the tax, bakers bear all of it."
- Prediction: "In the bread model (buyers want 100 − 10p, bakers bake 10p − 20, price $6), the government taxes bakers $2 a loaf. How much more do buyers pay?" options: A $0 / B $1 / C $2 (answer: B). Check: bakers now bake 10(p − 2) − 20 = 10p − 40; meets 100 − 10p at p = 7; buyers pay $7 (+$1), bakers keep $5 (−$1).
- Interaction: a switch with no text: tax collected from bakers or from buyers; a bar split shows who loses what; the split stays $1 and $1 when the switch flips. A slider then tilts the buyers' sensitivity.
- Payoff: The market, not the tax form, splits the burden.
- Claims to check: (1) algebra above for both sides; (2) the split depends on relative steepness (stated as a model result, Mankiw ch. 6 and 8); (3) no claim about whether any tax is good.

### 22. twenty-dollar-basket · concept: budget-constraint · intro · demand 1 [exploration]
- Learner knows: prices / does not know: that a budget turns every purchase into a trade against another.
- Misconception: "Buying one more of something is free if it is still within budget."
- Prediction: "You have $20. Apples cost $2 each, loaves $4. You buy 3 loaves. What is the most apples you can add?" options: A 4 / B 6 / C 8 (answer: A). Check: 20 − 12 = 8; 8 / 2 = 4 apples.
- Interaction: the learner builds a basket by tapping items into a cart bar of $20; the picture is a grid of 10 apple slots that fill; no text apart from numbers. Each loaf takes two apple slots.
- Payoff: Within a fixed budget every extra loaf costs two apples: the trade-off is the price ratio.
- Claims to check: (1) arithmetic; (2) the ratio 4/2 = 2 apples per loaf; (3) prices are illustrative.
