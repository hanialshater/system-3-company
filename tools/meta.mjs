#!/usr/bin/env node
// Lesson metadata v2 (company/product/lesson-metadata.md).
//   node tools/meta.mjs lint                    missing v2 fields per lesson (warnings)
//   node tools/meta.mjs backfill [--dry]        derive curriculum.{primary,prerequisites,level,strand} from content/curriculum
//   node tools/meta.mjs coverage --work=<id>    chapters of a work × lessons that reference them
import fs from "node:fs";
import path from "node:path";

const [cmd] = process.argv.slice(2);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const lessons = [];
for (const d of fs.readdirSync("src/demos")) {
  const dd = path.join("src/demos", d);
  if (!fs.statSync(dd).isDirectory()) continue;
  for (const s of fs.readdirSync(dd)) { const p = path.join(dd, s, "meta.json"); if (fs.existsSync(p)) lessons.push({ p, d, m: JSON.parse(fs.readFileSync(p, "utf8")) }); }
}
const cur = {};
for (const f of fs.readdirSync("content/curriculum").filter((f) => f.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join("content/curriculum", f), "utf8"));
  for (const c of j.concepts ?? []) cur[`${j.domain}:${c.id}`] = c;
}

if (cmd === "lint") {
  const need = ["curriculum.primary", "curriculum.level", "format"];
  let n = 0;
  for (const { m } of lessons) {
    const miss = need.filter((k) => k.split(".").reduce((o, x) => o?.[x], m) === undefined);
    if (m.curriculum?.primary && !cur[m.curriculum.primary]) miss.push(`unknown concept ${m.curriculum.primary}`);
    if (miss.length) (n++, opt.quiet || console.log(`${m.slug.padEnd(34)} ${miss.join(", ")}`));
  }
  console.log(`${n} of ${lessons.length} lessons missing v2 metadata`);
} else if (cmd === "backfill") {
  let changed = 0;
  for (const { p, d, m } of lessons) {
    const key = `${m.domain ?? d}:${m.concept}`;
    const c = cur[key];
    const before = JSON.stringify(m.curriculum ?? null);
    m.curriculum ??= {};
    if (c) {
      m.curriculum.primary ??= key;
      m.curriculum.prerequisites ??= (c.prerequisites ?? []).map((x) => (x.includes(":") ? x : `${m.domain ?? d}:${x}`));
      m.curriculum.level ??= c.level;
      if (c.subarea) m.curriculum.strand ??= c.subarea;
    }
    m.curriculum.references ??= [];
    m.curriculum.also ??= [];
    if (JSON.stringify(m.curriculum) !== before) { changed++; if (!opt.dry) fs.writeFileSync(p, JSON.stringify(m, null, 2) + "\n"); }
  }
  console.log(`${opt.dry ? "would update" : "updated"} ${changed} lesson(s)`);
} else if (cmd === "coverage") {
  const works = JSON.parse(fs.readFileSync("content/works.json", "utf8")).works;
  const w = works.find((x) => x.id === opt.work);
  if (!w) throw new Error(`unknown work ${opt.work}; see content/works.json`);
  console.log(`${w.title} (${w.year})`);
  for (const ch of w.chapters) {
    const hits = lessons.filter(({ m }) => (m.curriculum?.references ?? []).some((r) => r.work === w.id && Number(r.chapter) === ch.n));
    console.log(`${String(ch.n).padStart(3)}. ${ch.title.padEnd(48)} ${hits.length ? hits.map(({ m }) => m.slug + (m.status === "published" ? "*" : "")).join(", ") : "-"}`);
  }
} else console.log("usage: node tools/meta.mjs lint|backfill|coverage --work=<id>");
