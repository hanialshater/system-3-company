# Phase A pass criterion: GAM composer vs default order and vs draft rules (W-1496)

status: frozen
owner: personalization-eval (Uma) · run: eval-b1-1016 · brief: company/personalization/batches/2026-10-16-batch-1.md B1
frozen: run eval-c4-1016 (batch 2 C4, board W-1496), before any policy under test was scored. Freeze commit: written below in a second commit (§11). Every C4 change made before the freeze is listed in §10.
freezes in: **C4 of batch 2** (company/personalization/batches/2026-10-16-batch-2.md; moved from batch 1's C1 by the VP), after the B2 placeholders are filled from the C0-corrected table. Frozen = `status: frozen` plus the commit hash written into this file. Any change after a scored run is a new criterion, says so in the readout, and the old result stands (company/ceo-office/2026-10-16-personalization-org-proposal.md §2.3).
learner/scorer decision: company/personalization/eval/2026-10-16-learner-scorer-decision.md (W-1513)
harness (built in C1, run eval-c1-1016): company/personalization/eval/harness/ (README.md there: how to run and reproduce). Every C1 change to this text is listed in §9.

## 0. What I read before writing this, and what I did not

Read, in the brief's order: `OBJECTIVE` in company/personalization/model/model.ts (model-v0.2.1); the phase A exit row in company/personalization/2026-10-16-brief-response.md §3; the code of company/personalization/model/sim/learner.ts and sim/score.ts; the independence rule (proposal §2); W-1516 on the board; the privacy ruling company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §1 A2 and §3 N5. For the MDE only: company/product/surface-value.md (#4, #5), `REVISIT_SCHEDULE_DAYS` in src/kit/progress.ts, company/experiments/README.md and EXP-005 (holdout share precedent; it holds no traffic data). For the persona count: the `latent:` lines of company/personalization/model/personas.ts (6 personas).

Not opened: company/personalization/model/sim/README.md, `sim/out/`, the HQ lab policy table, the finding sections of company/decisions/2026-10-16-personalization-model-v0.md. No simulator run was made.

**Anchoring disclosure (results I could not avoid seeing).** Three provisional results reached me through required inputs: (1) W-1516's board title says the GAM's simulated edge "reverses at penalty 0" (finding 4); (2) the batch file says the GAM's edge "rests on one unsourced assumption, the prerequisite penalty"; (3) a comment in model.ts (line 42 area and `OBJECTIVE`) says every policy reached 2.00 distinct domains in every episode. I did not see any recall number, effect size or ranking. Where a rule below touches these (the prerequisite-penalty range in §4, the breadth guardrail choice in §3), I say how the rule was set so that it does not depend on them.

**C1 addendum (run eval-c1-1016).** Read for the build: the batch-2 file; the VP's pre-freeze decisions (company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md); the B2 memo's sections 1b to Q3 and its ranges table; the msr-v1 rubric §2; the code of model.ts (types, `FORBIDDEN_INPUTS`, `COMPOSER`, `OBJECTIVE`, `POLICIES`), personas.ts, sim/composer.ts, sim/catalog.mjs, sim/simulate.mjs and sim/learner.ts, sim/score.ts (as artifacts, to call, copy or replace them). Not opened: sim/README.md, `sim/out/`, the HQ lab, any result file. **What I saw:** the default-order arm only, at the base cell: per-persona SDs of R over 500 seeds (for S), and, as a world sanity check, its mean R, realised recall, gain and cards over 20 seeds per persona (R about 0.69 to 0.83 by persona; realised recall within 0.01 of R). No other policy was run, scored or compared; the runner was exercised only with every policy replaced by a fixture (`run.mjs --plumbing`). No result about the GAM, the draft rules or any ablation reached me in C1 beyond the three anchoring items above.

## 1. Metric, unit and seeds

**Primary metric (OBJECTIVE.primary): R, mean simulated first spaced-revisit recall over all lessons completed in the episode.**
- "Completed" = the card reached the reveal (score.ts `revealed`). A card left before the reveal is not in the denominator; it is counted in "cards completed" (reported).
- The first spaced revisit is the first entry of `REVISIT_SCHEDULE_DAYS` (src/kit/progress.ts: 1 day) after completion.
- **Every completed lesson counts, whether or not the simulated learner comes back for the revisit.** The judge computes, for each completed lesson, the learner's ground-truth recall probability at its first scheduled revisit time (an expected value, not a coin flip). This removes two biases in the provisional scorer: lessons whose revisit falls after the episode ends or after the learner stops are silently dropped there (score.ts `firstRecalls` holds only revisits that happened), and the dropped set depends on the policy. The realised Bernoulli recall (as score.ts computes it) is reported beside R as a consistency check, never used for pass.
- The policy never sees R, the probabilities, or any latent (score.ts and learner.ts boundary, kept).

**Unit:** one episode = one persona × one seed × one parameter cell × one policy. Comparisons are **paired**: two policies at the same persona, seed and cell share the same initial knowledge state and the same random draws per (concept, event) (common random numbers, decision file §3), so the difference is the policy's, not the dice's.

**Per-persona statistic:** Δ_p = mean over seeds of R(GAM) − R(baseline), with a 95% t interval over the paired seed differences.

**Seeds:** a fixed list, seeds `1001 … 1000+S`, the same list for every persona, cell and policy. S is fixed in C1 **before any policy is scored**, from the default-order arm's per-episode SD of R alone (no second policy): S = max(200, ⌈(2.8 · √2 · sd_R / δ_min)²⌉), capped at 2000. √2 assumes zero correlation between paired arms, which is conservative under common random numbers.

**S = 200 (C1, run eval-c1-1016).** sd_R is the largest per-persona SD of R of the default-order arm at the base cell over 500 pilot seeds (1001 to 1500): 0.0315 (struggling-repeater; the others 0.021 to 0.031). The formula gives ⌈(2.8 · √2 · 0.0315 / 0.01)²⌉ = 156, under the floor, so **S = 200, seeds 1001 to 1200**. Record: company/personalization/eval/harness/records/2026-10-16-seeds-c1.json (SDs only; inputs hash f7beca21…). The inputs were the B2 memo values as written, before C0. S changes only if sd_R exceeds 0.0357 (where the formula passes 200); if C4's C0-corrected base values differ, C4 reruns `harness.mjs seeds` on the default-order arm alone and writes the new S here before freezing.

**S rechecked in C4 (run eval-c4-1016): S = 200 stands, seeds 1001 to 1200.** No B2 base value moved (C0: "No range bound moves"), but the learner's forgetting form and novelty trigger changed (§10, C2 F1 and F3), so the default-order arm's SD was recomputed at the base cell over pilot seeds 1001 to 1500, default-order only: largest per-persona sd_R = 0.0328 (struggling-repeater; the others 0.021 to 0.032). The formula gives ⌈(2.8 · √2 · 0.0328 / 0.01)²⌉ = 169, under the floor. Record: company/personalization/eval/harness/records/2026-10-16-seeds-c4.json (SDs only; inputs hash d2fbc581…).

**Episode definition (C1).** One simulated learner, one session a day at 09:00 for 14 days, then a 15th day of revisits only. Each session: first the first revisits of every lesson completed on an earlier day (the scheduled first revisit, REVISIT_SCHEDULE_DAYS[0] = 1 day, is the next session), then new cards one at a time, the policy recomputed after every card, until the learner stops (stop hazard per card, from the copied persona latents) or 12 new cards. The learner returns every day, so every completed lesson gets its first revisit and R has no survivorship. R reads each lesson's expected recall at the session start, before any revisit of that session is applied. Before day 0 a visible pre-history is drawn from the persona's jittered fingerprint means (the copy of sim/simulate.mjs's generator), the same for every policy at a (seed, persona). Clock: 2 minutes per new card, 1 per revisit. Code: company/personalization/eval/harness/world-inputs.mjs `EPISODE`, harness.mjs `runEpisode`.

## 2. Pass rule per policy pair

Two pairs, judged separately: **GAM vs default-order** and **GAM vs draft-rules** (POLICIES in model.ts). The GAM passes phase A only if it passes **both**.

In one parameter cell, the GAM **beats** a baseline when all of the following hold:
1. **Wins in at least 4 of the 6 personas.** A persona is a win when the lower end of the 95% interval of Δ_p is above 0 **and** Δ_p ≥ δ_min = **0.01** (1 percentage point of R). The margin is mine, set before any data: with hundreds of paired seeds almost any edge is "significant", and an edge below 1 point inside a placeholder world is not evidence of anything.
2. **No persona is harmed.** No persona has Δ_p ≤ −δ_harm = **−0.01** with the upper end of its interval below 0. (δ_harm was 0.02 in B1; lowered to 0.01 in C1, before any score, on the VP's contest: §8 ruling, §9.) (The brief-response row asked only for 4 of 6 wins; winning 4 by a little while costing 2 by a lot is not a pass. Added before data.)
3. **Every breadth guardrail in §3 holds** in every persona.
4. **The knowledge-gain guardrail in §3 holds** in every persona.

**Pass across the sweep (§4):** the GAM passes a pair only if it beats the baseline in the base cell **and** in every one-at-a-time sensitivity cell (9 cells from C4: the 8 of §4 plus `learnRate-low`, §10 F2). Outcomes, per pair:
- **PASS**: beats in all one-at-a-time cells.
- **FAIL-SENSITIVE**: beats in the base cell but not in at least one sensitivity cell. The readout names the cells. Per the exit row ("if the GAM only wins under one parameter setting, we say so and do not proceed on it"), this is not a pass.
- **FAIL**: does not beat in the base cell.
- **INVALID**: any test in §5 fails. No recall comparison is reported for an invalid policy.

The corner cells (all-high, all-low combinations) are run and reported, and are not part of pass. Keep or kill is vp-personalization's (proposal §2.4); this file only says pass or fail.

**Per-term criteria (reported, for the VP's per-term decision; not part of the GAM pass):** the same rule (items 1 and 2) applied to one pair per term. Set in C1, before any score (§9), because model-v0.2.1's surprise gate is shut, so `gam` vs `gam-no-surprise-novelty` no longer tests surprise:
- **Breadth:** GAM vs `gam-no-breadth`, base cell.
- **Novelty:** GAM vs `gam-no-surprise-novelty` (with the gate shut, only novelty differs), in three cells: the base cell with the judge's novelty benefit at B2 low, base and high (−0.05, 0, +0.05; the VP's request, §8). The VP's kill rule reads the benefit-0 cell; the other two are reported beside it.
- **Surprise:** the named counterfactual **`gam-surprise-on`** vs GAM (only the surprise term differs: `COMPOSER` copy with `surpriseGate.active = true`, the simulated ratings tagged `strengthSource: "classifier"`, which the gate accepts; nothing else changed; authorised by the VP for the readout; not the shipped model and not a model version). Run at ρ ∈ {0, RHO_AGREEMENT, 1} × surprise effect {base, high} (6 cells, others at base). The readout says at which ρ and surprise level, if any, the term earns its place.
- `random` and `epsilon-greedy` are reported as reference rows (Δ vs default-order) with no rule.

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
| forgetting (scale on persona `forgetRate`) | min(0.5, B2 low ÷ B2 base) | 1.0 | max(1.5, B2 high ÷ B2 base) | exit row (±50%) widened to B2's range (C1, §9); base latents from **B2_FORGET_RANGE** |
| misconception pull (scale on the hidden per-lesson pull) | 0.5 | 1.0 | 1.5 | exit row (±50%); base latents from **B2_PULL_RANGE** |
| prerequisite penalty (absolute) | **B2_PREREQ_LOW** | **B2_PREREQ_BASE** | **B2_PREREQ_HIGH** | B2 table (W-1516a, W-1517) |
| surprise/hypercorrection effect on retention (absolute) | **B2_SURPRISE_LOW** | **B2_SURPRISE_BASE** | **B2_SURPRISE_HIGH** | B2 table (W-1497) |
| rating fidelity ρ (how well the composer's misconceptionStrength tracks the hidden pull) | 0 | **RHO_AGREEMENT** | 1 | 0 and 1 are bounds; the middle comes from the blind 20% agreement (W-1515 / C3) or, if none exists at freeze, 0.5 labelled as a guess |
| novelty benefit (relative boost to encoding when the concept or the domain is unseen; **C4: when the lesson's domain differs from the previous completed card's**, §10 F3) | **B2_NOVELTY_LOW** | **B2_NOVELTY_BASE** | **B2_NOVELTY_HIGH** | B2 table; used only by the per-term novelty cells (§2), not by the GAM pass |
| learn rate (C4, absolute; P(encode \| concept unknown) before the prediction-feedback boost) | **B2_LEARNRATE_LOW** | 0.70 (C1 guess; B2 gives no base) | none (B2 high = 0.70 = base) | B2 C2 revision row (W-1533 F2); low is pass-relevant (§10 F2) |

**C1 additions to this section (before any score; §9):**
- **Forgetting low/high** are the wider of the exit row's ±50% and B2's own range around its base: low = min(0.5, B2 low ÷ B2 base), high = max(1.5, B2 high ÷ B2 base). With the memo as written that is 0.4 and 2.0. Reason: the exit row sets a minimum sensitivity, not a cap, and a sweep narrower than the evidence's range would hide the bounds B2 gives. The low/high bounds come from the C0-corrected table at C4 under the same rule.
- **How ρ is defined.** In each seed's world every pilot lesson has a hidden pull (B2's pull row read as the spread of lessons: triangular on low, base, high). The composer's rating is z_obs = ρ·z + √(1−ρ²)·ε, with z the standardised hidden pull and ε a standard normal keyed per (seed, lesson), mapped back to the pull scale and cut into msr-v1 levels: 1 at or below 0.5 (no clear majority, rubric §2 level 1 (b)), 3 at or above 0.7 (an eval guess for "robust"), else 2. So ρ is the correlation between the rater's continuous judgement and the hidden pull, before rounding. The learner never reads the rating (T5, T6). The pull scale changes the world's pull, not the ratings.
- **How the persona latents enter.** The six latent blocks are copied verbatim (harness/personas.copy.mjs) and mapped to B2 by written rules, never edited: forgetting rate rescaled on the log scale so the fastest/slowest ratio is B2's spread and the geometric centre is B2's base; pull modifier piecewise linear in the copied pull, from B2's low (lowest persona) to B2's high (highest); prior knowledge standardised to B2's mean and spread; prerequisite penalty absolute and the same for every persona (B2 gives no between-learner spread, so the copied per-persona value is not used). Code: harness/world-inputs.mjs `personaWorld`.
- **Not swept, fixed at B2 base:** the prediction-then-feedback benefit (0.10; it applies to every lesson alike). **Unsourced, labelled, not swept:** learn rate 0.7, slip 0.1, guess recall 0.2, relearn 0.5, revisit strengthening 0.5, share of stops before the reveal 0.5 (copied from the provisional learner). The forgetting part of the prerequisite penalty is 0 because B2 supports only the encoding cut (decision file finding 2). C2 may contest any of these.
- **What the B2 rules give with the memo as written** (C4 refills from the C0-corrected table): forgetting base 0.10 per day, spread 2; pull 0.30 / 0.55 / 0.85; modifier −0.15 / +0.10; prerequisite penalty 0 / 0.15 / 0.40 (0 included: B2's low end is 0 and its confidence is low); surprise 0 / **0** / 0.15 (base 0: B2's low end is 0 and its confidence low-medium, so the low cell equals the base cell and the term can earn its place only in the high cell); novelty −0.05 / 0 / +0.05.
- **Cells actually run** (harness/world-inputs.mjs `cells`): base; 8 one-at-a-time cells; 16 corners (default-order, draft-rules and GAM only); 3 novelty cells; 6 ρ × surprise cells.

Rules for the placeholders, set now so that they do not depend on any result:
- Named placeholders are filled in C1 **only** from company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md's table, cited row by row. If B2 gives no range for a parameter, the cell is {0, guess, 2×guess}, labelled unsourced, and the readout says the pass is conditional on that guess.
- **Prerequisite penalty and zero.** 0 is included in the range if B2's low end is 0 or below, or B2's confidence in the effect is below medium. It is not added or removed for any other reason. (I know a provisional result concerns penalty 0, §0. This rule is about the evidence, not that result, and I set it before reading B2.)
- **Surprise:** if B2's low end is 0 or B2's confidence is below medium, the base is 0 (no surprise effect in the world), and the surprise term can earn its place only in the high cell, which the readout says plainly.
- **One-at-a-time cells** (pass-relevant): base, then each of forgetting, pull, prerequisite penalty, surprise at low and at high with the others at base: 9 cells. **C4:** plus `learnRate-low` (learn rate 0.35, the others at base), 10 cells in all (§10 F2). ρ is varied only for the per-term surprise/novelty criterion, and the main GAM pass is judged at ρ = RHO_AGREEMENT.
- **Corners** (reported only): the 16 combinations of low/high on forgetting, pull, prerequisite penalty, surprise at base.

**C4 fill (run eval-c4-1016): the placeholders, from the B2 table as corrected by C0 and the memo's C2 revision.** Spot-check first (VP decision §5): I re-read two C0 rows in their full text through the PMC OAI endpoint, myself. **Row 2** (Fazio et al. 2010, *Memory & Cognition* 38(4), PMC4094137, Table 2): Read / Zero (not tested) .48 immediate, .30 and .31 delayed one week; Not Read .21, .23, .23; "up to 90 s. to read each passage"; 72 undergraduates. **Matches C0.** k above the not-read baseline: ln(.27/.07)/7 = 0.193, ln(.27/.08)/7 = 0.174. **Row 4** (Manrai et al. 2014, *JAMA Intern Med* 174(6), PMC4955674, Results and Table): "14 of 61 respondents (23%) gave a correct response ... 11 of 60 correct responses (18%) in the Casscells study"; "27 of 61 respondents (44%) in our study and 27 of 60 (45%)"; Casscells sample 20 / 20 / 20. **Matches C0.**

| Placeholder | Value | Mark after C0 | Rule applied |
|---|---|---|---|
| B2_FORGET_RANGE | base 0.10, spread 2 (persona k 0.071 to 0.141); low 0.04 → scale 0.4; high 0.20 → scale 2.0 | low/base [R] unverifiable this run; high [F] (Fazio Table 2, spot-checked), **valid for the increment-above-floor form**, which the learner now has (§10 F1) | §4 C1 rule max/min with ±50%; unverifiable rows keep their value, labelled, and the pass is conditional on them |
| B2_PULL_RANGE | 0.30 / 0.55 / 0.85, modifier −0.15 / +0.10 | high [F-r]; base region [F-r] (1978) / [F] (2014, spot-checked) | as C1 |
| B2_PREREQ_LOW / BASE / HIGH | 0 / 0.15 / 0.40 | high [S] unverifiable this run | 0 kept (B2 low is 0, confidence low); labelled; pass conditional |
| B2_SURPRISE_LOW / BASE / HIGH | 0 / **0** / 0.15 | [S] unverifiable this run (Butler 56%) | base 0 by the §4 surprise rule (B2 low 0, confidence low-medium); unit per memo C2 revision: relative boost to the kept increment of recall (§10 F1, F12 note) |
| B2_NOVELTY_LOW / BASE / HIGH | −0.05 / 0 / +0.05 | low confidence, unchanged; meaning corrected (memo C2 revision) | trigger: domain switch from the previous completed card (§10 F3) |
| B2_LEARNRATE_LOW (new, §10 F2) | 0.35 | [F]-derived (Fazio Table 2: (.48 − .21)/(1 − .21) ≈ 0.34), low confidence | pass-relevant one-at-a-time cell; base stays 0.70, the C1 guess (= B2 high, unsourced), because B2 gives no base and the eval sets no range value |
| prediction-feedback (fixed) | 0.10 | [A] / [S] | not swept (as C1) |

The block is `B2` in harness/world-inputs.mjs (status "C0-corrected"); the run's manifest records its hash.

## 5. Tests the harness runs (a failure makes the policy INVALID)

| Test | What it checks | Pass |
|---|---|---|
| T1 replay (AMD-008 P1) | the same seed, cell and commit, run twice in separate processes | byte-identical episode logs and scores (hash match) |
| T2 pick replay | at every pick of every policy, calling the composer again with the identical input | identical order |
| T3 forbidden-input invariance (AMD-008 P2) | at every pick, each entry of `FORBIDDEN_INPUTS` (model.ts: dwell … ageBand, ads, personaLabel) set to two different values | identical order for every entry; this extends B5's N3 test (W-1526) from fixed histories to every pick of every episode |
| T4 explanation | every pick of a GAM variant (gam, gam-no-surprise-novelty, gam-no-breadth, gam-surprise-on) carries its terms | its term contributions sum to its score (to 1e-9); a moved pick is the highest-scoring eligible-to-move candidate and beats the default card by more than the move threshold; an unmoved pick is the default card. (C1 wording: B1 said "the highest explained score among eligible lessons", which the composer's move threshold and anti-bubble floor contradict by design; §9) |
| T5 judge isolation, static | the eval's learner and scorer modules | import nothing from the composer, the curves or the dims index, and contain no read of `misconceptionStrength` (grep in the harness's test) |
| T6 judge isolation, dynamic | permute `misconceptionStrength` across lessons in the composer's view | the judge's hidden state (initial knowledge, hidden pulls) is byte-identical, and so are the default-order arm's scores |
| T7 judge known answers | learner unit tests: with forgetting 0, a learned concept recalls with P 1; with prerequisite penalty 0, the order of a prerequisite pair does not change expected R; with surprise 0, a wrong prediction does not change retention | each holds to 1e-9 in expectation |

T1 to T4 test policies; T5 to T7 test the judge. A T5 to T7 failure stops the run and is my defect, not the policy's.

**C4 status (before freeze):** T5 to T7 pass again on the C4 learner, plus two known-answer tests for the C4 changes (increment-above-floor recall to 1e-12; novelty boost absent after a same-domain card and present after a switch), harness/tests.test.mjs, 20 of 20. The freeze-lock test now checks both states on temporary copies.

**C1 status:** T5, T6 and T7 pass (harness/tests.test.mjs). T1 to T4 are built and shown able to fail (fixtures: a `Math.random` policy fails T1 and T2, a `sessionCount` reader fails T3 on that entry only, a mis-summed explanation fails T4) and pass on default-order and a positive control. They are not run on any policy under test before the freeze. Scope used in C4: T1 on 2 personas at seed 1001 in two processes; T2 to T4 at every pick of one episode per persona at seed 1001 (base cell; `gam-surprise-on` at ρ = RHO_AGREEMENT, surprise high).

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

## 7. Open before freeze (all closed in C4: §4 C4 fill, §1 S recheck, §10)

- C4 fills **B2_FORGET_RANGE, B2_PULL_RANGE, B2_PREREQ_LOW/BASE/HIGH, B2_SURPRISE_LOW/BASE/HIGH, B2_NOVELTY_LOW/BASE/HIGH** from the B2 table as corrected by C0 (company/personalization/evidence/2026-10-16-ranges-fulltext-check.md), after spot-checking two of C0's rows against their sources. The harness holds them as one named input (harness/world-inputs.mjs `B2`, or `--inputs=`), today at the memo's values as written.
- **RHO_AGREEMENT** stays the labelled guess 0.5 (C3 held, VP decision §2).
- **S = 200 and the episode definition are set (§1, C1).** C4 recomputes S from the default-order arm only if a base value changes.
- C2's blocking findings on the learner (W-1533) are answered in writing before the freeze (batch-2 C4 step 1).
- After freeze, any change is a new criterion (§0 header).

## 8. VP response before freeze (W-1531): written here as §7 asks

from: vp-personalization (Mateo) · run: vp-cgate-1016 · 2026-10-16 · full reasons: company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md §1. This section is the VP's, not the criterion. The eval rules on each row at freeze, in writing, and the criterion text stays the eval's.

| Item | VP position | Reason (short) | Eval's ruling at freeze |
|---|---|---|---|
| δ_harm = 0.02 | **contested: 0.01** | A persona harmed by as much as the GAM must gain elsewhere to count a win should not pass. The struggling personas are the ones the mission most needs us not to harm. | **Accepted (C1): δ_harm = 0.01** (§2 item 2). The contest makes the bar stricter on the policy and arrives before any policy score, so it cannot be fitted to a result. The harm and win thresholds are then symmetric, which is the cleaner rule: the smallest edge I count as evidence is also the smallest harm I count. The harm test still needs the upper end of the interval below 0, so noise alone cannot trip it; at S = 200 the paired interval's half-width is at most about 0.006 (t · √2 · 0.0315 / √200, zero pair correlation), so a 1-point harm is resolvable. |
| δ_min = 0.01; 4 of 6; both baselines | accepted | Phase A is a gate, not a forecast; §6 already puts Δ next to the MDE | Agreed; unchanged. S was set from δ_min = 0.01 (§1). |
| G1 +0.05, G2 −5%, G3 +0.02 | accepted | — | Agreed; unchanged. |
| G4 (knowledge gain) | accepted | Closes the "show known lessons" route | Agreed; unchanged. |
| Every one-at-a-time cell, incl. prerequisite penalty 0 | accepted | A FAIL-SENSITIVE at 0 means no phase B on the GAM as it stands; no curve is tuned to win it back | Agreed; unchanged. Penalty 0 is in the sweep by the §4 rule (B2's low end is 0), not by this row. What a FAIL-SENSITIVE means for phase B is the VP's statement, not criterion text. |
| Rating fidelity (decision file, Open) | **simulated ratings from the hidden pull at swept ρ** (your proposal) | Real ratings only allow ρ = 0. Agreement-derived ρ is an upper bound on fidelity; report it as optimistic | **Accepted and built** (§4 "How ρ is defined"; harness/learner.mjs `simulatedRating`; T6, T7d). The caution is accepted: any ρ taken from rater agreement will be labelled optimistic in the readout. None exists now; 0.5 is a guess and is labelled so. |
| Per-term surprise test | run as the named counterfactual **`gam-surprise-on`**: a `COMPOSER` copy with `surpriseGate.active = true` and simulated ratings tagged with a source the gate accepts, nothing else changed. Authorised by the VP for the readout; not the shipped model | The shipped gate is shut, so ρ does not affect the main GAM pass and the freeze need not wait for real ratings | **Accepted and built**, with one specification set before any score: the per-term pair is `gam-surprise-on` **vs `gam`**, not vs `gam-no-surprise-novelty`, because only then does the surprise term alone differ (§2). Tag: `"classifier"` (a simulated rating is not a human one; the composer reads the tag only at the gate). A test checks that the copy differs from `COMPOSER` only in `active` (and its `why` text) and the pool only in the tag. Cells: ρ ∈ {0, 0.5, 1} × surprise {base 0, high}. I choose no weight. |
| Per-term novelty test | **request:** run `gam` vs `gam-no-surprise-novelty` at the B2 novelty-benefit low/base/high (−0.05, 0, +0.05). With the gate shut, this pair isolates novelty | The VP's kill rule judges at benefit 0; the other two cells show it is not an artifact of that choice | **Accepted (C1).** The values are B2's, not mine, so the request adds no judge assumption, and the cost is compute only. To honour it the learner now models novelty, as B2's row defines it: a relative boost to encoding when the lesson's concept was never completed or its domain is not among the last 10 completed (the trigger is mine and is a C2 fidelity question). At benefit 0 the learner has no novelty mechanism, so in that cell the term can matter only through what it changes in the order (prerequisites, forgetting, breadth). These are per-term cells, reported, never part of the GAM pass. Which cell the kill rule reads is the VP's call, not criterion text. |
| RHO_AGREEMENT | stays your labelled guess 0.5 | C3 is on hold (decision 2) | Agreed: 0.5, labelled a guess in every output that uses it (world-inputs.mjs `CRITERION.rhoAgreement`). The main GAM pass does not depend on it (gate shut; T6 shows ρ leaves the judge and default-order untouched). |
| Placeholders from B2 | fill only after learning-scientist-personalization's full-text check record of the load-bearing [S]/[R] numbers, and after you spot-check two of its rows (decision 5) | A wrong bound after freeze is a new criterion | Agreed; not filled in C1. The ranges are one named input (world-inputs.mjs `B2`, or `--inputs=`) holding the memo values as written, marked pre-C0. C4 spot-checks two C0 rows, fills, applies §4's rules and recomputes S if a base value moved. |
| W-1516d math latents | pilot **not** widened for batch 2 | — | Agreed: the harness covers probability and cs only; no math latents were built; W-1516d stays open. |

## 9. Changes to this text in C1 (run eval-c1-1016, before any policy score; status stays draft, unfrozen)

| § | Change | Why |
|---|---|---|
| header | Freeze moved from batch 1's C1 to batch 2's C4 | The VP's batch-2 plan (C0 and C2 may still change inputs while no result exists) |
| §0 | C1 addendum: what I read and saw (default-order only) | Disclosure, as in B1 |
| §1 | S = 200 and the episode definition written | §7 asked for them from C1's policy-suppressed run |
| §2 item 2 | δ_harm 0.02 → 0.01 | VP contest accepted (§8) |
| §2 per-term | Pairs defined per term: breadth; novelty (3 cells, VP request); surprise as `gam-surprise-on` vs `gam` at ρ × surprise cells | The shut gate made the B1 pair test novelty only; VP decision §1 and §3 |
| §4 | Forgetting low/high = the wider of ±50% and B2's range; novelty row added; definitions of ρ, the persona mapping, fixed and unsourced constants; the cells run | Needed to build the world; each is a rule on B2's numbers, not a value I chose to suit a result |
| §5 T4 | Pass wording made consistent with the composer's move threshold and floor; T4 applies to the four GAM variants | B1's wording ("highest score among eligible") would fail every unmoved pick by design |
| §5 | C1 status of T1 to T7 | Done criterion of C1 |
| §7, §8 | Open list updated; §8 ruled row by row | Batch-2 C1 step 5 |


## 10. C4 (run eval-c4-1016): answers to C2's blocking findings, and every change made before the freeze

C2's record: company/personalization/evidence/2026-10-16-simulator-fidelity-review.md (learning-scientist-personalization, W-1533). Its three blocking findings, answered here as batch-2 C4 step 1 requires. No policy under test had been scored when any of these was decided; the only runs were default-order (S recheck) and fixtures (runner self-check).

| C2 | Finding (short) | Answer | What changed |
|---|---|---|---|
| F1 | The learner decays the whole recall probability toward 0, floored at guessRecall by `max`; under that form B2's `forgetRate` high 0.20 is not sourced (≈ 0.12–0.13 is) | **Fixed: option (a).** Recall of a known concept is now guessRecall + (1 − guessRecall) · exp(−k · mult · days) · (1 + h), capped at 1. Reason: it is the form C0 read the evidence under (C0 "condition"), so 0.20 is sourced [F] as recorded and spot-checked (§4 C4 fill), and guessRecall 0.2 gains Fazio's not-read baseline (.21–.23) as support (C2 F19). Option (b) would have made the ±50% floor, not evidence, set the cell; (c) would have left a cell labelled as B2's edge that is not. I checked C2's arithmetic: (e^(−7k) − 0.2)/0.8 = 0.26–0.30 gives k = 0.118–0.128 under the old form. | learner.mjs `recallProb`; hypercorrection now scales the kept increment (C2 F12's suggestion). Test "C2 F1" in tests.test.mjs. S rechecked (§1). |
| F2 | `learnRate` 0.7 unsourced, not swept; ΔR scales about linearly with it against an absolute δ_min | **Fixed: a pass-relevant one-at-a-time cell `learnRate-low` = 0.35** (B2's new row, low end, [F]-derived), others at base. Reason: the criterion's own rule is that the GAM must beat its baselines in every one-at-a-time cell, and B2 now gives a range; a verdict that holds only at the unsourced top of that range would be "wins only under one parameter setting" (exit row). This makes the bar stricter and is set before any score. **Not done:** no high cell (B2's high 0.70 is the base; nothing supports more); the base stays 0.70, the C1 guess, because B2 gives no base and choosing a centre would be the judge choosing a range value; learn rate is not added to the corners (they stay the 16 of four axes, reported only). The readout states that the base cell sits at the top of B2's learn-rate range. | world-inputs.mjs `B2.learnRate`, `cells` (`learnRate-low`), `personaWorld` (learnRate from the cell; also used by the visible pre-history's encoding). §2, §4. |
| F3 | Novelty trigger "concept never completed, or domain not among the last 10 completed" is true for nearly every card (223 concepts / 230 lessons) and copies the composer's `conceptUnseen` and `domainUnseen` | **Fixed.** Trigger is now a **domain switch from the previous completed card** (pre-history included; never on the very first card), the meaning C2 corrected B2's row to (memo C2 revision: a context that differs from what came just before). It is not the composer's formula: the composer scores a concept never completed and a domain absent from the last 10 (sim/composer.ts `novelty`, lines 145–150); with two domains its domain clause implies a switch, but a switch does not imply it, and the concept clause is gone. It can now differ by order, so the ±0.05 cells test something. | learner.mjs `study` (`lastDomain`). Test "C2 F3". |

**The notes.** The six C2 marks "state in readout" (F4, F7, F10, F12, F16, F17) go into the readout's model description, unchanged here. The other notes (F5, F6, F8, F9, F11, F13–F15, F18–F23) are not acted on in C4; they stay open in C2's record for a later criterion, and none changes what the readout can claim beyond what the readout states.

**Other C4 changes before the freeze:**

| § / file | Change | Why |
|---|---|---|
| header | `status: frozen`, freeze line | Batch-2 C4 step 3 |
| §1 | S rechecked: 200 stands | Learner changed (F1, F3); rule of §1 |
| §2, §4 | 10 pass-relevant cells (base + 9 one-at-a-time, `learnRate-low` added) | F2 |
| §4 | Placeholders filled (C4 fill table) after spot-checking C0 rows 2 and 4 | §7, VP decision §5 |
| §4 row | Novelty trigger meaning; learn-rate row | F3, F2 |
| §5 | C4 test status | T5–T7 must pass before the run |
| run.mjs | `--kinds=` option (run only some cell kinds first on a loaded host); the manifest records the kinds | Host load (the run is otherwise unchanged and deterministic) |
| tests.test.mjs | Freeze-lock test on temporary copies in both states; one-at-a-time count 9; two C4 known-answer tests | The real file is frozen from now on |
