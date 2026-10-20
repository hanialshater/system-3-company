# EXP-009 build notes: tools/reconcile.mjs

owner: tools-lead (build, W-1998) · acceptance: analytics-steward (W-1999), who reads these notes only after writing its own findings on the coverage table and a 10-gap sample
run: `node tools/reconcile.mjs --from=2026-10-15T00:00Z --to=2026-10-19T23:59Z --json > company/experiments/EXP-009/run-2026-10-20.json` (git HEAD 57ed928e0a, recorded in the file)
tests: `node --test tests/reconcile/*.test.mjs` (12 fixture tests; no npm script, because package.json is tier 2 and this is a read-only tool)

This file describes the tool. It does not interpret the numbers: that is the `## Result` of EXP-009, written by analytics-steward.

## The two halves

1. **Independent list.** Built only from files that are not `company/ops/events.jsonl` or `ledger.jsonl`. Every rule is a named, exported function in tools/reconcile.mjs.
2. **Record.** events.jsonl and ledger.jsonl, read only to match against (`buildEventRuns`, `founderMatches`, `publishMatch`).

## How each source is extracted

| Source | Function | Rule | Time precision |
|---|---|---|---|
| Dispatch requests (`company/ops/dispatch-requests/*.md`) | `extractDispatchRequests` | Only the `## Dispatched…` section. Each bullet is split into sentences. A sentence counts when it has `→` or "dispatched" and none of waits/waiting/queued/held/refused/"next round". Ids are the `B<n>`/`A<n>` tokens. The role is the `→ <role>` after the id, else the single `→ <role>` in the sentence, else the item's `role:` line. | `~HH:MMZ` in the sentence or the heading, else the file's day |
| Role memory (`company/roles/memory/<role>/<date>-<runkey>.md`) | `extractMemoryEntries` | One per file (F-39: one entry per run). chief-of-staff and founder are the main session, not dispatched runs, and are skipped (`MAIN_SESSION_ROLES`). | day |
| Records naming a run (reviews, readiness, ritual records) | `extractRecordLabels` | Each distinct `·<4 hex>` label suffix in a file dated in the window. Matched by suffix only. | day |
| Commits | `extractCommitRuns` | Non-merge commits whose subject starts `<role>:` (a role in tools/org/roles.mjs, not the main session) or `memory: <role>`. Commits of one role less than 90 min apart form one run (`COMMIT_CLUSTER_MS`). | minute (last commit) |
| Mailboxes (`company/ops/mailboxes/`) | `extractMailboxes` | dispatch-request messages with a `<id>.claimed` marker in state launched; `<id>.done` = ended. **Absent in this checkout** (gitignored spool); the output says `mailboxes: absent`. | minute |
| Founder quotes | `quotesInText` via `extractFounderDecisions`, `extractFounderProgress`, `extractFounderCommits`; `dedupeFounderQuotes` | FQ1 "Founder verbatim …:" + quotes or `>` lines; FQ2 "founder … said/asked/wrote/…:" right before a quote; FQ3 `>` lines in the first 25 lines of files named `*founder*`. Repeats (first 60 normalised chars) are one message, earliest day. | day |
| Publishes | `extractPublishes` | `git log -p -U0` of `src/demos/*/*/meta.json`: a file whose diff adds `"status": "published"` and does not remove it. Root commits (no parents) are skipped. | minute (author time) |
| Releases | `extractReleases` | `company/ops/releases.json` entries dated in the window. | minute |

## Matching

- **Event runs** (`buildEventRuns`): dispatch, report, stopped and usage events plus ledger lines, grouped by agent label (else `key`, else event id), split when records of one key are more than 12 h apart (`SESSION_WINDOW_MS` from tools/lib/usage.mjs). Usage = usage events plus ledger lines after `dedupeUsage`, so a resumed run counts once. The role comes from the report/usage/ledger actor, else the dispatch's `subjects[0]`, else "Dispatch <role>:" in the summary.
- **Run items** (`runCandidate`, `matchRunItems`): mail id (strength 3) > label suffix (2) > same role with the item's time inside [run start − window, run end + window] (1). A run with no end record is open for 6 h (`OPEN_RUN_MS`). Within one source each event run is claimed once (best pairs first). Across sources, items that claim the same run merge into one independent run (`mergeRunItems`). Unmatched items of the same role and day from different sources merge too.
- **Types.** dispatch: every independent run, matched when its event run has a dispatch. report: runs with end evidence, matched when there is a report event. usage-before/after: ended runs split at `USAGE_STOP`, by run end time (day-precision items whose day straddles the stop are counted as `usage-straddle`). founder: text match within ±1 day (40-character prefix, or the whole short message, or token Jaccard ≥ 0.6). publish: the event's `refs` hold the commit, or its `subjects` hold the slug within 24 h. publish-before/after split at 2026-10-17T00:00Z ("after 10-16"). Releases match by commit or by "Release <version>".
- **Spread.** The same inputs are rerun at ±10 and ±60 min; `spread` gives each type's coverage at each window, and a flag above 5 points. Founder and publish do not depend on the window.

## Causes (fixed list, first rule that applies; `CAUSES` in the tool)

usage-after-stop, usage-day-straddles-stop, dispatch-missing-run-reported, report-stopped-instead, no-role, role-runs-claimed, outside-window, after-transcript-backfill, founder-option-pick, founder-before-log-start, founder-events-are-summaries, publish-after-last-event, publish-event-unnamed, unknown. Three thresholds are computed from the record and printed under `derived`: the last `tx-` event (transcript backfill end), the last founder event whose actor is the founder, and the last publish event. "unknown" is never reassigned.

## Known limits

- **Independence (cannot be removed here).** The chief of staff writes the event log and most of the commits, handoffs and decision records the list is built from. A run or message the chief of staff forgot is missing from both sides, so this bias can only make coverage look higher.
- **The list is incomplete before 10-16.** Memory entries start with F-39 (10-16) and dispatch requests with the mailbox rounds (10-16), so 10-15 has few items. `recordsWithoutItem` (event runs no item names, by day) shows how much the list misses.
- **Memory entries are day-only and may not be one per run.** A run can write more than one entry, or another session (not dispatched from this log) can write one. `role-runs-claimed` counts items that found more same-role, same-day entries than event runs.
- **Founder extraction is pattern-based.** It picks up some quoted phrases that are not founder messages (a few in the 10-20 run are paraphrases or a single word), and it misses founder messages nobody quoted. Unknown founder gaps are the place to look for extraction errors.
- **Founder events after 10-17T21:06Z are summaries** ("decision: …"), so a text rule cannot match them. This is reported as a cause; a looser rule would mean guessing.
- **Shallow clones.** This checkout was shallow (history from 2026-10-16T15:53Z). The 10-20 run used the full history after a read-only `git fetch --unshallow origin`. A shallow rerun shows fewer commit and publish items; check `inputs.gitShallow`.
- **Output depends on HEAD** (`inputs.gitHead`): new commits in the window, or new files dated in it, change the numbers. Same HEAD and same files give byte-identical output (tested). The clock appears only with `--stamp`.
