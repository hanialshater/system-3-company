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
  assert.ok(org.length > 100); assert.ok(org.every((r) => r.reportsTo === null || ids.has(r.reportsTo)));
  assert.equal(org.find((r) => r.id === "chief-of-staff").name, "Ada");
});

test("System 3 Company's seating through the org contract: rooms with names, kinds and floors, and the floors' names", async () => {
  const org = await orgFromRoles(path.join(ROOT, "tools", "org", "roles.mjs")), seated = org.filter((r) => r.room);
  assert.ok(seated.length > 90, `${seated.length} roles seated`);
  assert.ok(new Set(seated.map((r) => r.floor)).size >= 6);
  const hq = org.find((r) => r.id === "hq-engineer"); assert.equal(hq.room, "tools"); assert.equal(hq.floor, 1); assert.match(hq.floorName, /^Floor 1/);
  assert.equal(org.find((r) => r.id === "cm-math").floor, 3);
});
