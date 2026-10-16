# Memory: HQ Engineer (hq-engineer)

owner: hq-engineer · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/hq-engineer.md` (`node tools/memory.mjs read hq-engineer` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add hq-engineer --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/hq-engineer/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `hq-engineer.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 3 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-14 · Keep the in-house markdown renderer: it cannot emit raw HTML, unlike a react-markdown stack. (company/engineering/reviews/2026-10-14-hq-library-review.md)

## Mistakes not to repeat

## Standing context

## Open threads

- 2026-10-14 · HQ library review changes C1-C5 (W-460 to W-464) are yours. (company/engineering/reviews/2026-10-14-hq-library-review.md)
- 2026-10-15 · Domain colour is kept by hand in three places (domains.json, hq-colors.ts, hq.ts) with no test comparing them. (company/engineering/reviews/2026-10-15-W-981-behavioral-domainid-review.md)

## Entries
