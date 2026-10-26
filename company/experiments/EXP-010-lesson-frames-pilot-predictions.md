# EXP-010: Lesson frames pilot (50 lessons, EDD-003 stage 1): build and launch predictions P1 to P6

owner: platform-engineer (Noor), proposing; analytics-steward owns the process · date: 2026-10-25, committed on branch `feat/lesson-frames-pilot` from `origin/main` at `83127c23f`, **before** the Next upgrade, before any artifact build and before any measurement · status: **committed before the build; builder's local results 2026-10-26 below; preview run (W-2094) pending**
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

Section "Committed prediction" is unchanged. Rows are judged on their own, wrong ones included.

### 2026-10-26, builder's local run (platform-engineer), branch `feat/lesson-frames-pilot`

Host: this repository's shared Linux x64 cloud host (4 cores, other sessions building; load average 2 to 8 during the runs), Node 22, Next 16.4.3 (C8, commit `80c847c55`). Final code at `53dbb461b`. "Main" for P4/P5 is `83127c23f` on Next 16.4.3, as Design says. P2 and P3 here are a development measurement against local production builds (`next start`) with the artifacts on a second local origin (`node tools/lesson-frames.mjs serve`, same header rules); **the judging run for P2 and P3 is qa-tester's on the flag-on preview (W-2094).** Raw files were in the builder's scratchpad and are summarised here; the build report the tool writes is `artifacts/scratch/platform-engineer/lesson-frames-build.json` (gitignored).

| # | Measured | Verdict |
|---|---|---|
| P1 | 50/50 built. Lesson bundles gzip median **2,497 B**, max **8,334 B** (`parallel-of-most-land`), none over 15 KB. Kit JS **64,203 B gz** with the C3 port (was 62,636), kit CSS **4,804 B gz** (was 4,762), boot 144 B. Not in the prediction: the geo kit is 71,368 B gz, loaded only by the 6 geo lessons. | **held** |
| P2 | Frames, activation mark to `ready` (DemoFrame's `performance.measure`), median of 7: **cold 444 ms**, **kit cached 444 ms**. From navigation start to `ready` on `/d/<slug>`: cold 1,245 ms, cached 1,208 ms. The activation mark is set after DemoFrame's own chunk has loaded, so the first card's chunk fetch is outside it. In-app cards, flag on against flag off, navigation start to the lesson in the DOM, median of 7, three rounds: round 1 **+8.8% cold, +11.5% warm**; round 2 −1.0%, +3.5%; round 3 +0.5%, +6.1%; all 21 pooled +3.6% cold, +2.6% warm. The kit was fetched once for three framed lessons in one browser context (origin log), so the cached case is not slower for want of a cache: at 4× CPU the time is parse and execution. | cold and cached frame lines **held** on the activation measure. In-app ±10%: **wrong in round 1 (warm +11.5%)** by the letter of "median of 7"; held in rounds 2 and 3 and pooled. Host noise is the likely cause (the flag-on in-app path differs only by a `Set.has`), but that is an explanation, not a measurement. The preview run decides. |
| P3 | Frame copy (`spike/qa/pilot/`), first run after C3: **100/100** (50 lessons × phone and desktop), bridge and hook checks included; 100/100 again after the C3 parity fix, and again with the frame-hash assertion (which fails when a manifest hash is changed). Flag-off `tests/qa` (unchanged) on the final flag-off build: contract **3,290/3,292** (all 1,646 non-retired lessons × 2), feed spec **10/10**. The two failures are one draft lesson, `history-luanda-kinshasa-1880-1960` (a stage control's click times out, both viewports), which fails the same way on a build of main `83127c23f`. The run was in batches against one server; a first single run was lost when the shared disk filled (contract.spec writes 3 screenshots per test). | **held**: frame line 50/50 ≥ 48, no bridge or progress failure, no new flag-off failure. Main's full failure set was not run (only the one failing lesson); qa-tester's W-2094 compares the whole set. |
| P4 | Flag-off build of the final code: first-load JS of `/` **265,457 B gz** against main 265,474 (−17 B); `/d/why-seven-wins` 257,066 against 257,048 (+18 B). `.next/static` matches for a manifest frame hash, the `s3c-lesson-frame-v1` marker, the artifact origin, the string `lesson-frames`, the record's `"toolchain"` key and a run of the slug list: **0** each (the same needles match in a flag-on build, so they can match). `/d/*` pages: **1,646**, as on main. | **held** |
| P5 | App `next build` wall, 3 each: main 144.2 / 145.1 / 147.0 s (median **145.1**); flag off 155.5 / 153.1 / 147.2 (median **153.1, +5.5%**); flag on 150.3 / 142.6 / 148.0 (median **148.0, +2.0%**; the third built against the local origin). Three earlier flag-on builds (164.7 / 183.1 / 229.8 s, load 5 to 8) were of code since changed (the DemoFrame import fix) and are not counted. Artifact build, kit and 50: **8.5 to 16.5 s**. `tests/lesson-frames`: **1.9 s** (27 tests). | **held** |
| P6 | Flag on: first-load JS of `/` **266,032 B gz**, +558 B over main. DemoFrame's chunk (about 5 KB gz, with the 50 frame hashes) loads with the first pilot card. | **held** |

Beyond the predictions, found while measuring (C3): the app styles lessons under `:is(.feed-wrap, .single)` (dark palette, stage, panel, the predict-phase picture cap), which never matched inside a frame, and the frame kept a scrollbar the card hides. Fixed in `f54bf7aae`. Framed against in-app after the reveal: phone 49/50 identical (was 45/50), desktop 26/50; every desktop difference is the frame needing less room, because `@media (max-width: 600px)` matches inside a 438 px frame on a 1280 px window. The reveal was on screen in 49/50 either way (the 50th failed the probe's own interaction script in both modes).

## What changed because of it

Not yet.
