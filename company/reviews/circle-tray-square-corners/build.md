# Build note: circle-tray-square-corners

Kept from evaluators until they report.

## Revision v2 (W-608, engines v2, 2026-10-14, demo-builder)

- engine: 2. Content patch r9 batch D block 3 applied as written (company/reviews/lifehacks-200/content-patch-r9-batch-d.md). Engine changes and W-611 choices: company/reviews/lifehacks-200/engines-v2-build-W-608.md.
- Claims now unverified: c2, c4, recall, c6, seen. New: lifehacks.circle-tray-square-corners.seen (the engine's first reveal sentence). Nothing marked verified.
- Reveal fit 390x844: crop 0 px, hiddenBelow 0 px, namedHidden 0, 65 measured words, phoneFit true (artifacts/reveal-fit/w608-v2*.json).
- QA contract (dev :3530, --timeout=900000 --workers=1): phone and desktop passed (artifacts/qa-w608).

## Fact-check rewording (W-844 (FC38-41), 2026-10-15, demo-builder)

- Question now asks 'how many 10 cm discs fit in this square grid once each is turned 45°?' (src/lib/lifehacks/home-lessons.ts); Seen row label 'Discs that fit' became 'Discs in the grid'.
- Claims reset to unverified: c4, seen. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 67 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
