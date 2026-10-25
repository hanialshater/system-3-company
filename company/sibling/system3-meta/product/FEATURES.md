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

## The crew (the dynamic-workflow archetype), in the kernel since 2026-10-25

| Feature | Layer | Where | Status |
|---|---|---|---|
| Members land their own work past the company's referee (sync, land; refused if main falls; serialised; stale locks broken) | starter | `crew.mjs` | built; tests/crew.test.mjs (13 tests) |
| Notes, unread counts, the board (evidence and wrong-if required), claims that expire | starter | `crew.mjs` | built |
| Meeting minutes: members who met record title, attendees, decisions, objections and text (`crew minutes`) | starter | `crew.mjs` | built |
| The v1 event log (`events.jsonl`): crew.start, land, land.refused, sync, note, board.post, claim, idle, wake, spend, turn.error, meeting, crew.end | starter | `crew.mjs` | built: the contract for the starter HQ |
| The runner: continuous member sessions, the shared budget, idle and wake, a plateau stop, off-boarding into the knowledge base | starter | `crew-run.mjs` | built: `sdkSession({options})` for real members (the company passes its sandbox and permissions; the CLI refuses real members without `--sandboxed`); three failed turns in a row put a member idle |

## The starter HQ (`prototype/hq/`), since 2026-10-25

| Feature | Layer | Where | Status |
|---|---|---|---|
| A dependency-free server over companies' v1 event logs: `/api/city`, `/api/company/<id>/events`, `/api/company/<id>/knowledge` | starter | `hq/server.mjs` | built; tests/hq.test.mjs (6 tests) |
| A city file lists the companies (id, name, archetype, owner, events or a bench runs dir, knowledge) | starter | `city.json` (per install) | built |
| Health per company from its events: score, start, lands, refusals, spend vs budget, members, running or ended | starter | `hq/server.mjs health()` | built |
| Linear-like sidebar, few generic pages (city → company → Overview with landings, Rooms, Org, Board, Notes, Meetings, Knowledge); a page with no data is hidden; anything else is the company's own page (extension point) | starter | `hq/index.html` | built; refreshes every 15 s |
| Rooms: who works where, from the event log (a kernel event's `room`, else the area last claimed or posted about; idle, offline and gone apart) | starter | `hq/index.html` | built |
| Replay: a time slider and play over every page (score, rooms, org, notes as they were) | starter | `hq/index.html` | built |
| Org: reporting lines from the company's org file (written by tools: `onboard generate`, `hq/org-from-roles.mjs`), each node with its member's work; crews as peers under the owner | starter | `hq/index.html`, `/api/company/<id>/org` | built; System 3 Company's 109 roles render |
| Benchmark orgs shown live (status, notes, board, ledger read as v1 events) | Meta research (not in the starter) | `hq/bench2events.mjs` | built: B11, B12, B13 |
| Meetings page: the minutes members recorded, newest first | starter | `hq/index.html` | built |
| Extension point: a company's HQ developers add pages (`<hq>/pages.json`, ES modules exporting `render({events, knowledge, …})`), listed in its sidebar, served only from its hq folder | starter | `hq/server.mjs`, `hq/index.html` | built; generated companies get an empty `hq/` |
| Kernel companies (corporate archetype, `meta.mjs` state) in the HQ: closed meetings as `meeting` events with minutes, rooms from enter/leave, the org from its roles | migration bridge (not in the starter; the kernel will emit v1 itself) | `hq/kernel2events.mjs` | built |

## Onboarding (`prototype/onboard.mjs`), since 2026-10-25

| Feature | Layer | Where | Status |
|---|---|---|---|
| The first starter kit's archetypes as data: corporate, dynamic workflow, science, population, single agent | starter | `onboard.mjs ARCHETYPES` | built |
| One catalog of roles (System 3 Company's org as data until the migration), the starter layer marked, search by words | starter | `onboard.mjs loadCatalog, searchCatalog` | built |
| Org design proposal: by the chief of staff or the org-health head, one design and at least one alternative, each with its reason; the referee owner and HQ developers always included; new domain roles need a mission | starter | `onboard.mjs propose` | built; tests/onboard.test.mjs (6 tests) |
| The CEO's approval: only the company's owner approves one design | starter | `onboard.mjs approve` | built |
| Generation: company.json, crew.json (crew-shaped) or a spec skeleton (corporate), a knowledge base, a v1 event log, the city entry; a science company refused without a held-out referee | starter | `onboard.mjs generate` | built; the HQ shows it as onboarded |

## Proven in benchmarks, folded into the kernel (2026-10-25) or still to fold

| Feature | Layer | Where | Evidence |
|---|---|---|---|
| Continuous member sessions (no rounds, no resets) | **folded** | `crew-run.mjs` (from `bench11-13/run.mjs`) | B11, B12 |
| Self-landing past a referee (`org sync`, `org land`, serialised, refused if main gets worse) | **folded** | `crew.mjs` (from `bench11/org.mjs`) | B12: 46 lands, none lowered main |
| Shared, visible budget; members may go idle; a live cost guard | **folded** | `crew-run.mjs` (stop guard every 10 s) | B11, B12 (members stopped themselves) |
| Direct notes between members | **folded** | `crew.mjs` | B11: 45 notes; B12: 10 |
| The board with claims, evidence and wrong-if required | **folded** | `crew.mjs` | B9b onwards |
| Off-boarding into the knowledge base; on-boarding reads it | **folded** | `crew-run.mjs OFFBOARD, recordOffboard`; `knowledge/build.mjs` stays Meta's | 158 entries; read by every B12 member |
| Cost from transcripts (the SDK's cost is unreliable on resumed sessions) | **folded** | `crew-run.mjs transcriptCost` | B10 |
| Byte-exact output comparison | referee practice (each company's referee owns it; noted in the referee contract) | `bench10/judge.mjs` | B10 (found by an org member) |
| Mixed models in one org | **folded** | `crew.json` members' `model` | B12: Sonnet members 46% of gains; B13 adds Haiku |

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
