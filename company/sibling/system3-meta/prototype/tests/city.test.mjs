import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The city: its registry and shared-knowledge check, and publishing chosen knowledge-base entries into it.
const HERE = path.dirname(new URL(import.meta.url).pathname), CITY = path.join(HERE, "..", "..", "city");
const { publish } = await import("../city-publish.mjs");
const copyCity = () => { const d = fs.mkdtempSync(path.join(os.tmpdir(), "city-")); fs.cpSync(CITY, d, { recursive: true }); return d; };
const kb = (d, rows) => { const f = path.join(d, "kb.jsonl"); fs.writeFileSync(f, rows.map((r) => JSON.stringify(r)).join("\n") + "\n"); return f; };

test("the city as it ships checks out", async () => {
  const { check } = await import(path.join(CITY, "tools", "check.mjs"));
  assert.deepEqual(check(CITY), []);
});

test("publish: only chosen entries, with provenance; repeats skipped", async () => {
  const city = copyCity(), f = kb(city, [{ run: "B13", by: "m-planner", topic: "query-planner", kind: "finding", text: "EQP is worth it", evidence: "final-O.json", belief: 0.85 }, { run: "B13", by: "m-x", topic: "other", kind: "practice", text: "t", evidence: "e", belief: 0.4 }]);
  const r = await publish({ kb: f, company: "meta", by: "hanialshater", city, topic: ["query-planner"] });
  assert.equal(r.written, 1); const e = JSON.parse(fs.readFileSync(path.join(city, "knowledge", "meta.jsonl"), "utf8"));
  assert.equal(e.company, "meta"); assert.equal(e.run, "B13"); assert.equal(e.publishedBy, "hanialshater");
  assert.equal((await publish({ kb: f, company: "meta", by: "hanialshater", city, topic: ["query-planner"] })).written, 0, "already in the city");
  assert.equal((await publish({ kb: f, company: "meta", by: "hanialshater", city, minBelief: 0.5 })).written, 0);
});

test("publish: the city's check refuses personal data, and nothing stays written", async () => {
  const city = copyCity(), f = kb(city, [{ topic: "t", kind: "finding", text: "write to me at someone@example.com", evidence: "e", belief: 0.5 }]);
  await assert.rejects(publish({ kb: f, company: "meta", by: "hanialshater", city }), /personal data/);
  assert.equal(fs.existsSync(path.join(city, "knowledge", "meta.jsonl")), false);
});
