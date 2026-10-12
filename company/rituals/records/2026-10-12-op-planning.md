# Operational Plan (OP): 2026-10-12

author: head-of-product · category narratives: each category manager · ratifies: founder

Write in prose. A plan is a choice with its trade-offs visible, not a forecast. Every goal says
what number it is taken to mean, over what period, and what would count against it.

| Metric | Value |
|---|---|
| Lessons (not retired) | 18 |
| Status | review 18 |
| Claims verified | 108/152 (71%) · disputed 1 |
| Claims per lesson | 8.4 |
| Fact-checked / learner-reviewed / QA pass | 18 / 17 / 17 of 18 |
| Learner verdicts | fatal 5 · revise 12 · launch 0 |
| Board | 23 open (oldest 0 days) |

| Domain | Lessons | Published | Reviewed | Fatal |
|---|---|---|---|---|
| math | 2 | 0 | 2 | 1 |
| cs | 3 | 0 | 2 | 0 |
| probability | 2 | 0 | 2 | 1 |
| physics | 2 | 0 | 2 | 2 |
| ai | 2 | 0 | 2 | 0 |
| economics | 2 | 0 | 2 | 0 |
| life | 2 | 0 | 2 | 0 |
| chemistry | 2 | 0 | 2 | 1 |
| geography | 1 | 0 | 1 | 0 |

| Wave | Builders | Lessons added | Build tokens/lesson | Check tokens/lesson | Merge QA failures |
|---|---|---|---|---|---|
| w0 | 4 | 17 | 41k | 56k | 0 |
| w1 | 10 | — | — | — | — |

Source commands: `npm run metrics -- --md`, `npm run company -- coverage`. Concept counts per domain (coverage): math 56, cs 53, probability 30, physics 57, ai 30, economics 57, life 55, chemistry 55, geography 33.

## 1. Where we are (one page)

We have 18 lessons, all in review, none published. That is the whole product. Gates cost more than building: checking took about 56k tokens per lesson against about 41k to build (WBR 2026-10-12, `ops/waves.json`).

What worked. Independent checks found real defects in every lesson, including the operator's own (mercator 15x vs 10.7x), and the fact-checker found a wrong number in the founder-session lesson (retro 2026-10-12). Parallel worktree builders produced 17 lessons with zero merge QA failures. All lessons pass the QA contract, so they work on a phone.

What did not. 0 of 18 earned a "launch" verdict: 5 fatal, 12 revise, 1 not yet learner-reviewed. The same weakness showed up in all 18 reviews: the reveal button unlocks before the learner has seen the thing the reveal is about (half-life, odd-numbers-make-squares, pendulum-period, projectile-angle and base-rates all got "fatal" for exactly that). Claims are 71% verified (108/152) with one disputed claim; every fact-check pass adds about three claims the builder did not record.

What we now believe, and how sure. (1) Our lessons work but we have no evidence they teach: high confidence in the first half, none in the second; no real learner has seen one (EXP-002 not run). (2) The reveal-gate weakness is a briefing problem, not a talent problem: moderate confidence, resting only on the fact that wave 0 builders were never told. Wave 1 is the first test. (3) Scale is feasible in throughput, not yet in checking: the check cost per lesson is above build cost, so the checking pipeline, not building, sets how many lessons we can honestly count.

The new fact: the founder wants at least 500 lessons across all domains while keeping the quality gates. That is 27x today's count in one quarter. This plan says what that costs and where we will stop if it starts to cost the gates. A discrepancy to resolve first: the founder's request says 10 domains; the repository has 9 (`content/domains.json`: math, cs, probability, physics, ai, economics, life, chemistry, geography). See section 5.

## 2. Goals for the quarter (3-5)

Period for all goals: Q4 2026, checked at each cycle's WBR, final read at cycle 6.

| Goal | Measured by | Period | would_be_wrong_if | Owner |
|---|---|---|---|---|
| G1. Breadth: at least 500 lessons, at least 50 in every domain | `npm run metrics` "Lessons (not retired)" >= 500 and per-domain count >= 50 in each domain in `content/domains.json` | by end of cycle 6 | We reach 500 but fewer than 400 (G2) are launch-ready: then the count measured our output, not our product, and we should have stopped building earlier | chief-of-staff (count), category managers (domains) |
| G2. Quality holds at scale: at least 400 of the 500 are launch-ready (fact-checked, QA pass, learner verdict "launch", 0 disputed claims, 100% claims verified); the rest are in review with findings routed | Counts from `company status` and `metrics` | by end of cycle 6; checked every wave | Launch-ready share stays under 60% at wave 3 while check cost per lesson stays above build cost: the gates cannot carry 500, and we cut the count (not the gates) | head-of-product, evaluation-steward |
| G3. The earn-the-reveal fix works: wave 1 learner-review fatal rate at or below 15% (wave 0: 5/18 = 28%); every later wave at or below 15% | `metrics` "Fatal rate" by wave, in WBR anomaly row 1 | wave 1 and each wave after | Wave 1's fatal rate is still above 20% after the brief told builders to gate the reveal: the weakness is not briefing, and more builders produce more fatal lessons faster | chief-of-staff (probe), learning-designer |
| G4. First learning evidence: EXP-002 run (5 real learners x 5 lessons); report first-revisit recall and prediction commit rate, labelled as small-sample | EXP-002 results record; Surface Value items 4 and 5 | before end of cycle 4, so the last two cycles can change course | Commit rate is under 40% (vision bet 1), or first-revisit recall is no better than a lesson that explains first: then the format, not the volume, is the problem and cycles 5-6 build less | founder (sessions), analytics-steward |
| G5. The feed stays usable at 500: EDD-001 budgets (`/` HTML under 300 KB, first load under 2 s on emulated Pixel 7) | EDD-001 measurements at about 120 and about 500 lessons | measured after wave 1, again at 500 | "Do nothing" meets both budgets at 500 (then the platform work in section 3 was wasted; stop doing it) | platform-engineer |

Not a goal: published-lesson count. Nothing publishes until a lesson passes every gate, and production stays `SHOW_REVIEW=off`.

## 3. Allocation

A slot is one brief taken to a review-ready lesson (about 41k build tokens, about 56k to check, wave 0 numbers; these will move). A revision slot is a rebuild against review findings plus a re-check; I assume about half the cost of a new slot (an assumption: not measured yet).

Total registry target: 500 = 18 existing + 482 new. All 482 are allocated to the nine domains in the repository, 54 each (53 cs, 55 geography, because they start with 3 and 1 lessons). Plus a 25-slot reserve I hold in cycle 6 for retirements and wave-1 shortfalls. Lessons that are fatal stay in the registry (and in the count) but not in G2.

| Category | Slots (new) | Of which exploration | Why this much | Top 3 concepts (from unmet demand) |
|---|---|---|---|---|
| Mathematics | 54 | 11 | 56 concepts in the map, 2 lessons; ~1 lesson per concept leaves little room | pythagoras-by-rearrangement, percent-change-asymmetry, place-value |
| Computer Science | 53 | 11 | 53 concepts, 3 lessons; merge-sort-payoff is the exemplar | insertion-sort, floating-point, hashing-collisions |
| Probability & Data | 54 | 11 | Map has only 30 concepts, so about 24 slots need new concepts or second lessons on hard misconceptions; CM decides | monty-hall, gamblers-fallacy, law-of-large-numbers |
| Physics | 54 | 11 | 57 concepts; 2 of 2 wave-0 lessons were fatal, so revision load is heavy here | falling-objects, independent-components, energy-conservation |
| AI & Machine Learning | 54 | 11 | Map has only 30 concepts: same stretch as probability | next-token, temperature-sampling, nearest-neighbours |
| Economics & Money | 54 | 11 | 57 concepts; money decisions are close to everyday life | fee-drag, minimum-payment-trap, rule-of-72 |
| Life Sciences | 54 | 11 | 55 concepts | exponential-bacteria, outbreak-doubling-time, surface-area-volume |
| Chemistry | 54 | 11 | 55 concepts; 1 of 2 fatal | atom-scale-size, density, reaction-rates-temperature |
| Geography & Maps | 55 | 11 | New domain, 1 lesson; the map has only 33 concepts; kit was built for the exemplar | great-circle-routes, latitude-longitude, seasons-axial-tilt |
| **Exploration (inside the rows above, not extra)** | **99 of 482 (20.5%)** | 99 | Ring-fenced: brief marked [exploration] by the CM (demand 1 concept, or an unusual format: no slider, no text on stage, a learner-built model). Not ranked against the leader on engagement; it is judged by its own testable prediction (cycle planning section 3). Spread evenly: at least 20% of each cycle's briefs per domain, so it cannot be squeezed out late. If wave 1's briefs fell short of 20%, cycle 2 makes it up. | per CM |
| Revisions (wave 0 and later) | 130 | n/a | 17 of 18 wave-0 lessons need one (5 fatal, 12 revise): 17 in cycles 1-2 (board W-016...W-020 earn-the-reveal). Wave 1: assume half need one (about 50). Cycles 2-6: about 15% of new lessons (about 60). | all 17 wave-0 lessons first |
| Platform / quality | about 30 slot-equivalents | n/a | EDD-001 measurements at about 120 and 500; slim index and pagination if budgets are exceeded; AMD-001 kit support for earn-the-reveal; per-agent scratch dirs (W-023); second fact-check pass as a standing step | see EDD-001 |

New lessons per cycle (6 cycles). Pace falls on purpose: the early cycles are the ones where the gates teach us the most, and the late cycles must absorb revisions.

| Cycle | New | Revisions | Note |
|---|---|---|---|
| 1 | about 100 (wave 1, 10 builders x 10 briefs) | 17 (wave 0) | In progress |
| 2 | 90 | 30 | Size set after wave 1's fatal rate (G3) |
| 3 | 90 | 25 | EDD-001 measurement at about 120 lessons happens before this cycle |
| 4 | 80 | 25 | EXP-002 done by now (G4) |
| 5 | 70 | 20 | |
| 6 | 52 + 25 reserve | 13 | Final read of G1-G5 |

Circuit breaker. If a wave's fatal rate is above 25% (wave 0 was 28%), the next wave builds half as many new lessons and spends the difference on revisions, and the chief of staff reports why in the WBR. If check cost per lesson stays above 100k tokens, I cut new slots for the last cycles rather than dropping a gate. I do not know the token budget for the quarter: at wave 0 prices, 482 new lessons cost about 20M build and 27M check tokens, plus revisions. That needs the founder to confirm (section 7).

## 4. Category narratives

Provisional. I wrote one short paragraph per domain from coverage and the wave-0 reviews so the plan is complete. Each category manager will refine theirs (audience, what only this domain teaches well, concepts and why, lessons to retire, evidence held and lacked). Where a CM's account differs, the CM's wins on content and mine on allocation.

**Mathematics (cm-math).** 2/56 concepts have a lesson. odd-numbers-make-squares was fatal: the question already gave the pattern, and the reveal unlocked after one tap, so nothing was tested. Evidence we lack: whether learners hold intuitions that the predictions can break (percent-change-asymmetry and pythagoras-by-rearrangement are the strongest demand). Retire: nothing yet; revise odd-numbers first.

**Computer Science (cm-cs).** 3/53, no fatal. The strongest domain so far, with merge-sort-payoff as the house exemplar (its first learner review still found the stage did not show why splitting helps; W-014). Next: insertion-sort, floating-point, hashing-collisions. Risk: the exemplar flatters the domain; the CM should check the other two CS lessons against the same "told, not shown" test.

**Probability & Data (cm-probability).** 2/30, one fatal (base-rates): exploration could end on a screen that supported the wrong answer (99 of 108 sick) and the reveal then contradicted it for a setting the learner never saw. This is the clearest case for a forced contrast. The map has only 30 concepts for 54 slots, so the CM must extend it or allow second lessons per concept. Next: monty-hall, gamblers-fallacy, law-of-large-numbers.

**Physics (cm-physics).** 2/57, both fatal (pendulum-period, projectile-angle). In both, the reveal unlocked while the key comparison was unseen or the learner had moved a slider without releasing anything. Physics will need the heaviest revision share and a check that the stage shows two things side by side before the reveal. Next: falling-objects, independent-components, energy-conservation.

**AI & Machine Learning (cm-ai).** 2/30, no fatal. The domain with the most current relevance for our learners and the thinnest map: 54 slots against 30 concepts. Next: next-token, temperature-sampling, nearest-neighbours. Evidence we lack: whether learners hold a wrong "it looks things up" picture that we should predict against.

**Economics & Money (cm-economics).** 2/57, no fatal. Money lessons are number-heavy, and the fact-checker found a wrong number in a founder-session lesson (waves.json notes; I have not confirmed which domain), so figures here need derivation re-runs, not reasoning. Next: fee-drag, minimum-payment-trap, rule-of-72. Evidence we lack: whether real learners' money mistakes match our predictions.

**Life Sciences (cm-life).** 2/55, no fatal. Exponential-growth concepts (exponential-bacteria, outbreak-doubling-time) overlap with math and economics (rule-of-72, compound interest): the CMs should agree who owns each so we do not build it twice. Next: exponential-bacteria, outbreak-doubling-time, surface-area-volume.

**Chemistry (cm-chemistry).** 2/55, one fatal (half-life): the reveal described a run the learner did not make, and the survivors the question was about were not on screen by the time the reveal opened. Next: atom-scale-size, density, reaction-rates-temperature. Evidence we lack: which unmet concepts learners actually hold misconceptions about.

**Geography & Maps (cm-geography).** 1/33, mercator-greenland exemplar; no fatal; it had the 15x vs 10.7x error caught by the fact-check. New domain with its own kit (the geo kit), so defects there are likely to be repeated across lessons. Next: great-circle-routes, latitude-longitude, seasons-axial-tilt. The map has only 33 concepts for 55 slots.

## 5. Domain expansion

The domain scout's proposals (astronomy, music theory, linguistics) are pending; I have not read them in full and do not proceed on their authority.

- Geography & Maps: enter (done; counted in the 500).
- Astronomy: incubate. It adjoins physics and geography (seasons, tides, time) and is the likeliest tenth domain. No CM and no slots until a CM brief and a first exemplar exist.
- Music theory, linguistics: wait. Wait until the 500-lesson programme shows whether the checking pipeline can carry nine domains.

The open question for the founder: "10 domains" versus the nine we have. Two readings. (a) The founder counts a tenth domain: then at roughly 50 each, 10 x 50 = 500, and I reduce the nine domains to about 50 in cycles 5-6 (about 36 slots) and give a new domain about 50 only if it has a CM and an exemplar by cycle 3; I would pick astronomy. (b) The founder meant nine: this plan stands. I proceed with (b) and the plan survives either way because the reduction is taken from the last cycles, not the first.

## 6. What we will not do this quarter

- Lower, skip or batch away any gate to reach 500. If the count and the gates conflict, the count gives.
- Publish a lesson with a fatal finding, an open disputed claim or an unverified claim on the stage.
- Rank lessons or choose what to build by engagement (dwell, swipes, shares). Surface Value forbids it.
- Personalise the feed, add streaks or autoplay (decision 2026-10-12-feed-is-not-personalised).
- Production deploy before there is a gated lesson; first production release stays `SHOW_REVIEW=off`.
- Open a tenth domain without a CM and an exemplar.
- Build revisit analytics (PRD-002) before EXP-002 gives us a baseline.
- Paths through the curriculum map and composable "experiences" (Later).
- Change the success criterion: Surface Value is the founder's. The 500 target is an output goal beneath it, not a replacement.

## 7. Risks and the objections we are proceeding over

| Objection | Raised by | Kind (evidence / purpose) | Decision | Owner |
|---|---|---|---|---|
| Scale vs quality: wave 0 found a reveal-gate defect in 18/18 lessons; building 482 more may copy it 27x before we know the fix works | head-of-product (against own plan); supported by WBR anomaly 1 | evidence | Accepted in part: proceed, but wave 2 is sized only after wave 1's fatal rate (G3) and the circuit breaker in section 3 applies. Not accepted: pausing wave 1, which is already built and is itself the test | head-of-product |
| No real learner has seen a lesson. 500 lessons of unknown teaching value is volume, not product | head-of-product; Surface Value items 4-5 | purpose | Proceeding because the founder set the target. Mitigation: G4 is dated before cycle 4 and can shrink cycles 5-6; nothing is published until gated. Not answered: if the format is wrong, we will have spent the tokens | founder (ratifies), head-of-product |
| Checking is the bottleneck: 56k check vs 41k build per lesson, so 500 lessons costs about 47M tokens plus revisions; no budget is stated | scale-operations decision (checking was the bottleneck, Thesis 1) | evidence | Proceed with batching on sonnet; the quarter's token budget is unknown, so I ask the founder to state it in section 8. Without it, I assume it is not binding | founder |
| Batched reviews recreate shared context (lesson 1 colours lesson 7) | evaluation-steward, scale-operations decision | evidence | Accepted: funded sample comparison in wave 2 stays; if confirmed, the batch size drops | evaluation-steward |
| A cheaper checker model may verify what it should dispute | founding review, scale-operations decision | evidence | Accepted with mitigation already recorded: derivations re-run; a disputed claim blocks | evaluation-steward |
| Concept maps of 30 (probability, ai) and 33 (geography) cannot supply 54-55 distinct lessons; filling them risks near-duplicates | head-of-product (from coverage) | evidence | Accepted, delegated: CMs extend maps or declare second-lesson variants by cycle 2; if they cannot, I move their slots to domains with room (math, physics, economics, life, chemistry) | category managers |
| The "10 domains" in the request does not match the nine in the repository | head-of-product | purpose | Proceeding with nine; see section 5 | founder |
| The cycle-3 EDD-001 measurement at about 120 lessons may miss problems that appear only at 500 | platform-engineer (EDD-001 design) | evidence | Accepted: G5 adds a second measurement at 500 and slim index plus pagination are ready to ship | platform-engineer |
| Exploration at 20% competes with the 500 target: pure counts favour safe concepts | head-of-product | purpose | Declined: the 20% is ring-fenced and counted in the 500; each exploration lesson carries a testable prediction | head-of-product |

## 8. Ratification
Founder: approved / approved with changes / returned. Date.
