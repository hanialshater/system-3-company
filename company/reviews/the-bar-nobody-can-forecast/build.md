# Build note: the-bar-nobody-can-forecast

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #18 (NCM)

- Intent: attendance night by night (the last 40 nights), with a line at 60. Crowded nights use the bad colour and forecast nights are outlined. The forecast chips (50 and 70) add one night each: 100 come, then 0. The 60%-coin buttons (1, +10, +100 nights) add random nights. Readouts show the number of random nights, the average and the crowded share.
- Seeded: mulberry32(1), 100 draws per night. Seed 1 was the first seed I tried, not one I chose. It is disclosed with seeds 2 and 3 in claim c4 (at 100 nights: 48, 38 and 44 crowded). The long-run share of 46.2% is the binomial sum (re-run in node: 0.4621).
- Milestones: "forecast-low", "forecast-high", "mixed-100". QA's one-press-each order reaches all three (1 + 10 + 100 = 111 nights).
- The stage line "night N (…): K came" changes on every press, so a repeated forecast press always changes something.
- The reveal cites Arthur (1994) by name. The E&K chapter is not cited to learners, because the brief asks the fact-checker to confirm its placement first. The title and pages of Arthur's paper are from memory, and the claim says so.
- Not run (per dispatch): next build, QA, walkthrough, tsc.

## Revision v2 (wave E, r6 learner review)

- r6 main (Reset last made the reveal say "your 0 random nights averaged 0.0, yet 0% were crowded"): the forecast results and the longest random run are recorded when they happen. A row under the readouts shows them ("forecast 50 → 100 came · forecast 70 → 0 came · longest run: 111 nights, avg 60.1, 49% crowded") and Reset does not clear it. The reveal quotes the records only.
- r6 minor (forecast 70 bar has zero height): a "0" mark is drawn at the base of any zero night.
- r6 minor (why 60%): the reveal says "60% of the time (so on average 60 come)".
- Options were "About 50" / "About 60" / "All 100", so the answer was the only exact one: now "50" / "60" / "100".
- c3 and c4 reworded and unverified. Builder node re-run of seed 1: first 111 nights average 60.1, 49% crowded.

## Pre-flight v2

1. Title and hook: "Why can't anyone forecast this bar?" / "A bar is fun with 60 people and awful with more. Everyone trusts one good forecast. Then?" The title says forecasting fails, which still leaves 50, 60 and 100 open (it does not say how it fails).
2. Options: "50" / "60" / "100". All bare numbers.
3. Locked stage: empty chart, dashed 60 line "60: crowded above", chip "Model: 100 people · fine up to 60 · seed 1", readouts "?". No bar at 100. The 60 line matches the wrong option "60"; it is the bar's stated limit from the question, so it stays.
4. Reveal values: "forecast of 50 sent all 100" and "forecast of 70 sent 0": recorded at milestones forecast-low and forecast-high (b), shown in the runs row. "your 111 random nights averaged 60.1, yet 49% were crowded": the longest-run record, milestone mixed-100 (b), in the runs row. "46.2% in the long run": told context (c3).
5. QA path: Forecast says 50 → Forecast says 70 → 1 night → +10 → +100 (111 nights: mixed-100) → Reset. The runs row with all three records is on stage when the reveal opens.
6. Reset: pressed last; chart and readouts empty, runs row kept. Reveal from that run: "The forecast of 50 sent all 100: everyone expected room, so everyone went. The forecast of 70 sent 0. Any forecast everyone believes makes itself wrong. / When each person went 60% of the time (so on average 60 come), your 111 random nights averaged 60.1, yet 49% were crowded. In the long run that share is 46.2%: the average sits right at the limit, so nearly half the nights land above it. / A model of Arthur's El Farol bar problem (1994): identical people, one shared forecast, no learning."

## Pre-flight v3

r7 blocking finding: the title "Why can't anyone forecast this bar?" assumed the forecast fails and so ruled out "50" (the misconception option) before the commit. Fix: title "Will the forecast come true?" (meta.json; 28 chars). Also "longest run: 1 nights" now reads "1 night". Stage, milestones and reveal otherwise unchanged; no claim text changed.

1. **Title and hook.** "Will the forecast come true?" / "A bar is fun with 60 people and awful with more. Everyone trusts one good forecast. Then?" Both leave 50 (it comes true), 60 and 100 open.
2. **Options.** "50" / "60" / "100": bare numbers, same precision.
3. **Locked stage.** Empty night chart with the dashed "60: crowded above" line (comes from the question's limit; it matches the wrong option 60, not the answer 100), readouts "?", empty trace row.
4. **Reveal values.** "sent all 100" and "sent 0": (b) recorded in `fc` at milestones "forecast-low" / "forecast-high", on stage in the trace row ("forecast 50 → 100 came · forecast 70 → 0 came"). "your N random nights averaged A, P% crowded": (b) recorded in `best` at milestone "mixed-100", in the trace row with the same toFixed(1) and rounding. "46.2%": long-run value, claimed, told context.
5. **QA path.** DOM order "Forecast says 50" (forecast-low), "Forecast says 70" (forecast-high), "1 night", "+10", "+100" (111 nights, mixed-100), "Reset": all 3 milestones within 5 presses; trace row on the stage at the reveal.
6. **Reset.** Reset clears the chart and live readouts but not `fc` or `best`. Reveal after Reset (r7's walk): "The forecast of 50 sent all 100: everyone expected room, so everyone went. The forecast of 70 sent 0. Any forecast everyone believes makes itself wrong. When each person went 60% of the time (so on average 60 come), your 111 random nights averaged 60.1, yet 49% were crowded. In the long run that share is 46.2%: the average sits right at the limit, so nearly half the nights land above it."

Not seen in a browser (no build/QA this wave).

## Pre-flight v4 (demo-builder, 2026-10-14, answering 2026-10-14-learner-network-effects-graduate-r8.md, W-343)

Changes: reveal 93 -> 68 words (tool count, verdict line included). Cut the grey told-context note "A model of Arthur's El Farol bar problem (1994): ..." (c6 withdrawn; cm-economics may want the name back on the chip) and folded the 46.2% into a parenthesis: "When each went 60% of the time, your 111 random nights averaged 60.1, yet 49% were crowded (46.2% in the long run): the average sits right at the limit, so nearly half the nights land above it." First paragraph unchanged. Moderate finding (bars gone after Reset): at the reveal, if the chart is empty and a random run was recorded, the chart redraws the last 40 nights of the longest run (the same seeded nights the learner ran), labelled "your 111-night run, last 40 nights". Stage at the reveal: both control rows use `Row foldAtReveal` (the kit folds them behind "Show controls"; no reveal sentence asks the learner to use them); the readout row is not rendered at the reveal (after Reset it read 0 / ? / ?; the record row carries the numbers the reveal quotes). Chart labels 10/11 -> 12 viewBox units.
1-3. Title, hook, options, locked stage: unchanged.
4. Reveal values: 100 and 0 (record row), 111 nights, 60.1, 49% (record row "longest run: ..."), 46.2% (told, claim c3), pink bars above the dashed 60 line (replayed chart).
5. QA path: unchanged (ends with Reset, so the reveal shows the replay).
6. Reset: clears the chart and readouts during explore as before; the record row and, at the reveal, the replayed run survive it.
7. Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3530 the-bar-nobody-can-forecast` (dev server, 2026-10-14): before crop 223 px, 93 words, "50" tick off screen; after **crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit 1, 68 words**. Stage 366 px + reveal 226 px in a 618 px card. The chip, "attendance by night", the 100 tick, the 60 line and the replayed bars are all on screen.
- meta.json 3 -> 4; c3, c4, c5 reopened; c6 withdrawn. Not run: build, QA, walkthrough. Label shrink in the locked predict frame is kit W-287.
