#!/usr/bin/env node
// PreToolUse hook: block agent edits to the constitutional surface.
// "Telling the agent not to edit a file states the rule; it does not make the file immutable."
// This hook, plus the CI check, is how the rule gets teeth. It is best effort for Bash
// (it looks for write-like commands that name a protected path); CI is the backstop.
//
// Bypass only for a ratified amendment: start the session with S3_AMENDMENT=AMD-<n>, and the
// file company/constitution/amendments/AMD-<n>-*.md must exist with "status: ratified".

import fs from "node:fs";
import path from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  let event;
  try {
    event = JSON.parse(input);
  } catch {
    process.exit(0);
  }
  const patterns = fs
    .readFileSync(path.join(root, "company/constitution/protected-paths.txt"), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  const toRegex = (glob) =>
    new RegExp("^" + glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$");
  const isProtected = (p) => {
    const relp = path.relative(root, path.resolve(root, p)).split(path.sep).join("/");
    return patterns.some((g) => toRegex(g).test(relp));
  };

  const amendment = process.env.S3_AMENDMENT;
  if (amendment) {
    const dir = path.join(root, "company/constitution/amendments");
    const file = fs.existsSync(dir) && fs.readdirSync(dir).find((f) => f.startsWith(`${amendment}-`));
    if (file && /^status:\s*ratified/m.test(fs.readFileSync(path.join(dir, file), "utf8"))) process.exit(0);
  }

  const tool = event.tool_name;
  const ti = event.tool_input || {};
  let hit = null;
  if (["Edit", "Write", "MultiEdit", "NotebookEdit"].includes(tool)) {
    const p = ti.file_path || ti.notebook_path;
    if (p && isProtected(p)) hit = p;
  } else if (tool === "Bash" && typeof ti.command === "string") {
    const cmd = ti.command;
    const writey = /(>|>>|\btee\b|\bsed\s+-i|\bperl\s+-p?i|\bmv\b|\bcp\b|\brm\b|\btruncate\b|\bgit\s+(checkout|restore)\b|writeFileSync|open\([^)]*['"]w)/;
    if (writey.test(cmd)) {
      for (const g of patterns) {
        const literal = g.replace(/\/\*\*$/, "").replace(/\*.*$/, "");
        if (literal && cmd.includes(literal)) hit = g;
      }
    }
  }
  if (hit) {
    process.stderr.write(
      `Blocked: ${hit} is on the constitutional surface (company/constitution/protected-paths.txt). ` +
        `Changes need a ratified amendment: propose one with company/rituals/templates/amendment.md and route it to the evaluation-steward.`,
    );
    process.exit(2);
  }
  process.exit(0);
});
