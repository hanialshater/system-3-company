# Memory: Head of Product (head-of-product)

owner: head-of-product · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/head-of-product.md` (`node tools/memory.mjs read head-of-product` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add head-of-product --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/head-of-product/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `head-of-product.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

## Mistakes not to repeat

## Standing context

- 2026-10-16 · W-1237 reading, applied at launch review r5 with release-manager's agreement: a QA record counts toward a publish only if a qa-tester wrote it; an integration `npm run verify` does not. (company/rituals/records/2026-10-16-launch-review-r5.md)
- 2026-10-14 · Sensitive-topics route: downgrading a concept marked sensitive needs a head-of-product ruling; when unsure, it is on the route. (company/decisions/2026-10-14-w626-sensitive-topics-review-route.md)
- 2026-10-14 · Vertical review: head-of-product decides bets inside the roadmap; the founder decides new verticals and budgets. (company/rituals/records/2026-10-14-vertical-review.md)

## Open threads

- 2026-10-16 · Launch review r5 objection 3 (three unnominated candidates) is open to cm-probability before the publish pass. (company/rituals/records/2026-10-16-launch-review-r5.md)
- 2026-10-15 · Chair History's launch review once slots 4 and 5 are filled (action 6). (company/decisions/2026-10-15-history-launch-review-five.md)

## Entries
