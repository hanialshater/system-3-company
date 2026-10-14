# Risk register

owner: principal-engineer-ops (Rhea) · date: 2026-10-14 · register: [risks.json](risks.json) · check: `node tools/risks.mjs report` (read-only; exit 1 on a malformed entry)
decision: [2026-10-14-founder-risk-in-ops-review.md](../decisions/2026-10-14-founder-risk-in-ops-review.md) (and its Amendment 1: every engineer owns the risks of what it builds and runs)

A risk is something that **has not fully happened yet** and would cost learners, a gate, data or the company's ability to ship. An incident that is happening goes to [incident-response.md](../engineering/operations/incident-response.md) first. A known deficit with a tier goes to [tiers.json](../engineering/operations/tiers.json). The register holds the risk that the deficit leaves behind, and links the tier entry.

There is no separate ritual. The register is re-scored in section 7 of every [Operational Health Review](../rituals/templates/ops-review.md). A new SEV1 or SEV2 triggers that review off-cycle (`orMatch` in [triggers.json](../rituals/triggers.json)).

## Entry format

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | `R-001`, `R-002`, ... Never reused. A closed risk keeps its id. |
| `title` | yes | Short name, as it appears in the report |
| `description` | yes | What could happen, and the evidence on disk that it can (counts, dates, record links). Measured numbers are labelled as measured. |
| `category` | yes | `operational` (we can't ship or run), `data` (data lost, wrong or missing), `security` (exploit, gate bypass), `ux` (what a learner sees is wrong, unfair or unsafe), `strategic` (the plan, the org, the founder, legal) |
| `likelihood` | yes | 1-5, see the scale below |
| `impact` | yes | 1-5, see the scale below |
| `owner` | yes | The **role** that carries the risk, normally the engineer who owns the service (Amendment 1). Strategic risks name the CEO office, a PE or the founder. |
| `mitigation.summary` | yes | What reduces likelihood or impact |
| `mitigation.board` | yes | Board ids (`W-<n>`) that carry the mitigation. An `open` or `mitigating` risk without one is malformed. |
| `mitigation.reality` | yes | `in-place` (a mechanism works today), `partial` (some of it), `paper` (only a document, a rule, or a backlog item) |
| `mitigation.paperOnly` | unless `in-place` | What exists only on paper. This is the honest line. |
| `status` | yes | `open` (no working mitigation), `mitigating` (some works, more is owed), `accepted` (owner and the founder or a PE chose to carry it: add `acceptedBy` and `acceptedWhy`), `closed` (the risk is gone, not just quiet) |
| `opened`, `lastReviewed` | yes | `YYYY-MM-DD`. `lastReviewed` changes only when an ops review re-scores the entry. |
| `tier` | no | The tiers.json entry it belongs to, e.g. `ci-and-deploy (T1)` |
| `links` | yes | Records on disk (COEs, reviews, decisions). The tool fails on a link that is not on disk. |

**Score = likelihood x impact** (1-25). The report sorts by score, then by impact.

### Scales

| | Likelihood | Impact |
|---|---|---|
| 1 | Not seen, needs several unlikely things | Cosmetic, nobody outside the company notices |
| 2 | Possible, no instance yet | Slows one team for a day; recoverable from git |
| 3 | Plausible in the next two weeks, or seen once | One gate weakened, a category stalled, or learners see a minor error |
| 4 | Expected this week, or seen more than once | The company can't ship for a day, or a gate is bypassed, or learners see wrong content |
| 5 | Happening now, or certain without action | Learners harmed, data exposed, legal exposure, or the company's main claim (that learners learn) is untested |

Score honestly. A risk is not lower because a board item exists. Only a working mechanism lowers it, and `reality` says whether it works.

## Who writes what

- **principal-engineer-ops** owns the file, the scales and the re-score. It may add an entry for any area.
- **Each engineering role** (platform-engineer, backend-engineer, hq-engineer, design-engineer, tools-lead, release-manager, rnd-engineer, and demo-builder for shared engines and the kit) owns the entries for its services. It proposes new entries and re-scores in its readiness records ([ops-readiness.md](../rituals/templates/ops-readiness.md), "Risks") and its paragraph at the ops review. principal-engineer-ops writes them into the file, so the file has one writer.
- **portfolio-manager**: the pre-mortem section of each project proposal feeds new entries (board item for the template change).
- Nobody lowers the score of a risk in their own area without the ops review seeing the evidence.

On 2026-10-14 hq-engineer, design-engineer and rnd-engineer own no entry. That is a statement about today's evidence, not a clean bill. Their first tier-1 or tier-2 readiness record says whether they carry one.

## Objection on the decision record, answered

The chief of staff objected that strategic and organisational risks (one host, founder bandwidth, category bets) are not operational. **What happened:** they are in the same register, tagged `strategic`, owned by the CEO office, a PE, a category lead or the founder (R-007, R-013, R-018). R-001 (one host) is tagged `operational`, because when it fails the company cannot ship today. Its owner is the principal engineer (interim) until W-533 names one. principal-engineer-ops runs the review of all of them. The objection's status on the decision record is the chief of staff's to update.

## Seed (2026-10-14)

Seeded from the three 10-14 COEs and the 10-13 COE, the 10-14 ops review, the constitutional review, the CEO office operating audit, the WBR (2b and anomalies), the token-budget note and plan-to-2000 section 6. Every number in `description` comes from those records or from a count on disk, and the count's method is named. One figure in the brief, "about 295 lessons" with held claims, could not be reproduced. R-006 gives the measured counts instead.
