# AMD-016: Explicitly saved account choices in the ordinary All feed

status: proposed — prepared text, not ratified or applied
date: 2026-10-20
proposed_by: founder product direction, company/decisions/2026-10-20-founder-account-personalization.md
prepared_by: evaluation-steward
surface: company/product/surface-value.md only; no QA contract, publication gate or Constitution edit
number: 016 is unused in the shared amendment directory and current-default worktree c82f35f9c; 013–015 are occupied on current default.

## Boundary and inputs

The founder asked: “ok, but we need this in the actual app, save preferences to the account and use them in the main feed, not just a preview, everything in default branch”. That authorizes the product work; it is not recorded ratification of this previously unseen text. Article3 requires a recorded Board disposition before protected changes. This proposal reconciles the exact conflict identified in company/engineering/reviews/2026-10-20-account-personalization-scope.md, using current default c82f35f9c rather than the older shared checkout's Surface Value v1. Privacy contract: company/reviews/_privacy/2026-10-20-account-preferences.md. Preview assumptions and recipe: company/personalization/2026-10-19-preference-preview-recipe.md and its adjacent JSON in the preview branch. No protected file has been edited by this proposal.

## Exact protected text to apply after ratification

In `For the feed`, replace the first bullet with:

> - The default order is subject round-robin, published first, then lessons in review, labelled as such. Every subject chip shows it. The All feed shows it unless a separately authorized order is active under AMD-015 or the saved-choice exception below. Where the default order is shown, the feed says it is not personalised.

Keep the remaining existing bullets verbatim, and insert this rider immediately after the existing third bullet (the cold-start/company-flag rule):

> - Saved-choice exception (AMD-016): with the AMD-015 company candidate off, a signed-in learner may explicitly save and enable subject, experience and preferred-challenge choices for a deterministic, separately versioned order of new lessons in the ordinary All feed, even before completing a lesson. The feed labels this order as based on saved choices, gives a true matching reason for every moved lesson, and offers edit, off and clear controls. No account, missing or unresolved settings, no choices, off, reset or settings failure gives the canonical default; no anonymous choice is persisted or silently imported. Subject chips keep their ordinary default ordering. Due revisits, visibility, active holds and applicable prerequisite constraints take priority over matching. This exception permits only the bounded stated-preference recipe and evidence admission described in AMD-016; it permits no behavior-derived learner state, engagement, advertising input or fitted learning term. The AMD-015 candidate and this exception cannot run together; enabling or combining them requires a further amendment. The existing no-learner-data cold-start promise applies except to these explicitly enabled saved choices.

Replace only the first cold-start trade-off row with:

> | No inferred learner state at cold start: default remains fixed unless the learner explicitly enables saved choices | Saved taste can change the first minute without evidence of learning benefit | head-of-product |

Append this trade-off row:

> | Small, explained shifts from stated preferences, with off and clear controls | Matching is provisional editorial fit, not measured improvement in understanding or recall | founder |

All other trade-off rows remain. The old no-switch row describes AMD-015 only and grants no power over this new exception. Nothing ratifies proposed AMD-008, enables reachable-v3, changes AMD-015 withdrawal powers, approves deployment, changes lesson eligibility/publication, adds ads/mastery/telemetry, or permits a protected QA edit.

## Bounded recipe and editorial admission

The first account candidate must carry a new stable candidate identity plus source, recipe and exported-profile hashes in its admission record. It may reuse only the preview recipe: subject40; selected known experience utilities averaged to0–40; preferred challenge20 exact/10 adjacent; fixed five-card baseline groups, adjacent swaps with at least five-point advantage, maximum two-position displacement, stable ties, preserved per-group subject counts and local subject-run limit. It must not reverse a declared prerequisite relation. Prerequisite constraints do not imply an unimplemented mastery model.

Only current, non-disputed profiles whose five core quality dimensions are known integer0–4, at least2, medium/high confidence, and supported by recorded reason/evidence may move; requested taste dimensions must likewise be known. Unknown, stale, disputed, weak or insufficiently supported profiles stay in their exact baseline slots and block swaps across them. Missing accessibility ratings remain unknown, never fabricated. These are conservative movement guards, not calibrated quality admission or a claim that a lesson is true, accessible, published or effective. Ordinary lesson gates remain binding.

The preview's observations remain provisional. Before admitting their bounded matching use, head-of-product must explicitly accept that uncertainty and the exact profile/version inventory; evaluation-steward must check provenance/freshness/dispute handling against raw records; independent engineering must pin the implemented recipe and prove guards. No historical count (including954) establishes current-default coverage. Incomplete new catalogue coverage is an explicit fixed-baseline fallback. No unreviewed walkthrough or parked draft becomes an observation by export alone.

Later append-only evaluation rounds may refresh profiles within this same rubric/recipe/guard contract without another protected-text change: preserve raw records and disagreements, record source/version hashes and inventory changes, recheck freshness/admission, and obtain independent product/evaluation and engineering acceptance of the new candidate dataset before use. Changed weights, dimensions, movement constraints, evidence threshold, fitted terms or permitted learner inputs require a further amendment. This allows more evaluation later without making an exporter a hidden policy editor.

## Claimed benefit and what it removes

The actual app can remember voluntary choices across authenticated sessions and explain modest feed changes. This removes the unconditional flag-off canonical-order/no-data-at-cold-start promise only for explicitly enabled saved account choices. It does not remove the default option, any reviewer, true-claim/QA gate, published-first eligibility rule, due priority or privacy protection. Editorial fit is a hypothesis about taste, not evidence of causal learning benefit.

## Prediction and test

- prediction: every signed-out/no-row/null/off/reset/read-error state equals the canonical baseline card for card; opt-in ordering is deterministic across complete-catalogue paging and account reload; every moved card has a correct reason; all protected eligibility/priority constraints hold.
- would_be_wrong_if: a hidden input changes order; a stale/unknown/disputed profile moves; a card crosses its bound or reverses a declared prerequisite; a due revisit is delayed by matching; paging duplicates/skips lessons; a failed save is represented as saved; accountA choices/reasons leak under accountB; any automatic enable/storage occurs; or UI calls provisional fit measured learning benefit. Any such violation blocks admission or withdraws the exception to baseline.
- side_by_side: on the same pinned catalogue, compare canonical and candidate complete vectors for synthetic subject/taste/challenge cases, empty/off/error cases and boundary fixtures; record every moved position/reason and constraint refusal. Run compiled onboarding→explicitSave→ordinaryFeed→reload/second-session→edit→off/reset→sign-out/account-switch flows and inspect network/storage. These checks are correctness evidence, not a real-learner outcome experiment. No new learner holdout, tracking or causal claim is authorized. Real-data learning remains backlog, requiring its own approvals.

## Required owner dispositions and independence

Before protected application: founder confirms this exact wording; head-of-product accepts the cold-start trade-off, uncertainty, truthful copy and due-first behavior; evaluation-steward presents and checks provenance/test mapping but does not decide its own proposal; privacy-reviewer occupies the affected-role Board seat and rules on the exact persistent inputs and account rights/lifecycle. Record each actual disposition here or by linked immutable record. A builder cannot substitute for any deciding owner. Presenting these named required dispositions does not assert they have occurred.

Before main-feed activation/integration: separate exact-source product/editorial admission (candidate/profile hashes), privacy final code/rendered-copy disposition and engineering/readiness evidence. Specifically require allowlist/caps/origin/session binding, atomic partial-write races, migration clean/existing-schema/rollback, export compatibility, account deletion, delayed GET/PUT/account-switch isolation, explicit save/off/reset failure truth, paged whole-catalogue ordering and moved reasons, signed-out/off baseline, synthetic-only HQ, phone/keyboard/focus, and unchanged analytics/storage boundary. Use existing company review-workflow evidence reuse; do not claim old ephemeral preview approval covers account persistence. Existing lesson gates, mandatory checks and release approvals remain binding.

## Does it change how the proposer is judged?

Yes. The founder's product direction changes the feed objective against which its builder is judged; the steward writes this proposal/test mapping. Neither builder self-review nor steward approval alone decides it. Board seats: founder, head-of-product, evaluation-steward (presents, abstains as deciding approver), privacy-reviewer (affected role). Independent engineering and readiness assess the exact implementation rather than ratifying product intent.

## Rollback

A company release gate disables the new matching path and returns canonical All order, without enabling reachable-v3 or changing publication/recall rules. Off/reset remain available and authenticated export/delete continue to work; a recipe withdrawal does not erase account rights or silently reactivate choices. Do not drop stored rows as a rollback shortcut. A server/schema failure must fail to baseline with honest unsaved/error copy. Deployment/DB application requires its existing explicit approval; this proposal grants no standing deploy/rollback approval. Reverting protected text is itself an amendment-referenced change under Article3, not a silent edit.

## Objections and answers

- Existing text names only reachable-v3 and a fixed cold start. Answer: narrow explicit exception, mutually exclusive, not an inferred broad permission.
- Preview ratings are provisional and coverage will drift. Answer: current-source/dispute guards, immutable inventory/admission and fixed-slot unknown fallback; no quality or learning claim.
- Saved taste can become inferred profiling. Answer: only explicit bounded choices; no behavior/GAM/Bayesian term, logs/analytics join or silent onboarding import; exact privacy final review remains required.
- Existing recall code may interleave rather than place due recalls first. Answer: do not call it compliant by analogy; product/steward must resolve and test due-first enabled behavior before admission. This amendment does not weaken the protected due-first rule.

## Decision (constitutional review board)

Pending. Exact narrow founder confirmation to present with the final reviewable implementation:

> “Confirm AMD-016: signed-in learners may explicitly save and enable subject, experience and challenge choices in the main All feed, including before their first lesson, using the bounded explained editorial recipe. Anonymous/off/reset remains canonical; the old reachable-v3 policy stays off, no behavioral learning is added, and account export/delete/privacy gates remain. This changes only the saved-choice exception described in AMD-016.”

This is confirmation of concrete protected wording, not a request to repeat the product preference. No ratified status may be recorded until the founder answers and required Board dispositions are linked. Then apply only the exact Surface Value replacement/rider in one dedicated commit with `S3_AMENDMENT=AMD-016` and `Amendment: AMD-016`, preserving unrelated work. Re-read current protected text before application; a changed parent requires reconciling the exact patch, not a blind overwrite.

## Preparation validation

2026-10-20: startup status completed; current-default AMD015 and Surface Value inspected; no protected path edited. Shared-main `npm run check` failed16errors/3warnings in existing History support entries and unrelated founder decision metadata (same categories as engineering routing), log `/tmp/account-prefs-amendment-check.log`. This preparation does not repair or waive those errors. No code/build/browser validation was performed by the steward; implementation acceptance remains pending.
