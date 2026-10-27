# Number Island: personalization ownership boundary

owner: vp-personalization
date: 2026-10-27
status: agree with changes; scope answer, not launch or QA approval
source: company/decisions/2026-10-27-founder-number-island.md
inputs: company/product/number-island-scope.md; company/design/specs/number-island-direction.md

## Manager answer

Agree to the bounded first prototype: one optional, static Number Island collection at `/learn/world`, with twelve existing lesson stops, map/list parity, and an ordinary catalog entry. This is a curated browsing surface. It is not an adaptive learning path, a mastery map, a new feed policy or a gamification rollout.

The category manager owns the collection's concept selection and advisory sequence; the head of product owns this optional page's product scope. This answer accepts the personalization boundary only. It does not substitute for cm-math's sequence answer, engineering tier/readiness, independent accessibility/browser review, privacy disposition or release-manager's gates.

## Boundary for implementation

1. **Keep the feed unchanged.** No change to its default order, composer, subject chips, intro copy, revisit schedule/placement, profile controls or personalization flags. Do not add a feed entry for this prototype; the catalog entry supplies discovery.
2. **No learner-data layer.** The world page must not import or call progress/history/account/identity/settings stores, browser storage, personalization APIs or model/composer modules. Do not copy existing learner data into a new map store. The existing lesson player can retain its existing behavior; entering it does not authorize the map to read its records.
3. **No inferred state.** Opening, selecting, visiting or returning from a lesson does not produce a completion marker, learned state, score, mastery claim or revisit badge. Do not count selected stops, visits, clicks, dwell or navigation as learning evidence.
4. **No game progression policy.** All stops permitted by existing visibility remain open. No locks, stars, rewards, badges, currencies, streaks, countdowns, challenges, checkpoint questions or automatic advance. “Level” names the collection, not an earned learner state. A summit or flag is scenery, not a completion reward.
5. **Use shared public lesson data.** Derive titles/statuses/availability from the same public catalog policy as the existing surfaces. Twelve is a collection-size statement, not a personal progress denominator. Never present publication metadata as mastery or independent factual endorsement.
6. **Selection is navigation only.** A selected stop may live in component state and a bounded URL identifier. Do not persist it in cookies, localStorage, sessionStorage or a profile, and do not inspect browser navigation history or learning history to restore it. Reading the current URL's allowlisted map/stop marker for an explicit round trip is permitted navigation state; it is not an identity or learner-history input.
7. **Return links are fixed and explicit.** Only an entry from the island should get its island-return affordance. Use a known destination and validated stop identifier, not a free-form return URL. Ordinary direct lesson entry keeps its existing catalog navigation. Returning to an island stop restores selection, not a claim that the lesson was completed. No automatic next-lesson launch.
8. **No new tracking for the prototype.** Do not add page-specific analytics, collection counters, recommendation requests or experiment assignment to this bounded implementation. Existing site behavior is not permission to expand data collection here. Any proposed addition returns to privacy and the appropriate owner first.

## Existing-role route and order

The chief of staff performs dispatches only after the owning manager's direction and passing actual preflight. This document dispatches no one.

| Order | Existing owner | Narrow handoff |
|---|---|---|
| 1 | cm-math, via head-of-product | Confirm the twelve existing lessons, grouping and advisory order. This is not an approval of a learner's readiness or mastery. |
| 2 | growth-designer, through vp-personalization | One bounded review of the interaction spec/mockups for coercive progression, implied completion/mastery, inappropriate rewards or misleading “level” language. Return findings to this VP and design-lead; do not design badges, progress states or a gamification PRD. |
| 3 | interaction-designer and design-lead | Resolve selection, map/list parity, mobile interaction and explicit return to a known stop. Preserve the boundary above in the implementation brief. |
| 4 | platform-engineer, through principal-engineer | Implement the approved navigation surface and bounded return link. No personalization-engineer, learner-model-engineer or learner-data-engineer code change is needed under this boundary. If implementation needs one, pause that scope and route it here. |
| 5 | evaluation-steward | Route independent checks on the built artifact: map/list identity, real lesson round trip, no map storage/history/account reads, no automatic completion/progression, and unchanged feed behavior. Include privacy-reviewer for the applicable data/no-new-data disposition; this VP cannot supply it. |
| 6 | release-manager | Carry the founder's recorded approval for this specific preview and satisfy the supported release path and existing checks. Manager agreement does not waive red checks, integration rules or privacy/experiment requirements. |

The growth-designer pass is a review of the navigation metaphor, not authorization for new gamification. This manager authorizes that narrow consultation after the interaction artifact exists; it does not authorize a build dispatch while operational preflight is red.

## Experiments and learning claims

No personalization rule, mastery definition, experiment result or improved-learning claim is approved here. The collection is selected by editors, and the learner chooses what to open. The VP's role constraints on live changes, privacy and registered experiments remain in force; this manager consultation is not a declaration that a release has met them. If owners propose a live personalization/gamification experiment or make an outcome claim, analytics/evaluation must define and register it before a run, with the required independent/privacy route. Do not invent an experiment or retroactively register one merely to turn a navigation build green.

## Objections and answers

- **VP-personalization:** A winding path and numbered stops can imply that the product has assessed what the learner should do next. **Answer:** Present it as a curated collection with an optional suggested order, keep every available stop open, and have growth-designer review the actual copy and mockup. No “ready for you,” “your next step,” or learned/completed states.
- **VP-personalization:** Reusing the existing progress store would look inexpensive but crosses learner-history and account-ownership boundaries. **Answer:** No store or history read in this version. Completion and revisit features require a separate growth-design specification, learner-model semantics, privacy review and VP decision before implementation.
- **VP-personalization:** A return link could silently become persistence or tracking. **Answer:** Keep it explicit, bounded and URL/component-state-only; record no new events and infer no completion on return.
- **VP-personalization:** The founder asked to deploy, but a manager scope answer cannot certify release readiness. **Answer:** Preserve the exact preview approval in the founder record; release-manager owns the supported release route, independent evidence and existing holds.

## Handoff

Associate this answer with W-2027 and the proposed personalization consultation step. Chief of staff should record “boundary supplied; scoped growth-designer interaction review pending,” not “personalization QA passed” or “ready to ship.” Next immediate owner is interaction-designer via design-lead once category/product/engineering prerequisites allow the spec; the subsequent growth-designer review comes through this VP. No application code, assessments, board, progress log or event log changed in this consultation.
