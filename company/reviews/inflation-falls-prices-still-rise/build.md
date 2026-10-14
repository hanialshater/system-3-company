# Build note: inflation-falls-prices-still-rise

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #61

- Intent: the basket's price as bars by year 0 to 6, with that year's rate printed above each bar (red, 12px): the rates shrink while the bars grow. Prices printed on year 0, year 5, year 6 and the newest bar (to keep the stage under the word budget). Rule chip: "Each year's rate applies to last year's price."
- Controls (DOM order): [Five years] [Year 6 at 0%] [Year 6 at −1%] presets, then [Step one year] (from year 0; disabled once year 5 or a year-6 preset is shown, so a QA press can never wipe the quoted state).
- Milestones: "five" (year 5 shown, $125.08), "zero" (year 6 at 0%), "negative" (year 6 at −1%, $123.83). Deviation: the brief marks the −1% milestone optional; it is required here because doesNotKnow includes "prices fall only when the rate goes below zero", so the stage must show it (told-vs-shown decision). The 0% result stays visible after −1% as a dashed outline on the year-6 bar and the record line "Year 6 at 0%: $125.08, no change".
- Reveal values are fixed by the model path and gated by milestones; they match the bars' 2-decimal labels.

## Pre-flight v1

1. **Title and hook.** "Inflation is falling. Do prices fall?" / "Inflation drops every year for five years. What happens to what a basket costs?" Questions; no direction or number.
2. **Options.** "less than $100" · "about $108" · "more than $120". All numbered, same precision (dollar thresholds).
3. **Locked stage.** Chip "Each year's rate applies to last year's price.", one bar for year 0 labelled 100.00, empty slots 1-6 with year ticks, row labels rate / price $ / year. No rates, no later bars, no 125.
4. **Reveal values.** "from 8% to 2%": the rate row above bars 1-5, (b) milestone five. "$100 to $125.08": (b) milestone five; bar labels 100.00 and 125.08. "At 0% the price stayed at $125.08": (b) milestone zero; record line "Year 6 at 0%: $125.08, no change" and the dashed outline on the year-6 bar. "At −1% it fell, to $123.83": (b) milestone negative; year-6 bar label.
5. **QA path.** DOM order: Five years (five), Year 6 at 0% (zero), Year 6 at −1% (negative), Step one year (disabled by then, skipped). All three milestones in 3 presses; probe confirmed each press changed the stage and the reveal unlocked.
6. **Reset.** No Reset control. Step is disabled once year 5 or a year-6 case is shown, so no press can remove a quoted state. Reveal text from the QA path: "Inflation fell every year, from 8% to 2%, and the basket still went from $100 to $125.08. Inflation is how fast prices rise, not how high they are, so a falling rate means slower rises. / At 0% the price stayed at $125.08; it did not go back. At −1% it fell, to $123.83: prices fall only when the rate goes below zero. Made-up rates, not a forecast."
