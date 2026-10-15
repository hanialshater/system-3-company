# Project Review 1: founder agenda

prepared by: portfolio-manager (Odette), secretary · for: founder (chair) · date prepared: 2026-10-14 · hold by: 2026-10-16 23:59 UTC (the in-flight grace period ends then)
template: company/rituals/templates/project-review.md · system: company/ops/token-budget.md · register: company/ops/projects.json

The figures below come from `node tools/ledger.mjs report` on 2026-10-14. Tokens are harness
`subagent_tokens`. Spend per project is **measured tokens, attributed by inference** (no run was tagged
before today), and runs after 15:20 UTC are not in the log yet. The budgets are **my proposals, from measured unit costs**. I
wrote them, so I cannot approve them: each owner confirms or replaces theirs in a one-page proposal
before the session (board items below).

**Quorum:** you, plus 4 of vp-rnd, vp-marketing (if the role exists by then), chief-of-staff,
chief-of-staff-ceo-office, principal-engineer, principal-engineer-ops and principal-pm-verticals, with at
least one VP, one chief and one PE. Written positions count.

## Item 0: rules of the forum (you decide)

- **0a. Delegation.** May the forum approve a **tranche of 3M tokens or less** that creates no org and changes no kit, contract or deploy path, with no open objection, without you in session, with 24 h for you to veto? My recommendation is yes after two reviews, so that the forum does not become the new bottleneck. The objection from principal-pm-verticals (review capacity) applies.
- **0b. The unit.** Budgets are in `subagent_tokens`. Whether that is the billed unit, and how it relates to the plan's usage limit, is not established. The coordinator's own spend (961M cache-read tokens in its transcript) is outside every budget. Accept "internal unit, not a bill" for now, or ask principal-engineer-ops to establish the unit first?
- **0c. Thresholds.** Major means over 5M tokens or 20 runs, a new category or org, a change to the kit, contract, deploy path or an engine used by more than 10 lessons, or more than 7 days (token-budget.md section 6). Confirm or change.

## Items 1 to 5: open major projects (in flight or proposed, no budget)

| # | Project | Owner | Spent so far (measured, attributed) | Proposed tranche | Return measure | Proposed kill criterion | Known objections and preconditions |
|---|---|---|---|---|---|---|---|
| 1 | **history**: History through data and maps | principal-pm-verticals (to cm-history) | ~0 in the log; sizing ran after 15:20 | 2.0M: org, charter, curriculum, Wave K pilot of 10 | published History lessons; held-claim rate in the pilot | stop after the pilot if more than 40% of claims are held or fewer than 5 of 10 reach launch | "one new vertical, not three" (principal-pm-verticals); fits only by moving 44 subject slots (W-688); sensitive-history route waits on W-626; no data beyond Natural Earth (W-700) |
| 2 | **marketing**: Marketing floor and VP | chief-of-staff-ceo-office | ~0 in the log | 1.0M: org design and a first plan, nothing external | to be defined with analytics-steward | pause if there is no accepted return measure within 7 days | analytics-steward: no learner data to cite (EXP-002 has not run); principal-pm-verticals: adds coordination load, not capacity; anything public needs you |
| 3 | **books-decks**: Books under the deck format | cm-books | ~0 in the log | 1.5M: the pilot deck (Thinking, Fast and Slow) plus reviews | published Books lessons; nothing can publish before F1/F2 | pause if the pilot deck is done and F1/F2 are still open; kill the format if the pilot fails learner review twice | 60 slots buy about 12 books, not 30; F1 (book source) and F2 (legal read) are yours (W-615, W-541) |
| 4 | **lifehacks-engine-v2**: engines v2 and migration | cm-lifehacks | 0 tagged; Life Hacks 200 on v1: 2.0M of our own runs, 0 of 200 publishable | 3.0M: engines plus batch D (14) migrated and reviewed | Life Hacks lessons that reach launch on v2 | stop if fewer than 7 of 14 in batch D reach launch, or if 3M is spent before batch D is reviewed | W-608 says start only after the a11y items W-557 to W-561; v2 code is already in the working tree, uncommitted |
| 5 | **scale-stage-1**: EDD-003 stage 1 runtime bundles | principal-engineer | 0 (stage 0: 661k) | 3.0M, checkpoint at 1.5M | build time, QA time, shared lesson JS against the EDD-003 triggers | abandon if build or QA time has not fallen by a third at the checkpoint | a bundler needs your decision record; no migration until W-085, W-086, the W-087 amendment and your question 6 |

**Re-sized on 2026-10-15 (W-905):** items 1 (history) and 5 (scale-stage-1) have new figures, and items 7 (first-light) and 8 (behavioral-econ) are added. See "Addendum 2026-10-15" below. The table above keeps the 2026-10-14 figures for the record.

**Also in flight: Wave J** (owner chief-of-staff). 1.4M spent on briefs so far. Proposed: 15M for 144
slugs at the measured 101k per published lesson. Kill criterion: pause if fewer than 15 of the first 30
drafts reach launch after one review round, or if the cost passes 200k per published lesson. Its returns
cannot be counted until W-585 records the slug list. I recommend taking it as item 6, because it is the largest open spend.

## Second review (grace until 2026-10-21)

big-ideas (cm-big-ideas), multi-card-sequence (design-engineer; the EDD-006 engineering review
stands), ncm-course (cm-course-ncm; W-555 already stops briefing after Wave J).

## For the record: major work done today without approval

Life Hacks 200 (2.0M of our own runs, 0 publishable), EDD-003 stage 0 and SPIKE-001 (661k), R&D
knots and EDD-004 (1.7M), NCM (2.3M), and the Books, Big Ideas, Courses, History and Marketing orgs.
The catalog line spent 49.7M for 608 published lessons, which is 82k each and the best-measured return in
the company.

## What you decide

Item 0a, 0b and 0c. Then for each item: approved, approved with changes, returned or killed, with its budget, return measure and kill criterion.

## Addendum 2026-10-15: budget pack for First Light, behavioral-econ, History and scalability (W-905)

prepared by: portfolio-manager (Odette) · date: 2026-10-15 · register: company/ops/projects.json (`first-light` and `behavioral-econ` added as `proposed`; `history` and `scale-stage-1` re-sized) · pre-mortems: company/ceo-office/2026-10-14-project-review-1-premortems.md ("Added 2026-10-15")

**Correction first.** First Light reached you without a token budget, and I was not involved. The process fix is in company/ops/token-budget.md section 9: an initiative proposal reaches the founder only with a portfolio-manager budget line on it. I wrote every figure below, so I cannot approve any of them. Each owner confirms or replaces theirs, and you decide.

### A. The unit costs, re-measured today

The event log still stops at 2026-10-14 15:20 (W-716). I read the 115 finished runs after that from the session transcript, read-only (16.1M tokens), and did not write them to the event log or the ledger. The chief of staff's backfill does that. **Measured:** 77.4M `subagent_tokens` over 588 finished runs, with 635 published, gives **122k per published lesson all-in** (101k yesterday). The average includes the 325 lessons now in draft or review, so the marginal cost lies between 101k and 122k. I use 122k because unpublished work is real spend. Do not quote the 96k that `node tools/ledger.mjs report` prints today. It divides the ledger's stale 61.2M (to 15:20 yesterday) by today's 635 published, so it mixes two periods. It corrects itself once the backfill lands.

| Unit (per finished run, mean) | Measured | Runs | Used for |
|---|---|---|---|
| platform-engineer | 110k | 18 | every code run in First Light and scalability |
| design-engineer | 146k | 3 | upper bound for a new subsystem (not used in the sums) |
| principal-engineer (reviews) | 69k | 13 | every PE review |
| principal-engineer-ops | 81k | 3 | readiness records, risk re-score |
| interaction-designer | 115k | 14 | design specs (proxy for growth-designer and personalization-lead) |
| lifehacks-safety / accessibility reviewer | 70k / 77k | 3 / 4 | **proxy** for privacy-reviewer (75k) |
| evaluation-steward | 52k | 9 | amendment drafts |
| head-of-product | 63k | 9 | rulings; **proxy** for a written status run by the Head of Strategic Initiatives |
| chief-of-staff-ceo-office (org runs) | 160k | 6 | org changes |
| hq-engineer · release-manager · qa-tester | 64k · 37k · 27k | 6 · 14 · 14 | war room, launch, QA |
| vp-marketing · analytics-steward · domain-scout | 51k · 118k · 54k | 1 · 1 · 1 | ads policy, experiment registration, DLR |
| learner-evaluator · CM strategy (cm-books, cm-big-ideas) | 182k · 177k | 72 · 4 | learner review, charter and curriculum |

**Extrapolated, not measured:** the ledger holds no coding run by backend-engineer (its 2 runs, 50k, were COE writing), and no run at all by learner-model-engineer, personalization-lead, growth-designer, privacy-reviewer or a research-lead. Those units are the proxies named above. **Guessed:** the number of runs per workstream. That is why each project is funded in tranches and the first one buys the measurements.

### Item 7: first-light (owner: Head of Strategic Initiatives; chief-of-staff until W-904)

Tranche 1 runs to the week-1 re-estimate (2026-10-23: design, EDD-007 records, a spike per workstream, the amendment, the org role). Tranche 2 is build, readiness, go/no-go on 2026-11-23 and launch on 2026-11-30.

| Workstream (owner) | Tranche 1 | Tranche 2 | Runs (T1/T2) | Basis |
|---|---|---|---|---|
| Auth and server-side progress (backend-engineer) | 445k | 1,729k | 5 / 20 | T1: EDD, spike, PE review, privacy data-model review, readiness record. T2: 8 code runs (anonymous-first, keep history at sign-up, schema, progress API, client sync, deletion and export, security, tests), 3 fix runs, 3 PE, 2 privacy, 1 readiness, 3 QA |
| Rule-based personalization (learner-model-engineer, personalization-lead) | 357k | 1,144k | 4 / 12 | T1: rules spec, learner-model design, head-of-product scope, PE. T2: 5 code, 2 fix, 2 PE, 1 learner review of a path, 2 QA |
| Mastery and challenges (growth-designer, platform-engineer) | 393k | 1,221k | 4 / 13 | T1: 2 specs (no streaks, no guilt), design-lead, PE. T2: 5 code, 2 fix, 2 PE, a11y, learner review, 2 QA |
| Light social (with privacy-reviewer) | 259k | 823k | 3 / 10 | T1: spec, privacy, PE. T2: 4 code, 1 fix, 2 privacy, PE, 2 QA |
| Ad slot, stages 0-1 of the ads proposal (vp-marketing) | 364k | 530k | 5 / 7 | T1: ad-content policy (2), experiment registration (analytics-steward), privacy ruling, PE. T2: first-party house-card slot (2 code, 1 fix), a11y, 2 QA, PE |
| Legal basics (privacy-reviewer drafts; you decide on outside counsel) | 288k | 287k | 4 / 4 | T1: privacy policy, terms, age-gate rules, head-of-product. T2: age gate (1 code), 2 revisions, QA |
| Infra and readiness (principal-engineer, principal-engineer-ops, release-manager) | 337k | 950k | 5 / 16 | T1: PE plan (2), readiness and capacity (2), release plan. T2: monitoring, production DB env, backups (3 code), 2 go/no-go readiness, 2 PE, 4 launch runs, 4 full QA, runbook |
| Surface Value amendment (evaluation-steward; you ratify) | 429k | 0 | 6 / 0 | draft, reviews by PE, privacy, head-of-product and analytics, revision |
| War room and the Head of Strategic Initiatives role (chief-of-staff-ceo-office, hq-engineer) | 718k | 1,485k | 8 / 22 | T1: org change (2 runs at 160k), the HQ room (W-907, 2 runs), week 1 of the cadence. Cadence: 270k a week (2 stand-ups, the Friday review, the risk re-score) for 5.5 weeks |
| **Total** | **3.59M** | **8.17M** | **44 / 104** | **program 11.76M** |

The cadence line (2.2M, 19% of the program) is the softest number. Most rituals have run inside the coordinator, so there is no measured run for a stand-up. I would cap it at 270k a week.

**Money (all unverified, to be confirmed by quote under W-908 and F-18; nothing is bought):**

| Item | Free path | Paid path | Source |
|---|---|---|---|
| Vercel Pro (needed for any commercial use, including the ad slot) | ~$20/mo, 1 seat | same | scalability note C4; the ads proposal could not reach vercel.com |
| Domain | ~$10-20/yr for a .com | other TLDs cost more | memory |
| Managed Postgres | $0 free tier | ~$5-25/mo | memory |
| Auth provider | $0 with Auth.js (open source, but a new dependency, so a decision record) | hosted provider ~$25/mo past its free tier | memory; F-01 recommends Auth.js + Neon |
| Error monitoring | $0 developer tier | ~$26/mo team tier | memory |
| **First Light hosting** | **~$21/mo** | **~$100/mo** | |

Against that, the ads proposal's own ranges are $3-20/mo (scenario A) and $33-200/mo (scenario B) for a paid card. At launch the slot carries house cards only, so the expected ad revenue is **$0**. First Light is a cost, not a money return.

**Return measure.** (1) Go at the 2026-11-23 go/no-go, with an approved EDD-007 record on every tier-2 path and no open SEV1 or SEV2. (2) The launch metrics analytics-steward sets before launch (the first real-learner data, R-011): accounts created, anonymous history kept at sign-up (100% in QA), and 7-day return rate. (3) Tokens per workstream against this table.

**Stop rule.**
- **Tranche 1.** Release tranche 2 only if the W-908 re-estimate keeps tranche 2 at or under 10.2M (1.25x) **and** F-01 is decided by 2026-10-23. Otherwise First Light comes back here with cuts, in this order: ad slot (you already allowed it to slip to release 2), light social, challenges.
- **Tranche 2.** The ad slot and light social are cut to release 2 if the privacy-reviewer's ruling (and, for the slot, the ratified amendment) is not on file by 2026-11-09. One no-go allows one re-plan inside the tranche. A second no-go returns the project to this forum.
- **Program.** At 11.76M without a go, stop. A top-up needs you and one PE.

**Ads: inside First Light or separate?** Stages 0-1 (the labelled first-party slot with house cards, no money) stay **inside** First Light, at 0.89M with their own cut line. They are in your First Light scope, they share the Surface Value amendment and the launch, and they are separable by the stop rule. **Stage 2** (paid creatives, advertiser accounts, any network) is **not budgeted**. It comes back as its own project after F-17 and F-20, because it has a different gate (you approve each advertiser) and no revenue case at launch traffic.

**Until you rule,** `node tools/ledger.mjs gate --project=first-light` refuses dispatches tagged to First Light, because it is `proposed`. The week-1 scoping already on the board (W-904, W-907, W-908) runs as small untagged work. That is how token-budget.md treats untagged work. If you want it gated as well, say so.

### Item 8: behavioral-econ (owner: principal-pm-verticals until cm-behavioral exists)

**The check against the vertical's figures.** Tranche 1 at 0.6M and tranche 2 at 3.0M were 101k x 5 and 101k x 30, plus about 0.1M of set-up, **for the strand variant**. You chose the category variant (F-21). Measured set-up runs for a category, from the table in A:

| Tranche 1 piece | Tokens |
|---|---|
| DLR proposal (domain-scout, W-896) | 54k |
| Slots and the four boundary rulings (head-of-product, 2 runs, W-897) | 126k |
| Replication sourcing note (W-902; general-purpose as proxy, no research-lead run exists) | 182k |
| Org change for cm-behavioral (CEO office, W-899) | 160k |
| Charter and curriculum (CM strategy run) | 177k |
| DomainId and theme (measured W-538) | 59k |
| HQ office, floor 6 row 2 (W-900) | 64k |
| Four neighbour sign-offs (playbook step 7, ~71k each) | 284k |
| Domain Launch Review | 117k |
| Pilot of 5, all-in at 122k | 610k |
| **Tranche 1** | **1.83M (not 0.6M)** |

**Tranche 2:** 30 x 122k = 3.66M, plus about 0.37M for the strand managers' org change and charters, which gives **4.03M (not 3.0M)**. Even the strand variant measures at about 1.55M for tranche 1. The set-up work, not the lessons, is what the 0.6M missed. Spent so far: about 120k (the case and the playbook, one run, on the leadership line, not charged). Money: none.

**Return measure:** published lessons in the category once its DomainId exists, the pilot's held-claim rate, and the "Why we decide badly" path's commit rate and 7-day recall against the feed median.

**Stop rule:** pause if 3 of the DLR five are rejected as duplicates, if the held-claim rate passes 40%, or if 1.83M is spent before the DLR five are reviewed. Tranche 2 needs all four triggers in the vertical's §7. Fold the category into Economics 60 days after deploy if 7-day recall is more than 10 points below the feed median and commit rate is below it.

### Item 1, re-sized: history (F-16 option (a); proposal of record: principal-pm-verticals, W-723)

Selin writes the proposal. These are my check figures, not a second proposal.
- **Tranche 1: 2.5M from approval.** That is 10 new lessons all-in (10 x 122k = 1.22M), plus learner review, fixes, re-check and publish for the 15 drafts already built (15 x ~75k = 1.12M; the measured review-and-publish stage cost 2.09M over 13 runs for 28 published), plus about 0.18M of CM upkeep. This agrees with F-16's 2.5-3M at the low end. The ~1.45M already spent on the 15 drafts (7 runs tagged `[project:history]`) and the 387k History org run count as history under `countFrom`.
- **Tranche 2: about 10.8M, not asked now.** 75 x 122k = 9.15M, plus two cultural-reviewer reviews per sensitive lesson (about 54 concepts, about 22 runs x 75k = 1.6M). It is released only on the four F-16 triggers.
- **Stop rule:** stop at the DLR five if more than 40% of claims are held or fewer than 3 of the five reach launch. The gate stops tagged work at 2.5M. Money: none.
- If W-723 gives other figures, they replace these in projects.json. I will not reconcile by editing her proposal.

### Item 5, re-sized: scale-stage-1 (owner: principal-engineer), from the scalability note

| Piece | Line | Tokens | Money |
|---|---|---|---|
| P3 (.gitattributes), P4 (disk drain), P5 (2 builds at once, one shared server), P6 (qa-changed selector) | **maintenance** (not major, never gated; op-planning) | ~0.64M (P3 1 run; P4 and P5 4 tools-lead runs; P6 2 runs plus steward review) | $0 |
| A1: registry split, EDD-001 option 4 (needs AMD-001 (c2)) | scale-stage-1, tranche 1 | 0.56M | $0 |
| A2 pilot: 50 lessons as runtime bundles, off First Light's critical path | scale-stage-1, tranche 1 | 1.89M (bundler decision record, 10 build and 2 fix runs, 3 PE reviews, 4 QA runs through the frame, 2 amendment drafts, readiness) | $0 |
| A2, the other ~910 lessons | tranche 2, a later review | 3-4M (extrapolated) | |
| C1 GitHub Pro | | | ~$4/mo (unverified) |
| C3 bigger host | only if the step-2 measures still fail | | $60-150/mo (unverified) |

**Tranche 1: 2.45M** (yesterday: 3.0M for all of stage 1), with a checkpoint at 1.2M (A1 merged and 25 lessons migrated). **Return:** first-load JS on `/` down by at least 2.3 MB gz (A1); for the pilot, app build at most 5 min whatever the lesson count, at most 30 s of QA per changed lesson, `/` at most 10 stylesheets, warm frame at most 300 ms on a phone. **Stop rule:** at the checkpoint, fall back to same-origin `import()` (A2-a) if warm stays over 300 ms after preloading. Abandon A2 if build and QA are not on those lines. Revert A1 if the JS does not drop. Stop any stage-1 work that blocks a First Light go/no-go item.

### B. The total, against capacity, and what it displaces

| Asked at this review (tranche 1 or the first budget) | Tokens |
|---|---|
| W-905 items: first-light 3.59M + behavioral-econ 1.83M + history 2.5M + scale-stage-1 2.45M | **10.37M** |
| Items already on the agenda: wave-j 15.0M, lifehacks-engine-v2 3.0M, books-decks 1.5M, marketing 1.0M | 20.5M |
| **All first tranches at Project Review 1** | **30.87M** |
| Later tranches, not asked now: first-light 8.17M, behavioral-econ 4.03M, history ~10.8M, scale ~3.5M | ~26.5M |
| W-905 programs in full (plus 0.64M on the maintenance line) | ~36.9M (+0.64M) |
| Money, per month | First Light ~$21 to ~$100; GitHub Pro ~$4; everything else $0 |

**The capacity limit.** token-budget.md does not set one, and it says it should not. Its budgets are in `subagent_tokens`, and the relation of that unit to the plan's usage limit is not established (item 0b; section 1, missing item 5). So I cannot honestly show a percentage of a ceiling. What is measured:
- **Throughput.** The busiest 24 h on record spent 44.2M (to 2026-10-14 15:20, under the old 30/10 caps, with the host at about 5x capacity). Under the 8-agent and 3-builder caps, one 6.75 h window (18:25 to 01:10) measured 6.95M, about 1.0M an hour. Runs average 16.3 agent-minutes per 100k tokens. On that rate, the 30.87M of first tranches is about 30 active hours of the whole company, and First Light's 11.76M is about 12 active hours spread across six weeks. **In our own unit, tokens are not the binding constraint.** One caveat: the only time a token ceiling did bite (the 2026-10-13 COE, 8 of 9 builders stopped) it was the plan's usage limit, in a unit we cannot convert. That is item 0b again, and it is the reason to keep budgets per tranche.
- **What binds is review and named roles.** (1) The review queue is 325 lessons in draft or review against the W-556 gate of 160. History's tranche 1 (25 lessons, 10 of them new) and the behavioral pilot (5) count in that queue, and they take learner-review and fact-check slots from Wave J one for one. (2) Engineering: First Light needs about 40 code runs, 19 PE reviews and 13 privacy-reviewer runs, and the privacy reviewer has never run. Scalability adds about 16 code runs and 4 PE reviews. (3) You: First Light alone needs at least 7 founder decisions (F-01, F-17 to F-20, F-18, the domain, the amendment).

**What it displaces.**
- **In tokens:** the 10.37M of W-905 tranche 1 is about 85 published lessons at 122k, the full W-905 programs about 300, and all first tranches about 250. If the plan's limit binds, that is the trade.
- **In review:** 30 lessons of Wave J review capacity, as above.
- **In engineering:** the maintenance line's queue of EDD-006 multi-card, Life Hacks v2 engine fixes and W-667 waits behind First Light code runs and PE reviews.

If you want to cut tokens, the lever is Wave J's 15M, not the W-905 items.

### What you decide (in addition to the list above)

- **Item 7, first-light:** tranche 1 (3.59M; money up to ~$100/mo once quoted), the return measure and the stop rule; whether the ad slot stays inside, as I recommend, with stage 2 separate.
- **Item 8, behavioral-econ:** tranche 1 at 1.83M rather than 0.6M.
- **Items 1 and 5 re-sized:** history at 2.5M (or W-723's figure), and scale-stage-1 at 2.45M, with P3-P6 on the maintenance line.
- **0d (new):** name the capacity limit that budgets are compared with. My suggestion is that principal-engineer-ops establishes the plan-limit conversion (0b) and that, until then, the forum reads the throughput and review figures in B.
