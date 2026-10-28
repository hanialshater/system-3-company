# EDD-017 Number Island: pre-code engineering review

owner: principal-engineer
date: 2026-10-27
status: approve with changes; conditional implementation clearance only
reviewed: company/engineering/edd/EDD-017-number-island.md
affected design: company/design/specs/number-island-interaction.md; company/design/specs/number-island-direction.md
board: W-2125

## Verdict

The dedicated `/learn/world` route plus a bounded contextual return control is a suitable **tier-2** design. It reuses the catalog and existing player, introduces no service/dependency, and explicitly excludes learner-history, mastery, progression and new content. No ADR is necessary for this reversible presentation architecture.

**Approve with changes:** resolve C1 below in both owning documents before coding the navigation contract. Implementation may begin after that alignment, Design's composition selection and the actual build preflight pass. This is a pre-code design review, not implementation review, ops-readiness approval, permission to deploy, or approval of a screenshot that does not yet exist.

## Evidence inspected

- Current EDD-017 problem, options, component/file boundaries, payload and URL contracts, measurements, seven operational-readiness answers, rollback and rollout.
- Interaction specification, design-lead direction, product scope, cm-math collection sequence and VP-personalization's static/no-new-data boundary.
- Existing `src/lib/catalog.ts`, `src/lib/visibility.ts`, lesson page, catalog page, progress ownership boundary, ordered readiness path map and dispatch-check implementation inspected in the earlier manager consultation (`company/engineering/number-island-routing.md`).
- Founder intake now records the later screenshot request as an explicit approval checkpoint before deployment. Earlier preview authorization does not supply the missing visual approval.

No source, screenshot, browser or independent quality artifact was available for this pre-code review. No evaluator-held-out records were opened. No tests/build were rerun for this document-only review.

## C1 — Align the actual URL contract before code

The current documents disagree:

| Surface | EDD-017 | Interaction specification |
|---|---|---|
| World selection | hash `#stop=<slug>&view=map|list` | query `?stop=<slug>&view=map|list` |
| Player entry marker | `?from=number-island` | `?island=number-island&islandView=map|list` |
| Explicit return | always `view=map` | preserves the originating Map/List view |

Do not ship two parsers or let one implementation silently choose which owner is right. The view-preserving behavior is part of the interaction contract and should survive the round trip.

**Recommended resolution:** use the EDD's current-location hash for world selection (avoids server `searchParams` and allows static page generation); use `/d/<known-slug>?from=number-island&islandView=map|list` on the explicit Open link; return to the fixed `/learn/world#stop=<known-slug>&view=<validated-view>`. An absent view can default to Map. Unknown/duplicate `from`, unknown/duplicate/invalid view, or a noncollection lesson retains the ordinary catalog return link. The world parser rejects duplicate or malformed stop/view identifiers and falls back deterministically to available data. Map state resolves group from selected available slug; no extra identity is required.

Platform-engineer and interaction-designer must put **one equivalent chosen contract** in both documents, including view preservation and duplicate/invalid handling, before code. The exact marker name is not an architectural preference; bounded targets, a static ordinary lesson route, truthful available membership and preservation of the explicit chosen view are the requirements. This review does not authorize a broader redirect or parser.

## Conditions retained for implementation and review

1. **Actual Design selection:** design-lead and head-of-product select rendered mockups before the builder chooses phone geometry. Recommended region-focused phone composition must still expose all available lessons in Map and complete List views. It is not acceptable to scale desktop controls below 44 CSS px.
2. **Minimal safe projection:** keep full catalog metadata and claims on the server. Use an explicit allowlist of slug/title/status/duration/group/order, one ordered projection for map/list/details, truthful counts and real empty states. A client-side import of the full metadata registry, hidden titles or all lesson implementations is a blocker.
3. **Preserve static lesson hosting:** only replace the navigation slot with the small client return component; retain `generateStaticParams`, `dynamicParams = false`, player props and existing visibility. No server search/cookie/header APIs or whole-page client bailout. The return parser derives the fixed destination, never accepts arbitrary URLs or reads a referrer/store. Inspect actual production generation and direct-entry behavior later.
4. **No new data semantics:** component/current URL selection is navigation only. No account/progress/history read or write, mastery, completion, analytics, recommendation request, quiz or checkpoint is approved. Browser probes must distinguish preexisting global AccountSync/lesson behavior from additions made by the world surface; do not claim the whole site has no data processing.
5. **Non-script and accessibility behavior:** the EDD's non-script fallback must contain real server-rendered lesson links, not only buttons that need hydration. Map controls must preserve native keyboard semantics, DOM order, distinct focus/selection and a usable full list at 320 px/200% text/reduced motion. Scenery is nonsemantic, and art failure cannot hide the lesson links.
6. **Measurements stay evidence-based:** retain the ≤8 KiB display payload, ≤80 KiB authored-art budget and ≤30 KiB gzip incremental client-cost target as pre-code acceptance targets. Report actual artifact and route-chunk measurements separately; shared/framework bytes are not new feature bytes, but cannot be hidden by misleading subtraction. A target miss goes back to this owner with evidence. The mid-phone ≤2 s operability aim is not established by desktop cloud timing.
7. **Real scope and operational preflight:** the builder uses a real assigned linked worktree for this authorized feature task and a passing build preflight with current counts. The earlier C3/WBR/digest refusals cannot be bypassed with another `kind`, fake paths, stale counts or retrospective ritual records. This review does not declare those prerequisites resolved.
8. **Independent finish:** after code exists, principal-engineer reviews the actual diff and integrated evidence; principal-engineer-ops independently approves readiness. Evaluation-steward routes actual QA/a11y/privacy checks, and VP-personalization routes the agreed growth-designer copy/metaphor pass. No author supplies another role's approval.

## Release boundary

The founder's latest screenshot request conditions deployment on actual visual approval. Produce and clearly label rendered mockup previews and, later, real phone/desktop product screenshots; do not present one as the other. Design selection permits implementation, while founder visual approval permits the release manager to continue the already-scoped deployment request only when remaining release gates/access are satisfied. Silence is not screenshot approval.

The baseline `verify` chain is red before this feature and stops before later suites; separately successful build/type/sample QA does not turn that chain green. Keep all baseline/new outcomes distinct, preserve gates and protected tests, and route the release consequence to release-manager. No waiver of red checks or default-branch/PR restrictions is supplied here.

## Next owners

- **Platform-engineer + interaction-designer:** close C1 in their documents and report the exact final navigation contract to chief-of-staff.
- **Design-lead + head-of-product:** select the composition from real mockup artifacts; visual-designer refines it through the existing company route.
- **Chief-of-staff:** record these real responses, ensure actual preflight prerequisites and assigned isolation, then dispatch the bounded builder.
- **Principal-engineer / principal-engineer-ops:** later engineering diff review / independent operational readiness. These remain pending until built evidence exists.

No app, art, protected path, board, progress or event file was changed by this review. No deployment was attempted.
