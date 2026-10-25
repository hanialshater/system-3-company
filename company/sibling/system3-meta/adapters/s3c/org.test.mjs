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
