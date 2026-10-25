# Operational readiness: reconcile-exp009

change: new read-only tool tools/reconcile.mjs (EXP-009 reconciliation of events/ledger against an independent list) with fixture tests
change-tier: 1
paths: tools/reconcile.mjs, tests/reconcile/**, company/experiments/EXP-009/**
author: tools-lead
self-check: tools-lead
board: W-2026
risks: none
links: company/experiments/EXP-009-meta-measurement-integrity.md, company/experiments/EXP-009/build-notes.md

1. **What can fail.** A wrong extraction or matching rule produces a wrong coverage number, and because it is code, it is consistently wrong (the founder record names this risk). Worst case: EXP-009's phase-1 decision rests on a rule error. Only agents and the founder see it; nothing reaches learners.
2. **How we would know.** Fixture tests (`node --test tests/reconcile/*.test.mjs`) pin each rule. analytics-steward accepts the output independently (W-2027) and samples 10 gaps by hand. The output names every parameter and the git HEAD it read, so a rerun can be compared.
3. **How to roll back.** `git revert <sha>`. The tool writes nothing unless its stdout is redirected; there is no state to undo.
4. **Capacity.** About 3 s and a few hundred MB of git log output in memory for a 5-day window. No server, no build.
5. **Security.** None: no network, no new routes, no secrets. It runs `git log` and reads repository files.
6. **Data.** Reads company/ops/events.jsonl and ledger.jsonl (matching only) and repository records. Writes only to stdout. No learner data.
7. **Risks.** None added or closed. It is the meter for the usage/founder/publish logging gaps (W-1689, W-1694); the owners of those risks re-score them from its output, not this record.

Note on inputs: this checkout was a shallow clone (history from 2026-10-16T15:53Z, 26 grafted roots). The 2026-10-20 run was made after `git fetch --unshallow origin` (a read-only fetch, no push), so commits and meta.json history cover the whole window. The output records `gitShallow` and `gitHorizon`; a rerun in a shallow checkout will show fewer commit and publish items.
