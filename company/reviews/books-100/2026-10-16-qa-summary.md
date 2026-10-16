# Books +100: final computer-use QA

Postmerge followup: the new integrated v3 build `5479029c` passed the latest upstream unfiltered feed **10/10** and seven reverse-order reveal captures. See `2026-10-16-postmerge-qa.md` and its stamped durable feed report. The complete 100-route results below remain their original v2 run; its 8/2 old-feed result is preserved as history.

target: http://127.0.0.1:3613 · mode: external (own PR review server) · built from: ac88855f3c7e7f363956aad1a3d1c884ca09fe87 · dist: .next-books100-final-v2 · BUILD_ID: 7OjCcsqQ4oBdQ71MeRFHT

qa-tester · 2026-10-16 · 100 actual draft additions in the frozen manifest. Contract: **200/200 passed with zero retries**; strict 390×844 fit: **100/100 fit**; explorer completed 100/100. Unexecuted/failed cases are represented explicitly, never assumed green.

Initial artifact-first findings: `2026-10-16-final-v2-qa-initial-findings.md`. Durable machine evidence: `2026-10-16-final-qa-results.json`. Actual phone reveal images and ten sheets: `screenshots/final-ac88855f-v2/` and `screenshots/final-ac88855f-v2/sheets/`. Total persisted PNG bytes: 13,979,398.

The independent run used seven bounded groups of 15/15/15/15/15/15/10, the unmodified contract with two workers and zero retries, and the unmodified strict 390×844 reveal-fit tool. Every actual question matched its frozen source, A/B aliases were visible, and Reset measured at least 60px minimum width before testing. HTML and actual script/CSS asset identity were saved. The own explicit-127.0.0.1 server and every child shared the unique dist and lifecycle, with exact saved-PID cleanup. The default .next was never used.

Each route ran both A/B cases, its question's case, Reset-last and both adverse orders. Results quoted in the reveal were compared with actual named outputs and retained Seen values; this does not independently verify mathematical or empirical truth. Stage word/font/44px target checks use actual rendered 390px frames. Full per-route step output is under `artifacts/books100-final-ac88855f-v2/explore/`.

## Exact coverage

| Slug | Version | Phone contract | Desktop contract | Strict fit | Max stage words | Min meaning px | Exploration |
|---|---|---|---|---|---|---|---|
| bk-checklist-series-reliability | v4 | passed | passed | fit | 11 | 11 | observed checks held |
| bk-bets-process-versus-outcome | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-brooks-ramp-up-cost | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-innovator-demand-crossing | v2 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-zero-tail-concentration | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-yes-trade-different-values | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-grove-leverage-hours | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-drucker-time-fragments | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-personal-mba-break-even | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-emyth-owner-bottleneck | v4 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-fifth-upstream-orders | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-great-selected-winners | v1 | passed | passed | fit | 15 | 11 | observed checks held |
| bk-strategy-credible-commitment | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-playing-capability-fit | v2 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-blue-value-cost-trade | v1 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-chasm-segment-readiness | v1 | passed | passed | fit | 15 | 11 | observed checks held |
| bk-solution-asymmetric-incentives | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-jobs-context-changes-choice | v1 | passed | passed | fit | 24 | 11 | observed checks held |
| bk-lean-analytics-cohort-mix | v1 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-okr-output-and-quality | v1 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-topologies-handoff-edges | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-accelerate-small-batches | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-devops-limit-work-in-progress | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-elegant-team-slack | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-data-replica-read-lag | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-release-bulkhead-capacity | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-peopleware-interruption-cost | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-bears-range-not-point | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-flow-utilization-queue | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-ship-distributed-information | v2 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-manager-delegation-interface | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-startup-test-before-scale | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-porter-same-budget-opportunity | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-measure-value-information | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-nudge-default-choice-model | v3 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-irrational-decoy-dominance | v3 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-habit-cue-policy | v3 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-influence-social-sample | v4 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-mindset-small-effect-scale | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-choosing-information-budget | v3 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-scarcity-attention-budget | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-stick-retrieval-evidence | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-learn-cue-overlap | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-numbers-chunk-workspace | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-learning-link-new-to-known | v1 | passed | passed | fit | 24 | 11 | observed checks held |
| bk-pro-feedback-target | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-notes-links-not-piles | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-extended-external-state | v1 | passed | passed | fit | 24 | 11 | observed checks held |
| bk-organized-offload-buffer | v1 | passed | passed | fit | 24 | 11 | observed checks held |
| bk-distracted-switching-budget | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-deep-unbroken-block | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-digital-attention-allocation | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-hyperfocus-salience-filter | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-indistractable-cue-access | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-drive-proxy-reward | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-rewards-metric-gaming | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-gorilla-selection-rule | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-smart-sunk-cost-boundary | v1 | passed | passed | fit | 21 | 11 | observed checks held |
| bk-minds-sampling-representatives | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-knowledge-missing-mechanism | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-mistakes-selective-evidence | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-certain-confidence-score | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-forecast-proper-score | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-crowds-correlated-errors | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-range-transfer-rule | v1 | passed | passed | fit | 20 | 11 | observed checks held |
| bk-grit-product-assumption | v2 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-peak-feedback-discriminates | v1 | passed | passed | fit | 22 | 11 | observed checks held |
| bk-swan-unseen-regime-change | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-cooperation-one-error | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-fact-middle-of-distribution | v1 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-signal-overfit-validation | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-systems-delay-control | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-spring-selection-resistance | v1 | passed | passed | fit | 14 | 11 | observed checks held |
| bk-gene-frequency-dependent | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-watchmaker-cumulative-retention | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-climbing-small-valid-steps | v2 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-phenotype-external-effect | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-wonderful-contingent-branches | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-dodo-fragmented-habitat | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-island-arrival-loss-balance | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-diversity-species-area-model | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-origin-selection-frequencies | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-growth-surface-volume | v2 | passed | passed | fit | 13 | 11 | observed checks held |
| bk-scale-exponent-boundary | v2 | passed | passed | fit | 13 | 11 | observed checks held |
| bk-sync-coupling-threshold | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-linked-hub-removal | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-degrees-shortcut-paths | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-networks-degree-versus-bridge | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-information-repeated-messages | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-code-carry-chain | v2 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-algorithms-cache-change | v1 | passed | passed | fit | 17 | 11 | observed checks held |
| bk-qed-add-amplitudes | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-pieces-energy-reference | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-law-symmetry-shift | v1 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-time-light-cone-budget | v1 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-cosmos-scale-compression | v2 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-pale-angular-size | v2 | passed | passed | fit | 19 | 11 | observed checks held |
| bk-order-clock-comparison | v1 | passed | passed | fit | 18 | 11 | observed checks held |
| bk-chaos-nearby-trajectories | v2 | passed | passed | fit | 16 | 11 | observed checks held |
| bk-drunkard-streak-and-rate | v1 | passed | passed | fit | 16 | 11 | observed checks held |

## Feed and family scope

The original feed suite ran once on the complete served build with QA_ONLY removed, separately from draft-only contract batches: exit 1; actual stats `{"startTime": "2026-10-16T16:40:19.540Z", "duration": 49504.134, "expected": 8, "skipped": 0, "unexpected": 2, "flaky": 0}`. Its report is `artifacts/books100-final-ac88855f-v2/reports/feed.json` and its compact identity/stats are preserved in `2026-10-16-final-qa-results.json`.

Both failures were the 45-second timeout in `a finished lesson comes back as a spaced revisit`, waiting for `[data-testid="revisit-card"]`, once each on phone and desktop. The separate feed result is **8 passed / 2 timed out, zero retries**; its actual failure PNGs are preserved in `screenshots/final-ac88855f-v2/feed-failures/`.

Seven representatives additionally completed final-build keyboard-only, physical rapid-double-click and 1280×800 light / 360×640 dark reduced-motion / 320×640 light paths. Exact outcomes and screenshots are under `artifacts/books100-final-ac88855f-v2/families/`; the known small-phone stage-cropping limitation is preserved, not converted into a fit pass. Formal accessibility/contrast certification and human learning outcomes are outside this run.

## Findings and review handoff

Per-route machine finding candidates: `[]`. Initial visual findings and their dispositions remain in the linked initial-findings record and individual QA records. Small-phone reveal cropping remains routed to the integrator/design/evaluation-steward rather than silently cleared by 390px results.

Private unchanged-logic walkthroughs for the dispatched sample set plus actual risk additions are under `artifacts/books100-final-ac88855f-v2/walkthroughs/<slug>/` (`transcript-artifact-only.md`, `sheet.png`, phase PNGs). Final sample count 13; exact set and longest/densest candidates are in `2026-10-16-final-qa-results.json`. E-Myth has current final-build per-phase explorer captures; its unchanged private five-phase walkthrough remains in the v1 history. Checklist v4 has the fresh v2 private walkthrough for the dispatched learner gate. The private tool copy changes only output root and absolute helper import; original/copy hashes are recorded. No shared walkthrough folders were used for final proof.

Frozen runtime/source hashes were checked throughout the browser lifecycle. After inspection of actual reports, qa-record added only real passing QA evidence links; the metadata before/after comparison confirms no other field changed. The whole tree is not claimed unchanged after those evidence additions. Earlier seven-family/stale records remain historical, with prior same-day per-lesson records preserved under distinct names. No lesson/runtime source, claim/status, protected tool, git, board, progress or event changes were performed by this QA run.

This supports the authorized reviewable draft PR with the recorded limitations. It is not source verification, human learning evidence, a publication gate or deployment approval.
