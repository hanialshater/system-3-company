# Inbox: session 2 (R&D + Networks, Crowds, and Markets vertical)

Branch: `ccr-rnd-ncm`. Session 1 folds these into `company/ops/board.json` and `company/ops/progress.md`.
Newest entry at the top.

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
