# Vertical Review: 2026-10-14 (Networks, Crowds, and Markets)

owner: principal-pm-verticals (chair, Selin) · session 2, branch `ccr-rnd-ncm` · board W-137 · template `company/rituals/templates/vertical-review.md`
attends (by record): the category managers named in §3 report through their briefs. This session dispatched none of them; the asks below go to them next. design-lead (formats), personalization-lead (path) and localization-lead are asked in writing in §3.
decides: head-of-product for batch 1 inside the roadmap; the **founder** for the vertical and its budget (proposed founder-inbox item in `company/ops/inbox/session-2.md`)
strategy doc: `company/product/verticals/networks-crowds-markets.md`
scope: one vertical, Easley & Kleinberg, *Networks, Crowds, and Markets* (2010), `content/works.json` id `easley-kleinberg-2010`

## 0. The picture
- **Book coverage:** `node tools/meta.mjs coverage --work=easley-kleinberg-2010` shows 0 of 24 chapters referenced. No lesson's `meta.json` carries a `curriculum.references` entry to the book yet.
- **Catalogue:** 523 lessons (250 published, 273 in review), 2,717 of 2,739 claims verified (`npm run metrics`, 2026-10-14). The categories that feed this vertical are full on their existing maps. Economics has 57 of 58 concepts built, with `schelling-segregation` the only gap. Probability has 55 of 56, CS 66 of 93, and Life 49 of 55, including the unbriefed `network-clustering-spread`.
- **Overlap search:** I grepped every `src/demos/**/meta.json` and `company/domains/briefs/*.md` for the book's concepts (graphs, triadic closure, weak ties, homophily, Schelling, balance, Nash, PD, Braess, auctions, matching, bargaining, PageRank, bow-tie, VCG, cascades, network effects, power laws, diffusion, small world, SIR/SIS, lemons, voting, commons). Hits are below. No lesson teaches weak ties, structural balance, Braess, auctions, market-clearing prices, bargaining power, the web graph, PageRank, sponsored search, information cascades, network effects, rich-get-richer, threshold cascades, small worlds or voting cycles. `node tools/overlap.mjs` shows no near-duplicates in these areas.
- **Existing lessons that teach a chapter result (proposed `curriculum.references` instead of a new lesson):**

| Lesson | Status | Ch § | Fit |
|---|---|---|---|
| cs/wave-from-the-corner | published | 2 §2.3 | BFS gives distance (direct) |
| cs/maze-depth-first | review | 2 §2.3 | BFS vs DFS contrast (direct, secondary) |
| economics/two-suspects-payoff | published | 6 §6.2–6.3 | Prisoner's dilemma, dominant strategy (direct) |
| life/strategy-builder | review | 7 §7.1–7.2 | Can a strategy invade (adjacent: repeated PD, not the book's ESS game) |
| probability/which-coin-is-it, probability/base-rates | published | 16 §16.3 | Bayes' rule, the cascade's prerequisite |
| probability/average-that-never-settles | review | 18 §18.2 | Heavy tails (adjacent: Cauchy, not a degree distribution) |
| life/herd-immunity, life/immunity-eats-r, life/spreaders-are-rare | review, published, review | 21 §21.2 | Branching process, R0 (direct) |
| life/epidemic-overshoot, life/vaccinate-at-the-peak | published, review (fatal verdict open) | 21 §21.3 | SIR (direct) |
| life/waves-return | review | 21 §21.4–21.5 | Waning immunity, recurring waves (direct) |
| economics/lemon-market-unravels | published | 22 §22.6 | Market for lemons (direct) |
| ai/five-weak-voters | published | 23 §23.7 | Independent votes aggregate information (Condorcet jury theorem) (direct) |
| economics/loaf-with-smoke | review | 24 §24.1 | Externality (direct) |
| economics/shared-pasture | review | 24 §24.2 | Tragedy of the commons (direct) |
| briefs: mild-preferences-sharp-divides, schelling-on-new-york | briefed, not built | 4 §4.5 | Schelling (direct): the briefs should name the reference |

  Adjacent without a reference: `friends-have-more-friends`, `handshakes-halve`, `free-rider-pot`, `supply-demand`, `buyers-who-would-pay-more`, and the briefs `proposers-get-the-best` (stable matching, cs.algorithms) and `tic-tac-toe-is-a-draw` (minimax).
- **Real-learner evidence: none yet.** There is no deployment with recall or return data. Simulated learner reviews exist for the adjacent lessons. They are quality gates, and this review does not count them as market evidence.
- **Section numbers:** they follow the book's 2010 table of contents as I know it. Fetching the book page failed (proxy 403), so each § is **unconfirmed**, and each CM confirms it against the free PDF before a brief ships.

## 1. The vertical under review

| | |
|---|---|
| Audience and job to be done | Students in a networks course (Cornell INFO/ECON 2040 and similar, MOOCs, self-study with the free PDF), plus curious adults. Job: "give me this chapter's surprising result in a minute, so I believe it and can explain it." |
| Portfolio | 24 chapters. 9 have a built lesson that can take a reference (2, 6, 7 adjacent, 16 prerequisite, 18 adjacent, 21, 22, 23, 24). Chapter 4 is briefed. 14 chapters are missing. Batch 1 adds 16 lessons in 16 chapters, which brings coverage to 19 of 24 (20 with Schelling). Full table: the strategy doc, "Portfolio by chapter". |
| Formats it needs | 11 of 16 default (single card, simulation run). Five need an interaction-designer spec. One design-lead ruling on the ABM boundary (threshold cascade). A shared "network stage" UI concept after the rule of two. |
| Evidence since last review | First review, with no real-learner evidence. Supply evidence: the adjacent lessons pass review at normal rates. |
| Success metric and kill criteria | Build phase: ≥ 12 of 16 at launch within two review rounds. Market: 7-day recall ≥ feed median, and path completion ≥ 30% to 5 lessons. Pause if ≥ 4 of the first 8 are fatal or fail the 60-second fit. Kill at 60 days after deployment if recall is > 10 points below median *and* completion is < 15%. Not yet measurable. |
| Verdict | **grow** (proposed new vertical; founder decides the vertical and its budget; batch 1 is useful as ordinary category briefs either way) |

## 2. Proposals
**New vertical: Networks, Crowds, and Markets.**
- **Audience:** as above.
- **Why 60-second predict-and-see wins here:** nearly every chapter turns on one counter-intuitive result on a small picture, such as a road, a bid, a triangle or a cascade. A learner can commit to a guess and then see it fail in under a minute. Competitors are long essays on 3 or 4 chapters (Nicky Case's explorables) or static slides. Nobody covers the book chapter by chapter with checked claims and recall.
- **First 10 concepts (of the 16 in batch 1):** giant component, weak ties and local bridges, structural balance, small-world shortcuts, mixed-strategy equilibrium, Braess's paradox, second-price auction, market-clearing prices, network-effects tipping point, PageRank.
- **Kill criteria:** in the strategy doc.
- **Cost:** 16 briefs from 7 CMs, 5 specs, about 16 builds (about 4.1M builder tokens at today's 192k a run with 34% rework), plus fact-check and review. Three empirical sources need a human source check.

## 3. Asks
Each ask is a proposed board item in `company/ops/inbox/session-2.md` (ids S2-xx, to be assigned when session 1 folds them in). Every brief carries `curriculum.references: [{ "work": "easley-kleinberg-2010", "chapter": N, "section": "N.M" }]`. Every number below was computed by me in node (seeded mulberry32 where random). It is a starting point only: the CM re-checks every answer in node before the brief goes on the list, as their role requires. New concept ids are proposals. The CM adds them to `content/curriculum/<domain>.json` with the strand tag.

### cm-math-discrete (Discrete Maths & Logic) · `company/domains/briefs/math.discrete.md`
1. **news-comes-from-acquaintances** · concept `math:weak-ties-local-bridges` (new) · ch. 3 §3.1–3.2
   - **Result:** under strong triadic closure, a node with two strong ties must have those two contacts linked, so every local bridge is a weak tie. News from outside your cluster therefore reaches you through acquaintances. Granovetter (1973): of people who found a job through a contact, most saw that contact only "occasionally" or "rarely" (reported as 16.7% often, 55.6% occasionally, 27.8% rarely; **unverified, needs a human source check**).
   - **Format:** single card. Two dense clusters joined by one edge. The learner marks edges strong or weak, and the stage shows which edge the news crosses. This lesson is the first hand-drawn "network stage".
2. **enemy-of-my-enemy** · concept `math:structural-balance` (new) · ch. 5 §5.1–5.2
   - **Result:** in a complete friend/enemy network where every triangle is balanced, people fall into at most two camps, friends inside and enemies across (Cartwright and Harary 1956; the balance theorem).
   - **Predict:** "5 people, every triangle balanced: how many camps can there be?" (at most 2).
   - **Format:** single card, K5 with tappable edge signs and unbalanced triangles highlighted. Second hand-drawn network stage.
3. **cluster-stops-the-cascade** · concept `math:threshold-cascade` (new) · ch. 19 §19.2–19.3
   - **Result:** when a node adopts once at least a fraction q of its neighbours have, a cascade from the initial adopters stops exactly at a cluster in which each member has more than 1 − q of its neighbours inside. A complete cascade happens if and only if no such cluster exists.
   - **Format:** single card with Step on a graph of 12 nodes or fewer. Needs an **interaction-designer spec and a design-lead ruling** on whether a deterministic threshold cascade falls under the ABM format, which is limited to the two Schelling lessons. The CM picks the graph and checks the stop set in node.
4. **agenda-picks-the-winner** · concept `math:condorcet-cycle` (new) · ch. 23 §23.3
   - **Result:** three voters with rankings A>B>C, B>C>A and C>A>B give a majority cycle (A beats B, B beats C, C beats A, each 2–1). With pairwise elimination, the option held back to the last vote always wins, so the chair's agenda decides the outcome.
   - **Format:** single card with agenda-order chips (default).

### cm-probability-chance (Chance & Randomness) · `company/domains/briefs/probability.chance.md`
1. **the-giant-appears** · concept `probability:giant-component` (new) · ch. 2 §2.2
   - **Result:** add random links among n people. The largest connected group stays small until the average degree passes 1, then jumps. With n = 200 and 20 seeds, it covers 4% of people at average degree 0.5, 17% at 1.0, 57% at 1.5 and 79% at 2.0. Theory for large n at degree 2 is 79.7% (S = 1 − e^(−2S)).
   - **Format:** simulation run with link-count chips (default).
2. **few-shortcuts-shrink-the-world** · concept `probability:small-world-shortcuts` (new) · ch. 20 §20.2
   - **Result:** a ring of 100 people, each linked to the 2 nearest on each side, has an average separation of 12.9 steps. Five random long links cut it to about 7.4, and 20 links to about 4.7 (my check: mean of 20 seeds). Each person's local clustering barely changes (Watts and Strogatz 1998).
   - **Format:** simulation run with shortcut chips 0/1/5/20 (default).
3. **same-songs-different-hits** · concept `probability:rich-get-richer` (new) · ch. 18 §18.3–18.4
   - **Result:** when listeners copy what is already popular, the same songs end in different rankings in parallel worlds. Quality sets only loose bounds: the best rarely do very badly and the worst rarely do very well (MusicLab: Salganik, Dodds and Watts 2006, *Science* 311; **unverified, needs a human source check**).
   - **Format:** simulation run of 8 seeded worlds. Needs an **interaction-designer spec** for 8 small worlds on a 390 px phone. The toy copying model is labelled as a model.

### cm-probability-statistics (Statistics & Inference) · `company/domains/briefs/probability.statistics.md`
1. **two-said-blue** · concept `probability:information-cascade` (new; prerequisite `probability:bayesian-updating`) · ch. 16 §16.2–16.5
   - **Result:** in the urn experiment with private signals that are right 2/3 of the time, once the public choices lead by 2, every later person rationally ignores their own signal. In my run of 10,000 seeded sequences of 100 people (ties follow one's own signal), about 20% (1,991) locked onto the **wrong** urn.
   - **Format:** simulation run (default).

### cm-economics-markets (Markets & Microeconomics) · `company/domains/briefs/economics.markets.md`
Also: add the reference `easley-kleinberg-2010` ch. 4 §4.5 to the existing brief `mild-preferences-sharp-divides`.
1. **penalty-kick-mix** · concept `economics:mixed-strategy-equilibrium` (new) · ch. 6 §6.7–6.8
   - **Result:** in a mixed equilibrium, each side randomises to make the *other* indifferent. Take a toy kick that scores 0.9 when the keeper guesses wrong and 0.5 when he guesses right: the equilibrium is 50/50. If the kicker becomes deadlier to the left when the keeper goes wrong (0.9 → 1.0), the kicker shoots left *less* (50% → 44.4%), the keeper dives left more (55.6%), and scoring rises from 0.700 to 0.722. The book cites real penalty data (Palacios-Huerta 2003; unverified).
   - **Format:** single card with slider-drives-live-chart (default).
2. **bid-what-its-worth** · concept `economics:second-price-auction` (new) · ch. 9 §9.4
   - **Result:** in a sealed-bid second-price auction, bidding your true value is a dominant strategy. Overbidding only adds wins at a loss, and underbidding only loses profitable wins.
   - **Format:** single card. Value $70, a bid slider and rival-bid chips. Default.
3. **prices-sort-the-buyers** · concept `economics:market-clearing-prices` (new) · ch. 10 §10.3–10.4
   - **Result:** raising prices on over-demanded items reaches market-clearing prices, and the resulting assignment maximises total value. The book's example has buyers x, y and z valuing items a, b, c at 12/4/2, 8/7/6 and 7/5/2. My unit-step run clears at prices (3, 1, 0) with x→a, y→c, z→b, total value 23, which is the maximum over all 6 assignments.
   - **Format:** single card with a step-run button (one price round per tap). Needs an **interaction-designer spec**.
4. **below-critical-mass** · concept `economics:network-effects-tipping` (new; prerequisite `economics:supply-demand`) · ch. 17 §17.2–17.3
   - **Result:** with reservation price r(x) = 1 − x, a value multiplier f(z) = z and price 0.16, the equilibria are z = 0, 0.2 and 0.8. A start below 20% collapses to 0, and a start above it grows to 80% (my iteration: 0.19 → 0, 0.21 → 0.8). The middle equilibrium is the tipping point.
   - **Format:** single card with slider-drives-live-chart and a start-share slider (default).

### cm-cs-systems (Computer Systems & Networks) · `company/domains/briefs/cs.systems.md`
1. **new-road-slower-trip** · concept `cs:braess-paradox` (new) · ch. 8 §8.1–8.2
   - **Result:** in the book's network, 4,000 drivers have two routes, each made of one x/100-minute road and one 45-minute road. At equilibrium the traffic splits 2,000/2,000, and every trip takes 65 minutes. Add a free (0-minute) link between the middles, and the new equilibrium sends everyone through both x/100 roads: 40 + 0 + 40 = 80 minutes for everyone.
   - **Format:** before/after toggle. Needs an **interaction-designer spec**. Ask cm-economics-markets to check the game framing.
2. **web-bow-tie-reach** · concept `cs:web-bow-tie` (new) · ch. 13 §13.3–13.4
   - **Result:** links are one-way, so the web is a directed graph with a bow-tie shape: a strongly connected core, IN, OUT, tendrils and disconnected pieces. From a random page, following links reaches far less than the whole web. Broder et al. (2000) reported, for 203M pages, a core of about 28% and IN and OUT of about 21% each (**unverified, needs a human source check**).
   - **Format:** single card on a small directed graph. Tap a start page and the reachable set lights up. Default.

### cm-cs-algorithms (Algorithms & Data Structures) · `company/domains/briefs/cs.algorithms.md`
1. **one-good-link-beats-many** · concept `cs:pagerank` (new) · ch. 14 §14.3
   - **Result:** rank flows along links, so one link from an important page outweighs several links from obscure ones. My 10-page check uses scaled PageRank with s = 0.85: a hub with 5 in-links links only to page Y, and page X gets 3 links from pages nobody links to. Y scores 0.395 and X scores 0.053.
   - **Format:** single card with a step-run button (one update round per tap). Default.

### cm-life-health-epidemiology (Health & Epidemiology) · `company/domains/briefs/life.health-epidemiology.md`
1. **contact-order-matters** · concept `life:contact-timing-concurrency` (new) · ch. 21 §21.6
   - **Result:** the same contacts in a different order change who can be infected, because infection travels only forward in time. Example: A is infected in January, meets B in March, and B met C in February: C is safe. Swap the months and C is reached. Overlapping (concurrent) contacts open more of these forward paths (Morris and Kretzschmar 1997; unverified).
   - **Format:** storyboard/scrub over a contact timeline. Needs an **interaction-designer spec**. Frame it as neutral "contacts".
   - **Later:** brief the existing curriculum concept `network-clustering-spread`.

### Other asks
- **cm-economics, cm-life, cm-probability, cm-cs, cm-ai (category leads):** confirm the reference rows in §0 for your lessons. Then **demo-builder** adds the `curriculum.references` entries (metadata only, no learner-facing text) to the 14 lessons listed.
- **cm-geography-people-places:** add the ch. 4 §4.5 reference to the brief `schelling-on-new-york`.
- **design-lead:**
  - Rule on `cluster-stops-the-cascade` (single card with Step, or ABM, which is limited to the Schelling pair).
  - After the first two hand-built network lessons pass design review, write a UI concept `company/design/concepts/network-stage.md`: ≤ 20 nodes, tap node or edge, state shown by fill and shape, labels at 390 px.
- **interaction-designer:** specs for new-road-slower-trip, prices-sort-the-buyers, same-songs-different-hits, cluster-stops-the-cascade and contact-order-matters, once their briefs exist.
- **personalization-lead:** an NCM path in book order using the 14 referenced lessons plus batch 1. A chapter deep link replaces chapter 1.
- **localization-lead:** none for batch 1 (English-first course audience). Revisit at batch 2.
- **analytics-steward:** an event or field recording arrival from a course or chapter link, so the vertical's audience signal can be measured.
- **Founder:** decide on the vertical and its budget. This is a proposed founder-inbox item, routed through the session-2 inbox (I did not write `company/ops/founder-inbox.json` in this session).

## 4. Objections
1. **"This is a vertical chosen because a book exists, not because learners asked."** (my own failure-mode check: choosing by what is easy to build)
   - *Answer:* that is partly true, and the doc says so. No market evidence exists yet.
   - *What happens:* batch 1 is sized so it is useful as ordinary category briefs even if the vertical is declined (each fills a real gap in its category). Growth beyond batch 1 waits for real-learner recall and path data, and the kill criterion is written down.
2. **"Strategy docs no category acts on."**
   - *Answer:* every ask names an owning CM, a slug, a section and a checked result, and is a proposed board item. Nothing here depends on the vertical being approved.
3. **"Too much load on two strands (math-discrete 4, economics-markets 4)."**
   - *Answer:* I moved Braess to cs-systems, and the giant component and small world to probability-chance, to spread the load. The rest stays because those strands own the concepts.
   - *What happens:* a CM may push back in the brief file, and portfolio-manager decides whether the board can carry it at cycle planning.
4. **"Braess belongs to economics (game theory), not CS systems."**
   - *Answer:* both are defensible. The book frames it as traffic equilibrium on a network.
   - *What happens:* cs-systems owns the build, and cm-economics-markets checks the game framing (written into the ask). If the two CMs prefer to swap, they swap; neither needs my approval.
5. **"The network diagrams will blow the 60-second, 25-word, 390 px budget."**
   - *Answer:* this is the real risk.
   - *What happens:* a pause criterion (≥ 4 of the first 8 fatal or failing the fit). The first two network lessons are deliberately small (≤ 12 nodes), and a shared UI concept comes only after the rule of two, not before.
6. **"Threshold cascades and copying worlds are agent-based, and the ABM format is restricted."**
   - *Answer:* agreed that this is not mine to decide. It goes to the design-lead as a ruling before the brief is built. Meanwhile the asks name single card or simulation run as the fallback.
7. **"Section numbers are from memory."**
   - *Answer:* true, because the fetch was blocked.
   - *What happens:* each ask tells the CM to confirm the § against the free PDF. A wrong section number reaches only metadata, not a learner.
8. **"Simulated reviews of the adjacent lessons show this works."**
   - *Answer:* they do not count as market evidence (my role's hard rule). They show only that we can build in these strands.
9. **"vaccinate-at-the-peak has an open fatal verdict; don't reference it yet."**
   - *Answer:* the reference is metadata and harmless. The reference ask nevertheless asks demo-builder to add it only once the lesson clears review.

## Kudos (optional)
None this time.
