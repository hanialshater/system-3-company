# History through data and maps: ranked lesson briefs (cycle 1, first 12)

owner: cm-history (Henrike) · drafted 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request, for cm-history and the strand managers to re-check (board) · curriculum: `content/curriculum/history.json` · charter: `company/domains/history.md` · data: `node company/domains/briefs/checks/history-data.mjs` (17 sources fetched and pinned by SHA-256, 2026-10-14) · numbers: `node company/domains/briefs/checks/history-cycle1-check.mjs` (all 117 checks pass, 2026-10-14)

Ranked briefs for `tools/claim.mjs next history`, in the same format as the other briefs files (`### N. slug · concept: <id> · level · demand N`). The strand lists (`history.<strand>.md`) come after this one and are empty for now.

## Gate (read first)
**W-556 does not hold History.** The founder lifted the wave gate for this category ("But also add 100 history demos": `company/decisions/2026-10-14-founder-history-100.md`). Each of the 12 still has a line in `company/ops/brief-skips.json` with the reason **"awaiting cm-history re-check"**, because this office drafted them outside its scope (decision record, objection 4). cm-history or the strand manager removes the line after re-checking the brief (check script, claims, duplicate search). Do not `take` them by name before then. **Sensitive briefs (3, 4, 5, 11, 12) stay held after the re-check**, until W-626 gives the cultural-reviewer a source-language scope and the research-lead note exists (charter, Sensitive topics). Their skip lines say so. The standard-route briefs (1, 2, 6, 7, 8, 9, 10) can go to builders as soon as they are re-checked. The suggested first build is brief 1.

## Rules every brief below follows (charter, "Lesson shape" and "How claims are sourced")
- **Numbers come from the check script, not from this page.** Each brief names its check section. Builders copy numbers from the script's output. If a number here and the script disagree, the script wins and the brief is wrong. The script found two of the drafter's errors before this file was written (brief 2's recall answer and brief 11's causes).
- **Preset buttons, in DOM order.** Each preset sets the full state, so pressing every preset once, in the order given, reaches every milestone. Sliders are not used for milestones. There is no Reset button, because QA presses every control and a Reset would wipe the state the reveal quotes.
- **Labels ≥ 10 px** at 390 px wide for every meaning-carrying label at predict and every element the reveal points at (author at 11 px). Decoration may be 8 px and `aria-hidden`. Map and chart axes count as meaning-carrying.
- **Stage text ≤ 25 words** (the question; counted by the script) and **reveal ≤ 90 words** with the numbers filled in (counted by the script). Builders confirm the totals in pre-flight, including any caption.
- **Claims in three families**, listed under these headings in each brief: **Data** (a number read from a pinned file: support `source`, source string "history-data.mjs: <id>, <file>, <column>"), **Derivation** (arithmetic in the check script: support `derivation`), **Source, held** (anything the data file does not contain: the fact-checker opens it or the sentence is cut). Each reveal carries **at most one** held source sentence, with its fallback written.
- **Where it stops** is the reveal's last sentence and a claim. It says who the record leaves out, or how the numbers were made.
- **Transfer recall** on a different case. Its answer is in the check script.
- **Duplicate search** (done for all 12 on 2026-10-14): a text search of the title, hook, misconception and objective of all 945 lessons in `src/demos/`, every other briefs file in `company/domains/briefs/`, every curriculum in `content/curriculum/` and every charter, with the terms listed per brief. Result per brief below. `node tools/overlap.mjs` was not run on unbuilt briefs, because it reads built lessons; the strand manager re-runs it at the re-check.

**Why these 12.** Five are demand 3 and seven are demand 2 (estimates). They split 5 population-economy, 3 maps-borders and 4 events-data, so no strand has more than half. Each rests on a dataset fetched and pinned from this host, and every predict answer is a derivation from that data. Order: demand, then how far the record overturns a common view, then phone fit, then verification cost and route (standard before sensitive). Answers are A ×1, B ×3, C ×8. That spread is skewed toward C. The re-check should rotate the option order on some of 1, 2, 3, 4, 7, 9, 11 and 12 (the script checks whichever letter the brief names, so rotating changes no number).

### 1. survive-childhood-live-to-sixty · concept: life-expectancy-vs-lifespan · intro · demand 3
- Format: Single card (presets on one survivor chart)
- Strand: population-economy (cm-history-population-economy, Olumide). Review route: standard (fact-checker, learner-evaluator). Care: infant deaths are shown as a number and a shaded area, never with images of children.
- Learner knows: life expectancy is "how long people live". / does not know: that it is an average from birth, so infant and child deaths pull it far below the age most adults reached.
- Misconception: In the past, when life expectancy was about 30, people usually died around 30.
- Prediction (stage text, 25 words): "Halley's 1693 Breslau table gives a newborn a life expectancy of about 28 years. Someone who reached 30 died, on average, at about what age?" options: A) About 31 / B) About 45 / C) About 58 (answer: C). Check section 1: e0 = 27.87 (1,238 births a year; 1,000 alive at age 1); 30 + e30 = 57.7 (at most 58.3 if the 20 people alive at 84 lived 16 more years each); 40.9% died before age 5; 60 + e60 = 72.1. Cross-check on separate records: Bellhouse's Breslau deaths for 1687-91 give a mean age at death of 57.4 for those dying over 30.
- What the stage shows: a survivor curve (people alive at each age out of 1,238 born, 0 to 84) with an age axis (ticks every 10 years) and one readout ("average age at death, counting from age {x}: {a}"). Preset buttons in DOM order: "Average from birth" (marks 28 on the axis; milestone `birth`), "Deaths before age 5" (shades the drop to 732; readout 41%), "Average from age 30" (re-averages over those alive at 30; marks 58; milestone `at30`), "Average from age 60" (marks 72). The locked stage shows the curve and the question, with no average marked. Reveal unlocks after `birth` and `at30`.
- Labels: axis ticks 11 px; readout 12 px; curve annotations 11 px.
- Reveal (draft, 77 words by script): "Of 1,238 babies born in a year, about 41% died before age 5, and that pulled the average from birth down to 28. People who got through childhood usually lived much longer: from 30, the average death came at about 58, and from 60 at about 72. Life expectancy at birth averages over everyone, infants included, so a low number does not mean adults died young. Where it stops: this is one city's records over five years."
- Claims:
  - Data: (1) survivors by age in Halley's table: 1,000 at 1, 732 at 5, 531 at 30, 346 at 50, 142 at 70, 41 at 80 (history-data.mjs: halley, HalleyLifeTable.csv, column number). (2) Halley took 1,238 births a year as the cohort (HistData documentation, opened; Halley 1693 not opened). (3) Breslau deaths by age, 1687-91 (history-data.mjs: breslau).
  - Derivation: (4) e0 = 28, 41% before 5, 58 from 30, 72 from 60 (trapezoid rule; tail bound in the script). (5) the independent cross-check, 57.4.
  - Source, held: none in the reveal. "One city's records over five years" rests on the Breslau doc (data years 1687-1691). Optional caption: "Edmond Halley, 1693" (held: Halley, E. (1693), *Phil. Trans.* 17: 596-610; cut if not checkable).
- Duplicate search (terms: life expectancy, died young, infant, child mortality, Halley): 0 lessons, 0 briefs. Nearest: none. `math:mean-vs-median` is the prerequisite (an average pulled by one end).
- Boundary: no neighbour owns life tables. Big Ideas' demographic-transition is about births and deaths over time, not ages at death.
- Curriculum: primary `history:life-expectancy-vs-lifespan`; prerequisites `math:mean-vs-median`; tags life tables, averages, demography.
- Transfer recall (check section 1): "A country's life expectancy at birth rises from 50 to 70, mostly because fewer babies die. Must adults now live 20 years longer?" A) Yes / B) No: most of the rise can come from infants surviving / C) Only if births rise (answer: B).

### 2. income-flat-then-sixteenfold · concept: long-run-income-growth · intro · demand 3
- Format: Single card (presets on one line chart, linear or log)
- Strand: population-economy. Review route: standard.
- Learner knows: people are richer now than in the past. / does not know: that for centuries income per person barely moved, and that nearly all the growth came in the last 300 years.
- Misconception: Living standards rose slowly and steadily through history.
- Prediction (25 words): "Income per person in England about doubled from 1270 to 1700, over 430 years. From 1700 to 2018, how many times over did it grow?" options: A) About 2 times / B) About 4 times / C) About 16 times (answer: C). Check section 2: 1,192 → 2,412 (×2.02, 0.16% a year); 2,412 → 38,058 (×15.78, 0.87% a year; doubling about every 80 years). Before 1700 the series fell as well as rose (1400: 1,717; 1650: 1,446).
- What the stage shows: an index line (1700 = 100), 1270 to 2018, with a year axis and an index axis. There are no dollar labels, because the copy we opened states no unit. Preset buttons in DOM order: "1270 to 1700" (highlights the span; readout ×2.0; milestone `early`), "1700 to 2018" (readout ×15.8; milestone `late`), "Growth per year" (readouts 0.16% and 0.87%), "Log scale" (the same data on a log axis: the late slope is steady, not a sudden cliff). Reveal unlocks after `early` and `late`.
- Labels: axes 11 px; readouts 12 px.
- Reveal (73 words): "In the 430 years to 1700, income per person grew 2-fold; in the 318 years after, 16-fold. Growth of 0.16% a year is invisible in a lifetime, while 0.9% a year doubles income about every 80 years. That is why most of history looks flat on this chart. Where it stops: these are reconstructions from wages, prices and output records, and the series covers England only before 1700, so early values are estimates."
- Claims:
  - Data: (1) GDP per capita for the United Kingdom entity in 1270, 1700 and 2018 (history-data.mjs: maddison, column "GDP per capita"). (2) The series is England for 1252-1700, from Broadberry et al. (2015) (Maddison README, opened).
  - Derivation: (3) ×2.02, ×15.78, 0.16% and 0.87% a year, doubling in 80 years.
  - Source, held: (4) "reconstructions from wages, prices and output records" (Broadberry, Campbell, Klein, Overton & van Leeuwen (2015), *British Economic Growth 1270-1870*, CUP; not opened). Fallback if not checkable: "these are modern estimates, so early values are rough" (convention).
- Duplicate search (terms: income per, GDP, hockey, growth over, long-run, England): 0 lessons on historical income. economics/debt-grows-ratio-falls mentions GDP (a debt ratio, not history). 0 briefs.
- Boundary: economics owns compounding (`economics:growth-rate-gap`, `per-capita-growth`) and `math:rule-of-72`. This lesson is the record. Big Ideas' malthusian-trap (BI-4) owns the population mechanism. This lesson shows the income series only and says nothing about why it broke out.
- Curriculum: primary `history:long-run-income-growth`; prerequisites `economics:growth-rate-gap`; also `math:rule-of-72`.
- Transfer recall (section 2): "One economy grows 0.2% a year for 300 years, another 2% a year for 30 years. Which grows more in total?" A) The 300-year one / B) About the same / C) The 30-year one (answer: B; ×1.82 against ×1.81). The drafter first wrote C, and the script corrected it.

### 3. half-the-men-farmed · concept: farm-share-structural-change · intro · demand 3
- Format: Single card (presets on one stacked bar per census year)
- Strand: population-economy. **Review route: sensitive (slavery, as the 1850 record's coverage)**: research-lead provenance note on who the 1850 to 1860 census occupation records cover; cultural-reviewer `culture-en` on the limit sentence before build and before publish (W-626). Care line: enslaved people are named as people the record failed to list, never as a statistic on the stage; no stage element counts them.
- Learner knows: most people farmed long ago. / does not know: how fast that changed, or that the number of farmers kept rising while their share fell.
- Misconception: A falling share of farm jobs means people left farming early, and it happened gradually over centuries.
- Prediction (25 words): "In the 1850 US census, about half of men with a recorded job farmed. In 2000, what share of men's recorded jobs were farm jobs?" options: A) About a quarter / B) About a tenth / C) About 1 in 50 (answer: C). Check section 3 (men): 1850 51.0%, 1900 39.3%, 1950 14.7%, 2000 2.0%. The number of farming men peaks in 1910 at 10.9 million; 2000: 1.76 million. Women with a recorded job in 1850: 52,043.
- What the stage shows: one bar per census year from 1850 to 2000 (farm, other), with a share readout and a year axis. Preset buttons in DOM order: "1850", "1900", "1950", "2000" (each highlights a year and shows its share; milestone `y2000` on the last), "Count farmers, not the share" (switches the bars to millions of men; milestone `count`). Reveal unlocks after `y2000` and `count`.
- Labels: year labels 11 px (every 50 years at 390 px); readouts 12 px.
- Reveal (74 words): "In 1850 about 51% of men with a recorded job farmed; by 2000 it was 2%. The number of farming men kept rising until 1910 and only then fell: the share dropped because other jobs grew far faster. Where it stops: the 1850 census recorded jobs almost only for free men (52,043 women). Enslaved people, most of whom worked on farms, were not recorded with occupations, so the true 1850 farm share was higher."
- Claims:
  - Data: (1) men by occupation and census year, 1850-2000; farm = Farmer, Farm Laborer, Farm Manager, Farm Foreman (history-data.mjs: vega, jobs.json, IPUMS USA v6.0 per the package description). (2) women with a recorded job, 1850: 52,043.
  - Derivation: (3) the shares, the 1910 peak, 1.76 million in 2000.
  - Source, held: (4) "Enslaved people … were not recorded with occupations" (IPUMS USA sample documentation for 1850 and 1860, or the census instructions; not opened). This is the one held sentence. It must not be cut silently: if it is not checkable, the fallback is "The 1850 records list jobs almost only for free men, so they leave out much of the people who worked", with the research-lead note deciding the wording.
- Duplicate search (terms: farm, agriculture, occupation, census): 1 lesson, ai/loophole-lap-farming (a reinforcement-learning boat; not related). 0 briefs.
- Boundary: economics has no structural-change concept. If cm-economics wants the mechanism (productivity), it is theirs. This lesson is the record.
- Curriculum: primary `history:farm-share-structural-change`; prerequisites none; tags census, work, structural change.
- Transfer recall (section 3): "A town's factory jobs fall from 40% to 10% of all jobs while the number of factory workers stays the same. What happened?" A) Factories closed / B) Other jobs grew about four times as fast / C) The share must be wrong (answer: B).

### 4. disease-killed-eight-to-one · concept: crimean-war-causes-of-death · intro · demand 3
- Format: Before / after toggle (bars by cause; the "before and after March 1855" view persists into the reveal)
- Strand: events-data (cm-history-events-data, Anselm). **Review route: sensitive (war)**: research-lead note (what "zymotic" meant, how Farr and Nightingale compiled the table, the known dispute about the rose's message); cultural-reviewer `culture-en` (W-626). Care line: soldiers are counted, not pictured; no gore; nothing on who was right in the war.
- Learner knows: soldiers die in battle. / does not know: that in this war disease killed eight times as many as wounds, and that the rate changed sharply within a year.
- Misconception: Most soldiers who died in a 19th-century war were killed in fighting.
- Prediction (23 words): "British soldiers in the Crimean War, April 1854 to March 1856. For every man who died of wounds, how many died of disease?" options: A) About 1 / B) About 3 / C) About 8 (answer: C). Check section 4: disease 14,476, wounds 1,758, other 1,748 (disease 80.5%); 8.23 to one; identical totals in the second copy (vega crimea.json); peak January 1855 at an annual rate of 1,022.8 per 1,000; disease deaths a month 930 (first year) and 277 (second year).
- What the stage shows: monthly bars, 24 months, stacked by cause (one colour plus one pattern each, so colour is not the only cue), with a cause legend and a month axis. Preset buttons in DOM order: "Wounds only" (milestone `wounds`), "Add disease" (milestone `disease`; readout "8 to 1"), "Rate per 1,000 a year" (the January 1855 peak labelled), "Before and after March 1855" (two panels, a dashed line at March 1855; milestone `split`). Reveal unlocks after `disease` and `split`.
- Labels: month labels every 3 months at 11 px; legend 11 px; readouts 12 px.
- Reveal (71 words): "Disease killed 14,476 men and wounds 1,758: about 8 to one. In January 1855 disease deaths ran at an annual rate of 1,023 per 1,000, more than the whole army in a year. From April 1855, after a sanitary commission arrived, they averaged 277 a month, against 930 in the first year. Where it stops: weather and army size changed too, so this chart alone cannot prove what caused the fall."
- Claims:
  - Data: (1) monthly deaths by cause and army strength (history-data.mjs: nightingale; second copy vega crimea.json, Nightingale 1859 Table II per the package description).
  - Derivation: (2) totals, 8.23, 80.5%, the monthly averages; rate = 12 × 1000 × deaths / army (the documented formula).
  - Source, held: (3) "after a sanitary commission arrived" in March 1855 (HistData documentation, opened; Nightingale (1858) *Notes on Matters Affecting the Health … of the British Army*, not opened). Fallback: "From April 1855 they averaged 277 a month" with no cause named (data).
- Duplicate search (terms: Crimea, Nightingale, soldier, disease and wound): 0 lessons, 0 briefs.
- Boundary: probability owns chart reading (`probability:per-capita-rates` for rates per 1,000). A later History concept, `nightingale-before-after`, about what the two roses compare, comes only after this one.
- Curriculum: primary `history:crimean-war-causes-of-death`; also `probability:per-capita-rates`.
- Transfer recall (section 4): "A hospital's deaths fall after a new rule, while winter ends and fewer patients arrive. What can the chart alone tell you?" A) The rule caused the fall / B) Deaths fell; the cause needs a comparison / C) Nothing at all (answer: B).

### 5. most-lost-before-moscow · concept: napoleon-1812-attrition · intro · demand 3
- Format: Map explorer (WorldMap, equal-area conic or Mercator at this small extent, with the projection named on the stage; a band whose width is the column's men)
- Strand: events-data. **Review route: sensitive (war)**: research-lead note on Minard's sources and how modern estimates differ; cultural-reviewer `culture-en` (W-626). Care line: "lost" is never written as "killed"; no heroic or villain framing; no person blamed.
- Learner knows: Napoleon's army was destroyed in the Russian winter. / does not know: that most of the main column was gone before it reached Moscow, before any frost on Minard's chart.
- Misconception: The Russian winter destroyed Napoleon's army.
- Prediction (22 words): "Napoleon's main column crossed into Russia with 340,000 men and reached Moscow with 100,000. Did it lose more men advancing or retreating?" options: A) Retreating, in winter / B) Advancing, before winter / C) About the same (answer: B). Check section 5: advance 240,000, retreat 96,000; first reading below zero is −9 on 9 November at 33.2° E, where the column held 37,000 (89% of the start already lost); all three columns 422,000 out and 10,000 back (1 in 42).
- What the stage shows: a map from 23° to 38° E with a band from the Niemen to Moscow and back (width ∝ men, labelled with numbers at 5 points), Minard's temperature readings as labels on the retreat, and a running readout "men left: {n}". Preset buttons in DOM order: "Advance to Moscow" (milestone `advance`; readout 100,000), "Retreat" (milestone `retreat`; readout 4,000), "Minard's temperatures" (labels the first reading below zero and the men left there; milestone `frost`), "All three columns" (adds the two side columns; readout 422,000 out, 10,000 back). Reveal unlocks after `retreat` and `frost`.
- Labels: numbers on the band 11 px; place labels Kowno and Moscow only, 11 px; temperature labels 11 px. The band never carries a label smaller than 10 px at 390.
- Reveal (73 words): "The main column lost 240,000 men on the way to Moscow and 96,000 on the way back. By the first frost on Minard's chart, 9 November, only 37,000 were left: winter finished an army that was already mostly gone. Of 422,000 men in all three columns, 10,000 came back, about 1 in 42. Where it stops: these are Minard's figures, and "lost" counts deaths, desertion, capture and men left behind in garrisons alike."
- Claims:
  - Data: (1) survivors along the route by group and direction (history-data.mjs: minard). (2) temperatures by longitude and date on the retreat (history-data.mjs: minardtemp; no unit in the doc, so the stage says "below zero" and gives no unit).
  - Derivation: (3) 240,000 vs 96,000; 37,000 at the first reading below zero (nearest longitude in the troops file); 422,000 and 10,000; 1 in 42.
  - Source, held: (4) "'lost' counts deaths, desertion, capture and garrisons" (Friendly, M. (2002), "Visions and Re-visions of Charles Joseph Minard", *J. Educational and Behavioral Statistics* 27(1); not opened). Fallback: "these are Minard's figures, not a count of deaths" (convention: the file records survivors, not causes). Note: no year is on the stage. The HistData doc dates the campaign "1815", which is wrong (it was 1812). If the builder adds "1812" anywhere a learner sees it, that is a held claim for the fact-checker to confirm.
- Duplicate search (terms: Napoleon, Minard, army, retreat, Moscow): 0 lessons on the campaign (geography/iss-never-over-moscow and seattle-moscow-heading mention Moscow as a place). 0 briefs.
- Boundary: geography owns projections. A later `flow-map-minard` concept (how the band encodes) comes only after this one.
- Curriculum: primary `history:napoleon-1812-attrition`; prerequisites none.
- Transfer recall (section 5): "A hiking group loses 6 of 10 members before the storm and 3 more during it. What does 'the storm wrecked the trip' miss?" A) Nothing / B) Most losses came before the storm / C) The storm was mild (answer: B).

### 6. rome-placed-too-far-east · concept: longitude-problem-estimates · intro · demand 2
- Format: Single card (van Langren's one-line axis, re-drawn; presets)
- Strand: maps-borders (cm-history-maps-borders, Marisol). Review route: standard.
- Learner knows: old maps were rough. / does not know: that the errors ran almost all one way and were huge even for a short, well-travelled distance, because longitude needed time.
- Misconception: Old estimates scattered around the truth, so their average was about right.
- Prediction (22 words): "Toledo to Rome is 16.5 degrees of longitude. Twelve astronomers and mapmakers before 1644 estimated it. How many came within 2 degrees?" options: A) 1 of 12 / B) About half / C) 10 of 12 (answer: A). Check section 6: true 16.53° (the doc's coordinates); within 2°: only Jansonius 1605 (17.74); all 12 too far east; range 17.7 to 30.1; median 25.8, 9.28° too far ≈ 780 km at 40.9° N; the earliest (Ptolemy, 27.8) and latest (Argoli 1610, 28.2) are about equally wrong.
- What the stage shows: a horizontal axis from 0 to 30 degrees east of Toledo with 12 ticks (one per estimate, 11 px names on tap), a true-value line once revealed, and a km scale bar. Preset buttons in DOM order: "Show the true distance" (milestone `truth`), "Closest estimate" (highlights Jansonius), "Middle estimate in km" (median line and "780 km too far"; milestone `median`), "Sort by year" (re-orders ticks into a dot plot by year: no steady improvement). Reveal unlocks after `truth` and `median`.
- Labels: axis 11 px; names 11 px (shown one at a time, so they never overlap); readout 12 px.
- Reveal (76 words): "Only 1 of 12 came within 2 degrees, and every one put Rome too far east: the estimates ran from 17.7 to 30.1 degrees. The middle one was 25.8, about 780 km too far. Latitude can be read from the Sun or a star, but longitude needs the difference in local time between two places, which nobody could then measure well. Where it stops: some estimates may copy others, so these are not 12 independent measurements."
- Claims:
  - Data: (1) the 12 estimates and years (history-data.mjs: langren). (2) Toledo 39.86 N, 4.03 W; Rome 41.89 N, 12.5 E (HistData doc, opened).
  - Derivation: (3) 16.53, the count within 2°, median and km (111.32 km × cos 40.9°). (4) one hour of local time = 15° of longitude (geography:sun-time-from-longitude).
  - Source, held: (5) "which nobody could then measure well" (Friendly, Valero-Mora & Ulargui (2010), *The American Statistician* 64(2), 185-191; not opened). Fallback: cut the clause and end the sentence at "two places". Optional caption, also held: "Van Langren drew these on one line in 1644, perhaps the first graph of statistical data" (the HistData doc says "believed to be the first known graph"; caption only, never reveal text).
- Duplicate search (terms: longitude estimate or error, Toledo, Langren, Rome): 0 lessons on historical longitude. geography/shrinking-degree, barcelona-sun-minutes and null-island-lat-lon teach longitude itself (prerequisites, not duplicates). 0 briefs.
- Boundary: geography owns latitude, longitude and sun time. History adds the historical measurement record. Brief 10 is the same problem seen on maps, and the re-check decides whether both stay.
- Curriculum: primary `history:longitude-problem-estimates`; prerequisites `geography:latitude-longitude`, `geography:sun-time-from-longitude`.
- Transfer recall (section 6): "Two clocks: one set to noon where you are, one to noon at your home port. They differ by 2 hours. How far east or west are you?" A) 2 degrees / B) 15 degrees / C) 30 degrees (answer: C).

### 7. wages-bought-more-wheat · concept: real-wages-playfair · core · demand 2
- Format: Before / after toggle (Playfair's two-axis chart → one ratio line; the ratio persists into the reveal)
- Strand: population-economy. Review route: standard.
- Learner knows: prices rose over the centuries. / does not know: that a price rise says nothing about hardship until it is divided by pay, and that a two-axis chart hides that division.
- Misconception: When the price of bread rises over the centuries, people become poorer.
- Prediction (24 words): "From 1565 to 1810 the price of wheat rose about 2.4 times. Did a mechanic's weekly wage buy more or less wheat in 1810?" options: A) Less: about 40% as much / B) About the same / C) More: about 2.5 times as much (answer: C). Check section 7: wheat 41 → 99 shillings (×2.41); wages 5 → 30 shillings (×6); wheat per week's wage 0.122 → 0.303 (×2.48); best year 1785 (0.548), worst 1595 (0.087); wages stop at 1810.
- What the stage shows: Playfair's layout (wheat price as bars, wages as a line, two axes) and, after the second preset, one line: quarters of wheat per week's wage. Preset buttons in DOM order: "Playfair's chart" (milestone `two-axes`), "Wages divided by price" (milestone `ratio`), "Best year" (marks 1785), "Worst year" (marks 1595). Reveal unlocks after `ratio`.
- Labels: both axes and the ratio axis 11 px; year labels every 50 years, 11 px.
- Reveal (79 words): "Wheat cost 2.4 times as much in 1810, but wages rose 6 times, so a week's pay bought 2.5 times as much wheat. Playfair drew price and wages on two different scales, which hides this ratio; dividing one by the other shows it as one line. On his own figures the best year for wages in wheat was 1785, not the last one. Where it stops: this is one trade's wage and one food, not a cost of living."
- Claims:
  - Data: (1) wheat price and weekly wage every 5 years (history-data.mjs: wheat; "a good mechanic", per the HistData doc).
  - Derivation: (2) ×2.41, ×6, ×2.48, best 1785, worst 1595.
  - Source, held: (3) "Playfair drew price and wages on two different scales" (Playfair (1821), *A Letter on our Agricultural Distresses*; public domain; the HistData doc, opened, describes the chart). Fallback: "Drawn on two scales, price and wages hide this ratio" (no name). Verdict line for the builder, not on the stage: Playfair argued workers had never been better off than near the end of his series. On his own figures to 1810 that verdict is **mixed or contested**: the ratio was higher in 1745-1785 and he has no wages after 1810. The lesson does not make that argument, so no verdict sentence is needed. If cm-history adds one, it uses the shared words.
- Duplicate search (terms: wage, wheat, Playfair, real wage, purchasing power): 3 lessons. economics/inflation-halves-cash (cash losing value), count-the-bread-once (value added) and bending-frontier (production frontier) are different questions. Briefs: probability.data-literacy brief 67 two-axes-one-crossing owns the dual-axis mechanism (its question is where lines cross). This brief's question is the real wage.
- Boundary: economics owns inflation and price indices; probability owns dual axes. Prerequisites below.
- Curriculum: primary `history:real-wages-playfair`; prerequisites `economics:inflation`, `probability:dual-axis-charts`.
- Transfer recall (section 7): "Your pay doubles while rent triples. Can you afford more rent or less?" A) More / B) The same / C) Less: about two-thirds as much (answer: C).

### 8. london-buried-six-times-more · concept: plague-1665-bills · intro · demand 2
- Format: Single card (bars per year 1629-1710; presets)
- Strand: events-data. Review route: standard (an epidemic not tied to a named group). Care line: no plague imagery (no carts, no pits); numbers only.
- Learner knows: the Great Plague was bad. / does not know: how a year's burials compare with normal, or that the city's own weekly bills let us see it.
- Misconception: Epidemics raise deaths a little; "the plague year" means somewhat more deaths than usual.
- Prediction (20 words): "London's Bills of Mortality recorded 15,453 burials in 1664. In 1665, the year of the Great Plague, about how many?" options: A) About 30,000 / B) About 100,000 / C) About 300,000 (answer: B). Check section 8: 15,453 → 97,306 (×6.3); plague 68,596 (70.5%); christenings 9,972 (9.8 burials per christening; 1664: 1.3); 1666: 12,738; an earlier outbreak in 1636: 10,400 plague of 23,359 (44.5%).
- What the stage shows: one bar per year, plague part hatched, with a year axis (every 20 years) and a readout. Preset buttons in DOM order: "1664" (milestone `y1664`), "1665" (milestone `y1665`), "Plague's share", "1636, an earlier outbreak", "Christenings that year" (adds the christening bar for 1665). Reveal unlocks after `y1665`.
- Labels: axis 11 px; readout 12 px; bars at least 4 px wide at 390 (82 years in about 340 px).
- Reveal (62 words): "London recorded 97,306 burials in 1665, 6.3 times the year before, and 70% were put down to plague. Christenings that year were 9,972, so the city buried about 10 people for every child christened. A year later, burials were back to 12,738. Where it stops: these are recorded burials and recorded causes, not a count of every death or a doctor's diagnosis."
- Claims:
  - Data: (1) burials (Mortality), plague deaths and christenings by year, 1629-1710 (history-data.mjs: arbuthnot). The doc does not name the source of the Mortality and Plague columns. The fact-checker should confirm against a printed Bill for 1665 if one can be opened. Until then the claim's source says "HistData Arbuthnot, columns Mortality and Plague (source not named in the documentation)".
  - Derivation: (2) ×6.3, 70.5%, 9.8 per christening.
  - Source, held: none in the reveal. "Not a doctor's diagnosis" is a convention about what a recorded cause is. If the fact-checker wants a source, cut "or a doctor's diagnosis".
- Duplicate search (terms: plague, burial, Bills of Mortality, 1665): 0 lessons, 0 briefs.
- Boundary: life owns epidemic curves (SIR). This lesson is a recorded total, with no model.
- Curriculum: primary `history:plague-1665-bills`.
- Transfer recall (section 8): "A town normally records 100 deaths a year. One year it records 600, and 450 of those from one cause. What share is that cause?" A) About 45% / B) 75% / C) About 90% (answer: B).

### 9. britain-made-most-co2-in-1850 · concept: industrial-co2-share · intro · demand 2
- Format: Single card (stacked shares by country, 1750-1950; presets)
- Strand: population-economy. Review route: standard, with a care line: no blame, no "who owes what", no statement about today's emissions or policy.
- Learner knows: industrialisation burned coal. / does not know: how concentrated early emissions were in one country, and that shares can fall while totals rise.
- Misconception: Early industrial emissions were spread across the industrial countries.
- Prediction (16 words): "In 1850, what share of the world's carbon dioxide from burning fossil fuels came from Britain?" options: A) About 5% / B) About 25% / C) About 60% (answer: C). Check section 9: UK 122.3 of 196.8 Mt (62.2%); then the United States 10.1%, France 10.0%, Germany 7.7%, Belgium 4.7%; 1800: 95.6%; 1900: 21.4% (the US largest at 33.8%); 1950: 8.4%; world ×10 from 1850 to 1900; UK 122 → 420 Mt.
- What the stage shows: a 100% stacked area (UK, US, Germany, France, rest of the world), with a toggle to tonnes. Preset buttons in DOM order: "1800", "1850" (milestone `y1850`), "1900" (milestone `y1900`), "1950", "Tonnes, not shares" (milestone `tonnes`). Reveal unlocks after `y1850` and `tonnes`.
- Labels: country labels inside the areas at 11 px (outside with leader lines where an area is thin); axis 11 px.
- Reveal (63 words): "In 1850 Britain produced 62% of the world's fossil-fuel CO2. By 1900 its share had fallen to 21% as the United States, Germany and others burned more coal, and world emissions had grown 10 times. A falling share can hide a rising total. Where it stops: these figures are rebuilt from records of coal and other fuels, and early years are the roughest."
- Claims:
  - Data: (1) co2 by country and year (history-data.mjs: co2, column co2, million tonnes).
  - Derivation: (2) shares, ×10, the rank order.
  - Source, held: (3) "rebuilt from records of coal and other fuels" (OWID CO2 README and the Global Carbon Project methods; the README is reachable but was not opened for this sentence). Fallback: "Where it stops: early years are the roughest estimates" (convention). The fact-checker opens the README, which is reachable from here.
- Duplicate search (terms: CO2, carbon dioxide, coal, emission): 2 lessons. chemistry/two-routes-to-co2 (reaction heat) and find-the-co2-in-air (concentration) are not history. 0 briefs.
- Boundary: chemistry and geography (earth-climate) own CO2 science. This lesson is the record by country. The pin is on a master branch, so if OWID updates the file the check fails and the shares must be re-read before build.
- Curriculum: primary `history:industrial-co2-share`.
- Transfer recall (section 9): "One town makes 9 of 10 bicycles in a region. Fifty years later it makes twice as many, but the region makes ten times as many. Its share?" A) Still about 90% / B) About 18% / C) About 45% (answer: B).

### 10. lakes-misplaced-east-west · concept: old-map-longitude-error · core · demand 2
- Format: Map explorer (WorldMap, a named conic projection over the Great Lakes; actual points and each map's points joined by error lines)
- Strand: maps-borders. Review route: standard.
- Learner knows: old maps were less accurate. / does not know: that the error was mostly east-west, and that it shrank within a century.
- Misconception: Old maps were equally wrong in every direction.
- Prediction (20 words): "Coronelli's 1688 map of the Great Lakes misplaced 39 known points. Which error was bigger, in kilometres: north-south or east-west?" options: A) North-south / B) East-west / C) About equal (answer: B). Check section 10: Coronelli 1688 north-south 59 km, east-west 363 km (×6.2); Melish 1818 24 and 41 km; east-west worse on 9 of 11 maps (not Mitchell 1755 or Lattre 1784).
- What the stage shows: the 39 actual points (dots) and the chosen map's points (rings) with error lines, plus two readouts (average N-S km and E-W km). Preset buttons in DOM order: "Coronelli 1688" (milestone `coronelli`), "Popple 1733", "Mitchell 1755", "Melish 1818" (milestone `melish`), "Errors in km" (all 11 maps as a small two-bar chart; milestone `all`). Reveal unlocks after `coronelli` and `melish`.
- Labels: readouts 12 px; map-maker name 12 px; lake names omitted (decoration) or at 11 px.
- Reveal (74 words): "On Coronelli's map the points were on average about 60 km off north-south but 360 km off east-west. By Melish's map of 1818 the east-west error was down to about 40 km. East-west was the worse error on 9 of the 11 maps. Latitude can be taken from the height of the Sun or a star, while longitude needs a time difference. Where it stops: each map's 39 points were read off by hand."
- Claims:
  - Data: (1) latitude and longitude of 39 points on 11 maps and the actual points (history-data.mjs: oldmaps; absolute values, because of sign typos noted in the doc).
  - Derivation: (2) km errors (111.32 km per degree of latitude; × cos(latitude) for longitude), ×6.2, 9 of 11. (3) longitude needs a time difference (geography:sun-time-from-longitude).
  - Source, held: none. "Read off by hand" is from the doc (grid overlay and linear interpolation; opened).
- Duplicate search (terms: old map, mapmaker, Great Lakes, misplaced): 1 lesson, geography/north-is-up-convention (map orientation history; a different question). 0 briefs.
- Boundary: this is the same longitude problem as brief 6, on maps over a century rather than estimates of one distance. If the re-check judges them one idea, keep brief 6 and drop this one.
- Curriculum: primary `history:old-map-longitude-error`; prerequisites `history:longitude-problem-estimates`.
- Transfer recall (section 10): "A sailor in 1700 knows her latitude exactly but her clock is 20 minutes wrong. Which way is her position uncertain?" A) North-south / B) East-west, by 5 degrees / C) Neither (answer: B).

### 11. disaster-deaths-fell · concept: disaster-deaths-over-time · intro · demand 2
- Format: Single card (bars by decade, stacked by type; presets)
- Strand: events-data. **Review route: sensitive (famine)**: most 1920s deaths are recorded under drought and epidemic, and droughts then were famines. research-lead note on EM-DAT's coverage before 1950; cultural-reviewer `culture-en` (W-626). Care line: no country is named (the file has none); no "nature is getting kinder" framing.
- Learner knows: there are disasters in the news every year. / does not know: that recorded deaths from them have fallen about fifteenfold in a century, and far more per person.
- Misconception: Natural disasters kill more people now than a century ago.
- Prediction (21 words): "Natural disasters killed about 870,000 people a year worldwide in the 1920s. About how many a year in 2010 to 2017?" options: A) About 1.5 million / B) About 500,000 / C) About 60,000 (answer: C). Check section 11: 1920s mean 872,629 a year; 2010-2017 mean 56,869 (×15.3 fewer); population 1.97 bn (1925) → 7.38 bn (2014); per million people 442 → 7.7 (×57); 1920s by type: drought 4.72 million, epidemic 3.32 million (92% of the decade); biggest year 1931, 3.71 million (flood).
- What the stage shows: one bar per decade (1900s to 2010s; the 2010s labelled "2010-2017"), stacked by type, with a deaths axis. Preset buttons in DOM order: "1920s" (milestone `y1920s`), "2010 to 2017" (milestone `y2010s`), "Per million people" (milestone `percap`), "By type", "Biggest single year". Reveal unlocks after `y2010s` and `percap`.
- Labels: decade labels 11 px (every other decade at 390 px if needed); type legend 11 px with patterns.
- Reveal (73 words): "In the 1920s disasters killed about 870,000 people a year; in 2010 to 2017 about 57,000, 15 times fewer, while the world's population grew 3.7 times. Per person, that is about 57 times fewer. Most of the 1920s deaths were recorded under drought and epidemics. Where it stops: early records are less complete, and one year can swing a decade: 1931 alone recorded 3.7 million. This counts deaths, not how many disasters happened."
- Claims:
  - Data: (1) deaths by year and type, world, 1900-2017 (history-data.mjs: vega, disasters.csv; EM-DAT via Our World in Data per the package description). (2) world population 1925 and 2014 (history-data.mjs: gmpop; Gapminder estimates).
  - Derivation: (3) decade means, ×15, ×57, the type shares, 1931.
  - Source, held: (4) "early records are less complete" (EM-DAT documentation; not opened). Fallback: "one year can swing a decade: 1931 alone recorded 3.7 million" (data) and drop the first clause. Note for the builder: EM-DAT counts epidemics as natural disasters, and the stage legend must say so ("epidemic" as its own type).
- Duplicate search (terms: disaster, drought, flood, earthquake): 1 lesson, cs/a-star-heads-for-goal ("flood" fill; not related). 0 briefs.
- Boundary: probability owns per-capita rates (prerequisite). The famine concept (`famine-mortality-record`) stays unbriefed until a dataset is found.
- Curriculum: primary `history:disaster-deaths-over-time`; prerequisites `probability:per-capita-rates`.
- Transfer recall (section 11): "Deaths from a cause fell from 100 to 50 a year while the population doubled. Per person, the risk fell to about what?" A) Half / B) A quarter / C) The same (answer: B).

### 12. khanates-outsize-russia · concept: empire-extent-mongols · intro · demand 2
- Format: Map explorer (WorldMap, an equal-area projection named on the stage; 1279 polygons over today's land)
- Strand: maps-borders. **Review route: sensitive (empire, borders)**: research-lead note on what the dataset codes as "Mongol Empire" and how published estimates of its extent differ; cultural-reviewer `culture-en` (W-626). Care line: no conquest narrative, no "greatest empire" superlative, nothing about how the empire was won; the lesson is about counting area on a map.
- Learner knows: the Mongol Empire was huge. / does not know: how it compares with today's largest country, or that "how big" depends on which lands the mapmaker counts and how sure the borders are.
- Misconception: An empire's size is a fixed fact you can read off a map.
- Prediction (22 words): "Russia, today's largest country, covers about 1 in 8 of Earth's land outside Antarctica. How did the Mongol khanates of 1279 compare?" options: A) Smaller than Russia / B) About the same / C) About 1.4 times as big (answer: C). Check section 12: the four khanates (Great Khanate 10.55, Golden Horde 5.25, Ilkhanate 3.78, Chagatai 3.31) total 22.89 million km²; adding the four tributaries (Tibet, Novgorod, Ryazan, the Seljuks) gives 27.24; Russia (Natural Earth 1:50m) 16.88 million km² = 12.6% of land outside Antarctica; ratios 1.36 and 1.61; every Mongol polygon is precision 1 (approximate).
- What the stage shows: an equal-area world map cropped to Eurasia, the 1279 polygons, today's Russia as an outline, and a readout "{area} million km² · {ratio}× Russia". Preset buttons in DOM order: "The four khanates, 1279" (milestone `core`), "Add states that paid tribute" (milestone `tribute`), "Russia today" (outline and its area; milestone `russia`), "How precise are these borders?" (blurs every edge marked approximate and shows the legend "precision: approximate"). Reveal unlocks after `core` and `russia`.
- Labels: readout 12 px; khanate names 11 px, one at a time on the preset that shows them; the projection name 10 px.
- Reveal (69 words): "On this 1279 map the four Mongol khanates cover about 22.9 million km², 1.4 times today's Russia, or 1.6 times if you count the states that paid them tribute. Which lands count as the empire is a choice the mapmaker made, and every border on this 1279 map is marked approximate. Where it stops: the map's own makers call it work in progress, so treat these areas as rough."
- Claims:
  - Data: (1) 1279 polygons with NAME, SUBJECTO = "Mongol Empire" and BORDERPRECISION (history-data.mjs: basemap1279). (2) Russia and land, Natural Earth 1:50m (history-data.mjs: necountries, neland). (3) "work in progress" (historical-basemaps README, opened).
  - Derivation: (4) spherical areas (d3-geo geoArea, R = 6,371 km), 22.9, 1.36, 1.61, 1 in 8.
  - Source, held: (5) "the states that paid them tribute" describes Tibet, Novgorod, Ryazan and the Seljuks as tributaries. The dataset codes them under SUBJECTO "Mongol Empire" but says nothing about tribute. Held for the research-lead note; fallback: "or 1.6 times if you count the other lands this map assigns to them" (data).
- Duplicate search (terms: Mongol, empire, khan, tribute): 0 lessons on empires (3 Life Hacks hits are on "shares", not history). 0 briefs. geography/three-giants-in-africa and true-size lessons compare countries' areas on Mercator, so they are prerequisites, not duplicates.
- Boundary: geography owns equal-area projections and true size (`geography:equal-area-vs-conformal`). This lesson is about historical extent and the coding of a historical map.
- Curriculum: primary `history:empire-extent-mongols`; prerequisites `geography:equal-area-vs-conformal`; also `geography:true-size-comparison`.
- Transfer recall (section 12): "Two maps of the same empire differ by a third in area. Both are carefully drawn. What most likely differs?" A) One is wrong / B) Which lands each counts as part of the empire / C) The size of the Earth (answer: B).

## Next 88 (ranks 13-100, for cm-history to brief)

Ranked by rule from `content/curriculum/history.json`, so cm-history can re-run it: tier first (below), then demand (an estimate), then data already pinned before data only opened, then intro before core. cm-history owns this order and may change it. These are concept ids, not briefs: each brief still needs its file pinned in `history-data.mjs`, a check section, a duplicate search and the shape rules above. A concept whose data cannot be opened gets no brief. It goes on the W-583 list for the web-capable fact-check session (founder decision 2026-10-14-founder-history-100, step 2). Balance rule: no strand above half of any batch of 12.


**Tier 1: data opened, standard route, no neighbour to ask**

13. `child-mortality-decline` · population-economy · intro · demand 3 · data: opened, not pinned: Gapminder Fast Track child mortality by country from 1800 (pre-1950 often modelled)
14. `life-expectancy-century-gain` · population-economy · intro · demand 3 · data: opened, not pinned: Gapminder Fast Track life expectancy and child mortality by country
15. `world-population-doubling` · population-economy · intro · demand 2 · data: pinned: gmpop · boundary: Books fact-straight-line and Big Ideas demographic-transition own the peak; History only the doubling record
16. `sex-ratio-at-baptism` · population-economy · intro · demand 2 · data: pinned: arbuthnot · boundary: probability owns the sign test; History only the record and what baptisms are not
17. `population-share-asia-1820` · population-economy · intro · demand 2 · data: pinned: maddison (population) · boundary: geography owns where people live today
18. `us-old-age-share` · population-economy · intro · demand 2 · data: pinned: vega (population.json)
19. `vanished-jobs` · population-economy · intro · demand 2 · data: pinned: vega (jobs.json)
20. `clerical-work-rise` · population-economy · intro · demand 2 · data: pinned: vega (jobs.json)
21. `coal-then-oil-co2` · population-economy · intro · demand 2 · data: pinned: co2 (coal_co2, oil_co2)
22. `wheat-price-swings` · population-economy · intro · demand 2 · data: pinned: wheat
23. `earthquake-deaths-record` · events-data · intro · demand 2 · data: pinned: vega (disasters.csv)
24. `cholera-1849-elevation` · events-data · core · demand 2 · data: pinned: cholera · boundary: Big Ideas owns germ theory (germ-theory-pump); this is Farr's confounded record. Elevation still predicts within each water supplier, so the question must not claim water alone
25. `age-heaping-breslau` · population-economy · core · demand 2 · data: pinned: breslau · boundary: probability owns rounding and measurement error; History shows the record
26. `roman-italy-income` · population-economy · core · demand 2 · data: pinned: maddison (Italy from year 1; Scheidel & Friesen estimate)
27. `border-precision-over-time` · maps-borders · intro · demand 2 · data: opened, not pinned: historical-basemaps 1492-2000 (precision 1 dominates to 1530, precision 3 from 1700)
28. `energy-transitions` · population-economy · core · demand 2 · data: opened, not enough: OWID energy data has world shares only from 1965, so the long transitions need another source
29. `child-deaths-then-births-fall` · population-economy · core · demand 2 · data: opened, not pinned: Gapminder Fast Track child mortality and fertility · boundary: Big Ideas owns the transition mechanism; History shows one dated record
30. `us-overtakes-britain-co2` · population-economy · intro · demand 1 · data: pinned: co2
31. `volcano-deaths-record` · events-data · intro · demand 1 · data: pinned: vega (disasters.csv)
32. `flow-map-minard` · maps-borders · core · demand 1 · data: pinned: minard, minardtemp · boundary: a second Minard lesson; only after most-lost-before-moscow
33. `plague-recurrence-london` · events-data · core · demand 1 · data: pinned: arbuthnot
34. `halley-annuity-price` · population-economy · core · demand 1 · data: pinned: halley
35. `oldmaps-north-error` · maps-borders · core · demand 1 · data: pinned: oldmaps
36. `cholera-1849-daily` · events-data · intro · demand 1 · data: opened, not pinned: HistData CholeraDeaths1849 (daily deaths by cause, England 1849) · boundary: life owns the epidemic curve; History only the record
37. `trade-boom-1855-1899` · population-economy · intro · demand 1 · data: opened, not pinned: HistData Bowley
38. `guerry-literacy-map` · maps-borders · intro · demand 1 · data: opened, not pinned: HistData Guerry
39. `trade-values-bowley` · population-economy · core · demand 1 · data: opened, not pinned: HistData Bowley (British and Irish trade values, 1855-1899)
40. `thematic-maps-guerry` · maps-borders · core · demand 1 · data: opened, not pinned: HistData Guerry (86 departments, 1830s) · boundary: geography owns choropleth bias; History only the historical maps
41. `playfair-national-debt` · population-economy · core · demand 1 · data: opened, not pinned: HistData Playfair1824 (stocks, wheat, bread, debt, trade)
42. `guerry-crime-vs-instruction` · maps-borders · core · demand 1 · data: opened, not pinned: HistData Guerry
43. `polio-observed-vs-randomized` · events-data · core · demand 1 · data: opened, not pinned: HistData PolioTrials · boundary: probability owns control groups
44. `cholera-and-diarrhoea-1849` · events-data · core · demand 1 · data: opened, not pinned: HistData CholeraDeaths1849
45. `edgeworth-county-deaths` · events-data · core · demand 1 · data: opened, not pinned: HistData EdgeworthDeaths

**Tier 2: data opened, but a neighbour category must agree first (the boundary line says who)**

46. `population-projection-vs-record` · population-economy · intro · demand 2 · data: pinned: gmpop (projection after the present) · boundary: Books fact-straight-line owns the straight-line instinct; History only if cm-books agrees
47. `demographic-record-real-country` · population-economy · core · demand 2 · data: opened, not pinned: Gapminder Fast Track life expectancy, fertility and child mortality by country from 1800 (pre-1950 values often modelled); Systema Globalis crude death rates start only in 1950 · boundary: Big Ideas owns the mechanism; brief only after cm-big-ideas agrees
48. `broad-street-already-falling` · events-data · core · demand 2 · data: opened, not pinned: HistData Snow.dates (daily attacks and deaths) · boundary: Big Ideas owns germ theory and Snow; History only with cm-big-ideas' agreement
49. `polio-trial-1954` · events-data · core · demand 1 · data: opened, not pinned: HistData PolioTrials (8 groups; randomized and observed controls) · boundary: probability owns control groups; brief only with a different question

**Tier 3: data opened, sensitive class: held for W-626 (research-lead note + cultural-reviewer culture-en before build)**

50. `burials-exceed-christenings` · population-economy · intro · demand 3 · data: pinned: arbuthnot · sensitive: migration
51. `great-divergence-incomes` · population-economy · core · demand 3 · data: pinned: maddison (UK, China, India series) · sensitive: comparison of countries
52. `empires-share-of-land-1914` · maps-borders · intro · demand 3 · data: opened, not pinned: historical-basemaps 1914 (areas by ruling power computed on 2026-10-14; dominions' coding changes the answer) · sensitive: colonialism
53. `land-without-states-1492` · maps-borders · intro · demand 3 · data: opened, not pinned: historical-basemaps 1492 (1,946 features, almost all precision 1; peoples and cultures as well as states) · sensitive: colonialism (the year), coding of peoples
54. `decolonisation-1945-1960` · maps-borders · intro · demand 3 · data: opened, not pinned: historical-basemaps 1945 and 1960 · sensitive: colonialism, borders
55. `world-wars-share-of-deaths` · events-data · intro · demand 3 · data: opened, not pinned: HistData Quarrels · sensitive: war; boundary: Big Ideas war-sizes-heavy-tail; split by question
56. `income-gap-1800-2000` · population-economy · core · demand 3 · data: opened, not pinned: Gapminder Fast Track GDP per capita (modelled before 1950) · sensitive: comparison of countries; boundary: economics owns relative-vs-absolute-inequality
57. `us-age-structure` · population-economy · intro · demand 2 · data: pinned: vega (population.json) · sensitive: slavery (1850 coverage)
58. `border-precision` · maps-borders · intro · demand 2 · data: pinned: basemap1279 (BORDERPRECISION) · sensitive: borders
59. `drought-deaths-decline` · events-data · intro · demand 2 · data: pinned: vega (disasters.csv) · sensitive: famine
60. `women-in-recorded-work` · population-economy · core · demand 2 · data: pinned: vega (jobs.json) · sensitive: comparison of groups
61. `straight-borders` · maps-borders · core · demand 2 · data: pinned: necountries (method not yet written) · sensitive: colonialism, borders
62. `dutch-golden-age-income` · population-economy · core · demand 2 · data: pinned: maddison · sensitive: comparison of countries
63. `china-income-1700-1950` · population-economy · core · demand 2 · data: pinned: maddison · sensitive: comparison of countries
64. `cumulative-co2-record` · population-economy · core · demand 2 · data: pinned: co2 (cumulative_co2) · sensitive: no blame or policy
65. `number-of-states-over-time` · maps-borders · intro · demand 2 · data: opened, not pinned: historical-basemaps 1815, 1880, 1900, 1920, 1945, 1960, 2000 (feature counts mix states and regions, so counting needs a rule) · sensitive: borders
66. `ussr-breakup-map` · maps-borders · intro · demand 2 · data: opened, not pinned: historical-basemaps 1960 and 1994 · sensitive: borders (some disputed today)
67. `fertility-decline-record` · population-economy · core · demand 2 · data: opened, not pinned: Gapminder Fast Track children per woman by country, 1800-2100 (pre-1950 often modelled) · sensitive: population by country
68. `borders-after-1918` · maps-borders · core · demand 2 · data: opened, not pinned: historical-basemaps 1914 and 1920 · sensitive: war, borders
69. `war-deaths-richardson` · events-data · core · demand 2 · data: opened, not pinned: HistData Quarrels (779 quarrels with deaths and attributes) · sensitive: war; boundary: Big Ideas war-sizes-heavy-tail owns the tail; History only another question, after cm-big-ideas agrees
70. `spanish-americas-1530` · maps-borders · core · demand 2 · data: opened, not pinned: historical-basemaps 1530 · sensitive: colonialism
71. `dominions-coding-1914` · maps-borders · core · demand 2 · data: opened, not pinned: historical-basemaps 1914 · sensitive: colonialism
72. `many-small-quarrels` · events-data · core · demand 2 · data: opened, not pinned: HistData Quarrels · sensitive: war; boundary: Big Ideas war-sizes-heavy-tail
73. `us-population-growth` · population-economy · intro · demand 1 · data: pinned: vega (population.json; 1850 counts the free population) · sensitive: slavery (1850 coverage)
74. `nightingale-before-after` · events-data · core · demand 1 · data: pinned: nightingale · sensitive: war; boundary: a second Nightingale lesson; only after disease-killed-eight-to-one
75. `registration-gap-civil-war` · population-economy · core · demand 1 · data: pinned: arbuthnot · sensitive: war
76. `job-sex-segregation-record` · population-economy · core · demand 1 · data: pinned: vega (jobs.json) · sensitive: comparison of groups
77. `co2-per-person-1850` · population-economy · core · demand 1 · data: pinned: co2 (co2_per_capita) · sensitive: no blame or policy
78. `crimea-army-size-and-rate` · events-data · core · demand 1 · data: pinned: nightingale · sensitive: war
79. `bread-price-1770-1824` · population-economy · intro · demand 1 · data: opened, not pinned: HistData Playfair1824 · sensitive: war
80. `ottoman-extent-1700` · maps-borders · intro · demand 1 · data: opened, not pinned: historical-basemaps 1700 · sensitive: empire
81. `armada-squadrons-strength` · events-data · intro · demand 1 · data: opened, not pinned: HistData Armada · sensitive: war
82. `empire-area-on-mercator` · maps-borders · core · demand 1 · data: opened, not pinned: historical-basemaps 1914 · sensitive: colonialism; boundary: geography owns Mercator; History only if the question is the historical map
83. `armada-fleet-losses` · events-data · core · demand 1 · data: opened, not pinned: HistData Armada (10 squadrons: ships, tons, men, guns); no losses column, so the concept is the fleet's make-up · sensitive: war

**Tier 4: no data opened yet: no brief until a file is opened (W-583 list)**

84. `urbanisation-share` · population-economy · intro · demand 3 · data: not found yet
85. `migrations-on-the-map` · maps-borders · intro · demand 3 · data: not found yet · sensitive: migration
86. `technology-diffusion-speed` · events-data · intro · demand 3 · data: not found yet (the usual series, Comin & Hobijn via OWID, is not reachable)
87. `influenza-1918-excess-deaths` · events-data · intro · demand 3 · data: not found yet · sensitive: epidemic
88. `literacy-rise` · population-economy · intro · demand 3 · data: not found yet
89. `black-death-share` · events-data · intro · demand 3 · data: not found yet
90. `car-and-phone-adoption` · events-data · intro · demand 3 · data: not found yet
91. `largest-cities-over-time` · population-economy · intro · demand 2 · data: not found yet
92. `working-hours-decline` · population-economy · intro · demand 2 · data: not found yet
93. `shrinking-world-travel-time` · maps-borders · intro · demand 2 · data: not found yet
94. `smallpox-eradication-record` · events-data · intro · demand 2 · data: not found yet
95. `price-of-food-share` · population-economy · intro · demand 2 · data: not found yet
96. `measles-before-vaccine` · events-data · intro · demand 2 · data: not found yet
97. `telegraph-to-internet-speed` · events-data · intro · demand 2 · data: not found yet
98. `battle-deaths-trend` · events-data · core · demand 2 · data: reachable, not opened: Gapminder Systema Globalis battle deaths (5 KB file) · sensitive: war; trend claims are contested and never stated as settled
99. `famine-mortality-record` · events-data · core · demand 2 · data: not found yet · sensitive: famine
100. `partition-borders-1947` · maps-borders · core · demand 2 · data: not found yet · sensitive: borders, religion, migration

**Beyond 100 (not ranked; all tier 4, no data opened):** `roman-road-network`, `map-centre-in-history`, `vaccination-adoption-record`, `silk-roads-distances`, `antarctic-claims-map`, `capital-cities-moved`, `price-of-light-history`, `ptolemy-coordinates`, `portolan-chart-accuracy`, `epidemic-vs-war-deaths`, `heights-as-history`, `langren-versions`, `minard-cities-route`
