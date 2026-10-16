# Phase A readout 1: keep or kill per term, C3, and what the FAIL means

owner: vp-personalization (Mateo)
date: 2026-10-16
run: vp-w1536-1016 · board: W-1536
status: decided (§2 per term, §3 C3, §4 GAM and phase B), **conditional on C5** (below); §6 is a set of questions for the founder, not decisions
inputs read: company/personalization/eval/2026-10-16-phase-a-readout-1.md (all of it, including §6 tables); company/personalization/eval/harness/records/2026-10-16-readout-1/pass/verdicts.json (for the arithmetic in §1); company/decisions/2026-10-16-vp-personalization-pre-freeze-decisions.md (my rules, set before data); company/personalization/batches/2026-10-16-batch-2.md; company/personalization/2026-10-16-founder-brief.md; company/decisions/2026-10-15-first-light-release-1-scope.md (Ruling 4); company/decisions/2026-10-16-personalization-model-v0.md (finding 4).
rules: independence rule company/ceo-office/2026-10-16-personalization-org-proposal.md §2 (I write no criterion, readout, curve or weight); keep/kill authority (onboarding doc company/roles/vp-personalization.md); AMD-008 F1, P4.

**Condition: C5.** learner-model-engineer is reproducing the readout (W-1535, company/personalization/eval/2026-10-16-phase-a-readout-1-repro.md, not on disk at the time of writing). Every decision below takes effect when C5 confirms the run is deterministic and the verdicts match. If C5 finds a difference that changes any verdict, this record is void and I decide again on the corrected readout. If C5 finds only differences that change no verdict, the decisions stand and I note it here. The model change in §2 waits for C5 for the same reason.

## 0. Decisions at a glance

| Item | Decision | Rule it applies |
|---|---|---|
| Phase A verdict | **Accepted as FAIL.** No objection to the criterion; nothing overridden | criterion §2 (frozen e9909edc) |
| Novelty | **Killed.** Gated off in model-v0.2.2 after C5 | my kill rule, pre-freeze §3 (must win at benefit 0; 0 of 6 wins, three intervals below 0) |
| Surprise | **Stays gated off; no path back in this world.** No code removed | pre-freeze §2 trigger (failed even at ρ = 1, surprise high) |
| Breadth | **No recall credit; not killed.** It had no pre-registered kill rule and its job is the bubble guardrail, not recall. Moot while the GAM is stopped | mission ("without trapping them in a bubble"); criterion G1 |
| C3 (≈218 ratings) | **Cancelled**, not held. W-1515 step 1b closes | pre-freeze §2 trigger not met |
| The GAM as it stands | **Stopped.** No phase B on it, no curve tuned to win a cell back | pre-freeze §1 bars paragraph; model-v0 finding 4 |
| Phase B (any policy) | **Not registered.** No candidate has passed anything | proposal phases; AMD-008 F1 |
| What next | **Recommendation: option C (one headroom-first criterion) with the founder's answer to Q3/Q4; options B and the First Light rule set go to the founder (Q1, Q5)** | §5 |

## 1. What the readout says, and what I add to it

From the readout, unedited (§0, §3): the GAM's ΔR against default-order in the base cell is +0.0000 to +0.0023 by persona (mean +0.0010). No interval in any pass cell reaches δ_min = 0.01; the largest upper end is +0.0075 against default-order and +0.0092 against draft-rules. So this is not a power problem. Nothing is harmed. No per-term pair meets its rule.

**My arithmetic, not an eval result.** The readout has no draft-rules vs default-order pair. Because every policy runs on the same seeds with common random numbers, the per-persona mean of draft-rules − default-order equals (gam − default-order) − (gam − draft-rules), exactly. I computed it from verdicts.json (`pass/`). It has no interval, because the paired SD cannot be recovered from two pairs.

| cell | draft-rules − default-order, by persona (curious, crammer, struggling, returning, wanderer, lapsed) |
|---|---|
| base | +0.0024, −0.0033, +0.0029, −0.0016, +0.0004, +0.0024 |
| prereqPenalty-high (the cell most favourable to ordering) | +0.0032, −0.0036, +0.0074, −0.0015, +0.0005, +0.0049 |
| learnRate-low | −0.0010, −0.0057, −0.0006, −0.0029, −0.0037, −0.0033 (all six below default) |
| range over all 10 pass cells | −0.0057 to +0.0074 |

So **the draft rules also do not beat the default order by anything near 1 point**, in any cell. They move 37 to 44% of cards (readout §6 descriptive), about twice the GAM's share, for the same non-result. At the low learn rate, which C0/C2 say is the better-sourced end (Fazio 2010, about 0.34), they are below default for every persona. None of these is harm under the δ_harm 0.01 rule.

**The headroom reading.** The reference rows (readout §6) show that `random` order loses 0.58 to 1.64 points against default-order. In this world, then, the whole spread between a shuffled feed and the curriculum order is about one point of 1-day recall, and every ordering we built sits inside ±0.75 points of the curriculum order. The judge was not built to measure how much any ordering *could* gain (there is no oracle policy), so I cannot say whether the GAM is weak or the world leaves ordering no room. Three of the readout's own notes say the world under-tests ordering: F4 (the prerequisite contrast is about 0.6 of nominal), F7 (recall is read at about 1 day; the 1 to 7 day window is never exercised), F16 (prior knowledge fixed at 0.20). The base learn rate 0.70 is unsourced and at the top of the range.

**What I do not do with that.** These are reasons the world might be too narrow. They are not reasons the GAM passed. The FAIL stands as the record. A wider world is a new criterion with its own freeze (§5 option C), and readout 1 is reported beside anything it produces.

## 2. Per term

### Novelty: killed

The rule (pre-freeze §3, set before data): novelty stays only if `gam` passes the per-term rule against `gam-no-surprise-novelty` in the base cell with the judge's novelty benefit at 0. Readout §0 fact (2): 0 wins, 0 harmed; per-persona Δ −0.0011 to −0.0000, three intervals entirely below 0. It also wins nothing at benefit +0.05 (the readout ran the sweep I asked for), so the kill does not rest on the judge assuming 0.

**Effect, after C5:** model-v0.2.2 adds `noveltyGate` (inactive) on the pattern of `surpriseGate`, so `gam` composes without the novelty term. Version bump, a change-log line in company/decisions/2026-10-16-personalization-model-v0.md (with the `privacy:` line the self-check requires), and self-check passing. That is my item (board, W-1536 follow-up). The repeat damping (`novelty.perSimilarRecent`) goes with it. If massed repeats appear, G2 (distinct concepts) is what catches them, and a repeat constraint is applied-scientist-personalization's to propose, not mine to write. I write no weight.

Why not change the model in this run: the decision is conditional on C5, and the model on main should match the code the readout ran until the reproduction is in.

### Surprise: stays off

The gate was already shut in the shipped model (model-v0.2.1). The counterfactual `gam-surprise-on` met the per-term rule in no cell, **including ρ = 1 with surprise high**, where the world rewards surprise most and the ratings are as good as the design allows (readout §0 fact (1); F17 notes ρ = 1 is not perfect ratings). In pre-freeze §2 I wrote: "If the term cannot pay even when the world rewards surprise at the high end and the ratings are fair, ratings will not save it." It could not. The gate stays shut. I remove no code: the term costs nothing while shut, and the msr-v1 rubric (company/personalization/dims/2026-10-16-misconception-strength-rubric.md) stays as an instrument.

One caveat from the readout that I carry, not use: F12 says the hypercorrection boost is near its cap at 1 day. A world that reads recall at 1 to 7 days could treat surprise differently. That would be tested only inside a new criterion (option C), with a new trigger written before its run. It does not reopen C3 now.

### Breadth: no recall credit, not killed

`gam` vs `gam-no-breadth`: 0 wins, Δ between −0.0009 and +0.0001. I set no kill rule for breadth before data, and I will not write one after seeing the number. Breadth exists for the mission's "without trapping them in a bubble", which the criterion measures with G1 (top-domain share), not with R. It earns no recall credit. While the GAM is stopped this changes nothing. If any composer reaches a new criterion, breadth must show its G1 effect there, against a rule I write before that run.

## 3. C3: cancelled

The trigger (pre-freeze §2): `gam-surprise-on` passes the per-term rule at ρ ≤ 0.5 in the surprise-high cell or better. It passes in no cell. C3 is **cancelled**, not held: W-1515 step 1b closes. If a future criterion's readout meets a trigger I write before that run, C3 comes back as a new item with the batch-1 brief. The 12 msr-v1 anchors already rated are kept.

## 4. What phase A's FAIL means for the GAM and for phase B

1. **The GAM as it stands is stopped.** I committed before data that a FAIL means no phase B on it and no curve tuned to win a cell back. Both hold. applied-scientist-personalization gets no tuning brief from this readout.
2. **There is nothing to tune from customer data yet.** The founder's "tune from customers' data" assumed a model with an edge worth tuning. Phase B's MDE table (readout §3) needs about 47,000 eligible learners to detect 1 point, and about 890,000 to detect the GAM's best simulated per-persona edge. Even if the world is right and the edge is real, we could not see it live at any scale we expect soon.
3. **No phase B is registered for anything.** The draft rules have no recall case either (§1). AMD-008 F1 (the default order) stays what every learner gets. My `personalization_on` position (pre-freeze §4, option A) already does the right thing: NULL serves F1 when no experiment is registered.
4. **What is not concluded:** that personalising cannot help recall. Phase A tested ordering *new* lessons, reading recall at 1 day, in a world with fixed prior knowledge and an unsourced learn rate. The largest recall effects in the evidence (spacing and retrieval practice) are about *when* to bring a lesson back, over days. This world never exercises that (F7). That is a reason for one more, differently shaped question, not for a re-run.
5. **The First Light rule set.** Release 1's scope includes "rule-based personalization" (company/decisions/2026-10-15-first-light-release-1-scope.md Ruling 4; I own the rule set). Phase A gives it no recall support. Whether it stays in First Light's learner-visible scope is the founder's call (Q5). Until he answers, my position is that it ships switched off: the off switch and settings plumbing are kept, the order served is F1.

## 5. Options, costs, recommendation

| | Option | What it buys | Cost | My view |
|---|---|---|---|---|
| A | **Stop personalised ordering; ship nothing personalised.** Default order (F1) for everyone; keep the simulator, eval harness and HQ lab as assets | Clarity; no Goodhart risk; org capacity freed | Zero build. Loses the founder's GAM direction for now. The org has little to do in lane 14 beyond upkeep | **The floor I fall back to** if the founder declines C, or if C's headroom check fails |
| B | **Ship only the draft rules behind a registered experiment** | A live product feature ("practise what you got wrong") and real data about it | Experiment registration (analytics-steward), privacy pass, reason copy as claims (fact-checker), rule functions (learner-model-engineer), the accounts milestone and W-706. Recall is unmeasurable at our scale (MDE 3.1 points at 5,000 learners), so the test could only show "no harm to guardrails" | **Not recommended.** No recall case (§1: −0.57 to +0.74 points, below default in every persona at the low learn rate), twice the GAM's moved share, and it would be the shape the mission warns against: a feature kept for reasons other than recall |
| C | **Widen what the simulator can show, as a new criterion (criterion 2), headroom first.** learning-scientist-personalization gives sourced ranges for forgetting over 1 to 7 days (F7), population prior knowledge (F16) and the learn rate base; personalization-eval writes and freezes criterion 2 with revisits spread over days and an **oracle ordering** (knows the hidden state) as the headroom reference; then scores `default-order`, `draft-rules` (as a named pair against default), `random`, and the GAM *as frozen at model-v0.2.2* | Tells us whether **any** ordering can move recall by δ_min in a better-sourced world, before anyone builds more | About 4 to 5 agent runs: one evidence memo, one criterion draft + C2-style fidelity review, one freeze + scored run (≈ 1 hour of compute), one reproduction. No learner data, nothing in `src/` | **Recommended**, under the pre-commitments below |
| D | **Change the objective's shape: from "which new lesson next" to "when to bring a lesson back"** (review timing; the existing `due-revisit` reason). Still traceable code; curves could still be the form | Aims at the effect with the strongest evidence (spacing, retrieval practice) | Changes the founder's direction (needs, surprise, novelty). New model work by applied-scientist-personalization, a new criterion, and the backend recall data (W-706) before any live test | **Ask the founder (Q4).** If he says yes, it is tested inside C's world as a second candidate, not instead of the headroom check |

**Pre-commitments for option C, written now, before criterion 2 exists:**
1. Readout 1's FAIL is the record for model-v0.2.1. Criterion 2 does not "re-run" it, and the GAM is not re-tuned for it. The GAM enters criterion 2 only as frozen at model-v0.2.2 (novelty off, nothing else changed).
2. The world's ranges come from learning-scientist-personalization's evidence, set before any policy is scored. I choose none of them. The eval may refuse any I ask for.
3. **Headroom first.** If the oracle does not beat default-order by δ_min for at least 4 of 6 personas in criterion 2's base cell, personalised ordering of lessons for recall is closed: I recommend option A to the founder and stop lane 14's model work.
4. If the oracle has headroom and the GAM still fails, the GAM approach is closed. Any next composer is a new design (option D or another), with its own criterion.
5. A pass in criterion 2 is not a phase B. Phase B still needs the accounts milestone, W-706, a registered experiment, a privacy pass and the founder's deploy approval, and its registration states the MDE against the simulated Δ.

## 6. Questions for the founder (not decisions)

These change the direction he gave (company/personalization/2026-10-16-founder-brief.md §1, §6). Routed through chief-of-staff (board).

> **Q1. Stop the GAM recommender for now?** Phase A failed. In simulation, the GAM ordering gave less than a quarter of a point more next-day recall than the plain default order (the bar was 1 point). The extra simple rules did no better. An edge that small could not be measured live without about a million learners. I propose: no GAM curves go live, no live test of them, and everyone keeps the default order. The code, the simulator and the HQ lab stay. **Yes / no?**
>
> **Q2. Surprise and novelty as recommender terms are off. Do you want either back as something the learner chooses?** Neither helped simulated recall: novelty slightly lowered it, and surprise failed even with perfect ratings. I have turned novelty off and cancelled the 218-lesson surprise rating job. If you still want them, I would offer them as a learner-chosen mode (for example "show me something new"), not as hidden ranking. That would be judged on "does no harm", not on recall. **Learner-chosen mode / leave them off?**
>
> **Q3. One more offline study, headroom first?** About 4 to 5 agent runs, no learner data. A new, pre-registered simulation that models forgetting over a week and different starting knowledge, and first measures how much the best possible ordering could help. If even that cannot reach 1 point, we close personalised ordering for recall and I say so. **Approve / stop here?**
>
> **Q4. May I aim personalization at *when* to review rather than *which new lesson*?** The strongest learning evidence is about bringing a lesson back just before you forget it. That moves away from your "needs, surprise, novelty, engagement" framing, though it can still be curves in code. If yes, it becomes the second candidate in the Q3 study. **Yes / no?**
>
> **Q5. First Light's "rule-based personalization": keep it in release 1?** The draft rules showed no recall gain in simulation (within ±0.75 points of the default order, and below it for every simulated learner at the better-sourced learning rate), while reordering about 40% of cards. My recommendation: release 1 ships the off switch and settings but serves the default order, and the rule set stays off until a study supports it. **Ship it off / ship it on behind an experiment / drop it from scope?**

Not asked, because it does not change: badges and points still wait for phase C's definition of "learned" (founder ratification §6 Q4). Engagement stays a guardrail (§6 Q1).

## 7. Independent of the founder's answers (can go into a partial batch 3 now)

1. **C5 reproduction** (W-1535, learner-model-engineer): already in flight; everything here waits on it.
2. **Novelty gate-off, model-v0.2.2** (vp-personalization, after C5): my keep/kill authority, offline only; needed under every option (A leaves the model parked in its honest state; C freezes it as is).
3. **Close C3 / W-1515 step 1b** (board note now).
4. **Ongoing, unaffected by direction:** W-1539 HQ lab review nits (personalization-engineer); privacy and settings work for the off switch (W-1521 and its privacy read), since option A and Q5's recommended answer both need the off switch and F1 serving.
5. **WBR:** readout 1 presented unedited with this record beside it.

**Waits for the founder:** the criterion 2 evidence memo and criterion (Q3), any review-timing model (Q4), any learner-chosen novelty or surprise mode (Q2), the First Light rule set's status and its reason copy (Q5), any experiment registration (Q1, Q5). I do not write batch 3 for those until he answers.

## Objections

| From | Objection | Answer |
|---|---|---|
| personalization-eval (readout §2 F7, F16; conditions paragraph) | The world never reads recall past about 1 day, fixes prior knowledge, and its base learn rate is unsourced | **Accepted as limits; not used to soften the FAIL.** They define option C's world (§5), as a new criterion with pre-commitments, not a re-run |
| learning-scientist-personalization (B2 memo, Disagreements) | No evidence that the novelty term serves recall | **Upheld by the data:** novelty killed (§2) |
| learning-scientist-personalization (C2 F2) | learnRate 0.70 is unsourced; Fazio gives about 0.34 | **Accepted.** The readout ran 0.35 as a pass cell; the GAM and the draft rules gain nothing there (§1). The base for criterion 2 is learning-scientist-personalization's to source |
| founder's brief (§1, his words) | He asked for GAM curves tuned from data, surprise, novelty and engagement | **Not overridden.** The parts this readout bears on go to him as questions Q1 to Q4 (§6). I decided only what my pre-registered rules already decided |
| my own pre-freeze record (§1 bars) | "No phase B on the GAM as it stands, and no curve tuned to win a cell back" | **Kept** (§4) |
