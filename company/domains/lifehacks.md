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

Source: `company/decisions/2026-10-14-pr2-lifehacks-scope.md` item 6, adjusted for its "Founder decision" section (all 200 PR #2 lessons land). Co-sign: head-of-product, pending (she records the founder's override in that decision record). Written by cm-lifehacks in session 2; received by message and committed by session 1.

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
