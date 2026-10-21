import { test } from "node:test"; import assert from "node:assert/strict"; import { slots } from "./arch.mjs"; import { load } from "./kit.mjs";
test("slot B: the module ARCH.md names loads and has every export ARCH.md lists", async () => {
  const s = slots()?.["B"]; assert.ok(s, "ARCH.md has no slot B");
  const m = await load("MOD-B", s.file); assert.ok(!m.__error, m.__error);
  const missing = s.exports.filter((x) => !(x in m)); assert.deepEqual(missing, [], `${missing.length} listed exports missing`);
});
