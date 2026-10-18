# Phase A readout 1: GAM composer vs default order and vs draft rules, under the frozen criterion

owner: personalization-eval (Uma) · run: eval-c4-1016 · date: 2026-10-16 · board: W-1534 (readout), W-1496 (criterion)
brief: company/personalization/batches/2026-10-16-batch-2.md §C4
criterion: company/personalization/eval/2026-10-16-phase-a-criterion.md, **frozen at commit e9909edc78a0f60914e9b89c790878ecb4b65576** (sha256 of the file at that commit `0bc2cbbd9d16e48ad19df750206eea56d876ca02a8438720b44862cbe4f325c7`; the hash was written into the file in commit 5725b10a8f4505aa697a6305cc9a51378ed7b4aa, sha256 as run `00797fab303482963337950139107273577a6d63be0cc8445732f4f7779dc5e8`)
code run: commit **5725b10a8f4505aa697a6305cc9a51378ed7b4aa** (branch perso-c4), Node v22.22.0 · seeds **1001 to 1200** (S = 200, criterion §1) · inputs: `B2` block of harness/world-inputs.mjs, status "C0-corrected", sha256 `d2fbc581c5321e80a54636cdec255c6db964349bd81bca70b016f4c41a028252`
outputs: company/personalization/eval/harness/records/2026-10-16-readout-1/ (`pass/` and `rest/`: manifest.json and verdicts.json committed; results.json hashes in the manifest table below)
for: vp-personalization (keep or kill, W-1536) and the WBR. **Reported unedited.** I recommend nothing on keep or kill.
reproduction: learner-model-engineer, C5 (W-1535), from harness/README.md "Reproduction", with the two commands in §1.

## 0. Verdicts

**Per pair (criterion §2; the GAM passes phase A only if it passes both):**

| pair | verdict | base cell: wins of 6 (need 4) | harmed personas, any pass cell | guardrail failures, any pass cell | pass cells beaten (of 10) |
|---|---|---|---|---|---|
| gam vs default-order | **FAIL** | 0 | none | none | 0 |
| gam vs draft-rules | **FAIL** | 0 | none | none | 0 |

FAIL means the GAM does not beat the baseline in the base cell (criterion §2). It also beats it in none of the 9 one-at-a-time cells. No policy is INVALID: T1 to T4 pass for all 8 policies, and the judge tests T5 to T7 pass.

**Per term (criterion §2: items 1 and 2 only; reported, not part of the GAM pass):**

| term | pair | cell | wins of 6 (need 4) | harmed | meets the per-term rule |
|---|---|---|---|---|---|
| breadth | gam vs gam-no-breadth | base | 0 | none | no |
| novelty | gam vs gam-no-surprise-novelty | novelty benefit −0.05 | 0 | none | no |
| novelty | gam vs gam-no-surprise-novelty | novelty benefit 0 (the cell the VP's kill rule reads) | 0 | none | no |
| novelty | gam vs gam-no-surprise-novelty | novelty benefit +0.05 | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 0, surprise base (0) | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 0, surprise high (0.15) | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 0.5 (guess), surprise base | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 0.5 (guess), surprise high | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 1, surprise base | 0 | none | no |
| surprise | gam-surprise-on vs gam | ρ 1, surprise high | 0 | none | no |

**Sizes, so the verdicts can be read.** In the base cell, the GAM's ΔR against default-order is between +0.0000 and +0.0023 by persona, a mean of +0.0010. The upper end of every persona's 95% interval is at most +0.0032. Across all 10 pass cells and both pairs, no persona's interval reaches δ_min = 0.01. The highest upper end is +0.0075 against default-order (prerequisite penalty 0.40) and +0.0092 against draft-rules. So the FAIL is not a power problem at S = 200. The simulated edge, where there is one, is bounded below 1 point of R. The largest cell mean is prerequisite penalty high: mean +0.0028 against default-order, max +0.0058 (struggling-repeater). At prerequisite penalty 0 the mean is +0.0000. Against draft-rules the per-persona Δ has both signs in most cells (−0.0030 to +0.0067). No persona is harmed under §2 item 2 in any cell (no Δ ≤ −0.01). In the per-term cells every |Δ| is at most 0.0022 (`gam-surprise-on`, struggling-repeater, ρ 0, surprise base), and the largest upper end is +0.0033. Several novelty Δ are negative with intervals below 0, all smaller than 0.0016. In the corners, 1 of 32 corner-pair rows has one persona win (LHHH, gam vs default-order, struggling-repeater +0.0100). No corner beats.

**Facts the VP's rules read (I apply neither rule):** (1) C3 trigger (VP decision §2: `gam-surprise-on` passes the per-term rule at ρ ≤ 0.5 in the surprise-high cell or better): `gam-surprise-on` meets the per-term rule in **no** surprise cell, including ρ 1, surprise high. (2) Novelty kill rule (VP decision §3) reads the benefit-0 cell: 0 wins, 0 harmed. Per-persona Δ are −0.0011 to −0.0000, with three intervals entirely below 0.

## 1. What was run

- **Policies:** all 7 of `POLICIES` in model-v0.2.1 (company/personalization/model/model.ts), plus the named counterfactual `gam-surprise-on` (criterion §2, §8; not the shipped model).
- **Cells (criterion §4 as frozen):** base; 9 one-at-a-time cells (forgetting scale 0.4 / 2.0, pull scale 0.5 / 1.5, prerequisite penalty 0 / 0.40, surprise 0 / 0.15, learn rate 0.35); 16 corners (default-order, draft-rules, gam); 3 novelty cells; 6 ρ × surprise cells. `hypercorrection-low` equals the base cell by the §4 surprise rule (base 0), so it is a duplicate and is reported as run.
- **Seeds:** 1001 to 1200 (S = 200), the same list for every persona, cell and policy, with common random numbers.
- **Host and order:** the brief warned of a concurrent Playwright run, so I used `--jobs=2` and ran the pass-relevant cells first: `--kinds=base,one-at-a-time` (1691 s), then `--kinds=corner,novelty,rho` (1378 s). The full run took about 51 minutes in two parts. Results do not depend on jobs or order (harness README). Commands, from the repository root at commit 5725b10a:

```sh
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=200 --jobs=2 --kinds=base,one-at-a-time --out=<dir>/pass
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/run.mjs --seeds=200 --jobs=2 --kinds=corner,novelty,rho --out=<dir>/rest
NODE_NO_WARNINGS=1 node company/personalization/eval/harness/readout-tables.mjs <dir>/pass <dir>/rest   # §6 tables
```

`results.json` (20 MB and 19 MB) is not committed. Its sha256 is in the manifest table (§6). `manifest.json` and `verdicts.json` are committed under records/2026-10-16-readout-1/.

## 2. The judge, as it was when it scored (state-in-readout items from C2, W-1533)

The learner, scorer and world are the eval's (harness/learner.mjs, scorer.mjs, world-inputs.mjs). Before the freeze, C4 changed three things to answer C2's blocking findings (criterion §10): (F1) forgetting now acts on the increment above the guess floor, so B2's `forgetRate` high 0.20 is sourced [F] for this form; (F2) a pass-relevant `learnRate-low` = 0.35 cell was added; (F3) the novelty boost now applies on a domain switch from the previous completed card. The six C2 notes marked "state in readout":

- **F4, prerequisite trigger.** The encoding penalty applies when any in-pilot prerequisite is **not known**, where B2 says "unseen". A prerequisite-first order still pays the penalty when the prerequisite failed to encode (about 0.23 at base), and a prior-known prerequisite protects either order. The order contrast is therefore about 0.77 × (1 − prior) of the nominal penalty, about 0.6 of it at base prior 0.2. This understates the ordering effect relative to B2's sizes.
- **F7, R reads at about 1 day.** Every first revisit is at the next 09:00 session, 0.98 to 1.0 days after completion. The forgetting cells shift R's level about equally for every policy and hardly separate them. B2's 1–7 day window is never exercised. Beating, or failing to beat, in the forgetting cells is not evidence about robustness to forgetting.
- **F10, pull does not enter recall outside the surprise cells.** With hypercorrection 0 (base and every non-surprise cell), the hidden pull changes only the visible prediction history. The pull-scale cells test how policies react to a changed prediction signal, not a change in learning.
- **F12, hypercorrection near the ceiling.** In the surprise-high cells (h = 0.15 on the kept increment, capped at 1), the effective boost to 1-day recall of a concept encoded after a misconception error is, by persona, +0.080 (curious-newcomer), +0.086 (single-subject-crammer), +0.104 (struggling-repeater), +0.055 (returning-expert), +0.080 (wanderer), +0.094 (lapsed-returner) absolute. Relative: 8.7%, 9.4%, 11.6%, 5.8%, 8.7%, 10.4%. The cap still binds at 1 day. Computed from `personaWorld` at the base forgetting scale, not from any episode.
- **F16, prior knowledge not swept.** Persona × domain prior knowledge is fixed at B2's base mean 0.20 and SD 0.15 (values 0.046 to 0.50). B2's range for the mean is 0.05–0.50 at low confidence. ΔR from encoding cuts scales roughly with the unknown share, so a lower population prior would enlarge Δ and a higher one would shrink it. No cell tests this.
- **F17, ρ and the rating cuts.** ρ is the correlation of the rater's continuous judgement with the hidden pull **before** rounding to msr-v1 levels (cuts 0.5 from the rubric, 0.7 a guess; level shares about 28 / 60 / 12%). ρ = 1 is therefore not "perfect ratings": the 3-level rating correlates with the pull below 1. ρ = 0.5 is a labelled guess (C3 held, no blind second rating). Any ρ taken later from rater agreement would be an optimistic upper bound (VP decision §1).

**Conditions the verdict rests on (criterion §4 rule for unverifiable or unsourced rows).** The verdicts hold under these labelled values: `forgetRate` low/base 0.04 / 0.10 (Roediger & Karpicke 2006, [R], unverifiable this run); `prereqPenalty` high 0.40 (Bransford & Johnson 1972, [S], unverifiable); hypercorrection high 0.15 (Butler et al. 2011, [S], unverifiable); prediction-feedback 0.10 ([A] / [S]); and the unsourced constants slip 0.1, guessRecall 0.2 (Fazio not-read baseline supports it, C2 F19), relearn 0.5, revisitStrengthen 0.5, stopBeforeRevealShare 0.5. **The base cell's learn rate 0.70 is the top of B2's new range (0.35–0.70) and is unsourced.** The criterion's base is the C1 guess, because B2 gives no base. The GAM beats in neither learn-rate cell. C0 rows 2 and 4 were spot-checked by me in full text and match (criterion §4 C4 fill).

## 3. Δ beside the phase B MDE (criterion §6)

| quantity | value |
|---|---|
| GAM vs default-order, base cell, ΔR by persona | +0.0000 to +0.0023 (mean +0.0010), i.e. 0.00 to 0.23 percentage points |
| largest per-persona ΔR in any pass cell (prerequisite penalty 0.40) | +0.0058 (0.58 points) |
| GAM moved share, base cell | 0.195 to 0.261 by persona (draft-rules 0.367 to 0.442) |
| phase B MDE at base assumptions (§6 table) | 15.3 points at 200 eligible learners · 6.9 at 1,000 · 3.1 at 5,000 · 2.2 at 10,000; 1 point needs about 47,000 |
| learners for phase B to detect the base-cell edge, same assumptions (MDE ∝ 1/√N, arithmetic only) | 0.23 points (best persona): about 890,000 · 0.10 points (mean): about 4.7 million |

The simulated ΔR is already on all lessons, so no further dilution applies (§6 "Dilution"). These numbers come from a placeholder world. A phase A Δ is not a forecast of phase B.

## 4. What this readout does not say

- Nothing on keep or kill, the per-term decisions, the C3 trigger's consequence or phase B. Those are vp-personalization's (W-1536).
- It does not say the GAM harms learners: no persona is harmed by the §2 rule in any cell.
- It does not test real learners, real ratings or forgetting beyond 1 day (F7). It does not test prior knowledge away from B2's base (F16).
- The criterion was not changed after the first scored number. Nothing in the criterion file changed after commit 5725b10a.

## 5. Independence and disclosure

The criterion was frozen (e9909edc, hash written in 5725b10a) before any policy under test was scored. Before the freeze, the only episodes I ran were default-order (the S recheck, SDs only) and fixtures (runner self-check). The C2 answers, the learn-rate cell and the novelty trigger were set without any GAM, draft-rules or ablation result. The anchoring disclosures of criterion §0 still apply: I knew from board titles and comments that a provisional simulator had shown the GAM's edge resting on the prerequisite penalty. I wrote no curve, weight, policy or composer code. The tables in §6 are generated by harness/readout-tables.mjs from verdicts.json and pasted unedited.

## 6. Full tables (generated, unedited)

### Run manifests

| out dir | kinds | commit | criterion sha256 (as run) | status | inputs sha256 | S | seeds | node | seconds | results.json sha256 | verdicts.json sha256 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-16-readout-1/pass | base,one-at-a-time | 5725b10a8f4505aa697a6305cc9a51378ed7b4aa | 00797fab303482963337950139107273577a6d63be0cc8445732f4f7779dc5e8 | frozen | d2fbc581c5321e80a54636cdec255c6db964349bd81bca70b016f4c41a028252 | 200 | 1001..1200 | v22.22.0 | 1690.596 | 5df456922703d9a473500d41099903d2a32b45f915c8f577bc20f8ca03d6b899 | 4842e28b57bd5ff6e171f54d8181a1f3da78105c8eb339117df2423a27be3050 |
| 2026-10-16-readout-1/rest | corner,novelty,rho | 5725b10a8f4505aa697a6305cc9a51378ed7b4aa | 00797fab303482963337950139107273577a6d63be0cc8445732f4f7779dc5e8 | frozen | d2fbc581c5321e80a54636cdec255c6db964349bd81bca70b016f4c41a028252 | 200 | 1001..1200 | v22.22.0 | 1378.151 | c8a289cb859b4fb9b27bf440c4b264959fe4e3984f54ef73d88b04a1012e6944 | 100aae8c0ee510bd61e7650fc4e2bdd5df6aa8e11af3fd39f216112c62c09728 |

### Judge tests (T5 to T7) and validity (T1 to T4)

Judge tests T5, T6 (6 personas), T7a/b/c: **pass** in every run.

| policy | T1 | T2 | T3 | T4 | invalid |
|---|---|---|---|---|---|
| default-order | pass | pass | pass | pass | no |
| draft-rules | pass | pass | pass | pass | no |
| gam | pass | pass | pass | pass | no |
| gam-no-surprise-novelty | pass | pass | pass | pass | no |
| gam-no-breadth | pass | pass | pass | pass | no |
| random | pass | pass | pass | pass | no |
| epsilon-greedy | pass | pass | pass | pass | no |
| gam-surprise-on | pass | pass | pass | pass | no |

### Verdict per pair (criterion §2)

| pair | verdict | cells not beaten (if any) |
|---|---|---|
| gam vs default-order | **FAIL** | base |
| gam vs draft-rules | **FAIL** | base |

Per cell (beats = ≥ 4 wins of 6, no persona harmed, every guardrail holds):

| pair | cell | wins | harmed | guardrail failures | beats |
|---|---|---|---|---|---|
| gam vs default-order | base | 0 | none | none | **no** |
| gam vs default-order | forgetScale-low | 0 | none | none | **no** |
| gam vs default-order | forgetScale-high | 0 | none | none | **no** |
| gam vs default-order | pullScale-low | 0 | none | none | **no** |
| gam vs default-order | pullScale-high | 0 | none | none | **no** |
| gam vs default-order | prereqPenalty-low | 0 | none | none | **no** |
| gam vs default-order | prereqPenalty-high | 0 | none | none | **no** |
| gam vs default-order | hypercorrection-low | 0 | none | none | **no** |
| gam vs default-order | hypercorrection-high | 0 | none | none | **no** |
| gam vs default-order | learnRate-low | 0 | none | none | **no** |
| gam vs draft-rules | base | 0 | none | none | **no** |
| gam vs draft-rules | forgetScale-low | 0 | none | none | **no** |
| gam vs draft-rules | forgetScale-high | 0 | none | none | **no** |
| gam vs draft-rules | pullScale-low | 0 | none | none | **no** |
| gam vs draft-rules | pullScale-high | 0 | none | none | **no** |
| gam vs draft-rules | prereqPenalty-low | 0 | none | none | **no** |
| gam vs draft-rules | prereqPenalty-high | 0 | none | none | **no** |
| gam vs draft-rules | hypercorrection-low | 0 | none | none | **no** |
| gam vs draft-rules | hypercorrection-high | 0 | none | none | **no** |
| gam vs draft-rules | learnRate-low | 0 | none | none | **no** |

Per persona, every pass-relevant cell: ΔR = R(GAM) − R(baseline), mean over seeds [95% interval]; win/harm per §2:

**gam vs default-order**

| cell | persona | ΔR [95% CI] | win | harm | ΔG1 hi (≤ +0.05) | ΔG2 lo (count; rule: ≥ −5% of default mean) | ΔG3 hi (≤ +0.02) | ΔG4 lo (count; rule: ≥ −5% of default mean) | guardrails |
|---|---|---|---|---|---|---|---|---|---|
| base | curious-newcomer | +0.0023 [+0.0014, +0.0032] | - | - | +0.0024 | -0.0584 | -0.0200 | +0.0475 | hold |
| base | single-subject-crammer | +0.0014 [+0.0003, +0.0025] | - | - | +0.0014 | -1.1049 | -0.0096 | -0.8523 | hold |
| base | struggling-repeater | +0.0013 [+0.0000, +0.0026] | - | - | +0.0001 | -0.5722 | -0.0280 | -0.2916 | hold |
| base | returning-expert | +0.0002 [-0.0002, +0.0006] | - | - | +0.0000 | +0.0032 | -0.0052 | -0.0471 | hold |
| base | wanderer | +0.0007 [-0.0001, +0.0015] | - | - | -0.0003 | -0.0406 | -0.0173 | -0.0062 | hold |
| base | lapsed-returner | +0.0000 [-0.0013, +0.0013] | - | - | +0.0009 | -0.7239 | -0.0197 | -0.4635 | hold |
| forgetScale-low | curious-newcomer | +0.0022 [+0.0013, +0.0032] | - | - | +0.0022 | -0.0363 | -0.0192 | +0.0534 | hold |
| forgetScale-low | single-subject-crammer | +0.0014 [+0.0002, +0.0025] | - | - | +0.0021 | -0.4661 | -0.0101 | -0.3993 | hold |
| forgetScale-low | struggling-repeater | +0.0021 [+0.0007, +0.0035] | - | - | +0.0007 | -0.6213 | -0.0261 | -0.2887 | hold |
| forgetScale-low | returning-expert | +0.0002 [-0.0002, +0.0006] | - | - | +0.0000 | +0.0032 | -0.0050 | -0.0223 | hold |
| forgetScale-low | wanderer | +0.0004 [-0.0004, +0.0013] | - | - | -0.0004 | -0.0495 | -0.0155 | +0.0153 | hold |
| forgetScale-low | lapsed-returner | -0.0001 [-0.0014, +0.0013] | - | - | +0.0007 | -0.6113 | -0.0182 | -0.4371 | hold |
| forgetScale-high | curious-newcomer | +0.0026 [+0.0018, +0.0034] | - | - | +0.0025 | -0.0898 | -0.0223 | +0.0616 | hold |
| forgetScale-high | single-subject-crammer | +0.0011 [+0.0001, +0.0021] | - | - | +0.0005 | -1.5841 | -0.0106 | -1.2395 | hold |
| forgetScale-high | struggling-repeater | +0.0024 [+0.0010, +0.0037] | - | - | +0.0001 | -0.5093 | -0.0319 | -0.2330 | hold |
| forgetScale-high | returning-expert | +0.0003 [-0.0001, +0.0008] | - | - | +0.0001 | -0.0142 | -0.0056 | -0.0538 | hold |
| forgetScale-high | wanderer | +0.0006 [-0.0002, +0.0014] | - | - | -0.0001 | -0.0342 | -0.0184 | -0.0839 | hold |
| forgetScale-high | lapsed-returner | +0.0004 [-0.0008, +0.0016] | - | - | +0.0013 | -0.8367 | -0.0230 | -0.5247 | hold |
| pullScale-low | curious-newcomer | +0.0008 [-0.0001, +0.0016] | - | - | +0.0025 | -0.0283 | -0.0095 | -0.0083 | hold |
| pullScale-low | single-subject-crammer | -0.0002 [-0.0013, +0.0009] | - | - | +0.0006 | -1.2582 | -0.0031 | -1.1971 | hold |
| pullScale-low | struggling-repeater | +0.0009 [-0.0004, +0.0022] | - | - | -0.0011 | -0.5472 | -0.0170 | -0.3640 | hold |
| pullScale-low | returning-expert | +0.0002 [-0.0003, +0.0006] | - | - | +0.0002 | +0.0032 | -0.0023 | -0.0928 | hold |
| pullScale-low | wanderer | -0.0004 [-0.0012, +0.0005] | - | - | -0.0013 | -0.0003 | -0.0083 | -0.1048 | hold |
| pullScale-low | lapsed-returner | -0.0005 [-0.0017, +0.0008] | - | - | -0.0005 | -0.6602 | -0.0117 | -0.5649 | hold |
| pullScale-high | curious-newcomer | +0.0032 [+0.0023, +0.0042] | - | - | +0.0020 | -0.0782 | -0.0318 | +0.0409 | hold |
| pullScale-high | single-subject-crammer | +0.0013 [+0.0003, +0.0023] | - | - | +0.0006 | -1.5633 | -0.0169 | -1.2153 | hold |
| pullScale-high | struggling-repeater | +0.0032 [+0.0017, +0.0046] | - | - | +0.0004 | -0.6352 | -0.0406 | -0.3115 | hold |
| pullScale-high | returning-expert | +0.0005 [+0.0001, +0.0010] | - | - | -0.0001 | -0.0509 | -0.0092 | -0.0368 | hold |
| pullScale-high | wanderer | +0.0010 [+0.0002, +0.0018] | - | - | +0.0009 | -0.0656 | -0.0259 | -0.0263 | hold |
| pullScale-high | lapsed-returner | +0.0009 [-0.0003, +0.0021] | - | - | +0.0020 | -0.7423 | -0.0303 | -0.4997 | hold |
| prereqPenalty-low | curious-newcomer | +0.0005 [-0.0002, +0.0011] | - | - | +0.0017 | -0.0442 | -0.0192 | +0.0098 | hold |
| prereqPenalty-low | single-subject-crammer | +0.0010 [+0.0001, +0.0019] | - | - | +0.0021 | -0.7536 | -0.0097 | -0.6102 | hold |
| prereqPenalty-low | struggling-repeater | -0.0002 [-0.0015, +0.0010] | - | - | +0.0004 | -0.6222 | -0.0255 | -0.3479 | hold |
| prereqPenalty-low | returning-expert | +0.0001 [-0.0002, +0.0004] | - | - | +0.0000 | +0.0032 | -0.0048 | -0.0460 | hold |
| prereqPenalty-low | wanderer | -0.0002 [-0.0008, +0.0004] | - | - | -0.0001 | -0.0406 | -0.0167 | -0.0714 | hold |
| prereqPenalty-low | lapsed-returner | -0.0009 [-0.0019, +0.0002] | - | - | +0.0008 | -0.7151 | -0.0189 | -0.4794 | hold |
| prereqPenalty-high | curious-newcomer | +0.0051 [+0.0041, +0.0062] | - | - | +0.0029 | -0.0623 | -0.0230 | +0.1973 | hold |
| prereqPenalty-high | single-subject-crammer | +0.0015 [+0.0003, +0.0028] | - | - | +0.0021 | -0.6142 | -0.0121 | -0.4926 | hold |
| prereqPenalty-high | struggling-repeater | +0.0058 [+0.0041, +0.0075] | - | - | +0.0012 | -0.7090 | -0.0327 | -0.2261 | hold |
| prereqPenalty-high | returning-expert | +0.0001 [-0.0004, +0.0007] | - | - | -0.0001 | -0.0041 | -0.0057 | -0.0476 | hold |
| prereqPenalty-high | wanderer | +0.0022 [+0.0011, +0.0033] | - | - | +0.0001 | -0.0333 | -0.0177 | -0.0130 | hold |
| prereqPenalty-high | lapsed-returner | +0.0019 [+0.0003, +0.0034] | - | - | +0.0007 | -0.7940 | -0.0212 | -0.4477 | hold |
| hypercorrection-low | curious-newcomer | +0.0023 [+0.0014, +0.0032] | - | - | +0.0024 | -0.0584 | -0.0200 | +0.0475 | hold |
| hypercorrection-low | single-subject-crammer | +0.0014 [+0.0003, +0.0025] | - | - | +0.0014 | -1.1049 | -0.0096 | -0.8523 | hold |
| hypercorrection-low | struggling-repeater | +0.0013 [+0.0000, +0.0026] | - | - | +0.0001 | -0.5722 | -0.0280 | -0.2916 | hold |
| hypercorrection-low | returning-expert | +0.0002 [-0.0002, +0.0006] | - | - | +0.0000 | +0.0032 | -0.0052 | -0.0471 | hold |
| hypercorrection-low | wanderer | +0.0007 [-0.0001, +0.0015] | - | - | -0.0003 | -0.0406 | -0.0173 | -0.0062 | hold |
| hypercorrection-low | lapsed-returner | +0.0000 [-0.0013, +0.0013] | - | - | +0.0009 | -0.7239 | -0.0197 | -0.4635 | hold |
| hypercorrection-high | curious-newcomer | +0.0021 [+0.0012, +0.0030] | - | - | +0.0022 | -0.0363 | -0.0193 | +0.0139 | hold |
| hypercorrection-high | single-subject-crammer | +0.0015 [+0.0003, +0.0027] | - | - | +0.0014 | -1.0064 | -0.0097 | -0.7569 | hold |
| hypercorrection-high | struggling-repeater | +0.0018 [+0.0004, +0.0032] | - | - | +0.0002 | -0.4978 | -0.0257 | -0.2571 | hold |
| hypercorrection-high | returning-expert | +0.0003 [-0.0001, +0.0008] | - | - | +0.0000 | +0.0032 | -0.0053 | -0.0425 | hold |
| hypercorrection-high | wanderer | +0.0007 [-0.0001, +0.0016] | - | - | -0.0004 | -0.0278 | -0.0166 | +0.0056 | hold |
| hypercorrection-high | lapsed-returner | +0.0002 [-0.0011, +0.0016] | - | - | +0.0010 | -0.6704 | -0.0191 | -0.4769 | hold |
| learnRate-low | curious-newcomer | +0.0009 [-0.0004, +0.0021] | - | - | +0.0025 | -0.1292 | -0.0332 | -0.0147 | hold |
| learnRate-low | single-subject-crammer | +0.0011 [-0.0002, +0.0023] | - | - | +0.0010 | -1.2751 | -0.0155 | -0.7699 | hold |
| learnRate-low | struggling-repeater | -0.0001 [-0.0017, +0.0016] | - | - | +0.0002 | -0.5496 | -0.0382 | -0.3439 | hold |
| learnRate-low | returning-expert | -0.0001 [-0.0007, +0.0004] | - | - | -0.0001 | -0.0142 | -0.0071 | -0.0605 | hold |
| learnRate-low | wanderer | +0.0002 [-0.0008, +0.0012] | - | - | -0.0003 | -0.0602 | -0.0215 | -0.1697 | hold |
| learnRate-low | lapsed-returner | -0.0010 [-0.0027, +0.0006] | - | - | +0.0009 | -0.6133 | -0.0270 | -0.4189 | hold |

**gam vs draft-rules**

| cell | persona | ΔR [95% CI] | win | harm | ΔG1 hi (≤ +0.05) | ΔG2 lo (count; rule: ≥ −5% of default mean) | ΔG3 hi (≤ +0.02) | ΔG4 lo (count; rule: ≥ −5% of default mean) | guardrails |
|---|---|---|---|---|---|---|---|---|---|
| base | curious-newcomer | -0.0001 [-0.0029, +0.0027] | - | - | +0.0024 | -0.0584 | -0.0200 | +0.0475 | hold |
| base | single-subject-crammer | +0.0047 [+0.0024, +0.0070] | - | - | +0.0014 | -1.1049 | -0.0096 | -0.8523 | hold |
| base | struggling-repeater | -0.0016 [-0.0054, +0.0022] | - | - | +0.0001 | -0.5722 | -0.0280 | -0.2916 | hold |
| base | returning-expert | +0.0018 [+0.0002, +0.0034] | - | - | +0.0000 | +0.0032 | -0.0052 | -0.0471 | hold |
| base | wanderer | +0.0004 [-0.0018, +0.0026] | - | - | -0.0003 | -0.0406 | -0.0173 | -0.0062 | hold |
| base | lapsed-returner | -0.0024 [-0.0054, +0.0006] | - | - | +0.0009 | -0.7239 | -0.0197 | -0.4635 | hold |
| forgetScale-low | curious-newcomer | -0.0003 [-0.0032, +0.0026] | - | - | +0.0022 | -0.0363 | -0.0192 | +0.0534 | hold |
| forgetScale-low | single-subject-crammer | +0.0054 [+0.0030, +0.0078] | - | - | +0.0021 | -0.4661 | -0.0101 | -0.3993 | hold |
| forgetScale-low | struggling-repeater | -0.0013 [-0.0054, +0.0028] | - | - | +0.0007 | -0.6213 | -0.0261 | -0.2887 | hold |
| forgetScale-low | returning-expert | +0.0019 [+0.0002, +0.0036] | - | - | +0.0000 | +0.0032 | -0.0050 | -0.0223 | hold |
| forgetScale-low | wanderer | +0.0004 [-0.0020, +0.0027] | - | - | -0.0004 | -0.0495 | -0.0155 | +0.0153 | hold |
| forgetScale-low | lapsed-returner | -0.0020 [-0.0052, +0.0012] | - | - | +0.0007 | -0.6113 | -0.0182 | -0.4371 | hold |
| forgetScale-high | curious-newcomer | +0.0001 [-0.0024, +0.0026] | - | - | +0.0025 | -0.0898 | -0.0223 | +0.0616 | hold |
| forgetScale-high | single-subject-crammer | +0.0035 [+0.0015, +0.0055] | - | - | +0.0005 | -1.5841 | -0.0106 | -1.2395 | hold |
| forgetScale-high | struggling-repeater | -0.0012 [-0.0044, +0.0021] | - | - | +0.0001 | -0.5093 | -0.0319 | -0.2330 | hold |
| forgetScale-high | returning-expert | +0.0018 [+0.0003, +0.0032] | - | - | +0.0001 | -0.0142 | -0.0056 | -0.0538 | hold |
| forgetScale-high | wanderer | -0.0003 [-0.0023, +0.0016] | - | - | -0.0001 | -0.0342 | -0.0184 | -0.0839 | hold |
| forgetScale-high | lapsed-returner | -0.0016 [-0.0043, +0.0011] | - | - | +0.0013 | -0.8367 | -0.0230 | -0.5247 | hold |
| pullScale-low | curious-newcomer | +0.0010 [-0.0019, +0.0038] | - | - | +0.0025 | -0.0283 | -0.0095 | -0.0083 | hold |
| pullScale-low | single-subject-crammer | +0.0045 [+0.0022, +0.0067] | - | - | +0.0006 | -1.2582 | -0.0031 | -1.1971 | hold |
| pullScale-low | struggling-repeater | +0.0006 [-0.0033, +0.0045] | - | - | -0.0011 | -0.5472 | -0.0170 | -0.3640 | hold |
| pullScale-low | returning-expert | +0.0019 [+0.0004, +0.0035] | - | - | +0.0002 | +0.0032 | -0.0023 | -0.0928 | hold |
| pullScale-low | wanderer | +0.0007 [-0.0016, +0.0030] | - | - | -0.0013 | -0.0003 | -0.0083 | -0.1048 | hold |
| pullScale-low | lapsed-returner | -0.0010 [-0.0042, +0.0021] | - | - | -0.0005 | -0.6602 | -0.0117 | -0.5649 | hold |
| pullScale-high | curious-newcomer | -0.0004 [-0.0028, +0.0021] | - | - | +0.0020 | -0.0782 | -0.0318 | +0.0409 | hold |
| pullScale-high | single-subject-crammer | +0.0018 [-0.0004, +0.0039] | - | - | +0.0006 | -1.5633 | -0.0169 | -1.2153 | hold |
| pullScale-high | struggling-repeater | -0.0002 [-0.0033, +0.0029] | - | - | +0.0004 | -0.6352 | -0.0406 | -0.3115 | hold |
| pullScale-high | returning-expert | +0.0016 [-0.0000, +0.0032] | - | - | -0.0001 | -0.0509 | -0.0092 | -0.0368 | hold |
| pullScale-high | wanderer | -0.0009 [-0.0031, +0.0014] | - | - | +0.0009 | -0.0656 | -0.0259 | -0.0263 | hold |
| pullScale-high | lapsed-returner | -0.0011 [-0.0037, +0.0014] | - | - | +0.0020 | -0.7423 | -0.0303 | -0.4997 | hold |
| prereqPenalty-low | curious-newcomer | +0.0006 [-0.0017, +0.0030] | - | - | +0.0017 | -0.0442 | -0.0192 | +0.0098 | hold |
| prereqPenalty-low | single-subject-crammer | +0.0045 [+0.0024, +0.0066] | - | - | +0.0021 | -0.7536 | -0.0097 | -0.6102 | hold |
| prereqPenalty-low | struggling-repeater | -0.0003 [-0.0035, +0.0029] | - | - | +0.0004 | -0.6222 | -0.0255 | -0.3479 | hold |
| prereqPenalty-low | returning-expert | +0.0014 [-0.0001, +0.0028] | - | - | +0.0000 | +0.0032 | -0.0048 | -0.0460 | hold |
| prereqPenalty-low | wanderer | +0.0002 [-0.0018, +0.0021] | - | - | -0.0001 | -0.0406 | -0.0167 | -0.0714 | hold |
| prereqPenalty-low | lapsed-returner | -0.0008 [-0.0035, +0.0018] | - | - | +0.0008 | -0.7151 | -0.0189 | -0.4794 | hold |
| prereqPenalty-high | curious-newcomer | +0.0019 [-0.0012, +0.0050] | - | - | +0.0029 | -0.0623 | -0.0230 | +0.1973 | hold |
| prereqPenalty-high | single-subject-crammer | +0.0051 [+0.0024, +0.0077] | - | - | +0.0021 | -0.6142 | -0.0121 | -0.4926 | hold |
| prereqPenalty-high | struggling-repeater | -0.0015 [-0.0053, +0.0022] | - | - | +0.0012 | -0.7090 | -0.0327 | -0.2261 | hold |
| prereqPenalty-high | returning-expert | +0.0016 [-0.0002, +0.0035] | - | - | -0.0001 | -0.0041 | -0.0057 | -0.0476 | hold |
| prereqPenalty-high | wanderer | +0.0017 [-0.0012, +0.0045] | - | - | +0.0001 | -0.0333 | -0.0177 | -0.0130 | hold |
| prereqPenalty-high | lapsed-returner | -0.0030 [-0.0065, +0.0004] | - | - | +0.0007 | -0.7940 | -0.0212 | -0.4477 | hold |
| hypercorrection-low | curious-newcomer | -0.0001 [-0.0029, +0.0027] | - | - | +0.0024 | -0.0584 | -0.0200 | +0.0475 | hold |
| hypercorrection-low | single-subject-crammer | +0.0047 [+0.0024, +0.0070] | - | - | +0.0014 | -1.1049 | -0.0096 | -0.8523 | hold |
| hypercorrection-low | struggling-repeater | -0.0016 [-0.0054, +0.0022] | - | - | +0.0001 | -0.5722 | -0.0280 | -0.2916 | hold |
| hypercorrection-low | returning-expert | +0.0018 [+0.0002, +0.0034] | - | - | +0.0000 | +0.0032 | -0.0052 | -0.0471 | hold |
| hypercorrection-low | wanderer | +0.0004 [-0.0018, +0.0026] | - | - | -0.0003 | -0.0406 | -0.0173 | -0.0062 | hold |
| hypercorrection-low | lapsed-returner | -0.0024 [-0.0054, +0.0006] | - | - | +0.0009 | -0.7239 | -0.0197 | -0.4635 | hold |
| hypercorrection-high | curious-newcomer | -0.0005 [-0.0036, +0.0025] | - | - | +0.0022 | -0.0363 | -0.0193 | +0.0139 | hold |
| hypercorrection-high | single-subject-crammer | +0.0046 [+0.0021, +0.0071] | - | - | +0.0014 | -1.0064 | -0.0097 | -0.7569 | hold |
| hypercorrection-high | struggling-repeater | -0.0021 [-0.0063, +0.0022] | - | - | +0.0002 | -0.4978 | -0.0257 | -0.2571 | hold |
| hypercorrection-high | returning-expert | +0.0019 [+0.0002, +0.0035] | - | - | +0.0000 | +0.0032 | -0.0053 | -0.0425 | hold |
| hypercorrection-high | wanderer | +0.0007 [-0.0017, +0.0031] | - | - | -0.0004 | -0.0278 | -0.0166 | +0.0056 | hold |
| hypercorrection-high | lapsed-returner | -0.0019 [-0.0050, +0.0012] | - | - | +0.0010 | -0.6704 | -0.0191 | -0.4769 | hold |
| learnRate-low | curious-newcomer | +0.0018 [-0.0012, +0.0049] | - | - | +0.0025 | -0.1292 | -0.0332 | -0.0147 | hold |
| learnRate-low | single-subject-crammer | +0.0067 [+0.0043, +0.0092] | - | - | +0.0010 | -1.2751 | -0.0155 | -0.7699 | hold |
| learnRate-low | struggling-repeater | +0.0006 [-0.0026, +0.0037] | - | - | +0.0002 | -0.5496 | -0.0382 | -0.3439 | hold |
| learnRate-low | returning-expert | +0.0027 [+0.0008, +0.0046] | - | - | -0.0001 | -0.0142 | -0.0071 | -0.0605 | hold |
| learnRate-low | wanderer | +0.0039 [+0.0009, +0.0070] | - | - | -0.0003 | -0.0602 | -0.0215 | -0.1697 | hold |
| learnRate-low | lapsed-returner | +0.0023 [-0.0016, +0.0063] | - | - | +0.0009 | -0.6133 | -0.0270 | -0.4189 | hold |

### Per-term results (criterion §2: items 1 and 2 only; reported, not part of the GAM pass)

| term pair (cell) | wins | harmed | meets the per-term rule |
|---|---|---|---|
| breadth: gam vs gam-no-breadth (base) | 0 | none | no |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | 0 | none | no |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | 0 | none | no |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | 0 | none | no |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | 0 | none | no |

| term pair (cell) | persona | ΔR [95% CI] | win | harm |
|---|---|---|---|---|
| breadth: gam vs gam-no-breadth (base) | curious-newcomer | +0.0001 [-0.0006, +0.0007] | - | - |
| breadth: gam vs gam-no-breadth (base) | single-subject-crammer | -0.0001 [-0.0009, +0.0007] | - | - |
| breadth: gam vs gam-no-breadth (base) | struggling-repeater | -0.0009 [-0.0018, +0.0000] | - | - |
| breadth: gam vs gam-no-breadth (base) | returning-expert | -0.0002 [-0.0004, +0.0001] | - | - |
| breadth: gam vs gam-no-breadth (base) | wanderer | -0.0000 [-0.0005, +0.0005] | - | - |
| breadth: gam vs gam-no-breadth (base) | lapsed-returner | -0.0001 [-0.0010, +0.0008] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | curious-newcomer | -0.0005 [-0.0012, +0.0002] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | single-subject-crammer | -0.0007 [-0.0015, +0.0001] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | struggling-repeater | -0.0004 [-0.0014, +0.0006] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | returning-expert | -0.0002 [-0.0005, +0.0002] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | wanderer | -0.0004 [-0.0009, +0.0001] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty--0.05) | lapsed-returner | -0.0009 [-0.0018, +0.0000] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | curious-newcomer | -0.0006 [-0.0011, -0.0002] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | single-subject-crammer | -0.0005 [-0.0011, +0.0001] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | struggling-repeater | -0.0011 [-0.0018, -0.0003] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | returning-expert | -0.0002 [-0.0003, +0.0000] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | wanderer | -0.0000 [-0.0004, +0.0003] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0) | lapsed-returner | -0.0008 [-0.0015, -0.0001] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | curious-newcomer | -0.0005 [-0.0011, +0.0001] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | single-subject-crammer | -0.0003 [-0.0011, +0.0005] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | struggling-repeater | -0.0015 [-0.0026, -0.0005] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | returning-expert | +0.0001 [-0.0003, +0.0004] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | wanderer | +0.0000 [-0.0005, +0.0006] | - | - |
| novelty: gam vs gam-no-surprise-novelty (novelty-0.05) | lapsed-returner | -0.0007 [-0.0015, +0.0001] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | curious-newcomer | +0.0013 [+0.0005, +0.0021] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | single-subject-crammer | +0.0006 [-0.0003, +0.0015] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | struggling-repeater | +0.0022 [+0.0010, +0.0033] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | returning-expert | +0.0002 [-0.0002, +0.0005] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | wanderer | +0.0005 [-0.0002, +0.0012] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-base) | lapsed-returner | +0.0010 [-0.0001, +0.0020] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | curious-newcomer | +0.0012 [+0.0004, +0.0020] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | single-subject-crammer | +0.0008 [-0.0002, +0.0018] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | struggling-repeater | +0.0018 [+0.0004, +0.0032] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | returning-expert | +0.0000 [-0.0004, +0.0004] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | wanderer | +0.0007 [-0.0002, +0.0015] | - | - |
| surprise: gam-surprise-on vs gam (rho-0-surprise-high) | lapsed-returner | +0.0007 [-0.0004, +0.0018] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | curious-newcomer | +0.0013 [+0.0005, +0.0021] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | single-subject-crammer | +0.0003 [-0.0006, +0.0012] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | struggling-repeater | +0.0019 [+0.0008, +0.0031] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | returning-expert | +0.0002 [-0.0002, +0.0006] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | wanderer | -0.0003 [-0.0010, +0.0003] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-base) | lapsed-returner | +0.0004 [-0.0005, +0.0014] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | curious-newcomer | +0.0015 [+0.0006, +0.0023] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | single-subject-crammer | +0.0002 [-0.0007, +0.0011] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | struggling-repeater | +0.0018 [+0.0005, +0.0032] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | returning-expert | +0.0001 [-0.0003, +0.0005] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | wanderer | -0.0001 [-0.0008, +0.0007] | - | - |
| surprise: gam-surprise-on vs gam (rho-0.5-surprise-high) | lapsed-returner | +0.0006 [-0.0005, +0.0017] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | curious-newcomer | +0.0007 [-0.0002, +0.0016] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | single-subject-crammer | -0.0008 [-0.0018, +0.0003] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | struggling-repeater | +0.0019 [+0.0008, +0.0030] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | returning-expert | +0.0002 [-0.0002, +0.0006] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | wanderer | +0.0004 [-0.0003, +0.0010] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-base) | lapsed-returner | +0.0007 [-0.0005, +0.0018] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | curious-newcomer | +0.0014 [+0.0004, +0.0023] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | single-subject-crammer | -0.0007 [-0.0017, +0.0003] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | struggling-repeater | +0.0019 [+0.0007, +0.0031] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | returning-expert | +0.0002 [-0.0003, +0.0006] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | wanderer | +0.0004 [-0.0003, +0.0012] | - | - |
| surprise: gam-surprise-on vs gam (rho-1-surprise-high) | lapsed-returner | +0.0003 [-0.0009, +0.0014] | - | - |

### Reference rows (ΔR vs default-order, base cell; no rule)

| policy | persona | ΔR [95% CI] |
|---|---|---|
| random | curious-newcomer | -0.0109 [-0.0148, -0.0070] |
| random | single-subject-crammer | -0.0164 [-0.0203, -0.0126] |
| random | struggling-repeater | -0.0085 [-0.0137, -0.0034] |
| random | returning-expert | -0.0058 [-0.0084, -0.0032] |
| random | wanderer | -0.0062 [-0.0100, -0.0023] |
| random | lapsed-returner | -0.0091 [-0.0141, -0.0041] |
| epsilon-greedy | curious-newcomer | +0.0019 [-0.0001, +0.0040] |
| epsilon-greedy | single-subject-crammer | -0.0009 [-0.0027, +0.0009] |
| epsilon-greedy | struggling-repeater | +0.0004 [-0.0020, +0.0028] |
| epsilon-greedy | returning-expert | -0.0006 [-0.0019, +0.0008] |
| epsilon-greedy | wanderer | -0.0011 [-0.0029, +0.0007] |
| epsilon-greedy | lapsed-returner | -0.0021 [-0.0042, +0.0001] |

### Corners (reported, not part of pass; axes in order forgetScale, pullScale, prereqPenalty, hypercorrection; L = low, H = high)

| corner: pair | wins | harmed | guardrail failures | beats | mean ΔR over personas |
|---|---|---|---|---|---|
| corner-LLLL: gam vs default-order | 0 | none | none | no | -0.0002 |
| corner-LLLL: gam vs draft-rules | 0 | none | none | no | +0.0013 |
| corner-HLLL: gam vs default-order | 0 | none | none | no | -0.0000 |
| corner-HLLL: gam vs draft-rules | 0 | none | none | no | +0.0014 |
| corner-LHLL: gam vs default-order | 0 | none | none | no | +0.0001 |
| corner-LHLL: gam vs draft-rules | 0 | none | none | no | +0.0008 |
| corner-HHLL: gam vs default-order | 0 | none | none | no | +0.0003 |
| corner-HHLL: gam vs draft-rules | 0 | none | none | no | +0.0008 |
| corner-LLHL: gam vs default-order | 0 | none | none | no | +0.0002 |
| corner-LLHL: gam vs draft-rules | 0 | none | none | no | +0.0025 |
| corner-HLHL: gam vs default-order | 0 | none | none | no | +0.0010 |
| corner-HLHL: gam vs draft-rules | 0 | none | none | no | +0.0020 |
| corner-LHHL: gam vs default-order | 0 | none | none | no | +0.0049 |
| corner-LHHL: gam vs draft-rules | 0 | none | none | no | -0.0006 |
| corner-HHHL: gam vs default-order | 0 | none | none | no | +0.0047 |
| corner-HHHL: gam vs draft-rules | 0 | none | none | no | -0.0005 |
| corner-LLLH: gam vs default-order | 0 | none | none | no | -0.0002 |
| corner-LLLH: gam vs draft-rules | 0 | none | none | no | +0.0012 |
| corner-HLLH: gam vs default-order | 0 | none | none | no | -0.0000 |
| corner-HLLH: gam vs draft-rules | 0 | none | none | no | +0.0012 |
| corner-LHLH: gam vs default-order | 0 | none | none | no | +0.0002 |
| corner-LHLH: gam vs draft-rules | 0 | none | none | no | +0.0011 |
| corner-HHLH: gam vs default-order | 0 | none | none | no | +0.0002 |
| corner-HHLH: gam vs draft-rules | 0 | none | none | no | +0.0005 |
| corner-LLHH: gam vs default-order | 0 | none | none | no | +0.0001 |
| corner-LLHH: gam vs draft-rules | 0 | none | none | no | +0.0025 |
| corner-HLHH: gam vs default-order | 0 | none | none | no | +0.0010 |
| corner-HLHH: gam vs draft-rules | 0 | none | none | no | +0.0021 |
| corner-LHHH: gam vs default-order | 1 | none | none | no | +0.0050 |
| corner-LHHH: gam vs draft-rules | 0 | none | none | no | -0.0007 |
| corner-HHHH: gam vs default-order | 0 | none | none | no | +0.0052 |
| corner-HHHH: gam vs draft-rules | 0 | none | none | no | -0.0009 |

### Descriptive, base cell (engagement and dilution; never pass inputs)

| policy | persona | moved share | reveal share | cards started | R_realised − R |
|---|---|---|---|---|---|
| default-order | curious-newcomer | 0.000 | 0.964 | 116.7 | -0.0008 |
| default-order | single-subject-crammer | 0.000 | 0.974 | 128.9 | +0.0009 |
| default-order | struggling-repeater | 0.000 | 0.947 | 98.4 | +0.0024 |
| default-order | returning-expert | 0.000 | 0.983 | 142.8 | -0.0020 |
| default-order | wanderer | 0.000 | 0.964 | 116.6 | -0.0034 |
| default-order | lapsed-returner | 0.000 | 0.946 | 96.0 | +0.0067 |
| draft-rules | curious-newcomer | 0.384 | 0.964 | 116.7 | +0.0005 |
| draft-rules | single-subject-crammer | 0.367 | 0.974 | 128.7 | +0.0010 |
| draft-rules | struggling-repeater | 0.393 | 0.946 | 98.0 | +0.0011 |
| draft-rules | returning-expert | 0.402 | 0.983 | 142.8 | -0.0018 |
| draft-rules | wanderer | 0.397 | 0.964 | 116.6 | -0.0009 |
| draft-rules | lapsed-returner | 0.442 | 0.946 | 96.1 | +0.0076 |
| gam | curious-newcomer | 0.195 | 0.964 | 116.7 | -0.0007 |
| gam | single-subject-crammer | 0.218 | 0.974 | 129.1 | +0.0006 |
| gam | struggling-repeater | 0.247 | 0.947 | 98.5 | +0.0027 |
| gam | returning-expert | 0.199 | 0.983 | 142.8 | -0.0022 |
| gam | wanderer | 0.220 | 0.964 | 116.6 | -0.0033 |
| gam | lapsed-returner | 0.261 | 0.945 | 95.9 | +0.0067 |
| gam-no-surprise-novelty | curious-newcomer | 0.191 | 0.964 | 116.7 | -0.0006 |
| gam-no-surprise-novelty | single-subject-crammer | 0.219 | 0.974 | 128.9 | +0.0008 |
| gam-no-surprise-novelty | struggling-repeater | 0.251 | 0.947 | 98.3 | +0.0021 |
| gam-no-surprise-novelty | returning-expert | 0.199 | 0.983 | 142.8 | -0.0022 |
| gam-no-surprise-novelty | wanderer | 0.222 | 0.964 | 116.6 | -0.0032 |
| gam-no-surprise-novelty | lapsed-returner | 0.264 | 0.945 | 95.9 | +0.0074 |
| gam-no-breadth | curious-newcomer | 0.191 | 0.964 | 116.7 | -0.0009 |
| gam-no-breadth | single-subject-crammer | 0.215 | 0.975 | 129.0 | +0.0009 |
| gam-no-breadth | struggling-repeater | 0.246 | 0.947 | 98.5 | +0.0023 |
| gam-no-breadth | returning-expert | 0.199 | 0.983 | 142.8 | -0.0022 |
| gam-no-breadth | wanderer | 0.221 | 0.964 | 116.6 | -0.0035 |
| gam-no-breadth | lapsed-returner | 0.266 | 0.946 | 95.8 | +0.0076 |
| random | curious-newcomer | 0.993 | 0.964 | 116.7 | +0.0012 |
| random | single-subject-crammer | 0.992 | 0.972 | 125.8 | -0.0002 |
| random | struggling-repeater | 0.994 | 0.946 | 98.1 | -0.0010 |
| random | returning-expert | 0.992 | 0.983 | 142.8 | -0.0009 |
| random | wanderer | 0.993 | 0.964 | 116.6 | -0.0037 |
| random | lapsed-returner | 0.995 | 0.944 | 95.0 | +0.0050 |
| epsilon-greedy | curious-newcomer | 0.316 | 0.964 | 116.7 | -0.0007 |
| epsilon-greedy | single-subject-crammer | 0.345 | 0.974 | 128.3 | +0.0008 |
| epsilon-greedy | struggling-repeater | 0.370 | 0.948 | 98.6 | +0.0033 |
| epsilon-greedy | returning-expert | 0.321 | 0.983 | 142.8 | -0.0011 |
| epsilon-greedy | wanderer | 0.338 | 0.964 | 116.6 | -0.0036 |
| epsilon-greedy | lapsed-returner | 0.374 | 0.945 | 96.2 | +0.0072 |

