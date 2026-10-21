# Founder ask: M3 launcher on the Claude Agent SDK (the prototype's first npm dependency)

owner: vp-meta
date: 2026-10-21
status: decided
class: engineering
route: founder → vp-meta → chief-of-staff (builds)
recorded by: chief-of-staff

## Ask

Founder, 2026-10-21: "go with Agent SDK for M3 … keep going, decide for me until we reach a big milestone."

## Decision

- **The package.** M3's automatic launcher uses `@anthropic-ai/claude-agent-sdk`, pinned at **0.3.293** (published 2026-10-07, two weeks old). The newest release, 0.3.306, is from today; it is not used.
- **Kept to the launcher.** The dependency lives only in `prototype/launcher/`, with its own `package.json`. `node_modules/` is git-ignored.
  - The kernel stays dependency-free: `lib.mjs`, `meta.mjs`, `supervisor.mjs` and the checks.
  - All 74 kernel tests run without the dependency.
- **How sessions start.** Each agent process gets the brief file verbatim as its prompt, with:
  - `settingSources: []` (no System 3 Company settings or CLAUDE.md);
  - the tools Bash, Read, Write, Edit, Glob and Grep;
  - `permissionMode: "dontAsk"` and no permission prompts;
  - the model `claude-opus-5-5`.

## Why

- **The SDK is the founder's choice.** It is the Claude Code harness as a library, the same harness that ran every agent in Benchmarks 1-3.
- **One brief, unchanged.** The prompt is the file code wrote, so a launch can't be retyped wrong (benchmark 3, live run 4).
- **Reliable accounting.** The launcher names each agent process (`META_LAUNCH`), so its tokens and its crash belong to exactly one session.

## Objections

1. **"Briefs without CLAUDE.md make sessions cheaper, so cost comparisons with the earlier benchmarks are not like for like."**
   - Answer: true. Each M3 result reports both token measures (the agent's final context and the cumulative total) and states this difference.
   - Like-for-like runs, with the same launcher on both arms, follow from M3.
2. **"`dontAsk` with Bash pre-approved lets agents run any shell command."**
   - Answer: they run in this ephemeral container, inside the prototype directory, on work from orders.
   - No deploy, network publishing or repository write is in any brief.
   - M5 (governance) adds tool permissions per role.
3. **"A dependency in a dependency-free prototype."**
   - Answer: it is isolated in `launcher/`.
   - Removing the folder leaves a working kernel, with launches made by hand as before.

## Links

`prototype/launcher/launch.mjs` · MILESTONES.md (M3) · TOOLS.md
