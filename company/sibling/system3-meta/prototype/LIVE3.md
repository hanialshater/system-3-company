# Meta prototype: live run 3, the supervisor as code (predictions committed before the run)

owner: chief-of-staff, for System 3 Meta · date: 2026-10-21 · founder: "Yes go ahead" (on: a supervisor written as a plain script that wakes on change)

## Setup

- **`supervisor.mjs watch` does every step a rule can decide:** test1, UAT from hidden tests, ship, lease recovery, promotion. It wakes on a change to the state file or on its next timer, and exits only when its launch plan asks for an agent session. That exit is what wakes the orchestrator, who starts exactly the sessions the plan names and then restarts the watcher.
- **Agents:**
  - one `toy-builder-1` session draining 4 builds (cap 4);
  - checker sessions as the plan asks;
  - builder sessions for any revisions.
- **Checker briefs ask for the class of a defect,** not one instance (live run 2's lesson).
- **Work:** 4 small modules, T11 Luhn check, T12 run-length encoding, T13 byte formatting, T14 ISO week number, with hidden acceptance tests outside the repository.
- **State file:** `live/state-run3.json`.

## Committed predictions

| # | Prediction | would_be_wrong_if |
|---|---|---|
| S1 | The supervisor costs 0 model tokens: every test1, UAT and ship step is done by `supervisor.mjs` | any supervisor step needs an agent |
| S2 | Tokens per shipped order ≤ 75k (run 2: 110.5k) | > 95k |
| S3 | Median flow efficiency ≥ 30% (run 2: 12%) | < 20% |
| S4 | A code step runs within 5 s of the message it acts on (median) | median > 30 s |
| S5 | Revise loops per order ≤ 0.5, with class-level findings | > 1.0 |
| S6 | The orchestrator starts only the sessions the plan names, and the plan never names a session for a role that already has one running (except `now`) | any extra or duplicate session |
