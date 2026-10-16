# Engineering Review: 2026-10-16: PR #6 "200 algorithm demos" (merge gate)

owner: principal-engineer (Kenji) · tier: 2 · board: W-1523 · requested by: community-engineer (review matrix, company/engineering/community/README.md: kit, app shell, build and data shapes go to the principal engineer; this review is also the owning-engineer read for the Tools row)
head reviewed: `80dd3469` on `pr6/pe` = PR head `6008cd52` plus a merge of base `cdee168c` (`e32feca5`) plus the community evaluation commit (records only) · PR merge base: `207e8010` · worktree: /home/user/system-3-company/.claude/worktrees/pr6-pe

- EDD: **none.** No algorithms EDD exists in `company/engineering/edd/`. The pre-code design is the frozen contract in `company/ops/dispatch-requests/2026-10-16-algorithms-200-engineering.md` (see "The PR's own records") · ADR: none needed (local, removable module) · Amendment: none (no protected path touched, verified below)
- [x] The problem is real: founder-requested 200 algorithm lessons (`company/decisions/2026-10-16-algorithms-200.md`); one shared engine is better than 200 copies
- [~] Options considered: in the pre-code dispatch, not in an EDD
- [x] Blast radius: 200 new draft lessons, one catalog page section, one CSS block, one line in `tools/serve.sh`; the 1,075 existing lessons change only in their registry index number (measured below)
- [~] Readiness record exists (`company/engineering/readiness/2026-10-16-algorithms-200.md`) but classes the change tier 1 and is pending (see records section)
- [x] Rollback is one revert: the PR is one commit, `6008cd52`. After merge, `git revert -m 1 <merge>`, then `npm run registry`, check, typecheck, build
- [ ] `npm run verify` on the integrated tree: **not run by anyone on this head** (condition M3)
- [~] Measurements: run time of all 400 traces and payload validation yes; build wall time, output size and QA time not measured (M3)
- [x] Security, privacy, licences: no dependency, route, network, storage, event or identifier change. `tools/serve.sh` now binds loopback only, which narrows exposure

## Method

Artifact before account. I read the code, ran the checks and wrote F1–F12 before opening the PR's decision, route review, readiness record, the engineering dispatch and the community evaluation (`company/engineering/community/prs/6.md`). The section "The PR's own records" was written after that.

Checks I ran at `80dd3469` (node_modules symlinked from the main checkout, not committed):

| Check | Result |
|---|---|
| `./node_modules/.bin/tsc --noEmit --incremental false` | pass, 51.8 s wall |
| `node --import ./tests/lifehacks/register.mjs --test tests/algorithms/*.test.mjs` | 12/12 pass, 2.6 s wall |
| `node tools/company.mjs check` | pass: 1275 lessons, 10219 claims, 99 roles, 3 inherited Life Hacks warnings. `node tools/memory.mjs check` pass |
| `node tools/algorithms-200-check.mjs` (the PR's own checker, real manifest, all 200) | 200 specs, 0 errors, 0 claim/overlap warnings, 2.0 s |
| `git diff cdee168c 80dd3469 -- package.json package-lock.json` | empty: no dependency or script change |
| Changed paths vs `company/constitution/protected-paths.txt` (9 globs) | none touched. `src/kit/` untouched |
| Script: each `Demo.tsx` with its import line removed | one hash for all 200. The import line names the manifest's `specExport` and `module` exactly in 200/200 (exact match, not the checker's substring test) |
| Script: all 200 metas | 200 `draft`; 4,401 claims, all `unverified`; 200 have a recall; claim addresses use one spelling (inside `source`) |
| Script: run time of every question case | max 7.75 ms, max 26 frames (validator bound 64) |
| Script: `predict.options[answer]` vs `cases[0].run().result` | 154 equal as strings. 46 do not compare mechanically (booleans as Yes/No, U+2212 minus, a count vs a list). I sampled ten: the answer is stated in the case's proof in each. No machine check exists (F9) |
| Normalised registry diff (`mN` → `mX`, sorted) | only the 200 `cs/algo-*` entries plus the `demos` array line; `loaders.generated.ts` gains exactly 200 lines, all `cs/algo-*` |
| Catalog cross-check | 0 existing CS lessons hidden by the new grouping; all 200 grouped concepts exist in `content/curriculum/cs.json`; `cs.json` change is append-only (the one `-` line is the same name re-encoded as `–`) |
| `fetch` and `curl` to `localhost` against a 127.0.0.1-only listener on this host | both 200 (`/etc/hosts` maps localhost to 127.0.0.1 only; Node 22.22) |
| Build | not run (QA builds separately, per the dispatch) |

## Findings

### Must be met before merge

**F1. The algorithms tests never run automatically.** `tests/algorithms/*.test.mjs` is in no `package.json` script (`package.json:16` verify chain; `:19-30` test scripts), and CI (`.github/workflows/ci.yml:51-55`) runs no unit tests at all, so `verify` is the only place they can run. `test:books` is already wired (`package.json:16`, PR #5 M1), so the pattern exists. Fix (mechanical, platform-engineer): add `"test:algorithms": "node --import ./tests/lifehacks/register.mjs --test tests/algorithms/*.test.mjs"` and put `npm run test:algorithms` in `verify` next to `test:books`. I approve this script addition inside this review; it needs no separate EDD.

**F2. No committed test runs the 200 shipped specs, and a broken spec takes down ten lessons.** The 12 tests use fixtures only (`tests/algorithms/state.test.mjs:151-155`, `manifest.test.mjs:9-13`, `renderer.test.mjs:11`); the real-manifest run exists only as an opt-in tool (`tools/algorithms-200-check.mjs:103-112`). Each topic module runs code at import (`lessonDetails` calls `reveal` and `Object.assign`s hooks, e.g. `src/lib/algorithms/topics/boundary-search-selection.ts:29-43`), and the wrapper runs `cases[0].run()` in render (`src/components/algorithms/AlgorithmState.ts:88`). An exception in either crashes the page, and nothing catches it (no error boundary in `src/components/DemoHost.tsx`). Because ten wrappers share one topic module, one bad edit breaks ten lessons. `src/lib/algorithms/**` is tier 1 by the map (F6), so such an edit gets one diff reader and no engineering review. Fix (mechanical, platform-engineer): add `tests/algorithms/shipped.test.mjs` that calls `checkAlgorithms()` on the real manifest without `allowPartial` and asserts zero errors and zero warnings, and an exact-import assertion per wrapper (the checker's `source.includes` test at `tools/algorithms-200-check.mjs:89` is a substring match; tighten it to the import regex). Needs F1 to run anywhere.

**F3. Integrated verification has not been run on the head that would merge.** Nobody has run `npm run verify` (or check, typecheck, build and `npm run qa`) on `6008cd52` merged with current base. The contract spec includes drafts (`tests/qa/lessons.ts:22-23` skips only `retired`), so QA now walks 1,275 lessons, 200 more than base: QA time and build time grow by about a fifth and nobody has measured either. Requirement: qa-tester runs the integrated `npm run verify` on the final head (after F1/F2), records the summary, build wall time, `.next` output size and QA wall time, with zero unexpected failures. If verify is red for any reason, the PR does not merge.

**F4. The catalog shows all 200 draft lesson titles in production.** No draft lesson is linked or served: the section reads `visibleDemos()` with no options (`src/app/catalog/page.tsx:27`), and `statusVisible` never lists a draft without `includeDrafts` (`src/lib/visibility.ts`, `statusVisible`), which `tests/algorithms/catalog.test.mjs` asserts under `VERCEL_ENV=production`. But every one of the 200 concept names in `content/algorithms-200.json` (and `content/curriculum/cs.json`) is byte-equal to its draft lesson's `title` (script: 200/200; concept id equals slug), and the page renders every concept name regardless of status (`page.tsx:68`), with the copy "200 planned lessons across 20 topics" (`page.tsx:54`) and "Not yet visible" twenty times (`:63`). Listing untaught concepts is existing practice ("not yet taught", `page.tsx:92`; `tests/qa/feed.spec.ts:53-57`), so this is a product decision, not a leak of content or claims. It ships at the next approved deploy whether or not any algorithm lesson is ever promoted, so it cannot wait for promotion. Requirement (cm-cs, with chief-of-staff): record in the PR record that production may show the 200 planned titles and the count copy, or change the section to render only when at least one algorithm lesson is visible (platform-engineer, tier 1, a few lines).

**F5. The PR's engineering record does not cover what shipped.** Written after F1–F4; detail in "The PR's own records". The readiness record is pending, classes the change tier 1, and its engineering read covered 150 of 200 wrappers. This review supersedes it for the merge decision. Requirement (chief-of-staff): add the integration evidence from F3 and the final commit list and revert command to `company/engineering/readiness/2026-10-16-algorithms-200.md`, and correct its tier to 2 with a link to this review. A merged record must not certify tier 1 for a 200-lesson shared engine.

### Before any of these lessons is promoted out of draft (not merge blockers)

**F6 (follow-up, my own). The tier map does not know this engine, or the Books one.** `company/engineering/readiness/paths.json` has tier-2 `shared-engine` rules for `src/components/lifehacks/**` and `src/lib/lifehacks/**` only. `src/components/algorithms/**`, `src/lib/algorithms/**` (200 lessons) and the Books paths (100 lessons, PR #5 F9, still open) default to tier 1. My own pre-code dispatch applied the map literally and called the helpers tier 1; that was the wrong call for an engine 200 lessons import, and this review corrects it. `tools/readiness.mjs`, named as the map's reader, is still absent from this tree. Owner: principal-engineer-ops proposes four rules, principal-engineer accepts (gate file, tier 2). Not a merge blocker: the rules govern future edits, and this review is the tier-2 gate for this one.

**F7. Per-lesson QA and accessibility.** No algorithm meta links a QA, learner or pairwise record (`evidence` empty in 200/200), which `launchGates` enforces at promotion. The graph view gives the SVG one accessible name, the frame caption (`src/components/algorithms/AlgorithmLesson.tsx:40`); node labels and edge weights are not exposed to a screen reader, and the row view has no table semantics (`:54-58`). Owners: qa-tester (phone, desktop, strict fit for every lesson), accessibility reviewer for the stage semantics, platform-engineer for the fix.

**F8. One Run click unlocks the reveal.** `minInteractions={1}` in every wrapper, and the single milestone fires on the first transition to a question-case witness (`AlgorithmLesson.tsx:21`), so "Run example" alone unlocks the reveal; Step, Try another and Reset are optional. The engine is honest about this (it never counts a bare Reset or Try another, `AlgorithmState.ts:115-121`, tested in `state.test.mjs:187-198`). Whether one milestone meets `company/product/demo-standard.md` for 200 lessons is a learning-design call, not an engineering one. Route: learning-designer, before promotion.

**F9. Predict answers are not tied to the computation by any check.** The validator checks that `answer` indexes an option (`tools/algorithms-200-check.mjs:22-23`), not that the option names the computed result. 46 of 200 cannot be compared as strings (table). Fix before promotion: an optional `expect` (or `answerFromResult`) per spec that the shipped-spec test asserts, owner demo-builder with platform-engineer. Fact-checkers should not treat the trace as having verified the answer key.

**F10. Learner-visible typography.** Sampled proofs and questions run words and numbers together ("through20", "12producers", "First=1.33333", "14 mod18") and show unrounded residuals ("-0.00000600729", `algo-secant-root`). Content and design, route cm-cs/demo-builder, phone QA after any change.

### Follow-ups (not gating; owners named)

**F11. Bundle and scale.** `src/demos/loaders.generated.ts` grows from 87,763 to 102,879 bytes raw (+17.2%), on top of PR #5's +11.5%. It is imported by client `src/components/DemoHost.tsx:6`, so the larger map ships to every lesson page. Each lesson chunk carries its whole topic module (all 20 modules total 337 KB of TypeScript source, largest 19.6 KB), including `lessonDetails` and hooks that the client never reads; the `Object.assign` at import keeps them from being tree-shaken. Production never serves the 200 draft pages (`src/app/d/[slug]/page.tsx` static params; `dynamicParams = false`), but the build emits their chunks. Not measured: F3 records build time and size, and no performance claim about this PR is accepted until then. Long term this is the EDD-001/EDD-003 track; a cheap local fix (move `lessonDetails`/hooks to a server- or tool-only module) belongs to platform-engineer when the measurement says it matters.

**F12. Tools row (owning-engineer read).**
- `tools/serve.sh:23` adds `-H 127.0.0.1` to `next start`. Sound and safer: a local server started with `HQ_PUBLIC=1` (the usage example, `serve.sh:4`) no longer listens on every interface. Its own probe (`curl localhost`, `:28`) and Playwright (`playwright.config.ts:29`, `localhost`) still reach it here, and nothing in the repository reaches a serve.sh server through a non-loopback address. Risk: a future host that resolves `localhost` to `::1` only. Unrelated to the PR's purpose; it should have been its own tier-1 change with a changelog line. Accept, and ask tools-lead (owner of serve.sh) to add the changelog line and update the usage comment.
- `tools/algorithms-200-check.mjs` and `tools/materialize-algorithms-200.mjs` are opt-in, read the manifest, and do not touch the gates in `tools/company.mjs`. The materializer refuses to overwrite a lesson directory (`materialize-algorithms-200.mjs:23`) and writes every claim `unverified` with an honest source note (`:62`). Both import a TypeScript loader from `tests/lifehacks/` (`:7` in each); a tool depending on a test helper is a coupling to note, not to fix now. After merge the materializer is a one-shot generator for lessons that already exist; tools-lead decides whether to keep it or delete it once the 200 are stable.

### Verified sound (no action)

- Contract: all 200 wrappers render the kit `Lesson` from `@/kit/Lesson` directly and use kit `Control` (`src/demos/cs/algo-*/Demo.tsx:3-4,10,14-17`), with `predict`, `exploreHint` and `reveal` from the spec. Controls are disabled while `locked`. No contract bypass and no comment-satisfied gate (unlike PR #5 F10).
- State: the transition model is pure and tested (`AlgorithmState.ts:102-122`; `state.test.mjs`). The witness is the question case only, survives Reset and Try another, and the reveal reads only the witness (`AlgorithmLesson.tsx:73-76`). The predict phase shows input only and no trace length (`renderer.test.mjs` tests 1 and 4).
- Safety: all strings render as React text; there is no `dangerouslySetInnerHTML`, eval, fetch, storage, timer or randomness in the engine. Traces are deterministic (the checker runs each case twice) and bounded (2–64 frames, 8×12 grid, 24 nodes, coordinates inside the viewBox).
- Claims: every learner-visible string the checker can enumerate (hook, question, options, hint, both cases' proofs, reveals, every frame text, recall) is a claim, 4,401 in all, all `unverified`, each with an address. One spelling, unlike PR #5 F5.
- Registry: the `index.generated.ts` churn is `mN` renumbering; after normalisation no existing entry changes. `index.generated.ts` stays `server-only` (line 4). `npm run check` confirms the registry matches the metas.
- Catalog: the new section calls `visibleDemos()` once and reuses it for every domain (`page.tsx:27,45`), groups by topic, and removes grouped concepts from the plain CS list without hiding any existing lesson (0 found). The server page imports only the 1,184-line projection, not the lesson modules. Latent hazard, follow-up for platform-engineer: a future CS lesson whose `concept` is one of the 200 grouped concepts but whose slug is not in a topic's `slugs` would be listed nowhere (`page.tsx:59,79`); a line in the shipped-spec test (M2) can assert that no visible CS lesson is dropped.

## Added after reading the PR's records and the community evaluation

**F13. Five lessons have a "Try another" whose final picture is identical to the question case.** The community evaluation (`company/engineering/community/prs/6.md` §4) reports three lessons failing the QA contract with "controls that changed nothing observable" (W-1527). I reran the models and widened it: in **five** lessons `cases[1]`'s final frame is byte-identical to `cases[0]`'s: `algo-dinic-levels`, `algo-pollard-rho-factor`, `algo-topological-uniqueness` (QA fails), and `algo-external-merge` (4 vs 6 frames) and `algo-american-flag-sort` (11 vs 5 frames), which pass QA only because the trace counter changes. The cause is in the engine's checker, not the browser: the "second case" signature (`tools/algorithms-200-check.mjs:53-54`) includes `result`, which the stage never renders, so two cases with different results and the same visible final frame pass. Fix: demo-builder repairs all five (widen W-1527); the shipped-spec test (M2) compares the rendered final frame (caption, rows, nodes, edges, metrics) without `result`. I missed this in F2 before reading the account; the QA run found it.

**F3, measured by the community engineer (testimony, not my measurement):** `next build --webpack` 3 m 29 s wall, 1,275 lesson pages, dist 132 MB without cache; the QA contract on the 200 algorithm lessons alone took 9.5 min (394/400). `test:platform` has two failures caused by this PR: #18 (`tests/platform/registry-split.test.mjs:136`, empty evidence on all 200 metas, W-1525) and #28 (`tests/platform/trust.test.mjs:108`, claim `cs.algo-multiplicative-weights.c12` with text exactly `learner`, which I confirmed at `src/demos/cs/algo-multiplicative-weights/meta.json:104`, W-1524). So verify is red today, and M5 below cannot pass until both are fixed. Those numbers do not replace M5: they are a webpack build and a 200-lesson QA subset, not the integrated `npm run verify`.

## The PR's own records (read after F1–F12)

- **EDD: none, and none was asked for.** The pre-code route (`company/ops/dispatch-requests/2026-10-16-algorithms-200-engineering.md`, "Ruling") was written by this role and classed the helpers tier 1 by the map's default. That ruling was wrong in substance for an engine 200 lessons import (F6). The same record's "Frozen interface" section is a real design: options are thin, but the data contract matches the shipped `src/lib/algorithms/types.ts` exactly, the bounds match the validator, and the rollback is stated. **Ruling:** no retroactive EDD. The design is local, reverts in one commit, changes no kit, registry shape or route, and this review is the tier-2 gate. It is not precedent: the next shared engine gets an EDD before code.
- **Readiness record (`company/engineering/readiness/2026-10-16-algorithms-200.md`):** genuine, honest about its limits, and **does not cover what shipped.** Its own "Capacity" says it read 150 wrappers across 15 topics with 50 lessons and 5 topic modules unbuilt; it says integrated verify, the server lifecycle and independent QA "must be appended before W-1521 closes", and none were. It is tier 1, `risks: none`, and author and self-check are both principal-engineer. A tier-2 readiness record needs principal-engineer-ops's approval, as PR #5 had (`company/engineering/readiness/2026-10-16-books-100-ops-approval.md`).
- **Independence, disclosed:** the route, the diff read, the readiness self-check and this review are all the principal-engineer role. This run has no memory of the earlier ones and read the artifact first, so it is independent of the code but not of the role. That is why M7 asks principal-engineer-ops, not me, to approve readiness.
- **Decision (`company/decisions/2026-10-16-algorithms-200.md`):** a product record. Its route table says engineering "agree: tier-1"; this review supersedes that line for the merge decision.
- **Community evaluation (`company/engineering/community/prs/6.md`):** careful and independent. Its tier-2 classification, its catalog note (§5.4) and its serve.sh note (§5.5) agree with F4, F6 and F12. Its notes 1–6 are all answered here. Its QA run found F13, which my reading did not.

## Decision

**Approve with conditions. Not mergeable at this head.** The engineering is sound and contained. One small engine, a pure transition model with tests, 200 identical thin wrappers that render through the kit `Lesson` directly, every learner-visible string a recorded unverified claim, no dependency, protected-path, config, route or data change, and a one-commit revert. What blocks the merge is evidence and wiring: tests that never run, no test over the shipped specs, five lessons with a dead comparison, a red `test:platform`, no integrated verify, and a public catalog section nobody has accepted.

Before merge (all seven). Board: M1+M2 W-1528, M3 W-1527 + W-1529, M4 W-1524 + W-1525, M5 chief-of-staff (W-1522), M6 W-1530, M7 W-1531; F6 W-1532.

| # | Condition | Owner |
|---|---|---|
| M1 | Add `test:algorithms` to `package.json` scripts and to `verify` next to `test:books` (F1). Approved here; no EDD | platform-engineer |
| M2 | Add `tests/algorithms/shipped.test.mjs`: `checkAlgorithms()` on the real manifest with zero errors and zero warnings, exact wrapper import, and visible final frame of case 1 differs from case 0 (without `result`) (F2, F13); tighten `tools/algorithms-200-check.mjs:53-54,89` to match | platform-engineer |
| M3 | Repair the five lessons with identical final frames (F13): `algo-dinic-levels`, `algo-pollard-rho-factor`, `algo-topological-uniqueness`, `algo-external-merge`, `algo-american-flag-sort` | demo-builder (W-1527, widened) |
| M4 | `test:platform` green: #28 (claim text `learner`) and #18 (evidence strings on 200 metas) | demo-builder (W-1524), qa-tester (W-1525) |
| M5 | Integrated `npm run verify` on the final head after M1–M4, all 1,275 lessons in the contract spec, zero unexpected failures; record the summary, build wall time, output size and QA wall time (F3) | qa-tester, coordinated by chief-of-staff |
| M6 | Catalog section: cm-cs records that production may show the 200 planned titles and the count copy, or platform-engineer renders the section only when at least one algorithm lesson is visible (F4) | cm-cs (decision), platform-engineer (if changed) |
| M7 | Readiness record corrected to tier 2, linked to this review, with the M5 evidence, final commit list and grouped revert; approved by principal-engineer-ops (F5) | chief-of-staff (record), principal-engineer-ops (approval) |

If M1, M2 and M4 touch only `package.json` scripts, `tests/algorithms/`, the checker and lesson metas, I do not need to re-review; M5 is the evidence. M3 changes topic modules in `src/lib/algorithms/`: a diff read by any engineer role is enough, unless it changes `types.ts`, `src/components/algorithms/` or the checker's bounds, which come back to me.

Before publication of any of these lessons (not merge blockers): F7 (per-lesson QA, W-1518; accessibility of the stage, W-1526), F8 (one-milestone reveal, learning-designer), F9 (answer key tied to the computation), F10 (typography), the fact-check (W-1519) and learner sample (W-1520) in batches of at most 30, and `launchGates` as usual.

Before the first deploy that includes this merge: M6 decides what the catalog shows; the accessibility scan of the live section (W-1526) runs on that build. Deploys need the founder's approval as always.

Follow-ups: F6 (`paths.json` shared-engine rules for algorithms and Books; principal-engineer-ops proposes, principal-engineer accepts; `tools/readiness.mjs` still absent), F11 (scale: `lessonDetails` out of client chunks if the measurement says so; EDD-001/EDD-003 track), F12 (`tools/serve.sh`: changelog line and usage comment by tools-lead; decide the materializer's lifetime), and the catalog drop hazard (platform-engineer, can ride on M2).

Objections that travel with this decision:

- *"The route ruled tier 1 by the map, and the map is the rule."* Answered: the map's default is a fallback, and the map itself classes the Life Hacks engine tier 2 for being "used by more than 10 lessons". An engine 200 lessons import is the same case. F6 fixes the map so the next reader does not need this argument.
- *"Retroactive EDD or no merge."* Declined. The frozen contract in the pre-code dispatch is the design, it matches what shipped, and the change reverts in one commit. Asking for a document now would be ceremony without new information. The next shared engine gets an EDD before code.
- *"The catalog section is product, not engineering; leave it out of the merge gate."* Partly accepted: what the map shows is cm-cs's call, and M6 lets them make it in one line. It stays a merge condition because merged code reaches production at the next deploy whatever happens to the lessons, so "before publish" would never catch it.
- *"Binding serve.sh to loopback breaks evaluators on another host."* Answered: nothing in the repository reaches a serve.sh server except through `localhost`, and a local server running HQ with `HQ_PUBLIC=1` should not listen on every interface. If a lane needs remote access, it asks tools-lead for an explicit opt-in, not the old default.

## Kudos (optional)

- @community-engineer: running the QA contract on all 200 before the engineering review found the dead "Try another" that the PR's own checker and my reading both missed (F13).
