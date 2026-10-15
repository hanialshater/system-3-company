# Build note: income-flat-then-sixteenfold

Builder: demo-builder (history-builder-3), 2026-10-14. Brief: `company/domains/briefs/history.md` #2 (check section 2 of `history-cycle1-check.mjs`, all ok). Status draft; every claim unverified. Data: the stage line is every year 1270-2018 of `history-data.mjs: maddison`, "United Kingdom", "GDP per capita", extracted with the check script's CSV reader and rounded to whole numbers (claim c2); ratios and rates are computed in Demo.tsx from that array and match the script to the shown precision.

Departures from the brief: (1) the locked frame and the "1270 to 1700" view draw the line only to 1700 on a 0-200 zoom, so nothing after 1700 (the answer) is drawn before the commit; "1700 to 2018" draws the full line and rescales to 0-1,600. (2) "Growth per year" adds dashed steady-rate lines through each span's ends, labelled "our line" (charter: a model only labelled and beside the real series); the rates also sit in the two recorded readouts, so the reveal's rates are on stage whatever the learner pressed last. (3) The reveal quotes the stage's rounding: "2.0-fold", "15.8-fold", "0.87%" (brief: 2, 16, 0.9). Title and hook were not in the brief; written here (claims c1, c3). Tap targets 44 px.

## Pre-flight v1

1. **Title and hook.** "How fast did England get richer?" / "England's income per person doubled in 430 years. What did the next 318 years do?" Neutral on speed; no multiple named.
2. **Options.** "About 2 times", "About 4 times", "About 16 times": all numbered, same precision.
3. **Locked stage.** Title "Income per person, index (1700 = 100)", y axis 0-200, year axis 1300-2000, the line 1270-1700 only, empty readouts "–". Nothing drawn after 1700; no 1,600 tick.
4. **Reveal values.** 430 / 318 years: the question's spans (told). "2.0-fold", "0.16%": milestone `early` (recorded, readout "1270 to 1700"). "15.8-fold", "0.87%": milestone `late` (readout "1700 to 2018"). "80 years": computed from the recorded late rate (claim c4).
5. **QA path.** DOM order: 1270 to 1700 (milestone early), 1700 to 2018 (milestone late), Growth per year, Log scale. Both milestones by press 2. At the reveal both readouts and the rate labels are on the stage.
6. **Reset.** No Reset; presets never clear the readouts. Reveal from the QA run: "In the 430 years to 1700, income per person grew 2.0-fold; in the 318 years after, 15.8-fold. Growth of 0.16% a year is invisible in a lifetime, while 0.87% a year doubles income about every 80 years. That is why most of history looks flat on this chart. Where it stops: these are reconstructions from wages, prices and output records, and the series covers England only before 1700, so early values are estimates."
7. **Phone fit.** `tools/reveal-fit.mjs` at 390×844 on my dev server (port 3623), 2026-10-14: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0 (named: "1700", "0.16% a year", "0.87% a year", all visible), 80 reveal words (tool count), phoneFit true. Smallest svg label 11 px locked, 10.5 px at the reveal (card fits the picture to 178/186). Computer-use QA contract: phone and desktop pass.

Held source sentence (one): "reconstructions from wages, prices and output records" (c9), fallback written in the claim.

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- FC39/FC41 c10: title "How fast did Britain get richer?"; hook "Income per person in England doubled in 430 years. What did Britain's next 318 years do?"; question "England's income per person about doubled from 1270 to 1700. From 1700 to 2018 (Britain, then the UK), how many times over did it grow?" (24 words; "over 430 years" moved out, the hook carries it).
- FC41 c9: reveal limit now "Where it stops: these are modern reconstructions, and the series covers England only before 1700, so early values are estimates." (method clause dropped).
- Claims reset to unverified: c9, c10. c8 is untouched; its parenthetical still quotes "Income per person in England", which is now the hook's wording rather than the question's.
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 75 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/income-flat-then-sixteenfold.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
