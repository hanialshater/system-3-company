# Books 100: integrated-source engineering assessment

reviewer: principal-engineer (Kenji) · date: 2026-10-16 · change-tier: 2  
source: `51c8a4edaf8ee3cd7108b1b195dd43221eac9fcc`  
build: `.next-books100-final-v1`, BUILD_ID `m_qL-Yfu8nt9w7mMZqVsQ`  
prior review: [final shared-engine code review](2026-10-16-books-100-final-review.md)  
design: [EDD-010](../edd/EDD-010-books-100-models.md)

**Decision: the frozen integrated Books source has a technical code go for the requested 100-draft PR. Completion remains conditional on actual final-build QA/design evidence and the operations conditions below. This is not a merge, publish or deployment authorization.**

## Final source delta

I read the actual renderer/model/test diff from the previously inspected shared engine `cded0cd9` through frozen source `51c8a4ed`. It contains visible A/B aliases on scenario controls with full accessible names, the Seen row using those same aliases, and the two geometry corrections in `7fbba0c5`: moving Origin above the root and removing unexplained flow queue marks. The model contract, arithmetic and observation/milestone/reset logic are unchanged.

The condition-to-evidence mapping remains continuously visible in the A/B controls, and the Seen aliases identify the corresponding retained results. All seven flow payloads and their metadata claims were inspected for dependence on the deleted queue annotation: none describes a queue, pile or waiting quantity as observed evidence. The diagram still shows station capacities and identifies the limiting station. The geometry changes introduce no new permissions, routes, data flow or dependency. No blocking code issue was found in this final delta.

The earlier review's arithmetic/state/guard conclusions therefore carry forward. The final source has 100 own demo entry points and payloads, not merely 100 briefs. Each wrapper still imports its own payload and the Books-only engine. All 100 remain drafts, with 467 unverified addressed claims. The existing six Books folders remain unchanged.

## Integrated evidence inspected

- [Final scope inventory](../../reviews/books-100/2026-10-16-final-scope.json): exactly 100 unique slugs and works, all draft, 467/467 claims unverified; no changed protected paths, dependencies or build configuration against the recorded base `f9d47e4f7c6b45db8716486f558582ea441ee657`.
- [Final build record](../../reviews/books-100/2026-10-16-final-build.json): the frozen source built successfully, exit 0, **61.43 seconds**, **486,047,643 output bytes**, with the build identity above. These are coordinator-recorded measurements inspected here, not another build performed by this reviewer.
- Final independent static audit `company/reviews/books-100/checks/final-artifact-alignment.json`: 100 actual local lesson payloads, 200 scenarios, 100 prediction keys and 100 recall keys aligned; no issues; original six content trees equal to base; source-access holds preserved. The E-Myth v4 clarification is an explicit exception to the original brief's wording, with unchanged derived capacities/results.
- Independent `final-artifact-engine-comparison.json`: **200/200** actual scenario outputs agree with the separate Python Fraction oracle, zero failures. Numerical agreement does not verify source attribution or real-world effectiveness.
- Coordinator reports integrated check, strict typecheck and the focused eleven-test suite passed. The previous engineering invocation independently ran all eleven focused tests and actual runtime validation of all 100 brief payloads. Current final browser results are intentionally not inferred from these static checks.
- [Operations readiness approval](../readiness/2026-10-16-books-100-ops-approval.md): tier-2 adoption approved with conditions, current seven-family O1 closed; O2–O5 still govern final PR completion. This reviewer is not the readiness approver.

## Explicit inherited C2 assessment

`artifacts/books100-final-dispatch-tests.log` still reports **112 pass, 1 fail, 3 skipped** out of 116 tests. The sole failure is the inherited W-1337 C2 fixture at `tests/dispatch/guards.test.mjs:531`: it expects `git stash list` to be empty, but the actual result is `['autostash']`. The earlier architecture review independently reproduced the same failure before this Books implementation.

On this host's Git 2.51.1 the deterministic writer causes rebase's dirty-tree failure; Git then attempts to reapply the autostash, reports conflicts, saves it in the ordinary stash list and removes the rebase state directory. The fixture assumes the older/different stranded `.git/rebase-merge/autostash` state. Its assertion fails before the detector assertions. This is an environment-sensitive inherited fixture incompatibility, not evidence of a new Books regression, and it is not evidence that the detector passed.

**Technical disposition:** this known failure does not require an unrelated test/guard patch in the Books PR and does not block opening the user-requested reviewable draft PR once its promised scoped QA is complete. I accept it as a disclosed inherited verification exception for this source review. Full `npm run verify` remains red; do not label it green, skip/relax the guard, or imply that a required CI check has passed. No branch-protection or constitutional gate override is supplied by this assessment. Any later merge must satisfy the repository's required checks through an independently owned compatible fixture/environment resolution, or an explicitly authorized written exception through the existing governance route. The user has requested a PR, not a merge, so that later decision is outside this task.

Minimal follow-up is a separate tools-lead/evaluation-steward item: isolate the detector test by explicitly constructing its intended stranded state, and separately test Git's actual version-dependent failure/recovery while checking work retention and the unsafe-command prevention verdict. Preserve the guard's refusal semantics. Nothing in this Books review changes those files.

## Minimum remaining completion conditions

1. The independent final-build QA report must actually finish with all 100 new entry points covered on phone and desktop, strict 390×844 fit, per-lesson prediction-case/reveal/Reset checks, matching frozen rendering/payload identity, and no unresolved contract failure. Report failures and limits rather than replacing the run with a pilot count.
2. The independent final design sample must close the previously observed Origin obstruction on the corrected renderer and state its actual reviewed scope and remaining limitations. A sample verdict is not a 100-lesson design or learner verdict.
3. Operations O2–O5 must be satisfied and recorded: final QA identity/results, integrated scope and verification disclosure, exact grouped task rollback commands, and all-draft/source-hold/no-production boundaries. Principal-engineer-ops owns the disposition of these conditions.
4. Include exact completed checks and the inherited C2 failure in the PR. Preserve the existing source, empirical, legal, teaching and publication holds. No further engineering approval round is required for documentation-only closure of matching evidence; any model, renderer, payload or layout change needs affected identity/reverification checks first.

## Evidence closure

At this writing, final all-100 browser QA/fit and the final private design sample are still in progress. No pass count for them is claimed here. Append their actual completed reports and identity match before describing the PR's promised validation as complete.

Reviewer-run `npm run check` on the frozen integrated source passed: **1,074 lessons, 5,794 claims, 99 roles**, three inherited disputed Life Hacks warnings; the memory check passed for all 99 roles. The new total is the updated default base's 974 plus this task's 100, as recorded by integration. Read-only scope hygiene found Next had added two local `.next-books100-final-v1` includes to the working `tsconfig.json`; root was notified to restore this generated delta before final scope/PR packaging. It is absent from the frozen commit and is not accepted as a Books build-configuration change.

## Offboarding

The Principal Engineer role remains active; no ownership is being retired or transferred. This run changes only its engineering review and F-39 own-memory handoff. Root owns final integration/PR and shared board/progress/events; tools-lead/evaluation-steward own the inherited fixture follow-up; principal-engineer-ops owns operational readiness. The code and claim authors retain their existing ownership and holds.

## V2 source assessment — supersedes the v1 rendering identity

**Technical code go retained for frozen source `ac88855f3c7e7f363956aad1a3d1c884ca09fe87`.** Its build is `.next-books100-final-v2`, BUILD_ID `7OjCcsqQ4oBdQ71MeRFHT`. The inspected build record, `company/reviews/books-100/2026-10-16-final-v2-build.json`, reports exit 0, **55.16 seconds** and **506,176,390 bytes**. This replaces the v1 rendering identity for final completion evidence; historical v1 counts must remain labelled v1.

I read the actual diff from `51c8a4ed` through `ac88855f`. The sole shared implementation change adds `formatCompoundOperation` and uses it for the compound caption. The caption now shows the actual input operation `× (1 + 12.5/100) + 0` rather than a two-decimal factor such as `×1.13`, which would imply a different rate. `String(number)` preserves the accepted numeric input's round-trip literal. The helper checks finite bounded inputs, returns plain text, and does not alter `calculateModel`, state, milestones, Reset, formatting of outputs/Seen, or any other family's branch. The new regression test distinguishes the true `(9/8)^8` result from `1.13^8`, covers positive/negative and long decimal rate captions and rejects NaN. I independently reran the focused suite: **12/12 passed** in approximately 0.53 seconds.

All ten compound consumers' versions were bumped. Three local learner/fit repairs explain serial completed throughput in `bk-playing-capability-fit` and `bk-ship-distributed-information`, and shorten `bk-innovator-demand-crossing` while preserving the two-/four-round comparison. Their inputs, output numbers, options, correct indices and recall are unchanged. No new source claim is inferred from these repairs.

The independent v2 actual-file audit (`checks/final-v2-artifact-alignment.json`) records 100 lessons, 200 scenarios, 100 prediction/recall keys, 467 unverified claims, 96 exact candidate payloads and four authorized local exceptions, with zero issues. Its separate Python-versus-production comparison (`checks/final-v2-artifact-engine-comparison.json`) has **200 matches / 200 outputs**, zero failures. Twenty compound captions are accounted for by the audit. These are inspected static audit results, not browser passes issued here.

No blocking code defect was found in the v2 diff. The final v2 all-100 browser/phone-fit rerun is still in progress at this assessment; no result is presumed. Root and principal-engineer-ops may close the existing completion conditions using actual identity-matched results without another engineering round, provided runtime/lesson code does not change again. Documentation-only additions, QA-evidence links and a base update limited to documentation/board history do not change this code assessment. Any unexpected source or runtime delta needs the corresponding scope/identity checks. The local `tsconfig.json` delta is now absent (`git diff -- tsconfig.json` was empty).

### Conservative assessment of the v1 feed failure

I inspected the actual v1 unfiltered report `artifacts/books100-final-51c8a4ed-v1/reports/feed.json`: **8 expected passes, 2 unexpected failures, zero skipped/flaky/global errors**. Both failures are the spaced-revisit test, phone and desktop, timing out at 45 seconds. This is a failed feed run, not ten passing feed tests and not a final-v2 result.

Read-only inspection of `git show origin/HEAD:company/constitution/amendments/AMD-012-feed-revisit-lesson-choice.md`, including its C1 evidence, supplies an already investigated explanation. The current protected spec chooses `lessons()[0]`; the unfiltered disk pool includes drafts and starts with draft `ai/asthma-looks-safe`. The unchanged Feed revisit loop correctly accepts only published/review metadata. The test therefore waits for a revisit card for a lesson the feed intentionally excludes. I independently read those current source statements. This pattern strongly supports an inherited fixture-selection problem rather than a Books-caused feed regression, but does not substitute for a successful final-v2 feed run.

The upstream amendment's C1 reports a single-server, matching-SHA old/new/mutant comparison: old **8/10**, proposed eligible-lesson selection **10/10**, and not-yet-due seed mutant **8/10**, with both projects' revisit failures in old/mutant. C1 also explains and supersedes the earlier reporter-artifact mismatch. Those are amendment-owner evidence inspected in the upstream record; I did not rerun its scratch trees or inspect its external temporary reporter files. The amendment remains **proposed** in the read record. No patch, ratification, constitutional waiver or current-branch test change is inferred from it.

**Disposition:** disclose the actual feed failure beside inherited C2; it is nonblocking to opening this bounded draft PR after the promised Books checks actually finish, and no unrelated/protected-test fix is required inside this task. It remains a red verification result. Do not call feed/full verify green, select a convenient filtered pool and present that as the unfiltered result, weaken the app's draft filter, or bypass a required merge check. A later merge/release needs the existing governance and required-check resolution, including ratification before any AMD-012 protected-test edit. The user requested a PR; no merge or deploy is authorized here.
