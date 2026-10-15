# Build notes: doubling-stopped-speeding-up

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #15. Numbers: history-cycle2-check.mjs section 15 (all checks pass).

- The gmpop column for 1800-2024 (225 values) is copied into Demo.tsx unchanged; a node script confirmed it equals the CSV. The stage draws 1800-2023 only.
- **Disclosure for the fact-checker (claim c3).** The script computes growth in 2023 as pop(2024)/pop(2023) - 1, so the 0.87% "in 2023" depends on the file's 2024 value. Gapminder may mark that value as a projection. No year after 2023 is drawn. If cm-history wants a strictly recorded figure, the 2022→2023 rate would replace it. That is the brief owner's call, not mine.
- Stage: population (billions, 0-8) or, after "Growth per year", the yearly growth rate (% a year). Locked frame: axes only, with "The line appears after you predict." (the line would show when 8 billion came). A doubling-span strip under the year axis keeps every pressed span in both views ("1 to 2 bn: 122 yrs", "48 yrs", "47 yrs").
- Presets in DOM order: 1 to 2 billion, 2 to 4 billion, 4 to 8 billion (milestone `d3`), Growth per year (milestone `rate`; peak labelled "peak 1963: 2.25%" and "2023: 0.87%"). The brief's d1 and d2 are not gating milestones, because the brief's gate is d3 and rate. There is no Reset button. Control row `foldAtReveal`.
- The growth line shows a dip around 1959-61, unlabelled. The care line says no country is named, and none is.
- No held source sentence. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "The next doubling" / "World population doubled faster and faster. Did the latest doubling keep up the pace?" The hook states the first two doublings' trend (true: 122 then 48, claim c6) and asks the question. It does not answer it.
2. **Options.** "About 24 years" / "About 47 years" / "About 96 years". All are numbered at the same precision (the brief's wording).
3. **Locked stage.** It shows the axes and a caption, with no line, no span and readout "?".
4. **Reveal values.** 122 and 48 are computed and appear in the span strip after presses 1 and 2; the question also gives them. 47 is computed and gated by `d3`, and it stays in the strip. 2.25% and 1963 are computed and gated by `rate`, labelled on the line and in the readout. 0.87% and 2023 are computed and gated by `rate`, labelled and in the readout.
5. **QA path.** Pressing the 4 presets in DOM order reaches d3 (press 3) and rate (press 4). The reveal opens on the growth view with all three spans in the strip and both rate labels.
6. **Reset.** There is no Reset button. Reveal from the run: "The doublings took 122 years, then 48, then 47: the last was no faster than the one before. Growth per year peaked at 2.25% in 1963 and was 0.87% in 2023. A doubling that takes as long as the last one, at a falling yearly rate, means growth is slowing, not racing. Where it stops: early totals are the least certain, and the chart stops at the present; any later number is a projection, not a record."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, phoneFit true, reveal 84 words with the verdict. The svg labels are 11 px in a 340-wide viewBox at about 330 px.

## v2 (2026-10-15, demo-builder, branch hist-fix: W-868, W-871, FC41)
- W-868 / cm-history ruling and FC39/FC41 c3: POP now ends at 2023 (224 values; 2024 dropped). Growth keeps the forward convention, labelled by its start year: peak 2.25% in 1963 (1963 to 1964), last value 0.88% labelled "2022 to 2023" on the line, in the readout ("peak 2.25% in 1963; 0.88%, 2022 to 2023") and in the reveal ("was 0.88% from 2022 to 2023"). Re-derived in node from artifacts/history-data/gapminder-pop-global.csv: 100 x (8,091,734,930 / 8,021,407,192 - 1) = 0.877; peak 1963 2.245; firsts 1805, 1927, 1975, 2022.
- FC39 c4 note: "no faster than the one before" became "about as fast as the one before" (now part of c4's text).
- **W-869 not done.** history-cycle2-check.mjs section 15 and brief 15 still compute and quote g23 = gr(2023) = 0.87%, which needs the 2024 value. I did not edit the CM's script or brief; the lesson computes 0.88% from its own array, and the script's checks still pass (they test the brief, not the lesson). Until cm-history amends section 15 (g23 -> the 2022 to 2023 rate), the brief and the lesson differ by that one number.
- **Departure from the task: c5 not cut.** The task asked to cut "early totals are the least certain" (the FC39 fix), but FC41 verified the sentence as it stands from opened OWID pages. I kept the learner text and status, and re-cited the source field to those pages.
- Claims reset to unverified: c3, c4. c1 and c5 changed in the source field only (status kept, noted in each claim).
- Phone fit: tools/reveal-fit.mjs (committed copy, clean stamp) against the dev server on :3651 at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, thumb false, phoneFit true, 87 reveal words with the verdict line (artifacts/reveal-fit/hist-fix-v2.json, screenshot artifacts/reveal-fit/doubling-stopped-speeding-up.png).
- QA contract (tests/qa/contract.spec.ts, QA_BASE_URL=http://localhost:3651): phone and desktop both pass (18/18 for the nine v2 lessons, artifacts/qa-hist-fix/qa-report.json). Dev server, not a production build.
- Every changed claim is unverified; I verified none. meta.json version 2.
