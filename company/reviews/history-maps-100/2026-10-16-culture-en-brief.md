# Stage A sensitive review, batch record: the 100 History map lessons of PR #4 (W-1558)

slug: history-maps-100
stage: brief
classes: borders and territory, colonialism and empire (several lessons also touch political figures, religion, migration and war and violence; see each record)
reviewer: cultural-reviewer (W-1558 instance, 2026-10-16)
brief: src/demos/history/map-*/meta.json and map.json (100 lessons, one generator: tools/history-maps/generate.mjs), at branch pr4/hist @ ba3e035f
research note: company/research/notes/2026-10-16-provenance-history-maps-100.md
Verdict: per lesson (table below): 95 go with changes, 5 refuse, 0 go

This file carries the set-wide rulings. Each lesson has its own record, `company/reviews/<slug>/2026-10-16-culture-en-brief.md`, which cites the rulings by number. A "go with changes" is never a "go": every lesson needs rulings 1, 4 and 5, so none can be called "nothing to fix". Of the 95, 62 also carry lesson-specific changes (the 10 research-tier A lessons less the 5 refused, plus the 55 B plus athens-thessaloniki and havana-san-juan, which research tiered C and I raised) and 33 carry set-wide changes, recall swaps and full-NAME fixes only.

Independence: I did not draft the briefs, build the lessons, or write the research note. I read the research note, the shared stage (`src/lib/history-maps/HistoryMapStage.tsx`), the generator, the 100 `map.json` and `meta.json`, and the integration record `company/reviews/history-maps-100/build.md` after forming the findings from the data. I did not open the pinned GeoJSON files or any outside source; every statement about what happened in a year is the research note's "unverified (memory)", or mine, and is marked so. Nothing here is a fact-check.

## Refuse list (5)

| Lesson | Items | Why it cannot be fixed inside the lesson |
|---|---|---|
| map-amman-beirut-1920-1960 | R6, P3 | 1960 draws Jerusalem, Ramallah and Gaza inside one "Israel" polygon coded "determined by international law"; 1920 strips (GB) and (France) and puts Amman in "Mesopotamia". The error is in the data. |
| map-taipei-beijing-1880-1960 | R6, F6, P3 | Taiwan, China, Tibet and the Koreas are each one polygon, and the answer key states a relationship between Taipei and Beijing. |
| map-dili-kupang-1800-1960 | R6, P3 | The Dili anchor was moved 17.8 km to find a label; the answer asserts Indonesian sovereignty at Dili in 1960. |
| map-baku-yerevan-1800-1900 | R6, P3, F6 | Both frames carry labels that look wrong for the year, and the answer "same, same" joins two cities of a live territorial conflict. |
| map-dali-lhasa-1200-1700 | R6, F6, P3 | Tibet against two stale Yunnan labels; its status relative to the Chinese states is a contested reading the stage settles by drawing one polygon. |

I did not soften any of these to "go with changes". The five other research-tier A lessons (kabul-peshawar, karachi-delhi, dhaka-kolkata, addis-ababa-massawa, sydney-wellington) are "go with changes" because their problem is wording, a recall, a crop or an anchor, and none draws a polygon that settles a dispute that is live today. If the fixes named in their records cannot be made (for example the Durand Line sentence cannot be sourced), the record says retire.

## Set-wide rulings

**Ruling 1. The limit sentence (research note section 1).** Accepted, with edits. Add at the end of every reveal and to every `limits` claim: "This is one modern project's hand-made drawing, not a record made by the states shown, and some labels are carried over from other years or are wrong for the year shown." Reasons: the existing sentence does not say that a label itself can be wrong (F5 against the research note), nor whose drawing it is (P1). My edits to the proposal: it now names the maker (a modern project, not the states), and it drops "the map is one project's reading", because the README says polygons are generalised and shifted, not that they are a reading. Also replace "An unlabelled dot means missing coverage in this reconstruction, not empty land" with "An unlabelled dot means the source names nothing at that point (it may still draw a polygon there), not empty land", because the research note counted 191 of 782 polygons in 1700 and 148 of 291 in 1500 with no NAME. The `limits` claim is `support: source` on the README; the new sentence about labels is `derivation` from the research note's counts and needs the fact-checker. This applies to all 100 lessons, which is why no lesson is a plain "go".

**Ruling 2. Abbreviated labels that drop colonial markers.** The trace and key show the full NAME, never ABBREVN. 50 lessons differ in at least one label; 20 drop a marker or change the meaning, the worst being: "Syria (France)" shown as "Syria", "Senegal (FR)" as "Senegal", "Angola (Portugal)" as "Angola", "Dutch East Indies" as "East Indies", "Netherlands Indies" as "Netherlands" (Makassar and Ternate), "New South Wales (UK)" as "United Kingdom", "Denmark-Norway" as "Norway" (Copenhagen), "Emirate of the White Sheep Turks" as "Turks" (Tehran, Shiraz, Tabriz), "Austrian Empire" as "Austria-Hung", "Manchu Empire" as "Manchu China", "Viceroyalty of Peru" as "Peru", "Seljuk Caliphate" as "Seljuk Turks". The source named the coloniser and the dropped word is the one P1 asks the lesson to keep. If width is the reason, truncate with an ellipsis, never an abbreviation of the data. Owner: the generator owner (principal-engineer for the stage, W-1556). Each record lists its own pairs.

**Ruling 3. Recall to lesson, by fit not rotation.** Recall 9 ("Nothing necessarily; the map classification changed") is removed from all 10 lessons it lands on. It is true as map logic, and on amman-beirut, dhaka-kolkata, sydney-wellington, dili-kupang, dali-lhasa, addis-ababa-massawa, ashgabat-mashhad, athens-thessaloniki, belgrade-sarajevo and nouakchott-saint-louis it reads as minimisation of displacement, conquest or colonisation (L2; R5-adjacent). The assignment rule, in order: (a) a lesson with an unlabelled dot gets recall 2; (b) a lesson that had recall 9 gets recall 1 if its labels differ in any frame, else recall 3; (c) a lesson in ruling 6's set whose labels are the same in both frames gets recall 3 (a matching label does not prove uninterrupted control); (d) kabul-peshawar gets recall 8 and new-york-boston recall 1. 31 lessons change; each record gives the index. Recall 8 stays where it already fits. The change is a regeneration by the generator owner, not an edit by the builder.

**Ruling 4. Disputed lines, source wording, colour (I3, I4, L1, L6).** (a) The stage caption on every lesson becomes: "Area anchors · One project's approximate reconstruction · Mercator · Lines and names are the source's; borders disputed today are not settled here". The current caption says only "Approximate reconstruction" and does not say whose. (b) Source labels are shown in quotation marks as the source's wording. That covers "Berber Tribes", "Tuareg Nomadic Tribes", the "hunter-gatherers" labels and "Caliphate" used as a state label; the lesson does not repeat them as its own words and does not rename them (renaming would alter the data). A key note on a self-name (for example Amazigh) goes in only if the fact-checker supports it. (c) The first dot's polygon is filled in `var(--good)`, green; replace it with a neutral hue so that no people's polygon is coloured "good" (I4). (d) The lesson may not draw disputed polygons dashed unless the engine can do so; the caption is the minimum.

**Ruling 5. Modern place names (L4, N4).** Keep modern place names as orientation, with the point legend reading "A · Istanbul (today's name)" and, where the anchor sits 10 km or more from the named site, "(anchor N km from the site)". Where the city is not recorded in the earlier year, "site of today's ..." (Addis Ababa 1880, Harare 1900, Nouakchott 1900; dates unverified, memory). Jakarta-surabaya has the largest offset in the set, 35.6 km.

**Ruling 6. Transition sentence.** For lessons whose years span a conquest, colonisation, partition or occupation (51 lessons; each record says "Ruling 6"), add to the reveal and the `limits` claim: "A changed label records a change in how the map classifies the place; it does not show what happened to the people there." It is a statement about the map, so it can be checked, and it replaces the effect of recall 9 without being a claim about any event. The events themselves stay off the stage (no counts; N1 to N3 do not apply).

**Ruling 7. The Africa pattern (P2, P4).** 9 of the 12 lessons with a missing label are African (research note 4.4). The three whose dots are unlabelled throughout (sofala-kilwa, mombasa-zanzibar, soyo-cabinda) may proceed only if the reveal names the gap as the source's and gives at least one sourced named place or polity; otherwise retire them. cm-history is asked to rebalance the roster so that Africa is not the region of blanks: this is advice with an owner, not a verdict, and it cannot make a lesson fail. Five South Asian lessons that pair "Mughal Empire" with "British Raj" and show no local polity (delhi-agra, pune-hyderabad, chennai-bengaluru, mumbai-surat, dhaka-patna) get a data sentence that no local polity is drawn at the dots; cm-history may consolidate them.

**Ruling 8. Stale labels (P3).** Where the research note flags a label as wrong for its year, a caveat is enough only if the answer does not depend on the label. If it does (seoul-busan, hangzhou-beijing and guangzhou-hanoi at 1400, where the Ming and Joseon lands carry "Great Khanate"), the snapshot is replaced or the lesson retired. Elsewhere the reveal quotes the label as the source's and the fact-checker supplies the checked wording. Every "unverified (memory)" year in the records is an inference for the fact-checker, not for a learner.

## What I could not check

- Whether any label is right for its year: the research note says reference sites were refused by the proxy; I did not try outside sources and opened none. Every historical date in the lesson records is memory and marked.
- Whether the readers I took (a resident of each place) would agree. I cannot be one; I named the reader so that the Stage B walkthrough and learner reviewers can test it with real readers (P3).
- The stage rendering. This is Stage A on the brief; Stage B will see the walkthrough.

## Objections and how they were answered

| Objection | By | Answer |
|---|---|---|
| "The limit sentence is enough; labels carry caveats." | implicit in the generator's limits claim | Not enough: the sentence does not say a label can be wrong, nor whose drawing it is. Ruling 1 adds both. |
| "Recall rotation is harmless: every recall is true map logic." | generator comment | True, and the harm is placement: recall 9 on ten pairs with displacement reads as minimisation. Ruling 3. |
| Research-lead proposed "the map is one project's reading" | research-lead (section 1) | Accepted in substance, reworded (ruling 1) because the README calls the polygons generalised and shifted. |
| Research-lead tier A (10) | research-lead | 5 refused; 5 go with changes, with the reason for each difference in its record. |

## Routing

- cm-history (W-1551, W-1561): answer each FIX in the brief; decide retire or replace for the 5 refused lessons and for lessons whose records say "retire if unsupported"; rebalance (ruling 7); consolidate if wanted.
- research-lead: point-test replacement snapshots for the 1400 lessons; re-anchor sydney-wellington and jakarta-surabaya; name sourced places for the three African lessons.
- fact-checker: every sentence added by these rulings and every "unverified (memory)" date named above, before any is used as a reason or reaches a learner.
- principal-engineer (W-1556): rulings 2, 4 and 5 in the stage and generator, and the antimeridian crop in sydney-wellington.
- Stage B (cultural-reviewer) after the changes, on the walkthrough, per batch of at most 30 (W-1552).
- Holds: no brief-skips or publish-holds line is touched by this review. The existing publish-hold lines stay on all 100.

## Per-lesson verdicts

| Lesson | Research tier | Verdict |
|---|---|---|
| map-accra-kumasi-1880-1960 | C | go with changes |
| map-addis-ababa-massawa-1880-1960 | A | go with changes |
| map-amman-beirut-1920-1960 | A | refuse |
| map-ankara-istanbul-1300-1530 | B | go with changes |
| map-antananarivo-toamasina-1880-1960 | C | go with changes |
| map-ashgabat-mashhad-1800-1900 | B | go with changes |
| map-athens-thessaloniki-1815-1900 | C | go with changes |
| map-baghdad-tabriz-1200-1279 | B | go with changes |
| map-baku-yerevan-1800-1900 | A | refuse |
| map-balkh-samarkand-1500-1700 | B | go with changes |
| map-bangkok-chiang-mai-1600-1900 | C | go with changes |
| map-barcelona-marseille-1492-1700 | C | go with changes |
| map-beijing-nanjing-1200-1279 | B | go with changes |
| map-belgrade-sarajevo-1800-1920 | B | go with changes |
| map-berlin-munich-1700-1900 | C | go with changes |
| map-buenos-aires-asuncion-1700-1880 | B | go with changes |
| map-cairo-damascus-1000-1200 | B | go with changes |
| map-cape-town-pretoria-1800-1900 | B | go with changes |
| map-chennai-bengaluru-1700-1900 | B | go with changes |
| map-colombo-kandy-1700-1900 | C | go with changes |
| map-cusco-quito-1492-1530 | B | go with changes |
| map-dakar-bamako-1880-1960 | B | go with changes |
| map-dali-lhasa-1200-1700 | A | refuse |
| map-damascus-baghdad-600-800 | C | go with changes |
| map-damascus-cairo-1500-1530 | C | go with changes |
| map-delhi-agra-1530-1700 | B | go with changes |
| map-delhi-lahore-1200-1530 | C | go with changes |
| map-dhaka-kolkata-1900-1994 | A | go with changes |
| map-dhaka-patna-1700-1900 | B | go with changes |
| map-dili-kupang-1800-1960 | A | refuse |
| map-dublin-london-1700-1960 | B | go with changes |
| map-fez-algiers-1200-1700 | B | go with changes |
| map-guangzhou-hanoi-1400-1700 | B | go with changes |
| map-hangzhou-beijing-1279-1400 | B | go with changes |
| map-hanoi-hue-1400-1700 | B | go with changes |
| map-harare-maputo-1900-1960 | B | go with changes |
| map-havana-san-juan-1800-1960 | C | go with changes |
| map-helsinki-stockholm-1700-1920 | C | go with changes |
| map-herat-kabul-1400-1700 | C | go with changes |
| map-jakarta-surabaya-1600-1800 | B | go with changes |
| map-kabul-peshawar-1700-1900 | A | go with changes |
| map-karachi-delhi-1900-1960 | A | go with changes |
| map-kathmandu-patna-1700-1900 | B | go with changes |
| map-khartoum-cairo-1800-1900 | B | go with changes |
| map-lagos-ibadan-1880-1960 | C | go with changes |
| map-lima-potosi-1530-1800 | B | go with changes |
| map-lisbon-seville-1200-1530 | C | go with changes |
| map-london-edinburgh-1500-1700 | C | go with changes |
| map-luanda-kinshasa-1880-1960 | B | go with changes |
| map-makassar-ternate-1600-1900 | B | go with changes |
| map-malacca-aceh-1500-1700 | B | go with changes |
| map-manila-cebu-1500-1700 | B | go with changes |
| map-marrakesh-fez-1200-1500 | B | go with changes |
| map-mbanza-kongo-luanda-1500-1700 | B | go with changes |
| map-mecca-cairo-1700-1920 | C | go with changes |
| map-mexico-city-oaxaca-1492-1530 | C | go with changes |
| map-mogadishu-berbera-1800-1900 | B | go with changes |
| map-mombasa-zanzibar-1700-1880 | B | go with changes |
| map-mosul-baghdad-1700-1920 | C | go with changes |
| map-mumbai-surat-1700-1900 | B | go with changes |
| map-muscat-zanzibar-1800-1880 | C | go with changes |
| map-n-djamena-kano-1900-1960 | C | go with changes |
| map-naha-kagoshima-1700-1900 | B | go with changes |
| map-naples-tunis-1200-1500 | B | go with changes |
| map-new-york-boston-1700-1900 | B | go with changes |
| map-nouakchott-saint-louis-1900-1960 | B | go with changes |
| map-oslo-copenhagen-1800-1920 | B | go with changes |
| map-palermo-cairo-1000-1200 | B | go with changes |
| map-paris-lyon-1000-1500 | C | go with changes |
| map-phnom-penh-angkor-1400-1700 | B | go with changes |
| map-prague-vienna-1492-1880 | C | go with changes |
| map-pune-hyderabad-1700-1900 | B | go with changes |
| map-quebec-montreal-1700-1800 | B | go with changes |
| map-ravenna-istanbul-500-600 | C | go with changes |
| map-riga-tallinn-1700-1920 | C | go with changes |
| map-rio-salvador-1700-1900 | B | go with changes |
| map-rome-athens-100-400 | C | go with changes |
| map-rome-carthage-100-500 | C | go with changes |
| map-samarkand-bukhara-1000-1200 | B | go with changes |
| map-samarkand-kashgar-1200-1279 | C | go with changes |
| map-sanaa-aden-1878-1920 | B | go with changes |
| map-santiago-buenos-aires-1800-1900 | C | go with changes |
| map-seoul-busan-1400-1900 | B | go with changes |
| map-sofala-kilwa-1500-1700 | B | go with changes |
| map-soyo-cabinda-1700-1900 | B | go with changes |
| map-sydney-wellington-1800-1900 | A | go with changes |
| map-tabriz-isfahan-1500-1700 | B | go with changes |
| map-taipei-beijing-1880-1960 | A | refuse |
| map-tashkent-almaty-1800-1900 | B | go with changes |
| map-tehran-shiraz-1500-1700 | B | go with changes |
| map-timbuktu-gao-1300-1600 | C | go with changes |
| map-tokyo-kyoto-1600-1880 | C | go with changes |
| map-toledo-cordoba-600-800 | C | go with changes |
| map-tunis-tripoli-1500-1700 | B | go with changes |
| map-ulaanbaatar-beijing-1700-1994 | B | go with changes |
| map-venice-split-1700-1815 | B | go with changes |
| map-vientiane-luang-prabang-1800-1900 | C | go with changes |
| map-warsaw-krakow-1700-1920 | C | go with changes |
| map-xian-luoyang-200-700 | B | go with changes |
| map-yangon-mandalay-1700-1900 | C | go with changes |

## Addenda

(none yet)
