# Build note: edges-are-differences

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. Six grey pixels are drawn in their own brightness, with a 3-pixel window carrying the weights -1 0 +1. Each inner pixel has an output box that shows "?" until the window has sat there. Controls in DOM order: Next pixel (wraps to 2), Slide to the end, Swap bright and dark, then a window-centre slider (2-5). Milestones: step-found (a nonzero output seen), all-four.

## Answers re-run in node
- 200 200 200 10 10 10 -> 0, -190, -190, 0. Swapped -> 0, 190, 190, 0. 0 0 0 9 9 9 -> 0, 9, 9, 0.

## Known gaps
- The pixel greys are fixed rgb colours, not theme variables, by design; the value text switches between black and white by brightness.
- "Convolution" is strictly correlation for an unflipped window (noted in c3). The Gonzalez and Woods citation has not been opened. All claims are unverified.
