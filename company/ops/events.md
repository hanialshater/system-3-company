# The event log

`company/ops/events.jsonl` is the company's timeline. HQ (`/hq`) draws the office, the timeline and
the replay from it. It is **append-only**: an event is never edited or deleted. A correction is a new
event that names the one it corrects (`corrects: <id>`).

Every event points at something on disk or in git (`refs`), so the log can never become the only
place a fact lives. The disk is still the memory, and the log is its index in time order.

## Schema (one JSON object per line)

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable id. Backfilled events derive it from their source, so re-running the backfill adds nothing twice. |
| `ts` | yes | ISO-8601 UTC time the thing happened. |
| `type` | yes | One of the types below. |
| `room` | yes | Where it happened in HQ (see rooms). |
| `actor` | yes | Role id (`chief-of-staff`, `demo-builder`, `fact-checker`, `founder`…). |
| `summary` | yes | One line a busy founder can read. |
| `agent` | no | Agent label, joining a dispatch to its report and notifications. |
| `subjects` | no | Lesson slugs, board ids or role ids the event is about. |
| `body` | no | The conversation text: a dispatch brief, a report, a decision. Markdown. |
| `refs` | no | File paths or commit hashes. |
| `state` | no | For agents: `working`, `done`, `failed` or `stopped` (a usage limit or an interruption). |
| `corrects` | no | The id of an earlier event this one corrects. |

## Types

`dispatch` (the chief of staff sends work), `report` (an agent hands back), `stopped` (an agent
ended early), `merge`, `publish`, `unpublish`, `dispute`, `verify`, `review`, `ritual`, `decision`,
`incident`, `blocked`, `founder` (a message from the founder), `commit`, `note`.

## Rooms

| Room | Who is there |
|---|---|
| `lobby` | The founder's office: founder messages and decisions waiting on the founder |
| `chief-of-staff` | Dispatches, plans, handoffs |
| `build-floor` | Demo builders, new lessons and revisions |
| `fact-check` | Fact-checkers |
| `learner-review` | Learner evaluators, pedagogy critics |
| `qa-lab` | QA runs and records |
| `launch-room` | Launch reviews, publishes, unpublishes |
| `engineering` | Principal engineer, platform, eng reviews, EDDs, ADRs |
| `backend` | Backend engineer, privacy reviewer |
| `growth` | Growth designer, experiments |
| `tools` | Company tools: the event log, HQ, metrics |
| `meeting-wbr`, `meeting-retro`, `meeting-crit`, `meeting-planning` | Ritual meetings |
| `incident` | COEs and incidents |
| `constitution` | Amendments and constitutional reviews |
| `cm-<domain>` | Category managers' offices |

## Writing events

```bash
node tools/events.mjs add --type=dispatch --room=build-floor --actor=chief-of-staff \
  --agent="Wave 5 builder: math" --summary="Build next 10 math briefs" --subjects=math --body-file=brief.md
node tools/events.mjs backfill   # git history + session transcripts (idempotent)
node tools/events.mjs tail 20
```

Session transcripts are imported from `~/.claude/projects/**/*.jsonl` (dispatches, reports and
stop notices). Internal agent ids are reduced to a short hash; prompts and reports are stored as written.
