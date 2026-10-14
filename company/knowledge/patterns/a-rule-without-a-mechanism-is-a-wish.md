```yaml
id: a-rule-without-a-mechanism-is-a-wish
confidence: ""     # new 2026-10-14, unstarred. Four cases, all one day, all found by the same set of COEs.
context: A rule written in prose (a loop doc, a brief, CLAUDE.md, a runbook) that is meant to stop an action by agents who work fast and under founder pressure.
problem: The rule is obeyed only while the operator remembers it and nothing makes breaking it hard. It then reads as a control in review records and decisions, so the real gap is hidden.
therefore:
  - For each rule, write the mechanism beside it: the file, tool or setting that refuses, and what its exit code is.
  - If no mechanism exists, label the rule "wish" in its record, and file the mechanism as a board item with an owner before the rule is cited as a control.
  - Do not answer an objection with the rule. Answer it with the mechanism or say there is none.
  - Prefer a mechanism that is visible to check (a repo file, not a dashboard setting).
would_be_wrong_if: Rules with no mechanism are followed as reliably as rules with one across a comparable load day, so the mechanism adds nothing.
documented_cases:
  - "Caps: 8 agents / 3 builders in operating-loop.md and 'builders in worktrees' in briefs were prose; 18 builders ran and 27 of 99 briefs omitted 'worktree' (company/rituals/records/2026-10-14-coe-host-exhaustion.md, why 3 and 4)."
  - "Founder-approval rule for deploys: a sentence in CLAUDE.md, written after five deploys, enforced by nothing; any agent can type [deploy] (company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md, path A why 5)."
  - "Runbook said 'if Git integration is also enabled, choose': a conditional, not a check; no record shows the choice (same COE, path A why 2)."
  - "Isolation as the answer to the usage-upgrade decision's only objection was a word in a brief, and was false the same afternoon (host COE, claims section)."
  - "Counter-case, weak: dispatch-check C1 to C4 and R2 (99573b8) turned the caps into exit codes; not yet evidence, it had run for under a day at writing."
known_failure:
  - "Not yet tested: no rule here has been given a mechanism and then watched through a load day."
  - "Risk of over-reach: some rules (kudos, tone, 'say when a seed was chosen') cannot have a mechanism cheaply. The pattern should not be used to demand one for every sentence; scope it to rules that guard a shared resource or a release."
part_of: operating-loop
```
