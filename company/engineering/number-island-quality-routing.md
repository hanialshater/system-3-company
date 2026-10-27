# Number Island: independent quality routing

owner: evaluation-steward
date: 2026-10-27
status: agree with changes; acceptance plan only, no artifact verdict
request: company/decisions/2026-10-27-founder-number-island.md
board: W-2029

## Manager answer

Agree with the bounded optional `/learn/world` navigation prototype in `company/product/number-island-scope.md`, subject to the implementation and independent reviews below. Twelve existing Mathematics lessons remain existing lessons; the illustrated collection is not a new course, assessment, mastery measure or editorial approval. No built Number Island artifact was supplied to this consultation, so no browser, accessibility, factual, learner or release check has passed by this record.

The first version has no learner-history/progress reads or writes, personalized next stop, completion badges, rewards, locks, challenge questions or changes to lesson content. Preserve the actual catalog visibility and status labels, including when a lesson is unpublished. Do not mistake the currently published metadata of the proposed twelve lessons for current gate readiness.

## Existing roles, order and independence

1. **Chief-of-staff** consolidates Product, Mathematics, Personalization, Design and Engineering answers, passes the genuine dispatch prerequisites, and pins the accepted source revision and actual build. The tier-2 EDD and engineering/ops-readiness route belong to principal-engineer and principal-engineer-ops; this quality answer does not substitute for them.
2. **Platform-engineer** builds only the agreed presentation/return-navigation boundaries. Builder checks may find defects but are not independent approval. The builder supplies a running artifact, source/build identifiers, exact twelve-slug inventory, phone/desktop captures and reproducible commands. Do not edit protected `tests/qa/**`, gates or existing lesson verdicts to fit this feature.
3. **qa-tester** independently uses the actual artifact first on phone and desktop, then records reproducible navigation and parity findings. Send the artifact URL, build revision and public scope acceptance criteria, not builder explanations, design rationale or another evaluator's findings. Write the first findings before inspecting implementation accounts. A supplemental exploratory Playwright script may live in ignored `artifacts/`; it must preserve exit status and report executed cases. Do not change the protected harness. Use at most two browser workers by default and avoid competing heavy compilers.
4. **accessibility-reviewer** independently checks the same pinned build, starting with the actual interface and captures. This review can run in parallel with QA once the artifact is frozen. Send neither QA's initial conclusions nor builder reasoning. Record keyboard, assistive-technology semantics, contrast, phone targets and reduced-motion limitations explicitly; an automated scan is not a screen-reader test.
5. **Design-lead**, after the independent findings are written, reviews phone/desktop captures for the agreed visual/navigation treatment. QA/a11y defects go back as problems to platform-engineer; the original reviewers recheck the changed artifact. Record source changes and keep prior failures visible.
6. **Principal-engineer + principal-engineer-ops** review implementation/readiness under the tier-2 route. **Release-manager** receives the actual independent records and full verification result, then determines whether the already-authorized feature preview can run. No manager may convert red gates to green by describing a preview as harmless.

QA and accessibility reports for this new page should be app-level records under `company/qa/number-island/` and `company/engineering/reviews/`, respectively, linked from the intake and W-2029. Do not put navigation-only findings into the twelve lesson review folders: those files can affect lesson readiness. If an existing lesson itself has a defect, record and route that separate finding under its normal lesson-review procedure. QA of navigation does not confer a learner-review launch verdict or verify factual claims.

## Frozen acceptance cases for the built artifact

| Surface | Required evidence |
|---|---|
| Discovery and optionality | `/catalog` exposes an explicit Number Island link; the existing curriculum list and feed remain available. The prototype introduces no new feed order, filtering, prediction flow or account requirement. |
| Map/list parity | Both views expose the same available, unique slugs in cm-math's accepted advisory order and grouping. Titles, actual statuses and links agree with the server's current visibility projection. No whole private metadata/claims ledger or generated all-lesson registry is serialized into the new client surface. |
| Twelve actual destinations | Exercise every available stop, from both presentations, and confirm its matching existing `/d/<slug>` title/player. A visible collection count matches available rendered stops. Test the missing/unavailable-item path without mutating real lesson metadata; no dead stop, phantom published title or map/list mismatch. |
| Selection and return | Select every stop; active state is distinguishable without color. Enter lessons from the island, return to the same known stop, and test browser Back/Forward, reload and direct deep links. A bounded marker/known slug cannot become an arbitrary redirect; ordinary lesson entry retains normal catalog navigation. |
| Existing lesson contract | Run unchanged protected phone/desktop contracts for all twelve selected slugs, verifying the actual selected-test manifest and counts. A typo or zero-test run does not count. Current content failures remain separate existing defects and are not suppressed. |
| Input and layout | Independently operate map and list with touch and keyboard. No trap, hidden focus, inaccessible offscreen control or page-level horizontal overflow at the agreed phone viewport; inspect a narrow 320 CSS-pixel width and desktop. If the artwork has a deliberate scroll region, it must not be required to reach lessons and must have an accessible non-drag alternative. Aim for at least 44 CSS-pixel targets on the new navigation controls; measure visible hit areas. |
| Accessibility semantics | Decorative scenery is excluded from the accessibility tree; navigable stops have real controls, meaningful names and explicit selected state. Labels remain readable at zoom, focus remains visible and follows a sensible order, and the list is a complete navigation path. Check regular text contrast at 4.5:1, large text/UI focus contrast at 3:1 where applicable; report measured exceptions. Check supported light/dark contexts and reduced motion. Do not claim screen-reader compatibility without recording the tool and actual interaction. |
| No new learner state | The map does not call history/progress/account-order APIs, read learner stores, infer completion/mastery, or persist a new preference. Inspect the new surface's imports/dataflow and instrument relevant storage/network operations during its navigation. AccountSync or pre-existing app-shell activity must be separated from new map behavior; a blanket zero-network claim for the entire app would be false. URL selection state is allowed and must not contain personal data. |
| Runtime and evidence | Capture new page/console errors, failed resources, phone/desktop screenshots and interaction results on the pinned artifact. Check status labels and navigation when JavaScript hydrates; don't call the loading shell a functioning lesson. Keep cold compilation timeouts distinct from warmed functional results, with the diagnosed reason for a rerun. |
| Baseline comparison | Run `npm run check` and `npm run verify` before/after; compare exact failures, not only totals. Run typecheck/build and the feature's functional checks independently because chained verify may stop before them. List passed, failed, skipped and unrun outcomes separately. No new failure is acceptable merely because the baseline already fails. |

This is functional/accessibility acceptance. It neither measures learning nor registers an experiment; no improved completion, recall or engagement claim is authorized.

## Baseline diagnosis and remediation owners

Evidence inspected: `/tmp/s3-world-verify-before.log`, `/tmp/s3-check.log`, `tests/publish/readiness.test.mjs`, and the current protected-path list. These are pre-feature diagnostics; no source or test was changed during this consultation.

### Publication suite: 32 passed, 2 failed

`npm run verify` first passes `test:deploy` (19/19), then stops in `test:publish` (32/34). Its later suites, typecheck, build and QA are **unrun in that command**. Separate onboarding checks do not change that command's outcome.

1. **Stale real-repository fixture assumption:** `tests/publish/readiness.test.mjs:48` expects `same-week-a-year-apart`'s current version to be 1, while the observed metadata version is 2 (`2 !== 1`, assertion at line 55). The test also intentionally references a v1 revise record. This is a test coupled to a mutable real lesson, not proof that Number Island broke readiness. **Owner: evaluation-steward**, through a narrow test-maintenance brief reviewed by an engineer. Preserve the known-answer failure semantics, version freshness and old/new policy distinction, preferably using a frozen independent fixture. Do not downgrade the real lesson version, overwrite review stamps, weaken assertions or change the expected value blindly. `tests/publish/**` is not on the current protected-path list; ordinary review still applies. Any required change to protected gates or QA needs the constitutional amendment route.
2. **Repository no-longer-matches-readiness baseline:** `tests/publish/readiness.test.mjs:200` expects no readiness-related error lines from the shadow gate on current repository data. It receives published-lesson failures, including stale learner reviews and ambiguous/version-old QA records. This is not solved by making the test accept all errors. **Owner: evaluation-steward for diagnosis and independence**, with **category managers → learner-evaluator / qa-tester / fact-checker** for the affected actual lesson evidence; release-manager owns the release consequence. A real changed policy requires a reviewed proposal and amendment where protected paths change. Do not expand grandfathering, mark evidence current without re-review, special-case Number Island, or tune the readiness library into always-ready.

### Company check: 811 errors, 4 warnings in the observed baseline

- **793 published gate-error lines:** route by named gate and affected category. Many cite learner reviews for older versions and unstamped/same-day QA ambiguity. Counts are error lines, not unique lessons. Independent re-review/QA must use current artifacts and honest stamps.
- **12 History claim-support errors:** invalid support field values in six history lesson metadata files. **cm-history** routes narrow schema correction to the content owner and any substantive evidence change to independent fact-checking; do not relabel unsupported claims as verified. Keep separate from Number Island.
- **1 Physics hook-budget error:** `crumple-zone-stopping-time` has 98 characters against a 90-character budget. **cm-physics** owns the bounded copy correction and any required version/review consequence.
- **5 decision-record format errors:** missing owner lines and/or objections sections. **Chief-of-staff routes to the actual record owners**; documentary repair must preserve historical truth and may not fabricate answers or ratification.

The warning includes 268 grandfathered published lessons failing readiness. The observed 793 error lines and 268 warning lessons are different measures and must not be added as a unique failing-lesson total. The other observed warnings include disputed in-review claims; do not describe these as checked.

These are existing owner work items, not permission for the Number Island builder to perform a broad quality cleanup. Chief-of-staff should create targeted remediation items only where existing items do not already cover the failure, with explicit acceptance and independent owners. Release-manager must retain the blocked-release state until the applicable release contract is actually satisfied; neither a passing feature sample nor founder approval of this preview waives full verification.

## Handoff

Associate this plan with W-2029; keep it pending actual artifact review. Suggested separate bounded follow-up: evaluation-steward investigates the mutable real-lesson publication fixture and proposes a semantics-preserving test correction; category managers retain actual readiness remediation. No new test/gate, amendment, lesson review, source change, shared operational record or deployment was made here.
