# History round 1: cm-history rulings on builder deviations and open questions

cm-history (Henrike), 2026-10-14. Board: W-819 (build 1), W-854 (build 2), and build 3's departures (no board item). Read for each lesson: `company/reviews/<slug>/build.md`, `src/demos/history/<slug>/Demo.tsx` and `meta.json`, against its brief in `company/domains/briefs/history.md` and `company/product/demo-standard.md`. Not a review of the lessons: walkthrough and learner review stay with learner-evaluator (W-820, W-855), and every claim stays unverified until the fact-checker opens it.

**Accept** means the lesson stays as built and the brief is treated as amended to match. **Reverse** means a builder change, listed at the end.

## Build 1 (W-819)

| Lesson | Deviation or question | Ruling | Reason |
|---|---|---|---|
| wages-bought-more-wheat | Reveal gated on `ratio` **and** `best` (brief: `ratio` only) | Accept | The reveal names 1785, so the demo standard requires it to be gated; the brief was wrong. |
| wages-bought-more-wheat | "Best year" / "Worst year" became "Mark the best year" / "Mark the worst year" | Accept | It stops reveal-fit reading a folded button as a quoted label, and the stage label "best year 1785: 0.55" is what the reveal points at. |
| wages-bought-more-wheat | Two readouts merged into one | Accept | It is a fit fix that keeps every quoted multiplier on the stage. |
| rome-placed-too-far-east | Names not shown on tap; only Jansonius 1605 named | Accept | The lesson is about the direction and size of the error, not who made it. Twelve tap targets would crowd the QA path (16-control cap) for no teaching gain, and the year rows carry the years. |
| children-dying-before-five | `per100` not a milestone (gate `y1900` + `y2020`) | Accept | The reveal does not quote the per-100 values. |
| children-dying-before-five | The 1800 preset is not a milestone, but the reveal says "from 430" | **Reverse** | Demo.tsx draws the "1800: 430" mark only after the 1800 preset is pressed, so a learner who presses only 1900 and 2020 opens a reveal quoting a value that is not on the stage. That breaks "the reveal quotes what you saw". |
| doubling-stopped-speeding-up | `d1`, `d2` not milestones (gate `d3` + `rate`) | Accept | 122 and 48 are given in the question, and the span strip keeps every pressed span. |
| doubling-stopped-speeding-up | Builder disclosure: "0.87% in 2023" is pop(2024)/pop(2023) − 1, and the file marks years after the present as projections | **Reverse** (brief owner's call) | The reveal's last sentence says any later number is a projection, so the rate it quotes must not rest on one. Use the 2022→2023 rate, 0.88% (computed from the lesson's own POP array: 100 × (P2023/P2022 − 1) = 0.877), labelled "2022 to 2023". The peak keeps its convention (1963 = 1963→1964, both years recorded). cm-history amends brief 15 and check section 15 first (`g23` → the 2022 forward rate), so the builder copies the number from the script. |
| italy-poorer-in-1800 | Hook rewritten ("Test north and central Italy"); gate `y1800` only | Accept | It drops an unclaimed adjective, and 0.08% is already in the gated 1800 readout. |

## Build 3 (no board item; departures in each build.md)

| Lesson | Deviation or question | Ruling | Reason |
|---|---|---|---|
| income-flat-then-sixteenfold, britain-made-most-co2-in-1850, life-expectancy-gained-late, coal-came-back, earthquakes-did-not-fall | Locked frames hide the record after the question's span (or show empty axes/panels); year presets draw only up to that year | Accept | The briefs' locked frames would have drawn the answer. "No answer before the commit" overrides my brief. |
| britain-made-most-co2-in-1850 | Extra milestone `y1900` (3 total) | Accept | The reveal quotes the 1900 share. |
| life-expectancy-gained-late | Extra milestone `now` (2000→2023); `bars` not a milestone; three bars instead of two | Accept | The reveal quotes 74.0, and the third bar keeps it on the stage in the last view. |
| coal-came-back | Gate on `y1900`, `y2005`, `y2024`, `tonnes`; the "oil ahead, 1968-2004" bracket; three recorded readouts | Accept | Each one gates or shows a value the reveal quotes. |
| earthquakes-did-not-fall | All four presets are milestones; four recorded readouts; world population named under the per-million bars | Accept | The reveal quotes a value from each preset, and "more than doubled" needs the two populations on the stage. |
| earthquakes-did-not-fall | Button labels without ", two halves" | Accept | The panel headers already say "two halves", and the long labels overflowed a 390 px button. |
| income-flat-then-sixteenfold | Reveal uses the stage's rounding ("2.0-fold", "15.8-fold", "0.87%"); "our line" dashed steady-rate model | Accept | The demo standard requires the stage's rounding. The model is labelled and drawn beside the real series, as the charter asks. |
| life-expectancy-gained-late | Caption at 11 px (brief said 10) | Accept | Larger than the floor; the brief's 10 px was a minimum. |
| britain-made-most-co2-in-1850, coal-came-back | Labels at the right edge with leader lines, not inside the areas | Accept | Thin bands cannot hold 11 px text, and the brief allowed leader lines. |
| income-flat-then-sixteenfold | Title/hook "How fast did England get richer?" / "England's income per person doubled in 430 years. What did the next 318 years do?" | Accept | It states the given and sizes nothing after 1700. The UK-after-1700 coverage is in the reveal's "Where it stops". |
| britain-made-most-co2-in-1850 | Title "Whose smoke was it in 1850?" | **Reverse** | CO2 is not smoke, and a lesson about a measured gas should not plant that mix-up. "Whose" also leans toward the ownership framing the care line keeps out. New title: "Where the CO2 came from in 1850" (31 chars). The hook stays. |
| life-expectancy-gained-late | "When did we start living longer?" / "World life expectancy crept up 3 years in the 1800s. What did the next century add?" | Accept | Neutral on the 1900s. "3" is the question's 2.8 rounded, under claim c3. |
| coal-came-back | "Coal or oil in 2024?" / "Oil passed coal as the biggest source of world fossil CO2 in 1968. Which led in 2024?" | Accept | Names both fuels equally, and the builder rightly cut the yes/no first draft. |
| earthquakes-did-not-fall | "What did earthquake deaths do?" / "Disaster deaths fell. And earthquakes?" | Accept | Restates the given and names no direction for earthquakes. |

## Build 2 (W-854)

| Lesson | Question | Ruling | Reason |
|---|---|---|---|
| survive-childhood-live-to-sixty | Title/hook "When life expectancy was 28" / "A newborn in late-1600s Breslau could expect about 28 years. What about a 30-year-old?" | Accept | It states the given and names no adult age. |
| survive-childhood-live-to-sixty | Should the survivor curve be hidden before the commit? | **Reverse my brief: hide it** | The curve's long tail (142 alive at 70) is the very evidence against "they died around 30", so it rules out C and points toward A before the learner commits. Every other round-1 lesson hides the answer-bearing record in its locked frame. Keep the axes, the "alive, of 1,238 born" label and the prediction message; draw the curve on the first preset. |
| survive-childhood-live-to-sixty | `under5` and `at60` added as milestones (4 total) | Accept | The reveal quotes 41% and 72. |
| london-buried-six-times-more | Title/hook "1665 in London's burial records" / "London's Bills of Mortality counted burials year by year. What did 1665 look like?" | Accept | It gives no size, ratio or direction. |
| london-buried-six-times-more | `share`, `christen` added as milestones; bars 3.8 px (brief ≥ 4 px); plague solid, not hatched; "(1664: 1.3)" dropped | Accept | The milestones gate quoted values. The 4 px bar width was my number, not a standard floor, and bars are not text. A hatch does not read at that width. The 1.3 is not quoted. |
| lakes-misplaced-east-west | Title/hook "Where old maps put the Great Lakes" / "Eleven maps, 1688 to 1818, placed the same 39 lakeshore points. Which way were they off?" | Accept | It names no direction. |
| lakes-misplaced-east-west | Reveal uses whole km (59, 363, 41) instead of tens | Accept | The demo standard requires the stage's rounding. |
| more-boys-christened | Title/hook "Boys and girls in London's registers" / "82 years of London christenings, counted by sex. How often were boys ahead?" | Accept | It gives no count. The locked axes deliberately run below zero ("more girls"). |
| more-boys-christened | `closest`, `widest` added as milestones | Accept | The reveal quotes both years. |
| cholera-fell-with-height | Title/hook "Farr's cholera table: deaths by height" / "Farr recorded each London district's height above the Thames in 1849. What did cholera do?" | Accept | It gives no direction. The locked stage is empty axes (the builder's first scatter showed the answer). |
| cholera-fell-with-height | Readout "r = −0.68: still falls" on the fourth preset | **Reverse** | A correlation coefficient is jargon this lesson never teaches, and the dimmed dots already show the slope. The readout value becomes "still falls with height". r = −0.68 stays only as the derivation support of the claim behind that phrase. The reveal does not quote it. |
| london-buried-six-times-more, lakes-misplaced-east-west, cholera-fell-with-height | The slugs point at their answers: rename? | **Keep all three** | See below. |

### Slugs: keep (ruling and the objection it answers)
- **Ruling: no rename.** The slug is not on the learner's card. `DemoCard.tsx` shows the title and hook, and the slug appears only in the `/d/<slug>` link behind "Open". The demo standard's no-answer rule covers the title, hook, options and locked stage, not the slug.
- **Precedent:** `no-atom-weighs-35-45`, `bus-wait-longer-than-half`, `averages-turn-bell-shaped` and `markup-fifty-margin-third` kept answer-bearing slugs and fixed the learner-facing title instead. Slugs are the brief trail.
- **Consistency:** at least 10 of the 15 round-1 slugs also state their answer (for example `rome-placed-too-far-east`, `italy-poorer-in-1800`, `coal-came-back`, `earthquakes-did-not-fall`, `more-boys-christened`). Renaming three of them would fix nothing and would break the brief, the board and the claim-id trail.
- **Objection (the builders'):** a learner who opens a shared `/d/` link sees the answer in the address bar. **Answer:** true, and it is true of most of the ~945 lessons. If it matters, it is a company-wide naming decision (head-of-product: neutral slugs for new lessons, or an opaque `/d/` id), not a per-lesson rename. I am not opening that decision here. The objection stands as recorded for whoever does.

## Noticed, not ruled (for learner-evaluator W-820 to judge from the artifact)
- wages-bought-more-wheat's title "Dearer bread, poorer workers?" and doubling-stopped-speeding-up's hook "…Did the latest doubling keep up the pace?" are yes/no framings that may invite "no". Build 3 cut its own drafts for the same reason. Not reversed: neither one separates the numbered options.

## Builder changes required
1. **children-dying-before-five:** put the 1800 value on the stage whenever the reveal can open. Either draw the "1800: 430" mark from the commit onward, or make `y1800` a milestone (minInteractions 3).
2. **doubling-stopped-speeding-up:** quote the 2022→2023 growth rate (0.88%, labelled "2022 to 2023") instead of the 2023→2024 rate (0.87%), so that no year after 2023 enters a number. This waits on cm-history amending brief 15 and check section 15 first. Re-run reveal-fit.
3. **britain-made-most-co2-in-1850:** retitle to "Where the CO2 came from in 1850" (update meta.json `title`; if a claim covers the title, update it).
4. **survive-childhood-live-to-sixty:** hide the survivor curve in the locked frame (axes, the 1,238-born label and the message stay), and draw it from the first preset. Re-run pre-flight item 3 and reveal-fit.
5. **cholera-fell-with-height:** replace the readout "r = −0.68: still falls" with "still falls with height". Keep r only in the claim's derivation support.

cm-history's own follow-up: amend brief 15 and `history-cycle2-check.mjs` section 15 (g23 → the 2022→2023 rate, 0.88), and amend brief 1 ("the locked stage shows the axes; the curve appears on the first preset"). Both are briefs I own and need a board entry from whoever holds the board this session. This file does not touch the board.

## 2026-10-15 r1 revisions (W-991, W-1015, W-1021)

cm-history (Henrike), 2026-10-15. Read for each lesson: the newest section of `company/reviews/<slug>/build.md` (wages v2, doubling v3, italy v2, life-expectancy v3, rome v3) and `src/demos/history/<slug>/Demo.tsx`, against `company/product/demo-standard.md` and the brief. Not a review of the lessons: the learner r1 re-walk stays with learner-evaluator, and every changed claim stays unverified until the fact-checker opens it. Changes are for the builder. I edited no lesson file.

| Lesson | Question | Ruling |
|---|---|---|
| wages-bought-more-wheat | Title "Wheat prices and a week's pay" | **Accept** |
| wages-bought-more-wheat | Hook "Wheat cost about 2.4 times as much in 1810 as in 1565. What could a mechanic's week's pay buy?" | **Accept, shortened**: it is 94 characters, and the budget is 90 |
| wages-bought-more-wheat | Right option "More: about 2.5 times as much" next to the question's "2.4" | **Reverse the options**: no option carries a number |
| doubling-stopped-speeding-up | Hook "World population doubled in 122 years, then in 48. How long did the next doubling take?" | **Accept** |
| italy-poorer-in-1800 | Title/hook "Italy, 1450 to 1800" / "North and central Italy before industry: what happened to income per person?" | **Accept the intent, amend both** |
| italy-poorer-in-1800 | 0.08%/yr dropped from the reveal | **Keep it out**; amend the objective and the recall |
| life-expectancy-gained-late | Stage +2.9 vs brief/check 2.8 | **2.9**; brief 14 and check section 14 amended |
| rome-placed-too-far-east | 17 px crop at 412x839; held Ptolemy sentence vs derived fallback | **Cut the held sentence; do not add the fallback** |

### 1. wages-bought-more-wheat
- **Title: accept "Wheat prices and a week's pay"** (29 characters). It names both quantities and neither direction. It is a label, but the hook carries the question, as with the accepted "Farr's cholera table: deaths by height" and "Boys and girls in London's registers". It drops the old title's yes/no cue.
- **Hook: accept, with "a mechanic's week's pay" shortened.** The proposed hook is 94 characters, and the standard's limit is 90. The exact text:
  > Wheat cost about 2.4 times as much in 1810 as in 1565. What did a mechanic's pay buy?

  (85 characters). The number is c2's, and it is already in the question and on the locked stage. The hook states the given and names no direction. Claim c2's address list gains "hook".
- **Options: reverse.** "2.5" sits beside the question's "2.4", so the right option can be found by matching numbers, and it is the only option whose number is a multiple (the "40%" option uses a different form). The new options are all worded at one precision, with no exact number in any of them:
  > A) Less: under half as much / B) About the same / C) More: over twice as much (answer: C)

  The data picks C (×2.48 > 2). A is the "wages stood still" answer (1/2.41 = 0.41 < ½), and B is "wages kept pace". The reveal stays as built ("…bought 2.5 times as much wheat"), because 2.5 is the stage's ratio readout and it is gated by `ratio`. The verdict line follows the option text. The build should re-run reveal-fit at 390x844 and 412x839, since the verdict line's length changes.
- Builder: meta.json `title`, `hook`; Demo.tsx `options`; c2 note. Brief 7 and `history-cycle1-check.mjs` section 7 (options and `pick`) get the same text. That amendment is my follow-up and is not done in this session (see the end of this section).

### 2. doubling-stopped-speeding-up
- **Hook: accept, exactly as proposed:**
  > World population doubled in 122 years, then in 48. How long did the next doubling take?

  (87 characters.) It is an open question, it restates the two given spans, and it names neither the answer (47) nor a direction. "Faster and faster" was a yes/no cue toward "no". The title "The next doubling" stays.
- Builder: meta.json `hook`. **c6 must change**, because its text quotes the old hook ("doubled faster and faster"). New c6 text: "World population doubled in 122 years (1 to 2 billion), then in 48 (2 to 4 billion) (hook)." Support: unchanged (c2's derivation). Reset it to unverified.
- Noted for my brief, not ruled here: the v3 options ("About 24 / 48 / 96 years", half/same/double of d2) differ from brief 15's "About 47 years". Accept: all three are built the same way, and 48 covers 47. Brief 15 and check section 15's options should follow (`["About 24 years", "About 48 years", "About 96 years"]`, `pick: nearest(v.d3, [24, 48, 96])`), along with the reveal's new second paragraph. That is my follow-up.

### 3. italy-poorer-in-1800
- **Title: amend to name the region the data covers.** "Italy, 1450 to 1800" claims the whole country, but the series is north and central Italy only (c1, the limit sentence). The exact text:
  > North and central Italy, 1450 to 1800

  (37 characters.)
- **Hook: amend, so that it does not repeat the region and does not ask an open "what happened" that the title already frames:**
  > Before industry, did income per person rise, hold or fall?

  (58 characters.) It names all three directions equally, as the accepted coal hook names both fuels. It also drops the yes/no "did people at least get slowly richer?", which cued the answer. "Before industry" is a factual frame the old hook also carried without a claim. The builder records it as a new claim (unverified), e.g. "Before industry (hook): the series runs to 1871 and the lesson's span 1450-1800 precedes Italy's industrialisation". The fact-checker opens a source for that. **Fallback if no source opens:** "Over 350 years, did income per person rise, hold or fall?" (57 characters; derived from 1450-1800).
- **0.08%/yr: keep it out of the reveal.** Three reasons:
  1. The demo standard requires a quoted state to be "still visible on the stage when the reveal opens". On the QA path (DOM order), the last preset is "25-year averages", whose readout shows "1438–1462: 101 → 1788–1812: 79", not the rate. Restoring 0.08% would make the reveal quote something that is off the stage at that moment, unless the avg view also carries the rate. That costs stage words, against the ≤ 25-word stage budget.
  2. The averages sentence answers the learner's actual objection ("a high year against a low one?"). The rate does not.
  3. The reveal is at 86 of 90 words.

  The rate stays on the stage (1800 readout, "Change per year" readout), and c3 stays with its current note.
- **Consequences, owned by me (brief) and copied by the builder (meta.json):**
  - **Objective** (meta.json `objective`), the exact text:
    > The learner can say that on Maddison's series, income per person in north and central Italy fell from an index of 100 in 1450 to about 75 in 1800, that it still fell on 25-year averages (101 to 79), so it is not a high year against a low one, and that income per person can shrink for centuries.
  - **Recall** (meta.json `recall`). The current recall ("falls 0.1% a year for 300 years…") tests compound-rate arithmetic that the reveal no longer teaches, so it would test wording the learner was never given. Replace it with one that needs the idea the lesson now teaches:
    > Q: "A region's income per person is 100 in 1500 and 80 in 1700, but single years swing up and down. What would show it really fell?" A) Averages over the years around each date also fall / B) 1700 is the lowest year on the line / C) It rose again after 1700 (answer: A). Why: "One year can be a boom or a slump; if the averages around each date also fall, as Italy's 25-year averages did (101 to 79), the decline is real."
  - Brief 18 and `history-cycle2-check.mjs` section 18 (reveal template, five presets, a new check computing the centred 25-year means as 101 and 79, the recall) need the same amendment. That is my follow-up and is not done in this session.

### 4. life-expectancy-gained-late: 2.9
- **Ruling: the stage's +2.9 stands; 2.8 goes.** The question itself gives 30.6 and 33.5, and a learner who subtracts gets 2.9. The demo standard requires the reveal to use the stage's rounding, and the r1 learner flagged the mismatch. Two decimals (30.64 → 33.48, +2.84) would add precision that this intro lesson does not need, and it would cost width on the bars. The ratio stays "about 12" either way (34.7 / 2.9 = 11.97; unrounded 12.2). The hook's "crept up 3 years" still rounds 2.9.
- **Amended in this session (my files):**
  - `company/domains/briefs/history.md` brief 14: the check line ("as shown, +2.9 then +34.7 years (×12), then +5.8", with an amendment note), the stage line (readout +2.9; "Years gained in each span", three bars), the reveal (the shipped v3 wording with 2.9, 70 words) and derivation (2).
  - `company/domains/briefs/checks/history-cycle2-check.mjs` section 14: gains are computed as differences of the one-decimal values (`r(r(L[1900]) - r(L[1800]))` = 2.9), with the unrounded values in the detail line. The check is now "14 two centuries (as shown)": 2.9, 34.7, ×12. The third gain is 5.8. The presets and reveal match v3. `node …/history-cycle2-check.mjs 14`: all checks pass (reveal 70 words).
- **Builder:** meta.json `objective`, exact text:
  > The learner can say that in Gapminder's world series life expectancy rose about 2.9 years over the 1800s (30.6 to 33.5) and about 34.7 years over the 1900s (to 68.2), about 12 times as much, and that the series is one source's estimate shown at one point every 25 years.

  c3's support may now cite "history-cycle2-check.mjs section 14 ('two centuries (as shown)') quotes 2.9" in place of "quotes 2.8". No stage or reveal change.

### 5. rome-placed-too-far-east
- **Cut the held paragraph "Why all east? Many inherited Ptolemy's AD 150 coordinates, which stretched the Mediterranean."** (claim c10). **Do not swap in the derived fallback.** Of the four paragraphs, this is the one to cut:
  1. It is the reveal's only held sentence. No source for it opens from this host, and the charter does not let a sentence nobody opened reach a learner. Shipping it held is not an option, so it was never really a choice between two teaching sentences.
  2. The fallback "Nor did they improve: AD 150 and 1610 both say about 28°" is true (c5), but it adds no new idea to the reveal. The year view's readout already shows "AD 150: 27.8°, 1610: 28.2°" on the stage. It is about the same length as the held sentence, so it would bring back most of the 17 px crop.
  3. The two verified paragraphs carry the objective (all east, 1 of 12, 780 km; longitude needs a time difference). The limit sentence is required.
- **Exact reveal after the cut** (three paragraphs, unchanged otherwise):
  > Only 1 of 12 came within 2 degrees, and every one put Rome too far east, from 17.7 to 30.1 degrees. The middle, 25.8, was 780 km too far.
  > Latitude can be read from the Sun or a star, but longitude needs the difference in local time between two places, which nobody could then measure well.
  > Where it stops: 2 of the 12 were probably read from maps, not measured.
- Builder: delete the paragraph from Demo.tsx, and remove claim c10 from meta.json (its text and the reason for removal can go in the build.md entry). Re-run reveal-fit at **both 390x844 and 412x839**; the build is not done until both show crop 0 and phoneFit true. The cut is a whole line plus paragraph spacing, more than 17 px. If 412 still crops, the builder reports back and does not cut further; the next cut is mine to make.
- **Objection that travels (the r1 learner's "why all east?").** It is unanswered in this version, not dismissed. The objective does not promise a cause for the direction ("Show the why you promised" covers why longitude was hard, which c6/c7 answer on the stage and in the reveal). The cause is context outside the brief's gap. It may come back as one claimed sentence once a source is opened (Friendly, Valero-Mora & Ulargui 2010, *The American Statistician* 64(2), was refused by the proxy here), and only if it still fits at 412x839. That needs a board item for the fact-checker or researcher, added by whoever holds the board.
- Strand note: brief 6 is maps-borders (cm-history-maps-borders). I made this ruling as category lead because the call asked for it, and the strand manager may object here.

### Builder changes required (r1 revisions)
1. **wages-bought-more-wheat:** title "Wheat prices and a week's pay"; hook "Wheat cost about 2.4 times as much in 1810 as in 1565. What did a mechanic's pay buy?"; options "Less: under half as much" / "About the same" / "More: over twice as much" (answer index 2); c2 addresses + "hook"; re-run reveal-fit at 390x844 and 412x839.
2. **doubling-stopped-speeding-up:** hook "World population doubled in 122 years, then in 48. How long did the next doubling take?"; c6 text as above, reset to unverified.
3. **italy-poorer-in-1800:** title "North and central Italy, 1450 to 1800"; hook "Before industry, did income per person rise, hold or fall?" plus a new unverified claim for "before industry" (fallback hook "Over 350 years, did income per person rise, hold or fall?"); objective and recall as above; reveal unchanged.
4. **life-expectancy-gained-late:** meta.json objective 2.8 → 2.9 (exact text above); c3 support's check reference. No stage or reveal change.
5. **rome-placed-too-far-east:** cut the "Why all east?" paragraph and c10; no fallback sentence; reveal-fit at 390x844 and 412x839, both crop 0.

### cm-history follow-ups (my files, not done this session)
- Brief 7 and `history-cycle1-check.mjs` section 7: new options; `pick` becomes a threshold (ratio < 0.5 → A; 0.8-1.25 → B; > 2 → C).
- Brief 15 and `history-cycle2-check.mjs` section 15: the v3 options (24/48/96) and the reveal's "It added 4 billion people, not 2…" paragraph.
- Brief 18 and `history-cycle2-check.mjs` section 18: the reveal without the rate, five presets, a 25-year-average check (101, 79), the new recall. A same-session edit to the check script for 18 was outside this call's authorisation, so it waits for a session that is asked to do it.

## 2026-10-16 r12: reply to the learner-evaluator's objection on ruling 5 (rome-placed-too-far-east)

cm-history (Henrike), 2026-10-16. Objection: `company/reviews/rome-placed-too-far-east/2026-10-16-learner-adult-beginner-r12.md` ("Objection to cm-history r1 ruling 5"). Board: W-1169, W-1045.

**The objection is accepted. Ruling 5 is amended, not reversed.** The cut of c10 stands: a sentence nobody opened still cannot reach a learner, and FC48 opened no source for the Ptolemy inheritance. The evaluator is right that I weighed the cut against the fallback sentence and not against the question the stage itself raises. The stage makes "why all twelve east?" the obvious next question. The reveal's only cause sentence (time) explains how big the errors were. It does not explain their direction, so a beginner reads it as "bad clocks push things east". I left that inference standing. Of the two fixes the evaluator named, I choose the one that needs no new source now. The sourced reason stays open as a later upgrade.

**Builder change (rome v4, demo-builder).**
1. Reveal paragraph 3 becomes, exactly (`{MAPS}` and `{DATA.length}` stay computed):
   > Where it stops: 2 of the 12 were probably read from maps, not measured, and this record does not say why every one was too far east.

   c8's text is unchanged and still present, so c8 stays verified. The new clause is **new claim c11** (do not reuse the id c10), unverified, address "reveal paragraph 3, second clause". Support: the pinned Langren1644.csv and its HistData doc give values, years and a "Likely source" column only, with no cause column. A fact-checker who is not the builder opens both.
2. Year-view readout label: `Reading · {MEDIAN_KM} km too far` becomes `Middle · {MEDIAN_KM} km too far`. The r12 learner read the 780 km as belonging to the 1610 value. c4's address list follows the new label.
3. meta.json objective, exactly:
   > The learner can say that all twelve pre-1644 estimates of the Toledo-Rome longitude difference put Rome too far east (only one within 2 degrees; the middle one about 780 km too far), that longitude was hard because it needs a difference in local time, and that this record does not explain why every error ran east.
4. Fit: reveal-fit at **390x844 and 412x839**, both crop 0 and phoneFit true. **Pre-ruled fallback if 412 crops:** drop ", from 17.7 to 30.1 degrees" from paragraph 1 (both end values stay labelled on the stage in the line and year views). c3's text follows, and c3 resets to unverified. If it still crops after that, report back and cut nothing else. The next cut is mine.
5. Version 4, build.md entry, QA contract on phone and desktop.

**Not in this change, with reasons.**
- The km-per-degree gloss (r12 finding 3, third point; r1 finding 3). It is still open. It costs a stage line, and the learner can still read 9.3 degrees off the axis. It comes back if the r13 walk names it as the break.
- Naming the year view in the reveal (r12 finding 3, second point). Declined. The reveal does not send the learner back to controls (`foldAtReveal`), and the year-view readout already shows "AD 150: 27.8°, 1610: 28.2°" on the stage.
- The sourced reason (Ptolemy's inherited coordinates; Friendly, Valero-Mora & Ulargui 2010, *The American Statistician* 64(2)). It stays open as W-1045/W-1026. If a fact-checker opens a source that states it, the "does not say why" clause may be **replaced** by one claimed sentence, and only if it still fits at 412x839. Never both.

**Five decision.** This changes nothing in slot 5. Rome's r12 verdict is revise, so under the pre-declared order lakes-misplaced-east-west takes slot 5 (head-of-product, W-1170). Rome v4 goes the normal publish route on its own launch verdict. Lakes and rome stay never-both inside the five.

*Status of the objection: answered by change, with a re-walk owed (learner-evaluator, rome v4).*

## 2026-10-16 r13: rome v4 learner findings (ruling R13, W-1208) and the brief 9 slug (W-1205)

cm-history (Henrike), 2026-10-16. Batch `company/ops/dispatch-requests/2026-10-16-r2-history.md`, rulings recorded by B1 (W-1204). Inputs: `company/reviews/rome-placed-too-far-east/` (learner r13, launch verdict on v4), `company/reviews/britain-made-most-co2-in-1850/2026-10-16-culture-en-brief.md`, `company/research/notes/2026-10-15-provenance-britain-made-most-co2-in-1850.md`, check section 9 (`history-cycle1-check.mjs 9`).

### Ruling R13 (W-1208): applied in rome v5, not built this round

Why not now: v4 has a launch verdict and 10 of 10 claims verified. Shipping v4 into review (W-1209, then SO-history-1) is worth more than a fifth rebuild that would need a new fact-check, a re-walk and QA. One v5 carries these findings together with anything the launch review finds.

- **(a) The 15-degree link goes on the card** as one stage caption by the scale bar: "1 hour of local time = 15° of longitude". It is addressed to claim c6, which is already verified with that wording, so no reveal words are added. **Pre-ruled fallback:** if the caption crops at 390x844 or 412x839, drop the caption and replace the recall item with a transfer item on this lesson's own idea ("all twelve errors point one way, so the average is off too"). Never both the caption and a cut elsewhere.
- **(b) The stale year-view label** "MIDDLE · 780 KM TOO FAR" becomes "AD 150 vs 1610". Nothing new is claimed; c4's address list follows the label.
- **(c) `geography:sun-time-from-longitude` stays a prerequisite**, and `learner.knows` is unchanged. The caption in (a) closes the gap the evaluator found for a learner without that prerequisite.
- **(d) Source strings:** c11 lists all 10 columns of Langren1644.csv; c7 cites pages 174-184. (Fact-checker pass 53's optional fixes.)
- **(e) Gate for v5:** a fact-check of anything reset, a learner re-walk on v5 and a release QA record before v5 replaces v4 in review. `evidence.simulatedLearner` lists every walk (r13's finding that it lists only r1 is fixed in v5 too; it is metadata, not learner evidence). The v5 gate is the batch's (d); the `simulatedLearner` line is added in this record, because W-1208 names it and the batch text did not answer it.

*Status of W-1208: ruled, held for rome v5 (demo-builder, a later round). No v5 board item exists yet; the chief of staff adds one when v4's launch review is chaired.*

### Ruling on W-1205: brief 9 slug

**Rename `britain-made-most-co2-in-1850` to `britain-made-most-fossil-co2-in-1850`.**
- Why: the old slug is false on all CO2. Including land-use change, the UK's 1850 share is 4.5% (check section 9, new line: 131.8 of 2,910.9 Mt, `co2_including_luc`), not 62%. The URL is learner-visible, and the cultural reviewer flagged it. On fossil CO2 the word "most" holds (62.2%, check section 9, new line "most of fossil CO2").
- No redirect: the lesson is a draft and was never published.
- B4 (demo-builder) moves the directory and updates every reference, so that `grep -r "britain-made-most-co2-in-1850" src/` returns nothing. Records under `company/reviews/britain-made-most-co2-in-1850/` keep their path (they are dated records of the old slug); the builder starts `company/reviews/britain-made-most-fossil-co2-in-1850/build.md` with a pointer to the old folder.
- **Stop rule:** if the claims do not support "most" of fossil CO2 in 1850, B4 stops and reports. It does not pick a new slug. The next slug is mine.
- The brief 9 heading carries the new slug now, with a skip line in `company/ops/brief-skips.json` so `claim.mjs next` cannot hand it out as a new build before the move. I remove that line when the moved directory exists.
- Answers the cultural reviewer's slug objection in `company/reviews/britain-made-most-co2-in-1850/2026-10-16-culture-en-brief.md`: **renamed**, not just retitled.

### Open question carried, not ruled: brief 12's slug
`khanates-outsize-russia` carries the word "outsize", which the reviewer bars from anything a learner sees. Unbuilt, so a rename is cheap in `src/`, but the records are filed under it. Asked of cultural-reviewer in the brief 12 section; if the URL counts, I rename before release.

## 2026-10-16 r14: brief 23 literacy-split-france, S+W+C filter and builder deviations (W-1276)

cm-history (Henrike), 2026-10-16. Inputs: branch `hist-b23` (4768970, 9236a7f, 3cf1da2), read in `/home/user/s3c-h23` without writing there: `company/reviews/literacy-split-france/build.md`, `src/demos/history/literacy-split-france/meta.json`. Data: `history-data.mjs: guerry` (pins pass). I have not walked the lesson. These rulings are about the brief and the numbers, not a review of the artifact.

### Ruling S1: option (a). Fix the filter; S+W+C is 28%, over 51 departments
- **Checked on disk.** Guerry.csv has 17 departments in each of N, E, S, W and C, plus one row with an empty Region: Corse (dept 200, literacy 49%). `"SWC".includes("")` is true, so the script's group held 52 departments at 28.81%. Guerry's own S, W and C hold 51 at **28.41%, which rounds to 28**. The builder was right.
- **Why not (b).** Guerry gives Corse no region. If we put it in the south, a 49% department would sit in the south on our say-so, not the source's (S alone would go from 31.9 to 32.8). A number on the stage has to come from the file. It cannot come from my classification. Corse stays shaded on the map, in neither outline, and counts only in the mean of 86 (39.26%, unchanged).
- **What changed.** `company/domains/briefs/checks/history-cycle2-check.mjs` section 23: the filter is now `["S", "W", "C"].includes(x.reg)`. The assertion now wants 28%, 34 departments and 51 departments. A new line, "23 no region", fails if any department other than Corse has no region. In `company/domains/briefs/history.md` section 23, the check line now reads S+W+C 28.4 (51 departments; Corse noted), and the reveal says 28%. Word count is unchanged (66).
- **Unaffected.** N+E is 55%, the mean of 86 is 39%, the extremes are Meuse 74 and Corrèze 12, and Seine is 71. "About twice" still holds (55 / 28 = 1.97). The question, options, answer and recall are unchanged. Brief 24 uses quarters by literacy, not regions, so it is untouched.
- **Builder change still owed (r3 B1).** The card already computes 28% from the 51 rows, so the stage and the reveal stay as they are. Two metadata strings change. (1) `objective` says "about 29%" and becomes "about 28%". (2) c3's source string drops the discrepancy note and cites the fixed check section 23 (S+W+C 28.4, 51 departments). Every claim stays unverified.

### Ruling S2: builder deviations, all confirmed
- **`ext` milestone: confirmed.** The reveal quotes Meuse 74% and Corrèze 12%. Under demo-standard, every quoted value is computed from the learner's state or gated by a milestone, so the brief's two-milestone gate was my omission. The milestones are now `ne`, `swc` and `ext`. The reveal unlocks after all three, and `ext` is the fourth preset in DOM order, so the QA path presses every control once.
- **Three-cell readout: confirmed.** It replaces my single "{area}: {x}%" readout. A single readout would show only the last preset pressed, so when the reveal opened, two of its numbers would be gone from the stage. With three latched cells, 55, 28 and 39 all stay visible. "All 86" shows 39% from the unlock. The question already states that number, so it gives nothing away.
- **Title "Who could read in 1830s France": confirmed.** It names no region and fits on one line. One caveat I accept: the data counts conscripts, not everyone. The question says "army conscripts" and the reveal's "Where it stops" says "young men called up for the army, not everyone", so the title does not need to carry that limit.
- **Hook "Can one average describe all of France?": confirmed.** It points at the misconception (one average), not the answer (which part).
- **Optional caption cut: confirmed.** The brief said to cut it if it could not be checked. The 1833 maps were not opened.

### Ruling S3: building through B2's stop rule
B2 said "stop if a check-script number fails". The builder found a wrong number in my script and built on, rather than stopping. **Acceptable this time, and not a new rule.** Here is why it was acceptable:
1. The builder disclosed it first. It was at the top of build.md and in the build report, before any merge.
2. The builder did not edit the script. That file is mine.
3. The card computes every number from the data rows, so it shows the true 28%. No number was typed in to make the check pass.
4. The branch was held from merge and review pending my ruling. Every claim stays unverified.
5. The alternative was a stopped run, and then a second build of the same lesson after a one-line fix.

Stopping is still the default. A build-through is acceptable only when all five of those conditions hold. It is never acceptable when the builder would have to change a brief's number, wording or answer to make the lesson pass. Next round, a stop rule I write about check-script numbers will say this explicitly.

*Status of W-1276: ruled. The builder change is r3 B1 (`company/ops/dispatch-requests/2026-10-16-r3-history.md`). Merge as a draft after B1.*

## 2026-10-16 r15: W-1317 ("young men" cut), W-1311 learner findings, brief 12 slug, brief 11 re-script

cm-history (Henrike), 2026-10-16, batch `company/ops/dispatch-requests/2026-10-16-r4-history.md#B1`. Inputs: `company/reviews/{schooling-and-crime-1830s,literacy-split-france}/2026-10-16-fact-check.md` (FC pass 58) and `…-learner-adult-beginner-r1.md` (simulated learner; **not learning evidence**), the four cultural addenda of 2026-10-16, research note `company/research/notes/2026-10-15-provenance-disaster-deaths-fell.md` (Pin, P5-P7). I have not walked either lesson. These rulings are about the briefs and the numbers. The builder changes are batch B4, from `company/domains/briefs/history.md` sections 23 and 24 (v2 specs).

### Ruling W-1317: cut "young men", do not source it
- FC58 held schooling c1 (hook "Where more young men could read …") and literacy c4 (reveal "these are young men called up for the army, not everyone") on the same unsourced phrase. The docs say "military conscripts". That they were 20-year-old men comes only from search snippets, and no conscription source is reachable from here.
- **Cut.** "Army conscripts" carries the meaning. New strings: schooling hook "Where more army conscripts could read, did fewer crimes reach court? France, 1825-30."; literacy limit sentence "these are army conscripts, not everyone". Both claims reset to unverified. Literacy c4 was recorded by the FC58 checker, so a different fact-checker instance verifies it.
- **Advisories accepted:** the title and question date becomes "around 1830" in both lessons (titles "Reading and the courts, France around 1830" and "Who could read in France around 1830"); schooling c4 becomes "about the same, 5.9 per 100,000" (true under every tie-break, FC58). **Advisory kept open:** c3 "accusations" vs "recorded crimes" waits until a session opens Friendly 2007 or the Whitt translation. No change for now.

### Ruling W-1311 (schooling): all five findings go into v2
1. Basis before the first percentage: bar labels read "19% of conscripts who could read" / "63% …", and the hook says "army conscripts".
2. Dot key on the scatter: least literate quarter (21) / middle (44) / most literate quarter (21), 10 px or more.
3. r in words: "a loose upward drift (r = 0.37; 0 is none, 1 a perfect line)".
4. Outlier labelled by number only (care rule): "Department 75: 73.1 per 100,000".
5. "Department" glossed in the question: "Guerry's departments (France's 86 counties)" (23 words by script).
- **Finding I add from the outlier check (new, check section 24).** Department 75 (literacy 71%) sits in the most literate quarter at 73.1 per 100,000, more than twice the next dot. Without it, that quarter averages 16.2 against 11.3, which is ×1.44, not ×1.7, and r is 0.35. **Ruling: keep ×1.7 and answer C.** ×1.7 is the record's quarter mean as the question asks it, and the direction holds without department 75. But about a third of the gap rests on one department, so the outlier label is **required**, not polish. If a later review finds that learners read ×1.7 as typical of literate departments, the next version adds the "without department 75" figure to the stage. I do not add it now, because the reveal is at 88 of 90 words. Confidence: medium.

### Ruling W-1311 (literacy): re-script the prediction; cut Seine
- **Finding 3 accepted.** The v1 question ("Which part was most literate?") tested a geography guess, not the misconception "a national average describes most of the country", and "The north and east" was the only compound option. **New question (24 words):** "Around 1830, French army conscripts who could read and write averaged 39% across 86 departments. How many departments were within 5 points of 39%?" Options: A) About 3 in 4 / B) About 1 in 6 / C) About 1 in 50. Answer B.
- **Band count, checked by script (section 23):** 15 of 86 departments are within 5 points of the 39% shown (34-44%), 17.4%. Against the unrounded 39.26 the count is 14 (16.3%), so the answer does not hang on rounding. The script asserts that exactly one option is true for both counts: A is under half, and C is more than 1 in 25. It also asserts that no option names a Guerry region or joins two. This is the count assertion I promised in r3, and it answers my r4 objection 2: each option now maps to what the first preset shows.
- **Stage:** a new first preset, "Within 5 points of 39%" (milestone `band`), outlines the 15 departments. **"Paris (Seine)" is cut** (finding 4: no job in the objective), together with Seine's 71% from c3. The preset count stays at four, so the controls should not take space from the map. QA's hard stop applies: no change may shrink the reveal map (labels at 10.00 px, zero margin).
- **Reveal (70 words):** it adds "Only 15 of 86 departments were within 5 points of the 39% average." and keeps the 55/28/39 split and the extremes. The "no value" hatching and the projection note stay as built.
- Builder note: Demo.tsx's header comment still says "S+W+C 28.8" (stale since W-1276).

### Ruling W-1311 (london v4): held for v5
The comparator for 9.8 deaths per christening and the 1666 dip are real findings, but they are polish. They wait for v5, and v5 waits on W-961. The clipped bottom row in the locked first frame shows in all three lessons, so it is probably the kit (W-1312, lane 7). It is not a lesson fix.

### Ruling W-1290: brief 12 slug, brief 4 name, releases
- **Slug: `mongol-khanates-on-a-1279-map`.** This is the reviewer's preference: it mirrors the title and has no contest word. The rename is in the section heading, in check section 12 and in the skip file. The skip line has gone with the release. The curriculum `brief` field ("history.md #12") carries no slug. Old records keep their paths. Pointer: `company/reviews/mongol-khanates-on-a-1279-map/README.md`.
- **Brief 4 curriculum name:** "Disease killed about eight times as many as wounds: deaths in British army hospitals in the East" (the reviewer's wording, N4/P2: "not wounds" read as "wounds did not kill").
- **Brief 3 optional rename declined.** The reviewer does not ask for it, and the page carries the qualifier.
- **Released, in this order of priority: 5, 3, 4, 12.** Section 5 is moved ahead of section 3 in the file so that `claim.mjs next history` offers 5 first. Their numbers are unchanged. All four are sensitive-route builds: "Publish needs culture-en on the walkthrough (stage B)" in build.md, status draft.

### Ruling W-1284: brief 11 re-scripted, still unreleased
- P7 is pasted into `history-data.mjs` as written (24 pins hold). Check section 11 now runs on `owiddisasters` and asserts P5's numbers: 523,942 and 53,720 a year, ×9.75, population ×3.74, **×36.5 per million**, droughts 90% of the 1920s, and 1931 at 3,718,976. The vega copy without epidemics (×10.26) is a cross-check only. No number differs from P5.
- Question: the reviewer's change-2 shape, trimmed from 28 to 24 words ("each year" and one "the" dropped). Options as the reviewer wrote them. Answer C "Fell more than 30-fold".
- Reveal: the reviewer's change-4 template with 520,000 and 54,000 filled in. **One deviation, for the addendum:** "while the world's population grew 3.7 times" is replaced by "Per million people, that is about 36 times fewer". The reveal has to answer the per-million question; the question already gives the 3.7; and keeping both made 93 words, over the cap. Now 88 words.
- The brief-11 item of W-1038 is done. The skip line stays, re-worded to name its three conditions: the lane 10 fact-check of P5, a cultural addendum, and W-1285.
- I keep 2010-2017 as the recent window although the series now runs to 2025, because P5, the reviewer's question and the fact-check ask all name 2010-2017. A wider window would need P5 recomputed and re-checked. Not proposed now.

### Objections
- **Mine, against this item's done-when:** it says `history-cycle2-check.mjs` passes for sections 11 and 12. Those sections live in `history-cycle1-check.mjs` (briefs 1-12). I ran cycle-1 for 11 and 12 and cycle-2 for 23 and 24. Both scripts pass in full.
- **Mine, on brief 11's letter:** the answer moves from A to C, so the cycle-1 answers are now A ×3, B ×4, C ×5. The cycle-1 script has no balance check. I accept the imbalance rather than reorder the reviewer's options.
- Standing caveat: no verdict in this lane is real-learner evidence. The learner records above are simulated.

## 2026-10-16 r16: britain CO2 v3 hook and title over budget (W-1360), the moved lesson's skip line and old claim lock

Context: History r4 B2 (demo-builder, branch `hist-co2v3`, worktree `/home/user/s3c-co2`, commits 4645a20 and 9083b44) applied brief 9's changes 1 and 2 word for word. `npm run check` fails: hook 94 characters (budget 90, `tools/company.mjs`). The title is 43 characters against demo-standard's 40 (not gated by the check). Both strings were my brief's (the cultural reviewer's wording, which I passed on without counting). The builder was right not to trim brief-fixed text. That miss is mine.

1. **Hook, ruled:** "Several countries burned coal by 1850. How was the world's fossil-fuel CO2 split?" (81 characters by `String.length`; build.md's "80" is off by one, which does not matter). I chose this over the 84-character candidate ("How was fossil-fuel CO2 split between them?") because that one drops "the world's". The question and the reveal are about shares of the **world** total, and "between them" would suggest the "several countries" make up the whole denominator. Keeping "the world's fossil-fuel CO2" keeps the N4/F5 fix whole. The first sentence (claim c7) is unchanged. The second sentence is a question and makes no claim. It names no country and no size (pre-flight 1).
2. **Title, ruled:** "Where fossil-fuel CO2 came from in 1850" (39 characters). It drops only "the" and has the same meaning. No claim covers the title.
3. Both trims change the cultural reviewer's change 1 and change 2 wording. They go to cultural-reviewer at stage B (`culture-en.md` on the v3 walkthrough, already required before publish). If the reviewer wants other words, they must still fit 90 and 40.
4. **Skip line `britain-made-most-fossil-co2-in-1850` (brief-skips.json): remove it on the branch, in the same commit as the fix, not on main now.** Until `hist-co2v3` merges, main has no `src/demos/*/britain-made-most-fossil-co2-in-1850/meta.json`. Without the line, `claim.mjs next history` could hand brief 9 out as a new build. If the removal rides on the branch, it lands at the same moment the directory does. This follows r4 B1(f) ("only if B2 has already merged"). The builder makes the edit under this ruling. The line is mine, and this record is my authority for it.
5. **Old claim lock `company/ops/claims/britain-made-most-co2-in-1850.json`: retired.** It is history-builder-3's v1 lock from 2026-10-14T19:30Z. It was never marked done and is stale (over 6 h). Its slug is no longer a brief heading (brief 9's heading carries the new slug), so `claim.mjs` cannot offer it, and after the merge no directory has that name. It does no harm. The new slug needs no lock, because `built()` is true once the branch merges. Housekeeping (chief of staff, main checkout, after the merge): `node tools/claim.mjs release britain-made-most-co2-in-1850`. The file is gitignored, so this is not a commit.
6. The fit numbers in build.md were measured with the longer strings. A shorter hook and title can only add room, so no re-measure is needed for this fix. QA on v3 is still owed (lane 10 ask (c), carried).

Batch item: `company/ops/dispatch-requests/2026-10-16-r5-history.md` B1.
Objections: mine, against my own brief: I wrote changes 1 and 2 into the v3 spec without counting them against the budgets. From now on, any hook or title I copy from a review record into a brief gets counted before release.
