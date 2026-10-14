# Build note: which-sea-gets-the-rain (v1, demo-builder, 2026-10-14)

Kept from evaluators until they report. Brief: company/domains/briefs/geography.earth-climate.md, Wave J #1.

- Model: `model.ts` is a line-for-line port of section `watershed` of company/domains/briefs/checks/geography-wave-j.mjs (same mulberry32 seed 7, same sort-based priority flood, same D8 exit rules). Re-run in node 22 with type stripping: 764 of 960 east (79.6%), 284 nearer-west squares drain east, dot (10, 12) ends east after 30 squares, (5, 12) ends west. Identical to the check.
- Deviation from the brief, on purpose: the second button reads "Rain at a second spot" while the stage is locked and "Rain west of the ridge" after the commit. The brief's label, visible on the locked stage, names a ridge and implies the dot is not west of it, which points at the answer (demo-standard, "No answer before the commit").
- The model's north and south edges are cliffs (no outflow), so the picture shows sea only to the west and east; the land runs to the top and bottom of the picture.
- Reset clears the colours and turns the paths and the divide into faint dashed traces; a "Seen:" line also keeps what was found ("dot → east · west drop → west · 80% east"), so the reveal still matches the stage.

## Pre-flight

1. Title and hook: "Which sea gets the rain?" / "Rain falls on an island between two seas. Which one does it end up in?" Neither names a side or a distance rule.
2. Options: "The west sea" / "The east sea" / "Neither: it soaks in on the way". None numbered; same precision.
3. Locked stage: flat land rectangle, the dot, "West sea" and "East sea" strips (two lightness levels of one hue), the distance line "55 km" / "150 km" (both stated in the question), caption "Made-up island; 1 square = 5 km". No relief, ridge, divide or path. Button labels: "Rain at the dot", "Rain at a second spot", "Colour land by its sea", "Reset".
4. Reveal values: 150 km and 55 km are the question's own fixed case (constants of the toy, drawn on the stage at all times); "ran east" is gated by milestone `dot`; "your drop west of it ran west" by milestone `west`; "four fifths (80%)" by milestone `divide` (eastPct, computed from the model, same rounding as the stage label).
5. QA path: DOM order is dot, west, colour, Reset; pressing each once reaches `dot`, `west`, `divide` (3 = minInteractions). Each button disables itself once shown, Reset is disabled until something is shown.
6. Reset: after Reset the picture keeps the relief plus dashed traces of both paths and the divide, and the Seen line reads "Seen: dot → east · west drop → west · 80% east"; the reveal sentences still match.
7. Phone fit (tools/reveal-fit.mjs, 390x844, shared dev server :3530, 2026-10-14): 82 words; stage-top crop 0 px; hiddenBelow 0; namedHidden 0 (named: 'west sea', 'east sea' visible); phoneFit true. Points at: the dot's path (trace), the ridge (relief), the divide (trace), 80% (Seen line).

reveal-fit note: run through a preload that only raises Playwright's default navigation and waitFor timeouts (the shared dev server took 30 to 240 s a page); the tool's measuring code was not changed.

## Local QA (2026-10-14)

`QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J geography slugs> QA_OUT=artifacts/qa-wavej-geography npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=900000`. The `--timeout` flag is a time budget only, because the default 45 s test timeout expired in `page.goto` on the shared dev server in every run. No check was changed. Reports: artifacts/qa-wavej-geography/qa-report-5lessons.json (9 of 10 passed; the one failure was which-sea-gets-the-rain on desktop, a React "state update on a component that hasn't mounted yet" console warning, the dev-server Fast Refresh noise also seen in other wave J runs), qa-report-which-sea-rerun.json (phone and desktop pass), qa-report-which-way-rerun.json (phone and desktop pass, after the v1 sea-rectangle fix). No QA record was filed with `company qa-record`; that belongs to qa-tester.

## Revision v2 (demo-builder, 2026-10-14, wave-J fact-check disputes)

Fact-check 2026-10-14 recorded the recall as unrecorded claim c5 (W-710): it holds only if the country is wider than about 40 km. The recall question now reads 'A country is 300 km wide, with a ridge 20 km from its west coast. Most of its rain probably reaches which coast?' and the why ends '...and that is 280 of the 300 km.' c5 rewritten and reset to unverified. The claim also records that rain is assumed to be spread evenly, as on the stage ('probably' carries this). A fact-checker other than the one who recorded c5 should check it.

Local checks, 2026-10-14, own dev server :3600 (worktree, NEXT_DIST_DIR=.next-fix): computer-use QA (unmodified tests/qa/contract.spec.ts, QA_OUT=artifacts/qa-wj-disputes) phone and desktop pass for all 8 wave-J dispute lessons; npm run check passed; tsc --noEmit clean. No stage change, so reveal-fit was not re-run.
