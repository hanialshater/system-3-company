# Books 100: postmerge QA followup

qa-tester · 2026-10-16 · built from `5479029c4826492ece24017e46988181d4c5899b` · dist `.next-books100-final-v3` · BUILD_ID `YzmugrBOjf8wYcaLMHwwJ` · target `http://127.0.0.1:3617`.

**Current upstream feed: 10/10 passed. Seven reverse-order reveal captures: 7/7 checks held.** The original `tests/qa/feed.spec.ts` ran once without QA_ONLY, using two workers and zero retries. Its clean harness stamp identifies the ratified upstream AMD-012 change; the tester made no test edits. This is a bounded postmerge regression run, not a repeat of the full 100-route run.

## Current artifact findings

All seven saved phone images below were actually opened and viewed. After B → A → Reset → Reveal, each shows the baseline A diagram and both observed values in Seen. Reset was disabled after A had already restored the baseline, so the disabled control was recorded and skipped. Reveal remained unlocked. The pictures, controls and their outcome histories were visible in these 390×844 captures. No page errors, missing history, dead reveal control or mismatch between named output values and the reveal's result references was observed. These observations check browser consistency and do not independently verify arithmetic, book attribution or learning.

| Route | Actual A output | Actual B output | Reset after B → A | Actual reverse reveal |
|---|---|---|---|---|
| bk-checklist-series-reliability | 72.9 % | 85.74 % | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-checklist-series-reliability.png) |
| bk-choosing-information-budget | 20 inspection min | 24 inspection min | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-choosing-information-budget.png) |
| bk-habit-cue-policy | 8 actions | 0 actions | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-habit-cue-policy.png) |
| bk-influence-social-sample | 4 reached nodes | 12 reached nodes | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-influence-social-sample.png) |
| bk-irrational-decoy-dominance | 0 net points | 3 net points | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-irrational-decoy-dominance.png) |
| bk-nudge-default-choice-model | 80 % choose X | 20 % choose X | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-nudge-default-choice-model.png) |
| bk-emyth-owner-bottleneck | 3 jobs/hour | 5 jobs/hour | disabled; baseline A already restored | [PNG](screenshots/postmerge-reverse/bk-emyth-owner-bottleneck.png) |

The run asserted each actual prediction question against current idea JSON, explicit visible A/B aliases, Reset computed minimum width ≥60px, first-case evidence keeping reveal locked, both cases unlocking reveal, retained output strings, and A baseline after Reset. Typed prediction/case/reset/reveal steps and full stage text are preserved privately at `artifacts/books100-postmerge-5479029c-v3/steps/<slug>.json`. Compact durable question/check/history/image hashes: `2026-10-16-postmerge-qa.json`.

## Build identity and retained full coverage

Before this lifecycle, QA independently matched 207 nonmetadata frozen files (manifest, all 100 wrappers/idea payloads and six shared renderer/model/kit files) against the full v2 run and compared all 100 metadata objects with evidence removed. There were no other metadata differences. The integrator's broader global UI comparison is separately linked in `2026-10-16-postmerge-equivalence.json`; this role did not independently hash files beyond its stated 307-file scope. Actual served HTML hashes and fetched script/CSS hashes were recorded. Each fetched asset was HTTP 200 and exactly matched its current unique v3 dist file. All source/instrument hashes and build markers remained stable through this short run.

The full **200/200 contracts, 100/100 strict 390×844 fits and 100/100 explorations** belong to frozen v2 `ac88855f` and remain in `2026-10-16-final-qa-results.json` and `2026-10-16-qa-summary.md`. They are retained through the recorded source equivalence; this followup does not relabel them as newly executed v3 cases. The prior v2 feed result **8 passed / 2 spaced-revisit timeouts** remains historical and unchanged. The current actual upstream feed report, with both revisit cases passed, is durably preserved at `2026-10-16-postmerge-feed.json`.

## Lifecycle and boundaries

The server and feed child shared the exact NEXT_DIST_DIR and one network lifecycle, bound explicitly to 127.0.0.1. Exact saved server PID 13 was sent SIGTERM and stopped in finally; observed exit code `143` at `2026-10-16T16:58:19.917Z`. No metadata, lesson/runtime source, protected test, board, progress, event or git changes were performed by this run. No source, learner, publication or deploy approval is implied.

The prior observed 360×640 stage-cropping limitation is unchanged and was not retested here. This followup makes no claim about the upstream HQ room/categories check or inherited C2; their owners retain those separate reviews. Next owners: design reviews the seven actual reverse images; integrator consolidates the draft PR evidence and known limitations.
