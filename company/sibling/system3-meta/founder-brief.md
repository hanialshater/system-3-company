# System 3 Meta: founder's brief for the VP (mission and onboarding context)

owner: founder (words recorded by chief-of-staff) · date: 2026-10-16 · class: founder brief (input to an org design, not a design)
route: chief-of-staff-ceo-office (Leonie) designs the company, the VP role and the floor from this brief **after First Light** → founder approves → the VP onboards with this file as the first thing they read
recorded by: chief-of-staff · status: brief; nothing exists yet (company/decisions/2026-10-16-founder-system3-meta-sibling.md)

## 0. Value proposition (founder, 2026-10-16; this comes first, before everything else here)
> "It is System 3; we call it science." We are replicating the philosophy of science, the great invention that made human civilisation work. Every autonomous company is just the philosophy of science, because it is a harness for a community of fallible agents, robots and humans.

**What System 3 Meta sells:** not app generation and not agent orchestration, but **the scientific method as an operating system for a company**: a harness in which fallible agents and people make public claims, check each other independently, criticise openly, record everything, and correct errors through mechanisms instead of trusting any one member. The use case (lessons, a service, a product) is what the community works on; the harness is the product.

**What follows for every company System 3 Meta generates:**
- The harness ships first and is not optional: claims with sources, independent checking, falsification tests, objections on the record, the disk as memory, COEs and retros (section 1a).
- Members are interchangeable kinds of fallible agent: a model, a person or a tool takes a role on the same terms and is checked the same way. No member is trusted because of what it is.
- Success is measured outside the community (contact with reality), fixed before the company starts.
- Pitch test for any feature: does it make errors easier to find and cheaper to correct, without relying on anyone being right? If not, it is not System 3.

## 1. In the founder's words
- "Create a new floor, new VP of system 3 meta: it is a meta company with mandate to create whole company for specific use-case. I am seeing a leap from lovable/replit style platforms and probably this is a big idea for AI or a killer app. To keep us focused lets do that after first light. The new VP is running independently and it is a sibling company."
- "When I started this it was a choice to go with demos: they are kind of independent but need collective work to scale. We need to try other kind of companies, higher risk, real infra, and also make it work for others. I have few people who want to try and build their own stuff. Also we need to decouple from Claude and allow for more choices, we need to integrate humans, tools."
- "It is System 3; we call it science." We are replicating the philosophy of science, the invention that made human civilisation work. (founder, 2026-10-16)
- "Same model, different rules is fine; summary through off-boarding [and] mechanisms is very beneficial so each role gets the needed context. We started all of this to test System 3 book ideas, especially the philosophy of science, aka how to make fallible agents work together, [and] I added my experience from Amazon and Zalando on how to run orgs at scale."

## 1a. The thesis: System 3 is science, applied to an organisation of fallible agents
Science works without trusting any one scientist: claims are public, criticism is open, results must survive independent checks, and errors are corrected by the institution rather than by better individuals. System 3 copies that machinery so that fallible agents (and people) can produce reliable work together. Every generated company must carry it; it is the product, not overhead.

| Institution of science | Its form in this company | Where |
|---|---|---|
| Public, citable claims | Every learner-facing sentence is a claim with support and a source | lesson `meta.json`, `company claims` |
| Peer review | Builders never verify their own claims; evaluators see the artifact before the account | CLAUDE.md, company/reviews/ |
| Falsification (Popper) | Reviewers plant bugs to test the test; "what would make this record wrong" in every decision | readiness records, decision records |
| Open criticism | Objections travel with decisions; "noted" is not an answer | `## Objections` in every record |
| The literature | The disk is the memory: decisions, handoffs, the progress log | company/decisions/, company/ops/progress.md |
| Replication and error correction | COEs fix mechanisms, not people; retros check whether the last changes worked | company/rituals/records/ |
| Independence of observers | Separate roles and contexts today; separate models next (section 2, item 3) | this brief |

The test for any new mechanism, role or generated company: does it make errors easier to find and cheaper to correct, without relying on anyone being right?

## 2. The mission (what the VP owns)
Deliver the value proposition (section 0): build the capability to **generate and run a whole company of agents (and humans) for a stated use case**, then prove it on companies harder than this one. App builders generate an app; System 3 Meta generates the organisation that builds, checks, ships and runs it.

What success looks like, in order:
1. **A second company that is not lessons.** Higher risk: real infrastructure, real users or customers, real money or real consequences, where "done" is judged outside the company.
2. **Someone else runs one.** The founder has a few people who want to build their own. The VP turns this company's ad-hoc setup into something they can start without the founder or this chief of staff in the loop.
3. **Model and vendor choice.** Roles are not tied to Claude: each role declares what it needs (reasoning depth, tools, cost, independence from the builder), and the company can bind it to different models or providers. Independent checkers on a different model than builders is the first use (correlated errors are this company's biggest structural weakness).
4. **Humans and tools are first-class members.** A role can be held by a person (with an inbox, a queue and an SLA), by an agent, or by a tool/service; the org treats them the same way: brief in, record out, checked by someone else.

## 3. Why this company is the evidence base (read it as a case study, not a template)
System 3 Company makes 60-second lessons. That domain was chosen because lessons are **independent units that still need collective work to scale**: a shared kit, gates, review and a publishing pipeline. It worked as a first test bed; it is also the easy case. What the VP inherits:

**Mechanisms that earned their place** (keep them; each has a record):
- *The disk is the memory.* Agents remember nothing; roles, briefs, decisions, the board and dated handoffs (progress.md) carry context. Off-boarding summaries are what make "same model, different rules" work.
- *Mechanisms over intentions* (Amazon). The COE for the r7 deploy (company/rituals/records/2026-10-15-coe.md) traced a deploy that went out before approval to a trigger design, not to the agent.
- *Independence of checking.* Builders never verify their own claims; evaluators see the artifact before the builder's account; reviewers plant their own bugs (company/engineering/readiness/2026-10-15-lifehacks-study-tp3-tp4-tp5.md). Falsification over confirmation is the book's philosophy of science made operational.
- *Single-threaded owners and a POC per lane* (company/ceo-office/poc-map.md): one manager decides each lane's work; the coordinator integrates.
- *Objections travel with decisions;* "noted" is not a status.
- *Founder gates on irreversible acts:* deploys, new roles/orgs/floors, public statements, spend.
- *Budget per project with kill criteria* (Project Review 1, company/rituals/records/2026-10-16-project-review.md).

**Where it is thinner than the org chart** (do better):
- One model in many roles: correlated errors; independence of context is real, independence of mind is not.
- The coordinator was the hub for every dispatch and every single-writer file; it chose specialists' work until the founder's rule (company/decisions/2026-10-16-founder-org-and-dispatch-rule.md). Managers still cannot start their own agents (F-30).
- Shared host, shared working tree, shared git index: agents swept each other's staged files into commits twice, killed their own shells with process patterns, broke a review server by rebuilding under it, and one replaced /dev/null (2026-10-16). Isolation must be designed in, not left to briefs.
- No real users yet: every "learning" signal is simulated. A generated company needs an **external** measure of success from day one.
- The event log stopped recording dispatches; metrics went quietly wrong. Instrumentation is part of the product.
- Rituals and records were often written by the coordinator "as" the role; quorum at Project Review 1 was not real.

The full account: the delegation retro (company/rituals/records/2026-10-16-retro-delegation.md, Leonie), the WBRs and retros in company/rituals/records/, and the System 3 Press's case-study record if the founder accepts it (hanialshater/system3, press/decisions/2026-10-16-vp-books-company-case-study.md).

## 4. Constraints the VP starts with
- **Starts after First Light** (launch 2026-11-30 or its stop rule). Until then nothing is designed, staffed or built; this brief is the only artifact.
- **Runs independently, as a sibling company** (like the Press): own repository, own VP, own budget proposed at a Project Review; reports to the founder; does not add to the founder's span without a design that says how.
- **Org rule applies:** every new role, agent, org, floor and room is designed with Leonie and approved by the founder.
- **Deploy and spend rules apply:** the founder approves every production deploy and every purchase.
- **Shared resources are declared:** this host's agent caps (8 agents, 3 builders) are shared with this company and the Press today; the design must say whether System 3 Meta gets its own host or its own caps.

## 5. Open questions for the design (Leonie, then the founder)
1. **The first use case.** Candidates by risk: an internal tool with real infra (lower); a small product with real users (medium); a service with money or safety consequences (higher). The founder's people who want to build their own may supply it.
2. **The model abstraction.** Where does the binding live (role file frontmatter, a router, a provider SDK)? Which roles move to a different model first (checkers)? What is the cost and quality measurement?
3. **Humans in the loop.** How a human role receives briefs and returns records; SLAs; what happens when a human is late (the moderator question in First Light is a live example, F-26).
4. **Tools as members.** CI, observability, ticketing, payments: which are roles with owners, and which are plumbing.
5. **Multi-tenancy.** What is the product another person starts: a template repo, a CLI (`company init`), a hosted service? What stays the founder's (gates) and what becomes the tenant's?
6. **Isolation.** One worktree or container per agent; a slot ledger instead of an honour-system cap; per-agent git identity.
7. **External success measures** for the first generated company, fixed before it starts.
8. **Name and home.** "System 3 Meta" is the working title; repository and HQ floor placement.

## 6. Onboarding reading list (in this order)
1. This brief.
2. company/decisions/2026-10-16-founder-system3-meta-sibling.md (the decision and its objections).
3. The System 3 book's chapters on fallible agents (hanialshater/system3, chapters/), and the Press's case-study record.
4. CLAUDE.md and company/ops/operating-loop.md (how this company runs).
5. company/ceo-office/poc-map.md, dispatch-requests.md, org-change-process.md (how the org decides).
6. company/rituals/records/2026-10-15-coe.md and 2026-10-16-retro-delegation.md (what failed and why).
7. company/rituals/records/2026-10-16-project-review.md and company/ops/token-budget.md (how work is funded and killed).
8. tools/org/ (the org as data: how roles and agents are generated).

## Objections
| Objection | Raised by | Status |
|---|---|---|
| A third company adds to the founder's span and to this host's caps. | chief-of-staff-ceo-office (POC map) | Open, for the design (section 4). |
| "Generate a company" is a strong claim on thin evidence (one company, one model, no real users). | chief-of-staff | Open: the first use case carries an external success measure (section 5, item 7). |
| Decoupling from one model may cost quality before it buys independence. | chief-of-staff | Open: measure checker independence on a different model against same-model checking before moving builders. |
