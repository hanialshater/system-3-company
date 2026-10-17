// HQ Strategy tab: the master plan loads through the Library loader, its as-of date drives the stale flag
// (older than 14 days), and its relative links resolve into the Library. Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import { parseAsOf, asOfAge } from "../../src/lib/hq-strategy.ts";
import { loadStrategy } from "../../src/lib/hq-strategy-server.ts";

test("parseAsOf reads the header date", () => {
  assert.equal(parseAsOf("owner: founder · as-of: 2026-10-17\n"), "2026-10-17");
  assert.equal(parseAsOf("no date here"), null);
});

test("stale only after 14 days", () => {
  assert.deepEqual(asOfAge("2026-10-17", new Date("2026-10-31T23:00:00Z")), { days: 14, stale: false });
  assert.equal(asOfAge("2026-10-17", new Date("2026-11-01T00:00:00Z")).stale, true);
});

test("master plan loads with an as-of date and library links", () => {
  const { doc, asOf } = loadStrategy();
  assert.ok(doc && asOf);
  assert.ok(Object.keys(doc.links).length > 0);
});
