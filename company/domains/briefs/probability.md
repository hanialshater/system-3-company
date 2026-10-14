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

## Round 2 (briefs 23-55) · written 2026-10-12 · map: 56 concepts

Round 2 adds 26 concepts and 33 briefs (target about 55 briefs for the domain). Every prediction answer was recomputed in `artifacts/scratch/cm-probability-r2/check.mjs` (exact arithmetic or an enumeration; seeded simulation only where stated). All briefs are new concepts or a clearly different angle on a mapped one. Each names a key state: the reveal unlocks only after the learner has reached it (earn-the-reveal), so the designer should gate `interact()` on steps toward that state. Exploration briefs (#47-55) change the interaction format, not just the topic. Honest gaps still in the map: `heavy-tails`, `random-walk`, `friendship-paradox`, `coupon-collector`, `variance-risk`, `streaks-in-randomness` have a round-1 brief but no built lesson; `bayesian-updating` and `independence` are covered only informally.

### 23. halved-risk-one-in-thousand · concept: relative-vs-absolute-risk · core · demand 3
- Learner knows: percentages, "50% lower" / does not know: that relative cuts mean little without the starting risk.
- Misconception: "Halves your risk" means half of the people who would be harmed are spared.
- Prediction: "A pill halves the risk of a rare condition, from 2 in 1,000 to 1 in 1,000. Of 1,000 people who take it, how many avoid the condition who would otherwise have had it?" options: 1 / 10 / 500 (answer: A). Check: 1,000 x 0.002 = 2 cases without the pill, 1,000 x 0.001 = 1 with it; 1 case avoided.
- Key state: two grids of 1,000 dots, untreated and treated, with 2 flagged dots against 1; the learner has stepped the baseline risk up from 2 to 200 per 1,000 and seen the same "halved" cut avoid 100.
- Interaction: one grid of 1,000 dots; the learner drags the baseline risk (2, 20, 200 per 1,000) and toggles the pill; flagged dots visibly disappear, and only the count of disappearing dots is shown.
- Payoff: A relative cut is a fraction of the starting risk, so the same "50%" can spare 1 person or 100.
- Claims to check: (a) 2/1000 halved is 1/1000, absolute reduction 0.1 percentage points, 1,000 treated to avoid one case (NNT 1,000): arithmetic. (b) at baseline 200/1000, halving avoids 100: arithmetic. (c) the pill is hypothetical, say so; if a real drug is named, cite its trial.

### 24. how-surprising-is-sixty · concept: p-values · core · demand 3
- Learner knows: a fair coin and sample-size noise / does not know: what a p-value measures and that it is not the chance the coin is fair.
- Misconception: "p = 0.03" means a 3% chance the coin is fair (the result is a fluke).
- Prediction: "A fair coin is flipped 100 times. How often do you see 60 or more heads?" options: about 0.3% / about 3% / about 30% (answer: B). Check: P(X >= 60), X ~ Bin(100, 0.5) = 0.0284.
- Key state: the learner has run at least 200 seeded 100-flip batches and watched a histogram of head counts fill, with the area at 60 or more shaded and the tally of batches landing in it; the reveal waits until some batches have landed there.
- Interaction: tap "run 100 batches" to build a histogram of heads counts from a fair coin; drag a threshold marker; the shaded tail share updates.
- Payoff: A p-value is how often pure luck produces a result at least this extreme, not the chance that luck is the explanation.
- Claims to check: (a) P(X >= 60) = 0.0284 and the two-sided value is 0.0569: exact binomial sum. (b) the definition of p-value (probability of data at least as extreme given the null): cite Wasserstein & Lazar (2016), The American Statistician 70(2): 129-133. (c) the tail share shown comes from seeded batches and will wobble around 2.8%: state the seed output.

### 25. second-positive-test · concept: repeat-testing · core · demand 2
- Learner knows: base-rate counting from `base-rates` (assumed) / does not know: how a second independent result multiplies the odds.
- Misconception: After one positive the chance is already high, so a second positive adds little; or, the reverse, one positive is nearly proof.
- Prediction: "A condition affects 1% of people. The test catches 90% of cases and wrongly flags 9% of healthy people. After one positive it is about 9%. After a second, independent positive, the chance is about:" options: 19% / 50% / 81% (answer: B). Check: 0.01 x 0.9^2 / (0.01 x 0.9^2 + 0.99 x 0.09^2) = 0.0081 / 0.016119 = 0.5025.
- Key state: 1,000 people shown as dots; after the first positive the learner has seen about 98 flagged dots of which 9 are sick; on retesting those 98 only the second-round flags remain, about 8 sick against 8 healthy.
- Interaction: tap "test again" to filter the flagged group of dots; one bar shows the share of flagged dots that are truly sick after each round.
- Payoff: Each independent positive multiplies the odds by the same factor (here 10), so a modest test can become convincing when repeated, and a 9% first result is not a verdict.
- Claims to check: (a) after one positive 0.009 / 0.0981 = 9.2%, after two 50.3%, after three 91%: arithmetic (recompute the third). (b) the independence assumption: errors of repeated tests on the same person can be correlated; state the assumption on screen or in the reveal. (c) numbers are illustrative, not a named disease.

### 26. three-cards-one-red-face · concept: three-cards-paradox · core · demand 2
- Learner knows: probability as a fraction of cases / does not know: that "which card" and "which face" are different counts.
- Misconception: You see red, so the card is red-red or red-blue, so the other side is red half the time.
- Prediction: "A hat holds three cards: red on both sides, blue on both sides, and red on one side and blue on the other. You draw one at random and see a red face. How likely is the hidden side red?" options: 1/2 / 2/3 / 1/3 (answer: B). Check: six equally likely faces; three are red; two of those belong to the red-red card, so 2/3.
- Key state: the learner has tapped each of the six faces to see which are red, and sees that two of the three red faces have red on the back.
- Interaction: six faces laid out as three cards; the learner taps to reveal which faces are red and then to flip each red face over; a tally of red-backs against blue-backs follows from 60 seeded draws.
- Payoff: Counting faces, not cards, is what the information removes: the red-red card owns two of the three red faces.
- Claims to check: (a) 2/3 by enumeration of six faces: exact. (b) 60 seeded draws will show a red back about two thirds of the time, with noise: state the seed output. (c) attribution to Bertrand's box paradox (1889): cite Bertrand, Calcul des probabilites, or omit.

### 27. four-rolls-one-six · concept: at-least-once · intro · demand 2
- Learner knows: one roll has a 1/6 chance of a six / does not know: how chances combine over repeated tries.
- Misconception: Four rolls, each 1/6, so the chance of at least one six is 4/6.
- Prediction: "Roll a die four times. How likely is at least one six?" options: about 67% / about 52% / about 33% (answer: B). Check: 1 - (5/6)^4 = 1 - 0.4823 = 0.5177.
- Key state: the learner has watched the "no six yet" share shrink by a factor of 5/6 at each of four rolls, ending near 48%, and seen that adding 1/6 four times would overshoot to 67%.
- Interaction: a bar of 1,000 seeded players; the learner taps "roll" and players who rolled a six leave the "still no six" group; the remaining share is the only number shown.
- Payoff: Count the ways to fail every time and subtract; tries do not add their chances.
- Claims to check: (a) 1 - (5/6)^4 = 0.5177: arithmetic. (b) 24 rolls of two dice for a double six give 1 - (35/36)^24 = 0.4914, the de Mere puzzle: arithmetic; cite only if included. (c) seeded players' remaining share after 4 rolls is near 48%.

### 28. told-the-sum-is-eight · concept: conditional-probability · core · demand 2
- Learner knows: 36 equally likely outcomes of two dice / does not know: that new information shrinks the list of cases and that the answer is a ratio within the shrunken list.
- Misconception: Information about the sum does not change how likely a six on one die is, because each die is a 1/6 event.
- Prediction: "You roll two dice and are told only that the total is 8. How likely is it that one of the dice shows a six?" options: about 31% / 40% / 50% (answer: B). Check: totals of 8 are (2,6), (3,5), (4,4), (5,3), (6,2): 5 cases, 2 contain a six, 2/5; without the clue it is 11/36 = 30.6%.
- Key state: on a 6x6 grid of outcomes the learner has tapped "total is 8" and the grid greys down to 5 cells; two of them are highlighted as containing a six.
- Interaction: the learner taps a clue chip (sum is 8, sum is 7, sum at least 10) and the grid greys out impossible cells; the share of remaining cells with a six is the only number.
- Payoff: A clue is a smaller sample space; the chance is the fraction of what is left.
- Claims to check: (a) 2/5 = 40% and 11/36 = 30.6%: enumeration. (b) with "sum is 7" the chance is 2/6 = 33.3%; with "sum at least 10" (cells (4,6), (5,5), (5,6), (6,4), (6,5), (6,6)) it is 5/6: enumeration, recompute before use.

### 29. sum-seven-ignores-first-die · concept: independence · intro · demand 2
- Learner knows: two dice / does not know: how to test whether two events affect each other.
- Misconception: If two events involve the same dice they must influence each other, so seeing the first die changes the chance of a sum of 7 (or, the reverse, learning something never matters).
- Prediction: "You roll two dice. You see the first die is a 3. How does that change the chance that the total is 7?" options: raises it / does not change it / lowers it (answer: B). Check: P(sum 7) = 6/36 = 1/6; given first die 3, only second die 4 gives 7, so 1/6. For sum 8, P = 5/36 but given first die 3 it becomes 1/6.
- Key state: the learner has tried the clue "first die is a 3" on both "sum 7" and "sum 8": the first stays at 1/6, the second moves from 5/36 to 1/6.
- Interaction: a 6x6 grid; the learner picks a target total (7 or 8) and a first-die clue and sees the chance before and after as highlighted cells; no text other than the two fractions.
- Payoff: Events are independent when the clue leaves the fraction unchanged, and 7 is the one total that no first die can nudge.
- Claims to check: (a) P(7) = P(7 | first = k) = 1/6 for every k = 1..6: enumeration. (b) P(8) = 5/36 = 13.9%, P(8 | first = 3) = 1/6 = 16.7%, P(8 | first = 1) = 0: enumeration. (c) definition: A and B independent if P(A and B) = P(A) x P(B): 1/36 = 1/6 x 1/6 holds for sum 7 and first die 3.

### 30. halve-the-margin-cost · concept: poll-margin-of-error · core · demand 2
- Learner knows: that polls have a plus-or-minus / does not know: how the margin scales with sample size.
- Misconception: Doubling the sample halves the margin of error.
- Prediction: "A poll of 1,000 people has a margin of error of about 3.1 points. How many people must be polled to cut it to about 1.5 points?" options: 2,000 / 4,000 / 8,000 (answer: B). Check: margin = 1.96 x sqrt(0.25/n); n = 1,000 gives 3.10, n = 2,000 gives 2.19, n = 4,000 gives 1.55.
- Key state: the learner has set the sample to 2,000 and seen the margin only fall to 2.2, then moved on to 4,000 and seen 1.5.
- Interaction: a slider for sample size 250 to 8,000; a dot cloud of 100 seeded poll results around 50% narrows as it moves; the margin readout is a single number.
- Payoff: Precision costs the square: four times the people for half the error.
- Claims to check: (a) margin = 1.96 x sqrt(p(1-p)/n) at p = 0.5: formula, 3.10, 2.19, 1.55: arithmetic. (b) the 95% reading applies to random samples only and ignores non-response and bias; the lesson must say so. (c) the dot cloud's spread (95% inside the margin) comes from a seeded simulation.

### 31. ninety-five-percent-of-what · concept: confidence-intervals · core · demand 2
- Learner knows: a poll margin of error (assumed) / does not know: that "95%" describes the method over many polls, not one interval.
- Misconception: A 95% interval has a 95% chance of containing the truth after it is drawn, so any interval you see is right 95% of the time and the other 5% never appear.
- Prediction: "The true support is exactly 50%. 100 pollsters each ask 1,000 random people and report 95% intervals. About how many intervals miss 50%?" options: 0 / about 5 / about 25 (answer: B). Check: exact binomial gives a miss chance of 5.4% per poll, so about 5 of 100.
- Key state: the learner has drawn one batch of 100 intervals as horizontal bars with a vertical line at 50% and seen several bars that do not cross it.
- Interaction: tap "poll again" to draw 100 seeded intervals stacked on one chart; bars that miss the line turn red; a second tap keeps the running miss tally.
- Payoff: The 95% belongs to the procedure: in the long run about 1 in 20 intervals misses, and you cannot tell which from the bar alone.
- Claims to check: (a) the miss probability for n = 1,000, p = 0.5 with the normal interval is 0.0537: exact binomial sum. (b) the lesson must state the true value is known only because it is a simulation. (c) over several seeds the per-batch miss count varies around 5.

### 32. city-poll-nation-poll · concept: sample-vs-population · core · demand 2
- Learner knows: sample size drives margin (assumed from #30) / does not know: that the share of the population sampled barely matters.
- Misconception: Polling 1,000 people in a city of 100,000 is much less reliable than polling 1,000 people in a country of 300 million, or the reverse (a bigger share sampled is better).
- Prediction: "Poll 1,000 random people: one poll in a city of 100,000, one in a nation of 300 million. Which has the larger margin of error?" options: the city / the nation / about the same (answer: C). Check: finite-population factor sqrt((N-n)/(N-1)) = sqrt(99,000/99,999) = 0.995 for the city and 1.000 for the nation: margins 3.08 and 3.10 points.
- Key state: the learner has pulled the population slider down from 300 million to 100,000 and seen the margin hardly move, then to 2,000 where it finally shrinks (factor 0.71).
- Interaction: a slider for population size on a log scale with fixed n = 1,000; a single readout of the margin.
- Payoff: A sample works by its own size, not by what share of the population it is, until the sample becomes most of the population.
- Claims to check: (a) the finite-population correction factor values above: arithmetic. (b) margin 3.10 x 0.995 = 3.08: arithmetic. (c) assumes simple random sampling, which real polls only approximate: say so.

### 33. cards-do-remember · concept: drawing-without-replacement · core · demand 2
- Learner knows: independence from `gamblers-fallacy` (round 1) / does not know: that drawing without putting back breaks independence.
- Misconception: Each card draw is a fresh coin flip, so after ten reds the next card is still 50% red.
- Prediction: "A deck has 26 red and 26 black cards. The first 10 cards dealt are all red. How likely is the next card red?" options: 50% / about 38% / about 62% (answer: B). Check: 16 reds remain among 42 cards: 16/42 = 38.1%.
- Key state: the learner has dealt ten reds by tapping and seen the remaining deck bar shift to 16 red against 26 black.
- Interaction: tap the deck to deal a card (forced red for the first 10, then free); a two-colour bar shows what is left in the deck, and a "put it back" toggle restores independence.
- Payoff: A dealt deck has memory because the cards are used up; the fallacy is wrong for coins and right for cards.
- Claims to check: (a) 16/42 = 38.1%: arithmetic. (b) with replacement the chance stays 50%: independence. (c) forced-red deals are a conditional setup, not a claim about how often ten reds occur (that is C(26,10)/C(52,10) = about 0.0014, recompute before including).

### 34. jackpot-once-a-week · concept: lottery-odds · intro · demand 2
- Learner knows: "1 in a million" is small / does not know: how big 1 in 292 million is in human time.
- Misconception: Lotteries are unlikely but a lifetime of tickets gives a real chance.
- Prediction: "A jackpot has odds of 1 in 292 million per ticket. If you bought one ticket every week, about how long until you'd expect to win once?" options: about 5,600 years / about 56,000 years / about 5.6 million years (answer: C). Check: 292,201,338 / 52.18 weeks = 5.6 million years.
- Key state: the learner has run weekly draws on a fast-forwarding timeline up to 80 years and seen a single-digit number of tickets lost out of 4,000, with no win; the reveal waits until the run passes 80 years.
- Interaction: a "buy a ticket a week" button that advances 1, 10, 100 years on a timeline; a counter of tickets bought against a long scale to the expected wait.
- Payoff: Odds that small are beyond lived time: a lifetime of weekly tickets covers about 0.001% of what it would take.
- Claims to check: (a) 292,201,338 = C(69,5) x 26, the Powerball odds since 2015: arithmetic, verify against the operator's published odds. (b) 80 years x 52.18 = 4,174 tickets; chance of a win in that time about 0.0014%: arithmetic. (c) the expected wait is a mean; the median wait is about 0.69 of it: say "about" only.

### 35. double-after-every-loss · concept: betting-systems · intro · demand 2
- Learner knows: expected value (assumed) / does not know: why staking rules cannot change the average of a fair game.
- Misconception: Doubling your bet after every loss guarantees a win, so it beats a fair game.
- Prediction: "Fair coin, even money. Start with a $1 bet and double after each loss, stop at the first win or when the next bet would exceed $63 of total losses. Your average profit per round is:" options: about +$0.98 / exactly $0 / about -$0.98 (answer: B). Check: win $1 with probability 63/64, lose $63 with probability 1/64: 63/64 x 1 - 1/64 x 63 = 0.
- Key state: the learner has run enough seeded rounds to see many $1 wins and, once, a $63 loss that wipes out the string of wins.
- Interaction: tap "play a round" or "play 20 rounds"; a single line chart of cumulative profit climbs in $1 steps and drops in one long fall.
- Payoff: The system turns many small wins into rare big losses, leaving the average where it started.
- Claims to check: (a) 63/64 = 98.4% win probability per round, expected profit exactly 0: arithmetic. (b) the line chart is a seeded simulation, so a cumulative gain or loss after 20 rounds is just one run: state it. (c) the lesson must not claim real casinos cap bets unless sourced.

### 36. bet-too-much-and-go-broke · concept: multiplicative-bets · stretch · demand 2
- Learner knows: `plus-fifty-minus-forty` idea of geometric growth (assumed) / does not know: that there is an optimal stake, and betting more can lose.
- Misconception: With a favourable bet, betting more of your money always grows it faster.
- Prediction: "A coin lands heads 60% of the time and pays even money. Each round you stake a fixed fraction of your money. Which fraction grows your money fastest over 100 rounds?" options: 5% / 20% / 60% (answer: B). Check: growth per round g(f) = 0.6 ln(1+f) + 0.4 ln(1-f): f = 0.05 gives 0.0088, f = 0.2 gives 0.0201, f = 0.6 gives -0.0845.
- Key state: the learner has dragged the stake from 5% up through 20% to 60%, watching 30 seeded money lines fan up then collapse; the reveal waits until the stake passes 40%.
- Interaction: one slider (stake fraction 0-100%) and 30 seeded money lines on a log chart over 100 rounds; no other control.
- Payoff: Betting more than the sweet spot lowers growth even when every bet is favourable; at 60% the typical player ends near zero.
- Claims to check: (a) optimal fraction f* = 2p - 1 = 0.2 (Kelly): derivation, cite Kelly (1956), Bell System Technical Journal 35: 917-926. (b) typical wealth after 100 rounds is e^(100 g): 7.5x at 20%, 2.4x at 5%, 0.0002x at 60%: arithmetic. (c) lines are one seeded sample: state it.

### 37. best-of-twenty-identical · concept: winners-curse · core · demand 2
- Learner knows: regression to the mean from #6 (assumed) / does not know: that picking the best of many noisy options inflates its score.
- Misconception: The top performer among many looks best because it is best, so the same score should repeat.
- Prediction: "20 identical fair coins are each flipped 20 times. The coin with the most heads is picked. About how many heads did it get, on average?" options: 10 / 12 / 14 (answer: C). Check: expected maximum of 20 Bin(20, 0.5) draws = 14.1.
- Key state: the learner has run the 20 coins and seen the winner at 13-15 heads, then re-flipped just that coin and seen it fall back to near 10.
- Interaction: tap "flip all" (20 bars of heads counts, winner highlighted), then tap "flip the winner again"; seeded.
- Payoff: The top score of a noisy group is partly luck, so the winner's next result falls back toward the truth.
- Claims to check: (a) E[max of 20 Bin(20, 0.5)] = 14.12: exact distribution calculation. (b) the winner's expected re-flip count is 10: independence. (c) no real-world claim (such as about published estimates) unless cited.

### 38. bus-wait-longer-than-half · concept: waiting-time-paradox · core · demand 2
- Learner knows: averages / does not know: that random arrivals produce long gaps that you are likelier to land in.
- Misconception: If buses come on average every 10 minutes, a random arrival waits 5 minutes on average.
- Prediction: "Buses arrive at random, 10 minutes apart on average. You turn up at a random moment. About how long do you wait on average?" options: 5 minutes / 10 minutes / 20 minutes (answer: B). Check: for random (Poisson) arrivals the wait is again exponential with mean 10; a 1,000,000-minute simulation gives 10.03.
- Key state: the learner has dropped 30 arrival times on a timeline and seen that gaps vary widely, then tapped to drop "you" markers and seen most land inside long gaps.
- Interaction: one timeline of 8 hours of seeded random bus arrivals; the learner taps to drop random arrival markers and a bar tallies their waits.
- Payoff: Long gaps cover more of the clock, so a random arrival is likelier to land in one.
- Claims to check: (a) mean wait for a Poisson process with mean gap 10 is 10: E[gap^2] / (2 E[gap]) = 200 / 20. (b) if buses were perfectly regular every 10 minutes the mean wait would be 5: arithmetic. (c) real bus services lie between the two: say "if buses were random".

### 39. average-wait-six-rolls · concept: geometric-waiting · intro · demand 2
- Learner knows: expected value (assumed) / does not know: that mean and typical wait differ for first success.
- Misconception: If the average wait for a six is 6 rolls, you are as likely to wait more than 6 rolls as fewer.
- Prediction: "Rolling a die until the first six takes 6 rolls on average. What is the chance it takes more than 6 rolls?" options: about 10% / about 33% / about 50% (answer: B). Check: (5/6)^6 = 0.335; half of players finish within 4 rolls (P within 3 is 42%, within 4 is 52%).
- Key state: the learner has run 1,000 seeded players and seen a histogram with a tall left side and a long right tail, and the 6-roll marker sitting to the right of the middle.
- Interaction: tap to run 1,000 players; a histogram of rolls needed; a draggable marker shows the share beyond its position.
- Payoff: A few unlucky long waits pull the mean above what a typical player sees.
- Claims to check: (a) mean 6 = 1/p: formula. (b) (5/6)^6 = 0.3349, median 4: arithmetic. (c) histogram shares from a seeded run near these values.

### 40. longer-series-fewer-upsets · concept: series-length-upsets · intro · demand 1
- Learner knows: win probabilities per game / does not know: that more games filter out luck.
- Misconception: A weaker team that wins 40% of games has the same underdog chance in any series.
- Prediction: "An underdog wins each game 40% of the time, independently. Chance it wins a best-of-seven series?" options: 40% / about 29% / about 10% (answer: B). Check: P(at least 4 wins in 7 games, p = 0.4) = 0.2898. (Best-of-1: 40%; best-of-21: 17.4%; best-of-101: 2.1%.)
- Key state: the learner has stepped series length 1, 3, 7, 21, 101 and watched 1,000 seeded series: the underdog's wins fall from 400 to about 20.
- Interaction: a stepper over series length (odd numbers) with a bar of 1,000 seeded series; the underdog share is a single number.
- Payoff: Each extra game gives the better team more chances to show itself, so luck washes out.
- Claims to check: (a) best-of-n win probabilities with p = 0.4: 0.4, 0.352, 0.2898, 0.1744, 0.0209: exact binomial. (b) assumes independent games with constant p: state it; real sports violate this.

### 41. averages-turn-bell-shaped · concept: central-limit · stretch · demand 1
- Learner knows: that averages of many samples settle (assumed) / does not know: that their shape becomes a bell, whatever the shape of one draw.
- Misconception: An average of many rolls of a lopsided die is lopsided too.
- Prediction: "A die has five faces showing 1 and one face showing 6, so single rolls are very lopsided. Take the average of 30 rolls, 20,000 times. The histogram of those averages looks:" options: lopsided like one roll / bell-shaped around 1.83 / flat (answer: B). Check: mean 11/6 = 1.83, standard error 1.86/sqrt(30) = 0.34; 97.6% of 20,000 seeded averages fall within 2 standard errors; skewness drops from 1.79 to about 0.33.
- Key state: the learner has stepped the group size from 1 to 5 to 30 and seen the histogram change from two spikes to a bell.
- Interaction: a stepper for group size (1, 2, 5, 10, 30) over 2,000 seeded averages; one histogram.
- Payoff: Averaging smooths any shape toward a bell, which is why bell curves are everywhere.
- Claims to check: (a) mean 11/6 and single-roll SD 1.863: arithmetic. (b) the within-2-SE share is near 95-98% and the skewness estimates: check the seeded output. (c) the central limit theorem in general: cite Feller vol. 2 or a textbook; do not state conditions beyond finite variance.

### 42. sliding-the-cutoff · concept: sensitivity-specificity · core · demand 2
- Learner knows: false positives matter from `base-rates` (assumed) / does not know: that cutoffs trade false alarms for misses.
- Misconception: A better test can have both no false alarms and no missed cases just by choosing a stricter cutoff.
- Prediction: "Test scores: healthy people average 0, sick people average 2, both with spread 1. With the cutoff at 1, 15.9% of sick people are missed. If you raise the cutoff to 1.5, the share of sick people missed becomes:" options: about 7% / about 16% / about 31% (answer: C). Check: P(sick score < 1.5) = Phi(-0.5) = 0.3085; false alarms fall from 15.9% to 6.7%.
- Key state: two overlapping bell curves with a draggable cutoff; the learner has moved it right and watched the healthy tail shrink while the sick tail grows past the line.
- Interaction: one slider (cutoff) on a stage that shows both curves and two numbers (missed, false alarms).
- Payoff: Where you set the line decides which mistake you make more of; only a better test shrinks both.
- Claims to check: (a) Phi(-1) = 0.1587, Phi(-0.5) = 0.3085, 1 - Phi(1.5) = 0.0668: normal tables. (b) the normal-score model is a toy; no clinical claim. (c) recheck the numbers after any change to means or spreads.

### 43. real-effect-missed · concept: statistical-power · stretch · demand 1
- Learner knows: `p-values` (#24) / does not know: false negatives and power.
- Misconception: If a real effect exists, a standard 5% test will find it.
- Prediction: "A coin is secretly 60% heads. You flip it 50 times and declare it biased only if heads reaches 32 or more (the 5% bar for a fair coin). How often do you catch the bias?" options: about 90% / about 60% / about 34% (answer: C). Check: P(X >= 32), X ~ Bin(50, 0.6) = 0.336; the fair-coin false alarm rate at the bar is 3.2%.
- Key state: the learner has run 100 seeded 50-flip experiments on the biased coin and seen roughly two out of three fall short of the bar.
- Interaction: tap "run an experiment", flips counted into one head-count column; a slider changes the number of flips from 50 to 200 and the catch rate rises.
- Payoff: Underpowered tests miss real effects most of the time; "no significant result" is not "no effect".
- Claims to check: (a) the bar: smallest c with P(Bin(50, 0.5) >= c) <= 0.05 is 32: exact. (b) power 0.336: exact. (c) with 200 flips and the same rule the power is much higher: compute before including.

### 44. a-birthday-like-mine · concept: specific-vs-any-match · intro · demand 2
- Learner knows: the birthday paradox, 23 people (existing lesson) / does not know: that matching a specific date is a different, slower problem.
- Misconception: If 23 people give 50% for some pair to match, 23 people also give about 50% that someone shares my birthday.
- Prediction: "How many other people do you need before it is even odds that someone shares your birthday?" options: 23 / 183 / 253 (answer: C). Check: 1 - (364/365)^253 = 0.5005; 252 gives 0.4991; 183 gives only 39%; 23 gives 6.1%.
- Key state: the learner has dragged a crowd-size slider from 23 to 253 and seen the "someone matches me" bar creep up while a "some pair matches" bar leaps ahead at 23.
- Interaction: one slider (crowd size) and two bars, "someone matches me" and "any two match"; birthdays as dots on a 365-slot ring.
- Payoff: The paradox is about the many pairs among 23 people; matching you means only n comparisons, not n(n-1)/2.
- Claims to check: (a) the four probabilities above: arithmetic. (b) 253 is the smallest n with probability >= 50%: recompute. (c) ignores leap days and uneven birth rates: state it.

### 45. random-dots-cluster · concept: clustering-illusion · intro · demand 2
- Learner knows: random means evenly spread, in their head / does not know: how often random scatter makes lumps.
- Misconception: If dots land at random, no spot gets more than a couple; a cluster means something is attracting them.
- Prediction: "40 dots land at random on a 10 x 10 grid of cells. How likely is it that some cell holds three or more?" options: about 15% / about 55% / about 95% (answer: B). Check: exact count of placements with every cell holding at most two dots gives P(some cell >= 3) = 0.555 (25 dots: 0.182; 30 dots: 0.293).
- Key state: the learner has dropped three batches of 40 dots and seen heavy cells in about half of them while the rest are evenly spread.
- Interaction: tap "drop 40 dots" and the grid fills with seeded dots; cells with three or more are ringed; a tally counts ringed batches.
- Payoff: Lumpiness is what random looks like; evenly spread would be the suspicious pattern.
- Claims to check: (a) 0.555 exactly by counting: the script uses BigInt. (b) tallies of ringed batches over seeds should be near 55%. (c) any cancer-cluster claim must be omitted or cited.

### 46. fair-game-still-ruins · concept: gamblers-ruin · core · demand 1
- Learner knows: fair games have zero average gain / does not know: that a limited bankroll turns a fair game into likely ruin.
- Misconception: In a fair game the chance of ending richer equals the chance of ending poorer, whatever the stakes.
- Prediction: "Fair coin, $1 bets. You hold $10, the house $100. You play until one side has all $110. Your chance of taking it all?" options: 50% / about 9% / about 1% (answer: B). Check: ruin probability for a fair game: you win with probability your stake / total = 10/110 = 9.1%.
- Key state: the learner has run 30 seeded games and watched most walks hit zero, with a few that wandered far up.
- Interaction: set starting bankroll (5, 10, 50) and run 30 walks at once on one chart; the count that reached $110 is a single number.
- Payoff: The average gain is zero but the shape is lopsided: many small ruinous paths and a few big wins.
- Claims to check: (a) fair-game win chance = a/(a+b): derivation (Feller, vol. 1). (b) the seeded tally of 30 games is near 3 wins, with large noise: state it. (c) says nothing about casinos' real odds.

### 47. capped-doubling-game · concept: expected-value · intro · demand 2 [exploration]
- Learner knows: expected value as an average payout / does not know: that an average can be built from rare big payouts.
- Misconception: A game with typical payouts of a few dollars cannot have a high fair price.
- Prediction: "Flip a fair coin until it lands tails, at most 20 flips. If the first tails is on flip k you win $2^k; if no tails, you win nothing. What is the fair entry price?" options: about $2 / about $10 / $20 (answer: C). Check: each k = 1..20 contributes 2^k x (1/2)^k = $1, total $20; 75% of plays pay $4 or less.
- Key state: the learner has played the game 200 seeded times and watched the running average wobble around $5-$30 while the median payout stays at $2-$4.
- Interaction: format change: no slider; one button "play 50 games" and one chart of the running average of payouts; the learner chooses a price first (a three-position dial) and watches profit or loss.
- Payoff: The fair price is the long-run average, which here sits mostly in rare big wins; the typical player never sees it.
- Claims to check: (a) EV = $20 exactly: arithmetic. (b) P(payout <= $4) = 3/4: arithmetic. (c) seeded running averages are one illustration; sim mean over 100,000 plays about $20.4.

### 48. heads-after-heads-trap · concept: hot-hand · stretch · demand 2 [exploration]
- Learner knows: independence of flips from `gamblers-fallacy` / does not know: a selection bias in how streaks are counted.
- Misconception: In a fair coin sequence, the average share of heads right after a heads is 50%, so any lower share is evidence the coin is "cold" after heads.
- Prediction: "Flip a fair coin 4 times. For each sequence, find the share of heads among the flips right after a heads. Average that share over all sequences that have at least one such flip. The answer is:" options: 50% / about 40% / about 60% (answer: B). Check: enumerating 14 qualifying sequences gives 17/42 = 40.5%.
- Key state: the learner has read through the 14 sequences one by one, each with its share, and seen the shares average below 50% while the pooled count of heads after heads over all sequences is exactly half.
- Interaction: format change: the learner steps through the 16 four-flip sequences as a list of tiles, tapping each to reveal its heads-after-heads share; a running average updates; no simulation, no slider.
- Payoff: Averaging within short sequences biases the share down even though every single flip is a fair 50%, which hid the hot hand in basketball data for 30 years.
- Claims to check: (a) 17/42 = 0.4048 and the pooled count (heads after heads over all 16 sequences) is 50%: enumeration. (b) Miller & Sanjurjo (2018), Econometrica 86(6): 2019-2047: verify the claim about the earlier hot-hand studies. (c) do not claim the hot hand exists or not; the lesson is about the counting method.

### 49. selected-and-now-opposed · concept: berksons-paradox · stretch · demand 2 [exploration]
- Learner knows: confounding from #5 / does not know: that selecting on a sum creates a negative link between independent traits.
- Misconception: If two traits are unrelated in the population they are unrelated in any group.
- Prediction: "Talent and looks are independent. A show admits only people whose talent plus looks is high (the top 14%). Among the admitted, how are the two traits related?" options: positively / not related / negatively (answer: C). Check: seeded sample of 20,000 admitted gives a correlation of -0.68; selection on a sum induces negative correlation.
- Key state: the learner has swept the selection threshold from "all" to "top 14%" and watched the scatter cloud (full population in the background) trim to a diagonal slab with a downward slope.
- Interaction: format change: one threshold slider only; the stage is the full 2D scatter with admitted dots in colour and the rest grey; no text, no readout except the correlation.
- Payoff: When you admit people for being good at either thing, those who got in without one must have more of the other.
- Claims to check: (a) the traits are generated as independent standard normals, selected when talent + looks > 1.5 (14.4% of people): show the generating code. (b) the displayed correlation is computed from the dots. (c) Berkson (1946), Biometrics Bulletin 2(3): 47-53 for the paradox in hospital data; real-world claims (such as about celebrities) only as examples of the model.

### 50. stop-when-it-looks-significant · concept: peeking-at-results · core · demand 2 [exploration]
- Learner knows: `p-values` (#24) and multiple-comparisons (round 1) / does not know: that checking repeatedly inflates false alarms.
- Misconception: If the test is run at the 5% level, stopping early when it first looks significant is still at the 5% level.
- Prediction: "A fair coin is flipped, and after every flip from the 10th to the 100th you test whether it looks biased (5% level) and stop the first time it does. How often do you wrongly declare it biased?" options: about 5% / about 29% / about 60% (answer: B). Check: exact dynamic programme over the 100-flip walk with |heads - tails| / sqrt(n) > 1.96 gives 0.285.
- Key state: the learner has run 100 seeded fair-coin experiments, each as a z-score line with a 1.96 band, and counted the lines that left the band at any time (about 29) against the end-only count (about 6).
- Interaction: format change: the stage is a band chart of 20 z-score lines at a time; the learner toggles "look only at the end" vs "look every flip" and the count of crossing lines is the only readout.
- Payoff: The more often you look, the more chances noise has to cross the line.
- Claims to check: (a) 0.285 for checks at n = 10..100 and 0.057 for one look at 100: exact DP / binomial. (b) the 1.96 rule is the normal approximation: state it. (c) optional-stopping literature: cite Armitage, McPherson & Rowe (1969), J. Royal Statistical Society A 132: 235-244, or omit.

### 51. two-random-walks-agree · concept: spurious-trends · stretch · demand 2 [exploration]
- Learner knows: correlation as moving together / does not know: that trending random series correlate by chance.
- Misconception: Two unrelated lines that track each other must share a cause.
- Prediction: "Two completely independent random walks (100 coin-flip steps each) are plotted. How often do they have a correlation stronger than 0.5 in either direction?" options: about 5% / about 40% / about 80% (answer: B). Check: 100,000 seeded pairs give |r| > 0.5 in 39.7%.
- Key state: the learner has generated 10 seeded pairs and seen several lines that look as if they are moving together, with the correlation on each pair.
- Interaction: format change: the learner taps "new pair" repeatedly and sees two lines plus the correlation; a "keep the best" button collects the most matching pair seen so far (no slider).
- Payoff: Random walks wander in slow trends, so any two of them are likely to line up by accident.
- Claims to check: (a) 39.7% over 100,000 seeded pairs of n = 100: simulation (state seed). (b) the phenomenon is known as spurious regression: cite Yule (1926), J. Royal Statistical Society 89: 1-63, or Granger & Newbold (1974), J. Econometrics 2: 111-120. (c) no named real-world spurious correlation without a source.

### 52. same-line-four-pictures · concept: anscombes-quartet · core · demand 2 [exploration]
- Learner knows: mean and correlation / does not know: that summary numbers can hide the shape.
- Misconception: Two datasets with the same mean, spread and correlation look alike.
- Prediction: "Four datasets (11 points each) share the same means, spreads and correlation (0.82). One is a clean cloud, one is a curve, one has an outlier, one hangs on a single extreme point. The best-fit line for the curved one is:" options: much flatter than the others / the same as the others / steeper (answer: B). Check: all four give y = 3.00 + 0.50x with r = 0.816.
- Key state: the learner has flipped through all four plots with the identical line drawn on each, one at a time.
- Interaction: format change: tabbed single plot (I to IV), no sliders; a toggle shows or hides the fitted line; the numbers (mean, correlation) stay fixed on screen.
- Payoff: Always draw the data: the same line and correlation can summarise very different pictures.
- Claims to check: (a) data from Anscombe (1973), American Statistician 27(1): 17-21: recompute slope 0.500, intercept 3.00, r 0.816 from the published values. (b) the description of each set (curve, outlier, leverage point) is a reading of the plot: state it as such.

### 53. dice-that-chase-each-other · concept: nontransitive-dice · core · demand 1 [exploration]
- Learner knows: higher numbers beat lower ones / does not know: that "beats more often than not" need not chain.
- Misconception: If A usually beats B and B usually beats C, then A beats C.
- Prediction: "Four dice. A beats B two times in three. B beats C two times in three. C beats D two times in three. How often does D beat A?" options: under half / half / two in three (answer: C). Check: with faces A = {4,4,4,4,0,0}, B = {3,3,3,3,3,3}, C = {6,6,2,2,2,2}, D = {5,5,5,1,1,1}, each die beats the next with probability 24/36 = 2/3 including D beats A.
- Key state: the learner has played three seeded 100-round matches in the chain (A-B, B-C, C-D) and then the closing match D-A.
- Interaction: format change: the learner picks two dice and rolls a 100-round match; a single tally bar; the 6x6 outcome grid is not shown until after the reveal.
- Payoff: Winning is a relationship between a pair, not a number a die carries.
- Claims to check: (a) the four win probabilities are each 2/3: enumeration of 36 face pairs. (b) the dice are Efron's dice: cite Gardner (1970), Scientific American 223(5): 110-114. (c) the averages of the dice are not ordered, 2.67, 3, 3.33, 3: arithmetic, but these means do not predict who beats whom.

### 54. everyone-gets-hats-back · concept: hat-check · core · demand 1 [exploration]
- Learner knows: at-least-once chances / does not know: that the answer barely depends on the number of people.
- Misconception: With more people it is less likely that anyone gets their own hat back.
- Prediction: "10 people check hats; the hats are returned in random order. How likely is it that at least one person gets their own hat?" options: about 10% / about 63% / about 90% (answer: B). Check: exact count of non-matching permutations: 1 - D10/10! = 0.63212; for 1,000 people it is 0.63212 too, the limit 1 - 1/e = 0.63212.
- Key state: the learner has run the shuffle for crowd sizes 3, 10, 100 and 1,000 and seen the "someone matches" share barely change (66.7%, 63.2%, 63.2%, 63.2%).
- Interaction: format change: the learner picks a crowd size from a four-position dial and taps "shuffle 1,000 times"; one bar of the matched share, no explanation on stage.
- Payoff: More people means more chances of a match but a smaller chance each; the two cancel.
- Claims to check: (a) probabilities 0.6667, 0.6321, 0.6321, 0.6321: recurrence of derangements, checked in the script. (b) limit 1 - 1/e = 0.6321: derivation. (c) seeded shuffles scatter near these values (noise about +/- 1.5 points).

### 55. reject-the-first-three · concept: optimal-stopping · stretch · demand 1 [exploration]
- Learner knows: that choosing involves risk / does not know: that there is a best "look then leap" rule.
- Misconception: Choosing the best of ten candidates one at a time with no going back is hopeless, about a 10% chance, or any early pick is as good as another.
- Prediction: "Ten candidates arrive in random order and you see each once, ranked only against those seen so far. You reject the first three, then pick the first one better than all before. Chance you get the very best?" options: about 10% / about 40% / about 70% (answer: B). Check: all 10! orders enumerated: 0.3987; rejecting 0 gives 0.10, 1 gives 0.283, 2 gives 0.366, 4 gives 0.398, 5 gives 0.373.
- Key state: the learner has played 20 seeded rounds with the rule "reject k, then take the first better" at k = 3 and counted how often the winner was the overall best.
- Interaction: format change: the learner reveals candidate numbers one by one (tapping "next"), and at each stage decides "take" or "keep looking"; a 20-round tally shows their hit rate against the rule's.
- Payoff: Looking at the first few without choosing gives a yardstick, and about 37% of the way through is the best moment to start choosing.
- Claims to check: (a) the table of success rates for k = 0..5 at n = 10: exact enumeration. (b) the limit rule n/e (about 37%) for large n gives about 37% success: Ferguson (1989), Statistical Science 4(3): 282-289; verify before stating. (c) assumes candidates can be ranked, arrive in random order, and refusals are final: state it.

## Round 4 (briefs 56-70) · Wave J · written 2026-10-14 by cm-probability · map: 87 concepts

Why: coverage was 72 of 72 concepts and `claim.mjs next probability` returned NONE; Wave J grows the company from 879 to 2,000 lessons. Fifteen new concepts were added to `content/curriculum/probability.json` today, none taught by any lesson in any domain (checked every `src/demos/*/*/meta.json` concept and every `company/domains/briefs/*.md`; the nearest lesson is named in each brief). Ranking: all fifteen are uncovered, so demand-3 concepts come first (briefs 56-61, here, because `claim.mjs` reads this file before the strand files), then demand 2 by strand: chance 62-65 (`probability.chance.md`), data literacy 66-68 (`probability.data-literacy.md`), statistics 69-70 (`probability.statistics.md`). Each brief names its strand.

Checks: every number below is reproduced by `node company/domains/briefs/checks/probability-round4-check.mjs` (exact arithmetic or closed form; seeded mulberry32 simulation only as a cross-check, seed disclosed). No brief needs a web source to be true; any citation is optional, flagged **needs a human source check**, and kept out of learner text until checked.

Rules for every Round 4 brief (demo-standard.md): stage text ≤ 25 words; reveal ≤ 90 words (each draft below is counted) and it must fit at 390×844 with the stage top and everything it names on screen; labels and tick text ≥ 10 px; every control is a **preset button** (no free sliders on the required path), listed in DOM order so that pressing each once reaches every milestone, with the question's own case pressed **last** so the quoted state is still on the stage when the reveal opens; values the reveal quotes are recorded when their milestone fires and survive Reset. If a reveal does not fit, cut told context first; which sentence goes is cm-probability's call (board item to cm-probability).

### 56. significant-but-false · concept: false-discovery-rate · core · demand 3 · strand: statistics · format: Single card (prior-share presets over a 1,000-dot grid)
- Audience: anyone who reads "a study found" headlines; science students / Learner knows: what "significant at 5%" means for one test (how-surprising-is-sixty), base rates (base-rates) / does not know: that the share of significant results that are false depends on how many tested ideas were true to begin with, and can be far above 5%.
- Misconception: A result significant at 5% has about a 95% chance of being real.
- Prediction (≤ 25 words): "1,000 ideas tested; 10% truly work. Tests catch 80% of real effects; 5% of duds pass by fluke. What share of passes are flukes?" options: A. About 5% / B. About 20% / C. About 35% (answer: C (36%)).
- What the stage shows: a 25 × 40 grid of 1,000 small dots (texture, not tappable), one per tested idea. True ideas are filled, duds hollow; ideas that pass the test get a ring, and flukes (passing duds) are drawn in `var(--bad)` with a cross so state reads without colour. Readouts: "passed: {tp} real, {fp} flukes" and "flukes among passes: {s}%". Preset buttons in DOM order: **50% true**, **1% true**, **10% true**. Locked stage: grey grid, no rings, no readout. Milestones: (1) 1% true shown; (2) 10% true shown (the question's case, last). Record both shares when they fire.
- Check: tp = 1,000 × prior × 0.8; fp = 1,000 × (1 − prior) × 0.05. Prior 50%: 400 real, 25 flukes, 5.9%. Prior 10%: 80 real, 45 flukes, 36.0%. Prior 1%: 8 real, 49.5 flukes (draw 50 at the grid), 86.1%.
- Reveal draft (67 words, counted by whitespace): "With 10% of ideas true, the tests pass {tp} real effects and {fp} flukes: {s}% of the passes are false, not 5%. The 5% is the fluke rate among duds, and here 900 of the 1,000 ideas are duds. At 1% true, flukes swamped real finds: {s1}%. How far to trust a significant result depends on how many of the tested ideas were likely to be true."
- Payoff: the cause is on the grid: the flukes are a small slice of a big pile of duds, and that pile grows as true ideas get rarer.
- Planned claims:
  1. With 1,000 ideas, 10% true, 80% detection and a 5% fluke rate, 80 real effects and 45 flukes pass, so 36% of passes are flukes. support: derivation; source: arithmetic (check script, brief 56).
  2. With 1% true, 86% of passes are flukes; with 50% true, 6%. support: derivation; source: same.
  3. The 5% threshold limits flukes among ideas that do nothing; it does not give the chance that a passing result is real. support: derivation; source: definition of a significance threshold, P(pass | dud) = 0.05.
  4. The 80% and 5% are the stage's settings, not figures about any field. support: derivation; source: lesson rule (stated on the card).
  5. Optional context, kept out of learner text unless checked: Ioannidis (2005), "Why most published research findings are false", PLoS Medicine 2(8): e124. **Needs a human source check.**
- curriculum (new concept): `{"primary":"probability:false-discovery-rate","also":["probability:p-values","probability:base-rates"],"prerequisites":["probability:p-values","probability:base-rates"],"level":"core","strand":"statistics","references":[],"tags":["significance","false positives","base rates","research"]}`
- Needs interaction-designer spec: no (one grid, three presets, two readouts).
- Differs from nearest: base-rates and second-positive-test (one person, one medical test); ai/flagged-means-what (confusion matrix of a classifier); twenty-harmless-tests (chance of at least one fluke across 20 tests); how-surprising-is-sixty (what a p-value is). This one asks what share of all passing results are false, across a field of ideas.

### 57. sixteen-of-twenty-got-better · concept: control-groups · intro · demand 3 · strand: statistics · format: Single card (day presets and a reveal-the-comparison button)
- Audience: anyone who has heard "I took it and got better" / Learner knows: percentages / does not know: that many conditions improve with no treatment, so improvement after a treatment means nothing without a comparison group.
- Misconception: If most people who took a treatment got better, the treatment worked.
- Prediction (≤ 25 words): "20 people with a cold take a new pill; 16 feel better within a week. To judge the pill, what do you most need?" options: A. More people taking the pill / B. How fast each of the 16 recovered / C. How many get better with no pill (answer: C).
- What the stage shows: two rows of 20 person icons. Top row "took the pill"; bottom row "took nothing", drawn as dashed outlines and labelled "not shown yet" until revealed. Icons are hollow while ill and fill on their recovery day; readout per row "better: n of 20". Both rows use the same deterministic recovery days (2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 8, 9, 10, 12), placed in a different order, because in this model the pill does nothing. Preset buttons in DOM order: **Day 3**, **Day 7**, **Show the no-pill group** (only shows; it does not toggle back). Locked stage: both rows hollow at day 0. Milestones: (1) day 7 reached (pill row 16 of 20); (2) no-pill group shown at day 7 (16 of 20). If the learner presses Show before Day 7, the milestone fires when both conditions hold.
- Check: recovered by day 3: 3 of 20; by day 7: 16 of 20, in both rows (same list). Deterministic, no seed.
- Reveal draft (63 words, counted by whitespace): "By day 7, 16 of 20 felt better with the pill. The group that took nothing: {n} of 20, the same. In this model colds clear up by themselves, so getting better after the pill was going to happen anyway. More pill-takers or faster stories would not change that. Only the comparison row shows what the pill added, and here it added nothing."
- Payoff: the second row is the cause on the stage: the same count appearing with no pill is what empties "16 of 20" of meaning.
- Planned claims:
  1. In the stage's model both groups recover on the same schedule; 16 of 20 are better by day 7 in each. support: derivation; source: lesson code (the day list above).
  2. Without a group that did not get the treatment, an improvement cannot be credited to the treatment. support: derivation; source: the counterfactual comparison is the only measure of the treatment's effect in the model.
  3. The pill and the recovery schedule are invented for the card; no real medicine is named. support: derivation; source: lesson rule (stated on the card).
- Content boundary: no named medicine, no advice about treating colds, no claim about real recovery times.
- curriculum (new concept): `{"primary":"probability:control-groups","also":["probability:regression-to-mean"],"prerequisites":[],"level":"intro","strand":"statistics","references":[],"tags":["experiments","control group","placebo","causation"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: praise-then-slump (regression to the mean: an extreme start drifts back) and hidden-third-cause (a confounder in observational data). Here nothing is extreme and nothing is hidden: the improvement simply happens without the treatment, and only a comparison row shows it.

### 58. the-doctor-picks-the-patients · concept: random-assignment · core · demand 3 · strand: statistics · format: Single card (three assignment buttons over 40 patients)
- Audience: anyone who reads about trials; students / Learner knows: confounding (hidden-third-cause), control groups (brief 57) / does not know: that letting a person choose who is treated builds their judgement into the result, and that a coin breaks that link.
- Misconception: A careful doctor who knows the patients assigns treatment as fairly as a coin flip; with 20 per group it evens out.
- Prediction (≤ 25 words): "A drug that does nothing is tested on 40 patients, 20 get it. Who should choose those 20 for a fair test?" options: A. The doctor, who knows the patients / B. A coin flip for each / C. Either: with 20 per group it evens out (answer: B).
- What the stage shows: 40 patient dots in 4 rows of 10, shaded by recovery chance from 30% (frail) to 90% (fit), with a 10 px legend "30% … 90% chance to recover". Assigned dots move into two boxes, "drug" and "no drug". Readout under each box: "expected recoveries: x of 20" (exact expected values, no sampling noise) and a gap readout in points. The drug does nothing (stated on the card). Preset buttons in DOM order: **Coin chooses** (seeded shuffle), **Coin again** (next seed), **Doctor chooses** (gives the drug to the 20 fittest). Doctor is last so its gap is on the stage at the reveal; the last coin gap is kept as a small trace line under the boxes. Locked stage: 40 dots unassigned. Milestones: (1) a coin split shown; (2) doctor split shown.
- Check: chances 30% + 60%·i/39, i = 0…39. Doctor (top 20 vs bottom 20): 75.4% vs 44.6%, gap 30.8 points; expected recoveries 15.1 vs 8.9 of 20. Coin splits: the gap has mean 0 and standard deviation 5.69 points (exact, sampling without replacement: 2σ/√39, σ = 17.75 points). Seeded simulation mulberry32(58), 100,000 coin splits: |gap| ≥ 15 points in 0.74%; first three gaps −1.5, +0.2, +1.7 points. The builder's own shuffle gives its own values; quote them from state.
- Reveal draft (70 words, counted by whitespace): "The drug does nothing, yet the doctor's choice gives the drug group {a} expected recoveries of 20 against {b}. She picked the fittest, so fitness passes for a cure. Your coin split gave {c} against {d}. A coin knows nothing about the patients, so fit and frail land on both sides about equally. A gap as big as the doctor's turns up by coin less than 1 time in 100."
- Payoff: the shading is the cause on the stage: under the doctor all the pale (fit) dots sit in the drug box; under the coin they scatter.
- Planned claims:
  1. In the model (recovery chances evenly spaced from 30% to 90%), giving the drug to the 20 fittest makes expected recoveries 15.1 vs 8.9 of 20 with a drug that does nothing. support: derivation; source: arithmetic (check script, brief 58).
  2. Under random assignment the expected gap is 0, with a standard deviation of about 5.7 points. support: derivation; source: variance of a difference of means under sampling without replacement.
  3. A coin gives a gap of 15 points or more in under 1% of splits. support: simulation; source: mulberry32(58), 100,000 splits, 0.74% (check script).
  4. The patients and drug are a model, not data. support: derivation; source: lesson rule (stated on the card).
- curriculum (new concept): `{"primary":"probability:random-assignment","also":["probability:confounding","probability:control-groups"],"prerequisites":["probability:confounding"],"level":"core","strand":"statistics","references":[],"tags":["experiments","randomisation","confounding","trials"]}`
- Needs interaction-designer spec: no (40 dots, two boxes, three buttons).
- Differs from nearest: hidden-third-cause shows a confounder producing a correlation in data someone observed; this one shows the experimenter's own choice acting as the confounder, and the coin as the fix. Brief 57 is about having a comparison group at all; this one is about how the groups are formed.

### 59. ten-thousand-replies-still-wrong · concept: self-selection-bias · core · demand 3 · strand: statistics · format: Single card (sample-size presets, one bar with a margin whisker)
- Audience: anyone who sees online polls / Learner knows: bigger random samples give smaller margins (halve-the-margin-cost), sample size need not grow with the population (city-poll-nation-poll) / does not know: that when who answers depends on the answer, a bigger sample does not shrink the error.
- Misconception: A poll with 10,000 replies must be closer to the truth than one with 1,000.
- Prediction (≤ 25 words): "A town is split 50/50 on a plan. Opponents are twice as likely to answer an open web poll. With 10,000 replies, what share back it?" options: A. About 50% / B. About 40% / C. About 33% (answer: C).
- What the stage shows: one horizontal bar "share backing the plan" with a dashed line at 50% labelled "whole town" (part of the question's setup) and a whisker for the 95% margin. A caption names which poll is shown. Preset buttons in DOM order: **1,000 web replies**, **100,000 web replies**, **1,000 random calls**, **10,000 web replies** (the question's case last). Web replies are drawn seeded with chance 1/3 of backing (backers reply at rate r, opponents at 2r); random calls sample everyone with equal chance and everyone answers (stated on the card). A small trace row keeps each poll's result as a tick, so all four stay visible. Locked stage: the bar empty, the 50% line only. Milestones: (1) 100,000 web replies (still about 33%); (2) 1,000 random calls (about 50% ± 3); (3) 10,000 web replies.
- Check: web poll expected share = 1/(1 + 2) = 33.3% at every size; its own margin shrinks (±2.9 at 1,000, ±0.9 at 10,000, ±0.3 at 100,000 points, binomial 1.96√(p(1−p)/n)) around the wrong value. Random 1,000: 95% margin ±3.1 points; seeded mulberry32(59): 48.7%.
- Reveal draft (64 words, counted by whitespace): "With 10,000 replies the web poll says {w}% back the plan, and at 100,000 it still said {w2}%. Opponents reply twice as often, so every batch of replies holds two opponents per backer, however many arrive. More replies only shrink the whisker around the wrong answer. The 1,000 random calls said {q}%, near the truth, because everyone had the same chance of being asked."
- Payoff: the whisker is the cause on the stage: it shrinks with size while the bar stays at 33%, so precision and accuracy visibly come apart.
- Planned claims:
  1. If opponents reply at twice the rate of backers in a 50/50 town, a self-selected poll's expected share of backers is 1/3, at any sample size. support: derivation; source: arithmetic (check script, brief 59).
  2. A random sample of 1,000 has a 95% margin of about ±3.1 points for a 50/50 question. support: derivation; source: 1.96 × √(0.25/1,000).
  3. The seeded random poll on the card (mulberry32(59)) shows 48.7%. support: simulation; source: lesson code, seed disclosed.
  4. The town, the plan and the reply rates are a model. support: derivation; source: lesson rule (stated on the card).
  5. Optional, out of learner text unless checked: the 1936 Literary Digest poll as the classic example. **Needs a human source check.**
- curriculum (new concept): `{"primary":"probability:self-selection-bias","also":["probability:sampling-bias","probability:poll-margin-of-error"],"prerequisites":["probability:sample-vs-population"],"level":"core","strand":"statistics","references":[],"tags":["polls","bias","sample size","nonresponse"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: armour-where-no-holes (survivorship: you only see the planes that came back); city-poll-nation-poll and halve-the-margin-cost (random samples and their size). This is the first lesson where size and bias are set against each other on one bar.

### 60. where-the-axis-starts · concept: truncated-axis · intro · demand 3 · strand: data-literacy · format: Single card (axis-start presets over two bars)
- Audience: everyone who reads charts in news or slides / Learner knows: bar charts / does not know: that a bar's length shows the value only when the axis starts at zero.
- Misconception: If one bar is three times as tall as another, its value is about three times as big.
- Prediction (≤ 25 words): "School A: 52% pass. School B: 56%. On a bar chart whose axis starts at 50%, how many times taller is B's bar?" options: A. About 1.1 times / B. About 2 times / C. About 3 times (answer: C).
- What the stage shows: two vertical bars with labelled values (52%, 56%), a y-axis with ticks every 2 points from the chosen start, tick labels ≥ 10 px, and a zig-zag break mark on the axis when it does not start at 0. Readouts: "B's bar is x times as tall" and "B's value is 1.08 times A's". Preset buttons in DOM order: **Axis from 0%**, **Axis from 40%**, **Axis from 50%** (the question's case last). Locked stage: axis from 0, no readouts. Milestones: (1) axis from 0 (1.08 times); (2) axis from 50 (3 times).
- Check: apparent ratio = (56 − start)/(52 − start): from 0: 1.08; from 40: 1.33; from 50: 3.00.
- Reveal draft (60 words, counted by whitespace): "B's pass rate is only 1.08 times A's: 56 against 52. With the axis starting at 50, each bar shows only the part above 50, 6 against 2, so B's bar is {x} times as tall. A bar's length stands for its value only when the bar starts at zero. On a cut axis, read the numbers, not the heights."
- Payoff: the break mark and the vanishing 0–50 stretch are the cause on the stage: the learner watches the shared base get cut away.
- Planned claims:
  1. With the axis from 50, bars of 52 and 56 have heights 2 and 6, a ratio of 3. support: derivation; source: arithmetic.
  2. 56/52 = 1.08. support: derivation; source: arithmetic.
  3. In a bar chart the bar's length from the axis start encodes the value, so ratios of lengths equal ratios of values only from a zero baseline. support: derivation; source: geometry of the chart.
  4. The schools and rates are invented. support: derivation; source: lesson rule.
- Content boundary: do not say every chart must start at zero; line charts of changes often should not. The claim is about bar lengths.
- curriculum (new concept): `{"primary":"probability:truncated-axis","also":[],"prerequisites":[],"level":"intro","strand":"data-literacy","references":[],"tags":["charts","axes","misleading graphs"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: economics/rate-up-one-point (percentage points vs percent) and math/point-one-is-26-percent are about numbers; same-line-four-pictures is about summaries hiding shapes. No lesson teaches how a chart's axis changes what a bar says.

### 61. four-hundred-or-thirty · concept: per-capita-rates · intro · demand 3 · strand: data-literacy · format: Before / after toggle (totals, then per 1,000 people)
- Audience: anyone who reads "most cases in X" maps and league tables / Learner knows: division, percentages / does not know: that totals mostly track population, so comparing risk needs a rate per person.
- Misconception: The place with the most cases is the riskiest place.
- Prediction (≤ 25 words): "Town A: 400 bike thefts a year, 200,000 people. Town F: 30 thefts, 5,000 people. Per 1,000 people, how do they compare?" options: A. A's rate is about 13 times F's / B. Their rates are about 1 to 1 / C. F's rate is about 3 times A's (answer: C).
- What the stage shows: six fictional towns A–F as a ranked bar chart, each with a population label. Preset buttons in DOM order: **Total thefts**, **Per 1,000 people** (the question's case last; one-way, so the "after" persists into the reveal). The bars re-sort with a short motion and each town keeps a small rank badge showing its old rank, so the change of order stays visible. Locked stage: town names and populations only, no bars. Milestones: (1) totals shown; (2) per 1,000 shown.
- Check: towns (people, thefts, per 1,000): A 200,000, 400, 2.0; B 80,000, 240, 3.0; C 50,000, 200, 4.0; D 20,000, 100, 5.0; E 10,000, 15, 1.5; F 5,000, 30, 6.0. Totals rank A B C D F E; rates rank F D C B A E. A/F totals 13.3; F/A rates 3.
- Reveal draft (62 words, counted by whitespace): "By totals, A tops the chart with 400 thefts to F's 30. Per 1,000 people, F has {f} and A has {a}: F's rate is 3 times A's, and A drops from 1st to 5th. Totals mostly count how many people live somewhere. To compare risk, divide by the people at risk. Small towns' rates also jump more from year to year."
- Payoff: the re-sorting bars with their old rank badges are the cause on the stage: dividing by population reorders the same towns.
- Planned claims:
  1. Per 1,000 people, A has 2.0 thefts and F 6.0; F's rate is 3 times A's. support: derivation; source: arithmetic (check script, brief 61).
  2. The towns and numbers are invented. support: derivation; source: lesson rule.
  3. Rates from small populations vary more from year to year than rates from large ones. support: derivation; source: binomial spread of a rate scales as 1/√n (taught in small-hospital-big-swings). This is the sentence to cut first if the reveal does not fit.
- curriculum (new concept): `{"primary":"probability:per-capita-rates","also":["probability:sample-size-noise"],"prerequisites":[],"level":"intro","strand":"data-literacy","references":[],"tags":["rates","per capita","maps","league tables"]}`
- Needs interaction-designer spec: no (Before / after toggle is by hand today; one stage, one-way toggle).
- Differs from nearest: small-hospital-big-swings (small samples give extreme rates) is the caution that follows this lesson, not the same idea; geography/half-of-humanity is where people live, not rates. No lesson teaches dividing by population before comparing.
