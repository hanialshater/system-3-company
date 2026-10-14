# Life Hacks: category charter

owner: cm-lifehacks · status: incubating · curriculum: `content/curriculum/lifehacks.json` · coverage: `npm run company -- coverage lifehacks`

## Audience
Anyone who has watched a "this one trick" video and wondered whether it works. This is practical how-to, the way WikiHow does it, but each lesson asks you to predict which method works and then shows why.

## What a great lesson in this category does
It tests a popular hack against the mechanism behind it: why salt makes ice colder, why a towel dries faster spread out, why the 2-minute rule beats a to-do list. The learner predicts, tries the variants on the stage, and sees the mechanism. Debunking counts as much as teaching: "this viral hack doesn't work, and here is why".

## How claims get checked here
- Every claim cites a source (a government or safety body, a peer-reviewed study, a manufacturer's guidance) or shows its mechanism on the stage.
- Anything touching food, chemicals, heat, electricity, health, children, pets or money also passes the **Life Hacks safety reviewer** before review (`company/reviews/<slug>/<date>-safety.md`).
- Region-dependent advice (electrical standards, legality, food rules) is flagged for the International team.

## What we refuse to publish (the refuse list; the safety reviewer owns it)
- Mixing cleaning chemicals (bleach + ammonia or acid, and similar).
- Medical, dosage or diagnosis "hacks".
- Electrical work beyond changing a bulb or resetting a breaker.
- Anything that defeats a safety device.
- Legal or financial advice. Arithmetic about money is fine; recommendations are not.

## Portfolio rules (growth rule, 2026-10-14)

Source: `company/decisions/2026-10-14-pr2-lifehacks-scope.md` item 6, adjusted for its "Founder decision" section (all 200 PR #2 lessons land). Co-sign: head-of-product, **co-signed with amendments A1–A5 on 2026-10-14** (see "Head of product co-sign" at the end of this section; the founder's override is recorded in the decision record). Written by cm-lifehacks in session 2; received by message and committed by session 1.

### Curriculum applied as proposed (2026-10-14, W-381; co-signed by head-of-product 2026-10-14, see A5)
- cm-lifehacks applied `lifehacks-scope/curriculum-200.compact.md` unchanged: `content/curriculum/lifehacks.json` now holds the 136 concepts (15 kept, two-minute-rule demand 3→2 and unit-price-shopping 3→1). All 200 lessons have `concept` and `curriculum.primary` from its lessons map, and the 15 D lessons name the receiving concept in `curriculum.also`. Coverage reads 120/136, 11 demand-3 concepts uncovered.
- This was applied **before** the head of product's co-sign on this charter. It is a proposal in force, not a ratified map. If she declines or changes it, the curriculum and the 200 meta.json fields are re-applied from the decision, and this note says what happened.
- Not changed, on purpose (other agents are editing these lessons): each lesson's `curriculum.level`, `curriculum.prerequisites` and `curriculum.strand` still come from the old one-concept-per-slug map (39 levels and 15 prerequisite lists disagree with the new concept; no lesson has `strand`). That re-derivation is on the board for demo-builder.
- `lh-area-scales-square` (the "16th" duplicate of `math:area-scaling`, not on the decision list) got no `also`. It waits for cm-math's answer with the others.

### Strands
- Every concept in `content/curriculum/lifehacks.json` carries one of 12 strands in its existing `subarea` field: `kitchen`, `cleaning`, `laundry`, `fix`, `storage`, `energy`, `shopping`, `study`, `time`, `digital`, `travel`, `garden`. Strand scopes are in `company/domains/lifehacks-scope/category.md` §2.
- One exception: `viral-hack-debunk` has no strand, because Debunk is a format that any strand can use, not a strand. It is proposed for retirement as a concept.
- Concepts are named for the idea, not for a lesson slug, so a later variant can attach to the concept. Demand (1 to 3) is set by cm-lifehacks. A blanket default does not count as setting it.

### Growth
- **Wave order.** Strands open in waves, ordered by safety class first and demand second (`lifehacks-scope/README.md` §6.1):
  - wave 1: laundry, fix, storage, travel (packing), study;
  - wave 2: shopping, energy, time, digital;
  - wave 3: kitchen;
  - wave 4: cleaning, then travel (vehicles);
  - wave 5: garden.

  This order means demand-2 storage and packing open before demand-3 kitchen. That is deliberate, because safety-review capacity is the binding limit. We say so here rather than claim "demand 3 first".
- **Within an open strand**, demand-3 concepts get briefs first.
- **Caps on new lessons.** An open strand has at most 5 lessons before its first review and at most 15 in total. No strand goes past 15 until every open strand has 5.
- **The founder's override (PR #2).** The founder decided that all 200 PR #2 lessons land at once. Those 200 do not count against the caps when they arrive. After the merge the caps apply to every new brief and build, counted on the whole tree. The merge leaves these strands above 15: shopping (36), time (32), digital (26), fix (25), storage (24) and laundry (19), counts per `lifehacks-scope/curriculum-200.json`. Each of them is **closed to new lessons**. It reopens only when retirement, merging or transfer brings it back to 15, or when the head of product raises its cap on the record. New slots go first to the strands that lack lessons for their demand: kitchen, cleaning, the study gaps (interleaving, the learning-styles debunk), and phone batteries and backups in digital. Each of these still waits for its wave.
- **Two lessons per concept.** No concept gets more than two lessons until every demand-3 concept has one. This rule is unchanged. After the merge, four concepts carry 3 or 4 PR lessons: `surface-area-drying`, `measure-the-inside`, `see-it-to-find-it` and `round-up-to-whole-packs`. They get no new lesson. Their extra lessons are merge-as-variant candidates at the first retirement review.
- **Duplicates of other categories.** If a Life Hacks lesson teaches the same insight as an existing lesson in another category, the idea is offered to that category's manager as a transfer. Until that manager accepts or declines, the lesson's concept has demand 1 and the lesson names the other category's concept in `also`. The PR #2 list is in `lifehacks-scope/curriculum-200.json` under `duplicates`.
- **Launch gate.** The category stays incubating until the safety reviewer passes the first 5 lessons at Domain Launch Review. This rule is unchanged.

### Out of scope
- Office team process: handoffs, owners, bug reports, meeting agendas, status vs blocker.
- Shop or warehouse stock-keeping.
- UI- or version-specific software how-tos: cut vs copy, find-next, zoom, paste as plain text, and similar.

No new brief is written in these classes. The PR #2 lessons that fall in them land under the founder's decision. Their concepts are tagged out of scope, have demand 1 and get no new lessons, and these lessons are first in line at retirement review. Their titles are kept as candidates if a workplace vertical is ever proposed.

### Accepted costs of landing all 200 (the head of product's objections, and what happened to each)
These objections come from `company/decisions/2026-10-14-pr2-lifehacks-scope.md`. The founder overrode them knowingly. Each one stays here with its answer, so that a later reader can see what was accepted and what was mitigated.

1. **Coverage stops measuring demand.**
   - The objection: the PR's map would read about 200 of 210 concepts covered while kitchen and cleaning have nothing.
   - Accepted, and partly mitigated. The merge does not take the PR's one-concept-per-slug map. `curriculum-200.json` groups the 200 into 112 new idea-named concepts. It keeps the 15 existing concepts and adds 9 demand-3 gap concepts with no lessons (kitchen, cleaning, study, digital).
   - Coverage will read about 120 of 136 concepts, with 11 demand-3 concepts uncovered, so the gaps stay visible.
   - The cost that remains: coverage still counts lessons that are in review, so about 88% "covered" overstates what learners can actually use.
2. **One concept per lesson hides repetition.**
   - The objection: 195 concepts each have one lesson, and 10 lessons teach drying.
   - Mitigated. The 10 drying lessons sit under 4 concepts (surface area, airflow, humidity, water load). One concept, `surface-area-drying` with 4 lessons, is still over the two-per-concept rule. Three other concepts are also over it.
   - The cost that remains: 46 concepts still have a single lesson. Some of those groupings are judgement calls made from brief text, not from walkthroughs.
3. **Quality signals are weak.**
   - The objection: templated misconceptions (30 of 127 sampled share one), 198 of 200 recall answers are option 0, and 883 claims are unverified.
   - Accepted. The founder's decision sends all 200 through the full pipeline after the merge: the recall fix on all 200, fact-check, QA, learner review, accessibility, and the safety walkthrough attestation.
   - Nothing in this charter treats a landed lesson as good. Publishing still requires every gate.
4. **The audience does not fit.**
   - The objection: office process, shop stock-keeping and UI how-tos fall outside the home and student learner.
   - Accepted for the 25 lessons that land. They are handled by the out-of-scope line above.
5. **The portfolio is weighted away from demand.**
   - The objection: storage, time and shopping hold most of the 200, while kitchen, cleaning and study hold few.
   - Accepted. The over-cap strands are closed to new lessons, and new slots go to the gaps.
6. **The data shape: a `subarea` tag rather than a new `strand` field.**
   - This was cm-lifehacks's objection, and the head of product declined it.
   - The cost is accepted. If grouped sub-area roles are ever generated keyed on `subarea`, re-tagging is a one-file edit, or a `strand` field EDD gets commissioned.
   - HQ shows strand ids as raw ids until `content/domains.json` gets lifehacks subareas. That file is generated from `tools/org`, and changing it is an org change.

### Head of product co-sign (2026-10-14, W-392)

**Co-signed, with amendments A1–A5.** Signed by head-of-product (Priya). The founder's override is recorded in `company/decisions/2026-10-14-pr2-lifehacks-scope.md` ("Head of product co-sign"). Where an amendment and the text above disagree, the amendment governs. cm-lifehacks may rewrite the text above to absorb it, keeping its substance.

What I checked, against the tree and not the account: `content/curriculum/lifehacks.json` has 136 concepts (19 demand 3, 61 demand 2, 56 demand 1). Every concept has a `subarea` except `viral-hack-debunk`. All 200 lessons point at a known concept. Coverage reads 120/136 with 11 demand-3 concepts uncovered. Lessons per strand: shopping 36, time 32, digital 26, fix 25, storage 24, laundry 19, energy 13, study 12, travel 9, kitchen 4, cleaning 0, garden 0. Four concepts are over two lessons, 46 concepts have one lesson, and 25 lessons sit on the 15 "(out of scope)" concepts. Each of these matches the text above.

**A1. Gap exception to the closed strands. This fixes a contradiction.** Digital is closed at 26, but two of the uncovered demand-3 concepts, `battery-partial-charging` and `backup-3-2-1`, live in digital. As written, the closure locks out the gap the next line says to fill first. The amended rule: a closed strand stays closed **except to its own uncovered demand-3 concepts**. Each such concept may get one lesson once its strand's wave is open, even if the strand is over 15. That lesson counts on the strand's total. Nothing else enters a closed strand.

**A2. Gap priority is binding, not advisory.** "New slots go first to the gaps" left the remaining room in under-cap strands (travel 6 slots, study 3, energy 2) free to fill with demand-1 and demand-2 ideas while the gaps wait for their waves. The amended rule: while an open strand has an uncovered demand-3 concept, **no new Life Hacks brief is written on a concept of demand 1 or 2, in any strand.** Rebuilds, fixes and merges of landed lessons are not new briefs. Today this means the next two new Life Hacks briefs are `interleaved-practice` and `learning-styles-debunk` (study, wave 1). Digital's two gaps come next, when wave 2 opens. Which idea fills each concept is cm-lifehacks's call.

**A3. The 200 must not starve the gap strands.** Kitchen (wave 3) and cleaning (wave 4) wait on review gates, and the same reviewers now owe attestations on 200 lessons. Wave order is unchanged. Two things are added:
- Kitchen briefs and the kitchen safety pattern note are prepared during wave 2 (README §6.1), whatever the state of the 200's queue.
- **Tripwire:** if no kitchen brief and no cleaning brief exists at the next OP planning, I reopen the wave order with the founder, with the trade-off written down. It does not drift.

**A4. Corrections to how my objections are stated** ("Accepted costs" above):
- Item 4 says "the 25 lessons that land". It means the **25 out-of-scope lessons** (on 15 concepts marked "(out of scope)" in their names, with demand 1) out of the 200 that land. "Tagged out of scope" is a name suffix, not a field. A tool cannot filter on it. That is accepted, and nothing new keys on it.
- Item 5 leaves out part of the objection: **none of the 200 is framed as a debunk**, although the charter says debunks count as much as tips. This cost is accepted. Debunk concepts count as gaps: `learning-styles-debunk` is already first in line under A2.
- My objection 4 ("the 200 figure is the contributor's account") is **resolved, not overridden**. The founder said "Go ahead, all 200" in their own words, which is the reopening condition I wrote.
- I add one cost: review capacity spent on the 200 is capacity not spent on the gap strands. A3 is how it is watched.
- Items 1, 2, 3 and 6 state my objections faithfully.

**A5. The curriculum as applied is co-signed, with one fix owed.**
- The 136-concept map meets the acceptance conditions of decision item 7: ids named for ideas (`tags-are-not-copies` matches its slug but is an idea name, so it is accepted), demand set per concept, and strands in `subarea`.
- **Owed by cm-lifehacks:** the file's `note` line still reads "Founder-requested 200-lesson review collection … Each concept requires safety review before first publication". The collection file does not exist. Safety review applies to the classes in "How claims get checked here", not to every concept. Rewrite the note to match this charter.
- W-393 (demo-builder: re-derive level, prerequisites and strand in the 200 meta.json) still stands.

**Ruling 2026-10-14 (W-570, head-of-product).** Decision `company/decisions/2026-10-14-w570-lifehacks-wave-state.md`. (1) Wave 2 is not open: the wave-1 exit gate (Domain Launch Review passing 5 lessons, `spaced-beats-cram` published) is unmet, and A1 is an exception to strand closure, not to wave order. (2) A3's tripwire has not fired. Its second bullet is restated: at the next OP planning, if wave 2 is still not open, or the Domain Launch Review is not scheduled with 5 named candidates, the head of product takes the wave order to the founder. Cleaning briefs and its pattern note are prepared during wave 3. (3) W-556's Wave K gate does not apply to the Wave J briefs (ranks 6-14). Those briefs are held by their own gates, including W-569 (formats).

**This co-sign would be wrong if:**
- slot allocation turns out not to read the uncovered demand-3 list (checked at the next OP planning);
- or the study gaps get briefs but no lesson because the 200's pipeline is holding the builders. In that case A2 has only moved the queue, and I take the capacity question to the founder.
