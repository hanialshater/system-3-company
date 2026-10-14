// W-477 (S1): the /spike route guard, the cdn allow-list and the event intake guard (src/lib/spike.ts).
// Run: npm run test:spike
import test from "node:test";
import assert from "node:assert/strict";
import { eventWriteAllowed, frameUrlOn, resolveSpikeCdn, spikeCdnAllowlist, spikeEnabled } from "../../src/lib/spike.ts";

test("production cannot reach the spike unless the server flag is set", () => {
  assert.equal(spikeEnabled({ NODE_ENV: "production" }), false);
  assert.equal(spikeEnabled({ NODE_ENV: "test" }), false);
  assert.equal(spikeEnabled({}), false);
  assert.equal(spikeEnabled({ NODE_ENV: "production", SPIKE_ENABLED: "true" }), false);
  assert.equal(spikeEnabled({ NODE_ENV: "production", NEXT_PUBLIC_SPIKE_ENABLED: "1" }), false);
  assert.equal(spikeEnabled({ NODE_ENV: "production", SPIKE_ENABLED: "1" }), true);
  assert.equal(spikeEnabled({ NODE_ENV: "development" }), true);
});

test("?cdn= only selects an allow-listed origin; the query string never becomes the source", () => {
  const list = spikeCdnAllowlist({});
  assert.deepEqual(list, ["http://localhost:3141"]);
  for (const evil of ["https://example.com", "http://localhost:3141@example.com", "javascript:alert(1)", "//example.com", "http://localhost:31410", "data:text/html,x", "", undefined]) {
    assert.equal(resolveSpikeCdn(evil, list), "http://localhost:3141", String(evil));
  }
  const two = spikeCdnAllowlist({ SPIKE_CDN_ORIGINS: "http://localhost:3141, https://lessons.example.org/ , javascript:x, https://u:p@bad.test" });
  assert.deepEqual(two, ["http://localhost:3141", "https://lessons.example.org"]);
  assert.equal(resolveSpikeCdn("https://lessons.example.org/anything", two), "https://lessons.example.org");
  assert.equal(spikeCdnAllowlist({ SPIKE_CDN_ORIGINS: "nonsense" })[0], "http://localhost:3141");
});

test("manifest frame paths cannot leave the cdn origin", () => {
  const cdn = "http://localhost:3141";
  assert.equal(frameUrlOn(cdn, "/l/abc.html"), "http://localhost:3141/l/abc.html");
  for (const bad of ["//example.com/x", "@example.com/x", "https://example.com/x", "l/abc.html", "/\\example.com"]) {
    const got = frameUrlOn(cdn, bad);
    assert.ok(got === null || new URL(got).origin === cdn, `${bad} -> ${got}`);
  }
  assert.equal(frameUrlOn(cdn, "@example.com/x"), null);
  assert.equal(frameUrlOn(cdn, "//example.com/x"), null);
});

const req = (headers, url = "https://s3c.example/api/events") => ({ url, headers: new Headers(headers) });

test("event intake refuses sandboxed frames, other origins and the spike harness", () => {
  assert.equal(eventWriteAllowed(req({ origin: "null" })), false, "opaque-origin sandboxed frame");
  assert.equal(eventWriteAllowed(req({ origin: "http://localhost:3141" })), false, "spike cdn origin");
  assert.equal(eventWriteAllowed(req({ origin: "https://example.com" })), false);
  assert.equal(eventWriteAllowed(req({ "sec-fetch-site": "cross-site" })), false);
  assert.equal(eventWriteAllowed(req({ origin: "https://s3c.example", referer: "https://s3c.example/spike?cdn=x" })), false);
  assert.equal(eventWriteAllowed(req({ referer: "https://example.com/" })), false);
});

test("event intake still accepts the app's own lessons", () => {
  assert.equal(eventWriteAllowed(req({ origin: "https://s3c.example", referer: "https://s3c.example/d/why-seven-wins", "sec-fetch-site": "same-origin" })), true);
  assert.equal(eventWriteAllowed(req({ referer: "https://s3c.example/" })), true);
  assert.equal(eventWriteAllowed(req({})), true, "no Origin (curl, older beacons)");
  // Behind a proxy that rewrites req.url, the Host the browser used still counts as us.
  assert.equal(eventWriteAllowed(req({ origin: "https://s3c.example", host: "s3c.example" }, "http://internal:3000/api/events")), true);
  assert.equal(eventWriteAllowed(req({ origin: "https://s3c.example", "x-forwarded-host": "s3c.example" }, "http://internal:3000/api/events")), true);
});
