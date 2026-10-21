# Meta prototype: live run 1 with real agents (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Decide for me" (on: calibrate first, or a live run first). Chosen: the live run. Calibration needs real data, and EXP-009's fixes have not landed. A live run produces that data, and it tests what the simulation cannot: whether real agents can use the tools.

## Setup

- **Tools:** the prototype (lib.mjs) behind a CLI, `meta.mjs`. State is kept in `live/state.json` under a lock file, so separate agent sessions share it. This also tests S12, state that survives between processes.
- **Org:**
  - roles: founder; chief-of-staff and manager and release (played by this session); `toy-builder-1`, `toy-builder-2` and `toy-checker` (real agents, each a fresh subagent).
  - flow `task`: build → test1 (code: runs the builder's tests) → check → uat (the orderer runs hidden acceptance tests) → ship.
  - No deploy, so no founder release stage.
- **Work:** two small JavaScript modules with tests, in `live/work/` only: T1 `roman.mjs` and T2 `wrap.mjs`. The hidden acceptance tests stay outside the repository until UAT.
- **Injected faults, in the first pilot's terms:**
  - F1 duplicate notification: the T1 work message is sent twice.
  - F2 interrupt: the first T2 builder is told to enter and stop without leaving. A 3-minute lease, then `room recover`, then a second builder.
  - F3 boundary: a builder signs test1 by hand, and a builder takes the check of its own task.
  - F4 idle: no process polls between runs.
- **Usage:** recorded from the harness's token count for each agent run (`room usage`), not from the agent.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| L1 | Each agent completes enter → leave from the brief and the context pack alone, with ≤ 1 failed tool call | any agent needs > 3 failed calls, or cannot finish |
| L2 | Agents cannot report their own token use; harness usage recorded per run gives 100% coverage of agent runs | any agent run has no usage record |
| L3 | F1 deduped (one work message); F2 recovered at the first sweep after lease expiry, and the second builder finishes; F3 both refused; F4: nothing runs between agent runs | any of these behaves otherwise |
| L4 | Builder runs ≤ 80k tokens, checker runs ≤ 60k | builder > 150k or checker > 120k |
| L5 | At least one of the two tasks goes round a revise loop (test1, check or UAT) | both pass every stage first time *and* UAT finds nothing |
| L6 | State survives every separate process: no lost or corrupted state across all CLI calls | any CLI call fails on state, or the lock deadlocks |

## Result (2026-10-21)

**Outcome:** both orders shipped. T1 (Roman numerals) passed every stage first time. T2 (word wrap) went build → crash → recovered → build → test1 → **check: revise** → build (loop 1) → test1 → check pass → UAT → ship.

**Runs:** 10 runs, 92 events, state in `live/state.json`.
- 7 agent runs (fresh subagents): R-1 (crash, injected), R-2, R-4, R-6, R-7, R-8, R-9.
- 3 supervisor runs by this session: R-3 abandoned, R-5 and R-10 ship.

**Usage:** recorded from the harness for all 7 agent runs, 413,587 tokens in total.

| Run | Role | Stage | Tokens (harness) |
|---|---|---|---|
| R-1 | toy-builder-2 | build (crash, injected) | 54,502 |
| R-2 | toy-builder-1 | build T1 | 57,374 |
| R-4 | toy-checker | check T1, pass | 59,487 |
| R-6 | toy-builder-2 | build T2 | 57,069 |
| R-7 | toy-checker | check T2, revise | 60,361 |
| R-8 | toy-builder-2 | revise T2 | 61,240 |
| R-9 | toy-checker | re-check T2, pass | 63,554 |

| # | Prediction | Result | Verdict |
|---|---|---|---|
| L1 | ≤ 1 failed tool call per agent, from the brief and pack alone | 0 failed CLI calls in all 7 agent runs. Two agents hit their own shell or regex mistakes, not tool errors. Every agent said the pack was enough. Gaps named: no error type in T1's `accept`, no format for `--learned`, no definition of "blank line" in T2 | right |
| L2 | agents can't report tokens; harness usage covers 100% of agent runs | every agent said it could only estimate. Their estimates ranged from about 5k ("the task part") to about 55k against harness counts of 57-64k. Usage coverage 7/7 | right |
| L3 | F1 deduped; F2 recovered at the first sweep after lease expiry and finished; F3 refused; F4 nothing runs between runs | F1: 1 work message, `dedupe` event. F2: lease expired 06:36:00, recovered 06:36:14, a fresh builder finished. F3: test1 by hand refused, a builder taking its own check refused. F4: no model calls between runs, **but the recovery sweep was a code loop polling every 20 s**, not a wake on expiry | ¾ right; F4 half |
| L4 | builder ≤ 80k, checker ≤ 60k | builder 54-61k; checker 59-64k (two runs over 60k) | builder right; checker missed (not wrong: bound 120k) |
| L5 | at least one revise loop | T2: the checker found real defects (astral characters split in half, non-ASCII blank lines, no non-ASCII tests). **My hidden UAT tests had no Unicode cases and would have passed the defective version** | right |
| L6 | no lost or corrupted state across all CLI calls | no corruption and no deadlock, including parallel calls. **But every refusal was lost:** a refused command did not save, so the log showed 0 refusals against at least 4 made | **wrong** |

**Tool defects the live run found, all fixed:**
1. **`--as` worked outside consult mode.** Any role could take a check by naming another role. Now it is refused, with a regression test. The bad run was released with the new `room abandon`.
2. **Refusals were not persisted** (L6). The CLI now saves on refusal, and a HARD refusal gets its own `refuse` event. Checked: 3 of 3 refusals logged.
3. **No supervisor command to end a bad run without signing:** added `room abandon`.

**What it shows:**
- **About 50k of every 55-64k-token agent run is fixed start-up cost** (system prompt and tool definitions). Agents put the task itself at about 5k. Run count, not run size, drives the cost. The cheapest mechanism is fewer runs: batch tasks per run, or a lighter agent type for narrow roles. The simulation charged per stage size and missed this.
- **The independent checker earned its cost.** It caught defects that both the builder's tests and the orderer's hidden acceptance tests missed.
- **Memory written automatically at leave was useful by the next run.** The checker's T1 note ("node --test needs a file path") and its T2 note ("add astral characters and non-ASCII whitespace") were in its context pack and used, without any agent writing memory by hand.
- **The supervisor's own cost is not measured:** this session's tokens for orders, test1, UAT and ship are in no usage record. That is the same blind spot as the real chief of staff.
- **A precise `accept` is what made runs predictable.** Every gap an agent named was an under-specified criterion.

**Calibration for the simulator (replaces [a] values):**
- tokens per run ≈ 50k fixed + task size;
- agent runs per item = 2 at loop 0 (build, check), plus 2 per revise loop; test1, UAT and ship are supervisor or code steps;
- crash recovery = lease plus the sweep interval.

**Next:**
1. Replace the recovery sweep with a wake on lease expiry (F4).
2. Measure the supervisor's own usage.
3. Iteration 4 in the simulator with fixed per-run cost: batching vs one task per run.
