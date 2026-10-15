# Build note: britain-made-most-co2-in-1850

Builder: demo-builder (history-builder-3), 2026-10-14. Brief: `company/domains/briefs/history.md` #9 (check section 9 of `history-cycle1-check.mjs`, all ok). Status draft; every claim unverified. Data: every year 1750-1950 of `history-data.mjs: co2`, column co2, for World, United Kingdom, United States, Germany and France, rounded to 0.1 Mt; "Others" = World minus the four; a country with no row yet is drawn as zero (claim c2). Shares and growth are computed in Demo.tsx and match the script at the shown rounding. Care line kept: no blame, no "who owes what", nothing about today.

Departures from the brief: (1) the year presets draw the record from 1750 up to that year only, and the locked frame shows empty axes, because a full stacked area before the commit would show the answer. (2) Labels sit at the right edge of the drawn record with leader lines, not inside the areas (thin bands could not hold 11 px text); "Britain" is OWID's "United Kingdom", and the US is "US", the rest "Others". (3) The reveal is gated on three milestones (`y1850`, `y1900`, `tonnes`), not two, because it quotes the 1900 share; `y1900` is press 3 of 5 on the QA path. (4) Title and hook are mine (claim c7 for the hook). Tap targets 44 px.

## Pre-flight v1

1. **Title and hook.** "Whose smoke was it in 1850?" / "Several countries burned coal by 1850. How was the world's CO2 split between them?" Neither says one country or many.
2. **Options.** "About 5%", "About 25%", "About 60%": all numbered, same precision.
3. **Locked stage.** Title "Share of the world's fossil CO2, by country", axes 0-100% and 1750-1950, no band drawn, readouts "–". Nothing marks 60% or Britain.
4. **Reveal values.** "62%": milestone `y1850` (readout "Britain, 1850"). "21%": milestone `y1900` (readout "Britain, 1900"). "10 times": milestone `tonnes` (readout "1850 to 1900: World ×10"). The countries named (United States, Germany) are the bands labelled on the stage; "burned more coal" rests on coal_co2 in the same file (c5).
5. **QA path.** DOM order 1800, 1850 (y1850), 1900 (y1900), 1950, Tonnes, not shares (tonnes). All three milestones by press 5. At the reveal the tonnes view, the 1850 and 1900 guides and all three readouts are on the stage.
6. **Reset.** No Reset; presets never clear the readouts. Reveal from the QA run: "In 1850 Britain produced 62% of the world's fossil-fuel CO2. By 1900 its share had fallen to 21% as the United States, Germany and others burned more coal, and world emissions had grown 10 times. A falling share can hide a rising total. Where it stops: these figures are rebuilt from records of coal and other fuels, and early years are the roughest."
7. **Phone fit.** `tools/reveal-fit.mjs` at 390×844 on my dev server (port 3623), 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named 1850, 1900, britain, germany, others, 62%, 21%: all visible), 69 reveal words, phoneFit true. Smallest svg label 11 px locked, 10.5 px at the reveal (picture fitted 179/188). Computer-use QA contract: phone and desktop pass. First run cropped 3 px; fixed by shortening the hook to two lines and the third readout label to one line.

Held source sentence (one): "rebuilt from records of coal and other fuels" (c6), fallback written in the claim. The data has a one-year dip in Britain's share just before 1800 (the record, not a drawing error).

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- cm-history ruling (W-868): title "Where the CO2 came from in 1850" (was "Whose smoke was it in 1850?"). No claim covers the title; the hook is unchanged.
- c6: FC41 verified the learner text as it stands, so I changed nothing a learner sees. The source field now cites the OWID pages FC41 opened, including ourworldindata.org/co2-dataset-sources, as FC41 asked. Status kept (verified by FC41); noted in the claim.
- No claim reset.
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 69 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/britain-made-most-co2-in-1850.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
