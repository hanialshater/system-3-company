# EXP-010: Lesson frames pilot (50 lessons, EDD-003 stage 1): build and launch predictions P1 to P6

owner: platform-engineer (Noor), proposing; analytics-steward owns the process · date: 2026-10-25, committed on branch `feat/lesson-frames-pilot` from `origin/main` at `83127c23f`, **before** the Next upgrade, before any artifact build and before any measurement · status: **committed, not run**
source: the predictions are the principal engineer's, copied verbatim from [company/engineering/reviews/2026-10-25-content-hub-production-review.md](../engineering/reviews/2026-10-25-content-hub-production-review.md), "Predictions, committed before the build" (commit `6f2d7e371`). That review is the decision record; this file exists so the predictions sit in the experiments register with a result section of their own. Board: W-2092 (C1 to C4), W-2093 (C8), W-2094 (qa-tester: P2, P3 on the preview).

## Hypothesis

Serving the 50 pilot lessons (`company/engineering/edd/EDD-003-a2-pilot-slugs.txt`) as content-hashed bundles in sandboxed frames from a second origin, behind `NEXT_PUBLIC_LESSON_FRAMES=pilot-50`, costs nothing with the flag off, keeps every bundle small, and keeps the first lesson interactive inside the performance budget with the flag on.

## Committed prediction

| # | Prediction | Measured how | Wrong if |
|---|---|---|---|
| P1 | Bundle size: every one of the 50 lesson bundles is ≤ 15 KB gz, with median ≈ 2.5 KB and max ≈ 8.4 KB (today 2,505 and 8,334 B). Kit ≤ 75 KB gz once, including the C3 reveal-fit and fold port (today 62,636 B). Kit CSS ≤ 6 KB gz (today 4,762 B). | build tool report | any lesson > 15 KB gz, or kit > 75 KB gz |
| P2 | Interactive time. Chromium, Pixel 7 emulation, 4× CPU, from card activation to the frame's `ready`, median of 7: first frame card (cold kit) ≤ 1.5 s; later frame cards (kit cached) ≤ 0.8 s; in-app cards with the flag on within ±10% of flag-off. Real phones (C6): flow passes, time recorded, not predicted. | `performance.mark` around activation and `ready`, in the C7 run | cold > 1.5 s, or warm-cache > 0.8 s, or in-app cards slower by > 10% |
| P3 | QA. Flag-off: `tests/qa` (the gate, unchanged) passes for every lesson that passes on main at the same commit, so the set of failures is identical. Flag-on frame copy, first run after C3: ≥ 48 of 50 pass both viewports. Any failure is layout (reveal-fit or `dvh`), not the bridge. | `npm run qa`; `spike/qa` config on the preview | any new flag-off failure, or < 45 of 50 on the first frame run, or a bridge or progress failure |
| P4 | No regression with the flag off. Total client JS on `/` and on one `/d/<pilot>` page is within +1 KB gz of main. A grep of `.next/static` for one manifest artifact hash and for the `DemoFrame` marker string finds 0 matches. `/d/*` static page count is unchanged. | build output inspection | any match, or > 1 KB gz growth |
| P5 | Build time. App `next build` wall time, median of 3: flag on and flag off each within ±10% of main (the 50 stay in the app). Artifact build for the 50 plus kit ≤ 60 s wall (today: kit 4.8 s, lessons ~0.1 to 0.2 s each). The `tests/lesson-frames` suite ≤ 3 s. | `/usr/bin/time` | app build moves > 10%, or artifacts > 60 s, or suite > 3 s |
| P6 | Flag-on cost to the host: first-load JS of `/` grows ≤ 5 KB gz (the manifest and `DemoFrame` load only when a pilot card mounts). | build output | > 5 KB gz |

would_be_wrong_if: any row's "Wrong if" cell holds when measured (each row is judged on its own, and a wrong row is reported as wrong, not re-scoped).

The 300 ms warm line (EDD-003, A2 §5 line 4) is **not** predicted and **not** claimed: it needs ±1 pre-creation and phone measurements.

## Design

- **Baseline that is allowed to win:** today's app (flag off, every lesson in-app). P4 and P5 compare against `origin/main` built on the same host; "main" for P4 and P5 means `83127c23f` on the patched Next (C8), so that the upgrade's own hash and size moves are not charged to the frames. The pre-upgrade build on Next 16.4.0 is recorded alongside, for the record.
- **Where measured:** P1, P4, P5 and P6 by the builder on the local host, in the build loop (W-2092). P2 and P3 first by the builder against a local production build with the artifacts served from a second local origin (a development measurement, not gate evidence); then by qa-tester on the flag-on preview (W-2094), which is the run that judges P2 and P3.
- **Competing explanations:** a P4 match would mean the dynamic import is not dead with the flag off (the switch leaks); a P2 cold miss would point at the kit's size and the import-map fetch chain, not the lesson bundles (P1); a P3 frame failure on layout points at C3, one on progress at C2.

## Result

Not run. Results are appended here, row by row, wrong rows included; section "Committed prediction" is never edited.

## What changed because of it

Not yet.
