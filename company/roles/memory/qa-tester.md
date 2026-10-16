# Memory: Computer-Use QA Tester (qa-tester)

owner: qa-tester · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/qa-tester.md` (`node tools/memory.mjs read qa-tester` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add qa-tester --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/qa-tester/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `qa-tester.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · On this host QA defaults to 2 workers; waiting out other builds instead of lowering the bar (and logging the OOM kills) was right. (company/rituals/records/2026-10-16-retro-build-oom.md)

## Mistakes not to repeat

- 2026-10-16 · A qa-tester run's own `rebase --autostash` push step in the shared checkout fed COE-B (SEV2). Never pull, rebase, stash, reset or push in the main checkout. (company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md)
- 2026-10-16 · A qa-tester commit to the single-writer files progress.md and board.json had to be dropped by the CoS. Never write them. (company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md)
- 2026-10-16 · /dev/null was replaced during a History QA run (COE-A): never create, link or write /dev/null except as a shell redirect target. (company/rituals/records/2026-10-16-coe-dev-null-replaced.md)

## Standing context

- 2026-10-16 · A QA record counts toward publish only with header "recorded by: qa-tester (company qa-record)" and commit author qa-tester. (company/rituals/records/2026-10-16-launch-review-r5.md)

## Open threads

## Entries
