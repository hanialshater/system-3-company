#!/usr/bin/env node
// The starter HQ as a static site (for Vercel or any static host): runs each company's tools once (its events, org,
// dashboard, knowledge and pages, exactly as the server would) and writes the snapshot beside index.html. The page
// reads the snapshot when it is served statically; nothing runs at request time, so no secrets and no server.
//   node hq/build.mjs --city=<city.json> [--out=dist]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));

export async function build(cityFile, out) {
  process.argv.push(`--city=${cityFile}`); // the server module reads its city from argv
  const S = await import(`./server.mjs?build=${Date.now()}`); process.argv.pop();
  const c = S.city(cityFile), w = (rel, data) => { const f = path.join(out, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, typeof data === "string" ? data : JSON.stringify(data)); };
  const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
  fs.rmSync(out, { recursive: true, force: true });
  const list = [];
  for (const co of c.companies) {
    const ev = S.eventsOf(co), dash = S.dashboardOf(co);
    list.push({ id: co.id, name: co.name, archetype: co.archetype, owner: co.owner ?? null, pages: S.pagesOf(co).map(({ id, title }) => ({ id, title: title ?? id })), health: S.health(ev), budget: dash?.budget ?? null, mission: dash?.mission ?? null });
    w(`data/company/${co.id}/events.json`, ev); w(`data/company/${co.id}/org.json`, S.orgOf(co)); w(`data/company/${co.id}/dashboard.json`, dash);
    w(`data/company/${co.id}/knowledge.json`, co.knowledge ? readJsonl(path.join(co.knowledge, "entries.jsonl")) : []);
    for (const pg of S.pagesOf(co)) { const f = path.resolve(co.hq, pg.file); if (f.startsWith(path.resolve(co.hq) + path.sep)) w(`data/company/${co.id}/page/${pg.id}.js`, fs.readFileSync(f, "utf8")); }
  }
  w("data/city.json", list);
  w("index.html", fs.readFileSync(path.join(HERE, "index.html"), "utf8").replace("<script>", `<script>window.HQ_STATIC = ${JSON.stringify({ built: new Date().toISOString() })};</script>\n<script>`));
  return { out, companies: list.length };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!opt.city) { console.error("usage: node hq/build.mjs --city=<city.json> [--out=dist]"); process.exit(2); }
  console.log(JSON.stringify(await build(path.resolve(opt.city), path.resolve(opt.out ?? "dist"))));
}
