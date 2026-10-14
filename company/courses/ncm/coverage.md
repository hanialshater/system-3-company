# Networks, Crowds, and Markets: coverage

owner: cm-course-ncm (Jonah) · refreshed 2026-10-14 (first map) · map `content/courses/ncm/chapters.json` · briefs `company/courses/ncm/briefs.md` · vertical strategy (decides order): `company/product/verticals/networks-crowds-markets.md` on `origin/ccr-rnd-ncm`

**Coverage is an input metric.** It counts which demo-able sections have a lesson. It says nothing about whether learners recall, finish or value anything, and it is not Surface Value. The WBR reports it next to learner results (7-day recall, path completion), never instead of them (head-of-product, 2026-10-14). The denominator is sections I marked demo-able myself; each `demoable: false` has its reason in `chapters.json` for a strand manager or Selin to spot-check at vertical review.

## How the book was acquired
- cs.cornell.edu and the PDF mirrors return a proxy 403 from this environment, so I did not read the book.
- The table of contents comes from three sources: `content/works.json` (24 chapter titles), web-search snippets, and my own knowledge of the 2010 edition.
- **Confirmed by a snippet (number and title):** 2.1, 3.1, 3.2, 3.5, 3.6, 6.10 (the Berkeley-hosted draft PDF and the GMU chapter-2 PDF; URLs in `chapters.json`).
- **Corroborated number only:** 15.9 (subject), 20.3, 21.7.
- **Everything else is `confirmed: false`**, 150 of 156 sections. Exercise sections are omitted. Per head-of-product, `curriculum.references` rows cite the chapter only and keep the section in `section_unconfirmed`. Confirming them needs someone with the book (open: the founder can allow the host).
- **Belief:** high on chapter titles (works.json); medium-high on section titles and order (a widely used book, and the snippets matched my list wherever they showed anything); medium on exact section numbers in the late chapters (15, 22, 23), where off-by-one errors are most likely.

## Totals
| | Sections | Demo-able | Covered (built) | Batch 1 | Gap (briefed) | Not demo-able |
|---|---|---|---|---|---|---|
| All 24 chapters | 156 | 106 | 16 | 31 | 59 | 50 |

- **Today (built lessons only):** 16 of 106 demo-able sections = **15.1%**.
- **With batch 1 built:** 47 of 106 = **44.3%**. The 17 batch-1 slugs come from session 2's list (`git show origin/ccr-rnd-ncm:company/ops/inbox/session-2.md`). 12 are building and 5 are waiting on a spec.
- **With every gap brief built:** 106 of 106 = **100%** (51 briefs covering 59 sections; some lessons cover two adjacent sections).
- **The 80% target** (85 of 106) needs batch 1 plus **38 of the 59 gap sections**. In rank order, that is roughly the top 30 briefs.
- **Chapters taught by at least one lesson:** 10 of 24 today, 20 with batch 1 and 23 with all briefs. Chapter 1 (overview) is not demo-able. No lesson carries a reference row yet, so `node tools/meta.mjs coverage --work=easley-kleinberg-2010` still shows 0 of 24 until S2-18 is applied.

## By chapter
| Ch | Title | Sections | Demo-able | Covered | Batch 1 | Gap | Coverage today → with batch 1 → all briefs |
|---|---|---|---|---|---|---|---|
| 1 | Overview | 2 | 0 | 0 | 0 | 0 | n/a → n/a → n/a |
| 2 | Graphs | 4 | 2 | 1 | 1 | 0 | 50% → 100% → 100% |
| 3 | Strong and Weak Ties | 6 | 5 | 0 | 2 | 3 | 0% → 40% → 100% |
| 4 | Networks in Their Surrounding Contexts | 5 | 3 | 0 | 1 | 2 | 0% → 33% → 100% |
| 5 | Positive and Negative Relationships | 5 | 4 | 0 | 2 | 2 | 0% → 50% → 100% |
| 6 | Games | 10 | 9 | 3 | 2 | 4 | 33% → 56% → 100% |
| 7 | Evolutionary Game Theory | 5 | 4 | 1 | 0 | 3 | 25% → 25% → 100% |
| 8 | Modeling Network Traffic using Game Theory | 3 | 3 | 0 | 2 | 1 | 0% → 67% → 100% |
| 9 | Auctions | 7 | 5 | 1 | 1 | 3 | 20% → 40% → 100% |
| 10 | Matching Markets | 6 | 5 | 0 | 3 | 2 | 0% → 60% → 100% |
| 11 | Network Models of Markets with Intermediaries | 7 | 2 | 0 | 0 | 2 | 0% → 0% → 100% |
| 12 | Bargaining and Power in Networks | 9 | 7 | 0 | 0 | 7 | 0% → 0% → 100% |
| 13 | The Structure of the Web | 5 | 2 | 0 | 2 | 0 | 0% → 100% → 100% |
| 14 | Link Analysis and Web Search | 6 | 3 | 0 | 1 | 2 | 0% → 33% → 100% |
| 15 | Sponsored Search Markets | 9 | 6 | 0 | 0 | 6 | 0% → 0% → 100% |
| 16 | Information Cascades | 7 | 6 | 1 | 3 | 2 | 17% → 67% → 100% |
| 17 | Network Effects | 7 | 5 | 1 | 3 | 1 | 20% → 80% → 100% |
| 18 | Power Laws and Rich-Get-Richer Phenomena | 7 | 5 | 0 | 2 | 3 | 0% → 40% → 100% |
| 19 | Cascading Behavior in Networks | 7 | 5 | 0 | 2 | 3 | 0% → 40% → 100% |
| 20 | The Small-World Phenomenon | 7 | 4 | 0 | 1 | 3 | 0% → 25% → 100% |
| 21 | Epidemics | 8 | 7 | 4 | 1 | 2 | 57% → 71% → 100% |
| 22 | Markets and Information | 10 | 5 | 1 | 0 | 4 | 20% → 20% → 100% |
| 23 | Voting | 11 | 7 | 1 | 2 | 4 | 14% → 43% → 100% |
| 24 | Property Rights | 3 | 2 | 2 | 0 | 0 | 100% → 100% → 100% |
| | **Total** | **156** | **106** | **16** | **31** | **59** | **15.1% → 44.3% → 100%** |

## Briefs per strand
- **math.discrete** (cm-math-discrete): 9 briefs, 1 needing a spec
- **cs.algorithms** (cm-cs-algorithms): 3 briefs, 0 needing a spec
- **cs.systems** (cm-cs-systems): 1 brief, 0 needing a spec
- **probability.chance** (cm-probability-chance): 7 briefs, 1 needing a spec
- **probability.statistics** (cm-probability-statistics): 3 briefs, 1 needing a spec
- **economics.markets** (cm-economics-markets): 23 briefs, 1 needing a spec
- **life.genetics-evolution** (cm-life-genetics-evolution): 4 briefs, 1 needing a spec
- **life.health-epidemiology** (cm-life-health-epidemiology): 1 brief, 0 needing a spec
- **Total:** 51 briefs, 5 needing a spec. economics.markets carries 23 of them, because chapters 9–12, 15 and 22 are all markets. That is a load question for the portfolio manager at cycle planning (see "Where I differ" below).

## Gap list, ranked by teaching value
Ranking criteria, in order:
1. The vertical doc's named batch-2 chapters first (7b, 11, 12, 15, 20b, 22, 23c, 24c).
2. How surprising the result is to a general learner, and how often it is cited outside the book.
3. Whether a lesson is a prerequisite for others in this list.
4. Build risk (a default format and a small stage rank higher).

The "advanced material" sections mostly rank low: they are real demos, but for a narrower audience.

| Rank | Slug | Ch § (unconfirmed unless noted) | Strand | Format | Spec |
|---|---|---|---|---|---|
| 1 | hawks-never-take-over | 7.5 | life.genetics-evolution | Single card (start-share slider drives live chart) | no |
| 2 | near-and-far-links-find-the-way | 20.3, 20.4 | probability.chance | Simulation run (exponent chips 0/1/2) | no |
| 3 | pay-for-the-harm-you-do | 15.3, 15.4 | economics.markets | Single card (bid slider; harm bars) | no |
| 4 | the-middle-voter-decides | 23.6 | math.discrete | Single card | no |
| 5 | middle-of-three-takes-all | 12.2, 12.3 | economics.markets | Single card (path-length chips: 2 / 3 people) | no |
| 6 | useless-degree-still-pays | 22.8 | economics.markets | Single card (cost sliders per type) | no |
| 7 | who-pays-same-filter | 24.1 | economics.markets | Side-by-side comparison (two rights assignments) | **needs spec** |
| 8 | odds-average-the-bettors | 22.2, 22.3 | economics.markets | Single card (wealth and belief sliders) | no |
| 9 | second-trader-pays-the-seller | 11.3 | economics.markets | Single card (add-trader toggle, bid ticks) | no |
| 10 | stag-needs-three-in-four | 6.5 | economics.markets | Single card (belief slider drives live chart) | no |
| 11 | selfish-routes-cost-a-third-more | 8.3 | cs.systems | Single card (split slider drives live chart) | no |
| 12 | bridge-carries-news-not-habits | 19.4 | math.discrete | Single card with Step (network stage) | no |
| 13 | weak-links-hold-it-together | 3.3 | probability.chance | Simulation run (network removal curve) | **needs spec** |
| 14 | cut-the-busiest-link | 3.6 | cs.algorithms | Single card with Step (network stage) | no |
| 15 | random-surfer-finds-the-rank | 14.6 | cs.algorithms | Simulation run | no |
| 16 | the-long-tail-adds-up | 18.5 | probability.chance | Single card (cutoff slider drives live chart) | no |
| 17 | outbreak-can-fizzle-above-one | 21.8 | life.health-epidemiology | Simulation run (seeded outbreaks, R chips) | no |
| 18 | two-public-clues-break-the-herd | 16.6, 16.7 | probability.statistics | Before / after toggle (publish two clues) | **needs spec** |
| 19 | the-loser-flips-the-winner | 23.4 | math.discrete | Before / after toggle | **needs spec** |
| 20 | rising-price-stops-at-second | 9.3, 10.5 | economics.markets | Single card with step-run button (price rises $1 per tap) | no |
| 21 | shade-your-sealed-bid | 9.5 | economics.markets | Single card (bid slider drives expected-profit chart) | no |
| 22 | no-best-move-one-stable-pair | 6.4 | economics.markets | Single card (tap cells; best-response arrows) | no |
| 23 | honest-bid-loses-in-gsp | 15.5, 15.6 | economics.markets | Single card (bid slider) | no |
| 24 | one-shy-rioter-stops-the-riot | 19.5 | math.discrete | Single card with Step | no |
| 25 | friends-split-more-than-chance | 4.1 | probability.statistics | Simulation run (random friendship draws) | no |
| 26 | bigger-beetles-everyone-loses | 7.2 | life.genetics-evolution | Single card (generation step, share chart) | no |
| 27 | the-pivotal-juror-convicts | 23.8, 23.9 | probability.statistics | Single card | no |
| 28 | two-thirds-of-the-average | 6.10 | economics.markets | Single card with Step (one round of reasoning per tap) | no |
| 29 | ten-times-links-hundred-times-rarer | 18.2 | probability.chance | Single card (axis toggle: linear vs log–log) | no |
| 30 | all-lines-meet-in-one-mother | 21.7 | life.genetics-evolution | Storyboard / scrub (lineages traced back) | **needs spec** |
| 31 | four-in-a-row-two-thirds | 12.7, 12.8 | economics.markets | Single card with step-run button (outside options update) | no |
| 32 | outside-option-sets-the-split | 12.5 | economics.markets | Single card (outside-option slider drives split bar) | no |
| 33 | lowball-offer-should-pass | 12.6 | economics.markets | Single card (offer slider) | no |
| 34 | same-revenue-any-rule | 9.7 | economics.markets | Simulation run (rule chips) | no |
| 35 | three-students-two-rooms | 10.1 | math.discrete | Single card | no |
| 36 | the-bar-nobody-can-forecast | 17.7 | economics.markets | Simulation run (forecast chips; mixed-strategy run) | no |
| 37 | enemies-allow-three-camps | 5.4 | math.discrete | Single card (hand-drawn network stage) | no |
| 38 | good-lists-make-good-pages | 14.2 | cs.algorithms | Single card with step-run button | no |
| 39 | mutual-friends-add-up-slower | 4.4 | probability.chance | Single card (mutual-friend chips drive live chart) | no |
| 40 | broker-between-two-groups | 3.5 | math.discrete | Single card (hand-drawn network stage) | no |
| 41 | someone-has-to-swerve | 6.6 | economics.markets | Single card | no |
| 42 | more-copying-bigger-stars | 18.7 | probability.chance | Simulation run (copy-share chips 0/50/90%) | no |
| 43 | only-the-needed-trader-profits | 11.6 | economics.markets | Single card (remove-trader taps) | no |
| 44 | accurate-bettor-takes-the-pot | 22.10 | economics.markets | Simulation run (seeded races) | no |
| 45 | lower-bid-takes-the-top-ad | 15.7 | economics.markets | Single card | no |
| 46 | harm-prices-clear-the-market | 15.9 | economics.markets | Single card | no |
| 47 | patience-wins-the-split | 12.9 | economics.markets | Single card (shrink slider; backward-induction steps) | no |
| 48 | one-odd-loop-blocks-two-camps | 5.5 | math.discrete | Single card (hand-drawn network stage) | no |
| 49 | the-line-takes-up-to-half | 19.7 | math.discrete | Single card (q chips, Step) | no |
| 50 | stable-until-mutants-meet | 7.4 | life.genetics-evolution | Single card (generation step, share chart) | no |
| 51 | every-scale-equally-likely | 20.7 | probability.chance | Single card (exponent toggle drives bar chart) | no |

### Where I differ from the vertical doc (Selin's doc decides order)
1. **Gate.** The doc says do not grow beyond batch 1 until real-learner data exists. I agree, and I have not changed it. I wrote the briefs now because the founder asked for the map and the briefs, and a brief costs little to hold. The board items below are "ready to build when slotted". Head-of-product allocates the slots at cycle planning, and course briefs get no lane of their own.
2. **Winner's curse (doc: ch. 9b "later").** I propose a reference row on the existing `probability/best-of-twenty-identical` (concept `winners-curse`, published) instead of a new lesson. It teaches the same selection-on-noise mechanism and already cites the auction origin.
3. **Chapter 11 (doc: "hard to fit 60 s").** I brief only the two results that fit one prediction (11.3 and 11.6). The other five (11.1 survey, 11.2 model definition, 11.4 ripple effects, 11.5 welfare theorem, 11.7 reflections) are marked not demo-able, with reasons.
4. **Order inside batch 2.** The doc lists chapters, not an order. Mine is the rank above: hawk-dove ESS, decentralised search, VCG, median voter, bargaining power, signalling, Coase, betting odds and trader competition first.
5. **Beyond the doc's batch 2.** I brief 36 more sections that the doc's batch 2 does not name: 3.3, 3.5, 3.6, 4.1, 4.4, 5.4, 5.5, 6.4, 6.5, 6.6, 6.10, 7.2, 7.4, 8.3, 9.3, 9.5, 9.7, 10.1, 10.5, 14.2, 14.6, 16.6, 16.7, 17.7, 18.2, 18.5, 18.7, 19.4, 19.5, 19.7, 20.7, 21.7, 21.8, 23.4, 23.8 and 23.9.3–3.6, 4.1, 4.4, 5.4–5.5, 6.4–6.10, 8.3, 9.3–9.7, 10.1, 14.2 and 14.6, 16.6–16.7, 17.7, 18.2–18.7, 19.4–19.7, 20.7, 21.7–21.8, and 23.4 and 23.8–23.9. They rank after hers. If Selin disagrees, her doc wins, and I will re-rank.

## S2-18: proposed reference rows for existing lessons (chapter only)
A builder applies these as metadata, with no learner text. Each row cites the chapter only and keeps the section as `section_unconfirmed` (head-of-product rule). The first 18 rows are session 2's §0 table (14 rows covering 18 lessons). The rows marked "new" are my additions from the dedupe.

| Lesson | Status | Row to add to `curriculum.references` | Fit |
|---|---|---|---|
| cs/wave-from-the-corner | published | `{"work":"easley-kleinberg-2010","chapter":2,"section_unconfirmed":"2.3"}` | direct (BFS distance) |
| cs/maze-depth-first | review | `{"work":"easley-kleinberg-2010","chapter":2,"section_unconfirmed":"2.3"}` | direct (BFS vs DFS contrast) |
| cs/queue-or-stack-same-search | draft | `{"work":"easley-kleinberg-2010","chapter":2,"section_unconfirmed":"2.3"}` | new; direct (BFS frontier) |
| economics/two-suspects-payoff | published | `{"work":"easley-kleinberg-2010","chapter":6,"section_unconfirmed":"6.2–6.3, 6.9"}` | direct (dominant strategy; equilibrium not Pareto-optimal) |
| life/strategy-builder | review | `{"work":"easley-kleinberg-2010","chapter":7,"section_unconfirmed":"7.1"}` | adjacent (repeated PD, fitness from pairings) |
| probability/which-coin-is-it | published | `{"work":"easley-kleinberg-2010","chapter":16,"section_unconfirmed":"16.3"}` | prerequisite (Bayes' rule) |
| probability/base-rates | published | `{"work":"easley-kleinberg-2010","chapter":16,"section_unconfirmed":"16.3"}` | prerequisite (Bayes' rule) |
| probability/average-that-never-settles | review | `{"work":"easley-kleinberg-2010","chapter":18,"section_unconfirmed":"18.2"}` | adjacent (heavy tails; the power-law brief covers 18.2 itself) |
| life/herd-immunity | review | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.2"}` | direct |
| life/immunity-eats-r | published | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.2"}` | direct |
| life/spreaders-are-rare | review | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.2"}` | direct |
| life/epidemic-overshoot | published | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.3"}` | direct (SIR) |
| life/vaccinate-at-the-peak | review | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.3"}` | direct. **Hold until its fatal verdict clears.** |
| life/waves-return | review | `{"work":"easley-kleinberg-2010","chapter":21,"section_unconfirmed":"21.4–21.5"}` | direct (SIRS waves) |
| economics/lemon-market-unravels | published | `{"work":"easley-kleinberg-2010","chapter":22,"section_unconfirmed":"22.6"}` | direct |
| ai/five-weak-voters | published | `{"work":"easley-kleinberg-2010","chapter":23,"section_unconfirmed":"23.7"}` | direct (Condorcet jury) |
| economics/loaf-with-smoke | review | `{"work":"easley-kleinberg-2010","chapter":24,"section_unconfirmed":"24.1"}` | direct (externality) |
| economics/shared-pasture | review | `{"work":"easley-kleinberg-2010","chapter":24,"section_unconfirmed":"24.2"}` | direct |
| probability/best-of-twenty-identical | published | `{"work":"easley-kleinberg-2010","chapter":9,"section_unconfirmed":"9.6"}` | new; direct (winner's curse) |
| economics/supply-demand | published | `{"work":"easley-kleinberg-2010","chapter":17,"section_unconfirmed":"17.1"}` | new; baseline (no network effects) |
| economics/buyers-who-would-pay-more | review | `{"work":"easley-kleinberg-2010","chapter":17,"section_unconfirmed":"17.1"}` | new; baseline (reservation prices) |

**Batch-1 reference notes, for session 2 to fold in.** These are chapter-level, so no new section is cited.
- **two-said-blue:** add a second row, `{"work":"easley-kleinberg-2010","chapter":23,"section_unconfirmed":"23.10"}` (sequential voting cascades).
- **prices-sort-the-buyers:** add 10.2 to its `section_unconfirmed`.
- **below-critical-mass:** add 17.4 to its `section_unconfirmed`.
- **mild-preferences-sharp-divides and schelling-on-new-york:** cite ch. 4 only. The section (4.5) is unconfirmed.
- **All batch-1 briefs:** they currently write § numbers as references. Under Priya's rule those move to `section_unconfirmed`.

## Proposed board items
I did not write `board.json`; the session lead files these. Items 1–51 go one per brief, in rank order. Each reads "Build <slug> (brief: company/courses/ncm/briefs.md § <strand>)" and is gated on the strand manager accepting the brief, plus a cycle-planning slot.
1. **Build hawks-never-take-over** (life:hawk-dove-ess, E&K ch. 7, Single card (start-share slider drives live chart)) · owner: demo-builder · brief: briefs.md § life.genetics-evolution
2. **Build near-and-far-links-find-the-way** (probability:decentralized-search, E&K ch. 20, Simulation run (exponent chips 0/1/2)) · owner: demo-builder · brief: briefs.md § probability.chance
3. **Build pay-for-the-harm-you-do** (economics:vcg-mechanism, E&K ch. 15, Single card (bid slider; harm bars)) · owner: demo-builder · brief: briefs.md § economics.markets
4. **Build the-middle-voter-decides** (math:median-voter, E&K ch. 23, Single card) · owner: demo-builder · brief: briefs.md § math.discrete
5. **Build middle-of-three-takes-all** (economics:network-exchange-power, E&K ch. 12, Single card (path-length chips: 2 / 3 people)) · owner: demo-builder · brief: briefs.md § economics.markets
6. **Build useless-degree-still-pays** (economics:signaling-education, E&K ch. 22, Single card (cost sliders per type)) · owner: demo-builder · brief: briefs.md § economics.markets
7. **Spec, then build who-pays-same-filter** (economics:coase-theorem, E&K ch. 24, Side-by-side comparison (two rights assignments)) · owner: interaction-designer (spec), then demo-builder · brief: briefs.md § economics.markets
8. **Build odds-average-the-bettors** (economics:parimutuel-beliefs, E&K ch. 22, Single card (wealth and belief sliders)) · owner: demo-builder · brief: briefs.md § economics.markets
9. **Build second-trader-pays-the-seller** (economics:trader-competition, E&K ch. 11, Single card (add-trader toggle, bid ticks)) · owner: demo-builder · brief: briefs.md § economics.markets
10. **Build stag-needs-three-in-four** (economics:coordination-stag-hunt, E&K ch. 6, Single card (belief slider drives live chart)) · owner: demo-builder · brief: briefs.md § economics.markets
11. **Build selfish-routes-cost-a-third-more** (cs:price-of-anarchy, E&K ch. 8, Single card (split slider drives live chart)) · owner: demo-builder · brief: briefs.md § cs.systems
12. **Build bridge-carries-news-not-habits** (math:complex-contagion-bridges, E&K ch. 19, Single card with Step (network stage)) · owner: demo-builder · brief: briefs.md § math.discrete
13. **Spec, then build weak-links-hold-it-together** (probability:tie-strength-overlap, E&K ch. 3, Simulation run (network removal curve)) · owner: interaction-designer (spec), then demo-builder · brief: briefs.md § probability.chance
14. **Build cut-the-busiest-link** (cs:edge-betweenness-communities, E&K ch. 3, Single card with Step (network stage)) · owner: demo-builder · brief: briefs.md § cs.algorithms
15. **Build random-surfer-finds-the-rank** (cs:pagerank-random-walk, E&K ch. 14, Simulation run) · owner: demo-builder · brief: briefs.md § cs.algorithms
16. **Build the-long-tail-adds-up** (probability:long-tail, E&K ch. 18, Single card (cutoff slider drives live chart)) · owner: demo-builder · brief: briefs.md § probability.chance
17. **Build outbreak-can-fizzle-above-one** (life:branching-extinction, E&K ch. 21, Simulation run (seeded outbreaks, R chips)) · owner: demo-builder · brief: briefs.md § life.health-epidemiology
18. **Spec, then build two-public-clues-break-the-herd** (probability:cascade-fragility, E&K ch. 16, Before / after toggle (publish two clues)) · owner: interaction-designer (spec), then demo-builder · brief: briefs.md § probability.statistics
19. **Spec, then build the-loser-flips-the-winner** (math:borda-iia, E&K ch. 23, Before / after toggle) · owner: interaction-designer (spec), then demo-builder · brief: briefs.md § math.discrete
20. **Build rising-price-stops-at-second** (economics:ascending-auction, E&K ch. 9 and 10, Single card with step-run button (price rises $1 per tap)) · owner: demo-builder · brief: briefs.md § economics.markets
21. **Build shade-your-sealed-bid** (economics:first-price-shading, E&K ch. 9, Single card (bid slider drives expected-profit chart)) · owner: demo-builder · brief: briefs.md § economics.markets
22. **Build no-best-move-one-stable-pair** (economics:nash-equilibrium, E&K ch. 6, Single card (tap cells; best-response arrows)) · owner: demo-builder · brief: briefs.md § economics.markets
23. **Build honest-bid-loses-in-gsp** (economics:gsp-auction, E&K ch. 15, Single card (bid slider)) · owner: demo-builder · brief: briefs.md § economics.markets
24. **Build one-shy-rioter-stops-the-riot** (math:heterogeneous-thresholds, E&K ch. 19, Single card with Step) · owner: demo-builder · brief: briefs.md § math.discrete
25. **Build friends-split-more-than-chance** (probability:homophily-test, E&K ch. 4, Simulation run (random friendship draws)) · owner: demo-builder · brief: briefs.md § probability.statistics
26. **Build bigger-beetles-everyone-loses** (life:ess-arms-race, E&K ch. 7, Single card (generation step, share chart)) · owner: demo-builder · brief: briefs.md § life.genetics-evolution
27. **Build the-pivotal-juror-convicts** (probability:pivotal-voting, E&K ch. 23, Single card) · owner: demo-builder · brief: briefs.md § probability.statistics
28. **Build two-thirds-of-the-average** (economics:iterated-dominance, E&K ch. 6, Single card with Step (one round of reasoning per tap)) · owner: demo-builder · brief: briefs.md § economics.markets
29. **Build ten-times-links-hundred-times-rarer** (probability:power-law-scaling, E&K ch. 18, Single card (axis toggle: linear vs log–log)) · owner: demo-builder · brief: briefs.md § probability.chance
30. **Spec, then build all-lines-meet-in-one-mother** (life:coalescent-mrca, E&K ch. 21, Storyboard / scrub (lineages traced back)) · owner: interaction-designer (spec), then demo-builder · brief: briefs.md § life.genetics-evolution
31. **Build four-in-a-row-two-thirds** (economics:balanced-outcomes, E&K ch. 12, Single card with step-run button (outside options update)) · owner: demo-builder · brief: briefs.md § economics.markets
32. **Build outside-option-sets-the-split** (economics:nash-bargaining, E&K ch. 12, Single card (outside-option slider drives split bar)) · owner: demo-builder · brief: briefs.md § economics.markets
33. **Build lowball-offer-should-pass** (economics:ultimatum-game, E&K ch. 12, Single card (offer slider)) · owner: demo-builder · brief: briefs.md § economics.markets
34. **Build same-revenue-any-rule** (economics:revenue-equivalence, E&K ch. 9, Simulation run (rule chips)) · owner: demo-builder · brief: briefs.md § economics.markets
35. **Build three-students-two-rooms** (math:constricted-set-matching, E&K ch. 10, Single card) · owner: demo-builder · brief: briefs.md § math.discrete
36. **Build the-bar-nobody-can-forecast** (economics:el-farol-minority, E&K ch. 17, Simulation run (forecast chips; mixed-strategy run)) · owner: demo-builder · brief: briefs.md § economics.markets
37. **Build enemies-allow-three-camps** (math:weak-balance, E&K ch. 5, Single card (hand-drawn network stage)) · owner: demo-builder · brief: briefs.md § math.discrete
38. **Build good-lists-make-good-pages** (cs:hubs-authorities, E&K ch. 14, Single card with step-run button) · owner: demo-builder · brief: briefs.md § cs.algorithms
39. **Build mutual-friends-add-up-slower** (probability:triadic-closure-probability, E&K ch. 4, Single card (mutual-friend chips drive live chart)) · owner: demo-builder · brief: briefs.md § probability.chance
40. **Build broker-between-two-groups** (math:structural-holes, E&K ch. 3, Single card (hand-drawn network stage)) · owner: demo-builder · brief: briefs.md § math.discrete
41. **Build someone-has-to-swerve** (economics:hawk-dove-chicken, E&K ch. 6, Single card) · owner: demo-builder · brief: briefs.md § economics.markets
42. **Build more-copying-bigger-stars** (probability:preferential-attachment-exponent, E&K ch. 18, Simulation run (copy-share chips 0/50/90%)) · owner: demo-builder · brief: briefs.md § probability.chance
43. **Build only-the-needed-trader-profits** (economics:essential-trader-profit, E&K ch. 11, Single card (remove-trader taps)) · owner: demo-builder · brief: briefs.md § economics.markets
44. **Build accurate-bettor-takes-the-pot** (economics:market-selection-wealth, E&K ch. 22, Simulation run (seeded races)) · owner: demo-builder · brief: briefs.md § economics.markets
45. **Build lower-bid-takes-the-top-ad** (economics:ad-quality-ranking, E&K ch. 15, Single card) · owner: demo-builder · brief: briefs.md § economics.markets
46. **Build harm-prices-clear-the-market** (economics:vcg-market-clearing, E&K ch. 15, Single card) · owner: demo-builder · brief: briefs.md § economics.markets
47. **Build patience-wins-the-split** (economics:alternating-offers, E&K ch. 12, Single card (shrink slider; backward-induction steps)) · owner: demo-builder · brief: briefs.md § economics.markets
48. **Build one-odd-loop-blocks-two-camps** (math:signed-cycle-balance, E&K ch. 5, Single card (hand-drawn network stage)) · owner: demo-builder · brief: briefs.md § math.discrete
49. **Build the-line-takes-up-to-half** (math:cascade-capacity, E&K ch. 19, Single card (q chips, Step)) · owner: demo-builder · brief: briefs.md § math.discrete
50. **Build stable-until-mutants-meet** (life:nash-not-ess, E&K ch. 7, Single card (generation step, share chart)) · owner: demo-builder · brief: briefs.md § life.genetics-evolution
51. **Build every-scale-equally-likely** (probability:distance-scales, E&K ch. 20, Single card (exponent toggle drives bar chart)) · owner: demo-builder · brief: briefs.md § probability.chance

Routing items, one per strand manager (my role says to tell each strand on the board when I add its concepts):
52. **Re-check NCM briefs § math.discrete** (9). Accept or object to the `proposed: true` concepts in content/curriculum/math.json, then copy the accepted briefs into company/domains/briefs/math.discrete.md · owner: cm-math-discrete
53. **Re-check NCM briefs § cs.algorithms** (3). Accept or object to the `proposed: true` concepts in content/curriculum/cs.json, then copy the accepted briefs into company/domains/briefs/cs.algorithms.md · owner: cm-cs-algorithms
54. **Re-check NCM briefs § cs.systems** (1). Accept or object to the `proposed: true` concepts in content/curriculum/cs.json, then copy the accepted briefs into company/domains/briefs/cs.systems.md · owner: cm-cs-systems
55. **Re-check NCM briefs § probability.chance** (7). Accept or object to the `proposed: true` concepts in content/curriculum/probability.json, then copy the accepted briefs into company/domains/briefs/probability.chance.md · owner: cm-probability-chance
56. **Re-check NCM briefs § probability.statistics** (3). Accept or object to the `proposed: true` concepts in content/curriculum/probability.json, then copy the accepted briefs into company/domains/briefs/probability.statistics.md · owner: cm-probability-statistics
57. **Re-check NCM briefs § economics.markets** (23). Accept or object to the `proposed: true` concepts in content/curriculum/economics.json, then copy the accepted briefs into company/domains/briefs/economics.markets.md · owner: cm-economics-markets
58. **Re-check NCM briefs § life.genetics-evolution** (4). Accept or object to the `proposed: true` concepts in content/curriculum/life.json, then copy the accepted briefs into company/domains/briefs/life.genetics-evolution.md · owner: cm-life-genetics-evolution
59. **Re-check NCM briefs § life.health-epidemiology** (1). Accept or object to the `proposed: true` concepts in content/curriculum/life.json, then copy the accepted briefs into company/domains/briefs/life.health-epidemiology.md · owner: cm-life-health-epidemiology
60. **Apply the S2-18 reference rows above** (metadata only; hold vaccinate-at-the-peak) · owner: demo-builder
61. **Confirm E&K section numbers against the book** once someone can open it (the founder can allow cs.cornell.edu), then flip `confirmed` in chapters.json and move `section_unconfirmed` to `section` · owner: cm-course-ncm (blocked on access)
62. **Spot-check the 50 `demoable: false` reasons** in chapters.json at the next NCM vertical review · owner: principal-pm-verticals
