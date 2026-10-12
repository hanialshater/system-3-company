# Offboarding: {{date}}: <role or worker>

Used when a role is retired or merged, a human leaves, or a long-running agent lineage ends.
Sessions end every day; that is covered by the handoff in `ops/progress.md`. This is for
ownership that would otherwise leave with the worker.

- [ ] List everything this role owns: files, domains, rituals, board items, open objections, experiments
- [ ] Assign a new owner for each (board items moved; `owner:` lines updated in decisions and experiments)
- [ ] Tacit knowledge written down as patterns (with context and cases), not as "ask X"
- [ ] Open disputes and unverified claims they added are listed for their successor
- [ ] If retiring the role: remove it from `tools/org/roles.mjs`, run `node tools/org/generate.mjs`, record a decision with objections
- [ ] Final handoff entry in `ops/progress.md`
