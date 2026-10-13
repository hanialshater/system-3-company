# Decision: the principal engineer moves to the CEO office; a principal engineer for operations owns operational health

owner: principal-engineer · date: 2026-10-13 · status: accepted (founder request)

## Context
The founder asked to move the principal engineer (Kenji) to the CEO office, and to add a principal engineer reporting to him for operational health. That covers service tier classification, incident response, post-mortems and operational reviews, with a point of contact in every tech team. It also covers the same tiers for data, security and UX deficits, plus agent productivity, token burn, open issues, open PRs and other health metrics. A not-very-frequent ritual reviews company health, and every tech team reports through its existing engineers, with no new agents.

Before this, the company had a single COE and no tiers, incident severities or ops review. Nothing measured token burn against output. The CEO office role evaluation found a broken accessibility launch condition that nobody tracked.

## Decision
- `principal-engineer` moves to team leadership (CEO office) and still reports to the founder. Architecture, EDDs, ADRs and engineering reviews stay with him.
- New role `principal-engineer-ops` (Rhea) reports to the principal engineer, in the CEO office. Handbook: `company/engineering/operations/` (README, `tiers.json`, `incident-response.md`).
- Tiers: services T1–T3, data D1–D3, security S1–S3, UX deficits U1–U3, each with an owner and a status. These are separate from the change tiers 0–2, which set how much review a change needs.
- Ritual `ops-review` (template, `/ops-review`, trigger): every 40 merged batches, every 7 days, or after any incident. The 11 points of contact are existing roles, listed in `tiers.json`.
- `tools/ops-health.mjs` is the scorecard. GitHub issues, PRs and CI are added by the agent with the GitHub tools.

## Objections, and answers
- *The CEO office now holds four roles. Is it becoming a second leadership team?* Answer: the CEO office watches health and does not run production. Rhea may hold a deploy while a SEV1 is open, and may not dispatch work.
- *Is a weekly review too slow for agents that work in minutes?* Answer: incidents trigger it immediately. The review exists to see slow trends such as burn, deficits and aged P1s. Fast problems go through incident response.
- *Leonie's warning about adding roles to fix process.* Answer: the process is written first. Sunset: if two ops reviews pass with no red line acted on, fold the role back into the principal engineer.

## Would be wrong if
After two ops reviews, tier-1 red lines are no fewer and COE actions are not closing.
