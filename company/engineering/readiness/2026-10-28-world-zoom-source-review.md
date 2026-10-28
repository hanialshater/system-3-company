# Branching World, shared List and camera: independent source review

owner: principal-engineer
date: 2026-10-28
tier: 1
base: 0fc13b86a255e5bbdaba1a005e08723643928aaa
reviewed-builder-commits: 7ff5ec195, 8a6528dfa, 7bbea20455ad91a8e43b05cceea3da2718972cc5
integration-equivalents-known: f5114cba0, f30dc9c16; coordinator must include the reviewed7bbea2045 breadcrumb supplement
verdict: GO for bounded unchecked inspection after the reviewed supplement, integrated build and focused artifact QA pass

I inspected the actual connection helper, server projection, camera math, viewport lifecycle/gesture handlers, branching scene, Map/List state and navigation persistence, player return change, styles and focused test cases. This is a source review; I did not run a duplicate compiler/build or claim browser findings as my own. The scope remains the existing-route presentation boundary in `2026-10-28-world-zoom-scope.md`.

## Source findings

The connection helper derives links only from existing curriculum concepts and registered lesson-to-island membership. It normalizes same-domain and qualified prerequisite identifiers, maps concepts to sets of island IDs, omits missing/self edges and deduplicates actual topic reasons. It uses no recursive topological assumption, so island aggregation cycles cannot hang layout. Membership spokes in the focused scene are explicitly described as topic membership/choice rather than prerequisite gates. All existing island/player identifiers and the full List remain available.

The server keeps full curriculum files on the server; the World receives existing slim lesson presentation fields and selected public connection identifiers/labels. No new endpoint, arbitrary fetch/destination, dependency, metadata/registry schema, auth/account operation, learner-data persistence, kit/global Feed edit or deployment configuration change appears in the reviewed source. Existing URL constructors continue to encode actual inventory identifiers.

Camera state is finite and bounded through `readCamera`: scale1..2 and normalized pan0..1. The1000px detailed canvas permits real horizontal exploration at100%; the visual canvas transform has matching reserved document height from unscaled ResizeObserver measurements. Chrome, zoom controls and lesson sheet stay outside the transform. Zoom buttons, canvas keyboard shortcuts, scoped Ctrl-wheel and two-finger handlers use content anchors; normal wheel/single-finger vertical movement remains browser-owned. Desktop drag captures only after a movement threshold; release/cancel/lost-capture handlers clear dragging state. Gesture-generated clicks are suppressed while keyboard activation remains accepted, and new mouse/touch starts clear stale suppression.

Navigation-only v2 snapshots validate the actual slug/island/view association, finite scroll value, bounded camera and allowed focus/subject values. Storage errors are caught. Legacy v1 data is ignored safely rather than applying the former very long corridor's pixel offsets to the new focused scene; explicit URL selection still determines the lesson. The WorldPlayer updates the active slug in the v2 return snapshot without touching lesson progress. Actual return alignment and gesture/browser timing remain QA responsibilities.

The detailed map renders one island's modest set of region hubs/lesson leaves; atlas and subject levels render their active level. It does not create3895 detailed map controls at once or run a force layout. List deliberately keeps the complete accessible inventory. I make no measured mobile-performance, contrast or screen-reader certification from this source review. Controls are semantic buttons/links with visible focus and explicit zoom/immersive labels; keyboard focusing a clipped lesson calls the horizontal reveal path. In-app immersive mode has a visible exit and Escape behavior and does not require Fullscreen API permission.

## Issue found and disposition

The initial8a6528dfa subject breadcrumb used the selected island's domain even while a different subject was being browsed. Atlas → Life could therefore show Mathematics and navigate back to it. **Reviewed fix7bbea2045 resolves this:** subject focus uses the actual navigation subject, island/List focus uses the selected island's subject, and the atlas omits a misleading unrelated subject crumb. Include that supplement before landing. No remaining source-level blocker was found in this bounded review.

## Landing conditions

Run the one integrated production build and focused built-artifact checks for atlas/subject/island branching, both Map/List styles, actual lesson count, pinch/Ctrl-wheel/buttons/drag and tap separation, native scrolling/cancellation, clipped-stop keyboard reveal, immersive exit, and lesson return with camera/selection retained. Record inherited aggregate failures honestly; do not resume whole-company content repair or mark unchecked lessons verified. The implementing engineer's tier1 self-check/changelog is in7bbea2045; no new tier2/ops approval round is introduced. Preserve source/build identities and refreshed screenshots.

Rollback is an additive revert of these World-only implementation changes, preserving all lesson content, publication values and existing review records. This GO does not claim a hosted deployment or approve unrelated deployment/configuration work.
