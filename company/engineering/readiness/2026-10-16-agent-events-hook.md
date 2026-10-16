# Operational readiness: Agent-tool hook writes dispatch/report events; metrics show last-dispatch age (W-1195, W-716)

```
change: .claude/hooks/agent-events.mjs (new, NOT wired) writes dispatch/report events through tools/events.mjs add; events.mjs honours S3_EVENTS and takes --id/--source/--chooser/--tool-use-id/--body-file=-, and its backfill skips runs the hook already wrote; metrics prints "last dispatch event: N h ago" and marks never-dispatched STALE over 6 h
change-tier: 2
paths: .claude/hooks/agent-events.mjs, tools/events.mjs, tools/metrics.mjs, tools/lib/dispatch-age.mjs, tests/dispatch/agent-events.test.mjs, company/ops/events.md, company/ops/changelog.md
author: tools-lead
board: W-1195, W-716, W-1175
risks: proposes none added; proposes rescoring the event-log-gap risk only after wiring (see 7)
links: batch company/ops/dispatch-requests/2026-10-16-r2-tools.md#B1; retro company/rituals/records/2026-10-16-retro-delegation.md (H3, C1, D-3); founder inbox F-31; branch tools-events
```

**Why tier 2 and not the tier 1 the batch asked for.** `company/engineering/readiness/paths.json` classes
`.claude/hooks/**` as tier 2 ("hooks every agent runs"), and its first matching rule wins. The batch item said
"tier-1 self-check record". The paths map is the rule, so this record is tier 2 and is **not approved**:
`approved-by:` is for principal-engineer-ops to add, never the author. The script is inert until
`.claude/settings.json` names it, but the file still lands in the hooks folder, so it waits for the approval
before the chief of staff merges it. The `tools/` and `tests/` half is tier 1 on its own. If the approval
is slow, the CoS may ask me to split it into a tier-1 commit (tools, tests, docs) and a tier-2 commit (the hook).

## W-716 root cause: why dispatch/report events stopped after 2026-10-14 15:59

**Cause: there was never a dispatch-time write path. The only automatic one was `tools/snapshot.sh`, and the
company stopped committing through it on 2026-10-14.**

- `tools/events.mjs` writes `dispatch`/`report`/`usage`/`stopped` only in `backfill`, by parsing session
  transcripts after the fact. Nothing hooks the Agent tool: `.claude/settings.json` has one hook, the constitution
  guard (read on 2026-10-16).
- Commit **cc37658** (2026-10-14 14:53, "HQ: backfill 692 missing events (snapshots now refresh events.jsonl every
  commit)") made `tools/snapshot.sh` run `node tools/events.mjs backfill` before each commit. Snapshot commits were
  therefore the write path.
- **8fba61c** (2026-10-14 14:57) is the last commit whose events.jsonl gained transcript events from that path
  (531 `tx-` dispatches, the newest at 14:55:42). Every later commit until 1586e7f carries the same 531.
  Checked by reading `git show <sha>:company/ops/events.jsonl` at each of the 19 commits that touched the log
  since cc37658 (command in "Checked on disk" below).
- The same afternoon the CI-queue and deploy-quota COEs
  (company/rituals/records/2026-10-14-coe-ci-queue.md, 2026-10-14-coe-deploy-bypass-and-quota.md) named WIP
  snapshot pushes as the load that filled the CI queue and used up Vercel's 100 deploys. After that, commits were
  made directly with `git commit`, which does not backfill. No `Snapshot:` commit appears after 423dc0d
  (2026-10-14 10:22), and the log froze. *Believed, not checked:* that the COEs are why snapshot.sh fell out of
  use. Nothing on disk records a decision to stop using it.
- One manual backfill in **1586e7f** (2026-10-15 09:04, "… events backfill") brought dispatches up to
  2026-10-15 08:55:00. Nothing ran it after that, which is the second dark period (retro H3, W-1175). Since
  2026-10-16 09:57 the chief of staff has written some events by hand (`ev-…`, e.g. the round-2 manager runs).
  Those have no `agent` or `subjects`, so `metrics` still counts them for no role.
- The transcripts were complete the whole time. `node tools/events.mjs backfill --types=dispatch,report
  --since=2026-10-15T08:00:00Z --dry` finds 397 events to add, about half of them duplicates by id (see note).
  **Repair is one backfill run.** That is the CoS's step, because events.jsonl has one writer, and it was not
  run here. The fix for the future is this hook: the write happens at dispatch time, with no ritual for anyone
  to remember.
- Note: the `--dry` count overstates. A report shows up in both the queue line and its user-turn echo with the
  same id, and `append` dedupes by id but `--dry` counts both copies. That is cosmetic and not fixed here.

## The settings.json snippet the founder would approve (F-31). NOT APPLIED

Merge into `.claude/settings.json` `hooks`, keeping the existing constitution entry. B3's `no-pkill.mjs` is a
second Bash PreToolUse entry in the same F-31 change (widened F-31, batch header).

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit|NotebookEdit|Bash",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/protect-constitution.mjs\"" } ] },
      { "matcher": "Agent|Task",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ],
    "PostToolUse": [
      { "matcher": "Agent|Task",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ],
    "SubagentStop": [
      { "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ]
  }
}
```

After wiring, the integrator runs one real dispatch and checks `node tools/events.mjs tail 3` for an `hk-` dispatch
with `source` and `chooser`, and later its `hk-` report. If SubagentStop's payload has no `agent_id` (see "Believed"),
the report comes from the backfill as today, under the hook's label.

## Design decisions the batch left open (mine, within role)

- **PostToolUse is not always the report.** In this harness, Agent calls are async: the tool result is
  "Async agent launched successfully … agentId: a…" (`toolUseResult.status: "async_launched"`, seen in the session
  transcript on 2026-10-16). A `report` at that moment would close the dispatch in `dispatch-check`'s in-flight
  count, and C1/C2 would undercount running agents. So an async PostToolUse only stores agentId → label in
  `.serve/agent-events/<agentId>.json` (gitignored). The report is written at **SubagentStop**. A foreground
  PostToolUse is the report.
- **Chooser:** `chooser=<role>` in the prompt, else the `poc:` line of the cited batch file, else the dispatcher
  (`S3_ROLE`, default chief-of-staff) for §4 or no source. A cited SO or a missing batch file gives `unknown`,
  not a guess.
- **One run, one dispatch.** Hook events carry `toolUseId`. The backfill maps that id to the hook's label,
  skips its own dispatch, and joins transcript reports to the hook's label. It skips a transcript report when the
  hook already wrote one for that label.
- dispatch-check is **unchanged**. It already reads `S3_EVENTS` and counts any `dispatch` with an `agent` until a
  `report`/`stopped` with the same label, so lane 10 has nothing new to check in how it reads events.

## The check

1. **What can fail.** (a) The hook errors: it logs to `.serve/agent-events.log` and exits 0, so the tool call goes
   ahead, and the gap shows as a growing "last dispatch event" age. (b) SubagentStop never fires or has no
   `agent_id`: the dispatch stays open until the backfill adds the report (as today) or the 6 h staleness in
   dispatch-check drops it. Worst case: dispatch-check overcounts in-flight agents for up to 6 h and refuses a
   dispatch with C1. That is safe, and `--running` does not lower it (the larger count wins). (c) Two hooks
   append at once: each `appendFileSync` is a single O_APPEND write. *Believed* atomic on the local fs, not
   stress-tested.
2. **How we would know.** `npm run metrics` prints `last dispatch event: N h ago`, and `STALE` over 6 h on both
   the line and "never dispatched". `dispatch-check` already warns "no dispatch logged for 3 h or more". Hook
   errors go to `.serve/agent-events.log`. Tests: `npm run test:dispatch` (tests/dispatch/agent-events.test.mjs, 9).
3. **How to roll back.** Remove the three hook entries from `.claude/settings.json` (founder-approved config, so
   tell the founder), or `git revert <sha>`. Under a minute. The hook adds events and never rewrites one. Events it
   wrote stay in the log, as append-only requires. A wrong one is corrected with a `corrects:` event.
4. **Capacity.** Two short node processes per Agent call (PreToolUse and PostToolUse) and one per subagent stop.
   Measured 0.18 s for a dispatch against a 4.5 MB copy of the log (the add reads the log to dedupe ids). There is
   no server, no build and no CI push. The log grows by about one dispatch body (the prompt) per run, which the
   backfill already stores today.
5. **Security.** No route, no network, no production surface. It writes prompts to the log, which the backfill
   already does. The batch-file read is restricted to paths inside the repository.
6. **Data.** Writes `company/ops/events.jsonl` (via events.mjs) and small state files under `.serve/`. No learner
   data. Prompts and reports are stored as written, the same as the backfill (events.md).
7. **Risks.** No new risk. Once wired and seen working, I will propose re-scoring the event-log-gap risk to the
   register owner (principal-engineer-ops) with the first day of `hk-` events as evidence. Not before.

## Checked on disk (2026-10-16, this run)

- Last automatic backfill → `for c in cc37658 8fba61c … cfe3b3b; do git show $c:company/ops/events.jsonl | node -e '<count tx- dispatches, max ts>'; done`
  → `8fba61c 531 last 2026-10-14T14:55:42`, unchanged through `9c236b3`; `1586e7f 652 last 2026-10-15T08:55:00`.
- Transcripts still hold the runs → `node tools/events.mjs backfill --types=dispatch,report --since=2026-10-15T08:00:00Z --dry` → `397 new event(s) would be added`.
- Agent results are async → session transcript `toolUseResult: {"isAsync":true,"status":"async_launched","agentId":…}`.
- Tests → `npm run test:dispatch` → 29 pass, 0 fail (9 new).
- Metrics on a fixture → `S3_EVENTS=<fixture with one dispatch at 2026-10-15T08:55Z> node tools/metrics.mjs` → `last dispatch event: 26 h ago (2026-10-15T08:55Z) STALE: …` and `STALE never dispatched (97/97)`.
- The hook writes and dispatch-check counts it → `echo <PreToolUse demo-builder payload> | S3_EVENTS=<tmp> node .claude/hooks/agent-events.mjs` then `S3_EVENTS=<tmp> node tools/dispatch-check.mjs --kind=other --running=0` → `in flight: 1 agents, 1 builders (event log 1/1 …)`.

## Believed, not checked

- The hook payload field names (`hook_event_name`, `tool_name`, `tool_input`, `tool_use_id`, `tool_response`;
  SubagentStop `agent_id`, `agent_transcript_path`) are from the Claude Code hooks contract as I know it. They have
  not been seen live, because nothing is wired. The PostToolUse `tool_response` shape is inferred from the
  transcript's `toolUseResult`. The first wired dispatch is the test.
- That the tool is named `Agent` (as in the transcripts) and not `Task`. The matcher covers both.

## Change notes since 864dab5 (tools-lead, 2026-10-16, W-1260: E1 and ruling H2; still NOT wired)

For PE-ops: the approval covered the hook "as long as the hook code is still the code at 864dab5". It is not,
so this needs your look before wiring. Diff: `git diff 864dab5 tools-e1n1 -- .claude/hooks/agent-events.mjs tools/events.mjs tools/lib/events-spool.mjs tools/lib/dispatch-age.mjs tools/dispatch-check.mjs tools/metrics.mjs tests/dispatch/agent-events.test.mjs .gitignore company/ops/events.md`.

| Change | Why | Effect on the check above |
|---|---|---|
| `tools/events.mjs` `readLog`/`append` skip and count unparseable lines (stderr `events: N unreadable line(s) skipped in <file>`), never throw | E1 (review 08ee578): one `<<<<<<<` line stopped every hook write | 1(a): a conflicted log no longer drops events |
| Hook calls `events.mjs add --spool`; it writes `company/ops/events-spool/<UTC date>.jsonl` only, never events.jsonl | Ruling H2 (company/decisions/2026-10-16-cos-ruling-h2-hook-spool.md); answers your H2 | 6 (Data): the hook's write target is the spool, not the log. The autostash collision the review describes cannot involve events.jsonl, because the spool is untracked |
| One spool per repository: `tools/lib/events-spool.mjs` finds the main checkout through `.git` → `commondir` (no git spawn); `S3_SPOOL` overrides; with only `S3_EVENTS` set the spool is `<its dir>/events-spool/` | The ruling's open objection (several checkouts, several spools). I chose one spool. | A hook firing in a worktree session writes the main checkout's spool. That is an untracked file, so no merge conflict |
| `add --spool` dedupes against the spool only and does not read events.jsonl | Cost: the hook no longer grows with the log | 4 (Capacity): 200 ms per hook run, averaged over 10 runs with a 4.58 MB log copy present (load 7.1). The review measured 307 ms at load 4.4. E2's growth driver is gone for the hook; `fold` still reads the log (179 ms for 10 events on the same copy) |
| Hook uses `spawnSync` and logs events.mjs stderr to `.serve/agent-events.log` even when the add succeeds | E1: "print the count to stderr, which the hook log then captures" | 2: skipped-line counts show in the hook log |
| `node tools/events.mjs fold [--dry]` (new): each spool file is renamed to `*.folding-<pid>` first, then events are appended in ts order (id dedupe against the log), unparseable spool lines go to `events-spool/unparsed-*.txt`, and the folded files are removed. A `*.folding-*` left by a dead fold is folded on the next run | Ruling H2: the chief of staff folds before an events commit | Rollback adds one step: if unwired, run `fold` once so spooled events reach the log |
| `dispatch-check` and `dispatch-age.readEvents` (metrics) read the log plus the spool, deduped by id (the log copy wins). dispatch-check warns on unreadable lines and prints `hook spool: N unfolded event(s), oldest …`. metrics prints `events.jsonl: N unreadable line(s)` and `events spool: N unfolded event(s)` | Ruling H2 (caps right between folds); your H4 | H3 is unchanged in kind: spool dispatches with no report still count for up to 6 h |
| Tests: tests/dispatch/agent-events.test.mjs, 9 → 15. Hook tests read the spool and assert the log is never created. New: E1 on the log (a conflict line, append-only kept, dedupe past it), E1 on the spool (hook log shows the count), main-checkout resolution from a real linked worktree, dispatch-check over log + spool, fold (order, dedupe, dead-fold file, unparsed kept, no-op second run), metrics counts | | `npm run test:dispatch` 55/55 |

Believed, not checked: (1) a hook append that opened the spool file just before `fold` renamed it lands in the
renamed file after `fold` read it, and that event is lost from the fold. The window is one `appendFileSync`, and the
event is still in the transcript for the backfill. I did not reproduce it. (2) `company status` showing unfolded spool lines and their age
(ruling, C5/W-1199) is in tools/company.mjs (protected). Not done here. Metrics and dispatch-check show it now.
(3) `tools/lib/ledger.mjs` `readEvents` reads only events.jsonl. Usage events come from the backfill, not the hook,
so I left it.

## Approval (tier 2; written by principal-engineer-ops)
- Decision: **approved with conditions to merge unwired at 864dab5** by principal-engineer-ops (copied by chief-of-staff at merge, 2026-10-16). Authority and conditions H1-H6: `company/engineering/readiness/2026-10-16-agent-events-hook-approval.md` (fee2b05). Wiring needs founder F-31 plus H1 and H2.

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
