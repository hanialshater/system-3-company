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
| **PE co-approval under token-budget.md §4, by principal-engineer-ops (2026-10-16 ~15:40Z): co-approved with conditions, and the objection stands.** The +1M is the founder's call toward the release milestone. A PE's part is whether it buys that. On the ledger it buys about half a day. 6.59M − 3.0M measured (14:23Z) = 3.6M. At 1.9M/day that lasts to about 10-18, five days before the checkpoint. At 15:42Z the gate reads 3.3M on the newer uncommitted import (rows to 15:27Z), which leaves 3.3M under 6.59M. **The money works only together with the throttle** (r6-portfolio §P2: about 0.35M/day to reach 10-23). Conditions: (1) **nothing is dispatched against the new 1M** (spend above 5.59M) until head-of-strategic-initiatives has filed the §4 "Forecast at 80%" with a throttle to the release-critical path (accounts, deploy guard, launch checks) and a projection that reaches 10-23 or names the earlier stop date. This record already holds the 1M until the founder has seen it, and this condition adds the forecast; (2) portfolio-manager records F-43 in projects.json (`topUps[1]`, tranche 1 to 6,590,000). At 15:40Z tranche 1 still read 5,590,000, so the gate does not see this top-up yet; (3) runs that are T2 build scope go to the founder as a T2 bridge question, not into tranche 1 (r6 founder item 3). Revoke if the next ledger import shows First Light past 5.59M with no forecast filed. Disclosure: principal-engineer-ops has spent 206k on this line. | principal-engineer-ops | Open: conditions 1 to 3 to their owners. This also answers the "No PE has co-approved" row above for both F-38 and F-43. |
