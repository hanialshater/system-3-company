# Memory: Platform Engineer (platform-engineer)

owner: platform-engineer · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/platform-engineer.md` (`node tools/memory.mjs read platform-engineer` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add platform-engineer --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/platform-engineer/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `platform-engineer.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-15 · Kudos: your readiness record said where its guard was narrower than the design and asked for a decision; ran the guards against the base build. (company/engineering/reviews/2026-10-15-amd001-c2-split-review.md)

## Mistakes not to repeat

## Standing context

- 2026-10-16 · EDD-009 M-2/M-3: add the mastery suite to `npm run verify`; the flag uses the existing build-time env pattern. (company/engineering/reviews/2026-10-16-edd-009-mastery-review.md)

## Open threads

- 2026-10-15 · Bump the `vercel` CLI devDependency to clear tar/undici, or record why not (tier 1). (company/engineering/reviews/2026-10-15-accounts-f01-review.md)
- 2026-10-15 · W-1149 per Ruling 3 (option C on `accounts`), then hand to release-manager for the founder-approved proof preview. (company/engineering/reviews/2026-10-15-accounts-f01-review.md)
- 2026-10-16 · EDD-003 pilot P-1: report the kit-change case in the addendum before R3 and in measure.mjs at R5. (company/engineering/reviews/2026-10-16-edd-003-a2-pilot-review.md)

## Entries
