# Spec: spaced-beats-cram

owner: interaction-designer (Rafael) · 2026-10-13 · status: draft, for design review · brief: `company/domains/briefs/lifehacks.md` #2 · wireframe: `spaced-beats-cram.svg`

**Format: Storyboard / scrub.** The idea is a process over a month, and the payoff is a reversal between two moments: the cram is ahead (or level) the next morning and far behind a month later. A scrubber lets the learner *walk* the calendar; two key-frame buttons land exactly on the two test days.

## Calendar (fixed, shown on the axis)
Day axis 0 to 34. Plan B studies 1 h on days 0, 2 and 4. Plan A studies 3 h on the evening of day 4. Test markers: **"Next morning"** at day 4.5 and **"A month later"** at day 34 (30 days after the last session). The brief's "day 0 to 30" becomes 0 to 34 so both plans end on the same night; the "month" is counted from there.

## Stage at 390×844 (~330 px at predict, ~480 px in explore)
1. Model line (muted): "Illustrative model, not your memory. Same 3 hours." (8 words)
2. **Memory chart**, full width, ~230 px. y: "Remembered" 0–100%. x: "Day" 0–34. Study sessions as small blocks under the axis (A: one 3 h block on day 4; B: three 1 h blocks). Two dashed vertical test markers with labels. Curves draw **only up to the cursor** (the scrubber), so the learner watches each one fall. At each B session after the first, the curve shows a small "recall" dot (value before relearning) and then the jump: the session starts by recalling, not rereading (brief requirement).
3. Cursor: a vertical line with a value tag on each curve: "A 81%", "B 78%".
4. Controls, then `Row` of `Readout`s: "Day" (e.g. "4.5: next morning"), "Plan A", "Plan B" (integer %).

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Slider | "Day" 0–34, step 0.5, starts at 0 | moves the cursor; curves draw to it |
| 2 | Control | "Next morning" | sets Day = 4.5 |
| 3 | Control | "A month later" | sets Day = 34 |
| 4–6 | Control chips | "Plan A: cram" · "Plan B: spaced" · "Both" (group "Show") | start: Both active (disabled, `className="active"`) |

QA path: slider → day 1 · Next morning (milestone 1) · A month later (milestone 2) · Plan A · Plan B · Both. Stage at the reveal: both curves drawn to day 34, cursor on the month marker. All controls render at first paint, disabled while `locked`.

## Model (illustrative, the builder checks it in node and records it as a claim)
Retention after a session: R(t) = peak / (1 + t / S). Suggested: A peak 100, S 2 days. B peak 80 each session, S 2 → 5 → 20 days. Required shape, whatever the numbers: at day 4.5, **A ≥ B** (within 5 points); at day 34, **B ≥ 4 × A**; the recall dot before each B session is visibly above 30% ("forget a little"). Builder records final values; the reveal quotes them.

## States
- **Predict:** axes, session blocks, both test markers, cursor at day 0, no curves, readouts "?".
- **Explore:** dragging shows B rising in three steps while A is flat at 0 until day 4, then A jumps to 100.
- **Next morning:** A 81%, B 78%: the cram looks fine, slightly ahead (the twist, Rawson & Kintsch).
- **A month later:** A 6%, B 32%. Both have fallen; A has almost vanished.
- **Reveal:** stage unchanged. Reveal quotes both readings: "Next morning you saw A 81%, B 78%. A month later, A 6%, B 32%."

Milestones (`minInteractions=2`): `next-morning` (cursor = 4.5), `month-later` (cursor = 34). Reached by slider or button.

## Shown, not told
The learner holds the cursor on the morning when cramming *wins*, then moves it and watches the lead flip. The reveal's "same hours, different calendar" names the two session rows they have been looking at.

## Colour and access
A = `--domain` (apricot) **dashed** line, labelled "A" at its end; B = `--accent` (blue) **solid**, labelled "B". Letters and dash pattern carry the difference, not hue. Test markers `--muted`. No `--bad` for cramming (no judgement colour). Controls min-height 44 px; slider 28 px high inside a 44 px row. Percentages are integers.

## Illustrations
Hero 1:1: predict phase only, a 96×96 slot at the top right of the stage next to the model line; removed on unlock. No other images. Render only once accepted (a 404 fails QA).

## Safety copy guard (from the safety review)
No sleep, all-nighter or "brain boost" words anywhere on the stage, including axis labels ("evening", not "all night").
