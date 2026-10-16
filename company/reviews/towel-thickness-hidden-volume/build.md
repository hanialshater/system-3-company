# Build note: towel-thickness-hidden-volume

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Moved to engine 2 (1D; patch: resultLabel 'Open face per cm³ of cloth', no cm⁻¹). Builder stage choices: modeLabels 'Single thickness' / 'Twice as thick'; amounts Open face (2×a×b = 10,000 cm²) and Cloth volume (a×b×p/10, doubled in B); resultUnit 'cm²' (read as cm² per cm³); plainNumbers; revealLine ends 'half as much' (true at every slider value: the model ratio is always 2). Title, hook, question, options replaced; key 'Half as much' (index 2). Reveal at start: 'Single thickness: 10,000 cm² of open face on 1,000 cm³ of cloth, 10 cm² per cm³. Twice as thick: the same 10,000 cm² on 2,000 cm³, 5 cm² per cm³: half as much.'
- Added to the W2 engine-2 inventory (tests/lifehacks/engines-v2.test.mjs) and the W2 every-step ratchet (home-v2.test.mjs). version bumped.
- Reset: c4; new seen claim (unverified). c1 idea still says 'area-to-volume ratio' and the recall says 'ratio' (not in the patch; flag for cm-lifehacks).
- Own screenshot (phone): the v1 cloth picture only thickens the strip slightly in B; a beginner may not see 'twice as thick' in the drawing. The numbers carry it. Picture improvement needs HomeLesson.tsx (shared), not done.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
