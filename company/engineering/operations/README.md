# Operations: tiers, incidents, post-mortems, the ops review

owner: principal-engineer-ops (Rhea, CEO office; reports to the principal engineer, Kenji) · since 2026-10-13 (founder request)

Change tiers (0–2, in `company/engineering/README.md`) say how much review a *change* needs. The tiers here say how much a *thing* matters when it breaks: a service, a data store, a security finding, a UX deficit. Every entry lives in [`tiers.json`](tiers.json) with an owner, a point of contact and a status.

## Tiers

| | Tier 1 (critical) | Tier 2 (important) | Tier 3 (convenience) |
|---|---|---|---|
| **Services** `T` | Learners can't learn, or the company can't ship: the feed and lesson runtime, the lesson kit, auth and the progress DB, deploy and CI, the gates | Degraded but working: the event API, walkthrough/QA tools, publish loop, work queue | Internal views: HQ, metrics, the concept inspector |
| **Data** `D` | Personal data, anything about a child, credentials | Pseudonymous learning data: attempts, recall schedules, events | Public content: lessons, claims, curriculum, company records |
| **Security** `S` | Exploitable now, or exposes D1 data | Exploitable with effort, or exposes D2 | Hardening, hygiene, dependency notices |
| **UX deficits** `U` | Blocks learning: an accessibility fail, a wrong fact on a published lesson, a stuck lesson | Degrades learning: told-not-shown, layout overlap, contrast warning | Cosmetic |

**Expectations by tier:**
- **T1/D1/S1/U1:** an owner within one operating-loop turn; it blocks launches and deploys in its area; an open item is a red line in the ops review.
- **T2 and below:** triaged as P2 (tier 2) or P3 (tier 3) per `company/ops/triage.md`.

## Incidents

See [incident-response.md](incident-response.md). Every SEV1 and SEV2 ends in a COE (`company/rituals/templates/coe.md`, `/coe`), written by an engineer outside the affected area. The ops review checks that COE actions close.

## Points of contact

Each tech team reports at the ops review through an engineer it already has. There are no new agents. The list is in `tiers.json` (`pocs`).

## The Operational Health Review

Template: `company/rituals/templates/ops-review.md`. Command: `/ops-review`. Trigger: `company/rituals/triggers.json`. It runs every 40 merged batches, or every 7 days, or after any incident, whichever comes first. Data: `node tools/ops-health.mjs --md`.
