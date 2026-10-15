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

## Approval (tier 2; written by principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
