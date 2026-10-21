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

## Iteration 2: results (20 seeds)

| arm | k tok/item | lead p50 h | lead p90 h | founder/item | escaped/item | measure error | WBR adds (mean per run) |
|---|---|---|---|---|---|---|---|
| engine (iteration 1) | 471 | 5.1 | 9.3 | 0.16 | 0.061 | −3% | none |
| 2a measure fix | 471 | 5.1 | 9.3 | 0.16 | 0.061 | 0.0% | none |
| 2b 5 sittings | 474 | 4.4 | 6.3 | 0.25 | 0.053 | −3% | none |
| 2c WBR at 30 min | 474 | 4.7 | 9.0 | 0.16 | 0.059 | −3% | release 1.0, checker 1.0, builder 0.8 |
| 2d all three | 466 | 3.6 | 5.3 | 0.22 | 0.055 | 0.0% | checker 1.0, builder 1.4, release 0.1 |

Stage waits (h): 2b approval 2.36 → 1.03, ship 0.64 → 0.32 (smaller batches per sitting). 2c check 0.64 → 0.34, ship 0.64 → 0.45. 2d build 0.37, check 0.30, approval 1.05, ship 0.41.

| # | Prediction | Result | Verdict |
|---|---|---|---|
| I2-1 | 2a error within ±1% | 0.0% | right |
| I2-2 | 2b approval ≤ 1.6 h, p50 ≤ 4.4 h, founder/item ≤ 0.30 | 1.03 h, 4.4 h, 0.25 | right (p50 on the bound) |
| I2-3 | 2c adds a release role first; ship wait ≤ 0.35 h | release first in 12 of 20 seeds (checker 6, builder 2); ship wait 0.45 h | half right (bound missed, not wrong: ≤ 0.5) |
| I2-4 | 2d p50 ≤ 4.0 h at ≤ 480k tokens/item | 3.6 h at 466k | right |

**What it shows:**
- The measurement gap closes completely once lost runs record the harness's count. In the real company that means the harness's own usage, not an agent's report.
- **More sittings trade founder time for speed:** +0.09 interactions per item buys −0.7 h p50 and −3 h p90. That is a founder decision, not an engine one.
- With a threshold below real waits, `org gaps` finds the queue that batching created (release) and then the checker. The WBR's staffing rule then works end to end: ritual, proposal, founder queue, approval, onboarding, a new worker taking work. Added staff cost about nothing in tokens, because tokens follow work, not headcount. Idle capacity has no cost in this model, which is too kind: see the limits below.
- With all three changes: p50 3.6 h, against 10.0 h for the current design. Lead time is now about 1 h of work plus about 0.6 rework loops per item plus waits.

## Iteration 3: committed predictions (before the run)

**3a code-first checking:** test1 catches 70% of defects instead of 50%. This models moving more review into code (the lesson-lint idea: layout fit, copy tells, overlap, format rules). The base is 2d.

| # | Prediction | would_be_wrong_if |
|---|---|---|
| I3-1 | rework loops/item fall by ≥ 15% (from 0.58) | fall by < 5% |
| I3-2 | tokens/item fall by ≥ 4% (from 466k) | fall by < 1% or rise |
| I3-3 | escaped defects/item do not rise (≤ 0.055) | > 0.065 |

## Iteration 3: results (20 seeds)

| arm | k tok/item | lead p50 h | lead p90 h | escaped/item | rework/item | check wait h | WBR adds |
|---|---|---|---|---|---|---|---|
| 2d all three | 466 | 3.6 | 5.3 | 0.055 | 0.58 | 0.30 | checker 1.0, builder 1.4, release 0.1 |
| 3a code-first test1 | 453 | 3.9 | 5.4 | 0.034 | 0.58 | 0.40 | builder 1.4, checker 0.8 |

| # | Prediction | Result | Verdict |
|---|---|---|---|
| I3-1 | rework loops/item fall ≥ 15% | 0.58 → 0.58 | **wrong** |
| I3-2 | tokens/item fall ≥ 4% | −2.8% | missed (not wrong: bound 1%) |
| I3-3 | escaped defects do not rise | 0.055 → 0.034 (−38%) | right |

**What it shows:** moving checks into code did not reduce rework. It moved rework earlier: a defect caught by test1 still sends the item back for a rebuild, which is the expensive run. What it bought was quality: 38% fewer defects reached the learner, because the human-style check now sees fewer defects and misses fewer of them. Tokens fell only by the checker runs saved. Lead time rose 0.3 h, within run-to-run variation from staffing: the WBR added fewer checkers because the check queue looked shorter at review time. **To cut rework, the defect has to be prevented at build time, not caught sooner:** for example, the builder runs the lint before leaving the room. That is the iteration-4 candidate.

## Limits of this simulation (read before using any number)

- Every [a] parameter in `sim.mjs` is an assumption. The [m] values come from today's metrics, which EXP-009 shows are incomplete. The absolute numbers mean little; the direction and the ranking of mechanisms are the result.
- The `current` arm is a model of today's design (serial dispatch, prose rules, manual bookkeeping, interruptions), not the real company.
- Workers are not agents: no misunderstanding, no context limit, no model variance, no brief quality. Idle staff cost nothing, which makes adding staff look free.
- One toy org (2 lanes, 4 builders, 1 checker, 1 release role), one flow, 14 days, 20 seeds.
- What it does establish: the prototype tools hold their invariants under crashes, duplicates and illegal requests (0 duplicate runs, 0 violations, every crash recovered within one lease, across 180 runs of every arm), and two tool bugs were found and fixed before any real use.

## Next

1. Calibrate: replace [a] parameters with pilot data once EXP-009's fixes land. Dispatch time and tokens, bookkeeping tokens and approval waits are the ones that drive the result.
2. Iteration 4: the builder runs test1 inside its own room before `leave` (prevention), against 3a.
3. A live run: the same tools with 2-3 real agents on a bounded batch (the Meta roadmap's first pilot), where the four fault checks are the S5/S9 tests above, done by real sessions.

## Iteration 4: committed predictions (before any code for it exists)

Founder, 2026-10-21: batches vs a queue in the mailbox; priority flags ("force now or for later"); time redefined for a fast, parallel company ("we can wait until Thursday to do a meeting … I would call it time but define it differently"). Plan: tools first (sessions and `room next`, priority flags, three ritual clocks with cycles, time measures with `--after` dependencies, a wake on lease expiry), then this simulation, then live run 2.

**Calibration from live run 1** replaces the token model: a session costs 50k start-up plus the task's own tokens (build about 6k, check about 8k), plus context growth of about 5k per item already drained in the session.

**Arms:** all on the 2d engine; the same seeds.
- **4a** one task per run: today's prototype, recalibrated.
- **4b** sessions drain up to 3 items.
- **4c** sessions drain up to 5 items.
- **4d** 4b plus priority: 10% of orders `now`, 60% `later` (due 8 h), the rest `next`.
- **4e** 4b with the WBR on the progress clock: every 20 shipped, or a queue stuck over 1 h, with a 24 h fallback. This replaces "every 3.5 days".

| # | Prediction | would_be_wrong_if |
|---|---|---|
| I4-1 | 4b tokens/item ≤ 70% of 4a; 4c ≤ 60% | 4b > 85% of 4a |
| I4-2 | draining does not slow the median: 4b lead p50 within +15% of 4a | > +30% |
| I4-3 | in 4d, `now` items have lead p50 ≤ 50% of `later` items, at ≥ 1.5× their tokens per item | `now` not faster, or not costlier |
| I4-4 | no `later` item waits past its due by more than one sweep (starvation 0) | any does |
| I4-5 | 4e holds more WBRs in busy periods and fewer in quiet ones than a fixed cadence; lead p50 no worse than 2d's | p50 > 10% worse than 2d |
| I4-6 | invariants hold in every arm: 0 duplicates, 0 violations, all crashes recovered | any non-zero |

## Iteration 4: results (20 seeds; variable waves of 4-20 orders a day; session token model from live run 1)

Two simulator bugs were found and fixed before this run, both in the new session code:
- a session with a cap of 1 was reused by `pump` before it was closed, so cap-1 sessions averaged 1.48 items;
- promotion lateness was measured from the order's due time instead of from when the message became eligible.

Two modelling gaps were also closed before the run:
- rituals cost nothing, so each attendee's position now costs a session (55k);
- the busy/quiet ratio divided by zero, so it is replaced by WBRs per day on the busiest and the quietest third of days.

The simulated WBR also met a real org refusal: adding a second manager to a lane with a POC. It now records the refusal as an objection; 0.1 per run on average.

| arm | k tok/item | lead p50 h | lead p90 h | p50 now / next / later h | items per session | WBRs | WBR/day busy · quiet | escaped/item |
|---|---|---|---|---|---|---|---|---|
| 4a one per run | 276 | 3.7 | 5.9 | – / 3.7 / – | 1.00 | 3 | 0.24 · 0.23 | 0.053 |
| 4b drain 3 | 193 | 3.9 | 6.0 | – / 3.9 / – | 1.66 | 3 | 0.19 · 0.23 | 0.058 |
| 4c drain 5 | 187 | 3.7 | 5.9 | – / 3.7 / – | 1.88 | 3 | 0.23 · 0.17 | 0.055 |
| 4d drain 3 + priority | 197 | 8.0 | 24.5 | 2.2 / 2.6 / 11.1 | 1.67 | 3 | 0.25 · 0.19 | 0.051 |
| 4e drain 3 + progress WBR | 277 | 2.9 | 5.5 | – / 2.9 / – | 1.55 | 69 | 9.07 · 1.81 | 0.057 |

4d tokens per shipped item by priority: now 279k, next 197k, later 170k. Stage waits (h): 4d build 1.87, approval 4.15 (4b: 0.42, 1.09). 4e ship 0.13 (4b 0.42).

| # | Prediction | Result | Verdict |
|---|---|---|---|
| I4-1 | 4b ≤ 70% of 4a's tokens; 4c ≤ 60% | 4b 70%; 4c 68% | 4b right (on the bound); 4c missed (not wrong) |
| I4-2 | draining does not slow p50 by > 15% | 3.9 vs 3.7 h (+5%) | right |
| I4-3 | `now` p50 ≤ 50% of `later`, at ≥ 1.5× tokens | 2.2 vs 11.1 h (20%); 279k vs 170k (1.64×) | right |
| I4-4 | no `later` item waits past its due by more than a sweep | max lateness 0.0 min (a wake at due time) | right |
| I4-5 | progress-clock WBR: more meetings when busy, fewer when quiet; p50 no worse than 2d | busy 9.1/day vs 0.2 on the calendar, **but quiet 1.8/day, also more**; p50 2.9 h (2d 3.6, 4b 3.9), **at +84k tokens/item for the meetings** | half right |
| I4-6 | invariants hold: 0 duplicates, 0 violations, all crashes recovered | 0 / 0 / all, recovery 24 min mean (lease wake) | right |

**What it shows:**
- **Draining saves about 30% of tokens, but its returns flatten quickly.** Sessions average 1.66 items with a cap of 3, and only 1.88 with a cap of 5. A worker's queue rarely holds more than 2 items ready at once, so the queue empties before the cap is reached. Draining pays in proportion to how much work is waiting; raising the cap past 3 buys little.
- **Priority works as designed, and `later` is expensive in time:** `now` items ship in 2.2 h at 1.64× the tokens, `later` items in 11.1 h at the lowest cost. Overall p50 rose from 3.9 to 8.0 h, because 60% of the orders were `later`. A batch that waits also misses founder sittings: approval waits rose from 1.1 to 4.2 h, since items reached the founder's queue after the last sitting of the day. `later` belongs to work that really can wait. The default should stay `next`.
- **The progress clock fires on activity, but the stuck rule (any work waiting > 60 min) also fires on quiet days.** 69 WBRs cost 84k tokens per item, a 43% increase, for a 26% shorter p50. As configured, that meeting load is too high. **The rule should be counted on the progress measure itself:** a WBR after 20 shipped or after a backlog grows. A single item waiting an hour should not call a meeting. That is the candidate for 4f.
- Lease wakes recover crashes as fast as the 5-minute sweep (24 vs 26 min) with no polling.

## Live run 2: next
Draining against single runs with real agents; a `now` order mid-batch; a dependency (`--after`); the supervisor as an agent, so its tokens are measured. Predictions in LIVE2.md before the run.
