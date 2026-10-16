# Memory: Life Hacks Safety Reviewer (lifehacks-safety-reviewer)

owner: lifehacks-safety-reviewer · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/lifehacks-safety-reviewer.md` (`node tools/memory.mjs read lifehacks-safety-reviewer` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add lifehacks-safety-reviewer --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/lifehacks-safety-reviewer/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `lifehacks-safety-reviewer.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 4 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-14 · Review engine-hard-coded stage captions (HomeLesson.tsx Stage, WobbleStage, BowStage, CordStage) as well as the specs. (company/rituals/records/2026-10-14-eng-review-pr2.md)

## Mistakes not to repeat

## Standing context

- 2026-10-14 · Safety verdicts belong in company/reviews/<slug>/<date>-safety.md, never in a contributor's `safety` field. (company/rituals/records/2026-10-14-eng-review-pr2.md)
- 2026-10-14 · Your source-level screen of all 8 PR2 batches: 0 fails, about 10 pass-with-changes. (company/decisions/2026-10-14-pr2-lifehacks-scope.md)
- 2026-10-15 · Domain launch: your walkthrough attestation sits between fresh QA and head-of-product closing the record. (company/rituals/records/2026-10-15-domain-launch.md)

## Open threads

## Entries
