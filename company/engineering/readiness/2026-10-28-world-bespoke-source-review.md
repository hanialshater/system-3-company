# Bespoke Number Island artwork and ambient motion: peer source review

owner: principal-engineer
date: 2026-10-28
tier: 1
base: 38d31a1a9
reviewed: 537e55b93, 3bfc2bb7e, 541c29f30463964c08040eba17e6ecc323733901, 8da6daf32
verdict: GO for bounded inspection, conditional on the integrated production build and final built-artifact QA

I read the actual assets and integration source before the builder's self-check. I did not run a duplicate compiler or build, and do not claim other reviewers' browser observations as my own. This is a source-level peer review of the existing-route presentation boundary.

## Findings

- Parsed all six SVG files as XML. No script, foreignObject, embedded image, hyperlink, SMIL animation, embedded style element, event-handler attribute or off-origin reference was found. Base-art references are internal fragment uses/gradients; symbol IDs are unique within each file. The emblem sprite contains15 symbols matching the14 subjects and Number Island crest. React's external sprite use points to the same-origin static asset and an allowlisted subject identifier; unknown subjects get a harmless geometric fallback.
- Bespoke art is opt-in through the static `number-island` mapping. Other islands retain the generic fallback. Number Island remains1000×1400 with the same three region hubs, twelve lesson controls and membership spokes. No new lesson label, route, registry, prerequisite, publication value or progress state is introduced. The north-inlet refinement changes decorative coast paths only.
- The art container and all image layers use `pointer-events:none`; images have empty alt text, are not draggable, and the decorative wrapper is aria-hidden. The unchanged HTML lesson controls follow the background layers and retain their existing accessible labels and selection behavior. Emblems are decorative alongside the existing text names. Source stacking leaves the original branch controls above the scenery; actual visual/tap clearance remains final QA's responsibility.
- Four CSS-only ambient loops animate low-amplitude transform/opacity changes, using this CSS module's selectors and keyframe declarations. There is no added per-frame JavaScript loop or document-wide gesture handler. The animation toggle is outside the transformed canvas; pausing changes the layer play state rather than changing map geometry or lesson state.
- Reduced-motion state initializes true, so the server/initial client presentation is static. The effect reads the media preference, subscribes to changes and removes that exact listener on unmount. Reduced motion forces the control off, and a media rule independently sets `animation:none!important` and removes will-change hints. This prevents the later normal-motion selectors from accidentally restarting animation in a reduced-motion context. I do not claim a measured low-end-device performance budget from source alone.
- The optional motion choice is restored only when its value is boolean and the existing slug/island/view navigation snapshot is valid. Missing old fields keep the default preference behavior; storage exceptions remain caught. Existing player return spreads that navigation snapshot, preserving the optional field. No account sync, learner-progress write or analytics event is added.

## Landing conditions and limits

The ordinary tier1 builder self-check/changelog exists in8da6daf32. Record the one integrated production build, then final actual Number Island/atlas/List assets, pause/off and reduced-motion behavior, pan/pinch, stop activation and player return checks against its build identity. Existing focused helper tests and aggregate failures should be recorded honestly, without a whole-company content repair round or a false verification/publication claim.

No source-level blocker was found. This approves the bounded decorative integration rather than every other island's future artwork, art taste, unmeasured mobile performance or a hosted deployment. Rollback is an additive revert of this integration and its static assets, preserving all lesson content and metadata. No new EDD or separate tier2 ops approval is introduced by this existing-route tier1 change.
