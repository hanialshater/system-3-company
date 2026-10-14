# gen0-baseline

- Idea: the baseline. A dart-model PD core; face-based Reidemeister moves; exact invariants (Fox colourings by diagonalisation, Bareiss Alexander, a 2^n bracket state sum, Gordon-Litherland signature); circle-packing layout with a Tutte fallback; a greedy-then-search simplifier.
- Parents: none.
- Expect: 93/93 tests. Gated out on size: the raw closure is 12,815 B gzip against 10240 (see ../../README.md, "Evolution").
- Weakest areas: layout of non-reduced diagrams (Tutte fallback 40/70), hard unknots (Gordian 17 %), Jones at 20+ crossings.
