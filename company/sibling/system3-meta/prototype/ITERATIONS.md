# Meta prototype: iterations

Each iteration: what changed, its predictions (committed before its run), the result, and the next change. Predictions for iteration 1 are in PREDICTIONS.md. Reproduce any table with `node run.mjs --seeds=20` (add `--waits` for the stage waits); results are deterministic per seed.

## Iteration 0: building the tools (2026-10-20)

The simulator exercised the tools before any measurement, and found two bugs that the hand-written tests had missed:
1. `mayAssign` looked up the signer `code` as a role and refused every test1 signature. The S1 test caught it.
2. `room enter` took the run's stage from the order's current state instead of from the message. A late duplicate message for a finished order produced a run at stage `done`, whose leave crashed the engine. The fix: a work message carries its stage and loop, and a run works on those. Regression test: "a late duplicate of a finished stage is a stale run".

Tool tests: 12/12 (`node --test tests/*.test.mjs`).

## Iteration 1: current design vs engine (20 seeds, 14 simulated days, 168 orders)

| arm | shipped | k tok/item | lead p50 h | lead p90 h | founder/item | escaped/item | rework/item | measure error | dup runs | violations | unrecovered | recovery min |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| current | 164 | 767 | 10.0 | 23.9 | 1.08 | 0.075 | 0.60 | −50% | 41.5 | 15.6 | 0.4 | 236 |
| engine | 168 | 471 | 5.1 | 9.3 | 0.16 | 0.061 | 0.60 | −3% | 0 | 0 | 0 | 26 |
| engine − enforce | 168 | 471 | 5.1 | 9.1 | 0.16 | 0.058 | 0.59 | −3% | 0 | 12.2 | 0 | 26 |
| engine − autoBookkeeping | 168 | 566 | 5.1 | 9.3 | 0.16 | 0.057 | 0.59 | −51% | 0 | 0 | 0 | 26 |
| engine − supervisor | 167 | 615 | 10.5 | 19.3 | 0.15 | 0.053 | 0.61 | −10% | 0 | 0 | 0 | 25 |
| engine − asyncApprovals | 167 | 472 | 5.2 | 10.8 | 1.05 | 0.062 | 0.55 | −4% | 0 | 0 | 0 | 26 |
| engine − leases | 167 | 472 | 5.1 | 9.8 | 0.20 | 0.055 | 0.58 | −3% | 0 | 0 | 0.1 | 237 |
| engine − dedupe | 168 | 490 | 5.1 | 9.3 | 0.17 | 0.055 | 0.58 | −3% | 42.0 | 0 | 0 | 26 |
| engine + WBR staffing | 168 | 475 | 5.1 | 9.1 | 0.16 | 0.055 | 0.60 | −3% | 0 | 0 | 0 | 26 |

Mean hours waiting per stage before work starts (`--waits`):

| arm | build | check | uat | approval | ship |
|---|---|---|---|---|---|
| current | 1.30 | 1.62 | 1.23 | 5.43 | 0.64 |
| engine | 0.41 | 0.64 | 0.00 | 2.36 | 0.64 |
| engine − supervisor | 1.36 | 1.54 | 1.19 | 3.75 | 1.03 |
| engine − asyncApprovals | 0.42 | 0.64 | 0.00 | 3.69 | 0.03 |

**Against the predictions:**

| # | Prediction | Result | Verdict |
|---|---|---|---|
| P1 | tokens/item ≤ 75% of current | 61% | right |
| P2 | lead p50 ≤ 60% of current | 51% | right |
| P3 | founder interactions/item ≤ 40% | 15% | right |
| P4 | escaped defects ≤ current | 0.061 vs 0.075 | right |
| P5 | engine measure error within 2%; current off ≥ 25% | engine −3% (missed; not wrong, the bound was 5%); current −50% | half right |
| P6 | engine: 0 duplicates, 0 violations, all crashes recovered within one lease | 0, 0, recovered in 26 min mean | right |
| P7 | async or supervisor first on lead time; autoBookkeeping first on tokens | supervisor first on both (+144k tokens, +5.4 h p50 when removed); autoBookkeeping second on tokens (+95k) | half right |
| P8 | checker capacity is the first bottleneck; WBR adds a checker | nothing reached the 60-min threshold; WBR added no one. The largest wait is founder approval (2.4 h of a 5.1 h p50), then the release role (p50 43 min) | **wrong** |

**What the iteration shows:**
- **Serial dispatch is the largest single cost in this model.** It is both tokens (the chief of staff's turn for each launch) and waiting (every stage queues behind one dispatcher). That points at Meta roadmap phase 1, the supervisor, as the first mechanism to pilot for real.
- **Async approvals barely move p50 but cut founder interactions by 85%** (1.05 → 0.16 per item) and p90 by 1.5 h. Batching moves the queue: approving 12 items in one sitting creates a ship queue behind one release role (ship wait 0.03 h → 0.64 h).
- **Enforcement does not change cost; it changes what goes through.** About 12 illegal self-checks and wrong-lane assignments per run pass silently without it. Escaped defects move within noise at this rate (pSelfCheck 5%).
- **Measurement:** without auto-bookkeeping the record misses about half the tokens. That is the same size as EXP-009's real finding. The engine's remaining −3% is runs that crashed: `left-without-leave` records no usage.
- **The staffing rule's threshold (p50 > 60 min) is set above every real wait.** The rule never fires, so it measures nothing.

## Iteration 2: committed predictions (before the run)

Each change is its own arm, on the iteration-1 engine:
- **2a measurement fix:** `room recover` records the harness's usage for a run that left without leave.
- **2b founder sittings:** 3 → 5 a day (09, 11, 13, 15, 18). Approvals stay founder-only.
- **2c staffing threshold:** the WBR's `org gaps` threshold 60 → 30 min p50 wait.
- **2d:** 2a + 2b + 2c together.

| # | Prediction | would_be_wrong_if |
|---|---|---|
| I2-1 | 2a: engine measure error within ±1% | outside ±2% |
| I2-2 | 2b: approval wait 2.4 h → ≤ 1.6 h; lead p50 ≤ 4.4 h; founder interactions/item rise to ≤ 0.30 | approval wait > 2.0 h, or founder/item > 0.40 |
| I2-3 | 2c: the WBR adds a release role first; ship wait 0.64 h → ≤ 0.35 h | no release role added, or ship wait > 0.5 h |
| I2-4 | 2d: lead p50 ≤ 4.0 h at ≤ 480k tokens/item | lead p50 > 4.5 h, or tokens/item > 500k |
