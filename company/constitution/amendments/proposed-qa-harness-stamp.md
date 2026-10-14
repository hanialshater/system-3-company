# AMD-<n>: QA records only stamped, clean harness runs (W-783)

status: proposed (number not reserved; the evaluation steward reserves it in README.md when drafting)
date: 2026-10-14
proposed_by: tools-lead
prepared_by: evaluation-steward
surface: `tools/company.mjs` (`qa-record`), optionally `tests/qa/contract.spec.ts`

## Context
W-783 (from the COE reviews of 2026-10-14): a QA or reveal-fit verdict must say which commit of the tool produced it,
so a private or edited copy cannot record a verdict. The unprotected half is done on branch
`worktree-agent-a15ac43c96b0c0ab5`:
- `tools/lib/tool-stamp.mjs` computes `{ head, commit, blobs, modified, clean }` for a set of files with git.
- `tools/reveal-fit.mjs` writes `tool` into its JSON and refuses to run (exit 3) when it differs from HEAD, unless `--allow-modified`.
- `playwright.config.ts` (unprotected) writes `config.metadata.qaStamp` into `qa-report.json` for `tests/qa/**` + itself.
  It only stamps; it does not refuse, because the reader of the report is the gate and the reader is protected.

The stamp alone does not stop anyone: `company qa-record` (protected) records a pass from any `qa-report.json`,
including one written by `playwright test -c <private config>` that carries no stamp.

## Proposed change
In `cmdQaRecord` (`tools/company.mjs`):
1. Read `report.config.metadata.qaStamp`. If it is missing, or `clean !== true`, record nothing and exit 1:
   "qa-record: report has no clean harness stamp (tests/qa/** or playwright.config.ts differ from HEAD, or the run used another config)".
2. Recompute the stamp now (same files) and require `qaStamp.commit` to equal the current commit of `tests/qa` +
   `playwright.config.ts`, so a report from an older harness is not recorded against today's contract.
3. Write `harness commit: <qaStamp.commit> (head <qaStamp.head>)` on the record's header line next to `harness:`.
Optional, in `tests/qa/contract.spec.ts`: a first test that fails when `S3_QA_STAMP` is absent, so a run that bypassed
the config fails loudly instead of producing an unstamped green report.

## Claimed benefit
Every QA record names the exact harness that produced it, and a copy of the harness cannot produce a record.

## What it removes
The ability to record QA from an edited or private harness. Local experiments still run; they just cannot be recorded.

## Prediction and test
- prediction: after ratification, every new `company/reviews/<slug>/<date>-qa.md` carries a harness commit equal to the
  last commit touching `tests/qa` at that date; `qa-record` on a report from a dirty harness exits 1.
- would_be_wrong_if: a clean CI run is refused (e.g. a shallow clone gives `commit` as the graft, not the real last
  commit: check `actions/checkout` depth; with depth 1, compare `qaStamp.blobs` to `git ls-tree HEAD` instead of `commit`).
- side_by_side: for one cycle, `qa-record` warns instead of refusing; count reports that would have been refused and why.

## Does it change how the proposer is judged?
no. tools-lead does not record QA.

## Rollback
Revert the `cmdQaRecord` hunk; the stamp in `playwright.config.ts` is harmless on its own.

## Decision (constitutional review board)
