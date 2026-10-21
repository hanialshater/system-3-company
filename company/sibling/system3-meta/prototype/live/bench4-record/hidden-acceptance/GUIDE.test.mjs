import { test } from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs"; import path from "node:path"; import { CYC } from "./kit.mjs";
const f = path.join(process.env.BOOK_ROOT, "GUIDE", "guide.md");
test("guide names every function and every error value, in 300-900 words", () => {
  assert.ok(fs.existsSync(f), "guide.md missing");
  const t = fs.readFileSync(f, "utf8"), words = t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const missing = ["SUM", "MIN", "MAX", "AVERAGE", "COUNT", "IF", "ABS", "ROUND", "LEN", "#DIV/0!", "#REF!", "#NAME?", "#VALUE!", CYC].filter((x) => !t.includes(x));
  assert.deepEqual(missing, [], `guide does not name ${missing.length} required items`);
  assert.ok(/^# \S/.test(t) && words >= 300 && words <= 900, `title line and 300-900 words (${words})`);
});
