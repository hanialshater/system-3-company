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
| `source` | no | On a `dispatch`: what the run was chosen from, `batch=<file>#B<n>`, `batch=SO-<lane>-<n>`, `§4:<reason>` or `none` (company/ceo-office/dispatch-requests.md §2.3, §3.4, §4). |
| `chooser` | no | On a `dispatch`: the role that chose the run (`chooser=` in the prompt, else the batch file's `poc:`, else the dispatcher; `unknown` when a batch or SO is cited but its owner cannot be read). |
| `toolUseId` | no | The Agent tool call's id, on events the Agent-tool hook writes. The backfill uses it so a hooked run is not written twice. |

## Types

`dispatch` (the chief of staff sends work), `report` (an agent hands back), `stopped` (an agent
ended early), `merge`, `publish`, `unpublish`, `dispute`, `verify`, `review`, `ritual`, `decision`,
`incident`, `blocked`, `founder` (a message from the founder), `commit`, `note`, `kudos` (thanks from one role to another: actor = giver, subjects[0] = recipient role or agent label, summary = what for), `org-change` (a role added, moved or retired; subjects = role ids), `proposal` (a major-project proposal for the project-review forum; subjects = project id; written by `node tools/ledger.mjs propose`).

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
| `boardroom` | Project review: major-project proposals and approvals (company/rituals/templates/project-review.md) |
| `constitution` | Amendments and constitutional reviews |
| `ceo-office` | Chief of staff (CEO office), portfolio manager, principal engineers, VP R&D, head of strategic initiatives |
| `first-light` | War room for First Light, the first public release (temporary, beside the CEO office; page `/hq/first-light`; company/decisions/2026-10-15-founder-first-light.md). Events about the program go here; a role's own work stays in its own room. |
| `cm-<domain>` | Category managers' offices |

**Floor 8, System 3 Press**, is a sibling company, not part of this one. Its rooms (`press-*`) are drawn
from a roster snapshot (`company/sibling/press/hq-snapshot.json`); it has no event log, so no event in
`events.jsonl` should use a `press-*` room. Work this company does for the press goes in the room of
the role doing it.

## Writing events

```bash
node tools/events.mjs add --type=dispatch --room=build-floor --actor=chief-of-staff \
  --agent="Wave 5 builder: math" --summary="Build next 10 math briefs" --subjects=math --body-file=brief.md
node tools/events.mjs backfill   # git history + session transcripts (idempotent)
node tools/events.mjs tail 20
```

**At dispatch time (W-1195, retro 2026-10-16 C1):** `.claude/hooks/agent-events.mjs` writes `dispatch`
(PreToolUse on the Agent tool) and `report` (a foreground PostToolUse, or SubagentStop for a background agent)
through `events.mjs add`, with ids `hk-…`. It is **not wired** until the founder approves the
`.claude/settings.json` change (F-31) and its tier-2 readiness record is approved
(company/engineering/readiness/2026-10-16-agent-events-hook.md). Until then the backfill below is the only path,
and `npm run metrics` prints `last dispatch event: N h ago` so a dark log shows. `S3_EVENTS=<file>` points
`events.mjs`, `metrics.mjs`, `dispatch-check.mjs` and the hook at another log (tests).

**The hook writes a spool, not this log (ruling H2, company/decisions/2026-10-16-cos-ruling-h2-hook-spool.md).**
The hook calls `events.mjs add --spool`, which appends to `company/ops/events-spool/<UTC date>.jsonl`
(gitignored) in the **main checkout**, found through the git common dir, so every worktree shares one spool.
`dispatch-check` and `metrics` read this log plus the spool (deduped by id), so in-flight counts are right between
folds. The chief of staff, the single writer of this log, runs `node tools/events.mjs fold` (`--dry` to count)
before an events commit: spool events not already here are appended in ts order and the spool is emptied;
unparseable spool lines are kept in `events-spool/unparsed-*.txt`. One fold at a time: `fold` holds
`events-spool/fold.lock` (its pid) and exits 2 with the holder's pid when a live fold has it; a lock or a
`*.folding-<pid>` file of a dead pid is taken over (F1, e1c9162). Appends that land in a file the fold has
renamed are re-read before the file is removed (F2). `S3_SPOOL=<dir>` overrides the spool
(tests); with only `S3_EVENTS=<file>` set, the spool is `<that file's dir>/events-spool/`.
Unparseable lines here or in the spool are skipped and counted, never thrown (E1): `add` prints the count to
stderr, metrics prints `events.jsonl: N unreadable line(s)`, dispatch-check warns.

Session transcripts are imported from `~/.claude/projects/**/*.jsonl` (dispatches, reports and
stop notices). Internal agent ids are reduced to a short hash; prompts and reports are stored as written.
