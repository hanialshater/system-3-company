# System 3 Meta: the persistent knowledge base

owner: vp-meta · since 2026-10-24 (founder: "add the persistent knowledge base", "i thought we have agents off boarding")

What agents learned in benchmark runs, kept across runs so the next organisation does not start from nothing.

- **Written at off-boarding:** when a run ends, every session (the single agent and each org member) gets one last
  turn to record what it would bet on: practices that paid, findings, dead ends, pitfalls, each with **evidence** and a
  **belief** (0-1). They go to `entries.jsonl` (one JSON object per line: run, arm, by, model, topic, kind, text,
  evidence, belief).
- **Read at on-boarding:** the next run's members get `KB.md` (built by `node build.mjs`) at the start. It informs;
  it does not instruct: each member decides what to use (PRINCIPLES.md principle 1).
- **Beliefs change with results** (K38's idea): an entry a later run confirms or refutes is appended again with the
  new belief and the new evidence, never edited in place, so the record of how a belief moved stays ("Let knowledge
  accumulate. Let it be overthrown.").
- Entries are claims, not rules: "A feather is not a reason". An entry without evidence is not kept.
