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
