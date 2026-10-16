### 2026-10-16 · w1588-s4-draw-a-table-knot · design-lead
- did: S4 check of draw-a-table-knot (W-1588): pass with changes D1-D3; accepted ring, 231 px reveal picture, tightened viewBox; W-1590 to demo-builder
- learned: --domain is 2.26:1 on light --bg-3: lesson rings and trace lines in --domain fail in light mode; check every --domain use in a build (company/design/reviews/2026-10-16-draw-a-table-knot-s4.md)
- learned: walkthrough and reveal-fit cover one predict option; reveal slack varied 27-68 px across options and switch results, so probe every variant before ruling on size (company/design/reviews/2026-10-16-draw-a-table-knot-s4/fit-probe.mjs)
- know: fit-probe.mjs takes a CSS override arg: test a proposed fix on the build before writing it as a condition (company/design/reviews/2026-10-16-draw-a-table-knot-s4/fit-probe.mjs)
- know: Worktree scripts: node_modules resolves from the main checkout; the isolation hook refuses node/python with shell variables, so write scripts to files (company/design/reviews/2026-10-16-draw-a-table-knot-s4/fit-probe.mjs)
- open: W-1590 demo-builder applies D1-D3; S4 still due on tricolour-check, unknot-game, left-or-right builds (company/ops/board.json)
