# Session readout: the four session composer variants against the default order, under the frozen session criterion

owner: personalization-eval (Uma) · run: eval-s1-readout-1021 · date: 2026-10-21 · board: W-2013 (this readout), W-2005 (criterion)
criterion: company/personalization/eval/2026-10-20-session-criterion.md, **frozen at commit bdebacc27be85077074a43397bfce4876420d1a2** (file sha256 at that commit `40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9`). §11 (the freeze record, the formatter and parts-check hashes, the 11-chunk partition) was written in the next commit and changes no rule. The run read the file at **743379aa6154bf7eadc6400b65897b5a851b6371** (sha256 as run `1798c8c28d4bebb1b65dc3c3eb514773191e93d0879af711be8611baeb2f6973`, in every manifest).
code run: commit **743379aa6154bf7eadc6400b65897b5a851b6371** (`RUN_COMMIT`, in its own worktree /home/user/s1-run/tree), Node v22.22.0 · seeds **70001 to 72000** (S = 2000, the cap; criterion §1.4) · world: criterion 3's (E1 `c8c09eac…f7482840`, E3 `0e120add…c1927a`), interleave placement only · candidate pin: criterion §6, `pinCheck` true (catalogue `c65feabb…f8ff5f`, 231 lessons; model-v0.4.4, composer-v0.3-session, `compose-session-serve-in-order`, sessionSize 5)
run plan: company/personalization/eval/harness/cs/RUN-PLAN-s1.md, followed as written (§1 to §4)
outputs: company/personalization/eval/harness/records/2026-10-20-session-readout/ (`merged/verdicts.json`, `merged/manifest.json`, `chunks/<id>/manifest.json` for the 11 chunks, `parts-check.json`, `tables.md`). The 11 results.ndjson files (1.1 GB) are not committed; their sha256 are in §6.
for: vp-personalization (keep or kill under the VP record §4, company/decisions/2026-10-20-vp-personalization-session-base.md) and the WBR. **Reported unedited.** I recommend nothing on keep or kill, and I apply none of the VP's rules.
reproduction: learner-model-engineer (determinism only), §5.

**No change to the criterion after the first scored number.** The freeze commit (bdebacc2) and the §11 commit (743379aa) came before chunk A1 started. Nothing under company/personalization/ differs between 743379aa and the main tree's HEAD at the time of writing (cf20de975, a descendant): `git diff --stat 743379aa HEAD -- company/personalization/` is empty, so the pin and every hashed harness file still hold there.

## 0. Verdicts

**Readings K1 to K5, per variant, as the criterion computes them (verdicts.json; criterion §3).** No variant is INVALID: T1, T2S, T3S, NM and T4S pass for all four, no unit errored, and the judge checks (S-ID0, T5c, K-e, GAM pin, S-ID1, S-ID2) passed in all 11 chunks.

| variant | K1 gate (base + 26 one-at-a-time cells) | K2 veto (simultaneous 95%, two families) | K2 losses (simultaneous) | unadjusted clear losses, **base cell** (VP record §9 O12 disclosure) | unadjusted clear losses, one-at-a-time cells (count of 156) | K4 subject mix | K5 copy gate (false / served moved) |
|---|---|---|---|---|---|---|---|
| `gam-session` (v1) | **FAIL** | **VETO** | 6, all in one-at-a-time cells (learnRate-high: curious-newcomer, wanderer; prereqPenalty-low: curious-newcomer, wanderer; pullScale-low: wanderer; pullScale-high: wanderer) | wanderer | 26 | **HOLDS** | **COPY-BLOCKED** (43,863 / 3,998,634 = 0.011) |
| `gam-session-v3` | **FAIL** | **VETO** | 5 (base: wanderer; learnRate-high: curious-newcomer, wanderer; prereqPenalty-low: curious-newcomer, wanderer) | wanderer | 26 | **HOLDS** | **COPY-BLOCKED** (48,057 / 4,276,871 = 0.011) |
| `gam-session-no-cov` | **FAIL** | **VETO** | 4, all in one-at-a-time cells (learnRate-high: curious-newcomer, wanderer; prereqPenalty-low: curious-newcomer, wanderer) | wanderer | 24 | **HOLDS** | **COPY-BLOCKED** (44,713 / 4,132,188 = 0.011) |
| `gam-session-v3-edpbase` | **FAIL** | **VETO** | 73 (base: curious-newcomer, struggling-repeater, wanderer, lapsed-returner; and 69 one-at-a-time) | curious-newcomer, struggling-repeater, wanderer, lapsed-returner | 89 | **HOLDS** | **COPY-BLOCKED** (892,459 / 10,994,914 = 0.081) |

- **K1.** FAIL means the variant does not beat default-order in `interleave:base` (criterion §3 K1). None of the four beats it in **any** of the 29 cells: 0 wins of 6 in every cell for every variant. No persona is harmed by the K1 rule (Δ ≤ −0.01 with the upper end below 0) in any cell. Guardrails G1 to G4 hold in every cell for v1, v3 and no-cov. `gam-session-v3-edpbase` fails G2 (distinct concepts, relative lower end below −0.05) for struggling-repeater in `interleave:base` and in every one-at-a-time cell except priorKnowledgeMean-high, learnRate-high, pullScale-low, revisitStopScale-low and slots-high, and also for single-subject-crammer in slots-low (and curious-newcomer in the reported price-corner). The FAIL does not rest on G2: it has 0 wins in every cell.
- **K2.** The full lists are in the readings table (§7, verbatim). The simultaneous statistic is the frozen one (criterion §3 K2: Bonferroni within the base family of 6 and the one-at-a-time family of 156). The unadjusted column is printed beside it, as the criterion says and as the VP record §9 O12 asks of any serving brief. I apply neither the veto nor the disclosure duty; I report both.
- **K3 (attribution, base cell; criterion §3 K3; all three computed whatever K1 says).**

| contrast | complex vs simpler | wins of 6 (need 4) | clear losses (simultaneous, 6) | preferred | Δ by persona |
|---|---|---|---|---|---|
| K3a | `gam-session` vs `gam-session-no-cov` (cov terms) | 0 | none | **`gam-session-no-cov`** (tie to the simpler) | −0.0001 to +0.0001 |
| K3b | `gam-session-v3` vs `gam-session` (v3 edits) | 0 | none | **`gam-session`** (tie to the simpler) | −0.0001 to +0.0007 (single-subject-crammer +0.0007, printed interval +0.0003 to +0.0011) |
| K3c | `gam-session-v3-edpbase` vs `gam-session-v3` (the anchor) | 0 | curious-newcomer, struggling-repeater, wanderer, lapsed-returner | **`gam-session-v3`** | −0.0031 to +0.0015 |

  Each contrast has 0 wins in every one-at-a-time cell (context only). The VP record §4 uses K3 only among K1/K2 passers; there are none, which is a fact the VP reads, not a reading I make.
- **K4.** HOLDS for all four: in `interleave:base` and every one-at-a-time cell, every persona's lower end of the paired 95% interval of the outside-home share difference is above −0.05. The lowest lower end is −0.0098 (v1 and no-cov, slots-low, struggling-repeater), −0.0095 (v3, same cell and persona), −0.0039 (edpbase, pullScale-low, curious-newcomer). No episode was dropped.
- **K5.** COPY-BLOCKED for all four: served moved cards with `reasonCarriesMove` false, pooled over the base and 26 one-at-a-time cells, are about 1.1% for v1, v3 and no-cov (per cell 0.007 to 0.016 for v1) and 8.1% for edpbase. No field was missing. Near-ties (|reason value − margin| ≤ 1e-9, context only): 277, 255, 277 and 125.

**Sizes, so the verdicts can be read (from verdicts.json; R₇ = K(T₇)/N_ref).**
- `gam-session`, `gam-session-v3`, `gam-session-no-cov`: in `interleave:base` the per-persona Δ R₇ against default-order is −0.0005 to +0.0003 (means over personas −0.0002, −0.0001, −0.0003). Across the base and 26 one-at-a-time cells the largest per-persona mean is +0.0011 to +0.0012 (slots-low) and the highest upper end of any 95% interval is +0.0016 to +0.0017, against δ_min = 0.01. So the FAIL is not a power problem at S = 2000: the simulated edge, where there is one, is bounded below 0.2 points of R₇. The losses K2 counts are of the same order: the lowest per-persona mean is −0.0009 to −0.0010 (prereqPenalty-low, curious-newcomer), the lowest lower end −0.0014 to −0.0015. They are clear (intervals below 0) and small (about a tenth of δ_harm = 0.01).
- `gam-session-v3-edpbase`: base-cell Δ is −0.0033 (curious-newcomer) to +0.0014 (returning-expert), mean −0.0012; four of six personas have the upper end of their simultaneous interval below 0. Over the 27 pass cells the per-persona mean runs from −0.0071 (prereqPenalty-low, curious-newcomer) to +0.0044 (prereqPenalty-high, single-subject-crammer), the highest upper end +0.0052. It serves about 2.6 times as many moved cards as v3 (pooled) (moved share 0.40 to 0.46 by persona, v3 0.14 to 0.19).

**Context (criterion §4; no rule reads these; the VP record §4 lists them as context only).**
- Each variant vs `gam` (model-v0.2.2, fingerprint pinned), base cell: 0 wins of 6 for each. v1, v3, no-cov: |Δ| ≤ 0.0009. edpbase: −0.0032 to +0.0016.
- `gam` vs default-order: 0 wins, Δ −0.0006 to +0.0003, guardrails hold. `draft-rules`: 0 wins, Δ −0.0006 to +0.0023, G1 fails for 4 personas. `random`: 0 wins, Δ −0.0040 to +0.0042, G1 and G3 fail for all 6.
- `oracle-order` (criterion 2 §2.3, hidden-state reference) vs default-order: 6 of 6 wins, Δ +0.0829 (single-subject-crammer) to +0.1512 (returning-expert): **HEADROOM**. The ordering headroom in this world is 8 to 15 points of R₇; the four session variants take none of it measurably.

**Circular diagnostics, labelled "circular: diagnostic only" (founder decision Q3; sim/simulate.mjs `circularDiagnostics`, the same definition for every arm, base cell; never a pass score).** Printed beside R₇ (base cell, range over personas):

| arm | R₇ | circular: need coverage | circular: domain diversity |
|---|---|---|---|
| default-order | 0.513 to 1.835 | 0.097 to 0.153 | 0.980 to 1.000 |
| gam-session | 0.513 to 1.835 | 0.183 to 0.201 | 0.980 to 0.999 |
| gam-session-v3 | 0.513 to 1.835 | 0.187 to 0.206 | 0.980 to 0.999 |
| gam-session-no-cov | 0.513 to 1.835 | 0.185 to 0.203 | 0.980 to 0.999 |
| gam-session-v3-edpbase | 0.510 to 1.837 | 0.277 to 0.299 | 0.963 to 0.993 |
| gam | 0.512 to 1.835 | 0.196 to 0.221 | 0.980 to 0.999 |

The circular coverage rises with every composer arm while R₇, the independent learner's recall, does not move. That gap is what "circular" means here: the composer scores well on its own definition of need.

**Descriptive, base cell (never a pass input).** The session variants' moves sit in the first slot of each 5-card plan: for v1, of 10.6 to 14.5 moved cards served per episode, 8.9 to 11.5 are in slot 1 and at most 0.72 in slots 3 to 5 together (criterion §0 records the builders' composition-only probe with the same shape). Compositions per episode: 20.0 to 25.2 for every variant. Cards, new lessons and reveal share are within 0.2% of default-order for v1, v3 and no-cov.

**Facts the VP's rules read (I apply none of them; VP record §4):** (1) No variant passes K1; every variant reads VETO under K2. (2) K3 is computed for all; no variant is a K1/K2 passer. (3) K4 reads HOLDS for all four. (4) K5 reads COPY-BLOCKED for all four. (5) The VP record §4 says what follows when no variant passes K1 and K2; that consequence is the VP's.

## 1. What was run

- **Arms (criterion §2):** `default-order + fixed` (reference); the four session variants + fixed in all 29 interleave cells; `gam`, `draft-rules`, `random` and `oracle-order` + fixed at `interleave:base` as context.
- **Cells:** `interleave:base` (role base); criterion 3's 26 one-at-a-time interleave cells (pass-relevant); `interleave:priorRateMult-outer` and `interleave:price-corner` (reported, read by no rule).
- **Seeds:** 70001 to 72000, the same list for every arm, persona and cell, common random numbers.
- **Partition (criterion §11; an execution change to §8, stated here as §11 asks).** §8 named three parts (A, B, C) and a merge. One background command on this host may run about 2 h, and the parts measured about 4.0, 2.6 and 2.4 h, so the run was 11 chunks (`partsCheckS.mjs` `CHUNKS`, sha256 in §11), each a subset of exactly one §8 part, each §8 part the union of its chunks, then one merge of the 11 directories. Every unit (cell × arm × persona over the 2000 seeds) is computed by the same code on the same seeds whatever the partition, so no judged number depends on it (shown on plumbing seeds before the run: the 11 chunks merged to a verdicts.json byte-identical to one unchunked run; RUN-PLAN-s1.md §0).

| chunk | §8 part | cells | seconds | results lines |
|---|---|---|---|---|
| A1 | A | interleave:base, interleave:price-corner | 2777.154 | 84 |
| A2 | A | interleave:forgetScale-low, interleave:forgetScale-high | 2067.630 | 60 |
| A3 | A | interleave:forgetShape-low, interleave:forgetShape-high | 2024.305 | 60 |
| A4 | A | interleave:priorRateMult-outer, interleave:kSpread-low, interleave:kSpread-high | 3027.897 | 90 |
| A5 | A | interleave:revisitStrengthen-low, interleave:revisitStrengthen-high | 2048.527 | 60 |
| B1 | B | interleave:relearn-low, interleave:relearn-high, interleave:priorKnowledgeMean-low | 2897.392 | 90 |
| B2 | B | interleave:priorKnowledgeMean-high, interleave:learnRate-low, interleave:learnRate-high | 2880.393 | 90 |
| B3 | B | interleave:prereqPenalty-low, interleave:prereqPenalty-high, interleave:pullScale-low | 2885.324 | 90 |
| C1 | C | interleave:pullScale-high, interleave:revisitSlotCost-low, interleave:revisitSlotCost-high | 2899.576 | 90 |
| C2 | C | interleave:revisitStopScale-low, interleave:revisitStopScale-high, interleave:slots-low | 2609.965 | 90 |
| C3 | C | interleave:slots-high, interleave:priorRateMult-low, interleave:priorRateMult-high | 3125.514 | 90 |

  Total 29,243.7 s (8.1 h) at --jobs=4; A1 took 46 min (stop rule 85 min); the longest chunk was C3 at 52 min. Every chunk exited 0 and its log ends `done in …`. Chunks ran one at a time, A1 first, 2026-10-20 20:02 to 2026-10-21 04:11 (file times in /home/user/s1-run/out).
- **Commands**, from /home/user/s1-run/tree at 743379aa (RUN-PLAN-s1.md §3 and §4, verbatim per chunk with its own `--cells`):

```sh
NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=<chunk cells> --out=/home/user/s1-run/out/<chunk> > /home/user/s1-run/out/<chunk>.log 2>&1
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/partsCheckS.mjs check --root=/home/user/s1-run/out > /home/user/s1-run/out/parts-check.json      # stderr: "parts check: OK"
NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --merge=/home/user/s1-run/out/A1,…,/home/user/s1-run/out/C3 --out=/home/user/s1-run/out/merged > /home/user/s1-run/out/merge.log 2>&1   # "merged 11 parts", exit 0
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/cs/readoutS-tables.mjs --root=/home/user/s1-run/out --merged=/home/user/s1-run/out/merged > /home/user/s1-run/out/tables.md   # exit 0, stderr empty
```

- **Parts check:** `ok: true`, no problems; every chunk has its expected results lines and 0 errored units; the commit check passes (743379aa descends from bdebacc2; the criterion differs from the freeze only in §11; the changed paths after the freeze are only progress.md, the criterion, harness/cs README.md, RUN-PLAN-s1.md, partsCheckS.mjs, readoutS-tables.mjs and one memory entry; formatter and check sha256 equal §11). `parts-check.json` was written before the merge, so its `merged` field is null; the formatter re-ran the check with the merged directory and printed "parts check | OK" (§7).
- **Who read what, when.** The chunks, parts check, merge and formatter were executed per the run plan; the dispatch (W-2013) records that the chief of staff read no result. I read nothing of the run until all four steps had exited 0. I read verdicts.json and tables.md only; I did not open results.ndjson or judge-tests.json.

## 2. The judge, as it was when it scored

- **The world is criterion 3's, unchanged** (criterion §1.1): learner3 with the N7 rows, E1 and E3 blocks, 14 daily sessions and a final test 7 days after the last, the Feed.tsx interleave (one due revisit before new card i when i % 3 = 1, at most 12 fetched), the fixed schedule and the slot costs. S-ID0 held the 8 judge and world files byte-identical to readout 3's manifest (b1ae294). S-ID1 held `runEpisodeS` = `runEpisode3` for every non-session arm (360 episode pairs); S-ID2 showed the session loop fed the default order as 5-card plans equals the reference arm (72 of 72). K-e: no draft or retired lesson in the composer's dims at any of the 2000 seeds (231 lessons: 224 published, 7 review).
- **The catalogue is today's** (231 lessons; readout 3 had 230), pinned by sha256 in the candidate pin.
- **What a result here binds** (criterion §1.3): only `compose-session-serve-in-order` with sessionSize 5, through `composeSessionFor` at the pinned hashes. EDD-016 §4.4's recompose-on-reveal glue is a different candidate (W-2011, principal-engineer). No single serving file (W-1994) is scored; one may serve on this readout only through the bridge in criterion §6, by a dated addendum here.
- **Conditions carried from criterion 3's readout, which travel with any reading of this one** (company/personalization/eval/2026-10-17-criterion-3-readout.md §6): refresh gain is decay avoided only (N1); a stop that depends on a missed revisit is not modelled (N4); `slots` has "none to low" confidence (N5); the placement effect on encoding is not in the world (N7). R₇ is a final-test read the product cannot observe (readout 3 §7).
- **K2's statistic is mine and frozen** (criterion §3 K2), less trigger-happy than the literal "upper 95% end below 0"; the VP accepted it before any result (VP record §9) and set the O12 disclosure duty for the unadjusted base-cell losses, which §0 lists.
- **K4's home is fixed at the episode start** (VP record §9 O13): with two pilot domains, narrowing either way moves the outside-home share, and G1 still binds inside K1.
- **Sample size.** S = 2000 is the cap; the rule's formula gave 5,957 for lapsed-returner (criterion §1.4). Paired intervals were narrow: the widest per-persona 95% interval of Δ R₇ for v1, v3 and no-cov in the base cell is about 0.0013 wide, so S was not the binding limit on any reading here.

## 3. What this readout does not say

- Nothing on keep or kill, on serving, on copy, or on the session composer's future. Those are vp-personalization's (VP record §4), and the copy consequence of K5 is the VP's and head-of-product's.
- It does not say any variant harms learners by the K1 rule: no persona is harmed (Δ ≤ −0.01) in any cell. K2's clear losses are statistically clear and about 0.1 points of R₇ for v1, v3 and no-cov.
- It does not test real learners, the recompose-on-reveal glue, a single serving file, or the revisits-first placement.
- The criterion was not changed after the first scored number.

## 4. Independence and disclosure

The criterion was frozen (bdebacc2) before any session variant ran in a scored episode; §11 was written before chunk A1 and changes no rule. The anchoring disclosures of criterion §0 still apply (I authored phase A's criterion and readout 1 and criteria 2, 3 and 3b with their readouts, and I had read the builders' composition-only layout probes). I wrote no curve, weight, policy, coefficient or composer code; the candidate files are pinned by hash and unchanged. I did not read the builders' notes for this readout after the result. The excerpts in §7 are the formatter's output (readoutS-tables.mjs, hashed in §11, computes no verdict), pasted as printed; the full output is `tables.md` in the records directory.

## 5. Reproduction (learner-model-engineer; determinism only)

1. A fresh worktree at **743379aa6154bf7eadc6400b65897b5a851b6371**, `npm ci`, Node v22.22.0. Check `sha256sum company/personalization/eval/2026-10-20-session-criterion.md` = `1798c8c28d4bebb1b65dc3c3eb514773191e93d0879af711be8611baeb2f6973`, and that `git show bdebacc27be85077074a43397bfce4876420d1a2:company/personalization/eval/2026-10-20-session-criterion.md | sha256sum` = `40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9`.
2. Preflight and the 11 chunk commands: company/personalization/eval/harness/cs/RUN-PLAN-s1.md §1 and §3, as written (any order, one at a time, about 8 h at --jobs=4 on 4 cores). Any `--jobs`; the heap flag changes no output.
3. Parts check, merge and tables: RUN-PLAN-s1.md §4 a to c.
4. Compare byte for byte with §6. A chunk's manifest.json may differ only in `seconds` (and `commit` if the worktree is at another commit, which the parts check refuses unless it descends from the freeze with the same hashes). results.ndjson and verdicts.json must be identical. results.ndjson is not committed; the 11 files remain on this host at /home/user/s1-run/out/<chunk>/results.ndjson until someone removes them.

## 6. Hashes of every output (RUN-PLAN-s1.md §4d)

| file | sha256 | committed copy |
|---|---|---|
| A1/results.ndjson | cd69b88efb232bd756e661e512c0068776a4e1a90fd48521ab7a583eafd07d08 | no |
| A2/results.ndjson | 01f82e2f0fd4dcb0b17e846dfa63b1f3072aee86948f7e0a5a39c7eeace0fcb0 | no |
| A3/results.ndjson | 07d854c2efdc26373ca814a6c251d07ab319e05f9de2d372cc1936e26d3186e0 | no |
| A4/results.ndjson | 26faa5789fd46d82420cf952f7515cc0f723d431ea5b94462576a69e4642b240 | no |
| A5/results.ndjson | a874652bbaf939f6494f063c3335bb0c33e07ada0d715a68c86b5e50c037c01c | no |
| B1/results.ndjson | e385872c0c97c280bfff6a72950967827a2ef09e0d2a33fa650b294f7a0a1240 | no |
| B2/results.ndjson | 688973b1464b6202bf8c3ce5efdaa733d9cb6262d946d29a6b024bcb061ff4ce | no |
| B3/results.ndjson | f459d62d11fd8190d67798b64bbd7cbb9607bcb05a42c3a0c664bbad4c97d4d1 | no |
| C1/results.ndjson | f82df0b454fdc25170e61417cd847f0d6198a3d498dd14a5a19d9b30f688841a | no |
| C2/results.ndjson | d85a5ca8493e5a1b77632ce961583ce55169af6b0a96e77e3daa1942fb86b342 | no |
| C3/results.ndjson | e3a63c02fe19ba5ee18798c274998c91dfff90b1f9fef6f520b999df7fc2e70c | no |
| A1/manifest.json | 31ef71277cc0925a0845c1b8c52a9c5e5ceba0e9ed35526f58e5b9fdbe8a0174 | chunks/A1/ |
| A2/manifest.json | b00cd17db354fd6d63958818eb273c44990f4a6665610f501b11a783407c88c1 | chunks/A2/ |
| A3/manifest.json | 01c3d94216a98be921283b6f18c0d1f61984919bd6e5baec0f0ef8fa5960478c | chunks/A3/ |
| A4/manifest.json | 6d811912b4682bb131bff86d3189bfdb0f9228c0c466f426773972ce013ef5c9 | chunks/A4/ |
| A5/manifest.json | 3cd6081dc20852aa63f04b2dc1e3d5e0427ad1862c956301ef08fee04ddc33cf | chunks/A5/ |
| B1/manifest.json | aaa22c017478223789c5e071c9c8a93ad50847fbf747ae74f7e1b1f9291f06f5 | chunks/B1/ |
| B2/manifest.json | ae1f69caeb22b27992b203b16a0a3ce3fe88858cac3b53ed1dd94c3119f8d162 | chunks/B2/ |
| B3/manifest.json | 5412138cdd0dd65b56917a7d4c140b3cd85dca56befc0b7de03b4a777a168730 | chunks/B3/ |
| C1/manifest.json | e086283be3e1ba28dc3a19b82f2658659689ef633ec323033a321c313f392a40 | chunks/C1/ |
| C2/manifest.json | 4bf389fb39d3436eac5d6aa0704aa90206c452824c6b02eaa567c2d2b4621063 | chunks/C2/ |
| C3/manifest.json | 7fffd26546cd83b4efb94ce29cf91c79cc3ea09760db6c0ff7c208aa1b5e7d47 | chunks/C3/ |
| <chunk>/judge-tests.json (all 11 identical) | 37e5391668ddb59c876f401375544b8ec2cf071e665668f03747a6a0af8c1534 | no |
| merged/verdicts.json | 39d54187ed93cfe0aa78428a67c3af8d566410cc147e7a93394e4a5461c1df8d | merged/ |
| merged/manifest.json | 02436f22c542df299d70081bce2728db6e0fc4ed923c577023ddad559e28fa74 | merged/ |
| parts-check.json | a6eda0d4c4e5b169f8d119de3339924245c8f932b71a607b0544f0a3b831bb75 | yes |
| tables.md (formatter output) | b94d7dad69646baaec582ce971c5b1fee846d25c052a1c947383535a259bdc6b | yes |
| merge.log | d58a6920cafdd1fcc52e687e225ec23c53d3752af7bc8d3e395dfae849e78eaa | no |

The committed copies under harness/records/2026-10-20-session-readout/ have the same sha256 (checked after copying). Formatter `readoutS-tables.mjs` 6344d79b…d448b and parts check `partsCheckS.mjs` e32fecce…a82, as in criterion §11.

## 7. The run's tables, as printed by readoutS-tables.mjs (excerpts, unedited)

The sections below are copied from `tables.md` without change: "Run and manifest" to the K2 base-cell intervals, then "Context". The K4 and K5 per-cell tables, the per-cell, per-persona K1 detail with G1 to G4 intervals for every variant, and the full descriptive table are in records/2026-10-20-session-readout/tables.md (1,753 lines).

## Run and manifest
| field | value |
|---|---|
| criterion status | frozen (eval-s1-1020, 2026-10-20). The freeze is the commit that first adds this file with this line; its hash and this file's sha256 at that commit go in §11, written in the next commit. Nothing below changes after the first scored number; a change after that is a new criterion and the old result stands. |
| freeze commit / frozen criterion sha256 | bdebacc27be85077074a43397bfce4876420d1a2 / 40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9 |
| run commit / criterion sha256 at the run commit | 743379aa6154bf7eadc6400b65897b5a851b6371 / 1798c8c28d4bebb1b65dc3c3eb514773191e93d0879af711be8611baeb2f6973 |
| paths changed after the freeze | company/ops/progress.md, company/personalization/eval/2026-10-20-session-criterion.md, company/personalization/eval/harness/cs/README.md, company/personalization/eval/harness/cs/RUN-PLAN-s1.md, company/personalization/eval/harness/cs/partsCheckS.mjs, company/personalization/eval/harness/cs/readoutS-tables.mjs, company/roles/memory/personalization-eval/2026-10-20-eval-s1-plan-1020.md |
| §11 formatter / parts check | 6344d79bf985b1d88980396febb4d87f71a8baa4384f15eeb9c4ced1331d448b / e32fecce11d3ebc3c56974cfb6156eacbee5216bfff93fb0d23acbedb45f2a82 |
| parts check | OK |
| S, seeds | 2000, 70001..72000 |
| candidate pin check | true |
| catalogue sha256, lessons | c65feabb2277d214a324e9869cfda1a6170fb1729b820fa5c823f3f515f8ff5f, 231 |
| model / composer / serving mode / session size | model-v0.4.4 / composer-v0.3-session / compose-session-serve-in-order / 5 |
| E1 / E3 | c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 / 0e120add6ada34da159d77bc7d994f092318b4bba802941f4477a4273fc1927a |
| node | v22.22.0 |
| unit errors | none |
| merged verdicts.json sha256 | 39d54187ed93cfe0aa78428a67c3af8d566410cc147e7a93394e4a5461c1df8d |

| chunk | §8 part | seconds | results lines (expected) | results.ndjson sha256 | manifest.json sha256 |
|---|---|---|---|---|---|
| A1 | A | 2777.154 | 84 (84) | cd69b88efb232bd756e661e512c0068776a4e1a90fd48521ab7a583eafd07d08 | 31ef71277cc0925a0845c1b8c52a9c5e5ceba0e9ed35526f58e5b9fdbe8a0174 |
| A2 | A | 2067.63 | 60 (60) | 01f82e2f0fd4dcb0b17e846dfa63b1f3072aee86948f7e0a5a39c7eeace0fcb0 | b00cd17db354fd6d63958818eb273c44990f4a6665610f501b11a783407c88c1 |
| A3 | A | 2024.305 | 60 (60) | 07d854c2efdc26373ca814a6c251d07ab319e05f9de2d372cc1936e26d3186e0 | 01c3d94216a98be921283b6f18c0d1f61984919bd6e5baec0f0ef8fa5960478c |
| A4 | A | 3027.897 | 90 (90) | 26faa5789fd46d82420cf952f7515cc0f723d431ea5b94462576a69e4642b240 | 6d811912b4682bb131bff86d3189bfdb0f9228c0c466f426773972ce013ef5c9 |
| A5 | A | 2048.527 | 60 (60) | a874652bbaf939f6494f063c3335bb0c33e07ada0d715a68c86b5e50c037c01c | 3cd6081dc20852aa63f04b2dc1e3d5e0427ad1862c956301ef08fee04ddc33cf |
| B1 | B | 2897.392 | 90 (90) | e385872c0c97c280bfff6a72950967827a2ef09e0d2a33fa650b294f7a0a1240 | aaa22c017478223789c5e071c9c8a93ad50847fbf747ae74f7e1b1f9291f06f5 |
| B2 | B | 2880.393 | 90 (90) | 688973b1464b6202bf8c3ce5efdaa733d9cb6262d946d29a6b024bcb061ff4ce | ae1f69caeb22b27992b203b16a0a3ce3fe88858cac3b53ed1dd94c3119f8d162 |
| B3 | B | 2885.324 | 90 (90) | f459d62d11fd8190d67798b64bbd7cbb9607bcb05a42c3a0c664bbad4c97d4d1 | 5412138cdd0dd65b56917a7d4c140b3cd85dca56befc0b7de03b4a777a168730 |
| C1 | C | 2899.576 | 90 (90) | f82df0b454fdc25170e61417cd847f0d6198a3d498dd14a5a19d9b30f688841a | e086283be3e1ba28dc3a19b82f2658659689ef633ec323033a321c313f392a40 |
| C2 | C | 2609.965 | 90 (90) | d85a5ca8493e5a1b77632ce961583ce55169af6b0a96e77e3daa1942fb86b342 | 4bf389fb39d3436eac5d6aa0704aa90206c452824c6b02eaa567c2d2b4621063 |
| C3 | C | 3125.514 | 90 (90) | e3a63c02fe19ba5ee18798c274998c91dfff90b1f9fef6f520b999df7fc2e70c | 7fffd26546cd83b4efb94ce29cf91c79cc3ea09760db6c0ff7c208aa1b5e7d47 |

Harness file sha256 (runS.mjs RUN_FILES): `harnessS.mjs` e1927b22024e… · `checksS.mjs` fc0d26a1c66d… · `runS.mjs` 04b69568f219… · `runS-worker.mjs` b7cba36dc4bb… · `../c3/harness3.mjs` fc9a98ca7138… · `../c3/learner3.mjs` 90925edaff58… · `../c3/world3.mjs` 0f0d3dbfd498… · `../c3/checks3.mjs` 872c469a6d71… · `../c3b/checks3b.mjs` 3a18559c00dc… · `../c3b/harness3b.mjs` 5ff1137a568f… · `../c2/harness2.mjs` 8140f5bf72cf… · `../c2/learner2.mjs` 36b4839ca97d… · `../c2/scorer2.mjs` 2518ae27f4b4… · `../c2/world2.mjs` 876aa1b875ae… · `../harness.mjs` 458f3dc19b10… · `../personas.copy.mjs` 9cb7a911a5aa…

## Judge checks (criterion §5; a failure stops the run)
S-ID0 true (8 files vs readout 3 at b1ae294aeb5e3a7f9fa32c2646ced7678c1f78d7) · T5c true · K-e true (231 lessons, 70001..72000 (2000)) · GAM pin true · S-ID1 true (360 episode pairs) · S-ID2 true (72 episodes)

## Validity of each session arm (criterion §5; any failure makes the arm INVALID)
| arm | INVALID | T1 replay | compositions checked (T2S/T3S/NM/T4S) | T2S | T3S | NM | T4S (picks checked) | unit errors | first fails |
|---|---|---|---|---|---|---|---|---|---|
| gam-session+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-v3+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-no-cov+fixed | no | curious-newcomer true; returning-expert true | 131 | true | true | true | true (655) | none | – |
| gam-session-v3-edpbase+fixed | no | curious-newcomer true; returning-expert true | 132 | true | true | true | true (660) | none | – |

## Readings K1 to K5 (criterion §3; keep or kill is vp-personalization's, VP record §4)
| arm | K1 gate | K1 cells named | K2 veto (simultaneous) | K2 losses | unadjusted clear losses: base cell (VP §9 O12 disclosure) | unadjusted clear losses: one-at-a-time cells | K4 subject mix | K4 cells named | K5 copy gate | K5 false / moved served |
|---|---|---|---|---|---|---|---|---|---|---|
| gam-session+fixed | **FAIL** | base | **VETO** | interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|wanderer | interleave:base|wanderer | interleave:forgetScale-low|wanderer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|returning-expert, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|wanderer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|returning-expert, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:revisitStopScale-low|wanderer, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 43863 / 3998634 (0.011) |
| gam-session-v3+fixed | **FAIL** | base | **VETO** | interleave:base|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer | interleave:base|wanderer | interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|wanderer, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|wanderer, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|wanderer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|wanderer, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 48057 / 4276871 (0.011) |
| gam-session-no-cov+fixed | **FAIL** | base | **VETO** | interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|wanderer | interleave:base|wanderer | interleave:forgetScale-low|wanderer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|single-subject-crammer, interleave:forgetShape-high|returning-expert, interleave:kSpread-low|single-subject-crammer, interleave:kSpread-low|wanderer, interleave:kSpread-high|wanderer, interleave:relearn-low|single-subject-crammer, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-low|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|wanderer, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:pullScale-low|wanderer, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|returning-expert, interleave:pullScale-high|wanderer, interleave:revisitSlotCost-low|wanderer, interleave:priorRateMult-high|wanderer | **HOLDS** | – | **COPY-BLOCKED** | 44713 / 4132188 (0.011) |
| gam-session-v3-edpbase+fixed | **FAIL** | base | **VETO** | interleave:base|curious-newcomer, interleave:base|struggling-repeater, interleave:base|wanderer, interleave:base|lapsed-returner, interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|struggling-repeater, interleave:forgetScale-low|wanderer, interleave:forgetScale-low|lapsed-returner, interleave:forgetScale-high|curious-newcomer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetScale-high|lapsed-returner, interleave:forgetShape-low|curious-newcomer, interleave:forgetShape-low|struggling-repeater, interleave:forgetShape-low|wanderer, interleave:forgetShape-high|curious-newcomer, interleave:forgetShape-high|struggling-repeater, interleave:forgetShape-high|wanderer, interleave:kSpread-low|curious-newcomer, interleave:kSpread-low|struggling-repeater, interleave:kSpread-low|wanderer, interleave:kSpread-high|curious-newcomer, interleave:kSpread-high|struggling-repeater, interleave:kSpread-high|wanderer, interleave:revisitStrengthen-low|curious-newcomer, interleave:revisitStrengthen-low|struggling-repeater, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-high|curious-newcomer, interleave:revisitStrengthen-high|struggling-repeater, interleave:revisitStrengthen-high|wanderer, interleave:relearn-low|curious-newcomer, interleave:relearn-low|struggling-repeater, interleave:relearn-low|wanderer, interleave:relearn-high|curious-newcomer, interleave:relearn-high|struggling-repeater, interleave:relearn-high|wanderer, interleave:priorKnowledgeMean-low|curious-newcomer, interleave:priorKnowledgeMean-low|struggling-repeater, interleave:priorKnowledgeMean-low|wanderer, interleave:priorKnowledgeMean-low|lapsed-returner, interleave:priorKnowledgeMean-high|curious-newcomer, interleave:priorKnowledgeMean-high|struggling-repeater, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|struggling-repeater, interleave:learnRate-high|wanderer, interleave:learnRate-high|lapsed-returner, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|curious-newcomer, interleave:pullScale-low|struggling-repeater, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|struggling-repeater, interleave:pullScale-high|wanderer, interleave:pullScale-high|lapsed-returner, interleave:revisitSlotCost-low|curious-newcomer, interleave:revisitSlotCost-low|struggling-repeater, interleave:revisitSlotCost-low|wanderer, interleave:revisitSlotCost-high|curious-newcomer, interleave:revisitSlotCost-high|struggling-repeater, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|struggling-repeater, interleave:revisitStopScale-low|lapsed-returner, interleave:revisitStopScale-high|curious-newcomer, interleave:revisitStopScale-high|struggling-repeater, interleave:priorRateMult-low|curious-newcomer, interleave:priorRateMult-low|struggling-repeater, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-high|curious-newcomer, interleave:priorRateMult-high|struggling-repeater, interleave:priorRateMult-high|wanderer, interleave:priorRateMult-high|lapsed-returner | interleave:base|curious-newcomer, interleave:base|struggling-repeater, interleave:base|wanderer, interleave:base|lapsed-returner | interleave:forgetScale-low|curious-newcomer, interleave:forgetScale-low|struggling-repeater, interleave:forgetScale-low|wanderer, interleave:forgetScale-low|lapsed-returner, interleave:forgetScale-high|curious-newcomer, interleave:forgetScale-high|struggling-repeater, interleave:forgetScale-high|wanderer, interleave:forgetScale-high|lapsed-returner, interleave:forgetShape-low|curious-newcomer, interleave:forgetShape-low|struggling-repeater, interleave:forgetShape-low|wanderer, interleave:forgetShape-low|lapsed-returner, interleave:forgetShape-high|curious-newcomer, interleave:forgetShape-high|struggling-repeater, interleave:forgetShape-high|wanderer, interleave:forgetShape-high|lapsed-returner, interleave:kSpread-low|curious-newcomer, interleave:kSpread-low|struggling-repeater, interleave:kSpread-low|wanderer, interleave:kSpread-low|lapsed-returner, interleave:kSpread-high|curious-newcomer, interleave:kSpread-high|struggling-repeater, interleave:kSpread-high|wanderer, interleave:kSpread-high|lapsed-returner, interleave:revisitStrengthen-low|curious-newcomer, interleave:revisitStrengthen-low|struggling-repeater, interleave:revisitStrengthen-low|wanderer, interleave:revisitStrengthen-low|lapsed-returner, interleave:revisitStrengthen-high|curious-newcomer, interleave:revisitStrengthen-high|struggling-repeater, interleave:revisitStrengthen-high|wanderer, interleave:revisitStrengthen-high|lapsed-returner, interleave:relearn-low|curious-newcomer, interleave:relearn-low|struggling-repeater, interleave:relearn-low|wanderer, interleave:relearn-low|lapsed-returner, interleave:relearn-high|curious-newcomer, interleave:relearn-high|struggling-repeater, interleave:relearn-high|wanderer, interleave:relearn-high|lapsed-returner, interleave:priorKnowledgeMean-low|curious-newcomer, interleave:priorKnowledgeMean-low|struggling-repeater, interleave:priorKnowledgeMean-low|wanderer, interleave:priorKnowledgeMean-low|lapsed-returner, interleave:priorKnowledgeMean-high|curious-newcomer, interleave:priorKnowledgeMean-high|struggling-repeater, interleave:priorKnowledgeMean-high|wanderer, interleave:learnRate-high|curious-newcomer, interleave:learnRate-high|struggling-repeater, interleave:learnRate-high|wanderer, interleave:learnRate-high|lapsed-returner, interleave:prereqPenalty-low|curious-newcomer, interleave:prereqPenalty-low|single-subject-crammer, interleave:prereqPenalty-low|struggling-repeater, interleave:prereqPenalty-low|wanderer, interleave:prereqPenalty-low|lapsed-returner, interleave:pullScale-low|curious-newcomer, interleave:pullScale-low|struggling-repeater, interleave:pullScale-high|curious-newcomer, interleave:pullScale-high|struggling-repeater, interleave:pullScale-high|wanderer, interleave:pullScale-high|lapsed-returner, interleave:revisitSlotCost-low|curious-newcomer, interleave:revisitSlotCost-low|struggling-repeater, interleave:revisitSlotCost-low|wanderer, interleave:revisitSlotCost-low|lapsed-returner, interleave:revisitSlotCost-high|curious-newcomer, interleave:revisitSlotCost-high|single-subject-crammer, interleave:revisitSlotCost-high|struggling-repeater, interleave:revisitSlotCost-high|wanderer, interleave:revisitStopScale-low|curious-newcomer, interleave:revisitStopScale-low|struggling-repeater, interleave:revisitStopScale-low|wanderer, interleave:revisitStopScale-low|lapsed-returner, interleave:revisitStopScale-high|curious-newcomer, interleave:revisitStopScale-high|struggling-repeater, interleave:revisitStopScale-high|wanderer, interleave:slots-low|curious-newcomer, interleave:slots-low|struggling-repeater, interleave:slots-high|struggling-repeater, interleave:slots-high|lapsed-returner, interleave:priorRateMult-low|curious-newcomer, interleave:priorRateMult-low|struggling-repeater, interleave:priorRateMult-low|wanderer, interleave:priorRateMult-low|lapsed-returner, interleave:priorRateMult-high|curious-newcomer, interleave:priorRateMult-high|struggling-repeater, interleave:priorRateMult-high|wanderer, interleave:priorRateMult-high|lapsed-returner | **HOLDS** | – | **COPY-BLOCKED** | 892459 / 10994914 (0.081) |

### K3 attribution (base cell; tie to the simpler)
| contrast | complex | simpler | wins | clear losses (simultaneous, 6) | preferred | Δ by persona (lo, hi) | one-at-a-time wins (context) |
|---|---|---|---|---|---|---|---|
| K3a | gam-session+fixed | gam-session-no-cov+fixed | 0 | none | **gam-session-no-cov+fixed** | curious-newcomer +0.0001 (-0.0000, +0.0001); single-subject-crammer +0.0001 (-0.0002, +0.0004); struggling-repeater +0.0001 (-0.0000, +0.0003); returning-expert +0.0000 (-0.0000, +0.0001); wanderer -0.0001 (-0.0001, +0.0000); lapsed-returner +0.0001 (-0.0001, +0.0002) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |
| K3b | gam-session-v3+fixed | gam-session+fixed | 0 | none | **gam-session+fixed** | curious-newcomer -0.0000 (-0.0002, +0.0001); single-subject-crammer +0.0007 (+0.0003, +0.0011); struggling-repeater -0.0000 (-0.0003, +0.0003); returning-expert +0.0000 (-0.0000, +0.0001); wanderer -0.0001 (-0.0002, +0.0001); lapsed-returner +0.0000 (-0.0002, +0.0002) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |
| K3c | gam-session-v3-edpbase+fixed | gam-session-v3+fixed | 0 | curious-newcomer, struggling-repeater, wanderer, lapsed-returner | **gam-session-v3+fixed** | curious-newcomer -0.0031 (-0.0040, -0.0022); single-subject-crammer +0.0005 (-0.0004, +0.0013); struggling-repeater -0.0029 (-0.0037, -0.0021); returning-expert +0.0015 (+0.0008, +0.0021); wanderer -0.0014 (-0.0022, -0.0006); lapsed-returner -0.0013 (-0.0021, -0.0005) | forgetScale-low 0; forgetScale-high 0; forgetShape-low 0; forgetShape-high 0; kSpread-low 0; kSpread-high 0; revisitStrengthen-low 0; revisitStrengthen-high 0; relearn-low 0; relearn-high 0; priorKnowledgeMean-low 0; priorKnowledgeMean-high 0; learnRate-low 0; learnRate-high 0; prereqPenalty-low 0; prereqPenalty-high 0; pullScale-low 0; pullScale-high 0; revisitSlotCost-low 0; revisitSlotCost-high 0; revisitStopScale-low 0; revisitStopScale-high 0; slots-low 0; slots-high 0; priorRateMult-low 0; priorRateMult-high 0 |

### K2 base-cell simultaneous intervals (Bonferroni, 6 personas)
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| gam-session+fixed | -0.0002 (-0.0007, +0.0003) | -0.0005 (-0.0013, +0.0004) | -0.0001 (-0.0008, +0.0006) | -0.0001 (-0.0002, +0.0001) | -0.0003 (-0.0007, +0.0000) | -0.0001 (-0.0007, +0.0005) |
| gam-session-v3+fixed | -0.0002 (-0.0007, +0.0004) | +0.0003 (-0.0006, +0.0011) | -0.0001 (-0.0008, +0.0006) | -0.0000 (-0.0002, +0.0002) | -0.0004 (-0.0007, -0.0000) | -0.0001 (-0.0007, +0.0005) |
| gam-session-no-cov+fixed | -0.0002 (-0.0007, +0.0003) | -0.0005 (-0.0014, +0.0003) | -0.0003 (-0.0009, +0.0004) | -0.0001 (-0.0003, +0.0001) | -0.0003 (-0.0006, +0.0001) | -0.0002 (-0.0008, +0.0004) |
| gam-session-v3-edpbase+fixed | -0.0033 (-0.0046, -0.0020) | +0.0007 (-0.0004, +0.0019) | -0.0030 (-0.0041, -0.0019) | +0.0014 (+0.0006, +0.0023) | -0.0018 (-0.0028, -0.0007) | -0.0014 (-0.0025, -0.0003) |


## Context (no rule reads these; criterion §4)
### gam-session+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0004 to +0.0002 |  |  |
| single-subject-crammer | +0.0001 | -0.0004 to +0.0007 |  |  |
| struggling-repeater | +0.0004 | -0.0001 to +0.0008 |  |  |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  |
| wanderer | -0.0001 | -0.0003 to +0.0001 |  |  |
| lapsed-returner | -0.0004 | -0.0008 to +0.0001 |  |  |

### gam-session-v3+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0004 to +0.0002 |  |  |
| single-subject-crammer | +0.0009 | +0.0003 to +0.0015 |  |  |
| struggling-repeater | +0.0004 | -0.0001 to +0.0008 |  |  |
| returning-expert | +0.0001 | -0.0000 to +0.0002 |  |  |
| wanderer | -0.0002 | -0.0004 to +0.0000 |  |  |
| lapsed-returner | -0.0004 | -0.0008 to +0.0000 |  |  |

### gam-session-no-cov+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0002 | -0.0005 to +0.0001 |  |  |
| single-subject-crammer | +0.0001 | -0.0005 to +0.0007 |  |  |
| struggling-repeater | +0.0002 | -0.0002 to +0.0007 |  |  |
| returning-expert | +0.0001 | -0.0001 to +0.0002 |  |  |
| wanderer | -0.0000 | -0.0003 to +0.0002 |  |  |
| lapsed-returner | -0.0005 | -0.0009 to -0.0000 |  |  |

### gam-session-v3-edpbase+fixed vs gam+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | -0.0032 | -0.0041 to -0.0023 |  |  |
| single-subject-crammer | +0.0013 | +0.0005 to +0.0022 |  |  |
| struggling-repeater | -0.0025 | -0.0033 to -0.0017 |  |  |
| returning-expert | +0.0016 | +0.0009 to +0.0022 |  |  |
| wanderer | -0.0016 | -0.0023 to -0.0008 |  |  |
| lapsed-returner | -0.0016 | -0.0024 to -0.0008 |  |  |

### gam+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails none, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0001 | -0.0005 to +0.0004 |  |  | +0.0064 (+0.0059 to +0.0068) | -0.4910 (-0.5146 to -0.4674) | -0.0395 (-0.0406 to -0.0383) | -0.0535 (-0.1142 to +0.0072) | holds | holds | holds | holds |
| single-subject-crammer | -0.0006 | -0.0012 to +0.0000 |  |  | -0.0007 (-0.0011 to -0.0003) | -0.4225 (-0.6305 to -0.2145) | -0.0137 (-0.0148 to -0.0126) | -0.1735 (-0.3022 to -0.0448) | holds | holds | holds | holds |
| struggling-repeater | -0.0005 | -0.0010 to +0.0001 |  |  | +0.0068 (+0.0062 to +0.0074) | -0.5800 (-0.6890 to -0.4710) | -0.0484 (-0.0500 to -0.0468) | -0.1070 (-0.1957 to -0.0183) | holds | holds | holds | holds |
| returning-expert | -0.0001 | -0.0003 to +0.0000 |  |  | -0.0020 (-0.0023 to -0.0017) | +0.0220 (+0.0074 to +0.0366) | -0.0047 (-0.0054 to -0.0039) | -0.0115 (-0.0394 to +0.0164) | holds | holds | holds | holds |
| wanderer | -0.0002 | -0.0005 to +0.0001 |  |  | +0.0032 (+0.0028 to +0.0037) | -0.3915 (-0.4164 to -0.3666) | -0.0271 (-0.0283 to -0.0260) | -0.0490 (-0.0952 to -0.0028) | holds | holds | holds | holds |
| lapsed-returner | +0.0003 | -0.0002 to +0.0007 |  |  | +0.0032 (+0.0026 to +0.0037) | -0.1695 (-0.2744 to -0.0646) | -0.0327 (-0.0345 to -0.0310) | +0.0250 (-0.0481 to +0.0981) | holds | holds | holds | holds |

### draft-rules+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, struggling-repeater:G1, wanderer:G1, lapsed-returner:G1, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0006 | -0.0015 to +0.0004 |  |  | +0.0547 (+0.0530 to +0.0565) | -0.3590 (-0.3919 to -0.3261) | -0.0725 (-0.0752 to -0.0698) | -0.0515 (-0.1885 to +0.0855) | **fails** | holds | holds | holds |
| single-subject-crammer | +0.0023 | +0.0015 to +0.0031 |  |  | +0.0329 (+0.0316 to +0.0341) | +0.5210 (+0.3013 to +0.7407) | -0.0475 (-0.0492 to -0.0458) | +0.7180 (+0.5449 to +0.8911) | holds | holds | holds | holds |
| struggling-repeater | -0.0001 | -0.0009 to +0.0007 |  |  | +0.0559 (+0.0539 to +0.0579) | -0.5310 (-0.6462 to -0.4158) | -0.0839 (-0.0868 to -0.0810) | -0.0445 (-0.1862 to +0.0972) | **fails** | holds | holds | holds |
| returning-expert | +0.0022 | +0.0016 to +0.0029 |  |  | +0.0477 (+0.0465 to +0.0489) | +1.2575 (+1.2138 to +1.3012) | -0.0400 (-0.0416 to -0.0383) | +0.5555 (+0.4298 to +0.6812) | holds | holds | holds | holds |
| wanderer | +0.0002 | -0.0006 to +0.0010 |  |  | +0.0544 (+0.0527 to +0.0562) | -0.1665 (-0.2053 to -0.1277) | -0.0688 (-0.0712 to -0.0664) | +0.1265 (-0.0093 to +0.2623) | **fails** | holds | holds | holds |
| lapsed-returner | +0.0004 | -0.0004 to +0.0012 |  |  | +0.0721 (+0.0699 to +0.0743) | -0.8065 (-0.9088 to -0.7042) | -0.1250 (-0.1281 to -0.1219) | +0.0765 (-0.0699 to +0.2229) | **fails** | holds | holds | holds |

### random+fixed vs default-order+fixed (interleave:base): wins 0 of 6, harmed none, guardrail fails curious-newcomer:G1, curious-newcomer:G3, single-subject-crammer:G1, single-subject-crammer:G3, struggling-repeater:G1, struggling-repeater:G3, returning-expert:G1, returning-expert:G3, wanderer:G1, wanderer:G3, lapsed-returner:G1, lapsed-returner:G3, beats: **no**
| persona | Δ R₇ | 95% interval | win | harm | G1 Δ top-domain share (interval) | G2 Δ concepts (interval) | G3 Δ prereq-first (interval) | G4 Δ gain (interval) | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0040 | -0.0056 to -0.0025 |  |  | +0.1621 (+0.1601 to +0.1640) | +0.3175 (+0.2785 to +0.3565) | +0.1161 (+0.1132 to +0.1190) | -0.6215 (-0.8475 to -0.3955) | **fails** | holds | **fails** | holds |
| single-subject-crammer | +0.0042 | +0.0030 to +0.0053 |  |  | +0.1540 (+0.1522 to +0.1557) | -0.2350 (-0.4581 to -0.0119) | +0.1148 (+0.1118 to +0.1177) | +1.3035 (+1.0507 to +1.5563) | **fails** | holds | **fails** | holds |
| struggling-repeater | -0.0023 | -0.0035 to -0.0011 |  |  | +0.1607 (+0.1585 to +0.1629) | -0.1170 (-0.2289 to -0.0051) | +0.1103 (+0.1072 to +0.1135) | -0.4860 (-0.7061 to -0.2659) | **fails** | holds | **fails** | holds |
| returning-expert | +0.0030 | +0.0019 to +0.0040 |  |  | +0.1621 (+0.1605 to +0.1637) | +1.6230 (+1.5693 to +1.6767) | +0.1012 (+0.0984 to +0.1040) | +0.6735 (+0.4656 to +0.8814) | **fails** | holds | **fails** | holds |
| wanderer | -0.0009 | -0.0021 to +0.0003 |  |  | +0.1611 (+0.1591 to +0.1630) | +0.5920 (+0.5491 to +0.6349) | +0.1049 (+0.1019 to +0.1079) | -0.2140 (-0.4328 to +0.0048) | **fails** | holds | **fails** | holds |
| lapsed-returner | -0.0003 | -0.0015 to +0.0008 |  |  | +0.1587 (+0.1563 to +0.1610) | +0.0740 (-0.0403 to +0.1883) | +0.0950 (+0.0916 to +0.0984) | +0.0370 (-0.1699 to +0.2439) | **fails** | holds | **fails** | holds |

### oracle-order+fixed vs default-order+fixed (interleave:base): wins 6 of 6, harmed none, guardrail fails none, beats: yes
| persona | Δ | 95% interval | win | harm |
|---|---|---|---|---|
| curious-newcomer | +0.1128 | +0.1111 to +0.1144 | win |  |
| single-subject-crammer | +0.0829 | +0.0817 to +0.0841 | win |  |
| struggling-repeater | +0.0849 | +0.0836 to +0.0862 | win |  |
| returning-expert | +0.1512 | +0.1502 to +0.1522 | win |  |
| wanderer | +0.1072 | +0.1060 to +0.1084 | win |  |
| lapsed-returner | +0.1080 | +0.1067 to +0.1093 | win |  |

Ordering headroom in this world (oracle-order vs default-order, criterion 2 §2.3): **HEADROOM**

