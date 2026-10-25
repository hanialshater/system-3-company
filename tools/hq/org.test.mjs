// System 3 Company's org adapter (the org contract over tools/org/roles.mjs and people.mjs). A company test: it reads
// the company's checkout, so it stays with the company (export-kernel leaves adapters/ out).
//   node --test company/sibling/system3-meta/adapters/s3c/org.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { orgFromRoles } from "./org-from-roles.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..", "..", "..", "..");
test("System 3 Company's org through the org contract: every role reports to a role in the org; names from people.mjs", async () => {
  const org = await orgFromRoles(path.join(ROOT, "tools", "org", "roles.mjs")), ids = new Set(org.map((r) => r.id));
  // 39 roles since the 2026-10-25 restructuring (company/decisions/2026-10-25-founder-restructuring.md); parked roles are not in the org.
  assert.ok(org.length >= 39); assert.ok(org.every((r) => r.reportsTo === null || ids.has(r.reportsTo)));
  assert.ok(!ids.has("cm-math") && ids.has("category-curator"), "category managers are parked; the pooled curator is in the org");
  assert.equal(org.find((r) => r.id === "chief-of-staff").name, "Ada");
});

test("System 3 Company's seating through the org contract: rooms with names, kinds and floors, and the floors' names", async () => {
  const org = await orgFromRoles(path.join(ROOT, "tools", "org", "roles.mjs")), seated = org.filter((r) => r.room);
  assert.ok(seated.length >= 25, `${seated.length} roles seated`); // pools (MANY) sit only while running
  assert.ok(new Set(seated.map((r) => r.floor)).size >= 5);
  const hq = org.find((r) => r.id === "hq-engineer"); assert.equal(hq.room, "tools"); assert.equal(hq.floor, 1); assert.match(hq.floorName, /^Floor 1/);
  assert.equal(org.find((r) => r.id === "design-lead").room, "design-studio");
});
