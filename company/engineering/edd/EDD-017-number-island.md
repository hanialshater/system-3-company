# EDD-017: Number Island, an optional SVG lesson-world view

author: platform-engineer
reviewers: principal-engineer + design-lead (affected presentation owner)
tier: 2
status: proposed
date: 2026-10-27
board: W-2125

## Problem and why now

The founder requested an SVG lesson world alongside the feed, then asked to see screenshots for approval. Product selected `/learn/world`; cm-math accepted twelve existing lessons in three groups. This is pre-code design, not implementation, independent review, screenshot approval or release clearance.

Owner inputs: `company/engineering/number-island-routing.md`, `company/product/number-island-scope.md`, `company/product/number-island-math-sequence.md`, `company/product/number-island-personalization-boundary.md`, and `company/design/specs/number-island-direction.md`. Those records carry the detailed policy; this EDD defines its implementation.

## Goals / non-goals

One optional island, catalog discovery link, original SVG scenery, twelve open stops with an equivalent list, real catalog titles/statuses/availability, and an explicit round trip through the existing lesson player. Design owns final geometry and phone composition. Selection is navigation only.

No feed/kit/content/claims/visibility changes; no new teaching or assessments; no completion, mastery, locks or rewards; no progress/history/account/store reads, storage, tracking or personalization; no new package, API, configuration or deployment mechanism. Existing shared shell and lesson behavior remain unchanged.

## Current state

- `src/lib/catalog.ts` is server-only and imports full metadata, including claims and fact-check notes. Do not send that registry or whole metadata to the world client.
- `src/lib/visibility.ts` currently exposes all known statuses by founder direction; use `visibleDemos()` without inventing a published-only filter. Use existing status labels.
- `src/app/d/[slug]/page.tsx` generates lesson pages statically with `dynamicParams = false` and currently returns to catalog. Preserve static generation and the player. A contextual return-link change is explicitly part of this tier-2 scope.
- Parent baseline evidence: typecheck/build and a representative phone/desktop lesson contract pass; company check has 811 errors/4 warnings; full verify stops in publication tests (32 pass, 2 fail), later chained suites unrun. None of that validates this feature or waives release gates.
- No world payload/performance measurements exist. CoS must pass actual builder preflight, including committed WBR/digest and linked-worktree isolation, before implementation.

## Options considered

| Option | Cost / risk | Reversibility |
|---|---|---|
| Island inside existing `/catalog` | Smaller presentation change, crowds complete curriculum; not Product’s chosen dedicated view | Remove panel/link |
| Dedicated `/learn/world` + bounded contextual return | New public route and narrow shared-page change, tier 2 | Revert route/link/component; no migration |
| Separate game/player/progress service | Duplicates player and creates new data/progression ownership; out of scope | Harder |
| Do nothing | No code cost; does not satisfy request | No change |

Propose the dedicated route because Product chose it. No hard-to-reverse architectural choice or new dependency requires an ADR under this scope.

## Proposal: files and data flow

| Proposed file | Responsibility |
|---|---|
| `src/app/learn/world/page.tsx` | Resolve fixed slugs against server `visibleDemos()` and project explicit display fields |
| `src/lib/number-island.ts` | Twelve public slug/group/order definitions and pure bounded URL helpers; no metadata imports or I/O |
| `src/components/world/NumberIsland.tsx` | Selection, region controls, map/list parity and lesson detail/action |
| `src/components/world/number-island.module.css` | Scoped responsive styles |
| `src/components/world/NumberIslandArt.tsx` or `public/illustrations/number-island/*.svg` | Original decorative art from Design’s selected composition |
| `src/components/world/WorldReturnLink.tsx` | Small contextual navigation control taking current lesson slug |
| `src/app/catalog/page.tsx` | Ordinary discovery link; retain curriculum list |
| `src/app/d/[slug]/page.tsx` | Only replace existing catalog-return link slot with return component; no player/rendering-policy changes |
| `tests/world/*` | Focused data/URL and browser tests outside protected QA contract |

Final filenames may change without expanding scope. Builder reads this Next version’s bundled docs before code. No feed files, kit, catalog/visibility implementation, lesson metadata, generated registry, protected files, dependencies or build configuration changes.

### Public payload and unavailable lessons

Project only `{ slug, title, status, durationSec, groupId, order }` for the twelve accepted slugs that the catalog currently exposes. Derive safe lesson links from fixed slugs; never spread metadata/public claims into props. A type-only status import is safe; catalog imports remain server-side. Use the same ordered projection for map, list and detail.

Missing/hidden slugs appear in neither presentation, create no broken link and do not receive invented titles/statuses. Derive visible counts from the actual result. Empty groups/collection have a truthful message and catalog navigation. A smaller collection does not justify bypassing visibility or changing lesson status.

### State and return contract

The canonical world URL is `/learn/world#stop=<allowlisted-slug>&view=map|list`, for example `/learn/world#stop=add-a-zero&view=list`. Stop must occur exactly once and belong to the available display projection; view must occur exactly once and equal `map` or `list`. Reject missing, unknown, malformed or duplicate canonical fields to a deterministic first-available-stop/map default. Group selection is derived from the selected stop, not a second competing URL identifier. Listen to current-location hash/popstate changes, without reading prior history entries or `history.state`. Use same-origin bounded history updates for explicit choices, not hover. No cookies, browser storage or profile persistence.

A separate lesson action preserves the active presentation, opening `/d/add-a-zero?from=number-island&islandView=map` or `islandView=list`; selection itself never opens or completes anything. `WorldReturnLink`, passed the current rendered slug, reads only the current URL after mount: require exactly one `from` equal to `number-island`, exactly one `islandView` equal to `map` or `list`, and fixed collection membership for the rendered slug. Only then render “Back to Number Island” at the fixed `/learn/world#stop=<known-slug>&view=<validated-original-view>`. Thus both selected stop and originating map/list mode survive the round trip. Missing, unknown, malformed or duplicate markers and non-collection slugs retain `/catalog`; a missing `islandView` is invalid rather than silently assuming map. No arbitrary return URL, redirect, stored referrer, automatic next lesson or completion inference. Both surfaces use shared pure encode/decode helpers for this contract.

Keep a usable catalog link before hydration. Do not read server `searchParams`, cookies or headers; do not add dynamic flags or a `useSearchParams()` rendering bailout to the shared lesson page. Production generation and real ordinary/contextual entry tests must prove static behavior remains intact.

### Rendering and accessibility

Decorative SVG is non-focusable and `aria-hidden`; semantic HTML supplies titles/statuses, region names, stop buttons and links. Art and HTML share one coordinate model. Do not leave hidden duplicate map/list controls focusable. The map and ordered list expose the same available items/order; include a simple non-script navigation fallback.

Use native buttons, visible focus, selected state via text/outline and accessible state, actual 44×44 CSS-pixel targets, logical tab order, and separate named lesson actions. Selection updates details without unexpected focus movement. No hover/drag/pinch requirement. Independent review measures 4.5:1 text and 3:1 functional graphic contrast, reduced motion, 320 px reflow and 200% text resizing. Design must select the actual phone composition before code; do not shrink a wide map into tiny targets.

## Measurements and meaningful tests, specified before implementation

| Check | Acceptance / evidence |
|---|---|
| Minimal payload | Explicit field allowlist; JSON projection ≤8 KiB for twelve lessons; claims/notes/full registry absent |
| Art/client cost | Report world SVG raw bytes (target ≤80 KiB) and incremental route JS gzip excluding shared framework (target ≤30 KiB); principal-engineer reviews misses, not silent budget changes |
| Lazy lesson loading | Visiting/selecting world stops loads no lesson implementation; opening selected lesson uses existing player; inspect network/module graph |
| Adapter/state tests | Hidden/missing slug, changed status, zero lessons; unknown/missing/malformed/duplicate stop/view/from/islandView values; map and list encode/decode round trips; arbitrary destination rejected; map/list identity |
| Real browser flow | Each available stop/title/status, selection, correct lesson link; both map and list entry return to the original selected stop **and view**; direct unrelated lesson retains catalog; Back/Forward and map/list switching |
| No new data activity | Source/import review plus browser probes for map storage/progress/history/account/analytics/recommendation activity; distinguish existing global shell/player behavior |
| Responsive/a11y | 320 px, 390×844 and 1280×800; all stops, targets, overflow, focus/keyboard, 200% text, reduced motion and contrast; screenshots with actual states |
| Performance | Production cold/warm LCP and time-to-operable controls with device/throttle/environment; aim ≤2 s operability in representative mid-phone conditions; cloud desktop timings alone prove no mobile budget |
| Regression | Company check/verify before-after; standalone typecheck/build and relevant existing feed/catalog/lesson QA if chained verify stops; retain actual counts, exit status and unrun outcomes |

Use focused pure-helper tests and standalone browser tests outside `tests/qa/**`. Do not add trivial mirror tests or weaken existing assertions. No outcome claims or experiment result are proposed.

`would_be_wrong_if`: metadata leaks to client, visible lessons disappear without explanation, navigation becomes learner-state inference, world eagerly loads lesson bundles, lesson routes become dynamic, phone controls shrink, or release needs a gate bypass.

## Operational readiness: sections 1–7

1. **Failures:** wrong mapping, map/list mismatch, broken contextual/direct return, inaccessible phone layout, full-registry leak; worst case shared lesson-page regression affecting all lessons. Learners see navigation defects; CI sees generation/payload failures.
2. **Detection:** adapter/URL tests, actual phone/desktop round trips, static production generation, payload/import inspection, screenshots/a11y review and before-after company checks. No new continuous runtime alert is in scope; this residual monitoring limit goes to ops review.
3. **Rollback:** reviewed `git revert <feature-commit>` PR removes route, catalog link, return component and art. No data migration or record loss. Release-manager uses existing rollback runbook with required authorization; latency is actual build/approval/deploy time, not an invented instant rollback. No default-branch reset/force-push.
4. **Capacity:** one isolated builder and one large compiler at a time within existing caps; no background service. Measure bytes above. Parent setup observed roughly six minutes for a full thousands-page build, not a branch guarantee. Per-worktree build/port isolation; release-manager allocates the scoped preview’s quota/CI use. No budget increase requested.
5. **Security:** public GET page only; no API, secret, permission, iframe or third-party script. Authored SVG has no scripts, external references, `foreignObject` or untrusted markup injection. URL input is allowlisted navigation ID, never arbitrary HTML/CSS/href/redirect. Inspect built client graph and explicit server projection.
6. **Data:** no new learner collection/store/event/retention/model input. Current URL is explicit navigation state. Existing shell/account sync and lesson-player behavior remain; this is not a claim of zero site-wide data processing. Independent privacy-reviewer records feature disposition before release; scope expansion returns to VP/privacy owners.
7. **Risks:** principal-engineer-ops decides route/return-regression and monitoring risk-register disposition. Author neither writes that register nor declares risks closed. Later readiness record links this EDD and actual evidence; only independent ops reviewer supplies approval header.

## Rollout and rollback

1. CoS consolidates owner answers and passing real build preflight. Principal-engineer and affected Design owner review this proposed EDD; managers select the internal interaction/mockup composition before code. This internal selection is not an additional founder-approval gate before implementation.
2. Platform-engineer implements in the assigned isolated checkout; preserve unrelated baseline failures and protected files.
3. Produce screenshots of the actual working page on phone and desktop and show the founder. The latest user instruction requires founder approval of those working-page screenshots **before deployment**, not a separate founder gate for internal mockups before implementation. Clearly distinguish mockups from working-page screenshots. Do not infer approval from silence or manager acceptance.
4. Evaluation-steward routes independent browser/a11y and privacy checks; growth-designer reviews metaphor/copy through VP; principal-engineer reviews code and principal-engineer-ops independently approves readiness.
5. Release-manager verifies screenshot approval, exact source/target, PR/default-branch rules, gates and supported access before the scoped preview. Existing failing checks/Forbidden API access are blockers, not alternate-release authorization.
6. Report hosted URL only after a real receipt and live world/catalog/ordinary lesson/contextual-return smoke checks. Otherwise return screenshots with exact blockers. Rollback follows item 3 above; no new flag/deployment mechanism is required.

## Open review questions and objections

- Principal-engineer: accept dedicated route plus narrow shared-page return component, payload/performance targets and review coverage? No server query or dynamic lesson rendering is proposed.
- Design-lead: confirm geometry/HTML coordinates after mockup selection; engineering does not approve its own art.
- Principal-engineer-ops: decide monitoring/rollback residual risk and readiness evidence; this author cannot self-approve.
- Evaluation/privacy: confirm no-new-data boundary while recognizing preexisting shell/player activity.
- Reduced availability: truthful filtering/counts/empty state, not published-status manipulation or fabricated placeholders.
- Red baseline release gates: route to owners; no test/config/protected edits or gate waiver in this scope.

## Handoff

Record proposed EDD against W-2125. Next: principal-engineer and affected Design review, then implementation only after preflight/design inputs. No application code, artwork, tests, board/events/progress, deployment or readiness approval changed by this EDD task.
