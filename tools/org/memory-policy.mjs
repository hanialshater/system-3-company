// The one memory policy for every role (F-39, company/decisions/2026-10-16-founder-agent-memory-basics.md,
// points 5-6 as amended by the founder on 2026-10-16: "50 KB for every role, with no line limit").
// Not per role: tools/memory.mjs, the agent template (tools/org/generate.mjs) and the check all read these.

export const MEMORY_POLICY = Object.freeze({
  dir: "company/roles/memory", // <role>.md, <role>/<date>-<runkey>.md (one file per run), <role>.archive-<date>.md
  maxBytes: 50 * 1024, // threshold: past it, the memory is compacted before it is read or appended to
  targetBytes: 25 * 1024, // after compaction
  entryMaxLines: 12, // one offboarding entry
  decision: "company/decisions/2026-10-16-founder-agent-memory-basics.md",
  // Citations (assessment 2026-10-17 §2). A path citation (a token under one of these top-level folders, or a bare
  // file name with one of `citeExts`) must resolve to an existing file or folder, repo-relative, in the checkout the
  // tool runs from (an error). A W-n board id not on company/ops/board.json is a warning. A commit sha is not looked up.
  citeRoots: Object.freeze(["company", "tools", "src", "tests", "content", "spike", "public", ".claude", ".github"]),
  citeExts: Object.freeze(["md", "mjs", "js", "json", "jsonl", "ts", "tsx", "txt", "sh", "yml"]),
  // read --craft-only (for an evaluator starting a fresh review): lines naming a lesson slug, a lesson's review or
  // source folder, or a prior verdict are left out. The evaluation-steward rules when it is required; this is the option.
  verdictWords: /\b(verdicts?|rulings?|ruled|accept(ed|s)?|revise[ds]?|reject(ed|s)?|go-with-changes|no-go|launch-ready|disputed)\b/i,
});

export const kb = (n) => `${Math.round(n / 1024)} KB`;
