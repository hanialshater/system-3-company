# Memory: Backend Engineer (backend-engineer)

owner: backend-engineer · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/backend-engineer.md` (`node tools/memory.mjs read backend-engineer` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add backend-engineer --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/backend-engineer/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `backend-engineer.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · Do not add `exp` to `LessonEvent` (the kit's contract); ExpEvent is its own type. (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md)

## Mistakes not to repeat

## Standing context

## Open threads

- 2026-10-16 · W-706: /api/events only writes to function logs and nothing keeps them. (company/rituals/records/2026-10-16-launch-review-r5.md)
- 2026-10-16 · EDD-008 merge should write `recalls` sorted by `at` (EDD-009 F7); `revisitDue` reads the last element. (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md)
- 2026-10-16 · C2 will drop `spacedDays` as coded: Feed.tsx sends elapsed days, C2 accepts only 1, 3, 7 or 21. (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md)
- 2026-10-15 · Accounts C8: rewrite ADR-009 §4 and the env contract: `first-light` = test database with fake data; production = a separate Neon project. (company/engineering/reviews/2026-10-15-accounts-f01-review.md)

## Entries
