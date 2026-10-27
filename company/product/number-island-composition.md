# Number Island: composition choice

owner: head-of-product
date: 2026-10-27
status: select B with changes for implementation; not launch or release approval
source: company/product/number-island-scope.md

## Artifacts inspected

Viewed the rendered internal mockups in `company/reviews/number-island/mockups/`: `phone-a-continuous.png`, `phone-a-continuation.png`, `phone-b-regions-village.png`, `phone-b-regions-mountain.png`, and `desktop.png`. These are SVG composition previews, not working-page screenshots or evidence of browser accessibility.

## Choice

Select **B: region-focused phone composition**, with the full-island/sidebar composition on desktop. In B, the selected stop, complete title/status and explicit Open action are near one another. All three region choices remain visible. The five mountain stops fit without the continuous layout's long separation between an early stop and its lesson details. A's own continuation shows that unresolved separation; do not implement A as the default phone layout.

Keep one twelve-lesson collection, not three earned levels. The region control changes the visible scene, not lesson availability or learning state. The list must show all available stops in editorial order, across all three regions.

## Changes for visual and engineering handoff

1. Use **Mathematics · {available count} lessons** on desktop as on phone. Omit the desktop mockup's `LEVEL 01` framing in this first version: the Mathematics owner's boundary is an open collection with assumed entry skills, not a validated beginner course or attained level.
2. Replace desktop **Your next exploration** with **Selected lesson** or the specified **Selected stop {number} · {landmark}**. Selection is a choice, not a personalized next recommendation.
3. Render real full lesson titles and canonical status labels from the catalog projection; selected details and list entries grow for long titles. The mockup's fixed rectangles are not a license to crop text or constrain detail height.
4. Keep Map/List visible in either mode. On phone, render all region controls; at 320 CSS px allow wrapping and additional scene/detail height. Preserve native controls, at least 44×44 rendered targets and clear focus distinct from selection. Do not shrink the desktop map's twelve controls to phone width.
5. Retain the original village/harbour/mountain scenery and sand path as illustration. Remove internal variant labels, layout notes and mockup annotations from the application. No rewards, completed markers, locks, checkpoint questions or history/progress reads.
6. Implement the shared URL/return contract in `company/design/specs/number-island-interaction.md` and EDD-017. Restore stop, view and derived region on explicit return; ordinary lesson entry retains existing navigation. This choice does not authorize alternate URL behavior or protected-kit edits.

## Owner inputs and next step

`company/product/number-island-math-sequence.md` accepts the twelve lessons and advisory grouping/order with entry-boundary constraints. `company/product/number-island-personalization-boundary.md` accepts the bounded static collection without learner state or a feed change. `company/product/number-island-priority.md` supplies portfolio routing. These are scoped owner answers, not independent QA or release verdicts.

Design-lead and visual-designer can refine B and the desktop treatment; principal-engineer should send that chosen composition and the reviewed EDD to the assigned implementation owner, subject to actual dispatch preflight. No further founder approval of these internal SVG mockups is required before implementation. The founder checkpoint is **actual working-page phone and desktop screenshots after implementation, before deployment**; the user reviews that concrete page. This record does not satisfy that checkpoint or grant release clearance.

## Objections and answers

- **Continuous composition exposes all regions at once.** Answer: retain that overview on desktop and expose the complete ordered collection through List on phone; choose B to keep phone selection and action together.
- **Mockups appear to fit, but do not prove 320 px reflow or accessibility.** Answer: implementation must preserve the stated size/text behavior, and independent quality owners must test the built artifact. No mockup-only pass is asserted.
- **An internal composition review could become an extra founder gate.** Answer: this is the company's implementation direction. Build the actual page, then present the required working-page screenshots before any deployment; do not ask the founder to approve internal wireframes as a substitute.

No app, board, progress or event file was edited for this composition choice. No implementation, assessment, publication or deployment is claimed complete.
