# Operational readiness records

owner: principal-engineer-ops · template: [ops-readiness.md](../../rituals/templates/ops-readiness.md) · mechanism: [EDD-007](../edd/EDD-007-ops-readiness-gate.md) (proposed)

One file per tier-1 or tier-2 change: `<YYYY-MM-DD>-<slug>.md`, written by the engineer who makes the change and committed before it ships. Tier-0 changes get no record.

- Tier 1: a self-check (`self-check: <role>`).
- Tier 2, and anything that touches deploy, the event API, auth or learner data: `approved-by: principal-engineer-ops`, added by the approver. A change in the ops area is approved by `principal-engineer`. Never self-approved.

Until `tools/readiness.mjs` exists (EDD-007), the release manager checks for the record by hand before each production deploy. That makes the check testimony until the tool lands.
