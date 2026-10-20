# Extending catalogue evaluation after account preferences

Date: 2026-10-20 · accountable evaluation owner: head-of-evaluation · product sponsor: chief-product-officer.

**Product disposition:** CPO approves the evaluation priorities and routing below under the existing protocol. This is a continuation plan, not a new rating round, permission to change criteria, or approval of another owner's implementation. VP Personalization owns feed/model decisions; principal-engineer owns engineering routing. Their dispositions must be recorded separately.

## What the evidence currently supports

The [readmission receipt](../ops/delivery/2026-10-20-account-preference-readmission.json) and [exact admission manifest](../../src/data/account-preference-admission.json) identify snapshot `fc663bbcab56c209`: 1,621 catalogue entries, 954 observed, 777 current, 146 stale, 31 in disputed state and 667 unknown; 656 satisfy core matching guards. There are still **33 underlying unresolved disputes**: two became stale, not resolved. These categories describe evidence state, not quality. The 146 stale entries followed changed lesson entries; no ratings were rebased and no new ratings were made.

The [round brief](rounds/2026-10-18-round-1/brief.md) remains the editorial observation contract. Raw reviews are provisional simulated-learner evidence. The historical [continuation note](rounds/2026-10-18-round-1/CONTINUE-LATER.md) predates exact source admission: its blanket non-serving statement does not revoke the later separately approved account snapshot. Neither source admission nor an ordinal descriptor proves real learning or a live deployment.

## Next round: intake, then coverage, then refinement

These are future operational assignments, not authorization to start a new run now. The 100-item queue / 15-item checkpoint cadence does not replace independent overlap or pairwise calibration.

1. **Freeze the inventory.** Head of evaluation commissions evaluation-engineer to create a separate dated round, pinned inventory and manifest from the current catalogue. Classify new/unobserved, revised/stale, disputed and unchanged entries. Preserve original raw records and identity/version/entry hashes; record transitive-dependency freshness limits. Do not repair freshness by updating old pins. The original 329 draft walkthroughs and draft-preview engineering blockers remain parked until separately assigned; unknown is never zero.
2. **Assign fair coverage.** Head of evaluation assigns queues of up to 100 demos per independent reviewer, stratified across domains, publication states and evidence gaps. Checkpoint after the first 15 before continuing each queue; save a record immediately after every item. Make the broad first pass the priority. Complete means every assignment is accounted for, including honest partial/blocked cases, not 100 invented scores. Judges who built/revised an item must be reassigned.
3. **Observe the actual demo.** Use the history-safe review route and confirm its no-history banner. Follow browser-only prediction → meaningful control contrasts → reveal; no source or builder rationale for judgement. Record viewport, exact actions, visible effects, phase evidence and effort. Retry transient route failures once, distinguish infrastructure failures from lesson defects, then record blocked rather than consuming a batch troubleshooting.
4. **Retain separate dimensions.** Record quality prediction, interaction, payoff, clarity, transfer and accessibility; experience surprise, visual explanation, playfulness, practical value and depth; provisional conceptual challenge plus prerequisite/notation/interface burdens. Every ordinal 0–4 or null requires reason, evidence and confidence. Accessibility remains unknown without the specific tested modes. Experience intensity is not quality. Include an action-linked why-cool sentence and a material caveat; no overall average or invented learning outcome.
5. **Independent overlap and calibration.** Preserve the existing 10% editorial independent overlap, sampled across domains, challenge and evidence states, without sharing primary reviews. Head of evaluation owns calibration, exclusions and append-only adjudications; disagreements remain visible. Challenge remains provisional until its instability is addressed. Keep the separate official blinded pairwise protocol: six existing criteria, about 20% repeat calibration (the existing protocol target, not a new maximum), agreement/position/tie/length-bias reporting, connected comparisons and interval uncertainty. Pairwise results do not become substitutes for missing walkthrough dimensions.
6. **Allocate the next round with buckets.** After broad coverage, head of evaluation publishes a versioned sampling plan: promising evidence, uncertain/disputed, weak/blocked and unobserved buckets. Spend more review on promising and decision-relevant uncertainty, while reserving explicit exploration coverage across the other buckets and domains. Record allocation counts and selection reasons before dispatch. Do not call this a learned bandit: it is review-budget allocation. Never show prior bucket/rank to blind judges. No top-only loop, automatic publication or rank-based gate.
7. **Export and independently admit.** Evaluation-engineer validates schema, coverage, deduplication, source freshness and unresolved disputes, then exports a candidate without changing raw evidence. Evaluation-steward independently checks provenance and adjudication; Product checks truthful use; privacy-reviewer checks public-data/privacy boundaries; engineering independently checks exact vectors, fallback and guard behavior. Only the exact reviewed recipe/profile/hash pair may be admitted atomically with its manifest and receipt under AMD-016. Drift fails closed; stale/disputed/unknown remain barriers. An exporter never self-approves. Material recipe/contract changes require their own owner decisions and any applicable amendment. Release-manager handles any separately approved deployment.

## Existing roles and required handoffs

| Owner | Deliverable / boundary |
|---|---|
| chief-product-officer | Evaluation priorities and protocol/criteria approval; resolves product/evaluation disputes with objections attached. Does not own the feed. |
| head-of-evaluation | Round plan, queues, reviewer conflict checks, checkpoint acceptance, calibration, buckets, sampling and adjudication record. |
| pairwise-judge pool | Independent artifact-first observations/judgements under the assigned protocol; no own-build reviews or serving decisions. |
| evaluation-engineer | Pinned inventory, packets, validators, export and per-criterion BT fit/HQ data. Does not admit its own output. |
| evaluation-steward | Independent evidence/provenance and constitutional independence/gate review; criteria/ranks never become publish gates. |
| head-of-product / category owners | Receive specific findings after reviews; route lesson fixes through existing builders and independent checks. |
| vp-personalization | Approves use of editorial descriptors in stated-preference matching and synthetic HQ interpretation; separate from evaluation ranking. |
| personalization-eval / lesson-dims-owner | Matching readouts, dimension meaning and uncertainty; distinguish simulation, ordinal descriptors and observed outcomes. |
| personalization-engineer / learner-model-engineer / learner-data-engineer | Implement separately assigned model/account/data work through engineering ownership; no implicit behavioral learning authority. |
| principal-engineer → hq-engineer | Bound HQ implementation, data contracts and verification; no judge verdict editing. |
| privacy-reviewer / analytics-steward / learning-scientist-personalization | Privacy, experiment registration and outcome validity before any real-data learning experiment. |
| release-manager / chief-of-staff | Release gates and specific deployment approval / bounded scheduling, board and handoff receipts. |

## Bounded HQ change brief

**Evaluation:** show separately labelled editorial coverage/state and official per-criterion pairwise results. Read counts from the committed dataset rather than this prose. Display snapshot/provenance, current/stale/disputed/unknown definitions, underlying unresolved disputes, tested evidence, why-cool/caveat and dimension confidence. Keep official BT intervals and calibration warnings; no overall BT rank or universal quality score. Link this extension plan and round blockers. Unknowns and parked drafts must not look failed.

**Personalization:** show the admitted account recipe and exact snapshot separately from synthetic GAM/reachable experiments. Explain that signed-in saved subjects/experience/challenge drive bounded matching, with off/reset/default fallback; personas are fixtures and preview output is not the customer's live feed. Surface stale/disputed/unknown barriers and the distinction between account source readiness and live environment activation. Retain a usable feed-first layout with controls above it. Do not infer that GAM, Bayesian or historical-performance learning is active because a simulation exists.

**Routing:** VP Personalization must approve the personalization brief; principal-engineer routes the bounded data/UI implementation to hq-engineer; evaluation-engineer supplies truthful evaluation data. This CPO record supplies no substitute approvals.

## Backlog and completion criteria

Bayesian cold-start estimates, learned GAM parameters, customer archetype inference and blending historical performance remain separate research backlog. Stated choices and editorial descriptors are current inputs; measured understanding/recall, consent, uncertainty, prior sensitivity, bias/coverage, rollback and comparison against the unchanged default require a registered experiment and independent privacy/science review before learning from real data. Do not optimise dwell or demographic proxies.

A future round is done when every inventory item has a reconciled evidence state, each counted complete review has actual three-phase evidence and valid identity, overlap/calibration/adjudication results are disclosed, bucket allocation and exploration coverage are reproducible, and a candidate export has an independent exact readmission or an explicit hold. HQ work is done when its counts match the exported artifact, terminology separates the two evaluation systems and live/synthetic matching, links reach the plan and evidence, and focused engineering/privacy checks pass with inherited failures disclosed. No deployment, new ratings, lesson fixes or learned-model activation is performed by this planning task.
