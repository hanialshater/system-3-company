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

## v3 (2026-10-15, demo-builder, branch hrB: W-990, learner adult-beginner r1)
- **Options** (finding 1): computed from the 2-to-4 span d2 = 48 as half / same / double: "About 24 years", "About 48 years", "About 96 years"; answer "About 48 years" (the reveal and strip say 47, which it covers; FC43 found 47.5 vs 47.6 years by interpolation). All three are built the same way, so 47 no longer stands out.
- **Objection "but it added twice as many people"** (finding 2): the reveal's second paragraph is now "It added 4 billion people, not 2, only because it started from twice as many; as a share of those alive, growth is slowing." The span strip has a second line per span, "+1 bn", "+2 bn", "+4 bn" (threshold differences), so the 4 and 2 are on the stage at the reveal. Node on the pinned gapminder-pop-global.csv: P(1975) - P(1927) = 2.063 bn, P(2022) - P(1975) = 3.951 bn. Strip retimed (rect B+21, lines B+37 and B+49) so H stays 193.
- **Title and hook: unchanged, for cm-history to rule.** "The next doubling" is already open. The hook "Did the latest doubling keep up the pace?" is the yes/no cue the review names. Proposed open hook (it fits in 90 characters): "World population doubled in 122 years, then in 48. How long did the next doubling take?" Claim c6 would then cover it (it states only the first two spans).
- Claims: c4 cut to its first clause, now "about as fast as the one before" (the old second sentence is gone), reset to unverified. New c7 (the added-people sentence), unverified. Others unchanged. meta.json version 3.
- Not done, brief owner's: the objective still says 0.87% in 2023 (see v2, W-869).
- Phone fit: tools/reveal-fit.mjs (committed, clean stamp) at 390x844 against dev :3672: fit, crop 0, hidden 0, namedHidden 0, phoneFit true, **90 words** with the wrong-answer verdict "Not quite: it was "About 48 years"." This is the worst case, at the budget limit (artifacts/reveal-fit/w990-hrB-final.json).
- QA contract (QA_BASE_URL=http://localhost:3672): phone and desktop pass (artifacts/qa-w990-hrB). Dev server, not a production build.

## v4 (2026-10-15, demo-builder, branch patience: W-1024, cm-history r1-revision ruling 2)

- meta.json hook "World population doubled in 122 years, then in 48. How long did the next doubling take?" (exact ruling text).
- c6 reworded to "World population doubled in 122 years (1 to 2 billion), then in 48 (2 to 4 billion) (hook)."; support unchanged; reset to unverified. Re-derived from the pinned gapminder-pop-global.csv: first year at or above 1/2/4/8 billion = 1805/1927/1975/2022 (122, 48, 47).
- reveal-fit: 390x844 fit, crop 0, phoneFit true, 90 words; 412x839 fit, crop 4 px, phoneFit false. The 4 px crop at 412 is pre-existing: the same run on the unchanged HEAD files gives crop 4 too (the hook is not part of the stage). Not fixed here; it needs its own item. QA contract: phone and desktop pass.

## Status draft -> review (2026-10-16, demo-builder, branch rome4: W-996, history round-1 batch item 2)
- Flipped on: QA record company/reviews/doubling-stopped-speeding-up/2026-10-16-qa.md (contract phone + desktop, pass, production build of 59df55e); claims 7/7 verified; launch verdict on the current version v3 in company/reviews/doubling-stopped-speeding-up/2026-10-16-learner-adult-beginner-r12.md. Demo.tsx and styles are unchanged since the QA build. No code or claim changed; version stays 3.
