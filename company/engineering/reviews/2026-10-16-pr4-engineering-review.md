# Engineering Review: 2026-10-16: PR #4 "100 draft history map demos and a regional explorer" (merge gate)

owner: principal-engineer (Kenji) · tier: 2 · board: W-1556 (this review), W-1557 (licence record) · requested by: community-engineer (review matrix, company/engineering/community/README.md: kit, app shell, build and data shapes go to the principal engineer)
head reviewed: `57aef500` on `pr4/pe` = PR head `2c212d0c` (commits `ef7fa79a` + board-merge `2c212d0c`), merged with base `cdee168c` (`5338e535`), then with base `29f77f03` (`5c54c689`), then the community evaluation commit (records only) · worktree: /home/user/system-3-company/.claude/worktrees/pr4-pe

- EDD: **none, and none retroactively** (ruling below) · ADR: none · Amendment: none needed (no protected path touched, verified) · Decision record: **required and missing** (best-practices item 11, bulk data from an uncleared licence): engineering side written as [2026-10-16-history-maps-gpl-data.md](../../decisions/2026-10-16-history-maps-gpl-data.md); the licence acceptance is the founder's
- [x] The problem is real: founder-requested set (`company/decisions/2026-10-16-founder-history-maps-100-pr.md`); one shared stage is better than 100 copies
- [~] Options considered: in the generator README, not in an EDD; the licence options are in the W-1557 record
- [x] Blast radius: 100 new draft lessons, one new public route (`/history-maps`), one `package.json` script; the 1,075 existing lessons change only in their registry index number (measured below)
- [ ] Readiness record: **none** (M5)
- [~] Rollback is one revert of the code (`git revert -m 1 <merge>`, then `npm run registry`, check, typecheck, build). It does **not** undo distribution: the data is already on the public GitHub repository on the PR branch, and a Vercel deployment keeps its static files until that deployment is deleted (W-1557 record)
- [ ] `npm run verify` on the integrated tree: **not run on any PR #4 head** (M4). QA's 200/200 was the contract on the 100 map lessons only, at `5338e535`
- [~] Measurements: payload sizes and chunk sizes yes (below); build wall time, output size and QA time not measured by me
- [ ] Security, privacy, licences: no dependency, network, storage, event or identifier change. **Licence: GPL-3.0 derived data ships in client bundles** (F1, W-1557)

## Method

Artifact before account. I read the code and the generator, ran the checks and wrote F1–F12 before opening the PR's decision record, its build record, the community evaluation (`company/engineering/community/prs/4.md`) and the progress log. Disclosure: listing the board to find free item ids showed me the titles of W-1558–W-1561, which the community engineer filed (accessibility, data shape, cultural route). Those titles overlap F9 and F10 below; I did not read the evaluation itself until the section "Added after reading the PR's records".

Checks I ran at `57aef500` (node_modules symlinked from the main checkout, removed before commit):

| Check | Result |
|---|---|
| `./node_modules/.bin/tsc --noEmit --incremental false` | pass, 90 s wall |
| `npm run test:history-maps` | 3/3 pass, 1.4 s wall |
| `node tools/company.mjs check`; `node tools/memory.mjs check` | pass: 1,175 lessons, 6,318 claims, 99 roles, 3 inherited Life Hacks warnings; memory pass |
| `git diff cdee168c 5338e535 -- package.json` | one script added (`test:history-maps`) and wired into `verify`; **no dependency change**. `d3-geo` and `topojson-client` were already dependencies |
| Changed paths vs `company/constitution/protected-paths.txt` (9 globs), `src/kit/`, `src/components/`, `src/app/d/`, `src/lib/catalog.ts`, `src/lib/visibility.ts`, `next.config.mjs`, `tsconfig.json`, `vercel.json`, `.github/` | none touched |
| `md5sum` of the 100 `Demo.tsx` | one hash: all 100 wrappers are byte-identical |
| Script over all 100 `map.json`: recompute each frame's relation from its `labels`, derive the answer class, compare with `options[answer]`; check pins, titles, unique `featureIndex` | 100/100 agree; all frames pinned to `da7a4b73`; 0 duplicate keys |
| Script over all 100 metas | 100 `draft`; 500 claims, all `unverified`, one id scheme (`history.<slug>.{positions,maps,comparison,limits,recall}`) |
| Normalised registry diff against base `29f77f03` (`mN` → `mX`, sorted) | only the 100 `history/map-*` entries and the `demos` array line; `loaders.generated.ts` gains exactly 100 lines, all `history/map-*` |
| `map.json` sizes | 1,588,697 bytes raw in all (404 KB gzip). Median 5.9 KB, p90 26 KB, max **370,800** (`map-sydney-wellington-1800-1900`, 99.8 KB gzip), then 198,505 (`map-cusco-quito-1492-1530`) |
| Built client chunks (an existing webpack build of `57aef500` in `.claude/worktrees/pr4-a11y/.next-a11y`, not built by me) | 100 chunks carry map data, 2,391,608 bytes raw; the 11.1 MB `static/chunks` total is ~22% map chunks. Each of the 100 also contains `HistoryMapStage` and kit `Lesson` code. The webpack runtime (`webpack-*.js`, loaded on every page) maps every chunk id to its hash, so the files are addressable. No chunk contains the GPL text |
| Probe: projection extent per lesson | **1 lesson crosses the antimeridian** (F3) |
| Build | not run (per the dispatch; QA passed 200/200 at `5338e535`) |

## Findings

### Must be met before merge

**F1. Merging ships GPL-3.0-derived data to production at the next approved deploy, and no decision record covers it.** Each `map.json` is the clipped, projected, rounded geometry and the NAME/ABBREVN labels of `aourednik/historical-basemaps` at `da7a4b73` (`tools/history-maps/generate.mjs:24-31,90-104`; licence copied to `src/lib/history-maps/DATA-LICENSE.txt`, GPL-3.0). Drafts are hidden from listing and routing in production (`src/lib/visibility.ts:21-26`; `src/app/d/[slug]/page.tsx:13-17`), but **not from the bundle**: `src/demos/loaders.generated.ts` has a static `import()` for every lesson whatever its status, and it is imported by client `src/components/DemoHost.tsx:6`, so every build emits the 100 data chunks as public static files (measured above). Best-practices item 11 (`company/engineering/best-practices.md:15-20`) says bulk data from a source whose licence we have not cleared needs a decision record. Requirement: the founder decides W-1557. I wrote the engineering side (`company/decisions/2026-10-16-history-maps-gpl-data.md`): what ships and where, the obligations as engineering mechanisms, and the alternatives. **Until the founder decides, the PR does not merge.** This is the only blocker that is not mechanical.

**F2. No committed test checks the 100 shipped payloads against their own answers.** The only payload test (`tests/history-maps/geometry.test.mjs:28-52`) checks shape, hashes and bounds of the dots. The generator's byte-for-byte check needs the upstream checkout (`generate.mjs:19,133`), so it cannot run in `verify` or CI, and `src/demos/**` is tier 0 by the path map, so a hand edit to a `map.json` gets no review. I verified answers and relations myself (table). Fix (mechanical, platform-engineer), in `tests/history-maps/`: for each lesson recompute each frame's relation from `labels` and assert `options[answer]` names the derived class; assert both projected dots are at least 2×radius+4 apart in the viewBox; assert every `extent` longitude is within [-180, 180]; assert a per-file size budget (I suggest 64 KB raw, which today four lessons exceed: Sydney/Wellington 371 KB, Cusco/Quito 199 KB, Muscat/Zanzibar 81 KB, Taipei/Beijing 72 KB. The budget forces F3 and a look at the other three); assert every `Demo.tsx` hash equals the template; and assert that under `VERCEL_ENV=production` no catalog slug passes `statusVisible`, so `/history-maps` is a 404 there (F6). `package.json` script wiring is already done and I approve it inside this review.

**F3. The generator mishandles the antimeridian: one lesson renders a near-world map with the two dots almost touching.** For Sydney/Wellington the extent is longitude 143.5 to **182.7** (`generate.mjs:83-85` does not wrap). Projected, the width is negative (-5.6 rad), so the scale at `:88` fits a wrapped, nearly global width. Result: the dots sit 26.7 px apart (radius 9 each, `HistoryMapStage.tsx:49`, so an 8.7 px gap), the clip window holds 599 polygons (595 of them "other"), and the file is 371 KB, 23% of all map data. QA cannot see this: the contract presses controls; it does not judge the picture. Fix (platform-engineer, regenerate with the pinned checkout): centre the projection by rotation (`geoMercator().rotate([-mid[0], 0])` with the centre at `[0, mid[1]]`), or compute the midpoint on the sphere. Then `generate.mjs` (check mode) should show that only this lesson's files change. If any other lesson changes, it comes back to me.

**F4. Integrated verification has not been run on the head that would merge.** QA's 200/200 was at `5338e535`. Base `29f77f03`, merged since, changes `src/components/books/BookIdeaLesson.tsx`, `src/kit/knots/*` and two history metas; F2 and F3 change tests and data. The contract spec walks every non-retired lesson (`tests/qa/lessons.ts:22`), so QA now covers 1,175 lessons. Requirement: qa-tester runs the integrated `npm run verify` on the final head after F2/F3 and records the summary, build wall time, `.next` output size and QA wall time, with zero unexpected failures. If verify is red for any reason, the PR does not merge.

**F5. No readiness record.** A tier-2 change needs one, approved by principal-engineer-ops (EDD-007). Requirement (chief-of-staff or community-engineer writes; principal-engineer-ops approves): what ships (the F1 facts), the F4 evidence, the final commit list and the revert command. The revert must state that it does not withdraw a deployment that has already happened.

### Before any of these lessons leaves draft (not merge blockers)

`review` counts as leaving draft here: `review` lessons are visible in production (`src/lib/visibility.ts:30-32`, founder decision `2026-10-15-founder-show-review.md`).

**F6. `/history-maps` is a 404 in production today, and becomes a public "draft" page the moment one case is in review.** The page is a server component that filters `tools/history-maps/catalog.json` through `visibleDemos({ includeDrafts: true })` and calls `notFound()` when nothing remains (`src/app/history-maps/page.tsx:17-19`). On a Vercel production build `draftsVisible` is false (`visibility.ts:22`), so every case is filtered, and the static page is the 404. It is also a 404 on Vercel previews unless `SHOW_DRAFTS=on`. It exposes nothing in production today: the catalog JSON (titles, years, regions, no geometry) stays in the server bundle, and nothing links to the route. But one case in `review` or `published` makes the page render in production with hard-coded copy: "DRAFT PRACTICE SET" (`:23`) and "This practice set awaits independent content and cultural review" (`:41`), whatever the lessons' state. It also lists catalog titles rather than registry titles (`:4,37`), so a renamed lesson will show its old name. Requirement before the first case leaves draft: cm-history (with head-of-product) decides what the index says in production, and platform-engineer derives its copy and titles from the registry. Also: app code imports from `tools/` (`:4`). Move the catalog to `src/lib/history-maps/` when it is next touched.

**F7. Learner-visible labels that no claim lists.** Every polygon carries an SVG `<title>` with its year and NAME label (`HistoryMapStage.tsx:44`), shown on hover. 1,689 of the 1,971 rendered polygons are non-focus ("other") features. The `maps` claim lists only the labels matched at the two dots (`generate.mjs:123`), so hundreds of labels a learner can read on desktop are in no claim's text. Route: cm-history decides. Either drop titles on "other" shapes (platform-engineer, one line; inside `role="img"` they are not read by screen readers anyway, and the DOM gets smaller), or the `maps` claim names them and the fact-checker covers them.

**F8. Five meta fields outside the data contract.** `reviewRoute`, `careLine`, `productionSet`, `reviewRequirements` and `internalNotes` appear in all 100 metas, in no other lesson, and are not in `DemoMeta` (`src/kit/types.ts`). No gate reads them. The publish gate that actually holds these lessons is `company/ops/publish-holds.json` (100 holds, read by `tools/publish-ready.mjs:99`), which is sound. Route: cm-history with W-1561. Use the W-626 `reviewRoute` shape or drop the fields, through the generator. Same class of issue as PR #5 F5.

**F9. Accessibility.** The active mode button is `disabled` (`Demo.tsx:19`), so pressing it drops keyboard focus to the body: the Books B1 pattern (W-1517). Fills distinguish A, B and other by colour only (`HistoryMapStage.tsx:8`). Route: accessibility-reviewer (W-1560) and platform-engineer, through the generator template.

**F10. The generator's `--write` overwrites review evidence.** `generate.mjs:128,132` rewrites every `meta.json` wholesale, including `evidence` and claim statuses. The README warns about this (`tools/history-maps/README.md`, "Use `--write` only when…"). A warning is not a guard. Fix before the first lesson gets evidence (platform-engineer, a few lines): refuse `--write` when any target meta has evidence or a non-`unverified` claim, unless the slugs are named explicitly. Then the F3 regeneration cannot wipe anything.

### Follow-ups (not gating; owners named)

**F11. Bundle and scale.** `loaders.generated.ts` grows from 87,763 to 97,299 bytes raw (+10.9%), on top of PR #5 (+11.5%) and, when it lands, PR #6 (+17.2%). It ships to every lesson page. The data chunks are lazy: a learner downloads only the lesson they open. The median lesson's data is 6 KB, but Sydney/Wellington costs 100 KB gzip plus 599 SVG paths until F3. Most map bytes are non-focus "other" polygons (1,689 of 1,971 shapes). If W-1557 keeps the geometry, dropping or simplifying "other" shapes shrinks both the payload and the licensed surface. The structural fix, keeping draft lessons out of production bundles, is the EDD-001/EDD-003 track and needs an amendment because the registry generator lives in `tools/company.mjs`. It would also settle F1's bundling side for every future draft. Not measured: build time and QA time (F4).

**F12. The tier map does not know this engine.** `src/lib/history-maps/**` and `tools/history-maps/**` default to tier 1 (`company/engineering/readiness/paths.json`), although 100 lessons import the stage and the generator rewrites 300 files. Owner: principal-engineer-ops proposes a `shared-engine` rule for both, I accept (gate file, tier 2), together with the Books and algorithms rules already owed (PR #5 F9, PR #6 F6). `tools/readiness.mjs` is still absent from this tree.

### Verified sound (no action)

- Contract: all 100 wrappers render the kit `Lesson` from `@/kit/Lesson` directly, use kit `Control` and `Milestones` with three names and `minInteractions={3}` (`Demo.tsx:3-5,14-21`; the kit's own rule, `src/kit/milestones.tsx:3-5`). Controls are disabled while `locked`. The stage shows only the public-domain coast and the dots until a prediction is committed (`HistoryMapStage.tsx:26-28,52`). There is no contract bypass, and nothing satisfies a gate with a comment.
- State: `useHistoryMapState` marks a snapshot seen only when visited, never clears it, and the trace survives switching (`HistoryMapStage.tsx:10-17,57-59`). The reveal is static text, but it is only reachable after all three modes are visited, so it never describes a snapshot the learner did not see.
- Answers: derived in the generator from sorted, de-duplicated NAME sets with exact equality (`generate.mjs:44,92-106`); options are rotated by index so position is not a cue (`:108-109`). 100/100 agree with their own data (my script).
- Safety: all strings render as React text. There is no `dangerouslySetInnerHTML`, eval, fetch, storage, timer or randomness. SVG `d` strings come from d3 with one decimal (`:89`), and the test rejects `NaN`.
- Visibility: the 100 lessons are `draft`, held in `publish-holds.json`, not listed or routable in production. The new route is server-rendered and imports no lesson module.
- Generator hygiene: refuses any checkout but the pinned commit (`:19`), checks file SHA-256 pins (`:28,35,40`), check mode is the default (`:15,133`). Ring normalisation is tested (`geometry.test.mjs:7-26`).
- `test:history-maps` in `verify`: correct, node-only, 1.4 s. CI (`.github/workflows/ci.yml`) runs no unit tests, as for Books and algorithms, so `verify` is where it runs.

## Ruling: no retroactive EDD

The engine is 66 lines plus a 29-line type, used through the kit contract, and removable by one revert. Its design is written down where the next engineer will look: `tools/history-maps/README.md` and the generator. The parts that are expensive to reverse are not code. One is the data licence: a decision record (W-1557) covers it, and an EDD would add nothing. The other is the public route: 43 lines, a 404 in production, reviewed here (F6). An EDD written now would be ceremony. The PR #6 precedent ("the next shared engine gets an EDD before code") binds engines the company commissions. This PR came in as an external PR, so this review is its tier-2 gate. If the history-maps engine is extended (new stage modes, a second data source, anything that changes `types.ts`), that change needs an EDD first.

## Added after reading the PR's records and the community evaluation

Written after F1–F12. Records read: `company/engineering/community/prs/4.md`, `company/decisions/2026-10-16-founder-history-maps-100-pr.md`, `company/reviews/history-maps-100/build.md`.

- **Community evaluation:** careful and independent. Its byte-for-byte reproduction of all 300 generated files from the pinned upstream (§1) is the provenance evidence the W-1557 record rests on. I could not reproduce it: this session has no access to the upstream repository. Its reason for making the licence a merge gate (drafts are built into every production build) is the same as F1, reached independently. Its notes in §5 are answered as follows. Note 1 (route 404 on a production build): confirmed from the code in F6, and M2 makes it a test rather than a manual check. Note 2: F9 and W-1560. Note 3 (source labels shown verbatim): content for stage A (W-1558), not engineering. Note 4: F8 and W-1561. Note 5: F10, now a condition under M3. Note 6: the EDD ruling above and M5.
- **One correction to the community record.** §1 says "The repo is `private: true` with no licence of its own." `private: true` is the `package.json` flag that stops npm publishing. The GitHub repository itself is **public** (`gh api repos/hanialshater/system-3-company` → `"private": false, "visibility": "public", "license": null`), and the PR branch `feat/history-maps-100` is in that repository. So the derived data is already publicly hosted. The W-1557 record states this, because it changes what "not yet distributed" can mean.
- **Measurements, testimony:** the community engineer's build at `5338e535` took 2 m 23 s, with dist 566 MB and `static/chunks` 37 MB. My 22% share was measured on a different build (webpack, 11.1 MB of chunks); against 37 MB the 2.39 MB of map chunks would be about 6.5%. Neither number is a performance claim. M4 records the build of the final head. Their QA ran the contract on the 100 map lessons only (`QA_ONLY`), so the full 1,175-lesson contract has not run on any PR #4 head. Their point that base `29f77f03` changed nothing the map lessons load is correct and accepted. M4 stands because of M2/M3 and because no full verify exists.
- **Build record:** consistent with the code on the route (404 when no case is visible), the wrappers and the generator. Its browser audit (`tools/history-maps/audit.mjs`) checks word counts, overflow, font size and trace retention. It does not check dot separation or the projection, which is why it passed F3. Its full `verify` stopped on W-1337 C2. The community engineer reports `test:dispatch` passing on this host, so M4 is expected to run it; if it is red, it blocks.
- **Founder intake record:** a product route with no licence line. The records did not raise F3 (antimeridian) or F7 (hover labels outside claims); both are new here.
- **Independence, disclosed:** no earlier engineering record exists for this PR, so this review is the first and only engineering read. The board-title exposure is disclosed under Method.

## Decision

**Approve the engineering with conditions. Not mergeable at this head, and not mergeable at all until the founder decides W-1557.** The code is small, contained and goes through the kit contract. The 100 wrappers are identical, every answer agrees with its data, and every learner-visible lesson string except the hover titles (F7) is an unverified claim. There is no dependency, protected-path, config or contract change. What blocks the merge: the data licence, one generator bug, missing payload tests, no integrated verify, and no readiness record.

Before merge (all five). Board: M1 W-1562 (founder), M2+M3 W-1563, M4 W-1564, M5 W-1565; F6+F7 W-1566; F12 W-1567.

| # | Condition | Owner |
|---|---|---|
| M1 | Founder decides W-1557 (accept the GPL-3.0 route with its engineering conditions, or one of the alternatives) in `company/decisions/2026-10-16-history-maps-gpl-data.md`. If the decision is "accept", the record's conditions A1–A4 are met before merge | founder (decision); platform-engineer (A1–A4) |
| M2 | Payload test in `tests/history-maps/` (F2): relation and answer from labels, dot separation, extent within ±180°, per-file size budget, wrapper hash, `/history-maps` empty under `VERCEL_ENV=production` | platform-engineer |
| M3 | Fix the antimeridian extent in `generate.mjs` and regenerate `map-sydney-wellington-1800-1900` only (F3); F10's `--write` guard first | platform-engineer |
| M4 | Integrated `npm run verify` on the final head after M2/M3, all lessons in the contract spec, zero unexpected failures; record summary, build wall time, output size, QA wall time (F4) | qa-tester, coordinated by chief-of-staff |
| M5 | Readiness record (tier 2): what ships, the M4 evidence, commit list, revert command and its limit; approved by principal-engineer-ops (F5) | chief-of-staff (record), principal-engineer-ops (approval) |

If M2 and M3 touch only `tests/history-maps/`, `tools/history-maps/` and the one lesson's files, I do not need to re-review; M4 is the evidence. Any change to `src/lib/history-maps/`, `src/app/history-maps/` or more than that one lesson's data comes back to me for a diff read.

Before any lesson leaves draft (including to `review`): F6 (the index's production copy and titles), F7 (hover labels), F8 (meta fields, W-1561), F9 (accessibility, W-1560, W-1517 pattern), F10 if not done under M3, and the existing route: cm-history scope (W-1551), research provenance (W-1559), cultural stage A/B (W-1558), fact-check and learner review (W-1552), the History Domain Launch Review, and the 100 publish holds.

Follow-ups: F11 (draft lessons out of production bundles; EDD-001/EDD-003 track, amendment needed), F12 (tier-map rules, principal-engineer-ops proposes).

Objections that travel with this decision:

- *"Drafts are invisible in production, so nothing ships."* Rejected. Listing and routing are gated; bundling is not. The 100 data chunks are public static files in every build, addressable from the webpack runtime on every page (measured above).
- *"The data is already public on GitHub in the PR branch, so merging changes nothing."* Partly accepted. The repository is public (`gh api repos/hanialshater/system-3-company`: `visibility: public`, no licence), so the derived data is already distributed there, and that is a fact the founder needs (W-1557 record). Merging adds a second channel, the production web app, where the files ship without the licence text. That is the channel this gate controls.
- *"Retroactive EDD or no merge."* Declined. Ruling above.
- *"A 404 route needs no review."* Answered: it is a 404 only while every case is a draft, and one status change turns it into a production page with draft copy (F6). That is a before-publish condition, not a merge blocker.
- *"QA passed 200/200, so verification is done."* Answered: on an older base, before M2/M3, and the contract does not judge the picture (F3 passed it). M4 is the evidence that counts.

## Kudos (optional)

- @community-engineer: reproducing all 300 generated files byte for byte from the pinned upstream turned the licence question into a question about facts, not guesses, and the intake named the bundling reason for gating at merge before I got there.
