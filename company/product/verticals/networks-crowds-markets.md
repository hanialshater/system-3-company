# Vertical: Networks, Crowds, and Markets

owner: principal-pm-verticals (Selin) · status: **proposed** (first vertical review 2026-10-14, board W-137) · decides: head-of-product for the batch inside the roadmap; the founder for the vertical itself and its budget
anchor work: Easley & Kleinberg, *Networks, Crowds, and Markets* (Cambridge UP, 2010), `content/works.json` id `easley-kleinberg-2010`, 24 chapters
coverage command: `node tools/meta.mjs coverage --work=easley-kleinberg-2010` (0 of 24 chapters referenced on 2026-10-14)
review record: `company/rituals/records/2026-10-14-vertical-review-ncm.md`

## Audience
1. **Students taking or self-studying a "networks" course**: Cornell INFO 2040 / ECON 2040, the edX and MOOC versions, and similar network science and social computing courses. They have the book or the slides and want to *see* each chapter's result instead of reading a proof.
2. **Curious adults who meet these ideas in the news**: viral posts, why a road made traffic worse, why one app wins, why polls and votes go in circles, why hits are unpredictable.

## Job to be done
"Give me the one surprising result of this chapter in a minute, so that I believe it and can explain it, and send me back to the chapter knowing what to look for."

The book is unusually well suited to us. Almost every chapter turns on one counter-intuitive, predict-able result on a small picture: a road that slows everyone, an honest bid, two camps from a rule about triangles, a cascade that is wrong, a song whose success is luck. These are exactly 60-second predict, explore, reveal cards.

## Why we can be the best in the world here
- **What exists:** the book (free PDF), lecture slides, and a few excellent long interactive essays (Nicky Case's *Parable of the Polygons*, *The Evolution of Trust*, *The Wisdom and/or Madness of Crowds*). Those are 10 to 30 minute essays on 3 or 4 of the 24 chapters. Nobody has a short, chapter-by-chapter set of predict-first lessons with checked claims and spaced recall.
- **Our edge:** breadth (one card per chapter result), the learner commits to a prediction first, and every number is a sourced claim. We will not beat Case on depth for Schelling or trust, and we should not try. We win on coverage, speed and recall.
- **Our risk:** many results need a small network on the stage (nodes and edges the learner taps). We have no shared network component. Each early lesson draws its graph by hand (see Formats).

## Evidence
- **Real-learner evidence: none yet.** No lesson in this vertical has met a real learner, and the product is not deployed with recall data. Simulated learner reviews are quality gates, not market evidence, and this doc does not count them as demand.
- **Supply evidence (ours):** 14 existing lessons already teach a chapter result or its prerequisite (table below), and the categories they sit in pass review at normal rates. That is evidence we can *build* these, not evidence anyone *wants* them.
- **Demand signals to collect:** see Success metric.

## Portfolio by chapter
Legend: **built** = a lesson exists (status in brackets) and should take a `curriculum.references` entry instead of a new lesson; **briefed** = a brief exists, not built; **batch 1** = new brief requested in this review; **later** = backlog for batch 2; **none** = no lesson planned.
Section numbers follow the book's table of contents. They were written from the 2010 edition's contents without the PDF to hand (the proxy blocked the fetch), so each CM confirms the § against the free PDF before a brief ships.

| Ch | Title | Concept(s) and the result | Category · strand · owner | State |
|---|---|---|---|---|
| 1 | Overview | Survey of the book's themes | none | **none**: the vertical's path page plays this role (personalization-lead) |
| 2 | Graphs | (a) A giant component appears suddenly once average degree passes 1 (§2.2) · (b) Breadth-first search gives distance (§2.3) | (a) probability · chance · cm-probability-chance · (b) cs · algorithms | (a) **batch 1** `the-giant-appears` · (b) **built** `wave-from-the-corner` [published], `maze-depth-first` [review, BFS vs DFS contrast] |
| 3 | Strong and Weak Ties | Under strong triadic closure every local bridge is a weak tie, so new information (jobs) arrives through acquaintances (§3.1–3.2) | math · discrete · cm-math-discrete | **batch 1** `news-comes-from-acquaintances` |
| 4 | Networks in Their Surrounding Contexts | Schelling: mild preferences produce sharp segregation (§4.5) · homophily (§4.1) | economics · markets; geography · people-places | **briefed** `mild-preferences-sharp-divides` (cm-economics-markets), `schelling-on-new-york` (cm-geography-people-places); both briefs should carry the ch. 4 §4.5 reference. Homophily: later |
| 5 | Positive and Negative Relationships | If every triangle is balanced, the network splits into at most two hostile camps (§5.1–5.2) | math · discrete · cm-math-discrete | **batch 1** `enemy-of-my-enemy` |
| 6 | Games | (a) Dominant strategies, prisoner's dilemma (§6.2–6.3) · (b) mixed-strategy equilibrium: each side randomises to make the *other* indifferent (§6.7–6.8, penalty kicks) | economics · markets · cm-economics-markets | (a) **built** `two-suspects-payoff` [published] · (b) **batch 1** `penalty-kick-mix` |
| 7 | Evolutionary Game Theory | (a) Can a strategy invade? (§7.1–7.2) · (b) hawk-dove settles at a stable mix, not all hawks (§7.5) | life · genetics-evolution · cm-life-genetics-evolution | (a) **built (adjacent)** `strategy-builder` [review]: repeated PD invasion, close to §7.2 · (b) **later** `hawks-never-take-over` |
| 8 | Modeling Network Traffic using Game Theory | Braess's paradox: a free new road raises everyone's travel time, 65 to 80 min in the book's 4,000-car network (§8.2) | cs · systems · cm-cs-systems (game framing checked with cm-economics-markets) | **batch 1** `new-road-slower-trip` |
| 9 | Auctions | Sealed-bid second-price: bidding your true value is a dominant strategy (§9.4) · winner's curse (§9.6) | economics · markets · cm-economics-markets | **batch 1** `bid-what-its-worth` · winner's curse **later** |
| 10 | Matching Markets | Market-clearing prices exist, are found by raising prices on over-demanded items, and the result maximises total value (§10.3–10.4) | economics · markets · cm-economics-markets | **batch 1** `prices-sort-the-buyers` · adjacent brief `proposers-get-the-best` (cs.algorithms, stable matching; not the book's model, so no reference unless the CM finds a section) |
| 11 | Network Models of Markets with Intermediaries | Trader power comes from monopoly over a link; competing traders earn zero (§11.3, §11.6) | economics · markets | **later** (hard to fit 60 s; needs a format check) |
| 12 | Bargaining and Power in Networks | Position decides power: in a 3-node path the centre takes almost all; in a 4-node path it does not (§12.2–12.3, §12.8) · ultimatum game (§12.6) | economics · markets | **later** |
| 13 | The Structure of the Web | Bow-tie: from a random page you can reach far less than "the web" (Broder et al. 2000) (§13.3–13.4) | cs · systems · cm-cs-systems | **batch 1** `web-bow-tie-reach` |
| 14 | Link Analysis and Web Search | PageRank: one link from an important page beats many links from unimportant ones (§14.3) | cs · algorithms · cm-cs-algorithms | **batch 1** `one-good-link-beats-many` |
| 15 | Sponsored Search Markets | VCG makes truth-telling dominant; the generalized second-price auction does not (§15.3–15.5) | economics · markets | **later** (builds on `bid-what-its-worth`) |
| 16 | Information Cascades | After two people choose the same way, rational people ignore their own signal; about 1 cascade in 5 locks onto the wrong answer with 2/3-accurate signals (§16.2–16.5) | probability · statistics · cm-probability-statistics | **batch 1** `two-said-blue` · prerequisite **built** `which-coin-is-it`, `base-rates` (Bayes, §16.3) |
| 17 | Network Effects | With network effects there is a tipping point: below critical mass a product dies, above it grows to the high equilibrium (§17.2–17.3) | economics · markets · cm-economics-markets | **batch 1** `below-critical-mass` |
| 18 | Power Laws and Rich-Get-Richer Phenomena | (a) Rich-get-richer makes winners unpredictable: the same songs in parallel worlds give different hits (MusicLab) (§18.3–18.4) · (b) heavy tails (§18.2) | probability · chance · cm-probability-chance | (a) **batch 1** `same-songs-different-hits` · (b) **built (adjacent)** `average-that-never-settles` [review] |
| 19 | Cascading Behavior in Networks | Threshold adoption: a cascade stops exactly at a cluster that is dense enough (density > 1 − q) (§19.2–19.3) | math · discrete · cm-math-discrete | **batch 1** `cluster-stops-the-cascade` |
| 20 | The Small-World Phenomenon | A few random long links collapse distances while local clustering stays (Watts–Strogatz) (§20.2) · decentralised search (§20.3–20.4) | probability · chance · cm-probability-chance | **batch 1** `few-shortcuts-shrink-the-world` · search **later** |
| 21 | Epidemics | (a) Branching processes and R0 (§21.2) · (b) SIR (§21.3) · (c) SIS/SIRS and waves (§21.4–21.5) · (d) the *timing* of contacts decides who can be reached (§21.6) | life · health-epidemiology · cm-life-health-epidemiology | (a) **built** `herd-immunity` [review], `immunity-eats-r` [published], `spreaders-are-rare` [review] · (b) **built** `epidemic-overshoot` [published], `vaccinate-at-the-peak` [review, fatal verdict open] · (c) **built** `waves-return` [review] · (d) **batch 1** `contact-order-matters` · curriculum concept `network-clustering-spread` (no brief): **later** |
| 22 | Markets and Information | Lemons: asymmetric information unravels a market (§22.6) · betting odds aggregate beliefs (§22.2–22.3) | economics · markets | Lemons **built** `lemon-market-unravels` [published] · betting / signalling **later** |
| 23 | Voting | (a) Majority preferences can cycle, so the agenda picks the winner (§23.3) · (b) independent voters aggregate information (Condorcet jury) (§23.7) · median voter (§23.6), Arrow (§23.5) | math · discrete · cm-math-discrete | (a) **batch 1** `agenda-picks-the-winner` · (b) **built** `five-weak-voters` [published, ai] · median voter **later** |
| 24 | Property Rights | Externalities (§24.1) · tragedy of the commons (§24.2) · Coase theorem (§24.1) | economics · markets | **built** `loaf-with-smoke` [review], `shared-pasture` [review] · Coase **later** |

Adjacent lessons that support a path through the vertical without a book reference: `friends-have-more-friends` (probability, a network-sampling surprise), `handshakes-halve` (degree sum), `free-rider-pot` (public goods), `supply-demand` and `buyers-who-would-pay-more` (the no-network-effects baseline for ch. 17).

**Totals:** 24 chapters. 9 chapters have a built lesson that can take a reference: 2, 6, 7 (adjacent), 16 (prerequisite, §16.3), 18 (adjacent), 21, 22, 23 and 24. Chapter 4 has two briefs. Batch 1 adds 16 lessons across 16 chapters, 10 of them new to the vertical. After batch 1, 19 of 24 chapters have at least one lesson, and 20 once the Schelling pair ships. Chapters 1 (overview), 11, 12 and 15 have none.

## Batch 1 (16 lessons), in build order
Order: graph basics first (they teach the stage vocabulary), then games, then markets, then crowds. Format column: **default** = a format with kit support today (single card, simulation run); **spec** = needs an interaction-designer spec before build.

| # | Slug | Ch § | Owner | Format |
|---|---|---|---|---|
| 1 | the-giant-appears | 2 §2.2 | cm-probability-chance | Simulation run (default) |
| 2 | news-comes-from-acquaintances | 3 §3.2 | cm-math-discrete | Single card, hand-drawn graph (default) |
| 3 | enemy-of-my-enemy | 5 §5.1–5.2 | cm-math-discrete | Single card (default) |
| 4 | few-shortcuts-shrink-the-world | 20 §20.2 | cm-probability-chance | Simulation run (default) |
| 5 | penalty-kick-mix | 6 §6.7–6.8 | cm-economics-markets | Single card with slider-drives-live-chart (default) |
| 6 | new-road-slower-trip | 8 §8.2 | cm-cs-systems | Before / after toggle (**spec**) |
| 7 | bid-what-its-worth | 9 §9.4 | cm-economics-markets | Single card (default) |
| 8 | prices-sort-the-buyers | 10 §10.3–10.4 | cm-economics-markets | Single card with step-run button (**spec**: round-by-round prices) |
| 9 | below-critical-mass | 17 §17.3 | cm-economics-markets | Single card with slider-drives-live-chart (default) |
| 10 | web-bow-tie-reach | 13 §13.4 | cm-cs-systems | Single card, directed graph (default) |
| 11 | one-good-link-beats-many | 14 §14.3 | cm-cs-algorithms | Single card with step-run button (default) |
| 12 | two-said-blue | 16 §16.2–16.5 | cm-probability-statistics | Simulation run (default) |
| 13 | same-songs-different-hits | 18 §18.4 | cm-probability-chance | Simulation run with parallel worlds (**spec**: small multiples of 8 worlds on a phone) |
| 14 | cluster-stops-the-cascade | 19 §19.3 | cm-math-discrete | Single card with step (**spec + design-lead ruling**: is a deterministic threshold cascade on a ≤ 12-node graph "agent-based"? The ABM format is limited to the two Schelling lessons) |
| 15 | contact-order-matters | 21 §21.6 | cm-life-health-epidemiology | Storyboard / scrub over a contact timeline (**spec**) |
| 16 | agenda-picks-the-winner | 23 §23.3 | cm-math-discrete | Single card (default) |

Load: cm-math-discrete 4, cm-economics-markets 4, cm-probability-chance 3, cm-cs-systems 2, cm-cs-algorithms 1, cm-probability-statistics 1, cm-life-health-epidemiology 1. The full asks (concept, result, checked numbers) are in the review record's §3.

## Formats this vertical needs
- **Mostly default:** 11 of 16 are single card or simulation run.
- **Five need an interaction-designer spec:** new-road-slower-trip (before/after), prices-sort-the-buyers (rounds), same-songs-different-hits (parallel worlds), cluster-stops-the-cascade (ABM boundary), contact-order-matters (timeline).
- **A shared "network stage" UI concept (ask to design-lead):** 9 of 16 lessons draw a small graph (≤ 20 nodes): tap a node, tap an edge, colour by state, labels at 390 px. Under the rule of two, the first two lessons (`news-comes-from-acquaintances`, `enemy-of-my-enemy`) build it by hand. After both pass design review, the design lead writes `company/design/concepts/network-stage.md`, and the platform engineer considers a kit component with an engineering review. This is a UI concept, not a new format. The lesson contract is unchanged.

## Success metric and kill criteria
**Build-phase metrics (supply, not market evidence):**
- At least 12 of the 16 batch-1 lessons reach launch verdict within two review rounds.
- Every batch-1 lesson carries a `curriculum.references` entry to `easley-kleinberg-2010`. After the reference backfill, the coverage command shows ≥ 19 of 24 chapters (20 with the Schelling pair).

**Market metrics (once deployed; none can be met before):**
- Primary: **7-day recall** on NCM lessons at or above the feed median.
- Secondary: **path completion**: ≥ 30% of learners who open a second NCM lesson from the vertical's path go on to complete 5.
- Signal of the course audience: share of NCM sessions that arrive from a course link or a "chapter" deep link (needs the analytics-steward's event).

**Kill or pause criteria:**
- **Pause the batch** if 4 or more of the first 8 built lessons get a fatal verdict, or fail the 60-second fit (stage over 25 words, reveal over 90 words) because of the network stage. That would mean the format, not the topic, is the problem, so the fix goes to design.
- **Kill the vertical** (keep the lessons in their categories) if, 60 days after the first 10 NCM lessons are deployed to real learners, 7-day recall is more than 10 points below the feed median *and* path completion is under 15%.
- **Do not grow beyond batch 1** until real-learner data exists. Batch 2 (ch. 7b, 9b, 11, 12, 15, 20b, 22, 23c, 24c) waits for it.

## Budget (proposal for the founder and the OP)
- Briefs: 16 (7 CMs). Specs: 5 interaction-designer specs, plus one design-lead ruling and one UI concept.
- Builds: 16. At today's demo-builder cost (about 192k tokens and 26 min a run, with 34% rework) that is about 4.1M tokens of builder time, plus fact-check and review. Claims: about 5 per lesson. Three lessons cite empirical studies (Granovetter 1973, Broder et al. 2000, Salganik et al. 2006) that need a human source check.
- The reference backfill on 14 existing lessons is metadata only, under an hour of work.

## Verdict
**Grow (proposed new vertical).** Most of the build is in strands that have capacity today. Nine chapters are already partly covered, and the book's structure gives a ready-made path and a ready-made audience. The founder decides the vertical and its budget (`company/ops/founder-inbox.json`, via the session-2 inbox). Until then, batch 1 sits inside the existing category plans as ordinary briefs with a book reference, so it is useful even if the vertical is declined.
