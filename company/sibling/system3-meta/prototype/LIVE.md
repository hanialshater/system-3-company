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
