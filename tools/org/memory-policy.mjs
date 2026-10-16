// The one memory policy for every role (F-39, company/decisions/2026-10-16-founder-agent-memory-basics.md,
// points 5-6 as amended by the founder on 2026-10-16: "50 KB for every role, with no line limit").
// Not per role: tools/memory.mjs, the agent template (tools/org/generate.mjs) and the check all read these.

export const MEMORY_POLICY = Object.freeze({
  dir: "company/roles/memory", // <role>.md, <role>/<date>-<runkey>.md (one file per run), <role>.archive-<date>.md
  maxBytes: 50 * 1024, // threshold: past it, the memory is compacted before it is read or appended to
  targetBytes: 25 * 1024, // after compaction
  entryMaxLines: 12, // one offboarding entry
  decision: "company/decisions/2026-10-16-founder-agent-memory-basics.md",
});

export const kb = (n) => `${Math.round(n / 1024)} KB`;
