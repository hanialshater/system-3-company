# Build note: two-colours-enough (demo-builder, 2026-10-13)

- Intent: one page, three fixed straight lines (chosen so all three crossings fall inside the page: 7 pieces; node check). Pieces come from half-plane clipping; each piece's colour is the parity of the flipped lines it lies beyond. Six step chips in pairs: "Draw line k" then "Flip one side", only the next enabled.
- A newly drawn line flips nothing, so pieces across it share a colour: the line is drawn red dashed and the Clash readout says "along line k". "Flip one side" adds that line to the parity and the clash disappears. The learner sees this three times.
- Key state (one milestone): line 3 drawn and flipped, 7 pieces, 2 colours, no clash. QA's in-order path ends there; the reveal's numbers (lines, pieces, colours) come from pieces().
- c4 separates this from the four colour theorem (curved borders can need up to four).
- The brief let the learner draw their own lines; the lines here are fixed so the counts are reproducible and every crossing is inside the page.
- All claims unverified, for the fact-checker.
