# Session criterion: the four session composer variants against the default order (composer-v0.3-session, model-v0.4.4)

owner: personalization-eval (Uma) · run: eval-s1-1020 · board: W-2005 (this file), W-1996 (c2 pin, done here), W-1988 (EDD-016 G0) · dispatch: chief of staff, 2026-10-20
status: frozen (eval-s1-1020, 2026-10-20). The freeze is the commit that first adds this file with this line; its hash and this file's sha256 at that commit go in §11, written in the next commit. Nothing below changes after the first scored number; a change after that is a new criterion and the old result stands.
decisions it serves: company/decisions/2026-10-20-founder-edp-faithful-personalization.md (founder: "better and more faithful implementation"; "both, labelled"); company/decisions/2026-10-20-vp-personalization-session-base.md (VP keep/kill comparisons K1-K5, §4; ≥ ruling §7; β ruling §8)
design gate: company/engineering/edd/EDD-016-session-composer-serving.md §4.2 (the readout scores what would serve, by sha256), §10 G0/G1
records beside it: criterion 3 (company/personalization/eval/2026-10-17-criterion-3.md, frozen 709ca2d) and readout 3 (run at b1ae294). **Readout 3 stays the record.** This file imports criterion 3's world unchanged and re-runs none of its readings.
harness: company/personalization/eval/harness/cs/ (README.md there) · S record: company/personalization/eval/harness/records/2026-10-20-seeds-session-s1.json (sha256 4b182db1d7743d74fcfff3a7b8d54adf818a5d7b2edb36c7ed21dc1133cc56c7)

This criterion judges four candidates, the session composer variants `gam-session`, `gam-session-v3`, `gam-session-no-cov` and `gam-session-v3-edpbase`, each against `default-order + fixed` in criterion 3's world. It measures and reports. It contains no keep or kill text: vp-personalization's K1 to K5 read its output (VP record §4). The builders (learner-model-engineer, applied-scientist-personalization) do not score.

## 0. What I read, what I ran, and what I did not

**Read:** my onboarding doc and memory; the founder decision; the VP record in full (§1 to §8, objections O1 to O11); EDD-016 §1 to §6 and §10; the session build note (gam-session-build-note.md) §1 to §9; model.ts `COMPOSER_SESSION` (servingMode, sessionSize, recompute, the edpBaseEdits row: β = .033); sim/composer-session.ts (types, `reasonTermValue`, the slot loop, the `wouldMove` and `carries` lines); sim/simulate.mjs (`SESSION_VARIANTS`, `composeSessionFor`, `runSessionEpisode`, `circularDiagnostics`, `firstComposeInput`); criterion 3 §1 to §9; criterion 2 §2.1 and §3; phase A criterion §1 to §5; every harness file this one imports; scorer2.mjs; readout 3's interleave manifest; the board items W-1988, W-1994, W-1996, W-2005, W-2006, W-2008.

**Anchoring disclosure.** I authored phase A's criterion and readout 1 (gam vs default-order FAIL, mean edge +0.001), criteria 2, 3 and 3b and their readouts. I know readout 3's numbers (the reachable-signal oracle REACHABLE 6 of 6 in `interleave:base` at Δ +0.0102 to +0.0176, 0 of 6 in forgetScale-high, learnRate-low, prereqPenalty-low) and that readout 3b was INVALID by its copy check. I read the builders' composition-only layout probes (build note §4 and §8.4: departure share by session slot, e.g. v1 at model-v0.4.0 .43 .11 .02 .00 .00) and the VP record's counts (first picks across needs in 16 (v1) and 43 (v3) of about 170 moving sessions). None of these is a recall result of any session variant. **No recall, score or guardrail value of any session variant, in any world, exists or has been seen by me.**

**What I ran (all allowed by the lock, §5):** the reference arm alone, for S (§1.4) and in tests; the session fixtures (§5) in the eval world; the four variants' `composeSessionFor` on the builder's own sample inputs (`firstComposeInput`, sim personas, seeds 1 to 3) to test T4S, and on 131 eval-world composition inputs captured from the default fixture's loop, for timing only (no pick was served to the learner and no output was read beyond the clock); `runS.mjs --plumbing --seeds=3` (session arms served by `fixture-session-default`, the rest by the reference arm, so every Δ is 0 by construction; it printed reference-arm levels only).

## 1. The world, the serving mode, the metric

### 1.1 The world: criterion 3's, unchanged, interleave placement only
Criterion 3's learner (learner3, N7 rows), E1 (sha256 c8c09eac…f7482840) and E3 (sha256 0e120add…c1927a) blocks, episode (14 sessions, one a day, final test 7 days after the last), the Feed.tsx interleave (one due revisit before new card i when i % 3 = 1, at most 12 fetched), the fixed schedule in Feed.tsx's order, and the slot costs. Test S-ID0 holds the judge files byte-identical to readout 3's manifest; S-ID1 holds `runEpisodeS` byte-identical to `runEpisode3` for every non-session arm. The revisits-first placement (`first:*`) is not run: it is a proposed amendment's layout, and criterion 3 §2.0 already named `interleave:base` as the cell an ordering rule would serve in.

**The catalogue is today's, not readout 3's.** The pilot now has 231 lessons (readout 3: 230; criterion 3b's test 3b-ID0 records the change). The built catalogue's sha256 is part of the candidate pin (§6), and the K-e gate (criterion 3b's `keGate`: no draft or retired lesson in the composer's dims) runs at the start of every part.

### 1.2 How a session arm is served (harness/cs/harnessS.mjs `runEpisodeS`)
The candidate's own serving mode, as built: model.ts `COMPOSER_SESSION.servingMode` = `compose-session-serve-in-order`, `sessionSize` 5, `recompute` "after sessionSize served new cards, or at the end of the day".
- At the first new-card position of each session (day), and again whenever the plan is used up, the harness builds the composer's input exactly as sim/simulate.mjs `runSessionEpisode` does (fingerprint and needs from the history at that moment; `pool` = criterion 3's dims with the simulated ratings; default order; no queued cards; no due revisits; personalisation on) and calls `composeSessionFor(policy, input, cat)`, the builder's own glue, imported read-only. The four policy names map to their coefficient variant and switched-off terms through simulate.mjs `SESSION_VARIANTS`, which is part of the pin.
- The plan's new picks are served in order. Due revisits are placed by the interleave as for every arm; a revisit never changes a plan. A plan not used up when the session ends is dropped. A card left before the reveal ends the session (learner3: an unrevealed card is always a stop).
- If the plan is empty (catalogue end), the session ends as criterion 3's catalogue end does.
- S-ID2 shows this loop, fed the default order as 5-card plans, reproduces the reference arm byte for byte (72 of 72 episodes), so any difference a variant makes is its plan and nothing else.

### 1.3 What this does not score (EDD-016 §4.4)
EDD-016 §4.4 describes a served session that "recomposes the next K from the new h" whenever the learner's history changes (a reveal or a recall). That is a different serving mode: under it a plan rarely survives one card. **A result here binds only `compose-session-serve-in-order` with sessionSize 5.** A glue that recomposes on every reveal is a different candidate and needs its own readout row, as EDD-016 §6 already says for the recall-only fallback. I raise it on the board for principal-engineer (§9).

### 1.4 The metric, seeds and S
- Primary: **R₇ = K(T₇)/N_ref**, criterion 2 §1.3 and criterion 3 §1.3, unchanged; Δ paired per seed against `default-order + fixed` in the same cell. R₁ and R₃₀ are reported. Engagement is never a pass input.
- Seeds: a fresh block, **70001 to 72000**, disjoint from every earlier scored or tuning block (phase A and criteria 2, 3: from 1001; 3b: 40001 to 42000; tuning 5001 to 5100). The same list for every arm, persona and cell.
- S: criterion 2 §1.4's rule, unchanged, from the reference arm alone at `interleave:base`, pilot seeds 70001 to 70500: S = max(200, ⌈(2.8·√2·sd_R/δ_min)²⌉), cap 2000. Largest per-persona sd_R = 0.1949 (lapsed-returner; the others 0.056 to 0.141). The formula gives 5,957, so **the cap binds: S = 2000.** Readout 3's sd_R at the same cell was 0.111 on seeds 1001 to 1500 with 230 lessons; I have not split the rise between the seed block and the catalogue. **Stated before any score:** under the rule's own conservative assumption (no pairing correlation), S = 2000 detects about 1.7 points for lapsed-returner, not 1; common random numbers make paired differences far less noisy than that, and the readout prints each interval's width. I keep the cap, because S was never raised for the sake of one persona in criteria 2 and 3 and the run is already long (§8).

## 2. Arms and cells

| Arm | Role | Cells |
|---|---|---|
| `default-order + fixed` | the reference and the comparison arm (head-of-product's default order; VP record §3 "Comparison") | all 29 |
| `gam-session + fixed` (v1) | candidate | all 29 |
| `gam-session-v3 + fixed` (v3 edits) | candidate | all 29 |
| `gam-session-no-cov + fixed` (v1, every cov term 0) | candidate | all 29 |
| `gam-session-v3-edpbase + fixed` (v3, base 1.0 → .033) | candidate | all 29 |
| `gam + fixed` (model-v0.2.2, fingerprint pinned) | context only (VP: confounded by attentionCost) | base |
| `draft-rules + fixed`, `random + fixed` | context only | base |
| `oracle-order + fixed` (criterion 2 §2.3) | context only: the ordering headroom in this world | base |

Review is the fixed schedule in every arm. The context arms keep the eval's existing code paths (phase A glue `choose`, criterion 2 `oracleOrder`); they are run beside the candidates and read by no rule.

**Cells (harness/cs `cellsS`, criterion 3's interleave cells, roles set now):** `interleave:base` (role base); criterion 3's 26 one-at-a-time interleave cells (18 criterion 2 rows and 8 E3 bounds; role oat, pass-relevant); `interleave:priorRateMult-outer` and `interleave:price-corner` (role reported, read by no rule).

## 3. The rules, one per VP comparison (VP record §4)

Constants from criterion 2 §2.1 and §3, unchanged: δ_min = **0.01**, δ_harm = 0.01, wins needed 4 of 6, the ordering guardrails G1 (top-domain share of completed new lessons, upper end ≤ +0.05), G2 (distinct concepts, relative lower end ≥ −0.05), G3 (shown before prerequisites, upper end ≤ +0.02), G4 (knowledge gain, relative lower end ≥ −0.05). New constants (runS.mjs `CRITERION_S`): the K2 and K3 family level 0.05, the K4 margin 0.05, the near-tie width 1e-9.

**INVALID first.** A session arm is INVALID if any check in §5 fails on it, or any of its units errors. Then K1 and K4 read INVALID, K2 reads no veto value (null), K5 reads INVALID, and no recall comparison is reported for it.

### K1 (gate): each variant vs default-order
Criterion 2 §2.1's rule, unchanged (it is phase A's). In one cell a variant **beats** default-order when (1) at least 4 of 6 personas are wins: the lower end of the 95% t interval of Δ_p above 0 **and** Δ_p ≥ δ_min = 0.01; (2) no persona is harmed (Δ_p ≤ −0.01 with the upper end below 0); (3) G1 to G4 hold in every persona. Outcome: **PASS** if it beats in `interleave:base` and in every one of the 26 one-at-a-time cells; **FAIL-SENSITIVE** if it beats in the base cell but not in some one-at-a-time cell (the readout names them); **FAIL** if it does not beat in the base cell; **INVALID** as above. Four variants are judged, each on its own; I do not adjust K1 for four candidates, because a chance PASS needs 4 of 6 wins at ≥ 1 point in each of 27 cells, which no adjustment would make materially harder to fake. (verdicts.json `K1`.)

### K2 (veto): a clear loss for any persona
The VP's rule: a clear loss, "upper 95% end below 0", for any persona kills the variant even if K1 passes. **My statistic (VP record §4: "Nothing in this record binds eval's statistics"), written before any score:** "95%" is read as a **simultaneous** 95% interval within each family, by Bonferroni: the base cell (6 personas, each interval at 1 − 0.05/6) and the one-at-a-time cells (26 × 6 = 156 intervals, each at 1 − 0.05/156). The veto fires if any persona in either family has the upper end of its interval below 0. Why: with 2,000 paired seeds, 6 one-sided 2.5% tests give a variant with no effect at all a 14% chance of a false veto in the base cell alone, and 156 such tests in the sweep give about 98%. A veto that fires on almost any variant whatever it does is not a veto. The unadjusted clear losses (upper end of the plain 95% t interval below 0, base and every one-at-a-time cell) are printed beside it (`unadjustedClearLosses`) so the VP can read the literal rule too. Magnitude-weighted harm (δ_harm) is already inside K1. (verdicts.json `K2`.)

### K3 (attribution): the three paired contrasts, base cell
K3a `gam-session` vs `gam-session-no-cov` (cov terms); K3b `gam-session-v3` vs `gam-session` (v3 edits); K3c `gam-session-v3-edpbase` vs `gam-session-v3` (the anchor). For each: the more complex variant is **preferred** iff, in `interleave:base`, it beats the simpler one under rule item 1 (at least 4 of 6 personas with the lower end of the 95% t interval above 0 and Δ_p ≥ δ_min; Δ normalised by the reference arm's N_ref as everywhere) **and** no persona has the upper end of its simultaneous 95% interval (6 personas, as K2) below 0. Otherwise the simpler one is preferred, so a tie goes to the simpler (for K3c, to `gam-session-v3`, as the VP asks). All three contrasts are computed for every variant whatever K1 says; the VP uses them only among K1/K2 passers, in the order a, b, c. The one-at-a-time wins of each contrast are printed as context. (verdicts.json `K3`.)

### K4 (guardrail): served subject mix
**Measure (mine, non-circular: it reads the served order and the learner's visible history, never the model's beliefs):** per episode, the **share of served new cards outside the learner's home domain**, where the home domain is the domain with the most completions in the visible pre-history at the start of the episode (a tie goes to the domain of the latest pre-history completion; harnessS.mjs `homeDomain`, tested). "Served" means started, whether or not revealed. With two pilot domains, outside home is the other domain. Episodes with no pre-history or no served new card are dropped and counted (`droppedEpisodes`).
**Rule:** per persona, the paired 95% t interval of share(variant) − share(default-order). The variant **HOLDS** if the lower end is ≥ **−0.05** for every persona in `interleave:base` and in every one-at-a-time cell; otherwise **NARROWER**, with the cells and personas named. This is a non-inferiority test, so the burden is on the variant to show it does not narrow (VP record §3: "A variant that cannot be shown not to narrow is not recommended for serving"); the intervals are not adjusted, which is the strict side for a guardrail. The margin is criterion 2's G1 margin (5 points), on a share whose reference level is about one half (the default order alternates domains; plumbing, reference arm only). G1 (completed top-domain share, rise ≤ 5 points) still binds inside K1; K4 adds the VP's served-order reading against a policy-independent home. (verdicts.json `K4`.)

### K5 (copy gate): reasonCarriesMove on served moved cards
**Measure:** over every served new card of a variant whose pick is `moved` (the breadth floor's held cards are not moves), the count with `reasonCarriesMove` false, as the composer computes it (VP record §5 and §7: the named reason's term value ≥ the slot's margin; built at model-v0.4.4). Pooled over `interleave:base` and the 26 one-at-a-time cells; also printed per cell and as a share of served moved cards. **Gate:** **COPY-BLOCKED** if any served moved card has the field false (or missing: T4S also makes that INVALID); **COPY-CLEAR** if none does and at least one card moved; **NO-MOVES** if the variant served no moved card (stated as such, never as clear evidence). The field is read as built; T4S recomputes it from the trace at every composition of the validity episodes, so a mis-built field cannot pass silently. **Near-ties** (|reason value − margin| ≤ 1e-9, VP record §7 O8) are counted and printed as context; they change no reading. (verdicts.json `K5`.)

## 4. Context and diagnostics (no rule reads them)
- Each variant vs `gam` (model-v0.2.2), base cell; `gam`, `draft-rules`, `random` vs default-order with the ordering guardrails; `oracle-order` vs default-order with the headroom reading of criterion 2 §2.3 (HEADROOM if 4 of 6 wins). Labelled context in the readout.
- Base cell, per arm and persona: R₁, R₇, R₃₀ levels; new lessons, cards, reveal share and moved share (engagement and descriptive, never a pass input); revisit share; G1 to G4 levels; served and moved cards by session slot; compositions per episode; the K4 and K5 counters.
- **EDP-style need coverage and domain diversity, labelled "circular: diagnostic only"** (founder decision Q3, "both, labelled"): sim/simulate.mjs `circularDiagnostics`, the same definition for every arm, computed at serve time in the base cell. Always printed beside R₇, never as a pass score.

## 5. Tests and checks (harness/cs/checksS.mjs, testsS.test.mjs: 14 of 14 pass before the freeze; criterion 2's 25 of 25 and phase A's 20 of 20 pass)

| Check | What | On | Failure |
|---|---|---|---|
| S-ID0 | the 8 judge and world files (c3 harness3, learner3, world3; c2 learner2, scorer2, world2; phase A glue; personas copy) equal readout 3's manifest | judge | stops the run |
| T5c | the judge modules import nothing and never name the rating field (criterion 3's) | judge | stops |
| K-e | no draft or retired lesson in the composer's dims at any seed of the block (criterion 3b's gate) | world | stops |
| GAM pin | gam is model-v0.2.2 (PHASE_A_MODEL_VERSION), both gates shut, fingerprint = c2/gam-v0.2.2.sha256 | context arm | stops |
| S-ID1 | runEpisodeS = runEpisode3, episode and world hash, for every non-session arm, 6 cells × 6 personas × 2 seeds (before the freeze: the reference arm only) | glue | stops |
| S-ID2 | the session loop serving the default order as 5-card plans = the reference arm, 72 episodes | glue | stops |
| pin | the tree's candidate pin equals §6's frozen pin | candidate | stops |
| T1 | the same episode in two processes gives the same hash (2 personas, base, seed 70001) | each variant | INVALID |
| T2S | at every composition of one episode per persona (base, seed 70001), the same input (deep copy) gives the same plan | each variant | INVALID |
| T3S | at every such composition, each `FORBIDDEN_INPUTS` entry at two values, on the input and on the fingerprint, gives the same plan | each variant | INVALID |
| NM | at every such composition, a deep-frozen copy of the input composes without throwing and gives the same plan | each variant | INVALID |
| T4S | at every such composition: terms sum to the score (1e-9); a moved pick out-scores the default card (margin > 0) and is the best eligible departure; an unmoved pick is the default card; `reasonCarriesMove` is null when unmoved and equals the VP record §7 formula when moved | each variant | INVALID |
| lock | a draft criterion runs only `default-order + fixed` and fixtures; a frozen copy allows every arm (temporary copies) | harness | test |

T1, T2S, T3S and NM were shown able to fail on fixtures only (a `Math.random` plan, a `sessionCount` reader); T4S passes on 72 builder-sample compositions of the four variants and fails on four broken copies (score, field flipped, margin, field set on a default pick); the K5 counter counts a fixture's uncarried move on every served moved card. The readings code (`readings`) is tested on synthetic scores: K1 PASS and FAIL, a K2 veto, the K3 tie rule, K4 NARROWER, K5 COPY-BLOCKED, INVALID.

## 6. The candidate pin (EDD-016 §4.2) and how a later single file can serve on this readout

EDD-016 §4.2 asks the readout to score "the frozen single file, by hash … (or score both and show the equivalence test above passed at the same commit)". **That file does not exist** (W-1994, learner-model-engineer, backlog). So this criterion pins the candidate as the five files that compute it plus the built catalogue, at the hashes below, and the run refuses on any difference (`pinCheck`). Each variant is named by its `SESSION_VARIANTS` entry and the sha256 of its coefficient object. The readout's manifest repeats the pin.

candidate-pin:
```json
{
  "files": {
    "company/personalization/model/model.ts": "8b922c726ca92d5021d5787bbd9bb8ec941bc9345e89e0c67f69389348a2c62a",
    "company/personalization/model/sim/composer-session.ts": "0eeb1a2f18c0492f48cfb52dbd8aeaf5a7c8dfbef5cc4cc9d5db50869da0aad4",
    "company/personalization/model/sim/composer.ts": "a092c3b9b52411add0e61851753e29a760d8c4527699f2d7f2a73c7e72801141",
    "company/personalization/model/sim/simulate.mjs": "83b2a45ddc186f3ee282a8ca976d80c2bcadf6d487ccb2e66db61ba6015d43ba",
    "company/personalization/model/sim/catalog.mjs": "877b0807cdd77a1ad9e11457524eae23b5a352c56f3b7c8dcd00b556413effc9"
  },
  "catalogSha256": "c65feabb2277d214a324e9869cfda1a6170fb1729b820fa5c823f3f515f8ff5f",
  "lessons": 231,
  "modelVersion": "model-v0.4.4",
  "phaseAModelVersion": "model-v0.2.2",
  "composer": "composer-v0.3-session",
  "servingMode": "compose-session-serve-in-order",
  "sessionSize": 5,
  "variants": {
    "gam-session": {
      "variant": "v1",
      "off": [],
      "coefficientsSha256": "2e9edd1cc77f6a53be4c3e162a7e99e7e9d34a546e8679cfacdd16d47618cafd"
    },
    "gam-session-v3": {
      "variant": "v3",
      "off": [],
      "coefficientsSha256": "6846d86add581ff1356f241181b03b2b3ef1671e019095f4a2a7d572c3291361"
    },
    "gam-session-no-cov": {
      "variant": "v1",
      "off": [
        "cov:repair",
        "cov:build",
        "cov:breadth",
        "cov:stretch"
      ],
      "coefficientsSha256": "2e9edd1cc77f6a53be4c3e162a7e99e7e9d34a546e8679cfacdd16d47618cafd"
    },
    "gam-session-v3-edpbase": {
      "variant": "v3-edpbase",
      "off": [],
      "coefficientsSha256": "18f337b7bba70233e111dbb73311de108aa7e9d928cca89217b0fa5cf3873450"
    }
  }
}
```

**The bridge to serving (written now, so it cannot be chosen after a result).** A frozen single file (W-1994) may serve on this readout only if, at a commit where all five pinned files and the catalogue still have the hashes above, an equivalence test passes that shows the single file and `composeSessionFor` give byte-identical compositions (picks, moved, reason, reasonCarriesMove) on every composition input of the named variant's own episode, for every persona, at seeds 70001 to 70010 in `interleave:base` and `interleave:slots-high`, for the variant named, and personalization-eval then records that file's sha256 against this readout in a dated addendum to the readout. Without that addendum, no single file serves on this readout. A single file that serves a different mode (§1.3), a different sessionSize, or different coefficients is a different candidate.

## 7. Multiplicity, stated once
K1 is unadjusted per variant (§3). K2 and K3's clear-loss tests are Bonferroni-simultaneous within the families named. K4 is unadjusted (strict side). K5 is a count, not a test. Context rows and every reported-only cell are exploratory: they cannot keep a variant (VP record §4). No contrast chosen after the results enters any reading. β and every other number stay as pinned; re-tuned numbers do not enter this readout (VP record §4).

## 8. Compute and the run
- Units: 29 cells × 5 arms × 6 personas + 4 context arms × 6 personas at the base cell, × S = 2000: about 1.79 M episodes, of which 1.39 M are session episodes.
- Timing measured before the freeze (allowed inputs only): the reference arm about 11 ms an episode; the default fixture's loop composes about 22.6 sessions an episode at the base cell; one composition costs 3.5 to 6.6 ms by variant (131 eval-world inputs, nothing served). So a session episode is about 0.1 to 0.13 s, and **the run is about 10 to 13 h at --jobs=4**. It runs in three parts, named now, then a merge:
  - part A: `interleave:base`, `interleave:priorRateMult-outer`, `interleave:price-corner`, forgetScale-low/high, forgetShape-low/high, kSpread-low/high, revisitStrengthen-low/high;
  - part B: relearn-low/high, priorKnowledgeMean-low/high, learnRate-low/high, prereqPenalty-low/high, pullScale-low;
  - part C: pullScale-high, revisitSlotCost-low/high, revisitStopScale-low/high, slots-low/high, priorRateMult-low/high.
- Commands: `NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=2000 --jobs=4 --cells=<part> --out=<dir>` for each part (started with setsid nohup, polled from its log), then `runS.mjs --merge=<A>,<B>,<C> --out=<dir>`, which refuses unless the parts share commit, criterion sha256, pin, harness files and S and cover every cell once. Outputs: each part's results.ndjson and manifest.json; the merge's verdicts.json and manifest.json. The readout is written from verdicts.json; its tables come from a formatter written and hashed before the first part starts (it computes no verdict).
- **The run happens at the freeze commit** (a worktree), or at a later commit only if `pinCheck` and every harness hash still match; catalogue changes in src/ make the pin fail, by design.

## 9. What I did with each requirement

| Requirement | Where | What I did |
|---|---|---|
| Four session arms vs default-order, and context arms (W-2005, VP §4) | §2 | all four in all 29 cells; gam, draft-rules, random and oracle-order at the base cell as context |
| K1 gate | §3 K1 | phase A's rule, base + 26 one-at-a-time cells |
| K2 veto, "upper 95% end below 0" | §3 K2 | read as simultaneous 95% within two families; unadjusted losses printed beside. **This is my statistic; it is less trigger-happy than the literal reading, and I say why** |
| K3a, b, c | §3 K3 | base cell, rule item 1 plus no clear loss; ties to the simpler |
| K4 subject mix, measure mine | §3 K4 | outside-home share of served new cards against a visible-history home; non-inferiority at 5 points |
| K5 reasonCarriesMove false share | §3 K5 | pooled count and share; COPY-BLOCKED above 0; near-ties as context |
| δ_min no weaker than 0.01 | §3 | 0.01 |
| Seeds, cells | §1.4, §2 | 70001 to 72000 (S = 2000, cap binds); criterion 3's interleave cells |
| Session serving in the harness's episode loop (brief) | §1.2 | extended the harness: `runEpisodeS` composes 5 and serves in order through the builder's `composeSessionFor`; S-ID2 proves the loop |
| Candidate pin (EDD-016 §4.2; W-1994 absent) | §6 | five file hashes + catalogue hash + variant coefficients, refused on difference; a written bridge for a later single file |
| "Circular: diagnostic only" (founder Q3) | §4 | printed beside R₇, labelled, never a pass score |
| EDD-016 §4.4 recompose-on-reveal | §1.3 | not scored; a result binds only serve-in-order; board item for principal-engineer |

## 10. Changes made in this run outside this file
- **W-1996 (c2 harness pin).** `harness/c2/harness2.mjs`: new `gamModelVersion()` = `M.PHASE_A_MODEL_VERSION ?? M.MODEL_VERSION`, and `gamFingerprint()` hashes it instead of `M.MODEL_VERSION` (the same string, model-v0.2.2, so the fingerprint is unchanged, 38887e85…efd20). `run2.mjs`: the version check reads `gamModelVersion()`, and it now also checks the fingerprint against gam-v0.2.2.sha256. `tests2.test.mjs`: the pin test reads `gamModelVersion()`. tests2: 25 of 25 pass (24 of 25 before). Readout 2 is unaffected: it reproduces at its own commit b89f259. **Side effect, stated:** criterion 3's C3-ID2 and criterion 3b's 3b-ID0 compare the live tree with readouts 2 and 3's file hashes. They already failed on this tree before this run (model.ts moved to v0.4.x; the catalogue has 231 lessons); harness2.mjs and run2.mjs now join their lists. They are reproduction checks that hold at their readouts' commits, not on the live tree. Criteria 3 and 3b are not re-run.
- New: harness/cs/ (5 files and README), the S record, this file. No file in src/, tools/ or company/personalization/model/ was edited.

## 11. Freeze record

frozen: run eval-s1-1020 (board W-2005), before any session variant ran in a scored episode and before any number. **Freeze commit: bdebacc27be85077074a43397bfce4876420d1a2** (sha256 of this file at that commit: 40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9, `git show bdebacc27be85077074a43397bfce4876420d1a2:company/personalization/eval/2026-10-20-session-criterion.md | sha256sum`). The criterion is this file's text at that commit. This section was written in the next commit (eval-s1-1020, board W-2013) and changes no rule. Any change after the first scored number is a new criterion, and the old result stands.

Written after the freeze commit and before the first chunk, outside every file the run hashes (runS.mjs `RUN_FILES` and the candidate pin, §6, are unchanged; the parts check verifies both). The formatter computes no verdict (§8); the parts check computes no score:
formatter: company/personalization/eval/harness/cs/readoutS-tables.mjs sha256 6344d79bf985b1d88980396febb4d87f71a8baa4384f15eeb9c4ced1331d448b
parts-check: company/personalization/eval/harness/cs/partsCheckS.mjs sha256 e32fecce11d3ebc3c56974cfb6156eacbee5216bfff93fb0d23acbedb45f2a82

**Run partition (an execution change to §8, stated here and to be repeated in the readout).** One background command on this host may run about 2 h, and §8's three parts measure about 4.0, 2.6 and 2.4 h at --jobs=4 (timing sample in company/personalization/eval/harness/cs/RUN-PLAN-s1.md). So the run is 11 chunks (partsCheckS.mjs `CHUNKS`), then one merge of the 11 chunk directories. Each chunk is a subset of exactly one §8 part, and each §8 part is the union of its chunks. Every unit (cell × arm × persona over the 2000 seeds) is computed by the same code on the same seeds whatever the partition, so no judged number depends on it. runS.mjs needed no change: it already runs any `--cells` list, and its merge refuses a cell missing or covered twice and parts that differ in commit, criterion sha256, pin or harness files. The parts check adds: each chunk holds exactly its cells, is not plumbing, ran with S = 2000 on 70001..72000 at one commit descended from the freeze commit, where this file differs from the freeze only in this section, every hashed run file and the candidate pin equal the freeze commit's, and the formatter and the check have the sha256 above; the judge checks passed; and results.ndjson has every unit once. The run is at the commit that adds this section, which §8 allows ("a later commit only if `pinCheck` and every harness hash still match").
