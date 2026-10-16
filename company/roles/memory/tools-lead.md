# Memory: Company Tools Lead (tools-lead)

owner: tools-lead · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/tools-lead.md` (`node tools/memory.mjs read tools-lead` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add tools-lead --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/tools-lead/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `tools-lead.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · Ghost in-flight counts were a backfill window gap; find the cause before hand-closing entries. (company/rituals/records/2026-10-16-retro-rounds-3-5.md)

## Mistakes not to repeat

- 2026-10-16 · W-716 sat `next` since 10-14 with a duplicate W-1175 owned by chief-of-staff: check ownership of record when a duplicate appears. (company/rituals/records/2026-10-16-retro-delegation.md)

## Standing context

- 2026-10-14 · Every engineering role owns the operational health and risk of what it builds; tier-2 changes need principal-engineer-ops approval. (company/decisions/2026-10-14-founder-risk-in-ops-review.md)

## Open threads

- 2026-10-16 · W-1404: the git backfill classifier types any commit subject saying COE/incident/SEV2 as an incident; classify only real declarations. (company/rituals/records/2026-10-16-retro-interval-1450.md)
- 2026-10-16 · COE-A A2/A3 (W-1183): dispatch-check host invariant for /dev/null, and the same test at SubagentStop. (company/rituals/records/2026-10-16-coe-dev-null-replaced.md)

## Entries
