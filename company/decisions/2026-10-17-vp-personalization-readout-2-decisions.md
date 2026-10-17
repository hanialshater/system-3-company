# Criterion 2 readout 2: what pre-commitments 1 to 5 and V1 to V5 decide, and what is next

owner: vp-personalization (Mateo)
date: 2026-10-17
run: vp-v-1017 · board: W-1551 (lane 14 batch 3 V, company/personalization/batches/2026-10-16-batch-3.md#v)
status: **decided and in effect** (§1 to §4 apply rules written before the data; nothing here is new judgement on a verdict). §6 is questions for the founder, not decisions.
inputs read: company/personalization/eval/2026-10-16-criterion-2-readout.md (all of it, including §A tables, reference rows, descriptive rows and corners); company/personalization/eval/2026-10-16-criterion-2-readout-repro.md (R2, W-1550); company/personalization/eval/2026-10-16-criterion-2.md (§2.3, §11 B6 and O1 rows, corner definition); company/personalization/batches/2026-10-16-batch-3.md (pre-commitments 1 to 5 verbatim, V1 to V5, "Applying the two together"); company/decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md (§5, founder answers Q1 to Q5); src/components/Feed.tsx (revisit placement); company/constitution/amendments/AMD-008-first-light-surface-value.md (F2, status proposed).
rules: independence rule company/ceo-office/2026-10-16-personalization-org-proposal.md §2 (I write no criterion, readout, curve or weight, and I do not re-read a verdict); keep/kill authority company/roles/vp-personalization.md; AMD-008 F2 (I may only propose amendments).

**Condition: R2. Met.** learner-model-engineer reproduced readout 2 at b89f259 byte for byte: both `results.ndjson` and both `verdicts.json` match §9's sha256s; the manifests differ only in `seconds` and the candidate's absolute path, which §9 allows (company/personalization/eval/2026-10-16-criterion-2-readout-repro.md). No verdict differs, so nothing below waits. The repro speaks to determinism only, not to whether the world is right; I lean on it for nothing more.

## 0. Decisions at a glance

| Question | Readout 2 (frozen rule) | Rule applied | Decision |
|---|---|---|---|
| Ordering headroom | HEADROOM: oracle-order beats default-order in 6 of 6 (Δ R₇ +0.098 to +0.158), 6 of 6 in every one-at-a-time cell | pre-commitment 3 | **Personalised ordering for recall is not closed.** Pre-commitment 3's closing branch does not fire |
| GAM (model-v0.2.2 as frozen) | FAIL: 0 wins (Δ R₇ +0.0009 to +0.0025), 0 in every cell | pre-commitment 4 | **The GAM approach is closed.** Any next composer is a new design with its own criterion |
| draft-rules vs default-order | FAIL: 0 wins (Δ R₇ +0.0027 to +0.0075); G1 fails 6 of 6 | reported only (batch 3, "Applying the two together") | **Nothing new decided.** The rule set already ships off (founder Q5) and stays off |
| Review headroom | HEADROOM: oracle-review beats fixed in 6 of 6 (Δ R₇ +0.176 to +0.305) | V2 | **Review timing is not closed by V2.** Read with §3: most of it is revisit volume, not timing |
| Candidate review-timing-v1 | FAIL: 0 wins (Δ R₇ −0.0078 to −0.0044, all negative, no harm); NEW fails 4 of 6; LOAD holds 6 of 6 | V3 | **Closed. Not re-tuned.** A different review policy is a new design with its own criterion |
| Phase B / anything live | n/a | pre-commitment 5, V4 | **Nothing goes live, nothing is registered.** No pass exists, and a pass would not have been a phase B |

Batch 3's "Applying the two together" did not foresee this combination (ordering HEADROOM with the GAM failing, review HEADROOM with the candidate failing). Its branches say: ordering is not closed, the GAM is; review timing is not closed, the candidate is. **No candidate remains open in lane 14.** Whether to build another is a change of direction, so it goes to the founder (§6), not into a batch.

## 1. Ordering: GAM closed, ordering open (pre-commitments 3 and 4)

Pre-commitment 3 as written: the oracle beats default-order by δ_min in at least 4 of 6 personas in the base cell, so ordering is not closed. Pre-commitment 4 as written: the oracle has headroom and the GAM fails, so the GAM approach is closed. I do not reopen either, and I do not soften the GAM FAIL with the headroom: the GAM captured 0.1 to 0.25 points of a 10 to 16 point gap.

**What the ordering headroom is likely made of.** The readout did not build F1 O1's split (readout §2), so none of the following is measured; it is my reading of how the oracle is defined (criterion §2.3) and of the tables, stated so the next criterion can test it.
1. **Refreshing prior-known concepts.** The oracle values refreshing a known concept's clock under L4/N7, which is unsourced in both directions (readout §7). This is the readout's own caution. If a large share is here, the gain is partly a property of the world's valuation, not of learning.
2. **The hidden learner × lesson forgetting rate (L9).** The oracle sees each concept's k before the learner meets it. The corners point this way: with the k spread at its high value the oracle's range rises (corner LLH +0.109 to +0.173 against LLL +0.056 to +0.155; HLH +0.139 to +0.300 against HLL +0.049 to +0.104; corners are reported only). A per-learner, per-lesson rate has no signal before the first study, so **no runnable policy can capture this part**. It is headroom in the arithmetic, not in the product.
3. **Hidden prior knowledge and prerequisite readiness.** The oracle knows P(encode | hidden prerequisites) exactly. A product can estimate part of it (prediction outcomes, completions, the prerequisite map: 614 of 974 lessons have edges, company/personalization/2026-10-16-brief-response.md). It still wins 6 of 6 at prereqPenalty-low, so readiness is not the whole of it.
4. It is **not** revisit volume: oracle-order keeps the fixed schedule, and its new-lesson and revisit counts are within about one card of default-order (readout §A, Descriptive).

**What would have to be true for a different ordering policy to capture it.**
- The capturable part must be large. A next criterion should first split the oracle's gain into (a) prior-known refreshes vs new picks (O1) and (b) what an oracle restricted to **signals the product can observe** (prediction correctness, completions, recall answers, the prerequisite map, catalogue fields) achieves. If (b) does not beat default-order by δ_min in 4 of 6, the headroom is out of reach for any rule we could ship, and ordering should close.
- The parts it captures must be sourced: if the observable oracle's gain comes mainly from refreshing prior-known concepts, N7 needs evidence (learning-scientist-personalization) before that gain counts.
- The signals must exist in the product with a privacy read: `predictedCorrectly` for ordering already needs its own read (company/engineering/edd/EDD-009-learner-model-v1-mastery-state.md; company/personalization/2026-10-16-draft-founder-brief.md), and nothing is stored that privacy-reviewer has not approved.
- The policy must be a new design, built blind to the judge (V5's rule, carried), with its own frozen criterion. The GAM's curves are not the starting point (pre-commitment 4).
- Even then, phase B: the largest runnable Δ so far is 0.75 points against an MDE of 3.1 points at 5,000 learners (readout §6). A captured gain under about 3 points could not be confirmed live at our scale.

## 2. Review timing: candidate closed (V2, V3)

V2 as written: oracle-review beats fixed in 6 of 6, so review timing is not closed by V2. V3 as written: review-timing-v1 fails (negative in all six personas, below δ_min, no harm), so it is closed and **not re-tuned**.

What I carry, without using it to soften the FAIL:
- **LOAD holds in 6 of 6** (Δ revisit share +0.012 to +0.027, upper ends far below +0.10). I said before the data that a gain bought with extra load would not be a pass for me; there was no gain to judge. NEW fails in 4 of 6: the candidate showed 1.3 to 3.3 fewer new lessons, the same mechanism as §3 in the other direction.
- **V4:** the candidate never brought a lesson back later than the fixed schedule ("later" = 0.0 in every persona), so it would not have needed an AMD-008 F2 amendment. Moot now.
- **Corners are reported only.** In corner HLL (forgetting high, strengthening low, k spread low) the candidate wins 4 of 6 (+0.003 to +0.016). This changes no verdict and is not a reason to revive it. It is one fact for any future review design: an early return after a miss only pays where forgetting is fast, which is the world's high-forgetting range, not its base.
- R₃₀ is positive in two personas (+0.0016 at most), far below δ_min. Not a pass input.

## 3. What the review "headroom" is, and what it does and does not mean for the shipped product

The readout says it before reading the numbers (readout §2): `default-order + none` (no revisits ever) beats the fixed schedule by +0.114 to +0.202 at R₇; oracle-review chose θ = 0.3 (its lowest) for every persona in the base cell, served revisits on 22 to 35% of cards against fixed's 67 to 82%, completed 2 to 4 times as many new lessons, and sits only about 0.05 to 0.10 above `none` (the eval's subtraction; no interval). In this world, **most of the review headroom is what the fixed schedule's revisit volume costs in new lessons not shown**, in a revisits-first feed of 12 cards per session where a revisit costs exactly one new card (B6, unsourced). The smaller part, about 5 to 10 points with no interval, is what well-chosen revisits add over none.

**What it does not mean.**
- It does not show that revisits hurt learners in the shipped product. Feed.tsx does not put revisits first: it interleaves at most one revisit per three items (`i % 3 === 1`) and fetches at most 12 (src/components/Feed.tsx). Under that placement revisits are at most about a quarter of a session, not 67 to 82%, and the world did not model it (readout §3, no interleave cell).
- It does not show that timing matters much. The timing part is the small, unmeasured remainder above `none`.
- It does not license removing or thinning revisits. The one-for-one price, the 12-card session and the stop hazard after a revisit are guesses (readout §3, §7 N9), and the retrieval-practice evidence for revisits is outside this world's scope.

**What it does mean.**
- The finding is about **revisit volume and placement**, which is the default feed order. That is head-of-product's (out of my scope), and the revisits-first rule is AMD-008 F2, status proposed, which evaluation-steward decides by amendment (I may only propose). It is therefore mainly a product question, not a personalization one.
- It bears on F2 as drafted: in this world, revisits-first at the fixed schedule's volume crowds out new lessons. F2's own test ("the first k lesson cards are those revisits") describes a feed that differs from the shipped Feed.tsx. I pass this to head-of-product and evaluation-steward as **input**, with the caveat that the price is unsourced. I do not propose an F2 text change on an unsourced price.
- If anyone wants a number that would move a product decision, the missing piece is the price of a revisit (how many new cards a learner gives up per revisit, and the stop hazard), from evidence or, later, from W-706 recall data, plus an interleave cell. That is a learning-scientist-personalization evidence row and a personalization-eval cell, not a model.

## 4. Phase B and live use (pre-commitment 5, V4)

No pass exists. Even if one had, pre-commitment 5 says a pass is not a phase B: phase B needs the accounts milestone, W-706, a registered experiment, a privacy pass and the founder's deploy approval, with the MDE stated against the simulated Δ. **Nothing goes live and nothing is registered.** First Light ships the off switch and the default order (founder Q5, W-1543), unchanged. The GAM code, simulator, harness and HQ lab stay as assets (founder Q1). Engagement stays a guardrail.

## 5. Options for what is next, with costs and a recommendation

| | Option | What it buys | Cost | My view |
|---|---|---|---|---|
| A | **Pause personalization research until real learners exist** (W-706 recall data, accounts milestone). Lane 14 does upkeep only: off switch, privacy reads, HQ lab nits | No more simulated effort on a gap no runnable rule has reached (best runnable Δ 0.75 points over two worlds); no Goodhart risk | Zero build. Ordering stays formally open, unexamined | **The floor.** Recommended if the founder declines B, and pre-committed below as B's outcome if B finds nothing capturable |
| B | **One last eval-only headroom decomposition (criterion 3), no candidate.** learning-scientist-personalization sources the revisit price and N7 (prior-known refresh value) where evidence exists; personalization-eval builds O1's split and an **observable-signal oracle** (ordering using only what the product can see), plus a Feed.tsx interleave cell for review | Says whether any of the 10 to 16 points is reachable by a shippable rule, and how much of the review headroom survives the shipped placement, before anyone builds | About 4 to 5 agent runs (evidence rows, criterion + fidelity review, freeze + scored run ≈ 1.5 to 2 hours of compute, reproduction) and one V run of mine. No learner data, nothing in `src/` | **Recommended**, with the stop rule below |
| C | **Route revisit volume and placement to head-of-product as a product question** (default feed order) and to evaluation-steward as input on AMD-008 F2 (proposed) | Puts the finding with the role that owns the decision; no personalization model | One head-of-product read; any interleave cell rides inside B | **Recommended, alongside A or B.** I send the input; the decision is theirs |
| D | **Build a third candidate now**: a revisit-volume policy, or an ordering policy that targets un-known concepts | A shot at the measured headroom | About 6 to 8 agent runs (builder, criterion, fidelity, freeze + run, repro, V). High risk of fitting an unsourced price (revisit volume) or an unobservable quantity (k spread, prior-known refresh) | **Not recommended now.** Only if B finds an observable gain ≥ δ_min in 4 of 6, and then designed blind to the judge |

**Pre-commitments for option B, written now, before criterion 3 or any evidence row exists:**
1. Readout 2 stays the record. Criterion 3 does not re-run its verdicts, and no frozen arm (GAM v0.2.2, review-timing-v1, draft-rules) is re-tuned or re-entered as a candidate.
2. The world's new ranges (revisit price, N7) come from learning-scientist-personalization's evidence, set before any arm is scored. I choose none. The eval may refuse any I ask for or decline to build an arm; if it declines the observable-signal oracle, rule 3 cannot fire and I recommend A.
3. **If the observable-signal oracle does not beat default-order by δ_min in at least 4 of 6 personas in the base cell, personalised ordering for recall is closed** and I recommend option A.
4. If it does, I recommend no build until the founder answers whether to design a candidate aimed at it (a new question then, not a pre-approval now).
5. Review volume and placement findings go to head-of-product and evaluation-steward as input only. Any revisit-volume rule in the product is theirs.
6. A pass of anything is not a phase B (pre-commitment 5, carried).

## 6. Questions for the founder (not decisions)

Routed through chief-of-staff (board). Each can be answered in one line.

> **Q1. Hand "how many revisits, and where" to head-of-product as a product question?** In our simulation, showing no revisits beat the current revisit schedule, but only because the simulated feed put revisits first and every revisit cost one new lesson, a price we made up. The real feed mixes in at most one revisit per three lessons, which we did not simulate. I propose to pass this to head-of-product (who owns the feed order) and to evaluation-steward (the draft "revisits first" rule, AMD-008 F2) as input, with no change to the product from this alone. **My recommendation: yes, route it as input.**
>
> **Q2. Approve one last offline study that only measures, with no new recommender?** The "perfect knowledge" ordering gained 10 to 16 points, but part of that comes from things no product can know before a learner studies (how fast this learner forgets this lesson). The study would measure how much of the gain is reachable using only what our app can actually see, and test the real feed's revisit placement. About 4 to 5 agent runs, about 2 hours of compute, no learner data. If the reachable gain is under 1 point, I close personalised ordering for recall. **My recommendation: approve.**
>
> **Q3. Build a third recommender candidate now (a revisit-volume rule, or ordering aimed at concepts the learner does not yet know)?** Both candidates so far failed; the best rule anyone could run gained under 1 point in two simulated worlds. Building now risks tuning to a made-up revisit price or to things the app cannot see. **My recommendation: no, not unless the Q2 study finds a reachable gain of at least 1 point, and then I ask you again.**
>
> **Q4. If the Q2 study finds nothing reachable (or if you decline it), pause personalization research until real learners and their recall data exist?** The team would keep only upkeep: the off switch, privacy work, the lab. Everyone keeps the default order. **My recommendation: yes, pause.**

Not asked, because it does not change: First Light ships personalization off with the default order (Q5, W-1543). Surprise and novelty stay off (Q2). The GAM stays stopped (Q1); this readout closes its approach.

## 7. Independent of the founder's answers

1. R2 accepted: W-1550 done. K2's readout accepted as the record for V: W-1549 done.
2. Revisit-volume input to head-of-product and evaluation-steward: board item, input only (§3); it waits on Q1 only for the founder's framing, not for content.
3. WBR: readout 2 presented unedited with this record beside it, readout 1 beside both.
4. Upkeep unaffected: off switch and privacy reads (W-1521 line), HQ lab nits (W-1539).

**Waits for the founder:** criterion 3 and its evidence rows (Q2), any candidate (Q3), the pause (Q4).

## Objections

| From | Objection | Answer |
|---|---|---|
| personalization-eval (readout §2, ordering) | Part of the oracle's gain may be refreshing prior-known concepts (F1 O1, N7); the split was not built | **Accepted as a limit; changes no reading.** Pre-commitment 3 reads HEADROOM as written. The split is option B's first measurement and pre-commitment B3's input (§5) |
| personalization-eval (readout §2, review) | Most of the review headroom is the fixed schedule's revisit cost; `none` beats fixed by +0.11 to +0.20; oracle-review only about 0.05 to 0.10 above `none`, no interval | **Accepted and carried into the record (§3).** V2 still reads HEADROOM as written; I say plainly it does not show that timing matters much |
| personalization-eval (readout §3, F1 B6) | Results hold for a revisits-first 12-card feed, not the Feed.tsx interleave; session length and stop hazard unsourced | **Accepted.** This is why §3 makes no claim about the shipped product's revisits and why Q1 routes the question as input, not as a change |
| learning-scientist-personalization (F1 B6, N7, N9; company/personalization/evidence/2026-10-16-criterion-2-fidelity-review.md) | The revisit price and the prior-known refresh value are unsourced | **Upheld.** Option B asks for evidence rows on both before any arm is scored (B pre-commitment 2) |
| corners (readout §A, reported only) | The candidate wins 4 of 6 in corner HLL | **Not used.** Corners are reported only and V3 forbids re-tuning; recorded in §2 as a design fact, not a reprieve |
| my own pre-data note (memory vp-inbox-k2-1016; criterion 2 §8) | "A gain bought with extra load is not a pass for me" | **Kept.** LOAD held 6 of 6, but there was no gain; NEW failed 4 of 6 |
| founder's brief (company/personalization/2026-10-16-founder-brief.md) | He asked for a GAM recommender | **Not overridden.** He already stopped it (Q1); this record closes the approach by pre-commitment 4, which he approved (Q3). Anything further is a question (§6) |

## Founder answers (2026-10-17)

> "Approve the recommendations"  (founder, conversation, answering the chief of staff's summary of Q1–Q4 with Mateo's recommendations, and the open budget questions W-1553)

- **Q1 Revisit volume and placement to head-of-product (and evaluation-steward for AMD-008 F2) as input:** yes. No product change from this alone (W-1561, W-1562).
- **Q2 One last measure-only offline study (criterion 3, no new recommender):** approved, with the pre-commitments in §5 (reachable-signal oracle below δ_min in 4 of 6 closes personalised ordering for recall).
- **Q3 Third candidate now:** no; asked again only if criterion 3 finds a reachable gain of at least 1 point.
- **Q4 Pause personalization research if criterion 3 finds nothing reachable (or it is declined):** yes; upkeep only (off switch, privacy work, lab); default order for everyone.
- **Budget (W-1553):** the portfolio-manager's 2.0M token figure for project `personalization` is approved as recommended. Recorded by the chief of staff; portfolio-manager updates company/ops/projects.json.
- **Settings API charging (W-1553 second part):** no recommendation was put to the founder, so nothing was decided; it stays charged to `personalization` as filed. Open if the founder wants it moved to First Light.
