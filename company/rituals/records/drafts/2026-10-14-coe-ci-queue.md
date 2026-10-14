# Correction of Error: 2026-10-14: CI never concluded (~300 runs queued, deploy.yml skipped)

owner: backend-engineer (author, W-522; outside CI/deploy) · reviewers: evaluation-steward, pattern-librarian
status: DRAFT. Timeline and evidence by principal-engineer-ops (incident commander). Five whys, "What allowed it" and actions are the author's to write. Ops does not finalise this record.
incident: ev-c33bee719d (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
final path: company/rituals/records/2026-10-14-coe-ci-queue.md (the author moves this file there with `git mv` and sets `status: final`; `tools/dispatch-check.mjs` R2 only sees files directly in company/rituals/records/)

## What happened (facts, timestamps, links)
All times UTC, 2026-10-14. Sources: AMD-002, the constitutional review, the ops review, `gh run list`.
- Through the day, agents pushed dozens of WIP snapshot commits (about 30 "WIP snapshot" commits, constitutional review G4). Every push queued a full `ci` run (`constitution` + `verify`: `npm ci`, build, Playwright install, QA).
- 09:05: runs queued at this time concluded around 12:45, about 3 h 40 min from push to result (AMD-002, "Claimed benefit").
- About 13:00: about 300 `ci` runs queued (AMD-002).
- 13:05: AMD-002 proposed (`71aa854`). 13:09: ratified and applied (`a674a7a`): job-level `concurrency` on `verify` only, so a newer push cancels the older `verify` on the same ref. `constitution` still runs on every push, by design.
- About 15:00: the 60 most recent `ci` runs were all `queued`, including runs for commits from before 13:09 (constitutional review J1).
- 15:25: last 40 runs: `ci` 7 queued, 0 concluded; `Deploy to Vercel` 33 skipped (ops review scorecard).
- 15:27: SEV2 declared (ev-c33bee719d).
- 18:58 (while drafting): last 40 runs: `ci` 23 queued and 1 pending, 0 concluded; `Deploy to Vercel` 15 cancelled and 1 pending. The queue is still not draining after AMD-002.
- Meanwhile production was updated by Vercel's own git builds on `[deploy]` commits, which do not wait for `ci`. That is a separate SEV2 (drafts/2026-10-14-coe-deploy-bypass-and-quota.md).

## Impact (learners affected, lessons, claims)
- No change today was judged by CI. The protected-paths gate in CI (`constitution` job) and `verify` gave no result in time for any decision.
- The sanctioned release path (`deploy.yml` on `workflow_run` success) never fired: 33 skipped by 15:25.
- Learners: no direct harm found. Indirect: the lessons released today (5 `[deploy]` commits) reached learners with no CI result, through the bypass path.
- Claims: none rest on CI directly. The QA claim "verify passed" could not be made for any commit today.

## Five whys (stop when the answers stop being about people)
Author to write. Questions the evidence leaves open, for the author to answer rather than assume:
- Why does the queue not drain after AMD-002? Are the queued jobs `constitution` jobs (not covered by AMD-002), `verify` jobs on many refs, or runner-minute or concurrency limits on the GitHub plan?
- Which refs are pushed? One branch per agent worktree multiplies refs, and AMD-002 cancels only within one ref.
- Is a run "queued" because no runner was assigned, or because GitHub held it? (`gh run view <id>` timing.)
- Why did nothing alert before the queue reached ~300?

## What allowed it
Author to write.

## Actions (each changes a mechanism; tracked on the board until done)
Author to keep, change or drop each row, and add the root-cause fix. Rows below are mechanisms already in place or on the board today, listed so they are linked, not as conclusions.

| Action | Mechanism changed | Owner | Board id |
|---|---|---|---|
| Containment: a newer push cancels the older `verify` on the same ref | `.github/workflows/ci.yml` job-level concurrency (AMD-002, ratified 13:09) | platform-engineer | W-481 (falsifier on 2026-10-16: queue < 20 at the busiest hour, median push-to-conclusion < 30 min) |
| Production deploys only via `deploy.yml` after green `ci` (so CI health becomes release-blocking and visible) | Vercel git builds off or a Deployment Check on `ci`; decision record | platform-engineer + founder | W-480 |
| Snapshots stop pushing protected paths and record `check` status | `tools/snapshot.sh` | chief-of-staff (owner of snapshot.sh), board item owner tools-lead | W-482 |
| Self-hosted runner or second machine, against a hard cap (target CI queue < 20) | capacity decision record | principal-engineer; founder approves spend | W-531 |
| Builds and waves cannot be dispatched while a SEV1/SEV2 has no COE | `tools/dispatch-check.mjs` R2 (in place since `99573b8`; review W-715) | tools-lead (review) | W-715 |

## Claims and decisions to send back to review
- AMD-002's claimed benefit ("each ref has at most one `verify` in flight") is not yet shown to fix the queue. It goes back to the constitutional review if W-481 fails on 10-16.
- Any record today that says "CI passed" for a commit: none found by ops. Author to confirm.

## Pattern update
Pattern librarian, after the author's root cause. Candidate under test (ops review section 3): "every shared resource needs an allocator before it needs a cleanup". GitHub runners are one of the shared resources named.
