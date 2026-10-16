# Books 100 PR: principal-engineer architecture review

Date: 2026-10-16 · reviewer: principal-engineer (Kenji) · tier: 2

**Decision: approved with conditions for implementation. Merge approval pending.**

Design: [EDD-010](../edd/EDD-010-books-100-models.md). A local renderer shared by 100 new lessons is an engine used by more than ten lessons, explicitly tier 2 in the ops-readiness template. The current readiness path map's default does not remove this rule. No ADR or amendment is needed while the scope stays local and reversible.

## Actionable batches

### B1 — platform-engineer: local renderer and pure models

Owner paths: `src/components/books/**`, `src/lib/books/**`, focused tests outside `tests/qa/**`, and an author-written readiness record. No kit, dependency, generated registry, build configuration or existing-lesson edits.

Implement the EDD's BookIdeaSpec and seven documented families. Two scenario presets earn unique milestones, with a persistent computed Seen comparison. Reset retains evidence. Validate finite values, family arity and bounded counts. No input should silently produce NaN or Infinity. Visuals must show the mechanism in each family, not generic result bars. Compile one sample in each family before the 100-payload integration. Definition of done: pure known-answer and boundary checks, all controls locked before prediction, meaningful controls after prediction, retained Reset evidence, phone fit on a family sample, tier-2 readiness request.

### B2 — cm-books to demo-builder: independent lesson payloads

Owner paths: assigned new `src/demos/books/<slug>/` folders and their own `company/reviews/<slug>/build.md`. One wrapper imports only its own idea.json and shared renderer. New metadata uses the existing schema; all claims unverified; evidence arrays empty until independent reviews exist. CM owns per-book meaning, actual attribution addresses, recall, and family mapping. Do not use a toy derivation as support for a book's general effectiveness. Record source-access limitations honestly. Exactly 100 distinct books and new folders; existing six untouched.

### B3 — qa-tester / learner-evaluator / fact-checker

Artifact first. After the integrated build, walk the 100 new routes and inspect prediction, both interventions, retained Seen results, Reset and reveal. QA claims do not stand in for learner evidence. Fact-check attribution and model scope independently. Books without accessible source support remain drafts; a PR can contain reviewable drafts without inventing a launch verdict.

### B4 — principal-engineer-ops, then principal-engineer

Readiness approval is owned by principal-engineer-ops. Principal-engineer inspects the final engine/consumer diff and integrated verification evidence before merge. Root coordinates one build/server and the PR. No deploy authorization exists in this task.

## Objections and disposition

- Shared defect fans out to 100 demos: accepted; treated as tier 2 with pure models, browser checks and rollback together with all consumers.
- Repeated numeric skins are not 100 lessons: accepted; design/CM must match causal mechanisms and reject forced mappings.
- Draft sources could be mistaken as checked: accepted; claims stay unverified, with source-access holds explicit and no fabricated review references.
- Baseline dispatch C2 test is unrelated: isolate and record environment behavior; do not edit unrelated gate/guard code.

## Evidence and pending checks

Before implementation: read CLAUDE.md, role and onboarding docs, current operating picture/top handoffs, engineering tier/readiness docs, all ADRs, protected paths, the product standard and existing Books example. Baseline inspected: six Books entry points, 969 total lessons, no Books engine. The parent already observed the inherited C2 dispatch failure. No code has been changed by this reviewer, and this document does not claim code, build, QA, fact-check or readiness approval.

## Inherited dispatch C2 diagnosis

Reproduced independently with `node --test --test-name-pattern='W-1337 C2' tests/dispatch/guards.test.mjs`: 0 pass, 1 fail at line 531 because expected stash list `[]` is actually `['autostash']`. A second throwaway-repository probe using the same deterministic post-index-change writer confirms Git 2.51.1 exits 1 with `cannot rebase: You have unstaged changes`, then attempts to reapply the autostash, reports conflicts and says the changes are safe in the stash. It leaves an `autostash` in `git stash list` and removes `.git/rebase-merge`; no `.git/rebase-merge/autostash` remains.

The inherited fixture assumes Git strands the stash only in the rebase state directory. That assumption is false on this host. The failure is before the detector assertions; it does not establish a Books regression or prove the detector works on the fixture's intended path. Do not weaken that assertion or change guard code in this PR. Route to tools-lead/evaluation-steward: a compatible fixture should explicitly construct the stranded rebase/autostash state for detector behavior, while a separate integration test accepts Git's version-dependent recovery path and checks work is retained plus the prevention verdict refuses the unsafe command. Full `npm run verify` remains red until the owner fixes the inherited fixture; report this honestly alongside the remaining Books checks.
