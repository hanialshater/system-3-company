# Number Island: visual handoff

owner: visual-designer
date: 2026-10-27
status: design handoff supplied; manager composition selection and independent artifact review pending
source: company/design/specs/number-island-direction.md, step 5

## Artifact-first observations

Viewed `company/reviews/number-island/mockups/desktop.png`, `phone-a-continuous.png`, `phone-b-regions-village.png` and `phone-b-regions-mountain.png` before the interaction/copy account; subsequently read `notes.md` once it was supplied. These are internal composition mockups, not implemented-page evidence. Notes confirm 48 px depicted stops and the five-stop density case, but the drawn 12–14 px functional copy and fixed 176 px card are wireframe dimensions, not implementation text/height limits.

Recommend **B, region-focused phone**, to design-lead/head-of-product: three places remain one action away, five mountain stops fit at useful size, and selected title/Open stay beside the current scene. A's first viewport has the harbour partly cut off and sends shared details farther below the selected stop. Desktop's whole-island map and adjacent panel establish a convincing atlas; preserve that overview. Managers make the composition choice, not this handoff.

The current mockup is a sound spatial sketch. The implementation should be richer than its geometric wireframe without turning scenery into competing controls. Remove the mockup-only “Your next exploration”/“Level 01” language and internal-review captions from the real page; use the growth copy's **Mathematics · {available count} lessons**, **Choose any stop to explore a lesson**, and **Selected stop**. Never add checkmarks, earned flags, coins, badges of learning, or a filled completion trail.

## Scoped surface and typography

- Keep the page an atlas on warm paper: one bold **Number Island** title, comfortable margins, quiet category line and very few borders. Use the existing system UI sans family; no webfont or dependency. Desktop title 48–60 CSS px; phone 32–38 px. Body and control labels 16 px; supporting labels 14 px. All titles wrap naturally in HTML.
- Use a page-local paper palette for this illustration-led surface in either system color preference; set its foreground/background explicitly so global dark-mode text cannot become white on paper. This is not a global theme change. Ordinary exits still look like the surrounding product's links. Accessibility-reviewer must check the actual implementation in both preferences.
- Desktop: full island is the visual anchor, with a narrower quiet lesson panel beside it. Keep the island above/alongside the details in DOM order. The title and map/list control belong outside the art. Phone: areas wrap if necessary at 320 px; the chosen scene and the full-height detail panel follow, with no fixed overlay.

## Candidate token roles and measured contrast

These are **local candidates for platform-engineer**, not shipped global tokens. Ratios are WCAG relative-luminance calculations from these exact sRGB hex pairs, rounded to two decimals; they are not a built-artifact accessibility verdict.

| Role | Color | Intended use |
|---|---|---|
| Paper | `#F4F1E7` | page and ordinary node fill |
| Card | `#FFFDF6` | lesson panel, text plaques and light ring |
| Ink | `#17332D` | functional text, borders, active area/button fill |
| Muted ink | `#50665E` | supporting text on Paper/Card only |
| Sea | `#173C48` | decorative ocean field |
| Sand | `#E8DCB9` | coast shelf and trail bed |
| Lowland | `#B8D8AD` | village/harbour land |
| Raised land | `#789D70` | mountain shading; decoration only |
| Selected | `#F5C45C` | selected stop fill, with Ink number/border |
| Status bed | `#E0ECD8` | neutral Published metadata label, Ink text |
| Trail marks | `#6B6250` | optional decorative path dashes on Sand |

| Pair | Contrast |
|---|---:|
| Ink / Paper | 12.01:1 |
| Muted ink / Paper | 5.46:1 |
| Ink / Card | 13.33:1 |
| Muted ink / Card | 6.06:1 |
| Card / Ink (active controls) | 13.33:1 |
| Ink / Selected | 8.36:1 |
| Ink / Lowland | 8.70:1 |
| Ink / Sand | 9.93:1 |
| Ink / Status bed | 11.09:1 |
| Card / Sea | 11.62:1 |
| Ink / Raised land | **4.43:1: do not use as ordinary text pair** |
| Ink / Sea | **1.15:1: do not use** |
| Card / Lowland | **1.53:1: insufficient as sole focus outline** |

Keep meaningful titles, region names and metadata in HTML or on opaque Paper/Card plaques, not on blended terrain. Optional sea captions may use Card; labels must not depend on a tiny SVG font. Scenery contrast is decorative, not a status code. Trail marks are not functional navigation or the sole relationship cue.

## Original SVG drawing direction

- **Coast:** an asymmetric, gently curved island with an inlet, three or four broad terraces, a Sand rim and one small downward-offset dark coast shadow. Keep the land a continuous organic silhouette on desktop. No complex blur/noise filters or repeated heavy outlines; clean vector contours read better at phone size and keep payload low.
- **Trail:** a winding Sand ribbon, visibly joining ordinary numbered stops. A subtle dotted centre line may add atlas texture. Its color, width and dash pattern stay constant across the entire route; it never fills behind the learner or implies completion. Keep the path behind controls and avoid tangencies to the outer coast.
- **Village:** an irregular cluster of three warm cream houses with terracotta roof silhouettes, one door/two window accents, and rounded trees at differing heights. Use a shared SVG symbol for repeated trees but vary scale/rotation/position slightly. Avoid exact grid placement, character faces and numerical teaching diagrams.
- **Harbour:** carve a distinct calm inlet, add a wooden jetty with a few visible piles, one small sailboat, and a lighthouse with two broad bands. These remain decoration, with no clickable-looking tiny flags or circles. Keep scenery away from the four stop hit regions.
- **Mountain:** two or three overlapping slopes, a pale summit edge and a few small conifers, plus one short trail bridge if space permits. A static summit flag is scenery, never an earned destination. Do not place a functional stop on the flag or make the last stop look locked or more valuable.
- **Sea:** a sparse low-contrast wave pattern, clipped inside the rounded scene; no drifting/parallax/auto-pan. Use deliberate empty sea around the island so the route is legible. Decorations must never leak outside scene corners, as a few right-edge wave strokes do in the desktop mockup.
- Reuse the same decorative vocabulary in the three phone scenes rather than shrinking the whole desktop SVG. Keep marker coordinates in a shared viewBox/overlay coordinate system. SVG is `aria-hidden`, nonfocusable; all functional names and actions are semantic HTML.

## Controls and states

- Native stop buttons: prefer 48–52 px circles and **never below 44×44 rendered CSS px**; no overlapping hit boxes. Use Paper fill, 2–3 px Ink boundary and bold Ink number. Do not scale HTML controls down with the SVG. At 320 px, move coordinates/increase scene height rather than reduce targets.
- Selected stop: Selected yellow fill, thicker Ink border plus the visible **Selected stop N** detail line; `aria-pressed=true`. No completion check or disabled selected marker. Selection must remain clear without animation or color perception.
- Keyboard focus: use a paired 3 px Card halo and 3 px Ink outer ring, with separation from the normal node border. One tone alone fails on some backgrounds. Keep enough scene padding to avoid clipping rings. Independent reviewer checks actual geometry/contrast against all terrain positions.
- Area controls: 44 px minimum height, Ink border; current area Ink fill/Card text plus visible pressed state. No faint inactive text. Map/List uses the same contrast roles. Do not implement ARIA tabs unless the full tab keyboard behavior exists; native pressed buttons are sufficient.
- Primary Open lesson action: Ink fill/Card text, full width on phone, minimum 48 px height. The exact full lesson title and status remain above it. Support long labels and 200% text expansion without a fixed-height card.
- No decorative animation. If focus/selection transitions are used, keep them under 150 ms and remove under reduced motion. Hover adds no unique content.

## Handoff and review boundary

Platform-engineer implements only after design-lead/head-of-product select the composition and principal-engineer's pre-code conditions are resolved. This handoff changes no global CSS, production SVG, app source, lesson content, progress data or dependency.

Independent accessibility-reviewer measures the working controls and text; qa-tester checks selection/list parity, all destinations and bounded returns. Design-lead reviews actual phone/desktop screenshots after those initial findings. The founder sees **actual working-page screenshots before deployment**; internal mockups do not satisfy that checkpoint and silence is not approval. Existing company release checks remain unchanged.
