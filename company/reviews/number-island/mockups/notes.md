# Number Island composition hypotheses

owner: mockup-artist
date: 2026-10-27
source: company/design/specs/number-island-interaction.md
status: internal mockups; selection, implementation and independent review pending

## Artifacts

- `phone-a-continuous.svg` / `.png` — 390 × 844 first viewport of a continuous scroll journey.
- `phone-a-continuation.svg` / `.png` — 390 × 844 lower-page crop showing Scaling Mountain, shared details and the unresolved distance from earlier stops.
- `phone-b-regions-village.svg` / `.png` — 390 × 844 focused three-stop village, selected stop 1.
- `phone-b-regions-mountain.svg` / `.png` — 390 × 844 focused five-stop mountain, selected stop 12 (density case).
- `desktop.svg` / `.png` — 1440 × 1000, full twelve-stop island and adjacent details.
- `generate.py` — local reproduction helper; no application code or network dependencies.

These are rendered SVG wireframes, not screenshots of a working web application. The controls are drawn representations: they do not operate or establish accessible semantics. User-facing approval screenshots should come from the implemented page later. The titles and Published badges are snapshots of the current twelve lesson metadata files, not independent editorial or release approvals. All current lessons in this proposed set have published metadata. The full lesson list and real labels/statuses must be generated from the actual catalog at runtime.

## One relationship worth retaining from each

**A / continuous:** All landmarks belong to one journey in page order; the view communicates the whole island without changing scenes. Its cost is document length: selecting stop 1 leaves the common detail/Open action far below it. The continuation frame makes that issue explicit instead of hiding it behind a fixed overlay. The first viewport intentionally crops the harbour after stop 6; stops 7–12 and details continue below. It must not be implemented as a hard-clipped canvas.

**B / focused regions:** The three 48 px high area controls stay near the map; a selected area offers three, four or five full-sized stop controls and its selected lesson/action immediately below the scene. This keeps an explicit open action within the first phone viewport in the village and five-stop mountain frames. The cost is less simultaneous geographic context; area labels and the complete List view must preserve the one-collection relationship.

**Desktop:** Full map and details are adjacent, with the selected stop emphasized in gold + outline. The selected title/action stays readable without writing every long lesson name on top of the terrain. The full suggested trail is visible with no locked gate or completed state. Landmarks supply exploration imagery; no mathematical explanation is drawn in decoration.

## Dimensions and rendering

- Phone canvas: 390 × 844; content gutter 20; scene 350 × 310; selected card 350 × 176.
- Stop buttons are depicted as **48 × 48 px** circles. Selected outline extends to 60 px but is not an extra hit target. Adjacent circles do not overlap in the five-stop frame.
- Area controls are 112 × 48 px with 7 px gaps. Map/List uses two approximately 175 × 45 px hit-area regions; the 37 px inset fill is decorative, not the hit area.
- Phone Open lesson is **314 × 44 px**; desktop action is 324 × 52. Header text links need HTML hit areas at least 44 px high in implementation; their text bounds alone are not targets.
- Phone functional copy uses system UI 12–14 px, selected titles 21 px, page title 34 px. Metadata eyebrow 10–11 px; internal annotation/footer 8–10 px is not proposed functional UI. Visual-designer must refine typography and independently reviewed contrast.
- Desktop scene 900 × 650; detail panel 380 × 650; heading 56 px; selected title 27 px. Stop circles remain 48 px at this native frame size.
- No external fonts/images, package installs or downloads. PNGs rendered by installed `/usr/bin/chromium` through Playwright `page.setContent`. Chromium rejected `file://` navigation, so the same allowed local SVG bytes were rendered directly in a page. XML parsing validates all SVGs; this is not browser UX QA.
- Long selected title is shown in full over two lines. Actual HTML details must have content-driven height; do not copy these fixed frame heights as clipping containers. 320 px/200% text still require independent implementation checks.

## DOM / focus handoff

These SVGs depict positions only. Implementation uses semantic HTML in this order: navigation, heading/count, Map/List, regions, stop buttons in global editorial order for the visible scene, selected detail/Open action. Decorative SVG must be aria-hidden. List renders the complete available collection in the same order with actual full titles/statuses and equivalent links. Region controls, scene and detail are not a modal. No auto-open/focus, tracking, progress/store reads, locks/rewards or new assessments.

## Open decisions and next owners

Design-lead + head-of-product select A or B after inspecting artifacts; mockup-artist does not choose the shipped composition. Visual-designer refines the chosen artwork/token roles; platform-engineer implements through principal-engineer's tier-2 plan. Independent accessibility and browser QA must test the real page. Parent chief-of-staff retains board/progress/events ownership. Founder visual approval before deployment remains a later checkpoint on actual page screenshots, not implied by these mockups.
