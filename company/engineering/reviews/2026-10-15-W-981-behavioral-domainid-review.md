# Engineering review: 2026-10-15: `behavioral` DomainId (W-981, playbook step 8)

owner: principal-engineer · tier: 2 (`src/kit/types.ts`) · commit 959ef69 on branch `domainid` · author: platform-engineer

- EDD: none, and none required. The kit change is one literal added to the `DomainId` union, the fourth time this exact edit has been made (books, big-ideas, history). An EDD here would be ceremony. ADR: none (reversible by one revert while no `behavioral` lesson exists). Amendment: none (no protected path touched).
- Readiness record: [2026-10-15-behavioral-domainid.md](../readiness/2026-10-15-behavioral-domainid.md). Its approval is principal-engineer-ops' to give (readiness/README.md: tier 2 is approved by principal-engineer-ops; principal-engineer approves only changes in the ops area, and this is not one). Not approved by this review.

Reviewed the artifact (the diff and the code that reads it) before the commit message and the record.

## Checks

| Check | Result | Evidence |
|---|---|---|
| Nothing else enumerates `DomainId` exhaustively | Pass | `DomainId` is used only in `src/kit/types.ts` (`DemoMeta.domain`) and `src/lib/feed-types.ts` (a field). No `switch`, no `Record<DomainId, …>`, no `satisfies`. The hand-kept lists of domain ids are all HQ ones: `src/app/hq/people.ts` HOME loop, `src/lib/hq-colors.ts` DOMAIN_COLOR, `src/lib/hq.ts` rooms, `tests/hq/floors.test.mjs` floor lists, `tools/org/roles.mjs` DOMAIN_NAMES. All gained `behavioral`. `tools/events.mjs` needs no entry: `roomFor("cm-behavioral")` defaults to `cm-behavioral` (no hyphen in the id, no strands). |
| Registry and loaders handle a domain with 0 lessons | Pass | The registry (`tools/company.mjs registry`) is built from lesson directories, not from domains, so an empty domain adds nothing. `check` loops over domains for curriculum, CM onboarding doc and charter (all present), then over lessons. `src/lib/hq-curriculum.ts` normalises a missing `subareas` to `[]`; `lifehacks` already ships without `subareas`, so the no-strands shape is not new. |
| Feed and catalog render an incubating domain | Pass (by reading; no server started) | Feed: `src/app/page.tsx` passes only domains with a visible lesson, so `behavioral` has no chip until its first lesson is visible, then gets one in `#e48fd6`. Catalog (`src/app/catalog/page.tsx`): one section per domain, the "incubating" tag from `status !== "active"`, the 17 concepts from `content/curriculum/behavioral.json` each "not yet taught". `/d/[slug]` finds the domain from `domains.json` once a lesson exists. |
| No protected path touched | Pass | The 10 files in 959ef69 against `company/constitution/protected-paths.txt`: no overlap (`src/kit/Lesson.tsx`, `tools/company.mjs`, `tests/qa/**` untouched). |
| `npx tsc --noEmit` | Pass | 6.3 s, no errors. |
| `npm run check` | Pass | 960 lessons, 5166 claims, 99 roles, 1 warning (pre-existing: `lifehacks/cue-needs-a-boundary` in review with a disputed claim). |
| `npm run test:hq` | Pass | 62/62, 10.3 s. |
| Colour | Pass | `#e48fd6` is 8.40:1 on the dark `--bg` `#0d0f14`, as the record says. On the light theme's `--bg` it is 2.13:1, in the same band as history (1.86), big-ideas (1.72) and chemistry (2.08). That is a property of every domain accent, not of this change. |

## Findings (problems, not fixes)

1. `npm run verify` (computer-use QA on a build) has not run on this branch. Step 8 and tier 2 both ask for it. The record lists check, tsc, test:hq, test:platform, test:publish, test:deploy and a dev-server smoke, which covers what this change can break. Verify still has to run on the integrated tree before merge (condition 1).
2. Not blocking, and not caused by this change: the domain colour is kept by hand in three places (`content/domains.json`, `src/lib/hq-colors.ts`, the room literal in `src/lib/hq.ts`), and no test compares them. They agree today. This is HQ debt for tools-lead/hq-engineer if they want it. It does not belong to W-981.

## Decision

**Approve the kit change (engineering review, playbook step 8).** Condition: (1) `npm run verify` passes on the integrated tree before merge, and the summary goes into the readiness record.

This review does not approve the readiness record. principal-engineer-ops still has to sign the Approval section before the branch merges to the deploy path.

Objections that travel with it: none raised.
