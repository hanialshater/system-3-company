# Build note: life-expectancy-gained-late

Builder: demo-builder (history-builder-3), 2026-10-14. Brief: `company/domains/briefs/history.md` #14 (check section 14 of `history-cycle2-check.mjs`, all ok). Status draft; every claim unverified. Data: the ten points the script lists (`history-data.mjs: gmlex`, world, column lex at 1800, 1825 … 2000, 2023), copied from the file at full precision; gains computed in Demo.tsx. Care line kept: single-year falls are not drawn or labelled; caption "one point every 25 years".

Departures from the brief: (1) the locked frame draws only 1800-1900 on a 0-40 axis, without values; "1900 to 2000" extends the line and rescales to 0-80, so nothing after 1900 shows before the commit. (2) The reveal is gated on `c19`, `c20` and `now` (press 3, "2000 to 2023"), because it quotes the 2023 value; the brief gated on c19 and c20 only. `bars` is not a milestone. (3) "Years gained per century" shows three bars (adding 2000 to 2023, +5.8), each labelled with its start and end, so the values the reveal quotes stay on the stage in this view. (4) Caption at 11 px (brief: 10 px). Title and hook are mine (hook rounds 2.8 to 3; claim c3). Tap targets 44 px.

## Pre-flight v1

1. **Title and hook.** "When did we start living longer?" / "World life expectancy crept up 3 years in the 1800s. What did the next century add?" Restates the question's given part; does not size the 1900s.
2. **Options.** "About 35 years", "About 15 years", "About 5 years": all numbered, same precision.
3. **Locked stage.** Title "World life expectancy at birth, years", axis 0-40, years 1800-2000, five points 1800-1900 with no value labels, caption, readouts "–". Nothing drawn after 1900; the axis stops at 40.
4. **Reveal values.** "2.8 years": milestone `c19` (readout "1800 to 1900"). "34.7 years": milestone `c20` (readout "1900 to 2000"). "about 12 times": computed from the two recorded readouts. "30.6", "33.5", "68.2": the series (question's case; point labels in line views, bar labels in the bars view). "74.0": milestone `now` (readout "In 2023").
5. **QA path.** DOM order 1800 to 1900 (c19), 1900 to 2000 (c20), 2000 to 2023 (now), Years gained per century. All three milestones by press 3. At the reveal the bars view shows +2.8 (30.6 → 33.5), +34.7 (33.5 → 68.2), +5.8 (68.2 → 74.0) and all three readouts.
6. **Reset.** No Reset; presets never clear the readouts. Reveal from the QA run: "Over the 1800s world life expectancy rose 2.8 years, from 30.6 to 33.5. Over the 1900s it rose 34.7 years, to 68.2: about 12 times as much in one century as in the one before. By 2023 it was 74.0. Where it stops: these are one source's world figures; the chart shows one year in every 25, and single years, such as epidemic years, fell sharply."
7. **Phone fit.** `tools/reveal-fit.mjs` at 390×844 on my dev server (port 3623), 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, 69 reveal words, phoneFit true. Smallest svg label 11 px locked and at the reveal. Computer-use QA contract: phone and desktop pass.

Held source sentence (one): "such as epidemic years" (c5), fallback: cut the phrase.
