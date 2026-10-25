# The starter kit: what every company gets on day one

owner: vp-meta · status: **draft for the founder's review** · founder, 2026-10-25: "not everything should go to meta,
companies have HQ developers to add custom features, we should be clear on the good starting point for any company"

**The rule: Meta owns what every company needs on day one; a company owns its domain and its customisations.** A
company is generated from a spec with the starter kit, then grows its own features on top through extension points;
it pulls starter updates; a company feature that proves generally useful is proposed upstream to Meta, like a patch.

## 1. Meta-owned: the starter kit

### The kernel (the organisation's operating system)

| Area | What it provides |
|---|---|
| Members and roles | the org as data: roles with a responsibility (not a limit), models per member, starting areas; members may change role, pair up, go idle |
| Work | continuous member sessions; each member's own tree; sync with main when it chooses; **land** its own work past the referee |
| The referee hook | a company plugs in its referee (tests, judges, fact-checks); a land is accepted only if the referee says main does not get worse; every result posted |
| Budgets and approvals | one shared, visible budget per company (and lane budgets), a live cost guard, founder approvals for outward actions (deploys, money, new external accounts) |
| Coordination | the board (findings, dead ends, hypotheses, each with evidence and a wrong-if), claims, direct notes, channels |
| The tracker | every piece of work (issues, orders, actions from meetings) in one place, Linear-like |
| Meetings and rituals | meetings with private-then-revealed positions, objections that travel with decisions, minutes; rituals (WBR, goal review, digests) |
| Learning | off-boarding into the company's knowledge base; practices with beliefs updated by measured outcomes (K38, K39); on-boarding reads it |
| The event log | every action as an event in one append-only log: **the stable contract** every view (and every HQ page) reads |
| Sandboxing | the access rule, hooks and shims for agent sessions; cost from transcripts |

### The generator

A company from a spec: rooms, roles, models, the flow, the referee hook, budgets, the starter HQ (`generator.mjs`,
milestone M2; to be extended with the autonomous org and the HQ).

### The starter HQ

| Page or panel | Source |
|---|---|
| Sidebar (Linear-like): projects, issues, landings, by status and owner | the tracker and the lands in the event log (new) |
| The office: floors and rooms, who works where, replay at any past moment | today's HQ `Office.tsx`, `HQ.tsx` (promoted from the lesson company) |
| People: each member's role, model, status (working, idle, stopped), spend | today's `PeoplePanel.tsx`, `people.ts` (promoted) plus the spend ledger |
| Progress: the referee's score over time, by area; refusals | the lands and the referee's results (new) |
| Meetings: agendas, positions, decisions, objections, minutes | `meetings.mjs` (new page) |
| Knowledge base: entries by topic, with evidence and beliefs | today's `library` page (promoted) over `knowledge/` |
| Extension points: a company adds its own pages, sidebar sections and panels | (new: a registry of company pages) |

### Archetypes and the role and skill catalog

The org designs a company starts from (corporate, science, committee, dynamic workflow, population, single agent,
open source) and the generic roles every company may draw on, HQ developers included: [ONBOARDING.md](ONBOARDING.md).

### The city registry

The list of companies, each one's health, spend and budget, and a link into its HQ; an optional city-wide knowledge
base.

## 2. Company-owned: built and customised by its own HQ developers

- **Its product** (for the lesson company: the lessons, the feed, the learner app).
- **Its domain roles** (for the lesson company: category managers, learning designers, demo builders).
- **Its referees and gates** (for the lesson company: the fact-checker, QA, learner evaluators, pairwise judges).
- **Its custom HQ pages** (for the lesson company: curriculum, evaluation, personalisation, design, kudos, first-light,
  releases, R&D, strategy, whiteboards, press).
- **Its own knowledge base** entries, and its own decisions and product docs.

## 3. The contract between the layers

- **The event log schema** is versioned; the kernel adds event types without breaking old readers.
- **HQ extension points**: a company page declares its route, its sidebar entry and the event types it reads.
- **The referee hook**: `score(tree) → { rate, by area, ok }`; the kernel never interprets a company's score beyond
  "did main get worse".
- **Upgrades**: a company pins a starter version and upgrades on its own decision; a breaking change needs a decision
  record and a migration note.

## Open questions for the founder

1. Is the city-wide knowledge base on by default, or does each company opt in?
2. Who may create a new company in the city: only the founder, or Meta's generator on an approved spec?
