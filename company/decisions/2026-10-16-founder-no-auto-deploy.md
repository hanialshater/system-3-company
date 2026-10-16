# Founder decision: no automatic deploy after CI

owner: founder (recorded by chief-of-staff)
date: 2026-10-16
class: release / deploy configuration
route: release-manager (W-1153 closed by this change) → evaluation-steward (W-1052 guard covers the marker path) → chief-of-staff
recorded by: chief-of-staff
status: decided and applied

## What the founder said
Asked how to close the automatic preview deploy that starts after every green CI (found by the evaluation steward's AMD-001 audit, F2; run 38834441241 tried to deploy 29e8694 and failed only on missing credentials), the founder chose **"Remove the auto trigger (Recommended)"**: "Delete the 'after every green CI' trigger from deploy.yml. Deploys then happen only when started by hand after your approval".

## Decided and applied
- `.github/workflows/deploy.yml` loses its `workflow_run` trigger; only `workflow_dispatch` on the default branch remains. `RELEASE_SHA` is the dispatched commit.
- `company/ops/runbook-deploy.md`: the automatic preview row is removed.
- Unchanged: Vercel's Git integration still builds only commits whose message carries the deploy marker (vercel.json); W-1051/W-1052 still tighten that path.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Previews no longer appear automatically, so testing a change on Vercel needs a manual run each time. | release-manager (anticipated) | Accepted: every preview needs the founder's approval anyway (2026-10-14 rule). |
| The Vercel Git integration is a second deploy path not governed by this workflow. | evaluation-steward (AMD-001 audit F2, r7 COE) | Open: W-1051 (marker as subject's last token) and W-1052 (commit-msg guard). |
