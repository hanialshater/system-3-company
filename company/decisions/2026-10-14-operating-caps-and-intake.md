# Proposed: operating caps, founder intake and the daily rhythm, enforced by a dispatch preflight

owner: chief-of-staff-ceo-office (Leonie), proposer; the founder decides
date: 2026-10-14
status: proposed (founder to ratify)
class: ops
route: chief-of-staff-ceo-office (audit) → chief-of-staff (answers each finding in writing) → evaluation-steward (AMD-005) → tools-lead (reviews the tools) → founder (ratifies)
recorded by: chief-of-staff-ceo-office
supersedes (on ratification): the "Concurrency" decision in 2026-10-14-usage-upgrade.md, and the "Concurrency (2026-10-14, plan upgraded to 20×)" section of company/ops/operating-loop.md

## What the founder said

> "We need to make sure we have good structure and rituals, you cant go radom across the company"
>
> "Take to company health poc lieone and make sure we fix this to have scalable and durable work."

(company/decisions/2026-10-14-founder-durable-ops-and-marketing.md, Decision 1)

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** the rules must be enforced by mechanisms and survive sessions.
- **Proposed here (how):** the caps, the intake rule, the rhythm and the preflight in company/reviews/org/2026-10-14-operating-audit.md sections 2-4, now in company/ops/operating-loop.md marked "proposed 2026-10-14, founder to ratify".

## The proposal

1. At most 8 agents and 3 builders in flight; host guard (load ≤ 2 × CPUs, ≥ 10 GB free). The usage plan is not the binding limit; the 4-CPU host is.
2. Builders only in worktrees; the main tree's server is for evaluators.
3. One writer (the chief of staff) for the board, progress log, event log, founder inbox and WBR. CLAUDE.md and working agreement item 9 change to match (text in the audit, section 5).
4. Every founder ask: classify → owner from the routing table → decision record from `_template-founder-intake.md` → board.
5. `node tools/dispatch-check.mjs` before every Agent call. Exit 1 means do not dispatch.
6. AMD-005 puts the parts that live in `tools/company.mjs` under the constitution.

## Route and answers

| Step | Role | Answer | Where |
|---|---|---|---|
| 1 | chief-of-staff-ceo-office | proposes | company/reviews/org/2026-10-14-operating-audit.md |
| 2 | chief-of-staff | owed: a written answer to each finding | board |
| 3 | evaluation-steward | owed: own, renumber or reject AMD-005 | board |
| 4 | tools-lead | owed: review dispatch-check.mjs and the rituals-due change | board |
| 5 | founder | owed: ratify, change or reject | board (founder) |

## Objections

- **chief-of-staff (expected; from the usage-upgrade record):** "the plan is 20×; 8 agents under-uses it, and the founder said we are under-utilising." **Answer:** the host, not the plan, stopped work today: three SEV2s, load 24-60 on 4 CPUs, pages at 50-163 s, a shared dev server down for 10-20 minutes. More agents made each one slower. The cap can rise by a decision record that adds host capacity (more machines, or builds that do not share one host).
- **CEO office against itself:** the CEO office built the preflight it will audit. **Answer:** tools-lead reviews the tools (step 4) and the CEO office is not a deciding vote on AMD-005.
- **The event log is unreliable, so the preflight's in-flight count is too.** **Answer:** the preflight takes the larger of the log and the chief of staff's own count, and warns when no dispatch has been logged for 3 h. Fixing the logging gap is a tools-lead item.
- **Blocking waves while a ritual is overdue can stall the company.** **Answer:** rituals, merges, incident fixes, finishing in-flight agents and approved deploys are never blocked; only new waves and builds are. A WBR costs one agent.

## Board

- Items added with this record (see the audit's handoff): founder ratification; chief-of-staff answers; AMD-005 to the steward; tools-lead review and the logging gap; COEs for the three SEV2s; History back through principal-pm-verticals.
