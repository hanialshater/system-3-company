# Fact-check: towel-thickness-hidden-volume (2026-10-16)

Lesson: src/demos/lifehacks/towel-thickness-hidden-volume/.

## Pass 61 (SO-10-2 [project:lifehacks-engine-v2], batch 2)

Checker: fact-checker, a fresh instance, 2026-10-16. I did not write, build or record these claims (lh-split-order-fixed-fee c5/c6 were recorded by an earlier fact-checker, FC 51, and are held for that reason). Server: http://localhost:3591, /home/user/s3c-qa/.next-review3/BUILT_FROM = 5b2fee71701e8645e3cd6e2fde60bcea004833e8 at start and end; main at 6141f65. R3a scope test (company/reviews/org/2026-10-16-r3a-scope/check.sh) passed 5b2fee7 -> main 2d6b4d5 for this lesson at the start; at 6141f65 it fails only on content/curriculum/history.json (cm-history 8bdf821), which is outside this lesson. Lesson files and src/lib/lifehacks are unchanged 2d6b4d5..6141f65.
Method: artifact first (`npm run walkthrough -- … --url http://localhost:3591`, transcript read to the trust-sheet appendix), then meta.json, then content patch r2 (company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md) row by row, then the engine on main: scripted compare of claim text with studyCatalog.ts / home-lessons.ts / resource-specs.json, and own runs of queueResult, scheduleLayout, calendarResult, homeColumn and homeRevealLine (tsx). Consolidated record: company/reviews/lifehacks-200/2026-10-16-fact-check-so-10-2-batch2.md.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | VERIFIED. Text equals the spec title, hook, question, options, answer 2 (patch r2 1D rows, engine 2). Model: face 2 × 50 × 100 = 10,000 cm² fixed; volume 50 × 100 × t/10 cm³ doubles with thickness, so face per cm³ halves at every slider value (own run at 1, 2, 5 mm: 20/10, 10/5, 4/2). Key 'Half as much' holds; 'twice the water' is stipulated scenario, not modelled. Advisory: the rendered trust sheet still shows 'cm⁻¹' once (formula claim c3, verified earlier), which the patch row asked to keep off screen; that is c3's wording, not this claim's. |
| seen | verified | VERIFIED (derivation). engine-v2 homeRevealLine at the initial p = 2 reproduces the text exactly: '10,000 cm² ... 1,000 cm³ ... 10 cm² per cm³ ... 2,000 cm³, 5 cm² per cm³: half as much'. Recomputes with the slider (walk at 2.2 mm: 1,100 / 2,200 cm³, 9.09 / 4.55), as the claim says. |
