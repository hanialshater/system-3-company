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

- 2026-10-14 fact-checker (Ingrid), Pass NCM-5 on the 17 NCM batch-1 lessons: **7 claims verified, 0 disputed, 1 re-attested.** Verified: cluster-stops-the-cascade c6, one-good-link-beats-many c5 c8, mild-preferences-sharp-divides c5, bid-what-its-worth c4, prices-sort-the-buyers c10, same-songs-different-hits c10. Re-read enemy-of-my-enemy c3 against the new reveal (names the learner's unbalanced trios): it stands (node, all 3,125 camp labelings: unbalanced exactly when the trio spans three camps). Method: current Demo.tsx at HEAD 3e1fb604, re-ran each rule in node via tsx, traced every reveal sentence to a gated or pinned state or a claim. No unbacked reveal sentence found. Now no open claims in any of the 17 (news-comes-from-acquaintances c5 and two-said-blue c8 stay withdrawn). Two non-blocking advisories for demo-builder: one-good-link-beats-many c8 names rounds 2 and 51 but para 2 quotes whatever round the stage shows (true, on stage); the mild-preferences "unsettled households" total counts household-ticks (at most 6% above distinct households). Records: "## Pass NCM-5" in company/reviews/<slug>/2026-10-14-fact-check.md for those 7 slugs. No fresh walkthroughs (transcripts predate these commits; evaluators should re-run them). Demo.tsx, board, progress and events untouched; nothing committed. Belief: high (all deterministic re-runs).

- 2026-10-14 head-of-product (Priya): told-vs-shown rulings appended to `company/decisions/2026-10-14-told-vs-shown.md` ("rulings on four NCM batch-1 lessons"). below-critical-mass **launch**: the brief asks *that*, not *why*; the value-below-price sentence is claimed context. prices-sort-the-buyers **launch**: both doesNotKnow items are shown and gated; "lowest prices" and "for any values" are told universals, allowed. enemy-of-my-enemy **revise**: name the unbalanced trios on the stage (e.g. "ADE · BDE · CDE" under the readout) and have the reveal point at the learner's own three-camp trios. same-songs-different-hits **revise**: gate a copying-on 100-listener checkpoint through the existing +100 control, and add one reveal sentence comparing early and final rank (node: world 3's best song is 7th at 100 and 7th at 1,000). Clarification recorded: universals are told context when their mechanism is shown. Proposed board items: demo-builder for the two revises (learning-designer on the same-songs gate wording), then fact-checker for the new claims. Lessons, board, progress and events untouched; nothing committed.

- 2026-10-14 rnd-lead (Bram): promoted fix1-bigon into `src/lab/knots` (draw.mjs, index.d.ts, NOTES.md; warning about leaderboard top was expected). Lab tests 103/103, `npm run test:kit` 97/97, lab draw.mjs equals kit draw.mjs except imports. NOTES.md paths to measure-bigons.mjs fixed. Width gate NOT adopted (no re-score needed); decision and revisit trigger at the end of `company/rnd/evolution/knots-fix1.md`. src/kit, board, progress, events untouched; nothing committed.

- 2026-10-14 cm-math-discrete (Chiara): consult on knot pictures done, section "cm-math-discrete consult" in `company/design/reviews/2026-10-14-knot-pictures.md`. fix1-bigon 3_1 signed off for tricolour-check (asks T1-T4: colour by kit arc index, watch the top-left gap, non-hue arc labels, never say "lobe" to learners) and 3_1/4_1 for unknot-game (ask U1: 4_1's right crossing is at the view-box edge, pad for 44 px taps; every single crossing change unknots both, checked in node). draw-a-table-knot: learners do NOT trace or colour arcs, so 6_1 does not need fix1's drawing. Brief added to `company/domains/briefs/math.discrete.md` ("Knots, batch 1"); concept `knot-table-names` is not yet in math.json. Block (b) still needs design conditions 1d.1/1d.2 (rnd-lead, principal-engineer). Board, progress, events, src untouched; nothing committed.
### 2026-10-14: fact-checker (Ingrid), Pass NCM-3 on the 17 NCM batch-1 lessons
- Checked all 17 claims still `unverified` in 8 lessons, re-running the current code in node via tsx, and re-read every predict, stage label and reveal sentence in all 17 lessons against the claims (diffed since the NCM-2 record, 319d2bda). **Result: 15 verified, 2 disputed, 0 withdrawn.** Counts: below-critical-mass 1 verified + 1 disputed (c10 verified, c11 disputed); agenda-picks-the-winner 3 (c3-c5); web-bow-tie-reach 2 (c2, c3); one-good-link-beats-many 1 (c1) + c4 moved verified -> disputed; new-road-slower-trip 1 (c12); two-said-blue 2 (c2, c9); same-songs-different-hits 1 (c9); the-giant-appears 4 (c1, c4, c5, c7). The other 9 lessons had no open claims and no new learner-visible claims.
- **Disputes (block publish; owner demo-builder, one line each):** (1) below-critical-mass c11, reveal paragraph 2: "Right of it the curve is above the line and the share grows" is false above 80% (90% -> 82% on the stage). Fix: "Between it and 80% the curve is above the line and the share grows." (2) one-good-link-beats-many c4, reveal paragraph 1: "Y 0.374, X 0.053, the same as at round 2" contradicts round 2's Y 0.389, printed just before. Fix: "... X 0.053. X has not moved since round 2, and Y has stayed ahead." After each edit, set the claim to unverified and send it back to the fact-checker.
- Stale lines re-read: penalty-kick-mix c6 advisory resolved (kept-50 now gated at 1.00); few-shortcuts c6 source now correct (0.04 only in reveal paragraph 2, no stage mark). Both annotated, both still verified.
- Advisories (not blocking, demo-builder): two-said-blue "a plain vote would almost never be wrong" is 1.7% if 60% clues are run most (the predict defines almost never as under 1 in 100); two-said-blue "Look at crowd N on the stage" can point at an empty stage; contact-order-matters footer "In real populations ..." is stronger than c6 and its simulation source ("In models of real populations" fits).
- Records: "## Pass NCM-3" in company/reviews/<slug>/2026-10-14-fact-check.md for all 17. Note: another session's WIP commits (1884e509, 05f0a066) swept my meta.json status changes into history; I committed nothing. No fresh walkthroughs (transcripts predate v3; evaluators should re-run them). Demo.tsx, board, progress and events untouched.

- 2026-10-14 rnd-lead (Bram): fix1-bigon registered and re-scored, record `company/rnd/evolution/knots-fix1.md` (design condition 1 **met**). Moved `measure-bigons.mjs` + `renders/` out of the candidate to `company/rnd/evolution/knots-fix1/` (script gained `--table=kit`, definitions unchanged); `evolve.json` parents + `"fix1-bigon": ["gen2-force-smooth"]`, nothing else. N = 3 declared before run 1; both ids per run, official archive, load 4.55-5.72: g = -5.39 / -3.25 / -9.57, median -5.39, all spacing+spread; both 103/103, gated in. Kit derived table: 3_1 bigon 7.7 -> 23.5 (floor 20 pass), 4_1 8.3 -> 17.0 (floor 15 pass), min ratio on prime table 0.10 -> 0.28, narrowest face 6_3 4.7 -> 2.7. random-knot 11,592 B (184 under). My call: a tie under the noise-floor rule but a real small structural cost; selected fix1-bigon on the briefed width requirement; does not reopen evolution. Proposed (not made): looks-test width gate (bigon width/chord >= 0.25 on prime table knots, 3_1 >= 20, 4_1 >= 15; face width reported, not gated), needs a re-score. Proposed board items: principal-engineer (rule tier + ship fix1 draw into kit, condition 2), cm-math-discrete (trefoil consult; 6_1 task), rnd-lead (width gate decision; `promote` after condition 2). src/kit, board, progress, events untouched. `npm run check` passes. Not committed.
- 2026-10-14 design-lead (Ines): knot pictures ruled, record `company/design/reviews/2026-10-14-knot-pictures.md`. (1) Kit's current (gen2-force-smooth) 3_1 and 4_1 **rejected** for tricolour-check and unknot-game (doubled sides; arc-coloured trefoil puts two different arcs side by side on each side), so block (b) does not lift by acceptance. fix1-bigon's 3_1 and 4_1 **accepted** (three open lobes, one arc per lobe; 4_1 left side a lens); block (b) lifts with fix1-bigon once: rnd-lead registers + re-scores it with measure-bigons widths on the derived table (3_1 >= 20, 4_1 >= 15), principal-engineer rules the kit-update tier (kit README / eng review 6b say changed table drawings are tier 2, not tier 1: flagged), cm-math-discrete is consulted on the fix1 trefoil before tricolour-check ships, and each lesson's contact sheet gets a design review. Costs: bench -7.8 accepted for design (score is rnd-lead's); 6_3 thinner and already marginal, so 6_3 not cleared for any lesson under either version; random-knot pictures need their own look before block (a) lifts. (2) draw-a-table-knot: kit 5_2 accepted; kit 6_1 accepted for see/identify/count crossings, not for tracing or arc tasks (thin left lens), where fix1's 6_1 is needed; brief should say which. Proposed board items: rnd-lead (register/re-score fix1-bigon), principal-engineer (tier + kit update), cm-math-discrete (trefoil consult; 6_1 task in brief). src, board, progress, events untouched. Not committed.
- 2026-10-14 principal-engineer (Kenji): EDD-004 engineering review, record `company/rituals/records/2026-10-14-eng-review-EDD-004.md`. **Approve with conditions; the move into `src/kit/knots` is done** (force-smooth, derived table, U10 lab-only, 97/97 `npm run test:kit`, now part of `verify`; `check` and `typecheck` pass; no protected path touched). Rulings: 10_8 → (b) Conway 5 1 4 (verified in scratch); short cited notations are facts we may re-derive from (best practice 11); `.mjs` + `index.d.ts` accepted, index-only imports (deep imports fail typecheck), `types.test.mjs` keeps d.ts and runtime in step; provenance stays in the lab; phone time OK for table knots with layout-once (taps 0.1 ms), measure >12 crossings; import blocks by review, not mechanical; random-knot block not narrowed. Found and fixed: Turbopack did not tree-shake the barrel (10,310 B → 5,194 B for `{knot, draw}` with `sideEffects: false`). Conditions before any lesson imports: C1 rnd-lead 10_8 regen + kit re-copy; C2 rnd-lead lab README pointer; C3 platform-engineer `npm run verify` on the integrated tree (builds were OOM-killed at load 30-41); C4 first `layout` lesson measures phone-class time. Proposed board items: W-162 → done with conditions; W-145 → done (pending C1); new evaluation-steward: CI amendment for `test:deploy` + `test:kit`; new evaluation-steward: launch-review line for knots import blocks. Note: other sessions' WIP commits swept my in-progress files (incl. a scratch file, since removed); I committed nothing.
- 2026-10-14 cm-geography-people-places (Bodhi): brief schelling-on-new-york updated in place with all cultural-review rulings (R1 to R10: neutral equal Group A/B, claim 2 and 1 dropped, shape-only mask, edge-artefact check, reveal order, vocabulary, neutral colours + shape cue, slider wording, HOLC "associated with" with claim 10 split into 10a/b/c, conditional real-D toggle with learner probe, "Left out of this model" line, recall on the unit lesson, own toy-model claim, second review before publish) and the ch. 4 curriculum.references line (section_unconfirmed 4.5; JSON not edited). Node re-run, equal groups, hand mask, seeds 1-50, 2x2: start D 0.37-0.53 (mean 0.44), settled 0.67-0.84 (mean 0.76), 5-18 ticks, 0 unsettled; answer B holds. Edge check: a region >90% one group in 5 of 250 region-seeds (seeds 9, 18, 20, 37, 43), none at start. Script gained `equal50` mode. Build-ready except: real rasterised mask (egress) and no source read yet (fact-checker). Next: demo-builder (read the review then the brief), fact-checker for sources. Src, board, progress, events untouched. Not committed.
- 2026-10-14 head-of-product (Priya): PR #2 blocker 4 decided in company/decisions/2026-10-14-pr2-lifehacks-scope.md. Not all 200, not rejected: tranche A = the 5 anchor lessons on existing concepts (towel, bow, cord -> S3 laundry; table -> S4 fix; spaced -> S8 study), lands with no curriculum growth; tranche B = triage keepers in wave-1 strands (S3, S4, S5, S8, S11 packing), max 5 per strand incl. anchors (max 25 total), max 2 per concept, after cm-lifehacks's charter edit; S6/S7/S9/S10/S1 held on the contributor branch @ 71e99fee for their waves (brief after 2 OP cycles); office process, shop stock-keeping, UI how-tos dropped; 15 same-insight lessons transferred to economics/math/physics/cs. Curriculum at merge: our file, not the PR's; 15 concepts + `subarea` strand tags (tranche A), max 20 new idea-named concepts (tranche B); no collections file. Next: cm-lifehacks (charter edit, tags, pr2-triage.md), chief-of-staff (triage evaluators), safety reviewer (anchor-5 attestation), community-engineer (update prs/2.md §5), principal-engineer (engine catalogues). Not committed.

### 2026-10-14: fact-checker (Ingrid), Pass NCM-2 on the 17 NCM batch-1 lessons
- Re-checked all 32 claims still `unverified` after the builder's revisions in 15 lessons, from the current Demo.tsx/model code (re-run in node via tsx). Result: **32 verified, 0 disputed, 0 withdrawn.** agenda-picks-the-winner and the-giant-appears had none open; their reveals were re-read and showed no new claim. Each lesson's `company/reviews/<slug>/2026-10-14-fact-check.md` now has a "## Pass NCM-2" section. The NCM-1 fixes landed: two-said-blue c4, enemy-of-my-enemy c6 and contact-order-matters c5.
- few-shortcuts-shrink-the-world: the reveal's clustering numbers (0.500 to 0.435, random about 0.04) are no longer on the stage. They are backed by verified claims c3 and c6, so this is **not a fact-check dispute**. It is a told-only item inside the brief's gap (the objective names clustering), which counts as a revise under `company/decisions/2026-10-14-told-vs-shown.md` and matches pattern W-150. Owner: demo-builder (put a clustering readout back, or drop clustering from the objective and doesNotKnow) and evaluators. c6's source still describes a ghost mark that has been removed.
- Advisories (not blocking): penalty-kick-mix milestone `kept-50` should require 1.00 (the reveal quotes 0.750); web-bow-tie-reach should keep "the real web has this shape" attributed to Broder (Meusel et al. 2014 found the proportions depend on the crawl); same-songs "copying did not hide quality" is better as "did not stop the best song winning as often"; the cluster-stops c4 claim text slightly misdescribes the reveal's gate.
- Not done: no fresh walkthroughs. The transcripts predate these revisions, so the evaluators' next step is `npm run walkthrough`. Nothing committed.

- 2026-10-14 · principal-engineer (Kenji) · PR #2 eng review → `company/rituals/records/2026-10-14-eng-review-pr2.md`. Approve with changes.
  - (a) Drop the `meta.json` `safety` block (60 lessons, nothing reads it, and it reads as a safety verdict) and `content/collections/lifehacks-200.json`. No EDD needed.
  - (b) Engines pass the tier-1 read. Required changes:
    - add a lib↔claims verbatim drift fixture (check, not generate);
    - delete the dead `alphabet-sort-search` homeLessons entry;
    - keep `#0d0f14`, because `var(--bg)` fails contrast in light mode. This overrules item 4 of prs/2.md's draft reply.
  - (c) `test:lifehacks` in verify is accepted. Wall time, verify summary and first-load JS for one Home and one Resource page are owed at re-integration.
  - Proposed board items:
    - community-engineer: relay required changes 1–5 and 7 to the contributor, and name the engine captions in the safety batch briefs;
    - design-engineer: add an `--on-fill` token and sweep the 63 `#0d0f14` uses (tier 1).
  - Belief: high on the rulings, medium on the bundle cost (not measured).

### 2026-10-14: cm-geography-people-places (Bodhi), node check of schelling-on-new-york

- **What changed.** Brief 1 in `company/domains/briefs/geography.people-places.md` updated in place (check, redesigned prediction and answer, 11 claims, format note, 9 cultural-review questions). New script `company/domains/briefs/checks/schelling-nyc-check.mjs` (self-test reproduces abm.ts exactly). Board, progress, events and src untouched. Not committed.
- **Result.** The original question (model D above or below the real city's) is not fair: D on the settled model world runs 1.00 to 0.38 across block sizes, and a random start already scores 0.45 to 0.49 on 2 x 2 blocks. Redesigned: "how segregated does the random start look?" Answer B, about 0.5 (settled about 0.8). Threshold not tuned.
- **Believe.** High on the model numbers for the hand mask; medium that they hold on the real mask (re-run needed). Real D, Census shares, mask data all unverified: egress to data.cityofnewyork.us and Brown returned 403, and no search tool was available. With 61/39 shares, 29 of 50 seeds do not settle in 60 ticks.
- **Next.** cultural-reviewer answers the question list; fact-checker reads Census and Brown; builder gets the real mask (needs egress) and re-runs the check; S2-17 reference to ch. 4 added in the brief text only (curriculum.references still to do).

- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B1 (25 home lessons) reviewed at source level: 24 pass, 1 pass with changes (`drying-room-water-load`: add ventilation line, reword the mould disclaimer), 0 fail; 8 warning-class lessons keep existing guards; no `safety` block in any meta.json; records at company/reviews/<slug>/2026-10-14-safety.md and company/reviews/lifehacks-200/safety-B1-2026-10-14.md. No walkthrough run. Not committed.
- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B4 (25 study lessons) reviewed at source level: 25 pass, class none, no warnings, 0 changes; records at company/reviews/<slug>/2026-10-14-safety.md and company/reviews/lifehacks-200/safety-B4-2026-10-14.md. No walkthrough run. Not committed.
- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B6 (15 study + 10 resource lessons) reviewed at source level: 25 pass, 0 changes; one International flag (lh-cents-euros-conversion: 100 subunits is wrong for KWD/BHD/OMR). Records at company/reviews/<slug>/2026-10-14-safety.md and company/reviews/lifehacks-200/safety-B6-2026-10-14.md. No walkthrough run. Not committed.
- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B7 (25 resource lessons) reviewed at source level: 22 pass, 3 pass with changes (lh-duty-cycle-energy, lh-fixed-energy-charge, lh-idle-versus-active: add stage line "Tariffs and appliance ratings vary: check your own."), 0 fail; records at company/reviews/<slug>/2026-10-14-safety.md and company/reviews/lifehacks-200/safety-B7-2026-10-14.md. No walkthrough run. Not committed.
- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B5 (25 study lessons) reviewed at source level: 25 pass, class none, no warnings, 0 changes; region flags (ISO date order, Friday weekend, Gmail operators) in company/reviews/lifehacks-200/safety-B5-2026-10-14.md; per-lesson records at company/reviews/<slug>/2026-10-14-safety.md. No walkthrough run. Not committed.
- 2026-10-14 lifehacks-safety-reviewer (Sana): PR #2 batch B2 (25 home lessons) reviewed at source level: 25 pass, class none, 0 changes; records at company/reviews/<slug>/2026-10-14-safety.md and company/reviews/lifehacks-200/safety-B2-2026-10-14.md. No walkthrough run. Not committed.

### 2026-10-14 · session 2 operator · NCM batch 1 built and revised; knots gen 2 closed; PR #2 taken over
- **Changed:**
  - **NCM batch 1:** all 17 lessons are built, fact-checked (pass NCM-1), learner-reviewed and revised. Status stays `review`; nothing is published.
  - **Knots:** the stop rule was rescaled (decision record). Gen 2 ran with 3 candidates; gen2-force-smooth was selected and evolution is closed (VP ruling). W-145 provenance is resolved by a re-derived table (src/lab/knots/provenance/).
  - **E&K references** cite the chapter only, with `section_unconfirmed` (head-of-product rule).
- **Believe:**
  - High that every number in the lessons was re-run from their code.
  - Medium that the revisions fix the learner findings; NCM-2 re-check and re-review are running.
  - The cross-lesson "correct option always in the middle" pattern was fixed in the revised lessons.
- **In flight:**
  - fact-check pass NCM-2 on changed claims;
  - qa-tester walkthroughs and QA records for 16 lessons;
  - learner re-review next;
  - rnd-lead W-162: crossing-change test, re-score, promote, EDD-004. The principal-engineer review follows.
- **Open, for session 1 / other owners:**
  - E&K section numbers need a human with the book; the book host is blocked here.
  - Feed spec W-136 still fails under QA_ONLY.
  - Design review is owed for the network-stage pair (news, enemy) and ABM run timing (2.4 s vs 400 ms).
  - The □○ glyphs in the Schelling rule line break the swatch rule.
  - Kit: reveal frames scroll the top of the stage off-screen on phones.
- **PR #2 (Life Hacks 200):** the founder said "we fix it ourselves", and session 1 handed all blockers to session 2. The first step, merging the contributor branch into ccr-rnd-ncm, was blocked by the safety guard (untrusted code integration). It is waiting on the founder's choice.


### 2026-10-14: vp-rnd (Vera), ruling on knots gen 2

- **What changed.** Appended "## VP ruling" to `company/rnd/evolution/knots-gen2.md` and updated the knots row in `company/rnd/README.md`. Not committed. Board, progress and events not touched.
- **Ruling.**
  1. **Selection: accepted (gen2-force-smooth), on different grounds from the record's.** On paired score it is a tie with ortho-force (median +0.37, 3/5 seeds). It wins outside the score: it is the only candidate that honours the briefed crossingChange API, it fixes wiggle, and it is 158 B smaller.
  2. **Stop.** The rule fails for force-smooth (+12.32 < 15). No gen 3, on layout or on simplify. Knots evolution is closed.
  3. **W-162 conditions before `promote`:**
     - the crossing-change test, with L2a1 among its cases;
     - a re-score addendum on ≥ 3 seeds, every run counting. If force-smooth fails the test, promotion comes back to the VP;
     - the EDD carries the defects, classified, plus the extra-crossing rate measured on ≥ 1,000 random-knot seeds and unloaded draw times.
  4. **The looks fix is a follow-up, not a promotion condition.** But imports are blocked:
     - random-knot, until the extra crossings are fixed or a planarity check is used;
     - tricolour-check and unknot-game (3_1/4_1), until the bigon fix lands or the design lead accepts the picture.
- **Every run counts: honoured.** I checked it against `knots.jsonl`: 25 records, 5 complete contiguous runs, no orphans. N = 5 was fixed after run 1 was seen, which is legal. A clarification for evolution.md is in the ruling: declare N before the first run.
- **Belief.**
  - High: the arithmetic (recomputed) and the stop verdict.
  - Medium-high: the selection.
  - Medium: whether the import blocks are proportionate. The extra-crossing rate at lesson parameters is not yet measured.
- **Proposed board items.**
  - **rnd-lead (W-162):** carry out the conditions in (3) of the ruling.
  - **rnd-lead:** the looks/extra-crossings follow-up EDD, one rnd-engineer, not a generation. Also add the rule clarification to `company/rnd/evolution.md`.
  - **design-lead (cm-math-discrete consulted):** accept or reject force-smooth's 3_1 and 4_1 for tricolour-check and unknot-game.
  - **principal-engineer / evaluation-steward:** decide whether the import blocks become mechanical.
  - **vp-rnd:** R&D Review for the knots status change.
  - **Kudos** (whoever may write events.jsonl): vp-rnd → rnd-lead, "flagged the ortho-force stop-rule conflict openly instead of taking it", ref `company/rnd/evolution/knots-gen2.md`.

### 2026-10-14: rnd-lead (Bram), knots gen-2 selection

- **What changed.**
  - Wrote `company/rnd/evolution/knots-gen2.md`: scores, gate audit, looks, the crossing-change bug, selection, the stop-rule table and the W-162 recommendation.
  - Wrote 20 SVGs in `company/rnd/evolution/knots-gen2-looks/`.
  - Appended 25 official records to `company/rnd/evolution/knots.jsonl`: 5 `eval` runs, fresh seeds, every run counted.
  - Not committed. No edits to board.json, progress.md or events.jsonl. The "eval" session guard did not fire.
- **Result.**
  - All 3 candidates gated in. No disqualification.
  - Winner by the brief's rule (highest median score): **gen2-force-smooth**, at 10,559.12. gen2-ortho-force had 10,555.79 and gen1-force 10,541.81.
  - **Stop rule: fail.** Median g against gen1-force is +12.32 < T = 15, though positive on 5/5 seeds. No gen 3.
  - Flagged for the VP: ortho-force would pass (median g +21.07, 5/5) if selected against the score on looks. I declined. The looks are split (ortho-force draws better table knots; force-smooth draws better random knots and has no wiggle), and both calls that would lead to a pass were mine. Reasons are in the record, "Selection".
- **Crossing-change bug: confirmed, and wider than reported.**
  - gen0 and gen1-force fail on almost every table knot.
  - gen1-ortho, gen2-ortho-force and gen2-ortho-round fail on the Hopf link only: the inferred orientation of a 2-edge component flips.
  - gen2-force-smooth passes everywhere.
  - Decision: a test (its text is in the record) enters at promotion, not in gen 2, with a re-score addendum.
- **Ruling:** gen2-ortho-round's "reduced alternating" branch is not allowed under this evaluator. On this bench it is a table detector. It becomes allowable once the bench samples reduced alternating diagrams outside the table.
- **Belief.**
  - High: the scores and the bug.
  - Medium: the looks judgement and the choice not to override the score.
  - force-smooth's flattened trefoil bigons are a real lesson risk.
- **Proposed board items.**
  - **vp-rnd:** check the stop-rule table in knots-gen2.md and either accept "stop, promote gen2-force-smooth" or overrule the selection (see "If gen 3 runs").
  - **rnd-lead:**
    - W-162. Add the crossing-change test to `src/lab/knots/test/draw.test.mjs`, re-score the survivors (addendum), `evolve.mjs promote knots gen2-force-smooth`, and send the EDD to the principal engineer with the known defects (flattened bigons on 3_1/4_1, the Hopf lens, rare hull-overlap crossings, slowness under load).
    - The record also lists 3 more evaluator gaps.
  - **cm-math (or design-lead):** before any lesson imports the library, judge whether force-smooth's trefoil (`knots-gen2-looks/gen2-force-smooth--3_1.svg`) is acceptable for tricolour-check and unknot-game.
  - **Kudos** (whoever may write events.jsonl): from rnd-lead to the gen2-force-smooth rnd-engineer, "found and fixed the stored-layout/crossingChange bug that had lived in the library since gen 0, and proposed the test", ref `company/rnd/evolution/knots-gen2.md`.

### 2026-10-14: fact-checker (Ingrid), Pass NCM-1 on cluster-stops-the-cascade, enemy-of-my-enemy, prices-sort-the-buyers

- **What changed.** Set status, checkedBy and checkedOn on all 23 claims. Appended a FACT-CHECK note to the source of enemy c6. Wrote `company/reviews/<slug>/2026-10-14-fact-check.md` § Pass NCM-1 for all three. Not committed. Demo.tsx, board, progress and events not touched.
- **Counts.** cascade 9/0/0 (verified/disputed/withdrawn). enemy 5/1/0. prices 8/0/0.
- **Dispute (blocks enemy-of-my-enemy).** c6 says the balance theorem "is due to Cartwright and Harary (1956)". Harary proved it first (Michigan Math. J. 2: 143-146, 1953). The C&H 1956 citation details are correct. Fix: reveal paragraph 3 -> "(Harary, 1953; Cartwright and Harary, 1956)", and the claim text to match. Owner: demo-builder. Then fact-checker re-checks c6.
- **Advisory (prices, not blocking).** The recall "why" line "y values b most" is not recorded in any claim; suggest adding it to c4 (demo-builder).
- **Sources.** The E&K ch. 19 cluster theorem and the ch. 10 existence/optimality/auction results were confirmed via search-quoted secondary sources. The book PDF, the mirrors and the primary papers are 403 through the proxy. E&K sections stay `section_unconfirmed`.
- **Belief.** High on all simulation and enumeration claims: I re-ran code copied from each Demo.tsx, ran an exhaustive cluster-theorem check on all 4,095 seed sets, and proved that (3,1,0) is the lowest clearing price. Medium-high on the source attributions.

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

### 2026-10-14 · fact-checker · the-giant-appears Pass NCM-1

- **What changed:** all 6 claims in `src/demos/probability/the-giant-appears/meta.json` set to verified (checkedBy fact-checker, 2026-10-14). Record: `company/reviews/the-giant-appears/2026-10-14-fact-check.md`. No disputes. Demo.tsx, board, progress, events untouched; nothing committed.
- **What I believe:** model.ts re-run (and an independent re-implementation) reproduces 9/36/110/148/183 and the 20-seed means; Erdős-Rényi 1960 citation (Publ. Math. Inst. Hung. Acad. Sci. 5: 17-61) confirmed; large-n share at c = 2 is 79.68%. Very sure.
- **Still open:** Easley and Kleinberg section stays `section_unconfirmed` (2.2). Optional builder tweak: add "usually" to the reveal's first mechanism sentence.

- 2026-10-14 · lifehacks-safety-reviewer · PR #2 batch B8 (25 resource lessons) safety source-read done: 19 pass, 6 pass with changes, 0 block. Summary: company/reviews/lifehacks-200/safety-B8-2026-10-14.md. Next: demo-builder applies the listed changes; second reader rechecks wording.

### 2026-10-14 · rnd-lead (Bram) · W-162 knots promotion: test, re-score, promote, EDD-004

- **What changed:**
  - Added the crossing-change test (strands, not just positions; asserts that L2a1 is in the case set) to `src/lab/knots/test/draw.test.mjs`. The evaluator now has 103 tests.
  - Re-scored on 3 fresh seeds, N declared before run 1, every run counts, load recorded (14.9 → 12.0). force-smooth passed 103/103 on all 3 (10,651.50 / 10,667.62 / 10,665.65). gen1-force, ortho-force and ortho-round were gated out (102/103) on all 3. The addendum "Promotion re-score" is in `company/rnd/evolution/knots-gen2.md`.
  - Measured the extra-crossing rate and draw times (same addendum).
  - Ran `node tools/evolve.mjs promote knots gen2-force-smooth`. It copies only into `src/lab/knots`: draw.mjs, index.d.ts, NOTES.md. Nothing went to `src/kit`. The lab passes 103/103 and provenance 7/7.
  - Wrote `company/engineering/edd/EDD-004-knots-kit.md`.
  - Added the VP's rule clarification to `company/rnd/evolution.md` (declared N; ties).
  - Updated the lab README status and added a dated addendum to `provenance/README.md`.
  - Added kit renders `company/rnd/evolution/knots-gen2-looks/kit-derived-table--*.svg`.
- **What I believe:**
  - Extra crossings at the random-knot lesson's settings: **0 of 10,000 seeds** (95 % upper bound 0.038 %). Very sure of the number: the counter reproduces the bench's −3 exactly.
  - The same defect hits **2.5 % of disguised braid closures** (diagrams after moves; the champion: 0.6 %) and 0.9 % of projected polygons. So the block stays until a planarity check or fix exists.
  - Unloaded draw time is 1.2 ms (3_1), 1.5–2.3 ms (5_2) and 4.3–6.3 ms (`randomKnot(3)`). The −16.96 slow penalty was mostly load (15.8 ms at load 1.65 against > 116 ms at load 35), but force-smooth is about 1.6× the champion's time.
  - New finding: with force-smooth, the derived table draws **5_2 and 6_1 differently** from the lab table (the layout depends on labelling). Both are readable; I looked.
  - 10_8 can come from Conway 5 1 4 through the existing 4-plat, giving the same diagram (`iso`, rev [0]). That removes the snapshot-read DT code if the principal engineer wants it.
- **Next:**
  - principal-engineer: review EDD-004; rule on the kit location, `.mjs` in a TS kit (`allowJs: false`), the 10_8 options (a/b/c, I recommend b), kit tests in `verify`, and phone timing (§4d).
  - design-lead: the 3_1/4_1 bigon acceptance (with cm-math-discrete, for tricolour-check), and a glance at the kit's 5_2 picture.
  - rnd-lead after the ruling: 10_8 → Conway in `sources.mjs` if (b); the follow-up EDD for bigons and extra crossings when a lesson needs it.
- **Proposed board items** (I did not edit board.json):
  - W-162 → review, owner principal-engineer (EDD-004).
  - W-145 → resolved by EDD-004's provenance section, pending the 10_8 ruling.
  - New (design-lead): "Accept or reject force-smooth's 3_1/4_1 picture for tricolour-check and unknot-game; consult cm-math-discrete" (EDD-004 defect b).
- **Not done / blocked:** nothing written to `src/kit` (tier 2; awaits review). No commit from me. The calling session's commits (from 8c23bc4e on) already contain all of this work except this handoff.
- **Kudos proposed** (no events.jsonl write): the gen-2 rnd-engineer for force-smooth, whose crossing-change fix and test were exactly right. The VP's tie ruling made the EDD's selection basis honest.

### 2026-10-14: visual-designer (Kiri), build-time design review of the network pair and the ABM reference

- **Record:** `company/design/reviews/2026-10-14-design-review-network-pair.md`. Verdicts: news-comes-from-acquaintances approved with changes (N1-N8); enemy-of-my-enemy approved with changes (E1-E5); mild-preferences-sharp-divides changes required (M1-M6, Run replay 2.4 s vs 400 ms is the blocker; the glyph rule is already met, the SVG `G` component draws the swatches).
- **Believe.** Pair passes the rule of two once the changes land; no need to tighten §2.1. Reconciled constants (node r 16, handle r 13, 44 px hit, legend 14 px SVG swatches) are in the record for `network-stage.md`. The news `sheet.png` on disk is the stale v1 build; I judged from code (v2), so N8 asks for a re-check of the regenerated sheet. Dark-mode screenshots not seen (token arithmetic only). Fairly sure of the geometry (computed), medium on the accessibility items (rulings go to the accessibility reviewer).
- **Next.** builders fold in N/E/M changes (M5 and N1 touch CSS: platform-engineer ships, not me); design-lead writes `network-stage.md` after re-check and decides A1-A3 amendments; accessibility-reviewer takes the "Handed to" list. Board not edited, as asked. Nothing committed.
- **lifehacks-safety-reviewer, B3 (PR #2, 25 slugs):** 25 pass, 0 changes, 0 fail (source-and-text review, no walkthrough). Records: `company/reviews/<slug>/2026-10-14-safety.md`; summary `company/reviews/lifehacks-200/safety-B3-2026-10-14.md`. Launch-review conditions: wobbly-table caption, tote and weight-spread "no safe load limit" caption, wet-knit care-label line. Nothing committed.

- 2026-10-14 · cultural-reviewer · schelling-on-new-york pre-build review done: verdict BUILD MAY PROCEED WITH CONDITIONS. Record: company/reviews/schelling-on-new-york/2026-10-14-cultural-review.md. Key rulings: use neutral Group A/B, equal numbers, drop claim 2 (Q1); shape-only mask, no borough labels, seeds 1-50 borough-uniformity check (Q2); reveal order = unit, model, then discrimination/HOLC/income in the same block, "associated with" kept (Q3, Q7); ban "unhappy", "mild", "minority", "divided" for the city (Q4, Q6); shape not hatching, no group on --warn/--bad/--good (Q5); real D NOT acceptable as drafted, show apart from the model's D with unit contrast and a learner probe or drop it (Q8). Next: category manager records rulings in the brief and splits claim 10; then builder; second cultural review of the walkthrough required before publish. Brief, src, board, progress, events untouched; nothing committed.

- 2026-10-14 · rnd-lead (Bram) · EDD-004 conditions C1 and C2 done (record: company/rituals/records/2026-10-14-eng-review-EDD-004.md). C1: 10_8 in src/lab/knots/provenance/sources.mjs is now `conway: [5, 1, 4], w: -2, rev: [0]` (cite C70, R76, BZ, KI); `derive.mjs --write` changed only the 10_8 line of table.derived.mjs; re-copied to src/kit/knots/table.mjs with the README `sed` (diff = that one line). Checked against the old DT-derived entry: `iso` plane +1, crossings +1, no reversal; c 10, writhe −2, Jones and Alexander equal; `identify` → [10_8, mirror false]. Provenance tests 7/7, `npm run test:kit` 97/97, lab evaluator 103/103, `npm run check` passed (655 lessons, 1 pre-existing warning), `npm run typecheck` exit 0 (load ~32, not OOM-killed). Provenance README: 10_8 row, a dated update note, stale tense fixed. C2: pointer block in src/lab/knots/README.md (kit = shipped copy, lab = evolution workspace; lab table.mjs still has the old codes). Not done by me: C3 verify (platform-engineer), C4 phone timing (platform-engineer + builder). Note: my uncommitted edits were swept into commit 25410224 ("WIP … agent still running", author rnd-lead) by another process; I made no commit (same pattern as review finding F7). Board/progress/events untouched.

- 2026-10-14 · principal-engineer (Kenji) · Design condition 2 (knot pictures) ruled: shipping fix1-bigon's drawing into the kit is **tier 2** (it changes table drawings; the handoff's "tier 1" overruled), discharged by **EDD-004 Addendum A** (design + review in one, no new EDD, no ADR). Shipped: `src/kit/knots/draw.mjs` byte-identical to the candidate, fix1's one doc hunk in `index.d.ts`; kit output JSON-identical to the candidate on 21 KNOTS + randomKnot(1..50). `npm run test:kit` 97/97, `npm run check` passed (655 lessons, 2 pre-existing warnings), `npm run typecheck` exit 0 (load ~3, not killed). Measured on the kit: random-knot 11,542 B (234 under the 11,776 condition), +213..+218 B per entry; `layout` 5-10 % slower. Kit README: status, changelog, stability note (addendum route for EDD-004 follow-ups), sizes, block (b) **still active** (lifts per lesson: tricolour-check after cm-math-discrete's trefoil consult + design contact-sheet review; unknot-game after its contact-sheet review), 6_3 not cleared, random-knot needs a design look before block (a) lifts. Engineering index updated. Note: draw.mjs and index.d.ts were swept into another session's commit 283c4c22 ("Fact-check pass NCM-3") before the addendum/README existed (F7 pattern again); README/EDD/index edits are uncommitted. Next: rnd-lead runs `node tools/evolve.mjs promote knots fix1-bigon` now (expect the not-top warning) so lab = kit. Board/progress/events untouched; nothing committed by me.

- 2026-10-14 · fact-checker (Ingrid) · Pass NCM-4: below-critical-mass c11, one-good-link-beats-many c4 and two-said-blue c9 all re-run from current code and checked against the current reveal text: **verified** (checkedBy fact-checker). c11: next(s) below the diagonal at 0.81/0.9/1.0, so the bounded reveal is right. c4: X exactly 0.05325 from round 2, Y ahead in rounds 2-51. c9: plainWrong 1.676%, 0.0199%, 5.2e-12 for 60%, 2/3, 80% (matches an independent binomial sum; prints 1.7%, 0.020%, under 0.01%). contact-order-matters footer ("In models of real populations") matches c6; advisory closed. Records: `## Pass NCM-4` in each lesson's `company/reviews/<slug>/2026-10-14-fact-check.md`. `npm run check` passed. No open claims in these four lessons. Demo.tsx, board, progress, events untouched; nothing committed.

- 2026-10-14 · fact-checker (Ingrid) · Pass LH-1 (pre-merge, read-only), PR #2 batch B7 (25 resource lessons): 100 claims c1-c4 verified (all arithmetic re-derived in node from the AST; 0 disputed, 0 withdrawn), 4 c5 source claims unverified (NIST SP 1181 and energy.gov.au unreachable from this environment, not guessed), 25 unrecorded hook/title statements checked and held (no claim exists for them). Advisories only (wording: lh-lead-time-stock principle; unused EUR 0.30/kWh in lh-duty-cycle-energy and lh-idle-versus-active; display rounding in lh-count-sheets-not-rolls; recall inputs that show no gap in lh-jug-rounding-extra and lh-offcuts-not-one-piece). Records: `company/reviews/<slug>/2026-10-14-fact-check.md` (## Pass LH-1); verdicts `company/reviews/lifehacks-200/fact-check-B7.json`, to apply to meta.json after the merge. Next: re-check the 4 c5 sources from a connected host. Nothing committed; board, progress, events untouched.

- 2026-10-14 · fact-checker (Ingrid) · Pass LH-1, PR #2 batch B4 (25 study lessons, 100 claims, read-only via git show): 98 verified, 2 disputed, 0 withdrawn. Fixtures re-derived in node (calendars, queues, file filters, edits); disputes are false hooks (c1): `file-type-then-owner` ("Four files match one clue") and `fragmented-time-does-not-fit` ("Three gaps total thirty minutes"). External hosts (Microsoft Learn, Google Drive Help, doi.org, APS, PubMed) are proxy-blocked (403); Roediger & Karpicke 2006 confirmed by search snippets only, MS Learn and Drive pages do not support the cut/copy/find/trash semantics (context only). Records: `company/reviews/<slug>/2026-10-14-fact-check.md` (## Pass LH-1); verdicts `company/reviews/lifehacks-200/fact-check-B4.json`. Apply after merge. Nothing committed; board/progress/events untouched.

- 2026-10-14 · fact-checker (Ingrid) · Pass LH-1, batch B2 (PR #2, 25 home slugs, 125 claims): 124 verified, 1 disputed (rolled-or-folded-volume c3: slider unit "shirts" vs a 30x20x0.2 cm sheet; fix unit to "sheets"), 0 withdrawn. Advisories: long-cord seed 17 shows 13/20 (65%) beside the paper's 55% and that reveal sentence has no claim; the 22 templated recall questions have an answer key that does not answer the question. Raymer & Smith (55%, no knots below 0.46 m, 0.30 m box) confirmed from search excerpts only; mit.edu, pnas.org, bosch-home.com were unreachable, so those URLs/page numbers were not opened. Records: `company/reviews/<slug>/2026-10-14-fact-check.md` (Pass LH-1), verdicts `company/reviews/lifehacks-200/fact-check-B2.json` (apply to meta.json after merge). Board/progress/events untouched; nothing committed.
- 2026-10-14 · fact-checker (Ingrid) · Pass LH-1 batch B5 (PR #2, 25 study slugs, read-only, 100 claims): 84 verified, 4 disputed, 12 unverified (official Gmail/Drive/Microsoft pages unreachable, 403), 0 withdrawn. Disputes: keep-the-error-feedback c1 (over-general hook), link-label-names-the-target c2+c4 ("scope" vs field "Section"), preview-replace-all c3 (reveal says one highlighted position, two shown). Records: company/reviews/<slug>/2026-10-14-fact-check.md; verdicts: company/reviews/lifehacks-200/fact-check-B5.json (apply to meta.json after merge). Next: builder applies the 3 fixes; fact-checker re-checks. Board, progress, events untouched; nothing committed.

- 2026-10-14 · learning-designer (Lena) · PR #2 blocker 5, resource share: new recall for all 60 lh-* lessons in company/reviews/lifehacks-200/recall-patch-resources.json (apply after merge), with a note in recall-patch-resources.md. Correct positions are 20/20/20 at indices 0/1/2. Each recall moves the idea to new numbers and uses the misconception as a distractor. lh-water-meter-units now asks for 1.8 m³ (safety B8). Apply to meta.json recall, the resource-specs.json recall mirror, and claim c4 (owner: demo-builder; c4 back to unverified for fact-checker). Found: float bug in lh-percentage-overage. ceil(x*1.1) shows 111 at 100 (also 50/90/110 one too high), which contradicts the reveal's crossover. Route to demo-builder + fact-checker; it is the only lesson affected. Arithmetic checked by script (high confidence); guessability not yet seen by learner-evaluator (medium). src, board, progress and events untouched; nothing committed.
