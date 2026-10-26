# Engineering Review: 2026-10-25: content hub branch, production boundary for a stage-1 launch

owner: principal-engineer (Kenji) · tier: 2 (`src/components/DemoHost.tsx` is tier 2 `kit`, `package.json` is tier 2 `build`, the second origin and its headers are tier 2 `deploy`, in `company/engineering/readiness/paths.json`) · date: 2026-10-25
artifact: branch `origin/rnd/content-hub-prototype` at `d35c87dff` (6 commits on merge base `60eaf60ac`, 403 behind `origin/main` at `852829182`) · the branch calls this review W-2028; **on main W-2028 is a different item** (merge hazard H1) · ask: founder, 2026-10-25, "Could [you] work on it and launch it", relayed by the dispatching session
attendees (in writing): none yet. The builder (platform-engineer), qa-tester, privacy-reviewer, evaluation-steward and release-manager get their items below.

- EDD: [EDD-003](../edd/EDD-003-lesson-storage-at-scale.md), stage 1 and the [A2 pilot addendum](../edd/EDD-003-lesson-storage-at-scale.md#addendum-2026-10-16-a2-pilot-stage-1-first-step) · slugs: [EDD-003-a2-pilot-slugs.txt](../edd/EDD-003-a2-pilot-slugs.txt) · prior review: [2026-10-16-edd-003-a2-pilot-review.md](2026-10-16-edd-003-a2-pilot-review.md)
- ADRs: [ADR-003](../adr/ADR-003-no-lesson-code-on-server.md), [ADR-004](../adr/ADR-004-content-addressed-lesson-versions.md), [ADR-005](../adr/ADR-005-independent-lesson-bundles.md), [ADR-006](../adr/ADR-006-sandboxed-lesson-frame.md), [ADR-007](../adr/ADR-007-manifest-is-the-registry.md), [ADR-010](../adr/ADR-010-lesson-bundler-esbuild.md). All still `proposed`.
- Amendment: **none needed for the flag-off merge or for a flag-on preview.** Flag-on **production** needs the evaluation steward's ruling on W-087 (condition C7). `tests/qa/**`, `src/kit/Lesson.tsx` and `tools/company.mjs` are not edited by anything in this plan.

## Verdict

**Go with changes** for a stage-1 production integration: 50 published lessons served from a separate artifact origin in sandboxed frames, behind a flag that is off by default. The changes are C1 to C10 below. Four of them (C2 progress bridge, C3 reveal-fit and fold inside the frame, C6 real-phone check, C7 QA evidence ruling) block **flag-on in production**. None blocks merging the code with the flag off.

**No-go** for taking the branch's content hub itself (`src/lab/content-hub/hub.mjs`, the Git-per-space write path, `node:sqlite` publication store, `deploy-host/`) into production, and **no-go for merging the branch as it is** (hazards H1 to H5). The launch uses the existing stage-1 artifact path (`spike/build.mjs` and its frame layout, already on main). From the branch it takes the export-only `spike/build.mjs` change, the artifact-origin header design (`prepare-upload.mjs`) and the publication validation pattern (`deploy-host/lib/publication.mjs`) as references.

How sure: high (about 85%) that the plan is the smallest safe one and that flag-off is today's behaviour. Medium (about 60%) that the 50 pass the frame QA copy on the first run after C3, because the host's reveal-fit and fold code has never run inside a frame (F6).

## Findings written before reading the branch's accounts

I read the code in `src/lab/content-hub/` and ran it in a throwaway worktree (`git worktree add --detach` in my scratchpad, `node_modules` symlinked for the run only). Then I wrote these findings, and only after that read `company/rnd/content-hub/*.md` and the two founder decision records on the branch.

| # | Finding | Evidence |
|---|---|---|
| F1 | The branch's tests pass. | `node --test src/lab/content-hub/test/*.test.mjs`: 8/8 pass, 21.3 s, Node 22.22.0. `node src/lab/content-hub/scenario.mjs`: all 8 steps pass, 7.3 s. Kit build 4.8 s. `prepare-deployment.mjs` (2 React builds, publish, rebuild): 7.7 s. `deploy-host` `next build --webpack`: 5.8 s. **Not run:** `test/deployment.mjs`, `test/browser.mjs`, `test/live-deployment.mjs`, because this host has no Chromium. |
| F2 | The branch holds two different systems. (a) The content hub: a Git repository per space, scoped compare-and-swap writes, a durable job queue and publication pointers in `node:sqlite` (experimental in Node 22). (b) An artifact path: the `spike/build.mjs` webpack adapter, then `frame.html` with an import map and SRI, a separate static origin, and a separate Next app (`deploy-host`) embedding it. Only (b) is stage 1 of EDD-003. (a) answers stage 2 and 3 questions, and EDD-003 says not to build those before their triggers. | `hub.mjs`, `react-compiler.mjs`, `deploy-host/` |
| F3 | **`react-compiler.mjs` copies the kit runtime into every artifact directory** (`<artifact>/runtime/kit.<hash>.js`, 198,091 B raw, 62,636 B gz), and each `frame.html` imports `./runtime/…`. So every lesson's frame fetches its own copy at a different URL, with no HTTP cache shared across lessons. That breaks ADR-005's "kit once". `spike/build.mjs`'s `frameHtml` already uses one shared `/kit/1.0.0/kit.<hash>.js` URL. | `prepare-deployment.mjs` output in scratch: `objects/pilot/<hash>/runtime/` in both artifacts |
| F4 | `deploy-host/lib/publication.mjs` fetches **one record from one endpoint on every request** (`force-dynamic`, `no-store`). It throws, so the page returns 500, when the endpoint is down. It accepts only `/objects/pilot/<hash>/frame.html` and revision `A` or `B`. This is code for a one-lesson demo, not a manifest. A request-time lookup per lesson view is also the server load and runtime dependency that ADR-003/ADR-007 avoid: under ADR-007 the manifest is a git-committed registry. | file read |
| F5 | **`deploy-host/app/frame.jsx` handles only `ready`, `error` and `phase`.** It drops `progress` and `track`, so a learner's completion, `predictedCorrectly`, events and account sync would be lost. `SpikeHost` on main handles `progress`, but only into a spike key, and by design (W-477) never forwards events. | `frame.jsx`; `src/app/spike/SpikeHost.tsx`; `src/kit/progress.ts` (`updateProgress` feeds the account sink) |
| F6 | **Main's host reaches into the lesson DOM in three places, and a cross-origin frame silently breaks all three.** (1) `DemoCard` `useRevealFit`: W-237/W-287 picture shrink, W-289 text floors, reveal scroll. (2) The EDD-005 fold (`FoldScope`, `decideFold`). (3) `globals.css` `.card-shell:has([data-testid="lesson"]) .card-hook { display: none; }`. Inside a frame the hook stays visible, and reveal-fit and fold never run. None of these existed at SPIKE-001. `spike/kit/entry.ts` (2026-10-13) has none of them. | `src/components/DemoCard.tsx` lines 270-400; `src/app/globals.css:221`; `spike/kit/entry.ts` |
| F7 | The branch's `spike/build.mjs` diff only adds `export` to 7 functions and 1 constant (**corrected 2026-10-26: 5 functions and 1 constant**; see Corrections). The `main()` guard prevents side effects on import, and `spike/` has not changed on main since the merge base, so the diff applies cleanly. Tier 1. | `git diff 60eaf60ac origin/main -- spike/` is empty |
| F8 | The bundler is still Next's private `next/dist/compiled` webpack and terser. ADR-010 (esbuild) is proposed and W-485 is open. **Separately: Next 16.4.0 is in the range of three advisories.** `npm audit --omit=dev` on main: `next` critical, GHSA-2464-fhr4-w9xw (image optimizer SVG RCE), the `use cache` typed-array RCE, and a Server Actions DoS, range 16.0.0 to 16.4.0, fix available. Main has no `next/image` and no `"use server"`, so exposure is probably low. I have not verified it. The upgrade will move every webpack-built bundle hash. Next's own build printed an upgrade prompt, and I did not act on it: that belongs to the owner below. | `npm audit --omit=dev --json` |
| F9 | Stage-1 preconditions are still open on main's board: W-085 (device run), W-086 (lesson domain and CSP header, privacy), W-087 (QA through the frame) and W-485 (bundler) are all `backlog`. Accounts now exist (`better-auth`), so ADR-006's same-origin fallback (A2-a) is no longer allowed. | `company/ops/board.json` |
| F10 | All 50 A2 slugs are still `published` on main. Their imports stay inside the kit contract (`d3-geo` in 1, `geojson` types in 1). Six commits have touched them since 2026-10-16. Main's own `spike/build.mjs --all` builds **50/50**: gzip p50 2,505 B, max 8,334 B (`parallel-of-most-land`); kit 62,636 B gz, the same hash on main and the branch. The catalogue builds 1,016/1,646 in 125.5 s. The 630 failures are lessons on shared engines outside the contract: Life Hacks 200, algorithms 200, books 100, history 124, knots 4, sequence 2. | `node spike/build.mjs --all` on a `git archive origin/main` copy |
| F11 | The integration needs no route change. `/d/[slug]` is static (`dynamicParams = false`), and every card renders through `DemoHost`, which is the one switch point (tier 2, not protected). `Lesson.tsx` stays byte-for-byte (the frame build swaps `./progress` for the bridge). `tests/qa` is untouched while CI runs flag-off. | `src/app/d/[slug]/page.tsx`, `src/components/DemoCard.tsx:78` |
| F12 | The branch adds W-2026 to W-2030 to `board.json`. Main already uses those IDs for other items (EXP-009 work, the meta-phase0 project tag, the code-first inventory, the restructure). Main's highest ID is W-2091. | `board.json` on both |

## What the accounts changed (read after the findings)

- The branch's "1,645/1,645 real demos built" (catalogue-results.md) does not contradict F10. Its adapter bundles shared engines (`@/components/*`, `@/lib/*`) into each lesson, while main's `spike/build.mjs` enforces the import-map contract. Both results hold. For production, the contract version is the right one: inlined engines are unversioned code copied into 1,000 bundles.
- The branch's own architecture note (`nextjs-architecture.md`) proposes `dynamicParams = true` and an authorized publication lookup at request time. **I reject that for stage 1.** It adds server work to every view, a runtime dependency, and a way to publish a slug the build-time gates never saw. It belongs with stage 2 or later, with its own EDD.
- `deployment-status.md` and the receipt `company/ops/deployments/2026-10-25-content-hub-pilot.json`: a live isolated pilot exists (`system3-content-hub-demo.vercel.app`, artifacts on `system3-content-hub-artifacts.vercel.app`). Publishing there means changing a CDN alias on the artifact project, which is a Vercel deployment action. So "publish without a deploy" is not true on this platform: every publish and rollback is a deploy, and deploys need the founder's approval. The live host runs Next 16.4.0 (F8). Its upgrade or decommission is an ops item (W-list, item 10).
- The account says main's `npm run check` reports 811 errors. Today on main it reports **810 errors and 5 warnings**, before and after this record. The errors are already there (decision records missing `owner:` lines). They are not caused by this branch.

## The production integration plan (smallest safe version)

**Lessons.** The 50 slugs in [EDD-003-a2-pilot-slugs.txt](../edd/EDD-003-a2-pilot-slugs.txt), unchanged. They were chosen by rule, not by hand: they cover 9 domains, the geo kit, `d3-geo`, `dvh` units, local modules and `@/kit/random`. All 50 are published and all 50 build (F10). The 25 `# cp` lessons are the first wave if C6 or C7 forces a smaller start. I considered the branch's single lesson (`sum-seven-ignores-first-die`) and rejected it: it is not in the 50, and one lesson does not exercise the geo kit, CSS modules or `dvh`.

**Flag.** `NEXT_PUBLIC_LESSON_FRAMES`. The value `pilot-50` turns it on. Any other value, including unset, is off, following the `NEXT_PUBLIC_NEW_LESSON_ORDER` pattern.
- It is a build-time constant, so `DemoHost`'s frame branch is dead code when the flag is off.
- `DemoFrame` and the manifest are reached only through `dynamic(() => import(...))` inside that branch, so with the flag off no client chunk contains them (prediction P4).
- Flag-off is today's `DemoHost` exactly: same loaders, same `dynamic(..., { ssr: false })`.

**How the app loads them.**
1. **Manifest.** `src/lib/lesson-frames.manifest.json`, generated by the build tool and committed. Every change to it is a git commit (ADR-007). It holds:
   - schema version, kit version, and the artifact origin;
   - toolchain identity: the sha256 of `spike/build.mjs`, `spike/tooling/*` and `package-lock.json`, plus the Next version;
   - per slug: `sourceHash` (sha256 of the lesson's canonical tree: `Demo.tsx`, `meta.json`, CSS and local modules, per ADR-004; **as built: the files the bundle was compiled from plus `meta.json`, and the kit has its own `sourceHash`**, see Corrections), `lessonJs`, `kit`, `kitCss`, `geoKit` (or null) and `frameDoc`, as separate fields (P-1 of the A2 review).

   It lives in `src/`, not `company/`: `company/**` is tier 0, so a copy in `src/` keeps the manifest tier 2 (my EDD-010 ruling).
2. **`DemoHost`** (tier 2). When the flag is on and the slug is in the manifest, it renders `<DemoFrame slug entry>`. Otherwise it renders the in-app component. **The 50 stay in `loaders.generated.ts`**, so any slug can fall back without a rebuild of anything but the app.
3. **`DemoFrame`** (new, `src/components/DemoFrame.tsx`):
   - It renders `<iframe sandbox="allow-scripts" allow="" referrerpolicy="no-referrer" data-slug>` on `<origin>/f/<frameDoc>.html#host=<location.origin>`.
   - The frame URL is built only from the manifest's origin and a 64-hex hash. Nothing comes from the query string.
   - It mounts only when the card is active, as today. Pre-creating ±1 frames is not in this version (P2).
4. **The bridge** (C2). The host accepts a message only from its own frame's `contentWindow` with the right slug, and handles each type as follows:
   - `progress`: calls `updateProgress(slug, …)` from `src/kit/progress.ts` with only `completedAt` (number) and `predictedCorrectly` (boolean) taken from the message. That reaches the account sink exactly as an in-app lesson does.
   - `track`: event types in the existing allow-list are forwarded to the real `track()`.
   - `phase`: sets `data-phase` on the card, which drives the hook hiding (C3). (**As built: `data-frame-phase` and `data-frame-ready`**, see Corrections.)
   - `ready`: hides the card's hook.
   - `resize`, `error`: as in the spike.
   - Navigation keys pressed inside the frame are forwarded to the host.
   - The host never posts learner data into a frame.
5. **`/d/[slug]`**: no change. `dynamicParams` stays `false` and `generateStaticParams` stays as it is. No new routes, no request-time lookup, no API change.

**Artifacts and hosting.**
- Built by `spike/build.mjs` (with the branch's export-only diff), in its existing layout: `/kit/1.0.0/kit.<hash>.{js,css}`, `/kit-geo/1.0.0/…`, `/l/<hash>.js` and `/f/<hash>.html`. One kit URL is shared by all frames (F3 fixed by not using `react-compiler.mjs`).
- No new dependency. esbuild (ADR-010, W-485) is the follow-up, not on the launch path. The manifest records the toolchain, so a later switch to esbuild shows up as a toolchain change (P-1 rule 3).
- Hosted on the existing separate project **`system3-content-hub-artifacts.vercel.app`**. `vercel.app` is on the Public Suffix List, so it is a different site from `system-3-company.vercel.app`, and the app's cookies are never sent to it (ADR-006's "separate registrable domain"). Whether that suffices is the privacy reviewer's ruling (W-086, condition C5).
- Headers, adapted from `prepare-upload.mjs`:
  - `/kit/*`, `/kit-geo/*`, `/l/*`: `Cache-Control: public, max-age=31536000, immutable`, `X-Content-Type-Options: nosniff`, CORS `*` (needed for SRI module fetches from the opaque origin).
  - `/f/*` (**corrected 2026-10-26: this header as written blocks every frame; see Corrections**): one generic CSP **header**: `default-src 'none'; frame-ancestors https://system-3-company.vercel.app <one stable preview branch alias>; sandbox allow-scripts; connect-src 'none'; base-uri 'none'; form-action 'none'`. The per-frame `script-src` hash stays in each frame's meta CSP, and browsers enforce both policies.
  - That is one rule per path class, not one per lesson.
- Artifact deploys are **additive**. Nothing is deleted while any committed manifest version names it (ADR-007).
- The branch's per-artifact `objects/pilot/<hash>/` tree is not used.

**Publication keeps the editorial gates.**
- The manifest generator takes a slug only if its `meta.json` status is `published` at generation time. `tools/company.mjs publish` is the only thing that sets that status, through the claim, QA and launch gates.
- It records `sourceHash`. A new verify suite, `tests/lesson-frames/*.test.mjs` (wired into `npm run verify`, which `tools/deploy.mjs` runs before every deploy), fails when:
  - any manifest slug is not `published`;
  - any manifest slug's current `sourceHash` differs from the built one (stale artifact: rebuild or drop the slug); (**scoped 2026-10-26: this and the `published` check block only flag-on builds, at the build**: [decision](../../decisions/2026-10-26-lesson-frames-gate-scope.md));
  - any hash field is not 64-hex;
  - the origin is not the allow-listed one.
- So a learner is served frame code only for a source tree that is published now and unchanged since its artifact was built. A lesson edited after publication drops back to the in-app path until it is rebuilt.
- Editorial work, walkthroughs and evaluators are untouched. They run flag-off.

**Rollback.** Every step below is a deploy, so each needs the founder's approval of that deploy:
- **One lesson:** remove its manifest entry, commit, and redeploy the app. The slug renders in-app again, because it never left `loaders.generated.ts`.
- **The whole feature:** rebuild the live production commit with `NEXT_PUBLIC_LESSON_FRAMES` unset.
- **Fastest:** Vercel instant rollback to the previous production deployment.
- AMD-015's pre-approved withdrawal covers only `NEXT_PUBLIC_NEW_LESSON_ORDER`. If the founder wants the same pre-approval for this flag on a privacy or child-safety trigger, that is a founder decision through the chief of staff (W-list, item 9). Without one, a frames incident waits for the founder's approval like any deploy.
- Artifacts are never deleted, so a roll-forward needs no rebuild.

**Launch sequence.**
1. Merge with the flag off.
2. Artifact deploy (founder approval).
3. Preview deploy with the flag on (founder approval).
4. C6 phone check and C7 QA run on that preview.
5. Production deploy with the flag on (founder approval).

That is three founder approvals, each for a specific deploy, all run by release-manager.

**What NOT to do yet.**
- No Git-per-space write path.
- No `node:sqlite` or any database publication store.
- No request-time publication lookup and no `dynamicParams = true`.
- No removal of the 50 from the app build.
- No million-scale storage, sharding or content store.
- No lessons beyond the 50, and no Life Hacks, algorithms, books or history engines as frame bundles (F10: they need versioned engine bundles first, A2 finding F2).
- No esbuild until W-485.
- No edits to `tests/qa/**`, `src/kit/Lesson.tsx` or `tools/company.mjs`.
- No ±1 frame pre-creation (warm-path work after the phone numbers).
- No second live host: the branch's `deploy-host` is not the production shell.

## Conditions

- **C1 (builder).** The manifest generator, `DemoHost` switch, `DemoFrame` and `tests/lesson-frames` exactly as above, on a branch from current main. Cherry-pick only the `spike/build.mjs` export diff. Do not merge the branch.
- **C2 (builder, blocks flag-on).** A host bridge to the real `src/kit/progress.ts`, as in step 4. Tests: a fake frame window posting forged slug, forged source, wrong types and oversized payloads, all rejected; a valid `progress` reaches `updateProgress`.
- **C3 (builder, blocks flag-on).** Reveal-fit, fold and hook-hiding parity inside the frame:
  - move `useRevealFit` and `decideFold` out of `DemoCard.tsx` into a module imported by both `DemoCard` and `spike/kit/entry.ts`;
  - in the frame, wrap the lesson in `FoldScope` with its own store, using the frame document as the scroller;
  - hide the hook on `ready` or `phase` through a host attribute.

  With the flag off, `DemoCard` behaviour must be unchanged (P4). The kit bundle grows, and its new hash is recorded.
- **C4 (builder).** One generic `/f/*` CSP header and one immutable-cache header per path class, plus a check that every `frameDoc` in the manifest returns 200 from the origin with those headers. The check runs at release time, read-only.
- **C5 (privacy-reviewer, blocks flag-on).** W-086 ruling on the artifact origin, the header CSP, `frame-ancestors`, and the bridge's data in each direction. Also: SPIKE-001's negative test (19 probes and a positive control) re-run against the preview.
- **C6 (founder-provided device, blocks production flag-on).** W-085 in its cheapest form. On the flag-on preview, one iOS Safari and one Android Chrome run three lessons through the full predict, explore, reveal flow (one geo, one `dvh`, one `random`), plus feed swipes across a frame card. Pass or fail is recorded with screenshots. The 300 ms warm line is still not claimed (P2).
- **C7 (evaluation-steward, blocks production flag-on).** The QA contract copy (`spike/qa/contract-frame.spec.ts`, `frameLocator` only) passes for all 50 at both viewports on the preview. The steward rules whether that, bound to each `frameDoc` hash, is enough evidence to serve those 50 in production, or whether W-087 must be ratified first.
  - My engineering view: the served code differs from what the gate tested (different bundler, different host). So the binding to the hash, the A2 review's amendment 2, should be ratified before production.
  - This is the steward's call, not mine. If the steward says ratify, the launch waits for the amendment, and nothing in this plan changes.
- **C8 (platform-engineer, before the artifact build).** The Next security upgrade (F8) lands first, so the artifacts are built once, on the toolchain that ships.
- **C9 (release-manager).** Three deploys, each with the founder's approval of that deploy. Each is recorded in `company/ops/deployments/` in `tools/deploy.mjs`'s naming, plus a manifest commit before the app deploy.
- **C10 (principal-engineer).** A code review of the C1 to C4 diff before merge, plus principal-engineer-ops' readiness record (tier 2: `DemoHost`, `package.json` script, deploy class).

## Predictions, committed before the build (judged at the preview and at production)

| # | Prediction | Measured how | Wrong if |
|---|---|---|---|
| P1 | Bundle size: every one of the 50 lesson bundles is ≤ 15 KB gz, with median ≈ 2.5 KB and max ≈ 8.4 KB (today 2,505 and 8,334 B). Kit ≤ 75 KB gz once, including the C3 reveal-fit and fold port (today 62,636 B). Kit CSS ≤ 6 KB gz (today 4,762 B). | build tool report | any lesson > 15 KB gz, or kit > 75 KB gz |
| P2 | Interactive time. Chromium, Pixel 7 emulation, 4× CPU, from card activation to the frame's `ready`, median of 7: first frame card (cold kit) ≤ 1.5 s; later frame cards (kit cached) ≤ 0.8 s; in-app cards with the flag on within ±10% of flag-off. Real phones (C6): flow passes, time recorded, not predicted. | `performance.mark` around activation and `ready`, in the C7 run | cold > 1.5 s, or warm-cache > 0.8 s, or in-app cards slower by > 10% |
| P3 | QA. Flag-off: `tests/qa` (the gate, unchanged) passes for every lesson that passes on main at the same commit, so the set of failures is identical. Flag-on frame copy, first run after C3: ≥ 48 of 50 pass both viewports. Any failure is layout (reveal-fit or `dvh`), not the bridge. | `npm run qa`; `spike/qa` config on the preview | any new flag-off failure, or < 45 of 50 on the first frame run, or a bridge or progress failure |
| P4 | No regression with the flag off. Total client JS on `/` and on one `/d/<pilot>` page is within +1 KB gz of main. A grep of `.next/static` for one manifest artifact hash and for the `DemoFrame` marker string finds 0 matches. `/d/*` static page count is unchanged. | build output inspection | any match, or > 1 KB gz growth |
| P5 | Build time. App `next build` wall time, median of 3: flag on and flag off each within ±10% of main (the 50 stay in the app). Artifact build for the 50 plus kit ≤ 60 s wall (today: kit 4.8 s, lessons ~0.1 to 0.2 s each). The `tests/lesson-frames` suite ≤ 3 s. | `/usr/bin/time` | app build moves > 10%, or artifacts > 60 s, or suite > 3 s |
| P6 | Flag-on cost to the host: first-load JS of `/` grows ≤ 5 KB gz (the manifest and `DemoFrame` load only when a pilot card mounts). | build output | > 5 KB gz |

The 300 ms warm line (EDD-003, A2 §5 line 4) is **not** predicted and **not** claimed by this launch: it needs ±1 pre-creation and phone measurements.

## Merge hazards

- **H1 board IDs.** The branch's W-2026 to W-2030 (prototype, R&D acceptance, this review, catalogue test, deploy) collide with main's W-2026 to W-2030 (EXP-009 build and acceptance, meta-phase0 tag, code-first inventory, restructure). **Never merge the branch's `board.json`.** Re-file what is still open with `company board add`, which assigns fresh IDs (main is at W-2091), and record the old-to-new mapping in the branch's records when they are carried over. Any branch text that says "W-2028" means this review, not main's W-2028.
- **H2 `spike/build.mjs`.** Export-only diff (F7), tier 1, applies cleanly. Cherry-pick it alone.
- **H3 `company/ops/progress.md`, decisions and the deployment receipt.**
  - Do not merge `progress.md` hunks 403 commits apart. Write a fresh handoff.
  - The two founder decision records (2026-10-24, 2026-10-25) can be carried as records, owned by the chief of staff.
  - The receipt `company/ops/deployments/2026-10-25-content-hub-pilot.json` is not in `tools/deploy.mjs`'s naming. Release-manager decides whether it is carried, and under what name. It is outside `.vercelignore`'s reach in any case (`company/ops/deployments/**` is ignored).
- **H4 `src/lab/content-hub/deploy-host/`.**
  - It has its own `package.json` and `package-lock.json` pinning `next 16.4.0` (F8). It is a second dependency tree that root `npm audit` never sees.
  - Do not bring it to main. If R&D wants the hub kept, carry `src/lab/content-hub/` without `deploy-host/`, or with its lockfile on a patched Next.
  - `.jsx`/`.mjs` files are outside `tsconfig.json`'s include (`allowJs: false`), so they do not affect typecheck.
- **H5 protected paths.** The branch edits none of them (`tests/qa/**`, `src/kit/Lesson.tsx`, `tools/company.mjs`, `.github/workflows/ci.yml`, constitution). The plan edits none of them either. The only amendment in view is W-087 (C7), and only if the steward rules that production needs it. CI's `verify` job does not run `test:*` suites, so `tests/lesson-frames` gates only at deploy (`tools/deploy.mjs` runs `npm run verify`). That is enough for this launch, because nothing ships without a deploy.

## Work items (to file with fresh IDs; owners)

1. platform-engineer: C1 (manifest generator, `DemoHost` switch, `DemoFrame`, `tests/lesson-frames`, `package.json` script); cherry-pick the `spike/build.mjs` export diff only.
2. platform-engineer: C2 host bridge to `src/kit/progress.ts`, with forged-message tests.
3. platform-engineer: C3 reveal-fit, fold and hook parity in the frame; refactor `DemoCard` with no behaviour change.
4. platform-engineer: C4 artifact-origin headers and a release-time read-only header check.
5. platform-engineer, with principal-engineer-ops: C8 Next security upgrade (F8) before any artifact build; principal-engineer-ops logs the advisory on the risk register.
6. principal-engineer-ops: readiness record for the C1 to C4 diff (tier 2). principal-engineer: code review C10.
7. qa-tester: flag-off `npm run qa` against main's failure set (P3, P4, P5), then the frame QA copy for the 50 at both viewports on the preview, plus the P2 timings. Measurement, not gate evidence.
8. privacy-reviewer: C5 (W-086) on the preview; evaluation-steward: C7 ruling (W-087).
9. chief-of-staff: the founder asks. The device run (C6), the three deploy approvals, and whether this flag gets an AMD-015-style pre-approved withdrawal.
10. release-manager: C9, the three deploys, **only with the founder's approval of each one**. Also the upgrade or decommission of the live `system3-content-hub-demo` host (Next 16.4.0), the unused Global Config `ecfg_x3uekw3reodjp4bifhvhy72p1hla` named in the branch's status record, and H3's receipt.
11. rnd-lead: the branch's R&D acceptance (its W-2027) and whether `src/lab/content-hub/` is kept (H4). Its Git-per-space results feed a later stage-2 EDD, not this launch.

## Checklist

- [x] The problem is real and measured (EDD-003; F10 re-measured today)
- [x] Options: do nothing (today's app), the branch's request-time hub host (rejected, F4 and the accounts section), the A2 path behind a flag (chosen)
- [x] Blast radius: 50 published lessons, flag-on only; flag-off is today's app (P4)
- [ ] Readiness record approved by principal-engineer-ops (item 6)
- [x] Rollback: manifest entry removal, or a flag-off rebuild; every rollback is a deploy with the founder's approval
- [ ] `npm run verify` on the integrated tree (after C1 to C4)
- [x] Measurements committed before implementation (P1 to P6)
- [ ] Security and privacy: C5, C8

## Objections that travel with this decision

- **The founder wants it in production now, and this plan adds four blockers before flag-on.** Answer: each blocker is a defect that would reach learners. C2: lost completions and account sync. C3: visible layout regressions on reveal. C6: an iframe-in-scroll-snap failure that only a phone shows. C7: serving code the gate never tested. The flag-off merge and the preview can proceed at once. Only the production flag-on waits.
- **The branch's own proposal (request-time lookup, `dynamicParams = true`, a Git-per-space hub) is rejected for the launch.** Answer: it stays a candidate for stage 2. It is not a stage-1 need at 50 lessons, and EDD-003's stage-2 triggers have not fired.

## Kudos

- rnd-engineer: the branch's `prepare-upload.mjs` header design and `publication.mjs` origin and path validation are the right patterns. This plan reuses them as they are.

## Corrections (2026-10-26, from the builder's account, each checked against the code)

platform-engineer sent four corrections with the C1 to C4 build (the branch handoff, 2026-10-26). I checked each one against the code before accepting it ([code review](2026-10-26-lesson-frames-code-review.md), R10 to R12). All four are accepted. The text above is marked where it changed and otherwise left as it was.

1. **The `/f/*` header CSP would block every frame. Accepted.** `default-src 'none'` with no `script-src` makes `script-src 'none'`. Both policies apply, so the inline import map and every module script would be refused. The built header adds `script-src 'self' 'unsafe-inline'`, `style-src 'self'`, `img-src 'self' data:` and `font-src 'self'`. That is safe only because each frame's meta CSP, which is the second element of `<head>` and comes before any script, pins its one import map by hash: an inline script must pass both policies. privacy-reviewer rules on it in C5 (W-2095). It was my error: I wrote the header without running a frame under it.
2. **F7 count. Accepted.** The export-only diff exports 5 functions and 1 constant, not 7 and 1. On the integration branch, a later commit also exports `buildLessons` and records each compilation's sources. That commit is not export-only and is reviewed as code (R11).
3. **`data-frame-phase` instead of `data-phase` on the card. Accepted.** It meets the intent, which was an attribute on the card that hides the hook. Using a separate name means no selector that looks for a lesson's `data-phase` (`globals.css`, `useRevealFit`'s observer) can match the card.
4. **`sourceHash` scope. Accepted.** Per lesson, it covers the files webpack compiled from (under `src/` or `spike/kit/`, outside `node_modules`) plus `meta.json`. Uncompiled files in the folder are out of it, correctly. The toolchain (`package-lock.json`, `spike/build.mjs`, `spike/tooling`, the Next version) is recorded but does not gate: the served artifact is the tested bytes, whatever built it. The kit has its own `sourceHash` and a stale kit also fails. That widened the cost O1 objected to, because the kit's sources include `src/app/globals.css`.

**O1** (the gate fails every flag-off deploy) is ruled in [2026-10-26-lesson-frames-gate-scope.md](../../decisions/2026-10-26-lesson-frames-gate-scope.md): the freshness rules block only flag-on builds, at the build.

