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
