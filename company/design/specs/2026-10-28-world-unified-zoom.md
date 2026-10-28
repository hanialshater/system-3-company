# Lessons World: shared style, zoom and immersion

owner: design-lead
date: 2026-10-28
status: implementation direction approved; actual artifact review still required
source: founder conversation approving work on List/World consistency and immersive zoomable World
implementation owner: platform-engineer

Inspected the existing World/List source and actual saved phone World capture at `company/design/previews/2026-10-28-lessons-world/phone-world.png`. This is a bounded presentation and interaction change to the existing 3,895-lesson World; no lesson content, publication, progress or assessment change is proposed. The founder has already approved the work; another concept or screenshot-confirmation loop is unnecessary before implementation.

## One visual family

- Keep the illustrated ocean, warm cream, forest ink and lime selected-stop palette in both views. Share the same wordmark, Map/List control, subject jump, island titles, region hints, selected lesson sheet and Open lesson action.
- List is the World's compact travel journal: use the same island number/heading treatment, a restrained decorative landmark or shoreline motif per island, region headings and a fine connecting route beside numbered stop badges. Rows remain readable cream surfaces on the ocean; avoid a large unrelated white catalog panel.
- Use the same circular stop number and lime selected state in Map and List. Give the selected List row a clear border/background as well as colour. Keep its real question prominent, time and Unchecked status secondary. Preserve actual Draft/In review distinctions without adding Published marketing copy.
- Keep all 3,895 List entries semantically available, with existing direct opening and keyboard behavior. Do not instantiate full terrain SVGs for every List row; one small decorative motif per island is enough.
- Reuse shared typography, corners, shadows and spacing. Use inline SVG icons for Open, Feed, zoom, reset and immersion controls: the inspected browser capture shows missing-glyph boxes for some text-arrow glyphs.

## Map navigation

- Default to **100%**. Recommended bounded map range is **100–200%**, with +/- buttons stepping by 25%, a readable percentage, and Reset returning to 100% and a sensible current-stop/viewport position. Keep native document/vertical journey scrolling usable at 100%.
- Two-finger pinch changes map magnification about the touch centroid. When magnified, one-finger or mouse dragging pans the map, clamped to its actual reachable bounds. Desktop +/- and Reset provide a complete alternative to gestures. Trackpad pinch/modified-wheel may zoom; ordinary wheel remains journey navigation.
- Zoom/pan only the illustrated map content. Keep chrome, controls and lesson detail at normal physical size; Map stops already have at least 44px targets and must never shrink below that floor. Do not disable the browser's accessibility zoom globally.
- A tap selects a stop; movement past a small drag threshold suppresses that tap. Dragging must not open lessons, steal button/link activation, select text or continue after pointer cancellation/loss. Controls and the bottom sheet never initiate a map drag.
- Maintain the viewed location when changing scale, selecting a distant subject, returning from a lesson, or rotating the phone. Reset must recover an off-centre view. Render/lazy-load only real existing islands; panning never invents more content or a locked next island.

## Immersive view

- Provide an explicit **Expand world** / **Exit immersive view** toggle with an inline SVG icon and visible label or accessible name. A viewport-filling presentation is sufficient; browser fullscreen is optional, not a dependency for phone support.
- In immersive Map view, hide the large introductory block and use the full available canvas width/height. Retain a compact Map/List/exit control strip, zoom controls, subject access, and the selected lesson's compact bottom sheet or floating desktop card. Keep Exit and Open lesson reachable without hunting or overlapping one another.
- Exit restores the ordinary page layout without losing selected stop or viewed area. Escape exits immersion and clears an active drag without navigating away. Switching to List shows the matching journal styling at normal text size, with map gesture handlers inactive; switching back retains the map's useful view state.
- Minimum fixed control targets: 44×44px. Respect safe areas and reduced motion. The 390×650 short phone must retain an obvious exit and Open lesson action without horizontal overflow.

## Focused acceptance

Inspect actual phone, short-phone and desktop artifacts for shared Map/List styling, pinch/+/-/Reset, drag-versus-tap, immersion/exit/Escape, subject jump, keyboard opening, and lesson return with selection/view preserved. Verify List still exposes 3,895 unique stops and the normal TikTok feed/player remains usable. No whole-company content review wave or publication promotion is required for this presentation slice.

This direction is ready for the platform-engineer now. Built-artifact design/QA review must be independent of the builder; this specification does not approve its own future implementation or claim hosted deployment.

## Founder correction: the world branches by nature

The founder subsequently directed: **“The world should not be linear, it is branching by nature.”** This supersedes the corridor/journey composition above. Preserve its shared styling, accessibility and gesture safeguards; the World itself must now offer meaningful spatial choices. The existing lesson-player order remains a contextual playback convenience, not the topology of the World.

- **Atlas:** compose subject landmasses as a two-dimensional archipelago, with multiple visible open destinations. Subject hubs open their existing island/topic clusters. Do not connect island 1 to island 162 as one road or reproduce that road with decorative forks.
- **Focused island:** arrange its existing 3–5 region hubs around a central island landmark, and branch lesson leaves from each region hub. The initial Number Island therefore exposes Number Village, Fraction Harbour and Scaling Mountain as three simultaneous choices. A region can show its 3–5 lessons as a small fan or constellation; each leaf opens its actual question. Region membership is a collection relationship, not an asserted prerequisite.
- **Real routes:** the engineering owner derives cross-island/concept edges only from actual curriculum links. Use visible subject/topic labels and open “Related topics” destinations. Distinguish collection branches from real curriculum relationships in the visual key; do not invent prerequisite claims, readiness, completion gates, a required route, or an unlocked next island.
- **Hierarchy:** subject name is the large orientation label; island name and region names are medium landmarks; lesson questions are short leaf labels. Use selected halos and readable labels instead of a map-wide 01→25 sequence. Stable island IDs, slugs, hash links and player ordering are retained internally. A suggested lesson may stand out, but every other branch remains selectable.
- **Camera:** start fitted to the current atlas/cluster, with useful open choices visible above the mobile sheet. In focused island view the three initial region hubs should be visible together before a learner pans. Provide a clear Overview action and Atlas / Subject / Island breadcrumb navigation. Keep the selected question in view when changing camera or returning from playback.
- **Zoom:** treat 100% as the fitted current composition, not a requirement to squeeze the entire 3,895-node world onto one screen. Navigate between atlas and focused clusters, then zoom/pan within that composition. Zooming out/recentering must recover context, and labels/controls retain a 44px interaction floor even when scenery is smaller. Geometry may scale; chrome, sheet and hit-target floors do not.
- **Scale:** render a focused cluster and nearby meaningful related destinations, not all 3,895 SVG leaves simultaneously. All content remains reachable through subject hubs and the complete shared-style List. List is grouped by the same subject/island/region hierarchy and can expose real related-topic links; it stays a compact accessible way to find a question.

**Revised acceptance:** a newcomer can choose at least two different topic branches without first visiting another stop; one cluster visibly contains multiple region/lesson choices; an actual cross-island relationship leads to the correct destination; Overview recovers orientation; every lesson remains reachable via Atlas/List; no path implies an access lock. Validate phone and desktop fit, pan/zoom, independent branch selection and lesson return. No new mockup or founder confirmation loop is required before building this correction.
