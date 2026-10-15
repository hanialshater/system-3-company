# Build note: lh-big-pack-price

Kept from evaluators until they report.

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- c5 is now definition only (same wording as lh-align-price-units c5, support convention). Not printed on the card; no learner text changed.
- Claims reset to unverified: c5. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 49 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
