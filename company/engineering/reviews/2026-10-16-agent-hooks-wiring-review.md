# Engineering Review: 2026-10-16: two agent hooks before wiring (agent-events.mjs, no-pkill.mjs)

owner: principal-engineer · tier: 2 (`.claude/hooks/**` in company/engineering/readiness/paths.json; wiring is `.claude/settings*.json`, also tier 2) · board: W-1195, W-1200, W-529, W-1253 · founder ask: F-31 (wiring)
batch: company/ops/dispatch-requests/2026-10-16-r2-engineering.md#B5 · attendees: none live. I worked from the authors' records, and I did not edit or ask the authors.

Reviewed code:
- `.claude/hooks/agent-events.mjs`: on main since merge 39f22c3. It is byte-identical to tools-guards 8d3fbff, and it has no diff since 864dab5, the commit PE-ops approved. `tools/events.mjs` is also unchanged since 864dab5.
- `.claude/hooks/no-pkill.mjs` and `tests/dispatch/guards.test.mjs`: branch tools-guards at 8d3fbff (/home/user/s3c-tools3, commits ba0af0d and 8d3fbff), not merged.
- Readiness records: company/engineering/readiness/2026-10-16-agent-events-hook.md, with its approval in 2026-10-16-agent-events-hook-approval.md (PE-ops, H1 to H6). On tools-guards there is also 2026-10-16-commit-and-process-guards.md, whose Approval section is **still blank**.

Precondition (the stop-if): **neither hook is wired.** On main, `.claude/settings.json` has one PreToolUse entry, protect-constitution.mjs. On tools-guards, settings.json names neither hook (grep finds no `agent-events` or `no-pkill`). So nothing unreviewed is live.

All probes below ran on a `git archive 8d3fbff` copy in my scratchpad, against temp event logs. I wrote nothing to the real events.jsonl or to either worktree.

## Checklist

- [x] The problem is real. agent-events: the log had a dark period from 2026-10-14 14:55 (W-716 root cause, in the hook's record). no-pkill: pattern kills recorded in the 10-13 and 10-16 retros (H5), and the bare `git stash` in B2's run.
- [x] Options considered. agent-events: backfill ritual vs hook. no-pkill: Bash hook vs git hook. Git has no stash hook, so the stash rules have to live in the Bash hook.
- [x] Blast radius. agent-events: only Agent/Task calls and subagent stops, so the dispatcher's session (today the chief of staff's). no-pkill: **every Bash call of every agent**. Neither touches a lesson, a page or a learner.
- [ ] Readiness approved by PE-ops. agent-events: yes, H1 to H6. no-pkill: **no**, the guards record's approval is blank. That is still needed before wiring, and this review does not replace it.
- [x] Rollback. Remove the entry from settings.json (the founder path), or revert the commit. A reverted script leaves an entry that calls a missing file. Node then exits 1, which is a non-blocking hook error (believed from the hooks contract, not observed).
- [n/a] `npm run verify`: these are records and hooks, with no build surface. What I ran instead: `node --test tests/dispatch/guards.test.mjs tests/dispatch/agent-events.test.mjs` on 8d3fbff → **25 pass, 0 fail**.
- [x] Measurements. Taken by me today, listed below, at host load average 4.4.
- [x] Security: no network, no routes, no new dependency. The agent-events batch-file read is confined to the repo. A traversal `batch=../../../../etc/passwd` gives `chooser=unknown` and reads nothing.

## The four questions the batch asked

### 1. Can either hook block or slow every agent's tool call?

**agent-events.mjs: it cannot block, and it slows only Agent calls.**
- It never exits non-zero. All paths exit 0, including the `uncaughtException` path, and it writes nothing to stdout, so Claude Code never reads a decision from it.
- Its matchers are `Agent|Task` and SubagentStop, so ordinary Read, Bash and Edit calls do not run it.
- Cost per Agent call, Pre plus Post, about 0.6 s per dispatch in total:

| Log size | Cost per hook run |
|---|---|
| 4.58 MB, main's log today | **307 ms** average over 10 runs |
| 14 MB copy | 412 ms |
| 27 MB copy | 650 ms |

- The cost grows with the log, because `events.mjs add` reads and parses the whole file to dedupe ids. The log grew from 0.75 MB to 4.58 MB between 10-13 and 10-16. PE-ops' revoke line (median above 1 s) comes at roughly 40 to 50 MB. That is an extrapolation, not a measurement. See condition E2.
- The worst-case stall is the `execFileSync` timeout of 10 s, inside the 15 s hook timeout. Nothing in events.mjs waits on a lock, so I found no path that reaches the timeout.

**no-pkill.mjs: it blocks by design (exit 2), and it slows every Bash call.**
- Cost: **132 ms average** per Bash call over 10 runs. The existing constitution hook costs 101 ms on the same host. I believe Claude Code runs the two Bash hooks in parallel, so the added wall time is closer to the larger of the two than to their sum. I did not measure that.
- A 216 KB command parses in 123 ms, so a large command does not make it slower.
- **False refusal, reproduced:**

| Input | Result |
|---|---|
| A heredoc whose body has a line starting with `pkill` (`cat > notes.md <<'EOF' … pkill -f is refused … EOF`) | refused, exit 2 |
| A commit message built with `"$(cat <<'EOF' … git stash pop is now refused … EOF)"` | refused, exit 2 |

- Cause: the splitter treats every newline as a command boundary and does not know heredocs, so the body lines are read as commands.
- This company writes many records and commit messages about exactly these commands. I expect it to be hit within days of wiring, and the refusal message ("pkill kills by name…") would confuse an agent that is only writing a document. See condition N1.
- These pass correctly: `git commit -m "add pkill -f hook"`, `echo "git stash"`, `grep -n 'kill $(pgrep x)' file`, `git stash list`, `git -C /x stash push -u -m "tag"`, `git stash apply <sha>`, `kill $(cat .serve/3000.pid)`, `kill -- -12345`.
- Known misses (it is a guard, not a sandbox, and the author's record says so): `eval "pkill x"`, `python3 -c "…os.system('pkill x')"`, and scripts that call pkill. I accept these.

### 2. What does each hook do on malformed stdin?

Both fail open (exit 0), and the tool call goes ahead.

| Input | agent-events | no-pkill |
|---|---|---|
| Garbage (`not json`) | exit 0, logged to the hook log | exit 0 (3 runs) |
| Empty stdin | exit 0 | exit 0 |
| No `command` (`{"tool_name":"Bash","tool_input":{}}`) | n/a | exit 0 |
| `tool_input: null` on PostToolUse | exit 0 | n/a |
| SubagentStop with `agent_id: null` | exit 0 | n/a |

For no-pkill, failing open is the right choice: a guard that refuses on bad input would stop every Bash call of every agent.

### 3. What happens when events.jsonl is "locked"?

- **An advisory lock does not stop the write.** With `flock -x` held on a copy of the log, the hook wrote its event in 504 ms and exited 0. Linux has no mandatory locks, and events.mjs takes none, so a lock can neither stall nor drop a write. Concurrent appends: PE-ops' 30-writer test passed, and I did not repeat it.
- A read-only file is not a useful test here because the host runs as root (uid 0), so I did not count it.
- **The real "locked" case is a log that does not parse, and that failure is silent.** I appended one line, `<<<<<<< Updated upstream`, to a copy of the log, as a conflicted merge or a failed autostash would leave it. Then:
  - The hook exits 0, writes **no event**, and logs a JSON.parse stack to `.serve/agent-events.log`.
  - Every later dispatch and report is dropped the same way until someone removes the line, because `events.mjs` `readLog()` parses every line and throws on the first bad one.
  - The readers do the opposite. `tools/dispatch-check.mjs:52` and `tools/lib/dispatch-age.mjs:16` skip bad lines silently.
  - So while the log is corrupt, dispatch-check sees no new dispatches and **undercounts in-flight agents**: the C1 cap is quietly not enforced. metrics turns STALE only after 6 h.
  - This is the reverse of H3 (an overcount that refuses), and nothing watches for it.
  - It is made more likely by the hook itself. The hook keeps events.jsonl dirty in the main checkout between the chief of staff's commits. Agents that work there rebase with `--autostash` (item rules). A SubagentStop write that lands inside an autostash window gives an apply conflict on events.jsonl. *Believed, not reproduced:* the race depends on timing.

### 4. Decision per hook

**agent-events.mjs: approve for wiring, with conditions.** The code is the one PE-ops approved (no diff since 864dab5). It cannot block a tool call. Its cost is measured and bounded. E1 must hold before F-31 is applied. E2 does not gate.

**no-pkill.mjs: approve with changes.** One change before wiring: N1. If the only diff after 8d3fbff is N1 and its tests, it is approved for wiring without another review by me. PE-ops' readiness approval of the guards record is still a separate precondition. The rest of the design I accept as written: command-position parsing, wrappers and `bash -c` recursion, the stash rules for every checkout, and fail-open on internal error.

## Conditions

| Id | Owner | Gates wiring? | What |
|---|---|---|---|
| **E1** | tools-lead (tier 1: `tools/events.mjs`) | **yes** | `add` (and `append`/`readLog` for the dedupe set) must skip unparseable lines instead of throwing, and still append the new event. Count the skipped lines and print the count to stderr, which the hook log then captures. Add a test to tests/dispatch/agent-events.test.mjs: a log holding a `<<<<<<<` line still gets the hook's `hk-` event. This puts the writer on the readers' rule, and PE-ops' H4 then makes the corruption visible in metrics. |
| **E2** | principal-engineer-ops (scale budget, under her revoke line) | no | When events.jsonl passes **20 MB**, re-measure the hook on a copy (`for i in 1..10` PreToolUse probes, as above). If the median is above 1 s, tools-lead indexes ids or rotates the log. Today 4.58 MB costs 307 ms. |
| **N1** | tools-lead (tier 2: `.claude/hooks/no-pkill.mjs`) | **yes** | Skip heredoc bodies in `simpleCommands`: after `<<WORD`, `<<'WORD'`, `<<"WORD"` or `<<-WORD`, treat lines up to the terminator as data. Add the two inputs reproduced above to guards.test.mjs as must-pass, and `cat <<EOF | sh` with a `pkill` body as must-refuse, or a written decision that this case is accepted as a miss. Keep fail-open. |
| H2 | chief of staff | yes (PE-ops' H2, unchanged) | When ruling H2 (one writer for events.jsonl), also rule how hook writes coexist with `--autostash` rebases in the main checkout. Options: commit events.jsonl before any rebase, or point `S3_EVENTS` at an untracked spool that the chief of staff folds in at commit. This review does not choose between them. |

Also: neither CI nor `npm run verify` runs `test:dispatch`, which both records say. The author's proposal to add it to `verify` is a package.json change (tier 2). I support it, and it is not a wiring condition.

## Findings (problems, not fixes)

1. A single unparseable line in events.jsonl silently stops every hook write. The readers skip such lines, so dispatch-check undercounts (E1).
2. no-pkill refuses legitimate heredoc commands whose body lines begin with a guarded command (N1).
3. The hook's cost grows linearly with the log: 307 ms at 4.58 MB, 650 ms at 27 MB (E2).
4. The no-pkill readiness record is not approved by PE-ops yet, so wiring it needs that as well as N1.

## Decision

- **agent-events.mjs: approve for wiring with conditions (E1 before wiring, E2 standing), plus PE-ops' H1 to H6.**
- **no-pkill.mjs: approve with changes (N1 before wiring), plus PE-ops' readiness approval of company/engineering/readiness/2026-10-16-commit-and-process-guards.md.**
- The founder's F-31 can cite this record once E1 and N1 are on disk and the chief of staff has ruled H2. One settings.json change then wires both hooks: the union snippet in the guards record.

Objections that travel with it:
- *Mine, against my own decision: is E1 ceremony?* No. It is a one-function change. Without it, the failure the hook makes more likely (a conflicted events.jsonl) turns into a silent outage of the dispatch cap. That is a critical change slipping through, not trivia.
- *Mine: is N1 worth holding a guard for?* Yes, briefly. A guard that refuses ordinary record-writing gets unwired within a week, and then it protects nothing. The fix is small, and if only N1 changes, there is no second review.
- No other objections are on record for this change.

## Believed, not checked

- Claude Code runs matching hooks in parallel, so two Bash hooks add max(), not sum(), to each call.
- A missing hook script is a non-blocking error (exit 1).
- The live payload field names for agent-events. PE-ops' H1 is the test.
- The autostash race on events.jsonl. I reasoned it through and did not reproduce it.

## Kudos (optional)
- @tools-lead: both readiness records name their own misses (exotic forms, payload names unseen, O_APPEND limits) instead of hiding them. That made this review a check, not a hunt.
- @principal-engineer-ops: the agent-events approval's probe table (fail-open, concurrency, traversal) meant I did not need to re-run those checks and could look at the corruption path instead.
