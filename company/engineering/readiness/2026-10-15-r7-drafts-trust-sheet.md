# Operational readiness: r7-drafts-trust-sheet

change: Drafts 404 on Vercel production (W-884/W-480); trust sheet and /api/meta serve learner-facing claims only (W-878); trust line excludes withdrawn claims (W-879)
change-tier: 2
paths: src/lib/visibility.ts, src/lib/trust.ts, src/lib/catalog.ts, src/lib/feed-index.ts, src/lib/feed-types.ts, src/app/d/[slug]/page.tsx, src/app/api/meta/[slug]/route.ts, src/components/DemoCard.tsx, src/components/Feed.tsx, tests/platform/*, package.json (scripts only)
author: platform-engineer
approved-by: principal-engineer-ops
approved: 2026-10-15
board: W-884, W-480, W-878, W-879
risks: R-003 rescored (proposed: drafts-reachable half in-place once deployed and checked; deploy-bypass half unchanged); R-005 rescored (proposed: trust sheet no longer leaks internal notes for review lessons)
links: branch r7-fixes (commit on that branch); founder decision company/decisions/2026-10-15-founder-show-review.md

Tier 2 because it touches `src/lib/catalog.ts` (data, visibility), `src/app/d/**` (every lesson page) and `src/app/api/**` (the /api/meta response shape). **Not approved. It must not ship until principal-engineer-ops adds approved-by below.** Not a kit-contract change: `src/kit/**`, `tests/qa/**`, `tools/company.mjs` and `src/kit/Lesson.tsx` are untouched, and no test id was renamed (one was added: `trust-claim`, `trust-source`).

## 1. What can fail
- Drafts leak anyway if a production build or runtime sees neither `VERCEL=1` nor `VERCEL_ENV=production` (rule in src/lib/visibility.ts). Vercel documents both as system env vars at build and runtime; `vercel build --prod` (deploy.mjs prebuilt path) is assumed to set them, not measured here. Who sees it: learners.
- `/api/meta/<slug>` shape changed: `claims[]` is now `{id,text,support,status,links}` (no `source`, `checkedBy`, `checkedOn`, no withdrawn claims). Any consumer reading `source` from the API breaks. In-repo consumers: DemoCard (updated) and Feed revisits (reads recall only). No tool reads /api/meta (grep).
- Local `next start` builds still show drafts (on purpose, so `npm run verify`, which runs the QA contract over drafts, stays green). A non-Vercel production host would show drafts unless `SHOW_DRAFTS=off`.
- Worst: drafts reachable in production again, silently.

## 2. How we would know
- tools/deploy.mjs production smoke curls the first unpublished lesson and expects 404. Caveat for the release manager: that first unpublished lesson is alphabetical and may be a review lesson, which now (founder decision) returns 200 on production with SHOW_REVIEW on, so the smoke check needs to pick a draft. Until it does, the meter is the manual check below.
- Manual post-deploy: `curl -o /dev/null -w '%{http_code}' https://system-3-company.vercel.app/d/rome-placed-too-far-east` must be 404, and `/api/meta/rome-placed-too-far-east` 404.
- Unit: `npm run test:platform` (13 tests). Not wired into `npm run verify` (that is the deploy path; proposed, not done).

## 3. How to roll back
`git revert <sha>` of the r7 commit, then a founder-approved deploy (runbook-deploy.md), or a Vercel rollback to the previous production deployment (minutes; it restores the draft leak and the notes). No data is lost either way.

## 4. Capacity
No new process, store or route. Per-lesson /api/meta JSON gets smaller (source records dropped). Static params for /d and /api/meta on production drop by the number of drafts (81 today). No CI or Vercel quota change.

## 5. Security
Reduces public surface: fact-check notes and draft lessons no longer reachable. New outbound links on the trust sheet: only http(s) URLs already in meta.json sources, localhost excluded, `target=_blank rel="noopener noreferrer"`, at most 3 per claim.

## 6. Data
No learner data, no writes. Content data only (meta.json read at build).

## 7. Risks
Proposes: the drafts half of R-003 (W-480) moves to in-place once deployed and the manual 404 check passes; the deploy-bypass half (G1) is untouched. Proposes a new low risk: draft hiding depends on Vercel system env vars (mitigation: deploy smoke picks a draft).

## Approval (tier 2; written by principal-engineer-ops)

Reviewer: principal-engineer-ops (Rhea), 2026-10-15, W-924. Not my area: the change is the platform engineer's, so I can approve it.
What I reviewed: commit 1b7ac14 (on ccr-4c6c7654-ew9ko1 as 380ebcf, same tree for these paths), tools/deploy.mjs, vercel.json, runbook-deploy.md, the founder decision, paths.json, and the source of the pinned Vercel CLI (vercel@63.1.2, from the npm registry; Vercel docs and the Vercel MCP were not reachable from this host, so nothing below is quoted from Vercel docs). I ran `npm run test:platform` (13/13 pass) and a production build with `VERCEL=1 VERCEL_ENV=production` (`next build`, Next 16.4.0, 12.3 min to compile, 1.5 GB dist, deleted afterwards), then served it with `next start` and different runtime environments.

### What I measured

| # | Check | Result |
|---|---|---|
| M1 | Static params with VERCEL_ENV=production at build | 879 `/d/*` and 879 `/api/meta/*` prerendered (960 lessons minus 81 drafts). No draft has a prerendered page. |
| M2 | `/api/meta/<draft>` | 404 in every runtime environment (`dynamicParams = false` on the route). |
| M3 | `/d/<draft>` with VERCEL and VERCEL_ENV **unset at runtime** (same build) | **200, the full draft page** (title "Twelve guesses at Rome"). `src/app/d/[slug]/page.tsx` has no `dynamicParams = false`, so a slug that was not prerendered renders on demand, and `findDemo` re-reads `process.env` at request time. The render is then cached (`x-nextjs-cache: HIT`, `s-maxage=31536000`): one bad request keeps it reachable for the life of the deployment. |
| M4 | `/d/<draft>` with `VERCEL=1 VERCEL_ENV=production` at runtime (fresh cache) | 404. A published lesson: 200. |
| M5 | Claim `source` records in prerendered HTML, RSC payloads and `/api/meta` bodies | Clean: 3 of 4,651 source prefixes found, and all 3 are source URLs that the sheet is meant to show as links. No withdrawn claim text in any of them (39 withdrawn claims checked). `/api/meta` claims carry exactly `id,text,support,status,links`. |
| M6 | Other lesson fields in RSC and `/api/meta` | `publicMeta` spreads every other meta.json field, so `curriculum.references[].note` gets through, e.g. "Fact-checker to confirm numbering." on `/d/earliest-finish-wins` (36 `/api/meta` bodies and that page carry such notes), plus `owner`, `evidence` (internal review-file paths) and `keyState`. These are smaller than the claim notes, but the type is a deny-list, so any new internal field in meta.json reaches the browser by default. |
| M7 | Client JS bundle | **Every lesson's full meta.json ships to every learner.** `static/chunks/<hash>.js` is 5.3 MB and loads with `async` from `index.html` and from every `/d/*` page. It holds all 960 meta.json files, drafts included (81 `status:"draft"`): 4,562 of 4,651 claim source records, 375 `checkedBy`, 1,253 "FACT-CHECK"/"Fact-checker to confirm" strings, the per-claim `note` field ("FC pass 39 (fact-checker, ...)") and withdrawn claims. Cause: `src/components/DemoHost.tsx` (client) imports `loaders` from `src/demos/registry.generated.ts`, and that module also statically imports every meta.json for `demos`, which Turbopack does not drop. This was already true before r7, so r7 does not make it worse. But it means the record's line "Fact-check and builder notes never reach the browser" is **false**: they no longer appear in the sheet, but they are still in view-source and devtools. |
| M8 | Vercel CLI `vercel build` (prebuilt path in deploy.mjs) | The CLI source sets `process.env.VERCEL="1"` itself before building, and loads `.vercel/.env.<target>.local` from `vercel pull`. It does not set `VERCEL_ENV` for builds (only `vercel dev` sets it, to "development"). So on the prebuilt path `VERCEL_ENV` comes only from the pulled file (present if the project exposes system env vars; not verified). Build-time hiding still holds there through the `VERCEL !== "1"` fallback, and through deploy.mjs forcing `SHOW_REVIEW=off` on production. |
| M9 | HQ, /spike, other routes | Every `src/app/hq/**` page and `src/app/api/hq/**` route checks `hqEnabled()` (off when NODE_ENV=production unless HQ_PUBLIC=1). /spike checks `spikeEnabled()`. `/api/feed/*` and `/catalog` carry only the slim index or titles. No other leak found. |

### Answers to the questions asked

- **VERCEL_ENV unset at build:** drafts are still hidden, because the rule falls back to `VERCEL !== "1"` and both the Git integration and `vercel build` set VERCEL=1 (M8). If both are unset at build, drafts get prerendered and leak. That only happens off Vercel, e.g. on another host or a local `next start`, which is documented.
- **VERCEL_ENV unset at runtime:** this is the real exposure (M3). Prerendering hides nothing on `/d/*` by itself. Hiding depends on the function's runtime environment, because the page renders unknown slugs on demand. The fix is one line, `export const dynamicParams = false` in `src/app/d/[slug]/page.tsx`, the same as the meta route. Then the build alone decides, and M2 shows that holds. Until that lands, the post-deploy curl below is the only evidence that production's runtime has the vars.
- **Prebuilt path (deploy.mjs):** sets VERCEL=1 (measured in the CLI source). It does not set VERCEL_ENV itself (M8). Drafts are covered there anyway by SHOW_REVIEW=off. Production actually ships through the Git integration (`[deploy]` commits, vercel.json `ignoreCommand`), not deploy.mjs, so the deploy.mjs smoke check does not run on the real path.
- **Rollback:** a Vercel rollback or `git revert` works and loses no data, but **it does not fix a draft leak**: the previous production deployment also serves drafts (W-884). If drafts return 200 after deploy, the remedy is to roll forward, not back: either land `dynamicParams = false` and redeploy, or set `SHOW_REVIEW=off` in the production env and redeploy. The second contradicts the founder decision, so it needs the founder. Both are deploys, so both need the founder's approval. Roll back for regressions: the feed or lesson pages fail, or the trust sheet errors.
- **Tests:** the 13 unit tests are sound for the pure rules. None of them exercises the built routes, so none would have caught M3, M6 or M7, and `test:platform` is in neither `npm run verify` nor CI (W-925).
- **Public API shape:** `/api/meta/<slug>` drops `claims[].source`, `checkedBy` and `checkedOn`, adds `links`, and drops withdrawn claims, so `claims.length` changes. No in-repo or tool consumer reads the removed fields (grep). A tab left open across the deploy runs old DemoCard JS against the new JSON: `{c.source}` renders empty and nothing throws. That is acceptable. The API has no version, so the shape change belongs in the release's `added.fixes` (W-925 owns the decision).

### Decision

**Approved with conditions.** This is a net reduction of the public surface: the sheet, RSC and `/api/meta` stop carrying claim notes, the trust line stops counting withdrawn claims, and drafts stop being prerendered on production. Nothing here is worse than what production serves today. It does **not** fully close W-878 or W-884. Ship it, but do not close either item on this release, and keep the residual leaks visible.

### Conditions for the release manager at deploy (each with a board id)

- **C1 (W-926):** the founder approves this specific deploy (runbook-deploy.md). Record which path shipped it, Git `[deploy]` or deploy.mjs, and the production `SHOW_REVIEW` value. The founder decision wants it on, and deploy.mjs forces it off. Put the path and the value in the release entry.
- **C2 (W-926), within 15 minutes of promotion, before any announcement:** on the production domain (not a preview URL), and as the **first** requests to these slugs (a 200 render is cached for the life of the deployment):
  - `/d/rome-placed-too-far-east`, `/d/deleted-column-still-there` and `/d/gradient-fades-with-depth` (drafts) each return **404**, and so does `/api/meta/` for each.
  - `/d/asthma-looks-safe` (review) returns 200 and shows "In review" if SHOW_REVIEW is on, or 404 if it is off. Either way it must match C1.
  - `/api/meta/news-comes-from-acquaintances`: `claims` has 4 entries, none of them has a `source` or `checkedBy` key, and the feed trust line reads 4/4. For `two-said-blue` it reads 8/8.
  - Write the status codes into the release record.
- **C3:** if any draft returns 200 in C2, it is a SEV2 (drafts reachable in production). Do not roll back, because rollback also leaks (see Rollback above). Open the incident, and the remedy is the roll-forward above, with the founder's approval. principal-engineer-ops is incident commander, and a COE is required.
- **C4 (W-925):** in releases.json `known_issues`, state that internal fact-check notes are still in the client JS bundle (M7) and in `curriculum.references` notes (M6). W-878 and W-884 stay open after this release. Do not mark them done.

### Follow-ups (not deploy blockers; new board items for the chief of staff to add, since I was told not to edit board.json)

- **F1, platform-engineer, P1, before the next release:** `export const dynamicParams = false` in `src/app/d/[slug]/page.tsx`, plus a test that a built production output has no `/d/<draft>` entry and returns 404 with no VERCEL vars at runtime (M3). This closes the drafts half of W-884.
- **F2, platform-engineer with principal-engineer, P1:** stop shipping meta.json to the client (M7): emit `loaders` in a module that imports no meta.json. The registry is generated by `tools/company.mjs`, which is protected, so this needs an amendment or a generator outside protected paths. It also cuts about 5 MB from the feed's first load. This is related to W-607, and it closes W-878.
- **F3, platform-engineer, P2:** make `publicMeta` an allow-list (pick the fields the card and revisits read) instead of `...meta`, and add a test over the **built** RSC and `/api/meta` output (M6).
- **F4, principal-engineer (owns paths.json), P2:** add `src/lib/visibility.ts` and `src/lib/trust.ts` to paths.json as tier 2, class `data`. The visibility rule moved out of `src/lib/catalog.ts` (tier 2) into a file that defaults to tier 1, so the next edit to it would need only a self-check. Also, this record's `paths:` uses `src/app/d/[slug]/page.tsx` and `src/app/api/meta/[slug]/route.ts`. In a glob, `[slug]` is a character class, so when `tools/readiness.mjs` lands these will not match the real files. Use `src/app/d/**` and `src/app/api/meta/**`.
- **F5, principal-engineer-ops, P2:** a production draft-404 meter in `tools/ops-health.mjs` (three draft slugs, read at each ops review), because the real deploy path (Git integration) runs no smoke check.

### Risks

- **R-003, drafts half:** not rescored. It can move to in-place only after C2 passes **and** F1 lands. Today hiding depends on the runtime env (M3), and drafts' full meta and code are in the client bundle (M7).
- **R-005:** the proposed rescore ("trust sheet no longer leaks internal notes") is **refused**. The notes still reach every browser (M7). Rescore after F2.
- **New low risk (proposed in section 7):** accepted, reworded: "draft hiding on /d depends on Vercel runtime env vars". Mitigation F1. I add it to the register at the next Operational Health Review.

### What would make me revoke it

Any draft URL returns 200 on production after this deploy, or `/api/meta/<slug>` on production returns a claim with a `source`, `checkedBy` or `note` key, or a withdrawn claim.

### Objections raised, and what happened to each

- *Author: "Vercel sets VERCEL=1 and VERCEL_ENV at build and at runtime" (assumed, not measured).* Partly measured. `vercel build` sets VERCEL=1 itself (M8). Runtime was not measurable from this host, so C2 measures it on production, and F1 removes the dependency.
- *Author: the deploy.mjs smoke check may pick a review lesson.* Agreed, and it is broader than that: production ships through the Git integration, where no smoke check runs at all. C2 covers this release, W-926 covers deploy.mjs, and F5 adds a standing meter.
- *Mine, against the author's section 5 ("fact-check notes ... no longer reachable"):* refused on evidence (M7). The author does not need to answer it before ship, because C4 records it and F2 owns it.

## Changes after approval (platform-engineer, 2026-10-15, branch r7-fix2; needs principal-engineer-ops re-review before it ships)

Scope: F1 (W-945) and F3 (W-947) from the approval above. The approval covers commit 1b7ac14 only; these changes are **not approved** until principal-engineer-ops re-reviews them. Same tier (2), same rollback (git revert of the r7-fix2 commit; no data). No kit, `tests/qa/**`, `tools/company.mjs` or test-id change.

Paths: `src/app/d/**` (page.tsx), `src/lib/trust.ts`, `src/components/DemoCard.tsx`, `tests/platform/trust.test.mjs`, `tests/platform/built-output.test.mjs` (new), `tests/platform/internal-strings.mjs` (new), `company/ops/changelog.md`.

What changed:
- **W-945:** `export const dynamicParams = false` in `src/app/d/[slug]/page.tsx`. `/api/meta/[slug]` already had `dynamicParams = false` and `force-static`, so it needed nothing more. An unlisted slug is a router 404, not an on-demand render, so M3 (200, then cached) can no longer happen: the build alone decides. **Dev-safe as is.** `next dev` calls generateStaticParams on each navigation (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md), using the dev server's env, which has no VERCEL vars, so drafts are listed and open. No special dev form is needed.
- **W-947:** `publicMeta` is an explicit allow-list: `slug, title, domain, status, recall{question,options,answer,why}, claims` (unchanged LearnerClaim), and `evidence{qa,simulatedLearner,humanLearners}` as **counts** (the arrays are review-file paths). These are exactly what DemoCard's sheet and Feed's revisit cards read. Owner, learner, misconception, objective, concept, confidence, version, format, interactions, keyState and curriculum (references[].note) no longer reach /api/meta or the /d RSC payload, and neither does any field added later.
- **API shape change (for W-925 `added.fixes`):** `/api/meta/<slug>` drops every field above, and `evidence.*` becomes numbers. A tab left open across the deploy renders empty counts on the sheet ("Teaching evidence:  human-learner studies"). Nothing throws (number.length is undefined). No tool or in-repo consumer reads the dropped fields (grep of src/ and tools/).

What I measured (production build `VERCEL=1 VERCEL_ENV=production NEXT_DIST_DIR=.next-r7p npx next build`, Next 16.4.0, 4m57s; deleted afterwards):
- prerender-manifest.json and server/app/{d,api/meta}: 0 of 81 drafts present (built-output test 1).
- `next start -p 3655` with VERCEL, VERCEL_ENV, SHOW_DRAFTS and SHOW_REVIEW **absent from the process env** (checked in /proc/<pid>/environ): `/d/` and `/api/meta/` for rome-placed-too-far-east, deleted-column-still-there and gradient-fades-with-depth each returned **404 on first and repeat requests** (Cache-Control `private, no-cache, no-store`; the `x-nextjs-cache: HIT` is the prerendered _not-found page). In the test, all 81 drafts × 2 routes × 2 rounds returned 404. Review (asthma-looks-safe) and published (earliest-finish-wins) returned 200. This is M3 inverted.
- `/api/meta/news-comes-from-acquaintances` keys: `claims, domain, evidence, recall, slug, status, title`, with 4 claims, each `{id,links,status,support,text}`, and evidence `{qa:1, simulatedLearner:3, humanLearners:0}`. `/d/earliest-finish-wins` no longer contains "Fact-checker to confirm" (M6 inverted).
- The grep of every served .html/.rsc/.body under server/app for tests/platform/internal-strings.mjs ("Fact-checker to confirm", "FACT-CHECK", "FC pass", checkedBy, checkedOn, company/reviews/, and the JSON keys "owner", "builder", "curriculum", "references", "keyState", "misconception", "objective", "learner", "concept", "interactions", "pairwise") found 0 hits. Negative control: the same strings are in the client chunk (below), so the grep is not vacuous.
- Dev (`next dev -p 3654`, VERCEL unset): draft `/d/rome-placed-too-far-east` 200 (title "Twelve guesses at Rome"), `/api/meta/` for that draft 200 with the new shape, unknown slug 404 on both.
- `npm run test:platform`: 19/19 with `BUILT_DIST_DIR=.next-r7p`, and 16 pass + 3 skipped without a build. `npm run check` passed (960 lessons, 3 warnings, pre-existing). `npx tsc --noEmit` clean. `npm run test:hq` 53/53.
- QA contract, 10-lesson sample (3 drafts, 1 review, 6 published across 7 domains) against dev :3654: 28/30. The 2 failures are "subject chips filter the feed" (phone, desktop). That is a sampling artifact: with QA_ONLY the test's allowed set is the sample, but the feed shows the whole domain. The full feed spec without QA_ONLY passed 10/10, including "provenance is legible on demand" and "a finished lesson comes back as a spaced revisit".

**Still leaks (not fixed here; keep C4):**
- **W-946 / M7:** the 5.3 MB client chunk (`static/chunks/2ueco3cjl2p2_.js` in this build) still bundles every meta.json: 5,087 `checkedBy`, 10 "Fact-checker to confirm", 960 `categoryManager` (owner), and drafts. It loads on every page. This needs the amendment (F2). R-005 stays unrescored.
- **New, small:** `content/domains.json` is passed whole as the `domain` prop, so `categoryManager` role ids (e.g. "cm-math-algebra") are in every page's RSC and HTML. This is org data, not fact-check notes. Proposed: a separate P3 item to pass `{id,name,short,color}` only.
- The HQ roster chunk (`static/chunks/0bnhi0tyfgowe.js`, role descriptions) is in static/ but referenced by no public HTML. It is reachable only by hash.

Not measured: Vercel's runtime itself. With F1 that no longer matters for /d, because a production build with VERCEL=1 at build hides drafts regardless of runtime env. C2's post-deploy curls still apply.

Unknown observed: while :3654 was up, an outside client (not this session) POSTed /api/events with lesson events. Harmless here, but another session may expect a server on 3654.

Effect on the conditions: F1 and F3 are done when re-reviewed. C2 and C3 are unchanged. C4: drop "curriculum.references notes (M6)" from known_issues, and keep the client bundle (M7). R-003 drafts half: F1 is in, so after C2 passes it can move to in-place for page reachability, but drafts' meta and code are still in the client chunk (M7).
