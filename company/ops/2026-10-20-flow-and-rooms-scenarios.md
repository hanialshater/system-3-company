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

## What every command writes

Every accepted command writes one event (`order`, `approve`, `escalate`, `enter`, `heartbeat`, `leave`, `advance`, `refuse`, `recover`) with order id, run id, role, room and evidence paths. Refusals are events too: they show where the rules bite. These events are what EXP-009's reconciliation and the efficiency report read.

## Open for the founder

1. Who does what, including UAT and the limits, is set per flow in its definition (S0) and approved with it. It is no longer a company-wide question.
2. Pilot: define and approve the `code` flow first (EXP-009's follow-up work is the first order on it), then `lesson`.
3. Route: chief-of-staff-ceo-office designs the org part (levels, the invariants, rooms replacing poc-map.md), then tools-lead builds.

## Objections

- Two systems during the pilot: the board and mailbox still run while the code flow is tried. Answer: `flow.mjs` writes board moves through `company board move`, and the mailbox's reservation code is reused for leases, not copied.
- The lesson gates in tools/company.mjs are protected. Answer: the lesson flow reads their verdicts; it does not reimplement or change them.
- More commands per run. Answer: `enter` and `leave` replace work agents do now by hand (reading the start files, events, memory, board moves, reports); the pilot counts the tokens per run before and after.
