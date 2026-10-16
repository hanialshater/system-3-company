# Readiness approval: agent-events hook (W-1195, W-716)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 (`.claude/hooks/**`, paths.json) · board: W-1195, W-716, W-1175 · risk: R-010 (event-log gap)
record approved: `company/engineering/readiness/2026-10-16-agent-events-hook.md` **on branch tools-events at 864dab5** (/home/user/s3c-tools1). It is not on main. The approval lives in this separate file because the branch is not merged and its worktree is read-only to me. When tools-events merges, the chief of staff copies the Decision line below into that record's "Approval" section and links this file.

Not my area: the author is tools-lead. The event log feeds my health metrics, and I own R-010, but I did not build or design any of this.

## Decision

**Approved, with conditions, to merge unwired at 864dab5**: `.claude/hooks/agent-events.mjs`, plus tools/events.mjs, tools/metrics.mjs, tools/lib/dispatch-age.mjs and tests/dispatch/agent-events.test.mjs. The tier-2/tier-1 split the author offered is not needed.

**Wiring** (the `.claude/settings.json` snippet in the record) is a separate step. It needs the founder's approval (F-31) and conditions H1 to H2 below. This approval does not grant it. When the founder approves, I accept the wiring under the conditions without a further readiness round, as long as the hook code is still the code at 864dab5.

## What I checked (my own runs, on a clean detached worktree of 864dab5 under my scratchpad, with a temp event log; the real events.jsonl was never written)

| Question | Command | Result |
|---|---|---|
| Tests | `npm run test:dispatch` | **29/29** (9 new) |
| Fails open on bad input | Garbage stdin; a Bash PreToolUse payload | exit 0 both. Garbage is logged to the hook log; Bash is ignored and writes nothing |
| Fails open when the write fails | `S3_EVENTS` pointed at a directory, so `events.mjs add` throws | exit 0 in **180 ms**, error in the hook log, tool call unaffected |
| Concurrent appends | 30 PreToolUse dispatches in parallel, one log | **30 lines, 30/30 parse, 30 distinct ids** |
| Idempotent | The same `tool_use_id` sent again | no second line (dedupe by `hk-` id) |
| Cost on the real log size | Dispatch against a copy of main's events.jsonl (4.58 MB) | **192 ms** wall, exit 0 |
| Async path | PostToolUse with `status: async_launched`, then SubagentStop with that `agent_id` | the state file is written and then removed; one `hk-` report is written; no report at launch time |
| Path traversal | SubagentStop `agent_id: ../../etc/passwd` | `path.basename` → unknown agent, nothing written, exit 0 |
| dispatch-check reads hook events | `dispatch-check --kind=other --running=0` on the probe log | counted the 29 open probe dispatches as in flight and **refused (C1)**. That is correct for the input, and it is the failure H3 watches for |
| metrics line | `S3_EVENTS=<copy> node tools/metrics.mjs` | prints `last dispatch event: … h ago (…Z)`, with the STALE tag logic as described |

## Conditions

1. **H1, wiring day (whoever applies F-31, with the chief of staff):** after one real dispatch, `node tools/events.mjs tail 3` shows an `hk-` dispatch with `source` and `chooser`. After that agent ends, it shows the `hk-` report. If the report does not come (SubagentStop payload without `agent_id`, the record's "Believed"), write that down on W-1195 and leave reports to the backfill. Do not leave the dispatch open-ended unnoticed.
2. **H2, before wiring (chief of staff, a ruling in the wiring record):** the hook makes every session that calls the Agent tool a writer of `company/ops/events.jsonl` in *its own* checkout, `$CLAUDE_PROJECT_DIR`. Today only the chief of staff's main-checkout session dispatches, so this stays inside the single-writer rule. A top-level session opened in a worktree would write that worktree's copy and create merge conflicts. Either rule that hook writes are the chief of staff's writes and that only main-checkout sessions dispatch, or ask tools-lead for a one-line guard (write only when ROOT is the main checkout, or when `S3_EVENTS` is set).
3. **H3, standing, a revoke trigger:** if hook dispatches with no report make `dispatch-check` refuse a real dispatch (C1) because in-flight agents are overcounted, unwire first and diagnose second. The 6 h staleness bounds this, but a 6 h freeze of dispatches is an incident, not a footnote.
4. **H4, before the next ops review (tools-lead, new item):** `tools/lib/dispatch-age.mjs` `readEvents` now **skips** unparseable lines silently. The old metrics code threw. That is reasonable for a hook-fed log, but corruption would then be invisible. Count the skipped lines and print `events.jsonl: N unreadable line(s)` in metrics when N > 0.
5. **H5, sequence (chief of staff):** run the one-time backfill that closes the W-716 dark periods (`node tools/events.mjs backfill --types=dispatch,report --since=2026-10-15T08:00:00Z`) **before** wiring. Then the first `hk-` day is clean evidence for R-010, and the backfill's hook-aware joins are exercised only on new runs.
6. **H6 (mine):** I re-score R-010 at the first ops review after one full day of `hk-` events, using the metrics "last dispatch event" line as the evidence. I do not re-score it before.

## What would make me revoke it

- Any Agent call failing or blocked because of the hook, or a median hook time over 1 s.
- An unparseable line in events.jsonl written by the hook.
- Two dispatch events for one run, an `hk-` one and a `tx-` one with the same `toolUseId`, after a backfill.
- H3 happening.
- The hook writing anything but `dispatch` and `report` events, or rewriting an existing line.

## Believed, not checked

- The live hook payload field names, and whether SubagentStop carries `agent_id`. Same as the author: nothing is wired, so H1 is the test.
- Whether subagent tool calls fire the parent's hooks with the parent's `CLAUDE_PROJECT_DIR`. I believe they do (about 70%). H2 covers the case where they do not.
- O_APPEND atomicity beyond 30 parallel writers of about 1 KB each. Each prompt body is a single write, and bodies over the pipe buffer size were not tested.

## Objections raised, and what happened to each

- *The batch asked for a tier-1 self-check; the author filed tier 2 (the record, "Why tier 2").* Upheld. paths.json classes `.claude/hooks/**` as tier 2, and the first matching rule wins. The split the author offered is not needed now that tier 2 is approved.
- *My own objection: single writer (H2).* Turned into a condition with an owner, before wiring.
- *My own objection: silent skip of bad lines (H4).* Turned into a condition with an owner, not gating.
- No other objections are on record for this change.
