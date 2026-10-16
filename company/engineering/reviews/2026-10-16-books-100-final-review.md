# Books 100: final shared-engine code review

Date: 2026-10-16 · reviewer: principal-engineer (Kenji) · change tier: 2

**Decision: conditional code go. No blocking code defect found in the inspected engine. PR completion, readiness and merge approval are not asserted.**

Reviewed engine change through `cded0cd9`; integrated consumer/registration tree at `ac6ef704`. Design: [EDD-010](../edd/EDD-010-books-100-models.md). Engine author: platform-engineer, independently reviewed here. The architecture author and code reviewer are the same role; this record is code review, not an independent design or learner verdict.

## Inspected implementation

- `src/lib/books/model.ts`: all seven mathematical families, accepted bounds, runtime spec guards, formatting, literal placeholder replacement, observation/Reset state transitions.
- `src/components/books/BookIdeaLesson.tsx` and scoped CSS: prediction locks, unique two-case milestones, scenario/Reset enabled states, calculated geometry, saved evidence, reveal construction, SVG and phone layout constraints.
- `tests/books/models.test.mjs`: known answers, signed payoff boundaries, fractional expected selections, zero horizons, capped trees, overflow/invalid input rejection, Reset in both action orders, literal substitution.
- Seven actual representative folders' own Demo.tsx/idea.json contracts, frozen 100-brief payloads and the changed path inventory relative to the incoming base `e3594f79`.
- The kit's existing Lesson, Control and useMilestones implementation, to verify the shared component uses rather than replaces the constitutional interaction contract.

## Findings

The seven formulas match the EDD and input conventions. Signed loss outcomes are never negated implicitly. Selection preserves expected fractional successes and denominators. Trees count the origin, explicitly cap reach at population, and picture at most twelve nodes. Compound and feedback calculations have at most thirteen trace states; intervals have at most twelve complete chunks; flow has two to four stations. Finite inputs, arity, probabilities, integer horizons/counts, denominators and output overflow are guarded before rendering.

The renderer imports no book corpus. Each inspected wrapper imports its own payload and the shared component. It renders strings as React text and performs literal `{A}`/`{B}` replacement only; no HTML/eval, new network access, storage or dependencies appear. No protected path, kit contract, build/deploy configuration or original six Books demo file is changed in the inspected task diff. Metadata/registry generation continues through the existing tooling.

Before prediction all stage controls are disabled, outputs are placeholders and the network has only a neutral origin. Case controls both begin actionable. Each case earns one milestone; selecting the active case is disabled. The first-visit case output is stored in the same state update that changes the picture, and the reveal quotes saved numbers using the same formatter as Seen. Reset before both cases returns to a neutral stage while retaining partial observations; it cannot substitute for the unobserved case. Reset after both cases restores case A's actual causal picture and retains both Seen outputs. Reset is disabled if already at the state it would restore. These address the superseded pilot's missing-picture and wrapping-Reset issues.

Seven different representations carry the mechanism: station constraints/queues, weighted payoff branches, repeated updates, weighted population proportions, tree paths, stock/flows, and complete work/overhead spans. This establishes implementation capability; per-book causal fit remains the CM/learning/design review's judgment, not an engineering inference from distinct SVG code.

## Reviewer-run checks

- `node --import ./tests/lifehacks/register.mjs --test tests/books/models.test.mjs`: **11/11 passed**, about 0.51 seconds on this host.
- Validated all **100** frozen brief `idea` payloads through the actual `validateBookIdeaSpec` and recalculated both cases. All 100 passed; the 67 briefs carrying `answerCheck.A/B` agreed with the actual model. Distribution: compound 10, payoff 26, intervals 16, network 9, flow 7, feedback 14, selection 18. All network cases reach at most twelve nodes. No label exceeds 32 characters. The longest reveal `.why` content is 83 whitespace tokens including bibliography; actual reveal-fit/phone QA remains authoritative.
- `npm run check`: **passed**, 976 lessons / 5,334 claims, five inherited disputed Life Hacks warnings. At this review point, only the seven representative entry points exist on the integrated source tree; validating 100 brief payloads is not evidence that all 100 entry points were built or browser-tested.
- `artifacts/books100-seven-build.log` reaches Next's completed route summary for the seven-case tree. This is inspected coordinator build evidence, not a build run or browser result authored by this reviewer.

## Conditions that remain open

1. **Current-version family QA:** independent actual browser QA must cover the seven representatives after `cded0cd9` and payload refreshes through `ac6ef704`, including prediction locks, both case orders, Reset-last, keyboard/controls, phone fit and no overflow. The earlier six-case QA at `54774305` is superseded for engine acceptance.
2. **All 100 consumers:** integrate exactly the frozen manifest's 100 own wrappers/payloads/metas, rerun check/typecheck/build and current-version entry-point contract QA on every new slug. A seven-family sample does not authorize a “100 passed” claim.
3. **Readiness:** principal-engineer-ops must independently sign the [readiness request](../readiness/2026-10-16-books-100-renderer.md), with any open conditions carried to the PR. This code reviewer does not self-approve that record.
4. **Integrated verification:** run the required verification and report the inherited Git fixture failure honestly. The [architecture review](2026-10-16-books-100-pr-architecture.md#inherited-dispatch-c2-diagnosis) documents why W-1337 C2 fails on Git 2.51.1 before any Books change. Do not hide it by changing a gate or claim a fully green `npm run verify` while it persists.
5. **Scope/evidence:** keep all 100 additions draft, all source-dependent claims unverified unless independently checked, and no publish/deploy trigger. The single-idea prototypes are not complete book summaries. Engineering approval cannot remove F1/F2, book access, learner, legal or launch holds.

## Objections and disposition

| Objection | Disposition |
|---|---|
| More than ten consumers creates a shared failure surface. | Accepted: tier 2, bounded pure calculations, independent engine review, 100-route QA and readiness required. Revert engine and consumers together. |
| Runtime spec validation is not a full arbitrary-JSON schema. | Accepted limitation: payloads are local typed JSON checked at build/integration, not a remote input surface. Numeric/model invariants are guarded; all actual payloads must be validated before merge. A future remote payload source requires new schema/security review. |
| Saved numbers alone do not show the causal evidence. | Addressed in code by completed Reset restoring case A's diagram with the retained condition-labelled comparison. Actual phone screenshots must confirm the evidence remains visible. |
| Pure model tests do not prove a lesson teaches or fits a phone. | Accepted: the checks above make no such claim; independent QA, learning and design owners retain their surfaces. |
| Baseline verify is red. | Accepted known limitation, explicitly reported and separately routed; no unrelated guard/test mutation authorized in this Books PR. |

## Next owner

Root coordinates current seven-case QA, all 100 consumer builds/QA and the PR. principal-engineer-ops owns readiness approval. Principal-engineer rereads the final engine diff and current evidence if either code or model contract changes. No merge, publication or deployment is approved by this record.
