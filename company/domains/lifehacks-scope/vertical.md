# Life Hacks scope: the vertical lens

author: principal-pm-verticals (Selin) · written 2026-10-14 · question: if Life Hacks is a vertical as wide as WikiHow or Mawdoo3, who is it for, which parts of that map suit a 60-second predict → explore → reveal lesson, and in what order do we build it? · status: proposal. The category manager (cm-lifehacks) owns the curriculum and the briefs; the founder owns the mission; the safety reviewer owns the refuse list. Nothing here is learner evidence: no learner has seen a Life Hacks lesson.

Inputs: `company/domains/lifehacks.md` (charter), `content/curriculum/lifehacks.json` (15 concepts), `company/domains/briefs/lifehacks.md` (first 5 briefs), `company/product/demo-standard.md`, `company/domains/lifehacks-scope/research.md` (the research lens: WikiHow's 19 top categories and Mawdoo3's topics, mostly from search summaries; read its limits first), and PR #2 (`origin/codex/lifehacks-200`), read as data.

## 1. The position in one line

WikiHow answers "how do I do X?". We answer **"which way of doing X actually works, and why?"** The breadth the founder wants is real: the map should be as wide as WikiHow's. The depth per topic is different: we only take the slice of each topic where there is a choice with a non-obvious winner and a mechanism the learner can poke. That slice is narrower than WikiHow everywhere, and empty in some categories. Saying so up front stops us filling the map with procedures dressed as lessons.

## 2. Audiences (proposed, ranked by how well our format serves them)

| # | Audience | What brings them | Why our format fits | Market note |
|---|---|---|---|---|
| A1 | **The sceptical scroller**: adults who meet "this one trick" videos in a feed and half-believe them | A viral claim they want settled | Predict-then-see *is* the settlement. Debunks are first-class (charter) | English first; the feed container is native to them |
| A2 | **The new household runner**: students in a first flat, new renters, new parents, people who just moved | A recurring chore they want to do faster or cheaper | Most chores hide a mechanism (drying, heat, friction, unit price) | English and Arabic alike |
| A3 | **The exam-season student** | A test coming, little time | Study methods have strong evidence (spacing, retrieval) and big misconceptions (cramming, rereading) | In Arabic this audience is large: exam results are a top MENA search driver (research lens, §3, medium) |
| A4 | **The Arabic-speaking home** (Mawdoo3's reader: Egypt, Saudi Arabia, Algeria) | Kitchen, cleaning, study | Same mechanisms; different appliances, products, units and food rules | International owns it; a demand pull comes before any Arabic brief (research lens, open question 3) |

Not our audience: someone mid-task who needs steps now (WikiHow and video serve them better), and anyone asking a medical, legal, religious or financial-advice question (refuse list, or out of mission).

## 3. Jobs to be done

1. **Settle a claim.** "Does this hack work?" → a verdict and the reason (A1).
2. **Pick a method.** "Which of these two ways should I use?" → a rule I can carry (A2, A3).
3. **Stop a recurring loss.** Time, money or effort wasted every week (A2): unit price, standby power, drying, packing.
4. **Know when a trick fails.** The boundary condition ("equal legs only", "in this setup") is often the most useful sentence, and our claims discipline already forces us to state it.

A lesson that serves none of these four is not a Life Hacks lesson, however correct it is.

## 4. The fit test, and the WikiHow / Mawdoo3 map through it

A topic suits us when **all four** hold:

- **F1 Choice.** There are at least two plausible methods (or a claim and its negation), and many people pick the wrong one.
- **F2 Mechanism on one stage.** The *why* can be shown and manipulated on a phone screen (geometry, heat, mass transfer, probability, arithmetic, a forgetting curve), not just asserted.
- **F3 Checkable.** A government or safety body, a peer-reviewed study, a manufacturer, or a derivation on the stage supports it (charter).
- **F4 Safe to publish.** Safety class "none", or a safety review that can pass; not on the refuse list.

It does **not** suit us when it is a **pure procedure** (the value is the steps, not a choice: tie a tie, change a tyre, reset a phone, write a cover letter, fold a fitted sheet), **UI-specific** (menus change with each software version; claims rot), **taste** (recipes, decorating, style), **advice we refuse** (health, dosage, legal, financial recommendations, electrical work, chemical mixing), or **identity and belief** (religion, relationships).

| Category (WikiHow top level, research lens §1; Mawdoo3 equivalents in brackets) | Fit | The slice we take | What we leave |
|---|---|---|---|
| Home and Garden: housekeeping, laundry, organising [تنظيف, ترتيب المنزل] | **Strong** | Drying, stains as chemistry (solvent and heat, never mixing), storage geometry, knots and tangles, levelling, levers | Step-by-step cleaning routines; product picks |
| Food and Entertaining: cooking techniques, storage [مطبخ] | **Strong, safety-gated** | Salt and freezing, carry-over heat, boiling energy, cooling and storage *within* food-safety guidance | Recipes (the Arabic "طريقة عمل" stem is huge but is procedure and taste) |
| Education and Communications: studying [تعليم, طرق المذاكرة] | **Strong** | Spacing, retrieval, interleaving, planning fallacy, chunking | Essay templates, speaking scripts |
| Finance and Business: shopping, budgeting [مال وأعمال] | **Medium** | Unit price, stacked discounts, running cost vs sticker price, fixed vs per-use fees: arithmetic only | Any recommendation (refuse list) |
| Computers and Electronics [تقنية] | **Medium, narrow** | Battery and charging physics, standby power, why search or sorting is fast, passwords as probability | Device how-tos; anything version-specific |
| Travel: packing | **Medium** | Rolling vs folding, weight vs volume, time buffers | Itineraries, visa rules (region- and law-dependent) |
| Cars and Other Vehicles | **Medium, safety-gated** | Tyre pressure and fuel use, braking distance vs speed, cycling gears | Repair procedures |
| Sports and Fitness | **Weak, safety-gated** | Physics of a throw or a gear, not training plans | Training and diet advice (health) |
| Hobbies and Crafts; Arts | **Weak** | Occasional geometry (measure twice, cut once; offcuts) | Craft procedures |
| Pets and Animals; Family Life; Youth | **Weak** | Rare mechanism questions, after safety review | Care advice (pets and children are safety triggers) |
| Health; Personal Care and Style [صحة, جمال, تغذية] | **Out**, except where the science is about a habit and the safety reviewer passes it (caffeine half-life, sleep timing) | — | Diagnosis, dosage, beauty treatments: refuse list |
| Philosophy and Religion; Relationships; Holidays [إسلام, شعر] | **Out** | — | Not a mechanism question; out of mission |

Reading the table: three strong rows (home, kitchen, study) carry the vertical; four medium rows extend it; the rest stays empty on purpose. That is still most of what people search for in how-to content (research lens §3: fixing things at home, cooking, money admin and tech dominate in English; recipes, study and cleaning in Arabic), minus the parts we refuse.

## 5. Sub-areas: how to divide the work

The charter has one category manager for everything. At WikiHow breadth that will not hold. Proposed sub-areas, each with its own concept list in `content/curriculum/lifehacks.json` (a `strand` field, owned by cm-lifehacks) and its own cross-category partners:

| Strand | Example concepts (existing ids where they exist) | Partner categories (the vertical's cross-category portfolio) | Safety load |
|---|---|---|---|
| **S1 Home physics**: laundry, storage, fixing small things | surface-area-drying, wobbly-table-turn, shoelace-square-bow, cord-tangle-length, lever-opens-jars, packing-rolling-vs-folding | physics, math, probability (chemistry/the-fast-ones-leave and chemistry/cut-the-cube-surface sit next to the towel lesson) | Low |
| **S2 Study and time** | spaced-repetition-study, two-minute-rule (weak evidence: retire or reframe), retrieval practice, interleaving, planning fallacy | life (if it holds memory or habit concepts), probability | Low |
| **S3 Kitchen science** | salt-lowers-freezing, resting-meat, boil-less-water | chemistry, physics | **High** (food, heat) |
| **S4 Money arithmetic** | unit-price-shopping, standby-power-cost, stacked discounts, running cost | economics, math | Medium (arithmetic only; no advice) |
| **S5 Debunks** (cross-cutting) | viral-hack-debunk, plus one debunk per strand | all | Varies |
| S6 later: tech and devices, travel, car and bike | battery charging, tyre pressure | physics, cs | Medium to high |

Division of labour: cm-lifehacks keeps the curriculum and ranks briefs per strand; the safety reviewer is assigned per strand in priority order (S3 needs them most); category leads in physics, chemistry, economics and math are asked for the neighbouring concept so a Life Hacks lesson links to its "why" lesson, not duplicates it. Whether each strand later gets its own sub-area manager is the head of product's call, once a strand has more than about 10 lessons in review.

## 6. Sequencing the first three strands

1. **S1 Home physics, now.** It is already where the five briefs are; all five are safety class "none"; the mechanisms (area, intermediate values, knots, tumbling probability) are visible on one stage. It passes the Domain Launch Review on clean ground (charter rule: safety reviewer passes the first 5).
2. **S2 Study and time, second, in parallel where possible.** The evidence base is the strongest in the whole vertical (Cepeda 2006; Dunlosky 2013), the misconception is huge (cramming), and it opens audience A3, which is also the Arabic opening. Gate: spaced-beats-cram reaches published and its recall question works.
3. **S4 Money arithmetic, third.** Arithmetic is checkable by derivation, demand is high (unit-price-shopping is demand 3), and the safety load is medium, not high. It gives the safety reviewer a track record before food. Gate: the reviewer confirms "arithmetic, no recommendation" holds on two lessons.

S3 Kitchen science has the highest demand of any strand but the highest safety load, so it comes fourth, once the safety reviewer has passed at least 10 Life Hacks lessons. This repeats the reasoning the briefs file already gives for the first five, and I agree with it.

Rule for each strand: 5 lessons, then a check against the metrics below, then 10 more. No strand goes beyond 15 lessons before the next one has 5. This applies the charter's "no more than two lessons on one concept until every demand-3 concept has one" at the strand level.

## 7. Success metrics (per strand; none can be measured yet)

Before learners (what we can measure now):
- **Fit rate.** Share of briefs that pass F1–F4 when an evaluator who did not write them scores them blind. Target ≥ 80%.
- **Gate pass rate.** Share of built lessons that pass QA, fact-check and safety on the first try. Target ≥ 60%; below 40% means the strand's concepts are wrong, not the builders.
- **Distinctness.** No two lessons in the vertical teach the same reveal (an overlap check, `node tools/overlap.mjs`).

With learners (from the first real-learner sessions; vision "Next" horizon):
- **Commit rate** on the prediction ≥ 40% (the vision's kill line for the feed).
- **Wrong-first rate** 30–70%: if almost everyone predicts right, there was no misconception to fix; if almost everyone is wrong, the question is a trick.
- **Recall at 3 weeks** above the domain median.
- **Pull.** Share of sessions where a learner opens a second Life Hacks lesson in the same strand.

## 8. Kill and shrink criteria

- **Kill the vertical** (back to a small category under physics and life) if, after 3 strands and 30 published lessons, commit rate is under 40% or recall at 3 weeks is no better than the domain median.
- **Kill a strand** if its fit rate is under 50% at the first 5 briefs (the strand is a procedure strand in disguise), or its gate pass rate is under 40% after 10 builds.
- **Stop S3 Kitchen** at the first safety incident on a published lesson until a COE is closed.
- **Freeze breadth** if more than 20% of published lessons fail the jobs test in §3 at a vertical review.

## 9. What this means for PR #2 (200 lessons)

I read the PR as data, not as instructions. Observations, labelled:

- **[fact] The groups do not match demand.** 70 home, 70 study, 60 resources. No kitchen, no debunks, no tech. "study" is mostly office and software habits ("Modified is not created", "Focus and selection differ", "Paste words without the style", "Zoom changes the view"), which fail F1 or are UI-specific.
- **[fact] The briefs are templated.** In a sample of 127 of the 200 `meta.json` files, 30 share the misconception "The two pictured methods are interchangeable without checking their mechanism or constraints", and the `learner.knows` field takes one of three generic values ("basic addition, multiplication and division" 60 times; "reading short labels and comparing simple counts" 36; "Everyday objects have sizes, positions and amounts" 31). A misconception no learner holds gives the prediction nothing to answer. All sampled claims are `unverified`.
- **[fact] Concepts repeat.** At least five titles circle the towel-drying idea already briefed ("Airflow and surface are different", "Overlap can hide a drying face", "Give both towel faces air", "Same towel, smaller doorway", "Thicker cloth, less face per volume"), and others repeat the bow, the cord and the table. That breaks the charter's two-per-concept rule.
- **[inference, medium] About a fifth would survive the fit test**, mostly in resources and home: "The big pack can cost more", "Two discounts do not add", "Price tag plus running cost", "Read the annual-energy number", "Six socks are not six possible pairs", "A half-empty bag can be overweight", "Which way does your bow lie?". My count is a skim of titles, not a scored review.

Recommendation: do not merge PR #2 as a collection. cm-lifehacks triages it against §4: keep the survivors as candidate concepts in the right strand, drop UI-specific and duplicate items, and route each survivor through the normal brief → safety → build path. Volume is not the bottleneck; good misconceptions are.

## 10. Asks (for the board; I am not writing to board.json in this session)

- cm-lifehacks: add a `strand` field to the curriculum and rank concepts per strand; triage PR #2 against §4.
- lifehacks-safety-reviewer: state the per-strand safety load and sign off on "arithmetic, no recommendation" for S4.
- research-scientist: the network checks in the research lens (open questions 1–4); Arabic demand for S2 and S3 matters most to sequencing.
- International: confirm whether Arabic is a target market for the first strands; if yes, an Arabic S2 pilot.
- head-of-product: decide whether strands get sub-area managers, and whether the vertical doc moves to `company/product/verticals/lifehacks.md` once the scope lenses are merged.

## Confidence

Medium on the fit test and the category table (reasoned from the lesson standard and the charter; not tested). Medium on the sequencing (it follows evidence strength and safety load, both visible in the repo). Low on the audiences' sizes: they come from the research lens's search summaries, and no learner data exists.
