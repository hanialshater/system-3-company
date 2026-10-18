# Founder ask: scale out category management (plan draft)

owner: chief-of-staff (draft) → founder decides; each part then goes to its owner below
date: 2026-10-18
status: proposed (draft plan; nothing applied)
class: org · product · gates · engineering (one ask, four owners; see §9)
route: founder → chief-of-staff-ceo-office (org) · head-of-product with design-lead (families, content types) · principal-engineer (HQ state machines) · evaluation-steward (gates, AMD-014) · head-of-strategic-initiatives (First Light coverage) · portfolio-manager (budget)
recorded by: chief-of-staff

## What the founder said

> "The idea, we want category management to scale out, probably with human leads. In think we need approval flows(state machines in HQ), do optimizations as you mentioned, also make category manager an independent org that can borrow agents when needed. We need also lesson families that could generate many lessons from same one, we need also content types to be ale to handle naunces efficienly . And a bit more optimization. As this is strategic and I want good coverage on first light lanch. Draft me a plan?"  (source: conversation, 2026-10-18)

## 1. Goal and constraints

**Goal.** More good lessons per token and per reviewer, run by category leads who can be humans, so coverage grows without the cost growing with it. First test: a strong launch catalog for First Light.

**Fixed constraints:**
- First Light: launch catalog **frozen 2026-11-13**, quality dry run 11-16, go/no-go 11-23, launch 11-30. The quality bar (Q1–Q5) applies to every catalog lesson.
- No reorganisation and no gate changes inside the freeze window (11-13 → 11-30). Org and tooling work lands before 11-06 or after launch.
- The quality checks stay independent: category orgs never own or borrow the checkers.
- Every deploy needs the founder's approval. Gate changes go through amendments.

## 2. Where we are (2026-10-18)

| Category | Published | In review | Built, not published | Status |
|---|---|---|---|---|
| Math, Probability, Physics, Chemistry, Life, Geography, AI, Economics | 561 (60–89 each) | 22 | ~30 | active, near their curriculum caps |
| CS | 147 | 6 | 200 algorithm drafts (PR #6, 22 claims each, all unverified) | active |
| Life Hacks | 6 | **194** (1,051 claims already verified) | — | incubating: waits on safety review + Domain Launch Review |
| History | 4 | 8 | 5 | incubating |
| Big Ideas | 2 | 0 | 4 | incubating |
| Behavioral | 0 | 4 | — | incubating (pilot of 5) |
| Books | 0 | 0 | 106 drafts | incubating: blocked on founder F1/F2 (copyright, source) |
| **Total** | **720** | **234** | **~330** | |

Costs (from the token ledger, a consistent internal unit, not yet dollars): ~150k tokens per published in-house lesson all-in; review ≈ build; revisions double both. Outside batches: Life Hacks ~1.9M per published lesson so far, Algorithms ~15M estimated just to fact-check.

**Diagnosis.** The binding constraint is review and approval, not building. Today's org has 14 category leads + 36 strand managers producing briefs into one review line that every lesson passes through one by one, with approval rules held in documents and the operator's memory.

## 3. The Category Management org

**Make it an independent org** with its own budget line, its own floor in HQ, and one head reporting to the founder (today the 14 leads report to head-of-product, whose span is 25).

| Layer | Who | Owns | Does not own |
|---|---|---|---|
| **Head of Categories** | human (founder hires) or, until then, an agent role | the category portfolio, budget split, cross-category priorities, the launch-catalog commitment per category | gates, deploys |
| **Cluster leads (4)** | **human leads** (the first humans after the founder) | approve briefs and family specs; sign batch launch reviews for their cluster; taste and standards | building, fact-checking |
| **Category managers (14)** | agents (as today), under a cluster lead | curriculum map, briefs, family instances, coverage | approval of their own work |
| Strand managers (36) | parked (keep/remove draft, F-33) | — | — |

**Clusters (proposed):** STEM (math, probability, physics, chemistry, CS) · Life & World (life, geography, AI, economics) · Society & Ideas (history, big ideas, behavioral; the sensitive route lives here) · Practical & Books (life hacks, books, courses).

**What a human lead does each week (≈ 3–5 hours):** approve or return briefs and family specs in the HQ queue; sign 1–3 batch launch reviews; read the sampled review findings; one written priority note. Humans decide what is worth teaching and whether it is good; agents do the volume.

**Borrowing agents.** Builders, designers, researchers and R&D sit in a shared **Studio pool** (one owner: head of the studio, under head-of-product). A category borrows by filing a **work order** in HQ: family or briefs, size, budget in tokens, due date. The pool owner accepts it against capacity (today's caps: 8 agents, 3 builders). The spend is charged to the category's budget line, tagged `[project:<category>]`, so cost per published lesson per category is measured, not estimated. **Checkers are never borrowed.** They stay in Quality under the evaluation steward and are scheduled by the review queue.

## 4. Lesson families and content types

### 4.1 Families: one engine, many lessons

A **family** is a reviewed engine plus many small specs (data). Three already exist: the Life Hacks engine (`src/lib/lifehacks/engine-v2.ts`, `studyCatalog.ts`), the Books model (`src/lib/books/`) and the Algorithms topics (`src/lib/algorithms/`).

| | Engine (reviewed once, deeply) | Instance (reviewed per lesson, lightly) |
|---|---|---|
| What | stage code, interaction, a11y, the reveal mechanism, claim templates | the spec: numbers, labels, question, reveal text, claim values |
| Who reviews | design review + principal engineer (kit tier) + full learner walk on 3 reference instances + a11y deep review | claim check by type (§4.2) + a short learner walk + automated QA/a11y |
| Cost (estimate) | ~1–2M tokens once | target **≤ 30k per lesson** (vs ~150k one-off) |

**Rules:** a family needs 3 reference instances that pass the full path before any other instance is built. An engine change re-runs the 3 references and the QA contract on every instance. Instances that need custom stage code are not family members; they are one-offs. A family must still teach one idea per lesson: a family that produces near-duplicates is cut at brief review.

**First families to make (proposed, by launch coverage gain):** Life Hacks study (exists, 194 waiting), Algorithms "trace the steps" (exists, re-spec to ≤ 8 claims), Map explorer (geo kit exists: History, Geography), Simulation run (probability, epidemics, behavioral), Book deck (after F1/F2).

### 4.2 Content types: the nuance, handled once per type

Each brief declares one **content type**. The type, not the lesson, decides how claims are checked and which extra review applies. This is how nuance is handled efficiently: the hard thinking is done once per type, written down, and the gate enforces it.

| Content type | Example | Claims checked by | Extra review route | Typical family |
|---|---|---|---|---|
| **Computable** | math, physics, probability, algorithms | a **claim script** (code computes the stated value); fact-checker reads only the claims code cannot express | none | simulation, trace, single card |
| **Empirical** | life science, chemistry, economics facts | fact-checker with sources | none | single card, before/after |
| **Data-driven** | history populations, OWID series, maps | pinned dataset + script that reads it; research-lead provenance once per dataset | sensitive if the concept is marked | map explorer, storyboard |
| **Interpretive / sensitive** | war, colonialism, religion, borders | fact-checker + cultural-reviewer (brief and publish) | sensitive | storyboard, compare |
| **Practical / safety** | life hacks | fact-checker + safety reviewer (brief and publish) | safety | life-hacks study |
| **Source-bound** | book summaries | chapter-confirmed quotes + copyright check | copyright | book deck |

Each type has a one-page **type card** (owner: head-of-product with design-lead and evaluation-steward): what counts as a claim, the claim cap (default ≤ 6; 8 for computable families), the check method, the refuse list, and the typical failure to look for. Briefs inherit it; reviewers check against it.

## 5. Approval flows as state machines in HQ

**One state machine per lesson, one per family, one per outside batch.** State is **derived from the files on disk** (as First Light's status already is), never typed in by hand, so HQ cannot disagree with the gate.

**Lesson:**
```
brief ─(cluster lead approves in HQ)→ approved ─(work order accepted)→ building ─(builder: pre-flight + local QA)→ built
built ─(checks by content type, in parallel: claims · learner walk · QA · a11y scan · route review)→ ready
ready ─(cluster lead signs batch)→ batched ─(release-manager: company publish --batch)→ published
any check "revise" → revising → built      third revise → retire proposal      published ─(retirement ritual)→ retired
```
**Family:** `spec → engine built → references (3) pass full path → approved → instances open`; engine change → `re-verify`.
**Outside batch:** `proposed → intake check (licence, brief format, claim cap, ≤ 20 lessons) → accepted → each lesson enters at "built"`.

**What HQ shows:** a queue per human lead (briefs, family specs and batches waiting on them), per-category boards with every lesson's state and its blocking check, cycle time per state, and tokens spent per state per category.

**Where the rules live:** the transitions that matter for quality (`built → ready → published`) are enforced by `company publish` (AMD-014, redraft in progress, W-1907); HQ calls the same code. HQ writes approvals as small signed record files (who, when, what version), so the disk stays the memory.

**Owner:** principal-engineer (EDD first, tier 2), built by tools-lead and hq-engineer. Not before the freeze if it touches publishing; the read-only views can ship before.

## 6. Optimizations (the cost levers)

| # | Lever | Saves | Owner | When |
|---|---|---|---|---|
| O1 | **Claim scripts** for computable claims | most fact-check tokens on the computable categories (roughly half the catalog, estimate) | evaluation-steward (format) + fact-checker | now, starting with the review queue |
| O2 | **Claim cap** by content type (≤ 6, 8 for computable families) | fact-check cost scales with claims | head-of-product (type cards) | now, for new briefs |
| O3 | **Brief-stage checks** ("told, not shown", answer leak) | about half the revisions (~70k each) | head-of-product, cluster leads | now |
| O4 | **Model tiering**: cheaper model for builds, claim scripts and QA reading; strongest model for learner walks and sensitive reviews; record the model on every dispatch | review cost; makes cost measurable | chief-of-staff (dispatch), analytics-steward (A/B on 20 lessons, EXP) | test this week, adopt by 11-01 |
| O5 | **Batches of ≤ 20**, one category per batch; outside batches the same | queue waste, stuck lessons | chief-of-staff, community-engineer | now |
| O6 | **No build without a path to publish**: a work order names the batch it will join; incubating categories build only their Domain Launch Review five until it passes | the 563 built-but-unpublished pattern | head of categories | now |
| O7 | **Measure cost in money**: tag every dispatch `[project:…]`, confirm what the token count includes, price it | turns tokens into a budget | portfolio-manager | by 10-25 |
| O8 | **Less coordination overhead**: rituals by event, not calendar; one board writer | the coordinator is the largest unmeasured spend | CEO office | after launch |

## 7. Phased plan

### Phase 0 · now → 11-06: launch coverage (no reorg)
Goal: the strongest catalog we can freeze on 11-13, using levers that need no org change.

| Category | Published now | Launch target (proposal) | How |
|---|---|---|---|
| 8 active STEM/world categories | 561 | ~575 | clear their 22 in review |
| CS | 147 | **~175** | 25–30 algorithm lessons re-specced to ≤ 8 claims, checked by claim scripts (O1) |
| Life Hacks | 6 | **~40** | safety review on the 194, pass the Domain Launch Review on the first 5, then batches of 20 |
| History | 4 | **~12** | finish the 8 in review on the sensitive route |
| Big Ideas | 2 | ~6 | Domain Launch Review five |
| Behavioral | 0 | 5 | the pilot five |
| Books | 0 | **0 or ~20** | only if the founder answers F1/F2 by **10-22**; otherwise Books is out of First Light |
| **Total** | **720** | **~815 (~835 with Books)** | |

Work items: claim-script format and the first 30 scripts (O1); AMD-014's minimal parts (publish-only gates, batch launch review) if ratified by 11-01, otherwise today's path; model-tiering test (O4); head-of-product names the launch catalog by 11-13 (W-931).

### Phase 1 · 11-06 → 11-30: design on paper (freeze window)
- CEO office: the Category Management org proposal (charters, the Studio pool, work orders), through the org-change process.
- Head-of-product + design-lead + evaluation-steward: the 6 content-type cards.
- Principal engineer: EDD for the HQ state machines and family engines.
- Founder: decide whether to hire human cluster leads, how many, starting when.
- No code that touches publishing; no reorg.

### Phase 2 · December: build and staff
- Ship the HQ state machine (lesson, family, batch) and the lead queues.
- Category Management org goes live; strand managers parked; first human lead(s) onboarded on one cluster (proposal: STEM, the most regular).
- Families v1: Life Hacks study, Algorithms trace, Map explorer, Simulation run.
- First real-learner data from launch decides which categories and families get the next budget.

### Phase 3 · January on: scale by evidence
- Budget per category follows learner results (completion, 7-day recall), not lesson counts.
- Add human leads cluster by cluster as the queue shows where taste is the bottleneck.

## 8. Decisions needed from the founder

| # | Decision | By |
|---|---|---|
| D1 | Accept the plan's direction (independent Category Management org, Studio pool, families, content types, HQ state machines) | 10-22 |
| D2 | Books F1/F2 (copyright, source): in or out of First Light | **10-22** |
| D3 | Launch coverage targets in §7 (or yours) | 10-24 |
| D4 | Human cluster leads: yes/no, how many, from when, and their authority (approve briefs and batches; never mark claims verified) | 11-20 |
| D5 | Budget: a token budget per category from December, priced in money once O7 lands | 11-27 |

## 9. Owners and next steps (each answers in writing before D1 is final)

| Part | Owner | First written answer due |
|---|---|---|
| §3 org, Studio pool, human leads | chief-of-staff-ceo-office | 10-21 |
| §4 families and content types | head-of-product with design-lead | 10-21 |
| §5 HQ state machines | principal-engineer | 10-22 |
| Gates (§5 transitions, O1 claim scripts) | evaluation-steward | with AMD-014 redraft (W-1907) |
| §7 Phase 0 coverage | head-of-strategic-initiatives with each category manager | 10-21 |
| O4, O7 cost | portfolio-manager, analytics-steward | 10-25 |

## 10. Risks and what this gives up

- **Families can flood the feed with near-copies.** Guard: one idea per lesson at brief review; the cluster lead approves the family's idea list, not just the engine.
- **Claim scripts can encode the builder's mistake.** Guard: the fact-checker reviews each script once (it is a claim about the claim), and the builder never writes the script for their own lesson.
- **Human leads become the new bottleneck.** Guard: they approve briefs and batches, never individual checks; HQ shows their queue age; agent deputies hold the queue when they are away.
- **Coverage push before 11-13 lowers quality.** Guard: the quality bar and the evaluation steward's go/no-go are unchanged; targets are proposals, and a category that cannot meet the bar launches smaller.
- **What it gives up:** per-lesson bespoke design in family lessons; per-lesson human review outside the samples; Books at launch if F1/F2 slips.

## Objections

None yet. Each owner's written answer (§9) that objects is copied here with its **Answer:**.

## Board

- W-1908 §3 org answer (chief-of-staff-ceo-office)
- W-1909 §4 families and content types (head-of-product)
- W-1910 §5 HQ state machines (principal-engineer)
- W-1911 §7 Phase 0 coverage (head-of-strategic-initiatives)
- W-1912 O4/O7 cost (portfolio-manager)
