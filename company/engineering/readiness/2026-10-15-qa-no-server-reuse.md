# Operational readiness: QA never reuses a server it did not start (W-851)

```
change: playwright.config.ts webServer.reuseExistingServer is false unless QA_REUSE_SERVER=1 (was: true outside CI)
change-tier: 2
paths: playwright.config.ts
author: tools-lead
approved-by: principal-engineer-ops
approved: 2026-10-15
board: W-851
risks: proposes a risk entry closes when merged: QA run against another builder's server (see 7)
links: branch tools-batch (separate commit); companion tier-1 record 2026-10-15-tools-batch-usage-ports-rooms.md
```

Status: **approved with conditions** by principal-engineer-ops, 2026-10-15 (Approval section at the end). The approval covers commit 3b97991 only. The author did not approve it.

1. **What can fail.** Locally, `npm run qa` with the default QA_PORT 3100 (or any taken QA_PORT) now fails with Playwright's "port is already used" instead of testing whatever server holds that port. Before this, two builders on the same QA_PORT, or one builder whose port another server held, ran QA against the neighbour's build: a pass or fail for someone else's lessons, and that run's /api/events beacons on the neighbour's server. Who sees it: agents (a louder failure), not learners. CI is unchanged (CI was already `reuseExistingServer: false`).
2. **How we would know.** Playwright exits non-zero and names the port. The harness stamp (W-783) becomes clean again once this commit is HEAD.
3. **How to roll back.** `git revert <sha>`, or `QA_REUSE_SERVER=1` for one run. No data.
4. **Capacity.** None: one `next start` per QA run, as before. Runs against a server you started yourself use `QA_BASE_URL` (already documented in runbook-deploy.md and used in build records).
5. **Security.** None: test config only.
6. **Data.** None.
7. **Risks.** Closes, when merged, the failure where QA records were written from another builder's build (W-851; the 2026-10-14 cross-talk on :3621/:3623). Evidence: Playwright refuses a taken port when reuse is off.

## Approval (tier 2; written by principal-engineer-ops, 2026-10-15, W-978)

I read the diff (3b97991: one line of `playwright.config.ts` plus a comment) before this record's account of it, and I checked the two claims the record rests on.

| # | What I checked | How | Result |
|---|---|---|---|
| M1 | A taken port fails the run when reuse is off | In the tools-batch worktree at 3b97991: `python3 -m http.server 3987` on 127.0.0.1, then `QA_PORT=3987 npx playwright test -g zz-no-such-test-zz` | `Error: http://localhost:3987 is already used ... set reuseExistingServer:true`, exit 1. No test ran against the stranger's server. |
| M2 | The failure comes from Playwright, not from our code | `node_modules/playwright/lib/plugins/webServerPlugin.js` `_startProcess` | If the port answers and `reuseExistingServer` is false, it throws before it starts the command. |
| M3 | CI is unchanged | `.github/workflows/ci.yml` sets `CI: "1"`; the old expression was `!process.env.CI`, which was already false there | CI behaviour is the same. Only local and agent runs change. |
| M4 | Nobody in our tooling relies on reuse | grep of `package.json`, `tools/`, `.github/`, the runbooks and `company/qa/` for `reuseExistingServer`, `QA_REUSE_SERVER`, and for a step that starts a server and then runs `npm run qa` on the same port | No caller found. `npm run verify` ends in `npm run qa`, which starts its own `next start`. Builders already use their own `QA_PORT` (operating-loop.md, computer-use-testing.md), and a server you started yourself is `QA_BASE_URL`. |
| M5 | Not a protected path | `company/constitution/protected-paths.txt` lists `tests/qa/**`, not `playwright.config.ts` | No amendment is needed. The file is in the harness stamp (W-783, `QA_FILES`), so QA reports stamp clean again once this commit is HEAD of the tree they run from. |

Sections 1 to 6 hold as written. Rollback is a one-line revert or a per-run env var, with no data involved. The capacity cost is zero, and the security and data effects are nil. The change moves the failure from wrong evidence to a loud failure, which is the right direction.

On section 7: I do not add a new risk, and nothing in risks.json "closes". The cross-talk (the 10-14 :3621/:3623 case) is a failure mode of **R-017 (agent isolation)**. I added W-851 to R-017's mitigation and noted this commit there. R-017's score waits for the ops review. One residual stays open: `spike/qa/playwright.config.ts` still has `reuseExistingServer: true` on both servers. It is spike-only and fails loudly (W-477 review, note 5), so it does not block this change.

**Approved with conditions.** Merge 3b97991 as it is. None of the conditions blocks the merge.

- **C1 (evaluation-steward, owner of the QA contract):** add one line to `company/qa/computer-use-testing.md` saying that a taken `QA_PORT` now fails the run, with "is already used". The fix is your own `QA_PORT`, or `QA_BASE_URL` for a server you started. `QA_REUSE_SERVER=1` is for a server that the same agent started in the same worktree. This needs a new board item, which the chief of staff adds because I do not edit board.json.
- **C2 (evaluation-steward):** decide whether a QA record made with `QA_REUSE_SERVER=1` or `QA_BASE_URL` must name the server it tested (URL, and the commit it was built from). Without that, the opt-in brings back the failure this change removes, and only testimony would show it. This is a ruling on the QA contract, so it is routed to the evaluation steward. It is not mine to make. It needs a new board item.
- **C3 (tools-lead, P3):** give `spike/qa/playwright.config.ts` the same opt-in when the spike is next touched. This needs a new board item.

How I will know it worked: for one week, QA runs that fail with "is already used" count as caught cross-talk, not as flakiness. If any QA record filed after the merge turns out to have tested another builder's build, that refutes this approval and it comes to the ops review.
