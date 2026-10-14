# 2026-10-14: CI backlog drain (W-774): BLOCKED, nothing cancelled

owner: platform-engineer · source: COE company/rituals/records/2026-10-14-coe-ci-queue.md (action W-774)
status: **blocked**. The title keeps the name W-774 asked for, but the backlog is **not** cleared.

## Before (19:06 UTC, `gh api repos/hanialshater/system-3-company/actions/runs?status=...`)
- Queued: 278 repository-wide (277 `ci`, 1 `Deploy to Vercel`). `ci` by ref: 223 `ccr-4c6c7654-ew9ko1`, 53 `ccr-rnd-ncm`, 1 `fold-at-reveal`.
- `ci` queued and created before 13:09 UTC: 157.
- In progress: 18 (all `ci`, created 09:49 to 10:04).
- Pending: 2 (`ci` 38620778401 for the head commit `2060902`; `Deploy to Vercel` 38620714731).
- Oldest queued: run 38546697004, created 10:02:02 (`ccr-rnd-ncm`, pull_request). About 9 h 04 min old.

## What was attempted
- Cancel set: all 277 queued `ci` runs. Each one was either created before 13:09 or is for a commit other than the head of `ccr-4c6c7654-ew9ko1` (`2060902`). None of the queued runs was for the head commit, which has its own run (38620778401). So no re-run was needed, and none was triggered.
- Left alone: the head run, the 18 in-progress runs (the task said to cancel only queued runs), and every `Deploy to Vercel` run. No deploy was triggered.
- Result: `POST /repos/hanialshater/system-3-company/actions/runs/{id}/cancel` returned **HTTP 403 "Resource not accessible by integration"** for all 277 runs. `gh run cancel` returns the same. The 403 comes from GitHub, not the egress proxy: the session's token has no `actions: write`. Nothing was cancelled, and I did not try any workaround.

## After (19:09 UTC)
- Queued: 280 (pushes are still arriving). In progress: 18. Pending: 2. Oldest queued: unchanged, 10:02:02 (about 9 h 07 min).

## To unblock
Someone with `actions: write` on the repo has to run the sweep: the founder, or a session given a token with that scope. The command, with the filter used above:

```sh
H=$(git rev-parse origin/ccr-4c6c7654-ew9ko1)
for p in 1 2 3; do gh api "repos/hanialshater/system-3-company/actions/runs?status=queued&per_page=100&page=$p" \
  --jq ".workflow_runs[] | select(.name==\"ci\" and .head_sha!=\"$H\") | .id"; done | sort -u |
  xargs -I{} gh run cancel {} -R hanialshater/system-3-company
```

(Page by hand. `--paginate` fails through the proxy because the Link header uses `repositories/{id}` paths.)

The COE action also says to cancel the pre-13:09 **in-progress** runs. This task's brief excluded them, so that decision is still open for whoever runs the sweep. Each of those runs holds a runner for about an hour.

W-481 (AMD-002 prediction check, 10-16) cannot measure anything until this sweep runs.

## 2026-10-14, about 20:30 UTC (chief of staff, after the founder said "W-781 clear it yourself")

I tried one cancel through each available route. Both returned 403 "Resource not accessible by integration":
- `gh api -X POST …/actions/runs/38623374362/cancel`
- the GitHub MCP tool's `cancel_workflow_run`

The session's GitHub App has no `actions: write`. The founder approving the sweep doesn't change GitHub's permission check. A cancel workflow running with GITHUB_TOKEN was rejected: it would queue behind the same backlog.

The founder now has two options: run the sweep in the founder's reply with their own `gh`, or grant the Claude GitHub App "Actions: Read and write" so the chief of staff can run it.
