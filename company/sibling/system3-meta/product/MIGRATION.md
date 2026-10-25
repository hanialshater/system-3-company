# Migration coverage: System 3 Meta and System 3 Company to their own repositories

owner: vp-meta · date: 2026-10-25 · status: **assessment** · founder, 2026-10-25: "assess meta features coverage for
migrating meta and system 3 company"; earlier: "if we are successful it will migrate (new repo) using the meta company";
"not everything should go to meta"; "the same for meta company, it should migrate"; "UI and tools should work together"

## Bottom line

- **Meta can move first: step 1 is done (§ "Step 1").** The kernel has exported itself before (M1:
  `export-kernel.mjs`, no path into System 3 Company). An export today passes 341 tests and fails 2 (the HQ and
  onboarding tests): the exporter predates `hq/`, `onboard.mjs`, the knowledge base and the product docs, and two of
  today's modules read System 3 Company's role catalog by relative path.
- **System 3 Company moves as itself, not onto the kernel.** It runs on its own operating system: `tools/company.mjs`
  (its gates, protected), its own event log (`company/ops/events.jsonl`: 6,767 events in its own schema), its own
  board, ledger, mailbox, memory, rituals and a Next.js HQ with 15 pages. The kernel ran its lesson flow only through
  adapters (`adapters/s3c`, milestones M4 to M7). Meta's starter kit covers the **contracts** it needs to join the
  city: the org contract is done; the event log and the knowledge base are not.
- **The biggest gaps:**
  1. System 3 Company's event log is not in the v1 schema, so the city's HQ cannot show it.
  2. The role catalog lives in System 3 Company, though onboarding draws on it for every new company.
  3. The progress log and decisions are shared between the two companies today.

## 1. Meta: what moves and what is covered

| Part | Where now | Moves as | Covered? | Gap |
|---|---|---|---|---|
| Kernel (engine, CLI, supervisor, building, meetings, channels, tracker, goals, rituals, asks, policy, jobs, workspaces, artifacts, contractors, owners, learn, orgeval, sim) | `prototype/*.mjs` | `src/` | **yes**: exported and tested (M1) | none |
| Crew (dynamic workflow), runner, sessions, minutes | `crew.mjs`, `crew-run.mjs` | `src/` | **yes**: exported (top-level modules) | none |
| Onboarding (archetypes, catalog, propose, approve, generate) | `onboard.mjs` | `src/` | **partly** | its default catalog is `../../../../tools/org/roles.mjs` (System 3 Company); a starter catalog must move with Meta (§3) |
| Starter HQ (server, page, adapters, org-from-roles) | `prototype/hq/` | `hq/` | **no**: not exported | add `hq/` to the exporter; `org-from-roles` stays a System 3 Company adapter (it reads that company's modules) |
| Tests | `prototype/tests/` (365) | `tests/` | **341 of 343 exported pass** | `hq.test.mjs` and `onboard.test.mjs` read `live/bench3-a` (not exported) and `tools/org` (System 3 Company); give them fixtures |
| Recorded runs (`live/`) | `prototype/live/` | `fixtures/` | **no** | export the recorded runs that tests use |
| Launcher (Agent SDK) | `prototype/launcher/` | `launcher/` | **yes** | none |
| Sandbox (B8: uid, namespaces, egress proxy, broker, shims) | `bench8/` | `sandbox/` | **no**: lives inside a benchmark | fold it out of `bench8/` as the starter's sandbox (FEATURES: "starter (sandboxing)") |
| Knowledge base (158 entries, KB.md, build) | `system3-meta/knowledge/` | `knowledge/` | **no**: not exported | export it; Meta's KB is company-owned |
| Product docs (FEATURES, STARTER, ONBOARDING, VISION, this file) | `system3-meta/product/` | `docs/product/` | **no** | export |
| Decisions | `system3-meta/decisions/` | `docs/decisions/` | **yes** | none |
| Benchmarks (B6-B13): harnesses, write-ups | `prototype/bench*/` | `research/` | **partly**: write-ups at the top level only | harnesses and material: SQLite's source tarball and test material are in the scratchpad, not the repo (re-fetchable: `get-sqlite.sh`, Ubuntu archive) |
| Meta's own operations: its progress log, its board, its events | **System 3 Company's** `company/ops/progress.md`, board | Meta's own | **no** | Meta has no event log or org file of its own: as company zero it needs a city entry like any company (`orgCmd` from `ROLES.md`, a v1 log of its runs) |
| CI | System 3 Company's `npm run` scripts | Meta's own | **no** | a CI workflow that runs the kernel's tests (`.github/workflows/ci.yml` in System 3 Company is protected and does not run Meta's tests) |

## 2. System 3 Company: what it has, and what the starter kit covers

The rule (founder, 2026-10-25): not everything goes to Meta. A company keeps what is its own; the starter kit gives
what every company needs; the contracts connect them. "Covered" below means the starter kit has it, or the contract
lets the city read it.

### 2a. Generic company machinery (every company needs it)

| Capability | System 3 Company has | Starter kit | Covered? | Action |
|---|---|---|---|---|
| Seating (rooms, floors, home rooms) | `src/lib/hq-floors.ts`, `src/lib/hq.ts` ROOMS, `src/app/hq/people.ts` HOME | the org contract's seating fields | **yes, through a bridge**: the adapter reads those TypeScript files as text; System 3 Company should move its seating into `tools/org` (its own work) |
| The org as data | `tools/org/roles.mjs`, `people.mjs` (109 roles, names) | the org contract | **yes**: live via `hq/org-from-roles.mjs` | the adapter moves with System 3 Company |
| Roles → onboarding docs and subagents | `tools/org/generate.mjs` → `company/roles/*.md`, `.claude/agents/*.md` | generator writes ORG.md, CONTEXT.md only | **no** | promote the pattern: the generator writes agent files from the org contract |
| The role catalog | `tools/org/roles.mjs` (generic and domain roles mixed) | `onboard.mjs` reads it by path | **no** | split: the 11 generic roles (`STARTER_ROLES`) into Meta's catalog; domain roles stay |
| Event log | `company/ops/events.jsonl` (`ts`, `type`, `room`, `actor`, `summary`; 20 types) | v1 (`v`, `t`, `type`, `by`) | **no** | an `events` command in System 3 Company's tools that prints v1 (`ts→t`, `actor→by`; `room` kept), the same way as the org contract; then the city HQ shows its rooms, notes, kudos, decisions |
| Operating picture | `company status` | HQ Overview; `crew status`; `meta.mjs` status | **partly** | the HQ reads the picture through the event log; the CLI stays the company's |
| Board and triage | `board.json`, `tools/triage.mjs` | kernel `tracker.mjs` | **partly** | the tracker is the starter's; System 3 Company keeps its board until it chooses to adopt the tracker |
| Mailbox | `tools/mailbox.mjs` | kernel mailbox | **yes** (equivalent) | none |
| Role memory and off-boarding | `tools/memory.mjs` (per role, compacted) | crew off-boarding into the knowledge base | **partly** | per-role memory is a starter candidate; the KB format (entries with evidence and belief) is the starter's |
| Knowledge and library | `company/knowledge/` (patterns), `src/app/hq/library` | the HQ's Knowledge page (KB entries) | **partly** | add a markdown library page (a starter candidate) or keep it as a company page |
| Rituals | `company/rituals/`, `rituals-due.mjs`, slash commands | kernel `rituals.mjs` | **partly** | different implementations; the city reads rituals as events |
| Meetings and minutes | `company/meetings/` | kernel meetings, `crew minutes`, HQ Meetings page | **partly** | System 3 Company's meetings reach the HQ once its events are v1 |
| Spend ledger and budgets | `tools/ledger.mjs`, `projects.json` | crew spend events, kernel budgets | **partly** | spend as v1 `spend` events |
| Gates, constitution, protected paths, hooks | `tools/company.mjs` (protected), `.claude/hooks/` | kernel governance (refusals, approvals); the pattern | **pattern only** | the gates are the company's; the protect hook is a starter candidate |
| Risks, ops health, metrics, incidents (COE) | `risks.mjs`, `ops-health.mjs`, `metrics.mjs` | none | **no** | starter candidates after a second company needs them |
| Kudos | `tools/kudos.mjs` (as events) | none | **no** | starter candidate (already events) |
| Code evolution (the population archetype) | `tools/evolve.mjs`, `company/rnd/` | `onboard` lists population, with no runner | **no** | promote `evolve.mjs` as the population archetype's runner |
| Deploys (Vercel, founder approval) | `tools/deploy.mjs`, runbook | none | n/a | the company's |

### 2b. The company's own (moves with it, never to Meta)

Lessons and their contract (`src/demos`, `src/kit`), claims and fact-checking, walkthroughs, QA (Playwright, the
computer-use contract), accessibility, publishing, curriculum and category managers, pairwise evaluation, the
personalization lab, illustrations, the lesson HQ pages (curriculum, evaluation, personalization, design, releases,
R&D, strategy, first light, press), accounts and the learner database, and its 85 domain roles.

### 2c. The HQ

System 3 Company keeps its Next.js HQ: it is the company's own, built by its HQ developers. The city's starter HQ
shows it through the contracts (org now, events next). The starter HQ already has System 3 Company's office look,
org tree, replay and meetings in a generic form. Porting the company's 15 pages into the starter is not the plan.
They are company pages; a company that wants one in the city HQ adds it through the extension point.

## 3. Order of work

1. **Meta export, complete** (about a day):
   - add `hq/`, `knowledge/`, `product/`, the recorded runs the tests need, and the benchmark harnesses to
     `export-kernel.mjs`;
   - give the HQ and onboarding tests fixtures;
   - move the 11 generic roles into Meta's own catalog (`catalog/roles.json`, same fields as the org contract);
   - give Meta its own city entry (org from `ROLES.md`, a v1 log of its runs);
   - prove it by exporting and running every test, with no path into System 3 Company.
2. **System 3 Company joins the city through contracts** (about a day, in its own tools, by its own roles):
   - an `events` command printing v1 (the org adapter is done);
   - its city entry: `orgCmd`, `eventsCmd`, `knowledge`.
3. **Split the shared records:**
   - Meta's progress log, board and decisions out of `company/ops/` into Meta's repository;
   - System 3 Company keeps its own.
4. **The repositories** (the founder provides them):
   - push Meta's export;
   - move System 3 Company as-is, with its history;
   - both CIs green;
   - the city file names both.
5. **Promote candidates as a second company needs them:**
   - generator → agent files;
   - per-role memory;
   - kudos;
   - risks and ops health;
   - `evolve.mjs` as the population runner;
   - the sandbox out of `bench8/`.

## Step 1: done (2026-10-25)

| Item | Result |
|---|---|
| Export complete | `export-kernel.mjs` now exports `hq/`, `catalog/`, `org/`, `ops/`, `knowledge/`, `company.json`, `milestones.json`, the product docs and `research/` (the benchmark write-ups; harness code only for benchmarks that did not run on System 3 Company). **A clean export passes 359 of 359 tests, with no path into System 3 Company.** Left out: 4 `s3c-*` specs, `m5-refusals`, the code of B6-B9 (and with B8, the sandbox: still to fold out) |
| Meta's own catalog | `catalog/roles.json`: the 11 generic roles; `onboard.mjs` reads it plus any domain catalogs |
| Meta's own records | `org/org.json` (through `orgfile.mjs`, the org contract validated), `company.json` (mission, budget lines), `milestones.json`, `ops/progress.md` (Meta's handoffs, copied from System 3 Company's log), `ops/events.jsonl` |
| Dashboards | the HQ's Dashboard page and city totals, through `dashboard.mjs` (the dashboard contract) |
| Vercel | `hq/build.mjs`: a static snapshot (each company's tools run once at build time; no server, no secrets). The export carries `vercel.json` (build only `[deploy]` commits, the founder's rule) and `hq/city.example.json` (Meta as company zero) |
| CI | the export carries `.github/workflows/ci.yml`: `npm test`, then the static build |
| System 3 Company's org adapter | moved to `adapters/s3c/org-from-roles.mjs`, with its own test; it stays with the company |

## 4. System 3 Company's restructuring before it moves (founder, 2026-10-25)

Founder: "system 3 co need restructuring though to streamline, different content type, multi level/priority/budget
based execution". It is System 3 Company's own work: board item W-2002, owner chief-of-staff-ceo-office (the
org-health head), a proposal with alternatives to the founder. What the kernel already offers it:

| Ask | Kernel feature it can adopt |
|---|---|
| Different content types (beyond the single-card lesson: courses, sequences, book summaries, …) | several flows per company, one per content type (K19 `flows`, `order new --flow=`), each with its own stages, signers and checks |
| Multi-level execution | goals with levels and breakdown (`goals.mjs`); asks routed to the lowest level that can decide (`asks.mjs`); lane managers with their policy (`policy.mjs`) |
| Priority-based execution | mailbox priorities (`now`, `next`, `later`) and the supervisor's plan; the tracker's priorities |
| Budget-based execution | lane budgets, approval over limits, refusals (K13-K15, M5); budget lines on the dashboard (`dashboard.mjs`) |
| Streamlining | org evaluation (`orgeval.mjs`) and org gaps (`org gaps`) to find unused, overlapping or missing roles; 85 domain roles today |

Order: restructure first (in System 3 Company, by its roles), then move it as-is to its own repository.

## What is not covered by any plan yet

- **CI for Meta.** System 3 Company's CI is protected and does not run Meta's tests.
- **Secrets and deploy settings** (Vercel). These are System 3 Company's and move with it, untouched.
- **The benchmark material.** SQLite's source and the replayed test suite are re-fetchable but large. They belong
  outside the repositories (a release asset or a fetch script, as `get-sqlite.sh` already does).
