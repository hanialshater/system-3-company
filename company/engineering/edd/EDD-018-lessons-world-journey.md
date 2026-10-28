# EDD-018: Lessons World journey revision

owner: principal-engineer
date: 2026-10-27
tier: 2
status: architecture supplied; feature implementation blocked by required checks
source: company/decisions/2026-10-27-founder-lessons-world-journey.md
reviewers: principal-engineer + privacy-reviewer + principal-engineer-ops; learning semantics through head-of-product

## 1. Decision and prerequisite order

This replaces EDD-017's static/no-state product boundary after explicit founder approval of the journey plan. It does not represent source implementation, independent artifact approval or a deploy authorization. Initial source prototype is isolated commit `a1943bc46`; do not integrate it or start revised feature source work while required checks are red.

Latest founder correction, relayed by chief-of-staff during this consultation: **address the existing 811 errors first; feature implementation/integration waits for required checks to be green. VP Personalization is parked under F-52; do not unpark it. Head-of-product owns the relevant approvals.** The earlier intake route's VP reference needs correction by chief-of-staff; it is not standing permission to dispatch a parked lane.

Sequence: gate remediation by its existing owners → green required checks → analytics-steward's committed predictions and wrong-if criteria → reviewed contracts/privacy/data inventory → actual build preflight/isolation → implementation → independent QA/accessibility and engineering/ops-readiness review → actual founder-approved screenshots → release-manager's supported release path. Never relabel implementation as consultation to bypass a failed preflight.

Budget: target **$60 total**, pause at **$120**. Chief-of-staff records observed cost from supported usage/billing evidence; token totals, elapsed time and historical medians are not dollar observations. Label unavailable evidence unmeasured and route it before budget-dependent dispatch; never invent a spend balance or prediction result.

## 2. Runtime architecture and shared public contracts

An opt-in `/learn/world` route renders a mobile-first continuous authored landscape, loading subsequent real island manifests/scenery as they approach. There is one real initial island; show an honest content end. No procedural curriculum or fake future stops. Keep focused controls mounted and preserve layout height while artwork loads. List exposes exactly the same available lessons and statuses.

- `WorldIsland`: stable `id`, `version`, ordered regions, ordered lesson-slug references, authored scene/layout identifiers, and versioned `check` references. Layout coordinates and decoration are authored; titles/durations/visibility come from existing server catalog projection. No raw metadata/claim ledgers enter world client props.
- `WorldLesson`: public slug/title/duration, region/order and existing feed-item projection where needed. No stored completion/mastery field is copied onto curriculum data.
- `WorldNavigation`: allowlisted island/version, entry slug, presentation and bounded restoration anchor/offset. Navigation state is not learning evidence. Missing/invalid context falls back to ordinary feed/world entry, never arbitrary URLs.
- `WorldLearningSnapshot`: `checking | unavailable | ready`, ownership epoch, existing completion/recall map and valid versioned flag attempts. UI must not read stores or display numeric zero progress before ownership settles.
- `WorldLessonState`: derived `not-started | explored | understood`, separate due flag and readable evidence description. Shared by map, list, count and next suggestion; do not persist duplicate derived states or statistics.
- `WorldCheckAttempt`: island/check version, original-question references/versions, practice-or-seal eligibility, attempt timestamp and per-question correctness. Store no dwell, navigation, free text, demographics or new analytics. Server validates allowed island/question versions and bounds; do not trust an uploaded `passed` boolean.

Canonical modules: platform owns `src/lib/world-manifest.ts` (client-safe definitions/references), `src/lib/server/world-catalog.ts` (server projection/recall payload), and `src/lib/world-navigation.ts` (pure bounded URLs/return anchors). Learner-model engineering owns `src/lib/world-learning.ts` (pure state, suggestion, attempt/eligibility/scoring types and functions). Backend owns `src/lib/world-learning-client.ts` (owned browser gateway, storage and sync) and server attempt persistence. Feed owner consumes these contracts; no competing parsers or state definitions.

## 3. Evidence, suggested next and recall contract

Use existing `LessonProgress` completion/recall records. A reveal establishes explored; opens, selections, predictions, scroll and dwell do not. Ignore recalls without a completion. A recall qualifies only when its original scheduled lesson question or the same original question in a flag is answered, at least one production day after completion and eligible under the shared revisit/assessment schedule. Immediate practice never writes a qualifying recall or understood credit.

Sort/deduplicate counted recalls by timestamp. Latest qualifying correct recall → understood; latest wrong → explored with another-look cue. A clock tick alone cannot reduce understanding. Separate due markers use the existing schedule. The state function has no `now` argument; due/eligibility functions explicitly do. QA-only shortened days must never change production eligibility or stored assessment versions.

Explicit valid destination wins over recommendations. Otherwise: due revisit in authored order → first unexplored stop → eligible recall flag → optional practice. Unknown ownership/progress gives no inferred personalized suggestion; a ready fresh record starts at 1. Keep recommendation distinct from current selection and never advance a learner's active interaction on a background sync. Suggested trail highlighting is not proof preceding stops were completed.

Initial `number-island` check samples these current original recall definitions (all metadata version 2 at inspection):

| Region | Original lesson question references |
|---|---|
| Number Village | `add-a-zero`, `more-digits-not-bigger` |
| Fraction Harbour | `add-the-slices`, `scoops-in-three-cups` |
| Scaling Mountain | `adding-squashes-the-photo`, `cube-the-size` |

Freeze actual question versions in the authored check definition. A later question change creates a new check version; old attempt evidence is not silently relabelled. For future 4–5-region islands, keep **six questions total**: at least one per region and rotate extra slots deterministically among regions using attempt ordinal. Category/learning owners approve the actual references; do not generate unreviewed questions.

Practice is available anytime. A seal attempt requires all island lessons explored, at least one day since the latest initial exploration, at least one day since the previous flag practice/attempt, and due eligibility for all sampled original questions. Six questions, pass threshold five correct; a failed/abandoned practice does not pretend to be a passed assessment. Credit only delayed, actually answered eligible lesson questions, never all twelve. Persist the practice timestamp needed for the wait without interpreting it as learning. A passed seal records a sampled delayed check, not permanent mastery, all-twelve understanding, or an access unlock.

Wait copy must be temporally true: use “Seal attempt opens tomorrow” only if the next eligible timestamp is tomorrow in the learner's locale; otherwise show the exact localized date/time. Do not use a streak/countdown or reset already-earned evidence because time passed. Question feedback uses the original recall explanation, not invented teaching claims.

## 4. Browser ownership and optional account persistence

Backend provides `readWorldLearning(): Promise<WorldLearningSnapshot>`, `subscribeWorldLearning(listener): unsubscribe`, `recordWorldRecall(...)` and `recordWorldCheck(...)`; all writes recheck the ownership epoch. A React hook belongs to the learner-model owner and wraps that gateway; no second localStorage reader in map/feed UI. Clear visible private state immediately on session reset/account switch and ignore late responses. Blocked storage/unreachable ownership is unknown/unavailable, not empty progress. Anonymous/off-account use remains possible after the existing ownership boundary resolves.

Reuse existing `updateProgress`/delta sink for qualifying per-lesson recalls; no protected `src/kit/Lesson.tsx` change is needed. Browser attempt persistence is a versioned, separately owned key. Do not mingle an account's attempts with the browser's pre-sign-in history; apply the existing explicit keep-history choice, account-bound writes, stale-response rejection and sign-out restore/clear semantics.

Backend adds a minimal `world_check_attempt` store and `GET/POST /api/account/world-checks`, following current account feature-switch, same-origin, no-store, validation/rate-limit and account-tag binding conventions. Existing accounts stay optional/off by default. Extend merge/export/deletion and documented retention; migrations have up/down forms. Do not create an account requirement for anonymous play, bypass merge consent, or claim signed-in sync works without service-backed or meaningful transaction tests. Privacy-reviewer and the data-inventory owner must review new reads/fields before source implementation admission.

## 5. Existing player and world return

Feed owner adds an optional island-session context to the existing vertical Feed/player, with an opt-in static `/learn/world/play` entry. Start at the selected valid lesson and swipe in that island's authored order. Do not change ordinary home-feed ranking, personalized order, visibility, account ownership or existing recall priority. A due-revisit entry uses the shared owned original-question recall surface; it does not reopen a lesson and award credit from a reveal.

The public entry accepts only known island/version/start references and explicit lesson/recall intent. Server supplies slim available feed data; client context resolution must not send raw catalog metadata. No intro card before the deliberately chosen stop. At island end offer a normal return/continue choice rather than silently injecting unrelated lessons. Keep protected lesson kit and all existing static `/d/<slug>` pages unchanged by query-dependent rendering.

Return uses bounded island/stop restoration plus the map/list mode and scroll anchor/offset. Save current UI position before entry, restore only when dimensions/content are ready, and keep keyboard focus meaningful. Browser Back, explicit return, resize, missing content and invalid navigation context all need tests. Navigation restoration must not become learning analytics.

## 6. File ownership and parallel-safe implementation

| Owner | Exclusive writes after admission | Consumes |
|---|---|---|
| platform-engineer | world page/client/SVG kit/styles/assets, manifest/server projection/navigation modules, catalog link, platform world tests | shared learning hook/gateway, bounded feed-entry helper |
| learner-model-engineer | pure `world-learning.ts`, `useWorldLearning.ts`, assessment renderer and state/eligibility tests | authored question definitions, backend gateway |
| personalization-engineer | optional Feed island-session branch/entry page and feed-specific tests; normal feed regression tests | shared manifest/projection/navigation/state, original-question assessment surface |
| backend-engineer | `world-learning-client.ts`, attempt API/store/migrations, minimal account-client/merge/export/delete integration and account tests | pure attempt types/scoring contract, owned auth boundary |

No builder edits another owner's files to make a local import pass; share type/export signatures first. No package/config/protected QA/gate edits. If tests show a protected change is required, stop that change and route to evaluation-steward for an amendment rather than working around it. Each builder gets real isolation and capped build parallelism; chief-of-staff integrates explicit commits into a nondefault review branch.

## 7. Required validation, gate remediation and release

Current observed baseline: company check **811 errors / 4 warnings**. Breakdown from prior actual log: **793 published gate failures**, **12 History invalid claim-support values**, **1 Physics hook-length error**, **5 decision-record requirements**. Full verify stops at test:publish **32/34**; the stale real-lesson-version fixture is distinct from actual readiness failures. Later chained suites were unrun, not green.

Remediation route: evaluation-steward owns exact invariant/failing-test triage and legitimate fixture maintenance; category managers route published lesson evidence to independent fact/learner/QA owners; History manager routes invalid support records to content/research/fact owners; Physics manager routes copy-budget repair to its builder with re-review where version changes; the owning decision-record roles supply true documentary repairs. Do not depublish en masse, fabricate newer verdicts, replace old evidence dates, disable assertions or introduce a baseline allowlist to get green.

After real green admission: test latest-right/wrong, same-day rejection, due boundaries, all-completed/practice wait, six-question coverage rotation, version changes, partial/duplicate attempts, account transitions/late writes/merge/export/delete, unknown storage, explicit destination priority and fresh stop 1. Browser tests cover island-order swiping, ordinary feed regressions, deep-link/back/return restoration, 320px bottom-sheet reachability, map/list identity, labels/targets/keyboard/contrast/reduced motion, lazy-scene scroll stability and no fake endless content.

Reviewers receive pinned actual artifacts before builder reasoning. Capture real fresh and clearly labelled seeded-returning phone/desktop screenshots; never present sample evidence as the founder's real history. Founder screenshot approval precedes deployment. Principal-engineer reviews the diff; principal-engineer-ops independently approves tier-2 readiness. Release-manager retains the supported workflow, source-integration and access checks; previous red gates/API denials are not waived here. The world remains opt-in and can be removed from discovery/returned to its prior source through the existing reviewed release process; no new deploy shortcut or invented telemetry is introduced.
