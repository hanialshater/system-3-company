# Probability & Data: ranked lesson briefs (new)

owner: cm-probability · written 2026-10-12 · map: `content/curriculum/probability.json` (30 concepts)

Existing lessons not repeated here: `birthday-paradox`, `base-rates`. Ranking: demand first, misconception strength second, how visible it is in one 60-second simulation third. Every probability below is computable exactly or by seeded simulation; the one-line check is arithmetic a fact-checker can redo. Briefs are for the learning designer and builder; interaction text is a sketch of what the learner manipulates, not a design.

Concepts in the map with no brief yet (honest gaps): `independence`, `conditional-probability`, `at-least-once`, `poll-margin-of-error`, `expected-value`, `central-limit`. Not covered by any lesson or brief: these six. `conditional-probability` and `independence` are prerequisites of lessons below that assume them informally; each brief states the boundary.

Portfolio check: all demand-3 concepts (birthday, monty-hall, base-rates, gamblers-fallacy, prosecutors-fallacy, simpsons-paradox, confounding) have a lesson or a top-5 brief. Exploration slots: briefs 16-22.

### 1. monty-hall-100-doors · concept: monty-hall · intro · demand 3
- Learner knows: probability as a fraction of equally likely cases / does not know: why the host's knowledge matters, conditional probability.
- Misconception: Two doors are left, so it is 50/50 and switching changes nothing.
- Prediction: "100 doors, one car. You pick door 1. The host, who knows where the car is, opens 98 empty doors, leaving door 1 and door 61. What is the chance the car is behind door 61?" options: 50% / 1% / 99% (answer: C). Check: your door keeps its 1/100; the other 99/100 is squeezed onto the one door the host left shut.
- Interaction: the learner plays rounds on a row of doors (tap to pick, tap to keep or switch) with a seeded auto-play of 200 rounds that tallies stay vs switch wins; door count steps 3, 10, 100 so the gap widens visibly.
- Payoff: Your first pick was a 1-in-N guess and the host's opening does not improve it; all the leftover chance moves to the door he avoided.
- Claims to check: (a) switching wins 2/3 with 3 doors and 99/100 with 100 doors when the host knowingly opens only goat doors: derivation, verify by enumerating or simulating 100,000 rounds. (b) If the host opens a random door and it happens to be empty, switching is 50/50: only state if included; enumerate. (c) Historical: vos Savant's 1990 Parade column gave "switch": check the column.

### 2. five-heads-then-what · concept: gamblers-fallacy · intro · demand 3
- Learner knows: a fair coin is 50/50 / does not know: independence, that streaks are not "due" to end.
- Misconception: After five heads in a row, tails is more likely next ("it has to even out").
- Prediction: "A fair coin just landed heads five times in a row. How likely is heads on flip six?" options: below 50% / exactly 50% / above 50% (answer: B). Check: flips do not affect each other, so P(H on flip 6) = 1/2 regardless of history.
- Interaction: learner taps to generate 10,000 seeded flips; the stage highlights every spot that follows five heads and tallies what came next (about 1 in 64 start positions qualify, roughly 150 cases) with the running heads fraction beside it.
- Payoff: The coin has no memory; the evening-out happens by dilution (more flips swamp the streak), not by correction.
- Claims to check: (a) P(heads | previous 5 heads) = 0.5 for a fair coin: derivation. (b) P(five specific flips all heads) = 1/32; a given start position begins a run of 5 heads then a sixth flip with probability 1/64 for six heads: arithmetic. (c) The tally shown is from a seeded simulation of fair flips; the fraction after streaks will fluctuate near 50%: check the seed output.

### 3. one-in-a-million-match · concept: prosecutors-fallacy · core · demand 3
- Learner knows: base-rate counting from the `base-rates` lesson (assumed) / does not know: the transposed conditional P(match | innocent) vs P(innocent | match).
- Misconception: "Only 1 in a million innocent people would match, so a match means a one-in-a-million chance of innocence."
- Prediction: "A forensic match occurs by chance for 1 in 1,000,000 innocent people. A database search checks 5,000,000 people. About how many innocent people will match?" options: about 0.005 / about 5 / about 500,000 (answer: B). Check: 5,000,000 x 1/1,000,000 = 5.
- Interaction: a grid of 5,000,000 people scaled as 5,000 dots, each dot = 1,000 people, with matches shown as flashes; the learner changes the database size on a slider (1,000 to 5,000,000) and sees expected innocent matches against the one true match.
- Payoff: A rare coincidence becomes ordinary once you search enough people; the match must be weighed against the count of innocents who also match.
- Claims to check: (a) expected innocent matches = N x 1e-6: arithmetic. (b) with one guilty person in the database and 5 innocent matches expected, P(guilty | match) is about 1/6, near 17%: derivation, assumes the guilty person is in the database and matches with certainty. (c) The transposed-conditional error is documented as the "prosecutor's fallacy": cite Thompson & Schumann (1987), Law and Human Behavior 11(3).

### 4. better-in-every-group-worse-overall · concept: simpsons-paradox · core · demand 3
- Learner knows: success rates as percentages / does not know: weighted averages, why group sizes matter.
- Misconception: If A beats B in every subgroup, A must beat B overall.
- Prediction: "Treatment A beats treatment B for small stones (93% vs 87%) and for large stones (73% vs 69%). Overall, which has the higher success rate?" options: A / B / they tie (answer: B). Check: A overall 273/350 = 78%; B overall 289/350 = 82.6%. A treated mostly the hard large stones (263 of 350), B mostly easy small ones (270 of 350).
- Interaction: two stacked bars of patients that the learner can split by stone size with a toggle; a slider moves cases of large stones between treatments and the overall percentages respond.
- Payoff: Overall rates average the subgroup rates with different weights; who got the hard cases can reverse the headline.
- Claims to check: (a) data: A small 81/87, large 192/263; B small 234/270, large 55/80: from Charig et al. (1986), BMJ 292: 879-882, as presented in Julious & Mullee (1994), BMJ 309: 1480. (b) the percentages: 81/87 = 93.1%, 192/263 = 73.0%, 234/270 = 86.7%, 55/80 = 68.8%, 273/350 = 78.0%, 289/350 = 82.6%: arithmetic. (c) State plainly if the lesson says which treatment is "better" in practice: it should not; the paradox is about the arithmetic.

### 5. hidden-third-cause · concept: confounding · core · demand 3
- Learner knows: correlation as "go up together" / does not know: confounders, stratifying.
- Misconception: If two things rise and fall together, one must be causing the other.
- Prediction: "In a simulated town, daily ice-cream sales and daily sunburn cases rise together. Warm weather drives both; neither affects the other. Compare only days with the same temperature. What happens to the link?" options: stays strong / mostly disappears / reverses (answer: B). Check: by construction both variables equal temperature effect plus independent noise, so partial correlation given temperature is 0; verify by computing the correlation inside a temperature band.
- Interaction: scatter of sales vs sunburns for 300 seeded days, coloured by temperature; the learner drags a temperature-band window and watches the cloud inside it flatten into a blob.
- Payoff: A strong pattern across everything can vanish inside each slice once you hold the hidden cause still.
- Claims to check: (a) the simulation is built with temperature as the only link: show the generating code; (b) the overall correlation is high (state the computed value) and within-band correlation is near 0 (state the computed value); (c) any real-world statement ("sunburn is not caused by ice cream") should be framed as the model's assumption, not as data.

### 6. praise-then-slump · concept: regression-to-mean · core · demand 2
- Learner knows: averages / does not know: score = skill + luck, regression to the mean.
- Misconception: If top scorers do worse next time, something (complacency, a jinx, a coach's scolding) changed.
- Prediction: "A test mixes skill and luck. The top 10% on test 1 sit test 2 with no coaching and the same skill. Their average score on test 2 will be:" options: about the same / lower / higher (answer: B). Check: in the simulation (skill and luck each with equal variance), E[score2 | score1] = 0.5 x score1, so the top group's average halves its distance above the mean.
- Interaction: 1,000 seeded students as dots on a two-axis scatter (test 1 left, test 2 right as a line); the learner drags a "top scorers" cut-off and the selected dots' second scores spread back toward the middle.
- Payoff: Extreme results contain extra luck, which does not repeat, so the next draw is closer to average without any cause.
- Claims to check: (a) with equal skill and luck variance the test-score correlation is 0.5 and the expected regression is half: derivation. (b) the displayed group means are from the seeded sim. (c) Galton (1886), "Regression towards mediocrity in hereditary stature", J. Anthropological Institute 15 as origin: verify citation.

### 7. armour-where-no-holes · concept: sampling-bias · core · demand 2
- Learner knows: that data can be incomplete / does not know: survivorship bias.
- Misconception: The places where returning planes show the most damage are the places to armour.
- Prediction: "Bombers return from missions with bullet holes mostly in the wings and body, few in the engines. Where should armour go?" options: where the holes are / where returning planes have few holes / spread evenly (answer: B). Check: in the simulation hits land uniformly but a hit to the engine downs the plane, so returned planes show no engine holes.
- Interaction: the learner fires 200 seeded random hits at a plane diagram; planes hit in the engine vanish from the "returned" pile; the returned pile's hole map is shown beside nothing else (one representation).
- Payoff: The missing data are the signal: planes that were hit in the weak spot never came back to be counted.
- Claims to check: (a) Abraham Wald's Statistical Research Group analysis recommended armouring where returning planes were not hit: Mangel & Samaniuk (1984), JASA 79: 259-267. (b) the lesson's hit model is a toy (uniform hits, engine hit = loss), say so. (c) the displayed counts come from the seeded sim.

### 8. coin-gap-keeps-growing · concept: law-of-large-numbers · intro · demand 2
- Learner knows: a fair coin / does not know: that the law concerns fractions, not counts.
- Misconception: The law of large numbers means heads and tails counts get closer together.
- Prediction: "You flip a fair coin 10,000 times. Typically, how far apart will the heads and tails counts be?" options: under 5 / about 100 / about 1,000 (answer: B). Check: the gap |H - T| has standard deviation sqrt(10,000) = 100, and its average size is about 0.8 x 100 = 80.
- Interaction: a running plot of (heads - tails) over 10,000 flips for 20 seeded runs, plus a toggle for the heads fraction; the learner switches between the two views.
- Payoff: The fraction converges to 1/2 while the count gap wanders wider, because the total grows faster than the gap.
- Claims to check: (a) SD of H - T after n fair flips is sqrt(n): derivation. (b) E|H - T| is about sqrt(2n/pi) = 79.8 for n = 10,000: derivation. (c) the heads fraction after 10,000 flips lies within about 1 percentage point of 50% for 95% of runs (1.96 x 0.5/100 = 0.98 points): arithmetic.

### 9. small-hospital-big-swings · concept: sample-size-noise · intro · demand 2
- Learner knows: percentages / does not know: sampling variability.
- Misconception: A small group and a large group are equally likely to show extreme percentages.
- Prediction: "Hospital A has 15 births a day, hospital B has 45. Boys are 50% of births. Over a year, which has more days when more than 60% of babies are boys?" options: A (smaller) / B (larger) / about the same (answer: A). Check: P(more than 9 boys of 15) = 4,944/32,768 = 15.1%; P(more than 27 boys of 45) = 6.8%.
- Interaction: learner picks hospital size on a slider (5 to 100 births) and a seeded year of 365 daily dots appears, with the 60% line; count of extreme days updates.
- Payoff: Small samples swing wider, so the most extreme results come from the smallest groups.
- Claims to check: (a) the two binomial tail probabilities above: compute exactly. (b) the framing follows Tversky & Kahneman (1974), Science 185: 1124-1131: verify the original used 15 and 45 and the 60% threshold. (c) the 50% boy rate is a simplification (real is about 51%): state it.

### 10. twenty-harmless-tests · concept: multiple-comparisons · core · demand 2
- Learner knows: that results can be "significant" at 5% / does not know: the false-positive rate compounds across many tests.
- Misconception: If each test has a 5% false-alarm rate, a batch of 20 tests also has about a 5% chance of a false alarm.
- Prediction: "You test 20 things that truly have no effect, each with a 5% false-alarm rate. Chance that at least one looks significant?" options: about 5% / about 64% / 100% (answer: B). Check: 1 - 0.95^20 = 1 - 0.3585 = 0.6415.
- Interaction: a grid of 20 cards, learner flips them one by one (seeded) and the "significant" ones light up; a reset runs 1,000 batches and shows how many batches had at least one.
- Payoff: Look at enough noise and some of it will look like a finding.
- Claims to check: (a) 1 - 0.95^20 = 64.2%: arithmetic. (b) the expected number of false alarms in 20 tests is 1: 20 x 0.05. (c) assumes independent tests and a true null in all: state it; the simulated batch fraction will be near 64% (verify across the seed).

### 11. which-coin-is-it · concept: bayesian-updating · core · demand 2
- Learner knows: base-rate counting / does not know: updating a probability with repeated evidence.
- Misconception: Three heads in a row is not enough to be convinced; the mystery coin is still 50/50.
- Prediction: "A bag holds one fair coin and one two-headed coin. You pull one at random, flip it three times: three heads. Chance it is the two-headed coin?" options: 50% / 75% / 89% (answer: C). Check: 0.5 x 1 / (0.5 x 1 + 0.5 x 1/8) = 0.5/0.5625 = 8/9 = 88.9%.
- Interaction: learner flips the mystery coin one at a time; a single bar shows the belief in "two-headed" moving after each flip, and a tails flip drops it to exactly 0.
- Payoff: Each outcome multiplies the odds by how much likelier it is under one hypothesis than the other: 8 to 1 after three heads.
- Claims to check: (a) posterior after k heads = 2^k / (2^k + 1): 1 head 67%, 2 heads 80%, 3 heads 89%: arithmetic. (b) one tails proves the coin is fair: deduction. (c) the prior 50% reflects the random pull from two coins.

### 12. one-in-a-million-daily · concept: truly-large-numbers · intro · demand 2
- Learner knows: "1 in a million" means rare / does not know: expected counts scale with the population.
- Misconception: A one-in-a-million event essentially never happens.
- Prediction: "A city of 8 million people. Something has a 1-in-1,000,000 chance per person per day. How often does it happen somewhere in the city?" options: almost never / about 8 times a day / about once a year (answer: B). Check: 8,000,000 x 1/1,000,000 = 8 per day.
- Interaction: a dot field of the city (each dot = 8,000 people) with the learner stepping through days (tap) and watching flashes; population slider from 10,000 to 8,000,000.
- Payoff: Rare for you, routine for a population: expect coincidences somewhere every day.
- Claims to check: (a) 8 expected events per day: arithmetic. (b) P(no event that day) = e^-8 = 0.03%: derivation. (c) days with events are Poisson-distributed with mean 8, shown from seeded draws: verify mean over 365 days is near 8.

### 13. same-average-different-ride · concept: variance-risk · core · demand 2
- Learner knows: average winnings / does not know: spread, risk of ruin over finite plays.
- Misconception: Two games with the same average payoff are equally good (or safe) to play.
- Prediction: "Game X: coin flip, win $10 or lose $8. Game Y: 10% chance to win $55, else lose $5. Both average +$1 per play. After 100 plays, which leaves you behind more often?" options: X / Y / equally often (answer: B). Check: behind in X means 44 or fewer wins in 100, P = 13.6%; behind in Y means 8 or fewer wins in 100 at p = 0.1, P = 32.1%.
- Interaction: learner picks X or Y and runs 100-play trajectories (20 seeded lines at a time) on one chart; a tally shows how many ended below zero.
- Payoff: The mean says where the crowd ends up on average; the spread decides how many individuals get there.
- Claims to check: (a) EV(X) = 0.5 x 10 - 0.5 x 8 = 1; EV(Y) = 0.1 x 55 - 0.9 x 5 = 1: arithmetic. (b) the two binomial probabilities: compute exactly. (c) the average ending wealth is +$100 for both: linearity of expectation.

### 14. plus-fifty-minus-forty · concept: multiplicative-bets · stretch · demand 2
- Learner knows: expected value (assumed) and percentage change / does not know: average vs typical outcome for compounding.
- Misconception: A bet with positive expected return makes you richer over time.
- Prediction: "Each round a fair coin: heads multiplies your money by 1.5, tails by 0.6. The average round gains 5%. After 100 rounds, what happens to a typical player?" options: grows about 5% per round / shrinks / roughly breaks even (answer: B). Check: typical growth factor per round = sqrt(1.5 x 0.6) = sqrt(0.9) = 0.949, so 0.949^100 is about 0.005 (half of rounds heads, half tails: 0.9^50 = 0.0052).
- Interaction: learner presses to run 100 rounds for 50 seeded players on a log-scale line chart; a toggle swaps the faint individual lines for the mean line.
- Payoff: The mean is carried by a few lucky players; the typical player gets multiplied by the geometric, not arithmetic, average.
- Claims to check: (a) arithmetic mean per round (1.5 + 0.6)/2 = 1.05 and 1.05^100 = 131.5: arithmetic. (b) median wealth after 100 rounds about 0.9^50 = 0.0052 of the start: arithmetic. (c) the fraction of 50 players ending above their start is small (breaking even needs 1.5^k x 0.6^(100-k) > 1, i.e. k >= 56 heads; P(Bin(100, 0.5) >= 56) = 13.6%): compute exactly. (d) context: Peters (2019), Nature Physics 15: 1216-1221.

### 15. at-least-one-boy · concept: two-children-problem · core · demand 2
- Learner knows: independent coin-like events / does not know: how information narrows the possible cases.
- Misconception: Knowing one child is a boy leaves the other as 50/50, so both being boys has chance 1/2.
- Prediction: "A family has two children. You learn at least one is a boy. How likely are both boys?" options: 1/2 / 1/3 / 1/4 (answer: B). Check: equally likely families BB, BG, GB, GG; knowing at least one boy removes GG, leaving 3, of which 1 is BB.
- Interaction: four tiles (BB, BG, GB, GG) the learner taps to eliminate per clue; a repeat of 1,000 seeded families filtered by the clue shows the fraction.
- Payoff: The clue removes cases, not a particular child; counting the remaining cases is the answer.
- Claims to check: (a) answer is 1/3 under the rule "we learn only that at least one is a boy" (all four equally likely a priori): enumeration. (b) with "the older child is a boy" the answer is 1/2: enumeration. (c) the answer depends on how the information was obtained; the lesson must state the rule: cite Gardner (1959), Scientific American.

### 16. fake-the-coin-flips · concept: streaks-in-randomness · intro · demand 2 [exploration]
- Learner knows: a coin is 50/50 / does not know: how streaky real randomness is.
- Misconception: A random sequence alternates a lot; long runs mean it is not random.
- Prediction: "In 20 fair coin flips, how likely is a run of 5 or more heads-in-a-row or tails-in-a-row?" options: about 5% / about 25% / about 75% (answer: B). Check: dynamic-programming count over 20 flips gives 0.2499, i.e. 25%.
- Interaction: format change: the learner builds the sequence. They tap H or T 20 times to "fake" random flips (no sliders, no text on stage); then a bar shows how their longest run compares with the longest run in 1,000 seeded real sequences.
- Payoff: Real randomness clumps more than people imagine, which is why invented sequences give themselves away.
- Claims to check: (a) P(run of at least 5 in 20 fair flips) = 0.2499 (compute by recurrence; runs of 4+ is 0.478, of 6+ is 0.122): exact computation. (b) people typically produce too few long runs: cite a source (e.g. Kahneman & Tversky 1972, Cognitive Psychology 3: 430-454) or drop the claim. (c) the learner's longest run is computed from their taps.

### 17. why-seven-wins · concept: dice-sum-distribution · intro · demand 1 [exploration]
- Learner knows: dice show 1-6 / does not know: that sums are not equally likely.
- Misconception: Each total from 2 to 12 is equally likely, since each is a possible result.
- Prediction: "Roll two fair dice. A total of 7 is how many times as likely as a total of 3?" options: equally likely / 3 times / 6 times (answer: B). Check: 7 occurs in 6 of 36 outcomes, 3 in 2 of 36; 6/2 = 3.
- Interaction: format change: the learner builds the model. They drop each of 36 die-pair tiles into totals columns by tapping a total; the histogram shape appears as they fill it; no slider, no stage text beyond numbers.
- Payoff: Totals are not equally likely because some totals can be made in more ways, and the middle has the most ways.
- Claims to check: (a) number of ways: 2 and 12 one way each, 7 six ways: enumeration. (b) P(7) = 1/6 = 16.7%, P(2) = 1/36 = 2.8%: arithmetic. (c) 1,000 seeded rolls match the shape approximately.

### 18. drunk-walk-distance · concept: random-walk · core · demand 1 [exploration]
- Learner knows: coin flips / does not know: that distance from start grows like the square root of steps.
- Misconception: A walker who goes left or right at random stays near where they started, or else drifts proportionally to steps.
- Prediction: "A walker steps one metre left or right on each coin flip. After 100 steps, how far from the start will they typically be?" options: about 2 m / about 10 m / about 50 m (answer: B). Check: spread after n steps is sqrt(n) = 10 m (mean absolute distance 0.8 x 10 = 8 m).
- Interaction: no slider: the learner taps a step counter (10, 100, 1,000) and sees 30 seeded walkers' end positions pile up on a number line; the histogram widens by 10 when steps go up by 100.
- Payoff: Randomness spreads out, but slowly: 100 times the steps give only 10 times the distance.
- Claims to check: (a) SD of position = sqrt(n): derivation. (b) mean |position| about sqrt(2n/pi): 8.0 for n = 100, 25.2 for n = 1,000. (c) walkers returning to the origin at least once is common in 1D: only include with citation (Polya 1921) or omit.

### 19. friends-have-more-friends · concept: friendship-paradox · core · demand 1 [exploration]
- Learner knows: averages / does not know: size-biased sampling.
- Misconception: The average person's friends are about as popular as the average person.
- Prediction: "Five people: one hub is friends with four others, who know only the hub. Pick a random person, then one of their friends at random. On average, how many friends does that friend have?" options: 1.6 / 2.5 / 3.4 (answer: C). Check: the hub (1/5 of picks) leads to a leaf with 1 friend; a leaf (4/5) leads to the hub with 4; 0.2 x 1 + 0.8 x 4 = 3.4, against a population average of 8/5 = 1.6.
- Interaction: the learner builds a network by tapping to add or remove friendships between 8 people, and a readout compares "average friends" with "average friends of friends".
- Payoff: Popular people appear in many friend lists, so a friend you pick is likelier to be a popular one.
- Claims to check: (a) the star-graph arithmetic above. (b) in any network where degrees vary, the mean degree of a random friend is at least the mean degree: Feld (1991), American Journal of Sociology 96(6): 1464-1477. (c) the learner's graphs: the readout is computed, not asserted.

### 20. collect-all-six-faces · concept: coupon-collector · core · demand 1 [exploration]
- Learner knows: a die has six faces / does not know: the last few outcomes take the longest.
- Misconception: Rolling a die six times shows each face about once, so seeing all six takes about 6 rolls.
- Prediction: "How many rolls of a fair die does it take, on average, to have seen every face at least once?" options: about 6 / about 9 / about 15 (answer: C). Check: 6 x (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 6 x 2.45 = 14.7.
- Interaction: the learner taps a die to roll and fills six face slots; a bar shows how many rolls each new face needed (1, 1.2, 1.5, 2, 3, 6 expected); a repeat runs 1,000 seeded collections.
- Payoff: The last missing face needs about 6 rolls by itself; the early faces are cheap, the final ones are not.
- Claims to check: (a) expected rolls for k-th new face is 6/(7-k): 1, 1.2, 1.5, 2, 3, 6; sum 14.7: arithmetic. (b) the seeded average of 1,000 collections is near 14.7. (c) Feller, vol. 1, as the reference for the coupon collector problem.

### 21. average-that-never-settles · concept: heavy-tails · stretch · demand 1 [exploration]
- Learner knows: that averages of many samples settle (from `law-of-large-numbers`) / does not know: that it can fail.
- Misconception: Averaging more data always settles on a stable number.
- Prediction: "A running average of a fair die roll settles near 3.5. A running average of draws from a Cauchy (very heavy-tailed) distribution:" options: settles too / keeps jumping, no matter how many draws / drifts steadily to zero (answer: B). Check: the mean of n Cauchy draws has exactly the same distribution as a single draw, so it never narrows.
- Interaction: no slider and no text: the learner taps "add 1,000 draws" and watches two running-average lines, die and Cauchy, on one chart; occasional huge jumps knock the Cauchy line away.
- Payoff: When rare giant values dominate, adding data does not tame the average.
- Claims to check: (a) the Cauchy sample mean has the same distribution as one draw: Feller, vol. 2, or a derivation by characteristic function. (b) the die's running average converges to 3.5: LLN. (c) the lines are from seeded draws; the claim is about the distribution, so state that one seed is an illustration.

### 22. odds-three-to-one · concept: odds-vs-probability · intro · demand 1 [exploration]
- Learner knows: percentages / does not know: odds notation.
- Misconception: "3 to 1 against" means a 1-in-3 (33%) chance.
- Prediction: "A horse is at odds of 3 to 1 against winning. What chance does that imply?" options: 33% / 25% / 75% (answer: B). Check: 3 to 1 against means 1 win per 3 losses, so 1 in 4 = 25%.
- Interaction: format change: no stage text: the learner drags blocks between a "win" and "lose" tray (4 blocks, then up to 20); the bar shows the share that win, and the odds ratio is the ratio of the two trays.
- Payoff: Odds compare wins to losses; probability compares wins to everything.
- Claims to check: (a) probability = wins / (wins + losses) for odds given as losses-to-wins: definition. (b) odds 1 to 1 = 50%, 4 to 1 against = 20%, 9 to 1 against = 10%: arithmetic. (c) convention: "3 to 1 against" is read as 3:1 against in betting; "3:1 odds" can be ambiguous; the lesson should say which it uses.
