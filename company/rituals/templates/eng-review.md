# Engineering Review: {{date}}: <change>

owner: principal-engineer · tier: 2 · attendees: author, one affected role (e.g. qa-tester for kit changes)

- EDD: link · ADR (if any): link · Amendment (if protected): link
- [ ] The problem is real and measured
- [ ] At least two options were considered, including doing nothing
- [ ] Blast radius: which lessons, pages or roles change
- [ ] Readiness record approved by principal-engineer-ops (company/engineering/readiness/), linking the EDD's "Operational readiness" section. principal-engineer-ops attends for deploy, event-API, auth and data changes
- [ ] Rollback is one revert (read from the EDD's readiness section; do not re-ask)
- [ ] `npm run verify` passed on the integrated tree (paste the summary)
- [ ] Measurements committed before implementation, and checked after
- [ ] Security, privacy and licenses (if dependencies or events change; read from the same section)

## Findings (problems, not fixes)
## Decision
approve / approve with changes / reject. Objections that travel with it:

## Kudos (optional)
Thanks that were earned, one line each: `- @<role or agent label>: what they did and why it mattered`. Run `node tools/kudos.mjs harvest` after writing this, or use `kudos.mjs add`. Never to yourself, never for volume.
