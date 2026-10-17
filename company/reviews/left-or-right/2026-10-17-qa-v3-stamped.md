# Computer-use QA: left-or-right (stamped re-file)

date: 2026-10-17 · harness: tests/qa/contract.spec.ts · recorded by: qa-tester · result: **pass**

lesson version: v3

built from b0ef6f706 (worktree branch worktree-agent-a2422c26987721bcd, own production build `npm run build` with NEXT_DIST_DIR=.next-lor17b, `next start` on :38517, Chromium from /opt/pw-browsers). meta.json version at run time: 3.

Why this record exists: AMD-013 review condition C3b (company/engineering/reviews/2026-10-17-amd013-review.md) found that the newest QA record, 2026-10-17-qa-v3.md, has no `lesson version: vN` line. `company qa-record` cannot stamp the version today (it writes a fixed body, tools/company.mjs cmdQaRecord, and would overwrite the same-day 2026-10-17-qa.md), so this is the hand-written form. This run re-executed only the contract; the hand sessions, order matrix and c1-check findings stay in 2026-10-17-qa-v3.md (run on e3aecea8, same lesson version 3) and are not repeated here. I did not diff the lesson between e3aecea8 and b0ef6f706 beyond meta.json version 3 being unchanged.

Contract run: `QA_ONLY=left-or-right npx playwright test tests/qa/contract.spec.ts`, 0 retries.

| Viewport | Result | Retries | First error |
|---|---|---|---|
| phone | passed | 0 | none |
| desktop | passed | 0 | none |

Not covered: Safari/WebKit is not available on this host (no WebKit binary). This run does not replace the WebKit check that release ruling r9 requires (W-1661); that check is still owed. Feed spec was not run.

A pass means the contract held in a browser. It is not evidence that anyone learned.
