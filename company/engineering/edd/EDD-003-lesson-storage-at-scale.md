# EDD-003: Lesson storage and loading at 10k, 100k and 1M lessons

author: principal-engineer (Kenji) · reviewers: platform-engineer, evaluation-steward, backend-engineer, privacy-reviewer, tools-lead · tier: 2 · status: **approved with changes** (review closed 2026-10-14) · date: 2026-10-13

Review record: [2026-10-13-eng-review-lesson-storage.md](../../rituals/records/2026-10-13-eng-review-lesson-storage.md)

> **Update 2026-10-14 (review closed: approve with changes).** At 879 lessons build 7 takes about 7.1 min (0.48 s per lesson, more than twice the 0.21 s assumed below) with 1.2 GB of output, and full QA is about 2.6 h, so the **QA trigger for stage 1 has fired** and the build trigger is projected near 1,250 lessons. SPIKE-001 is accepted: go with changes. ADR-003 to ADR-007 are proposed in `../adr/`. ADR-008 waits for W-089. The warm budget is redefined: after-snap interactive ≤ 300 ms with the active ±1 frames pre-created, measured on a device. Stage-1 tooling may start after the founder's bundler decision ([decision record](../../decisions/2026-10-14-lesson-bundler-and-memory.md)). No lesson migrates and no gate changes until W-085, W-086, the W-087 amendment and founder question 6 are done. Answers to every open question are in the review record.

> **Addendum 2026-10-16 (proposed, platform-engineer): A2 pilot of 50 lessons**, at the end of this file. It names the bundler (ADR-010, esbuild 0.27.0), the 50 slugs, how lesson CSS travels with its bundle, one measure command per return line, the QA-contract ask and a run plan to the 1.2M checkpoint. The warm-frame line cannot be measured on this host (addendum section 0). It needs principal-engineer's tier-2 review before any pilot build starts.

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

## ADRs this implies (all status: proposed; none written until the review closes)

| Draft | Title | One-line decision |
|---|---|---|
| ADR-003 | Lesson code never runs on the server | Lesson code executes only in the learner's browser; servers serve manifests, metadata and static previews, never lesson modules. |
| ADR-004 | Lessons are immutable, content-addressed versions | Every lesson version is `<slug>@<sha256>` of its canonical tree, and every claim check, QA, learner, fact-check and pairwise record cites that hash. |
| ADR-005 | Independently built lesson bundles against a versioned kit | Each lesson builds alone into an ES module bundle with React and `@/kit/*` external, resolved through an import map to a semver'd kit; supersedes ADR-001's compiled registry for runtime loading. |
| ADR-006 | Sandboxed cross-origin iframe host with a postMessage bridge | Lesson bundles run in `sandbox="allow-scripts"` frames on a separate origin; progress and events cross a typed bridge; host credentials are unreachable (pending the spike). |
| ADR-007 | The manifest is the registry; rollback is a pointer change | A generated, versioned manifest maps slug → version, bundle and kit hashes and status; publishing and rollback edit only the manifest; bundles are never deleted while referenced. |
| ADR-008 | Variants are data, not code | Levels, languages and contexts are specs (parameters, strings, framing) over one lesson bundle, each spec version hashed and reviewed like a lesson version. |
| ADR-009 (stage 2) | Lesson sources move to domain-sharded content repos with a generated index | Triggered by the stage-2 numbers; git remains the memory; no submodules. |
| Decision record | Lesson bundler dependency | Which bundler (if `tsc` is not enough) builds lesson and kit bundles, with `npm audit` and a license check (best practice 5). |

Amendments implied (evaluation steward drafts the gate text; constitutional review ratifies):
registry → manifest generator; QA evidence bound to the bundle hash; content-addressed evidence
addresses; incremental `check`; `tests/qa/lessons.ts` reads the manifest.

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

## Addendum 2026-10-16: A2 pilot (stage 1, first step)

author: platform-engineer (Noor) · status: **proposed**. Principal-engineer reviews it as a tier-2 engineering review before any pilot build starts · batch: company/ops/dispatch-requests/2026-10-16-r2-engineering.md#B3 · board: W-088 (with W-669, W-085) · project: `[project:scale-stage-1]`, tranche 1 (2.45M, checkpoint at 1.2M; Project Review 1, company/rituals/records/2026-10-16-project-review.md, item 5) · bundler: [ADR-010](../adr/ADR-010-lesson-bundler-esbuild.md) and [its dependency record](../../decisions/2026-10-16-dep-esbuild.md) · slug list: [EDD-003-a2-pilot-slugs.txt](EDD-003-a2-pilot-slugs.txt)

Nothing in this addendum changes code, a gate, `tests/qa/**`, `src/kit/**` or anything a learner sees. Everything above it in this EDD stands.

### 0. Read this first: one return line cannot be measured on this host

**The warm-frame line ("warm frame at most 300 ms on a phone") cannot be measured on this host.** It has no phone, no USB bus (`/dev/bus/usb` does not exist), no `adb`, no macOS for Safari's inspector, and no tunnel tool, so no phone can reach a server here. Chromium's Pixel 7 emulation with 4x CPU throttling is a proxy, not a phone (SPIKE-001 itself said the after-snap number must come from a device). The batch item's stop condition says: "the pilot cannot measure a return line on this host (write which line, and stop)". **So: the warm-frame line. It is written down here, and the run plan below stops at the checkpoint for it.** The other three lines can be measured here, and the design and the run plan up to the checkpoint do not depend on the warm line. Whether pilot build runs may start before W-085 has a way to reach a phone is principal-engineer's ruling in the tier-2 review (section 9, question 1), not mine. My recommendation: yes, because every run before the checkpoint is needed whatever the warm number turns out to be, and the stop rule's fallback (A2-a) reuses the same bundles.

### 1. Where things stand now (baseline for the return lines)

| What | Now | Source |
|---|---|---|
| Lessons | 965: 675 published, 254 in review, 36 draft. Life Hacks 200, none published | survey of every `src/demos/*/*/meta.json`, 2026-10-16 |
| `/` stylesheets | **1** (751 before A1) | readiness record company/engineering/readiness/2026-10-15-amd001-c2-split.md (principal-engineer-ops measured; not re-measured by me) |
| `/` HTML, first-load JS | 49,043 B; 230,185 B gz | same |
| App build | 2 m 27 s to 3 m 19 s wall on a shared host (compile 27.3 s, TypeScript 45 s, 1,995 static pages) | same, C3 verify and the base/applied builds |
| Full QA | 1,930 tests over 960 lessons and both viewports in 55.1 min: **3.4 s wall per lesson** | same, C3 |
| QA after a kit change | every lesson: 55 min, because every lesson is compiled against the kit | `tools/qa-changed.mjs` selects all lessons for any shell or kit change (2026-10-14 stage-0 review, finding 7) |
| Bundle sizes in the frame | p50 2,380 B, p99 3,421 B gz per lesson; kit 61.8 KB gz once | SPIKE-001 (348 lessons) |

Read this table before reading the return lines. After A1, two of the four lines are already met by the app as a whole: the build is under 5 min and `/` has 1 stylesheet. The pilot cannot "bring them down". What it can show is that they **stay** met while lessons leave the app, and that a pilot-migrated lesson costs the app build nothing (wording: P-5, section 12). That is the "whatever the lesson count" half of the build line. See finding F1 in section 10.

### 2. The 50 slugs, and why those

The list is in [EDD-003-a2-pilot-slugs.txt](EDD-003-a2-pilot-slugs.txt). The 25 marked `# cp` are the checkpoint set (section 8): the 3 lessons that are always in, every coverage pick (15), and the first hash-order lesson of each domain that still had one (7). The set spans all 9 domains.

**Eligible:** published lessons only, outside Life Hacks and outside the four domains that have at most 4 published lessons each (big-ideas, history, books, behavioral), and not named in any open board item. On board state at commit `5440b05` that left 669 published lessons, of which 134 were excluded because an open item names them. 535 remained.
- Published only: a lesson in review or draft is still changing, so its hash would move during the pilot and it has no QA baseline in the app to compare with.
- No Life Hacks: none of the 200 is published. All of them import shared engines outside the kit contract (`@/components/lifehacks/*`, `@/lib/lifehacks/*`), and those engines are still changing under the W3 and W4 waves (branch `lhw3`). They need their own versioned engine bundle, like the geo kit (finding F2). That design is not in this pilot.
- Not in an open board item: a fix in flight would re-hash the lesson for a reason that has nothing to do with the pilot. This dropped `throw-it-fast-enough`, a SPIKE-001 lesson (it is in review and named in W-225 and W-469 to W-471), and `euclid-three-steps`, the only `@/kit/sequence` user (W-601, W-603, W-630).

**Quotas** are proportional to each domain's published count, with geography raised to 8 because it carries the geo kit: cs 8, economics 5, math 5, probability 5, life 5, chemistry 5, ai 5, physics 4, geography 8.

**Inside a domain,** coverage picks come first: a runtime `d3-geo` import and a geo-kit lesson (geography only), then a lesson with `vh`/`dvh` units, one with no CSS module, one with a local module, and one that uses `@/kit/random`. The rest are filled in the order of `sha256("a2-pilot:" + slug)`, so that nobody chooses them by hand. Two SPIKE-001 lessons (`why-seven-wins`, `bearing-spiral-to-the-pole`) and the spike's largest bundle (`parallel-of-most-land`, 8,328 B gz) are always in, so that bundle hashes and sizes can be compared with the spike's webpack builds (ADR-010, condition 5).

**What the 50 cover:** 6 geo-kit lessons (1 with a runtime `d3-geo` import); 18 with `vh`/`dvh` units (312 of 965 lessons have them, and inside a frame `dvh` is the frame's height); 32 with `:global(...)` CSS on kit classes; 5 with local modules; 9 with `@/kit/random`; 1 with no CSS module; every published domain outside the four small ones. **Not covered:** `@/kit/sequence` (its only lesson is excluded above; the kit contract fixture covers it) and Life Hacks engines.

**If a pilot lesson changes during the pilot,** it stays in and is rebuilt, and its re-QA counts toward the QA line, because that is the case the line is for. If it is unpublished or withdrawn, the next lesson in hash order in the same domain replaces it, and the replacement is recorded with its date in the slug file.

| # | Domain | Slug | Why chosen | Flags | Demo.tsx |
|---|---|---|---|---|---|
| 1 | probability | `why-seven-wins` | SPIKE-001 lesson (hash comparison) | local dvh | 5560 B |
| 2 | geography | `bearing-spiral-to-the-pole` | SPIKE-001 lesson (geo kit) | geo | 7531 B |
| 3 | geography | `parallel-of-most-land` | largest spike bundle (8,328 B gz) | geo | 5160 B |
| 4 | cs | `one-bit-avalanche` | first dvh lesson in its domain | local dvh | 6087 B |
| 5 | cs | `pairs-cancel-under-xor` | first kit/random lesson | random | 10381 B |
| 6 | cs | `binary-search` | hash order |  | 11131 B |
| 7 | cs | `coin-greedy-trap` | hash order |  | 7548 B |
| 8 | cs | `fib-call-explosion` | hash order |  | 8260 B |
| 9 | cs | `euclid-leftover-rectangle` | hash order |  | 5782 B |
| 10 | cs | `skip-the-edge-that-loops` | hash order |  | 8750 B |
| 11 | cs | `back-button-stack` | hash order |  | 6072 B |
| 12 | economics | `free-rider-pot` | first kit/random lesson | random | 8293 B |
| 13 | economics | `shade-your-sealed-bid` | hash order |  | 6397 B |
| 14 | economics | `bond-seesaw` | hash order |  | 5955 B |
| 15 | economics | `price-floor-glut` | hash order |  | 6966 B |
| 16 | economics | `rate-up-one-point` | hash order |  | 6767 B |
| 17 | math | `two-squares-become-one` | first dvh lesson in its domain | dvh | 6303 B |
| 18 | math | `seven-odds-leave-one` | hash order |  | 4889 B |
| 19 | math | `pi-is-three-and-a-bit` | hash order |  | 6863 B |
| 20 | math | `domino-chain` | hash order |  | 5569 B |
| 21 | math | `times-can-shrink` | hash order | dvh | 7361 B |
| 22 | probability | `more-copying-bigger-stars` | first kit/random lesson | random | 11611 B |
| 23 | probability | `double-after-every-loss` | hash order | local dvh | 5892 B |
| 24 | probability | `longer-series-fewer-upsets` | hash order | local dvh | 3900 B |
| 25 | probability | `four-rolls-one-six` | hash order | local dvh | 5022 B |
| 26 | life | `slow-across-a-room` | first dvh lesson in its domain | dvh | 7135 B |
| 27 | life | `outbreak-can-fizzle-above-one` | first kit/random lesson | random | 8073 B |
| 28 | life | `quiet-decades-then-everywhere` | hash order | dvh | 4872 B |
| 29 | life | `bigger-beetles-everyone-loses` | hash order | dvh | 8811 B |
| 30 | life | `antibiotic-already-there` | hash order | dvh random | 6929 B |
| 31 | chemistry | `who-runs-out-first` | first dvh lesson in its domain | dvh | 6038 B |
| 32 | chemistry | `dilute-until-none-left` | first kit/random lesson | random | 8219 B |
| 33 | chemistry | `one-in-75-lets-go` | hash order |  | 5282 B |
| 34 | chemistry | `cold-pack-takes-heat` | hash order |  | 4776 B |
| 35 | chemistry | `yield-not-mass-in-mass-out` | hash order |  | 5375 B |
| 36 | ai | `long-answers-lose-the-product` | first dvh lesson in its domain | dvh | 7691 B |
| 37 | ai | `pixel-nudges-add-up` | first kit/random lesson | random | 6967 B |
| 38 | ai | `income-in-dollars` | hash order |  | 7736 B |
| 39 | ai | `patrol-feedback-loop` | hash order |  | 7259 B |
| 40 | ai | `near-the-wall` | hash order | random | 8294 B |
| 41 | physics | `higher-orbit-slower` | first dvh lesson in its domain | dvh | 5733 B |
| 42 | physics | `sound-in-the-jar` | first kit/random lesson | dvh random | 6057 B |
| 43 | physics | `toaster-trips-breaker` | hash order | dvh | 7626 B |
| 44 | physics | `light-at-double-distance` | hash order | dvh | 6337 B |
| 45 | geography | `four-lines-one-continent` | runtime d3-geo import | geo d3-geo no-css | 8710 B |
| 46 | geography | `coastline-ruler` | first dvh lesson in its domain | geo dvh | 7072 B |
| 47 | geography | `june-sunshine-pole-or-equator` | hash order |  | 8795 B |
| 48 | geography | `fifty-hour-monday` | hash order | geo | 8035 B |
| 49 | geography | `london-december-noon-sun` | hash order |  | 8726 B |
| 50 | geography | `equinox-twelve-everywhere` | hash order | geo | 7418 B |

### 3. What the pilot builds (the smallest thing that measures the lines)

- **The builder: `tools/lesson-build/`** (tier 1, new), on esbuild per ADR-010. It builds `kit@1` (React, `react-dom/client`, `react/jsx-runtime`, `Lesson`, `controls`, `milestones`, `random`, `sequence`, `Illustration`, the bridge), the geo kit with its atlases as separate hashed JSON assets (SPIKE-001 change 6), each pilot lesson's JS and CSS, one frame document per lesson version, and a pilot manifest. It replaces `spike/build.mjs`'s use of `next/dist/compiled/*` (SPIKE-001 change 5). `src/kit/progress.ts` is swapped for the frame-side bridge at build time, as in the spike, so `src/kit/**` and the protected `src/kit/Lesson.tsx` are not edited.
- **The host: the existing `/spike` route.** It is already guarded (404 in production unless `SPIKE_ENABLED=1`, with the lesson origin taken from a server-side allow-list; W-477, reviewed). The pilot makes it read the pilot manifest. No new `page.tsx` is added, because a new route is new public surface (tier 2 in paths.json).
- **The lesson origin: `http://127.0.0.1:<port>` while the host is `http://localhost:<port>`.** These are different sites, so the host's cookies are not sent to the lesson origin. That reproduces the separate registrable domain of SPIKE-001 finding 2 without buying one. The pilot server sends the frame CSP as an **HTTP header** as well as the meta tag (SPIKE-001 finding 1). The production domain (W-086) and the privacy review stay before production, not before the pilot.
- **The bridge:** SPIKE-001 change 3, the six messages as a typed and versioned spec (v1). The host validates by source window and slug, and the host owns progress through the kit's existing exports. Navigation keys are forwarded over the bridge.
- **Nothing changes for learners.** Pilot lessons stay in `loaders.generated.ts` and are served in the app as today, and no gate changes. That is how the pilot keeps the review's rule: "no lesson migrates and no gate changes until W-085, W-086, the W-087 amendment and founder question 6 are done". In this addendum, the only term is **"pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)"**. Principal-engineer accepted that reading with condition P-5 (section 9, question 2; section 12).

### 4. How lesson CSS travels with its bundle (so that `/` carries at most 10 stylesheets)

- **Today (after A1):** `/` links 1 stylesheet. When a card mounts, its lesson's CSS comes with the lesson's chunk, so the number of stylesheets in the host document grows with the cards viewed. I believe that from how Turbopack splits `import()` chunks; I have **not** measured it. The first measure run counts it (section 5, line 3), because it is the in-app comparison for the pilot.
- **In the pilot:** each lesson's CSS module goes through esbuild's `local-css` loader into one hashed file, `/l/<sha256>.css`, next to `/l/<sha256>.js`. The lesson's frame document links it with `integrity`, and the frame CSP allows styles from the lesson origin only. The kit's CSS (`kit.css`: the lesson-contract rules of `src/app/globals.css` plus `frame.css`, which resets `overscroll-behavior`) is generated by the tool from `globals.css`, hashed, and linked by every frame document. `globals.css` itself is not edited (B4 in the same batch is editing it for tap targets).
- **So the host never links or adopts any lesson CSS.** Lesson styles live only inside frames, and the host's stylesheet count is the app's own (1 today) however many pilot cards are viewed. The ≤ 10 line then works as a guard: kit CSS growth goes into frames, not into the host.
- **Why a separate file and not CSS injected by the bundle** (the spike used constructable stylesheets): it is esbuild's native output, it is content-addressed and SRI-checked like the JS, and it needs no runtime injection code. Injection stays the fallback if a frame's first paint suffers from the extra request (measured by the warm-line proxy).
- **`dvh` inside frames:** a frame is sized to its card, and the card is `100dvh` of the host, so `dvh` inside the frame equals the host's in the feed and on the single-lesson page. The 18 pilot lessons with `vh`/`dvh` are checked by running `tools/reveal-fit.mjs` on both paths. Any lesson whose reveal crop changes is listed in the checkpoint record.
- **W-669** (the CSS strategy EDD) is answered by A1 (751 stylesheets to 1) plus this section. I ask the chief of staff to close it once the runtime count in section 5, line 3 confirms it, citing this addendum.

### 5. The return lines, one measure command each

Every timing on this host is taken as the median of 3 runs, with the load average and CPU time (user + sys) recorded, because the host is shared. Ports and dist directories are per run (`NEXT_DIST_DIR=.next-a2`). `tsconfig.json` is reverted after any `next build`, and the dist directory is deleted afterwards.

| # | Return line (agenda item 5) | Measure command | Passes when | Measurable here? |
|---|---|---|---|---|
| 1 | App build at most 5 min, whatever the lesson count | `/usr/bin/time -f '%e s wall, %U+%S s cpu' env NEXT_DIST_DIR=.next-a2 npx next build` on a scratch clone at the integrated tip whose `loaders.generated.ts` leaves out the pilot slugs (written by `tools/lesson-build`, never committed; `tools/registry.mjs` and `tools/company.mjs` are not edited), followed by `node tools/lesson-build/build.mjs --slugs=company/engineering/edd/EDD-003-a2-pilot-slugs.txt --timings` | app build ≤ 300 s wall; **0** pilot `Demo` modules in the app's client-reference manifests (`grep -c` of the pilot paths in `.next-a2/server/app/**/*client-reference-manifest.js`); each lesson bundle ≤ 10 s. The per-lesson app-build cost is the CPU difference between the clone with and without the 50, divided by 50. **Pass criterion and reporting: P-2, section 12** (2026-10-16), which governs where this cell differs | **yes** |
| 2 | At most 30 s of QA per changed lesson | `/usr/bin/time -f %e env QA_ONLY=<changed slugs> npx playwright test -c tools/lesson-build/qa/playwright.config.ts`, with the host and the lesson origin already running. "Changed" is chosen by the selector rule in P-1 (section 12, 2026-10-16), not by the frame-document hash. Wall time ÷ changed lessons | ≤ 30 s per lesson for 1 changed lesson and for 5 changed lessons, **and** the kit-minor re-QA count computed by the tool (P-1 (a) to (c), section 12) | **yes** (SPIKE-001: 25.9 s for 3 lessons × 2 viewports) |
| 3 | `/` at most 10 stylesheets | `node tools/lesson-build/measure.mjs styles --url=http://localhost:<port>/` (the static count, which is the same as `curl -s <url> \| grep -o '<link[^>]*rel="stylesheet"' \| wc -l`, plus the runtime count `document.styleSheets.length + document.adoptedStyleSheets.length` in the host after scrolling all 50 pilot cards on `/spike`), run on `/` and on the pilot feed | static ≤ 10, and the host's runtime count ≤ 10 after 50 pilot cards | **yes** |
| 4 | Warm frame at most 300 ms on a phone | Definition (principal-engineer, 2026-10-14): with the active card ±1 frames pre-created, the next card handles its first input ≤ 300 ms after the snap settles, and paints first ≤ 100 ms after it. On a phone: `node tools/lesson-build/measure.mjs warm --cdp=<endpoint> --runs=7`, where `<endpoint>` is an Android Chrome reached by remote debugging over USB (`adb forward tcp:9222 localabstract:chrome_devtools_remote`); iPhone through Safari's Web Inspector, read from `performance.mark` pairs that the host and the bridge write | ≤ 300 ms and ≤ 100 ms, median of 7, on a mid Android phone **and** an iPhone | **no: stop** (section 0). The host proxy, `node tools/lesson-build/measure.mjs warm --emulate="Pixel 7" --cpu-throttle=4 --runs=7`, is recorded but is **not** this line |

`tools/lesson-build/measure.mjs` and the frame QA copy do not exist yet. They are built in run R5 (section 8). Each command above is written so that the run that builds the tool cannot redefine the line.

### 6. W-085: the real-device run, as a precondition on the warm line

The warm line is passed or failed only on W-085's numbers. W-085 needs three things that this host does not have:
1. **A mid Android phone and an iPhone.**
2. **A URL the phones can reach**, serving the host and a separate lesson origin. The options are: (a) a Vercel preview, which is a deploy, so the founder approves each one and the release manager runs it; (b) a tunnel from this host, which is a new tool and an outside vendor, so it needs a decision record and the founder; (c) a device cloud, which costs money, so the founder decides.
3. **A person, or a remote-debugging link, to drive the phone** and read the marks.

Every option needs the founder. To keep it off First Light's path (section 9), I propose that the ask goes to the founder through the chief of staff **after the First Light go/no-go (2026-11-23)**, unless the release manager says that a pilot page on an already approved First Light preview costs them nothing. Until W-085 reports, the checkpoint records the warm line as **"not measured on a phone"** with the proxy number beside it. The pilot then **holds at the checkpoint**: it neither falls back to A2-a nor continues past 25 lessons. Falling back on a proxy number would be a decision without evidence. Continuing would spend the rest of the pilot line before its riskiest line is known.

### 7. The QA contract change the frame needs (an ask to evaluation-steward, W-087; not an edit to `tests/qa`)

This is drafting input for the steward's amendment. The steward writes the gate text, and the constitutional review ratifies it. Proposed contents:
1. **The lesson list** (`tests/qa/lessons.ts`): each lesson says where it runs, `host: "app" | "frame"`, and for a frame, its frame-document hash, read from the manifest.
2. **The contract** (`tests/qa/contract.spec.ts`): for a frame lesson, every lesson locator is taken from `page.frameLocator('iframe[data-slug="<slug>"]')`. `stageFingerprint` accepts a page or a frame locator. The overflow check runs on the frame's root and on the host. `page.keyboard`, screenshots and `pageerror`/console capture stay as they are (SPIKE-001: they work through frames). **No test id and no test name changes** (renaming kit test ids is constitutional, and no role may do it).
3. **Evidence:** a QA record for a frame lesson cites its frame-document hash. That hash pins the lesson's JS, its CSS, the kit and the geo kit. This is the EDD's amendment 2, and principal-engineer has ruled that it changes what a gate demands (it is stricter), so it is a real amendment.
4. **Security:** SPIKE-001's negative test (19 probes after a positive control) becomes part of the contract. It runs once per kit major and on every change to the host bridge.
5. **Kit releases:** a kit minor re-runs the kit contract on one fixture lesson per kit major, plus a sample. The steward sets the sample. Principal-engineer's proposal is max(30, 5%), stratified, with at least one lesson per domain and every geo lesson if the geo kit changed.
6. **Screenshots:** frame content rasterises slightly softer in Playwright (SPIKE-001), so evaluators should know this before they judge a contact sheet.

Until the amendment is ratified, the pilot's frame QA copy lives in `tools/lesson-build/qa/` with its own Playwright config. It is **not** gate evidence and files no QA record, and it is deleted when the amendment lands. The root `playwright.config.ts` (tier 2) is not edited.

### 8. Run plan to the 1.2M checkpoint

The tranche is 2.45M, with the checkpoint at 1.2M (the agenda's checkpoint is "A1 merged and 25 lessons", which this plan reads as 25 lessons pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served), per P-5 in section 12; A1 is merged, 0d76ae1). The ledger shows 0k spent on `scale-stage-1` (A1 was spent outside it). Unit costs are from the agenda and the First Light re-estimate: a code run about 0.11M, a principal-engineer review about 0.07M, a readiness record about 0.08M, a QA run about 0.03M. Each figure is an estimate, and the ledger records what was actually spent.

**Gates before any build run:** G1, principal-engineer's tier-2 review of this addendum and ADR-010. G2, the founder's decision on W-485 (esbuild). G3, `accounts` merged (it changes `package.json` and the lockfile too). G4, principal-engineer-ops approves the readiness record for the `package.json` change (tier 2). G5, a builder slot outside 2026-10-28 to 2026-11-06.

| Run | Role | What | Est. | Cum. | Needs |
|---|---|---|---|---|---|
| R0 | platform-engineer | This addendum, ADR-010, the dependency record (B3) | 0.30M | 0.30M | |
| R1 | principal-engineer | Tier-2 review of this addendum and ADR-010, answering section 9's questions | 0.07M | 0.37M | not in 10-26 to 11-09 |
| R2 | platform-engineer | Readiness record for the dependency (tier 2), approved by principal-engineer-ops in their own run | 0.13M | 0.50M | G1 |
| R3 | platform-engineer (build) | Add the pin. `tools/lesson-build`: `kit@1`, geo kit, every lesson outside Life Hacks through the import scan, two clean builds compared byte for byte, and the screenshot comparison of the 3 spike-lineage lessons plus 5 pilot lessons against the spike's webpack builds (ADR-010, condition 5) | 0.11M | 0.61M | G2 to G5 |
| R4 | platform-engineer (build) | Frame documents, the pilot manifest, `/spike` reading it, the 127.0.0.1 lesson origin with the CSP header, bridge v1, host-side progress | 0.11M | 0.72M | R3 |
| R5 | platform-engineer (build) | The frame QA copy and `measure.mjs` (build, qa, styles, warm proxy); the in-app runtime stylesheet count | 0.11M | 0.83M | R4 |
| R6 | qa-tester (lane 10) | The frame QA copy on the 25 checkpoint lessons, phone and desktop, plus the reveal-fit comparison on both paths. A measurement run, not gate evidence | 0.03M | 0.86M | R5 |
| R7 | platform-engineer (fix) | Fixes from R6 | 0.11M | 0.97M | R6 |
| R8 | principal-engineer | Code review of the tier-2 parts (`/spike` host, bridge, `package.json`) | 0.07M | 1.04M | R7; not in 10-26 to 11-09 |
| R9 | platform-engineer | Measures lines 1 to 3 and the warm proxy; writes the checkpoint record in `company/engineering/notes/` | 0.11M | 1.15M | R8 |
| | | Margin | 0.05M | **1.20M** | checkpoint |

**At the checkpoint,** principal-engineer applies the stop rule (below) to the record of R9, and the portfolio-manager updates the register. The rest of the pilot line (about 0.69M: the other 25 lessons, a second QA run, the second fix run, the steward's two amendment drafts, the W-085 device run) is not planned here. It depends on the checkpoint and on section 6.

**Realistic dates:** R1 and R2 can run this week. R3 to R7 need `accounts` merged (G3) and builder slots outside 10-28 to 11-06 (G5). If `accounts` has not merged by about 10-24, the build runs move after 11-09, and the checkpoint lands after the First Light go/no-go. That is the stop rule working as written, not a slip of this plan.

### 9. The stop rule, word for word, and how this plan keeps it

From company/ceo-office/2026-10-14-project-review-1-agenda.md, item 5 re-sized:

> **Stop rule:** at the checkpoint, fall back to same-origin `import()` (A2-a) if warm stays over 300 ms after preloading. Abandon A2 if build and QA are not on those lines. Revert A1 if the JS does not drop. Stop any stage-1 work that blocks a First Light go/no-go item.

How each clause is evaluated:
- **"Fall back to A2-a if warm stays over 300 ms after preloading"** needs a phone number (section 6). Without one, the pilot holds at the checkpoint (it does not fall back on a proxy).
- **"Abandon A2 if build and QA are not on those lines"** is lines 1 and 2 in section 5, both measurable here.
- **"Revert A1 if the JS does not drop"** has already been answered: first-load JS on `/` went from 2,751,699 B to 230,185 B gz (readiness record). There is nothing for the pilot to measure.
- **"Stop any stage-1 work that blocks a First Light go/no-go item."** The First Light re-estimate (company/engineering/notes/2026-10-16-first-light-reestimate-full-scope.md, section 3) names the binding resources. This plan stays off each one:
  - **Principal-engineer reviews:** about 11 between 10-26 and 11-09. The pilot's 2 reviews (R1, R8) fall outside that window.
  - **The privacy reviewer:** about 9 runs, five on or beside the accounts path. The pilot asks for **none** before production (127.0.0.1 origin; W-086 stays a production precondition).
  - **Builder slots, 10-28 to 11-06:** about 33 runs against 3 slots. The pilot asks for **none** in that week (G5).
  - **The accounts merge:** the dependency lands after it (G3), so the accounts rebase and its C11 audit never see esbuild.
  - **Shared files:** the pilot does not edit `src/kit/**`, `src/kit/progress.ts`, `src/components/DemoHost.tsx`, `src/lib/catalog.ts`, `globals.css` or any deploy path.
  - **Founder decisions:** the pilot adds none before 11-23 except W-485, which has been in the founder's queue since 10-14. The W-085 device ask waits until after 11-23 (section 6).
  If any of these stops holding, the run that finds it stops and writes which one.

**Questions for principal-engineer's tier-2 review:**
1. May pilot build runs (R3 to R7) start before W-085 has a way to reach a phone, given that the warm line holds the checkpoint (sections 0 and 6)?
2. Is "pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)" an acceptable reading of the agenda's 25-lesson checkpoint and of the review's "no lesson migrates until …" (section 3)? *(Wording changed under P-5, 2026-10-16; answered yes with P-5.)*
3. Is the 127.0.0.1 lesson origin enough to stand in for W-086 off production (section 3)?
4. Should `/spike` be reused as the pilot host (already guarded, W-477), or should the pilot get its own route, which would be a new tier-2 surface?
5. Life Hacks engines as a versioned shared bundle (finding F2): before tranche 2, or never (Life Hacks stays in the app)?

### 10. Findings for principal-engineer (inputs, not decisions)

- **F1. After A1, two stage-1 triggers no longer fire on the latest measurements.** The build went from 7.1 min (879 lessons, before A1) to 2 m 27 s to 3 m 19 s (960 lessons, after A1), against the 10-min trigger. Full QA went from about 2.6 h to 55.1 min, against the 2-h trigger. These come from principal-engineer-ops' readiness record, not from my own measurement. The 1,000-lesson trigger is 35 lessons away. What still argues for stage 1 is that a kit change re-tests every lesson (55 min), and that the build and QA keep growing with lessons. This bears on B1's position for scale-stage-1 and on the forum's return lines, two of which are already met (section 1). I raise it as evidence. It is not an objection from me.
- **F2. The EDD's "would be wrong if" (3) is at about 22%.** 212 of 965 lessons import code outside the kit contract: 200 Life Hacks lessons through shared engines, plus 10 geography lessons through `d3-geo` or `geojson`, of which only 4 are runtime imports (the geo kit covers them). The EDD's threshold was about 20%. If the Life Hacks engines become a versioned shared bundle like the geo kit, the figure is 0%. This needs a ruling before tranche 2 (question 5), not before the pilot.
- **F3. 312 of 965 lessons use `vh` or `dvh` units.** Section 4's reasoning says frames do not change them in the feed. The pilot's 18 test that reasoning.
- **F4. `npm audit` (dev included) already reports 33 advisories,** 1 critical and 24 high, all in the `vercel` CLI tree. `npm audit --omit=dev` is 0. They are not caused by this work. They are for principal-engineer-ops' risk register, because the suggested fix moves `vercel` a major version, which is a deploy-path change (dependency record).

### 11. What would make this addendum wrong

- The in-app runtime stylesheet count (section 4) turns out to stay at 1 however many cards are viewed. Then line 3 does not separate the two paths, and only the static count matters.
- esbuild's `local-css` output changes how lessons look (ADR-010, condition 5).
- The per-lesson app-build cost of the 50 (line 1) is within the noise of a shared host. Then the "whatever the lesson count" half needs a quiet host or a larger set, and the checkpoint record must say so rather than claim it.
- A phone becomes reachable from this host (for example, a founder-provided device link). Then section 0's stop no longer applies, and the warm line moves into the plan before the checkpoint.

### 12. Conditions P-1, P-2 and P-5 written in (2026-10-16, platform-engineer; clears G1 once principal-engineer re-reads these lines)

Source of every line here: principal-engineer's tier-2 review, [2026-10-16-edd-003-a2-pilot-review.md](../reviews/2026-10-16-edd-003-a2-pilot-review.md), section "Conditions" (and finding 1 for P-1, finding 2 for P-2, finding 4 and Q2 for P-5). Batch: company/ops/dispatch-requests/2026-10-16-r3-engineering.md#B3 · board W-1245. Where this section and the table in section 5 differ, this section governs. Outside these three lines, the only edits to the addendum are the P-5 wording changes in sections 1, 3, 8 and 9 and two pointers in section 5's table (rows 1 and 2), each saying "P-1" or "P-2" or "P-5". P-3, P-4 and P-7 are not written here: they are checks at R8 (code review), carried in the R2 readiness record ([2026-10-16-a2-esbuild-pin.md](../readiness/2026-10-16-a2-esbuild-pin.md)). P-6 (checkpoint 1.2M, R0 to R9) is already section 8's figure.

- **P-1 (2026-10-16; review, Conditions P-1 and finding 1). Separate hashes, the selector rule and the three checkpoint figures.**
  - **Separate hashes in the manifest.** Each pilot manifest entry records, as separate sha256 fields: `lessonJs` (the lesson's `/l/<sha256>.js`), `lessonCss` (its `/l/<sha256>.css`, or `null` when the lesson has no CSS module), `kit` (the `kit@1` bundle), `kitCss` (the generated `kit.css`), `geoKit` (or `null` for a lesson that does not import it), `buildSettings` (the sha256 of the settings file of ADR-010 decision 4, including the esbuild version), and `frameDoc` (the frame document). The frame document still links every one of these with `integrity`, so `frameDoc` still pins the lesson's JS, its CSS, the kit and the geo kit, exactly as section 7.3 says. The component hashes are additional fields read from the same build. Section 7.3's design is unchanged, so the stop condition "P-1 cannot be specified without changing §7.3" does not fire.
  - **The changed-lesson selector rule** (in `tools/lesson-build/measure.mjs`, built at R5; it compares the candidate manifest with the base manifest entry by entry):
    1. **Lesson change:** `lessonJs` or `lessonCss` differs → that lesson is selected. This is the only class that line 2's per-lesson time is measured on.
    2. **Kit minor:** `kit`, `kitCss` or `geoKit` differs, and the kit major is the same → the steward's sample rule picks the lessons: max(30, ceil(5% of N)), capped at N, stratified with at least one lesson per domain, plus every geo-kit lesson if `geoKit` changed. Until the steward sets the rule (W-087), the tool uses principal-engineer's proposal above. The order inside a stratum is `sha256("a2-sample:" + <new kit hash> + slug)`, so no one picks the sample by hand and the same change always gives the same sample.
    3. **Toolchain change:** `buildSettings` differs (an esbuild bump or a settings change) → treated like a kit major, as ADR-010 decision 4 and the dependency record say: every lesson is reported as selected, and the record says so. It is not counted as a lesson change, even though every `lessonJs` hash moves.
    4. **Frame document only:** `frameDoc` differs and no component hash does (the frame template or the CSP changed) → treated as a kit minor (rule 2), plus SPIKE-001's negative test once (section 7.4).
    5. A lesson that falls under rule 1 and rule 2 at once is selected by rule 1 and also counts toward rule 2's sample.
  - **The checkpoint record (R9) reports three figures:**
    - **(a)** the per-bundle QA time for a lesson change, **measured**: wall time ÷ selected lessons for 1 changed lesson and for 5 changed lessons, median of 3 runs, with the load average.
    - **(b)** how many lessons a kit-minor change re-QAs under the pilot, **computed by the tool** from a real kit-minor manifest diff (`node tools/lesson-build/measure.mjs select --base=<manifest> --next=<manifest> --report`): at the 25 checkpoint lessons (the rule gives min(25, max(30, 2)) = 25, all of them), and projected at 965 lessons: max(30, ceil(48.25)) = 49, against 965 today. The 965 figure is labelled **"projection"** in the record. The tool prints it from the same function that selects, with N set to 965 and the domain counts from the registry. The two numbers in this line are my hand check of the rule, for the reviewer. They are not the figure the record reports.
    - **(c)** the same count for the app: every lesson (965, through `tools/qa-changed.mjs`, which selects all lessons for any kit or shell change), with the measured full-QA time beside it (55.1 min on 2026-10-15, re-measured at R9 per section 8).
  - **Line 2 passes only if** (a) is ≤ 30 s for both the 1-lesson and the 5-lesson runs **and** (b) is printed by the tool. A hand-computed (b) fails the line.

- **P-2 (2026-10-16; review, Conditions P-2 and finding 2). Line 1's pass criterion.** Line 1 passes when all three hold: (i) the app build, on the scratch clone that leaves the 50 out, is ≤ 300 s wall (median of 3); (ii) `grep -c` of the 50 pilot `Demo` paths in `.next-a2/server/app/**/*client-reference-manifest.js` is **0**; (iii) every lesson bundle is ≤ 10 s, and the record gives the actual largest and median figures (the spike's were well under 1 s). The per-lesson CPU difference (the clone with the 50 minus the clone without, ÷ 50) is **reported, not passed or failed**, together with its run-to-run spread (max − min of the 3 runs of each clone). If the difference is inside the spread, the record says **"not resolved on this host"**. It is never rounded to a pass, and the line's pass rests on (i) to (iii) only.

- **P-5 (2026-10-16; review, Conditions P-5, finding 4 and Q2). One term.** Every record of this pilot uses **"pilot-migrated (built, hosted and passing the frame QA copy on the pilot path; not served)"**, and never the word without its "pilot-" prefix. A later sentence in the same record may shorten it to "pilot-migrated", never further. That covers this addendum (sections 1, 3, 8 and 9 were reworded on this date), the slug file (header comment added on this date), the R9 checkpoint record, and the register line. The register is the portfolio-manager's: the review's board ask carries the wording there. Check: a grep for the word on this file and on the slug file finds it only as "pilot-migrated" (the done-when of company/ops/dispatch-requests/2026-10-16-r3-engineering.md#B3). The words "migrate" and "migrates" in quotes from the 2026-10-13 rule are left as quoted.
