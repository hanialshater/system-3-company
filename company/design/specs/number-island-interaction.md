# Number Island: interaction specification

owner: interaction-designer
date: 2026-10-27
status: specification supplied; internal mockup selection pending; founder working-page screenshot approval required before deployment
source: company/design/specs/number-island-direction.md, step 3
inputs: company/product/number-island-scope.md; company/product/number-island-math-sequence.md; company/product/number-island-personalization-boundary.md; company/engineering/number-island-routing.md

## Recommended interaction

An optional `/learn/world` collection: **select a stop → inspect its real title/status → explicitly open the existing player → explicitly return to that stop**. Selection opens no lesson. All catalog-available stops are selectable immediately; numbering is editorial order, never progress.

Recommend **region-focused phone composition**, with three landmark choices above one usable-size scene and one-action access to the complete list. Desktop shows the full island beside details. Mockup-artist also supplies the continuous vertical phone alternative; design-lead and head-of-product choose from actual rendered SVG artifacts. These internal manager artifacts are labelled **design preview — not implemented or live** and do not require an additional founder approval before implementation. After implementation, provide actual working-page phone and desktop screenshots for the founder's requested approval before deployment; wireframes are not working-product evidence.

Use the original paper-atlas scenery in the design-lead direction: irregular coast/land shelves, village houses/trees, harbour jetty/boats/lighthouse and mountain/bridge/summit. No copied Mario imagery or teaching diagrams. Visual-designer owns final styling; this spec settles interaction, not palette approval.

## Exact collection

Runtime titles, statuses, durations and availability come from the existing public catalog projection. This table identifies the accepted collection; it is not a replacement metadata source.

| Stop | Landmark | Slug | Current title |
|---|---|---|---|
| 1 | Number Village | `add-a-zero` | Times ten: just add a zero? |
| 2 | Number Village | `more-digits-not-bigger` | Which decimal is the biggest? |
| 3 | Number Village | `the-equals-sign-balances` | What does = actually ask? |
| 4 | Fraction Harbour | `three-pizzas-four-people` | Pizzas to plates |
| 5 | Fraction Harbour | `add-the-slices` | A half plus a third |
| 6 | Fraction Harbour | `scoops-in-three-cups` | Scoops in three cups |
| 7 | Fraction Harbour | `divide-six-by-zero` | What is 6 ÷ 0, really? |
| 8 | Scaling Mountain | `split-the-sum` | One hard product, two easy ones |
| 9 | Scaling Mountain | `times-can-shrink` | Where does 0.6 × 0.7 land? |
| 10 | Scaling Mountain | `adding-squashes-the-photo` | Bigger photo, same face? |
| 11 | Scaling Mountain | `double-the-size` | The 12-inch pizza deal |
| 12 | Scaling Mountain | `cube-the-size` | Three times as wide, how heavy? |

## Page and focus order

1. Ordinary Feed and Curriculum links; catalog supplies the world entry. Feed behavior stays unchanged.
2. `h1` **Number Island**, **Mathematics · {available count} lessons**, and **Choose any stop to explore a lesson.** Count describes the collection, never personal progress.
3. Native Map/List buttons in a labelled group, using `aria-pressed`. Keep this control in both views.
4. In Map, native area buttons in landmark order, using `aria-pressed`: Number Village / Fraction Harbour / Scaling Mountain.
5. Decorative SVG scene plus semantic HTML stop buttons in editorial DOM order. Desktop: all twelve; region-focused phone: active area's 3/4/5 stops. Native stop accessible name includes stable number, real full title and actual status. Give full untruncated title/status in selected details and the list; no hover-only meaning or tiny SVG teaching text.
6. Selected detail section: **Selected stop {number} · {landmark}**, full real title, canonical status label, optional metadata duration, **Open lesson** link whose accessible name identifies the title.
7. List view: all available stops grouped in the same global order, full real titles/statuses and explicit player links. It is never restricted to the active region. Hidden alternate presentation leaves layout/accessibility navigation.

Desktop CSS may place map/details beside one another without reversing DOM order. Phone details follow the scene; never cover controls with a fixed overlay or clip long titles in fixed-height panels.

## State behavior

- Default: Map, first available stop selected, corresponding area visible; no automatic focus, scroll or playback.
- Stop selection: update visible outline/text and details; `aria-pressed=true`, focus stays on the button. Current stop stays operable, never disabled. No auto-open.
- Area selection: show/highlight that area and select its first available stop unless current selection already belongs to it. Focus stays on area button. Desktop keeps whole island visible; no pan/zoom prerequisite.
- View switch: retain selected slug. Map restores its region; List exposes all stops. Focus stays on view button. No artificial locks, scores or completion announcements.
- Resize/rotation: retain selection and view; dedicated phone composition replaces shrinking desktop targets.
- Optional short polite selection announcement may say “Selected stop 5: A half plus a third”; never announce progress or the whole scene.

## Bounded URL / player return contract

Canonical contract follows EDD-017's static hash state and principal-engineer's review requirement to preserve both slug and Map/List mode. The tier-2 host change remains under Engineering review; do not implement a competing world-query scheme.

- World URL: `/learn/world#stop=<collection-slug>&view=map` or `view=list`. The fragment accepts exactly one `stop` and one `view`, no other fragment keys. Stop must belong to the twelve IDs and currently available catalog projection; view accepts only `map` or `list`. Empty fragment uses first available/Map. Unknown, malformed, missing or duplicate controlled values reset to first available/Map; do not accept only the first duplicate or silently normalize an unknown view. Derive the landmark from the valid selected stop rather than maintain a conflicting region ID.
- Use current URL/component state only. Explicit stop/area choices may push bounded same-origin fragment entries so Back/Forward restores them; view changes may replace the entry. Listen to current-location hash/popstate changes without reading past entries or `history.state`. No update on hover/focus.
- Player link: `/d/<slug>?from=number-island&islandView=map` or `list`. Path slug supplies identity. No free-form `returnTo` URL, referrer lookup, redirect or stored navigation.
- Only one exact `from=number-island`, visible collection membership, and a single valid `islandView` (or absent view defaulting to Map) permit **Back to Number Island**. Reject duplicate `from` or `islandView`, unknown marker values and unknown/empty view values; ordinary/invalid entry keeps existing `/catalog` navigation. Unrelated query strings and arbitrary return-destination parameters never become a navigation destination.
- Construct only the constant `/learn/world` path plus `#stop=<validated-current-slug>&view=<validated-map-or-list>`. Return restores both selected stop and original view, with the corresponding area derived from that stop; it never infers completion. No automatic next-lesson launch.
- No world storage/cookie/history/account reads, new tracking, rewards, checkpoints or learning claims; detailed boundary is the VP document.

## Availability

Server resolves slugs against existing visibility and sends a minimal public display projection, not whole metadata/claims or lesson implementations. Missing lessons have no broken clickable nodes; recompute visible count and retain stable editorial numbers. Invalid/unavailable selected slug falls back safely; an explicitly unavailable request can show a neutral message. Empty area says **No lessons available in this area**; empty collection says **No lessons available in this collection** with Curriculum link. Do not leak unavailable titles or preserve “12” artificially. Scenery failure must not prevent HTML/List navigation.

## Mockup-artist brief: internal composition selection

Output original SVG wireframes and notes under `company/reviews/number-island/mockups/`, clearly labelled design previews. No app code or production-art claim.

| File | Frame and required content |
|---|---|
| `phone-a-continuous.svg` | 390×844 first viewport of one tall three-region island; include an annotated continuation/crop showing lower stops and relationship to shared details. Demonstrate how selection far down the map avoids a scroll hunt. |
| `phone-b-regions-village.svg` | 390×844 recommended focused-region composition: header, Map/List, all three area choices, three village stops, selected title/status and Open action. |
| `phone-b-regions-mountain.svg` | 390×844 same composition with all five mountain stops and longest title; do not solve density by shrinking targets. |
| `desktop.svg` | 1440×1000 full island beside detail panel; village lower-left, harbour centre, mountain upper-right; all twelve stops and selected title/status/Open visible. |
| `notes.md` | Actual target/font dimensions, DOM-order annotations, long-title treatment, A/B tradeoffs, unresolved risks and SVG paths. Identify catalog snapshots as examples, not QA verdicts. |

For phone B, begin with 350 px content width and roughly 330–400 px scene inside 390 px viewport. These are hypotheses, not constraints: allow vertical scroll and growth for labels/five targets. At 320 px, wrap area controls and increase scene height rather than create horizontal overflow. HTML buttons render at least 44×44 px (prefer 48×48), without overlapping hit regions. Meaning-carrying labels/details use full HTML text, not scaled SVG text.

Next owner: mockup-artist. Chief-of-staff sends the labelled design-preview artifacts to design-lead + head-of-product for internal composition selection. Visual-designer refines the chosen direction, then Engineering implements it through the recorded company process. The founder screenshot checkpoint follows implementation: actual working-page phone and desktop captures, before deployment. VP-personalization routes growth-designer's bounded navigation-metaphor/copy review; no new gamification is proposed.

## Implementation acceptance checks for later independent QA

- Catalog entry → select stops 1/3/4/7/8/12 → inspect matching real title/status → explicitly open existing player → explicit return restores stop/view/area. Repeat roundtrip from List and verify ordinary direct player navigation remains unchanged.
- Map/List available slug sets and editorial order match, including missing-slug/empty-area/empty-collection cases. Malformed markers cannot create arbitrary destinations or unavailable-title leaks.
- Native keyboard controls, distinct visible focus/selection, full labels, 44 px targets, 320 px reflow, 200% text, long-title case, both color modes and reduced motion. No drag/pinch/hover dependency, overlay trapping controls or page-level horizontal overflow. Decorative SVG is `aria-hidden` and nonfocusable.
- Normal text contrast 4.5:1 and functional graphics/borders 3:1 measured on actual backgrounds by the independent accessibility owner. No background animation, parallax, auto-pan or auto-scroll; optional selection transition under 450 ms and absent with reduced motion.
- No map learner-store/history/account reads, storage writes, new tracking, hidden-lesson mounts, feed changes or completion/progression behavior.

## Objections and answers

- Long continuous maps separate stop/detail: recommend focused regions for phone; require the alternate mockup to show its detail/scroll relationship before managers choose.
- Small mobile targets: dedicated composition, rendered-size floors and List; never scale desktop controls to fit.
- Path implies assessed progress: open collection, no state reads/rewards/locks; growth-designer reviews actual copy through the VP.
- Contextual return affects shared lesson surface: tier-2 EDD/review, fixed validated destination and unchanged ordinary entry.

No app/source/test/production-art, board, progress or event files were changed. This specification supplies no independent artifact, lesson-quality or release approval.
