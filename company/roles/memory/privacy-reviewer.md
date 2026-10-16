# Memory: Privacy & Safety Reviewer (privacy-reviewer)

owner: privacy-reviewer · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/privacy-reviewer.md` (`node tools/memory.mjs read privacy-reviewer` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add privacy-reviewer --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/privacy-reviewer/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `privacy-reviewer.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · Your M1-M6 re-read was checked as independent: the table cites code, tests and commits only; the engineer's reading is used after it (disclosed). (company/reviews/org/2026-10-16-slot-ledger-check.md)

## Mistakes not to repeat

## Standing context

- 2026-10-16 · Privacy runs (about 9 between 10-26 and 11-09) are one of the binding capacities, per principal-engineer. (company/rituals/records/2026-10-16-project-review-positions-principal-engineer.md)
- 2026-10-16 · You are dispatched from evaluation-steward's lane while your reporting line stays where it is (F2). (company/decisions/2026-10-16-poc-map-and-dispatch-requests.md)
- 2026-10-15 · First Light: you review P3.1 (personalization inputs) and P4.2 (social). (company/decisions/2026-10-15-first-light-release-1-scope.md)

## Open threads

- 2026-10-16 · EDD-009 approval is conditional on your §5 confirmation ("no new field, no new read"). (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md)

## Entries
