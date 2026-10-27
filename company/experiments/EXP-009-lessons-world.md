# EXP-009: Lessons World exploration and one-week recall

owner: analytics-steward
approver: head-of-product (VP Personalization remains parked under founder F-52 correction)
date: 2026-10-27
status: preregistered by the commit containing this revision; NOT run; study execution and revised-feature exposure not authorized
source: company/decisions/2026-10-27-founder-lessons-world-journey.md

## Hypothesis

Offering the approved twelve-lesson Number Island journey increases distinct lesson explorations during week one while preserving recall of a common lesson one week later. Exploration is a completion/usage outcome, not proof of learning. A seal, repeat visit, swipe or dwell time is not a learning outcome. This scoped analytics ownership follows the founder's explicit instruction, without un-parking any role or changing Surface Value.

## Committed prediction

These are predictions for chief-of-staff to commit BEFORE revised growth-feature implementation and BEFORE enrollment/exposure. At authoring this was an uncommitted draft; the chief-of-staff registration commit freezes these predictions before revised implementation. Freeze the commit, feature/manifest/assessment versions, enrollment script and analysis implementation before first assignment. No results were inspected or generated.

| ID | Metric and prediction | would_be_wrong_if: |
|---|---|---|
| P1 | Mean distinct additional Number Island lessons reaching their first reveal during assignment-relative [0,7 days), world-offered / feed-only ratio >=2.0 | The learner-level 95% upper confidence bound on the ratio is <2.0. If its lower bound is >=2.0 the prediction is supported; otherwise inconclusive. |
| P2 | One-week common-anchor first-answer recall difference, world minus feed, >=0 percentage points | The 95% upper confidence bound on the difference is <0. Its lower bound >=0 supports the prediction; an interval crossing zero is inconclusive, not equivalence. |
| G1 | Practical learning guardrail: world recall is no more than 3 percentage points below feed | The one-sided 95% upper bound is <-3 points: demonstrated harm, stop exposure. Admission requires the one-sided 95% lower bound >-3 points; otherwise pause as inconclusive. A guardrail pass does NOT establish P2's stricter no-lower claim. |

## Design

**Comparison and estimand.** Proposed consented adult randomized study, 1:1 world-offered versus feed-only, assigned BEFORE exposure; no comparison of self-selected world-openers against non-openers. The estimand is intention-to-treat effect of offering the world, not the effect among people who choose to open it. No public live holdout is authorized by this document: Surface Value's O2 condition requires an explicit founder comparison decision before any live split. Head-of-product and Privacy must clear the study and instruments first.

**Eligibility and common anchor.** Adults consenting to this prospective study, no recorded exploration of the twelve Number Island lessons, who complete the same `math/add-a-zero` v2 anchor before random assignment. Anchor completion is an enrollment condition applied identically before assignment, not a post-treatment exclusion. Common-anchor completion is excluded from P1, leaving 11 possible additional distinct lessons. Freeze these eleven slugs from the approved twelve-lesson manifest; no other catalog lessons count toward P1.

**Arms.** Both use the same lesson/content versions, existing predict/explore/reveal player, equivalent recall availability and access to the same eleven remaining lessons. Treatment offers the World entry with island-order player flow; control offers those lessons in a feed-only route with identical advisory order and no map/flag interface. Existing independent feed ranking and due-revisit requirements are not waived; engineering must demonstrate the explicit contextual route is authorized before running. No autoplay, forced play, streaks or additional attention prompts in either arm.

**P1 denominator.** Every assigned eligible participant, including measured zero-completion participants, remains in their assigned arm. An exploration is first recorded reveal for a previously uncompleted target slug, deduplicated per participant/slug; clicks, prediction correctness, repeated reveals and time-on-page do not count. An unavailable or missing observation is UNKNOWN, never silently zero. Report missing-outcome bounds [0,11] and require any claim to survive them; consent withdrawal is excluded only as required by the approved deletion policy, with counts/missingness disclosed.

**P2 denominator and window.** One identical, unassisted first-answer probe using the anchor's version-2 recall question at 6–8 full days after anchor completion; no hint/reveal before the first answer. Correct / completed valid probes in each assigned arm, with invitation, response and missingness denominators also reported per arm. The research probe is not an app scheduled-recall/flag event and does not award Understood credit or a seal. Existing repeated/flag exposure to the same item is part of the assigned experience; this measures recall of that question, not transfer or permanent mastery.

**Enrollment, duration and analysis.** Target 3,000 eligible assigned participants per arm (precision planning assumes recall near 70%, not an observed rate), enrolling for at most 28 days from first assignment, then close after the last participant's day 8. No optional stopping for apparent success or unregistered extension. Below target is explicitly under-recruited and cannot produce a confirmatory pass; a new sample plan requires a new preregistration before a new run. Enrollment cost is not authorized here. Use participant-level stratified bootstrap 95% intervals with 10,000 resamples and fixed seed 9009 for P1 and P2; never bootstrap individual events as independent learners. If the control P1 mean is zero, ratio is undefined: report means and difference, with P1 inconclusive rather than infinity. G1 uses the corresponding one-sided 95% interval. P1/P2 are conjunctive claims: never advertise joint success unless both criteria pass. Operational safety can stop a run; report that stop, not a completed trial.

**Invalidation and attrition.** Before outcome interpretation: audit assignment/exposure counts, sample-ratio mismatch (chi-square p<.01), duplicate assignment, version drift, timestamps/clock integrity, missing events, and control access to World. Pause on any assignment/version/data-integrity failure; no selective exclusion to repair it. If valid outcome capture/probe response is <95% in either arm or differs by >3 points between arms, the causal recall readout is inconclusive regardless of observed scores. The enrolled baseline excludes prior target exposure; report the screening denominator. No participant reassignment after seeing behavior.

**Novelty and competing explanations.** P1 may rise because of scenery novelty, clearer navigation, choice of cluster or faster revisits, not better learning. P2 separates exploration gains from recall harm but cannot identify those mechanisms. Report daily exploration descriptively for days 0–6; a day0 spike followed by convergence is a novelty warning, not retention evidence. Any week-two durability test is a new preregistration, not a retrospective rescue. Report device/context and missingness only from approved collected fields; do not invent demographics or hidden cohorts.

**Minimum instrumentation and consent.** Today's allowlisted beacon has no participant linkage/first-reveal identity and `REGISTERED_EXPERIMENTS` is empty; persisted, observable study evidence is not established. Required reviewed capabilities are consented pseudonymous assignment, frozen version references, deduplicated target first-reveal timestamps, anchor probe first-answer/correctness and observation completeness. Scope/retention, withdrawal, account/device ownership, export/deletion and randomization persistence need Privacy/backend approval before any implementation or collection. Do not add identifiers, events or an experiment allowlist entry through this documentation change. No new analytics collection is authorized by the founder's feature plan alone.

**Qualifying app recall boundary.** Scheduled lesson recall and eligible delayed flag answers may count under the single source-aware policy in the founder record; immediate flag practice never counts. The separate research probe above is excluded from that app-credit policy to avoid double credit or unreviewed origin conversion. Freeze flag/lesson versions and report their exposure semantics before enrollment; source provenance must be auditable without adding unapproved tracking.

**Budget and build admission.** Number Island target USD60 end to end; pause at USD120, including already-spent attributable work. Actual current dollars are NOT measured here: repository token ledger is not a dollar bill and no live billing tool/harness usage was supplied. No claimed spend of zero, currency conversion, remaining balance or automatically enforced cap. The founder subsequently said “don't worry about tokens”; per the central intake this removes unavailable token/USD metering as a hard blocker for continued scoped work. Keep USD60 target/USD120 pause as cost guardrails, checkpoint actual spend when available and pause if measured attributable spend reaches USD120; disclose unknown current dollars rather than pretending enforcement. This clarification does not authorize recruitment or paid service/study expenses, or waive experiment, Privacy or green-check prerequisites. First company turn is existing checks remediation (811 errors/4 warnings at latest observed baseline); no revised-feature build/integration/merge/deploy until required checks are green. This record never waives those checks.

## Result

Not run. No participant assignment, outcomes, p-values, effect size, learning improvement or spend result exists. Do not fill this section from simulated learners, seeded QA histories or screenshots. Append later results and invalidations without editing the frozen predictions above.

## What changed because of it

Before implementation: replace post-selection world-opener comparison with assignment-based intent-to-treat; distinguish exact no-lower hypothesis from a practical noninferiority guardrail; keep unknown outcomes and missingness visible. Head-of-product owns scope approval, Analytics owns this registration/interpretation, Privacy owns instrumentation disposition, Engineering owns reviewed implementation, and release-manager still needs green gates and founder revised-screenshot approval. No production behavior changed.

## Objections

- **A large sample or prospective instruments may exceed the feature budget.** Answer: this is a design, not spend/recruitment approval; keep the run blocked until funded/observable, or preregister a separately labeled formative study before collecting anything. A smaller convenience study cannot be relabeled confirmatory.
- **World and feed affordances cannot be blinded.** Answer: random assignment addresses self-selection, not expectancy; report the package effect and novelty limits, not an isolated mechanism or transfer claim.
- **Registered documentation could be mistaken for live experiment admission.** Answer: file/index status explicitly remains draft/unrun; CoS commit is still required, and it does not authorize public holdout, new tracking, missing instruments, red gates or deployment.
