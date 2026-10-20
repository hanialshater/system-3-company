# HQ personalization: findings and next steps

owner: vp-personalization (Mateo) · 2026-10-20 · Product disposition for HQ copy and navigation

## Decision and evidence

Approve HQ copy that separates the historical simulation, the current source-integrated stated-choice feature, and future learned models. AMD-016 is ratified; the actual account editor and ordinary feed implementation are integrated in default. This is not evidence that the live account rollout is active or that personalization improves learning. The source readmission receipt is authoritative for this snapshot: [receipt](../ops/delivery/2026-10-20-account-preference-readmission.json), with independent Product, privacy, provenance and engineering records linked there.

Snapshot `fc663bbcab56c209` has 1,621 catalogue entries: 954 observed, 777 current, 146 stale, 31 in disputed state and 667 unknown. There are still 33 underlying unresolved disputes: two disputed observations became stale; their disputes were not resolved. The recipe admits 656 core-eligible entries. “Current” describes evidence freshness, not publication readiness, safety approval, guaranteed quality or demonstrated learning benefit. No new ratings were added by this readmission.

## Approved HQ copy

Use these labels and accompanying descriptions, without implying customer observation:

- **Saved choices in the main feed — source integrated.** “Signed-in learners can explicitly save subjects, experience preferences and challenge level. The main feed can use those choices within a bounded editorial matching rule. Off, reset and signed-out use the default order. Account environment and database rollout remain pending; source integration does not confirm live activation.” Link to `/preferences`, `/`, AMD-016 and the readmission receipt.
- **Stated preferences — synthetic inspection.** “Inspect deterministic examples using synthetic choices and editorial catalogue data. These results do not show an actual customer's feed or use their account preferences or learning history. Match points are ordinal editorial comparisons, not probabilities, measured quality or learning gains.” Link to `/hq/personalization/preferences`.
- **Historical GAM simulation.** “Offline simulated personas and policies. The earlier Phase A GAM failed its readout and was stopped. This lab is retained for inspection; it is not the model serving saved choices in the main feed, a customer feed inspection, or evidence of real-user improvement.” Link to the existing simulation and its unedited readout/decision records.
- **Evaluation coverage and freshness.** “Review current, stale, disputed and unknown evidence separately. A catalogue export is not a new review. Changed demos require fresh artifact review and exact snapshot readmission before renewed matching eligibility.” Show the current exported counts and snapshot version from data, rather than hardcoding this memo's counts.
- **Learning from real data — backlog.** “Bayesian cold-start estimates, historical performance and a fitted GAM are planned research. The current rule does not learn from behavior.”

The historical readout is [Phase A readout 1](eval/2026-10-16-phase-a-readout-1.md); preserve its FAIL disposition and [VP decision](../decisions/2026-10-16-vp-personalization-phase-a-readout-1-decisions.md). Do not relabel the historical simulation as current production personalization.

The current recipe is `stated-fit-account-2026-10-20-v1`: subject match up to 40 ordinal points, mean chosen experience match up to 40, and challenge match 20/10. Changes are bounded to five-card groups, require a five-point advantage, and move at most two places while retaining status positions and prerequisite/fixed-evidence barriers. Those implementation details belong in HQ, not required learner onboarding. Approved learner reason framing remains “Based on your saved choices”; avoid “we learned your interests,” “best for you,” or recall improvement claims.

## Roles and sequencing for future personalization

1. **VP of Personalization:** own the explicit-choice product objective, onboarding choices, controls and reason copy. Define the decision each future estimate serves before requesting new data. Keep understanding/recall as objectives and engagement as a guardrail. Any additional serving inputs require their own review and admission, not reuse of AMD-016 as general permission.
2. **Evaluation Steward and demo reviewers:** extend the append-only, version-pinned editorial evidence for new or changed demos. Preserve rubrics, uncertainty, reviewer identity, disagreements and raw observations. Do not silently refresh a version pin or turn an unknown demo into a reviewed one by exporting. HQ must expose the resulting coverage and freshness; matching must preserve the existing fail-closed admission gate.
3. **Applied Scientist, Personalization:** propose explicit Bayesian priors and their uncertainty for sparse evidence, then a decomposable fitted GAM only when appropriate data exists. Separate an editorial prior, a learner's stated choices and empirical performance. Neither hand-set points nor a rubric average is a calibrated Bayesian estimate. Do not silently import the failed historical GAM's terms.
4. **Learning Scientist, Personalization:** specify valid understanding/recall outcomes and time windows; explain what sparse signals cannot establish. Coordinate with the scientist before model fitting so the target is educational rather than time-on-feed.
5. **Learner Data Engineer and Learner Model Engineer:** with backend ownership of progress/recall, propose minimum consented events, account isolation, export/delete and retention behavior. Computed learner state remains on demand under the existing approved design; any changed storage needs a privacy read.
6. **Privacy Reviewer and Analytics Steward:** review each new input/use and register an experiment with population, baseline, outcomes, stopping rules and withdrawal before live behavioral learning. The current explicit saved-choice permission does not authorize new behavioral collection.
7. **Personalization Eval:** independently assess offline behavior, leakage, uncertainty/calibration, sparse-data behavior, prerequisites, coverage and fairness of exposure; preserve negative findings. Compare against the unchanged default and the current bounded stated-choice rule. Simulation performance alone cannot authorize a real-world benefit claim.
8. **Personalization Engineer and HQ Engineer:** implement only the accepted rule/experiment, with private account handling, reversible controls, exact versioned serving admission and readable HQ provenance. A future actual-customer inspector is separate privacy-scoped work; today's synthetic inspector must not be presented as that capability.
9. **VP, Product and Release Manager:** accept or reject the independent readout, preserve objections, and route a specifically approved rollout. Release Manager deploys only after the applicable founder approval and environment/database/release gates. No deployment or database change is approved by this memo.

## Acceptance and objection

Product GO for the above distinctions, labels, links and backlog ownership; no objection to a same-contract HQ explanation refresh. Objection to labeling the ordinal recipe a fitted GAM, reporting synthetic results as a customer's actual feed, claiming learning gains, hiding the failed historical readout, or claiming production activation from source integration. Resolve those objections by keeping the separate labels and evidence links above. This disposition does not independently approve unseen HQ implementation or an evaluation rating.
