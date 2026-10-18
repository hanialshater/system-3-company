# AMD-014: one risk-graded publish gate (simple path for every lesson)

status: proposed (draft, not applied)
date: 2026-10-18
proposed_by: chief-of-staff, for the founder's ask in `company/decisions/2026-10-18-founder-simple-scalable-lesson-path.md`
prepared_by: evaluation-steward (to own, redraft, split or renumber)
surface: `tools/company.mjs` (protected), commands `publish` and `check` only
supersedes if ratified: AMD-001 part (d) (verdict + version in the gate) and AMD-006 (sensitive gate); both fold into (a) and (b) below

Renumbered from AMD-013 on 2026-10-18: AMD-013 is the one readiness policy, ratified and applied (PR #8). This draft builds on it; parts (a) and the hold floor may already be covered there, and the evaluation steward's redraft (W-1907) must start from AMD-013 as applied.

Nothing below has been applied.

## The changes

**(a) Learner verdict for the current version.** `publish` needs the newest `evidence.simulatedLearner` record to carry `Verdict: launch` and `lesson version: v<N>` equal to meta.json `version`. (This is what `tools/publish-ready.mjs` checks today outside the gate.)

**(b) One extra reviewer for risky routes.** meta.json `reviewRoute.route` ∈ `standard | sensitive | safety | copyright`. For any route other than `standard`, `publish` needs a file `company/reviews/<slug>/*-<route>.md` with `stage: publish`, `Verdict: publish` and `lesson version: v<N>` equal to meta.json `version`. A `*-<route>-brief.md` file never satisfies it.

**(c) Accessibility scan.** `publish` needs `company/reviews/<slug>/*-a11y-scan.json` (written by `tools/a11y-scan.mjs --record`) for the current version with 0 findings of severity `fail`. `fix` and `manual` findings do not block; they go to the sampled human review.

**(d) Route declared.** `check` fails a lesson in `review` or `published` without `reviewRoute`. It fails a lesson whose concept has a non-empty `sensitive` field (or a Life Hacks safety class) unless the route is `sensitive` (or `safety`), or `standard` with a `ruling` path to an existing head-of-product record (AMD-006 (b), generalised).

**(e) Batch launch review.** `publish <slug…> --batch=<path>` needs a launch-review record at `<path>` that lists each slug and carries `signed: head-of-product` and a `predictions:` line. A single slug is a batch of one.

**(f) Incubating domains.** `publish` refuses a lesson whose domain has `"status": "incubating"` in `content/domains.json`, unless meta.json names a Domain Launch Review record listing the slug. Replaces per-lesson lines in `publish-holds.json` for Life Hacks, History, Big Ideas, Books and Behavioral.

## Claimed benefit
Every check that matters runs on every publish, whoever runs it. The holds list and the operator's memory stop being the gate. The per-lesson ceremonies that were skipped are replaced by batch records and stated samples.

## What it removes
- Publishing on a stale learner verdict, a missing route review, a failing accessibility scan or an unsigned launch review.
- About 200 hand-kept lines in `publish-holds.json`.
- Per-lesson launch-review records (one per batch instead).

## Prediction and test
- prediction: over the next 3 publish batches, 0 lessons reach `published` that a full manual review would have held for a route, verdict or `fail`-level a11y reason; the sampled reviews find a fatal flaw in ≤ 1 of 10 lessons.
- would_be_wrong_if: the a11y `fail` rule blocks more than 20% of otherwise-ready lessons for kit-origin findings (then fix the kit first, not the lessons), or samples find > 1 fatal flaw in 10 in two batches running (then the samples are too thin).
- side_by_side: run (a)–(f) as warnings for one cycle and list every lesson they would have stopped; compare with `publish-holds.json` and `publish-ready.mjs`.

## Does it change how the proposer is judged?
The chief of staff runs the publish loop today; this takes the hold decisions away from it. That is the intent (2026-10-13 role evaluation, finding 4).

## Rollback
Revert the `tools/company.mjs` commit under its `Amendment: AMD-014` trailer. `publish-ready.mjs` and `publish-holds.json` are kept until one clean batch has passed, so the old route still holds.

## Decision (constitutional review board)
