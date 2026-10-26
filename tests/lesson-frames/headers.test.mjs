// C4: the artifact origin's headers, one rule per path class (tools/lib/lesson-frames.mjs).
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { PRODUCTION_HOST, frameCsp, headerRules, headersFor, originVercelJson } from "../../tools/lib/lesson-frames.mjs";

test("four path classes, no per-lesson rules", () => {
  assert.deepEqual(headerRules().map((r) => r.source), ["/kit/(.*)", "/kit-geo/(.*)", "/l/(.*)", "/f/(.*)"]);
});
test("static classes are immutable, nosniff and CORS * (opaque-origin module fetches)", () => {
  for (const p of ["/kit/1.0.0/kit.x.js", "/kit-geo/1.0.0/geo.x.js", "/l/x.js"]) {
    const h = headersFor(p, [PRODUCTION_HOST]);
    assert.equal(h["Cache-Control"], "public, max-age=31536000, immutable");
    assert.equal(h["X-Content-Type-Options"], "nosniff");
    assert.equal(h["Access-Control-Allow-Origin"], "*");
  }
});
test("frame documents: generic CSP header with frame-ancestors, sandbox and no network", () => {
  const h = headersFor("/f/x.html", [PRODUCTION_HOST, "https://preview.example.vercel.app"]);
  const csp = h["Content-Security-Policy"];
  assert.match(csp, /frame-ancestors https:\/\/system-3-company\.vercel\.app https:\/\/preview\.example\.vercel\.app/);
  assert.match(csp, /sandbox allow-scripts(;|$)/);
  assert.match(csp, /connect-src 'none'/);
  assert.match(csp, /default-src 'none'/);
  assert.doesNotMatch(csp, /sha256-|nonce-/, "the header stays generic; the import-map hash is in each frame's meta CSP");
  assert.equal(h["Access-Control-Allow-Origin"], undefined, "frames are navigated, never fetched");
  assert.equal(h["Cache-Control"], "public, max-age=31536000, immutable");
});
test("anything outside the four classes gets no headers (the local server answers 404)", () => {
  assert.equal(headersFor("/manifest.json", [PRODUCTION_HOST]), null);
  assert.equal(headersFor("/", [PRODUCTION_HOST]), null);
});
test("a frame ancestor must be an origin", () => {
  assert.throws(() => frameCsp && headerRules(["https://x.example/path"]));
  assert.throws(() => headerRules(["*"]));
});
test("every built frame document still pins its import map by hash in its meta CSP (when artifacts are present)", (t) => {
  const dir = "artifacts/lesson-frames/dist/f";
  if (!fs.existsSync(dir)) return t.skip("no local artifact build");
  for (const f of fs.readdirSync(dir)) {
    const html = fs.readFileSync(`${dir}/${f}`, "utf8");
    assert.match(html, /http-equiv="Content-Security-Policy" content="[^"]*script-src 'self' 'sha256-[A-Za-z0-9+/=]+'/, f);
  }
});
test("the origin's vercel.json is static (no framework, no build)", () => {
  const v = originVercelJson([PRODUCTION_HOST]);
  assert.equal(v.framework, null);
  assert.equal(v.headers.length, 4);
});
