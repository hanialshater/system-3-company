# Restructuring System 3 Company: content-type lanes, budgeted levels, 39 roles (W-2030)

owner: chief-of-staff-ceo-office (Leonie) · decides: founder · date: 2026-10-25 · status: **approved 2026-10-25, option A** (founder: "Approved and decide for me"); applied except step 10 (record: company/decisions/2026-10-25-founder-restructuring.md)
founder ask (2026-10-25, verbatim): "system 3 co need restructuring though to streamline, different content type, multi level/priority/budget based execution"
checkpoint: CP1-L1 in system3-meta `docs/CHECKPOINT-1.md` ("fewer roles, one flow per content type, priority- and budget-based execution"); CP1-L3 (one new content type with its own flow and one published item)
founder inbox: F-50 · board: W-2030 · rests on: `2026-10-13-role-evaluation.md`, `2026-10-13-proposals.md` (F-13), `2026-10-18-role-keep-remove.md` (F-33), `company/decisions/2026-10-16-founder-throughput-for-10k.md` (F-41), `company/decisions/2026-10-16-founder-mailbox-dispatch.md` (F-42), `company/decisions/2026-10-18-founder-simple-scalable-lesson-path.md` (AMD-014 draft)

## 0. The recommendation in five lines

1. Two production lanes, one per content type: **single-card lesson** and **multi-card sequence**. Each has one flow, one manager, one budget line and a cost target. Formats (before-after, side-by-side, simulation, map) are a field in `meta.json`, not a lane.
2. Four levels: founder (budgets, deploys, amendments) → portfolio (head-of-product sets priority, portfolio-manager holds the budget register) → lane managers (standing build orders by mailbox) → pooled workers. Checkers stay in the quality lane and are never dispatched by a production lane.
3. A lane stops when its budget line is spent: the existing B1 gate in `tools/dispatch-check.mjs` already refuses an approved major project at 100%; lanes get the same rule. Priority is the board's `priority` field, which becomes mandatory for anything in a lane queue.
4. 51 category and strand managers become **one pooled role, `category-curator`**, with the category as data (charter, curriculum map, brief queue, notebook). The org goes from **109 roles to 39** (38 agent roles plus the founder).
5. Gates are graded by risk through AMD-014, which the evaluation steward owns. This proposal asks for the tiers. It does not set them.

## 1. The evidence

### 1a. Who ran, and what it cost (2026-10-12 to 2026-10-25)

Sources: `company/ops/ledger.jsonl` (992 lines, 113.1M tokens in a raw sum; `node tools/ledger.mjs report` counts 946 runs and 107.2M after it drops duplicate and closed rows). `company/ops/events.jsonl` (6,768 events) gives the `report` counts. **Runs** means ledger lines for the role. **Reports** means `report` events with that role as actor. The window is two weeks, but the measured data stops early: usage events end on 2026-10-16 at 15:27Z and events on 2026-10-20. Section 1d lists what is missing.

| Role | Runs | Tokens | Reports | | Role | Runs | Tokens | Reports |
|---|---|---|---|---|---|---|---|---|
| demo-builder | 273 | 37.61M | 256 | | portfolio-manager | 7 | 0.85M | 9 |
| learner-evaluator | 104 | 16.24M | 108 | | backend-engineer | 8 | 0.81M | 16 |
| fact-checker | 118 | 15.47M | 132 | | privacy-reviewer | 8 | 0.70M | 22 |
| general-purpose (not a role) | 30 | 5.25M | 29 | | release-manager | 19 | 0.70M | 17 |
| platform-engineer | 27 | 2.85M | 31 | | hq-engineer | 9 | 0.63M | 14 |
| principal-engineer | 33 | 2.61M | 56 | | head-of-strategic-initiatives | 5 | 0.61M | 7 |
| tools-lead | 26 | 2.55M | 39 | | research-lead | 3 | 0.61M | 3 |
| principal-engineer-ops | 26 | 1.94M | 40 | | analytics-steward | 6 | 0.47M | 8 |
| evaluation-steward | 25 | 1.88M | 38 | | design-engineer | 3 | 0.44M | 3 |
| chief-of-staff-ceo-office | 13 | 1.82M | 16 | | accessibility-reviewer | 6 | 0.43M | 6 |
| interaction-designer | 15 | 1.67M | 18 | | research-scientist | 4 | 0.33M | 6 |
| qa-tester | 34 | 1.44M | 40 | | pedagogy-critic | 3 | 0.33M | 3 |
| head-of-product | 17 | 1.37M | 22 | | pattern-librarian | 5 | 0.30M | 5 |
| principal-pm-verticals | 10 | 1.10M | 13 | | lifehacks-safety-reviewer | 4 | 0.29M | 4 |
| design-lead | 10 | 0.85M | 13 | | growth-designer | 3 | 0.20M | 5 |
| **15 category leads (cm-*)** | 82 | 8.34M | — | | cultural-reviewer | 3 | 0.20M | 4 |
| **36 strand managers** | 29 | 1.48M | — | | vp-marketing | 3 | 0.17M | 3 |
| domain-scout | 2 | 0.11M | 2 | | vp-rnd | 1 | 0.11M | 1 |
| learning-designer | 1 | 0.09M | 4 | | learner-model-engineer | 1 | 0.08M | 9 |
| visual-designer | 2 | 0.08M | 2 | | 7 other personalization roles, chief-product-officer | 0 | unmeasured | 38 |
| **chief-of-staff (operator)** | 12 | **never measured** | 12 | | 1,280 of 1,281 `dispatch` events; 3,700 of 6,768 events (55%) | | | |

**Never ran** (no ledger line and no report): 27 agent roles. They are mockup-artist, researcher, illustrator, localization-lead, localizer, community-engineer (its work runs under lane names: 7 handoffs), rnd-lead and rnd-engineer (`2026-10-18-role-keep-remove.md` counts 5 dispatches that name rnd-lead), head-of-evaluation, pairwise-judge, evaluation-engineer, and 16 strand managers (math-algebra, cs-security, probability-data-literacy, physics ×3, ai-ai-society, economics-personal-finance and -macro, life-ecology-body, big-ideas ×3, history ×3). Three more Books strands have reports but no tokens.

**Where the money went:** builds 33% (demo-builder), checks 30% (learner-evaluator, fact-checker, qa-tester, a11y, pedagogy, route reviewers), managers 9% (all cm-*: 9.83M), and the rest went to engineering, tools and leadership. These shares come from the ledger. The operator's own tokens are not in it.

### 1b. What one item costs (measured, `node tools/ledger.mjs report`, 2026-10-25)

| Line | Spent | Published in scope | Tokens per published | What it is |
|---|---|---|---|---|
| catalog (9 subject domains) | 55.5M | 708 | **78k** (subagents only) | single-card, standard risk |
| all spend / all published | 107.2M | 720 | **149k** all-in, excluding the coordinator | company headline |
| lifehacks-engine-v2 | 3.1M | 6 | 513k | single-card variants (before-after, side-by-side), safety route |
| history | 6.5M | 4 | 1,619k | single-card and map, sensitive route |
| big-ideas | 1.1M | 2 | 562k | incubating category |
| rnd-knots | 1.8M | 4 | 444k | kit-heavy lessons |
| books-decks | 1.5M | 0 | — | book deck, project **returned** at Project Review 1 |
| multi-card-sequence (EDD-006 kit) | 0.33M | 1 (`euclid-three-steps`) | not measurable (n = 1, kit work) | multi-card sequence |

Per step, inside the catalog line (raw ledger by role ÷ 708 published): build 36k, learner walk 19k, fact-check 16k, category manager 5k, design 2k, QA 1k, release 1k. **Checks (36k) cost as much as the build (36k).**

### 1c. Where work stops

| Bottleneck | Evidence (source) |
|---|---|
| **The operator is the only dispatcher.** | 1,280 of 1,281 dispatches have chief-of-staff as actor. Only 34 came through the F-42 mailbox (`events.jsonl`). Manager rounds took 35% of tokens on 10-16, and builder occupancy was 1.28 of 3 (`2026-10-16-founder-throughput-for-10k.md`). |
| **The operator still produces.** | Between 10-20 and 10-21 the operator itself ran copy passes over about 1,230 lessons, a reveal pass over 1,032, 100 history maps and 24 history map stories. It also ran deploys r16 to r21. None of this is in the ledger, and the stories skipped "independent research/cultural pre-build review" (`company/ops/progress.md`, 10-20 and 10-21 entries). This is F-13's P1 finding again, eight days later. |
| **Revision loops.** | 186 of 720 published lessons are at version 4 or higher, and 240 of 691 drafts are too (`meta.json` `version`). On 10-16, 48% of fact-check work re-verified claims reset the same day (F-41 diagnosis 3). |
| **Gates and holds on whole categories.** | 234 lessons are in review: 153 blocked by a publish hold, 55 by unverified claims, 25 by a learner "revise" (`npm run company -- status`, 2026-10-25). `publish-holds.json` has 218 lines. 8,254 claims wait for the fact-checker. |
| **The gate keeper's queue.** | evaluation-steward has 100 open board items. Only demo-builder has more, at 129 (`board.json`). |
| **Priority is mostly unset.** | 960 of 1,285 open board items have no `priority` (`board.json`). |
| **Budgets stop lines but not lanes.** | History is at 259%, lifehacks-engine-v2 at 103% and behavioral-econ at 157%, all STOP. Lines with no budget (catalog, maintenance, leadership) never block (`ledger.mjs report`; B1 in `tools/dispatch-check.mjs`). |
| **No production since 10-20.** | The last company events are from 10-20. Since then progress.md holds System 3 Meta's work and the operator's own passes. F-46 paused new builds. |

### 1d. What I could not measure

- Every run after 2026-10-16T15:27Z. The ledger stops there, and `ledger.mjs report` lists 251 dispatched agents with no usage or stop record.
- The operator's own tokens. They are not in any record, and the 10-20 to 10-21 production passes are part of that.
- The personalization org's runs on 10-16 to 10-20 (51 reports, 0 tokens). Its 2.1M line shows 0 spent.
- The cost of one multi-card sequence item (n = 1), or of one map story (operator-built, unmeasured).

## 2. Content types: one flow each

### 2a. Which content types should exist now

| Content type | Today (source) | Verdict | Why |
|---|---|---|---|
| **Single-card lesson** (formats: single-card, before-after, side-by-side, simulation-run, agent-based-simulation, storyboard-scrub, map-explorer, debunk) | 1,624 of 1,645 lessons; 14 spellings of 8 formats in `meta.json` (e.g. "Single card" and "single-card") | **Lane S, now** | One card, one predict, explore, reveal. The format changes the stage, not the flow. |
| **Multi-card sequence** (2–4 sub-cards inside explore; `src/kit/sequence.tsx`) | 1 published (`math/euclid-three-steps`, which still carries one `unverified` claim); EDD-006 conditions W-604 and W-605 in review | **Lane M, now** | It is the cheapest honest second type: the kit exists and Lesson.tsx is unchanged. It satisfies CP1-L3 once one item passes the new flow. |
| Map story (`content/history-stories`: 24 drafts, 4 checkpoints plus a timeline) | 0 published; built by the operator without pre-build review | **A format of lane M, later** | It has the shape of a multi-card sequence and is always on the sensitive route. It enters lane M after lane M has 3 published items. |
| Book deck (`company/decisions/2026-10-14-book-deck-format.md`) | project returned; 1.5M spent for 0 published; 106 Books drafts are single-card | **Not now** | It needs a deck shell (a tier-2 EDD) and a copyright route owner (F1/F2). Books drafts go through lane S on the copyright route. Re-propose the deck after lane M has 10 published items. |
| Course (NCM: `content/courses/ncm`) | 2.3M spent; no separate scope measured | **Not a content type** | A course is an ordered path over existing items: data for the curator and personalization, not a production flow. |

### 2b. Lane S flow: single-card lesson

The three tiers are **requested** of the evaluation steward through AMD-014. Today's gate (`launchGates` in `tools/company.mjs`) requires a learner walk for every lesson.

| # | Step | Role | Tier S (standard) | Tier R (sensitive, safety, copyright, health, money) |
|---|---|---|---|---|
| 1 | Brief: misconception, claims, format, `reviewRoute`, board priority; queued in batches of 10–20 | category-curator (instance of the category) | yes | yes; route reviewer reads the brief |
| 2 | Build plus pre-flight; pulls the next brief by priority; 10–20 per run | demo-builder (pool) | yes | yes |
| 3 | Automated: `npm run check`, QA contract record, `tools/a11y-scan.mjs` with 0 `fail` findings | qa-tester | gate | gate |
| 4 | Fact-check in batches of 50; resets only the claims whose text changed (F-41 item 3) | fact-checker | gate | gate |
| 5 | Learner walk with a verdict for the current version | learner-evaluator | **1 in 5 sampled** (requested) | every lesson |
| 6 | Route verdict for the current version | route-reviewer | — | gate (AMD-014 b) |
| 7 | **One revision round**: one fix, re-run only the failed check, then publish or park (F-41 item 4; F-46 already applied it to the closeout) | demo-builder | yes | yes |
| 8 | Batch launch record, signed with predictions (AMD-014 e) | head-of-product signs; release-manager publishes | yes | yes |
| 9 | Deploy | **founder, every time** | yes | yes |

**Cost target:** 90k subagent tokens per published lesson for tier S (78k measured plus room for re-checks), and 150k all-in once the coordinator is measured (F-41 item 7). Tier R: 300k, against 513k–1,619k measured. **Stop rule:** a batch over 2× its target pauses for the lane manager and the portfolio-manager.

### 2c. Lane M flow: multi-card sequence

The differences from lane S are marked.

| # | Step | Role | Gates |
|---|---|---|---|
| 1 | Brief **names 2–4 sub-cards**, each with its picture and milestone | category-curator | as S |
| 2 | **Interaction spec plus mockup before build, always** | interaction-designer | doc rule |
| 3 | Build in `CardSequence` / `SubCard` | demo-builder | — |
| 4 | Automated checks plus the **sequence probe** (`tools/sequence-probe.mjs`, W-604: every sub-card at 390×844 and 1280, back navigation) | qa-tester | gate (the probe, through AMD-014 or a lane rule) |
| 5 | Fact-check | fact-checker | gate |
| 6 | Learner walk on **every item** for the first 10, then tiered as in S | learner-evaluator | gate |
| 7 | **First 3 items: design review plus pairwise against a single-card version of the same concept** | design-lead (review), pedagogy-critic (pairwise) | 3 records |
| 8–10 | One revision round, batch launch record, founder deploy | as S | as S |

**Cost target:** 300k per published item, provisional (no measured item yet). It is reset after the first 5 published from their ledger lines. **Stop rule:** above 450k per published item, the lane pauses and goes to the founder at the next project review.

## 3. Execution by level, priority and budget

| Level | Who | Decides | Reads | Mechanism (existing unless marked **new**) |
|---|---|---|---|---|
| L0 Founder | founder | Content types that exist, budget per lane per cycle, amendments, every deploy | F-50, WBR, `ledger.mjs report` | `founder-inbox.json`; project review (`projects.json` forum) |
| L1 Portfolio | head-of-product (priority across types), portfolio-manager (register and triage) | Which lane gets the next slot; priority 1–4 on every queued item; tranche releases ≤ 3M under the PR1 delegation | `board.json` priority, `ledger.mjs report` | `projects.json`; `tools/triage.mjs`. **New:** `kind: "lane"` lines with `contentType`, `manager`, `costTarget`, `cycleBudget` |
| L2 Lanes | lane S: principal-pm-verticals; lane M: design-lead; quality: evaluation-steward; support lanes as in `poc-map.md` | What its workers do next, inside its budget | its queue (board items tagged `project:<lane>`, sorted by priority) | Standing build orders and mailbox requests (F-42, `tools/mailbox.mjs`) |
| L3 Workers | demo-builder, checkers, curators (pools) | How to do one item | the brief or batch file | Batch files; slots (`tools/lib/slots.mjs`) |

**How priority is set and read.** Every item in a lane queue carries `priority` 1–4. The portfolio-manager sets it at triage, and the curator proposes it on the brief. The dispatcher drains mailbox requests in this order: priority, then lane headroom (budget minus spent), then age. **New:** `mailbox.mjs drain` sorts by these three keys. Today it reads in file order.

**How a lane stops.** Each lane is a `projects.json` line with a cycle budget. B1 in `dispatch-check.mjs` already runs `ledger.mjs gate` when a dispatch names a project, and fails an approved major project at 100%. **New (one change, `tools/lib/ledger.mjs`, not protected):** lines of kind `lane` fail at 100% like major projects, and warn at 80% (`thresholds.warnAt`). A spent lane asks L1 for a tranche. It does not borrow from another lane. Coordination is charged to the lane that asked for it (F-41 item 5).

**Who dispatches.** Subagents cannot start subagents (F-30, superseded by F-42), so the chief of staff stays the hands. It no longer chooses inside a lane: it drains requests mechanically, and dispatch-check refuses any request without a lane, a priority or headroom. Lane managers choose inside their lane. **The operator does no production itself.** A founder ask that touches lessons becomes a batch in a lane: the 10-20 and 10-21 passes would each have been a lane S batch with checks. Checkers are dispatched only from the quality lane's standing orders (S4, F-28), never by lane S or lane M.

**One new measurement:** the ledger import must resume (`node tools/events.mjs backfill`, then `ledger.mjs import`), and the operator's session tokens get a ledger line per session (`ledger.mjs add --role=chief-of-staff`). Without these, P1 and P2 below cannot be judged.

## 4. Fewer roles: every team

Park means the role file is kept and marked parked, the subagent is dropped and the HQ seat is freed, through `org-change-process.md`. Merge means the scope moves to the named role, open board items are re-owned with a dated note, and the old role is parked.

| Team (now) | Role | Verdict | Reason (section 1) |
|---|---|---|---|
| leadership (9) | founder, chief-of-staff, chief-of-staff-ceo-office, principal-engineer, principal-engineer-ops, portfolio-manager | **keep** | They run, and they hold L0 and L1 or audit. chief-of-staff is re-scoped to mechanical dispatch with no production. |
| | head-of-strategic-initiatives | **keep, sunset** | Runs First Light (go/no-go 11-23). Park at its close. |
| | vp-rnd | **park** | 1 run; a layer over rnd-lead (keep-remove §6). |
| | chief-product-officer | **park** | 0 measured runs, 1 report; a layer over head-of-product and an evaluation org that never ran. Un-park if head-of-product's span exceeds 8. |
| product (3) | head-of-product | **keep** (L1) | 17 runs. |
| | principal-pm-verticals | **keep, re-scope: lane S manager** | 10 runs; ran Wave J, the nearest thing to a lane today. |
| | domain-scout | **merge → principal-pm-verticals** | P8 (F-13); 2 runs. |
| studio (2) | demo-builder | **keep** (pool) | 273 runs. |
| | learning-designer | **merge → interaction-designer** (pedagogy fields) and category-curator (brief fields) | 1 run, while interaction-designer ran 15 and does the pre-build spec. |
| design (6) | design-lead | **keep, re-scope: lane M manager** | 10 runs; owns formats and the first-3 design review. |
| | interaction-designer | **keep** | 15 runs. |
| | visual-designer | **merge → design-lead** | 2 runs (keep-remove §4). |
| | mockup-artist | **merge → interaction-designer** | Never ran. |
| | design-engineer | **merge → platform-engineer** | 3 runs; kit work. W-604 and W-605 move with it. |
| | illustrator | **park** | Never ran. Un-park on the first external delivery. |
| research (3) | research-scientist | **keep** (pool; absorbs research-lead's routing) | 4 runs. |
| | researcher | **merge → research-scientist** | Never ran; same job. |
| | research-lead | **merge → research-scientist**; requests come from lane managers | 3 runs; a lead over a pool of one. |
| quality (6) | evaluation-steward, fact-checker, learner-evaluator, qa-tester, accessibility-reviewer, pedagogy-critic | **keep** | The independent checks. Each ran (25, 118, 104, 34, 6, 3). |
| categories (51) | 50 cm-* (14 leads, 36 strands) | **merge → `category-curator`** (one pooled role; instance per category; see 4a) | 9.83M for 114 runs; 16 strands never ran; 36 strands spent 1.48M. |
| | lifehacks-safety-reviewer | **merge → `route-reviewer`** (new id; route checklist as data) | 4 runs; one mechanism for every risky route (AMD-014 b). |
| international (3) | cultural-reviewer | **merge → `route-reviewer`** (reports to evaluation-steward, F-28) | 3 runs. |
| | localization-lead, localizer | **park** | Never ran; no locale chosen (F-09). |
| platform (3) | platform-engineer, release-manager | **keep** | 27 and 19 runs. |
| | community-engineer | **merge → platform-engineer** | No runs on record; its PR work runs under lane names. |
| backend (2) | backend-engineer, privacy-reviewer | **keep** | First Light accounts; the privacy gate. |
| personalization (9) | vp-personalization, growth-designer, personalization-eval, applied-scientist-personalization, learning-scientist-personalization, personalization-engineer, learner-model-engineer, learner-data-engineer | **keep** | Approved 10-16 and 10-18 and active until 10-20. A second reorg inside a week is my own failure mode ("a reorg every week"). |
| | lesson-dims-owner | **merge → learning-scientist-personalization** | 2 reports. |
| company-tools (2) | tools-lead, hq-engineer | **keep** | 26 and 9 runs. |
| insight (2) | analytics-steward, pattern-librarian | **keep** | 6 and 5 runs; cheap. |
| rnd (2) | rnd-lead | **keep** until F-49 is decided; reports to principal-engineer | rnd-knots line. |
| | rnd-engineer | **park** | No run on record. Knot builds use the catalog line. |
| courses (2) | courses-lead | **merge → principal-pm-verticals** | Never dispatched. |
| | cm-course-ncm | **merge → category-curator** (instance `course:ncm`) | 1 run. |
| marketing (1) | vp-marketing | **keep** | First Light narrative. |
| evaluation (3) | head-of-evaluation, evaluation-engineer | **park** | Never ran; lane 21 has no budget. |
| | pairwise-judge | **merge → pedagogy-critic** | Never ran; pedagogy-critic already does pairwise. |

**Result: 39 roles (38 agent roles plus the founder), down from 109.** Of these, 37 are existing roles (four re-scoped: chief-of-staff, principal-pm-verticals, design-lead, research-scientist) and 2 are new ids that come from merges (`category-curator`, `route-reviewer`). 70 roles leave by merge or park, and every file is kept. The count follows from one rule: **a role stays if it ran in the window and has a step in a flow or a support lane.** The two flows need 11 working roles (curator, interaction-designer, builder, qa, fact, learner, a11y, pedagogy, route, release, design-lead). Each support lane needs one owner. Personalization is held as it is until its M1, except for one merge. Every kept role ran, with two exceptions: rnd-lead (5 dispatches on record but no run record; it is kept only until F-49 is decided) and the two new ids, which are merges of roles that ran.

### 4a. How the 51 category managers collapse

| Now | After |
|---|---|
| 15 leads plus 36 strand roles, each with a role file, subagent, HQ seat and memory | One role, `category-curator`, a pool like demo-builder (MANY in `people.mjs`). The brief names the instance: `category=history` or `course:ncm`. |
| Domain knowledge in each role's prompt | Domain knowledge in data the curator reads first: `content/curriculum/<d>.json`, `company/domains/<d>.md` (charter), `company/domains/briefs/<d>.*.md` (strand sections), and a per-category notebook. |
| 15 personal memories | **New:** `company/roles/memory/category-curator/<category>.md`, moved from `cm-<category>.md` before generation. `memory.mjs` has no rename (my 10-16 note), so the files move first. |
| 172 open board items owned by cm-* | Re-owned to category-curator, with the category in `domain`. |
| A lead per category on the POC map | Lane S and lane M managers are the POCs, and the curator is a worker in both. |

## 5. Alternatives

| | A (recommended): content-type lanes, categories as data | B: minimal, apply the 10-18 keep/remove | C: lanes by category |
|---|---|---|---|
| Roles | 39 | about 65 (109 minus 44 from `2026-10-18-role-keep-remove.md`) | 53 (A plus 15 category leads instead of one curator) |
| Flow per content type | yes, 2 flows | no; one implicit flow | content type is a format inside each category lane |
| Budget | 2 production lane lines plus support lines | unchanged (lines never block) | 14 to 15 lane lines |
| Who dispatches | lane managers by mailbox; operator drains | operator chooses (as today) | 15 leads by mailbox; operator drains |
| Cost to apply | about 1.5M tokens: generate, re-own, HQ seats, AMD-014 redraft, `ledger.mjs` and `mailbox.mjs` changes | about 0.4M | about 1.2M |
| Risk | Curators lose domain continuity; the two lane managers become the new hub; tier S sampling may let defects through | Does not meet CP1-L1. The operator bottleneck (1,280 of 1,281 dispatches) and the unbudgeted catalog line stay. | 15 manager rounds rebuild the 10-16 failure (manager rounds were 35% of tokens; 41 dispatch requests in one day) |

**Why A wins.** It is the only option that meets all three parts of CP1-L1. It moves the 35% coordination cost to two managers rather than fifteen. It makes each content type cost a number the founder can stop. B is cheaper but leaves every bottleneck in 1c in place. C keeps the people who know a category but multiplies the manager rounds that F-41 diagnosed as the problem.

## 6. Migration plan

| # | Step | Owner | Protected path? | Undo |
|---|---|---|---|---|
| 1 | Founder decides F-50 (A, B or C; row by row if wanted) | founder | no | — |
| 2 | Decision record `company/decisions/2026-10-xx-founder-restructuring.md`, objections attached | chief-of-staff-ceo-office | no | supersede it |
| 3 | Consult in writing each receiving role: principal-pm-verticals, design-lead, interaction-designer, platform-engineer, research-scientist, pedagogy-critic, evaluation-steward (route-reviewer), and four category leads (history, lifehacks, books, cs) | chief-of-staff-ceo-office | no | — |
| 4 | Lane lines in `projects.json` (`kind: "lane"`, budgets, cost targets); founder sets the cycle budgets | portfolio-manager | no | revert the commit |
| 5 | `tools/lib/ledger.mjs`: lanes fail at 100%. `mailbox.mjs drain`: sort by priority, then headroom, then age. Ledger import resumes, and the operator's tokens get a ledger line | tools-lead (tier-1 readiness check) | no | revert; B1 falls back to today's rule |
| 6 | `meta.json` `contentType` and normalised `format` values (14 spellings to 8), checked by a new non-protected tool, not by `company.mjs` | tools-lead, design-lead | no | revert |
| 7 | Move the memories (`cm-*.md` to `category-curator/<d>.md`), then `roles.mjs` edit and `generate.mjs`; HQ seats (`test:hq`) | chief-of-staff-ceo-office, hq-engineer | no | revert the roles commit and regenerate; parked files are still there |
| 8 | Re-own open board items (172 cm-*, plus each merged role's items), each with a dated note | chief-of-staff (board writer) | no | the notes name the old owner |
| 9 | `poc-map.md`: lanes S and M plus support lanes; `operating-loop.md`: no production by the operator | chief-of-staff-ceo-office, chief-of-staff | no | revert |
| 10 | **AMD-014 redraft with tiers S, R and N plus the sequence probe** (`tools/company.mjs` `publish` and `check`) | evaluation-steward → constitutional review → founder ratifies | **yes: `tools/company.mjs`** | revert under its `Amendment: AMD-014` trailer (its own rollback section) |
| 11 | Only if the QA contract must cover sub-cards: a sequence case in `tests/qa/**` | evaluation-steward | **yes: `tests/qa/**`** (amendment) | revert under its trailer |
| 12 | First lane M batch of 3 (one revises `euclid-three-steps`) through the new flow; founder approves its deploy | design-lead (lane M) | no | park the lane |

Steps 4 to 9 can run before step 10. Until AMD-014 is ratified, both lanes run under today's gate (every lesson gets a learner walk), so tier S costs about 19k per lesson more than its target. `src/kit/Lesson.tsx`, `surface-value.md`, the constitution and `ci.yml` are untouched.

### Predictions (committed 2026-10-25, before any step runs)

| # | Prediction | Measured by | Wrong if |
|---|---|---|---|
| P1 | In the first 14 days after step 9, coordination (manager runs plus the operator's dispatch and bookkeeping) is **≤ 15%** of measured tokens, against 35% on 10-16 | ledger by role and lane; operator session lines from step 5 | above 25%, or the operator's tokens are still unmeasured (then it cannot be judged, which also counts as a failure) |
| P2 | Lane S's first 100 published lessons cost **≤ 150k all-in per published lesson**, and builder occupancy is ≥ 2 of 3 | `ledger.mjs report` lane line; slots | above 200k per published lesson, or occupancy stays at or below 1.5 |
| P3 | Lane M publishes **3 items within 14 days** of step 12's start at **≤ 450k each**, with 0 fatal flaws in the first 3 design and pairwise reviews | ledger; review records | fewer than 3 published, over 450k, or a pairwise record prefers the single-card version in 2 of 3 |

Guard, owned by the evaluation steward and not by me: the AMD-014 sample stop rule (more than 1 fatal flaw in 10 means that category goes back to 100% review).

## Objections

| # | Objection (expected from) | Answer or status |
|---|---|---|
| 1 | **Category leads (cm-history, cm-lifehacks, cm-books):** "A pooled curator has no standing judgment. History and Life Hacks need someone who remembers the charter, the sensitive lines and past rulings." | **Answered in part.** The charter, rulings and notebook move to category data that the curator must read first, and every sensitive or safety item gets the route-reviewer. **Standing:** a prompt that reads files is not the same as a role that owns them. Un-park rule: if a category's brief queue goes 2 cycles without clearing, or its route-reviewer findings rise above 1 in 5, it gets its lead role back. |
| 2 | **Category leads:** "We lose our memories and our seats." | **Answered:** memories move by file before generation (4a); nothing is deleted. The seat matters less than the queue. |
| 3 | **evaluation-steward:** "Sampling the learner walk at 1 in 5 lowers quality; the 10-14 rush published broken lessons." | **Left standing.** The gate is yours: this proposal asks for tiers and sets none (step 10). The weekly audit of 50 published lessons (F-41 item 9) and AMD-014's stop rule are the safeguards. Until you ratify, every lesson keeps its walk. |
| 4 | **evaluation-steward:** "Merging the safety and cultural reviewers dilutes two kinds of expertise." | **Answered in part.** It is one role with two checklists as data (`route=safety`, `route=sensitive`), and a third (`copyright`) that has no owner today. **Standing** until your AMD-014 redraft says whether one mechanism needs one role. |
| 5 | **head-of-product:** "Signing every batch launch record and setting cross-lane priority, with CPO parked, puts me back at the span the 10-13 evaluation called unmanageable (20 directs)." | **Answered:** directs after the change are principal-pm-verticals, design-lead, research-scientist and analytics-steward (4). Batch records replace per-lesson records. CPO un-parks if the span passes 8. |
| 6 | **head-of-product / founder:** "CPO and the evaluation org were approved on 10-18. Parking them a week later is a reorg every week." | **Standing, by my own failure-mode list.** They have no measured run in the window and lane 21 has no budget. Parking keeps the files, and un-parking is one regenerate. The founder may keep them (row by row in F-50). |
| 7 | **principal-engineer:** "platform-engineer already has 80 open items; adding design-engineer, community-engineer and W-604/605 overloads it." | **Answered in part.** It is a pool, so occupancy, not role count, is the limit. The portfolio-manager re-triages the inherited items at step 8. **Standing:** whether the kit sequence work (W-604/605) waits behind platform items. Lane M cannot start step 12 without W-604. |
| 8 | **principal-engineer:** "rnd-lead reporting to me, without vp-rnd, mixes R&D with production engineering." | **Answered:** one direct report, until F-49 is decided. If tranche 2 is declined, rnd-lead parks too. |
| 9 | **chief-of-staff (operator):** "Founder asks come to me directly (copy passes, maps); routing them into a lane slows the founder." | **Answered:** the lane batch is the same work with its checks. The 10-21 history stories shipped to production without pre-build review, and its own record says so. The founder can still mark a batch priority 1. |
| 10 | **principal-pm-verticals / design-lead:** "Two lane managers become the new hub." | **Standing.** P1 measures it. If coordination exceeds 25%, standing build orders replace per-batch requests (F-41 item 1). |

<!-- Sources checked 2026-10-25: tools/org/roles.mjs (109 roles), company/ops/ledger.jsonl, company/ops/events.jsonl, node tools/ledger.mjs report, npm run company -- status, company/ops/board.json, src/demos/*/*/meta.json, company/ops/projects.json, company/design/formats.md, company/constitution/protected-paths.txt, AMD-014 draft, system3-meta docs/product/MIGRATION.md §4 and docs/CHECKPOINT-1.md. -->
