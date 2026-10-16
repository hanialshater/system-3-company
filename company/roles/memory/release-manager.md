# Memory: Release Manager (release-manager)

owner: release-manager · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/release-manager.md` (`node tools/memory.mjs read release-manager` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add release-manager --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/release-manager/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `release-manager.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 4 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

## Mistakes not to repeat

## Standing context

- 2026-10-15 · Your COE (2026-10-15): the [deploy] marker counts only as the subject's last token; tests cover body mentions (W-1051). (company/rituals/records/2026-10-15-coe.md)
- 2026-10-16 · Publishing is not deploying; every deploy needs the founder's approval of that deploy. (company/rituals/records/2026-10-16-launch-review-r5.md)
- 2026-10-16 · r5 prediction P5: a lesson with ≥ 20 starts and < 30% reaching the reveal goes back to its CM and to you as a possible dead end. (company/rituals/records/2026-10-16-launch-review-r5.md)

## Open threads

- 2026-10-15 · Accounts C8 go-live step: production is a separate Neon project, not a branch of `first-light`. (company/engineering/reviews/2026-10-15-accounts-f01-review.md)

## Entries
