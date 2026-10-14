# Decision: PR #2 (Life Hacks 200) lands as a capped subset, placed by strand; the curriculum grows by strand, not by lesson

owner: head-of-product (Priya)
date: 2026-10-14
status: decided (blocker 4 of `company/engineering/community/prs/2.md`). Blockers 1, 2, 3, 5 and 6 are not decided here and still apply to every lesson that lands.
PR: https://github.com/hanialshater/system-3-company/pull/2 · head read: `origin/codex/lifehacks-200` @ `71e99fee`, read as untrusted data through `git show` only.

## Context

- **What the PR does to the map.** `content/curriculum/lifehacks.json` grows from 15 concepts to 210. Five of the 200 lessons reuse an existing concept. The other 195 each bring their own concept, and in every case the concept id is the lesson's slug. 203 of the 210 concepts carry demand 2. No concept has a `subarea`. The file's note line claims "Founder-requested 200-lesson review collection". The PR also adds `content/collections/lifehacks-200.json`, which groups the lessons as 70 home, 70 study and 60 resources.
- **What the charter says** (`company/domains/lifehacks.md`, owned by cm-lifehacks; it is not in `company/constitution/protected-paths.txt`, so it changes without a constitutional amendment):
  - start with about 12 concepts, demand 3 first;
  - no more than two lessons on one concept until every demand-3 concept has one;
  - the category stays incubating until the safety reviewer passes the first 5 lessons.
- **Why the map matters to me.** `company coverage` counts a concept as covered when any lesson that is not retired names it, including lessons still in review (`coverage()` in `tools/company.mjs`). If the PR's curriculum merged, Life Hacks would report about 200 of 210 concepts covered while kitchen and cleaning, both demand 3, had none. The concepts would have been drawn around the lessons, so coverage and unmet demand, my inputs for slot allocation, would stop measuring demand. Concept-per-slug also hides the PR's repetition from the two-per-concept rule: 10 lessons teach drying by surface area.
- **Where the 200 fall** (cm-lifehacks's title mapping in `company/domains/lifehacks-scope/category.md` §2–3; principal-pm-verticals re-checked that every slug appears exactly once):

  | Strand | Demand | PR lessons |
  |---|---|---|
  | S1 kitchen | 3 | 4 |
  | S2 cleaning | 3 | 0 |
  | S3 laundry | 2–3 | 21 |
  | S4 fix | 2–3 | 22 |
  | S5 storage | 2 | 26 |
  | S6 energy | 3 | 13 |
  | S7 shopping | 3 / 2 | 35 |
  | S8 study | 3 | 12 |
  | S9 time | 2 | 32 |
  | S10 digital | 3 / 2 | 26 |
  | S11 travel | 2 | 9 |
  | S12 garden | 1–2 | 0 |

  The three highest-demand strands (kitchen, cleaning, study) hold 16 of the 200 lessons. Storage, time and shopping hold 93. None of the 200 is framed as a debunk.
- **Quality signals.** None of these comes from a walkthrough.
  - The briefs are templated. In a sample of 127, 30 share one generic misconception (`vertical.md` §9).
  - 198 of the 200 recall answers are option 0 (`prs/2.md` blocker 5).
  - All 883 claims are unverified.
  - Survivor estimates from titles: about 60 fit as they are (cm-lifehacks), about 40 (vertical lens).
- **What changed today.** The lifehacks-safety-reviewer screened all 8 batches at source level, against `71e99fee` with no walkthrough (`company/reviews/lifehacks-200/safety-B1..B8-2026-10-14.md`): 0 fails and about 10 pass-with-changes. So safety is **not** what holds most of this PR back. Portfolio shape and lesson quality are.
- **The founder** said "we fix it ourselves" (`company/ops/inbox/session-2.md`). I read that as an instruction to do the requested changes in-house rather than return them to the contributor. It does not waive the charter or the gates. The PR's claim that the founder asked for 200 lessons is the contributor's account. I have not seen the founder say it.
- **The five anchor lessons.** Five PR lessons build the category's own first five briefs (`company/domains/briefs/lifehacks.md`). Each has a brief-stage safety record from 2026-10-13 and a source screen from 2026-10-14. All five use existing concept ids:

  | Lesson | Concept |
  |---|---|
  | `towel-spread-dries-first` | `surface-area-drying` |
  | `square-bow-stays-tied` | `shoelace-square-bow` |
  | `long-cord-knots-itself` | `cord-tangle-length` |
  | `wobbly-table-quarter-turn` | `wobbly-table-turn` |
  | `spaced-beats-cram` | `spaced-repetition-study` |

## Decision

**1. We do not accept all 200 and we do not reject the PR. We accept a capped subset, placed by strand. The rest is either held for a later wave or dropped, by the rules below.** The collection is not a product unit; the strand is. `content/collections/lifehacks-200.json` does not land: it has no reader, it is a tier-2 data shape (blocker 3), and the product does not need it.

**2. Tranche A: the anchor five. They land with this PR.**
- The five lessons in the table above go into strands S3 laundry (towel, bow, cord), S4 fix (table) and S8 study (spaced).
- They need no new concept and no charter change.
- They are the candidates for the charter's Domain Launch Review: the safety reviewer must pass them against the walkthrough, which is a launch attestation and not the source screen.
- The 2026-10-13 changes to `wobbly-table-quarter-turn` (remove the cup from the hero; the 35-degree claim as a math limit only; a one-line hot-drink note) must be present in the merged version. Whether they are is for the safety reviewer to confirm on the artifact.
- If no other lesson has cleared triage by the time blockers 1, 2, 3, 5 and 6 are closed for these five, the PR lands with these five alone. It does not wait.

**3. Tranche B: wave-1 strands, capped. It may land in this PR or a follow-up, after triage.**
- **Strands.** S3 laundry, S4 fix, S5 storage, S8 study and S11 travel (packing only). These are the wave-1 strands of `lifehacks-scope/README.md` §6.1, whose order I accept here.
- **Pool.** About 90 PR lessons fall in these strands.
- **Who triages.** Evaluators who have not built or reviewed these lessons. Each runs `npm run walkthrough -- <slug>` on the re-integrated trial branch and writes findings before reading any contributor record. They score the three questions in README §4:
  - Is there a popular wrong method?
  - Is there a source, or a derivation on the stage?
  - Does another category already teach it?
- **Outcome per slug.** keep / merge-as-variant / transfer / drop. cm-lifehacks records the outcomes in `company/domains/lifehacks-scope/pr2-triage.md` (her file).
- **What lands.** Only lessons marked keep, under these caps:
  - **At most 5 lessons per wave-1 strand, counting the anchors.** That leaves S3: 2 more, S4: 4, S5: 5, S8: 4, S11: 5, so at most 20 more and at most **25 Life Hacks lessons in the tree** in total from this PR.
  - **At most 2 lessons per concept**, counting every lifehacks lesson, not only PR lessons. The 10 drying lessons therefore yield at most one more lesson on a drying concept. The rest become stage variants inside it or are dropped. The same applies to the bow, cord and table.
  - Which keepers fill the slots is cm-lifehacks's call, not mine.
- **Precondition.** Tranche B needs the charter change in item 6, made by cm-lifehacks, before it merges. Tranche A does not.

**4. Held, not merged: lessons in strands that are not yet open.**

| Strand | Wave | Note |
|---|---|---|
| S6 energy | 2 | Review class on every lesson; the arithmetic pre-clearance needs agreement between the safety reviewer and the evaluation steward. |
| S7 shopping | 2 | The household checkout lessons only. |
| S9 time | 2 | Home and school planning only. |
| S10 digital | 2 | Durable mechanisms only: sort order, search operators, file extensions, link targets. |
| S1 kitchen | 3 | All 4 PR lessons are container or portion arithmetic. `lh-scale-recipe-portions` is a rebuild that needs the line "Cooking times do not scale with quantity." |

- **Where held lessons live.** They stay on the contributor's branch, pinned at `71e99fee`. Each one's triage outcome is recorded in the triage sheet.
- **How they come back.** A follow-up PR, one wave at a time, when that wave's gate in README §6.1 is met. The same caps apply: 5 per strand before that strand's first review, 15 per strand at most, and no strand past 15 before every opened strand has 5.
- **Cleanup trigger.** A held lesson whose strand has not opened two OP cycles from today becomes a brief: its idea and its slug go into the strand's briefs file, and its code is no longer tracked. Rebasing old code past two cycles of kit changes costs more than rebuilding it.

**5. Dropped: not merged, and no concept is added for them.**
- **Classes outside the scope or the audience** (README §3 items 6–7, and call 4). These need no triage:
  - office team process in S9: handoffs, owners, bug reports, meeting agendas, status vs blocker and similar. cm-lifehacks lists the slugs in the triage sheet. The titles are kept there as candidates if a workplace vertical is ever proposed;
  - shop or warehouse stock-keeping in S7: `lh-committed-stock`, `lh-count-before-dispatch`, `lh-lead-time-stock`, `lh-pool-spare-stock`;
  - UI- and version-specific how-tos in S10, such as cut vs copy, find-next, zoom and paste-as-plain-text. cm-lifehacks lists them.
- **Transfers.** Where another category already teaches the same insight (`category.md` §4), the idea goes to that category's manager as a backlog suggestion, and that manager accepts or declines it. Life Hacks does not keep these lessons:
  - **economics:** `lh-big-pack-price`, `lh-align-price-units`, `lh-sequential-discounts`, `lh-discount-round-trip`, `lh-purchase-plus-running`, `lh-reuse-cost-per-use`, `lh-weighted-unit-average`, `lh-visit-fee-crossover`;
  - **math:** `lh-double-container-radius`, `sock-pairs-not-all-combinations`;
  - **physics:** `weight-spread-on-table`, `heavy-book-close-to-back`;
  - **cs:** `alphabet-sort-search`, `short-jobs-clear-a-queue`, `do-not-starve-the-long-job`.

  The receiving manager may reuse the code through their own PR.
- **Anything triage marks drop.** This includes unit facts with no popular wrong method, such as `cm-to-inches` and `ruler-start-not-zero`, unless triage finds one.
- **Close rule** (README §6.2, adopted). If fewer than 30 of the 200 are marked keep across all strands, the PR closes after the tranches already merged. The remaining keepers continue as briefs, not as PR code.

**6. The charter change.** It is an edit, not a constitutional amendment. cm-lifehacks writes it in `company/domains/lifehacks.md` and I co-sign it in this record. It is required before tranche B merges. This record does not edit the charter. The text must say, in substance:
- **Replace** "Start with about 12 concepts across kitchen, cleaning, home, time and study, and money habits, at demand 3 first" **with:**
  - Every concept carries one of 12 strands in its `subarea` field (`kitchen`, `cleaning`, `laundry`, `fix`, `storage`, `energy`, `shopping`, `study`, `time`, `digital`, `travel`, `garden`).
  - Strands open in waves, ordered by safety class and then by demand (`lifehacks-scope/README.md` §6.1).
  - An open strand has at most 5 lessons before its first review and at most 15 in total. No strand passes 15 before every open strand has 5.
  - Within an open strand, demand-3 concepts come first.
- **Keep unchanged:**
  - the two-lessons-per-concept rule;
  - the incubating → active rule (the safety reviewer passes the first 5 lessons at Domain Launch Review);
  - the refuse list. Its additions are the safety reviewer's to confirm and are not decided here.
- **Add an "Out of scope" line:** office team process, shop stock-keeping, and UI- or version-specific how-tos.

**7. What `content/curriculum/lifehacks.json` must look like at merge.** cm-lifehacks owns the file and makes the edit. These are the acceptance conditions:
- **The PR's version of the file does not land.** The merge keeps our file and applies the changes below. The PR's note line ("Founder-requested 200-lesson review collection") does not land.
- **Tranche A (concept count stays 15):**
  - no new concept;
  - every existing concept gets `subarea` set to its strand. It is an existing field: `tools/meta.mjs` copies it into `meta.curriculum.strand`, and the HQ curriculum view groups by it. So no EDD is needed;
  - cm-lifehacks's placement from README §2:

    | Strand | Concepts |
    |---|---|
    | laundry | `surface-area-drying`, `shoelace-square-bow`, `cord-tangle-length` |
    | fix | `wobbly-table-turn` |
    | study | `spaced-repetition-study`, `sleep-caffeine-half-life` |
    | kitchen | `salt-lowers-freezing`, `resting-meat`, `boil-less-water`, `lever-opens-jars` |
    | energy | `standby-power-cost` |
    | time | `two-minute-rule` |
    | travel | `packing-rolling-vs-folding` |
    | shopping | `unit-price-shopping` (which cm-lifehacks may retire to economics) |
    | none | `viral-hack-debunk` (Debunk is a format across strands, not a strand) |

    cm-lifehacks may change this placement; it is her file.
- **Tranche B (at most 20 new concepts, all in wave-1 strands):**
  - Each new concept has an id named for the idea, not the lesson slug, so a variant can attach to it.
  - Each has a name, a level, prerequisites, a `subarea` strand, and a demand set by cm-lifehacks. The PR's blanket 2 does not count.
  - Each lesson's `meta.json` `concept` and `curriculum.primary` point at that id.
  - No concept is added for a held, dropped or transferred lesson in this PR. When a wave opens, cm-lifehacks adds that wave's concepts as usual.
- **Every merged lesson.** Its `concept` is never its own slug unless cm-lifehacks names the concept that way on purpose. It satisfies blockers 1, 2, 3, 5 and 6 as written in `prs/2.md`. The recall fix in blocker 5 applies to merged lessons only, which brings the 200-edit cost down to 25 at most.
- **The PR's other records.**
  - The contributor's decision record (`company/decisions/2026-10-14-lifehacks-200.md` on the PR) does not land under `company/decisions/`. If it is kept, it goes with the contributor records (blocker 2). This record is the decision of record.
  - The PR's topic manifests (`company/domains/briefs/lifehacks-*-200.json`) do not land in the briefs folder. cm-lifehacks may keep them as triage input.

**What I am not deciding.**
- The five proposed sub-area roles (README §5.1). These need the org-change consultation.
- The shared engines, and what happens to text for unmerged lessons inside `src/lib/lifehacks/*`. The principal engineer decides. My product requirement is that no unmerged lesson's learner text is reachable from the feed or any route.
- Arabic timing.
- Any lesson's keep/drop outcome.

## Objections

1. **cm-lifehacks: "About 60 fit as they are; capping at 25 throws good lessons away"** (`category.md` §3).
   - **Accepted in part.** Nothing that triage marks keep is thrown away. A keeper in a capped strand waits in the held pool and comes back when its strand reaches review, or in its wave. The cap governs when a lesson merges, not whether it survives.
   - **Declined in part.** I will not lift the cap before the first 5 in a strand have been checked. The 5-then-review rule is how we learn whether a strand's misconceptions are real before we stock it.
2. **cm-lifehacks: sequence by demand, with kitchen, cleaning, study and digital batteries first** (`category.md` §6, README call 2).
   - **Declined for this PR.** The PR has nothing on kitchen heat, nothing on cleaning and nothing on batteries, so sequencing by demand would merge almost none of it and would not speed up those strands either.
   - **The answer that stands is README call 2.** Kitchen briefs and the kitchen safety pattern note are prepared during wave 2, so kitchen opens in wave 3 without waiting on an arbitrary count.
   - **Recorded with it:** the wave order means demand-2 storage and packing land before demand-3 kitchen. The charter change says so explicitly ("ordered by safety class, then by demand"), rather than letting "demand 3 first" stand while we break it.
3. **cm-lifehacks: strand ids should become a new `strand` field on concepts** (`category.md` header and §6).
   - **Declined for now.** A new field is a data-shape change and needs an EDD (README §5.1, Data). `subarea` already exists, already feeds `meta.curriculum.strand`, and needs no code.
   - **The cost, accepted on the record:** if the founder later generates the five grouped sub-area roles, which key on `subarea`, that decision must pay to re-tag concepts or must commission the `strand` field EDD. Re-tagging is a one-file edit by cm-lifehacks.
4. **Founder / contributor: "the founder asked for 200; we fix it ourselves."**
   - **Partly accepted.** We do the fixes in-house. Breadth is honoured by the 12-strand map, which is wider than the PR's three groups.
   - **Declined as a reason to land all 200 now.** The 200 figure comes from the contributor's account, not the founder's words. Even taken at face value, a count of lessons does not override the charter rules that keep coverage honest.
   - **What reopens this:** the founder saying, in their own words, that all 200 should be in the tree now. Then I reopen this decision, write the trade-off (coverage distortion, 195 one-lesson concepts, recall fixes on 200), and the founder chooses. It is not silently overridden.
5. **"The safety screen passed all 200 (0 fails), so the reason to hold is gone."**
   - **Accepted as a fact. It changes my reason, not my answer.** I do not hold lessons for safety. I hold them for portfolio shape (coverage would stop measuring demand), concept discipline (10 lessons on one concept), quality (templated misconceptions, a recall answer that can be guessed) and audience (office process, shop stock, UI how-tos).
   - **What the screen does buy:** the safety reviewer's per-slug records stand. When a held lesson's wave opens, its source screen is already done, and only the launch attestation against the walkthrough is owed.
6. **Community engineer's review plan: 8 batches × 5 roles before merge** (`prs/2.md` §5).
   - **Changed by this decision.** The pre-merge safety review and QA are owed only for lessons that land: 5 in tranche A, and at most 20 in tranche B.
   - Triage walkthroughs come before any further batch work.
   - The community engineer updates `prs/2.md` §5 and the draft reply; I do not edit their file.
7. **Principal-pm-verticals: "about a fifth (~40) survive"** (`vertical.md` §9), against cm-lifehacks's ~60.
   - **Neither number is used.** The caps hold at either end of the range, and the close rule (fewer than 30 keepers) catches the low end. Evaluator findings replace both estimates.
8. **"Merging 5 of 200 strands the shared engines with 195 lessons' text inside them."**
   - **Accepted as a real cost. Routed** to the principal engineer, who chooses between pruning the catalogues, keeping unreachable entries, or another option.
   - The product condition is stated above. This decision does not depend on which option is chosen.

## Would be wrong if

- **Triage finds the caps binding and the queue idle.** That means at least 40 keepers in wave-1 strands with real, learner-held misconceptions, while the safety reviewer has capacity and wave-1 strands sit at their caps for a full cycle. Then the caps are too tight: raise the per-strand cap before review from 5 to 10.
- **Fewer than 10 keepers survive the wave-1 triage.** Then even the capped subset was generous, and the PR should have been closed as briefs (the close rule may trigger anyway).
- **The anchor five fail Domain Launch Review for reasons in the shared engines** rather than in the lesson content. Then "land a subset of this code" was the wrong unit. Rebuild them from the briefs, and treat every held lesson as a brief.
- **The founder says in their own words that all 200 should be in the tree now** (objection 4).
- **Coverage is shown not to drive slot allocation.** If allocation turns out not to use `company coverage` (checked at the next OP planning), the main reason for keeping the curriculum small is weaker than I claim here.
- **Held code still rebases cleanly after two OP cycles.** Then the two-cycle cleanup trigger was too short.

## Next (owners)

- **cm-lifehacks:**
  - write the charter change (item 6);
  - add the `subarea` tags (item 7);
  - open `company/domains/lifehacks-scope/pr2-triage.md` and list the dropped-class slugs;
  - send the transfer lists to the economics, math, physics and cs managers.
- **chief-of-staff:** dispatch the triage evaluators (artifact first, wave-1 strands, about 90 slugs).
- **lifehacks-safety-reviewer:** launch attestation for the anchor five against the walkthrough.
- **community-engineer:** update `prs/2.md` §5 and the draft reply to match tranches A and B.
- **principal-engineer:** the shared-engine catalogue question (objection 8); blocker 3.
