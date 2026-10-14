```yaml
id: a-control-outside-the-pipeline-is-advisory
confidence: ""     # new 2026-10-14, unstarred. Effectively one situation seen through two COEs; the deploy author says one instance does not make a pattern.
context: A control (a filter, a rule, a setting) placed beside the path that ships, not in it.
problem: The path runs without the control, and no company tool can see that it did. Vercel Git builds shipped four releases with ci queued; the approval rule and [deploy] filter sat outside the pipeline too.
therefore:
  - Put the control in the path (deploy.yml after green ci, a Deployment Check), or turn the other path off in a repo file that check can read.
  - Ask for each new control: if this were off, what would show it? If nothing, it is advisory.
  - Do not let a cost control stand in for a quality gate (gate-expensive-actions).
would_be_wrong_if: A control outside the pipeline is observed to stop an unjudged release at least once under pressure, with no mechanism inside the path.
documented_cases:
  - "Vercel Git integration as a second production entry point (company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md, path A)."
  - "CI side: deploy.yml waited on a ci success that never arrived in time, so the sanctioned path was the dead one and the bypass was the working one (company/rituals/records/2026-10-14-coe-ci-queue.md, 'What allowed it')."
known_failure:
  - "Same incident seen twice, not two cases."
part_of: decision-records
```
