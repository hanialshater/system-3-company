# Operational readiness request: Books 100 renderer

change: Seven Books-only deterministic models and a shared predict/explore/reveal renderer
change-tier: 2
paths: src/components/books/**, src/lib/books/**, tests/books/**
author: platform-engineer
approved-by: principal-engineer-ops
approved: 2026-10-16
board: W-1486
risks: proposed shared Books renderer regression and unverified book attribution; principal-engineer-ops owns register changes
links: company/engineering/edd/EDD-010-books-100-models.md, company/engineering/reviews/2026-10-16-books-100-pr-architecture.md

Status: **independently approved with conditions for bounded adoption in the exact 100-draft PR**.
Principal-engineer-ops' actual evidence and remaining conditions are in
`company/engineering/readiness/2026-10-16-books-100-ops-approval.md`.
Current seven-family core QA closes O1; final all-100 QA, scope/build/capacity,
rollback and draft/source-hold conditions remain. This is not a factual-accuracy,
final integration, publication or deployment approval.

1. **What can fail.** A model arithmetic defect fans out to its consumers; a
   locked-stage leak supplies an answer; clearing the Seen outputs while leaving
   reveal earned would make the explanation unsupported. Pure known-answer,
   invalid-input and snapshot tests exercise those numerical invariants. The
   stage hides all inputs/results until a named scenario is applied. Both cases
   earn separate milestones, and Reset retains evidence. Independent DOM/phone
   checks of real family representatives and all 100 consumers remain required.
2. **How we would know.** Focused `tests/books/models.test.mjs`, integrated
   typecheck/build/check and existing computer-use contract detect arithmetic,
   compile/runtime, control and layout failures. `tools/reveal-fit.mjs` and
   independent screenshots detect word/phone-fit problems on actual payloads.
   There is no new runtime monitor. Attribution/source-access failures remain
   per-lesson fact-check holds and are not detected by the arithmetic suite.
3. **Rollback.** Revert the final PR commits (all 100 new consumers and these
   isolated modules together), regenerate the existing registry, then rerun
   check/typecheck/build/QA. No schema or data migration is introduced. Exact
   integrated revert SHAs are assigned by root once its PR is assembled. A
   repository revert does not require a deploy; production rollback still needs
   founder-authorized release handling. Duration depends on full integrated
   build/QA and has not been measured on this tree.
4. **Capacity.** This worker uses one assigned worktree and the existing shared
   node_modules symlink; no dev server or production build. Root owns one
   integrated build/server and QA allocation. All models are bounded: at most
   13 trace points, 12 network nodes, 12 interval chunks and four serial stations.
   Each consumer imports only its own payload; the renderer imports no corpus.
   No new npm dependency, CI workflow or deployment is created. Local focused
   test/typecheck wall time and file bytes are appended below after validation;
   integrated 1,069-lesson capacity and CI duration are still unmeasured.
5. **Security.** No new route, URL parameter, iframe, network request, external
   image/script, secret or permission. Payload strings are React text. Literal
   `{A}`/`{B}` replacement uses only formatted finite saved outputs; no eval or
   HTML injection. Validation rejects nonfinite inputs, bad arity, invalid
   counts/horizons, zero sample denominators and outputs over the stated bound.
6. **Data.** New state is component-local active case plus two number snapshots,
   discarded when the lesson unmounts. No new store, identifier or data API.
   Existing Lesson progress/events behavior is unchanged; no additional event
   fields are sent by this renderer.
7. **Risks.** Propose a shared-engine regression risk with independent model and
   contract checks as mitigation; propose attribution/model-overreach holds on
   all draft consumers until their own independent fact checks. No risk is
   closed or rescored by this author. The architectural objection about seven
   numeric skins remains for independent learning/design review: the engine
   supplies distinct queues, branches, recurrence paths, weighted populations,
   trees, a stock container and work/overhead intervals, but only actual lesson
   payloads can demonstrate causal fit.

## Validation (author evidence)

- `node --import ./tests/lifehacks/register.mjs --test tests/books/models.test.mjs`:
  **10/10 passed**, approximately 0.47 seconds. Covers all seven known-answer
  families, signed losses, fractional successes, probability/horizon boundaries,
  invalid ranges/arity, overflow, literal substitution and Reset snapshots.
- `./node_modules/.bin/tsc --noEmit --incremental false`: **passed** on the
  969-lesson base plus the isolated engine, with no registry mutation.
- `npm run check`: **passed**, 969 lessons / 5,299 claims / five inherited disputed
  Life Hacks warnings. No Books consumers have been added by this worker.
- Renderer/model/docs/tests total 29,260 source bytes before the final narrow
  guard change; this is source size, not a measured production bundle.
- No server/build process started. `npm run verify`, actual family-payload
  compilation, independent controls/phone/design checks and integrated capacity
  measurement remain owned by root and the designated reviewers. Architecture
  approval does not stand in for those results.

## Approval

Decision by principal-engineer-ops: **approved with conditions for bounded renderer adoption**
on the exact-100 draft PR, identified seven-family v3 build at
`da62ea4379440a0186d0f09b78a5ecb820b162aa`. See the separate ops approval
record for actual O1 evidence, remaining O2–O5, revocation conditions and
the explicit 360×640 reveal-fit limitation (W-1495, subject to integration ID remap).
No publication/deployment approval is supplied. The author did not self-approve.

## Corrective B1 follow-up (2026-10-16)

Independent exploratory findings supplied by the coordinator prompted four
local fixes: Reset has a 60px width; the locked network has one neutral seed
rather than a seven-node solved tree; payoff results explicitly add both
weighted contributions; and a completed Reset restores case A's causal picture
instead of question marks. Before both cases are observed, Reset remains neutral
and cannot substitute for observing A on a B-first path. The already-restored A
state disables Reset, while selecting B re-enables it. Seen evidence and earned
milestones survive either Reset path. Network origins have a square and an
Origin label, distinct from forwarded circular nodes.

Validation: focused model/snapshot tests **11/11 passed** (including B-first
Reset and disabled baseline Reset); strict direct TypeScript **passed**;
`npm run check` **passed** on the 969-lesson base with the same five inherited
Life Hacks warnings; `git diff --check` passed. These author checks do not
supersede independent QA or final readiness approval on the integrated tree.

Case-label follow-up: scenario controls now define visible A/B aliases even
while locked (`A: <label>`, `B: <label>`). Seen uses those same aliases without
duplicating long scenario names; both named controls remain visible. Accessible
control names include the full case label. No math or state behavior changes.
