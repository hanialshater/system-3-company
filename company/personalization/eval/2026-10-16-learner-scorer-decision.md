# W-1513: adopt or replace the provisional simulated learner and scorer

status: decided (eval-owned); **built in batch 2 C1** (run eval-c1-1016): company/personalization/eval/harness/ (README.md there) · owner: personalization-eval (Uma) · run: eval-b1-1016 · 2026-10-16
brief: company/personalization/batches/2026-10-16-batch-1.md B1 · criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md (draft, unfrozen)
rules: independence rule company/ceo-office/2026-10-16-personalization-org-proposal.md §2; copy, not edit (§7, W-1510); privacy A2 company/reviews/_privacy/2026-10-16-personalization-model-inputs.md §1

## Decision

- **Learner: replace.** I build a new eval-owned learner under company/personalization/eval/ that implements the same `SimLearner` interface (company/personalization/model/sim/learner.ts: `study`, `revisit`, `knownCount`), so the simulator's call sites and the policies do not change. learner.ts is a readable starting point and the replacement starts from a **copy** of it, but four of its mechanics change (below). That is a replacement, not an adoption.
- **Scorer: adopt a copy, with additions.** Copy score.ts's metric definitions (`prereqFirst`, `gain`, `reveal`, `concepts`) into the eval folder and add the expected-value primary R, G1 top-domain share and the paired statistics (criterion §1 to §3).
- **Persona latents: adopt a copy.** Copy the six `latent` blocks of company/personalization/model/personas.ts into the eval folder as the starting world. Values are replaced from B2's ranges in C1. personas.ts and everything in sim/ stay untouched (the VP's §7 answer, W-1510).
- Until C1 lands, every number from sim/ remains a smoke test (learner.ts header). No result from the provisional pair is cited in the criterion or in any readout.

I read learner.ts and score.ts as artifacts, and nothing else from sim/: no README, no output. These findings are about the code only.

## Why replace the learner: what I found in learner.ts

1. **No per-lesson misconception pull (W-1516c).** The pull is one number per persona (`L.misconceptionPull × pullScale`), the same for every lesson. The composer's surprise term reads per-lesson `misconceptionStrength`. In this world the surprise term has nothing real to find, and if the judge's pull were ever made per-lesson by reading the ratings, the judge would agree with the composer by construction. **Change:** each lesson gets a hidden pull drawn by the judge from its own seed, which the composer cannot read (criterion T5, T6).
   - In the simulated world, the composer's `misconceptionStrength` is then produced **from** the hidden pull with noise at a swept fidelity ρ (0 = the ratings carry no signal, 1 = perfect). Information flows truth → noisy view → composer, never ratings → judge. This is how "the ratings only approximate" (W-1516c) can be honoured without the judge reading the ratings.
   - **Question for vp-personalization (open, below):** this means phase A feeds the composer simulated ratings, not the dims-owner's real ones. The real ratings matter in phase A only through their measured reliability (ρ from the blind 20% second rating). If the VP wants the real ratings fed in instead, the only honest world is ρ = 0 (a hidden pull independent of them), and the surprise term is judged there alone.
2. **The prerequisite penalty acts twice, and in the same form the composer assumes.** `missingShare` lowers the chance of learning (`learnRate × (1 − prereqPen × miss)`) and also speeds forgetting (`mult = 1 + prereqPen × miss`). Both use one unsourced number per persona. A policy that avoids prerequisite-first cards is rewarded twice by one assumption. **Change:** two separate parameters, a learning penalty and a forgetting penalty, each from B2's ranges (W-1517). If B2 supports only one, the other is 0. Each is swept (criterion §4). Whether the effect is linear in the missing share is a fidelity question for learning-scientist-personalization (C2).
3. **One shared random stream.** `rand()` is consumed in card order, so two policies at the same seed draw different numbers for the same concept after their first different pick. Paired comparisons then carry extra noise, and the noise depends on the policy. **Change:** common random numbers. Each draw is keyed by (seed, persona, concept, event kind, occurrence) through a hash, so the same concept met by two policies gets the same dice.
4. **Survivorship in the revisit.** Recall exists only for lessons the learner comes back to inside the episode, and coming back depends on stopping (`stopHazard`, `interest`), which the policy influences. **Change (scorer side):** the expected recall at each completed lesson's first scheduled revisit, computed from the hidden state for every completed lesson (criterion §1). The in-feed `revisit` stays, because it changes state for later cards.

Kept as they are, because they are clean: the learner reads only the persona latent, its own parameters and the catalog's prerequisite graph. It never reads need coverage or composer scores. `interest` drives stopping only, never the score. Leaving before the reveal teaches nothing. `surpriseBoost` defaults to 0, so the world assumes no hypercorrection unless the evidence says so (in my version it comes from B2_SURPRISE, criterion §4).

## Why adopt a copy of the scorer

score.ts computes numbers and does not judge them, as its header says. Its definitions of `prereqFirst`, `gain`, `reveal` and `concepts` match OBJECTIVE and I keep them. It lacks the expected-value primary (finding 4), the G1 top-domain share (model-v0.2's breadth guardrail, W-1516b), paired per-seed differences and intervals, and the moved share in a form the phase B dilution estimate can use (criterion §6). Those are additions, not corrections, so a copy is enough.

## Boundaries

- I write no policy, curve, weight or composer code. The simulated ratings in finding 1 are a fixture of the simulated world, generated from the judge's hidden truth. They are not a lesson dim and are never written to meta.json or to the dims index.
- Privacy A2: the learner is calibrated from published ranges (B2) and invented personas only. No real events, progress rows or W-706 aggregates are used without a new privacy read.
- Who checks this: learning-scientist-personalization (fidelity against B2, C2); learner-model-engineer (reproduction from seed and commit, after C1); evaluation-steward (independence audit).

## Open

- ~~**Fidelity mechanism (finding 1): for vp-personalization**~~ answered: simulated ratings from the hidden pull at swept ρ (company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md §1); built as the criterion §4 "How ρ is defined" says.
- Build departures from this file, C1: the forgetting penalty is 0 (B2 supports only the encoding cut, as finding 2 allowed); the prerequisite penalty is binary in "any in-pilot prerequisite unknown" (B2's wording), not linear in the missing share; persona values are derived from the copied latents by written rules (criterion §4), the copy itself is unedited. All three are C2 questions.
- Math latents (W-1516d) wait for the VP's pilot-widening decision.
- The world built from this decision is unscored until the criterion is frozen (C1).
