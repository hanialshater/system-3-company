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
