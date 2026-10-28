# Founder ask: a branching, zoomable world with one visual style

owner: design-lead
date: 2026-10-28
status: decided
class: format
route: design-lead → principal-engineer → platform-engineer → qa-tester
recorded by: chief-of-staff

## What the founder said

After asking why List and World look different, whether the world is immersive and zoomable, and which branch to deploy, the founder said: “Ok lets work on that”, then clarified: “The world should not be linear, it is branching by nature”.

## Decision and scope

Replace the sequential world corridor with an open subject atlas, subject/island clusters and an island scene branching into region hubs and lesson leaves. Membership paths indicate choices, not prerequisites. Separate topic connections come only from actual curriculum relationships, including cross-subject links. Keep all 3,895 lessons visible and existing island identifiers and contextual player URLs stable. A suggested playback order may remain inside an island; it does not define world topology.

Unify Map and List through shared ocean, cream and forest colors, illustration motifs, headers, region identities and selected states. Add actual map pinch/zoom, pointer panning, accessible +/- and reset controls, and an immersive mode with a clear exit. Preserve selection and camera when returning from a lesson. Keep controls at least 44 px. No new lesson verification, mastery states, accounts, dependencies or deployment policy changes.

Push the reviewed revision to the existing `codex/all-lessons-inspection` branch for the founder's deployment and show actual updated screenshots. Do not repeat the earlier unconfirmed deployment marker attempt.

## Route and answers

- **Design lead: agree.** `company/design/specs/2026-10-28-world-unified-zoom.md`, including the subsequent branching amendment. Platform-engineer owns implementation; no further mockup confirmation loop.
- **Principal engineer: agree, tier 1 within the boundary.** `company/engineering/readiness/2026-10-28-world-zoom-scope.md`. Use finite deterministic layouts; tolerate aggregated graph cycles and absent references. Existing source owners perform the change, one independent engineer reviews its diff and focused browser checks cover actual interactions. No new EDD or principal-engineer-ops review is required for this boundary.
- **Platform engineer: implementing.** Isolated UI/camera worktree plus a separately owned pure curriculum-connections helper and focused tests. Chief-of-staff integrates explicit commits; no shared operational records written by builders.
- **QA tester: route after a concrete artifact exists.** Browser first, including phone pinch/pan, tap versus drag, camera reset, keyboard, immersive exit, branching choices, Map/List consistency and lesson return.

## Objections

- **Principal engineer:** A transformed long corridor can break scroll geometry and scale poorly. **Answer:** Replace it with a focused branching scene reached through the atlas rather than transforming 162 stacked island scenes.
- **Design lead:** Small-scale map fitting can shrink stop targets. **Answer:** Keep a bounded zoom range and 44 px targets; allow horizontal exploration of the focused scene on a phone, with an Overview recovery control.
- **Principal engineer:** A single concept relationship must not imply every lesson in an island is a prerequisite. **Answer:** Keep membership spokes distinct from labelled topic connections, retain the original concept labels, omit unresolved links and never lock access.
- **Founder:** The existing world is linear. **Answer:** The earlier corridor-specific camera/layout assumptions are superseded by the branching atlas and hub/leaf composition above.

## Board

The new implementation item is owned by platform-engineer. Existing broad content-verification cleanup remains paused; inherited aggregate failures are recorded without becoming this presentation change's scope.
