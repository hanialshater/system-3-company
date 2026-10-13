# Incident response

owner: principal-engineer-ops

An **incident** is anything that hurts learners or stops the company shipping, beyond a normal bug.

| Severity | Meaning | Examples (real ones from 2026-10-13 marked ✱) |
|---|---|---|
| **SEV1** | Learners see wrong or harmful content, D1 data exposed, or production down | A published lesson with a false claim; a published lesson that should have been held ✱ |
| **SEV2** | The company can't ship, or a gate was bypassed | All agents stopped by usage limits ✱; a stale build made QA record false fails ✱; a merge silently failed and its hold was lifted anyway ✱ |
| **SEV3** | Degraded, with a workaround | A tool crash with a manual fallback |

## Steps
1. **Declare:** `node tools/events.mjs add --type=incident --room=incident --actor=<role> --summary="SEV<n>: <what>"`. Whoever sees it declares it; when unsure, declare a SEV2.
2. **Command:** the principal engineer for operations is incident commander unless the incident is in their own area, in which case the principal engineer is.
3. **Contain first:** unpublish, hold, roll back, or stop the agents. Containment needs no review.
4. **Tell:** a SEV1 goes into the founder inbox immediately. A SEV2 goes in the next founder digest.
5. **Post-mortem:** a SEV1 or SEV2 needs a COE (`/coe`) within the next operating-loop turn after containment, written by an engineer outside the affected area. Each action has an owner and a board item at P1 or P2.
6. **Close:** at the ops review, once the COE's actions are done or explicitly dropped.
