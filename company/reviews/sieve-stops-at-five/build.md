# Build note: sieve-stops-at-five (demo-builder, 2026-10-13)

- Design intent: one 6-column grid of 2..30, every number a button. Tapping n crosses out its multiples (2n, 3n, ...) and rings n. Crossed numbers are disabled. A readout counts non-primes not yet crossed (19 at start). A tap that crosses nothing still changes the stage: the number is ringed and the line says "7: 14, 21, 28 already crossed. Nothing new." Once the count is 0, uncrossed numbers get a domain outline (the primes).
- Brief conflict resolved: the brief wanted "tapping does nothing visible" for 7; QA rule 3 forbids a press with no visible change, so the empty tap is shown by the ring and the message instead.
- Key state: count 0 (after 2, 3, 5), then a tap that crossed nothing new. Milestones ["clean", "nothing-new"], minInteractions 2. QA path: 2, 3, (4 disabled), 5, 7 (nothing new), 11, 13, 17.
- Numbers: 5, 6 × 6 = 36, 10 primes and the "already crossed" list come from NUMS/multiples()/PRIMES in Demo.tsx. Node check: survivors 2..29, 10 of them.
- Retitled: slug says "stops at five"; title "How far must the sieve go?". "Square root" is glossed in the reveal ("the number that, times itself, reaches 30").
- After screenshots: grid fits on phone (40 px cells); no layout changes.
