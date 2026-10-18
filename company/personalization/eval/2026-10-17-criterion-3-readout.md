# Criterion 3 readout (readout 3): the ordering headroom's parts, the reachable-signal oracle, and the interleave

owner: personalization-eval (Uma) · run: eval-k4-1017 · board: W-1567 · brief: company/personalization/batches/2026-10-17-batch-4.md#k4 (mailbox 20261017T084726885Z-vp-personalization-ac9b84f1)
criterion: company/personalization/eval/2026-10-17-criterion-3.md, **frozen at 709ca2d22af533532f337d2e7dd9ca078bc316a3** (file sha256 at that commit 2ed7933e4b606d79d6c2109e619ce698730aae9d6a6b7b1d908db9d905346d30). The hash line was added in b1ae294. The run read the file at **b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7** (sha256 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4, in both manifests).
records beside it: **readout 1** company/personalization/eval/2026-10-16-phase-a-readout-1.md (phase A; FAIL stands) and **readout 2** company/personalization/eval/2026-10-16-criterion-2-readout.md (criterion 2; reproduced byte for byte, company/personalization/eval/2026-10-16-criterion-2-readout-repro.md). **Readout 2 stays the record for its verdicts** (pre-commitment 1). This readout re-runs none of them.
next readers: learner-model-engineer (R3, reproduction, batch 4 #r3), vp-personalization (V, batch 4 #v).

This readout is reported unedited. §A is the formatter's output (harness/c3/readout3-tables.mjs, written before the freeze), pasted as printed. §1 to §8 are my sentences about it. No sentence here is a keep or kill recommendation. V is the VP's.

**No change to criterion 3 after the first scored number.** The freeze commit (709ca2d) and the hash commit (b1ae294) came before the run started. No arm under test was run before then (criterion 3 §0, K4 paragraph).

## 1. The rule-3 field, and whether the placements agree

**`verdicts.rule3` in `interleave:base` (the base cell named in criterion 3 §2.0): REACHABLE. `reachable + fixed` wins against `default-order + fixed` in 6 of 6 personas** (95% t interval above 0 and Δ ≥ δ_min 0.01). The validity checks passed: T1 cross-process replay and RS1 to RS6 on the arm's own inputs, in both placements, and the reachable INVALID flag is false. C3-ID1 (576 episode pairs), C3-ID2 and T5c passed at the start of both parts. There were 0 unit errors.

**The placements agree on the reading.** In `first:base`, the reachable arm wins in 5 of 6. lapsed-returner misses: Δ +0.0095 [+0.0077, +0.0113], under δ_min. Both are at or above 4 of 6. Rule 3 reads `interleave:base` only (criterion 3 §2.0). The `first:base` result changes no reading.

**How close the reading is to its line.** These are facts from §A, not a reading.
- In `interleave:base` the reachable Δ is +0.0102 to +0.0176 R₇, against δ_min = 0.01. Two personas are within 0.0006 of the bar on the mean: returning-expert +0.0102 and lapsed-returner +0.0106.
- In the interleave sweep the reachable arm wins in 4 or more of 6 in 24 of 29 cells. It wins in **0 of 6** at `forgetScale-high`, `learnRate-low` and `prereqPenalty-low`, in 1 at `forgetShape-high`, and in 2 at `priorKnowledgeMean-high`. In `first` it wins in 4 or more in 10 of 11 cells (2 of 6 at `price-corner`).
- The cells where it falls are the ones where forgetting is faster, encoding is weaker, or the prerequisite penalty is smaller (§A, "Reachable vs default-order, mean Δ R7 per persona, every cell"). At `prereqPenalty-high` it reaches +0.020 to +0.047. Its gain in this world rests largely on the prerequisite term, which it estimates from predictions and dims.
- What the reachable arm does differently from default-order is mostly *which new lesson*: it takes almost as many refreshes as default-order (§4).

## 2. O1: what oracle-order's gain is made of (F1 N7)

Hidden-state references, review fixed, against default-order. Per persona with intervals in §A.
- **Δ_full ≈ Δ_new in every cell and persona.** In `interleave:base`, Δ_full is +0.083 to +0.150 and Δ_new is +0.082 to +0.139. Choosing new picks alone recovers almost all of the full oracle's gain.
- **Δ_refresh is positive alone, but the interaction is about −Δ_refresh** (`interleave:base`: Δ_refresh +0.007 to +0.134, interaction −0.006 to −0.122). Refresh choice adds nothing on top of new-pick choice. Both draw on the same thing: a slot not spent on a lesson the learner already knows.
- **The N7 cells.** Δ_full falls a little from `priorRateMult-low` (most stable prior knowledge, E3 high kept) through base and `-high` to the L4 outer cell (m = 1, criterion 2's rule). For curious-newcomer in the interleave that is +0.113, +0.112, +0.108, +0.104. **The ordering headroom does not rest on criterion 2's L4 refresh value.** It is as large or larger when prior knowledge is stable, as E3 argues (E3 §2). Under L4, Δ_refresh is *smaller* (curious-newcomer +0.031 at base vs +0.011 at outer), because a refresh is then worth taking, so skipping it gains less.
- **N11, taken vs skipped.** `oracle-refresh`'s Δ_refresh is the value of **skipping** known lessons, not of refreshing them. In `interleave:base` default-order serves 4.0 to 45.8 refreshes per episode, and `oracle-refresh` serves 0.3 to 1.9. `oracle-order` serves 0 to 0.6. Only where refreshes are worth more does `oracle-refresh` take a share of them: at `priorRateMult-high` 1.9 to 9.1, and at the L4 outer cell 5.7 to 13.5. returning-expert is the exception, at 0.65 and 1.0. struggling-repeater is the one persona whose Δ_refresh is negative there (−0.004 high, −0.009 outer), with a matching positive interaction.
- **Defect in a descriptive counter, stated and not repaired after the score.** The `skipped` column (`extra.refreshSkipped`, criterion 3 §2.1, K4-7) caps at about 1 by construction. A known lesson that an arm passes over stays the default order's next eligible lesson, so the known lessons behind it are never "next" and are never counted. Read skips as **default-order's taken minus the arm's taken** in the same cell. Both columns are in §A. No reading uses the counter. A fix would be a new criterion's.
- **N12.** "taken: before" counts refreshes whose concept a completed lesson shares: learned before this pick, in the episode *or the pre-history*. It is not "episode-learned" alone. In `interleave:base` it is 0.9 to 3.2 per episode for default-order, and the rest are prior-known. The measured refresh side is nearly all prior knowledge, as criterion 3 §2.1 expected.

## 3. The reachable-signal oracle vs default-order, per persona and overall

| persona | `interleave:base` (rule 3 cell) | `first:base` |
|---|---|---|
| curious-newcomer | +0.0168 [+0.0153, +0.0183] win | +0.0235 [+0.0212, +0.0257] win |
| single-subject-crammer | +0.0176 [+0.0164, +0.0187] win | +0.0174 [+0.0156, +0.0191] win |
| struggling-repeater | +0.0134 [+0.0122, +0.0146] win | +0.0172 [+0.0152, +0.0192] win |
| returning-expert | +0.0102 [+0.0092, +0.0113] win | +0.0111 [+0.0095, +0.0126] win |
| wanderer | +0.0136 [+0.0125, +0.0148] win | +0.0148 [+0.0130, +0.0167] win |
| lapsed-returner | +0.0106 [+0.0094, +0.0118] win | +0.0095 [+0.0077, +0.0113] |
| **reading** | **REACHABLE (6 of 6)** | 5 of 6 (reported, not read) |

(Copied from §A, "interleave:base / first:base: ordering arms vs default-order".) Harms: none. Ordering guardrails, reported and not read (criterion 3 §2.2): G1 (top-domain share) fails for the reachable arm in all 6 personas in both base cells, and for oracle-order and oracle-new in 6 of 6 there too. oracle-refresh fails G1 in 1 or 2 personas and G3 (prerequisite-first) in 4 or 5. oracle-order and oracle-new fail G3 for returning-expert in the interleave. An ordering rule built toward this oracle would have to answer G1 before any candidate criterion, a point for whoever writes one.

The reachable oracle is a lower bound on what an order limited to §I.3's inputs can reach in this world (criterion 3 §2.2). It reaches about 7 to 21% of oracle-order's gain in the base cell, by persona: for example, curious-newcomer +0.017 of +0.112.

## 4. What the reachable arm does

From §A's descriptive tables. In `interleave:base` it serves 3.1 to 44.0 refreshes per episode, against default-order's 4.0 to 45.8. It cannot see which concepts are prior-known beyond its per-domain estimate. It serves about 1 to 5 more new lessons per episode than default-order (single-subject-crammer 79.4 vs 74.7, the largest). Its gain moves with the prerequisite penalty and the learn rate (§1). The concept-level hidden state the full oracle uses (which concept is known) is mostly not recoverable from these inputs.

## 5. The interleave rows and the review rows (input for head-of-product and evaluation-steward, pre-commitment 5; no rule reads them)

- **`interleave:base`: `default-order + none` is worse than `fixed` in 6 of 6 personas** (−0.014 to −0.029, each a HARM by criterion 2's harm test, with no review guardrail failing). In the interleave, the fixed schedule's revisits help R₇. In revisits-first (`first:base`, E3's cost 0.3 and 8 positions), `none` vs `fixed` is mixed: one win (lapsed-returner +0.017), two harms, three small negatives. Readout 2's world had `default-order + none` ahead of `fixed` in revisits-first at 12 positions and cost 1. That finding does not carry into the interleave, or into E3's cheaper, shorter revisit price.
- `none` vs `fixed` in the interleave has no win in 28 of 29 interleave cells, and 1 win at `revisitStopScale-high` (§A per cell).
- **`oracle-review` vs `fixed`**: wins in 6 of 6 in `interleave:base` (+0.036 to +0.073) and `first:base` (+0.069 to +0.128). Review timing still has headroom in both placements. θ chosen per persona on tuning seeds: §A.
- In the interleave, the fixed queue is long and mostly unserved. 25 to 36 revisits are served per 14-day episode, and 114 to 143 queue entries are left unserved across sessions (§A descriptive, `revisitsUnserved` counts per-session leftovers, summed). At 1 in 3 the interleave serves at most about 3 revisits a session.
- **B4 limit (criterion 3 §10.1).** These interleave rows describe Feed.tsx's rule over not-yet-completed lessons. They do not describe today's feed for a returning learner, which re-renders completed lessons. For that feed under the default order, `first:base` is the closer cell, without the scroll cost.

## 6. Sentences F3 asked for

- **N1.** Refresh gain in this world is decay avoided only: a clock reset with the same rate, and no stabilisation term. With the age axis at 0 (B1), a prior trace's refresh value is zero on day 0 and grows with the day index. The refresh-to-new ratio sits at or below E3's low at E3's base. Every Δ_refresh above is read under that form.
- **N4.** A stop that depends on whether a revisit was missed is not modelled. E3 gives its direction only ([S]), not its size. Under the interleave it could pass part of an order's effect on revisit misses into stopping, and so move an ordering Δ a little, in a direction not measured here.
- **N5.** `slots` comes from analytics with "none to low" confidence. The reachable reading differs at the session-length cells. `interleave:slots-low` has 5 wins of 6 (returning-expert +0.0091). `interleave:slots-high` has 4 (single-subject-crammer +0.0097, returning-expert +0.0094). `first:slots-low` has 4. All are still at or above 4 of 6, but margins narrow at both ends.
- **N6.** The price corner (stop 2.0, 4 positions, cost 0.5) is reported only. The reachable arm wins in 5 of 6 in the interleave and **2 of 6 in `first`**, so the revisits-first reading leans on the price rows' centre. The interleave reading does not.
- **N7, unmodelled.** The placement effect on encoding (E3 row 3) is not in the world. Differences between placements here come from stopping and slot structure only.
- **N11, N12.** In §2.

## 7. Δ beside the MDE (criterion 3 §6)

The reachable arm's Δ in `interleave:base` is **1.0 to 1.8 points of R₇**. Every value is below the smallest MDE in the table (2.2 points at 10,000 learners). In `first:base` it is 1.0 to 2.3 points, and only curious-newcomer reaches the 10,000-learner MDE. Criterion 2's caution stands. That MDE table is for live first-revisit recall. R₇ is a final-test read the product cannot observe. A gain of this size **could not be confirmed live at 5,000 learners**, and any live outcome would have to be one no policy can time. Nothing here is a phase B (pre-commitment 6).

## 8. Reproduction (R3, learner-model-engineer; determinism only)

1. Fresh worktree at **b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7**, then `npm ci`, Node v22.22.0. Check `sha256sum company/personalization/eval/2026-10-17-criterion-3.md` = 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4, and every `fileSha256` in company/personalization/eval/harness/records/2026-10-17-readout-3/{interleave,first}/manifest.json (paths relative to harness/c3/). The E3 block is world3.mjs's own (sha256 0e120add…c1927a). No `--e3=` file is needed.
2. Part 1: `NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/c3/run3.mjs --seeds=1932 --jobs=4 --placements=interleave --out=<dir1>` (10622 s here, 4 cores).
3. Part 2: the same with `--placements=first --out=<dir2>` (1946 s here). Any `--jobs`. The heap flag changes no output.
4. Compare byte for byte (sha256 here):

| part | results.ndjson | verdicts.json | manifest.json |
|---|---|---|---|
| interleave | 951cca1ad443c3542ce27e1f783484886105dc2a85f6ed4499fbc2943850817e (1.20 GB) | 65d8421efef462c9cdceb03dd3b709d7c1de37f0203053a46695f9562fc5d578 | 65caac02f97e1a296cc5c0669c3ce54757797b965757ae14ead2cdc487cfbf7d |
| first | 90085f3e4c3e59142ac44f5e626ea8627218d4a76998de2bb03331566719a1f9 (0.33 GB) | 89969f9fd189b5cbd4dcb361268b505030958f5f6dd101590732e980628162e3 | 445fa515c39c67bf397b6d00b97c9f10d6604d50175702609417f1550836c89e |

   manifest.json may differ only in `seconds` (and `commit` if the worktree differs). results.ndjson is not committed. It was deleted after hashing, and the tables in §A were printed first. verdicts.json and manifest.json are committed under harness/records/2026-10-17-readout-3/.
5. Tables: `node company/personalization/eval/harness/c3/readout3-tables.mjs --parts=<dir1>,<dir2>` prints §A (sha256 of the printed text here: f9aa1739048ff521f46ce3be1feff7be0856b31a7962b2d470720c1ae55505de).

Seed list: 1001..2932 (S = 1932, criterion 3 §1.4). Tuning seeds: 5001..5100. Personas: the six of personas.copy.mjs.

## A. The run's tables, as printed by readout3-tables.mjs (unedited)

## Run
- placements interleave · commit b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7 · criterion sha256 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 · status frozen · plumbing false · E1 sha256 c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 · E3 sha256 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a · S 1932 · seeds 1001..2932 · tuning 5001..5100 · node v22.22.0 · model model-v0.2.2 · 10621.758 s · errors 0
- placements first · commit b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7 · criterion sha256 78e2b5131ed8024a7e81fcb2b463157ba6f7edb3b94a6a38ce04771f366927e4 · status frozen · plumbing false · E1 sha256 c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 · E3 sha256 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a · S 1932 · seeds 1001..2932 · tuning 5001..5100 · node v22.22.0 · model model-v0.2.2 · 1946.392 s · errors 0

## Validity: judge tests and the reachable arm
- interleave: C3-ID1 true (576 episode pairs) · C3-ID2 true (12 files, b89f2590f6031ae1dae9b24b4b2046eece8f6adb) · T5c true
- first: C3-ID1 true (576 episode pairs) · C3-ID2 true (12 files, b89f2590f6031ae1dae9b24b4b2046eece8f6adb) · T5c true
- interleave: reachable INVALID flag **false** · T1 interleave:base/curious-newcomer true, interleave:base/returning-expert true · RS1-RS6 interleave:base/curious-newcomer true, interleave:base/returning-expert true
- first: reachable INVALID flag **false** · T1 first:base/curious-newcomer true, first:base/returning-expert true · RS1-RS6 first:base/curious-newcomer true, first:base/returning-expert true

## Rule 3 field (pre-commitment 3 reads this): reachable vs default-order in interleave:base
**REACHABLE** · wins 6 of 6 · pre-commitment 3 reads this field: REACHABLE = wins (lo > 0 and Δ ≥ δ_min) in at least 4 of 6 personas in criterion 3's base cell

### interleave:base: ordering arms vs default-order (+ fixed), Δ R7 per persona [95% t CI], wins only; harms and G1-G4 beside, not read
| persona | oracle-order | oracle-new | oracle-refresh | reachable |
|---|---|---|---|---|
| curious-newcomer | +0.1117 [+0.1100, +0.1133] win | +0.1108 [+0.1091, +0.1124] win | +0.0307 [+0.0300, +0.0313] win | +0.0168 [+0.0153, +0.0183] win |
| single-subject-crammer | +0.0826 [+0.0814, +0.0839] win | +0.0817 [+0.0804, +0.0829] win | +0.0317 [+0.0308, +0.0326] win | +0.0176 [+0.0164, +0.0187] win |
| struggling-repeater | +0.0847 [+0.0833, +0.0860] win | +0.0845 [+0.0832, +0.0859] win | +0.0065 [+0.0059, +0.0070] | +0.0134 [+0.0122, +0.0146] win |
| returning-expert | +0.1504 [+0.1494, +0.1515] win | +0.1386 [+0.1375, +0.1397] win | +0.1342 [+0.1332, +0.1352] win | +0.0102 [+0.0092, +0.0113] win |
| wanderer | +0.1060 [+0.1047, +0.1072] win | +0.1046 [+0.1034, +0.1059] win | +0.0437 [+0.0430, +0.0444] win | +0.0136 [+0.0125, +0.0148] win |
| lapsed-returner | +0.1069 [+0.1056, +0.1082] win | +0.1055 [+0.1042, +0.1068] win | +0.0434 [+0.0425, +0.0442] win | +0.0106 [+0.0094, +0.0118] win |
| wins | 6 | 6 | 5 | 6 |
| guardrail fails (reported) | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, returning-expert:G3, wanderer:G1, lapsed-returner:G1 | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, returning-expert:G3, wanderer:G1, lapsed-returner:G1 | single-subject-crammer:G1, single-subject-crammer:G3, returning-expert:G1, returning-expert:G3, wanderer:G3, lapsed-returner:G3 | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 |

### first:base: ordering arms vs default-order (+ fixed), Δ R7 per persona [95% t CI], wins only; harms and G1-G4 beside, not read
| persona | oracle-order | oracle-new | oracle-refresh | reachable |
|---|---|---|---|---|
| curious-newcomer | +0.1587 [+0.1564, +0.1610] win | +0.1571 [+0.1548, +0.1594] win | +0.0484 [+0.0471, +0.0496] win | +0.0235 [+0.0212, +0.0257] win |
| single-subject-crammer | +0.1115 [+0.1096, +0.1135] win | +0.1096 [+0.1077, +0.1115] win | +0.0398 [+0.0385, +0.0411] win | +0.0174 [+0.0156, +0.0191] win |
| struggling-repeater | +0.1148 [+0.1127, +0.1170] win | +0.1143 [+0.1121, +0.1164] win | +0.0144 [+0.0135, +0.0152] win | +0.0172 [+0.0152, +0.0192] win |
| returning-expert | +0.1906 [+0.1890, +0.1922] win | +0.1796 [+0.1781, +0.1812] win | +0.1517 [+0.1502, +0.1532] win | +0.0111 [+0.0095, +0.0126] win |
| wanderer | +0.1390 [+0.1371, +0.1408] win | +0.1357 [+0.1338, +0.1376] win | +0.0582 [+0.0570, +0.0594] win | +0.0148 [+0.0130, +0.0167] win |
| lapsed-returner | +0.1237 [+0.1216, +0.1258] win | +0.1191 [+0.1170, +0.1212] win | +0.0495 [+0.0481, +0.0509] win | +0.0095 [+0.0077, +0.0113] |
| wins | 6 | 6 | 6 | 5 |
| guardrail fails (reported) | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | curious-newcomer:G3, single-subject-crammer:G1, single-subject-crammer:G3, returning-expert:G3, wanderer:G3, lapsed-returner:G3 | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 |

### Wins per cell (of 6), every cell
| cell | oracle-order | oracle-new | oracle-refresh | reachable |
|---|---|---|---|---|
| interleave:base | 6 | 6 | 5 | 6 |
| interleave:forgetScale-low | 6 | 6 | 6 | 6 |
| interleave:forgetScale-high | 6 | 6 | 1 | 0 |
| interleave:forgetShape-low | 6 | 6 | 5 | 6 |
| interleave:forgetShape-high | 6 | 6 | 1 | 1 |
| interleave:kSpread-low | 6 | 6 | 5 | 6 |
| interleave:kSpread-high | 6 | 6 | 1 | 6 |
| interleave:revisitStrengthen-low | 6 | 6 | 5 | 6 |
| interleave:revisitStrengthen-high | 6 | 6 | 5 | 6 |
| interleave:relearn-low | 6 | 6 | 5 | 6 |
| interleave:relearn-high | 6 | 6 | 5 | 6 |
| interleave:priorKnowledgeMean-low | 6 | 6 | 3 | 6 |
| interleave:priorKnowledgeMean-high | 6 | 6 | 6 | 2 |
| interleave:learnRate-low | 6 | 6 | 5 | 0 |
| interleave:learnRate-high | 6 | 6 | 6 | 6 |
| interleave:prereqPenalty-low | 6 | 6 | 5 | 0 |
| interleave:prereqPenalty-high | 6 | 6 | 5 | 6 |
| interleave:pullScale-low | 6 | 6 | 5 | 5 |
| interleave:pullScale-high | 6 | 6 | 5 | 6 |
| interleave:revisitSlotCost-low | 6 | 6 | 5 | 6 |
| interleave:revisitSlotCost-high | 6 | 6 | 5 | 5 |
| interleave:revisitStopScale-low | 6 | 6 | 5 | 6 |
| interleave:revisitStopScale-high | 6 | 6 | 5 | 5 |
| interleave:slots-low | 6 | 6 | 5 | 5 |
| interleave:slots-high | 6 | 6 | 5 | 4 |
| interleave:priorRateMult-low | 6 | 6 | 5 | 6 |
| interleave:priorRateMult-high | 6 | 6 | 5 | 6 |
| interleave:priorRateMult-outer | 6 | 6 | 5 | 6 |
| interleave:price-corner | 6 | 6 | 5 | 5 |
| first:base | 6 | 6 | 6 | 5 |
| first:revisitSlotCost-low | 6 | 6 | 6 | 6 |
| first:revisitSlotCost-high | 6 | 6 | 6 | 5 |
| first:revisitStopScale-low | 6 | 6 | 6 | 5 |
| first:revisitStopScale-high | 6 | 6 | 5 | 5 |
| first:slots-low | 6 | 6 | 6 | 4 |
| first:slots-high | 6 | 6 | 6 | 6 |
| first:priorRateMult-low | 6 | 6 | 6 | 5 |
| first:priorRateMult-high | 6 | 6 | 5 | 5 |
| first:priorRateMult-outer | 6 | 6 | 5 | 5 |
| first:price-corner | 6 | 6 | 5 | 2 |

### Reachable vs default-order, mean Δ R7 per persona, every cell
| cell | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| interleave:base | +0.0168* | +0.0176* | +0.0134* | +0.0102* | +0.0136* | +0.0106* |
| interleave:forgetScale-low | +0.0237* | +0.0277* | +0.0221* | +0.0134* | +0.0199* | +0.0167* |
| interleave:forgetScale-high | +0.0069 | +0.0047 | +0.0041 | +0.0040 | +0.0051 | +0.0034 |
| interleave:forgetShape-low | +0.0175* | +0.0188* | +0.0142* | +0.0107* | +0.0143* | +0.0111* |
| interleave:forgetShape-high | +0.0112* | +0.0084 | +0.0081 | +0.0051 | +0.0084 | +0.0066 |
| interleave:kSpread-low | +0.0168* | +0.0177* | +0.0133* | +0.0102* | +0.0136* | +0.0106* |
| interleave:kSpread-high | +0.0162* | +0.0173* | +0.0138* | +0.0101* | +0.0135* | +0.0106* |
| interleave:revisitStrengthen-low | +0.0170* | +0.0174* | +0.0134* | +0.0102* | +0.0136* | +0.0105* |
| interleave:revisitStrengthen-high | +0.0165* | +0.0177* | +0.0134* | +0.0102* | +0.0136* | +0.0106* |
| interleave:relearn-low | +0.0166* | +0.0175* | +0.0135* | +0.0102* | +0.0134* | +0.0106* |
| interleave:relearn-high | +0.0165* | +0.0176* | +0.0137* | +0.0103* | +0.0136* | +0.0105* |
| interleave:priorKnowledgeMean-low | +0.0199* | +0.0143* | +0.0154* | +0.0140* | +0.0174* | +0.0148* |
| interleave:priorKnowledgeMean-high | +0.0105* | +0.0149* | +0.0090 | +0.0040 | +0.0072 | +0.0056 |
| interleave:learnRate-low | +0.0079 | +0.0060 | +0.0059 | +0.0034 | +0.0060 | +0.0054 |
| interleave:learnRate-high | +0.0279* | +0.0309* | +0.0225* | +0.0170* | +0.0210* | +0.0164* |
| interleave:prereqPenalty-low | +0.0025 | +0.0094 | +0.0036 | +0.0052 | +0.0034 | +0.0020 |
| interleave:prereqPenalty-high | +0.0471* | +0.0333* | +0.0370* | +0.0196* | +0.0341* | +0.0269* |
| interleave:pullScale-low | +0.0174* | +0.0159* | +0.0138* | +0.0082 | +0.0140* | +0.0114* |
| interleave:pullScale-high | +0.0169* | +0.0188* | +0.0137* | +0.0115* | +0.0129* | +0.0107* |
| interleave:revisitSlotCost-low | +0.0168* | +0.0176* | +0.0134* | +0.0102* | +0.0136* | +0.0106* |
| interleave:revisitSlotCost-high | +0.0172* | +0.0174* | +0.0134* | +0.0098 | +0.0137* | +0.0109* |
| interleave:revisitStopScale-low | +0.0172* | +0.0174* | +0.0135* | +0.0102* | +0.0137* | +0.0102* |
| interleave:revisitStopScale-high | +0.0177* | +0.0172* | +0.0142* | +0.0100 | +0.0140* | +0.0112* |
| interleave:slots-low | +0.0212* | +0.0183* | +0.0149* | +0.0091 | +0.0151* | +0.0116* |
| interleave:slots-high | +0.0168* | +0.0097 | +0.0133* | +0.0094 | +0.0135* | +0.0107* |
| interleave:priorRateMult-low | +0.0168* | +0.0180* | +0.0134* | +0.0102* | +0.0136* | +0.0105* |
| interleave:priorRateMult-high | +0.0168* | +0.0156* | +0.0134* | +0.0103* | +0.0138* | +0.0104* |
| interleave:priorRateMult-outer | +0.0168* | +0.0141* | +0.0134* | +0.0103* | +0.0137* | +0.0104* |
| interleave:price-corner | +0.0217* | +0.0184* | +0.0147* | +0.0092 | +0.0147* | +0.0114* |
| first:base | +0.0235* | +0.0174* | +0.0172* | +0.0111* | +0.0148* | +0.0095 |
| first:revisitSlotCost-low | +0.0221* | +0.0181* | +0.0180* | +0.0104* | +0.0144* | +0.0102* |
| first:revisitSlotCost-high | +0.0238* | +0.0178* | +0.0163* | +0.0116* | +0.0142* | +0.0079 |
| first:revisitStopScale-low | +0.0217* | +0.0194* | +0.0182* | +0.0099 | +0.0159* | +0.0126* |
| first:revisitStopScale-high | +0.0242* | +0.0149* | +0.0107* | +0.0119* | +0.0125* | +0.0031 |
| first:slots-low | +0.0241* | +0.0182* | +0.0145* | +0.0096 | +0.0133* | +0.0095 |
| first:slots-high | +0.0191* | +0.0155* | +0.0185* | +0.0123* | +0.0137* | +0.0120* |
| first:priorRateMult-low | +0.0235* | +0.0174* | +0.0172* | +0.0110* | +0.0148* | +0.0093 |
| first:priorRateMult-high | +0.0233* | +0.0159* | +0.0172* | +0.0111* | +0.0150* | +0.0095 |
| first:priorRateMult-outer | +0.0232* | +0.0140* | +0.0170* | +0.0108* | +0.0146* | +0.0095 |
| first:price-corner | +0.0194* | +0.0138* | +0.0078 | +0.0076 | +0.0083 | +0.0034 |
(* = win: lower 95% bound > 0 and Δ ≥ δ_min 0.01)

## O1 split (hidden-state references, review fixed): Δ_full, Δ_new, Δ_refresh and the interaction vs default-order
### interleave:base
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1117 [+0.1100, +0.1133] | +0.1108 [+0.1091, +0.1124] | +0.0307 [+0.0300, +0.0313] | -0.0297 [-0.0304, -0.0291] |
| single-subject-crammer | +0.0826 [+0.0814, +0.0839] | +0.0817 [+0.0804, +0.0829] | +0.0317 [+0.0308, +0.0326] | -0.0307 [-0.0316, -0.0298] |
| struggling-repeater | +0.0847 [+0.0833, +0.0860] | +0.0845 [+0.0832, +0.0859] | +0.0065 [+0.0059, +0.0070] | -0.0063 [-0.0069, -0.0058] |
| returning-expert | +0.1504 [+0.1494, +0.1515] | +0.1386 [+0.1375, +0.1397] | +0.1342 [+0.1332, +0.1352] | -0.1224 [-0.1235, -0.1213] |
| wanderer | +0.1060 [+0.1047, +0.1072] | +0.1046 [+0.1034, +0.1059] | +0.0437 [+0.0430, +0.0444] | -0.0424 [-0.0431, -0.0417] |
| lapsed-returner | +0.1069 [+0.1056, +0.1082] | +0.1055 [+0.1042, +0.1068] | +0.0434 [+0.0425, +0.0442] | -0.0419 [-0.0429, -0.0410] |

### interleave:priorRateMult-low
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1125 [+0.1108, +0.1141] | +0.1115 [+0.1099, +0.1132] | +0.0315 [+0.0308, +0.0322] | -0.0306 [-0.0313, -0.0299] |
| single-subject-crammer | +0.0835 [+0.0823, +0.0848] | +0.0826 [+0.0813, +0.0838] | +0.0327 [+0.0318, +0.0335] | -0.0317 [-0.0326, -0.0308] |
| struggling-repeater | +0.0850 [+0.0836, +0.0863] | +0.0848 [+0.0835, +0.0862] | +0.0073 [+0.0068, +0.0078] | -0.0072 [-0.0077, -0.0067] |
| returning-expert | +0.1520 [+0.1509, +0.1530] | +0.1400 [+0.1389, +0.1411] | +0.1358 [+0.1348, +0.1368] | -0.1238 [-0.1249, -0.1227] |
| wanderer | +0.1070 [+0.1057, +0.1082] | +0.1056 [+0.1044, +0.1069] | +0.0448 [+0.0440, +0.0455] | -0.0434 [-0.0441, -0.0427] |
| lapsed-returner | +0.1083 [+0.1070, +0.1096] | +0.1069 [+0.1056, +0.1082] | +0.0450 [+0.0441, +0.0459] | -0.0436 [-0.0445, -0.0427] |

### interleave:priorRateMult-high
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1077 [+0.1061, +0.1093] | +0.1070 [+0.1054, +0.1086] | +0.0223 [+0.0214, +0.0232] | -0.0215 [-0.0224, -0.0207] |
| single-subject-crammer | +0.0785 [+0.0773, +0.0798] | +0.0776 [+0.0764, +0.0789] | +0.0226 [+0.0216, +0.0236] | -0.0217 [-0.0228, -0.0207] |
| struggling-repeater | +0.0832 [+0.0819, +0.0846] | +0.0831 [+0.0818, +0.0844] | -0.0038 [-0.0045, -0.0032] | +0.0040 [+0.0033, +0.0047] |
| returning-expert | +0.1419 [+0.1409, +0.1430] | +0.1312 [+0.1301, +0.1323] | +0.1256 [+0.1247, +0.1266] | -0.1149 [-0.1160, -0.1139] |
| wanderer | +0.1011 [+0.0999, +0.1023] | +0.0999 [+0.0986, +0.1011] | +0.0334 [+0.0324, +0.0344] | -0.0322 [-0.0332, -0.0312] |
| lapsed-returner | +0.1006 [+0.0993, +0.1019] | +0.0993 [+0.0980, +0.1006] | +0.0205 [+0.0191, +0.0220] | -0.0192 [-0.0207, -0.0177] |

### interleave:priorRateMult-outer
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1044 [+0.1028, +0.1060] | +0.1038 [+0.1022, +0.1054] | +0.0107 [+0.0095, +0.0119] | -0.0101 [-0.0113, -0.0089] |
| single-subject-crammer | +0.0759 [+0.0747, +0.0772] | +0.0750 [+0.0737, +0.0763] | +0.0127 [+0.0116, +0.0138] | -0.0118 [-0.0130, -0.0107] |
| struggling-repeater | +0.0825 [+0.0812, +0.0839] | +0.0824 [+0.0811, +0.0838] | -0.0087 [-0.0094, -0.0081] | +0.0089 [+0.0082, +0.0095] |
| returning-expert | +0.1321 [+0.1311, +0.1331] | +0.1228 [+0.1218, +0.1239] | +0.1150 [+0.1140, +0.1160] | -0.1057 [-0.1068, -0.1046] |
| wanderer | +0.0973 [+0.0961, +0.0986] | +0.0962 [+0.0950, +0.0974] | +0.0222 [+0.0209, +0.0235] | -0.0210 [-0.0223, -0.0197] |
| lapsed-returner | +0.0969 [+0.0956, +0.0982] | +0.0956 [+0.0943, +0.0969] | +0.0116 [+0.0101, +0.0131] | -0.0103 [-0.0118, -0.0088] |

### first:base
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1587 [+0.1564, +0.1610] | +0.1571 [+0.1548, +0.1594] | +0.0484 [+0.0471, +0.0496] | -0.0468 [-0.0481, -0.0456] |
| single-subject-crammer | +0.1115 [+0.1096, +0.1135] | +0.1096 [+0.1077, +0.1115] | +0.0398 [+0.0385, +0.0411] | -0.0379 [-0.0393, -0.0365] |
| struggling-repeater | +0.1148 [+0.1127, +0.1170] | +0.1143 [+0.1121, +0.1164] | +0.0144 [+0.0135, +0.0152] | -0.0138 [-0.0147, -0.0129] |
| returning-expert | +0.1906 [+0.1890, +0.1922] | +0.1796 [+0.1781, +0.1812] | +0.1517 [+0.1502, +0.1532] | -0.1408 [-0.1423, -0.1392] |
| wanderer | +0.1390 [+0.1371, +0.1408] | +0.1357 [+0.1338, +0.1376] | +0.0582 [+0.0570, +0.0594] | -0.0550 [-0.0562, -0.0538] |
| lapsed-returner | +0.1237 [+0.1216, +0.1258] | +0.1191 [+0.1170, +0.1212] | +0.0495 [+0.0481, +0.0509] | -0.0449 [-0.0463, -0.0434] |

### first:priorRateMult-low
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1602 [+0.1579, +0.1625] | +0.1586 [+0.1563, +0.1609] | +0.0501 [+0.0488, +0.0513] | -0.0485 [-0.0497, -0.0472] |
| single-subject-crammer | +0.1128 [+0.1109, +0.1148] | +0.1108 [+0.1089, +0.1127] | +0.0412 [+0.0399, +0.0425] | -0.0392 [-0.0406, -0.0377] |
| struggling-repeater | +0.1154 [+0.1133, +0.1176] | +0.1148 [+0.1127, +0.1170] | +0.0154 [+0.0146, +0.0163] | -0.0148 [-0.0157, -0.0139] |
| returning-expert | +0.1932 [+0.1916, +0.1948] | +0.1819 [+0.1803, +0.1835] | +0.1543 [+0.1528, +0.1558] | -0.1431 [-0.1446, -0.1415] |
| wanderer | +0.1408 [+0.1389, +0.1427] | +0.1375 [+0.1356, +0.1394] | +0.0601 [+0.0589, +0.0614] | -0.0568 [-0.0580, -0.0555] |
| lapsed-returner | +0.1257 [+0.1236, +0.1278] | +0.1209 [+0.1188, +0.1231] | +0.0517 [+0.0503, +0.0531] | -0.0469 [-0.0484, -0.0455] |

### first:priorRateMult-high
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1508 [+0.1485, +0.1530] | +0.1495 [+0.1472, +0.1517] | +0.0373 [+0.0360, +0.0386] | -0.0360 [-0.0374, -0.0347] |
| single-subject-crammer | +0.1042 [+0.1023, +0.1062] | +0.1029 [+0.1010, +0.1048] | +0.0282 [+0.0268, +0.0296] | -0.0269 [-0.0284, -0.0254] |
| struggling-repeater | +0.1121 [+0.1099, +0.1142] | +0.1116 [+0.1095, +0.1138] | +0.0028 [+0.0017, +0.0039] | -0.0024 [-0.0035, -0.0012] |
| returning-expert | +0.1760 [+0.1745, +0.1776] | +0.1662 [+0.1647, +0.1678] | +0.1370 [+0.1356, +0.1385] | -0.1272 [-0.1287, -0.1258] |
| wanderer | +0.1296 [+0.1278, +0.1315] | +0.1269 [+0.1251, +0.1287] | +0.0454 [+0.0440, +0.0467] | -0.0426 [-0.0439, -0.0413] |
| lapsed-returner | +0.1139 [+0.1119, +0.1159] | +0.1100 [+0.1080, +0.1121] | +0.0324 [+0.0309, +0.0339] | -0.0285 [-0.0300, -0.0270] |

### first:priorRateMult-outer
| persona | Δ_full | Δ_new | Δ_refresh | interaction (full − new − refresh) |
|---|---|---|---|---|
| curious-newcomer | +0.1432 [+0.1409, +0.1454] | +0.1421 [+0.1399, +0.1444] | +0.0247 [+0.0232, +0.0261] | -0.0237 [-0.0251, -0.0222] |
| single-subject-crammer | +0.0978 [+0.0959, +0.0997] | +0.0968 [+0.0949, +0.0987] | +0.0162 [+0.0147, +0.0177] | -0.0152 [-0.0168, -0.0136] |
| struggling-repeater | +0.1101 [+0.1079, +0.1122] | +0.1097 [+0.1076, +0.1119] | -0.0024 [-0.0035, -0.0013] | +0.0027 [+0.0016, +0.0039] |
| returning-expert | +0.1585 [+0.1570, +0.1600] | +0.1503 [+0.1488, +0.1518] | +0.1190 [+0.1176, +0.1204] | -0.1108 [-0.1122, -0.1093] |
| wanderer | +0.1210 [+0.1192, +0.1228] | +0.1188 [+0.1170, +0.1205] | +0.0331 [+0.0317, +0.0345] | -0.0309 [-0.0322, -0.0295] |
| lapsed-returner | +0.1065 [+0.1045, +0.1084] | +0.1036 [+0.1016, +0.1056] | +0.0233 [+0.0218, +0.0248] | -0.0205 [-0.0220, -0.0189] |

### O1 mean Δ, every other cell (full / new / refresh / interaction)
| cell | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| interleave:forgetScale-low | +0.109 / +0.108 / +0.046 / -0.045 | +0.094 / +0.092 / +0.051 / -0.050 | +0.084 / +0.084 / +0.017 / -0.016 | +0.190 / +0.173 / +0.174 / -0.157 | +0.120 / +0.119 / +0.066 / -0.064 | +0.126 / +0.123 / +0.072 / -0.070 |
| interleave:forgetScale-high | +0.090 / +0.089 / -0.016 / +0.017 | +0.047 / +0.047 / -0.007 / +0.007 | +0.052 / +0.052 / -0.006 / +0.006 | +0.079 / +0.075 / +0.053 / -0.049 | +0.064 / +0.063 / -0.019 / +0.019 | +0.056 / +0.056 / -0.022 / +0.023 |
| interleave:forgetShape-low | +0.112 / +0.111 / +0.032 / -0.032 | +0.084 / +0.083 / +0.034 / -0.033 | +0.085 / +0.085 / +0.009 / -0.008 | +0.154 / +0.142 / +0.138 / -0.126 | +0.108 / +0.106 / +0.047 / -0.045 | +0.109 / +0.108 / +0.047 / -0.046 |
| interleave:forgetShape-high | +0.104 / +0.103 / +0.002 / -0.001 | +0.066 / +0.065 / +0.002 / -0.002 | +0.072 / +0.072 / -0.008 / +0.008 | +0.116 / +0.108 / +0.096 / -0.087 | +0.087 / +0.087 / +0.007 / -0.007 | +0.083 / +0.082 / -0.009 / +0.009 |
| interleave:kSpread-low | +0.078 / +0.078 / +0.032 / -0.031 | +0.061 / +0.060 / +0.034 / -0.033 | +0.052 / +0.051 / +0.010 / -0.010 | +0.147 / +0.134 / +0.136 / -0.122 | +0.082 / +0.081 / +0.046 / -0.044 | +0.080 / +0.079 / +0.046 / -0.045 |
| interleave:kSpread-high | +0.159 / +0.158 / -0.003 / +0.004 | +0.114 / +0.113 / +0.005 / -0.004 | +0.130 / +0.130 / -0.014 / +0.015 | +0.155 / +0.147 / +0.116 / -0.107 | +0.140 / +0.139 / +0.004 / -0.003 | +0.143 / +0.142 / -0.013 / +0.015 |
| interleave:revisitStrengthen-low | +0.111 / +0.110 / +0.031 / -0.030 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.084 / +0.007 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.043 | +0.107 / +0.106 / +0.044 / -0.042 |
| interleave:revisitStrengthen-high | +0.113 / +0.112 / +0.030 / -0.029 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.085 / +0.007 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:relearn-low | +0.112 / +0.111 / +0.030 / -0.029 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.084 / +0.006 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:relearn-high | +0.112 / +0.111 / +0.031 / -0.030 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.085 / +0.007 / -0.006 | +0.150 / +0.139 / +0.134 / -0.123 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:priorKnowledgeMean-low | +0.090 / +0.089 / +0.004 / -0.004 | +0.070 / +0.070 / +0.015 / -0.015 | +0.080 / +0.080 / +0.001 / -0.001 | +0.126 / +0.122 / +0.093 / -0.089 | +0.079 / +0.078 / +0.009 / -0.009 | +0.085 / +0.085 / +0.016 / -0.015 |
| interleave:priorKnowledgeMean-high | +0.171 / +0.165 / +0.107 / -0.101 | +0.118 / +0.114 / +0.083 / -0.079 | +0.117 / +0.115 / +0.049 / -0.047 | +0.097 / +0.091 / +0.096 / -0.090 | +0.145 / +0.139 / +0.104 / -0.098 | +0.136 / +0.129 / +0.091 / -0.084 |
| interleave:learnRate-low | +0.073 / +0.073 / +0.017 / -0.017 | +0.046 / +0.046 / +0.016 / -0.015 | +0.048 / +0.048 / +0.003 / -0.003 | +0.085 / +0.079 / +0.076 / -0.069 | +0.060 / +0.059 / +0.023 / -0.022 | +0.061 / +0.060 / +0.023 / -0.022 |
| interleave:learnRate-high | +0.145 / +0.144 / +0.042 / -0.041 | +0.114 / +0.112 / +0.046 / -0.045 | +0.114 / +0.114 / +0.011 / -0.011 | +0.205 / +0.189 / +0.184 / -0.167 | +0.143 / +0.141 / +0.062 / -0.060 | +0.145 / +0.143 / +0.061 / -0.058 |
| interleave:prereqPenalty-low | +0.120 / +0.119 / +0.033 / -0.032 | +0.089 / +0.089 / +0.034 / -0.033 | +0.093 / +0.093 / +0.007 / -0.007 | +0.155 / +0.143 / +0.139 / -0.126 | +0.113 / +0.112 / +0.047 / -0.046 | +0.114 / +0.112 / +0.047 / -0.045 |
| interleave:prereqPenalty-high | +0.132 / +0.131 / +0.026 / -0.025 | +0.093 / +0.093 / +0.027 / -0.026 | +0.096 / +0.095 / +0.004 / -0.004 | +0.154 / +0.143 / +0.126 / -0.115 | +0.121 / +0.120 / +0.037 / -0.036 | +0.115 / +0.114 / +0.037 / -0.036 |
| interleave:pullScale-low | +0.112 / +0.111 / +0.031 / -0.030 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.085 / +0.006 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:pullScale-high | +0.112 / +0.111 / +0.031 / -0.030 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.085 / +0.006 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:revisitSlotCost-low | +0.112 / +0.111 / +0.031 / -0.030 | +0.083 / +0.082 / +0.032 / -0.031 | +0.085 / +0.085 / +0.006 / -0.006 | +0.150 / +0.139 / +0.134 / -0.122 | +0.106 / +0.105 / +0.044 / -0.042 | +0.107 / +0.106 / +0.043 / -0.042 |
| interleave:revisitSlotCost-high | +0.115 / +0.113 / +0.030 / -0.029 | +0.085 / +0.084 / +0.030 / -0.029 | +0.087 / +0.087 / +0.007 / -0.007 | +0.156 / +0.146 / +0.132 / -0.122 | +0.108 / +0.106 / +0.042 / -0.041 | +0.109 / +0.107 / +0.043 / -0.041 |
| interleave:revisitStopScale-low | +0.110 / +0.109 / +0.031 / -0.030 | +0.082 / +0.081 / +0.032 / -0.031 | +0.083 / +0.083 / +0.007 / -0.007 | +0.149 / +0.137 / +0.134 / -0.122 | +0.105 / +0.104 / +0.044 / -0.043 | +0.106 / +0.104 / +0.044 / -0.043 |
| interleave:revisitStopScale-high | +0.116 / +0.115 / +0.031 / -0.030 | +0.084 / +0.083 / +0.031 / -0.030 | +0.089 / +0.089 / +0.007 / -0.006 | +0.153 / +0.142 / +0.133 / -0.122 | +0.108 / +0.106 / +0.042 / -0.041 | +0.109 / +0.107 / +0.042 / -0.040 |
| interleave:slots-low | +0.129 / +0.128 / +0.029 / -0.028 | +0.094 / +0.093 / +0.026 / -0.025 | +0.094 / +0.094 / +0.006 / -0.006 | +0.154 / +0.147 / +0.112 / -0.105 | +0.114 / +0.112 / +0.039 / -0.037 | +0.110 / +0.108 / +0.039 / -0.037 |
| interleave:slots-high | +0.098 / +0.097 / +0.033 / -0.032 | +0.059 / +0.059 / +0.028 / -0.028 | +0.077 / +0.077 / +0.008 / -0.008 | +0.065 / +0.062 / +0.063 / -0.060 | +0.094 / +0.093 / +0.048 / -0.047 | +0.102 / +0.101 / +0.046 / -0.045 |
| interleave:price-corner | +0.131 / +0.129 / +0.029 / -0.028 | +0.094 / +0.093 / +0.026 / -0.025 | +0.095 / +0.094 / +0.007 / -0.006 | +0.154 / +0.147 / +0.111 / -0.104 | +0.114 / +0.112 / +0.038 / -0.036 | +0.109 / +0.107 / +0.038 / -0.036 |
| first:revisitSlotCost-low | +0.155 / +0.153 / +0.048 / -0.047 | +0.109 / +0.108 / +0.041 / -0.040 | +0.115 / +0.114 / +0.014 / -0.014 | +0.190 / +0.179 / +0.155 / -0.144 | +0.138 / +0.135 / +0.058 / -0.055 | +0.125 / +0.121 / +0.050 / -0.046 |
| first:revisitSlotCost-high | +0.167 / +0.166 / +0.050 / -0.048 | +0.114 / +0.112 / +0.039 / -0.037 | +0.115 / +0.114 / +0.014 / -0.013 | +0.186 / +0.174 / +0.141 / -0.129 | +0.136 / +0.133 / +0.057 / -0.053 | +0.117 / +0.112 / +0.046 / -0.041 |
| first:revisitStopScale-low | +0.150 / +0.148 / +0.049 / -0.047 | +0.111 / +0.109 / +0.042 / -0.040 | +0.118 / +0.118 / +0.015 / -0.014 | +0.193 / +0.182 / +0.158 / -0.146 | +0.141 / +0.138 / +0.063 / -0.060 | +0.141 / +0.137 / +0.061 / -0.057 |
| first:revisitStopScale-high | +0.171 / +0.168 / +0.048 / -0.046 | +0.107 / +0.105 / +0.034 / -0.032 | +0.093 / +0.092 / +0.009 / -0.008 | +0.181 / +0.170 / +0.137 / -0.126 | +0.122 / +0.118 / +0.047 / -0.043 | +0.069 / +0.064 / +0.023 / -0.018 |
| first:slots-low | +0.161 / +0.159 / +0.044 / -0.042 | +0.104 / +0.101 / +0.030 / -0.027 | +0.107 / +0.106 / +0.011 / -0.010 | +0.157 / +0.146 / +0.109 / -0.099 | +0.123 / +0.120 / +0.044 / -0.040 | +0.111 / +0.107 / +0.038 / -0.034 |
| first:slots-high | +0.153 / +0.152 / +0.050 / -0.048 | +0.107 / +0.106 / +0.047 / -0.046 | +0.119 / +0.118 / +0.016 / -0.015 | +0.210 / +0.197 / +0.188 / -0.174 | +0.146 / +0.143 / +0.067 / -0.064 | +0.133 / +0.129 / +0.057 / -0.052 |
| first:price-corner | +0.166 / +0.163 / +0.043 / -0.040 | +0.091 / +0.088 / +0.025 / -0.022 | +0.079 / +0.077 / +0.006 / -0.004 | +0.128 / +0.116 / +0.084 / -0.072 | +0.098 / +0.093 / +0.032 / -0.028 | +0.070 / +0.064 / +0.021 / -0.015 |

## Refreshes taken vs skipped (F3 N11), per N7 cell, mean per episode
taken = picks whose concept was known (hidden) when picked; skipped = known-concept lessons passed over as the default order's next eligible lesson and never served later; "before" = taken refreshes whose concept a completed lesson shares (learned before this pick, in the episode or the pre-history; F3 N12); prior = the rest.
### interleave:base
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 8.54 | 0.00 | 7.67 | 0.87 | 70.48 | 29.30 | 113.61 | 0.6254 |
| default-order+fixed | single-subject-crammer | 15.21 | 0.00 | 12.94 | 2.28 | 74.65 | 33.36 | 134.64 | 0.5480 |
| default-order+fixed | struggling-repeater | 3.97 | 0.00 | 3.07 | 0.90 | 64.27 | 25.72 | 142.22 | 0.3995 |
| default-order+fixed | returning-expert | 45.79 | 0.00 | 42.57 | 3.22 | 49.85 | 35.88 | 132.12 | 1.1261 |
| default-order+fixed | wanderer | 15.83 | 0.00 | 14.46 | 1.37 | 63.94 | 29.99 | 138.01 | 0.7499 |
| default-order+fixed | lapsed-returner | 16.39 | 0.00 | 15.29 | 1.10 | 49.08 | 24.66 | 143.34 | 0.9093 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.12 | 0.00 | 0.00 | 79.02 | 29.30 | 113.57 | 0.7371 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.31 | 0.00 | 0.00 | 88.02 | 32.58 | 135.42 | 0.6306 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.07 | 0.00 | 0.00 | 67.89 | 25.58 | 142.37 | 0.4842 |
| oracle-order+fixed | returning-expert | 0.60 | 0.85 | 0.39 | 0.21 | 95.05 | 35.88 | 132.12 | 1.2765 |
| oracle-order+fixed | wanderer | 0.00 | 0.30 | 0.00 | 0.00 | 79.77 | 29.99 | 138.01 | 0.8558 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.34 | 0.00 | 0.00 | 65.00 | 24.46 | 143.54 | 1.0162 |
| oracle-new+fixed | curious-newcomer | 0.15 | 0.00 | 0.15 | 0.00 | 78.87 | 29.30 | 113.56 | 0.7362 |
| oracle-new+fixed | single-subject-crammer | 0.39 | 0.00 | 0.39 | 0.00 | 87.61 | 32.57 | 135.43 | 0.6297 |
| oracle-new+fixed | struggling-repeater | 0.07 | 0.00 | 0.07 | 0.00 | 67.83 | 25.58 | 142.36 | 0.4840 |
| oracle-new+fixed | returning-expert | 5.64 | 0.00 | 5.27 | 0.37 | 90.00 | 35.88 | 132.12 | 1.2647 |
| oracle-new+fixed | wanderer | 0.45 | 0.00 | 0.44 | 0.00 | 79.33 | 29.99 | 138.01 | 0.8545 |
| oracle-new+fixed | lapsed-returner | 0.52 | 0.00 | 0.52 | 0.00 | 64.49 | 24.46 | 143.54 | 1.0148 |
| oracle-refresh+fixed | curious-newcomer | 0.34 | 1.00 | 0.02 | 0.32 | 78.68 | 29.30 | 113.61 | 0.6561 |
| oracle-refresh+fixed | single-subject-crammer | 0.94 | 1.00 | 0.05 | 0.89 | 88.30 | 33.10 | 134.90 | 0.5797 |
| oracle-refresh+fixed | struggling-repeater | 1.92 | 0.95 | 0.24 | 1.68 | 66.38 | 25.75 | 142.20 | 0.4060 |
| oracle-refresh+fixed | returning-expert | 0.63 | 1.00 | 0.37 | 0.26 | 95.01 | 35.88 | 132.12 | 1.2603 |
| oracle-refresh+fixed | wanderer | 0.59 | 1.00 | 0.01 | 0.57 | 79.19 | 29.99 | 138.01 | 0.7936 |
| oracle-refresh+fixed | lapsed-returner | 1.24 | 1.00 | 0.12 | 1.12 | 64.19 | 24.65 | 143.35 | 0.9527 |
| reachable+fixed | curious-newcomer | 7.77 | 0.10 | 7.77 | 0.00 | 71.26 | 29.30 | 113.57 | 0.6422 |
| reachable+fixed | single-subject-crammer | 8.16 | 0.20 | 8.16 | 0.00 | 79.42 | 32.39 | 135.61 | 0.5655 |
| reachable+fixed | struggling-repeater | 3.10 | 0.04 | 3.10 | 0.00 | 65.39 | 25.82 | 142.12 | 0.4129 |
| reachable+fixed | returning-expert | 43.98 | 0.44 | 43.73 | 0.25 | 51.67 | 35.88 | 132.12 | 1.1363 |
| reachable+fixed | wanderer | 14.68 | 0.19 | 14.68 | 0.00 | 65.09 | 29.99 | 138.01 | 0.7635 |
| reachable+fixed | lapsed-returner | 15.39 | 0.22 | 15.39 | 0.00 | 49.96 | 24.60 | 143.40 | 0.9199 |

### interleave:priorRateMult-low
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 8.54 | 0.00 | 7.67 | 0.87 | 70.48 | 29.30 | 113.60 | 0.6377 |
| default-order+fixed | single-subject-crammer | 15.21 | 0.00 | 12.94 | 2.28 | 74.65 | 33.36 | 134.64 | 0.5590 |
| default-order+fixed | struggling-repeater | 3.97 | 0.00 | 3.07 | 0.90 | 64.27 | 25.72 | 142.22 | 0.4067 |
| default-order+fixed | returning-expert | 45.80 | 0.00 | 42.57 | 3.23 | 49.85 | 35.88 | 132.12 | 1.1486 |
| default-order+fixed | wanderer | 15.83 | 0.00 | 14.46 | 1.37 | 63.94 | 29.99 | 138.01 | 0.7679 |
| default-order+fixed | lapsed-returner | 16.39 | 0.00 | 15.29 | 1.10 | 49.08 | 24.66 | 143.34 | 0.9407 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.12 | 0.00 | 0.00 | 79.02 | 29.30 | 113.57 | 0.7502 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.31 | 0.00 | 0.00 | 88.03 | 32.58 | 135.42 | 0.6426 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.07 | 0.00 | 0.00 | 67.89 | 25.58 | 142.37 | 0.4917 |
| oracle-order+fixed | returning-expert | 0.60 | 0.85 | 0.36 | 0.23 | 95.05 | 35.88 | 132.12 | 1.3006 |
| oracle-order+fixed | wanderer | 0.00 | 0.30 | 0.00 | 0.00 | 79.77 | 29.99 | 138.01 | 0.8749 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.34 | 0.00 | 0.00 | 65.00 | 24.46 | 143.54 | 1.0490 |
| oracle-new+fixed | curious-newcomer | 0.15 | 0.00 | 0.15 | 0.00 | 78.87 | 29.30 | 113.56 | 0.7492 |
| oracle-new+fixed | single-subject-crammer | 0.39 | 0.00 | 0.39 | 0.00 | 87.62 | 32.57 | 135.43 | 0.6416 |
| oracle-new+fixed | struggling-repeater | 0.07 | 0.00 | 0.07 | 0.00 | 67.83 | 25.58 | 142.36 | 0.4916 |
| oracle-new+fixed | returning-expert | 5.64 | 0.00 | 5.27 | 0.37 | 90.01 | 35.88 | 132.12 | 1.2886 |
| oracle-new+fixed | wanderer | 0.45 | 0.00 | 0.44 | 0.00 | 79.33 | 29.99 | 138.01 | 0.8736 |
| oracle-new+fixed | lapsed-returner | 0.52 | 0.00 | 0.52 | 0.00 | 64.49 | 24.46 | 143.54 | 1.0476 |
| oracle-refresh+fixed | curious-newcomer | 0.32 | 1.00 | 0.00 | 0.32 | 78.70 | 29.30 | 113.61 | 0.6692 |
| oracle-refresh+fixed | single-subject-crammer | 0.89 | 1.00 | 0.00 | 0.89 | 88.34 | 33.10 | 134.90 | 0.5917 |
| oracle-refresh+fixed | struggling-repeater | 1.69 | 0.96 | 0.01 | 1.68 | 66.61 | 25.74 | 142.20 | 0.4140 |
| oracle-refresh+fixed | returning-expert | 0.63 | 1.00 | 0.36 | 0.27 | 95.01 | 35.88 | 132.12 | 1.2844 |
| oracle-refresh+fixed | wanderer | 0.57 | 1.00 | 0.00 | 0.57 | 79.20 | 29.99 | 138.01 | 0.8127 |
| oracle-refresh+fixed | lapsed-returner | 1.13 | 1.00 | 0.02 | 1.11 | 64.29 | 24.65 | 143.35 | 0.9857 |
| reachable+fixed | curious-newcomer | 7.77 | 0.10 | 7.77 | 0.00 | 71.25 | 29.30 | 113.57 | 0.6545 |
| reachable+fixed | single-subject-crammer | 8.17 | 0.20 | 8.17 | 0.00 | 79.41 | 32.39 | 135.61 | 0.5770 |
| reachable+fixed | struggling-repeater | 3.10 | 0.04 | 3.10 | 0.00 | 65.39 | 25.83 | 142.12 | 0.4201 |
| reachable+fixed | returning-expert | 44.00 | 0.44 | 43.69 | 0.30 | 51.65 | 35.88 | 132.12 | 1.1588 |
| reachable+fixed | wanderer | 14.68 | 0.19 | 14.68 | 0.00 | 65.10 | 29.99 | 138.01 | 0.7815 |
| reachable+fixed | lapsed-returner | 15.38 | 0.22 | 15.37 | 0.00 | 49.95 | 24.59 | 143.41 | 0.9512 |

### interleave:priorRateMult-high
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 8.54 | 0.00 | 7.67 | 0.87 | 70.48 | 29.30 | 113.61 | 0.5560 |
| default-order+fixed | single-subject-crammer | 15.21 | 0.00 | 12.94 | 2.28 | 74.66 | 33.37 | 134.63 | 0.4857 |
| default-order+fixed | struggling-repeater | 3.97 | 0.00 | 3.07 | 0.90 | 64.27 | 25.72 | 142.22 | 0.3608 |
| default-order+fixed | returning-expert | 45.79 | 0.00 | 42.57 | 3.22 | 49.85 | 35.88 | 132.12 | 0.9915 |
| default-order+fixed | wanderer | 15.83 | 0.00 | 14.46 | 1.37 | 63.94 | 29.99 | 138.01 | 0.6472 |
| default-order+fixed | lapsed-returner | 16.38 | 0.00 | 15.28 | 1.10 | 49.07 | 24.65 | 143.35 | 0.7364 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.12 | 0.00 | 0.00 | 79.02 | 29.30 | 113.57 | 0.6637 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.31 | 0.00 | 0.00 | 88.03 | 32.58 | 135.42 | 0.5642 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.07 | 0.00 | 0.00 | 67.88 | 25.57 | 142.37 | 0.4440 |
| oracle-order+fixed | returning-expert | 0.60 | 0.85 | 0.57 | 0.03 | 95.05 | 35.88 | 132.12 | 1.1335 |
| oracle-order+fixed | wanderer | 0.00 | 0.30 | 0.00 | 0.00 | 79.77 | 29.99 | 138.01 | 0.7483 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.34 | 0.00 | 0.00 | 64.99 | 24.46 | 143.54 | 0.8370 |
| oracle-new+fixed | curious-newcomer | 0.15 | 0.00 | 0.15 | 0.00 | 78.87 | 29.30 | 113.56 | 0.6629 |
| oracle-new+fixed | single-subject-crammer | 0.39 | 0.00 | 0.39 | 0.00 | 87.62 | 32.57 | 135.43 | 0.5633 |
| oracle-new+fixed | struggling-repeater | 0.07 | 0.00 | 0.07 | 0.00 | 67.83 | 25.58 | 142.37 | 0.4439 |
| oracle-new+fixed | returning-expert | 5.64 | 0.00 | 5.27 | 0.37 | 90.01 | 35.88 | 132.12 | 1.1228 |
| oracle-new+fixed | wanderer | 0.45 | 0.00 | 0.45 | 0.00 | 79.33 | 29.99 | 138.01 | 0.7470 |
| oracle-new+fixed | lapsed-returner | 0.52 | 0.00 | 0.52 | 0.00 | 64.48 | 24.46 | 143.54 | 0.8357 |
| oracle-refresh+fixed | curious-newcomer | 1.94 | 0.98 | 1.60 | 0.34 | 77.08 | 29.30 | 113.61 | 0.5783 |
| oracle-refresh+fixed | single-subject-crammer | 3.89 | 0.98 | 2.97 | 0.92 | 85.48 | 33.15 | 134.85 | 0.5083 |
| oracle-refresh+fixed | struggling-repeater | 6.45 | 0.70 | 4.72 | 1.73 | 61.82 | 25.73 | 142.21 | 0.3569 |
| oracle-refresh+fixed | returning-expert | 0.65 | 1.00 | 0.48 | 0.17 | 95.00 | 35.88 | 132.12 | 1.1172 |
| oracle-refresh+fixed | wanderer | 2.94 | 0.99 | 2.34 | 0.60 | 76.83 | 29.99 | 138.01 | 0.6806 |
| oracle-refresh+fixed | lapsed-returner | 9.09 | 0.98 | 7.93 | 1.16 | 56.28 | 24.63 | 143.37 | 0.7569 |
| reachable+fixed | curious-newcomer | 7.77 | 0.10 | 7.77 | 0.00 | 71.25 | 29.30 | 113.57 | 0.5728 |
| reachable+fixed | single-subject-crammer | 8.18 | 0.20 | 8.18 | 0.00 | 79.42 | 32.39 | 135.61 | 0.5012 |
| reachable+fixed | struggling-repeater | 3.10 | 0.04 | 3.10 | 0.00 | 65.38 | 25.82 | 142.12 | 0.3742 |
| reachable+fixed | returning-expert | 43.91 | 0.44 | 43.81 | 0.09 | 51.74 | 35.88 | 132.12 | 1.0018 |
| reachable+fixed | wanderer | 14.70 | 0.19 | 14.70 | 0.00 | 65.08 | 29.99 | 138.01 | 0.6610 |
| reachable+fixed | lapsed-returner | 15.38 | 0.22 | 15.38 | 0.00 | 49.95 | 24.60 | 143.40 | 0.7467 |

### interleave:priorRateMult-outer
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 8.54 | 0.00 | 7.67 | 0.87 | 70.48 | 29.30 | 113.62 | 0.4575 |
| default-order+fixed | single-subject-crammer | 15.21 | 0.00 | 12.94 | 2.27 | 74.63 | 33.36 | 134.64 | 0.3978 |
| default-order+fixed | struggling-repeater | 3.97 | 0.00 | 3.07 | 0.90 | 64.26 | 25.72 | 142.22 | 0.3128 |
| default-order+fixed | returning-expert | 45.79 | 0.00 | 42.57 | 3.22 | 49.85 | 35.88 | 132.12 | 0.7705 |
| default-order+fixed | wanderer | 15.83 | 0.00 | 14.46 | 1.37 | 63.94 | 29.99 | 138.01 | 0.5007 |
| default-order+fixed | lapsed-returner | 16.39 | 0.00 | 15.29 | 1.10 | 49.08 | 24.66 | 143.34 | 0.5082 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.12 | 0.00 | 0.00 | 79.02 | 29.30 | 113.57 | 0.5619 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.31 | 0.00 | 0.00 | 88.03 | 32.58 | 135.42 | 0.4737 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.07 | 0.00 | 0.00 | 67.88 | 25.57 | 142.37 | 0.3954 |
| oracle-order+fixed | returning-expert | 0.61 | 0.85 | 0.60 | 0.01 | 95.04 | 35.88 | 132.12 | 0.9027 |
| oracle-order+fixed | wanderer | 0.00 | 0.30 | 0.00 | 0.00 | 79.77 | 29.99 | 138.01 | 0.5980 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.33 | 0.00 | 0.00 | 65.01 | 24.46 | 143.54 | 0.6051 |
| oracle-new+fixed | curious-newcomer | 0.15 | 0.00 | 0.15 | 0.00 | 78.87 | 29.30 | 113.57 | 0.5613 |
| oracle-new+fixed | single-subject-crammer | 0.39 | 0.00 | 0.39 | 0.00 | 87.60 | 32.57 | 135.43 | 0.4728 |
| oracle-new+fixed | struggling-repeater | 0.07 | 0.00 | 0.07 | 0.00 | 67.82 | 25.58 | 142.37 | 0.3952 |
| oracle-new+fixed | returning-expert | 5.64 | 0.00 | 5.27 | 0.37 | 90.01 | 35.88 | 132.12 | 0.8934 |
| oracle-new+fixed | wanderer | 0.45 | 0.00 | 0.45 | 0.00 | 79.33 | 29.99 | 138.01 | 0.5968 |
| oracle-new+fixed | lapsed-returner | 0.52 | 0.00 | 0.52 | 0.00 | 64.49 | 24.46 | 143.54 | 0.6039 |
| oracle-refresh+fixed | curious-newcomer | 5.69 | 0.91 | 5.40 | 0.29 | 73.33 | 29.30 | 113.62 | 0.4681 |
| oracle-refresh+fixed | single-subject-crammer | 9.24 | 0.86 | 8.40 | 0.84 | 80.33 | 33.24 | 134.76 | 0.4105 |
| oracle-refresh+fixed | struggling-repeater | 9.38 | 0.46 | 7.73 | 1.66 | 58.87 | 25.73 | 142.21 | 0.3041 |
| oracle-refresh+fixed | returning-expert | 1.02 | 1.00 | 0.96 | 0.05 | 94.63 | 35.88 | 132.12 | 0.8855 |
| oracle-refresh+fixed | wanderer | 7.15 | 0.94 | 6.71 | 0.45 | 72.62 | 29.99 | 138.01 | 0.5228 |
| oracle-refresh+fixed | lapsed-returner | 13.47 | 0.95 | 12.87 | 0.61 | 51.89 | 24.63 | 143.37 | 0.5198 |
| reachable+fixed | curious-newcomer | 7.77 | 0.10 | 7.77 | 0.00 | 71.25 | 29.30 | 113.58 | 0.4742 |
| reachable+fixed | single-subject-crammer | 8.16 | 0.20 | 8.16 | 0.00 | 79.39 | 32.37 | 135.63 | 0.4119 |
| reachable+fixed | struggling-repeater | 3.11 | 0.04 | 3.11 | 0.00 | 65.36 | 25.82 | 142.13 | 0.3262 |
| reachable+fixed | returning-expert | 43.90 | 0.44 | 43.86 | 0.04 | 51.74 | 35.88 | 132.12 | 0.7808 |
| reachable+fixed | wanderer | 14.72 | 0.18 | 14.72 | 0.00 | 65.06 | 29.99 | 138.01 | 0.5144 |
| reachable+fixed | lapsed-returner | 15.40 | 0.22 | 15.40 | 0.00 | 49.93 | 24.59 | 143.41 | 0.5187 |

### first:base
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 5.29 | 0.00 | 4.53 | 0.77 | 41.63 | 72.58 | 18.64 | 0.9949 |
| default-order+fixed | single-subject-crammer | 8.68 | 0.00 | 7.85 | 0.83 | 45.30 | 98.35 | 13.39 | 0.8057 |
| default-order+fixed | struggling-repeater | 2.15 | 0.00 | 1.34 | 0.82 | 28.48 | 73.23 | 29.14 | 0.7056 |
| default-order+fixed | returning-expert | 28.28 | 0.00 | 27.05 | 1.23 | 31.40 | 100.22 | 11.73 | 1.5692 |
| default-order+fixed | wanderer | 8.47 | 0.00 | 7.49 | 0.98 | 32.90 | 84.79 | 22.71 | 1.2182 |
| default-order+fixed | lapsed-returner | 6.66 | 0.00 | 5.80 | 0.86 | 18.85 | 73.58 | 33.82 | 1.6557 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.10 | 0.00 | 0.00 | 47.10 | 72.25 | 18.50 | 1.1536 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.28 | 0.00 | 0.00 | 52.61 | 97.96 | 13.71 | 0.9173 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.06 | 0.00 | 0.00 | 30.49 | 72.80 | 29.13 | 0.8205 |
| oracle-order+fixed | returning-expert | 0.00 | 0.63 | 0.00 | 0.00 | 59.68 | 100.23 | 11.73 | 1.7598 |
| oracle-order+fixed | wanderer | 0.00 | 0.23 | 0.00 | 0.00 | 41.40 | 84.72 | 22.70 | 1.3571 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.28 | 0.00 | 0.00 | 25.28 | 73.45 | 33.88 | 1.7794 |
| oracle-new+fixed | curious-newcomer | 0.12 | 0.00 | 0.12 | 0.00 | 46.99 | 72.24 | 18.49 | 1.1520 |
| oracle-new+fixed | single-subject-crammer | 0.32 | 0.00 | 0.32 | 0.00 | 52.37 | 98.01 | 13.66 | 0.9154 |
| oracle-new+fixed | struggling-repeater | 0.06 | 0.00 | 0.06 | 0.00 | 30.43 | 72.80 | 29.13 | 0.8199 |
| oracle-new+fixed | returning-expert | 1.82 | 0.00 | 1.79 | 0.03 | 57.86 | 100.23 | 11.73 | 1.7488 |
| oracle-new+fixed | wanderer | 0.32 | 0.00 | 0.32 | 0.00 | 41.10 | 84.70 | 22.69 | 1.3539 |
| oracle-new+fixed | lapsed-returner | 0.38 | 0.00 | 0.38 | 0.00 | 24.93 | 73.45 | 33.86 | 1.7748 |
| oracle-refresh+fixed | curious-newcomer | 0.02 | 1.00 | 0.01 | 0.01 | 46.79 | 72.79 | 18.72 | 1.0433 |
| oracle-refresh+fixed | single-subject-crammer | 0.09 | 1.00 | 0.03 | 0.06 | 53.19 | 98.18 | 13.57 | 0.8456 |
| oracle-refresh+fixed | struggling-repeater | 0.16 | 0.89 | 0.08 | 0.08 | 30.44 | 73.28 | 29.15 | 0.7200 |
| oracle-refresh+fixed | returning-expert | 0.00 | 1.00 | 0.00 | 0.00 | 59.68 | 100.23 | 11.73 | 1.7209 |
| oracle-refresh+fixed | wanderer | 0.02 | 1.00 | 0.01 | 0.01 | 41.29 | 84.89 | 22.74 | 1.2764 |
| oracle-refresh+fixed | lapsed-returner | 0.09 | 0.99 | 0.04 | 0.05 | 25.40 | 73.66 | 33.92 | 1.7052 |
| reachable+fixed | curious-newcomer | 4.58 | 0.09 | 4.58 | 0.00 | 42.45 | 72.38 | 18.56 | 1.0184 |
| reachable+fixed | single-subject-crammer | 6.04 | 0.20 | 6.04 | 0.00 | 46.73 | 98.05 | 13.60 | 0.8231 |
| reachable+fixed | struggling-repeater | 1.39 | 0.04 | 1.39 | 0.00 | 29.40 | 73.28 | 29.06 | 0.7229 |
| reachable+fixed | returning-expert | 27.46 | 0.44 | 27.46 | 0.00 | 32.22 | 100.22 | 11.73 | 1.5803 |
| reachable+fixed | wanderer | 7.62 | 0.19 | 7.62 | 0.00 | 33.78 | 84.73 | 22.71 | 1.2330 |
| reachable+fixed | lapsed-returner | 6.06 | 0.24 | 6.06 | 0.00 | 19.42 | 73.54 | 33.80 | 1.6652 |

### first:priorRateMult-low
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 5.29 | 0.00 | 4.53 | 0.77 | 41.64 | 72.57 | 18.63 | 1.0149 |
| default-order+fixed | single-subject-crammer | 8.68 | 0.00 | 7.85 | 0.83 | 45.30 | 98.35 | 13.39 | 0.8212 |
| default-order+fixed | struggling-repeater | 2.15 | 0.00 | 1.34 | 0.81 | 28.48 | 73.23 | 29.14 | 0.7190 |
| default-order+fixed | returning-expert | 28.28 | 0.00 | 27.05 | 1.23 | 31.40 | 100.22 | 11.73 | 1.5996 |
| default-order+fixed | wanderer | 8.47 | 0.00 | 7.49 | 0.98 | 32.90 | 84.78 | 22.71 | 1.2478 |
| default-order+fixed | lapsed-returner | 6.66 | 0.00 | 5.80 | 0.86 | 18.85 | 73.57 | 33.81 | 1.7133 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.10 | 0.00 | 0.00 | 47.10 | 72.25 | 18.50 | 1.1752 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.28 | 0.00 | 0.00 | 52.60 | 97.95 | 13.71 | 0.9340 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.06 | 0.00 | 0.00 | 30.49 | 72.80 | 29.13 | 0.8345 |
| oracle-order+fixed | returning-expert | 0.00 | 0.63 | 0.00 | 0.00 | 59.68 | 100.23 | 11.73 | 1.7928 |
| oracle-order+fixed | wanderer | 0.00 | 0.23 | 0.00 | 0.00 | 41.41 | 84.72 | 22.70 | 1.3886 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.28 | 0.00 | 0.00 | 25.29 | 73.45 | 33.87 | 1.8390 |
| oracle-new+fixed | curious-newcomer | 0.12 | 0.00 | 0.12 | 0.00 | 46.99 | 72.23 | 18.49 | 1.1736 |
| oracle-new+fixed | single-subject-crammer | 0.32 | 0.00 | 0.32 | 0.00 | 52.36 | 97.99 | 13.67 | 0.9320 |
| oracle-new+fixed | struggling-repeater | 0.06 | 0.00 | 0.06 | 0.00 | 30.43 | 72.80 | 29.13 | 0.8339 |
| oracle-new+fixed | returning-expert | 1.82 | 0.00 | 1.79 | 0.03 | 57.86 | 100.23 | 11.73 | 1.7816 |
| oracle-new+fixed | wanderer | 0.32 | 0.00 | 0.32 | 0.00 | 41.10 | 84.70 | 22.69 | 1.3853 |
| oracle-new+fixed | lapsed-returner | 0.38 | 0.00 | 0.38 | 0.00 | 24.93 | 73.44 | 33.85 | 1.8342 |
| oracle-refresh+fixed | curious-newcomer | 0.01 | 1.00 | 0.00 | 0.01 | 46.80 | 72.79 | 18.72 | 1.0650 |
| oracle-refresh+fixed | single-subject-crammer | 0.06 | 1.00 | 0.00 | 0.06 | 53.20 | 98.17 | 13.57 | 0.8624 |
| oracle-refresh+fixed | struggling-repeater | 0.07 | 0.89 | 0.00 | 0.07 | 30.53 | 73.28 | 29.15 | 0.7345 |
| oracle-refresh+fixed | returning-expert | 0.00 | 1.00 | 0.00 | 0.00 | 59.68 | 100.23 | 11.73 | 1.7540 |
| oracle-refresh+fixed | wanderer | 0.01 | 1.00 | 0.00 | 0.01 | 41.29 | 84.89 | 22.73 | 1.3080 |
| oracle-refresh+fixed | lapsed-returner | 0.05 | 0.99 | 0.00 | 0.05 | 25.45 | 73.66 | 33.92 | 1.7650 |
| reachable+fixed | curious-newcomer | 4.58 | 0.09 | 4.58 | 0.00 | 42.45 | 72.38 | 18.56 | 1.0384 |
| reachable+fixed | single-subject-crammer | 6.05 | 0.20 | 6.05 | 0.00 | 46.73 | 98.06 | 13.60 | 0.8386 |
| reachable+fixed | struggling-repeater | 1.39 | 0.04 | 1.39 | 0.00 | 29.40 | 73.27 | 29.05 | 0.7362 |
| reachable+fixed | returning-expert | 27.45 | 0.44 | 27.45 | 0.00 | 32.23 | 100.22 | 11.73 | 1.6106 |
| reachable+fixed | wanderer | 7.62 | 0.19 | 7.62 | 0.00 | 33.78 | 84.72 | 22.70 | 1.2627 |
| reachable+fixed | lapsed-returner | 6.05 | 0.24 | 6.05 | 0.00 | 19.42 | 73.53 | 33.80 | 1.7226 |

### first:priorRateMult-high
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 5.29 | 0.00 | 4.53 | 0.77 | 41.61 | 72.61 | 18.64 | 0.8815 |
| default-order+fixed | single-subject-crammer | 8.68 | 0.00 | 7.85 | 0.83 | 45.26 | 98.36 | 13.40 | 0.7200 |
| default-order+fixed | struggling-repeater | 2.15 | 0.00 | 1.34 | 0.81 | 28.49 | 73.25 | 29.15 | 0.6350 |
| default-order+fixed | returning-expert | 28.27 | 0.00 | 27.05 | 1.23 | 31.40 | 100.23 | 11.73 | 1.3869 |
| default-order+fixed | wanderer | 8.47 | 0.00 | 7.49 | 0.98 | 32.88 | 84.82 | 22.73 | 1.0501 |
| default-order+fixed | lapsed-returner | 6.65 | 0.00 | 5.78 | 0.86 | 18.82 | 73.66 | 33.87 | 1.3386 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.10 | 0.00 | 0.00 | 47.10 | 72.26 | 18.50 | 1.0322 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.28 | 0.00 | 0.00 | 52.57 | 97.95 | 13.73 | 0.8242 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.06 | 0.00 | 0.00 | 30.48 | 72.81 | 29.13 | 0.7470 |
| oracle-order+fixed | returning-expert | 0.00 | 0.63 | 0.00 | 0.00 | 59.68 | 100.23 | 11.73 | 1.5630 |
| oracle-order+fixed | wanderer | 0.00 | 0.23 | 0.00 | 0.00 | 41.39 | 84.74 | 22.71 | 1.1797 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.28 | 0.00 | 0.00 | 25.26 | 73.50 | 33.92 | 1.4525 |
| oracle-new+fixed | curious-newcomer | 0.12 | 0.00 | 0.12 | 0.00 | 46.98 | 72.24 | 18.49 | 1.0309 |
| oracle-new+fixed | single-subject-crammer | 0.32 | 0.00 | 0.32 | 0.00 | 52.36 | 98.01 | 13.67 | 0.8228 |
| oracle-new+fixed | struggling-repeater | 0.06 | 0.00 | 0.06 | 0.00 | 30.43 | 72.81 | 29.13 | 0.7466 |
| oracle-new+fixed | returning-expert | 1.82 | 0.00 | 1.79 | 0.03 | 57.86 | 100.23 | 11.73 | 1.5532 |
| oracle-new+fixed | wanderer | 0.32 | 0.00 | 0.32 | 0.00 | 41.09 | 84.72 | 22.71 | 1.1770 |
| oracle-new+fixed | lapsed-returner | 0.38 | 0.00 | 0.38 | 0.00 | 24.89 | 73.51 | 33.89 | 1.4487 |
| oracle-refresh+fixed | curious-newcomer | 0.70 | 0.99 | 0.70 | 0.00 | 46.11 | 72.79 | 18.72 | 0.9188 |
| oracle-refresh+fixed | single-subject-crammer | 1.80 | 0.99 | 1.76 | 0.04 | 51.51 | 98.21 | 13.55 | 0.7481 |
| oracle-refresh+fixed | struggling-repeater | 2.44 | 0.82 | 2.39 | 0.05 | 28.12 | 73.27 | 29.15 | 0.6378 |
| oracle-refresh+fixed | returning-expert | 0.04 | 1.00 | 0.04 | 0.00 | 59.64 | 100.23 | 11.73 | 1.5240 |
| oracle-refresh+fixed | wanderer | 1.01 | 0.99 | 1.00 | 0.01 | 40.29 | 84.91 | 22.75 | 1.0954 |
| oracle-refresh+fixed | lapsed-returner | 2.16 | 0.98 | 2.14 | 0.02 | 23.29 | 73.71 | 33.95 | 1.3710 |
| reachable+fixed | curious-newcomer | 4.58 | 0.09 | 4.58 | 0.00 | 42.43 | 72.42 | 18.58 | 0.9048 |
| reachable+fixed | single-subject-crammer | 6.01 | 0.20 | 6.01 | 0.00 | 46.74 | 98.05 | 13.63 | 0.7359 |
| reachable+fixed | struggling-repeater | 1.39 | 0.04 | 1.39 | 0.00 | 29.39 | 73.29 | 29.06 | 0.6521 |
| reachable+fixed | returning-expert | 27.43 | 0.45 | 27.43 | 0.00 | 32.25 | 100.22 | 11.73 | 1.3980 |
| reachable+fixed | wanderer | 7.64 | 0.19 | 7.64 | 0.00 | 33.75 | 84.76 | 22.73 | 1.0651 |
| reachable+fixed | lapsed-returner | 6.04 | 0.23 | 6.04 | 0.00 | 19.39 | 73.61 | 33.87 | 1.3481 |

### first:priorRateMult-outer
| arm | persona | taken | skipped | taken: prior | taken: before | new picks | revisits served | revisits unserved | R7 level |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 5.29 | 0.00 | 4.53 | 0.76 | 41.59 | 72.67 | 18.68 | 0.7204 |
| default-order+fixed | single-subject-crammer | 8.69 | 0.00 | 7.85 | 0.83 | 45.37 | 98.40 | 13.38 | 0.5971 |
| default-order+fixed | struggling-repeater | 2.15 | 0.00 | 1.33 | 0.81 | 28.48 | 73.30 | 29.15 | 0.5481 |
| default-order+fixed | returning-expert | 28.27 | 0.00 | 27.04 | 1.22 | 31.41 | 100.23 | 11.74 | 1.0863 |
| default-order+fixed | wanderer | 8.46 | 0.00 | 7.48 | 0.97 | 32.85 | 84.90 | 22.76 | 0.8110 |
| default-order+fixed | lapsed-returner | 6.62 | 0.00 | 5.76 | 0.86 | 18.77 | 73.78 | 34.01 | 0.9214 |
| oracle-order+fixed | curious-newcomer | 0.00 | 0.10 | 0.00 | 0.00 | 47.09 | 72.26 | 18.50 | 0.8636 |
| oracle-order+fixed | single-subject-crammer | 0.00 | 0.28 | 0.00 | 0.00 | 52.67 | 98.02 | 13.69 | 0.6949 |
| oracle-order+fixed | struggling-repeater | 0.00 | 0.06 | 0.00 | 0.00 | 30.48 | 72.84 | 29.14 | 0.6582 |
| oracle-order+fixed | returning-expert | 0.00 | 0.63 | 0.00 | 0.00 | 59.68 | 100.23 | 11.74 | 1.2448 |
| oracle-order+fixed | wanderer | 0.00 | 0.23 | 0.00 | 0.00 | 41.36 | 84.79 | 22.73 | 0.9320 |
| oracle-order+fixed | lapsed-returner | 0.00 | 0.28 | 0.00 | 0.00 | 25.20 | 73.61 | 34.01 | 1.0279 |
| oracle-new+fixed | curious-newcomer | 0.12 | 0.00 | 0.12 | 0.00 | 46.98 | 72.25 | 18.49 | 0.8626 |
| oracle-new+fixed | single-subject-crammer | 0.32 | 0.00 | 0.32 | 0.00 | 52.43 | 98.07 | 13.64 | 0.6939 |
| oracle-new+fixed | struggling-repeater | 0.06 | 0.00 | 0.06 | 0.00 | 30.42 | 72.84 | 29.14 | 0.6579 |
| oracle-new+fixed | returning-expert | 1.82 | 0.00 | 1.78 | 0.03 | 57.86 | 100.23 | 11.74 | 1.2366 |
| oracle-new+fixed | wanderer | 0.32 | 0.00 | 0.32 | 0.00 | 41.05 | 84.78 | 22.73 | 0.9298 |
| oracle-new+fixed | lapsed-returner | 0.38 | 0.00 | 0.38 | 0.00 | 24.84 | 73.64 | 33.99 | 1.0251 |
| oracle-refresh+fixed | curious-newcomer | 2.22 | 0.97 | 2.22 | 0.00 | 44.59 | 72.79 | 18.72 | 0.7451 |
| oracle-refresh+fixed | single-subject-crammer | 4.75 | 0.95 | 4.72 | 0.03 | 48.66 | 98.25 | 13.52 | 0.6133 |
| oracle-refresh+fixed | struggling-repeater | 4.14 | 0.75 | 4.09 | 0.05 | 26.42 | 73.28 | 29.17 | 0.5457 |
| oracle-refresh+fixed | returning-expert | 0.19 | 1.00 | 0.19 | 0.00 | 59.49 | 100.23 | 11.74 | 1.2053 |
| oracle-refresh+fixed | wanderer | 2.47 | 0.99 | 2.46 | 0.01 | 38.80 | 84.95 | 22.77 | 0.8441 |
| oracle-refresh+fixed | lapsed-returner | 2.99 | 0.97 | 2.97 | 0.02 | 22.35 | 73.82 | 34.03 | 0.9448 |
| reachable+fixed | curious-newcomer | 4.58 | 0.09 | 4.58 | 0.00 | 42.39 | 72.49 | 18.60 | 0.7436 |
| reachable+fixed | single-subject-crammer | 5.96 | 0.21 | 5.96 | 0.00 | 46.84 | 98.10 | 13.61 | 0.6111 |
| reachable+fixed | struggling-repeater | 1.39 | 0.04 | 1.39 | 0.00 | 29.37 | 73.32 | 29.09 | 0.5651 |
| reachable+fixed | returning-expert | 27.46 | 0.45 | 27.46 | 0.00 | 32.22 | 100.23 | 11.74 | 1.0971 |
| reachable+fixed | wanderer | 7.66 | 0.19 | 7.66 | 0.00 | 33.68 | 84.84 | 22.76 | 0.8256 |
| reachable+fixed | lapsed-returner | 6.02 | 0.24 | 6.02 | 0.00 | 19.30 | 73.73 | 34.01 | 0.9310 |

## Interleave rows and the revisits-first review rows (input for head-of-product and evaluation-steward; no rule reads them)
Δ R7 vs default-order + fixed per persona; review guardrails G1, NEW, LOAD reported.
### interleave:base
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0286 [-0.0295, -0.0277] HARM | +0.0616 [+0.0608, +0.0624] win |
| single-subject-crammer | -0.0284 [-0.0292, -0.0276] HARM | +0.0476 [+0.0467, +0.0485] win |
| struggling-repeater | -0.0211 [-0.0219, -0.0202] HARM | +0.0355 [+0.0347, +0.0362] win |
| returning-expert | -0.0202 [-0.0206, -0.0197] HARM | +0.0734 [+0.0728, +0.0741] win |
| wanderer | -0.0231 [-0.0238, -0.0224] HARM | +0.0591 [+0.0584, +0.0598] win |
| lapsed-returner | -0.0143 [-0.0152, -0.0135] HARM | +0.0435 [+0.0427, +0.0443] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:forgetScale-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0198 [-0.0210, -0.0187] HARM | +0.1051 [+0.1041, +0.1061] win |
| single-subject-crammer | -0.0229 [-0.0239, -0.0218] HARM | +0.0882 [+0.0870, +0.0894] win |
| struggling-repeater | -0.0078 [-0.0089, -0.0067] | +0.0812 [+0.0801, +0.0822] win |
| returning-expert | -0.0145 [-0.0151, -0.0140] HARM | +0.0997 [+0.0989, +0.1005] win |
| wanderer | -0.0132 [-0.0141, -0.0123] HARM | +0.1032 [+0.1023, +0.1041] win |
| lapsed-returner | -0.0014 [-0.0025, -0.0003] | +0.0858 [+0.0848, +0.0868] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:forgetScale-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0279 [-0.0284, -0.0273] HARM | +0.0108 [+0.0102, +0.0113] win |
| single-subject-crammer | -0.0238 [-0.0242, -0.0233] HARM | +0.0053 [+0.0048, +0.0058] |
| struggling-repeater | -0.0194 [-0.0199, -0.0189] HARM | -0.0015 [-0.0020, -0.0010] |
| returning-expert | -0.0229 [-0.0233, -0.0225] HARM | +0.0282 [+0.0277, +0.0286] win |
| wanderer | -0.0237 [-0.0242, -0.0232] HARM | +0.0096 [+0.0091, +0.0101] |
| lapsed-returner | -0.0165 [-0.0170, -0.0161] HARM | +0.0032 [+0.0027, +0.0037] |
| wins · guardrail fails | 0 · none | 2 · none |

### interleave:forgetShape-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0253 [-0.0262, -0.0244] HARM | +0.0669 [+0.0661, +0.0677] win |
| single-subject-crammer | -0.0254 [-0.0262, -0.0246] HARM | +0.0532 [+0.0523, +0.0541] win |
| struggling-repeater | -0.0167 [-0.0175, -0.0158] HARM | +0.0415 [+0.0407, +0.0423] win |
| returning-expert | -0.0178 [-0.0183, -0.0173] HARM | +0.0762 [+0.0756, +0.0769] win |
| wanderer | -0.0193 [-0.0200, -0.0186] HARM | +0.0653 [+0.0645, +0.0660] win |
| lapsed-returner | -0.0106 [-0.0114, -0.0097] HARM | +0.0491 [+0.0483, +0.0499] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:forgetShape-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0481 [-0.0489, -0.0473] HARM | +0.0227 [+0.0219, +0.0234] win |
| single-subject-crammer | -0.0422 [-0.0429, -0.0415] HARM | +0.0127 [+0.0119, +0.0135] win |
| struggling-repeater | -0.0394 [-0.0401, -0.0386] HARM | -0.0007 [-0.0014, -0.0000] |
| returning-expert | -0.0343 [-0.0348, -0.0338] HARM | +0.0498 [+0.0493, +0.0504] win |
| wanderer | -0.0418 [-0.0425, -0.0411] HARM | +0.0196 [+0.0189, +0.0202] win |
| lapsed-returner | -0.0307 [-0.0315, -0.0299] HARM | +0.0103 [+0.0096, +0.0110] win |
| wins · guardrail fails | 0 · none | 5 · none |

### interleave:kSpread-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0297 [-0.0305, -0.0288] HARM | +0.0618 [+0.0611, +0.0626] win |
| single-subject-crammer | -0.0297 [-0.0304, -0.0289] HARM | +0.0475 [+0.0466, +0.0484] win |
| struggling-repeater | -0.0230 [-0.0238, -0.0222] HARM | +0.0341 [+0.0333, +0.0348] win |
| returning-expert | -0.0205 [-0.0210, -0.0200] HARM | +0.0747 [+0.0740, +0.0753] win |
| wanderer | -0.0242 [-0.0249, -0.0235] HARM | +0.0596 [+0.0589, +0.0603] win |
| lapsed-returner | -0.0155 [-0.0163, -0.0147] HARM | +0.0438 [+0.0431, +0.0445] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:kSpread-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0256 [-0.0265, -0.0247] HARM | +0.0619 [+0.0610, +0.0627] win |
| single-subject-crammer | -0.0257 [-0.0265, -0.0249] HARM | +0.0485 [+0.0476, +0.0495] win |
| struggling-repeater | -0.0163 [-0.0172, -0.0155] HARM | +0.0398 [+0.0389, +0.0406] win |
| returning-expert | -0.0192 [-0.0197, -0.0188] HARM | +0.0699 [+0.0692, +0.0706] win |
| wanderer | -0.0202 [-0.0209, -0.0195] HARM | +0.0594 [+0.0586, +0.0601] win |
| lapsed-returner | -0.0114 [-0.0122, -0.0105] HARM | +0.0445 [+0.0436, +0.0453] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitStrengthen-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0368 [-0.0377, -0.0359] HARM | +0.0546 [+0.0538, +0.0554] win |
| single-subject-crammer | -0.0320 [-0.0328, -0.0312] HARM | +0.0442 [+0.0433, +0.0452] win |
| struggling-repeater | -0.0262 [-0.0271, -0.0254] HARM | +0.0305 [+0.0297, +0.0313] win |
| returning-expert | -0.0222 [-0.0227, -0.0217] HARM | +0.0731 [+0.0724, +0.0737] win |
| wanderer | -0.0272 [-0.0279, -0.0264] HARM | +0.0554 [+0.0547, +0.0562] win |
| lapsed-returner | -0.0180 [-0.0188, -0.0171] HARM | +0.0403 [+0.0395, +0.0411] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitStrengthen-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0242 [-0.0251, -0.0234] HARM | +0.0649 [+0.0641, +0.0656] win |
| single-subject-crammer | -0.0251 [-0.0259, -0.0243] HARM | +0.0506 [+0.0497, +0.0515] win |
| struggling-repeater | -0.0157 [-0.0165, -0.0149] HARM | +0.0405 [+0.0397, +0.0412] win |
| returning-expert | -0.0186 [-0.0190, -0.0181] HARM | +0.0733 [+0.0726, +0.0739] win |
| wanderer | -0.0195 [-0.0202, -0.0188] HARM | +0.0621 [+0.0613, +0.0628] win |
| lapsed-returner | -0.0105 [-0.0113, -0.0097] HARM | +0.0467 [+0.0459, +0.0474] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:relearn-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0243 [-0.0252, -0.0234] HARM | +0.0506 [+0.0497, +0.0514] win |
| single-subject-crammer | -0.0259 [-0.0267, -0.0251] HARM | +0.0387 [+0.0378, +0.0396] win |
| struggling-repeater | -0.0172 [-0.0181, -0.0164] HARM | +0.0283 [+0.0275, +0.0291] win |
| returning-expert | -0.0188 [-0.0193, -0.0183] HARM | +0.0666 [+0.0660, +0.0673] win |
| wanderer | -0.0206 [-0.0213, -0.0199] HARM | +0.0491 [+0.0483, +0.0499] win |
| lapsed-returner | -0.0112 [-0.0121, -0.0104] HARM | +0.0366 [+0.0358, +0.0374] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:relearn-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0352 [-0.0360, -0.0343] HARM | +0.0780 [+0.0773, +0.0787] win |
| single-subject-crammer | -0.0317 [-0.0324, -0.0309] HARM | +0.0629 [+0.0621, +0.0638] win |
| struggling-repeater | -0.0266 [-0.0274, -0.0258] HARM | +0.0474 [+0.0467, +0.0482] win |
| returning-expert | -0.0217 [-0.0221, -0.0212] HARM | +0.0812 [+0.0805, +0.0819] win |
| wanderer | -0.0269 [-0.0276, -0.0263] HARM | +0.0734 [+0.0727, +0.0740] win |
| lapsed-returner | -0.0182 [-0.0190, -0.0174] HARM | +0.0536 [+0.0529, +0.0543] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:priorKnowledgeMean-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0303 [-0.0312, -0.0294] HARM | +0.0595 [+0.0587, +0.0603] win |
| single-subject-crammer | -0.0334 [-0.0342, -0.0325] HARM | +0.0432 [+0.0422, +0.0441] win |
| struggling-repeater | -0.0214 [-0.0223, -0.0206] HARM | +0.0346 [+0.0338, +0.0354] win |
| returning-expert | -0.0246 [-0.0251, -0.0241] HARM | +0.0792 [+0.0785, +0.0798] win |
| wanderer | -0.0262 [-0.0270, -0.0255] HARM | +0.0557 [+0.0550, +0.0565] win |
| lapsed-returner | -0.0158 [-0.0167, -0.0149] HARM | +0.0407 [+0.0399, +0.0415] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:priorKnowledgeMean-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0231 [-0.0239, -0.0223] HARM | +0.0617 [+0.0609, +0.0624] win |
| single-subject-crammer | -0.0202 [-0.0208, -0.0195] HARM | +0.0506 [+0.0498, +0.0514] win |
| struggling-repeater | -0.0181 [-0.0188, -0.0173] HARM | +0.0391 [+0.0383, +0.0398] win |
| returning-expert | -0.0118 [-0.0122, -0.0115] HARM | +0.0543 [+0.0537, +0.0548] win |
| wanderer | -0.0179 [-0.0185, -0.0172] HARM | +0.0571 [+0.0564, +0.0578] win |
| lapsed-returner | -0.0112 [-0.0119, -0.0105] HARM | +0.0433 [+0.0426, +0.0440] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:learnRate-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0467 [-0.0475, -0.0459] HARM | +0.0581 [+0.0573, +0.0589] win |
| single-subject-crammer | -0.0347 [-0.0354, -0.0341] HARM | +0.0490 [+0.0481, +0.0498] win |
| struggling-repeater | -0.0343 [-0.0350, -0.0336] HARM | +0.0349 [+0.0341, +0.0356] win |
| returning-expert | -0.0270 [-0.0275, -0.0265] HARM | +0.0877 [+0.0870, +0.0885] win |
| wanderer | -0.0351 [-0.0357, -0.0345] HARM | +0.0589 [+0.0582, +0.0597] win |
| lapsed-returner | -0.0268 [-0.0275, -0.0261] HARM | +0.0451 [+0.0443, +0.0459] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:learnRate-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0130 [-0.0140, -0.0121] HARM | +0.0430 [+0.0423, +0.0437] win |
| single-subject-crammer | -0.0228 [-0.0237, -0.0219] HARM | +0.0307 [+0.0298, +0.0315] win |
| struggling-repeater | -0.0099 [-0.0109, -0.0090] | +0.0225 [+0.0218, +0.0233] win |
| returning-expert | -0.0144 [-0.0149, -0.0140] HARM | +0.0447 [+0.0442, +0.0452] win |
| wanderer | -0.0138 [-0.0146, -0.0130] HARM | +0.0386 [+0.0379, +0.0392] win |
| lapsed-returner | -0.0044 [-0.0053, -0.0035] | +0.0274 [+0.0267, +0.0281] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:prereqPenalty-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0243 [-0.0252, -0.0234] HARM | +0.0583 [+0.0575, +0.0591] win |
| single-subject-crammer | -0.0272 [-0.0280, -0.0263] HARM | +0.0445 [+0.0436, +0.0453] win |
| struggling-repeater | -0.0182 [-0.0190, -0.0173] HARM | +0.0330 [+0.0323, +0.0338] win |
| returning-expert | -0.0191 [-0.0196, -0.0186] HARM | +0.0687 [+0.0681, +0.0694] win |
| wanderer | -0.0207 [-0.0214, -0.0200] HARM | +0.0553 [+0.0546, +0.0560] win |
| lapsed-returner | -0.0121 [-0.0130, -0.0112] HARM | +0.0405 [+0.0397, +0.0412] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:prereqPenalty-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0359 [-0.0367, -0.0350] HARM | +0.0637 [+0.0629, +0.0646] win |
| single-subject-crammer | -0.0308 [-0.0316, -0.0301] HARM | +0.0513 [+0.0504, +0.0522] win |
| struggling-repeater | -0.0261 [-0.0269, -0.0253] HARM | +0.0373 [+0.0364, +0.0381] win |
| returning-expert | -0.0219 [-0.0224, -0.0214] HARM | +0.0804 [+0.0798, +0.0811] win |
| wanderer | -0.0275 [-0.0282, -0.0269] HARM | +0.0625 [+0.0617, +0.0633] win |
| lapsed-returner | -0.0181 [-0.0188, -0.0173] HARM | +0.0460 [+0.0452, +0.0468] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:pullScale-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0286 [-0.0295, -0.0277] HARM | +0.0616 [+0.0608, +0.0624] win |
| single-subject-crammer | -0.0284 [-0.0292, -0.0276] HARM | +0.0476 [+0.0467, +0.0485] win |
| struggling-repeater | -0.0211 [-0.0219, -0.0202] HARM | +0.0355 [+0.0347, +0.0362] win |
| returning-expert | -0.0202 [-0.0206, -0.0197] HARM | +0.0734 [+0.0728, +0.0741] win |
| wanderer | -0.0231 [-0.0238, -0.0224] HARM | +0.0591 [+0.0584, +0.0598] win |
| lapsed-returner | -0.0143 [-0.0152, -0.0135] HARM | +0.0435 [+0.0427, +0.0443] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:pullScale-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0286 [-0.0295, -0.0277] HARM | +0.0616 [+0.0608, +0.0624] win |
| single-subject-crammer | -0.0284 [-0.0292, -0.0276] HARM | +0.0476 [+0.0467, +0.0485] win |
| struggling-repeater | -0.0211 [-0.0219, -0.0202] HARM | +0.0355 [+0.0347, +0.0362] win |
| returning-expert | -0.0202 [-0.0206, -0.0197] HARM | +0.0734 [+0.0728, +0.0741] win |
| wanderer | -0.0231 [-0.0238, -0.0224] HARM | +0.0591 [+0.0584, +0.0598] win |
| lapsed-returner | -0.0143 [-0.0152, -0.0135] HARM | +0.0435 [+0.0427, +0.0443] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitSlotCost-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0286 [-0.0295, -0.0277] HARM | +0.0616 [+0.0608, +0.0624] win |
| single-subject-crammer | -0.0284 [-0.0292, -0.0276] HARM | +0.0476 [+0.0467, +0.0485] win |
| struggling-repeater | -0.0211 [-0.0219, -0.0202] HARM | +0.0355 [+0.0347, +0.0362] win |
| returning-expert | -0.0202 [-0.0206, -0.0197] HARM | +0.0734 [+0.0728, +0.0741] win |
| wanderer | -0.0231 [-0.0238, -0.0224] HARM | +0.0591 [+0.0584, +0.0598] win |
| lapsed-returner | -0.0143 [-0.0152, -0.0135] HARM | +0.0435 [+0.0427, +0.0443] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitSlotCost-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | +0.0054 [+0.0045, +0.0063] | +0.0547 [+0.0538, +0.0555] win |
| single-subject-crammer | -0.0024 [-0.0032, -0.0016] | +0.0390 [+0.0382, +0.0398] win |
| struggling-repeater | -0.0002 [-0.0010, +0.0006] | +0.0306 [+0.0298, +0.0314] win |
| returning-expert | +0.0039 [+0.0033, +0.0045] | +0.0645 [+0.0639, +0.0651] win |
| wanderer | +0.0023 [+0.0016, +0.0030] | +0.0495 [+0.0488, +0.0502] win |
| lapsed-returner | +0.0021 [+0.0013, +0.0029] | +0.0391 [+0.0384, +0.0399] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitStopScale-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0411 [-0.0421, -0.0401] HARM | +0.0614 [+0.0606, +0.0622] win |
| single-subject-crammer | -0.0323 [-0.0331, -0.0315] HARM | +0.0511 [+0.0503, +0.0519] win |
| struggling-repeater | -0.0334 [-0.0343, -0.0325] HARM | +0.0358 [+0.0351, +0.0366] win |
| returning-expert | -0.0236 [-0.0241, -0.0231] HARM | +0.0734 [+0.0728, +0.0741] win |
| wanderer | -0.0322 [-0.0330, -0.0315] HARM | +0.0587 [+0.0580, +0.0594] win |
| lapsed-returner | -0.0259 [-0.0267, -0.0250] HARM | +0.0440 [+0.0433, +0.0448] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:revisitStopScale-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | +0.0007 [-0.0009, +0.0023] | +0.0620 [+0.0612, +0.0629] win |
| single-subject-crammer | -0.0203 [-0.0211, -0.0195] HARM | +0.0408 [+0.0397, +0.0418] win |
| struggling-repeater | +0.0094 [+0.0079, +0.0108] | +0.0356 [+0.0347, +0.0365] win |
| returning-expert | -0.0126 [-0.0133, -0.0119] HARM | +0.0733 [+0.0727, +0.0740] win |
| wanderer | -0.0016 [-0.0028, -0.0004] | +0.0588 [+0.0581, +0.0596] win |
| lapsed-returner | +0.0127 [+0.0114, +0.0139] win | +0.0433 [+0.0425, +0.0442] win |
| wins · guardrail fails | 1 · none | 6 · none |

### interleave:slots-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0253 [-0.0261, -0.0245] HARM | +0.0452 [+0.0443, +0.0461] win |
| single-subject-crammer | -0.0195 [-0.0201, -0.0189] HARM | +0.0311 [+0.0304, +0.0318] win |
| struggling-repeater | -0.0209 [-0.0216, -0.0202] HARM | +0.0240 [+0.0233, +0.0248] win |
| returning-expert | -0.0132 [-0.0137, -0.0128] HARM | +0.0508 [+0.0501, +0.0514] win |
| wanderer | -0.0199 [-0.0205, -0.0193] HARM | +0.0378 [+0.0370, +0.0385] win |
| lapsed-returner | -0.0150 [-0.0156, -0.0144] HARM | +0.0304 [+0.0297, +0.0312] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:slots-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0007 [-0.0016, +0.0001] | +0.0589 [+0.0582, +0.0597] win |
| single-subject-crammer | -0.0121 [-0.0132, -0.0110] HARM | +0.0434 [+0.0423, +0.0445] win |
| struggling-repeater | -0.0001 [-0.0011, +0.0008] | +0.0349 [+0.0341, +0.0357] win |
| returning-expert | -0.0025 [-0.0031, -0.0020] | +0.0759 [+0.0754, +0.0764] win |
| wanderer | +0.0001 [-0.0006, +0.0009] | +0.0588 [+0.0581, +0.0594] win |
| lapsed-returner | +0.0034 [+0.0025, +0.0044] | +0.0443 [+0.0434, +0.0452] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:priorRateMult-low
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0284 [-0.0293, -0.0275] HARM | +0.0619 [+0.0611, +0.0627] win |
| single-subject-crammer | -0.0279 [-0.0287, -0.0271] HARM | +0.0482 [+0.0473, +0.0491] win |
| struggling-repeater | -0.0210 [-0.0218, -0.0201] HARM | +0.0356 [+0.0348, +0.0364] win |
| returning-expert | -0.0196 [-0.0201, -0.0191] HARM | +0.0741 [+0.0734, +0.0747] win |
| wanderer | -0.0228 [-0.0235, -0.0221] HARM | +0.0595 [+0.0588, +0.0603] win |
| lapsed-returner | -0.0140 [-0.0148, -0.0132] HARM | +0.0441 [+0.0433, +0.0449] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:priorRateMult-high
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0296 [-0.0305, -0.0288] HARM | +0.0602 [+0.0594, +0.0610] win |
| single-subject-crammer | -0.0314 [-0.0322, -0.0306] HARM | +0.0443 [+0.0434, +0.0452] win |
| struggling-repeater | -0.0215 [-0.0223, -0.0206] HARM | +0.0348 [+0.0341, +0.0356] win |
| returning-expert | -0.0236 [-0.0241, -0.0231] HARM | +0.0695 [+0.0689, +0.0702] win |
| wanderer | -0.0248 [-0.0255, -0.0241] HARM | +0.0570 [+0.0563, +0.0577] win |
| lapsed-returner | -0.0162 [-0.0170, -0.0153] HARM | +0.0406 [+0.0398, +0.0414] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:priorRateMult-outer
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0309 [-0.0318, -0.0301] HARM | +0.0586 [+0.0578, +0.0594] win |
| single-subject-crammer | -0.0349 [-0.0357, -0.0341] HARM | +0.0405 [+0.0396, +0.0415] win |
| struggling-repeater | -0.0219 [-0.0228, -0.0211] HARM | +0.0342 [+0.0335, +0.0350] win |
| returning-expert | -0.0291 [-0.0296, -0.0286] HARM | +0.0632 [+0.0626, +0.0639] win |
| wanderer | -0.0269 [-0.0276, -0.0262] HARM | +0.0544 [+0.0537, +0.0552] win |
| lapsed-returner | -0.0185 [-0.0193, -0.0177] HARM | +0.0375 [+0.0367, +0.0383] win |
| wins · guardrail fails | 0 · none | 6 · none |

### interleave:price-corner
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0121 [-0.0132, -0.0110] HARM | +0.0472 [+0.0463, +0.0482] win |
| single-subject-crammer | -0.0162 [-0.0168, -0.0156] HARM | +0.0292 [+0.0284, +0.0300] win |
| struggling-repeater | -0.0088 [-0.0097, -0.0078] | +0.0253 [+0.0244, +0.0261] win |
| returning-expert | -0.0101 [-0.0107, -0.0096] HARM | +0.0513 [+0.0506, +0.0519] win |
| wanderer | -0.0107 [-0.0115, -0.0099] HARM | +0.0390 [+0.0382, +0.0398] win |
| lapsed-returner | -0.0035 [-0.0044, -0.0027] | +0.0322 [+0.0314, +0.0329] win |
| wins · guardrail fails | 0 · none | 6 · none |

### first:base
| persona | default-order + none vs fixed | oracle-review vs fixed |
|---|---|---|
| curious-newcomer | -0.0049 [-0.0078, -0.0020] | +0.1281 [+0.1256, +0.1306] win |
| single-subject-crammer | -0.0420 [-0.0439, -0.0400] HARM | +0.0690 [+0.0670, +0.0710] win |
| struggling-repeater | -0.0078 [-0.0106, -0.0050] | +0.0824 [+0.0798, +0.0849] win |
| returning-expert | -0.0104 [-0.0119, -0.0089] HARM | +0.1083 [+0.1072, +0.1095] win |
| wanderer | -0.0047 [-0.0071, -0.0023] | +0.1180 [+0.1158, +0.1202] win |
| lapsed-returner | +0.0166 [+0.0138, +0.0194] win | +0.1090 [+0.1064, +0.1116] win |
| wins · guardrail fails | 1 · none | 6 · none |

θ (oracle-review, tuning seeds): interleave:base 0.9/0.7/0.6 · interleave:forgetScale-low 0.9/0.7/0.5/0.8 · interleave:forgetScale-high 0.9/0.3/0.4/0.6/0.5 · interleave:forgetShape-low 0.9/0.7/0.3/0.8/0.6 · interleave:forgetShape-high 0.9/0.6/0.5/0.7 · interleave:kSpread-low 0.9/0.7/0.6/0.8 · interleave:kSpread-high 0.9/0.6/0.8 · interleave:revisitStrengthen-low 0.9/0.6/0.7 · interleave:revisitStrengthen-high 0.9/0.7/0.6 · interleave:relearn-low 0.9/0.7/0.6 · interleave:relearn-high 0.8/0.7/0.6/0.9 · interleave:priorKnowledgeMean-low 0.9/0.6/0.5/0.8/0.7 · interleave:priorKnowledgeMean-high 0.9/0.7/0.8 · interleave:learnRate-low 0.9/0.5/0.6/0.8/0.4 · interleave:learnRate-high 0.9/0.8/0.7 · interleave:prereqPenalty-low 0.9/0.7/0.6/0.8 · interleave:prereqPenalty-high 0.9/0.6/0.3/0.8/0.4 · interleave:pullScale-low 0.9/0.7/0.6 · interleave:pullScale-high 0.9/0.7/0.6 · interleave:revisitSlotCost-low 0.9/0.7/0.6 · interleave:revisitSlotCost-high 0.5/0.4/0.6/0.3 · interleave:revisitStopScale-low 0.9/0.6/0.7 · interleave:revisitStopScale-high 0.8/0.5/0.3/0.9/0.6 · interleave:slots-low 0.9/0.3/0.6/0.8/0.4 · interleave:slots-high 0.4/0.6/0.8/0.3 · interleave:priorRateMult-low 0.9/0.7/0.6 · interleave:priorRateMult-high 0.9/0.7/0.6 · interleave:priorRateMult-outer 0.9/0.7/0.6/0.8 · interleave:price-corner 0.7/0.5/0.3/0.8
θ (oracle-review, tuning seeds): first:base 0.3/0.6/0.8

## Horizons at the base cells (R level per persona: arm at H over the reference's nAll)
### interleave:base
| arm | H | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|---|
| oracle-order+fixed | 1 | 0.1069 | 0.0868 | 0.0831 | 0.1775 | 0.1142 | 0.1179 |
| oracle-order+fixed | 7 | 0.1117 | 0.0826 | 0.0847 | 0.1504 | 0.1060 | 0.1069 |
| oracle-order+fixed | 30 | 0.1023 | 0.0656 | 0.0696 | 0.1097 | 0.0846 | 0.0803 |
| oracle-new+fixed | 1 | 0.1058 | 0.0856 | 0.0829 | 0.1600 | 0.1125 | 0.1162 |
| oracle-new+fixed | 7 | 0.1108 | 0.0817 | 0.0845 | 0.1386 | 0.1046 | 0.1055 |
| oracle-new+fixed | 30 | 0.1016 | 0.0651 | 0.0696 | 0.1030 | 0.0838 | 0.0795 |
| oracle-refresh+fixed | 1 | 0.0386 | 0.0402 | 0.0100 | 0.1569 | 0.0554 | 0.0584 |
| oracle-refresh+fixed | 7 | 0.0307 | 0.0317 | 0.0065 | 0.1342 | 0.0437 | 0.0434 |
| oracle-refresh+fixed | 30 | 0.0192 | 0.0184 | 0.0034 | 0.0949 | 0.0264 | 0.0240 |
| reachable+fixed | 1 | 0.0197 | 0.0207 | 0.0172 | 0.0113 | 0.0160 | 0.0136 |
| reachable+fixed | 7 | 0.0168 | 0.0176 | 0.0134 | 0.0102 | 0.0136 | 0.0106 |
| reachable+fixed | 30 | 0.0109 | 0.0100 | 0.0073 | 0.0074 | 0.0085 | 0.0060 |
| default-order+none | 1 | -0.0352 | -0.0352 | -0.0263 | -0.0229 | -0.0273 | -0.0164 |
| default-order+none | 7 | -0.0286 | -0.0284 | -0.0211 | -0.0202 | -0.0231 | -0.0143 |
| default-order+none | 30 | -0.0322 | -0.0277 | -0.0250 | -0.0217 | -0.0263 | -0.0192 |
| default-order+oracle-review | 1 | 0.0812 | 0.0647 | 0.0530 | 0.0896 | 0.0784 | 0.0617 |
| default-order+oracle-review | 7 | 0.0616 | 0.0476 | 0.0355 | 0.0734 | 0.0591 | 0.0435 |
| default-order+oracle-review | 30 | 0.0250 | 0.0178 | 0.0053 | 0.0472 | 0.0247 | 0.0140 |

### first:base
| arm | H | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|---|
| oracle-order+fixed | 1 | 0.1371 | 0.1041 | 0.0897 | 0.2101 | 0.1340 | 0.1191 |
| oracle-order+fixed | 7 | 0.1587 | 0.1115 | 0.1148 | 0.1906 | 0.1390 | 0.1237 |
| oracle-order+fixed | 30 | 0.1622 | 0.1042 | 0.1156 | 0.1588 | 0.1294 | 0.1119 |
| oracle-new+fixed | 1 | 0.1353 | 0.1019 | 0.0890 | 0.1971 | 0.1304 | 0.1137 |
| oracle-new+fixed | 7 | 0.1571 | 0.1096 | 0.1143 | 0.1796 | 0.1357 | 0.1191 |
| oracle-new+fixed | 30 | 0.1609 | 0.1027 | 0.1152 | 0.1503 | 0.1268 | 0.1083 |
| oracle-refresh+fixed | 1 | 0.0627 | 0.0532 | 0.0214 | 0.1817 | 0.0766 | 0.0690 |
| oracle-refresh+fixed | 7 | 0.0484 | 0.0398 | 0.0144 | 0.1517 | 0.0582 | 0.0495 |
| oracle-refresh+fixed | 30 | 0.0331 | 0.0251 | 0.0081 | 0.1121 | 0.0385 | 0.0303 |
| reachable+fixed | 1 | 0.0303 | 0.0234 | 0.0252 | 0.0129 | 0.0203 | 0.0130 |
| reachable+fixed | 7 | 0.0235 | 0.0174 | 0.0172 | 0.0111 | 0.0148 | 0.0095 |
| reachable+fixed | 30 | 0.0166 | 0.0109 | 0.0108 | 0.0082 | 0.0093 | 0.0062 |
| default-order+none | 1 | 0.0000 | -0.0477 | 0.0043 | -0.0099 | 0.0024 | 0.0339 |
| default-order+none | 7 | -0.0049 | -0.0420 | -0.0078 | -0.0104 | -0.0047 | 0.0166 |
| default-order+none | 30 | -0.0644 | -0.0725 | -0.0772 | -0.0349 | -0.0601 | -0.0515 |
| default-order+oracle-review | 1 | 0.1715 | 0.1099 | 0.1331 | 0.1347 | 0.1587 | 0.1582 |
| default-order+oracle-review | 7 | 0.1281 | 0.0690 | 0.0824 | 0.1083 | 0.1180 | 0.1090 |
| default-order+oracle-review | 30 | 0.0173 | 0.0072 | -0.0295 | 0.0751 | 0.0154 | 0.0006 |

## Descriptive at the base cells (means per episode)
### interleave:base
| arm | persona | nNew | revisits | revisitShare | cards | reveal | movedShare | R1d | refreshPicks | refreshPrior | refreshEpisode | newPicks | revisitsUnserved | refreshSkipped |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 76.16 | 29.30 | 0.27 | 108.32 | 0.96 | 0.00 | 0.68 | 8.54 | 7.67 | 0.87 | 70.48 | 113.61 | 0.00 |
| default-order+fixed | single-subject-crammer | 87.55 | 33.36 | 0.27 | 123.23 | 0.97 | 0.00 | 0.70 | 15.21 | 12.94 | 2.28 | 74.65 | 134.64 | 0.00 |
| default-order+fixed | struggling-repeater | 64.70 | 25.72 | 0.27 | 93.96 | 0.95 | 0.00 | 0.65 | 3.97 | 3.07 | 0.90 | 64.27 | 142.22 | 0.00 |
| default-order+fixed | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.00 | 0.83 | 45.79 | 42.57 | 3.22 | 49.85 | 132.12 | 0.00 |
| default-order+fixed | wanderer | 77.04 | 29.99 | 0.27 | 109.77 | 0.96 | 0.00 | 0.71 | 15.83 | 14.46 | 1.37 | 63.94 | 138.01 | 0.00 |
| default-order+fixed | lapsed-returner | 61.74 | 24.66 | 0.27 | 90.13 | 0.94 | 0.00 | 0.73 | 16.39 | 15.29 | 1.10 | 49.08 | 143.34 | 0.00 |
| oracle-order+fixed | curious-newcomer | 76.16 | 29.30 | 0.27 | 108.32 | 0.96 | 0.99 | 0.67 | 0.00 | 0.00 | 0.00 | 79.02 | 113.57 | 0.12 |
| oracle-order+fixed | single-subject-crammer | 85.49 | 32.58 | 0.27 | 120.60 | 0.97 | 0.99 | 0.67 | 0.00 | 0.00 | 0.00 | 88.02 | 135.42 | 0.31 |
| oracle-order+fixed | struggling-repeater | 64.31 | 25.58 | 0.27 | 93.46 | 0.95 | 0.99 | 0.66 | 0.00 | 0.00 | 0.00 | 67.89 | 142.37 | 0.07 |
| oracle-order+fixed | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.99 | 0.69 | 0.60 | 0.39 | 0.21 | 95.05 | 132.12 | 0.85 |
| oracle-order+fixed | wanderer | 77.04 | 29.99 | 0.27 | 109.77 | 0.96 | 0.99 | 0.67 | 0.00 | 0.00 | 0.00 | 79.77 | 138.01 | 0.30 |
| oracle-order+fixed | lapsed-returner | 61.21 | 24.46 | 0.27 | 89.46 | 0.94 | 0.99 | 0.67 | 0.00 | 0.00 | 0.00 | 65.00 | 143.54 | 0.34 |
| oracle-new+fixed | curious-newcomer | 76.16 | 29.30 | 0.27 | 108.32 | 0.96 | 0.99 | 0.67 | 0.15 | 0.15 | 0.00 | 78.87 | 113.56 | 0.00 |
| oracle-new+fixed | single-subject-crammer | 85.46 | 32.57 | 0.27 | 120.58 | 0.97 | 0.99 | 0.67 | 0.39 | 0.39 | 0.00 | 87.61 | 135.43 | 0.00 |
| oracle-new+fixed | struggling-repeater | 64.33 | 25.58 | 0.27 | 93.48 | 0.95 | 0.99 | 0.66 | 0.07 | 0.07 | 0.00 | 67.83 | 142.36 | 0.00 |
| oracle-new+fixed | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.92 | 0.71 | 5.64 | 5.27 | 0.37 | 90.00 | 132.12 | 0.00 |
| oracle-new+fixed | wanderer | 77.04 | 29.99 | 0.27 | 109.77 | 0.96 | 0.99 | 0.68 | 0.45 | 0.44 | 0.00 | 79.33 | 138.01 | 0.00 |
| oracle-new+fixed | lapsed-returner | 61.21 | 24.46 | 0.27 | 89.47 | 0.94 | 0.98 | 0.67 | 0.52 | 0.52 | 0.00 | 64.49 | 143.54 | 0.00 |
| oracle-refresh+fixed | curious-newcomer | 76.16 | 29.30 | 0.27 | 108.32 | 0.96 | 0.89 | 0.65 | 0.34 | 0.02 | 0.32 | 78.68 | 113.61 | 1.00 |
| oracle-refresh+fixed | single-subject-crammer | 86.86 | 33.10 | 0.27 | 122.34 | 0.97 | 0.94 | 0.65 | 0.94 | 0.05 | 0.89 | 88.30 | 134.90 | 1.00 |
| oracle-refresh+fixed | struggling-repeater | 64.75 | 25.75 | 0.27 | 94.04 | 0.95 | 0.76 | 0.64 | 1.92 | 0.24 | 1.68 | 66.38 | 142.20 | 0.95 |
| oracle-refresh+fixed | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.99 | 0.68 | 0.63 | 0.37 | 0.26 | 95.01 | 132.12 | 1.00 |
| oracle-refresh+fixed | wanderer | 77.04 | 29.99 | 0.27 | 109.77 | 0.96 | 0.95 | 0.65 | 0.59 | 0.01 | 0.57 | 79.19 | 138.01 | 1.00 |
| oracle-refresh+fixed | lapsed-returner | 61.67 | 24.65 | 0.27 | 90.07 | 0.94 | 0.95 | 0.65 | 1.24 | 0.12 | 1.12 | 64.19 | 143.35 | 1.00 |
| reachable+fixed | curious-newcomer | 76.16 | 29.30 | 0.27 | 108.32 | 0.96 | 0.99 | 0.70 | 7.77 | 7.77 | 0.00 | 71.26 | 113.57 | 0.10 |
| reachable+fixed | single-subject-crammer | 85.00 | 32.39 | 0.27 | 119.97 | 0.97 | 1.00 | 0.69 | 8.16 | 8.16 | 0.00 | 79.42 | 135.61 | 0.20 |
| reachable+fixed | struggling-repeater | 64.96 | 25.82 | 0.27 | 94.31 | 0.95 | 0.99 | 0.67 | 3.10 | 3.10 | 0.00 | 65.39 | 142.12 | 0.04 |
| reachable+fixed | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.99 | 0.83 | 43.98 | 43.73 | 0.25 | 51.67 | 132.12 | 0.44 |
| reachable+fixed | wanderer | 77.04 | 29.99 | 0.27 | 109.77 | 0.96 | 0.99 | 0.73 | 14.68 | 14.68 | 0.00 | 65.09 | 138.01 | 0.19 |
| reachable+fixed | lapsed-returner | 61.59 | 24.60 | 0.27 | 89.94 | 0.94 | 0.99 | 0.74 | 15.39 | 15.39 | 0.00 | 49.96 | 143.40 | 0.22 |
| default-order+none | curious-newcomer | 84.18 | 0.00 | 0.00 | 87.38 | 0.96 | 0.00 | 0.68 | 9.59 | 8.48 | 1.10 | 77.79 | 0.00 | 0.00 |
| default-order+none | single-subject-crammer | 91.72 | 0.00 | 0.00 | 94.08 | 0.97 | 0.00 | 0.70 | 16.08 | 13.54 | 2.53 | 78.00 | 0.00 | 0.00 |
| default-order+none | struggling-repeater | 74.18 | 0.00 | 0.00 | 78.29 | 0.95 | 0.00 | 0.65 | 4.61 | 3.52 | 1.09 | 73.68 | 0.00 | 0.00 |
| default-order+none | returning-expert | 98.64 | 0.00 | 0.00 | 100.26 | 0.98 | 0.00 | 0.83 | 48.05 | 44.65 | 3.40 | 52.21 | 0.00 | 0.00 |
| default-order+none | wanderer | 84.80 | 0.00 | 0.00 | 87.83 | 0.96 | 0.00 | 0.72 | 17.62 | 15.82 | 1.80 | 70.22 | 0.00 | 0.00 |
| default-order+none | lapsed-returner | 71.62 | 0.00 | 0.00 | 76.00 | 0.94 | 0.00 | 0.73 | 19.06 | 17.78 | 1.28 | 56.93 | 0.00 | 0.00 |
| default-order+oracle-review | curious-newcomer | 76.12 | 29.50 | 0.27 | 108.48 | 0.96 | 0.00 | 0.69 | 8.62 | 7.67 | 0.94 | 70.37 | 72.73 | 0.00 |
| default-order+oracle-review | single-subject-crammer | 84.94 | 32.73 | 0.27 | 119.91 | 0.97 | 0.00 | 0.71 | 15.19 | 12.57 | 2.62 | 71.99 | 78.95 | 0.00 |
| default-order+oracle-review | struggling-repeater | 64.57 | 25.69 | 0.27 | 93.79 | 0.95 | 0.00 | 0.65 | 4.02 | 3.06 | 0.95 | 64.09 | 84.43 | 0.00 |
| default-order+oracle-review | returning-expert | 94.12 | 35.88 | 0.27 | 131.53 | 0.98 | 0.00 | 0.83 | 46.28 | 42.57 | 3.71 | 49.37 | 76.05 | 0.00 |
| default-order+oracle-review | wanderer | 77.04 | 29.99 | 0.27 | 109.76 | 0.96 | 0.00 | 0.72 | 16.03 | 14.46 | 1.57 | 63.75 | 80.31 | 0.00 |
| default-order+oracle-review | lapsed-returner | 61.64 | 24.60 | 0.27 | 89.97 | 0.94 | 0.00 | 0.73 | 16.41 | 15.27 | 1.14 | 48.97 | 83.23 | 0.00 |

### first:base
| arm | persona | nNew | revisits | revisitShare | cards | reveal | movedShare | R1d | refreshPicks | refreshPrior | refreshEpisode | newPicks | revisitsUnserved | refreshSkipped |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 45.22 | 72.58 | 0.61 | 119.50 | 0.96 | 0.00 | 0.68 | 5.29 | 4.53 | 0.77 | 41.63 | 18.64 | 0.00 |
| default-order+fixed | single-subject-crammer | 52.61 | 98.35 | 0.65 | 152.33 | 0.97 | 0.00 | 0.70 | 8.68 | 7.85 | 0.83 | 45.30 | 13.39 | 0.00 |
| default-order+fixed | struggling-repeater | 29.07 | 73.23 | 0.71 | 103.87 | 0.95 | 0.00 | 0.65 | 2.15 | 1.34 | 0.82 | 28.48 | 29.14 | 0.00 |
| default-order+fixed | returning-expert | 58.76 | 100.22 | 0.63 | 159.90 | 0.98 | 0.00 | 0.83 | 28.28 | 27.05 | 1.23 | 31.40 | 11.73 | 0.00 |
| default-order+fixed | wanderer | 39.95 | 84.79 | 0.68 | 126.16 | 0.96 | 0.00 | 0.72 | 8.47 | 7.49 | 0.98 | 32.90 | 22.71 | 0.00 |
| default-order+fixed | lapsed-returner | 24.07 | 73.58 | 0.75 | 99.09 | 0.94 | 0.00 | 0.74 | 6.66 | 5.80 | 0.86 | 18.85 | 33.82 | 0.00 |
| oracle-order+fixed | curious-newcomer | 45.39 | 72.25 | 0.61 | 119.35 | 0.96 | 1.00 | 0.68 | 0.00 | 0.00 | 0.00 | 47.10 | 18.50 | 0.10 |
| oracle-order+fixed | single-subject-crammer | 51.12 | 97.96 | 0.65 | 150.56 | 0.97 | 1.00 | 0.68 | 0.00 | 0.00 | 0.00 | 52.61 | 13.71 | 0.28 |
| oracle-order+fixed | struggling-repeater | 28.90 | 72.80 | 0.71 | 103.28 | 0.94 | 1.00 | 0.67 | 0.00 | 0.00 | 0.00 | 30.49 | 29.13 | 0.06 |
| oracle-order+fixed | returning-expert | 58.76 | 100.23 | 0.63 | 159.90 | 0.98 | 0.99 | 0.70 | 0.00 | 0.00 | 0.00 | 59.68 | 11.73 | 0.63 |
| oracle-order+fixed | wanderer | 39.99 | 84.72 | 0.68 | 126.13 | 0.96 | 1.00 | 0.69 | 0.00 | 0.00 | 0.00 | 41.40 | 22.70 | 0.23 |
| oracle-order+fixed | lapsed-returner | 23.83 | 73.45 | 0.75 | 98.73 | 0.94 | 0.99 | 0.69 | 0.00 | 0.00 | 0.00 | 25.28 | 33.88 | 0.28 |
| oracle-new+fixed | curious-newcomer | 45.40 | 72.24 | 0.61 | 119.35 | 0.96 | 0.99 | 0.68 | 0.12 | 0.12 | 0.00 | 46.99 | 18.49 | 0.00 |
| oracle-new+fixed | single-subject-crammer | 51.22 | 98.01 | 0.65 | 150.70 | 0.97 | 0.99 | 0.68 | 0.32 | 0.32 | 0.00 | 52.37 | 13.66 | 0.00 |
| oracle-new+fixed | struggling-repeater | 28.90 | 72.80 | 0.71 | 103.29 | 0.95 | 0.99 | 0.67 | 0.06 | 0.06 | 0.00 | 30.43 | 29.13 | 0.00 |
| oracle-new+fixed | returning-expert | 58.76 | 100.23 | 0.63 | 159.90 | 0.98 | 0.96 | 0.71 | 1.82 | 1.79 | 0.03 | 57.86 | 11.73 | 0.00 |
| oracle-new+fixed | wanderer | 40.00 | 84.70 | 0.68 | 126.12 | 0.96 | 0.99 | 0.69 | 0.32 | 0.32 | 0.00 | 41.10 | 22.69 | 0.00 |
| oracle-new+fixed | lapsed-returner | 23.86 | 73.45 | 0.75 | 98.76 | 0.94 | 0.98 | 0.69 | 0.38 | 0.38 | 0.00 | 24.93 | 33.86 | 0.00 |
| oracle-refresh+fixed | curious-newcomer | 45.10 | 72.79 | 0.61 | 119.59 | 0.96 | 0.81 | 0.64 | 0.02 | 0.01 | 0.01 | 46.79 | 18.72 | 1.00 |
| oracle-refresh+fixed | single-subject-crammer | 51.87 | 98.18 | 0.65 | 151.45 | 0.97 | 0.91 | 0.64 | 0.09 | 0.03 | 0.06 | 53.19 | 13.57 | 1.00 |
| oracle-refresh+fixed | struggling-repeater | 29.04 | 73.28 | 0.71 | 103.88 | 0.95 | 0.56 | 0.63 | 0.16 | 0.08 | 0.08 | 30.44 | 29.15 | 0.89 |
| oracle-refresh+fixed | returning-expert | 58.76 | 100.23 | 0.63 | 159.91 | 0.98 | 0.98 | 0.68 | 0.00 | 0.00 | 0.00 | 59.68 | 11.73 | 1.00 |
| oracle-refresh+fixed | wanderer | 39.89 | 84.89 | 0.68 | 126.19 | 0.96 | 0.89 | 0.65 | 0.02 | 0.01 | 0.01 | 41.29 | 22.74 | 1.00 |
| oracle-refresh+fixed | lapsed-returner | 24.06 | 73.66 | 0.75 | 99.16 | 0.94 | 0.85 | 0.64 | 0.09 | 0.04 | 0.05 | 25.40 | 33.92 | 0.99 |
| reachable+fixed | curious-newcomer | 45.33 | 72.38 | 0.61 | 119.41 | 0.96 | 0.99 | 0.71 | 4.58 | 4.58 | 0.00 | 42.45 | 18.56 | 0.09 |
| reachable+fixed | single-subject-crammer | 51.29 | 98.05 | 0.65 | 150.83 | 0.97 | 1.00 | 0.71 | 6.04 | 6.04 | 0.00 | 46.73 | 13.60 | 0.20 |
| reachable+fixed | struggling-repeater | 29.22 | 73.28 | 0.71 | 104.06 | 0.95 | 0.99 | 0.68 | 1.39 | 1.39 | 0.00 | 29.40 | 29.06 | 0.04 |
| reachable+fixed | returning-expert | 58.76 | 100.22 | 0.63 | 159.90 | 0.98 | 0.99 | 0.83 | 27.46 | 27.46 | 0.00 | 32.22 | 11.73 | 0.44 |
| reachable+fixed | wanderer | 39.99 | 84.73 | 0.68 | 126.13 | 0.96 | 0.99 | 0.74 | 7.62 | 7.62 | 0.00 | 33.78 | 22.71 | 0.19 |
| reachable+fixed | lapsed-returner | 24.04 | 73.54 | 0.75 | 99.02 | 0.94 | 0.99 | 0.75 | 6.06 | 6.06 | 0.00 | 19.42 | 33.80 | 0.24 |
| default-order+none | curious-newcomer | 84.18 | 0.00 | 0.00 | 87.38 | 0.96 | 0.00 | 0.68 | 9.59 | 8.48 | 1.10 | 77.79 | 0.00 | 0.00 |
| default-order+none | single-subject-crammer | 91.72 | 0.00 | 0.00 | 94.08 | 0.97 | 0.00 | 0.70 | 16.08 | 13.54 | 2.53 | 78.00 | 0.00 | 0.00 |
| default-order+none | struggling-repeater | 74.18 | 0.00 | 0.00 | 78.29 | 0.95 | 0.00 | 0.65 | 4.61 | 3.52 | 1.09 | 73.68 | 0.00 | 0.00 |
| default-order+none | returning-expert | 98.64 | 0.00 | 0.00 | 100.26 | 0.98 | 0.00 | 0.83 | 48.05 | 44.65 | 3.40 | 52.21 | 0.00 | 0.00 |
| default-order+none | wanderer | 84.80 | 0.00 | 0.00 | 87.83 | 0.96 | 0.00 | 0.72 | 17.62 | 15.82 | 1.80 | 70.22 | 0.00 | 0.00 |
| default-order+none | lapsed-returner | 71.62 | 0.00 | 0.00 | 76.00 | 0.94 | 0.00 | 0.73 | 19.06 | 17.78 | 1.28 | 56.93 | 0.00 | 0.00 |
| default-order+oracle-review | curious-newcomer | 68.82 | 31.40 | 0.30 | 102.85 | 0.96 | 0.00 | 0.68 | 7.85 | 6.94 | 0.91 | 63.60 | 3.11 | 0.00 |
| default-order+oracle-review | single-subject-crammer | 63.35 | 67.23 | 0.51 | 132.23 | 0.97 | 0.00 | 0.70 | 10.51 | 9.47 | 1.04 | 54.48 | 9.17 | 0.00 |
| default-order+oracle-review | struggling-repeater | 55.28 | 32.02 | 0.35 | 90.38 | 0.95 | 0.00 | 0.65 | 3.58 | 2.59 | 0.99 | 54.79 | 4.87 | 0.00 |
| default-order+oracle-review | returning-expert | 71.67 | 71.30 | 0.49 | 144.11 | 0.98 | 0.00 | 0.83 | 34.59 | 32.81 | 1.79 | 38.21 | 6.41 | 0.00 |
| default-order+oracle-review | wanderer | 69.78 | 31.97 | 0.31 | 104.21 | 0.96 | 0.00 | 0.72 | 14.48 | 13.15 | 1.33 | 57.76 | 3.07 | 0.00 |
| default-order+oracle-review | lapsed-returner | 55.65 | 25.96 | 0.31 | 85.01 | 0.94 | 0.00 | 0.73 | 14.93 | 13.75 | 1.18 | 44.12 | 3.68 | 0.00 |

## Δ beside the MDE (criterion 3 §6, carried unchanged; R7 is a final-test read the product cannot observe)
MDE (live first-revisit recall, points): 200 learners 15.3 · 1000 learners 6.9 · 5000 learners 3.1 · 10000 learners 2.2
- interleave:base, reachable vs default-order, Δ R7 in points: curious-newcomer 1.7 · single-subject-crammer 1.8 · struggling-repeater 1.3 · returning-expert 1.0 · wanderer 1.4 · lapsed-returner 1.1; fewest learners in the MDE table whose MDE is at or below the largest |Δ|: none in the table (every |Δ| below 2.2 points)
- first:base, reachable vs default-order, Δ R7 in points: curious-newcomer 2.3 · single-subject-crammer 1.7 · struggling-repeater 1.7 · returning-expert 1.1 · wanderer 1.5 · lapsed-returner 1.0; fewest learners in the MDE table whose MDE is at or below the largest |Δ|: 10000 learners (2.2)
