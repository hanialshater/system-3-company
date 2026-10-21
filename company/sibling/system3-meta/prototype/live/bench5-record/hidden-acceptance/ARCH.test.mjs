import { test } from "node:test"; import assert from "node:assert/strict"; import { slots } from "./arch.mjs";
test("ARCH.md assigns four slots, each a module file with its exports", () => {
  const s = slots(); assert.ok(s, "ARCH.md missing");
  const missing = ["A", "B", "C", "D"].filter((k) => !s[k] || !s[k].exports.length);
  assert.deepEqual(missing, [], `slots without a '## Slot X: <file>.mjs' heading and an 'exports:' line: ${missing.length}`);
});
