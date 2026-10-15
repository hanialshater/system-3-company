# Project Review 1: pre-mortems (items 1 to 6)

written by: portfolio-manager (Odette), secretary · date: 2026-10-14 · W-788
template: company/rituals/templates/project-review.md ("Pre-mortem") · decision: company/decisions/2026-10-14-founder-risk-in-ops-review.md · scales: company/ops/risks.md · agenda: company/ceo-office/2026-10-14-project-review-1-agenda.md

These are **drafts from disk evidence**, written by the secretary so that no proposal reaches the forum without one. Each owner confirms, re-scores or replaces its section in its one-page proposal (W-723 to W-727; Wave J's owner is chief-of-staff). Scores use the risks.md scales; a board item does not lower a score. Submitted to principal-engineer-ops: not yet (board item). The "Register" column names an existing entry where one already carries the risk; "new" rows are the ones to add, with the project id in `links`.

Question: *assume this project failed six months from now. Why?*

## Pre-mortem: history

Scope changed: the founder set **100 lessons, built now** (company/decisions/2026-10-14-founder-history-100.md). The proposed 2.0M tranche was sized for org plus a pilot of 10; 100 lessons at the measured 101k per published lesson is about 10M.

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | Built but not reviewed: 100 more drafts join 337 already in draft or review against a gate of 160 (W-556 lifted for History), and Life Hacks and Wave J keep review priority, so History waits at the back. | 4 | 3 | History drafts with no launch verdict 7 days after build (`npm run company -- status`, coverage) | Max 3 builders, about 5 lessons per run (decision step 3); none yet for review capacity | principal-pm-verticals | new |
| 2 | Only one strand ships: the sensitive-topics route (W-626, founder W-764) never opens, so war, slavery, empire and borders briefs stay held. Today 5 of 12 cycle-1 briefs are held for it and 6 reserve briefs are held for strand balance (company/domains/briefs/history.md). | 4 | 3 | W-764 still open when the first History build batch is dispatched; held-for-W-626 share of written briefs above a third | Briefs held, not built, until the route exists (in place via skip lines); W-764, W-765, W-770 | chief-of-staff-ceo-office | R-008 |
| 3 | Claims held: historical sources cannot be opened from this host, so fact-check holds claims and lessons stall. | 4 | 3 | More than 40% of claims held in the first fact-check batch (the proposed kill line) | Briefs only on data opened from this host, pinned by SHA-256 (history-cycle1-check.mjs); web fact-check session W-583 (founder) | cm-history | R-006 |
| 4 | Budget overrun by design: the tranche on the agenda (2.0M) does not match the 100-lesson target (about 10M at 101k each), so the gate stops work mid-batch or the forum approves a number nobody measured. | 5 | 2 | `node tools/ledger.mjs report --project=history` past 80% before the pilot of 10 is reviewed | Owner re-sizes the tranche in its proposal (W-723) | principal-pm-verticals | new |

## Pre-mortem: marketing

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | Nothing to measure: no learner has used a lesson (EXP-002 has not run, nothing deployed), so the org produces plans with no return the analytics-steward can accept. | 4 | 3 | Day 7 after approval with no accepted return measure (the proposed kill line) | Tranche limited to org design and a first plan (1.0M); return measure defined with analytics-steward | chief-of-staff-ceo-office | R-011 |
| 2 | Adds load, not capacity: a VP reporting to the founder adds founder-inbox items while the founder is already on the critical path of 20 open board items and 13 inbox items. | 4 | 3 | Marketing items in company/ops/founder-inbox.json after the first week | Nothing external in tranche 1; asks batched through the CEO office | chief-of-staff-ceo-office | R-013 |
| 3 | A public claim the company cannot back: copy says learners learn before any learner data exists. | 2 | 5 | Any draft external copy that cites learning outcomes | Anything public needs the founder (agenda item 2); claims rule applies to marketing copy | vp-marketing (chief-of-staff-ceo-office until the role exists) | new |

## Pre-mortem: books-decks

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | Nothing can publish: F1 (book source) and F2 (legal read) are founder decisions (W-615, W-541) and are still open, so the pilot deck is built and sits. | 4 | 4 | Pilot deck done while W-615 is open (the proposed pause line) | Publish hold on Books until the legal read and a book source (R-007 follow-ups); founder asks W-615 | cm-books | R-007 |
| 2 | Chapter claims held: fact-checkers cannot open the book, so claims about its content cannot be verified. | 5 | 3 | Held claims in the pilot deck's fact-check | F1 book source (W-615); none works today | cm-books | R-006 |
| 3 | The deck format fails learners: a new multi-card format, with the EDD-006 engineering review still standing for multi-card-sequence. | 3 | 3 | First learner-review verdict on the pilot deck | Kill the format after two failed learner reviews (proposed kill line) | cm-books | new |
| 4 | The slot math disappoints: 60 slots buy about 12 books, not 30 (agenda item 3). | 4 | 2 | Committed book count in company/domains/books-strategy.md below 12 after the pilot | Founder sizes Books after the pilot (W-628) | principal-pm-verticals | new |

## Pre-mortem: lifehacks-engine-v2

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | v2 repeats v1: Life Hacks 200 on v1 spent about 2.0M for 0 publishable, and in r9 batch D 14 of 14 needed revision; a shared engine fails many lessons at once. | 4 | 4 | Fewer than 7 of batch D's 14 get a launch verdict (the proposed kill line) | Migrate batch D only in tranche 1; the other 186 wait on its results | cm-lifehacks | R-019 |
| 2 | Accessibility debt carried into v2: W-608 says start only after a11y items W-557 to W-561, and W-557 is still in review. | 3 | 3 | Any of W-557 to W-561 open when batch D migration starts | Sequence in W-608; accessibility-reviewer review of W-608 | demo-builder | new |
| 3 | Scope grows inside the tranche: schema gaps (W-611), the Resource remainder (W-738), the reveal crop (W-737) and about 165-170 predict leaks in the other 186 (W-613). | 4 | 2 | `ledger.mjs report --project=lifehacks-engine-v2` past 1.5M before batch D is reviewed | 3M cap before batch D is reviewed (kill line); W-611 and W-738 scoped in the proposal | cm-lifehacks | new |

## Pre-mortem: scale-stage-1

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | Built before it was needed: EDD-003 sets the stage-1 triggers (1,000 lessons, build over 10 min, lesson JS over 200 KB gz, QA over 2 h), and its recorded build time is 73 s at 348 lessons. If no trigger has fired, a third off the build time is a small return for 3M. | 3 | 2 | No EDD-003 trigger measured as fired when the proposal is written (`time npx next build`, QA wall time) | Measure the baseline in the proposal (W-727) | principal-engineer | new |
| 2 | Breaks lessons or the QA contract: runtime bundles change the kit and deploy path; the QA contract (protected) needs the W-087 amendment to run through the iframe, and real-device behaviour is unproven (W-085, W-086). | 3 | 4 | QA contract cannot see lesson content through the iframe; real-device spike fails | No migration until W-085, W-086, W-087 and founder question 6 (agenda item 5); bundler decision record | principal-engineer | new |
| 3 | The return cannot be measured: build and QA times on a shared 4-CPU host swing with load (25-60 on 10-14), so the checkpoint compares noise. | 4 | 3 | Baseline build time varies by more than 20% across three runs | Measure under the W-532 concurrency cap at low load; capacity decision W-531 | principal-engineer | R-001 |

## Pre-mortem: wave-j

Agenda "also in flight", recommended as item 6. Written so that the `ledger.mjs check` rule applies to every proposal awaiting the forum, not only the five named.

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | Returns cannot be counted: the slug list is not recorded (W-585), so 15M is spent against a scope nobody can check. | 5 | 2 | W-585 still open at the forum | Record the 144 slugs in company/ops/waves.json (W-585) | chief-of-staff | R-012 |
| 2 | The review queue drowns it: 337 lessons in draft or review against the W-556 gate of 160, and 144 more. | 4 | 3 | Fewer than 15 of the first 30 drafts reach launch after one review round (proposed kill line) | W-556 gate; review-queue priority (W-625) | chief-of-staff | new |
| 3 | Claims held on sources this host cannot open, at 6-10 per fact-check batch. | 5 | 3 | Held claims per Wave J fact-check batch | W-583 web fact-check session (founder) | evaluation-steward | R-006 |

## Added 2026-10-15 for W-905 (items 7 and 8, and re-sized items 1 and 5)

written by: portfolio-manager (Odette), secretary · date: 2026-10-15 · submitted to principal-engineer-ops: not yet (the rows marked "new" are for the register; R-entries named here need `first-light` or `behavioral-econ` added to their `links`)

These two are drafts from disk evidence, as above. For First Light the owner is the Head of Strategic Initiatives, who does not exist yet (W-904), so the chief of staff confirms or re-scores this section in the meantime. For behavioral-econ, principal-pm-verticals confirms it.

## Pre-mortem: first-light

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | The founder is on the critical path. F-01 (auth provider, database host, under-13 or not) has been open since 2026-10-13, and auth, server-side progress, personalization keyed to an account and light social all wait on it. F-17 to F-20 (ads), F-18 (Vercel Pro), the domain name and the Surface Value ratification are also founder-only. That is at least 7 decisions in 6 weeks, on top of the founder inbox. | 4 | 4 | F-01 still `open` in company/ops/founder-inbox.json on 2026-10-23 (the tranche-1 checkpoint) | Tranche 2 is not released for the account-dependent workstreams until F-01 is decided (stop rule); asks batched through the CEO office; none yet for founder load | head-of-strategic-initiatives (chief-of-staff until W-904) | R-013 |
| 2 | The budget is a guess dressed as a measure. No backend-engineer coding run, and no learner-model-engineer, personalization-lead, growth-designer or privacy-reviewer run, exists in the ledger. Every unit for those roles is a proxy. The last shared-engine build (Life Hacks 200) spent about 2.0M for 0 publishable. | 4 | 3 | `node tools/ledger.mjs report --project=first-light` past 2.9M (80% of tranche 1) before the W-908 re-estimate is written | Tranche 1 buys the measurements (one spike per workstream); tranche 2 is re-priced from them at 2026-10-23, with a 1.25x ceiling before cuts (stop rule) | portfolio-manager | R-012 |
| 3 | Learner data and children. Accounts, server-side progress, light social and an ad slot go live while the age policy is undecided (F-01). Under-13 learners bring COPPA and GDPR-K duties. The ads proposal itself says "no personalised ads while learners may be under 13". | 3 | 5 | Any table or event holding a learner identifier merged before a privacy-reviewer ruling is filed; an age-gate path missing from the go/no-go readiness list | Privacy-reviewer rulings before tranche-2 social and ad-slot work (stop rule: cut by 2026-11-09 otherwise); 13+ at launch is the standing recommendation in F-01; legal workstream | privacy-reviewer | new |
| 4 | Launched through a path with no gate. Vercel git builds still bypass CI (R-003, W-480), and CI does not reliably conclude (R-002). Auth and the event API are tier 2 under EDD-007, whose deploy refusal is advisory until W-480 lands. | 3 | 4 | A production deployment record for a tier-2 change without an approved readiness record (`node tools/readiness.mjs check` on each deployment) | EDD-007 records owed per workstream in tranche 1; W-480 is a go/no-go item | principal-engineer-ops | R-003 |
| 5 | Two migrations at once on one 4-CPU host. EDD-003 stage 1 (the A2 pilot) and First Light both touch the deploy path and the kit, and the host ran at 5x capacity on 2026-10-14 (host COE). | 3 | 3 | Load over 8 or free disk under 15 GB on any First Light build day (`tools/ops-health.mjs`); any First Light item blocked on a stage-1 change | Stage 1 runs only as a 50-lesson pilot off the critical path (founder decision, objections); scale stop rule: stop any stage-1 work that blocks a go/no-go item | principal-engineer | R-001 |

## Pre-mortem: behavioral-econ

| # | Failure mode (why it failed), with evidence | L (1-5) | I (1-5) | Early-warning signal (what we would see first, and where) | Mitigation | Owner (role) | Register |
|---|---|---|---|---|---|---|---|
| 1 | A category with no ground of its own. About 30 of its concepts already sit in Economics, Probability, Books and Big Ideas, and only about 15-18 are collision-free (2026-10-15-behavioral-economics.md §3). The famous effects (anchoring, loss aversion, defaults, decoy) stay with Books. | 4 | 3 | Fewer than 8 clean concepts in the DLR proposal (W-896), or 3 of the DLR five rejected as duplicates (the stop line) | Boundary table signed by the four neighbouring managers before any brief (playbook step 7, W-897) | head-of-product | new |
| 2 | Claims held. The replication record cannot be sourced from this host: every verdict in §6 is the author's prior from memory, and the expected held-claim rate is 30-40%. | 4 | 3 | Pilot held-claim rate over 25% at the first fact-check; the research sourcing note (W-902) not on disk when the pilot is briefed | Pilot limited to claim types (a) and (b), derivations and the learner's own screen; web-capable fact-check (allow-list, 2026-10-15) | cm-economics (cm-behavioral once created) | R-006 |
| 3 | An idle org. The category variant adds a manager before the pilot has passed, the failure the CEO office named for History. | 3 | 2 | cm-behavioral created (W-899) before the head-of-product boundary rulings (W-897) are on disk | Playbook order: one manager after step 3, strand managers only after the DLR five pass | chief-of-staff-ceo-office | new |
| 4 | The budget was sized for the strand. 0.6M assumed about 0.1M of set-up; the measured set-up runs for a category come to about 1.2M, so tranche 1 is 1.83M (W-905 check). | 4 | 2 | `ledger.mjs report --project=behavioral-econ` past 1.46M (80%) before the DLR five are reviewed | Re-sized here; the 1.83M stop line in the kill criteria | portfolio-manager | R-012 |

## Notes on items 1 and 5 (re-sized on 2026-10-15)

- **history.** The founder chose F-16 (a), two tranches. Row 4 above ("budget overrun by design") is answered on the budget side: tranche 1 is now 2.5M from approval, with tranche 2 (about 10.8M) only on the F-16 triggers. The scores stay as they are until principal-pm-verticals re-scores them in W-723. Row 2's mitigation changed: W-764 was decided "yes" on 2026-10-15, so the route exists, but publish enforcement waits on AMD-006.
- **scale-stage-1.** Re-scoped to A1 plus the 50-lesson A2 pilot (2.45M). Row 1 ("built before it was needed") is now weaker: the scalability note measured a 14.2 min build at 960 lessons (over the 10 min trigger) and reports full QA at about 1.8 h (reported, the file was not located). Principal-engineer re-scores it in W-727.
