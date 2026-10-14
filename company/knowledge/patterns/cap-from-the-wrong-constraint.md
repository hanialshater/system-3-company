```yaml
id: cap-from-the-wrong-constraint
confidence: ""     # new 2026-10-14, unstarred. Two clean cases and one partial, same day.
context: A numeric cap on concurrency or cost (agents in flight, builders, QA per push) chosen to fit one limit while another limit is the one that binds.
problem: The number is correct for the constraint it was derived from, so it passes review, and the binding constraint is never measured. Two caps on record let the reader pick the comfortable one.
therefore:
  - Write down which constraint the cap was derived from, and list the other constraints it was not checked against (tokens, CPU, disk, runner concurrency, daily quota).
  - Set the cap to the minimum across constraints, and keep one cap on record; supersede the others explicitly.
  - Measure the binding constraint before raising the cap (load, free GB, runner-minutes per push), and re-measure when the catalogue or the headcount grows.
  - Tie a falsifier to the constraint that binds, and reopen the decision when it fires.
would_be_wrong_if: A cap derived from a single constraint, with no check against the others, holds under a load day with no incident, repeatedly.
documented_cases:
  - "Agents 30/10 from the token plan against a 4-CPU host: 18 builders, load 25 to 60; the record's own falsifier fired the same day and was not reopened; a second cap 8/3 sat in the loop doc (company/rituals/records/2026-10-14-coe-host-exhaustion.md, why 2, 'What allowed it')."
  - "CI cost per push sized when the catalogue was small: 945 lessons x 2 projects, about 50 min of one runner, on every push, against about 20 concurrent runners (company/rituals/records/2026-10-14-coe-ci-queue.md, why 4). The workload scaled; the budget never did."
  - "Partial: AMD-002 capped verify per ref, but runners are the shared limit, and refs and pull_request events are separate groups (same COE, why 3). The cap was on the wrong unit."
known_failure:
  - "Two of three cases are from one COE author set that read each other's drafts; independence is weak."
  - "The host cap 8/3 is also a paper number until measured: dispatch-check adds load and disk checks, but W-531 has not set targets from a measured run."
part_of: operating-loop
```
