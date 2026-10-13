# Vertical Review: <date>

owner: principal-pm-verticals (chair) · attends: head-of-product; each category manager whose category feeds a vertical under review, reporting for its strands; design-lead (formats a vertical needs); localization-lead (markets); personalization-lead (paths); portfolio-manager (what the board can carry) · decides: head-of-product for bets inside the roadmap, the founder for new verticals and budgets (via company/ops/founder-inbox.json)

Trigger: `company/rituals/triggers.json` (vertical-review). It runs every 100 published lessons, every 14 days, or when the founder names a new direction (a `founder` event), whichever comes first. It is strategic and not frequent on purpose.

## 0. The picture
- Coverage and gaps by category and strand (`npm run company -- coverage`), overlap (`node tools/overlap.mjs`), and published share and learner verdicts per category (`npm run metrics`).
- Real-learner evidence (recall, return rate), or "none yet": simulated reviews are not market evidence.

## 1. Each vertical under review
For each strategy doc in `company/product/verticals/`:

| | |
|---|---|
| Audience and job to be done | |
| Portfolio | concepts by category and strand: built / published / missing |
| Formats it needs | from `company/design/formats.md`; new ones go to the design lead |
| Evidence since last review | |
| Success metric and kill criteria | met? |
| Verdict | **grow · keep · fix · pause · kill** |

## 2. Proposals
New verticals and cross-category bets. Each one names an audience, why 60-second predict-and-see lessons win there, the first 10 concepts, kill criteria, and what it costs in briefs and builders.

## 3. Asks
To each category manager, the brief requests by strand, in order. To design, the formats. To International and Personalization, the locales and paths. Each ask is a board item with an owner. Founder decisions go to the founder inbox.

## 4. Objections
Each objection, with the answer that travels with the decision.

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
