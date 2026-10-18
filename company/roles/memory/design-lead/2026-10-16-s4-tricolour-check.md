### 2026-10-16 · s4-tricolour-check · design-lead
- did: S4 of tricolour-check: pass with changes D1 (one-line row at 360) and D2 (height-aware board floored at 254 px); accepted loopOne trigger, row hide at reveal, labels, crossing rings; W-1601 to demo-builder
- learned: A height-aware clamp has a floor set by the in-SVG text: floor px = 10 x viewBox width / text units; here 254 px, so 360x640 cannot reach 0 overflow (company/design/reviews/2026-10-16-tricolour-check-s4.md)
- learned: At 360 wide a five-control row wraps (309 px needed vs 290); measure row widths before shrinking the picture (company/design/reviews/2026-10-16-tricolour-check-s4/row-probe.mjs)
- know: geom-probe.mjs measures T3a label distance, label-to-ring clearance and glyph-to-strand clearance from the built DOM; reuse it for unknot-game/left-or-right (company/design/reviews/2026-10-16-tricolour-check-s4/geom-probe.mjs)
- know: The stage window at 360 wide is 100dvh - 381 px in this kit build; the panel hint wraps per predict option, so probe every option (company/design/reviews/2026-10-16-tricolour-check-s4/fit-probe.mjs)
- open: W-1601 demo-builder applies D1-D2; S4 still due on unknot-game and left-or-right; grey C and 360x640 row discovery to learner review (company/ops/board.json)
