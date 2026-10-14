```yaml
id: gate-expensive-actions
confidence: ""     # new 2026-10-14. One quota incident, one rule, and the constitutional review's evidence against the rule's wider use.
context: An action with a hard shared cost (Vercel's 100 deploys a day) that any agent can trigger.
problem: Work-in-progress pushes used the whole day's deploys and real releases were rate-limited.
therefore:
  - Filter the trigger (vercel.json builds only [deploy] commits) so ordinary pushes cost nothing.
  - Require the founder's explicit approval for each deploy (decisions/2026-10-14-deploy-needs-founder-approval.md); the release manager batches waves so one approval ships many lessons.
  - Treat this as a COST control only. Do not let it stand in for a quality gate.
would_be_wrong_if: With the filter and approval in place deploy count still exhausts the quota, or approvals are given without the founder having seen what ships.
documented_cases:
  - "2026-10-14 quota exhaustion by WIP pushes (the decision's Why); 5 [deploy] commits after the rule, each recorded as founder-approved (constitutional review J3)."
known_failure:
  - "Gained authority over another situation: it became the only control between unpublished lessons and learners. Four [deploy] commits (6b45ea0, 91274b8, f4537d7, 5e8608d) shipped with no CI result; production showed lessons that had not passed publish gates (constitutional review G1, G2)."
  - "The mechanical guard is a string filter in unprotected vercel.json; any agent can type [deploy], and a [deploy] commit edited it (5e8608d). Incident ev-b27f3b93ae."
  - "App deploys are held under the S1 rule until W-477 is fixed (W-534): approval does not make a deploy safe."
part_of: decision-records
```
