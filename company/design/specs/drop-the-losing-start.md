# Spec: drop-the-losing-start

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #20 · wireframe: `drop-the-losing-start.svg`

**Format: Storyboard, stepped** (the brief's Storyboard / scrub, with the scrubber replaced by day steps). It is a process over nine days, and the payoff is *when* to act: the moments the running total goes below zero. The learner walks day by day and decides at those moments. A scrubber would let the line be drawn without any decision, and QA cannot drag it to day 9.

## Designer's node check (2026-10-14, re-run of the brief)
Days: `-2 1 -3 4 -1 2 1 -5 4`.
- One pass, start over whenever the total is below 0: totals `-2 | 1 -2 | 4 3 5 6 1 5`, with start-overs after day 1 and after day 3. Best **6**, days 4–7 (4 − 1 + 2 + 1).
- Never start over: `-2 -1 -4 0 -1 1 2 -3 1`. Best **2**.
- Start over after day 1 only: best 4 (days 2–7).
- All start–end pairs: 9 × 10 / 2 = **45**, best **6**, days 4–7, and it is the only stretch at 6. The sum of the positive days is 12 (distractor C).
The brief is correct.

## Stage at 390×844 (~300 px at predict, ~540 px in explore)
1. Model line (muted): "Running total of consecutive days. Start over drops the stretch so far." (12 words)
2. **Day strip**: 9 tiles of 36 px, each with its gain (negative in `--bad` text with a minus sign, positive in `--fg`). The current stretch is bracketed above the tiles. Dropped stretches are greyed with a small "dropped −2" under them.
3. **Chart**, full width × 170 px. x: "Day" 0–9. y: "Total", **fixed −6 to +12** (ticks −4, 0, 4, 8, 12). It never auto-scales, so neither the axis limits nor the ticks hint at 6, and 12 (option C) is in range. Two lines:
   - "Kept everything" (dashed `--muted`): the plain running total, never starting over;
   - "Your total" (solid `--fg`): with each start-over drawn as a vertical drop to 0, labelled by what was dropped.
   The best so far is a dot on your line with its label (e.g. "Best 4, day 4") in a right-hand gutter (≥ 40 px). The dashed line's best has no label (it is shown only as the line).
4. Readouts: "Day 0 · Total ? · Best ?" while locked.
5. **Stretches panel** (hidden until control 6): a lower-triangle grid, 9 × 9 cells of 18 px (45 cells). Cell (start, end) holds the sum of that stretch, shaded by value with the number printed. The largest cell is outlined, and the cell matching your best is ringed. Caption: "45 stretches checked".

Stage words: model line 12 + "Day" "Total" "Kept everything" "Your total" "45 stretches checked" = 21 (numbers and readouts not counted).

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control `.tap` | "Walk again" | keeps your last walk as a thin `--muted` line labelled "walk 1: best 4", and goes back to day 0 with the same days. Disabled until a walk has reached day 9, so QA (which presses it first) skips it, and the QA path never ends on an emptied chart |
| 2 | Control `.tap` | "Next day" | adds the next day to both lines. Disabled at day 9 |
| 3 | Control `.tap` | "Start over" | drops the current stretch: your total goes to 0, and the next day starts a new stretch. Enabled whenever your total is not 0 and the day is 1–8. Pressing it at a positive total is allowed, and the dashed line then shows what that cost |
| 4 | Control toggle `.tap` (`aria-pressed`) | "Auto: start over below 0" | off at start. When on, any day that leaves your total below 0 is followed by a start-over, drawn exactly like a manual one with the label "auto". The toggle's pressed state and the bracket rule change on press |
| 5 | Control `.tap` | "Play to day 9" | adds the remaining days one by one under the current rule (≤ 45 ms per day, ≤ 400 ms; instant under reduced motion). Disabled at day 9 |
| 6 | Control `.tap` | "Check all 45 stretches" | enabled at day 9 if the walk made at least one start-over. Fills the triangle (≤ 400 ms) and rings the cell matching your best. One-shot per walk |

On jumps: "Play to day 9" draws every day and every start-over on the chart, and the result depends on the learner's own rule. With auto off and no start-overs it ends at best 2, not 6. "Check all 45" is the slow method from the misconception, offered only after a walk is finished, as the check against it. The toggle states the rule the brief's key state already gives the learner ("start over whenever it went negative"). What the learner discovers is that this rule never loses the best stretch: their line ends above the dashed one, and their best matches the 45-stretch check.

QA path (Walk again is disabled and skipped): Next day (day 1: −2 on both lines) · Start over (your total 0; "dropped −2") · Auto on · Play to day 9 (day 3 leaves −2, auto start-over; days 4–7 climb 4, 3, 5, 6; best 6, days 4–7; the dashed line tops out at 2) · Check all 45 (the outlined maximum is the ringed cell: days 4–7, 6). Both milestones are reached.

## States
- **Predict:** the day strip with all nine gains (the question needs them), an empty chart with fixed axes, readouts "Day 0 · Total ? · Best ?". No best marker, no triangle. Controls disabled.
- **Explore, day 1:** both lines at −2. After Start over, your line drops to 0 and the strip shows "dropped −2".
- **Days 2–3:** your line goes 1, −2; the dashed line goes −1, −4. A second start-over (manual or auto) drops your line to 0 again.
- **Days 4–7:** your line climbs to 6 while the dashed line reaches only 2. The gap between them is exactly what was dropped (4).
- **Day 8:** −5 takes your line to 1, and the best dot stays at 6.
- **A walk without start-overs** ends at best 2. "Walk again" keeps it as the ghost "walk 1: best 2", so the comparison stays on the stage.
- **Reveal:** stage unchanged: both lines, any ghost walks, and the triangle with the matching ring. Reveal text (≤ 90 words), built from the learner's start-over log: "You dropped −2 after day 1 and −2 after day 3, then days 4 to 7 climbed to 6. The line that kept everything never got above 2. A stretch that has gone negative can only drag down what follows, so dropping it never loses the best. Your one pass over 9 days found the same 6 as checking all 45 stretches. This is Kadane's algorithm."
  The "after day N" phrases come from the walk the stage shows; "manual" or "auto" does not change the wording.

Milestones (`minInteractions=2`): `best-found` (a walk reaches day 9 with your best equal to the 45-stretch best; computed, not shown before the reveal), `checked` (the triangle filled for that walk). A walk that ends lower does not unlock the reveal, and the hint line says "Your best is 4. Walk again?". The hint never names the target.

## Shown, not told
The learner sees each dropped stretch as a vertical drop. Their line then runs above the dashed line by exactly the dropped amount, and their best matches the brute-force triangle's maximum, ringed in the same cell. "One pass replaces 45 pairs" is the visible contrast between nine day presses and a 45-cell triangle. The reveal only names it (Kadane).

## Colour and access
Your line `--fg` 2.5 px solid; kept-everything `--muted` dashed; ghost walks `--muted` 1 px. The drops have text labels ("dropped −2", "auto"), so line style and labels carry the meaning, not colour. Negative gains carry a minus sign as well as `--bad` text. Triangle shading uses lightness of `--domain` with the printed number in every cell; the maximum has a 2 px `--fg` outline, and your-best has a ring (a different shape). Chart `aria-label`: "Day 9: your best 6, days 4 to 7; kept everything best 2". Controls 44 px (`.tap`) in two rows of three. No illustration (CS).
