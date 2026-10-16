# Decision: production /catalog does not show unreleased algorithm lesson titles (PR #6 merge condition M6)

owner: cm-cs (Lin)
date: 2026-10-16
status: decided (cm-cs, what the CS map shows); the code change is platform-engineer's (requirement below), tier 1
class: product (category map)
board: W-1575 (this decision); the platform-engineer requirement is a new board item
route: principal-engineer review F4/M6 (`company/engineering/reviews/2026-10-16-pr6-engineering-review.md`) → cm-cs (this record) → platform-engineer (code) → principal-engineer (any engineer's diff read is enough, it touches only `src/app/catalog/page.tsx` and `tests/algorithms/catalog.test.mjs`)
head read: `pr6/cs` at `d11073e6`

## The question

PR #6 adds an "Algorithms" section to the CS block of `/catalog` (`src/app/catalog/page.tsx:52-80`), built from `content/algorithms-200.json`. In production every one of the 200 lessons is a draft, so none is linked or served (`src/lib/visibility.ts`, `statusVisible`). But the section still renders all 200 concept names, which are byte-equal to the draft lesson titles (concept id equals slug), the copy "200 planned lessons across 20 topics. Links appear as lessons become visible.", "{n} visible · {m} planned" per topic, "Not yet visible" twenty times and "not yet visible" per row. M6: may production show this, or does the section render only when an algorithm lesson is visible?

## Decision

**No. Production does not show the titles of unreleased algorithm lessons, nor any planned-count copy.** The section renders only what is visible in the deployment, and nothing at all when no algorithm lesson is visible. This is option 2 of M6, tightened so that it does not reopen when the first lesson is promoted.

## Why

1. **These are lesson titles, not curriculum concepts.** The map's existing practice ("not yet taught", `page.tsx:92`; PRD-001 item 7; `tests/qa/feed.spec.ts:53-57`) lists concepts: topic labels such as "Binary search: halving the haystack" that exist independently of any lesson. The 200 algorithm "concepts" were minted from the lessons (id = slug, name = title). Showing them is showing the catalogue of unreleased drafts by another route. The founder's W-479 ruling (`company/decisions/2026-10-15-founder-show-review.md`) keeps *review* lessons visible and says drafts "should not be reachable in production"; First Light's launch catalog is "published lessons only" (`company/decisions/2026-10-15-founder-first-light.md` item 7). A list of every draft title is not a reach, but it is the same thing in spirit, and nothing in the product rules asks for it.
2. **120 of the 200 titles are declarative sentences, and none is a recorded claim.** Examples: "Searching is cheaper than shifting" (`algo-binary-insertion`), "Equal sizes carry into a tree", "A lower key can cut a subtree" (script over `content/algorithms-200.json`: 120 names do not end in "?"). The rule is that every factual sentence a learner sees is a claim with support (CLAUDE.md; `company/product/demo-standard.md`). In the lesson, a title sits next to the claims and the gates that check them; on the map it would stand alone, unchecked, with 4,401/4,401 of the lessons' claims still unverified. The existing curriculum names are labels, not assertions, so they do not raise this.
3. **"200 planned lessons" is a product promise nobody has signed, and it may not be kept.** Head-of-product signs every product promise, and there is "no promise of an unshipped feature" (`company/decisions/2026-10-14-marketing-org.md:57`). New building is paused until the F-46 closeout is done (`company/decisions/2026-10-16-founder-catalog-closeout.md` item 5), and these 200 stand behind F7-F10, the fact-check in batches of 30 and the learner sample before any is promoted (review §"Before publication"). Some will be retired. The hard-coded counts (`topic.slugs.length`) would then overstate what we will teach. "Not yet visible" also tells the learner that something exists and is hidden, which is the system's state, not the learner's question.
4. **Gating only the whole section is not enough.** After the first promotion the section would render, and with it the other 199 draft titles and "200 planned". So the rule is per row: a row appears when its lesson is visible.

What this costs: while the drafts are hidden, the production map does not list these 200 algorithm ideas as "not yet taught". I accept that. The map's honesty about what CS does not teach is carried by the 160 curriculum concepts that are not lesson-shaped, and I will give the algorithm ideas lesson-independent concept names before they come back as untaught rows (follow-up below).

## Requirement for platform-engineer (tier 1; `src/app/catalog/page.tsx`, `tests/algorithms/catalog.test.mjs`)

Let *visible algorithm lessons* be the lessons from `visibleDemos()` (no options, as now) whose slug is in a topic's `slugs` in `content/algorithms-200.json`.

- **R1. Section gate.** Render the `#algorithms` section (heading, intro, topic index, topic groups) only if there is at least one visible algorithm lesson. Otherwise render nothing for it: no heading, no empty container.
- **R2. Topics.** Render a topic group, and its entry in the topic index, only if at least one of its lessons is visible. Keep the topics' `order`.
- **R3. Rows.** Inside a topic, render a concept row only if it has at least one visible lesson. Its text is the concept name followed by the lesson link(s), as now. No row is ever rendered for a concept without a visible lesson, so no "not yet visible" and no "not yet taught" row in this section.
- **R4. Copy.** Remove "200 planned lessons across 20 topics. Links appear as lessons become visible.", "{n} visible · {m} planned" and "Not yet visible" / "not yet visible". The intro, if any, carries no count of planned or total lessons and no promise; "Grouped by topic." is acceptable. A per-topic line, if kept, counts only visible lessons ("{n} lessons") and says nothing about planned ones.
- **R5. Keep** the existing exclusion: the 200 manifest concepts and slugs stay out of the flat CS concept list (`groupedConcepts`, `groupedSlugs`) in every case, so hiding the section does not dump them there. Keep the "· in review" tag for review lessons (W-479). Off production, with drafts visible, the same rules show the drafts, as for every other lesson.
- **R6. Tests.** Update `tests/algorithms/catalog.test.mjs`: (a) under `VERCEL_ENV=production` with all 200 fixtures draft, the HTML contains no `id="algorithms"`, none of the 200 concept names, and none of the strings "planned", "Not yet visible", "not yet visible"; (b) with one published and one review fixture in topic 1 and one draft in topic 1, exactly one topic group and one index entry render, the two visible rows render with their links, the draft's concept name does not appear, and the strings in (a) do not appear; (c) the existing checks on the flat CS list, the other domain and "no draft links" stay. `tests/qa/feed.spec.ts` ("the map shows taught and untaught concepts") must still pass; it reads the flat lists, which this does not change.

No change to `src/lib/visibility.ts`, `content/`, the kit or any protected path. One commit, revertible alone.

## Objections that travel with this decision

| Objection | From | Answer |
|---|---|---|
| Listing untaught concepts is existing practice, so this is not a leak (F4). | principal-engineer, F4 | Agreed it is not a leak of content or claims, and the map keeps listing untaught *concepts*. Declined for these 200 because they are lesson titles, 120 of them unclaimed factual sentences (Why 1-2). |
| The map's job is to be honest about what we do not teach; hiding 200 ideas makes it less complete. | cm-cs (my own mission, `company/roles/cm-cs.md`) | Accepted as a cost, with a fix: follow-up F1 gives these ideas lesson-independent names, and they return as untaught rows once that is done. Completeness does not justify unchecked sentences or an unsigned promise. |
| Gating the section is enough; per-row filtering is more than M6 asked. | anticipated from the review's two-option wording | Declined: without per-row filtering the first promotion re-exposes 199 titles and "200 planned" (Why 4). The extra rule is a filter on data the page already has. |
| Hiding the topic structure loses the coverage story the PR was asked for (founder ask: "group them by topic to achieve coverage"). | anticipated, from `company/decisions/2026-10-16-algorithms-200.md` | The grouping stays in `content/algorithms-200.json`, the curriculum and off-production builds, where reviewers use it. Learners see each topic as soon as one of its lessons is visible. |

## Follow-ups

- **F1 (cm-cs).** Give the 200 algorithm entries in `content/curriculum/cs.json` concept names that are labels, not lesson titles or assertions (e.g. "Binary insertion sort" for `algo-binary-insertion`). Then reconsider showing un-taught algorithm concepts as "not yet taught" rows. Not before the F-46 closeout; not a merge or deploy condition.
- The accessibility scan of the live section (W-1571) runs on the build after R1-R6; in production with all drafts, there is no section to scan, so W-1571 covers it when the first algorithm lesson is promoted.
