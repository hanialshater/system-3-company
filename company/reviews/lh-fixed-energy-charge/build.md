# Build notes: lh-fixed-energy-charge

## 2026-10-15 v2 (demo-builder, fix plan W6/W7, TP-7 and TP-8)

- Kept from evaluators until they report (company/reviews/README.md).
- Stage: `display: "plain"` in resource-specs.json: readouts in words (no ceil, floor, min, max or sqrt), money to 2 decimals, no "Full scale" label, word units spaced. Slider text through `resourceVariableText`.
- Prediction (plan line, not reworded except where noted in the claim source): "Halve your usage. Does the bill halve?" options ['No: the fixed charge stays', 'Yes'], answer index 0 ("No: the fixed charge stays").
- Hook: "Halve your usage. Does the bill halve?". Title: "The fixed charge changes the bill".
- Claims reset to unverified (fact-checker re-verifies): c2, c7, c8.
- Local QA: tests/qa/contract.spec.ts, phone and desktop, passed 2026-10-15 against a local build of branch lh-res.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Title, hook, question, options, answer replaced (1A, FC38 c8, W-1106). Key '€14' (index 2). Formula A: 20 × 0.20 + 10 = 14; 40 × 0.20 + 10 = 18; 20 and 40 kWh are slider stops. c6 unchanged and held.
- Reset: c7 (hook), c8 (question/options).
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
