# System 3 Meta: where we are, and the milestones to "create companies"

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · status: proposal for the founder
companions: [API.md](API.md) · [ROLES.md](ROLES.md) · [vision and roadmap](2026-10-19-vision-and-experiment-roadmap.md) · [VP design](2026-10-17-vp-design.md) (proposed, not approved)

## Where we are (2026-10-21)

- **Design:** done for one company: scenarios S0-S15 (company/ops/2026-10-20-flow-and-rooms-scenarios.md), API.md, ROLES.md.
- **Tools:** a working prototype in `prototype/`, 35 tests:
  - the engine: flows, orders, stages, approvals;
  - the mailbox: priorities, keys, leases;
  - rooms and sessions;
  - dependencies, rituals on three clocks, lane policy, contractors;
  - the code supervisor.
- **Evidence:**
  - 5 simulator iterations (prototype/ITERATIONS.md);
  - 3 live runs with real agents, 14 orders shipped (prototype/LIVE*.md);
  - measured: draining costs 37% of single sessions; the code supervisor costs 0 tokens; flow efficiency rose from 12% to 44%; class-level findings close a revision in one loop.
- **Officially:** Meta is not an org yet. The VP role design is proposed, not approved. The prototype was built on the founder's go-aheads in the 2026-10-20/21 session. EXP-009 in System 3 Company is built and awaits acceptance (W-1999).

| Roadmap phase (vision doc) | State |
|---|---|
| 0 Measurement integrity | in the company: EXP-009 built, not accepted; in the prototype: coverage 100% with harness usage |
| 1 Durable multi-session execution | **prototype done** (leases, recovery, sessions, code supervisor) |
| 2 Delegated oversight | partly: limits, async founder queue, policy within invariants |
| 3-4 Agent warm-up, qualification | not started (the manager-onboarding contractor is the first preparation mechanism) |
| 5 Memory and preparation reuse | partly: memory written at leave and used in later runs |
| 6 Context efficiency | partly: draining measured |
| 7 Meetings and whiteboards | partly: rituals on three clocks; no live meeting run |
| 8 Independent checking across models | not started (same-model checkers only) |
| 9 Manager belief updates | partly: the manager cycle records belief and decision |
| 10 R&D and code evolution | not started in Meta |
| 11 Adaptive organization | partly: org gaps, staffing proposals, contractors |
| 12 Another operator and use case | **not started: the real test** |
| 13 Broader templates | not started |

## What "create a company" still needs

1. **Company spec → generator:** a declarative template (roles, lanes, flows, policies, rituals, checks) and `meta new-company <spec>` that builds the org, flows, docs and briefs, validated against the invariants. Today the org and flow are hard-coded.
2. **Automatic launching:** agents start from the supervisor's plan without a person or orchestrator in the loop.
3. **Domain adapters:** test1 and UAT for non-code work, and acceptance tests written as part of placing an order.
4. **Durable shared store and a live view:** beyond JSON files; HQ for a generated company.
5. **Budgets and safety:** spend enforced per lane, approval for external actions, a human inbox.
6. **Portability:** the kernel in its own repository (the VP design's first portability test).
7. **The real test:** another operator, another use case.

## Milestones

Each milestone gets a committed prediction before it starts, and is judged on its exit criterion.

| # | Milestone | Exit criterion | Rough size |
|---|---|---|---|
| M1 | Kernel v1: the prototype in its own repo, durable store | All tests and the live-run procedure pass from the new repo | 1-2 weeks |
| M2 | Company spec and generator | One spec regenerates the toy company exactly; a second spec (e.g. a research-report company) generates and validates | 1-2 weeks |
| M3 | Hands-free operation: an automatic launcher (workflow or Agent SDK); the supervisor unattended | 10-order live run, zero manual launches, every crash recovered, cost per order within 10% of live run 3 | **reached 2026-10-21** (prototype/BENCH4.md: 10/10 shipped, 9 sessions, 0 typed commands, 45.3k per order, crash + corruption + changed requirement recovered by code) |
| M4 | Second domain: non-code check adapters; acceptance tests written with the order | A non-code company ships 10 accepted outcomes; defects, cost and lead time measured | 2-3 weeks |
| M5 | Governance and budgets: lane budgets, external-action approvals, a human inbox, an HQ view | Over-budget and boundary-crossing actions refused or escalated in tests; the founder runs a week from the queue alone | 1-2 weeks |
| M6 | Another operator, another use case (roadmap phase 12) | Someone other than the founder generates and runs a company from a spec, and it delivers outcomes they accept; founder interventions counted | open |

**Recommended next (revised 2026-10-21, founder: "not so fast"):** finish the tools first, in the order in [TOOLS.md](TOOLS.md): channels and broadcast, tracker, group meetings, rituals, newsletter, approvals and org changes in the CLI, document registry. M1-M6 follow.

## Status after M3 (2026-10-21)

- **Done:**
  - The launcher is the Agent SDK (founder's choice; `prototype/launcher/`, decision `decisions/2026-10-21-agent-sdk-launcher.md`).
  - Benchmark 4 is M3's exit run.
- **Open from it:**
  - a live test of the watchdog;
  - a like-for-like cost run;
  - a harder, ambiguous task.
- **Next milestone:** M1 (the kernel in its own repo) and M2 (spec → generator). Both are mechanical now that the kernel runs unattended.

## Founder decisions needed

1. Approve, change or decline the Meta VP design (2026-10-17-vp-design.md), so Meta has an owner.
2. Choose the first non-lesson use case for M4, and its external acceptance measure.
3. ~~Choose the launcher for M3~~: the Agent SDK (founder, 2026-10-21).
4. Set the budget for M1-M3.
