# Criterion 3b readout (readout 3b): `reachable-v2 + fixed` vs `default-order + fixed`, one scored run

owner: personalization-eval (Uma) · run: eval-k6-1017 · board: W-1572 (batch 5 K6), W-1591 · brief: company/personalization/batches/2026-10-17-batch-5.md §6 K6, §11.1, §12, §13 (mailbox 20261017T193416066Z-vp-personalization-bd7b2f8d)
criterion: company/personalization/eval/2026-10-17-criterion-3b.md, **frozen at 8e96251bb652cff5d093bede0d324601fb7c624c** (file sha256 at that commit 3a919fc3eaab6d217f97c3c49cd604030106aa82948ef69085ebc52ecdf944e5). The freeze section (§12) was added in **f4f2fbfdef809f172330814230e022d936b6cf6c**, the commit the run read (file sha256 c42411f1a844bbce9b0efeb84a769bef84281d4f70219dbd0e86353f97f1bf6a, in the manifest). The pre-freeze K6 changes (K6-1 to K6-6 in the criterion's §11) are in b1270f7.
candidate: company/personalization/policies/reachable-v2.ts, sha256 **2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714** (frozen at 3a5cd1f; checked with `git show 3a5cd1f:<path> | sha256sum` and by V9 in the run).
seeds: 40001–42000 (S = 2000, criterion 3b §3). Both placements in one run.
records beside it: **readout 1** company/personalization/eval/2026-10-16-phase-a-readout-1.md (phase A; FAIL stands) · **readout 2** company/personalization/eval/2026-10-16-criterion-2-readout.md (criterion 2) · **readout 3** company/personalization/eval/2026-10-17-criterion-3-readout.md (criterion 3; R3 byte-identical, company/personalization/eval/2026-10-17-criterion-3-readout-repro.md). **Readout 3 stays the record.** This readout re-runs none of its readings. Its oracle row on 3b's seeds is a fresh replicate, printed beside, and read by no rule.
run outputs: company/personalization/eval/harness/records/2026-10-17-readout-3b/manifest.json and verdicts.json (committed); results.ndjson (495 MB) not committed, sha256 in §7.
next readers: vp-personalization (G, batch 5 §4 and §12) and learner-model-engineer (R4, reproduction, batch 5 #r4).

This readout is reported unedited. §A is the formatter's output (harness/c3b/readout3b-tables.mjs), pasted as printed. §1 to §8 are my sentences about it. Nothing here is a keep or kill recommendation. G is vp-personalization's.

**No change to criterion 3b after the first scored number.** The freeze commit (8e96251) and the hash commit (f4f2fbf) both came before the run started at 2026-10-17T19:43:06Z. No candidate episode was run before then.

## 0. Order of events, and one aborted start

1. b1270f7: the pre-freeze changes (criterion 3b §11 K6-1 to K6-6), with tests3b (15 of 15 pass, including the plumbing run on the fixture). 8e96251: `status: frozen`. f4f2fbf: the freeze commit and hash written into §12.
2. **One aborted start, disclosed.** At about 19:42Z I started the run under a shell job with a 2-hour limit. I killed it within about a minute, before it got past the judge checks, because the run would outlast that limit. It wrote no output file and no score: its output directory held only an empty log. I restarted the same command, with the same arguments, detached from the shell, at 19:43:06Z. That is the one run. Nothing changed between the two starts.
3. The run finished at 22:39:47Z: 10,596 s (2.94 h) at --jobs=4, exit 0, 0 unit errors.

## 1. The outcome: INVALID, from the copy check (V10, measure M3)

**`verdicts.pair.outcome`: INVALID.** One validity check failed: **V10, the copy check against `harness/c3/reachable-oracle.mjs`**. Its M3 measure (identifiers of 4 or more characters in both files' code, absent from the permitted corpus) counted **4 shared names, at a threshold of 4**: `kappa`, `post`, `prereqs`, `refreshPrior`. M1 (shared comment shingles) was **0** (threshold 3). M2 (longest shared run of names) was **6** (threshold 12): `Math log h predictedCorrectly pr pr`. The only shared long number is `86400000` (one day in ms, reported only).

**Every other check passed.** V1 static: no import, no clock, no randomness. V2 and V4 to V8 held on 817 of the candidate's own inputs in 12 episodes (both base cells, 6 personas, seed 40001). V3 cross-process replay held at call level on 284 inputs and at episode level in 4 of 4 episodes. V9: the hash matched. The candidate threw no error in any episode. The judge checks also passed: 3b-ID0 (16 files, criterion 3, catalogue), 3b-ID1 (144 of 144 episode pairs), T5c, and the 3b-ID2 chain (12 of 12 reference rows of readout 3, compared as text).

**Under §2.2, INVALID overrides the other outcomes, and the scores are printed marked INVALID.** One run was allowed. I did not re-run, change a threshold, or change the corpus after this number.

**What the four names are, facts only (I read the candidate's code after the run, for this paragraph).**
- `kappa`: in the candidate, a function (line 113). In the oracle, a local arrow function (line 49). Criterion 3 §2.2 and A1's sheet write the quantity as the Greek letter κ, and the corpus never spells it `kappa`. The check sees the Latin spelling of κ as a name outside the corpus.
- `post`: in the candidate, a parameter and local holding a domain posterior (lines 217–274). In the oracle, a local holding a posterior recall probability inside a correct-recall update (line 115). Same word, different quantities.
- `prereqs`: in the candidate, a local list of prerequisite facts (line 430). In the oracle, a `Map` from concept to prerequisite set (line 62). The word `prereqs` does not occur in the corpus.
- `refreshPrior`: in both, the refresh value for a prior-known concept: κ at the horizon minus κ at the assumed age plus the horizon, at the prior rate multiplier (candidate line 414, oracle line 54). Criterion 3 §2.2 step 5 describes this term in words ("the refresh value of a prior-known concept"). The check's phrase test looks for the exact phrase "refresh prior", which is not in the corpus.
- All four names are already in `reachable-v1.ts` (retired, never scored or copy-checked). v2 inherited them; its diff from v1 is the tie order (F5b).

**What the check can and cannot say here.** The check is lexical (§4.2, §9). It counted four names over its threshold, and the frozen rule makes that INVALID. It cannot tell whether the four came from the oracle's file or from two authors each naming κ, a posterior, prerequisites and a prior refresh from the same §2.2 text. Calibration (§4.2) gave 0 for independent authors and 1 to 2 for the same author in the same world. No comment text is shared, and the longest shared code run is half the M2 threshold. Those facts sit beside the finding. They do not change it. The builder's account (v1's build note §1: "Never opened … reachable-oracle.mjs") was read after this section was written, and it changes nothing here. A code read against §2.2's text is F5's kind of check, not this one (§4.2's limit paragraph). Whether anything follows is vp-personalization's call (batch 5 §4 G4, G6).

**A self-finding about the check, which changes no result.** Two of the four names are common words or a standard transliteration (`post`, `kappa`). §4.2's `COMMON` list and phrase test did not anticipate them. I set the list and threshold before reading the candidate. Under "Change a frozen criterion only by saying so; the old result stands", **this result stands as INVALID**. Any other treatment of the copy check would need a new criterion, frozen before another run.

## 2. K-e: no draft or retired lesson in `dims` (checked before the first score)

**K-e: NO draft or retired lesson in `dims`. The run went ahead.** How I checked, three ways:
1. **Before the freeze** (judge side, no candidate): `checks3b.mjs keGate` built `dims` exactly as criterion 3's episode does (`poolFor(cat, seed, ρ 0.5, E1)`) at each of the 2,000 seeds. Every seed gave the same 230 lessons: 222 published and 8 review. Each entry's `status` matched that lesson's own `src/demos/<domain>/<slug>/meta.json`. On disk, the pilot domains hold one lesson that is not visible: `probability/small-gap-big-extremes` (draft). It is **not** in `dims`. No pilot lesson on disk is retired. Pinned in tests3b ("K-e gate").
2. **In the run, before any unit was scored:** run3b.mjs calls the same gate right after the judge checks. A failure would have stopped the run with no score. Result: `judge.ke.ok = true`, as above (§A, "K-e gate").
3. **On the candidate's own inputs** (validity episodes, every persona, both base cells): every first input's `dims` has statuses `published`/`review` only (§A, "K-e").

Why the draft is out: sim/catalog.mjs keeps `published` and `review` only, as src/lib/visibility.ts serves them in production. Readout 3's catalogue hash (27b535da…) pins that list, and 3b-ID0 checked it.

## 3. W-1591: the tie order, read against order rule v1

- The criterion now names `reachable-v2` and its hash (K6-1). No harness import named `REACHABLE_V1`: the loader takes the named `rank` and `decide`, so the export rename needed no code change (K6-2, criterion §I.4a).
- The judge transcribed order rule v1 (company/personalization/policies/default-order-rule.md, steps 1 to 4) from its text as `orderRuleV1`. On `dims` it gives the reference arm's default order exactly. Its 230-slug vector has the rule file's sha256 (04bf48f4…), and reversing the key order of `dims` changes nothing (tests3b, `inputFacts` Kf, `keGate.orderRule`).
- **Tie-order probe:** across the candidate's validity inputs there are 121,283 adjacent `rank` pairs with exactly equal `value`. **All 121,283 follow the default order, and all 121,283 follow order rule v1's order.** The K-a defect that retired v1 does not appear in v2's behaviour on these inputs.
- **Rating probe:** rotating `misconceptionStrength` across lessons changes `rank` on 817 of 817 inputs. The candidate reads the rating field (K-b).

## 4. The pair, per cell (printed under INVALID; nothing below lifts it)

These are facts from §A. Every cell's full table, per persona, with Δ and each of G1 to G4 with its interval and whether it holds, is in §A.
- **Harm: none, in all 40 cells, 240 persona rows.** No persona's interval has its upper end below 0 anywhere (no clear loss of any size). Every Δ R₇ mean is positive.
- **`interleave:base` (base):** wins **6 of 6**, Δ R₇ +0.0104 to +0.0187. lapsed-returner +0.0104 [+0.0092, +0.0115] and returning-expert +0.0106 [+0.0096, +0.0116] are within 0.0006 of δ_min on the mean. **G1 fails in 6 of 6 personas**: top-domain share Δ upper end +0.148 to +0.428 against ≤ +0.05. G2, G3 and G4 hold in 6 of 6. So the cell is **not beaten** (rule part 3).
- **`first:base` (one-at-a-time):** wins **4 of 6** (returning-expert +0.0092 [+0.0077, +0.0107] and lapsed-returner +0.0083 [+0.0067, +0.0100] are positive but below δ_min). No harm. **G1 fails in 6 of 6** (upper end +0.205 to +0.455). G2, G3 and G4 hold in 6 of 6. **Not beaten.**
- **Across the sweep: G1 fails in all 240 persona rows of all 40 cells.** G2 fails once: single-subject-crammer in `first:slots-high` (a reported cell). G3 and G4 hold in every row. No cell is beaten, because G1 fails in each.
- **Wins by cell.** 0 of 6 at `interleave:forgetScale-high`, `interleave:learnRate-low` and `interleave:prereqPenalty-low`. 1 of 6 at `forgetShape-high` and `priorKnowledgeMean-high`. 2 of 6 at `first:price-corner`. 4 or more in the other cells. This is readout 3's pattern for the oracle.
- **For the record, and not as an outcome:** apart from validity, the base cell would not be beaten because of G1, and §2.2's sweep rule would read FAIL. The printed outcome is INVALID, which §2.2 puts above the others.

## 5. Printed beside (no rule reads these)

- **Candidate vs oracle, both base cells:** every persona's Δ is within ±0.0006 of 0, and every interval includes 0 (interleave −0.0002 to +0.0002, first −0.0006 to +0.0001). On these seeds the blind build reproduces the oracle's measured value to within the interval. The oracle row on 3b's fresh seeds replicates readout 3's: 6 of 6 wins in `interleave:base` (+0.0104 to +0.0187), 4 of 6 in `first:base`, and G1 failing in 6 of 6 in both cells.
- **Horizons, `interleave:base`:** R₁ +0.0120 to +0.0223; R₃₀ +0.0059 to +0.0107; all intervals above 0.
- **What it does:** the candidate moves 99% of the new cards it serves (movedShare 0.992 to 0.997). Its refreshes are almost all of prior-known lessons, and it serves far fewer refreshes than the reference arm for single-subject-crammer (7.7 vs 15.0 per episode in `interleave:base`). The `refreshSkipped` counter is printed as criterion 3 defines it, with its known cap defect; nothing reads it.
- **Cost:** 67 ms per candidate episode, against 16 ms for the reference arm and 60 ms for the oracle.

## 6. Limits (they travel with any reading of this readout)

Criterion 3b §9, unchanged: the judge's world and equations (a result here is not evidence about real learners); the pilot catalogue only (230 lessons, probability and cs); the copy check is lexical; the candidate is misspecified in the sweep cells, where the oracle was not; reason codes are not checked here; criterion 3's own limits (D1–D4, scroll-past refused, N4, N5, N7).

## 7. Hashes and reproduction (R4, learner-model-engineer; determinism only)

| item | value |
|---|---|
| commit the run read | f4f2fbfdef809f172330814230e022d936b6cf6c (branch perso-c3b-k6) |
| criterion 3b (as read; frozen text at 8e96251) | c42411f1a844bbce9b0efeb84a769bef84281d4f70219dbd0e86353f97f1bf6a (3a919fc3eaab… at 8e96251) |
| candidate reachable-v2.ts | 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 |
| criterion 3 | 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 |
| E1 / E3 / catalogue | c8c09eac7613… / 0e120add6ada… / 27b535dada5d… (full values in manifest.json) |
| V3 record | company/decisions/2026-10-17-vp-personalization-readout-3-decisions.md |
| corpus extra | 48218b3:company/personalization/policies/reachable-v1-params.md, b4bad91:company/personalization/policies/default-order-rule.md |
| results.ndjson (not committed, 494,807,019 bytes) | f4c426e2f046d702baf34f6c453a354e906451f18b61430efb92b8e715ac4f49 |
| verdicts.json | fde8402922ffc43f7350382ca145855dd6f80e430112581ef588f4b3419c1f86 |
| manifest.json | b7f05fd8aa385367eece8cfa1110f6c0edcc25f29900aa40c582469d2019c9d5 |
| tables (readout3b-tables.mjs stdout = §A) | eb2e22c527e455a6b43c803c7a9cea413d4823e93048dc0034b270f2091073ea |
| node | v22.22.0 |

**Steps** (criterion 3b §8; harness/c3b/README.md):
1. Make a fresh worktree at f4f2fbf and run `npm ci`. Check that the criterion, the candidate and every `fileSha256` entry in manifest.json have the hashes above.
2. Run, from the repository root:
   `NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=8192 node company/personalization/eval/harness/c3b/run3b.mjs --candidate=company/personalization/policies/reachable-v2.ts --seeds=2000 --jobs=4 --corpus-extra=48218b3:company/personalization/policies/reachable-v1-params.md,b4bad91:company/personalization/policies/default-order-rule.md --out=<dir>`
   It takes about 3 h at --jobs=4; any `--jobs` is fine. Run it detached from any shell time limit.
3. Compare results.ndjson and verdicts.json with the sha256s above, byte for byte. manifest.json may differ only in `seconds`, `timing` and paths.
4. `node company/personalization/eval/harness/c3b/readout3b-tables.mjs --dir=<dir>` reproduces §A. It prints `seconds` and per-episode ms from the manifest, so put those two figures back before you compare its hash.

## 8. What I did not do

I gave no keep or kill reading and applied none of batch 5 §4 or §12's rules: G is vp-personalization's. I did not edit anything under company/personalization/policies/, criterion 3, or harness/c3, c2 or the root harness. I did not re-run. I read the candidate's code only after the run, for §1's paragraph on the four names, and v1's build note §1 only after §1 was written.

## A. The run's tables, as printed by readout3b-tables.mjs (unedited)

## Run
| field | value |
|---|---|
| plumbing | false |
| criterion 3b status / sha256 | frozen (eval-k6-1017, 2026-10-17; the freeze commit and this file's sha256 are in "## 12. Freeze", written in the next commit; nothing below changes after the first scored number) / c42411f1a844bbce9b0efeb84a769bef84281d4f70219dbd0e86353f97f1bf6a |
| V3 record | company/decisions/2026-10-17-vp-personalization-readout-3-decisions.md |
| candidate | company/personalization/policies/reachable-v2.ts (sha256 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714; expected 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714) |
| criterion 3 sha256 | 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 |
| commit | f4f2fbfdef809f172330814230e022d936b6cf6c |
| S, seeds | 2000, 40001..42000 |
| placements | interleave, first |
| E1 / E3 / catalogue | c8c09eac7613… / 0e120add6ada… / 27b535dada5d… |
| node | v22.22.0 |
| seconds | 10596.133 |
| per-episode ms | default-order+fixed 15.7; candidate+fixed 67.1; reachable+fixed 60.0 |

## Judge checks
3b-ID0 true (files 16, criterion 3 true, catalogue true) · 3b-ID1 true (144 episode pairs) · T5c true · 3b-ID2 chain true (12 of 12 rows)

## Candidate validity (criterion 3b §4): **INVALID**
| check | result | detail |
|---|---|---|
| V1 static | true | – |
| V2, V4–V8 on own inputs | true | 817 inputs in 12 episodes |
| V3 call level | true | interleave:base/curious-newcomer 93 inputs true; interleave:base/returning-expert 91 inputs true; first:base/curious-newcomer 49 inputs true; first:base/returning-expert 51 inputs true |
| V3 episode level | true | interleave:base/curious-newcomer true; interleave:base/returning-expert true; first:base/curious-newcomer true; first:base/returning-expert true |
| V9 hash | true | 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 vs 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 |
| V10 copy | false | M1 0 (≥ 3), M2 6 (≥ 12), M3 4 (≥ 4); shared names: kappa, post, prereqs, refreshPrior; shared long numbers: 86400000 |
| candidate episode errors | true | – |

Input facts (§4.3, recorded, never INVALID): K-a dims key order = default order: false (key order = catalogue lesson order: true; default order derivable from dims by the catalogue's rule: true) · K-b rating field `misconceptionStrength` values 1/2/3 · K-c ρ 0.5 · K-d pilot only: true (230 lessons)
K-e (recorded on the candidate's own inputs): dims statuses published/review; no draft or retired lesson on every first input: true · W-1591: order rule v1 (default-order-rule.md) over dims = the reference arm's order: true (vector 04bf48f4…)
K-e gate (before the first score, every seed): true · 230 lessons, statuses {"published":222,"review":8}, 1 lesson set across seeds 40001..42000 (2000); pilot lessons on disk not visible: probability/small-gap-big-extremes (draft, in dims: false); problems: none; order rule = reference order true, vector 04bf48f4… matches the rule file's true
Probes (report only): exact-value tied adjacent pairs in rank 121283, of which in default order 121283 and in order rule v1's order 121283; inputs where a rating permutation changes rank 817 of 817

V10 detail: M1 shingles []; M2 run: `Math log h predictedCorrectly pr pr`

## Outcome: candidate+fixed vs default-order+fixed: **INVALID**

Reported cells (no rule) where the candidate does not beat the reference: interleave:priorRateMult-outer, interleave:price-corner, first:revisitSlotCost-low, first:revisitSlotCost-high, first:revisitStopScale-low, first:revisitStopScale-high, first:slots-low, first:slots-high, first:priorRateMult-low, first:priorRateMult-high, first:priorRateMult-outer, first:price-corner

### interleave:base (base): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0165 | +0.0150 to +0.0181 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6980 (+2.4747 to +2.9213) · +0.0560 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0187 | +0.0175 to +0.0199 | win |  | +0.2728 (+0.2651 to +0.2805) · +0.2805 | +0.1845 (-0.0560 to +0.4250) · -0.0007 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1655 (+4.8975 to +5.4335) · +0.1079 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1655 (+1.0570 to +1.2740) · +0.0166 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9795 (+2.7698 to +3.1892) · +0.0731 | **fails** | holds | holds | holds |
| returning-expert | +0.0106 | +0.0096 to +0.0116 | win |  | +0.1430 (+0.1379 to +0.1482) · +0.1482 | +2.8235 (+2.7784 to +2.8686) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2390 (+2.0380 to +2.4400) · +0.0628 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0131 to +0.0153 | win |  | +0.2973 (+0.2906 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0355 (+2.8291 to +3.2419) · +0.0719 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0115 | win |  | +0.2785 (+0.2714 to +0.2856) · +0.2856 | +0.9410 (+0.8232 to +1.0588) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1445 (+1.9396 to +2.3494) · +0.0662 | **fails** | holds | holds | holds |

### first:base (one-at-a-time): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0225 | +0.0203 to +0.0248 | win |  | +0.4401 (+0.4357 to +0.4445) · +0.4445 | +0.9930 (+0.9489 to +1.0371) · +0.0215 | -0.5975 (-0.5987 to -0.5962) · -0.5962 | +1.7850 (+1.6188 to +1.9512) · +0.0494 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0200 | +0.0183 to +0.0218 | win |  | +0.3097 (+0.3032 to +0.3162) · +0.3162 | -0.6760 (-0.9602 to -0.3918) · -0.0187 | -0.5629 (-0.5647 to -0.5612) · -0.5612 | +2.8730 (+2.6338 to +3.1122) · +0.0778 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0163 | +0.0145 to +0.0182 | win |  | +0.4510 (+0.4474 to +0.4545) · +0.4545 | +1.0730 (+0.9787 to +1.1673) · +0.0350 | -0.5530 (-0.5554 to -0.5506) · -0.5506 | +1.5780 (+1.4356 to +1.7204) · +0.0639 | **fails** | holds | holds | holds |
| returning-expert | +0.0092 | +0.0077 to +0.0107 |  |  | +0.1984 (+0.1921 to +0.2046) · +0.2046 | +0.8785 (+0.8594 to +0.8976) · +0.0147 | -0.5134 (-0.5155 to -0.5112) · -0.5112 | +1.2515 (+1.0521 to +1.4509) · +0.0424 | **fails** | holds | holds | holds |
| wanderer | +0.0153 | +0.0135 to +0.0170 | win |  | +0.3772 (+0.3708 to +0.3836) · +0.3836 | +0.9465 (+0.9226 to +0.9704) · +0.0235 | -0.5710 (-0.5729 to -0.5692) · -0.5692 | +1.5875 (+1.4206 to +1.7544) · +0.0539 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0083 | +0.0067 to +0.0100 |  |  | +0.3560 (+0.3492 to +0.3627) · +0.3627 | +0.7470 (+0.6551 to +0.8389) · +0.0283 | -0.5695 (-0.5726 to -0.5664) · -0.5664 | +0.8435 (+0.7051 to +0.9819) · +0.0453 | **fails** | holds | holds | holds |

### Every cell (summary)
| cell | role | wins | harmed | guardrail fails | beats | Δ by persona (lo, hi) |
|---|---|---|---|---|---|---|
| interleave:base | base | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:forgetScale-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.024 (+0.022, +0.026); single +0.029 (+0.028, +0.031); struggling +0.022 (+0.020, +0.023); returning +0.014 (+0.013, +0.015); wanderer +0.021 (+0.019, +0.022); lapsed +0.016 (+0.015, +0.018) |
| interleave:forgetScale-high | one-at-a-time | 0 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.006 (+0.005, +0.007); single +0.005 (+0.005, +0.006); struggling +0.004 (+0.003, +0.004); returning +0.005 (+0.005, +0.006); wanderer +0.005 (+0.005, +0.006); lapsed +0.003 (+0.003, +0.004) |
| interleave:forgetShape-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.016, +0.019); single +0.020 (+0.019, +0.021); struggling +0.014 (+0.013, +0.015); returning +0.011 (+0.010, +0.012); wanderer +0.015 (+0.014, +0.016); lapsed +0.011 (+0.010, +0.012) |
| interleave:forgetShape-high | one-at-a-time | 1 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.011 (+0.010, +0.012); single +0.009 (+0.008, +0.010); struggling +0.007 (+0.006, +0.008); returning +0.008 (+0.007, +0.008); wanderer +0.009 (+0.008, +0.010); lapsed +0.006 (+0.005, +0.007) |
| interleave:kSpread-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.019 (+0.018, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.011) |
| interleave:kSpread-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.016 (+0.014, +0.018); single +0.019 (+0.018, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.010 (+0.009, +0.011); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:revisitStrengthen-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:revisitStrengthen-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.016 (+0.015, +0.018); single +0.019 (+0.018, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:relearn-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.016 (+0.015, +0.018); single +0.019 (+0.018, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:relearn-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.016, +0.019); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.011 (+0.009, +0.012) |
| interleave:priorKnowledgeMean-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.020 (+0.018, +0.021); single +0.015 (+0.014, +0.016); struggling +0.014 (+0.013, +0.015); returning +0.015 (+0.014, +0.016); wanderer +0.017 (+0.016, +0.018); lapsed +0.014 (+0.013, +0.015) |
| interleave:priorKnowledgeMean-high | one-at-a-time | 1 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.010 (+0.008, +0.011); single +0.017 (+0.016, +0.018); struggling +0.008 (+0.007, +0.009); returning +0.005 (+0.004, +0.005); wanderer +0.009 (+0.008, +0.010); lapsed +0.006 (+0.005, +0.007) |
| interleave:learnRate-low | one-at-a-time | 0 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.008 (+0.007, +0.009); single +0.007 (+0.006, +0.008); struggling +0.005 (+0.004, +0.006); returning +0.006 (+0.005, +0.007); wanderer +0.006 (+0.005, +0.007); lapsed +0.005 (+0.004, +0.006) |
| interleave:learnRate-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.027 (+0.025, +0.028); single +0.032 (+0.031, +0.033); struggling +0.022 (+0.021, +0.023); returning +0.017 (+0.015, +0.018); wanderer +0.021 (+0.020, +0.022); lapsed +0.016 (+0.015, +0.017) |
| interleave:prereqPenalty-low | one-at-a-time | 0 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.002 (+0.001, +0.004); single +0.010 (+0.009, +0.011); struggling +0.003 (+0.002, +0.004); returning +0.005 (+0.004, +0.006); wanderer +0.003 (+0.002, +0.005); lapsed +0.002 (+0.001, +0.003) |
| interleave:prereqPenalty-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.041 (+0.039, +0.042); single +0.034 (+0.032, +0.035); struggling +0.030 (+0.029, +0.031); returning +0.020 (+0.019, +0.021); wanderer +0.031 (+0.030, +0.033); lapsed +0.025 (+0.023, +0.026) |
| interleave:pullScale-low | one-at-a-time | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.020 (+0.018, +0.021); single +0.017 (+0.016, +0.018); struggling +0.014 (+0.013, +0.015); returning +0.009 (+0.008, +0.009); wanderer +0.015 (+0.014, +0.017); lapsed +0.012 (+0.011, +0.013) |
| interleave:pullScale-high | one-at-a-time | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.014 (+0.013, +0.015); struggling +0.015 (+0.014, +0.016); returning +0.012 (+0.011, +0.014); wanderer +0.013 (+0.012, +0.015); lapsed +0.010 (+0.009, +0.011) |
| interleave:revisitSlotCost-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:revisitSlotCost-high | one-at-a-time | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.019); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.010 (+0.009, +0.011); wanderer +0.014 (+0.013, +0.016); lapsed +0.011 (+0.009, +0.012) |
| interleave:revisitStopScale-low | one-at-a-time | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.016 (+0.015, +0.018); single +0.019 (+0.017, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.010 (+0.009, +0.011); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.011) |
| interleave:revisitStopScale-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.018 (+0.016, +0.020); single +0.018 (+0.017, +0.020); struggling +0.014 (+0.013, +0.015); returning +0.010 (+0.009, +0.011); wanderer +0.015 (+0.013, +0.016); lapsed +0.011 (+0.010, +0.012) |
| interleave:slots-low | one-at-a-time | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.022 (+0.020, +0.024); single +0.020 (+0.019, +0.022); struggling +0.015 (+0.014, +0.016); returning +0.008 (+0.006, +0.009); wanderer +0.016 (+0.015, +0.017); lapsed +0.011 (+0.010, +0.012) |
| interleave:slots-high | one-at-a-time | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.016 (+0.015, +0.017); single +0.011 (+0.010, +0.012); struggling +0.012 (+0.011, +0.014); returning +0.009 (+0.009, +0.010); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.011) |
| interleave:priorRateMult-low | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.019 (+0.018, +0.020); struggling +0.013 (+0.012, +0.014); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.013, +0.015); lapsed +0.010 (+0.009, +0.012) |
| interleave:priorRateMult-high | one-at-a-time | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.017 (+0.015, +0.018); struggling +0.013 (+0.012, +0.014); returning +0.010 (+0.010, +0.011); wanderer +0.014 (+0.013, +0.015); lapsed +0.011 (+0.009, +0.012) |
| interleave:priorRateMult-outer | reported | 6 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.017 (+0.015, +0.018); single +0.015 (+0.014, +0.016); struggling +0.013 (+0.012, +0.014); returning +0.010 (+0.009, +0.011); wanderer +0.014 (+0.013, +0.015); lapsed +0.011 (+0.010, +0.012) |
| interleave:price-corner | reported | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.022 (+0.020, +0.024); single +0.020 (+0.019, +0.021); struggling +0.015 (+0.014, +0.017); returning +0.008 (+0.006, +0.009); wanderer +0.016 (+0.015, +0.018); lapsed +0.011 (+0.010, +0.013) |
| first:base | one-at-a-time | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.023 (+0.020, +0.025); single +0.020 (+0.018, +0.022); struggling +0.016 (+0.014, +0.018); returning +0.009 (+0.008, +0.011); wanderer +0.015 (+0.013, +0.017); lapsed +0.008 (+0.007, +0.010) |
| first:revisitSlotCost-low | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.022 (+0.020, +0.024); single +0.018 (+0.017, +0.020); struggling +0.017 (+0.015, +0.019); returning +0.009 (+0.008, +0.011); wanderer +0.015 (+0.013, +0.017); lapsed +0.009 (+0.007, +0.010) |
| first:revisitSlotCost-high | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.024 (+0.021, +0.026); single +0.019 (+0.017, +0.021); struggling +0.015 (+0.013, +0.017); returning +0.009 (+0.007, +0.010); wanderer +0.015 (+0.013, +0.017); lapsed +0.006 (+0.004, +0.008) |
| first:revisitStopScale-low | reported | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.020 (+0.018, +0.022); single +0.022 (+0.021, +0.024); struggling +0.018 (+0.016, +0.019); returning +0.009 (+0.008, +0.011); wanderer +0.016 (+0.014, +0.017); lapsed +0.012 (+0.010, +0.013) |
| first:revisitStopScale-high | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.024 (+0.022, +0.027); single +0.014 (+0.012, +0.016); struggling +0.010 (+0.008, +0.012); returning +0.008 (+0.007, +0.010); wanderer +0.013 (+0.011, +0.015); lapsed +0.004 (+0.002, +0.005) |
| first:slots-low | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.023 (+0.020, +0.025); single +0.018 (+0.016, +0.020); struggling +0.013 (+0.012, +0.015); returning +0.007 (+0.006, +0.009); wanderer +0.015 (+0.013, +0.017); lapsed +0.008 (+0.007, +0.010) |
| first:slots-high | reported | 5 | – | curious-newcomer:G1, single-subject-crammer:G1, single-subject-crammer:G2, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.020 (+0.018, +0.022); single +0.013 (+0.011, +0.015); struggling +0.019 (+0.017, +0.022); returning +0.011 (+0.010, +0.012); wanderer +0.014 (+0.012, +0.016); lapsed +0.010 (+0.008, +0.012) |
| first:priorRateMult-low | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.023 (+0.020, +0.025); single +0.020 (+0.019, +0.022); struggling +0.016 (+0.014, +0.018); returning +0.009 (+0.008, +0.011); wanderer +0.015 (+0.014, +0.017); lapsed +0.008 (+0.007, +0.010) |
| first:priorRateMult-high | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.022 (+0.020, +0.024); single +0.018 (+0.016, +0.020); struggling +0.016 (+0.014, +0.018); returning +0.009 (+0.008, +0.010); wanderer +0.015 (+0.014, +0.017); lapsed +0.009 (+0.007, +0.010) |
| first:priorRateMult-outer | reported | 4 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.022 (+0.020, +0.024); single +0.017 (+0.015, +0.018); struggling +0.016 (+0.014, +0.018); returning +0.009 (+0.008, +0.010); wanderer +0.015 (+0.014, +0.017); lapsed +0.009 (+0.007, +0.010) |
| first:price-corner | reported | 2 | – | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | **no** | curious +0.018 (+0.015, +0.021); single +0.014 (+0.013, +0.016); struggling +0.007 (+0.005, +0.009); returning +0.008 (+0.007, +0.010); wanderer +0.009 (+0.007, +0.011); lapsed +0.004 (+0.002, +0.005) |

### Every cell, per persona: Δ and G1 to G4 with intervals

#### interleave:forgetScale-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0240 | +0.0220 to +0.0260 | win |  | +0.4176 (+0.4129 to +0.4222) · +0.4222 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.7415 (+2.5189 to +2.9641) · +0.0565 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0293 | +0.0276 to +0.0309 | win |  | +0.2726 (+0.2649 to +0.2803) · +0.2803 | +0.1680 (-0.0714 to +0.4074) · -0.0008 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1610 (+4.8924 to +5.4296) · +0.1070 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0215 | +0.0198 to +0.0232 | win |  | +0.4235 (+0.4191 to +0.4278) · +0.4278 | +1.1610 (+1.0528 to +1.2692) · +0.0166 | -0.5356 (-0.5375 to -0.5336) · -0.5336 | +2.9520 (+2.7431 to +3.1609) · +0.0716 | **fails** | holds | holds | holds |
| returning-expert | +0.0138 | +0.0126 to +0.0151 | win |  | +0.1437 (+0.1386 to +0.1489) · +0.1489 | +2.8240 (+2.7788 to +2.8692) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2580 (+2.0561 to +2.4599) · +0.0629 | **fails** | holds | holds | holds |
| wanderer | +0.0209 | +0.0194 to +0.0224 | win |  | +0.2971 (+0.2905 to +0.3037) · +0.3037 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0365 (+2.8298 to +3.2432) · +0.0712 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0163 | +0.0147 to +0.0180 | win |  | +0.2789 (+0.2717 to +0.2860) · +0.2860 | +0.9560 (+0.8375 to +1.0745) · +0.0139 | -0.5450 (-0.5470 to -0.5430) · -0.5430 | +2.1540 (+1.9496 to +2.3584) · +0.0659 | **fails** | holds | holds | holds |

#### interleave:forgetScale-high (one-at-a-time): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0061 | +0.0052 to +0.0069 |  |  | +0.4156 (+0.4108 to +0.4204) · +0.4204 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6170 (+2.3890 to +2.8450) · +0.0550 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0055 | +0.0049 to +0.0061 |  |  | +0.2725 (+0.2648 to +0.2802) · +0.2802 | +0.2060 (-0.0356 to +0.4476) · -0.0004 | -0.4880 (-0.4894 to -0.4866) · -0.4866 | +5.2080 (+4.9402 to +5.4758) · +0.1102 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0037 | +0.0032 to +0.0042 |  |  | +0.4236 (+0.4192 to +0.4279) · +0.4279 | +1.1785 (+1.0699 to +1.2871) · +0.0168 | -0.5356 (-0.5376 to -0.5336) · -0.5336 | +2.9715 (+2.7615 to +3.1815) · +0.0740 | **fails** | holds | holds | holds |
| returning-expert | +0.0053 | +0.0047 to +0.0059 |  |  | +0.1426 (+0.1374 to +0.1477) · +0.1477 | +2.8220 (+2.7768 to +2.8672) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2050 (+2.0028 to +2.4072) · +0.0625 | **fails** | holds | holds | holds |
| wanderer | +0.0054 | +0.0049 to +0.0060 |  |  | +0.2975 (+0.2909 to +0.3042) · +0.3042 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0335 (+2.8262 to +3.2408) · +0.0730 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0035 | +0.0030 to +0.0040 |  |  | +0.2798 (+0.2727 to +0.2869) · +0.2869 | +0.9375 (+0.8190 to +1.0560) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1725 (+1.9673 to +2.3777) · +0.0682 | **fails** | holds | holds | holds |

#### interleave:forgetShape-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0171 | +0.0156 to +0.0187 | win |  | +0.4181 (+0.4135 to +0.4227) · +0.4227 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6885 (+2.4651 to +2.9119) · +0.0558 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0200 | +0.0188 to +0.0212 | win |  | +0.2727 (+0.2650 to +0.2804) · +0.2804 | +0.1955 (-0.0460 to +0.4370) · -0.0005 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1760 (+4.9073 to +5.4447) · +0.1081 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0140 | +0.0127 to +0.0152 | win |  | +0.4238 (+0.4195 to +0.4282) · +0.4282 | +1.1655 (+1.0571 to +1.2739) · +0.0166 | -0.5356 (-0.5375 to -0.5336) · -0.5336 | +2.9840 (+2.7742 to +3.1938) · +0.0732 | **fails** | holds | holds | holds |
| returning-expert | +0.0109 | +0.0099 to +0.0120 | win |  | +0.1430 (+0.1379 to +0.1482) · +0.1482 | +2.8220 (+2.7769 to +2.8671) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2375 (+2.0362 to +2.4388) · +0.0627 | **fails** | holds | holds | holds |
| wanderer | +0.0149 | +0.0137 to +0.0160 | win |  | +0.2973 (+0.2906 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0300 (+2.8237 to +3.2363) · +0.0717 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0110 | +0.0098 to +0.0122 | win |  | +0.2786 (+0.2715 to +0.2858) · +0.2858 | +0.9365 (+0.8184 to +1.0546) · +0.0136 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +2.1465 (+1.9414 to +2.3516) · +0.0662 | **fails** | holds | holds | holds |

#### interleave:forgetShape-high (one-at-a-time): wins 1 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0112 | +0.0099 to +0.0125 | win |  | +0.4179 (+0.4133 to +0.4225) · +0.4225 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6580 (+2.4323 to +2.8837) · +0.0551 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0093 | +0.0083 to +0.0103 |  |  | +0.2724 (+0.2647 to +0.2802) · +0.2802 | +0.1760 (-0.0649 to +0.4169) · -0.0008 | -0.4880 (-0.4894 to -0.4866) · -0.4866 | +5.1615 (+4.8933 to +5.4297) · +0.1082 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0073 | +0.0064 to +0.0083 |  |  | +0.4235 (+0.4191 to +0.4278) · +0.4278 | +1.1800 (+1.0712 to +1.2888) · +0.0169 | -0.5356 (-0.5376 to -0.5337) · -0.5337 | +2.9580 (+2.7472 to +3.1688) · +0.0728 | **fails** | holds | holds | holds |
| returning-expert | +0.0076 | +0.0067 to +0.0084 |  |  | +0.1429 (+0.1378 to +0.1481) · +0.1481 | +2.8230 (+2.7778 to +2.8682) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2215 (+2.0204 to +2.4226) · +0.0625 | **fails** | holds | holds | holds |
| wanderer | +0.0088 | +0.0079 to +0.0097 |  |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0280 (+2.8215 to +3.2345) · +0.0721 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0063 | +0.0054 to +0.0072 |  |  | +0.2791 (+0.2720 to +0.2863) · +0.2863 | +0.9315 (+0.8127 to +1.0503) · +0.0135 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1475 (+1.9430 to +2.3520) · +0.0666 | **fails** | holds | holds | holds |

#### interleave:kSpread-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0166 | +0.0151 to +0.0181 | win |  | +0.4186 (+0.4141 to +0.4232) · +0.4232 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6815 (+2.4582 to +2.9048) · +0.0556 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0187 | +0.0175 to +0.0199 | win |  | +0.2727 (+0.2650 to +0.2804) · +0.2804 | +0.1900 (-0.0495 to +0.4295) · -0.0006 | -0.4879 (-0.4894 to -0.4865) · -0.4865 | +5.1645 (+4.8964 to +5.4326) · +0.1078 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0120 to +0.0142 | win |  | +0.4236 (+0.4192 to +0.4279) · +0.4279 | +1.1570 (+1.0486 to +1.2654) · +0.0165 | -0.5356 (-0.5376 to -0.5336) · -0.5336 | +2.9645 (+2.7544 to +3.1746) · +0.0727 | **fails** | holds | holds | holds |
| returning-expert | +0.0107 | +0.0097 to +0.0117 | win |  | +0.1428 (+0.1377 to +0.1480) · +0.1480 | +2.8240 (+2.7789 to +2.8691) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2475 (+2.0462 to +2.4488) · +0.0630 | **fails** | holds | holds | holds |
| wanderer | +0.0143 | +0.0132 to +0.0153 | win |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0350 (+2.8284 to +3.2416) · +0.0718 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0103 | +0.0092 to +0.0114 | win |  | +0.2795 (+0.2723 to +0.2866) · +0.2866 | +0.9355 (+0.8180 to +1.0530) · +0.0136 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +2.1325 (+1.9273 to +2.3377) · +0.0658 | **fails** | holds | holds | holds |

#### interleave:kSpread-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0161 | +0.0144 to +0.0177 | win |  | +0.4184 (+0.4138 to +0.4230) · +0.4230 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6710 (+2.4461 to +2.8959) · +0.0554 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0188 | +0.0175 to +0.0201 | win |  | +0.2725 (+0.2648 to +0.2802) · +0.2802 | +0.2070 (-0.0351 to +0.4491) · -0.0004 | -0.4880 (-0.4894 to -0.4866) · -0.4866 | +5.1955 (+4.9280 to +5.4630) · +0.1087 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0118 to +0.0144 | win |  | +0.4239 (+0.4195 to +0.4282) · +0.4282 | +1.1710 (+1.0630 to +1.2790) · +0.0167 | -0.5355 (-0.5375 to -0.5335) · -0.5335 | +2.9670 (+2.7577 to +3.1763) · +0.0728 | **fails** | holds | holds | holds |
| returning-expert | +0.0103 | +0.0093 to +0.0113 | win |  | +0.1434 (+0.1383 to +0.1486) · +0.1486 | +2.8260 (+2.7808 to +2.8712) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2260 (+2.0246 to +2.4274) · +0.0625 | **fails** | holds | holds | holds |
| wanderer | +0.0141 | +0.0129 to +0.0153 | win |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0265 (+2.8207 to +3.2323) · +0.0718 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0091 to +0.0117 | win |  | +0.2784 (+0.2713 to +0.2856) · +0.2856 | +0.9405 (+0.8213 to +1.0597) · +0.0136 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +2.1345 (+1.9297 to +2.3393) · +0.0659 | **fails** | holds | holds | holds |

#### interleave:revisitStrengthen-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0167 | +0.0152 to +0.0183 | win |  | +0.4182 (+0.4136 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6890 (+2.4661 to +2.9119) · +0.0557 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0186 | +0.0174 to +0.0198 | win |  | +0.2727 (+0.2651 to +0.2804) · +0.2804 | +0.1895 (-0.0504 to +0.4294) · -0.0006 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1635 (+4.8960 to +5.4310) · +0.1076 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4236 (+0.4193 to +0.4280) · +0.4280 | +1.1665 (+1.0581 to +1.2749) · +0.0166 | -0.5356 (-0.5375 to -0.5336) · -0.5336 | +2.9720 (+2.7618 to +3.1822) · +0.0726 | **fails** | holds | holds | holds |
| returning-expert | +0.0106 | +0.0096 to +0.0116 | win |  | +0.1433 (+0.1382 to +0.1485) · +0.1485 | +2.8250 (+2.7799 to +2.8701) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2375 (+2.0364 to +2.4386) · +0.0626 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0130 to +0.0153 | win |  | +0.2974 (+0.2908 to +0.3040) · +0.3040 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0400 (+2.8334 to +3.2466) · +0.0718 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0115 | win |  | +0.2784 (+0.2712 to +0.2855) · +0.2855 | +0.9430 (+0.8257 to +1.0603) · +0.0137 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +2.1475 (+1.9425 to +2.3525) · +0.0660 | **fails** | holds | holds | holds |

#### interleave:revisitStrengthen-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0163 | +0.0148 to +0.0178 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6895 (+2.4660 to +2.9130) · +0.0558 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0188 | +0.0176 to +0.0200 | win |  | +0.2728 (+0.2651 to +0.2805) · +0.2805 | +0.1875 (-0.0529 to +0.4279) · -0.0006 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1650 (+4.8969 to +5.4331) · +0.1080 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1690 (+1.0608 to +1.2772) · +0.0167 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9785 (+2.7687 to +3.1883) · +0.0732 | **fails** | holds | holds | holds |
| returning-expert | +0.0106 | +0.0096 to +0.0116 | win |  | +0.1431 (+0.1380 to +0.1483) · +0.1483 | +2.8235 (+2.7784 to +2.8686) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2370 (+2.0359 to +2.4381) · +0.0628 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0131 to +0.0153 | win |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0385 (+2.8320 to +3.2450) · +0.0721 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0115 | win |  | +0.2785 (+0.2714 to +0.2857) · +0.2857 | +0.9430 (+0.8251 to +1.0609) · +0.0137 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1415 (+1.9366 to +2.3464) · +0.0662 | **fails** | holds | holds | holds |

#### interleave:relearn-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0162 | +0.0146 to +0.0177 | win |  | +0.4181 (+0.4134 to +0.4227) · +0.4227 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6395 (+2.4139 to +2.8651) · +0.0551 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0188 | +0.0176 to +0.0200 | win |  | +0.2727 (+0.2650 to +0.2804) · +0.2804 | +0.1995 (-0.0411 to +0.4401) · -0.0005 | -0.4881 (-0.4895 to -0.4866) · -0.4866 | +5.1680 (+4.9005 to +5.4355) · +0.1083 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0129 | +0.0118 to +0.0141 | win |  | +0.4237 (+0.4194 to +0.4280) · +0.4280 | +1.1610 (+1.0528 to +1.2692) · +0.0166 | -0.5356 (-0.5376 to -0.5336) · -0.5336 | +2.9510 (+2.7407 to +3.1613) · +0.0726 | **fails** | holds | holds | holds |
| returning-expert | +0.0105 | +0.0095 to +0.0115 | win |  | +0.1432 (+0.1381 to +0.1484) · +0.1484 | +2.8260 (+2.7808 to +2.8712) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2285 (+2.0274 to +2.4296) · +0.0626 | **fails** | holds | holds | holds |
| wanderer | +0.0140 | +0.0129 to +0.0151 | win |  | +0.2975 (+0.2909 to +0.3041) · +0.3041 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0070 (+2.8004 to +3.2136) · +0.0714 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0116 | win |  | +0.2788 (+0.2717 to +0.2860) · +0.2860 | +0.9395 (+0.8212 to +1.0578) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1450 (+1.9395 to +2.3505) · +0.0664 | **fails** | holds | holds | holds |

#### interleave:relearn-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0171 | +0.0156 to +0.0186 | win |  | +0.4187 (+0.4141 to +0.4233) · +0.4233 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.7765 (+2.5553 to +2.9977) · +0.0572 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0186 | +0.0174 to +0.0198 | win |  | +0.2726 (+0.2649 to +0.2803) · +0.2803 | +0.1635 (-0.0762 to +0.4032) · -0.0009 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1605 (+4.8942 to +5.4268) · +0.1078 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0133 | +0.0121 to +0.0144 | win |  | +0.4237 (+0.4194 to +0.4281) · +0.4281 | +1.1625 (+1.0542 to +1.2708) · +0.0166 | -0.5356 (-0.5376 to -0.5336) · -0.5336 | +2.9915 (+2.7822 to +3.2008) · +0.0732 | **fails** | holds | holds | holds |
| returning-expert | +0.0107 | +0.0097 to +0.0117 | win |  | +0.1431 (+0.1380 to +0.1483) · +0.1483 | +2.8215 (+2.7763 to +2.8667) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2620 (+2.0611 to +2.4629) · +0.0638 | **fails** | holds | holds | holds |
| wanderer | +0.0143 | +0.0132 to +0.0154 | win |  | +0.2979 (+0.2913 to +0.3045) · +0.3045 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0605 (+2.8540 to +3.2670) · +0.0725 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0106 | +0.0094 to +0.0117 | win |  | +0.2786 (+0.2714 to +0.2857) · +0.2857 | +0.9385 (+0.8196 to +1.0574) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1770 (+1.9723 to +2.3817) · +0.0671 | **fails** | holds | holds | holds |

#### interleave:priorKnowledgeMean-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0196 | +0.0181 to +0.0211 | win |  | +0.4365 (+0.4327 to +0.4403) · +0.4403 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +3.1795 (+2.9618 to +3.3972) · +0.0616 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0152 | +0.0140 to +0.0164 | win |  | +0.1904 (+0.1821 to +0.1987) · +0.1987 | +1.5620 (+1.3034 to +1.8206) · +0.0154 | -0.4879 (-0.4894 to -0.4865) · -0.4865 | +4.1865 (+3.9296 to +4.4434) · +0.0789 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0138 | +0.0126 to +0.0150 | win |  | +0.4309 (+0.4270 to +0.4348) · +0.4348 | +1.1985 (+1.0896 to +1.3074) · +0.0171 | -0.5356 (-0.5375 to -0.5336) · -0.5336 | +3.0880 (+2.8790 to +3.2970) · +0.0735 | **fails** | holds | holds | holds |
| returning-expert | +0.0153 | +0.0142 to +0.0164 | win |  | +0.1663 (+0.1605 to +0.1721) · +0.1721 | +2.9545 (+2.9112 to +2.9978) · +0.0319 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +3.3025 (+3.0846 to +3.5204) · +0.0753 | **fails** | holds | holds | holds |
| wanderer | +0.0168 | +0.0157 to +0.0180 | win |  | +0.3505 (+0.3443 to +0.3568) · +0.3568 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.6190 (+3.4118 to +3.8262) · +0.0741 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0141 | +0.0129 to +0.0153 | win |  | +0.3413 (+0.3344 to +0.3482) · +0.3482 | +0.9625 (+0.8465 to +1.0785) · +0.0140 | -0.5447 (-0.5467 to -0.5427) · -0.5427 | +2.8355 (+2.6250 to +3.0460) · +0.0759 | **fails** | holds | holds | holds |

#### interleave:priorKnowledgeMean-high (one-at-a-time): wins 1 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0099 | +0.0085 to +0.0113 |  |  | +0.2837 (+0.2772 to +0.2901) · +0.2901 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +1.6200 (+1.4079 to +1.8321) · +0.0432 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0168 | +0.0158 to +0.0179 | win |  | +0.2793 (+0.2723 to +0.2862) · +0.2862 | -0.2160 (-0.4515 to +0.0195) · -0.0054 | -0.4881 (-0.4895 to -0.4866) · -0.4866 | +4.6190 (+4.3719 to +4.8661) · +0.1345 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0080 | +0.0070 to +0.0091 |  |  | +0.3382 (+0.3313 to +0.3450) · +0.3450 | +0.9795 (+0.8702 to +1.0888) · +0.0137 | -0.5355 (-0.5374 to -0.5335) · -0.5335 | +1.8790 (+1.6787 to +2.0793) · +0.0588 | **fails** | holds | holds | holds |
| returning-expert | +0.0046 | +0.0037 to +0.0054 |  |  | +0.1063 (+0.1022 to +0.1104) · +0.1104 | +2.5480 (+2.5009 to +2.5951) · +0.0274 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +0.9600 (+0.7923 to +1.1277) · +0.0447 | **fails** | holds | holds | holds |
| wanderer | +0.0088 | +0.0078 to +0.0099 |  |  | +0.2050 (+0.1990 to +0.2109) · +0.2109 | +1.4705 (+1.4335 to +1.5075) · +0.0188 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +1.8850 (+1.6877 to +2.0823) · +0.0607 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0062 | +0.0052 to +0.0072 |  |  | +0.2014 (+0.1952 to +0.2076) · +0.2076 | +0.9435 (+0.8292 to +1.0578) · +0.0137 | -0.5447 (-0.5467 to -0.5427) · -0.5427 | +1.2905 (+1.1070 to +1.4740) · +0.0549 | **fails** | holds | holds | holds |

#### interleave:learnRate-low (one-at-a-time): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0080 | +0.0066 to +0.0095 |  |  | +0.4163 (+0.4115 to +0.4210) · +0.4210 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +1.3365 (+1.1241 to +1.5489) · +0.0387 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0070 | +0.0060 to +0.0080 |  |  | +0.2728 (+0.2651 to +0.2805) · +0.2805 | +0.1775 (-0.0655 to +0.4205) · -0.0008 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +2.2040 (+1.9831 to +2.4249) · +0.0702 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0048 | +0.0037 to +0.0058 |  |  | +0.4242 (+0.4199 to +0.4285) · +0.4285 | +1.1575 (+1.0492 to +1.2658) · +0.0165 | -0.5356 (-0.5375 to -0.5336) · -0.5336 | +1.1895 (+1.0011 to +1.3779) · +0.0423 | **fails** | holds | holds | holds |
| returning-expert | +0.0061 | +0.0052 to +0.0069 |  |  | +0.1439 (+0.1388 to +0.1491) · +0.1491 | +2.8315 (+2.7865 to +2.8765) · +0.0305 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +1.2965 (+1.1283 to +1.4647) · +0.0547 | **fails** | holds | holds | holds |
| wanderer | +0.0062 | +0.0052 to +0.0072 |  |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +1.3390 (+1.1554 to +1.5226) · +0.0467 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0046 | +0.0037 to +0.0056 |  |  | +0.2777 (+0.2705 to +0.2849) · +0.2849 | +0.9370 (+0.8199 to +1.0541) · +0.0136 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +0.9695 (+0.7908 to +1.1482) · +0.0428 | **fails** | holds | holds | holds |

#### interleave:learnRate-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0267 | +0.0253 to +0.0282 | win |  | +0.4184 (+0.4137 to +0.4230) · +0.4230 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +4.2920 (+4.0930 to +4.4910) · +0.0729 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0318 | +0.0306 to +0.0331 | win |  | +0.2724 (+0.2646 to +0.2801) · +0.2801 | +0.1565 (-0.0861 to +0.3991) · -0.0010 | -0.4880 (-0.4894 to -0.4866) · -0.4866 | +8.3685 (+8.0886 to +8.6484) · +0.1371 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0221 | +0.0210 to +0.0232 | win |  | +0.4235 (+0.4191 to +0.4278) · +0.4278 | +1.1550 (+1.0474 to +1.2626) · +0.0165 | -0.5354 (-0.5374 to -0.5335) · -0.5335 | +4.8960 (+4.7091 to +5.0829) · +0.0957 | **fails** | holds | holds | holds |
| returning-expert | +0.0166 | +0.0155 to +0.0177 | win |  | +0.1426 (+0.1374 to +0.1478) · +0.1478 | +2.8235 (+2.7783 to +2.8687) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +3.5160 (+3.2978 to +3.7342) · +0.0792 | **fails** | holds | holds | holds |
| wanderer | +0.0212 | +0.0201 to +0.0224 | win |  | +0.2981 (+0.2914 to +0.3047) · +0.3047 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +4.5325 (+4.3325 to +4.7325) · +0.0848 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0158 | +0.0146 to +0.0170 | win |  | +0.2788 (+0.2716 to +0.2859) · +0.2859 | +0.9345 (+0.8166 to +1.0524) · +0.0135 | -0.5447 (-0.5467 to -0.5427) · -0.5427 | +3.2250 (+3.0233 to +3.4267) · +0.0796 | **fails** | holds | holds | holds |

#### interleave:prereqPenalty-low (one-at-a-time): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0025 | +0.0010 to +0.0040 |  |  | +0.4181 (+0.4135 to +0.4227) · +0.4227 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +0.4650 (+0.2498 to +0.6802) · +0.0053 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0097 | +0.0085 to +0.0109 |  |  | +0.2727 (+0.2650 to +0.2804) · +0.2804 | +0.1830 (-0.0573 to +0.4233) · -0.0007 | -0.4880 (-0.4894 to -0.4865) · -0.4865 | +2.8470 (+2.5815 to +3.1125) · +0.0527 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0029 | +0.0017 to +0.0040 |  |  | +0.4235 (+0.4192 to +0.4279) · +0.4279 | +1.1670 (+1.0588 to +1.2752) · +0.0167 | -0.5355 (-0.5375 to -0.5335) · -0.5335 | +0.7235 (+0.5285 to +0.9185) · +0.0129 | **fails** | holds | holds | holds |
| returning-expert | +0.0055 | +0.0045 to +0.0065 |  |  | +0.1427 (+0.1375 to +0.1479) · +0.1479 | +2.8240 (+2.7789 to +2.8691) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +1.1570 (+0.9576 to +1.3564) · +0.0284 | **fails** | holds | holds | holds |
| wanderer | +0.0035 | +0.0024 to +0.0046 |  |  | +0.2971 (+0.2905 to +0.3037) · +0.3037 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +0.8390 (+0.6381 to +1.0399) · +0.0151 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0020 | +0.0008 to +0.0031 |  |  | +0.2779 (+0.2708 to +0.2851) · +0.2851 | +0.9375 (+0.8201 to +1.0549) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +0.4510 (+0.2458 to +0.6562) · +0.0079 | **fails** | holds | holds | holds |

#### interleave:prereqPenalty-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0405 | +0.0389 to +0.0422 | win |  | +0.4182 (+0.4136 to +0.4228) · +0.4228 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +6.5275 (+6.2849 to +6.7701) · +0.1628 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0337 | +0.0325 to +0.0350 | win |  | +0.2724 (+0.2647 to +0.2801) · +0.2801 | +0.1800 (-0.0610 to +0.4210) · -0.0007 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +9.0350 (+8.7548 to +9.3152) · +0.2236 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0298 | +0.0286 to +0.0310 | win |  | +0.4240 (+0.4197 to +0.4283) · +0.4283 | +1.1535 (+1.0449 to +1.2621) · +0.0164 | -0.5355 (-0.5374 to -0.5335) · -0.5335 | +6.6875 (+6.4641 to +6.9109) · +0.1999 | **fails** | holds | holds | holds |
| returning-expert | +0.0198 | +0.0188 to +0.0208 | win |  | +0.1433 (+0.1381 to +0.1484) · +0.1484 | +2.8265 (+2.7814 to +2.8716) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +4.1845 (+3.9821 to +4.3869) · +0.1325 | **fails** | holds | holds | holds |
| wanderer | +0.0314 | +0.0302 to +0.0326 | win |  | +0.2971 (+0.2905 to +0.3038) · +0.3038 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +6.5960 (+6.3769 to +6.8151) · +0.1845 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0246 | +0.0234 to +0.0257 | win |  | +0.2780 (+0.2709 to +0.2852) · +0.2852 | +0.9440 (+0.8261 to +1.0619) · +0.0137 | -0.5449 (-0.5469 to -0.5429) · -0.5429 | +4.9845 (+4.7767 to +5.1923) · +0.1842 | **fails** | holds | holds | holds |

#### interleave:pullScale-low (one-at-a-time): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0197 | +0.0182 to +0.0212 | win |  | +0.1689 (+0.1640 to +0.1737) · +0.1737 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +3.1830 (+2.9652 to +3.4008) · +0.0671 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0170 | +0.0159 to +0.0181 | win |  | +0.1482 (+0.1418 to +0.1545) · +0.1545 | +0.8815 (+0.6377 to +1.1253) · +0.0076 | -0.4880 (-0.4894 to -0.4865) · -0.4865 | +4.5075 (+4.2554 to +4.7596) · +0.0938 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0141 | +0.0129 to +0.0153 | win |  | +0.2224 (+0.2157 to +0.2290) · +0.2290 | +0.9485 (+0.8466 to +1.0504) · +0.0133 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +3.1860 (+2.9762 to +3.3958) · +0.0786 | **fails** | holds | holds | holds |
| returning-expert | +0.0085 | +0.0076 to +0.0095 |  |  | +0.0694 (+0.0665 to +0.0724) · +0.0724 | +2.6445 (+2.5979 to +2.6911) · +0.0284 | -0.4457 (-0.4474 to -0.4441) · -0.4441 | +1.8445 (+1.6528 to +2.0362) · +0.0509 | **fails** | holds | holds | holds |
| wanderer | +0.0155 | +0.0144 to +0.0166 | win |  | +0.1353 (+0.1309 to +0.1396) · +0.1396 | +1.3775 (+1.3390 to +1.4160) · +0.0176 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.2185 (+3.0163 to +3.4207) · +0.0767 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0117 | +0.0105 to +0.0128 | win |  | +0.1236 (+0.1192 to +0.1280) · +0.1280 | +0.9460 (+0.8317 to +1.0603) · +0.0138 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.3625 (+2.1654 to +2.5596) · +0.0739 | **fails** | holds | holds | holds |

#### interleave:pullScale-high (one-at-a-time): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0169 | +0.0154 to +0.0184 | win |  | +0.4569 (+0.4541 to +0.4596) · +0.4596 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.7150 (+2.4924 to +2.9376) · +0.0564 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0142 | +0.0131 to +0.0154 | win |  | +0.0967 (+0.0896 to +0.1038) · +0.1038 | +3.8220 (+3.5727 to +4.0713) · +0.0424 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +3.5955 (+3.3427 to +3.8483) · +0.0737 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0153 | +0.0142 to +0.0165 | win |  | +0.4423 (+0.4395 to +0.4452) · +0.4452 | +1.6220 (+1.5128 to +1.7312) · +0.0238 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +3.3245 (+3.1175 to +3.5315) · +0.0823 | **fails** | holds | holds | holds |
| returning-expert | +0.0125 | +0.0114 to +0.0135 | win |  | +0.2485 (+0.2411 to +0.2559) · +0.2559 | +2.9955 (+2.9529 to +3.0381) · +0.0323 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.6640 (+2.4439 to +2.8841) · +0.0753 | **fails** | holds | holds | holds |
| wanderer | +0.0134 | +0.0123 to +0.0146 | win |  | +0.4017 (+0.3970 to +0.4065) · +0.4065 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +2.8810 (+2.6695 to +3.0925) · +0.0679 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0098 | +0.0087 to +0.0110 |  |  | +0.4240 (+0.4191 to +0.4288) · +0.4288 | +0.9910 (+0.8736 to +1.1084) · +0.0145 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.0560 (+1.8514 to +2.2606) · +0.0631 | **fails** | holds | holds | holds |

#### interleave:revisitSlotCost-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0165 | +0.0150 to +0.0181 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6980 (+2.4747 to +2.9213) · +0.0560 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0187 | +0.0175 to +0.0199 | win |  | +0.2728 (+0.2651 to +0.2805) · +0.2805 | +0.1845 (-0.0560 to +0.4250) · -0.0007 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1655 (+4.8975 to +5.4335) · +0.1079 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1655 (+1.0570 to +1.2740) · +0.0166 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9795 (+2.7698 to +3.1892) · +0.0731 | **fails** | holds | holds | holds |
| returning-expert | +0.0106 | +0.0096 to +0.0116 | win |  | +0.1430 (+0.1379 to +0.1482) · +0.1482 | +2.8235 (+2.7784 to +2.8686) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2390 (+2.0380 to +2.4400) · +0.0628 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0131 to +0.0153 | win |  | +0.2973 (+0.2906 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0355 (+2.8291 to +3.2419) · +0.0719 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0115 | win |  | +0.2785 (+0.2714 to +0.2856) · +0.2856 | +0.9410 (+0.8232 to +1.0588) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1445 (+1.9396 to +2.3494) · +0.0662 | **fails** | holds | holds | holds |

#### interleave:revisitSlotCost-high (one-at-a-time): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0169 | +0.0153 to +0.0185 | win |  | +0.4303 (+0.4256 to +0.4349) · +0.4349 | +0.9510 (+0.9378 to +0.9642) · +0.0137 | -0.5633 (-0.5649 to -0.5618) · -0.5618 | +2.5440 (+2.3235 to +2.7645) · +0.0583 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0185 | +0.0173 to +0.0198 | win |  | +0.2765 (+0.2691 to +0.2839) · +0.2839 | -0.2795 (-0.4902 to -0.0688) · -0.0064 | -0.5037 (-0.5050 to -0.5024) · -0.5024 | +4.5945 (+4.3391 to +4.8499) · +0.1060 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0127 | +0.0116 to +0.0139 | win |  | +0.4366 (+0.4324 to +0.4408) · +0.4408 | +0.9920 (+0.9021 to +1.0819) · +0.0152 | -0.5467 (-0.5486 to -0.5448) · -0.5448 | +2.7480 (+2.5472 to +2.9488) · +0.0724 | **fails** | holds | holds | holds |
| returning-expert | +0.0099 | +0.0088 to +0.0110 |  |  | +0.1554 (+0.1502 to +0.1605) · +0.1605 | +2.2095 (+2.1621 to +2.2569) · +0.0264 | -0.4670 (-0.4686 to -0.4654) · -0.4654 | +1.9225 (+1.7214 to +2.1236) · +0.0599 | **fails** | holds | holds | holds |
| wanderer | +0.0144 | +0.0132 to +0.0156 | win |  | +0.3082 (+0.3014 to +0.3151) · +0.3151 | +1.1115 (+1.0905 to +1.1325) · +0.0156 | -0.5250 (-0.5268 to -0.5233) · -0.5233 | +2.8150 (+2.6126 to +3.0174) · +0.0730 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0106 | +0.0094 to +0.0117 | win |  | +0.2828 (+0.2755 to +0.2902) · +0.2902 | +0.8820 (+0.7794 to +0.9846) · +0.0138 | -0.5553 (-0.5573 to -0.5534) · -0.5534 | +2.0775 (+1.8792 to +2.2758) · +0.0688 | **fails** | holds | holds | holds |

#### interleave:revisitStopScale-low (one-at-a-time): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0163 | +0.0149 to +0.0178 | win |  | +0.4087 (+0.4041 to +0.4134) · +0.4134 | +1.2525 (+1.2231 to +1.2819) · +0.0156 | -0.5380 (-0.5394 to -0.5366) · -0.5366 | +2.7700 (+2.5435 to +2.9965) · +0.0548 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0186 | +0.0174 to +0.0197 | win |  | +0.2725 (+0.2648 to +0.2803) · +0.2803 | +0.1985 (-0.0437 to +0.4407) · -0.0005 | -0.4838 (-0.4852 to -0.4823) · -0.4823 | +5.2510 (+4.9806 to +5.5214) · +0.1073 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0128 | +0.0116 to +0.0139 | win |  | +0.4090 (+0.4045 to +0.4135) · +0.4135 | +1.1945 (+1.0820 to +1.3070) · +0.0159 | -0.5241 (-0.5260 to -0.5222) · -0.5222 | +3.0635 (+2.8500 to +3.2770) · +0.0702 | **fails** | holds | holds | holds |
| returning-expert | +0.0105 | +0.0095 to +0.0115 | win |  | +0.1398 (+0.1346 to +0.1450) · +0.1450 | +2.9340 (+2.8916 to +2.9764) · +0.0309 | -0.4411 (-0.4428 to -0.4395) · -0.4395 | +2.2770 (+2.0752 to +2.4788) · +0.0625 | **fails** | holds | holds | holds |
| wanderer | +0.0143 | +0.0132 to +0.0154 | win |  | +0.2868 (+0.2803 to +0.2933) · +0.2933 | +1.7430 (+1.7000 to +1.7860) · +0.0213 | -0.5055 (-0.5071 to -0.5040) · -0.5040 | +3.2025 (+2.9930 to +3.4120) · +0.0725 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0098 | +0.0087 to +0.0109 |  |  | +0.2754 (+0.2683 to +0.2824) · +0.2824 | +0.9845 (+0.8586 to +1.1104) · +0.0132 | -0.5333 (-0.5352 to -0.5313) · -0.5313 | +2.1885 (+1.9780 to +2.3990) · +0.0627 | **fails** | holds | holds | holds |

#### interleave:revisitStopScale-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0179 | +0.0163 to +0.0196 | win |  | +0.4314 (+0.4269 to +0.4360) · +0.4360 | +0.9865 (+0.9710 to +1.0020) · +0.0143 | -0.5653 (-0.5669 to -0.5637) · -0.5637 | +2.6095 (+2.3925 to +2.8265) · +0.0599 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0184 | +0.0171 to +0.0196 | win |  | +0.2741 (+0.2666 to +0.2817) · +0.2817 | +0.0235 (-0.2127 to +0.2597) · -0.0026 | -0.4960 (-0.4975 to -0.4946) · -0.4946 | +4.9140 (+4.6510 to +5.1770) · +0.1070 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0141 | +0.0129 to +0.0153 | win |  | +0.4378 (+0.4335 to +0.4422) · +0.4422 | +1.0655 (+0.9712 to +1.1598) · +0.0177 | -0.5549 (-0.5569 to -0.5530) · -0.5530 | +2.8260 (+2.6303 to +3.0217) · +0.0804 | **fails** | holds | holds | holds |
| returning-expert | +0.0104 | +0.0093 to +0.0114 | win |  | +0.1487 (+0.1435 to +0.1539) · +0.1539 | +2.5945 (+2.5464 to +2.6426) · +0.0292 | -0.4545 (-0.4562 to -0.4528) · -0.4528 | +2.1085 (+1.9079 to +2.3091) · +0.0616 | **fails** | holds | holds | holds |
| wanderer | +0.0146 | +0.0134 to +0.0158 | win |  | +0.3146 (+0.3078 to +0.3214) · +0.3214 | +1.1675 (+1.1417 to +1.1933) · +0.0165 | -0.5282 (-0.5300 to -0.5263) · -0.5263 | +2.8220 (+2.6205 to +3.0235) · +0.0735 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0108 | +0.0096 to +0.0120 | win |  | +0.2923 (+0.2850 to +0.2995) · +0.2995 | +0.8250 (+0.7174 to +0.9326) · +0.0139 | -0.5633 (-0.5652 to -0.5614) · -0.5614 | +1.9750 (+1.7824 to +2.1676) · +0.0710 | **fails** | holds | holds | holds |

#### interleave:slots-low (one-at-a-time): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0216 | +0.0197 to +0.0236 | win |  | +0.4231 (+0.4177 to +0.4284) · +0.4284 | +0.9280 (+0.9167 to +0.9393) · +0.0204 | -0.6068 (-0.6079 to -0.6057) · -0.6057 | +2.2785 (+2.0931 to +2.4639) · +0.0823 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0203 | +0.0189 to +0.0216 | win |  | +0.2897 (+0.2826 to +0.2968) · +0.2968 | +0.3835 (+0.2815 to +0.4855) · +0.0058 | -0.5765 (-0.5780 to -0.5750) · -0.5750 | +3.4065 (+3.2022 to +3.6108) · +0.1262 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0149 | +0.0136 to +0.0163 | win |  | +0.4415 (+0.4370 to +0.4459) · +0.4459 | +0.9625 (+0.9120 to +1.0130) · +0.0222 | -0.5749 (-0.5767 to -0.5731) · -0.5731 | +2.4680 (+2.2978 to +2.6382) · +0.0952 | **fails** | holds | holds | holds |
| returning-expert | +0.0076 | +0.0063 to +0.0089 |  |  | +0.1862 (+0.1799 to +0.1925) · +0.1925 | +0.8230 (+0.8060 to +0.8400) · +0.0160 | -0.5380 (-0.5399 to -0.5361) · -0.5361 | +1.0265 (+0.8509 to +1.2021) · +0.0485 | **fails** | holds | holds | holds |
| wanderer | +0.0161 | +0.0146 to +0.0175 | win |  | +0.3378 (+0.3304 to +0.3451) · +0.3451 | +0.9505 (+0.9410 to +0.9600) · +0.0207 | -0.5823 (-0.5839 to -0.5807) · -0.5807 | +2.2725 (+2.0965 to +2.4485) · +0.0914 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0112 | +0.0099 to +0.0124 | win |  | +0.3004 (+0.2930 to +0.3077) · +0.3077 | +0.9335 (+0.8800 to +0.9870) · +0.0221 | -0.5754 (-0.5773 to -0.5735) · -0.5735 | +1.7645 (+1.5980 to +1.9310) · +0.0836 | **fails** | holds | holds | holds |

#### interleave:slots-high (one-at-a-time): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0162 | +0.0150 to +0.0175 | win |  | +0.3247 (+0.3176 to +0.3318) · +0.3318 | +2.9465 (+2.8915 to +3.0015) · +0.0285 | -0.4978 (-0.4995 to -0.4962) · -0.4962 | +3.6550 (+3.4078 to +3.9022) · +0.0567 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0111 | +0.0099 to +0.0123 | win |  | +0.2668 (+0.2599 to +0.2738) · +0.2738 | -3.1580 (-3.6115 to -2.7045) · -0.0290 | -0.4061 (-0.4078 to -0.4045) · -0.4045 | +4.7175 (+4.3692 to +5.0658) · +0.0641 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0124 | +0.0113 to +0.0136 | win |  | +0.3542 (+0.3480 to +0.3604) · +0.3604 | +1.7725 (+1.5826 to +1.9624) · +0.0199 | -0.5022 (-0.5042 to -0.5002) · -0.5002 | +3.4870 (+3.2384 to +3.7356) · +0.0678 | **fails** | holds | holds | holds |
| returning-expert | +0.0093 | +0.0086 to +0.0099 |  |  | +0.0830 (+0.0785 to +0.0875) · +0.0875 | +3.3585 (+3.3123 to +3.4047) · +0.0232 | -0.3600 (-0.3616 to -0.3584) · -0.3584 | +2.7880 (+2.6087 to +2.9673) · +0.0511 | **fails** | holds | holds | holds |
| wanderer | +0.0138 | +0.0129 to +0.0148 | win |  | +0.2230 (+0.2156 to +0.2305) · +0.2305 | +3.1270 (+3.0805 to +3.1735) · +0.0297 | -0.4596 (-0.4615 to -0.4576) · -0.4576 | +3.8755 (+3.6553 to +4.0957) · +0.0672 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0099 | +0.0088 to +0.0111 |  |  | +0.2572 (+0.2502 to +0.2642) · +0.2642 | +1.3030 (+1.1073 to +1.4987) · +0.0150 | -0.5146 (-0.5168 to -0.5124) · -0.5124 | +2.5360 (+2.3065 to +2.7655) · +0.0639 | **fails** | holds | holds | holds |

#### interleave:priorRateMult-low (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0165 | +0.0150 to +0.0181 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6965 (+2.4731 to +2.9199) · +0.0560 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0191 | +0.0179 to +0.0203 | win |  | +0.2727 (+0.2651 to +0.2804) · +0.2804 | +0.1870 (-0.0535 to +0.4275) · -0.0006 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1680 (+4.8998 to +5.4362) · +0.1079 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1655 (+1.0570 to +1.2740) · +0.0166 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9790 (+2.7692 to +3.1888) · +0.0731 | **fails** | holds | holds | holds |
| returning-expert | +0.0106 | +0.0096 to +0.0116 | win |  | +0.1429 (+0.1378 to +0.1481) · +0.1481 | +2.8240 (+2.7789 to +2.8691) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2425 (+2.0415 to +2.4435) · +0.0629 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0130 to +0.0153 | win |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0365 (+2.8300 to +3.2430) · +0.0719 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0104 | +0.0092 to +0.0115 | win |  | +0.2785 (+0.2714 to +0.2856) · +0.2856 | +0.9410 (+0.8232 to +1.0588) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1450 (+1.9401 to +2.3499) · +0.0661 | **fails** | holds | holds | holds |

#### interleave:priorRateMult-high (one-at-a-time): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0165 | +0.0150 to +0.0180 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.7015 (+2.4774 to +2.9256) · +0.0561 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0167 | +0.0155 to +0.0179 | win |  | +0.2728 (+0.2651 to +0.2805) · +0.2805 | +0.1775 (-0.0630 to +0.4180) · -0.0007 | -0.4880 (-0.4894 to -0.4865) · -0.4865 | +5.1700 (+4.9019 to +5.4381) · +0.1083 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1655 (+1.0570 to +1.2740) · +0.0166 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9780 (+2.7682 to +3.1878) · +0.0731 | **fails** | holds | holds | holds |
| returning-expert | +0.0105 | +0.0095 to +0.0115 | win |  | +0.1432 (+0.1380 to +0.1483) · +0.1483 | +2.8235 (+2.7784 to +2.8686) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2330 (+2.0318 to +2.4342) · +0.0628 | **fails** | holds | holds | holds |
| wanderer | +0.0142 | +0.0131 to +0.0153 | win |  | +0.2973 (+0.2907 to +0.3039) · +0.3039 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0370 (+2.8306 to +3.2434) · +0.0721 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0106 | +0.0095 to +0.0117 | win |  | +0.2787 (+0.2716 to +0.2859) · +0.2859 | +0.9395 (+0.8215 to +1.0575) · +0.0136 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1580 (+1.9533 to +2.3627) · +0.0668 | **fails** | holds | holds | holds |

#### interleave:priorRateMult-outer (reported): wins 6 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0165 | +0.0150 to +0.0180 | win |  | +0.4183 (+0.4137 to +0.4229) · +0.4229 | +1.1135 (+1.0907 to +1.1363) · +0.0146 | -0.5463 (-0.5478 to -0.5448) · -0.5448 | +2.6850 (+2.4602 to +2.9098) · +0.0558 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0152 | +0.0140 to +0.0164 | win |  | +0.2727 (+0.2651 to +0.2804) · +0.2804 | +0.1860 (-0.0546 to +0.4266) · -0.0006 | -0.4880 (-0.4895 to -0.4866) · -0.4866 | +5.1750 (+4.9071 to +5.4429) · +0.1088 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0131 | +0.0119 to +0.0143 | win |  | +0.4238 (+0.4195 to +0.4281) · +0.4281 | +1.1635 (+1.0552 to +1.2718) · +0.0166 | -0.5355 (-0.5375 to -0.5336) · -0.5336 | +2.9780 (+2.7686 to +3.1874) · +0.0732 | **fails** | holds | holds | holds |
| returning-expert | +0.0104 | +0.0095 to +0.0114 | win |  | +0.1433 (+0.1381 to +0.1484) · +0.1484 | +2.8260 (+2.7810 to +2.8710) · +0.0304 | -0.4458 (-0.4475 to -0.4441) · -0.4441 | +2.2315 (+2.0299 to +2.4331) · +0.0632 | **fails** | holds | holds | holds |
| wanderer | +0.0143 | +0.0132 to +0.0153 | win |  | +0.2971 (+0.2905 to +0.3037) · +0.3037 | +1.4725 (+1.4355 to +1.5095) · +0.0189 | -0.5123 (-0.5140 to -0.5106) · -0.5106 | +3.0350 (+2.8289 to +3.2411) · +0.0722 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0107 | +0.0096 to +0.0118 | win |  | +0.2788 (+0.2717 to +0.2860) · +0.2860 | +0.9440 (+0.8272 to +1.0608) · +0.0137 | -0.5448 (-0.5468 to -0.5428) · -0.5428 | +2.1670 (+1.9624 to +2.3716) · +0.0674 | **fails** | holds | holds | holds |

#### interleave:price-corner (reported): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0217 | +0.0197 to +0.0237 | win |  | +0.4207 (+0.4153 to +0.4260) · +0.4260 | +0.9280 (+0.9167 to +0.9393) · +0.0216 | -0.6027 (-0.6039 to -0.6015) · -0.6015 | +2.1645 (+1.9838 to +2.3452) · +0.0821 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0200 | +0.0187 to +0.0214 | win |  | +0.2917 (+0.2845 to +0.2988) · +0.2988 | +0.3960 (+0.2968 to +0.4952) · +0.0063 | -0.5779 (-0.5794 to -0.5764) · -0.5764 | +3.3205 (+3.1188 to +3.5222) · +0.1258 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0152 | +0.0138 to +0.0166 | win |  | +0.4428 (+0.4385 to +0.4471) · +0.4471 | +0.9455 (+0.9011 to +0.9899) · +0.0239 | -0.5683 (-0.5702 to -0.5664) · -0.5664 | +2.3635 (+2.1981 to +2.5289) · +0.0987 | **fails** | holds | holds | holds |
| returning-expert | +0.0075 | +0.0062 to +0.0089 |  |  | +0.1885 (+0.1822 to +0.1948) · +0.1948 | +0.8260 (+0.8091 to +0.8429) · +0.0164 | -0.5399 (-0.5418 to -0.5380) · -0.5380 | +0.9940 (+0.8192 to +1.1688) · +0.0478 | **fails** | holds | holds | holds |
| wanderer | +0.0164 | +0.0149 to +0.0178 | win |  | +0.3398 (+0.3325 to +0.3471) · +0.3471 | +0.9505 (+0.9410 to +0.9600) · +0.0219 | -0.5823 (-0.5839 to -0.5806) · -0.5806 | +2.2155 (+2.0443 to +2.3867) · +0.0942 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0112 | +0.0100 to +0.0125 | win |  | +0.3089 (+0.3016 to +0.3162) · +0.3162 | +0.9400 (+0.8906 to +0.9894) · +0.0246 | -0.5692 (-0.5712 to -0.5672) · -0.5672 | +1.6820 (+1.5198 to +1.8442) · +0.0870 | **fails** | holds | holds | holds |

#### first:revisitSlotCost-low (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0219 | +0.0197 to +0.0241 | win |  | +0.4412 (+0.4368 to +0.4456) · +0.4456 | +0.9760 (+0.9338 to +1.0182) · +0.0195 | -0.5968 (-0.5981 to -0.5956) · -0.5956 | +1.8790 (+1.7046 to +2.0534) · +0.0489 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0184 | +0.0167 to +0.0201 | win |  | +0.3000 (+0.2933 to +0.3068) · +0.3068 | -1.2020 (-1.5229 to -0.8811) · -0.0260 | -0.5456 (-0.5475 to -0.5438) · -0.5438 | +2.8645 (+2.6063 to +3.1227) · +0.0690 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0172 | +0.0153 to +0.0191 | win |  | +0.4528 (+0.4493 to +0.4563) · +0.4563 | +1.0850 (+0.9708 to +1.1992) · +0.0318 | -0.5567 (-0.5590 to -0.5544) · -0.5544 | +1.7305 (+1.5726 to +1.8884) · +0.0656 | **fails** | holds | holds | holds |
| returning-expert | +0.0092 | +0.0078 to +0.0107 |  |  | +0.1853 (+0.1794 to +0.1913) · +0.1913 | +1.1665 (+1.1347 to +1.1983) · +0.0170 | -0.4929 (-0.4949 to -0.4909) · -0.4909 | +1.4340 (+1.2268 to +1.6412) · +0.0440 | **fails** | holds | holds | holds |
| wanderer | +0.0149 | +0.0131 to +0.0166 | win |  | +0.3726 (+0.3661 to +0.3790) · +0.3790 | +0.9560 (+0.9348 to +0.9772) · +0.0213 | -0.5714 (-0.5732 to -0.5696) · -0.5696 | +1.6960 (+1.5192 to +1.8728) · +0.0528 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0085 | +0.0069 to +0.0102 |  |  | +0.3544 (+0.3477 to +0.3611) · +0.3611 | +0.7350 (+0.6363 to +0.8337) · +0.0251 | -0.5664 (-0.5693 to -0.5636) · -0.5636 | +0.8810 (+0.7350 to +1.0270) · +0.0441 | **fails** | holds | holds | holds |

#### first:revisitSlotCost-high (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0237 | +0.0213 to +0.0261 | win |  | +0.4343 (+0.4297 to +0.4389) · +0.4389 | +1.0125 (+0.9548 to +1.0702) · +0.0260 | -0.5886 (-0.5901 to -0.5872) · -0.5872 | +1.6135 (+1.4657 to +1.7613) · +0.0517 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0188 | +0.0170 to +0.0207 | win |  | +0.3306 (+0.3244 to +0.3369) · +0.3369 | +0.0695 (-0.1076 to +0.2466) · -0.0030 | -0.5740 (-0.5758 to -0.5723) · -0.5723 | +2.1770 (+1.9868 to +2.3672) · +0.0772 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0150 | +0.0131 to +0.0169 | win |  | +0.4483 (+0.4446 to +0.4519) · +0.4519 | +0.9380 (+0.8646 to +1.0114) · +0.0378 | -0.5492 (-0.5520 to -0.5464) · -0.5464 | +1.2390 (+1.1121 to +1.3659) · +0.0574 | **fails** | holds | holds | holds |
| returning-expert | +0.0085 | +0.0069 to +0.0102 |  |  | +0.2236 (+0.2168 to +0.2304) · +0.2304 | +0.8400 (+0.8212 to +0.8588) · +0.0205 | -0.5463 (-0.5485 to -0.5442) · -0.5442 | +0.8840 (+0.7148 to +1.0532) · +0.0388 | **fails** | holds | holds | holds |
| wanderer | +0.0147 | +0.0128 to +0.0166 | win |  | +0.3806 (+0.3743 to +0.3870) · +0.3870 | +0.9835 (+0.9508 to +1.0162) · +0.0319 | -0.5603 (-0.5623 to -0.5583) · -0.5583 | +1.2730 (+1.1301 to +1.4159) · +0.0527 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0061 | +0.0044 to +0.0078 |  |  | +0.3618 (+0.3550 to +0.3685) · +0.3685 | +0.6210 (+0.5530 to +0.6890) · +0.0300 | -0.5822 (-0.5858 to -0.5786) · -0.5786 | +0.5810 (+0.4570 to +0.7050) · +0.0345 | **fails** | holds | holds | holds |

#### first:revisitStopScale-low (reported): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0203 | +0.0182 to +0.0223 | win |  | +0.4456 (+0.4415 to +0.4498) · +0.4498 | +0.9700 (+0.9048 to +1.0352) · +0.0165 | -0.5952 (-0.5964 to -0.5940) · -0.5940 | +1.9195 (+1.7334 to +2.1056) · +0.0431 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0221 | +0.0205 to +0.0238 | win |  | +0.3012 (+0.2945 to +0.3079) · +0.3079 | -0.6410 (-0.8811 to -0.4009) · -0.0146 | -0.5415 (-0.5434 to -0.5397) · -0.5397 | +3.4780 (+3.2322 to +3.7238) · +0.0822 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0176 | +0.0159 to +0.0193 | win |  | +0.4581 (+0.4551 to +0.4611) · +0.4611 | +1.0745 (+0.9613 to +1.1877) · +0.0233 | -0.5669 (-0.5688 to -0.5650) · -0.5650 | +2.1330 (+1.9609 to +2.3051) · +0.0617 | **fails** | holds | holds | holds |
| returning-expert | +0.0091 | +0.0076 to +0.0105 |  |  | +0.1873 (+0.1814 to +0.1933) · +0.1933 | +1.0095 (+0.9852 to +1.0338) · +0.0149 | -0.4918 (-0.4937 to -0.4898) · -0.4898 | +1.3710 (+1.1624 to +1.5796) · +0.0416 | **fails** | holds | holds | holds |
| wanderer | +0.0155 | +0.0139 to +0.0172 | win |  | +0.3741 (+0.3678 to +0.3804) · +0.3804 | +0.9860 (+0.9537 to +1.0183) · +0.0186 | -0.5689 (-0.5706 to -0.5672) · -0.5672 | +1.9000 (+1.7112 to +2.0888) · +0.0510 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0118 | +0.0101 to +0.0134 | win |  | +0.3420 (+0.3351 to +0.3489) · +0.3489 | +0.9785 (+0.8686 to +1.0884) · +0.0236 | -0.5663 (-0.5683 to -0.5643) · -0.5643 | +1.4555 (+1.2810 to +1.6300) · +0.0550 | **fails** | holds | holds | holds |

#### first:revisitStopScale-high (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0243 | +0.0215 to +0.0270 | win |  | +0.4305 (+0.4258 to +0.4351) · +0.4351 | +0.9515 (+0.8650 to +1.0380) · +0.0284 | -0.5794 (-0.5810 to -0.5779) · -0.5779 | +1.4310 (+1.2874 to +1.5746) · +0.0557 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0143 | +0.0124 to +0.0163 | win |  | +0.3250 (+0.3186 to +0.3314) · +0.3314 | -0.6325 (-0.9326 to -0.3324) · -0.0250 | -0.5706 (-0.5724 to -0.5687) · -0.5687 | +1.6890 (+1.4692 to +1.9088) · +0.0578 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0101 | +0.0081 to +0.0121 | win |  | +0.4350 (+0.4306 to +0.4394) · +0.4394 | +0.4440 (+0.3592 to +0.5288) · +0.0254 | -0.6094 (-0.6152 to -0.6036) · -0.6036 | +0.6445 (+0.5325 to +0.7565) · +0.0438 | **fails** | holds | holds | holds |
| returning-expert | +0.0084 | +0.0068 to +0.0100 |  |  | +0.2148 (+0.2081 to +0.2214) · +0.2214 | +0.8360 (+0.8175 to +0.8545) · +0.0184 | -0.5373 (-0.5396 to -0.5351) · -0.5351 | +0.9520 (+0.7723 to +1.1317) · +0.0398 | **fails** | holds | holds | holds |
| wanderer | +0.0131 | +0.0111 to +0.0150 | win |  | +0.3783 (+0.3717 to +0.3848) · +0.3848 | +0.8250 (+0.7779 to +0.8721) · +0.0339 | -0.5730 (-0.5759 to -0.5700) · -0.5700 | +1.0050 (+0.8743 to +1.1357) · +0.0533 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0036 | +0.0021 to +0.0052 |  |  | +0.3628 (+0.3554 to +0.3703) · +0.3703 | +0.1585 (+0.0951 to +0.2219) · +0.0104 | -0.6268 (-0.6374 to -0.6162) · -0.6162 | +0.2470 (+0.1544 to +0.3396) · +0.0219 | **fails** | holds | holds | holds |

#### first:slots-low (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0228 | +0.0202 to +0.0253 | win |  | +0.4283 (+0.4235 to +0.4332) · +0.4332 | +0.9580 (+0.9351 to +0.9809) · +0.0318 | -0.5731 (-0.5744 to -0.5717) · -0.5717 | +1.4005 (+1.2631 to +1.5379) · +0.0595 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0180 | +0.0164 to +0.0196 | win |  | +0.3303 (+0.3239 to +0.3367) · +0.3367 | +0.5805 (+0.4920 to +0.6690) · +0.0151 | -0.5689 (-0.5707 to -0.5670) · -0.5670 | +2.1380 (+1.9621 to +2.3139) · +0.0968 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0135 | +0.0117 to +0.0152 | win |  | +0.4465 (+0.4427 to +0.4503) · +0.4503 | +0.8420 (+0.7984 to +0.8856) · +0.0362 | -0.5462 (-0.5489 to -0.5435) · -0.5435 | +1.1855 (+1.0563 to +1.3147) · +0.0642 | **fails** | holds | holds | holds |
| returning-expert | +0.0074 | +0.0058 to +0.0090 |  |  | +0.2305 (+0.2235 to +0.2374) · +0.2374 | +0.8345 (+0.8182 to +0.8508) · +0.0238 | -0.5437 (-0.5460 to -0.5415) · -0.5415 | +0.7440 (+0.5823 to +0.9057) · +0.0412 | **fails** | holds | holds | holds |
| wanderer | +0.0148 | +0.0130 to +0.0166 | win |  | +0.3808 (+0.3744 to +0.3872) · +0.3872 | +0.9420 (+0.9317 to +0.9523) · +0.0340 | -0.5539 (-0.5559 to -0.5520) · -0.5520 | +1.2695 (+1.1263 to +1.4127) · +0.0653 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0085 | +0.0069 to +0.0100 |  |  | +0.3583 (+0.3515 to +0.3651) · +0.3651 | +0.8060 (+0.7661 to +0.8459) · +0.0370 | -0.5590 (-0.5619 to -0.5561) · -0.5561 | +0.8685 (+0.7340 to +1.0030) · +0.0590 | **fails** | holds | holds | holds |

#### first:slots-high (reported): wins 5 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, single-subject-crammer:G2, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0197 | +0.0177 to +0.0218 | win |  | +0.4396 (+0.4352 to +0.4440) · +0.4440 | +1.0720 (+0.9901 to +1.1539) · +0.0178 | -0.5869 (-0.5884 to -0.5854) · -0.5854 | +1.7435 (+1.5665 to +1.9205) · +0.0368 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0129 | +0.0107 to +0.0152 | win |  | +0.2895 (+0.2822 to +0.2969) · +0.2969 | -3.0690 (-3.6044 to -2.5336) · -0.0536 | -0.5249 (-0.5269 to -0.5228) · -0.5228 | +1.8575 (+1.5111 to +2.2039) · +0.0315 | **fails** | **fails** | holds | holds |
| struggling-repeater | +0.0195 | +0.0174 to +0.0216 | win |  | +0.4519 (+0.4484 to +0.4554) · +0.4554 | +1.1770 (+1.0179 to +1.3361) · +0.0311 | -0.5592 (-0.5615 to -0.5570) · -0.5570 | +1.7865 (+1.6156 to +1.9574) · +0.0599 | **fails** | holds | holds | holds |
| returning-expert | +0.0110 | +0.0096 to +0.0124 | win |  | +0.1625 (+0.1567 to +0.1683) · +0.1683 | +2.2295 (+2.1681 to +2.2909) · +0.0260 | -0.4617 (-0.4638 to -0.4596) · -0.4596 | +1.9780 (+1.7522 to +2.2038) · +0.0464 | **fails** | holds | holds | holds |
| wanderer | +0.0140 | +0.0122 to +0.0158 | win |  | +0.3695 (+0.3630 to +0.3759) · +0.3759 | +1.0545 (+0.9982 to +1.1108) · +0.0202 | -0.5642 (-0.5661 to -0.5623) · -0.5623 | +1.5685 (+1.3838 to +1.7532) · +0.0399 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0100 | +0.0081 to +0.0119 |  |  | +0.3519 (+0.3451 to +0.3587) · +0.3587 | +0.8615 (+0.7169 to +1.0061) · +0.0273 | -0.5689 (-0.5718 to -0.5661) · -0.5661 | +0.9710 (+0.8148 to +1.1272) · +0.0446 | **fails** | holds | holds | holds |

#### first:priorRateMult-low (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0226 | +0.0203 to +0.0249 | win |  | +0.4401 (+0.4357 to +0.4445) · +0.4445 | +0.9935 (+0.9494 to +1.0376) · +0.0215 | -0.5975 (-0.5988 to -0.5962) · -0.5962 | +1.7935 (+1.6275 to +1.9595) · +0.0497 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0203 | +0.0185 to +0.0221 | win |  | +0.3098 (+0.3033 to +0.3163) · +0.3163 | -0.6940 (-0.9783 to -0.4097) · -0.0190 | -0.5628 (-0.5646 to -0.5611) · -0.5611 | +2.8495 (+2.6101 to +3.0889) · +0.0770 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0164 | +0.0145 to +0.0182 | win |  | +0.4510 (+0.4475 to +0.4545) · +0.4545 | +1.0710 (+0.9770 to +1.1650) · +0.0350 | -0.5529 (-0.5553 to -0.5505) · -0.5505 | +1.5780 (+1.4357 to +1.7203) · +0.0639 | **fails** | holds | holds | holds |
| returning-expert | +0.0091 | +0.0076 to +0.0106 |  |  | +0.1984 (+0.1922 to +0.2047) · +0.2047 | +0.8785 (+0.8593 to +0.8977) · +0.0147 | -0.5134 (-0.5155 to -0.5112) · -0.5112 | +1.2450 (+1.0468 to +1.4432) · +0.0420 | **fails** | holds | holds | holds |
| wanderer | +0.0153 | +0.0135 to +0.0171 | win |  | +0.3774 (+0.3710 to +0.3838) · +0.3838 | +0.9465 (+0.9225 to +0.9705) · +0.0235 | -0.5710 (-0.5729 to -0.5692) · -0.5692 | +1.5970 (+1.4303 to +1.7637) · +0.0543 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0082 | +0.0065 to +0.0099 |  |  | +0.3560 (+0.3493 to +0.3628) · +0.3628 | +0.7420 (+0.6499 to +0.8341) · +0.0281 | -0.5694 (-0.5724 to -0.5663) · -0.5663 | +0.8425 (+0.7045 to +0.9805) · +0.0452 | **fails** | holds | holds | holds |

#### first:priorRateMult-high (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0223 | +0.0201 to +0.0245 | win |  | +0.4400 (+0.4356 to +0.4445) · +0.4445 | +0.9870 (+0.9431 to +1.0309) · +0.0214 | -0.5974 (-0.5987 to -0.5961) · -0.5961 | +1.7710 (+1.6035 to +1.9385) · +0.0491 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0179 | +0.0162 to +0.0197 | win |  | +0.3100 (+0.3035 to +0.3164) · +0.3164 | -0.6610 (-0.9414 to -0.3806) · -0.0183 | -0.5630 (-0.5647 to -0.5612) · -0.5612 | +2.8980 (+2.6590 to +3.1370) · +0.0793 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0161 | +0.0143 to +0.0180 | win |  | +0.4510 (+0.4475 to +0.4546) · +0.4546 | +1.0600 (+0.9661 to +1.1539) · +0.0346 | -0.5529 (-0.5553 to -0.5505) · -0.5505 | +1.5695 (+1.4264 to +1.7126) · +0.0636 | **fails** | holds | holds | holds |
| returning-expert | +0.0090 | +0.0076 to +0.0105 |  |  | +0.1978 (+0.1916 to +0.2040) · +0.2040 | +0.8805 (+0.8614 to +0.8996) · +0.0148 | -0.5134 (-0.5155 to -0.5112) · -0.5112 | +1.2015 (+0.9989 to +1.4041) · +0.0410 | **fails** | holds | holds | holds |
| wanderer | +0.0154 | +0.0137 to +0.0172 | win |  | +0.3770 (+0.3706 to +0.3835) · +0.3835 | +0.9485 (+0.9247 to +0.9723) · +0.0236 | -0.5711 (-0.5729 to -0.5693) · -0.5693 | +1.5815 (+1.4114 to +1.7516) · +0.0540 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0088 | +0.0071 to +0.0104 |  |  | +0.3555 (+0.3488 to +0.3623) · +0.3623 | +0.7535 (+0.6627 to +0.8443) · +0.0287 | -0.5699 (-0.5730 to -0.5669) · -0.5669 | +0.8465 (+0.7068 to +0.9862) · +0.0461 | **fails** | holds | holds | holds |

#### first:priorRateMult-outer (reported): wins 4 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0221 | +0.0200 to +0.0242 | win |  | +0.4399 (+0.4355 to +0.4444) · +0.4444 | +0.9835 (+0.9405 to +1.0265) · +0.0213 | -0.5972 (-0.5985 to -0.5960) · -0.5960 | +1.7475 (+1.5759 to +1.9191) · +0.0485 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0166 | +0.0148 to +0.0184 | win |  | +0.3092 (+0.3027 to +0.3158) · +0.3158 | -0.6145 (-0.8934 to -0.3356) · -0.0174 | -0.5630 (-0.5647 to -0.5613) · -0.5613 | +2.9690 (+2.7235 to +3.2145) · +0.0825 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0160 | +0.0141 to +0.0178 | win |  | +0.4511 (+0.4476 to +0.4546) · +0.4546 | +1.0535 (+0.9586 to +1.1484) · +0.0343 | -0.5530 (-0.5554 to -0.5506) · -0.5506 | +1.5595 (+1.4149 to +1.7041) · +0.0633 | **fails** | holds | holds | holds |
| returning-expert | +0.0089 | +0.0075 to +0.0103 |  |  | +0.1958 (+0.1895 to +0.2020) · +0.2020 | +0.8795 (+0.8604 to +0.8986) · +0.0148 | -0.5133 (-0.5155 to -0.5112) · -0.5112 | +1.1265 (+0.9192 to +1.3338) · +0.0391 | **fails** | holds | holds | holds |
| wanderer | +0.0154 | +0.0137 to +0.0171 | win |  | +0.3768 (+0.3704 to +0.3832) · +0.3832 | +0.9515 (+0.9282 to +0.9748) · +0.0237 | -0.5712 (-0.5730 to -0.5694) · -0.5694 | +1.5610 (+1.3881 to +1.7339) · +0.0538 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0087 | +0.0071 to +0.0103 |  |  | +0.3557 (+0.3489 to +0.3625) · +0.3625 | +0.7190 (+0.6269 to +0.8111) · +0.0272 | -0.5705 (-0.5736 to -0.5674) · -0.5674 | +0.8105 (+0.6660 to +0.9550) · +0.0446 | **fails** | holds | holds | holds |

#### first:price-corner (reported): wins 2 of 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) · hi ≤ +0.05 | G2 Δ concepts (interval) · lo/ref ≥ −0.05 | G3 Δ prereq-first share (interval) · hi ≤ +0.02 | G4 Δ gain (interval) · lo/ref ≥ −0.05 | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0178 | +0.0147 to +0.0209 | win |  | +0.4158 (+0.4106 to +0.4210) · +0.4210 | +0.6740 (+0.6275 to +0.7205) · +0.0346 | -0.5922 (-0.5946 to -0.5898) · -0.5898 | +0.6580 (+0.5551 to +0.7609) · +0.0389 | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0143 | +0.0127 to +0.0159 | win |  | +0.3539 (+0.3477 to +0.3601) · +0.3601 | +0.7070 (+0.6489 to +0.7651) · +0.0341 | -0.5517 (-0.5542 to -0.5491) · -0.5491 | +1.2835 (+1.1503 to +1.4167) · +0.0899 | **fails** | holds | holds | holds |
| struggling-repeater | +0.0067 | +0.0048 to +0.0085 |  |  | +0.4307 (+0.4260 to +0.4354) · +0.4354 | +0.0625 (+0.0389 to +0.0861) · +0.0039 | -0.6763 (-0.6813 to -0.6713) · -0.6713 | +0.3485 (+0.2590 to +0.4380) · +0.0311 | **fails** | holds | holds | holds |
| returning-expert | +0.0081 | +0.0065 to +0.0096 |  |  | +0.2765 (+0.2690 to +0.2840) · +0.2840 | +0.7870 (+0.7690 to +0.8050) · +0.0381 | -0.5241 (-0.5269 to -0.5212) · -0.5212 | +0.6235 (+0.5002 to +0.7468) · +0.0560 | **fails** | holds | holds | holds |
| wanderer | +0.0089 | +0.0070 to +0.0108 |  |  | +0.3858 (+0.3795 to +0.3921) · +0.3921 | +0.2925 (+0.2725 to +0.3125) · +0.0195 | -0.6238 (-0.6276 to -0.6199) · -0.6199 | +0.5145 (+0.4079 to +0.6211) · +0.0419 | **fails** | holds | holds | holds |
| lapsed-returner | +0.0038 | +0.0024 to +0.0052 |  |  | +0.3785 (+0.3719 to +0.3852) · +0.3852 | +0.0055 (-0.0159 to +0.0269) · -0.0018 | -0.7090 (-0.7143 to -0.7037) · -0.7037 | +0.2440 (+0.1584 to +0.3296) · +0.0265 | **fails** | holds | holds | holds |

## Printed beside (no rule reads these)
- oracle `reachable+fixed` vs reference, interleave:base: wins 6, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1; Δ curious-newcomer +0.0167 (+0.0152, +0.0182); single-subject-crammer +0.0187 (+0.0175, +0.0199); struggling-repeater +0.0131 (+0.0120, +0.0143); returning-expert +0.0104 (+0.0094, +0.0114); wanderer +0.0142 (+0.0131, +0.0154); lapsed-returner +0.0106 (+0.0094, +0.0117)
- oracle `reachable+fixed` vs reference, first:base: wins 4, harmed none, guardrail fails curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1; Δ curious-newcomer +0.0231 (+0.0208, +0.0253); single-subject-crammer +0.0203 (+0.0185, +0.0220); struggling-repeater +0.0166 (+0.0147, +0.0184); returning-expert +0.0091 (+0.0076, +0.0106); wanderer +0.0155 (+0.0137, +0.0173); lapsed-returner +0.0082 (+0.0065, +0.0099)
- candidate vs oracle, interleave:base (Δ per reference lesson): curious-newcomer -0.0002 (-0.0005, +0.0002); single-subject-crammer -0.0000 (-0.0004, +0.0004); struggling-repeater -0.0000 (-0.0004, +0.0003); returning-expert +0.0002 (-0.0000, +0.0005); wanderer -0.0001 (-0.0004, +0.0003); lapsed-returner -0.0002 (-0.0006, +0.0002)
- candidate vs oracle, first:base (Δ per reference lesson): curious-newcomer -0.0006 (-0.0013, +0.0002); single-subject-crammer -0.0002 (-0.0009, +0.0005); struggling-repeater -0.0003 (-0.0008, +0.0003); returning-expert +0.0001 (-0.0003, +0.0004); wanderer -0.0003 (-0.0008, +0.0003); lapsed-returner +0.0001 (-0.0002, +0.0005)
- R1 candidate+fixed vs reference, interleave:base: curious-newcomer +0.0197 (+0.0178, +0.0217); single-subject-crammer +0.0223 (+0.0207, +0.0238); struggling-repeater +0.0168 (+0.0152, +0.0184); returning-expert +0.0120 (+0.0108, +0.0132); wanderer +0.0169 (+0.0154, +0.0183); lapsed-returner +0.0129 (+0.0114, +0.0145)
- R1 reachable+fixed vs reference, interleave:base: curious-newcomer +0.0200 (+0.0181, +0.0219); single-subject-crammer +0.0223 (+0.0207, +0.0238); struggling-repeater +0.0168 (+0.0152, +0.0185); returning-expert +0.0117 (+0.0105, +0.0129); wanderer +0.0170 (+0.0156, +0.0184); lapsed-returner +0.0131 (+0.0115, +0.0146)
- R7 candidate+fixed vs reference, interleave:base: curious-newcomer +0.0165 (+0.0150, +0.0181); single-subject-crammer +0.0187 (+0.0175, +0.0199); struggling-repeater +0.0131 (+0.0119, +0.0143); returning-expert +0.0106 (+0.0096, +0.0116); wanderer +0.0142 (+0.0131, +0.0153); lapsed-returner +0.0104 (+0.0092, +0.0115)
- R7 reachable+fixed vs reference, interleave:base: curious-newcomer +0.0167 (+0.0152, +0.0182); single-subject-crammer +0.0187 (+0.0175, +0.0199); struggling-repeater +0.0131 (+0.0120, +0.0143); returning-expert +0.0104 (+0.0094, +0.0114); wanderer +0.0142 (+0.0131, +0.0154); lapsed-returner +0.0106 (+0.0094, +0.0117)
- R30 candidate+fixed vs reference, interleave:base: curious-newcomer +0.0105 (+0.0094, +0.0116); single-subject-crammer +0.0107 (+0.0099, +0.0115); struggling-repeater +0.0070 (+0.0062, +0.0077); returning-expert +0.0076 (+0.0069, +0.0084); wanderer +0.0088 (+0.0080, +0.0095); lapsed-returner +0.0059 (+0.0052, +0.0067)
- R30 reachable+fixed vs reference, interleave:base: curious-newcomer +0.0106 (+0.0095, +0.0117); single-subject-crammer +0.0107 (+0.0100, +0.0115); struggling-repeater +0.0070 (+0.0063, +0.0077); returning-expert +0.0075 (+0.0067, +0.0082); wanderer +0.0088 (+0.0080, +0.0095); lapsed-returner +0.0061 (+0.0054, +0.0068)
- R1 candidate+fixed vs reference, first:base: curious-newcomer +0.0292 (+0.0264, +0.0320); single-subject-crammer +0.0268 (+0.0244, +0.0291); struggling-repeater +0.0246 (+0.0221, +0.0270); returning-expert +0.0109 (+0.0091, +0.0128); wanderer +0.0207 (+0.0184, +0.0230); lapsed-returner +0.0121 (+0.0099, +0.0144)
- R1 reachable+fixed vs reference, first:base: curious-newcomer +0.0299 (+0.0271, +0.0327); single-subject-crammer +0.0268 (+0.0245, +0.0292); struggling-repeater +0.0248 (+0.0223, +0.0272); returning-expert +0.0108 (+0.0090, +0.0127); wanderer +0.0210 (+0.0187, +0.0232); lapsed-returner +0.0120 (+0.0097, +0.0143)
- R7 candidate+fixed vs reference, first:base: curious-newcomer +0.0225 (+0.0203, +0.0248); single-subject-crammer +0.0200 (+0.0183, +0.0218); struggling-repeater +0.0163 (+0.0145, +0.0182); returning-expert +0.0092 (+0.0077, +0.0107); wanderer +0.0153 (+0.0135, +0.0170); lapsed-returner +0.0083 (+0.0067, +0.0100)
- R7 reachable+fixed vs reference, first:base: curious-newcomer +0.0231 (+0.0208, +0.0253); single-subject-crammer +0.0203 (+0.0185, +0.0220); struggling-repeater +0.0166 (+0.0147, +0.0184); returning-expert +0.0091 (+0.0076, +0.0106); wanderer +0.0155 (+0.0137, +0.0173); lapsed-returner +0.0082 (+0.0065, +0.0099)
- R30 candidate+fixed vs reference, first:base: curious-newcomer +0.0155 (+0.0136, +0.0173); single-subject-crammer +0.0125 (+0.0113, +0.0138); struggling-repeater +0.0093 (+0.0079, +0.0108); returning-expert +0.0068 (+0.0056, +0.0079); wanderer +0.0100 (+0.0086, +0.0114); lapsed-returner +0.0049 (+0.0037, +0.0062)
- R30 reachable+fixed vs reference, first:base: curious-newcomer +0.0159 (+0.0141, +0.0177); single-subject-crammer +0.0127 (+0.0114, +0.0140); struggling-repeater +0.0095 (+0.0081, +0.0110); returning-expert +0.0067 (+0.0055, +0.0079); wanderer +0.0102 (+0.0088, +0.0116); lapsed-returner +0.0048 (+0.0036, +0.0061)

### Descriptive (means per episode; base cells)
#### interleave:base
| arm | persona | nNew | revisits | revisitShare | cards | reveal | movedShare | R1d | refreshPicks | refreshPrior | refreshEpisode | newPicks | revisitsUnserved | refreshSkipped |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 75.924 | 29.181 | 0.270 | 108.005 | 0.962 | 0.000 | 0.681 | 8.441 | 7.565 | 0.875 | 70.383 | 113.726 | 0.000 |
| default-order+fixed | single-subject-crammer | 87.218 | 33.270 | 0.271 | 122.788 | 0.973 | 0.000 | 0.699 | 14.964 | 12.745 | 2.220 | 74.554 | 134.731 | 0.000 |
| default-order+fixed | struggling-repeater | 64.507 | 25.669 | 0.274 | 93.757 | 0.945 | 0.000 | 0.648 | 3.913 | 3.038 | 0.875 | 64.175 | 142.266 | 0.000 |
| default-order+fixed | returning-expert | 94.379 | 36.007 | 0.273 | 131.889 | 0.984 | 0.000 | 0.829 | 45.932 | 42.728 | 3.204 | 49.950 | 131.993 | 0.000 |
| default-order+fixed | wanderer | 77.531 | 30.167 | 0.273 | 110.495 | 0.964 | 0.000 | 0.714 | 15.909 | 14.524 | 1.385 | 64.419 | 137.833 | 0.000 |
| default-order+fixed | lapsed-returner | 61.350 | 24.557 | 0.274 | 89.763 | 0.938 | 0.000 | 0.728 | 16.202 | 15.070 | 1.131 | 49.004 | 143.443 | 0.000 |
| candidate+fixed | curious-newcomer | 75.924 | 29.181 | 0.270 | 108.005 | 0.962 | 0.993 | 0.703 | 7.676 | 7.676 | 0.000 | 71.148 | 113.716 | 0.097 |
| candidate+fixed | single-subject-crammer | 84.523 | 32.252 | 0.270 | 119.395 | 0.969 | 0.997 | 0.693 | 7.723 | 7.722 | 0.001 | 79.421 | 135.749 | 0.221 |
| candidate+fixed | struggling-repeater | 64.725 | 25.758 | 0.274 | 94.044 | 0.946 | 0.992 | 0.668 | 3.045 | 3.045 | 0.000 | 65.242 | 142.178 | 0.049 |
| candidate+fixed | returning-expert | 94.379 | 36.007 | 0.273 | 131.889 | 0.984 | 0.993 | 0.831 | 44.044 | 43.859 | 0.184 | 51.838 | 131.993 | 0.434 |
| candidate+fixed | wanderer | 77.531 | 30.167 | 0.273 | 110.495 | 0.964 | 0.993 | 0.732 | 14.928 | 14.928 | 0.000 | 65.399 | 137.833 | 0.188 |
| candidate+fixed | lapsed-returner | 61.254 | 24.520 | 0.274 | 89.635 | 0.938 | 0.993 | 0.745 | 15.524 | 15.521 | 0.003 | 49.592 | 143.480 | 0.228 |
| reachable+fixed | curious-newcomer | 75.924 | 29.181 | 0.270 | 108.005 | 0.962 | 0.993 | 0.704 | 7.667 | 7.667 | 0.000 | 71.157 | 113.716 | 0.098 |
| reachable+fixed | single-subject-crammer | 84.680 | 32.307 | 0.270 | 119.580 | 0.969 | 0.997 | 0.694 | 7.966 | 7.966 | 0.001 | 79.306 | 135.692 | 0.215 |
| reachable+fixed | struggling-repeater | 64.746 | 25.765 | 0.274 | 94.072 | 0.946 | 0.992 | 0.668 | 3.025 | 3.025 | 0.000 | 65.282 | 142.169 | 0.049 |
| reachable+fixed | returning-expert | 94.379 | 36.007 | 0.273 | 131.889 | 0.984 | 0.993 | 0.831 | 44.075 | 43.778 | 0.297 | 51.807 | 131.993 | 0.434 |
| reachable+fixed | wanderer | 77.531 | 30.167 | 0.273 | 110.495 | 0.964 | 0.993 | 0.733 | 14.938 | 14.938 | 0.000 | 65.390 | 137.833 | 0.189 |
| reachable+fixed | lapsed-returner | 61.252 | 24.518 | 0.274 | 89.641 | 0.938 | 0.993 | 0.745 | 15.485 | 15.482 | 0.004 | 49.639 | 143.482 | 0.230 |
#### first:base
| arm | persona | nNew | revisits | revisitShare | cards | reveal | movedShare | R1d | refreshPicks | refreshPrior | refreshEpisode | newPicks | revisitsUnserved | refreshSkipped |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 45.050 | 72.338 | 0.609 | 119.103 | 0.962 | 0.000 | 0.682 | 5.178 | 4.419 | 0.759 | 41.587 | 18.971 | 0.000 |
| default-order+fixed | single-subject-crammer | 52.430 | 98.049 | 0.648 | 151.820 | 0.974 | 0.000 | 0.697 | 8.593 | 7.763 | 0.830 | 45.178 | 13.588 | 0.000 |
| default-order+fixed | struggling-repeater | 28.763 | 72.894 | 0.711 | 103.237 | 0.945 | 0.000 | 0.657 | 2.155 | 1.350 | 0.805 | 28.188 | 29.315 | 0.000 |
| default-order+fixed | returning-expert | 59.178 | 100.329 | 0.627 | 160.451 | 0.984 | 0.000 | 0.828 | 28.454 | 27.220 | 1.234 | 31.668 | 11.607 | 0.000 |
| default-order+fixed | wanderer | 40.137 | 85.269 | 0.676 | 126.896 | 0.962 | 0.000 | 0.716 | 8.470 | 7.487 | 0.983 | 33.158 | 22.203 | 0.000 |
| default-order+fixed | lapsed-returner | 23.921 | 73.481 | 0.750 | 98.877 | 0.937 | 0.000 | 0.734 | 6.641 | 5.782 | 0.859 | 18.755 | 33.820 | 0.000 |
| candidate+fixed | curious-newcomer | 45.114 | 72.225 | 0.609 | 119.047 | 0.962 | 0.990 | 0.712 | 4.462 | 4.462 | 0.000 | 42.360 | 18.915 | 0.095 |
| candidate+fixed | single-subject-crammer | 50.747 | 97.510 | 0.654 | 149.733 | 0.970 | 0.996 | 0.710 | 5.411 | 5.411 | 0.000 | 46.812 | 14.059 | 0.227 |
| candidate+fixed | struggling-repeater | 29.019 | 72.969 | 0.710 | 103.556 | 0.946 | 0.991 | 0.683 | 1.357 | 1.357 | 0.000 | 29.231 | 29.240 | 0.052 |
| candidate+fixed | returning-expert | 59.178 | 100.325 | 0.627 | 160.448 | 0.984 | 0.993 | 0.834 | 27.669 | 27.669 | 0.000 | 32.453 | 11.607 | 0.444 |
| candidate+fixed | wanderer | 40.138 | 85.240 | 0.676 | 126.869 | 0.962 | 0.991 | 0.741 | 7.740 | 7.740 | 0.000 | 33.889 | 22.175 | 0.188 |
| candidate+fixed | lapsed-returner | 23.881 | 73.383 | 0.750 | 98.739 | 0.937 | 0.996 | 0.752 | 6.034 | 6.034 | 0.000 | 19.322 | 33.804 | 0.234 |
| reachable+fixed | curious-newcomer | 45.115 | 72.222 | 0.609 | 119.043 | 0.962 | 0.990 | 0.712 | 4.459 | 4.459 | 0.000 | 42.362 | 18.916 | 0.098 |
| reachable+fixed | single-subject-crammer | 51.230 | 97.698 | 0.653 | 150.376 | 0.971 | 0.996 | 0.712 | 5.873 | 5.873 | 0.000 | 46.804 | 13.882 | 0.222 |
| reachable+fixed | struggling-repeater | 29.037 | 72.984 | 0.710 | 103.588 | 0.946 | 0.990 | 0.683 | 1.343 | 1.343 | 0.000 | 29.261 | 29.235 | 0.052 |
| reachable+fixed | returning-expert | 59.178 | 100.325 | 0.627 | 160.448 | 0.984 | 0.993 | 0.834 | 27.668 | 27.668 | 0.000 | 32.456 | 11.607 | 0.446 |
| reachable+fixed | wanderer | 40.138 | 85.240 | 0.676 | 126.869 | 0.962 | 0.991 | 0.741 | 7.759 | 7.759 | 0.000 | 33.870 | 22.174 | 0.195 |
| reachable+fixed | lapsed-returner | 23.875 | 73.386 | 0.750 | 98.740 | 0.937 | 0.996 | 0.752 | 6.029 | 6.029 | 0.000 | 19.324 | 33.794 | 0.234 |
