# Number Island: portfolio priority and execution sequence

owner: portfolio-manager
date: 2026-10-27
status: agree with changes; scoped triage decision, not implementation or release approval
source: company/product/number-island-scope.md
intake: company/decisions/2026-10-27-founder-number-island.md

## Portfolio answer

Agree with a bounded optional Number Island collection: twelve existing Mathematics lessons, one SVG island, equivalent list navigation and the existing lesson player. Keep the feed unchanged. No new lesson content, assessments, progress/history reads, mastery measures, locks or rewards belong to this first version.

Prioritize this feature as **P3 (makes things better)** under company/ops/triage.md. The founder has asked for it, but it is not an incident or a remedy for a demonstrated learner-facing failure. Its dependent tasks do not become P1/P2 merely because this new feature awaits them. Existing P1 operational failures and P2 launch/team blockers retain precedence. Among this feature's same-priority tasks, upstream ownership and design decisions come first.

The five existing board items were created by chief-of-staff from the founder intake, not by portfolio-manager. Their scoped triage below is approved. This is not an approval of future implementation, an authorization to skip dispatch checks, a new budget, or permission to widen the feature. Any required tier-2 engineering and readiness records remain prerequisites.

## Existing board decisions for chief-of-staff to apply

The chief-of-staff remains the sole shared-board writer. These are priority and queue decisions, not claims that consultations, artwork or deployment have finished.

| Item | Priority | Owner | Queue decision | Reason |
|---|---|---|---|---|
| W-2124 | P3 | head-of-product | next | Close the bounded scope and category/personalization answers first. Owner's product-shell response is already on disk, but remaining scope answers are not inferred from it. |
| W-2123 | P3 | design-lead | next | Direction exists; commission the interaction/mockup/visual work only after the required product and engineering boundaries are answered. Do not mark SVG artwork done. |
| W-2125 | P3 | principal-engineer | next | Confirm tier, implementation ownership, EDD/readiness obligations and dispatch prerequisites before a builder starts. |
| W-2126 | P3 | evaluation-steward | backlog | Manager may define the independent QA/a11y route now; actual artifact verification waits for a build and approved acceptance criteria. |
| W-2127 | P3 | release-manager | backlog | Keep the exact founder preview approval available; deployment awaits reviewed artifact, required verification, integration and working deployment access. |

Suggested exact commands, to be executed by chief-of-staff:

```sh
node tools/triage.mjs set W-2124 --p=3 --owner=head-of-product --state=next --note="Portfolio decision: optional founder-requested Number Island; close category and personalization scope before implementation. company/product/number-island-priority.md"
node tools/triage.mjs set W-2123 --p=3 --owner=design-lead --state=next --note="Portfolio decision: existing direction is not artwork approval; finish bounded design after owner answers and before builder dispatch. company/product/number-island-priority.md"
node tools/triage.mjs set W-2125 --p=3 --owner=principal-engineer --state=next --note="Portfolio decision: tier, EDD/readiness and builder routing are prerequisites for optional Number Island implementation. company/product/number-island-priority.md"
node tools/triage.mjs set W-2126 --p=3 --owner=evaluation-steward --state=backlog --note="Portfolio decision: route independent QA/a11y now if useful; artifact verification waits for the implemented world and acceptance criteria. company/product/number-island-priority.md"
node tools/triage.mjs set W-2127 --p=3 --owner=release-manager --state=backlog --note="Portfolio decision: scoped preview approval exists; retain release gates, reviewed artifact, default-branch integration and usable API access as prerequisites. company/product/number-island-priority.md"
```

Use normal board state transitions to reflect genuinely completed owner work; do not label the whole feature done when only a consultation is complete. Link each manager answer and its downstream artifacts on the appropriate item. Where one item combines a finished consultation and unfinished implementation, retain it open or split the remaining work explicitly, rather than silently dropping it.

## Next sequence and owner handoffs

1. **Chief-of-staff:** apply the existing five triage decisions and record manager answers in the intake. Keep the overdue-ritual/build preflight failures visible; do not dispatch a builder past them or reclassify build work as consultation.
2. **cm-math:** rule on the twelve-lesson collection, the three groups and advisory order; existing metadata and prerequisite inspection are inventory evidence only. This owner step was requested by head-of-product, not invented as a portfolio requirement.
3. **vp-personalization:** answer the static-world boundary and decide whether any growth-design contribution is needed. The first build contains no learner-state reads, personalized ordering or reward mechanics. Any expansion returns through this manager before specialist work.
4. **Design-lead and principal-engineer:** use those answers to dispatch the narrow existing design and engineering roles in the recorded order. Establish acceptance criteria and the appropriate tier/EDD/readiness path before code; use the actual dispatch preflight.
5. **Evaluation-steward:** route independent browser and accessibility checks on the working artifact. Review map/list parity, phone reflow, keyboard operation, titles/statuses/visibility and lesson entry/return. Do not substitute this for a new lesson factual or learner verdict.
6. **Release-manager:** after reviews and required gates pass, use the supported preview-release path and return its receipt and live smoke results. The 2026-10-27 founder words cover this scoped preview once ready; no duplicate approval question is needed.

Chief-of-staff should create explicit `cm-math` and `vp-personalization` consultation board items from head-of-product's written handoff if they are still missing. They inherit this feature's P3 priority; they should enter `next` only with that source link and a bounded consultation brief. This document does not approve any new item authored by portfolio-manager. No broader backlog sweep or new project budget was performed here.

## Blockers and objections

- **Release checks are red before this feature.** Release feasibility identifies two failing baseline publication tests and unconfirmed deployment API access. **Answer:** retain them as release blockers and route them to their established owners; do not quietly absorb unrelated gate/content repair into Number Island or waive the failed checks. Source: company/ops/deployments/2026-10-27-number-island-feasibility.md.
- **A founder request could displace urgent existing work.** **Answer:** classify it honestly as P3; existing higher-priority company work retains precedence. Within this bounded feature, dependency order is explicit.
- **A map can imply achievement without evidence.** **Answer:** accept the product scope's static, open collection only. No progress or mastery state is inferred from collection size, selection or visits.
- **Many consultations can expand indefinitely.** **Answer:** require a single bounded answer per owning lane for this twelve-lesson prototype; managers choose the necessary existing specialists, and chief-of-staff integrates. No new roles, rooms, orgs or subject regions are created.

## Handoff

Chief-of-staff owns board application and dispatch. The next feature-specific work is the existing category and personalization consultation requested by head-of-product, alongside completion of engineering and design routing. This record changes no board, events, progress, app code, SVG assets, gates or deployment state. It records no claim that implementation or release is complete.
