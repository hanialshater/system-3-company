# First Light: week-1 re-estimate (W-908) and the Q5 feasibility answer (W-930)

owner: principal-engineer (Kenji), tech lead · for: Head of Strategic Initiatives (chief-of-staff until W-904), portfolio-manager, evaluation-steward, founder · date: 2026-10-15 · tier: advice (no change made; untagged week-1 scoping, the first-light budget waits on Project Review 1)
Inputs: [charter](../../initiatives/first-light/charter.md), [founder decision](../../decisions/2026-10-15-founder-first-light.md), [quality bar](../../initiatives/first-light/quality-bar.md), [budget pack](../../ceo-office/2026-10-14-project-review-1-agenda.md) (Addendum 2026-10-15), [scalability note](2026-10-14-scalability-options-for-founder.md), [stage-0 note](2026-10-14-edd-003-stage0-feed-and-qa-changed.md), [r7 readiness record](../readiness/2026-10-15-r7-drafts-trust-sheet.md). Companion: [W-946 loaders design](2026-10-15-w946-loaders-design.md).

> **Updated 2026-10-16 (W-1121):** the full-scope re-estimate (ad slot, prediction swap, challenges) is in [2026-10-16-first-light-reestimate-full-scope.md](2026-10-16-first-light-reestimate-full-scope.md). It supersedes this note's §2 totals, §3 dates and odds, and the cut order. §1 (Q5) and the unit costs stand. A1 is already applied (0d76ae1).

## Short answer

1. **Q5 is reachable, and cheaply.** I built the registry split in a scratch worktree and measured it. `/` HTML goes from 309,937 B to **47,614 B**, first-load JS from 2.71 MB gz to **230 KB gz**, and the 4x-throttled phone time from 4.6 s to **0.89 s**, with 24/24 contract tests (12 lessons on 2 viewports) and the feed spec 10/10 passing. So **A1 (W-946) goes onto First Light's critical path**, as the bar asked. It is about one code run once AMD-001 (c2) is ratified, and it also halves build time.
2. **The dates hold for a cut scope, not for the full one.** Go/no-go 2026-11-23 and launch 2026-11-30 hold if the ad slot is cut now and light social is limited to share links. My confidence is medium (about 60%). With the full scope, I put it at about 25%.
3. **The critical path runs through decisions, not code.** In order: F-01 plus a sign-in account by 10-23, the privacy reviewer's first-ever run on the data model before any schema exists, EDD-008 approved by 10-28, and W-906 ratified by 10-30.
4. **What I'd cut first:** the ad slot (now, not at 11-09), then social down to share links only, then challenges (mastery state stays).
5. **Vercel Hobby vs Pro is unverified.** vercel.com was refused by this host's proxy (403, 2026-10-15 10:00 UTC).

## 1. Q5: measured, not projected (W-930)

Method: the stage-0 note's method, in a scratch worktree at `9c0b76e` with all 960 lessons visible (a local build, so drafts were included, which is the worst case). The steps were `next build` into separate dist dirs, `next start`, fetch `/` and gzip -9 every `<script src>`, then Pixel 7 emulation with a 4x CPU throttle (CDP), timing navigation until a tap on Start scrolls the feed, median of 3. Host load was 3 to 9 during the runs, so **timings are directional and bytes are exact**. This is not the bar's evidence. The bar wants a Vercel preview of the release SHA. The scratch tree was deleted afterwards and nothing was committed.

| Build | `/` HTML | stylesheets on `/` | first-load JS (gz) | chunk with internal strings | phone 4x, usable | `next build` |
|---|---|---|---|---|---|---|
| Base (HEAD) | 309,937 B | 751 | 2,711,774 B (10.1 MB raw) | 1 (5.39 MB, 1.33 MB gz) | 4.61 s | 3m05 |
| A: DemoHost imports a loaders-only module (the client half) | 309,937 B | 751 | 1,399,272 B | 0 | 3.57 s | 3m06 |
| E: A, **plus** catalog.ts imports a metas-only module (both halves) | **47,614 B** | **1** | **229,969 B** | **0** | **0.89 s** | **1m35** |
| Bar (Q5.1, Q5.3, Q5.4) | ≤ 250,000 B | | ≤ 500 KB gz | | ≤ 3.0 s | |

Also on build E: `/d/asthma-looks-safe` is 12,303 B with 1 stylesheet (Q5.2). Contract QA on 12 lessons (3 geo-kit lessons, Life Hacks lessons, and others: asthma-looks-safe, moon-hammer-feather, lakes-misplaced-east-west, indonesia-vs-the-us-width, fifty-hour-monday, lh-weighted-volume-allocation, london-december-noon-sun, cue-needs-a-boundary, four-queens-pruning, pinhole-flips-the-world, unit-price-aisle, each-element-pops-once) on phone and desktop passed 24/24, the feed spec passed 10/10, and a geo lesson's screenshot renders styled.

**What I got wrong before, and correct here.** The stage-0 note and my scalability note called the second 3.6 MB first-load chunk "the geo kit, duplicated". It is not. It is **every lesson's code**, and it is there for the same reason the 751 stylesheets are. `src/lib/catalog.ts` (server) imports `registry.generated.ts`, whose `loaders` hold an `import()` of every `"use client"` `Demo.tsx`. That makes all 960 lessons client references of every page (`/page` client-reference manifest: 961 project modules). Turbopack then bundles them, and hoists their CSS, into the page's entry chunk: the async loaders compile to `Promise.resolve().then(...)`. Splitting only the client side (build A) removes the metas but not the lessons or the CSS. Both halves are needed. This also mostly closes **W-607** (home and catalog chunks carry every lesson's code), and it probably makes **W-669** (CSS strategy EDD) unnecessary. platform-engineer should re-measure both after A1 lands, before anyone writes that EDD.

**The answer to W-930: yes, reachable**, on the following conditions:
- **A1 lands by about 10-30**, so every surface is built and measured against the new baseline. It needs AMD-001 (c2) ratified (founder; W-667), then one platform-engineer code run plus a PE review. The design is in the W-946 note.
- **The new surfaces stay out of first-load JS.** They get 270 KB gz of headroom under 500 KB. Sign-in and account UI, challenges and the ad card load on demand (`import()` on interaction or route). Only the personalization rules (small, pure functions) and an account badge may join the feed's entry chunk.
- **`/` and `/d/*` stay static.** Account state comes from `/api/me` after hydration. A server-rendered, per-user `/` would cost Q5.4 and make every feed view a function call.
- **Re-measure on a Vercel preview** at RC1. My 0.89 s ran on a loopback network. A preview adds real latency, and the per-lesson chunks now load one by one as you scroll (see the W-946 note's "would be wrong if").

## 2. Re-estimate per workstream (W-908)

Units are the budget pack's (platform-engineer 110k per code or fix run, PE review 69k, privacy reviewer 75k, readiness 81k, QA 27k, accessibility 77k, release 37k). These are tranche 2 figures. Learner, pedagogy and accessibility review of the surfaces now sit in the evaluation steward's quality line (quality-bar section 3) and are not repeated here.

| Workstream | Effort, T2 (runs → tokens; pack figure) | On the critical path? | Depends on | EDD / ADR (tier) | New dependencies needing a decision record |
|---|---|---|---|---|---|
| **Auth, anonymous-first, history kept** | 6 code + 2 fix + 2 PE + 1 privacy + 1 readiness + 2 QA = 14 runs → **1.23M** | **Yes, the longest chain**: F-01 → spike → EDD-008 → code 10-28..11-06 → readiness → round 1 on 11-10 | F-01 (library, DB, age floor) by 10-23. **A new founder item:** the sign-in method needs an outside account, either an email sender for magic links or an OAuth app. Also the privacy data-model ruling, and the T1 spike on Next 16.4 | **EDD-008 "Accounts and server-side progress"** (tier 2, shared with the next row). **ADR-008** on the auth library (expensive to reverse) | The auth library. Measured on npm today: `next-auth` stable is 4.24.15, and **v5 for Next 16 is still `5.0.0-beta.32`** (2026-07-20). `better-auth` is 1.7.9 (MIT, peer `next ^16`, `pg ^8`). F-01's "Auth.js" therefore means a beta or the old line, and the record should compare the two. I lean to Better Auth. Email by HTTP API through `fetch`, so no SDK |
| **Server-side progress and the database** | 6 code + 2 fix + 2 PE + 1 privacy + 1 readiness + 2 QA = 14 runs → **1.23M** (auth plus progress: 2.46M; pack: 1.73M) | Yes, the same chain. It can run alongside auth from 11-02 | F-01 (DB host), the privacy ruling on fields, deletion and export, a Neon (or other) account from the founder | Inside EDD-008. **ADR-009** on the database host and driver. Plus the EDD-007 readiness records for the auth and DB paths | `pg` (8.23.1, MIT), one driver for both auth and progress. **No ORM and no migration library**: plain SQL migrations, forward-only (expand, then contract) |
| **Rule-based personalization** | 4 code + 2 fix + 2 PE + 2 QA = 10 runs → **0.85M** (pack 1.14M) | Yes, through W-906 (ratified by 10-30), but not through auth: the rules read the local progress record that already exists | W-906, AMD-FL-B's feed.spec rewrite, reason copy recorded as claims (Q3.4), the chip-prefix invariant (`feedOrder`) | **EDD-009 "Learner model v1: mastery state and feed rules"** (tier 2: it reads learner data and changes the feed's contract). One EDD for this row and the next | None |
| **Mastery and challenges** | 5 code + 2 fix + 2 PE + 1 a11y + 2 QA = 12 runs → **1.04M** (pack 1.22M). Without challenges: about 0.64M | Partly. Mastery state is on it (W-906). Challenges are not | W-906 (definition and banned phrases), growth-designer spec. **Challenges are built from existing lessons and their recall questions, with no change to the kit or `Lesson.tsx`** (protected) | Inside EDD-009 | None |
| **Light social** | Share links only (Web Share or copy link, one static OG image, no stored social data): 2 code + 1 fix + 1 PE + 1 privacy + 1 QA = 6 runs → **0.50M** (pack 0.82M) | No | Privacy gate (does it ship). Anything that stores or shows another learner's data (friends, leaderboards, user text) **does not fit 11-30** | Share links are tier 1: no EDD. Any stored social data would be tier 2 with its own EDD, so it goes to release 2 | None (no per-lesson OG images: 960 images at build) |
| **The ad slot (stages 0-1, house cards)** | As in the pack, **0.53M**, 7 runs, plus about 1.4M in the quality line. **Recommend cutting now** | No, but it pulls F-17, F-19, F-20, W-891 and a privacy ruling into the window | W-891, W-906, privacy ruling, Vercel Pro | Tier 1 feed UI. Its rules live in W-906, so no EDD | None |
| **Legal basics** | 1 code (static pages; the age gate moves into EDD-008's sign-up flow) + 2 revisions + 1 QA → **0.29M** (as in the pack) | Yes, by calendar: the privacy reviewer has **never run**, and outside counsel is a founder decision | Privacy reviewer drafts, founder on counsel, F-01's age floor (13+ recommended) | Pages are tier 0. The age gate is in EDD-008 | None. No third-party scripts, so no cookie banner needed for strictly necessary session cookies. That is the privacy reviewer's ruling, not mine |
| **Infra and readiness** | **A1 (1 code + 1 fix)**, env and secrets, production and preview DB branches with a migration runner (2), error beacon with no SDK (1), backups and a restore drill (1), 3 PE, 6 readiness (auth, DB, event API, deploy, 2 go/no-go), 4 launch runs, 4 full QA = 23 runs → **1.61M** (pack 0.95M; A1 moves here from scale-stage-1, which had 0.56M for it) | **A1: yes** (Q5). Domain and DNS: yes, by calendar (F-23, F-18, purchase by about 11-06) | AMD-001 (c2) for A1, the founder for the domain, Vercel Pro and the DB account. Founder-approved deploys in launch week (plan about 3) | No new EDD. EDD-001 option 4 is the design for A1. EDD-002 and EDD-007 already exist. Readiness records per tier-2 path. **No Sentry SDK**: `window.onerror` to `/api/events` plus Vercel logs (a tier-2 events-path change, so a readiness record) | None |

**Totals.** Engineering T2 is **7.27M with the ad slot, or 6.74M without it**. Adding the pack's cadence line (1.49M) gives **8.76M or 8.23M**, against the pack's 8.17M and the stop rule's 10.2M. **That is inside, but only without the quality line.** The evaluation steward's 6.3M to 9.2M was not in the pack, and with it T2 is 14.5M to 17.4M. The stop rule has to be re-based. That call belongs to the portfolio-manager and the founder, not me. As the pack says, tokens are not what binds. **What binds:**
- serial gating: decisions, then EDD, then privacy, then code, then readiness;
- the privacy reviewer's first run;
- about 17 PE reviews in four weeks, from me;
- host time for builds and QA. A1 cuts build time roughly in half, which is another reason to land it first.

T1 additions to the pack: EDD-008, EDD-009, ADR-008 and ADR-009, two dependency decision records, one auth spike on Next 16.4 (1 code run), and the A1 review.

## 3. The dates

| Date | Must be true | Owner |
|---|---|---|
| 10-22 | EDD-008 draft. Auth spike done. Privacy reviewer's gate criteria and a first data-model read | principal-engineer with backend-engineer; privacy-reviewer |
| **10-23** | **F-01 decided, plus the sign-in method and its account.** Bar frozen. Tranche 2 released | founder |
| 10-28 | EDD-008 approved (eng review), ADR-008 and ADR-009 accepted | principal-engineer |
| **10-30** | **W-906 ratified. AMD-001 (c2) ratified, then A1 merged.** EDD-009 approved | founder; evaluation-steward; platform-engineer |
| 11-06 | Auth and progress feature-complete on a preview with the preview DB. AMD-FL-B and AMD-FL-C tests merged. Domain bought and pointed | backend-engineer; evaluation-steward; founder |
| 11-09 | Surfaces feature-complete. Readiness records filed. Privacy rulings in (the budget's stop rule) | builders; principal-engineer-ops; privacy-reviewer |
| 11-13 → 11-30 | RC1, T-7, final SHA, verdict, launch, as in the quality bar section 2.1 | per the bar |

**Verdict.** The dates **hold for this scope**: auth, progress, legal, infra with A1, mastery, personalization (if W-906 is ratified by 10-30; otherwise it ships switched off, per the bar section 4), and share-link social. Confidence is **medium, about 60%**. They **do not hold** for the full scope with the ad slot and richer social (about 25%). **Slip rule (proposed):** if F-01 and the sign-in account are not decided by 10-23, or EDD-008 is not approved by 10-28, go/no-go moves by the same number of days. The quality dates follow it, as the bar section 2.1 says. The Head of Strategic Initiatives proposes the move.

**Cut order.**
1. **The ad slot, now.** It brings four founder decisions and a privacy ruling into the window, earns $0 at launch, and costs about 0.53M plus about 1.4M of quality runs. The founder already allowed it to slip.
2. **Social down to share links only**, or cut entirely.
3. **Challenges.** Mastery state stays.
4. Personalization is never cut by hand: it switches off by itself if W-906 misses.

Never cut: auth with history kept, progress, legal, infra, A1.

## 4. Vercel Hobby vs Pro: unverified

`curl` to vercel.com/docs/plans/hobby, /docs/limits/fair-use-guidelines and /pricing all failed with **CONNECT 403 from this host's proxy** (2026-10-15 about 10:00 UTC). The r7 readiness reviewer and the ads proposal hit the same block. My own recollection is that Hobby is for personal, non-commercial use and Pro is about $20 per member per month. **That is memory, not a source.** Treat both as unverified until the founder or a host that can reach vercel.com reads the fair-use guidelines and the pricing page (F-18). Whether a house-card-only slot already counts as commercial is a reading of those terms, and nobody here has done it. Cutting the ad slot does not remove the question. The founder has already approved Pro in principle, so plan to have it before launch.

## 5. Objections, including against me

- **"A1 is EDD-003 stage 1, which the founder kept off the critical path."** It is not. A1 is EDD-001 option 4 (two generated files and two import lines). Stage 1 (bundles, manifest, frame) stays a pilot, off the critical path. The measurement shows A1 alone meets Q5.
- **"0.89 s is a loopback number."** Agreed. That is why the bar's evidence is a Vercel preview at RC1. The margin is about 3x under 3.0 s.
- **"Better Auth instead of F-01's Auth.js reopens a founder recommendation."** Yes. The record should weigh both. My evidence is the npm registry (v5 is still beta). My belief that Auth.js maintenance moved under Better Auth is memory and unverified.
- **"Anonymous stays local-only"** means a learner who never signs up has no cross-device history. That is the trade for keeping no anonymous server identifier (the event API's "no identifiers" rule). EDD-008 must state it, and the privacy reviewer should agree.
- **My figures.** Run counts are guesses with a 1.25x to 1.5x error. The units are measured. Timings come from a loaded shared host.

## 6. Board asks (for the chief of staff; I did not edit board.json)

1. **founder:** decide F-01 with a sign-in method and its account by 10-23 (new item); ratify AMD-001 (c2) (W-667); F-18 and F-23.
2. **head-of-product:** cut the ad slot to release 2 now, and scope social to share links.
3. **evaluation-steward:** bring AMD-001 (c2) to ratification with the W-946 rider (see the W-946 note); Q5 numbers stand as written.
4. **platform-engineer:** A1 per the W-946 note, after (c2) is ratified. Then re-measure W-607 and W-669 before anyone writes the CSS EDD.
5. **backend-engineer with principal-engineer:** the auth spike and EDD-008 by 10-22.
6. **learner-model-engineer with personalization-lead:** EDD-009 after the W-906 draft (10-21).
7. **privacy-reviewer:** a data-model read before 10-26.
8. **portfolio-manager:** re-base the T2 stop rule now that the quality line exists, and move A1's budget from scale-stage-1 to first-light.
9. **principal-engineer:** close W-908 and W-930 against this note.
