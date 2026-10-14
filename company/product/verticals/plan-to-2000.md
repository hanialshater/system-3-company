# Plan to 2,000 lessons: categories, verticals, waves, capacity

owner: principal-pm-verticals (Selin) · date: 2026-10-14 · status: **proposed**. head-of-product decides the wave order and caps inside the roadmap. The founder decides the target, any new vertical and its budget, deploys, and web access for fact-checking.
inputs: `npm run company -- status` and `coverage` (2026-10-14), `content/curriculum/*.json`, `company/ops/waves.json`, `company/ops/progress.md` (Wave J entries), `company/decisions/2026-10-14-pr2-lifehacks-scope.md`, `company/decisions/2026-10-14-books-and-big-ideas.md`, `company/product/verticals/networks-crowds-markets.md`, `company/domains/books.md`, `company/domains/big-ideas.md`
companion: `company/product/verticals/networks-crowds-markets.md` (the one vertical with a doc today)

## 0. What counts, and what I know

- **The 2,000 means gated lessons that are published or publishable.** A lesson on disk that cannot pass its gates does not count. Files are not lessons. If we count files, we hit 2,000 sooner and teach less.
- **We have no demand evidence.** Nothing is deployed to real learners, so metrics part B (commit rate, recall) is empty. EXP-002 is designed but has not run. Every "demand" number below is a category manager's 1-3 estimate in `content/curriculum/*.json`. Borrowed-mind reviews tell us about quality. They are **not** market evidence, and this plan never treats them as evidence of demand. So the first ~1,100 lessons are allocated on judgement, and the back half (waves N onward) is held for re-allocation on real data (section 3).
- The founder gave the target as "2,000, up from 879" (`2026-10-14-books-and-big-ideas.md`). This plan uses 887 on disk as the starting point (status shows 890 later today because other sessions are still working).

## 1. Where we stand (2026-10-14)

| Category | On disk | Published | Concepts covered / total | Unmet demand-3 | Kept after Wave J (est.) |
|---|---|---|---|---|---|
| cs | 148 | 125 | 142/160 | 6 | ~167 |
| economics | 89 | 68 | 89/109 | 5 | ~109 |
| math | 74 | 60 | 72/92 | 5 | ~93 |
| probability | 73 | 63 | 72/90 | 6 | ~92 |
| life | 66 | 59 | 59/75 | 2 | ~81 |
| ai | 61 | 56 | 61/76 | 7 | ~76 |
| physics | 61 | 55 | 61/76 | 7 | ~76 |
| chemistry | 60 | 55 | 58/73 | 4 | ~75 |
| geography | 55 | 46 | 51/63 | 1 | ~70 |
| lifehacks | 200 | 0 | 120/136 (inflated, see below) | 11 | ~75 |
| books | 0 | 0 | 0/60 | 24 | 0 |
| big-ideas | 0 | 0 | 0/60 | 11 | 0 |
| **total** | **887** | **587** | | **89** | **~914** |

How I got the "kept" column. Wave J adds about 15 per domain plus 15 NCM briefs, which go into math, cs, probability and economics. Life Hacks is discounted: the 200 PR lessons land as a capped subset (tranche A is 5, tranche B is at most 25, and the survivor estimates are 40-60), so I count about 60 plus Wave J. **After Wave J we hold about 914 countable lessons, not 1,052. We need about 1,086 more.**

The NCM vertical has 69 lessons that cite `easley-kleinberg-2010`, and every demo-able section is covered.

## 2. Target per category (sums to 2,000)

| Category | Target | After J | New needed | Where the new lessons come from | Saturation call |
|---|---|---|---|---|---|
| physics | 200 | 76 | 124 | **exam-prep syllabus** (intro mechanics, electricity, waves misconceptions); 7 unmet d3 | room: new concepts from a syllabus |
| probability | 200 | 92 | 108 | **exam-prep syllabus** (intro statistics); data-literacy strand (6 concepts) | room: new concepts |
| math | 200 | 93 | 107 | exam-prep (algebra, geometry: 8 and 5 concepts tagged today); 5 unmet d3 | room: new concepts |
| cs | 200 | 167 | 33 | **systems (10 concepts) and security (5) only**; no new algorithms concepts | **saturating** in algorithms (91 concepts) |
| economics | 175 | 109 | 66 | personal-finance and macro strands (7 each), with the refuse list | markets strand **crowding** (NCM put 5 more there, one near-duplicate) |
| ai | 165 | 76 | 89 | 7 unmet d3; ai-society; the AI half of a later workplace path | room |
| life | 160 | 81 | 79 | new concepts are needed (only 2 unmet d3) | concepts thinning: the CM must add concepts, not deepen |
| chemistry | 150 | 75 | 75 | 4 unmet d3; the exam-prep chemistry layer later | room, modest |
| geography | 110 | 70 | 40 | only if the data lands (gridded climate, population); 1 unmet d3 | **saturating**: demand-3 is nearly exhausted and data blocks the rest |
| lifehacks | 150 | ~75 | 75 | kitchen, cleaning, study (demand-3 strands that hold 16 of the PR's 200) | curriculum inflated by concept-per-slug; grow by strand, not by concept |
| big-ideas | 170 | 0 | 170 | 60 concepts now, about 110 later; 2 lessons on some ideas | new category, open |
| books | 120 | 0 | 120 | about 40 books × 3 ideas (27 works listed today) | new category, **capped by verification**, not by ideas |
| **total** | **2,000** | **~914** | **~1,086** | | |

**New concepts versus new categories.**
- **New categories or new anchor sources needed:** NCM (section coverage is saturated, so stop briefing it), cs-algorithms, geography (blocked on data) and economics-markets. The next growth there is not more concepts in the same map. It is Big Ideas and Books, which are already being created, an exam-prep vertical (section 4), and, only if NCM's learner results are good, a second course with a new anchor work.
- **New concepts needed inside the category:** physics, probability, math, ai, chemistry and life. The best source of demand-anchored concepts for physics, probability and math is a real syllabus. It is better than a CM's idea list because a syllabus is external evidence of what people must learn. It is still not evidence that people want our format.
- **Coverage percentage is not the goal.** Every category sits at 75-90% covered because CMs add concepts each wave. The real saturation test is the count of unmet demand-3 concepts with a predict-able misconception. That count is 54 across the subject categories, about one third of one wave.

## 3. Wave order

A wave is about 150-165 lessons, the size of Wave J. There are no dates, because a wave starts when its entry gate is met (section 5), not on a calendar.

| Wave | Size | Contents | Entry gate (all must hold) |
|---|---|---|---|
| **J** (in flight) | ~165 | 10 domains × ~15 plus 15 NCM | started |
| **D: drain** (not a build wave) | 0 new | Clear review: Life Hacks PR triage to its cap, publish the 63 ready lessons, kit fit fixes W-287, W-332 and W-348 (the main cause of r8 revisions), one web-capable fact-check session for held claims, founder decision on a first deploy so that EXP-002 and metrics B can start | — |
| **K** | ~150 | All 54 subject unmet demand-3 concepts; Big Ideas pilot of 30 (derivation-checkable ideas first, 5 for Domain Launch Review); Books pilot of 10 (arithmetic or logic ideas only, single card); Life Hacks kitchen, cleaning and study, 20; exam-prep gap lessons, 36 (physics and probability, from a mapped syllabus) | review queue ≤ 1 wave, excluding held Life Hacks; Wave J ≥ 60% published; 0 disputes older than 1 wave |
| **L** | ~160 | Exam-prep build-out: physics 40, probability 30, math 30 (only if the vertical review approves K's mapping); cs systems and security 20; Big Ideas 40 | as K, plus the exam-prep vertical doc approved by head-of-product and the founder |
| **M** | ~160 | ai 40, chemistry 30, life 30, economics personal-finance and macro 30, Big Ideas 30 | as K, plus the first deploy done (founder) and an EXP-002 result |
| **N to Q** | ~620 | **Re-allocated on learner data.** The default if no data exists: the remaining per-category gaps in section 2, pro rata. Books are released only as fast as chapter checks clear. | as K, plus re-allocation at cycle-planning from commit rate and recall by category |

Order rationale. Wave K goes to demand-3 gaps and the two new categories' pilots before any depth. A category's first 5 lessons are what tell us whether the category works. Exam prep goes before more cs and geography because it supplies external, syllabus-defined demand, and cs and geography are saturating. Nothing beyond Wave M is committed by category, because the wave that should reshape the plan is the first one with real learners.

## 4. Verticals: add, defer, or decline

| Proposal | Recommendation | Why | Kill or revisit rule |
|---|---|---|---|
| **Networks, Crowds and Markets** (existing) | **Stop briefing; measure.** Hold at ~90 lessons (69 now plus Wave J). | Every demo-able section is covered. The next useful thing to learn is recall and path completion, not more coverage. | Already in its doc: kill if 7-day recall is more than 10 points below the feed median and path completion is under 15%, 60 days after deploy. |
| **Exam prep** | **Add one: a pilot on two syllabi** (intro physics and intro statistics; candidates are AP Physics 1 and AP Statistics, both unconfirmed from here) | It is the clearest job to be done ("pass the course"), and it gives demand that a syllabus documents. Predict-and-see aims straight at the misconceptions that conceptual exam items test. About half of the lessons already exist, so the vertical mostly *organises* lessons across categories, which is this role's job. | Kill after 60 days deployed if path completion is under 15% or recall is no better than the feed median. Blocker: syllabus documents cannot be opened from this host, so topic codes stay "(unconfirmed)", as NCM sections do. |
| **Workplace** | **Defer. No new category.** Revisit after Books has 5 launched lessons and we have deploy data. | It overlaps Life Hacks time, digital and office topics, which the PR #2 decision dropped as templated and low quality, and it overlaps Books business, data literacy and AI-society. At most it would be a *path* over existing lessons (Personalization's job), not new briefs. | Revisit if Books business and AI-society commit rates beat the feed median. |
| **Parents** | **Decline for now.** | Child development and health run into the refuse list, and no safety reviewer covers them. "Help your child with maths" is a path over existing math lessons, and Personalization can build it with no new lessons. | Revisit only with a child-safety reviewer role and founder direction. |

One new vertical, not three. "A vertical per week" is this role's first named failure mode.

## 5. What each wave needs from the pipeline

Measured inputs: a CM writes ~15 briefs per run, a builder builds ~5 per run. The host has 4 CPUs, 15 GB RAM and a shared disk that filled to ENOSPC several times today. A release build takes ~5 min, and builds were OOM-killed at load 30-41. QA takes ~10 s per lesson per viewport across 2 viewports (phone 390×844 and desktop). A walkthrough takes 1-2 min per lesson under load. Claims average 5.45 per lesson, and 21.7% of them are `source` support (counted over 692 non-Life-Hacks meta.json files). About 10% of source claims are held unverified because the web is blocked.

Per wave of 160 lessons:

| Stage | Work | Runs or machine time | Notes |
|---|---|---|---|
| Briefs (CMs) | 160 briefs | ~11 CM runs | Not the bottleneck. CMs could out-write review by 3×, which is the danger. |
| Build (demo-builder) | 160 new + ~160 revision tasks (observed: most r8 lessons are on v3-v6) | ~32 build runs + ~30 revision runs | At most 4 builders at once, and **at most 1 release build at a time** (5 min each) |
| Release builds | ~1 per builder run plus integration | ~62 × 5 min ≈ **5 h** of serialized build time | This is the hard CPU limit. Do not run 2 builds while walkthroughs run. |
| QA, incremental | 160 × 2 × 10 s | ~55 min | Per wave, changed lessons only |
| QA, full sweep | 2,000 × 2 × 10 s | **~11 h** single worker at 2,000 lessons (~5 h at 914) | Must be sharded or run overnight. It cannot be part of every verify run. |
| Walkthroughs | ~3 per lesson (learner review, fact-check, re-walk after revision; plus safety for Life Hacks and health) × 1.5 min | 160 × 3 × 1.5 ≈ **12 h** | The largest machine cost. Two at once is the safe limit on 4 CPUs. |
| Learner reviews (borrowed mind) | 160 first reviews + ~100 re-reviews | ~260 review records | **The binding gate today: 192 lessons are blocked on "no borrowed-mind learner review"**, versus 37 on claims |
| Fact-check | 160 × 5.45 ≈ 870 claims + rechecks of disputes | ~10 FC batches of ~31 lessons and ~85 claims (pass 35 rate) | Same cost as a build wave. Checking is the bottleneck (Thesis 1). |
| Held claims | 870 × 21.7% × 10% ≈ **19 claims**, ≈ **12% of subject lessons** held | 1 web-capable FC session per wave | For **Books, ~100%** of lessons are held: every "the book argues" claim cites an unconfirmed chapter. For Big Ideas, an estimated 30-40% (primary sources plus replication notes). |

**Throughput rule.** Wave depth is set by review, not build. The board's healthy line is "review queue < 2 waves deep". Today it is 292 in review, plus 165 incoming from Wave J, so ~457 against a 2-wave limit of ~330. **No Wave K briefs go to builders until the drain wave brings the non-Life-Hacks review queue to ≤ 1 wave.** CMs may write Wave K briefs earlier, but builders do not claim them.

**What the remaining ~1,086 lessons need in total.** About 7 waves, ~220 build runs plus ~200 revision runs, ~6,000 claims checked, ~1,800 learner reviews, ~80 h of walkthrough machine time and ~35 h of serialized release builds. Books add a further cost of about 120 lessons blocked until someone can open the books.

## 6. Risks to quality and guards

| Risk | Signal already on disk | Guard (owner) |
|---|---|---|
| **Counting files, not lessons.** Volume is not Surface Value. | The Life Hacks PR: 200 lessons, 883 claims, all unverified, ~40-60 survivors | Count only gated published or publishable lessons toward 2,000. A wave's success is "% published", not "lessons added". (chief-of-staff, analytics-steward) |
| **Templated briefs at volume** | PR #2: 30 of 127 briefs share one misconception, and 198 of 200 recall answers are option 0 | Before acceptance, CMs check recall-answer spread, duplicate misconceptions and `node tools/overlap.mjs` against existing lessons. At most 2 lessons per concept until every demand-3 concept in the category has one. (each CM) |
| **Concepts drawn around lessons**, which inflates coverage | Life Hacks 120/136 "covered" while kitchen and cleaning were empty | A new concept needs a named misconception and a demand rating that is justified in the curriculum note. cycle-planning rejects concept-per-slug. (head-of-product) |
| **Reveal and picture do not fit on the phone**, the main revision cause | Most r8 learner items: reveal over 90 words, picture off screen | Kit W-287, W-332 and W-348 land before Wave K. Brief reveal drafts ≤ 70 words, the NCM Wave J practice. (platform-engineer, CMs) |
| **Held claims pile up** | 6-10 held claims per FC batch. Books cannot verify any chapter. | Briefs prefer derivation or observation support. Source-only context lines are marked "cut if not checkable". One web-capable FC session per wave needs the founder. Books stay at ≤ 2 lessons per book in review (charter). (CMs, founder) |
| **Evaluator independence erodes under load** | Today's WIP commits swept other sessions' files | Walkthrough before account, always. Evaluators never batch with builder notes. Never raise throughput by skipping re-walks. (evaluation-steward) |
| **Simulated reviews mistaken for demand** | The demand ratings are estimates (books and big-ideas decision, objection 8) | Waves N to Q are re-allocated only on deployed commit rate and recall. Borrowed-mind verdicts never move a category's budget. (this role) |
| **Machine contention** (disk, OOM, slow walkthroughs) | ENOSPC repeatedly today; builds killed at load 30-41 | 1 release build at a time, ≤ 4 builders, ≤ 2 walkthroughs at once, full QA sharded or overnight, scratch cleanup at the end of each session. (platform-engineer, chief-of-staff) |
| **Big Ideas re-teaches subject lessons; Books overlap each other** | Charter "subject first" rule | Each brief names its nearest lesson and what it adds. The overlap tool runs before acceptance. (cm-big-ideas, cm-books) |
| **Copyright (Books)** | Legal read open for the founder | Charter rules are binding, and a breach is a dispute. No Books publish before the founder rules on a legal read. (founder) |

## 7. Board items added by this plan

They are on `company/ops/board.json` under the CM owners (search "plan-to-2000"). I asked each category lead for a portfolio change. None of them is an instruction to write briefs now, because briefs are the CMs' work and the gates decide when builders claim them.

## Objections I expect, and my answers

- *"Hold builders and we lose the pace."* The pace that matters is publishing. 192 lessons wait on review today. Building more raises the queue, not the count.
- *"Exam prep is just another vertical."* It replaces the "new concepts" growth path for physics, probability and math with an external definition of what matters. It is the only proposal here that supplies demand evidence we did not invent. It has a kill rule.
- *"Discounting Life Hacks to ~75 is too harsh."* That number is the head-of-product decision's cap and survivor estimate, not mine. If triage keeps more, the Life Hacks target is reached sooner and Wave K's Life Hacks slots shrink.
