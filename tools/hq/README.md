# tools/hq: System 3 Lessons in the System 3 city HQ

These are this company's tools for the city HQ (https://system3-city-hq.vercel.app). Meta's city build runs them to
read the company, as the city contracts require: the HQ reads a company only through its tools and its event log.
They moved here from `company/sibling/system3-meta/adapters/s3c/` on 2026-10-25, when System 3 Meta became its own
company (`hanialshater/system3-meta`). All of them are read-only.

| File | City contract | What it reads |
|---|---|---|
| `hq-city.json` | the city entry (`eventsCmd`, `orgCmd`, `buildingCmd`, `dashboardCmd`, `knowledgeCmd`, `docsCmd`), paths relative to this folder | |
| `hq-events.mjs` | event log v1 | `company/ops/events.jsonl` |
| `org-from-roles.mjs` | org, and `--building` for the seating | `tools/org/roles.mjs`, `people.mjs`, `src/lib/hq.ts`, `src/lib/hq-floors.ts`, `src/app/hq/people.ts` |
| `hq-dashboard.mjs` | dashboard, with `principles`, `features`, `releases`, `pipeline` | `company/mission.md`, `company/ops/projects.json`, `ledger.jsonl`, `founder-inbox.json`, lesson `meta.json`, `company/features.json`, `company/ops/releases.json`; `principles` from Meta's `$META/src/principles.mjs` (left out without Meta) |
| `lifecycle.mjs` | the dashboard's `pipeline`: one state machine per content type and every lesson's state, `since` and `waitingOn` (`node lifecycle.mjs ../.. --summary`, `--slug=<slug>`) | the state machines in `company/ops/projects.json` (each lane's `lifecycle` block: lane S edited by principal-pm-verticals, lane M by design-lead; one rule per state id here), lesson `meta.json`, `company/reviews/`, `company/ops/board.json`, `company/ops/releases.json`, `company/ops/publish-holds.json`, git; the gates through `tools/lib/readiness.mjs` |
| `principles.js`, `features.js`, `releases.js`, `pipeline.js`, `kudos.js`, `goals.js`, `wbr.js`, `issues.js`, `pages.json` | the city pages Principles, Features, Release log, Pipeline, Kudos, Goals, WBR and Issues (issues: `company/ops/board.json` through `hq-dashboard.mjs issuesOf`; WBR: the ritual's records, `wbrRecords`, and this week's live issue from Meta's WBR tool; goals derived by Meta's goals tool) (kudos: the event log's `kudos` events, which `hq-events.mjs` emits for each kudos of `tools/kudos.mjs`) (copied by Meta's `src/city-copy.mjs page <id>`; `"hq": "."` in hq-city.json carries them) | the dashboard |
| `hq-knowledge.mjs` | knowledge | `company/knowledge/` |
| `hq-docs.json` | config for Meta's docs tool (`$META/src/docs.mjs`) | the folders it lists |

Run one from the repo root: `node tools/hq/hq-dashboard.mjs .`. Publish the company's city snapshot from this folder,
with a checkout of system3-meta beside this repository (or set `META`):
`node ${META:-../../../system3-meta}/hq/build.mjs --city=hq-city.json --snapshot=system-3-company --out=<dir>`.
The logo the HQ draws on the company's building is `company/logo.svg` (the dashboard's `logo`).
Test: `node --test tools/hq/org.test.mjs tools/hq/dashboard.test.mjs tools/hq/lifecycle.test.mjs tools/hq/kudos.test.mjs`, and `tests/hq/city-door.test.mjs` (inside `npm run test:hq`).
