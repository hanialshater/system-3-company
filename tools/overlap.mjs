#!/usr/bin/env node
// Possible overlaps between lessons: same concept tag, or similar title + misconception + objective
// text (word Jaccard). A signal for category managers, never a gate (founder, 2026-10-13: "not strict
// at the moment"). Two angles on one idea can be deliberate; this only makes them visible.
//   node tools/overlap.mjs [--threshold=0.28]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const thr = Number(process.argv.find((a) => a.startsWith("--threshold="))?.split("=")[1] ?? 0.28);
const stop = new Set("the a an of to and in is it that on for with as by at be or are this from what how why which you your can its than more not one two when does do into each".split(" "));
const lessons = [];
for (const d of fs.readdirSync(path.join(ROOT, "src/demos"))) {
  const dd = path.join(ROOT, "src/demos", d);
  if (!fs.statSync(dd).isDirectory()) continue;
  for (const s of fs.readdirSync(dd)) {
    const mp = path.join(dd, s, "meta.json");
    if (!fs.existsSync(mp)) continue;
    const m = JSON.parse(fs.readFileSync(mp, "utf8"));
    if (m.status === "retired") continue;
    const txt = [m.title, m.misconception, m.objective, m.concept].join(" ").toLowerCase().replace(/[^a-z0-9 ]/g, " ");
    lessons.push({ id: `${d}/${s}`, concept: m.concept, w: new Set(txt.split(/\s+/).filter((x) => x.length > 2 && !stop.has(x))) });
  }
}
const byConcept = {};
for (const l of lessons) (byConcept[l.concept] ??= []).push(l.id);
const shared = Object.entries(byConcept).filter(([, v]) => v.length > 1);
const similar = [];
for (let i = 0; i < lessons.length; i++)
  for (let j = i + 1; j < lessons.length; j++) {
    const a = lessons[i].w, b = lessons[j].w;
    let n = 0;
    for (const x of a) if (b.has(x)) n++;
    const jac = n / (a.size + b.size - n);
    if (jac >= thr) similar.push([jac, lessons[i].id, lessons[j].id]);
  }
console.log(`${lessons.length} lessons · ${shared.length} concepts with more than one lesson · ${similar.length} similar pairs (≥ ${thr})`);
for (const [c, v] of shared) console.log(`  concept ${c}: ${v.join(", ")}`);
for (const [j, a, b] of similar.sort((x, y) => y[0] - x[0])) console.log(`  similar ${j.toFixed(2)}: ${a} ↔ ${b}${a.split("/")[0] !== b.split("/")[0] ? "  (cross-category)" : ""}`);
