# Proposal: let lane managers dispatch their own teams (the Agent tool for POCs)

owner: chief-of-staff-ceo-office (Leonie) proposes. The **founder decides** (a new capability, and an org change)
date: 2026-10-16
status: proposed. Recommendation: **not yet**. Run a one-lane pilot only after the three preconditions below hold
class: org
route: chief-of-staff-ceo-office (this proposal) → principal-engineer and tools-lead (feasibility, slot ledger), evaluation-steward (independence), chief-of-staff (caps, integration), release-manager (deploy rule) → founder (decides)
recorded by: chief-of-staff-ceo-office
board: W-1163
answers: objection 2 of company/decisions/2026-10-16-founder-org-and-dispatch-rule.md ("Managers cannot dispatch themselves, so the chief of staff remains the single executor")

## The proposal
Give the POCs on company/ceo-office/poc-map.md the Agent tool, lane by lane, so each one dispatches its own batch (company/ceo-office/dispatch-requests.md §2) instead of handing it to the chief of staff. The chief of staff keeps integration, the four files, emergencies and the rituals. This would change `tools:` in `.claude/agents/<poc>.md` through tools/org/roles.mjs, which is a founder decision. Nothing is changed by this record.

## Why not yet
1. **It may not work as drawn.** Claude Code's subagents, as we run them, cannot start subagents of their own. A manager dispatched by the chief of staff would get an Agent tool that does nothing. The workable form is a manager running as its own top-level session, which is a different host-load model (more processes on 4 CPUs). **Precondition A:** principal-engineer runs a spike that shows a manager session can dispatch one agent, and measures its load.
2. **The caps would stop being enforceable.** dispatch-check counts what is in flight from events.jsonl plus the caller's own count. Only the chief of staff writes events.jsonl, so a manager's dispatch would be invisible to the next manager's preflight. Two managers each seeing 7 of 8 would make 10. **Precondition B:** a slot ledger. Every dispatch, by anyone, first takes a slot file in `company/ops/slots/` (main checkout, uncommitted). The file is created with O_EXCL, like claim.mjs, with at most 8 agent slots and 3 builder slots, and it is released on report. dispatch-check refuses without a slot, and a stale slot expires after 6 h. This is a tools-lead change to tools/dispatch-check.mjs, which is not protected but whose rules are founder-ratified. The slot ledger is worth having even if the founder says no to this proposal.
3. **Independence would be easy to break.** A manager who dispatches its own checkers is checking its own work. **Rule:** a POC may dispatch only roles in its own lane, and lane 10 (evaluation-steward) is the only lane that dispatches checkers. A CM may never start a fact-checker, QA tester or learner evaluator. The guard is a per-lane allow-list in the agent's brief, *and* a dispatch-check rule that maps the caller's role to its lane's roles (poc-map.md) and FAILs anything else.
4. **The deploy rule must stay untouchable.** No POC dispatch may deploy, publish or touch `[deploy]`/`npm run deploy`/the workflow. Only release-manager publishes, and only with the founder's approval of that deploy. The existing hook and commit rule apply to every session. **Precondition C:** the deploy-marker guard (W-1051/W-1052) is in CI, so a manager session cannot deploy by accident the way r7 did (2026-10-15 COE).

## Other risks
- **Integration races.** Several managers' builders finishing at once means several merge streams. Keep merging with the chief of staff only: managers dispatch, the operator integrates.
- **Cost.** A manager session that dispatches holds its context open while its team works. Each manager session needs a budget line under `leadership` or its lane's project. portfolio-manager watches it.
- **The single writer.** Managers would still not write board.json, progress.md, events.jsonl or founder-inbox.json. Their dispatch and report lines go into their batch file, and the chief of staff copies them into events.jsonl each round. That keeps AMD-005's one-writer rule, at the price of a lag that the slot ledger (precondition B) covers.
- **The failure mode I watch:** "a second operator instead of the operator's auditor", multiplied by 20. The pilot starts with one lane.

## If the founder says yes: the pilot
- **Lane:** 7 (engineering, Kenji). It has few agents, no learner-facing checks, a tier system already in place, and it is the founder's direct. The quality lane is not the pilot: it would test the hardest independence case first.
- **Length:** 3 days, with all three preconditions met before day 1.
- **Measures (WBR health section):** dispatches outside the lane (target 0), slot-ledger refusals, peaks against caps, merge latency, and cost per round compared with the request protocol.
- **Stop if:** any cap breach, any out-of-lane dispatch, or any deploy-path touch.

## Objections
| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | The founder asked for scalable oversight now, and "not yet" keeps the operator as the single executor. | chief-of-staff-ceo-office (Leonie, against my own recommendation) | **Answered in part:** the request protocol moves the *decision* to managers today. Only the *execution* stays with the operator, until the caps can be enforced across dispatchers (precondition B). The founder may take the pilot now, with that risk. |
| 2 | A slot ledger adds a moving part to every dispatch, including the operator's. | Leonie (anticipating Ada) | **Open for the founder.** It replaces a count the operator types by hand (`--running`), which the 2026-10-14 SEV2s showed is not reliable. |
| 3 | Kenji is already overloaded (poc-map.md). A pilot in his lane adds work. | Leonie | **Open:** the alternative pilot lane is 9 (tools-lead), which is smaller but reports to the chief of staff. That would make the pilot the operator's own org, so the independence of the measurement is weaker. The founder picks the lane. |

## What would make this record wrong
- Precondition A's spike shows that subagents can dispatch. Then reason 1 falls away, and the cap problem (B) becomes the only blocker.
- The request protocol's latency, measured at WBR 2026-10-19, is negligible. Then this proposal is not needed.
