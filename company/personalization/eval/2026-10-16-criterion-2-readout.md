# Criterion 2 readout (readout 2): headroom first, then review timing

owner: personalization-eval (Uma) · run: eval-k2-1016 · board: W-1549 · brief: company/personalization/batches/2026-10-16-batch-3.md#k2 (dispatch 20261016T235713671Z-vp-personalization-62375d84)
criterion: company/personalization/eval/2026-10-16-criterion-2.md, **frozen at commit 869f62505f8f4a16a7ce102a5932a1842bd73894** (sha256 of the frozen text 8671aaaf44d4cdc1aaa89a7f901ab283fe3f0775d5ecdc3165d0be244432d3b5). The run's manifest hashes the file as of commit b89f259, which adds only the freeze line.
phase A record, beside this one and unchanged: company/personalization/eval/2026-10-16-phase-a-readout-1.md (readout 1, FAIL for model-v0.2.1, reproduced byte for byte). This readout does not re-run it, and its numbers are not comparable with readout 1's: the world, the metric and the episode differ (criterion 2 §9).
for: vp-personalization (V, W-1551) and the WBR. **Published unedited**: §A is the output of harness/c2/readout2-tables.mjs on the run's manifest.json, verdicts.json and results.ndjson, pasted as printed; §1 to §9 quote it. I make no keep or kill recommendation.

## 0. What this readout is

- **What was judged:** six arms against the reference (`default-order` + the product's fixed schedule [1, 3, 7, 21]): `oracle-order` (judge's reference), `draft-rules`, `random`, `gam` frozen at model-v0.2.2, `oracle-review` (judge's reference, θ chosen on tuning seeds 5001–5100), `none` (no revisits; reference row), and the candidate **review-timing-v1** (company/personalization/model/sim/review-timing.ts, frozen at a0bd249, sha256 afddde70d79aacf9fb30e7e37322565a4395e18ee71d99267345e90ed9118157, matched at run time).
- **Primary:** R₇, expected knowledge 7 days after the last session, per lesson the reference arm completed (criterion §1.3). R₁ and R₃₀ reported.
- **Rule:** phase A's (criterion §2.1): beats = wins (lower 95% bound > 0 and Δ ≥ 0.01) in at least 4 of 6 personas, no harm, guardrails hold. PASS needs the base cell and all 19 one-at-a-time cells. Headroom readings: wins only, base cell, 4 of 6.
- **Seeds:** S = 2000, seeds 1001–3000 (criterion §1.4; the S rule gave 2637, capped at 2000 as written in K1). Tuning seeds 5001–5100 for oracle-review's θ only.
- **Changes to criterion 2 after the first scored number: none.**

## 1. Verdicts (base cell and the 19 one-at-a-time cells; every number is in §A)

| Question | Reading under the frozen rule | Read by |
|---|---|---|
| **Ordering headroom:** `oracle-order` vs `default-order` | **HEADROOM.** Wins in 6 of 6 personas in the base cell (Δ R₇ +0.098 to +0.158), and 6 of 6 in every one-at-a-time cell | pre-commitment 3 |
| **Review headroom:** `oracle-review` vs fixed | **HEADROOM.** Wins in 6 of 6 personas in the base cell (Δ R₇ +0.176 to +0.305); 6 of 6 in every one-at-a-time cell except forgetShape-high (5 of 6) | V2 |
| `gam` (model-v0.2.2 as frozen) vs `default-order` | **FAIL.** 0 wins in the base cell (Δ R₇ +0.0009 to +0.0025, all below δ_min 0.01); 0 wins in every cell | pre-commitment 4 |
| `gam` vs `draft-rules` | **FAIL.** 0 wins (Δ R₇ −0.0065 to −0.0010) | phase A's second pair, carried |
| `draft-rules` vs `default-order` (named pair) | **FAIL.** 0 wins (Δ R₇ +0.0027 to +0.0075); and G1 (top-domain share) fails in 6 of 6 personas | reported (Q5) |
| **Candidate review-timing-v1 vs fixed** | **FAIL.** 0 wins in the base cell (Δ R₇ −0.0078 to −0.0044, negative in all six, none past δ_harm); the NEW guardrail fails in 4 of 6 personas; 0 wins in every one-at-a-time cell | V3 |

No arm is INVALID: T1–T4 pass for draft-rules, random and gam; R1–R4 pass for the candidate; the judge tests T5–T9 (with K2's T7f–h) pass. Errors: 0 in both parts.

## 2. What the two headroom readings can and cannot show (stated before reading them, criterion §2.3, §2.4, F1 O1, O2)

- **Ordering.** `oracle-order` reads the hidden state and is greedy, so HEADROOM says a full-knowledge one-step ordering moves R₇ by about 0.10 to 0.16 in this world. It does not say any rule a product can run gets near it: the three that can (draft-rules, gam, random) gain between −0.001 and +0.008 (§A, "Δ vs the reference by horizon", H = 7). F1 O1 warned that part of the oracle's gain may be refreshing prior-known concepts, valued about like new learning under L4 (F1 N7, unsourced). **I did not build O1's split of the oracle's gain into prior-known and new picks**, so I cannot say how much of the +0.10 to +0.16 that is.
- **Review.** `oracle-review` chose θ = 0.3 in the base cell for every persona (§A, "Oracle-review θ"), the lowest value on its grid: it brings back only lessons whose hidden recall is below 0.3. It served revisits on 22% to 35% of cards against the fixed schedule's 67% to 82%, completed 2 to 4 times as many new lessons, and brought lessons back **later** than the fixed schedule would on about 145 to 167 occasions per episode (V4 counts, §A "Descriptive"). The reference row `default-order + none` (no revisits ever) also beats the fixed schedule at R₇, by +0.114 to +0.202 (§A, "Reference rows"). From the level table (§A, H = 7), `oracle-review` sits above `none` by about 0.05 to 0.10 per persona (my subtraction of the two means; no interval computed). So, in this world, most of the review headroom is what the fixed schedule's revisits cost in new lessons not shown, and a smaller part is what well-timed revisits add. The reading under V2 is still HEADROOM as the rule is written.
- **The world prices a revisit at one new card**, one for one (B6, below). That price, not learning evidence, drives the `none` row.

## 3. Scope line (F1 B6, as committed in criterion §11)

These results hold for a revisits-first feed of 12 cards per session (AMD-008 F2 as drafted, status proposed), not for the shipped Feed.tsx interleave (at most one revisit per three new lessons). The 12-card session length and the stop hazard after a revisit are unsourced.

## 4. The LOAD guardrail per persona (the VP's stated reading at V, W-1551), and the candidate's other guardrails

Candidate vs fixed, base cell, paired over 2000 seeds (from §A, "candidate vs fixed: base cell"):

| persona | Δ revisit share [95% CI] | LOAD (upper end ≤ +0.10) | Δ new lessons [95% CI] | NEW (relative fall ≤ 10%) | G1 |
|---|---|---|---|---|---|
| curious-newcomer | +0.0120 [+0.0114, +0.0126] | holds | −1.32 [−1.39, −1.25] | holds | holds |
| single-subject-crammer | +0.0248 [+0.0239, +0.0258] | holds | −3.27 [−3.42, −3.12] | **fails** | holds |
| struggling-repeater | +0.0238 [+0.0228, +0.0248] | holds | −2.18 [−2.28, −2.08] | **fails** | holds |
| returning-expert | +0.0212 [+0.0205, +0.0219] | holds | −2.95 [−3.04, −2.85] | **fails** | holds |
| wanderer | +0.0214 [+0.0207, +0.0222] | holds | −2.40 [−2.49, −2.31] | holds | holds |
| lapsed-returner | +0.0268 [+0.0258, +0.0279] | holds | −2.40 [−2.50, −2.30] | **fails** | holds |

The candidate adds 1.2 to 2.7 points of revisit share (1.3 to 3.4 extra revisits per 14-day episode, §A "Descriptive") and shows 1.3 to 3.3 fewer new lessons. It never brings a lesson back later than the fixed schedule (V4 "later" = 0.0 in every persona) and brings 7 to 16 lessons back earlier per episode. The base-cell R₇ result is negative in all six personas without a harm (no Δ ≤ −0.01). In the one-at-a-time cells the candidate harms 1 persona in relearn-high and 2 in learnRate-high.

## 5. Recall at every delay (base cell)

R₁, R₇ (primary) and R₃₀ levels and Δ against the reference are in §A ("Recall level by horizon" and "Δ vs the reference by horizon"). The candidate's Δ: R₁ −0.009 to −0.016; R₇ −0.004 to −0.008; R₃₀ −0.0015 to +0.0016 (positive in struggling-repeater and lapsed-returner, both with intervals above 0). R1d, the phase-A-style next-session recall, is reported in §A "Descriptive" and is gameable by timing (criterion §1.3); it is not a pass input.

## 6. Δ beside the MDE (criterion §6, phase A §6's table, unchanged)

| Live learners per arm | MDE on live first-revisit recall (points) |
|---|---|
| 200 | 15.3 |
| 1,000 | 6.9 |
| 5,000 | 3.1 |
| 10,000 | 2.2 |

Largest base-cell |Δ R₇| per pair, in points: gam vs default-order 0.25; gam vs draft-rules 0.65; draft-rules vs default-order 0.75; candidate vs fixed 0.78. Every one is below the smallest MDE in the table. The headroom references (10 to 30 points) are oracles, not rules a product can run. Caution, as written in the criterion: R₇ is a final-test read the product cannot observe live, so the table is a scale, not a forecast.

## 7. The model, stated (F1 notes that the readout must carry)

- **N6** prior knowledge: between-learner SD fixed at 0.15, not swept; no between-lesson SD in the world. **N7** a prior-known concept's clock starts at the episode start (L4), unsourced in both directions. **N9** the stop hazard after a revisit and the 1-minute / 2-minute card costs are guesses; only a low cell (0.5) was run. **N11** guess floor 0.2, basis the 3-option format (E1 `guessRecall` 0.08 / 0.22 / 0.35), not swept. **N12** the fastest persona in the forgetting-high cell runs at k ≈ 0.27, above E1's high. **N13** the learner returns every day for 14 days; irregular returns are not in the world, and the 21-day step is reached only by pre-history lessons. **N14** every k anchor is cued recall; the revisit is 3-option recognition, so the world's k is an upper bound.
- **K2 changes made in answer to F1 before the freeze** (criterion §1.2 L2′, L7–L10, §11): forgetting shape after day 7 (E1 ratio 0.27, swept 0.2 and 1.0); a learner × lesson spread of k (SD of log k 0.4, swept 0.2 and 0.7); lag-dependent strengthening anchored at E1's 0.60 and 0.35 (the shape between them is mine, unsourced; constant cells at 0.35 and 0.60); only retrievals strengthen; pre-history drawn through the episode's law; learnRate pre-boost (0.60).
- **Power.** S = 2000 is the cap; the rule asked for 2637 for the noisiest persona (criterion §1.4). The intervals in §A are narrow next to δ_min (for the candidate, half-widths of 0.0007 to 0.0013), so the cap did not decide any reading here.

## 8. Readout 1, and what this readout changes in it

Readout 1 (company/personalization/eval/2026-10-16-phase-a-readout-1.md) is the phase A record for model-v0.2.1 and stands. This readout judges a different world, metric and episode, with the GAM at model-v0.2.2 (novelty gated off). No readout 1 number is restated here, and none should be compared cell for cell.

## 9. Reproduction (for R2, W-1550; determinism only)

- Fresh worktree at **b89f2590f6031ae1dae9b24b4b2046eece8f6adb**, `npm ci`, Node v22.22.0. Check `sha256sum company/personalization/eval/2026-10-16-criterion-2.md` = 7d2c95fe1adc961bf577743d14e6ac8993060db9cf11fc48799a4fe261568161, the candidate file = afddde70…9118157, and each `fileSha256` in the manifests (company/personalization/eval/harness/records/2026-10-16-readout-2/{main,corners}/manifest.json). The E1 block is world2.mjs's own (inputs sha256 c8c09eac…f7482840); no `--inputs=` file is needed.
- Part 1: `NODE_NO_WARNINGS=1 node company/personalization/eval/harness/c2/run2.mjs --seeds=2000 --candidate=company/personalization/model/sim/review-timing.ts --jobs=4 --kinds=base,one-at-a-time --out=<dir1>` (4870 s here). Part 2: the same with `--kinds=corner --out=<dir2>` (1288 s). Any `--jobs`.
- Compare byte for byte (sha256 here): part 1 results.ndjson eb2cd760dad9981e2544f4a951e9732f1727ec0ae356ed2cfe1b1d6bfc4bd9f5, verdicts.json c34a1c492e039b0e8229c083bd5ddd637c509cfccb4844d6882f32213c03ca63; part 2 results.ndjson 450022ecb3de8128526cbec8ad981619249746487002ef3d19e0c21ab0b3ce93, verdicts.json 46ba2d75b6ba2e4bd6b19fd2338f4b3be63fdb09c870c9c5569ed19877d1f1e2. manifest.json may differ only in `seconds` and the candidate's absolute path. results.ndjson (0.74 GB and 0.22 GB) is not committed; verdicts.json and manifest.json are, beside the manifests.
- The tables in §A: `node company/personalization/eval/harness/c2/readout2-tables.mjs --main=<dir1> --corners=<dir2>`.

## A. The run's tables, as printed by readout2-tables.mjs (unedited)

## Run
commit b89f2590f6031ae1dae9b24b4b2046eece8f6adb · criterion sha256 7d2c95fe1adc961bf577743d14e6ac8993060db9cf11fc48799a4fe261568161 · status frozen · inputs sha256 c8c09eac7613720c7d1499958d5c416b57ed7d614e7e68eb8a132068f7482840 · S 2000 · seeds 1001..3000 · tuning 5001..5100 · kinds ["base","one-at-a-time"] · node v22.22.0 · 4869.808 s · model model-v0.2.2 · GAM fingerprint 38887e85b71840ca23ea0c5621c09348c0c342f48810370e24614522cd0efd20
candidate /home/user/s3c-k2/company/personalization/model/sim/review-timing.ts sha256 afddde70d79aacf9fb30e7e37322565a4395e18ee71d99267345e90ed9118157 · errors 0

## Validity (T1-T4, R1-R4) and judge tests
judge: T5 true · T6 true · T7 a:true b:true c:true d:true e:true f:true g:true h:true · T8 true · T9 true
- draft-rules+fixed: {"T1":true,"T2":true,"T3":true,"T4":true} invalid=false
- random+fixed: {"T1":true,"T2":true,"T3":true,"T4":true} invalid=false
- gam+fixed: {"T1":true,"T2":true,"T3":true,"T4":true} invalid=false
- default-order+candidate: {"T1":true,"R1":true,"R2R3":true,"R4":true} invalid=false

## Headroom readings (base cell, wins only)
### ordering: oracle-order vs default-order: **HEADROOM**
| persona | Δ R7 [95% CI] | win |
|---|---|---|
| curious-newcomer | +0.1582 [+0.1557, +0.1608] | win |
| single-subject-crammer | +0.0992 [+0.0971, +0.1012] | win |
| struggling-repeater | +0.1136 [+0.1113, +0.1158] | win |
| returning-expert | +0.1416 [+0.1398, +0.1433] | win |
| wanderer | +0.1195 [+0.1175, +0.1214] | win |
| lapsed-returner | +0.0981 [+0.0961, +0.1001] | win |
wins per cell: base 6 · forgetScale-low 6 · forgetScale-high 6 · forgetShape-low 6 · forgetShape-high 6 · kSpread-low 6 · kSpread-high 6 · revisitStrengthen-low 6 · revisitStrengthen-high 6 · relearn-low 6 · relearn-high 6 · priorKnowledgeMean-low 6 · priorKnowledgeMean-high 6 · learnRate-low 6 · learnRate-high 6 · prereqPenalty-low 6 · prereqPenalty-high 6 · pullScale-low 6 · pullScale-high 6 · revisitStopScale-low 6

### review: oracle-review vs fixed: **HEADROOM**
| persona | Δ R7 [95% CI] | win |
|---|---|---|
| curious-newcomer | +0.2743 [+0.2713, +0.2773] | win |
| single-subject-crammer | +0.2191 [+0.2159, +0.2224] | win |
| struggling-repeater | +0.1762 [+0.1732, +0.1791] | win |
| returning-expert | +0.3046 [+0.3021, +0.3071] | win |
| wanderer | +0.2705 [+0.2678, +0.2733] | win |
| lapsed-returner | +0.1811 [+0.1781, +0.1840] | win |
wins per cell: base 6 · forgetScale-low 6 · forgetScale-high 6 · forgetShape-low 6 · forgetShape-high 5 · kSpread-low 6 · kSpread-high 6 · revisitStrengthen-low 6 · revisitStrengthen-high 6 · relearn-low 6 · relearn-high 6 · priorKnowledgeMean-low 6 · priorKnowledgeMean-high 6 · learnRate-low 6 · learnRate-high 6 · prereqPenalty-low 6 · prereqPenalty-high 6 · pullScale-low 6 · pullScale-high 6 · revisitStopScale-low 6

## Pairs under the full rule
| pair | outcome | base wins | base harmed | base guardrail fails | cells not beaten |
|---|---|---|---|---|---|
| gam vs default-order | **FAIL** | 0 | none | none | base |
| gam vs draft-rules | **FAIL** | 0 | none | none | base |
| draft-rules vs default-order | **FAIL** | 0 | none | curious-newcomer:G1, single-subject-crammer:G1, struggling-repeater:G1, returning-expert:G1, wanderer:G1, lapsed-returner:G1 | base |
| candidate vs fixed | **FAIL** | 0 | none | single-subject-crammer:NEW, struggling-repeater:NEW, returning-expert:NEW, lapsed-returner:NEW | base |

### gam vs default-order: base cell
| persona | Δ R7 [95% CI] | win | harm | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0009 [-0.0001, +0.0019] |  |  | true | true | true | true |
| single-subject-crammer | +0.0025 [+0.0013, +0.0037] |  |  | true | true | true | true |
| struggling-repeater | +0.0015 [+0.0003, +0.0027] |  |  | true | true | true | true |
| returning-expert | +0.0010 [+0.0003, +0.0018] |  |  | true | true | true | true |
| wanderer | +0.0019 [+0.0009, +0.0029] |  |  | true | true | true | true |
| lapsed-returner | +0.0017 [+0.0007, +0.0028] |  |  | true | true | true | true |
per cell (beats / wins / harmed / guardrail fails): base no/0/0/0 · forgetScale-low no/0/0/0 · forgetScale-high no/0/0/0 · forgetShape-low no/0/0/0 · forgetShape-high no/0/0/0 · kSpread-low no/0/0/0 · kSpread-high no/0/0/0 · revisitStrengthen-low no/0/0/0 · revisitStrengthen-high no/0/0/0 · relearn-low no/0/0/0 · relearn-high no/0/0/0 · priorKnowledgeMean-low no/0/0/0 · priorKnowledgeMean-high no/0/0/0 · learnRate-low no/0/0/0 · learnRate-high no/0/0/0 · prereqPenalty-low no/0/0/0 · prereqPenalty-high no/0/0/0 · pullScale-low no/0/0/0 · pullScale-high no/0/0/0 · revisitStopScale-low no/0/0/0

### gam vs draft-rules: base cell
| persona | Δ R7 [95% CI] | win | harm | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0018 [-0.0036, +0.0001] |  |  | true | true | true | true |
| single-subject-crammer | -0.0036 [-0.0051, -0.0022] |  |  | true | true | true | true |
| struggling-repeater | -0.0027 [-0.0042, -0.0012] |  |  | true | true | true | true |
| returning-expert | -0.0065 [-0.0077, -0.0053] |  |  | true | true | true | true |
| wanderer | -0.0034 [-0.0048, -0.0020] |  |  | true | true | true | true |
| lapsed-returner | -0.0010 [-0.0023, +0.0003] |  |  | true | true | true | true |
per cell (beats / wins / harmed / guardrail fails): base no/0/0/0 · forgetScale-low no/0/0/0 · forgetScale-high no/0/0/0 · forgetShape-low no/0/0/0 · forgetShape-high no/0/0/0 · kSpread-low no/0/0/0 · kSpread-high no/0/0/0 · revisitStrengthen-low no/0/0/0 · revisitStrengthen-high no/0/0/0 · relearn-low no/0/0/0 · relearn-high no/0/0/0 · priorKnowledgeMean-low no/0/0/0 · priorKnowledgeMean-high no/0/0/0 · learnRate-low no/0/0/0 · learnRate-high no/0/0/0 · prereqPenalty-low no/0/0/0 · prereqPenalty-high no/0/0/0 · pullScale-low no/0/0/0 · pullScale-high no/0/0/0 · revisitStopScale-low no/0/0/0

### draft-rules vs default-order: base cell
| persona | Δ R7 [95% CI] | win | harm | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|---|---|
| curious-newcomer | +0.0027 [+0.0009, +0.0045] |  |  | false | true | true | true |
| single-subject-crammer | +0.0062 [+0.0047, +0.0076] |  |  | false | true | true | true |
| struggling-repeater | +0.0042 [+0.0028, +0.0057] |  |  | false | true | true | true |
| returning-expert | +0.0075 [+0.0062, +0.0087] |  |  | false | true | true | true |
| wanderer | +0.0053 [+0.0039, +0.0067] |  |  | false | true | true | true |
| lapsed-returner | +0.0028 [+0.0015, +0.0040] |  |  | false | true | true | true |
per cell (beats / wins / harmed / guardrail fails): base no/0/0/6 · forgetScale-low no/0/0/6 · forgetScale-high no/0/0/6 · forgetShape-low no/0/0/6 · forgetShape-high no/0/0/6 · kSpread-low no/0/0/6 · kSpread-high no/0/0/6 · revisitStrengthen-low no/0/0/6 · revisitStrengthen-high no/0/0/6 · relearn-low no/0/0/6 · relearn-high no/0/0/6 · priorKnowledgeMean-low no/0/0/6 · priorKnowledgeMean-high no/0/0/6 · learnRate-low no/0/0/6 · learnRate-high no/0/0/6 · prereqPenalty-low no/0/0/6 · prereqPenalty-high no/0/0/6 · pullScale-low no/0/0/6 · pullScale-high no/0/0/5 · revisitStopScale-low no/0/0/6

### candidate vs fixed: base cell
| persona | Δ R7 [95% CI] | win | harm | G1 | NEW Δ [CI] | LOAD Δ revisit share [CI] | LOAD holds |
|---|---|---|---|---|---|---|---|
| curious-newcomer | -0.0051 [-0.0058, -0.0044] |  |  | true | -1.32 [-1.39, -1.25] true | +0.0120 [+0.0114, +0.0126] | true |
| single-subject-crammer | -0.0078 [-0.0091, -0.0066] |  |  | true | -3.27 [-3.42, -3.12] false | +0.0248 [+0.0239, +0.0258] | true |
| struggling-repeater | -0.0046 [-0.0057, -0.0036] |  |  | true | -2.18 [-2.28, -2.08] false | +0.0238 [+0.0228, +0.0248] | true |
| returning-expert | -0.0048 [-0.0055, -0.0041] |  |  | true | -2.95 [-3.04, -2.85] false | +0.0212 [+0.0205, +0.0219] | true |
| wanderer | -0.0068 [-0.0076, -0.0060] |  |  | true | -2.40 [-2.49, -2.31] true | +0.0214 [+0.0207, +0.0222] | true |
| lapsed-returner | -0.0044 [-0.0054, -0.0034] |  |  | true | -2.40 [-2.50, -2.30] false | +0.0268 [+0.0258, +0.0279] | true |
per cell (beats / wins / harmed / guardrail fails): base no/0/0/4 · forgetScale-low no/0/0/0 · forgetScale-high no/0/0/5 · forgetShape-low no/0/0/4 · forgetShape-high no/0/0/5 · kSpread-low no/0/0/4 · kSpread-high no/0/0/5 · revisitStrengthen-low no/0/0/1 · revisitStrengthen-high no/0/0/5 · relearn-low no/0/0/5 · relearn-high no/0/1/3 · priorKnowledgeMean-low no/0/0/4 · priorKnowledgeMean-high no/0/0/4 · learnRate-low no/0/0/4 · learnRate-high no/0/2/4 · prereqPenalty-low no/0/0/4 · prereqPenalty-high no/0/0/4 · pullScale-low no/0/0/4 · pullScale-high no/0/0/4 · revisitStopScale-low no/0/0/2

## Recall level by horizon, base cell (mean R_H = K(T_H) / N_ref)
### H = 1
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| default-order+fixed | 1.005 | 0.953 | 0.796 | 1.749 | 1.173 | 1.277 |
| draft-rules+fixed | 1.007 | 0.961 | 0.803 | 1.758 | 1.181 | 1.281 |
| random+fixed | 1.013 | 0.960 | 0.803 | 1.759 | 1.182 | 1.279 |
| gam+fixed | 1.006 | 0.956 | 0.799 | 1.750 | 1.175 | 1.280 |
| oracle-order+fixed | 1.130 | 1.030 | 0.878 | 1.882 | 1.271 | 1.354 |
| default-order+none | 1.292 | 1.204 | 1.013 | 2.040 | 1.462 | 1.481 |
| default-order+oracle-review | 1.385 | 1.278 | 1.077 | 2.151 | 1.554 | 1.562 |
| default-order+candidate | 0.995 | 0.937 | 0.785 | 1.739 | 1.160 | 1.265 |

### H = 7
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| default-order+fixed | 0.831 | 0.794 | 0.622 | 1.574 | 0.993 | 1.060 |
| draft-rules+fixed | 0.834 | 0.800 | 0.626 | 1.582 | 0.998 | 1.063 |
| random+fixed | 0.837 | 0.798 | 0.625 | 1.583 | 0.998 | 1.060 |
| gam+fixed | 0.832 | 0.797 | 0.623 | 1.575 | 0.995 | 1.062 |
| oracle-order+fixed | 0.989 | 0.893 | 0.735 | 1.716 | 1.112 | 1.158 |
| default-order+none | 1.029 | 0.954 | 0.751 | 1.777 | 1.185 | 1.173 |
| default-order+oracle-review | 1.106 | 1.013 | 0.798 | 1.879 | 1.263 | 1.241 |
| default-order+candidate | 0.826 | 0.786 | 0.617 | 1.570 | 0.986 | 1.055 |

### H = 30
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| default-order+fixed | 0.606 | 0.592 | 0.440 | 1.227 | 0.723 | 0.722 |
| draft-rules+fixed | 0.608 | 0.596 | 0.442 | 1.232 | 0.726 | 0.723 |
| random+fixed | 0.610 | 0.592 | 0.442 | 1.233 | 0.726 | 0.722 |
| gam+fixed | 0.607 | 0.594 | 0.441 | 1.228 | 0.725 | 0.723 |
| oracle-order+fixed | 0.772 | 0.692 | 0.558 | 1.349 | 0.841 | 0.816 |
| default-order+none | 0.638 | 0.583 | 0.412 | 1.280 | 0.744 | 0.687 |
| default-order+oracle-review | 0.685 | 0.618 | 0.437 | 1.354 | 0.792 | 0.725 |
| default-order+candidate | 0.605 | 0.591 | 0.442 | 1.225 | 0.722 | 0.724 |

## Δ vs the reference by horizon, base cell (95% CI)
### H = 1
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| draft-rules+fixed | +0.0023 [+0.0000, +0.0046] | +0.0078 [+0.0059, +0.0098] | +0.0073 [+0.0052, +0.0093] | +0.0093 [+0.0078, +0.0107] | +0.0079 [+0.0061, +0.0097] | +0.0046 [+0.0028, +0.0063] |
| random+fixed | +0.0084 [+0.0055, +0.0114] | +0.0066 [+0.0042, +0.0089] | +0.0070 [+0.0045, +0.0094] | +0.0105 [+0.0086, +0.0123] | +0.0091 [+0.0068, +0.0115] | +0.0017 [-0.0006, +0.0040] |
| gam+fixed | +0.0007 [-0.0008, +0.0021] | +0.0032 [+0.0015, +0.0049] | +0.0029 [+0.0012, +0.0047] | +0.0010 [+0.0001, +0.0019] | +0.0026 [+0.0013, +0.0040] | +0.0030 [+0.0015, +0.0044] |
| oracle-order+fixed | +0.1255 [+0.1225, +0.1284] | +0.0767 [+0.0742, +0.0793] | +0.0822 [+0.0794, +0.0850] | +0.1337 [+0.1318, +0.1357] | +0.0981 [+0.0958, +0.1005] | +0.0769 [+0.0745, +0.0793] |
| default-order+none | +0.2872 [+0.2829, +0.2916] | +0.2511 [+0.2468, +0.2555] | +0.2167 [+0.2125, +0.2210] | +0.2912 [+0.2880, +0.2943] | +0.2889 [+0.2850, +0.2928] | +0.2042 [+0.2000, +0.2084] |
| default-order+oracle-review | +0.3801 [+0.3761, +0.3841] | +0.3251 [+0.3207, +0.3295] | +0.2809 [+0.2768, +0.2850] | +0.4024 [+0.3994, +0.4053] | +0.3814 [+0.3778, +0.3849] | +0.2855 [+0.2815, +0.2894] |
| default-order+candidate | -0.0098 [-0.0108, -0.0087] | -0.0157 [-0.0175, -0.0139] | -0.0111 [-0.0127, -0.0095] | -0.0093 [-0.0102, -0.0083] | -0.0128 [-0.0140, -0.0116] | -0.0114 [-0.0129, -0.0098] |

### H = 7
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| draft-rules+fixed | +0.0027 [+0.0009, +0.0045] | +0.0062 [+0.0047, +0.0076] | +0.0042 [+0.0028, +0.0057] | +0.0075 [+0.0062, +0.0087] | +0.0053 [+0.0039, +0.0067] | +0.0028 [+0.0015, +0.0040] |
| random+fixed | +0.0063 [+0.0038, +0.0088] | +0.0038 [+0.0020, +0.0057] | +0.0036 [+0.0016, +0.0056] | +0.0083 [+0.0066, +0.0099] | +0.0053 [+0.0034, +0.0073] | +0.0005 [-0.0013, +0.0022] |
| gam+fixed | +0.0009 [-0.0001, +0.0019] | +0.0025 [+0.0013, +0.0037] | +0.0015 [+0.0003, +0.0027] | +0.0010 [+0.0003, +0.0018] | +0.0019 [+0.0009, +0.0029] | +0.0017 [+0.0007, +0.0028] |
| oracle-order+fixed | +0.1582 [+0.1557, +0.1608] | +0.0992 [+0.0971, +0.1012] | +0.1136 [+0.1113, +0.1158] | +0.1416 [+0.1398, +0.1433] | +0.1195 [+0.1175, +0.1214] | +0.0981 [+0.0961, +0.1001] |
| default-order+none | +0.1977 [+0.1943, +0.2011] | +0.1602 [+0.1568, +0.1635] | +0.1288 [+0.1256, +0.1319] | +0.2022 [+0.1995, +0.2049] | +0.1918 [+0.1887, +0.1949] | +0.1136 [+0.1104, +0.1167] |
| default-order+oracle-review | +0.2743 [+0.2713, +0.2773] | +0.2191 [+0.2159, +0.2224] | +0.1762 [+0.1732, +0.1791] | +0.3046 [+0.3021, +0.3071] | +0.2705 [+0.2678, +0.2733] | +0.1811 [+0.1781, +0.1840] |
| default-order+candidate | -0.0051 [-0.0058, -0.0044] | -0.0078 [-0.0091, -0.0066] | -0.0046 [-0.0057, -0.0036] | -0.0048 [-0.0055, -0.0041] | -0.0068 [-0.0076, -0.0060] | -0.0044 [-0.0054, -0.0034] |

### H = 30
| arm | curious-newcomer | single-subject-crammer | struggling-repeater | returning-expert | wanderer | lapsed-returner |
|---|---|---|---|---|---|---|
| draft-rules+fixed | +0.0020 [+0.0005, +0.0034] | +0.0035 [+0.0024, +0.0047] | +0.0019 [+0.0008, +0.0030] | +0.0054 [+0.0044, +0.0064] | +0.0031 [+0.0020, +0.0042] | +0.0014 [+0.0005, +0.0024] |
| random+fixed | +0.0041 [+0.0019, +0.0062] | -0.0004 [-0.0019, +0.0011] | +0.0014 [-0.0002, +0.0030] | +0.0059 [+0.0045, +0.0072] | +0.0024 [+0.0008, +0.0040] | -0.0003 [-0.0017, +0.0010] |
| gam+fixed | +0.0007 [-0.0000, +0.0015] | +0.0018 [+0.0009, +0.0027] | +0.0006 [-0.0004, +0.0015] | +0.0009 [+0.0003, +0.0015] | +0.0012 [+0.0005, +0.0019] | +0.0010 [+0.0002, +0.0018] |
| oracle-order+fixed | +0.1656 [+0.1634, +0.1678] | +0.0999 [+0.0982, +0.1016] | +0.1182 [+0.1164, +0.1201] | +0.1225 [+0.1211, +0.1239] | +0.1174 [+0.1158, +0.1190] | +0.0938 [+0.0922, +0.0955] |
| default-order+none | +0.0319 [+0.0297, +0.0342] | -0.0092 [-0.0115, -0.0070] | -0.0279 [-0.0300, -0.0258] | +0.0536 [+0.0515, +0.0557] | +0.0203 [+0.0181, +0.0225] | -0.0350 [-0.0372, -0.0329] |
| default-order+oracle-review | +0.0792 [+0.0771, +0.0812] | +0.0260 [+0.0238, +0.0281] | -0.0028 [-0.0048, -0.0009] | +0.1271 [+0.1252, +0.1289] | +0.0691 [+0.0672, +0.0710] | +0.0036 [+0.0015, +0.0056] |
| default-order+candidate | -0.0013 [-0.0018, -0.0008] | -0.0010 [-0.0019, -0.0001] | +0.0014 [+0.0007, +0.0022] | -0.0015 [-0.0020, -0.0010] | -0.0012 [-0.0018, -0.0007] | +0.0016 [+0.0009, +0.0023] |

## Reference rows (no rule), base cell, Δ R7 vs the reference
- random+fixed: curious-newcomer +0.0063 [+0.0038, +0.0088] · single-subject-crammer +0.0038 [+0.0020, +0.0057] · struggling-repeater +0.0036 [+0.0016, +0.0056] · returning-expert +0.0083 [+0.0066, +0.0099] · wanderer +0.0053 [+0.0034, +0.0073] · lapsed-returner +0.0005 [-0.0013, +0.0022]
- default-order+none: curious-newcomer +0.1977 [+0.1943, +0.2011] · single-subject-crammer +0.1602 [+0.1568, +0.1635] · struggling-repeater +0.1288 [+0.1256, +0.1319] · returning-expert +0.2022 [+0.1995, +0.2049] · wanderer +0.1918 [+0.1887, +0.1949] · lapsed-returner +0.1136 [+0.1104, +0.1167]

## Descriptive, base cell (means over seeds; never a pass input)
| arm | persona | new lessons | revisits | revisit share | cards | reveal | moved | R1d | V4 earlier / same / later |
|---|---|---|---|---|---|---|---|---|---|
| default-order+fixed | curious-newcomer | 36.0 | 77.4 | 0.674 | 114.8 | 0.962 | 0.000 | 0.679 | 0.0 / 103.9 / 0.0 |
| default-order+fixed | single-subject-crammer | 27.1 | 108.8 | 0.797 | 136.6 | 0.974 | 0.000 | 0.697 | 0.0 / 128.3 / 0.0 |
| default-order+fixed | struggling-repeater | 21.3 | 75.8 | 0.773 | 98.3 | 0.947 | 0.000 | 0.653 | 0.0 / 117.1 / 0.0 |
| default-order+fixed | returning-expert | 27.4 | 113.5 | 0.804 | 141.3 | 0.985 | 0.000 | 0.812 | 0.0 / 131.9 / 0.0 |
| default-order+fixed | wanderer | 25.8 | 89.4 | 0.772 | 116.1 | 0.964 | 0.000 | 0.710 | 0.0 / 121.0 / 0.0 |
| default-order+fixed | lapsed-returner | 16.5 | 76.4 | 0.817 | 93.9 | 0.939 | 0.000 | 0.717 | 0.0 / 124.0 / 0.0 |
| draft-rules+fixed | curious-newcomer | 35.9 | 77.5 | 0.675 | 114.8 | 0.962 | 0.461 | 0.682 | 0.0 / 104.0 / 0.0 |
| draft-rules+fixed | single-subject-crammer | 26.9 | 109.1 | 0.799 | 136.7 | 0.974 | 0.462 | 0.691 | 0.0 / 128.6 / 0.0 |
| draft-rules+fixed | struggling-repeater | 21.3 | 75.9 | 0.773 | 98.3 | 0.947 | 0.415 | 0.644 | 0.0 / 117.2 / 0.0 |
| draft-rules+fixed | returning-expert | 27.3 | 113.6 | 0.805 | 141.3 | 0.985 | 0.510 | 0.806 | 0.0 / 132.0 / 0.0 |
| draft-rules+fixed | wanderer | 25.7 | 89.5 | 0.772 | 116.1 | 0.964 | 0.466 | 0.703 | 0.0 / 121.2 / 0.0 |
| draft-rules+fixed | lapsed-returner | 16.5 | 76.4 | 0.817 | 93.8 | 0.938 | 0.433 | 0.708 | 0.0 / 124.0 / 0.0 |
| random+fixed | curious-newcomer | 35.7 | 77.6 | 0.676 | 114.8 | 0.963 | 0.995 | 0.662 | 0.0 / 104.5 / 0.0 |
| random+fixed | single-subject-crammer | 26.2 | 108.1 | 0.801 | 135.1 | 0.972 | 0.995 | 0.663 | 0.0 / 128.4 / 0.0 |
| random+fixed | struggling-repeater | 21.1 | 75.7 | 0.774 | 98.0 | 0.947 | 0.995 | 0.633 | 0.0 / 117.0 / 0.0 |
| random+fixed | returning-expert | 27.3 | 113.6 | 0.805 | 141.3 | 0.984 | 0.995 | 0.797 | 0.0 / 132.0 / 0.0 |
| random+fixed | wanderer | 25.6 | 89.5 | 0.772 | 116.1 | 0.964 | 0.995 | 0.693 | 0.0 / 121.2 / 0.0 |
| random+fixed | lapsed-returner | 16.3 | 76.2 | 0.818 | 93.5 | 0.938 | 0.995 | 0.699 | 0.0 / 123.9 / 0.0 |
| gam+fixed | curious-newcomer | 36.0 | 77.3 | 0.674 | 114.8 | 0.962 | 0.205 | 0.682 | 0.0 / 103.8 / 0.0 |
| gam+fixed | single-subject-crammer | 27.2 | 109.0 | 0.797 | 136.9 | 0.975 | 0.327 | 0.700 | 0.0 / 128.4 / 0.0 |
| gam+fixed | struggling-repeater | 21.3 | 75.8 | 0.773 | 98.2 | 0.947 | 0.355 | 0.653 | 0.0 / 117.1 / 0.0 |
| gam+fixed | returning-expert | 27.4 | 113.5 | 0.804 | 141.3 | 0.985 | 0.277 | 0.813 | 0.0 / 131.9 / 0.0 |
| gam+fixed | wanderer | 25.7 | 89.5 | 0.772 | 116.1 | 0.965 | 0.319 | 0.712 | 0.0 / 121.1 / 0.0 |
| gam+fixed | lapsed-returner | 16.5 | 76.4 | 0.816 | 93.9 | 0.939 | 0.334 | 0.715 | 0.0 / 123.9 / 0.0 |
| oracle-order+fixed | curious-newcomer | 37.0 | 76.4 | 0.665 | 114.8 | 0.962 | 0.995 | 0.682 | 0.0 / 102.3 / 0.0 |
| oracle-order+fixed | single-subject-crammer | 27.1 | 107.7 | 0.795 | 135.6 | 0.972 | 0.995 | 0.684 | 0.0 / 127.5 / 0.0 |
| oracle-order+fixed | struggling-repeater | 21.8 | 75.0 | 0.767 | 98.0 | 0.946 | 0.995 | 0.674 | 0.0 / 115.6 / 0.0 |
| oracle-order+fixed | returning-expert | 27.0 | 113.9 | 0.807 | 141.3 | 0.984 | 0.995 | 0.708 | 0.0 / 132.3 / 0.0 |
| oracle-order+fixed | wanderer | 26.0 | 89.1 | 0.769 | 116.1 | 0.964 | 0.995 | 0.689 | 0.0 / 120.5 / 0.0 |
| oracle-order+fixed | lapsed-returner | 16.6 | 76.0 | 0.815 | 93.6 | 0.938 | 0.995 | 0.688 | 0.0 / 123.5 / 0.0 |
| default-order+none | curious-newcomer | 110.6 | 0.0 | 0.000 | 114.8 | 0.962 | 0.000 | 0.679 | 0.0 / 0.0 / 150.9 |
| default-order+none | single-subject-crammer | 124.9 | 0.0 | 0.000 | 128.1 | 0.974 | 0.000 | 0.691 | 0.0 / 0.0 / 168.0 |
| default-order+none | struggling-repeater | 92.9 | 0.0 | 0.000 | 98.0 | 0.945 | 0.000 | 0.647 | 0.0 / 0.0 / 168.0 |
| default-order+none | returning-expert | 139.1 | 0.0 | 0.000 | 141.3 | 0.984 | 0.000 | 0.807 | 0.0 / 0.0 / 168.0 |
| default-order+none | wanderer | 112.1 | 0.0 | 0.000 | 116.1 | 0.964 | 0.000 | 0.706 | 0.0 / 0.0 / 168.0 |
| default-order+none | lapsed-returner | 88.5 | 0.0 | 0.000 | 93.9 | 0.940 | 0.000 | 0.713 | 0.0 / 0.0 / 168.0 |
| default-order+oracle-review | curious-newcomer | 77.1 | 34.8 | 0.303 | 114.8 | 0.962 | 0.000 | 0.679 | 36.7 / 2.1 / 145.5 |
| default-order+oracle-review | single-subject-crammer | 85.4 | 40.7 | 0.318 | 128.4 | 0.974 | 0.000 | 0.694 | 42.0 / 2.4 / 165.6 |
| default-order+oracle-review | struggling-repeater | 60.3 | 34.4 | 0.351 | 98.1 | 0.946 | 0.000 | 0.646 | 36.0 / 4.4 / 162.9 |
| default-order+oracle-review | returning-expert | 108.8 | 30.8 | 0.218 | 141.3 | 0.984 | 0.000 | 0.811 | 30.5 / 1.4 / 166.6 |
| default-order+oracle-review | wanderer | 78.2 | 35.1 | 0.303 | 116.1 | 0.965 | 0.000 | 0.706 | 36.3 / 2.7 / 165.3 |
| default-order+oracle-review | lapsed-returner | 61.7 | 28.2 | 0.302 | 93.7 | 0.941 | 0.000 | 0.712 | 29.6 / 3.2 / 164.8 |
| default-order+candidate | curious-newcomer | 34.7 | 78.7 | 0.686 | 114.8 | 0.962 | 0.000 | 0.679 | 6.9 / 99.1 / 0.0 |
| default-order+candidate | single-subject-crammer | 23.8 | 112.2 | 0.822 | 136.6 | 0.974 | 0.000 | 0.699 | 16.1 / 117.1 / 0.0 |
| default-order+candidate | struggling-repeater | 19.1 | 78.2 | 0.797 | 98.3 | 0.947 | 0.000 | 0.650 | 14.6 / 106.6 / 0.0 |
| default-order+candidate | returning-expert | 24.5 | 116.4 | 0.825 | 141.3 | 0.985 | 0.000 | 0.813 | 11.4 / 124.1 / 0.0 |
| default-order+candidate | wanderer | 23.4 | 91.9 | 0.793 | 116.1 | 0.964 | 0.000 | 0.709 | 12.9 / 112.0 / 0.0 |
| default-order+candidate | lapsed-returner | 14.1 | 78.9 | 0.843 | 93.9 | 0.937 | 0.000 | 0.713 | 15.3 / 113.8 / 0.0 |

## Oracle-review θ per (cell, persona), chosen on the tuning seeds
- base: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- forgetScale-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.4 · lapsed-returner 0.3
- forgetScale-high: curious-newcomer 0.9 · single-subject-crammer 0.9 · struggling-repeater 0.9 · returning-expert 0.3 · wanderer 0.9 · lapsed-returner 0.9
- forgetShape-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- forgetShape-high: curious-newcomer 0.3 · single-subject-crammer 0.7 · struggling-repeater 0.8 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.8
- kSpread-low: curious-newcomer 0.3 · single-subject-crammer 0.4 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- kSpread-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- revisitStrengthen-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- revisitStrengthen-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- relearn-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- relearn-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- priorKnowledgeMean-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- priorKnowledgeMean-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- learnRate-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- learnRate-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- prereqPenalty-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- prereqPenalty-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- pullScale-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- pullScale-high: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3
- revisitStopScale-low: curious-newcomer 0.3 · single-subject-crammer 0.3 · struggling-repeater 0.3 · returning-expert 0.3 · wanderer 0.3 · lapsed-returner 0.3

## Corners (reported only): wins of 6, and the Δ R7 range over personas
corner run: commit b89f2590f6031ae1dae9b24b4b2046eece8f6adb · criterion sha256 7d2c95fe1adc961bf577743d14e6ac8993060db9cf11fc48799a4fe261568161 · S 2000 · 1288.187 s · errors 0
| corner: arm vs reference | wins | harmed | min Δ | max Δ |
|---|---|---|---|---|
| corner-LLL: draft-rules+fixed vs fixed/default | 1 | 0 | +0.0040 | +0.0108 |
| corner-LLL: gam+fixed vs fixed/default | 0 | 0 | +0.0017 | +0.0051 |
| corner-LLL: oracle-order+fixed vs fixed/default | 6 | 0 | +0.0557 | +0.1553 |
| corner-LLL: default-order+oracle-review vs fixed/default | 6 | 0 | +0.3774 | +0.4695 |
| corner-LLL: default-order+candidate vs fixed/default | 0 | 0 | -0.0050 | -0.0022 |
| corner-HLL: draft-rules+fixed vs fixed/default | 0 | 0 | +0.0000 | +0.0038 |
| corner-HLL: gam+fixed vs fixed/default | 0 | 0 | -0.0005 | +0.0010 |
| corner-HLL: oracle-order+fixed vs fixed/default | 6 | 0 | +0.0485 | +0.1039 |
| corner-HLL: default-order+oracle-review vs fixed/default | 6 | 0 | +0.0412 | +0.1005 |
| corner-HLL: default-order+candidate vs fixed/default | 4 | 0 | +0.0028 | +0.0155 |
| corner-LHL: draft-rules+fixed vs fixed/default | 1 | 0 | +0.0024 | +0.0102 |
| corner-LHL: gam+fixed vs fixed/default | 0 | 0 | +0.0014 | +0.0054 |
| corner-LHL: oracle-order+fixed vs fixed/default | 6 | 0 | +0.0607 | +0.1583 |
| corner-LHL: default-order+oracle-review vs fixed/default | 6 | 0 | +0.4237 | +0.5142 |
| corner-LHL: default-order+candidate vs fixed/default | 0 | 0 | -0.0075 | -0.0037 |
| corner-HHL: draft-rules+fixed vs fixed/default | 0 | 0 | -0.0002 | +0.0030 |
| corner-HHL: gam+fixed vs fixed/default | 0 | 0 | -0.0003 | +0.0007 |
| corner-HHL: oracle-order+fixed vs fixed/default | 6 | 0 | +0.0473 | +0.1086 |
| corner-HHL: default-order+oracle-review vs fixed/default | 6 | 0 | +0.0138 | +0.0872 |
| corner-HHL: default-order+candidate vs fixed/default | 0 | 0 | -0.0004 | +0.0073 |
| corner-LLH: draft-rules+fixed vs fixed/default | 0 | 0 | +0.0042 | +0.0095 |
| corner-LLH: gam+fixed vs fixed/default | 0 | 0 | +0.0008 | +0.0045 |
| corner-LLH: oracle-order+fixed vs fixed/default | 6 | 0 | +0.1093 | +0.1729 |
| corner-LLH: default-order+oracle-review vs fixed/default | 6 | 0 | +0.3568 | +0.4427 |
| corner-LLH: default-order+candidate vs fixed/default | 0 | 0 | -0.0056 | -0.0023 |
| corner-HLH: draft-rules+fixed vs fixed/default | 0 | 0 | +0.0007 | +0.0039 |
| corner-HLH: gam+fixed vs fixed/default | 0 | 0 | -0.0000 | +0.0014 |
| corner-HLH: oracle-order+fixed vs fixed/default | 6 | 0 | +0.1392 | +0.3003 |
| corner-HLH: default-order+oracle-review vs fixed/default | 6 | 0 | +0.0383 | +0.0699 |
| corner-HLH: default-order+candidate vs fixed/default | 0 | 0 | +0.0022 | +0.0083 |
| corner-LHH: draft-rules+fixed vs fixed/default | 0 | 0 | +0.0029 | +0.0084 |
| corner-LHH: gam+fixed vs fixed/default | 0 | 0 | -0.0001 | +0.0043 |
| corner-LHH: oracle-order+fixed vs fixed/default | 6 | 0 | +0.1243 | +0.1859 |
| corner-LHH: default-order+oracle-review vs fixed/default | 6 | 0 | +0.4071 | +0.4915 |
| corner-LHH: default-order+candidate vs fixed/default | 0 | 0 | -0.0095 | -0.0043 |
| corner-HHH: draft-rules+fixed vs fixed/default | 0 | 0 | +0.0001 | +0.0034 |
| corner-HHH: gam+fixed vs fixed/default | 0 | 0 | +0.0003 | +0.0009 |
| corner-HHH: oracle-order+fixed vs fixed/default | 6 | 0 | +0.1396 | +0.3229 |
| corner-HHH: default-order+oracle-review vs fixed/default | 2 | 1 | -0.0174 | +0.0672 |
| corner-HHH: default-order+candidate vs fixed/default | 0 | 0 | -0.0024 | +0.0005 |

## B. Run log (operational, changes no number)

- 2026-10-17 00:06:49Z: part 1 failed to start (the wrapper called `/usr/bin/time`, absent on this host; run2.mjs never ran). Part 2 (corners) ran 00:06:49Z to 00:28:19Z. Part 1 ran 00:28:24Z to 01:49:40Z. Order of parts does not enter any result (every draw is a hash of a string key). No file was edited and nothing was committed while either part ran.
- No change to criterion 2 after the first scored number.
