# Operational readiness: tools batch (usage dedupe, explicit servers, rooms, inbox budget warning)

```
change: count one usage record per agent run; browser tools use an explicit URL or their own checked server; first-light room documented; head-of-strategic-initiatives -> ceo-office; ledger check warns on unbudgeted inbox initiatives; stopped-event backfill filter
change-tier: 1
paths: tools/lib/usage.mjs, tools/lib/server.mjs, tools/lib/ledger.mjs, tools/metrics.mjs, tools/ops-health.mjs, tools/events.mjs, tools/walkthrough.mjs, tools/a11y-scan.mjs, tools/serve.sh, tests/hq/tooling.test.mjs, company/ops/events.md
author: tools-lead
self-check: tools-lead
board: W-941, W-851, W-914, W-917, W-920
risks: none added; proposes nothing closed (see 7)
links: branch tools-batch; playwright.config.ts is split out as tier 2: 2026-10-15-qa-no-server-reuse.md
```

1. **What can fail.** (a) Dedupe merges two different runs that share a label within 12 h, under-counting one; the records show no such case (every repeated label has one dispatch, repeats at most 30 min apart; a test fails if a label is kept twice). (b) The walkthrough now refuses a taken `--port` or a dead `--url` where it used to carry on; an agent sees exit 2 with the reason. Worst: a builder's walkthrough script that relied on the random port silently reaching another server now fails; that failure is the point. (c) The inbox warning is a regex heuristic; false positives are warnings only, and `budget: "not an initiative: <why>"` silences one.
2. **How we would know.** `npm run test:hq` (tests/hq/tooling.test.mjs, 9 tests), `npm run metrics` (Agents line), `node tools/ledger.mjs report` (`duplicateLines` in `--json`), `node tools/ledger.mjs check` warnings. A walkthrough or serve.sh refusal prints the port and exits non-zero.
3. **How to roll back.** `git revert <sha>` of the commit, under a minute, no data loss: no event or ledger line is written or rewritten by this change.
4. **Capacity.** None added. The walkthrough starts at most one `next start`, as before; the port is OS-assigned instead of guessed in 3300-3799 (the band builders also use).
5. **Security.** No route, parameter or production surface. Local tools only.
6. **Data.** Reads events.jsonl, ledger.jsonl and founder-inbox.json; writes nothing new. `backfill --types/--since/--dry` appends only events the transcript holds (ids dedupe as before).
7. **Risks.** None added. The usage over-count (WBR 2026-10-15 A1) is fixed in the readers, not in the log, which stays append-only. Port crosstalk (W-851) is closed for walkthrough, a11y-scan and serve.sh; QA's reuse of a neighbour's server closes only when the tier-2 record is approved and merged.
