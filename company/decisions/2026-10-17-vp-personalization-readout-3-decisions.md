# Criterion 3 readout 3: what pre-commitments 1 to 6 decide (V3)

owner: vp-personalization (Mateo)
date: 2026-10-17
run: vp-v3-1017 · board: W-1748 (lane 14 batch 4 V, company/personalization/batches/2026-10-17-batch-4.md#v; batch 5 item V3, company/personalization/batches/2026-10-17-batch-5.md §6 "V3, RC, G, MR")
status: **decided and in effect, unconditionally.** Every line in §1 applies a rule written before readout 3 existed. Nothing here is new judgement on a verdict, and nothing here reads, predicts or anticipates a `reachable-v2` number.
inputs read: company/personalization/eval/2026-10-17-criterion-3-readout.md (§1 to §8 and §A's rule-3 field, base-cell tables, wins per cell); company/personalization/eval/2026-10-17-criterion-3-readout-repro.md (R3, W-1747, merged at 86cad85); company/personalization/batches/2026-10-17-batch-4.md (pre-commitments 1 to 6 verbatim, the two pre-data readings, §V); company/decisions/2026-10-17-vp-personalization-readout-2-decisions.md (§5, founder answers Q1 to Q4); company/decisions/2026-10-17-founder-personalization-milestone-delegation.md ("Decisions taken now under the delegation"); company/personalization/batches/2026-10-17-batch-5.md (§0, §4, §11, §12); D2's coverage report (lesson-dims-owner mail 20261017T191811518Z-lesson-dims-owner-714e4773, coverage table on perso-m1-d2 4a559d6).
rules: independence rule company/ceo-office/2026-10-16-personalization-org-proposal.md §2 (I write no criterion, readout, curve or weight, and I do not re-read a verdict); keep/kill authority company/roles/vp-personalization.md.

**Condition: R3. Met.** learner-model-engineer reproduced readout 3 at b1ae294 from §8 alone: both `results.ndjson` and both `verdicts.json` match §8's sha256s; each manifest differs only in `seconds`; the printed tables match §8 step 5's hash once the two seconds figures are put back (company/personalization/eval/2026-10-17-criterion-3-readout-repro.md). No verdict differs, so nothing below is conditional. The repro speaks to determinism only; I lean on it for nothing more. **R3 accepted** (W-1747 to done; chief of staff moves it). Batch 5 §0 rule 2's condition, "I have accepted R3 in writing", is met by this line.

## 0. Decisions at a glance

| Pre-commitment (verbatim in batch 4) | What readout 3 printed | Decision |
|---|---|---|
| 1. Readout 2 stays the record; no frozen arm re-tuned or re-entered | Readout 3 re-ran no readout-2 verdict; no frozen arm was a candidate | **Holds.** Readout 2's verdicts stand (GAM approach closed, review-timing-v1 closed) |
| 2. Ranges from learning-scientist-personalization's evidence; the eval may decline the oracle | E3 ranges set before the score (manifest e3Sha256 0e120add…); the reachable-signal oracle was built and passed T1 and RS1 to RS6, INVALID flag false | **Holds.** Rule 3 can fire; option A is not triggered by this rule |
| 3. If the reachable-signal oracle does not beat default-order by δ_min in ≥ 4 of 6 in the base cell, ordering closes | `verdicts.rule3` in `interleave:base` (the base cell criterion 3 §2.0 named before the freeze): **REACHABLE, 6 of 6**, Δ R₇ +0.0102 to +0.0176 vs δ_min 0.01 | **Personalised ordering for recall is not closed.** The closing branch does not fire. Option A (pause) is not recommended on this readout |
| 4. If it does, no build until the founder answers whether to design a candidate aimed at it | REACHABLE | **The question was asked and answered.** The chief of staff, deciding in the founder's place under the founder's grant, answered "build one candidate" (company/decisions/2026-10-17-founder-personalization-milestone-delegation.md, "Decisions taken now under the delegation"). Batch 5 is that one candidate (now `reachable-v2`, v1 retired unscored, batch 5 §11.1). No second candidate follows from this record |
| 5. Review volume and placement findings to head-of-product and evaluation-steward as input only | Interleave and review rows in readout 3 §5 | **Input only**, sent through W-1740 (head-of-product) and W-1741 (evaluation-steward). No F2 text from me (§3) |
| 6. A pass of anything is not a phase B | Δ 1.0 to 1.8 points R₇, below the smallest MDE (2.2 points at 10,000 learners) | **Nothing goes live from this readout.** The M1 website part stands on its own gates (§4) |

## 1. Thinness and fragility, written down (they change no reading)

Rule 3 reads one field, and it reads REACHABLE. I do not reopen it, and I do not soften it. These facts go into every record that cites readout 3, the release note and G's record:
- **Margin.** Two personas sit within 0.0006 of δ_min on the mean: returning-expert +0.0102, lapsed-returner +0.0106. The reachable arm reaches about 7 to 21% of oracle-order's gain in the base cell.
- **Three cells at 0 of 6.** `interleave:forgetScale-high`, `interleave:learnRate-low`, `interleave:prereqPenalty-low`. Also 1 of 6 at `forgetShape-high` and 2 of 6 at `priorKnowledgeMean-high`; 24 of 29 interleave cells at ≥ 4 of 6. In `first`, 10 of 11 cells at ≥ 4 (2 of 6 at `price-corner`), and 5 of 6 in `first:base` (lapsed-returner +0.0095). One-at-a-time cells are reported only under criterion 3; I read none of them as a verdict.
- **What the gain rests on.** The prerequisite term (it reaches +0.020 to +0.047 at `prereqPenalty-high` and 0 of 6 at `-low`) and which new lesson comes next; the arm takes almost as many refreshes as default-order (readout §4). This is why batch 5 S1 is scoped to the pilot catalogue (K-d). The wider catalogue has thinner prerequisite coverage: D2 reports lessons with ≥ 1 same-domain prerequisite at cs 128 of 153 and probability 57 of 77 (the pilot), but lifehacks 15 of 200 and all 568 of 946.
- **Not confirmable live.** 1.0 to 1.8 points is below every MDE in criterion 3 §6, and R₇ is a final-test read the product cannot observe (readout §7). A thin simulated gain is stated as such; it is not a fact about a learner (batch 5 G7).

## 2. Batch 4's other reads, as written there

- **O1 split.** Δ_full ≈ Δ_new in every cell and persona: new-pick choice recovers almost all of oracle-order's gain, and refresh choice adds nothing on top (interaction ≈ −Δ_refresh). The headroom does not rest on criterion 2's L4 refresh value; it is as large or larger when prior knowledge is stable (readout §2). My pre-data note (F3 N11: read taken vs skipped before saying refresh value matters) is read: oracle-refresh's gain is the value of **skipping** known lessons (default-order serves 4.0 to 45.8 refreshes per episode, oracle-refresh 0.3 to 1.9). I do not say refresh value matters.
- **refreshSkipped counter.** Defective by construction (caps at about 1), disclosed by the eval before I read it, used by no reading. I do not use it. A fix is a later criterion's, not this one's.
- **Ordering guardrails (reported, not read in criterion 3).** G1 (top-domain share) fails for the reachable arm in 6 of 6 personas in both base cells (readout §3). Criterion 3 does not read it, so it changes nothing here. It is a fact that bears on batch 5: §12 G1(c) requires G1 to G4 to hold in every persona for `reachable-v2` in criterion 3b's base cell and `first:base`, and criterion 3b §2.2 (draft) lists G1 as the top-domain share upper end ≤ +0.05. **I do not relax G1(c) now that I have seen this.** It was written before any candidate number; it stays. Anyone planning M1's website part should expect a real NO-GO risk on this line; that is a statement about a reference arm, not a prediction of the candidate's number.

## 3. Interleave and review rows: input only (pre-commitment 5)

Sent as input to W-1740 (head-of-product, owner of the default order) and W-1741 (evaluation-steward, AMD-008 F2, proposed). I decide nothing on them and propose no F2 text:
- In `interleave:base`, `default-order + none` is **worse** than `fixed` in 6 of 6 (−0.014 to −0.029, each a harm by criterion 2's test). Readout 2's "no revisits beats the fixed schedule" was a property of a revisits-first 12-slot feed with a one-for-one revisit price; it does not carry into the shipped interleave or into E3's cheaper price. My readout-2 record §3 already said it did not license thinning revisits; this readout supports keeping them.
- `oracle-review` beats `fixed` in 6 of 6 in both placements (+0.036 to +0.073 interleave, +0.069 to +0.128 first). Timing headroom remains; no review candidate is in lane 14 (readout 2 V3 closed review-timing-v1; any new review design is a new criterion and a founder question).
- In the interleave the fixed queue is long and mostly unserved (25 to 36 served, 114 to 143 left per 14-day episode); B4 limit: the rows describe Feed.tsx over not-yet-completed lessons, not a returning learner's re-rendered feed (readout §5).

## 4. What this record does and does not license

- **Licenses:** batch 5 §0 rule 2 is satisfied. K6 (personalization-eval) may freeze criterion 3b and score once F5b (W-1769) reports with no blocking row and criterion 3b names `reachable-v2` and its hash 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714 (W-1770). I send K6 only after F5b reports.
- **Does not license:** anything live, any registration, any second candidate, any change to criterion 3, its harness, readout 3, or a frozen arm. The website part of M1 needs, beyond a GO under batch 5 §4 and §12: W-1764 ratified, W-1765 passed, W-1766 answered, the W-1760 registration, the company flag off by default, and the founder's approval of the specific release (CLAUDE.md).

## 5. Mail sent with this record (run vp-v3-1017)

- F5b (W-1769, learning-scientist-personalization, check): 20261017T192533312Z-vp-personalization-3f8fe7db. Includes the O1 two-domain data check, read-only.
- S1 EDD (W-1771, personalization-engineer, design only, worktree /home/user/s3c-m1-s1, branch perso-m1-s1): 20261017T192533387Z-vp-personalization-88559214. D2's points (cross-domain successors filtered to pilot; misconceptionStrength dropped from shipped pilot dims, gap stated; pilot-only module) are decided there.
- **K6 not sent.** It goes only after F5b reports with no blocking row (§4).

## Objections

| From | Objection | Answer |
|---|---|---|
| chief-of-staff (delegation record) | The reachable gain is thin and collapses in three cells; a shipped order may help little | **Carried, upheld as a limit.** §1 writes it down; batch 5 §12 makes the gates stricter (no clear loss, any one-at-a-time harm NO-GO, kill switch, G10 withdrawal); G7 keeps it in the copy |
| me (pre-commitment 4's wording) | Rule 4 said "the founder answers"; the answer came from the chief of staff under delegation | **Accepted as valid, stated plainly.** The founder granted that power until M1 in his own words (delegation record, "What the founder said"); the deploy and the protected-path amendment stay his |
| personalization-eval (readout §3) | G1 fails 6 of 6 for the reachable arm; a candidate criterion must answer G1 | **Upheld.** Criterion 3b gates on G1 to G4 and batch 5 G1(c) reads them; I do not relax either (§2) |
| personalization-eval (readout §2) | refreshSkipped is defective; read skips as taken differences | **Accepted.** Not used here (§2) |
| learner-model-engineer (R3 observation 2) | Readout 3 §8 calls the manifest's e3Sha256 "world3.mjs's own" hash, but world3.mjs's file hash is 0f0d3dbf… (listed, matches) | **To personalization-eval as a wording nit** (board request); changes no byte and no verdict |
| learner-model-engineer (C2 O1) | estimate() takes a concept's domain from dims key order; matters if a concept spans two domains | **Checked as data, not a verdict:** one concept in the catalogue spans pilot and non-pilot domains (`euclid-gcd`: src/demos/cs/euclid-leftover-rectangle and src/demos/math/euclid-square-cutting). With pilot-only dims (batch 5 §11.2 item 4) only the cs lesson reaches `rank`, so it does not bite. F5b confirms; S1's EDD must pass pilot-only dims and test it. A v3 under G6 only if the pilot dims ever hold a two-domain concept |
