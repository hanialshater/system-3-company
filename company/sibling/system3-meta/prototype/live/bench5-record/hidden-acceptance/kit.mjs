// Hidden acceptance kit (Benchmark 4): each category is one test whose failure says only how many cases fail.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const HERE = path.dirname(new URL(import.meta.url).pathname);
export const REQ = JSON.parse(fs.readFileSync(path.join(HERE, "requirements.json"), "utf8"));
export const CYC = REQ.cycle;
export const WAVE = REQ.wave ?? 3;
export async function load(task, file) {
  try { return await import(pathToFileURL(path.join(process.env.BOOK_ROOT, task, file)).href + `?t=${Date.now()}`); }
  catch (e) { return { __error: `${task}/${file} does not load: ${String(e.message).split("\n")[0].slice(0, 120)}` }; }
}
const same = (a, b) => { try { assert.deepStrictEqual(a, b); return true; } catch { return typeof a === "number" && typeof b === "number" && Math.abs(a - b) < 1e-9; } };
/** cases: [input, expected] ; fn(input) -> actual; expected may be a function (actual) => boolean */
export function category(mod, name, cases, fn) {
  test(name, () => {
    if (mod.__error) assert.fail(mod.__error);
    let fail = 0;
    for (const [inp, exp] of cases) { try { const got = fn(inp); if (typeof exp === "function" ? !exp(got) : !same(got, exp)) fail++; } catch { if (exp !== THROWS) fail++; } }
    assert.equal(fail, 0, `${name}: ${fail} of ${cases.length} cases fail`);
  });
}
export const THROWS = Symbol("throws");
/** for cases expected to throw: fn must throw; a return is a failure */
export const throws = (fn) => (inp) => { fn(inp); throw new Error("did not throw"); };
