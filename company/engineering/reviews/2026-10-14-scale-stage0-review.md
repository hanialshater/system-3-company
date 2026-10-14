# Engineering Review: 2026-10-14: EDD-003 stage 0 / EDD-001 options 2+3 (branch `scale-stage0`)

owner: principal-engineer · tier: 2 · board: branch W-477 (renumbered at merge, see "Merge plan") · attendees (through records): platform-engineer (author), evaluation-steward (QA contract, as reader)

- Commits: 7457c54 (feed), 6b39620 (`tools/qa-changed.mjs`), fbeec94 (note, board, handoff) on top of cc37658
- EDD: [EDD-001](../edd/EDD-001-feed-at-500-lessons.md) options 2 and 3, [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) stage 0 · Note: [2026-10-14 implementation note](../notes/2026-10-14-edd-003-stage0-feed-and-qa-changed.md) · ADR: none needed (one revert) · Amendment: none (no protected path touched; I checked the diff against `company/constitution/protected-paths.txt`)
- [x] The problem is real and measured (W-076; `/` HTML 5,836,934 B before, exact byte counts)
- [x] At least two options were considered, including doing nothing (EDD-001 table)
- [x] Blast radius: `/` and every `/d/<slug>` card (DemoCard is shell), the trust sheet, revisit cards, two new static route families (`/api/feed/<filter>/<page>`, 64 files; `/api/meta/<slug>`, 879 files). No lesson code changes. `qa-changed` is standalone.
- [x] Rollback is one revert of 7457c54
- [ ] `npm run verify` on the integrated tree: **not yet**. I did a trial merge with main (`fad1b03`) in a scratch worktree: `tsc --noEmit` passes, and `npm run check` fails only on duplicate board IDs W-477, W-478 and W-479. The branch-build QA (contract 60/60 on a 30-lesson sample, feed spec 10/10) is a sample, not proof. `qa-changed` itself says this branch touches all 879 lessons.
- [~] Measurements: before and after are in the same note, taken on the same machine (not committed before the implementation). The byte counts are exact. The phone timings are directional (load average 25 to 40). I accept the byte numbers. I did not rebuild (a build takes about 20 minutes, and other agents were building).
- [x] Security, privacy, licenses: no dependency or event change. `/api/meta/<slug>` serves full metas, drafts included. That is no new exposure today: before this branch, the same metas shipped in the client chunk and `/d/<draft>` was already generated. See finding 8 for what changes once option 4 lands.

How I reviewed: I read the full diff of `src/` and `tools/qa-changed.mjs`, `tests/qa/feed.spec.ts` and `tests/qa/lessons.ts` (read only), `/catalog`, `next.config.mjs`, `vercel.json`, and Next 16.4.0's `server/lib/cache-control.js`. I trial-merged with main in a scratch worktree (since removed). I read the author's measurements after I had read the code.

## Findings (problems, not fixes)

### 1. Blocker: a page fetch that fails retries in a tight loop
In `Feed.tsx`, `load()` sets `loading: true`. On failure, `.catch` sets `loading: false` and leaves `next` unchanged. The prefetch effect depends on `list.loading`, so it fires again at once: `next !== null`, not loading, and still within 8 of the end. That calls `load()` again. There is no backoff and no stop.
- Offline: `fetch` rejects immediately, so the loop runs at render speed.
- A 404 from version skew (finding 4) or a 5xx: the loop hammers the CDN.

The chip path has the same bug. `chooseFilter` seeds `{ next: 0 }`, so a failed subject page 0 loops, and the learner sees "Loading more lessons…" for ever with no error. This is user-visible (battery, data) and is a request storm against a free-plan CDN. **Must be fixed before merge.** Acceptable fix: after a failure, stop auto-retrying for that list (a `failed` flag), show "Couldn't load more. Tap to retry" in the sentinel slot, and retry only on tap. A bounded backoff would also do.

### 2. Trust sheet: correct, but the path learners use is not in the contract
- Behaviour, read in the code:
  - The fetch runs on open.
  - The live flag guards the result after close.
  - Reopening after a failure resets the error and fetches again, so "Close and try again" is true.
  - The `(verified/total)` counts come from the same build's index, so they always match the sheet from the same deploy.
  - On `/d/<slug>`, `full` is passed, so there is no fetch.
- Gap: `feed.spec.ts` "provenance is legible on demand" opens the trust sheet on `/d/<slug>`, which never fetches. **The contract no longer covers the trust sheet that feed learners open.** Only the author's scratch spec ran it (6/6).
- Minor: the loading/error line is not `aria-live`, so screen readers are not told when the claims arrive.
- `tests/qa/` is protected, so the coverage fix is the evaluation steward's (an amendment). I am not blocking on it. Until it lands, any change to `DemoCard`'s fetch path needs a manual feed check.

### 3. Revisit cards: they arrive late and can shift the card under the learner
- Revisits now need a network round trip (up to 12 parallel `/api/meta` fetches after mount). When they arrive, they are inserted at item 2, 5, 8 and so on. A learner who has already scrolled past item 2 keeps the same scroll pixel offset, so the content shifts by one card.
- The old code had the same insertion after hydration, so the bug is not new. The window is now longer by one fetch.
- Smaller behaviour changes:
  - `slice(0, 12)` runs before the status filter, so 12 due-but-retired or renamed slugs (each a silent 404) starve valid ones.
  - Trailing revisits now show only once the list is exhausted (`next === null`), which in "all" means after about 879 cards.

**Should fix, not blocking:**
- Insert revisits only at positions after `active + 1`.
- Filter before slicing.
- Accept the 12-per-visit cap as a product decision, and write it in the changelog.

The revisit spec passes (10/10), which covers the fetch-then-render path.

### 4. Static API caching on Vercel: right model, unverified, version skew not handled
- Reading the code: `force-static` + `dynamicParams = false` route handlers are prerendered. Next 16.4.0 emits `Cache-Control: s-maxage=31536000` for them (`getCacheControlHeader`, no revalidate). On Vercel, prerendered outputs are served from the CDN for the life of the deployment and purged on the next one. As far as I know, the browser gets `public, max-age=0, must-revalidate` (revalidates by ETag). Unknown slugs or pages are 404 without a function. So paging costs one CDN hit, not a function call. **Confidence: medium-high from reading. Not observed**, because no preview deploy is possible without a `[deploy]` commit, and that needs the founder.
- Version skew: an open tab from deploy N fetches `/api/feed/all/k` from deploy N+1. Order or page count may differ:
  - Dedupe by slug hides duplicates, but lessons can be silently skipped.
  - A page that no longer exists returns 404, which feeds finding 1.

  Skew protection is not available to us on the free plan as far as I know. Deploys are rare (founder-approved), so after finding 1 is fixed I accept this. It must be written down, not fixed now.
- Output size: about 943 extra prerendered files per deploy. I don't expect a limit problem, but it is unmeasured.
- Checks to run at the first approved deploy (add them to the post-deploy smoke list, main W-609):
  - `curl -sI <prod>/api/feed/all/1`: expect 200 with `x-vercel-cache: HIT` on the second request.
  - `curl -sI <prod>/api/meta/<slug>`: expect 200, cached.
  - `curl -sI <prod>/api/feed/all/999`: expect 404 with no function invocation in the Vercel logs.

### 5. SEO and first paint: no regression from this branch, but first paint is dominated by CSS
- **Crawl discovery.** `/` used to server-render a link to every lesson. Now it links 30. `/catalog` (linked from `/`) lists every visible lesson under its concept. I checked all 879 visible lessons against `content/curriculum/*.json`: 0 are unlinked. So discovery is one hop deeper but complete. There is no sitemap and `/d/<slug>` has no per-lesson `metadata`. Both were true before this branch, so neither is a finding against it.
- **First paint.**
  - The HTML is now 37 KB gzipped, so the HTML no longer delays first paint. The bigger cost now is CSS.
  - Every page links 672 render-blocking stylesheets (650 KB, 269 KB gz). The browser must fetch all of them before first paint. That is a first-paint problem now, not just an HTML-budget problem at 2,000 lessons.
  - The 8.4 MB of first-load JS still holds hydration at 16.7 s against a < 2 s budget. This branch was never going to fix that. It is option 4 plus the geo chunk.
- Consequence for sequencing: the stylesheet question is not "later, at 2,000 lessons". It is the next first-paint lever after option 4. Hence item A below.

### 6. Feed correctness: holds
- `interleave` is unchanged and moved to the server.
- The chip prefix invariant holds by construction: each domain queue in "all" is the same rank-then-slug sorted list as the subject order. It has no test. A 10-line unit test of `feedOrder` would make finding 3 of the note ("would be wrong if") checkable. Should-fix.
- Dedupe and the inflight guard are correct.
- `setActive(0)` on a chip change is new and correct.
- The intro count uses server `counts`.
- The sentinel slot has no `data-index`, so it does not confuse the IntersectionObserver.
- The trial merge with main's DomainId change (`books`, `big-ideas`) typechecks. New domains appear as chips and get pages once their lessons are visible.

### 7. `tools/qa-changed.mjs`: sound, and conservative where it matters
- The import-closure approach is right, and the history checks are convincing: 48 for the geo re-export is exactly the importers.
- An empty selection prints an empty `QA_ONLY`, which `lessons.ts` reads as "run none". That is correct and is said on stderr.
- Over-selection cost: `src/lib/catalog.ts` is in the shell. It imports `content/domains.json`, which is handled per domain, so that is fine. Every future edit to DemoCard, the `/d` page or `feed-index.ts` still selects all lessons. That is correct today. It is the reason the version hash (via AMD) is worth having.
- The meta narrowing excludes `claims`, `recall` and `status` because the feed spec covers them. But the feed spec runs on `lessons()[0]` only, so a claims edit to lesson N is checked by `check`, not by QA. That is acceptable: claims are a content gate, not a rendering one. Stated so nobody reads it as QA coverage.
- The 855/879 stale-record finding is the evaluation steward's call (branch W-479, renumbered below), not a tool defect.
- I rule out `experimental.turbopackTreeShaking`, as the note invites: an experimental flag on every page, hiding the real fix. Option 4 is the fix.

### 8. Forward note for option 4 (not a finding against this branch)
Once option 4 removes metas from the client chunk, `/api/meta/<slug>` becomes the only public copy of full metas, including briefs and drafts. The option-4 change should decide whether the route serves a learner subset (claims, evidence counts, recall) and whether drafts get a meta file at all. This decision travels with item B.

## Decision

**Approve with changes.** Merge once:
- (a) finding 1 is fixed;
- (b) the board IDs are renumbered;
- (c) `npm run verify` passes on the integrated tree.

Findings 3 and 6 are should-fix: in this branch if cheap, otherwise as board items. Finding 2 is routed to the evaluation steward.

Objections that travel with it, and what happened to each:
- *Author: "the feed spec chip failure under QA_ONLY is a spec property, not a regression."* I agree: the old feed failed the same way. Routed to the evaluation steward (item C). Not blocking.
- *Mine: the contract does not exercise the feed trust-sheet fetch (finding 2).* Not blocking, because the code is simple and the author's scratch spec ran it. Routed (item C). Until it lands, DemoCard fetch changes need a manual feed check.
- *Mine: "HTML budget met" overstates the first-paint win (finding 5).* The 300 KB HTML budget is met. The < 2 s hydration budget is not, and won't be until option 4 and the CSS decision land. W-076 stays open until then.

## Merge plan

1. **Author (platform-engineer), on the branch.** Fix finding 1. Fix finding 3 (insert revisits only after `active + 1`, filter before slicing) and add the `feedOrder` prefix unit test (finding 6), if each is under an hour. Otherwise they become items at merge.
2. **Integrate.** Merge `main` into `scale-stage0`, or rebase onto it. Main is about 36 to 40 commits ahead (CardSequence kit, /spike fix, DomainId, many lessons).
   - Text conflicts appear only in `company/ops/progress.md` and `company/ops/changelog.md`. Keep both sides, newest first.
   - `board.json` auto-merges **silently with duplicate IDs**. Do not trust the clean merge: `check` catches it.
   - No `src/` conflicts. `tsc` passes on the trial merge.
3. **Renumber the branch's board items.** Main's highest ID was W-622 at 13:xx on 2026-10-14, and main is moving (dirty worktree, active agents). So **do not hand-write IDs**: delete the branch's three entries from `board.json` and re-add them with `npm run company -- board add`, which takes the next free ID. Expected (if nothing else lands first):

   | Branch ID | Becomes | Owner | Item | State at merge |
   |---|---|---|---|---|
   | W-477 | W-623 | principal-engineer | Review EDD-003 stage 0 on `scale-stage0` | done: this record |
   | W-478 | W-624 | evaluation-steward | Bring AMD-001 (c2) to ratification, plus the unnumbered qa-record lesson-hash request. Link main's W-479 (constitutional review 2026-10-14, founder), which is where (c2) is decided | backlog |
   | W-479 | W-625 | evaluation-steward | Stale QA records (855/879 selected by last-green); decide on a full contract run and qa-record | backlog |

   Then rewrite the references: `company/ops/progress.md` (branch entry, lines 23 to 24), the implementation note's "board item" line, and the changelog line if it cites an ID. Leave W-076 open in `review` until option 4 is measured.
4. **Add these items at merge** (via `board add`, so they get the next IDs, about W-626 onward):
   - **A. CSS strategy EDD** (owner platform-engineer; principal-engineer reviews). "Every lesson's `styles.module.css` is hoisted onto every page: 672 render-blocking stylesheets, 650 KB (269 KB gz), about 182 KB of `/`'s 282 KB HTML. Projected about 470 KB of HTML at 2,000 lessons. Options: EDD-003 stage 1 (lesson code out of the app's static import graph), a per-lesson CSS strategy (scoped load with the lesson chunk), or shared kit CSS plus a lint against new per-lesson modules. Measure link count, gz CSS and first paint per option. Option 4 does not fix this." Ref: this review, finding 5.
   - **B. EDD-001 option 4 sequencing** (owner platform-engineer; blocked on AMD-001 (c2), item W-624). "Once (c2) is ratified: split `tools/registry.mjs` output into `index.generated.ts` (server metas) and `loaders.generated.ts` (Demo imports only). Point DemoHost at loaders. Re-measure first-load JS (projected 8.4 MB to about 3.9 MB). Decide the `/api/meta` learner subset and drafts (finding 8). Then the shared geo chunk (3.2 MB). Order: c2 ratified, then option 4, then the CSS EDD decision (item A), then geo." Rule out `turbopackTreeShaking`.
   - **C. Feed contract coverage** (owner evaluation-steward; amendment to `tests/qa/`). Two parts: the feed-path trust sheet (open from a feed card and wait for `address:`), and the chip test ignoring `QA_ONLY`. Ref: findings 2 and 7.
   - **D. Post-deploy checks for the static API routes:** append the three curl checks from finding 4 to main's W-609 (post-deploy smoke checks). Do not add a new item.
   - If they were not fixed in step 1: **E.** revisit insertion and slice order (finding 3), and **F.** the `feedOrder` prefix test (finding 6), both platform-engineer.
5. **Verify on the integrated tree.**
   - Run `npm run check`. It must pass, with no duplicate IDs.
   - Run `npm run verify`. Every lesson is in scope by `qa-changed`'s own reckoning (DemoCard and `/d` are shell). Record the timings.
   - Re-measure `/` HTML and the stylesheet count on the integrated tree, because main added lessons and the CSS grows with them.
   - Do not run `qa-record` from a branch build: the author was right about that.
6. **Merge to main** without `[deploy]`. The deploy is a separate, founder-approved `[deploy]` commit, followed by the checks in item D.

## Kudos
- @platform-engineer: stopped at the protected boundary and wrote down exactly what option 4 and the hash need. Declined to file QA records from a branch build. Checked `qa-changed` against three real commits, not toy cases. That made this review fast.
