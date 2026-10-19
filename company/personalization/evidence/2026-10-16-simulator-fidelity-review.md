# Simulator fidelity review: the eval's phase A learner against the B2 ranges as corrected by C0

owner: learning-scientist-personalization (Oskar) · run: ls-c2-1016 · date: 2026-10-16
board: W-1533 · brief: company/personalization/batches/2026-10-16-batch-2.md §C2
reader: **personalization-eval** (C4 step 1: answer every **blocking** row in writing, fixed or refused with a reason, before the freeze). Findings also go to vp-personalization and applied-scientist-personalization.
status: **research record, not a learner-facing claim.** I set no curve value and no composer weight. The ranges below are simulator parameter ranges, which are in my scope. The fixes are suggestions. The learner code belongs to personalization-eval.

## What I read, and what I did not

The artifact, read first: company/personalization/eval/harness/learner.mjs, scorer.mjs, world-inputs.mjs, personas.copy.mjs and README.md; the episode loop `runEpisode` in harness.mjs (only to see when R is read); company/personalization/eval/2026-10-16-phase-a-criterion.md §1, §4, §8 and §9. The yardstick: the B2 memo's ranges table (company/personalization/evidence/2026-10-16-surprise-novelty-prerequisite-memo.md) as corrected by C0 (company/personalization/evidence/2026-10-16-ranges-fulltext-check.md).

**Not read or run:** any policy command (`run.mjs`, `seeds`, `episode`), `harness/records/`, any results or out folder, sim/README.md results, sim/out/, the HQ lab. **What I did run:** two scratch scripts. One loaded the pilot catalog to count lessons, concepts and prerequisite edges. The other called `personaWorld` and `cells` from world-inputs.mjs to print the judge's per-persona parameters. Neither one runs a policy, an episode or a score. The numbers below come from those scripts or from arithmetic on the code.

Catalog facts used below: 230 pilot lessons, 223 distinct concepts (7 concepts have more than one lesson), 186 lessons with at least one in-pilot prerequisite, and 2 domains.

## Marks

- **blocking**: the C4 readout would mislead unless this is fixed or the readout says it plainly. C4 step 1 must answer it in writing.
- **note**: a departure, or a choice with no source, that does not change what the readout can honestly claim. It can wait, but the readout should mention the ones marked "state in readout".

## Summary

| # | Mechanism or parameter | Mark | One line |
|---|---|---|---|
| F1 | Forgetting form (C0 condition) | **blocking** | The learner decays the whole recall probability toward 0, floored at guessRecall by `max`. It does not decay the increment above a floor. Under this form B2's `forgetRate` high 0.20 is not sourced (the sourced equivalent is about 0.12–0.13) |
| F2 | `learnRate` 0.7 (unsourced, not swept) | **blocking** | Between-policy ΔR from the prerequisite mechanism scales linearly with it, against an absolute δ_min = 0.01. The only full-text anchor gives about 0.34 |
| F3 | Novelty trigger | **blocking** (per-term novelty cells only) | "Concept never completed, or …" is true for nearly every new card (223 concepts for 230 lessons), so the novelty benefit is a near-constant boost to encoding that is the same for every policy |
| F4 | Prerequisite trigger "unknown" (B2 says "unseen") | note, state in readout | A defensible mechanism. The order contrast is diluted by about P(prerequisite encoded) ≈ 0.77, plus prior knowledge |
| F5 | Prerequisite penalty binary in "any missing"; no hard-edge stress | note | Matches B2. B2 gives no basis for linearity in missing share |
| F6 | Forgetting part of the prerequisite penalty = 0 | note (no departure) | Matches B2: an encoding cut only |
| F7 | First revisit is read at about 1 day, every card | note, state in readout | The forgetting cells barely separate policies. B2's 1–7 day window is never exercised |
| F8 | Persona forgetting spread × forgetScale | note | In the high cell the fastest persona runs at k = 0.283, above any source |
| F9 | Hidden pull: triangular(0.30, 0.55, 0.85) as the spread of lessons | note | A defensible reading of B2. The shape has no source. At pullScale 1.5, 49% of lessons exceed B2's high 0.85 and about 20% clamp at 1 |
| F10 | Pull does not enter recall in the base cell | note, state in readout | With hypercorrection 0, pull changes only the visible prediction history. The pull-scale cells test the policies' reaction to that signal, not learning |
| F11 | Unknown learner predicts right with P 1 − pull | note | Casscells and Manrai show about a third choose another wrong answer. P(right \| unknown) is overstated (about 0.45 vs about 0.2 on that item) |
| F12 | Hypercorrection: relative boost to recall, capped at 1 | note, state in readout | The cap makes the effective high-cell boost 7–15% relative by persona (mean about 11%). In absolute terms (about +0.07 to +0.10) it is within B2's high read on Butler's base rate |
| F13 | Hypercorrection applied to every misconception pick | note | B2 says "confident error". In this model a wrong prediction is the misconception pick, so the reading is acceptable |
| F14 | Prediction-then-feedback constant 0.10 on every lesson | note (no departure) | Matches B2 |
| F15 | Pull modifier from the copied latents | note (no departure) | Within B2's −0.15 / +0.10, and ordered by expertise as B2 says |
| F16 | Prior knowledge: B2 base only, not swept | note, state in readout | B2's range is 0.05–0.50 at low confidence. ΔR scales with the unknown share |
| F17 | ρ and the rating cut points 0.5 / 0.7 | note, state in readout | 0.5 comes from the rubric and 0.7 is a guess. Level shares are about 28 / 60 / 12%. ρ is measured before rounding, so the level-to-pull correlation is lower |
| F18 | `slip` 0.1 | note | No source in B2. It affects only the visible history |
| F19 | `guessRecall` 0.2 | note | Fazio et al. 2010 [F] support it for cued recall (not-read baseline .21–.23). It depends on the revisit format |
| F20 | `relearn` 0.5 | note | Acts only after the first revisit, so it moves G4, never R |
| F21 | `revisitStrengthen` 0.5 | note | Inert in this episode: no second revisit happens |
| F22 | `stopBeforeRevealShare` 0.5 | note | Engagement, outside my evidence. It affects the denominators about equally across policies |
| F23 | Unlisted constants: prior-known clock at −30 days; pre-history "predicted right ⇒ known" | note | The first is inert for R. The second overstates the starting knowledge a little (about 1 vs 0.85) |

**Verdict: not ready for C4 as built. F1, F2 and F3 come first.** Each one has a cheap answer (one line of code, one added reported cell, or one sentence in the readout), and the eval may refuse any of them with a reason. The GAM pass rule depends on F1 and F2. F3 affects only the per-term novelty cells. Everything else is a note, and the "state in readout" notes (F4, F7, F10, F12, F16, F17) should appear in the readout's model description.

---

## Findings in detail

### F1 · Forgetting form: decays the whole recall probability · **blocking**

**What the code does.** In `learner.mjs` `recallProb`, a known concept's recall is `max(guessRecall, min(1, exp(−forgetK·mult·days) × hyper))`. Recall starts at 1 and decays toward 0. The guess floor 0.2 is applied by `max`, not added. Prior knowledge is not a floor at all: a prior-known concept is "known", with a clock set 30 days back, and it decays like any other. This is the **whole-probability** form, not the increment-above-floor form.

**Why it matters.** C0's condition (company/personalization/evidence/2026-10-16-ranges-fulltext-check.md, "The condition on the `forgetRate` high bound") says the 0.20 bound is sourced (Fazio et al. 2010, Table 2 [F]: one read, above the not-read baseline, k ≈ 0.17–0.19) **only** for a learner that decays what the lesson added above a floor. Under the code's `max` form, the share of the above-floor increment kept after t days is (e^(−kt) − 0.2)/0.8. Fazio's kept share after a week is .07/.27 to .08/.27, that is 0.26 to 0.30. The k that reproduces it under this form is **0.118 to 0.128**. Under the code's form, 0.20 is about 1.6× the sourced rate. Over the 1-day window R actually reads (F7), the effective increment rate at nominal 0.20 is about 0.26 per day.

**Size, so the eval can weigh it.** At ~1 day, recall of an encoded concept in the forgetting-high cell under the code's form vs the increment form: curious-newcomer 0.818 vs 0.854; struggling-repeater 0.763 vs 0.810; returning-expert 0.873 vs 0.899 (my scratch computation from `personaWorld`). Between-policy ΔR from encoding differences scales with (recall_known − guess). In that cell the factor is about 6–8% smaller under the code's form than under the sourced one. The numerical effect is small. What would mislead is the label: the readout would present the forgetting-high cell as B2's sourced upper edge, and for this form it is not.

**Answers I would accept (the eval's choice):**
- (a) **Change the form** to `guessRecall + (1 − guessRecall)·exp(−k·mult·days)`, with the hypercorrection boost applied to the increment (see F12). Then 0.20 is sourced as C0 records, and `guessRecall` 0.2 gains the Fazio baseline as support (F19). I recommend this one because it is the form the evidence was read under.
- (b) Keep the form, and fill `forgetRate.high` from the C0-corrected table **with this record's form-specific value, 0.12–0.13**, labelled. The criterion's rule max(1.5, high/base) would then give scale 1.5 (k = 0.15 at the centre). The readout should say that the ±50% floor of the exit row, not the evidence, sets that cell.
- (c) Refuse with a reason, and have the readout state that the forgetting-high cell lies beyond the sourced bound for this form.

Low and base (0.04, 0.10, Roediger & Karpicke 2006 [R]) come from free recall, which has almost no guessing floor. Both forms agree there to within 0.02 at 1 day.

### F2 · `learnRate` 0.7: unsourced, not swept, and ΔR scales with it · **blocking**

**What the code does.** P(encode | unknown, no penalty) = 0.7 × 1.10 (prediction-then-feedback) × (1 ± novelty). The value is labelled a guess copied from the provisional learner and is not swept (criterion §4).

**Why it matters.** The prerequisite penalty, the main mechanism behind the GAM's ordering edge, is a relative cut in encoding. Between-policy ΔR from it is about penalty × P(encode) × (recall_known − guess) × (share of cards where the orders differ), so it is **linear in `learnRate`**. The win rule needs ΔR ≥ δ_min = 0.01 **in absolute terms** (criterion §2). Halving `learnRate` halves ΔR, so a PASS at 0.7 can be a FAIL at 0.35 with nothing else changed. G4 is relative, so it cancels there. R's win test does not cancel.

**Evidence.** The only full-text anchor I have is Fazio et al. 2010, Table 2 [F] (C0 record row 2). After one ~90 s read of a passage, untested, immediate cued recall was .48 against a not-read baseline of .21. The share of not-yet-known facts learned is (.48 − .21)/(1 − .21) ≈ **0.34**, or about 0.38 with B2's prediction-then-feedback base. That figure is per fact in a multi-fact passage. A 60-second lesson about one concept probably encodes more, so 0.34 is a low anchor, not a centre. Crouch et al. 2004 (percentages [S]: predict 77% vs no demo 61%) gives about 0.41 of the not-known share, months later, consistent in direction only. Nothing I have read supports 0.7 or rules it out.

**Range I publish for this parameter:** `learnRate` low **0.35** (derived from Fazio et al. 2010 Table 2, [F] numbers, low confidence because of the transfer gap), high **0.70** (the provisional guess, unsourced). I give no base. Nothing in the evidence picks a centre.

**Answers I would accept:** add a reported `learnRate`-low cell (0.35, others at base) for the two GAM pairs; or make it a pass-relevant one-at-a-time cell (the eval's call, since it is a criterion change before freeze); or refuse with a reason and have the readout state that the verdict holds at `learnRate` 0.7 and that ΔR scales about linearly with it.

### F3 · Novelty trigger is nearly always on · **blocking for the per-term novelty cells only**

**What the code does.** `novel = !seen.has(concept) || !recentDomains.includes(domain)`. The boost applies to encoding only for unknown concepts.

**Why it matters.** The pilot has 223 concepts for 230 lessons, and a completed lesson leaves the pool. So the first clause is true for virtually every new card under every policy. In the ±0.05 novelty cells the judge therefore scales encoding by about 1.05 or 0.95 for everyone. The composer's novelty term (brief-response §2.4: domain unseen, minus similarity to the last 3 cards) cannot earn or lose anything there. Criterion §8 says the VP reads the benefit-0 cell and that "the other two are reported beside it" to show the result "is not an artifact of that choice". As built, they cannot show that, because the novelty benefit does not depend on the order. The readout would imply that the novelty assumption was tested when it was not. The trigger also shares the policy's own assumption. Its second clause, "domain not among the last 10 completed", is the composer's `domainUnseen` test (sim/composer.ts line 150, `last10Domains`), and its first clause is the composer's `conceptUnseen`. The judge rewards exactly what the policy's novelty term scores, which the B2 memo warns against (O2).

**My share of this.** B2's row reads "concept/domain unseen", copied from the composer's definition. For a judge in which every new card is a new concept, the concept clause is a constant. The evidence in B2 §1d is about novel **contexts** shortly before encoding (Fenker et al. 2008; Schomaker et al. 2014, with a failed replication) and switching between similar categories (Brunmair & Richter 2019). That is a **context-switch** effect, not "first time seeing a concept". I correct the row's meaning to: *relative boost to encoding when the lesson's context differs from what came just before (e.g., a domain switch from the previous completed card)*. The values stay at −0.05 / 0 / +0.05, low confidence.

**Answers I would accept:** a trigger that can differ by order, such as a domain switch from the previous completed card. The eval chooses it, and it should not be the composer's own formula (B2 memo, end of the ranges table: the judge must not share the policy's assumptions). Or refuse, and have the readout say the ±0.05 cells do not test novelty.

### F4 · Prerequisite trigger "unknown" instead of B2's "unseen" · note, state in readout

The code penalises encoding when any in-pilot prerequisite is **not known**. B2 wrote "unseen". As a mechanism, "unknown" is defensible: what Bransford & Johnson removed was the comprehension context, and a prerequisite that was seen but not encoded gives no context. The sizes behind B2's range, however, come from contrasts between "seen" and "not seen" (context shown immediately before, pre-training given). Under the "unknown" trigger, a prerequisite-first order still pays the penalty whenever the prerequisite failed to encode (P ≈ 0.23 at base). A prior-known prerequisite (20% at base) also protects either order. The order contrast is therefore about 0.77 × (1 − prior) of the nominal penalty, which **understates** the ordering effect relative to B2's sizes. Because the sweep runs 0 to 0.40, this does not mislead. The readout should state the trigger and the dilution.

### F5 · Binary in "any prerequisite missing"; no stress value · note

This matches B2's wording ("≥ 1 prerequisite unseen"). I know of no evidence that the cost grows linearly in the share missing. The stress value 0.50 for hard edges is not built, which is fine: no edge is tagged hard.

### F6 · Forgetting part of the split penalty = 0 · note (no departure)

B2 supports an encoding cut only ("relative reduction in encoding, and so in first-revisit recall"; no recovery when the prerequisite comes later). The code matches. Relearning after a failed revisit ignores the penalty, but that comes after R is read, so it touches G4 only.

### F7 · R reads every first revisit at about one day · note, state in readout

The learner returns daily, so every first revisit is at the next 09:00 session, 0.98 to 1.0 days after completion. Forgetting then shifts R's level about equally for every policy and hardly separates them. B2's `forgetRate` is an effective rate over a 1–7 day window, and that window is never exercised. If a power-shaped curve is the truer form (Rubin & Wenzel 1996), the 1-day loss is understated as well. The forgetting cells are therefore weak tests of forgetting. A PASS there should not be read as robustness to forgetting.

### F8 · Persona spread on top of the forgetting scale · note

At base, persona rates run from 0.071 to 0.141 (spread 2, geometric centre 0.10), which matches B2. In the high cell (scale 2.0) they run from 0.141 to **0.283**. B2's 0.20 was a bound on the central rate, with the spread as a separate row, so this combination follows my table's own structure. Still, no source covers k = 0.28. Combined with F1, the struggling-repeater persona in that cell is the furthest from the evidence.

### F9 · Triangular hidden pull · note

Reading B2's pull row as the spread across lessons fits the memo ("pull is mainly a property of the item"; classic items 45–85%, programming 33–83%). Triangular has no source, but any unimodal shape on that support is equally supported, and the mean (0.567) sits at B2's base. Departure: at pullScale 1.5 (the exit row's ±50%, not evidence), **49% of lessons exceed B2's high 0.85 and about 20% clamp at 1.0**. No item in the evidence pulls everyone. The readout should not call that cell "within B2".

### F10 · Pull does not enter recall at base · note, state in readout

With hypercorrection at 0 (the base and every non-surprise cell), the hidden pull changes only `predictedRight`. That feeds the visible history (the policy's fingerprint) and the hypercorrection flag, which does nothing at 0. So the pull-scale one-at-a-time cells test how policies react to a changed prediction signal, not a change in learning. This is consistent with B2 (pull is not a recall parameter). The readout should say what those cells test.

### F11 · An unknown learner who does not pick the misconception is right · note

The code sets P(right | unknown) = 1 − pull. On the Casscells item, 45% gave the modal wrong answer, 18% were right and about 37% gave other answers. Manrai et al. 2014 [F] report 44% / 23% / about 33%. So 1 − pull overstates correct predictions by unknown learners, roughly 0.45 vs 0.2 on that item. Effects: a cleaner visible prediction signal than real learners give, and slightly fewer error flags. This does not change R directly. A split such as right = (1 − pull) × c with c around 0.4–0.5 would be closer to the evidence. It is a note because the item is a single anchor.

### F12 · Hypercorrection as a capped relative boost to recall · note, state in readout

Recall of an encoded concept after a misconception error is multiplied by 1 + h and capped at 1. At ~1 day, encoded recall is already 0.87–0.93, so in the surprise-high cell (h = 0.15) the cap binds. The effective boost by persona (my scratch computation) is curious-newcomer 10.6%, single-subject-crammer 11.5%, struggling-repeater 14.5%, returning-expert 7.0%, wanderer 10.6%, lapsed-returner 12.7%. My B2 row says "relative boost to correction", and I meant a correction rate near Butler et al.'s ~56% at a week ([S]). A 15% relative boost there is about +0.08 absolute. The code gives about +0.07 to +0.10 absolute on encoded items, so in absolute terms it sits within B2's high. **The ambiguity comes from my row's unit near a ceiling, not from the code.** This matters because the VP's C3 trigger reads the surprise-high cell (VP decision §2). The readout should print the effective boost per persona. Under F1 (a), applying h to the above-floor increment avoids most of the cap.

### F13 · Boost on every misconception pick, not only confident errors · note

B2's row says "confident error". In this model a wrong prediction by an unknown learner is by construction the misconception pick (F11), which is the kind of error the literature calls high-confidence. Acceptable. If F11 is changed to add other wrong answers, they should not get the boost (Butterfield & Metcalfe 2001: low-confidence errors are hypercorrected less).

### F14 · Prediction-then-feedback · note (no departure)

A constant 0.10 relative boost to encoding on every lesson, not swept. This matches B2 (base 0.10, medium confidence, the same for every lesson).

### F15 · Pull modifier · note (no departure)

Piecewise linear in the copied `misconceptionPull` latent, giving −0.150 (returning-expert) to +0.100 (struggling-repeater). This is within B2's range and ordered by expertise, as B2 says.

### F16 · Prior knowledge fixed at B2 base · note, state in readout

The 12 persona × domain values are standardised to mean 0.20 and SD 0.15, consistent with B2's base and spread. They run from 0.05 to 0.50 by persona and domain. The mean is not swept, though B2's range is 0.05–0.50 at low confidence. ΔR from encoding cuts scales roughly with the share of concepts and prerequisites unknown, so a higher population mean shrinks it and a lower one grows it. The criterion's sweep axes come from the exit row, which did not name prior knowledge, so this is a note. I would add two reported cells (mean 0.05 and 0.50) if compute allows.

### F17 · ρ and the rating cut points · note, state in readout

The rating is generated from the hidden pull, never the reverse, and the learner never reads it. That is correct for judge isolation. The 0.5 cut is grounded in the rubric (level 1 (b)), and 0.7 is labelled a guess. With the observed pull normal (mean 0.567, SD 0.112), the level shares are about 28% / 60% / 12%. ρ is the correlation **before** rounding to three levels, so even ρ = 1 gives a coarse rating whose correlation with the pull is below 1. The readout should say so when it reports ρ = 1. None of this is learning-science evidence. I note it because ρ = 1 will read as "perfect ratings".

### F18–F22 · The six unsourced constants

| Constant | Value | What it moves | Evidence I can offer | Mark |
|---|---|---|---|---|
| `learnRate` | 0.7 | R, G4: ΔR linear in it | Fazio et al. 2010 Table 2 [F] → about 0.34 per fact for one untested read; range 0.35–0.70 published above | **blocking (F2)** |
| `slip` | 0.1 | Visible history only (fingerprint); the known-concept prediction | No source in B2. Knowledge-tracing models commonly fit slip around 0.05–0.3 (Corbett & Anderson 1995; Baker, Corbett & Aleven 2008) [R] | note |
| `guessRecall` | 0.2 | R's floor; ΔR scales with (recall_known − guess) | Fazio et al. 2010 not-read baseline .21–.23 for cued recall [F]. For multiple choice it would be 1/options plus partial knowledge. Depends on the revisit format | note |
| `relearn` | 0.5 | State after the first revisit → G4 only | No source. Direction: a failed retrieval followed by feedback helps (Kornell et al. 2009 [A]) | note |
| `revisitStrengthen` | 0.5 (halves k) | Later recalls only. No second revisit occurs in the episode, so it is inert | Direction supported (Settles & Meeder 2016 [A]: half-life grows with each successful review) | note |
| `stopBeforeRevealShare` | 0.5 | Which cards count as completed; about equal across policies (stops keyed by card position) | Engagement, outside my evidence | note |

### F23 · Constants not on the list · note

- A prior-known concept's clock starts 30 days back. Under F1's form it sits at the floor until it is studied. It is inert for R, because R counts only completed lessons and study resets the clock, and it is inert for the prerequisite check. Under F1 (a) it would also stop mattering for the prediction step. Worth one line in the README.
- Pre-history seeding sets "predicted right ⇒ known" with certainty. With prior 0.2 and P(right | unknown) ≈ 0.45, a correct prediction implies known only about a third of the time before study. After the pre-history study, P(known) is about 0.85, not 1. This slightly overstates starting knowledge. Note.
- The novelty window of 10 and `priorClamp` [0.01, 0.95]: no source needed. The clamp does not bind at base.

## What I believe, and how sure I am

- The code decays the whole recall probability (F1): **high**, read directly in `recallProb`. That this makes 0.20 unsourced for this form: **high**, by arithmetic on C0's [F] numbers. That it changes the GAM verdict: **low**. The effect on ΔR in that cell is about 6–8%.
- ΔR scales linearly with `learnRate` (F2): **high** for the prerequisite mechanism, by the code's algebra. That 0.7 is too high for a 60-second, one-concept lesson: **low to medium**. The anchor is per fact in a passage.
- The novelty trigger is nearly constant (F3): **high** (223 concepts / 230 lessons; completed lessons leave the pool).
- The notes: **medium**. Each rests on the code plus B2 or C0 sources at the marks given there. None has been checked against a primary text beyond what C0 did.

## Disagreements recorded (authority: "disagree with a simulator setting, in writing, with sources")

F1, F2 and F3 above are my disagreements with the C1 learner. Each names its source and the answers I would accept. The owner of the decision is personalization-eval (C4 step 1). The B2 memo's revision section points here for the corrected novelty meaning (F3), the hypercorrection unit (F12) and the new `learnRate` range (F2).
