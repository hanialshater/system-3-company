# Build note: ways-to-make-ten

builder: algo-pair-00 · 2026-10-14 · status: draft (kept from evaluators until they report)

Built from the brief (cs.algorithms.md #19) and the spec (company/design/specs/ways-to-make-ten.md).

## Decisions
- The brief's 33 cell taps are replaced, as the spec and the task say, by one fill button per coin row plus "Fill one cell" for the cell-by-cell view. Five controls, all present at first render, disabled while locked or while a row is filling.
- Row fills run at 35 ms per cell (about 350 ms for a row); instant under reduced motion. Row buttons enable in order (1-coin row, then 2, then 5), so none can show the 10 cell without the rows that make it.
- "Let order matter" fills the any-order row cell by cell (arrows from 1, 2 and 5 to the left) and switches the mix strip to total 3: table 2 ways, any order 3 ways, with 2+1 dashed and captioned.
- Milestones `ten-filled` (all three coin rows full), `orders-counted` (any-order row full); `minInteractions=2`. The reveal quotes 6 + 4 = 10 and 128, both reached.
- The table is one SVG with an aria-label for the last filled cell, not a real `<table>` as the spec suggests: arrows need exact cell geometry. Deviation recorded; a visually hidden table could be added if accessibility review wants it.
- The "?" in the 10 cell stays until it is filled.
- Coin glyphs differ by size and printed value (the 1 coin in the mix strip is too small to print a value; it is the smallest disc).

## Node check (re-run)
Rows: 1 1 1 1 1 1 1 1 1 1 1 / 1 1 2 2 3 3 4 4 5 5 6 / 1 1 2 2 3 4 5 6 7 8 10; any order 1 1 2 3 5 9 15 26 44 75 128. Matches the spec.

## QA path
Fill one cell -> Fill the 1-coin row -> Add the 2-coin row -> Add the 5-coin row -> Let order matter. Both milestones are reached.

## Open items
- All claims `unverified`. c5 cites CLRS ch. 15 and Polya 1956 per the brief; the verifier should locate the exact passage.
- Recall question is mine (the brief has none).

## Checks skipped
Build, QA, walkthrough and full typecheck were not run on the final code (machine out of memory; coordinator instruction). An earlier tsc run passed. npm run check passes. The chief of staff runs the integrated pass.
