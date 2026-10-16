# Engineering Review: 2026-10-15: AMD-001 (c2)+R1 applying commit, ordinary half (registry split, A1 / W-946)

owner: principal-engineer (Kenji) · tier: 2 · author: platform-engineer · reviewed: branch `amd001-c2`, commit `e8a6910` on `d20a39a`

- EDD / design: [2026-10-15-w946-loaders-design.md](../notes/2026-10-15-w946-loaders-design.md) (my own design, so I am an interested reviewer: the evaluation steward audits the applying commit after it lands) · ADR: none (cheap to reverse) · Amendment: AMD-001 "(c2) ratification packet, with rider R1", signed by the founder 2026-10-15
- Readiness: [2026-10-15-amd001-c2-split.md](../readiness/2026-10-15-amd001-c2-split.md) (approval by principal-engineer-ops is still blank)

- [x] The problem is real and measured (W-946: 5.5 MB registry chunk with fact-check notes on every page; base build in the readiness record)
- [x] At least two options were considered, including doing nothing (design note section 2 and 4, paths 1 to 3)
- [x] Blast radius: every lesson's loading path (`DemoHost`), `/`, `/d/<slug>`, `/catalog`, `/api/meta`, `/api/feed`; no role or lesson content changes
- [ ] Readiness record approved by principal-engineer-ops: **not yet** (next step, after this review)
- [x] Rollback is one revert of the applying commit, under `S3_AMENDMENT=AMD-001` (readiness section 3)
- [ ] `npm run verify` passed on the integrated tree: **not yet**. Full QA over all lessons has not run on the applied tree (readiness record says so). Condition C3 below
- [x] Measurements committed before implementation (PE build E, re-estimate note) and checked after (readiness table, within 2 percent)
- [x] Security, privacy and licenses: no new dependency (`server-only` is Next's compiler alias, `node_modules/server-only` does not exist), no route, no data

## What I checked myself (scratch copy of `e8a6910` with `apply-c2-r1.mjs <copy> rider`, deleted afterwards)

- The script's output for `tools/company.mjs` is byte-identical to `git apply` of `tools-company-mjs.c2-r1.diff` on `d20a39a`'s `company.mjs`.
- `node tools/company.mjs registry`: "up to date", so the committed `index.generated.ts` and `loaders.generated.ts` are what the generator emits.
- `check`: `960 lessons, 5180 claims, 99 roles, 1 warning(s)` on the applied copy and on `d20a39a`. They are identical.
- `side-by-side.sh <applied> post`: 11/11 PASS (S4, T1 to T8 caught, T9 the known miss, R restored).
- `tsc --noEmit`: clean (75 s wall).
- Suites: test:platform 22 pass / 4 skipped (no build), test:kit 97, test:hq 59 (3 skipped), test:lifehacks 64, test:publish 8, test:deploy 17. 0 failures.
- My own planted violations against `registry-split.test.mjs`: a client `Feed.tsx` value-importing a new barrel that re-exports `feed-index` is caught, with the chain printed (`Feed.tsx -> barrel.ts -> feed-index.ts -> catalog.ts -> index.generated.ts`). A server lib importing `loaders.generated` is caught. After removal: 6/6 pass.
- I did not build. The bundle figures are the platform engineer's measurement, and they agree with my build E within 2 percent. A second build would not change the decision.

## Findings (problems, not fixes)

**F1. `server-only` in `catalog.ts`: safe for every importer.** The value importers are `src/app/page.tsx`, `src/app/d/[slug]/page.tsx`, `src/app/catalog/page.tsx`, `src/app/api/meta/[slug]/route.ts` and `src/lib/feed-index.ts`. `feed-index` in turn is imported by those two pages and by `src/app/api/feed/[filter]/[page]/route.ts`. None of them is `"use client"`, and there is no middleware or edge runtime. Client components touch these modules only through `import type` (`Feed.tsx` reads `@/lib/feed-types` and `@/lib/trust`, not `catalog`), and type imports are erased. No Node script or test executes `catalog.ts`: `visibility.test.mjs` reads it as text, so the throwing `server-only/index.js` is never run outside Next. Next resolves `server-only` to `empty` in the server graph and to the throwing module in the client graph (`next/dist/build/create-compiler-aliases.js`; types come from `next/types/global.d.ts`), so a client importer fails `next build`, which is loud and runs in CI. Residual risk: a Next upgrade could drop the internal alias. Then the build fails, which is a safe failure, and the fix is a decision record to add the `server-only` package.

**F2. O2 guard gap: the CI-enforced half covers `catalog.ts` but not `index.generated.ts`.** CI runs `build` but not `test:platform` (readiness section 2). So on CI, a client module importing `catalog` fails the build, but a new client module importing `@/demos/index.generated` directly passes CI. Only the advisory import scan catches it, and that is the regression W-946 was. One generated line closes this: the generator emits `import "server-only";` in `index.generated.ts`. I tested it in scratch. Invariants 1 to 6 accept it (it is not an `import()`, a `meta.json` or a generated file), and `check` passes with 960 / 5180. `side-by-side.sh post` is 11/11 and the split test is 6/6. It costs one line in `tools/registry.mjs`. Output is then no longer byte-identical to `registry.split.reference.mjs`, but that file is a reference shape, not law.

**F3. O2, the static/chunks test: accept the /hq exclusion and the field-name ratchet, with one assertion that keeps the exemption honest.** The exemption is safe today for one reason: every meta.json also carries a string that must have 0 hits. I checked: all 960 meta.json files contain at least one of `checkedBy`, `checkedOn`, `Fact-checker to confirm`, `FACT-CHECK`, `FC pass`, `company/reviews/`. These strings are unquoted, so the result does not depend on how the bundler serialises JSON. So a meta.json in any learner chunk still fails the zero-tolerance half, and the 2-chunk ratchet on `"owner"`/`"concept"`/`"objective"`/`"misconception"` only governs the Life Hacks specs and the label. The /hq exclusion is narrow: a chunk is skipped only if the /hq manifests reference it and no other manifest does, and the test prints the count. The weakness is that the property is not written down. If the meta schema stops carrying claim fields (for example, a lesson with no claims, or `checkedBy` renamed), the exempted names would become the only signal for that meta, and the ratchet would hide it. The test should assert the property it relies on.

**F4. Minor, no change needed.** `verify` places `test:platform` before `check`, and the split tests read committed generated files, so a fresh clone works. `qa-changed.mjs`'s `GENERATED` regex is correct (one level under `src/demos`). The import-scan regex handles `export * from`, bare imports, `import()` and `import { type X, y }` (kept as a value import). It does not cover `require()`, which `src/` does not use.

**F5. Prediction (2) in the packet is false as written** (the /hq org-role chunk carries `checkedBy`). The readiness record already says so. The steward should restate it before the post-deploy audit, as "every learner-reachable chunk". This is not a code problem.

## Decision

**Approve with changes.** C1 and C2 go into the ordinary half before the applying commit. They are small, and they need no re-review from me: whoever makes the applying commit runs the checks listed below and pastes the results in the commit message or the readiness record.

- **C1 (F2, required).** `tools/registry.mjs` emits `import "server-only";` in `src/demos/index.generated.ts`, right after the header comment. Regenerate in the applied tree. `registry-split.test.mjs` test 4 also asserts that `index.generated.ts` imports `"server-only"`. Check: `check` gives the same counts, `side-by-side.sh post` is 11/11, and test:platform is green.
- **C2 (F3, required).** `built-output.test.mjs` (or `registry-split.test.mjs`, which does not need a build) asserts that every `src/demos/**/meta.json` contains at least one `INTERNAL_STRINGS` entry outside `LESSON_CODE_FIELDS`. The failure message must say why: the field-name ratchet is only safe while this holds. About 8 lines.
- **C3 (required before merge, already in the readiness record).** Run full `npm run verify` on the integrated tree (applied diff plus C1 and C2), with the QA contract over all lessons, and paste the summary into the readiness record.
- The 2-chunk ratchet and the /hq-only exclusion are **accepted as written** (O2 decision). The tighter options are moving the Life Hacks specs out of client code or renaming the label. They are not platform's call, and they do not protect meta.json any further once C2 holds.

Objections that travel with it:
- **O2 (steward): stays open with its trigger.** C1 makes the most likely regression (a client importing the index directly) fail CI's build. The remaining advisory parts are "only DemoHost imports loaders" and "no server module imports loaders". A violation there costs bundle size, not a leak. The re-open trigger is unchanged: any internal string in a production client chunk, or either guard weakened without engineering review.
- **O5 (mine): unchanged.** Draft lesson code is still fetchable through `loaders`, so it goes in the release's `known_issues` (W-884).
- **Interested reviewer:** this is my own design, and I drafted R1. Independence comes from the steward's audit of the applying commit (packet O3 mitigation 2), not from this review.
- **New, routed:** "/hq client chunks are fetchable on production". principal-engineer-ops decides whether it is a register entry (readiness section 7). Whether Life Hacks `misconception`/`objective` spec text belongs in the browser is a question for the Life Hacks resource-template owner, not engineering.

Next: platform-engineer makes C1 and C2 on `amd001-c2`. principal-engineer-ops approves the readiness record. The chief of staff makes the single applying commit under `S3_AMENDMENT=AMD-001` with C3's verify summary. The evaluation steward audits it. Any deploy needs the founder's approval separately.

## Kudos (optional)
- @platform-engineer: the readiness record said where its own guard was narrower than the design and asked for a decision instead of burying it, and it ran the guards against the base build to show they detect the old shape.
