# Founder ask: Number Island SVG lesson world

owner: design-lead
date: 2026-10-27
status: routed
class: format / product / engineering / deploy
route: design-lead → head-of-product → principal-engineer → evaluation-steward → release-manager
recorded by: chief-of-staff

## What the founder said

> Do you think ww can have a page like supermario world with svg for the lessons, each level have handful of lessons (as view and not alternative of the main tiktok like ux)?

> 4-6 is low number, but show me the curriculum for one level

> Ok lets do the svgs, when you finish deploy so i can see it too

> Ah we should work through the company

> Look show me a screenshot when you have it for my approval

Source: this conversation, 2026-10-27. The deploy instruction authorizes a preview of this specific feature, now conditioned on the founder seeing and approving screenshots first. It does not authorize unrelated releases or overriding checks. Prepare reviewable phone and desktop screenshots and present them; do not deploy while this visual approval is pending.

## What the founder decided, and what is left to the owners

- Build an SVG world-map view alongside the existing feed, using the company's org and process.
- Proposed first level: Number Island, 12 existing math lessons, grouped into Number Village (place value, decimals, equality), Fraction Harbour (sharing, adding, division, division by zero), and Scaling Mountain (area multiplication, products below one, proportions, area, volume).
- Proposed lesson slugs in order: add-a-zero, more-digits-not-bigger, the-equals-sign-balances, three-pizzas-four-people, add-the-slices, scoops-in-three-cups, divide-six-by-zero, split-the-sum, times-can-shrink, adding-squashes-the-photo, double-the-size, cube-the-size.
- Owners decide final visual treatment, curriculum sequence, implementation, accessibility and release feasibility. No new lessons, claims, checkpoints or mastery measures are approved by this record.
- No new company roles, agents, rooms or orgs are proposed. Dispatches use existing role definitions and require their preflight.

## Route and answers

| Step | Role | Answer | Where |
|---|---|---|---|
| 1 | design-lead | Agree with changes: original SVG atlas and responsive map/list; specialists before build | company/design/specs/number-island-direction.md |
| 2 | head-of-product | Agree with changes: optional 12-lesson collection, no new content or learner-state reads | company/product/number-island-scope.md; company/product/number-island-math-sequence.md; company/product/number-island-personalization-boundary.md |
| 3 | principal-engineer | Agree with changes: tier 2 route, EDD before code and independent ops-readiness review | company/engineering/number-island-routing.md |
| 4 | evaluation-steward | Pending independent QA/a11y routing | To be supplied by owner |
| 5 | release-manager | Existing verify and API access block release; scoped approval preserved, screenshot checkpoint now added | company/ops/deployments/2026-10-27-number-island-feasibility.md |

## Objections

- **Chief of staff:** Baseline release verification is already red. **Answer:** Record before/after evidence and ask release-manager for the supported release path; do not weaken or bypass gates, or claim a deploy before a receipt and live check exist.
- **Chief of staff:** Existing dispatch preflight warns of overdue rituals and incomplete old intake records. **Answer:** Manager consultations may proceed only when their actual preflight passes; run the build preflight before specialist implementation and resolve any failure through its owner. Do not relabel build work to bypass the check.
- **Chief of staff:** Earlier chat suggestions described progress and new checkpoints without ownership review. **Answer:** Treat those as proposals only; do not introduce learner-data reads, new mastery measures, or assessment content without the relevant manager's scope and review.

## Board

The five Number Island owner steps are recorded in company/ops/board.json. The chief of staff alone updates shared board, events and progress records.
