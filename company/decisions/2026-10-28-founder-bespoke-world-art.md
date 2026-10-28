# Founder ask: bespoke islands, scenery, emblems and motion

owner: design-lead
date: 2026-10-28
status: decided
class: format
route: design-lead → visual-designer → platform-engineer → qa-tester
recorded by: chief-of-staff

## What the founder said

“Look this is Nice but we will need bispok designed islads, visual elements aroud and animations, probably logos it should be a very nice experience”.

## Decision and concrete proof

Build the first bespoke Number Island proof to establish the visual standard for later islands: an original coastline and distinct village, harbour and mountain scenery around the existing three branches and twelve questions. Keep the existing 1000×1400 scene geometry and all question/hub positions. Four lightweight ambient layers provide water, clouds, lighthouse light and boat motion, with a visible pause/off control and static reduced-motion behavior.

Use original subject emblems for the fourteen actual subjects and a Number Island crest, paired with existing text labels. Keep the System 3 wordmark. This is an illustrated identity layer, not a third-party logo collection or a company rebrand.

The first proof is a concrete reviewable result; it does not claim that all 162 islands already have bespoke scenes. All 3,895 lessons remain visible, publication and factual verification stay unchanged, and the branching atlas/camera/player behavior remains intact. Push the reviewed proof to the existing inspection branch for the founder's deployment and show actual app screenshots.

## Route and answers

- **Design lead: agree.** `company/design/specs/2026-10-28-world-bespoke-art-proof.md` freezes inflated quiet zones, specifies asset/engineering ownership and records actual visual feedback. The independent visual review requested one north inlet to form two headlands; the artist completed it without moving controls.
- **Visual designer: delivered original assets.** Artist commits `6f2fca6d6` and `7e7e654f5`: static Number Island base, four aligned transparent overlays, fifteen original emblem symbols and handoff. Six SVG documents validated and actual scene/contact-sheet previews inspected.
- **Platform engineer: integrated.** Source `27bd69b52` and documentary supplement `f7bfd1821`; integrated counterparts recorded in Git history. Scene registry is Number Island only, new emblems are shared across atlas/headers/List, motion is navigation-only and honors device preference plus a pause control. `company/engineering/readiness/2026-10-28-world-bespoke-platform-selfcheck.md`.
- **QA tester: actual development proof checked.** Assets/emblems load, four loops run and pause, reduced-motion stays static, labels/leaves remain usable, and pan/pinch/player-return work. Final production smoke and captures are recorded separately after the integrated build.

## Objections

- **Design lead:** The first silhouette still resembled the generic rounded slab. **Answer:** Added a north inlet between Village and Harbour using explicit path/control guardrails; all landmarks and node geometry retained.
- **Design lead:** Dense art could cover question cards and paths. **Answer:** Reserved inflated quiet boxes and connector corridors; art sits beneath interactive layers and never receives pointer events. Actual overlay QA checks remain required.
- **Accessibility concern:** Continuous decoration needs a calm alternative. **Answer:** Visible pause/off control, reduced-motion static rendering and four low-attention CSS loops; no flash, sound, score or new learning claim.
- **Scope:** A single proof must not imply every island is finished. **Answer:** Only Number Island is registered as bespoke in this revision; future scene authoring follows founder art feedback.

## Board

The bespoke proof is assigned to visual-designer for assets and platform-engineer for integration. Broader content cleanup stays paused. No additional deployment marker, route, dependency, lesson metadata, account, progress or gate change is authorized by this art proof.
