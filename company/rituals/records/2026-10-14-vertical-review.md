# Vertical Review: 2026-10-14 (portfolio: History, Books, Big Ideas, Life Hacks, exam prep, NCM)

owner: principal-pm-verticals (chair, Selin) · template `company/rituals/templates/vertical-review.md` · trigger: overdue (`founder` events for History, and History at 100, since the last review, `2026-10-14-vertical-review-ncm.md`)
attends (by record): no category manager was dispatched, because the session was at its agent cap. Strand positions are taken from their written records instead: `company/domains/history.md` and `company/domains/briefs/history.md` (cm-history, W-742 re-check), `company/domains/books-strategy.md` (cm-books), `company/domains/big-ideas-strategy.md` (cm-big-ideas), `company/decisions/2026-10-14-w570-lifehacks-wave-state.md` and the lifehacks board items (cm-lifehacks). The asks to design-lead, personalization-lead and localization-lead are in §3, in writing.
decides: head-of-product for bets inside the roadmap; the **founder** for new verticals and budgets (`company/ops/founder-inbox.json` F-16, plus the open founder board items W-582, W-615, W-764).
strategy docs touched: `company/product/verticals/plan-to-2000.md` (third-pass revision box), `company/product/verticals/2026-10-14-history-and-next-categories.md` (§1 marked superseded in part). No new vertical is proposed.

## 0. The picture

- **Catalogue** (`npm run company -- status`, `npm run metrics`, 2026-10-14): 945 lessons. 608 published, 271 in review, 66 draft. Claims 4,826 of 5,064 verified, 3 disputed. **Queue (draft + review) is 337 against the W-556 gate of 160.** 200 of the 337 are Life Hacks, and none of those is parked by a triage record.
- **The new categories** (`coverage`, meta.json counts):

| Category | Map | On disk | Published | State of the work |
|---|---|---|---|---|
| History | 114 concepts (48 population-economy, 33 maps-borders, 33 events-data) | 0 | 0 | 30 briefs written. 19 are claimable now (1, 2, 6-10, 13-24). 5 are held for W-626 (3, 4, 5, 11, 12). 6 are held for strand balance (25-30, W-794). **54 concepts are sensitive and 30 have no opened data. Only 39 are both standard and on opened data** (22 population-economy, 11 events-data, **6 maps-borders**). |
| Books | 60 | 6 drafts | 0 | **0 of 38 claims verified.** Every "the book argues" claim is held until F1. Deck format ruled. F1, F2 and F4 are open (W-615, W-541). |
| Big Ideas | 58 | 6 drafts | 0 | 0 of 34 claims verified. Target 170 against a 58-concept map: the target is capped by idea supply (W-619 open). |
| Life Hacks | 136 | 200 in review | 0 | 14 of 200 learner-reviewed. Engine v2 is built for Home and Study (W-608), Resource and AlphabetSearch are owed (W-738), and ~186 lessons await v2 content (W-613). The Domain Launch Review has not been held (W-586). |
| NCM (existing vertical) | 24 chapters | 69 cite the book | 38 | 30 in review, 1 draft. Every demo-able section is covered. |

- **Overlap:** History's boundary table (charter) and the neighbour asks W-795, W-796 and W-797 carry the collisions. I ran no new overlap pass, because nothing History-built exists yet to overlap.
- **Real-learner evidence: none yet.** Nothing is deployed (F-04), and EXP-002 has not run. Borrowed-mind verdicts are quality gates. This review does not count them as market evidence, and no budget below moves on them.
- **Wave J published share: not measurable.** The slug list is not recorded in `company/ops/waves.json` (W-585 open). The gate's second condition cannot be checked at all until it is.
- **New finding: an openable syllabus for exam prep.** The AP Course and Exam Descriptions and openstax.org are unreachable from this host (curl 000). **The OpenStax textbook sources are reachable on raw.githubusercontent.com (HTTP 200):**
  - `openstax/osbooks-introductory-statistics-bundle/main/collections/introductory-statistics-2e.collection.xml` (13 chapters, 102 modules: sampling and data through ANOVA);
  - `openstax/osbooks-college-physics-bundle/main/collections/college-physics-ap-courses-2e.collection.xml` (283 modules).
  - Licence CC BY-NC-SA. We would use the tables of contents as a mapping reference only, never as content. That an "AP Courses" textbook aligns with AP Physics 1 is the publisher's own title, and it is unverified beyond that.
  - This removes the main blocker I recorded for the exam-prep mapping (plan §4: "syllabus documents cannot be opened from this host").

## 1. Each vertical and category under review

### 1.1 Exam prep (proposed vertical; W-582 founder)

| | |
|---|---|
| Audience and job to be done | Students in an intro physics or intro statistics course. Job: "pass the conceptual items I keep getting wrong." |
| Portfolio | Not mapped yet. W-543 (cm-physics) and W-544 (cm-probability) are in backlog and have not been started. Physics has 66 of 76 concepts built, and probability 77 of 90. My estimate that about half the syllabus is already built is untested. |
| Formats it needs | Default (single card, simulation run). No new format is expected. |
| Evidence since last review | A syllabus proxy can now be opened from this host (§0). There is still no learner evidence. |
| Success metric and kill criteria | Kill after 60 days deployed if path completion is under 15% or recall is no better than the feed median (plan §4). Not measurable before a deploy. |
| Verdict | **grow: start the mapping now.** The mapping builds nothing and can be undone, and it is the CMs' own portfolio work. I ask head-of-product to authorise it inside the roadmap now (§3). That narrows the founder's W-582 to the 36 Wave K build slots, which the mapping will size. Exam prep still ranks first among everything on the table (`2026-10-14-history-and-next-categories.md` §5). |

### 1.2 Networks, Crowds and Markets (existing vertical)

| | |
|---|---|
| Audience and job to be done | Unchanged (strategy doc). |
| Portfolio | 69 lessons cite `easley-kleinberg-2010`: 38 published, 30 in review, 1 draft. |
| Formats it needs | No new format. The network-stage UI concept waits on the rule of two (design-lead, 2026-10-14-vertical-review-ncm §3). |
| Evidence since last review | None from learners. |
| Success metric and kill criteria | Build phase met: at least 12 of 16 batch-1 lessons are past first review. The market criteria cannot be measured. |
| Verdict | **keep. Stop briefing and measure.** No new asks. |

### 1.3 History through data and maps (founder category, target 100, W-556 lifted for History)

| | |
|---|---|
| Audience and job to be done | The charter's: adults who distrust history as dates and want to read the record themselves. |
| Portfolio | 114 concepts, 30 briefs, 0 built. **39 concepts are buildable under today's rules.** Of the rest, 54 wait on W-764 (sensitive route) and 30 wait on W-583 (no opened data); the two sets overlap. **The founder's 100 cannot be reached without both.** Maps-borders, the half of the category's name that is "maps", has only 6 standard concepts on opened data. History launched without W-764 is mostly population and economy charts. |
| Formats it needs | Approved formats with preset buttons, plus `@/kit/geo` for maps. About 25 briefs share one pattern: a dated series on presets, with a "where the record stops" line. Once two of them pass design review, the rule of two applies, and design-lead should write a UI concept for that pattern. |
| Evidence since last review | Supply side only. The charter's split of claims into data, derivation and source makes data claims checkable by re-running a script (W-747), which is the strongest guard against held claims that any new category has. The W-742 re-check re-classed 4 concepts as sensitive and rotated the answer letters. There is no learner evidence. |
| Success metric and kill criteria | Carried from my sizing note, now applied to tranches. **Pause** if 3 of the DLR five are rejected as duplicates or the held-claim rate exceeds 40%. **Kill** 60 days after deploy if 7-day recall is more than 10 points below the feed median and the commit rate is below it. **Tranche 2 release** (concepts beyond the ~25 standard briefs): W-764 landed, the DLR five passed, and the held-claim rate at or under 25%. |
| Verdict | **fix: re-plan to the founder's 100.** The founder's target stands. What changes is how it is reached: two tranches (F-16), History counted in the queue measure, and the DLR five spanning all three strands. **The single most valuable founder decision for History is W-764, not more briefs.** |

**How the 100 fits the 2,000** (plan-to-2000 third-pass box; founder F-16):
- The total stays 2,000. The extra 40 come from the uncommitted N-Q pool (648 → ~608).
- History's K/L/M lines (40) are spent ahead of K under the founder's exemption.
- The 40 K-M slots this frees stay empty until the drain completes, because History's reviews happen during the drain on the same reviewers.
- After that, they go back to the 44 subject slots I moved out (exam prep and demand-3 gaps first, cs last).

**Budget for Project Review 1** (W-723, W-802; I own both and write the one-page proposal next):
- **Tranche 1:** the ~25 standard briefs, at the measured 101k tokens per published lesson (`npm run metrics`), is about **2.5-3M tokens**. The agenda's 2.0M covers the org work and about the first 15 lessons.
- **Tranche 2:** about 75 lessons, ~7.5M tokens, plus about 100-110 sensitive reviews (W-626 load estimate). Released on the triggers above, never by default.

### 1.4 Book Summaries (decks)

| | |
|---|---|
| Audience and job to be done | Unchanged (`books-strategy.md` §1). |
| Portfolio | 6 drafts, of which 4 are *Thinking, Fast and Slow* reference-deck candidates. 0 published, 0 claims verified. Strategy wave 1 (briefs 13-24) is gated (W-616). |
| Formats it needs | The deck format (`2026-10-14-book-deck-format.md`). The multi-card stepper is a kit question (F-06). |
| Evidence since last review | None. The held share is still ~100% of book-argues claims. |
| Success metric and kill criteria | `books-strategy.md` §7. **K1 fires if no book source exists by Wave L's entry.** |
| Verdict | **fix: hold at the reference deck until F1 is answered.** Building more Books lessons now only adds review load that cannot publish. |

**Founder items in scope (W-615, W-541), with my position:**
- **F1 (book source): the deciding item. Recommend option (a)** for the pilot: the founder, or a named person, fills the reference deck's chapter sheet with a copy in hand. That is about 12 claims and half an hour. Then option (b), a connected fact-check session, per wave. **Without F1, Books publishes nothing, so it outranks F2 and F4.**
- **F2 (legal read): recommend (a), started now.** It costs no calendar time, because F1 blocks publishing first. Add Q7-Q9 and the deck-level rule (head-of-product, deck-format Ruling 4).
- **F4 (unit and target): agree with head-of-product.** Count the target in idea-lessons, 120 of them, at about 150 review slots, of which 120 are funded today, which buys about 96 ideas. Decide the last ~30 slots at Wave N cycle-planning, on the reference deck's completion and recall. **If F1 is still unanswered at Wave N, the Books target reads 0 published, and its slots go back to the pool.**

### 1.5 Big Ideas

| | |
|---|---|
| Audience and job to be done | Unchanged (`big-ideas-strategy.md`). |
| Portfolio | 6 drafts (the exempt one-ten-thousandth-apart and same-grey-in-shadow among them), 0 in review, 0 verified. 58 concepts in the map. |
| Formats it needs | Default, plus Debunk for "does it hold up" (design-lead, W-540). |
| Evidence since last review | None from learners. The held share is estimated at 30-40%. The Snow tables can now be opened (History's offer, W-746). |
| Success metric and kill criteria | `big-ideas-strategy.md`. Unchanged. |
| Verdict | **keep: pilot.** The 72 committed through M stand. The 98 conditional slots need the map to grow from 58 to about 170 ideas that pass the bar, so W-619 (accept 170) is a ceiling, not a plan. I support head-of-product's recommendation to keep it. |

### 1.6 Life Hacks

| | |
|---|---|
| Audience and job to be done | Unchanged (charter, HoP co-sign). |
| Portfolio | 200 in review, 14 learner-reviewed, 0 published. My plan counted about 75 kept. |
| Formats it needs | Engines v2 (W-608 done for Home and Study; W-738 owed). |
| Evidence since last review | Batch D: all 14 reviewed lessons were sent back for revision, 6 of them blocking (W-599). |
| Success metric and kill criteria | `company/decisions/2026-10-14-w570-lifehacks-wave-state.md`. The DLR has not been held. |
| Verdict | **fix. Triage to a working set, and park the rest on the record.** 200 unparked lessons are most of the reason the W-556 gate is shut for every other category: the queue outside Life Hacks is 137, which is already under 160. Amendment 1 defines the legitimate mechanism. A written triage record parks the lessons that get no review work. A parked lesson that receives review work counts again. This review does **not** move the gate: head-of-product rules on the count. What I ask is that cm-lifehacks write the triage record the gate already anticipates. |

## 2. Proposals

**No new vertical or category.** "A vertical per week" is my role's first failure mode, and the founder added History today. One budget item goes to the founder: **F-16**, History at 100 inside the 2,000 in two tranches (§1.3).

One cross-category bet, inside the roadmap and for head-of-product: **exam-prep mapping now.**
- Audience and why it wins: as in §1.1.
- First 10 concepts: none to build yet. The output is a mapping from the two OpenStax tables of contents to existing lessons, with gaps marked "(textbook section; AP alignment unconfirmed)".
- Cost: 2 CM runs (cm-physics, cm-probability) and 0 builds.
- Kill criteria: §1.1.

## 3. Asks

### Board asks (the chief of staff adds these; I did not edit board.json)

| # | Title | Owner |
|---|---|---|
| 1 | Authorise the exam-prep syllabus mapping now, inside the roadmap (0 builds; W-543, W-544). W-582 then asks the founder only about the 36 Wave K build slots, sized by the mapping. Vertical Review 2026-10-14 §1.1 | head-of-product |
| 2 | W-543 note: map intro physics to existing physics lessons against `raw.githubusercontent.com/openstax/osbooks-college-physics-bundle/main/collections/college-physics-ap-courses-2e.collection.xml` (reachable here). Gaps labelled "(textbook section; AP alignment unconfirmed)". Vertical Review 2026-10-14 §0 | cm-physics |
| 3 | W-544 note: map intro statistics against `raw.githubusercontent.com/openstax/osbooks-introductory-statistics-bundle/main/collections/introductory-statistics-2e.collection.xml` (13 chapters, 102 modules), same labelling | cm-probability |
| 4 | Licence note: OpenStax tables of contents (CC BY-NC-SA) used as a mapping reference only, never as lesson content. Confirm this is fine, or say what is not | research-lead |
| 5 | Rule whether History lessons count in the W-556 queue measure. PM-verticals recommends yes: the founder's exemption lets History build, but its reviews use the same reviewers (the Amendment 1 logic). Vertical Review 2026-10-14 §1.3 | head-of-product |
| 6 | W-794: keep the strand-balance hold on History briefs 25-30 until the DLR five is formed from briefs 1-24 across all three strands. Release them when the DLR passes or W-764 lands, whichever comes first. They are not needed now, because 19 briefs are already claimable | head-of-product |
| 7 | Form the History DLR five across all three strands, with at least one maps-borders lesson (brief 6 rome-placed-too-far-east or 10 lakes-misplaced-east-west), so the review tests the category as named, not only its easiest strand | cm-history |
| 8 | Write a Life Hacks triage record (W-556 Amendment 1) that parks every lesson outside the active v2 batches (W-608, W-613) and the DLR candidates (W-586), so the queue measure counts only lessons getting review work. A parked lesson that receives review work counts again. Head-of-product confirms the count | cm-lifehacks |
| 9 | Record the Wave J slug list in company/ops/waves.json (W-585). Without it, the gate's "Wave J ≥ 60% published" condition cannot be checked, and no vertical's wave can open | chief-of-staff |
| 10 | Add the PM-verticals recommendation to the founder items: W-764 (yes, with localization-lead consent W-765 and AMD-006 owned by evaluation-steward W-766); W-615 (F1 option (a) first; F2 (a) now; F4 as head-of-product recommends); W-582 (narrowed per ask 1). Text in Vertical Review 2026-10-14 §1.3-§1.4 and §4 | chief-of-staff |
| 11 | Close W-688 as moot (superseded by `company/decisions/2026-10-14-founder-history-100.md`). Note on W-689: the boundaries still bind, and the pilot entry rules now gate tranche 2 | chief-of-staff |
| 12 | Once two History dated-series lessons pass design review, write a UI concept for the shared pattern (a series on presets plus a "where the record stops" line; about 25 briefs use it) | design-lead |
| 13 | History paths: each History lesson's named doorway (geography, economics or probability prerequisite) as a two-step path, and a zero-lesson astronomy-interest path over the existing ~20 sun, orbit and sky lessons (next-categories §5) | personalization-lead |

My own next items (already on the board): **W-723 and W-802**, the History Project Review proposal with the two-tranche budget (deadline 2026-10-16). **W-628** stays in review until F4 is answered.

### Founder (inbox and board)
- **F-16 (new, founder-inbox.json):** History at 100 inside the 2,000, in two tranches. Recommend (a).
- **W-764** (sensitive route): **recommend yes.**
  - It is the binding constraint on 54 History concepts and on Big Ideas' and Books' society titles.
  - The patch extends an existing role rather than adding one. It applies cleanly, according to its record.
  - Conditions already in the route record: localization-lead consents to the load (W-765), and the publish hold stays a loop rule until AMD-006 is ratified.
  - My objection to note: until AMD-006 lands, `company publish` itself does not read the hold, so the chief of staff's publish loop is the only guard. That should be said on the decision, not discovered later.
- **W-615:** F1 (a) first, F2 (a) now, F4 as head-of-product recommends (§1.4).
- **W-582:** recommend yes. Narrowed by board ask 1, it becomes a decision on 36 build slots that the mapping will size.

## 4. Objections

1. **"Counting History in the queue undoes the founder's exemption."** *Answer:* the founder lifted the gate for History *builds*. The gate exists to show the load on reviewers, and History's reviews are that load. *What happens:* head-of-product rules (ask 5). If the founder wants History uncounted, F-16's answer can say so, and the plan records it.
2. **"Parking Life Hacks is gaming the gate."** *Answer:* Amendment 1 defines parking as "no review work being spent on them", and a parked lesson that gets review work counts again. The record has to show that. Head-of-product confirms the count. I do not move the gate, and the ask is to cm-lifehacks, who owns the triage.
3. **"A textbook table of contents is not an exam syllabus."** *Answer:* true. It is the best external definition of what the course covers that this host can open. Every mapped gap is labelled "AP alignment unconfirmed", the same way NCM sections were labelled. It is still not evidence that learners want our format. Only a deploy gives that.
4. **"Recommending yes on W-764 rushes sensitive history."** *Answer:* the route does not lower the bar. It adds an outside review before build and before publish, a refuse list, and a provenance note. Without it, the sensitive half of History never gets built, and History launches as charts of population and prices. That is my third failure mode: choosing by what is easy to build.
5. **"Two tranches second-guess the founder's 100."** *Answer:* the 100 stands as the target. The tranches decide only the order and the triggers. On today's data, 39 concepts are reachable, so a single tranche of 100 would just leave more lessons built and stuck in review.
6. **"Books 'fix' is a pause in disguise."** *Answer:* partly. Nothing Books builds can publish without F1, so more Books builds now only add queue. The reference deck continues, so that when F1 is answered there is something to verify.
7. **"No strand reports: the CMs did not speak."** *Answer:* true. The session was at its agent cap. Every position I attribute to a CM comes from their written record, cited above. Each ask goes to the CM, who may object in writing in the brief file or on the board item.
8. **"Simulated reviews show Life Hacks v2 works."** *Answer:* they show quality, not demand. My role's rule is that they are not market evidence, and no budget here moves on them.

## Kudos (optional)
- @cm-history: the W-742 re-check re-classed 4 concepts as sensitive by the charter's own classes and rotated the answer letters without changing a number. That made the reachable-concept count in §1.3 trustworthy.
- @chief-of-staff-ceo-office: `history-data.mjs` pins every History dataset by SHA-256, which turns History's data claims into re-runnable checks. It is the strongest held-claim guard any new category has.
