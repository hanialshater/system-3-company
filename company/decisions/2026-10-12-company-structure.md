# Run the company as narrow roles around independent checks

owner: founder
date: 2026-10-12
status: decided · revisit after the first OP

## Context
We want many lessons across many domains, made mostly by AI agents. One strong generalist agent
can build a lesson, but its builder, critic and fact-checker share one context and one set of
blind spots.

## Options considered
1. One generalist agent per lesson, self-reviewing.
2. A fixed pipeline: planner → builder → critic → revise.
3. Narrow roles with an operator that chooses the next move, isolated evaluators, and a constitutional surface. *(chosen)*

## Decision
Option 3. 26 roles (25 agents and the founder), generated from `tools/org/roles.mjs`. Quality
reports to the evaluation steward, not to product. Gates in `tools/company.mjs`, QA contract in
`tests/qa/`, both protected.

## Rests on
- System 3, Ch. 3 (independent evaluators), Ch. 5 (independence has to be built), Ch. 7 (constitutional surface).
- Pattern `artifact-before-account`.

## Revisit if
EXP-001 shows isolated evaluators catch a planted false claim no more often than shared-context
ones, or if the cost per published lesson is more than 3× a single-agent baseline with no quality gain.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| 26 roles is heavy for 17 lessons; coordination may cost more than it saves | founding review | evidence | open, funded: EXP-001 plus a cost comparison in the first OP |
| Several roles share one model, so "independence" is partly theatre | founding review | evidence | accepted in part: evaluators get different inputs and boundaries; trying a model from another developer is on the roadmap |
