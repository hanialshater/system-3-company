# Founder decision: agent cap 14, builders stay at 3

owner: founder (recorded by chief-of-staff) · date: 2026-10-16 · class: ops
route: chief-of-staff (tools/dispatch-check.mjs MAX_AGENTS) → tools-lead (slot ledger W-1196 uses the same numbers) → chief-of-staff-ceo-office (watches health at the WBR)
recorded by: chief-of-staff · status: decided, in force now
amends: company/decisions/2026-10-14-operating-caps-and-intake.md item 1 (agents 8 → 14; builders 3 unchanged; host guard unchanged)

## What the founder said
After "Why 1 task only is running we have tons to do" and "Go more", asked whether to raise the cap with all 8 slots full and about 25 manager-approved items queued (host: load 0.5 on 4 CPUs, 14 GB RAM and 16 GB disk free), the founder chose **"14 agents, 3 builders (Recommended)"**.

## Decided
- At most **14 agents** in flight (every kind), at most **3 builders** (build or wave). The host guard (load ≤ 2 × CPUs; ≥ 10 GB free for builds) is unchanged.
- The extra slots are for light runs: manager batches, reviews, fact-checks, records.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| More concurrent runs means more results for one integrator to merge and record (the retro's H7: the record drops first when the CoS is busy). | chief-of-staff | **Open, mitigated:** per-run handoff files (C5, W-1199) and the agent-events hook (C1, W-1195) are in this round's tools batch. Leonie checks handoff age at the WBR. |
| Evaluators running production builds (QA) are CPU-heavy even though they are "check" kind. | chief-of-staff | **Open:** the host guard still applies; if load passes 2 × CPUs, QA runs wait. |

## What would make this record wrong
- Load or disk guard failures, or merge/record backlog (unfolded handoffs older than 6 h) at 14: drop back and record why.

## Addendum (chief of staff, 2026-10-16 ~11:30Z): production builds share the builder cap
Concurrent `next build` runs were OOM-killed by the host's memory cgroup (2 of 3 SO-10-1 builds; one fact-check build exit 137). Until tools-lead adds a build-slot guard to dispatch-check, **every run that performs a production build (builders, QA runs, checks that build for a walkthrough) counts against the 3-builder cap.** This tightens the founder's cap; it loosens nothing.
