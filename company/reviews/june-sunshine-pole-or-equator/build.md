# Build note: june-sunshine-pole-or-equator (v1, demo-builder, 2026-10-14)

Kept from evaluators until they report. Brief: company/domains/briefs/geography.earth-climate.md, Wave J #3.

- Numbers re-run: the closed-form daily mean (as in section `june`) and a 2,880-step integral of the drawn hourly curve agree to 0.1 W/m^2: equator 384.8, 45 N 483.4, pole 524.2 W/m^2, i.e. 9.2, 11.6, 12.6 kWh/m^2 (scratchpad june.mjs).
- Per-curve labels are folded into one legend block inside the picture (rows: name, day length, noon Sun, kWh/m^2) instead of labels on the curves, which overlap near noon. A slider latitude that is not a preset gets a temporary row; preset rows stay as traces.
- Slider: shows "none yet" until a place is drawn; its thumb sits at 30 N internally so two arrow presses draw 32 N.
- Title is 36 characters.

## Pre-flight

1. Title and hook: "Most June sunshine: pole or equator?" / "On the longest day, which part of the Earth collects the most sunlight?" Names two places but favours neither.
2. Options: "The equator" / "The North Pole" / "45 degrees north". Places only, no numbers.
3. Locked stage: empty axes (0 to 1,400 W/m^2, hours 0 to 24), the axis caption and the legend header "day / noon Sun / kWh/m^2" with no rows. No curve.
4. Reveal values: 12.6 and 9.2 kWh, 23 and 67 degrees, 24 and 12 hours: computed from the same functions that draw the pole and equator rows, which are gated by milestones `pole` and `eq` and stay as rows once drawn.
5. QA path: Equator (eq), 45 degrees N (mid), North Pole (pole), slider two presses (32 N): all three milestones in the first three presses. Each preset disables itself while shown.
6. Reset: no Reset (none in the brief); rows never disappear.
7. Phone fit (tools/reveal-fit.mjs, 390x844, shared dev server :3530, 2026-10-14): 78 words; stage-top crop 0 px; hiddenBelow 0; namedHidden 0 (named: 12, 24, equator, pole, 12.6, north pole, all visible); phoneFit true. Points at: the legend rows for Pole and Equator.

reveal-fit note: run through a preload that only raises Playwright's default navigation and waitFor timeouts (the shared dev server took 30 to 240 s a page); the tool's measuring code was not changed.

## Local QA (2026-10-14)

`QA_BASE_URL=http://localhost:3530 QA_ONLY=<5 wave-J geography slugs> QA_OUT=artifacts/qa-wavej-geography npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=900000`. The `--timeout` flag is a time budget only, because the default 45 s test timeout expired in `page.goto` on the shared dev server in every run. No check was changed. Reports: artifacts/qa-wavej-geography/qa-report-5lessons.json (9 of 10 passed; the one failure was which-sea-gets-the-rain on desktop, a React "state update on a component that hasn't mounted yet" console warning, the dev-server Fast Refresh noise also seen in other wave J runs), qa-report-which-sea-rerun.json (phone and desktop pass), qa-report-which-way-rerun.json (phone and desktop pass, after the v1 sea-rectangle fix). No QA record was filed with `company qa-record`; that belongs to qa-tester.

status draft → review (W-996): launch r10, claims verified, QA on release build c0cfd14 (Demo.tsx/CSS unchanged c0cfd14..511872a; contract also re-run phone+desktop on 511872a, next dev :3673, artifacts/qa-w996-all, 76/76; 2026-10-15)
