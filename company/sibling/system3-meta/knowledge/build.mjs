#!/usr/bin/env node
// Builds KB.md (by topic, highest belief first) from entries.jsonl. node build.mjs
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const E = fs.readFileSync(path.join(HERE, "entries.jsonl"), "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
const by = {}; for (const e of E) (by[e.topic ?? "other"] ??= []).push(e);
let md = `# System 3 Meta knowledge base\n\nGenerated from entries.jsonl by build.mjs: ${E.length} entries from ${[...new Set(E.map((e) => e.run))].join(", ")}. Read README.md first. Each entry: kind, belief (the author's, 0-1; later runs may revise it), the claim, its evidence, its source.\n`;
for (const [t, es] of Object.entries(by).sort((a, b) => b[1].length - a[1].length)) {
  md += `\n## ${t}\n\n`;
  for (const e of es.sort((a, b) => (b.belief ?? 0) - (a.belief ?? 0))) md += `- **${e.kind}** (belief ${e.belief ?? "?"}): ${e.text}\n  - evidence: ${e.evidence ?? "—"} · source: ${e.run} ${e.arm} ${e.by}\n`;
}
fs.writeFileSync(path.join(HERE, "KB.md"), md); console.log(`KB.md: ${E.length} entries, ${Object.keys(by).length} topics`);
