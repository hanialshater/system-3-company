# Off-boarding and a persistent knowledge base

owner: vp-meta · date: 2026-10-24 · status: decided · class: org design · route: founder → vp-meta

## Ask

Founder, 2026-10-24: "Do we have learnings board/forum?", "add the persistent knowledge base for next run, but wait, i
thought we have agents off boarding".

## Decision

- Every session leaving a run (single agent and org members alike) gets one **off-boarding** turn: practices,
  findings, dead ends and pitfalls, each with evidence and a belief (0-1), into `knowledge/entries.jsonl`.
- `knowledge/KB.md` is built from it; **on-boarding**: the next run's members get it at the start and decide what to
  use. Beliefs change by appended entries, never edits.

## Reasons

The kernel had off-boarding (the leave event carries what was learned; K28 retros), but the lean benchmark harnesses
had dropped it with the structure; each run's experience left with its sessions.

## Evidence since

B11: 54 entries; B12: 52, and every B12 member read the base; B12 continued: 52 more (158 in total).
