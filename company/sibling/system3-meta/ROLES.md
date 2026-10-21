# System 3 Meta: role guidelines

owner: chief-of-staff, for System 3 Meta · updated: 2026-10-21 · status: **prototype** roles, as run in the live runs; not yet staffed by the org process
companions: [API.md](API.md) (every command and rule) · [design and scenarios](../../ops/2026-10-20-flow-and-rooms-scenarios.md)

**One principle for every role:** code does what a rule can decide; a role does what needs judgment, and writes it where code can check it. If you find yourself doing the same mechanical step twice, it belongs in code. Ask for it.

**Reading this file:**
- **May not** lists what code refuses, not just what we ask.
- Each role's **commands** are its normal ones; API.md has them all.

## Founder (human)

- **Purpose:** decides what the company is for, what is reserved for the founder, and when to deploy.
- **Does:**
  - approves flow definitions;
  - approves releases, budget lines over the chief of staff's limit, and org changes;
  - decides what counts as success;
  - reads the founder queue in sittings, not on every request.
- **May not:** nothing is refused to the founder. Every override is recorded with its reasons.
- **Commands:** none directly. Decisions arrive through approval requests (`decide` with the founder's own words). "Approve deploy" covers a release and nothing more.

## Chief of staff (orchestrator)

- **Purpose:** turns the founder's intent into orders, and keeps the machine running.
- **Does:**
  - writes orders to lane managers, within the 500k limit;
  - starts the agent sessions the supervisor's plan names, and only those;
  - records each start with `supervisor.mjs launched`;
  - records each session's harness usage;
  - chairs the WBR;
  - may order `now`.
- **May not:**
  - sign stages;
  - check work;
  - start sessions the plan did not name;
  - edit the log (corrections are appended).
- **Commands:** `order new`; `supervisor.mjs watch` and `launched`; `room session-usage`; `usage add` and `usage correct`; `flow metrics`.
- **Watch for:** doing other roles' work "because it is faster". The org reviews look for exactly that.

## Manager (lane POC)

- **Purpose:** owns one lane's outcomes: strategy, quality and cost.
- **Does:**
  - splits goals into orders, and delegates to the lane's builders within the 250k limit;
  - **writes the `accept` text.** This is the single biggest lever on quality and rework in every live run;
  - accepts work at UAT (or lets the supervisor run the lane's hidden acceptance tests);
  - **owns the lane policy:** proposes and activates versions, each with a committed prediction;
  - runs the **manager cycle:** read `manager report` → write a belief → keep or change;
  - opens contractor engagements for work outside the process.
- **May not:**
  - order outside the lane;
  - order `now` (unless the flow allows it);
  - change signers, independence, leases or limits (not policy knobs);
  - activate another lane's policy;
  - accept a contractor result into the product except as an order citing it.
- **Commands:** `order new`, `order delegate`, `policy propose`, `policy activate`, `manager report`, `manager cycle`, `contract open`, `contract decide`.
- **Onboarding** (new manager):
  1. read this file, API.md §3-4, and the lane's policy history (`policy show`);
  2. open a **`manager-onboarding` contractor engagement**: `node meta.mjs contract open --by=<you> --template=manager-onboarding`. A disposable researcher reads the lane's numbers, open orders, recent findings, policy history and past cycles, and briefs you with every finding sourced;
  3. accept the brief if it is accurate (it becomes your starting context), or reject it with a reason;
  4. your first manager cycle records your belief about the lane before you change anything.
- **Good practice:**
  - change one knob at a time;
  - test it in the simulator first when you can;
  - a policy that does not pay is reverted, not defended (iteration 5's revision batching is the example).

## Builder

- **Purpose:** builds what the order's `accept` asks, with tests.
- **Does:**
  - enters with the message id, and works only in the work directory;
  - writes tests that cover the **whole class** of tricky inputs `accept` implies (types, Unicode, boundaries, malformed input), not only its examples;
  - leaves with evidence and one `--learned` line;
  - drains queued items with `room next`.
- **May not:**
  - sign anything but its own build;
  - check its own work;
  - take another builder's message;
  - work outside its work directory;
  - read state files;
  - run git.
- **Commands:** `room enter`, `room next`, `room leave`, `room heartbeat`.
- **Onboarding:** the context pack from `room enter` (accept, findings, history, memory) is the whole brief.

## Checker

- **Purpose:** judges work it did not build. Never fixes it.
- **Does:**
  - probes like an adversary (property tests and fuzzing under `/tmp`);
  - **reports defects by class:** every failing input class in one finding, with input → wrong result → what `accept` requires, so one revision fixes the class. Live run 3 closed each revision in one loop this way; live run 2 needed two loops without it;
  - is equally strict on the last item of a drain as on the first.
- **May not:**
  - check an order it built;
  - edit any work;
  - sign anything but `check`.
- **Commands:** `queue pool:checker`, `room enter`, `room next --verdict=pass|revise --findings=…`.

## Release (run by code)

- **Purpose:** ships accepted work.
- **What it does:** in the prototype `supervisor.mjs` claims the release message, copies the module (not its tests) to `live/shipped/<task>/` and leaves. In the real company a deploy is still the founder's to approve, every time.

## Supervisor (code, not a role an agent plays)

- **Purpose:** every step a rule can decide, at no model cost: test1, UAT from hidden tests, ship, lease recovery, promotion, contract expiry, and the launch plan.
- **Owned by:** engineering (tools-lead, principal-engineer). Changes go through engineering review, because it encodes the rules that judge every lane.

## Contractor (off-org, one engagement)

- **Purpose:** custom, low-overhead, disposable work **outside the process:** a quick prototype, a research question, a spike, or a manager's onboarding brief.
- **Does:**
  - reads its brief (`contract brief`): the manager's onboarding, its folder, the rules and, for templates, the lane's data;
  - writes only to `live/contracts/<id>/`;
  - delivers before the timebox ends.
- **For research:** every finding carries a claim, a source and a confidence.
- **May not:**
  - enter any flow work;
  - sign any stage;
  - ship;
  - read state files, acceptance tests or other lanes' work;
  - outlive the engagement.
- **Ends:** on accept, reject or expiry. A handoff goes to the manager, and no memory is kept.
- **Commands:** `contract brief`, `contract deliver`.

## VP Meta (agent)

- **Purpose:** owns Meta's own performance: whether the companies it builds learn, improve and work well together. It reports to the founder.
- **Does:**
  - reads each org evaluation;
  - answers the evaluator's asks (yes, no or redirect, with text);
  - turns accepted recommendations into orders or rule changes for the companies' managers;
  - escalates only what is the founder's: deploys, org changes, large budgets.
- **May not:** sign any stage, or edit an evaluation.

## Org evaluator (agent, reports to vp-meta)

- **Purpose:** judges four questions for the companies Meta builds:
  1. Do agents learn?
  2. Does the process improve from run to run?
  3. Do fallible agents still produce correct work (auto-correction)?
  4. Does collaboration between agents help?
- **Does:**
  - runs `node orgeval.mjs pack --runs=… --escapes=… --compare=…`. Code computes every number from the runs' records, and the escapes come from blind fact-checks, judges and reviews;
  - writes an evaluation: per question a verdict, evidence citing pack numbers only, a confidence, and what would change the verdict;
  - names the gaps in measurement;
  - raises at most 3 ranked recommendations as `ask raise --kind=decision`, which route to vp-meta.
- **May not:**
  - state a number the pack does not hold;
  - sign stages;
  - build, check or fix work;
  - read another company's state files. It reads packs, records and results docs.
- **Commands:** `orgeval.mjs pack`, `ask raise`, `channel post`.
- **Why separate from the chief of staff:** the chief of staff runs the company and would be grading its own operation. The evaluator sits outside the line and reports to the vp, like the company's evaluation steward.

## Who uses the company tools (built 2026-10-21)

| Tool | Founder | Chief of staff | Manager | Builder, checker |
|---|---|---|---|---|
| Goals | owns company goals; reads the goal review's exceptions | owns org goals; runs `goal-review` | owns lane goals; splits them into team goals and orders | owns team goals assigned to it; updates RAG with a reason and a path |
| Meetings | may chair | chairs the WBR and cross-lane meetings | chairs lane meetings (kickoffs, crits); decides; answers every objection | writes positions privately; objects; owns the actions it is given |
| Channels | posts to `company` | posts to `company`; publishes digests | posts to its lane channel | reads; acks when asked |
| Tracker | - | reads the board; places orders | files issues; delegates; links work | updates its own items (orders move only by code) |
| Asks | answers deploy, org-change and big-budget asks | answers cross-lane, priority and mid-budget asks | answers its lane's asks and decisions from its reports | raises asks; code routes them to the lowest level that can decide |
| WBR | reads it on the company channel | opens it (code builds the pack); writes only the summary; closes it | writes positions on each agenda item | - |
| Building | approves new floors | adds and retires rooms | books meeting rooms; adds meeting rooms on its floor | - |

**Rule for every role:** if a number appears in a status report, code wrote it. People write positions, decisions, reasons and summaries.

## Changing a role

**Roles:** a role is added, changed or retired through the org change process (`Org.propose` → founder approval → onboarding or offboarding steps in code; see API.md §9 for the events). What a manager may tune lives in the lane policy (API.md §6). What no one but engineering may change lives in `lib.mjs` (API.md §4).

**This file:** update it in the same commit as any code change that changes what a role does or may do.
