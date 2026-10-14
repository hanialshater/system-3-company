# Build note: every-scale-equally-likely

builder: ncm-p1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Bar chart of the share of long links landing in each doubling band of ring distance (1, 2–3, 4–7, …, 128–255, 256–512) on a ring of 1,024. Rule buttons Uniform / Chance ∝ 1/d / Chance ∝ 1/d² redraw the bars; a Band slider highlights one band and the readouts show how many distances it holds, how likely each is relative to d = 1, and the band's share. That pair of readouts is the "why" (twice the distances, each half as likely). Bars and shares are hidden ("?") until the prediction. The stage starts on 1/d² so the first press of each rule changes the picture. Milestones: q0, q1, band.

## Answers re-run in node
- Exact sums, 2 people per distance below 512 and 1 at 512. 1/d: 14.7, 12.2, 11.1, 10.6, 10.4, 10.3, 10.2, 10.2, 10.2 %. Uniform: last band 50.1%. 1/d²: distance 1 gets 60.9%. Same as the brief.

## Choices
- The brief's "2–4 vs 256–512" became "2–3 vs 256–512" so the question names a stage band exactly (bands are [2^k, 2^(k+1)), the last includes 512). Answer unchanged: about equal (12.2% vs 10.2%).
- Tick labels show each band's lower bound only (labels like 256–512 would collide at 390 px); the slider and readouts give the full band.

## Known gaps
- No sampling; this is an exact calculation. That fits the single-card format the brief names.
- c5 (why it gives fast search) cites E&K ch. 20 and Kleinberg 2000 from the brief; it is unopened.
