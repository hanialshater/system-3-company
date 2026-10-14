# Operational Health Review: <date>

owner: principal-engineer-ops (chair) · attends: the principal engineer, every point of contact in `company/engineering/operations/tiers.json` (pocs), the CEO office chief of staff, the portfolio manager · reads: the founder

Trigger: `company/rituals/triggers.json` (ops-review): every 40 merges, at least weekly, and off-cycle on any new SEV1 or SEV2. It is a look at the worst numbers, not a status meeting.

## 0. Scorecard
Paste `node tools/ops-health.mjs --md`. Add GitHub open issues and PRs (fetched with the GitHub tools) and the CI status of the last push.

## 1. Red lines
Every T1/D1/S1/U1 entry that isn't `ok`, every open SEV1/SEV2, and every P1 older than one review. For each: the owner, what changed since last time, and the next step.

## 2. Team reports (one paragraph each, written by the point of contact before the review)
For each team in `pocs`: health (ok / degraded / at risk), the worst thing in its area, incidents and COE actions, open deficits by tier, the risks it owns in `company/ops/risks.json` (re-score proposed, with evidence), readiness records it filed since last time (`company/engineering/readiness/`), and what it needs from another team. Each team's own engineer writes it.

## 3. Incidents and COEs since last review
| Incident | SEV | COE | Actions open | Closed? |
|---|---|---|---|---|

## 4. Agents and spend
Runs, stop rate, tokens per run, burn rate (tokens per hour), roles never dispatched, rework. Is burn rising faster than output?

## 5. Tier registry changes
New services, data stores or deficits, reclassifications, and anything `missing` that is now needed.

## 6. Decisions and actions
Each action gets an owner and a board item. Objections go with the decisions.

## 7. Risk review (standing; company/ops/risks.json)
Founder decision 2026-10-14-founder-risk-in-ops-review.md: this section is the company's risk review. There is no separate ritual. An off-cycle review (a new SEV1 or SEV2) runs this section too.
1. **Report.** Paste `node tools/risks.mjs report --top=10`. If it exits 1, fix the malformed entries first.
2. **Re-score.** For each risk that is not closed: likelihood and impact now, with the evidence that moved them (the scorecard, incidents, readiness records, team reports). Set `lastReviewed`. A score goes down only for a mechanism that works (`reality: in-place`), never for a board item that exists.
   | Risk | Was (L x I) | Now | Evidence | Reality | Status |
   |---|---|---|---|---|---|
3. **Mitigations that slipped.** Every risk whose mitigation board item has not moved since the last review, is blocked, or was marked done while the risk is unchanged. Name the owner and the next step. A mitigation still on paper after two reviews, on a risk scoring 15 or more, goes to the founder in the next digest.
4. **New risks.** From this review's incidents and COEs, team reports, readiness records approved since last time (their "Risks" lines), and project pre-mortems. Each gets an id, a score, an owner and a board item.
5. **Closed or accepted.** A risk closes only when it is gone. Accepting a risk needs the owner plus the founder or a PE, and the reason, on the entry.
6. **Top five for the founder.** The five highest scores, one line each, in the WBR's operational health line.

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
