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
