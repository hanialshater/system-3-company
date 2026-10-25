# AMD-017: risk tiers for the publish gate, the sequence probe for multi-card lessons (restructuring step 10)

status: proposed (draft, not applied; for the evaluation steward to own, fold into the AMD-014 redraft W-1907, renumber or reject)
date: 2026-10-25
proposed_by: chief-of-staff-ceo-office, under the founder's approval of F-50 option A (company/decisions/2026-10-25-founder-restructuring.md, migration step 10)
prepared_for: evaluation-steward (gates are the steward's to propose), then the constitutional review board, then the founder (ratifies)
surface: `tools/company.mjs` (protected): `publish` and `check` only. No change to `src/kit/Lesson.tsx`, `tests/qa/**`, the constitution or `surface-value.md`
builds_on: AMD-014 (proposed, parts a-f) and AMD-013 (ratified, one readiness policy)

Nothing below has been applied. The CEO office wrote no protected file in this run.

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

## Decision (constitutional review board)
pending
