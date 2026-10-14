# Build note: the-long-tail-adds-up

builder: ncm-p1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Five bars give the share of all sales for each tenfold range of ranks (1–10, 11–100, 101–1k, 1k–10k, 10k–100k) under sales ∝ 1/rank over 100,000 items. A slider sets the hit cutoff ("the top 1 / 10 / 100 / 1,000 / 10,000 items"). The part of each bar inside the top N is coloured and the tail part is pale. Readouts: the top N share, the other items' share, and what item N+1 sells relative to #1. Bars and shares are hidden until the prediction. It starts at the top 10, so two slider presses reach 1,000. Milestones: moved, top-1000.

## Answers re-run in node
- Harmonic sums: top 1 8.27%, 10 24.23%, 100 42.91%, 1,000 61.91%, 10,000 80.96%. Decades: 24.23, 18.68, 19.01, 19.04, 19.04 %. Matches the brief.

## Choices
- The "why" on the stage is the flat decade bars. Each tenfold range sells about ln 10 / H(100,000) ≈ 19%, so the 99,000 tail items fill two bars as tall as the hits' second bar.
- Anderson attribution (c5) is in the reveal as the brief planned; it needs the fact-checker.

## Known gaps
- The slider is coarse (powers of ten). Finer cutoffs would split bars, which the code supports, but the stops keep to round numbers the learner can feel.
