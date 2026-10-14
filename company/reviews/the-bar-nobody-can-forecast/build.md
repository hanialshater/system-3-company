# Build note: the-bar-nobody-can-forecast

builder: ncm-e02 (demo-builder) · 2026-10-14 · brief: company/domains/briefs/economics.markets.md #18 (NCM)

- Intent: attendance night by night (the last 40 nights), with a line at 60. Crowded nights use the bad colour and forecast nights are outlined. The forecast chips (50 and 70) add one night each: 100 come, then 0. The 60%-coin buttons (1, +10, +100 nights) add random nights. Readouts show the number of random nights, the average and the crowded share.
- Seeded: mulberry32(1), 100 draws per night. Seed 1 was the first seed I tried, not one I chose. It is disclosed with seeds 2 and 3 in claim c4 (at 100 nights: 48, 38 and 44 crowded). The long-run share of 46.2% is the binomial sum (re-run in node: 0.4621).
- Milestones: "forecast-low", "forecast-high", "mixed-100". QA's one-press-each order reaches all three (1 + 10 + 100 = 111 nights).
- The stage line "night N (…): K came" changes on every press, so a repeated forecast press always changes something.
- The reveal cites Arthur (1994) by name. The E&K chapter is not cited to learners, because the brief asks the fact-checker to confirm its placement first. The title and pages of Arthur's paper are from memory, and the claim says so.
- Not run (per dispatch): next build, QA, walkthrough, tsc.
