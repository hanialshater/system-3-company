#!/usr/bin/env node
// System 3 Company's lessons for the city HQ (`knowledgeCmd`): its pattern language (company/knowledge/patterns/*.md,
// one YAML block each: id, confidence, context, problem, therefore, would_be_wrong_if, documented_cases,
// known_failure, part_of) as knowledge entries { topic, kind, text, evidence, belief, scope, by, … }. These are the
// company's own lessons (scope "company"): what it learned about making lessons and running itself. Belief from the
// pattern's confidence marks ("**" 0.8, "*" 0.6, none 0.4). Read-only.   node hq-knowledge.mjs [<company root>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** the few YAML shapes the patterns use: `key: value`, `key:` then `  - item` lines (items may wrap) */
export function patternFields(text) {
  const y = /```ya?ml\n([\s\S]*?)```/.exec(text)?.[1] ?? text, out = {}; let key = null;
  const unq = (v) => v.trim().replace(/^["']|["']$/g, "");
  for (const l of y.split("\n")) {
    const m = /^([a-z_]+):\s*(.*)$/.exec(l);
    if (m) { key = m[1]; const v = m[2].replace(/\s+#\s.*$/, "").trim(); out[key] = v === "" ? [] : v === "[]" ? [] : unq(v); if (/#\s/.test(m[2])) out[`${key}_note`] = m[2].split(/\s#\s/).slice(1).join(" # ").trim(); continue; }
    const it = /^\s+-\s+(.*)$/.exec(l); if (it && key && Array.isArray(out[key])) { out[key].push(unq(it[1])); continue; }
    if (key && l.trim()) { if (Array.isArray(out[key]) && out[key].length) out[key][out[key].length - 1] += " " + unq(l); else if (typeof out[key] === "string") out[key] += " " + l.trim(); }
  }
  return out;
}
export function lessons(root) {
  const dir = path.join(root, "company/knowledge/patterns"), out = [];
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "README.md").sort()) {
    const text = fs.readFileSync(path.join(dir, f), "utf8"), p = patternFields(text), conf = String(p.confidence ?? "").replace(/[^*]/g, "");
    const therefore = Array.isArray(p.therefore) ? p.therefore.join(" ") : p.therefore ?? "";
    out.push({ topic: p.part_of || "patterns", kind: "practice", scope: "company", by: "pattern-librarian", pattern: p.id ?? f.replace(/\.md$/, ""),
      text: `${(p.id ?? f.replace(/\.md$/, "")).replace(/-/g, " ")}: ${therefore}`.slice(0, 900), context: p.context ?? null, problem: p.problem ?? null,
      evidence: [p.confidence_note, p.would_be_wrong_if ? `wrong if: ${p.would_be_wrong_if}` : null, (p.known_failure ?? []).length ? `${p.known_failure.length} known failures` : null].filter(Boolean).join(" · ").slice(0, 700),
      belief: conf.length >= 2 ? 0.8 : conf.length === 1 ? 0.6 : 0.4, path: `company/knowledge/patterns/${f}` });
  }
  return out;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../../.."));
  console.log(JSON.stringify(lessons(root)));
}
