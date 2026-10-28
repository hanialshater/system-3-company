# Founder ask: track and prototype a content hub

owner: principal-engineer
date: 2026-10-24
status: routed
class: engineering
route: principal-engineer → rnd-lead → rnd-engineer
recorded by: chief-of-staff

## What the founder said

> Git per space and scoped changes
>
> Could you track this under r&d team and build a prototype?

Source: this conversation, following the compile-on-write, tests/dependencies and on-demand artifact-loading discussion.

## What the founder decided, and what is left to the owners

The founder authorized tracking under the existing R&D team and building a prototype. No new organizational seat, production migration, deployment, dependency or paid infrastructure is authorized. The bounded brief is [company/rnd/content-hub/brief.md](../rnd/content-hub/brief.md).

## Route and answers

| Step | Role | Status | Record |
|---|---|---|---|
| 1 | principal-engineer | Production boundary review pending, W-2171 | R&D brief, EDD-003 and SPIKE-001 |
| 2 | rnd-lead | Independent R&D acceptance pending, W-2170 | R&D brief |
| 3 | rnd-engineer | Prototype implementation tracked, W-2169 | src/lab/content-hub/ |

No manager approval or independent review is claimed by this intake record. The founder's direct implementation request supplies authority for the isolated prototype.

## Objections

- Implementation concern: an existing sandbox/CDN spike could be duplicated. **Answer:** reference it and focus the new prototype on Git-per-space, scoped changes, dependency inputs and durable publication metadata.
- Implementation concern: local feasibility could be mistaken for production readiness. **Answer:** keep the prototype outside production imports; leave independent acceptance and production architecture review open on W-2170/W-2171.

## Board

- W-2169: rnd-engineer, prototype.
- W-2170: rnd-lead, independent acceptance and next R&D decision.
- W-2171: principal-engineer, production boundary review.
