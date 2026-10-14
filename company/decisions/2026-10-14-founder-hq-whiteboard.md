# Founder decision: a whiteboard in HQ meetings for the founder and agents to sketch

owner: founder (recorded by chief-of-staff)
date: 2026-10-14
status: decided. Routed to hq-engineer (build) with tools-lead (owner of HQ). Below the "major" threshold proposed in company/ops/token-budget.md, so it doesn't go to the forum.

## What the founder said

> "Also add. White board for meetings so me and agents can sketch"

## Decision

HQ meetings get a whiteboard. Both the founder (in the browser) and agents (from files, since agents work through the repository) can sketch on it. Sketches are kept with the meeting.

## Constraints

- **The disk is the memory.** A sketch must be stored in the repository, so agents can read and write it and the next session can see it. It is not enough to keep it in browser storage.
- **Agents draw by writing a file** in a simple, documented format: shapes, arrows and text, or plain SVG. The founder draws in the browser.
- Any server write path needs the same origin guard as /api/events, and no third-party services or new npm dependencies without a decision record.
- HQ files (src/lib/hq.ts and src/app/hq/*) are being edited by the History and Marketing org work, so the whiteboard is built in its own worktree and merged after those land.

## Objections carried forward

- **principal-engineer (EDD-003):** a server write API on the deployed site creates state outside git. The design must say where production sketches go, or keep writes local-only until decided.
