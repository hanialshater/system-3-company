# Genetics & Evolution briefs (cm-life-genetics-evolution)

Ranked briefs for this strand, in the same format as `life.md` (`### N. slug · concept: <id> · level · demand N`). `tools/claim.mjs next life` hands these out after the domain's own list. Check every brief's answer in node before adding it.

## Course: NCM (2026-10-14)

Re-checked by cm-life-genetics-evolution on 2026-10-14. Source text: company/courses/ncm/briefs.md "### life.genetics-evolution". All answers re-run in node (replicator update x' = x·f/mean f). Section numbers stay unconfirmed; `curriculum.references` rows cite chapter 7 / 21 only.

### 1. hawks-never-take-over · concept: life:hawk-dove-ess · core · demand 3 · format: Single card (start-share slider drives live chart)
- Accepted. Node: V=4, C=6 gives HH −1, HD 4, DH 0, DD 2; equal fitness at hawk share 2/3; replicator with baseline 10 reaches 0.6667 from 10% and from 90%.
- Prediction is a real surprise (the common belief is hawks win outright). Option C ("depends on the start") is a fair distractor.
- Overlap: economics:hawk-dove-chicken (one-shot, two players) and life/strategy-builder (repeated PD). This brief is the population view with an interior ESS. Keep the cross-reference in the reveal path.
- Brief text: see company/courses/ncm/briefs.md, brief 1 (planned claims 1–3 as written).

### 2. bigger-beetles-everyone-loses · concept: life:ess-arms-race · core · demand 2 · format: Single card (generation step, share chart)
- Accepted with edits. Node (payoff = offspring, no baseline): large always ahead (8>6, 4>2); 1% large reaches 99% at generation 24; 4.1% at 5, 16.3% at 10, 93.1% at 20; all-small 6, all-large 4. With a baseline of 10 it would take 69 generations, so the card must say there is no baseline.
- Edit 1: the prediction as written is predictable, because large beats small in both columns. The surprise is the average score. Ask: "A few large beetles appear. After they take over, what is the population's average score, compared with 6 now?" options: A. Higher / B. The same / C. Lower (answer: C, 4). Keep the share chart as the explore step.
- Edit 2: claim 2 and the stage must state "payoff = surviving offspring, no baseline".
- Overlap: economics:prisoners-dilemma has the same payoff shape. Differs: this is a population dynamic with an ESS and no choice by players. Do not use PD wording on the card. It is not a duplicate of strategy-builder.

### 3. all-lines-meet-in-one-mother · concept: life:coalescent-mrca · core · demand 2 · format: Storyboard / scrub (lineages traced back) · needs interaction-designer spec
- Accepted with edit. Node: haploid Wright–Fisher, N=50, seeds 7001–8000, each generation every distinct line picks a random mother among 50: mean 96.03 generations; formula 2N(1−1/N) = 98.
- Edit: claim 2 should call 98 an approximation to the exact discrete model (96 simulated), not an exact expectation.
- Prediction is a real surprise (option A "never meet" is the common intuition). Nearest: life/same-genes-different-drift (forward drift). Same model run backward, so cite it.
- Prerequisite life:genetic-drift is present.

### 4. stable-until-mutants-meet · concept: life:nash-not-ess · stretch · demand 1 · format: Single card (generation step, share chart)
- Accepted with edit. Node (payoff = offspring, no baseline): AA is Nash; E(B,A)=E(A,A)=2 and E(B,B)=3 > E(A,B)=1, so not an ESS; B: 1% to 1.1% at generation 10, 2.0% at 50, 21% at 100, 99% at 111. With a baseline of 10 B reaches only 1.2% by 400 generations, so the card must say there is no baseline.
- Edit: state "payoff = surviving offspring, no baseline" in the stage and in claims 1–3; the learner knows ESS only after brief 2, so keep the prerequisite as ess-arms-race.
- Prediction is a real surprise (slow, then fast). Nearest: bigger-beetles (an ESS); this one fails the ESS test.

## Spare-capacity batch (cm-life, 2026-10-14)

Batch notes and ranking: see the same-named section in `life.ecology-body.md`. Re-run in node by cm-life on 2026-10-14.

### 5. twenty-cultures-twenty-plates · concept: life:mutation-randomness · core · demand 2 · rank 4 · format: Simulation run (seeded, 20 plates, rule chips)
- Why this one next: `mutation-randomness` (demand 2) and `luria-delbruck` (demand 1) are both uncovered. The fluctuation test is the experiment behind both, and it is a natural simulation.
- Audience / knowledge boundary: has seen `antibiotic-already-there`, which states that resistant cells can exist before a drug. Does not know how anyone could tell "random mutations before the drug" from "the drug makes cells resistant": the two ideas predict different spreads of counts across identical cultures.
- Misconception: "Mutations happen when the cell needs them. The drug makes some cells resistant." Its testable form: identical cultures should then give similar counts.
- Prediction (stage text, 23 words): "20 identical cultures each grow from one cell to about a million. Resistance mutations strike at random during divisions, about once per million." Question: "Each culture is spread on a drug plate. How do the 20 counts of resistant colonies compare?" options: A. About the same on every plate / B. Most plates have few or none, one or two have many / C. About half have none, the rest about the same (answer: B). No option has a number. The locked stage shows 20 empty plates and no bars.
- Model (state on the card): 20 generations of doubling (2^20 = 1,048,576 cells). At each division a non-mutant cell gives a resistant daughter with chance 1/2^20, and every descendant of a resistant cell is resistant. Rule "made by the drug": no mutations during growth; on the plate each cell turns resistant with chance 10/2^20, chosen so both rules average about 10 per plate. Seeded mulberry32, seed shown, Run draws a new seed.
- What the stage shows: one row of 20 plate bars (resistant colony count, linear axis to 40; a taller bar is drawn broken with its number printed on it). Controls (3): chips "Random, while growing" (start) and "Made by the drug", and Run. A readout under the bars: "plates with none: k · largest: m".
- Key state: the learner has run each rule at least once, so both bar rows have been seen. Reveal unlocks after both.
- Check (node, re-run 2026-10-14, Poisson events per generation): seed 1, while growing: [1,32,6,0,0,0,8,0,0,128,1,3,0,2,8,1,0,0,0,16], 9 plates with none, largest 128, mean 10.3, variance/mean 80; made by the drug: 0 plates with none, range 6 to 15, mean 9.7, variance/mean 0.7. Over 10,000 runs of 20 plates (seed 99): while growing, 95.9% of runs had a largest plate at least 5 times the median (median variance/mean 9.8); made by the drug, none did (median variance/mean 1.0). Expected mean while growing: 20 × 2^19 / 2^20 = 10.
- Reveal draft (≤ 90 words; 64 words, numbers from the learner's own run; seed 1 shown): "In your run, 9 plates had none and one had 128. A mutation early in growth was copied into every descendant: a jackpot. When the drug made the mutations, every plate got a similar count (6 to 15). Luria and Delbrück found jackpots like these in 1943. That was evidence that resistance mutations arise at random before the drug, not in answer to it."
- Phone fit (390×844): 20 bars at ≥ 14 px each fit 390 px with gaps; chips and Run in one row below. The reveal points at the bar row and the readout, which sit at the top of the stage.
- Planned claims:
  1. Under the random-while-growing rule, counts across 20 identical cultures are very uneven. In the seed-1 run: 9 of 20 had none and one had 128; across 10,000 seeded runs, 95.9% had a plate at least 5 times the median. support: simulation; source: node, mulberry32, seeds 1 and 99, rerunnable.
  2. Under the made-by-the-drug rule with the same average, counts are similar (variance about equal to the mean, as for a Poisson count). support: simulation + derivation; source: node seed 99; Poisson variance = mean.
  3. A mutation in generation g is inherited by 2^(20 − g − 1) cells by the end, so early mutations make large clones. support: derivation.
  4. Luria and Delbrück (1943, "Mutations of bacteria from virus sensitivity to virus resistance", Genetics 28: 491–511) observed this high variance across parallel cultures, and read it as evidence that mutations arise before selection. support: source. **Unverified: needs a human source check by the fact-checker, including the citation details. Their selective agent was a bacteriophage, not an antibiotic, so the card must say "drug" only for the toy and name the virus if the 1943 sentence stays.** If the check fails, cut the 1943 sentence from the reveal; the lesson stands on claims 1 to 3.
  5. The rates, the 20 generations and "every non-mutant cell dies on the plate" are toy choices (convention).
- curriculum: `{"primary":"life:mutation-randomness","also":["life:luria-delbruck","life:antibiotic-resistance"],"prerequisites":["life:antibiotic-resistance"],"level":"core","strand":"genetics-evolution","tags":["mutation","fluctuation test","simulation"]}`
- Needs interaction-designer spec: no (Simulation run, kit support today; three controls).
- Differs from nearest: `antibiotic-already-there` states that resistant cells exist before the drug and counts them in one dish; this one compares many cultures to tell the two hypotheses apart. `children-new-mutations` counts new mutations per person, with no selection. `costly-resistance` is about what happens after the drug is removed.

## Wave J batch (cm-life, 2026-10-14)

Batch notes, ranking and QA conventions: see the same-named section in `life.ecology-body.md`. Numbers: `node company/domains/briefs/checks/life-wave-j-check.mjs`, labels G6 to G10.

### 6. five-chicks-for-a-sister · concept: life:kin-selection · stretch · demand 1 · rank 3 · format: Simulation run (relative and benefit preset buttons, 1,000 seeded helpers, copy tallies)
- Why this one next: `kin-selection` is uncovered with no brief. Helping relatives at a cost is the classic puzzle for "selection favours your own offspring", and counting gene copies makes Hamilton's rule a tally the learner watches, not a formula.
- Audience / knowledge boundary: has seen `natural-selection` (a gene spreads if its carriers leave more copies) and `one-in-four-sprouts` (a parent passes a given copy to half its young). Does not know that copies in a relative's young count too, discounted by the chance the relative carries the gene.
- Misconception: "A gene that makes you give up your own young for someone else's must die out. Selection only rewards having more offspring yourself."
- Prediction (stage text, 23 words): "A bird carries one copy of a helping gene. It raises 2 fewer chicks of its own, so its sister raises 5 more." Question: "Counting copies of the helping gene in all those chicks, what does helping do?" options: A. Loses copies / B. Breaks even / C. Gains copies (answer: C: about 1.25 gained for 1 lost). The locked stage shows the family (bird, sister, chick outlines) and empty tallies.
- Model (on the card): the bird got the gene from one parent, so its sister has a 1 in 2 chance of carrying it (a cousin 1 in 8, the usual relatedness); any carrier passes it to each chick with chance 1 in 2; mates do not carry it. 1,000 helpers per press, seeded (mulberry32, seed 7, reseeded per preset; shown).
- What the stage shows: one panel: the family with chick dots (filled = carries the gene) and two bars, "copies lost per helper" and "copies gained per helper". Controls in DOM order (3 buttons): "Sister, 5 chicks", "Sister, 3 chicks", "Cousin, 5 chicks". Each press runs 1,000 helpers within 400 ms.
- Milestones (minInteractions 2): m1 "sister, 5" (lost 1.00, gained 1.24), the question's case; m2 "a losing case seen" (sister 3: 1.02 vs 0.78, or cousin 5: 1.00 vs 0.31). QA path: sister 5, sister 3, cousin 5. The bars for the last press stay; the m1 values are recorded.
- Check (G6): seed 7, 1,000 helpers: sister 5 → lost 1.00, gained 1.24 (exact 1 and 1.25); sister 3 → 1.02 vs 0.78 (exact 0.75); cousin 5 → 1.00 vs 0.31 (exact 0.3125). Hamilton: r·B > C with r = 1/2, B = 5, C = 2 → 2.5 > 2; B = 3 → 1.5 < 2; cousin r = 1/8 → 0.625 < 2.
- Reveal draft (79 words, counted by script): "Helping the sister gained about 1.24 copies per helper and lost 1.00. Each of the bird's own chicks had a 1 in 2 chance of carrying the gene, so 2 fewer chicks cost about 1 copy. The sister carries it 1 time in 2, and then each chick 1 in 2: 1 in 4. Five chicks: 1.25. With 3 chicks, or a cousin's 5, helping lost copies. Help can spread when relatedness × benefit beats the cost: Hamilton's rule."
- Phone fit (390×844): family drawing and bars share one panel at the stage top; one button row. The reveal points at the two bars.
- Planned claims:
  1. In the lesson's simulation (seed 7, 1,000 helpers), helping a sister raise 5 extra chicks gains 1.24 gene copies per helper and costs 1.00. support: simulation; source: check script G6, seed disclosed.
  2. Expected copies: lost 2 × 1/2 = 1; gained 5 × 1/2 × 1/2 = 1.25 for a sister; 5 × 1/8 × 1/2 = 0.31 for a cousin; 3 × 1/4 = 0.75 for a sister's 3. support: derivation (Mendelian inheritance; relatedness 1/2 and 1/8).
  3. Hamilton's rule: a helping gene can spread when r·B > C (r relatedness, B and C in offspring). Here 0.5 × 5 = 2.5 > 2. support: derivation, equivalent to claim 2. Optional context: Hamilton 1964, "The genetical evolution of social behaviour", J. Theor. Biol. 7. **Unverified, needs a human source check; the name "Hamilton's rule" stays only if it passes.**
  4. One-off toy: one helping act, mates without the gene, no other effects of helping (convention, on the card).
- curriculum: `{"primary":"life:kin-selection","also":["life:natural-selection","life:genetic-inheritance"],"prerequisites":["life:natural-selection","life:genetic-inheritance"],"level":"stretch","strand":"genetics-evolution","tags":["altruism","relatedness","Hamilton's rule"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `strategy-builder` (evolution-of-cooperation) is reciprocity between unrelated players; `who-has-grandchildren` (Fisher sex ratio) counts grandchildren, not relatives' young; `hawks-never-take-over` has no relatedness. No lesson counts copies in a relative's offspring.

### 7. same-shape-different-genes · concept: life:convergent-evolution · intro · demand 1 · rank 4 · format: Single card (generation preset buttons, three silhouettes, one letter strip per lineage)
- Why this one next: `convergent-evolution` is uncovered with no brief. "Looks alike, so related" is the commonest misreading of similarity, and a seeded run can show shape and DNA parting ways on one stage.
- Audience / knowledge boundary: has seen `natural-selection`. Does not know that selection can pull unrelated lineages to the same shape, while DNA that does nothing keeps the record of descent.
- Misconception: "Animals that look alike must be close relatives."
- Prediction (stage text, 22 words): "A and C are close relatives. B is unrelated. A and B move into open water, where a slim body swims best." Question: "After 2,000 generations, what do A and B share?" options: A. Shape and DNA / B. Shape, but not DNA / C. Neither (answer: B). The locked stage shows the three starting silhouettes (A and C round, B in between) and the three letter strips.
- Model (on the card): body shape 0 (round) to 100 (slim). Each generation shape moves 0.2% of the way toward the best shape (90 in open water, 20 on the sea floor, where C stays) plus random noise (s.d. 0.3). Each lineage has 60 DNA letters that do nothing; each changes with chance 1 in 10,000 per generation. A and C start identical; B's letters are random. Seeded (mulberry32, seed 3; shown).
- What the stage shows: three silhouettes whose width follows shape, each with a 60-letter strip (letters matching A are filled). Readouts: "shape: A · B · C" and "letters matching A: B k of 60 · C m of 60". Controls in DOM order (3 buttons): "500 generations", "1,000 generations", "2,000 generations"; each shows the seeded run at that generation.
- Milestones (minInteractions 1): m1 "generation 2,000 seen", the question's case. QA path: 500, 1,000, 2,000.
- Check (G7): seed 3: generation 0: shapes 20/50/20, letters matching A: B 14, C 60. Generation 2,000: shapes A 83, B 92, C 17; letters matching A: B 16, C 38. Seeds 1 to 1,000 at 2,000: mean shape gap A–B 5.0, A–C 68.4; mean matching letters A–B 14.9 (chance 15), A–C 41.1.
- Reveal draft (70 words, counted by script): "At generation 2,000, A and B were nearly the same shape (83 and 92), yet only 16 of 60 DNA letters matched, about what two random strings share (15). C, A's close relative, looked nothing like A (17), yet 38 letters still matched. Selection pulled both bodies toward the shape that swims best. Letters that do nothing only record who descends from whom. Looking alike can be convergence, not kinship."
- Phone fit (390×844): three silhouettes in one row with their strips beneath (60 letters at ≥ 5 px marks per strip, matching shown by fill, letters not printed); readouts above. One button row.
- Planned claims:
  1. In the lesson's run (seed 3), after 2,000 generations A and B have shapes 83 and 92 while 16 of 60 neutral letters match; A and C have shapes 83 and 17 while 38 match. support: simulation; source: check script G7, seed disclosed.
  2. Two random strings of 60 letters from 4 match in 15 places on average. support: derivation (60 × 1/4).
  3. Across 1,000 seeds, A and B end within 5 shape points on average while matching 14.9 letters; A and C end 68 apart while matching 41. support: simulation; source: G7.
  4. Optional context, not on the card unless verified: dolphins (mammals) and sharks (fish) are a textbook case of a shared streamlined shape from different ancestors. **Unverified, needs a human source check.**
  5. Shapes, rates and noise are invented (convention, on the card).
- curriculum: `{"primary":"life:convergent-evolution","also":["life:natural-selection","life:molecular-clock"],"prerequisites":["life:natural-selection"],"level":"intro","strand":"genetics-evolution","tags":["convergence","similarity","descent"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `clock-counts-both-branches` uses neutral differences to date a split (no selection on shape); `same-genes-different-drift` is drift in identical starts; `natural-selection` is one lineage. This one sets selection on shape against neutral letters across lineages.

### 8. many-genes-smooth-curve · concept: life:polygenic-traits · intro · demand 3 · rank 6 · format: Simulation run (gene-count preset buttons, 1,000 seeded plants, one histogram)
- Why this one next: demand 3. "Genes come in either/or forms, so a smooth trait like height cannot be mostly genetic" is a widespread confusion, and it resolves on one histogram in three presses.
- Audience / knowledge boundary: has seen `one-in-four-sprouts` (one gene, either/or types). Does not know that many either/or genes, each adding a little, give a single smooth hump.
- Misconception: "If each gene comes in a tall or short form, plants come in tall and short types."
- Prediction (stage text, 24 words): "A plant's height is set by 10 genes. Each comes in a tall or short form, 50:50, and each tall form adds 2 cm." Question: "In 1,000 plants, what does the spread of heights look like?" options: A. Two groups: tall and short / B. 11 equal-sized groups / C. One hump: most near the middle, few at the ends (answer: C). The locked stage shows empty histogram axes, no bars.
- Model (on the card): base height 50 cm; each gene independently gives the tall form with chance 1/2; each tall form adds 2 cm; no soil or weather effect. 1,000 plants, seeded (mulberry32, seed 5, reseeded per preset; shown).
- What the stage shows: one histogram (height in cm, bars labelled ≥ 10 px). Readout: "within 2 cm of the middle: k of 1,000 · at either end: m". Controls in DOM order (3 buttons): "1 gene", "2 genes", "10 genes".
- Milestones (minInteractions 2): m1 "1 gene seen" (472 / 528, two groups); m2 "10 genes seen" (the question's case). QA path: 1, 2, 10.
- Check (G8): seed 5: 1 gene 472/528; 2 genes 251/488/261; 10 genes 4, 6, 56, 104, 184, 268, 220, 110, 39, 9, 0, so 672 within 2 cm of the middle (expected 65.6%) and 4 at either end (expected about 2). All 10 tall: 1 in 1,024.
- Reveal draft (71 words, counted by script): "With 1 gene you saw two groups, like Mendel's peas. With 10 genes the heights made one hump: 672 of your 1,000 plants were within 2 cm of the middle, and only 4 were at either end. All 10 tall forms together happen once in 1,024 plants. Many either/or genes, each adding a little, make a smooth spread. Real height also depends on soil and weather, which blur the steps further."
- Phone fit (390×844): one histogram with the readout above, one button row. The reveal points at the bars and the readout.
- Planned claims:
  1. In the lesson's run (seed 5), with 10 genes 672 of 1,000 plants fall within 2 cm of the middle and 4 at the extremes; with 1 gene the plants split 472/528. support: simulation; source: check script G8, seed disclosed.
  2. The number of tall forms out of 10 is binomial: the middle three values hold 672/1,024 = 65.6% and all-tall has chance 1/1,024. support: derivation.
  3. "Real height also depends on soil and weather" is general context. **Unverified as sourced; cut the sentence if the fact-checker cannot support it.** Optional context, not on the card: Fisher 1918 reconciled Mendelian genes with continuous traits. **Unverified.**
  4. Equal 2 cm effects and 50:50 forms are invented (convention, on the card).
- curriculum: `{"primary":"life:polygenic-traits","also":["life:genetic-inheritance","probability:central-limit"],"prerequisites":["life:genetic-inheritance"],"level":"intro","strand":"genetics-evolution","tags":["genes","continuous traits","binomial"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `probability/averages-turn-bell-shaped` (central limit with dice) teaches the maths of sums; this one answers the genetics question of how either/or genes make a smooth trait. `one-in-four-sprouts` and `two-genes-one-in-sixteen` are one and two genes with ratios, not a spread. `offspring-regress` is heritability, not where the spread comes from.

### 9. never-more-than-half-apart · concept: life:recombination-fraction · core · demand 2 · rank 11 · format: Simulation run (gene-distance preset buttons, 100 seeded eggs, one chromosome diagram)
- Why this one next: linkage is the next step after Mendel's independent genes, and the ceiling at one half is a surprise a seeded run shows directly.
- Audience / knowledge boundary: has seen `two-genes-one-in-sixteen` (genes on different chromosomes sort independently). Does not know that genes on one chromosome are separated only by an odd number of crossovers between them, so even far-apart genes separate at most half the time.
- Misconception: "Genes far apart on the same chromosome are almost always separated: the farther apart, the closer to 100%."
- Prediction (stage text, 19 words): "Two genes on one chromosome. When an egg is made, the chromosome pair swaps pieces at random spots: crossovers." Question: "The genes sit at opposite ends, with about 3 crossovers between them on average. In 100 eggs, how often are the genes separated?" options: A. About 5 / B. About 50 / C. About 95 (answer: B). All options are numbers. The locked stage shows the two-coloured chromosome pair and the two gene marks, no counts.
- Model (on the card): the number of crossovers between the two genes is random (Poisson) with mean 0.05 (close), 0.5 (middle) or 3 (far ends), each falling independently; the genes end up separated when that number is odd. "Other chromosome": separated with chance 1/2. 100 eggs per press, seeded (mulberry32, seed 11, reseeded per preset; shown).
- What the stage shows: one chromosome pair with the crossover points of the last egg drawn, plus the tally "separated: k of 100". Controls in DOM order (4 buttons): "Close", "Middle", "Far ends", "Other chromosome".
- Milestones (minInteractions 2): m1 "far ends" (46), the question's case; m2 "other chromosome" (47). QA path: close, middle, far ends, other chromosome. Quoted values recorded at the milestone.
- Check (G9): seed 11: close 3, middle 29, far ends 46, other chromosome 47 of 100. 10,000 eggs: 4.5%, 31.4%, 50.1%. Exact (1 − e^(−2m))/2: 4.8%, 31.6%, 49.9%.
- Reveal draft (70 words, counted by script): "At the far ends, 46 of your 100 eggs had the genes separated, about the same as genes on different chromosomes (47). Only an odd number of crossovers between two genes separates them: one splits them, a second rejoins them. With many crossovers, odd and even are about equally likely, so separation tops out near a half. Close genes almost always travel together (3 of 100). Toy: crossovers fall independently."
- Phone fit (390×844): the chromosome pair and the tally fit one panel; one button row (four short labels). The reveal points at the tally and the crossover marks.
- Planned claims:
  1. In the lesson's run (seed 11, 100 eggs each), genes with 3 crossovers between them on average separate in 46 eggs, close genes in 3, genes on different chromosomes in 47. support: simulation; source: check script G9, seed disclosed.
  2. With crossovers falling independently at mean m between two genes, the chance of an odd number is (1 − e^(−2m))/2, which never exceeds 1/2 (49.9% at m = 3). support: derivation (Poisson parity). Optional context: this is Haldane's 1919 map function. **Unverified, needs a human source check.**
  3. Real crossovers are not fully independent (nearby crossovers are suppressed), which the toy ignores (convention; **context sentence unverified, keep it off the card unless checked**).
- curriculum: `{"primary":"life:recombination-fraction","also":["life:genetic-inheritance"],"prerequisites":["life:genetic-inheritance"],"level":"core","strand":"genetics-evolution","tags":["linkage","crossovers","parity"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `two-genes-one-in-sixteen` assumes independent sorting; `one-beetle-a-generation` is gene flow between populations. No lesson teaches linkage (grepped "recombin", "crossover").

### 10. clones-take-over-fast · concept: life:cost-of-sex · stretch · demand 2 · rank 12 · format: Single card (generation preset buttons, one share-over-generations chart)
- Why this one next: why sex exists is a famous open problem, and its starting point, the twofold cost of males, is a misconception (equal young means equal success) that a doubling chart breaks in three presses.
- Audience / knowledge boundary: has seen `natural-selection` and `who-has-grandchildren`. Does not know that a female who makes only daughters, with no male needed, doubles her line's share each generation while it is rare.
- Misconception: "A female who raises as many young as everyone else does no better than they do."
- Prediction (stage text, 23 words): "1,000 females, 1,000 males. Every female raises 2 young, half of them sons. One mutant female needs no mate and has only daughters." Question: "Her daughters are copies like her. How many generations until half of all females are copies?" options: A. Never: she raises no more young / B. About 100 / C. About 10 (answer: C, generation 10). The locked stage shows empty axes (0 to 100% of females, generations 0 to 20), with no 50% line.
- Model (on the card): every female raises exactly 2 young that survive; a normal female's are 1 son and 1 daughter, a copier's are 2 daughters; numbers are held steady, so only shares change. Share of copiers among females x' = 2x/(1 + x), starting at 1 in 1,000. Deterministic.
- What the stage shows: one line chart of copiers' share of females, readout "generation g: copies are p% of females". Controls in DOM order (3 buttons): "To generation 5", "To generation 10", "To generation 20"; each draws the line to that generation.
- Milestones (minInteractions 1): m1 "generation 10 seen" (50.6%), the question's case. QA path: 5, 10, 20; the readout values for 10 and 15 are recorded when the line passes them.
- Check (G10): 0.1, 0.2, 0.4, 0.8, 1.6, 3.1, 6.0, 11.4, 20.4, 33.9, 50.6 (generation 10), 67.2, 80.4, 89.1, 94.3, 97.0 (15) … 99.9 (20).
- Reveal draft (70 words, counted by script): "By generation 10 copies were 51% of females, and 97% by generation 15. Every female raised 2 young, but a normal female's son cannot have young himself, so only 1 of her 2 carries her line forward. The copier's 2 are both daughters, so her line doubles each generation while it is rare. That is the twofold cost of males. Why sex is so common anyway is a long-debated question."
- Phone fit (390×844): one chart with the readout above it; one button row. The reveal points at the line and readout.
- Planned claims:
  1. In the model, copiers rise from 1 in 1,000 females to 50.6% at generation 10 and 97.0% at generation 15. support: arithmetic; source: check script G10 (x' = 2x/(1 + x)).
  2. While rare, the copiers' share of females roughly doubles each generation because all their young are daughters, against one daughter per normal female. support: derivation.
  3. Optional context: "the twofold cost of males" (Maynard Smith 1978, The Evolution of Sex) and "why sex is common is a long-debated question". **Unverified, needs a human source check; if it fails, the reveal's last two sentences become "The model ignores everything sex might be good for."**
  4. Equal fertility, no male care and no other benefit of sex are toy assumptions (convention, on the card).
- curriculum: `{"primary":"life:cost-of-sex","also":["life:natural-selection","life:sex-ratio-fisher"],"prerequisites":["life:natural-selection"],"level":"stretch","strand":"genetics-evolution","tags":["sex","reproduction","doubling"]}`
- Needs interaction-designer spec: no.
- Differs from nearest: `who-has-grandchildren` is why sons and daughters are made in equal numbers; `one-percent-edge` is a small advantage spreading slowly; this is a twofold advantage from not making sons. `dish-runs-out` is doubling with no competitor.
