# SPIKE-001: lessons as content-hashed bundles in a sandboxed cross-origin iframe

owner: platform-engineer (Noor) · for: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md) stage 1 · board: W-074 · date: 2026-10-13 · status: done (scratch branch, never merged)
Founder decision (2026-10-13): lesson code runs in the browser, in a sandbox, not on the server.
Raw numbers: [SPIKE-001-results.json](SPIKE-001-results.json). Review: [2026-10-13-eng-review-lesson-storage.md](../../rituals/records/2026-10-13-eng-review-lesson-storage.md).

## Verdict: GO WITH CHANGES for EDD-003 stage 1

The sandboxed-iframe host (A2-b/A3) works for all three lessons in Chromium. The budgets that can
be measured here pass: bundle size, kit size, cold latency and memory. The negative security test
passes, judged from both the frame side and the host side. The QA contract drives lessons inside
the frame with locator changes only. Rollback is a manifest pointer change. The changes listed at
the end are required before stage 1. Two of them are blocking: a separate registrable domain for
lessons, with CSP sent as a header; and a real-device run on iOS Safari and Android Chrome. This
spike used Chromium emulation only.

## What was built (all under `spike/` and `src/app/spike/`; no lesson, kit, gate or tests/qa file changed)

| Piece | File |
|---|---|
| Builder: kit, geo kit, lessons, frame documents, manifest | `spike/build.mjs` (+ `spike/tooling/ts-loader.cjs`, `css-module-loader.cjs`) |
| Shared kit bundle (React + react-dom/client + Lesson, controls, milestones, random) and frame runtime | `spike/kit/entry.ts`, `spike/kit/boot.js`, `spike/kit/frame.css` |
| Frame-side progress/events bridge, swapped in for `src/kit/progress.ts` at build time, so `Lesson.tsx` is byte-for-byte unchanged | `spike/kit/progress-bridge.ts` |
| Geo kit as its own bundle | `spike/kit/geo-entry.ts` |
| Second origin ("CDN", :3141): CORS, immutable caching, `frame-ancestors`, gzip | `spike/cdn-server.mjs` |
| Host page on the app origin (:3140): scroll-snap feed or a single card, bridge validation, host-side progress | `src/app/spike/page.tsx`, `src/app/spike/SpikeHost.tsx` |
| Manifest publish/rollback CLI, rollback drill | `spike/manifest.mjs`, `spike/rollback-drill.mjs` |
| QA contract copy through `frameLocator`, negative security test | `spike/qa/contract-frame.spec.ts`, `spike/qa/security.spec.ts`, `spike/qa/playwright.config.ts` |
| Hostile lesson-shaped fixture (not a lesson, not in `src/demos`) | `spike/fixtures/hostile/Demo.tsx` |
| Timings, memory, gestures | `spike/measure.mjs` |

Shape:
- Each lesson builds alone into `/l/<sha256>.js`. `react`, `react/jsx-runtime` and `@/kit/*` stay external and import from `@s3c/kit@1`. Kit modules are exported as namespaces (`kit.react`, `kit.kit_Lesson`, …).
- A frame document `/f/<sha256>.html` per lesson version pins the exact kit file through an import map with `integrity` (SRI for every module), a meta CSP (`default-src 'none'`, `connect-src 'none'`, the import map allowed by its hash), modulepreloads and the boot script.
- The manifest maps slug → frame and bundle hashes, kit version and slim card fields. It is the only mutable file. `builds.json` keeps every built version.
- Bridge messages, frame → host: `ready`, `phase` (observed from `data-phase`), `track` (the kit's events), `progress`, `resize`, `error`. The host accepts a message only if `ev.source` is that card's own frame window, then checks the slug and the event type. Every sandboxed frame has origin `"null"`, so the origin identifies nothing. Progress is merged into the host's `localStorage` under host rules.

## Numbers vs budgets

Machine: 4 vCPU, **shared with other agents (load average ~30 during the timing runs)**. Absolute
times are pessimistic; the comparisons were measured on the same machine at the same time.
Chromium 141, Playwright Pixel 7 emulation, median of 7 runs.

**Size** (minified; gzip -9 / brotli)

| Artifact | Raw | Gzip | Budget | |
|---|---|---|---|---|
| why-seven-wins | 5,899 B | **2,502 B** | ≤ 15 KB | pass |
| throw-it-fast-enough (local `model.ts`) | 4,809 B | **2,327 B** | ≤ 15 KB | pass |
| bearing-spiral-to-the-pole (geo) | 4,877 B | **2,237 B** | ≤ 15 KB | pass |
| All 348 lessons through the same pipeline | 348/348 built, **0 imports outside the contract** | p50 2,380 · p90 2,834 · p99 3,421 · max 8,328 B (parallel-of-most-land) · 0 over 15 KB | | pass |
| Kit (React 19 + react-dom/client + kit + bridge) | 196,326 B | **61,820 B** (53,024 br) | ≤ 120 KB | pass |
| Kit CSS (globals.css + frame.css) | 9,455 B | 2,653 B | – | |
| Geo kit (d3-geo + topojson + both 1:110m atlases), one copy for 35 lessons | 204,255 B | **71,368 B** (49,700 br) | separate | today: ~420 KB gz duplicated in 3 chunks (EDD-003) |
| Frame document | ~2.0 KB | ~0.9 KB | – | |

The first lesson costs about 68 KB gzip over the wire (kit + CSS + frame + lesson), plus 71 KB for
the first geo lesson. Every later lesson costs about 3.4 KB (frame + bundle).

**Build.** Unloaded: 0.14 to 0.67 s per lesson and 7 s for the kit (EDD target ≤ 10 s per changed
lesson: pass). Under load: 1.2 to 1.6 s per lesson. All 348 lessons took 225 s wall, in batches of
24 under load, against 73 s for today's whole app build (EDD, unloaded). So a full rebuild costs
more in total; the per-change build is what we pay day to day. Builds are deterministic: two clean
builds gave identical hashes. A kit change did not change any lesson bundle hash, only the frame
documents.

**Latency** (ms; insert = iframe element inserted, ready = the lesson's first render committed)

| | cold insert→ready | warm insert→ready (HTTP cache) | nav→ready `/spike?only=` | nav→lesson today `/d/<slug>` |
|---|---|---|---|---|
| why-seven-wins | 190 | 228 | 448 | 2,223 |
| throw-it-fast-enough | 299 | 319 | 675 | 2,003 |
| bearing-spiral-to-the-pole | 356 | 315 | 641 | 2,167 |
| *4× CPU, frames in-process (Android-like)*: why-seven-wins | 599 | 267 | 1,648 | 5,868 |
| throw-it-fast-enough | 971 | 457 | 2,065 | 5,780 |
| bearing-spiral-to-the-pole | 1,112 | 687 | 2,675 | 7,576 |

- Cold ≤ 1.5 s: **pass** in every case, including 4× throttling.
- Warm ≤ 300 ms: **not met as measured** (228 to 687 ms). "Warm" here means remounting a frame from the HTTP cache. Every frame is a new JavaScript realm that parses and evaluates React and the kit again. The EDD's budget is "interactive after snap with prefetch". The host pre-creates frames for the active card ±1, and those frames report `ready` while still off-screen (verified), so they are interactive before the snap. That after-snap time was **not measured as a number**. It must be measured on a device, together with the first paint after the snap. Chrome pauses rAF and painting in off-screen cross-origin frames.
- The nav→ready comparison is not like-for-like. Today's `/d/<slug>` ships the 1.29 MB all-metas chunk (EDD-001), and the spike host ships none. Read it as "the iframe host adds no visible startup penalty", not as a speed-up.

**Memory** (PSS of all Chromium processes, Pixel 7): blank 261.7 MB · today's feed `/` with 3 lesson
cards mounted **385.8 MB** · `/spike` with 3 frames **327.4 MB** (3 renderer processes vs 2).
In-process: 380.7 vs 309.7 MB. Budget ≤ 1.5× today: **pass (0.85×)**. Again, today's feed carries
the all-metas chunk.

## Security: negative test PASSES (phone and desktop)

`spike/qa/security.spec.ts` loads the hostile fixture next to a real lesson. First, a positive
control: the same secrets **are** readable from host-page code (cookie, localStorage, DOM), so the
probes are able to detect a leak. Then all **19 probes are blocked**. The host checks
independently: secrets unchanged, URL unchanged, no popup, **no request from a frame reached the
host server** (the server log has zero `pwned` hits), and forged messages rejected.

| Blocked by | Probes |
|---|---|
| Sandbox (opaque origin, no `allow-same-origin`/`allow-top-navigation`/`allow-popups`/`allow-forms`) | read/write `document.cookie`, `localStorage`, `sessionStorage`, `indexedDB`, parent/top DOM, parent `localStorage`/cookie, sibling lesson frame DOM, `top.location =`, `window.open`, form `target=_top`, `document.domain =` |
| CSP (`connect-src 'none'`, `img-src 'self'`) | `fetch` with credentials, `sendBeacon`, image beacon (the image request was attempted and cancelled with "csp") |
| Host bridge validation | forged `progress` and `track` for another lesson's slug (both rejected, nothing written) |

Findings that change the design:
1. **The sandbox does not stop network exfiltration. The CSP does.** The CSP lives in a `<meta>` of a frame document that our build writes, not the lesson. Stage 1 must also send it as an **HTTP header from the CDN**, so that no change to the HTML can weaken it.
2. **Cookies ignore ports.** On localhost the host's session cookie was **sent to the lesson CDN** with every frame-document request (201 times). It was never sent with module or CSS requests, and frame code still could not read it. In production the lesson origin must be a **separate registrable domain** (the `googleusercontent.com` pattern), not `lessons.<app domain>`, and app cookies must be host-only (`__Host-`).
3. Host → frame messages can only use `targetOrigin "*"` (the frame's origin is opaque). The host must therefore never post anything private to a frame.

## QA contract through the iframe: WORKS

`spike/qa/contract-frame.spec.ts` is a copy of `tests/qa/contract.spec.ts`. It passes **6/6**
(3 lessons × phone and desktop). The changes: `page.locator(` → `f.locator(` with
`f = page.frameLocator('iframe[data-slug=…]')`; `stageFingerprint` takes the FrameLocator; the
overflow check uses `f.locator(":root").evaluate(…)`, plus an overflow check on the host; a
screenshot dir; and the lesson list. `page.keyboard` (sliders), `page.screenshot`, and
`pageerror`/console capture from frames all work unchanged. The bridge also caught a runtime error
in the frame during development. Wall time was 25.9 s, against 39.7 s for the original contract on
`/d/` for the same 3 lessons (one run, loaded machine). Evaluators should know that frame content
looks slightly softer in Playwright screenshots (the frame is rasterised out of process). Check on
a device. Making this the real contract is an amendment (evaluation steward).

## What broke, or needed a change

| Area | What happened | Stage-1 change |
|---|---|---|
| progress / localStorage in an opaque origin | `localStorage` throws. `progress.ts` guards it, so the lesson would run but **silently lose progress**, and `sendBeacon("/api/events")` would target the CDN (CSP blocks it). | Progress and events cross the bridge, and the host owns storage. Done here with a build-time swap of `./progress`, so the constitutional `Lesson.tsx` is untouched. `updateProgress(slug, fn)` cannot be serialised, so the host merges with its own rules (keeps `completedAt` and `recalls`). |
| CSS modules | Work. They use Next's vendored postcss-modules plugins, with names `<local>_<sha(css)>`, injected through constructable stylesheets, so the CSP needs no `'unsafe-inline'` for styles. The physics `.chip` does not collide with the global `.chip`. `composes` was not exercised. | Keep. |
| Theme variables | `--domain` is passed in the URL fragment (it does not affect cache keys). Light/dark follows `prefers-color-scheme` inside frames. The frame's `color-scheme` must match the host's, or Chrome paints an opaque backdrop. | Bridge or fragment carries the theme. |
| `globals.css` | The frame ships all of it (2.7 KB gz), including app chrome and lesson-specific rules (`.ms-*`). Its `body { overscroll-behavior: none }` would trap the feed swipe inside frames, so the spike overrides it in `frame.css`. | Split into `kit.css` (the lesson contract) and `app.css`. |
| `dvh` units | Inside a frame, `100dvh` is the frame's height, not the screen's (e.g. `.stage-svg { max-height: 46dvh }`). The 3 lessons look the same in screenshots, but any lesson that sizes with `dvh` will shift. | Audit lessons for `dvh`/`vh`. |
| Fonts | Nothing broke: the system font stack loads nothing. | If the app adopts webfonts, serve them from the lesson origin (`font-src 'self'`). |
| d3-geo data size | The geo kit is 71 KB gz and is fetched only by geo lessons, once. It includes `land-110m` (55 KB raw), which bearing-spiral does not use. | Ship atlases as separate hashed JSON assets, or split the geo kit. |
| Off-screen frames | Chrome pauses rAF in off-screen cross-origin frames. A rAF-based `ready` never arrived for the pre-created next card, so the spike posts `ready` at commit. Lesson animations start only when the frame is visible (good for battery). | `ready` must not depend on rAF. |
| Per-frame realm | Each frame evaluates React and the kit again (warm 0.2 to 0.7 s). | Pre-create active ±1 frames. Measure after-snap time on a device. Option: reuse a frame for the next lesson (this trades away isolation between lessons, but frames hold no secrets). |
| Feed gestures | A touch swipe that starts inside a frame **chains to the host's scroll-snap feed** and snaps (5/5 start points in one run, 4/5 in another; today's feed also has dead spots, e.g. on a lesson's SVG). Touch-dragging a slider inside a frame works as it does in the app. ArrowDown with focus inside a frame scrolls the feed natively, but the **host's `j`/`k` shortcuts get no keys**. | Forward navigation keys over the bridge. Real-device check (iOS Safari is the known risk). |
| Bundler | It works with **no new dependency**: Next's vendored webpack 5.98 and terser (`next/dist/compiled/*`), `typescript.transpileModule`, and postcss. But `next/dist/compiled` is a private API that can move with any Next upgrade. | A decision record before stage 1 (below). |
| Browsers | Only Chromium 141 was tested. Import-map `integrity` and iframe scroll chaining are unverified on WebKit and Gecko. | Real-device run before ADR-006. |

## Rollback by hash: WORKS

`node spike/rollback-drill.mjs` pointed `why-seven-wins` at version A, then B, then A. Each repoint
took 1 to 12 ms (write the manifest, then rename it). After each repoint, a fresh learner (empty
cache) got exactly that frame and bundle. Both bundles stayed byte-identical (immutable). No
rebuild was needed. In production the manifest's cache TTL sets the rollback latency (here it is
`no-cache`). Version B is the same source with a build-variant marker: the drill tests the pointer
mechanics, not a content change.

## Dependency decision

**No new dependency was added, and no decision record was written for the spike.** Stage 1 still
needs a bundler decision record (owner: platform-engineer, reviewed by principal-engineer). The
choice is between esbuild as a devDependency, used only by lesson-build tooling, and staying on
Next's vendored webpack. Today's numbers: 0.65 s per lesson in a batch under load; private API.

## Required changes for stage 1 (go-with-changes)

1. **Lesson origin on a separate registrable domain**. App cookies host-only (`__Host-`). CSP sent as a CDN **header** as well as the meta tag, plus `frame-ancestors <app>`. *(blocking; privacy-reviewer, backend-engineer)*
2. **Real-device run** on iOS Safari and Android Chrome: swipe chaining, slider drag, focus, screen reader, and the after-snap and first-paint times. *(blocking for ADR-006; platform-engineer, a11y reviewer)*
3. A typed, versioned bridge spec (the 6 messages above). The host validates by source window and slug, and owns progress and events. *(platform-engineer, backend-engineer)*
4. Split `globals.css` into `kit.css` and `app.css`; override overscroll inside frames; audit `dvh`. *(platform-engineer)*
5. A bundler decision record; stop using `next/dist/compiled/*` before stage 1. *(platform-engineer)*
6. The geo kit as its own versioned bundle, with the atlases split out. *(platform-engineer)*
7. A QA-contract amendment to drive lessons through a FrameLocator in the host, with QA evidence bound to the frame hash. *(evaluation steward)*
8. Redefine the warm budget as "interactive after snap with the active ±1 frames pre-created", and measure it on a device. *(principal-engineer)*

## Reproduce

```
cp -al /home/user/system-3-company/node_modules node_modules     # worktree setup
node spike/build.mjs [--all]                                      # → spike/dist (gitignored), hashes printed
NEXT_DIST_DIR=.next-spike npx next build && git checkout tsconfig.json
NEXT_DIST_DIR=.next-spike npx next start -p 3140 & node spike/cdn-server.mjs --log &
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npx playwright test -c spike/qa/playwright.config.ts
node spike/measure.mjs --runs=7 ; node spike/rollback-drill.mjs
```
