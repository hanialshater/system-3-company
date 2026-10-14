# knots fix1-bigon: registration, re-score and widths (follow-up, not a generation)

rnd-lead (Bram) · 2026-10-14, session 2 (branch ccr-rnd-ncm) · authority: VP ruling §4 path 1 in
[knots-gen2.md](knots-gen2.md) ("Import block, bigons (b)"), and the design lead's condition 1 in
[2026-10-14-knot-pictures.md](../../design/reviews/2026-10-14-knot-pictures.md) §1d. Candidate: rnd-engineer's
`src/lab/knots/candidates/fix1-bigon/` (its NOTES.md is the builder's account; I read it before scoring, because it
named the files that had to move. Every number below is my own run, not copied from it.)

## Declared before the first official run

- **N = 3 fresh seeds** (no `--seed`), both ids in one `eval` per seed, every run counts, no re-drawn or dropped seeds.
- Command: `node tools/evolve.mjs eval knots fix1-bigon gen2-force-smooth` (official archive `company/rnd/evolution/knots.jsonl`).
- Load: the 1-minute average from `/proc/loadavg` just before and just after each run (4 cores, shared machine).
- Evaluator: unchanged (103 tests, `evolve.json` weights, benchWeights, budgets, mutable all as before). The only
  `evolve.json` change is the lineage line `"fix1-bigon": ["gen2-force-smooth"]`.
- Widths: `company/rnd/evolution/knots-fix1/measure-bigons.mjs --table=kit` (definitions unchanged from the builder's).

## Gate fix (done before the runs)

- `measure-bigons.mjs` and `renders/` moved out of the candidate to `company/rnd/evolution/knots-fix1/` (they are not
  in `mutable`, so the frozen-file check would refuse them; NOTES §8). The script now imports the two candidates and
  the kit by path from there and gained `--table=kit`; the width definitions and the 15.00 self-check are unchanged.
  The candidate's NOTES.md still names the old paths; it is the builder's file and the check ignores it, so I left it.
- After the move, fix1-bigon differs from its parent only in `draw.mjs` and `index.d.ts`, both mutable. The runs below
  show it gated in with no problems.

## Official scores (archive `company/rnd/evolution/knots.jsonl`, 6 records)

| run | seed | load before -> after | gen2-force-smooth | fix1-bigon | g = fix1 - parent |
|---|---|---|---|---|---|
| 1 | 58990022 | 4.55 -> 5.61 | 10,654.04 (103/103) | 10,648.65 (103/103) | **-5.39** |
| 2 | 199423437 | 5.61 -> 5.72 | 10,640.71 (103/103) | 10,637.46 (103/103) | **-3.25** |
| 3 | 275312650 | 5.72 -> 5.54 | 10,653.75 (103/103) | 10,644.18 (103/103) | **-9.57** |

**Median g = -5.39** (range -9.57 to -3.25). Negative on all 3 seeds. Noise floor (gen 0) 15.

Where it comes from (fix1 minus parent, per run 1 / 2 / 3, weighted):

| term | run 1 | run 2 | run 3 |
|---|---|---|---|
| spacing (x5): 11.69->11.20, 9.33->8.98, 12.15->11.11 | -2.45 | -1.75 | -5.20 |
| crossing spread (x1): 66.86->64.24, 65.19->63.06, 66.57->62.54 | -2.62 | -2.13 | -4.03 |
| aspect (x0.5) | -0.06 | -0.21 | -0.45 |
| jonesSpeed (x0.2), timing noise: same code in both | +0.17 | +1.27 | +0.54 |
| size (-0.002 x +216 B mean lesson) | -0.43 | -0.43 | -0.43 |

Extra crossings 0 and planar 100 % for both on all three seeds; slow penalty 0; the unknot and Jones metrics are
identical apart from timing (same code). So the loss is spacing and spread only, as the builder reported (her self-score
median -7.8 on seeds 1-3 at load 11-14, outside the archive; mine is the official one).

## Sizes (gzip, from the archive records, identical on all runs)

| entry | gen2-force-smooth (= kit today) | fix1-bigon | delta |
|---|---|---|---|
| draw-a-table-knot | 5,459 | 5,673 | +214 |
| tricolour-check | 9,739 | 9,957 | +218 |
| unknot-game | 7,095 | 7,314 | +219 |
| random-knot | 11,377 | **11,592** | +215 (VP condition <= 11,776: 184 B under; gate 12,288) |
| whole library | 11,391 | 11,612 | +221 |

## Widths on the kit's derived table (view box 100)

`node company/rnd/evolution/knots-fix1/measure-bigons.mjs [before] --table=kit`, i.e. `draw(Kit.KNOTS[n].pd, {gap: 0})`
with the candidate's draw. Definitions (the builder's, unchanged): **bigon width** = the larger of the two one-way
maximum distances between the bigon's two edge curves (48 samples per cubic), ratio = width / chord between its two
crossings; **face width** = for each edge of a region, the largest distance from its middle third to the region's other
edges, the region's width is the smallest of these, and the column is the diagram's minimum over all regions.

| knot | bigons | min bigon width before -> after | ratio before -> after | min face width before -> after |
|---|---|---|---|---|
| **3_1** | 3 | **7.7 -> 23.5** (floor 20: **pass**, margin 3.5) | 0.10 -> 0.58 | 7.7 -> 18.2 |
| **4_1** | 2 | **8.3 -> 17.0** (floor 15: **pass**, margin 2.0) | 0.12 -> 0.33 | 8.3 -> 12.0 |
| 5_1 | 5 | 12.4 -> 19.8 | 0.27 -> 0.53 | 12.4 -> 18.0 |
| 5_2 | 3 | 10.0 -> 14.3 | 0.19 -> 0.44 | 10.0 -> 13.9 |
| 6_1 | 4 | 10.2 -> 11.0 | 0.24 -> 0.44 | 10.2 -> 11.0 |
| 6_2 | 3 | 9.7 -> 14.6 | 0.21 -> 0.42 | 9.7 -> 14.6 |
| 6_3 | 2 | 9.0 -> 8.6 | 0.17 -> 0.28 | **4.7 -> 2.7** |
| 7_1 | 7 | 10.8 -> 16.3 | 0.32 -> 0.55 | 10.8 -> 14.9 |
| 7_2 | 5 | 9.8 -> 11.0 | 0.26 -> 0.43 | 9.8 -> 11.0 |
| 7_3 | 5 | 9.3 -> 9.0 | 0.23 -> 0.52 | 9.3 -> 8.8 |
| 7_4 | 4 | 9.8 -> 14.4 | 0.25 -> 0.45 | 9.8 -> 14.1 |
| 7_5 | 4 | 9.1 -> 9.6 | 0.19 -> 0.45 | 9.1 -> 9.5 |
| 7_6 | 3 | 9.1 -> 9.1 | 0.21 -> 0.37 | 9.1 -> 9.1 |
| 7_7 | 2 | 8.9 -> 16.0 | 0.20 -> 0.47 | 8.9 -> 12.2 |
| 10_8 | 7 | 8.0 -> 11.0 | 0.29 -> 0.42 | 8.0 -> 10.9 |
| **all prime table knots** | | **7.7 -> 8.6** | **0.10 -> 0.28** | **4.7 -> 2.7** (6_3, a triangle) |
| L2a1 (Hopf) | 4 | 4.2 -> 5.1 | 0.04 -> 0.05 | 1.3 -> 3.3 |
| random12 | 8 | 5.6 -> 4.6 | 0.24 -> 0.23 | 5.6 -> 4.1 |
| `randomKnot(1..200)` defaults, 1,013 bigons | | min 3.9 -> 3.8, 5th pct 5.5 -> 5.0, median 8.3 -> 13.1 | | per diagram: min 3.4 -> 3.3, 5th pct 5.0 -> 4.0, median 7.5 -> 6.7 |

- **3_1 and 4_1 are identical on the kit table and the lab table** (same diagrams). Several others differ slightly
  between the two tables (6_1 10.0 lab / 11.0 kit; 6_2, 7_4, 7_5, 7_7), because the kit's derived diagrams are not the
  lab's. The kit numbers are the ones that count for shipping.
- **Narrowest face:** on table knots it is 6_3 (2.7, down from 4.7); next narrowest 7_3 (8.8). On the lesson family
  (`randomKnot` defaults) the 5th-percentile narrowest face falls 5.0 -> 4.0 while the median bigon opens 8.3 -> 13.1.
- The layout is deterministic (no seed), so these are not sampled numbers; the self-check passed on every run.

## Design-lead conditions (2026-10-14-knot-pictures.md §1d), where each stands

| # | Condition | State |
|---|---|---|
| 1 | rnd-lead registers and re-scores fix1-bigon, with measure-bigons widths on the kit table, 3_1 >= 20, 4_1 >= 15; files moved out first | **Met by this record.** Registered, gated in, 3 official seeds, 3_1 23.5, 4_1 17.0. Any change to the candidate that takes either below its floor goes back to the design lead. |
| 2 | Kit update follows the tier the principal engineer rules (kit README and eng review 6b say tier 2; the handoff said tier 1) | **Open, principal-engineer.** I did not touch `src/kit`. My view, for them: it changes every table drawing, so tier 2 (a short EDD-004 addendum, linking this record) looks right to me. |
| 3 | cm-math-discrete consulted on the fix1 trefoil before tricolour-check ships | **Open, cm-math-discrete.** |
| 4 | Each lesson's contact sheet design-reviewed at phone size before launch | **Open, design-lead**, at each lesson's launch. |
| 5 | Block (b) stands until 1 and 2 are met | 1 met; block stands on 2. |

Also carried from that ruling: 6_3 not cleared for any lesson under either version; random-knot pictures need their own
design look before block (a) lifts; block (a) (extra crossings) is not touched by this candidate.

## My call on the score

**The lower score stands as a measurement and does not decide.** Under evolution.md step 5 (VP tie rule), the paired
differences are all inside the 15-point noise floor (|g| <= 9.57), so on score alone this is a **tie**, and the
selection goes to evidence outside the score. It is not a statistical nothing, though: g is negative on 3/3 official
seeds and on the builder's 3 tuning seeds, and the cause is structural (an open lens uses room the spacing and spread
terms reward leaving to other strands). I record it as a real, small cost (about 1.5 % of the layout term), not noise.

The evidence outside the score: the briefed requirement for this follow-up (VP ruling §4 (b)1) is a bigon-width
judgement the bench cannot make, and on it fix1-bigon takes the minimum width/chord on every prime table knot from 0.10
to 0.28 and clears both design floors, with no new extra crossings (0 on all bench seeds; builder's 0/1,000 at the
random-knot settings) and size inside the VP's condition. Against it: 6_3's narrowest face and the low tail of random
diagrams' faces get thinner. **Selected: fix1-bigon over gen2-force-smooth for the kit's drawing**, subject to
condition 2 (the principal engineer's tier ruling) before anything in `src/kit` changes. This is not a generation and
does not reopen evolution (VP ruling §2).

How sure: the scores and widths are measured and reproducible (**sure**). That the trade is right for lessons rests on
the design lead's reading at 360 px (**fairly sure**, as she says); 6_3 is the known loser.

## Proposed evaluator change (not made; needs a re-score if adopted)

Evaluator gap 2 (knots-gen2.md) is now the thing deciding this candidate, and the bench is blind to it. I propose a
**width check in the looks test** (`src/lab/knots/test/`), using the definitions above:

1. **Bigon gate:** every bigon of every prime table knot has width/chord >= 0.25 (fix1-bigon's minimum is 0.28;
   gen2-force-smooth's 0.10 would fail on 3_1, 4_1, 5_2, 6_1, 6_2, 6_3, 7_3, 7_5, 7_6, 7_7).
2. **Named floors:** 3_1 >= 20 and 4_1 >= 15 absolute (the design-accepted pictures).
3. **Face width as a reported number, not a gate yet.** A floor that fails 6_3 at 2.7 would fail fix1-bigon too, and
   6_3 is uncleared under both versions; a face floor should come from a design ruling on a contact sheet, not from me.

Adopting it is an evaluator change: the survivors (gen2-force-smooth, fix1-bigon) are re-scored on it with a declared
N before any further `promote`, and since knots evolution is closed, it changes nothing in the generations. It also
needs the test to be cheap (the script measures one table in about a second). Owner: rnd-lead to write, VP to note
(evaluator changes after closure go in the gen-2 record).

## Next moves

| Move | Owner |
|---|---|
| Rule the tier for shipping fix1-bigon's `draw.mjs` + `index.d.ts` into `src/kit/knots`, and do or review it (condition 2) | principal-engineer |
| Trefoil consult for tricolour-check; say in the draw-a-table-knot brief whether learners trace (decides 6_1) | cm-math-discrete |
| Decide whether to adopt the width check above (then I write it and re-score both, N declared) | rnd-lead, VP notes |
| `node tools/evolve.mjs promote knots fix1-bigon` into `src/lab/knots/` only after condition 2 is ruled, so lab and kit move together | rnd-lead |
