# Personalization: response to the founder's brief (F-08)

owner: personalization-lead (Mateo) · date: 2026-10-16 · answers: `2026-10-16-founder-brief.md` (founder, recorded by chief-of-staff) · supersedes: `2026-10-16-draft-founder-brief.md` (now input) · board: W-091 (F-08)
status: **proposal for the founder to correct. Nothing here is built, ratified or a rule.** No code in `src/`. Everything live waits on an experiment, a privacy review and the founder's deploy approval (onboarding doc, authority).

Read for this response: the founder's brief §1 to §5; the reference engine `reference/edp-orchestrator/src/edp-engine.js` (whole), and skims of `orchestrator-inline.js` (SIGNALS, PERSONAS, PROBLEM_SHAPES, modules), `problem-and-signal-catalog.js`, `page-registry.js`, `policies.js`, `page-extensions-gam-v3.js` (PAGE_EDITS_V3); AMD-008 part P and X1 (`company/constitution/amendments/AMD-008-first-light-surface-value.md`, **proposed, F-19 open**); privacy gate P3 and P6 (`company/initiatives/first-light/privacy-gate.md`); EDD-009 §7 (stub); EDD-003 header; meta.json for `probability/armour-where-no-holes` and a scripted read of all 974; `content/curriculum/probability.json` and a scripted read of all 14 maps.

**Counts I took today (scripted read of `src/demos/*/*/meta.json` and `content/curriculum/*.json`, 2026-10-16):**

| What | Count |
|---|---|
| Lessons (all statuses) | 974 |
| Lessons with `concept`, `curriculum.primary`, `curriculum.level`, `misconception`, `recall` | 974 / 974 (every lesson's concept resolves to a curriculum node) |
| Lessons with non-empty `curriculum.prerequisites` | 614 / 974 |
| Lessons with `format` / `interactions` | 589 / 507 (19 distinct interaction kinds) |
| Curriculum concepts / with prerequisites / edges / cross-domain edges | 1,207 / 818 / 966 / 191 |
| Lesson concept is a prerequisite of some other concept | 365 / 974 |
| Prerequisite density by domain | cs 0.85, ai 0.85, economics 0.82, geography 0.83, life 0.77, chemistry 0.75, probability 0.73, physics 0.70, math 0.64, **lifehacks 0.07** (15 of 200) |

So the composer's structural inputs (concept, level, prerequisites, a misconception to be surprised by) **already exist on every lesson**; the gap is Life Hacks (200 lessons, almost no edges), and nothing yet measures how surprising or engaging a lesson actually is.

---

## 1. What I heard, and where the §3 mapping is wrong or incomplete

**What I heard.** You want an engine in the style of your EDP Orchestrator: read a few signals about a learner, turn them into scores for what that learner needs right now through editable shape curves (an additive model a person can read and drag), then fill the next few cards with the lessons that cover those needs best, preferring lessons that will surprise and that are new to this learner, without losing them. Every pick should be explainable by its score terms, the whole thing traceable in code and fast. Lessons have to carry the features that make that matching possible. Later: know what each learner has learned per category, recommend for maximum learning in a category, and reward that learning with badges and points. Curves start hand-set and are tuned from data later.

That fits our mission well, and one part of the reference is better than anything we had: **`terms()` explains every pick as a sum of named contributions.** That is exactly the "every moved card says why" requirement (AMD-008 P3), for free.

**Where the chief of staff's §3 reading needs correcting:**

| # | §3 says | Correction | Evidence |
|---|---|---|---|
| C1 | Needs include "surprise, novelty" | **Surprise and novelty are not needs; they are properties of a lesson relative to a learner**, so they are composer terms, not detected needs. In EDP a "problem" is a state of the shopper (size anxiety) that widgets resolve. Our needs are learning states: *repair* a miss, *build on* a success, *breadth* when the feed narrows, *stretch* when it is too easy. "Consolidate" is already the spaced revisit queue, which stays first and outside the composer (AMD-008 F2) | `edp-engine.js` `detect()` returns problems; `compose()` scores modules against them |
| C2 | "Learner persona: a named feature vector" | **In EDP, personas never run at serve time.** The live path is signals → `detect()` → `compose()`; `PERSONAS` feed only `evaluate()` and the demo presets. Ours must be the same: simulation fixtures and a design tool, **never assigned to, stored for, or shown to a learner** (privacy gate P3.2 "no profiling"; learners are 13+) | `edp-engine.js` `evaluate()`; `orchestrator-inline.js` PERSONAS; privacy-gate.md P3.2 |
| C3 | "Lesson with dims: per-lesson scores of how much it serves each need" | EDP hand-set `addr`/`on_rem`/`on_cov` on **22 widgets**. We have 974 lessons, going to 2,000. Per-lesson need coverage cannot be hand-authored, and does not need to be: **"how much lesson Y repairs this learner's miss on X" is relational** (Y's concept is X's concept or a prerequisite of it), computed from the curriculum graph at serve time. Hand-set coefficients live **per need type** (a few dozen numbers), not per lesson. The only new per-lesson dim worth authoring is how strong the misconception is (surprise prior) | counts above; `orchestrator-inline.js` `makeModulesV1()` |
| C4 | "A feed session: the next N cards" with an attention budget | The feed is sequential and the learner stops when they like; there is no page to fill. Compose a **short queue (next 3), recompute after every card.** EDP's attention budget (a candidate must clear a cost to be shown) maps to a **move threshold**: a card moves only if it beats the default-order card by a margin, otherwise the default card is shown and no reason is claimed. That is also the honest cold-start behaviour (AMD-008 F4) | `edp-engine.js` `cost`, `attention` |
| C5 | "Policies compared offline on simulated personas" | **`evaluate()` is circular**: it scores every policy on how much of the *detected* need mass it resolved, using the same shapes and `addr` the adaptive policy optimises. The adaptive policy wins by construction. Our simulator must score policies on an **independent simulated learner** (hidden knowledge, forgetting, prediction behaviour) and on simulated recall, not on need coverage. Even then a simulator can rule designs out; it cannot show real learners recall more | `edp-engine.js` `evaluate()` returns `coverageRate` = resolved / detected |
| C6 | "Curves start hand-set, then are tuned from learner data" | In the reference, v1 → v3 is **hand edits with a written reason each** (`PAGE_EDITS_V3`: `[widget, path, from, to, reasoning]`), not fitting. That style fits AMD-008 P1 (a published rule list changed by decision record). **Fitting curves to data is a learned model**, which P1 says needs a further amendment, and needs far more learners than we will have at launch | `page-extensions-gam-v3.js` lines 13 to 30; AMD-008 P1 |
| C7 | Signals listed loosely | EDP's signals include dwell, scroll velocity, tab switching and device. **All of those are forbidden inputs here** (AMD-008 P2; privacy gate P3.1). Our fingerprint is narrow by design: completions, predictions, recall, due revisits, stated choices, the curriculum graph | `orchestrator-inline.js` SIGNALS; AMD-008 P2 |
| C8 | Silent on engagement | The founder asked for engagement; AMD-008 X1 (proposed) says engagement is **never** used to rank lessons. §3 does not say where it goes. §2.5 below does, and objection O1 puts it to the founder | AMD-008 X1 |
| C9 | Silent on the binding guards | Due revisits first (F2), default order with the "not personalised" label for no history (F4), a true reason per moved card (P3), one off switch with no account needed (P4), anonymous runs in the browser only (gate P3.3), nothing derived stored per learner (gate P3.2) | AMD-008 F2, F4, P3, P4; privacy-gate.md P3.2, P3.3 |
| C10 | "Later: a per-category learner model" as if new | It already has a start: EDD-009's mastery state (`masteryOf()`, derived only from P2 fields, proposing no new stored data). Phase C extends it per category; it does not start a second model | `company/engineering/edd/EDD-009-learner-model-v1-mastery-state.md` §3, §7 |

---

## 2. The vocabulary as data shapes

Conventions: every number is 0 to 1; every curve is EDP's piecewise-linear `{bps, vals}` evaluated by `pwl()`; every object carries a `version` and the decision record that last changed it, so a served order can be replayed (AMD-008 P1 test). Sketches only; names will change in review.

### 2.1 Fingerprint (per learner, computed on demand, never stored as derived output)

Raw inputs and their privacy status today:

| Input | Where it lives | Privacy status (2026-10-16) |
|---|---|---|
| Completions per lesson (with time) | `s3c:progress:v1` local; server `progress` after EDD-008 | In AMD-008 P2 permitted list and gate P3.1. **Permitted, pending F-19** |
| Prediction right or wrong (`predictedCorrectly`) | same | In P2, but EDD-009 §7 says ordering use **needs its own privacy read**. **Read needed** |
| Revisit recall results (`recalls[{at, correct}]`), due revisits | same | P2 and P3.1. **Permitted, pending F-19** |
| Stated choices: subjects, "less of this", on/off | `settings` table, **not built** (EDD-008 §6.1) | P2. **Schema diff needs a read** |
| `masteryOf()` output | EDD-009, derived from P2 fields | Derived only from permitted fields. **Read needed** for use as an ordering input (EDD-009 §7 leaves it to me) |
| Days since last completion (re-entry) | derived from completion times | Close to "session count/length", which P2 forbids. **Read needed; not used in v0 unless passed** |
| Curriculum graph, lesson dims | `content/curriculum/`, meta.json | Not personal data |
| Dwell, swipes, scroll, session length/count, shares, device, location finer than country, age band, anything about ads | | **Forbidden** (AMD-008 P2, X1; gate P3.1). The age band never reaches the composer (EDD-009 §3.1 precedent) |

Features (the x-axis of the curves), all computed from the permitted inputs above:

```ts
type Fingerprint = {
  version: "fp-v0";
  historySize: number;        // completed lessons, saturating at 30 → 1.0 (cold-start dampener)
  missRecent: number;         // share of last 5 completed with a wrong prediction or a failed first revisit
  recallFailRate: number;     // failed first revisits / first revisits, last 30 days
  successRecent: number;      // share of last 5 predicted right or recalled
  levelRecent: number;        // mean level of last 5 (intro 0, core .5, stretch 1)
  domainConcentration: number;// share of last 10 completions in the single most-seen domain
  frontierOpen: number;       // share of completed concepts that have an unseen successor in the graph
  statedSubjects: string[];   // filter, not a curve
  lessOfThis: string[];       // filter, not a curve
  // gapDays: number;         // only if privacy-reviewer passes it
};
```

### 2.2 Need (detected by GAM shape curves, exactly EDP's `detect()`)

```ts
type Need = "repair" | "build" | "breadth" | "stretch";
type ShapeTerm = { signal: keyof Fingerprint; bps: number[]; vals: number[]; w: number; why: string };
type NeedShapes = { version: "needs-v0"; decision: string; shapes: Record<Need, ShapeTerm[]> };
// score[need] = clamp( Σ w·pwl(x) / Σ w ) × dampen(historySize)
```

Starting curves (hand-set guesses, to be edited and simulated, not evidence):

| Need | Terms (signal: breakpoints → values, weight) | Meaning |
|---|---|---|
| repair | missRecent: [0,.2,.4,.6,1] → [0,.1,.45,.75,.9], w .6 · recallFailRate: [0,.25,.5,1] → [0,.2,.6,.9], w .4 | Misses and forgetting call for a prerequisite or same-concept lesson |
| build | successRecent: [0,.4,.7,1] → [0,.15,.6,.85], w .6 · frontierOpen: [0,.3,1] → [0,.4,.8], w .4 | Successes with open successors call for the next lesson in the graph |
| breadth | domainConcentration: [0,.5,.7,.9,1] → [0,.05,.4,.8,.95], w 1 | The anti-bubble signal as a detected need (plus a hard floor, 2.5) |
| stretch | successRecent: [0,.6,.8,1] → [0,.1,.5,.8], w .5 · levelRecent: [0,.4,1] → [.8,.4,0], w .5 | Getting everything right on intro lessons calls for a core or stretch lesson |

All four are multiplied by a cold-start dampener `historySize: [0,.1,.3,1] → [0,0,.5,1]`: with fewer than about 3 completions every need is 0 and the composer returns the default order.

### 2.3 Persona (simulation fixture only)

```ts
type Persona = {
  id: "curious-newcomer" | "single-subject-crammer" | "struggling-repeater" | "returning-expert" | "wanderer" | "lapsed-returner";
  fingerprintMeans: Partial<Fingerprint>;   // what the composer would see (jittered per run, as evaluate() does)
  latent: {                                 // what the composer never sees: the simulator's ground truth
    priorKnowledge: Record<string /*domain*/, number>;
    forgetRate: number;                     // per-day decay of a concept's recall probability
    misconceptionPull: number;              // chance of predicting the misconception when the concept is unknown
    prereqPenalty: number;                  // recall cost of meeting a concept before its prerequisites
    interest: Record<string /*domain*/, number>; // drives the simulated stop decision, never the score
    stopHazard: number;                     // chance of leaving after each card
  };
  source: "invented";                       // until aggregate data exists
};
```

No persona is defined by age, sex or any demographic, and no persona label exists at serve time.

### 2.4 Lesson dims (what a lesson carries or exposes)

Split by where the number comes from, because that decides who authors it:

| Dim | Kind | Source today | Author |
|---|---|---|---|
| `domain`, `concept`, `level`, `prerequisites` (and reverse edges, "successors") | static | exists on 974/974 (prerequisites non-empty on 614) | **category managers** via `content/curriculum/` (already their job) |
| `format`, `interactions` | static | 589 / 507 lessons | builders; used only for a variety term |
| `misconceptionStrength` (surprise prior): how strongly the misconception pulls, 1 to 3 | static | `misconception` text exists on 974/974; strength does not exist | **pilot: category managers** rate the pilot set; then a classifier pass (an agent reading hook, misconception and recall) spot-checked by the CM; **then replaced by data**: aggregate wrong-prediction rate per lesson, across learners |
| `revealCompletionRate` (Surface Value #5 per lesson) | static, aggregate | needs W-706 persisted events, aggregates only (gate P6.3) | **derived from data**, never per learner |
| `firstRecallRate` per lesson | static, aggregate | same | derived from data |
| `addr[need]`: how much this lesson serves each need **for this learner** | relational | computed at serve time from the graph and the learner's history | **nobody authors it**: e.g. `repair = 1` if the lesson's concept is a missed lesson's concept or its prerequisite (1 hop), `.5` at 2 hops |
| `novelty(lesson, learner)` | relational | concept unseen 1, domain unseen +, minus similarity to the last 3 cards | computed |
| `surprise(lesson, learner)` | relational | `misconceptionStrength × readiness`, where readiness is 1 if prerequisites are completed and .5 if not | computed |

Where the static dims live (a derived index built from meta.json and curriculum, or new meta.json fields) is principal-engineer's call under EDD-003; a new meta.json field also touches the demo standard (head-of-product). My preference: **no new meta.json field in phase A**; a derived index file plus one pilot rating file.

```ts
type LessonDims = {
  slug: string; domain: string; concept: string; level: "intro" | "core" | "stretch";
  prerequisites: string[]; successors: string[];
  misconceptionStrength?: 1 | 2 | 3; strengthSource?: "cm" | "classifier" | "data";
  revealCompletionRate?: number; firstRecallRate?: number;  // aggregates, phase B on
  version: string;
};
```

### 2.5 The composer objective

Greedy fill of the next 3 new cards, recomputed after every card, EDP's `terms()` shape kept so every pick is a sum of named terms:

```
score(lesson | learner, slot) =
    b · defaultRank(lesson)                                  // keeps the default order as the base
  + Σ_need  onRem[need] · remaining[need] · addr[lesson, need] // cover detected needs
  + wS · surprise(lesson, learner)                           // prediction-error opportunity
  + wN · novelty(lesson, learner)                            // new concept or domain
  − onCov · overlap(lesson, cards already queued)            // no two from one concept
  − slotDecay · slot
```

Hard constraints (not terms, so no weight can buy past them):

1. **Due revisits first**, untouched (AMD-008 F2).
2. **Default order when history is short** (dampener) and when the learner switches it off (P4).
3. **Move threshold:** a card moves only if `score − score(default card) > δ`; otherwise the default card is shown and no reason is claimed.
4. **Anti-bubble floor:** at least 1 in 3 new cards from the default round-robin across subjects (draft G3; still a guess).
5. **Readiness:** a `stretch` lesson whose prerequisites are all unseen is not eligible.
6. Stated subjects and "less of this" filter the pool.
7. **Completion floor (phase B on):** a lesson whose aggregate reveal completion (#5) is below a floor is not eligible to be moved *up*.

**Engagement is a guardrail, not a term.** It enters three ways only: (a) the completion floor in 7, which is Surface Value #5 per lesson, not dwell or session time; (b) the experiment guardrails (#5 must not fall, return rate reported and labelled as engagement, AMD-008 X1); (c) surprise and novelty, which are the founder's engagement levers, **are kept as terms only because, and only while, they serve recall**: research-lead to say what the evidence supports, and the experiment keeps `wS`, `wN` only if recall does not fall. If the founder wants an engagement term in the score itself, that is a change to AMD-008 X1 and P2, and I object (O1).

**The learning objective the simulator scores:** for each simulated learner, mean simulated first spaced-revisit recall over **all** lessons completed (not only moved ones, so a policy cannot win by serving easy lessons), plus distinct domains reached (breadth guardrail), plus a check that cards shown before their prerequisites are not rising.

**Reasons from terms:** the largest positive term names the reason. repair → "You missed X on revisit, so here is Y, which X builds on"; build → "You remembered X, so next is Y"; breadth → "Something from a subject you haven't tried"; stretch → "A harder one on Z". A surprise reason such as "most people guess this one wrong" is a factual claim and may only appear once aggregate data supports it, recorded as a claim (Q1.6).

---

## 3. Phases

| Phase | What it is | Needs | Roles | Depends on | Exit criterion |
|---|---|---|---|---|---|
| **A. Offline** (can start now, no learner data, does not touch First Light) | Dims index on a **pilot set** (proposal: probability 78 + cs 153 lessons, prerequisite density .73 and .85; not Life Hacks at .07); `misconceptionStrength` ratings on the pilot; 6 personas with latent ground truth; needs-v0 curves; the engine ported to a sandbox with an **independent simulated learner**; policies compared: today's default order, the draft rules (draft brief §2), GAM composer, GAM without surprise/novelty, GAM without breadth, random, epsilon-greedy | Pilot dims index; ratings; personas; curves; simulator; a pass criterion written **before** the simulator is run | personalization-lead (curves, personas, objective), learner-model-engineer (port + simulator), cm-probability and the cs CM (ratings), research-lead (simulator parameters, evidence on surprise and novelty), analytics-steward (pass criterion), principal-engineer (where dims and engine code live), privacy-reviewer (fingerprint inputs read, so we do not design on a forbidden input) | Nothing from accounts or W-706. Engine code location: tier-2 rule for `src/lib/learner/**` (W-1220) if it is ever in `src/`; in phase A it stays out of `src/` | Seeded, reproducible run; the GAM composer beats default order **and** the draft rules on simulated recall in at least 4 of 6 personas, without lowering breadth, and the ranking survives ±50% changes to the simulator's forgetting and misconception parameters; replay test (same inputs → same order) and forbidden-input invariance test pass (AMD-008 P1, P2 tests); every pick explained by its terms. If the GAM only wins under one parameter setting, we say so and do not proceed on it |
| **B. Live behind an experiment** | The composer (or the subset that survived A) for learners with history, with a default-order holdout, an off switch and a reason per moved card | Registered experiment with a committed prediction and MDE; privacy review of every input; `settings` table; reason copy recorded as claims; QA; founder's deploy approval | analytics-steward, privacy-reviewer, backend-engineer (W-706, settings), platform-engineer (build), pedagogy-critic and fact-checker (reason copy), release-manager, founder | Accounts (EDD-008) or browser-only for anonymous; W-706 persisted events (aggregates for #4, #5); F-19 ratifying AMD-008 part P, **including a ruling that a published, versioned, hand-set GAM counts as "rules" under P1**; EDD-009 approved if `masteryOf()` is read | Experiment reaches its planned sample or a stop rule: #4 not lower than holdout beyond the harm threshold, #5 not lower, breadth within margin; keep or kill decided per term (needs, surprise, novelty) and recorded |
| **C. Per-category learner model, learning-maximising recommendations** | Concept-level knowledge state per category (extending EDD-009's mastery), and a recommendation that maximises expected mastery gain in a category (next concept whose prerequisites are mastered, spaced by forgetting) | Real recall data at volume; a calibration check (predicted recall vs observed); course maps (courses org decision, 2026-10-14) | learner-model-engineer, personalization-lead, analytics-steward, privacy-reviewer, category managers (graphs) | **A stored per-category knowledge state is an "ability score"** under gate P3.2: needs a new privacy ruling and, if fitted, an amendment to P1; EDD-009 approved; B's data | Offline: the model's predicted recall is better calibrated on held-out real data than a per-lesson average. Then its own experiment with a holdout, same guardrails as B |
| **D. Badges and points** | Rewards for verified learning | A definition of "learned" from C; PRD in growth-designer's scope; teen-mode read | **growth-designer** (owner), personalization-lead (what counts as learned), privacy-reviewer, pedagogy-critic, analytics-steward | C; AMD-008 part M (mastery, no streaks, no guilt); PRD-004 | Audit: no point or badge can be earned by raw activity (views, time, swipes), only by recall or mastery; its experiment shows recall does not fall against a no-badge arm |

---

## 4. Who else must be involved (board items added 2026-10-16)

| Id | Owner | Item | Blocked on founder? |
|---|---|---|---|
| W-1493 | personalization-lead | Phase A inputs: needs-v0 curves, 6 personas with latent ground truth, composer objective and constraints as JSON under company/personalization/model/ | No |
| W-1494 | learner-model-engineer | Port edp-engine detect/compose/evaluate to an offline simulator with an independent simulated learner; score policies on simulated recall, not need coverage | No (inputs from W-1493) |
| W-1495 | privacy-reviewer | Read the fingerprint inputs (§2.1): predictedCorrectly for ordering, masteryOf() as input, days-since-last-completion, per-lesson aggregates as dims, personas simulation-only | No |
| W-1496 | analytics-steward | Write the phase A pass criterion before the simulator runs, and a first MDE estimate for phase B at plausible traffic | No |
| W-1497 | research-lead | Evidence memo: does surprise/prediction error and novelty improve recall, and parameter ranges for the simulated learner | No |
| W-1498 | principal-engineer | Where lesson dims live (derived index vs meta.json fields, EDD-003) and where the engine code lives; pilot set probability + cs | Partly: if the founder's answer to Q2 is "new things inside lessons", scope grows and head-of-product joins |
| W-1499 | evaluation-steward | Rule for F-19: is a published, versioned, hand-set GAM a "rule" under AMD-008 P1; fitted curves need a further amendment | Yes (F-19 is the founder's ratification) |
| W-1500 | growth-designer | Badges and points: no work until phase C defines "learned" | **Yes** (Q5) |
| W-1501 | chief-of-staff | Put §6 questions to the founder (F-08 follow-up) | It is the founder ask itself |
| W-1492 (filed by chief-of-staff; my duplicate W-1502 closed) | chief-of-staff-ceo-office | Design the proposed team (§7) into the org and route each role to the founder (record: company/decisions/2026-10-16-founder-personalization-org.md) | **Yes** (each role needs founder approval) |

Ids are as the CLI assigned them; see `company/ops/board.json`.

---

## 5. Objections to the brief

| # | Objection | Owner of the answer | Proposed answer |
|---|---|---|---|
| O1 | **"Engagement" as an objective term is the Goodhart trap this team exists to avoid.** Any engagement term in the score is optimised, and what is optimised in a feed becomes time-on-feed. It also contradicts AMD-008 X1 and P2 as drafted. | founder (intent); evaluation-steward (AMD-008 text) | Engagement is a guardrail and an eligibility floor (#5 per lesson), reported and labelled; surprise and novelty are the scored terms and stay only while the experiment shows recall does not fall (§2.5). If the founder wants an engagement term, it goes through an amendment to X1 with this objection attached, and I would still argue against it |
| O2 | **The reference evaluation is circular** (`evaluate()` scores policies on the needs the adaptive policy optimises). A simulator built that way will tell us the GAM wins, always. | learner-model-engineer, analytics-steward | Independent simulated learner; score on simulated recall; ablations; a pass criterion written before running; sensitivity to simulator parameters. Simulator results can kill a design, never ship one |
| O3 | **Tuning from learner data with few learners.** Four needs × two terms × four or five breakpoints, plus composer weights, is roughly 50 to 80 free numbers. With launch traffic unknown, fitting them will overfit noise, and fitting makes it a learned model under P1. | analytics-steward (power), evaluation-steward (P1) | Hand edits with a written reason per change, EDP v3 style, reviewed against aggregate data; fitting only after the steward says the data can support it and an amendment allows it |
| O4 | **Hand-authored dims on ~1,000 lessons (2,000 planned)** will be inconsistent across 14 category managers and stale the day a lesson changes. | principal-engineer, head-of-product | Most dims already exist or are relational (§2.4). Hand-author one dim, on a pilot, with a 3-point scale; classifier with CM spot-checks to scale; replace with aggregate data as soon as it exists |
| O5 | **Cold start.** Most learners at launch have no history; the fingerprint is empty and personas cannot be inferred without profiling. The engine does nothing for them, and must say so. | head-of-product (cold-start order) | Dampener returns default order with the "not personalised" label (AMD-008 F4); stated subjects are the only day-one input. We do not guess a persona |
| O6 | **Personas invite profiling and stereotyping**, with learners as young as 13. | privacy-reviewer | Personas are simulation fixtures only; never assigned, stored, shown or keyed to demographics (§2.3) |
| O7 | **Gamification can buy activity instead of recall.** Points for "learning" drift to points for volume; badges can crowd out the reason to learn, and teens are the most exposed. | growth-designer | Phase D only after C defines "learned"; points for verified recall and mastery only; no streaks or guilt (AMD-008 M); its own experiment against a no-badge arm |
| O8 | **Surprise without readiness is confusion.** A lesson whose misconception is strong but whose prerequisites are missing may lower recall. | research-lead, pedagogy-critic | Surprise is multiplied by readiness (§2.4) and stretch lessons need prerequisites (§2.5 constraint 5); research-lead's memo can change the form |
| O9 | **Need coverage narrows the feed** (repair and build both follow what the learner already touched). | personalization-lead | Breadth is a detected need and a hard 1-in-3 floor; distinct domains is a guardrail |
| O10 | **Timing.** The founder's F-43 put personalization after the accounts milestone; First Light capacity is tight. | portfolio-manager / chief-of-staff | Phase A is offline, small, and touches no release path; B waits for accounts and W-706 as the draft said |
| O11 | **Lifehacks (200 lessons) has almost no prerequisite edges (15)**, so repair and build do nothing there. | cm-lifehacks | Out of the pilot; breadth and novelty still apply; edges added only if the CM sees value |

---

## 6. Questions back to the founder

1. **Engagement:** may engagement enter only as a guardrail (a lesson must keep learners to the reveal; never time, swipes or sessions), with surprise and novelty as the scored terms, kept only while recall does not fall? Or do you want an engagement term in the score itself, which needs AMD-008 X1 changed?
2. **"The demos need to have features":** do you mean data the composer reads (concept, level, prerequisites, how strong the misconception is), which mostly exists already, or new things inside the lessons (an easier and a harder variant, a "more like this" control, alternative hooks)? The second is builder and demo-standard work across 974 lessons.
3. **Who edits the curves:** you or us, in a Curves view like the EDP one (an internal tool we would have to build), or in a JSON file where every change is a decision record with a reason (v3 edits style)?
4. **"Tune from customer data":** hand edits checked against aggregate data, or curves fitted by an algorithm? The second is a learned model under AMD-008 P1, needs an amendment, and needs many more learners than launch will bring.
5. **Badges and points:** only for verified recall and mastery, after the per-category learner model exists (phase C), with no streaks? Or do you want something sooner?
6. **Sequencing:** may phase A (offline simulator on a pilot of probability and cs, no learner data, nothing in the release) start now, with phase B live only after the accounts milestone, as your F-43 implied?

### 6a. Mateo's best guesses (for the founder to ratify or correct)

The founder, 2026-10-16 (verbatim, relayed by the coordinator): "Give me his best geuss ti the questions and I will rectify". These are my picks, not decisions; each holds only once the founder ratifies it.

| Q | Best guess | Why (one line) | If the founder answers the other way |
|---|---|---|---|
| 1 Engagement | **Guardrail only.** Engagement enters as a per-lesson floor on prediction-to-reveal completion (#5) and as reported numbers; surprise and novelty are the scored terms, each kept only while the experiment shows recall does not fall. | A scored engagement term turns into time-on-feed, and AMD-008 X1 and P2 forbid it as drafted. | An engagement term in the score needs an amendment to X1/P2 through evaluation-steward with objection O1 attached, plus an extra guardrail arm (recall vs engagement trade-off) in analytics-steward's registration; phase B slips by that amendment |
| 2 "Features" | **Data the composer reads, not new in-lesson features.** Derived dims from meta.json and the curriculum, plus one new rated dim (`misconceptionStrength`) on the ~230-lesson probability + cs pilot. | It already exists on 974/974 lessons; in-lesson variants would be builder and demo-standard work across the whole catalog before we know the composer helps. | In-lesson features (easier/harder variants, "more like this", alternative hooks) become a head-of-product demo-standard change and a builder wave via the category managers; W-1498 widens to an EDD-003 variants design; phase A still runs but on fewer, richer pilot lessons |
| 3 Who edits curves | **Us, in a JSON file under company/personalization/model/, one decision record with a reason per change** (v3 edits style); a read-only curve viewer later if the founder wants to look. | It is replayable (AMD-008 P1 test) and needs no tool built before we know the curves matter. | An editable Curves view becomes a phase A build item for learner-model-engineer (or head-of-feed later), outside `src/` until reviewed; edits made in it still land as versioned JSON with a reason |
| 4 Tuning | **Hand edits checked against aggregate data** for phases A and B; algorithmic fitting only in phase C, after analytics-steward says the data supports it and an amendment to P1 allows it. | About 50 to 80 free numbers will overfit launch-sized data, and fitting is a learned model under P1. | Fitting from the start needs the P1 amendment now (W-1499 becomes urgent), a fitting pipeline and held-out validation owned by the applied scientist, and a privacy read of training data; phase B waits for enough learners |
| 5 Badges and points | **Only for verified recall and mastery, after phase C defines "learned", no streaks and nothing for time or volume.** | Rewards built before "learned" is defined reward activity, and teens are the most exposed. | An earlier version needs a growth-designer PRD now, reading EDD-009's mastery state as the interim "learned", with its own experiment against a no-badge arm and a teen-mode privacy read; W-1500 unblocks now |
| 6 Sequencing | **Yes: phase A starts now, offline, on the probability + cs pilot; phase B goes live only after the accounts milestone and W-706.** | Phase A needs no learner data and touches no release path; B needs persisted events to measure anything. | Personalization inside release 1 puts F-08 and F-19 on the critical path; the fast path's C4 assumption is wrong, and principal-engineer, release-manager and portfolio-manager re-plan First Light |

**What each guess unlocks if ratified:** Q1 → evaluation-steward drafts no engagement amendment; analytics-steward writes W-1496 with engagement as a guardrail. Q2 → principal-engineer (W-1498) designs a derived index; the probability and cs category managers rate the pilot; lesson-dims-owner stays a phase A role. Q3 → W-1493 (me) writes JSON curves with no tool build. Q4 → the applied scientist is a hand-edit role in A/B, and fitting waits for phase C. Q5 → growth-designer stays parked (W-1500) until C. Q6 → W-1493 to W-1497 start now, and Leonie stages approvals with the phase A roles first (applied-scientist-personalization, personalization-eval, lesson-dims-owner) and head-of-feed later (W-1492).

---

## 7. Proposed team

The founder, 2026-10-16 (verbatim, relayed by the coordinator): "Mateo will create his team, with eval, applied scientes, head of feed, etc, this org should scale".

**This is a proposal only.** Under the founder's org rule (`company/decisions/2026-10-16-founder-org-and-dispatch-rule.md`, rule 1) I propose; Leonie (chief-of-staff-ceo-office) designs it into the org under `company/ceo-office/org-change-process.md`; the founder approves each role before it exists. I have not edited `tools/org/roles.mjs`, `.claude/agents/` or `company/roles/`. Role ids below are proposals and may change in Leonie's design.

**Principle:** add a role only where phase A or B has work nobody owns today; give every new role a seam with an existing one, written as an objection below, so Leonie can decide whether to widen an existing role instead.

### 7.1 Roles

| Id (proposed) | Title | Mission (1 line) | In scope | Out of scope | Reports to | Hands what to whom | When |
|---|---|---|---|---|---|---|---|
| `personalization-lead` (exists) | Personalization Lead (Mateo) | Each learner gets the next lesson that helps them most, for reasons we can explain and measure, without trapping them in a bubble | The objective, needs vocabulary, phases, the published rule/curve list and its decision records, reason copy drafts, priorities for the team | Building in `src/`; ratifying anything; owning the feed surface | head-of-product | Curves, personas and objective → applied scientist and learner-model-engineer; rule list → head-of-product decision records; reason copy → pedagogy-critic, fact-checker | Now |
| `head-of-feed` | Head of Feed | The feed shows the right card next, fast, with a true reason and a working off switch | The **ordering contract** of the feed: the composer's interface (inputs, queue of 3, move threshold, due-revisits-first, cold-start default, off switch), the default order itself, latency budget for composing, the served-order log for replay (P1) | Writing the curves or the objective (personalization-lead, applied scientist); feed rendering, kit, `src/components/Feed.tsx` plumbing (platform-engineer); deciding whether the feed is personalised at all (head-of-product decision record 2026-10-12) | personalization-lead | Composer interface spec → platform-engineer (build) and principal-engineer (tier-2 review); served-order log spec → privacy-reviewer, analytics-steward | **Later (phase B)**. In phase A the composer runs only in the simulator |
| `applied-scientist-personalization` | Applied Scientist, Personalization | The curves say what the evidence says, and every change to them has a reason someone can check | Need-detection shape curves, composer weights, persona latent parameters, curve edits with written reasons (v3 style), later the fitting of curves from aggregate data (only after an amendment allows it), sensitivity analysis | The simulator's code (learner-model-engineer), the pass criterion and experiment registration (analytics-steward), literature reviews (research-lead's team), any stored per-learner output | personalization-lead | Curve sets with versions → learner-model-engineer (simulator), head-of-feed (live); sensitivity reports → personalization-eval; questions on learning science → research-lead | **Phase A** (one) |
| `personalization-eval` | Personalization Evaluator | A personalization policy is judged against an independent learner and a holdout, never against its own assumptions | **Running** the offline policy comparison (simulator ablations, sensitivity, circularity checks, replay and forbidden-input tests) and the online readout of personalization experiments against the criterion the steward froze; reporting both in the WBR | **Writing the measure or the committed prediction** (analytics-steward keeps that, so the judge is not chosen by the team); the QA contract, gates and amendments (evaluation-steward); deciding keep or kill (personalization-lead with head-of-product, on the evaluator's readout) | evaluation-steward (dotted line to personalization-lead for priorities), **so the team does not grade itself** | Readouts → personalization-lead, head-of-product, WBR; disagreements with the frozen criterion → analytics-steward | **Phase A** (the offline comparison is the main phase A output) |
| `lesson-dims-owner` | Lesson Features Owner | Every lesson exposes the features the composer needs, consistently, without 14 managers hand-scoring 2,000 lessons | The dims schema (§2.4), the derived index from meta.json and curriculum, the `misconceptionStrength` rating protocol (CM pilot → classifier with CM spot-checks → aggregate data), coverage reports (e.g. Life Hacks prerequisite gap) | Concepts and prerequisite edges (category managers own the maps); meta.json schema and storage (principal-engineer, EDD-003); the demo standard (head-of-product); fact-checking | personalization-lead | Dims index → learner-model-engineer, applied scientist; rating protocol → category managers via their managers; schema change requests → principal-engineer | **Phase A** (pilot of ~230 lessons), grows in B |
| `learner-model-engineer` (exists, Ifeoma) | Learner Model Engineer | (unchanged) A small, explainable model of what each learner knows | Unchanged, plus: the engine port and the offline simulator (W-1494), the composer code in `src/lib/learner/**` once approved, phase C per-category knowledge state extending EDD-009 | Curves and weights (applied scientist); judging the policies it builds (personalization-eval) | personalization-lead (team), engineering review by principal-engineer | Simulator and engine → personalization-eval, applied scientist; composer code → head-of-feed interface, platform-engineer integration | Now |
| `growth-designer` (exists) | Growth Designer | (unchanged) Rewards point at remembering, not at taps | Badges and points (phase D), using the learner model's definition of "learned" | Defining "learned" (learner-model-engineer, personalization-lead); ordering the feed | **unchanged** (stays where it reports today; works with this team, not in it) | PRD → privacy-reviewer, analytics-steward; asks "what counts as learned" → personalization-lead | **Later (phase D)** |

Not proposed: a separate privacy role (privacy-reviewer reads every input; the team asks), a separate experiments role (analytics-steward), a separate research role (research-lead routes learning-science questions to research scientists).

**Phase A needs only:** personalization-lead, learner-model-engineer, one applied scientist, personalization-eval, lesson-dims-owner. That is **three new roles** for phase A; head-of-feed waits for phase B.

### 7.2 How it scales

Four sub-teams, each with one point of contact so the chief of staff's oversight stays at the manager level (org rule 3): **Feed** (head-of-feed; later a feed engineer if the composer's serving path outgrows platform-engineer's time), **Learner Model** (learner-model-engineer; one per category cluster once phase C has per-category models), **Science** (applied scientists), **Eval** (personalization-eval; dotted to evaluation-steward). Lesson Features sits with Science until dims become data-derived, then folds into Learner Model. What splits as volume grows: applied scientists split **by need family** first (repair/build, which read the prerequisite graph; breadth/novelty/surprise, which read catalog structure) because their curves and evidence differ; then **by category cluster** (STEM with dense graphs; everyday and humanities with sparse ones, such as Life Hacks at 15 edges in 200 lessons) when per-category learner models arrive in phase C. Learner Model splits by category cluster at the same moment. Eval splits offline (simulator) from online (experiments) only when two experiments run at once. Feed does not split: there is one feed and one ordering contract. Personalization-lead stays one role; if the team passes about six agents, Leonie should decide whether a manager layer is needed rather than this role growing.

### 7.3 Overlaps with existing roles (objections for Leonie)

| # | Overlap | Proposed answer | Leonie decides |
|---|---|---|---|
| T1 | **head-of-feed vs platform-engineer**: platform-engineer owns `src/components` and so `Feed.tsx`; head-of-product owns the "feed is not personalised" decision | head-of-feed owns the ordering contract (a spec and its tests), not the code; platform-engineer keeps the code and builds to the contract; head-of-product keeps the product decision. Alternative: no new role; widen learner-model-engineer to own the contract | Whether a contract owner without code is a real role or a seam to give learner-model-engineer |
| T2 | **personalization-eval vs analytics-steward**: both near experiments | Steward writes the measure, the committed prediction and the harm threshold; the evaluator runs the comparison and reads out against them. The evaluator never edits a registration | Whether the steward's capacity can absorb the readouts instead |
| T3 | **personalization-eval vs evaluation-steward**: independence of judges is the steward's mission | Report to evaluation-steward, not to me, so the team that builds the policy does not own its judge. Alternative: run the offline comparison as a quality-lane task with no new role | Reporting line and whether it is a role or a recurring task |
| T4 | **applied scientist vs learner-model-engineer**: both touch the model | Scientist owns numbers (curves, weights, parameters) and their reasons; engineer owns code, determinism, tests and the simulator. Same split as EDP: `edp-engine.js` (code) vs `PROBLEM_SHAPES`, `PAGE_EDITS_V3` (numbers) | Whether phase A's volume justifies two roles or one |
| T5 | **applied scientist vs research-lead / research-scientist** | Research answers "what does the literature say about surprise and recall" (W-1497); the scientist turns that into curve shapes and simulator parameters. The scientist does no literature review | Confirm the boundary |
| T6 | **lesson-dims-owner vs category managers and principal-engineer**: CMs own concepts and edges; principal-engineer owns meta.json schema and storage (EDD-003); head-of-product owns the demo standard | The dims owner owns only the dims schema, the derived index and the rating protocol; asks CMs through their managers; files schema changes to principal-engineer. Alternative: a part of learner-model-engineer's scope | Whether this is a role or a workstream |
| T7 | **growth-designer's current scope lists "recall-based streaks"**, while AMD-008 part M (proposed) says no streaks | Not mine to settle; flagged because phase D builds on it | Route to growth-designer and head-of-product |
| T8 | **Reporting line**: this role reports to head-of-product; a five-to-eight agent team under it changes head-of-product's span | Leonie to decide whether personalization becomes its own lane in the POC map (the interim map has no personalization lane) | POC map |

## Objections log for this response

Raised against this response so far: none. Objections from the draft brief carried here: draft O1 (narrower than the founder means) is **answered** by the founder's brief; draft O2 (recall gamed by easy lessons) is carried into §2.5 (all-lessons measure, readiness) and remains open to analytics-steward; draft O3 (underpowered experiment) is carried as O3 here; draft O5 (1-in-3 is a guess) is carried in §2.5 constraint 4; draft O6 (sparse prerequisite edges) is **answered by count**: 614 of 974 lessons carry edges, the gap is Life Hacks (O11).
