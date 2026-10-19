# Phase A, before the criterion freezes: five decisions by the objective's owner

owner: vp-personalization (Mateo)
date: 2026-10-16
run: vp-cgate-1016 · board: W-1952 (decision 1), W-1936 (decision 2), W-1942 (decision 4)
status: decided (1, 2, 3, 5); position for privacy-reviewer (4)
inputs read: company/personalization/eval/2026-10-16-phase-a-criterion.md (draft, unfrozen); company/personalization/eval/2026-10-16-learner-scorer-decision.md; company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md; company/personalization/data/2026-10-16-settings-schema-note.md; company/personalization/dims/2026-10-16-misconception-strength-rubric.md (header and open items only); company/personalization/lab/2026-10-16-lab-privacy-dod.md; `COMPOSER` and `OBJECTIVE` in company/personalization/model/model.ts (model-v0.2.1).
not read: any simulator result, `sim/out/`, the HQ lab table. No scored run exists.
rules: independence rule company/ceo-office/2026-10-16-personalization-org-proposal.md §2 (I write no criterion, readout, curve or weight); founder self-contained org company/decisions/2026-10-16-founder-personalization-org.md; AMD-008 F1 and P4.
batch these feed: company/personalization/batches/2026-10-16-batch-2.md

## 1. W-1952: rating fidelity, and the eval's bars

**Decision: the eval's proposal. In phase A the composer sees simulated ratings generated from the judge's hidden per-lesson pull at a swept fidelity ρ. Real ratings are not fed to the judge's world.**

Why:
- It is the only design in which information flows truth → noisy view → composer. Feeding the real ratings in forces ρ = 0 (an independent hidden pull), which tests one corner and can only say "the term fails when ratings are noise". The sweep says *how good ratings must be* for the surprise term to earn its place, which is the question that decides whether ratings are worth buying (decision 2).
- The real ratings still matter, through their measured reliability. A caution for the readout: agreement between two raters is an upper bound on how well a rating tracks the true pull, not an estimate of it. A ρ taken from agreement should be reported as optimistic.

Conditions I add, as the owner of the term (not criterion text; the eval writes the criterion):
- **The shipped model's surprise gate is shut** (model-v0.2.1, `surpriseGate.active: false`). So ρ does not touch the main GAM pass. The main pass does not wait for real ratings or for C3. The per-term surprise test therefore runs a **named counterfactual, `gam-surprise-on`**: a copy of `COMPOSER` with `surpriseGate.active = true` and the simulated ratings tagged with a source the gate accepts, and **nothing else changed**. I authorise that one flag flip for the readout. It is not the shipped model and it is not a model version. The readout labels it as such. The eval chooses no weight.
- Simulated ratings are on the msr-v1 scale (1 to 3, company/personalization/dims/2026-10-16-misconception-strength-rubric.md §2), so the composer sees the type it would see live. How the hidden pull maps to a level, and how ρ is defined, is the eval's.
- With C3 not run (decision 2), RHO_AGREEMENT stays the eval's labelled guess (0.5), as the criterion §4 already allows.

**Bars.** I contest one bar and accept the rest. The full text, with reasons, is in the criterion file's §8 (written there, before freeze, as the criterion asks):
- **δ_harm: contested, 0.02 → 0.01.** A persona harmed by as much as the GAM must gain elsewhere to count a win should not pass. The struggling personas are the ones the mission most needs us not to harm. The eval rules on it at freeze.
- **δ_min 0.01, 4 of 6 wins, both baselines: accepted.** I do not raise δ_min to the phase B MDE. Phase A is a necessary gate, not a forecast. The readout already puts the simulated Δ next to the MDE table (criterion §6), and the phase B registration sets N.
- **G1 +0.05, G2 −5%, G3 +0.02: accepted.**
- **G4 (knowledge gain does not fall): accepted.** It closes the route in which a policy raises R by showing lessons the learner already knows.
- **Every one-at-a-time cell must pass, including prerequisite penalty 0: accepted.** I say now, before data: a FAIL-SENSITIVE at penalty 0 means no phase B on the GAM as it stands, and no curve is tuned to win that cell back (company/decisions/2026-10-16-personalization-model-v0.md, finding 4).
- **One request, not a contest:** the per-term novelty test (decision 3) is run at the B2 novelty-benefit low, base and high (−0.05, 0, +0.05), so that a kill does not rest on the judge assuming 0. The eval may refuse in writing.

**W-1516d (math latents): the pilot is not widened for batch 2.** Probability + cs stay the pilot. W-1516d stays waiting; I revisit after the first readout.

## 2. C3: rating the remaining ~218 pilot lessons

**Decision: C3 does not run in batch 2. W-1936 step 1b is on hold with a written trigger.**

The B2 memo splits the condition (§1c). Hypercorrection improves recall at medium confidence (1b). Selecting lessons *for* surprise raises recall: unknown, low confidence (1c). **C3's condition means 1c**, because the ratings feed only the composer's surprise term, and the term asks the 1c question. The 1b finding is about the predict-then-reveal format, which every lesson gets whether or not we rate it.

Cost against value:
- Cost: about 218 walkthroughs by lesson-dims-owner, plus the eval's blind second rating of about 44 lessons. That is two or more agent runs.
- Value now: none in phase A. The gate stays shut until real ratings exist, and the decision-1 sweep already tells us whether ratings of any achievable quality could make the term pay. In phase B, the surprise term is underpowered per term (criterion §6), and a per-lesson first-prediction-wrong rate (`strengthSource: "data"`) would replace hand ratings once W-706 aggregates and the A2 read exist.

**Trigger to run C3:** the first phase A readout shows `gam-surprise-on` passing the per-term rule (wins and no harm) at ρ = 0.5 or lower, in the surprise-high cell or better. If the term cannot pay even when the world rewards surprise at the high end and the ratings are fair, ratings will not save it. If it can, the ratings are worth buying to measure ρ. I record the hold on W-1936. B3's rubric and 12 anchors (msr-v1) stand and are not wasted: they are the instrument C3 would use.

## 3. Novelty

**Decision: keep the term in model-v0.2.1 for the first scored readout, with a kill rule written now. No model change in this run.**

Why not gate off or remove now:
- No learner sees it: phase A is offline. Nothing is harmed by measuring first.
- Because the surprise gate is shut, `gam` vs `gam-no-surprise-novelty` in model-v0.2.1 isolates **novelty alone**. The first readout is a clean test of exactly this term. Gating it off now throws that away.
- The eval is about to freeze. A model change now gives the first scored run a moving target for no gain.

**Kill rule, set before data (my keep-or-kill authority, proposal §2.4):** novelty stays only if `gam` passes the per-term rule (criterion §2, items 1 and 2) against `gam-no-surprise-novelty` in the base cell, **with the judge's novelty benefit at 0** (B2 base). Not being harmful is not enough: B2 found no evidence that novelty serves recall (memo 1d), and a term that does not serve recall is the feed-optimisation drift the mission excludes. A pass only at novelty benefit +0.05 does not keep it. If it fails, I gate it off by a version bump (a `noveltyGate` like `surpriseGate`, with a decision-record line and a passing self-check) and file the form change, if any, for applied-scientist-personalization. Note for that change: `novelty` also carries the repeat damping (`perSimilarRecent`). If the term goes, guardrail G2 (distinct concepts) is what would catch massed repeats, and a repeat constraint, if needed, is applied-scientist-personalization's to propose.

## 4. `personalization_on` default (W-1942 note §5): my position for privacy-reviewer

**Position: option A.** `personalization_on boolean NULL`. It stores only an explicit learner choice. NULL means no choice was made.
- NULL serves the order of the learner's arm in a **registered** experiment. **With no registered experiment, NULL serves the F1 default order.** So, until phase B is registered and approved, everyone without a choice gets the default order. That is the same as "off" in behaviour, without storing a choice the learner did not make.
- An explicit off always wins (AMD-008 P4), at once, and persists.
- Never written from behaviour (SS3). No job, default filler or composer path writes it.
- The anonymous case is the same rule on the device (D22), so an anonymous learner with history gets the same rules as a signed-in one (P4 test).
- Options B and C are rejected for the same reason: a stored `true` or `false` the learner did not set would appear in their export as a choice they made.
- On the note's question: yes. Under option A the arm, not the row, decides the order for a learner with no choice, so the experiment registration must state how the arm is assigned and held for signed-in and anonymous learners (privacy N5). The arm is not stored in `settings`. This is for the registration's owner, not this table.

The final call is privacy-reviewer's with me. Mine is above, and it does not change if she adds conditions.

## 5. The [S] and [R] numbers in B2

**Decision: the numbers that set a range in the C1 sweep are full-text checked before C1 freezes. learning-scientist-personalization checks them (inside the org, per the founder), and personalization-eval spot-checks the record before it fills the placeholders.**

Why these and not all: after freeze, a wrong bound means a new criterion and an old result that stands. A wrong page number does not. The load-bearing numbers are:

| Range row (memo Q3) | Number to check | Mark |
|---|---|---|
| `forgetRate` 0.04 / 0.10 | Roediger & Karpicke 2006 retention at 5 min and 1 week, tested and restudied | [R] |
| `forgetRate` high 0.20 | "single exposures lose about two thirds in a week": **no source is named**; name one or mark the bound unsourced | none |
| `misconceptionPull` high 0.85 | Tversky & Kahneman 1983, Linda conjunction rate | [R] |
| `misconceptionPull` base region | Casscells et al. 1978, 27 of 60 and 11 of 60 | [A] via secondary |
| `prereqPenalty` high 0.40 | Bransford & Johnson 1972, idea units with context before vs none | [R] |
| prediction-then-feedback benefit (if the judge models it) | St. Hilaire et al., g = 0.54 and 0.04, year; Crouch et al. 61/70/77/82% | [S] |
| hypercorrection extra benefit | Butler et al. 2011, about 56% corrected at 1 week | [S] |

Why the author checks and the eval spot-checks: the founder keeps this work inside the org, so research-lead is out. The evidence role is learning-scientist-personalization's (independence rule §2.2: judge parameters come from its ranges). The eval must not choose ranges, so it does not redo them. It reads the check record and confirms two rows against their sources before filling the placeholders. That gives a second pair of eyes without moving range-setting to the judge.

If a primary text cannot be reached in that run, the number stays marked "unverifiable this run". The eval then applies its own criterion §4 rule (labelled, pass conditional on it). The check gets one run and does not block the freeze beyond that.

## Objections

| From | Objection | Answer |
|---|---|---|
| personalization-eval (decision file, Open) | Phase A with simulated ratings means the real ratings are not fed in | Accepted as the design (decision 1). The real ratings enter through measured reliability, flagged as an upper bound |
| learning-scientist-personalization (memo, Disagreements) | readiness .5 in `surprise` has no source | Stands with applied-scientist-personalization. Moot while the gate is shut; the `gam-surprise-on` counterfactual uses it as is and the readout says so |
| learning-scientist-personalization (memo, Disagreements) | no evidence that `wN · novelty` serves recall | Answered by decision 3: a kill rule set before data, and the burden is on the term |
| lesson-dims-owner (rubric §open) | step 1b waits on the C3 reading | Answered by decision 2: on hold, with a trigger |
| learner-data-engineer (note §5) | the default is a question | Answered by decision 4 for privacy-reviewer |
