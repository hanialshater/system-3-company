# Fact-check: lh-split-order-fixed-fee (2026-10-16)

Lesson: src/demos/lifehacks/lh-split-order-fixed-fee/.

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | held (unverified) | HELD UNVERIFIED (SO-10-2 stop-if, W-1108 class), not disputed. The text was recorded by a fact-checker (FC pass 51), and SO-10-2 says to stop on such claims, so this run does not verify it. My independent derivation, for whoever W-1108 is dispatched to: the hook matches resource-specs.json and the render; with goods €24 and €4 per order, totals are 24 + 4n, so 1 order €28, 2 orders €32: the same goods give different totals when the fee repeats. Nothing against it. |
| c6 | held (unverified) | HELD UNVERIFIED (SO-10-2 stop-if, W-1108 class), not disputed. Recorded by a fact-checker (FC pass 51). Independent derivation for W-1108: question, options and answer 1 match resource-specs.json and the render; split (2 orders) 24 + 4 × 2 = €32, combined 24 + 4 = €28 (walk: A €32.00, B €28.00), so 'Combined' is the only true option; 'Equal' holds only at 1 order, which the question excludes. |
