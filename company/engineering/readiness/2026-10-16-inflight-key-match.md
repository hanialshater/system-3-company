# Operational readiness: in-flight count matched by run key; hook liveness and "possibly finished" in every dispatch-check (r5-tools B2)

```
change: dispatch-check counts in-flight runs through tools/lib/inflight.mjs (a report/stopped event closes the open dispatch with the same run key, else the same label, else the same batch item); lists counted runs over 2 h with no slot and no hook activity as "possibly finished" with the exact close command; prints a hook-liveness line and warns when F-31 is applied but no hk- event is seen in 6 h. events.mjs gains `report` / `stopped` subcommands and `--key`, warns when a report closes nothing, writes the run key (tool_use id) on the tx- events it backfills, warns when --since skips a window, and counts --dry right
change-tier: 2
paths: tools/lib/inflight.mjs, tools/dispatch-check.mjs, tools/events.mjs, tests/dispatch/inflight.test.mjs, company/ops/events.md, company/ops/changelog.md, company/engineering/readiness/2026-10-16-inflight-key-match.md
author: tools-lead
board: W-1350 (in-flight drift), W-1280 (H1), W-1195, W-716
risks: proposes none added; proposes a re-score of the event-log-gap risk only after a hooked session shows hk- events (see 7)
links: batch company/ops/dispatch-requests/2026-10-16-r5-tools.md#B2; branch tools-r5-b2; events allow-list company/ops/events.md
status: awaiting principal-engineer-ops
```

**Status: awaiting principal-engineer-ops.** Tier 2 because dispatch-check is dispatch control (the C1/C2 caps read
this count) and events.mjs is the event writer. Not approved; `approved-by:` is for principal-engineer-ops to add.
evaluation-steward checks the matching rule, because in-flight counting is a dispatch rule. B1 (this round) did not
touch company/ops/events.md's allow-list; this change adds no event type. It documents one optional field (`key`)
and two commands.

## (a) Diagnosis: why the 11 runs closed by hand at 2026-10-16T13:08Z had no matching report

Read from a scratch copy of the main checkout's company/ops/events.jsonl (4558 lines at 13:30Z) and a scratch copy
of the chief of staff's session transcript (`~/.claude/projects/-home-user/3e472d64-….jsonl`, 98 MB). Neither real
file was written.

| # | Hand-closed label | Dispatch | Why no report closed it |
|---|---|---|---|
| 1 | `[project:first-light] Backend: beacon allow-list C1/C2 ·9fd2` | tx-92c5242862 10:41 | **backfill gap**: its tx- report (12:35:28, tx-1fd0671e45) is in the transcript, not in the log. Also a hand twin (ev-df4320154d, "backend-engineer: beacon allow-list", same `batch=…round-2.md#B2`); its hand reports used the hand label |
| 2 | `PE-ops: LH content patch r2 readiness ·0bf9` | tx-5b53bd6abf 12:12 | backfill gap (report 12:25:29 in transcript); hand twin ev-988f40a280 under another label |
| 3 | `Quality POC: round-3 batch + SO sizing ·32a6` | tx-93e217b343 12:14 | backfill gap (12:24:29); hand twin ev-5712a81e4c |
| 4 | `[project:behavioral-econ] Research: W-902 item sources ·900d` | tx-9a7f54f669 12:19 | backfill gap (12:28:01); hand report "research-scientist: W-902" under another label |
| 5 | `research-scientist: research r3 B3` | ev-3c71ba40c5 12:19 (hand) | **hand-dispatch twin** of tx-0d9af315d0 ("Research: rome why-east routes ·2827", 12:19:08, same `r3-research.md#B3`), which reported at 12:24:00 under its own label. No report ever named the hand label |
| 6 | `[project:maintenance] Tools r3 B1: guard fixes ·af1d` | tx-171ba1bfc7 12:21 | backfill gap (12:26:28); hand report "tools-lead: guard fixes r3 B1" under another label |
| 7 | `[project:maintenance] Tools r3 B2: F5 fold overflow ·ccdb` | tx-9672424b15 12:21 | backfill gap (12:39:29); hand report "tools-lead: F5 r3 B2" |
| 8 | `[project:scale-stage-1] Platform: A2 addendum P-1/P-2/P-5 ·7066` | tx-9ac678bff0 12:21 | backfill gap (12:24:44); no hand report |
| 9 | `[project:lifehacks-engine-v2] cm-lifehacks: content patch r3 ·16eb` | tx-60c2f0626c 12:21 | backfill gap (12:32:59); hand report "cm-lifehacks: content patch r3" |
| 10 | `[project:maintenance] Tools r3 B4: build-slot guard ·4dfa` | tx-407d69b903 12:22 | backfill gap (12:35:16); hand report "tools-lead: build-slot guard r3 B4" |
| 11 | `principal-engineer-ops: lh-engine-locked approval` | ev-b358774cda 13:03 (hand) | **hand-dispatch twin** of tx-804d90fff8 ("PE-ops: approve lh-engine-locked addendum ·f30f", 13:02:57; reported 13:11:39). No shared key: neither names a batch item |

Counts: **9 of 11 are a backfill window gap** (their own tx- report exists in the transcript and never reached the
log); **2 of 11 are hand-written dispatch twins** of a tx- dispatch. Label mismatch between tx- dispatches and ev- hand
reports is present in 8 of the 9 (all but #8, which had no hand report) (the hand reports could not have closed them under the old rule), but it is the
second cause: with the transcript reports in the log, all 9 close by label. "A report before the dispatch": 0.
No report at all (hand or transcript): 0 of the 11.

**The gap.** The log has no tx- event between 2026-10-16T12:24:00.198Z (line 4456) and 13:00:02.546Z (line 4498).
`events.mjs backfill --dry --types=report,stopped --since=2026-10-16T12:00:00Z` against the scratch copies now
reports 44 new events (before the `--dry` dedupe it printed 88: each report is echoed twice in the transcript, queue
enqueue and remove). Split by time with `selectBackfill` over `transcriptEvents`: **before 13:00:02Z the transcript
holds 32 reports, 31 dispatches and 46 usage events that are not in the log**; after it, 12 reports and 11
dispatches (the transcript copy runs to 13:29, and no backfill has run since about 13:22). The 31 missing dispatches
mean the gap also hid runs from the count, not only their reports: the gap cuts both ways.
Separately, the log has **no `usage` event since 2026-10-15T09:02** (79 from 12:00Z today onward alone are in the transcript).
*Believed, not checked:* backfills since then were run with a `--types` list without `usage`; this matters for the
ledger import (r3 B3, held), not for in-flight. The backfill that ran after 13:00 wrote tx- events from
13:00 on and none before. *Believed, not checked:* that it was run with a `--since` near 13:00 (the transcript does
not record the command line I could find; the shape fits exactly). `backfill` now warns in that case (below).

**The still-open `principal-engineer-ops: clear G5 for F5` (ev-ec9bbe6a25, 12:51:37)** is the same twin shape as #11:
its tx- dispatch `PE-ops: clear G5-a/G5-b for F5 merge ·80b8` (12:51:23) reported at 13:15:42 (tx- in the log); the
hand label never got a report. The chief of staff closed it at 13:21:44 (ev-796bb4864f).

## In-flight count before and after (scratch copies only; `S3_EVENTS`, empty `S3_SPOOL` and `S3_SLOTS_DIR`)

| Log state | As of | Old rule (label map) | New rule (key match) | CoS hand count |
|---|---|---|---|---|
| main log as it was (no reports from the gap) | 13:08:00Z (before the 11 closes) | 16 | 15 (the beacon twin closed by its hand dispatch's batch key) | 7 real |
| same log + `backfill --types=dispatch,report,stopped,usage --since=12:00` | 13:08:00Z | 10 | 10 | 7 real |
| main log at 13:39:55Z (after the hand closes), CLI `dispatch-check --kind=other --no-claim` | now | 11 | 11 | n/a |

With the gap filled, the 10 are the CoS's 7 real runs (`Steward r3 B2 ·4b89`, `PE-ops: clear G5-a/G5-b ·80b8`,
`cm-history r4 B1 ·6dc3`, `PE-ops lh-engine-locked ·f30f`, three SO-10-2 FC runs) plus the 3 hand-dispatch twins
(#5, #11 and `clear G5 for F5`). The new rule does not close those 3 by itself: two share no key with their twin, and
#5 shares only a batch item with a run that reported under its own label, and one report closes one dispatch. They
now appear in "possibly finished" once over 2 h, with the twin's report as evidence (`same batch item as …, which
reported at …`) and the close command. The count is never lowered on that evidence alone (stop rule: counting less
is the unsafe direction).

Commands (scripts in the session scratchpad; the old rule is the 6 lines this change removed from dispatch-check):
`node compare.mjs <log copy> 2026-10-16T13:08:00.000Z`; the CLI row ran `git show HEAD:tools/dispatch-check.mjs`
beside the new one on the same copy.

## What changed

- **tools/lib/inflight.mjs (new).** `replay(events)` replays dispatch/report/stopped in ts order. One report or
  stopped event closes one open run, by the first rule that matches, oldest open run first:
  1. **run key** (`tu:` / `sx:`): the event's `key` field (`events.mjs --key`, or the backfill's tool_use id), the
     hook's `toolUseId`; on the dispatch side also its label's `·xxxx` suffix, so a hand `--key=af1d` works. A report's
     own label suffix is never used as a key (4 hex digits collide between runs); a report inherits only the
     tool-use ids of the latest dispatch with its label.
  2. **label** (the old rule).
  3. **batch item**: `batch=<file>#B<n>` from the dispatch's `source`, else summary, else body (the prompt's first
     ref); for a report its `--key=batch=…`, else its summary's first ref, else the batch key of the latest dispatch
     with its label (before C1 this closed the tx- twin when the hand report used the hand label; after C1 only if that item has one run). `…r3-tools.md` matches
     `2026-10-16-r3-tools.md`; a short form must contain a "-".
  **Deviation from the brief's order**, which put the batch key before the label: an exact label is as specific as a
  key, and a batch item can have two live runs (a twin, a rerun), so label comes second. Net effect on the 13:08 log:
  none (same closes). A second dispatch with an open label is still the same run (SendMessage continuations), as before.
- **tools/dispatch-check.mjs.** Uses `replay` for the log count (the slot ledger, C1/C2, S1-S4 unchanged). New lines:
  `in-flight matching: N closed by run key, N by batch item, N by label`; `hooks: last hk- event <age> ago (…)` or
  `hooks: no hk- event ever: this session tree may not load the repo hooks (W-1280); dispatch/report events are
  hand-written`; a warn when `.claude/settings.json` wires agent-events.mjs (F-31 applied, read only) and no hk-
  event is in the log or spool for 6 h; and `possibly finished: <label> (<age>)` for each counted run over 2 h with no
  live slot (by `--agent` label or batch item) and no later spool event of that run, with the exact
  `node tools/events.mjs stopped --agent="…" --key="…" --actor=chief-of-staff --summary="…"` command, and a lead line
  that says to run a full `backfill` first. Listed runs stay in the count.
- **tools/events.mjs.** `report` and `stopped` subcommands (type, state done/stopped, room from `--actor`; `--agent`
  or `--key` required); `--key` on `add` too, written as `key`. Before a non-spool report/stopped write it says on
  stderr which dispatch it closes and by which rule, or `WARNING: … matches no open dispatch, so it closes nothing`
  with the 3 nearest open dispatches and their `--key`. The event is still written (the warning informs; nothing is
  refused). The hook's `--spool` path is unchanged (it never reads the log). `transcriptEvents` writes `key: <tool_use
  id>` on every tx- event of a run (dispatch, SendMessage, report, usage, stopped); events already in the log are not
  rewritten (append-only; ids unchanged, so nothing is written twice). `backfill --since` warns when it is later
  than the newest tx- event in the log and names the count it skips. `selectBackfill` keeps one event per id.
- **company/ops/events.md**: the `key` field and the two commands. No new type.

## C1 (principal-engineer-ops merge condition, 2026-10-16-inflight-key-match-approval.md ruling 1), done on this branch

PE-ops showed that rule 3 as first built could close a run that is still working: two live runs of one batch item
(X ·1111, Y ·2222), Y finishes and is reported twice (a hand report naming the item, and Y's own tx- report by key);
the hand report closed X by batch and the tx- report closed Y, so `open: []` while X was working. Fix in
tools/lib/inflight.mjs: **rule 3 closes a run only when exactly one run seen so far in the replay, open or already
closed, carries that batch item.** With two or more carriers the report is unmatched (written, and `events.mjs`
warns as before), and it is kept in `replay().held` as evidence; `possiblyFinished` shows it on the item's open runs
(`heldReport`), and dispatch-check prints it on the run's "possibly finished" line ("a report naming this batch item
(…) closed nothing because N runs carry the item"). `match(e)` never returns an ambiguous hit.

Effect on what this record measured: the hand-twin shape no longer closes by batch. Test "a hand twin…" (formerly
"…closes the tx- twin (inherited key)") now asserts the tx- twin stays counted and is listed with the held report.
*Believed, not re-measured:* on the 13:08 log copy the new-rule count in the first table row goes from 15 to 16 (the
beacon twin, #1, has a hand dispatch and a tx- dispatch of one item, so two carriers), the same as the old rule; the
9 backfill-gap runs with exactly one carrier still close by batch (the test's single-carrier assertion). New test
"PE-ops C1: two live runs of one batch item…": PE-ops' fixture in both orders asserts X stays open, only Y closes (by
key), the hand report is unmatched and held, and a third batch-only report would close nothing; plus a closed
carrier still counts (X closed by key, then a rerun Z of the item is not closed by a batch-only report).

## The check

1. **What can fail.** (i) A wrong close by batch key: removed by C1 (above). With two runs of one item a batch-only
   report closes nothing, so the residual failure is the safe direction: a finished twin or rerun stays counted
   until closed by key or label (listed as "possibly finished" with the held report), which can block a dispatch
   that C1 would have allowed. (ii) A wrong close by an explicit `--key=xxxx` that collides
   with another open run's suffix (1 in 65,536 per open run; the run with the same label is preferred). (iii) Worst:
   a bug that closes runs without evidence, so C1 lets a 15th agent start. Mitigation: closes only on a key, a label
   or a batch item; the count on today's log is equal or one lower than the old rule, never lower on a guess; the
   caller's `--running` still wins when larger. Who sees it: agents and the host, never learners.
2. **How we would know.** The `in-flight matching:` line counts closes per rule on every run; a jump in `batch` closes
   is visible. The `possibly finished` list and the `hooks:` line are in every dispatch-check output. Tests:
   tests/dispatch/inflight.test.mjs (12 cases after C1) in `npm run test:dispatch`.
3. **How to roll back.** `git revert <sha>` of this branch's commit; seconds; no data loss (the only new data is an
   optional `key` field on new events, which old readers ignore).
4. **Capacity.** One replay over the merged log per dispatch-check (about 4,500 events: a few ms). `events.mjs report`
   reads the log and spool once more. Backfill: one extra filter when `--since` is given. No new process, file or port.
5. **Security.** None: local CLIs, no network, no new permission. The printed close command shell-quotes the label.
6. **Data.** Writes only what events.mjs already wrote, plus `key` (a tool_use id or a batch ref). No learner data.
7. **Risks.** None added. H1 (W-1280) is still not observable from this session tree: on the scratch copy the line
   reads `hooks: no hk- event ever` and the F-31 warning fires. That line is the meter; re-score the event-log-gap
   risk only after a hooked session shows a recent hk- event in it.

## Done-when evidence

- `npm run test:dispatch`: 98 tests, 97 pass, 0 fail, 1 skipped (the S3_SLOW_TESTS case), 3 min 56 s at load ~6
  (slots.test.mjs dominates: B3's G5-d). New: tests/dispatch/inflight.test.mjs, 11 pass in 5.4 s, with fixtures for a
  tx- dispatch closed by an ev- report with another label and the same `batch=` key; the hand-twin inherited key;
  `--key` by tool-use id and by suffix; a report with no match warns, names the nearest, is written, and the dispatch
  stays open; the > 2 h "possibly finished" listing (still counted); the no-hk- line and the F-31 warning; their
  absence with a fresh hk- event in a tmp spool; backfill writing the key and the `--since` gap warning.
- Every test uses `S3_EVENTS`, `S3_SPOOL` and `S3_SLOTS_DIR` in a tmp dir; one test asserts the real log's size is
  unchanged.

## For the chief of staff (proposed, not a rule change)

- Run `node tools/events.mjs backfill` **without `--since`** each loop (it is idempotent); if you do pass `--since`,
  read its warning.
- Do not hand-write a `dispatch` event for a run the backfill or the hook will write: that is what makes twins. If you
  must, pass `--key=<tool_use id>` or `--key=batch=<file>#B<n>`.
- Close hand reports with `node tools/events.mjs report --agent="<the tx- label>" …` or `--key=<the ·xxxx>`; read the
  stderr line (`closes …` or `WARNING … matches no open dispatch`).

## Open for evaluation-steward (lane 10)

- Should a run that closes also close an open dispatch of the **same batch item dispatched within 60 s of it** (a
  twin like #5)? Built as evidence only (`twinReported`), not as a close, because the brief forbids lowering the count
  without evidence and a rerun of an item looks the same. A ruling either way is a one-line change in inflight.mjs.
- The label-before-batch-key order (deviation above).
