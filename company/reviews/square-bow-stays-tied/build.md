# Build note: square-bow-stays-tied

Kept from evaluators until they report.

## Fact-check rewording (W-938 (FC41), 2026-10-15, demo-builder)

- Reveal idea (home-lessons.ts): 'Opposing knot stages make the balanced reef bow lie flat; the granny bow twists out of line. Impact and moving lace ends can work a bow loose.' Recall question and why now say 'twists out of line' / 'lie flat' instead of 'along / across the shoe'. Source now leads with Daily-Diamond et al. 2017 (PMC5415684). Residual for the checker: the shared BowStage picture (src/components/lifehacks/HomeLesson.tsx) still draws the matching bow rotated 90°, i.e. as turned on the shoe; I did not change the shared component.
- Claims reset to unverified: c1, recall. Nothing marked verified; a fact-checker who is not the builder re-checks.
- Reveal fit (tools/reveal-fit.mjs --url http://localhost:3652, next dev, 390x844): fit, crop 0 px, hiddenBelow 0 px, namedHidden 0, phoneFit true, thumb false, 64 tool words (the tool counts the kit's verdict line and trust link as well).
- QA contract (tests/qa/contract.spec.ts against :3652, QA_ONLY = the 15 lessons changed in this pass): phone and desktop passed (30/30 overall, harness stamp clean). npm run check passed.
