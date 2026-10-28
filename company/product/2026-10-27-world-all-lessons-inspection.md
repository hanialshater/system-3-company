# Lessons World: all-lesson inspection scope

owner: head-of-product
date: 2026-10-27
class: product / release scope
route: head-of-product → principal-engineer → platform-engineer + personalization-engineer → independent engineering/QA → release-manager
status: approved product scope; implementation and deployment results pending

## Founder direction and supersession

The founder now says: “first lets get world for all lessons in including ones in PRs, then lets merge PRs and deploy for inspection, keeping the lessons unchecked statsu but still visible”.

Approve this revised sequence. The earlier requirement to finish independent reviews and make every company check green before continuing the world is superseded **for this inspection release**. Preserve completed reviews, failing findings and existing Published statuses. This is visibility and inspection, not bulk publication or a claim that lessons passed their gates. The founder has explicitly requested the resulting merge and deployment; do not insert another product approval or screenshot-confirmation loop. Capture and show real screenshots alongside the inspection build.

VP Personalization remains parked under F-52. Head-of-product approves this scoped contextual player behavior. Existing normal-feed ordering, account behavior and publication gates retain their contracts.

## Build now

- Cover every real registered lesson in the integration inventory, including actual lesson additions from the open content PRs. Each lesson needs a reachable map stop or an explicitly navigable region/list entry; do not silently drop unmapped curriculum lessons. Reconcile duplicate slugs and count unique lessons. Record included PR heads and inventory totals for inspection.
- Retain Number Island's twelve curated stops first, then compose real lessons into stable, named domain/topic islands with roughly 20–30 lessons and 4–5 small regions where practical. Existing curriculum order and actual lesson hooks supply the content. Do not invent lessons, teaching claims or empty locked islands to simulate infinity.
- Implement the independent Lessons illustrated-adventure SVG vocabulary in `company/design/specs/lessons-world-journey.md`: layered terrain, connected trails, landmarks and vegetation, with varied reusable compositions. Make the phone landscape continuous and progressively loaded, with a truthful content end. Keep labels clear of trails and coastlines.
- Provide equivalent Map/List access, semantic 44px targets, keyboard access, reduced motion and a nonmodal mobile bottom sheet with the real lesson question and Open lesson action. Keep navigation usable if scenery fails to load.
- Opening a stop enters the existing TikTok-style lesson experience at that lesson, continuing in the island's actual order. Back to world restores island, selection and scroll position. Ordinary feed sessions retain their behavior.
- Show a concise **Unchecked** inspection disclosure for content without current independent readiness evidence. Preserve actual Draft/In review/Retired unpublished disclosures and underlying metadata. Published is not evidence of current independent readiness; do not imply that it is. Do not relabel every lesson's editorial status or invent verification metadata to achieve the badge.

## Follow-up, without holding this inspection

The accepted evidence-derived Explored/Understood states, due revisits and versioned delayed-recall flag remain the next learning-behavior scope in `company/product/lessons-world-journey-scope.md`. They may ship only when implemented with the approved ownership, timing and independent evidence checks. For this first inspection, omit unsupported progress counts, seals and recall controls rather than presenting fixture progress as real or unknown as zero. No new account data, assessment persistence, analytics or personalization policy is required to expose the full world.

EXP-011 (registered as EXP-009; renumbered 2026-10-28, main already had EXP-009) predictions remain preregistered in `company/experiments/EXP-011-lessons-world.md`; inspection is not evidence that those predictions succeeded. Its analytics-steward owns any experiment launch/readout. The founder removed token metering as a blocker; no billed-dollar total or automatically enforced cap is claimed.

## Ownership and bounded acceptance

Platform-engineer owns the world inventory projection, SVG scene library, map/list/sheet, route restoration and shell integration. Personalization-engineer owns any change needed to the existing feed/player surface for explicit island-order sessions, through head-of-product; prefer a bounded contextual interface over changing normal feed ranking. Principal-engineer resolves integration/dependency boundaries and supplies independent readiness review. Release-manager owns the inspection deploy and verifies its actual URL, artifact and rollback point.

Before shipping, demonstrate unique inventory coverage, real links including PR additions, phone and desktop navigation, long titles, keyboard/reduced-motion behavior, unknown slugs, and a player round trip. Run code/build and relevant regression checks; record inherited content failures separately and truthfully. A broken build, missing lessons or broken player navigation is not excused by the inspection scope. Do not alter protected tests, deploy policy or publication gates to make the result green. Unrelated infrastructure PRs do not become lesson dependencies merely because they are open; Engineering identifies any actual dependency before integration.

This is a product disposition, not an independent artifact verdict, a deployment receipt or a lesson verification. No source, lesson status, claim, gate or shared operational record was changed here.
