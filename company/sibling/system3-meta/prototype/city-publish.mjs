#!/usr/bin/env node
// Publishing to the city (product/STARTER.md, "the city"): an owner chooses entries from their company's knowledge
// base and writes them, with where they came from, into a checkout of the city repository, ready for a pull request.
// Nothing is published unless chosen: by topic, run, kind and minimum belief, or a list of entry numbers. Entries that
// are already in the city are skipped; the city's own check (tools/check.mjs) runs before anything is written.
//   node city-publish.mjs --kb=<entries.jsonl> --company=<id> --by=<github handle> --city=<city checkout>
//        [--topic=a,b] [--run=B13] [--kind=finding,pitfall] [--min-belief=0.7] [--only=3,17] [--dry]
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

const list = (v) => (v ? String(v).split(",").map((x) => x.trim()).filter(Boolean) : null);
export function choose(entries, { topic, run, kind, minBelief, only } = {}) {
  return entries.map((e, i) => ({ ...e, n: i + 1 })).filter((e) => (!only || only.includes(String(e.n))) && (!topic || topic.includes(e.topic)) && (!run || run.includes(e.run)) && (!kind || kind.includes(e.kind)) && (minBelief == null || (e.belief ?? 0) >= minBelief));
}
const key = (e) => createHash("sha256").update(`${e.topic}\n${e.text}`).digest("hex").slice(0, 16);
export async function publish({ kb, company, by, city, dry = false, ...sel }) {
  if (!kb || !company || !by || !city) throw new Error("--kb, --company, --by and --city are required");
  const entries = fs.readFileSync(kb, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const file = path.join(city, "knowledge", `${company}.jsonl`), have = new Set((fs.existsSync(file) ? fs.readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []).map(key));
  const today = new Date().toISOString().slice(0, 10);
  const out = choose(entries, sel).filter((e) => !have.has(key(e))).map((e) => ({ v: 1, company, run: e.run ?? null, by: e.by ?? null, topic: e.topic, kind: e.kind, text: e.text, evidence: e.evidence, belief: e.belief, published: today, publishedBy: by }));
  if (dry || !out.length) return { chosen: out.length, written: 0, file };
  const before = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  fs.mkdirSync(path.dirname(file), { recursive: true }); fs.appendFileSync(file, out.map((e) => JSON.stringify(e)).join("\n") + "\n");
  // the city's own rules decide: if its check fails, nothing stays written
  const { check } = await import(pathToFileURL(path.join(city, "tools", "check.mjs")).href), problems = check(city);
  if (problems.length) { fs.writeFileSync(file, before); if (!before) fs.rmSync(file); throw new Error(`the city's check refused it:\n${problems.join("\n")}`); }
  return { chosen: out.length, written: out.length, file };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const o = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  try { console.log(JSON.stringify(await publish({ kb: o.kb, company: o.company, by: o.by, city: o.city, dry: !!o.dry, topic: list(o.topic), run: list(o.run), kind: list(o.kind), minBelief: o["min-belief"] != null ? Number(o["min-belief"]) : null, only: list(o.only) }))); }
  catch (e) { console.error(e.message); process.exit(1); }
}
