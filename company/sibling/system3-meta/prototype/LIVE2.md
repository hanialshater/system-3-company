# Meta prototype: live run 2 (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Yes so what is your plan now?" (plan step 4: draining against single runs with real agents, a `now` order, a dependency, the supervisor as an agent)

## Setup

The same CLI (`meta.mjs`), now with:
- sessions and `room next`;
- priority flags;
- `--after` dependencies;
- `flow metrics`;
- millisecond time.

A fresh state file: `live/state-run2.json`.

| Arm | Orders | Agent sessions |
|---|---|---|
| **Drain** | T3 CSV line parser, T4 dedent, T5 semver compare | one `toy-builder-1` session, `room next --cap=3` |
| **Single** | T6 INI parser, T7 kebab-case, T8 duration parser | three `toy-builder-2` sessions, one task each |
| **`now`** | T9 leap year, ordered `--priority=now` while the drain session runs | a fresh, parallel `toy-builder-2` session at once |
| **Dependency** | T10 max version, `--after` T5, must import T5's compare | one `toy-builder-2` session once T5 ships |
| **Checks** | all 8 checks | one `toy-checker` session draining with `--cap=8` (a second one if it runs out) |
| **Supervisor** | test1 (code), UAT (hidden acceptance tests), ship, for every order | one supervisor agent session per batch: its tokens are measured this time |

The task pairs are matched for difficulty, drain against single: CSV and INI, dedent and kebab, semver and duration. Usage is the harness's count per agent session.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| M1 | The drain session's tokens for its 3 builds are ≤ 60% of the 3 single sessions' total | > 80% |
| M2 | Draining costs no quality: checker revise verdicts on drained tasks ≤ single tasks + 1 | drained ≥ single + 2 |
| M3 | The `now` order's lead time is ≤ 50% of the median lead time of the drain arm's orders | > 100% |
| M4 | T10 stays blocked until T5 ships, is released automatically, and `flow metrics` gives it a critical path = T5's work + T10's work | blocked past T5's ship, or released before it, or a wrong critical path |
| M5 | Supervisor tokens per shipped order ≤ 30k | > 60k |
| M6 | Median flow efficiency ≤ 50%: waiting, mostly for batched supervisor and checker steps, outweighs work | > 80% |
| M7 | ≤ 1 failed CLI call per agent session caused by the tools | any session > 3 |
| M8 | The draining checker's tokens per check ≤ 25k | > 45k |

## Result (2026-10-21)

**Outcome:** all 8 orders shipped. The run took 15.5 minutes of wall time, from the first order to the last ship. Reopened orders:
- T6 (INI) and T7 (kebab), once each;
- T9 (the `now` order), twice.

14 agent sessions in total:
- 7 builder sessions: 1 drain of 3; 3 single; 1 `now`; 1 drain of 4 for the revisions and T10; 1 T9 fix;
- 3 checker sessions: a drain of 7, a drain of 4, 1 single;
- 4 supervisor sessions (test1; UAT and ship; test1; UAT and ship).

T9's last test1, UAT and ship were done by the orchestrating session and are **not measured**.

**Usage** (harness counts per session; 884,084 tokens in all, 110.5k per shipped order):

| | Sessions | Items | Tokens | Per item |
|---|---|---|---|---|
| Drain builder (T3, T4, T5) | 1 | 3 | 63,038 | 21.0k |
| Single builders (T6, T7, T8) | 3 | 3 | 172,103 | 57.4k |
| `now` builder (T9) | 1 | 1 | 56,605 | 56.6k |
| Drain builder (2 revisions, 1 now-revision, T10) | 1 | 4 | 72,911 | 18.2k |
| T9 fix (loop 2) | 1 | 1 | 61,873 | 61.9k |
| Checker drain | 2 | 7 + 4 | 155,632 | 14.1k |
| Checker single (T9 re-check) | 1 | 1 | 63,931 | 63.9k |
| Supervisor | 4 | 7 orders | 237,991 | 34.0k per order |

Live run 1 cost 206.8k per shipped order (413,587 for 2), *without* the supervisor's tokens. Run 2 cost 110.5k per order *with* them.

**Time** (`flow metrics`, minutes):

| Order | Arm | Lead | Work | Critical path | Flow efficiency | Loops |
|---|---|---|---|---|---|---|
| O-1 T3 | drain | 6.1 | 0.57 | 0.57 | 9% | 0 |
| O-2 T4 | drain | 6.2 | 0.62 | 0.62 | 10% | 0 |
| O-3 T5 | drain | 6.2 | 0.72 | 0.72 | 12% | 0 |
| O-6 T8 | single | 6.2 | 0.60 | 0.60 | 10% | 0 |
| O-4 T6 | single | 13.0 | 1.56 | 1.56 | 12% | 1 |
| O-5 T7 | single | 13.2 | 1.86 | 1.86 | 14% | 1 |
| O-7 T10 | after T5 | 13.3 | 0.99 | 1.71 (= T5 0.72 + 0.99) | 13% | 0 |
| O-8 T9 | `now` | 15.0 | 2.87 | 2.87 | 19% | 2 |

| # | Prediction | Result | Verdict |
|---|---|---|---|
| M1 | drain ≤ 60% of the singles' tokens | 63,038 vs 172,103: **37%** | right |
| M2 | drained revises ≤ single + 1 | drained 0 vs single 2 | right |
| M3 | `now` lead ≤ 50% of the drain arm's median | 15.0 vs 6.2 min: **242%** | **wrong** |
| M4 | T10 blocked until T5 ships, released automatically, critical path = T5 + T10 | `unblocked` by O-3 at T5's ship; 1.71 = 0.72 + 0.99 | right |
| M5 | supervisor ≤ 30k per order | 34.0k | missed (not wrong: bound 60k) |
| M6 | median flow efficiency ≤ 50% | 12% | right |
| M7 | ≤ 1 tool-caused failed call per session | 0 in 14 sessions | right |
| M8 | draining checker ≤ 25k per check | 14.1k | right |

**What it shows:**
- **Draining is the biggest single saving measured so far.** One session doing 3 builds cost 37% of three sessions, and checks fell from about 60k to 14k each. Quality did not fall: the drained builds were the ones with no revisions. The simulator predicted 30% savings with a flat curve past 3; the live saving is larger because live queues were full when the sessions started.
- **`now` bought priority, not speed** (M3 wrong). It went first in every queue, but T9 failed its check twice: once for one exotic input, then again for the next one. Its lead time was the longest of all. **Rework, not queue position, decides lead time.** Each check found one more exotic input. It took a builder brief that named the whole class ("think about every exotic value"), and a checker brief asking for every failing input class, to stop the loop. **Checkers should report the class of a defect, not one instance of it.**
- **Waiting is 80-90% of lead time** (flow efficiency 9-19%). The waiting was the orchestrator starting batches one after another: supervisor, then checker, then supervisor. A supervisor process that starts the next stage the moment a message arrives (wake, not batch) is the next lever for time. It is phase 1 of the Meta roadmap.
- **The supervisor cost 34k per order,** mostly session start-up across 4 sessions. It is code-shaped work (run tests, copy files, sign), so it should be code: a deterministic supervisor script would cost about 0 tokens.
- **Dependencies work:** T10 waited for T5, was released at T5's ship, imported T5's shipped module, and its critical path adds up.

**Tool findings from run 2:**
1. `leave_with` and `next_with` omitted the `META_STATE` prefix, so an agent copying them would have used the wrong state file. **Fixed:** the commands now carry the prefix.
2. `room enter` named a work directory that did not exist; 4 agents each ran `mkdir` themselves. **Fixed:** the directory is created at build entry, and `workdir_exists` is reported.
3. Nothing said what `--cap` counts, and the memory and history times were raw minute numbers. **Fixed:** `cap_means` added, ISO times.
4. **My own mistake:** I recorded one session's usage against the wrong session id (S-14 instead of S-17). The log is append-only, so I added `usage correct`, which appends a correction with a reason, and used it. The totals reconcile.
5. Not fixed, noted:
   - reports pile up unread in the manager's mailbox (32 sent, none read);
   - shipping copies the builder's tests next to the module.
