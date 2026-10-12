# Decision records

One file per decision: `<YYYY-MM-DD>-<slug>.md`. A decision record keeps a decision attached to
its reasons, so that someone who was not in the room can tell when a line has stopped being true.

```markdown
# <Decision title>
owner: <role>          # who signs for proceeding
date: YYYY-MM-DD
status: decided | superseded by <file> | revisit on <date or condition>

## Context
## Options considered
## Decision
## Rests on              # claims, experiments, patterns (link them, so a correction has somewhere to go)
## Revisit if            # the observation that should reopen this
## Objections
| Objection | Raised by | Kind (evidence/purpose) | Status (accepted / rejected because… / open, funded by… / superseded) |
```

`npm run check` fails a record with no `owner:` line or no `## Objections` section. Write
"none raised" if there were none; do not leave the section out.
