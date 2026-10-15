# Operational readiness: `behavioral` DomainId and catalog wiring (W-981, playbook step 8)

```
change: add DomainId "behavioral" to the kit type, a content/domains.json entry (incubating, colour #e48fd6, no subareas), and the HQ floor-6 office, colour and home for cm-behavioral
change-tier: 2
paths: src/kit/types.ts, content/domains.json, src/lib/hq.ts, src/lib/hq-colors.ts, src/lib/hq-floors.ts, src/app/hq/people.ts, tests/hq/floors.test.mjs, tools/org/roles.mjs, company/ops/changelog.md
author: platform-engineer
board: W-981 (and W-900's HQ office)
risks: none
approved-by: principal-engineer-ops
approved: 2026-10-15
links: branch domainid; playbook company/product/verticals/category-onboarding-playbook.md step 8; org record company/decisions/2026-10-15-behavioral-economics-org.md
```

Why tier 2: `src/kit/**` is tier 2 in paths.json. The kit change is one literal added to the `DomainId` union in `src/kit/types.ts`; nothing else in the kit, the lesson contract (`Lesson.tsx`), the registry generator or the meta.json schema changes. The same edit was made for `books`, `big-ideas` and `history`. Playbook step 8 also asks for a principal-engineer review when `src/kit/**` changes. This branch was not to merge to the deploy path until principal-engineer-ops approved it below. It was approved on 2026-10-15, with the flake on record (see "Decision on the verify result").

1. **What can fail.** (a) A union member with no matching `content/domains.json` entry (or the reverse) would make a lesson's chip, colour or catalog section undefined. Both are added in the same commit, and `npm run check` validates domains against content. (b) `npm run check` now validates `content/curriculum/behavioral.json`; a malformed edit by cm-behavioral would now fail check instead of being ignored. That is intended. (c) The HQ office could overlap a room on floor 6. Worst case: a learner-facing page breaks for one category. With no `behavioral` lessons yet, learners see only a catalog heading marked "incubating".
2. **How we would know.** `npm run check` (passes: 960 lessons, 17 behavioral concepts in coverage), `npx tsc --noEmit` (passes), `npm run test:hq` (62/62, including the floor plan's no-overlap test, full-size offices and homes), `npm run test:platform` (16 pass, 3 skipped because they need a production build), `test:publish` 8/8, `test:deploy` 17/17. Dev server smoke on :3681: `/`, `/catalog` (lists "Behavioral Economics and Irrational Behavior"), `/hq` (office "Behavioral Econ") and `/hq/curriculum` return 200.
3. **How to roll back.** `git revert <sha>`, under a minute, no data loss. Revert only if no `src/demos/behavioral/` lesson exists yet; after that, the lesson's `domain` would no longer typecheck.
4. **Capacity.** None. One more JSON entry, one more SVG room, and one more catalog section.
5. **Security.** No new route, parameter or script. `categoryManager: cm-behavioral` reaches pages the way every other domain's role id does (tests/platform/internal-strings.mjs allows it).
6. **Data.** No learner data. Static content only.
7. **Risks.** None added or closed.

## Engineering review (principal-engineer, playbook step 8)

Kit change approved, 2026-10-15: [reviews/2026-10-15-W-981-behavioral-domainid-review.md](../reviews/2026-10-15-W-981-behavioral-domainid-review.md). There is no EDD because none is needed for a one-literal union addition. Condition: `npm run verify` passes on the integrated tree before merge, and its summary is pasted here. This is not the readiness approval. That comes from principal-engineer-ops below, because this change is outside the ops area.

## Approval (tier 2; written by principal-engineer-ops, 2026-10-15)

- Decision: **withheld until `npm run verify` has run. Not approved, and not refused.** I am not signing "approved with conditions" now. Nothing in the diff is the problem. The one missing piece of evidence is the piece the condition asks for, and an approval granted before it exists only claims that it will exist.
- Why withhold, and not sign with a condition:
  1. Signing buys no time. The principal engineer's condition already stops the merge until verify passes, so an approval now would not let the branch move any earlier. It would only put `approved-by: principal-engineer-ops` in the header before the evidence exists.
  2. The header is the gate, and nothing enforces a condition written below it. `tools/readiness.mjs` (EDD-007) does not exist yet, so the release manager checks the header by hand (readiness/README.md). Someone reading `approved-by` would take the record as approved, whether or not the verify summary had been pasted in. A condition with no meter attached is just a promise.
  3. Verify covers what the record's own evidence skips. The record's checks are all source-level or dev-server ones, and three `test:platform` tests were skipped because they need a production build. Verify's `build` and `qa` steps are the only ones that run the production catalog and the feed with the new domain. "The host is busy" explains why verify hasn't run. It does not stand in for a result, and the last integrated-tree verify on this host was OOM-killed (W-408). A run that is killed or times out counts as "not run", not "passed".
  4. The integrated tree does not exist yet. `domainid` branches from 5eb4c2e, and the integration branch (`ccr-4c6c7654-ew9ko1`) has since gained two commits (e6805f4 publishes 40 r7 lessons). The only overlap in touched files is one history meta.json, but r7 is still moving, so a verify run on `domainid` alone would not be the run the condition asks for.
- What I checked myself before deciding (read only; no server or build): the 959ef69 kit diff is the single `| "behavioral"` literal in `src/kit/types.ts`, and the `content/domains.json` entry matches the record (incubating, `#e48fd6`, `cm-behavioral`, no subareas). I agree with the principal engineer's review on the DomainId consumers and the 0-lesson paths, and sections 1 and 3 to 7 of this record need nothing more from me. Section 2 needs the verify result.
- What turns this into "approved" (one edit, by principal-engineer-ops, no new review needed):
  1. `domainid` is merged with (or rebased onto) the current head of the integration branch, after r7 has landed there.
  2. `npm run verify` runs on that tree, once the host is free of the r7 build (one build at a time; no parallel build with r7), and exits 0. Its summary goes in this record under "Verify (integrated tree)": the commit sha it ran on, every step's pass count (test:deploy, test:publish, test:lifehacks, test:kit, test:hq, check, typecheck, build, qa), the QA total and the wall time. A summary that names no sha, or a different one, does not count.
  3. The QA run includes `/catalog` showing the "Behavioral Economics and Irrational Behavior" section marked incubating, or the summary says which QA spec covers the catalog. Owner of 1 to 3: platform-engineer, under W-981.
  When those are in the record, I add `approved-by: principal-engineer-ops` and `approved:` to the header.
- What would make me refuse: verify fails in a step this change can affect (check, typecheck, build, test:hq, or qa on `/`, `/catalog`, `/hq`). It would also make me refuse if a `src/demos/behavioral/` lesson lands on the branch before merge, because the rollback in section 3 would then stop working as written.
- What would make me revoke an approval once given: the sha in the verify summary is not an ancestor of the merged commit, or the branch gains a kit or `domains.json` change after verify ran.
- Conditions, each with a board id: none yet (no approval to put conditions on). The steps above sit on W-981 (platform-engineer). This session was told not to edit board.json, so the caller should add a note to W-981 that the readiness approval is withheld until the verify summary arrives.
- Objections raised, and what happened to each: none raised by the author or the principal engineer. Mine is the one above (approve now or wait for verify), and this record answers it: wait. Not adopted: the principal engineer's non-blocking finding 2 (domain colour kept by hand in three places with no test). That belongs to tools-lead or hq-engineer as HQ debt, not to this change, and it does not affect readiness.

## Verify (integrated tree; platform-engineer, 2026-10-15, W-1050)

Result: **`npm run verify` exited 1. It did not pass.** One QA test timed out, and every other step passed. The run is complete: it was not OOM-killed and did not time out.

- Commit: `c58c6da28e3f61ae29afc70f1778573b14cdc02c`, which is `domainid` rebased onto `ccr-4c6c7654-ew9ko1` at `8b998d2` (r7 release log, the branch head when fetched at about 17:08Z). The rebase was clean, with no conflicts. Verify then ran on that rebased tree.
- Command: `NEXT_DIST_DIR=.next-dom QA_PORT=3683 npm run verify`, run detached on an otherwise idle host (4 cores, 15 GB, no other build). Playwright used its default 2 workers, because verify passes no `--workers` flag.
- Wall time: 5751 s (1 h 36 min) for the whole verify run. QA alone took 5591 s.

| step | result |
|---|---|
| test:deploy | 17/17 pass |
| test:publish | 8/8 pass |
| test:lifehacks | 64/64 pass |
| test:kit | 97/97 pass |
| test:hq | 62/62 pass |
| check | passed: 960 lessons, 5166 claims, 99 roles, 1 warning (`lifehacks/cue-needs-a-boundary` is in review with a disputed claim; this warning predates the change) |
| typecheck | pass (`tsc --noEmit`, no errors) |
| build | pass: compiled in 38.6 s, 1995/1995 static pages |
| qa | **1929 passed, 1 failed, 0 skipped, 0 flaky, 1930 total** |

The QA failure was `[phone] tests/qa/contract.spec.ts:38 › sudden-skill-or-strict-score › follows the lesson contract`, with "Test timeout of 45000ms exceeded" (50.5 s) inside the dead-control loop (`page.waitForTimeout(450)` at contract.spec.ts:90). This lesson is `src/demos/ai/sudden-skill-or-strict-score`. This branch does not touch it, and it is not a page this change can reach (the change affects `/`, `/catalog` and `/hq`). It passed in the r7 run (5eb4c2e, 1930/1930). Diagnostic rerun, on the same build and commit: `playwright test -g sudden-skill-or-strict-score --repeat-each=3` gave 6/6 passed (phone and desktop, 6.3 to 8.3 s each). I read it as a timing flake under a 2-worker load, not a defect. That reading is mine, and the rerun does not turn this verify run into a pass.

`/catalog` with the Behavioral section: the QA spec `tests/qa/feed.spec.ts:49` ("the map shows taught and untaught concepts", passed on phone and desktop) loads `/catalog`, but it asserts only that some `.domain-block` is visible, not that this section is. So I checked the section directly. I ran `next start -p 3684` on the same `.next-dom` build and fetched `/catalog`, which returned HTTP 200 with this heading:

```
<section class="domain-block" style="--domain:#e48fd6"><h2><span class="tag domain">Behavioral</span> <!-- -->Behavioral Economics and Irrational Behavior<span class="tag status">incubating</span></h2>
```

The section's concepts follow, each marked "not yet taught". I then stopped the server.

Drift since the run: `ccr-4c6c7654-ew9ko1` gained `45e8fce` (fact-check pass 49) and `cd38642` (board) at 17:17Z, after the fetch. They touch only lesson `meta.json` claim statuses, fact-check reviews and `board.json`. None of them touches the kit, `content/domains.json`, code or tests, and `git merge-tree` shows they merge cleanly with this branch. If the branch is merged rather than rebased again, `c58c6da` stays an ancestor of the merge commit.

For principal-engineer-ops: verify did not exit 0, so condition 2 is not met as written. The one failing test is on a lesson outside this change and passed on rerun. Two ways forward: re-run verify (or only `npm run qa`) on the integrated tree, or accept this run with the flake recorded. Choosing between them is your call, not mine.

## Decision on the verify result (principal-engineer-ops, 2026-10-15)

Decision: **approved, with the flake on record (option a).** I have added `approved-by` and `approved` to the header. No further run is required.

My condition said "exits 0", and this run exited 1. I am not pretending it was met. I am changing my own condition, and here is the reasoning so the next reader can disagree with it:

1. **The one allowed re-run has already happened.** House practice allows one re-run to confirm a flake. The diagnostic run above was exactly that: the failing spec, on the same build (`.next-dom`) and commit (`c58c6da`), covering the phone project that failed. It passed 6/6, with each run at 6.3 to 8.3 s against a 45 s budget. Requiring option (b) would repeat a run we already have. Option (c) would take the host for about 1 h 36 min to re-run the same 2-worker load that produced the timeout. That might show the flake again, but it would tell us nothing new about this change.
2. **The failure is outside every step I said would make me refuse.** Check, typecheck, build and test:hq all passed. In QA, every test on `/`, `/catalog` and `/hq` passed, and so did 1929 of 1930 tests overall, including every other lesson page that reads `content/domains.json`. The failing lesson (`ai/sudden-skill-or-strict-score`) is in a domain whose entry this change does not edit. It failed while waiting in the dead-control loop (`waitForTimeout(450)`), not on an assertion, and it passed in the r7 run (1930/1930). The record also shows this lesson was slow under load before this change: the wave-J QA board item says builder runs of these ai drafts needed `--timeout=240000`.
3. **The evidence my condition existed to obtain is here.** I asked for verify because it was the only route to a production build and QA of the feed and catalog with the new domain. Both exist, and both are pinned to a sha that is an ancestor of the integration work. The `/catalog` section was checked directly on that build (quoted above), because no QA spec asserts it.

"Flake" is a label, not a root cause. Accepting this run does not close the question. It moves it to the owner:

- **W-1056 (evaluation-steward):** root-cause the timing budget of the dead-control loop under 2 workers. This does not block the merge. If it shows the timeout depends on anything this change touches (domains.json loading, catalog or feed rendering), the approval is revoked and verify re-runs in full.
- **W-1057 (evaluation-steward):** add a `/catalog` assertion that names the domain section. This does not block the merge.

Merge conditions (release manager checks them by hand, because `tools/readiness.mjs` does not exist yet):

- Merge `domainid` into `ccr-4c6c7654-ew9ko1`. Do not rebase it again, so that `c58c6da` stays an ancestor of the merge commit. I checked the drift since verify ran (`45e8fce`, `cd38642`, `f171174`): it is only meta.json claim statuses, fact-check reviews and board.json. None of it is kit, `content/domains.json`, code or tests.
- The revoke clauses in the approval section above still apply. The approval is revoked if `c58c6da` is not an ancestor of the merged commit, if the branch gains a kit or `domains.json` change after verify, or if a `src/demos/behavioral/` lesson lands before the merge.
- Merging is not deploying. A deploy of this change still needs the founder's approval of that specific deploy.

Objections, and what happened to each: (i) Mine: "the condition said exit 0". I answered it above: I amended it and recorded why. (ii) The house rule that "flake is not a root cause". It is adopted as W-1056 with an owner, and the revoke trigger above is attached to it. (iii) The author's offer of a re-run or acceptance. Acceptance was chosen, for reasons 1 to 3.
