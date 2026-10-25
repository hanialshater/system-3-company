# Operational readiness: hq-dashboard-principles-features-releases

change: the city dashboard adapter gains `principles` (Meta's audit), `features` (new company/features.json) and `releases` (company/ops/releases.json); the city pages Principles, Features and Release log are copied into tools/hq/, and the city entry carries `"hq": "."`
change-tier: 1
paths: tools/hq/hq-dashboard.mjs, tools/hq/dashboard.test.mjs, tools/hq/principles.js, tools/hq/features.js, tools/hq/releases.js, tools/hq/pages.json, tools/hq/hq-city.json, tools/hq/README.md, company/features.json
author: tools-lead
self-check: tools-lead
board: none (founder request 2026-10-25, through the Meta session)
risks: none

1. **What can fail.** The city build fails if hq-dashboard.mjs throws; it does not when Meta is absent (`principles` is left out) or when a record is missing (empty `features`/`releases`). A features line can go stale as the product moves: each feature's owner corrects its own line.
2. **How we would know.** `node --test tools/hq/dashboard.test.mjs` (features have one owner, a city status and links that exist; releases match releases.json count and order and keep unrecorded approvals null; the three pages render this dashboard). City check run 2026-10-25 from tools/hq: `META=… node $META/hq/build.mjs --city=hq-city.json --snapshot=system-3-company --out=<scratch>`: dashboard.json had principles 9 followed, 4 gaps of 13; 16 features; 23 releases (r1-r21 plus the two unapproved 2026-10-18 deploys), newest r21; pages.json listed principles, features, releases.
3. **How to roll back.** Revert this commit. Minutes; no data; no deploy.
4. **Capacity.** None. No build of the app was needed.
5. **Security.** None: read-only tools, no route. The pages are rendered by the city HQ, not this app.
6. **Data.** None written. Releases are read from release-manager's file, never written; approvals come only from its `approved_by`, null where it says not recorded or unapproved.
7. **Risks.** None added or closed.
