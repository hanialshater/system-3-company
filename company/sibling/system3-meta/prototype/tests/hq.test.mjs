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
