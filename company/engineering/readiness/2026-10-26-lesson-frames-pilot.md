# Operational readiness: lesson-frames-pilot

change: lesson frames pilot C1-C4 (company/engineering/reviews/2026-10-25-content-hub-production-review.md): the 50 pilot lessons can run in sandboxed frames from a second origin behind NEXT_PUBLIC_LESSON_FRAMES=pilot-50 (off by default); committed manifest + two client projections; DemoHost switch; DemoFrame; host bridge to src/kit/progress.ts; reveal fit and fold moved from DemoCard into src/kit/reveal-fit.ts and run in the frame; artifact-origin headers and a release-time origin check; tests/lesson-frames in npm run verify
change-tier: 2
paths: src/components/DemoHost.tsx, src/components/DemoFrame.tsx, src/components/DemoCard.tsx, src/kit/reveal-fit.ts, src/lib/lesson-frame-bridge.ts, src/lib/lesson-frames.*.json, src/app/globals.css, next.config.mjs, package.json, spike/build.mjs, spike/kit/*, spike/qa/pilot/*, tools/lesson-frames.mjs, tools/lib/lesson-frames.mjs, tests/lesson-frames/*
author: platform-engineer
board: W-2092, W-2101, W-2103, W-2104
risks: proposes two entries (below); closes none
links: review company/engineering/reviews/2026-10-25-content-hub-production-review.md; predictions company/experiments/EXP-010-lesson-frames-pilot-predictions.md (results there); branch feat/lesson-frames-pilot; companion record company/engineering/readiness/2026-10-26-next-16-4-3-upgrade.md (C8)

Classes touched: kit (`DemoHost.tsx`, `src/kit/**`), build (`next.config.mjs`, `package.json` script), and the deploy class for the second origin's headers (a file the tool writes beside the artifacts; nothing in this repository's `vercel.json` changes). Event API and learner data: no route or schema changes, but the bridge writes learner progress and forwards events from a frame, so privacy-reviewer's C5 applies before flag-on.

1. **What can fail.**
   - Flag off (the merge): a leak of frame code into the in-app path. Measured: no client chunk of a flag-off build holds a manifest hash, the DemoFrame marker, the artifact origin or the slug list; first-load JS of `/` and `/d/why-seven-wins` within 18 B of main; 1,646 `/d/*` pages as on main (EXP-010, P4). The DemoCard change is a verbatim move (diff of the moved block: one added `export`).
   - Flag off, operations: `tests/lesson-frames` fails `npm run verify`, so every deploy, when one of the 50 pilot lessons, the kit's sources (`src/kit/Lesson.tsx`, `controls`, `milestones`, `random`, `reveal-fit`, `src/app/globals.css`, `spike/kit/*`) or the geo kit change after the manifest was built. 42 of the 50 lessons changed at least once in the 7 days to 2026-10-25, and `globals.css` 4 times. The review asks for that gate; the cost is that someone must run `node tools/lesson-frames.mjs prune` (or rebuild) and commit before a deploy. See objection O1 in the handoff.
   - Flag on: a frame that never sends `ready` (blank card); progress or events lost (the bridge refuses a message it should take); layout differences from in-app (measured below); the artifact origin down (blank frames for the 50; the rest of the app is unaffected).
   - Worst: a learner's completion is not recorded for a framed lesson, so revisits and account sync miss it. Who sees it: learners, silently.
2. **How we would know.** Before a deploy: `npm run test:lesson-frames` (27 tests: manifest rules with mutations, bridge forgeries, header rules) and, at release time, `node tools/lesson-frames.mjs check-origin` (every artifact 200, right headers, bytes match the hash in the name). Before flag-on production: the frame QA copy `spike/qa/pilot/` (it also asserts that progress and the five lesson events reached the host's storage, and that the hook hid). In production there is **no meter** for "framed lesson never became ready" or "progress refused": DemoFrame logs refusals only outside production. That is a risk entry (R-new-1).
3. **How to roll back.** Every step is a deploy and needs the founder's approval of that deploy. One lesson: `node tools/lesson-frames.mjs prune` or delete its manifest entry, re-run the tool's projections, commit, redeploy the app; it renders in-app because it never left `loaders.generated.ts`. Whole feature: rebuild the production commit with `NEXT_PUBLIC_LESSON_FRAMES` unset. Fastest: Vercel instant rollback. No learner data is lost by any rollback (progress lives in the host's storage either way). No pre-approved withdrawal exists for this flag (review, W-list item 9).
4. **Capacity.** App build: median 153.1 s flag off, 148.0 s flag on, main 145.1 s on the same host (P5). Artifact build: 8.5 to 16.5 s for the kit and 50 lessons, 1.1 MB on disk (`artifacts/lesson-frames/dist`, gitignored). Suite 1.9 s. Client: flag on adds 558 B gz to `/` first-load; the frame chunk (about 5 KB gz) loads with the first pilot card; each frame loads the kit once per browser (64,203 B gz JS, 4,804 B gz CSS; geo kit 71,368 B gz for the 6 geo lessons), then 2.5 KB gz median per lesson. The artifact origin is a separate static Vercel project: each artifact deploy counts against the 100-a-day quota.
5. **Security.** New: an iframe to a second origin, only when the flag is on. `sandbox="allow-scripts"` (opaque origin: no cookies, no storage, no same-origin access), `allow=""`, `referrerpolicy="no-referrer"`. The frame URL is built only from the manifest's origin (allow-listed by the gate) and a 64-hex hash; nothing comes from the query string. The host accepts a message only from its own frame's window with origin `null` and the card's slug, at most 2,048 B, and rebuilds each event field by field; it never posts into a frame. Origin headers: one CSP header for `/f/*` (`default-src 'none'`, `connect-src 'none'`, `frame-ancestors` production plus one preview alias, `sandbox allow-scripts`), immutable caching and `nosniff` on every class, CORS `*` on the static classes for opaque-origin module fetches. The header allows `'unsafe-inline'` scripts because the import map is an inline script; each frame's meta CSP still pins its one import map by hash, and both policies apply. That is the point for privacy-reviewer (C5) to rule on. Observed locally: frame module fetches carry `Origin: null` and no cookie.
6. **Data.** Writes the same `s3c:progress:v1` entry and the same `/api/events` beacons an in-app lesson writes, from two fields (`completedAt`, `predictedCorrectly`) and five event types. Nothing new is stored, and nothing leaves for the artifact origin except the requests for immutable files (no cookies, no referrer). The frame keeps a page-view copy of its own progress in memory only. Consult: privacy-reviewer (C5, W-2095).
7. **Risks** (proposals; principal-engineer-ops writes the register):
   - R-new-1: a framed lesson fails silently in production (never ready, or a refused progress message), with no meter. Mitigation before production flag-on: a `frame-error` count in ops-health, or the C6/C7 runs as the only evidence.
   - R-new-2: the staleness gate blocks unrelated deploys whenever a pilot lesson or the kit sources change (O1). Mitigation: prune as a step in the deploy runbook, or a decision to scope the gate (see the handoff).

Measured parity (C3), framed against in-app, 50 pilot lessons after the reveal (reveal on screen, pictures shrunk, folded rows, scroll position): phone (Pixel 7) 49/50 identical; desktop 26/50 identical, all differences in one direction: the frame needs less room (it scrolls 2 to 27 px less, or shrinks no picture where the app shrinks one). Cause: `@media (max-width: 600px)` in `globals.css` matches inside a 438 px frame on a 1280 px host, so two text sizes are one step smaller there; lesson-level `vw`/`dvh`/`@media` (18 of the 50 lessons use them) also resolve against the card, not the window. The reveal is on screen in every case either way. Follow-up: W-2103.

## Approval (tier 2; written by principal-engineer-ops)

approved-by: principal-engineer-ops (Rhea), 2026-10-26 · **approved with conditions M-a to M-e for the flag-off merge of `3ef3619ca` to main, and D1 to D4 for the first production deploy that carries it with the flag off.** **Refused for now: any flag-on build, preview or production.** That needs its own addendum to this record (see the end of this section).

Classes: kit (`DemoHost.tsx`, `src/kit/reveal-fit.ts`), build (`next.config.mjs`, `package.json` scripts), deploy (the artifact origin's headers, flag-on only). The bridge writes learner progress and events only with the flag on. Service: `feed-and-lesson-runtime` (T1). Not my area (platform-engineer's change; the O1 commit is principal-engineer's), so the approval is mine.

**What I checked myself:**
- **The suite.** `npm run test:lesson-frames` at `3ef3619ca`: 29 tests, 28 pass, 1 skip (the built-artifact meta-CSP check), 0 fail.
- **No protected path** in `git diff 03d140e22 3ef3619ca` (company/constitution/protected-paths.txt).
- **Flag off cannot reach the manifest at build time.**
  - `next.config.mjs` calls `flagOnBuildRefusal()`, which returns `null` before reading anything unless `NEXT_PUBLIC_LESSON_FRAMES=pilot-50`.
  - `tools/lib/lesson-frames.mjs` does no file reads at module load.
  - `tools/` is not in `.vercelignore`, so the new import resolves in a Vercel build.
  - `env` pins the flag to the literal `"off"` unless it is exactly `pilot-50`.
- **Not rebuilt by me.** The disk held 0.7 to 1.6 GB free during this run. For the flag-off build and the bundle grep I rely on principal-engineer's R3 and the O1 rebuild (exit 0, 144 s, 0 frame markers), on R4 (the `DemoCard` move is verbatim), on R7 (the `verify` failures are identical to main's), and on the builder's P4 sizes.

**Conditions for the merge**
- **M-a. Order.** `80c847c55` merges to main alone first, after the security deploy under its own record (2026-10-26-next-16-4-3-upgrade.md, U6). If the pilot must merge before that deploy happens, the security deploy is still exactly `80c847c55`, never a main tip that holds pilot code.
- **M-b. Before merging:** W-2105 is done (prune handles stale-kit, plus the R5 comment). The `board.json` and `progress.md` merge is resolved as the review's merge notes say. There is no `[deploy]` in any merge commit.
- **M-c. Verify on the merged tree.** `npm run verify` (or every suite in it, plus build and `tests/qa`) on the merged main SHA, with `NEXT_PUBLIC_LESSON_FRAMES` unset. Pass means:
  - the `not ok` set equals review R7's pre-existing list;
  - `test:lesson-frames` is green;
  - the build exits 0;
  - `.next/static` has 0 matches for `s3c-lesson-frame-v1`.

  The result is recorded with that SHA in the merge handoff. A verify result belongs to the SHA it ran on: if watched paths change after it, run it again.
- **M-d. Rollback of the merge is path-limited**, not `git revert -m 1` (that would also undo the records merged with it). Run `git diff <merge>^1 <merge> -- next.config.mjs package.json spike/ src/app/globals.css src/components/DemoCard.tsx src/components/DemoFrame.tsx src/components/DemoHost.tsx src/kit/reveal-fit.ts src/lib/lesson-frame-bridge.ts src/lib/lesson-frames.frames.json src/lib/lesson-frames.manifest.json src/lib/lesson-frames.slugs.json tests/lesson-frames/ tools/lesson-frames.mjs tools/lib/lesson-frames.mjs | git apply -R --3way`, then typecheck and build.
  - This keeps later main edits to `globals.css`.
  - Leave `package-lock.json` out. Check that the `package.json` hunk is only the two script lines, so the reversal never brings back `next` 16.4.0. M-a makes that the case.
- **M-e. No flag-on Vercel variable.** Nobody sets `NEXT_PUBLIC_LESSON_FRAMES` in any Vercel environment until a flag-on addendum is approved. A preview build would pick it up from the project environment.

**Conditions for the first production deploy carrying the merge (flag off)**
- **D1.** The founder approves that deploy. The deployment record states that `NEXT_PUBLIC_LESSON_FRAMES` is unset in production, read from the project settings, not assumed.
- **D2.** After READY, the client chunks served by `/` and `/d/why-seven-wins` contain 0 matches for `s3c-lesson-frame-v1` and `system3-content-hub-artifacts`.
- **D3.** The smoke is the upgrade record's U3 (b) to (g), plus `contract.spec.ts` on the six R8 pilot lessons against production.
- **D4.** The rollback target is the then-live deployment, named in the record before the deploy. If the security deploy has gone out, that is its deployment id, not r22's.

**Flag-on (preview or production): not approved.** A flag-on preview is a different change: the artifact origin's first deploy, its headers, `frame-ancestors` naming a preview alias, and the bridge writing progress. None of that has a measured run I can approve. It comes back as an addendum to this record with:
- `node tools/lesson-frames.mjs check-origin` output against the deployed origin;
- the preview alias in `frame-ancestors`;
- the frame QA copy result (W-2100);
- the privacy ruling (C5, W-2095).

Production flag-on also waits on:
- C6 (phones);
- AMD-018 (C7, W-2096, W-2109);
- W-2103 (desktop parity);
- W-2106 (kit hash and `globals.css`);
- W-2110 (runbook);
- **W-2111, a production frame-error meter.** R-new-1 is right: without a meter, a learner's lost completion is invisible.

**Register** (company/ops/risks.json on main):
- R-new-1 → **R-033** (open, 3×3 at flag-on, W-2111).
- R-new-2 → **R-034** (mitigating, partial: O1 is scoped at `3ef3619ca`; W-2105, W-2106 and W-2110 remain).

How sure:
- High (about 85%) that the flag-off merge leaves learners' app unchanged. Most of that evidence is principal-engineer's and the builder's, not my own rebuild.
- High that flag-on is not ready.
