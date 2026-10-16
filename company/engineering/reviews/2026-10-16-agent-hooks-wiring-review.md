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

## Addendum 2026-10-16: E1, N1 and the H2 spool (W-1260)

Reviewed: branch tools-e1n1 in /home/user/s3c-tools4 (3d4a34d N1, 6ad43ee E1 + spool), against 8d3fbff. I read it only, and all probes ran on a `git archive tools-e1n1` copy in my scratchpad against copied logs. The real events.jsonl was untouched (`cmp` equal after the probes).
Tests: `node --test tests/dispatch/guards.test.mjs tests/dispatch/agent-events.test.mjs` → **35 pass, 0 fail**. Host load average was 2.5.

### 1. N1: confirmed. The 3d4a34d diff to no-pkill.mjs and guards.test.mjs is N1 and its tests.
- Heredoc bodies are now data. Both of my reproduced false refusals pass, and both are tested through the hook process (exit 0). The must-refuse `cat <<EOF | sh` is refused and tested, and so are `bash <<'X'`, `cat <<'EOF' | bash -s` and `sh <<-EOF`. Fail-open is kept.
- Beyond the letter of N1, it adds two things that follow from it, and I accept both. Command substitutions in an unquoted-delimiter body are still checked, because the shell runs them. A body read by a shell is checked as commands, because otherwise N1 would open the hole I asked to be refused.
- **The author's judgement call** was to move the `kill $(pgrep …)` check from a regex on the whole command to the kill command's own tokens. **I accept it.** The old regex had to go, because it matched inside heredoc bodies and so was itself an N1 false refusal. I ran 37 inputs through both the 8d3fbff and the tools-e1n1 `verdict()`:
  - No regression on kill: plain, backticks, double-quoted, `sudo`/`env`/`timeout`/`nohup` wrappers, `$( pgrep`, `pidof`, `bash -c '…'`, `| head -1` inside, and after `;`. Every one is refused by both versions.
  - One gain: `kill $(/usr/bin/pgrep x)` is now refused (old: passed).
  - Still passes in both versions, which is correct: `kill $(cat .serve/3000.pid)`, `kill -- -12345`, and `grep`/`git commit -m` that only mention it.
  - Misses in both, accepted as before: `for p in $(pgrep x); do kill $p; done` and `P=$(pgrep x); kill $P` (the pid travels through a variable).
- Heredoc edges checked: a command after the operator on the same line (`cat <<EOF; pkill x` and `&& pkill x`) is refused. A `)` inside a `$(cat <<'EOF' …)` body does not close the substitution early. An unterminated heredoc fails safe as data. `$((1<<2))` and `<<<` are not read as heredocs.
- **One new miss, accepted as a miss (this is the written decision N1 allowed):** `cat <<EOF | tee f | sh`. The heredoc feeds a shell through more than one pipe stage, and the code follows only one hop (`pipedFrom`). The old code refused this, but only by accident of the newline split. It is exotic, and it is in the same class as `eval` and scripts. `cat <<EOF | sh script.sh` now passes, which is correct, because the body is the script's stdin and not commands.
- Cost: 64 ms average per Bash call over 10 runs (132 ms at 8d3fbff, measured at higher load).
- By my own rule, no second review is needed. no-pkill is **approved for wiring**. PE-ops' readiness approval is now on record (90fc0de, `…commit-and-process-guards-approval.md`, wiring conditions W1 to W3), so finding 4 is closed.

### 2. E1: confirmed. It meets the condition, adapted to the spool.
- `readJsonlFile`/`parseJsonl` (tools/lib/events-spool.mjs) skip and count bad lines. `readLog` and `append` use them, and the count goes to stderr (`events: N unreadable line(s) skipped in …`). The hook now uses `spawnSync` and logs that stderr to the hook log.
- The conflict-marker tests (agent-events.test.mjs):
  - (a) `add` on a log holding `<<<<<<< Updated upstream` still appends, leaves the bad line in place, and dedupe still works past it.
  - (b) A spool holding that line still gets the hook's `hk-` event, the hook log shows "1 unreadable line(s) skipped", and the log file is never created.
- My condition said "a log holding a `<<<<<<<` line still gets the hook's event". Under H2 the hook no longer reads or writes the log, so (b) on the spool plus (a) on the log is the right translation. The failure I named (a conflicted log silently stopping hook writes) can no longer happen through the hook at all.
- Readers now warn and no longer stay silent. dispatch-check prints `event log has N unreadable line(s) … in-flight may be undercounted; pass --running`, and metrics prints an "Event log health" row (PE-ops H4). Both are tested.

### 3. Does the spool change my wiring verdict? No. It removes risks and adds two small ones.
Removed:
- **The autostash race (H2) is gone.** The hook writes only `company/ops/events-spool/<date>.jsonl`. That path is gitignored, and `rebase --autostash` does not stash ignored files, so the hook no longer dirties a tracked file. One spool per repository is resolved through the git common dir (tested with a real linked worktree), which closes the ruling's open objection.
- **E2 is off the hook's path.** The hook reads only the spool, and no longer the log. Measured on a 4.59 MB log copy: **177 ms average** per hook run over 10 runs (it was 307 ms). It no longer grows with events.jsonl. **Restating E2:** the 20 MB re-measure trigger now applies to the unfolded spool, which grows only if folds are skipped. `add` without `--spool` and `fold` still read the whole log, but neither is on any tool call's path.
- dispatch-check and metrics (via `dispatch-age.readEvents`) read log + spool, deduped by id, so the C1 cap does not wait on a fold. Tested.

New, not gating:
- **S1 (finding):** the fold can lose an event in a narrow race. `fold` renames a spool file and then deletes it after reading it. A hook `appendFileSync` that opened the file before the rename and writes after the read lands in a file that is then removed. The window is the length of one append. I believe it is rare, and I have not reproduced it. Fix if it is ever seen: re-read each `.folding-*` file just before `rm`, or have the hook write one file per process. Owner: tools-lead, low priority.
- **S2 (finding):** other readers read events.jsonl only. They lag the fold, and two of them still throw on a bad line:
  - `tools/ops-health.mjs:13` and `tools/rituals-due.mjs:13` call `JSON.parse` on every line with no skip, so a conflicted log crashes them. This predates E1, which was about the writer.
  - `rituals-due` may show a ritual as overdue until its dispatch is folded.
  - `tools/lib/ledger.mjs` and `src/lib/hq.ts` read the log only. Their numbers are record-keeping, so lag is acceptable there.
  - Owner: tools-lead, tier 1. Put ops-health and rituals-due on `readJsonlFile`.
- `.claude/hooks/agent-events.mjs` changed after PE-ops' approval at 864dab5: it now uses `--spool` and `spawnSync`, and logs stderr. I reviewed the change here. It still exits 0 on every path, including when `add` fails (tested by runHook). Whether her H1 to H6 approval carries over is **PE-ops' call, not mine**. Her H1 (live payload names on wiring day) is still open in any case.

### Decision (addendum)
- **agent-events.mjs: approved for wiring.** E1 is met, H2 is ruled and built, and E2 is restated onto the spool. This is subject to PE-ops confirming that her approval covers the spool change, and to H1 on wiring day.
- **no-pkill.mjs: approved for wiring.** N1 is met, with one miss accepted in writing (multi-hop heredoc to shell). PE-ops' W1 to W3 apply.
- F-31 can cite this record once tools-e1n1 is merged. The chief of staff then owns `node tools/events.mjs fold` before each events commit.
- S1 and S2 do not gate wiring.

Objections that travel with it:
- *Mine: is accepting the `tee | sh` miss lax?* No. The guard is meant to stop accidents, and it is not a sandbox. Nobody types that pipeline by accident, and chasing every hop would rebuild a shell parser. That is the astronautics I am supposed to prevent.
- *Mine: does the spool add a ritual (the fold) that will be skipped?* It might. The cost of skipping it is a log that lags, not a missed cap, because the in-flight readers read the spool. `company status` should show unfolded spool lines, as the ruling says, but status lives in tools/company.mjs (protected) and the branch does not change it. metrics and dispatch-check show it today.

## Addendum 2026-10-16: M1 and M2 on the live guards (r3 B1, W-1266, W-529)

Reviewed: branch tools-guardfix, commit f0651da in /home/user/s3c-tg1, against its branch point dc2aca4. Files: tools/git-hooks/pre-commit, tools/commit-own.sh, .claude/hooks/no-pkill.mjs, tests/dispatch/guards.test.mjs. I only read the branch. Every probe ran on `git archive` copies of f0651da and dc2aca4 in my scratchpad. G5 (e692f83, package.json) is not part of this check. It belongs to PE-ops.
Tests: `node --test tests/dispatch/guards.test.mjs` on the f0651da copy gave **24 pass, 0 fail** (19 s wall, load average 16).

**Tier.** tools-lead filed this as tier 2, not the tier 1 the batch asked for. **I agree.** In readiness/paths.json the rule `.claude/hooks/**` is tier 2 ("hooks every agent runs"), and the approval's revoke clause sends any edit to a live guard back to PE-ops. This addendum is the engineering review. The readiness approval is PE-ops'.

### 1. M1: confirmed
- pre-commit `refuse()` now takes `merging`. During a merge the hint names only `tools/commit-own.sh` and "wait for the owner of the listed paths". It no longer offers `git commit -m … -- <path>`, which git refuses mid-merge. Outside a merge the text is unchanged.
- Only rules 2 and 3 can fire during a merge. Rule 4 is gated on `!merging`, and the `merging` flag reaches the only refusal that can run.
- The merge refusal in commit-own.sh gains the owner-wait line, and its merge branch never prints the `git commit -m` alternative.
- Both directions are tested against a real conflicted merge: the merge hint, and the unchanged non-merge hint.
- No exit code and no rule changed. This is wording only.

### 2. M2: confirmed. This is the W-529 answer: refuse, and name `tools/serve.sh stop <port>`
- Refused, with `PORT_HINT`:
  - `kill [-sig]` fed by `$(lsof|fuser …)` or backticks. This uses the same token test as the pgrep check that I accepted in the N1 addendum.
  - `fuser` with `k` in any short-flag cluster, or with `--kill`.
  - `lsof|fuser|ss|netstat … | xargs kill`. This was already refused as a pattern kill. Only the message changed.
- I ran 17 must-refuse forms through the new `verdict()`, and **all 17 were refused**. Every hint named serve.sh stop. The forms beyond the tests:
  - `kill -s KILL $(lsof …)`
  - `/usr/bin/lsof`
  - `sudo` and `timeout` wrappers
  - `bash -c '…'`
  - `kill "$(lsof …)"`
  - `$( lsof … )` with spaces
  - backticks after `;`
  - `xargs -I{} kill {}`
  - `fuser -ki`
  - `fuser -k -n tcp`
  - `cat <<EOF | sh` with a `fuser -k` body
- Allowed forms, **all 25 pass**:
  - `kill 1234`, `kill -0`, `kill -TERM a b`, `kill $(cat .serve/<port>.pid)`
  - `lsof -i:<port>`, `lsof -t -i:<port>`, `lsof … | head -1`, `lsof -p`
  - `fuser <port>/tcp`, `fuser -v`, `fuser -n tcp`, and `fuser -SIGTERM` without `-k`, which kills nothing
  - `ss -ltnp | grep`
  - `tools/serve.sh stop 3591`
  - `PID=$(lsof …); echo $PID`
- Misses, accepted in the same class as the N1 addendum (the pid travels through a variable, a loop or a program):
  - `P=$(lsof -t -i:3000); kill $P`
  - `for p in $(lsof …); do kill $p; done`
  - `lsof … | while read p; do kill $p; done`
  - `npx kill-port 3000`
  - `ss -K dport = :3000`
  - The record names the first two and kill-port, but not `ss -K` or the `while read` loop. I accept these too. A guard against accidents is not a sandbox.
- `lsof … | sort | xargs kill` is still refused, but as a pattern kill, because the source check follows only one pipe hop. The hint still names serve.sh stop. This is a fine outcome.

### 3. False-refusal risk on ordinary commands: no new false refusals found
- **Corpus diff.** I ran every backtick code span in the repo's markdown and .claude/commands (12,375 unique strings, mostly prose, which over-tests) through the old (dc2aca4) and new (f0651da) `verdict()`. **7 verdicts changed, all of them toward refusal, and all 7 are intended port-kill forms** (`fuser -k <port>/tcp`, `kill $(lsof -t -i:<port>)`, `kill -9 $(lsof …)` and the like). No string went from refused to passed. Nothing threw.
- **Heredocs and quoted mentions:**
  - These pass:
    - A `cat <<'EOF' > notes.md` body that holds all three port-kill forms.
    - An unquoted-delimiter body that mentions `fuser -k`.
    - `git commit -m "… kill $(lsof …) … fuser -k …"`, in both single and double quotes.
    - `echo fuser -k`, `rg 'fuser -k'`, `git log --grep="fuser -k"`, and `node -e "…kill $(lsof…)…"`.
    - `echo "$(lsof -t -i:3591)"`. A substitution inside double quotes is a lookup, not a kill.
  - The N1 heredoc handling carries the new checks unchanged. They sit in `checkSimple`, after tokenising, so they inherit the rule that heredoc bodies are data.
- **One theoretical false refusal:** `kill -0 $(lsof -t -i:<port>)`, a liveness probe. It is refused, but nobody needs it, because `lsof -t` already answers the question. Not a finding.
- **Cost.** I timed 30 hook runs per version, interleaved, at load average 16: old 149 ms, new 128 ms. That is noise. I see no measurable change.

### Decision (addendum)
- **M1 and M2 pass the code check, with no findings that gate.** f0651da may merge once PE-ops gives readiness approval under the revoke clause (tier 2).
- The answer for W-529 is on record: port kills are refused and pointed at `tools/serve.sh stop <port>`. Lookups pass.
- Not gating: the record's accepted-miss list could add `ss -K` and `… | while read p; do kill $p; done`. Owner: tools-lead, at the next edit of that record. No new item is needed.

Objection that travels with it:
- *Mine: should `kill -0 $(lsof …)` be carved out?* No. It would be a special case for a probe that has a better form, and every carve-out is a parser branch someone has to keep.
