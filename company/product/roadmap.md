# Roadmap

owner: head-of-product · updated: 2026-10-12

Each item links to a PRD, brief or board id. Items move only in Cycle Planning, and the reason is recorded.

## Now (this cycle)
Programme: reach at least 500 lessons across all domains (founder request, 2026-10-12) without relaxing any gate. Plan, goals and allocation: [OP 2026-10-12](../rituals/records/2026-10-12-op-planning.md), pending founder ratification. Count is an output; Surface Value order (true, works, teaches, remembered, finished) is unchanged.

| Item | Link | Owner |
|---|---|---|
| Wave 1: about 100 lessons (10 builders x 10 briefs), briefed to gate the reveal; its fatal rate (wave 0: 28%) sets wave 2's size | OP section 2 (G3), board | category managers, chief-of-staff |
| Briefs #23-#55 per domain, then waves 2-6 to 482 new lessons (about 54 per domain, at least 20% exploration) | OP section 3, `company/domains/briefs/` | category managers |
| Revise wave 0: 17 of 18 lessons need a revision (5 fatal, 12 revise), plus about 130 revision slots over the quarter | OP section 3, board W-016...W-020 | learning-designer, builders |
| Feed at 500: measure at about 120 and 500 lessons; slim index plus pagination if over budget | [EDD-001](../engineering/edd/EDD-001-feed-at-500-lessons.md) | platform-engineer |
| Feed MVP: vertical cards, predict, explore, reveal, revisits, map | [PRD-001](prds/PRD-001-feed-mvp.md) | platform-engineer |
| Company operating system: roles, rituals, gates, CLI | [decision 2026-10-12-company-structure](../decisions/2026-10-12-company-structure.md) | chief-of-staff |

Circuit breaker: a wave with a fatal rate above 25% halves the next wave's new builds and doubles its revisions. Open question for the founder: "10 domains" in the request versus the nine in the repository (OP section 5).

## Next
| Item | Link | Owner |
|---|---|---|
| First real-learner sessions (5 people × 5 lessons); target before cycle 4 | [EXP-002](../experiments/EXP-002-real-learner-recall.md) | founder |
| Vercel production with `SHOW_REVIEW=off` | [runbook](../ops/runbook-deploy.md) | release-manager |
| Planted-belief experiment on our own review process | [EXP-001](../experiments/EXP-001-planted-false-claim.md) | evaluation-steward |
| Revisit analytics (aggregate, anonymous) | PRD-002 (to write) | analytics-steward |

## Later
- Paths through the curriculum map using prerequisites
- Composable lesson "experiences" (one comparison widget configured many ways)
- New domains from the domain scout: astronomy, music theory, linguistics (proposals pending)
