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
