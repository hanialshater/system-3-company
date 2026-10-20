# Order flow, delivery flow and rooms: scenarios and tool API (draft)

owner: chief-of-staff (draft for the founder) · date: 2026-10-20 · status: **draft, nothing built.** Routes to chief-of-staff-ceo-office (org design) → founder (approves) → tools-lead (builds).
context: company/decisions/2026-10-20-founder-code-over-agent-judgment.md · founder 2026-10-20: "we need approval chain, and order flow say CEO - chef - manager - builder. Then builder - testing 1 - UAT ...", "Also enter room - work - leave room pattern", "lets have scenarios and show tool api for each".

Three pieces, all deterministic code, no new dependencies:

| Piece | File | What it holds or does |
|---|---|---|
| Definitions | `tools/org/flows.mjs` | Chains, stages, who may sign each stage, evidence each stage needs, authority limits, rooms and lanes (the POC map as data) |
| Flow tracker | `tools/flow.mjs` | Orders down the chain; stages up the chain; refuses illegal moves; status and waiting time |
| Rooms | `tools/room.mjs` | Enter, heartbeat, leave for every run; leases; receipts; memory entry; HQ presence |

Numbers below (limits, leases) are placeholders for the founder to set. IDs are illustrative.

## Definitions (shape)

```js
// tools/org/flows.mjs
export const LEVELS = [
  { level: "founder",        roles: ["founder"],        approveAlone: "*" },
  { level: "chief-of-staff", roles: ["chief-of-staff"], approveAlone: { budget: 500_000, classes: ["dispatch"] } },
  { level: "manager",        roles: "lane POCs",        approveAlone: { budget: 250_000, classes: ["dispatch"], scope: "own lane" } },
  { level: "builder",        roles: "lane roles",       approveAlone: {} },
];
export const RESERVED = ["deploy", "org-change", "budget-line", "protected-path"]; // founder only

export const FLOWS = {
  lesson: [
    { stage: "build",   signer: "builder",                     evidence: ["src/demos/<d>/<slug>/"] },
    { stage: "test1",   signer: "code",                        evidence: ["npm run verify", "lesson-lint"] },
    { stage: "check",   signer: ["fact-checker", "learner-evaluator"], independentOf: "build", evidence: ["company/reviews/<slug>/"] },
    { stage: "uat",     signer: "orderer",                     evidence: ["launch review record"] },
    { stage: "release", signer: "founder",                     evidence: ["decision record with the founder's words"] },
    { stage: "ship",    signer: "release-manager",             evidence: ["company/ops/deployments/<id>.json"] },
  ],
  code: [
    { stage: "build",   signer: "builder",            evidence: ["commit"] },
    { stage: "test1",   signer: "code",               evidence: ["tests", "npm run check (no new errors)"] },
    { stage: "check",   signer: ["principal-engineer"], independentOf: "build", evidence: ["review record"] },
    { stage: "uat",     signer: "orderer",            evidence: ["acceptance against the order's criteria"] },
    { stage: "release", signer: "founder", onlyIf: "deploys", evidence: ["decision record"] },
  ],
};
export const ROOMS = { /* room → lane, POC, roles; replaces poc-map.md's table; poc-map.md is generated from it */ };
```

The `lesson` and `code` flows above are examples of the first two definitions, not fixed rules. Who does what is set per flow when the flow is created (founder, 2026-10-20: "Who do what is defined when the state machines/flow is created").

## S0. Creating a flow defines who does what

A flow is a versioned state machine: stages, the signer of each stage (a role, `orderer`, `code` or `founder`), the evidence each stage needs, the budget limits per level and the escalation target. Creating one is itself an order that needs approval.

```bash
node tools/flow.mjs define code --by=chief-of-staff \
  --stages=build,test1,check,uat,release \
  --signer.build=builder --signer.test1=code --signer.check=principal-engineer \
  --signer.uat=orderer --signer.release=founder:if-deploys \
  --evidence.test1="tests; npm run check no new errors" --limit.manager=250k --limit.chief-of-staff=500k
# → flow code v1 PROPOSED · invariants ok · waiting on: founder

node tools/flow.mjs approve-def code@v1 --by=founder --evidence=company/decisions/<date>-founder-flow-code.md
# → flow code v1 ACTIVE · orders created from now on pin code@v1
```

**Invariants: code refuses any definition that breaks them, whatever its author wants.**
- Every stage has exactly one signer rule and at least one evidence item.
- The checking stage is signed by a role that is independent of the build stage, and never by the builder.
- `test1` is signed by `code`: it runs commands; nobody can sign it by hand.
- Founder-reserved rights (deploy, org change, budget line, protected path) are signed by the founder in every flow.
- A stage that a protected gate already covers (the lesson gates in tools/company.mjs) reads the gate's verdict; the definition cannot weaken it.

A changed definition is a new version that needs approval again. Running orders keep the version they started with, so a rule change never moves work that is already in flight.

## S1. An order goes down the chain (founder → chief of staff → manager → builder)

Founder: "Build a physics lesson on why heavier objects don't fall faster."

```bash
# chief of staff turns the founder's words into an order (the words are stored verbatim)
node tools/flow.mjs order new --flow=lesson --by=chief-of-staff --to=cm-physics \
  --title="Heavier objects don't fall faster" --budget=400k \
  --accept="published after launch review; claims verified" --stop-if="over budget or a gate fails twice" \
  --founder-words="Build a physics lesson on why heavier objects don't fall faster"
# → O-0412 ordered · chief-of-staff → cm-physics · 400k within chief-of-staff limit (500k) · approved: chief-of-staff

# the manager splits it and orders the builder (lane 1, its own lane)
node tools/flow.mjs order delegate O-0412 --by=cm-physics --to=demo-builder --budget=200k \
  --brief=content/briefs/physics/heavier-falls.md
# → O-0413 (child of O-0412) · cm-physics → demo-builder · lane 1 ok · 200k ≤ manager limit 250k · approved: cm-physics

node tools/flow.mjs show O-0412
# O-0412 lesson "Heavier objects don't fall faster"  stage: build  waiting on: demo-builder (O-0413)
#   chain: founder (words) → chief-of-staff (approved) → cm-physics (approved) → demo-builder
#   budget 400k: reserved 200k (O-0413), spent 0
```

## S2. The builder enters the room, works, leaves

```bash
node tools/room.mjs enter physics --order=O-0413 --role=demo-builder
# → run R-9a31 entered physics · lease 30 min · order O-0413 approved by cm-physics
#   context pack: company/roles/demo-builder.md · memory (tools/memory.mjs read demo-builder) ·
#   brief content/briefs/physics/heavier-falls.md · room board: 3 open · last handoff: progress.md 2026-10-20

node tools/room.mjs heartbeat --run=R-9a31          # renews the lease; the harness can send this

node tools/room.mjs leave --run=R-9a31 --stage=build --evidence=src/demos/physics/heavier-falls/ \
  --learned="drop-time stage needs fixed scale; company/product/demo-standard.md" --open="W-2101 reveal copy long"
# → receipt written: 3 commits, 11 files, 162k tokens (harness), 19 min
#   memory entry: did-lines generated from commits; learned/open from the flags
#   O-0413 build signed by demo-builder → next stage test1 (code)
#   board W-2100 doing → review · lease released · event: leave
```

## S3. Delivery goes up the chain (test 1 → check → UAT → release → ship)

```bash
node tools/flow.mjs advance O-0413 --stage=test1          # code signs: runs verify + lesson-lint itself
# → test1 PASS (verify ok, lint 0 findings) · next: check (fact-checker, learner-evaluator)

# the checker works in its own room run (S2 pattern) and leaves with the stage
node tools/room.mjs enter learner-review --order=O-0413 --role=learner-evaluator
node tools/room.mjs leave --run=R-77c0 --stage=check --verdict=launch --evidence=company/reviews/heavier-falls/2026-10-21-learner.md
# → check: learner-evaluator launch · fact-checker pending

node tools/flow.mjs advance O-0412 --stage=uat --by=cm-physics --evidence=company/rituals/records/2026-10-22-launch-review.md
# → uat accepted by cm-physics (the orderer of O-0413) · next: release (founder)

node tools/flow.mjs advance O-0412 --stage=release --by=founder --evidence=company/decisions/2026-10-22-founder-r20-deploy.md
# → release approved (founder's words found in the record) · next: ship (release-manager)
```

## S4. The tool refuses (authority and independence)

```bash
node tools/flow.mjs advance O-0413 --stage=check --by=demo-builder
# ✗ refused: demo-builder signed build on O-0413; check must be independent of build

node tools/flow.mjs order delegate O-0412 --by=cm-physics --to=backend-engineer
# ✗ refused: backend-engineer is not in lane 1 (POC cm-physics). Ask the lane 7 POC, or escalate to chief-of-staff

node tools/flow.mjs order delegate O-0412 --by=cm-physics --to=demo-builder --budget=300k
# ✗ refused: 300k is over the manager limit (250k). Escalation created: E-031 → chief-of-staff

node tools/flow.mjs advance O-0412 --stage=release --by=chief-of-staff
# ✗ refused: release is reserved for the founder (RESERVED: deploy)

node tools/room.mjs enter physics --role=demo-builder
# ✗ refused: no order. Every run enters with an approved order
```

## S5. Crash, duplicate and recovery

```bash
# a run dies without leaving; the lease passes
node tools/room.mjs who physics
# R-9a31 demo-builder O-0413  LEFT WITHOUT LEAVE (lease expired 14:32Z) · last commit 14:05Z

node tools/room.mjs recover R-9a31
# → incident event · O-0413 back to "ordered" · partial commits listed for the next run · no memory entry invented

node tools/room.mjs enter physics --order=O-0413 --role=demo-builder   # while R-9a31 still holds the lease
# ✗ refused: O-0413 is held by run R-9a31 until 14:32Z (duplicate enter)
```

## S6. A check fails: rework loop

```bash
node tools/room.mjs leave --run=R-77c0 --stage=check --verdict=revise --evidence=company/reviews/heavier-falls/2026-10-21-learner.md
# → check: revise · O-0413 back to build (loop 1) · findings attached to the order · builder notified

node tools/flow.mjs show O-0413
# loops: build→check 1 · spent 162k + 167k of 200k · stop-if "a gate fails twice": 1 of 2
```

## S7. The founder's view

```bash
node tools/flow.mjs status --waiting-on=founder
# O-0412 release  waiting 3 h  evidence: launch review 2026-10-22 · deploy record drafted
# E-031 budget escalation (cm-physics, 300k) · waiting 1 h

node tools/flow.mjs status --stuck=24h
# per stage: how many items, oldest wait, who they wait on

node tools/efficiency.mjs --week
# accepted outcomes 41 · tokens/outcome 270k · founder messages/outcome 0.4 · rework loops/outcome 1.3
# coverage: runs 97%, usage 96%, founder 92% (EXP-009 bar met)  [prints "not computed" below the bar]
```

## S8. A meeting: several roles in one room

```bash
node tools/room.mjs enter launch-room --order=O-0420 --role=head-of-product --meeting=launch-review-r20
node tools/room.mjs enter launch-room --order=O-0420 --role=learner-evaluator --meeting=launch-review-r20
node tools/room.mjs leave --run=R-… --meeting=launch-review-r20 --position="launch" --objection="reveal copy long (W-2101)"
# → each position and objection is stored with its author; the meeting closes when every invited role has left
#   or its deadline passes; the record lists who never came
```

## S9. Approvals are asynchronous: queues and callbacks

Nobody waits in a session for an approval. Asking for one puts an item in the approver's queue and ends the run (`leave --waiting`). The decision fires callbacks that start the next step. An idle requester makes no model calls and does no polling.

```bash
# a stage or an order that needs someone's approval goes into that person's queue
node tools/flow.mjs request O-0412 --stage=release --approver=founder \
  --due=24h --on-approve="advance O-0412 ship" --on-deny="reopen O-0412 uat --findings" \
  --on-timeout="remind founder; after 48h escalate to chief-of-staff digest" --key=O-0412:release:v3
# → A-0088 queued for founder (position 2) · requester may leave the room · key O-0412:release:v3

node tools/flow.mjs queue founder
# A-0087 E-031 budget 300k (cm-physics)   waiting 1 h  due 23 h
# A-0088 O-0412 release (r20)             waiting 0 h  due 24 h   evidence: launch review, deploy record draft

node tools/flow.mjs decide A-0088 --by=founder --decision=approve --words="Approve deploy" --channel=chat
# → A-0088 approved · callback: advance O-0412 ship → order O-0414 for release-manager · release-manager woken
```

**Rules:**
- **Queues:** one queue per approver: a role, or the founder. The founder's queue replaces hand-kept `company/ops/founder-inbox.json` items for flow approvals, and HQ's Lobby reads it.
- **Callbacks:** `on-approve`, `on-deny` and `on-timeout` are flow commands, checked when the request is made, not when they fire. A callback can do only what the approver's decision authorises. For example, an approved release starts the ship order, and nothing else.
- **Exactly once:** each request has an idempotency key. A second request with the same key returns the existing item, and a callback that fires twice does nothing the second time. This is the duplicate-notification check from the first pilot.
- **Wake-up, not polling:** a callback that needs an agent creates an order and puts it on the mailbox drain with a lease (S2). The harness wakes a session for it. Nothing loops waiting.
- **Deadlines:** a missed `due` fires `on-timeout`, which is a reminder or an escalation as the flow defines. A timeout never approves anything, and silence is never consent.
- **Founder decisions:** `decide --by=founder` needs the founder's own words and the channel they came through. Code checks the words against the founder-reserved actions: "Approve deploy" covers a release and nothing more. An agent can file the founder's words, but it cannot be the source of them.
- **Batching:** the founder's queue can be answered in one sitting, with `decide A-0087 A-0088 …`, each item carrying its own words. The founder digest is generated from the queue.

## One engine, three APIs: work, rituals, documents

The state machine, queues, callbacks, rooms and events are one engine (`tools/lib/flow-engine.mjs`). Three tools sit on it, each with its own API, because each starts differently:

| Tool | What starts it | What it produces | Exists today |
|---|---|---|---|
| `tools/flow.mjs` | an order | accepted work | the mailbox, the board, the lesson gates |
| `tools/ritual.mjs` | a trigger (cadence, a count, an incident) | a ritual record, and orders for its actions | `company/rituals/triggers.json`, `tools/rituals-due.mjs` (when a ritual is due), templates; records are written by hand |
| `tools/docs.mjs` | a new or changed document | a document registry entry, a review, a status | `company/decisions/` (123 files; 43 have no `status:` line); no document registry (the only registry generates the lesson index from `meta.json`) |

## S10. Rituals: trigger → open → rounds → close

```bash
node tools/ritual.mjs due
# wbr        due   7 d since 2026-10-17 record · room: ceo-office · chair: chief-of-staff
# ops-review due   SEV2 incident I-028 (orMatch) · chair: principal-engineer-ops

node tools/ritual.mjs open wbr --date=2026-10-24
# → RIT-0031 wbr OPEN · agenda generated from the template plus data: efficiency.mjs --week, flow status --stuck=24h,
#   reconcile coverage, open actions from RIT-0024 · invited: analytics-steward, portfolio-manager, principal-engineer-ops
#   each invitee gets a queued request (S9) with a due time; nobody is polled

room enter ceo-office --ritual=RIT-0031 --role=analytics-steward      # same room pattern as S8
room leave --run=… --ritual=RIT-0031 --position="usage coverage 0% after 10-16" --objection="…" \
  --action="restore usage writer; owner tools-lead; due 10-27"

node tools/ritual.mjs close RIT-0031 --by=chief-of-staff
# → record company/rituals/records/2026-10-24-wbr.md written from the template, with every position, objection and
#   absent invitee · each action becomes an order (flow order new, owner and due set) · ritual event written ·
#   rituals-due resets from the committed record, as today
node tools/ritual.mjs actions --open          # actions from all rituals, with their orders' current stage
```

Rules: a ritual closes only with its template's required sections filled in (the check runs at close). An action without an owner and a due date is refused. A ritual whose invitees did not come closes with their names in the record, never with their positions filled in by someone else. Previous actions not done appear on the next agenda by themselves.

## S11. Documents: registry and review

Every document that decides or specifies something (decision record, EDD, ADR, PRD, amendment, runbook) gets a registry entry built from its header lines. Each document type has its own review flow (S0), so who reviews what is set when that document type's flow is defined.

```bash
node tools/docs.mjs index
# → company/docs-registry.json generated from header lines: id, type, title, owner, date, status, version,
#   supersedes, rests-on, required reviewers, review state · and a list of files whose headers are missing or bad

node tools/docs.mjs new decision --title="Code flow v1" --owner=founder --by=chief-of-staff
# → company/decisions/2026-10-21-code-flow-v1.md from the template · DOC-0124 draft

node tools/docs.mjs submit DOC-0124
# → review flow decision@v1: check (chief-of-staff-ceo-office) → approve (founder) · requests queued (S9)

node tools/docs.mjs review DOC-0124 --by=chief-of-staff-ceo-office --verdict=changes --objection="limits per lane missing"
# → objection stored with its author and kept with the document; the author must answer it before approval

node tools/docs.mjs approve DOC-0124 --by=founder --words="Approve code flow v1"
# → status decided · version 1 frozen (later edits make v2 and reopen review) · callbacks: flow approve-def code@v1

node tools/docs.mjs stale
# → documents whose rests-on claims or experiments changed, superseded documents still cited, drafts with no review
```

Rules: a review signed by the document's own author is refused. An approved document changes only through a new version. An objection is answered or carried, never dropped: approval is refused while one is unanswered. Protected-path documents (the constitution) keep their amendment process: the registry reads its state and does not replace it.

## S12. The mailbox is the delivery layer under all three

`tools/mailbox.mjs` stays, with its API (`send`, `list`, `read`, `drain`, `claim`, `launched`, `release`, `done`, `status`). flow, ritual and docs never deliver anything themselves: every order, request, decision, invite and callback is a mailbox message, and every lease is the mailbox's reservation (O_EXCL marker, run id, lease). Its tests (`npm run test:mailbox`, 11/11 on 2026-10-20) already cover parallel sends, two drains, release and lease expiry.

| Engine call | Mailbox message |
|---|---|
| `flow order new` / `delegate` | `send --kind=order` (today `dispatch-request`) to the dispatcher, with the order id |
| `room enter` / `recover` | `drain` + `claim` / lease expiry: the same reservation code |
| `room leave` | `done --report=<receipt>` to the orderer |
| `flow request` (S9) | `send --kind=approval-request --to=<approver> --key=… --due=…` |
| `flow decide` | `send --kind=decision --in-reply-to=<request>`; its callbacks are `send --kind=callback` to the dispatcher |
| `ritual open` | `send --kind=invite --to=<each invitee> --due=…` |
| `docs submit` / `review` | `send --kind=review-request` / `--kind=review` |

**What the mailbox needs added:**

```bash
node tools/mailbox.mjs send --kind=approval-request --to=founder --key=O-0412:release:v3 --due=24h …
# --key: a second send with the same key returns the first message (exactly once, S9)
# --due: past due, the engine's timeout callback fires (never an approval)

node tools/mailbox.mjs ack <id> --by=<role>        # received and understood: separate from read and from done
node tools/mailbox.mjs thread <id>                 # the request, its decision, its callbacks, in order
node tools/mailbox.mjs watch <role> --on-message="<command>"   # wake on arrival, no polling (W-1280: must be shown to fire)
```

- **New kinds:** `order`, `approval-request`, `decision`, `callback`, `invite`, `review-request`, `review`, `notice`. The lane rule moves out of `company/ceo-office/poc-map.md` (parsed today by `readLanes`) into `tools/org/flows.mjs`.
- **Durable storage:** mailboxes are a gitignored spool in the main checkout, so a container restart, or a second session in another container, loses them. EXP-009 found `company/ops/mailboxes` absent in this container. Async approvals can wait for days, so the spool needs a store that survives: committed message files, or the progress database. That is an engineering decision for principal-engineer.
- **Dispatcher:** today only the chief of staff drains and starts agents, because only it holds the Agent tool. In the pilot a supervisor process drains and launches by the same rules. That is phase 1 of the Meta roadmap.

## S13. The org itself: roles, skills, floors, rituals, onboarding, offboarding, staffing, activity

The org is already data: `tools/org/roles.mjs` (109 roles) → `tools/org/generate.mjs` → `company/roles/*.md` and `.claude/agents/*.md`. Gaps found 2026-10-20:
- No `floor` or `room` field: rooms live in a separate table, `ROOM_BY_ROLE` in `tools/events.mjs`.
- No `skills` field.
- A role's `rituals` are prose ("wbr (reads, comments)"), not ids checked against `company/rituals/triggers.json`.
- Lanes live in `company/ceo-office/poc-map.md`.
- Adding a role is a document process (`company/ceo-office/org-change-process.md`: consult the founder's directs, then the founder) that nothing enforces.

`tools/org.mjs` makes one role record the source for all of these, and runs every change through an `org-change` flow (S0). The founder signs it, because org change is a founder-reserved right.

```bash
node tools/org.mjs propose add --id=cm-music --title="Music category manager" --reports-to=head-of-product \
  --floor=2 --room=cm-music --lane=1 --skills=new-lesson,demo-crit --rituals=wbr:attends,demo-crit:presents \
  --tools=RECORDS --model=… --reason="Domain launch: music (DOC-0130)" --by=chief-of-staff-ceo-office
# → ORG-0007 PROPOSED · checks: id free, reportsTo exists, room exists on that floor, skills exist, ritual ids
#   exist, lane has one POC · consult requests queued (S9) to the founder's directs the change touches

node tools/org.mjs approve ORG-0007 --by=founder --words="Add the music CM"
# → onboarding (generated, in one step): role record written · company/roles/cm-music.md and
#   .claude/agents/cm-music.md generated · memory init (tools/memory.mjs init) · room seat on floor 2 · lane 1 roster ·
#   ritual invitee lists · day-one order created (read the onboarding docs; first brief) · org event

node tools/org.mjs propose change cm-music --skills=+domain-launch --rituals=+vertical-review:attends
node tools/org.mjs propose retire mockup-artist --reason="never dispatched in 30 d after reconciliation" --to=interaction-designer
# → offboarding on approval: open orders and board items reassigned to --to (listed, refused if none) ·
#   memory compacted and archived (nothing deleted) · removed from rooms, lanes and ritual lists · agent file removed ·
#   onboarding doc kept with a retired header · event
```

**Staffing: do we have the right agents?** The tool computes the evidence and does not decide:

```bash
node tools/org.mjs gaps --since=30d
# missing roles:  14 orders refused "no role in lane" · 6 consult runs as a role that does not exist ·
#                 3 escalations for work no lane owns
# overloaded:     demo-builder queue wait p50 6 h · fact-checker backlog 8,054 claims
# idle:           32 roles never dispatched (UNRELIABLE until EXP-009 coverage ≥ 95%: no retire proposals)
# overlap:        inScope lines shared by 2+ roles (word match, listed for review)
# → each line links its events; chief-of-staff-ceo-office turns findings into proposals
```

**Monitoring:**

```bash
node tools/org.mjs activity cm-physics --since=7d
# runs 12 · tokens 1.4M · stages signed: uat 3 · refusals 2 (lane) · rework loops caused 1 ·
# left without leave 0 · consult runs as this role 1 · memory: 18 KB, compacted 10-19 · rituals: wbr attended 1/1
node tools/org.mjs floor 2                     # who is on the floor, live: running, waiting, idle, stale
node tools/org.mjs health                      # per role: last run, refusal rate, rework rate, memory health
```

All of this comes from room and flow events. A role that is not running shows as idle or unknown, never as busy.

## S14. Consult mode: thinking in another role's hat

Anyone can think as another role, but never sign as it.

```bash
node tools/room.mjs enter learner-review --as=learner-evaluator --mode=consult --by=chief-of-staff
# → that role's context pack (role doc, memory read-only, room board) · actor "chief-of-staff as learner-evaluator (consult)"
node tools/room.mjs leave --run=… --notes=<file>
# → notes stored as advice, labelled consult
```

For a consult run, code refuses:
- signing a stage, checking a claim or answering an approval;
- writing that role's memory;
- writing events in that role's name.

A finding from a consult becomes an order to the real role. If you want the role's own context and memory, send that role's agent a question (`mailbox send --kind=question`); that is more independent than playing the role. Repeated consults as a role that does not exist show up in `org gaps`.

## Existing tools each piece is built from

| New piece | Built from |
|---|---|
| `room enter` | `dispatch-check.mjs`, mailbox `drain`/`claim`, `memory.mjs read`, `claim.mjs` |
| `room leave` | `memory.mjs add`, `events.mjs report`, `lib/usage.mjs`, `company board move`, mailbox `done` |
| flow test 1 (lessons) | `npm run verify`, `qa-changed.mjs`, `reveal-fit.mjs`, `copy-tells.mjs`, `overlap.mjs` |
| flow lesson stages | `lib/readiness.mjs` and the protected gates (read, never copied) |
| flow release | `release-draft.mjs`, `company/ops/runbook-deploy.md` |
| `ritual` | `rituals-due.mjs`, `lib/rituals.mjs`, `triggers.json`, templates |
| `docs` | the decision-record header checks in `company check` |
| `org` | `tools/org/roles.mjs`, `generate.mjs`, `people.mjs`, `memory.mjs init`, `ROOM_BY_ROLE` (moved into the role record) |
| measurement | `reconcile.mjs`, `metrics.mjs`, `ops-health.mjs`, `triage.mjs` |

## What every command writes

Every accepted command writes one event (`order`, `approve`, `escalate`, `request`, `decide`, `callback`, `timeout`, `enter`, `heartbeat`, `leave`, `advance`, `refuse`, `recover`) with order id, run id, role, room and evidence paths. Refusals are events too: they show where the rules bite. These events are what EXP-009's reconciliation and the efficiency report read.

## Open for the founder

1. Who does what, including UAT and the limits, is set per flow in its definition (S0) and approved with it. It is no longer a company-wide question.
2. Pilot: define and approve the `code` flow first (EXP-009's follow-up work is the first order on it), then `lesson`.
3. Route: chief-of-staff-ceo-office designs the org part (levels, the invariants, rooms replacing poc-map.md), then tools-lead builds.

## Objections

- Two systems during the pilot: the board and mailbox still run while the code flow is tried. Answer: `flow.mjs` writes board moves through `company board move`, and the mailbox's reservation code is reused for leases, not copied.
- The lesson gates in tools/company.mjs are protected. Answer: the lesson flow reads their verdicts; it does not reimplement or change them.
- More commands per run. Answer: `enter` and `leave` replace work agents do now by hand (reading the start files, events, memory, board moves, reports); the pilot counts the tokens per run before and after.
