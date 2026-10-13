# Build note: real-effect-missed (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "A rigged coin, 50 flips: caught?" (slug kept; "missed" gave the answer).
- Controls: Run 10 experiments, Run all 100, 50/200 flips toggle. Gate: 100 runs at 50 flips, then the same 100 at 200 flips (counts only after the 50-flip view was reached).
- Experiments are mulberry32(7000+i), 60% heads; the 200-flip run extends the 50-flip run. Seed 7000 was untuned. Stage counts 28/100 (50 flips) and 80/100 (200 flips); across 400 other seed sets: 33.2 +- 4.7 and 85.8 +- 3.5. Reveal quotes the stage counts plus exact rates 33.6% and 86.0%. Disclosed in claims 4 and 6.
- Bars: bar(50)=32, bar(200)=113 computed; fair-coin rates 3.2% and 3.8%.
- Phone screenshot looked at; narrowed histogram range to 40-80% after the first look (bars were too thin).
