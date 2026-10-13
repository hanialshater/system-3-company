# Intake, triage and priority

owner: portfolio-manager (Odette, CEO office) · tool: `node tools/triage.mjs` · since 2026-10-13 (founder request)

Every piece of work enters the company by one of these paths, and the portfolio manager triages it.

## Intake paths

| Path | How it arrives | Who mirrors it to the board |
|---|---|---|
| **GitHub issues** (`hanialshater/system-3-company`) | Anyone files a ticket. The issue form asks for kind, the lesson slug if any, and what was seen | Portfolio manager: fetch open issues with the GitHub tools, write them to a JSON file, then `node tools/triage.mjs import <file>` |
| Review and QA findings | `company/reviews/<slug>/…` records (learner, fact-check, QA, accessibility, pedagogy) | The role that wrote the finding adds the item (`company board add`) |
| Agent hand-back reports | The "next" or "blocked" lines in a report | Operating chief of staff, when merging the report |
| Founder asks | Chat | Operating chief of staff, the same turn |
| Incidents | A COE | The COE owner |

Anything that needs the founder (a decision, an approval, an action) goes in `company/ops/founder-inbox.json` instead, and shows in the HQ Lobby.

## Priority

| P | Meaning | Examples | Expect |
|---|---|---|---|
| **P1** | A learner sees something wrong, or the company cannot work | A false claim on a published lesson; a fatal learner review; a gate broken; a failed deploy | Picked up at the next operating-loop turn, ahead of everything else |
| **P2** | Blocks a launch or a team | Revise-before-launch findings; a missing tool a team waits on | This cycle |
| **P3** | Makes things better | Craft nits; tooling comfort; new briefs | When capacity allows |
| **P4** | Someday or maybe | Ideas without a brief | Reviewed at OP planning; dropped after two plannings with no movement |

Ties: items that block other items first, then items on published lessons, then age.

## Triage (per item)

1. **Is it real?** Open the item and its links; reproduce if it is a bug. If not reproducible, ask the filer once, then drop with a reason.
2. **Is it a duplicate?** Merge into the older item (link both), drop the newer.
3. **Who owns it?** The narrowest role whose scope it is in (`tools/org/roles.mjs`). Never `chief-of-staff` by default.
4. **Priority** P1–P4 per the table.
5. **Approve or not:** `--state=next` (approved, with a priority) or leave in `backlog`, or `--state=dropped` with a reason.
6. `node tools/triage.mjs set <id> --p=<n> --owner=<role> --state=<s> --note="why"`. The note is required.
7. For a GitHub issue: comment the board id and the priority on the issue. Close it only when the board item is done or dropped.

**Independence:** the portfolio manager does not approve items it wrote itself. Its own items go to the CEO office chief of staff.

## When triage runs (event-driven)

- 10 or more untriaged open items, or any P1 arriving: run triage now.
- Before every WBR: `node tools/triage.mjs stats` goes in the portfolio section.
- Before OP planning: the full ranked portfolio.
