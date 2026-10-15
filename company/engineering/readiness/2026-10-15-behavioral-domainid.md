# Operational readiness: `behavioral` DomainId and catalog wiring (W-981, playbook step 8)

```
change: add DomainId "behavioral" to the kit type, a content/domains.json entry (incubating, colour #e48fd6, no subareas), and the HQ floor-6 office, colour and home for cm-behavioral
change-tier: 2
paths: src/kit/types.ts, content/domains.json, src/lib/hq.ts, src/lib/hq-colors.ts, src/lib/hq-floors.ts, src/app/hq/people.ts, tests/hq/floors.test.mjs, tools/org/roles.mjs, company/ops/changelog.md
author: platform-engineer
board: W-981 (and W-900's HQ office)
risks: none
links: branch domainid; playbook company/product/verticals/category-onboarding-playbook.md step 8; org record company/decisions/2026-10-15-behavioral-economics-org.md
```

Why tier 2: `src/kit/**` is tier 2 in paths.json. The kit change is one literal added to the `DomainId` union in `src/kit/types.ts`; nothing else in the kit, the lesson contract (`Lesson.tsx`), the registry generator or the meta.json schema changes. The same edit was made for `books`, `big-ideas` and `history`. Playbook step 8 also asks for a principal-engineer review when `src/kit/**` changes. Not approved: this branch must not merge to the deploy path until principal-engineer-ops approves below.

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
