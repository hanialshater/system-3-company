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

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- **Departure from the task: c5 not cut.** The task asked to cut "such as epidemic years" (the FC39 fix), but FC41 verified the sentence as it stands from opened OWID pages (1918 influenza). Learner text and status kept; the source field now cites the two OWID pages, as FC41 asked (non-blocking).
- No claim reset.
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 69 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/life-expectancy-gained-late.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.

## v3 (2026-10-15, demo-builder, branch hrB: W-990, learner adult-beginner r1)
- **Spans, not centuries** (finding 1): the button now reads "Years gained in each span". The bars are named "1800 to 1900 (100 years)", "1900 to 2000 (100 years)" and "2000 to 2023 (23 years)". The explore hint changed to match.
- **Arithmetic adds up** (finding 2): gains are now differences of the one-decimal values shown (Demo.tsx `gain = shown(b) - shown(a)`): +2.9 (30.6 → 33.5), +34.7 (33.5 → 68.2), +5.8 (68.2 → 74.0). The ratio is 34.7 / 2.9 = 11.97, so still "about 12". Unrounded (node, pinned gapminder-lex-global.csv, all ten PTS match the file): 2.84, 34.72, 5.84, ratio 12.2. **Brief mismatch for cm-history:** the objective and history-cycle2-check.mjs section 14 quote 2.8. The lesson now shows 2.9, the rounded endpoints' difference, which is the review's second suggested fix. The other fix (two decimals, 30.64 → 33.48, +2.84) is the alternative if cm-history prefers the unrounded gain.
- **Limit sentence** (finding 4): "Where it stops: these are one source's world figures, shown one year in every 25, so the chart hides single years when life expectancy fell sharply, such as epidemic years." This names what fell. c4 and c5 are reset (c5's phrase is unchanged, but its sentence changed).
- Claims reset to unverified: c3, c4, c5. meta.json version 3. Title and hook unchanged ("crept up 3 years" still rounds 2.9).
- Phone fit (reveal-fit, committed, :3672): fit, crop 0, hidden 0, namedHidden 0, phoneFit true, 73 words. QA contract phone and desktop pass.

## v4 (2026-10-15, demo-builder, branch patience: W-1024, cm-history r1-revision ruling 4)

- meta.json objective: 2.8 -> 2.9 (exact ruling text). c3 source: the check reference now reads "section 14 ('two centuries (as shown)', ...) quotes 2.9"; c3 text unchanged; reset to unverified. No stage or reveal change.
- reveal-fit: 390x844 and 412x839 fit, crop 0, phoneFit true, 73 words. QA contract: phone and desktop pass.

## Status draft -> review (2026-10-16, demo-builder, branch rome4: W-996, history round-1 batch item 2)
- Flipped on: QA record company/reviews/life-expectancy-gained-late/2026-10-16-qa.md (contract phone + desktop, pass, production build of 59df55e); claims 5/5 verified; launch verdict on the current version v3 in company/reviews/life-expectancy-gained-late/2026-10-16-learner-adult-beginner-r12.md. Demo.tsx and styles are unchanged since the QA build. No code or claim changed; version stays 3.
