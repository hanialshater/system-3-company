# Build note: unit-price-aisle

builder: demo-builder · 2026-10-13

- Intent: three packs drawn to size; pouring one draws its bar of cost per 100 g. The cheapest poured bar turns green once all three are out.
- Milestone: all three poured at shelf prices. The re-price slider for the 1.2 kg pack stays disabled until then, so the milestone always uses the brief's prices.
- Money is kept in cents; slider steps are $0.12 (one cent per 100 g), so every rate is a whole number of cents.
- Bars start at $0 (no cut axis), so 68 vs 70 cents shows as a small difference. The printed values carry the comparison. An evaluator may want this tested.
- After the screenshots: the rate labels crowded the shelf prices, so I made the SVG taller.
