# Build note: ray-counts-crossings

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. A grid from -0.5..8.5 by -0.5..6.5 holds the U polygon. Drag anywhere on the SVG (pointer capture, touch-action none) or tap a preset: (1,4), (3,4), (5,4), (3,1), (7,4); the point starts at (7,4). A dashed ray runs right, crossed edges thicken, and the crossings are numbered along the ray. The note and readouts give the count, its parity and the verdict. Dragging snaps to a half-unit grid, moves y off the corner heights 0, 2 and 6, and moves points off the boundary. Milestones: inside-odd, notch (point strictly inside the notch).

## Answers re-run in node
- (3,4) 2, (1,4) 3, (5,4) 1, (3,1) 1, (7,4) 0 - all match the brief.

## Known gaps
- touch-action: none on the SVG means a swipe that starts on the stage will not scroll the feed.
- The Jordan curve, Shimrat and Haines citations come from the brief and have not been opened. All claims are unverified.
