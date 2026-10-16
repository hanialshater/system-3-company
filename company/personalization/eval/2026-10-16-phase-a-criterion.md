# Phase A pass criterion: GAM composer vs default order and vs draft rules (W-1496)

status: draft (unfrozen)
owner: personalization-eval (Uma) · run: eval-b1-1016 · brief: company/personalization/batches/2026-10-16-batch-1.md B1
freezes in: C1 (same batch), after the B2 placeholders are filled. Frozen = `status: frozen` plus the commit hash written into this file. Any change after a scored run is a new criterion, says so in the readout, and the old result stands (company/ceo-office/2026-10-16-personalization-org-proposal.md §2.3).
learner/scorer decision: company/personalization/eval/2026-10-16-learner-scorer-decision.md (W-1513)

## 0. What I read before writing this, and what I did not

Read, in the brief's order: `OBJECTIVE` in company/personalization/model/model.ts (model-v0.2.1); the phase A exit row in company/personalization/2026-10-16-brief-response.md §3; the code of company/personalization/model/sim/learner.ts and sim/score.ts; the independence rule (proposal §2); W-1516 on the board; the privacy ruling company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §1 A2 and §3 N5. For the MDE only: company/product/surface-value.md (#4, #5), `REVISIT_SCHEDULE_DAYS` in src/kit/progress.ts, company/experiments/README.md and EXP-005 (holdout share precedent; it holds no traffic data). For the persona count: the `latent:` lines of company/personalization/model/personas.ts (6 personas).

Not opened: company/personalization/model/sim/README.md, `sim/out/`, the HQ lab policy table, the finding sections of company/decisions/2026-10-16-personalization-model-v0.md. No simulator run was made.

**Anchoring disclosure (results I could not avoid seeing).** Three provisional results reached me through required inputs: (1) W-1516's board title says the GAM's simulated edge "reverses at penalty 0" (finding 4); (2) the batch file says the GAM's edge "rests on one unsourced assumption, the prerequisite penalty"; (3) a comment in model.ts (line 42 area and `OBJECTIVE`) says every policy reached 2.00 distinct domains in every episode. I did not see any recall number, effect size or ranking. Where a rule below touches these (the prerequisite-penalty range in §4, the breadth guardrail choice in §3), I say how the rule was set so that it does not depend on them.

## 1. Metric, unit and seeds

**Primary metric (OBJECTIVE.primary): R, mean simulated first spaced-revisit recall over all lessons completed in the episode.**
- "Completed" = the card reached the reveal (score.ts `revealed`). A card left before the reveal is not in the denominator; it is counted in "cards completed" (reported).
- The first spaced revisit is the first entry of `REVISIT_SCHEDULE_DAYS` (src/kit/progress.ts: 1 day) after completion.
- **Every completed lesson counts, whether or not the simulated learner comes back for the revisit.** The judge computes, for each completed lesson, the learner's ground-truth recall probability at its first scheduled revisit time (an expected value, not a coin flip). This removes two biases in the provisional scorer: lessons whose revisit falls after the episode ends or after the learner stops are silently dropped there (score.ts `firstRecalls` holds only revisits that happened), and the dropped set depends on the policy. The realised Bernoulli recall (as score.ts computes it) is reported beside R as a consistency check, never used for pass.
- The policy never sees R, the probabilities, or any latent (score.ts and learner.ts boundary, kept).

**Unit:** one episode = one persona × one seed × one parameter cell × one policy. Comparisons are **paired**: two policies at the same persona, seed and cell share the same initial knowledge state and the same random draws per (concept, event) (common random numbers, decision file §3), so the difference is the policy's, not the dice's.

**Per-persona statistic:** Δ_p = mean over seeds of R(GAM) − R(baseline), with a 95% t interval over the paired seed differences.

**Seeds:** a fixed list, seeds `1001 … 1000+S`, the same list for every persona, cell and policy. S is fixed in C1 **before any policy is scored**, from the default-order arm's per-episode SD of R alone (no second policy): S = max(200, ⌈(2.8 · √2 · sd_R / δ_min)²⌉), capped at 2000. √2 assumes zero correlation between paired arms, which is conservative under common random numbers. S is written into this file at freeze.

**Episode definition** (session schedule, cards per session, simulated days) is the harness's and is fixed in C1 before freeze. It is the same for every policy and is written into this file at freeze.

## 2. Pass rule per policy pair

Two pairs, judged separately: **GAM vs default-order** and **GAM vs draft-rules** (POLICIES in model.ts). The GAM passes phase A only if it passes **both**.

In one parameter cell, the GAM **beats** a baseline when all of the following hold:
1. **Wins in at least 4 of the 6 personas.** A persona is a win when the lower end of the 95% interval of Δ_p is above 0 **and** Δ_p ≥ δ_min = **0.01** (1 percentage point of R). The margin is mine, set before any data: with hundreds of paired seeds almost any edge is "significant", and an edge below 1 point inside a placeholder world is not evidence of anything.
2. **No persona is harmed.** No persona has Δ_p ≤ −δ_harm = **−0.02** with the upper end of its interval below 0. (The brief-response row asked only for 4 of 6 wins; winning 4 by a little while costing 2 by a lot is not a pass. Added before data.)
3. **Every breadth guardrail in §3 holds** in every persona.
4. **The knowledge-gain guardrail in §3 holds** in every persona.

**Pass across the sweep (§4):** the GAM passes a pair only if it beats the baseline in the base cell **and** in every one-at-a-time sensitivity cell. Outcomes, per pair:
- **PASS**: beats in all one-at-a-time cells.
- **FAIL-SENSITIVE**: beats in the base cell but not in at least one sensitivity cell. The readout names the cells. Per the exit row ("if the GAM only wins under one parameter setting, we say so and do not proceed on it"), this is not a pass.
- **FAIL**: does not beat in the base cell.
- **INVALID**: any test in §5 fails. No recall comparison is reported for an invalid policy.

The corner cells (all-high, all-low combinations) are run and reported, and are not part of pass. Keep or kill is vp-personalization's (proposal §2.4); this file only says pass or fail.

**Per-term criteria (reported, for the VP's per-term decision; not part of the GAM pass):** the same rule (items 1 and 2) applied to GAM vs `gam-no-surprise-novelty` and GAM vs `gam-no-breadth`, in the base cell. For the surprise/novelty pair, this is run at each value of the rating-fidelity parameter ρ (§4), and the readout says at which ρ, if any, the term earns its place. `random` and `epsilon-greedy` are reported as reference rows with no rule.

## 3. Guardrails

From `OBJECTIVE.guardrails` (model.ts, model-v0.2.1), each judged **against default-order in the same cell**, per persona, on paired seed differences with a 95% interval. "Does not rise / fall" with a zero margin cannot be tested, so each has a margin, set here before data:

| # | OBJECTIVE wording | Measure (per episode) | Holds when, per persona |
|---|---|---|---|
| G1 | share of completed new cards in the learner's top domain does not rise vs default-order (breadth) | completed new cards in the domain with most completed new cards ÷ completed new cards | upper end of the interval of Δ ≤ **+0.05** |
| G2 | distinct concepts completed does not fall vs default-order (breadth within a domain) | distinct pilot concepts among completed cards | lower end of the interval of Δ/mean(default) ≥ **−0.05** |
| G3 | share of cards shown before their prerequisites does not rise | new cards shown before every in-pilot prerequisite was completed ÷ new cards shown (score.ts `prereqFirst`, kept) | upper end of the interval of Δ ≤ **+0.02** |
| G4 | (added by eval, not in OBJECTIVE) knowledge gain does not fall | ground-truth concepts known at episode end minus at start (score.ts `gain`, kept) | lower end of the interval of Δ/mean(default) ≥ **−0.05** |

Why G4: R averages recall over lessons the policy chose to show. A policy that shows lessons the learner already knows raises R without teaching anything. G4 closes that route. It is a new dimension I add to the criterion; the VP may contest it before freeze, in writing in this file.

"Distinct domains reached" is not a guardrail: OBJECTIVE dropped it in model-v0.2 because it cannot move with two pilot domains. I follow OBJECTIVE, and I note that I learned this from a provisional result (§0).

Reported, never pass inputs (`OBJECTIVE.notScored` plus engagement, Surface Value #5 rule): reveal share, cards completed, moved share, need coverage. These are labelled as engagement or as descriptive.

## 4. Sensitivity sweep

Each parameter is a **scale on the persona latents** (as learner.ts `forgetScale`, `pullScale`, `prereqScale`) or an absolute value, as named:

| Parameter | Low | Base | High | Source |
|---|---|---|---|---|
| forgetting (scale on persona `forgetRate`) | 0.5 | 1.0 | 1.5 | exit row (±50%); base latents from **B2_FORGET_RANGE** |
| misconception pull (scale on the hidden per-lesson pull) | 0.5 | 1.0 | 1.5 | exit row (±50%); base latents from **B2_PULL_RANGE** |
| prerequisite penalty (absolute) | **B2_PREREQ_LOW** | **B2_PREREQ_BASE** | **B2_PREREQ_HIGH** | B2 table (W-1516a, W-1517) |
| surprise/hypercorrection effect on retention (absolute) | **B2_SURPRISE_LOW** | **B2_SURPRISE_BASE** | **B2_SURPRISE_HIGH** | B2 table (W-1497) |
| rating fidelity ρ (how well the composer's misconceptionStrength tracks the hidden pull) | 0 | **RHO_AGREEMENT** | 1 | 0 and 1 are bounds; the middle comes from the blind 20% agreement (W-1515 / C3) or, if none exists at freeze, 0.5 labelled as a guess |

Rules for the placeholders, set now so that they do not depend on any result:
- Named placeholders are filled in C1 **only** from company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md's table, cited row by row. If B2 gives no range for a parameter, the cell is {0, guess, 2×guess}, labelled unsourced, and the readout says the pass is conditional on that guess.
- **Prerequisite penalty and zero.** 0 is included in the range if B2's low end is 0 or below, or B2's confidence in the effect is below medium. It is not added or removed for any other reason. (I know a provisional result concerns penalty 0, §0. This rule is about the evidence, not that result, and I set it before reading B2.)
- **Surprise:** if B2's low end is 0 or B2's confidence is below medium, the base is 0 (no surprise effect in the world), and the surprise term can earn its place only in the high cell, which the readout says plainly.
- **One-at-a-time cells** (pass-relevant): base, then each of forgetting, pull, prerequisite penalty, surprise at low and at high with the others at base: 9 cells. ρ is varied only for the per-term surprise/novelty criterion, and the main GAM pass is judged at ρ = RHO_AGREEMENT.
- **Corners** (reported only): the 16 combinations of low/high on forgetting, pull, prerequisite penalty, surprise at base.

## 5. Tests the harness runs (a failure makes the policy INVALID)

| Test | What it checks | Pass |
|---|---|---|
| T1 replay (AMD-008 P1) | the same seed, cell and commit, run twice in separate processes | byte-identical episode logs and scores (hash match) |
| T2 pick replay | at every pick of every policy, calling the composer again with the identical input | identical order |
| T3 forbidden-input invariance (AMD-008 P2) | at every pick, each entry of `FORBIDDEN_INPUTS` (model.ts: dwell … ageBand, ads, personaLabel) set to two different values | identical order for every entry; this extends B5's N3 test (W-1526) from fixed histories to every pick of every episode |
| T4 explanation | every GAM pick carries its terms | the picked lesson has the highest explained score among eligible lessons, and its term contributions sum to that score (to 1e-9) |
| T5 judge isolation, static | the eval's learner and scorer modules | import nothing from the composer, the curves or the dims index, and contain no read of `misconceptionStrength` (grep in the harness's test) |
| T6 judge isolation, dynamic | permute `misconceptionStrength` across lessons in the composer's view | the judge's hidden state (initial knowledge, hidden pulls) is byte-identical, and so are the default-order arm's scores |
| T7 judge known answers | learner unit tests: with forgetting 0, a learned concept recalls with P 1; with prerequisite penalty 0, the order of a prerequisite pair does not change expected R; with surprise 0, a wrong prediction does not change retention | each holds to 1e-9 in expectation |

T1 to T4 test policies; T5 to T7 test the judge. A T5 to T7 failure stops the run and is my defect, not the policy's.

## 6. Minimum detectable effect for the phase B holdout (first estimate)

Phase B compares the composer against a default-order holdout on Surface Value #4, first spaced-revisit recall rate, over all lessons (brief-response §3, phase B row). **There is no traffic data and no real first-revisit recall rate yet**, so every input below is an assumption, stated so it can be argued with. Computed with the two-proportion normal approximation (arithmetic, no simulator), α = 0.05 two-sided, power 0.80, learner-randomised, outcomes clustered within learner.

Assumptions:
- **N** = eligible learners who reach at least one first revisit in the read period. Eligible = has history (the composer only moves cards for learners with history) and personalization on.
- **m** = first revisits per eligible learner in the period: 3 (base) or 8.
- **ICC** = within-learner correlation of revisit outcomes: 0.1 (base) or 0.2. Design effect 1 + (m − 1)·ICC.
- **p** = baseline first-revisit recall: 0.6 (base); 0.5 is the worst case for variance and gives nearly the same MDE.
- **h** = holdout share: 0.2 (base, EXP-005's precedent) or 0.5.
- Arm assignment and holding are not decided here: privacy N5 says the registration must state it.
- Readout from aggregate counters only, cells under 20 suppressed (N5). A counter of recall by arm is enough for this test. The ICC adjustment needs per-learner clustering, which counters do not carry, so the ICC must be **assumed, not estimated** from the experiment's data unless privacy-reviewer rules on a read. This is one more reason to plan conservatively.

MDE in percentage points of first-revisit recall (all lessons):

| N eligible learners | h .2, m 3, ICC .1 (base) | h .5, m 3, ICC .1 | h .2, m 8, ICC .1 | h .2, m 3, ICC .2 | h .2, m 8, ICC .2 |
|---|---|---|---|---|---|
| 200 | 15.3 | 12.3 | 11.2 | 16.6 | 13.3 |
| 500 | 9.7 | 7.8 | 7.1 | 10.5 | 8.4 |
| 1,000 | 6.9 | 5.5 | 5.0 | 7.4 | 5.9 |
| 2,000 | 4.9 | 3.9 | 3.5 | 5.2 | 4.2 |
| 5,000 | 3.1 | 2.5 | 2.2 | 3.3 | 2.7 |
| 10,000 | 2.2 | 1.7 | 1.6 | 2.3 | 1.9 |

Under base assumptions, detecting 5 points needs about 1,900 eligible learners, 3 points about 5,200, 2 points about 11,800, and 1 point about 47,000.

**Dilution.** The primary is over all lessons, and the composer moves only some cards. If a share s of completed cards are moved and moved cards gain d, the all-lessons effect is about s·d. At s = 0.3 (a placeholder; the sim's moved share is reported in phase A for exactly this use), a 3-point all-lessons MDE needs a 10-point gain on moved cards.

**What this means.** (1) At launch-scale traffic (hundreds to a few thousand eligible learners), phase B can detect only large effects, about 5 to 10 points. (2) **Per-term keep or kill (needs, surprise, novelty) from one holdout is underpowered.** Each ablation arm splits N again, and the term effects are smaller than the composer's. Unless traffic is far above these rows, a per-term decision from phase B will be "not detected", which is not "no effect". (3) A phase A pass at δ_min = 1 point does not imply phase B can see the effect. The phase A readout will put the simulated Δ next to this table. (4) The harm threshold for the #4 guardrail in phase B cannot be tighter than the MDE at the planned N. The registration should set the harm threshold and N together.

The registration (EXP format, company/experiments/README.md) replaces these assumptions with whatever traffic exists then, and states arm holding (N5).

## 7. Open before freeze

- B2 fills **B2_FORGET_RANGE, B2_PULL_RANGE, B2_PREREQ_LOW/BASE/HIGH, B2_SURPRISE_LOW/BASE/HIGH** (company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md).
- **RHO_AGREEMENT** comes from the blind 20% second rating (W-1515, after C3) or is labelled a guess at 0.5.
- **S** (seeds) and the episode definition come from C1's policy-suppressed run.
- The VP may contest δ_min, δ_harm, the guardrail margins and G4 **in writing in this file before freeze**. After freeze, any change is a new criterion (§0 header).
