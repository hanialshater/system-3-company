#!/usr/bin/env node
// The starter HQ (product/STARTER.md "The starter HQ"): a dependency-free web app over companies' v1 event logs
// (crew.mjs). One page (index.html) and a small JSON API:
//   GET /api/city                      the companies in the city file: [{ id, name, archetype, health }]
//   GET /api/company/<id>/events       the company's events (v1), newest last
//   GET /api/company/<id>/knowledge    its knowledge base entries (knowledge/entries.jsonl), if it has one
//   GET /api/company/<id>/org          its org (reporting lines), from its org file
//   GET /api/company/<id>/page/<p>.js  one of the company's own HQ pages (its extension point, below)
// A company is { id, name, archetype, events: <path to events.jsonl>, knowledge?: <dir> } in the city file, or a
// benchmark org ({ bench: <runs dir> }) read through bench2events.mjs, or a kernel company ({ kernel: <state.json> })
// read through kernel2events.mjs.
// Extension point: a company's HQ developers add pages without forking the starter HQ. The company's entry names its
// `hq` folder; <hq>/pages.json lists [{ id, title, file }], and each file is an ES module exporting
// render({ events, knowledge, company, esc, time, pct }) → HTML. The pages appear in the company's sidebar. They run
// in the HQ's page with the company's own code, so only the company's owners write them.
//   node hq/server.mjs --city=<city.json> [--port=4173]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { benchEvents } from "./bench2events.mjs";
import { kernelEvents, kernelOrg } from "./kernel2events.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const cityFile = path.resolve(opt.city ?? path.join(HERE, "city.json"));
const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
const city = () => JSON.parse(fs.readFileSync(cityFile, "utf8"));
export function pagesOf(c) { if (!c.hq) return []; try { return JSON.parse(fs.readFileSync(path.join(c.hq, "pages.json"), "utf8")).filter((p) => /^[a-z0-9-]+$/.test(p.id ?? "") && p.file); } catch { return []; } }
/** the org: [{ id, title, reportsTo, team }] from the company's org file (`org` in its entry), or none (crews draw
 *  their members as peers under the owner) */
export function orgOf(c) { if (!c.org) return c.kernel ? kernelOrg(c.kernel) : []; try { const o = JSON.parse(fs.readFileSync(c.org, "utf8")); return Array.isArray(o) ? o : o.roles ?? []; } catch { return []; } }
export function eventsOf(c) { return c.bench ? benchEvents(c.bench) : c.kernel ? kernelEvents(c.kernel) : readJsonl(c.events); }
export function health(ev) {
  const co = ev.find((e) => e.type === "company.start"), start = ev.find((e) => e.type === "crew.start"), lands = ev.filter((e) => e.type === "land"), last = lands.at(-1);
  const spent = ev.filter((e) => e.type === "spend").reduce((a, e) => a + (e.usd ?? 0), 0), end = ev.findLast((e) => e.type === "crew.end"), over = end && !ev.some((e) => e.t > end.t && e.type !== "crew.end");
  return { score: last?.after ?? start?.rate ?? null, start: start?.rate ?? null, lands: lands.length, refused: ev.filter((e) => e.type === "land.refused").length, spent: Number(spent.toFixed(2)), budget: start?.budget ?? co?.budget ?? null, state: over ? "ended" : start ? "running" : co && ev.every((e) => e.type.startsWith("company.")) ? "onboarded" : ev.length ? "running" : "empty", members: start?.members?.length ?? co?.roles?.length ?? 0, last: ev.at(-1)?.t ?? null };
}
const send = (res, code, body, type = "application/json") => { res.writeHead(code, { "content-type": type, "cache-control": "no-store" }); res.end(type === "application/json" ? JSON.stringify(body) : body); };

export function handler(req, res) {
  const u = new URL(req.url, "http://x"), parts = u.pathname.split("/").filter(Boolean);
  try {
    if (u.pathname === "/" || u.pathname === "/index.html") return send(res, 200, fs.readFileSync(path.join(HERE, "index.html"), "utf8"), "text/html; charset=utf-8");
    if (u.pathname === "/api/city") return send(res, 200, city().companies.map((c) => ({ id: c.id, name: c.name, archetype: c.archetype, owner: c.owner ?? null, pages: pagesOf(c).map(({ id, title }) => ({ id, title: title ?? id })), health: health(eventsOf(c)) })));
    if (parts[0] === "api" && parts[1] === "company") {
      const c = city().companies.find((x) => x.id === parts[2]); if (!c) return send(res, 404, { error: "no such company" });
      if (parts[3] === "events") return send(res, 200, eventsOf(c));
      if (parts[3] === "page" && parts[4]?.endsWith(".js")) {
        const pg = pagesOf(c).find((p) => p.id === parts[4].slice(0, -3)); if (!pg) return send(res, 404, { error: "no such page" });
        const f = path.resolve(c.hq, pg.file); if (!f.startsWith(path.resolve(c.hq) + path.sep)) return send(res, 403, { error: "a page's file is inside the company's hq folder" });
        return send(res, 200, fs.readFileSync(f, "utf8"), "text/javascript; charset=utf-8");
      }
      if (parts[3] === "org") return send(res, 200, orgOf(c));
      if (parts[3] === "knowledge") return send(res, 200, c.knowledge ? readJsonl(path.join(c.knowledge, "entries.jsonl")) : []);
    }
    send(res, 404, { error: "not found" });
  } catch (e) { send(res, 500, { error: String(e.message ?? e) }); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const port = Number(opt.port ?? 4173);
  http.createServer(handler).listen(port, () => console.log(`HQ on http://localhost:${port} (city: ${cityFile})`));
}
