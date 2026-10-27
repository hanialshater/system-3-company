# Number Island: product scope and ownership

owner: head-of-product
date: 2026-10-27
status: agree with changes; manager consultation, not launch approval
source: company/decisions/2026-10-27-founder-number-island.md

## Product answer

Agree with an optional SVG lesson-world view alongside the existing feed. The first prototype is one island containing twelve existing Mathematics lessons. Its purpose is to make a small collection easier to browse and return to. It does not replace the feed, claim better learning, establish a new default lesson order, or change Surface Value.

The founder has approved making the SVG view and deploying this feature when complete. This record settles the product shell only. It is not a category-manager choice of concepts, a personalization/growth approval, a release-gate exception, or a declaration that the current lessons are ready to launch.

## Route and navigation

- Add `/learn/world` as the optional world-view page. Link to it from `/catalog` with an explicit label such as “Explore Number Island.” Keep the existing curriculum list available.
- Keep the main feed and its ordering, intro copy, controls and URLs unchanged for this prototype. A feed navigation entry requires the owning personalization lane's direction and implementation; it is not needed to make this prototype discoverable.
- Each stop opens the existing `/d/<slug>` lesson player. Reuse real lesson titles and status labels from the catalog, and preserve its visibility rules. Do not copy private metadata or claims ledgers into world-map data.
- A lesson entered from Number Island should offer a return to the selected island stop. Use a bounded route marker and a known stop identifier, not an arbitrary redirect URL. Ordinary direct lesson links retain their existing catalog navigation.
- Offer a list presentation of the same stops. Both presentations must expose the same available lessons, real titles and statuses; the artwork must not be the sole way to navigate.
- Keep direct links and normal browser Back working. No account or new saved setting is required to browse the island.

## Collection proposed for the Mathematics owner

Inspection of `content/curriculum/math.json` and the following twelve `src/demos/math/<slug>/meta.json` files confirms that the proposed collection exists and each currently has `status: published`. This is an inventory observation, not an independent lesson-readiness review.

| Proposed area | Existing lesson slugs, in proposed order |
|---|---|
| Number Village | `add-a-zero`, `more-digits-not-bigger`, `the-equals-sign-balances` |
| Fraction Harbour | `three-pizzas-four-people`, `add-the-slices`, `scoops-in-three-cups`, `divide-six-by-zero` |
| Scaling Mountain | `split-the-sum`, `times-can-shrink`, `adding-squashes-the-photo`, `double-the-size`, `cube-the-size` |

The proposed order places the explicitly listed prerequisites before their dependents: place value before decimal comparison, fractions-as-division before fraction addition/division and division by zero, multiplication-as-area before products below one and multiplicative scaling, and area scaling before volume scaling. This check does not settle whether the sequence is pedagogically coherent for a particular learner. `cm-math` owns that decision and may amend grouping or order without expanding the prototype beyond twelve lessons.

## Prototype boundaries

1. One original illustrated island, three visual landmarks and twelve existing lesson stops. No other subject regions, inaccessible “coming soon” levels or duplicate lesson implementations are required.
2. The winding route is a suggested browsing arrangement, not an enforced prerequisite ladder. Every available stop is directly selectable. No lives, countdown, streaks, stars, points, completion reward, lock/unlock mechanic or “mastered” state.
3. No new learning claims, teaching copy, questions or final challenge. The mixed checkpoints and pizza challenge discussed earlier are proposals outside this version. Existing lessons retain their existing prediction/explore/reveal and recall mechanics.
4. Do not read or write learner history for this static prototype. A visible “12 lessons” count describes the collection, not learner progress. Do not imply a learner is new, finished or due for recall without an approved state definition and data boundary.
5. Do not change lesson status, gate records, publication holds, curriculum concepts, personalization weights or the canonical feed order to make the map work.
6. Respect reduced motion; no decorative animation is necessary. Node labels, selected state and keyboard focus must remain readable on a phone. The list view is a first-class navigation option.

## Owner route before implementation

The chief of staff should obtain and record these existing owners' answers. This consultation does not dispatch them or assert their agreement.

1. **Portfolio-manager:** prioritize and approve the existing Number Island board items into `next`; add explicit category and personalization consultation items if missing. The chief of staff remains the shared-board writer.
2. **cm-math:** accept or amend the twelve-item collection, grouping and advisory order; confirm that no new concept or assessment work is hidden in it. Route through existing math strand owners if needed.
3. **vp-personalization:** decide whether this bounded static collection fits the lane's learning-path/gamification scope. Authorize any further growth-designer work through that manager. The recommended first version contains no personalized route or learner-data/progress layer. If completion markers, revisit badges, suggested-next personalization, new challenges or rewards are required, pause that addition for growth-designer's spec, the VP's approval, and the applicable learner-model/privacy route; head-of-product cannot substitute for those owners.
4. **Design-lead:** supplies the original SVG direction and the appropriate interaction/visual specialists. Design and curriculum answers must meet before implementation; a metaphor should not change a lesson's meaning or imply a skill gate.
5. **Principal-engineer:** assigns tier, code owner and implementation boundary for the optional route and return navigation. No kit or feed changes are required by this scope.
6. **Evaluation-steward:** routes independent browser and accessibility checks on the actual artifact, including map/list parity, phone layout, keyboard navigation, real lesson entry and return navigation. This is implementation QA, not a new factual or learner-review verdict on twelve lessons.
7. **Release-manager:** names a supported preview-release path, carries current holds and checks, and records the exact founder approval. Existing red checks cannot be converted to green by product scope. No deployment is claimed here.

## Definition of done for the prototype

- A visitor can discover `/learn/world` through the catalog, understand that it is an optional Mathematics collection, and switch between map and list.
- Each available stop opens the matching existing lesson and supports returning to that stop; titles, statuses and visibility match the existing catalog.
- All twelve stops remain usable with keyboard, touch and reduced motion on the agreed phone and desktop viewports; selection is conveyed by text/state as well as color.
- No feed behavior or lesson content changes; no new learner-data storage or history reads. No collection size or navigation event is reported as evidence of learning.
- Independent owners record their artifact checks; existing verification failures are distinguished from added failures. Release-manager returns a deployment receipt and live smoke check before anyone says it is deployed.

These are functional acceptance criteria, not an experiment outcome. There is no claim of improved learning, completion or engagement and no experiment is registered by this record.

## Objections and answers

- **Ownership:** This looks like a learning path or gamification feature, outside head-of-product's progressive-learning authority. **Answer:** Approve only the optional page shell here; require `vp-personalization`'s written scope answer before implementation, and retain a static, open collection unless that owner approves more.
- **Curriculum:** The twelve-item chat proposal was made without a category-manager ruling. **Answer:** Keep it a proposal to `cm-math`; do not treat this record's prerequisite inspection as category sign-off.
- **Novel assessment content:** The earlier final challenge adds teaching and checking work. **Answer:** Exclude it and the mixed checkpoints from this prototype. The category and quality owners may propose a separate content task later.
- **Existing release failures:** Published metadata alone does not establish release readiness, and full verification already fails. **Answer:** Preserve real status labels and current gates; release-manager owns whether a supported preview can proceed. Product does not waive them.

## Handoff to chief of staff

Associate this response with W-2027. Keep that owner step awaiting the category, portfolio and personalization answers rather than marking the full feature approved or done. Suggested added owner steps: `cm-math` collection sign-off and `vp-personalization` static-world boundary. No application code, tests, board, progress log or event log was edited in this consultation.
