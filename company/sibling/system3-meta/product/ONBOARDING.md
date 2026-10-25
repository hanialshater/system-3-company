# Company onboarding: archetypes, the role and skill catalog, and the plan for a new company

owner: vp-meta · status: **draft for the founder's review** · founder, 2026-10-25: "to complete the picture we need
company onboarding plans (we have amazon/corp like, science like, committee, dynamic workflow, etc.) we can add
different company archetypes to allow for org design, we always have catalog of roles and skills that we can use to
bootstrap a company org and HQ developers (also in current s3 company)"

A new company is bootstrapped from three things Meta keeps for every company: **an archetype** (how the organisation
decides and works), **the catalog of roles and skills** (who does the work), and **the starter kit** ([STARTER.md](STARTER.md):
kernel, event log, starter HQ). Every company also gets **HQ developers** from day one, so it can build its own
features on the starter HQ.

## 1. Archetypes (org designs a company starts from)

An archetype is a template: structure, how decisions are made, its rituals, its referee, its default roles, and the
kernel features it switches on. A company can mix them by lane (for example a corporate product lane with a science-like
research lane, as System 3 Company does).

| Archetype | Structure | How decisions are made | Rituals | Referee | Use it when | Evidence |
|---|---|---|---|---|---|---|
| **Corporate (Amazon-like)** | a hierarchy of lanes with single-threaded owners; small teams; a chief of staff runs the loop | written documents (PRDs, design docs, 6-pagers); owners decide in their lane, escalation by asks; bar raisers on hiring-like gates | WBR, operational planning, COEs, demo crit, launch reviews | gates per lane (QA, fact-check, review), the ledger and budgets | recurring production work with quality gates and accountability | System 3 Company (M4-M7: 13 lessons published through gates) |
| **Science (lab)** | a principal investigator, researchers, independent reviewers | hypotheses with predictions committed before any run; peer review; replication | experiment registration, readouts, journal club | held-out tests, pre-registered criteria, replication | research where being wrong is the default and evidence must be independent | System 3 Meta's benchmarks (B6-B12: predictions committed first, quiet final scoring) |
| **Committee (deliberative)** | members of equal standing, a chair | private-then-revealed positions (no anchoring), objections that travel with decisions, the chair records decisions | meetings with agendas and minutes, decision records | the record: every decision answers every objection | decisions with many stakeholders, policy, high-stakes choices where groupthink is the risk | `meetings.mjs` (built; used for rituals) |
| **Dynamic workflow (autonomous)** | peers with starting roles (not limits), one architect for interfaces, an independent referee | members choose their own work, claim it, land it themselves past the referee; coordination by notes and the board | none fixed; off-boarding into the knowledge base | the referee: a land is accepted only if the score does not fall | broad build work that divides into areas, where speed matters | B11 (ceiling reached), B12 (matched one strong agent at the same cost in half the time) |
| **Population (evolutionary)** | a lead with a fixed evaluator; many short-lived variants | selection by the evaluator; crossover of the best | generations | the fixed evaluator | optimisation with a cheap, exact score | B9 P, the lesson company's R&D evolution (`company/rnd/evolution.md`) |
| **Single strong agent** | one agent, with a referee | the agent | "go on" turns | the referee | bounded work that fits one context ("the default is one strong agent", PRINCIPLES.md) | B8-B10: one agent won when the work fit one context |
| **Open source (maintainers)** | area owners (stewards) and contributors | contributions land after the owner's review and the referee | release cycles, reviews | CI and maintainers | long-lived shared codebases with many contributors | `owners.mjs` (K29-K33), stewardship in PRINCIPLES.md |

Candidates to add as they are tried: **studio** (creative crit, as the lesson company's demo crit), **startup** (flat,
fast, founder-led), **guild** (craft standards across companies).

## 2. The catalog of roles and skills

- **Roles:** `company/roles/` holds 111 role definitions today (purpose, scope, may and may not, handoffs), generated
  from the org as data (`tools/org/roles.mjs`, `tools/org/people.mjs`) into onboarding docs (`company/onboarding/`) and
  subagents (`.claude/agents/`). Meta's own prototype roles are in [../ROLES.md](../ROLES.md).
- **Skills:** the spec's `skills` (what a role can do: the tools and commands it is given) and the agent skills
  (`.claude/skills/`, slash commands for rituals).
- **Layering:** the **generic roles** (chief of staff, architect, referee and evaluation steward, fact-checker pattern,
  QA, release manager, HQ engineer, principal engineer, portfolio manager, analytics steward, privacy reviewer) move to
  the **starter catalog** (Meta-owned); **domain roles** (category managers, learning designers, demo builders, the
  personalization org) stay with their company and are examples other companies may copy.
- **Every company gets HQ developers** (the `hq-engineer` role, with the design engineer where it has a design lane):
  they own the company's HQ pages on the starter HQ's extension points.

## 3. The onboarding plan for a new company

| Step | What | Who | Output |
|---|---|---|---|
| 1. Intake | the founder (or an approved requester) states the company's purpose, its product, its success measure, its budget and what stays with the founder | founder, Meta's chief of staff | an intake record (`company/decisions/_template-founder-intake.md`) |
| 2. Archetype | choose an archetype per lane (or a mix), with the reason | Meta's org designer (chief of staff, CEO-office) | the org design in the spec |
| 3. Roles and skills | pick roles from the catalog; write any domain roles the company needs; every company includes HQ developers and a referee | Meta's org designer | the spec's roles and skills |
| 4. Referee | define the company's score (`score(tree) → rate, by area, ok`), its held-out set, its gates | the company's evaluation steward | the referee hook |
| 5. Budgets and approvals | the company's budget, lane budgets, what needs the founder (deploys, money, external accounts) | founder | the spec's governance |
| 6. Generate | `generator.mjs` validates the spec and builds the company: repository, org, starter HQ, event log, knowledge base | Meta | a new company in the city registry |
| 7. On-board | members read the starter knowledge (city-wide entries, if on) and the company's purpose; HQ developers set up its HQ pages | the company | first orders on the tracker |
| 8. First review | after the first orders: the referee's results, cost, and whether the archetype fits | founder, Meta | keep, adjust the archetype, or retire |

## Open questions for the founder

1. Which archetypes go into the first starter kit (proposal: corporate, science, committee, dynamic workflow, single
   agent; population and open source as lane options)?
2. Is the role catalog's generic part moved out of System 3 Company now, or at the migration?
