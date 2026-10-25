# AMD-017: risk tiers for the publish gate, the sequence probe for multi-card lessons (restructuring step 10)

status: ratified 2026-10-25 by the founder (F-51), as redrafted by the evaluation steward below; applied 2026-10-25 (commit under the `Amendment: AMD-017` trailer)
date: 2026-10-25
owner: evaluation-steward (owns the redraft and the gate)
record: company/decisions/2026-10-25-founder-f51-amd017.md
proposed_by: chief-of-staff-ceo-office, under the founder's approval of F-50 option A (company/decisions/2026-10-25-founder-restructuring.md, migration step 10)
prepared_for: evaluation-steward (gates are the steward's to propose), then the constitutional review board, then the founder (ratifies)
surface: `tools/company.mjs` (protected): `publish` and `check` only. No change to `src/kit/Lesson.tsx`, `tests/qa/**`, the constitution or `surface-value.md`
builds_on: AMD-014 (proposed, parts a-f) and AMD-013 (ratified, one readiness policy)

The CEO office's draft follows unchanged, then the steward's redraft (what was applied), then the decision.

## Why

The company now runs two content-type lanes, single-card (S) and multi-card sequence (M), with cost targets: 90k tokens per published tier-S lesson against 78k measured, and 300k per multi-card item. Today's gate (`launchGates`) asks for the same evidence from every lesson. It does not know that a lesson is a multi-card sequence, and it does not know its risk. Checks cost as much as the build: 36k against 36k per published catalog lesson (proposal section 1b).

## The changes (each can be ratified alone)

**(a) Tier from the route.** A lesson's tier comes from `meta.json`, so no new field is needed for it:
- **N (new):** the lesson's `format` (or a new `contentType`) has fewer than 3 published lessons.
- **R (risk):** `reviewRoute.route` is `sensitive`, `safety` or `copyright`.
- **S (standard):** any other lesson.

If a lesson is both N and R, tier N applies, because N requires everything R does.

**(b) Learner walk by tier.**
- Tier R and tier N: `publish` needs the AMD-014 (a) verdict, every lesson.
- Tier S: `publish` needs either that verdict, or a batch launch record (AMD-014 e) naming the lesson in a learner sample of at least 1 in 5 of the batch.
- Stop rule: if a sample finds more than 1 fatal flaw in 10, the category's next batch has 100% walks. The steward records the trigger in the batch record.

**(c) Route verdict.** This is AMD-014 (b) as drafted, for tiers R and N. The verdict comes from route-reviewer, the merged cultural and safety reviewer, which has one checklist per route.

**(d) Multi-card evidence.** For `format: multi-card-sequence`, `publish` needs a sequence-probe record (`tools/sequence-probe.mjs --record`, W-604) for the current version, with 0 failures at 390×844 and 1280.

**(e) Tier N extra evidence.** For a tier-N lesson, `publish` needs a design-review record and a pairwise record (pedagogy-critic) for the current version.

**(f) No code change for budgets.** The lane budget stop is in `tools/lib/ledger.mjs` and `dispatch-check` B1, which are not protected. It is listed here only so the board sees the whole path.

## Claimed benefit

Standard lessons stop paying for a learner walk each. That is about 19k of the 78k per published lesson, or roughly 15k saved per tier-S lesson at a 1-in-5 sample. Risky and new-format lessons keep every check and add the evidence that only they need.

## Prediction and test

- **prediction:** over lane S's first 100 published lessons under (b), the weekly audit of 50 published lessons (F-41 item 9) finds a fatal flaw in no more than 1 in 10. Tier-S cost per published lesson falls by at least 10k against the same lane's lessons published before ratification.
- **would_be_wrong_if:** the audit finds more than 1 fatal flaw in 10 in two weeks running. Then (b) is revoked for that category.
- **side_by_side:** run (a)-(e) as warnings for one cycle and list every lesson they would have stopped or passed differently.

## Does it change how the proposer is judged?

The CEO office's P2 prediction (lane S at 150k or less per published lesson) is easier to meet if (b) passes. The gate therefore stays the steward's to accept or reject. This draft is an input, not a vote.

## Rollback

Revert the `tools/company.mjs` commit under its `Amendment: AMD-017` (or AMD-014) trailer. Today's gate returns unchanged.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| Sampling the learner walk lowers the floor that caught soft locks after the 10-14 rush. | evaluation-steward (represented, company/ceo-office/consultations/2026-10-25-restructuring/evaluation-steward.md) | Standing: (b) has a stop rule and the weekly audit; the steward decides. |
| One route-reviewer role for three routes may dilute expertise. | evaluation-steward (represented) | Standing: one checklist per route; the steward rules in the redraft. |

## Steward's redraft (what was applied, 2026-10-25)

Kept separate from AMD-014 (W-1907 stays open): AMD-014 (a) is already the readiness rule (AMD-013), and (e) is not ratified, so AMD-017 carries its own batch sample record. Every departure from the draft above is listed here, with its reason, and each can be reversed in one commit under this trailer.

| Part | Applied as | Departs from the draft? |
|---|---|---|
| (a) tiers | `tools/lib/tiers.mjs` `tierOf`. N: the format (normalised, `contentType` or `format`) has fewer than 3 *other* published lessons. R: a risky `reviewRoute.route` on the lesson, **or** on its curriculum concept, **or** a non-empty `sensitive` on the concept, **or** a domain with `status: incubating`. S: the rest. N wins over R. | **Yes, stricter.** On 2026-10-25 no lesson declares `reviewRoute`; the route alone would put all 184 sensitive history concepts and every Life Hacks lesson in tier S. F-41 item 2 keeps the full gate for them. |
| (b) sampled walk | Live now. A tier-S lesson with no learner review of its own for its current version passes the learner part of the gate when the **earliest** batch record listing it at that version (`company/evaluation/batches/*.json`, written by `company sample <domain> <slug...> --by=<role>`) is valid, does not sample it, and every sampled lesson has a learner verdict for its listed version. | **Yes, three details.** (1) The sample is drawn by hash of the batch id and slug, not chosen by the maker, and the drawer is not a builder of any listed lesson (P6). (2) When a sample trips the stop rule (more than 1 fatal in 10), the unsampled lessons of **that** batch also need their own walks, not only the next batch. (3) If the lesson has its own learner review for the version, that review governs. |
| (b) stop rule | `coverage`: a tripped batch makes the category's next batch a full sample. | No. |
| would_be_wrong_if | `auditRevoked`: when the two most recent weekly audits (`company/evaluation/audits/*.json`) each find more than 1 fatal in 10 in a category, (b) is off for that category, in code. | No; the draft left it to a person. |
| (c) route verdict | `tierEvidence`, side by side (warnings in `publish` and `check`). | Per the draft's side_by_side line and Article 3.4. |
| (d) sequence-probe record | `tierEvidence`, side by side. Record: `company/reviews/<slug>/*-sequence-probe.md` with `lesson version: vN` and `0 FAIL`. `tools/sequence-probe.mjs` has no `--record` yet. | Side by side. |
| (e) design and pairwise records | `tierEvidence`, side by side. | Side by side. |
| (f) | No code (ledger and dispatch-check are not protected). | No. |

Guards: `company.mjs` holds the parameters (`AMD017`: 1/5, 1 in 10, 3, the risky routes) and a known-answer canary (19 cases) that the lib must pass before any lesson is covered; an error, unreadable record or failed canary closes the sampled path (every lesson walks, as before). Switch for (c)-(e): `AMD017_EVIDENCE_ENFORCED`, set to `true` by the steward after the side-by-side review (board item, due 2026-11-08).

Known weakness: the batch's slug list is chosen by its maker, who could re-list a batch to move a weak lesson out of the sample before the record is committed. Only the earliest record counts once committed. The weekly audit, drawn by the steward from all published lessons, is the check that does not depend on the maker.

## Decision (constitutional review board)

**Ratified 2026-10-25 by the founder (F-51)**, ticking the separately listed option "F-51 (AMD-017) now", worded: *"Ratify sampling learner walks at 1 in 5 now. The org-health role advises NOT yet: the weekly 50-lesson audit that should make up for it has never run."* The founder ratified knowing the objection.

Board: founder (ratified); evaluation steward (prepared, redrafted, applied); head of product and the affected role (principal-pm-verticals, lane S) were not convened in session; the founder's ratification decides (Article 3.2), and their objections can still be raised against the applied rule.

### Objections (carried)

| Objection | Raised by | Status |
|---|---|---|
| Ratifying the 1-in-5 sample before the weekly audit of 50 published lessons (F-41 item 9) has run removes a check without its safeguard. | chief-of-staff-ceo-office (org health; company/ceo-office/2026-10-25-principles-audit.md, P6) | **Open.** Owner: chief-of-staff-ceo-office. The sampled walk has no safeguard until the weekly audit runs; it closes when two weekly audits have run (the revocation rule needs two). The steward owns the audit (W-2050). |
| Sampling the learner walk lowers the floor that caught soft locks after the 10-14 rush. | evaluation-steward | Overruled by the founder's ratification; answered in part: the stop rule and the audit revocation are in code, risky and new-format lessons keep every walk. |
| One route-reviewer role for three routes may dilute expertise. | evaluation-steward | Open; (c) is side by side, decided at the enforcement review. |
