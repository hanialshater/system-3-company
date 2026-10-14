# spaced-beats-cram: interaction specification

Owner: interaction-designer · 2026-10-13 · status: implementation handoff

Format: existing **Storyboard / scrub**. Preserve the prepared prediction: three total study hours, either one block or three one-hour sessions, then a one-month retention comparison. No sleep, health, all-nighter or “brain boost” framing.

## One representation and fixed calendar

Use one responsive memory-over-time SVG (360 × 230). The horizontal axis is days; vertical axis is “Model recall”. A solid line and dashed line distinguish A and B independently of colour. Both plans finish studying on day 0. Plan A studies three hours on day 0; Plan B studies one hour on days −2, −1 and 0, matching the builder's acknowledged fixed calendar. The visible study-event symbols sit on the same timeline, not a separate competing diagram. Each B symbol has a small circular recall arrow, and the screen-reader description states that the session starts by recalling earlier material. “Recall, then study” is the visible event caption when that frame is selected.

The scrubber spans day 0 to day 30. Retain study events before day 0 as a compact left context band, clearly outside the 0–30 test interval. The marker at day 1 is “Next morning”; the marker at day 30 is “One month”. Do not shift one plan's final session relative to the other, which would create an unequal test delay.

## Controls in DOM order

Initial current day: 0; both curves visible. All controls exist from first render.

| Order | Visible label | Action and observable response |
| --- | --- | --- |
| 1 | Next morning | Move cursor to day 1, show both readouts, store that frame |
| 2 | One month | Move cursor to day 30, show both, store the frame |
| 3 | Day slider | Range 0…30, step 1; cursor and current readouts change |
| 4 | A | Show solid A curve/readout; B curve becomes muted context |
| 5 | B | Show dashed B curve/readout; A curve becomes muted context |
| 6 | Month: both | Restore equal emphasis, day 30 and both readouts |

Selected plan buttons are active and disabled. “One month” and “Month: both” are disabled only if that exact frame is already current with Both selected. The normal QA presses therefore change day/selection. The slider's QA nudge goes day 30 → day 28; the final month action restores the answer-critical frame after B alone is shown. No gap slider: the brief's conditional “optimal gap” claim is omitted. The builder confirmed this equivalent DOM route; visible “Show A”, “Show B”, or “Month: both plans” wording is acceptable only after recounting the stage.

## States and evidence

Milestones: `morning-compared`, `month-compared`; `minInteractions=2`. Both require the two plan outcomes to be visible together, not merely a hidden cursor value. Store day-1 and day-30 dots once visited, so the reveal can refer to both even if the learner later scrubs.

Use an explicitly illustrative model, not measured percentages or a personalized prediction. The actual percentage formula/parameters belong to a model-assumption claim and must produce the two illustrated contrasts: near-equivalent immediate performance (A may be better), B higher at one month. Do not fabricate percentages attributed to Cepeda or Rawson. The retrieval symbols make the reveal's retrieval sentence something the learner saw, while spacing and retrieval remain distinct sourced claims.

At reveal, preserve both lines, both visited marker pairs, and the current cursor. The normal QA path ends at day 30 with Both selected. A memory chart without study events fails this spec: it shows an outcome but leaves the intervention invisible.

## Stage copy budget

Suggested worst-state vocabulary, 24 words:

> Illustrative model. Three hours each. Recall, then study. Model recall A 20% B 65% Next morning One month Day 30 A B Month: both

Percentages here are placeholders for layout, not specified empirical values. Use `?` while locked. The text printed inside the SVG, controls, range label/output and readouts all count toward the budget. If “Day” axis ticks duplicate the slider's current-day label, remove the duplicate words. Use tick numerals without repeated “day” labels.

## Proposed reveal body

> Both plans used three hours. At the next-morning marker, cramming looked competitive. At one month, the spaced plan's model recall was higher.
>
> The curves are illustrative, not a forecast for you. Research on verbal recall supports better long-term retention from spacing. In Plan B, each later session starts with retrieval: try recalling first, then check what you missed.

Keep the body and kit verdict together under 90 words. Record the spacing, immediate-test and retrieval claims separately using the prepared sources; do not cite Cepeda for the immediate-test result. If the retrieval source check fails, use the prepared brief's fallback wording and revise the retrieval-specific claim rather than asserting verification.

Mockup request: one timeline/chart with solid/dashed curves, recall-arrow event marks at −2/−1/0, and stored day-1/day-30 comparison dots. No brain imagery or “boost” graphic. Layout reference: `lifehacks-phone-wireframes.svg`.
