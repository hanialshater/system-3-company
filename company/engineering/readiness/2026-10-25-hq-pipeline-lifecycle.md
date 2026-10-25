# Operational readiness: hq-pipeline-lifecycle

change: a state machine per content type (lane S single-card, lane M multi-card sequence) as data in company/ops/projects.json (each lane's `lifecycle` block), and tools/hq/lifecycle.mjs, a read-only function that places every lesson in its type's life cycle from the records. tools/hq/hq-dashboard.mjs prints it as the dashboard contract's `pipeline`; the city page template Pipeline is copied to tools/hq/pipeline.js (pages.json entry).
change-tier: 1
paths: tools/hq/lifecycle.mjs, tools/hq/lifecycle.test.mjs, tools/hq/hq-dashboard.mjs, tools/hq/dashboard.test.mjs, tools/hq/pipeline.js, tools/hq/pages.json, tools/hq/README.md, company/ops/projects.json (tier 0)
author: tools-lead
self-check: tools-lead
board: founder request 2026-10-25 ("a state machine per lesson, and a page to show where the lesson is in the life cycle"); in-app view to hq-engineer (board, this run)
risks: none

1. **What can fail.** A wrong state, never a wrong gate: nothing here publishes, deploys or writes a record. The rules call `readiness()` from tools/lib/readiness.mjs with the options tools/company.mjs passes (READINESS_SINCE and QA_INDEPENDENT_SINCE read from its text), so a gate change there moves the pipeline with it. Known soft spots: (a) "since" comes from git (`-G` on the top-level `"version"` and `"status": "published"` lines of meta.json); an uncommitted publish dates as today; (b) "live" means a production deploy in company/ops/releases.json whose commit contains the publish (or version) commit; (c) board items are matched by the slug as a word in an open item's title or links, so a batch item naming the slug counts; (d) a published lesson whose current version has no check record of its own is shown published or live with `gaps`, not in checks (AMD-013 grandfathering; `company check` warns about the same lessons).
2. **How we would know.** `node --test tools/hq/lifecycle.test.mjs tools/hq/dashboard.test.mjs`: fixtures for every state (the cube as of f431cf31e in checks waiting on its v2 learner walk and W-2047; euclid in revise; live, published, build, launch, hold, tier R, a state dropped from the data) and today's real lessons (every lesson has one state of its type and a since date; the cube and euclid follow their records; published lane S lessons are published or live). `node tools/hq/lifecycle.mjs . --summary` prints the counts; `--slug=<slug>` one item.
3. **How to roll back.** Revert the commit. The dashboard then has no `pipeline` and the city page shows its empty state. No data.
4. **Capacity.** About 4 s per run on this checkout (1,646 lessons, 3 git log passes, a few merge-base calls per publish commit, cached). The dashboard computes it once per process.
5. **Security.** None: no route, no app code, no learner data. Read-only.
6. **Data.** None written. The dashboard JSON grows by about 700 KB (one item per lesson).
7. **Risks.** None added or closed.
