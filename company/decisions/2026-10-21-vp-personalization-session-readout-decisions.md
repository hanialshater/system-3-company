# Session readout: all four session composer variants are closed for serving; EDD-016's path ends at G1

owner: vp-personalization (Mateo)
date: 2026-10-21
run: vp-s1-readout-1021 · board: W-2013 (readout), W-1988..W-1994 (EDD-016 gates), W-2011, W-2012
status: **decided.** It is unconditional. One exception: if the reproduction (W-2025) finds a difference that changes any verdict, this record is void and gets rewritten on the corrected readout. Nothing is served, deployed or committed by this record.
class: product (keep or kill per term on the eval's readout; phase decision)
readout: company/personalization/eval/2026-10-21-session-readout.md (personalization-eval, run eval-s1-readout-1021). Criterion frozen at bdebacc2 (sha256 40a82a40…ef9). Run at 743379aa, S = 2000, seeds 70001..72000.
records checked: company/personalization/eval/harness/records/2026-10-20-session-readout/merged/verdicts.json, sha256 39d54187…c1df8d, and tables.md, sha256 b94d7dad…dc6b. Both match readout §6. I spot-read verdicts.json for `invalid`, K1 and K5, and they agree with readout §0.
rules applied: company/decisions/2026-10-20-vp-personalization-session-base.md §4 (K1 to K5, written before any result), with §7 (≥ edge), §8 (β = .033) and §9 (eval's K2/K4/K5 statistics accepted before results; O12 disclosure duty).
founder goal: company/decisions/2026-10-20-founder-edp-faithful-personalization.md ("the readout decides what serves").
serving path: company/engineering/edd/EDD-016-session-composer-serving.md §10.2 (G1 needs a passing readout; "A FAIL at G1 ends this path for that candidate").
independence: I wrote no number, code, criterion or readout. I read the readout and its records only. I did not open results.ndjson or the builders' notes for this decision.

## 0. Decisions at a glance

| # | Rule (session-base §4) | Readout fact (unedited) | Decision |
|---|---|---|---|
| K1 | gate: pass eval's frozen criterion against `default-order` | **FAIL for all four**: 0 wins of 6 in every one of the 29 cells, for every variant | **All four variants are killed for serving**: `gam-session`, `gam-session-v3`, `gam-session-no-cov`, `gam-session-v3-edpbase` |
| K2 | veto: a clear loss for any persona (simultaneous, two families) | **VETO for all four**: v1 6 losses, v3 5, no-cov 4 (each about −0.001 R₇); edpbase 73, including 4 of 6 personas in the base cell | Kill confirmed on a second, independent ground. K2 would kill each variant even if K1 had passed |
| K3 | attribution among K1/K2 passers only | No passers. Eval computed it anyway: a, b and c each prefer the simpler side (0 wins). K3c shows 4 clear losses for edpbase against v3 | **Not applied** (no passers). Recorded as context: the cov terms, the v3 edits and the EDP-shaped flat prior bought no measurable recall over their simpler forms, and the flat prior cost some |
| K4 | guardrail: served subject mix, non-inferiority at 5 points | **HOLDS for all four** (lowest lower end −0.0098) | The variants did not narrow the subject mix. Anti-bubble is **not** a reason for the kill. Recorded so nobody reads the FAIL as a bubble effect |
| K5 | copy gate: share of served moves with `reasonCarriesMove` false | **COPY-BLOCKED for all four**: about 1.1% (v1, v3, no-cov) and 8.1% (edpbase) | No learner-visible reason copy for any session variant. No fix of the reason rule is commissioned, because there is nothing to serve it for (§3) |
| — | session-base §4: "If no variant passes K1 and K2, the session composer is closed for serving" | No variant passes either | **composer-v0.3-session (`compose-session-serve-in-order`, sessionSize 5) is closed for serving.** EDD-016 ends at G1 for this candidate family |

O12 disclosure (session-base §9). These are the unadjusted base-cell clear losses. They are not a kill input, and no serving brief exists to carry them. They are recorded here so they are not lost: v1, v3 and no-cov each lose for wanderer; edpbase loses for curious-newcomer, struggling-repeater, wanderer and lapsed-returner.

## 1. What is killed or closed for serving

1. **The four session variants, for serving.** K1 FAIL and K2 VETO apply to each one separately. No variant is a passer, so there is no survivor for K3, K4 or K5 to rank.
2. **The session composer as a serving candidate.** This covers composer-v0.3-session in the scored mode at model-v0.4.4, and any re-tune of its numbers (β, attentionCost, slotDecay, addrUse, onCov, sessionSize). Re-tuned numbers do not enter this readout (session-base §4). A new candidate needs a new frozen criterion and a note to the founder first (§5 below).
3. **The recompose-on-reveal glue (EDD-016 §4.4, W-2011).** It was never scored, and it is not opened. It would be a different candidate, and it comes in only through §5.
4. **EDD-016's serving path for this candidate.** G0 cleared, because the criterion was frozen before the run. G1 failed. Per EDD-016 §10.2 the gates after G1 do not start: G2's binding addendum, G3, G4, G4b, B and G5. Board dispositions are in §4.
5. **The founder's "live feed" part of the EDP-faithful decision.** That decision said the readout decides what serves, and the readout has decided: nothing serves. The founder's other two parts (offline model and HQ lab) stand and are delivered (§2).

The default order is unchanged. It remains head-of-product's baseline and the order every learner sees. Live order: none of this touches AMD-015 or AMD-016, and no G record is written.

## 2. What stays, as offline model and HQ inspection only

- **The code stays as it is.** That means model.ts `COMPOSER_SESSION` with v1, v3 and `edpBaseEdits`, sim/composer-session.ts and the `SESSION_VARIANTS` arms. Nothing is deleted, and the candidate pin files are not edited. Two reasons. Future criteria can use these arms as reference arms. And the readout must stay reproducible at 743379aa (W-2025).
- **The HQ lab stays**: ComposerLab (Composition Flow, Lesson gallery, v1 ↔ v3 ↔ v3 + EDP prior, Curves sandbox) and the policy comparison. Its job is **inspection**: showing how an EDP-style session composer composes, and why a move happened. It is not evidence of learning, and it does not lead to serving. HQ upkeep W-1997, W-1998, W-2001 and W-2006 stays open under that label, at the owners' priority. None of it is on a serving path.
- **The circular diagnostics stay** beside simulated recall with their label. This readout is the clearest case yet of why. Every composer arm raises circular need coverage (0.18 to 0.30 vs default-order 0.10 to 0.15), and the independent learner's R₇ does not move.
- **HQ copy must say what is now true** (§6, W-2024 plus W-2026). The lab may no longer call these variants "unscored until its readout". They were scored, and they are closed for serving.

## 3. K5 and reason copy

K5 is COPY-BLOCKED for all four. Because nothing serves, I commission no change to the reason rule and no RC/fact-checker work for session reason lines. One point is kept for any future composer that moves cards: about 1 in 90 served moves named a reason that did not carry the move, even at base 1.0. So a "why this card" line must be computed from the move margin. It cannot be read off the largest term. The field exists (`reasonCarriesMove`, session-base §5/§7), and the lab should show it (§6).

## 4. Board: what the EDD-016 gates become

| Item | Owner | Becomes | Reason |
|---|---|---|---|
| W-1988 G0/G1/G4 | personalization-eval | **dropped (closed)** | G0 cleared (criterion frozen before the run). G1 is FAIL, reported unedited, and that ends the path (the item's own text). G4 registration has no candidate to register |
| W-1989 G3 privacy read of serving inputs | privacy-reviewer | **dropped (closed)** | It was "after G1 passes; nothing serves before it". G1 did not pass. A future candidate gets its own read of its own inputs |
| W-1990 G4 EXP format / counters | analytics-steward | **dropped (closed)** | There is no experiment to register. The registrar question (EDD-016 O3) belongs to whichever future serving EDD meets it |
| W-1991 build (flag off) | personalization-engineer | **dropped (closed)** | "After G1-G4 clear, not before". They will not clear for this candidate |
| W-1992 G2 tier-2 review of EDD-016 / ADR-011 | principal-engineer-ops | **parked (backlog, do not start)** | The serving home (`src/lib/learner/policies/`, byte-copy and hash lock, the gateway rule in §10.1) does not depend on the candidate. A future candidate could reuse it. Reviewing now would spend effort with nothing to serve. Unpark only when a candidate passes G1 under a new frozen criterion. The binding addendum part is void for this candidate |
| W-1993 G4b surface-value amendment draft | evaluation-steward | **dropped (closed)** | It would name the session candidate in a protected file, and there is no candidate to name. A future candidate needs its own amendment (AMD-015 A1) |
| W-1994 Q1 single-file freeze | learner-model-engineer | **dropped (closed)** | Freezing a killed candidate as a serving file serves no one. The arms stay in sim/ for reproduction and as reference arms |
| W-2011 align EDD-016 §4.4 glue with the scored mode | principal-engineer | **dropped (closed)** | There is nothing to align for. Recompose-on-reveal is not opened (§1.3) |
| W-2012 bridge for the single-file freeze | learner-model-engineer | **dropped (closed)** | It only served W-1994 |
| W-2013 session readout | personalization-eval | **done** | Read and applied here. Accepted as the record |
| W-2005 session criterion, W-1996 score the session variants | personalization-eval | **done** | Frozen and scored, and the readout exists |
| W-2025 reproduction (determinism) | learner-model-engineer | **stays open** | It is not on any critical path, because a FAIL closes serving whatever the repro says. But a verdict-changing difference voids this record, and the 1.1 GB of results stay on the host until it is compared |
| W-2024 HQ banner | hq-engineer | stays open | Plus W-2026 for the other stale lab labels (§6) |
| W-2027 EDD-016 status line | principal-engineer | backlog | Record in EDD-016's status line that G1 failed for composer-v0.3-session on 2026-10-21 and the path ended (§10.2), with a link to this record. The author's file; I do not edit it |
| W-2028 founder question (§5) | vp-personalization | backlog | Asked through the chief of staff. No next-cycle work starts before the answer |

## 5. Is anything worth a next cycle? A question for the founder, not a commitment

**What the context arms say** (they are context only, and no rule reads them):

- **oracle-order beats default-order by 8 to 15 points of R₇**, 6 of 6 (readout §0, context). That is headroom in this simulated world. oracle-order reads the learner's hidden true state, so no product can run it.
- **No runnable composer has passed in any readout so far.** Phase A GAM failed (readout 1, +0.001). The runnable rules in readout 2 gained −0.001 to +0.008. Readout 3b's v2 was INVALID. Here `gam`, `draft-rules`, `random` and all four session variants win 0 of 6. v1, v3 and no-cov sit within ±0.0012 of default-order, with upper ends at most +0.0017 against δ_min 0.01. So this is not a power problem. Whatever edge these composers have is bounded below 0.2 points.
- **The part of the headroom that observable inputs can reach was measured once, in this same world** (company/personalization/eval/2026-10-17-criterion-3-readout.md §3 and §7). The reachable-signal oracle got 1.0 to 1.8 points in `interleave:base`, which is about 7 to 21% of oracle-order's gain. That is below the smallest live MDE (2.2 points at 10,000 learners), and it rested mostly on the prerequisite term. Its arm also failed ordering guardrail G1 in 6 of 6. Readout 3b's G record then closed the website part of M1 (company/decisions/2026-10-17-vp-personalization-readout-3b-g.md).

So the 8 to 15 points are mostly made of what we cannot observe. The observable remainder is about one to two points, which we could not confirm live at our scale. Need-coverage composers like EDP's capture none of it measurably.

**The question I put to the founder (W-2028, via chief of staff):**

> The session composer failed (0 wins in 29 cells, a VETO on harm, nothing serves). The simulator shows large ordering headroom, but it sits in learner state the product cannot see. What it can see is worth about 1 to 2 points, and that is too small to confirm live. Which of these do you want for the next cycle?
>
> **(A) Close ordering-for-recall as a research line for now.** Keep the default order. Keep the HQ lab as inspection. Move the org's effort to phase C (a definition of "learned" per category), learning paths, and the revisit card. Those are decisions whose value does not depend on beating the default order in a simulator. *(My recommendation.)*
>
> **(B) Measure before building.** One measurement-only criterion, with no candidate and no builder, run by personalization-eval. It asks which *observable* signal would most raise the reachable ceiling, for example per-concept revisit recall once accounts and W-706 exist, and by how much. If no signal moves the ceiling above the live MDE, ordering closes under a rule written before data.
>
> **(C) One more candidate, built toward the reachable oracle**, with ordering guardrail G1 answered in its design, under a new criterion frozen first. *(I do not recommend this. The best it can reach is about 1.8 points in a world whose fidelity is "none to low" on `slots`, and it could not be confirmed live.)*

I commit to none of these. Until the founder answers, nothing new is built or scored on ordering. Eval's world caveats (readout §2: N1, N4, N5, N7; R₇ cannot be observed) travel with any choice. Both the headroom and the null result come from this one simulated world.

## 6. HQ copy, kept honest

W-2024 (hq-engineer) fixes the banner `UNSCORED_LABEL` and the matching `unscored` string in hq-cli.mjs. The readout also makes these lab strings untrue. They go to hq-engineer as W-2026:

- src/lib/hq-personalization.ts line 184: the group label "Session policies (offline, UNSCORED; model-v0.3.0)".
- src/app/hq/personalization/Personalization.tsx line 273: "The session policies (…) are offline and {UNSCORED_LABEL}".
- src/app/hq/personalization/ComposerLab.tsx line 405: "It is offline and unscored until its readout … the readout, not this view, decides what could ever serve". Also the header comment at line 7.

What they should say: the four session variants were scored under a frozen criterion and are closed for serving (link this record and the readout; do not restate numbers). The lab is offline inspection only. A sandbox drag or edit is still unscored, and the sandbox badge "unscored" stays for dragged curves. Where a moved slot has `reasonCarriesMove` false, the lab should say that the named reason alone did not carry the move (field from W-2006). The candidate pin files must not be edited (criterion §6: model.ts, composer-session.ts, composer.ts, simulate.mjs, catalog.mjs). This is lab copy, not learner copy.

## Objections

They travel with this decision.

- **O1 The founder's goal was a faithful EDP implementation on the live feed (founder decision, "Where: all three").** This record closes the live part. **Answer:** the founder's own record says "the readout decides what serves", and my standing objection there (O5 in session-base) was answered the same way. The offline model and the HQ lab, two of the three parts, are delivered and stay. I am not overriding a passed criterion, and I am not overriding a failed one, so I owe the founder no written objection under my authority line. The question in §5 is how the founder gets a say in what comes next.
- **O2 The K2 losses are tiny (about 0.1 points), so the veto is harsh (anticipated from the builders' side).** **Answer:** the veto stands as written. I accepted eval's statistic before any result (§9), and K1 FAIL kills each variant without it anyway. I do not use K2's smallness to soften the record, and I do not use the unadjusted column to harden it (O12).
- **O3 Forking paths and post-hoc variants (O4).** Some cells and personas show small positive means: edpbase +0.0014 for returning-expert in the base cell and +0.0044 at prereqPenalty-high, and v3 +0.0007 for single-subject-crammer in K3b. **Answer:** none of them is promoted, and none seeds a variant. There is no persona-targeted composer, no "v3 for crammers", no β or attentionCost re-tune, and no "best cell" story in HQ or the WBR. Each one is below δ_min and was found after results. session-base §4 says a contrast chosen after results cannot keep a variant. Any new candidate goes through §5 and a new frozen criterion.
- **O4 Closing W-1992 throws away a reusable design (principal-engineer's interest).** **Answer:** that is why W-1992 is parked, not dropped. The candidate-specific gates are the ones dropped, because a future candidate restarts at G0 with its own privacy read, registration and amendment (EDD-016 §10.2).
- **O5 A FAIL in one simulated world is not a fact about learners (eval's standing caveat, readout §2 and §3).** **Answer:** agreed. The kill is a decision not to serve, and it rests on the only evidence the rules allow. It is not a claim that EDP-style ordering cannot help real learners. Nothing here is learner copy, and the WBR shows the readout unedited.
- **O6 Should the session composer arms be removed so nobody is tempted (mine)?** **Answer:** no. Deleting them breaks reproduction (W-2025) and loses reference arms. HQ labels (§6) and this record carry the "closed for serving" status. The serving gateway (EDD-016 §10.1) still forbids any `src/` import of the model.

## 7. Founder answer (2026-10-21, recorded by chief-of-staff)

Asked in conversation with the three options of §5 and whether to reproduce the run:

- **Next cycle: (A).** Close ordering-for-recall as a research line for now. The default order and the AMD-016 saved-choices rule stay. Personalization effort moves to a definition of "learned" per category, learning paths and the revisit card. Nothing on ordering is built or scored. W-2028 done.
- **Reproduction: skip.** W-2025 dropped. The run is seeded, hash-checked and its verdicts are not near a threshold. The 1.1 GB of results.ndjson outside the repository is deleted. The committed verdicts, manifests, parts check and tables in `company/personalization/eval/harness/records/2026-10-20-session-readout/` remain the record. Consequence, stated so it travels: the readout can still be reproduced from the pinned commit (743379aa) but has not been, so the "reproduced" step that phase A readout 1 had is absent here.
