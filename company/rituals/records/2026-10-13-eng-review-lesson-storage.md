# Engineering Review: 2026-10-13: lesson storage and loading at scale (EDD-003)

owner: principal-engineer · tier: 2 · status: **closed 2026-10-14: approve with changes** · invited: platform-engineer, evaluation-steward, backend-engineer, privacy-reviewer, tools-lead

- EDD: [EDD-003](../../engineering/edd/EDD-003-lesson-storage-at-scale.md) · ADR (proposed): [ADR-003](../../engineering/adr/ADR-003-no-lesson-code-on-server.md), [ADR-004](../../engineering/adr/ADR-004-content-addressed-lesson-versions.md), [ADR-005](../../engineering/adr/ADR-005-independent-lesson-bundles.md), [ADR-006](../../engineering/adr/ADR-006-sandboxed-lesson-frame.md), [ADR-007](../../engineering/adr/ADR-007-manifest-is-the-registry.md); ADR-008 and ADR-009 not written (see Decision) · Founder decisions: [2026-10-14-lesson-bundler-and-memory.md](../../decisions/2026-10-14-lesson-bundler-and-memory.md) · Amendment: none yet (the gate changes listed in the EDD each need one)
- [x] The problem is real and measured (feed HTML 1.82 MB vs a 300 KB budget; a 1.29 MB all-metas chunk on every page; 73 s build and 6.6 s QA wall time per lesson at 348)
- [x] At least two options were considered, including doing nothing (A0–A3 loading; B0–B5 storage)
- [x] Blast radius: every lesson, the feed, lesson pages, gates and QA, staged; stage 1 migrates lesson by lesson behind the manifest
- [x] Rollback is one revert (stage 0 and 1: shown for one lesson by the SPIKE-001 rollback drill; stage 2: medium, subtree merge)
- [ ] `npm run verify` passed on the integrated tree (n/a: design only; required per stage)
- [x] Measurements committed before implementation (EDD-003 tables and spike budgets)
- [ ] Security, privacy and licenses: the iframe boundary passes 19/19 negative probes in Chromium; still open: separate lesson domain + CSP header (W-086), real devices (W-085), bundler license/audit (founder decision record)

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

### principal-engineer (Kenji, 2026-10-14): closing the review

**New measurements (build 7, 879 lessons, 4 CPUs, from the chief of staff's run, 2026-10-14).** Compile 2.3 min, type check 2.0 min, page generation 2.8 min: **about 7.1 min per build** and **1.2 GB of output**. Full QA of 200 lessons took 36 min, so **10.8 s wall per lesson** and **about 2.6 h for all 879**. Against the EDD (348 lessons: 73 s, 321 MB, 6.6 s per lesson):
- Build time per lesson went from 0.21 s to 0.48 s, and output per lesson from 0.92 MB to 1.37 MB. Both grow faster than linear, as the EDD warned for the whole-program steps. Linear from today, a build passes the 10-min stage-1 trigger at about 1,250 lessons and takes about 16 min and 2.7 GB at the founder's 2,000.
- **The stage-1 QA trigger (full QA over 2 h) has already fired**, and the 1,000-lesson trigger is about 120 lessons away. Stage 0's changed-only QA (in progress, another platform engineer) removes most full sweeps, but not the ones a kit change forces: a kit change such as W-287 touches every compiled lesson. Stage 1 is the part that makes kit changes cheap (lesson bundle hashes do not change; SPIKE-001).
- Finding 1 (new, security, P2): **the spike route was merged into the app and ships to production.** `src/app/spike/` came in with merge f6c710c (SPIKE-001 says "never merged"), nothing excludes it, and deploys have run since. `SpikeHost` takes its lesson origin from `?cdn=` in the URL, merges any `progress` message into the host's real `localStorage` (`mergeProgress`) and forwards `track` events to `/api/events`. So a link to `/spike?cdn=<any site>` frames attacker content under our domain, writes forged progress for real slugs on the learner's device, and injects events into our metrics. No credentials exist yet, so no account is exposed. I did not check the live site. Route: platform-engineer removes the route from the app build or returns `notFound()` in production (board W-477); privacy-reviewer is told through W-086.
- Finding 2: the warm budget. SPIKE-001 change 8 is mine. **New definition:** with the active card ±1 frames pre-created, the next card is interactive (first input handled) ≤ 300 ms after the snap settles, and its first paint after the snap ≤ 100 ms, on a mid Android phone and an iPhone (W-085). Remount from the HTTP cache is a cost to know, not a budget: ≤ 700 ms at 4× CPU (measured 267–687 ms). The cold budget (≤ 1.5 s) stays.

**Answers to the reviewer questions.** Where a reviewer has not answered, I write my position as a reviewer input and say what it blocks. My position is not their sign-off.

| Q | Answer | Status |
|---|---|---|
| platform 1 (budgets, tsc) | Budgets are right except warm (redefined above). `tsc` is not enough: something must resolve local imports and CSS modules. | answered (SPIKE-001); bundler goes to the founder |
| platform 2 (iframes in snap feed) | Works in Pixel 7 emulation: swipe chaining, slider drag. Host `j`/`k` keys need forwarding over the bridge. Fallback A2-a until auth exists. | answered for Chromium; **real devices block ADR-006** (W-085) |
| platform 3 (import map with Next 16) | Works and does not depend on Turbopack, because the shell never compiles lesson code. | answered |
| steward 1 (where vs what) | My reading: amendments 1, 4 and 5 change only where gates look. **Amendment 2 changes what a gate demands**: it is stricter (QA must match the published hash), so it is a real amendment, not a relocation. **Amendment 3 can weaken a gate**: "the evidence exists in the index" is weaker than "the file exists" unless the index entry carries the record's hash and the gate checks it. | **open, evaluation-steward** (W-087); blocks ADR-004 and ADR-007 going to accepted |
| steward 2 (QA sample) | My proposal: kit minor = kit contract on one fixture lesson per kit major + a stratified sample of max(30, 5%) lessons with at least one per domain and every geo lesson if the geo kit changed. The steward sets the number. | **open, evaluation-steward** |
| steward 3 (claim carry-over) | A claim carries over only if the hash of its text, support and source is unchanged **and**, for claims about what the stage shows (decision 2026-10-14-reveal-quotes-what-you-saw), the bundle hash is unchanged too. A code change re-opens every "you see" claim. | **open, evaluation-steward** |
| backend 1 (where artifacts live, cost) | Shell and manifest on Vercel as today; bundles and frame documents on a **separate registrable domain** (W-086). From SPIKE-001 sizes: about 68 KB for a learner's first lesson, then about 3.4 KB per lesson, so 1M lesson views is roughly 3.4 GB plus first-visit kit traffic. Provider and spend is founder question 6. | partly answered; provider open (founder) |
| backend 2 (events from frames) | Answered by the spike's design: frames post to the host; the host checks the source window and slug and alone calls `/api/events`. Frames never hold a credential. Host → frame messages use `targetOrigin "*"`, so the host never sends anything private. | answered (design); typed bridge spec is SPIKE-001 change 3 |
| backend 3 (store earlier) | Not answered. | open, backend-engineer; not blocking before stage 3 |
| privacy 1 (opaque origin enough?) | Not enough alone: the CSP stops network exfiltration, so it must be an HTTP header; plus a separate registrable domain, `__Host-` app cookies, `referrerpolicy="no-referrer"`, an empty `allow=""` Permissions-Policy on each frame, and SRI (the spike has SRI). | **open, privacy-reviewer** (W-086); blocks ADR-006 |
| privacy 2 (progress moves) | My reading: no change in what is stored or where. Lessons already run on the app origin today, so progress already lives in the app's `localStorage`; the bridge keeps it there, on the device (constitution Art. 6.2). | open for privacy sign-off; not blocking |
| privacy 3 (new data flow) | A second domain on the same provider adds no new processor. A different CDN provider would get learners' IPs and needs disclosure. | open, privacy-reviewer, decided with founder question 6 |
| tools 1, 2 (`slug@hash` in tools, incremental check) | Not answered. Needed before stage 1 ships, not before the ADRs are written. | open, tools-lead (W-478) |
| tools 3 (sparse checkouts) | Not before the gates read an index (EDD stage 0 already says so). Full checkouts are cheap at 2,000 lessons (about 35 MB of tree). | answered |

**Founder questions (EDD-003).** None was answered in writing. Which ones block anything:
- Q7 (does "the disk is the memory" mean git) and the bundler dependency are taken to the founder now: [2026-10-14-lesson-bundler-and-memory.md](../../decisions/2026-10-14-lesson-bundler-and-memory.md). Q7 matters in stage 1, not only stage 3, because publish and rollback move into a manifest.
- Q6 (CDN spend and provider) blocks stage-1 shipping, not the ADRs. Ask with W-086.
- Q3 (when login arrives) sets the deadline for ADR-006, not its direction. The founder already chose "browser, in a sandbox" (2026-10-13).
- Q2 (translations) has a proposal from International (`company/domains/lifehacks-scope/localization.md`: universal claims carry over through a verified translation). It belongs with ADR-008, which waits (below).
- Q1, Q4 and Q5 do not change stage 1: the A3 hybrid serves 10k concepts or 1M variants, and SEO and offline both stay possible. They are not asked now.

## Decision

**Approve with changes (2026-10-14, principal-engineer).** The direction holds: A3 hybrid, lesson code only in the browser in a sandboxed cross-origin frame, content-hashed bundles against a versioned kit, the manifest as the registry, sources in git until the stage-2 triggers. SPIKE-001 (W-074) is accepted as evidence for it: **go with changes**. ADR-003 to ADR-007 are written as **proposed**. ADR-008 (variants as data) is not written: no reviewer tested it, the line between a variant and a new lesson is undefined, and W-089 owns that work. ADR-009 waits for its stage-2 trigger.

Stage 1 may start **design and tooling** work (bundler, bridge spec, CSS split, lesson domain) once the founder decides the bundler. It may not **migrate a lesson or change a gate** until: W-085 passes on real devices; W-086 is done; the evaluation steward's amendment (W-087) is ratified; the founder has answered Q6. Stage 0 (slim index, changed-only QA) is someone else's work in progress and is not changed by this review.

Objections that travel with it, and what happened to each:
| Objection | Raised by | What happened |
|---|---|---|
| Iframes in a snap feed may fail on touch and focus | principal-engineer | Partly answered: passes in Chromium emulation (SPIKE-001). Open on iOS Safari and Android Chrome; W-085 blocks ADR-006. |
| Per-lesson builds pay off only with change-proportional CI | principal-engineer | Partly answered: a full rebuild of all 348 lessons took 225 s under load against 73 s for the app, so a full rebuild costs more; a change costs 0.14–1.6 s per lesson. The stage-1 exit measurement stays: total CI minutes per week must fall. |
| Changing where gates look is close to changing the gates | principal-engineer | Sharpened, not answered: I read amendment 2 as a real change of demand and amendment 3 as able to weaken a gate. The evaluation steward decides (W-087). |
| The sandbox alone does not stop exfiltration; cookies leak across ports | platform-engineer | Accepted: CSP as an HTTP header and a separate registrable domain are conditions of ADR-006 (W-086). |
| Building on `next/dist/compiled/*` is a private API | platform-engineer | Accepted: taken to the founder as the bundler decision. |
| The spike route is live in production with an open `?cdn=` | principal-engineer (this review) | Open, funded: W-477 (platform-engineer, P2). |

## Kudos
- @platform-engineer (Noor): SPIKE-001 measured everything the EDD asked for, ran a positive control before the negative test, and found the two problems that change the design (CSP as a header, cookies ignoring ports).

## Heads-up for the principal engineer (chief of staff, 2026-10-13 22:50)
Three new orgs exist: Life Hacks, Personalization and International (`company/decisions/2026-10-13-three-more-orgs.md`). They touch this review directly:
- International makes locale variants a first-class axis: variants as data, a format and units layer, RTL, and claims per locale.
- Personalization needs ordering outside lesson code, plus the backend.
- Life Hacks may bring media assets, which affects the per-lesson budget and the CDN policy.

Please fold these into EDD-003 stage 1, or open EDD-004 if they are big enough (board W-089).

Reply (principal-engineer, 2026-10-14): not folded in here. The three orgs mostly touch ADR-008 (variants as data) and assets (W-119), which this review does not decide. They stay with W-089, which is mine, and are the reason ADR-008 was not written yet.
