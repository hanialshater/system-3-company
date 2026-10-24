# Behavioral and causal-probability batch: engineering route and pre-code design

owner: principal-engineer
date: 2026-10-24
class: engineering
route: principal-engineer → platform-engineer → demo-builder → qa-tester → principal-engineer-ops
status: proposed design; implementation may proceed within the boundaries below; merge review and readiness remain open
tier: 2 (isolated shared engines with more than ten consumers)
reviewers: principal-engineer-ops and an engineer other than the implementer

## Problem and scope

The founder requests a PR with 100 demos from each of two supplied idea lists. The category managers own selection, concept placement, overlap and teaching boundaries. Engineering owns making the resulting 200 independent lesson entries executable, testable and reversible. This record is written before the shared implementation. It gives no publication, factual-verification, merge or deployment approval.

Existing patterns are `src/lib/books/model.ts` plus `src/components/books/BookIdeaLesson.tsx`, and the pure trace/state/render split in `src/lib/algorithms/types.ts` and `src/components/algorithms/`. Neither existing engine should be extended to absorb these domains: their model semantics and already-reviewed consumers should remain unchanged.

## Options

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| 200 wholly independent components | High repeated code and QA surface | Corrections drift between copies | Easy lesson removal |
| Extend Books or Algorithms engine | Lower initial implementation | Changes existing lessons and confuses model meaning | Existing consumers complicate rollback |
| Two isolated domain engines, pure models and small wrappers | Moderate | A family bug affects its new consumers | Remove only this batch and its engines |
| Do nothing | No implementation | Does not fulfill the request | Immediate |

Choose two isolated domain engines. Reuse the existing kit by import, with no kit changes. Do not make a new generic application framework.

## Implementation contract and ownership

1. **platform-engineer** implements the new shared engines and their focused model/state tests. Suggested paths: `src/lib/behavioral-batch/{types,model}.ts`, `src/components/behavioral-batch/BehavioralLesson.tsx`, and corresponding `probability-batch/` directories. Local CSS modules are allowed. A common helper is allowed only when it has genuinely identical semantics; do not couple the two source catalogs.
2. **demo-builder**, in separate worktrees, owns per-lesson `Demo.tsx`, spec payload and `meta.json` under `src/demos/behavioral/<slug>/` and `src/demos/probability/<slug>/`. A wrapper imports only its spec and the relevant engine, never the full 100-entry catalog. Category-manager selections must supply the brief before build.
3. **category managers** own their curriculum files. Every new `meta.concept` must exist in the matching curriculum and `curriculum.primary` must name it. Never reuse an unrelated concept just to make the validator pass. New metadata fields may be local descriptive extras; do not change the shared metadata schema.
4. **qa-tester** runs the unchanged protected contract for all 200 lesson routes and checks the interaction/reveal path. An independent learner evaluator reviews artifacts first. **principal-engineer-ops** owns operational-readiness approval before shipping a shared engine; no implementer self-approval.

The suggested paths are optional names; the important boundaries are new modules, no existing engine edits and per-lesson imports. No new dependencies, routes, network calls, browser storage, learner-event fields, auth changes, public catalog logic, registry format, build configuration or protected-path changes. Regenerate the existing registry through its command; do not hand-edit its shape.

### Typed data and pure calculations

Use discriminated families with explicit inputs, not a bag of arbitrary numbers interpreted by a title. Each spec carries a stable id, concrete predict question, 2–4 balanced options and integer answer index, model boundary, model-specific inputs, two or more meaningful exploration states, a required question case, and reveal function/text that names observable state. Keep source-entry id, source title and paper attribution in each lesson's metadata or local provenance payload.

Behavioral candidates include reference-point/payoff diagrams, framing pairs with identical underlying outcomes, allocation/mental-account budgets, delay/commitment timelines, choice-set geometry and study-estimate/uncertainty comparisons. Their reported human effects remain source-backed, unverified claims. An illustrative model is labelled as such and cannot establish that people behave that way. A learner's own choice has no right/wrong personality diagnosis. Contested findings teach uncertainty or counterexamples, never a contested effect size as the universally correct predict answer.

Probability candidates include frequency trees/Bayes, sampling distributions, causal assignment/confounding tables, counterfactual paired outcomes, diagnostic/design comparisons, regression/measurement-error plots and sequential evidence. The category manager can choose other families. At least five real model/visual families per 100-entry batch are expected; changing labels on the same answer card is not distinct pedagogy.

Validate at the local spec boundary: known family; finite bounded numbers; nonempty denominators; probabilities in [0,1] (or explicitly percent with [0,100]); nonnegative finite counts; integer bounded iteration/sample counts; unique scenario ids; options length 2–4 and answer in range; finite plotted coordinates; bounded SVG marks; text lengths. Reject malformed specs explicitly rather than return NaN, silently clamp an impossible probability or display an answer from invalid inputs. No `eval` or dynamic source execution.

Pure functions produce numeric outputs plus the exact visible trace. A separate formatter determines display precision. Reveals and claims use that precision; expected fractional counts are not presented as observed whole people. Random simulations use a named seed and a bounded local PRNG, with the seed/rule disclosed. Exact enumeration is preferable for small cases.

### Interaction and stage state

Use `<Lesson>` and existing kit controls unchanged. Before commitment, every stage control is disabled and no answer, target highlight or result is shown. The first enabled controls must reach the question's own case under QA's one-press DOM-order path. Every enabled control changes meaningful visible state; disable exhausted steps and active choices rather than leave enabled no-ops.

Save a completed observation separately from the active exploration state. Reveal eligibility is awarded only when the required case is reached; Reset may clear active exploration but must preserve the observation that earned the reveal, or consistently revoke eligibility through an already-supported kit mechanism. Prefer the former. Show the saved observation on the stage whenever the reveal quotes it. Alternative scenarios must change a teaching-relevant input and computed outcome, not merely repaint the same numbers. No answer-bearing reveal may render before eligibility.

Follow the existing stage budget (25 ordinary words), reveal budget (90 words), design floors and phone fit. Use CSS theme variables and SVG roles/labels. All sliders and buttons remain keyboard accessible; SVG meaning must also be readable as concise numeric/text state.

## Verification and budgets committed before implementation

| Measurement | Current/target | Command or method |
|---|---|---|
| Added lesson counts | Exactly 100 behavioral and 100 probability | Manifest plus filesystem/meta enumeration |
| Duplicates | Zero duplicate slugs; overlap decisions recorded by managers | Compare manifest to existing registry and nearest-lesson notes |
| Model correctness | Each family: exact fixture, boundary and invalid-input tests; causal contrasts recomputed independently | Focused Node tests using existing TS loader |
| Visible change | Every enabled action changes rendered fields | Browser checks and state tests; do not count hidden `result` fields |
| Reset/reveal | Required case survives Reset truthfully; both exploration scenarios reachable | Browser tests, including Reset last |
| QA | All 200 new lesson routes on phone and desktop | Unchanged `npm run qa`, scoped by the existing QA slug mechanism |
| Type/build | Pass on integrated tree | `npm run typecheck`, `npm run build` |
| Full regression | Run and report exact inherited failures separately | `npm run check`, `npm run verify` |
| Scope | No protected path, existing engine or dependency change | `git diff --name-only` |

Record baseline check failures before integration, then compare error identities, not just counts. If full verify stops at inherited failures, run the remaining relevant scripts independently and report that the full command remains red. Do not weaken tests or gates. Record build wall time and generated-page count; do not claim a performance improvement without measuring one. Each wrapper imports only its local spec, avoiding an accidental 100-spec client catalog import.

## Operational readiness, rollout and rollback

Failures: wrong arithmetic, malformed inputs, unearned reveal, stale observations, answer leakage, phone overflow, or the wrong source/model boundary. Detect using pure fixtures, invalid-input checks, all-route QA and independent artifact review. Bound work to finite arrays and loops, no runtime requests, storage or additional event payloads. This batch introduces no new credentials or persistent data. Source attributions and draft status remain truthful.

Ship only the PR requested. The shared engine is tier 2 by blast radius even though the ordered path map lacks these new directory names; the previous Algorithms 200 review explicitly found that omission misleading (`company/engineering/reviews/2026-10-16-pr6-engineering-review.md`). Do not edit the path map in this batch simply to reclassify it.

Rollback is reverting the batch commit(s), including its wrappers, curriculum additions and registry regeneration. No migration or learner-data operation is needed. Independent engineering diff review and a readiness record approved by principal-engineer-ops are outstanding before merge/ship. Publication requires the ordinary independent source verification, QA and learner-review gates; no status is promoted by this design. Deployment needs a specific later founder instruction.

## Objections and answers

- **Principal engineer:** 200 model toys could misrepresent 200 scientific results. **Answer:** empirical claims remain source-attributed and unverified; every toy states its assumptions and cannot validate a human effect. Managers must choose distinct teaching goals and reject unsupported mappings.
- **Principal engineer:** a universal renderer can turn a varied curriculum into one repeated interaction. **Answer:** require genuine numeric/causal families and visible representations chosen by pedagogy, with design sampling across every family.
- **Principal engineer:** shared engines might be called tier 1 because no path rule matches. **Answer:** tier 2 is explicitly assigned here; no self-approved readiness or gate changes.

## Next move

Chief of staff dispatches platform-engineer with this contract and the category managers' selections. Builders then fill the two domain catalogs and wrappers in isolated worktrees. Implementation report returns to the principal engineer for a diff review, and to principal-engineer-ops for readiness; QA/learner review remain independent.
