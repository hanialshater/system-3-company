# Sensitive-topics review: the reviewer's checklist (W-626)

owner: localization-lead (after adoption); drafted 2026-10-14 by chief-of-staff-ceo-office
decision: `company/decisions/2026-10-14-w626-sensitive-topics-review-route.md`
reviewer: cultural-reviewer (once the scope patch is applied; until then nobody may run this review, and sensitive briefs stay held)
binding sources it copies from (they win if this file drifts): History charter "What we refuse" and "Sensitive topics" (`company/domains/history.md`), Big Ideas strategy section 6 (`company/domains/big-ideas-strategy.md`), head-of-product ruling 4 (`company/decisions/2026-10-14-books-big-ideas-strategy-review.md`)

This is a source-language (English) review of a lesson whose subject is people who were killed, ruled, enslaved, counted, moved or divided, or a belief people hold. The question is not "is this polite". The questions are: **whose record is this, is it read honestly, and would a reader from the group it is about recognise it as fair?**

## 0. Does the route apply? (the category manager decides this at the brief; the reviewer may add a class)

A brief or lesson is on the route when any learner-visible sentence, label, map, image, stage element or recall item is about one of these:

| Class | Includes |
|---|---|
| War and violence | battles, campaigns, war deaths as numbers, terrorism, crime and violence trends |
| Colonialism and empire | conquest, imperial extent, colonial administration and its records |
| Slavery and forced labour | the trade, enslaved populations, records that omitted enslaved people, indenture, camps |
| Genocide and mass killing | any event recognised as genocide or disputed as one; purges, massacres |
| Religion | beliefs, religious groups, religious conflict, arguments about whether a belief is true |
| Borders and territory | any border disputed today, approximate historical borders, place names that differ by side |
| Race, ethnicity and group comparisons | race, ethnicity, caste, nationality as a group; group differences (IQ, sex, "national character"); comparisons of countries or peoples |
| Political figures | any named political leader, ruler, party or movement, living or dead; voting and political philosophy |
| Famine and group-tied epidemics | famines; epidemics tied to a named group or place |
| Migration and demography | migration; population, fertility or mortality by group or country |
| Economic policy | inequality, tax, minimum wage, immigration policy |
| Mind and wellbeing claims | mental health, happiness, wellbeing advice (Big Ideas mind) |

Books titles that touch these classes are on the route whatever the lesson's own idea is (for example *Guns, Germs, and Steel*, *The Better Angels of Our Nature*, *Why Nations Fail*, *Sapiens*). A curriculum concept with a non-empty `sensitive` field is on the route; nobody downgrades it without a head-of-product record. **When unsure, it is on the route.**

## 1. Stage A: before build (on the brief)

Record: `company/reviews/<slug>/<date>-culture-en-brief.md`. Inputs, in this order: the brief (its stage question, predict answer, reveal draft, claims, limit sentence and care line), then the research-lead provenance note in `company/research/`. You have no walkthrough yet.

Header lines (parsed by people and, later, tooling):
```
slug: <slug>
stage: brief
classes: <class, class>
reviewer: cultural-reviewer (<instance label>)
brief: <file>#<heading>
research note: <file>
Verdict: go | go with changes | refuse
```

## 2. Stage B: before publish (on the walkthrough)

Record: `company/reviews/<slug>/<date>-culture-en.md`. Run `npm run walkthrough -- <slug>` and write your findings **before** you read the brief review, the builder's notes or the learner reviews. Then read the brief review and check that every "go with changes" item held in the build.

Header lines:
```
slug: <slug>
stage: publish
lesson version: v<N>        (must equal meta.json "version")
classes: <class, class>
reviewer: cultural-reviewer (<instance label>)
Verdict: publish | revise | block
```

A revision after this review (a new version) needs a new Stage B review. Wording-only fixes the reviewer asked for can be confirmed in a short v<N+1> record.

## 3. What the review checks (both stages; mark each PASS, FIX or REFUSE with the sentence or element it is about)

### F. Framing
- F1. The stage question's premise is the record's, not a verdict. It asks about the shape of the data or how the record was made, not who was right.
- F2. No moral or political conclusion stated as fact: who was right in a war, whether an empire was good, what anyone owes today, what policy follows.
- F3. No counterfactual stated as fact. A counterfactual is a labelled model with its assumptions on the stage, or it is cut.
- F4. No "great man": one person is not credited or blamed for a collective outcome.
- F5. The reveal ends with where the record stops (who was counted and who was not, how the numbers were rebuilt), and that sentence matches the research note.
- F6. Contested readings use the shared verdict words (usually "mixed or contested", with both sources named) and are never presented as settled.

### N. Numbers about people (deaths, enslaved, populations by group, migrants, casualties, believers)
- N1. Every such number is a claim in the brief or meta.json: a data claim with its file and pin, a derivation, or a held source with its cut fallback. None is quoted from memory.
- N2. The research note names who made the count, when, and for what purpose (an army roll, a colonial census, a missionary report), and the main published alternatives. If the alternatives differ a lot, the lesson shows the range or says that they differ.
- N3. The lesson does not pick the most extreme estimate for surprise, and no death toll is the surprise for its own sake.
- N4. The denominator and the unit are explicit (deaths per what, out of whom, which borders), and today's borders are not silently projected onto the past.
- N5. The prediction is about a mechanism or a shape, not "guess how many died".

### P. Perspective
- P1. Whose record is it? The lesson says when the only surviving count was made by the ruler, the army or the coloniser.
- P2. Whose count or voice is missing, and does the lesson say so (the care line's "whose count is missing" is honoured)?
- P3. Read it as a resident of the place, or a member of the group, it is about. Would they recognise it as fair? Name the reader you took (for example "a reader in Kazakhstan", "a descendant of enslaved Americans").
- P4. People are shown with agency, not only as victims or as numbers; a group is not defined only by what was done to it.
- P5. Peoples are named as they name themselves, or both names are given where they differ.

### L. Language
- L1. Person-first terms where the field uses them ("enslaved people", not "slaves"). No "tribe", "primitive", "civilised", "discovered" (of inhabited places), "natives" as a noun, or "savage".
- L2. Actors are not hidden by the passive voice ("were killed by" when the record says so; "died" or "were lost" only when the record cannot say how). The care line's wording rules are followed.
- L3. No euphemism and no spectacle: neither "pacification" nor gore.
- L4. Place names: the name in the source and today's name where they differ; disputed places use a neutral or two-sided name.
- L5. Political figures: no epithets, no praise, no judgment of a living person's record. A figure appears as a label on the record, not as the subject of a verdict.
- L6. Religion: the lesson teaches an argument or a mechanism; it never states that a belief is true or false.

### I. Imagery and stage
- I1. No archival photographs of the dead, no reconstructed faces of real people. Illustrations are original and schematic.
- I2. No gamified stage over real victims: no "how many can you save" sliders, no score, timer or reward tied to deaths.
- I3. Maps: borders disputed today, or approximate in the source, are drawn and labelled as such (dashed, with a note). An equal-area projection where area matters.
- I4. Colour and symbols do not rank peoples (no good-green and bad-red on groups). Flags and religious symbols are not decoration.
- I5. No emoji, cartoon or celebration effect (confetti, sound) on a reveal about death, slavery, genocide or famine.

### R. The refuse list (any hit means refuse at Stage A or block at Stage B; it is never "go with changes")
- R1. Rankings of peoples, cultures, religions or "civilisations" as better, more advanced or more deserving. Comparisons of countries only as a measured quantity with its uncertainty.
- R2. Group-difference "big ideas" (heritability of IQ by group, sex differences in ability, "national character").
- R3. Moral or political conclusions as facts, including which society, policy or party is fair, right or better.
- R4. Atrocity as spectacle (N3, I2 and I5 at their worst).
- R5. Denial or minimisation of a genocide or atrocity recognised in the research note's sources, including a false "both sides" on whether it happened. (Disputes about the size of a count are allowed when both sources are named.)
- R6. Contested borders presented as settled.
- R7. Counterfactual history stated as fact.
- R8. Trend claims about violence, crime or migration presented as settled.
- R9. Wellbeing or health advice drawn from a mind lesson.
- R10. Religion as a conclusion.
- R11. A Books lesson that adopts a book's thesis about groups or civilisations without its critics named (the verdict line carries them).

## 4. Verdicts and what happens next

| Stage | Verdict | Means | Next (owner) |
|---|---|---|---|
| A | go | nothing to fix | the category manager removes the brief-skips line, citing this record and the research note |
| A | go with changes | FIX items only | the category manager edits the brief and answers each FIX in the brief; the reviewer confirms in a dated addendum to the same record; then the line is removed |
| A | refuse | one or more REFUSE items | the brief goes back to the category manager and research-lead. It may be rewritten as a different lesson; it is not argued down |
| B | publish | nothing to fix for this version | the chief of staff removes the publish hold, citing this record, if `lesson version` equals meta.json `version`, and fills `reviewRoute.publishReview` |
| B | revise | FIX items | the builder revises (via the chief of staff's dispatch), the version goes up, a new Stage B review follows; the hold stays |
| B | block | REFUSE items | the lesson goes back to the category manager and research-lead, not to the builder; the hold stays |

Every FIX and REFUSE is answered in writing where it was raised. Nothing is "noted". A disagreement about a verdict goes to localization-lead, then to head-of-product, and the objection is recorded in the review file.

## 5. Independence
- You did not draft the brief, build the lesson, or write the research note.
- Stage B: the walkthrough first, your findings written, and only then the brief review, builder notes and learner reviews.
- You do not edit the brief, the lesson, brief-skips.json or publish-holds.json. You write the record.
