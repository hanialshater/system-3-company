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
| `projects` | no | Project ids from company/ops/projects.json or an initiative (`first-light`, `behavioral-econ`) whose pre-mortem rows this entry carries. `links` must name files on disk, so it cannot hold a project id. This field does. Added 2026-10-15 (W-923). |
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

## Ruling on First Light's FL-02, FL-07, FL-08 and FL-09 (2026-10-16; W-1134, batch first-light/2026-10-16-round-1#4)

ruled by: principal-engineer-ops · inputs: company/initiatives/first-light/status.json (`risks`), SPIKE-002 R3 (branch `accounts`, 2f5c500), AMD-001's status line, company/engineering/readiness/2026-10-15-amd001-c2-split.md, company/engineering/notes/2026-10-15-first-light-reestimate.md

| Proposed | Ruling | Register | Score | Why |
|---|---|---|---|---|
| FL-02, dates 4x4 | **Entered, re-scored** | R-026 (new) | L4 **I3** = 12 | On 10-15 this was uncertainty in an estimate that did not exist yet. Now the re-estimate is on disk and gives about 25% at full scope, which is a measured likely miss, so it is entered. Impact stays at 3. A slip delays one release, and the company keeps shipping. The impact-5 way date pressure fails, a thin or skipped review, is R-020, and I do not count it twice. Re-score on W-1121. |
| FL-07, A1 2x4 | **Accepted** | R-021 | **L2** I4 = 8 (was L4) | The mechanism is in code: (c2)+R1 is applied on main (0d76ae1 per AMD-001's status line, and the split files are on disk). Only the deploy, the audit and the Q5 re-measure remain. R-021 is principal-engineer's area, not mine, so I may lower it. The next ops review confirms or reverts the re-score. It goes back to L4 if the post-deploy re-measure misses Q5.3 or Q5.4. |
| FL-08, social without moderator 4x3 | **Re-framed** | R-027 (new) | L2 I5 = 10 | The 4x3 reading is scope loss (no moderator means no swap). That is founder decision F-26 with its own if-it-slips line, so it stays in status.json and the inbox. The register carries the harm: a social path reaches learners with nobody to act on a report. The guards (P4.3, the founder record) are paper. Proposer may contest at the ops review. |
| FL-09, kill switch needs a redeploy (3x3) | **Entered, re-scored** | R-028 (new) | L2 **I4** = 8 | SPIKE-002 R3 plus the founder-approval rule: time to off is founder availability plus a build. L2 because nothing real is behind accounts today, and it rises to L3 at go-live (W-1142). I4 because a learner-data fault stays live for that whole window. It is a readiness gap (A-3) in 2026-10-16-accounts.md. |

In status.json, head-of-strategic-initiatives replaces FL-02, FL-08 and FL-09 with R-026, R-027 and R-028 (her file; I did not edit it). `lastReviewed` on the three new entries is their opening date. R-021's stays 2026-10-15 until an ops review.

## Ruling on First Light's proposed risks and the 10-15 pre-mortems (2026-10-15; W-918, W-923)

ruled by: principal-engineer-ops · inputs: company/initiatives/first-light/status.json (`risks`, FL-01 to FL-07), company/initiatives/first-light/risk-rescore.md (2026-10-15), company/ceo-office/2026-10-14-project-review-1-premortems.md (first-light, behavioral-econ)

The register's ids are `R-NNN` (tools/risks.mjs refuses anything else), so accepted FL rows enter under new R ids. In status.json, head-of-strategic-initiatives replaces each accepted FL id with the R id below, or the war room keeps showing them as proposed. That file is hers, so I have not edited it.

| Proposed | Ruling | Register | Score | Why |
|---|---|---|---|---|
| FL-01, two migrations at once | **Merged** | R-021 (kit and deploy-path collision), R-001 (host) | R-021 L4 I4 | FL-01 is the general case, and FL-07 is the concrete way it happens: A1 coming onto the path. Two entries would double-count it. The host half is R-001. |
| FL-02, dates are a guess until W-908 | **Not entered** | none | none | It is uncertainty in an estimate, not an event that costs learners, a gate or data, and W-908 resolves it on 10-23. It stays in status.json. The budget half (proxy units) is R-012. It comes back here if W-908 is not on disk by 10-23. |
| FL-03, accounts without a privacy, terms and age read | **Accepted**, merged with first-light pre-mortem row 3 | R-022 | L3 I5 = 15 | It is the same failure mode with the same owner. |
| FL-04, the new role duplicates chief-of-staff and head-of-product | **Not entered** | none | none | It is an objection to an org decision, so it travels on the decision record (2026-10-15-head-of-strategic-initiatives.md) and is answered in W-904 by the chief of staff (CEO office), who owns org changes. It is not an operational risk. |
| FL-05, Vercel Hobby is non-commercial | **Accepted, re-scored** | R-023 | L4 **I4** = 16 (proposed I3) | Losing the production account means the company cannot ship (the impact-4 line). This raises the proposal and does not lower it. principal-engineer may contest at the ops review. |
| FL-06, review capacity for tier-2 readiness and privacy | **Accepted as proposed** | R-020 | L4 I5 = 20 | The evidence holds. I score impact 5 on a stronger ground than the launch slip: under capacity pressure, this risk fails as a thin or skipped privacy or readiness review, and that ships learner data unreviewed. **Conflict:** I own this entry, write the register and am one of the two constrained reviewers. I did not lower it, and it is not lowered without principal-engineer at an ops review. First data point: W-978 (tier 2) was approved about 5 minutes after its record was committed. That is one record, not a median. |
| FL-07, Q5 pulls A1 onto the critical path | **Accepted as proposed** (with FL-01) | R-021 | L4 I4 = 16 | Q5.3 and Q5.4 are measured, and W-946 is the found cause. W-930 (due 10-22) re-scores it. |

**Pre-mortem rows (W-923).** For first-light: row 1 goes to R-013, row 2 to R-012, row 3 to R-022 (new), row 4 to R-003 and row 5 to R-001 (with R-021). For behavioral-econ: row 1 goes to R-024 (new), row 2 to R-006, row 3 to R-025 (new) and row 4 to R-012. Each entry carries the project in `projects` and the project's records in `links`, and each existing entry gets a dated line in its description with the row's score and signal. Scores of existing entries are unchanged, because a re-score is the ops review's job. I did not link behavioral-econ to R-001, R-003 or R-013. No row of its pre-mortem points there, and a link without evidence would make the project look riskier than its record shows. W-923's list of five is the union of both projects' rows.

**R-003 (drafts half): unchanged.** It moves only after r7's C2 checks pass on the production domain (2026-10-15-r7-drafts-trust-sheet.md). r7 has not shipped (the last entry in releases.json is r6). The note is in R-003's description.

**Kept off the register:** W-851's "closes when merged" (2026-10-15-qa-no-server-reuse.md). The port cross-talk is a failure mode of R-017. It is noted there, and W-851 is added to R-017's mitigation.

## Objection on the decision record, answered

The chief of staff objected that strategic and organisational risks (one host, founder bandwidth, category bets) are not operational. **What happened:** they are in the same register, tagged `strategic`, owned by the CEO office, a PE, a category lead or the founder (R-007, R-013, R-018). R-001 (one host) is tagged `operational`, because when it fails the company cannot ship today. Its owner is the principal engineer (interim) until W-533 names one. principal-engineer-ops runs the review of all of them. The objection's status on the decision record is the chief of staff's to update.

## Seed (2026-10-14)

Seeded from the three 10-14 COEs and the 10-13 COE, the 10-14 ops review, the constitutional review, the CEO office operating audit, the WBR (2b and anomalies), the token-budget note and plan-to-2000 section 6. Every number in `description` comes from those records or from a count on disk, and the count's method is named. One figure in the brief, "about 295 lessons" with held claims, could not be reproduced. R-006 gives the measured counts instead.
