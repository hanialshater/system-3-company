# Build note: why-the-poles-get-less-sun (v1, demo-builder, 2026-10-14)

Kept from evaluators until they report. Brief: company/domains/briefs/geography.earth-climate.md, Wave J #4.

- Yearly shares computed in Demo.tsx with the check's method (section `insol-annual`, 3,600 steps, circular orbit) and re-run in scratchpad insol.mjs: 100, 88 (30 N, start), 67, 57, 41% (0.4147).
- Extra distance readout: R (1 - cos lat) along the Sun line at equinox, shown in km and as % of 1 AU to 3 decimals (pole 6,371 km, 0.004%).
- The beam band is a fixed 22 px at every latitude; the red arc is the ground it lands on. At the pole the upper half of the band misses the Earth and the rest grazes it ("grazes the ground"); elsewhere the label gives the spread factor 1/cos(lat).
- Only `eq` and `pole` are milestones (as the brief says); 51.5 and 60 N are free presets.

## Pre-flight

1. Title and hook: "Why do the poles get less sun?" / "The North Pole gets less sunlight in a year than the equator. What causes the gap?" Says less, but not how much (the question asks how much).
2. Options: "About 99%" / "About 10%" / "About 40%". All numbered, same precision.
3. Locked stage: Earth side view, the band at 30 N with the "same beam" label, marker "30° N", caption; readouts show "—"; no spread label.
4. Reveal values: 41%, 6,371 km and 0.004% are recorded when milestone `pole` fires (the same strings the readouts print at the pole); "less than 0.01%" is a fixed derivation (claim c3).
5. QA path: Equator (eq), 51.5, 60, North Pole (pole): both milestones within 4 presses. Each preset disables itself while shown; the start, 30 N, is not a preset.
6. Reset: no Reset in the brief. If the learner ends on another preset, a "Seen at the pole: 41% of the equator's year, 6,371 km (0.004%) farther." line keeps the quoted values on the stage.
7. Phone fit (tools/reveal-fit.mjs, 390x844, shared dev server :3530, 2026-10-14): 63 words; stage-top crop 0 px; hiddenBelow 0; namedHidden 0 (named: 'same beam', '41%' visible); phoneFit true. Points at: the beam band, the lit arc and both readouts.

reveal-fit note: run through a preload that only raises Playwright's default navigation and waitFor timeouts (the shared dev server took 30 to 240 s a page); the tool's measuring code was not changed.

## Local QA (2026-10-14)

`QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J geography slugs> QA_OUT=artifacts/qa-wavej-geography npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=900000`. The `--timeout` flag is a time budget only, because the default 45 s test timeout expired in `page.goto` on the shared dev server in every run. No check was changed. Reports: artifacts/qa-wavej-geography/qa-report-5lessons.json (9 of 10 passed; the one failure was which-sea-gets-the-rain on desktop, a React "state update on a component that hasn't mounted yet" console warning, the dev-server Fast Refresh noise also seen in other wave J runs), qa-report-which-sea-rerun.json (phone and desktop pass), qa-report-which-way-rerun.json (phone and desktop pass, after the v1 sea-rectangle fix). No QA record was filed with `company qa-record`; that belongs to qa-tester.
