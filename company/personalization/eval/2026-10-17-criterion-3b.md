# Criterion 3b: one blind candidate (`reachable-v2`) against the default order, in criterion 3's world

owner: personalization-eval (Uma) · run: eval-k5-1017 (draft), eval-k6-1017 (W-1591, K-e, freeze) · board: W-1572 (batch 5 K5, K6), W-1591 · brief: company/personalization/batches/2026-10-17-batch-5.md#k5 (mailbox 20261017T171622463Z-vp-personalization-d9257031)
status: frozen (eval-k6-1017, 2026-10-17; the freeze commit and this file's sha256 are in "## 12. Freeze", written in the next commit; nothing below changes after the first scored number)
candidate sha256: 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 (`company/personalization/policies/reachable-v2.ts`; from reachable-v2-build-note.md §6 freeze line only; K6 checked `git show 3a5cd1f:company/personalization/policies/reachable-v2.ts | sha256sum` gives the same value, §7)
V3 record: company/decisions/2026-10-17-vp-personalization-readout-3-decisions.md ("R3 accepted", run vp-v3-1017, commit 7fef752)
records beside it: company/personalization/eval/2026-10-17-criterion-3.md (frozen 709ca2d) and its readout company/personalization/eval/2026-10-17-criterion-3-readout.md (readout 3, run at b1ae294). **Readout 3 stays the record.** This file re-runs none of its readings.
harness: company/personalization/eval/harness/c3b/ (README.md there: how to run and reproduce) · S record: company/personalization/eval/harness/records/2026-10-17-seeds-c3b-k5.json
branch: perso-c3b-k5 (worktree /home/user/s3c-k5) for the draft; perso-c3b-k6 (worktree /home/user/s3c-k6) for K6

This criterion judges **one candidate**, `reachable-v2` (batch 5 C2; it replaces `reachable-v1`, retired unscored, batch 5 §11.1), against `default-order + fixed` in criterion 3's world, which it imports unchanged. It measures and reports. It contains no keep or kill text. vp-personalization's go/no-go rules (batch 5 §4) read its output. They are not part of it, and nothing here was written to fit them.

## 0. What I read, what I ran, and what I did not read

**Read for this draft:** the K5 brief; batch 5 in full (§0, §3 and §4 with care); criterion 3 in full; readout 3's two manifests and the validity, rule-3 and reference-arm descriptive blocks of its verdicts.json; criterion 2 §I, §1.4, §2.1 to §2.3, §3 and §12; every file in harness/c3/; scorer2.mjs; the phase A glue (`catalog`, `seedHistory`, `poolFor`); sim/catalog.mjs; personas.copy.mjs; model.ts `FORBIDDEN_INPUTS`; the privacy ruling's N3; AMD-008 P1 and P2. For copy-check calibration (§4.2) only: model/sim/review-timing.ts, composer.ts, learner.ts, model/review-timing-curves.ts, model.ts, c2/harness2.mjs, c2/learner2.mjs, c3/learner3.mjs.

**Not read:** the candidate file `company/personalization/policies/reachable-v1.ts`, its build note, and A1's parameter sheet. None of them exists in this worktree (branch perso-c3b-k5 from fccae6f has no `company/personalization/policies/`), and I did not open C1's worktree. **Every validity check in §4 and every threshold in it was written before the candidate file was read.**

**Anchoring disclosure.** I authored criterion 3, the reachable-signal oracle and readout 3, and I know their numbers. The rule-3 field was REACHABLE 6 of 6 in `interleave:base` with Δ from +0.0102 to +0.0176 against δ_min 0.01. `first:base` won 5 of 6. Three sensitivity cells won 0 of 6 (forgetScale-high, learnRate-low, prereqPenalty-low). The choices below (base cell, cell roles, seeds) were made knowing this. Where a choice could lean for or against the candidate, I say which way.

**What I ran in K5:**
- The reference arm (`default-order + fixed`) alone, for S on 3b's seed block (§3) and for the chain check 3b-ID2 at readout 3's seeds (§1.1).
- The fixture candidate (the default order behind the candidate interface, `harness/c3b/fixtures/fixture-default-order.ts`) in the slot: tests and `run3b.mjs --plumbing`.
- Criterion 3's reachable oracle in the slot, at readout 3's seeds 1001–1002, for 3b-ID1. That test compares episode hashes and returns booleans. No score was read, and those episodes are readout 3's own published arm.
- The copy check on control files only (§4.2).

**No candidate was run, and nothing was scored.**

**K6 (eval-k6-1017), before the freeze.** Read: the K6 brief (mailbox 20261017T193416066Z-vp-personalization-bd7b2f8d); batch 5 §0, §3, §4, §6 K6 and R4, §11, §12, §13; `company/personalization/policies/default-order-rule.md` in full (it is now in the builder's permitted set and it is what W-1591 asks the probe to be read against); the V3 record's header and R3 line; `src/lib/visibility.ts`'s header (for K-e). From the candidate side, only: its sha256 at 3a5cd1f; its `export` lines (by `grep`, for §7 step 3); the module's export names when loaded (no call, no episode); and from its build note the §6 freeze line, plus one line (§1, "four hunks … byte-identical to v1") that a `grep` for the freeze line printed. I did not read the candidate's code body, its tests, the rest of its build note, F5 or F5b. Every check and threshold in §4 still predates any reading of the candidate's behaviour; the K6 additions (§4.3 K-e and the order rule, §11) touch the judge's side only.

## I. The candidate interface the harness enforces

C1 builds from batch 5 §6 C1's text and need not read this section. It records what the slot does with the file, so K6 can find a mismatch before any number exists (§I.5).

**I.1 File.** `company/personalization/policies/reachable-v2.ts` (K6; was `reachable-v1.ts`, retired unscored): one TypeScript file with erasable syntax only (Node's type stripping: no `enum`, `namespace` or parameter properties), and no imports. The freeze is that file's content sha256, written into the `candidate sha256:` line above at K6.

**I.2 Exports and output.** Named exports `decide` and `rank`, or exactly one exported object holding both as functions (slot.mjs `loadCandidate`).
- `rank(input)` returns an array that lists **every eligible lesson exactly once**, best first. A lesson is eligible if it is a key of `input.dims` and not a `slug` in `input.history`. Each item has `slug` (string) and `value` (a finite number). Any other fields, such as a reason code and its facts, are the builder's. They are kept in no score.
- `decide(input)` is `rank(input)[0]` (JSON-equal), or `null` when nothing is eligible.
- An item's `reason` must not be the string `"due-revisit"`, which criterion 3's episode loop reserves for revisit cards.

**I.3 Input.** It is exactly the object criterion 3's oracle received (harness3.mjs `reachableInput`): `now`, `history` (`slug`, `completedAt`, `predictedCorrectly` true, false, null or absent, and `recalls` `{at, correct}` cut to the last 30 days), `dims` (the world's lesson pool: `slug`, `domain`, `concept`, `level`, `prerequisites`, `successors`, `status` and the simulated `misconceptionStrength`) and `slots`. There is no `fixedDue`. It is built fresh at every new-card pick and deep-frozen.

**I.4 Constraints:** no clock, randomness, environment, I/O or state between calls (V1, V2, V3, V7). It must not mutate its input (V4) and must read no field outside I.3 (V5).

**I.4a What K6 found (§7 step 3, exports only, no call).** The module exports `rank`, `decide`, `REACHABLE_V2` (an object holding `name`, `version`, `rank`, `decide`) and `internals`. `slot.mjs loadCandidate` takes the named `decide` and `rank` first, so the export's rename from `REACHABLE_V1` to `REACHABLE_V2` needs no change to the harness: no harness file imports either object by name. Its declared item type is `{ slug, value, reason }`, as I.2. Its declared `decide` type is `RankedLesson | undefined`; the checks already read `decide(x) ?? null` and the episode loop reads a falsy pick as none, so `undefined` where nothing is eligible is the same answer as `null`. No §I.5 adapter was needed.

**I.5 A mismatch found at K6.** If the file's exports or item fields are named differently from I.2 (for example `lesson` for `slug`), K6 records it before the freeze. The record goes in §11 and in the readout, and vp-personalization is told. K6 then writes a field-name adapter that changes no pick. This is a change to the draft made before any number, not a re-tuning. A behaviour that breaks I.2 to I.4 is not adapted: it fails its check (§4).

## 1. The world and the candidate slot

### 1.1 Criterion 3's world, unchanged and byte-checked
The E1 block, the E3 block as filled in K4, the placements, learner3 (L11), `cells3`, the episode, the final test and the metric R₇ = K(T₇)/N_ref (criterion 3 §1, criterion 2 §1.3) are all imported from harness/c3/ and harness/c2/, and none is copied or edited. Every run starts with these checks, and a failure stops the run as an eval defect:
- **3b-ID0.** Three checks:
  - the 16 files readout 3's manifest hashes (c3, c2, phase A glue, model.ts, composer, catalog.mjs) are byte-identical to readout 3's `fileSha256`;
  - criterion 3's file has the manifest's `criterionSha256` (78e2b513…);
  - the catalogue built from the pilot meta.json and curriculum files has sha256 27b535da…, its value at b1ae294.

  I added the third check because readout 3's manifest hashes catalog.mjs but not the lesson files it reads. I computed the value with `loadCatalog` over `git archive b1ae294` of those files, and this tree gives the same value.
- **3b-ID1.** The slot is criterion 3's episode (§1.2). Two comparisons: the fixture in the slot against the reference arm, and the oracle in the slot against criterion 3's `reachable+fixed`. Both match on episode hash and world hash over 6 cells (both base cells, `interleave:slots-low`, `interleave:prereqPenalty-high`, `first:revisitSlotCost-high` and `interleave:price-corner`), 6 personas and seeds 1001–1002: 144 episode pairs. **K5: 144 of 144 identical.**
- **3b-ID2 (chain).** The reference arm at readout 3's seeds (1001–2932), in both base cells, reproduces the reference-arm descriptive means that readout 3's verdicts.json printed, all 13 fields for each persona, compared as JSON text. Only the reference arm is run. **K5: 12 of 12 (cell, persona) rows identical** (§5).
- **T5c,** criterion 3's static check, run again.

### 1.2 The slot
Criterion 3's `runEpisode3` refuses a candidate (its §7), and it must not change. It already has one order rule that serves an outside `decide()` on the permitted input: the `reachable` branch. 3b fills that branch with the candidate.

How it works: slot.mjs installs an in-thread resolve hook (Node's `module.registerHooks`). Only for a second instance of `../c3/harness3.mjs` (URL query `?c3b-slot=candidate`), the hook resolves that file's import of `./reachable-oracle.mjs` to `slot-shim.mjs`. The shim serves the candidate's `decide`. Every other module is the single shared instance: c2, learner3, world3, the judge and model.ts. So in the candidate's episodes, the placements, slot cost, stop law, learner, final read, INVALID-pick guard and counters are **criterion 3's code byte for byte**. The candidate gets exactly the frozen object the oracle got, at the same moments. No episode logic is copied into c3b/.

**What the candidate does not get.** The oracle received each cell's population values (`reachablePop`). The slot passes those values to the shim, and the shim ignores them. The candidate holds base values only (batch 5 §3), so in the sweep cells it is misspecified, as a shipped rule would be. **This favours the oracle row over the candidate in every non-base cell.** That is intended, and the readout repeats it beside the candidate-vs-oracle row (§2.3).

**Ties and the default order.** If the candidate derives the default order from `dims` differently from the catalogue, its tied picks differ from the reference arm's and count as moved cards. This is not a validity failure. It is part of what the candidate does.

### 1.3 The metric
Unchanged from criterion 3 §1.3 and criterion 2 §1.3. Δ is paired per seed: (K_cand(T₇) − K_ref(T₇)) / N_ref, where N_ref is the reference arm's lesson count in the same cell at the same seed. R₁ and R₃₀ are reported in the base cells. Engagement is never an input to the outcome.

## 2. The pair, the rule and the cells

### 2.1 The base cell, named before any score: `interleave:base`
Reasons, written before any candidate exists in this tree:
1. Criterion 3 §2.0 as restated in K4: an ordering rule can reach a learner only as a list of its own picks (lessons not yet done), served by Feed.tsx's interleave code. That is this cell's form.
2. The evidence that led to this candidate (readout 3's rule-3 field) was read in this cell. The candidate is tested where its design was measured.
3. S's rule (§3) is set in this cell, as in criteria 2 and 3.

**Which way it leans.** In readout 3 the oracle did best here: 6 of 6 wins, against 5 of 6 in `first:base`. So this is the cell more favourable to the design. I keep it for reasons 1 to 3. **To offset that, `first:base` enters the outcome** (§2.2): a candidate that does not beat the reference in `first:base` cannot PASS.

### 2.2 The pair, the rule and the outcome
**The named pair:** `reachable-v2 + fixed` (label `candidate+fixed`) vs `default-order + fixed`. The review schedule is fixed for both, in Feed.tsx's queue order within the interleave (criterion 3 §1.1).

**The rule in one cell:** criterion 2 §2.1 in full, unchanged (scorer2.mjs `judgePair2`, guardrails `ordering`). The candidate **beats** the reference when all three hold:
1. It wins in at least 4 of 6 personas. A win has the lower end of the 95% t interval of Δ_p above 0, and Δ_p ≥ δ_min = 0.01.
2. No persona is harmed. A harm is Δ_p ≤ −0.01 with the upper end of the interval below 0.
3. The ordering guardrails G1 to G4 (criterion 2 §3, thresholds unchanged, against the reference arm of the same cell) hold for every persona:
   - G1: the top-domain share upper end ≤ +0.05;
   - G2: distinct concepts, lower end / ref ≥ −0.05;
   - G3: the prerequisite-first share upper end ≤ +0.02;
   - G4: the knowledge gain lower end / ref ≥ −0.05.

**The outcome over the sweep** (scorer2.mjs `outcome2`, unchanged):
- **PASS:** beats the reference in the base cell and in every one-at-a-time cell.
- **FAIL-SENSITIVE:** beats it in the base cell but not in some one-at-a-time cell. Those cells are named.
- **FAIL:** does not beat it in the base cell.
- **INVALID:** any check in §4 fails, or any candidate episode throws. INVALID overrides the others. The scores are still printed, marked INVALID.

**The cells and their role.** These are criterion 3's 40 cells, unchanged (`cells3`). Their roles are set here, before any score (harness3b.mjs `cells3b`). Criterion 2's "one-at-a-time" means one row moved from the base cell, and I apply that literally:

| Role | Cells | Count |
|---|---|---|
| base | `interleave:base` | 1 |
| one-at-a-time (in the outcome) | criterion 3's one-at-a-time cells in the interleave: 18 from criterion 2's rows and 8 from E3 bounds. Also `first:base`, which moves one row: the placement. | 27 |
| reported (no rule) | `first`'s 8 E3 cells (two rows moved: the placement and one E3 row); `interleave:priorRateMult-outer`, `first:priorRateMult-outer`; `interleave:price-corner`, `first:price-corner` | 12 |

Criterion 3 called `first`'s E3 cells one-at-a-time relative to `first:base`. It had no outcome, so nothing there conflicts with this.

**Printed for every cell:** per persona, Δ with its 95% t interval, win and harm, and each of G1 to G4 with its interval and whether it holds. Also the cell's wins, harmed personas, guardrail failures and whether the candidate beats the reference there. The base cell and `first:base` get full tables (readout3b-tables.mjs). The readout lists every reported cell where the candidate does not beat the reference (`reportedCellsNotBeaten`). Those cells change no outcome.

### 2.3 Printed beside the pair (no rule reads these)
- **The oracle row:** criterion 3's `reachable + fixed` vs the reference arm, in both base cells, on 3b's seeds, with the full rule's rows. It is a fresh replicate of readout 3's row on a disjoint seed block. It re-reads nothing in readout 3, and readout 3's field stands as printed.
- **Candidate vs oracle:** Δ = (K_cand − K_oracle)/N_ref, per persona with its interval, in both base cells. It shows how much of the design's measured value the blind build gets. Read it with §1.2's note: the oracle knew each cell's values, but in the base cells both use base values. That is why this row is printed in the base cells only.
- **R₁ and R₃₀ in the base cells,** and the descriptive counts (new lessons, revisits, cards, moved share, refresh picks, and the rest). `refreshSkipped` is criterion 3's counter, and it has the defect criterion 3's readout §2 names: it caps near 1. It is printed and nothing reads it.

### 2.4 Not in this criterion
There are no review rows, no O1 split, no second candidate, no re-tuning and no keep or kill text. This file gives no go/no-go reading. Batch 5 §4 is vp-personalization's and reads the rows above.

## 3. Seeds and S

**Rule.** Criterion 2 §1.4, unchanged: S = max(200, ⌈(2.8·√2·sd_R/δ_min)²⌉), capped at 2000. sd_R is the largest per-persona SD of R₇ of the **reference arm alone** at the base cell.

**The block: disjoint from criterion 3's, seeds 40001 to 40000+S, pilot 40001–40500.** Reasons:
1. The candidate was commissioned after readout 3 was read at seeds 1001–2932, with thin margins (+0.0102 against δ_min 0.01 at the low end). A candidate built from that oracle's design and scored on the same seeds would inherit any seed luck that made the oracle look reachable. That is a selection effect on those seeds, and a fresh block removes it.
2. The oracle row on the fresh block is an independent replicate of readout 3's row (§2.3).
3. No arm has been run on 40001+ (earlier blocks: 1001–3000 scored, 5001–5100 tuning).

**The cost:** the candidate cannot be paired with readout 3's own episodes. The oracle row is re-run on the new block to keep the pairing.

**K5: S = 2000 (the cap), seeds 40001–42000.** The largest per-persona SD is sd_R = 0.1216 (lapsed-returner), for which the rule gives ⌈…⌉ = 2319. The other personas gave 0.050 to 0.088, needing 389 to 1210 seeds. The figures come from the reference arm alone at `interleave:base`, pilot seeds 40001–40500. Record: harness/records/2026-10-17-seeds-c3b-k5.json, which holds SDs only and pins E1 c8c09eac…, E3 0e120add… and the catalogue 27b535da…. Criterion 3's pilot (1001–1500) gave 0.1110 and S = 1932, so the cap binds here and did not there. At S = 2000, lapsed-returner gets less than the rule's target power, under the rule's own unpaired approximation (common random numbers usually narrow the paired SD). I state this rather than move the cap, as criterion 2 did.

3b-ID2 runs the reference arm at readout 3's seeds for the chain check only. The candidate never runs on them.

## 4. Validity checks on the candidate (written before the candidate was read)

### 4.0 When and on what
K6 runs every check inside run3b.mjs, after the freeze, on the candidate's **own** inputs: every new-card input of its episode at the first scored seed (40001), for each of the 6 personas, in both base cells. The cross-process checks use 2 personas (curious-newcomer, returning-expert) per base cell. **Any failure, or any error thrown by a candidate episode, makes the candidate INVALID** (batch 5 §4 G4 reads INVALID as NO-GO). In K5 every check runs only on fixtures (§5).

### 4.1 The checks

| # | Check | How (checks3b.mjs) | Source |
|---|---|---|---|
| V1 | **Imports nothing; reads no clock, random number, environment or I/O.** | Static, on the code with comments and strings removed. Fails on: any `import` (type-only included) or re-export `from`; any of `Math.random`, `Date`, `performance`, `process`, `globalThis`, `require`, `fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `sessionStorage`, `indexedDB`, `document`, `window`, `navigator`, `setTimeout`, `setInterval`, `setImmediate`, `queueMicrotask`, `eval`, `Function`, `crypto`, `WebAssembly`, `SharedArrayBuffer`, `Atomics`, `Worker`, `import.meta` | batch 5 §3, C1 brief; criterion 2 §I.4 item 1 |
| V2 | **Replay, in process.** | The same input twice gives the same `[decide, rank]`, compared as JSON | AMD-008 P1; criterion 2 §I.4 item 1 |
| V3 | **Replay across processes.** | (a) Call level: the inputs are written to a file, and a fresh Node process loads the candidate and must print the same `[decide, rank]` for each input. (b) Episode level: `harness3b.mjs episode` in two fresh processes prints the same episode hash. | batch 5 K5 |
| V4 | **Frozen input; no mutation.** | The slot passes a deep-frozen input, so a write throws (and an episode error is INVALID). A deep unfrozen copy must be unchanged after the call, and must give the same answer. | criterion 2 §I.4 item 2 |
| V5 | **Forbidden-input invariance** (AMD-008 P2, privacy N3) | Each key in model.ts `FORBIDDEN_INPUTS` (age band included), plus `gapDays`, `daysSinceLastSession`, `settings`, `persona`, `personaId`, `fixedDue`, `day`, `sessionIndex` and `seed`, is added alone at two numeric and two string values. Then N3's form is applied: every key at once, at the top level and on every history item, at the same four values. The output must equal the unaltered output each time. | privacy ruling N3; AMD-008 P2 test |
| V6 | **`now` only as elapsed time.** | Moving every timestamp by +37 days + 12,345 ms and by −400 days changes nothing. | criterion 2 §I.3 |
| V7 | **No state between calls.** | Two other inputs first (another persona's and a later pick's), then this one: the same output. A freshly imported module instance (URL query), called on the same input, gives the same output as the warm one. | batch 5 K5 |
| V8 | **Well formed** (§I.2) | `rank` lists every eligible lesson once, each with a string `slug` and a finite `value`. `decide` is `rank[0]`, or `null` iff nothing is eligible. No `reason` equals `"due-revisit"`. Separately, the episode loop throws INVALID on an ineligible pick. | §I.2 |
| V9 | **Hash.** | The file's sha256 equals the `candidate sha256:` line, which equals C1's frozen hash (§7). The lock refuses a mismatch before any episode. | batch 5 §2 |
| V10 | **Copy check** against `harness/c3/reachable-oracle.mjs` | §4.2 | batch 5 §3 |

### 4.2 The copy check (copy-check.mjs): measures, thresholds, corpus, calibration

**The question:** does the candidate share text with the oracle's file beyond what both could take from the texts the builder was allowed to read?

**The corpus** is batch 5 §3's "C1 reads only" list, read as git objects:
- criterion 3, criterion 2, E1 (`evidence/2026-10-16-criterion-2-ranges.md`), E3 (`evidence/2026-10-17-criterion-3-ranges.md`), model.ts and src/kit/progress.ts, all at 709ca2d;
- batch 5 at be5a812;
- **at K6, A1's sheet** (`company/personalization/policies/reachable-v1-params.md`), at its commit, through `--corpus-extra=<commit>:<path>`. **K6: at 48218b3** (its last commit; the file at HEAD is identical).
- **at K6, the order rule** (`company/personalization/policies/default-order-rule.md`) **at b4bad91**, the text batch 5 §11.1 added to the builder's permitted set for v2 (K6-5, §11).

Nothing else may be added to the corpus. **Not added, on purpose:** `reachable-v1.ts` and its build note. C2 rebuilt from them, but v1 is the candidate's own earlier version and was never copy-checked against the oracle; putting it in the corpus would hide any text v2 inherited from v1 that v1 had taken from the oracle. `src/lib/feed-index.ts` is named by the rule as a source a builder may read, but it is not in C2's list (batch 5 §11.1), so it stays out.

**The measures and thresholds.** Any one reaching its threshold is a **copy finding → INVALID**:

| | Measure | Threshold |
|---|---|---|
| M1 | Comments: 6-word shingles of comment text shared with the oracle's comments, minus every shingle found in the corpus | **≥ 3** (about one copied 8-word comment phrase) |
| M2 | Code: the longest run of consecutive names (identifiers in order; keywords, numbers, comments and strings dropped) shared with the oracle | **≥ 12 names** |
| M3 | Names: identifiers of 4 or more characters in both files' code that are absent from the corpus, both as written and as a spelled-out phrase (`predictionFeedback` ← "prediction feedback"), and are not JavaScript/TypeScript built-ins or common words | **≥ 4** |

Shared long numeric literals (6 or more significant digits, not in the corpus) are listed and reported only. An honest build could share a standard quadrature table.

**Calibration, on control files only, before the candidate was read** (pinned in tests3b.test.mjs):

| Control | M1 | M2 | M3 | Result |
|---|---|---|---|---|
| independent authors: review-timing.ts, composer.ts, model.ts, sim/learner.ts, review-timing-curves.ts, the 3b fixture | 0 | 1–6 | 0 | clean |
| same author, same world (eval): c2/harness2.mjs, c2/learner2.mjs | 1 | 5–8 | 1–2 | clean |
| same author, same run as the oracle: c3/learner3.mjs | 3 (the shared header line "owner … run: eval-k3-1017") | 8 | 2 | finding (not an independent control; listed for honesty) |
| P1 the oracle verbatim | 448 | 497 | 21 | finding |
| P2 names outside the corpus renamed, comments kept | 392 | 26 | 0 | finding |
| P3 comments stripped | 0 | 497 | 21 | finding |
| P5 the fixture plus the oracle's step-1 block (about 20 lines) | 0 | 110 | 5 | finding |
| P6 comments stripped, names outside the corpus renamed | 0 | 26 | 0 | finding |
| P7 the step-1 block with its 8 local names renamed | 0 | 15 | 2 | finding |
| **P4 comments stripped and every name renamed** | 0 | 4 | 0 | **clean: the limit** |

**The limit, stated with the thresholds.** A lexical check cannot see a copy whose comments are all removed and whose names are all changed (P4). F5 reads the candidate's code against §2.2's text (batch 5 F5), and this check does not replace that. The check prints its shared shingles, run and names, so F5 and vp-personalization can read them whatever the result.

### 4.3 Input facts K-a to K-d and two probes (F5's request, answered before any score)

learning-scientist-personalization (F5, company/personalization/evidence/2026-10-17-reachable-v1-fidelity.md §4, commit 74fdb37) asked, through the dispatcher, for yes/no checks on the input the harness gives the candidate. I took only the four questions as relayed. I have not read the F5 file or the candidate. The answers come from the judge's side: criterion 3's `reachableInput`, unchanged, in K5 at seeds 40001 and 1001.

| # | Question | Answer (K5) | How |
|---|---|---|---|
| K-a | Does the key order of `dims` equal the default order the reference arm uses? | **NO.** The key order is the catalogue's lesson order: probability lessons by slug, then cs lessons by slug (harness.mjs `poolFor` maps `cat.lessons`). The first difference is at position 1. The default order (round-robin across domains) **can** be derived from `dims` by the catalogue's rule: criterion 3's RS7, and this criterion's fixture, which reproduces the reference arm hash for hash (3b-ID1). | checks3b.mjs `inputFacts` |
| K-b | Does the rating field's name match what the candidate reads? | The harness gives **`misconceptionStrength`** on every lesson, as an integer 1, 2 or 3 (the simulated rating). Whether the candidate reads that name I cannot say without reading the candidate. That comparison is F5's. The behaviour probe below shows, at K6, whether rank responds to the field at all. | `inputFacts`, `ratingProbe` |
| K-c | Are the ratings drawn at ρ 0.5? | **YES.** `poolFor(cat, seed, CRITERION2.rho.value)` with ρ = 0.5 (world2.mjs `CRITERION2.rho`). | `inputFacts` |
| K-d | Does `dims` hold the pilot catalogue only? | **YES.** 230 lessons, domains `probability` and `cs`, the same set as the catalogue's lessons. | `inputFacts` |
| K-e (K6; F5b R6, batch 5 §13) | Does `dims` hold any lesson with status draft or retired? | **NO** (K6, before the freeze, judge side only). At every seed 40001–42000, `dims` holds the same 230 lessons, 222 published and 8 review. Each entry's `status` equals its own `src/demos/<domain>/<slug>/meta.json` status. The pilot's one draft on disk, `probability/small-gap-big-extremes`, is not in `dims` (sim/catalog.mjs lists published and review only, as src/lib/visibility.ts serves them). No pilot lesson on disk is retired. | checks3b.mjs `keGate` (pre-score gate in run3b.mjs: a failure stops the run before any score); `inputFacts` `Ke_*` on the candidate's own inputs |
| W-1591 (K6) | Does order rule v1 (`default-order-rule.md`) give the reference arm's default order on `dims`? | **YES.** The judge's transcription of the rule's steps 1–4 (`orderRuleV1`, written from the rule's text) equals `cat.defaultOrder`, the order the reference arm serves, and its 230-slug vector has the rule file's sha256 04bf48f4…. It does not change when the key order of `dims` is reversed. So the tie-order probe's "in default order" count is also the count in the rule's order; the probe prints both. | `orderRuleV1`, `inputFacts` `Kf_*`, `tieOrderProbe` `inOrderRule`; tests3b |

**What I did and did not do with K-a.** I did **not** change the input. The object is built by criterion 3's `runEpisode3`, which must not change (batch 5 §0), and the reference arm, the oracle and the candidate must see the same object. Neither criterion 2 §I.3 nor batch 5's C1 brief makes key order part of the interface. The brief says the default order is "derived from `dims` by the catalogue's rule". (A note for S1, not for this criterion: the product's client index, D2, will have a key order of its own.) If the candidate breaks ties by key order, its tied picks differ from the default order. §1.2 already treats that as part of what the candidate does, not as a validity failure. Whether that calls for a `reachable-v2` before scoring is vp-personalization's decision (batch 5 G6). *(Decided in batch 5 §11.1: yes; v1 retired unscored, v2 built from order rule v1. K6 reads the probe against that rule, W-1591 row below.)* I do not read F5 or the candidate to judge it.

**Built into the run, recorded before any score, never INVALID** (run3b.mjs `validity`; verdicts.json `validity.inputFacts`, `validity.probes`; printed by readout3b-tables.mjs):
- the facts K-a to K-d on the first input of each persona in both base cells;
- **tie-order probe:** across every input of the candidate's own validity episodes, the number of adjacent `rank` items with exactly equal `value`, and how many of those pairs follow the default order and (K6, W-1591) order rule v1's order;
- **rating probe:** the number of inputs where rotating the rating field across lessons changes `rank`.

Neither probe reads the candidate's source. Tests pin K-a = no, K-c = 0.5 and K-d = yes, and pin the fixture's probes (all ties in default order, no response to ratings).

## 5. Tests (harness/c3b/tests3b.test.mjs; K5: all pass; criterion 3's own tests still pass)

| Test | Checks |
|---|---|
| 3b-ID0 | readout 3's 16 file hashes, criterion 3's sha256 and the catalogue's hash (27b535da…) |
| 3b-ID1 | the slot = criterion 3's episode: fixture = reference arm, oracle in the slot = `reachable+fixed`, 144 of 144 |
| T5c | criterion 3's static check, unchanged |
| cells | 40 cells; the roles are 1 base, 27 one-at-a-time (26 in the interleave and `first:base`), 12 reported; the base is `interleave:base` |
| lock | a non-fixture candidate is refused while the criterion is a draft, with no hash, with a wrong hash or with no V3 record; it is allowed only with all four in place (on temporary copies, so the test holds after the freeze); fixtures always run; the oracle row only after the freeze |
| V1–V8 | the fixture passes every check. Each bad fixture, written to a temporary directory, fails its own check: `Math.random` (V1, V2), an import (V1), `Date` (V1), module state (V7), mutating its input (V4), reading `sessionCount` (V5), reading a forbidden field on a history item (V5, N3 form), using `now` as a clock (V6), `decide` ≠ `rank[0]` (V8), rank missing a lesson (V8), and a `"due-revisit"` reason (V8) |
| V3 | the fixture replays across processes, at call level and episode level |
| V9 | the hash check accepts the right hash and refuses a wrong one |
| V10 | the thresholds are as §4.2; the controls in §4.2's table give the results printed there |
| S | the S record follows the rule at this E1, E3 and catalogue, on 3b's block |
| plumbing | `run3b.mjs --plumbing`: every Δ, guardrail Δ and candidate-vs-oracle Δ is exactly 0 (the fixture is the reference arm), validity is ok, and the outcome is FAIL (0 wins) |

## 6. The brief's requirements and what I did with each

1. **One named pair under criterion 2 §2.1's full rule, with the outcome over the sweep, per persona with intervals in the base cell, `first:base` and every cell:** done, as §2.2. `first:base` also enters the outcome as a one-at-a-time cell.
2. **The base cell named before any score:** `interleave:base` (§2.1), with the reasons and the direction it leans.
3. **Seeds and S by my rule, saying whether I reuse criterion 3's seeds:** a disjoint block, with the reasons (§3). S = 2000.
4. **Validity checks written before reading the candidate:** cross-process replay V3, frozen input V4, forbidden-input invariance V5, no state V7, imports nothing V1, and the copy check V10 with its thresholds. Also V2, V6, V8 and V9 (§4).
5. **The interface `decide`/`rank` on criterion 2 §I.3's object, the file path, and its sha256 filled at freeze from C1's build note:** §I, the header line, §7.
6. **Optional: a reported-only cell over a wider catalogue. REFUSED.** Criterion 3's world cannot hold one without a change to its world:
   - The personas' latent prior knowledge and interest are defined for the two pilot domains only (personas.copy.mjs `latent.priorKnowledge`, `latent.interest`), and the visible pre-history is drawn from those two domains by name (harness.mjs `seedHistory`: `"probability"`, `"cs"`).
   - The catalogue builder's `PILOT` is fixed (sim/catalog.mjs), and readout 3's manifest hashes that file.

   A wider cell would need, for every added domain, a prior-knowledge rate and an interest for each persona. No E1 or E3 row gives those, so I would have to invent them. That is a new world, not a cell of criterion 3's world. The scope limit stands, and S1 should know it: **this criterion's evidence covers the pilot catalogue (probability and cs, 230 lessons) only** (batch 5 O4). A wider world needs learning-scientist-personalization's ranges first.
7. **Plumbing on a fixture only; no real candidate run, no score:** done (§0, §5).

No requirement needs a change to criterion 3 or its harness.

## 7. The lock, and what K6 does before the first number

**The lock** (harness3b.mjs `assertCandidateAllowed`, `assertOracleAllowed`):
- Fixtures (files in `harness/c3b/fixtures/`) run at any time.
- Any other candidate runs only when all of these hold: this file's `status:` line is `frozen`; its `candidate sha256:` line holds the file's sha256; and its `V3 record:` line names a file that exists. The third condition is batch 5 §0 item 2: no candidate score before R3 is accepted in writing.
- The oracle row runs only after the freeze.
- The reference arm runs at any time.

**K6, in order:**
**K6 record (eval-k6-1017).** Steps 1–6 done before any number; each line says how.

1. Answer every F5 row that touches the judge. A row that touches the candidate is the VP's (batch 5 G6). *K6: F5 and F5b were decided by vp-personalization (batch 5 §11.1, §13); the only rows sent to the judge are F5b R6 (K-e, answered in §4.3 and gated in run3b) and W-1591 (the order rule, §4.3). I did not read F5 or F5b.*
2. Take the candidate's hash from C1's build note, from its freeze line only, and check it: `git show <C1 freeze commit>:company/personalization/policies/reachable-v1.ts | sha256sum` must give the same value. The rest of the build note is read only after the readout's findings are written (evaluators see the artifact before the account). *K6: v2's build note §6 freeze line gives 2666271f…6714 at 3a5cd1f; `git show 3a5cd1f:company/personalization/policies/reachable-v2.ts | sha256sum` and the file in this tree give the same value.*
3. Load the file and check its exports against §I.2. Do not run an episode. Any field-name mismatch goes through §I.5. *K6: §I.4a; no mismatch.*
4. Write the hash into `candidate sha256:` and the V3 record's path into `V3 record:`. *K6: done (header).*
5. Add A1's sheet at its commit to the copy check's corpus (`--corpus-extra`), as §4.2 says. *K6: 48218b3, and the order rule at b4bad91 (§4.2, K6-5).*
6. Set `status: frozen` and commit. Write the freeze commit's hash in a second commit.
7. Run the one scored run (§8). After the first number, nothing in this file changes. Any change is a new criterion, and the old result stands.

## 8. Compute and reproduction

**Units.** 40 cells × 2 arms (reference and candidate) × 6 personas × S = 2000 gives 960,000 scored episodes. The oracle row adds 2 base cells × 6 personas × 2000 = 24,000. The chain check (3b-ID2) adds 2 × 6 × 1932 = 23,184 reference episodes. The reference arm takes about 12 ms per episode at 8 positions (S pilot: 3,000 episodes in 48 s). The candidate's time per call is unknown until K6, and the manifest records it. If it costs about what the oracle did (0.34–0.52 ms per call, about 30–40 ms per episode), the run takes **about 2 to 3 h at --jobs=4**. Memory: about a third of readout 3's score count. Use `NODE_OPTIONS=--max-old-space-size=8192`.

**The run (K6, after the freeze), one part covering both placements, so the outcome is complete:**
```sh
NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=8192 node company/personalization/eval/harness/c3b/run3b.mjs \
  --candidate=company/personalization/policies/reachable-v2.ts --seeds=2000 --jobs=4 \
  --corpus-extra=48218b3:company/personalization/policies/reachable-v1-params.md,b4bad91:company/personalization/policies/default-order-rule.md --out=<dir>
node company/personalization/eval/harness/c3b/readout3b-tables.mjs --dir=<dir>    # markdown, unedited into the readout
```
**Outputs:**
- results.ndjson: one line per (cell, arm, persona), every episode's score;
- verdicts.json: the judge checks, the chain, validity V1–V10, `candidateInvalid`, the pair by cell, the outcome, the reported rows, the horizons and the descriptive counts;
- manifest.json: the commit; criterion 3b's status and sha256; the V3 record; the candidate's path, sha256 and expected sha256; criterion 3's sha256; the E1, E3 and catalogue hashes; S and the seeds; the copy thresholds and corpus extra; 23 file hashes; errors; the timing; and `seconds`.

**Reproduction (R4, determinism only).**
1. Make a fresh worktree at the manifest's `commit` and run `npm ci`.
2. Check the sha256 of criterion 3b against `criterion3bSha256`, of the candidate against `candidate.sha256`, and of every `fileSha256` entry (paths relative to harness/c3b/).
3. Run the same command with the same S, `--corpus-extra` and candidate path, at any `--jobs`, in a separate process.
4. Compare results.ndjson and verdicts.json byte for byte. manifest.json may differ only in `seconds`, `timing` and (if the worktree differs) paths.

harness/c3b/README.md has the details. Every random draw is a hash of a string key (learner2's scheme). Neither the judge nor the reference arm reads a clock, `Math.random` or the environment, and the candidate is checked for the same (V1).

## 9. Limits (they travel with any reading of this criterion)

- **The judge's world and the judge's equations** (batch 5 §3). The candidate is designed from the equations criterion 3 §2.2 describes, and scored in the world they describe. A result here says how a faithful blind build of the written design does for simulated learners in that world. It is not evidence about real learners.
- **The pilot catalogue only** (§6 item 6).
- **The copy check is lexical** (§4.2, P4).
- **In the sweep cells the candidate is misspecified, and the oracle was not** (§1.2). That is intended.
- **Reason codes are not checked for truth here.** Their form is the builder's. They are checked by C1's tests and by fact-checker through RC. No reason code enters a score.
- **Criterion 3's own limits carry over:** Feed.tsx departures D1–D4, the scroll-past refused (criterion 3 §10.1 B4), the miss-versus-hit stop not modelled (N4), the placement effect on encoding not modelled (N7), and `slots` sourced from analytics (N5).

## 10. Open before the freeze (K6)

- F5 (learning-scientist-personalization) has not run. Any blocking row that touches the judge is answered here before the freeze.
- C1's frozen hash and the V3 record (§7).
- A1's sheet's commit, for the copy check's corpus (§4.2).

*K6: all three closed (§7 record). Nothing is open before the freeze.*

## 11. Changes after this draft

Every change before the freeze, with its run and reason. No change is made after the first scored number.

| # | Run | Where | Change | Reason |
|---|---|---|---|---|
| K5-1 | eval-k5-1017 | §4.3, checks3b.mjs, run3b.mjs, readout3b-tables.mjs | input facts K-a to K-d and two report-only probes added to the pre-score set (no input changed; nothing made INVALID) | F5 request relayed by the dispatcher during K5 (74fdb37 §4) |
| K6-1 | eval-k6-1017 | title, header, §I.1, §2.2, §7, §8, harness3b.mjs `CANDIDATE_PATH`, README, run3b.mjs usage line | the candidate is `reachable-v2` (sha256 2666271f…6714, 3a5cd1f), not `reachable-v1` | W-1591; batch 5 §11.1 (v1 retired unscored, G6) |
| K6-2 | eval-k6-1017 | §I.4a | the export rename `REACHABLE_V1` → `REACHABLE_V2` needs no harness change (the loader takes the named `rank` and `decide`; nothing imports the object by name) | K6 brief step 2; F5b R2 |
| K6-3 | eval-k6-1017 | §4.3 K-e, checks3b.mjs `keGate`, `inputFacts` `Ke_*`, run3b.mjs | K-e: a pre-score gate that stops the run, before any score, if `dims` holds a draft or retired lesson (every seed; statuses read from `dims` and from each lesson's meta.json); recorded again on the candidate's own inputs | batch 5 §13 (F5b R6); K6 brief step 4 |
| K6-4 | eval-k6-1017 | §4.3 W-1591 row, checks3b.mjs `orderRuleV1`, `inputFacts` `Kf_*`, `tieOrderProbe` `inOrderRule` | the tie-order probe is also read against order rule v1, transcribed judge-side from default-order-rule.md's text; the rule's order = the reference arm's order is checked and printed | W-1591 (batch 5 §11.6 item 3) |
| K6-5 | eval-k6-1017 | §4.2 corpus | the order rule at b4bad91 is added to the copy check's corpus, beside A1's sheet at 48218b3. **Which way it leans:** towards a clean result (it can only remove shared shingles and names from M1 and M3; M2 does not read the corpus). Reason: §4.2's corpus is the texts the builder was allowed to read, and batch 5 §11.1 added the rule to that set for v2. v1's file and build note are not added (§4.2) | batch 5 §11.1 |
| K6-6 | eval-k6-1017 | readout3b-tables.mjs | every cell now prints the full per-persona table (Δ and its interval, win, harm, and each of G1 to G4 with its Δ, interval, judged statistic and holds/fails), not only the base cells; the formatter still computes nothing. §2.2 already required this; the K5 formatter printed only cell-level guardrail fails outside the base cells | §2.2 "Printed for every cell"; K6 brief "Guardrails, reported per cell" |
