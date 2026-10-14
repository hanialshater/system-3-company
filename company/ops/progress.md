# Progress log (session handoffs)

Newest entry at the top. Every session adds one before it ends. This is testimony from a worker
who no longer exists: check what you rely on.

## 2026-10-14 · demo-builder (wc-builder-11) · wave C revisions of 15 economics and probability lessons
- Changed: bathtub-deficit-debt, bond-seesaw, cheese-for-bread, compound-interest, deduction-or-credit, exchange-round-trip, extra-hundred-a-month, fee-on-two-week-loan, free-rider-pot, loaf-with-smoke, real-rate-illusion, square-root-wealth, twenty-dollar-basket, average-that-never-settles, bet-too-much-and-go-broke. None was published; all had a "revise" review. Versions bumped, format and interactions added, edited claims unverified, "Revision v<N>" in each build.md.
- Believe: the review findings are fixed (leaks, unvisited-state quotes, told payoffs, undefined terms); fairly sure, needs fresh learner reviews. Contract QA passes on all 15 (phone and desktop); I looked at every walkthrough sheet.
- Judgement calls: square-root-wealth has a "Slide to the coin's line" button (generic label, but it does land on the key state); exchange-round-trip has a "Try $1.11" button; real-rate-illusion slider now steps whole percents; bet-too-much gained a 30% stake (its 982/1000 seed sweep was for five stakes).
- Next: fact-checker on the unverified claims; learner reviews. Open: cheese-for-bread locked stage clips the last slider on a phone (kit layout, W-135 family).

## 2026-10-14 · demo-builder (wc-builder-8) · wave C revisions of 13 AI lessons
- Changed: attention-shares-one, background-shortcut, confident-and-wrong, copy-of-a-copy, direction-not-distance, dog-bites-man-twice, five-folds-five-scores, gradient-descent, greedy-slot-machine, income-in-dollars, king-queen-arrow, meaning-without-the-word, memorise-coin-flips (version bumped, edited claims unverified, "Revision v<N>" in each build.md). bad-start-kmeans (v2) and draw-the-xor-lines (v3) were already revised after their latest review; untouched.
- Believe: leaks, unvisited-state quotes, told payoffs, undefined terms fixed per the reviews (fairly sure; simulated-learner review needed). Contract QA passes on all 15 (phone and desktop); only the known feed-chips failure (W-136).
- Next: fact-checker on the unverified claims (esp. king-queen-arrow c5, greedy c3/c4, memorise c4); a fresh learner review of each. Open: locked-stage charts in dog-bites-man-twice and meaning-without-the-word are small (kit layout).


## 2026-10-14 wave C, builder 7: revisions of 11 lessons

Changed (see "Revision v<N>" in each company/reviews/<slug>/build.md): cut-the-cube-surface, dilute-until-none-left, heavy-but-floats, pay-first-then-profit, filament-vs-led-heat, pendulum-period, projectile-angle, puck-on-ice-no-push (phone clip: reveal-phase `.stage-svg {flex: none}` rule widened the lanes), point-one-is-26-percent (c3), collect-all-six-faces, tournament-second-best. QA passes except the known feed-chips failure (W-136). I believe the fixes work (walkthrough sheets and a phone probe seen); fairly sure. Edited claims are unverified (dilute c7 new, point-one c3): fact-checker next. Open: pendulum gate still needs only the weight trial (no one-tap path for a second trial); re-review wanted for all 11. collect-all-six-faces had no stuck label in the current code.

Template:

```markdown

## 2026-10-14 · rnd-lead (Bram) · Knots gen 1 scored, judged, selected: winner `gen1-force`; stop rule says promote
- Changed: `company/rnd/evolution/knots-gen1.md` (the record). New looks gate in `src/lab/knots/test/draw.test.mjs`: table knots must draw round, with at most 30 % straight runs and 3 % sharp corners; now 102 tests. 24 eval records in `knots.jsonl`. Board not touched (as instructed); nothing committed.
- Believe:
  - **Official scores.** 3 one-seed runs, no slowness penalty in any. Medians: gen0 10,394.54; tutte 10,438.80; force 10,439.68; ortho 10,443.07. That is a tie within seed noise.
  - **Rulings.** The ortho stretch is fair, and the aspect metric is unchanged. Only force still draws table knots like the textbook (rendered and looked at).
  - **Re-score with the looks gate.** force 10,533.49; gen0 10,491.86; tutte and ortho gated out. High confidence in the ranking; medium on whether looks should be a gate rather than a weight.
  - **Audit.** Every candidate changed only mutable files, and none games the bench. Tutte's internal score copies the bench formula: allowed, and flagged.
- Next: gen 1 gains 0.26–0.47 % of total score, under the 2 % stop rule, so I recommend promoting `gen1-force` (EDD, then a principal-engineer review). The VP should rule on my objection that the 2 % rule cannot be met on this score scale (+15 % on the bench term). A gen-2 plan (ortho→force crossover plus 2 mutations) is in the record if she rescales it.
- Blocked: VP ruling on the stop-rule scale.

## 2026-10-14 · rnd-engineer · Knots gen 1 slot A: `gen1-tutte` (reweighted Tutte of a triangulation + guarded stress)
- Changed: new `src/lab/knots/candidates/gen1-tutte/`, a full copy of gen0-baseline. Only `draw.mjs`, the new `layout.mjs` and `index.d.ts` differ. The candidate's NOTES.md has the idea, the prior art and the numbers. Committed in my worktree, not pushed. I added nothing to the archive: my eval lines were reverted.
- Believe:
  - It passes every gate: 101/101 tests, random-knot lesson 11,794 B of 12,288.
  - It beats gen 0 by +38 to +55 on seeds 1–3: 10,451 / 10,439 / 10,430 against 10,409 / 10,401 / 10,375. Spacing goes from 7–9 to 11.7–13.2, spread from 29–38 to 49–53, and there are no extra crossings. High confidence in the direction.
  - Medium confidence on the lead's run: on a heavily loaded machine, `layoutSlowPenalty` could take back 10–50 points. It costs about 2× gen 0's CPU.
  - Table knots look less textbook than circle packing.
- Next: the lead scores all three slots in one run. A crossover could add packing for diagrams where it is planar, or slot B's repulsion in place of my revert guard.
- Blocked: nothing.


## 2026-10-14 · demo-builder · Colour fixes in 18 published lessons (W-155)
- Changed: stage and text colours only, in the 18 lessons that still failed contrast after the kit token fix. Per-lesson notes in `company/reviews/<slug>/build.md`. No claims or pedagogy touched; no version bump.
- Believe (high): a11y scan on a build of this branch shows no lesson-origin contrast failure in any of the 18; lesson QA passes except the known feed-chips failures (W-136); `npm run check` passes.
- Not fixed (not colour): collect-all-six-faces SVG label stuck at "0 rolls"; tournament-second-best label "Knockout bracket" never changes; 6 px text in line-stops, two-suspects, start-early-race.
- Next: accessibility-reviewer re-scans the 18 slugs and updates their records.


## 2026-10-14 · rnd-engineer (slot C) · Knots gen 1: `gen1-ortho` candidate written (orthogonal grid layout)
- Changed: `src/lab/knots/candidates/gen1-ortho/` (a copy of gen0-baseline; only `draw.mjs`, `index.d.ts` and `NOTES.md` differ).
  - Tamassia min-cost-flow bends, rectangular refinement, balanced longest-path compaction;
  - bends drawn as rounded corners;
  - circle packing and Tutte removed.
- Believe:
  - 101/101 tests; lessons about 170 B smaller than gen 0.
  - Layout term 262.8 / 259.3 / 261.8 on seeds 1–3 (gen 0: 220 / 212 / 196). There are 0 extra crossings on 8 seeds and 227 stress diagrams.
  - Hand-computed score: about 10,438–10,448.
  - High confidence in planarity (every face is a rectangle). Medium confidence in the official score, because `evolve.mjs eval` was blocked by this session's command guard and the lead's run will be the first.
- Next (rnd-lead): score all three slots in one run. Judge whether the square stretch (aspect 100) is a layout choice or metric-fitting (NOTES.md, "Surprise 2"). The table knots now look rectilinear; that is a product call.
- Blocked: nothing.


## 2026-10-14 · fact-checker · Fact-check pass 12 (wave C CS revisions)
- Changed: 38 unverified claims across 15 CS lessons set (36 verified, 2 disputed), each with a `FACT-CHECK 2026-10-14 (pass 12)` note in its source; Pass 12 tables in `company/reviews/<slug>/2026-10-14-fact-check.md` (also salt-ions-count-double and cards-do-remember, re-confirmed unchanged).
- Disputed: big-number-swallows-one c2 ("2 multiplied by itself 53 times" reads as 2^54; use "53 twos multiplied together" in claim and predict); binary-search c5 (stage flags weak only if after*2 > before+1, so 500 of 999 is not called weak; use after*2 > before).
- Believe (high): all numbers re-derived in node (scratchpad fc12/check.mjs). Book/spec citations not opened (egress blocked).
- Next: builder fixes the two disputes, fact-checker re-checks. Blocked: half-of-humanity c1 and continental-jigsaw c1 still need a human source check.

## 2026-10-14 · rnd-lead (Bram) · Knots evaluator fixed (W-143, W-144); gen 1 brief ready
- Changed:
  - `tools/evolve.mjs`, backward compatible:
    - per-lesson size gate (`sizeEntries`, stripped closures found by Node's loader);
    - `benchWeights`;
    - `mutable` frozen-file check, plus mandatory `parents` registration;
    - one bench seed per eval run (`EVOLVE_SEED`, archived);
    - the board ranks each candidate's latest record and warns when seeds differ;
    - refuses `import()`/`require()`;
    - new `size` and `selftest` commands (selftest passes).
  - `src/lab/knots` evaluator:
    - `evolve.json`: lesson budget 12,288 B stripped, library 16,384, gen-1 weights and mutable files;
    - `test/lessons/` (4 entries) and `lessons.test.mjs`;
    - `test/benchgen.mjs`, evaluator-only generators, and `benchgen.test.mjs`;
    - `test/benchdata.mjs`: 10 no-move hard unknots, a knotted decoy, the monster, Gordian;
    - `bench.mjs` rewritten so every input is generated at bench time.
  - README baseline paragraph; `company/rnd/evolution.md` (mechanics section). New: `company/rnd/evolution/knots-gen0.md` and `knots-gen1-brief.md`.
- Believe:
  - gen0-baseline now scores **10,415.83** (101/101 tests, mean lesson 8,036 B, bench 331.91; was 0, gated out). High confidence in the gates and the generators: the tests pin them to the library, and Regina certified the hard set offline.
  - Medium confidence in the 12,288 calibration: stripped runs 1.18–1.9× over the real cost.
  - The bench term varies about ±15 by seed, so always score a selection in one run.
- Next: dispatch 3 rnd-engineers for gen1-tutte, gen1-force and gen1-ortho (brief: `company/rnd/evolution/knots-gen1-brief.md`), then score all three in one `eval` run. Board items W-143 and W-144 can close, but I did not touch `board.json` (caller's instruction); the chief of staff moves them.
- Blocked: the arXiv hard-unknot datasets (egress).


## 2026-10-14 · fact-checker · Pass 10: 14 new CS algorithm lessons + 5 reworded claims
- Changed: claim statuses (checkedBy fact-checker, checkedOn 2026-10-14) in src/demos/cs/{caesar-falls-to-frequency,no-zip-shrinks-everything,two-pointers-meet,fair-shuffle-trap,probing-clusters-grow,shortest-job-first-wait,four-queens-pruning,rsa-lock-with-public-key,patience-piles,median-without-sorting,union-find-shortcut,start-after-the-deficit,uphill-finds-a-peak,undo-a-bad-push}/meta.json and the five re-checked claims; recorded one unrecorded stage claim (rsa c7). Records: company/reviews/<slug>/2026-10-14-fact-check.md for all 19 lessons.
- Believe (high confidence, own node re-implementations): 71 of 74 checked claims verified, 3 disputed: two-pointers-meet c2 (2 of the 13 "never looked at" pairs were looked at), median-without-sorting c5 (3,465 is a high 50-seed mean; expectation 3,336), rsa-lock-with-public-key c7 (predict: cube root of 8 is 2, so anyone can unlock). All 5 reworded claims verified.
- Next: demo-builder fixes the 3 disputes (fixes in the review files); fact-checker re-checks. Not on the board (caller told me not to touch board.json).
- Blocked: nothing; no walkthroughs exist yet for the 14 new lessons (I read Demo.tsx text).


## 2026-10-14 · rnd-engineer · Knot theory library, generation 0 baseline (src/lab/knots)
- Changed: new `src/lab/knots/`. It has plain ESM, no dependencies, and docs in `index.d.ts`. It covers PD/Gauss/DT/braid codes, a table (0_1, 3_1 to 7_7, 10_8, Hopf, Whitehead, Borromean, granny, square, and the monster unknot), and exact invariants (writhe, linking, Fox colourings, determinant, Alexander, bracket/Jones, signature). It also has R1/R2/R3 detection and application with up-moves, an honest `simplify` (statuses unknot/unlink/minimal/unknown, never "knotted"), turnOver, mirror, connectedSum and deleteComponent, a circle-packing SVG layout with gaps (Tutte fallback), random braid knots, 3-D walks with closure and projection, and `identify`. Also: `test/` (93 tests, about 6 s; it imports only `../index.mjs`; reference values in `test/published.mjs`), `bench.mjs`, `evolve.json` (exactly as the brief asked), `candidates/gen0-baseline/`, `size.mjs`, README, and PRIOR-ART. The worktree was fast-forwarded to `ccr-4c6c7654-ew9ko1` to get `tools/evolve.mjs` and the research note.
- Evaluator run: `evolve eval knots` gives 93/93 tests but **score 0, gated out**. The raw `index.mjs` closure is 12,815 B gz against 10240, and even minified the whole library is 9.8 KB. Real per-lesson costs are 4.3 to 7.3 KB (`size.mjs`). The objection is W-137 (rnd-lead).
- Believe: the invariants are right (high). Jones matches Regina, Alexander matches knot_floer_homology, and det = |V(-1)| = |Δ(-1)|, all on the same PD codes. The Traczyk formula fixes the signature sign, and every invariant survives seeded random moves. The right trefoil is t + t³ − t⁴. KnotInfo, the Knot Atlas and arXiv were unreachable, so the reference values were computed by independent GPL software used offline only, not copied from tables. Unknotting numbers are from memory. Layout is good for the table and weak for non-reduced diagrams (medium).
- Next: the rnd-lead reviews the evaluator (W-136), and fixes the size gate and adds real hard unknots (W-137). cm-math picks lesson briefs (W-138). The research note's requirements are in the README table; animation and the Solomon link are deferred.
- Blocked: Goeritz and dataset hard unknots (arXiv egress). Nothing pushed; committed on the worktree branch.


## 2026-10-14 · demo-builder (algo-builder) · First 14 CS algorithms lessons built (draft)
- Changed: 14 new lessons in src/demos/cs/ from company/domains/briefs/cs.algorithms.md (single card / simulation run only): caesar-falls-to-frequency, no-zip-shrinks-everything, two-pointers-meet, fair-shuffle-trap, probing-clusters-grow, shortest-job-first-wait, four-queens-pruning, rsa-lock-with-public-key, patience-piles, median-without-sorting, union-find-shortcut, start-after-the-deficit, uphill-finds-a-peak, undo-a-bad-push. Each has meta.json with "format", all claims unverified, and a build note in company/reviews/<slug>/build.md. Board untouched.
- Believe (high for the numbers, re-run in node; medium for teaching): every brief's answer held. Local computer-use QA passes on phone and desktop for all 14; `npm run check` and tsc pass. No QA records filed (qa-tester's job).
- Brief notes, not wrong answers: rsa (unlocking with e twice returns 15 of 55 toy messages; handled on stage, claim c4); patience-piles (the misconception "starts at the smallest" is weakly targeted, since 1 4 5 6 starts at 1); caesar (94-letter message, not 120); fair-shuffle (exhaustive, not seeded).
- Next: fact-checker verifies the 14 lessons' claims; learner-evaluator reviews; qa-tester files QA records. Claims were released with --done by the builder.
- Blocked: nothing.


## 2026-10-14 · platform-engineer · W-135: reveal fits on a phone (502/509 fully visible, was 257)
- Changed: `src/components/DemoCard.tsx` (useRevealFit: at the reveal the card body scrolls the reveal on screen), `src/app/globals.css` (at the reveal `.stage-svg` takes its natural height, so fill-the-stage pictures no longer collapse to min-height), new `tools/reveal-fit.mjs` (390×844 reveal measurement, no new deps). Lesson.tsx untouched; no amendment needed. Note: company/engineering/notes/2026-10-14-W-135-reveal-fit.md. Committed in the worktree, not pushed.
- Root cause: since 54ae817 the stage is content-sized at the reveal and the card body scrolls, but it stayed at scrollTop 0, so the reveal sat below the fold of an unmarked inner scroll (read as "clipped under Why trust this?"); and ~200 lessons' `flex: 1 1 0` pictures collapsed to their 120-140px min-height in a content-sized stage.
- Measured (all 509, against a build): before 257 fit / 245 needs scroll / 141 thumbnail / 7 unmeasurable; after 502 fit / 0 / 6 / 7. Published: 92/94 fit, 0 thumbnails.
- Believe (high for the measurement and the cause; medium that learners prefer the stage top scrolling off over a smaller stage when the reveal is long). Check passed, typecheck passed, QA contract passed for 10 lessons (phone + desktop) and feed spec passed. Full `npm run verify` not run.
- Next: engineering review of the diff (any engineer role; principal-engineer to confirm tier 1); builders fix the 6 lesson-level thumbnails (dvh caps) listed in the note; re-run walkthroughs for the ~12 reported lessons before their re-review (evaluators).
- Blocked: nothing.

## 2026-10-13 · accessibility-reviewer · First accessibility audit of the published lessons (board W-010)
- Changed: new `tools/a11y-scan.mjs` (Playwright; keyboard, names, AA contrast in dark and light, 44 px targets, reduced motion, colour-alone prompts). 76 records at `company/reviews/<slug>/2026-10-13-accessibility.md` and the summary `company/reviews/_accessibility/2026-10-13-published-audit.md`. Raw scan in `artifacts/a11y/` (not committed). Board, lessons and status untouched; nothing committed. The onboarding doc names `<date>-a11y.md`; the task asked for `-accessibility.md`, so the roles data should be reconciled.
- Result: 46 pass, 12 pass with fixes, 18 fail (all contrast, mostly light theme). Kit-level: light-theme `--good/--warn/--bad` text 1.6-2.5:1 (verdict line in every lesson), 35 px controls and a 23 px "Why trust this?" link, focus dropped to body at commit and reveal, stage before question in DOM, no live region, locked stage dimmed below AA.
- Believe: high on the contrast failures (computed and eyeballed); medium-high on "no keyboard lock-out" (scan plus 10 hand traces, no screen reader). The scan had five bugs that the hand sample exposed; they are fixed and listed in the summary.
- Caveats: the 76 are the lessons published at task start; 49 more were published during the session and are not audited. Server :3420 died at 00:22Z (not by me); the final scan used :3402 (build 21:17Z, newer than all 76 lessons' code).
- Next: platform engineer fixes K1-K6; founder decides unpublish vs waive for the 18; accessibility reviewer audits the 49 newer lessons. Suggested board items (I was told not to edit the board): platform-engineer "a11y kit fixes K1-K6", accessibility-reviewer "audit lessons published after 2026-10-13 scan".
- Blocked: nothing.

## 2026-10-13 · interaction-designer · First 5 interaction specs (4 Life Hacks + first agent-based simulation)
- Changed: new `company/design/specs/<slug>.md` + `.svg` (3-frame wireframes) for towel-spread-dries-first, spaced-beats-cram, square-bow-stays-tied, long-cord-knots-itself, mild-preferences-sharp-divides. Board and company/design/concepts/ untouched (caller's instruction). Nothing committed.
- Decisions a builder will not expect: every spec orders controls so the QA path (each control once, in DOM order) reaches all milestones and ends on the state the reveal describes. Cord: length chips that each tumble 20 replace slider + "tumble once". Schelling: threshold chips (10/30/50/70) replace the slider; "New mix" is first in DOM; Run computes then replays within 400 ms; the reveal pins the grid to the learner's 30% run. Spaced: day axis 0-34, key-frame buttons for the two test days. Bow: no reset; flipping a wrap re-ties. Hero illustrations are predict-only 96 px slots; before/after and comparison pairs move into the reveal. An Illustration must not render before its file is accepted (a 404 is a console error: QA fails).
- Believe (medium-high on QA reachability, checked by hand against tests/qa/contract.spec.ts; medium on stage fit at 390x844). Schelling rule re-run in node, seeds 1-5: 30% gives 0.74-0.76 in 8-16 ticks, matching the brief.
- Next: design lead approves the ABM format and the illustration placement change; cm-lifehacks records the towel breeze factor (illustrative x2) and the bow loss rates as claims; mockup artist mockups from the specs.
- Blocked: mild-preferences-sharp-divides until the ABM format is approved.

## 2026-10-13 · cm-cs · Algorithms strand: 40 concepts and 40 ranked briefs
- Changed: content/curriculum/cs.json gained 40 concepts tagged `"subarea": "algorithms"` (53 to 93; every prerequisite resolves). company/domains/briefs/cs.algorithms.md now holds 40 ranked briefs in the cs.md heading format, so `claim.mjs next cs` hands them out after cs.md. Board untouched (caller's instruction). Nothing committed.
- Source: TheAlgorithms/Python (MIT) used only for topic ideas and to check how algorithms run. No code was copied. Claims cite CLRS or the original papers. Each brief's answer was recomputed in node (exhaustive where small). Two drafts were wrong and fixed before writing: the interval set (shortest-first succeeded) and the rolling-hash text (no false hit).
- Believe (medium): the top 7 (stability, quicksort worst case, BFS = DFS with a queue, 0/1 knapsack, edit distance, Caesar frequency, compression limit) are the best misconception-first lessons. Each brief says how it differs from its nearest lesson. Old algorithm concepts (binary-search, ...) are still untagged. Tagging them is cm-cs-algorithms' day-one task.
- Open: rsa-lock-with-public-key and caesar-falls-to-frequency overlap the security strand. cm-cs-security should cross-list them, not write new briefs for them. Builders must re-run each brief's check. A brief is not a verified claim.

## 2026-10-13 · fact-checker · Pass 9: 22 batch lessons + 2 pass-8 claims + jigsaw c1 re-opened
- Changed: claim statuses in 23 meta.json files (69 verified, 3 disputed, 4 confirmed withdrawn, 3 left unverified); "## Pass 9" tables in company/reviews/<slug>/2026-10-13-fact-check.md (new files for 15 lessons). Board untouched (caller's instruction).
- Disputed: twenty-then-ten-off c2 (stage prints 28.000000000000004%; round TOTAL_PCT), count-the-marked-fish c5 ('cluster near' -> 'scatter around'), cafe-is-five-bytes c5 (dispute from pass 8 stands, text unchanged).
- Unverified: half-of-humanity c1 (UN WPP), continental-jigsaw c1 (re-opened: Bullard 1965 never opened; c4 rests on the same paper), salt-ions-count-double c5 (derivation gives about 3.4, not 3.5; CRC unreachable).
- Believe now (high for the derivations and simulations, medium for the recalled sources: Alberts table 11-1, Anscombe values, Gardner 1970).
- Next: builders fix the 3 disputes and salt-ions wording (owner: the domain builders); a human with access checks UN WPP 2024 and Bullard 1965 (founder inbox).
- Blocked: egress to population.un.org, royalsocietypublishing.org, Wikipedia, BioNumbers.

## 2026-10-13 · cm-lifehacks · Life Hacks briefs revised after safety review and source check
- Changed: `company/domains/briefs/lifehacks.md` applies every required change from the 5 safety records and `company/reviews/lifehacks-briefs/2026-10-13-source-check.md` (wobbly-table: claim 1 square-only, Martin 2007 Phys. Lett. A corrected, 35° as theorem limit only, "Four feet down is not level" and "Clear hot drinks before you turn it" on stage; knot claim 4 always-fails vs about half; Raymer & Smith setup stated; Cepeda 2006 dropped from spaced claim 2; new claim 6 for the retrieval line; textbook editions/sections named). Wobbly hero request: cup removed. Pending-review comments replaced in 6 passed requests. "Changes applied" note appended to each safety record. Board and brief-skips untouched.
- Believe now (medium): the briefs are buildable; textbook sections, ABOK numbers and Roediger & Karpicke 2006 are cited from memory and need the fact-checker.
- Next: lifehacks-safety-reviewer re-checks wobbly-table and removes its skip line; fact-checker full-text checks.

## 2026-10-13 · portfolio-manager · First triage pass: 126 items, next 47 → 16
- Changed: every open board item now has a priority, an owner and a triage note (`node tools/triage.mjs`). 36 marked done with evidence, 24 dropped (16 of them merged duplicates), 16 in next, 49 in backlog, 1 in review. 10 owners changed. Record: company/ceo-office/triage/2026-10-13-first-pass.md. No lessons, gates, roles or protected paths touched.
- Believe now (high, each item opened against meta.json, reviews, tools): the board lagged the disk. 29% of open items were already done. The only P1 is W-010 (0 a11y records, 76 published lessons). cafe-is-five-bytes c5 is the only disputed claim left anywhere. evaluation-steward holds 10 items that all need amendments, and none has been drafted since AMD-001.
- Next: the operating chief of staff dispatches next in order (W-010 first). Whoever merges a pass closes its board items. publish-holds.json (8 geography lessons) is now covered by W-002.
- Blocked: the 6 founder items (P3, all already in founder-inbox.json).

## 2026-10-13 late — chief of staff: founder inbox in HQ; pass 8b, learner wave, CEO-office evaluation landed

- **Changed:** `company/ops/founder-inbox.json` (F-01..F-13) is the single list of what waits on the founder. HQ shows a banner on every view and a priority list in the Lobby. It merges in founder-owned board items. Checklist rule added. I verified it in a build and a screenshot.
- **Landed (uncommitted work from agents, now committed):**
  - Fact-check pass 8b: 45 lessons, about 215 claims verified, 0 disputed, 2 claims added.
  - Learner reviews for 30 lessons (prob, econ, chem): 19 launch, 10 revise, 1 fatal (twenty-then-ten-off float artefact). Board items W-124..W-128.
  - Leonie's role evaluation, handoff map and proposals P1–P9 are now F-13, P1 in the inbox.
- **Believe (fairly sure):** Leonie is right that I do too much myself: publishing, QA records and chairing. I won't publish more until the founder rules on P1.
- **Next:**
  - Merge the concept inspector when the design engineer reports.
  - Builders take W-124..W-128.
  - Update EXP-003 with launch rates.
- **Blocked:** on the founder's inbox.

## YYYY-MM-DD · <role> · <one-line summary>
- Changed:
- Believe now (and how sure):
- Next (owner):
- Blocked:
```

## 2026-10-13 · cm-lifehacks · First 5 Life Hacks briefs, 7 illustration requests, safety gate held by brief-skips

- Changed: `company/domains/briefs/lifehacks.md` now holds 5 ranked briefs (towel-spread-dries-first, spaced-beats-cram, wobbly-table-quarter-turn, square-bow-stays-tied, long-cord-knots-itself), each with format, proposed safety class (all "none") and image needs. The first line says "Safety review: pending". I added 3 concepts to `content/curriculum/lifehacks.json` (wobbly-table-turn, shoelace-square-bow, cord-tangle-length, demand 2). I wrote 7 illustration requests (9 images) in `company/design/illustration-requests/`. The 5 anchors in `_reference.md` already existed and I left them alone. The second image set for a lesson uses slug `<lesson>-pair` plus a `lesson:` field, because `tools/illustrations.mjs` keys requests by slug. I put the 5 slugs in `company/ops/brief-skips.json` so `claim.mjs next lifehacks` prints NONE until the safety reviewer passes them (W-129). Board: W-090 → review, W-112 → done, W-116 → review (the interaction designer revises my alt-text drafts from their specs).
- Believe now (medium): the mechanisms are checkable, but several planned sources are from memory and need the fact-checker. Specifically: the Raymer & Smith 2007 plateau of about 50%, the Daily-Diamond 2017 square-vs-granny result, the 35° slope limit in Baritompa et al. 2007, and the Martin arXiv id. Brief 4's answer depends on the 2017 paper. If the paper does not compare the two bows, the brief needs a different source (Ashley) or a rewrite. Cooking, money and sleep are deferred to the next batch because each one needs a full safety review.
- Next: lifehacks-safety-reviewer: W-129 (pass or raise the class, then remove the skip lines). learning-designer/interaction-designer: W-101, specs for the 5. visual-designer: W-115 once anchors arrive. founder: W-122 (image terms) before the illustrator starts.
- Blocked: builders, until W-129 passes. Images, until W-122 and the _reference anchors are accepted.

## 2026-10-13 · chief-of-staff-ceo-office · First role evaluation, handoff map, 9 org-change proposals
- Changed: new company/ceo-office/2026-10-13-role-evaluation.md (74 roles: keep 16, activate 14, re-scope 4, merge 2, wait 38), company/ceo-office/handoff-map.md (lesson and org-change flows, independence table, new orgs), company/ceo-office/2026-10-13-proposals.md (P1–P9 with decision-record drafts; 8 WBR health metrics). No roles, board, gates or lessons touched; nothing committed by me.
- Believe now (high, from events, board and records): 54 of 70 agent roles never dispatched. The operator publishes (76/76), files the QA records stamped "qa-tester", chairs launch reviews "acting" and writes analytics "acting". 0 a11y records against a written launch condition. `tools/events.mjs` assigns actors by commit keyword, so HQ overstates other roles' activity. 4 of 7 role changes have no decision record (2 were added during this evaluation).
- Next: founder decides P1–P3, P5–P8. chief-of-staff answers role-evaluation §3 in writing and does P4 and P9 (no founder needed). CEO office writes the first WBR company-health section.
- Blocked: everything that changes roles waits on the founder.

## 2026-10-13 · fact-checker · Pass 7: 45 lessons checked, 191 claims verified, 0 disputed
- Changed: verified the 4 reworded claims (one-in-four-sprouts c3, saturated-enzyme c2/c3, point-one-is-26-percent c5), builder-flagged claims (red-apple-green-light, filament-vs-led-heat, paper-stops-alpha, pay-first-then-profit, geography ISS/GPS/geostationary, antarctica areas, city coordinates), all of geography except half-of-humanity, 10 probability and 14 economics lessons. Records appended as "Pass 7" in company/reviews/<slug>/2026-10-13-fact-check.md. salt-ions-count-double c5 still says "about 3.5": left unverified.
- Believe now (high): every verified claim re-derived in node (model.ts run directly, d3-geo walks re-run on the kit data). Soft spots: c5 of antarctica-vs-australia names the CIA Factbook for 7.69 (Factbook gives 7.74; Geoscience Australia gives 7.692); the source line should say so.
- Next (builder): salt-ions c5 to "about 3.4". Next (fact-checker): the rest, mainly ai, chemistry, cs, life, math, physics, 10 more probability lessons (a-birthday-like-mine ... two-random-walks-agree), economics twenty-then-ten-off.
- Blocked: half-of-humanity c1 (population.un.org unreachable).

## 2026-10-13 · platform-engineer · SPIKE-001: lessons in a sandboxed cross-origin iframe (W-074)
- Changed: new spike/ (builder, kit entry and bridge, CDN server, manifest and rollback tools, measure script, QA contract copy, security spec, hostile fixture) and the src/app/spike route; company/engineering/spikes/SPIKE-001-frontend-sandbox.md + SPIKE-001-results.json; platform-engineer findings in the EDD-003 review record; README index; changelog; spike/dist gitignored. No feed, lesson page, kit, gate, tests/qa or lesson source changed. No new dependency (Next's vendored webpack and terser, plus typescript and postcss). W-074 → review; W-077..W-080 added.
- Believe now (and how sure): go with changes for stage 1. Measured in Chromium emulation on a loaded machine: lessons 2.2–2.5 KB gz (all 348 ≤ 8.3 KB), kit 61.8 KB gz, geo kit 71 KB gz, cold insert→ready ≤ 1.1 s even at 4× CPU, memory 0.85× today's feed (high confidence). The negative security test passes with a positive control (high). The QA contract works through frameLocator, 6/6 (high). Warm remount is 0.2–0.7 s, so the "warm" budget needs redefining (medium). iOS and real devices are untested (unknown).
- Next (owner): real-device run (platform-engineer, W-077); separate lesson domain plus CSP header (privacy-reviewer, W-078); QA-through-frame amendment (evaluation-steward, W-079); bundler decision record (platform-engineer, W-080); principal-engineer closes the review.
- Blocked: nothing. To reproduce, see the end of the spike doc.

## 2026-10-13 · principal-engineer · EDD-003 lesson storage and loading at scale (design only)
- Changed: company/engineering/edd/EDD-003-lesson-storage-at-scale.md (new), company/rituals/records/2026-10-13-eng-review-lesson-storage.md (open), EDD index line in company/engineering/README.md, board W-074..W-076. No code, gates or protected paths touched; build ran in .next-pe (removed), tsconfig.json restored.
- Believe now (and how sure): measured at 348 lessons: 73 s build, 321 MB output, 4.26 MB packed git, 6.8 files/lesson, 6.6 s QA wall/lesson. The feed HTML (1.82 MB) and the all-metas chunk on every page (1.29 MB) are already over budget (high confidence, measured). One app build and full-catalog QA break at 2k–10k; plain git near 100k (medium, linear extrapolation). Recommend client-side content-hashed bundles in a sandboxed cross-origin iframe, with the server serving manifest, meta and previews; never server-side lesson code (high on the direction, medium on the iframe host until the spike).
- Next (owner): platform-engineer runs the 3-lesson spike (W-074) and fixes EDD-001 (W-076); the invited reviewers answer the questions in the review record (W-075); the founder answers the 7 questions in EDD-003.
- Blocked: gate changes need amendments drafted by the evaluation steward; the bundler choice needs a decision record.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · GitHub deployment pipeline
- Changed: .github/workflows/deploy.yml; automatic previews after successful default-branch CI, manual production on the default branch, immutable release checkout, scoped environment credentials, pinned actions and release artifacts. The deploy command now supports --prebuilt (verify, pull, local build, upload, smoke, promote).
- Believe now (and how sure): 17 deployment tests and actionlint/shell/deployment-boundary checks pass; local Vercel builders receive no authentication token (high confidence in orchestration). Cloud upload/promotion still needs configured GitHub/Vercel credentials.
- Next (owner): principal-engineer reviews the PR; founder/release-manager configures preview-deploy and production environments with Vercel IDs and token, then uses the workflow.
- Blocked: the checkout has no Git push credentials; the explicitly authorized upload uses the connected GitHub account. No live deployment requested or created.

## 2026-10-13 · platform-engineer / release-manager (Codex implementation) · executable Vercel deployment
- Changed: tools/deploy.mjs, npm deploy/test:deploy commands, /deploy, release-manager onboarding and runbook; Vercel CLI pinned at 63.1.2. Production visibility now covers map and standalone URLs. EDD-002, decision and implementation-review records accompany the PR.
- Believe now (and how sure): the workflow blocks promotion on failed checks (13 orchestration tests); the updated preview works (646/646 browser QA), and the production build shows 47 published cards and returns 404 on all 271 unpublished lesson URLs (high confidence in local behavior; cloud upload/promotion not exercised).
- Next (owner): principal-engineer reviews the PR; release-manager uses npm run deploy -- preview after one-time Vercel login/link. Production is explicit and stages before promotion.
- Blocked: no linked Vercel project in this checkout; no live deployment attempted. Existing four disputed-claim warnings remain in the review queue.

## 2026-10-13 · fact-checker · second independent pass: Part A (9 prior fact-checker claims + 4 more) and Part B (economics, math, physics, life, geography, probability)
- Changed: statuses and checkedBy/checkedOn on about 270 claims across 57 lessons (11 disputed, 1 left unverified); fact-check sections appended to company/reviews/<slug>/2026-10-13-fact-check.md. No Demo.tsx edits, no claims added.
- Disputed (reasons in each review file): ai/border-follows-point c5, ai/clicks-not-value c5, ai/draw-the-xor-lines c5, ai/gradient-descent c11, ai/meaning-without-the-word c5, ai/penalty-on-wiggle c5, ai/temperature-reshapes c8, economics/two-bets-split c7, geography/fingernail-ocean c2, life/vaccinate-at-the-peak c3, math/rabbit-ratio c4.
- Left unverified: geography/half-of-humanity c1 (UN WPP 2024 table unreachable: population.un.org, data.un.org, Wikipedia and OWID were blocked from this session; only partial corroboration).
- Believe now: numbers re-derived in node from the Demo.tsx model code (kit/geo shapes, SIR/SIRS, throw-it-fast-enough model.ts); high confidence. Source checks by web search for Peeperkorn 2024, Lewis 2020, AP style, Bishop Museum (Lahaina Noon), Ledyard 1995 (secondary only), UL 489 trip times (secondary only).
- Next: demo-builder fixes the 11 disputed wordings (board W-058); fact-checker with network access compares half-of-humanity c1 (W-059). Advisory wording notes (not blocking) are in the review files: horizon-ruler refraction 'a few per cent' (about 8%), sieve 'clear a hundred numbers', friends-have-more-friends c3 'wherever friend counts differ' is false for disconnected networks, throw-it-fast-enough ISS 7.7 vs NASA 7.8 km/s.
- Blocked: none.

## 2026-10-13 (night) · chief-of-staff · 504 lessons: past the 500 target
- **Changed:**
  - Lessons went from 328 to 504 this evening, with every domain except Life Hacks at or near the end of its brief list.
  - New orgs and roles: Life Hacks, Personalization, International, Design, 27 sub-area category managers, the Principal PM for verticals, and the CEO-office chief of staff (Leonie). That is 72 roles in total.
  - The work queue (`tools/claim.mjs`), the walkthrough contact sheets and the publish loop.
  - HQ now has 3 floors.
  - Agent metrics are in the WBR.
  - SPIKE-001 came back "go with changes".
- **Believe now:**
  - 504 lessons is a count of lessons built and QA'd, not of good lessons (high confidence). Roughly 80 are published. Most of the rest have no learner review yet or a "revise" verdict, and about 415 claims are still unverified (two fact-checkers are on them).
  - The quality loop is the bottleneck, not building: the launch rate is about 37% on first review.
  - 53 of 72 roles have never been dispatched. Leonie is evaluating that now.
- **Next:**
  1. Leonie's role evaluation and handoff map: the founder decides on her proposals.
  2. Finish fact-check pass 8 and the reviews, then run the publish loop.
  3. Hand QA and publishing back to qa-tester and release-manager.
  4. Run the accessibility review (W-057).
  5. EXP-003 result: Sonnet vs Opus builders.
  6. Design review of new briefs.
- **Blocked (founder):**
  - backend choices (auth provider, database host, under-13 policy);
  - usage budget;
  - AMD-001;
  - UN WPP and Bullard source checks;
  - the Personalization brief;
  - the image-generation agent setup (waiting for a yes).
- **Tooling note:** builders report that the claim schema rejects support "citation", so they use "source". Either document "source" as the type for citations in demo-standard, or propose adding "citation" (the gate is constitutional).

## 2026-10-13 (evening) · chief-of-staff · Three new teams; HQ live locally; 328 lessons
- Changed:
  - New teams: backend (backend-engineer, privacy-reviewer), growth (growth-designer) and company tools (tools-lead, hq-engineer). Decision record: company/decisions/2026-10-13-three-new-teams.md.
  - Event log: company/ops/events.jsonl plus tools/events.mjs, backfilled with about 590 events from git and session transcripts.
  - HQ at /hq: floor plan, replay, timeline, Lobby with due rituals and founder items.
  - Event-driven ritual triggers: company/rituals/triggers.json and tools/rituals-due.mjs.
  - Merged chemistry wave 4 and the pass-4 claim fixes. Check: 0 warnings.
- Believe now:
  - HQ works locally (screenshots on desktop, phone and replay; high confidence). It is off in production unless HQ_PUBLIC=1.
  - The usage limit is the binding constraint: it stopped all 8 agents for about 7 hours.
- Next (chief-of-staff):
  - Merge the resumed agents (ai w4, geography w4 builders; life reviser; economics, cs, geography reviewers).
  - Run the publish loop, then the rituals that are due (retro, demo crit, the first founder digest).
  - A fact-check pass for chemistry w4, probability w3, geography w3 and the 5 claim fixes.
- Blocked (founder):
  - Backend choices: auth provider, database host, under-13 policy.
  - Budget split between lessons and the new teams.
  - AMD-001 ratification.
  - UN WPP and Bullard source checks.

## 2026-10-13 (late) · chief-of-staff · 248 lessons; wave 4 under way
- Changed: merged wave 3 (ai, chemistry, life) and CS wave 2, for 248 lessons and 1,300 claims; check passes (6 disputed-claim warnings). The walkthrough driver now follows the QA path (each control once, in DOM order, 1.2 s settle). Running: builders for geography w2, physics w4, math w4, economics w4 and cs w3 (5 Opus, the cap), plus a fact-checker on ai/chemistry/cs.
- Believe now: about 20k build tokens per lesson holds (cs w2: 196k for 10). The learner launch rate of about 11% is the real constraint, not build throughput (medium-high confidence). Only 2 lessons are published.
- Next (chief-of-staff): merge builders as they report; once the integrated QA finishes, qa-record and publish the launch-verdict lessons; regenerate walkthroughs and dispatch learner reviewers per domain; revision builders for "revise" findings; WBR and retro for waves 2–4.
- Blocked: AMD-001 (a–d), the OP and the usage budget wait on the founder, as do the human source checks (UN WPP, Bullard 1965).

## 2026-10-13 · chief-of-staff · 178 lessons merged; usage-limit COE; checks resuming
- Changed: waves 1 and 2 (7 domains) merged, plus revisions of all 18 founding lessons (every fatal fixed). Kit: <Milestones>, mulberry32, reveal layout fix, turbopack worktree root. Integrated QA last run 226/226 (before wave 2's 70 merged).
- Believe now: builders cost about 20k tokens per lesson, and checking is the bottleneck. 150+ lessons have no learner review. Wave 3 builders (econ, chem, physics, math) resumed via SendMessage; life, ai, cs-w2 and geo-w2 are still stopped with partial work in their worktrees.
- Next (chief-of-staff): when the resumed builders report, resume life, ai, cs-w2 and geo-w2 (max 4 Opus at once). After the fact-checkers: learner reviews per domain, then publish what passes. Then a full verify on the integrated tree, a WBR and the wave 2 retro.
- Blocked: AMD-001 and the OP need the founder's ratification. A usage budget is unknown (COE action).

## 2026-10-12 · chief-of-staff · Founding session: company, app and first 17 lessons
- Changed: built the feed app and lesson kit, the company handbook (26 roles/25 agents, constitution, 13 rituals, PM system, patterns, experiments), the CLI and computer-use QA. Four parallel builders made 16 lessons across 8 domains; merge-sort-payoff is the exemplar. Fact-check and a simulated-learner review were run on merge-sort-payoff.
- Believe now: all 17 lessons pass the QA contract on phone and desktop (44/44). That means they work, not that they teach (high confidence that they work, no evidence that they teach). The merge-sort learner review found the stage never shows why splitting helps (W-014). Expect similar "told, not shown" findings elsewhere.
- Next: fact-check the remaining 16 lessons (W-001, fact-checker). Run learner reviews from walkthroughs (W-002). First Demo Crit, then launch reviews; nothing is published yet. Run the first WBR and OP.
- Blocked: real-learner evidence needs the founder (EXP-002, W-007). The kit's `next build` with NEXT_DIST_DIR rewrites tsconfig.json; revert it, don't commit it.

