// W-2047: tools/sequence-probe.mjs "back" settles a card's fingerprint (two readings 500 ms apart match, 6 s
// ceiling) before comparing, so long spec'd motion is not reported as lost state, and real loss still FAILs.
// Runs the real probe (Chromium, motion on) against tests/platform/fixtures/sequence-probe-fixture.html.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = path.resolve(import.meta.dirname, "../..");
const html = fs.readFileSync(path.join(root, "tests/platform/fixtures/sequence-probe-fixture.html"));
let server;
let base;
const runs = {};

function probe(slug) {
  return new Promise((resolve) => {
    const p = spawn(process.execPath, ["tools/sequence-probe.mjs", "--url", base, slug, "--only", "phone", "--timeout", "20000"], { cwd: root });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    p.on("close", (code) => resolve({ code, out, back: out.split("\n").find((l) => /\sback(:|$)/.test(l)) ?? "" }));
  });
}

before(async () => {
  server = http.createServer((req, res) => {
    if (req.url.startsWith("/d/fixture-")) res.writeHead(200, { "content-type": "text/html" }).end(html);
    else res.writeHead(404).end();
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${server.address().port}`;
  const slugs = ["fixture-fast", "fixture-slow", "fixture-lost", "fixture-forever"];
  const done = await Promise.all(slugs.map(probe));
  slugs.forEach((s, i) => (runs[s] = done[i]));
});
after(() => server?.close());

test("no motion: back passes", () => {
  assert.match(runs["fixture-fast"].back, /^PASS .*state kept/, runs["fixture-fast"].out);
});

test("2.2 s motion in 220 ms steps, state kept: back passes (W-2047's false FAIL)", () => {
  assert.match(runs["fixture-slow"].back, /^PASS .*state kept/, runs["fixture-slow"].out);
});

test("state really lost on return: back still FAILs as state not kept", () => {
  assert.match(runs["fixture-lost"].back, /^FAIL .*state not kept/, runs["fixture-lost"].out);
  assert.equal(runs["fixture-lost"].code, 1);
});

test("a card that never stops moving FAILs as never settled, not as kept", () => {
  assert.match(runs["fixture-forever"].back, /^FAIL .*card 1 never settled/, runs["fixture-forever"].out);
});
