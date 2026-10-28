# All-lessons world: independent source review

owner: principal-engineer
reviewed-at: 2026-10-28 UTC
tier: 2
source: 63ef10015, supplemented by 782afa361066cf6b2d7232de12d1abdb0c5588fb
architecture: company/engineering/readiness/2026-10-27-world-inspection-integration.md; EDD-018 presentation/navigation slice
verdict: GO for founder-authorized unchecked inspection, conditional on successful integrated build and independent browser/ops readiness

I read the actual routes, world inventory/projection/navigation helpers, world/player/SVG components, styles and reused DemoCard/DemoHost/feed projection source before reading builder notes. This review does not assess the correctness or teaching quality of the added lesson content. No source changes were made by this reviewer.

## Findings and evidence

The implementation stays within the admitted boundary: separate world and world-context player routes, existing DemoCard playback, no modification of the ordinary Feed, auth, account ownership, learner-data schema, progress persistence, protected kit, gates or deployment configuration. URL destinations are constructed from actual inventory identifiers and encoded parameters. Unknown player islands are rejected through static params/notFound; invalid map selections safely fall back to the first real lesson. No user-controlled URL is fetched or used as an arbitrary destination.

The server projection sends only slug, title, hook, durationSec and publication status to the world; the player uses the existing slim FeedItem projection. Full claims/evidence remain on their existing on-demand public metadata path. Existing publication metadata is preserved; the new inspection interface consistently labels lessons Unchecked and does not award mastery, recall, progress counts or seals.

Independent filesystem inventory plus `buildWorld` produced **3,742 inputs, 3,742 outputs, 156 islands and exact unique-slug coverage**. Source statuses were **720 Published, 234 In review and 2,788 Draft**. All four `tests/world/inventory.test.mjs` cases passed under the existing test import hook: coverage/status preservation, deterministic curriculum order, duplicate rejection and explicit/invalid navigation. These are actual source/helper checks, not hosted browser results.

The player starts at the selected actual lesson, scrolls in island order, renders only the active lesson host with adjacent lightweight cards, exposes previous/next and keyboard-arrow navigation, maintains the active slug in the URL and provides a real island-end return. Map/list and return state use bounded navigation data in optional sessionStorage, with exceptions handled. Existing lesson progress/account behavior is reused rather than reimplemented.

Source controls use semantic buttons/links, accessible labels, selected states and visible focus. Map tap targets are at least 44 px through the smallest breakpoint. Mobile detail is a nonmodal bottom sheet; reduced-motion styles remove transitions. Actual keyboard, focus, phone geometry and interaction remain the independent browser reviewer's responsibility.

Supplement **782afa361** addresses the initial late-subject jump concern: distant islands keep lightweight placeholders with the same region aspect ratio/max-width, while first/selected/nearby islands mount scenery. Previously seen terrain stays mounted, preserving focused controls and preventing content removal under the learner. This materially bounds initial deep-jump SVG work; it is not full unmounting/windowing after an entire world traversal. List mode intentionally renders the complete accessible inventory.

## Nonblocking inspection limits and conditions

Player scroll position is established from the selected index on mount; there is no explicit height/orientation realignment handler. Rotation/dynamic viewport changes should be included in browser inspection. No observed rotation failure is asserted by this source review. Seen scenery and the full list can accumulate substantial DOM during long use; no mobile performance budget is claimed met without measurement.

This is a source-level GO for the explicitly requested inspection build. It does not make red aggregate content checks green, validate every lesson, approve advanced recall/persistence, or certify accessibility/performance from source alone. Record aggregate failures honestly; preserve unchecked visibility and independent findings. Before deployment, the integrated production build must pass and independent browser/ops readiness must show usable world selection, lesson playback, return, Map/List and mobile/desktop behavior. Release-manager must separately record the actual deployment SHA, READY receipt, hosted URL and hosted smoke result. No further whole-company review wave is a prerequisite of this bounded founder-authorized inspection slice.

Rollback: revert the world feature/supplement commits on the deployed branch and redeploy through the existing authorized release path; preserve lesson publication values and review evidence. The broader lesson PR integration has its own recorded merge provenance and can be reverted separately if its runtime content fails.

## CSS correction addendum — 2026-10-28

Independently read commit **2ff4748e9720de33dfb7c3f43989f977e871ebcb**: only the two world CSS modules change. The world-player descendant override sets `overscroll-behavior-y:auto` on its existing card body, permitting scroll chaining into the island player when the inner lesson reaches its boundary; it leaves the global Feed and lesson kit untouched. The world Feed link gains a 44 px minimum width. Region heading/hint text is visually clamped to three/two lines while full text remains in the DOM and the List view remains available. These changes preserve the approved architecture and unchecked/status semantics. **Inspection source GO continues**, conditional on the rebuilt artifact and affected browser checks confirming stage-origin swipe, target size and long-label layout; this source review does not claim those runtime checks ran or passed.
