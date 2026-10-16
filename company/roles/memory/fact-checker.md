# Memory: Fact-Checker (fact-checker)

owner: fact-checker · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/fact-checker.md` (`node tools/memory.mjs read fact-checker` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add fact-checker --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/fact-checker/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `fact-checker.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · During the next-build OOM you reused an existing server instead of starting a third (two-server cap in SO-10). Do that again. (company/rituals/records/2026-10-16-retro-build-oom.md)

## Mistakes not to repeat

## Standing context

- 2026-10-16 · Concurrent SO-10-2 runs (≤ 3) each need their own --agent label equal to the Agent call's description, or the second hits S3 "already held". (company/reviews/org/2026-10-16-slot-ledger-check.md)
- 2026-10-15 · Conflicting claim verdicts at a merge are resolved by a fact-checker, not by the merger (W-927). (company/rituals/records/2026-10-15-retro.md)
- 2026-10-16 · Commit as author fact-checker (GIT_AUTHOR_NAME); session 2 showed per-role authorship is cheap and makes independence auditable. (company/rituals/records/2026-10-16-retro-delegation.md)

## Open threads

- 2026-10-16 · Behavioral: your type (d) statement is partial (a-c only); if (d) is refused on this host the fold floor drops to 10. (company/rituals/records/2026-10-16-project-review-positions-principal-pm-verticals.md)

## Entries
