# System 3 Meta company vision and experiment roadmap

Status: discussion draft · Date: 2026-10-19

System 3 Meta should turn a goal into a small, accountable organization of humans, agents, and tools that can build, evaluate, operate, and improve a product. Its central promise is reliable collective work despite fallible members: explicit claims, independent checks, open criticism, durable memory, and correction through mechanisms.

The lesson company is the first evidence base. It demonstrates useful organizational mechanisms, but also shows the cost of coordinating many narrow roles through a single operator. The next step is to test a lighter runtime with durable execution, delegated authority, complete measurement, and agents that study and qualify before unfamiliar work.

This is a discussion draft for the founder and the people designing Meta. The operating model and experiments below are proposed. They do not create roles, grant authority, approve budgets, or authorize deployments.

# The purpose of Meta

An app builder helps someone produce an application. Meta aims to help someone establish the organization that builds, checks, ships, and maintains an outcome over time. That organization may include human managers, model-based specialists, automated checks, external services, and independent reviewers.

The scientific method supplies the institutional foundation. A member makes a claim, exposes evidence, accepts criticism, and changes its position when the evidence warrants it. Management supplies direction and resource allocation: which problems matter, who owns them, how much to spend, and when to stop.

Hierarchy has a practical reason here. Agents have bounded context and attention. A specialist needs enough context to do a task; a manager needs a compressed understanding of the unit’s goals, dependencies, and strategy. Every worker should not reconstruct the whole company.

The product must eventually work for someone other than its original founder, on a use case other than lessons. External users, observable service behavior, accepted deliverables, and independently measured outcomes must determine whether it works.

# What the existing company teaches us

The repository already contains roles and reporting lines, task briefs, mailboxes, dispatch checks, independent review rules, event records, personal memory, experiments, incident reviews, and an HQ interface. These are foundations to reuse, rather than specifications to copy unchanged.

There is concrete evidence of improvement. A shared layout change made lesson labels unreadable; review produced a legibility floor that exists in the implementation. Repeated process-kill and shared-checkout failures led to command guards that are wired into Claude Code settings. Mailbox handling gained exclusive reservations before launch. These changes show experience becoming executable mechanisms.

Other loops remain incomplete. Retrospectives recorded mistakes that recurred before their corrective actions were implemented. Historical reviews identify missing usage events, leaked execution slots, incomplete founder-message attribution, and learning experiments waiting on instruments. Role memories contain experience, but writing memory is weaker evidence than demonstrating that a later run retrieved it and avoided the mistake.

The working verdict is that the company has promising institutions and some effective safeguards. It has not yet established reliable, inexpensive autonomy across the organization.

# The pain points to solve

## Coordination consumes intelligence

The documented workflow routes a manager’s plan through the chief of staff, who launches specialists, receives reports, and starts another manager turn. This can consume several model activations for a small piece of work. The operator becomes a relay and a bottleneck.

Managers should spend attention on goals, strategy, exceptions, and tradeoffs. Routine message delivery, authorized dispatch, acknowledgements, and status aggregation should be code.

## The visible organization is not the running organization

A role definition does not imply a running process. A mailbox does not wake a recipient by itself. A meeting template does not convene participants. An HQ avatar may represent a resident role, a historical run, or stale state.

HQ currently derives presence from event history and permits naming collisions. Some unfinished or stopped runs remain visible indefinitely. The next runtime needs explicit identities for roles, sessions, activations, and tasks, plus evidence of actual execution.

## Measurements can look precise while being incomplete

Dispatch counts, token totals, and publication counts answer different questions. None alone measures useful work or learning. Missing coordinator usage, incomplete attribution, and differing denominators can invalidate comparisons.

Unknown telemetry must remain unknown. A manager should not receive a reassuring green status because the data stopped arriving.

## Memory can preserve errors as well as lessons

Full histories are expensive. Short summaries can discard constraints. Role memory can carry stale beliefs, and evaluator memory can reveal a prior verdict before an independent review.

Memory needs provenance, scope, retrieval boundaries, and tests of actual usefulness. More stored text is not automatically more learning.

## Organizational growth can outrun its purpose

A difficult task can tempt the system to create another specialist, manager, and meeting. Sometimes the real need is a better brief, a tool, temporary research, or clearer ownership. New structure should follow evidence of recurring work.

# The proposed operating model

Give each agent a persistent identity and recoverable state, while allowing the execution process to sleep or restart. An activation is a bounded period of work triggered by a message, result, deadline, or explicit request. Waiting should not require model polling.

A lightweight supervisor watches durable queues, checks authority and budgets, starts or resumes supported runtimes, and records results. The supervisor does not need to be an LLM for routine transitions. Agents make judgments; the supervisor executes authorized transitions.

A typical cycle is:

1. The founder supplies a goal or direction.
2. The owning manager receives it and defines a bounded plan.
3. Approved specialist tasks enter a durable queue.
4. The supervisor launches workers within resource limits.
5. Workers return artifacts and structured reports.
6. Independent checks establish acceptance.
7. The manager resumes at a review point or exception.
8. The parent receives outcomes, uncertainty, costs, and decisions requiring attention.

Routine reports should be collected until the batch review point. Blockers and urgent incidents can wake the manager immediately. Management stays available without repeatedly consuming context for events that need no decision.

The first implementation should use one supported runtime. Claude Code and OpenCode adapters can later share a common contract for start, resume, cancel, structured result capture, and usage. Exact support must be validated against installed versions and authentication arrangements.

# Goals and scalable oversight

A delegated goal is an agreement about an outcome and the authority to pursue it. It should name the owner, independent acceptance conditions, budget, deadline or review point, permitted actions, forbidden actions, dependencies, and stop conditions.

For the editorial example, the goal might be clearer learner-facing wording. Acceptance requires independent confirmation that meaning was preserved. The budget includes planning, editing, review, retries, and integration. Changes to factual claims or publication status fall outside a wording-only assignment.

The parent chooses the outcome and boundaries. The manager chooses methods and allocates work within them. Specialists can surface missing assumptions and capability gaps without taking authority they were not given.

Managers need a short strategy-and-state page: goals, active bets, non-goals, dependencies, uncertainty, and recent changes. It carries an as-of date and evidence links. Workers read their unit’s relevant context and its parent’s direction, rather than raw company history.

## Levels of attention

| Level | Typical situation | Decision owner | Founder visibility |
|---|---|---|---|
| Automatic | Delivery, exclusive claims, routine checks, bounded retries | Runtime | Aggregated |
| Delegated | Reversible work inside an approved contract | Specialist or manager | Outcome summary |
| Manager attention | Quality deterioration, blocked dependencies, uncertainty, approaching limits | Owning manager | Escalate only if outside authority or unresolved |
| Founder decision | Goal changes, extra budget, new roles, reserved approvals, unresolved strategic tradeoffs | Founder | Ranked decision packet |
| Immediate interruption | Credible serious harm, security incident, unauthorized action, serious public error | Owner contains within granted authority | Immediate facts and required decision |

Urgency and authority are separate. A routine release may require founder approval without being an emergency. A crashed worker may require immediate local recovery without involving the founder.

Every escalation should state the decision, deadline, recommendation, evidence, uncertainty, strongest objection, alternatives, and behavior if no answer arrives. Silence never grants new authority.

# Meetings and shared whiteboards

A meeting is a bounded decision workflow with participants, inputs, a chair, a decision owner, rounds, a deadline, and a budget. It can run across separate persistent sessions through messages. The supervisor wakes participants and tracks completion.

For a Demo Crit, reviewers first inspect the artifact independently. Their findings remain private until submitted. The chair then collects findings, asks the builder targeted questions, allows responses to unresolved issues, and requests the designated owner’s decision. The record includes objections and follow-up tasks.

A shared whiteboard holds the current problem, constraints, proposals, diagrams, evidence, objections, and unresolved questions. Contributions have authors, stable IDs, and revision history. Concurrent edits require conflict handling; one participant must not silently overwrite another’s reasoning.

Start with structured text and diagrams. A visual canvas is useful when spatial relationships matter, but screen-based reading and coordinate editing add cost. Whiteboards should reduce repeated explanation, rather than become a second transcript.

Default to a small number of rounds. More discussion requires an explicit unresolved question. A meeting closes when its decision is recorded or when the owner declares the evidence insufficient.

# Agent preparation and machine studying

Preparation should be a first-class capability. Spinning up an agent should mean more than attaching a role prompt. For unfamiliar or consequential work, the manager should be able to equip it, give it relevant material, let it practise, and require evidence of competence.

| Stage | Activity | Persistent result |
|---|---|---|
| Select | Choose model and runtime for the task | Model binding and capability requirements |
| Equip | Supply authority, skills, tools, and references | Versioned role configuration |
| Study | Read literature, code, examples, and relevant experience | Source-linked knowledge map and uncertainties |
| Practise | Solve representative exercises in isolation | Results, feedback, and corrected mistakes |
| Qualify | Attempt unseen tasks with independent evaluation | Capability record with scope and limitations |
| Work | Execute within demonstrated scope | Accepted artifacts and outcome evidence |
| Update | Incorporate experience into memory, skills, or tools | Revised preparation package |

Study must be tested through application. A fluent summary does not establish competence. Useful exercises ask the agent to reproduce a result, select between methods, identify a planted flaw, apply an idea to a new case, or explain where it fails.

An R&D agent could survey a literature area, reproduce a reference implementation, identify baseline limitations, solve an unseen variant, and only then propose a new candidate. A deployment agent could rehearse rollback and recovery before receiving production responsibility.

Preparation is task-dependent. A small wording correction needs almost none. An unfamiliar migration may justify substantial rehearsal. Managers should purchase preparation from the goal budget and compare its cost with reduced errors and rework.

This is contextual preparation, not necessarily weight training. A prepared agent can retain a session checkpoint, study notes, reusable artifacts, and qualification evidence. Qualification attaches to a versioned model, instructions, tools, and task distribution. Significant changes require requalification. Passing one test grants neither permanent competence nor additional authority.

Fine-tuning becomes a later option when repeated, well-measured failures remain after better context, tools, and workflow design—and when suitable training examples exist.

# R&D and creating capabilities when scope is insufficient

A scope boundary should produce a routed request. Difficulty alone should not create a permanent department.

| Need | Response |
|---|---|
| Existing expertise with unclear ownership | Route to the current owner |
| Temporary knowledge gap | Bounded research assignment or temporary team |
| Recurring unmet responsibility | Evidence-backed permanent-role proposal |
| Missing external authority or qualified judgment | Route to an appropriate human or authorized service |

R&D receives a problem brief with the baseline, requirements, failed attempts, budget, and useful deliverables. It surveys sources and existing implementations, states competing hypotheses, builds candidate approaches, and evaluates them against independent criteria.

Bounded code evolution can generate and select candidate implementations, but its evaluator must be protected from candidate changes. Use held-out cases, correctness checks, resource limits, and scrutiny of benchmark exploitation. Research ends with adoption, another justified experiment, or the conclusion that the baseline remains preferable.

Temporary teams need sunset conditions. Permanent roles require recurring work and a clear ownership gap. In the current company, new roles and organizational changes continue through Leonie and founder approval.

# Memory retrieval and efficiency

Use four distinct layers: stable role instructions; compact task state; retrieved evidence and experience; and a full archive. Store goals, budgets, decisions, approvals, unresolved objections, and exact constraints in structured text. Preserve original artifacts for recovery.

Role memory records lessons, mistakes, standing context, and open threads. Task state records what is happening now. Shared knowledge holds reusable research, code, procedures, and validated patterns. Separating these reduces stale context and accidental overgeneralization.

Retrieval should begin with ownership, project, task type, status, date, and keyword filters. Return short excerpts with evidence links. Add semantic retrieval when measured failures show that simpler search misses relevant material.

Experience entries should state what was learned, the evidence, conditions where it applies, limitations, and future action. Observations should not automatically become accepted policy. Independent adoption and later results strengthen a pattern.

Evaluator retrieval needs special treatment. General craft can help, but task-specific prior verdicts should remain hidden until initial independent findings are written.

Provider prompt caches are temporary optimizations. Stable prefixes may benefit, but resuming a session does not guarantee a cache hit, and cache economics differ by provider and billing arrangement. Store durable state yourself.

Images are useful for diagrams, browser states, and contact sheets. Ordinary text should generally stay searchable and editable. Smaller image files do not automatically mean lower model cost.

Measure compression by total cost per accepted outcome, including retrieval and rework. Preserve exact approvals, quantities, boundaries, and source references before compressing narrative.

# Metrics and Bayesian management

The first management question is whether the evidence is trustworthy. Each metric needs a definition, denominator, time window, source, freshness, attribution coverage, and known blind spots. Missing data is not zero.

| Measure | What it helps decide |
|---|---|
| Independently accepted outcomes | Whether useful work is being delivered |
| First-review acceptance and defect severity | Whether briefs, execution, or review need improvement |
| Total cost per accepted outcome | Whether the organization is becoming more efficient |
| Queue age, blocked time, and completion time | Where the bottleneck lies |
| Repeated incidents after corrective actions | Whether the organization actually learned |
| Founder corrections and routing per accepted outcome | Whether delegation reduces avoidable founder work |
| Logging coverage and reconciliation | Whether the other numbers can support decisions |

Agent activity, meeting volume, and documentation are diagnostic inputs, not success measures. Organizational health should not be collapsed into one score.

Bayesian thinking means maintaining revisable beliefs and choosing evidence that distinguishes alternatives. A manager might believe that a more specific brief reduces major revisions. Before changing the process, record current evidence and uncertainty, an expected effect, competing explanations, the comparison design, and a stopping rule. After a comparable batch, update the belief and decide whether to retain the change.

Use probability forecasts and uncertainty intervals where meaningful. Validate calibration over repeated resolved predictions. Avoid false numerical precision when outcomes are subjective or evidence is sparse. Correlated tasks, shared templates, changing model versions, and different task mixes limit what comparisons can establish.

Every organizational change should connect a manager decision to identifiable work, complete costs, independent outcomes, and an updated belief. Corrective actions count as effective when they are active and their intended effect is observed, rather than when a record says they are done.

# The runtime and tools to build

Build a small common runtime, then expose role-specific tools. Authority checks must apply at execution time, rather than depend only on prompts.

| Capability | Core operations | First implementation |
|---|---|---|
| Organization and ownership | Look up roles, responsibilities, and capabilities | Machine-readable directory |
| Goals and authority | Delegate goals, inspect boundaries, request approval | Goal contracts and action-specific approval records |
| Durable execution | Queue, reserve, start, resume, cancel, recover | Supervisor plus one runtime adapter |
| Communication | Send, reply, acknowledge, thread | Existing mailbox mechanism extended with wake-up |
| Isolation | Create workspace, inspect changes, dispose resources | Isolated working copies and process ownership |
| Quality and integration | Run checks, request review, submit and accept changes | Independent acceptance plus protected evaluators |
| Budgets and usage | Reserve budget, reconcile usage, stop at limits | Complete accounting including coordination |
| State and knowledge | Checkpoint, restore, search, record experience | Existing memory tooling plus filtered retrieval |
| Preparation | Study assignment, practice, qualification, requalification | Versioned preparation package and unseen exercises |
| Oversight | Query tasks, messages, costs, health, and decisions | HQ backed by observed runtime state |
| Experiments and R&D | Register prediction, compare candidates, conclude | Evidence-linked experiment records |
| Meetings | Open, submit, advance rounds, close | Threaded workflow with deadlines and private review |

Every meaningful event should link the goal, task, role, session, activation, message or meeting, artifact, and usage where applicable. A session is an identity-bearing conversation; an activation is one wake-up; a task may span several activations. Keeping these separate prevents messages from being counted as new workers.

HQ should distinguish organizational seats from execution. Named managers have one organizational identity with their runs underneath. Parallel specialists have distinct identifiers. Presence should distinguish confirmed running, waiting, completed, stopped, and unknown or stale state.

Tools should return structured results, stable IDs, evidence references, and explicit errors. Retry safety, leases, acknowledgements, cancellation, and recovery are foundational.

# Organizational templates

Use one common operating system with domain-specific templates and company configuration.

| Template | Distinctive workflow | Oversight emphasis |
|---|---|---|
| Software engineering | Implement, test, review, release, operate | Correctness, isolation, controlled production changes, incidents |
| Innovation and R&D | Survey, hypothesize, reproduce, experiment, stop or adopt | Independent benchmarks, uncertainty, exploration budgets |
| Legal work | Identify jurisdiction and facts, research sources, draft, qualified review | Confidentiality, provenance, professional judgment, consequential external actions |
| Content and education | Source claims, build experience, review, test with users | Factual support, independent quality, actual learning outcomes |
| Hybrid operations | Route work between humans, agents, and services | Authority, handoff deadlines, acknowledgements, accountable ownership |

Instantiate the smallest useful organization for a goal. Templates should make responsibilities and checks explicit without creating idle layers by default. Domain-specific human qualifications and approval requirements remain substantive boundaries.

Humans and tools can hold responsibilities alongside agents, but their interfaces differ. A human needs an inbox, context, and a response deadline; a deterministic service needs a machine contract and an owner. Neither should be treated as infallible.

# Roadmap of experiments

Meta should test mechanisms before turning them into product features. Each experiment requires a baseline allowed to win, a committed prediction, a budget, independent acceptance, and a conclusion that changes a decision.

| Phase | Experiment | Comparison | Decision evidence |
|---|---|---|---|
| 0 | Measurement integrity | Runtime events against independent reconciliation | Complete identity, attribution, usage, and visible gaps |
| 1 | Durable multi-session execution | Existing operator dispatch versus supervisor-driven work | Quality, coordination cost, latency, and crash recovery |
| 2 | Delegated oversight | Frequent intervention versus bounded goal contracts | Founder workload, missed escalations, and authority compliance |
| 3 | Agent warm-up | Direct task versus reading-only versus study and practice | Preparation cost, first-pass acceptance, and later rework |
| 4 | Qualification validity | Practice performance versus unseen tests and real assignments | Whether qualification predicts reliable work |
| 5 | Memory and preparation reuse | Fresh preparation versus saved context versus selective retrieval | Transfer, repeated mistakes, retrieval relevance, and cost |
| 6 | Context efficiency | Full relevant context versus compression and artifact reuse | Exact constraint recall, usage, and rework |
| 7 | Meetings and whiteboards | Handoffs versus structured rounds, with and without a board | Decision quality, objections preserved, time, and cost |
| 8 | Independent checking | Same-model versus different-model review | Held-out defect detection, false alarms, and correlated misses |
| 9 | Manager belief updates | Current retrospectives versus explicit hypothesis tracking | Calibration, comparable batch results, and incident recurrence |
| 10 | Research and code evolution | Direct implementation versus bounded R&D | Held-out correctness, performance, benchmark resistance, and total cost |
| 11 | Adaptive organization | Fixed team versus temporary capability-based teams | Resolved scope gaps, duplication, and coordination cost |
| 12 | Another operator and use case | Generated company versus documented manual setup | External results and dependence on the original founder |
| 13 | Broader templates and model adaptation | Shared kernel across domains; later training where justified | Transfer, human handoffs, domain controls, and persistent capability gaps |

These are dependency gates, not a calendar promise. Preparation experiments require trustworthy measurement but can begin before all runtime features are complete. Higher-consequence domains follow evidence from bounded use cases.

Choose numerical thresholds after measuring the baseline and before inspecting treatment outcomes. Predefine which failures require a stop, especially duplicate consequential actions and authority violations. Small pilots provide feasibility evidence; they do not establish broad superiority.

# The first pilot

Use an existing bounded batch, such as a subset of editorial findings, to test the new execution loop. Keep a manager, two specialist sessions, and an independent reviewer. Use existing approved roles; do not create a department to run the pilot.

Approve one goal contract with the scope, complete budget, acceptance conditions, and escalation rules. The manager prepares a batch. The supervisor delivers tasks and reports. Workers use isolated workspaces. The reviewer checks meaning independently. The manager receives the result and closes or revises the batch.

Deliberately interrupt a worker and verify recovery. Deliver a duplicate notification and verify it does not duplicate the task. Exercise a boundary-crossing request and verify escalation. Confirm that an idle session generates no polling model calls.

Compare against a matched batch using the current workflow. Count all planning, coordination, study, implementation, review, retries, and integration costs. Record defects and founder intervention. Keep the baseline if the new system costs more without a compensating benefit.

Run the warm-up comparison on unfamiliar tasks where preparation could plausibly help. A familiar wording task may have too little difficulty to reveal its value.

The feasibility estimate discussed was one to two days for a narrow execution spike, roughly three to seven engineering days for a working pilot, and two to four weeks total for more dependable unattended operation. These are planning ranges contingent on runtime APIs, authentication, recovery behavior, and integration scope; they exclude the full roadmap.

# Ownership and founder decisions

Meta’s designated lead should own the roadmap and evidence synthesis. Engineering and tools capabilities implement the runtime. Evaluation and analytics provide independent acceptance and measurement. Unit managers own local hypotheses and outcomes. Leonie owns proposed organizational changes. Founder-reserved rights remain explicit.

The repository’s Meta decision describes a sibling company and says it was unparked for design, with organizational creation still requiring approval. The proposed work should therefore be routed through the current organizational process rather than assume every planned Meta role exists.

The founder decisions needed to start are:

1. Choose the first bounded use case and external acceptance measure.
2. Name the accountable owner within the approved organization.
3. Set the pilot budget and resource allocation.
4. Reserve the decisions that remain personal, including production actions and organizational changes.
5. Choose one runtime for the initial execution adapter.
6. Agree what evidence would justify expanding the pilot, changing it, or stopping it.

A persistent agent company is valuable if it delivers useful results with fewer repeated failures and less avoidable intervention. Meta’s job is to establish which mechanisms produce that result, preserve the evidence, and make those mechanisms usable by other people.

# Evidence and reference documents

The existing records provide the evidence base and governance context. Their dates and status matter; proposals and historical measurements should not be read as live runtime guarantees.

- [System 3 Meta founder brief](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/sibling/system3-meta/founder-brief.md): scientific-method foundation, hybrid membership, external outcomes, and known weaknesses.
- [Meta company decision and design update](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/decisions/2026-10-16-founder-system3-meta-sibling.md): sibling-company scope, design approval, and the later unpark-for-design update.
- [Light management decision](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/decisions/2026-10-17-founder-light-management.md): independent units, compressed strategy, lazy roles, and coordination-cost measures.
- [Mailbox runbook](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/ops/runbook-mailbox.md): reservation, dispatch, reports, and recovery.
- [Delegation retrospective](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/rituals/records/2026-10-16-retro-delegation.md): operational bottlenecks and corrective mechanisms.
- [Company metric definitions](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/ops/metrics.md) and [October 17 business review](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/rituals/records/2026-10-17-wbr.md): measures, missing telemetry, and competing explanations.
- [Role memory implementation](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/tools/memory.mjs) and [reviewer memory boundary proposal](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/decisions/2026-10-17-reviewer-memory-boundary.md): persistence, compaction, and contamination risks.
- [Layout review and follow-up](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md): measured correction of a shared implementation.
- [Claude hook configuration](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/.claude/settings.json): current repository wiring for process guards and agent events.
- [Experiment process](https://github.com/hanialshater/system-3-company/blob/ccr-4c6c7654-ew9ko1/company/experiments/README.md): predictions before results, baselines, falsification, and resulting changes.
