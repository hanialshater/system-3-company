# Changelog

## 2026-10-13: platform-engineer SPIKE-001 (scratch, never merged)
- `spike/` tooling and the `/spike` host route: 3 lessons as content-hashed ES module bundles against a shared kit, served from a second origin into `sandbox="allow-scripts"` frames with a postMessage bridge. No feed, lesson page, kit, gate, tests/qa or lesson source changed; no new dependency. Results: company/engineering/spikes/SPIKE-001-frontend-sandbox.md.

## 2026-10-13: release-manager deployment workflow
- `npm run deploy -- preview|production` and `/deploy`: linked-project validation, full verification,
  staged production, hosted smoke checks and durable deployment records. CLI pinned at 63.1.2.
- Production visibility applies to the feed, map and direct lesson pages; unpublished lesson URLs
  return 404 with `SHOW_REVIEW=off`. Preview keeps direct draft URLs for author QA.
- Validation: 13 deployment tests, 646 browser checks, and published-only production checks passed.
- No live deployment performed; account login/project link is one-time setup.
- GitHub Actions pipeline: automatic previews after successful default-branch CI; explicit manual
  production. CI uses locally built Vercel output, scoped deployment environments, pinned actions,
  run summaries and release-record artifacts. No GitHub write token is needed.

## 2026-10-12: founding
- App: vertical feed, lesson kit (predict → explore → reveal), spaced revisits, trust sheet, map, event beacon.
- Company: 26 roles (25 agents), constitution, 13 rituals with templates, gates, CLI, computer-use QA.
- Lessons: see `npm run company -- status`.
- 2026-10-12: geo kit re-exports geoProjection, geoConicEqualArea, geoStereographic (additive; cm-geography request).
- 2026-10-12: kit adds useMilestones (earn-the-reveal helper) and an .active:disabled style (wave 1 builder requests).
- 2026-10-12: kit adds src/kit/random.ts (mulberry32); standard documents QA control order and seed disclosure.
- 2026-10-13: reveal phase no longer squeezes the stage; the card body scrolls (tier 1, shared CSS).
- 2026-10-13: kit adds <Milestones> component (no inner Stage boilerplate needed); useMilestones always calls the latest interact.
- 2026-10-13: metrics count only learner verdicts on the current lesson version (revised lessons show 'needs re-review').

## 2026-10-13: HQ and the event log (company tools)
- `company/ops/events.jsonl` is an append-only event log (schema in `company/ops/events.md`). `tools/events.mjs` adds events and backfills them from git history and session transcripts: dispatches, reports, stop notices and founder messages. `tools/snapshot.sh` backfills before every commit.
- `/hq` shows the company as a floor plan (Sococo-style rooms with the agents working in them), plus a replay slider, a timeline strip and per-room threads. Clicking an event loads its brief or report. Any moment can be linked: `/hq?t=2026-10-13T06:20Z&room=build-floor`.
  - The Lobby shows rituals due and the board items waiting on the founder.
  - HQ is off in production unless `HQ_PUBLIC=1`, because it shows internal prompts. It goes behind the login once the backend lands.
- Event-driven rituals: `company/rituals/triggers.json` and `node tools/rituals-due.mjs`. The calendar table in the gate CLI stays as the upper bound until an amendment replaces it.
- HQ v2 (same day): every agent has a name and a generated face.
  - Names: residents have persona names (Ada, chief of staff; Kenji, principal engineer; the category managers Ravi, Lin, Bea…). Each running builder, checker or reviewer gets its own name from `tools/org/people.mjs`, and it keeps that name across replays.
  - Office: the rooms have furniture (desks, meeting tables, a lobby with sofas), floor textures and live status dots. A new Studio room holds the design roles.
  - **People tab:** the org tree from `tools/org/roles.mjs`, showing who reports to whom, who is working and where.
  - Onboarding docs now carry each role's name.
