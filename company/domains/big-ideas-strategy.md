# Big Ideas: content strategy

owner: cm-big-ideas (Dmitri) · date: 2026-10-14 · status: **proposed**. head-of-product reviews (board). The founder decides the asks in section 10. The strand managers (Lucia, science; Babajide, society; Signe, mind) may reorder within their strands, and must say why in their briefs files.
builds on: charter `company/domains/big-ideas.md` · map `content/curriculum/big-ideas.json` · briefs `company/domains/briefs/big-ideas.md` · decision `company/decisions/2026-10-14-books-and-big-ideas.md` · plan `company/product/verticals/plan-to-2000.md` · gate `company/decisions/2026-10-14-w556-wave-gate.md`
checks: `node company/domains/briefs/checks/big-ideas-cycle1-check.mjs` (briefs 1-12) and `node company/domains/briefs/checks/big-ideas-strategy-wave1-check.mjs` (briefs 13-24, including their recall answers). Both pass as of 2026-10-14.
state today: 0 published, 4 drafts (two-four-six-rule, earth-history-in-a-day, ten-times-taller-giant, noise-draws-dunning-kruger), and none of the 4 has a review yet. 8 cycle-1 briefs are unbuilt. The map has 59 concepts.

## Where this departs from its inputs

| # | Input says | This strategy says | Why |
|---|---|---|---|
| D1 | Plan: Big Ideas target **170** (K 30, L 40, M 30, rest N-Q) | **120 as a ceiling. 72 committed through Wave M** (24 per wave). The other 48 are released only on learner data. | Review is the bottleneck, not build (section 4). Big Ideas claims need sources far more often than subject claims. And honest big ideas are rarer than subject concepts: 68 pass the bar today. |
| D2 | Plan: Wave K pilot of 30 | **24 in two halves.** K1 is the 12 cycle-1 briefs (4 already drafts). K2 is strategy wave 1, which opens only after **5 lessons pass Domain Launch Review** | A category's first 5 lessons tell us whether it works (the plan's own rationale). 30 lessons in review with none launched would spend the review we are short of. |
| D3 | Map: 60 concepts, 20 per strand | **59 now** (4 removed because a subject lesson already teaches them, 3 added). **68 ideas ranked in six waves.** History and technology is added as a **tag, not a fourth strand or role** | A keyword search found that subject lessons already teach 4 mapped concepts and 3 candidates (section 2.4). A new strand role would sit idle (the CEO office's own failure mode). |
| D4 | Decision and charter: "strong form sourced or flagged, plus where it stops working" | Kept, and made stricter in three ways: (a) **show the limit**: where possible, a preset puts the limit on the stage instead of a told sentence; (b) **at most one held citation per reveal**, with every other source sentence marked "cut if not checkable"; (c) **a shared verdict vocabulary** with Books (section 8.2) | A told limit is the sentence learners skip, and told-vs-shown already counts it as a revise. Held citations are the main publish blocker (W-583). Two categories that grade the same literature need the same words for their verdicts. |
| D5 | Charter: one lesson per idea until every demand-3 idea has one | Kept. Also: a second lesson on an idea exists only as a step on a **named path** (section 3.2), and only after the first lesson has a launch verdict | This stops depth sprawl and makes every second lesson earn its place in a sequence |
| D6 | Charter "subject first": search the curricula and run overlap.mjs | Add a **text search of every lesson's title, misconception and objective** before briefing, because concept ids miss duplicates | That search found math/one-shy-rioter-stops-the-riot (Granovetter, published) and probability/heads-after-heads-trap (the hot-hand bias, published), both of which I was about to brief. Neither shares a concept id with Big Ideas. |
| D7 | Plan: about 30-40% of Big Ideas lessons held on sources | **Design target: ≤ 15% of each lesson's claims held**, by brief design: derivation first, plus the one-held-citation rule | If we accept 30-40%, the category clears review only when the web does |
| D8 | Decision: about a third of the first 24 briefs contested, by design | **About a quarter of each wave** is contested or oversold, and each one is sourced on both sides. **The Domain Launch Review five are uncontested and derivation-checked** | The first five judge the format, not our handling of disputes. A dispute in the five would hold the launch hostage to W-583 |

## 1. Audience and promise

**Audience** (charter, unchanged): curious adults and older students who want the "huh" moment, and want it right. Many arrive from podcasts and popular-science books, so they often bring the oversold version.

**What a big idea is here.** A subject lesson teaches a mechanism inside a field: *why* a positive test can mislead. A big idea is a **lens**: one pattern that changes your prediction in situations that look unrelated. The bar has three parts, and a concept needs all three:
1. **Transfer.** It changes a prediction in at least **three unrelated domains**. The brief names them, and the recall question uses one the stage did not show.
2. **Overturn.** There is a default view that predicts wrongly, and the learner can hold it and lose a bet to it.
3. **Boundary.** It has a known place where it stops working, and we can state it with support.

**The promise to the learner:** *"In sixty seconds you will see one pattern that changes how you read many things, where it comes from, and where it stops."* We do not promise that the idea is true everywhere, and we do not promise the popular version.

**The difference from a subject lesson, made visible.** A Big Ideas lesson (a) names its subject doorway (prerequisite or `also`), (b) has a transfer recall rather than a same-stage recall, and (c) ends on the boundary. If a learner-evaluator cannot tell a Big Ideas lesson from the subject lesson it cites, that is a finding (section 7 kill rule 2).

## 2. Idea selection

### 2.1 Criteria (in rank order; the charter's order with two additions)
1. **Demand** (1-3, our estimate. It is not learner data).
2. **Size of the shift**: how many domains it changes (transfer ≥ 3 is the floor).
3. **Demo-able** (2.2).
4. **Verification class** (section 5): D (derivation or simulation) > P (a public-domain or defined-constant source) > H (a held source). *New:* the first two waves are D-first so they can publish without W-583.
5. **Distinct**: what it adds over its nearest subject and Books lessons (section 8). If it adds nothing, it is not ours (2.4).
6. **Balance**: each wave covers all strands, and no strand gets more than half.

### 2.2 What makes an idea demo-able
An idea is demo-able when **one control changes one thing and the idea's prediction visibly diverges from the default view's**, on one phone screen, within ≤ 6 controls and ≤ 25 words of stage text. In practice:
- **Something on the stage stands for the mechanism** (told-vs-shown). "Paradigm shifts" fails this today. So do "Chesterton's fence" and "Moravec's paradox": nothing on a stage stands for them, so they wait at the bottom of the list (wave BI-6) until someone finds a stage.
- **The answer is checkable**: by derivation, by a seeded simulation, by what the learner's own eyes report on the screen (the same-grey illusion), or by what a cited study found. A thought experiment's prediction is about what the argument or a stated rule implies, never about an opinion.
- **The limit can be reached**: the best briefs have a preset that breaks the idea (shared bias in Fermi estimates, copied witnesses, a materials floor, ageing lifetimes).
- **Presets, not sliders, for milestones**, in DOM order. QA presses each control once (demo-standard), so every milestone, including the question's own case, must be one press away.

### 2.3 Ranked list: 68 ideas in six waves
Strand: S science · E society and economics · M mind and philosophy · `ht` history-and-technology tag. Verification: D / P / H as in 2.1. ⚑ marks a contested, oversold or failed idea (2.5). ★ marks a new concept (added to the map only when its brief is written; the BI-2 ones are added now).

**BI-1: cycle 1 (briefs 1-12; Wave K, first half).** S: deep-time (H: dates), square-cube-giants (D), chaos-butterfly (D), controlled-experiment (D) · E: jevons-paradox (D+H), demographic-transition (D+H), price-signals (D+P), baumol-cost-disease (D) · M: falsification-2-4-6 (D+H), dunning-kruger-artifact ⚑ (D), perception-inference-shadow (D, seen on screen), false-belief-theory-of-mind ⚑ (H: infant replication)

**BI-2: strategy wave 1 (briefs 13-24; Wave K, second half).** S: cumulative-selection (D), heliocentric-retrograde (D), expanding-universe (D), fermi-estimation (D) · E: pareto-80-20 ⚑ (D), wrights-law ★ `ht` (D), metcalfe-oversold ★ ⚑ `ht` (D), lindy-effect ⚑ `ht` (D) · M: extraordinary-evidence (D), most-findings-false ★ ⚑ (D), veil-of-ignorance (D, sensitive), newcombs-problem (D)

**BI-3 (ranks 25-36; Wave L).** S: most-species-extinct (D: turnover arithmetic), atom-mostly-empty (D+H), light-delay-past (D: defined constants), germ-theory-pump (H: Snow's 1855 tables) · E: perverse-incentives ⚑ (D+H: the cobra story is undocumented; Hanoi rat tails are documented), costly-signalling ⚑ (D: the model; the real-world share is contested), positional-arms-race (D), survivors-look-better-made ★ `ht` (D) · M: sorites-heap (D: logic), change-blindness (H; accessibility review for flicker), memory-reconstructive ⚑ (H), blind-spot-filled-in ★ (seen on screen; accessibility review)

**BI-4 (ranks 37-48; Wave L).** S: entropy-arrow-of-time (D; must differ from chemistry/why-gas-spreads by showing small-number recurrence), emergence-simple-rules (D; ABM format-gated), powers-of-ten (D+H), measurement-uncertainty (D) · E: malthusian-trap ⚑ (D+H; Books boundary), moral-hazard (D), division-of-labour (D+P: Smith's pin factory), risk-compensation ⚑ (H) · M: hedonic-adaptation ⚑ (H: the lottery study is oversold), counterfactual-causation (D), all-models-wrong (D), ship-of-theseus (argument)

**BI-5 (ranks 49-60; Wave M).** S: kin-selection ★ (D: Hamilton's rule), common-descent-tree (D), placebo-natural-history ★ ⚑ (D+H; method, not advice), genetic-code-combinatorics (D) · E: condorcet-cycle ★ (D; sensitive: voting), creative-destruction (H; Books boundary), principal-agent (D), peter-principle ★ ⚑ (D+H) · M: trolley-problem (H: what the cited survey found), cognitive-dissonance ⚑ (H: 1959 study, replication), observer-selection ★ ⚑ (D; contested philosophy), paradigm-shift (needs a stage, or it is cut)

**BI-6 (ranks 61-68; Wave M or later; a holding pen, re-cut at cycle-planning).** S: energy-conserved (likely offered to cm-physics) · E: lump-of-labour ⚑ (H), rent-seeking (D), ostrom-commons-governed (H), war-sizes-heavy-tail ★ ⚑ `ht` (D+H; sensitive), cumulative-culture-ratchet ★ ⚑ `ht` (H) · M: moravec-paradox, chestertons-fence. The last two have no checkable stage yet: if none is found by Wave M, they leave the map.

Count: 56 existing concepts + 12 new ideas = 68. This wave is E-heavy (5 of 8), and gets rebalanced when it is briefed.

### 2.4 What we do not teach, and who does (keeps the map honest)
| Idea | Taught by | What happened |
|---|---|---|
| Threshold collective action (Granovetter) | math/one-shy-rioter-stops-the-riot (published) | **Removed** from the map: the same stage already exists |
| Randomised assignment | probability/the-doctor-picks-the-patients (draft) | **Removed.** Brief 9's limit links to it |
| Path dependence and lock-in | probability/same-songs-different-hits (review) | **Removed.** The QWERTY story is contested anyway |
| Occam's razor | ai/overfitting + probability/which-coin-is-it | **Removed.** The Bayesian Occam factor *is* which-coin-is-it |
| Hot-hand bias (Miller-Sanjurjo) | probability/heads-after-heads-trap (published) | Not added. A doorway from extraordinary-evidence's path |
| Coastline paradox | geography/coastline-ruler (published) | Not added |
| Fisher's sex ratio | life/who-has-grandchildren (published) | Not added. kin-selection must differ from it |
| Wisdom of crowds, anchoring, loss aversion, defaults, decoys, 10,000 hours, growth mindset, 1% a day, disruption, bottlenecks | Book Summaries | Not added (section 8.2 rule 3) |

### 2.5 Famous ideas that failed, are oversold, or are contested: how we teach them
Every ⚑ lesson carries the **triple** as three separate claims: **the strong form** (what was claimed, primary source), **the evidence** (replication, meta-analysis or review, with a verdict from 8.2's vocabulary), and **where it stops**. If either side of a contested claim cannot be sourced, we cut both names and keep only what derivation supports.

| Idea | Popular strong form | What the evidence supports (verdict, drafter's reading; fact-checker may overturn) | How we teach it |
|---|---|---|---|
| Dunning-Kruger | "The incompetent are the most overconfident" | Contested: much of the chart is regression plus a better-than-average shift | The chart drawn from pure noise (brief 4) |
| 80/20 | "A law of nature" | It is one setting of one distribution, and many claimed power laws fail statistical tests | Nesting, then other tails (brief 16) |
| Metcalfe's law | "Value ∝ n²" | Contested: n log n against n² fits | Both sides named, each with a source (brief 22) |
| Lindy effect | "Old things last longer" | Untested as a general law; it is true only under heavy tails | Ageing as the counter-preset (brief 23) |
| "Most findings are false" | "Science is broken" | The arithmetic holds; the real share differs by field and is disputed | Base rate and power as two dials (brief 19) |
| Hedonic adaptation | "Lottery winners are no happier than paraplegics" | Oversold: a small 1978 sample; adaptation to some events is incomplete | A failure of the finding, sourced (BI-4) |
| Cognitive dissonance ($1/$20) | "Paid less, liked it more" | Replication record mixed (to source) | Taught as the finding plus its record, or not taught |
| Infant false belief | "Babies read minds" | The looking-time studies replicate poorly | The limit sentence in brief 12 |
| Cobra effect | "Delhi's cobra bounty bred cobras" | The story is undocumented, while the Hanoi rat-tail bounty is documented | The documented case, with the famous one flagged |
| Risk compensation | "Seatbelts cause crashes" | Contested, and the size of the effect differs by setting | Both sides named, or not taught |
| Power posing, ego depletion, marshmallow as destiny | | Failed or much weaker than claimed | **Refused as ideas.** They may appear only as failures inside a method lesson (charter) |

## 3. Lesson shape

### 3.1 Which format
- **Single card** (the default, about 60% of each wave): one mechanism and one picture, with a preset that shows the limit.
- **Simulation run** (seeded and disclosed): for chance and populations (cumulative selection, Fermi errors, Dunning-Kruger noise).
- **Storyboard or scrub, and before/after**: for frames and processes (retrograde loops, the raisin loaf).
- **Multi-card sequence** (`src/kit/sequence.tsx`, on main; EDD-006). **Not used by any Big Ideas brief until W-604's probe tool passes** and the design lead approves a non-reference lesson. Every brief carries a "Multi-card later" line, so a rebuild needs no new brief. When it opens, multi-card is for ideas whose **limit needs its own picture** (card 1 the idea, card 2 the counter-case, card 3 the evidence), not for stretching a single-card idea. No per-card predict (a contract amendment).
- **Debunk**: not used until the design lead specs it (decision record, design-lead consultation). Until then ⚑ lessons use single card with the triple in the claims.
- **Agent-based**: only after the Schelling reference passes design review (formats.md). emergence-simple-rules waits for it.

### 3.2 When one idea gets several lessons, and how they connect
A second lesson exists **only as a step on a named path**, after the first has a launch verdict, and only when (charter rule) every demand-3 idea already has one. A path is 3-5 lessons: **a subject doorway → the Big Idea → a counter-case or a famous misuse**. Named paths (Personalization builds them, and these are our proposals):
1. **Weighing evidence**: probability/base-rates → how-many-witnesses (15) → most-positives-could-be-false (19) → probability/heads-after-heads-trap (a famous finding's own bias) → noise-draws-dunning-kruger (4).
2. **Small rules, big crowds**: math/one-shy-rioter-stops-the-riot → economics/mild-preferences-sharp-divides (Schelling) → probability/same-songs-different-hits → economics/below-critical-mass (network effects) → network-value-not-squared (22).
3. **Heavy tails in the world**: probability/ten-times-links-hundred-times-rarer → top-fifth-of-the-top-fifth (16) → old-books-outlast-new (23) → chemistry/half-life (the memoryless contrast) → war-sizes-heavy-tail (BI-6, sensitive).
4. **Change the frame**: earth-history-in-a-day (2) → mars-loops-backwards (14) → raisins-see-no-centre (17) → ten-times-taller-giant (3).
5. **How we know**: two-four-six-rule (1) → colds-clear-without-the-pill (9) → probability/the-doctor-picks-the-patients → most-positives-could-be-false (19).
6. **Choosing well**: probability/capped-doubling-game → same-veil-two-choices (21) → economics/two-suspects-payoff → one-box-or-two (24).

### 3.3 Doorways into subject lessons
Every Big Ideas lesson names one subject lesson as its doorway (prerequisite or `also`), so a learner who enjoyed the lens can go deeper. Today's doorway map: regression to the mean (probability/praise-then-slump) ← Dunning-Kruger, control group · base rates (probability/base-rates) ← witnesses, published findings · Schelling (economics/mild-preferences-sharp-divides) ← path 2 · network effects (economics/below-critical-mass) ← Metcalfe · price elasticity (economics/salt-and-concert-tickets) ← Jevons · volume scaling (math/cube-the-size) ← square-cube · heavy tails (probability/average-that-never-settles) ← Lindy, 80/20 · expected value (probability/capped-doubling-game) ← veil, Newcomb · orbits (physics/higher-orbit-slower) ← retrograde. **A doorway is a link, not a re-teach**: the Big Ideas stage never rebuilds the subject stage.

## 4. Target and pacing

**Why 120 and not 170.** (a) Ideas: 68 pass the bar today, plus about 10 path second-lessons, makes about 78. 170 would need concepts that fail transfer, which is the "taxonomy department" failure. (b) Review: the binding constraint is borrowed-mind reviews and fact-checks, not builds (plan section 5: 192 lessons blocked on learner review; the W-556 gate is queue ≤ 160 across all categories; today it is 319). (c) Sources: even at the ≤ 15% design target, a Big Ideas lesson holds about 1 claim on W-583, against about 0.5 for a subject lesson.

**Committed pacing (all of it inside W-556 and the plan's wave order):**
| Wave | Big Ideas lessons | Opens when |
|---|---|---|
| K1 | 12 (cycle 1: 4 drafted + 8) | The W-556 gate opens (cycle-1 briefs are the Wave K pilot per portfolio-manager's W-537 triage). **Ask:** an exception for 2 briefs (one-ten-thousandth-apart, same-grey-in-shadow) so the DLR five can form while the gate is shut |
| K2 | 12 (strategy wave 1, briefs 13-24) | K1 open **and** 5 Big Ideas lessons have passed Domain Launch Review |
| L | 24 (BI-3, BI-4) | The plan's L gate, **and** Big Ideas K first-review launch rate ≥ 50% |
| M | 24 (BI-5, BI-6 + path seconds) | The plan's M gate (first deploy plus an EXP-002 result) |
| N-Q | up to 48 | Learner data: Big Ideas commit rate and 7-day transfer recall at or above the feed median (section 7) |

**Caps.** At most **12 Big Ideas lessons in draft + review at once** (4 today), the way Books caps lessons per book. At most **3 ⚑ lessons in review at once**. A brief may be written early (CMs out-write review 3×, plan section 5), but a Wave K brief always carries its skip line.

**The Domain Launch Review five** (uncontested, derivation-checked, one per lens type): two-four-six-rule, ten-times-taller-giant, one-ten-thousandth-apart, same-grey-in-shadow, and noise-draws-dunning-kruger. The last is contested, so I would swap it for colds-clear-without-the-pill if head-of-product prefers the D8 rule strictly. earth-history-in-a-day has 5 source claims (dates), so it is likely held, and it is not in the five.

**Already done to honour the gate:** skip lines in `company/ops/brief-skips.json` for the 12 strategy-wave-1 briefs and the 8 unbuilt cycle-1 briefs. The 4 drafts were built before the W-537 re-check that decision objection 4 required. W-537 covers them now, and nothing is retracted.

## 5. Sources and verification
The host cannot open journal, publisher or library sites (W-583). So every claim is one of:
1. **Derivation or simulation (D).** Checked in node in `company/domains/briefs/checks/`. Seeds are disclosed. Examples: 27^18, retrograde days, Bayes odds, the Pareto share, Wright's 0.8^log2, PPV, the veil rules, n log n, the Lindy remaining life, the Newcomb break-even. **The lesson must teach with D claims alone.**
2. **Model (M).** A choice we made (lifespans normal with mean 80, the 1/k contact values, the town's elasticity). It is labelled on the stage and in meta.json, never presented as a fact about the world.
3. **Observation on the screen.** The learner's own sampler reads two equal greys. Code is the source.
4. **Public-domain or defined source (P).** Jevons 1865, Hume 1748, Galileo 1638, Smith 1776, the IAU-defined AU. These are still unverified until the fact-checker opens them, but cheaper when a session can.
5. **Held citation (H).** Papers and modern books. **Rules:** at most one H sentence in a reveal; every other H sentence is marked "cut if not checkable", with fallback wording written in the brief; a ⚑ lesson's two sides are both H, so if one side cannot be checked, both names go and only "contested" plus the D content stays.

**What we hold until a source is available:** dates of events (deep time), real-world magnitudes (rebound sizes, learning rates for solar, predictability limits), replication records (every ⚑ in the mind strand), and survey results (the trolley problem, PhilPapers). **What we never hold the lesson for:** the idea itself. If the idea needs an H claim to make sense, it moves down the list (germ-theory-pump sits in BI-3 for this reason).

**Budget per wave:** at most 12 H claims across 12 lessons (≤ 1 per lesson on the learner path). That is about the plan's 19 held per 160-lesson wave, scaled to our share.

## 6. Sensitive and contested topics

**Classes that trigger a route:** economic policy (inequality, tax, minimum wage, immigration), demography (fertility and population by country or group), voting and political philosophy (Rawls, Condorcet), religion (Hume on miracles, cumulative selection's "design"), group differences (IQ, sex, ethnicity), mental health and wellbeing claims (hedonic adaptation), war and violence (war sizes).

**Route (each step is written down; nothing is "noted"):**
1. **Brief:** the CM marks "Review route" and the class. The brief carries no policy conclusion, no real country ranked, and no group compared.
2. **research-lead**, *before build*, for every ⚑ and every sensitive class: a literature map in `company/research/` (in scope for that role) stating the strong form, both sides with sources, and "we don't know" where that is true. The brief's triple must match the map.
3. **cultural-reviewer**, *before build* (on the brief) and *before publish* (on the walkthrough). **Scope gap:** that role's scope today is locale variants only (`company/reviews/<slug>/<date>-culture-<locale>.md`). **Ask to head-of-product:** extend it to source-language Big Ideas lessons in a sensitive class, recorded as `culture-en`. Until that is answered, sensitive briefs (21, and BI-3 onwards where marked) stay unclaimed, even after the gate opens.
4. **fact-checker** as usual. A ⚑ claim whose verdict is overturned goes back to research-lead, not to the builder.

**What we refuse** (adds to the charter's refuse list, which is unchanged):
- Group-difference "big ideas" (heritability of IQ by group, sex differences in ability, "national character"). Our stages cannot carry the evidence honestly.
- Any reveal that states which society, policy or party is fair, right or better, including "efficiency standards don't work", "minimum wages kill jobs" and "inequality is natural (80/20)".
- Trend claims about violence, crime or migration presented as settled (war-sizes-heavy-tail may teach only that a lull is hard to detect in a heavy tail, with both sides of the dispute).
- Wellbeing or health advice drawn from mind lessons ("you'll adapt, so don't worry").
- Religion as a conclusion: lessons teach the argument or the mechanism, never whether a belief is true.

## 7. Quality guards, measures of success and kill criteria

**Guards (each one checkable on disk):**
- Every brief: a format line, preset buttons in DOM order, labels ≥ 10 px, a reveal draft ≤ 90 words (counted by script), claims split by support, a transfer recall with its answer in the check script, and a review route.
- A text search of titles, misconceptions and objectives across `src/demos/` before every brief (D6), plus `node tools/overlap.mjs`. The brief records the nearest lesson in each category, including Books.
- The strand balance and the 12 / 3 in-flight caps (section 4).
- Borrowed-mind reviews are quality checks. **They are never learning evidence**, and they never move this category's budget.

**Measures, before deploy (quality only):** DLR pass for the five; first-review launch rate (target ≥ 50%); the share of claims held (target ≤ 15%); the rate at which the fact-checker overturns a ⚑ verdict (target ≤ 1 in 5, the decision's "would be wrong if" test); and "can't tell it from the subject lesson" findings by learner-evaluators.

**Measures, after the first deploy (the only evidence of value):** commit rate; **7-day recall on the transfer question** against the feed median; doorway follow-through (the share who open the linked subject lesson; analytics-steward to say whether the event exists); path completion.

**Kill and stop rules:**
1. **Category.** If, 60 days after deploy, transfer recall is more than 10 points below the feed median **and** path completion is under 15%, stop new briefs and take a re-scope to head-of-product: merge the strong lessons into their subject categories and retire the rest.
2. **Identity.** If learner-evaluators cannot tell a Big Ideas lesson from its subject doorway in 2 of the first 5 reviews, stop at the five and rewrite the promise (section 1) before any K2 build.
3. **Verification.** If, after the first web-capable fact-check session, more than 1 in 5 ⚑ verdicts are overturned, ⚑ briefs need a researcher pass before writing, and BI-3's ⚑ items wait.
4. **Lesson.** Retire, or cut the sentence, when a held claim on the learner path stays unverified for two waves, when its "where it stops" claim fails fact-check with no fallback, or when its recall is 15 points below the category median after 60 days.
5. **Idea.** A concept that has no checkable stage by Wave M leaves the map (moravec-paradox, chestertons-fence, paradigm-shift are on notice).

## 8. Overlap

### 8.1 With subject categories
The charter's subject-first rule stands, plus D6's text search. A Big Ideas brief uses the subject lesson as its doorway and teaches the **shift in view and the boundary**. If the stage would be the same picture with the same numbers, the idea goes to the subject's CM (2.4). Placement disputes go first to the two CMs, then to head-of-product (the decision record's rule).

### 8.2 Shared boundary: Big Ideas and Book Summaries
*Written for both strategies to cite. Proposed by cm-big-ideas on 2026-10-14. **cm-books has not yet co-signed it** (board item). Until cm-books does, it binds Big Ideas only.*

1. **Unit.** Books teaches *what one book argues, and whether it holds up*, citing a chapter. Big Ideas teaches *an idea as the literature supports it*, independent of any one book.
2. **One stage per mechanism and case.** Across the two categories, no two lessons share the same mechanism on the same case. The second category links to the first (`also`, or a `works` reference) instead of rebuilding it.
3. **Who owns it.** If the idea is **identified with one book** (bottlenecks/Goldratt, Brooks's law, disruption/Christensen, 10,000 hours, 1% a day, growth mindset, anchoring, loss aversion, defaults, decoys, silent evidence, the turkey), **Books owns it**, and Big Ideas does not brief it. If the idea **predates any one book, or belongs to no book** (Jevons, Malthus, the demographic transition, falsification, survivorship, chaos, price signals), **Big Ideas owns the mechanism**. The Books lesson then teaches *that book's* claim and verdict on a different stage, and names the Big Idea as a prerequisite.
4. **Named pairs today:**
   - Books fact-straight-line (Rosling) ↔ BI demographic-transition. BI owns the birth-death lag model. Books teaches Rosling's "bending to a peak" claim from the projection, not from the lag model.
   - Books sapiens-agriculture-trap ↔ BI malthusian-trap. BI owns the Malthus mechanism. Books teaches Harari's "harder lives" claim and its contested verdict.
   - Books innovators-overshoot-crossing ↔ BI creative-destruction. Books owns disruption. BI's lesson is firm turnover and may not use a crossing-curves stage.
   - Books wnf-critical-junctures ↔ (removed) path-dependence. Books owns the institutional claim, and probability/same-songs-different-hits is the doorway.
   - Books lean-mvp-learning ↔ BI falsification-2-4-6. BI owns falsification. Books teaches Ries's MVP and may not use the 2-4-6 task.
   - Books swan-silent-evidence ↔ BI survivors-look-better-made. Books owns Taleb's argument and cases. BI's lesson is the "old things were built better" lens on buildings and objects, a different case.
   - Books money-tails-drive-everything and zero-power-law-returns ↔ BI pareto-80-20. Books owns investment returns. BI uses no investment or wealth stage.
   - Books noise-independent-judges ↔ wisdom of crowds. Books owns it, and BI will not brief it.
5. **Verdicts, in shared words.** Both categories use: **holds up · holds with limits · mixed or contested · untested · did not replicate**. "Holds with limits" and "did not replicate" are this proposal's additions to the Books charter's three. Books may adopt them or map them onto its three. Each verdict needs its own source.
6. **Before briefing,** each CM greps the other's curriculum and briefs files and names the nearest lesson in the other category in the brief.
7. **Disputes:** the two leads settle them in writing in the later brief. If they cannot agree, head-of-product decides.

## 9. The next 24 briefs (ranked)
Ranks 13-24 are written in `company/domains/briefs/big-ideas.md` under "## Strategy wave 1", with numbers in `big-ideas-strategy-wave1-check.mjs`. Ranks 25-36 are BI-3, to be briefed after the DLR five, with the strand managers drafting them.

| Rank | Slug (proposed) | Concept | Strand | Class | Note |
|---|---|---|---|---|---|
| 13 | typing-keeps-the-best | cumulative-selection | S | D | the only unbriefed demand-3 concept |
| 14 | mars-loops-backwards | heliocentric-retrograde | S | D | frame change |
| 15 | how-many-witnesses | extraordinary-evidence | M | D | path 1; religion wording check |
| 16 | top-fifth-of-the-top-fifth | pareto-80-20 | E | D ⚑ | no wealth stage |
| 17 | raisins-see-no-centre | expanding-universe | S | D | two discoverers named |
| 18 | cost-falls-per-doubling | wrights-law ★ | E `ht` | D | |
| 19 | most-positives-could-be-false | most-findings-false ★ | M | D ⚑ | research-lead |
| 20 | five-rough-guesses | fermi-estimation | S | D | limit shown by bias |
| 21 | same-veil-two-choices | veil-of-ignorance | M | D | cultural + research-lead before build |
| 22 | network-value-not-squared | metcalfe-oversold ★ | E `ht` | D ⚑ | both sides sourced |
| 23 | old-books-outlast-new | lindy-effect | E `ht` | D ⚑ | demand 1 → 2 |
| 24 | one-box-or-two | newcombs-problem | M | D | demand 1 → 2, level stretch → core |
| 25 | most-species-were-lost | most-species-extinct | S | D+H | turnover arithmetic: 99% from steady churn |
| 26 | foil-mostly-nothing | atom-mostly-empty | S | D+H | nuclear/atomic radius ratio |
| 27 | sunlight-is-eight-minutes-old | light-delay-past | S | D/P | AU and c are defined |
| 28 | the-pump-on-broad-street | germ-theory-pump | S | H | waits for Snow's tables |
| 29 | bounty-breeds-rats | perverse-incentives | E | D+H ⚑ | documented case only |
| 30 | degree-as-a-signal | costly-signalling | E | D ⚑ | model; real share contested |
| 31 | everyone-stands-nobody-sees | positional-arms-race | E | D | |
| 32 | old-buildings-were-survivors | survivors-look-better-made ★ | E `ht` | D | Books boundary pair |
| 33 | one-grain-never-matters | sorites-heap | M | D | named positions |
| 34 | the-change-you-missed | change-blindness | M | H | accessibility (flicker) |
| 35 | smashed-or-hit | memory-reconstructive | M | H ⚑ | replication record |
| 36 | the-dot-that-vanishes | blind-spot-filled-in ★ | M | seen on screen | accessibility (one-eye task) |

Balance: ranks 13-24 have 4 per strand; ranks 25-36 have 4 per strand.

## 10. Asks
**Founder** (board, owner founder):
1. **The target.** Accept 120 as the Big Ideas ceiling, with 72 committed through Wave M, in place of 170? The plan's 2,000 then needs 50 more from elsewhere, or a lower total.
2. **W-583.** The web-capable fact-check session, already asked. For Big Ideas it decides whether the ⚑ lessons (about a quarter of each wave) can publish at all. I ask that the first session include the DLR five's held claims (about 6).

**head-of-product** (board): review this strategy; rule on the K1 exception for 2 briefs; rule on D8 (whether a contested lesson may be in the DLR five); answer the cultural-reviewer scope gap (section 6); and decide whether cm-books's co-sign of 8.2 is required before either category briefs a named pair.

**cm-books:** co-sign or amend 8.2.

## Objections (anticipated, each with its answer)
| Objection | Answer |
|---|---|
| "Cutting 170 to 120 misses the founder's 2,000." | The founder decides (ask 1). The 2,000 counts gated lessons (plan section 0). 50 ungated Big Ideas lessons would not count, and they would block 50 others in review. |
| "Removing 4 concepts shrinks the map for no reason." | Each one is already taught by a lesson with the same stage (2.4). Keeping them would show as unmet demand that we would then fill with duplicates, which is what today's crit killed. |
| "Derivation-first makes Big Ideas look like a maths category." | Only waves BI-1 and BI-2 are D-first. Mind and society ⚑ lessons follow once sources can be checked. The lens and the transfer recall carry the "big idea", and the derivation carries the truth. |
| "The cultural-reviewer route is not in that role's scope." | Agreed. That is why it is an ask, and sensitive briefs stay unclaimed until it is answered (section 6). |
| "Holding the 8 cycle-1 briefs stalls the category." | The gate holds every category's new builds. The 2-brief exception is the narrowest one that lets the DLR five form. |

## This would be wrong if
- Learners cannot tell a Big Ideas lesson from its subject doorway (kill rule 2). Then the lens framing is not working, and the category should merge into subjects.
- Derivation-only lessons review well but learners find them dry, with transfer recall at the median and commit rate below it. Then the H-heavy ideas we deferred are the ones people came for, and the pacing should flip once W-583 is answered.
- Review capacity grows (W-556's own "wrong if"). Then 170 may be right, provided the ideas pass the section 1 bar.
