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

## Round 2 (briefs #23-#55)

owner: cm-life · written 2026-10-12 · 33 new briefs; 9 are [exploration] (27%). Answers recomputed in `artifacts/scratch/cm-life-r2/check.mjs` and `check2.mjs` (node). Every model is a toy with its assumptions on the line; none is health advice and none should be read as a forecast for a real disease. Briefs 23-31 are epidemiology (the category focus); the rest spread over genetics, evolution, ecology and cell biology. Where a concept already has a brief or lesson, the angle is stated.

### 23. five-day-generations · concept: reproduction-number-growth · intro · demand 3
- Learner knows: doubling time (brief 2) / does not know: R is growth per generation of infection, so R = 1.5 compounds.
- Misconception: R = 1.5 means cases grow "50%" over the whole outbreak.
- Prediction: "A made-up infection has R = 1.5; each generation (5 days) the new cases are 1.5 times the last generation's. 20 new cases now. New cases in the 6th generation (30 days on)?" options: A. About 30 / B. About 230 / C. About 1,000 (answer: B). Check: 20 x 1.5^6 = 227.8.
- Key state: the learner has stepped the generations to the fourth or later, so the dot count is clearly past 100, and then flips R below 1 to see it shrink; the reveal unlocks only after generation 4+ is shown.
- Interaction: tap "next generation" to grow a tree of dots; a slider sets R (0.8 to 2).
- Payoff: R above 1 compounds per generation; R below 1 shrinks the same way.
- Claims to check: 20 x 1.5^6 = 227.8 (arithmetic); generations do not overlap (convention); R depends on behaviour and immunity so it changes in real outbreaks (Anderson & May 1991).

### 24. immunity-eats-r · concept: effective-reproduction · core · demand 3
- Learner knows: R0 and herd threshold (taught) / does not know: effective R = R0 x susceptible share, so it falls continuously.
- Misconception: Immunity does nothing until the threshold is reached.
- Prediction: "R0 = 4 in a fully susceptible, well-mixed town. 60% are immune. How many people does an average new case infect at first?" options: A. About 4 / B. About 1.6 / C. Fewer than 1 (answer: B). Check: 4 x (1 - 0.6) = 1.6; threshold would be 1 - 1/4 = 75%.
- Key state: the learner has slid immunity to a value where the dot-town's reached share visibly shrinks (at least above 50%) and sees the R readout pass through 1 at 75%.
- Interaction: slider for the immune share on a dot-town; random contacts from one case draw lines only to susceptible dots.
- Payoff: Each immune person removes some of a case's chances, so R shrinks smoothly toward 1.
- Claims to check: R_eff = R0 x S (derivation; Anderson & May 1991 ch. 4); homogeneous mixing, perfect immunity (convention).

### 25. stale-case-counts · concept: reading-case-curves · intro · demand 2
- Learner knows: doubling time / does not know: reported cases are infections from days ago.
- Misconception: Today's reported count tells you how many people are being infected today.
- Prediction: "Cases double every 3 days. People are counted 9 days after they were infected. Today's report says 100. About how many people were infected today?" options: A. About 100 / B. About 300 / C. About 800 (answer: C). Check: 9 days = 3 doublings, 100 x 2^3 = 800.
- Key state: the learner has dragged the lag marker to 9 days and watches the "infected" curve sit far above the "reported" curve at the same day.
- Interaction: slider for reporting delay (0-12 days) between two curves on one time axis (infection curve with reported curve as a shifted copy).
- Payoff: A delay on a growing curve hides a large current size.
- Claims to check: arithmetic; constant doubling time and a fixed delay (convention); real delays vary by test and place (source needed before use).

### 26. falling-yet-adding · concept: reading-case-curves · intro · demand 2
- Learner knows: daily vs total / does not know: a falling daily count still adds to the total.
- Misconception: Once daily cases are falling, the outbreak is basically over.
- Prediction: "1,000 new cases today; each day the new cases are 10% fewer than the day before. If this continues, how many more cases will be reported from tomorrow on?" options: A. About 1,000 / B. About 4,000 / C. About 9,000 (answer: C). Check: 900/(1-0.9) = 9,000; sum computed in node.
- Key state: the learner has stepped at least 10 days and seen the running total climb past the first day's 1,000 many times.
- Interaction: step button adds the next day's dots into a stack; slider sets the daily fall (5% to 30%).
- Payoff: A shrinking tail is still a sum, and a slow fall means a long, heavy tail.
- Claims to check: geometric sum a r/(1-r) (arithmetic); a constant daily fall is an assumption (convention).

### 27. isolate-by-day-three · concept: isolation-timing · core · demand 2
- Learner knows: effective reproduction (brief 24) / does not know: isolating cases early cuts R in proportion to infectious days saved.
- Misconception: Isolation only matters if it catches everyone eventually.
- Prediction: "R0 = 3. A case is infectious for 6 days and spreads evenly across them. If each case is isolated at the end of day 3, what is R?" options: A. 3 / B. 1.5 / C. 0.5 (answer: B). Check: 3 x 3/6 = 1.5; day 2 gives 1.0.
- Key state: the learner drags the isolation marker to day 2 and sees R touch 1 on the readout.
- Interaction: drag a marker along a 6-day bar of the case's infectious period (dots emitted per day).
- Payoff: Every day earlier removes a share of the spread, and a two-day isolation is the knife-edge here.
- Claims to check: R = R0 x (isolation day)/(infectious days) under even transmission (derivation); real infectiousness is not even and some spread happens before symptoms (source: Ferretti et al. 2020, Science, verify before use).

### 28. pockets-below-threshold · concept: vaccine-coverage-limits · core · demand 2
- Learner knows: herd threshold (taught) / does not know: the threshold applies to each mixing group, not the national average.
- Misconception: If overall coverage is above the threshold, no outbreak can grow anywhere.
- Prediction: "R0 = 12 (threshold 91.7%), perfect protection. Two towns of equal size, 98% and 88% vaccinated; combined 93%. Can an outbreak grow in the 88% town?" options: A. No, 93% is above 91.7% / B. Yes, R there is about 1.4 / C. Only if the 98% town is also hit (answer: B). Check: 12 x 0.12 = 1.44 > 1; other town 12 x 0.02 = 0.24.
- Key state: the learner has dragged the 88% town's slider to a value where its R readout passes above 1, while the combined figure stays above threshold.
- Interaction: two sliders for two town dot-grids with a combined coverage readout.
- Payoff: Averages hide the groups that are under the line.
- Claims to check: arithmetic; no contact between towns, perfect vaccine protection, homogeneous mixing inside each (convention); real clustering of unvaccinated people is documented (source needed, e.g. Omer et al. 2008; verify).

### 29. leaky-vaccine-threshold · concept: vaccine-coverage-limits · core · demand 2
- Learner knows: herd threshold = 1 - 1/R0 / does not know: with an imperfect vaccine coverage must be higher.
- Misconception: The coverage needed depends only on R0.
- Prediction: "R0 = 4 (threshold 75% if protection were perfect). A vaccine cuts infection chance by 80% for each vaccinated person. What coverage is needed?" options: A. 75% / B. About 94% / C. Impossible, more than 100% (answer: B). Check: 0.75/0.8 = 0.9375; with 70% efficacy it would be 107%, impossible.
- Key state: the learner has moved the efficacy slider down until the needed coverage crosses 100% and a "not enough alone" marker appears.
- Interaction: sliders for efficacy and coverage on a dot-town; a gauge shows R_eff at the pointer.
- Payoff: A weaker shield needs more people under it, up to a point where coverage alone cannot be enough.
- Claims to check: coverage needed = (1 - 1/R0)/efficacy (derivation; Anderson & May 1991); all-or-nothing vs leaky protection stated (convention); numbers made up.

### 30. waves-return · concept: waning-immunity · core · demand 2
- Learner knows: SIR curve (brief 4) / does not know: if immunity fades the infection settles into recurring waves around an endemic level.
- Misconception: After a big wave, the disease is gone for good.
- Prediction: "R0 = 2, immunity lasts about 100 days then fades. After many waves the pattern settles. What share of people are susceptible then?" options: A. Almost none / B. About half / C. Almost everyone (answer: B). Check: node SIRS integration ends at S = 0.500 (S* = 1/R0).
- Key state: the learner has run through at least two waves, with the susceptible line returning to about the same level each time.
- Interaction: a time scrub on the dot-town with S/I/R recolouring; slider for the immunity length.
- Payoff: When immunity fades, supply of susceptibles refills, and the infection holds S at 1/R0.
- Claims to check: SIRS endemic equilibrium S* = 1/R0 (Anderson & May 1991 ch. 6); parameters beta 0.4/day, gamma 0.2/day, waning 0.01/day are made up; no births, deaths, or seasons (convention).

### 31. vaccinate-at-the-peak · concept: sir-epidemic-curve · core · demand 3
- Learner knows: the SIR peak (brief 4) / does not know: late vaccination still stops much of the remaining spread.
- Misconception: Vaccinating after the peak is pointless.
- Prediction: "R0 = 3 toy epidemic, nobody immune. Vaccinate 20% of the population at once, either at day 0 or at the peak (day 19). At the peak, how much of the day-0 benefit is left?" options: A. Almost none / B. About half / C. Most (about 85%) (answer: C). Check: node SIR run: no vaccination, 94% ever infected; day 0: 50%; peak: 56%; benefit 38 of 44 points = 87%.
- Key state: the learner has placed the vaccination marker at three dates (including the peak) and seen the final-infected fill each time.
- Interaction: drag a "vaccinate here" marker along the epidemic curve; final infected share is a filled town.
- Payoff: Many people are still susceptible at the peak, so late protection still counts.
- Claims to check: simulation (beta 0.6, gamma 0.2 per day, 0.1% seed); instant vaccination, perfect protection, homogeneous mixing (convention); a model result, not guidance.

### 32. one-percent-edge · concept: natural-selection · intro · demand 3
- Learner knows: selection favours better-fitting variants (taught) / does not know: a small edge compounds into takeover, and takes longer than a feel suggests.
- Misconception: A 5% advantage needs only a few generations or makes no visible difference.
- Prediction: "A new variant starts at 1% of a large, asexual population and each generation it makes 5% more offspring than the old type. About how many generations to reach half the population?" options: A. About 20 / B. About 95 / C. About 500 (answer: B). Check: p' = p(1.05)/(1 + 0.05p) iterated: 95 generations.
- Key state: the learner has run the generations until the variant visibly turns the corner at the middle of the S-curve.
- Interaction: slider sets the advantage (1% to 10%); a bar-free ring of 200 dots recolours as time scrubs. Angle: speed of selection, not the existence of it (lesson natural-selection shows the mechanism).
- Payoff: A small edge is slow for a long time, then fast, and doubling the edge about halves the time.
- Claims to check: haploid selection recursion (derivation; Gillespie 2004 ch. 3); infinite population, constant advantage (convention).

### 33. children-new-mutations · concept: de-novo-mutations · intro · demand 2
- Learner knows: mutations happen / does not know: each new individual carries tens of brand-new changes.
- Misconception: Mutations are rare events that happen to few individuals.
- Prediction: "A genome has about 3.1 billion letters per copy (two copies in each person). A copy error hits about 1 letter in 80 million per generation (1.2 in 100 million). About how many new changes does a child carry that neither parent had?" options: A. About 7 / B. About 70 / C. About 7,000 (answer: B). Check: 3.1e9 x 2 x 1.2e-8 = 74.
- Key state: the learner has dropped the error rate through a few values and watches the count of changed letters in a dot strip scale proportionally.
- Interaction: slider for error rate against a strip of letter-dots; changes drawn as coloured ticks.
- Payoff: Rare per letter, common per person; a population always has fresh variation.
- Claims to check: de novo mutation rate about 1.2e-8 per site per generation and about 60-80 new variants per child (Kong et al. 2012, Nature 488; Acuna-Hidalgo et al. 2016); most are neutral (source: Eyre-Walker & Keightley 2007). No medical interpretation.

### 34. two-genes-one-in-sixteen · concept: genetic-inheritance · intro · demand 2
- Learner knows: one-gene ratios (brief 5) / does not know: independent genes multiply.
- Misconception: Showing both recessive traits has the same 1 in 4 chance as one trait.
- Prediction: "Two parent plants are hybrid for two separate genes (flower colour and seed shape, each recessive form shows only with two copies). What share of seeds show both recessive forms?" options: A. 1 in 4 / B. 1 in 8 / C. 1 in 16 (answer: C). Check: enumeration of 16 allele combinations gives 1; 1/4 x 1/4.
- Key state: the learner has flipped through a 4 x 4 grid of seed squares and the double-recessive cell is highlighted as one of 16.
- Interaction: tap to fill a 4x4 Punnett grid of dots; tap to colour cells by trait. Angle: two genes at once (complements brief 5's one gene).
- Payoff: Independent chances multiply, so combinations of rare forms are rarer than each part.
- Claims to check: Mendel's independent assortment holds only for genes on different chromosomes or far apart (Griffiths, Intro to Genetic Analysis); fictional plant.

### 35. selfing-halves-hets · concept: selfing-heterozygosity · core · demand 2
- Learner knows: Punnett one-gene cross / does not know: self-fertilisation halves hybrid share every generation.
- Misconception: Hybrids stay hybrid when self-pollinated.
- Prediction: "A made-up plant starts as all hybrids (Aa). Each plant fertilises itself for 3 generations. What share is still hybrid?" options: A. About 50% / B. About 12% / C. 0% (answer: B). Check: share of Aa halves each time: 1/2^3 = 12.5%.
- Key state: the learner has advanced to at least generation 3 and the dot-field is mostly two solid colours.
- Interaction: step button "self again" on a field of 32 plants; counts of AA/Aa/aa shown as colours.
- Payoff: Selfing turns hidden variation into pure lines, fast.
- Claims to check: selfing recursion (Hartl & Clark 2007); no selection, complete selfing (convention).

### 36. purging-slows-down · concept: purging-recessives · stretch · demand 2
- Learner knows: hidden carriers (brief 13) / does not know: selection against a fully harmful recessive gets very slow when rare.
- Misconception: A lethal recessive allele disappears in a few generations.
- Prediction: "A made-up recessive allele is lethal in two copies and neutral in one. It is 10% of the copies in a large random-mating population. About how many generations until it falls to 1%?" options: A. About 10 / B. About 90 / C. About 900 (answer: B). Check: q' = q/(1+q), so 1/q grows by 1 per generation: 100 - 10 = 90 (iterated in node).
- Key state: the learner has run long enough that the allele count has dropped to ~1% and the hidden-carrier share is still visible.
- Interaction: scrub generations over a dot-ring with affected vs carrier colours.
- Payoff: When rare, nearly all copies hide in carriers and escape selection.
- Claims to check: q_{t+1} = q_t/(1+q_t) (Hartl & Clark 2007 ch. 5); large population, random mating, no new mutations (convention).

### 37. offspring-regress · concept: heritability-response · core · demand 2
- Learner knows: selection (taught) / does not know: offspring of selected parents move only part of the way.
- Misconception: If only the tallest plants breed, the next generation averages as tall as the parents.
- Prediction: "Plants average 100 cm. Breeders keep only plants averaging 110 cm and cross them at random. If 40% of height variation is inherited (heritability 0.4), the offspring average about: A. 110 cm / B. 104 cm / C. 100 cm (answer: B)." Check: response = h2 x selection = 0.4 x 10 = 4; node simulation of 400,000 plants showed 4.6 for selection differential 11.6 (predicted 4.64).
- Key state: the learner has dragged heritability to at least two values and sees the offspring dots slide a different fraction of the way.
- Interaction: slider for heritability; a dot-cloud (parent vs offspring height) with the cutoff line drag-able.
- Payoff: Selection moves the average by the heritable share of the gap.
- Claims to check: breeder's equation R = h2 S (Falconer & Mackay 1996); additive genes, random mating among selected (convention); numbers invented.

### 38. one-beetle-a-generation · concept: gene-flow · stretch · demand 2
- Learner knows: drift (brief 9) / does not know: a trickle of migrants prevents populations from drifting apart.
- Misconception: Small populations always diverge.
- Prediction: "Two beetle populations of 50 each, colours neutral, start identical (half red). With no travel, they drift to fixed colours and differ more than half the time. If one beetle swaps each way per generation, how often do their red shares differ by more than half?" options: A. About half the time / B. About one time in ten / C. Almost never (answer: C). Check: node Wright-Fisher run, 200 replicates: 0 migrants 50%, 1 migrant 0.1%, 5 migrants 0%.
- Key state: the learner has run both settings (no migrants, 1 migrant) and compared the two lanes' colour traces.
- Interaction: toggle migrants per generation (0, 1, 5) over a pair of side-by-side dot-populations.
- Payoff: One migrant per generation is enough to hold two small groups together.
- Claims to check: Wright's result that Nm > 1 prevents fixation of different alleles (Wright 1931; Hartl & Clark 2007 ch. 6); simulation settings stated; neutral alleles, two demes (convention).

### 39. costly-resistance · concept: antibiotic-resistance · core · demand 2
- Learner knows: resistance is already present (brief 17) / does not know: resistance can carry a growth cost, but removing the drug does not erase it quickly.
- Misconception: Once the drug is gone, resistant bacteria vanish.
- Prediction: "In a dish with no drug, 10% of cells are resistant and grow 5% slower each generation. After 20 generations the resistant share is about: A. 0% / B. About 4% / C. Still 10% (answer: B). Check: 0.1 x 0.95^20 / (0.9 + 0.1 x 0.95^20) = 3.8%."
- Key state: the learner has run at least 20 generations and sees the resistant dots dwindle but not vanish.
- Interaction: generation step on a dot-dish; slider for the growth cost (0-10%).
- Payoff: A cost shrinks the resistant share slowly, so resistance lingers.
- Claims to check: fitness costs of resistance exist and can be offset by compensating mutations (Andersson & Hughes 2010, Nat. Rev. Microbiol.); arithmetic; fixed 5% cost is invented. Model only, no treatment advice.

### 40. one-resource-one-winner · concept: competitive-exclusion · core · demand 2
- Learner knows: logistic growth / does not know: with one limiting resource, the species needing less wins.
- Misconception: Both competitors settle at some shared balance.
- Prediction: "Two plant species share one nutrient and die at the same rate. Species A can hold its numbers steady at 2 units of nutrient; B needs 5. In the long run: A. both coexist / B. A takes over / C. B takes over (answer: B)." Check: node chemostat run: A = 18.0, B = 1e-321, resource = 2.0 = A's break-even.
- Key state: the learner has run time until B's dots visibly fall away while the nutrient level sits at A's break-even.
- Interaction: scrub time; drag the nutrient need of B from 5 down to 2 to see the winner flip. One representation: two dot-colour populations on a nutrient gauge.
- Payoff: The species that can live on less drives the resource below the other's needs.
- Claims to check: R* rule (Tilman 1982; Gause 1934); single limiting resource, constant environment (convention); real coexistence is possible with several resources (stated).

### 41. quiet-decades-then-everywhere · concept: invasion-lag · intro · demand 2
- Learner knows: exponential growth / does not know: most of the time to fill a region is spent invisible.
- Misconception: Halfway through the time, the species covers half of its eventual range.
- Prediction: "100 invasive plants grow 20% a year until the region holds 1,000,000. At the halfway point in time (year 25), what share of that final number is there?" options: A. About 1% / B. About 25% / C. About 50% (answer: A). Check: 100 x 1.2^25 = 9,540 (0.95%); the full climb takes 50.5 years.
- Key state: the learner has scrubbed to the halfway year and sees how thin the dot map is.
- Interaction: scrub years on a map of dots; a "year 40" marker shows the late jump.
- Payoff: Exponential growth looks harmless until it is late.
- Claims to check: arithmetic; unlimited exponential growth until a fixed cap (convention); real invasions have lags for several reasons (Crooks 2005; verify).

### 42. count-the-marked-fish · concept: mark-recapture · intro · demand 2
- Learner knows: ratios / does not know: how to count animals nobody can see all of.
- Misconception: The number you catch is roughly the population.
- Prediction: "100 fish are caught, marked and released. Later 50 are caught, and 5 are marked. About how many fish are in the lake?" options: A. About 500 / B. About 1,000 / C. About 2,000 (answer: B). Check: 100 x 50 / 5 = 1,000.
- Key state: the learner has drawn two or more recapture samples and sees marked share vary around the true share.
- Interaction: tap to net a sample from a pond of dots; marked dots light up; the estimate readout updates.
- Payoff: The marked share in a sample estimates the marked share in the lake.
- Claims to check: Lincoln-Petersen estimate N = MC/R (Seber 1982); assumes closed population, random mixing, marks not lost (convention).

### 43. cell-shrinks-in-brine · concept: osmosis · core · demand 2
- Learner knows: diffusion / does not know: water moves toward the more concentrated side until concentrations balance.
- Misconception: Salt moves into the cell and the cell swells.
- Prediction: "A cell holds 0.3 units of dissolved stuff per volume. It is put in a bath with 0.6, and only water can pass through. It ends up about: A. the same size / B. half its volume / C. a quarter of its volume (answer: B)." Check: V x 0.6 = 1 x 0.3, so V = 0.5.
- Key state: the learner has set the bath to a stronger concentration and watched the cell dot shrink.
- Interaction: slider for bath concentration; one cell outline shrinks or swells.
- Payoff: Water follows concentration until the two sides match.
- Claims to check: van't Hoff ideal osmometer relation (source to confirm, e.g. Nelson, Biological Physics); ignores the cell's non-water volume and walls, so real cells shrink less (stated); idealised.

### 44. pcr-not-quite-doubling · concept: pcr-amplification · intro · demand 2
- Learner knows: doubling / does not know: a slightly lower per-cycle factor compounds into a large shortfall.
- Misconception: 90% efficient copying gives about 90% of the perfect result.
- Prediction: "One DNA molecule, 30 cycles. A perfect cycle doubles the count. If each cycle is 90% efficient (x1.9), the final count compared with perfect is about: A. 90% / B. 50% / C. 20% (answer: C)." Check: (1.9/2)^30 = 0.215.
- Key state: the learner has set efficiency to 90% and seen the two curves separate by cycle 30.
- Interaction: slider for efficiency (80%-100%) with scrub over cycles; two log-ish curves of dots.
- Payoff: A small shortfall each cycle compounds.
- Claims to check: arithmetic: 1.9^30 = 2.3e8 vs 2^30 = 1.07e9; PCR is a doubling process in the exponential phase (Saiki et al. 1988); efficiency fixed, no plateau (convention).

### 45. thermostat-leftover · concept: negative-feedback · intro · demand 2
- Learner knows: a heater makes warmth / does not know: proportional feedback leaves a steady error.
- Misconception: A control system returns exactly to the target.
- Prediction: "An egg incubator is set to 37. The room is 5 colder. The heater adds heat in proportion to how far below target it is, with gain 4. The steady temperature is: A. 37 / B. 36 / C. 32 (answer: B)." Check: T = (32 + 4 x 37)/5 = 36 (Euler run in node).
- Key state: the learner has raised the gain and seen the leftover gap shrink but not hit zero.
- Interaction: slider for gain; a temperature trace dot settling toward a target line.
- Payoff: Stronger feedback shrinks the error as 1/(1+gain) but a proportional rule cannot erase it.
- Claims to check: proportional steady-state error d/(1+g) (control theory; Astrom & Murray, Feedback Systems); body temperature control uses more than proportional control (stated); model has one lag-free loop.

### 46. clock-counts-both-branches · concept: molecular-clock · core · demand 1 [exploration]
- Learner knows: mutations accumulate (brief 33) / does not know: differences between two species build up along both lines.
- Misconception: Two species differing by 1.2% split when one line gained 1.2%.
- Prediction: "Two species differ at 1.2% of letters. Each line changes at 0.1% per million years. When did they split? A. 3 million years ago / B. 6 million years ago / C. 12 million years ago (answer: B)." Check: 1.2 / (2 x 0.1) = 6.
- Key state: exploration; the learner paints changes on both branches of a fork and the clock reads the sum.
- Interaction: drag the fork point back in time; difference readout is the dot count along both branches.
- Payoff: Differences are counted on both branches, so the split is half as old as one line suggests.
- Claims to check: divergence = 2 x rate x time (Zuckerkandl & Pauling 1965); constant rate, no repeat hits (convention); rate is invented.

### 47. virulence-sweet-spot · concept: virulence-tradeoff · stretch · demand 1 [exploration]
- Learner knows: R0 / does not know: harm and spread can pull against each other.
- Misconception: Evolution makes germs either harmless or deadly.
- Prediction: "Toy germ: a strain's harm v removes carriers at rate v per day on top of 1 per day recovery, and it spreads in proportion to 4 x square root of v. Which v gives highest R0? A. 0.25 / B. 1 / C. 4 (answer: B)." Check: R0 = 4 sqrt(v)/(1 + v): 1.6, 2.0, 1.6 (grid search in node peaks at v = 1).
- Key state: exploration; the learner has tried at least three harm values and seen R0 rise then fall.
- Interaction: drag the harm dial; one curve with a moving dot.
- Payoff: In this toy, more spread comes with shorter infections, so the best strain sits in the middle.
- Claims to check: trade-off model (Anderson & May 1982; Alizon et al. 2009); square-root link is chosen; real germs show varied outcomes and the theory is debated (stated).

### 48. pink-from-red-white · concept: genetic-inheritance · intro · demand 1 [exploration]
- Learner knows: dominant/recessive / does not know: some traits blend, and a cross of two blends gives a half-half result.
- Misconception: Red x white always gives red or white, never a mix; pink x pink gives all pink.
- Prediction: "In a made-up flower, one copy of each allele gives pink. Two pink parents are crossed. What share of seeds grow pink? A. All / B. Half / C. None (answer: B)." Check: enumeration: RR 1, RW 2, WW 1 out of 4, so pink = 1/2.
- Key state: exploration; the learner has dropped seed after seed into pots and seen red, pink, white at about 1:2:1.
- Interaction: drag allele chips into a seed; colour shown by the pair.
- Payoff: With incomplete dominance the genotype shows directly in the colour.
- Claims to check: incomplete dominance example (snapdragon, Griffiths); invented flower.

### 49. silent-letter-swaps · concept: genetic-code-redundancy · intro · demand 2 [exploration]
- Learner knows: DNA has letters / does not know: many single-letter changes do not change the protein.
- Misconception: Any change in the code changes the protein.
- Prediction: "Take every single-letter change to a codon that codes for an amino acid (549 changes). About how many leave the amino acid unchanged? A. About 2% / B. About 25% / C. About 75% (answer: B)." Check: standard code table in node: 134 synonymous, 392 changed, 23 to stop; 134/549 = 24%.
- Key state: exploration; the learner has tapped through a codon wheel of changes and seen a quarter stay the same colour.
- Interaction: tap a letter of a codon to cycle it; coloured outcome (same, new, stop).
- Payoff: The code has built-in slack, mostly in the third letter.
- Claims to check: standard genetic code (Nirenberg; Alberts, Molecular Biology of the Cell); synonymous counts above are from the table; the codon is a model, not about any particular gene.

### 50. tree-count-explodes · concept: phylogeny-tree-count · stretch · demand 1 [exploration]
- Learner knows: species relate in trees / does not know: the number of possible trees explodes with species count.
- Misconception: With 10 species, one can check all possible family trees.
- Prediction: "How many different rooted branching trees can connect 10 named species? A. About 1,000 / B. About 100,000 / C. About 34 million (answer: C)." Check: (2n-3)!! with n = 10 is 17 x 15 x ... x 3 = 34,459,425.
- Key state: exploration; the learner has added species one by one and seen the number of attachment points grow at each step.
- Interaction: tap to add the next species to any branch of the current tree; count of places to attach shown as dots on branches.
- Payoff: Each species can attach at more places than the last, so counting trees multiplies.
- Claims to check: (2n-3)!! count of rooted binary labelled trees (Felsenstein 2004, Inferring Phylogenies); only binary trees counted (stated).

### 51. below-the-threshold-crash · concept: allee-effect · stretch · demand 1 [exploration]
- Learner knows: logistic growth (brief 10) / does not know: some populations shrink when too small.
- Misconception: Any population, however small, will grow back if left alone.
- Prediction: "Animals need at least 50 in a group to find mates, otherwise numbers fall. Two groups start with 40 and 60, with room for 1,000. After many years: A. both reach 1,000 / B. 40 dies out, 60 grows / C. both die out (answer: B)." Check: node Euler run of dN/dt = 0.1 N (N/50 - 1)(1 - N/1000): 40 goes to 0, 60 to 1,000.
- Key state: exploration; the learner has released groups on both sides of the line and seen opposite fates.
- Interaction: tap along a number line to release a founding group; a dot trail shows growth or decline.
- Payoff: A threshold splits the same species into recover or vanish.
- Claims to check: strong Allee effect model (Courchamp, Berec & Gascoigne 2008); the threshold of 50 and rate are invented.

### 52. overshoot-from-delay · concept: logistic-growth · intro · demand 1 [exploration]
- Learner knows: S-curve (brief 10) / does not know: delayed feedback causes boom and bust.
- Misconception: Logistic growth always settles smoothly at its limit.
- Prediction: "A population responds to food that was counted 4 years ago and grows at 0.5 per year. Long run: A. settles at the limit / B. swings far above and below it repeatedly / C. dies out (answer: B)." Check: node delay-logistic r = 0.5, tau = 4 (r x tau = 2 > pi/2): max 2.9 times the limit, min 0.07; with r = 0.2 it settles.
- Key state: exploration; the learner has dragged the delay slider through the value where the settled line starts to swing.
- Interaction: slider for delay; population trace that changes character.
- Payoff: Slow feedback makes a stable system oscillate.
- Claims to check: Hutchinson delay logistic, oscillates when r x tau > pi/2 (Murray, Mathematical Biology I); real reindeer or lemming booms have other causes (stated).

### 53. potassium-battery · concept: membrane-potential · stretch · demand 1 [exploration]
- Learner knows: diffusion / does not know: an ion gradient across a membrane makes a voltage.
- Misconception: Charged particles stop moving when concentrations are equal.
- Prediction: "A cell holds 140 mM potassium inside and 5 mM outside; only potassium can leak through. At body temperature the voltage is about: A. -9 mV / B. -90 mV / C. -900 mV (answer: B)." Check: (RT/F) ln(5/140) = 26.7 mV x (-3.33) = -89 mV.
- Key state: exploration; the learner has leaked ions across until the electrical push balances the concentration push and nothing moves net.
- Interaction: drag the outside concentration; ions drawn as dots against a charge bar.
- Payoff: Diffusion builds an electrical pull that stops it.
- Claims to check: Nernst equation, 37 C (Hille, Ion Channels of Excitable Membranes); typical K+ concentrations (Alberts); only K+ permeable (convention).

### 54. hemoglobin-s-curve · concept: oxygen-binding · stretch · demand 1
- Learner knows: saturation / does not know: cooperative binding makes release steep near tissue pressures.
- Misconception: Oxygen carriers fill and empty along a gentle curve.
- Prediction: "A carrier with one site and half-point 26.8 mmHg would lose about 17 points of saturation when local oxygen falls from 40 to 20 mmHg. The real, cooperative carrier loses about: A. the same / B. 2.5 times as much / C. 10 times as much (answer: B)." Check: Hill n = 2.7, P50 = 26.8: 75% to 31% = 43 points vs 60% to 43% = 17 points; ratio 2.5.
- Key state: the learner has dragged oxygen pressure from 100 to 20 and seen the steep part of the curve.
- Interaction: drag along the saturation curve; sites drawn as four dots filling.
- Payoff: Cooperation makes the carrier let go most where oxygen is scarce.
- Claims to check: Hill equation parameters for adult human haemoglobin (n about 2.7, P50 about 26.6 mmHg; Dash et al., Bioeng. Rev.; verify); physiology fact, no clinical use.

### 55. protein-search-space · concept: protein-search-space · stretch · demand 1 [exploration]
- Learner knows: proteins are chains / does not know: how astronomically many shapes a chain could take.
- Misconception: A chain can find its shape by trying them all.
- Prediction: "A chain of 100 links with 3 possible bends per link has how many shapes? A. About 300 / B. About a trillion / C. About 5 followed by 47 zeros (answer: C). Check: 3^100 = 5.15e47; at 10^13 tries a second it would take about 1.6e27 years."
- Key state: exploration; the learner has added links one by one and seen the count multiply, then compares with the age of the universe.
- Interaction: tap "add link" to build a chain; shape count shown as a doubling pile of dots on a log ruler.
- Payoff: Folding cannot be a blind search; real proteins follow guided paths.
- Claims to check: Levinthal (1969); 3 states per link is a simplification; folding funnel resolution (Dill & Chan 1997, Nat. Struct. Biol.); age of the universe about 1.4e10 years (source: Planck 2018).
