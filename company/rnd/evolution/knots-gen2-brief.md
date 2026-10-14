# Knots, generation 2 brief: layout, round where it matters and even everywhere

owner: rnd-lead (Bram) · 2026-10-14 · project `src/lab/knots` · authority: [decision 2026-10-14-evolution-stop-rule](../../decisions/2026-10-14-evolution-stop-rule.md) §3–§4, [evolution.md](../evolution.md) step 6 · previous: [knots-gen1-brief.md](knots-gen1-brief.md), [knots-gen1.md](knots-gen1.md)
· slots: 3 rnd-engineers, one idea each, separate git worktrees · ready for dispatch once `evolve.json` (below) is committed

## Read this first: the looks gate

Since the end of gen 1 the evaluator has a **looks gate**. Gen-1 engineers were not told about it; you are.

- **Test:** `src/lab/knots/test/draw.test.mjs` → "table knots look like the textbook: round strands, no long straight runs, no sharp corners".
- **What it requires:** every prime table knot (`KNOTS` entries named `n_k`, except `0_1`) draws with **at most 30 % straight runs** and **at most 3 % sharp corners**. It measures the drawn Bézier curves away from crossings (points within 6 % of size of a crossing are skipped), as the share of curve length whose radius of curvature is above 2 × size (straight) or below 4 % of size (sharp).
- **It is a gate:** fail it and the candidate's score is 0, like any other failing test.
- **Where the parents stand:** gen1-force passes (worst knot 18 % straight, 1.1 % sharp; it keeps gen 0's circle packing on most table knots). gen1-ortho fails (65–80 % straight). gen0's packing: 18 % / 0.3 %.
- **What is allowed:** keeping a round branch (circle packing, or anything else round) for **reduced diagrams where it is planar** is general behaviour, and allowed.
- **What is disqualifying:** detecting the table (by name, by PD code, by crossing count, by matching `KNOTS`) to choose the branch. So is running the looks test's own measure inside the library to choose a branch: the test is evaluator code, and the internal-objective rule below covers it.

## Target

`layout(pd)` and through it `draw(pd)` for arbitrary PD codes, as in gen 1: random braid closures, projections of random 3-D cords, and scrambled diagrams. Gen 1 left three defects that lessons will feel:

1. **Size:** gen1-force's random-knot lesson costs 12,095 of 12,288 B (190 B left).
2. **Wiggle:** gen1-force draws random knots round and even but with a slight wiggle in some strands. The bench does not see wiggle; the pictures do.
3. **Speed:** gen1-force is the layout most exposed to `layoutSlowPenalty` (it paid −11.71 once at load average 20).

And one lesson from ortho: uniform spacing and 100 % planarity come for free from a grid drawing, but rectilinear knots do not look like knots.

## Parents and champion

- **Parents:** `gen1-force` and `gen1-ortho` (`src/lab/knots/candidates/`). `gen1-tutte` is dropped and is not a parent.
- **Champion entering gen 2:** `gen1-force`. The stop rule compares the gen-2 winner against it.
- **Registered in `evolve.json` → `parents` (done 2026-10-14 by the lead, no other change to the file):**
  - `gen2-ortho-force`: `["gen1-ortho", "gen1-force"]`
  - `gen2-force-smooth`: `["gen1-force"]`
  - `gen2-ortho-round`: `["gen1-ortho"]`

  The harness refuses an unregistered candidate. The two parents' frozen files are byte-identical (only `draw.mjs`, `index.d.ts` and `NOTES.md` differ), so the crossover can start from either.

## The three slots (diversity rule: each idea belongs to one slot only)

| slot | kind | idea | may not use |
|---|---|---|---|
| `gen2-ortho-force` | crossover of ortho × force | ortho's grid drawing is the **start**; force's crossing-preserving (PrEd-style) relaxation rounds it, on **every diagram outside the packing branch** | force-smooth's ideas (one curve per edge, angle spring, 8-sector zones) |
| `gen2-force-smooth` | mutation of force | **one smooth curve per edge**, an **angle spring**, and **anisotropic 8-sector PrEd zones** (ImPrEd); and shrink the bundle | ortho's grid drawing or any orthogonal start; flow-based compaction |
| `gen2-ortho-round` | mutation of ortho | a **packing branch** for reduced diagrams where it is planar, **ortho elsewhere**, and **flow-based compaction** to shorten long parallel runs | **any force relaxation** (springs, repulsion, gravity, stress, PrEd/ImPrEd zones, any iterative energy-driven node moves), and any code from gen1-force |

The full engineer prompt for each slot is at the end of this brief. Each is self-contained.

## The evaluator, frozen for gen 2

- **Tests:** the 102 tests in `src/lab/knots/test/` as they stand on 2026-10-14, including the looks gate.
- **`evolve.json`:** as it stands. The only change since gen-1 selection is the three `parents` entries above. Unchanged:
  - `weights`: tests 100, size −0.002 (per mean lesson byte), bench 1;
  - `benchWeights`: `layoutSpacing` 5, `layoutExtraCrossings` 2, `layoutPlanarShare` 1, `layoutCrossingSpread` 1, `layoutAspect` 0.5, `layoutSlowPenalty` 1, `hardUnknotShare` 0.5, `hardUnknotReduction` 0.5, `falseUnknotPenalty` 1, `gordianReduction` 0.5, `jonesWrongPenalty` 1, `jonesSpeed` 0.2;
  - `sizeBudgetGzBytes` 12,288 per lesson entry, `budgetGzBytes` 16,384 for the whole library;
  - `mutable`: `draw.mjs`, `layout*.mjs`, `index.d.ts`. Every other file must be byte-identical to a parent's.
- **Gates** (score 0 if any fails): all 102 tests pass; each of the 4 lesson entries ≤ 12,288 B and the library ≤ 16,384 B (gzip of the comment- and whitespace-stripped module closure); only mutable files differ from a parent; no dynamic `import()` or `require()`; no `test/` folder in the candidate.
- **The ortho stretch is allowed for every candidate:** one generic affine step that scales the drawing to fill the square view box. On curved drawings it skews crossing angles and rounds; the looks gate guards that on table knots.
- **Slowness:** `layoutSlowPenalty` is minus the mean ms per `draw` above 100 ms on the bench diagrams. The lead scores on a shared machine whose load is recorded; budget for it.
- If the lead finds a gap in the evaluator during gen 2, the lead changes it only by the method's rule: every surviving candidate is re-scored on the changed evaluator before selection, and the record says so.

## The bundle condition (a selection condition, not a gate)

- **The gen-2 winner must leave at least 512 B of headroom on every lesson entry.** In practice the binding entry is the random-knot lesson: **`test/lessons/random-knot.mjs` ≤ 11,776 B** (12,288 − 512).
- Where the parents stand (measured 2026-10-14, `node tools/evolve.mjs size knots <id>`):

  | entry | gen0-baseline | gen1-force | gen1-ortho |
  |---|---|---|---|
  | draw-a-table-knot | 5,093 | 6,203 | 4,913 |
  | tricolour-check | 9,353 | 10,461 | 9,170 |
  | unknot-game | 6,713 | 7,828 | 6,537 |
  | **random-knot** | 10,986 | **12,095** | **10,825** |
  | whole library | 11,001 | 12,111 | 10,838 |

- So **`gen2-force-smooth` must shrink the random-knot entry by at least 319 B** (12,095 → ≤ 11,776) to be promotable. The ortho-based slots have **951 B** to spend (10,825 → 11,776), not the 1.4 KB quoted in the gen-1 record: that figure was headroom to the gate, not to the condition.
- A candidate that misses the condition still scores, and may still be a parent of gen 3, but it is **not promoted**.
- Any candidate that grows any lesson entry over its parent must say by how much, and why, in NOTES.md.

## The internal-objective rule (new from gen 2)

- Any internal score a candidate computes and optimises or branches on must be **named in NOTES.md as a design goal in its own terms**: what it measures, why that is a goal for a picture, and where it is in the code. Examples: choosing the outer face; keeping or dropping the packing (gen1-force's "keep the packing unless relaxing raises its clearance by more than 60 %" is one, and a force-derived candidate inherits the duty to name it); deciding when to stop relaxing.
- **It may not reproduce the evaluator.** In particular not: the bench's spread and spacing as `bench.mjs` computes them; the 1.5 cap; the weight 5; the 4 % sampling radius; and, by the same logic (the lead's extension, stated up front), not the looks test's curvature measure and its 30 % / 3 % / 6 % / 2 × size constants.
- "None" is a valid answer, and must be written.
- The lead checks this in the gate audit. **A copy of the evaluator disqualifies the candidate, as gaming does.**

## Independence

- Each engineer works in **its own git worktree**, writes only `src/lab/knots/candidates/gen2-<name>/`, and commits there. Do not push.
- **No reading of other gen-2 candidates**, their notes or transcripts. You may read: your parent(s) as listed in your slot brief, `gen0-baseline`, the library README, `PRIOR-ART.md`, `knots-gen1.md`, and this brief.
- **No edits outside `mutable`** inside the candidate, and no edits at all outside your candidate folder: not `test/`, `bench.mjs`, `evolve.json`, `tools/`, the archive (`company/rnd/evolution/knots.jsonl`), or anything else.
- **No special-casing:** detecting the bench, the bench seed, the size entries, the table knots, the 12-crossing picture knot below, or tuning to the metrics' sampling is disqualifying.

## How the lead will score (and select)

1. **Gate audit** before scoring: `diff -rq` against the parent(s); search for table detection, seeds, the evaluator's constants and formulas; read every internal objective named in NOTES.md, and look for unnamed ones.
2. **Runs:** at least **3** `node tools/evolve.mjs eval knots gen2-ortho-force gen2-force-smooth gen2-ortho-round gen1-force gen0-baseline` runs, each on a fresh random seed (no `--seed`), so every candidate, the champion `gen1-force` and the reference `gen0-baseline` share one seed per run. **Every run counts:** no seed is re-drawn or dropped, for load or any other reason. The load average is recorded for each run.
3. **Per-run table** in `knots-gen2.md`: score, tests, layout metrics, per-entry sizes, slow penalty, load average.
4. **Selection.** The winner is the candidate with the highest median score among those that are gated in on **every** seed and meet the bundle condition, subject to the looks evidence (pictures below). If the lead selects against the score, for looks or size, the record says why.
5. **Stop-rule table** (decision §1), on the winner against `gen1-force`:

   | seed | load avg | score(winner) | score(gen1-force) | g_s | E(gen1-force) |
   |---|---|---|---|---|---|
   | … | … | … | … | … | … |
   | **median** | | | | **median g** | **median E** |

   - E = score − 100 × tests passed. T = max(2 % × median E of gen1-force, 15). At gen 1's E of about 337, 2 % is about 7, so **T = 15**.
   - **Pass** only if median g ≥ T **and** g > 0 on every seed. If the lead runs more than 3 seeds, all count, and g > 0 on at least 80 % of them is enough.
   - The same g columns are shown for every gated-in candidate, for transparency. The verdict is on the winner.
   - Pass: gen 3 may be dispatched after the VP checks the table (budget: gen 3 is the last). Fail: stop and promote the champion, or the gen-2 best if the record argues for it on size or looks.
6. **Looks evidence:** the lead renders **3_1, 4_1, 5_2 and the random 12-crossing knot** (`randomKnot(20261014, {strands: 3, length: 12})`) from every gated-in candidate and from `gen1-force`, as SVG (no new dependency), kept in the repo under `company/rnd/evolution/knots-gen2-looks/` and linked from the record. The looks gate is a floor and the bench does not see wiggle, so these pictures are part of selection.
7. **Timing:** if gen 2 slips more than 2 days past dispatch, the EDD (W-162) goes to the principal engineer with gen1-force, and gen 2 becomes a follow-up EDD.

The lead does not write, fix or tune any gen-2 candidate.

---

## Slot brief for gen2-ortho-force

> You are an rnd-engineer at System 3 Company, writing **one candidate** in generation 2 of the knots layout evolution. You work alone in your own git worktree. Read `company/rnd/evolution/knots-gen2-brief.md` (the whole brief, especially "Read this first: the looks gate", "The bundle condition", "The internal-objective rule" and "Independence"), then this section.
>
> **Your candidate id:** `gen2-ortho-force` (a **crossover**). Parents: `gen1-ortho` and `gen1-force`, already registered in `src/lab/knots/evolve.json`.
>
> **Idea.** Use ortho's planar grid drawing as the **start**, then round it into a knot-like curve with force's **crossing-preserving relaxation** (each node's move clipped so no node crosses an edge, as in Bertault's PrEd), on **every diagram outside the packing branch**. Ortho starts uniform, which should avoid force's slow slivers by the outer circle and reduce relaxation time. You may keep a packing branch for reduced diagrams where the packing is planar, so the looks gate passes; how you decide to keep it is an internal objective and must be named.
>
> **Not yours (other slots own these):** one smooth curve per edge, an angle spring, anisotropic 8-sector zones. Use force's gen-1 relaxation as your mechanism; you may tune its forces, schedule and stopping.
>
> **Starting point.** From your worktree root:
> ```
> cp -r src/lab/knots/candidates/gen1-ortho src/lab/knots/candidates/gen2-ortho-force
> rm src/lab/knots/candidates/gen2-ortho-force/NOTES.md
> ```
> Then bring in force's relaxation (and, if you keep it, the packing branch) from `src/lab/knots/candidates/gen1-force/draw.mjs`. You may read `gen1-ortho`, `gen1-force`, `gen0-baseline`, the library README, `PRIOR-ART.md` and `company/rnd/evolution/knots-gen1.md`. Do not read any other `gen2-*` folder.
>
> **Where to write:** only `src/lab/knots/candidates/gen2-ortho-force/`. Inside it you may change only `draw.mjs`, new `layout*.mjs` files that `draw.mjs` imports, and `index.d.ts` (docs). Every other file must stay byte-identical to the parents'. Do not add a `test/` folder.
>
> **Keep the API:** `layout(pd, opts)` returns plain data `{crossings, points, loops}` that `draw(pd, {layout})` accepts; a stored layout keeps the picture fixed across `crossingChange`; handedness stays right; deterministic (seed any randomness from the PD code, no `Math.random`, no timers, no `process`).
>
> **Budget:** random-knot lesson ≤ **11,776 B** to be promotable (ortho is at 10,825 B, so you have 951 B). Mean draw time under 100 ms per diagram on the bench, with room for a loaded machine.
>
> **Self-check (from your worktree root):**
> ```
> node tools/evolve.mjs size knots gen2-ortho-force
> A=$(mktemp -d)/knots.jsonl
> for s in 1 2 3; do EVOLVE_ARCHIVE=$A node tools/evolve.mjs eval knots gen2-ortho-force gen1-ortho gen1-force --seed=$s; done
> ```
> `eval` stages your candidate with the fixed `test/` and `bench.mjs`, runs all 102 tests, measures size and runs the bench. **Always set `EVOLVE_ARCHIVE` to a scratch file**: never append to `company/rnd/evolution/knots.jsonl`. To see failing tests in detail:
> ```
> T=$(mktemp -d); cp -r src/lab/knots/candidates/gen2-ortho-force/. $T/; cp -r src/lab/knots/test $T/test; cp src/lab/knots/bench.mjs $T/
> cd $T && node --test test/*.test.mjs && EVOLVE_SEED=1 node bench.mjs
> ```
> Your score is not official; the lead scores all three candidates together on fresh seeds.
>
> **NOTES.md** in your candidate folder must cover:
> 1. the idea, in two lines;
> 2. what changed: files and functions, and what came from which parent;
> 3. prior art used and its licence (Bertault 2000 PrEd; Tamassia 1987; Fruchterman & Reingold 1991; no GPL code);
> 4. **internal objectives:** every internal score you optimise or branch on (outer face, keep-or-drop packing, stopping rule), each named as a design goal in its own terms, with its location in the code; or "none". None may reproduce the bench's or the looks test's formulas or constants;
> 5. your bench numbers on seeds 1–3 against `gen1-ortho` and `gen1-force` in the same runs;
> 6. per-entry sizes and the delta against `gen1-ortho`; if any lesson entry grows, by how much and why;
> 7. the looks gate: pass or fail, and your worst table knot's straight and sharp shares if you measured them;
> 8. what you expected and what happened;
> 9. what you would try next.
>
> If the idea is a dead end, say so in NOTES.md with the numbers, and do not switch to another slot's idea. A failed idea, written up, is a result.
>
> **Finish:** `git add src/lab/knots/candidates/gen2-ortho-force && git commit` in your worktree. **Do not push.** Commit nothing outside your candidate folder. Report the commit hash and your NOTES.md summary.

## Slot brief for gen2-force-smooth

> You are an rnd-engineer at System 3 Company, writing **one candidate** in generation 2 of the knots layout evolution. You work alone in your own git worktree. Read `company/rnd/evolution/knots-gen2-brief.md` (the whole brief, especially "Read this first: the looks gate", "The bundle condition", "The internal-objective rule" and "Independence"), then this section.
>
> **Your candidate id:** `gen2-force-smooth` (a **mutation** of `gen1-force`, the current champion). Parent: `gen1-force`, already registered in `src/lab/knots/evolve.json`.
>
> **Idea.** Remove force's wiggle and free its frozen vertices:
> - **one smooth curve per edge** (not a chain of independently moved points);
> - an **angle spring** at edge points, so strands bend evenly;
> - **anisotropic 8-sector PrEd zones** (ImPrEd): a vertex's allowed move is bounded per direction sector, so a nearby segment it is not moving towards does not freeze it.
>
> **And shrink.** gen1-force's random-knot lesson costs 12,095 B. To be promotable the winner must have it at **≤ 11,776 B, so you must cut at least 319 B** while adding the above. Look first at what force carries from gen 0 that it no longer needs. A candidate that misses this may still be a parent, but is not promoted.
>
> **Not yours (other slots own these):** ortho's grid drawing or any orthogonal start, and flow-based compaction.
>
> **Starting point.** From your worktree root:
> ```
> cp -r src/lab/knots/candidates/gen1-force src/lab/knots/candidates/gen2-force-smooth
> rm src/lab/knots/candidates/gen2-force-smooth/NOTES.md
> ```
> You may read `gen1-force`, `gen0-baseline`, the library README, `PRIOR-ART.md` and `company/rnd/evolution/knots-gen1.md`. Do not read `gen1-ortho`'s code or any other `gen2-*` folder.
>
> **Where to write:** only `src/lab/knots/candidates/gen2-force-smooth/`. Inside it you may change only `draw.mjs`, new `layout*.mjs` files that `draw.mjs` imports, and `index.d.ts` (docs). Every other file must stay byte-identical to `gen1-force`'s. Do not add a `test/` folder.
>
> **Keep the API:** `layout(pd, opts)` returns plain data `{crossings, points, loops}` that `draw(pd, {layout})` accepts; a stored layout keeps the picture fixed across `crossingChange`; handedness stays right; deterministic (seed any randomness from the PD code, no `Math.random`, no timers, no `process`). Keep passing the looks gate (gen1-force passes it at 18 % / 1.1 % worst).
>
> **Internal objective you inherit:** gen1-force keeps the circle packing unless relaxing raises its clearance by more than 60 %. If you keep that rule, or change it, you must name it in NOTES.md as a design goal in its own terms.
>
> **Speed:** mean draw time under 100 ms per diagram on the bench, with room for a loaded machine. gen1-force paid −11.71 once at load average 20; do not get slower.
>
> **Self-check (from your worktree root):**
> ```
> node tools/evolve.mjs size knots gen2-force-smooth
> A=$(mktemp -d)/knots.jsonl
> for s in 1 2 3; do EVOLVE_ARCHIVE=$A node tools/evolve.mjs eval knots gen2-force-smooth gen1-force --seed=$s; done
> ```
> `eval` stages your candidate with the fixed `test/` and `bench.mjs`, runs all 102 tests, measures size and runs the bench. **Always set `EVOLVE_ARCHIVE` to a scratch file**: never append to `company/rnd/evolution/knots.jsonl`. To see failing tests in detail:
> ```
> T=$(mktemp -d); cp -r src/lab/knots/candidates/gen2-force-smooth/. $T/; cp -r src/lab/knots/test $T/test; cp src/lab/knots/bench.mjs $T/
> cd $T && node --test test/*.test.mjs && EVOLVE_SEED=1 node bench.mjs
> ```
> Your score is not official; the lead scores all three candidates together on fresh seeds.
>
> **NOTES.md** in your candidate folder must cover:
> 1. the idea, in two lines;
> 2. what changed: files and functions;
> 3. prior art used and its licence (Bertault 2000 PrEd; Simonetto et al. 2011 ImPrEd; Fruchterman & Reingold 1991; no GPL code; KnotPlot may inform ideas only);
> 4. **internal objectives:** every internal score you optimise or branch on (including the inherited packing rule), each named as a design goal in its own terms, with its location in the code; or "none". None may reproduce the bench's or the looks test's formulas or constants;
> 5. your bench numbers on seeds 1–3 against `gen1-force` in the same runs;
> 6. per-entry sizes and the delta against `gen1-force`, with the random-knot entry stated against the 11,776 B target; if any lesson entry grows, by how much and why;
> 7. the looks gate: pass or fail, and your worst table knot's straight and sharp shares if you measured them;
> 8. what you expected and what happened;
> 9. what you would try next.
>
> If the idea is a dead end, say so in NOTES.md with the numbers, and do not switch to another slot's idea. A failed idea, written up, is a result.
>
> **Finish:** `git add src/lab/knots/candidates/gen2-force-smooth && git commit` in your worktree. **Do not push.** Commit nothing outside your candidate folder. Report the commit hash and your NOTES.md summary.

## Slot brief for gen2-ortho-round

> You are an rnd-engineer at System 3 Company, writing **one candidate** in generation 2 of the knots layout evolution. You work alone in your own git worktree. Read `company/rnd/evolution/knots-gen2-brief.md` (the whole brief, especially "Read this first: the looks gate", "The bundle condition", "The internal-objective rule" and "Independence"), then this section.
>
> **Your candidate id:** `gen2-ortho-round` (a **mutation** of `gen1-ortho`). Parent: `gen1-ortho`, already registered in `src/lab/knots/evolve.json`.
>
> **Idea.** Does ortho's spacing survive once it must look round where it matters?
> - a **packing branch** for reduced diagrams where the circle packing is planar (take the packing from `gen0-baseline/draw.mjs`), so table knots pass the looks gate;
> - **ortho everywhere else**;
> - **flow-based compaction** of the orthogonal drawing (for example, min-cost flow or longest-path on the horizontal and vertical constraint graphs, as in topology–shape–metrics) to shorten ortho's long parallel runs and tight U-turns.
>
> **Hard limit: no force relaxation of any kind.** No springs, repulsion, gravity, stress majorization, PrEd/ImPrEd zones, or any iterative energy-driven node moves, and no code from `gen1-force`. That keeps this slot a distinct idea from the crossover. Allowed: the packing, grid and flow computations, the affine stretch to fill the view box, and geometric smoothing of polylines into curves.
>
> **Starting point.** From your worktree root:
> ```
> cp -r src/lab/knots/candidates/gen1-ortho src/lab/knots/candidates/gen2-ortho-round
> rm src/lab/knots/candidates/gen2-ortho-round/NOTES.md
> ```
> You may read `gen1-ortho`, `gen0-baseline`, the library README, `PRIOR-ART.md` and `company/rnd/evolution/knots-gen1.md`. Do not read `gen1-force`'s code or any `gen2-*` folder.
>
> **Where to write:** only `src/lab/knots/candidates/gen2-ortho-round/`. Inside it you may change only `draw.mjs`, new `layout*.mjs` files that `draw.mjs` imports, and `index.d.ts` (docs). Every other file must stay byte-identical to `gen1-ortho`'s. Do not add a `test/` folder.
>
> **Keep the API:** `layout(pd, opts)` returns plain data `{crossings, points, loops}` that `draw(pd, {layout})` accepts; a stored layout keeps the picture fixed across `crossingChange`; handedness stays right; deterministic (no `Math.random`, no timers, no `process`).
>
> **The packing branch decision is an internal objective.** "Reduced and the packing is planar" is a generic test on the diagram; any further score you use to keep or drop the packing must be named in NOTES.md. Detecting the table is disqualifying.
>
> **Budget:** random-knot lesson ≤ **11,776 B** to be promotable (ortho is at 10,825 B, so you have 951 B for the packing and the compaction). Mean draw time under 100 ms per diagram on the bench.
>
> **Self-check (from your worktree root):**
> ```
> node tools/evolve.mjs size knots gen2-ortho-round
> A=$(mktemp -d)/knots.jsonl
> for s in 1 2 3; do EVOLVE_ARCHIVE=$A node tools/evolve.mjs eval knots gen2-ortho-round gen1-ortho gen0-baseline --seed=$s; done
> ```
> `eval` stages your candidate with the fixed `test/` and `bench.mjs`, runs all 102 tests, measures size and runs the bench. (`gen1-ortho` scores 0 because it fails the looks gate; compare its bench metrics in the archive file `$A`.) **Always set `EVOLVE_ARCHIVE` to a scratch file**: never append to `company/rnd/evolution/knots.jsonl`. To see failing tests in detail:
> ```
> T=$(mktemp -d); cp -r src/lab/knots/candidates/gen2-ortho-round/. $T/; cp -r src/lab/knots/test $T/test; cp src/lab/knots/bench.mjs $T/
> cd $T && node --test test/*.test.mjs && EVOLVE_SEED=1 node bench.mjs
> ```
> Your score is not official; the lead scores all three candidates together on fresh seeds.
>
> **NOTES.md** in your candidate folder must cover:
> 1. the idea, in two lines;
> 2. what changed: files and functions, and what came from gen0-baseline;
> 3. prior art used and its licence (Tamassia 1987; Tamassia, Di Battista & Batini 1988; circle packing as in gen 0; spherogram is GPL, so documentation only, no code);
> 4. **internal objectives:** every internal score you optimise or branch on (outer face, keep-or-drop packing, compaction cost), each named as a design goal in its own terms, with its location in the code; or "none". None may reproduce the bench's or the looks test's formulas or constants;
> 5. a statement that the candidate uses no force relaxation;
> 6. your bench numbers on seeds 1–3 against `gen1-ortho` and `gen0-baseline` in the same runs;
> 7. per-entry sizes and the delta against `gen1-ortho`; if any lesson entry grows, by how much and why;
> 8. the looks gate: pass or fail, and your worst table knot's straight and sharp shares if you measured them;
> 9. what you expected and what happened;
> 10. what you would try next.
>
> If the idea is a dead end, say so in NOTES.md with the numbers, and do not switch to another slot's idea. A failed idea, written up, is a result.
>
> **Finish:** `git add src/lab/knots/candidates/gen2-ortho-round && git commit` in your worktree. **Do not push.** Commit nothing outside your candidate folder. Report the commit hash and your NOTES.md summary.
