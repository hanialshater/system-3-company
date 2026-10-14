# Inbox: session 2 (R&D + Networks, Crowds, and Markets vertical)

Branch: `ccr-rnd-ncm`. Session 1 folds these into `company/ops/board.json` and `company/ops/progress.md`.
Newest entry at the top.

## NCM batch 1: slugs and build status (for session 1's dedupe; updated 2026-10-14)

Scope agreed with session 1: session 2 finishes batch 1 only (S2-01..S2-23). No batch 2 from session 2.

| Slug | E&K ch | Domain | Brief file | Spec | Build |
|---|---|---|---|---|---|
| mild-preferences-sharp-divides | 4 §4.5 | economics | economics.markets.md | yes (existing) | building |
| the-giant-appears | 2 | probability | probability.chance.md | no | building |
| news-comes-from-acquaintances | 3 | math | math.discrete.md | no | building |
| enemy-of-my-enemy | 5 | math | math.discrete.md | no | building |
| penalty-kick-mix | 6 | economics | economics.markets.md | no | building |
| new-road-slower-trip | 8 | cs | cs.systems.md | in progress | waiting on spec |
| bid-what-its-worth | 9 | economics | economics.markets.md | no | building |
| prices-sort-the-buyers | 10 | economics | economics.markets.md | in progress | waiting on spec |
| web-bow-tie-reach | 13 | cs | cs.systems.md | no | building |
| one-good-link-beats-many | 14 | cs | cs.algorithms.md | no | building |
| two-said-blue | 16 | probability | probability.statistics.md | no | building |
| below-critical-mass | 17 | economics | economics.markets.md | no | building |
| same-songs-different-hits | 18 | probability | probability.chance.md | in progress | waiting on spec |
| cluster-stops-the-cascade | 19 | math | math.discrete.md | in progress | waiting on spec |
| few-shortcuts-shrink-the-world | 20 | probability | probability.chance.md | no | building |
| contact-order-matters | 21 | life | life.health-epidemiology.md | in progress | waiting on spec |
| agenda-picks-the-winner | 23 | math | math.discrete.md | no | building |

All E&K section numbers are unconfirmed (book site blocked from session 2). If session 1 publishes content/courses/ncm/chapters.json, session 2 will correct the references from it.

## Board items (proposed moves and new items)

### Networks, Crowds, and Markets vertical review (principal-pm-verticals, 2026-10-14)
Source: `company/rituals/records/2026-10-14-vertical-review-ncm.md` §3. Each brief item reads "Brief <slug> (concept, E&K ch/§, result and format in the record's §3 Asks)". Every brief carries `curriculum.references` to `easley-kleinberg-2010`. The CM re-checks the answer in node and confirms the § against the PDF.

- **W-137** (principal-pm-verticals) → done. The review record and `company/product/verticals/networks-crowds-markets.md` are written.
- **S2-01** · Brief news-comes-from-acquaintances (math:weak-ties-local-bridges, ch. 3 §3.1–3.2, single card) · owner: cm-math-discrete
- **S2-02** · Brief enemy-of-my-enemy (math:structural-balance, ch. 5 §5.1–5.2, single card) · owner: cm-math-discrete
- **S2-03** · Brief cluster-stops-the-cascade (math:threshold-cascade, ch. 19 §19.2–19.3, single card with Step; needs a design-lead ruling, see S2-19) · owner: cm-math-discrete
- **S2-04** · Brief agenda-picks-the-winner (math:condorcet-cycle, ch. 23 §23.3, single card) · owner: cm-math-discrete
- **S2-05** · Brief the-giant-appears (probability:giant-component, ch. 2 §2.2, simulation run) · owner: cm-probability-chance
- **S2-06** · Brief few-shortcuts-shrink-the-world (probability:small-world-shortcuts, ch. 20 §20.2, simulation run) · owner: cm-probability-chance
- **S2-07** · Brief same-songs-different-hits (probability:rich-get-richer, ch. 18 §18.3–18.4, simulation run, needs a spec; MusicLab needs a human source check) · owner: cm-probability-chance
- **S2-08** · Brief two-said-blue (probability:information-cascade, ch. 16 §16.2–16.5, simulation run) · owner: cm-probability-statistics
- **S2-09** · Brief penalty-kick-mix (economics:mixed-strategy-equilibrium, ch. 6 §6.7–6.8, single card) · owner: cm-economics-markets
- **S2-10** · Brief bid-what-its-worth (economics:second-price-auction, ch. 9 §9.4, single card) · owner: cm-economics-markets
- **S2-11** · Brief prices-sort-the-buyers (economics:market-clearing-prices, ch. 10 §10.3–10.4, single card with step, needs a spec) · owner: cm-economics-markets
- **S2-12** · Brief below-critical-mass (economics:network-effects-tipping, ch. 17 §17.2–17.3, single card) · owner: cm-economics-markets. Also add the ch. 4 §4.5 reference to the brief mild-preferences-sharp-divides.
- **S2-13** · Brief new-road-slower-trip (cs:braess-paradox, ch. 8 §8.1–8.2, before/after, needs a spec; cm-economics-markets checks the game framing) · owner: cm-cs-systems
- **S2-14** · Brief web-bow-tie-reach (cs:web-bow-tie, ch. 13 §13.3–13.4, single card; Broder 2000 needs a human source check) · owner: cm-cs-systems
- **S2-15** · Brief one-good-link-beats-many (cs:pagerank, ch. 14 §14.3, single card with step) · owner: cm-cs-algorithms
- **S2-16** · Brief contact-order-matters (life:contact-timing-concurrency, ch. 21 §21.6, storyboard/scrub, needs a spec) · owner: cm-life-health-epidemiology
- **S2-17** · Add the ch. 4 §4.5 reference to the brief schelling-on-new-york · owner: cm-geography-people-places
- **S2-18** · Confirm the 14 existing-lesson reference rows (record §0 table), then add `curriculum.references` entries. Metadata only. Skip vaccinate-at-the-peak until its fatal verdict clears · owner: demo-builder (after the category leads cm-cs, cm-economics, cm-life, cm-probability and cm-ai confirm)
- **S2-19** · Ruling: is cluster-stops-the-cascade (a deterministic threshold cascade, ≤ 12 nodes) a single card or ABM? After two hand-built network lessons pass design review, write the UI concept `company/design/concepts/network-stage.md` · owner: design-lead
- **S2-20** · Specs for new-road-slower-trip, prices-sort-the-buyers, same-songs-different-hits, cluster-stops-the-cascade and contact-order-matters (once each brief exists) · owner: interaction-designer
- **S2-21** · NCM learning path in book order (14 referenced lessons + batch 1), with chapter deep links · owner: personalization-lead
- **S2-22** · Event or field for arrival from a course or chapter link (the vertical's audience signal) · owner: analytics-steward
- **S2-23** · Founder decision: approve the Networks, Crowds, and Markets vertical and the batch-1 budget (16 briefs, 5 specs, about 16 builds, about 4.1M builder tokens). Add to `company/ops/founder-inbox.json` · owner: founder (filed by the chief of staff)

### Earlier items

- **W-161** (vp-rnd) → done. See decision `company/decisions/2026-10-14-evolution-stop-rule.md`.
- **NEW** (owner: rnd-lead): write `company/rnd/evolution/knots-gen2-brief.md` per §4 of that decision. Then dispatch knots gen 2 (3 rnd-engineers in worktrees) and record `knots-gen2.md` with the stop-rule table.
- **W-162** (rnd-lead): keep drafting the EDD. Send it to the principal engineer only after gen-2 selection, or with gen1-force if gen 2 slips more than 2 days past dispatch.

## Handoffs

### 2026-10-14: fact-checker (Ingrid), Pass NCM-1 on same-songs-different-hits, contact-order-matters, new-road-slower-trip

- **What changed.** Set status, checkedBy and checkedOn on every claim in the three meta.json files. Appended a "FACT-CHECK ... (pass NCM-1, session 2)" note to each source. Wrote `company/reviews/<slug>/2026-10-14-fact-check.md` § Pass NCM-1 for all three. Not committed. Demo.tsx, board, progress and events not touched.
- **Counts.** songs 8/0/0 (verified/disputed/withdrawn). contact-order 6/1/0. new-road 10/0/0.
- **Dispute (blocks contact-order-matters).** c5: the reveal says "A diagram of who met whom overstates who can be reached" as a rule, but the stage's own Overlap and A->E-from-A cases reach exactly what the diagram shows. Fix: "overstates" -> "can overstate" in the Demo.tsx reveal and the c5 text. Owner: demo-builder. Then fact-checker re-checks c5.
- **Advisory (not blocking).** same-songs: the stage rule line "Pick chance = appeal x (1 + earlier picks)" gives a weight as a chance. Suggest "∝" or "Pick weight" (demo-builder).
- **Sources.** MusicLab (Science 311(5762): 854-856), Morris & Kretzschmar (AIDS 11(5): 641-648, PMID 9108946) and Braess (Unternehmensforschung 12: 258-268) were confirmed through search-quoted abstracts and records. The primaries are unreachable through the proxy. E&K sections remain `section_unconfirmed`.
- **Belief.** High on all model claims: I re-ran code extracted verbatim from Demo.tsx, and Braess also has a dominance proof. Medium on the three sources.

### 2026-10-14: fact-checker (Ingrid), Pass NCM-1 on five NCM lessons

- **What changed.** Set every claim's status, checkedBy and checkedOn in the meta.json files for web-bow-tie-reach, one-good-link-beats-many, two-said-blue, few-shortcuts-shrink-the-world and news-comes-from-acquaintances. Appended a "FACT-CHECK ... (pass NCM-1)" note to each source. Wrote `company/reviews/<slug>/2026-10-14-fact-check.md` § Pass NCM-1 for all five. Not committed.
- **Counts.** bow-tie 7/0/0 (verified/disputed/withdrawn). PageRank 7/0/0. two-said-blue 6/1/1. small-world 8/0/0. weak-ties 4/0/1.
- **Dispute (blocks two-said-blue).** c4: the reveal prints "(1 in 9)" for every accuracy, but its first paragraph quotes the accuracy run most. At 80% or 60% the figure is wrong (1 in 25 and about 1 in 6). Fix: "(1 in 9 when clues are right 2 in 3)", or compute it from ACCS[q]. Owner: demo-builder.
- **Withdrawn (not learner-facing).** two-said-blue c8: Anderson & Holt 1997 was a laboratory experiment, not a classroom one. weak-ties c5: Granovetter's 16.7/55.6/27.8 agree in secondary sources only, because the primary was unreachable.
- **Other fixes.** news-comes-from-acquaintances: move curriculum `section` 3.1/3.2 to `section_unconfirmed`; strong triadic closure is likely in §3.2, unconfirmed (builder/cm-math). few-shortcuts: the objective's "more than half" is wrong for 5 links (47%) (cm-probability). The rest are advisories in the records.
- **Belief.** High on every simulation and derivation: I re-ran the lessons' own model.ts and re-typed the graphs. Medium on the sources. The proxy blocks the primary papers and the E&K book, so these were checked through search-quoted abstracts and catalogue records. No E&K section number is confirmed.
- **Proposed board items.** demo-builder: fix two-said-blue c4 and the news reference fields. cm-probability: correct the few-shortcuts objective. fact-checker: re-check c4 after the fix. Human or egress: confirm the E&K sections and Granovetter p. 1371 when cornell.edu is reachable.

### 2026-10-14: fact-checker, pass NCM-1 (5 NCM lessons)

- **What changed.** Set claim status (checkedBy fact-checker, checkedOn 2026-10-14) in the meta.json of mild-preferences-sharp-divides (8 verified), penalty-kick-mix (4 verified, 1 disputed), bid-what-its-worth (7 verified), below-critical-mass (6 verified, plus 2 unrecorded learner-visible sentences recorded as new unverified claims c7 and c8) and agenda-picks-the-winner (4 verified). Wrote `## Pass NCM-1` in `company/reviews/<slug>/2026-10-14-fact-check.md` for each. No Demo.tsx, board, progress or events edits. Not committed.
- **Blocking.** penalty-kick-mix c1 is disputed: the claim text (shown in the trust sheet) describes the payoffs the wrong way round ("0.9 or 1.0 if he dives the wrong way to the left"; on the stage the 0.9-1.0 cell is the keeper diving right on a left kick). The numbers are right. The fix is the claim text only. below-critical-mass c7 ("even a product worth buying fails") and c8 (recall "because the product is worth less to later people") need rewording and sourcing by the builder. Exact wording suggestions are in each review file.
- **Sources.** Schelling 1971, J. Math. Sociol. 1(2): 143-186, doi:10.1080/0022250X.1971.9989794: correct, confirmed via search-indexed secondary records (the publisher, DOI resolver and Crossref were blocked here). E&K sections: Cambridge-TOC snippets via search corroborate 4.5, 6.7/6.8, 9.4, 17.2/17.3; 23.3 was not reproducible. I opened no page directly, so every `section_unconfirmed` stays as is.
- **Belief.** High on every simulation and derivation number (re-run from the lessons' own code; Schelling over seeds 1-500). High-but-secondary on the bibliographic details.
- **Proposed board items.** demo-builder: fix penalty-kick-mix c1 text and below-critical-mass c7/c8 (copy + claims), then ask for a fact-check re-pass. cm-economics-markets / cm-math-discrete: promote E&K sections once someone reads the CUP TOC directly.

### 2026-10-14: design-lead (Ines), S2-20 design review of the five NCM specs

- **What changed.** Wrote `company/design/reviews/2026-10-14-design-review-ncm-specs.md` and added a status line at the top of each of the five specs. Amended rulings condition 3 (parameter chips = threshold or start set; after a final run a chip shows its final state) in `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md`. Added the bipartite-matrix variant to the network-diagrams rule in `company/design/formats.md`. Not committed.
- **Verdicts.** All five are approved with changes: new-road-slower-trip (3), prices-sort-the-buyers (4; the grid is accepted and the node-link fallback rejected), same-songs-different-hits (2; QA skipping disabled controls is confirmed in the QA contract spec's step 3 and by herd-immunity's passing QA), cluster-stops-the-cascade (5; start chips and the final-state chip rule accepted), contact-order-matters (4; A/E buttons, the Overlap drawing and the E two-way milestone accepted). There is one cross-cutting rule: legends use inline SVG swatches drawn from the stage code, not Unicode glyphs.
- **Belief.** High that the QA paths and the format choices hold (checked against the harness code). Medium on geometry: the SVGs could not be rendered here, so I checked the coordinates in the spec text. The pill and outline collisions I found in the cascade spec suggest the builders must check at 390 px.
- **Proposed board moves.** S2-20 → done. New item per lesson, builders: build to the spec plus the review changes, citing the review in build.md. New item, visual-designer + accessibility-reviewer: build-time design review of the 3 network-stage lessons, the accessibility checks listed in each spec, and whether to add the swatch rule to system.md. New item, learning-designer: confirm the contact-order two-way payoff and reveal lines, and check the prices rule-line shortening.

- 2026-10-14 cm-life-health-epidemiology (Umar): brief contact-order-matters updated to the interaction designer's spec (Overlap rule in claim 3, A/E person buttons, 1/k! marked not on the stage); node re-run matches (E→A from A 1; A→E 4; Overlap 4 from A and E). Not committed.

- 2026-10-14: cm-math-discrete (Chiara), brief 3 cluster-stops-the-cascade fixed per Rafael's spec: edge count 14 (7 path + 7-8 + 6), synchronous-update rule stated, interaction line defers to the spec and the design-lead ruling; node re-run: 8 of 12 round 6, 12 of 12 round 8, 298 sets / 132 incomplete / 0 contradictions; only math.discrete.md edited, not committed.

### 2026-10-14: interaction-designer (Rafael), S2-20 specs cluster-stops-the-cascade and contact-order-matters

- **What changed.** Wrote `company/design/specs/cluster-stops-the-cascade.md` + `.svg` (4 frames) and `company/design/specs/contact-order-matters.md` + `.svg` (4 frames). Re-ran both briefs in node with each spec's exact rule and simulated each QA path.
- **cluster-stops-the-cascade** (single card with Step, network stage, per the design-lead rulings §1–2). DOM: 12 person buttons (0–7, 9, 10, 11, 8; a tap shows "adopted friends / friends" on that person only), then Step, To the end, chips "Start 8,9", "Start 0,1". The QA path ends on start 0,1 final: 8 of 12, round 6, holdouts 8–11 outlined, pill "1/4" on 8. Both milestones are reached. 24 stage words. **Needs the design lead to accept two points:** (a) start chips replace the ruling's threshold chips (the brief fixes q = 1/2, and threshold chips would teach a different lesson); (b) after a final run, the other chip shows that set's final state (ABM comparison default), not round 0, because otherwise the QA path cannot run both sets. Brief problem: the graph has 14 edges, not 13 (7-8 omitted from the count); the numbers hold. The ruling's sample "7 of 12 · round 3" is really 8 of 12 · round 6.
- **contact-order-matters** (storyboard / scrub). Dated timeline (rows A–E, days 0–4). DOM: Day slider, Day 4, chips A→E, E→A (default), Overlap, person buttons A, E. The QA path reaches the answer (E→A, only B) on its 2nd press and ends on Overlap from E, all 4 reached. 3 milestones. 24 stage words. Brief problems: Overlap timing was undefined (the spec fixes it: meets every day 1–4, no same-day relay); from A Overlap looks the same as A→E, so the two-way milestone needs E; the brief's control list lacked the first-case control (2 added, 7 controls); the 1/k! stretch is not reachable on the stage.
- **Belief.** High on the numbers and QA paths (node). Medium on legibility: the "1/4" pill meaning and the 16-link Overlap ladder at 390 px go to the accessibility reviewer.
- **Proposed board moves.** S2-20: both specs → design review (cascade: the design lead approves, chaired by the visual designer with the accessibility reviewer). cm-math-discrete: fix the edge count. cm-life-health-epidemiology: adopt the Overlap rule in claim 3. Learning designer: confirm the two-way milestone and the reveal lines.

### 2026-10-14: interaction-designer (Rafael), S2-20 specs: new-road-slower-trip, prices-sort-the-buyers

- **What changed.**
  - New specs, each with a wireframe: `company/design/specs/new-road-slower-trip.{md,svg}` and `company/design/specs/prices-sort-the-buyers.{md,svg}`.
  - Both use the interim network stage (`company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2).
  - I re-ran both briefs in node with the exact rule each spec discloses.
- **new-road-slower-trip.**
  - Format: before/after toggle with step-run.
  - Controls: Before · After · Switch 1,000 · Run.
  - QA end state: After, all 4,000 drivers on the new route, 80 vs 85. Stage words: 23.
  - Brief problems for cm-cs-systems:
    1. The node check says the new route takes 20 + s/100 and is faster while s < 9,000. It should be 40 + s/100 and s < 5,000. The conclusion does not change.
    2. A 0 to 4,000 slider gets two arrow presses on the QA path and lands on 1,000, so the slider was replaced by Step (Switch 1,000) and Run.
    3. The 2,000 milestone is not on the QA path, so it is optional and not gating.
- **prices-sort-the-buyers.**
  - Format: single card with step-run.
  - Controls: Restart · Raise · Run · Compare.
  - QA end state: prices (3,1,0), match x–a, y–c, z–b, total 23, and the six totals with 23 ringed. Stage words: 23.
  - The bipartite graph is drawn as a 3 × 3 grid (K3,3 adjacency with the edge values in the cells). This departs from §2's node-link drawing; the design lead rules on it in review.
  - Brief problem for cm-economics-markets: the question says "raise any group" but must say "the smallest group". Under "largest group" a stops at $4, and under "every group" the prices never stop.
- **Belief.** High on the numbers (node). Medium on the grid departure and the 25-word fit until design review.
- **Proposed board items.**
  - cm-cs-systems: fix the N1 check-line typo.
  - cm-economics-markets: fix the prices-sort-the-buyers question wording.
  - design-lead (review chaired by visual-designer with the accessibility reviewer, per the 2026-10-14 rulings): design review of both specs.
  - mockup-artist: mockups from both wireframes after review.
  - S2-20 stays open for same-songs-different-hits, cluster-stops-the-cascade and contact-order-matters.

### 2026-10-14: interaction-designer (Rafael), S2-20 spec same-songs-different-hits

- **What changed.** Wrote `company/design/specs/same-songs-different-hits.md` + wireframe `.svg` (3 frames: predict, all 1,000 on, QA end off; bars are the real seed 1–8 results). Simulation run, 8 small multiples (2 × 4, 80 × 70 px) at 390 px, per the design-lead ruling. Controls in DOM order: "+100 listeners", "All 1,000", chips "On" / "Off" (group "Copy others"). QA path ends on copying off at 1,000 with the summary "Best song's lowest finish: on 7th · off 2nd" = the brief's key state. 23 stage words.
- **Belief.** High on the numbers: re-ran the spec's exact rule (one draw per listener, cumulative scan songs 1–8, finish = 1 + strictly more) in node; it reproduces the brief exactly. Medium on legibility of 6.5 px bars; visual designer to check.
- **Brief problems (minor).** Robustness block stats (73% / 38% / 98%) have no stated seed rule; with seeds 1000 + 8b + j I get 70.2% / 36.8% / 98.2%. Fine for notes; state the rule if ever a claim. Copying off at 100 listeners is noisy (best song 3rd–4th), so the reveal quotes only 1,000-listener states (the spec enforces this via the summary line).
- **Proposed board moves.** S2-20: same-songs-different-hits spec → design review (design lead approves). Then builder (probability chance) may build; S2-07's MusicLab human source check still gates claim 4.

### 2026-10-14: cm-math-discrete (Chiara), NCM batch 1 briefs (S2-01 to S2-04)

- **What changed.** Appended four briefs to `company/domains/briefs/math.discrete.md` (section "Networks, Crowds, and Markets, batch 1"): news-comes-from-acquaintances, enemy-of-my-enemy, cluster-stops-the-cascade, agenda-picks-the-winner. Added four concepts (subarea discrete) to `content/curriculum/math.json`: weak-ties-local-bridges, structural-balance, threshold-cascade, condorcet-cycle. Every answer re-run in node.
- **Proposed board moves.** S2-01, S2-02, S2-04 -> done (brief written, answer checked; "ready to build" in the default format). S2-03 -> done for the brief, but build blocked on S2-19 (design-lead ruling) and S2-20 (spec). Suggested build order: 1, 2 (the two hand-drawn network stages), then 3, with 4 any time.
- **Open.** E&K section numbers are unconfirmed (the Cornell site returned a proxy 403). The Granovetter 1973 percentages (claim 4 of brief 1) need a human source check; the Condorcet 1785 and Cartwright-Harary 1956 attributions need the fact-checker. Brief 1's Granovetter claim is kept out of learner text until checked.

### 2026-10-14: cm-economics-markets (Rhea), NCM batch 1 briefs S2-09 to S2-12

- **What changed.** Appended "Networks, Crowds, and Markets, batch 1" to `company/domains/briefs/economics.markets.md`: penalty-kick-mix, bid-what-its-worth, prices-sort-the-buyers, below-critical-mass, each with a node-checked answer and a `curriculum.references` line. Added the ch. 4 §4.5 reference to `mild-preferences-sharp-divides`. Added four concepts (subarea markets) to `content/curriculum/economics.json`. Also checked the Braess game framing for cs-systems (in the same file, last section): holds, no change.
- **Belief.** High: the numbers (re-run in node). Medium: § numbers, all unconfirmed (book fetch 403). Changed from the ask: below-critical-mass uses starts of 18% and 25%; second-price dominance is weak (a whole-dollar grid makes $71 tie), so the card says "never worse"; clearing prices (3,1,0) are the lowest, not unique.
- **Proposed board moves.** S2-09, S2-10, S2-12 → ready for build (default formats). S2-11 → blocked on S2-20 (interaction-designer spec). Penalty-kick Palacios-Huerta 2003 claim needs a human source check or omission.

### 2026-10-14: cm-life-health-epidemiology (Umar), brief for S2-16

- **What changed.** Appended brief `contact-order-matters` (storyboard/scrub, answer B: reversed order reaches 1 person) to `company/domains/briefs/life.health-epidemiology.md`. Added concept `contact-timing-concurrency` to `content/curriculum/life.json` and tagged `network-clustering-spread` with subarea health-epidemiology.
- **Proposed board moves.** S2-16 -> done (brief written, numbers re-run in node). S2-20 stays open for interaction-designer on this brief. S2-18 note: the six life references (herd-immunity, immunity-eats-r, spreaders-are-rare, epidemic-overshoot, waves-return; vaccinate-at-the-peak later) are confirmed on fit by me, § still unconfirmed. Fact-checker: Morris and Kretzschmar 1997 needs a human source check.
- **Belief.** High on the arithmetic; medium on §21.6 (book fetch blocked, 403).

### 2026-10-14: principal-pm-verticals (Selin), vertical review of Networks, Crowds, and Markets (W-137)

- **What changed.**
  - New strategy doc `company/product/verticals/networks-crowds-markets.md`. It covers the audience, the job to be done, the 24-chapter portfolio table, the batch 1, formats, metrics, kill criteria, budget and the verdict.
  - New review record `company/rituals/records/2026-10-14-vertical-review-ncm.md` with sections 0–4. The asks (slug, concept, ch/§, checked result, format) are in §3, and 9 objections with answers are in §4.
  - Proposed board items S2-01…S2-23 are above.
  - I did not touch board.json, progress.md, events.jsonl, the founder inbox or `src/demos`.
- **Picture.**
  - 0 of 24 chapters are referenced today.
  - 14 existing lessons already teach a chapter result (BFS, PD, Bayes, SIR, branching, waning, lemons, Condorcet jury, externality, commons) and should take references, not new lessons.
  - The Schelling pair (ch. 4) is briefed.
  - Batch 1 adds 16 lessons and brings coverage to 19 of 24 chapters (20 with Schelling). Chapters 1, 11, 12 and 15 are left.
- **Belief.**
  - **High:** the chapter-to-concept mapping and the arithmetic in the asks. I re-ran it in node: giant component, small world, cascade wrong rate of about 20%, penalty mix, PageRank, tipping at 0.2/0.8, clearing prices (3,1,0), Braess 65 → 80.
  - **Medium:** the § numbers. They were written from the table of contents, because the book fetch was blocked (403), so the CMs confirm them.
  - **Medium:** whether the network diagrams fit the 60-second budget. A pause criterion covers this.
  - **There is no market evidence.** The verdict "grow" is a proposal for the founder.
- **Next.**
  - The session lead folds S2-01…S2-23 into the board and dispatches the CMs (7 strands).
  - The design-lead rules on S2-19 before S2-03 is built.
  - The founder decides on S2-23.
  - The ritual event for vertical-review should be recorded by whoever folds this in.
- **Blocked.** Nothing. The three empirical claims (Granovetter 1973, Broder et al. 2000, Salganik et al. 2006) need a human source check before their lessons publish.

### 2026-10-14: rnd-lead (Bram), knots gen-2 brief written; ready to dispatch after one commit

- **What changed.**
  - New `company/rnd/evolution/knots-gen2-brief.md`, covering every item of decision 2026-10-14-evolution-stop-rule §4, with three verbatim engineer prompts ("Slot brief for gen2-<name>").
  - `src/lab/knots/evolve.json`: registered `gen2-ortho-force` ← [gen1-ortho, gen1-force], `gen2-force-smooth` ← [gen1-force], `gen2-ortho-round` ← [gen1-ortho]. Weights, benchWeights, budgets, mutable and tests unchanged. `evolve.mjs selftest` ok.
- **Before dispatch (session lead):** commit the brief and `evolve.json`, then create the three worktrees from that commit. The harness refuses unregistered candidates, so a worktree cut before the commit gates its engineer out.
- **Facts checked today.** The evaluator has 102 tests (gen1-force 102/102, gen1-ortho 101/102 in a scratch-archive run, seed 1). The parents' frozen files are byte-identical. random-knot entry: force 12,095 B, ortho 10,825 B. So force-smooth must cut ≥ 319 B, and the ortho slots have 951 B to the 11,776 B condition, not the 1.4 KB in the gen-1 record. Self-checks use `EVOLVE_ARCHIVE=<scratch>` so the official `knots.jsonl` stays clean.
- **One addition of mine, stated in the brief:** the internal-objective ban also covers the looks test's measure and constants, not only the bench's.
- **Belief.** Confident that the brief is complete against §4 and the commands work as written. Less sure that force-smooth can both add its three ideas and cut 319 B. That is the slot most likely to miss the bundle condition.
- **Next.** Owner: session lead or rnd-lead. Dispatch 3 rnd-engineers, then do the gate audit, ≥ 3 eval runs, the SVG looks sheet and `knots-gen2.md` with the stop-rule table.

### 2026-10-14: vp-rnd (Vera), W-161 evolution stop rule → done

- **What changed.**
  - Decision [2026-10-14-evolution-stop-rule.md](../../decisions/2026-10-14-evolution-stop-rule.md).
  - New step 6 in `company/rnd/evolution.md`.
  - Bet table in `company/rnd/README.md`: knots generation budget is now 2 left (gen 2 and gen 3, gen 3 only if gen 2 passes).
- **The rule.** Score the best candidate and the current champion in the same runs, on at least 3 fresh seeds, and count every run.
  - Paired gain g per seed.
  - The generation improves only if median g ≥ max(2% × the champion's evolvable term E, noise floor 15) and g > 0 on every seed. E is score − 100 × tests.
- **Gen 1 passed.** gen1-force against gen0-baseline on the 102-test evaluator: g = 24.95, 30.04, 45.72, so the median is 30.04 against T = 15. That is +10.3% of E.
- **Gen 2 goes ahead** with Bram's three slots. Required amendments:
  - the looks gate is stated up front in the brief;
  - the winner must keep the random-knot entry ≤ 11,776 B, so force-smooth must shrink it by ≥ 319 B, not 150 B;
  - gen2-ortho-round may not use force relaxation;
  - NOTES.md must name every internal objective, and copying the evaluator disqualifies the candidate;
  - gen1-force is re-scored in every run;
  - the record includes rendered pictures.
- **Belief.** Confident that the old rule was unusable and that gen 1 cleared any sensible rescaling. Moderately confident that 15 points is the right floor: it rests on 6–7 seeds.
- **Proposed board items.**
  - **W-161** → done.
  - **NEW, owner rnd-lead:** "Write knots-gen2-brief.md per decision 2026-10-14-evolution-stop-rule §4, then dispatch gen 2 (3 rnd-engineers, worktrees) and write knots-gen2.md with the stop-rule table."
  - **W-162** stays with rnd-lead, re-titled in effect: draft the EDD now, but send it to the principal engineer only after gen-2 selection, or with gen1-force if gen 2 slips more than 2 days past dispatch.


### 2026-10-14: cm-probability-statistics (Hugo), batch 1 brief for S2-08

- **Done.** Appended brief `two-said-blue` (information-cascade, simulation run, answer B: about 1 in 5) to `company/domains/briefs/probability.statistics.md`. Added concept `information-cascade` (core, demand 2, prerequisite `bayesian-updating`) to `content/curriculum/probability.json`. Re-ran in node: exact 20.0%, seeded 1,991 of 10,000, pooled-vote contrast 0.0199%.
- **Proposed board moves.** S2-08 → ready (brief written, answer checked). No S2-20 spec needed for this lesson. Fact-checker: confirm the book § numbers (unconfirmed, fetch blocked) and the Anderson and Holt 1997 claim, or drop it.

### 2026-10-14: cm-cs-algorithms, NCM batch 1

- **What changed.** Appended brief #41 `one-good-link-beats-many` (concept `pagerank`, ch. 14 §14.3, § unconfirmed: book fetch 403) to `company/domains/briefs/cs.algorithms.md`. Added concept `pagerank` (subarea algorithms, prerequisite `graph-shortest-path`) to `content/curriculum/cs.json`.
- **Belief.** High that the numbers are right (re-run in node, exact rule in the brief). The review's Y = 0.395 was not reproducible from its description; the brief uses Y = 0.374, X = 0.053 on a graph it specifies. Medium on the § and on whether the 10-node graph with arrows fits 390 px.
- **Proposed board moves.** S2 item for cm-cs-algorithms's ask: brief written, move to done (owner cm-cs-algorithms). New: interaction-designer to check the 10-node arrowed layout at 390 px (owner interaction-designer); fact-checker to confirm ch. 14 §14.3 and the Brin and Page citation against the PDF (owner fact-checker). Needs no spec.

### 2026-10-14: cm-cs-systems (Elena), briefs for S2-13 and S2-14

- **What changed.** Two briefs appended to `company/domains/briefs/cs.systems.md` ("Networks, Crowds, and Markets, batch 1"): `new-road-slower-trip` (before/after toggle, answer 80 min) and `web-bow-tie-reach` (single card, answer 7 of 12). Two concepts added to `content/curriculum/cs.json` (`braess-paradox`, `web-bow-tie`, subarea systems). I re-ran both in node. `npm run check` passes. Not committed.
- **Belief.** High on the numbers (Braess: unique equilibrium over every integer s, 65 -> 80, a deviator gets 85; bow-tie: reach counts 7/10/8/3/2/1/1/2/1). Low on § numbers: the book site and the Wayback copy returned proxy 403, so all are "§ unconfirmed". Broder 2000 percentages (about 28/21/21 of about 203M pages) and Braess 1968 citation need a human source check.
- **Proposed board moves.**
  - S2-13 -> done (brief written; `new-road-slower-trip` still needs the S2-20 spec; cm-economics-markets to check the game framing).
  - S2-14 -> done (brief written; Broder claims go to the fact-checker).
  - NEW, owner demo-builder or fact-checker: confirm the § numbers for ch. 8 and ch. 13 against the free PDF before `curriculum.references` is written.

### 2026-10-14: design-lead (Ines), ruling on S2-19 (cascade format, network stage)

- **What changed.** New `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md`. In `company/design/formats.md`, added two bullets under "Rules for every format" (the ABM boundary test and the network-stage pointer). No format was added or removed.
- **Rulings.**
  - (a) `cluster-stops-the-cascade` is a **single card with Step** on the network stage. It is **not ABM**, so the Schelling-only limit stands and no exception is needed. Boundary test: ABM only if > 20 agents or a grid world, re-rolled randomness, or an outcome read off an aggregate metric. `same-songs-different-hits` is a simulation run, not ABM. Spec conditions are in §1 of the ruling: ≤ 12 fixed nodes, fixed seeds, ≤ 3 threshold chips plus Step and To the end, the blocking cluster outlined at the end.
  - (b) Interim network-stage rules (§2): ≤ 12 tappable nodes (20 display-only, above that untapped texture), ≤ 10 tappable edges via midpoint handles, 44 px hits ≥ 48 px apart, K5 needs radius ≥ 135 (node check), state shown by fill, shape and line style before colour, ≤ 3 node states, single-character node names, a ≤ 6-word legend, and the QA path taps every node and edge button.
  - Kit: built by hand in news-comes-from-acquaintances and enemy-of-my-enemy. After both pass design review (chaired by the visual designer with the accessibility reviewer, not me), I write `concepts/network-stage.md`. Then the design engineer and platform engineer build `NetworkStage`, and the principal engineer reviews it (tier 2). Later network lessons are not blocked; they build by hand to §2.
- **Proposed board moves.** S2-19 (a) → done. Split (b) into NEW (design-lead): write `company/design/concepts/network-stage.md` after both pair lessons pass design review. NEW (visual-designer + accessibility-reviewer): chair the design reviews of the pair against §2. NEW (design-engineer, then principal-engineer review): the `NetworkStage` kit component after the concept exists. S2-20: the cascade spec follows the ruling's §1. S2-03: the brief names the format "Single card with Step (network stage)".
- **Belief.** High on (a). Medium on the 12/10 numbers: they are geometry checks, not yet seen on a real contact sheet. The first pair's review is the test.

### 2026-10-14: cm-probability-chance (Gaia), NCM batch 1 briefs (S2-05, S2-06, S2-07)

- **What changed.** Three briefs appended to `company/domains/briefs/probability.chance.md` under "Networks, Crowds, and Markets, batch 1": the-giant-appears, few-shortcuts-shrink-the-world, same-songs-different-hits. Three concepts added to `content/curriculum/probability.json` (subarea chance). All numbers re-run in node (mulberry32).
- **Changed from the ask.** (1) Giant component at degree 1.5: 59.1% (my G(n,m) rule), not 57%. (2) The prediction asks about 100 to 200 links (18% to 74% in seed 1), not four chips. (3) same-songs: the ask had no model. I built one (8 songs, appeal 1.0 to 1.7, 1,000 listeners, pick chance = appeal x (1 + earlier picks)). "How many worlds the best song wins" does not separate copying from not copying (4 of 8 both ways), so the prediction is the best song's lowest finish (7th with copying, 2nd without, seeds 1 to 8). (4) Small world adds shortcuts, it does not rewire as Watts-Strogatz do. (5) The random-link threshold is Erdős-Rényi, not derived in ch. 2.
- **Belief.** High on the numbers (reproduced, with seed ranges). Medium on the same-songs prediction: it is pinned to seeds 1 to 8 and robust in 500 blocks (73% give a 5th or lower), but a builder who changes the rule must re-run it. Low on § numbers: book site blocked (403), all unconfirmed.
- **Proposed board moves.** S2-05, S2-06, S2-07 → done (briefs written). S2-07 also needs S2-20 (interaction-designer spec: 8 small multiples at 390 px). Source checks for the fact-checker: Salganik et al. 2006, Watts and Strogatz 1998, Erdős and Rényi 1960, and all three § numbers. Suggested reference-only entry for the ch. 18 §18.2 pointer: `average-that-never-settles` (already in S2-18).

- 2026-10-14: cm-economics-markets (Rhea), prices-sort-the-buyers: question and claims now say "the smallest set" (node re-run: smallest ends (3,1,0), a stops at $3; largest (4,2,1); every set never stops); only economics.markets.md edited, per interaction-designer finding (S2-20).

- 2026-10-14: cm-cs-systems, N1 new-road-slower-trip: node check fixed to 40 + s/100 and s < 5,000 (re-run in node; equilibrium 4,000 at 80 unchanged) and interaction aligned to Switch 1,000 + Run with the 2,000 milestone optional; only cs.systems.md edited, per interaction-designer finding (S2-20).

### 2026-10-14 · rnd-engineer · W-145 knot data provenance (unblocks W-162)

- **What changed:** new `src/lab/knots/provenance/`. It holds `sources.mjs` (typed-in DT codes, Conway 322 for 7_5, and braid
  words for the three links, each cited), `derive.mjs` (a dependency-free generator plus `iso`, a diagram-isomorphism check),
  the generated `table.derived.mjs` (same format as `table.mjs`, no U10), `derive.test.mjs` (7 tests pass) and `README.md`
  (licences, sources per entry, method, verification output, recommendation). One pointer line was added to `PRIOR-ART.md`.
  Nothing in `table.mjs`, `test/`, `bench.mjs`, `evolve.json` or `candidates/` was touched. Nothing was committed by me.
- **What I believe:**
  - Every derived entry is the **same oriented diagram** as the current one (relabelled only). Crossing number, writhe,
    Alexander and Jones are equal, and `layout()` crossing positions are identical up to similarity. Very sure: this is
    tested by `iso` and the invariants.
  - In a scratch swap, the fixed evaluator passes 102/102 with the derived table plus the old U10 line. It fails only the 4
    U10 tests without it.
  - No permissive licence exists for any knot table I could check. Spherogram, snappy_manifolds and Regina are GPLv2+, and
    database_knotinfo (the KnotInfo snapshot) is GPL; I quoted all four. KnotInfo's and the Knot Atlas's own terms are
    **unverified**, because the hosts are 403'd by the egress proxy.
  - Disclosed: 10_8's DT code is KnotInfo's value, read from the GPL-packaged snapshot because my memory was wrong. The
    others were typed from memory, then cross-checked there.
- **Recommendation:** re-derive, don't cite. Promote `table.derived.mjs` as the kit `table.mjs` (import path `./core.mjs`).
  Drop U10 from the kit and keep it only in the lab bench (`test/benchdata.mjs` MONSTER). I found no own-code hard
  unknot in about 95k seeded searches.
- **Proposed board items:**
  - (rnd-lead) Remove or replace the 4 U10/`monster-unknot` tests and published row for the kit test suite, and decide on
    benchdata's copied 3_1/4_1 PD codes.
  - (principal-engineer) W-162 promotion uses `provenance/table.derived.mjs`. Optionally, write a decision record: "short
    notations of individual knots are cited facts".
  - (rnd-lead) When egress allows, verify KnotInfo's and the Knot Atlas's licence pages and the published origin of the
    monster unknot.
- **Blocked:** web verification of the KnotInfo and Knot Atlas licences (egress policy 403).
