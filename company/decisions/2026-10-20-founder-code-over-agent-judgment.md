# Founder decision: EXP-009 approved; prefer code tools over agent judgment

owner: founder (recorded by chief-of-staff)
date: 2026-10-20
class: process (how the company and Meta build mechanisms) · budget (EXP-009)
route: founder → chief-of-staff (records, dispatches tools-lead for W-2026) → portfolio-manager (registers the meta-phase0 line, W-2028) → principal-engineer and tools-lead (code-first inventory, W-2029)

Founder verbatim (2026-10-20, this session), after EXP-009 was registered: "Look you have my approval, but I want to move into using tools with code instead of just agent thinking as much as possible, it is more predictable, imagine updating personal memory for example".

## Decided
1. **EXP-009 approved,** with its 200k-token budget under `[project:meta-phase0]`. This record is the approval that company/ops/projects.json asks for. W-2026 goes to tools-lead now.
2. **Code first.** Any step whose result follows from data on disk (counts, matching, joins, coverage, dates, what a run touched) is a deterministic script with tests, not a step an agent performs by reading and reasoning. Agents write and review that code, and keep only the steps that need judgment. Where judgment is needed, the agent writes it into a fixed schema that code validates.
3. **Memory is the first named example.** `tools/memory.mjs` already stores, validates and compacts entries in code. An agent still has to remember to call it and has to type the `did:` lines. The proposal to inventory (W-2029): generate `did:` from the run's commits and events, write the entry from the hook at run end, and leave only `learned:` and `mistake:` to the agent.

## What would make this wrong
- Scripts that encode a wrong rule repeat it everywhere, consistently. Mitigation: each script has fixture tests, and its output is accepted by a role other than its author (EXP-009: analytics-steward).
- Code-first can move judgment into code without saying so (for example a matching window). Such choices are named parameters, written in the record that uses them.

## Objections
- Writing and maintaining scripts costs engineering time that a one-off agent pass would not. Answer: code first applies to repeated steps. A one-off question can stay an agent task, and the inventory (W-2029) ranks candidates by how often they run.
- Hooks do not fire in some containers (W-1280), so "the hook writes the memory entry" is not yet reliable. Answer: the inventory must say which trigger each tool depends on, and whether it actually fires here, with evidence.
