# Feature catalogue

owner: vp-meta · updated 2026-10-25 · every feature that exists today, so none is lost when code moves. **Layer**:
*starter* (Meta-owned, every company gets it), *company* (owned and customised by one company), *bench* (proven in a
benchmark harness, not yet in the kernel). Update this file in the same change that builds, moves or retires a feature.

## The Meta kernel (`company/sibling/system3-meta/prototype/`)

| Feature | Layer | Where | Status and evidence |
|---|---|---|---|
| One engine: mailbox, org, flows, rooms, rituals | starter | `lib.mjs` | live since M1; tests green |
| Agents' CLI over the live state, one writer at a time | starter | `meta.mjs`, `state.mjs` | live (live runs 1-4) |
| The supervisor as code (no agent tokens for mechanical steps) | starter | `supervisor.mjs` | live (live run 2: 34k tokens an order saved) |
| Agent SDK launcher (hands-free operation) | starter | `launcher/` | M3: 10/10 orders, 0 typed commands |
| A company from a spec (rooms, skills, roles, flow) | starter | `generator.mjs`, `specs.mjs`, `specs/` | M2: toy and research specs generate and validate |
| The kernel as its own repository | starter | `export-kernel.mjs` | M1: 79/79 tests from the exported tree |
| The building: floors, rooms, bookings, with rules | starter | `building.mjs` | built (2026-10-21) |
| Meetings: private-then-revealed positions, objections travel with decisions, minutes | starter | `meetings.mjs` | built |
| Channels and broadcast | starter | `channels.mjs` | built |
| The tracker (Linear-like) | starter | `tracker.mjs` | built |
| Goals with levels and breakdown | starter | `goals.mjs` | built |
| Rituals as APIs (WBR, goal review, digests) | starter | `rituals.mjs` | built; M7 held 4 overdue rituals live |
| Leadership asks routed to the lowest level that can decide | starter | `asks.mjs` | built; K40 hold asks |
| Lane policy (the manager's code) | starter | `policy.mjs` | built |
| Budgets, approvals, refusals (governance) | starter | K13-K15, `inbox-export`, ledger gate | M5: 8 refusal classes tested |
| Async jobs outside the state lock | starter | `jobs.mjs` (K2) | built |
| Order workspaces (a git worktree per order) | starter | `workspace.mjs` (K5) | built |
| Durable stage artifacts | starter | `artifacts.mjs` (K24) | built (found live in M7) |
| Demo Crit acts onto orders | company (lesson) | `acts.mjs` (K23) | built |
| Contractors (off-org workers for work outside the flow) | starter | `contractor.mjs` | built |
| Divided ownership: owners, routed interface changes, borrowing | starter | `owners.mjs` (K29-K33) | built for Benchmark 8 |
| A learned playbook; rules with beliefs (K38) and from measured effects (K39) | starter | `learn.mjs` | built; K39 fix K40 |
| Org evaluation (do agents learn, improve, self-correct) | starter | `orgeval.mjs` | built |
| Discrete-event simulator | starter (tool) | `sim.mjs` | built |

## Proven in benchmarks, to be folded into the kernel

| Feature | Layer | Where | Evidence |
|---|---|---|---|
| Continuous member sessions (no rounds, no resets) | bench → starter | `bench11/run.mjs`, `bench12/run.mjs` | B11, B12 |
| Self-landing past a referee (`org sync`, `org land`, serialised, refused if main gets worse) | bench → starter | `bench11/org.mjs` | B12: 46 lands, none lowered main |
| Shared, visible budget; members may go idle; a live cost guard | bench → starter | `bench11/run.mjs` | B11, B12 (members stopped themselves) |
| Direct notes between members | bench → starter | `bench11/org.mjs` | B11: 45 notes; B12: 10 |
| The board with claims, evidence and wrong-if required | bench → starter | `bench9/board.mjs` | B9b onwards |
| Off-boarding into the knowledge base; on-boarding reads it | bench → starter | `bench11/run.mjs offboard`, `knowledge/` | 158 entries; read by every B12 member |
| Cost from transcripts (the SDK's cost is unreliable on resumed sessions) | bench → starter | `bench10/run.mjs`, `bench11/run.mjs` | B10 |
| Byte-exact output comparison | bench → starter | `bench10/judge.mjs` | B10 (found by an org member) |
| Mixed models in one org | bench → starter | `bench10`, `bench11`, `bench12` | B12: Sonnet members 46% of gains |

## Benchmarks and their material (Meta's research instruments)

| Feature | Layer | Where |
|---|---|---|
| B8 sandbox (uid, namespaces, egress proxy, broker, hooks, shims) | starter (sandboxing) | `bench8/` |
| The SQLite driver, headers, references, generated corpora, workloads | Meta research | `bench10/`, `bench11/` |
| SQLite's own test suite replayed through the driver | Meta research | `bench12/record.tcl`, `bench12/convert.mjs` |

## The lesson company's HQ (`src/app/hq/`)

| Feature | Layer | Where |
|---|---|---|
| The office: floors, rooms, who works where; replay from the event log | **starter** (to promote) | `HQ.tsx`, `Office.tsx`, `HqTop.tsx`, `src/lib/hq*.ts` |
| People panel, avatars | **starter** (to promote) | `PeoplePanel.tsx`, `people.ts`, `Avatar.tsx` |
| Library (markdown browser) | **starter** (to promote, as the knowledge browser) | `library/` |
| Whiteboards | starter candidate (meetings' board) | `whiteboard/`, `WhiteboardLinks.tsx` |
| Curriculum | company | `curriculum/` |
| Evaluation (pairwise leaderboard) | company | `evaluation/` |
| Personalization lab | company | `personalization/` |
| Design inspector | company | `design/` |
| Kudos | company (a starter candidate later) | `kudos/` |
| First Light initiative | company | `first-light/` |
| Releases, R&D, strategy | company | `releases/`, `rnd/`, `strategy/` |
| Press | company | `Press.tsx` |

## Onboarding (product/ONBOARDING.md)

| Feature | Layer | Where | Status |
|---|---|---|---|
| Org archetypes as templates (corporate, science, committee, dynamic workflow, population, single agent, open source) | starter | (to build: archetype specs for `generator.mjs`) | designed; evidence per archetype in ONBOARDING.md |
| The role catalog (111 roles today; generic part to the starter catalog) | starter (generic) / company (domain) | `company/roles/`, `tools/org/` | exists in System 3 Company |
| HQ developers in every company | starter | `hq-engineer` role | exists in System 3 Company |
| The onboarding plan (intake → archetype → roles → referee → budgets → generate → on-board → first review) | starter | ONBOARDING.md | designed |

## The lesson company's knowledge and process (`company/`)

| Feature | Layer | Where |
|---|---|---|
| Roles as data → onboarding docs and subagents | starter (the pattern); company (its roles) | `tools/org/`, `.claude/agents/` |
| Constitution, protected paths, gates | starter (the pattern); company (its gates) | `company/constitution/`, `tools/company.mjs` |
| Pattern language (patterns with confidence and refutation conditions) | starter candidate | `company/knowledge/patterns/` |
| Decisions, experiments, reviews, rituals, progress log | starter (the pattern) | `company/decisions/` and siblings |
