# Life Hacks scope: the localization lens (Arabic, the Mawdoo3 reader)

author: localization-lead (Yuki) · written 2026-10-14 · question: if Mawdoo3's reader is our model of an Arabic-language audience, which Life Hacks strands and topics are culture-specific, which travel across locales, should Arabic come first or later, and how do claims change per region? · status: **proposal**. It changes no curriculum, schema or lesson. The locale decision belongs to the founder and the head of product (`company/international/README.md`, open question 1); this file is my recommendation.

Inputs: `CLAUDE.md`; charter `company/domains/lifehacks.md`; curriculum `content/curriculum/lifehacks.json`; briefs `company/domains/briefs/lifehacks.md`; `company/product/demo-standard.md`; `company/international/README.md`; EDD-003 open question 2; the sibling lenses in this folder (`category.md` strands S1 to S12, `research.md` §2 and §3 on Mawdoo3 and Arabic search, `vertical.md` audience A4); a grep of `src/` for locale support; and PR #2 (`origin/codex/lifehacks-200`, `content/collections/lifehacks-200.json`), read as data from titles and groups only.

**Limits.** (1) I have not opened mawdoo3.com; the research lens could not either (`research.md` §1). What I say about the Mawdoo3 reader rests on its summaries (top audiences Egypt, Saudi Arabia, Algeria; how-to core is cooking, study, cleaning, self-care) and on my own knowledge. (2) The regional facts named below (voltages, tariffs, weekends, calendars) are **examples of what must be checked, not claims**. None has been checked for this file; each goes to a fact-checker before it reaches a learner. (3) No learner in any locale has seen a Life Hacks lesson.

## 1. Where we stand technically (checked in the repo, 2026-10-14)

- `src/app/layout.tsx` hard-codes `<html lang="en">`. There is no `dir="rtl"` anywhere in `src/`, and no Arabic font.
- Lesson text lives inside each `Demo.tsx` as string literals, and numbers are formatted with `toLocaleString("en-US")`. A variant today means a forked component.
- EDD-003 stage 1 (variants as data) is not built. The international process in `company/international/README.md` is a draft that waits on it.

So no Arabic lesson can ship this quarter without platform work, whatever we decide about priority. That shapes the plan in §5.

## 2. Three kinds of claim, and what each needs per locale

Every learner-facing claim in a Life Hacks lesson falls into one of these. I propose that each claim in `meta.json` carry this as a field (`locality`), which needs a schema change (head of product and principal engineer, via EDD-003):

| Class | What it is | Example (from the five briefs) | Per locale |
|---|---|---|---|
| **U: universal** | Mechanism, math, a peer-reviewed result that does not depend on place | The table-turning theorem; the spacing effect (Cepeda 2006); Raymer & Smith's knot curve | Carries over through a **verified translation**. The fact-checker checks that the Arabic sentence says what the source says (no strengthening, no lost qualifier such as "in this setup"); the fact itself is not re-sourced. This is my answer to EDD-003 open question 2, and it matches the draft proposal there. |
| **R: region-dependent** | True in some places only: law, standards, prices, tariffs, climate, products, calendars, food rules | A standby-power cost per year; a unit-price label rule; "about 3 hours" towel drying in a given room | **Re-sourced and re-checked per country**, not per language. `ar-EG` and `ar-SA` are separate checklists even though they share a translation. |
| **I: illustrative** | Stated numbers and scenes chosen by the builder (towel size, prices in the question, the seed) | "a 0.7 x 1.4 m towel"; any price in a shopping question | **Recomputed**, then checked as arithmetic, and seen by the cultural reviewer (is the example plausible here?). Not fact-checked against a source, but the stage must still say "illustrative". |

Rule I would add to the Life Hacks charter: **a lesson whose reveal depends on an R claim cannot be localized by translation alone.** Its question numbers, stage readouts and reveal are rebuilt from the local facts, and the prediction's answer may change. The localizer flags it; the fact-checker re-checks it; the cultural reviewer sees the walkthrough.

## 3. Strand by strand: what travels, what does not

Strands are the category lens's (`category.md` §2). "Travels" means the insight and interaction survive; examples and units are always adapted.

| Strand | Travels? | What changes for an Arabic-speaking home (Egypt, Saudi Arabia, Algeria) |
|---|---|---|
| S8 `study` | **Travels best.** Mechanisms are cognitive science (U). | Exam seasons and systems differ by country (e.g. Egypt's secondary-school final exam, Saudi national tests), which changes the scenario, not the claim. Arabic study search demand is high (`research.md` §3, medium). Ramadan changes study timing; any line about sleep or fasting while studying is a health claim and goes to the safety reviewer, or out. |
| S3 `laundry` (knots, drying) | Travels: knots are U. Drying is U as a mechanism, R in its numbers. | Drying times depend on climate. A Gulf summer (hot, very dry) and a humid coast (Jeddah, Alexandria) give different answers to "how long". Washing hung on roofs and balconies, dust. Recompute; never reuse an English drying time. |
| S4 `fix`, S5 `storage` (geometry, fit, measuring) | Travels: geometry is U. | Metric is already standard in all three countries, so lessons built on inches (PR #2 "An inch is exactly 2.54cm") lose their point and should be dropped from the Arabic set rather than translated. Furniture and storage examples change (floor seating, built-in wardrobes, roof water tanks in Egypt). |
| S9 `time` | Mostly travels (U), with **calendar traps** (R). | The working week differs: Friday is a weekend day in Saudi Arabia, Egypt and Algeria (check per country and per sector). PR #2's "What does 'Friday' mean?" becomes a different lesson, not a translation. Two calendars are in use (Hijri and Gregorian); Ramadan working hours shorten by law or custom in several countries (R, check). Date formats and Arabic-Indic versus Western digits differ (Egypt and the Gulf commonly use ٠١٢٣, Algeria commonly Western digits; the cultural reviewer confirms). |
| S10 `digital` | Mechanism travels; **UI does not**. | Right-to-left text, mixed Arabic and English file names, bidirectional pasting, Arabic search (letter forms, hamza and taa marbuta variants, diacritics) change what "search the file name" even means. Keyboard shortcuts and menus differ in Arabic interfaces. Every screenshot-like stage must be redrawn RTL. This strand has a real Arabic-native opportunity (Arabic search normalization is a genuine "why didn't it find it?" lesson). |
| S11 `travel` | Packing geometry travels (U). | Airline rules, baggage allowances, Umrah and Hajj travel, summer heat in parked cars. Anything about heat and children or pets is safety review; laws and allowances are R. |
| S6 `energy` | Mechanism travels (power x time, U). **Every figure is R.** | Tariffs are tiered and subsidised differently in each country, and change often; grid voltage and frequency differ (check: Saudi Arabia completed a move to 230 V / 60 Hz; Egypt 220 V / 50 Hz; Algeria 230 V / 50 Hz, all unverified here). Air conditioning dominates summer bills in the Gulf, so the most useful Arabic energy lesson is AC set-point and running time, not standby power. Rooftop water tanks and water heaters (electric versus gas). Recompute every kWh and currency figure; label tariffs as dated. |
| S7 `shopping` | The arithmetic travels (U). **Its examples are the most US-shaped content we have.** | Coupons, "free-shipping thresholds", sales tax added at the till and shelf unit-price labels are not the norm everywhere. VAT is included in shelf prices in Saudi Arabia (check); bargaining, cash on delivery, gold priced per gram by karat (21k is a common Egyptian and Gulf standard, check) and bulk buying before Ramadan and Eid are the local shapes. Money arithmetic is allowed; recommendations are refused (charter). Currencies: EGP, SAR, DZD, each "illustrative" with a date. |
| S1 `kitchen` | Mechanisms travel (heat, salt, water). **Examples and food rules are the most culture-specific of all.** | Halal is the default; any pork or alcohol example is a block at cultural review, and alcohol as a cooking or cleaning ingredient (vinegar is fine) needs a check. Regional staples: rice, bread, ghee, dates, legumes, Arabic coffee and tea. Iftar timing creates real how-to questions (keeping food hot until sunset, cooling water fast). Food-safety rules are R. Every kitchen lesson is already safety review (category lens). Mawdoo3's largest how-to stem is recipes (`research.md` §3, memory, unchecked): we do not do recipes, only the why behind a method. |
| S2 `cleaning` | Mechanism travels; products do not. | Brand and product names, what is sold (local bleach strengths and labels differ, R), dust and sand, marble and tile floors, water hardness. The chemical refuse list applies unchanged in every locale. |
| S12 `garden` | Weakest transfer. | Arid climate, irrigation, date palms, balcony plants; seasons are different. Demand is low (category lens). Later. |

**Ramadan and fasting, specifically.** It is the largest culture-specific driver in this audience (search seasonality, `research.md` §3), and most of what people search about it is outside our scope:
- **Refuse in every locale**: religious rulings (what breaks a fast, prayer validity, zakat amounts as obligations). This is not a mechanism we can source in our sense, and it varies by school of jurisprudence. I propose adding "religious rulings" to the charter's refuse list explicitly; the safety reviewer owns that list, so this is a proposal to them.
- **Health, refuse or safety review**: fasting and hydration, what to eat at suhoor, sleep while fasting, caffeine withdrawal.
- **In scope, and good lessons**: why Ramadan comes about 11 days earlier each Gregorian year (lunar year of about 354 days; U, astronomy and calendar arithmetic); why the start date can differ between countries (moon sighting versus calculation; R, stated as "can differ", no ruling); fasting hours change with latitude and season (U geometry, with R examples per city); keeping water cool in a clay jar (the زير or قُلّة, evaporative cooling, U, a direct cousin of the towel lesson); budgeting arithmetic for Eid and Ramadan shopping (U arithmetic, I examples).

## 4. PR #2 through this lens (titles only)

From the manifest (70 `home`, 70 `study`, 60 `resources`), by keyword triage that an evaluator must confirm on the artifacts:
- About **25** titles carry money mechanics (price, fee, coupon, voucher, shipping, discount, bill). The arithmetic travels; the scenarios (coupons, free-shipping gaps, parcel fees, two-for-one) are US or EU retail shapes. They need new examples, recomputed numbers and a cultural check, not a translation.
- About **17** carry energy or water figures (power, tariff, flow, litres). Each needs local tariffs and appliance norms: all R.
- About **31** involve files, search, text editing, names, dates or links. These need RTL redrawing and Arabic search behaviour; some lose their point (anything that relies on English word order or Latin sorting).
- The geometry and fit lessons in `home` (circles, boxes, diagonals, doors, nesting) travel best: U claims, metric already, examples to adapt. They are the cheapest Arabic candidates in the PR.
- Drop from an Arabic set: inch conversion; "Friday" deadline semantics as written.

None of PR #2's lessons has verified claims (its own note says so), so none is a localization candidate until it passes the English pipeline first. Localizing an unverified lesson doubles the unverified surface.

## 5. Locale plan: Arabic designed in now, shipped second

**Recommendation: Arabic later, but not as an afterthought.** Confidence: medium. The reasons it is not first: the kit has no RTL or language support (§1), variants are not data yet (EDD-003), Life Hacks has not launched in English (incubating, no learner data), and we have one named cultural reviewer. Shipping Arabic first would mean building lessons we cannot verify or render properly. The reasons it must be designed in now: Mawdoo3's audience is large and underserved by interactive content (`research.md` §2, medium), and retrofitting locality onto 200 lessons later costs far more than tagging it while writing.

If the founder's target market is Arabic first, the answer flips to a separate **Arabic-native stream** (lessons conceived in Arabic, §3's Ramadan and AC examples), still gated on the same platform work. I would not translate the English set first in that case.

| Phase | When | What | Gate to the next phase |
|---|---|---|---|
| 0. Locale-ready authoring | Now | Every new Life Hacks brief tags each claim U / R / I; keeps numbers, units and money in one place in `Demo.tsx` (a constants block), not scattered in strings; avoids US-only examples where a neutral one works; names its R claims in the brief. No Arabic content yet. | The category manager adopts the rule in the briefs format. |
| 1. Platform and demand | Next quarter | (a) RTL and Arabic font spike in the kit (`lang`/`dir` per lesson, mirrored controls, Arabic-Indic digit option, bidi-safe readouts): platform engineer, principal engineer. (b) EDD-003 stage 1 variants as data. (c) Arabic how-to demand pull for EG and SA (`research.md` open question 3). (d) Recruit at least one cultural reviewer each for Egypt and the Gulf; a reviewer may not review a variant they localized. | RTL renders a lesson correctly under computer-use QA; demand pull done. |
| 2. Arabic pilot, `ar` (simplified Modern Standard Arabic) with `ar-EG` and `ar-SA` fact sets | After the Life Hacks Domain Launch Review in English | 8 to 12 lessons, chosen from launched English lessons with mostly U claims: spaced-beats-cram, square-bow-stays-tied, long-cord-knots-itself, wobbly-table-quarter-turn, towel-spread-dries-first (recomputed for two climates), plus geometry lessons from PR #2 once verified. One translation, two R checklists. Learner-facing dialect stays MSA at a beginner reading level; Egyptian or Gulf colloquial only in example names and scenes, as the cultural reviewer advises. | Per-locale launch review passes; no R claim unchecked (my authority stops here: I may not ship a locale whose region-dependent claims are unchecked). |
| 3. Arabic-native lessons | After the pilot shows learners finish them | Ramadan calendar, fasting hours by latitude, clay-jar cooling, AC set-point cost, Arabic search normalization, Eid budget arithmetic, Gulf-climate drying. Conceived in Arabic, back-ported to English where useful. | Same gates as any lesson, plus cultural review. |
| 4. `ar-DZ` and the Maghreb | Later | Algeria is Mawdoo3's third audience, but its digits, French loanwords in daily use, products and tariffs differ again. Its own fact set and reviewer. | |

## 6. Per-locale claim checklist (the template I will keep in `company/international/`)

For each lesson x locale, the localizer lists, and the fact-checker signs off:
1. Every R claim: local source, date, country. Tariffs and prices carry a "checked on" date.
2. Every I number: recomputed, and the prediction's correct answer re-derived (it may change).
3. Units, digits, date format, week start, currency symbol position (RTL).
4. Every U claim: the translation preserves the source's qualifiers.
5. Cultural review verdict (native / revise / block), from a reviewer of that region who did not localize it.
6. Safety: the refuse list applies in every locale; a lesson that passed safety review in English is re-reviewed if a local product, appliance or food changes the risk (e.g. gas cylinders, local bleach strength).

## 7. Asks of other roles (for the board, not written there by me in this task)

- head-of-product: decide Arabic later (designed in now) versus Arabic-native first; accept or reject the `locality` claim field.
- principal engineer and platform engineer: RTL and Arabic font spike; per-lesson `lang`/`dir`; locale-aware number formatting.
- lifehacks-safety-reviewer: consider adding "religious rulings" to the refuse list; confirm that fasting and hydration lines are health claims.
- cm-lifehacks: adopt U / R / I tagging and the constants-block rule in new briefs.
- research-scientist: Arabic how-to demand pull for EG and SA.
- cultural-reviewer (Amira): confirm digit, weekend and food-example norms named in §3 for her region; name which regions she can review.

## What I believe and how sure I am

- Study, knots and geometry travel well; shopping and energy carry the most region-dependent claims; kitchen and Ramadan carry the most culture-specific examples. High confidence on the shape, low on any specific regional fact (none checked here).
- Arabic should be designed in now and shipped after the English launch review and the RTL work. Medium confidence; it flips if the founder's market is Arabic first.
- PR #2 is US-shaped in its money and digital examples; roughly a third of it would need rebuilding, not translating, for Arabic. Low-medium confidence (titles only, no walkthroughs).
