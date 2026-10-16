# EDD-010: Books-only reusable models for 100 book idea demos

author: principal-engineer · reviewers: principal-engineer, learning-designer, cm-books · tier: 2 · status: approved with conditions for implementation; merge review pending
date: 2026-10-16

## Problem and why now

The founder requests 100 additional book summary demos on a PR, following the existing organization and gates. The Books category currently has six local demo folders. Copying each component 100 times would copy milestone, reset and accessibility defects; a single text-flipping template would fail the lesson standard's causal manipulation requirement.

## Goals / non-goals

- Add 100 independently discoverable book idea lessons, each with its own Demo.tsx, idea.json, meta.json, claim addresses and review directory.
- Reuse Books-only calculations and interaction scaffolding, with genuinely different visual causal models.
- Keep the existing Lesson contract, registry generator, deployment setup and dependencies unchanged.
- Preserve the distinction between an attributed book argument, a stipulated model, and empirical evidence. A toy cannot establish that a book's advice works.
- This PR is not a release or deploy. Independent verification and publication gates still apply.

## Current state (with measurements)

On 2026-10-16 `npm run company -- status` reports 969 lessons, 6 in Books. `rg --files src/demos/books` lists six Demo.tsx entry points. No shared Books renderer exists. Existing The Goal lesson stores quoted milestone values and retains them on Reset; that behavior is the required baseline, not a reason to reuse its subject matter.

The parent session's baseline `npm run verify` stops in inherited `tests/dispatch/guards.test.mjs:507` W-1337 C2. The relevant failure expects an empty stash list after Git's autostash failure path. It is outside the Books diff; engineering will identify the environment-dependent behavior separately. No verification result is declared green by this design record.

## Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| 100 handwritten components | Repeated controls, state and layout | Reset/locking defects copied across lessons | Easy per lesson; expensive to fix consistently |
| One generic prose/card flipper | Lowest implementation cost | Does not show a causal mechanism; different titles do not make different lessons | Easy but fails product intent |
| Books-only typed engine with distinct families | One shared state layer and seven small mathematical representations | Shared defect affects 100 lessons; strict review needed | Remove new lessons and the isolated module together |
| Do nothing | No engineering cost | Founder request not met | Trivial |

## Proposal

### Ownership and boundaries

`platform-engineer` owns `src/components/books/` (renderer and scoped CSS) and `src/lib/books/` (types and deterministic pure calculations). `demo-builder` owns the 100 new folders under `src/demos/books/`; category managers own their briefs and curriculum. No source file imports the entire 100-book dataset. Each Demo.tsx imports only its own idea.json and the shared renderer. Existing six demos are untouched. No source schema or protected-path change is authorized.

This is tier 2 despite the current path map's default tier 1: the ops-readiness template explicitly includes an engine used by more than ten lessons. It needs an EDD before code, engineering review and principal-engineer-ops readiness before merge. An ADR is unnecessary because this local module is cheap to remove; no architecture outside Books changes.

### Public data contract

`BookIdeaSpec` has `book: { title, author, year, work }`, `family`, `predict: { question, options, answer }`, `exploreHint`, `scenarios: [{ label, values }, { label, values }]`, `labels: string[]`, `unit: string`, `bookIdea: string`, `modelBoundary: string`, and `doesItHoldUp: string`. Values are finite numbers; scenario labels describe actual interventions. The two records are the question case and counterfactual, with both recorded before reveal. `bookIdea` is an attributed paraphrase, not an endorsement. `bookIdea` is at most 20 words; book title/year/author belong outside the 25-word stage budget. Reveal text fields may contain literal `{A}` and `{B}` placeholders, replaced only by formatted saved computed scenario outputs; never evaluated as code. A source that could not be opened is unverified, not evidence that a topic is untested.

| Family | Scenario values | Output | Representation and limitation |
|---|---|---|---|
| flow | Station capacities, at least two | `min(capacities)` | Serial stations and waiting flow; steady toy line |
| payoff | `pPercent, win, lose` | `(p/100)*win + (1-p/100)*lose`, with both win and lose signed net outcomes | Two outcome branches/payoff cells; expected value, not a guarantee |
| compound | `initial, ratePercent, steps, additionEachStep` | Repeat `x = x*(1+r/100)+a` | Path/iterated units; fixed toy rate and timing |
| selection | `countA, successPercentA, countB, successPercentB` | `(nA*rA+nB*rB)/(nA+nB)` | Group/sample proportions with denominators; expected fractional successes, never invented integer observations |
| network | `totalNodes, branchFactor, rounds` | `min(total, sum(k^i, i=0..rounds))` | Visible branching paths; collision-free branching until cap |
| feedback | `initial, inPerStep, outPerStep, steps` | Repeat `x=max(0,x+in-out)` | Stock container and directed flows; fixed rates, no inferred empirical dynamics |
| intervals | `budget, workPerChunk, switchOverhead` | `floor(budget/(work+overhead))*work` | Work/overhead segments on a finite span; every chunk includes its stipulated overhead |

The model module validates arity, ranges, integer counts/horizons and nonzero denominators, rejects infinities, and caps generated visual elements. Exact accepted maxima are documented with its types. Authors use valid inputs and no universal real-world claim follows from these outputs. Books that do not fit these families should be redesigned by the category manager, not forced into a visual metaphor.

### Interaction contract

- Use existing `Lesson`, `Control`, `Row` and milestone APIs; minInteractions is two unique scenario milestones.
- Predict locks every control and shows no calculated output, target, causal highlight or Seen result.
- Scenario A then B are the first enabled controls in DOM order and each changes the stage. Active scenario controls are disabled/aria-disabled according to existing kit behavior.
- Record each case's computed output when reached. Reveal quotes those saved values in the same rounding shown on the stage. Both condition-labelled Seen results stay visible after Reset.
- Reset changes the active stage only. It never clears earned milestones or Seen evidence; disable Reset when it would do nothing.
- At reveal, use one family-specific causal picture, the compact Seen comparison, and at most 90 reveal words. Controls, labels and captions together remain at most 25 stage words. Meet the existing phone-fit and type-floor rules without shrinking text.
- No network, storage, randomness, timers or external book cover assets. No runtime claim-status override.

## Measurements committed before implementation

| Measure | Baseline | Required result | Check |
|---|---|---|---|
| New independent entry points | 0 | Exactly 100 new folders with own wrapper/payload/meta | Changed-path inventory and company check |
| Mathematical behavior | No shared engine | Known-answer, boundary and reset/snapshot behavior pass | Focused model tests plus browser contract |
| Scope | Books local only | Zero changed kit/protected/dependency/build files | `git diff --name-only` |
| Hook/title, reveal and stage budgets | Existing standard | All new payloads within limits; causal fit reviewed | Content validator and phone render |
| Prediction/milestone/reset path | Existing Lesson contract | Locked stage, two case milestones, retained evidence, no enabled no-op | Contract QA across 100 plus focused family sample |
| Catalog integration | 969 lessons at start | New demos typecheck and build in integrated tree | `npm run check`, `npm run verify` |

Would be wrong if: authors repeatedly cannot express the book mechanism without an unrelated generic numeric example; a family has no visible causal distinction; or build/QA exceeds host capacity. Stop the affected batch, route to category/design/operations owners, and keep the PR draft until resolved.

## Operational readiness

1. **Failure:** shared calculation, locked-stage leakage or Reset erases the basis of the reveal. Independent unit/contract/phone checks are mandatory; unsupported book attributions block publication independently.
2. **Detection:** CI, `company check`, contract QA, `tools/reveal-fit.mjs` and recorded independent walkthroughs. There is no new production monitor. Existing visibility/status gates apply.
3. **Rollback:** revert the PR's commits, regenerate registry, rerun check/verification. No new learner data exists to lose. Production rollback/deploy still needs founder approval.
4. **Capacity:** root allocates one integrated production build and one server/QA owner; builders must not each build all 1,069 lessons. Record build wall time and outputs on the integrated tree; no unmeasured scale claim is accepted. No deployments are requested. Shared module should not import the corpus.
5. **Security:** no new routes, secrets, external scripts, network or permission changes. Data renders as React text; no HTML injection.
6. **Data:** only static lesson payloads plus existing Lesson local progress/events. No new store or identifier.
7. **Risks:** propose shared-template regression and book-attribution/source-access holds to principal-engineer-ops. This record does not modify their risk register or self-approve readiness.

## Rollout and rollback

Implement the engine and one representative per family, validate them, then author the remaining payloads. Keep all new lessons draft until independent fact-check/QA/learner gates permit promotion. Submit the 100-demo PR with the engineering and readiness reviews linked. No deploy. Rollback is removal/revert of this isolated new engine and its consumers followed by registry generation.

## Open questions and objections

- **More than ten consumers makes this critical.** Accepted: tier 2 and readiness sign-off required; local path default is not a waiver.
- **Seven families could become seven repeated gimmicks.** Accepted: CM/design review the mechanism mapping per book; different story text alone is insufficient.
- **Toy results could be mistaken for evidence for advice.** Accepted: per-lesson attribution, explicit boundary and cautious evidence line; all claims begin unverified and review status is not fabricated.
- **The initial baseline dispatch test fails.** Open: isolate Git behavior and report it; no protected/unrelated gate patch in this PR.
- **The engine has not yet been inspected.** Open: architecture approval permits implementation only. Merge approval follows code and integrated verification review.
