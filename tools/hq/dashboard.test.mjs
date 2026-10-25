// System 3 Company's dashboard adapter (the dashboard contract's principles, features and releases) and the city pages
// copied into tools/hq/. A company test: it reads this checkout.   node --test tools/hq/dashboard.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { dashboard, releasesOf, metaAudit } from "./hq-dashboard.mjs";

const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "..", "..");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

test("features come from company/features.json: one owner each, a city status, and links that exist", () => {
  const { features } = dashboard(ROOT);
  assert.ok(features.length >= 10);
  for (const f of features) {
    assert.ok(f.id && f.title && f.owner && f.summary, f.id);
    assert.ok(["live", "building", "planned", "retired"].includes(f.status), `${f.id}: ${f.status}`);
    for (const l of f.links ?? []) if (!/^https?:/.test(l)) assert.ok(fs.existsSync(path.join(ROOT, l.split("#")[0])), `${f.id}: ${l}`);
  }
  assert.equal(new Set(features.map((f) => f.id)).size, features.length);
});

test("releases come from company/ops/releases.json, newest first, and never invent an approval", () => {
  const { releases } = dashboard(ROOT), rec = JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/releases.json"), "utf8"));
  assert.equal(releases.length, rec.releases.length + (rec.historical_deployments ?? []).length);
  for (let i = 1; i < releases.length; i++) assert.ok(Date.parse(releases[i - 1].at) >= Date.parse(releases[i].at), releases[i].id);
  for (const r of releases) assert.ok(r.id && /^\d{4}-\d\d-\d\d$/.test(r.date) && r.commit && Array.isArray(r.notes), r.id);
  assert.equal(releases.find((r) => r.id === "r1").approvedBy, null, "r1's approval is 'not recorded'");
  assert.ok(releases.filter((r) => r.id.startsWith("deployment-")).every((r) => r.approvedBy === null), "unapproved deploys stay unapproved");
  const toy = releasesOf({ releases: [{ version: "r1", date: "2026-01-01", commit: "abc", approved_by: { who: "not recorded" } }, { version: "r2", date: "2026-01-02", commit: "def", approved_by: { who: "founder", record: "x.md" } }] });
  assert.deepEqual(toy.map((r) => [r.id, r.approvedBy]), [["r2", "founder (x.md)"], ["r1", null]]);
});

test("principles: Meta's audit when Meta is checked out, and the field left out when it is not", async () => {
  assert.equal("principles" in dashboard(ROOT), false);
  const audit = await metaAudit();
  if (!audit) return; // no Meta checkout beside this repository: nothing more to check
  const p = dashboard(ROOT, { audit }).principles;
  assert.equal(p.total, 13); assert.equal(p.followed + p.gaps + p.manual, p.total);
});

test("the three city pages are copied and render this company's dashboard", async () => {
  const pages = JSON.parse(fs.readFileSync(path.join(HERE, "pages.json"), "utf8"));
  assert.deepEqual(pages.map((p) => p.id), ["principles", "features", "releases"]);
  const city = JSON.parse(fs.readFileSync(path.join(HERE, "hq-city.json"), "utf8")).companies.find((c) => c.id === "system-3-company");
  assert.equal(city.hq, ".");
  const d = dashboard(ROOT, { audit: await metaAudit() });
  for (const p of pages) {
    const html = (await import(new URL(p.file, import.meta.url).href)).render({ dashboard: d, esc });
    assert.ok(typeof html === "string" && html.length > 100, p.id);
  }
});
