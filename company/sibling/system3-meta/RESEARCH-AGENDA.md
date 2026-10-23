# System 3 Meta: research agenda

owner: vp-meta, for the founder · date: 2026-10-23 · status: proposal (no kernel changes follow from it until the founder decides)
evidence: [research-multiagent-2026-10-23.md](research-multiagent-2026-10-23.md) (literature) · prototype/BENCH4.md, BENCH5.md, bench6/BENCH6.md, M4-RUN.md, M6-RUN.md, M7-STATUS.md, bench8/ (our runs)

## Why this exists

We set out to show that a company of AI agents is better than one agent. So far our benchmarks measured one thing: **solving a bounded, well-specified task**. Measured that way, a single strong agent keeps winning. That does not settle the question.

Human organisations do not exist mainly to finish one task faster. They exist to:
- **run work continuously**, with standard procedures, reviews, budgets and accountability;
- **accumulate knowledge** that outlives any one person;
- **let strangers trust each other's work.**

Science is the clearest example of a multi-agent system that succeeds. Its advantages (fields, competing groups, replication, peer review, credit, paradigms) are not "parallel workers plus a test suite". This agenda separates what we know from what is open, and says how we would find out. We are early, and the frontier is open.

## What we know (and how sure we are)

| Finding | Evidence | Confidence |
|---|---|---|
| **K1. Bounded build tasks: one strong agent wins.** On a well-specified build task that fits in one context, with a test suite, one strong agent beats our org on cost and time at the same accuracy. | Ours: B5 spreadsheet (vanilla at 12% of the cost and 40% of the time); B6 lessons (vanilla $7 vs $17, accepted 3/3 vs 2/3 blind); B8 C compiler (vanilla 99.6% hidden tests through W5 for $41; the specialized org about 2x cost per wave, stopped at W3). Literature: Brooks; QSM team-size data; Cognition. | High for this task class; one model family |
| **K2. Overhead comes from structure, not from model ability.** Our org's losses came from cold starts, handoffs, a slow blocking evaluator, and work that did not spread across owners (each C wave fell mostly on one module). | Ours: B6 and B8 logs. Literature: MAST failure taxonomy; Google/DeepMind scaling study (multi-agent error amplification). | High |
| **K3. Search against a strict verifier rewards populations.** Many cheap, diverse attempts plus an automatic judge find what single attempts miss. Diversity, not roles, is the ingredient. | AlphaEvolve, FunSearch, AlphaProof, Lean-checked Erdős results; "More agents is all you need". | High in the literature; untested by us |
| **K4. Breadth beyond one context rewards swarms coordinated through tests.** This holds only while the work keeps decomposing. | Anthropic's parallel-Claude C compiler: 16 agents, about $20k; gains collapsed when all agents hit one kernel bug, and returned once a GCC oracle plus delta debugging split it. | Medium (one public case) |
| **K5. Independence can be had cheaply, but not guaranteed.** One vanilla agent launched its own checker subagents (B6). What an org adds is enforcement: verdicts stamped by code, a builder that cannot brief its own checker, budgets and a record. | Ours: B6. | Medium |
| **K6. Governance in code works.** Budget stops, asks to the founder, top-ups and charged spend matched the launcher ledger exactly. Protected paths and deploys were never breached across M4-M7. | Ours: M4-M7 records. | High (mechanism); unknown (value to a business) |

What we do **not** know is everything about **running** rather than solving.

## Open questions

### Q1. Running, not solving
Can an agent organisation operate over weeks without drifting? That means keeping its standard procedures, budgets and reviews, holding its rituals, and staying on course through restarts, staff turnover (sessions lost) and changing priorities. How does it compare with one long-running agent doing the same job?

*Hypothesis H1.* Over a long horizon with mixed work, a single agent degrades: context compaction loses decisions, procedures are skipped, and spend drifts. An org whose memory is on disk, with rituals and audits, stays more consistent. The org pays more per task and less per month in errors and rework.

### Q2. Organisations as knowledge institutions
Does accumulated institutional knowledge make an org better over time than a fresh strong agent each time? The knowledge here is per-domain playbooks, failure taxonomies, decision records and a pattern library.

*Hypothesis H2.* The benefit appears only where work recurs, is steady and has domain-specific failure modes (Adam Smith's "extent of the market"). On novel one-off tasks it does not.

### Q3. Diversity and competition
Science benefits from competing groups pursuing different hypotheses, and AlphaEvolve from diverse lineages. When does an org's diversity (different roles, contexts, even models) beat one agent's single line of attack?

*Hypothesis H3.* On open-ended problems with a computable score, a population beats one agent at equal compute, because one agent anchors on its first approach. On problems with a clear single path, it loses.

### Q4. Governance and accountability as the product
A business needs to know who decided what, on what evidence, within what authority. It needs to know that money and risk stayed inside limits, and that mistakes can be traced and corrected. A single agent can be fast and still fail to give that.

*Hypothesis H4.* For decisions that are risky, regulated or hard to reverse, an org with code-enforced governance earns its overhead through fewer incidents and cheaper audits, even when a lone agent is quicker.

### Q5. Working with humans
Where should people sit in a hybrid company: founder, approver, reviewer, domain expert, customer? What do they need to see? How much do they need to check before they can trust the work? How do authority and knowledge move between people and agents?

Human organisations evolved standard procedures, reviews and roles partly so that strangers could trust each other's work. Agent orgs may need the same structures for people to trust them, independent of raw efficiency.

*Hypothesis H5.* An org with legible procedures and a decision record needs **less** of a person's time to supervise safely than a single agent, even though it costs more in tokens. The measure that matters is minutes of founder attention per unit of trusted output.

### Q6. Economics of organising
At what scale, horizon, risk level and rate of change does organising pay for itself? For people, Brooks, Coase and Williamson gave partial answers. For agents, cold starts and coordination tokens are the transaction costs, and they are measurable.

*Hypothesis H6.* A simple model predicts when to organise: work size against one context, decomposability, how often work recurs, risk, and horizon. The kernel could use that model to decide when to stay one agent and when to staff up.

## How we will find out

### Rules for every experiment (kept from B4-B8)
- **Predictions first.** Predictions, with "wrong if" lines, are committed before any run.
- **Fair baselines.** Always include one strong agent with the **same token budget** (it may retry, restart or launch subagents), not only a weaker baseline. Same model, tools, information and caps. Isolation is identical for every arm, and any deviation is recorded.
- **Blind scoring.** Artifacts are judged before accounts. Hidden checks report categories only. Every serious defect is reproduced by a second agent.
- **Honest records.** Operator interventions, restarts and spend are reported per arm. A loss is written up as a loss.
- **Small claims.** A result covers the task class it ran on and nothing more.

### Experiments (proposed; none started)

| # | Experiment | Tests | Arms | Measures |
|---|---|---|---|---|
| E1 | **The month in a week.** A simulated company runs over a multi-day horizon: a stream of mixed orders (build, review, decide), budget limits, a requirement change, two incidents, audits at random points, sessions killed at random to simulate turnover, and a founder answering only through the queue. | H1, H4, H5 | one long-running agent with the same budget; the company org; the org with a person in the founder seat | outcomes delivered and accepted; procedure and budget compliance; decisions traceable to a record; incident recovery time; drift (quality in week 1 against the last day); founder minutes |
| E2 | **The returning customer.** The same kind of work recurs over many episodes, with domain-specific traps (B7's text games or B8's waves in new guises), and with no knowledge carried between episodes except what the arm writes to disk. | H2 | a fresh vanilla agent each episode; vanilla with a notes file; the org with scoped playbooks | first-hand-in pass rate per episode (the learning curve); rules or notes that transferred; cost per episode |
| E3 | **Population against one.** An open optimization with an uncapped score: B8 W6 compiler runtime, a scheduling or packing heuristic. | H3 | one strong agent with budget X; a population of cheap variants plus a judge at the same budget | best score; score against tokens; diversity of solutions |
| E4 | **Too big for one head.** Breadth beyond one context: compile Lua, then SQLite, with a fan-out phase (B8 W7 is the first step). | K4, H6 | vanilla; the org | correctness; runtime and compile time; cost; whether gains appear only once failures decompose |
| E5 | **Trust.** People review the outputs of each arm from E1 without knowing which arm made them. They rate trust and say what they needed to check. | H5 | E1's arms | reviewer minutes; errors caught or missed; trust rating; what they asked to see |
| E6 | **When to organise.** Fit a small model on E1-E4 (task size against context, decomposability, recurrence, risk, horizon) and predict the winning arm on held-out tasks. | H6 | all | prediction accuracy |

**Order of work.** First finish B8 (W6, then W7 when the founder decides). Then E3 (cheap, uses W6), E2, E1 with E5, E4, and E6 last.

## What this means for System 3 Meta (for discussion, not decided)
- **Two jobs, two defaults.** Meta's value may lie less in beating one agent on a sprint and more in running work: continuity, governance, memory and trust. The kernel might keep both modes, one strong agent for bounded tasks and the org for running work, and learn when to switch (H6).
- **Keep the governance core regardless.** Budgets, the founder queue, guards, independent checks stamped by code, and the record (K6) are what a business needs from any of these arrangements.
- **Treat people as first-class members.** The founder queue is the start. E5 asks what a person needs in order to trust the company with less of their time.

## Non-goals
- Claiming multi-agent superiority from one task class, in either direction.
- Benchmarks that reward spend: every comparison controls tokens.
- Changing the kernel because of this document. Changes follow experiments and founder decisions.
