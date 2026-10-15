# Build notes: rome-placed-too-far-east

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #6. Numbers: history-cycle1-check.mjs section 6 (all checks pass).

- The 12 rows of Langren1644.csv (Name, Year, Longitude) are copied into Demo.tsx unrounded. Every other number is computed in the component using the check script's formulas: true = 12.5 - (-4.03) = 16.53; median = mean of the 6th and 7th sorted values; km/degree = 111.32 x cos(40.875 deg); km rounded to 10. No number was typed by hand.
- Stage: one axis of degrees east of Toledo (0 labelled "Toledo"), with a 500 km scale bar. Line view: 12 ticks on the axis, as van Langren drew them. "Sort by year" spreads them into one row per estimate, earliest at the top (rank order, because Ptolemy's year of 150 would squash a linear year axis).
- Presets in DOM order, each setting the full view: Show the true distance (true line plus the 2-degree band; milestone `truth`), Closest estimate (Jansonius 1605 highlighted and named; also `truth`), Middle estimate in km (median line, "9.3° too far ≈ 780 km"; milestone `median`), Sort by year (the band, the true line, the median line and the 17.7 / 30.1 end labels all stay; both milestones). There is no Reset button.
- Deviation from the brief: names are not shown on tap. Twelve tap targets would add 12 controls to the QA path, and each would need to be at least 24 px. Only the closest estimate is named, and the year rows carry the years.
- The control row uses `foldAtReveal`. The reveal does not mention any control or ask the learner to check one, and every state it quotes stays in the picture. The Readout sits outside the folded row.
- Held source sentence: "which nobody could then measure well" (c7), with its fallback in the claim. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "Twelve guesses at Rome" / "Astronomers spent centuries measuring one short distance. How close did they get?" No: neither names a count or a direction of error.
2. **Options.** "1 of 12" / "6 of 12" / "10 of 12". All are numbered at the same precision.
3. **Locked stage.** It shows the axis (Toledo to 30), the 500 km bar and "The twelve estimates appear after you predict." There are no ticks, no true line and no band, so nothing matches "1 of 12".
4. **Reveal values.** "1 of 12" is computed from the data and gated by `truth`; the band is drawn in every view from truth onward. "every one … too far east" is computed (EAST === 12). "17.7 to 30.1" is computed, and the end values are labelled on the stage in the line and year views. "25.8" and "780 km" are computed and gated by `median`; the line is labelled in the median and year views, and the km value shows in the median readout. The 2 degrees and 12 come from the question.
5. **QA path.** Pressing the 4 presets once in DOM order reaches `truth` (press 1) and `median` (press 3). It ends in the year view, which still shows the true line, the band, the median line labelled 25.8, the 17.7 and 30.1 labels, and the readout "780 km too far; earliest (150) 27.8°, latest (1610) 28.2°".
6. **Reset.** There is no Reset button. Reveal text from the run: "Only 1 of 12 came within 2 degrees, and every one put Rome too far east: the estimates ran from 17.7 to 30.1 degrees. The middle one was 25.8, about 780 km too far. Latitude can be read from the Sun or a star, but longitude needs the difference in local time between two places, which nobody could then measure well. Where it stops: some estimates may copy others, so these are not 12 independent measurements."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0 (17.7 and 30.1 are visible), phoneFit true, 79 reveal words (verdict line included). Every svg label is authored at 11 px in a 340-wide viewBox drawn at about 330 px, so at least 10.6 px.

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- FC39/FC41 c8: limit sentence now "Where it stops: 2 of the 12 were probably read from maps, not measured." Demo.tsx copies the CSV's Source column (Map/Astron) and computes MAPS from it.
- **Number departs from the fact-checker's wording.** FC39/FC41 wrote "five of the twelve" (Astron 7 / Map 5). The pinned Langren1644.csv (sha256 pin holds) has Source = Map for only 2 rows (G. Jansonius 1605, G. Mercator 1567) and Astron for 10; my node count matched Demo.tsx row by row. The fact-checker should re-count; if the HistData doc says 5, the doc and the pinned file disagree.
- The FC wording's tail ", so these are not 12 independent measurements" is cut: with it, reveal-fit measured a 33 px stage crop; without it, 13 px, the same as v1 (HEAD) on this server.
- Hook: "Astronomers and mapmakers spent centuries on one short distance. How close did they get?" (88 chars; the hook budget is 90) (was "Astronomers spent centuries measuring..."). Recorded as new claim c9 (unverified).
- Claims reset/new unverified: c8, c9.
- Fit history this session: v1 from HEAD measured a 13 px stage crop on :3651 (the v1 note recorded 0 px on another server); with the FC's full limit sentence v2 measured 33 px; with the shorter limit sentence 13 px; with the 88-char hook (one header line shorter) 0 px.
- Phone fit (final, after the hook change): tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 78 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2-rome.json, screenshot artifacts/reveal-fit/rome-placed-too-far-east.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json; re-run 2/2 for this lesson after the hook change, artifacts/qa-hist-fix-rome). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
