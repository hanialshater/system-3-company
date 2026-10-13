# Weekly Business Review: {{date}}

owner: chief-of-staff · metrics: analytics-steward · readers: founder, head-of-product, category managers

## 1. Operating snapshot (generated; do not edit numbers by hand)

{{snapshot}}

## 2. Learning metrics (analytics steward)

Report the controllable inputs and the outputs separately. Engagement numbers come last and come labelled.

| Metric | This week | Last week | Note |
|---|---|---|---|
| Revisit recall rate (correct on first spaced revisit) | | | the closest thing we have to learning |
| Prediction → reveal completion | | | |
| Lessons with a dead-control or console-error QA failure | | | |
| Median dwell per lesson (engagement, not learning) | | | |

Anything that looks interesting is probably wrong (Twyman). Before explaining a move, check logging, sample ratios and novelty.

## 2b. Agents (from `npm run metrics -- --md`, "Agents" table)

Read these before the anomalies. Each one is a question to answer, not just a number to report:
- **Roles never dispatched:** is the role unneeded (retire it, write an offboarding record), or is the chief of staff doing its work alone and skipping its check (for example QA, release, design)?
- **Stop rate:** usage limits, crashes, restarts. Above 10% means re-plan the concurrency.
- **Tokens per run by role,** against last week: did a brief get bloated?
- **Rework:** lessons revised ÷ lessons built. Rising rework means fix the upstream role (briefs, design), not the builders.
- **First-review launch rate by builder model** (EXP-003).
- **Brief errors found by builders:** count them from build notes and board items. They are a measure of category-manager quality.

## 3. Anomalies and owners

| Anomaly | Hypotheses (each predicts something different) | Probe | Owner | Due |
|---|---|---|---|---|

## 4. Category notes (one line each, by category managers)

## 5. Decisions needed from the founder (purpose, not evidence)

## 6. Objections carried into this week

| Decision | Objection | Status | Owner |
|---|---|---|---|


## Operational health (principal-engineer-ops)
One line from `node tools/ops-health.mjs`: burn rate, stop rate, tier-1 red lines, open SEV1/SEV2. Point to the last ops review.

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
