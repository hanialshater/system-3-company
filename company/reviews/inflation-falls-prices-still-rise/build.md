# Build note: inflation-falls-prices-still-rise

builder: wave-j-economics (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.md #61

- Intent: the basket's price as bars by year 0 to 6, with that year's rate printed above each bar (red, 12px): the rates shrink while the bars grow. Prices printed on year 0, year 5, year 6 and the newest bar (to keep the stage under the word budget). Rule chip: "Each year's rate applies to last year's price."
- Controls (DOM order): [Five years] [Year 6 at 0%] [Year 6 at −1%] presets, then [Step one year] (from year 0; disabled once year 5 or a year-6 preset is shown, so a QA press can never wipe the quoted state).
- Milestones: "five" (year 5 shown, $125.08), "zero" (year 6 at 0%), "negative" (year 6 at −1%, $123.83). Deviation: the brief marks the −1% milestone optional; it is required here because doesNotKnow includes "prices fall only when the rate goes below zero", so the stage must show it (told-vs-shown decision). The 0% result stays visible after −1% as a dashed outline on the year-6 bar and the record line "Year 6 at 0%: $125.08, no change".
- Reveal values are fixed by the model path and gated by milestones; they match the bars' 2-decimal labels.
