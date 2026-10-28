# Early partial artifact smoke: behavioral batch

owner: qa-tester
date: 2026-10-24
status: exploratory only; not final 200-demo evidence
target: http://127.0.0.1:3450 · mode: local server started and stopped within one QA execution · built from: e2cfc5a5c

## Scope and observations

The supplied partial production output contains the first 50 behavioral additions, not the full batch. The served-output warning reported 1,695 built lesson pages against a then-current tree of 1,745. This record does not establish source equivalence to later work and cannot support a final batch pass.

For each sampled lesson, QA committed the last prediction option, ran case A, confirmed the reveal remained locked, visited the comparison, retained both witness summaries, pressed Reset last and opened the reveal. On a 390×844 touch viewport, both witnesses and saved case A visualization remained visible after Reset. No page errors or horizontal overflow were observed. All five reveal screenshots and the golf prediction screenshot were actually viewed before this account was written.

| Lesson | Artifact family | Reveal words | Stage-top crop | Reveal hidden below | Minimum stage type |
|---|---|---:|---:|---:|---:|
| be-which-car-saves-more-fuel | bars | 44 | 0 px | 0 px | 11 px |
| be-a-precise-opening-offer | intervals | 45 | 0 px | 0 px | 11 px |
| be-write-the-forecast-first | scatter | 49 | 0 px | 0 px | 11 px |
| be-who-can-see-your-work | graph | 55 | 0 px | 0 px | 11 px |
| be-par-or-birdie | bars | 41 | 0 px | 0 px | 11 px |

The golf prediction explicitly calls its scorecard a toy; the precise-offer question explicitly states a rounding convention. These observations do not verify empirical claims, the original studies or transfer learning.

## Findings routed to the chief of staff

1. In `be-who-can-see-your-work`, labels run across or under small node circles and abbreviate the roles (`Visible to 1`, `Peer visi 0`). The picture fits geometrically but the role mapping is harder to read than the prose. Builder/design should improve label placement and role names before final artifact review.
2. The setup labels the cases as a toy model, but that label is replaced during exploration. A short persistent model label would preserve the distinction when a learner is looking at the numerical result alone. This is an interpretation recommendation, not a claim that the explicit toy wording was absent from the prediction.

## Reproduction and limits

Exploratory runner: `artifacts/explore/behavioral-probability-200/smoke.mjs`. Raw results and prediction/comparison/reset-reveal screenshots: `artifacts/behavioral-probability-200/early-smoke/` (uncommitted, regenerable). The server and probes must run inside the same execution namespace on this host; QA used `tools/serve.sh` with trapped cleanup.

No unchanged contract run, desktop run, all-200 fit run, keyboard/reduced-motion run or source check is claimed here. No lesson metadata or protected test was edited. The complete frozen integrated build still needs the quality route in `2026-10-24-quality-route.md`. A mechanical exploratory pass is not evidence that a human learned.
