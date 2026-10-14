# Markets & Microeconomics briefs (cm-economics-markets)

Ranked briefs for this strand, in the same format as `economics.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next economics` hands these out after the domain's own list. Check every brief's answer in node before adding it.

Format note: both Schelling briefs use the proposed format "Agent-based simulation (NetLogo-style)" (`company/design/formats.md`, status proposed). Not buildable until the design lead approves it. Added 2026-10-13 at the founder's request. Overlap: the nearest lessons are the "Simulation run" lessons (drunk-walk-distance, herd-immunity), which have independent trials; here agents react to each other. Other strands' economics concepts are untouched.

### 1. mild-preferences-sharp-divides · concept: schelling-segregation · core · demand 3
- Learner knows: that neighbourhoods can be strongly segregated and that people choose where to live / does not know: that individual choices with a mild preference can add up to a far more extreme collective pattern.
- Misconception: "Strong segregation needs strong prejudice."
- Prediction: "A city grid has two groups in equal numbers, mixed at random, with some empty homes. Each household moves if fewer than 30% of its neighbours are like it (it is happy with a mixed street, even with a 70% majority of the other group). Once nobody wants to move, what share of a typical household's neighbours are like it?" options: A about 30% / B about 50% (no change from the start) / C about 75% (answer: C). Check (node, mulberry32, 40x40 grid, 10% empty, 8 neighbours, no wrap, movers jump to a random empty cell, seeds 1 to 5): like-neighbour share starts at 0.49 to 0.51 and settles at 0.73 to 0.76 within 10 to 15 ticks, everyone happy. At 10% threshold it stays 0.51; at 50% it reaches 0.86 to 0.89; at 70% it nearly never settles (0.98 to 0.99 after 60 ticks, not all happy). The builder must re-run with the lesson's exact rule before locking the number.
- Interaction: one slider for the threshold (0% to 80%), buttons Run / Step / Reset, seeded (mulberry32, seed disclosed). Stage: live grid, "share happy", and a segregation index (average like-neighbour share) plotted over ticks with the 50% "mixed" line ghosted. The learner's own run is quoted in the reveal ("your 30% run ended at 75%").
- Payoff: Nobody in the model demands a majority of their own group, yet the grid sorts into blocks. Mild preferences can produce sharp divides (Schelling 1971). Labelled a model: it shows what can happen, not what causes any real city.
- Planned claims (all by simulation, seeded, rerunnable): (1) at a 30% threshold the like-neighbour share rises from about 50% to about 75% (support: simulation, seeds 1 to 5 in the meta; a fact-checker reruns the stated rule); (2) at 10% almost nothing changes (simulation); (3) a household at 30% accepts a street that is up to 70% the other group (arithmetic from the rule); (4) the model is Schelling's: T. C. Schelling, "Dynamic models of segregation", Journal of Mathematical Sociology 1(2), 143-186 (1971), doi 10.1080/0022250X.1971.9989794 (source: the paper; the DOI is from memory and must be confirmed by the fact-checker). Rule parameters (grid size, empties, neighbourhood, movement rule) are disclosed on the card; results depend on them.
- Format: Agent-based simulation (new, proposed). Illustrations: none.
- curriculum.references: easley-kleinberg-2010 ch. 4 §4.5 (§ unconfirmed: book page blocked by the proxy, 403)
- Notes: no real city is named here. The NYC application is the Geography brief "schelling-on-new-york" and must build after this one (rule of two for a shared engine).

## Networks, Crowds, and Markets, batch 1 (session 2, 2026-10-14)

Source: asks in `company/rituals/records/2026-10-14-vertical-review-ncm.md` §3 (cm-economics-markets) and `company/product/verticals/networks-crowds-markets.md`. Book: Easley & Kleinberg 2010, `easley-kleinberg-2010`. **§ numbers are unconfirmed** for all four (fetch of https://www.cs.cornell.edu/home/kleinber/networks-book/ failed: proxy 403). They follow the 2010 table of contents as I remember it; the fact-checker or builder confirms against the free PDF before the lesson ships. A wrong § reaches metadata only. Dedupe: grep of `src/demos/economics/*/meta.json` and `company/domains/briefs/*.md` for auction, mixed strategy, penalty, network effect, tipping, critical mass, market-clearing found no lesson or brief that teaches these. Every number below was re-run by me in node (scripts are throwaway; the builder re-runs with the lesson's exact rule). Rule of two does not apply (none shares an engine).

### 2. penalty-kick-mix · concept: mixed-strategy-equilibrium (new; prerequisite prisoners-dilemma) · core · demand 2
- Overlap: nearest is `two-suspects-payoff` (dominant strategies, pure choice). Here there is no dominant strategy and the best play is to randomise, so it teaches a different result. No other strand teaches it.
- Learner knows: that a goalkeeper must guess a side, and "play your strength" / does not know: that in a mixed equilibrium your mix is set by what makes the OTHER side indifferent, so improving your own weapon changes how often you use it in a counter-intuitive way.
- Misconception: "If I get better at shooting left, I should shoot left more."
- Prediction (the answer is not visible: the stage opens at the 0.90 setting, 50/50 is shown only as the starting state): "A kicker scores 0.5 of the time if the keeper dives the right way and 0.9 if he dives the wrong way, on either side. Both play their best mix: 50% left, 50% dive left. Now the kicker gets better shooting LEFT when the keeper dives right: 0.9 becomes 1.0. How often should the kicker now shoot left?" options: A more than 50% / B still 50% / C less than 50% (answer: C, 44.4%).
- Check (node, closed form, both players indifferent): kicker left-probability p = (b - h) / ((x - h) + (b - h)) with h = 0.5 (keeper right), b = 0.9 (right side, keeper wrong), x = left score when keeper wrong. x = 0.90: p 0.500, keeper dives left q 0.500, scoring 0.700. x = 0.92: 0.488 / 0.512 / 0.705. x = 0.94: 0.476 / 0.524 / 0.710. x = 0.96: 0.465 / 0.535 / 0.714. x = 0.98: 0.455 / 0.545 / 0.718. x = 1.00: 0.444 / 0.556 / 0.722. Kicker's value computed from both sides' indifference agrees to 1e-16 (0.7222). Direction check: kicker left-share falls monotonically as x rises; keeper dives left more; scoring rises 0.700 to 0.722.
- Interaction: a slider for "score when shooting left and the keeper dives right" (0.90 to 1.00 in steps of 0.02, six reachable states), live 2x2 table, two bars (kicker's left share, keeper's left-dive share), and "scoring chance". Reveal quotes the learner's own final slider state (for example 1.00: kicker left 44.4%, keeper dive left 55.6%, scoring 0.722) and the 0.90 start (50/50, 0.700). Stage rule line states the toy numbers and that the equilibrium is "nobody gains by changing mix alone".
- Payoff: Each side mixes so the other cannot exploit it. A better left shot makes the keeper dive left more, so the kicker shoots left less, yet scores more overall (0.700 to 0.722). Model with made-up numbers: it shows the logic, not real penalty rates.
- Planned claims: (1) in the toy game the equilibrium mix is 50% left at 0.90 and 44.4% left at 1.00 (support: computation, both indifference conditions; fact-checker reruns); (2) the keeper's dive-left share rises 50.0% to 55.6% (computation); (3) the scoring chance rises 0.700 to 0.722 (computation); (4) in a mixed equilibrium each player's mix makes the other indifferent between their choices (support: textbook definition; source Easley & Kleinberg 2010, ch. 6 §6.7); (5) **empirical, needs a human source check:** real penalty-kick data are close to the predicted mixes (Palacios-Huerta 2003, Review of Economic Studies 70(2); cited by the book; recalled from memory, do not publish without a human source check; the lesson may omit it).
- curriculum.references: easley-kleinberg-2010 ch. 6 §6.7–6.8 (§ unconfirmed)
- Format: Single card with slider-drives-live-chart (default; no spec needed). Illustrations: none.
- Notes: payoffs symmetric by design; keep the left/right asymmetry only in the one slider so the stage stays under 25 words.

### 3. bid-what-its-worth · concept: second-price-auction (new; prerequisite prisoners-dilemma, for "dominant strategy") · core · demand 2
- Overlap: nearest is `two-suspects-payoff` (dominant strategy in a 2x2 game) and `buyers-who-would-pay-more` (willingness to pay). Neither has bids against an unknown rival. No brief covers auctions. Differs: the dominant strategy here is a whole range of rival bids, found by the learner trying bids against chips.
- Learner knows: what an auction is and that you want to pay less than the item is worth to you / does not know: that when the winner pays the SECOND-highest bid, shading your bid never helps and inflating it only adds losing wins.
- Misconception: "Bid below your value to keep some profit" (true in first-price auctions) or "bid above to be safe."
- Prediction: "You value a painting at $70. Sealed bids; the highest bidder wins and pays the SECOND-highest bid. You do not know the other bids. Which bid is never worse than any other, whatever the others bid?" options: A $50 / B $70 / C $90 (answer: B).
- Check (node): profit = 70 - rival if bid > rival, else 0. Against rival chips $40 / $60 / $75 / $90: bid $50 gives 30 / 0 / 0 / 0; bid $70 gives 30 / 10 / 0 / 0; bid $90 gives 30 / 10 / -5 / 0. So $50 is worse than $70 against $60 (loses a $10 profit), $90 is worse than $70 against $75 (wins and loses $5). Across every integer rival bid 0 to 200, bid $70 is never below any alternative bid (better = 0 for all tested alternatives 0, 10, 50, 60, 69, 71, 80, 90, 100, 150). Caveat found: on a whole-dollar grid, bid $71 is also never worse (a tie loses). On rival bids in $0.50 steps $70.50 ties as well; it is worse only for a rival at $70.25. The lesson therefore claims "never worse than any other bid, and strictly better against some rival bids", with dollars-and-cents rival bids in the argument; the chips only illustrate. Tie rule: the rival wins ties (disclosed). With ties lost, dominance is weak, not strict; the reveal says "never worse" and does not say "the only best".
- Interaction: bid slider ($0 to $120, $5 steps) and four rival chips ($40, $60, $75, $90). Stage shows "you win / lose, you pay, your profit" for the chosen bid and chip, plus a small row of the profit of bids $50 / $70 / $90 for the same chip. Milestones: tried a bid below $70 and saw a lost $10; tried a bid above $70 and saw a $5 loss.
- Payoff: In a second-price auction your bid only decides whether you win, never what you pay, so bidding your true value never does worse than any other bid. That is why the format invites honesty.
- Planned claims: (1) the winner pays the second-highest bid (rule of the format; source Easley & Kleinberg 2010, ch. 9 §9.4); (2) bidding the true value is a dominant strategy (argument in the book; arithmetic on the card); (3) at value $70 and rival $75, bid $90 wins and loses $5 (arithmetic); (4) at rival $60, bid $50 loses a $10 profit (arithmetic); (5) ties go to the rival in this lesson's rule (stated rule). No empirical claims.
- curriculum.references: easley-kleinberg-2010 ch. 9 §9.4 (§ unconfirmed)
- Format: Single card (default; no spec needed). Illustrations: optional 1:1 hero (a painting on an easel) in predict only.
- Notes: first-price auctions (§9.5) and the winner's curse (§9.6) are later briefs; do not mention them in this card.

### 4. prices-sort-the-buyers · concept: market-clearing-prices (new; prerequisite supply-demand) · stretch · demand 2
- Overlap: nearest is `supply-demand` and `buyers-who-would-pay-more` (one market, one price, many identical units). Here there are three different houses and three buyers who value each differently; the result is about assignment and total value, not a single price. `proposers-get-the-best` (cs.algorithms, stable matching) is a different mechanism (no prices). No existing lesson teaches it.
- Learner knows: that a price is raised when too many people want an item / does not know: that raising prices only on over-wanted houses, one dollar at a time, stops at prices where every buyer can take a house they like best, and the resulting assignment has the highest total value of all assignments.
- Misconception: "Someone must plan who gets which house to get the best match; prices just ration."
- Prediction: "Three buyers (x, y, z) and three houses (a, b, c). Each buyer values each house differently (x: a 12, b 4, c 2; y: a 8, b 7, c 6; z: a 7, b 5, c 2). All prices start at $0. A buyer wants the houses with the largest value minus price (ties all count). Each round, find the smallest set of houses that more buyers want only from than the set has houses, and raise the price of every house in it by $1. Where does house a's price stop?" options: A $0 (a goes to the highest valuer at once) / B $3 / C $12 (answer: B).
- Check (node, rule: buyers want the houses with the largest value minus price, ties all count; raise by $1 the smallest set of houses wanted by more buyers than its size): round 0 prices (0,0,0): all want a; raise a. Round 1 (1,0,0): x wants a, y a or b, z a; raise a. Round 2 (2,0,0): x a, y b, z a or b; houses {a, b} are wanted by x, y, z: raise a and b. Round 3 (3,1,0): x wants a; y wants b or c; z wants a or b; a perfect matching exists: x-a, z-b, y-c. Final prices (3,1,0), after 3 raises (the builder confirms against the book's worked example in the PDF; I did not have it). Total value of that assignment: 12 + 5 + 6 = 23. All six assignments: (x-a,y-b,z-c) 21; (x-a,y-c,z-b) 23; (x-b,y-a,z-c) 14; (x-b,y-c,z-a) 17; (x-c,y-a,z-b) 15; (x-c,y-b,z-a) 16. Maximum 23, only one assignment attains it. Clearing prices are not unique: 20 whole-dollar price vectors with lowest price 0 and up to $12 clear the market; (3,1,0) is the lowest one. The reveal must say "the lowest market-clearing prices".
  - Surprise check: house c is cheap ($0) and z, who values a at 7, ends on b; nobody planned that.
- Interaction: a table of values, three price chips for a, b, c, a "Raise prices" button (one round per tap, highlights which houses are over-wanted, then raises them) and a small bipartite sketch of "who wants what" per round. After three taps the stage shows the matching and the total value 23 next to the other five totals revealed by a "see all assignments" toggle (six numbers). Needs an **interaction-designer spec** (round-by-round state, 390 px).
- Payoff: Prices that rise only where demand exceeds supply stop at a set where each buyer's favourite house is distinct, and the assignment has the highest total value, 23, of all six possible assignments. Nobody had to know every value. Model with made-up values.
- Planned claims: (1) the values table (stated inputs); (2) the rule, stated on the card: buyers want the largest value minus price, ties count; each round raise by $1 every house in the smallest set wanted by more buyers than it has houses (stated rule; the smallest set is unique in every round here); (2b) the run under that rule: prices (0,0,0), (1,0,0), (2,0,0), (3,1,0) (computation; fact-checker reruns; other readings of "a set" change the answer: largest set gives (1,1,0), (2,2,0), (3,2,1), (4,2,1), a stops at $4; every set never stops, so the card must not say "any"); (3) final assignment x-a, z-b, y-c with total 23 (computation); (4) 23 is the maximum over all 6 assignments (enumeration); (5) market-clearing prices exist for any set of valuations and this procedure finds them (theorem; source Easley & Kleinberg 2010, ch. 10 §10.3–10.4, § unconfirmed); (6) the total-value maximisation property (same chapter). No empirical claims.
- curriculum.references: easley-kleinberg-2010 ch. 10 §10.3–10.4 (§ unconfirmed)
- Format: Single card with a step-run button (spec: needs interaction-designer spec). Illustrations: none.
- Notes: keep to the unit-step, three-by-three case; no mention of "constricted sets" or Hall's theorem on the card (learner sees "too many want these houses").

### 5. below-critical-mass · concept: network-effects-tipping (new; prerequisite supply-demand) · core · demand 2
- Overlap: nearest is `supply-demand` and `buyers-who-would-pay-more` (value independent of how many others buy, the no-network-effects baseline). Here a product is worth more as more people use it, which creates three equilibria. No other lesson or brief teaches it. Related only: `schelling-segregation` brief (tipping in a different setting).
- Learner knows: that a product is worth buying if its value exceeds its price / does not know: that when a product's value grows with the number of users, the same product and price can either collapse to zero or reach most of the market depending on where it starts.
- Misconception: "A good product at a fair price will eventually find its users, whatever its starting share."
- Prediction: "A product costs $0.16. People differ in what it is worth: its value to person x (x = 0 to 1 of the market) is (1 - x) times the share of the market already using it. Two launches begin with 18% and 25% of the market using it. Each round, everyone for whom the value now exceeds the price joins or stays. Where do the two launches end?" options: A both reach about 80% / B both die out / C the 18% launch dies, the 25% launch reaches about 80% (answer: C).
- Check (node): next share = 1 - 0.16 / (share) when share > 0.16, else 0. Equilibria solve z = 1 - 0.16/z: z = 0.2 and 0.8, plus z = 0. 18%: 0.111 then 0.000 and stays 0 (two rounds). 25%: 0.360, 0.556, 0.712, 0.775, 0.794, 0.798, 0.800 (about 7 rounds to 0.800). Boundary runs: 0.19 gives 0.158 then 0 (collapses); 0.20 stays 0.200; 0.21 goes 0.238, 0.328, 0.512, 0.688, 0.767 and reaches 0.800 (10 rounds to within 1e-4); 0.30, 0.50, 0.90, 1.00 all end at 0.800. Starts of 0.10 and 0.15 collapse in one round (value below price at once).
- Interaction: slider for the starting share (0% to 100%, 1% steps), a Run / Step button, and a chart of the "next share" curve against the diagonal with the path of the run drawn on it, plus a line of shares by round. Reachable states: 18% (dies), 25% (grows to 80%), and the tipping point near 20%. Milestone: the learner places a start on each side of 20%. The reveal quotes the learner's own two runs.
- Payoff: The curve crosses the diagonal three times: 0%, 20% and 80%. The middle crossing is the tipping point: start just below and the product dies; just above and it climbs to 80%. Below critical mass, a good product fails. The model is a toy; the rounds are a story about how people react to others, not a forecast of a real product.
- Planned claims: (1) in this toy market the rule is next share = 1 - 0.16 / share (derived from the stated value and price; arithmetic); (2) the equilibria are 0%, 20%, 80% (solve the quadratic z^2 - z + 0.16 = 0, roots 0.2 and 0.8); (3) 18% falls to 0 within two rounds; 25% rises to 80% (computation); (4) with network effects a product has a tipping point and a "critical mass" (source Easley & Kleinberg 2010, ch. 17 §17.2–17.3; the dynamic view is in §17.4, unconfirmed); (5) the middle equilibrium is unstable and the other two are stable (computation: slope of the curve at 0.2 is 4, at 0.8 is 0.25; fact-checker reruns). No empirical claims; the card names no real product.
- curriculum.references: easley-kleinberg-2010 ch. 17 §17.2–17.4 (§ unconfirmed; the ask said §17.2–17.3)
- Format: Single card with slider-drives-live-chart and a start-share slider (default; no spec needed). Illustrations: none.
- Notes: changed from the ask: the prediction uses starts of 18% and 25% instead of 19% and 21% so both outcomes are far from the edge; 15% collapses in a single round (value below price at once), which is less instructive. The mapping x to value and "joins if value exceeds price" is a model; use plain words ("the product is worth less to later people").

## Not briefed here (reference proposals)
- Winner's curse (ch. 9 §9.6), sponsored search (ch. 15), bargaining (ch. 12), intermediaries (ch. 11), betting and signalling (ch. 22): batch 2, not briefed.
- Braess's paradox game framing (cs-systems' `new-road-slower-trip`): checked below.
  - Framing check: the lesson is a congestion game, not a mixed-strategy game. Equilibrium (Nash) in the book means no driver gains by switching routes. In the 4,000-driver network each route is one x/100-minute road and one 45-minute road. Splits 2,000/2,000 give 20 + 45 = 65 minutes each. With the free link, a route through both x/100 roads costs x/100 + 0 + y/100 minutes: with everyone on it, 40 + 0 + 40 = 80 minutes, while switching back to the old routes would cost 40 + 45 = 85 minutes, so nobody switches. The numbers in the ask hold (recomputed by hand). The lesson should say "equilibrium" as "nobody can do better by changing route alone", and should not say that the new equilibrium is worse for any single driver by choice. The prisoners-dilemma link is real (individually rational, jointly worse) and `two-suspects-payoff` is the right prerequisite. No change to the brief needed from economics.

## Course: NCM (2026-10-14)

Proposed by `cm-course-ncm` (Jonah) from `company/courses/ncm/briefs.md` (section "economics.markets"); accepted by `cm-economics-markets` (Rhea) on 2026-10-14 after re-running every answer in node (decision: `company/decisions/2026-10-14-courses-org.md`). Source rule: the book is a map, never a source of learner text, figures or exercises; every book section number below is unconfirmed (the host is blocked), so `curriculum.references` cite the chapter only. Book chapters: E&K = Easley and Kleinberg (2010), `easley-kleinberg-2010`. Audience for all: students in a networks course and curious adults. Every empirical claim marked "needs a human source check" stays out of learner text until checked. Rhea's edits are marked "Edited:". Numbering continues the strand's list so `tools/claim.mjs` hands these out; lessons that build on others say "Build after".

### 2. pay-for-the-harm-you-do · concept: economics:vcg-mechanism · core · demand 2
- Sections: E&K ch. 15.3, 15.4 (unconfirmed).
- Learner knows: second-price auctions / does not know: that charging each winner the value their presence costs everyone else makes honest bids best, even with several slots.
- Misconception: In a multi-slot ad auction each winner should pay their own bid.
- Prediction (stage text, 25 words or fewer): "Slots get 10 and 5 clicks; values per click X $7, Y $6, Z $1. X wins top slot, paying the harm caused. How much?" options: A $70 / B $35 / C $60 (answer: B, $35).
- Check (re-run, passes): without X, Y and Z get 60 + 5 = 65; with X they get 30; X pays 35; Y pays 5, Z pays 0. X's profit by bid 0 to 10: `[0,30,30,30,30,30,35,35,35,35,35]`, so bids from 6 up all give the maximum 35, and the honest bid of 7 is among them (weakly best, never beaten).
- Interaction: bid slider for X; harm bars (others' value without X vs with X) and X's profit chart. Format below.
- Payoff: Without X, Y and Z would get 65; with X they get 30; X pays the $35 difference, and no other bid would leave X better off.
- Planned claims: (1) without X, Y and Z's best value is 65; with X they get 30, so X's VCG payment is 35 (derivation; node); (2) Y pays 5 and Z pays 0 (derivation; node); (3) given the others' bids, no bid beats X's honest bid (X's profit is 35 at the honest bid and never higher; derivation; node over bids 0 to 10); (4) under VCG, truthful bidding is a dominant strategy (citation, theorem: Vickrey 1961, Clarke 1971, Groves 1973; E&K ch. 15; fact-checker confirms attribution).
- Format: Single card (bid slider; harm bars).
- Curriculum: `{"primary":"economics:vcg-mechanism","also":["economics:externality"],"prerequisites":["economics:externality"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15}],"tags":["auctions","mechanism design","advertising"]}`
- Notes: Differs from nearest: bid-what-its-worth (vertical batch 1) is one item; VCG extends the idea to several slots. Build after bid-what-its-worth. Edited: claim 3 now says "no bid beats" (bids 6 to 10 tie at 35, so "the honest bid is the unique best" would be wrong).

### 3. middle-of-three-takes-all · concept: economics:network-exchange-power · core · demand 3
- Sections: E&K ch. 12 (12.2, 12.3 are experiments; the stability rule is probably 12.7; all unconfirmed).
- Learner knows: splitting $1 by agreement / does not know: that the person with a spare partner can push the split almost all the way to themselves.
- Misconception: Two people bargaining over $1 split it about evenly, whoever else is around.
- Prediction (stage text, 25 words or fewer): "Ann–Bo–Cy in a line. Bo can split $1 with Ann or with Cy, not both. In repeated rounds, what share does Bo end up with?" options: A About half / B About two thirds / C All, or nearly all (answer: C).
- Check (re-run): an unmatched end would accept any small share, so Bo's outside option is the whole $1; in any stable outcome (no two people who could both gain by dealing with each other) Bo gets 1, matched end gets 0. Path of 3: `{"centre":1,"endMatched":0}`.
- Interaction: path chips (2 or 3 people); the split bar moves as the left-out person lowers their ask.
- Payoff: Whoever Bo leaves out will offer to take less, so the ends bid each other down until Bo has the whole $1 (in the limit).
- Planned claims: (1) in a 3-person path where the centre can deal with only one end, any stable outcome gives the centre the whole $1 (derivation; E&K ch. 12; node); (2) in laboratory exchange experiments on such paths, the centre's share rose toward nearly all over rounds (citation: Cook, Emerson, Gillmore and Yamagishi 1983, Am. J. Sociology 89; Willer 1999). **Needs a human source check (empirical); keep out of learner text until checked.**
- Format: Single card (path-length chips: 2 / 3 people).
- Curriculum: `{"primary":"economics:network-exchange-power","also":[],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12}],"tags":["bargaining","power","networks"]}`
- Notes: No lesson teaches bargaining power from position. four-in-a-row-two-thirds is the follow-up. Edited: option C and reveal now say "all, or nearly all" / "in the limit", to match claim 1 (the stable outcome is exactly 1, the dynamic story is "nearly").

### 4. useless-degree-still-pays · concept: economics:signaling-education · stretch · demand 3
- Sections: E&K ch. 22.8 (unconfirmed).
- Learner knows: employers can't see ability directly (lemon-market-unravels) / does not know: that a credential can pay even if it teaches nothing, because it costs able people less to earn.
- Misconception: A degree is only worth getting if it makes you more productive.
- Prediction (stage text, 25 words or fewer): "Able workers produce $100k, others $50k; firms pay $100k to degree-holders. The degree teaches nothing; it costs the able $20k, others $60k. Who gets it?" options: A Everyone / B Only the able / C No one (answer: B).
- Check (re-run, passes): able: 100 − 20 = 80 with the degree vs 50 without; others: 100 − 60 = 40 with vs 50 without. Only the able gain, so the degree separates the groups and firms paying $100k to holders is correct.
- Interaction: cost sliders per type; net pay with and without the degree shown per type.
- Payoff: Only the able find the degree worth its cost, so having one reveals ability and firms are right to pay for it, though nobody learned a thing.
- Planned claims: (1) able workers net $80k with the degree and $50k without; others net $40k with it and $50k without (derivation; node); (2) so only the able get the degree, and it separates the two groups (derivation); (3) the model is Spence's job-market signalling (citation: Spence 1973, Q. J. Economics 87(3); E&K ch. 22; fact-checker confirms); (4) the lesson does not claim real degrees teach nothing (lesson rule).
- Format: Single card (cost sliders per type).
- Curriculum: `{"primary":"economics:signaling-education","also":["economics:adverse-selection"],"prerequisites":["economics:adverse-selection"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22}],"tags":["information","signalling","labour"]}`
- Notes: Differs from nearest: lemon-market-unravels shows hidden quality wrecking a market; this one shows a costly signal fixing it. Build after lemon-market-unravels (built). Edited: stage text now states the productivities ($100k, $50k); without them nothing says why firms pay $100k. Level core to stretch, because its prerequisite adverse-selection is stretch.

### 5. who-pays-same-filter · concept: economics:coase-theorem · core · demand 3
- Sections: E&K ch. 24.1 (unconfirmed).
- Learner knows: externalities (loaf-with-smoke) / does not know: that if bargaining is free, the efficient fix happens whoever holds the legal right; only who pays changes.
- Misconception: If the factory has the right to pollute, the pollution continues.
- Prediction (stage text, 25 words or fewer): "Smoke costs a laundry $300 a year; a filter costs $100. The factory may legally pollute. If they bargain freely, is the filter fitted?" options: A No, the factory has the right / B Yes, the laundry pays for it / C Only if a court orders it (answer: B).
- Check (re-run): factory liable: filter ($100 < $300 damage). Factory has the right: laundry gains by paying anything from $100 to $300; filter fitted. Total cost either way is $100.
- Interaction: two rights assignments side by side; who-pays bar moves, the filter is fitted in both.
- Payoff: The laundry gains $300 from clean air and the filter costs $100, so it pays the factory to fit it; with the right reversed, the factory fits it itself.
- Planned claims: (1) if the factory is liable it fits the $100 filter rather than pay $300 of damage (derivation); (2) if the factory has the right, the laundry gains by paying between $100 and $300 for the filter (derivation); (3) either way the filter is fitted; the right decides only who pays (Coase theorem, when bargaining is costless; citation: Coase 1960, J. Law and Economics 3; E&K ch. 24; fact-checker confirms); (4) with costly bargaining or many parties the result can fail (citation: E&K ch. 24; fact-checker confirms).
- Format: Side-by-side comparison (two rights assignments). **Needs spec** (interaction-designer).
- Curriculum: `{"primary":"economics:coase-theorem","also":["economics:externality"],"prerequisites":["economics:externality"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":24}],"tags":["externalities","property rights"]}`
- Notes: Differs from nearest: loaf-with-smoke shows overproduction from an externality; shared-pasture shows the commons; this one shows bargaining as the fix. Concept gap inside a chapter already covered, not a duplicate.

### 6. odds-average-the-bettors · concept: economics:parimutuel-beliefs · core · demand 2
- Sections: E&K ch. 22.2, 22.3 (unconfirmed).
- Learner knows: odds and probability (odds-three-to-one) / does not know: that when bettors split their money in proportion to their beliefs, the market's implied chance is the wealth-weighted average belief.
- Misconception: The odds reflect the simple average opinion, or the loudest bettor's.
- Prediction (stage text, 25 words or fewer): "Bettor 1 ($300) thinks A wins 80%; bettor 2 ($100) thinks 40%. Each splits all their money by belief. Implied chance for A?" options: A 60% / B 70% / C 80% (answer: B, 70%).
- Check (re-run, passes): on A: 300 × 0.8 + 100 × 0.4 = 240 + 40 = 280 of a 400 pool = 0.70; simple average of beliefs 0.60.
- Interaction: wealth and belief sliders; pool bars on A and B; implied chance and simple average shown side by side.
- Payoff: $240 + $40 = $280 of the $400 pool is on A, so the odds say 70%: each opinion counts in proportion to the money behind it.
- Planned claims: (1) with the stage's numbers $280 of a $400 pool is on A, an implied 70% (derivation; node); (2) a bettor with log utility in a pari-mutuel market splits wealth across outcomes in proportion to their beliefs (citation: E&K ch. 22; Kelly 1956; fact-checker confirms); (3) then the implied probabilities equal the wealth-weighted average of beliefs (derivation; node).
- Format: Single card (wealth and belief sliders).
- Curriculum: `{"primary":"economics:parimutuel-beliefs","also":["probability:odds-vs-probability"],"prerequisites":["probability:odds-vs-probability"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22}],"tags":["markets","beliefs","betting"]}`
- Notes: Differs from nearest: probability/bet-too-much-and-go-broke is one bettor sizing one bet; this is many bettors setting a price. Edited: stage text says each bettor splits ALL their money by belief (the 70% holds only then).

### 7. second-trader-pays-the-seller · concept: economics:trader-competition · core · demand 2
- Sections: E&K ch. 11.3 (unconfirmed).
- Learner knows: a middleman buys low and sells high / does not know: that once a second trader can reach the seller, competition bids the price up to the buyer's value and the traders earn nothing.
- Misconception: Adding a second middleman just splits the middleman's profit in two.
- Prediction (stage text, 25 words or fewer): "A trader links a seller ($0) to a buyer ($1), keeping $1. A second trader with her own $1 buyer reaches the seller. Who gets it?" options: A The two traders split it / B The seller / C The buyer (answer: B, bids rise to $1).
- Check (re-run, passes): alternating best responses on a $0.01 grid end with both bids at $1, seller gets 1, trader profit 0; monopoly case seller 0, trader 1, buyer 0.
- Interaction: add-trader toggle; bid ticks rise a cent at a time.
- Payoff: Each trader can resell for $1, so each outbids the other a cent at a time until the bid reaches $1: the seller takes it all.
- Planned claims: (1) with one trader linked to both sides, the trader can bid 0 and ask 1, keeping the whole $1 (derivation; model rule); (2) with two traders able to buy from the seller, each with a buyer at $1, outbidding drives the bid to $1 and trader profit to 0 (derivation; node best-response iteration); (3) the model is the trading-network model of Blume, Easley, Kleinberg and Tardos (citation: Games and Economic Behavior 67(1), 2009; E&K ch. 11; fact-checker confirms).
- Format: Single card (add-trader toggle, bid ticks).
- Curriculum: `{"primary":"economics:trader-competition","also":["economics:monopoly-pricing"],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":11}],"tags":["markets","intermediaries","competition"]}`
- Notes: Differs from nearest: no lesson models intermediaries; economics/monopoly-pricing is one seller and a demand curve. Edited: the stage text said only that a second trader "reaches the seller"; the answer needs her own $1 buyer (if both traders shared the one buyer, the price is not pinned to $1). Builder must keep the two buyers separate on the stage.

### 8. stag-needs-three-in-four · concept: economics:coordination-stag-hunt · core · demand 2
- Sections: E&K ch. 6.5 (unconfirmed).
- Learner knows: best replies / does not know: that a better equilibrium needs enough trust: here at least 75% belief that the partner cooperates.
- Misconception: If both prefer the stag outcome, both will hunt stag.
- Prediction (stage text, 25 words or fewer): "Stag: 4 if both hunt it, 0 if alone. Hare: 3 for sure. How sure must you be your partner hunts stag?" options: A More than 50% / B At least 75% / C 100% (answer: B, 75%: 4p ≥ 3).
- Check (re-run, passes): threshold p = 3/4; at p = 0.5 stag is worth 2 and hare 3. Both-stag and both-hare are each best replies to themselves.
- Interaction: belief slider drives a live expected-value chart for stag vs hare.
- Payoff: Both stag and both hare are stable; the stag pays only if you are at least 75% sure of your partner, so doubt alone can lock in the worse outcome.
- Planned claims: (1) hunting stag pays more than hare only if the partner hunts stag with probability at least 3/4 (derivation; node); (2) both "both stag" and "both hare" are Nash equilibria (derivation; best-reply check); (3) the stag hunt is named after Rousseau's example (citation: Skyrms, The Stag Hunt, 2004; E&K ch. 6; fact-checker confirms).
- Format: Single card (belief slider drives live chart).
- Curriculum: `{"primary":"economics:coordination-stag-hunt","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6}],"tags":["game theory","coordination"]}`
- Notes: Differs from nearest: two-suspects-payoff has one equilibrium; this has two, and belief chooses. below-critical-mass (vertical batch 1) is a tipping point in a market, not a two-player game.

### 9. rising-price-stops-at-second · concept: economics:ascending-auction · intro · demand 3
- Sections: E&K ch. 9.3, 10.5 (unconfirmed).
- Learner knows: people stop bidding once the price passes what the item is worth to them / does not know: that the winner pays about the runner-up's value, not their own.
- Misconception: In a rising-price auction the winner pays close to what the item is worth to them.
- Prediction (stage text, 25 words or fewer): "Bidders value a lamp at $70, $55, $40. Price rises $1 at a time; each quits above their value. What does the winner pay?" options: A $70 / B $56 / C $41 (answer: B, $56).
- Check (re-run, passes): the $55 bidder quits when the price reaches $56, leaving the $70 bidder alone at $56; sealed second-price would charge $55; any price from $55 to $70 clears a one-item market and the rising procedure finds the lowest.
- Interaction: step-run button (price rises $1 per tap), bidders drop off the board.
- Payoff: The auction ends the moment the $55 bidder drops out at $56, so the $70 bidder pays $56, about what a sealed second-price auction charges ($55).
- Planned claims: (1) with values $70, $55 and $40 and $1 steps, bidding ends when the price passes $55 and the $70 bidder wins at $56 (derivation; node); (2) an ascending auction is strategically equivalent to a sealed second-price auction for private values (citation: E&K ch. 9; Vickrey 1961, J. Finance 16; fact-checker confirms); (3) for one item, any price between the top two values clears the market, and the rising procedure stops at the lowest (derivation; E&K ch. 10; node).
- Format: Single card with step-run button (price rises $1 per tap).
- Curriculum: `{"primary":"economics:ascending-auction","also":["economics:consumer-surplus"],"prerequisites":["economics:supply-demand"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9},{"work":"easley-kleinberg-2010","chapter":10}],"tags":["auctions"]}`
- Notes: Differs from nearest: bid-what-its-worth (vertical batch 1) is the sealed second-price auction; this one shows the open rising auction reaches the same price. Build after it. Edited: the original asked "where does it stop?" for an audience that "knows people quit at their value", which gives the answer away. It now asks what the winner pays, where $70 is the live misconception.

### 10. shade-your-sealed-bid · concept: economics:first-price-shading · core · demand 2
- Sections: E&K ch. 9.5 (unconfirmed).
- Learner knows: in a second-price auction you bid your value / does not know: that when you pay your own bid, the best bid is well below your value.
- Misconception: In a first-price sealed auction you should bid what the item is worth to you.
- Prediction (stage text, 25 words or fewer): "It's worth $80 to you; winners pay their bid. Your rival's value is anywhere $0–100, and they bid half of it. Best bid?" options: A $80 / B $60 / C $40 (answer: C, $40).
- Check (re-run, passes): rival's bid is spread evenly on $0 to $50, so a bid b wins with probability b/50 (to $50); expected profit (80 − b) × b/50: $32 at $40 (the maximum), $30 at $50, $20 at $60, $0 at $80.
- Interaction: bid slider drives an expected-profit chart.
- Payoff: Bidding $80 wins most but earns nothing; each dollar shaved earns more per win and loses a few wins; the best is $40, an expected $32.
- Planned claims: (1) against a rival who bids half a value spread evenly on $0 to $100, a bid of b wins with probability b/50 (up to $50; derivation; lesson rule); (2) with value $80 the expected profit is $32 at a $40 bid, $0 at $80, $30 at $50 (derivation; node grid); (3) with two bidders and values spread evenly, bidding half your value is the equilibrium of the first-price auction (citation: E&K ch. 9; Vickrey 1961; fact-checker confirms).
- Format: Single card (bid slider drives expected-profit chart).
- Curriculum: `{"primary":"economics:first-price-shading","also":["probability:expected-value"],"prerequisites":["probability:expected-value"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9}],"tags":["auctions","expected value"]}`
- Notes: Differs from nearest: bid-what-its-worth (vertical batch 1): bid your value when you pay the second price; here you pay your own bid, so you shade. Prerequisite "second-price truth-telling" lives in vertical batch 1; the lesson works alone, since the stage states the rule.

### 11. no-best-move-one-stable-pair · concept: economics:nash-equilibrium · core · demand 3
- Sections: E&K ch. 6.4 (unconfirmed).
- Learner knows: dominant strategies (two-suspects-payoff) / does not know: that even when no move is best against everything, a pair of moves where each is a best reply to the other can still pin down the outcome.
- Misconception: Without a move that is best whatever the other does, game theory cannot predict anything.
- Prediction (stage text, 25 words or fewer): "In this 3×3 game no move is best against every reply. Which cell is the only one where neither player wants to switch?" options: A Middle-left (M, L) / B Top-middle (U, C) / C Bottom-right (D, R) (answer: A).
- Check (re-run, passes): our own payoffs (row, column), columns L C R: U (3,1) (0,3) (2,0); M (4,2) (1,0) (0,1); D (2,0) (2,1) (1,3). No row or column move is (weakly) dominant; the only cell where both are best replies is (M, L).
- Interaction: tap cells; best-response arrows appear for each player.
- Payoff: At (M, L) the row player's 4 is the best in its column and the column player's 2 is the best in its row; every other cell has someone who gains by moving.
- Planned claims: (1) in the stage's game neither player has a dominant strategy (derivation; node); (2) (M, L) is the only cell where each player's move is a best reply to the other's (derivation; node enumeration of 9 cells; says "pure" equilibrium, mixed ones are not discussed); (3) a pair of strategies that are best replies to each other is a Nash equilibrium (definition: E&K ch. 6; Nash 1950, PNAS 36; fact-checker confirms).
- Format: Single card (tap cells; best-response arrows).
- Curriculum: `{"primary":"economics:nash-equilibrium","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6}],"tags":["game theory","Nash equilibrium"]}`
- Notes: Differs from nearest: two-suspects-payoff has a dominant strategy; this game has none. The prediction is a search puzzle more than a misconception test; the misconception is answered in the reveal. Builder: highlight best replies after the guess, and say "pure" when claiming uniqueness.

### 12. honest-bid-loses-in-gsp · concept: economics:gsp-auction · stretch · demand 2
- Sections: E&K ch. 15.5, 15.6 (unconfirmed).
- Learner knows: VCG (pay-for-the-harm-you-do) / does not know: that the "pay the next bid" rule real search engines used makes honest bidding not always best.
- Misconception: Paying the next-highest bid per click is just a second-price auction, so bid honestly.
- Prediction (stage text, 25 words or fewer): "Slots get 10 and 4 clicks; values per click $7, $6, $1. Each pays the next bid. X bids honestly ($7). Can X do better?" options: A No / B Yes, by bidding $5 / C Yes, by bidding $8 (answer: B, profit 10 to 24).
- Check (re-run, passes): honest: X takes slot 1 and pays $6 × 10 = 60, keeps 70 − 60 = 10. Bid $5: Y takes slot 1, X takes slot 2 at $1 a click, keeps 28 − 4 = 24. Bid $8 gives the same slot and price as honest (profit 10). VCG for these numbers: X pays 40, Y pays 4, Z pays 0; revenue 44; GSP honest revenue 64.
- Interaction: bid slider for X; profit shown for each bid.
- Payoff: Honest X pays $6 a click for slot 1 and keeps $10; bidding $5 drops X to slot 2 at $1 a click and keeps $24, so honesty is not best under GSP.
- Planned claims: (1) with honest bids, X pays $60 for slot 1 and keeps 70 − 60 = 10; bidding $5 wins slot 2 for $4 and keeps 28 − 4 = 24 (derivation; node); (2) generalized second price auctions are not truthful; their equilibria were analysed by Edelman, Ostrovsky and Schwarz and by Varian (citation: Edelman, Ostrovsky and Schwarz 2007, Am. Econ. Rev. 97(1); Varian 2007; E&K ch. 15; fact-checker confirms).
- Format: Single card (bid slider).
- Curriculum: `{"primary":"economics:gsp-auction","also":[],"prerequisites":["economics:vcg-mechanism"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15}],"tags":["auctions","advertising"]}`
- Notes: Differs from nearest: pay-for-the-harm-you-do (VCG) is truthful; this one changes only the payment rule and loses that. Build after it. Edited: the course brief's claim that "GSP equilibria earn seller revenue from about $10 to $48" is dropped and must not be used. Re-run on a whole-dollar grid gives 211 equilibria with revenue $10 to $84 if bids above value are allowed, and 46 with revenue $10 to $44 if not (and the count depends on the tie rule); the range is not reproducible from the brief's definition. The revenue comparison with VCG ($44) is not claimed.

### 13. two-thirds-of-the-average · concept: economics:iterated-dominance · core · demand 2
- Sections: E&K ch. 6.10 (confirmed in the course map; chapter-only in references anyway).
- Learner knows: a dominated choice is never best / does not know: that if everyone is rational and knows it, deleting dominated choices round after round leaves only 0.
- Misconception: The rational guess is about 33 (two thirds of an average of 50).
- Prediction (stage text, 25 words or fewer): "Everyone picks any number from 0 to 100; closest to 2/3 of the average wins. All are rational and know it. What do they pick?" options: A 33 / B 22 / C 0 (answer: C, 0).
- Check (re-run, passes): upper bound by round `[100,66.667,44.444,29.63,19.753,13.169,8.779,5.853,3.902,2.601,1.734,1.156,0.771]`: under 1 after 12 rounds and shrinking toward 0.
- Interaction: step button, one round of reasoning per tap, the bound shrinking on a number line.
- Payoff: Above 66.7 can never win; once those go, above 44.4 can't; each round cuts a third, and the bound heads to 0.
- Planned claims: (1) guesses above 66.7 are dominated; after k rounds of deletion, guesses above 100 × (2/3)^k are gone, under 1 after 12 rounds (derivation; node); (2) with any real number allowed, the only guess that survives repeated deletion is 0 (derivation; limit of the bound); (3) in experiments people's first guesses average well above 0, often around 20 to 40 (citation: Nagel 1995, Am. Econ. Rev. 85(5)). **Needs a human source check (empirical); keep out of learner text until checked.**
- Format: Single card with Step (one round of reasoning per tap).
- Curriculum: `{"primary":"economics:iterated-dominance","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6}],"tags":["game theory","rationality"]}`
- Notes: Differs from nearest: no lesson teaches iterated dominance; cs brief tic-tac-toe-is-a-draw is backward induction in a sequential game. Edited: "any number" (real-valued) is required. With whole-number guesses 1 does not get deleted (at 1 the target is 0.67, nearer to 1 than to 0), so the answer "0" would be wrong; and the reveal no longer says the bound "leaves 0" after 12 rounds, only that it is under 1 and shrinking. Builder: do not offer whole numbers only.

### 14. outside-option-sets-the-split · concept: economics:nash-bargaining · core · demand 2
- Sections: E&K ch. 12.5 (unconfirmed).
- Learner knows: splitting $1 / does not know: that each side first gets its outside option and the rest is split equally.
- Misconception: A better outside option only matters if you actually walk away.
- Prediction (stage text, 25 words or fewer): "A and B split $1. A could get $0.40 elsewhere; B gets nothing elsewhere. Under Nash bargaining, A gets?" options: A $0.50 / B $0.70 / C $0.40 (answer: B, $0.70).
- Check (re-run, passes): A = 0.4 + (1 − 0.4 − 0)/2 = 0.70; B = 0.30.
- Interaction: outside-option slider drives a split bar.
- Payoff: A is guaranteed $0.40; the remaining $0.60 is split evenly, so A gets $0.70, even though A never leaves.
- Planned claims: (1) with outside options 0.4 and 0, the Nash bargaining split of $1 is $0.70 and $0.30 (derivation; node); (2) the Nash bargaining solution gives each its outside option plus half the remaining surplus (citation: Nash 1950, Econometrica 18; E&K ch. 12; fact-checker confirms; holds for money-like, linear payoffs).
- Format: Single card (outside-option slider drives split bar).
- Curriculum: `{"primary":"economics:nash-bargaining","also":[],"prerequisites":["economics:opportunity-cost"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12}],"tags":["bargaining"]}`
- Notes: Differs from nearest: no lesson teaches bargaining. It is the building block of four-in-a-row-two-thirds.

### 15. four-in-a-row-two-thirds · concept: economics:balanced-outcomes · stretch · demand 2
- Sections: E&K ch. 12.7, 12.8 (unconfirmed).
- Learner knows: the centre of a 3-path takes all; Nash bargaining / does not know: that in a 4-path the inner people get 2/3, not all and not half.
- Misconception: In a line of four, the two inner people have the same power as the centre of three, so take everything.
- Prediction (stage text, 25 words or fewer): "A–B–C–D in a line; pairs A–B and C–D each split $1. Each pair splits fairly given outside options. What does B get?" options: A $0.50 / B About $0.67 / C Nearly $1 (answer: B, $2/3).
- Check (re-run, passes): balance v_B = o_B + (1 − o_B)/2 with o_B = 1 − v_C and symmetry: v = 1 − v/2, so v = 2/3 for B and C, 1/3 for A and D.
- Interaction: step-run button; outside options update round by round until the split settles.
- Payoff: B's fallback is a deal with C, but C is not desperate; each inner person's outside option feeds the other's, and the split settles at 2/3 to 1/3.
- Planned claims: (1) in the 4-path, the balanced outcome gives B and C $2/3 each, A and D $1/3 (derivation; node fixed-point iteration); (2) an outcome is stable if no two people could both do better by dealing with each other; balanced if each pair splits its surplus over outside options equally (definition: E&K ch. 12; Cook and Yamagishi 1992; fact-checker confirms); (3) laboratory results on 4-paths show a moderate advantage for the inner people, not total (citation: E&K ch. 12 summarising exchange experiments). **Needs a human source check (empirical); keep out of learner text until checked.**
- Format: Single card with step-run button (outside options update).
- Curriculum: `{"primary":"economics:balanced-outcomes","also":[],"prerequisites":["economics:nash-bargaining"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12}],"tags":["bargaining","networks","power"]}`
- Notes: Differs from nearest: middle-of-three-takes-all gives all to the centre; this shows power depends on the whole network, not just the number of partners. Build after outside-option-sets-the-split and middle-of-three-takes-all.

### 16. lowball-offer-should-pass · concept: economics:ultimatum-game · intro · demand 3
- Sections: E&K ch. 12.6 (unconfirmed).
- Learner knows: take-it-or-leave-it offers / does not know: that a money-only responder should accept any positive offer, and that real people often don't.
- Misconception: A rational responder rejects an insulting offer.
- Prediction (stage text, 25 words or fewer): "You're offered part of $10, in whole dollars. Reject, and both get $0. If you care only about money, what's the smallest offer worth accepting?" options: A $1 / B $3 / C $5 (answer: A, $1).
- Check (re-run, passes): any offer of $1 or more beats $0, so the smallest worth accepting is $1 and the proposer keeps $9. (An offer of $0 leaves the responder indifferent; the stage text asks about offers that beat rejecting.)
- Interaction: offer slider (whole dollars); accept/reject result against a money-only responder.
- Payoff: Rejecting $1 leaves you $0, so a money-only responder takes it, and a proposer who knows it offers $1; people often reject low offers.
- Planned claims: (1) a responder who cares only about money prefers $1 to $0, so accepts any positive offer (derivation); (2) against such a responder the proposer's best offer is the smallest unit, $1 of $10 (derivation; backward induction); (3) in experiments, most offers are 40 to 50% and offers below about 20% are often rejected (citation: Güth, Schmittberger and Schwarze 1982, J. Econ. Behav. Org. 3; Camerer, Behavioral Game Theory, 2003). **Needs a human source check (empirical); keep out of learner text until checked.**
- Format: Single card (offer slider).
- Curriculum: `{"primary":"economics:ultimatum-game","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12}],"tags":["bargaining","fairness","game theory"]}`
- Notes: Differs from nearest: two-suspects-payoff is simultaneous; this is a two-step game. economics/sunk-cost is a different bias. Edited: "smallest you accept" was a tie at $0; the stage now asks for the smallest offer worth accepting. Build before patience-wins-the-split.

### 17. same-revenue-any-rule · concept: economics:revenue-equivalence · stretch · demand 2
- Sections: E&K ch. 9.7 (unconfirmed).
- Learner knows: first-price shading and second-price truth-telling / does not know: that with equilibrium bidding, first-price, second-price and even all-pay auctions earn the seller the same on average.
- Misconception: Making winners pay their own bid must earn the seller more than charging the second-highest bid.
- Prediction (stage text, 25 words or fewer): "Two bidders, values random $0–100, each bidding optimally. Which rule earns the seller most on average?" options: A First-price / B Second-price / C About the same (answer: C, about $33.3 each).
- Check (re-run, passes): 20,000 seeded auctions (mulberry32, seed 97): second-price 33.395, first-price with bid v/2 33.303, all-pay with bid v²/200 33.302; theory 100/3 = 33.333.
- Interaction: rule chips; run button; running average per rule.
- Payoff: Higher bids paid less often (second-price) and lower bids paid always (first-price, all-pay) balance out: each averages $33.3.
- Planned claims: (1) in 20,000 simulated auctions the seller averages $33.40 (second-price), $33.30 (first-price) and $33.30 (all-pay) (simulation; node, seed 97); (2) theory gives $100/3 for all three with two bidders and values uniform on $0 to $100 (derivation; expected lower of two uniform values); (3) revenue equivalence holds for standard auctions with independent private values (citation, theorem: Myerson 1981, Math. Oper. Res. 6; Riley and Samuelson 1981; E&K ch. 9; fact-checker confirms).
- Format: Simulation run (rule chips).
- Curriculum: `{"primary":"economics:revenue-equivalence","also":["probability:expected-value"],"prerequisites":["economics:first-price-shading"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":9}],"tags":["auctions","simulation"]}`
- Notes: Differs from nearest: builds on bid-what-its-worth and shade-your-sealed-bid; no lesson compares seller revenue. Build after both.

### 18. the-bar-nobody-can-forecast · concept: economics:el-farol-minority · core · demand 2
- Sections: E&K ch. 17.7 (unconfirmed).
- Learner knows: network effects make things more valuable as more join (vertical batch 1) / does not know: that with a crowding cost, any forecast everyone believes makes itself wrong.
- Misconception: If everyone uses the same good forecast, the bar will be pleasantly busy.
- Prediction (stage text, 25 words or fewer): "100 people go to a bar only if they expect 60 or fewer. All trust one forecast: 50 will come. How many come?" options: A About 50 / B About 60 / C All 100 (answer: C, 100).
- Check (re-run, passes): same forecast at or below 60 sends all 100; above 60 sends none. If each goes independently with probability 0.6, the mean is 60 and attendance exceeds 60 on 0.4621 of nights (46.2%).
- Interaction: forecast chips; mixed-strategy run over many nights.
- Payoff: A forecast below 60 sends everyone, one above 60 sends no one; only randomising (each goes 60% of the time) averages 60, and the bar is still crowded nearly half the time.
- Planned claims: (1) if all 100 act on the same forecast, attendance is 100 when it says 60 or fewer and 0 when it says more (derivation; rule); (2) if each goes independently with probability 0.6, average attendance is 60 and attendance exceeds 60 on 46.2% of nights (derivation; node binomial sum); (3) the El Farol bar problem is due to Arthur (citation: W. B. Arthur, Am. Econ. Rev. 84(2), 1994; E&K ch. 17 advanced section; fact-checker confirms).
- Format: Simulation run (forecast chips; mixed-strategy run).
- Curriculum: `{"primary":"economics:el-farol-minority","also":["probability:expected-value"],"prerequisites":["economics:supply-demand"],"level":"core","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":17}],"tags":["externalities","forecasting","game theory"]}`
- Notes: Differs from nearest: below-critical-mass (vertical batch 1) has positive network effects; here more is worse. ai/feedback-loops is about model feedback, not crowds. Fact-checker should also confirm the book chapter placement before the lesson cites it.

### 19. someone-has-to-swerve · concept: economics:hawk-dove-chicken · intro · demand 2
- Sections: E&K ch. 6.6 (unconfirmed).
- Learner knows: Nash equilibrium as "no one wants to switch" / does not know: that in chicken the stable outcomes are the two where players act differently.
- Misconception: Identical players in an identical game must end up doing the same thing.
- Prediction (stage text, 25 words or fewer): "Two drivers: both straight crash (−10 each); swerve vs straight gives 0 and 3; both swerve give 1 each. Which outcomes are stable?" options: A Both swerve / B Both straight / C One of each (answer: C).
- Check (re-run, passes): pure Nash equilibria are (straight, swerve) and (swerve, straight) only.
- Interaction: tap cells; best-reply arrows (same grid as no-best-move-one-stable-pair).
- Payoff: If both swerve, either gains by going straight; if both go straight, either gains by swerving; only "one of each" is stable, so identical players split roles.
- Planned claims: (1) with these payoffs the only pure Nash equilibria are (straight, swerve) and (swerve, straight) (derivation; node); (2) the payoffs are invented for the lesson (lesson rule).
- Format: Single card.
- Curriculum: `{"primary":"economics:hawk-dove-chicken","also":[],"prerequisites":["economics:prisoners-dilemma"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":6}],"tags":["game theory","chicken"]}`
- Notes: Differs from nearest: stag-needs-three-in-four (coordination) has stable outcomes where players match; here they must differ. life brief hawks-never-take-over turns this game into an evolving population. Build after no-best-move-one-stable-pair.

### 20. only-the-needed-trader-profits · concept: economics:essential-trader-profit · stretch · demand 1
- Sections: E&K ch. 11.6 (unconfirmed).
- Learner knows: competing traders earn nothing (second-trader-pays-the-seller) / does not know: that a trader can earn only when removing it would lose a trade.
- Misconception: The trader with the most connections earns the most.
- Prediction (stage text, 25 words or fewer): "Items: sellers value $0, buyers $1. T1, T2 both link seller 1 to buyer 1; T3 alone links seller 2 to buyer 2. Who profits?" options: A T1 and T2 / B T3 / C All three (answer: B, T3).
- Check (re-run): removing T1 or T2 loses no trade (welfare loss 0); removing T3 loses one (welfare loss 1).
- Interaction: remove-trader taps; the trade count updates.
- Payoff: Remove T1 and T2 still makes the trade, so T1 earns nothing (and vice versa); remove T3 and a trade is lost, so T3 can charge for it.
- Planned claims: (1) removing T1 or T2 loses no trade; removing T3 loses one (derivation; node); (2) in equilibrium a trader earns a positive profit only if it is essential to the social optimum (citation, theorem: Blume, Easley, Kleinberg and Tardos 2009; E&K ch. 11; fact-checker confirms the exact statement).
- Format: Single card (remove-trader taps).
- Curriculum: `{"primary":"economics:essential-trader-profit","also":[],"prerequisites":["economics:trader-competition"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":11}],"tags":["markets","intermediaries"]}`
- Notes: Differs from nearest: builds on second-trader-pays-the-seller; that shows competition on one side, this shows the general rule. Edited: the stage now gives the sellers' and buyers' values (without them "who profits" has no answer), and "earns exactly when" became "can earn only if" (the theorem is one-directional: essential is necessary, not sufficient).

### 21. accurate-bettor-takes-the-pot · concept: economics:market-selection-wealth · stretch · demand 1
- Sections: E&K ch. 22.10 (unconfirmed).
- Learner knows: odds are wealth-weighted beliefs (odds-average-the-bettors) / does not know: that repeated betting shifts wealth toward the more accurate bettor, so prices drift toward the truth, though luck can lead for a long time.
- Misconception: Two bettors with similar beliefs will keep similar wealth.
- Prediction (stage text, 25 words or fewer): "A horse truly wins 60% of races. One bettor believes 60%, another 50%; equal money. After 500 races, who holds most of it?" options: A About equal / B The 60% bettor / C The 50% bettor (answer: B).
- Check (re-run, passes; the course brief's list was truncated, full result here): log-utility pari-mutuel bettors, each splitting all wealth by belief, equal start, mulberry32 seeds 2211 to 2215, share of the 60% bettor after 50 / 100 / 200 / 500 races: 2211 `.732 .882 .982 1`; 2212 `.265 .397 .114 .988`; 2213 `.804 .882 .943 1`; 2214 `.86 .918 .999 1`; 2215 `.732 .769 .302 .992`. The less accurate bettor led at race 200 in TWO runs (88.6% in seed 2212, 69.8% in seed 2215). The builder must re-run with the lesson's exact draw order before locking numbers.
- Interaction: seeded races; wealth-share bar over races.
- Payoff: Each race moves wealth by how much better your belief fit the outcome; over hundreds of races the accurate bettor wins, though luck led the other way for 200 races in a run.
- Planned claims: (1) in 5 seeded runs of 500 races, the accurate bettor ended with 98.8% to 100% of the wealth (simulation; node, seeds 2211 to 2215); (2) in seed 2212 the less accurate bettor held 88.6% after 200 races (simulation; node); (3) in such markets, wealth flows to traders whose beliefs are closest to the truth (citation: Blume and Easley 2006, Econometrica 74(4); E&K ch. 22 advanced section; fact-checker confirms).
- Format: Simulation run (seeded races).
- Curriculum: `{"primary":"economics:market-selection-wealth","also":["probability:multiplicative-bets"],"prerequisites":["probability:multiplicative-bets"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":22}],"tags":["markets","selection","simulation"]}`
- Notes: Differs from nearest: probability/bet-too-much-and-go-broke is one bettor vs a fixed game; here two bettors face each other through prices. Build after odds-average-the-bettors.

### 22. lower-bid-takes-the-top-ad · concept: economics:ad-quality-ranking · intro · demand 2
- Sections: E&K ch. 15.7 (unconfirmed).
- Learner knows: ads are sold by auction / does not know: that search ads are ranked by bid times a quality score, so a lower bid can win the top slot and pay less.
- Misconception: The highest bidder always gets the top ad slot.
- Prediction (stage text, 25 words or fewer): "A bids $2.00 per click, quality 0.5. B bids $1.50, quality 1.0. Ranked by bid × quality, who gets the top slot?" options: A A / B B / C Tie (answer: B, score 1.5 vs 1.0).
- Check (re-run, passes): score A = 2.00 × 0.5 = 1.0; score B = 1.50 × 1.0 = 1.5; B stays on top at any bid above 1.0 / 1.0 = $1.00 per click.
- Interaction: single card with bids and quality; ranking bars.
- Payoff: B's score 1.5 beats A's 1.0, and B pays only what keeps it ahead, $1.00 a click, less than A bid.
- Planned claims: (1) with the stage's numbers B scores 1.5 and A scores 1.0, so B takes the top slot (derivation; node); (2) under this rule (pay the least that keeps your rank) B pays $1.00 per click (derivation; node); (3) search engines rank ads using a quality factor as well as the bid; the exact formulas are not public (citation: E&K ch. 15). **Needs a human source check (empirical); keep out of learner text until checked.**
- Format: Single card.
- Curriculum: `{"primary":"economics:ad-quality-ranking","also":[],"prerequisites":["economics:supply-demand"],"level":"intro","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15}],"tags":["auctions","advertising"]}`
- Notes: Differs from nearest: other auction briefs rank by bid alone. Simple intro; can be built any time. Label the rule as a simplified model on the card (the payment rule is stated, not claimed for any real engine).

### 23. harm-prices-clear-the-market · concept: economics:vcg-market-clearing · stretch · demand 1
- Sections: E&K ch. 15.9 (unconfirmed).
- Learner knows: prices-sort-the-buyers (vertical batch 1) and VCG / does not know: that charging each buyer the harm they cause gives exactly the market-clearing prices found by raising prices.
- Misconception: Prices from a fairness rule (pay the harm) and prices from supply and demand are unrelated.
- Prediction (stage text, 25 words or fewer): "Three buyers, three items; raising prices clears at prices totalling $4. Charge each buyer the harm they cause others. Payments total?" options: A Less than $4 / B Exactly $4 / C More than $4 (answer: B, $4).
- Check (re-run, passes): valuations (rows buyers, columns items a b c): x 12/4/2, y 8/7/6, z 7/5/2. Best total 23 with x-a, y-c, z-b. Harm: x 3 (14 − 11), z 1, y 0, so prices a 3, b 1, c 0 (total 4). Brute force confirms the smallest market-clearing prices are 3, 1, 0 (total 4).
- Interaction: single card; per-buyer harm shown beside the clearing price.
- Payoff: x's presence costs the others 14 − 11 = 3, z's costs 1, y's costs 0: the same prices the ascending procedure found.
- Planned claims: (1) in the example, VCG prices are a: 3, b: 1, c: 0 (derivation; node enumeration of assignments); (2) these equal the market-clearing prices found by the ascending procedure in prices-sort-the-buyers (derivation; node brute force over prices 0 to 12); (3) VCG prices are always market-clearing (and the smallest such prices) (citation, theorem: E&K ch. 15 advanced section; Kern, Manthey and Uetz, arXiv 1604.04157; Leonard 1983; fact-checker confirms).
- Format: Single card.
- Curriculum: `{"primary":"economics:vcg-market-clearing","also":[],"prerequisites":["economics:vcg-mechanism"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":15}],"tags":["matching markets","VCG"]}`
- Notes: Differs from nearest: joins two lessons (prices-sort-the-buyers, pay-for-the-harm-you-do); build after both. Edited: the original prediction told the learner the clearing prices were 3, 1, 0 and asked whether harm prices were 3, 1, 0, so option A was a free answer. It now gives only the total ($4) and asks the total of harm payments, so the match is a real guess. The stage must show the valuation table (the lesson cannot rely on "as before").

### 24. patience-wins-the-split · concept: economics:alternating-offers · stretch · demand 1
- Sections: E&K ch. 12.9 (unconfirmed).
- Learner knows: backward induction (lowball-offer-should-pass) / does not know: that when each delay shrinks the pie, the first proposer gets 1/(1 + δ), a small edge when delays are cheap.
- Misconception: Whoever makes the first offer can grab most of the pie.
- Prediction (stage text, 25 words or fewer): "Two people alternate offers on $1; each rejected round shrinks it 10%. With no end date, what does the first proposer get?" options: A About 90% / B About 53% / C Exactly 50% (answer: B, 52.6%).
- Check (re-run, passes): δ = 0.9: 1/1.9 = 0.526; δ = 0.5: 0.667. Backward induction over 50, 51, 400 rounds: 0.524, 0.529, 0.526 (long finite games converge).
- Interaction: shrink slider; backward-induction steps.
- Payoff: The responder can wait and propose next round, worth 90% of what the proposer gets, so the proposer keeps 1/1.9 = 52.6%; at 50% shrink it is 2/3.
- Planned claims: (1) with 10% shrink per round, the first proposer's equilibrium share is 1/(1 + 0.9) = 52.6%; with 50% shrink it is 66.7% (derivation; node); (2) backward induction over 400 rounds gives the same 52.6% (derivation; node); (3) this is Rubinstein's alternating-offers model (citation: Rubinstein 1982, Econometrica 50(1); E&K ch. 12 advanced section; fact-checker confirms).
- Format: Single card (shrink slider; backward-induction steps).
- Curriculum: `{"primary":"economics:alternating-offers","also":[],"prerequisites":["economics:ultimatum-game","economics:present-value"],"level":"stretch","strand":"markets","references":[{"work":"easley-kleinberg-2010","chapter":12}],"tags":["bargaining","backward induction"]}`
- Notes: Differs from nearest: outside-option-sets-the-split assumes a fair split; this derives a split from timing. Edited: prerequisite is now ultimatum-game (which teaches backward induction) plus present-value; the original had only present-value.
