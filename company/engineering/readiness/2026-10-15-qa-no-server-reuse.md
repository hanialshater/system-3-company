# Operational readiness: QA never reuses a server it did not start (W-851)

```
change: playwright.config.ts webServer.reuseExistingServer is false unless QA_REUSE_SERVER=1 (was: true outside CI)
change-tier: 2
paths: playwright.config.ts
author: tools-lead
board: W-851
risks: proposes a risk entry closes when merged: QA run against another builder's server (see 7)
links: branch tools-batch (separate commit); companion tier-1 record 2026-10-15-tools-batch-usage-ports-rooms.md
```

Status: **awaiting principal-engineer-ops**. Do not merge before `approved-by` is added. The author does not approve it.

1. **What can fail.** Locally, `npm run qa` with the default QA_PORT 3100 (or any taken QA_PORT) now fails with Playwright's "port is already used" instead of testing whatever server holds that port. Before this, two builders on the same QA_PORT, or one builder whose port another server held, ran QA against the neighbour's build: a pass or fail for someone else's lessons, and that run's /api/events beacons on the neighbour's server. Who sees it: agents (a louder failure), not learners. CI is unchanged (CI was already `reuseExistingServer: false`).
2. **How we would know.** Playwright exits non-zero and names the port. The harness stamp (W-783) becomes clean again once this commit is HEAD.
3. **How to roll back.** `git revert <sha>`, or `QA_REUSE_SERVER=1` for one run. No data.
4. **Capacity.** None: one `next start` per QA run, as before. Runs against a server you started yourself use `QA_BASE_URL` (already documented in runbook-deploy.md and used in build records).
5. **Security.** None: test config only.
6. **Data.** None.
7. **Risks.** Closes, when merged, the failure where QA records were written from another builder's build (W-851; the 2026-10-14 cross-talk on :3621/:3623). Evidence: Playwright refuses a taken port when reuse is off.
