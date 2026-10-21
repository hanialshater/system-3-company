# Meta prototype: live run 3, the supervisor as code (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Yes go ahead" (on: a supervisor written as a plain script that wakes on change)

## Setup

- **`supervisor.mjs watch` does every step a rule can decide:** test1, UAT from hidden tests, ship, lease recovery, promotion. It wakes on a change to the state file or on its next timer, and exits only when its launch plan asks for an agent session. That exit is what wakes the orchestrator, who starts exactly the sessions the plan names and then restarts the watcher.
- **Agents:**
  - one `toy-builder-1` session draining 4 builds (cap 4);
  - checker sessions as the plan asks;
  - builder sessions for any revisions.
- **Checker briefs ask for the class of a defect,** not one instance (live run 2's lesson).
- **Work:** 4 small modules, T11 Luhn check, T12 run-length encoding, T13 byte formatting, T14 ISO week number, with hidden acceptance tests outside the repository.
- **State file:** `live/state-run3.json`.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| S1 | The supervisor costs 0 model tokens: every test1, UAT and ship step is done by `supervisor.mjs` | any supervisor step needs an agent |
| S2 | Tokens per shipped order ≤ 75k (run 2: 110.5k) | > 95k |
| S3 | Median flow efficiency ≥ 30% (run 2: 12%) | < 20% |
| S4 | A code step runs within 5 s of the message it acts on (median) | median > 30 s |
| S5 | Revise loops per order ≤ 0.5, with class-level findings | > 1.0 |
| S6 | The orchestrator starts only the sessions the plan names, and the plan never names a session for a role that already has one running (except `now`) | any extra or duplicate session |

## Result (2026-10-21)

**Outcome:** all 4 orders shipped; T12 and T14 were revised once each.

**Sessions:** 7 agent sessions, every one named by the supervisor's plan:
- 1 builder drain of 4;
- 2 builder revisions;
- 1 checker drain of 4;
- 2 checker re-checks;
- the 7th was the checker re-check recorded as S-9.

**The supervisor did 10 ticks, all by `supervisor.mjs`:** 6 test1, 4 UAT and 4 ship steps, plus the release sessions S-3, S-4, S-8 and S-10. It cost 0 model tokens. Shipped folders hold the module only (no builder tests).

| Order | Lead (min) | Work (min) | Flow efficiency | Loops |
|---|---|---|---|---|
| O-1 T11 Luhn | 2.0 | 0.64 | 32% | 0 |
| O-3 T13 bytes | 3.5 | 1.37 | 39% | 0 |
| O-2 T12 RLE | 5.8 | 3.19 | 55% | 1 |
| O-4 T14 ISO week | 7.7 | 3.69 | 48% | 1 |

**Usage:** builders 200,666; checkers 209,910; supervisor 0. Total 410,576, which is 102.6k per shipped order.

**Code-step latency** (from the event that made the step possible to the step):

| Step | Median | Max |
|---|---|---|
| test1 | 0.9 s | 26.1 s |
| UAT | 0.5 s | – |
| ship | 0.0 s | – |
| All code steps | 0.5 s | – |

| # | Prediction | Result | Verdict |
|---|---|---|---|
| S1 | supervisor 0 model tokens | 0: every test1, UAT and ship by code | right |
| S2 | ≤ 75k per shipped order | 102.6k | **wrong** (bound 95k) |
| S3 | median flow efficiency ≥ 30% | 43.5% (run 2: 12%) | right |
| S4 | code step within 5 s (median) | 0.5 s | right |
| S5 | ≤ 0.5 revise loops per order | 0.5; each revision closed its finding class in one loop | right (on the bound) |
| S6 | only plan-named sessions, never a duplicate | 7 sessions, all plan-named. **But the first watch named a duplicate:** it fired 3 s after the builder launch, before the builder entered, so the plan saw no running session. Not launched; fixed with launch reservations and a test. I also chose the first checker's cap (4) above the plan's 1, so it could drain builds landing meanwhile | half right |

**What it shows:**
- **The waiting is gone where code can remove it.** Code steps run in half a second, and flow efficiency rose from 12% to 44%. Lead times were 2-8 min against 6-15 min in run 2. What waiting is left is agent start-up and the gap until the orchestrator starts the next session.
- **Cost did not fall, and the reason is revisions** (S2 wrong). Each of the 2 revisions needed its own builder session (63-66k) and checker re-check (64-66k), with nothing else in their queues to drain. A single item pays the ~50k start-up alone. First-round work was cheap: 4 builds for 72k, 4 checks for 81k. **Revisions are where cost sits now.** The levers are fewer revisions (better `accept` text and builder self-checks against the class) and holding a revision until another item can share its session (`later` for revisions).
- **Class-level findings worked.** Both revisions closed their whole class in one loop, against the two loops T9 needed in run 2. The checker's fuzzing (300k and 1.1M inputs) found real defects the hidden UAT tests would have missed: T14 was wrong for years above 2.47e13.
- **The supervisor's launch plan is the orchestrator's whole job,** and it was right once launch reservations existed. Starting agents is still a person-or-session step here, because only this session holds the Agent tool. That is the remaining manual link.

**Tool findings from run 3, both fixed:**
1. **Launch reservations.** `supervisor.mjs launched` records a started session, and the plan does not ask for it again for 5 min.
2. **`runTests` passed failing tests when called from inside a `node --test` process,** because the child inherits `NODE_TEST_CONTEXT` and exits 0. Found by the supervisor's own test; fixed by dropping the variable and judging by the parsed counts.
