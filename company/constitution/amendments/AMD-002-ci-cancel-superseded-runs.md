# AMD-002: CI cancels superseded `verify` runs on the same ref

status: ratified
date: 2026-10-14
proposed_by: chief-of-staff (task given to the evaluation steward, 2026-10-14)
prepared_by: evaluation-steward
surface: `.github/workflows/ci.yml` (protected path; it holds the CI half of the protected-paths gate)

Nothing below has been applied. The diff was applied to a scratch copy of `ci.yml` and the result
parses as YAML, with `jobs.verify.concurrency` set and no top-level `concurrency` key. It has not
run on GitHub Actions.

**This differs from the proposal as asked, and the board should see why.** The request was a
top-level `concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }`. A top-level
block also cancels the `constitution` job, and on push that job does not check the commit's state.
It checks the range `github.event.before..HEAD`, which covers **only the commits in that push**.
Here is the sequence:

1. Push A changes `tests/qa/contract.spec.ts` and has no `Amendment:` trailer.
2. Push B arrives before run A starts. With the top-level block, run A is cancelled.
3. Run B's constitution job diffs A..B. A's protected change is not in that range, so it passes.
4. Run B's `verify` passes, and on the default branch `deploy.yml` releases B, with A's
   unratified change inside it.

So "the latest commit is still fully checked" is true for `verify` (it checks a tree: the whole
of B) and false for `constitution` (it checks a diff: only B's part). With the top-level block,
the protected-paths gate in CI can be bypassed by pushing twice quickly. That is the kind of
quiet change to the judge that Article 2 exists to stop. The amendment below puts the concurrency
only on `verify`. That is where the cost is (`npm ci`, build, Playwright install, QA). The
constitution job then still runs on every push.

If the board prefers the top-level form, it needs another change first: `constitution` must check
against a fixed base (for example the merge-base with the default branch, or the last commit
whose CI succeeded) and not against `github.event.before`. That would be a larger change to the
gate and belongs in its own amendment (see "Pre-existing gap" below).

## Claimed benefit

Agents push dozens of WIP snapshots a day, and every push queues a full `verify` run. About 300
runs are queued now. Runs queued at 09:05 finished around 12:45. `deploy.yml` fires on
`workflow_run` completion of the release commit, so a release waits behind runs for commits that
newer ones have already replaced. With the change, a new push to a ref cancels the running and
pending `verify` for that ref, so each ref has at most one `verify` in flight, for its newest
commit.

## The change

```diff
--- a/.github/workflows/ci.yml
+++ b/.github/workflows/ci.yml
@@ -37,6 +37,11 @@
           fi
 
   verify:
+    # AMD-002: a newer push to the same ref cancels this job. Only this job: the constitution
+    # job checks the diff since the previous push, so cancelling it would skip that diff unseen.
+    concurrency:
+      group: ci-verify-${{ github.ref }}
+      cancel-in-progress: true
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v4
```

- Grouping by `github.ref` gives each branch its own group (`refs/heads/<branch>`), and each PR
  its own group (`refs/pull/<n>/merge`). A push to branch X never cancels a run on branch Y or on
  a PR, and a PR run never cancels a push run.
- Nothing else changes: the triggers, both jobs' steps, the protected-paths logic, and `deploy.yml`.

## Why this does not weaken a gate

- **`verify` judges a tree, not a diff.** `check`, `typecheck`, `build` and `qa` run on the whole
  checked-out commit. The newest commit on a ref gets the full `verify`. Every rule that run A
  would have applied to A's tree is applied to B's tree, which contains A's changes unless B
  reverted them.
- **`constitution` keeps running on every push**, so each pushed range is still checked once.
  This is the reason for the job-level placement (see above).
- **A cancelled run cannot release.** `deploy.yml` requires
  `github.event.workflow_run.conclusion == 'success'`. A run whose `verify` was cancelled ends
  as `cancelled`, so only a commit that passed `verify` in full can deploy, as today.
- No check, reviewer or required step is removed. The only thing given up is a `verify` result
  for a commit that is no longer the tip of its ref.

## What it removes

- The `verify` (check / typecheck / build / QA) result for every **superseded** commit on a ref.
- **The risk:** a failure that only an older commit had, and that a later commit fixed or
  overwrote, is never recorded. Examples are a QA flake that only shows up at A, or a lesson
  broken at A and fixed at B. This matters little. The newest commit is the release candidate,
  and it is checked in full. Nobody deploys or reverts to a WIP snapshot that was superseded
  within minutes. What we do lose is history: `git bisect` over CI results gets coarser, and "when
  did this break" can only be narrowed to between two completed runs. If someone needs a result
  for an older commit, they can re-run it by hand (`gh run rerun`, or push the SHA to a scratch
  branch).
- A small one: `concurrency` keeps at most one running and one pending job per group. A burst of
  pushes therefore collapses to the newest one. This is the intended effect, stated so nobody is
  surprised.

## Pre-existing gap (not created by this amendment, and not fixed by it)

Today, if push A breaks the protected-paths rule and push B follows, run A goes red, but run B
passes (it diffs A..B), and on the default branch B deploys. `deploy.yml` reads only the release
commit's own run. This amendment leaves that gap exactly as it is: the constitution job still
runs for A and still fails visibly. The workflow-level form would have made the gap worse, by
hiding A's failure as well. Closing the gap needs `constitution` to compare against a fixed base.
I recommend a separate amendment (AMD-003, evaluation-steward to draft if the board wants it).

## Prediction and test

- prediction: Within 2 working days of ratification, the Actions queue for `ci` stays under 20
  queued runs at the busiest hour, and on the default branch the median time from push to `ci`
  conclusion falls below 30 minutes (it was about 3 h 40 m on 2026-10-14: queued 09:05, finished
  ~12:45). The number of `verify` runs that end `success` or `failure` per day falls to roughly
  the number of pushes that were not superseded while they ran.
- would_be_wrong_if: (1) the queue is still above 100 runs after 2 working days. Then the backlog
  comes from somewhere else (runner minutes, the constitution job, or the PR+push double
  trigger), and the change only costs us history. Or (2) any release commit deploys with a
  protected-path change that has no ratified AMD. Check with
  `git log --format='%H %B' <prev-release>..<release>` against `protected-paths.txt` for the
  first 10 releases. Or (3) a regression reaches a deploy that a cancelled run had caught and the
  tip run missed. That would mean the tip run does not dominate older runs (for example a flaky
  QA test passed at the tip).
- side_by_side: There is no true side-by-side for a scheduling change. Instead, for one cycle,
  every Monday the platform-engineer lists the cancelled `verify` runs on the default branch
  (`gh run list --workflow=ci --status=cancelled`) and re-runs a sample of 5. Any of those that
  fails where its successor passed is a disagreement: record it in the WBR and classify it as
  fixed-later (expected), flake, or masked regression (counts against this amendment).

## Does it change how the proposer is judged?

No. It changes when CI runs, not what CI judges or how lessons and roles are judged. The steward
prepared it but cannot ratify it (Article 3.3, own amendments). Recommended affected-role seat:
**platform-engineer** (owns the CI and deploy pipeline and `runbook-deploy.md`).

## Applying it (after ratification)

One commit (Article 3.5) that:
1. sets `status: ratified` in this file and fills in the Decision section. CI greps for
   `^status: ratified`, so a commit without this edit fails;
2. applies the diff above to `.github/workflows/ci.yml`;
3. is made with `S3_AMENDMENT=AMD-002` (for the hook) and has the trailer `Amendment: AMD-002` in
   its message (for CI). CI takes the **first** `AMD-<n>` it finds in the pushed range's
   messages, so do not mention any other AMD id in the messages of that push;
4. updates the AMD-002 row in `README.md` to ratified.

## Rollback

Revert the commit, or delete the five added lines. That is again a protected-path change, so the
rollback commit also needs `S3_AMENDMENT=AMD-002` and `Amendment: AMD-002`, with the rollback
recorded in this file's Decision section. Rollback has no state to undo: runs that were cancelled
stay cancelled, and anything that needs a result can be re-run by hand. Emergency path: the
founder can override in writing (Article 4.1) if the queue is not the problem and a masked
regression shipped.

## Decision (constitutional review board)
**Ratified as drafted (job-level `concurrency` on `verify` only), 2026-10-14, by the founder** ("ratify AMD-002", in session 1). Applied by the chief of staff in one commit with the `Amendment: AMD-002` trailer. The top-level form is not adopted. The fixed-base constitution check (proposed AMD-003) is not commissioned yet. Affected-role seat (platform-engineer): no written input was taken before ratification; the founder ratified directly. The platform engineer runs the Monday sample of cancelled runs named in "Prediction and test".
