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

---

## Round 2 (briefs #23–#55)

written 2026-10-12 · curriculum now 57 concepts. #23–#28 brief the six concepts that round 1 left unbriefed (break-even, unit-pricing, percentage-points, public-goods-free-rider, prisoners-dilemma, production-possibilities); the "Not briefed yet" list above is superseded by this section. #29–#55 cover 27 new concepts. All answers were recomputed in `artifacts/scratch/cm-economics-r2/check.mjs`. Every lesson is a labelled simplified model with stated assumptions; none says what to buy, borrow or do. Earn-the-reveal: each brief names the key state; the reveal unlocks only once the stage has reached it (`interact()` called only for steps toward it). Question numbers equal the stage's starting numbers. [exploration] marked on 10 of these 33 (16 of 55 overall).

### 23. break-even-cups · concept: break-even · intro · demand 2
- Learner knows: revenue and cost / does not know: that fixed costs are repaid one unit at a time by what each sale leaves over.
- Misconception: "I break even when I have sold as much as I spent."
- Prediction: "A lemonade stand costs $300 a day to run. Each cup costs $1 to make and sells for $3. How many cups to break even?" options: A 100 / B 150 / C 300 (answer: B). Check: each cup leaves 3 − 1 = $2; 300 / 2 = 150 cups.
- Key state: the stack of per-cup $2 blocks has covered the $300 bar exactly (cup 150); before that the bar still has a gap.
- Interaction: tap "sell a cup" (and a +10 step); a single bar of $300 fills block by block, the counter beside it. A price tile (2, 3, 4) changes the block size.
- Payoff: Break-even is the fixed cost divided by what each unit leaves after its own cost.
- Claims to check: (1) 300 / (3 − 1) = 150; (2) at $4 it is 100 cups; (3) model: constant price and per-cup cost, no waste.

### 24. unit-price-aisle · concept: unit-pricing · intro · demand 2
- Learner knows: shelf prices / does not know: that the biggest pack is not always the cheapest per gram.
- Misconception: "Bigger packs are always better value."
- Prediction: "Three packs of the same rice: 500 g for $3.50, 750 g for $5.10, 1.2 kg for $8.40. Which is cheapest per 100 g?" options: A 500 g / B 750 g / C 1.2 kg (answer: B). Check: 0.70, 0.68, 0.70 dollars per 100 g.
- Key state: the three price-per-100g bars are all drawn and the 750 g bar is visibly the shortest.
- Interaction: the learner taps each pack to "pour" it into 100 g cups; a single row of three bars grows to show the cost per cup. A last tap re-prices the 1.2 kg pack with a slider.
- Payoff: Divide to compare; the sticker price and pack size hide the rate.
- Claims to check: (1) the three divisions; (2) numbers are invented, not real shop prices; (3) unit price ignores waste and storage.

### 25. rate-up-one-point · concept: percentage-points · intro · demand 1
- Learner knows: percentages / does not know: that "up 1 point" and "up 1 percent" are different statements.
- Misconception: "A rate that goes from 4% to 5% rose by 1%."
- Prediction: "A loan rate rises from 4% to 5%. By what percent did the rate itself rise?" options: A 1% / B 25% / C 5% (answer: B). Check: (5 − 4) / 4 = 0.25.
- Key state: two bars (4 and 5) with the one-point gap marked as a quarter of the first bar.
- Interaction: drag the top of the second bar between 4 and 8; two readouts, "points" and "percent", move together. Learner finds rises where the two numbers are far apart (1 to 2: +1 point, +100%).
- Payoff: A point is a distance on the scale; a percent change is that distance relative to where you started.
- Claims to check: (1) 25% by division; (2) 1 to 2 gives +100%; (3) wording convention (percentage points) matches style guides, cite one.

### 26. free-rider-pot · concept: public-goods-free-rider · core · demand 1 [exploration]
- Learner knows: shared resources (shared-pasture, once built) / does not know: why people hold back when a shared good benefits everyone.
- Misconception: "If a shared project is worth it for the group, people will pay for it."
- Prediction: "10 neighbours each hold $10. Every dollar put into the common pot becomes $3 of benefit, shared equally by all 10. You put in all $10; the others put in nothing. How much do you end up with?" options: A $30 / B $3 / C $13 (answer: B). Check: you keep $0 and receive 10 × 3 / 10 = $3; each other neighbour has 10 + 3 = $13.
- Key state: your pile shows $0 kept and $3 back while nine neighbours show $13; the group total reads $130 against $100 at the start.
- Interaction: unusual format, a game: drag one slider for your own contribution ($0 to $10) while the nine others follow a seeded rule; a single row of ten piles. Learner discovers that holding back always leaves them $2.70 ahead per dollar not given while everyone giving all makes everyone $30.
- Payoff: Each dollar returns only 30 cents to the giver, so withholding pays individually while contributing helps the group.
- Claims to check: (1) payoff arithmetic: give g, receive 0.3 × total; (2) all give: each ends with $30; (3) model: one-shot, no talk, no punishment; real groups often contribute, say so in the reveal with a source (public goods experiments, Ledyard 1995).

### 27. two-suspects-payoff · concept: prisoners-dilemma · core · demand 2 [exploration]
- Learner knows: choices have payoffs / does not know: that a choice can be best for each player and worst for both together.
- Misconception: "If both players can see the best result, they will pick it."
- Prediction: "Payoffs (you, other): both Cooperate 3, 3. You Defect, they Cooperate 5, 0. You Cooperate, they Defect 0, 5. Both Defect 1, 1. Whatever the other does, what is better for you?" options: A Cooperate / B Defect / C it depends on what they do (answer: B). Check: if they cooperate, 5 > 3; if they defect, 1 > 0.
- Key state: the learner has revealed both columns of the other player's choice and seen defect ahead in each.
- Interaction: a 2 by 2 grid, no text; learner taps a row for themselves while the other player's column flips between cooperate and defect on tap; the highlighted payoff pair moves. Then a ten-round replay against a seeded tit-for-tat opponent.
- Payoff: When defecting beats cooperating whatever the other does, both defect and each gets 1 instead of 3.
- Claims to check: (1) the dominance check above; (2) tit-for-tat as a repeated-game rule is described, not claimed optimal in general; (3) model labelled: payoffs invented, no communication.

### 28. bending-frontier · concept: production-possibilities · stretch · demand 1 [exploration]
- Learner knows: opportunity cost / does not know: that trading one good for another often gets steeper as you push one side.
- Misconception: "Moving from corn to wheat always costs the same corn per ton."
- Prediction: "A farm can make corn = 100 − wheat² (wheat 0 to 10 tons). Moving from 0 to 1 ton of wheat costs 1 ton of corn. What does moving from 9 to 10 tons cost?" options: A 1 / B 10 / C 19 (answer: C). Check: corn at 9 = 100 − 81 = 19; at 10 = 0; cost 19.
- Key state: the learner has dragged the point from low to high wheat and the marker's steps visibly lengthen, ending at the corn axis at 0.
- Interaction: one draggable point along a single curve; the two tiles beside it show the corn lost for the last 1-ton step. No other text.
- Payoff: Land best for corn goes first to wheat last, so each extra ton of wheat costs more corn than the last.
- Claims to check: (1) arithmetic above; (2) model: the curve is invented to show the shape, not data; (3) the term "increasing opportunity cost" matches a standard text.

### 29. net-hourly-after-costs · concept: net-hourly-earnings · intro · demand 2
- Learner knows: hourly pay / does not know: that costs of earning shrink pay per hour.
- Misconception: "$22 an hour is what a driving job pays me."
- Prediction: "A delivery job pays $22 an hour. You drive 15 miles an hour, and driving costs $0.50 a mile. What is left per hour?" options: A $22 / B $14.50 / C $7.50 (answer: B). Check: 15 × 0.50 = $7.50; 22 − 7.50 = $14.50.
- Key state: the pay bar has the cost block cut out of it and the remaining bar reads 14.5.
- Interaction: slider for miles per hour (0 to 30); one bar splits into kept pay and cost; a second tap swaps the per-mile cost between $0.25, $0.50, $0.70.
- Payoff: What matters is pay left after the costs of earning it.
- Claims to check: (1) arithmetic; (2) model ignores tax and tips; (3) per-mile figure is illustrative, not an official rate.

### 30. raise-into-new-bracket · concept: marginal-tax-rate · core · demand 2
- Learner knows: tax is a percentage / does not know: that a higher bracket applies only to the income above its threshold.
- Misconception: "A raise that pushes me into a higher bracket can leave me with less take-home."
- Prediction: "Made-up tax: 10% on the first $20,000 earned, 30% on every dollar above. Your pay rises from $19,000 to $21,000. How does take-home pay change?" options: A it falls / B it rises by about $1,600 / C it stays the same (answer: B). Check: before 19,000 − 1,900 = 17,100; after 21,000 − (2,000 + 300) = 18,700; change +1,600.
- Key state: the pay bar crossing $20,000 shows only the part above $20,000 tinted as the higher rate, and take-home higher than before.
- Interaction: slider for pay ($10,000 to $40,000); one bar split into kept, tax at 10%, tax at 30%; take-home and average-rate readouts.
- Payoff: The higher rate bites only the dollars above the line, so more pay still means more take-home.
- Claims to check: (1) arithmetic; (2) the brackets are fictional and not any country's; (3) model ignores credits and other taxes.

### 31. first-payment-mostly-interest · concept: amortization · core · demand 2
- Learner knows: loans charge interest / does not know: that level payments are mostly interest at first.
- Misconception: "A loan is paid down in a straight line."
- Prediction: "A $200,000 loan at 6% over 30 years has a payment of $1,199.10. After 5 years of payments, how much of the $200,000 have you paid off?" options: A about $33,000 / B about $14,000 / C about $72,000 (answer: B). Check: balance after 60 payments is $186,109, so $13,891 repaid; 5/30 of the loan would be $33,333; the payments total $71,946.
- Key state: the stack of payments shows interest dominating month 1 ($1,000 of $1,199.10) and the principal slice slowly thickening.
- Interaction: slider for the month number (1 to 360); one stacked bar for that month's payment split into interest and principal, and a running balance readout.
- Payoff: Interest is charged on a large balance first, so early payments barely reduce it.
- Claims to check: (1) payment formula (loan-term-cost claim); (2) 186,109 and 13,891 by stepping 60 months; (3) model: fixed rate, no fees, rate illustrative.

### 32. extra-hundred-a-month · concept: extra-loan-payment · core · demand 2
- Learner knows: amortization (once built) / does not know: that a small extra payment shortens the loan by years.
- Misconception: "$100 more on a $1,199 payment saves a few months."
- Prediction: "The same $200,000 loan at 6% would take 30 years. You add $100 to every payment. About how long does it take now?" options: A about 28 years / B about 24.6 years / C about 20 years (answer: B). Check: stepping the balance gives 295 months = 24 years 7 months; interest falls from $231,676 to $182,538, saving $49,138.
- Key state: the balance line with the extra payment hits zero at month 295 well before the 360-month mark.
- Interaction: slider for the extra amount ($0 to $500); a single balance-over-time line with the original ghosted; months and interest saved readouts.
- Payoff: Extra money goes entirely to principal, so every later month's interest shrinks.
- Claims to check: (1) 295 months and both interest totals by simulation; (2) model: fixed rate, no prepayment penalty; (3) no advice on whether to prepay.

### 33. which-debt-first · concept: debt-payoff-order · core · demand 2
- Learner knows: interest charges (minimum-payment-trap) / does not know: that order of repayment changes total interest.
- Misconception: "The order I pay debts in makes no difference to the cost."
- Prediction: "Two card debts: $1,000 at 6% a year and $4,000 at 24% a year. You pay $300 a month in total, all on one debt until it is gone, then the other (ignore minimums). How much less interest do you pay by paying the 24% debt first?" options: A about $30 / B about $300 / C nothing (answer: B). Check: step by month: 24%-first total interest $793; $1,000-first $1,095; difference $302.
- Key state: both runs shown finished, the interest totals sitting beside each other, the 24% run lower.
- Interaction: a toggle for which debt gets the $300; one line chart of total owed for the chosen order with the other ghosted; interest paid so far.
- Payoff: Money that kills the higher-rate balance first stops the most interest from being added.
- Claims to check: (1) the two totals by simulation (monthly rate = APR/12, payment after interest); (2) model: fixed rates, no minimums, no new spending; (3) this is arithmetic about one model, not advice to any person.

### 34. salt-and-concert-tickets · concept: price-elasticity · core · demand 2
- Learner knows: revenue peaks at some price (revenue-sweet-spot) / does not know: that whether a price rise adds revenue depends on how much buyers cut back.
- Misconception: "A price rise always cuts sales enough to hurt, or never does."
- Prediction: "Both sellers raise prices 10%. Salt buyers cut purchases by 1%; concert-ticket buyers cut by 20%. Whose revenue rises?" options: A both / B only salt / C only tickets (answer: B). Check: salt 1.10 × 0.99 = 1.089 (+8.9%); tickets 1.10 × 0.80 = 0.88 (−12%).
- Key state: both revenue rectangles redrawn at +10% price, the salt one taller than before and the ticket one shorter.
- Interaction: slider for the price rise (0 to 30%) for each of two goods in turn (two taps pick the good); one rectangle (price × quantity) with the old outline ghosted.
- Payoff: A price rise helps when buyers barely react and hurts when they walk away.
- Claims to check: (1) multiplications above; (2) cutbacks are invented example sensitivities, not measured; (3) model: revenue not profit, one price step.

### 35. price-floor-glut · concept: price-floor · core · demand 1
- Learner knows: the bread model and a cap (supply-demand) / does not know: that a price held above the balance leaves goods unsold.
- Misconception: "A higher guaranteed price helps sellers without costs."
- Prediction: "Bread model: buyers want 100 − 10p, bakers bake 10p − 20 (balance at $6, 40 loaves). A rule says bread cannot sell below $8. How many loaves go unsold?" options: A 0 / B 20 / C 40 (answer: C). Check: at $8 buyers want 20, bakers make 60; unsold 40.
- Key state: the price marker pushed up past $6 with the gap between the supply and demand bars at the marker visibly widening to 40.
- Interaction: slider for the floor ($4 to $10); one graph with two lines and a price level; the gap between bars labelled as a number. Below $6 nothing changes (the rule does not bind), which the learner finds.
- Payoff: A floor above the balance price raises the price but leaves a surplus, because it does not change what buyers want.
- Claims to check: (1) the three quantities; (2) model: straight lines, one market, sellers bake what they expect to sell; (3) no claim about any real minimum price.

### 36. heat-wave-demand · concept: demand-shift · core · demand 2
- Learner knows: supply shift (flour-shock) / does not know: that a demand rise moves price and quantity together.
- Misconception: "A demand rise only changes the price."
- Prediction: "Ice cream model: buyers want 100 − 10p, sellers supply 10p − 20, balance $6 at 40. A heat wave makes buyers want 30 more at every price. What is the new price?" options: A $6 / B $7.50 / C $9 (answer: B). Check: 130 − 10p = 10p − 20 gives p = 7.5, quantity 55.
- Key state: the demand line has shifted up and the crossing dot has moved along the supply line to (7.5, 55).
- Interaction: slider for the extra demand (0 to 50); one graph; readouts of price and quantity; the old crossing ghosted.
- Payoff: When buyers want more at every price, sellers supply more only by charging more, so price and quantity both rise.
- Claims to check: (1) algebra; (2) model: straight lines; (3) real shifts are messier.

### 37. buyers-who-would-pay-more · concept: consumer-surplus · core · demand 1
- Learner knows: price and demand / does not know: that most buyers get more value than they pay.
- Misconception: "At the market price, everyone is paying exactly what it is worth to them."
- Prediction: "Five buyers would pay up to $10, $8, $6, $4, $2 for a cup. The price is $5. What is the total of their gains (value minus price) among those who buy?" options: A $15 / B $9 / C $24 (answer: B). Check: three buy; gains 5 + 3 + 1 = 9; they pay 15; they value it at 24.
- Key state: the price line drawn through the five buyer bars with the gap above $5 shaded and summed to 9.
- Interaction: slider for the price ($1 to $10); five bars (buyers' values), a line at the price; shaded gaps and a single total readout.
- Payoff: Buyers who value a good above its price keep the difference.
- Claims to check: (1) arithmetic; (2) at $3 four buy with surplus 7 + 5 + 3 + 1 = 16; (3) model: invented values, one cup each.

### 38. monopolist-holds-back · concept: monopoly-pricing · stretch · demand 1 [exploration]
- Learner knows: marginal cost and revenue (earlier lessons) / does not know: that a seller with no rivals picks a higher price and a smaller amount.
- Misconception: "A seller with no rival charges whatever it likes, so price is unlimited."
- Prediction: "Buyers pay 100 − q for the q-th unit; each unit costs $20 to make. One seller with no rival picks one price for everything. Which price earns the most profit?" options: A $20 / B $60 / C $100 (answer: B). Check: profit (p − 20)(100 − p): $60 gives 1,600; $50 gives 1,500; $70 gives 1,500; $20 gives 0; $100 sells nothing.
- Key state: a price marker with the profit rectangle at its largest at $60 (area 40 × 40) after the learner has moved the marker on both sides.
- Interaction: unusual format: the learner is the sole seller and drags a price marker; one rectangle (margin × units) is the whole picture; a "competition" tap shows the price falling to $20 and 80 units.
- Payoff: Raising price loses sales, so the profit-maximising price sits between cost and the top of demand.
- Claims to check: (1) the profits above by multiplication; (2) with competition price equals cost, $20 and 80 units; (3) model: straight-line demand, one price, no regulation; no view on real firms.

### 39. bank-lends-it-again · concept: money-multiplier · stretch · demand 1 [exploration]
- Learner knows: a deposit sits in a bank / does not know: that lending and redepositing make total deposits a multiple of the first deposit.
- Misconception: "A $1,000 deposit is $1,000 of money in the system."
- Prediction: "A bank keeps 10% of each deposit and lends the rest; the borrower spends it and the seller deposits it. Starting from one $1,000 deposit and repeating without end, what do total deposits reach?" options: A $1,100 / B $2,000 / C $10,000 (answer: C). Check: 1,000 × (1 + 0.9 + 0.9² + …) = 1,000 / 0.1 = $10,000.
- Key state: the learner has stepped through several rounds with a running total, and the shrinking new-deposit bars approach the line at $10,000.
- Interaction: tap "next round" and watch one growing stack of deposit slabs, each 90% of the previous; a reserve-ratio tile (10%, 20%, 50%).
- Payoff: Each deposit funds the next loan, so the pile grows to the first deposit divided by the reserve share.
- Claims to check: (1) geometric sum, 100 rounds by script; (2) model: all loans redeposited, no cash held, fixed reserve ratio; real banks differ and many central banks use no reserve requirement (source in reveal); (3) it is a textbook simplification, labelled.

### 40. growth-gap-seventy-years · concept: growth-rate-gap · core · demand 1 [exploration]
- Learner knows: compounding / does not know: that one point of growth rate changes a country's income a lot over generations.
- Misconception: "3% growth and 2% growth are nearly the same."
- Prediction: "Two countries start equally rich. One grows 3% a year, the other 2%. After 70 years, how much richer is the first?" options: A about 1.4 times / B about 2 times / C about 3 times (answer: B). Check: 1.03^70 = 7.92; 1.02^70 = 4.00; ratio 1.98.
- Key state: both lines drawn to year 70 with the end values 7.9 and 4.0 and the ratio visible.
- Interaction: unusual format: a slider for the year (0 to 70) scrubs two living bars (not lines); a tile picks the growth gap of 0.5, 1 or 2 points.
- Payoff: A small difference in the rate becomes a gap of a factor of two within a lifetime.
- Claims to check: (1) the two powers and the ratio; (2) rates are invented, not any country's record; (3) model: constant growth, no shocks, no forecast.

### 41. personal-inflation-basket · concept: price-index · core · demand 2
- Learner knows: inflation (inflation-halves-cash) / does not know: that a headline rate is a weighted average, and yours can differ.
- Misconception: "Inflation is the average of how much each price rose."
- Prediction: "A household spends 50% on rent (up 6%), 30% on food (up 2%), 20% on fun (up 0%). By how much did its total cost of living rise?" options: A 2.7% / B 3.6% / C 6% (answer: B). Check: 0.5 × 6 + 0.3 × 2 + 0.2 × 0 = 3.6; the plain average of 6, 2, 0 is 2.67.
- Key state: three item blocks sized by spending share, each coloured by its rise; the overall bar lands at 3.6.
- Interaction: drag the budget divider between rent and fun; the three price rises are fixed; the overall rise readout and one stacked bar update.
- Payoff: An index weights each price by how much of the budget it takes, so a household's own inflation is its own mix.
- Claims to check: (1) weighted average arithmetic; (2) shares and rises are invented; (3) model: the rise of the fixed basket, no switching of goods.

### 42. exchange-round-trip · concept: currency-spread · intro · demand 2
- Learner knows: that currencies have rates / does not know: that buying and selling rates differ, so a round trip loses money.
- Misconception: "Exchange the money there and back and I end with the same."
- Prediction: "A booth gives 0.90 euro per dollar and sells dollars at 1.05 dollars per euro. You change $1,000 into euros, then straight back, with no market move. How much do you hold?" options: A $1,000 / B $945 / C $900 (answer: B). Check: 1,000 × 0.90 = 900 euro; 900 × 1.05 = $945.
- Key state: the money bar shrinks at the first tap and again at the second, ending at 945.
- Interaction: tap "to euros" and "to dollars"; one bar shows the amount in the chosen currency; a slider for the spread (0% to 10%).
- Payoff: The gap between buy and sell rates is a cost paid on every crossing.
- Claims to check: (1) arithmetic; (2) rates are invented; (3) model: single booth, no fees; no tips on where to change money.

### 43. fee-on-two-week-loan · concept: short-loan-annualized · intro · demand 3
- Learner knows: APR (apr-vs-apy-gap) / does not know: that a small fee for a short loan is a very large yearly rate.
- Misconception: "A $15 fee on $100 is a 15% rate."
- Prediction: "A lender charges $15 to lend $100 for two weeks. Counting 26 two-week periods in a year, what is the simple yearly rate?" options: A 15% / B 390% / C 100% (answer: B). Check: 15 / 100 = 15% per period; 15 × 26 = 390%. (Compounding the 26 periods would give about 3,690%.)
- Key state: a timeline bar of 26 two-week blocks, with the $15 fee stamped in each block and the total of $390 per $100 shown.
- Interaction: slider for the loan length in days (7 to 90); fee fixed at $15 per $100; one bar of the year filled with fee blocks, the yearly-rate readout.
- Payoff: The same fee costs far more per year when the loan is short, so compare rates over the same time.
- Claims to check: (1) 15 × 26 = 390; (2) 1.15^26 = 37.86; (3) model: simple annualisation, fee-only, no rollover; no view on a particular lender.

### 44. square-root-wealth · concept: risk-aversion · stretch · demand 1 [exploration]
- Learner knows: expected value / does not know: that when each extra dollar matters less, a sure amount below the average can feel as good as a gamble.
- Misconception: "Someone indifferent to a 50-50 gamble over $0 or $100 must value it at $50."
- Prediction: "In a model, the 'felt value' of wealth W is its square root. A 50-50 coin gives $0 or $100. What sure amount feels exactly as good as the coin?" options: A $50 / B $25 / C $75 (answer: B). Check: 0.5 × √0 + 0.5 × √100 = 5; √25 = 5.
- Key state: the curve with a chord between (0, 0) and (100, 10), its midpoint at height 5 and the sure amount where the curve reaches 5 (x = 25).
- Interaction: unusual format: a single curve; the learner drags a vertical marker for a sure amount and a horizontal line shows the gamble's felt value; they stop when the marker's height equals the line.
- Payoff: When extra dollars matter less and less, a sure amount well below the average can equal a gamble.
- Claims to check: (1) arithmetic; (2) square-root utility is one textbook choice, not a measure of any person; (3) no advice about choices.

### 45. cheap-printer-dear-ink · concept: total-cost-of-ownership · intro · demand 2
- Learner knows: price tags / does not know: that a cheaper purchase price can cost more over its use.
- Misconception: "The cheaper one costs less."
- Prediction: "Printer A costs $60 and $0.10 a page. Printer B costs $150 and $0.03 a page. You will print 2,000 pages. Which costs less in total?" options: A printer A / B printer B / C the same (answer: B). Check: A 60 + 200 = $260; B 150 + 60 = $210.
- Key state: two stacked bars (price plus usage) at 2,000 pages with B shorter, after the learner has moved through the crossing.
- Interaction: slider for pages printed (0 to 4,000); two stacked bars of purchase plus running cost; the crossing at 1,286 pages marked.
- Payoff: Cost is the price plus the cost of using it, and which wins depends on how much you use it.
- Claims to check: (1) totals; (2) crossing at 90 / 0.07 = 1,286 pages; (3) prices invented.

### 46. same-dollars-more-shares · concept: average-purchase-cost · core · demand 2
- Learner knows: averages / does not know: that buying equal dollars gets more units when price is low.
- Misconception: "My average cost per share is the average of the prices."
- Prediction: "You put $100 into a fund at $10 a share, then at $5, then at $10. What is your average cost per share?" options: A $8.33 / B $7.50 / C $5 (answer: B). Check: 10 + 20 + 10 = 40 shares for $300 = $7.50; the simple average price is $8.33.
- Key state: the share stacks for each month, with the low-price month visibly the tallest, and the cost line sitting below the average price.
- Interaction: the learner sets the middle month's price with a slider ($2 to $20); equal-dollar blocks fill the three share columns; two readouts, average price and average cost.
- Payoff: Equal dollars buy more at low prices, so the average cost sits below the average price.
- Claims to check: (1) arithmetic; (2) the cost is a harmonic mean of the prices; (3) arithmetic only, no claim about returns or what to buy.

### 47. loaf-with-smoke · concept: externality · core · demand 2
- Learner knows: market balance / does not know: that when a cost falls on others, the market makes too much.
- Misconception: "The market quantity is the best quantity."
- Prediction: "Bread model: buyers' price for the q-th loaf is (100 − q) / 10, the bakers' cost is (q + 20) / 10, giving 40 loaves. Each loaf also puts $1 of smoke on neighbours. How many loaves match the true total cost?" options: A 40 / B 35 / C 0 (answer: B). Check: (100 − q) / 10 = (q + 20) / 10 + 1 gives q = 35.
- Key state: a third line (cost plus $1) added above the bakers' cost and the crossing with the buyers' line sitting at 35, left of 40.
- Interaction: slider for the size of the harm per loaf ($0 to $3); one graph with three lines; readouts of the market and the true-cost quantity. A tap adds a $1 per-loaf tax to the bakers.
- Payoff: A cost that falls on others is left out of the price, so more is made than the true cost justifies.
- Claims to check: (1) algebra; (2) a $1 tax on bakers moves the market to 35 in this model; (3) model: straight lines, harm valued at $1 for illustration; no claim about any policy.

### 48. lemon-market-unravels · concept: adverse-selection · stretch · demand 1 [exploration]
- Learner knows: insurance pooling (insurance-fair-price) / does not know: that when buyers cannot tell quality, the good ones leave.
- Misconception: "If buyers pay the average value, a fair price brings all cars to market."
- Prediction: "Half of used cars are good (worth $3,000 to buyers; owners sell only for $2,500 or more), half are bad (worth $1,000; owners sell for $500 or more). Buyers cannot tell, so they offer the average, $2,000. Which cars are for sale?" options: A all of them / B only the good ones / C only the bad ones (answer: C). Check: the good owners want at least 2,500 > 2,000 and refuse; bad owners take 2,000.
- Key state: car icons in a lot; at the offer line of $2,000 the good cars turn grey and leave, the remaining pool's average value falls to $1,000.
- Interaction: unusual format: the learner drags the buyers' offer from $500 up to $3,000 and watches cars leave or enter the lot; a second readout shows the average value of the cars still for sale.
- Payoff: A price that ignores quality drives out the cars worth more, so the average quality offered falls.
- Claims to check: (1) the threshold arithmetic; (2) at an offer above $2,500 all sell but buyers then pay more than the average of 2,000 (they lose); (3) Akerlof (1970) as the source, model labelled with invented numbers.

### 49. three-points-more-payment · concept: loan-rate-sensitivity · core · demand 2
- Learner knows: loan payments / does not know: that a few points of rate change the payment by far more than a few percent.
- Misconception: "Rates up from 4% to 7% add about 3% to the payment."
- Prediction: "A $300,000 loan over 30 years. The payment is $1,432 at 4%. At 7%, by how much does the payment rise?" options: A about 3% / B about 39% / C about 75% (answer: B). Check: 7% payment is $1,995.91; 1,995.91 / 1,432.25 = 1.394.
- Key state: two payment bars side by side with the 7% bar visibly taller by about two fifths.
- Interaction: slider for the rate (1% to 10%); one bar of the monthly payment with the 4% level as a line; a tile for the loan term.
- Payoff: Rate points change the interest paid on every dollar for decades, so payments move more than the points.
- Claims to check: (1) both payments by formula; (2) the 75% option is 7 / 4 − 1, the ratio of rates (not the payment); (3) model: fixed rate and term, illustrative rates, not a forecast.

### 50. twenty-then-ten-off · concept: percent-stacking · intro · demand 2
- Learner knows: percentages / does not know: that sequential discounts apply to different bases.
- Misconception: "20% off then 10% off is 30% off."
- Prediction: "A $100 coat is 20% off, then a coupon takes another 10% off the sale price. What is the total discount?" options: A 30% / B 28% / C 25% (answer: B). Check: 100 × 0.8 × 0.9 = $72, so 28% off.
- Key state: price bar after the first cut ($80) and the second cut shaving 10% of $80 = $8, ending at 72.
- Interaction: tap the two discounts as tiles in either order; one price bar with the cut blocks; swap order and see the end price stay $72.
- Payoff: Percent changes multiply, so stacked discounts are less than their sum, and the order does not matter.
- Claims to check: (1) multiplication; (2) order commutes (0.8 × 0.9 = 0.9 × 0.8); (3) numbers illustrative.

### 51. markup-fifty-margin-third · concept: markup-vs-margin · intro · demand 2
- Learner knows: percentages / does not know: that markup is on cost and margin is on price.
- Misconception: "A 50% markup is a 50% margin."
- Prediction: "A shop pays $60 for a jacket and adds a 50% markup. What share of the selling price is profit?" options: A 50% / B 33% / C 25% (answer: B). Check: price 60 × 1.5 = $90; profit $30; 30 / 90 = 33.3%.
- Key state: a bar for the price $90 split into $60 cost and $30 profit, with the profit visibly a third of the bar and half of the cost block.
- Interaction: slider for the markup (0% to 200%); one bar split into cost and profit; two readouts, markup and margin; learner notes margin can never reach 100%.
- Payoff: The same $30 is half of cost but a third of price, so name the base.
- Claims to check: (1) arithmetic; (2) margin = markup / (1 + markup); (3) numbers illustrative.

### 52. count-the-bread-once · concept: gdp-value-added · core · demand 2
- Learner knows: sales / does not know: that adding every sale in a chain counts the same wheat several times.
- Misconception: "Output is the total of everything sold."
- Prediction: "A farmer sells wheat for $1 to a miller, who sells flour for $3 to a baker, who sells bread for $6 to a family. Sales total $10. What does the economy produce (GDP) in this chain?" options: A $10 / B $6 / C $3 (answer: B). Check: value added 1 + (3 − 1) + (6 − 3) = $6, equal to the final sale.
- Key state: three stacked slices (1, 2, 3) added up to the final $6 bread bar.
- Interaction: tap each stage to colour its own contribution; one bar of the final bread price fills with the three slices; a toggle "count all sales" shows the double-counted $10.
- Payoff: Count only what each stage adds, or you count the wheat three times.
- Claims to check: (1) arithmetic; (2) final-sales and value-added methods agree; (3) model: a three-step chain, no imports or stocks.

### 53. bond-seesaw · concept: bond-price-yield · stretch · demand 1 [exploration]
- Learner knows: present value (wait-or-take-now) / does not know: why rising rates cut the price of an existing fixed payment.
- Misconception: "A bond that promises $1,000 is always worth $1,000."
- Prediction: "A bond pays $50 a year for 10 years, then $1,000. New bonds now pay 6% a year. What is this bond worth today?" options: A $1,000 / B about $926 / C about $1,060 (answer: B). Check: sum of 50 / 1.06^t for t = 1..10 plus 1,000 / 1.06^10 = $926.40.
- Key state: payment slabs shrunk toward today at 6%, adding to a bar under the $1,000 line.
- Interaction: unusual format: a seesaw: the learner drags the market rate (2% to 10%) and a single bar for the bond's price moves opposite; the $1,000 line marks the rate 5%.
- Payoff: A fixed payment is worth what it would cost today to get the same stream at the new rate, so prices and rates move opposite ways.
- Claims to check: (1) the discount sum by script; (2) at 4% the price is $1,081.11 (compute in the check); (3) model: annual payments, no default, constant rate; not advice on bonds.

### 54. bathtub-deficit-debt · concept: stock-vs-flow · intro · demand 1 [exploration]
- Learner knows: spending and income / does not know: that a deficit is a flow and debt is the accumulated stock.
- Misconception: "A deficit and a debt are the same thing."
- Prediction: "You owe $1,000. For six months you spend $200 more than you earn each month. What do you owe after six months (ignore interest)?" options: A $200 / B $1,000 / C $2,200 (answer: C). Check: 1,000 + 6 × 200 = $2,200.
- Key state: a bathtub of debt with a tap of $200 running each month; the water level has risen over six months to 2,200.
- Interaction: unusual format: a tap (flow) and a bathtub (stock); slider for the monthly gap (-$300 to +$300); a "next month" button steps the level; a negative gap drains it.
- Payoff: A flow adds to a stock each period, so debt only falls when the gap turns negative.
- Claims to check: (1) arithmetic; (2) model: no interest; interest would make the tub's inflow grow; (3) the analogy is a teaching model.

### 55. deduction-or-credit · concept: deduction-vs-credit · core · demand 2
- Learner knows: a flat tax rate (marginal-tax-rate) / does not know: that a deduction cuts taxable income while a credit cuts the tax bill.
- Misconception: "A $1,000 deduction and a $1,000 credit are worth the same."
- Prediction: "In a made-up system with a 20% tax rate, a $1,000 deduction cuts your tax by how much?" options: A $1,000 / B $200 / C $0 (answer: B). Check: taxable income falls by 1,000, so tax falls by 0.20 × 1,000 = $200; a $1,000 credit would cut it by $1,000.
- Key state: the income bar reduced by the deduction, with the tax slice shrinking by a fifth of the cut, beside the credit run in which the tax slice drops by the full 1,000.
- Interaction: one switch for deduction or credit, a slider for the tax rate (10% to 40%); a single tax bill bar that shortens.
- Payoff: A credit subtracts from the bill; a deduction subtracts from the income the bill is taken from.
- Claims to check: (1) arithmetic; (2) the system is fictional, not any country's; (3) no tax advice.

---

## Round 3 (briefs #56–#59)

written 2026-10-14 by cm-economics (Marco) · curriculum now 89 concepts. Coverage was 80/81; the one uncovered concept, schelling-segregation, already has its brief (`economics.markets.md` #1, mild-preferences-sharp-divides), so this round adds four new demand-3 concepts, two for personal finance and two for macro (the strands' own brief files were empty). They sit in the domain list, so `tools/claim.mjs next economics` hands them out before the strand lists; the strand leads (cm-economics-personal-finance, cm-economics-macro) may re-rank or move them. Every answer below was recomputed in node on 2026-10-14 (script inline in each "Check"). Every lesson is a labelled simplified model with its rules on the card; none says what to buy, borrow, vote for or do. Each brief gives the stage question (25 words or fewer), the key state(s) that gate the reveal, and a draft reveal at or under 90 words that quotes only gated states. Phone fit (`company/product/demo-standard.md`): at 390×844 the stage top and the reveal's last line are both on screen when the reveal opens, and everything the reveal names stays visible. Each stage is one picture and at most two control rows, so this should fit without the kit shrink.

### 56. order-of-the-bad-year · concept: sequence-of-returns · core · demand 3
- Learner knows: a gain and a loss multiply (up-then-down-trap) / does not know: that when money is taken out (or put in) each year, the order of the same returns changes the ending balance, even though without flows it does not.
- Misconception: "If the returns are the same, the order they come in does not matter."
- Prediction (stage text, 25 words or fewer): "$100k invested. One year +25%, one year −20%. You withdraw $20k at each year-end. Which order leaves more?" options: A Same either way / B The gain year first / C The loss year first (answer: B, $64k vs $55k).
- Check (node, end-of-year flows, `v = v × (1 + r) + flow`): withdraw $20k: loss first 100 × 0.8 − 20 = 60, × 1.25 − 20 = **55**; gain first 125 − 20 = 105, × 0.8 − 20 = **64**. Flow 0: both **100** (1.25 × 0.8 = 1). Withdraw $10k: 77.5 vs 82. Deposit $20k: loss first **145**, gain first 136 (the order flips). Deposit $10k: 122.5 vs 118.
- Key states (milestones): (m1) both orders run at withdraw $20k, the question's case (55 and 64 recorded); (m2) flow set to $0 with both orders shown (both 100). Optional (m3) deposit $20k with both orders: if reached, the reveal adds the flip sentence; the reveal never needs it.
- Interaction: one picture: a two-year balance line, the current order solid and the other order ghosted once it has run, end values labelled at the right edge. Controls: order chips (Loss first / Gain first) and one flow slider (deposit $20k … withdraw $20k, steps of $10k, starting at withdraw $20k). Rule line on the card: "Returns: +25% and −20%. Money moves at each year-end."
- Reveal (draft, 72 words without the optional sentence, 84 with it): "With no withdrawals both orders ended at $100k: ×1.25 then ×0.8 equals ×0.8 then ×1.25. Withdrawing $20k a year, gain first ended at $64k and loss first at $55k. A withdrawal after the loss comes out of a smaller pot, and that money is not there for the recovery. [If m3: Adding money flips it: loss first ended at $145k, because the deposit went in low.] A two-year toy model, not a forecast."
- Payoff: Order is harmless until money moves; then the bad year's timing decides how much is left.
- Planned claims: (1) without flows both orders end at $100k (derivation: 1.25 × 0.8 = 1, multiplication commutes); (2) withdrawing $20k at each year-end, gain first ends at $64k and loss first at $55k (derivation; node above); (3) depositing $20k instead, loss first ends at $145k and gain first at $136k (derivation; node); (4) model: two years, flows at year-end, no fees, taxes or inflation; not a forecast or advice (lesson rule, on the card). Out of learner text unless a human source check passes: that financial planners call this "sequence-of-returns risk" (terminology claim).
- Format: Single card.
- Curriculum: `{"primary":"economics:sequence-of-returns","also":["economics:volatility-drag"],"prerequisites":["economics:volatility-drag"],"level":"core","strand":"personal-finance","references":[],"tags":["investing","withdrawals","risk"]}`
- Notes: Differs from nearest: up-then-down-trap (volatility-drag) shows that +x% then −x% loses money in either order; here the returns cancel exactly (×1.0) and only the cash flow makes order matter. same-dollars-more-shares (average-purchase-cost) is about buying more units when prices are low; the m3 flip is the same idea seen as a balance, so keep m3 optional. Build after up-then-down-trap (published).

### 57. tax-now-or-tax-later · concept: tax-timing-equivalence · core · demand 3
- Learner knows: a flat tax rate and that savings grow (compound-interest, marginal-tax-rate) / does not know: that paying a flat tax before growth or after growth gives the same amount when the two rates are equal, because the order of multiplying does not matter; only the difference between today's rate and the later rate decides.
- Misconception: "Paying the tax now is better, because then all the growth is tax-free" (or the mirror: "deferring is better, because more money is growing").
- Prediction (stage text, 23 words): "$10,000 to save. A: taxed 25% now, then grows untaxed. B: grows untaxed, taxed 25% on withdrawal. Both grow 4×. Which ends bigger?" options: A Account A / B Account B / C They tie (answer: C, $30,000 each).
- Check (node): A = 10,000 × 0.75 × 4 = **30,000**; B = 10,000 × 4 × 0.75 = **30,000**. Later rate 15%: B **34,000** vs A 30,000. Later rate 35%: B **26,000** vs A 30,000. At 2× growth: 15,000 vs 15,000 (tie holds for any growth when the rates match).
- Key states (milestones): (m1) the question's case shown (25% and 25%, 4×: both $30,000, recorded); (m2) the later-rate slider moved off 25% (the B value at that rate recorded, e.g. $34,000 at 15%).
- Interaction: one picture: two stacked bars on one axis, A and B, each with its tax slice hatched at the moment it is taken (A's at the start, B's at the end). Controls: one slider for the later tax rate (10% to 40%, steps of 5, starts at 25%; today's rate fixed at 25% and printed on the rule line) and growth chips (2× / 4×). Rule line: "Made-up flat tax. Today 25%. Later: slider."
- Reveal (draft, 73 words): "Both ended at $30,000. A paid $2,500 tax up front and grew $7,500 to $30,000; B grew $10,000 to $40,000, then handed a quarter back. Both are $10,000 × 0.75 × 4, multiplied in a different order. Only a change in the rate decides it: at your {later rate} later rate, B ended at {B value}. A made-up tax system with flat rates, no limits or fees; not advice about any real account."
- Payoff: Tax before growth and tax after growth are the same multiplication; the choice is a bet on the future rate, not on growth.
- Planned claims: (1) at 25% now and 25% later with 4× growth, both end at $30,000 (derivation; node); (2) for any growth factor, equal flat rates give equal results (derivation: (1 − t) × G = G × (1 − t)); (3) at a 15% later rate B ends at $34,000, at 35% $26,000 (derivation; node; the reveal quotes whichever the learner chose); (4) the system is fictional, with flat rates and no contribution limits, fees or penalties; no tax advice (lesson rule, on the card). Out of learner text unless a human source check passes: any named real account (US Roth vs traditional IRA, UK ISA vs pension). The fact-checker cannot reach irs.gov or gov.uk here, so the lesson names none.
- Format: Single card.
- Curriculum: `{"primary":"economics:tax-timing-equivalence","also":[],"prerequisites":["economics:marginal-tax-rate","economics:compound-interest"],"level":"core","strand":"personal-finance","references":[],"tags":["tax","saving","accounts"]}`
- Notes: Differs from nearest: deduction-or-credit (fictional tax system) compares two reductions in one year; raise-into-new-bracket is about rates across income; this one is about when a rate is applied. The math map has no commutativity concept, so `also` is empty.

### 58. everyone-saves-nobody-does · concept: paradox-of-thrift · stretch · demand 3
- Learner knows: saving = income − spending, and one household that spends less saves more; one person's spending is another's income (count-the-bread-once) / does not know: that in a simple model with fixed investment, when every household tries to save more, incomes fall until total saving is back where it was.
- Misconception: "If every household saves $20 more, the country saves more."
- Prediction (stage text, 24 words): "Toy economy: income $1,000, households spend $900, businesses invest $100. Every household cuts spending $20 to save more. Once incomes settle, total saving is…" options: A $120 / B $100 / C $80 (answer: B).
- Model rules (on the card): spending = $80 + 80% of last round's income (it was $100 + 80% before the cut); investment fixed at $100; income = spending + investment; prices fixed.
- Check (node, round by round from income 1,000): round 1 spending 880, income 980, saving (last income − spending) **120**; round 2: 864, 964, 116; round 3: 851.2, 951.2, 112.8; round 20: income 901.2, saving 100.3; round 30: 900.1, 100.0; settles at income **900**, spending 800, saving **100**. Equilibrium algebra: income = (80 + 100) / (1 − 0.8) = 900; before the cut (100 + 100) / 0.2 = 1,000. Saving = income − 80 − 0.8 × income = 100 = investment at both. Builder rounds readouts to whole dollars (raw floats print 1000.0000000000002) and caps the run at 40 rounds.
- Key states (milestones): (m1) round 1 shown (saving jumps to $120, recorded); (m2) settled (income reads $900 and saving $100 at whole-dollar rounding, recorded).
- Interaction: one picture: a chart of total saving per round, with income as a readout above it, so the learner watches one thing (saving rise, then fall back). Controls: Next round / Run (computes, replays in at most 400 ms) / Reset. Optional cut chips ($20 / $40) in the same row; at $40 saving still settles at $100 and income at $800.
- Reveal (draft, 77 words): "Saving first jumped to $120, then fell back to $100 as income settled at $900. Each $20 not spent was someone else's lost income, so incomes fell until people could save only what businesses invest: $100. Everyone tried to save more; together they earned $100 less and saved the same. This is the paradox of thrift, in a toy model with fixed prices and fixed investment. If extra saving funded extra investment, the answer would change."
- Payoff: Saving more is a good plan for one household and can fail for all of them at once, because spending is income.
- Planned claims: (1) the model settles at income $900 after the cut, from $1,000 (derivation: (a + I)/(1 − c); node); (2) total saving equals investment, $100, before and after (derivation: S = Y − a − cY = I at equilibrium); (3) under the stated timing, saving is $120 in round 1 and falls back to $100 (simulation, deterministic; node above); (4) the name "paradox of thrift" and its popularisation by Keynes, The General Theory of Employment, Interest and Money (1936) (citation; the fact-checker confirms the attribution from the text, which is public domain in many countries, or drops the name to "a paradox"); (5) if investment rose with saving, total saving could rise (derivation within the model: S = I at equilibrium, so S moves with I). Model label on the card: fixed prices, fixed investment, no government or trade.
- Format: Single card (with Step).
- Curriculum: `{"primary":"economics:paradox-of-thrift","also":["economics:gdp-value-added"],"prerequisites":["economics:gdp-value-added","economics:stock-vs-flow"],"level":"stretch","strand":"macro","references":[],"tags":["macro","saving","Keynesian model"]}`
- Notes: Differs from nearest: bank-lends-it-again (money-multiplier) uses a similar round-by-round series, but for deposits re-lent by banks; this one is about income and a fallacy of composition, and its answer is "no change", not "five times". count-the-bread-once is the income = spending identity this builds on. It is a contested model in real economies, so the card says "toy model" and the reveal says what would change the answer.

### 59. debt-grows-ratio-falls · concept: debt-to-gdp-dynamics · core · demand 3
- Learner knows: a deficit adds to the debt each year (bathtub-deficit-debt) / does not know: that debt-to-GDP is a fraction, and growth in GDP can shrink it while the debt itself keeps rising.
- Misconception: "A government that borrows every year must see its debt burden (debt-to-GDP) keep rising."
- Prediction (stage text, 25 words): "Debt equals a year's GDP (100%). Each year the government borrows 3% of GDP more; GDP grows 5% a year. After 10 years, debt-to-GDP is…" options: A above 100% / B still 100% / C below 100% (answer: C, 85.7%).
- Model rules (on the card): money GDP (inflation included) grows first, then the year's borrowing, 3% of that year's GDP, adds to the debt; the borrowing includes interest; rates fixed.
- Check (node, start debt 100 and GDP 100): year 1 debt 103.2, GDP 105.0, ratio **98.2%** (100/1.05 + 3); year 10 debt **139.6**, GDP **162.9**, ratio **85.7%**; year 30 71.6%; year 60 65.0%; long-run limit f(1 + g)/g = 63.0% (brief only). Growth 2%: year 10 ratio **109.5%**. Borrowing 0%: 61.4%. Borrowing 5% with growth 5%: 101.9%.
- Key states (milestones): (m1) year 10 reached at 3% / 5%, the question's case (debt, GDP and ratio recorded); (m2) growth slider moved below 3% and year 10 reached (ratio above 100%, recorded).
- Interaction: one picture: the ratio per year as a line (0 to 10 years), the 100% start drawn as the first point only (no target or limit lines before the commit); debt and GDP as two readouts above the chart. Controls: Next year / Run to year 10 / Reset, and two sliders (borrowing 0% to 6%, growth 0% to 8%, steps of 1).
- Reveal (draft, 70 words): "Debt rose every year, from $100 to $140, yet the ratio fell to 86%, because GDP grew from $100 to $163. The ratio is a fraction: borrowing adds to the top, growth enlarges the bottom. In year 1, growth shrank 100% to 95.2% and 3 points of borrowing brought it back only to 98.2%. With growth at {your rate}, your ratio climbed to {ratio}. A toy model with fixed rates."
- Payoff: A debt burden is debt over income; it falls whenever income grows faster, in proportion, than borrowing adds.
- Planned claims: (1) at 3% borrowing and 5% growth, after 10 years debt is 139.6, GDP 162.9 and the ratio 85.7% (derivation; node); (2) year 1 ratio is 100/1.05 + 3 = 98.2% (derivation); (3) at 2% growth the year-10 ratio is 109.5% (derivation; node; the reveal quotes the learner's own growth setting); (4) model: fixed rates, borrowing includes interest, no recessions; not a statement about any real country (lesson rule, on the card). Out of learner text unless a human source check passes: the EU reference values (3% deficit, 60% debt) in Protocol No 12 to the TFEU, which this example echoes.
- Format: Single card (with Step).
- Curriculum: `{"primary":"economics:debt-to-gdp-dynamics","also":["economics:stock-vs-flow","economics:growth-rate-gap"],"prerequisites":["economics:stock-vs-flow"],"level":"core","strand":"macro","references":[],"tags":["macro","public debt","ratios"]}`
- Notes: Differs from nearest: bathtub-deficit-debt shows the deficit filling the debt (numerator only); growth-gap-seventy-years shows compounding gaps; this one shows a ratio whose two parts grow at different speeds. Build after bathtub-deficit-debt (published). Keep the stage free of the long-run 63% line: it would point to the answer.

## Wave J (2026-10-14): fifteen new concepts across the three strands

written 2026-10-14 by cm-economics (Marco) for Wave J (879 → 2,000 lessons). Coverage before this round: 89/89 concepts had a lesson, and every brief in all four economics brief files was built, so `tools/claim.mjs next economics` returned NONE. These fifteen briefs add fifteen new, uncovered concepts (curriculum now 104): five personal finance, five macro, five markets. Ranked demand-3 first, then by how visible the idea is in 60 seconds; #74 is the exploration slot (demand 1). Two ideas were dropped before writing because they already exist: a price ceiling (taught by `supply-demand`, "Make bread cheaper by law?") and a savings-rate-to-retirement model (too close to advice).

Rules every brief below follows (company/product/demo-standard.md):
- **Model and no advice.** Every lesson is a labelled toy model with its rules on the card. Personal finance is arithmetic on stated numbers; no lesson says what to buy, borrow, sign or vote for. Real-world names (laws, agencies, products) stay out of learner text unless a fact-checker here can confirm them; each brief names the one such sentence it is tempted by and keeps it out.
- **Checkable claims.** Every number was recomputed in node on 2026-10-14 (formula in each "Check"). Claims are derivations or seeded simulations a fact-checker can redo here; citations are for names and attributions only, and each has a fallback wording if the source cannot be reached.
- **QA path.** Controls are listed in DOM order. Pressing each once (sliders: two arrow presses) reaches every milestone, because each milestone has a **preset button** that sets the state in one press; sliders come after the presets and are for free exploration. Every control changes the stage when pressed from the state the previous press left (no preset that is already active when QA reaches it, except where noted it is placed so the previous preset changed the state).
- **Reveal fits with its picture.** Each draft reveal is at most 90 words (counted) and quotes only milestone-recorded or current-state values. Stage text 25 words or fewer; one picture; at most two control rows; chart labels at least 10px (12px for readouts), never smaller to make it fit. If the 390×844 screenshot crops the stage top, cut the reveal sentence marked (cut first), not the text size.
- **No answer before the commit.** Options are worded at the same precision; the locked stage draws no target line, limit or value that matches the answer.

### 60. flat-rate-costs-nearly-double · concept: flat-rate-interest · core · demand 3
- Strand: personal finance.
- Learner knows: a loan charges interest and is repaid in monthly instalments (first-payment-mostly-interest) / does not know: that a "flat" rate charges interest on the original amount for the whole term, even after half of it has been repaid, so the true yearly rate on what you actually owe is nearly double.
- Misconception: "A 10% flat rate costs 10% a year, like any 10% loan."
- Prediction (stage text, 24 words): "Borrow $10,000 at '10% flat' for 2 years: $2,000 interest, 24 payments of $500. The true yearly rate on what you owe is about…" options: A 10% / B 14% / C 18% (answer: C, 18.2%).
- Check (node, bisection on 10,000 = 500 × (1 − (1 + r)^−24) / r): monthly r = 1.513%, APR (12 × r) **18.16%**. 1 year flat (12 × $916.67): 17.97%. 3 years (36 × $361.11): 17.92%. A true 10% APR over 2 years: payment $461.45, interest **$1,074.78** (vs $2,000 flat). After 12 flat payments, the balance at the true rate is **$5,449**.
- Key states (milestones): (m1) "Flat 10%" preset shown: owed-balance curve and the flat interest bar for all 24 months, true rate 18.2% recorded; (m2) "True 10%" preset shown: payment $461 and interest $1,075 recorded.
- Interaction: one picture: what you still owe, month by month (a falling staircase), with the interest charged each month as a thin bar under it. Under the flat rate the interest bars stay level ($83 a month) while the staircase falls; under a true rate they shrink with it. Controls (DOM order): [Flat 10%] [True 10%] preset chips, then a term slider (1 to 3 years, starts at 2). Readouts: payment, total interest, true yearly rate. Rule line: "Flat: interest on the full $10,000 every month."
- Reveal (draft): "A flat 10% charged $2,000: 10% of the full $10,000, both years. But you repaid as you went: after a year you owed about $5,400 and still paid interest as if you owed $10,000. On what you actually owed, that is 18.2% a year. A true 10% loan cost $1,075 in interest, about half. (cut first) Stretching the term barely changes the true rate; it stays near 18%. A made-up loan with level payments and no fees."
- Payoff: A flat rate is quoted on money you have already paid back, so its true rate is close to twice the headline.
- Planned claims: (1) a flat 10% rate over 2 years on $10,000 charges $2,000 interest, repaid as 24 payments of $500 (derivation; the rule is stated on the card); (2) the rate r that solves 10,000 = 500 × (1 − (1 + r)^−24)/r is 1.513% a month, 18.16% a year as 12 × r (derivation, node bisection; the learner text says "18.2% a year", the APR convention of monthly rate × 12, labelled); (3) after 12 payments the balance at that rate is about $5,449 (derivation); (4) a 10% APR loan over 24 months has payment $461.45 and interest $1,074.78 (derivation, standard amortization formula); (5) the true rate is 17.9% to 18.2% for 1 to 3 year terms (derivation); (6) model label: made-up loan, level payments, no fees, not a statement about any lender (lesson rule, on the card). Out of learner text unless a human source check passes: that flat-rate ("add-on") quotes are common in car or consumer loans in any named country.
- Format: Single card.
- Curriculum: `{"primary":"economics:flat-rate-interest","also":["economics:amortization"],"prerequisites":["economics:amortization","economics:apr-vs-apy"],"level":"core","strand":"personal-finance","references":[],"tags":["loans","interest","APR"]}`
- Notes: Differs from nearest: first-payment-mostly-interest (amortization) shows interest shrinking with a reducing balance; this one shows a quote that never shrinks. apr-apy-gap is about compounding frequency, not the base the rate is charged on. fee-on-two-week-loan annualises a fee; here the base is the trap.

### 61. inflation-falls-prices-still-rise · concept: disinflation-vs-deflation · intro · demand 3
- Strand: macro.
- Learner knows: inflation is the yearly rise in prices (inflation-halves-cash) / does not know: that inflation is a rate of change, so "inflation is falling" means prices rise more slowly, not that they come down; prices fall only when the rate goes below zero.
- Misconception: "Inflation is coming down, so prices will come back down."
- Prediction (stage text, 22 words): "A $100 basket. Inflation falls every year: 8%, 6%, 4%, 3%, 2%. After those five years, the basket costs…" options: A less than $100 / B about $108 / C more than $120 (answer: C, $125.08).
- Check (node, p ← p × (1 + i)): 100 → 108.00 → 114.48 → 119.06 → 122.63 → **125.08**. A sixth year at 0%: still **125.08** (prices stop rising, do not fall). A sixth year at −1%: **123.83** (only now does the price fall).
- Key states (milestones): (m1) "Five years" preset run: the basket price per year drawn, 125.08 recorded, while a second small line shows the rate falling from 8 to 2; (m2) "Year 6 at 0%" preset: the price line flat at 125.08; optional (m3) "Year 6 at −1%": 123.83.
- Interaction: one picture: the basket's price as bars by year (tall, growing) with the year's inflation rate printed above each bar in 10px+ text; the rate numbers shrink while the bars keep growing. Controls (DOM order): [Five years] [Year 6 at 0%] [Year 6 at −1%] presets, then a Step button that adds one year at a time from year 0 (for learners who want to watch). Rule line: "Each year's rate applies to last year's price."
- Reveal (draft): "Inflation fell every year, from 8% to 2%, and the basket still went from $100 to $125.08. Inflation is how fast prices rise, not how high they are, so a falling rate means slower rises. At 0% the price stopped at $125.08 and stayed; it does not go back. Prices fall only when the rate goes below zero. (cut first) A made-up path of rates, not a forecast."
- Payoff: A falling rate slows the climb; it does not undo it.
- Planned claims: (1) the five-year path 100, 108.00, 114.48, 119.06, 122.63, 125.08 (derivation); (2) at 0% a year the price level is unchanged (definition of a zero rate of change); (3) only a negative rate (here −1%, giving 123.83) lowers the price level (derivation); (4) the rates are made up, not any country's data (lesson rule, on the card). Out of learner text unless a human source check passes: the words "disinflation" and "deflation" as official terms (the lesson can teach them as vocabulary from the definitions on the card, which is a derivation, not a citation).
- Format: Single card (with Step).
- Curriculum: `{"primary":"economics:disinflation-vs-deflation","also":["economics:inflation","economics:percentage-points"],"prerequisites":["economics:inflation"],"level":"intro","strand":"macro","references":[],"tags":["macro","inflation","rates vs levels"]}`
- Notes: Differs from nearest: inflation-halves-cash shows compounding at a constant rate; rate-up-one-point is points vs percent; this one separates a rate from a level. Physics lessons on speed vs position teach the same rate/level idea elsewhere, which is a deliberate second angle.

### 62. giving-up-lowers-unemployment · concept: unemployment-rate-denominator · core · demand 3
- Strand: macro.
- Learner knows: a rate is a part over a whole / does not know: that the unemployment rate counts only people looking for work, so when job-seekers stop looking the rate falls although nobody found a job.
- Misconception: "When the unemployment rate falls, more people have jobs."
- Prediction (stage text, 24 words): "100 people want work: 90 have jobs, 10 are looking. 4 of the 10 stop looking. No new jobs. The unemployment rate…" options: A rises / B stays at 10% / C falls (answer: C, 6.25%).
- Model rule (on the card): "Unemployment rate = people looking ÷ (people working + people looking). People not looking are not counted."
- Check (arithmetic): 10/100 = **10%**. 4 stop looking: 6/96 = **6.25%**, jobs still **90**. Instead, 4 of the 10 find jobs: 6/100 = **6%**, jobs 94. Both cases show about the same rate; only one added jobs.
- Key states (milestones): (m1) "4 stop looking" preset: rate 6.25%, jobs 90 recorded; (m2) "4 find jobs" preset: rate 6%, jobs 94 recorded.
- Interaction: one picture: a 10 × 10 grid of people dots: filled = working, ring = looking, grey outside a drawn boundary = not looking (outside the count). The rate and jobs readouts sit above. Controls (DOM order): [4 stop looking] [4 find jobs] presets, then a slider "how many stop looking" (0 to 10). Every preset starts from the base 90/10 and the grid animates the moved dots.
- Reveal (draft): "When 4 people gave up, the rate fell from 10% to 6.25% and jobs stayed at 90: the 4 left the count, so the top and the bottom both shrank. When 4 found jobs, the rate fell to 6% and jobs rose to 94. Two almost equal rates, two different stories. A falling rate alone cannot tell you which happened; the number of jobs can. (cut first) A toy town of 100."
- Payoff: A rate moves when its denominator moves; check who left the count.
- Planned claims: (1) 10/100 = 10%, 6/96 = 6.25%, 6/100 = 6% (arithmetic); (2) jobs 90 in the give-up case, 94 in the find-jobs case (arithmetic); (3) the counting rule as stated on the card (lesson rule, a definition the lesson sets); (4) model label: a made-up town of 100, not any country's statistics. Out of learner text unless a human source check passes: that official statistics (ILO resolution of the 13th ICLS, 1982; US BLS) define the rate this way and call the group "discouraged workers". The fact-checker cannot reach ilo.org or bls.gov from here, so the lesson says "in this count".
- Format: Single card.
- Curriculum: `{"primary":"economics:unemployment-rate-denominator","also":["probability:base-rates"],"prerequisites":["economics:percentage-points"],"level":"core","strand":"macro","references":[],"tags":["macro","labour market","ratios"]}`
- Notes: Differs from nearest: debt-grows-ratio-falls moves the denominator by growth; here people leave the denominator. Builder: the grid is 100 dots on a phone, so dots at least 10px with 4px gaps; labels outside the grid.

### 63. savings-outlast-the-division · concept: drawdown-longevity · core · demand 3
- Strand: personal finance.
- Learner knows: savings earn interest (compound-interest) and the minimum-payment trap (interest first) / does not know: that a pot that keeps earning while you draw from it lasts longer than pot ÷ withdrawal, and forever if you take no more than its interest.
- Misconception: "$500,000 at $40,000 a year lasts 500 ÷ 40 = 12.5 years."
- Prediction (stage text, 24 words): "$500,000 saved, earning 5% a year. You take out $40,000 at the end of each year. The money runs out after about…" options: A 12 years / B 20 years / C never (answer: B, 20 full years and part of a 21st).
- Check (node, b ← b × 1.05 − W): $40k: **20** full withdrawals, runs out in year 21 (formula n = −ln(1 − 0.05 × 500,000 / 40,000) / ln 1.05 = **20.1**). $25k (= the interest): balance stays **$500,000** forever. $30k: 36.7 years. $50k: 14.2. At 0% growth: 12.5. At 3%: 15.9.
- Key states (milestones): (m1) "$40k a year" preset run: the balance line to zero, years 20.1 recorded; (m2) "$25k a year" preset: a flat line at $500,000 (the interest equals the withdrawal), recorded; optional (m3) "0% growth" preset: 12.5 years (the division answer, so the reveal can name it).
- Interaction: one picture: the balance over time (0 to 40 years), the year it hits zero marked when it happens. Controls (DOM order): [$40k a year] [$25k a year] [0% growth] presets, then a withdrawal slider ($20k to $60k, steps of $5k). Readout: "Lasts: N years" or "Lasts: never". Rule line: "Grows 5% a year, then you withdraw."
- Reveal (draft): "Taking $40,000 a year, the money lasted 20.1 years, not 12.5: in year 1 alone the pot earned $25,000, so it shrank by only $15,000. Each year it earns a little less, so the end speeds up. Taking $25,000, exactly the interest, it never shrank. Division is only right when the money earns nothing. (cut first) A steady 5% is a made-up rate; real returns vary and order matters (see order-of-the-bad-year)."
- Payoff: While you draw on a pot that earns, the interest pays part of every withdrawal.
- Planned claims: (1) at 5% and $40,000 a year, the pot lasts 20.1 years (derivation: n = −ln(1 − rP/W)/ln(1 + r); node step-by-step gives 20 full withdrawals); (2) year-1 interest $25,000 (arithmetic); (3) withdrawing $25,000 a year leaves $500,000 unchanged (derivation: 500,000 × 1.05 − 25,000 = 500,000); (4) at 0% growth it lasts 12.5 years (arithmetic); (5) model: constant 5% made-up return, end-of-year withdrawals, no inflation, taxes or fees; not a plan or advice (lesson rule, on the card). Out of learner text: any "safe withdrawal rate" rule (for example the "4% rule"), which is an empirical claim needing sources the fact-checker cannot reach.
- Format: Single card.
- Curriculum: `{"primary":"economics:drawdown-longevity","also":["economics:compound-interest"],"prerequisites":["economics:compound-interest","economics:minimum-payment-trap"],"level":"core","strand":"personal-finance","references":[],"tags":["saving","retirement","withdrawals"]}`
- Notes: Differs from nearest: minimum-payment-trap is the mirror (interest works against a debt payment); order-of-the-bad-year varies the returns, this one holds them fixed. Reference the mirror in the reveal only if it fits the word budget.

### 64. winning-bid-overpays · concept: common-value-winners-curse · core · demand 3
- Strand: markets.
- Learner knows: in an auction the highest bid wins (rising-price-stops-at-second) / does not know: that when the prize is worth the same to everyone and each bidder only has an estimate, the winner is the one who overestimated most, so bidding your estimate loses money on average, and more bidders make it worse.
- Misconception: "If everyone's guess is right on average, the winning bid is right on average too."
- Prediction (stage text, 25 words): "A jar holds $100 in coins. Ten bidders guess its value; guesses are right on average. Each bids its guess; highest wins. The winner usually…" options: A pays about $100 / B pays under $100 / C pays over $100 (answer: C).
- Model rule (on the card): each guess = $100 + a random error between −$20 and +$20 (seeded); each bidder bids its guess; the winner pays its own bid.
- Check (node, mulberry32 seed 1, 20 auctions; seed not chosen for the result, and seeds 7 and 42 give the same picture): 10 bidders: average guess **$99.2**, average winning bid **$116.5**, winner overpaid in **20 of 20**. 2 bidders: average winning bid $105.4, overpaid 12 of 20. 20 bidders: $118.6. Theory: the expected highest of n uniform errors on ±20 is 20(n − 1)/(n + 1): $116.4 for 10, $106.7 for 2, $118.1 for 20. The builder recomputes with the kit's `mulberry32` and quotes the lesson's own run.
- Key states (milestones): (m1) "Run 20 auctions, 10 bidders" preset: all guesses as faint dots per auction, the winning bid as a solid dot, the $100 line; average guess and average winning price recorded; (m2) "2 bidders" preset run: average winning price recorded (smaller overpayment).
- Interaction: one picture: 20 columns (one per auction), dots for guesses, the winner's dot filled, a horizontal line at the true $100 (drawn locked too: it is the jar's stated value, not the answer). Controls (DOM order): [Run 20 auctions] (10 bidders), [2 bidders] preset that reruns, [20 bidders] preset that reruns, then a Step button (one more auction). Readouts: average guess, average winning price.
- Reveal (draft): "The guesses averaged ${avg guess}, close to $100. The winning bids averaged ${avg win}, and the winner overpaid in {k} of 20 auctions. Winning picks out the bidder whose guess was highest, so the error that wins is the biggest one. With 2 bidders the winner paid ${2-bidder avg}: more rivals, bigger curse. (cut first) A bidder who knows this bids below its guess. A made-up jar with random, seeded guesses."
- Payoff: Winning is evidence you guessed high; with more rivals, the evidence is stronger.
- Planned claims: (1) the seeded run's average guess, average winning bid and overpay count (simulation, seed 1, disclosed; node above); (2) the expected highest of n independent uniform errors on [−20, 20] is 20(n − 1)/(n + 1) (derivation: order statistics of the uniform); (3) more bidders raise the expected overpayment (derivation from (2)); (4) the model rule as stated on the card. Out of learner text unless a human source check passes: the history (Capen, Clapp and Campbell, "Competitive Bidding in High-Risk Situations", Journal of Petroleum Technology, 1971, on oil-lease auctions). The name "winner's curse" may appear: it is the concept's common label, and if the fact-checker cannot confirm it the lesson says "this effect".
- Format: Simulation run.
- Curriculum: `{"primary":"economics:common-value-winners-curse","also":["probability:winners-curse"],"prerequisites":["economics:ascending-auction"],"level":"core","strand":"markets","references":[],"tags":["auctions","information","selection"]}`
- Notes: Differs from nearest: probability's best-of-twenty-identical (concept probability:winners-curse) is about a top scorer's skill not repeating; this one is about the price a winner pays and how it grows with the number of rivals. shade-your-sealed-bid shades for private values (strategy), not for an estimation error. Run overlap.mjs after build.

### 65. double-tax-four-times-loss · concept: deadweight-loss-square · core · demand 2
- Strand: markets.
- Learner knows: a tax raises the buyer's price and lowers sales (tax-who-pays) and what surplus is (buyers-who-would-pay-more) / does not know: that the value lost from trades that no longer happen grows with the square of the tax, so doubling a tax roughly quadruples the loss.
- Misconception: "Double the tax, double the harm."
- Prediction (stage text, 25 words): "A $2 tax stops some trades; buyers and sellers lose $1 of value from them. Double the tax to $4. The value lost becomes…" options: A $2 / B $3 / C $4 (answer: C).
- Model rule (on the card): demand price = $10 − quantity; supply price = quantity; the tax is a wedge between them.
- Check (derivation): untaxed: quantity 5 at $5. Tax t: quantity (10 − t)/2; lost value (the triangle) = ½ × t × (5 − quantity) = **t²/4**. t = 2: quantity 4, lost **$1**, revenue $8. t = 4: quantity 3, lost **$4**, revenue $12. t = 6: lost $9, revenue $12 (revenue stops rising).
- Key states (milestones): (m1) "$2 tax" preset: triangle shaded, lost $1 and revenue $8 recorded; (m2) "$4 tax" preset: triangle twice as tall and twice as wide, lost $4 and revenue $12 recorded; optional (m3) "$6 tax": lost $9, revenue $12.
- Interaction: one picture: the two straight lines with the tax wedge as a vertical gap; the lost-trade triangle shaded and the revenue rectangle hatched. Controls (DOM order): [$2 tax] [$4 tax] [$6 tax] presets, then a tax slider ($0 to $8, steps of $1). Readouts: units sold, revenue, value lost.
- Reveal (draft): "At $2 the lost triangle was worth $1; at $4 it was worth $4. Doubling the tax made the triangle twice as tall and twice as wide, so its area grew four times. Revenue only rose from $8 to $12, because fewer units were taxed. The loss grows with the square of the tax. (cut first) Straight lines are a simplification; real curves change the numbers, not the squaring idea near small taxes."
- Payoff: The harm of a tax is a triangle, and a triangle's area grows with the square of its side.
- Planned claims: (1) quantity under tax t is (10 − t)/2 (derivation); (2) lost value t²/4: $1 at $2, $4 at $4, $9 at $6 (derivation, triangle area); (3) revenue t × quantity: $8, $12, $12 (arithmetic); (4) model label: straight lines, one market, no use of the revenue counted (lesson rule). (5) The "(cut first)" sentence's "near small taxes" is a derivation claim (second-order approximation, Harberger triangle); if the fact-checker cannot redo it from the text, cut it. Out of learner text: Harberger's name and any real tax.
- Format: Single card.
- Curriculum: `{"primary":"economics:deadweight-loss-square","also":["economics:tax-incidence","economics:consumer-surplus","math:area-scaling"],"prerequisites":["economics:tax-incidence","economics:consumer-surplus"],"level":"core","strand":"markets","references":[],"tags":["tax","efficiency","surplus"]}`
- Notes: Differs from nearest: tax-who-pays and who-pays-same-filter are incidence (who bears it); this is the size of the loss. math:area-scaling is the same squaring idea for shapes.

### 66. zero-percent-is-not-free · concept: forgone-cash-discount · core · demand 2
- Strand: personal finance.
- Learner knows: present value and APR (wait-or-take-now, apr-apy-gap) / does not know: that "0% instalments" are not free when paying cash would get a discount: the discount you give up is the interest, and because you repay through the year, it is a high rate.
- Misconception: "0% finance is free money" (and the second trap: "giving up 10% off is like paying 10% interest").
- Prediction (stage text, 25 words): "A $1,200 sofa: pay $1,080 cash today, or 12 monthly payments of $100 at '0%'. The instalments are a loan at about…" options: A 0% a year / B 10% a year / C 20% a year (answer: C, 19.9%).
- Check (node, bisection on 1,080 = 100 × (1 − (1 + r)^−12)/r, first payment in a month): r = 1.659% a month, **19.9%** a year (12 × r), 21.8% compounded. 5% cash discount ($1,140): 9.6%. 2% ($1,176): 3.75%.
- Key states (milestones): (m1) "10% off for cash" preset: the borrowed amount line and the implied rate 19.9% recorded; (m2) "2% off for cash" preset: 3.75% recorded.
- Interaction: one picture: what you effectively owe the shop month by month if you take the instalments (starting at the $1,080 cash price, stepping down $100 a month); its average height is shaded, about half the starting amount. Controls (DOM order): [10% off for cash] [2% off for cash] presets, then a cash-discount slider (0% to 15%, steps of 1%). At 0% the readout says "0% a year: free" (true only then). Readout: implied yearly rate.
- Reveal (draft): "Taking instalments meant giving up $120 to keep $1,080 for a while. You repaid it monthly, so on average you kept only about half of it, for a year. $120 for that is 19.9% a year, not 10%. With only 2% off for cash, the hidden rate fell to 3.75%. 0% is free only when the cash price is the same. (cut first) A made-up shop; fees and late charges ignored."
- Payoff: The cash discount you give up is the interest you pay.
- Planned claims: (1) the rate solving 1,080 = 100 × annuity factor(12) is 1.659% a month, 19.9% a year (derivation, node); (2) 2% discount gives 3.75%, 5% gives 9.6% (derivation); (3) at no cash discount the implied rate is 0% (derivation); (4) model label: made-up shop, payments at month ends, no fees; not advice (lesson rule). Out of learner text: any statement about how real retailers price instalment plans.
- Format: Single card.
- Curriculum: `{"primary":"economics:forgone-cash-discount","also":["economics:present-value","economics:opportunity-cost"],"prerequisites":["economics:present-value","economics:apr-vs-apy"],"level":"core","strand":"personal-finance","references":[],"tags":["borrowing","discounts","APR"]}`
- Notes: Differs from nearest: flat-rate-costs-nearly-double (#60) has the same "you repay as you go, so the average balance is half" mechanism. Build #60 first; if both ship, the reveal of this one may point at the shared idea, and the recall question must not be answerable from #60 alone (ask for the 2% case). fee-on-two-week-loan annualises a fee with one repayment, not many. lifehacks lh-deposit-checkout-net and lh-discount-round-trip are price arithmetic without time.

### 67. raise-over-the-cliff · concept: benefit-cliff · core · demand 2
- Strand: personal finance.
- Learner knows: a tax bracket taxes only the money above the line, so a raise never lowers take-home (raise-into-new-bracket) / does not know: that a benefit that stops all at once at an income line is different: crossing the line can cost more than the raise, and a gradual taper removes the cliff.
- Misconception: "A raise always leaves you with more" (true for brackets, which the learner just learned; false for a cliff).
- Prediction (stage text, 25 words): "A made-up benefit pays $3,000 to anyone earning $30,000 or less, nothing above. You earn $29,000 and get a $2,000 raise. You end up with…" options: A $2,000 more / B the same / C $1,000 less (answer: C, $32,000 → $31,000).
- Check (node): cliff: $29,000 → total **$32,000**; $31,000 → **$31,000**; the total is back to $32,000 only at $32,000 earnings. Taper (benefit falls 50¢ per $1 above $30,000): $31,000 → **$33,500**; benefit gone at $36,000. Across the cliff, the $2,000 raise lost $3,000 of benefit: an effective take of 150%.
- Key states (milestones): (m1) "Cliff: $29k → $31k" preset: the total-income line with the drop, before and after totals recorded; (m2) "Taper: $29k → $31k" preset: the same raise on the taper line, $33,500 recorded.
- Interaction: one picture: total income (earnings + benefit) against earnings, $26k to $38k, a marker at the learner's earnings. Controls (DOM order): [Cliff: $29k → $31k] [Taper: $29k → $31k] presets, then an earnings slider ($26k to $38k, steps of $1k) and a [Cliff | Taper] toggle. No taxes in the toy (rule line: "Made-up benefit. No taxes.").
- Reveal (draft): "With the cliff, the raise took you from $32,000 to $31,000: earning $2,000 more cost $3,000 of benefit. That is not how a tax bracket works, where only the money above the line is taxed. With a taper that removes 50 cents per dollar, the same raise left you with $33,500. The shape of the rule decides it, not the raise. (cut first) A made-up rule, not any real programme."
- Payoff: A cliff can make a raise cost money; a taper cannot.
- Planned claims: (1) cliff totals $32,000 at $29,000 and $31,000 at $31,000 (arithmetic from the stated rule); (2) taper total $33,500 at $31,000, benefit zero at $36,000 (arithmetic); (3) under brackets that tax only income above a line, a raise never lowers take-home if every bracket rate is below 100% (derivation; the reveal states it as a contrast, and it is the claim of the published raise-into-new-bracket lesson); (4) model label: made-up benefit, no taxes, not any real programme, not advice (lesson rule). Out of learner text unless a human source check passes: that real benefit programmes in any named country have cliffs.
- Format: Before / after toggle.
- Curriculum: `{"primary":"economics:benefit-cliff","also":["economics:marginal-tax-rate"],"prerequisites":["economics:marginal-tax-rate"],"level":"core","strand":"personal-finance","references":[],"tags":["income","benefits","marginal rates"]}`
- Notes: Differs from nearest: raise-into-new-bracket teaches the opposite result for brackets; this is the deliberate exception, and the reveal names the contrast. Build after it (published). The before/after toggle is a by-hand format (formats.md, 🟡); a builder may also do it as Single card with two presets.

### 68. commission-splits-the-motive · concept: principal-agent-incentive · core · demand 2
- Strand: markets.
- Learner knows: percentages / does not know: that someone paid a small share of a price gains little from a higher price, while bearing the full cost of the effort to get it, so their best choice can differ from yours; changing how they are paid realigns it.
- Misconception: "An agent on commission wants the highest price as much as I do."
- Prediction (stage text, 25 words): "Your agent earns 1.5% of your house's sale price. Waiting four more weeks would raise the price from $300,000 to $310,000. The agent's extra pay…" options: A $10,000 / B $1,500 / C $150 (answer: C).
- Model rule (on the card): made-up deal. Agent paid 1.5% of the price; waiting means four more weeks of showings for the agent.
- Check (arithmetic): agent at $300,000: $4,500; at $310,000: $4,650; extra **$150**. Seller's extra: 10,000 − 150 = **$9,850**. Alternative pay rule "20% of the price above $300,000": agent extra **$2,000**, seller extra $8,000.
- Key states (milestones): (m1) "Pay 1.5% of price" preset with "wait 4 weeks" shown: two bars, seller's gain $9,850 and agent's gain $150, recorded; (m2) "Pay 20% above $300k" preset: agent's gain $2,000, seller's $8,000 recorded.
- Interaction: one picture: two bars side by side (your extra money, the agent's extra money) next to a calendar strip of four weeks of the agent's work, so the learner compares $150 with a month. Controls (DOM order): [Pay 1.5% of price] [Pay 20% above $300k] presets, then a "price if you wait" slider ($300k to $330k, steps of $5k).
- Reveal (draft): "Waiting would get you $9,850 more and the agent $150, for four more weeks of the agent's work. A quick sale is the agent's better deal even though it is your worse one. Paid 20% of the price above $300,000, the agent's extra became $2,000, and both of you gained from waiting. How someone is paid shapes what they want. (cut first) A made-up deal; real agents also care about reputation."
- Payoff: When you pay someone a sliver of the gain, they get a sliver of the motive.
- Planned claims: (1) 1.5% of $10,000 is $150; seller keeps $9,850 of the increase (arithmetic); (2) 20% of $10,000 is $2,000 (arithmetic); (3) model label: made-up commission and effort; reputation, repeat business and law ignored; no statement about real agents (lesson rule). Out of learner text unless a human source check passes: the study that agents sell their own homes for more and keep them on the market longer (Levitt and Syverson, "Market Distortions When Agents Are Better Informed", Review of Economics and Statistics, 2008). Name the idea ("principal–agent problem") only if the fact-checker confirms the term; otherwise say "the agent's pay".
- Format: Single card.
- Curriculum: `{"primary":"economics:principal-agent-incentive","also":["economics:marginal-cost"],"prerequisites":["economics:marginal-cost"],"level":"core","strand":"markets","references":[],"tags":["incentives","contracts","agency"]}`
- Notes: Differs from nearest: tragedy-of-commons and free-rider-pot are about many players sharing one resource; this is one person acting for another. No overlap found in other categories' lessons by slug; run overlap.mjs after build.

### 69. double-money-same-bread · concept: quantity-theory-money · core · demand 2
- Strand: macro.
- Learner knows: GDP counts goods made (count-the-bread-once) and inflation is rising prices / does not know: that in a simple model where output and spending speed are fixed, doubling the money doubles prices and buys the same goods; only more goods make people richer.
- Misconception: "If everyone's cash doubled, everyone could buy twice as much."
- Prediction (stage text, 25 words): "Toy island: $100 of money, 500 loaves baked a year. Every household's cash doubles; bakers still bake 500. Once prices settle, households can buy…" options: A twice the bread / B the same bread / C half the bread (answer: B).
- Model rule (on the card): money × times it is spent a year (5) = price × loaves. Spending speed and loaves are fixed unless you change them.
- Check (arithmetic, P = M × V / Y): $100 × 5 / 500 = **$1** a loaf; $200 × 5 / 500 = **$2**; loaves bought **500** either way. Output +10% (550) with money +10% ($110): price stays **$1**, loaves 550.
- Key states (milestones): (m1) "Double the money" preset: the price doubles, loaves stay 500, recorded; (m2) "Bake 10% more" preset (money +10% too): price $1, loaves 550 recorded.
- Interaction: one picture: a row of 500 loaves as a block (10 rows of 50, small marks) beside a cash stack; a price tag on one loaf. Doubling the stack doubles the tag; the loaf block does not change. Controls (DOM order): [Double the money] [Bake 10% more] presets, then a money slider ($50 to $300, steps of $50) and a loaves slider (400 to 700, steps of 50).
- Reveal (draft): "When the cash doubled, the price of a loaf went from $1 to $2 and the island still bought 500 loaves. The money was twice as big; the bread was not. When the bakers made 10% more and money grew 10%, the price stayed $1 and people ate 550 loaves. In this model, only more goods make people richer. (cut first) It is a simplification: in real economies spending speed and output can change."
- Payoff: Money is a claim on goods; more claims on the same goods just raise the price.
- Planned claims: (1) P = MV/Y gives $1 and $2 (arithmetic from the rule on the card); (2) loaves bought are fixed at 500 by assumption (model rule); (3) the 10% case price $1, loaves 550 (arithmetic); (4) model label: fixed speed of spending and output, one good, no banks (lesson rule). Out of learner text unless a human source check passes: the name "quantity theory of money" and the attribution of MV = PT to Irving Fisher, The Purchasing Power of Money (1911); the text is public domain and may be on archive.org or gutenberg.org, which the fact-checker tries first.
- Format: Single card.
- Curriculum: `{"primary":"economics:quantity-theory-money","also":["economics:inflation","economics:gdp-value-added"],"prerequisites":["economics:inflation","economics:gdp-value-added"],"level":"core","strand":"macro","references":[],"tags":["macro","money","inflation","model"]}`
- Notes: Differs from nearest: bank-lends-it-again is how money is created; inflation-halves-cash is what inflation does to cash; this is why more money need not mean more goods. Contested in real economies, so the reveal says what the model fixes. Builder: draw the 500 loaves as a texture (no labels inside it), not 500 nodes.

### 70. bundle-sells-to-both · concept: bundling · stretch · demand 2
- Strand: markets.
- Learner knows: a seller picks a price, and buyers buy when value is at least the price (monopolist-holds-back) / does not know: that when buyers value two goods in opposite ways, one price for the pair can sell to both and earn more than any separate prices, and that the gain disappears when tastes line up.
- Misconception: "Selling two things together can't earn more than pricing each one well."
- Prediction (stage text, 25 words): "Ann values a film at $8 and an album at $3; Ben the reverse. The best separate prices earn $16. The best bundle price earns…" options: A less than $16 / B $16 / C more than $16 (answer: C, $22).
- Check (node, best price over each value tried): separate: price each at $8, Ann buys the film and Ben the album: **$16** (pricing at $3 earns $12). Bundle: both value the pair at $11, sell 2 at $11: **$22**. Matched tastes (Ann 8 and 8, Ben 3 and 3): separate $16, bundle **$16** (no gain). Ben's album at $6: separate $14, bundle $18.
- Key states (milestones): (m1) "Bundle at $11" preset (opposite tastes): revenue $22 vs separate $16 recorded; (m2) "Tastes match" preset: bundle $16 = separate $16 recorded.
- Interaction: one picture: a small table-free graphic: two buyer cards, each with two value bars (film, album) and their sum as a third bar; a price line across, bars that clear it light up and coins drop into a revenue tally. Controls (DOM order): [Separate at $8] [Bundle at $11] [Tastes match] presets, then a slider for Ben's album value ($3 to $8). The first preset changes the stage from the locked state (price line appears), so each press changes it.
- Reveal (draft): "Priced separately, the best you found was $16: each buyer bought one thing. As a pair, both valued it at $11, so both bought, and revenue rose to $22. The bundle works because their tastes are opposite: Ann's high film value makes up for her low album value. When their tastes matched, the bundle earned $16, no more than selling separately. (cut first) A made-up market of two buyers."
- Payoff: A bundle averages out tastes, so one price can fit buyers who disagree about the parts.
- Planned claims: (1) separate optimum $16 and bundle optimum $22 for values (8, 3) and (3, 8) (derivation, all prices checked; node); (2) matched tastes (8, 8) and (3, 3) give $16 both ways (derivation); (3) model label: two buyers, each buys at most one of each, no costs (lesson rule). Out of learner text unless a human source check passes: Adams and Yellen, "Commodity Bundling and the Burden of Monopoly", Quarterly Journal of Economics, 1976, and any claim about real streaming or software bundles.
- Format: Single card.
- Curriculum: `{"primary":"economics:bundling","also":["economics:monopoly-pricing","economics:consumer-surplus"],"prerequisites":["economics:monopoly-pricing"],"level":"stretch","strand":"markets","references":[],"tags":["pricing","bundles","firms"]}`
- Notes: Differs from nearest: monopolist-holds-back is one good and one price; prices-sort-the-buyers is market clearing across sellers; here one seller prices a pair. lifehacks lh-two-for-one-boundary and lh-ticket-bundle-unused are buyer-side arithmetic, not why sellers bundle.

### 71. fee-for-a-lower-rate · concept: upfront-fee-break-even · core · demand 2
- Strand: personal finance.
- Learner knows: a lower rate lowers the payment (three-points-more-payment) and break-even (break-even-cups) / does not know: that paying a fee to cut the rate only pays off if you keep the loan long enough, and that early repayment (selling, refinancing) before that point leaves you behind.
- Misconception: "A lower rate always saves money."
- Prediction (stage text, 25 words): "Pay $2,000 up front to cut a $200,000, 30-year loan from 6.5% to 6.25%. You repay it all after 3 years. You are…" options: A ahead / B about even / C behind (answer: C, $496 behind).
- Check (node, level monthly payments, remaining balance by stepping month by month): payments $1,264.14 vs $1,231.43, saving **$32.70** a month. Net = payments saved + lower remaining balance − $2,000: 3 years **−$496**; 4 years **+$7** (break-even in month **48**); 5 years +$510; 10 years **+$3,001**. Counting payments alone would put break-even at month 61; the lower balance brings it to 48.
- Key states (milestones): (m1) "Repay after 3 years" preset: the net line below zero at year 3, −$496 recorded; (m2) "Repay after 10 years" preset: +$3,001 recorded.
- Interaction: one picture: net gain from paying the fee (y) against the year you repay (x, 0 to 15 years): it starts at −$2,000 and climbs through zero; a marker at the chosen year. The zero line is drawn; the crossing year is not labelled before the commit. Controls (DOM order): [Repay after 3 years] [Repay after 10 years] presets, then a year slider (1 to 15). Readout: "Net: ±$N".
- Reveal (draft): "Repaying after 3 years, you were $496 behind: $32.70 a month and a slightly smaller balance had not yet won back the $2,000. The line crossed zero in year 4. Kept for 10 years, the fee left you $3,001 ahead. Whether a lower rate saves money depends on how long you keep the loan. (cut first) A made-up loan; taxes and other fees ignored, and no advice."
- Payoff: A fee for a lower rate is a bet on how long you will keep the loan.
- Planned claims: (1) monthly payments $1,264.14 at 6.5% and $1,231.43 at 6.25% on $200,000 over 360 months (derivation, amortization formula); (2) net after 36 months −$495.55, after 120 months +$3,001.02, first positive at month 48 (derivation, node stepping); (3) counting payments alone, break-even is 2,000 / 32.70 = 61 months (arithmetic; brief only unless the learner moves the slider there); (4) model label: made-up rates, no taxes or other closing costs, money not invested elsewhere (no discounting), not advice (lesson rule). Out of learner text: the US term "discount points" and what lenders charge.
- Format: Single card.
- Curriculum: `{"primary":"economics:upfront-fee-break-even","also":["economics:break-even","economics:amortization"],"prerequisites":["economics:break-even","economics:loan-rate-sensitivity"],"level":"core","strand":"personal-finance","references":[],"tags":["loans","fees","break-even"]}`
- Notes: Differs from nearest: break-even-cups is units to cover a fixed cost; three-points-more-payment is rate sensitivity; this one makes time the variable that decides. lifehacks lh-visit-fee-crossover is a fixed-fee crossover without interest.

### 72. economy-grows-people-share-it · concept: per-capita-growth · intro · demand 2
- Strand: macro.
- Learner knows: growth compounds (growth-gap-seventy-years) / does not know: that income per person grows by the gap between output growth and population growth (roughly), so an economy can nearly triple while the average person gains far less.
- Misconception: "The economy nearly tripled, so the average person is nearly three times better off."
- Prediction (stage text, 23 words): "An economy grows 3% a year for 35 years. Its population grows 2% a year. Income per person ends up about…" options: A ×2.8 / B ×2.0 / C ×1.4 (answer: C, ×1.41).
- Check (node): 1.03^35 = **2.814**; 1.02^35 = **2.000**; ratio **1.407**; per-person growth 1.03/1.02 − 1 = **0.98%** a year. Population 1%: ×1.99. Population 3%: ×1.00. Population 4%: ×0.71.
- Key states (milestones): (m1) "Population +2%" preset: three readouts at year 35 (economy ×2.81, people ×2.00, per person ×1.41) recorded; (m2) "Population +3%" preset: per person ×1.00 recorded.
- Interaction: one picture: a pie (the economy) that grows over 35 years, cut into slices for people; the number of slices grows too, and one highlighted slice shows a single person's share. Controls (DOM order): [Population +2%] [Population +3%] [Population +1%] presets, then a year slider (0 to 35, steps of 5). Rule line: "Output +3% a year. Population: chips."
- Reveal (draft): "Over 35 years the economy grew 2.81 times, but there were 2.00 times as many people, so each slice grew only 1.41 times: about 1% a year, the 3% minus the 2%. When population grew 3% too, the slice did not grow at all. Growth that is shared by more people is smaller per person. (cut first) Made-up rates; an average says nothing about how the pie is split."
- Payoff: Divide by the people: per-person growth is output growth minus population growth, roughly.
- Planned claims: (1) 1.03^35 = 2.814, 1.02^35 = 2.000, ratio 1.407 (arithmetic); (2) per-person growth 0.98% a year, approximately 3% − 2% (derivation; "roughly" labelled); (3) equal growth rates give ×1.00 (derivation); (4) made-up rates, not any country (lesson rule). Out of learner text: real countries' growth or population figures.
- Format: Single card.
- Curriculum: `{"primary":"economics:per-capita-growth","also":["economics:growth-rate-gap"],"prerequisites":["economics:growth-rate-gap"],"level":"intro","strand":"macro","references":[],"tags":["macro","growth","population"]}`
- Notes: Differs from nearest: growth-gap-seventy-years compares two economies' compounding; debt-grows-ratio-falls divides debt by GDP; this one divides GDP by people. The reveal's last cut-first sentence hands off to #73.

### 73. same-raise-smaller-ratio · concept: relative-vs-absolute-inequality · core · demand 2
- Strand: macro.
- Learner knows: ratios and differences / does not know: that "inequality" can be measured as a gap in dollars or as a ratio (or share), and the two can disagree: an equal dollar raise for everyone keeps the dollar gap and shrinks the ratio, while an equal percentage raise keeps the ratio and widens the gap.
- Misconception: "If everyone gets the same raise, inequality is unchanged."
- Prediction (stage text, 25 words): "Five incomes: $10k, $20k, $30k, $40k, $100k. Richest to poorest: 10 to 1. Everyone gets +$20k. The richest-to-poorest ratio…" options: A rises above 10 to 1 / B stays 10 to 1 / C falls below 10 to 1 (answer: C, 4 to 1).
- Check (node): +$20k each: 30, 40, 50, 60, 120: ratio **4 to 1**, dollar gap **$90k** (unchanged), top share 50% → **40%**, Gini 0.400 → **0.267**. ×1.5 each: ratio **10 to 1** (unchanged), gap **$135k**, Gini 0.400 (unchanged). (Gini = mean absolute difference / (2 × mean); brief only.)
- Key states (milestones): (m1) "+$20k each" preset: bars, ratio 4 to 1 and gap $90k recorded; (m2) "+50% each" preset: ratio 10 to 1 and gap $135k recorded.
- Interaction: one picture: five income bars on one axis with two readouts above: "Gap: $N" and "Ratio: N to 1". Controls (DOM order): [+$20k each] [+50% each] presets, then a slider "raise for everyone" ($0 to $50k, steps of $10k). Reset returns to the base incomes.
- Reveal (draft): "After +$20k each, the gap between richest and poorest stayed $90k, but the ratio fell from 10 to 1 to 4 to 1. After +50% each, the ratio stayed 10 to 1 and the gap grew to $135k. Both are fair ways to measure inequality, and the same raise can look equal on one and unequal on the other. Ask which one a claim uses. (cut first) Five made-up incomes."
- Payoff: Equal dollars shrink ratios; equal percentages widen gaps; "inequality" needs a measure.
- Planned claims: (1) the ratios 10, 4, 10 and gaps $90k, $90k, $135k (arithmetic); (2) adding the same amount to every income lowers the ratio of richest to poorest whenever they differ (derivation: (a + c)/(b + c) < a/b for a > b > 0, c > 0); (3) multiplying every income by the same factor leaves any ratio unchanged (derivation); (4) Gini 0.400 → 0.267 for +$20k and unchanged for ×1.5 (derivation; only if the builder shows a Gini readout, which is optional and costs words); (5) made-up incomes (lesson rule). Out of learner text: real income distributions and the name of any index the fact-checker cannot confirm (the Gini is a textbook definition and can be stated as a formula).
- Format: Single card.
- Curriculum: `{"primary":"economics:relative-vs-absolute-inequality","also":["economics:percentage-points"],"prerequisites":["economics:percentage-points"],"level":"core","strand":"macro","references":[],"tags":["macro","inequality","measurement"]}`
- Notes: Differs from nearest: math one-boss-moves-the-mean (one outlier moves an average) is about the mean; this one is about two inequality measures disagreeing. Contested territory: the lesson takes no side on which measure is right, and the reveal says so.

### 74. last-years-price-overshoots · concept: cobweb-dynamics · stretch · demand 1 [exploration]
- Strand: markets.
- Learner knows: supply and demand cross at an equilibrium (supply-demand, flour-shock) / does not know: that when producers decide how much to grow from last year's price, a shock can make prices overshoot and swing around the equilibrium, settling only if supply responds less strongly than demand.
- Misconception: "After a price spike, prices drift back down smoothly to normal."
- Prediction (stage text, 25 words): "Farmers plant this year based on last year's price. A bad harvest sent the price to $14 (normal: $10). Next year's price is…" options: A still above $10 / B about $10 / C below $10 (answer: C, $6.80).
- Model rule (on the card): buyers: price = $18 − harvest; farmers: harvest = 8 + 0.8 × (last year's price − 10). (A strength chip sets 0.8 or 1.0.)
- Check (node): strength 0.8: prices 14 → **6.80** → 12.56 → 7.95 → 11.64 → 8.69 → 11.05 → 9.16 → 10.67 (swings shrink by 0.8 each year). Strength 1.0: 14 → 6 → 14 → 6 … (**swings forever**). (At 1.2 the swings grow and the price goes negative by year 7, so the lesson offers no 1.2 chip.)
- Key states (milestones): (m1) "Next year" preset (strength 0.8, from $14): price $6.80 recorded; (m2) "Run 8 years" preset: the zigzag shrinking toward $10, recorded; (m3) "Strength 1.0, 8 years" preset: the zigzag never shrinking, recorded.
- Interaction: one picture: the classic cobweb on the supply and demand lines, one step per year (vertical to demand, horizontal to supply), with the price-by-year sparkline as a strip below it in the same frame. Controls (DOM order): [Next year] [Run 8 years] [Strength 1.0, 8 years] presets, then a Step button. Each preset redraws from the $14 shock.
- Reveal (draft): "The $14 price made farmers plant a big crop, and next year the price crashed to $6.80, below normal. Then they planted little, and it jumped to $12.56. Because farmers reacted to last year, prices zigzagged, and the swings shrank to settle near $10. When farmers reacted as strongly as buyers, the zigzag never shrank. (cut first) A toy model with straight lines and farmers who never learn."
- Payoff: Deciding from yesterday's price turns one shock into a zigzag.
- Planned claims: (1) the 0.8 path 14, 6.80, 12.56, 7.95, 11.64, 8.69, 11.05, 9.16, 10.67 (derivation; deviation from $10 is multiplied by −0.8 each year); (2) at strength 1.0 the price alternates 14 and 6 (derivation); (3) swings shrink when supply's response is weaker than demand's (derivation: deviation × (−k), with demand slope 1); (4) model label: straight lines, one crop a year, farmers use only last year's price (lesson rule). Out of learner text unless a human source check passes: the name "cobweb theorem" and Kaldor's 1934 naming, or any real crop (the hog cycle).
- Format: Single card (with Step).
- Curriculum: `{"primary":"economics:cobweb-dynamics","also":["economics:supply-demand","economics:supply-shift"],"prerequisites":["economics:supply-demand","economics:supply-shift"],"level":"stretch","strand":"markets","references":[],"tags":["markets","dynamics","expectations"]}`
- Notes: Differs from nearest: flour-shock shifts supply once and jumps to a new equilibrium; this one shows the path between, driven by a lag. The cobweb plus sparkline is two views in one frame; if the phone fit fails, drop the cobweb and keep the sparkline with the price readout (the learner's thing to watch is the price).
