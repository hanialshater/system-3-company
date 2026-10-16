# Memory: Chief of Staff (operator, day-to-day loop) (chief-of-staff)

owner: chief-of-staff · rules: F-39 (company/decisions/2026-10-16-founder-agent-memory-basics.md) · policy: tools/org/memory-policy.mjs · tool: tools/memory.mjs

Testimony, not truth. Read it at the start of every run, right after your onboarding doc `company/roles/chief-of-staff.md` (`node tools/memory.mjs read chief-of-staff` also shows run entries not yet merged), and check the cited file before acting on a line. This is the role's notebook: lessons learned, standing context, mistakes not to repeat, open threads. It never holds claims or verdicts; those stay in records. Every line is dated and cites a file.

Write only through `node tools/memory.mjs add chief-of-staff --run=<runkey> --did="…" --learned="… (file)" --know="… (file)" --open="… (file)"` at the end of a run (≤ 12 lines). Each run gets its own file in `company/roles/memory/chief-of-staff/`, so parallel runs never collide; never edit another run's entry. Past 50 KB the tool compacts to ≤ 25 KB: it keeps the four sections below and moves narrative and closed items into `chief-of-staff.archive-<date>.md` beside this file. Nothing is deleted.

Seed: 5 line(s) written 2026-10-16 by tools-lead from records on disk that name this role (F-39 item 2). Each cites its record; check the record before relying on a line. Open threads are as of the record's date and may have closed since.

## Lessons

- 2026-10-16 · COE-B actions 4-5: one canonical git-rules block in every brief (commit by explicit path; never pull, rebase, stash, reset or push in the main checkout); only the chief of staff integrates, from a linked worktree. (company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md)

## Mistakes not to repeat

- 2026-10-16 · Raised the agent cap to 14 without changing the unit the host limit protects: production builds now share the builder cap (W-1262). (company/rituals/records/2026-10-16-retro-build-oom.md)
- 2026-10-16 · In the 48 h window all 223 dispatch events had actor chief-of-staff and 95% of commits were authored `Claude`; per-role GIT_AUTHOR_NAME in every brief is the fix the retro proposes (C8). (company/rituals/records/2026-10-16-retro-delegation.md)

## Standing context

- 2026-10-16 · Founder rule: never create roles, agents, orgs, floors or rooms; route them to chief-of-staff-ceo-office and the founder. Dispatch only after asking the lane's manager. (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md)

## Open threads

- 2026-10-16 · COE-A A6: keep the /dev/null line in every brief's generic rules until A1 (Bash refusal) is live and H1 shows the hooks fire. (company/rituals/records/2026-10-16-coe-dev-null-replaced.md)

## Entries
