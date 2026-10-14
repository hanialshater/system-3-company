```yaml
id: containment-needs-a-drain
confidence: ""     # new 2026-10-14, unstarred. One strong case (CI), one weaker (deploy filter), the author of the candidate is the CI COE.
context: An incident where the fix changes how new work behaves while a backlog or a standing state from the old behaviour already exists.
problem: The containment is ratified as 'the fix', the incident is reported contained, and the old backlog keeps the damage going. AMD-002 applied to runs created after 13:09; 157 older runs were still queued six hours later and 118 newer ones waited behind them.
therefore:
  - When a containment is written, write the drain step beside it: who removes the backlog, how, and how the count before and after is recorded.
  - State in the record whether the change reaches work already created, and what version of the file or setting that work runs under.
  - Do not close or downgrade the incident until the backlog metric is down, not when the containment merges.
  - Keep containment and root-cause fix on separate lines in the actions table (the deploy and host COEs do this).
would_be_wrong_if: A containment that applies only to new work is followed by a backlog that clears by itself in the same time, in cases where no drain step was done.
documented_cases:
  - "CI: AMD-002 (13:09) did not touch pre-13:09 runs; at 19:02, 157 queued and 19 in progress under the old file; one-off cancel sweep W-774 (company/rituals/records/2026-10-14-coe-ci-queue.md, why 3, actions)."
  - "Deploy: the [deploy] filter and approval rule narrowed the bypass but left the second entry point and the quota-blocked day in place until W-480 (company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md, Actions preamble). Weaker: nothing queued, so no drain is needed, only closure."
  - "Host: hand rm -rf of 11 GB reclaimed space but left worktrees and build policy; free disk was under the 10 GB guard again by 19:01 (company/rituals/records/2026-10-14-coe-host-exhaustion.md, 18:58 and 19:01 rows). A recurrence of the drain, not of a queue."
known_failure:
  - "Not yet tested: W-774 has not run; no drain has yet been shown to clear the backlog."
  - "Only the CI case has a literal backlog. The other two are analogies; treat them as pointers, not support."
part_of: operating-loop
```
