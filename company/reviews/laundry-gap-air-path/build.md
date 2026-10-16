# Build note: laundry-gap-air-path

Kept from evaluators until they report.

## Revision B4 (content patch r2, 2026-10-16, demo-builder)

- Applied by demo-builder on branch lhfix-r2 (batch B4), rows from company/reviews/lifehacks-200/content-patch-2026-10-16-r2.md section 1, every old value asserted against disk before writing. Not merged: the change touches src/lib/lifehacks (tier 2, company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md, awaiting principal-engineer-ops).
- NOT applied (whole row, section 1D). The patch's line needs the shirt count as the slider on a fixed 60 cm rail, gap = (60 − 8n)/(n − 1). home-models.ts case 'gaps' takes the slider as the rail width and the count as a fixed value, so the line needs a new or changed model case in src/lib/lifehacks/home-models.ts (shared Home engine, 69 lessons) plus a cloth picture for a variable count in HomeLesson.tsx. The caller's brief says: stop that row if it needs a shared-engine change. Title, hook and question were not applied either, because they describe the count model ('Hang two more: how much gap is left?') and would be false on the width model. Nothing in this lesson changed; no claim reset.
