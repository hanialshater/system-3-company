# EDD-003: Lesson storage and loading at 10k, 100k and 1M lessons

author: principal-engineer (Kenji) · reviewers: platform-engineer, evaluation-steward, backend-engineer, privacy-reviewer, tools-lead · tier: 2 · status: proposed · date: 2026-10-13

Review record: [2026-10-13-eng-review-lesson-storage.md](../../rituals/records/2026-10-13-eng-review-lesson-storage.md)

## Problem and why now

The founder (2026-10-13) asks what happens if we grow from 348 lessons to 10k, 100k and later 1M
(concepts × levels × languages × contexts). Today every lesson is a folder in git
(`src/demos/<domain>/<slug>/{Demo.tsx,meta.json,styles.module.css}`) with review records in
`company/reviews/<slug>/`. One generated registry imports every meta and lazily imports every
component. One Next.js build compiles all of it, and a browser QA run tests every lesson.

The founder added a direction (relayed by the chief of staff, same day): *"I want to design for
scale, we can't put all code in the app, the server is also limited. I think hot code into the
server could be an option, or maybe at the app or front end?"* So this EDD **rules out "every
lesson compiled into one app build" at scale**. The core question is **where lesson code is
loaded at runtime**: on the server, in the client, or a hybrid. Storage (git, shards, content
store) is the second question.

Why now: two budgets are **already broken at 348 lessons** (see the measurements). The design
needs to be agreed before we pass 1k, and before a backend with auth exists. Isolation is cheap to
build before auth exists and expensive to add afterwards.

## Goals / non-goals

Goals
- One design that holds from 1k to 1M lessons, delivered in stages that can each be reversed, with numeric triggers for moving to the next stage.
- Keep System 3 guarantees: the disk is the memory. Every lesson version, its claims and its reviews stay addressable and immutable. Evaluators see the artifact first. Builders never verify their own claims. The judged cannot edit the judge.
- Lesson code (agent-generated) can never touch learner credentials once the backend exists.
- The cost of QA and build grows with the number of *changes*, not with the size of the catalog.

Non-goals (this EDD)
- No code, gate or protected-path changes. Every change below that touches `tools/company.mjs`, `tests/qa/**` or `src/kit/Lesson.tsx` needs a ratified amendment first.
- No new dependencies yet. The bundler for the spike and stage 1 needs its own decision record.
- No decision on the stage-3 store (beyond 100k). This EDD names the trigger and the candidates only.

## Current state (with measurements)

All numbers are from this checkout on 2026-10-13 (4 vCPU, 15 GB RAM), with the commands that produced them.

| What | Value | Command |
|---|---|---|
| Lessons | 348 (9 domains) | `find src/demos -mindepth 2 -maxdepth 2 -type d \| wc -l` |
| Tracked files | 2,640 total; 1,081 in `src/demos`; 1,293 in `company/reviews` | `git ls-files <path> \| wc -l` |
| Files per lesson | 3.1 source (Demo.tsx, meta.json, CSS; 30 have model.ts) + 3.7 review records (min 1, median 4, max 7) = **6.8** | as above |
| Bytes per lesson | Demo.tsx avg 6.6 KB, meta.json avg 4.3 KB, CSS avg 1.0 KB; reviews avg 5.0 KB. **≈17 KB per lesson** tracked | `git ls-files … \| xargs du -cb` |
| Git history | 278 commits; **4.26 MB** packed (`git bundle --all`); `.git` 47 MB unpacked (9,510 loose objects, never gc'd) | `git bundle create x --all`, `git count-objects -vH` |
| `git status` | 0.016 s | `time git status --porcelain` |
| `npm run check` | 0.57 s (full scan of every meta and Demo.tsx) | `time npm run check` |
| Registry | `registry.generated.ts` 53 KB, 705 lines (2 lines per lesson) | `wc -c -l` |
| **Next build** | **73 s wall**: compile 25.0 s, TypeScript 26.1 s, 353 static pages 10.5 s | `NEXT_DIST_DIR=.next-pe npx next build` (then `git checkout tsconfig.json`) |
| Build output | 321 MB: server 196 MB (lesson HTML 46 MB at ~133 KB per page, RSC 95 MB), cache 117 MB, static 7.6 MB in 362 chunks. **≈0.56 MB of server output per lesson** | `du` on `.next-pe` |
| **All-metas client chunk** | **1.29 MB (349 KB gzip)**, holds all 350 metas (≈3.7 KB per lesson), loaded by the feed and by every lesson page | grep on `.next-pe/static/chunks` |
| **Feed HTML** `/` | **1.82 MB (392 KB gzip)**; EDD-001's budget is 300 KB | `du -b .next-pe/server/app/index.html` |
| Geo kit | d3-geo + atlas duplicated into 3 chunks of ~1.45 MB each (~420 KB gzip each); 35 lessons use the geo kit | chunk inspection |
| **QA per lesson** | median **12.2 s of browser time** (2 viewports); **6.6 s wall per lesson** at 2 workers. Last full run: 208 lessons, 426 tests, 22.8 min. Fresh sample: 18 lessons, 36 tests, 118 s | `test-results/qa-report.json`; `QA_ONLY=<18 slugs> npx playwright test tests/qa/contract.spec.ts` |
| Lesson import surface | every Demo.tsx imports only `react`, `@/kit/{Lesson,controls,milestones,random,geo}`, its own CSS module and local files (2 also import `d3-geo` directly) | `grep -h ^import src/demos/*/*/Demo.tsx` |
| Lesson rendering | already client-only: `DemoHost` uses `dynamic(load, { ssr: false })` | `src/components/DemoHost.tsx` |

Two findings matter for the design:
1. **EDD-001's trigger has already fired.** The feed is 6× over its HTML budget, and every page ships every claims ledger. This is a problem today, whatever we choose for 10k.
2. **Lessons are already narrow and client-only.** The only shared surface is React plus five kit modules, and the server renders no lesson markup. So we can move lesson code to the client without losing anything we have now.

### Extrapolation: where each part breaks

Linear from the per-lesson numbers above. Real growth will be worse for the registry and TypeScript, which process the whole program at once. "Breaks" means it misses a budget we already hold, or it stops working for agents running in parallel worktrees.

| | 1k | 10k | 100k | 1M |
|---|---|---|---|---|
| Files (src + reviews) | 6.8k | 68k | 680k | 6.8M |
| Working tree | 17 MB | 170 MB | 1.7 GB | 17 GB |
| Packed history (≈12 KB/lesson now, ~2× over life) | ~25 MB | ~250 MB | ~2.5 GB | ~25 GB |
| git clone / status / worktree | fine | fine (kernel-sized) | **breaks**: clone takes minutes, status takes seconds without fsmonitor, each agent worktree checks out 680k files (5 parallel agents need 8.5 GB) | **broken**: needs Scalar/VFS-class tooling |
| Next build (≈0.2 s per lesson) | ~3.5 min | **~35 min**, close to a hosted 45-min build cap; every deploy re-renders every page | **~6 h: broken** | broken |
| Server build output | 0.56 GB | **5.6 GB** | 56 GB | 560 GB |
| All-metas chunk on every page | 3.7 MB | 37 MB | — | — | 
| Feed HTML | ~5 MB | ~50 MB | — | — |
| Registry module | 150 KB | 1.5 MB / 20k lines, one module | 15 MB: **broken** | broken |
| Full QA at 2 workers | 1.8 h | **18 h** (34 browser-hours) | 340 browser-hours | 3,400 browser-hours (~140 days) |
| `check` full scan | 1.6 s | 16 s | ~3 min | ~27 min (+ fs) |
| Review records | 3.7k files | 37k | 370k | 3.7M files, ~5 GB, and the launch gate requires each one to exist as a **local file** (`exists(rel(r))`) |

The client bundle and the feed are broken now. The single build and full-catalog QA break between
2k and 10k. Plain git with full checkouts breaks near 100k. Git itself is the **last** thing to
break, and the cheapest to defer.

## Options considered

### Part A: where lesson code is loaded (the founder's core question)

**A0. Do nothing: every lesson compiled into one app.** Ruled out by the founder, and the numbers
agree: it breaks between 2k and 10k (build time, output size, client chunk). Kept only as the
baseline we roll back to.

**A1. Server-side hot loading.** The Node or edge server fetches lesson modules at request time
(from a store, by hash) and renders or serves them.
- Server load and cost: one function invocation per lesson view, with module fetch, evaluation and caching per instance. Cost grows with traffic, not with the catalog. That is exactly the "server is limited" problem the founder named.
- Latency: a cold start plus a module fetch on the first view on each instance. Warm caches are lost whenever instances recycle.
- **Security: the worst option.** Agent-generated code would run inside the process that will hold the database credentials, session secrets and event intake. A bad or poisoned lesson is remote code execution. Sandboxing (isolates, separate workers, no-network policies) adds infrastructure we do not have and must audit.
- Benefit: SSR of lesson markup. We do not use it today (`ssr: false`), and lessons are interactive canvases that SSR helps little.
- QA, rollback and gates: the same as in A2, but every check also has to cover the server runtime.
- Verdict: **reject.** It costs the most, has the largest blast radius, and gives nothing we need.

**A2. Client-side hot loading.** The app ships the shell and kit only. Each lesson is an independently
built ES module bundle, stored by content hash (`/l/<sha256>.js`) on a CDN, and fetched by the feed
at runtime.
- Two hosts are possible for the same bundle:
  - **A2-a same-origin `import()`**, with SRI, a strict CSP (`script-src` limited to the shell and the lesson CDN, `connect-src` limited to the event API) and an import map. Fastest and simplest. But lesson code runs with full page privileges: it can read any token JavaScript can reach, and call our APIs as the learner.
  - **A2-b sandboxed cross-origin iframe.** The bundle runs on a separate origin (e.g. `lessons.<domain>`) in `<iframe sandbox="allow-scripts">` without `allow-same-origin`, so it has an opaque origin. The kit inside the frame talks to the host through a typed `postMessage` bridge: progress, events, completion and resize. Lesson code can never touch the host's cookies, storage or tokens, whatever it contains. Costs: each frame loads React + kit (cached by HTTP after the first frame), uses more memory with 2–3 frames mounted, and needs care with touch/scroll inside a scroll-snap feed, focus and accessibility. `kit/progress.ts` must move to the host side of the bridge, which also enforces today's rule that demos must not touch storage.
- Server load and cost: about zero per view beyond static assets. One lesson costs one immutable, CDN-cached bundle (est. 3–8 KB gzip; the spike measures it). The shell and kit are cached once.
- Latency and prefetch: the feed manifest names the next N bundles. Prefetch with `modulepreload` (A2-a) or pre-create the next 1–2 frames off-screen (A2-b). Target below.
- How lessons get the kit: the kit becomes a versioned package (`kit@<major>.<minor>`), built once as ESM and exposed through an import map (`react`, `react-dom`, `@/kit/*` → `/kit/<version>/<hash>.js`). Each bundle records the kit version it was built against. The host serves every kit major that any live lesson pins. Each kit version has contract tests (the QA contract, run against a fixture lesson per major). Minor versions must keep behaviour (semver). A major version means lessons migrate one by one, each migration is a new lesson version, and it is QA'd again.
- SEO/SSR: none for lesson code, as today. See A3.
- Offline: a service worker caches the shell, kit, manifest and recently viewed or prefetched bundles. Because bundles are content-addressed, the cache is correct forever. Lessons must not fetch: `check` already warns on network use in Demo.tsx, and the iframe CSP (`connect-src 'none'`) can enforce it.
- QA: each bundle hash is tested once, when it is built, and is immutable after that. A QA record cites the hash it tested. A kit minor release re-runs the kit contract plus a sample. A kit major release QAs only the lessons that migrate.
- Rollback: point the manifest entry back at the previous hash. That takes seconds, needs no rebuild, and the old bundle is still on the CDN.

**A3. Hybrid: the server serves the manifest, metadata and static previews; the client runs the code.**
This is A2, plus a server or static layer that renders the lesson page (title, hook, claims sheet,
recall, and a poster image taken from the QA screenshot) from the manifest and meta. It never
executes lesson code.
- Server load: static or ISR pages from data. No lesson code in the server bundle, so the 196 MB server output collapses to the shell.
- SEO: lesson pages are indexable (title, hook, claims) with no lesson code on the server.
- Feed: an SSR'd first card plus a slim index, which also fixes the EDD-001 problem. The full meta loads on demand in the trust sheet.
- Security, QA, rollback and offline: as in A2.

### Part B: where lesson sources and records live

| Option | Cost | Risk | Reversibility | Breaks at |
|---|---|---|---|---|
| **B0 Monorepo as is** | none | full checkouts per agent worktree | n/a | ~100k (git), much earlier for the build (solved by Part A) |
| **B1 Monorepo + partial clone (`--filter=blob:none`) + sparse checkout per agent/domain** | low: git config and agent setup | the gates (`check`, `launchGates` evidence `exists()`) and `tests/qa/lessons.ts` scan the whole tree, so a sparse checkout makes them fail or lie unless they are amended to read an index | high | ~100k–300k with sparse-index; beyond that only with Scalar-class tooling |
| **B2 Sharded git** (repo per domain, or per 10k lessons; a generated content index rather than submodules) | medium: cross-shard check, CI and CODEOWNERS per shard; the index must be the single registry | split-brain between shards and index; submodule pointers are a known foot-gun for agents | medium (shards can be merged back, history kept) | effectively unbounded in count; each shard stays small |
| **B3 Specs in a versioned content store** (Postgres rows plus object storage blobs, immutable versions, content hashes, append-only audit) rendered by a **library of engines** (code in git) | high: a schema, an engine library, editor tooling for agents, and a migration of 348 bespoke lessons | "the disk is the memory" moves out of git, so audit has to be rebuilt (append-only tables, hash chains, exports); engines get too general (architecture astronautics) | low once specs are the source of truth | unbounded, if variants are data |
| **B4 Hot code bundles in object storage/CDN** | this is Part A2 | covered above | high (the manifest pointer) | unbounded |
| **B5 Hybrid**: engines + specs for *variants*, bespoke bundles for *concepts* | medium, staged | needs a clear line between a variant and a new lesson | per stage | unbounded |

Key observation for B3/B5: **1M lessons are not 1M bespoke programs.** Concepts × levels ×
languages × contexts means most of the catalog is *the same interaction with different
parameters and strings*. Variants should be data (a spec: parameters, locale strings, context
framing) over one code bundle. Code bundles then grow with concepts (maybe 10k–50k), and specs
grow with variants (up to 1M). A general "engine library" that replaces bespoke code is a
different and much riskier bet. We should not make it until the data shows many lessons sharing
one interaction shape.

### What each option does to System 3's rules

- **Immutability and audit.** Every lesson version gets an address: `<slug>@<sha256 of its canonical source tree>` (code + meta + spec). The bundle hash is derived from it, and claims, QA, learner, fact-check and pairwise records cite it. While sources live in git (B0–B2), git is the memory and the hash is a pointer into it. In B3 the store must be append-only, and each version row must carry its hash, its parent hash and the commit of the engine code that renders it. That is a constitutional question (founder question 7).
- **Review and claim workflow.** Unchanged in A2/A3: reviews read the walkthrough of a *specific version*. The claim gate requires that every claim of *that version* is verified by someone other than its builder. A new version carries claims forward only if their text and support are unchanged (hash per claim). Otherwise they go back to `unverified`.
- **Gates (`tools/company.mjs`, protected; evaluation steward owns the contract).** Changes implied, each needing an amendment:
  1. `registrySource` → a generated **manifest** (slug → version hash, bundle hash, kit version, status, slim index fields) instead of static imports.
  2. `launchGates` binds `evidence.qa` to the bundle hash being published (a QA pass on version N must not publish version N+1).
  3. Evidence addresses can be content-addressed URIs as well as local paths, resolved through the index, so sparse checkouts and shards do not break `exists()`.
  4. `check` becomes incremental per lesson/shard (full scan stays as a nightly job).
  5. `tests/qa/lessons.ts` reads the manifest rather than walking `src/demos`, and the contract runs against a bundle in its host.
  None of these change *what* a gate demands, only *where it looks*. The steward and the constitutional review must agree that this distinction holds.

### Options summary

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing | 0 now; build/QA/client break 2k–10k | high, and already over budget | n/a |
| A1 server hot loading | high per view | RCE in the credentialed process | medium |
| A2-a client `import()` same origin | low | lesson code has page privileges once auth exists | high |
| A2-b client, sandboxed cross-origin iframe | medium (bridge, 2nd origin) | UX cost of iframes in a scroll feed (spike) | high |
| **A3 hybrid (manifest/meta/previews on server, code in client, A2-b host)** | medium | as A2-b | high |
| B1 sparse/partial clone | low | gates need index-aware amendment | high |
| B2 sharded git + index | medium | split-brain | medium |
| B3 content store + engines | high | audit rebuilt; over-general engines | low |
| B5 variants as specs over bundles | medium, staged | variant/lesson boundary | per stage |

## Proposal

**Recommendation on the founder's question: client, not server. Specifically the hybrid A3.**
The server (or the static build) serves only the shell, the kit, a slim manifest, lesson metadata
and static previews. Lesson code is an independently built, content-hashed ES module bundle,
fetched by the client and run in a **sandboxed cross-origin iframe** with a `postMessage` bridge.
Same-origin `import()` (A2-a) is the fallback if the spike shows iframes cannot meet the feed
budgets. It is acceptable only while no auth tokens exist in the page, and it is reconsidered when
the backend ships. **Server-side execution of lesson code is rejected outright** (ADR-003).

Storage stays in git for as long as git is not the bottleneck, which by the numbers is the
longest of anything. Variants become data. We move to shards or a store only on triggers.

### Spike (before any migration; platform-engineer; 1–2 days; scratch branch, never merged)

Load **3 existing lessons as runtime bundles**:
- `probability/why-seven-wins` (kit only),
- `physics/throw-it-fast-enough` (local `model.ts`),
- `geography/bearing-spiral-to-the-pole` (geo kit, the heaviest dependency).

Steps
1. Build the kit (`Lesson`, `controls`, `milestones`, `random`, `geo`) as one ESM file, plus React as a shared module. Build each lesson as ESM with `react` and `@/kit/*` left external, and CSS modules inlined or emitted as a hashed `.css`. Use `tsc` (already installed) for transpiling, and record whether a bundler is needed. Any new dependency, including for the spike, needs a decision record first.
2. Name each artifact by sha256. Write a 3-entry manifest.
3. Host on a second origin (e.g. `localhost:3101` from a scratch static server), embedded from the app on `:3100` in `<iframe sandbox="allow-scripts">` with an import map and a CSP. Use a minimal bridge for progress, events and resize.
4. Run a **copy** of the QA contract (in `artifacts/scratch/principal-engineer/`, not `tests/qa/**`) against the hosted iframes, on phone and desktop.

Measurements committed before the spike (pass/fail):
- Bundle size per lesson (gzip): target ≤ 15 KB for kit-only lessons. Kit + React once: record it, budget ≤ 120 KB gzip, with the geo kit separate.
- Card interactive after snap on Pixel 7 emulation with a prefetched bundle: ≤ 300 ms. Cold, without prefetch: ≤ 1.5 s.
- Memory with 3 frames mounted: ≤ 1.5× the current feed with 3 cards.
- Scroll-snap, touch drag on sliders, keyboard focus and screen-reader labels work inside frames (the a11y reviewer looks at the screenshots).
- The QA contract copy passes for all 3 lessons in both viewports, unchanged apart from frame targeting.
- A lesson inside the frame provably cannot read `document.cookie` or `localStorage` of the host, or call `/api/*` with credentials (negative test).
- would_be_wrong_if: iframe touch/scroll cannot be made to work in the snap feed, or the per-frame cost blows the latency or memory budgets. Then the choice becomes A2-a now, with an iframe or isolation layer required before auth, and this EDD is revised.

### Stages, triggers and reversibility

**Stage 0: now → 1k lessons (monorepo, fix what is already broken).**
- Do EDD-001 options 2+3 now: a slim feed index, full meta on demand, pagination. Then option 4, splitting the registry into index and loaders (an amendment to `tools/company.mjs`). Its trigger has already fired (feed 1.82 MB vs 300 KB). Fix the geo kit duplication (one shared geo chunk).
- Run the spike. Write ADR-003, ADR-004 and ADR-008 as proposed.
- Add a **lesson version hash** (sha256 of the canonical lesson tree) to the generated index. QA records start citing it (amendment to `qa-record`).
- Agents may use partial clone and sparse checkout for their domain only once the gates are index-aware. Until then, full checkouts (they are cheap at this size).
- Reversible: yes, each is one revert.

**Stage 1: 1k → 10k (runtime bundles, sources still in this repo).**
- Each lesson builds independently into `/l/<hash>.js`, uploaded to object storage/CDN (immutable, never overwritten). The app ships shell + versioned kit. The generated **manifest** replaces the registry. Lesson pages are A3 (meta + poster on the server, code in the frame).
- QA once per bundle hash, in CI, only for changed lessons. Kit releases run the kit contract plus a ~5% sample per kit major.
- Variants (level, language, context) are introduced as **specs over one bundle**, not copied folders.
- Triggers to start stage 1 (any one): 1,000 lessons; `next build` > 10 min; the per-page shared client JS for lesson code > 200 KB gzip after stage 0; full QA > 2 h on CI.
- Reversible: yes. The manifest can point back at in-app compiled lessons for any slug (keep `DemoHost` able to load either during migration). Old bundles stay on the CDN.

**Stage 2: 10k → 100k (sources leave the app repo).**
- Lesson sources and their review records move to **content repo(s) sharded by domain** (B2, with a generated content index, no submodules). Git stays the memory. The app repo holds only the shell, kit, engines and tools. Gates read the index (amendments 3 and 4).
- Triggers (any one): app repo packed > 1 GB; `git status` > 1 s; a fresh agent worktree checkout > 60 s; 20k lessons.
- Reversible: medium. Shards can be merged back with history (subtree merge). The index is regenerable from the shards.

**Stage 3: 100k → 1M (decide then, with data).**
- Candidates: more shards (per domain × language), or B3 (an append-only content store for specs with hash-chained versions and periodic git or object exports as "the disk").
- Triggers: shard count > ~30, cross-shard index build > 10 min, or specs outnumbering bundles 20:1 (which means variants dominate and a store fits them better).
- Reversible: low. This needs its own EDD, ADR and constitutional review.

### What I would NOT do yet

- No server-side loading of lesson code, ever (ADR-003).
- No move off git, no Postgres content store, no submodules, no sharding before the stage-2 triggers.
- No general "engine library" rewrite of the 348 bespoke lessons. Engines appear only when ≥ 20 lessons share an interaction shape.
- No CDN, bundler or object store dependency until the spike passes and a decision record exists.
- No change to what any gate demands. Amendments only change where gates look, and the evaluation steward owns that text.
- No migration of existing lessons until the spike's measurements pass.

## Measurements that will show it worked (committed before implementation)

| Metric | Current | Target | Command |
|---|---|---|---|
| Feed HTML `/` | 1.82 MB | ≤ 300 KB (EDD-001) | `du -b <dist>/server/app/index.html` |
| Shared client JS carrying metas | 1.29 MB / 349 KB gz | 0 (slim index ≤ 50 KB gz at 1k) | chunk inspection after build |
| App build time | 73 s @ 348 | ≤ 5 min at any catalog size (lessons built out of the app) | `time npx next build` |
| Lesson build (per changed lesson) | n/a | ≤ 10 s | spike/CI timing |
| QA cost per change | full run 38 min @ 348 (2 workers) | proportional to changed lessons: ≤ 30 s per changed lesson | CI timing |
| Rollback of one lesson | revert + rebuild + redeploy | manifest repoint, ≤ 1 min, no build | runbook drill |
| Lesson code access to host credentials | n/a (no auth yet) | none (negative test passes) | spike test |

would_be_wrong_if: (1) the iframe host cannot meet the feed's latency or memory budgets on a
phone; (2) per-lesson independent builds cost more in total CI time than one app build at 1k;
(3) more than ~20% of lessons need code the kit does not expose, which would make the import-map
contract unstable; (4) variants turn out to need distinct code most of the time, which would make
"specs over bundles" a fiction.

## Rollout and rollback

Stage by stage, as above. Each stage has its own EDD section update, engineering review and ADRs.
During stage 1 migration, `DemoHost` (or its successor) can resolve a slug either to the in-app
compiled component or to a runtime bundle. Rollback for any lesson is a manifest change, and for
the whole stage it is one revert of the manifest switch. Bundles and kit versions are never deleted
while any manifest version (live or archived) references them.

## Open questions and objections

Founder
1. Is 1M really 1M distinct interactions, or ~10k–50k concepts × variants? This decides the number of code bundles, and whether B3 is ever needed.
2. Languages: is a translated lesson a new set of claims (re-verified per language), or does a verified claim carry over through a verified translation? Who verifies translations?
3. When does a backend with auth and learner accounts arrive? It sets the deadline for the iframe boundary.
4. How much do lesson pages need SEO (indexable title, hook and claims)? A3 assumes yes.
5. Is offline play a requirement (service worker caching of bundles)?
6. Budget: at 10k, change-proportional QA still needs ~35 parallel browsers for a 1 h full sweep after a kit major. Is CI browser-hours plus CDN/object storage spend acceptable, and on which provider (stay on Vercel; a second origin for lessons)?
7. Constitutional: is "the disk is the memory" a commitment to *git*, or does an append-only, hash-chained content store with exports satisfy it at stage 3? This would need a constitutional review.

Objections already raised by me, to be answered in the review
- Iframes in a scroll-snap feed have a history of touch and focus bugs. The spike tests this before the decision, not after.
- Per-lesson builds multiply CI jobs. They pay off only if QA and build are change-proportional, so the stage-1 trigger includes a CI-time measurement.
- Moving the gates' "where to look" is close to moving the gates. The evaluation steward must sign off that the amendments keep each gate's meaning.
