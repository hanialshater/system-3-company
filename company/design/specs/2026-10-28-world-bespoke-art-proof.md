# Bespoke World art: Number Island proof

owner: design-lead
date: 2026-10-28
status: asset/integration direction approved; actual built-artifact review required
source: founder request for bespoke islands, surrounding visual elements, animation and original emblems
route: visual-designer authors original SVG assets → platform-engineer integrates → independent actual-artifact review → founder art feedback before wider rollout

This is the first **bespoke Number Island proof**, establishing the quality bar for future island art. It does not represent all 162 islands as hand-designed. The existing nonlinear atlas, 3,895 lesson entries, question text, open access, zoom/pan, URLs and contextual player behavior remain intact. No lesson metadata, claims, metrics, learner state or deployment configuration changes are in scope. I inspected `BranchIsland.tsx` at the 8a8e630b9 baseline and actual `world-zoom-style/artifacts/world-zoom/dev/phone-immersive.png` and `phone-list.png` captures.

## Asset ownership and deliverables

The existing **visual-designer is approved to start immediately**. Author original scalable vector art in the shared ocean/cream/forest/lime family, with richer coral roofs, warm stone and layered greens. Platform-engineer owns renderer/CSS integration; the artist does not change lesson or application source. Suggested asset home: `public/illustrations/world/`.

- A bespoke `number-island.svg`, viewBox **0 0 1000 1400**, with transparent outside coast, warm shallow-water edge, distinct silhouette and coves/terraces; not the current generic rounded rectangle with a few repeated trees.
- Up to four transparent, coordinate-aligned ambient overlays (or equivalent separately addressable SVG layers agreed with platform): water glints, clouds, lighthouse beam and a boat. The static base must feel complete without motion.
- An original `subject-emblems.svg` sprite covering the 14 actual subject IDs, with a consistent 32×32 emblem geometry and a Number Island crest. Use simple original symbols: tile/arc for math, branching circuit for CS, orbit/wave for physics, flask/hexagon for chemistry, sprout/helix for life, distribution for probability, choice forks for behavioral, exchange circles for economics, compass/coast for geography, layered archive for history, connected spark for AI, open pages for books, constellation for big ideas and loop/tool motif for lifehacks. No third-party logos or copied game assets. Pair marks with existing text labels; the symbol never carries meaning alone.

## Fixed composition and safe zones

Keep the current Number Island geometry so navigation/camera does not regress. All coordinates below are in the 1000×1400 viewBox. This is a composed scene around the existing open branches, not a new sequence or gate.

| Branch | Topic hub centre | Lesson card centres |
| --- | --- | --- |
| Number Village | (230,240) | (100,120), (360,120), (70,340) |
| Fraction Harbour | (770,240) | (640,120), (900,120), (610,340), (930,340) |
| Scaling Mountain | (500,1050) | (370,930), (630,930), (340,1150), (660,1150), (500,1240) |

Reserve **±95px horizontally / ±60px vertically** around every lesson centre, **±110 / ±80** around topic hubs, and a quiet central title area **x340–660, y700–900**. These inflated boxes include card/selection outlines; measure actual current DOM before integration. Keep the existing topic-membership connector corridors quiet and readable. Do not place a roof, tree crown, mast, hard ridge or moving detail beneath a question or label. Low-contrast terrain colour may continue beneath the HTML surfaces. If a connector visually runs through the central title, platform may mask the stroke beneath a quiet title backing without moving any nodes or changing graph meaning.

- **Village, left:** a small hand-arranged group of houses, a windmill and orchard terraces. Use free land roughly x140–350,y400–600 and quieter coastal margins; avoid the upper card fan and its connectors. An entrance path can turn into the existing branching paths rather than becoming a mandatory road.
- **Harbour, right:** a distinct bay cut into the right-middle coast; dock/workshop, lighthouse and two scale-friendly boats. Folded, sectioned sails can suggest the fraction theme without adding teaching claims or floating numbers. The cove around x780–1000,y440–760 provides meaningful water/shore contrast outside the upper controls.
- **Mountain, lower:** three hand-composed peaks frame the existing lower branch from the wide left/right sides, with terrace trails, a small observatory, cool rock faces and clouds. Do not put a solid mountain silhouette behind the central topic hub or the five lesson cards. The lower branch should read as a different place, not a recoloured village.
- A small original island crest may sit in a quiet plaza/heading treatment. Carry it into the Number Island List header and atlas entry; use the subject emblem consistently in atlas, breadcrumbs and List. Do not add badges that imply earned mastery, locks, points or completion.

## Motion and integration

Platform integrates the scene below existing HTML nodes and connector SVGs; decoration is `aria-hidden`, nonfocusable and `pointer-events:none`. SVG layers must remain sharp at every supported map scale and cannot intercept pinch/drag/taps. Preserve the ordinary fallback scene for other islands, with no claim that their final bespoke art is complete.

Use at most **four quiet ambient loops**: water glint opacity, slow cloud drift, subtle beam opacity and boat bob. Suggested periods are 8–24 seconds; boat movement at most 3px, cloud movement at most 12px in scene coordinates. No spinning windmill, camera auto-pan, flashing light, bouncing lesson nodes or motion that obscures a question. Animate transform/opacity; avoid filters, per-frame React work and timers for decoration. Under `prefers-reduced-motion:reduce`, render the same composition statically. A small Motion on/off setting is appropriate if it can be added without crowding chrome; it controls only decoration and stays independent of zoom/pan. Existing user choices and browser motion preference take precedence over decorative defaults.

## First proof acceptance

Ship only the Number Island proof and original emblem family for inspection, then use the founder's art feedback before producing further bespoke islands. Show actual full-island desktop and phone close-ups for all three branches, plus the matching List/atlas emblem. Inspect at default and enlarged zoom, with reduced motion enabled and with animation off if provided. Check all 12 questions/hubs, connector clarity, 44px control targets, native pan/pinch, lesson opening/return and no image/resource errors. The proof must show intentional geography and landmark placement even with motion disabled. No new mockup or approval loop blocks asset production; the future built-artifact review is independent of this specification.

## Actual asset direction feedback — first artist proof

Inspected the artist's `6f2fca6d6` Number Island SVG through `/tmp/number-island-proof.png`, and all original emblems through `/tmp/subject-emblem-contact.png`. Village terraces/windmill, working harbour and mountain/observatory framing are useful distinct places; the emblem family is consistent and ready for integration. Large quiet fields are intentional control areas and must be judged again with the actual HTML questions/hubs in place.

One focused silhouette refinement is recommended before presenting the first bespoke proof: carve a north inlet between the upper branches. The current broad top still reads as the earlier rounded slab. Keep the mouth inside **x480–520 through y180**; widen toward **x375–625 at y240–270**, then taper through **x395–605 at y300**, **x425–575 at y335**, **x462–538 at y370**, ending near **(500,390)**. These are guardrails for a natural cove curve, not a demand for straight polygon edges. Move/remove the two top-middle trees if the changed shoreline reaches them.

Do not widen to x340–660 around y300–350: the actual existing quadratic connectors pass near (348,306)/(652,306) and (379,343)/(621,343). Preserve those corridors, all quiet boxes and frozen node coordinates. This creates two distinct headlands and a sheltered north cove without inventing another path or gate. No other landmark/emblem redesign is requested. This is asset direction feedback, not approval of the forthcoming integrated app, animation or all 162 island artworks.
