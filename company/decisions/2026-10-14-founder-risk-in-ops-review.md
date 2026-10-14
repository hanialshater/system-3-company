# Founder decision: risk assessment lives with principal-engineer-ops, inside the Operational Health Review

owner: founder (recorded by chief-of-staff)
date: 2026-10-14
status: decided
class: org / operating rhythm · route: principal-engineer-ops (owner), portfolio-manager (pre-mortem in project proposals)

## What the founder said

> "Who reviews the post mortems? Do we have risk assessment mechanism and rituals?"
>
> "But we have PE responsibilities cover operational health and excellence"

The second message came after the chief of staff proposed a new risk register and ritual owned jointly by the CEO office and principal-engineer-ops.

## Decision

- **No new ritual and no new owner.** Risk assessment is part of principal-engineer-ops' existing operational health and excellence role.
- **Risk register:** company/ops/risks.json. One entry per risk: id, description, likelihood, impact, owner, mitigation with a board id, status, last reviewed. principal-engineer-ops owns it and seeds it from today's incidents and reviews.
- **Risk review:** re-scoring the register is a standing section of the existing Operational Health Review (ops-review). A new SEV1 or SEV2 adds an off-cycle trigger to ops-review, so no new ritual is needed.
- **Pre-mortem:** a required section of the project proposal template (company/rituals/templates/project-review.md, owner portfolio-manager). Its risks go into the same register.

## Objections

| Objection | By | Status |
|---|---|---|
| Strategic and organisational risks (concentration on one host, founder bandwidth, category bets) are not operational | chief-of-staff | Open. Track them in the same register, tagged `strategic`, with the CEO office or the PE named as the risk owner. principal-engineer-ops still runs the review. |

## Amendment 1 (founder, same day): operational excellence is every engineer's job

> "The thing is swes should have touch points with that process and get needed approval, the operational excellence is company wide responsibility on all engineers"

- Every engineering role is responsible for the operational health and risk of what it builds and runs: platform-engineer, backend-engineer, hq-engineer, design-engineer, tools-lead, release-manager, rnd-engineer, and demo-builder where it touches shared engines or the kit. principal-engineer-ops runs the system and approves; engineers carry the work.
- **Touch points, defined by principal-engineer-ops with principal-engineer:**
  - an operational readiness check for each change, scaled by tier;
  - approval before risky changes ship;
  - risk entries owned by each team for its services in company/ops/risks.json;
  - each team's report at the Operational Health Review, through its own engineer (the ops role already says this);
  - incident ownership.
- **Mechanisms:** the approval must be checked by a tool (for example a readiness record that dispatch-check or `check` looks for on tier-1 and tier-2 changes), not only stated in a document.
