# Founder decision: First Light tranche 1 extended by 2M (3.59M → 5.59M)

owner: portfolio-manager (the First Light budget line); head-of-strategic-initiatives (the initiative)
date: 2026-10-16
status: decided
class: budget
route: chief-of-staff (ledger import, W-1231) → founder → portfolio-manager (register) → head-of-strategic-initiatives
recorded by: chief-of-staff

## What the founder said

> "i approve extend by 2m"  (source: conversation, 2026-10-16 ~15:05Z; on the follow-up question "Which budget does the +2M extension go to?" the founder chose "First Light tranche 1")

## What the founder decided, and what is left to the owners

- **Decided by the founder:** First Light tranche 1 is topped up by 2,000,000 tokens: 3.59M → 5.59M, to the same 2026-10-23 checkpoint and for the same purpose (design, EDDs, spikes, reviews, amendment, war room, re-estimate; projects.json `first-light.tranches[0].buys`).
- **Not decided here:** tranche 2 (8.17M approved; re-based about 19.2M at full scope; the stop rule 10.2M trips at the 10-23 checkpoint on those figures — token-budget.md §10). The History (6.3M of 2.5M) and behavioral-econ (2.4M of 1.8M) overruns are not covered by this top-up; portfolio-manager is pricing them (W-1442).
- **Left to the owners:** portfolio-manager records the top-up in company/ops/projects.json (`first-light.budget.topUps`, tranche 1 tokens) and the T1 projection to 10-23; head-of-strategic-initiatives reflects it in status.json.

## Why it came up

The ledger import at 14:55Z (W-1231, the first since 2026-10-14) showed tranche 1 at 3.0M of 3.59M (84%) with seven days to the checkpoint. The stale ledger is the chief of staff's error: the gate could not see spend, so no earlier warning was possible.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| A top-up recorded from a five-word chat message could be misread as covering tranche 2 or the overrun lines. | chief-of-staff | Answered: the founder was asked which line and chose tranche 1; this record states what it does not cover. |
| Tranche 1 reached 84% unseen because the ledger was not imported for two days. | chief-of-staff | Open: import each round (W-1282, chief of staff's checklist); the measured figure excludes coordinator tokens. |
| Raising tranche 1 moves the program total (3.59M + 19.2M re-based) further from the 11.76M approved. | chief-of-staff | Open: for the 10-23 checkpoint (portfolio-manager, token-budget.md §10). |
