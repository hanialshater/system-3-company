import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The dashboard and org-file tools (product/STARTER.md §3): what the HQ's Dashboard and Org pages read.
const { dashboard } = await import("../dashboard.mjs");
const { orgProblems } = await import("../orgfile.mjs");

test("dashboard: mission, budget lines (recorded or live), capped vs uncapped spend, milestones", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "dash-")), led = path.join(d, "spend.json");
  fs.writeFileSync(led, JSON.stringify({ spent: 12.345 }));
  fs.writeFileSync(path.join(d, "company.json"), JSON.stringify({ id: "c", name: "C", mission: "m", budget: { lines: [{ id: "a", title: "A", approved: 100, spent: 40 }, { id: "b", title: "B", approved: null, spent: 10 }, { id: "c", title: "C", approved: 50, ledger: led }] } }));
  fs.writeFileSync(path.join(d, "milestones.json"), JSON.stringify({ milestones: [{ id: "M1", title: "x", state: "done" }, { id: "M2", title: "y", state: "blocked" }] }));
  const x = dashboard(d);
  assert.equal(x.mission, "m"); assert.equal(x.budget.approved, 150); assert.equal(x.budget.spent, 62.35);
  assert.equal(x.budget.spentCapped, 52.35); assert.equal(x.budget.spentUncapped, 10); assert.equal(x.budget.lines[2].live, true);
  assert.deepEqual(x.kpis.map((k) => k.value), [1, 0, 1]);
});

test("orgfile: the org contract's checks", () => {
  assert.deepEqual(orgProblems([{ id: "a", title: "A", reportsTo: null }, { id: "b", title: "B", reportsTo: "a" }]), []);
  assert.match(orgProblems([{ id: "a", title: "A", reportsTo: null }, { id: "b", title: "B", reportsTo: "z" }]).join(), /not in the org/);
  assert.match(orgProblems([{ id: "a", title: "A", reportsTo: "b" }, { id: "b", title: "B", reportsTo: "a" }]).join(), /one root/);
  const meta = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), "..", "..", "org", "org.json"), "utf8")).roles;
  assert.deepEqual(orgProblems(meta), [], "Meta's own org keeps the contract");
});

test("the starter catalog: 11 generic roles, each reporting inside the catalog or to the founder", () => {
  const c = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), "..", "..", "catalog", "roles.json"), "utf8")).roles, ids = new Set(c.map((r) => r.id));
  assert.equal(c.length, 11); assert.ok(c.every((r) => r.reportsTo === "founder" || ids.has(r.reportsTo)));
});
