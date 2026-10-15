# Build note: lh-align-price-units

Kept from evaluators until they report.

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- c5 is now definition only: 'A unit price is the cost divided by the stated quantity; compare prices only in the same unit.' (support convention; NIST labelling half dropped). This sentence is not printed on the card; no learner text changed.
- Claims reset to unverified: c5. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 53 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
