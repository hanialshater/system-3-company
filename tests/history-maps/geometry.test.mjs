import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { geoContains } from "d3-geo";
import { normaliseGeometry } from "../../tools/history-maps/geometry.mjs";

test("mixed ring directions select the small territory rather than the rest of Earth", () => {
  const ring = [[0,0],[4,0],[4,4],[0,4],[0,0]];
  for (const outer of [ring,[...ring].reverse()]) {
    const actual = normaliseGeometry({ type: "Polygon", coordinates: [outer] });
    assert.equal(geoContains(actual,[1,1]),true);
    assert.equal(geoContains(actual,[80,30]),false);
    assert.deepEqual([...actual.coordinates[0]].sort(),[...ring].sort());
  }
});

test("normalisation keeps holes empty and separate multipolygon islands covered", () => {
  const outer = [[0,0],[4,0],[4,4],[0,4],[0,0]];
  const hole = [[1,1],[2,1],[2,2],[1,2],[1,1]];
  const island = [[10,0],[12,0],[12,2],[10,2],[10,0]];
  const g = normaliseGeometry({ type: "MultiPolygon", coordinates: [[outer,hole],[island]] });
  assert.equal(geoContains(g,[0.5,0.5]),true);
  assert.equal(geoContains(g,[1.5,1.5]),false);
  assert.equal(geoContains(g,[11,1]),true);
  assert.equal(geoContains(g,[8,1]),false);
});

test("100 cases stay independently loadable with provenance and independent verification", () => {
  const catalog = JSON.parse(fs.readFileSync("tools/history-maps/catalog.json"));
  assert.equal(catalog.length,100);
  assert.equal(new Set(catalog.map((c) => c.slug)).size,100);
  assert.equal(new Set(catalog.map((c) => c.region)).size,10);
  for (const c of catalog) {
    const base = `src/demos/history/${c.slug}`;
    const meta = JSON.parse(fs.readFileSync(`${base}/meta.json`));
    const map = JSON.parse(fs.readFileSync(`${base}/map.json`));
    assert.ok(meta.claims.length >= 5);
    assert.ok(meta.claims.every((claim) => claim.status !== "verified" || (claim.checkedBy && claim.checkedBy !== meta.owner.builder)));
    for (const key of ["qa","simulatedLearner","pairwise","humanLearners"]) assert.ok(Array.isArray(meta.evidence[key]));
    assert.equal(map.frames.length,2);
    for (const frame of map.frames) {
      assert.match(frame.source.sha256,/^[a-f0-9]{64}$/);
      assert.ok(frame.shapes.every((p) => p.d.length && !p.d.includes("NaN")));
      assert.equal(frame.labels.length,2);
    }
    for (const p of map.points) {
      assert.ok(p.offsetKm <= 75);
      assert.ok(p.xy[0] >= 3 && p.xy[0] <= 357 && p.xy[1] >= 3 && p.xy[1] <= 189);
    }
    assert.match(fs.readFileSync(`${base}/Demo.tsx`,"utf8"),/import data from "\.\/map.json"/);
  }
});
