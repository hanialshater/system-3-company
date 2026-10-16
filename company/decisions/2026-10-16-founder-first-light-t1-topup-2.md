# Founder decision: First Light tranche 1 topped up by another 1M (5.59M → 6.59M); History and behavioral-econ get no top-up (F-43)

owner: portfolio-manager (the register) · head-of-strategic-initiatives (the initiative)
date: 2026-10-16
status: decided (founder); the co-approval of one PE (token-budget.md §4) is still owed, as it is for F-38
class: budget
route: portfolio-manager r6 founder asks (company/ops/dispatch-requests/2026-10-16-r6-portfolio.md, 3a20072) → chief-of-staff → founder → portfolio-manager (projects.json) → a PE co-approves or objects
recorded by: chief-of-staff

## What the founder said
> "Look top up 1M, I want to reach milestone deploy so I can start personalization or ads" (2026-10-16, answering the three asks: History, behavioral-econ, First Light tranche 1)

## Decided
- **First Light tranche 1:** +1,000,000 tokens (5.59M → 6.59M), toward the release milestone (the deploy that lets personalization or ads start). This is read as the one top-up the founder named; the founder's purpose is the release milestone, which is First Light's.
- **History and behavioral-econ:** no top-up. Both stay at STOP after tonight's grace (23:59Z); work in flight finishes from what has already been spent, and no new builds are dispatched on those lines. History's `countFrom` question (ask 1(i)) is not answered, so the gate keeps counting all-time.
- **Not decided here:** a production deploy. Every deploy still needs the founder's approval of that deploy.

## Reading flagged for the founder
If "top up 1M" meant History or behavioral-econ instead, the founder says so and this record is corrected; nothing is dispatched on the new 1M until the founder has seen this record.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| At today's ~1.9M/day burn, tranche 1 runs out about a day later than before, not at 10-23. | portfolio-manager (r6, 3a20072) | Open: head-of-strategic-initiatives throttles First Light to the release-critical path (accounts, deploy guard, launch checks) and reports the projection. |
| No PE has co-approved F-38 or this top-up (token-budget.md §4). | portfolio-manager | Open: principal-engineer-ops is asked (board). |
| Pausing History and behavioral strands work in flight. | cm-history, cm-behavioral (r6) | Open: the CMs list what is lost by pausing; in-flight runs are allowed to finish. |
