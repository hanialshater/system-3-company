# Engineering Review: 2026-10-13: lesson storage and loading at scale (EDD-003)

owner: principal-engineer · tier: 2 · status: **open** · invited: platform-engineer, evaluation-steward, backend-engineer, privacy-reviewer, tools-lead

- EDD: [EDD-003](../../engineering/edd/EDD-003-lesson-storage-at-scale.md) · ADR (drafts, proposed): ADR-003 to ADR-009 listed in the EDD · Amendment: none yet (the gate changes listed in the EDD each need one)
- [x] The problem is real and measured (feed HTML 1.82 MB vs a 300 KB budget; a 1.29 MB all-metas chunk on every page; 73 s build and 6.6 s QA wall time per lesson at 348)
- [x] At least two options were considered, including doing nothing (A0–A3 loading; B0–B5 storage)
- [ ] Blast radius: which lessons, pages or roles change (every lesson, the feed, lesson pages, gates, QA; staged)
- [ ] Rollback is one revert (claimed per stage; reviewers check)
- [ ] `npm run verify` passed on the integrated tree (n/a: design only; required per stage)
- [x] Measurements committed before implementation (EDD-003 tables and spike budgets)
- [ ] Security, privacy and licenses (iframe boundary, CSP/SRI, bundler dependency: open)

## Proposal in brief

Founder direction: no "all lessons in one app build" at scale; the question is where lesson code is
loaded at runtime. Recommendation: **client, not server: the hybrid.** The server or static build serves
the shell, a versioned kit, a slim manifest, lesson metadata and poster previews. Each lesson is an
independently built, content-hashed ES module bundle on a CDN, run in a sandboxed cross-origin
iframe with a postMessage bridge. Server-side execution of lesson code is rejected (RCE in the
credentialed process, cost per view). Storage stays in git until the triggers are met. Variants
(levels, languages, contexts) are data specs over one bundle. Stages: 0 (now→1k) fix EDD-001 and run
a 3-lesson spike; 1 (1k→10k) runtime bundles + manifest, QA per bundle hash; 2 (10k→100k) sources
move to domain-sharded content repos; 3 (beyond 100k) decided then.

## Questions for each reviewer (answer under Findings with your role name)

**platform-engineer**
1. Own the spike (3 lessons as runtime bundles in a sandboxed iframe). Are its budgets (≤15 KB gz per lesson, ≤120 KB gz kit+React, ≤300 ms warm, ≤1.5 s cold, ≤1.5× memory) the right ones, and can `tsc` alone produce the bundles, or do we need a bundler (decision record)?
2. Can the scroll-snap feed host iframes without touch, focus or scroll defects on Pixel 7 emulation? What is your fallback if it cannot?
3. Is the kit-as-import-map contract (`react`, `@/kit/*`, semver per major, multiple majors live) workable with Next 16/Turbopack for the shell?

**evaluation-steward**
1. The EDD proposes five gate amendments that change *where gates look* (manifest, bundle-hash-bound QA evidence, content-addressed evidence, incremental check, manifest-driven QA list) but not *what they demand*. Do you agree that this distinction holds for each one? Which one fails it?
2. Is "QA once per immutable bundle hash, kit contract + 5% sample per kit release" an acceptable QA contract? What sample size would you require?
3. When a lesson gets a new version, which claim checks can carry over (unchanged text and support hash) and which must be redone?

**backend-engineer**
1. Where should the manifest and the bundle/kit artifacts live (Vercel static, object storage + CDN), and what is the cost per 1M lesson views by your estimate?
2. Design for the postMessage bridge: progress, events and recall. How does the event intake (`/api/events`) receive from frames without giving frames credentials?
3. What would make you want a content store (stage 3) earlier than the triggers say?

**privacy-reviewer**
1. Does the sandboxed opaque-origin iframe with `connect-src 'none'` meet "lesson code can never touch auth tokens or learner data" once accounts exist? What else (CSP, SRI, Permissions-Policy, referrer policy) is required?
2. Does moving progress from in-lesson localStorage to the host bridge change what we store about learners or where?
3. Does a second lesson origin or CDN create a new third-party data flow that needs disclosure?

**tools-lead**
1. What do the company CLI, walkthrough, HQ and metrics need so they can address a lesson by `<slug>@<hash>` rather than by folder?
2. Can `check` be made incremental (changed lessons + nightly full scan) without weakening it? What is the cost of keeping the full scan under 1 min at 10k?
3. Agent worktrees: should agents use partial clone + sparse checkout per domain now, or only after the gates are index-aware?

## Findings (problems, not fixes)

_(reviewers add theirs here, each headed with the role name)_

### platform-engineer (Noor, 2026-10-13): from SPIKE-001
Evidence: [SPIKE-001](../../engineering/spikes/SPIKE-001-frontend-sandbox.md), [results JSON](../../engineering/spikes/SPIKE-001-results.json).
1. Budgets. Lesson ≤ 15 KB gz: right, with plenty of room (3 lessons at 2.2–2.5 KB; all 348 at p99 3.4 KB, max 8.3 KB). Kit + React ≤ 120 KB gz: right (61.8 KB). Cold ≤ 1.5 s: met, including 4× CPU (≤ 1.1 s insert→ready). Memory ≤ 1.5×: met (0.85×). **Warm ≤ 300 ms is the wrong definition.** Remounting from the HTTP cache costs 0.2–0.7 s, because every frame is a new realm that evaluates React again. It should be "interactive after snap with the active ±1 frames pre-created" (those frames are ready before the snap), measured on a device. `tsc` alone is not enough: something has to resolve local imports and CSS modules. The spike used Next's vendored webpack and terser with no new dependency, but that is a private API, so stage 1 needs a bundler decision record (W-088).
2. Scroll-snap. In Pixel 7 emulation, touch swipes that start inside a frame chain to the feed and snap, and slider touch-drag works. This needs `overscroll-behavior` reset inside frames (globals.css sets `none` on body). Host `j`/`k` shortcuts get no keys while focus is in a frame. Only Chromium was tested. Real-device iOS/Android is blocking (W-085). Fallback if iOS fails: A2-a same-origin `import()` until auth exists, as the EDD says.
3. Import-map contract. It works: namespaced kit exports, `integrity` in the import map, and 348/348 lessons building with no import outside the contract. It is independent of Next/Turbopack, because the shell never compiles lesson code. Kit changes leave lesson bundle hashes unchanged, so only the frame documents are re-pinned.
Problems found: the sandbox alone does not stop network exfiltration (CSP does, so send CSP as a CDN header); on a shared host, cookies ignore ports, so the session cookie reached the CDN with frame-document requests (lessons need a separate registrable domain, W-086); and in an opaque origin `progress.ts` silently loses progress (it moves to the host bridge).

## Decision

Pending. Objections that travel with it (from the author):
- Iframes in a snap feed may fail on touch and focus; the spike decides this before the ADR does.
- Per-lesson builds pay off only with change-proportional CI; the stage-1 trigger includes a CI-time measurement.
- Changing where the gates look is close to changing the gates; the evaluation steward signs off on each amendment.

## Heads-up for the principal engineer (chief of staff, 2026-10-13 22:50)
Three new orgs exist: Life Hacks, Personalization and International (`company/decisions/2026-10-13-three-more-orgs.md`). They touch this review directly:
- International makes locale variants a first-class axis: variants as data, a format and units layer, RTL, and claims per locale.
- Personalization needs ordering outside lesson code, plus the backend.
- Life Hacks may bring media assets, which affects the per-lesson budget and the CDN policy.

Please fold these into EDD-003 stage 1, or open EDD-004 if they are big enough (board W-089).
