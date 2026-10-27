# Weekly Business Review: 2026-10-27

owner: chief-of-staff

Asynchronous operating review by chief-of-staff before dispatching Number Island implementation. Specialist sign-offs are not claimed; missing operational and learning evidence is explicit below. Scope is this checkout and the current founder request, not an assertion about the live site.

## 1. Operating snapshot (generated)

Generated with `npm run company -- status` and `npm run metrics -- --md` on this checkout. Repository counts are not learning outcomes.


> system-3-company@0.1.0 metrics
> node tools/metrics.mjs --md

| Metric | Value |
|---|---|
| Lessons (not retired) | 1645 |
| Status | draft 691, published 720, review 234 |
| Claims verified | 5247/13551 (39%) · disputed 14 |
| Claims per lesson | 8.2 |
| Fact-checked / learner-reviewed / QA pass | 890 / 975 / 972 of 1645 |
| Learner verdicts (current version) | fatal 14 · revise 540 · launch 421 · needs re-review 1 |
| Board | 1284 open (oldest 15 days) |

| Domain | Lessons | Published | Reviewed | Fatal |
|---|---|---|---|---|
| math | 85 | 78 | 85 | 1 |
| cs | 364 | 147 | 153 | 3 |
| probability | 79 | 77 | 79 | 2 |
| physics | 74 | 64 | 69 | 4 |
| ai | 293 | 62 | 66 | 0 |
| economics | 96 | 89 | 95 | 1 |
| life | 71 | 67 | 68 | 1 |
| chemistry | 65 | 65 | 65 | 1 |
| geography | 61 | 59 | 60 | 1 |
| lifehacks | 200 | 6 | 200 | 0 |
| books | 106 | 0 | 11 | 0 |
| big-ideas | 6 | 2 | 4 | 0 |
| history | 141 | 4 | 16 | 0 |
| behavioral | 4 | 0 | 4 | 0 |

### Agents

| Metric | Value |
|---|---|
| Agent runs | 1095 dispatched · 1071 reported · 39 stopped at least once (4%) |
| Tokens (recorded runs) | 107.2M |
| Last dispatch event | 0.0 h ago (2026-10-27T22:20Z) |
| Roles never dispatched | 32 of 107 (unsuitable for retirement decisions until dispatch telemetry is reconciled): mockup-artist, researcher, localization-lead, localizer, community-engineer, rnd-lead, rnd-engineer, illustrator, cm-math-algebra, cm-cs-security, cm-probability-data-literacy, cm-physics-mechanics, cm-physics-waves, cm-physics-electricity, cm-ai-ai-society, cm-economics-personal-finance, cm-economics-macro, cm-life-ecology-body, cm-books-business, cm-books-psychology, cm-books-science-history, cm-big-ideas-science, cm-big-ideas-society, cm-big-ideas-mind, cm-history-population-economy, cm-history-maps-borders, cm-history-events-data, courses-lead, chief-product-officer, head-of-evaluation, pairwise-judge, evaluation-engineer |
| Rework | 1599 of 1645 lessons revised at least once (97%) |
| First-review launch rate by builder model (EXP-003) | no model comparison (non-causal and under 80% explicit labels: "opus" = no model phrase in build.md for 1563 of 1563 lessons; ledger rows without a model label 867 of 992); raw: sonnet-labelled 55/82, unlabelled 392/859 |

| Role | Dispatched | Reported | Stopped | Resumed | Tokens/run | Median min |
|---|---|---|---|---|---|---|
| demo-builder | 242 | 239 | 20 | 53 | 150k | 18 |
| fact-checker | 122 | 122 | 0 | 5 | 131k | 7 |
| learner-evaluator | 97 | 96 | 5 | 16 | 167k | 15 |
| principal-engineer | 42 | 41 | 0 | 2 | 76k | 5 |
| evaluation-steward | 29 | 29 | 1 | 1 | 78k | 4 |
| qa-tester | 29 | 29 | 0 | 6 | 45k | 8 |
| principal-engineer-ops | 29 | 28 | 1 | 4 | 75k | 7 |
| general-purpose | 28 | 28 | 1 | 7 | 184k | 13 |
| tools-lead | 27 | 27 | 3 | 5 | 98k | 9 |
| platform-engineer | 24 | 23 | 2 | 6 | 102k | 21 |
| head-of-product | 21 | 20 | 0 | 0 | 81k | 4 |
| release-manager | 18 | 17 | 0 | 0 | 35k | 1 |
| chief-of-staff-ceo-office | 18 | 15 | 0 | 6 | 140k | 9 |
| privacy-reviewer | 17 | 17 | 0 | 0 | 81k | 4 |
| interaction-designer | 15 | 15 | 0 | 1 | 112k | 9 |
| backend-engineer | 14 | 13 | 1 | 1 | 102k | 15 |
| design-lead | 12 | 11 | 0 | 0 | 85k | 5 |
| hq-engineer | 12 | 12 | 0 | 1 | 70k | 7 |
| cm-lifehacks | 11 | 11 | 1 | 1 | 129k | 8 |
| principal-pm-verticals | 10 | 10 | 0 | 1 | 110k | 7 |
| cm-history | 10 | 10 | 0 | 1 | 108k | 6 |
| portfolio-manager | 9 | 9 | 0 | 1 | 121k | 8 |
| history | 9 | 9 | 0 | 0 | — | — |
| vp-personalization | 9 | 9 | 0 | 0 | — | — |
| analytics-steward | 8 | 8 | 0 | 0 | 79k | 6 |
| cm-behavioral | 8 | 8 | 0 | 4 | 107k | 7 |
| learner-model-engineer | 8 | 7 | 0 | 0 | 78k | 4 |
| quality | 8 | 8 | 0 | 0 | — | — |
| behavioral | 8 | 8 | 0 | 0 | — | — |
| cm-cs | 7 | 7 | 0 | 1 | 77k | 4 |
| cm-ai | 7 | 7 | 0 | 0 | 84k | 4 |
| cm-cs-algorithms | 7 | 7 | 0 | 0 | 53k | 2 |
| lifehacks | 7 | 7 | 0 | 0 | — | — |
| engineering | 7 | 7 | 0 | 0 | — | — |
| tools | 7 | 7 | 0 | 0 | — | — |
| ops | 7 | 5 | 2 | 0 | — | — |
| learning-scientist-personalization | 7 | 6 | 0 | 0 | — | — |
| cm-physics | 6 | 6 | 0 | 0 | 86k | 7 |
| accessibility-reviewer | 6 | 6 | 0 | 0 | 72k | 12 |
| first-light | 6 | 6 | 0 | 0 | — | — |
| personalization-engineer | 6 | 4 | 0 | 0 | — | — |
| cm-probability | 5 | 5 | 0 | 0 | 77k | 4 |
| cm-economics | 5 | 5 | 0 | 0 | 64k | 3 |
| pattern-librarian | 5 | 5 | 0 | 0 | 60k | 2 |
| head-of-strategic-initiatives | 5 | 5 | 0 | 1 | 123k | 7 |
| personalization-eval | 5 | 4 | 0 | 0 | — | — |
| cm-math | 4 | 4 | 0 | 0 | 79k | 5 |
| cm-chemistry | 4 | 4 | 0 | 0 | 75k | 4 |
| lifehacks-safety-reviewer | 4 | 4 | 0 | 0 | 72k | 6 |
| cm-big-ideas | 4 | 4 | 0 | 0 | 129k | 8 |
| growth-designer | 4 | 4 | 0 | 0 | 67k | 3 |
| research | 4 | 3 | 1 | 0 | — | — |
| research-scientist | 4 | 4 | 1 | 0 | 84k | 7 |
| cm-life | 3 | 3 | 0 | 0 | 92k | 5 |
| design-engineer | 3 | 3 | 0 | 0 | 146k | 46 |
| cm-geography | 3 | 3 | 0 | 0 | 118k | 5 |
| cm-books | 3 | 3 | 0 | 0 | 128k | 6 |
| vp-marketing | 3 | 3 | 0 | 0 | 57k | 3 |
| cultural-reviewer | 3 | 3 | 0 | 0 | 67k | 2 |
| verticals | 3 | 3 | 0 | 0 | — | — |
| applied-scientist-personalization | 3 | 3 | 0 | 0 | — | — |
| cm-geography-people-places | 2 | 2 | 0 | 0 | 56k | 2 |
| visual-designer | 2 | 2 | 0 | 0 | 38k | 30 |
| cm-economics-markets | 2 | 2 | 0 | 0 | 65k | 8 |
| cm-math-discrete | 2 | 2 | 0 | 0 | 70k | 5 |
| cm-probability-chance | 2 | 2 | 0 | 0 | 71k | 4 |
| cm-probability-statistics | 2 | 2 | 0 | 0 | 33k | 2 |
| cm-geography-earth-climate | 2 | 2 | 0 | 0 | 26k | 1 |
| pedagogy-critic | 2 | 2 | 0 | 0 | 95k | 35 |
| domain-scout | 2 | 2 | 0 | 0 | 54k | 3 |
| research-lead | 2 | 2 | 0 | 0 | 167k | 62 |
| lane | 2 | 2 | 0 | 0 | — | — |
| learner-data-engineer | 2 | 2 | 0 | 0 | — | — |
| W-135 | 1 | 0 | 0 | 0 | — | — |
| cm-cs-systems | 1 | 1 | 0 | 0 | 17k | 1 |
| cm-life-genetics-evolution | 1 | 1 | 0 | 0 | 31k | 3 |
| cm-life-health-epidemiology | 1 | 1 | 0 | 0 | 21k | 1 |
| cm-course-ncm | 1 | 1 | 0 | 0 | 227k | 23 |
| vp-rnd | 1 | 1 | 0 | 0 | 114k | 6 |
| learning-designer | 1 | 1 | 0 | 0 | 86k | 8 |
| vp-books | 1 | 1 | 0 | 0 | 58k | 3 |
| wave-j | 1 | 1 | 0 | 0 | — | — |
| product | 1 | 1 | 0 | 0 | — | — |
| physics | 1 | 1 | 0 | 0 | — | — |
| cm-chemistry-matter-reactions | 1 | 1 | 0 | 0 | 54k | 2 |
| cm-chemistry-solutions-acids | 1 | 1 | 0 | 0 | 54k | 2 |
| cm-chemistry-energy-rates | 1 | 1 | 0 | 0 | 57k | 3 |
| cm-geography-maps-projections | 1 | 1 | 0 | 0 | 51k | 2 |
| cm-math-geometry | 1 | 1 | 0 | 0 | 35k | 1 |
| cm-ai-ml-basics | 1 | 1 | 0 | 0 | 57k | 2 |
| cm-ai-neural-language | 1 | 1 | 0 | 0 | 62k | 3 |
| personalization-lead | 1 | 1 | 0 | 0 | 50k | 2 |
| lesson-dims-owner | 1 | 0 | 0 | 0 | — | — |

### Founder leverage (all of the log to 2026-10-27; company/ops/metrics.md §C)

| Metric | Value |
|---|---|
| Founder attention | founder messages 178: decision 11 · correction 0 · routing 0 · unclassified 167 · minutes not recorded |
| Accepted outcomes | accepted outcomes 363: checked lessons published 363 · library improvements adopted 0 · operational fixes verified 0 |
| Since 2026-10-17 (classification began) | founder messages 11: decision 11 · correction 0 · routing 0 · unclassified 0 · minutes not recorded · accepted outcomes 0: checked lessons published 0 · library improvements adopted 0 · operational fixes verified 0 (lessons dated by first publish event) |
| Founder attention per accepted outcome since 2026-10-17 | not computed (no accepted outcomes) |

| Wave | Builders | Lessons added | Build tokens/lesson | Check tokens/lesson | Merge QA failures |
|---|---|---|---|---|---|
| w0 | 4 | 17 | 41k | 56k | 0 |
| w1 | 9 | 90 | 24k | — | 0 |
| rev0 | 3 | 0 | — | — | 0 |
| w2 | 9 | 70 | 20k | — | 0 |
| w3 | 6 | — | — | — | — |
| w3b+w4 | 5 | 50 | 21k | 5k | 0 |

### Budget (token ledger: 107.2M measured over 946 runs; stock ratio 149k/published lesson = tokens recorded to 2026-10-16T15:27Z ÷ 720 lessons published at 2026-10-27; not marginal cost)

| Line | Status | Major | Budget | Spent vs budget | % | Spent (all) | Published | k/published |
|---|---|---|---|---|---|---|---|---|
| wave-j | approved | yes | 7.5M | 6.4M | 86 | 6.4M | — | — |
| lifehacks-engine-v2 | approved | yes | 3.0M | 3.1M | 103 | 3.1M | 6 | 513 |
| books-decks | returned | yes | — | 1.5M | — | 1.5M | 0 | — |
| history | approved | yes | 2.5M | 6.5M | 259 | 6.5M | 4 | 1619 |
| marketing | approved | yes | 1.0M | 51k | 5 | 51k | — | — |
| scale-stage-1 | approved | yes | 2.5M | 368k | 15 | 368k | — | — |
| big-ideas | in-flight | yes | — | 1.1M | — | 1.1M | 2 | 562 |
| multi-card-sequence | in-flight | yes | — | 333k | — | 333k | — | — |
| ncm-course | in-flight | yes | — | 2.3M | — | 2.3M | — | — |
| first-light | approved | yes | 6.6M | 3.3M | 50 | 3.3M | — | — |
| behavioral-econ | approved | yes | 1.8M | 2.9M | 157 | 2.9M | — | — |
| personalization | approved | yes | 2.1M | 0k | 0 | 0k | — | — |
| lifehacks-200 | legacy | yes | — | 6.4M | — | 6.4M | 6 | 1059 |
| scale-stage-0 | legacy | yes | — | 1.1M | — | 1.1M | — | — |
| rnd-knots | proposed | yes | — | 1.8M | — | 1.8M | 4 | 444 |
| catalog | active |  | — | 55.5M | — | 55.5M | 708 | 78 |
| rituals | active |  | — | 1.4M | — | 1.4M | — | — |
| maintenance | active |  | — | 10.1M | — | 10.1M | — | — |
| leadership | active |  | — | 2.9M | — | 2.9M | — | — |
| unattributed | — |  | — | 312k | — | 312k | — | — |


## 2. Learning metrics

Revisit recall rate, prediction-to-reveal completion and median dwell: not measured in this review. No learner event dataset was inspected. Previous WBR is company/rituals/records/2026-10-17-wbr.md; incomparable periods and changing inventory mean no week-over-week learning conclusion is warranted.

The onboarding sample exercised one existing lesson on phone and desktop; both browser contracts passed after cold compilation. This is not full-catalog QA. Typecheck and a production build passed. Life Hacks fixtures passed 132/133; its copy-word-budget failure is independent of Number Island. Baseline `npm run verify` stops in test:publish with 32 passes and 2 failures (fixture-version/readiness expectations). Company check reports 811 errors/4 warnings. No implementation code has been changed.

## 2b. Agents and evidence quality

The generated Agents section above is historical instrumentation, not a live roster. Hooks are absent here, so chief-of-staff logs each actual dispatch/report. Manager consultations use existing company roles. No new role, room, org or floor is proposed. Historical token medians cannot predict this feature's cost, and no current token spend was fabricated. CoS initially wrote several wrong room tokens during intake; append-only correction notes identify them, and subsequent events use documented rooms.

## 3. Anomalies and owners

| Anomaly | Probe / action | Owner | Due |
|---|---|---|---|
| 811 repository-check errors | Preserve baseline, route failures; no special-case passing checks | evaluation-steward | Before release |
| Verify fails in publication suites | Release manager documents failing tests and required remediation | release-manager, evaluation-steward | Before release |
| New route is tier 2 | EDD before code, independent engineering and ops-readiness reviews | principal-engineer | Before implementation/release respectively |
| Company rituals stale | This WBR and founder digest precede new build dispatch; other due reviews remain explicitly outstanding | chief-of-staff | This round |
| Deployment API returns Forbidden | Check supported platform policy/access with configured identities; do not invent credentials | release-manager | Before deploy |

## 4. Category notes

No new category-manager reports claimed. Number Island reuses 12 existing math lessons; cm-math consultation is pending. Current category counts are in generated snapshot. Most important inventory distinction: mapped coverage is not release readiness. Do not convert draft/review inventory into published lessons to fill a map.

## 5. Founder direction and decisions

The founder authorized Number Island SVG work and its preview, and explicitly required working through the company. Record: company/decisions/2026-10-27-founder-number-island.md. No new approval is requested for those actions. No gate override, default-branch merge or unrelated production deploy is inferred.

## 6. Objections and answers

- Shipping visual work with red global release checks: release manager must obtain a supported green path; approval to deploy is not a gate waiver.
- Treating revisits or completion as mastery: v1 scope excludes all progress/history reads and learning claims.
- Using a lighter tier as a shortcut: maintain dedicated /learn/world as tier 2 unless owners genuinely change product scope.
- Recording a ritual after a build: no Number Island implementation is running; commit this actual review before the build preflight.

## Operational health

Generated by `node tools/ops-health.mjs`; historical open work is evidence to route, not silently close:

```text
Agent runs (all time)    902 finished, 1285 dispatched, 51 stopped (5% stop rate)
Tokens (all time)        107201k; median 105k per run; median 9 min per run
Burn rate (last 24 h)    0k tokens in 0 runs = 0k tokens/hour
Incidents                28 total, 0 in the last 7 days; 8 COE record(s)
Tier registry            23 entries, 13 not ok, 7 tier-1 red line(s)
Open work                1284 open: P1 3, P2 122, P3 174, P4 26, untriaged 959
Last ops review          2026-10-14-ops-review.md

Not ok:
  T1  gates-and-qa-contract            at-risk   evaluation-steward
  T1  ci-and-deploy                    degraded  release-manager
  T1  auth-and-progress-db             missing   backend-engineer
  T1  shared-dev-host                  degraded  principal-engineer
  D1  learner-accounts                 missing   backend-engineer
  S1  spike-route-open-cdn-param       at-risk   platform-engineer
  U1  accessibility-review-never-run   at-risk   accessibility-reviewer
  T2  shared-main-checkout             degraded  tools-lead
  T2  agent-isolation                  degraded  tools-lead
  T2  publish-loop                     at-risk   release-manager
  T2  dispatch-control                 degraded  tools-lead
  T2  lesson-storage-at-scale          missing   principal-engineer
  U2  told-not-shown                   at-risk   design-lead

```

## Next

Receive manager consultations, route priorities and curriculum sign-off, then EDD and design specialists. Re-run actual dispatch preflight with a real isolated worktree before any builder. This review does not waive other preflight failures or certify unrelated open incidents.
