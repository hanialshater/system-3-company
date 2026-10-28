# Number Island bespoke art proof — 2026-10-28

Owner: visual-designer. Scope: first Number Island scene and original subject emblem family. Other islands retain their ordinary fallback; this proof does not represent 162 finished bespoke scenes.

`number-island.svg` is the static base, with a transparent exterior and viewBox `0 0 1000 1400`. It uses a hand-composed cove/terrace silhouette, cream shore, orchard courtyard, three individual village houses, windmill, harbour workshop, sectioned sails, lighthouse, asymmetric rock faces and observatory. No learner labels or scripts are embedded. Internal `<use href="#…">` references reuse original tree/house drawing components only. Base art remains complete with ambient motion disabled.

The composition preserves light terrain within the frozen lesson/topic boxes and central title rectangle from the approved `2026-10-28-world-bespoke-art-proof.md`. Houses, lighthouse and peaks sit outside those areas; platform must verify actual HTML overlays and connector clarity in the built scene. Broad upper light land is intentional space for the existing seven upper question controls and two topic hubs. Detailed landmarks occupy the free middle coast and lower side frame.

## Platform integration contract

All four optional overlays have transparent exteriors and exactly the same viewBox/origin as the base. Mount each as a full-canvas decorative image beneath connector SVGs and HTML controls, with `aria-hidden`, `focusable=false` where appropriate and `pointer-events:none`. Do not independently crop or object-fit these layers. Scene background remains the product's ocean.

| Asset | Suggested quiet loop | Scene coordinates / limits |
| --- | --- | --- |
| `ambient-water.svg` | opacity .35 to .8, 10 seconds | Full-scene origin; no displacement |
| `ambient-clouds.svg` | horizontal drift, 24 seconds | translateX -6 to +6px; maximum total travel 12px |
| `ambient-beam.svg` | opacity .2 to .7, 16 seconds | Preferred opacity only; optional rotation maximum ±3°, pivot 774px 434px, `transform-box:view-box` |
| `ambient-boat.svg` | vertical bob, 8 seconds | translateY -2 to +2px; maximum displacement 2px from rest; no horizontal travel |

Use transform/opacity only. Reduced motion and the product motion setting must render the same static composition. No timers, filters, external images, fonts, dependencies, scripted SVG animation or text elements are present. The static sailboat at (899,553) and dinghy at (839,736) belong to the base; the small optional bobbing boat at (968,855) is separate.

`subject-emblems.svg` contains 15 original `<symbol>` elements, each with `viewBox="0 0 64 64"`: `math`, `cs`, `physics`, `chemistry`, `life`, `geography`, `history`, `ai`, `economics`, `behavioral`, `probability`, `books`, `lifehacks`, `big-ideas`, `number-island`. Use an explicit 64×64 viewport (or scale uniformly), paired with the existing subject/island text. These are original motif drawings, not external brand logos, achievement badges or completion markers. The Number Island crest combines its coral village roof, alpine peak and coastal wave.

## Verification and next owner

Rendered the base at native 1000×1400 and all sprite symbols in a Chromium contact sheet, then inspected both. Removed unintended inherited fills from open emblem paths after the first contact sheet. All six SVGs parse as XML, contain the expected viewBoxes/symbol IDs, and contain no external references, scripts, animation, embedded raster images or SVG text. Preview PNGs are temporary inspection artifacts at `/tmp/number-island-proof.png` and `/tmp/subject-emblem-contact.png` in the shared session.

Platform-engineer owns integration, CSS loops, motion controls, actual phone/desktop and enlarged captures, all 12 question/hub clearance checks, zoom/pan behavior and lesson-return checks. Design-lead and independent reviewers own the built-artifact judgment and founder art feedback before further islands. `npm run check` completed with 783 existing lesson gate errors and four warnings (versioned QA/review and unverified-claim failures); it does not pass on this checkout. Full log: `/tmp/world-art-check.log`. No application, lesson, metadata, dependency or shared operations files were edited here.
