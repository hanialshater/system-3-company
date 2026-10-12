# Life Sciences: ranked lesson briefs (cycle: scale to hundreds)

owner: cm-life · written 2026-10-12 · 22 new briefs, highest priority first. None duplicates `herd-immunity` or `natural-selection`.
Ranking rule: demand first, then how visible the idea is on a phone, then how sharp the misconception is. Demand-3 concepts come first (portfolio rule). [exploration] briefs are the last five by rank but one per cycle should be pulled forward.
All models are made-up or toy models; every threshold names its assumption. No brief gives health advice. Numbers in "Prediction" were checked by hand; checks are on the line.

### 1. dish-runs-out · concept: exponential-bacteria · intro · demand 3
- Learner knows: doubling; that bacteria multiply by splitting / does not know: how fast repeated doubling gets, or that a closed dish stops growth by running out of food.
- Misconception: Growth feels steady (so 10 hours is "10 times" one hour) and goes on forever.
- Prediction: "One bacterium doubles every 20 minutes with plenty of food. About how many after 10 hours?" options: A. About 30,000 / B. About a million / C. About a billion (answer: C). Check: 10 h = 30 doublings; 2^30 = 1,073,741,824.
- Interaction: tap "feed" to keep the dish stocked or let it deplete; learner scrubs time and watches the count (log-ish dot grid of the dish) bend from J to S when food is limited. One representation: the dish.
- Payoff: Doubling feels slow, then is suddenly everywhere, and something finite always ends it.
- Claims to check: E. coli can double in about 20 minutes in rich lab medium (textbook; Madigan, Brock Biology of Microorganisms); 2^30 arithmetic; the lesson's dish is a model with a fixed food supply (convention); real doubling time varies a lot with species and conditions (source).

### 2. three-day-doubling · concept: outbreak-doubling-time · intro · demand 3
- Learner knows: a case can infect others; percentages / does not know: how repeated doubling compounds over weeks.
- Misconception: Growth in cases is roughly linear, so a month of spread is "a few times" bigger.
- Prediction: "100 cases, and the count doubles every 3 days. About how many cases after 30 days if nothing changes?" options: A. About 1,000 / B. About 10,000 / C. About 100,000 (answer: C). Check: 30/3 = 10 doublings; 100 x 2^10 = 102,400.
- Interaction: learner drags a "days until action" marker along a timeline of dots; the case count at that day is felt as dot-cluster size; a 6-day delay quadruples the total.
- Payoff: Small delays cost doublings, so a few days is a lot when growth compounds.
- Claims to check: arithmetic above; delay of 6 days with 3-day doubling = x4 (derivation 2^(6/3)); the made-up disease has constant doubling time (convention); real outbreaks slow as people become immune or change behavior (source: Anderson & May 1991 ch. 4).

### 3. most-cases-vaccinated · concept: vaccinated-share-of-cases · core · demand 3
- Learner knows: vaccines reduce infection risk; counts vs rates / does not know: that the share of cases who are vaccinated depends on how many people are vaccinated.
- Misconception: "Half the cases were vaccinated, so the vaccine doesn't work."
- Prediction: "1,000 people, 90% vaccinated; vaccine cuts an exposed person's risk by 90%; unvaccinated risk is 50%. Roughly what share of the cases are vaccinated people?" options: A. About 5% / B. About 47% / C. About 90% (answer: B). Check: unvaccinated 100 x 50% = 50 cases; vaccinated 900 x 5% = 45 cases; 45/95 = 47%.
- Interaction: learner slides vaccinated share; a grid of 1,000 dots colours cases; a second readout is "risk per person" in each group, so the rate gap stays visible while the case-count share swings.
- Payoff: Compare risk per person, not who fills the case list; a large protected group makes up a large share of the few cases.
- Claims to check: arithmetic; the model assumes equal exposure and a fixed vaccine effect (convention); the base-rate fallacy applied to case counts is documented (Fine, Eames & Heymann 2011; Brown et al. on "vaccinated cases"; verify citation before use).

### 4. peak-is-not-the-end · concept: sir-epidemic-curve · core · demand 3
- Learner knows: herd immunity threshold (taught) / does not know: infections peak when susceptible share falls to 1/R0, well before the epidemic is over.
- Misconception: An outbreak ends when it has infected about as many as the threshold, or when infections peak.
- Prediction: "Made-up disease, R0 = 3, no one immune at the start, everyone mixes randomly. When daily new infections are at their peak, what share has already been infected?" options: A. About 33% / B. About 67% / C. About 95% (answer: B). Check: peak when R0 x S = 1, so S = 1/3, so 2/3 are no longer susceptible (infected or recovered).
- Interaction: learner drags a time cursor along a drawn epidemic curve; the dot-town recolours susceptible / infected / recovered; the cursor snaps to the peak.
- Payoff: The peak is where each case only replaces itself, not where the epidemic stops.
- Claims to check: SIR peak condition S = gamma/beta = 1/R0 (derivation, Kermack & McKendrick 1927; Anderson & May 1991 ch. 6); stage model is SIR with homogeneous mixing, constant R0, no births (convention).

### 5. one-in-four-sprouts · concept: genetic-inheritance · intro · demand 2
- Learner knows: offspring get one copy of a gene from each parent / does not know: chance multiplies across children; "1 in 4" is per child.
- Misconception: If two carriers have 4 children, exactly one will show the trait.
- Prediction: "Two carrier plants (white flower is recessive) each seed has a 1 in 4 chance of white. They grow 4 seeds. Chance at least one is white?" options: A. About 25% / B. About 68% / C. 100% (answer: B). Check: 1 - (3/4)^4 = 1 - 81/256 = 0.684.
- Interaction: learner taps to "pollinate" and draws seeds, each showing two hidden alleles flipping; repeat runs build a histogram of how many of 4 were white.
- Payoff: A 1 in 4 chance is per seed, so the count in a family bounces around 1.
- Claims to check: Mendelian ratio for two heterozygotes (Griffiths, Intro to Genetic Analysis); arithmetic; fictional flower, complete dominance, independent seeds (convention).

### 6. ten-percent-up · concept: energy-pyramid · intro · demand 2
- Learner knows: animals eat plants or other animals / does not know: energy shrinks at each link.
- Misconception: A hawk could be as common as the grasshoppers it ultimately depends on.
- Prediction: "10,000 units of energy are in the plants. Each link in the chain passes on about 10%. Plant, grasshopper, frog, snake, hawk. How much reaches the hawk?" options: A. About 1 unit / B. About 100 units / C. About 1,000 units (answer: A). Check: four transfers, 10,000 x 0.1^4 = 1.
- Interaction: learner adds or removes links in a chain; the bar-free "tokens in a stack" thins out at each step; adding a link shows the top level shrinking tenfold.
- Payoff: Each extra link costs about 90% of the energy, so top predators are few.
- Claims to check: "about 10%" is a rule of thumb; measured transfer efficiencies range roughly 5-20% (Pauly & Christensen 1995, Nature 374; Lindeman 1942); numbers are made up (convention).

### 7. pesticide-paradox · concept: predator-prey · core · demand 2
- Learner knows: predators eat prey / does not know: Lotka-Volterra cycles and Volterra's principle.
- Misconception: Killing both pest and its predator at the same rate leaves the pest the same or lower.
- Prediction: "In a simple predator-prey model, a spray kills a fixed share of both species per day. Over time, the average prey (pest) number: A. falls / B. stays the same / C. rises (answer: C)". Check: model dx/dt = ax - bxy, dy/dt = cxy - dy has long-run averages prey = d/c, predator = a/b. Spray at rate e makes a become a-e and d become d+e, so average prey = (d+e)/c rises and average predators = (a-e)/b falls.
- Interaction: learner sets spray strength with a slider on a phase-plane loop (prey vs predator dot orbit) and sees the orbit move toward more prey, fewer predators. One representation: the orbit.
- Payoff: In this model, hitting both species hurts the predator more, since its recovery depends on prey.
- Claims to check: Volterra's principle in the Lotka-Volterra model (derivation; Murray, Mathematical Biology I); D'Ancona fish data after WWI fishing pause (Volterra 1926; source to confirm); real systems differ from this toy model (convention).

### 8. cell-too-big · concept: surface-area-volume · core · demand 2
- Learner knows: area and volume / does not know: surface-to-volume ratio falls as size rises.
- Misconception: A cell 10 times wider has 10 times more "skin per unit of inside".
- Prediction: "A cube-shaped cell grows from 1 unit to 10 units wide. Its surface area compared with its volume (surface per unit of volume) becomes: A. 10 times larger / B. the same / C. 10 times smaller (answer: C)". Check: ratio = 6s^2/s^3 = 6/s; s=1 gives 6, s=10 gives 0.6.
- Interaction: learner drags cell width; food "arrows" cross the surface and fill the inside; the readout is arrows per unit of inside (felt as one cell dot colouring from full to thin).
- Payoff: Surface-per-volume falls in proportion to width, which is why cells stay small or fold their surfaces.
- Claims to check: 6/s derivation; typical cell sizes (source: Alberts, Molecular Biology of the Cell); cube is a simplification (convention).

### 9. same-genes-different-drift · concept: genetic-drift · core · demand 2
- Learner knows: natural-selection (taught); chance matters / does not know: allele frequencies wander and get lost without any advantage.
- Misconception: If neither variant is better, the mix stays at 50:50.
- Prediction: "20 beetles, half red and half green, neither colour better. Each generation, 20 are drawn at random from the previous generation's mix. After many generations the population is most likely: A. still about half and half / B. all one colour (either) / C. always all red (answer: B)". Check: each generation is a draw with variance p(1-p)/N > 0; all-red and all-green are absorbing; A and C have probability zero in the long run (each is reached with probability equal to its starting share, 1/2).
- Interaction: learner presses "run 30 generations" on 20-beetle dot grids; five lanes run in parallel with different seeds; a "population size" toggle (20 vs 200) shows smaller populations lose a colour faster.
- Payoff: In small populations chance alone changes the mix, and one variant ends up everywhere without being better.
- Claims to check: Wright-Fisher model absorption (derivation; Gillespie 2004 ch. 2); fixation probability = initial frequency for neutral alleles (Kimura 1962); finite-population caveats stated (convention).

### 10. fastest-at-the-bend · concept: logistic-growth · intro · demand 2
- Learner knows: exponential-bacteria (taught); a population can hit a limit / does not know: growth in numbers is fastest in the middle.
- Misconception: A population grows fastest when it is nearly full (most members, most babies).
- Prediction: "A pond holds at most 1,000 fish and growth is logistic. At what population is it adding fish fastest? A. 100 / B. 500 / C. 900 (answer: B)." Check: dN/dt = rN(1 - N/K) is maximal at N = K/2 = 500.
- Interaction: learner drags the population count along an S-curve; a "new fish per month" dot row below sizes change.
- Payoff: Growth needs both fish and room, and the product peaks halfway.
- Claims to check: derivative maximum at K/2 (derivation); logistic equation is a model with fixed K and r (convention); real populations show lags and overshoot (source: Gotelli, A Primer of Ecology).

### 11. slow-across-a-room · concept: diffusion-distance · intro · demand 2
- Learner knows: molecules move randomly / does not know: diffusion time grows with the square of distance.
- Misconception: Ten times farther takes ten times longer.
- Prediction: "A sugar molecule diffuses 10 micrometres (a cell width) in about 0.1 second. About how long to diffuse 1 millimetre (100 times farther) by diffusion alone? A. About 10 seconds / B. About 15 minutes / C. About 3 hours (answer: B)." Check: time scales as distance^2, so 0.1 s x 100^2 = 1,000 s = about 17 minutes.
- Interaction: learner picks a distance by dragging a ruler and sees random walkers (dots) drift out; a "time to arrive" readout lights up in felt units, comparing to a transport line.
- Payoff: Diffusion is great over a cell and hopeless over a body, so big animals need circulation.
- Claims to check: t = x^2/(2D) for 1D diffusion (derivation; Berg, Random Walks in Biology); D for small molecules in water roughly 5e-10 m^2/s, giving 10 um in about 0.1 s (source: Nelson, Biological Physics).

### 12. mouse-vs-elephant · concept: metabolic-scaling · core · demand 2
- Learner knows: surface-area-volume (taught) / does not know: Kleiber's three-quarters scaling.
- Misconception: Energy use is proportional to body mass.
- Prediction: "An elephant is about 160,000 times heavier than a mouse. Using the roughly three-quarters power law for resting metabolism, about how many times more energy does it use in total? A. About 160,000 times / B. About 8,000 times / C. About 400 times (answer: B)." Check: 160,000^0.75 = (160,000^0.25)^3 = 20^3 = 8,000.
- Interaction: learner drags body mass on a log ruler; per-gram "burn" is shown as a glowing density in the animal silhouette; mouse is 20 times denser.
- Payoff: Bigger animals burn more in total but far less per gram, so heart rates and lifespans scale with size.
- Claims to check: Kleiber's exponent about 0.75 (Kleiber 1932; West, Brown & Enquist 1997, Science 276); exponent is debated (White & Seymour 2003 give about 0.686 for mammals); masses are rounded.

### 13. hidden-carriers · concept: hardy-weinberg · stretch · demand 2
- Learner knows: genetic-inheritance (taught) / does not know: most copies of a rare recessive allele are in unaffected carriers.
- Misconception: A rare recessive trait means almost nobody has the allele.
- Prediction: "In a well-mixed population, 1 in 10,000 shows a made-up recessive trait. About how many carry one copy of the allele (and look normal)? A. About 1 in 100 / B. About 1 in 50 / C. About 1 in 10,000 (answer: B)." Check: q^2 = 1/10,000 so q = 0.01, carriers = 2pq = 2 x 0.99 x 0.01 = 0.0198, about 1 in 50.
- Interaction: learner sets the affected rate with a slider on a 10,000-dot town and sees carriers light up beside the affected.
- Payoff: The allele hides in carriers, outnumbering the affected about 200 to 1.
- Claims to check: Hardy-Weinberg conditions (random mating, no selection, migration or mutation, large population) stated next to the number; 2pq formula (derivation; Hartl & Clark 2007 ch. 2); 0.0198/0.0001 = 198 (arithmetic). Fictional trait; no real conditions.

### 14. epidemic-overshoot · concept: final-size-overshoot · stretch · demand 2
- Learner knows: sir-epidemic-curve (brief 4) / does not know: the epidemic keeps going after the peak and ends well beyond the threshold.
- Misconception: Once the herd threshold is passed, the epidemic stops there.
- Prediction: "Made-up disease with R0 = 3, no one immune, simple well-mixed model. Roughly what share is eventually infected? A. About 67% / B. About 94% / C. 100% (answer: B)." Check: final share z solves z = 1 - e^(-3z); z = 0.94 gives 1 - e^-2.82 = 1 - 0.060 = 0.940.
- Interaction: learner drags R0 and sees the final infected share as a filled town; a ghost outline marks the threshold 1 - 1/R0.
- Payoff: Infection overshoots the threshold because infected people keep passing it on after the peak.
- Claims to check: final-size equation (Kermack & McKendrick 1927; Diekmann et al. 2013); no interventions, mixing homogeneous (convention).

### 15. spreaders-are-rare · concept: superspreading-dispersion · core · demand 2
- Learner knows: R0 as an average / does not know: spread is uneven, so most cases infect nobody.
- Misconception: Each case infects about R0 people.
- Prediction: "An outbreak averages 2 new infections per case, but spread is very uneven (negative binomial, dispersion k = 0.1). What share of cases infect no one? A. About 14% / B. About 40% / C. About 74% (answer: C)." Check: P(0) = (k/(k+R))^k = (0.1/2.1)^0.1 = e^(0.1 x ln 0.0476) = e^-0.304 = 0.74 (an even Poisson spread gives e^-2 = 14%).
- Interaction: learner drags dispersion from even to very uneven; 100 case-dots each show a fan of children; a few fans become huge.
- Payoff: The average hides the fact that a few cases cause most spread, so outbreaks often fizzle.
- Claims to check: negative binomial offspring distribution (Lloyd-Smith et al. 2005, Nature 438); formula check above; k = 0.1 is illustrative, not a measured value for a named disease.

### 16. keeping-the-bad-gene · concept: heterozygote-advantage · core · demand 2
- Learner knows: genetic-inheritance, natural-selection (taught) / does not know: selection can hold an allele at a fixed share.
- Misconception: Selection always removes a harmful allele.
- Prediction: "In a made-up species, two copies of allele w are always fatal, but one copy survives 15% better than no copies. In the long run, w: A. disappears / B. settles near 13% of copies / C. takes over (answer: B)." Check: fitness AA = 0.85, Aw = 1, ww = 0, so s = 0.15 and t = 1; equilibrium q = s/(s+t) = 0.15/1.15 = 0.13.
- Interaction: learner sets how much the one-copy benefit is; a ring of 100 allele dots equilibrates at a sticky share.
- Payoff: The allele persists because carrying one copy pays and two does not.
- Claims to check: overdominance equilibrium (derivation; Hartl & Clark 2007 ch. 5); real example sickle haemoglobin and malaria (Allison 1954; Aidoo et al. 2002), stated as an example with different numbers.

### 17. antibiotic-already-there · concept: antibiotic-resistance · core · demand 2
- Learner knows: natural-selection (taught) / does not know: resistant cells can exist before any drug.
- Misconception: The drug causes the resistance in the bacteria it meets.
- Prediction: "A culture of 10 billion bacteria has never met a drug. If 1 in 100 million cells carries a resistance mutation, about how many resistant cells are already there? A. None / B. About 100 / C. About 10 million (answer: B)." Check: 10^10 x 10^-8 = 100.
- Interaction: learner "adds drug" to a dish of dots with a few hidden resistant dots; after, only the resistant ones remain and regrow. A second drag sets the starting population size.
- Payoff: The drug selects what was already there rather than creating it.
- Claims to check: mutation frequencies vary widely (Luria & Delbruck 1943; Drake 1991); the 1-in-10^8 figure is illustrative (convention); arithmetic.

### 18. saturated-enzyme · concept: enzyme-saturation · stretch · demand 1 [exploration]
- Learner knows: enzymes speed reactions / does not know: rate levels off when all enzymes are busy.
- Misconception: Doubling the substrate doubles the rate.
- Prediction: "An enzyme works at 10 times its half-way concentration. Doubling the substrate then speeds it up by about: A. 2 times / B. 50% / C. 5% (answer: C)." Check: v/Vmax = S/(Km+S): 10/11 = 0.909; 20/21 = 0.952; ratio 1.048.
- Interaction: exploration, no slider and no text on stage: the learner drops substrate dots onto a row of enzyme "stations"; each station can handle one dot at a time and queues form; learner discovers the plateau.
- Payoff: When all stations are busy, extra substrate only adds a queue.
- Claims to check: Michaelis-Menten equation (Nelson & Cox, Lehninger); station model is a simplification of single-substrate kinetics.

### 19. cut-the-island · concept: species-area · stretch · demand 1 [exploration]
- Learner knows: habitats have species / does not know: species count falls slowly with area.
- Misconception: Losing 90% of the area loses 90% of the species.
- Prediction: "A forest keeps 10% of its area. With a typical species-area exponent of 0.25, about how many species does it eventually keep? A. About 10% / B. About 56% / C. About 90% (answer: B)." Check: 0.1^0.25 = 0.562.
- Interaction: exploration: learner draws the shape of the remaining habitat with finger, painting out area, while dots of species winks out in a curve.
- Payoff: Species fall off less steeply than area, but they still fall.
- Claims to check: S = cA^z with z about 0.2-0.35 (MacArthur & Wilson 1967; Rosenzweig 1995); losses take time; this is an empirical regularity, not a law.

### 20. strategy-builder · concept: evolution-of-cooperation · stretch · demand 1 [exploration]
- Learner knows: natural-selection (taught) / does not know: cooperation can win under repeated meetings.
- Misconception: Selfish players always beat cooperators.
- Prediction: "Each pair plays 10 rounds (both help: 3 each; helper vs cheat: 0 vs 5; both cheat: 1 each). Players copy the strategy of the higher scorer. Tit-for-tat (copy your partner's last move) is rare. What share of tit-for-tat players is enough to take over? A. About 6% / B. About 50% / C. About 95% (answer: A)." Check: TFT scores 30 vs TFT and 9 vs a cheater; cheater scores 14 vs TFT and 10 vs cheater; equal at f: 21f + 9 = 4f + 10, so f = 1/17 = 5.9%.
- Interaction: unusual format: the learner builds a strategy by dragging 3 rule-chips, then watches a crowd of dots with random pairing evolve.
- Payoff: Cooperation survives if cooperators meet each other often enough.
- Claims to check: Axelrod & Hamilton (1981), Science 211; payoffs and 10 rounds are chosen; random pairing and large population assumed.

### 21. who-has-grandchildren · concept: sex-ratio-fisher · stretch · demand 1 [exploration]
- Learner knows: births of sons and daughters / does not know: rare sex yields more grandchildren.
- Misconception: Evolution would favour whichever sex ratio makes the population grow fastest.
- Prediction: "A population is 80% female. Every child has one mother and one father. On average, a son gets how many times as many children as a daughter? A. The same / B. 4 times as many / C. 0.25 times (answer: B)." Check: N children, 0.2N fathers, 0.8N mothers; per father 5, per mother 1.25; ratio 4.
- Interaction: exploration: learner assigns the sex of the next generation's children by tapping; a hidden meter nudges them toward 50:50 without text.
- Payoff: Selection on individuals pulls the ratio toward even.
- Claims to check: Fisher (1930), The Genetical Theory of Natural Selection; arithmetic; exceptions (e.g. local mate competition) stated.

### 22. few-survivors · concept: bottleneck-founder · intro · demand 1 [exploration]
- Learner knows: genes come in variants / does not know: crashes lose rare variants.
- Misconception: A population that regrows to its old size is genetically the same.
- Prediction: "A species crashes to 10 survivors (each carries 2 gene copies drawn at random). A variant carried by 1% of copies: how often is it lost? A. About 10% / B. About 50% / C. About 82% (answer: C)." Check: 0.99^20 = e^(20 ln 0.99) = e^-0.201 = 0.818.
- Interaction: exploration, no text: the learner taps 10 dots from a jar of 1,000 coloured copies, then watches the jar refill from the 10; repeat for many jars.
- Payoff: After a squeeze, rare variants are mostly gone even if numbers recover.
- Claims to check: sampling probability above; cheetah or northern elephant seal bottleneck facts (O'Brien et al. 1985; Hoelzel 1993) only if used; independence assumed.
