import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// The starter HQ: the city API over v1 event logs, and the benchmark adapter.
const { handler, health } = await import("../hq/server.mjs");
const { benchEvents } = await import("../hq/bench2events.mjs");

test("health: score, lands, refusals, spend and state from v1 events", () => {
  const ev = [{ v: 1, t: "2026-10-25T00:00:00Z", type: "crew.start", by: "operator", rate: 0.5, budget: 10, members: [{ id: "a" }] }, { v: 1, t: "2026-10-25T00:01:00Z", type: "land", by: "a", before: 0.5, after: 0.6 }, { v: 1, t: "2026-10-25T00:02:00Z", type: "land.refused", by: "a", why: "x" }, { v: 1, t: "2026-10-25T00:03:00Z", type: "spend", by: "a", usd: 1.25 }];
  assert.deepEqual({ ...health(ev), last: null }, { score: 0.6, start: 0.5, lands: 1, refused: 1, spent: 1.25, budget: 10, state: "running", members: 1, last: null });
});

test("bench2events: a benchmark org's files become v1 events, members from its folders", () => {
  const r = fs.mkdtempSync(path.join(os.tmpdir(), "hq-")); fs.mkdirSync(path.join(r, "_org")); fs.mkdirSync(path.join(r, "_operator", "O"), { recursive: true }); fs.mkdirSync(path.join(r, "arms", "O-m-x"), { recursive: true });
  fs.writeFileSync(path.join(r, "_org", "status.json"), JSON.stringify({ rate: 0.7, lands: [{ t: "2026-10-25T00:01:00Z", by: "m-x", head: "h", before: 0.7, after: 0.8 }], refused: [] }));
  fs.writeFileSync(path.join(r, "_operator", "O", "ledger.jsonl"), JSON.stringify({ t: "2026-10-25T00:00:00Z", event: "start", caps: { cost: 5 } }) + "\n");
  const ev = benchEvents(r);
  assert.deepEqual(ev.map((e) => e.type), ["crew.start", "land"]); assert.deepEqual(ev[0].members.map((m) => m.id), ["m-x"]);
});

test("the API: /api/city and a company's events", async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "hq-")), evf = path.join(d, "events.jsonl");
  fs.writeFileSync(evf, JSON.stringify({ v: 1, t: "2026-10-25T00:00:00Z", type: "crew.start", by: "operator", rate: 0.2, members: [] }) + "\n");
  const city = path.join(d, "city.json"); fs.writeFileSync(city, JSON.stringify({ companies: [{ id: "c1", name: "C1", archetype: "dynamic workflow", events: evf }] }));
  process.argv.push(`--city=${city}`);
  const { handler: h } = await import(`../hq/server.mjs?x=${Date.now()}`);
  const srv = http.createServer(h); await new Promise((r) => srv.listen(0, r)); const port = srv.address().port;
  const get = (p) => new Promise((res) => http.get(`http://localhost:${port}${p}`, (r) => { let b = ""; r.on("data", (c) => (b += c)); r.on("end", () => res([r.statusCode, b])); }));
  const [s1, b1] = await get("/api/city"); assert.equal(s1, 200); assert.equal(JSON.parse(b1)[0].health.score, 0.2);
  const [s2, b2] = await get("/api/company/c1/events"); assert.equal(JSON.parse(b2).length, 1);
  const [s3] = await get("/api/company/nope/events"); assert.equal(s3, 404);
  const [s4, b4] = await get("/"); assert.equal(s4, 200); assert.match(b4, /System 3 HQ/);
  srv.close(); process.argv.pop();
});

test("extension point: a company's own pages are listed and served from its hq folder, and only from there", async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "hq-")), hq = path.join(d, "hq"); fs.mkdirSync(hq);
  fs.writeFileSync(path.join(d, "events.jsonl"), ""); fs.writeFileSync(path.join(d, "secret.js"), "nope");
  fs.writeFileSync(path.join(hq, "pages.json"), JSON.stringify([{ id: "mine", title: "Mine", file: "mine.js" }, { id: "out", file: "../secret.js" }, { id: "Bad Id", file: "mine.js" }]));
  fs.writeFileSync(path.join(hq, "mine.js"), "export const render = () => 'hi';");
  const city = path.join(d, "city.json"); fs.writeFileSync(city, JSON.stringify({ companies: [{ id: "c1", name: "C1", events: path.join(d, "events.jsonl"), hq }] }));
  process.argv.push(`--city=${city}`);
  const { handler: h } = await import(`../hq/server.mjs?y=${Date.now()}`);
  const srv = http.createServer(h); await new Promise((r) => srv.listen(0, r)); const port = srv.address().port;
  const get = (p) => new Promise((res) => http.get(`http://localhost:${port}${p}`, (r) => { let b = ""; r.on("data", (c) => (b += c)); r.on("end", () => res([r.statusCode, b, r.headers["content-type"]])); }));
  const [, city1] = await get("/api/city"); assert.deepEqual(JSON.parse(city1)[0].pages.map((p) => p.id), ["mine", "out"]);
  const [s1, b1, t1] = await get("/api/company/c1/page/mine.js"); assert.equal(s1, 200); assert.match(t1, /javascript/); assert.match(b1, /render/);
  const [s2] = await get("/api/company/c1/page/out.js"); assert.equal(s2, 403);
  const [s3] = await get("/api/company/c1/page/none.js"); assert.equal(s3, 404);
  srv.close(); process.argv.pop();
});

test("kernel2events: a kernel company's closed meetings become meeting events with their minutes", async () => {
  const { kernelEvents } = await import("../hq/kernel2events.mjs");
  const ev = kernelEvents(path.join(path.dirname(new URL(import.meta.url).pathname), "..", "live", "bench3-a", "state.json"));
  assert.ok(ev.length, "the recorded kernel run (live/bench3-a) is in the repository")
  assert.equal(ev[0].type, "company.start"); const m = ev.find((e) => e.type === "meeting");
  assert.ok(m.title && m.attendees.length && m.decisions.length && /^# /.test(m.text));
  assert.ok(ev.every((e) => e.v === 1 && !Number.isNaN(Date.parse(e.t))));
});

test("the org: a kernel company's roles with their reporting lines; System 3 Company's from its roles as data", async () => {
  const { kernelOrg, kernelEvents } = await import("../hq/kernel2events.mjs"), { orgFromRoles } = await import("../hq/org-from-roles.mjs");
  const HERE2 = path.dirname(new URL(import.meta.url).pathname), st = path.join(HERE2, "..", "live", "bench3-a", "state.json");
  const org = kernelOrg(st); assert.ok(org.find((r) => r.id === "editor" && r.reportsTo));
  assert.ok(kernelEvents(st).some((e) => e.type === "kernel.enter" && e.room), "rooms come through");
  const s3 = await orgFromRoles(path.join(HERE2, "..", "..", "..", "..", "..", "tools", "org", "roles.mjs")), ids = new Set(s3.map((r) => r.id));
  assert.ok(s3.length > 100); assert.ok(s3.every((r) => r.reportsTo === null || ids.has(r.reportsTo)));
});
