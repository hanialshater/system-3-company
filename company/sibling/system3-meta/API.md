# System 3 Meta: API reference

owner: chief-of-staff, for System 3 Meta · updated: 2026-10-21 · status: **prototype**, in `company/sibling/system3-meta/prototype/`. Nothing in System 3 Company imports it.
companions: [ROLES.md](ROLES.md) (who does what) · [design and scenarios](../../ops/2026-10-20-flow-and-rooms-scenarios.md) (S0-S15) · evidence: prototype/ITERATIONS.md (simulator), prototype/LIVE.md, LIVE2.md, LIVE3.md (live runs)

Keep this file true to the code. If a command, rule or event changes, change it here in the same commit. Each command's usage line is also in the header comment of its file (`meta.mjs`, `supervisor.mjs`).

## 1. The idea in one paragraph

Code does every step a rule can decide; agents do only what needs judgment; every step writes an event. Work flows down as **orders** (founder → chief of staff → manager → builder) and up through **stages** (build → test1 → check → UAT → ship), each signed by a role the flow allows. Agents work in **rooms**: enter (claim a lease, get a context pack) → work → leave (sign, receipt, memory). Messages travel through one **mailbox** with priorities and idempotency keys. A **code supervisor** runs the code steps and plans which agent sessions to start. Managers own their lane's **policy**; anything outside the process goes to a **contractor**.

## 2. Files

| File | What it is |
|---|---|
| `lib.mjs` | The engine: `Mailbox`, `Org`, `Engine` (flows, orders, stages, approvals), `Rooms` (enter, leave, sessions, recovery), `Rituals`, `flowMetrics`. No I/O. |
| `policy.mjs` | Lane policy: allowlisted knobs, validation, versions, the manager report and cycle |
| `contractor.mjs` | Contractor engagements outside the flow; templates (`manager-onboarding`) |
| `specs.mjs` | Company specs as data (`toy`, `storybook`): rooms, skills, roles, the flow. `init --spec=<name>` |
| `state.mjs` | Builds a company from a spec; load/save of the JSON state under an O_EXCL lock; `runTests`, `runTextChecks` (test1 for text work) |
| `building.mjs` | Floors (founder-approved), rooms (add, rename, retire), bookings |
| `channels.mjs` | Channels (company, lane, role, topic), posts fanned out to the mailbox, read and ack tracking |
| `tracker.mjs` | Linear-like items (issue, order, ask, action), projects, cycles, links, comments, board, search; orders mirrored by code |
| `goals.mjs` | Goals with levels, a contributes-to tree, RAG status, auto-red, divergence, roll-up review |
| `meetings.mjs` | Group meetings: rounds of private-then-revealed positions, whiteboard, objections, decisions → actions, minutes |
| `asks.mjs` | Leadership asks routed to the lowest level that can decide |
| `rituals.mjs` | WBR (code-built pack + meeting + chair's summary), goal review, digests |
| `meta.mjs` | The CLI agents and people use |
| `supervisor.mjs` | The code supervisor: `tick`, `watch`, `launched` |
| `sim.mjs`, `run.mjs`, `toy.mjs` | The simulator, its arms by iteration, and the toy org used by tests and the simulator |
| `tests/*.test.mjs` | `node --test tests/*.test.mjs` (46 tests on 2026-10-21) |
| `live/` | Live-run state (`state*.json`), work (`work/<task>/`), shipped modules (`shipped/<task>/`), engagements (`contracts/<C>/`) |

**Environment:**
- `META_LIVE_DIR` sets the live directory (default `prototype/live`);
- `META_STATE` sets the state file inside it (default `state.json`).

Time is in minutes since the epoch, to the millisecond.

## 3. Concepts

| Concept | Meaning |
|---|---|
| **Flow** | A versioned state machine: stages, the signer of each stage, the evidence each needs. Proposed, then approved by the founder (`define`, `approveDef`). Orders pin the version they started on. |
| **Order** | A unit of work in a flow. Fields include `stage`, `loops` (revise loops), `priority`, `due`, `after` (dependencies), `policyVersion`, `fromContract`. |
| **Stage signers** | `builder` (the order's builder), `code` (the tool runs tests), a level such as `checker` or `release`, `orderer` (the manager who placed it), `founder` |
| **Message** | Mailbox item: kind (`work`, `report`, `approval-request`, `decision`, `invite`, `contract`, `handoff`, …), `priority` (`now`, `next`, `later`), `due`, idempotency `key`, `lease` |
| **Run** | One item worked in a room: enter → leave. Has a lease (30 min default, renewed by heartbeat). |
| **Session** | One agent process. It may drain several runs (`room next`, up to a cap). The harness reports usage per session. |
| **Policy** | A lane's knobs, owned by its manager (see §6) |
| **Engagement (contract)** | Work outside the flow: prototype, research, spike (see §7) |
| **Cycle** | Company time: a ritual or manager cycle closes on progress, an event or a calendar fallback, not on a weekday |

## 4. Rules code enforces (whoever asks)

With `enforce` on (the default), a broken rule is refused and logged as `refuse`. Rules marked HARD hold even with enforcement off.

1. **Signers:** only the flow's signer may sign a stage. `test1` is signed by `code` only. Release, deploy and org changes are the founder's.
2. **Independence:** the builder of an order can never check it, not by signing, entering or impersonating.
3. **Consult mode:** `--as=<role>` works only with `--mode=consult`; a consult run can sign nothing.
4. **Lanes and limits:** a manager delegates only inside its lane and within its budget limit (250k); the chief of staff within 500k; more goes to the founder.
5. **`now` priority:** only the levels the flow lists (default founder, chief of staff) may order `now`. A lane policy may narrow that list, never widen it.
6. **Exactly once:** a message with an existing key returns the first; a callback fires once; usage is recorded once per run or session.
7. **Leases:** a held message cannot be taken by another run. An expired lease means the run left without leave; its work goes back to the queue.
8. **Stale work:** a run whose stage or loop has moved on signs nothing at leave.
9. **Dependencies:** an order `--after` another waits until that one ships, then is released automatically.
10. **Approvals:** founder decisions need the founder's own words and channel, and the words must cover the action ("Approve deploy" covers a release). A timeout reminds or escalates; it never approves.
11. **Policies:** only allowlisted knobs, in range; `later` always has a due time; only the lane's manager proposes or activates.
12. **Contractors:** no flow work, no signing, no shipping; onboarding only from allowed paths; research findings need a source and a confidence; results enter the product only through an order that cites an accepted engagement.
13. **The log is append-only:** a wrong record is corrected by appending (`usage correct`), never edited.
14. **Refusals are events:** every refused command is logged, even when the command itself saves nothing else.

## 5. `meta.mjs`: the CLI

Run from `prototype/`. Output is JSON. Exit codes: 0 ok, 1 refused, 2 usage or state error.

**Org and orders**
```bash
node meta.mjs init                                   # fresh live org + task flow (refuses if state exists)
node meta.mjs order new --to=<manager> --title=… --task=<T> --accept=… [--by=cos] [--budget=200000]
                        [--priority=now|next|later --due=<min>] [--after=O-1,O-2] [--from-contract=C-1]
node meta.mjs order delegate <O> --by=<manager> --to=<builder> [--budget=150000]
node meta.mjs queue <role|pool:<level>>               # open work messages, best first
node meta.mjs flow show <O> · flow status · flow metrics
node meta.mjs flow advance <O> --stage=test1 --by=code                     # runs the builder's tests itself
node meta.mjs flow advance <O> --stage=<s> --by=<role> --evidence=… [--verdict=pass|revise] [--findings=…]
```
**Rooms: enter → work → leave**
```bash
node meta.mjs room enter --msg=<M> --role=<role> [--lease=30] [--as=<role> --mode=consult]
#   → run, session, task, accept, workdir (created for build), findings, history, memory, leave_with, next_with, cap_means
node meta.mjs room leave --run=<R> --evidence=<path> [--verdict=pass|revise] [--findings=…] [--learned=…] [--mistake=…]
node meta.mjs room next  --run=<R> --cap=<n> --evidence=… [leave flags]    # sign this item, take the next in the session
node meta.mjs room heartbeat --run=<R> · room recover · room wake-plan
node meta.mjs room abandon --run=<R> --by=<role> --reason=…                # end a bad run, sign nothing
```
**Usage** (from the harness, never from the agent)
```bash
node meta.mjs room usage --run=<R> --tokens=<n>
node meta.mjs room session-usage --session=<S> --tokens=<n>
node meta.mjs usage add --role=<role> --tokens=<n> --label=…                 # a session outside any room
node meta.mjs usage correct --from-session=<S> --to-session=<S> --tokens=<n> --reason=…
```
**Lane policy and the manager cycle**
```bash
node meta.mjs policy knobs · policy show --lane=<l>
node meta.mjs policy propose --lane=<l> --by=<manager> --knobs='{"revisionPriority":"later","revisionDueMin":30}' --reason=… --prediction=…
node meta.mjs policy activate --lane=<l> --version=<n> --by=<manager>
node meta.mjs manager report --lane=<l>
node meta.mjs manager cycle --lane=<l> --by=<manager> --belief=… --decision=keep|change [--version=<n>]
```
**Contractors**
```bash
node meta.mjs contract templates
node meta.mjs contract open --by=<manager> --template=manager-onboarding [overrides]
node meta.mjs contract open --by=<manager> --kind=prototype|research|spike --goal=… --deliverable=… --budget=<n> --timebox=<min>
                            [--onboarding='{"docs":[…],"laneMemory":true,"brief":"…"}']
node meta.mjs contract brief --id=<C>                                      # what the contractor sees
node meta.mjs contract deliver --id=<C> --by=<ctr> --summary=… --path=live/contracts/<C>/… [--findings='[{"claim","source","confidence"}]']
node meta.mjs contract decide --id=<C> --by=<manager> --decision=accept|reject --reason=… · contract show --id=<C>
```
**Reading**
```bash
node meta.mjs events [--type=<t>] · memory <role> · org activity <role>
node meta.mjs mail dup <O>                            # test only: re-send a notification (dedupe check)
```

## 6. Lane policy knobs (`policy.mjs`)

| Knob | Range | Effect |
|---|---|---|
| `drainCap` | 1-10 | items one agent session may take |
| `batchLater` | 1-10 | a `later` item waits until this many are queued for the role, or its due time |
| `revisionPriority` | `next`, `later` | how a sent-back item is queued (a `now` order stays `now`) |
| `revisionDueMin` | 1-1440 | due time for a `later` revision (required with `later`) |
| `staffingWaitMin` | 5-1440 | the WBR flags a queue whose median wait passes this |
| `nowBy` | subset of the flow's list | narrows who may order `now` |

Any other key is refused. A new knob is an engineering change to `KNOBS`, not a manager edit.

## 7. Contractor engagements (`contractor.mjs`)

**Kinds:** `prototype`, `research`, `spike`. In-process work is an order.

**Lifecycle:** `open` → (the supervisor plans one session) → `deliver` → `decide` (accept or reject) → ended. It also ends as `expired` at the timebox.

**When it ends,** for any reason:
- a `handoff` message goes to the manager;
- the contractor role is deactivated;
- no memory is kept.

**Onboarding fields:**
- `docs` may come only from `live/work/<own task>/`, `live/shipped/<own task>/`, `company/roles|product|knowledge|design/` and `docs/`. Never acceptance tests, state files, parent paths, absolute paths or the scratchpad.
- `laneMemory` (true or false): the lane builders' learned notes.
- `brief`: up to 2000 characters.

**Templates:** `manager-onboarding`, a research engagement. The brief includes the lane's data from code: the manager report, policy history, open orders, recent findings and recent manager cycles.

**Into the product:** `order new … --from-contract=C-n`, which requires the engagement to be accepted.

## 8. `supervisor.mjs`: the code supervisor

```bash
node supervisor.mjs tick  [--acceptance=<dir>] [--batch-later=3] [--cap=4]   # one pass: steps + plan
node supervisor.mjs watch [--acceptance=<dir>] [--max-min=30]                 # wake on state change or timer; exit when an agent is needed
node supervisor.mjs launched --role=<role> [--msgs=…] [--why=…]              # record a started session (no duplicate plan)
```
**What a tick does:**
1. promote `later` items past due;
2. recover expired leases;
3. expire engagements past their timebox;
4. for every order: test1 (runs the builder's tests), UAT (runs `<acceptance>/<task>.test.mjs`; with no file the order waits for a person), ship (copies the module, not the builder's tests);
5. repeat until nothing changes.

**What the plan names:**
- a `now` item: a fresh session at once;
- `next` items: a session if the role has none running or starting;
- `later` items: a session once a batch is ready, or at the due time;
- an open engagement: one contractor session.

The lane policy's `drainCap` and `batchLater` override the defaults.

## 9. Events

Every accepted command writes events to `log.events` (in the state file). These are the types:

- **Orders and flow:** `order`, `delegate`, `blocked`, `unblocked`, `advance`, `reopen`, `shipped`, `code-stage`, `flow-define`, `flow-active`
- **Rooms:** `enter`, `leave`, `stale-leave`, `abandon`, `left-without-leave`, `session-open`, `session-close`, `launch`
- **Mailbox:** `send`, `dedupe`, `claim`, `release`, `done`, `ack`, `promote`
- **Approvals:** `request`, `decide`, `decide-repeat`, `callback`, `timeout`, `budget-approved`
- **Org:** `org-genesis`, `org-propose`, `org-change`, `onboard`, `offboard`
- **Policy:** `policy-propose`, `policy-active`, `manager-cycle`
- **Contractors:** `contract-open`, `contract-deliver`, `contract-decide`
- **Rituals:** `ritual-open`, `ritual-close`
- **Measurement and integrity:** `usage`, `refuse`, `violation` (enforcement off only), `supervisor-tick`

`flowMetrics` and `managerReport` compute lead time, work time, critical path (through `--after`), flow efficiency, tokens per shipped item, revisions, items per session and single-item sessions from these events alone.

## 10. Running a live round (the procedure used in live runs 2 and 3)

1. **Commit the predictions** (a `LIVEn.md`) before anything runs.
2. **Set up:** `META_STATE=state-runN.json node meta.mjs init`. Place orders. Put hidden acceptance tests outside the repository.
3. **Start the supervisor:** `node supervisor.mjs watch --acceptance=<dir>` in the background.
4. **When it exits with a plan,** start exactly the named sessions, record each with `supervisor.mjs launched`, then restart `watch`.
5. **When each agent finishes,** record its harness usage: `room session-usage`, or `usage add` for a session outside a room.
6. **At the end:** `flow metrics`, then score every prediction in the `LIVEn.md`.

## 11. Company tools (built 2026-10-21)

Every command takes `--by=<role>`. Code checks that the role may do it; otherwise it refuses (exit 1, a `refuse` event). Each file's header comment holds its full rules.

**Building** (`building.mjs`)
```
building plan · building floor-propose --floor=<n> --name=…   (an approval for the founder: FLOOR-n)
building room-add --id --floor --kind=lane|meeting|quality|lobby|launch|office [--capacity] [--lane]
building room-rename --id --to · room-retire --id   (refused while roles are seated, runs are open or it is booked)
building book --room --minutes [--start] --attendees=a,b --purpose · building cancel --id
approval queue · approval decide --ids=A-1,A-2 --by=founder --decision=approve|reject --words=… --channel=…
```

**Channels** (`channels.mjs`): `channel create --id --kind=company|lane|role|topic [--members]` · `channel post --channel --title --body [--ack]` (one mailbox message per member, keyed, so a repeat post is a no-op) · `channel read --post [--ack]` · `channel status --post` (who has read and acked) · `channel inbox`. Only the founder and the chief of staff post to `company`; a lane channel takes its manager and members.

**Tracker** (`tracker.mjs`): `item create --kind=issue|ask|action --title [--assignee --due --project --labels --goal]` · `item update --id --state=backlog|todo|in-progress|in-review|done|cancelled` · `item comment` · `item link --id --to --rel=blocks|parent` · `item show|search` · `project create` · `cycle create` (cycles may not overlap) · `board [--assignee --project --state]`. Orders appear as `order` items, mirrored by the supervisor (`syncOrders`); only the engine moves them.

**Goals** (`goals.mjs`): `goal create --title --level=company|org|lane|team --owner --why --what --success='[{metric,target,current?,source?}]' --due=YYYY-MM-DD [--contributes-to=G-n] [--status=green|yellow|red --reason --path]` · `goal update` (owner only; `--bind='{"<metric>":"shipped:<task prefix>"}'` makes code measure a criterion) · `goal show|board` · `goal review --by`.
- Owner by level: company → founder; org → chief of staff; lane → its manager; team → a builder or checker.
- A contributor sits at or below its parent's level and is due no later than its parent.
- Yellow and red need a reason and a path to green. Past due and not done is red, by code (auto-red).
- A criterion with a `source` (`shipped:<task prefix>`, `done:<tracker label>`) is measured by code; nobody types over it. Green with an unmeasured criterion is an exception that rolls up.
- Done needs every success measure met. Green over a red contributor needs a written divergence.
- `goal review` gives each level its own goals plus only the exceptions from the level below.

**Meetings** (`meetings.mjs`): `meeting open --title --room --invitees --agenda='[{title,item?,goal?}]' [--channel]` · `meeting position --id --n --text` · `meeting read` (before the reveal you see only your own position) · `meeting reveal [--force]` (chair; the missing are named) · `meeting round` · `meeting board --section --text` · `meeting object` · `meeting decide --n --decision --answers='{k:{how,text}}' --actions='[{title,owner,due}]'` (every objection is answered or carried; each action becomes a tracker item) · `meeting defer` · `meeting close` (minutes posted to the channel; the room booking is released) · `meeting show`.

**Leadership asks** (`asks.mjs`): `ask route|raise --kind=deploy|org-change|budget|cross-lane|priority|lane|decision --title --why --due [--amount --lane --to --escalate=<reason>]` · `ask answer` · `ask summary`. Routing:
- deploy and org change → the founder;
- budget over 500k → the founder; over 250k → the chief of staff; otherwise the lane manager;
- cross-lane and priority → the chief of staff;
- lane → that lane's manager;
- a decision → the asker's manager.

An ask addressed higher than it needs is rerouted down unless `--escalate` gives a reason. `info` is not an ask.

**Rituals** (`rituals.mjs`): `wbr page0` · `wbr open --by=<cos> [--room --start=<ISO> --invitees --channel]` (code builds the pack: page 0 metrics, hits and misses, roadmap and goals, leadership asks with how many reached the founder; then a four-item meeting) · `wbr close --meeting --summary` (the chair writes only the summary; the document is rendered from the record and posted to `company`) · `goal-review --by` (lane → org → company) · `digest --audience=founder|lane:<l>|company [--channel=<id> to publish]`.

**Text checks as test1** (`state.mjs runTextChecks`): `order new … [--project=PRJ-n --goal=G-n] --checks='{"file":"page.md","minWords","maxWords","mustInclude":[…],"banned":[…],"minReadingEase","titleLine":true}'`. The supervisor runs them in place of `node --test` (Flesch reading ease).

## 12. The orchestrator's loop in code (built for Benchmark 2)

- **`node supervisor.mjs cycle [--finished=<role>:<tokens>,…] [watch flags]`** is the orchestrator's one command per wake. It:
  - records the harness usage of finished sessions (the role's latest session without usage, or a plain usage event for work outside a room);
  - watches until a session is needed;
  - reserves every planned launch;
  - prints a **brief per launch, written by code**: role, prefix, `live/<dir>/CONTEXT.md`, the role's open tracker actions, the exact first command and the cap.

  The orchestrator launches the briefs as written and types no bookkeeping.
- **The plan covers judgment outside rooms** (`judgment()`):
  - meeting positions still to write;
  - a chair whose meeting has every position in. A WBR's chair is told to close with `wbr close`;
  - orders with no builder, which go to their manager. A manager chairing an open meeting delegates after deciding.

  A launch for such work reserves it for up to 30 min. It does not hold back the same role's room work.
- **The drain cap adapts:** when the remainder after `cap` is at most half a cap, the session takes all of it.
- **`node meta.mjs batch --file=<ops.json>`** runs `[{cmd, sub?, arg?, args}]` on one state, all or nothing. `${n.field}` reads field `field` of the n-th result.
- **`node meta.mjs check --order=<O>`** runs the order's test1 (tests or text checks) without signing. Builders self-check before they hand in.
- **`node meta.mjs help [<command>]`** lists the commands.
- **Text checks** (`--checks`):
  - `mustInclude` is literal text;
  - `lineMaxWords: [{prefix, maxWords}]` limits lines that start with a prefix, e.g. `**Why:**` ≤ 20.
- **A refused command saves only its refusal events.** Partial changes are discarded.
- **Goal criteria** may carry `source` (`shipped:<prefix>`, `done:<label>`) and are measured by code.

## 13. Decisions as checks, giveaways, and the supervisor as a service (built after Benchmark 2, used in live run 4)

- **`meeting decide … --rules='[{"tasks":"<task prefix>","checks":{…}}]'`:** the decision's checkable rules are validated, then merged into every open order whose task starts with the prefix. Lists join, and limits take the stricter value (`mergeChecks`). The rules stand for orders placed later, applied at `order new`, and the minutes list what each rule tightened.
- **Text checks** (`CHECK_KEYS`):
  - `file`, `minWords`, `maxWords`, `titleLine`, `minReadingEase`;
  - `mustInclude`: exact text, case-insensitive;
  - `banned`: whole words, case-insensitive;
  - `lineMaxWords: [{prefix, maxWords}]`;
  - `allowedLines: [prefixes]`: every non-empty line starts with one of them;
  - `distinctAnswers: {prefix, split?, across?}`: no answer repeats across sections or tasks, and no line gives one away. A giveaway is the answer together with a distinctive word of its own question.
- **`meta.mjs check --order=<O>`** also returns `rules`, the checks in plain words.
- **Minutes:** closing a meeting writes `live/<dir>/minutes/<MTG>.md`, and briefs name these files.
- **`node supervisor.mjs serve [--acceptance=<dir>] [--idle-min=2] [--max-min=120]`:**
  - one per state (`serve.pid`);
  - on every state change it ticks, reserves each planned launch and writes its brief to `live/<dir>/outbox/<seq>-<role>.md`;
  - it prints one JSON line per event (`serving`, `steps`, `launch`, `done`, `stopped`, `refused`); run it under a monitor;
  - it ends when every order is done and no meeting is open.
- **`node supervisor.mjs usage --finished=S-n:tokens|role:tokens,… [--outside=role:tokens,…]`:** records harness usage in a batch.
