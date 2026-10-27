# Number Island: design manager direction

owner: design-lead
date: 2026-10-27
status: agree with changes; direction only, not artifact approval
source: company/decisions/2026-10-27-founder-number-island.md
board: W-2026

## Decision

Agree to an original illustrated SVG world as an additional way to browse lessons. Treat Number Island as one level containing twelve lesson stops and three landmarks, rather than twelve separate levels. The existing feed and lesson interaction contract stay intact. This is a navigation surface, not a new lesson format; do not change the kit or format catalogue merely to add it.

Changes to the chat proposal: no new final challenge or checkpoint assessment in this first build; no locked gates, stars, currencies, streaks, mastery claims or automatic claim of completion. The land itself supplies the sense of adventure. Completion and revisit markers are optional follow-up scope owned by personalization; they must not be fabricated or read from browser storage before account ownership has settled.

The twelve proposed lessons and their order remain head-of-product/cm-math/learning-designer decisions. Design accepts the three-landmark structure as a layout hypothesis, not as approval of a curriculum or its prerequisites.

## Original art direction: a little atlas to explore

Use a crisp, hand-composed paper-atlas aesthetic with gently irregular coastlines, layered land shelves, small ink details and a winding footpath. Evoke exploration through geography and route composition; do not copy Mario characters, blocks, pipes, badges, sprites, sound or recognizable map silhouettes.

- **Sea:** a quiet deep blue-green field with sparse short wave marks and two small abstract islets. No animated background or parallax.
- **Land:** warm pale sand at the shore, muted mint lowlands and moss-green raised areas. A narrow dark coast outline and an offset darker land shelf give depth without heavy shadows. Use a restrained palette; reserve the brightest accent for the selected stop.
- **Number Village:** three small houses, a low garden wall, grouped trees and a signpost. Buildings are illustrative scenery, not mathematical evidence. Stops 1–3 form a readable arc around a village green.
- **Fraction Harbour:** a curved inlet, short timber jetty, two small boats and a lighthouse. Stops 4–7 follow the inlet, with generous clear water around labels. Do not draw a pie/pizza or marked fraction as part of the scenery: lessons carry their own teaching evidence.
- **Scaling Mountain:** overlapping rounded foothills rising toward one distinct summit, a small bridge and a summit pennant. Stops 8–12 climb in a broad switchback. The last stop gets a landmark, not a reward or a claim of mastery.
- **Route:** one continuous cream/sand trail with a dark edge, mostly curved, never crossing a node or itself. A discrete dashed centre can distinguish the suggested sequence. Show all stops as available, subject to actual application visibility.
- **Type:** retain the company's system UI sans for every control, status and lesson title. Region names can be larger and heavier, with restrained tracking; no new font dependency. Keep navigation and lesson detail on calm product surfaces using the existing system tokens.

Suggested scene palette for visual-designer to refine and accessibility-reviewer to measure: sea #173C48, sand #E8DCB9, lowland #B8D8AD, raised land #789D70, ink #17332D, accent #F5C45C. These are art candidates, not approved contrast tokens. Text and functional state must follow company/design/system.md; decorative colors do not become UI text colors by assumption.

## Composition and responsive behavior

Desktop: a full map panel beside a compact selected-lesson panel. Reading order is page heading, view controls, region choices, stops in curriculum order, selected-lesson details. Place Number Village lower left, Fraction Harbour across the centre and Scaling Mountain upper right. Keep terrain in SVG and place interactive stops/labels in semantic HTML, sharing one coordinate model.

Phone: do not shrink twelve desktop targets into a postcard. Use a vertical island composition with three stacked region scenes and generous breathing room; the detail panel follows the active region or sits below the map without covering nodes. All twelve lessons must remain reachable, with a persistent map/list control. No page-level horizontal overflow at 320 CSS px. An optional regional map view is acceptable only if all three regions are clearly selectable and the full lesson list is one action away. Interaction-designer and mockup-artist must resolve this choice before implementation.

No meaning-carrying text should depend on tiny SVG text. Put lesson names and region names in HTML wherever possible. Desktop labels must not overlap coastline details, other labels, the selected marker or route. Zoom must not be necessary to operate a stop.

## Interaction contract for the specialists

1. An ordinary catalog link opens the world page; the feed remains available via an ordinary link. Proposed route `/learn/world` is subject to engineering confirmation.
2. All available stops are operable immediately. The route suggests an order without imposing it.
3. Selecting a stop updates one detail panel with the real lesson title and real publication status. Selection does not mark a lesson done, start media, navigate away or require a drag.
4. A separately labelled action opens the existing lesson player. Supply a specific return-to-island link and preserve the selected stop, without arbitrary return URLs.
5. A list view exposes the same lessons in the same order and supports the same opening action; it is not a reduced set of content. Use ordinary buttons/links, not a custom game controller.
6. Region selection and stop selection are visibly distinct. Highlight selection with an outline and text/state as well as color. Do not use disabled-looking treatment for available lessons.
7. Browser back/forward should restore the selected stop when feasible; avoid a browser-history entry for every incidental hover. Hover conveys no unique content.

## Accessibility and independent review requirements

- HTML buttons or links, logical tab order, visible focus, and rendered targets at least 44×44 CSS px. The selected stop has an accessible state and a name including its lesson title; decorative SVG is `aria-hidden`.
- Functional graphics need 3:1 contrast and normal text 4.5:1 against their actual backgrounds; measure candidates in both light and dark mode rather than inheriting decorative colors for text.
- No drag-only, pinch-only or hover-only action. Enter/Space behavior follows native semantics. Stop selection must not unexpectedly move keyboard focus.
- 200% text resizing and 320 px reflow keep controls, full lesson titles and open actions usable. The list view is available even with reduced motion or blocked storage.
- Selection transitions settle within 450 ms and are removed under reduced motion. No continuously moving boats, water, clouds or rewards.
- If progress is later included, distinct text/icons identify completed and revisit-due; viewed, completed and learned remain different states. Independent personalization and privacy ownership must be resolved before any such implementation.

## Manager-approved sequence of existing roles

The chief of staff performs each actual dispatch after its preflight and the owning lane manager's direction. This table is a design-lane recommendation, not permission to dispatch another manager's specialists.

| Order | Existing role / manager | Narrow output and dependency |
|---|---|---|
| 1 | head-of-product | Confirm first-build scope and entry points; route the twelve-lesson sequence through cm-math and learning-designer as needed; portfolio-manager prioritizes board steps. No invented curriculum approval. |
| 2 | principal-engineer | Classify risk/tier, identify implementation owner and confirm routing, return behavior and progress boundary. Platform-engineer is the likely app-shell owner; this is that manager's decision. |
| 3 | interaction-designer | After product sequence: specify selection, region navigation, mobile map/list choice, DOM order and return path. Output company/design/specs/number-island-interaction.md. |
| 4 | mockup-artist | After interaction spec: two deliberately different 390×844 SVG wireframes (vertical continuous map versus region-focused map), plus a desktop composition and notes. Output company/reviews/number-island/mockups/. These are hypotheses, not production art. |
| 5 | visual-designer | Refine art candidates and UI token roles, coast/path/node treatment, title hierarchy and selected state; provide handoff to the implementation owner. Independent accessibility reviewer measures functional contrast through evaluation-steward. |
| 6 | design-lead + head-of-product | Select composition based on mockup artifacts and practical phone fit before implementation. This is direction selection, not approval of our own finished design. |
| 7 | platform-engineer, via principal-engineer | Implement the page, production SVG composition, entry/return links and existing-data adapter. No kit, feed ordering, auth, learner-data or lesson-content changes unless separately routed. |
| 8 | evaluation-steward | Route independent QA and accessibility review with built page URLs/screenshots and requirements, excluding builder rationale. Include a real round trip into a lesson, keyboard flow and phone layout, not only an SVG screenshot. |
| 9 | release-manager | Verify gates, target and founder authorization; deploy only through a supported release path and report receipt plus live smoke checks. No design role may waive red gates. |

Do not dispatch specialists until the preceding owner inputs and actual dispatch preflight permit it. Manager consultations are not a way to relabel implementation when build dispatch is blocked.

## Definition of a reviewable first build

The company can inspect a real world page with original vector scenery, twelve available lesson stops, consistent actual title/status data, map/list parity, usable phone and desktop layouts, and a working return trip to the selected stop. Evidence includes screenshots at 390×844 and desktop, keyboard and reduced-motion checks, state/routing tests, and a baseline-versus-change check report. No independent design, accessibility, pedagogy or release approval is asserted by this direction document.

## Objections and answers

- **Design-lead:** Treating every stop as a small locked game level makes a twelve-lesson world look sparse and invents progression policy. **Answer:** Number Island is one level with twelve open lesson stops and three landmarks; no locks or rewards in the first build.
- **Design-lead:** Shrinking a wide SVG to phone width makes targets and titles unusable. **Answer:** Require a dedicated phone composition and a complete list view; choose between the two mobile mockups before implementation.
- **Design-lead:** Art direction cannot validate the suggested curriculum or progress signals. **Answer:** Route curriculum to product/category owners; omit new assessment content and defer progress until personalization ownership is explicit.
- **Design-lead:** I cannot independently approve a design I authored. **Answer:** Keep this as manager direction; evaluation-steward routes independent built-artifact review and unresolved findings remain release blockers.

## Handoff

Next owner: head-of-product for product scope and category routing, then principal-engineer for technical tier/owner. Chief of staff should mark W-2026 direction supplied and link this file; W-2027 and W-2028 remain pending their owners. Do not mark art, UI, QA or deployment complete.
