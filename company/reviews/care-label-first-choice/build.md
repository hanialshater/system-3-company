# Build note: care-label-first-choice

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- Moved to engine 2 because the new options ('None' / 'All 3: dry is dry') cannot be v1 default options (patch does not say engine 2; this is the builder's call). modeLabels 'Hung on the line' / 'Laid flat'; one amount row "Jumpers marked 'dry flat'" = p; resultLabel 'Dried the way the label says'; plainNumbers. Title, hook, question, options replaced; key 'None' (index 0). Reveal at start: 'Hung on the line: 3 jumpers, 0 dried the way the label says. Laid flat: 3 of 3.'
- Added to the W2 inventory and ratchet in tests/lifehacks, version bumped. Reset: c4; new seen claim (unverified).
- Note: meta.misconception ('The fastest-drying method is the best one for every garment.') is not one of the new options (fix plan §3 rule). Not changed by me; for cm-lifehacks.
- QA contract on a release build (NEXT_DIST_DIR=.next-lhfix, QA_PORT=4051, QA_ONLY = the 33 touched lessons, 2 workers): this lesson passed on phone and desktop (74 passed; the only 2 failures were feed.spec "subject chips filter the feed", which compares against the QA_ONLY subset and passes 10/10 when run without QA_ONLY).
