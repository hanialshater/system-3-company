# First Light: the launch quality bar

owner: evaluation-steward (Hilde) · quality team: qa-tester, accessibility-reviewer, fact-checker, learner-evaluator, pedagogy-critic
decision: ../../decisions/2026-10-15-founder-first-light.md (Amendment 1) · charter: charter.md · board: W-919 (bar), W-906 (Surface Value amendment)
status: **proposed, 2026-10-15** (week-1 scoping, untagged). Open for objections until the freeze on **2026-10-23**. After that it changes only as described in section 2.4.
budget: none yet. The first-light budget is not approved, so this run builds no tools and no tests. Every "planned" item below waits for it.

A quality **no-go** stops the launch. Only the founder can overrule it, in writing, with the objection recorded (section 2.5). The Head of Strategic Initiatives' go/no-go recommendation carries this verdict as it stands. It does not replace it.

---

## 1. The bar

**How to read a row.** *Check* is what is run or read, and on what. *Pass* is the number. *Owner* is the person in the quality team who produces the evidence and may fail the row. *Evidence* goes under `company/initiatives/first-light/quality/` (created at the first evidence run, not now). `<sha>` always means the **release SHA**: the commit that `tools/deploy.mjs production` will deploy (section 2.3).

Two conventions:
- **Launch catalog** means the list of published lessons that head-of-product names for launch (decision item 7), frozen on 2026-11-13. Lessons published after that date do not join it.
- **Cut surfaces.** If a surface is cut to release 2 (for example the ad slot, under decision item 4 or the budget stop rule of 2026-11-09), its rows are replaced by a single check: *the surface is absent or switched off in the release build*. That is a scope cut, made by head-of-product. It is not a waiver.

### Q1. QA contract on the exact release build

| ID | Criterion | Check | Pass | Owner | Evidence |
|---|---|---|---|---|---|
| Q1.1 | Catalog contract | `npm run build` then `npm run qa` (contract.spec.ts) on `<sha>` over every launch-catalog lesson, Pixel 7 and desktop | 0 failures. The report carries a clean harness stamp whose commit equals the `tests/qa` commit at `<sha>` (planned AMD-FL-A, W-783) | qa-tester | `quality/evidence/<date>-q1-catalog-<sha7>.md` + the `qa-report.json` path |
| Q1.2 | Feed spec | feed.spec.ts on `<sha>`, as rewritten for personalization (planned AMD-FL-B) | 100% pass | qa-tester | same file |
| Q1.3 | Catalog integrity | Planned AMD-FL-A tests: (a) the production build serves only launch-catalog lessons in the feed, map and `/d/<slug>`, and drafts and In-review lessons return 404 or are absent (decision item 7; W-884 shipped in r7, so this checks that it holds); (b) the trust sheet of every catalog lesson matches no internal-note pattern (`FACT-CHECK`, `NCM-`, `Fact-checker to`, `checkedBy`, `TODO`, reviewer role names) (W-878 shipped in r7) | 0 reachable non-catalog lessons; 0 pattern hits | qa-tester | `quality/evidence/<date>-q1-integrity-<sha7>.md` |
| Q1.4 | Auth, anonymous first | Planned surface spec: complete 2 lessons and 1 revisit anonymously, then sign up. The history (completions, recalls, due revisits) is identical before and after. Sign out and back in on a fresh browser context: the history follows. Refusing sign-up leaves the anonymous feed fully usable | identical history in 3 of 3 runs; 0 contract regressions | qa-tester | `quality/evidence/<date>-q1-surfaces-<sha7>.md` |
| Q1.5 | Server-side progress | Planned surface spec: progress written on device A appears on device B within one reload. Offline or a failed write shows a visible retry and does not lose the local record. A spaced revisit still comes back on time (the feed.spec revisit test, run against the server path) | 0 lost records over a 20-event script; revisit test passes | qa-tester | same |
| Q1.6 | Personalization (rule-based) | Planned surface spec: every reordered card shows the reason, and the reason names the rule that fired (the reason is a learner-facing claim, so it must be true). Cold start is still honest (the replacement for "not for you"). With personalization off, the order equals the Surface Value default. No rule reads engagement signals (dwell, swipes, shares) | 0 cards whose reason disagrees with the rule log; 0 engagement inputs | qa-tester (test); pedagogy-critic (does the rule set serve learning, one record) | same + `quality/reviews/<date>-pairwise-personalization.md` |
| Q1.7 | Mastery and challenges | Planned surface spec: no streak counters, no loss or guilt copy (a banned-phrase list fixed in the W-906 amendment), mastery state derived only from recall and completion as W-906 defines, and predict-before-reveal still enforced inside every challenge | 0 banned phrases; 0 challenges that skip the prediction | qa-tester; pedagogy-critic (does mastery mean what it says, one record) | same + `quality/reviews/<date>-pairwise-mastery.md` |
| Q1.8 | Light social | Planned surface spec: whatever ships (the scope is still open) works logged-out and logged-in, never shows another learner's progress unless they opted in, and has a working report path if it carries user text. *Whether* it may ship is the privacy reviewer's gate, not this row | spec passes; 0 cross-account leaks over a 2-account script | qa-tester | same |
| Q1.9 | The ad slot | Planned surface spec against W-891's ruled numbers: labelled "Ad" (or the ruled label), between lessons only, at most 1 per 6, never the first card, never next to a revisit; the lesson order is identical with ads on and off; 0 requests from the host page to origins the privacy ruling does not allow | every rule holds on 3 seeded feeds; 0 disallowed requests | qa-tester | same |
| Q1.10 | Exploratory pass | The qa-tester's exploratory checklist (company/qa/computer-use-testing.md) on each shipped surface at 390×844, 360×640 and desktop: double taps, wrong order, reload mid-flow, back button, both themes | 0 open findings marked `blocks-launch` | qa-tester | `quality/reviews/<date>-qa-<surface>.md` |

### Q2. Accessibility: WCAG 2.2 AA on the new surfaces

Scope: sign-up and sign-in, the age gate and legal pages (their *function* and accessibility only: their content is the privacy reviewer's), the account and progress view, personalization reasons, mastery and challenge UI, social, and the ad card. The catalog keeps today's standard (aria-label on every SVG stage, no meaning carried by colour alone, contrast in both themes).

| ID | Criterion | Check | Pass | Owner | Evidence |
|---|---|---|---|---|---|
| Q2.1 | Keyboard and focus | 2.1.1 Keyboard, 2.1.2 No keyboard trap, 2.4.3 Focus order, 2.4.7 Focus visible, **2.4.11 Focus not obscured (minimum)**: a full keyboard-only pass of every surface flow (sign-up end to end, a challenge end to end, skipping the ad card) | 0 failures | accessibility-reviewer | `quality/reviews/<date>-a11y-<surface>.md` |
| Q2.2 | Targets and reflow | **2.5.8 Target size (minimum)**: 24×24 CSS px, which the contract already enforces on the stage and planned AMD-FL-C extends to surface controls. 1.4.10 Reflow at 320 CSS px. 1.4.4 Resize text to 200% | 0 failures | accessibility-reviewer (judges); qa-tester (runs the automated half) | same + Q1 surfaces evidence |
| Q2.3 | Forms and authentication | 1.3.1 and 4.1.2 (labels, name, role, value), 3.3.1 and 3.3.3 (errors identified, with a suggested fix), **3.3.7 Redundant entry**, **3.3.8 Accessible authentication (minimum)**: no cognitive puzzle, and paste and password managers work. If a CAPTCHA is used it needs an alternative | 0 failures | accessibility-reviewer | same |
| Q2.4 | Status and motion | 4.1.3 Status messages (mastery changes, saved progress, errors are announced). 2.2.2 Pause, stop, hide (the ad card does not animate, and nothing autoplays, as Surface Value already says). `prefers-reduced-motion` is honoured | 0 failures | accessibility-reviewer | same |
| Q2.5 | Contrast and colour | 1.4.3 (4.5:1 text), 1.4.11 (3:1 non-text), 1.4.1 Use of colour, in light and dark, including the ad label and mastery states | 0 failures | accessibility-reviewer | same |
| Q2.6 | Consistent help | **3.2.6 Consistent help**: if any help or contact link exists, it sits in the same place on every account and legal page | 0 failures | accessibility-reviewer | same |

The automated half uses Playwright's own accessibility snapshot and computed styles. axe-core would be a new npm dependency and needs a decision record (CLAUDE.md), so this bar does not assume it.

### Q3. Claims and the launch catalog (W-878)

| ID | Criterion | Check | Pass | Owner | Evidence |
|---|---|---|---|---|---|
| Q3.1 | Every claim verified | `npm run check` on `<sha>`, plus a read of every launch-catalog `meta.json` | 0 claims in the catalog whose status is not `verified`; 0 disputed; 0 verified by their own author | fact-checker | `quality/evidence/<date>-q3-claims-<sha7>.md` |
| Q3.2 | No unrecorded claims | A sample audit: 40 catalog lessons, stratified by domain, each read from its walkthrough transcript before its meta.json | 0 unrecorded factual sentences. Each hit is fixed, and that domain's sample grows by 10 until a clean round | fact-checker | `quality/reviews/<date>-q3-sample.md` |
| Q3.3 | No internal notes visible | Q1.3(b), automated, plus the fact-checker reads the rendered trust sheet of the 40 sample lessons | 0 hits | fact-checker (reading); qa-tester (scan) | same |
| Q3.4 | Surface copy is claimed | Every factual sentence on a new surface (mastery messages, personalization reasons, house-ad creatives, empty states that state facts) is a recorded claim with an address and a source, and it is verified | 0 unrecorded; 0 unverified | fact-checker | `quality/reviews/<date>-q3-surface-copy.md` |

### Q4. Learner review of the new surfaces, as borrowed minds

| ID | Criterion | Check | Pass | Owner | Evidence |
|---|---|---|---|---|---|
| Q4.1 | Two borrowed minds per surface | For each shipped surface: two boundaries, a **13 to 15-year-old newcomer** (the age floor depends on F-01) and a **sceptical adult who already knows the idea**. Each reviewer works from a surface walkthrough (screens and transcript) **before** reading the PRD or any builder or war-room account | 0 open findings marked `blocks-launch` (the learner-evaluator's authority: "block launch with a specific finding") | learner-evaluator | `quality/reviews/<date>-learner-<surface>-<boundary>.md` |
| Q4.2 | Specific probes | The newcomer can tell what signing up does to their history, and does not feel pushed. Both can say why a card was suggested. Neither reads mastery as a streak or a score to defend. Both can tell the ad from a lesson in under 2 seconds | each probe answered "yes" in the record, with a quote | learner-evaluator | same |
| Q4.3 | Independence | An evaluation-steward audit: every Q4 and Q2 record shows that the artifact came before the account (timestamps and file order) | 0 breaches. A breach voids that record, and the review is re-run by a fresh instance | evaluation-steward | `quality/audits/<date>-independence.md` |

A borrowed mind is a source of criticisms, not evidence that anyone learned. This row is a hard gate only for specific, blocking findings.

### Q5. Phone fit and performance budgets

Measured on a **Vercel preview of `<sha>`**, not on the shared host (R-001: load of 25 to 60 makes host timings directional only), with the launch catalog only. Method: the stage-0 note's method (company/engineering/notes/2026-10-14-edd-003-stage0-feed-and-qa-changed.md). Median of 3.

| ID | Criterion | Check | Pass (the launch number) | Owner | Evidence |
|---|---|---|---|---|---|
| Q5.1 | Feed HTML | Bytes of `/` | **≤ 250,000 B** raw. That is 50 KB of headroom under EDD-001's 300 KB, and personalization and the ad slot must fit inside it. Last measured at 309,902 B (2026-10-14, all 960 lessons) | qa-tester | `quality/evidence/<date>-q5-perf-<sha7>.md` |
| Q5.2 | Lesson page HTML | Bytes of `/d/<slug>`, the largest in the catalog | ≤ 250,000 B (last measured 249,318 B for one lesson) | qa-tester | same |
| Q5.3 | First-load JS | gzip sum of the `<script src>` files on `/` | **≤ 500 KB gz** (last measured 2.32 MB gz, of which 1.09 MB is the all-metas chunk) | qa-tester | same |
| Q5.4 | Feed usable on a phone | Pixel 7 emulation, 4× CPU throttle: time from load until a tap on Start scrolls the feed | **≤ 3.0 s** gate (EDD-001's 2 s stays the engineering target). Last measured 16.7 s on a loaded host | qa-tester | same |
| Q5.5 | Phone fit | The contract's overflow and tap-target checks on every catalog lesson (Q1.1), plus every new surface at 390×844 and 360×640 | 0 horizontal overflow; 0 targets under 24 px | qa-tester | Q1 evidence |
| Q5.6 | Reveal fit (reported) | `tools/reveal-fit.mjs` across the catalog, if W-242 has landed by the freeze. Otherwise a 390×844 screenshot sample of 40 | Reported, not gated, except: 0 catalog lessons whose reveal button or reveal text cannot be reached on a phone | qa-tester | same |

**The early finding, so nobody meets it on launch day:** Q5.3 and Q5.4 fail today by a wide margin. If they stand, the all-metas chunk fix (EDD-001 option 4 / EDD-003 A1) is on First Light's critical path, even though the founder's record keeps EDD-003 stage 1 off it. The principal engineer decides *how*, at W-908. If the founder wants the numbers lowered, that happens before the freeze, in writing. It does not happen at the verdict.

### Q6. No open SEV1 or SEV2

| ID | Criterion | Check | Pass | Owner | Evidence |
|---|---|---|---|---|---|
| Q6.1 | No open SEV1/SEV2 | Read the incident events (`type=incident`, summary `SEV1:` or `SEV2:`) and the ops-review closures (company/engineering/operations/incident-response.md step 6). principal-engineer-ops classifies and closes. The quality team only reads | 0 open at the verdict. A SEV1 or SEV2 opened between the verdict and the launch turns the verdict to no-go until it is closed or waived | evaluation-steward (reads) | `quality/verdict-2026-11-23.md` |

### 1.7 Items that need new tests in `tests/qa` (protected: my amendments, planned)

Nothing here is drafted or built in this run. Numbers are reserved in `company/constitution/amendments/README.md` when each is drafted, after the budget is approved. None of them touches `ci.yml`, so none queues behind AMD-003 or AMD-007.

| Planned | Surface | Covers | Depends on | Target ratified |
|---|---|---|---|---|
| **AMD-FL-A: release-build QA** | `tools/company.mjs` (`qa-record`), `tests/qa/lessons.ts`, a new `tests/qa/catalog.spec.ts` | The W-783 harness stamp (the existing proposal, proposed-qa-harness-stamp.md), which records QA only from a clean harness. A `QA_SET=launch` selector in lessons.ts that reads the frozen catalog list. The catalog-integrity tests (Q1.3) | nothing (it can go first) | 2026-10-30 |
| **AMD-FL-B: surface contract** | new `tests/qa/surfaces/*.spec.ts`; **rewrites** feed.spec.ts "cold start does not pretend to personalise" (it is replaced, not added to) | Q1.4 to Q1.9 | W-906 ratified (the tests encode its rules); W-891's slot numbers; the privacy rulings; testids agreed with the builders (the builders add `data-testid`s, the tests stay mine) | 2026-11-06 |
| **AMD-FL-C: launch budgets and surface access** | new `tests/qa/budgets.spec.ts`, and the target-size, keyboard-path and reflow checks for surfaces | Q5.1 to Q5.5, the automated half of Q2.1 and Q2.2 | the principal engineer's feasibility answer on the numbers (W-908) | 2026-11-06 |

Each amendment states what it removes and is reviewed for removal at the first distillation after release 2. Budget tests in particular must not become permanent by default.

---

## 2. The process

### 2.1 Dates

| Date | What | Owner |
|---|---|---|
| 2026-10-15 | This bar proposed | evaluation-steward |
| 2026-10-21 (Wed) | W-906 Surface Value amendment drafted, to the founder (F-19) | evaluation-steward |
| 2026-10-22 (Thu) | Objections deadline. Feasibility of Q5 from the principal engineer (with W-908). Privacy gate criteria from the privacy reviewer. Launch-catalog plan from head-of-product | named roles |
| **2026-10-23 (Fri)** | **The bar is frozen** at the founder review, before tranche 2 (the build) is released | founder (accepts); evaluation-steward |
| 2026-10-30 (Fri) | W-906 ratified (latest). AMD-FL-A ratified | founder; constitutional review |
| 2026-11-06 (Fri) | AMD-FL-B and AMD-FL-C ratified, and their tests merged | constitutional review |
| 2026-11-09 (Mon) | Privacy rulings due (budget stop rule). Surfaces without a ruling are cut, and their rows become "absent" | privacy-reviewer; head-of-product |
| 2026-11-10 to 11-12 | Round 1: surface reviews (Q1.10, Q2, Q4) on previews of feature-complete surfaces | quality team |
| 2026-11-13 (Fri) | Launch catalog frozen. Release candidate RC1 SHA cut | head-of-product; release-manager |
| **2026-11-16 (Mon)** | **T-7 dry run**: the whole bar on RC1. Record `quality/dry-run-2026-11-16.md` by 11-17: each row pass or fail, each fail with an owner and a board item | evaluation-steward + team |
| 2026-11-20 (Fri) | Final release SHA cut. Fixes after this date restart the affected rows | release-manager |
| **2026-11-23 (Mon)** | **Quality verdict** on the final SHA: `quality/verdict-2026-11-23.md` | evaluation-steward |
| 2026-11-23 to 11-30 | The deployed SHA must equal the verdict SHA. Any other SHA re-runs the rows its diff touches. A new SEV1 or SEV2 turns the verdict to no-go (Q6.1) | release-manager; evaluation-steward |

If the go/no-go date moves at W-908, the verdict moves with it, and the dry run stays at T-7 and the freeze stays before the build. The Head of Strategic Initiatives proposes the move. The quality dates follow it and do not move by themselves.

### 2.2 The verdict

- **Go** only if every row passes, or is waived in writing (2.5). There is no "conditional go" and no "go with known issues".
- The verdict lists every row with its evidence link and the SHA. It cites the privacy gate and the readiness gate as they stand (2.6) without judging them.
- Evidence from the T-7 dry run is reused at the verdict only for rows whose inputs have not changed since RC1 (the same paths in `git diff RC1..final`). Everything automated is re-run on the final SHA anyway.

### 2.3 "The exact release build"

The SHA under test is the SHA that `tools/deploy.mjs production` deploys. The release-manager states it in the verdict file before the run. The QA build is `npm run build` of that SHA, and the performance run is a Vercel preview of it. A pass on any other SHA, on a dev server, or from an unstamped harness is not evidence.

### 2.4 Changing the bar after the freeze

- **Tightening:** only by the evaluation steward, and only for a new class of failure shown by a SEV1 or SEV2 after the freeze. It is recorded here with the incident's id, and builders get at least 5 days' notice before the verdict, or it applies to release 2.
- **Loosening:** never by the quality team or anyone else. Only a founder waiver can loosen it (2.5).
- **Objections before the freeze** go in section 5 of this file, and each one gets an answer there.

### 2.5 What counts as a waiver

A waiver is a founder decision record, `company/decisions/<date>-founder-first-light-quality-waiver-<n>.md`, that names:
1. the row (one waiver per row; there is no blanket waiver),
2. the failing evidence and the SHA,
3. **the objection, verbatim**, from the owner of the row and from the evaluation steward,
4. the risk the founder accepts, and who carries it,
5. an exit: a board item and the date by which the row must pass after launch.

These are **not** waivers: the Head of Strategic Initiatives' recommendation; an agent's message saying the founder agreed (only the founder's own record or message counts); a scope cut (that is head-of-product's decision, and the row becomes "absent"); a "known issues" list; a row re-scoped after the freeze. The bar itself stays as written after a waiver. The waiver is the exception, and it is listed in the verdict.

### 2.6 How it composes with the privacy gate and the readiness gate (EDD-007)

There are three gates. Each is judged once, by its owner. The founder sees all three side by side in the Head of Strategic Initiatives' recommendation.

| Gate | Owner | Judges | What quality does with it |
|---|---|---|---|
| **Quality** (this bar) | evaluation-steward | Does the release work, is it true, is it usable and accessible, do borrowed minds lose it, does it fit a phone, is there an open SEV1 or SEV2 | It is this file |
| **Privacy** | privacy-reviewer | Whether a field may be stored, the age policy, consent, deletion and export, whether social may ship, which third parties are allowed, and the legal pages' content | Quality **cites** the gate's status in the verdict and never re-judges it. Where a privacy ruling becomes a measurable property of the build (allowed request origins, cross-account visibility), the measurement runs once, inside Q1.8 and Q1.9, and the privacy reviewer cites that evidence instead of running a second test. The ruling stays the privacy reviewer's |
| **Readiness (EDD-007)** | principal-engineer-ops, with principal-engineer | Every tier-2 path (auth, DB, event API, deploy) has an approved readiness record. Capacity, meters, rollback | Quality **cites** it and does not read readiness records. SEV classification belongs to principal-engineer-ops. Q6.1 only reads its result |

No row of this bar repeats a privacy or readiness question. If the privacy reviewer or principal-engineer-ops finds a row that does, the row is dropped here, not there.

---

## 3. Capacity: the review load, and what I need

The founder's budget pack (W-905) budgets about 40 First Light code runs, 19 PE reviews and 13 privacy-reviewer runs. **It has no quality line.** Amendment 1 came after the pack, and none of the nine workstreams in projects.json covers the bar, the dry run or the verdict. The principal engineer's objection (critical path = review capacity) applies to my org as well.

Planned runs. Per-run costs are measured for the fact-checker (131k) and the learner-evaluator (179k) (token-budget.md §3). The others are proxies at ~140k, so treat the totals as medium-low confidence. The plan assumes 5 surfaces besides auth (progress, personalization, mastery, social, ads) plus auth, so 6, and fewer if any are cut.

| Role | Runs | What | Tokens (est.) |
|---|---|---|---|
| evaluation-steward | 9 | freeze revisions, W-906 (budgeted already: 429k), AMD-FL-A/B/C drafts and one revision each, an independence audit, the dry run, the verdict | ~1.3M (excluding W-906) |
| qa-tester | 18 | 3 full catalog runs (baseline, T-7, verdict) + 12 surface explorations (6 × round 1 and T-7) + 3 re-checks | ~2.5M |
| accessibility-reviewer | 13 | 6 surfaces × 2 rounds + the legal and age-gate pages | ~1.8M |
| learner-evaluator | 16 | 6 surfaces × 2 boundaries at round 1, plus 4 re-runs after fixes (the T-7 round is targeted) | ~2.9M |
| fact-checker | 5 | 4 catalog sample runs (40 lessons) + 1 surface-copy run | ~0.65M |
| pedagogy-critic | 3 | personalization, mastery, and a re-run after fixes | ~0.45M |
| **Total** | **~64 runs** | | **~9.6M** |

**What I need:**
1. **A `quality` workstream in first-light**, from the portfolio-manager: T1 ~0.4M (to 2026-10-23: the bar, AMD-FL-A, the W-906 support) and T2 ~9.2M. If T2 cannot carry it, the **minimum** is ~6.3M (~42 runs: one learner boundary per surface at round 1, and catalog sampling cut to 25). Below that I cannot give a verdict I would stand behind on every row, and I will say which rows go unevidenced *before* the freeze, not after. Cutting a surface removes its runs: the ad slot is about 9 runs (~1.4M), social about 9.
2. **Reserved review slots** in the weeks of 11-09 and 11-16 for qa-tester, accessibility-reviewer and learner-evaluator, set by the portfolio-manager's priority. First Light competes one for one with Wave J for learner-evaluator slots, and the catalog queue already holds lessons blocked on "no borrowed-mind learner review".
3. **Host time**: a reserved window with no builds for the 3 full catalog runs (~1.2 h each at 3 workers for ~640 lessons), or those runs on CI or a preview. The shared host is R-001.
4. **A surface walkthrough artifact**: `npm run walkthrough` only knows lessons. Borrowed minds need screens and a transcript of a surface flow before any account of it (Q4.1). That is a small tool for tools-lead after the budget is approved. Until then the qa-tester's exploratory screenshots and transcript serve.
5. **Freezes from others**: the launch catalog on 2026-11-13 (head-of-product) and the RC1 SHA on 2026-11-13 (release-manager). Without them the fact-checker and the qa-tester are measuring a moving target.

---

## 4. W-906 and how it sequences with the bar

The bar's personalization, mastery and ad rows (Q1.6, Q1.7, Q1.9, part of Q4.2) test **rules that Surface Value does not yet contain**. Today it says the feed "is not personalised and it says so" and has "no streaks and no guilt". So:

1. **W-906 first** (draft 10-21, ratified by 10-30). It states the objective for each surface: personalization may reorder only by rules that learners can read, and never by engagement; mastery is defined by recall and completion and carries a banned-phrase list (streaks, loss, guilt); the ad slot is labelled, never ranks or reorders lessons, and its numbers are W-891's. It also amends the "For the feed" section and the cold-start trade-off row.
2. **The bar freezes on 10-23 with those rows written as "per W-906 as ratified".** The numbers that do not depend on it (Q2, Q3, Q5, Q6) are frozen outright.
3. **AMD-FL-B is written against the ratified text** (ratified by 11-06), so the tests encode the constitution and not a builder's reading of it.
4. **If W-906 is not ratified by 10-30**, the current Surface Value holds at launch: personalization and the ad slot ship switched off (their rows become "absent"), and mastery ships only if it meets "no streaks and no guilt" as written today. That is a consequence of the constitution, not a quality decision.

W-895 (sponsored lessons) is not needed for launch: there is no paid ad stage and no sponsored lesson at launch. It stays in my backlog and is out of this bar.

---

## 5. Objections to the bar (open until 2026-10-23)

| # | From | Objection | Answer |
|---|---|---|---|
| 1 | evaluation-steward (pre-empting the tech lead) | Q5.3 and Q5.4 may be unreachable without EDD-003 work that the founder kept off the critical path | Kept as written. The numbers say what a phone learner needs. The choice belongs to the principal engineer (how) and the founder (whether to lower the bar before the freeze), on W-908. It is raised now so that it is not a launch-day surprise |
| 2 | founder record (carried) | Two keys can deadlock on launch day | The freeze on 10-23, the T-7 dry run, a verdict with no "conditional go", and written-only waivers. A deadlock can only be a known, dated disagreement, and the founder decides it |

---

## Board asks (for the chief of staff to file; this file does not edit board.json)

1. **chief-of-staff:** move W-919 to `review` (the bar is proposed). Put "freeze the First Light quality bar" on the 2026-10-23 founder review agenda (owner: founder).
2. **portfolio-manager:** add a `quality` workstream to first-light in projects.json (section 3: T1 ~0.4M, T2 ~9.2M, minimum 6.3M). Reserve qa-tester, accessibility-reviewer and learner-evaluator slots for the weeks of 11-09 and 11-16.
3. **principal-engineer:** at W-908, by 2026-10-22, answer Q5.1 to Q5.4: are they reachable for 11-23, and which work does that put on the critical path?
4. **head-of-product:** name the launch catalog and freeze it on 2026-11-13. Rule on W-891's slot numbers before 2026-10-30, so that W-906 and AMD-FL-B can cite them.
5. **privacy-reviewer:** publish your gate's criteria and date in the initiative folder by 2026-10-22, and say which measurements you will cite from Q1.8 and Q1.9 rather than run yourself.
6. **release-manager:** cut RC1 on 2026-11-13 and the final SHA on 2026-11-20, and state the deploy SHA in the verdict file.
7. **principal-engineer-ops:** a no-build host window (or a CI or preview runner) for the full catalog runs on 2026-11-16 and 2026-11-23. The incident register's open SEV1 and SEV2 list on both dates.
8. **tools-lead** (after the budget): a surface walkthrough (section 3, need 4).
9. **evaluation-steward** (me): W-906 draft by 2026-10-21. AMD-FL-A draft after the budget is approved.
10. **chief-of-staff-ceo-office:** take my consultation answer into 2026-10-15-head-of-strategic-initiatives.md (written there under `## Consulted`).
