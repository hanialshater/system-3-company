# History through data and maps: ranked lesson briefs (cycle 1: 1-12; cycle 2: 13-30)

owner: cm-history (Henrike) · drafted 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request, for cm-history and the strand managers to re-check (board) · curriculum: `content/curriculum/history.json` · charter: `company/domains/history.md` · data: `node company/domains/briefs/checks/history-data.mjs` (17 sources fetched and pinned by SHA-256, 2026-10-14) · numbers: `node company/domains/briefs/checks/history-cycle1-check.mjs` (briefs 1-12, all checks pass) and `node company/domains/briefs/checks/history-cycle2-check.mjs` (briefs 13-30, all checks pass) · re-checked and extended by cm-history (Henrike), 2026-10-14, W-742: 23 sources pinned

Ranked briefs for `tools/claim.mjs next history`, in the same format as the other briefs files (`### N. slug · concept: <id> · level · demand N`). The strand lists (`history.<strand>.md`) come after this one and are empty for now.

## Gate (read first)
**W-556 does not hold History.** The founder lifted the wave gate for this category ("But also add 100 history demos": `company/decisions/2026-10-14-founder-history-100.md`).

**State after the W-742 re-check (cm-history, 2026-10-14):**
- **Briefs 1, 2, 6, 7, 8, 9, 10 passed** the re-check (section below). Their "awaiting cm-history re-check" lines are gone from `company/ops/brief-skips.json`, so `tools/claim.mjs next history` hands them out. The suggested first build is still brief 1.
- **Briefs 3, 4, 5, 11, 12 passed the re-check and stay held on the sensitive route** (W-626 was decided yes on 2026-10-15, W-764; see the W-889 section below for the review order): research-lead note, then cultural-reviewer `culture-en-brief` before build and `culture-en` before publish (charter, Sensitive topics). Their skip lines say the re-check is done. Brief 9 (built) joined the route by W-889.
- **Briefs 13-24 (cycle 2) are open to builders.** They were written by cm-history, the owning role, so they carry no re-check line. None is in a sensitive class.
- **Briefs 25-30 (cycle 2 reserve) are written and checked but held for strand balance** (charter, Portfolio rules: no strand above half of any batch of 12). All six are population-economy. Their skip lines name the release: more standard events-data or maps-borders briefs, W-626 opening the sensitive ones, or head-of-product waiving the rule for History while W-626 blocks the other two strands (board).

## Review route: sensitive (W-889, cm-history, 2026-10-15)
Source: founder decision `company/decisions/2026-10-15-founder-sensitive-route-and-history-tranches.md` (W-764 yes: the cultural-reviewer scope patch is applied; F-16 option a: History at 100 in two tranches), the route design `company/decisions/2026-10-14-w626-sensitive-topics-review-route.md` and the reviewer's checklist `company/international/sensitive-topics-checklist.md`. Reviewer: `company/roles/cultural-reviewer.md`.

**The marking.** Every concept in `content/curriculum/history.json` now carries `reviewRoute`: **60 "sensitive"** (each with its `sensitive` classes) and **54 "standard"**. Every brief on a sensitive concept says "Review route: sensitive (<classes>)" and has a care line. A sensitive brief or lesson gets two cultural-reviewer records: `company/reviews/<slug>/<date>-culture-en-brief.md` on the brief before build, and `company/reviews/<slug>/<date>-culture-en.md` on the walkthrough before publish. The research-lead provenance note in `company/research/` comes first: it is an input to the brief review (checklist N2, F5). The reviewer may add a class, never remove one. Downgrading a marked concept needs a head-of-product record.

**What W-889 changed, tested against the checklist's section 0 classes (adopted with W-764, which adds "race, ethnicity and group comparisons" and "political figures" to the charter's list):**
- **Six concepts newly on the route:** `industrial-co2-share` (brief 9, **built**: britain-made-most-co2-in-1850; comparison of countries, for consistency with the income comparisons already routed), `black-death-share` (epidemic with mass death, like influenza-1918; the record includes Jewish communities blamed and killed), `map-centre-in-history` (religion: maps centred on Jerusalem or Mecca), `heights-as-history` (comparison of groups), `capital-cities-moved` (borders disputed today, political figures), `smallpox-eradication-record` (epidemic tied to named places, colonialism). The last five have no opened data, so nothing is built or briefed for them yet.
- **Classes added to concepts already on the route:** political figures for napoleon-1812-attrition (brief 5), bread-price-1770-1824, flow-map-minard, minard-cities-route and empire-extent-mongols (brief 12).
- **Kept standard, with the reason, so the reviewer can overrule:** the London plague and 1849 cholera concepts (briefs 8, 20, 21, 22). The checklist's class reads "epidemics tied to a named group **or place**", while the charter and the route decision say "tied to a named group". The charter wins where the checklist drifts (the checklist's own header), and these lessons name the city whose own records they are and blame no group. This is a reading, not a certainty: localization-lead (the checklist's owner) should rule on "or place". If the ruling is "any named place", briefs 8, 20, 21 and 22 go on the route, and the launch-review five below swaps cholera-fell-with-height for its reserve. Also kept standard: sex-ratio-at-baptism (a count by sex at christening, not a comparison of traits); us-old-age-share, italy-long-decline and long-run-income-growth (one country over time, no comparison); schooling-and-crime-1830s (brief 24, unbuilt: departments by recorded property crime; the checklist's "crime and violence trends" is in the war class, so **the reviewer should look at brief 24 before it is claimed**; I hold that it is a measured rate by place with a no-labelling care line, at medium confidence). Every standard concept with `"data": "not found yet"` is re-tested when its data is found.
- **Brief-skips lines** for briefs 3, 4, 5, 11 and 12 are unchanged and still correct: they hold until the research-lead note and a culture-en-brief verdict of go exist. Brief 9 is built, so a skip line does nothing for it; its publish hold belongs to the chief of staff (`company/ops/publish-holds.json`), and I have not edited that file.

**Which briefs go to the cultural reviewer's pre-build review first** (not dispatched; each needs its research-lead note first, board W-745). Order: the strand the category is named for first (maps-borders has only 6 standard concepts on opened data), then demand, then whether a lesson already exists.
1. **12 khanates-outsize-russia** · maps-borders · empire, borders, political figures · demand 2. First because maps-borders cannot reach a launch-worthy share without the sensitive route.
2. **4 disease-killed-eight-to-one** · events-data · war · demand 3. The plainest war record (counted deaths by cause), so it tests the route on its easiest case.
3. **5 most-lost-before-moscow** · events-data · war, political figures · demand 3.
4. **3 half-the-men-farmed** · population-economy · slavery (1850 coverage) · demand 3. Its held sentence about enslaved people must not be cut silently (brief 3); the reviewer should see the research note's wording before anything else.
5. **11 disaster-deaths-fell** · events-data · famine · demand 2.
6. **9 britain-made-most-co2-in-1850** · population-economy · comparison of countries · demand 2. **Already built (draft v2, 7 of 7 claims verified).** A brief review is still owed, then the publish review on the walkthrough. It is out of the launch-review five until both say go and publish.
- **Then, only after the four tranche-2 conditions hold** (the route in use, a web-capable fact-check, the launch-review five passed, held-claim rate at or below 25%): tier 3 below, in its rank order.

**Launch-review five (W-813, proposed by cm-history; head-of-product decides).** From the 15 round-1 drafts, standard route only, every claim verified after fact-check passes 39, 41 and 43, and no strand above half:

| # | Lesson | Strand | Claims after FC39/41/43 | Why |
|---|---|---|---|---|
| 1 | survive-childhood-live-to-sixty | population-economy | 6 of 6 verified | Brief 1, demand 3: the category's signature misconception. v2 hides the curve before the commit (W-868 ruling). |
| 2 | income-flat-then-sixteenfold | population-economy | 10 of 10 verified (c8-c10 re-verified in pass 43) | Brief 2, demand 3, the long-run record in its plainest form. |
| 3 | rome-placed-too-far-east | maps-borders | 9 of 9 verified (pass 43 closed c1, c8, c9; no open items) | Brief 6: a historical map record measured against the truth. The required maps-borders lesson. |
| 4 | cholera-fell-with-height | events-data | 5 of 5 verified (c4 re-verified in pass 43) | Brief 20: the record cannot separate two causes, the charter's "where it stops" at its sharpest. |
| 5 | earthquakes-did-not-fall | events-data | 5 of 5 verified (FC39) | Brief 19: a per-person rate against a raw total, with no sensitive class. |

Reserves, in order: **lakes-misplaced-east-west** (maps-borders, 5 of 5 verified; not in the five because it shares brief 6's longitude reason, and the pause rule counts duplicate rejections), then **children-dying-before-five** (population-economy, 7 of 7). Excluded: **london-buried-six-times-more** (c4 disputed in pass 43: the limit sentence says burials, the stage says deaths) and **britain-made-most-co2-in-1850** (now on the sensitive route). Not yet known for any of the five: learner reviews (none recorded for any History lesson) and walkthrough-based design review. Fact-check state is not learning evidence, and simulated reviews do not count as learner evidence.

## Rules every brief below follows (charter, "Lesson shape" and "How claims are sourced")
- **Numbers come from the check script, not from this page.** Each brief names its check section. Builders copy numbers from the script's output. If a number here and the script disagree, the script wins and the brief is wrong. The script found two of the drafter's errors before this file was written (brief 2's recall answer and brief 11's causes).
- **Preset buttons, in DOM order.** Each preset sets the full state, so pressing every preset once, in the order given, reaches every milestone. Sliders are not used for milestones. There is no Reset button, because QA presses every control and a Reset would wipe the state the reveal quotes.
- **Labels ≥ 10 px** at 390 px wide for every meaning-carrying label at predict and every element the reveal points at (author at 11 px). Decoration may be 8 px and `aria-hidden`. Map and chart axes count as meaning-carrying.
- **Stage text ≤ 25 words** (the question; counted by the script) and **reveal ≤ 90 words** with the numbers filled in (counted by the script). Builders confirm the totals in pre-flight, including any caption.
- **Claims in three families**, listed under these headings in each brief: **Data** (a number read from a pinned file: support `source`, source string "history-data.mjs: <id>, <file>, <column>"), **Derivation** (arithmetic in the check script: support `derivation`), **Source, held** (anything the data file does not contain: the fact-checker opens it or the sentence is cut). Each reveal carries **at most one** held source sentence, with its fallback written.
- **Where it stops** is the reveal's last sentence and a claim. It says who the record leaves out, or how the numbers were made.
- **Transfer recall** on a different case. Its answer is in the check script.
- **Duplicate search** (done for all 12 on 2026-10-14): a text search of the title, hook, misconception and objective of all 945 lessons in `src/demos/`, every other briefs file in `company/domains/briefs/`, every curriculum in `content/curriculum/` and every charter, with the terms listed per brief. Result per brief below. `node tools/overlap.mjs` was not run on unbuilt briefs, because it reads built lessons; the strand manager re-runs it at the re-check.

**Why these 12.** Five are demand 3 and seven are demand 2 (estimates). They split 5 population-economy, 3 maps-borders and 4 events-data, so no strand has more than half. Each rests on a dataset fetched and pinned from this host, and every predict answer is a derivation from that data. Order: demand, then how far the record overturns a common view, then phone fit, then verification cost and route (standard before sensitive). Answers were drafted A ×1, B ×3, C ×8; the W-742 re-check rotated them to A ×4 (1, 4, 6, 11), B ×4 (5, 8, 10, 12), C ×4 (2, 3, 7, 9), and the recall answers from B ×10, C ×2 to A ×4, B ×4, C ×4. Rotating changed no number: the script checks whichever letter the brief names.

## Re-check of briefs 1-12 (W-742, cm-history, 2026-10-14)
Done against the charter (`company/domains/history.md`) and `company/product/demo-standard.md`. The drafter (chief-of-staff-ceo-office) did not review this re-check.
- **Scripts.** `history-data.mjs`: 17 original pins hold (23 with the cycle-2 files). `history-cycle1-check.mjs`: all checks pass after the edits below, and no number moved.
- **Answer letters rotated** (above). In the script and in each brief: 1 (C→A), 4 (C→A), 11 (C→A), 12 (C→B); recalls 1, 4, 11, 12 to A and 3, 5 to C.
- **Option precision** (demo standard, "no answer before the commit": the right option must not be the only exact one). Brief 6's "About half" is now "6 of 12". Brief 12's options were "Smaller than Russia / About the same / About 1.4 times as big", with only the right one numbered; they are now "About half of Russia / About 1.4 times Russia / About 3 times Russia". Recall options in 7 ("More" became "More: about 1.5 times as much") and 10 ("East-west, by 5 degrees" became "East-west") were evened the same way.
- **Claims split, one held sentence each, a fallback for each:** confirmed for all 12. Every reveal ends with "Where it stops".
- **Presets in DOM order (3-5 each, no Reset), labels at 10 px or more, question ≤ 25 words, reveal ≤ 90 words:** confirmed by script and by reading.
- **Duplicate search, re-run** over the title, hook, misconception and objective of all 945 `src/demos/*/*/meta.json` and the headings, misconceptions and objectives of the 875 briefs in the other briefs files. No duplicate. Hits are all unrelated or prerequisites: 5 hits on "GDP" or "long-run" (economics/debt-grows-ratio-falls on a debt ratio; big-ideas, cs and probability lessons that say "long-run"), 1 "farm" (ai/loophole-lap-farming), 2 "Moscow" (geography bearings and orbits), 4 longitude lessons (geography; prerequisites for 6 and 10), 3 wage lessons (economics), 2 CO2 (chemistry), 1 "flood" (cs/a-star-heads-for-goal), 3 "empire" (Life Hacks, on "shares"). `node tools/overlap.mjs` reads built lessons only, so it says nothing about unbuilt briefs.
- **Briefs 6 and 10, one idea or two?** Kept as two. Brief 6 asks whether twelve estimates of one distance scattered around the truth (they did not: all too far east, with no improvement over 60 years). Brief 10 asks which direction of error was bigger on maps (east-west, six times over) and shows it shrinking within a century. They share the reason (longitude needs a time difference), so 6 is 10's prerequisite and 10 must not re-teach that sentence as its point.
- **Brief 9 stays standard.** Emission shares are a measured quantity by country, which the refuse list allows, and its care line keeps out blame and policy. The cumulative and per-person CO2 concepts stay sensitive, because those are the numbers "who owes what" arguments use.
- **Curriculum.** `brief` pointers in `content/curriculum/history.json` were wrong for 8 of the 12 concepts (for example, farm-share said #2 and disaster deaths said #9). All now point to the right number.
- **Not done here:** confirming the demand estimates. That waits for the first cycle planning, as the charter says.

### 1. survive-childhood-live-to-sixty · concept: life-expectancy-vs-lifespan · intro · demand 3
- Format: Single card (presets on one survivor chart)
- Strand: population-economy (cm-history-population-economy, Olumide). Review route: standard (fact-checker, learner-evaluator). Care: infant deaths are shown as a number and a shaded area, never with images of children.
- Learner knows: life expectancy is "how long people live". / does not know: that it is an average from birth, so infant and child deaths pull it far below the age most adults reached.
- Misconception: In the past, when life expectancy was about 30, people usually died around 30.
- Prediction (stage text, 25 words): "Halley's 1693 Breslau table gives a newborn a life expectancy of about 28 years. Someone who reached 30 died, on average, at about what age?" options: A) About 58 / B) About 45 / C) About 31 (answer: A). Check section 1: e0 = 27.87 (1,238 births a year; 1,000 alive at age 1); 30 + e30 = 57.7 (at most 58.3 if the 20 people alive at 84 lived 16 more years each); 40.9% died before age 5; 60 + e60 = 72.1. Cross-check on separate records: Bellhouse's Breslau deaths for 1687-91 give a mean age at death of 57.4 for those dying over 30.
- What the stage shows: a survivor curve (people alive at each age out of 1,238 born, 0 to 84) with an age axis (ticks every 10 years) and one readout ("average age at death, counting from age {x}: {a}"). Preset buttons in DOM order: "Average from birth" (marks 28 on the axis; milestone `birth`), "Deaths before age 5" (shades the drop to 732; readout 41%), "Average from age 30" (re-averages over those alive at 30; marks 58; milestone `at30`), "Average from age 60" (marks 72). **Locked stage (amended W-869, cm-history, 2026-10-15; ruling in company/reviews/history-round-1-cm-rulings.md):** the locked stage shows the axes, the "alive, of 1,238 born" label and the question, and **hides the survivor curve**; the curve is drawn on the first preset. The curve's long tail (142 alive at 70) is the evidence against "they died around 30", so drawing it before the commit rules out C and points to A. Reveal unlocks after `birth` and `at30` (the build also gates `under5` and `at60`, accepted, because the reveal quotes 41% and 72).
- Labels: axis ticks 11 px; readout 12 px; curve annotations 11 px.
- Reveal (draft, 77 words by script): "Of 1,238 babies born in a year, about 41% died before age 5, and that pulled the average from birth down to 28. People who got through childhood usually lived much longer: from 30, the average death came at about 58, and from 60 at about 72. Life expectancy at birth averages over everyone, infants included, so a low number does not mean adults died young. Where it stops: this is one city's records over five years."
- Claims:
  - Data: (1) survivors by age in Halley's table: 1,000 at 1, 732 at 5, 531 at 30, 346 at 50, 142 at 70, 41 at 80 (history-data.mjs: halley, HalleyLifeTable.csv, column number). (2) Halley took 1,238 births a year as the cohort (HistData documentation, opened; Halley 1693 not opened). (3) Breslau deaths by age, 1687-91 (history-data.mjs: breslau).
  - Derivation: (4) e0 = 28, 41% before 5, 58 from 30, 72 from 60 (trapezoid rule; tail bound in the script). (5) the independent cross-check, 57.4.
  - Source, held: none in the reveal. "One city's records over five years" rests on the Breslau doc (data years 1687-1691). Optional caption: "Edmond Halley, 1693" (held: Halley, E. (1693), *Phil. Trans.* 17: 596-610; cut if not checkable).
- Duplicate search (terms: life expectancy, died young, infant, child mortality, Halley): 0 lessons, 0 briefs. Nearest: none. `math:mean-vs-median` is the prerequisite (an average pulled by one end).
- Boundary: no neighbour owns life tables. Big Ideas' demographic-transition is about births and deaths over time, not ages at death.
- Curriculum: primary `history:life-expectancy-vs-lifespan`; prerequisites `math:mean-vs-median`; tags life tables, averages, demography.
- Transfer recall (check section 1): "A country's life expectancy at birth rises from 50 to 70, mostly because fewer babies die. Must adults now live 20 years longer?" A) No: most of the rise can come from infants surviving / B) Yes / C) Only if births rise (answer: A).

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
- Transfer recall (section 3): "A town's factory jobs fall from 40% to 10% of all jobs while the number of factory workers stays the same. What happened?" A) Factories closed / B) The share must be wrong / C) Other jobs grew about four times as fast (answer: C).

### 4. disease-killed-eight-to-one · concept: crimean-war-causes-of-death · intro · demand 3
- Format: Before / after toggle (bars by cause; the "before and after March 1855" view persists into the reveal)
- Strand: events-data (cm-history-events-data, Anselm). **Review route: sensitive (war)**: research-lead note (what "zymotic" meant, how Farr and Nightingale compiled the table, the known dispute about the rose's message); cultural-reviewer `culture-en` (W-626). Care line: soldiers are counted, not pictured; no gore; nothing on who was right in the war.
- Learner knows: soldiers die in battle. / does not know: that in this war disease killed eight times as many as wounds, and that the rate changed sharply within a year.
- Misconception: Most soldiers who died in a 19th-century war were killed in fighting.
- Prediction (23 words): "British soldiers in the Crimean War, April 1854 to March 1856. For every man who died of wounds, how many died of disease?" options: A) About 8 / B) About 3 / C) About 1 (answer: A). Check section 4: disease 14,476, wounds 1,758, other 1,748 (disease 80.5%); 8.23 to one; identical totals in the second copy (vega crimea.json); peak January 1855 at an annual rate of 1,022.8 per 1,000; disease deaths a month 930 (first year) and 277 (second year).
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
- Transfer recall (section 4): "A hospital's deaths fall after a new rule, while winter ends and fewer patients arrive. What can the chart alone tell you?" A) Deaths fell; the cause needs a comparison / B) The rule caused the fall / C) Nothing at all (answer: A).

### 5. most-lost-before-moscow · concept: napoleon-1812-attrition · intro · demand 3
- Format: Map explorer (WorldMap, equal-area conic or Mercator at this small extent, with the projection named on the stage; a band whose width is the column's men)
- Strand: events-data. **Review route: sensitive (war, political figures: Napoleon is named; W-889)**: research-lead note on Minard's sources and how modern estimates differ; cultural-reviewer `culture-en` (W-626). Care line: "lost" is never written as "killed"; no heroic or villain framing; no person blamed.
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
- Transfer recall (section 5): "A hiking group loses 6 of 10 members before the storm and 3 more during it. What does 'the storm wrecked the trip' miss?" A) Nothing / B) The storm was mild / C) Most losses came before the storm (answer: C).

### 6. rome-placed-too-far-east · concept: longitude-problem-estimates · intro · demand 2
- Format: Single card (van Langren's one-line axis, re-drawn; presets)
- Strand: maps-borders (cm-history-maps-borders, Marisol). Review route: standard.
- Learner knows: old maps were rough. / does not know: that the errors ran almost all one way and were huge even for a short, well-travelled distance, because longitude needed time.
- Misconception: Old estimates scattered around the truth, so their average was about right.
- Prediction (22 words): "Toledo to Rome is 16.5 degrees of longitude. Twelve astronomers and mapmakers before 1644 estimated it. How many came within 2 degrees?" options: A) 1 of 12 / B) 6 of 12 / C) 10 of 12 (answer: A). Check section 6: true 16.53° (the doc's coordinates); within 2°: only Jansonius 1605 (17.74); all 12 too far east; range 17.7 to 30.1; median 25.8, 9.28° too far ≈ 780 km at 40.9° N; the earliest (Ptolemy, 27.8) and latest (Argoli 1610, 28.2) are about equally wrong.
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
- Transfer recall (section 7): "Your pay doubles while rent triples. Can you afford more rent or less?" A) More: about 1.5 times as much / B) The same / C) Less: about two-thirds as much (answer: C).

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
  - Data: (1) burials (Mortality), plague deaths and christenings by year, 1629-1710 (history-data.mjs: arbuthnot). Provenance (corrected W-872, 2026-10-15, after FC39): the doc says the Plague and Mortality columns were "obtained by Campbell and from Creighton (1965)", that is Campbell, R. B. (2001), *Human Biology* 73(4): 605-610, and Creighton, *A History of Epidemics in Britain*, 2nd ed. (1965 printing). It does not say they are the Bills' own yearly totals, and neither book nor a printed Bill has been opened. The fact-checker confirms against a printed Bill for 1665 if one can be opened. Until then the claim's source says "HistData Arbuthnot, columns Mortality and Plague (per the doc, from Campbell 2001 and Creighton, A History of Epidemics in Britain, 1965 ed.; neither opened)". Write "Creighton, 1965 ed.", not "compiled by Creighton in 1965".
  - Derivation: (2) ×6.3, 70.5%, 9.8 per christening.
  - Source, held: none in the reveal. "Not a doctor's diagnosis" is a convention about what a recorded cause is. If the fact-checker wants a source, cut "or a doctor's diagnosis".
- Duplicate search (terms: plague, burial, Bills of Mortality, 1665): 0 lessons, 0 briefs.
- Boundary: life owns epidemic curves (SIR). This lesson is a recorded total, with no model.
- Curriculum: primary `history:plague-1665-bills`.
- Transfer recall (section 8): "A town normally records 100 deaths a year. One year it records 600, and 450 of those from one cause. What share is that cause?" A) About 45% / B) 75% / C) About 90% (answer: B).

### 9. britain-made-most-co2-in-1850 · concept: industrial-co2-share · intro · demand 2
- Format: Single card (stacked shares by country, 1750-1950; presets)
- Strand: population-economy. **Review route: sensitive (comparison of countries)**, changed from standard by W-889 (cm-history, 2026-10-15): the stage compares Britain, the US, France and Germany, and the charter already routes income comparisons of countries (great-divergence-incomes, dutch-golden-age-income), so emission shares by country cannot stay standard. The lesson is built (draft v2), so it needs a cultural-reviewer brief review now and a publish review on its walkthrough. Care line (unchanged): no blame, no "who owes what", no statement about today's emissions or policy.
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
- Transfer recall (section 10): "A sailor in 1700 knows her latitude exactly but her clock is 20 minutes wrong. Which way is her position uncertain?" A) North-south / B) East-west / C) Both equally (answer: B; 20 minutes = 5 degrees of longitude, in the script).

### 11. disaster-deaths-fell · concept: disaster-deaths-over-time · intro · demand 2
- Format: Single card (bars by decade, stacked by type; presets)
- Strand: events-data. **Review route: sensitive (famine)**: most 1920s deaths are recorded under drought and epidemic, and droughts then were famines. research-lead note on EM-DAT's coverage before 1950; cultural-reviewer `culture-en` (W-626). Care line: no country is named (the file has none); no "nature is getting kinder" framing.
- Learner knows: there are disasters in the news every year. / does not know: that recorded deaths from them have fallen about fifteenfold in a century, and far more per person.
- Misconception: Natural disasters kill more people now than a century ago.
- Prediction (21 words): "Natural disasters killed about 870,000 people a year worldwide in the 1920s. About how many a year in 2010 to 2017?" options: A) About 60,000 / B) About 500,000 / C) About 1.5 million (answer: A). Check section 11: 1920s mean 872,629 a year; 2010-2017 mean 56,869 (×15.3 fewer); population 1.97 bn (1925) → 7.38 bn (2014); per million people 442 → 7.7 (×57); 1920s by type: drought 4.72 million, epidemic 3.32 million (92% of the decade); biggest year 1931, 3.71 million (flood).
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
- Transfer recall (section 11): "Deaths from a cause fell from 100 to 50 a year while the population doubled. Per person, the risk fell to about what?" A) A quarter / B) Half / C) The same (answer: A).

### 12. khanates-outsize-russia · concept: empire-extent-mongols · intro · demand 2
- Format: Map explorer (WorldMap, an equal-area projection named on the stage; 1279 polygons over today's land)
- Strand: maps-borders. **Review route: sensitive (empire, borders, political figures: khanates named by ruler; W-889)**: research-lead note on what the dataset codes as "Mongol Empire" and how published estimates of its extent differ; cultural-reviewer `culture-en` (W-626). Care line: no conquest narrative, no "greatest empire" superlative, nothing about how the empire was won; the lesson is about counting area on a map.
- Learner knows: the Mongol Empire was huge. / does not know: how it compares with today's largest country, or that "how big" depends on which lands the mapmaker counts and how sure the borders are.
- Misconception: An empire's size is a fixed fact you can read off a map.
- Prediction (22 words): "Russia, today's largest country, covers about 1 in 8 of Earth's land outside Antarctica. How did the Mongol khanates of 1279 compare?" options: A) About half of Russia / B) About 1.4 times Russia / C) About 3 times Russia (answer: B). Check section 12: the four khanates (Great Khanate 10.55, Golden Horde 5.25, Ilkhanate 3.78, Chagatai 3.31) total 22.89 million km²; adding the four tributaries (Tibet, Novgorod, Ryazan, the Seljuks) gives 27.24; Russia (Natural Earth 1:50m) 16.88 million km² = 12.6% of land outside Antarctica; ratios 1.36 and 1.61; every Mongol polygon is precision 1 (approximate).
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
- Transfer recall (section 12): "Two maps of the same empire differ by a third in area. Both are carefully drawn. What most likely differs?" A) Which lands each counts as part of the empire / B) One is wrong / C) The size of the Earth (answer: A).

## Cycle 2: briefs 13-30 (cm-history, 2026-10-14, W-742)
Written from the "Next 88" tier 1 (data opened, standard route, no neighbour), after re-judging each of its 33 concepts against the charter. 18 became briefs; what happened to the other 15 is in the ranking below.
- **Data.** Every number comes from a file opened from this host and pinned by SHA-256 in `history-data.mjs`. Six pins are new: `cholera1849`, `bowley`, `guerry` (HistData via Rdatasets), `frdep` (French department outlines, used only as stand-ins), `gmu5` and `gmlex` (Gapminder world child mortality and life expectancy). Each file's documentation was read before it was used: the Rdatasets doc pages, the Gapminder concepts file, the Maddison README and the france-geojson README.
- **Numbers.** `node company/domains/briefs/checks/history-cycle2-check.mjs` recomputes every number in these briefs, checks every answer and recall, word counts and preset counts, and checks that each reveal ends with "Where it stops". It also checks that answer letters are spread evenly: A ×6, B ×6, C ×6 for answers, and the same for recalls. Builders copy numbers from its output only.
- **Options are worded at one precision** ("about" and round values), so the right option never stands out by being the exact one.
- **Balance.** Briefs 13-24 are 6 population-economy, 4 events-data and 2 maps-borders, so no strand is above half. Briefs 25-30 are all population-economy and are held for balance (Gate).
- **Duplicate search** for each brief: the same corpus and method as the re-check above, with the terms listed per brief.
- **Sensitive check.** Each brief was tested against the charter's classes. Where a stage could touch one (the US 1850 census, war prices, single-year falls in life expectancy), the brief moves the stage clear of it and says so in a care line. It does not argue the class away.

### 13. children-dying-before-five · concept: child-mortality-decline · intro · demand 3
- Format: Single card (presets on one line chart of deaths before 5 per 1,000 born, 1800-2020)
- Strand: population-economy. Review route: standard (a world figure; no country, group or event named). Care: deaths are a number and a line, never a picture of children.
- Learner knows: many children died in the past. / does not know: how many (about 4 in 10 worldwide in 1900), that the figure barely moved through the 1800s, or that most of the fall came after 1950.
- Misconception: Child deaths fell slowly and steadily over the last few centuries.
- Prediction (19 words): "Gapminder's world estimate: in 1900, 411 of every 1,000 children died before age 5. About how many in 2020?" options: A) About 250 / B) About 100 / C) About 35 (answer: C). Check section 13: 1800 430, 1900 411, 1950 246, 2020 37 per 1,000 (×11.1 fewer than 1900); 56% of the 1900-2020 fall came after 1950.
- What the stage shows: one line, 1800 to 2020, with a year axis (ticks every 50 years) and a "per 1,000 born" axis; a readout "{n} of every 1,000 children died before age 5". Preset buttons in DOM order: "1800", "1900" (milestone `y1900`), "1950", "2020" (milestone `y2020`), "Out of 100 children" (redraws the readout as 41 in 100 and 4 in 100; milestone `per100`). Each preset marks its year on the line and sets the readout. Reveal unlocks after `y1900` and `y2020`.
- Labels: axes 11 px; readout 12 px; year marks 11 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (66 words by script): "In 1900 about 411 of every 1,000 children died before age 5; in 2020, 37: about 11 times fewer. In the century before 1900 the figure barely moved, from 430. More than half of the fall since 1900, 56%, came after 1950. Where it stops: this is one source's world figure, and the further back it goes, the fewer places kept records to build it from."
- Claims:
  - Data: (1) world child mortality per 1,000 live births, 1800-2020 (history-data.mjs: gmu5, column child_mortality_0_5_year_olds_dying_per_1000_born; concept description "the probability of dying between birth and exactly five years of age", ddf--concepts.csv, opened).
  - Derivation: (2) ×11, the 56% after 1950, 41 and 4 in 100.
  - Source, held: (3) "the further back it goes, the fewer places kept records to build it from" (Gapminder documentation at gapm.io/du5mr; not reachable from this host). Fallback: "Where it stops: this is one source's world figure, an average over very different places."
- Duplicate search (terms): child mortality, before 5, children died, infant: 0 lessons, 0 briefs. Nearest: brief 1 survive-childhood-live-to-sixty (one city's life table in 1693; this is the world over two centuries).
- Boundary: no neighbour owns the child-mortality record. Big Ideas' demographic transition (deaths-fall-births-wait) uses a model country and births; this lesson shows one world series of deaths and says nothing about births.
- Curriculum: primary `history:child-mortality-decline`; prerequisites `history:life-expectancy-vs-lifespan`.
- Transfer recall (section 13): "Child deaths in a town fall from 300 to 30 per 1,000 born. How does the number of children reaching age 5 change?" A) About ten times as many / B) The same / C) About 40% more (answer: C).

### 14. life-expectancy-gained-late · concept: life-expectancy-century-gain · intro · demand 3
- Format: Single card (presets on one line chart, points every 25 years)
- Strand: population-economy. Review route: standard. Care: single-year falls (epidemic, war and famine years) are not drawn as labelled events; the chart uses one point every 25 years and says so.
- Learner knows: people live longer now than in the past. / does not know: that almost all the gain came in one century: about 3 years in the 1800s against about 35 in the 1900s.
- Misconception: Life expectancy has risen gradually for centuries.
- Prediction (23 words): "Gapminder's world life expectancy rose from 30.6 to 33.5 years between 1800 and 1900. How much did it rise from 1900 to 2000?" options: A) About 35 years / B) About 15 years / C) About 5 years (answer: A). Check section 14: 1800 30.64, 1900 33.48, 2000 68.20, 2023 74.0; as shown, +2.9 then +34.7 years (×12), then +5.8; 25-year points listed by the script. **Amended 2026-10-15 (cm-history, r1 rulings, `company/reviews/history-round-1-cm-rulings.md`):** every gain is the difference of the one-decimal values on the stage (33.5 − 30.6 = 2.9), so a learner's subtraction comes out. The unrounded gain is 2.84 (was quoted as 2.8); it stays in the script's detail line and the claim's support, never on the stage.
- What the stage shows: one line through 10 points (1800, 1825 … 2000, 2023) with a year axis and a years-of-life axis, and a readout "+{g} years". Preset buttons in DOM order: "1800 to 1900" (shades the span; readout +2.9; milestone `c19`), "1900 to 2000" (readout +34.7; milestone `c20`), "2000 to 2023" (+5.8), "Years gained in each span" (three bars, 2.9, 34.7 and 5.8, named with their spans' lengths; as built in v3). Reveal unlocks after `c19` and `c20` (and `now`, as built and accepted in round 1).
- Labels: axes 11 px; readouts 12 px; a caption "one point every 25 years" at 10 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (70 words by script; amended 2026-10-15 to the shipped v3 wording and the shown gain): "Over the 1800s world life expectancy rose 2.9 years, from 30.6 to 33.5. Over the 1900s it rose 34.7 years, to 68.2: about 12 times as much in one century as in the one before. By 2023 it was 74.0. Where it stops: these are one source's world figures, shown one year in every 25, so the chart hides single years when life expectancy fell sharply, such as epidemic years."
- Claims:
  - Data: (1) world life expectancy at birth, 1800-2023 (history-data.mjs: gmlex, column lex; concept description opened in ddf--concepts.csv).
  - Derivation: (2) +2.9, +34.7, +5.8 (differences of the shown one-decimal values; unrounded 2.84, 34.72, 5.84), ×12, the 25-year points.
  - Source, held: (3) "such as epidemic years" names why single years fell (not in the file). Fallback: "and single years fell sharply" (data: the script lists the years that fell by more than a year).
- Duplicate search (terms): life expectancy, lifespan, live longer: 1 lesson, life/screening-survival-clock (lead-time bias in cancer screening; a different question). 0 briefs. Nearest History lesson: brief 1 (what life expectancy averages); this one is when it rose.
- Boundary: no neighbour owns the world life-expectancy record. The concept's original wording (how much of the gain came from children) needs age-specific data that is not pinned; the brief keeps to the timing, and the curriculum name now says so.
- Curriculum: primary `history:life-expectancy-century-gain`; prerequisites `history:life-expectancy-vs-lifespan`.
- Transfer recall (section 14): "A country's life expectancy rose 3 years in one century and 30 in the next. What share of the two centuries' gain came in the second?" A) About a tenth / B) About half / C) About 90% (answer: C).

### 15. doubling-stopped-speeding-up · concept: world-population-doubling · intro · demand 2
- Format: Single card (presets on one line, 1800-2023, with doubling spans marked)
- Strand: population-economy. Review route: standard. Care: no projection after the present on the stage, no country named.
- Learner knows: world population grew fast and passed 8 billion. / does not know: that the last doubling (4 to 8 billion) took no less time than the one before, because the yearly growth rate peaked in 1963.
- Misconception: World population keeps doubling faster and faster.
- Prediction (24 words): "World population took 122 years to go from 1 to 2 billion, and 48 years to reach 4 billion. How long to reach 8?" options: A) About 24 years / B) About 47 years / C) About 96 years (answer: B). Check section 15: 1 bn 1805, 2 bn 1927, 4 bn 1975, 8 bn 2022 (122, 48, 47 years); growth peaked at 2.25% a year in 1963 (1963 to 1964); 0.88% from 2022 to 2023. **Amended W-869 (cm-history, 2026-10-15):** only values up to 2023 enter any number. The file's 2024 value is a same-year projection (FC39/FC41 c3: Gapminder pop v8 is dated 29 July 2024), so the last rate is the 2022→2023 forward rate, 100 × (P2023/P2022 − 1) = 0.877, shown 0.88 and labelled "2022 to 2023" (was 0.87% "in 2023", which used 2024). Growth is labelled by its start year; the peak is searched over 1900-2022. This matches the shipped lesson v2.
- What the stage shows: one population line 1800-2023 (billions axis, year axis) and a readout "{a} to {b} billion: {n} years". Preset buttons in DOM order: "1 to 2 billion" (milestone `d1`), "2 to 4 billion" (milestone `d2`), "4 to 8 billion" (milestone `d3`), "Growth per year" (switches to the yearly growth rate, peak labelled 1963, last value labelled "2022 to 2023"; milestone `rate`). The stage draws 1800 to 2023 only. Reveal unlocks after `d3` and `rate`.
- Labels: axes 11 px; span labels 11 px; readout 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (80 words by script; amended W-869, and "no faster" became "about as fast" per FC39 c4): "The doublings took 122 years, then 48, then 47: the last was about as fast as the one before. Growth per year peaked at 2.25% in 1963 and was 0.88% from 2022 to 2023. A doubling that takes as long as the last one, at a falling yearly rate, means growth is slowing, not racing. Where it stops: early totals are the least certain, and the chart stops at the present; any later number is a projection, not a record."
- Claims:
  - Data: (1) world population by year, 1800-2023 (history-data.mjs: gmpop, column pop).
  - Derivation: (2) the years each total was first reached, the three spans, yearly growth (forward rate, labelled by start year, values to 2023 only), its 1963 peak and the 2022 to 2023 rate, 0.88%.
  - Source, held: none. "Early totals are the least certain" is a convention about reconstructed counts; cut it if the fact-checker wants a source.
- Duplicate search (terms): world population, doubling time, billion people, population growth: 2 lessons, economics/rule-of-72-shortcut and math/seventy-two-doubling (the doubling mechanism; prerequisites, not duplicates). 1 brief: big-ideas.md deaths-fall-births-wait (the demographic transition; Big Ideas owns why growth slows, and this lesson names no cause).
- Boundary: Books fact-straight-line owns the projection and the peak; Big Ideas owns the transition mechanism. This lesson is the record up to 2023 only.
- Curriculum: primary `history:world-population-doubling`; prerequisites `math:exponential-growth`.
- Transfer recall (section 15): "A town grows from 10,000 to 20,000 in 30 years, then to 40,000 in the next 30. Is its growth speeding up?" A) No: the same doubling time is the same rate / B) Yes: it added more people / C) It is slowing (answer: A).

### 16. more-boys-christened · concept: sex-ratio-at-baptism · intro · demand 2
- Format: Single card (presets on 82 yearly bars of boys minus girls)
- Strand: population-economy. Review route: standard.
- Learner knows: about as many boys as girls are born. / does not know: that a small surplus of boys showed in every one of 82 years of London's christenings, because the counts were large.
- Misconception: In old records, boys and girls come out about even, so any year could go either way.
- Prediction (21 words): "London christened 484,382 boys and 453,841 girls from 1629 to 1710. In how many of those 82 years were boys more?" options: A) 41 of 82 / B) 60 of 82 / C) 82 of 82 (answer: C). Check section 16: boys 484,382, girls 453,841 (106.7 per 100); boys more in 82 of 82 years; closest 1703 (101.1), widest 1661 (115.6).
- What the stage shows: 82 bars (one per year, 1629-1710), each the number of boys minus girls, with a zero line and a year axis; a readout "{b} boys per 100 girls". Preset buttons in DOM order: "Boys minus girls, each year" (milestone `bars`), "Boys per 100 girls" (overall readout 107; milestone `ratio`), "Closest year" (marks 1703), "Widest year" (marks 1661). Reveal unlocks after `bars` and `ratio`.
- Labels: axis 11 px (every 20 years); readout 12 px; bars at least 3 px wide at 390 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (66 words by script): "Boys outnumbered girls at christening in all 82 years, by about 107 to 100 overall. Even the closest year, 1703, had 101 boys for every 100 girls, and the widest, 1661, had 116. A small, steady difference shows every single year once the counts are in the thousands. Where it stops: these are christenings in London, not births, so babies who were never christened are missing."
- Claims:
  - Data: (1) christenings of males and females by year, London 1629-1710 (history-data.mjs: arbuthnot, columns Males, Females).
  - Derivation: (2) 82 of 82, 107 per 100, the closest and widest years.
  - Source, held: none. "Christenings, not births" is what the file counts (Arbuthnot doc: christenings by sex).
- Duplicate search (terms): sex ratio, more boys, boys and girls, christen, baptis: 1 lesson, life/who-has-grandchildren (Fisher's reason the ratio settles near 1:1; the mechanism, owned by life). Briefs: life.md who-has-grandchildren, probability.chance.md stop-at-the-first-boy (stopping rules; unrelated).
- Boundary: life owns why the ratio is near 1:1 (`life:sex-ratio-fisher`); probability owns the sign test. This lesson is the record and what christenings are not.
- Curriculum: primary `history:sex-ratio-at-baptism`; also `life:sex-ratio-fisher`.
- Transfer recall (section 16): "Boys are 51% of births. Which hospital more often has a day with more girls than boys: one with 10 births a day or one with 1,000?" A) The one with 10 / B) The one with 1,000 / C) Both equally often (answer: A).

### 17. coal-came-back · concept: coal-then-oil-co2 · intro · demand 2
- Format: Single card (100% stacked area of coal, oil, gas and other, 1750-2024; presets)
- Strand: population-economy. Review route: standard, with the care line of brief 9: no blame, no country, no statement about today's policy.
- Learner knows: the world moved from coal to oil. / does not know: that oil passed coal in 1968 but coal took the lead back in 2005, and that coal's tonnes in 2024 were about three times 1968's.
- Misconception: Coal is a fuel of the past: oil replaced it.
- Prediction (19 words): "Oil overtook coal as the world's biggest source of fossil carbon dioxide in 1968. Which was bigger in 2024?" options: A) Coal / B) Oil / C) About equal (answer: A). Check section 17: coal 96% in 1900; oil ahead 1968-2004 (37 years); coal ahead every year from 2005; 2024 coal 15,805 Mt (41%), oil 12,471 Mt (32%); coal 1968 5,320 Mt → 2024 ×3.
- What the stage shows: a 100% stacked area by source (coal, oil, gas, other) with a year axis; a readout "{year}: coal {c}%, oil {o}%". Preset buttons in DOM order: "1900", "1968" (milestone `y1968`), "2005" (milestone `y2005`), "2024" (milestone `y2024`), "Tonnes, not shares" (switches to million tonnes; milestone `tonnes`). Reveal unlocks after `y2024` and `tonnes`.
- Labels: source labels inside the areas at 11 px (outside with leader lines where thin); axes 11 px; each source has a pattern as well as a colour. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (71 words by script): "In 1900 coal made 96% of the world's fossil CO2. Oil passed it in 1968, but coal took the lead back in 2005, and in 2024 coal made 41% against oil's 32%. Coal's emissions in 2024 were 3 times those of 1968: a fuel can lose first place and still burn more. Where it stops: these are estimates rebuilt from records of fuel use, and the file is revised every year."
- Claims:
  - Data: (1) World coal_co2, oil_co2, gas_co2 and co2 by year (history-data.mjs: co2; million tonnes).
  - Derivation: (2) shares, the crossing years, ×3.
  - Source, held: (3) "estimates rebuilt from records of fuel use" (OWID CO2 README and the Global Carbon Project methods; the README is reachable, not opened for this sentence). Fallback: "Where it stops: these are estimates, and the file is revised every year" (the revision is why the pin can fail).
- Duplicate search (terms): coal, oil with CO2 or emission, fossil: 0 lessons, 0 briefs. Nearest: brief 9 britain-made-most-co2-in-1850 (shares by country; this is shares by fuel).
- Boundary: chemistry and geography own CO2 science. Master-branch pin: if OWID updates the file, the check fails and the numbers are re-read before build.
- Curriculum: primary `history:coal-then-oil-co2`; prerequisites `history:industrial-co2-share`.
- Transfer recall (section 17): "Buses carried 90% of a city's trips in 1950 and 40% today, while all trips grew six times. Did bus trips fall?" A) Yes, to under half / B) No, they rose / C) They stayed the same (answer: B).

### 18. italy-poorer-in-1800 · concept: italy-long-decline · core · demand 2
- Format: Single card (index line, 1450 = 100; presets)
- Strand: population-economy. Review route: standard (one country over time; no comparison with another).
- Learner knows: income per person rises over time. / does not know: that on the best reconstruction, north and central Italy were poorer per person in 1800 than in 1450.
- Misconception: Income per person only ever rose, even if slowly, before industry.
- Prediction (23 words): "Maddison's series puts income per person in north and central Italy at an index of 100 in 1450. What was it in 1800?" options: A) About 75 / B) About 100 / C) About 150 (answer: A). Check section 18: 1450 3,218 → 1800 2,404 (index 75; −0.083% a year); 1310 index 89; 1600 index 75.
- What the stage shows: an index line (1450 = 100) from 1310 to 1871 with a year axis and an index axis; a readout "index {i}". Preset buttons in DOM order: "1450" (milestone `y1450`), "1800" (milestone `y1800`), "1310 to 1871, the whole line", "Change per year" (readout −0.08% a year). Reveal unlocks after `y1800`.
- Labels: axes 11 px; readout 12 px. No currency label (the copy states no unit). Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (73 words by script): "On this series, a person in north and central Italy in 1800 had about 75% of the income of one in 1450: a fall of about 0.08% a year for 350 years. Income per person can shrink for centuries, not only grow. Where it stops: this is one reconstruction, it covers only the north and centre before 1871, and the copy we opened states no unit, so it is read as an index."
- Claims:
  - Data: (1) GDP per capita, Entity "Italy", 1310-1871 (history-data.mjs: maddison). (2) "1310-1871 (North Italy) Malanima (2010)" (Maddison README, opened).
  - Derivation: (3) index 75, −0.08% a year.
  - Source, held: none. "One reconstruction" rests on the README naming one source for these years. Optional caption, held: Malanima's title, "The long decline of a leading economy" (README, opened; cut if the fact-checker wants the paper).
- Duplicate search (terms): Italy, decline, income per person, GDP per: 0 lessons, 0 briefs. Nearest: brief 2 income-flat-then-sixteenfold (England's slow rise; this is a fall).
- Boundary: economics owns growth mechanisms. The original concept `roman-italy-income` (year 1) is not briefed: the README names no Italian source for the year-1 value (W-583 list).
- Curriculum: primary `history:italy-long-decline` (new concept, W-742); prerequisites `history:long-run-income-growth`.
- Transfer recall (section 18): "A town's income per person falls 0.1% a year for 300 years. About how much poorer is it at the end?" A) About 3% / B) About 26% / C) About 70% (answer: B).

### 19. earthquakes-did-not-fall · concept: earthquake-deaths-record · intro · demand 2
- Format: Side-by-side comparison (two halves of the record, all disasters and earthquakes, sharing one set of presets)
- Strand: events-data. Review route: standard. Care: no country, place or event is named (the file has none); years only; no imagery.
- Learner knows: disasters kill fewer people than they used to. / does not know: that earthquake deaths did not fall: they rose a little from 1900-1958 to 1959-2017, while all disaster deaths fell by 71%.
- Misconception: Deaths from every kind of natural disaster have fallen alike.
- Prediction (18 words): "Recorded deaths from all natural disasters fell about 70% from 1900-1958 to 1959-2017. What happened to earthquake deaths?" options: A) Fell about 70% / B) Fell about 95% / C) Rose about 15% (answer: C). Check section 19: all disasters 25.24 → 7.37 million (−71%); earthquakes 1.21 → 1.37 million (+14%); per million people a year 9.7 → 4.5; three biggest later years (1976, 2004, 2010) 53%; 7 years with no earthquake row count as zero.
- What the stage shows: two panels, 1900-1958 and 1959-2017, each with two bars (all disasters, earthquakes) on a shared deaths axis; a readout per panel. Preset buttons in DOM order: "All disasters, two halves" (milestone `all`), "Earthquakes, two halves" (milestone `quake`), "Per million people" (milestone `percap`), "Three biggest years" (marks three yearly bars in the later half, years only). Reveal unlocks after `quake` and `percap`.
- Labels: bar labels 11 px; readouts 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (77 words by script): "Recorded deaths from all disasters fell from 25.2 million in 1900-1958 to 7.4 million in 1959-2017, but earthquake deaths rose, from 1.21 to 1.37 million. The world's population more than doubled, so per person the yearly risk still fell, from 9.7 to 4.5 per million. Just three years made up 53% of the later earthquake deaths. Where it stops: a single year can change a half-century's total, so a trend in earthquake deaths is hard to read."
- Claims:
  - Data: (1) deaths by year, entities All natural disasters and Earthquake, 1900-2017 (history-data.mjs: vega, disasters.csv; EM-DAT via Our World in Data per the package description). (2) world population by year (history-data.mjs: gmpop).
  - Derivation: (3) half-period sums, −71%, +14%, per million a year, 53%.
  - Source, held: none.
- Duplicate search (terms): earthquake, disaster, risk per person: 0 lessons, 0 briefs. Nearest: brief 11 disaster-deaths-fell (all disasters; held for W-626 because of famine). This lesson stands alone: its own first preset shows the all-disaster fall.
- Boundary: probability owns per-capita rates (prerequisite). volcano-deaths-record is merged here (one year dominating a small record).
- Curriculum: primary `history:earthquake-deaths-record`; prerequisites `probability:per-capita-rates`.
- Transfer recall (section 19): "Deaths from a cause stay the same while the population doubles. What happens to the risk per person?" A) It halves / B) It stays the same / C) It doubles (answer: A).

### 20. cholera-fell-with-height · concept: cholera-1849-elevation · core · demand 2
- Format: Single card (scatter of 38 districts, elevation against deaths per 10,000; presets)
- Strand: events-data. Review route: standard (an epidemic not tied to a named group). Care: districts are dots, not people; no germ, pump or Snow (Big Ideas' lesson).
- Learner knows: cholera hit poor, crowded parts of Victorian London. / does not know: how strongly it fell with height above the Thames in Farr's own table, and that height and water supply went together, so the table cannot separate them.
- Misconception: A pattern as strong as this in the record shows the cause.
- Prediction (24 words): "In London's 1849 cholera, districts under 20 feet above the Thames lost 92 people per 10,000. What about districts 80 feet up or more?" options: A) About the same / B) About a fifth as many / C) About half as many (answer: B). Check section 20: under 20 ft, 16 districts, 91.7 per 10,000; 80 ft and up, 4 districts, 19.8 (×4.6); 11 of the 16 low districts on the Battersea-Waterloo Thames supply; within each supplier elevation still predicts (r = −0.68, −0.55, −0.47).
- What the stage shows: 38 dots (elevation in feet on a log-like axis from 0 to 350, deaths per 10,000), a readout "{n} districts: {r} per 10,000". Preset buttons in DOM order: "Under 20 feet" (milestone `low`), "80 feet and up" (milestone `high`), "Colour by water company" (three shapes as well as colours; milestone `water`), "One company's districts only" (Battersea-supplied dots; the slope remains). Reveal unlocks after `high` and `water`.
- Labels: axes 11 px; readout 12 px; legend 11 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (74 words by script): "The 16 districts under 20 feet lost 92 per 10,000; the 4 at 80 feet or more lost 20, about 5 times fewer. The pattern in Farr's table is real. But 11 of those 16 low districts drew their water from the Thames between Battersea and Waterloo, so height and water went together, and this table alone cannot say which mattered. Where it stops: these are deaths registered in one year, district by district."
- Claims:
  - Data: (1) cholera deaths, population, elevation (feet above high water) and water supplier for 38 districts, 1849 (history-data.mjs: cholera; Farr's tables via Bingham et al. 2004, per the doc).
  - Derivation: (2) the pooled rates, ×4.6 ("about 5"), 11 of 16, the within-supplier correlations.
  - Source, held: none in the reveal. Not used: the doc's "Farr initially believed that cholera arose from bad air" (doc opened; Farr 1852 not). If a builder adds Farr's theory, it is a held claim, cut if not checkable.
- Duplicate search (terms): cholera, elevation, Farr, miasma: 0 lessons; 1 brief hit, chemistry boiling-point-elevation (unrelated). Nearest: Big Ideas germ-theory-pump (Snow; owns the cause).
- Boundary: Big Ideas owns germ theory and Snow's pump; this lesson is Farr's confounded record and never says water alone (elevation still predicts within each supplier). probability owns confounding (prerequisite). cm-big-ideas should see this brief (board), but it takes nothing they own.
- Curriculum: primary `history:cholera-1849-elevation`; prerequisites `probability:confounding`.
- Transfer recall (section 20): "In a city, the low streets have both more illness and the oldest wells. From those two facts alone, what causes the illness?" A) The low ground / B) The wells / C) These facts cannot tell (answer: C).

### 21. plague-every-year-then-none · concept: plague-recurrence-london · core · demand 1
- Format: Single card (yearly bars 1629-1710 on a log axis; presets)
- Strand: events-data. Review route: standard (brief 8's care line: no plague imagery).
- Learner knows: the Great Plague of 1665 was a single terrible year. / does not know: that plague burials were recorded in 47 of the 51 years before 1680, usually a handful, and then none at all for 31 years.
- Misconception: Between great outbreaks, plague was gone.
- Prediction (21 words): "London's bills cover 51 years from 1629 to 1679. In about how many did they record at least one plague burial?" options: A) About 5 / B) About 25 / C) About 45 (answer: C). Check section 21: 47 of 51 years 1629-1679 with plague burials (none in 1629, 1633, 1635, 1670); 1664: 5; 12 years ≥ 1,000; 1680-1710: none in 31 years.
- What the stage shows: 82 bars of plague burials per year on a log axis (1, 10, 100, 1,000, 10,000 and up; zero shown as an empty slot with a dot), year axis every 20 years, readout "{k} of {n} years". Preset buttons in DOM order: "1629 to 1679, year by year" (milestone `count`), "1664, the year before 1665" (milestone `y1664`), "1680 to 1710" (milestone `after`), "Years with 1,000 or more". Reveal unlocks after `count` and `after`.
- Labels: log axis 11 px; readout 12 px; bars at least 3 px wide. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (82 words by script): "Plague burials were recorded in 47 of the 51 years to 1679, usually only a handful: 1664, the year before the worst outbreak, recorded 5. In 12 years they passed 1,000. Then, from 1680 to 1710, the bills recorded no plague burial in any of those 31 years. The disease was nearly always there at a low level, until it left the record. Where it stops: these are causes as the bills recorded them, and the record cannot say why plague stopped."
- Claims:
  - Data: (1) plague burials by year, 1629-1710 (history-data.mjs: arbuthnot, column Plague; per the doc from Campbell 2001 and Creighton, 1965 ed., neither opened: same note as brief 8, corrected W-872).
  - Derivation: (2) 47 of 51, 12 years, none in 31.
  - Source, held: none.
- Duplicate search (terms): plague, Bills of Mortality, outbreak: 7 lessons, all life epidemiology models (outbreak-can-fizzle-above-one, herd-immunity …), not the record. 0 History briefs besides brief 8, which is the size of 1665; this is how often plague appeared.
- Boundary: life owns epidemic models. Brief 8's "1636, an earlier outbreak" preset stays; this lesson's question is presence, not size.
- Curriculum: primary `history:plague-recurrence-london`; prerequisites `history:plague-1665-bills`.
- Transfer recall (section 21): "A town records a disease in 40 of 50 years, mostly one or two cases, then 500 cases in one year. What does that suggest about the quiet years?" A) The disease was absent / B) The counts were wrong / C) It was there at a low level (answer: C).

### 22. cholera-half-in-six-weeks · concept: cholera-1849-daily · intro · demand 1
- Format: Single card (365 daily bars; presets)
- Strand: events-data. Review route: standard.
- Learner knows: England had a cholera epidemic in 1849. / does not know: that half of the year's 53,293 registered deaths fell within 38 days.
- Misconception: A year's epidemic deaths are spread across the year.
- Prediction (19 words): "England registered 53,293 deaths from cholera in 1849. Half of them fell within how many days in a row?" options: A) About 40 / B) About 120 / C) About 250 (answer: A). Check section 22: cholera 53,293 over 365 days; half within 38 consecutive days; August + September 68%; peak 6 September, 1,121; diarrhoea 18,887, peak 10 September (218).
- What the stage shows: 365 daily bars with a month axis and a readout. Preset buttons in DOM order: "The whole year" (milestone `year`), "The busiest stretch" (highlights the 38 days; milestone `half`), "Peak day" (marks 6 September), "Diarrhoea, same year" (adds a second line; merges the cholera-and-diarrhoea concept). Reveal unlocks after `half`.
- Labels: month labels 11 px; readout 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (74 words by script): "Half of the year's 53,293 registered cholera deaths fell within 38 days, and 68% in August and September. The busiest day, 6 September, registered 1,121. Deaths registered as diarrhoea rose and fell in the same months. A year's total can hide an epidemic that came and went in a few weeks. Where it stops: these are deaths as registered, each with the cause written down, and one day's figure was rebuilt from row totals."
- Claims:
  - Data: (1) daily deaths by cause, England 1849 (history-data.mjs: cholera1849; General Register Office & Farr 1852, transcribed by Riley, per the doc). (2) day 11 rebuilt from row totals (doc, opened).
  - Derivation: (3) 38 days, 68%, the peaks.
  - Source, held: none.
- Duplicate search (terms): cholera, diarrh, epidemic curve, daily deaths: 0 lessons, 0 briefs. Nearest: brief 20 (the same epidemic in London by district; a different question).
- Boundary: life owns the epidemic curve (`life:sir-epidemic-curve`); no model on this stage.
- Curriculum: primary `history:cholera-1849-daily`; prerequisites `life:sir-epidemic-curve`; also `history:cholera-and-diarrhoea-1849` (merged).
- Transfer recall (section 22): "A town's yearly total is 365 deaths from one illness, 'one a day'. Half came within 30 days. On those days, about how many a day?" A) About 1 / B) About 6 / C) About 30 (answer: B).

### 23. literacy-split-france · concept: guerry-literacy-map · intro · demand 1
- Format: Map explorer (WorldMap or a GeoJSON stage with a named conic projection; 86 departments shaded by literacy; presets)
- Strand: maps-borders. Review route: standard (a measured quantity by place; no people ranked). Care: no region is called backward or advanced.
- Learner knows: France had regional differences. / does not know: how sharp the 1830s literacy split was: north and east about twice the south, west and centre.
- Misconception: A national average describes most of the country.
- Prediction (23 words): "Across France's 86 departments in the 1830s, about 39% of army conscripts could read and write, on average. Which part was most literate?" options: A) The south / B) The north and east / C) The west (answer: B). Check section 23: N 54.1, E 56.4, S 31.9, W 27.6, C 25.8 (17 departments each); N+E 55.2, S+W+C 28.8; mean of 86 departments 39.26; Meuse 74, Corrèze 12, Seine 71; outlines 06, 73, 74 have no value.
- What the stage shows: France's departments (today's outlines standing in, mapped by the script: Seine = 75, 92, 93, 94; Seine-et-Oise = 78, 91, 95; Haut-Rhin with 90; Corse = 2A, 2B; 06, 73, 74 hatched "no value in Guerry's table"), shaded in 5 steps with a legend; a readout "{area}: {x}% of conscripts". Preset buttons in DOM order: "North and east" (outlines Guerry's N and E regions; milestone `ne`), "South, west and centre" (milestone `swc`), "Paris (Seine)", "Most and least literate" (Meuse and Corrèze). Reveal unlocks after `ne` and `swc`.
- Labels: legend 11 px; readout 12 px; department names only on the preset that names them, 11 px; projection name 10 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (66 words by script): "In Guerry's north and east, departments averaged 55% of conscripts who could read and write; in the south, west and centre, 29%. The extremes were Meuse, 74%, and Corrèze, 12%. An average of 39% across departments hid two very different Frances. Where it stops: these are young men called up for the army, not everyone, and today's department outlines stand in for those of the 1830s."
- Claims:
  - Data: (1) Literacy (percent of military conscripts who can read and write) and Region for 86 departments (history-data.mjs: guerry). (2) department outlines (history-data.mjs: frdep; today's, standing in).
  - Derivation: (3) the regional means, 39%, the extremes.
  - Source, held: none in the reveal. Optional caption, held: "Guerry's 1833 shaded maps were among the first maps of statistics" (doc: "the first to systematically collect and analyze social data"; maps not opened). Cut if not checkable. This merges thematic-maps-guerry.
- Duplicate search (terms): literacy, Guerry, read and write, choropleth: 0 lessons. Briefs: geography.maps-projections mostly-yes-on-the-map (choropleth area bias; geography's mechanism, a prerequisite); probability where-the-axis-starts and four-hundred-or-thirty (unrelated hits on 'per').
- Boundary: geography owns choropleth bias (`geography:choropleth-area-bias`). The map shows a measured share by department; the reveal compares regions, not people.
- Curriculum: primary `history:guerry-literacy-map`; prerequisites `geography:choropleth-area-bias`; also `history:thematic-maps-guerry` (merged).
- Transfer recall (section 23): "A country's average literacy is 50%: half its regions are at 80%, half at 20%. What does the average hide?" A) Nothing / B) Two very different halves / C) A counting error (answer: B).

### 24. schooling-and-crime-1830s · concept: guerry-crime-vs-instruction · core · demand 1
- Format: Side-by-side comparison (least and most literate quarters of departments, then all 86 as dots)
- Strand: maps-borders. Review route: standard. Care: no department or region is called criminal; quarters and dots are labelled by number only.
- Learner knows: schooling is said to reduce crime. / does not know: that in Guerry's 1830s France the most literate departments recorded more property crime per person, not less.
- Misconception: Where more people could read, less crime was recorded.
- Prediction (21 words): "Compare the most literate quarter of Guerry's French departments with the least literate. Where were recorded property crimes per person higher?" options: A) In the least literate, about 1.7 times as high / B) About equal / C) In the most literate, about 1.7 times as high (answer: C). Check section 24: quarters of 21 departments (literacy 18.6% and 63.4%); property crimes per 100,000 11.3 and 18.9 (×1.7); crimes against persons 5.9 and 5.9; all 86, r = 0.37 (persons r = 0.03).
- What the stage shows: two panels (least and most literate quarter), each with two bars (property, persons; crimes per 100,000), then a scatter of all 86. Preset buttons in DOM order: "Least literate quarter" (milestone `lo`), "Most literate quarter" (milestone `hi`), "Crimes against persons", "All 86 departments" (scatter with r). Reveal unlocks after `lo` and `hi`.
- Labels: bar labels 11 px; axes 11 px; readouts 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (68 words by script): "The most literate quarter of departments recorded 18.9 property crimes per 100,000 people, against 11.3 in the least literate: 1.7 times as many. Crimes against persons were the same, 5.9 per 100,000 in both. In this record, more schooling did not go with less crime. Where it stops: these are crimes brought to court in 1825-1830, and two numbers moving together say nothing, alone, about what caused what."
- Claims:
  - Data: (1) Literacy, Crime_prop and Crime_pers (population per crime, Compte général 1825-1830) for 86 departments (history-data.mjs: guerry).
  - Derivation: (2) crimes per 100,000 = 100,000 / population per crime; the quarter means, ×1.7, r.
  - Source, held: none. Not used: Guerry's own conclusion about instruction and crime (Guerry 1833; not opened).
- Duplicate search (terms): crime, schooling, Guerry, literac: 0 lessons; 2 brief hits in probability (truncated axis, per-capita rates; prerequisites for reading rates).
- Boundary: probability owns confounding and per-capita rates (prerequisites). Same data as brief 23; a different question (a relation, not a map).
- Curriculum: primary `history:guerry-crime-vs-instruction`; prerequisites `probability:confounding`, `probability:per-capita-rates`.
- Transfer recall (section 24): "Towns with more libraries report more thefts. What is the safest reading?" A) Libraries cause theft / B) The thefts are misreported / C) They go together here; the cause needs more evidence (answer: C).

**Reserve, briefs 25-30: written and checked, held for strand balance (Gate). Skip lines in `company/ops/brief-skips.json` say when they are released.**

### 25. americans-over-sixty-five · concept: us-old-age-share · intro · demand 2
- Format: Single card (age bars by census year; presets)
- Strand: population-economy. Review route: standard, because the stage starts at 1900. Care: 1850 and 1860 are not shown (the file counts the free population only then; that coverage is the sensitive concept us-age-structure).
- Learner knows: the US population is ageing. / does not know: by how much: the 65-and-over share tripled in a century while the under-15 share fell by a third.
- Misconception: The share of older Americans has always been about what it is now.
- Prediction (19 words): "In the 1900 US census, about 4 in 100 Americans were 65 or older. About how many in 2000?" options: A) About 6 in 100 / B) About 12 in 100 / C) About 25 in 100 (answer: B). Check section 25: 65+ 1900 4.1%, 1950 8.1%, 2000 12.4%; under 15 34.3% → 21.4%; no 1890 in the file; the 1850 total is 19,987,559 (free population).
- What the stage shows: one stacked bar per census year 1900-2000 (under 15, 15-64, 65+), a readout "{y}: {o}% aged 65+". Preset buttons in DOM order: "1900", "1950", "2000" (milestone `y2000`), "Children under 15" (milestone `kids`), "Every age group" (5-year bands for the chosen year). Reveal unlocks after `y2000` and `kids`.
- Labels: year labels 11 px (every 20 years at 390 px); readout 12 px; band labels 10 px minimum. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (63 words by script): "In 1900, 4.1% of Americans were 65 or older; in 2000, 12.4%, about 3 times the share. Over the same century the share under 15 fell from 34% to 21%. The country aged at both ends: more older people, and fewer children for each person. Where it stops: these are census samples harmonised by IPUMS, and the file has no count for 1890."
- Claims:
  - Data: (1) people by age group, sex and year (history-data.mjs: vega, population.json; IPUMS USA per the package description).
  - Derivation: (2) shares, ×3, the missing 1890.
  - Source, held: none.
- Duplicate search (terms): over 65, older people, ageing, age pyramid, age structure: 8 lesson hits, all on "averaging" (ai, cs, probability); none on population age. 0 briefs.
- Boundary: economics and Big Ideas own why populations age; this lesson is the record. The concept's prerequisite (us-age-structure, sensitive) is removed: this lesson stands alone from 1900.
- Curriculum: primary `history:us-old-age-share`; prerequisites none.
- Transfer recall (section 25): "A town's number of people over 65 stays the same while its number of children halves. What happens to the over-65s' share?" A) It rises / B) It stays the same / C) It falls (answer: A).

### 26. office-work-one-in-seven · concept: clerical-work-rise · intro · demand 2
- Format: Single card (one share line, 1900-2000; presets)
- Strand: population-economy. Review route: standard, because the stage starts at 1900 and never splits by sex (women in recorded work is the sensitive concept women-in-recorded-work).
- Learner knows: office jobs are common today. / does not know: that office clerical work grew from 2 in 100 recorded jobs in 1900 to about 1 in 7 by 1970, then its share slipped while the number still grew.
- Misconception: Office work became a big share of jobs only with computers.
- Prediction (20 words): "In the 1900 US census, about 2 in 100 recorded jobs were office clerical work. By 1970, about how many?" options: A) About 4 in 100 / B) About 8 in 100 / C) About 15 in 100 (answer: C). Check section 26: Clerical Worker + Secretary + Bookkeeper + Office Machine Operator: 1900 2.1%, 1940 8.2%, 1970 15.1% (peak), 2000 12.7%; 16.5 → 21.4 million, 1970-2000.
- What the stage shows: a share line by census year with a readout "{y}: {s}% of recorded jobs". Preset buttons in DOM order: "1900", "1940", "1970" (milestone `y1970`), "2000" (milestone `y2000`), "Millions, not share" (milestone `count`). Reveal unlocks after `y1970` and `count`.
- Labels: axes 11 px; readout 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (64 words by script): "Clerks, secretaries, bookkeepers and office machine operators made up 2.1% of recorded jobs in 1900 and 15.1% in 1970, about 1 in 7. By 2000 the share had slipped to 12.7%, though their number had grown, from 16.5 to 21.4 million. Where it stops: these are IPUMS's harmonised job codes, and a job's name or code can shift from one census to the next."
- Claims:
  - Data: (1) counts by occupation and year (history-data.mjs: vega, jobs.json; IPUMS USA v6.0, harmonised to 1950 codes per the package description); both sexes summed.
  - Derivation: (2) shares, the 1970 peak, millions.
  - Source, held: none.
- Duplicate search (terms): clerical, office work, secretar, occupation: 0 lessons, 0 briefs. Nearest: brief 3 half-the-men-farmed (same file; the farm share).
- Boundary: Big Ideas owns lump-of-labour; this lesson says nothing about jobs lost or gained in total.
- Curriculum: primary `history:clerical-work-rise`; prerequisites `history:farm-share-structural-change`.
- Transfer recall (section 26): "A job grows from 1 in 50 to 1 in 7 of all jobs while the total number of jobs grows 4 times. About how many times more people do it?" A) About 4 times / B) About 7 times / C) About 28 times (answer: C).

### 27. wheat-flat-for-two-centuries · concept: wheat-price-swings · intro · demand 2
- Format: Single card (price line, readings every 5 years; presets)
- Strand: population-economy. Review route: standard. Care: no cause is named for any movement (a war-price lesson is the sensitive concept bread-price-1770-1824).
- Learner knows: prices rise over time. / does not know: that on Playfair's figures wheat cost about the same in 1765 as in 1565, swinging by up to 58% between readings.
- Misconception: Prices have always climbed steadily.
- Prediction (19 words): "Playfair's figures put wheat at 41 shillings a quarter in 1565. In 1765, two hundred years later, about what?" options: A) About 40 / B) About 90 / C) About 150 (answer: A). Check section 27: 1565 41, 1765 43 (×1.05); biggest fall 1595-1600, 64 → 27 (−58%); 21 of 52 steps fall; 1790 47.5 → 1810 99.
- What the stage shows: one line through 53 readings (1565-1821), shillings per quarter axis, year axis. Preset buttons in DOM order: "1565", "1765" (milestone `y1765`), "Biggest five-year drop" (milestone `drop`), "1790 to 1810". Reveal unlocks after `y1765` and `drop`.
- Labels: axes 11 px; readout 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (74 words by script): "Wheat cost 41 shillings a quarter in 1565 and 43 in 1765: almost no change in 200 years. In between it swung hard, from 64 in 1595 to 27 in 1600, a fall of 58% in five years. The steep rise came only at the end, from 47.5 in 1790 to 99 in 1810. Where it stops: these are single readings every five years from one source, so the years between are not shown."
- Claims:
  - Data: (1) wheat price every 5 years, 1565-1821 (history-data.mjs: wheat, column Wheat).
  - Derivation: (2) ×1.05, −58%, 21 of 52.
  - Source, held: none.
- Duplicate search (terms): wheat, price of bread, prices rose, inflation: 10 lessons, all economics mechanisms (inflation-halves-cash, flour-shock …) and math/fifty-up-fifty-down (percent changes; a prerequisite idea). Nearest History brief: 7 wages-bought-more-wheat (same file; wages over price).
- Boundary: economics owns inflation (prerequisite).
- Curriculum: primary `history:wheat-price-swings`; prerequisites `history:real-wages-playfair`; also `economics:inflation`.
- Transfer recall (section 27): "A price is 10 in one year and 10 again 200 years later. What can you say about the years between?" A) Nothing, without the readings between / B) It stayed near 10 / C) It must have risen and fallen (answer: A).

### 28. ages-ending-in-zero · concept: age-heaping-breslau · core · demand 2
- Format: Single card (deaths by single year of age, 20-99; presets)
- Strand: population-economy. Review route: standard.
- Learner knows: old records are imperfect. / does not know: that the imperfection leaves a fingerprint: far too many deaths at ages ending in 0.
- Misconception: Ages in old records were exact, so a spike at one age means more people died at it.
- Prediction (22 words): "Breslau recorded 2,695 deaths at 20 or older. With exact ages, about 1 in 10 would end in 0. What share did?" options: A) About 10% / B) About 20% / C) About 40% (answer: B). Check section 28: 2,695 deaths at 20-99; 490 at ages ending in 0 (18.2%); with neighbours' means 8.9%; age 40: 104 against 29-38; ending in 5: 13.4%; children's ages show little heaping.
- What the stage shows: bars for ages 20-99 (ages ending in 0 outlined), a readout "{s}% at ages ending in 0". Preset buttons in DOM order: "Ages ending in 0" (milestone `zero`), "Age 40 and its neighbours" (milestone `forty`), "Ages ending in 5", "Children's ages" (ages 1-19 for contrast). Reveal unlocks after `zero` and `forty`.
- Labels: age axis every 10 years at 11 px; readout 12 px; bars at least 3 px wide. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (73 words by script): "18% of the 2,695 deaths at 20 or older were recorded at ages ending in 0, about twice what exact ages would give. Age 40 had 104 deaths, against 29 to 38 at the ages just beside it. Many adults' ages were rounded when they were written down. Where it stops: the record cannot say who rounded, the family or the clerk, and any life table built from these counts inherits the rounding."
- Claims:
  - Data: (1) deaths by age, Breslau 1687-1691 (history-data.mjs: breslau, column total). (2) Bellhouse (2011) "made a point of the over-representation of deaths in quinquennial years" (Breslau doc, opened).
  - Derivation: (3) 18%, the neighbour-based expectation, age 40.
  - Source, held: none. "Ages were rounded when written down" is the reading the doc gives; the fact-checker may cut "when they were written down".
- Duplicate search (terms): age heaping, rounded ages, ages ending, digit preference, rounding: 12 hits, all on rounding of numbers (cs floating point, Life Hacks); none on ages. 0 briefs.
- Boundary: probability owns measurement error and rounding; this lesson shows the record.
- Curriculum: primary `history:age-heaping-breslau`; prerequisites none; also `history:life-expectancy-vs-lifespan`.
- Transfer recall (section 28): "A survey asks people their weight. Far more answers end in 0 than in 7. What most likely happened?" A) People weigh round numbers / B) The answers were rounded / C) The scale was broken (answer: B).

### 29. annuity-cheaper-when-old · concept: halley-annuity-price · core · demand 1
- Format: Single card (annuity value by age, a labelled interest model on the real table; presets)
- Strand: population-economy. Review route: standard.
- Learner knows: a pension pays until you die. / does not know: that a fair price for one falls steeply with age, and what Halley's table says it was worth.
- Misconception: A life pension of the same yearly amount is worth the same whoever buys it.
- Prediction (22 words): "On Halley's Breslau table, at 6% interest, £1 a year for life is worth 13.4 years' payments at age 10. At 60?" options: A) About 13.4, the same / B) About 7.5 / C) About 3 (answer: B). Check section 29: at 6%, age 10 13.44, age 60 7.46, age 70 4.97 years' payments; at 4%, 17.8 and 8.5.
- What the stage shows: a curve of value against age (1-80), labelled "our model: 6% interest on Halley's survivors", with a readout "age {a}: worth {v} years' payments". Preset buttons in DOM order: "Age 10" (milestone `a10`), "Age 60" (milestone `a60`), "Age 70", "At 4% interest" (the model's rate changes; label updates), "Every age". Reveal unlocks after `a60`.
- Labels: axes 11 px; readout 12 px; the model label 10 px minimum. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (74 words by script): "At 6% interest, Halley's table makes £1 a year for life worth 13.4 years' payments to a 10-year-old, 7.5 to a 60-year-old and 5.0 at 70. An older buyer can expect fewer payments, so a fair price falls with age, and one price for everyone is a bargain for the young. Where it stops: the 6% rate is our assumption, not the record's, and the table rests on one city's deaths over five years."
- Claims:
  - Data: (1) survivors by age (history-data.mjs: halley). (2) Halley's 1693 paper was titled "… with an attempt to ascertain the price of annuities upon lives" (Breslau doc reference, opened).
  - Derivation: (3) value = sum over years of (survivors at x+t / survivors at x) / 1.06^t, payments at year ends, stopping at 84; the 4% case.
  - Source, held: none. The interest rate is our labelled assumption, not a claim about what Halley used.
- Duplicate search (terms): annuit, pension, present value, life table: 0 lessons, 0 briefs. Nearest: brief 1 (same table; life expectancy, not price).
- Boundary: economics owns present value (`economics:present-value`, prerequisite).
- Curriculum: primary `history:halley-annuity-price`; prerequisites `history:life-expectancy-vs-lifespan`, `economics:present-value`.
- Transfer recall (section 29): "Two people buy a pension paying the same yearly amount for life. One is 30, one is 70. How should the fair prices compare?" A) Equal / B) Higher for the 30-year-old / C) Higher for the 70-year-old (answer: B).

### 30. exports-stalled-after-1872 · concept: trade-boom-1855-1899 · intro · demand 1
- Format: Single card (one line, 45 yearly values; presets)
- Strand: population-economy. Review route: standard.
- Learner knows: Victorian Britain's trade boomed. / does not know: that the export value grew 2.7 times by 1872 and then stalled: 1899 was worth the same as 1872.
- Misconception: Victorian exports grew steadily through the late 1800s.
- Prediction (20 words): "British and Irish exports were worth £96 million in 1855 and £256 million in 1872. About how much in 1899?" options: A) About £250 million / B) About £400 million / C) About £600 million (answer: A). Check section 30: 1855 95.7 → 1872 256.3 (×2.68); 1899 255.4 (×0.996); above 1872 only in 1890; 22 of 44 steps fall.
- What the stage shows: one line, millions of pounds, 1855-1899, with a dashed line at the 1872 value once its preset is pressed. Preset buttons in DOM order: "1855 to 1872" (milestone `rise`), "1872 to 1899" (milestone `flat`), "Back above 1872" (marks 1890), "Years that fell" (marks 22 falling steps). Reveal unlocks after `rise` and `flat`.
- Labels: axes 11 px; readout 12 px. Every meaning-carrying label at least 10 px at 390 px wide.
- Reveal (70 words by script): "Exports grew 2.7 times from 1855 to 1872, then were worth about the same in 1899, £255 million against £256 million. They fell in 22 of the 44 year-to-year steps, and passed the 1872 value only in 1890. A series can grow fast, then stall for a generation. Where it stops: these are values in pounds of the day, not quantities shipped, and they were read off Bowley's printed graph."
- Claims:
  - Data: (1) total value of British and Irish exports, millions of pounds, 1855-1899 (history-data.mjs: bowley; "digitized from Bowley's graph", doc).
  - Derivation: (2) ×2.7, ×1.0, 1890, 22 of 44.
  - Source, held: none. Not used: falling prices after 1873 (so volumes may have kept rising). If a builder adds it, it is held (a price index is not pinned) and cut if not checkable.
- Duplicate search (terms): export, trade value, trade, stall: 10 hits (economics comparative advantage, Life Hacks 'trade-off'); none on the historical record. Books trade-the-issues is unrelated.
- Boundary: economics owns inflation and price indices (prerequisite). This merges trade-values-bowley (the same series).
- Curriculum: primary `history:trade-boom-1855-1899`; prerequisites `economics:inflation`; also `history:trade-values-bowley` (merged).
- Transfer recall (section 30): "Sales grew 2.7 times in 17 years, then not at all in the next 27. Does 'sales grew 2.7 times in 44 years' describe it?" A) No: all of the growth came in the first 17 years / B) Yes / C) Only if prices fell (answer: A).

## The rest of the ranking, after the W-742 re-check (was "Next 88", ranks 13-100)
The order rule is unchanged: tier, then demand (an estimate), then pinned before opened, then intro before core. cm-history owns it. **What happened to the 33 tier-1 concepts:**
- **Briefed (18):** child-mortality-decline (#13), life-expectancy-century-gain (#14), world-population-doubling (#15), sex-ratio-at-baptism (#16), coal-then-oil-co2 (#17), roman-italy-income became the new concept italy-long-decline (#18), earthquake-deaths-record (#19), cholera-1849-elevation (#20), plague-recurrence-london (#21), cholera-1849-daily (#22), guerry-literacy-map (#23), guerry-crime-vs-instruction (#24), us-old-age-share (#25), clerical-work-rise (#26), wheat-price-swings (#27), age-heaping-breslau (#28), halley-annuity-price (#29), trade-boom-1855-1899 (#30).
- **Merged into another brief, because they are not a separate idea (6):** us-overtakes-britain-co2 into #9 (its 1900 preset already shows the US ahead), volcano-deaths-record into #19 (one year dominating a small record; also #11's 1931), oldmaps-north-error into #10 (the north-south error is the small side of #10's comparison), trade-values-bowley into #30 (the same 45 values), thematic-maps-guerry into #23 (the same map), cholera-and-diarrhoea-1849 into #22 (its "Diarrhoea, same year" preset).
- **Re-classed as sensitive and held for W-626 (4)**, by the charter's own classes and for consistency with concepts already held: population-share-asia-1820 (population by country, like fertility-decline-record), border-precision-over-time (borders, like border-precision), flow-map-minard (war: the same campaign as brief 5), playfair-national-debt (war: the debt jumps in the war years Playfair's chart marks, like bread-price-1770-1824). Added to tier 3 below.
- **Moved to tier 2, needing a neighbour's agreement (2):** child-deaths-then-births-fall (cm-big-ideas: one country's transition, which the boundary table reserves until Big Ideas agrees; also sensitive, population by country) and polio-observed-vs-randomized (cm-probability: observed against randomised controls is `probability:control-groups` and `random-assignment`).
- **Not briefable on the data opened, so added to the W-583 list (3, plus one part of a fourth):** vanished-jobs (jobs.json's harmonised codes drop to 0 for some jobs, such as Blacksmith and Tailor by 1980-2000 and Teamster in 1900, so "vanished" cannot be told from recoding without IPUMS's OCC1950 notes); energy-transitions (OWID energy has world shares only from 1965); edgeworth-county-deaths (the doc says rates per 1,000, but the values are about 175, so the unit needs Stigler 1999 Table 5.2 or Edgeworth 1885); and the year-1 part of roman-italy-income (the Maddison README names no Italian source for year 1).

**Tier 2: data opened, but a neighbour category must agree first (6; not briefed)**
- `population-projection-vs-record` · population-economy · intro · demand 2 · needs **cm-books** (Books fact-straight-line owns the straight-line instinct and the projection)
- `demographic-record-real-country` · population-economy · core · demand 2 · needs **cm-big-ideas** (Big Ideas owns the demographic-transition mechanism; also sensitive: population by country)
- `broad-street-already-falling` · events-data · core · demand 2 · needs **cm-big-ideas** (Big Ideas owns germ theory and Snow, germ-theory-pump; the handoff of Snow's tables is theirs to accept or decline)
- `polio-trial-1954` · events-data · core · demand 1 · needs **cm-probability** (probability owns control groups; brief only with a different question)
- added by W-742: `child-deaths-then-births-fall` · population-economy · core · demand 2 · needs **cm-big-ideas** (also sensitive: population by country)
- added by W-742: `polio-observed-vs-randomized` · events-data · core · demand 1 · needs **cm-probability** (control groups, random assignment)

**Tier 3: data opened, sensitive class. Review route: sensitive for every concept below (W-889): research-lead note, then cultural-reviewer culture-en-brief before build and culture-en before publish. Tranche 2 (founder F-16): none is briefed until all four conditions in the W-889 section hold.**

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

Added to tier 3 by W-742 (re-classed from tier 1): `population-share-asia-1820` (population by country) · `border-precision-over-time` (borders) · `flow-map-minard` (war) · `playfair-national-debt` (war; HistData Playfair1824 opened 2026-10-14, not pinned). Tier 3 is now 38 concepts.

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

Added to the W-583 list by W-742 (data opened, but not usable as it stands): `vanished-jobs` (needs IPUMS OCC1950 coding notes) · `energy-transitions` (needs a pre-1965 world energy series) · `edgeworth-county-deaths` (needs the unit confirmed) · `roman-italy-income`, year-1 value only (needs the Italian source; the 1450-1800 decline is brief 18).

**Beyond 100 (not ranked; all tier 4, no data opened):** `roman-road-network`, `map-centre-in-history`, `vaccination-adoption-record`, `silk-roads-distances`, `antarctic-claims-map`, `capital-cities-moved`, `price-of-light-history`, `ptolemy-coordinates`, `portolan-chart-accuracy`, `epidemic-vs-war-deaths`, `heights-as-history`, `langren-versions`, `minard-cities-route`
