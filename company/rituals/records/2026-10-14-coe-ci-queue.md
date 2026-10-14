# Correction of Error: 2026-10-14: CI never concluded (~300 runs queued, deploy.yml skipped)

owner: backend-engineer (author, W-522; outside CI/deploy) · reviewers: evaluation-steward, pattern-librarian
status: final (2026-10-14, backend-engineer). Timeline, evidence and impact by principal-engineer-ops (incident commander), unchanged except for the 19:02 evidence row the author added. Five whys, "What allowed it", actions and the answers below are the author's.
incident: ev-c33bee719d (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)

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
- 19:02 (author, `gh api repos/hanialshater/system-3-company/actions/runs`; the GitHub MCP tools were not available in the author's session, so this is the REST API via `gh`):
  - Repository-wide: **273 runs `queued`, 19 `in_progress`, 2 `pending`**. Of the queued runs, 157 were created before 13:09 (old workflow) and 118 after. All 100 newest queued runs are on `ccr-4c6c7654-ew9ko1` (the default branch). The **oldest queued run was created at 10:02**, 9 hours earlier.
  - The 19 `in_progress` runs were all created between **09:49 and 10:04** (12 on `ccr-4c6c7654-ew9ko1`, 7 on `ccr-rnd-ncm`, 2 of them `pull_request` duplicates of a push). Their `verify` jobs **got a runner only at 18:14 to 18:38**, about 8 h 20 min after push, and were in `npm run qa` at 19:02.
  - Post-AMD-002 runs behave as AMD-002 says: e.g. run 38620008047 (19:00, `b92f8a3`) has `verify` **cancelled** after 6 s, and its `constitution` job (about 6 s of work) **queued**. Run 38618079316 (18:47) is the same. So the runs that stay "queued" after 13:09 are waiting for a runner for `constitution`, not for `verify`.
  - Cost of one `verify` job: 38545816188 took 67 min (17:42 to 18:49); `npm run qa` in 38545042193 took 51 min (16:57 to 17:48). Everything before QA takes about 2 min. QA covers 945 lessons (`src/demos/**/meta.json`) × 2 Playwright projects (phone, desktop) in one job. `verify` has no `timeout-minutes` (GitHub's default is 360).
  - `ci` today: 650 runs created, 359 completed (of the newest 100 completed: 86 failure, 14 success; sampled failure 38541976228 failed at `npm run typecheck`). The completed ones are runs from 09:xx that concluded between 13:20 and 18:49.
  - `deploy.yml`: one `workflow_run` per `ci` completion. Failures are skipped by the job's `if` (the "33 skipped"). Its `concurrency` group `vercel-preview` with `cancel-in-progress: false` keeps one pending run and cancels the others (the "15 cancelled"). A success that does arrive is for a commit about 9 hours old (38545816188, `60e4c44`, pushed 09:54, success at 18:49).
- Meanwhile production was updated by Vercel's own git builds on `[deploy]` commits, which do not wait for `ci`. That is a separate SEV2 (2026-10-14-coe-deploy-bypass-and-quota.md).

## Impact (learners affected, lessons, claims)
- No change today was judged by CI. The protected-paths gate in CI (`constitution` job) and `verify` gave no result in time for any decision.
- The sanctioned release path (`deploy.yml` on `workflow_run` success) never fired: 33 skipped by 15:25.
- Learners: no direct harm found. Indirect: the lessons released today (5 `[deploy]` commits) reached learners with no CI result, through the bypass path.
- Claims: none rest on CI directly. The QA claim "verify passed" could not be made for any commit today.

## Five whys (stop when the answers stop being about people)
1. **Why did no `ci` run conclude in time for a decision?** A run concludes only when both jobs finish. After 13:09 each new run's `verify` is cancelled within seconds (AMD-002 working), but its `constitution` job waits for a GitHub-hosted runner. At 19:02 that wait was about 9 hours: the oldest queued run is from 10:02, and runs from 09:49 to 10:04 got runners only at 18:14 to 18:38. The answer to the draft's question "no runner assigned, or GitHub held it?" is **no runner assigned**. The jobs show `queued` with no `runner_name` and empty steps.
2. **Why were runners unavailable for 9 hours?** Demand exceeded supply several times over. The account ran about 19 to 20 jobs at once all day (19 in progress at 19:02, consistent with GitHub's concurrent-job limit for the plan). Each `verify` holds one runner for 52 to 67 min, and pushes arrived every 1 to 2 minutes (650 `ci` runs created by 19:02) on two refs, with `pull_request` duplicates on top. Supply was about 20 runner-hours per hour. Before 13:09, demand was roughly one runner-hour per push, so a few tens of runner-hours per hour. The backlog grew all morning and is FIFO.
3. **Why did AMD-002 not drain it?** AMD-002 changes the workflow only for runs created after 13:09. A run uses the `ci.yml` of its own commit, so runs created before 13:09 carry the old file, with no concurrency group and nothing able to cancel them. At 19:02, 157 of them were still queued and 19 in progress, and 118 post-13:09 runs (mostly `constitution` jobs) waited behind them. They sit ahead of every newer `constitution` job in the queue, and each costs about an hour of runner time. AMD-002 also groups by ref, so the second ref (`ccr-rnd-ncm`) and the `pull_request` runs are separate groups. Draft questions answered: the queued jobs are old full `verify` runs plus new `constitution` jobs waiting behind them; the refs are two branches plus PR events; the limit is runner concurrency, not minutes.
4. **Why does one push cost an hour of a shared pool?** `verify` runs the full QA (945 lessons × 2 projects, about 50 min) on every push of every ref. There is no path filter, no sharding, no time limit and no split between per-push checks and a full pre-release run. QA cost grows linearly with the catalogue, and the workflow was written when the catalogue was small. Nobody owns a CI budget, so nobody was asked to re-plan it as lessons were added.
5. **Why did nothing stop it before ~300?** GitHub runner capacity is a shared resource with **no allocator and no meter**. `tools/snapshot.sh` and every agent push without knowing the queue depth. No check in `company status`, `tools/ops-health.mjs` or `tools/dispatch-check.mjs` reads GitHub Actions, so the first signal was a human-shaped one (AMD-002's 3 h 40 min observation at about 13:00). Dispatch kept adding pushers while the queue grew. The answers have stopped being about people: this is the missing mechanism.

**Root cause:** CI runs a fixed, catalogue-sized job (about 1 runner-hour) on every push into a capacity-capped runner pool, with no budget, no meter and no back-pressure on pushers. The containment (AMD-002) cannot reach the runs already queued under the old workflow, and it does not reduce the per-push cost.

## What allowed it
- **No allocator for runners.** Pushes are free to the pusher and cost the pool about an hour each. The ops review's candidate pattern names GitHub runners as one of the shared resources, and this incident confirms it with numbers.
- **No meter.** Queue depth and push-to-conclusion time are not on the operating picture, so a backlog of hundreds was invisible until someone happened to look.
- **The release path depends on CI liveness, and nothing checks for staleness.** `deploy.yml` waits for a success that arrives hours late, if at all. When it does arrive it is for a commit about 9 hours old, and the bypass path (Vercel git builds) shipped instead. A dead CI therefore looked like "deploys are skipped", not "the judge is down".
- **Snapshot cadence designed for one agent.** WIP snapshots (G4) made pushes routine. With about 10 agents, routine pushes became a load the shared pool could not absorb.
- **Containment treated as a fix.** AMD-002 was ratified as "the fix" at 13:09. Nobody planned a drain of the pre-13:09 backlog, and by 18:58 the queue was older, not shorter.

## Actions (each changes a mechanism; tracked on the board until done)
Board ids marked **NEW-n** are filed by the session that dispatched this COE (the author does not edit board.json). The list is in the author's report, and the id replaces NEW-n here once filed.

| Action | Mechanism changed | Owner | Board id |
|---|---|---|---|
| Containment (kept): a newer push cancels the older `verify` on the same ref | `.github/workflows/ci.yml` job-level concurrency (AMD-002, ratified 13:09). Shown working on post-13:09 runs | platform-engineer | AMD-002 |
| **Drain the backlog** once: cancel every `ci` run created before 13:09 that is still queued or in progress (they test superseded commits under the pre-AMD workflow), then re-run `ci` once on the default branch head | one-off `gh run cancel` sweep, recorded in the ops log with counts before and after. Without it W-481 fails on 10-16 by construction | platform-engineer | W-774 |
| **Cut the per-push cost (root-cause fix).** Per push: `check`, `typecheck`, `build`, contract/feed specs and QA only for lessons changed in the push. Full QA on the default branch head once per interval and on `[deploy]` candidates; QA sharded across jobs; `timeout-minutes` on `verify`; drop the `pull_request` run for same-repo branches | `.github/workflows/ci.yml` (protected: amendment AMD-007, prepared by evaluation-steward). Target: median per-push `verify` < 10 runner-min | platform-engineer (proposes); evaluation-steward (prepares amendment) | W-775 |
| **Meter CI.** Queued run count, oldest-queued age and median push-to-conclusion appear in `company status`. A red flag shows when queued > 20 or oldest > 30 min | `tools/ops-health.mjs` reads `gh api .../actions/runs?status=queued` | tools-lead | W-776 |
| **Back-pressure on pushers.** Snapshots and dispatched waves do not push while the CI meter is red. `snapshot.sh` commits locally and pushes at most once per N minutes | `tools/snapshot.sh` push gate + `tools/dispatch-check.mjs` rule reading the W-776 meter | tools-lead (with chief-of-staff, owner of snapshot.sh) | W-777 |
| Snapshots stop pushing protected paths and record `check` status (kept) | `tools/snapshot.sh` | chief-of-staff (owner of snapshot.sh), board item owner tools-lead | W-482 |
| Production deploys only via `deploy.yml` after green `ci`, so CI health becomes release-blocking and visible (kept) | Vercel git builds off or a Deployment Check on `ci`; decision record | platform-engineer + founder | W-480 |
| **No stale releases.** `deploy.yml` skips a `workflow_run` whose `head_sha` is no longer the default-branch head, and says so in the run summary | `.github/workflows/deploy.yml` `if:` condition | platform-engineer (release-manager reviews) | W-778 |
| Capacity (kept, now with numbers): self-hosted runner or second machine, against a hard cap. Input: about 20 concurrent hosted jobs, about 1 runner-hour per full QA. Decide after W-775, which may make extra capacity unnecessary | capacity decision record | principal-engineer; founder approves spend | W-531 |
| Falsifier (kept): on 2026-10-16, queue < 20 at the busiest hour and median push-to-conclusion < 30 min. Run after W-774, and judge AMD-002 + W-775 together | measurement in the constitutional review | platform-engineer | W-481 |
| Builds and waves cannot be dispatched while a SEV1/SEV2 has no final COE (kept) | `tools/dispatch-check.mjs` R2 (in place since `99573b8`; review W-715) | tools-lead (review) | W-715 |

## Claims and decisions to send back to review
- AMD-002's claimed benefit ("each ref has at most one `verify` in flight") **holds for runs created after 13:09** (verify cancelled in seconds, e.g. 38620008047). It does **not** fix the queue: the pre-13:09 runs (157 queued + 19 in progress at 19:02) are outside its reach, and the per-push cost is unchanged. Back to the constitutional review with this record. W-481 judges AMD-002 + W-774 + W-775, not AMD-002 alone.
- "CI passed" for any commit today: the author found no record claiming a green `ci` run today. The one "verify passed" line in progress.md refers to a local verify, not CI. 14 `ci` runs did succeed, all for commits pushed at 09:xx, concluding hours later. Treat them as evidence about those old commits only.
- The constitutional-review statement (J1) that runs from before 13:09 were still queued at 15:00 is confirmed and extended: at 19:02, runs from 10:02 were still queued.

## Pattern update
Pattern librarian, after this root cause. Evidence for the candidate "every shared resource needs an allocator before it needs a cleanup": GitHub runners had no allocator (pushes free to the pusher, about 1 runner-hour each to the pool). The cleanup (AMD-002) arrived first and could not reach the work already queued. A second candidate for the librarian to test: "containment changes the future, not the backlog; every containment needs a drain step".
