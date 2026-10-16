# Networks, Crowds, and Markets: coverage

owner: cm-course-ncm (Jonah) · refreshed 2026-10-16 against `src/demos` at cdee168c · map `content/courses/ncm/chapters.json` · briefs `company/courses/ncm/briefs.md` · vertical strategy (decides order): `company/product/verticals/networks-crowds-markets.md`

**Coverage is an input metric.** It counts which demo-able sections have a lesson. It says nothing about whether learners recall, finish or value anything, and it is not Surface Value. The WBR reports it next to learner results (7-day recall, path completion), never instead of them (head-of-product, 2026-10-14). The denominator is sections I marked demo-able myself; each `demoable: false` has its reason in `chapters.json` for a strand manager or Selin to spot-check at vertical review.

The first-map tables (2026-10-14: 16 built, 31 batch 1, 59 briefed) and the ranked gap list are gone from this file because every one of those briefs is now built. They are in git history (`git show cdee168c:company/courses/ncm/coverage.md`).

## Today (2026-10-16)

| | Count |
|---|---|
| Sections in the map (exercises omitted) | 156 |
| Demo-able | 110 (106 from the first map + 4.2, 9.2, 17.6, 23.2 re-judged in wave J) |
| Covered by a built lesson (any status) | **106 of 110 = 96.4%** |
| Covered by a published lesson | **91 of 110 = 82.7%** |
| Gap: demo-able, no lesson | 4 (4.2, 9.2, 17.6, 23.2), each with a build-ready brief |
| Not demo-able | 46 (reason in `chapters.json`; 19.6 now also records the retired brief) |
| Lessons in the map | 90: 75 published, 14 review, 1 draft |

- **NCM-referenced lessons** (`curriculum.references` cites `easley-kleinberg-2010`; `node tools/meta.mjs coverage --work=easley-kleinberg-2010`): **70: 56 published, 13 review, 1 draft** (schelling-on-new-york, hidden until claim c10b is verified). The map's other 20 lessons teach a chapter result but have no reference row yet (S2-18 below, board W-413 and W-508); 19 of them are published and vaccinate-at-the-peak is in review.
- **The 13 review lessons** are the whole gap between "built" and "published": weak-links-hold-it-together (3.3), cut-the-busiest-link (3.6), enemies-allow-three-camps (5.4), penalty-kick-mix (6.7, 6.8), selfish-routes-cost-a-third-more (8.3), only-the-needed-trader-profits (11.6), outside-option-sets-the-split (12.5), patience-wins-the-split (12.9), pay-for-the-harm-you-do (15.3, 15.4), cluster-stops-the-cascade (19.2, 19.3), bridge-carries-news-not-habits (19.4), agenda-picks-the-winner (23.3) and who-pays-same-filter (24.1, a second concept: loaf-with-smoke already covers the section). A parallel fact-checker run owns their claims. If all 13 publish, published coverage is 106 of 110 (96.4%).
- **To finish:** publish the 13 (fact-checker, then the publish gate) and build the 4 re-judged briefs. Then it is 110 of 110, built and published. The 9 other claimable wave J briefs add concepts inside covered sections and do not move this number.
- **Map fixes in this refresh:** `batch1` status removed (batch 1 merged with PR #3); `briefed_wave_j` folded into `covered_by` (built) or `briefed_not_built`; two stale slugs that were renamed at build removed (mutual-friends-add-up-slower → one-circle-fewer-introductions in 4.4; the-line-takes-up-to-half → the-grid-takes-up-to-three-eighths in 19.7); two built lessons that were missing from the map added (two-pages-swallow-the-rank in 14.3, who-pays-same-filter in 24.1); `not_yet_published` added per section.
- **Belief:** high on the counts (recount with `node company/courses/ncm/checks/coverage-count.mjs`, which also flags any map row that has drifted from `src/demos`; it printed "map in sync" at this refresh). Medium on the four re-judged sections being what the book's 4.2, 9.2, 17.6 and 23.2 actually stress, because the book host is still blocked.

## By chapter

| Ch | Title | Sections | Demo-able | Covered by a built lesson | Covered by a published lesson | Gap (no lesson) | Covered only by a lesson in review |
|---|---|---|---|---|---|---|---|
| 1 | Overview | 2 | 0 | 0 (n/a) | 0 (n/a) | – | – |
| 2 | Graphs | 4 | 2 | 2 (100%) | 2 (100%) | – | – |
| 3 | Strong and Weak Ties | 6 | 5 | 5 (100%) | 3 (60%) | – | 3.3, 3.6 |
| 4 | Networks in Their Surrounding Contexts | 5 | 4 | 3 (75%) | 3 (75%) | 4.2 | – |
| 5 | Positive and Negative Relationships | 5 | 4 | 4 (100%) | 3 (75%) | – | 5.4 |
| 6 | Games | 10 | 9 | 9 (100%) | 7 (78%) | – | 6.7, 6.8 |
| 7 | Evolutionary Game Theory | 5 | 4 | 4 (100%) | 4 (100%) | – | – |
| 8 | Modeling Network Traffic using Game Theory | 3 | 3 | 3 (100%) | 2 (67%) | – | 8.3 |
| 9 | Auctions | 7 | 6 | 5 (83%) | 5 (83%) | 9.2 | – |
| 10 | Matching Markets | 6 | 5 | 5 (100%) | 5 (100%) | – | – |
| 11 | Network Models of Markets with Intermediaries | 7 | 2 | 2 (100%) | 1 (50%) | – | 11.6 |
| 12 | Bargaining and Power in Networks | 9 | 7 | 7 (100%) | 5 (71%) | – | 12.5, 12.9 |
| 13 | The Structure of the Web | 5 | 2 | 2 (100%) | 2 (100%) | – | – |
| 14 | Link Analysis and Web Search | 6 | 3 | 3 (100%) | 3 (100%) | – | – |
| 15 | Sponsored Search Markets | 9 | 6 | 6 (100%) | 4 (67%) | – | 15.3, 15.4 |
| 16 | Information Cascades | 7 | 6 | 6 (100%) | 6 (100%) | – | – |
| 17 | Network Effects | 7 | 6 | 5 (83%) | 5 (83%) | 17.6 | – |
| 18 | Power Laws and Rich-Get-Richer Phenomena | 7 | 5 | 5 (100%) | 5 (100%) | – | – |
| 19 | Cascading Behavior in Networks | 7 | 5 | 5 (100%) | 2 (40%) | – | 19.2, 19.3, 19.4 |
| 20 | The Small-World Phenomenon | 7 | 4 | 4 (100%) | 4 (100%) | – | – |
| 21 | Epidemics | 8 | 7 | 7 (100%) | 7 (100%) | – | – |
| 22 | Markets and Information | 10 | 5 | 5 (100%) | 5 (100%) | – | – |
| 23 | Voting | 11 | 8 | 7 (88%) | 6 (75%) | 23.2 | 23.3 |
| 24 | Property Rights | 3 | 2 | 2 (100%) | 2 (100%) | – | – |
| | **Total** | **156** | **110** | **106 (96.4%)** | **91 (82.7%)** | **4** | **15** |

## Briefs open (2026-10-16)

Full table with strand-file numbers in `company/courses/ncm/briefs.md` § "Status 2026-10-16".
- **Section gaps, build-ready (4):** same-picture-two-histories (4.2, probability.statistics #72), price-tag-or-auction (9.2, economics.markets #27), worth-something-alone (17.6, economics.markets #26), the-swap-that-goes-in-circles (23.2, math.discrete #13). Numbers re-run by `node company/courses/ncm/checks/rejudged-four.mjs`.
- **Concept briefs in covered sections, claimable (9):** friends-of-friends-overlap, new-friend-loosens-the-circle, one-link-back-grows-the-core, two-big-groups-stay-apart, drivers-stop-switching, your-clue-against-two-picks, two-cents-empties-the-network, does-going-first-help, keenest-buyer-takes-the-other-flat. They do not move section coverage.
- **Held (1):** payoffs-set-the-threshold (r5 fail, W-1393, cm-math), in `company/ops/brief-skips.json`.
- **Retired (1):** protest-needs-a-shared-view (19.6), 2026-10-16, ruling in briefs.md J3. The proposed concept `math:collective-action-knowledge` is withdrawn from `content/curriculum/math.json`.
- **Section coverage is saturated as a metric.** After the 4 gaps, more NCM lessons can only add concepts inside covered sections. Per plan-to-2000 (W-555) section briefing stops after wave J; the next vertical review should read learner results.

## Session 2's branch (origin/ccr-rnd-ncm at 61f01320): delta against main

Checked 2026-10-16 by extracting the branch's `src/demos`, `company` and `content` (git archive; no merge, the branch has no merge base with main here).
- **Lessons on the branch but not on main: none.** All 656 branch lessons exist on main. For the 50 NCM lessons on the branch, main's version is equal or newer in every case (for example four-in-a-row-two-thirds v3 → v5, enemies-allow-three-camps v3 → v6), every non-meta file (Demo.tsx and the rest) is identical wherever the version is equal, and no claim status on the branch is ahead of main's.
- **Briefs on the branch but not on main: none.** The branch's `company/courses/ncm/briefs.md` has the 51 first-map briefs, all on main; main adds the 16 wave J briefs. No NCM brief in the branch's strand files is missing from main. The vertical doc is identical.
- **Status differences, all with main ahead:** most NCM lessons are `draft` or `review` on the branch and `published` or `review` on main. schelling-on-new-york is `review` (v4) on the branch and `draft` (v4) on main; main's `draft` is deliberate (hidden until c10b is verified), so the branch's status must not come back.
- **Recommendation: drop.** Nothing NCM-related on the branch needs landing.

## How the book was acquired
- cs.cornell.edu and the PDF mirrors return a proxy 403 from this environment, so I did not read the book.
- The table of contents comes from three sources: `content/works.json` (24 chapter titles), web-search snippets, and my own knowledge of the 2010 edition.
- **Confirmed by a snippet (number and title):** 2.1, 3.1, 3.2, 3.5, 3.6, 6.10 (the Berkeley-hosted draft PDF and the GMU chapter-2 PDF; URLs in `chapters.json`).
- **Corroborated number only:** 15.9 (subject), 20.3, 21.7.
- **Everything else is `confirmed: false`**, 150 of 156 sections. Exercise sections are omitted. Per head-of-product, `curriculum.references` rows cite the chapter only and keep the section in `section_unconfirmed`. Confirming them needs someone with the book (open: the founder can allow the host).
- **Belief:** high on chapter titles (works.json); medium-high on section titles and order (a widely used book, and the snippets matched my list wherever they showed anything); medium on exact section numbers in the late chapters (15, 22, 23), where off-by-one errors are most likely.

## S2-18: proposed reference rows for existing lessons (chapter only)

**Status 2026-10-16:** still not applied. 20 map lessons have no `easley-kleinberg-2010` row, so the coverage tool lists 70 lessons, not 90. Board W-413 and W-508 (demo-builder) carry it. The rows below are unchanged from 2026-10-14; vaccinate-at-the-peak is now `review`.
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
