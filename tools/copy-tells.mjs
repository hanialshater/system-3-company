#!/usr/bin/env node
// Counts likely machine-written tells in lesson reveals and hooks, per domain (company/product/copy-style.md).
// A flagger, not a judge: about a third of closing-line and "X, not Y" hits are real (2026-10-20 sample).
// Reveals that are not inline in Demo.tsx (books, life hacks, algorithms) are counted as not scanned.
//   node tools/copy-tells.mjs [--domain=<d>] [--examples]
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--domain="))?.split("=")[1];
const showExamples = args.includes("--examples");

const NEG = /(\b\w+, not (?:a |an |the )?\w+[^.]{0,25}\.|\bnot [^.;:]{1,40}, but\b|\bis not [^.]{1,50}\. (?:It|They) (?:is|are)\b|\bnot merely\b|\bnot only\b)/i;
const VOCAB = /\b(crucial|key insight|counterintuitive|surprisingly|turns out|the catch|the twist|delve|fascinating|underscores)\b/i;
const WINK = /(Right\?|\bSurely\b|Or is it\?|Or does it\?)/;
const BUILDER = /\b(seeded|seed \d|Toy:)\b/;

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
const jsxText = (b) =>
  b.replace(/\{[^{}]*\}/g, " ").replace(/<[^>]+>/g, " ").replace(/&[lr]dquo;/g, '"').replace(/&rsquo;|&apos;/g, "'").replace(/\s+/g, " ").trim();
function revealParas(src) {
  const i = src.indexOf("reveal=");
  if (i < 0) return [];
  const end = src.indexOf("\n    >", i);
  const seg = src.slice(i, end > 0 ? end : i + 6000);
  return [...seg.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => jsxText(m[1]));
}

const cols = ["lessons", "scanned", "closingLine", "notXbutY", "vocab", "emDash", "winkHook", "builderWord", "over90"];
const rows = {};
const examples = {};
const demos = path.join(ROOT, "src/demos");
for (const dom of fs.readdirSync(demos).filter((d) => fs.statSync(path.join(demos, d)).isDirectory())) {
  if (only && dom !== only) continue;
  for (const slug of fs.readdirSync(path.join(demos, dom))) {
    const dir = path.join(demos, dom, slug);
    const demo = path.join(dir, "Demo.tsx");
    if (!fs.existsSync(demo)) continue;
    const r = (rows[dom] ??= Object.fromEntries(cols.map((c) => [c, 0])));
    const hit = (k, s) => { r[k]++; (examples[`${dom} ${k}`] ??= []).push(`${slug}: ${s}`); };
    r.lessons++;
    let hook = "";
    try { hook = JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8")).hook ?? ""; } catch {}
    if (WINK.test(hook)) hit("winkHook", hook);
    const src = stripComments(fs.readFileSync(demo, "utf8"));
    if (BUILDER.test(src)) hit("builderWord", src.match(BUILDER)[0]);
    const paras = revealParas(src);
    if (!paras.length) continue;
    r.scanned++;
    const text = paras.join(" ");
    const last = paras.at(-1).split(/(?<=[.!?])\s+/).at(-1) ?? "";
    if (last && last.split(" ").length <= 14 && !/\d/.test(last) && !last.endsWith("?")) hit("closingLine", last);
    if (NEG.test(text)) hit("notXbutY", text.match(NEG)[0]);
    if (VOCAB.test(text)) hit("vocab", text.match(VOCAB)[0]);
    if (/—| -- /.test(text)) hit("emDash", "—");
    if (text.split(" ").length > 90) r.over90++;
  }
}
console.log(`| domain | ${cols.join(" | ")} |\n|${"---|".repeat(cols.length + 1)}`);
for (const [d, r] of Object.entries(rows).sort()) console.log(`| ${d} | ${cols.map((c) => r[c]).join(" | ")} |`);
if (showExamples) for (const [k, v] of Object.entries(examples)) console.log(`\n## ${k}\n${v.slice(0, 15).map((x) => `- ${x}`).join("\n")}`);
