# Engineering Review: 2026-10-16: PR #5 "100 Books draft demos" (merge gate)

owner: principal-engineer (Kenji) · tier: 2 · requested by: community-engineer (review matrix, company/engineering/community/README.md: "Kit, app shell, build, data shapes (tier 2) → Principal engineer: EDD and engineering review")
head reviewed: `fe7fc958` on `review/pr5-pe` · merge base: `f9d47e4f` · worktree: /home/user/s3c-pr5-pe

- EDD: [EDD-010](../edd/EDD-010-books-100-models.md) · ADR: none needed (local, removable module; agreed) · Amendment: none (no protected path touched, verified below)
- [x] The problem is real: founder-requested 100 drafts (company/decisions/2026-10-16-founder-books-100-pr.md); one shared renderer is better than 100 copies
- [x] Options considered, including doing nothing (EDD-010 "Options considered")
- [x] Blast radius: 100 new draft lessons; the 974 existing lessons change only in their registry index number (measured below)
- [~] Readiness record approved by principal-engineer-ops ([ops approval](../readiness/2026-10-16-books-100-ops-approval.md)), with O2–O4 still open at this head
- [x] Rollback is one revert: `git revert fe7fc958 1ba084d2`, then `npm run registry`, check, typecheck, build (the PR is exactly these two commits)
- [ ] `npm run verify` on the integrated tree: **not yet run on this head** (condition M1)
- [~] Measurements: model tests and payload checks yes; build wall time and output size not measured by anyone (M1)
- [x] Security, privacy, licences: no dependency, route, network, storage, event or identifier change

## Method

Artifact before account. I read the code, ran the checks and wrote findings F1–F11 before opening EDD-010, the two PR review records and the two readiness records. Section "The PR's own records" was written after that.

Checks I ran at `fe7fc958`:

| Check | Result |
|---|---|
| `./node_modules/.bin/tsc --noEmit --incremental false` | pass, 48 s wall |
| `node --import ./tests/lifehacks/register.mjs --test tests/books/*.test.mjs` | 12/12 pass, 0.86 s |
| `npm run check` | pass: 1074 lessons, 5794 claims, 99 roles, 3 inherited Life Hacks warnings |
| `node --test --test-name-pattern='W-1337 C2' tests/dispatch/guards.test.mjs` | **pass** (1/1). The records' "inherited C2 failure" no longer reproduces on this host |
| `git diff f9d47e4f HEAD -- package.json package-lock.json` | empty: no dependency change |
| Changed paths vs `company/constitution/protected-paths.txt`, `src/kit/`, `tools/`, `.github/`, `.claude/`, `next.config.*`, `tsconfig.json`, `vercel.json` | none |
| Script: all 100 `idea.json` through the real `validateBookIdeaSpec` | 100/100 valid; families compound 10, payoff 26, intervals 16, network 9, flow 7, feedback 14, selection 18; max network reach 12 |
| Script: each `predict.options[answer]` against the model's computed A/B outputs | 100/100 numerically equal one of the two outputs (35 differ only in formatting, F8) |
| Script: per-family label count (payoff 2, feedback 3, intervals 2, compound 1, network 1, selection 2, flow = stations) | 100/100 correct |
| Script: claim addresses in `meta.json` covering every learner-visible `idea.*` field, `hook`, `recall` | all 100 cover every field; 33 do not address `title` (titles are non-factual noun phrases, acceptable) |
| `md5sum` of the 100 `Demo.tsx` | one hash: all 100 wrappers are byte-identical |
| Normalised registry diff (index identifiers `mN` → `mX`, sorted) | the only additions are the 100 `books/bk-*` entries; zero other lines changed |
| Build | not run (QA builds separately, per the dispatch) |

## Findings

### Must be met before merge

**F1. The Books tests never run automatically.** `tests/books/models.test.mjs` is not in any `package.json` script (`package.json:16` verify chain; `:19-29` test scripts), so neither `npm run verify` nor CI runs it. A future engine edit can break the arithmetic of 100 lessons with no signal. Fix (mechanical, platform-engineer): add `"test:books": "node --import ./tests/lifehacks/register.mjs --test tests/books/*.test.mjs"` and put `npm run test:books` in `verify` next to `test:lifehacks`. `package.json` is tier 2 by path map; I approve this one script addition inside this review. It needs no separate EDD.

**F2. No committed test validates the 100 shipped payloads, and an invalid payload crashes its page.** `validateBookIdeaSpec` throws during render (`src/components/books/BookIdeaLesson.tsx:18`), and nothing on the lesson path catches it (no error boundary in `src/components/DemoHost.tsx`, no `error.tsx` under `src/app`). Editing a lesson's `idea.json` is tier 0, so it gets no review. The final review validated the *brief* payloads, not the shipped `idea.json` files. I validated all 100 shipped files myself (table above). Fix (mechanical, platform-engineer): add `tests/books/payloads.test.mjs`. It should iterate `src/demos/books/bk-*/idea.json`, run `validateBookIdeaSpec` on each, assert the per-family label count (also missing from the validator, `src/lib/books/model.ts:105-106`; the renderer falls back to `""` at `BookIdeaLesson.tsx:79`), and assert that `predict.options[answer]` names a computed output. This needs F1 to run anywhere.

**F3. Integrated verification has not been run on the head that would merge.** The engine changed after every review and QA record. `fe7fc958` adds `formatCompoundOperation` (`src/lib/books/model.ts:132-138`) and uses it in the compound caption (`BookIdeaLesson.tsx:122`), and edits 3 payloads and 12 metas. The final review and the ops approval cite `cded0cd9`, `ac6ef704`, `da62ea43` and `54774305`. **None of these exist in this PR's history**, which has two commits, so their hash identity cannot be checked from the repository. The ops approval's own revocation clause says an engine change after O1 invalidates the affected family evidence; the builders correctly emptied `bk-checklist-series-reliability`'s QA link. Requirement: qa-tester runs the integrated `npm run verify` (or check, typecheck, build and `npm run qa`) on `fe7fc958` or the merge result, records the summary, build wall time and `.next` output size, with zero unexpected failures. `tests/qa/lessons.ts` includes drafts, so the contract spec exercises all 100 new lessons, not just the seven. W-1337 C2 now passes here, so no inherited-failure exception is needed. If verify is red for any reason, the PR does not merge.

**F4. The PR's guide points at records that do not exist.** `company/reviews/books-100/README.md` ("Evidence boundary", last bullet) says "Final integrated test results and build identity are recorded in the final integration and QA records beside this guide." No such record is in the PR (`git diff --name-only f9d47e4f...HEAD | grep -i integrat` is empty). The ops approval's O3 (integration record: manifest, scope check, build time and size) and O4 (commit list and grouped revert commands) are also unmet. Requirement (chief-of-staff): write the integration record from the F3 run, with revert `git revert fe7fc958 1ba084d2` plus `npm run registry`, or correct the sentence. A merged record must not cite evidence that does not exist.

### Before any of these lessons is promoted out of draft (not merge blockers)

**F5. Claim addressing uses two undeclared shapes.** 67 lessons use `addresses: string[]`; 33 use `address: string | string[]` plus `kind` (for example `src/demos/books/bk-algorithms-cache-change/meta.json`, claim `.toy`). Neither field is in `Claim` (`src/kit/types.ts:25-34`), and `tools/company.mjs:217-224` does not check them. Coverage is complete today (my script), but nothing enforces it, and a fact-checker or tool reading one spelling will miss a third of the lessons. Before promotion: the builders (demo-builder, with cm-books) normalise to one spelling. If the company wants addresses as part of the schema, that is a tier-2 data-shape change: an EDD-010 addendum and a check in `tools/company.mjs` (protected, so an amendment). One cosmetic mismatch: `bk-systems-delay-control` world claim text is prefixed `idea.doesItHoldUp: "…"` instead of equalling the field.

**F6. Per-lesson QA covers 4 of 100 at this head.** Only 4 metas link a QA record (`evidence.qa`), and none links a learner record. This is correct for drafts, and `launchGates` (`tools/company.mjs:139-158`) blocks publication without them. ops O2 (phone, desktop and strict fit for every addition) and W-1495 (360×640 reveal crop) stay open for promotion. Owners: qa-tester, platform-engineer/design.

**F7. The exact compound caption shows a 15-significant-digit rate.** At `bk-scale-exponent-boundary` (`idea.json` scenario A rate `68.1792830507429`), the learner sees "× (1 + 68.1792830507429/100) + 0" on a phone stage. The rule "never show a rounded multiplier" (`src/lib/books/README.md`) is correct engineering. Whether a 2^(3/4) rate is the right payload is content and design work. Route: cm-books/demo-builder, with phone QA of that lesson after any change.

**F8. Answer options and stage readouts format the same number differently.** In 35 payloads the correct option reads like "45.00" or "−1.01 points" (U+2212), while the stage and Seen row show `formatBookValue` output ("45", "-1.01"). The numbers agree in all 100. Route: demo-builder/cm-books, before promotion.

### Follow-ups (not gating; owners named)

**F9. The tier map does not know this engine.** `company/engineering/readiness/paths.json` has tier-2 `shared-engine` rules for `src/components/lifehacks/**` and `src/lib/lifehacks/**`, but none for `src/components/books/**` and `src/lib/books/**`. Those default to tier 1 even though 100 lessons use them. EDD-010 correctly overrode this by hand. Follow-up: principal-engineer-ops proposes and principal-engineer accepts two rules (gate file, tier 2). Also, `tools/readiness.mjs`, which the engineering README names as the map's reader, is absent from this tree; check it against main before relying on the map.

**F10. The Demo.tsx check is textual, and books satisfies it with a comment.** Each wrapper contains `// The shared stage renders <Control> buttons…` and imports `BookIdeaLesson` under the name `Lesson` (`src/demos/books/bk-*/Demo.tsx:3,6`). That satisfies the regexes in `tools/company.mjs:226-228`. I verified the behaviour behind them: `BookIdeaLesson.tsx:21` renders the kit's `Lesson` from `@/kit/Lesson` and `:52-56` uses kit `Control`/`Row`/`useMilestones`, so there is no contract bypass. The same pattern is on main in 69 Life Hacks lessons. Follow-up for evaluation-steward (owner of gates): make the check follow a shared renderer's import, or allow-list named renderers, so a comment cannot satisfy a gate.

**F11. Bundle and scale.** `src/demos/loaders.generated.ts` grows from 78,608 to 87,680 bytes raw (+11.5%). It is imported by client `src/components/DemoHost.tsx:6`, so the larger map ships to every lesson page. The build also emits 100 more lesson chunks that production never serves (drafts are hidden in production, `src/lib/visibility.ts:33`). Both are small and already on the EDD-001/EDD-003 scale track. Not measured in a build: F3 must record build wall time and output size, and no performance claim about this PR is accepted until then. The renderer itself is a single shared module; each wrapper imports only its own `idea.json`, and no file imports the corpus (verified). `index.generated.ts` is `server-only` (line 4), so the 100 larger metas do not reach the client.

### Verified sound (no action)

- Contract: the renderer passes `predict`, `exploreHint` and `reveal` to the kit `Lesson` with `minInteractions={2}` and two unique milestones (`BookIdeaLesson.tsx:21,39`). Controls are disabled while `locked`, and the stage hides values and results until a case is applied (`:40-42`).
- State: Reset never clears milestones or Seen (`model.ts:116-127`), and a B-first Reset cannot stand in for A. Tests cover both orders (`tests/books/models.test.mjs:73-102`).
- Safety: payload strings render as React text. `fillSeen` replaces only literal `{A}`/`{B}` with formatted finite numbers (`model.ts:140-145`). There is no eval, HTML injection, fetch, storage, timer or randomness.
- Termination and bounds: the network layout loop adds at least one node per pass and stops at no more than 12 (`BookIdeaLesson.tsx:153-176`). Model outputs are bounded to 1e12, and non-finite inputs are rejected (`model.ts:29,94`).
- Registry: the 1,896-line `index.generated.ts` churn is renumbering of `mN` import identifiers caused by inserting 100 entries alphabetically in `books/`. After normalisation there are zero changes to the 974 existing entries. `loaders.generated.ts` gains exactly 100 lines, all `bk-*`. `npm run check` confirms the registry is fresh and matches meta.json.
- Content side files: `content/works.json` only appends (the one `-` line is a trailing comma); 112 work ids, no duplicates. `node tools/meta.mjs lint` reports no `bk-*` lesson.
- Visibility: all 100 are `status: "draft"`, and all 467 claims are `unverified`. Drafts are not listed or served on a Vercel production deployment (`src/lib/visibility.ts:29-33`).

## The PR's own records (read after the findings above)

- **EDD-010:** genuine and adequate for the design. It has options, a data contract matching the shipped `BookIdeaSpec` (`model.ts:11-22`), measurements, readiness and rollback, and it correctly overrode the tier-1 path default. **Not independent:** its header names principal-engineer as both author and reviewer, and the architecture and final reviews are the same role again. The final review discloses this. learning-designer's input exists (`company/design/specs/books-100-learning.md`), but there is no engineering sign-off by a second engineering role. That is acceptable here because the module is local and reverts in one step. It should not become precedent: a tier-2 EDD gets a reviewer other than its author. This review is a later, separate run of the same role with no memory of the design, so it is independent of the code but not of the role.
- **Architecture review (`2026-10-16-books-100-pr-architecture.md`):** genuine routing record (B1–B4). Its C2 diagnosis is stale: the test passes at this head.
- **Final review (`2026-10-16-books-100-final-review.md`):** a genuine, careful code review, but **it does not cover what shipped.** It reviewed engine `cded0cd9` with 7 of 100 consumers. It reports 11 tests, while 12 exist now (the `formatCompoundOperation` test was added in `fe7fc958`). It validated brief payloads rather than shipped `idea.json` files, and it cites commit ids absent from the PR. Its own condition 2 (all 100 consumers built and contract-QA'd) is unmet. This record supersedes it for the merge decision.
- **Readiness (`2026-10-16-books-100-renderer.md`, `…-ops-approval.md`):** genuinely independent: written by principal-engineer-ops, not the author, with evidence the reviewer inspected and honest limits. It approves bounded adoption only. O1 is closed for an engine that has since changed in one family (compound caption), and O2–O4 are open. F3 and F4 above carry O3 and O4 into the merge conditions; O2 and O5 carry to promotion.

## Decision

**Approve with conditions.** The engineering is sound and contained. The renderer goes through the kit contract. The 100 wrappers are identical, thin and import only their own payloads. Every learner-visible field is addressed by an unverified claim. There is no dependency, protected-path, config or data change, and the risk to the 974 existing lessons is limited to a registry index renumbering that check confirms. The conditions are about evidence and test wiring, not design.

Before merge (all four):

| # | Condition | Owner |
|---|---|---|
| M1 | Wire `test:books` into `package.json` scripts and `verify` (F1) | platform-engineer |
| M2 | Add a committed payload test over all 100 `idea.json` files: validator, label arity, answer present (F2) | platform-engineer |
| M3 | Integrated `npm run verify` on the final head (after M1/M2) with all 1,074 lessons in the contract spec, zero unexpected failures; record summary, build wall time and output size (F3) | qa-tester, coordinated by chief-of-staff |
| M4 | Integration record with final commit list and grouped revert command, or correct the README sentence that cites it (F4, ops O3/O4) | chief-of-staff |

If M1 and M2 touch only `package.json` scripts and `tests/books/`, I do not need to re-review; the M3 run is the evidence. Any change to `src/lib/books/` or `src/components/books/` after this head returns to me for a diff read.

Before promotion of any lesson out of draft: F5 (one claim-address spelling), F6 (per-lesson QA and learner evidence, W-1495), F7, F8, and the existing fact-check, source and legal holds (R-007, ops O5).

Follow-ups list: F9 (paths.json rules for the Books engine; check `tools/readiness.mjs` on main), F10 (gate regex, evaluation-steward), F11 (scale track, EDD-001/EDD-003), and add EDD-010 to the index in `company/engineering/README.md` (principal-engineer).

Objections that travel with this decision:

- *"The final review and ops approval already cleared the engine."* Answered: they cleared an earlier engine on 7 consumers. The head differs in one family, and the cited commits are not in this PR. M3 is the evidence that counts.
- *"Full verify is red for an inherited reason (W-1337 C2)."* Answered: not on this host at this head (1/1 pass). If M3 is red, it blocks.
- *"Per-lesson QA for all 100 should block the merge (ops O2)."* Partly accepted. M3's contract spec runs every draft, which is the engineering bar for merging drafts that production cannot serve. Strict phone fit and per-lesson exploration for each of the 100 is a promotion gate, which `launchGates` already enforces. principal-engineer-ops may hold O2 as a merge condition in its own record; if so, that stands alongside this one.

## Kudos (optional)

- @principal-engineer-ops: the ops approval names its exact evidence, its revocation triggers and the 360×640 defect rather than calling the PR green. That made F3 easy to find.
- @platform-engineer: the pure model module is small, bounded and well tested. Reset-order invariants are tested in both directions.
