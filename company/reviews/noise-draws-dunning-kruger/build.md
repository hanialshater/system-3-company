# Build note: noise-draws-dunning-kruger

Builder: demo-builder (demo-builder-bigideas-1) · 2026-10-14 · from brief big-ideas.md #4 (simulation run, seeded).

- Model (labelled on the stage line): 1,000 people with real percentiles (i + 0.5)/10; guess = clamp(w × real + (1 − w) × uniform(0-100) + shift), mulberry32(seed). Seed 42 is the brief's check seed, not picked for its result; seeds 43 and 44 give bottom-quarter guesses of 51.8 and 50.1 (disclosed in c1). Seed 42: w 0 → bottom 49.2 (real 12.5); w 0.3 + 15 → 53.2; w 1 → lines coincide; w 1 + 15 → 27.5.
- Picture: the classic chart, mean real score (dashed) and mean guess (solid) per quarter, with the bottom quarter's two values labelled. Nothing is drawn before the first run, so the locked stage shows no line at 12.5. A trace line records "Noise (seed 42): bottom ¼ guessed 49 · Tracking 1: lines met".
- Controls, DOM order: Run (then New run, seed + 1), track 0 / 0.3 / 1 (presets in place of the brief's slider: QA's two presses could not reach both 0 and 1, and the brief's check uses 0.3), +15 (better-than-average shift toggle). The active preset is disabled.
- Milestones: noise (a run at w 0, no shift; bottom guess recorded), meet (w 1, no shift), shift (shift on).
- Reveal (74 words) rewritten from the brief's draft to fit the three milestones and to end on where it stops, naming both sides (c4 artefact, c5 smaller real effect). Tone rule kept: the subject is the chart, not a kind of person.
- Claims c1-c5, all unverified.

## Pre-flight v1

This pre-flight describes the v1 build. Board items W-633 to W-636 (from cm-big-ideas' W-537 re-check) revise these drafts; the builder of each v2 adds `## Pre-flight v2`.

1. **Title and hook.** "A famous chart drawn by dice" / "People guess their own rank at random. What does the chart of their guesses look like?" It says the guesses are random but not where the bottom quarter lands.
2. **Options.** "About the 12th percentile, like their scores" / "About the 50th percentile" / "About the 88th percentile": all numbered, same precision.
3. **Locked stage.** Empty axes (0 / 50th / 100th, four quarters), no lines, no values; stage line "Make a prediction to start."
4. **Reveal values.** "the 49th percentile": (b) milestone noise, recorded, on stage in the trace. "the lines met": (b) milestone meet, on stage in the trace. "lifts every guess": milestone shift, and the stage shows the shifted run on the QA path. Kruger and Dunning and both sides of the dispute: told, claims c3-c5.
5. **QA path.** Run (seed 42, w 0: noise), track 0 (disabled, skipped), track 0.3, track 1 (meet), +15 (shift). Every press changed the stage (own Playwright walk on :3530, before the layout pass).
6. **Reset.** No Reset; "New run" changes the seed but not the recorded value. Reveal on the QA path: "With pure-noise guesses, the bottom quarter still guessed the 49th percentile on average: the famous pattern from randomness alone. When guesses matched skill, the lines met. Kruger and Dunning’s 1999 chart had this shape. A better-than-average shift lifts every guess, so the bottom looks even more overconfident. Where it stops: noise drawing the shape doesn’t prove there is no effect. Some analyses call it mostly a statistical artefact; others find a smaller real effect."
7. **Phone fit.** verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 82 words with the verdict; stage 244 px (picture 121, controls 44, text 47), window 618 px. (The first layout cropped the chart; fixed by one control row, a 136 px chart and a one-line trace.) Measured 2026-10-14 ~17:35 UTC on the shared dev server :3530 with tools/reveal-fit.mjs logic, but run from a scratch copy whose only changes raise the page.goto timeout (30 s → 600 s) and the lesson-render wait (15 s → 900 s): the unmodified tool failed 20+ times on page.goto/render timeouts (the server took 73 s to DOMContentLoaded and 217 s to hydrate). Screenshot artifacts/reveal-fit/noise-draws-dunning-kruger.png. The run measured the files as they stood then, which already included another builder's in-flight v2 edits (none yet; W-636 waits on W-622).
