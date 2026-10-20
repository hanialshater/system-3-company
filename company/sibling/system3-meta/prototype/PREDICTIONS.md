# Meta prototype: predictions, committed before any simulation run

owner: chief-of-staff, for System 3 Meta (founder go 2026-10-20: "experiment with these tools create a toy org, simulate building and observe and iterate on performance. This is meta company, current company is not affected") · date: 2026-10-20 · status: committed before the simulator exists

## What is being tested

The tools in company/ops/2026-10-20-flow-and-rooms-scenarios.md, prototyped in this folder: engine (flows, orders, approvals), mailbox, rooms, org and rituals. A toy org builds toy work items in simulated time. Workers are seeded random models, not LLM agents, so a run is free and the same seed gives the same result.

**Arms.** One engine, with switches for each mechanism:
- `current`: every switch off, modelling today's design.
- `engine`: every switch on.
- `engine minus X`: one switch off at a time.

The switches:
- enforce: refuse illegal signatures and lanes, instead of a rule someone remembers;
- autoBookkeeping: room leave writes receipt, usage, memory and board, instead of the agent;
- supervisor: code drains and launches, instead of a serial chief-of-staff dispatcher;
- asyncApprovals: a founder queue answered in sittings, instead of an interruption per approval and a requester who waits;
- leases: crash recovery at lease expiry, instead of someone noticing;
- dedupe: idempotency keys on messages.

**What a simulation can and cannot show.** It shows the consequences of the assumptions in `sim.mjs` (every parameter is named there), and whether the tools behave correctly under crashes, duplicates and illegal requests. It does not show that the real company would get these numbers. That needs the code-flow pilot with real agents against a matched batch.

## Committed predictions (engine vs current, same seed set, 14 simulated days)

| # | Measure | Prediction | would_be_wrong_if |
|---|---|---|---|
| P1 | True tokens per shipped item | engine ≤ 75% of current | > 90% |
| P2 | Lead time p50 (order → shipped) | engine ≤ 60% of current | > 85% |
| P3 | Founder interactions per shipped item | engine ≤ 40% of current | > 70% |
| P4 | Escaped defects per shipped item | engine ≤ current | engine > 110% of current |
| P5 | Measured cost per shipped item, error vs truth | engine within 2%; current off by ≥ 25% | engine off by > 5% |
| P6 | Tool correctness under faults | engine: 0 duplicate runs, 0 independence violations, every crash recovered within one lease | any of these is non-zero or a crash is not recovered |
| P7 | Biggest single mechanism (ablation) | asyncApprovals or supervisor removes the most lead time; autoBookkeeping removes the most tokens | another switch is first on both |
| P8 | Iteration | the first bottleneck the engine run shows is checker capacity; `org gaps` flags it, and a WBR-proposed checker, approved by the simulated founder, cuts lead time p50 by ≥ 20% | the bottleneck is elsewhere, or the added checker cuts p50 by < 10% |

would_be_wrong_if: engine tokens per shipped > 90% of current, lead time p50 > 85%, founder interactions > 70%, escaped defects > 110%, engine measured cost off by > 5%, any duplicate run or independence violation or unrecovered crash under the engine, another switch first on both lead time and tokens, or an added checker cutting p50 by < 10%.

## Results

In ITERATIONS.md, appended per run. This file is never edited after commit.
