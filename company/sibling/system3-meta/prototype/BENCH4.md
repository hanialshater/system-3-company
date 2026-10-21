# Benchmark 4 and the M3 exit run: a spreadsheet engine, hands-free, with injected faults (predictions committed before the run)

owner: vp-meta · run by chief-of-staff · date: 2026-10-21
founder, 2026-10-21: "a difficult but self contained task that need agent collaboration and self improvement and fault recovery"; then "go with Agent SDK for M3 … keep going, decide for me until we reach a big milestone".

## The task

"Sheet" is a small spreadsheet engine in plain JavaScript, built as **10 orders**. The spec is `live/bench4/SPEC.md`.

**The orders:**
- nine modules: TOKENIZER, PARSER, VALUES, CELLS, FUNCTIONS, EVALUATOR, GRAPH, FORMAT, SHEET;
- one user guide: GUIDE.

**Dependencies (`--after`):**
- PARSER waits for TOKENIZER.
- FUNCTIONS waits for VALUES and CELLS.
- EVALUATOR waits for PARSER, VALUES, CELLS and FUNCTIONS.
- GRAPH waits for CELLS; FORMAT waits for VALUES.
- SHEET waits for EVALUATOR, GRAPH and FORMAT; GUIDE waits for SHEET.

**Why it needs collaboration:** each module is built against the other modules' shipped behaviour, as the spec states it.

**The org:** the `toy` spec, as in live run 3: a manager (`mgr-live`), two builders, a checker and release. The manager delegates.

**Hidden acceptance:** one file per order, in the session scratchpad. No agent sees it.
- Each category is one test whose failure says only "n of m cases fail".
- SHEET's file is the 208-case suite in three waves, plus display and bad cell names.
- A reference solution, split into the same modules, passes every file. That includes the files after the requirement change.

**Running with nobody in the loop:**
- `launcher/launch.mjs` (Agent SDK) runs `serve` and starts every planned session from its brief file.
- After the start, the operator types nothing until the run is over. The operator here is me: chief-of-staff.

**Code that recovers from faults:**
- **The launcher:** a failed process abandons its run, and the work is planned again.
- **The regression gate:** after every ship, every shipped order's acceptance runs again; a failing order is reopened.
- **The watchdog:** an order that no message and no run carries is sent again after 2 minutes.
- **Announcements in briefs.**
- **`order reopen`** for a changed requirement.

## Injected faults (fixed triggers, logged in `live/bench4/faults.jsonl`)

| # | Fault | Trigger | Expected recovery, by code |
|---|---|---|---|
| F1 | An agent process is killed mid-item | the 3rd launch, after 45 s (`--kill=3:45`) | the launcher abandons the run; `serve` plans the item again |
| F2 | A shipped module is corrupted: GRAPH loses 2-cell cycles | GRAPH ships | the regression gate at the next ship reopens GRAPH with the failing category |
| F3 | A message is lost: PARSER's check message is deleted | PARSER reaches check | the watchdog re-sends it after 2 min |
| F4 | A requirement changes: `#CYCLE!` becomes `#CIRC!` | VALUES has shipped and SHEET is in build | VALUES is reopened by the founder; a company post goes out; SPEC.md and the hidden tests change; the gate catches any module that hard-coded the old name |

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| E1 | **M3: zero manual launches and zero typed commands** between starting the launcher and the injector, and the run ending | any launch or command typed by me |
| E2 | All 10 orders ship. At the end, every order's hidden acceptance passes under the changed requirement: the 208-case SHEET suite passes in full, with `#CIRC!` | any order not shipped, or any hidden test failing at the end |
| E3 | Every injected fault is detected and recovered by code with no person: F1 within 2 min, F2 at the next ship after GRAPH, F3 within 4 min, F4 with no shipped module still emitting `#CYCLE!` | any fault that needs me, or stays unrecovered |
| E4 | **M3 cost: ≤ 113k tokens per shipped order** (live run 3's 102.6k + 10%), on the same measure (the agent's final context per session). I expect 50-80k because sessions now wait for their next item and carry no company CLAUDE.md. Cumulative tokens and dollars are reported too | > 113k per shipped order |
| E5 | Sessions wait instead of restarting: ≤ 20 agent sessions for 10 orders, including the manager's and every revise and fault | > 25 |
| E6 | Wall time from launcher start to the last ship ≤ 60 min | > 90 min |

**M3's exit criterion** (MILESTONES.md):
- a 10-order live run;
- zero manual launches;
- every crash recovered;
- cost per order within 10% of live run 3.

E1 plus E3 (F1) plus E4 is M3. E2, E5 and E6 are Benchmark 4's own measures.

**The like-for-like caveat:** these sessions run without System 3 Company's settings and CLAUDE.md (decision 2026-10-21-meta-agent-sdk-launcher). So per-session cost is not strictly comparable with live run 3. Both measures are reported.

## Results (run 2026-10-21, 18:32:04-18:40:56 UTC; scored after the run, predictions above unchanged)

The record is in `live/bench4-record/`:
- the launcher's ledger (every launch, with tokens, cost and the agent's own report);
- the serve log and the fault log;
- the hidden acceptance kit and the reference solution;
- the fault injector.

| Measure | Result |
|---|---|
| Orders shipped | **10 / 10** |
| Agent sessions | **9**: the manager 1, builders 5 (1 killed by F1), checker 3. Release, test1, UAT and ship were done by code |
| Typed commands after the start | **0** (started: the launcher and the injector; stopped: the injector, after the run) |
| Wall time, launcher start to last ship | **8 min 52 s** |
| Tokens, final context per session (the live-run measure) | **453,374** in all, **45.3k per shipped order** (live run 3: 102.6k) |
| Tokens, cumulative (every call) | 4,904,141; the SDK's cost estimate is **$3.88**, $0.39 per order |
| Items per session | 2.4 on average: the checker's sessions took 4 each, waiting for the next item instead of restarting |
| Revise loops from the checker or the hidden tests | **0**. The only rework was the two reopens the faults caused |
| Self-checks before hand-in | 15, of which 1 failed and was fixed in the same session |
| Final hidden acceptance, under the changed requirement | **every file passes**, shipped and work copies alike: SHEET 14/14 categories (the 208 cases with `#CIRC!`), and all nine others |
| `#CYCLE!` left in shipped code | none; `ERRORS.CYCLE` is "#CIRC!" |

**The faults:**

| # | Injected | Detected | Recovered | By |
|---|---|---|---|---|
| F1 crash | 18:33:29, builder-2 killed mid-item | at once | the item was re-planned 0.2 s later; O-4 shipped at 18:34:26 | launcher + `serve` (code) |
| F2 corruption | 18:36:10, GRAPH loses 2-cell cycles | 18:36:56, by the regression gate at the next ship (46 s) | GRAPH re-shipped at 18:38:15 (2 min 5 s); the builder found and removed the wrapper | gate (code), then the builder |
| F3 lost message | **not injected in this run**: PARSER passed its check between two of the injector's 3-second polls | - | - | - |
| F4 changed requirement | 18:36:59, `#CYCLE!` → `#CIRC!` | the post and the reopen, at once | VALUES re-shipped at 18:38:23 (1 min 24 s); SHEET shipped at 18:39:09 already on `#CIRC!`; the checker acknowledged the post (P-1) from its brief | founder's reopen, briefs, builder |

**The supplementary F3 test** (`live/m3-drop`, a one-order company):
- The injector deleted the check message within 200 ms of its sending.
- The reader's `room enter` was refused. The reader then read the injector's log, which sat in the live dir, and re-sent its own message with `mail dup`, a test command that checked no identity. The order shipped.
- So this recovery was **by an agent, through two holes in the set-up**, not by the watchdog. The watchdog has unit-test evidence only.
- Both holes are fixed:
  - `mail dup` now needs a manager or above and is recorded;
  - the injectors log outside the live dir.

**Scoring:**
- **E1 right.** Zero manual launches and zero typed commands. Every one of the 9 sessions was started by the launcher from the brief code wrote.
- **E2 right.** 10/10 shipped, and every hidden acceptance file passes at the end under `#CIRC!`.
- **E3 right for F1, F2 and F4; F3 untested in the run.**
  - Every injected fault was recovered with no person.
  - F3's trigger never fired: my injector's fault, not the system's.
  - In the supplementary test an agent recovered F3, not the watchdog.
- **E4 right: 45.3k per shipped order against ≤ 113k.**
  - The caveat stands: these sessions carry no System 3 Company CLAUDE.md, so they start smaller (the smoke runs: ~33k for a near-empty session, against ~60k in the benchmarks).
  - Waiting for the next item is the other half: 9 sessions did 22 items.
- **E5 right.** 9 sessions against ≤ 20.
- **E6 right.** 8 min 52 s against ≤ 60 min.

**M3 is reached.** Its exit criteria (MILESTONES.md), all met:
- a 10-order live run;
- zero manual launches;
- every crash recovered;
- cost per order within 10% of live run 3. It is less than half, with the caveat above.

**What the run says about the founder's three asks:**
- **Collaboration.** Ten modules were built against each other's shipped behaviour, from one spec, by two builders who never spoke. Every hidden test passed first time.
  - Builder-1 noticed the corrupted GRAPH in its own report, before anyone told it.
  - The checker read the requirement change from its brief.
- **Self-improvement.** There is little to show here.
  - No order needed a second try for its own sake.
  - The one failed self-check was fixed in-session.
  - Lessons were written at leave (room memory), but no run needed them.
- **Fault recovery.** Three of the four faults were recovered by code: crash, corruption and changed requirement. The fourth, lost-message recovery, still needs a live test of the watchdog.

**Honest weaknesses:**
1. **The task was not hard enough.**
   - With a precise spec, every module passed its hidden tests on the first try: 0 revise loops.
   - The difficulty the founder asked for has to come from ambiguity: a spec with gaps that builders must settle together, or modules whose interfaces they design themselves.
2. **F3 needs a deterministic trigger.** The fix is to inject from the supervisor's own tick, not from a poller.
3. **The cost comparison is not like for like.** A same-launcher re-run of live run 3's task would settle it.
4. **One model family, n = 1.**

## Benchmark 4b: the like-for-like arm (predictions committed before the run)

The task, faults and launcher are the same as above. Two things differ.
- **Settings:** the launcher runs with `--setting-sources=user,project,local`. Every agent loads what an interactive session in this repository loads: System 3 Company's CLAUDE.md and settings.
- **F3:** it is injected inside the supervisor's tick (`--faults`), so it cannot be missed. The drop is PARSER's check message.

The live dir is `live/bench4b`.

| # | Prediction | would_be_wrong_if |
|---|---|---|
| E7 | With the company context loaded, tokens per shipped order rise, and stay ≤ 113k. I expect 60-90k. Waiting sessions keep the saving | > 113k |
| E8 | All four faults are recovered by code with no person. F3 is recovered by the watchdog within 4 min (live test m3-watchdog: 3 min 4 s) | any fault needs an agent workaround or a person |
| E9 | 10/10 ship, and every hidden test passes at the end under `#CIRC!` | any order or test fails |

### Benchmark 4b, first attempt: invalid (my error), aborted at 20:04 UTC

**What went wrong.**
- I edited `meta.mjs` while the run was live (M2's `init --spec-file`). The new import name `G` clashed with an existing one, so `meta.mjs` stopped loading.
- From about 19:31 to 20:03, every agent command and every usage report failed. The work stalled until the 30-minute leases expired and `serve` recovered the items.

**What happened to the run.** It is not scored. Its record stays in `live/bench4b-invalid/`.
- Before the break: the manager delegated, F1 was injected and recovered in 0.2 s, and the first sessions cost about 52-60k each with the company context loaded.
- The break itself was handled by the existing lease recovery, slowly, with no person. That proves only that the 30-minute lease is far too long for a hands-free company.

**Fixed in the tooling, not just by care.**
- The launcher now runs every benchmark from a **frozen copy of the kernel** in `live/<dir>/kernel/` (its hash is in the ledger). Editing the prototype during a run can no longer touch it.
- The import clash is fixed; there are now 79 tests.

The arm is re-run below as `bench4b`.

### Benchmark 4b, second attempt: stalled on a real watchdog bug, stopped at 20:12 UTC

**What happened.**
- On the frozen kernel, everything ran as designed until F3. Six orders shipped, and F1 was recovered.
- F3 dropped PARSER's check message at 20:09:09 (`live/bench4b-stalled`). The watchdog then never re-sent it.

**The bug.**
- The watchdog marks an orphaned order (`orphanSince`). But `serve` saves only a tick that reports a step, so the mark was lost on every tick.
- Only another order's activity would save it. The live test m3-watchdog had that activity; this run, waiting on PARSER alone, had none.
- My unit test missed the bug because `supervisor.mjs tick` always saves.

**Fixed, with a test that fails on the old code.**
- Being first seen orphaned is now a step.
- `serve`'s wake timer includes the watchdog's due time.
- The new test (`tests/serve.test.mjs`) runs `serve` itself on a quiet company. There are now 80 tests.

**What the stall shows.** It is exactly the failure a hands-free company must not have: work stopped and nobody noticed. The run is a finding, not a result. The arm is re-run below.
