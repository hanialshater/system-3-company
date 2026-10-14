# EDD-003 stage 0 / EDD-001 options 2+3: slim feed index, paginated feed, and QA only what changed

owner: platform-engineer · date: 2026-10-14 · tier: 2 (feed data shape and every lesson page's card)
· branch: `scale-stage0` · review: principal-engineer, W-631 (was branch W-477; record company/engineering/reviews/2026-10-14-scale-stage0-review.md). Board items: see the end.
Designs: [EDD-001](../edd/EDD-001-feed-at-500-lessons.md) options 2 and 3,
[EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) stage 0.
Protected files: none touched. Option 4 (registry split) and the lesson version hash need
`tools/company.mjs`; see "Not done: needs an amendment".

## What changed

1. **Slim feed index** (`src/lib/feed-types.ts`, `src/lib/feed-index.ts`). A feed card is a
   `FeedItem`: slug, title, hook, domain, status, durationSec, claim counts `{ total, verified }`.
   Claims, evidence, brief and recall are not in the feed any more. The interleave (round-robin
   across domains, published first) moved from `Feed.tsx` to the server, unchanged.
   I left out `recall` even though EDD-001 option 2 lists it. Only revisit cards need it, and those
   fetch it (item 3).
2. **Pagination** (EDD-001 option 3). `/` server-renders page 0 of "all" (30 cards).
   `/api/feed/<filter>/<page>` serves later pages and per-subject pages as static JSON,
   prerendered at build (`force-static`, `dynamicParams = false`; 64 pages at 879 lessons, plus 879 meta files). The feed
   asks for the next page when the active card is within 8 of the end of what's loaded. A subject chip
   first shows the loaded cards of that subject, which are always a prefix of the subject's order,
   then swaps in that subject's page 0 from the server (`feedOrder` documents this invariant). The
   intro count comes from server-side `counts`, so it still says 879.
3. **Full meta on demand.** `/api/meta/<slug>` (static JSON, one per lesson). The trust sheet in
   the feed fetches it when opened ("Loading the claims…" until then, and a retry message on
   failure). The single-lesson page `/d/<slug>` still passes its one full meta (`full` prop), so it
   doesn't fetch. Revisit cards fetch the metas of due lessons, at most 12 per visit, and only
   published or in-review lessons are shown, as before.
4. **`tools/qa-changed.mjs`**: lists the lessons a change can affect and prints `QA_ONLY` for the
   unchanged contract (`tests/qa/lessons.ts` already reads it).
   - Modes: `--since=<ref>` (and `--until=<ref>` for a CI range) or, by default, since each lesson's
     last green QA record. The anchor is the commit that last added or changed a passing
     `company/reviews/<slug>/*-qa.md`, found in one `git log` pass. A lesson with no green record is
     always selected. Uncommitted changes count unless `--no-worktree` is passed.
   - A lesson is selected if any file in its **import closure** changed. The closure covers its
     folder plus everything it imports transitively through `@/` and relative imports: kit files,
     `@/kit/geo`, `src/components/lifehacks/*`, `src/lib/lifehacks/*`. Any **shell** change selects
     every lesson. The shell is the closure of `src/app/d/[slug]/page.tsx` and `layout.tsx`
     (DemoCard, DemoHost, kit/controls, catalog, ...) plus `globals.css`, `next.config.mjs`,
     `package*.json`, `playwright.config.ts`, `tsconfig.json` and `tests/qa/**`. The generated
     registry is excluded (it's derived from the metas).
   - Narrowing rules, so bookkeeping doesn't re-test everything:
     - A `meta.json` change counts only if a field the contract renders changed (slug, title,
       hook, domain, durationSec). `qa-record` appends to `evidence`, and status promotions are
       gated on green QA, so counting either would be circular.
     - A `content/domains.json` change selects only the lessons whose own domain entry changed.
   - `--feed` also says whether the feed spec needs to run.
   - Checked on real history (`--since=X~1 --until=X`):
     - 88a2239 (geo kit re-export): **48** lessons, exactly the 48 that import `@/kit/geo`.
     - 319d4f5 (one probability batch): **10**.
     - 9cc527d (Life Hacks engines): **147** (70 via StudyLesson.tsx, 69 via home-lessons.ts,
       8 own files).
     - `--since=HEAD~5`: 12.
     - This branch: 879 (DemoCard and the `/d` page are shell). That's correct, and it's why the
       contract run below is a sample, not proof.
   - Run time is 2 to 35 s. The last-green mode is the slow one, because of `git show` for meta
     diffs.

   Today the last-green mode selects **855 of 879**:

   | Reason | Lessons |
   |---|---|
   | `src/kit/controls.tsx` changed since the record | 399 |
   | Own `Demo.tsx` or CSS changed | 247 |
   | `package.json` changed | 201 |
   | No green record | 7 |
   | A real meta change | 1 |

   Most QA records are older than the kit, engine and lesson code they vouch for. That's a fact
   about the records, not a bug in the tool. The evaluation steward should know it.

## Measurements (same machine, same command, before = `cc37658` in a clean worktree)

`NEXT_DIST_DIR=.next-scale npx next build`, then `npx next start -p 3580`. HTML and JS were fetched
from the server, and gzip is level 9 computed locally. "First-load JS" is the sum of the
`<script src>` files the page's HTML references. Both builds have 879 lessons, all visible (587
published, 292 in review).

| Metric | Before | After | Budget |
|---|---|---|---|
| `/` HTML (`du -b <dist>/server/app/index.html`) | **5,836,934 B (5.57 MB)** | **282,163 B (276 KB)** | ≤ 300 KB |
| `/` HTML gzip | 1,182,577 B (1.13 MB) | 38,263 B (37 KB) | |
| `/` first-load JS (14 scripts) | 8,881,510 B (8.47 MB), gz 2.35 MB | 8,794,010 B (8.39 MB), gz 2.32 MB | |
| Client chunk carrying all 879 metas | 4,575,046 B, gz 1.11 MB | 4,523,354 B, gz 1.09 MB | 0 (EDD-003) |
| `/` stylesheets linked | 680 files, 657 KB (gz 272 KB) | 672 files, 650 KB (gz 269 KB) | |
| `/d/asthma-looks-safe` HTML | 254,804 B | 249,318 B | |
| Pixel 7 emulation, 4x CPU throttle, median of 3: `load` | 35.5 s | 15.0 s | |
| same: tap Start until the feed scrolls (hydrated) | 48.1 s | 16.7 s | < 2 s |
| `next build` wall time | 26 m 06 s | 20 m 48 s | |

Caveat on the timings: other agents were building at the same time. Load average was about 40 during
the before run and about 25 during the after run, so the phone and build times are directional only.
The byte counts are exact.

The HTML budget is met, but barely, and it won't hold at 2,000 lessons. Of the 282 KB left on
`/`, about **182 KB is CSS hoisting**: 63 KB of `<link rel=stylesheet>` tags (672 of them) and
about 120 KB of CSS references in the RSC payload. The 30 feed cards are about 10 KB and the
markup about 30 KB. Every lesson's `styles.module.css` is linked from every page, `/` and every
`/d/<slug>` alike, because Turbopack hoists the CSS of every module the registry's loaders can
`import()`. That part grows with the catalog: at about 2,000 lessons it is about 410 KB, so `/`
would be about 470 KB, over budget again. **First-load JS is unchanged** (8.4 MB):
`src/components/DemoHost.tsx` imports `loaders` from `registry.generated.ts`, and that module also
holds `demos` (every meta.json), so the whole ledger ships in the client chunk.
EDD-001's rule ("do 4 only if the bundle still carries full metas") now applies. It does.
The second-largest first-load chunk (3.2 MB) is the geo kit (d3-geo plus Natural Earth). It also
loads on every page, which is EDD-003 stage 0's "one shared geo chunk" item.

## Contract QA on this build

30 lessons drawn with a seeded shuffle (seed 20261014, over all non-retired lessons in disk order)
plus `tests/qa/feed.spec.ts`, on the phone and desktop projects, `QA_PORT=3580`, 3 workers:
`QA_ONLY=moon-hammer-feather,dropped-vs-fired-ball,include-the-wrap-up,fib-call-explosion,four-queens-pruning,saturated-enzyme,lh-weighted-volume-allocation,london-december-noon-sun,trie-word-length-not-count,zinc-hands-over-two,only-the-needed-trader-profits,tic-tac-toe-is-a-draw,seven-odds-leave-one,shoes-opposite-ends,pinhole-flips-the-world,winner-word-evidence,triangle-is-half,lh-pool-spare-stock,humidity-evaporation-gap,lh-ticket-bundle-unused,each-element-pops-once,more-detail-less-likely,window-forgets-start,costly-resistance,add-a-zero,atlantic-to-pacific-heading,high-satellite-view,the-fast-ones-leave,back-button-stack,unit-price-aisle`

**Result: contract 60/60 (30 lessons × 2 viewports), feed spec 10/10.** How the totals were reached:
- First pass with 3 workers: 54/60 contract. All six failures were `Test timeout of 45000ms
  exceeded`: window-forgets-start, the-fast-ones-leave, tic-tac-toe-is-a-draw,
  trie-word-length-not-count and unit-price-aisle on phone, four-queens-pruning on desktop. The
  machine's load average was 42 to 48, and passing tests were taking 37 to 46 s.
- Those six re-run with 1 worker: 12/12, each passing on its first attempt, in 19 to 38 s.
- Feed spec: 10/10 when run **without** `QA_ONLY`. With `QA_ONLY` set it is 8/10. "subject chips
  filter the feed" fails on both viewports because the spec builds its `allowed` set from `lessons()`,
  which `QA_ONLY` narrows to the sample, while the feed rightly shows every ai lesson. The old feed
  fails the same way, since it also showed every lesson of the domain. It's a property of how the
  spec reads `QA_ONLY`, not a regression. `tools/qa-changed.mjs --feed` now says to run the feed spec
  without `QA_ONLY`. If the steward wants the spec itself to ignore `QA_ONLY` in that test, that's
  a `tests/qa` change and needs an amendment.

Records: I did **not** run `company qa-record` on these results. A sample on a branch build isn't the
QA record for the merged tree, and filing it would make the last-green anchor point at this branch.

I also ran an extra check (not part of the contract), a scratch spec with phone and desktop, 6/6 pass:
- Scrolling past card 25 fetches `/api/feed/all/1` and the feed grows to 60 unique cards with no
  page errors.
- The `lifehacks` chip shows 30 Life Hacks cards, which needs page 0 of that subject from the server.
- The trust sheet opened from a feed card loads its claims on demand ("address:" visible).

## Not done: needs an amendment (stopped here, as asked)

- **EDD-001 option 4 (split the registry).** The generator is `registrySource` in `tools/company.mjs`
  (protected). AMD-001 part (c2) already holds the change that unblocks it: move the generator to
  `tools/registry.mjs` (`registryFiles(demos)` returns a `{ path: contents }` map), while `check` keeps
  freshness, faithfulness and the no-status-literal rule. It has been proposed since 2026-10-12 and
  isn't ratified. I did not write a second amendment for the same surface. Once (c2) is ratified,
  option 4 is an ordinary-surface change to `tools/registry.mjs`. The plan for that change:
  - `src/demos/index.generated.ts`: imports the metas, server side only.
  - `src/demos/loaders.generated.ts`: only `import("./<d>/<s>/Demo")`. `DemoHost` imports this, so
    the 4.5 MB meta chunk leaves the client.
  - `check`'s faithfulness rule still sees every meta import, in `index.generated.ts`.
  - It won't fix the CSS hoisting. That needs lesson code out of the app's static import graph
    (EDD-003 stage 1) or a per-lesson CSS strategy. It wants its own short EDD, and I think the
    principal engineer should decide which.
  - Projected result: first-load JS 8.4 MB to about 3.9 MB (the geo chunk and the Life Hacks engines
    would still be there).
- **Lesson version hash** (EDD-003 stage 0). It belongs in the generated index (also `tools/registry.mjs`
  after c2, so no amendment needed there). QA records citing it is a change to `cmdQaRecord` in
  `tools/company.mjs`, which does need an amendment. Unnumbered request for the evaluation steward
  (AMD-003 and AMD-004 are reserved and not commissioned, so I didn't take a number):
  - Surface: `tools/company.mjs` `cmdQaRecord`.
  - Change: add `· lesson: sha256:<hash>` to the record header line. The hash is sha256 over the
    sorted (path, bytes) pairs of the lesson's import closure, the same closure `tools/qa-changed.mjs`
    computes, so a kit or engine change also changes the hash. Before the hash is taken, `meta.json`
    is reduced to the fields the contract renders.
  - Effect: `qa-changed` can compare hashes and not commits, so a rebase or an unrelated history
    rewrite no longer re-selects lessons.
  - Judging effect: none on what may publish. A record says more precisely what it vouches for.
- **Not attempted**: `experimental.turbopackTreeShaking` in `next.config.mjs` might drop the unused
  `demos` export from the client chunk with no generator change. It's an experimental build flag on
  every page, tier 2, and it would hide the real fix. I'm listing it only so the reviewer can rule
  it out explicitly.

## Rollback

There are no data migrations and no protected paths. Revert the feed commit to restore the old feed
(`page.tsx`, `Feed.tsx`, `DemoCard.tsx`, `/d` page, the two API routes, `src/lib/feed-*`).
`tools/qa-changed.mjs` is standalone, so delete it or leave it.

## Would be wrong if

- A learner on a slow network opens "Why trust this?" and waits noticeably. It's one static JSON
  of about 3 KB, so I don't expect it, but it's unmeasured on a real phone.
- The chip prefix invariant breaks: someone changes `interleave` so that subject order within "all"
  differs from the subject's own order. Cards would then jump when page 0 arrives.
  `feedOrder`'s comment states the rule.
- QA selection misses a dependency the import scan can't see: a CSS `@import`, a dynamic import with
  a computed path, or a file read at runtime. None exist in lessons today (scanned 2026-10-14; the two `gen.mjs` files in geography are offline generators whose JSON output the lesson imports), but
  a new engine could add one.

## Board items (renumbered at the merge with main, 2026-10-14)

The branch's W-477 to W-479 collided with main's, so they were deleted and re-added with
`company board add`:

- W-631 (was W-477): principal-engineer review of this branch. Done: approve with changes.
- W-632 (was W-478): evaluation-steward, AMD-001 (c2) ratification plus the qa-record lesson hash.
- W-633 (was W-479): evaluation-steward, stale QA records (855/879).
- Added from the review: W-634 CSS strategy EDD (A), W-635 option 4 sequencing, blocked on
  W-632 (B), W-636 feed contract coverage (C), W-637 `feedOrder` prefix unit test (F). Item D
  (post-deploy curl checks for the static API routes) was appended to W-609.

## After review (finding 1 blocker, finding 3)

- A failed `/api/feed` page fetch sets `failed` on that list. Prefetch stops, and the sentinel
  shows "Couldn't load more lessons." with a "Tap to retry" button (`data-testid="feed-retry"`,
  44 px high). Retrying page 0 of a subject replaces the seed, as the first load does.
- Revisits are inserted only at item positions after `active + 1`, where `active` is frozen at
  the moment they arrive. The position resets to 0 on a chip change (the scroll resets too).
- The 12-revisit cap applies after the status filter: metas are fetched in batches of 12 until
  12 are shown or the due list runs out.
