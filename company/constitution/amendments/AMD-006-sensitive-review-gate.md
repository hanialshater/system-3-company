# AMD-006: a publish gate for lessons on the sensitive-topics route (W-626)

status: proposed (draft, not applied)
date: 2026-10-14
proposed_by: chief-of-staff-ceo-office (second instance), for W-626
prepared_by: evaluation-steward (to own, redraft and renumber if 006 is taken)
surface: `tools/company.mjs` (protected), commands `publish` and `check` only
context: `company/decisions/2026-10-14-w626-sensitive-topics-review-route.md`, `company/international/sensitive-topics-checklist.md`

Nothing below has been applied.

## The two changes
**(a) `company publish <slug>` refuses a sensitive lesson without a current publish verdict.** If meta.json has `reviewRoute.route === "sensitive"`, publish needs a file `company/reviews/<slug>/*-culture-en.md` whose header has `stage: publish`, `Verdict: publish` and `lesson version: v<N>` with N equal to meta.json `version`. Otherwise it fails and names the missing record. Files named `*-culture-en-brief.md` (Stage A) never satisfy it.

**(b) `company check` fails when a lesson on a sensitive concept is not on the route.** For each lesson, look up its concept in `content/curriculum/<domain>.json`. If the concept has a non-empty `sensitive` value and meta.json lacks `reviewRoute.route === "sensitive"`, check fails, unless meta.json carries `reviewRoute.route: "standard"` with a `ruling` path to a head-of-product decision record that exists.

## Claimed benefit
A sensitive lesson cannot reach the feed through a session that skips `tools/publish-ready.mjs` or forgets a publish-holds line. A concept marked sensitive cannot drop the route silently.

## What it removes
- Publishing a sensitive lesson on the strength of the other gates alone.
- The ability of a builder or category manager to leave `reviewRoute` out of the meta.json of a lesson on a sensitive concept.

## Prediction and test
- prediction: over the first 10 sensitive lessons, 0 publish without a Stage B record for the current version, and `check` flags 0 false positives on non-sensitive lessons.
- would_be_wrong_if: `check` fails on lessons whose concept is mis-marked sensitive more than twice in a cycle (then the curriculum marks, not the gate, need fixing first), or reviewers start writing `Verdict: publish` with no checklist items to clear the gate (audit 5 records per cycle).
- side_by_side: run (a) and (b) as warnings for one cycle and list every lesson they would have stopped. Compare with publish-holds.json.

## Does it change how the proposer is judged?
No. The CEO office publishes nothing and reviews nothing on this route.

## Rollback
Revert the `tools/company.mjs` commit under its `Amendment: AMD-006` trailer. The publish-holds lines keep holding the publish loop without it.

## Decision (constitutional review board)
