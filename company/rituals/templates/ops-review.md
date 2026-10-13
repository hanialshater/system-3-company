# Operational Health Review: <date>

owner: principal-engineer-ops (chair) · attends: the principal engineer, every point of contact in `company/engineering/operations/tiers.json` (pocs), the CEO office chief of staff, the portfolio manager · reads: the founder

Trigger: `company/rituals/triggers.json` (ops-review). It is a look at the worst numbers, not a status meeting.

## 0. Scorecard
Paste `node tools/ops-health.mjs --md`. Add GitHub open issues and PRs (fetched with the GitHub tools) and the CI status of the last push.

## 1. Red lines
Every T1/D1/S1/U1 entry that isn't `ok`, every open SEV1/SEV2, and every P1 older than one review. For each: the owner, what changed since last time, and the next step.

## 2. Team reports (one paragraph each, written by the point of contact before the review)
For each team in `pocs`: health (ok / degraded / at risk), the worst thing in its area, incidents and COE actions, open deficits by tier, and what it needs from another team.

## 3. Incidents and COEs since last review
| Incident | SEV | COE | Actions open | Closed? |
|---|---|---|---|---|

## 4. Agents and spend
Runs, stop rate, tokens per run, burn rate (tokens per hour), roles never dispatched, rework. Is burn rising faster than output?

## 5. Tier registry changes
New services, data stores or deficits, reclassifications, and anything `missing` that is now needed.

## 6. Decisions and actions
Each action gets an owner and a board item. Objections go with the decisions.
