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
