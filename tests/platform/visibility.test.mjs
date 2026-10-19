// Founder 2026-10-19: all statuses are visible; publication and evidence remain unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { draftsVisible, reviewVisible, statusVisible } from "../../src/lib/visibility.ts";
import { LESSON_STATUS_LABEL } from "../../src/lib/lesson-status.ts";

const environments = [
  { NODE_ENV: "development" },
  { NODE_ENV: "production" },
  { VERCEL: "1", VERCEL_ENV: "preview" },
  { VERCEL: "1", VERCEL_ENV: "production" },
  { VERCEL: "1", VERCEL_ENV: "production", SHOW_REVIEW: "off", SHOW_DRAFTS: "off" },
];
for (const env of environments) test(`all statuses list and open in ${JSON.stringify(env)}`, () => {
  assert.equal(draftsVisible(env), true);
  assert.equal(reviewVisible(env), true);
  for (const status of ["published", "review", "draft", "retired"])
    for (const opts of [{}, { includeDrafts: true }, { includeDrafts: false }])
      assert.equal(statusVisible(status, opts, env), true, status);
});
test("unknown statuses are not served", () => assert.equal(statusVisible("unknown"), false));
test("unpublished statuses retain distinct labels", () => {
  assert.equal(LESSON_STATUS_LABEL.published, "Published");
  for (const status of ["review", "draft", "retired"]) assert.match(LESSON_STATUS_LABEL[status], /Unpublished/);
  assert.equal(new Set(Object.values(LESSON_STATUS_LABEL)).size, 4);
});
test("catalog applies the shared visibility rule", () => {
  const src = fs.readFileSync(new URL("../../src/lib/catalog.ts", import.meta.url), "utf8");
  assert.match(src, /statusVisible\(d\.status, opts\)/);
});
